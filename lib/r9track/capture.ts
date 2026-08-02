import type { NextRequest, NextResponse } from "next/server";

import { getConfig, type R9TrackConfig } from "./config";

/**
 * ============================================================================
 * GCLID CAPTURE — middleware half of the tracker.
 * ============================================================================
 *
 * Google's auto-tagging puts a click identifier on the landing URL. The reader
 * then browses, and clicks out to a retailer from some other page entirely, so
 * the identifier has to survive between the two. This stores it.
 *
 * ## Why the cookie is set server-side
 *
 * Safari's ITP caps cookies written by `document.cookie` at seven days. A
 * cookie written by `Set-Cookie` from the server is not capped the same way,
 * and the conversion window we care about is ninety days. Writing it in
 * middleware is the difference between measuring three months of affiliate
 * revenue and measuring one week of it.
 *
 * ## Why consent gates it
 *
 * A gclid identifies a person's ad click, which makes it personal data under
 * GDPR. Without granted advertising consent the identifier is never written,
 * and the click is still counted — anonymously — because earnings-per-click
 * needs the denominator regardless. Measurement we are allowed to keep, in
 * other words, and nothing we are not.
 *
 * The default is to store nothing at all until a consent cookie is configured.
 * That fails closed: a project that drops this module in and forgets to wire
 * its CMP gets no tracking, rather than silently assuming consent.
 */

/** Google's three click identifiers, in the order we prefer them. */
const CLICK_PARAMS = ["gclid", "wbraid", "gbraid"] as const;

export type CapturedClick = {
  value: string;
  /** Which parameter it came from, so the platform knows what it is. */
  braidType: (typeof CLICK_PARAMS)[number];
};

export type ClickCookie = CapturedClick & {
  /** When it was captured, epoch milliseconds. */
  t: number;
};

/** Read a click identifier off an incoming URL, if one is there. */
export function readClickParam(url: URL): CapturedClick | null {
  for (const param of CLICK_PARAMS) {
    const value = url.searchParams.get(param);
    if (value && value.length <= 512) return { value, braidType: param };
  }
  return null;
}

/**
 * Whether advertising storage is permitted for this request.
 *
 * Fails closed. With no `consentCookie` configured, this is always false.
 */
export function hasAdConsent(
  request: NextRequest,
  config: R9TrackConfig = getConfig()
): boolean {
  if (!config.consentCookie) return false;
  const raw = request.cookies.get(config.consentCookie)?.value;
  if (config.consentGranted) return config.consentGranted(raw);
  /* Default reading, matching the common CMP convention of storing a plain
     value. Override `consentGranted` in config for anything richer. */
  return raw === "1" || raw === "true" || raw === "granted";
}

/** Parse the stored cookie. Returns null when absent or unreadable. */
export function readClickCookie(
  request: NextRequest,
  config: R9TrackConfig = getConfig()
): ClickCookie | null {
  const raw = request.cookies.get(config.cookieName)?.value;
  if (!raw) return null;
  try {
    /* Next encodes on write and decodes on read, so the value arrives as
       plain JSON. Anything else here is a cookie we did not write. */
    const parsed = JSON.parse(raw) as Partial<ClickCookie>;
    if (typeof parsed.value !== "string" || !parsed.value) return null;
    const braidType = CLICK_PARAMS.includes(
      parsed.braidType as (typeof CLICK_PARAMS)[number]
    )
      ? (parsed.braidType as (typeof CLICK_PARAMS)[number])
      : "gclid";
    return {
      value: parsed.value,
      braidType,
      t: typeof parsed.t === "number" ? parsed.t : 0,
    };
  } catch {
    return null;
  }
}

/**
 * Capture a click identifier onto the response, if there is one to capture.
 *
 * Call it from `middleware.ts` with the response you are already returning.
 * It mutates and returns that response, so it composes with whatever else the
 * middleware does.
 *
 * A later ad click overwrites an earlier one. That matches Google's own
 * last-click attribution: the most recent paid click is the one that should be
 * credited.
 */
export function captureClickId(
  request: NextRequest,
  response: NextResponse,
  config: R9TrackConfig = getConfig()
): NextResponse {
  if (!config.enabled) return response;

  const captured = readClickParam(request.nextUrl);
  if (!captured) return response;
  if (!hasAdConsent(request, config)) return response;

  const payload: ClickCookie = { ...captured, t: Date.now() };

  /* No manual encoding: `cookies.set` percent-encodes the value, and
     `cookies.get` decodes it. Doing it here as well round-trips correctly but
     stores every byte twice-escaped for nothing. */
  response.cookies.set(config.cookieName, JSON.stringify(payload), {
    httpOnly: true,
    /* Lax, not Strict: the reader arrives from Google, which is a cross-site
       navigation. Strict would refuse to send the cookie on that first hop. */
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: config.cookieMaxAgeDays * 24 * 60 * 60,
  });

  return response;
}
