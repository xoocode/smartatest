import { REDIRECT_PREFIX } from "@/lib/links";

/**
 * Speculation Rules: låt webbläsaren hämta nästa sida innan besökaren klickar.
 *
 * ## Varför
 *
 * Sidorna är helstatiska och navigeringen är förutsägbar: startsida till
 * kategori till verktyg. Det är precis det mönster som förhämtning är byggd
 * för. Ray-Ban mätte 43 procent bättre LCP på mobil efter att ha lagt in
 * prerender, Shopify 180 ms på alla laddningsmått av enbart prefetch.
 *
 * Viktigare för oss: Google rankar på fältdata från CrUX, inte på Lighthouse.
 * Det här är en av få ändringar som flyttar just den siffran.
 *
 * ## ⚠️ Fällan, och varför uteslutningarna inte är valfria
 *
 * Ett `document`-regelverk matchar **varje** samma-origin-länk på sidan. Våra
 * utgående länkar går genom `/till/{id}`, som 302:ar vidare till butiken och
 * registrerar klicket server till server.
 *
 * En förhämtning av en sådan länk skulle alltså avfyra ett spårat klick för
 * någon som aldrig klickat, och i `redirect`-läge dessutom hämta en
 * nätverkslänk med vår sub-id i. Det förstör klickstatistiken och kan vara ett
 * brott mot nätverkets villkor.
 *
 * Prefixet importeras från lib/links.ts av samma skäl som robots.ts gör det:
 * de två får aldrig glida isär.
 *
 * Det här är ändå bara första skyddet. Det andra ligger i
 * `lib/r9track/redirect.ts`, som vägrar utföra vidarelänken när `Sec-Purpose`
 * säger att förfrågan är spekulativ. Det skyddet gäller även spekulation vi
 * inte själva bett om, alltså webbläsarens egen heuristik eller en förhämtning
 * från någon annans sida, och det gör reglerna nedan till bekvämlighet snarare
 * än till den enda spärren.
 *
 * ## Varför `prerender_until_script` och inte `prerender`
 *
 * Full prerender kör sidans JavaScript. Det betyder att gtag skulle logga en
 * sidvisning för någon som aldrig sett sidan. I dag renderas ingen tagg alls
 * eftersom `NEXT_PUBLIC_GOOGLE_ADS_ID` är tom, men det ändras den dagen den
 * fylls i, och då hade felet varit tyst.
 *
 * `prerender_until_script` kom i Chrome 144 i januari 2026. Den hämtar HTML,
 * börjar rendera och laddar underresurser, men pausar vid första blockerande
 * skript. Skripten körs först när besökaren faktiskt klickar. Vi får alltså
 * nästan hela vinsten utan att behöva skriva `prerenderingchange`-logik i varje
 * mätskript.
 *
 * Webbläsare som inte känner igen nyckeln hoppar över hela regelblocket, så
 * äldre Chrome faller tillbaka på `prefetch` ovanför. Det är avsiktligt.
 */

/** Adresser som aldrig får hämtas i förväg, med skäl. */
const NEVER = [
  /* Vidarelänken. Se fällan ovan. */
  `${REDIRECT_PREFIX}/*`,
  /* Inga dokument, och kontaktrouten tar emot post. */
  "/api/*",
  /* Serverrenderad och noindex. En förhämtning kostar en funktionskörning för
     en sida vi ändå inte vill ha indexerad. */
  "/sok*",
  /* 404:ar i produktion via adminspärren. */
  "/styleguide*",
];

/**
 * Villkoret båda regeluppsättningarna delar.
 *
 * Tre lager: adresserna ovan, sedan `nofollow`, som varje utgående länk bär
 * genom `resolveMerchantLink`, och sist `target="_blank"`. De två sista är
 * medvetet överlappande. En framtida länk som glömmer prefixet men behåller
 * sitt `rel` fastnar ändå, och det är den sortens redundans som är värd sin
 * plats när felet är osynligt.
 */
const WHERE = {
  and: [
    { href_matches: "/*" },
    ...NEVER.map((pattern) => ({ not: { href_matches: pattern } })),
    { not: { selector_matches: "[rel~=nofollow]" } },
    { not: { selector_matches: "[target=_blank]" } },
  ],
};

/*
 * `moderate` betyder vid hovring i ungefär 200 ms, alltså när avsikten är
 * rimligt tydlig. Avsiktligt försiktigt att börja med: `eager` hämtar allt som
 * matchar direkt och skulle på en test page med tjugo länkar kosta besökaren
 * data för nitton sidor som aldrig öppnas. Höj när fältmätningen finns och visar
 * att det lönar sig.
 */
const EAGERNESS = "moderate";

/**
 * Reglerna, eller `null` i utvecklingsläge.
 *
 * ## Varför de är avstängda i dev
 *
 * I produktion är en förhämtning gratis: sidorna är byggda och ligger på CDN.
 * I dev är den i stället en **kompilering på begäran av en rutt ingen bad om**.
 * Sidfoten har ett tiotal interna länkar, sidhuvudet grupperna plus Verktyg och
 * kategorirutnätet ett par dussin, så att röra musen nedför en sida satte igång
 * kompilering av flera rutter samtidigt. De konkurrerade med den rutt man
 * faktiskt väntade på, och allt de producerade hamnade i `.next/dev/cache`, som
 * hade svällt till 3,5 GB på en dag.
 *
 * `prerender_until_script` är dessutom ingen ren hämtning. Den renderar sidan i
 * ett dolt läge och laddar underresurserna, alltså en hel serverrendering per
 * hovring. Och eftersom `getStyle()` läser kakan i dev är varje rutt dynamisk,
 * så ingen spekulativ träff kan återanvändas.
 *
 * Ingenting går förlorat. Det som ska mätas är fältdata från riktiga besökare,
 * och localhost har varken latens eller riktig cache. Vill du ändå se dem i
 * arbete, kör ett produktionsbygge: `pnpm build && pnpm start` slår på dem, för
 * villkoret gäller bara `development`.
 */
export const SPECULATION_RULES: string | null =
  process.env.NODE_ENV === "development"
    ? null
    : JSON.stringify({
        prefetch: [{ source: "document", eagerness: EAGERNESS, where: WHERE }],
        prerender_until_script: [
          { source: "document", eagerness: EAGERNESS, where: WHERE },
        ],
      });
