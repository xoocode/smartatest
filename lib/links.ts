/**
 * ============================================================================
 * AFFILIATE-SWAP — the one place outbound merchant links are decided.
 * ============================================================================
 *
 * Grep token: `AFFILIATE-SWAP`. Every file that participates in monetised
 * linking carries it in a comment, so the whole surface is one search away.
 * Today that is exactly three files: this one, `components/product/
 * affiliate-cta.tsx` and the `merchantUrl` / `affiliateUrl` fields in
 * `lib/products.ts`. Nothing else may render an outbound merchant link.
 *
 * ## Current mode: "tracked"
 *
 * We are not applying to any Adtraction program until at least 16 pages are
 * finished. Until then every product link goes through `/till/{id}`, which
 * counts the click and 302s to the retailer's own product page. We earn
 * nothing on it, so it carries no `sponsored` and no ad label — an unpaid
 * editorial link to a shop is a normal link and marking it would mislead in
 * the other direction.
 *
 * Counting clicks before there is any commission is not premature. Earnings
 * per click needs the denominator, and the click history is what tells us
 * which products and which shops deserve the top of a ranking once money does
 * start arriving.
 *
 * ## Switching it on later
 *
 * Change LINK_MODE to "redirect", fill `affiliateUrl` on the products, done.
 * The route is already built and already reports; the only thing that changes
 * is that the href becomes monetised, the label appears, and `/till` starts
 * appending our sub-id to a network deep link. No page, no component and no
 * template changes — that is the entire point of routing every link through
 * `resolveMerchantLink`.
 *
 * ## Why not rewrite the href on click
 *
 * The tempting version — ship the clean retailer URL in the DOM and swap it
 * for a tracking URL in a click handler — is a bad trade:
 *
 *  1. It is cloaking. The crawler sees a dofollow editorial link, the user
 *     gets a monetised one. Google's spam policies treat affiliate-link
 *     manipulation as a manual-action offence, and this is the textbook shape
 *     of it.
 *  2. It loses money silently. Middle-click, ⌘/Ctrl-click, "open in new tab"
 *     and right-click → copy link address all use the raw `href` and mostly
 *     never fire the handler. Shopping links get opened that way constantly,
 *     and the loss never shows up in any report.
 *  3. Most network terms require the tracking URL to be the actual link.
 *  4. Ad-blockers, Safari ITP and any no-JS path degrade it to unmonetised.
 *
 * `mode: "redirect"` below is the safe version of the same idea: a real
 * server redirect through /till/{id}. It survives middle-click and copy-link,
 * gives click counts for free, and stays compliant. Build it when we actually
 * need per-click data.
 */

export type LinkMode =
  /** Straight to the retailer, untracked, dofollow. Where we started. */
  | "direct"
  /**
   * Internal /till/{id} route that 302s to the retailer's own page, counting
   * the click on the way. Unmonetised: no commission, so no `sponsored` and
   * no ad label. Where we are now.
   */
  | "tracked"
  /** Network tracking URL in the href. The normal affiliate setup. */
  | "network"
  /** Internal /till/{id} route that 302s to a network link. Monetised. */
  | "redirect";

export const LINK_MODE: LinkMode = "tracked";

/** Where /till/ would live. Keep in sync with robots.ts if mode changes. */
export const REDIRECT_PREFIX = "/till";

export type OutboundLink = {
  href: string;
  /**
   * `sponsored` is required by Google the moment a link can earn us money,
   * and is wrong before that. It is derived here rather than hardcoded in the
   * component so it can never disagree with the mode.
   */
  rel: string;
  /** True when this link can earn a commission. Drives rel and analytics. */
  monetised: boolean;
};

export type LinkTarget = {
  id: string;
  /** The retailer's own product page. Always set, always real. */
  merchantUrl: string;
  /** Network tracking URL. Absent until we join the program. */
  affiliateUrl?: string;
};

/**
 * Where on the page the link sits, and how far down the ranking.
 *
 * Read back off the query string by `lib/r9track/redirect.ts`. Until this
 * existed the redirect looked for `?pl=` and `?pos=` that nothing ever set, so
 * `placement` was null and `position` zero on every click ever recorded, and
 * "does the winner card earn more than the comparison table" had no answer.
 *
 * The components already knew their own slot — `AffiliateCta` has taken a
 * `placement` prop for as long as it has existed — but it only ever reached a
 * `data-placement` attribute in the DOM and stopped there.
 */
export type LinkContext = {
  /** Slot on the page: winner-card, comparison-table, considered, and so on. */
  placement?: string;
  /** 1-based rank within that slot. Omitted where ranking is meaningless. */
  position?: number;
};

/** Query keys, matching the defaults in `createTillRoute`. */
const PLACEMENT_PARAM = "pl";
const POSITION_PARAM = "pos";

function withContext(path: string, context?: LinkContext): string {
  if (!context?.placement && !context?.position) return path;
  const params = new URLSearchParams();
  /* Trimmed to the same 60 characters the redirect will keep, so what we send
     and what gets stored cannot disagree. */
  if (context.placement) {
    params.set(PLACEMENT_PARAM, context.placement.slice(0, 60));
  }
  /* Zero is the redirect's "no position", so only a real rank is sent. */
  if (Number.isInteger(context.position) && (context.position as number) > 0) {
    params.set(POSITION_PARAM, String(context.position));
  }
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export function resolveMerchantLink(
  target: LinkTarget,
  mode: LinkMode = LINK_MODE,
  context?: LinkContext,
): OutboundLink {
  /* ⚠️ Both redirect modes below need `target.id`, and a caller that forgets
     `productId` would otherwise produce `/till/`, which 404s — a dead link
     where a working one used to be. In `direct` mode the same omission was
     harmless, so nothing warned about it.

     Every id-less link therefore falls through to the direct branch at the
     bottom. An untracked link that works beats a tracked one that does not.
     Losing the measurement for one button is a rounding error; losing the
     click is the whole point of the page. */
  if (mode === "redirect" && target.id) {
    return {
      href: withContext(`${REDIRECT_PREFIX}/${target.id}`, context),
      rel: "sponsored nofollow noopener",
      monetised: true,
    };
  }

  /* Same route as `redirect`, opposite claim about money.
   *
   * The two are separate modes rather than one, because `monetised` drives
   * three things at once — rel="sponsored", the "Annons" label and the top
   * banner — and all three would be wrong here. We earn nothing on these
   * links yet. Branschrekommendationen (TU, Sveriges Tidskrifter, IAB Sverige,
   * 18 juni 2024) says non-affiliate links must *not* be marked, because the
   * marking misleads in the other direction, and Google does not want
   * `sponsored` on a link that cannot pay us either.
   *
   * `nofollow` is still right: the destination is a shop, chosen commercially,
   * and we should not be passing signal to it on an editorial page. It is the
   * *ad disclosure* that would be a false statement, not the crawl hint. */
  if (mode === "tracked" && target.id) {
    return {
      href: withContext(`${REDIRECT_PREFIX}/${target.id}`, context),
      rel: "nofollow noopener",
      monetised: false,
    };
  }

  /* Also catches `redirect` mode when the id was missing above: the link still
     has to earn, so it goes straight to the network rather than silently
     degrading to an unmonetised link to the shop. */
  if ((mode === "network" || mode === "redirect") && target.affiliateUrl) {
    return {
      href: target.affiliateUrl,
      rel: "sponsored nofollow noopener",
      monetised: true,
    };
  }

  if (
    process.env.NODE_ENV !== "production" &&
    !target.id &&
    (mode === "tracked" || mode === "redirect")
  ) {
    console.warn(
      `[links] outbound link to ${target.merchantUrl} has no product id, so it ` +
        `cannot be tracked. Pass productId to AffiliateCta.`,
    );
  }

  /* Direct, unmonetised, dofollow. `noopener` is a security measure, not an
     SEO one, so it stays regardless of mode. */
  return { href: target.merchantUrl, rel: "noopener", monetised: false };
}

/**
 * True when links on the site can currently earn us money.
 *
 * Driver för annonsmärkningen. Branschrekommendationen från TU, Sveriges
 * Tidskrifter och IAB Sverige (18 juni 2024) säger uttryckligen att länkar
 * *utan* kommersiellt samarbete inte ska märkas, eftersom de är redaktionella
 * och en annonsmärkning på dem vilseleder åt andra hållet.
 *
 * I `direct`-läge tjänar vi ingenting, alltså ska varken balken högst upp
 * eller "Annons"-etiketten synas. Byts LINK_MODE tänds båda av sig själva.
 * Det är samma signal som styr `rel="sponsored"`, så märkningen kan aldrig
 * hamna i otakt med vad länken faktiskt är.
 */
export function isMonetised(mode: LinkMode = LINK_MODE): boolean {
  /* Whitelist, not `!== "direct"`. `tracked` measures clicks without earning
     anything, and an exclusion list would have quietly labelled it as an ad
     the moment it was added. */
  return mode === "network" || mode === "redirect";
}
