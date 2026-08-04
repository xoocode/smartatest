import { NextResponse, after, type NextRequest } from "next/server";

import { getConfig, type R9TrackConfig } from "./config";
import { hasAdConsent, readClickCookie } from "./capture";
import { mintClickId } from "./click-id";
import { reportClick } from "./report";

/**
 * ============================================================================
 * OUTBOUND REDIRECT — the route half of the tracker.
 * ============================================================================
 *
 * A real server redirect, not a click handler that rewrites `href`. That
 * matters more than it looks:
 *
 *  - Middle-click, ⌘/Ctrl-click, "open in new tab" and "copy link address"
 *    all use the raw `href` and mostly never fire a JavaScript handler.
 *    Shopping links get opened that way constantly, and every one of those
 *    would be an unmeasured — and, once we are monetised, unpaid — click.
 *  - Swapping the href on click is cloaking: the crawler sees one destination
 *    and the reader gets another. It is the textbook shape of the affiliate
 *    manipulation Google issues manual actions for.
 *  - It degrades to nothing when scripts are blocked.
 *
 * ## Ordering is the whole design
 *
 * Mint the id, build the URL, redirect. Only then, in `after()`, tell the
 * platform. The platform is never in the money path: if it is slow, broken or
 * entirely down, the reader still reaches the shop and the affiliate cookie is
 * still set. We lose measurement, never revenue.
 *
 * ## Host project integration
 *
 * Everything site-specific arrives through `resolve`. This file knows nothing
 * about products, categories or where the data lives.
 */

export type TillTarget = {
  /** Where the reader is actually going. */
  url: string;
  merchant?: string | null;
  productId?: string | null;
  /** Affiliate programme id, when the host project tracks one. */
  programId?: number | null;
  /**
   * True when `url` is a network deep link that should carry our click id.
   *
   * False for a plain retailer URL, which is where an unmonetised site starts:
   * clicks are still measured, but there is no network to hand a sub-id to and
   * appending one would just be noise on someone else's URL.
   */
  isAffiliate?: boolean;
};

export type TillResolver = (
  id: string,
  request: NextRequest
) => TillTarget | null | Promise<TillTarget | null>;

export type TillRouteOptions = {
  resolve: TillResolver;
  /** Overrides for testing or for a project that configures in code. */
  config?: Partial<R9TrackConfig>;
  /** Query parameter carrying the placement label. */
  placementParam?: string;
  /** Query parameter carrying the ranking position. */
  positionParam?: string;
};

/**
 * Crude, deliberately.
 *
 * This exists to keep obvious crawlers out of the click counts that value the
 * observation conversion action, not to defeat anyone determined. A bot that
 * spoofs a browser user agent will be counted, and the honest answer is that
 * the ratio of outbound clicks to transactions is the real detector.
 */
const BOT_PATTERN =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|preview|monitor|curl|wget|python-requests|axios|node-fetch/i;

function deviceType(userAgent: string): string {
  if (/iPad|Tablet/i.test(userAgent)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(userAgent)) return "mobile";
  return "desktop";
}

/** Path the reader clicked from. Same-origin navigations send this reliably. */
function pagePathFrom(request: NextRequest): string | null {
  const referer = request.headers.get("referer");
  if (!referer) return null;
  try {
    const url = new URL(referer);
    if (url.origin !== request.nextUrl.origin) return null;
    return url.pathname.slice(0, 300);
  } catch {
    return null;
  }
}

/**
 * Build the route handler for `app/<prefix>/[id]/route.ts`.
 *
 * ```ts
 * export const { GET } = createTillRoute({
 *   resolve: (id) => {
 *     const product = findProduct(id);
 *     return product ? { url: product.merchantUrl, merchant: product.merchant } : null;
 *   },
 * });
 * ```
 */
export function createTillRoute(options: TillRouteOptions) {
  const {
    resolve,
    placementParam = "pl",
    positionParam = "pos",
  } = options;

  async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> | { id: string } }
  ): Promise<NextResponse> {
    const config = getConfig(options.config);
    const { id } = await Promise.resolve(context.params);

    /*
     * Spekulativa hämtningar utför ingenting.
     *
     * Webbläsare som förhämtar eller förrenderar en länk skickar `Sec-Purpose`.
     * Den här routen har en sidoeffekt: den registrerar ett klick och kan i
     * `redirect`-läge dessutom hämta en nätverkslänk med vår sub-id i. Att
     * utföra det för någon som inte klickat ger falska klick i statistiken och
     * en träff hos butiken som ingen människa orsakat.
     *
     * 503 i stället för att bara hoppa över rapporteringen: svaret ska inte
     * cachas och vidarelänken ska inte utföras alls. Webbläsaren överger
     * spekulationen, och ett riktigt klick gör en riktig förfrågan strax efter.
     * MDN anger just non-2xx som sättet att avböja förrendering.
     *
     * Sajten som använder modulen bör dessutom utesluta prefixet i sina
     * speculation rules, se lib/speculation.ts i smartatest. Det här är
     * bältet: det gäller även spekulation vi inte bett om, alltså webbläsarens
     * egen heuristik eller en förhämtning från någon annans sida.
     */
    const secPurpose = request.headers.get("sec-purpose") ?? "";
    if (secPurpose.includes("prefetch") || secPurpose.includes("prerender")) {
      return new NextResponse(null, {
        status: 503,
        headers: { "cache-control": "no-store" },
      });
    }

    const target = await resolve(id, request);
    if (!target?.url) {
      return new NextResponse(null, { status: 404 });
    }

    let destination: URL;
    try {
      destination = new URL(target.url);
    } catch {
      console.error("[r9track] resolver returned an unparseable URL:", target.url);
      return new NextResponse(null, { status: 404 });
    }
    /* A resolver that can be steered into an arbitrary scheme is an open
       redirect. Only ever leave over http(s). */
    if (destination.protocol !== "https:" && destination.protocol !== "http:") {
      return new NextResponse(null, { status: 404 });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    const isBot = BOT_PATTERN.test(userAgent);
    const consentAds = hasAdConsent(request, config);
    const stored = consentAds ? readClickCookie(request, config) : null;

    const clickId = mintClickId();

    /* Only a network deep link gets our sub-id. Appending one to a retailer's
       own URL would do nothing except make the link look tampered with. */
    if (config.enabled && target.isAffiliate) {
      destination.searchParams.set(config.clickIdParam, clickId);
      /* The redundant join. Adtraction reports transactions by gclid as well
         as by sub-id, so handing it over gives reconciliation a second,
         independent way to recover a conversion whose click row went missing. */
      if (config.gclidParam && stored?.braidType === "gclid") {
        destination.searchParams.set(config.gclidParam, stored.value);
      }
    }

    const response = NextResponse.redirect(destination.toString(), 302);
    /* Belt and braces alongside the robots.txt disallow: a redirect that does
       get fetched should never be indexed or pass anything on. */
    response.headers.set("x-robots-tag", "noindex, nofollow");
    response.headers.set("cache-control", "private, no-store");
    response.headers.set("referrer-policy", "no-referrer");

    if (config.enabled && !isBot) {
      const params = request.nextUrl.searchParams;
      const position = Number(params.get(positionParam));

      after(() =>
        reportClick(
          {
            clickId,
            ts: new Date().toISOString(),
            gclid: stored?.value ?? null,
            braidType: stored?.braidType ?? null,
            consentAds,
            pagePath: pagePathFrom(request),
            productId: target.productId ?? id,
            merchant: target.merchant ?? null,
            placement: params.get(placementParam)?.slice(0, 60) ?? null,
            position: Number.isInteger(position) ? position : null,
            programId: target.programId ?? null,
            country: request.headers.get("x-vercel-ip-country"),
            deviceType: deviceType(userAgent),
            isBot: false,
          },
          config
        )
      );
    }

    return response;
  }

  return { GET };
}
