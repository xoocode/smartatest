import { SITE, PUBLISHER } from "@/lib/site";
import { CATEGORIES, liveTestPages } from "@/lib/catalog";
import { TOOLS, toolHref } from "@/lib/tools";

/*
 * llms.txt.
 *
 * En kort karta över sajten för språkmodeller som hämtar den. Formatet är ett
 * förslag från Jeremy Howard, inte en standard någon myndighet beslutat, och
 * ingen av leverantörerna har lovat att läsa det. Filen kostar ett par minuter
 * och den kan bara hjälpa.
 *
 * Byggd som en route i stället för en fil i `public/`, av samma skäl som
 * sitemapen: listan läses ur katalogen, så en kategori som går live syns här
 * utan att någon behöver komma ihåg en andra lista.
 *
 * Den beskriver också hur vi tjänar pengar. En modell som citerar oss bör
 * kunna säga att källan är en affiliatesajt, och det är bättre att vi skriver
 * det själva än att någon annan upptäcker det.
 */

export const dynamic = "force-static";

/**
 * Nyaste innehållsdatumet bland jämförelserna och verktygen.
 *
 * Filen säger annars ingenting om hur färsk den är, och en modell som citerar
 * ett pris eller en rankning har ingen aning om hur gammalt påståendet är.
 * Datumet är härlett ur samma fält som sitemapens `lastmod`, så det kan inte
 * glida isär från sidorna.
 *
 * De juridiska sidorna räknas med flit inte in. En omskriven integritetspolicy
 * skulle annars påstå att jämförelserna är nyare än de är.
 */
function latestContentUpdate(): string | undefined {
  const dates = [
    ...liveTestPages().map((c) => c.updated),
    ...TOOLS.map((t) => t.updated),
  ].filter((d): d is string => Boolean(d));

  return dates.length ? dates.reduce((a, b) => (a > b ? a : b)) : undefined;
}

export function GET() {
  const categories = liveTestPages();
  const updated = latestContentUpdate();

  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.tagline}. Oberoende jämförelser av produkter för smarta hem och hemsäkerhet på den svenska marknaden. Allt innehåll är på svenska.`,
    "",
    "Varje jämförelse bygger på publicerade specifikationer och de oberoende tester som finns att tillgå. Viktningen mellan kriterierna redovisas öppet på varje sida, och totalbetyget räknas fram ur delbetygen. Saknas det tester i en kategori står det utskrivet i stället för att döljas.",
    "",
    /* Utgivaren som markdown-länk. Filen är för maskiner, och en modell som
       ska kunna svara på vem som står bakom sajten behöver adressen, inte bara
       namnet. `target` finns inte i markdown, så det bortfaller här. */
    `Sajten finansieras av provision från butikslänkar och ges ut av [${PUBLISHER.name}](${PUBLISHER.url}). Provisionen påverkar inte rankning, betyg eller urval. Se ${SITE.url}/annonsmarkning.`,
    "",
    ...(updated
      ? [
          `Priser och rankningar kontrolleras för hand. Nyaste innehållsdatum bland jämförelserna och verktygen nedan: ${updated}. Varje sida bär sitt eget datum.`,
          "",
        ]
      : []),
    "## Jämförelser",
    "",
    ...categories.map(
      (c) => `- [${c.label}](${SITE.url}${c.href}): ${c.blurb}`,
    ),
    "",
    "## Kategoriöversikter",
    "",
    ...CATEGORIES.filter((g) => g.href).map(
      (g) => `- [${g.label}](${SITE.url}${g.href})`,
    ),
    "",
    "## Guider och räknare",
    "",
    ...TOOLS.map(
      (t) => `- [${t.name}](${SITE.url}${toolHref(t)}): ${t.description}`,
    ),
    "",
    "## Om sajten",
    "",
    `- [Om oss](${SITE.url}/om-oss): redaktionen, vilka som skriver och granskar`,
    `- [Så testar vi](${SITE.url}/sa-testar-vi): metoden, viktningen och räkneexempel`,
    `- [Ordlista](${SITE.url}/ordlista): definitioner av CRI, lumen, Zigbee, IP-klass och andra begrepp`,
    `- [Rättelser](${SITE.url}/rattelser): sakfel vi rättat, med datum`,
    `- [Annonsmärkning](${SITE.url}/annonsmarkning): hur sajten tjänar pengar`,
    `- [Integritetspolicy](${SITE.url}/integritetspolicy)`,
    `- [Kontakt](${SITE.url}/kontakt): ${PUBLISHER.email}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
