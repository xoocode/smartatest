import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { REDIRECT_PREFIX } from "@/lib/links";

/*
 * ## Varför AI-robotarna står utskrivna
 *
 * Jokertecknet nedan tillåter dem redan. Raderna finns ändå av två skäl: de
 * dokumenterar ett beslut, och de överlever om någon av tjänsterna ändrar sin
 * standardtolkning. Sajten lever på att bli citerad som källa i AI-svar, så
 * att stänga ute dem vore att stänga en av de kanaler den byggs för.
 *
 * ## Varför /till står som disallow
 *
 * Vidarelänken finns för läsare, inte för robotar. Den 302:ar vidare till en
 * butik, så en robot som följer den lägger en request på oss och en på butiken
 * utan att något indexerbart kommer ut. Routen skickar dessutom
 * `x-robots-tag: noindex, nofollow`, men det svaret kostar ändå en hämtning —
 * förbudet här är det som gör att den aldrig görs. Prefixet importeras från
 * lib/links.ts så att de två aldrig kan glida isär.
 *
 * ## Varför /sok inte står som disallow
 *
 * Den sidan sätter `noindex` i sin metadata. Ett förbud här skulle hindra
 * Google från att läsa den taggen, och en adress som inte får läsas men som
 * någon länkat till kan hamna i indexet ändå, utan utdrag. Ett av de två,
 * aldrig båda.
 */

/** Robotar vi uttryckligen välkomnar, med skäl. */
const AI_AGENTS = [
  /* OpenAI: GPTBot indexerar, OAI-SearchBot besvarar sökningar, ChatGPT-User
     hämtar sidan när någon frågar om den i en konversation. */
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  /* Anthropic. */
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  /* Perplexity, som citerar källor synligt och därmed skickar trafik. */
  "PerplexityBot",
  "Perplexity-User",
  /* Googles och Apples separata reglage för AI-svar. Utan ett uttryckligt
     tillstånd här kan Google-Extended tolkas som ett nej till AI-översikter,
     vilket är den yta vi helst vill synas på. */
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* /styleguide already 404s in production via the admin gate, but a
           disallow costs nothing and covers a misconfigured preview. */
        disallow: ["/styleguide", "/api/", `${REDIRECT_PREFIX}/`],
      },
      {
        userAgent: AI_AGENTS,
        allow: "/",
        disallow: ["/styleguide", "/api/", `${REDIRECT_PREFIX}/`],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
