import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * Är interna verktyg påslagna för det här bygget?
 *
 * Samma villkor som `isAdminEnabled()` i lib/admin.ts. Håll dem lika: skiljer
 * de sig åt byter vi ut modulen i ett bygge där komponenten ändå försöker
 * rendera, och då blir stilväljaren borta i utveckling.
 */
const adminEnabled =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_SHOW_ADMIN === "1";

const nextConfig: NextConfig = {
  /* MDX for editorial prose. Product data stays in typed TS. */
  pageExtensions: ["ts", "tsx", "mdx"],

  /*
   * Stilväljaren ut ur produktionsbygget, på riktigt.
   *
   * ## Varför en alias och inte en if-sats
   *
   * `AdminCorner` returnerar redan `null` i produktion, men det räcker inte.
   * En modul hamnar i klientbunten så snart något importerar den, oavsett om
   * den renderas, och layouten importerar den på varje sida. Uppmätt
   * 2026-08-03: en chunk på 59 kB med "Stäng stilväljaren" och "Kriterierader"
   * laddades av varje besökare. `next/dynamic` hjälpte inte heller, eftersom
   * Turbopack slog ihop väljaren med sökrutan och samtyckeslagret, som sidan
   * genuint behöver.
   *
   * Aliaset byter ut hela modulen vid bygget. Då finns den inte i grafen och
   * kan inte hamna i någon chunk. Ersättaren har samma signatur och returnerar
   * `null`.
   *
   * Kontrollera efter ändringar här:
   * `grep -rl "Stäng stilväljaren" .next/static/chunks/` ska ge tomt efter ett
   * produktionsbygge, och ge en träff efter `NEXT_PUBLIC_SHOW_ADMIN=1`.
   */
  turbopack: {
    resolveAlias: adminEnabled
      ? {}
      : {
          "@/components/admin/admin-corner":
            "./components/admin/admin-corner.prod.tsx",
        },
  },

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
