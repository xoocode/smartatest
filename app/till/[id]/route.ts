import { createTillRoute } from "@/lib/r9track";
import { findProduct, findService } from "@/lib/data";
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
  /* Både produkter och tjänster, och tjänsterna var borta i månader.
     `ServiceCard` skickar `productId={service.id}` till samma `AffiliateCta`
     som produkterna, alltså pekade varje knapp på /hemlarm mot /till/{id} —
     och den här funktionen letade bara i ALL_PRODUCTS. Alla åtta larmbolag gav
     404. Uppmätt 2026-08-05: /till/gardio, /till/sector-alarm och
     /till/verisure svarade 404 i produktion medan /till/cleverio-ip200 gav
     302. `pnpm check:lankar` täcker inte /till, se scripts/check-till.mjs. */
  resolve: (id) => {
    const product = findProduct(id);
    if (product) {
      return {
        url: product.affiliateUrl ?? product.merchantUrl,
        merchant: product.merchant,
        productId: product.id,
        isAffiliate: Boolean(product.affiliateUrl),
      };
    }

    const service = findService(id);
    if (!service) return null;

    return {
      url: service.affiliateUrl ?? service.providerUrl,
      merchant: service.provider,
      productId: service.id,
      isAffiliate: Boolean(service.affiliateUrl),
    };
  },
});
