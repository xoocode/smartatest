import { createTillRoute } from "@/lib/r9track";
import { findProduct } from "@/lib/data";
import { TRACK_CONFIG } from "@/lib/track-config";

/**
 * AFFILIATE-SWAP — the outbound redirect. `/till/{produkt-id}` → butiken.
 *
 * The whole route is `resolve`. Everything else — minting the click id,
 * reading the consent-gated gclid cookie, the 302, reporting to the platform
 * afterwards — lives in `lib/r9track/`, which knows nothing about this site.
 *
 * Reached only when `LINK_MODE` is `tracked` or `redirect`; see lib/links.ts,
 * which is the one place that decides what an outbound href looks like.
 *
 * `isAffiliate` is false while `affiliateUrl` is unset, which is where we are
 * now: the reader goes to the retailer's own page and we count the click, but
 * nothing is appended to someone else's URL. Filling `affiliateUrl` on a
 * product flips that product to a network deep link carrying our sub-id, with
 * no change here.
 */
export const { GET } = createTillRoute({
  /* Samma konstant som `proxy.ts` använder vid landningen. Läser de två
     halvorna olika kakor sparas ingen gclid någonsin, och enda symtomet är att
     varje konvertering hamnar i `skipped`. Se lib/track-config.ts.

     Gäller bara gclid-kakan. Vidarelänken och affiliatelänken går ut oavsett
     samtyckessvar, se lib/consent.ts. */
  config: TRACK_CONFIG,
  resolve: (id) => {
    const product = findProduct(id);
    if (!product) return null;

    return {
      url: product.affiliateUrl ?? product.merchantUrl,
      merchant: product.merchant,
      productId: product.id,
      isAffiliate: Boolean(product.affiliateUrl),
    };
  },
});
