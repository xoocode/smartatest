import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
 * ## Consent, and who decides
 *
 * By default the identifier is not written until advertising consent is
 * granted, and with no consent cookie configured it is never written at all.
 * That fails closed: a project that drops this module in and forgets to wire
 * its CMP gets no tracking rather than silent assumed consent.
 *
 * `captureRequiresConsent: false` turns that off, for a controller who has
 * assessed the identifier as strictly necessary to a service the reader asked
 * for. That is a determination about one site, made by the people answerable
 * for it, so it belongs in that site's config with its reasoning attached and
 * never in this module's defaults.
 *
 * Either way the click is counted, and either way `consentAds` reports the
 * real answer. Whether we may keep the identifier for affiliate attribution
 * and whether we may tell Google the reader consented to ad personalisation
 * are two different questions, and the second one is answered by that field.
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
  /* Consent is a gate only where the controller has decided it is one. See
     `captureRequiresConsent` in config.ts, and the site's own config for the
     reasoning behind whichever way it is set. */
  if (config.captureRequiresConsent && !hasAdConsent(request, config)) {
    return response;
  }

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

/**
 * Capture the identifier and take it back out of the address bar.
 *
 * Returns a redirect to the same URL minus the click parameters, carrying the
 * cookie, or a plain `next()` when there is nothing to do. Call it instead of
 * `captureClickId` from middleware.
 *
 * ## Why strip at all
 *
 * A landing address that keeps `?gclid=…` gets shared, bookmarked and pasted
 * into chats with someone else's ad click stapled to it, and it turns up in
 * the referrer of anything the reader clicks next. Cleaning it costs one
 * redirect on the ad landing and nothing afterwards.
 *
 * ## Why only after a successful capture
 *
 * Stripping is destructive: the parameter is the only copy. If the identifier
 * was not stored, because tracking is off or because consent is required and
 * has not been given, the URL is left exactly as it was. Otherwise a project
 * running with `captureRequiresConsent: true` would throw the identifier away
 * before the reader ever had the chance to say yes to it.
 *
 * 307, not 308: the parameter varies per visit and nothing about this should
 * be cached or made permanent.
 */
export function captureAndClean(
  request: NextRequest,
  config: R9TrackConfig = getConfig()
): NextResponse {
  const passthrough = () => captureClickId(request, NextResponse.next(), config);

  if (!config.enabled) return passthrough();
  const captured = readClickParam(request.nextUrl);
  if (!captured) return passthrough();
  if (config.captureRequiresConsent && !hasAdConsent(request, config)) {
    return passthrough();
  }

  const clean = new URL(request.nextUrl);
  for (const param of CLICK_PARAMS) clean.searchParams.delete(param);

  /* The cookie goes on the redirect itself. Setting it on a response the
     browser is about to discard would store nothing, and the retry would
     arrive with no parameter left to capture. */
  return captureClickId(request, NextResponse.redirect(clean, 307), config);
}
