import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* MDX for editorial prose. Product data stays in typed TS. */
  pageExtensions: ["ts", "tsx", "mdx"],

  images: {
    /*
     * Masters live in /public and are optimised on demand by next/image, so
     * nothing here is needed for them. remotePatterns only covers sources we
     * cannot vendor: merchant feed CDNs, and Vercel Blob if we move to it.
     *
     * Every host must be listed explicitly. A wildcard would let any URL that
     * reaches our product data proxy arbitrary images through our own domain.
     */
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
    /* AVIF first, WebP fallback. Masters are stored as high-quality WebP, so
       this re-encode is the only lossy step the visitor ever sees. */
    formats: ["image/avif", "image/webp"],
    /* Product cutouts and thumbnails. The hero uses the default deviceSizes. */
    imageSizes: [48, 64, 96, 128, 256, 384],
  },

  /*
   * Säkerhetsrubriker.
   *
   * Saknades helt fram till 2026-08-02. De kostar ingenting, gäller varje svar
   * och är standard i varje teknisk granskning.
   *
   * ## Ingen Content-Security-Policy här
   *
   * Med flit, och det är inte en förbiseelse. Samtyckesskriptet i
   * `components/site/consent-mode.tsx` är en inline-tagg, och en CSP utan
   * `unsafe-inline` stoppar den. En CSP med `unsafe-inline` skyddar knappt mot
   * något alls, så båda genvägarna är fel: den ena bryter samtyckeslagret,
   * den andra är teater.
   *
   * Rätt lösning är nonce per svar, vilket kräver middleware och gör varje
   * sida dynamiskt renderad. Det offrar den statiska cachningen som sidorna
   * byggda för att ranka lever på. Värt att göra den dagen vi ändå har
   * middleware för gclid-fångsten, inte före.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          /* Hindrar webbläsaren från att gissa filtyp och köra något som en
             annan typ än vi angett. */
          { key: "X-Content-Type-Options", value: "nosniff" },
          /* Vi har inga inbäddningar och ingen anledning att bli inbäddad. */
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          /* Butiken får veta att klicket kom från smartatest.se, men inte
             vilken sida läsaren stod på. Det är vad affiliatenätverken behöver
             och inte mer. */
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          /* Stänger av API:er vi inte använder, så en tredjepartsskript inte
             kan be om dem i vårt namn. */
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          /* Två år, subdomäner inkluderade. Sätts först vid driftsättning bakom
             HTTPS; på localhost är rubriken verkningslös men harmlös. */
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

/*
 * remark-gfm adds GitHub-flavoured markdown, which is what makes pipe tables
 * work. MDX core does not support them, so the ordlista in the buying guide
 * rendered as a wall of literal pipe characters rather than a table.
 *
 * The plugin is named as a string rather than imported: Turbopack serialises
 * the loader config, so a function reference cannot be passed through.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
  },
});

export default withMDX(nextConfig);
