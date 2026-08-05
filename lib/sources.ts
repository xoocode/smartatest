/**
 * External test citations.
 *
 * We do not run a physical lab. Our scores come from specifications, published
 * measurements and independent tests, so those tests have to be named and
 * linked — an unsourced claim of measurement is the thing we are deliberately
 * not doing. Every URL here was verified to return 200 at its final location;
 * cite the resolved URL, not the one a competitor happens to link.
 */

import { testPagesInCategory } from "@/lib/catalog";
import type { Category } from "@/lib/products";

export type Source = {
  publisher: string;
  title: string;
  url: string;
  /** Publication or last-update date of the cited test, when stated. */
  date?: string;
  /**
   * Market the test was run in, so a reader can weigh it.
   *
   * Listan är explicit och inte `string`. En marknad som saknas ska fällas av
   * typkontrollen, eftersom "Belgien" och "BE" och "be" i samma fält gör
   * `MARKET_LABELS` till en lögn och sidfoten till en skylt med tomrum.
   *
   * Europa är brett representerat med flit. De stora oberoende provningarna är
   * europeiska, samarbetar dessutom inom ICRT och provar delvis samma exemplar:
   * Stiftung Warentest och ÖKO-TEST i Tyskland, Test-Aankoop i Belgien,
   * Consumentenbond i Nederländerna, Que Choisir i Frankrike, Altroconsumo i
   * Italien, K-Tipp i Schweiz. Att utesluta dem hade betytt att välja bort de
   * bästa mätningarna som finns för en svensk köpare.
   *
   * Ordningen är inte alfabetisk. Norden först, sedan övriga Europa, USA sist,
   * vilket är ungefär den ordning en svensk läsare bör väga dem i: elnät,
   * kontakttyper, klimat och produktutbud står närmare ju högre upp.
   */
  market?:
    | "SE"
    | "NO"
    | "DK"
    | "FI"
    | "DE"
    | "BE"
    | "NL"
    | "AT"
    | "CH"
    | "FR"
    | "IT"
    | "ES"
    | "PT"
    | "UK"
    | "US";
  /** What this source contributes that we did not measure ourselves. */
  note?: string;
  /**
   * test       — ett oberoende produkttest, räknas som experttest
   * comparison — en annan jämförelsesajt, alltså en konkurrent. Räknas för sig,
   *              eftersom en affiliatefinansierad topplista inte är ett test och
   *              inte ska adderas till dem
   * standard   — standardiseringsorgan, myndighet, butik eller tillverkare,
   *              citerad för definitioner och specifikationer, inte för omdömen
   *
   * Utelämnad räknas som `test`. Det är den historiska konventionen och gäller
   * de trettio testpublikationer som saknar fältet, men skriv ut det i nya
   * poster: ett glömt fält ska inte kunna göra en butikssida till ett experttest.
   */
  kind?: "test" | "comparison" | "standard";
};

/* Skrivs ut efter utgivaren i källistan, alltså "Stiftung Warentest ·
   Tyskland". Landsnamn på svenska och inget annat: "DE" säger ingenting till
   den som inte redan vet, och det är hela poängen med raden. */
export const MARKET_LABELS: Record<NonNullable<Source["market"]>, string> = {
  SE: "Sverige",
  NO: "Norge",
  DK: "Danmark",
  FI: "Finland",
  DE: "Tyskland",
  BE: "Belgien",
  NL: "Nederländerna",
  AT: "Österrike",
  CH: "Schweiz",
  FR: "Frankrike",
  IT: "Italien",
  ES: "Spanien",
  PT: "Portugal",
  UK: "Storbritannien",
  US: "USA",
};

/**
 * Derived stats for the "what we read" panel. Computed from the array rather
 * than authored, because "vi har läst 14 experttester" is exactly the kind of
 * claim that rots the moment someone edits the list and forgets the prose.
 */
/**
 * Utgivare, utan dubbletter som beror på sammansatta namn.
 *
 * ⚠️ Dela aldrig ett utgivarnamn på " och " rakt av. Tre av fyra sammansatta
 * namn i källistan är **en** organisation eller en odelbar upphovsuppgift:
 * "Svensk Brand- och Säkerhetscertifiering", "Myndigheten för samhällsskydd
 * och beredskap" och "BSI och CEN". En naiv delning gör det första till
 * "Svensk Brand-".
 *
 * Regeln här är därför konservativ: ett sammansatt namn tas bort ur listan
 * **bara** när varje del redan står som egen utgivare i samma uppsättning. Då
 * är det sammansatta namnet redundant och läsaren ser båda ändå. Funktionen
 * hittar aldrig på ett namn, den kan bara utelämna ett.
 *
 * Utan detta läste `/hem-hushall`: "Kemikalieinspektionen och Elsäkerhetsverket,
 * Kemikalieinspektionen, Elsäkerhetsverket, ..." och såg trasig ut.
 */
function distinctPublishers(sources: Source[]): string[] {
  const all = [...new Set(sources.map((s) => s.publisher))];
  return all.filter((name) => {
    const parts = name.split(" och ").map((x) => x.trim());
    if (parts.length < 2) return true;
    return !parts.every((part) => all.includes(part));
  });
}

export function sourceSummary(sources: Source[]) {
  /* Utelämnad `kind` räknas som test, se typen. Jämförelsesajter räknas för
     sig: en affiliatefinansierad topplista är inte ett experttest, och att
     addera dem hade blåst upp den siffra som ska bära trovärdigheten. */
  const tests = sources.filter((s) => s.kind !== "standard" && s.kind !== "comparison");
  const comparisons = sources.filter((s) => s.kind === "comparison");
  /* Myndigheter, standardiseringsorgan, butiker och tillverkare. Störst av de
     tre grupperna, och fram till 2026-08-04 den enda utan eget tal: den låg
     inbakad i "källor" och gick bara att räkna fram genom subtraktion. */
  const standards = sources.filter((s) => s.kind === "standard");
  /* Alla utgivare, inte bara testernas. Rutan heter "Det här har vi gått
     igenom", och myndigheterna och standardiseringsorganen är merparten av
     läsningen i en säkerhetskategori. */
  const publishers = distinctPublishers(sources);
  const testPublishers = [...new Set(tests.map((s) => s.publisher))];
  return {
    total: sources.length,
    testCount: tests.length,
    comparisonCount: comparisons.length,
    standardCount: standards.length,
    publishers,
    testPublishers,
  };
}

/**
 * Källor för /smart-belysning.
 *
 * Datumen tillkom 2026-08-01, när `testomdome` infördes retroaktivt. Två av
 * källorna visade sig vara betydligt äldre än listan antydde: Tek.nos samletest
 * är från 2017 och Dinsides duell från 2019. Att presentera dem odaterade på en
 * sida märkt 2026 är ett trovärdighetsproblem oavsett hur de används i betyget,
 * och det var inte synligt förrän någon frågade vilket år testerna gjordes.
 *
 * Noterna säger nu också **vilka produkter varje källa faktiskt täcker**. Det
 * är det som avgör vilka lampor som kan få ett `testomdome`, och två av dem
 * testar en annan produkt än varumärkesnamnet antyder.
 */
export const SMART_BELYSNING_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Test av smarta LED-lampor",
    url: "https://www.radron.se/tester/boende-tradgard/smarta-led-lampor/",
    market: "SE",
    note: 'Oberoende konsumenttest med mätvärden för ljusflöde och färgåtergivning. Utser Hue White and color ambiance till Bäst i test och ger Wiz E27 A60 utmärkelsen Bra köp, med tillägget att WiZ dras ner av att den är "krånglig att installera". Enda källan som delar ut utmärkelser till produkter vi rankar.',
  },
  {
    publisher: "Ljud & Bild",
    title: "Vi testar smart belysning",
    url: "https://www.ljudochbild.se/test/smart-hem/vi-testar-smart-belysning/",
    date: "2022-06-16",
    market: "SE",
    note: "Svenskt test av sex tillverkare med fokus på appar, scener och integration mot röstassistenter. Täcker Philips Hue, Hombli, WiZ, Ledvance, LIFX och Nanoleaf Lines. Observera att Nanoleaf-produkten är en ljusstav och inte Essentials E27 som vi rankar.",
  },
  {
    publisher: "Tek.no",
    title: "Samletest: smartlys",
    url: "https://www.tek.no/samletest/i/jdgVgq/smartlys",
    date: "2017-08-20",
    market: "NO",
    note: 'Nordiskt samlingstest under samma förutsättningar, men från 2017 och därmed vår äldsta källa. Hue vann, IKEA Trådfri fick "helt greit" och TP-Link LB120 "svakt". Testar Trådfri-systemet i dess första år och LB120 och inte Tapo L530E, så inget av omdömena gäller de produkter vi rankar i dag.',
  },
  {
    publisher: "Dinside",
    title: "Duell: IKEA Trådfri mot Philips Hue",
    url: "https://dinside.dagbladet.no/bolig/duell-ikea-tradfri-mot-philips-hue/70746540",
    date: "2019-02-21",
    market: "NO",
    note: "Direkt jämförelse mellan de två system som dominerar Norden. Gäller systemen som de såg ut 2019, inte de enskilda lampor vi rankar, och används därför som bakgrund snarare än som omdöme.",
  },
  {
    publisher: "TechRadar",
    title: "Philips Hue review",
    url: "https://www.techradar.com/reviews/gadgets/appliances/philips-hue-1124842/review",
    market: "UK",
    note: "Långtidsomdöme om bryggan och Hue-appens stabilitet.",
  },
  {
    publisher: "Expert Reviews",
    title: "Philips Hue review",
    url: "https://www.expertreviews.co.uk/home-garden/philips-hue-review",
    market: "UK",
    note: "Mätningar av dimring och färgtemperatur över Hue-serien.",
  },
  /*
   * De fem svenska jämförelserna, mätta 2026-08-03.
   *
   * Kategorins konkurrens är ojämnare än någon annans. Två av fem behandlar
   * protokollen på allvar och två nämner dem inte alls, trots att det är
   * protokollet som avgör om lampan fungerar ihop med något.
   *
   *   Matter            2 av 5
   *   Zigbee            3 av 5
   *   färgåtergivning   4 av 5
   *   CRI               2 av 5
   *   Ra 9              0 av 5
   *
   * Att `Ra 9` saknas hos alla fem är fyndet. R9 är det röda indexet, alltså
   * det som avgör om hud och trä ser rätt ut, och ett högt CRI kan dölja ett
   * uselt R9. Fältet skriver om färgåtergivning utan att skilja på de två.
   */
  {
    publisher: "Testra",
    title: "Smart lampa bäst i test",
    url: "https://testra.se/test/smart-lampa-bast-i-test-2026",
    market: "SE",
    kind: "comparison",
    note: "Störst i kategorin, 9 544 ord och femton tabeller. Nämner Zigbee genomgående men Matter inte en enda gång, alltså den standard som ersätter protokollfrågan.",
  },
  {
    publisher: "Testix",
    title: "LED-lampa E27 bäst i test, smarta val för hemmet",
    url: "https://testix.se/test/led-lampa-e27",
    market: "SE",
    kind: "comparison",
    note: "6 671 ord och sex tabeller. Tar upp färgåtergivning oftare än någon annan i fältet, men skriver aldrig ut CRI-talet bakom ordet och nämner aldrig något protokoll.",
  },
  {
    publisher: "Bäst i Test Guiden",
    title: "Smart belysning bäst i test, smarta lampor hemma",
    url: "https://www.bast-i-test.se/tester_pa_basta/smart_belysning.html",
    market: "SE",
    kind: "comparison",
    note: "5 176 ord, och den mest påkostade av de fem. Ändå inte ett ord om Matter, Zigbee, CRI eller färgåtergivning, och lumen bara en enda gång. En sida om smart belysning 2026 som inte nämner ett enda protokoll.",
  },
  {
    publisher: "Bästaval",
    title: "Smart belysning bäst i test, 8 modeller jämförda",
    url: "https://bastaval.se/smart-belysning/bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "Bäst av de fem på det tekniska: Matter, Zigbee, lumen och CRI får alla riktig plats, och den är den enda som behandlar protokollfrågan som det den är. Länkar till Amazon i stället för till svensk handel, vilket är skälet att deras rekommendationer inte alltid går att köpa här.",
  },
  {
    publisher: "Diginytt",
    title: "Bästa smarta belysningen för ditt hem",
    url: "https://diginytt.se/tester/basta-smarta-belysningen/",
    market: "SE",
    kind: "comparison",
    note: "Kortast av de fem, 2 808 ord. Nämner både Matter och Zigbee, men bara i förbigående.",
  },
];

/**
 * Källor för /smart-plug.
 *
 * Två saker är värda att veta om underlaget här. Det finns inget svenskt
 * grupptest som täcker just våra fem produkter: Ljud & Bilds test är det enda
 * riktiga svenska grupptestet i kategorin, och det testar sex andra pluggar.
 * Produktnivåtesterna nedan täcker fyra av fem. Cleverio IP200 är Kjells eget
 * märke och ingen oberoende part har testat den, vilket syns på sidan i
 * stället för att döljas.
 *
 * Hemmastyrning.se testar Shelly Plug S i föregående generation, inte Gen3.
 * Det står i noten, eftersom generationerna skiljer sig i både maxlast och
 * Matter-stöd.
 */
export const SMART_PLUG_SOURCES: Source[] = [
  {
    publisher: "Ljud & Bild",
    title: "6 smart plugs med Matter",
    url: "https://www.ljudochbild.se/test/smart-hem/6-smart-plugs-med-matter/",
    date: "2024-01-11",
    market: "SE",
    note: "Det enda svenska grupptestet i kategorin. Lyfter effekttålighet och fysisk storlek som avgörande, vilket är två av våra kriterier.",
  },
  {
    publisher: "Hemmastyrning",
    title: "Test: Plejd Smart Plug",
    url: "https://hemmastyrning.se/test-plejd-smart-plug/",
    market: "SE",
    note: "Svenskt produkttest med uppmätt storlek och standby-effekt, och en rak invändning mot att köpa den utan övriga Plejd-produkter.",
  },
  {
    publisher: "Hemmastyrning",
    title: "Test: Shelly Plug S",
    url: "https://hemmastyrning.se/test-shelly-plug-s/",
    market: "SE",
    note: "Testar föregående generation, inte Gen3. Maxlast och Matter-stöd skiljer mellan generationerna, så omdömet väger lättare för vår produkt.",
  },
  {
    publisher: "Hemmastyrning",
    title: "4 fjärrströmbrytare för motorvärmaren",
    url: "https://hemmastyrning.se/4-fjarrstrombrytare-for-motorvarmaren/",
    market: "SE",
    note: "Den svenska användningen ingen annan jämförelse tar upp. Slår fast att IP44 och tillräcklig effekt är de två sakerna som avgör.",
  },
  {
    publisher: "Trusted Reviews",
    title: "TP-Link Tapo P100 Mini Smart Wi-Fi Socket review",
    url: "https://www.trustedreviews.com/reviews/tp-link-tapo-p100-mini-smart-wi-fi-socket",
    date: "2020-02-20",
    market: "UK",
    note: "Betyg 4,5 av 5 med uppmätta yttermått. Lyfter att pluggen är liten nog att inte skymma grannuttaget.",
  },
  {
    publisher: "TechRadar",
    title: "Philips Hue Smart Plug review",
    url: "https://www.techradar.com/reviews/philips-hue-smart-plug",
    date: "2022-02-11",
    market: "UK",
    note: "Betyg 4 av 5. Bedömer pluggen som en Hue-tillbehörsprodukt snarare än som en fristående smart plug.",
  },
  {
    publisher: "Tek.no",
    title: "Samletest: smarte strømplugger",
    url: "https://www.tek.no/samletest/i/opeJe0/smarte-stroemplugger",
    market: "NO",
    note: "Nordiskt samlingstest av åtta pluggar. Nämner varken maxeffekt eller drifttemperatur, vilket säger något om hur kategorin bedömdes före elprischocken.",
  },
  {
    publisher: "Tek.no",
    title: "Smartpluggene har fått en ny konge på haugen",
    url: "https://www.tek.no/test/i/nark4o/smartpluggene-har-faatt-en-ny-konge-paa-haugen",
    date: "2019-12-21",
    market: "NO",
    note: "Utser en vinnare på fysisk form, installationstid och pris. Lyfter att pluggen inte får blockera grannuttaget.",
  },
  {
    publisher: "Elsäkerhetsverket",
    title: "Elsäkerhet för privatpersoner",
    url: "https://www.elsakerhetsverket.se/privatpersoner/",
    kind: "standard",
    note: "Svensk myndighet. Gäller vad du får koppla själv och vad som ska utföras av ett registrerat elinstallationsföretag.",
  },
  {
    publisher: "Connectivity Standards Alliance",
    title: "Matter: specifikation och certifiering",
    url: "https://csa-iot.org/all-solutions/matter/",
    kind: "standard",
    note: "Organisationen som äger Matter-standarden och certifieringen.",
  },
  /*
   * De sex svenska jämförelserna, mätta 2026-08-03.
   *
   * Kategorin är den mest Matter-medvetna vi mätt, fyra av sex nämner
   * standarden och smartahemtest.se gör det 21 gånger. Fältet kan tekniken.
   *
   * **Det som nästan saknas är vad pluggen själv drar.** En smart plugg sitter
   * i uttaget dygnet runt hela året, också när det den styr är avstängt:
   *
   *   viloeffekt        0 av 6
   *   egenförbrukning   1 av 6, två gånger, hos Testkollen
   *   maxlasten 3 680 W 4 av 6
   *
   * En jämförelse som rekommenderar smarta pluggar för att spara el, utan att
   * nämna vad pluggarna drar när de inte gör något, svarar inte på frågan den
   * ställer. Exakt en av sex svarar på den.
   *
   * ⚠️ `decidely.se/smarta-eluttag-basta-val/` finns i SERP:en men går inte
   * att hämta härifrån över huvud taget, `fetch failed`, inte ens en
   * statuskod. Den är därför inte medtagen.
   */
  {
    publisher: "Testkollen",
    title: "Smart plug wifi bäst i test, pris, test och installation",
    /* Upplöst adress, `/smart-plugs-for-el/` omdirigerar hit utan snedstreck. */
    url: "https://www.testkollen.se/smart-plugs-for-el",
    market: "SE",
    kind: "comparison",
    note: "Störst i kategorin, 13 734 ord och fjorton tabeller, och den enda av de sex som alls tar upp pluggens egen förbrukning. Den är också ensam om att luta sig mot Elsäkerhetsverket. Nämner däremot Matter inte en enda gång, alltså tvärtemot de övriga fem.",
  },
  {
    publisher: "Testra",
    title: "Smart plug bäst i test",
    url: "https://testra.se/test/smart-plug-bast-i-test-2026",
    market: "SE",
    kind: "comparison",
    note: "8 867 ord och sjutton tabeller. Enda av de sex som varken nämner Matter eller något mått på vad pluggen drar i vila, alltså varken framtidssäkringen eller driftkostnaden.",
  },
  {
    publisher: "Smarta Hem",
    title: "Smart plugs bäst i test, för smarta hem",
    url: "https://www.smartahemtest.se/test/basta-smart-plugs",
    market: "SE",
    kind: "comparison",
    note: "Den sida som tar protokollfrågan mest på allvar av alla vi läst. 4 374 ord men 310 bilder och noll tabeller, alltså ett bildspel snarare än en jämförelse.",
  },
  {
    publisher: "Bästa.nu",
    title: "Bästa smartpluggen, 5 toppmodeller i test",
    url: "https://www.xn--bsta-loa.nu/smart-pluggar/",
    market: "SE",
    kind: "comparison",
    note: "Enda av de fem som alls skriver om standbyförbrukning, och som skriver ut maxlasten 3 680 W. Kommer därmed närmast driftkostnadsfrågan utan att nå fram till vad pluggen själv drar. 4 309 ord.",
  },
  {
    publisher: "Diginytt",
    title: "Bästa smart plug för ditt smarta hem",
    url: "https://diginytt.se/tester/basta-smart-plug/",
    market: "SE",
    kind: "comparison",
    note: "2 980 ord. Tar upp Matter och skriver ut maxlasten 3 680 W, alltså rätt tal på rätt ställe.",
  },
  {
    publisher: "Smarta Högtalare",
    title: "Bästa smart plug, test och vinnare",
    url: "https://smartahogtalare.se/kopguider/basta-smart-plug/",
    market: "SE",
    kind: "comparison",
    note: "2 899 ord, och den enda som lägger sina uppgifter i en riktig tabell. Länkar delvis till butiker utanför svensk handel.",
  },
];

/**
 * Pillar-page sources. The test entries are what the collation summary counts;
 * the `standard` entries are specification bodies, cited for definitions of
 * Matter, Thread and Zigbee rather than for any verdict.
 */
/**
 * Källor för /smart-strombrytare.
 *
 * Underlaget är tunnare än i någon annan kategori vi byggt, och det ska synas
 * i stället för att kompenseras. Det finns **inget svenskt grupptest alls** av
 * inbyggnadsreläer och smarta väggbrytare. De två svenska sidor som rankar för
 * termerna, testkollen.se och testix.se, är affiliatesidor utan eget test som
 * dessutom blandar pluggar, väggbrytare och batterifjärrkontroller i samma
 * topplista. De citeras därför inte som källor, de är konkurrenter.
 *
 * Av de fem rankade produkterna har två ett publicerat produkttest. Det är
 * skälet till att `testomdome` väger 15 här i stället för 30, se
 * lib/categories.ts.
 *
 * Två källor bär mer än de andra:
 *
 * - **Elsäkerhetsverket** är `kind: "standard"` och avgör sidans viktigaste avsnitt. Myndighetens egna ord om vad en privatperson får göra är hela skillnaden mot konkurrenterna, varav en publicerar en femstegsguide för att själv installera ett relä bakom brytaren.
 * - **Elinstallatören** är elektrikernas branschtidning och har räknat systemkostnad för en normalstor villa. Det flyttar frågan från styckpris till totalkostnad, och ingen affiliatesida i kategorin citerar den.
 */
export const SMART_STROMBRYTARE_SOURCES: Source[] = [
  {
    publisher: "Elsäkerhetsverket",
    title: "Byta infälld strömbrytare",
    url: "https://www.elsakerhetsverket.se/privatpersoner/detta-far-du-gora-sjalv-med-el/byta-infalld-strombrytare/",
    market: "SE",
    kind: "standard",
    note: 'Myndighetens egna ord: du får själv byta en befintlig strömbrytare för högst 16 A som sitter i egen kapsling eller dosa, "om du vet hur du ska göra". Avgör vilka produkter i jämförelsen du kan montera utan att anlita någon.',
  },
  {
    publisher: "Elsäkerhetsverket",
    title: "Vad får jag göra själv med el?",
    url: "https://www.elsakerhetsverket.se/privatpersoner/detta-far-du-gora-sjalv-med-el/vad-far-jag-gora-sjalv-med-el/",
    market: "SE",
    kind: "standard",
    note: "Den fullständiga listan över tillåtet egenarbete, och gränsen mot förändringar i den fasta installationen som kräver registrerat elinstallationsföretag.",
  },
  {
    publisher: "Elinstallatören",
    title:
      "Shelly är billigare och Wiser är dyrare än Plejd, så mycket kostar systemen i en normalstor villa",
    url: "https://www.elinstallatoren.se/shelly-ar-billigare-och-wiser-ar-dyrare-an-plejd-sa-mycket-kostar-systemen-i-en-normalstor-villa/",
    date: "2025-01-20",
    market: "SE",
    note: "Elektrikernas branschtidning räknar materialkostnad för 140 kvadratmeter villa med 18 belysningsgrupper: Plejd 13 758 kr, Shelly 11 883 kr, Wiser 20 989 kr. Ligger bakom kriteriet Prisvärde, som väger totalkostnad snarare än styckpris.",
  },
  {
    publisher: "The Home Assistant Blog",
    title: "Shelly 1 Gen4 Review",
    url: "https://thehomeassistantblog.com/2025/11/17/shelly-1-gen4-review/",
    date: "2025-11-17",
    market: "UK",
    note: 'Enda publicerade testet av Gen4-modulen. Sätter inget betyg men landar i "still think this is a very good product", med invändningar mot den fysiska knappen, Zigbee-parningen och fördröjningar i eco-läget.',
  },
  {
    publisher: "Blakadder",
    title: "Aqara H1 EU Wall Switches Review",
    url: "https://blakadder.com/aqara-H1/",
    market: "US",
    note: "Genomgång av H1-serien inklusive versionen utan nolledare. Lyfter att knapparna fått nya mikrobrytare med tydligare känsla, vilket är det man faktiskt tar på varje dag.",
  },
  {
    publisher: "MightyGadget",
    title: "Aqara Smart Wall Switch H1 EU Double Rocker Review",
    url: "https://mightygadget.com/aqara-smart-wall-switch-h1-eu-double-rocker-review/",
    market: "UK",
    note: "Brittiskt test av versionen utan nolledare. Brittiska hus har samma problem som äldre svenska: nolledare saknas ofta i brytardosan.",
  },
  {
    publisher: "Hemmastyrning",
    title: "Test: Plejd DIM-01 smart dimmerpuck",
    url: "https://hemmastyrning.se/test-plejd-dim-01-smart-dimmerpuck/",
    market: "SE",
    note: "Testar Plejds dimmerpuck, inte reläet CTR-01 som vi rankar. Räknas därför inte som ett testomdöme för vår produkt, men ligger bakom kriteriet Dimring eftersom det är dimmern du köper till samma system.",
  },
  {
    publisher: "Hemmastyrning",
    title: "Test av strömbrytaren Shelly Pro 1",
    url: "https://hemmastyrning.se/test-av-strombrytaren-shelly-pro-1/",
    date: "2024-04-03",
    market: "SE",
    note: "Testar Shelly Pro 1 för DIN-skena, inte inbyggnadsmodulen. Tas med för att det är det enda svenska testet av en Shelly-brytare över huvud taget, och för invändningen att bygget känns plastigt mot Schneider.",
  },
  {
    publisher: "Tek.no",
    title: "Best i test: smarte knapper",
    url: "https://www.tek.no/samletest/i/yR2B7g/smarte-knapper-test",
    date: "2023-02-24",
    market: "NO",
    note: "Grupptest av trådlösa batteriknappar, alltså avsnittet om brytare utan installation. Uppdaterat 2023 och därmed gammalt, vilket väger ner det: Samsung SmartThings Button vann på 8,5 före Ikea Styrbar och Hue Dimmer Switch på 8,0.",
  },
  /*
   * De tre svenska jämförelserna, mätta 2026-08-03.
   *
   * Kategorin skiljer ut sig: här är fältet faktiskt bra på säkerhetsfrågan.
   * Testkollen nämner Elsäkerhetsverket sjutton gånger och elektriker
   * trettiotvå. Det är ingen tunn affiliatesida.
   *
   * **Skillnaden ligger i ett ord, och ordet är juridiskt.** Sedan
   * elsäkerhetslagen trädde i kraft 1 juli 2017 finns ingen personlig
   * behörighet längre. Arbetet ska utföras av ett **registrerat
   * elinstallationsföretag**, och det är företaget, inte personen, en
   * konsument kan slå upp i Elsäkerhetsverkets register.
   *
   *   elinstallationsföretag   0 av 3
   *   behörig                  1 av 3, åtta gånger
   *
   * Fältet ger alltså rätt råd med fel begrepp, och med ett begrepp som
   * försvann ur lagen för nio år sedan.
   *
   * ⚠️ Här stod att vår sida "skriver aldrig behörig elektriker". Det var
   * sant om `app/smart-strombrytare/page.tsx` och falskt om resten av sajten:
   * en genomgång 2026-08-04 hittade det gamla begreppet i den sitewide
   * ansvarsfriskrivningen, i två köpguider, i ett kriterium och i två
   * frågesvar. Vi gjorde alltså precis det vi anmärkte på. Rättat.
   *
   * Kvar står formuleringen bara där vi **citerar Kjell**, som skriver
   * "kräver behörig elektriker" på sina egna produktsidor. De citaten ska
   * inte moderniseras: poängen är vad butiken faktiskt skriver.
   */
  {
    publisher: "Testkollen",
    title: "Väggströmbrytare bäst i test, testade smarta brytare",
    url: "https://www.testkollen.se/vaggstrombrytare",
    market: "SE",
    kind: "comparison",
    note: "Störst i kategorin, 12 120 ord och sjutton tabeller. Klart bäst i fältet på säkerhet: tar upp Elsäkerhetsverket, elektrikern och nolledaren genomgående, och nolledaren är den detalj som avgör om en smart brytare alls går att montera i en svensk dosa. Skriver ändå aldrig elinstallationsföretag.",
  },
  {
    publisher: "Testix",
    title: "Strömbrytare bäst i test, smarta val för hemmet",
    url: "https://testix.se/test/strombrytare",
    market: "SE",
    kind: "comparison",
    note: "6 599 ord, och lutar sig tyngre mot Matter än någon annan sida vi läst. Samtidigt inte ett ord om vare sig Elsäkerhetsverket eller nolledaren, alltså all protokollkunskap och ingen installationskunskap i en kategori som sitter fast i väggen.",
  },
  {
    publisher: "Svenskt Bygg",
    title: "Fjärrströmbrytare bäst i test",
    url: "https://svensktbygg.se/fjarrstrombrytare/",
    market: "SE",
    kind: "comparison",
    note: "Kortast av de tre, 2 377 ord utan tabeller. Nämner elektriker fyra gånger men varken myndigheten, nolledaren eller något protokoll.",
  },
];

export const SMART_HEM_SOURCES: Source[] = [
  ...SMART_BELYSNING_SOURCES,
  {
    publisher: "PC för Alla",
    title: "Guider och tester om smarta hem",
    url: "https://www.pcforalla.se/",
    market: "SE",
    note: "Löpande svensk bevakning av hubbar, ekosystem och Matter-stöd.",
  },
  {
    publisher: "Connectivity Standards Alliance",
    title: "Matter: specifikation och certifiering",
    url: "https://csa-iot.org/all-solutions/matter/",
    kind: "standard",
    note: "Organisationen som äger Matter-standarden och certifieringen.",
  },
  {
    publisher: "Connectivity Standards Alliance",
    title: "Zigbee",
    url: "https://csa-iot.org/all-solutions/zigbee/",
    kind: "standard",
    note: "Specifikationen bakom Hue, IKEA och de flesta bryggbaserade system.",
  },
  {
    publisher: "Thread Group",
    title: "What is Thread",
    url: "https://threadgroup.org/What-is-Thread/Overview",
    kind: "standard",
    note: "Nätverkslagret som Matter använder för batteridrivna enheter.",
  },
  {
    publisher: "Elsäkerhetsverket",
    title: "Elsäkerhet för privatpersoner",
    url: "https://www.elsakerhetsverket.se/privatpersoner/",
    kind: "standard",
    note: "Svensk myndighet. Gäller allt som kopplas till fast installation.",
  },
];

/**
 * Källor för /elektrisk-rullgardin.
 *
 * ## Det finns inget nordiskt test av kategorin
 *
 * Ingen av Råd & Rön, Ljud & Bild, Tek.no eller Dinside har testat gardinrobotar.
 * De nordiska tester som finns gäller **IKEA Fyrtur**, alltså en produkt som
 * utgått ur sortimentet. De två citeras här ändå, men som `standard` snarare än
 * `test`: de dokumenterar vad IKEA en gång sålde och används i avsnittet om
 * varför IKEA lämnat kategorin, aldrig som betygsunderlag för någon produkt vi
 * rankar.
 *
 * Allt egentligt testunderlag är därför engelskspråkigt och gäller enskilda
 * produkter. Det är skälet till att `testomdome` bara väger 10, se
 * lib/categories.ts.
 *
 * ## IKEA:s eget besked är en källa i sig
 *
 * Kundtjänstartikeln nedan är den enda plats där IKEA skriver rakt ut att de
 * smarta rullgardinerna är borta. Varje svensk sida i kategorin rekommenderar
 * fortfarande FYRTUR, så det citatet är sidans mest värdefulla enskilda uppgift.
 *
 * ## Aqara publicerar inte ljudnivå
 *
 * Varken Kjells produktsida eller Aqaras egen specifikation anger dB. Det som
 * finns är recensenternas intryck, och de återges som intryck. Vi hittar inte på
 * en siffra åt en tillverkare som valt att inte ange någon.
 */
export const ELEKTRISK_RULLGARDIN_SOURCES: Source[] = [
  {
    publisher: "IKEA Sverige",
    title: "Kommer det finnas ersättare till våra smarta rullgardiner?",
    url: "https://www.ikea.com/se/sv/customer-service/knowledge/articles/7420d994-7bc6-47ef-93ca-bbb82e4bcef1.html",
    market: "SE",
    kind: "standard",
    note: 'IKEA:s egna ord: "TREDANSEN och PRAKTLYSING rullgardiner inom Home Smart har utgått ur sortimentet under hösten 2025." Ligger bakom avsnittet om att IKEA lämnat kategorin.',
  },
  {
    publisher: "TechHive",
    title: "SwitchBot Curtain 3 review: 3rd-gen curtain controller gets it right",
    url: "https://www.techhive.com/article/2238336/switchbot-curtain-3-review-3rd-gen-curtain-controller-gets-it-right.html",
    market: "US",
    note: "Testar just tredje generationen och jämför den mot föregångaren. Lyfter den kraftigare motorn och magneten som ersätter manuell kalibrering av stoppläget.",
  },
  {
    publisher: "Trusted Reviews",
    title: "SwitchBot Curtain 3 review: The quiet way to turn your curtains smart",
    url: "https://www.trustedreviews.com/reviews/switchbot-curtain-3",
    market: "UK",
    note: "Bekräftar det tysta läget som produktens starkaste egenskap, och att hubb krävs för att styra den utanför Bluetooth-räckvidd.",
  },
  {
    publisher: "SmartHomeScene",
    title: "SwitchBot Curtain 3 Review and Home Assistant Integration",
    url: "https://smarthomescene.com/reviews/switchbot-curtain-3-review-and-home-assistant-integration/",
    market: "UK",
    note: "Det mest tekniska av testerna. Går igenom hur produkten beter sig lokalt via Home Assistant, alltså utan tillverkarens moln.",
  },
  {
    publisher: "TechRadar",
    title: "SwitchBot Blind Tilt review",
    url: "https://www.techradar.com/home/smart-home/switchbot-blind-tilt-review",
    market: "UK",
    note: "Slår fast att produkten bara vinklar lamellerna och inte hissar persiennen, vilket är den vanligaste missuppfattningen om den.",
  },
  {
    publisher: "TechHive",
    title: "SwitchBot Blind Tilt review: Hack your way to a smart mini-blind",
    url: "https://www.techhive.com/article/1381091/switchbot-blind-tilt-robot-review.html",
    market: "US",
    note: "Går igenom kompatibiliteten med olika persienntyper, som är den avgörande frågan innan köp.",
  },
  {
    publisher: "SmartHomeScene",
    title: "SwitchBot Blind Tilt Review with Solar Panel",
    url: "https://smarthomescene.com/reviews/switchbot-blind-tilt-review-and-home-assistant-integration/",
    market: "UK",
    note: "Testar solpanelen över tid, alltså påståendet att produkten aldrig behöver laddas manuellt.",
  },
  {
    publisher: "Android Police",
    title: "Aqara Curtain Driver E1 review: Smart but expensive curtain automation",
    url: "https://www.androidpolice.com/aqara-curtain-driver-e1-review/",
    market: "US",
    note: "Kritiserar priset och kravet på hubb, men lyfter batteritiden som klassens bästa.",
  },
  {
    publisher: "Everything Smart Home",
    title: "Aqara Curtain Driver E1 Review",
    url: "https://everythingsmarthome.co.uk/finally-some-real-competition-aqara-curtain-driver-e1-review/",
    market: "UK",
    note: "Jämför direkt mot SwitchBot. Ljudnivån är den enskilda punkt där Aqara beskrivs som klart sämre, och det är intryck och inte en uppmätt siffra.",
  },
  {
    publisher: "Teknikveckan",
    title: "Styr gardinen bekvämt med Aqara Curtain Driver E1",
    url: "https://teknikveckan.se/styr-gardinen-bekvamt-med-aqara-curtain-driver-e1/",
    market: "SE",
    note: "Det enda svenskspråkiga materialet om någon av produkterna vi rankar. Beskriver installationen och HomeKit-integrationen, men sätter inget betyg.",
  },
  {
    publisher: "Tek.no",
    title: "Ikeas elektriske rullegardiner går opp og ned",
    url: "https://www.tek.no/test/i/9vQOqd/ikeas-elektriske-rullegardiner-gaar-opp-og-ned",
    market: "NO",
    kind: "standard",
    note: "Nordiskt test av IKEA Fyrtur. Citeras som dokumentation av vad IKEA sålde, inte som betygsunderlag: produkten finns inte kvar i sortimentet.",
  },
  {
    publisher: "M3",
    title: "Test: IKEA Fyrtur, smart rullgardin styrs med app och fjärrkontroll",
    url: "https://www.m3.se/article/1860773/ikea-fyrtur-smart-rullgardin.html",
    market: "SE",
    kind: "standard",
    note: "Svenskt test av samma utgångna produkt, av samma skäl som Tek.no ovan.",
  },
  {
    publisher: "Connectivity Standards Alliance",
    title: "Matter: specifikation och certifiering",
    url: "https://csa-iot.org/all-solutions/matter/",
    kind: "standard",
    note: "Organisationen bakom Matter. Avgör vad ett Matter-stöd via hubb faktiskt innebär.",
  },
  /*
   * De fyra svenska jämförelserna, mätta 2026-08-03.
   *
   * ⚠️ **Fyndet här är att konkurrenterna inte skriver om vår produkt.** De
   * fyra sidor som rankar på "rullgardin bäst i test" handlar om
   * mörkläggningsgardiner som dras för hand. Tillsammans 32 817 ord:
   *
   *   Matter, Zigbee eller HomeKit   0 av 4
   *   ordet motoriserad              1 gång per sida, på tre av fyra
   *
   * Ingen av dem behandlar alltså det som gör en elektrisk rullgardin
   * elektrisk. Det är värt att ha i minnet vid två tillfällen: när någon vill
   * mäta oss mot deras ordantal, och när någon vill bredda vår sida mot
   * manuella gardiner för att fånga deras trafik. Det senare vore att byta
   * kategori.
   */
  {
    publisher: "Testkollen",
    title: "Mörkläggande rullgardin bäst i test, topplista och guide",
    /* Upplöst adress, snedstrecket faller bort. */
    url: "https://www.testkollen.se/rullgardin",
    market: "SE",
    kind: "comparison",
    note: "Störst i fältet, 11 207 ord och nitton tabeller. Skriver motoriserad en enda gång på hela sidan, och nämner inget smarthemsprotokoll alls.",
  },
  {
    publisher: "Testexperterna",
    title: "Rullgardin bäst i test, toppval",
    url: "https://testexperterna.se/rullgardin",
    market: "SE",
    kind: "comparison",
    note: "8 995 ord, och den mest påkostade av de fyra. Nämner måttbeställning i förbigående, trots att det är den verkliga skiljelinjen i kategorin: en måttbeställd gardin går inte att jämföra på pris med en i standardmått.",
  },
  {
    publisher: "Testix",
    title: "Rullgardin bäst i test, guide till mörkläggande och smarta rullgardiner",
    url: "https://testix.se/test/rullgardin",
    market: "SE",
    kind: "comparison",
    note: 'Rubriken lovar "smarta rullgardiner". På 6 535 ord nämns varken Matter, Zigbee, HomeKit eller ens ordet motoriserad.',
  },
  {
    publisher: "Mörkläggningsguiden",
    title: "Mörkläggningsgardin bäst i test, bästa mörkläggningen",
    url: "https://xn--mrklggningsguiden-tqb25a.se/",
    market: "SE",
    kind: "comparison",
    note: "En hel domän för mörkläggning, 6 080 ord, och den enda som tar måttbeställning på allvar med 22 omnämnanden. Just därför är den också tydligast på att kategorin de skriver om inte är vår: noll protokoll och en enda träff på motoriserad.",
  },
];

/**
 * Källor för /utomhustimer.
 *
 * ⚠️ Notera vad som saknas: **det finns inte ett enda oberoende test av
 * kategorin på någon nordisk marknad.** Vi har sökt på svenska, norska och
 * danska. Råd & Rön har inget, Ljud & Bild har inget, Tek.no har inget. De sex
 * sidor som rankar högst på `utomhustimer bäst i test` är affiliatelistor, med
 * ett undantag: Bygghemma, som är en butik som jämför sitt eget sortiment.
 *
 * Därför saknar den här kategorin kriteriet `testomdome` helt, och därför är
 * merparten av listan nedan `kind: "standard"`. Vi citerar myndighet och
 * butiksjämförelse för vad de är, inte som betygsunderlag. Att skriva ut det
 * är mer värt än att låtsas om ett test som inte finns.
 */
export const UTOMHUSTIMER_SOURCES: Source[] = [
  {
    publisher: "Elsäkerhetsverket",
    title: "Julbelysning och IP-klass",
    url: "https://www.elsakerhetsverket.se/om-oss/press/nyhetsbrev/2024/december/nyhetsbrev-fran-elsakerhetsverket-december-2024/julbelysning-och-ip-klass/",
    date: "2024-12",
    market: "SE",
    kind: "standard",
    note: "Myndighetens gräns för vad som får stå ute: IP44 eller högre siffervärde gäller för en ljusslinga som kan placeras på mark utomhus. Det är kriteriet väderskydd i sin hårda form, och det är skälet att ingen produkt under IP44 finns med i jämförelsen.",
  },
  {
    publisher: "Elsäkerhetsverket",
    title: "Säker el utomhus",
    url: "https://www.elsakerhetsverket.se/privatpersoner/du-ar-ansvarig-for-elen/saker-el-utomhus/",
    market: "SE",
    kind: "standard",
    note: "Uttag utomhus ska alltid vara skyddsjordade, och för nya uttag gäller dessutom krav på jordfelsbrytare. Samma sida säger att man bara ska ansluta elprodukten för utomhusbruk under den tid man använder den, vilket står i spänning mot en timer som sitter ute hela december. Den avvägningen har sitt eget avsnitt i köpguiden.",
  },
  {
    publisher: "Elsäkerhetsverket",
    title: "Julbelysning",
    url: "https://www.elsakerhetsverket.se/privatpersoner/dina-elprodukter/produkter/belysning/julbelysning/",
    market: "SE",
    kind: "standard",
    note: "Myndighetens råd inför säsongen, bland annat att inte dra skarvsladd genom fönstret och att kontrollera slingorna varje år innan de sätts upp.",
  },
  {
    publisher: "Bygghemma",
    title: "Timer utomhus bäst i test 2026",
    url: "https://www.bygghemma.se/reportage-och-guider/timer-utomhus-bast-i-test/",
    date: "2026-02",
    market: "SE",
    kind: "standard",
    note: "Den enda seriöst gjorda svenska jämförelsen i kategorin, med egen fotografering och namngiven skribent. Citeras som standard och inte som test av ett enda skäl: Bygghemma är butiken, och de fyra produkter som jämförs är fyra produkter de själva säljer. Deras testvinnare, Gelia EMT444S, ingår inte i vår rankning eftersom vi inte hittat den hos någon butik utanför Bygghemmakoncernen.",
  },
  {
    publisher: "Connectivity Standards Alliance",
    title: "Matter: specifikation och certifiering",
    url: "https://csa-iot.org/all-solutions/matter/",
    kind: "standard",
    note: "Organisationen bakom Matter. Avgör vad Matter-stödet i Tapo P410M och Shelly Outdoor Plug S Gen3 faktiskt innebär, och vad det inte innebär.",
  },
  /*
   * De tre svenska jämförelserna, mätta 2026-08-03.
   *
   * **Tunnast fält vi mätt.** De tre är tillsammans 5 189 ord, alltså mindre
   * än en enda av sidorna i luftrenar- eller strömbrytarkategorin. Ingen av
   * dem har en tabell.
   *
   * Alla tre är förankrade i IP44 och stannar där:
   *
   *   IP44             3 av 3
   *   IP65             0 av 3
   *   motorvärmare     0 av 3
   *   skymningsrelä    0 av 3
   *   astrofunktion    0 av 3
   *
   * Att motorvärmaren saknas hos alla tre är anmärkningsvärt i en svensk
   * kategori: det är den användning som gör att timern behöver klara kyla och
   * som avgör vilken last den ska tåla. Att skymnings- och astrofunktionen
   * saknas är det andra hålet, eftersom det är den funktionen som skiljer en
   * timer som följer solen från en som följer klockan, och skillnaden märks
   * mest i november när sidan söks.
   */
  {
    publisher: "Svenskt Bygg",
    title: "Timer utomhus bäst i test, topp 5",
    url: "https://svensktbygg.se/timer-utomhus/",
    market: "SE",
    kind: "comparison",
    note: "Störst av de tre, och det säger mest om fältet: 2 719 ord. Nämner IP44 fem gånger utan att förklara vad klassen skyddar mot eller vilken klass som krävs var.",
  },
  {
    publisher: "Hemmaprylar",
    title: "Vi testar utomhustimer för att se vilken som är bäst i test",
    url: "https://hemmaprylar.se/utomhustimer/",
    market: "SE",
    kind: "comparison",
    note: 'Rubriken säger "Vi testar", 1 238 ord och sju bilder. Samma testpåstående utan metod som deras vattenlarmssida, och här på ännu mindre underlag.',
  },
  {
    publisher: "Bygghemma",
    title: "Timer utomhus bäst i test, vi jämför olika utomhustimers",
    url: "https://www.bygghemma.se/reportage-och-guider/timer-utomhus-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "Kortast av de tre, 1 232 ord, men den som tar elsäkerheten mest på allvar: IP44 fjorton gånger och jordad tio. Butikens egen sida om det egna sortimentet.",
  },
];

/**
 * Vattenlarm.
 *
 * Sju av åtta poster är `standard`. Det speglar kategorin: det finns ingen
 * laboratorieprovning av vattenlarm att luta sig mot i Sverige, Norden eller
 * Tyskland. Stiftung Warentest har inte testat kategorin, och de tyska
 * träffarna som ser ut som tester (vergleich.org, expertentesten.de,
 * test-stiftung.de, vars namn avsiktligt liknar Stiftung Warentest) redovisar
 * inte ett enda mätvärde.
 *
 * Tyngdpunkten ligger i stället på svensk skadestatistik och på
 * försäkringsbolagens egna villkor, eftersom det är där kategorins verkliga
 * beslutsunderlag finns. Vad en skada kostar och vad en självrisk ligger på
 * avgör om ett larm för 199 kronor är värt pengarna, och det är siffror från
 * branschen själv.
 */
export const VATTENLARM_SOURCES: Source[] = [
  {
    publisher: "Brandinfo",
    title: "Recension av X-Sense smart brandsäkerhetssystem",
    url: "https://brandinfo.se/brandvarnare/x-sense-fs31-smart-brandsakerhetssystem/",
    market: "SE",
    kind: "test",
    note: "Den enda faktiska recensionen vi hittat av någon produkt i rankningen. Gäller X-Sense-systemet med basstationen SBS50 och vattenvarnaren SWS51. Att den täcker en av tio produkter är skälet till att den här sidan saknar ett testomdöme-kriterium: ett kriterium som är blankt för nio av tio jämför ingenting.",
  },
  {
    publisher: "Vattenskadecentrum",
    title: "Så mycket kostar vattenskadorna i Sverige",
    url: "https://www.vattenskadecentrum.se/nyheter/sa-mycket-kostar-vattenskadorna-i-sverige",
    market: "SE",
    kind: "standard",
    note: "Branschens egen skadestatistik. Snittkostnad 49 700 kronor per skada, och för lägenheter mellan 80 000 och 133 000. Självrisken ensam ligger på 3 440 till 10 000 kronor och åldersavdraget på 9 700 till 26 100. Det är de siffrorna ett larm för 199 kronor ska ställas mot, inte mot vad larmet kostar.",
  },
  {
    publisher: "Vattenskadecentrum",
    title: "Vattenskaderapporten 2022",
    url: "https://www.vattenskadecentrum.se/custom/docs/Vattenskaderapport_2022_fullstandig_web.pdf",
    date: "2022",
    market: "SE",
    kind: "standard",
    note: "Den fullständiga undersökningen bakom siffrorna ovan, med fördelningen på rum och orsak.",
  },
  {
    publisher: "Länsförsäkringar",
    title: "Rabatt på villaförsäkringen med vattenfelsbrytare",
    url: "https://www.lansforsakringar.se/norrbotten/privat/om-oss/erbjudanden/rabatt-pa-villaforsakringen-med-vattenfelsbrytare/",
    market: "SE",
    kind: "standard",
    note: "Tio procents rabatt på villa- och fritidshusförsäkringen vid godkänd vattenfelsbrytare, mot uppvisat installationsintyg. Villkoren sätts av respektive länsbolag, så nivån kan skilja sig åt mellan län.",
  },
  /* Tillagda 2026-08-04. Kravet på aktivt skydd i kök trädde i kraft
     1 januari 2026 och sidan sa ingenting om det, trots att CR 139 uttryckligen
     omfattar vattenlarm. Se .agent/research/vattenfelsbrytare.md §1b.

     Butiksbloggen som först gav uppslaget återgav regeln bredare än den är:
     den skrev att kök måste förses med fuktsensorer, medan paragrafen hänger
     kravet på den vattentäta insatsen eller tråget. Därför citeras bara
     primärkällorna nedan. */
  {
    publisher: "Säker Vatten",
    title: "Branschregler Säker Vatteninstallation 2026:1",
    url: "https://sakervatten.se/branschregler/branschregler-saker-vatteninstallation-20261/",
    date: "2026",
    market: "SE",
    kind: "standard",
    note: 'Gäller sedan 1 januari 2026. Bland de största regelförändringarna: "Det ska finnas ett aktivt skydd mot vattenskador i kök. Det ska finnas en fuktsensor som är kopplad till en läckagebrytare, vattenfelsbrytare eller vattenlarm. Produkterna ska vara typgodkända enligt en ny provmetod." Övergångsregeln låter arbete med bygglov beviljat före årsskiftet följa 2021:2.',
  },
  {
    publisher: "Säker Vatten",
    title: "Ändringar och nyheter i Branschregler Säker Vatteninstallation 2026:1",
    url: "https://sakervatten.se/wp-content/uploads/2025/10/branschregler-2026-samlade-andringar-lagupplost.pdf",
    date: "2025-10",
    market: "SE",
    kind: "standard",
    note: 'Det officiella ändringsdokumentet, med paragrafnummer. Ordagrant: "Vattentät insats eller tråg ska ha fuktsensor som är kopplad till läckagebrytare, vattenfelsbrytare eller vattenlarm som bryter tappvattentillförseln eller larmar om läckage. (4.3 och 4.3.1)" Kravet hänger alltså på insatsen eller tråget, inte på köket i allmänhet.',
  },
  {
    publisher: "Säker Vatten",
    title: "Aktiva skydd",
    url: "https://sakervatten.se/vvs-produkter/aktivaskydd/",
    date: "2026-07-02",
    market: "SE",
    kind: "standard",
    note: 'Namnger certifieringsregeln: läckagebrytare, vattenfelsbrytare eller vattenlarm "ska vara godkända enligt CR 139". Säker Vatten godkänner inte själva produkter, utan hänvisar frågor om provning och typgodkännande till RISE.',
  },
  {
    publisher: "Tollco",
    title: "Tollcos vattenlarm nu RISE-certifierade enligt CR 139",
    url: "https://tollco.se/nyheter/rise-certifierade-vattenlarm/",
    market: "SE",
    kind: "standard",
    note: "Enda tillverkaren bakom ett rankat larm som skriver ut ett certifikatnummer: C901472, som omfattar både batteridriven och nätansluten modell samt tillverkningskontroll. Tillverkarens egen uppgift. Att övriga fabrikat saknas här är ingen uppgift om dem, bara om vad de själva publicerar.",
  },
  {
    publisher: "Folksam",
    title: "Förebygg vattenskada och få rabatt",
    url: "https://www.folksam.se/forsakringar/rabatter-och-formaner/forebygg-vattenskada",
    market: "SE",
    kind: "standard",
    note: "Tio procent på villa- eller fritidshusförsäkringen, men bara med godkänd vattenfelsbrytare OCH underlägg under vitvaror och diskbänk. Bolaget nämner inte vattenlarm som rabattgrundande, vilket är hela skälet till att den här sidan skiljer på larm och felsbrytare.",
  },
  {
    publisher: "Länsförsäkringar",
    title: "Vattenvakter",
    url: "https://www.lansforsakringar.se/stockholm/privat/forsakring/vakter/vattenvakter/",
    market: "SE",
    kind: "standard",
    note: "Bolagets egen beskrivning av vad ett vattenlarm gör och var det bör placeras.",
  },
  {
    publisher: "TP-Link",
    title: "Tapo T300, produktspecifikation",
    url: "https://www.tapo.com/us/product/smart-sensor/tapo-t300/",
    kind: "standard",
    note: "Tillverkarens egen sida, och den som avgör hubbfrågan: T300 kräver en Tapo-hubb H100 eller H200, som säljs separat. Butikernas produktsidor nämner det inte alltid. IP67, 90 dB justerbar siren, sex prober, och en hubb hanterar upp till 64 sensorer.",
  },
  {
    publisher: "TP-Link",
    title: "Tapo T300, användarmanual",
    url: "https://static.tp-link.com/upload/manual/2023/202308/20230821/1910013487_Tapo%20T300_UG_V1.pdf",
    kind: "standard",
    note: "Manualen, för de uppgifter produktsidan utelämnar.",
  },
  /*
   * De fem svenska jämförelserna, mätta 2026-08-03.
   *
   * Underlaget i `.agent/research/vattenlarm.md` §5 räknade tre. De två
   * tillkomna, tryggtochsäkerthem.se och `bäst-i-test.org`, hittades i samma
   * svep och ändrar inte slutsatsen utan skärper den.
   *
   * ⚠️ `xn--bst-i-test-q5a.org` är **.org** och en annan sajt än
   * `xn--bst-i-test-q5a.se`, som citeras på /avfuktare. Samma namn, samma
   * punycode, olika toppdomän. Slå ihop dem inte.
   *
   * Två fynd, båda kontrollerade term för term på alla fem:
   *
   * 1. **Alla fem påstår att de testat produkterna själva.** Rubrikerna heter
   *    "Genomförandet av Testet", "Så testar vi våra vattenlarm", "Hur vi
   *    utförde detta test". Ingen redovisar ett mätvärde, en metod eller en
   *    källa. Det är därför sidan skriver rakt ut att ingen har testat de här
   *    produkterna, varken de eller vi.
   * 2. **Noll av fem nämner Vattenskadecentrum, självrisk eller åldersavdrag.**
   *    Självrisken på 3 440 till 10 000 kronor mot ett larm på 190 är hela
   *    lönsamhetskalkylen, och den står inte på någon av dem.
   */
  {
    publisher: "Hemmaprylar",
    title: "6 bästa vattenlarmen, bäst i test vattenlarm",
    /* Upplöst adress. `/vattenlarm-bast-i-test/` omdirigerar hit. */
    url: "https://hemmaprylar.se/vattenlarm/",
    market: "SE",
    kind: "comparison",
    note: 'Störst av de fem, 3 829 ord. Har rubrikerna "Hur vi utförde vårt test", "Organisering av Testområde" och "Genomförandet av Testet", och säger "vårt test" gång på gång, utan att redovisa ett enda mätvärde.',
  },
  {
    publisher: "Vattenlarmsguiden",
    title: "Vattenlarm bäst i test",
    url: "https://vattenlarmsguiden.se/",
    market: "SE",
    kind: "comparison",
    note: 'En hel domän för en produktkategori, och startsidan är jämförelsen. 3 359 ord och tre tabeller. Rubriken "Så testar vi våra vattenlarm" står över en text utan en enda mätning.',
  },
  {
    publisher: "Testvinnarna",
    title: "Vattenlarm bäst i test, köpguide, för- och nackdelar",
    url: "https://testvinnarna.se/vattenlarm/",
    market: "SE",
    kind: "comparison",
    note: 'Kortast av de fem, 2 250 ord. Kallar sig test genomgående, bland annat i rubriken "Hur vi utförde detta test", utan att redovisa ett enda.',
  },
  {
    publisher: "Tryggt och säkert hem",
    title: "Vattenlarm bäst i test",
    url: "https://www.xn--tryggtochskerthem-zqb.se/hemlarm/vattenlarm/vattenlarm-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "3 758 ord och femton h2-rubriker, men noll tabeller och inget produktschema. Enda av de fem som nämner IP-klass över huvud taget, och då en enda gång.",
  },
  {
    publisher: "Bäst i test",
    title: "Bästa vattenlarm",
    /* Punycode och **.org**, inte .se. Se varningen ovan. */
    url: "https://xn--bst-i-test-q5a.org/basta-vattenlarm/",
    market: "SE",
    kind: "comparison",
    note: "Tunnast av de fem med 1 016 ord. Rubrikerna lovar mer produktkunskap än texten under dem innehåller.",
  },
];

/**
 * Brandvarnare.
 *
 * Källäget här skiljer sig från våra övriga kategorier på ett sätt som är värt
 * att förstå innan listan används.
 *
 * **Det finns exakt en verklig brandprovning**, Stiftung Warentests, och den
 * täcker inga av de produkter som säljs på svenska hyllor. De testade tyska
 * märken: Ei Electronics, Abus, Busch-Jaeger, Pyrexx, Cavius och Hekatron.
 *
 * **De sex svenska jämförelserna är av mycket olika slag.** Fyra av dem
 * monetiseras via affiliatelänkar, i tre fall genom Adtraction mot exakt de
 * butiker vi själva länkar till. Ingen av dem redovisar ett mätvärde. Det är
 * skälet till att de står som `standard` och inte som `test`, precis som
 * Bygghemma på /utomhustimer, och till att sidans kriterium heter "omdöme i
 * publicerade jämförelser" i stället för "testomdöme".
 *
 * Att de ändå finns med är ett medvetet val: användaren bad om att både svenska
 * och internationella bäst i test-sidor ska ingå, och en läsare som vill
 * kontrollera vår rankning ska kunna se vad de andra kommit fram till och vilka
 * de är.
 */
export const BRANDVARNARE_SOURCES: Source[] = [
  {
    publisher: "Stiftung Warentest",
    title: "Rauchmelder im Test",
    url: "https://www.test.de/Rauchmelder-im-Test-4957385-0/",
    date: "2021-01",
    market: "UK",
    kind: "test",
    note: "Den enda verkliga brandprovningen i hela underlaget. 16 rökvarnare, varav 13 vanliga och 3 radiosammankopplade, provade på väckningsförmåga vid olika brandtyper, falsklarmrisk, luftströmning, ljudnivå, handhavande, falltest och stöttest. 13 fick gut, och Ei Electronics Ei650 vann. Ingen av produkterna vi rankar ingick: de testade den tyska marknaden. Deras separata test av smarta varnare är från 2018 och därmed inte användbart.",
  },
  {
    publisher: "Brandinfo",
    title: "Brandvarnare bäst i test, 8 modeller",
    url: "https://brandinfo.se/brandvarnare/basta-brandvarnaren-bast-i-test/",
    date: "2026",
    market: "SE",
    kind: "comparison",
    note: "Utser Housegard Luma till bästa brandvarnare. Jämför sammankopplingsbarhet, uppkoppling, frekvens, storlek, batteri och garanti på åtta modeller. Citeras som referens och inte som test, eftersom de inte beskriver någon egen provning. De rankar dessutom Google Nest Protect, som Google lade ner i mars 2025.",
  },
  {
    publisher: "Testix",
    title: "Brandvarnare bäst i test",
    url: "https://testix.se/test/brandvarnare",
    date: "2026",
    market: "SE",
    kind: "comparison",
    note: "Enda svenska sidan som publicerar en viktning: 30 procent detektionsförmåga, 20 ljudstyrka, 20 installation, 15 smarta funktioner, 15 prisvärde. Utser också Housegard Luma till vinnare. Påstår egna inköp och att de mätt hur snabbt varnaren reagerar på rök, men publicerar inget enda mätvärde.",
  },
  {
    publisher: "Testexperterna",
    title: "Brandvarnare bäst i test",
    url: "https://testexperterna.se/brandvarnare",
    date: "2026",
    market: "SE",
    kind: "comparison",
    note: "Ärligast formulerade av de svenska jämförelserna: de säger rakt ut att de sammanställer expertutlåtanden, användaromdömen och pris i stället för att påstå eget test. Samtidigt märker de upp ett aggregerat kundbetyg på 5 av 1 recension och ett erbjudande som pekar på deras egen sida i stället för butikens.",
  },
  {
    publisher: "Brandskyddskollen",
    title: "Bästa seriekopplade brandvarnare",
    url: "https://brandskyddskollen.se/basta-seriekopplade-brandvarnare/",
    date: "2026",
    market: "SE",
    kind: "comparison",
    note: "Den enda svenska sidan som byggt sin jämförelse runt sammankoppling, alltså samma axel som vi väger tyngst. Beskriver ingen egen provning.",
  },
  {
    publisher: "Boverket",
    title: "Brandvarnare i byggreglerna",
    url: "https://www.boverket.se/sv/byggande/sakerhet/brandskydd/brandvarnare/",
    market: "SE",
    kind: "standard",
    note: "Kravet på brandvarnare i nybyggda bostäder, och vad byggreglerna säger om placering.",
  },
  {
    publisher: "Storstockholms brandförsvar",
    title: "Brandutrustning att ha hemma",
    url: "https://www.storstockholm.brand.se/i-hemmet/brandutrustning-att-ha-hemma/",
    market: "SE",
    kind: "standard",
    note: "Räddningstjänstens egen lista över vad ett hem ska ha: brandvarnare på varje våningsplan, minst en 6-kilos pulversläckare enligt EN3 och en brandfilt nära köket. Källan till placeringsråden i köpguiden, inklusive att varnaren ska sitta mitt i taket eller minst femtio centimeter från vägg.",
  },
];

/**
 * Smarta brandvarnare.
 *
 * Två saker skiljer den här listan från den för vanliga brandvarnare.
 *
 * **Nedläggningen av Nest Protect är belagd i tre oberoende källor**, varav en
 * är First Alert själva, alltså den tillverkare Google pekar på som ersättare.
 * Det behövdes, eftersom påståendet är sidans huvudvinkel och eftersom svenska
 * jämförelser fortfarande rankar produkten.
 *
 * **Stiftung Warentest finns inte med.** Deras rökvarnartest omfattar bara
 * vanliga och radiosammankopplade modeller. Smarta varnare testade de i en
 * separat undersökning 2018, alltså åtta år gammal, och den citerar vi inte
 * som underlag för produkter som säljs i dag.
 */
export const SMART_BRANDVARNARE_SOURCES: Source[] = [
  {
    publisher: "First Alert",
    title: "Replacing your Google Nest Protect with First Alert",
    url: "https://www.firstalert.com/blogs/safety-corner/replacing-your-google-nest-protect-with-first-alert",
    date: "2025",
    kind: "standard",
    note: "Tillverkaren Google själva hänvisar till. Beskriver SC5 som direkt ersättare, byggd för att passa Nest Protects befintliga fästplatta och kunna sammankopplas med kvarvarande Nest Protect-enheter. Bekräftar nedläggningen från motparten i partnerskapet.",
  },
  {
    publisher: "Tom's Guide",
    title: "Google kills off Nest Protect, partners with First Alert",
    url: "https://www.tomsguide.com/home/smart-home/google-kills-off-nest-protect-partners-with-first-alert-for-new-smart-smoke-detector",
    date: "2025-03",
    market: "US",
    kind: "standard",
    note: "Rapporterar att Google upphörde med tillverkningen av andra generationens Nest Protect 28 mars 2025, och att befintliga enheter fortsätter fungera och få säkerhetsuppdateringar under sin tioåriga livslängd.",
  },
  {
    publisher: "9to5Google",
    title: "Google Store listar och marknadsför ersättaren till Nest Protect",
    url: "https://9to5google.com/2025/07/25/google-store-nest-protect-replacement/",
    date: "2025-07",
    market: "US",
    kind: "standard",
    note: "Att Google säljer en tredjepartsprodukt som ersättare i sin egen butik är den starkaste bekräftelsen på att de lämnat kategorin. Datumet visar också att beslutet stod fast fyra månader senare.",
  },
  {
    publisher: "Diginytt",
    title: "Smarta brandvarnare bäst i test",
    url: "https://diginytt.se/tester/smarta-brandvarnare-bast-i-test/",
    date: "2026",
    market: "SE",
    kind: "comparison",
    note: "En av två svenska sidor som gjort en egen jämförelse just för smarta brandvarnare. Redovisar ingen provning, och citeras för vad den utsett och inte som test.",
  },
  {
    publisher: "Smarta Hem-test",
    title: "Bästa brandvarnaren för smarta hem",
    url: "https://www.smartahemtest.se/test/basta-brandvarnaren-till-ditt-smarta-hem",
    date: "2026",
    market: "SE",
    kind: "comparison",
    note: "Den andra svenska sidan med en egen smart-jämförelse, och den enda som skriver ut vem som skrivit den och vilken bakgrund skribenten har. Redovisar ingen provning.",
  },
  {
    publisher: "Brandinfo",
    title: "Brandvarnare bäst i test, 8 modeller",
    url: "https://brandinfo.se/brandvarnare/basta-brandvarnaren-bast-i-test/",
    date: "2026",
    market: "SE",
    kind: "standard",
    note: "Blandar smarta och vanliga varnare i samma lista. Rankar fortfarande Google Nest Protect i en jämförelse daterad 2026, ett år efter att Google lade ner produkten, vilket är det tydligaste exemplet på varför vi kontrollerar lagerstatus och tillverkarbesked innan vi rankar något.",
  },
  {
    publisher: "Storstockholms brandförsvar",
    title: "Brandutrustning att ha hemma",
    url: "https://www.storstockholm.brand.se/i-hemmet/brandutrustning-att-ha-hemma/",
    market: "SE",
    kind: "standard",
    note: "Räddningstjänstens råd om antal och placering. Gäller oavsett om varnaren är uppkopplad eller inte, och är utgångspunkten för hur många skyddade platser en bostad behöver.",
  },
  /*
   * Två svenska jämförelser till, mätta 2026-08-03. Tillsammans med de två
   * ovan blir det fyra.
   *
   * Två fynd, båda kontrollerade:
   *
   * 1. **Noll av fyra nämner Matter.** I den kategori där uppkopplingen är
   *    hela produktidén nämner alltså ingen den standard som avgör vad
   *    varnaren kan prata med.
   * 2. **Google Nest Protect rekommenderas fortfarande.** Testexperterna
   *    nämner den åtta gånger och Franklin två. Google lade ner produkten i
   *    mars 2025, alltså sjutton månader innan sidorna hämtades. Samma
   *    observation står vid brandinfo.se i BRANDVARNARE_SOURCES, och att den
   *    upprepas hos flera är själva poängen: en nedlagd produkt vandrar
   *    vidare genom fältet därför att ingen kontrollerar om den finns kvar.
   *
   * ⚠️ `rokdetektorer.com` och `hemlarmsofferten.se` rankar båda på termen men
   * svarar **403** mot skript. De är inte medtagna. Vi skriver inget om en
   * sida vi inte kunnat läsa.
   */
  {
    publisher: "Testexperterna",
    title: "Brandvarnare bäst i test, 5 bästa brandvarnarna",
    url: "https://testexperterna.se/brandvarnare",
    market: "SE",
    kind: "comparison",
    note: "6 515 ord, och bäst i fältet på det tekniska: den tar upp både EN 14604, Zigbee och sammankoppling mellan varnare. Nämner ändå aldrig Matter, och rekommenderar Google Nest Protect, som lades ner i mars 2025.",
  },
  {
    publisher: "Franklin Brand & Hälsa",
    title: "Brandvarnare bäst i test",
    url: "https://franklinbrandochhalsa.se/brandvarnare-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "2 323 ord från ett företag som säljer brandskyddstjänster, alltså en bransch­aktör och inte en jämförelsesajt. Nämner varken EN 14604, Zigbee eller Matter, men rekommenderar Nest Protect två gånger.",
  },
];

/**
 * Brandsläckare.
 *
 * Kategorin har ingen oberoende produktprovning på svensk marknad, men den har
 * något de andra saknar: **en standard som faktiskt mäter prestanda.** EN 3 ger
 * varje släckare en effektklass, och den siffran är framtagen genom provning
 * hos ett certifieringsorgan. Vi behöver alltså inte tända eld på något för att
 * kunna jämföra släckeffekt, vilket är ovanligt i vår bransch.
 *
 * Källorna nedan är därför myndigheter, branschorganisationer och
 * försäkringsbolag för råden, plus butikernas egna produktsidor för siffrorna.
 */
export const BRANDSLACKARE_SOURCES: Source[] = [
  {
    publisher: "Myndigheten för civilt försvar",
    title: "Brandsläckare",
    url: "https://www.mcf.se/sv/amnesomraden/skydd-mot-olyckor-och-farliga-amnen/stod-till-kommunal-raddningstjanst/brandskydd-och-forebyggande/brandskyddsutrustning/brandslackare/",
    market: "SE",
    kind: "standard",
    note: "Myndighetens genomgång av släckmedelstyper och vad de lämpar sig för. Källa till indelningen pulver, skum, kolsyra och vatten, och till varför pulver rekommenderas för bostäder.",
  },
  {
    publisher: "Storstockholms brandförsvar",
    title: "Brandutrustning att ha hemma",
    url: "https://www.storstockholm.brand.se/i-hemmet/brandutrustning-att-ha-hemma/",
    market: "SE",
    kind: "standard",
    note: "Räddningstjänstens egen rekommendation: minst en 6-kilos pulversläckare enligt EN3 och en brandfilt, placerade lättillgängligt och gärna nära köket eftersom de flesta bränder i hemmet startar där.",
  },
  {
    publisher: "Trygg-Hansa",
    title: "Välj brandsläckare och använd den rätt",
    url: "https://www.trygghansa.se/tips-rad/hus-och-hem/brandsakerhet/brandslackare",
    market: "SE",
    kind: "standard",
    note: "Försäkringsbolagets genomgång av släckmedel och användning. Bidrar med att pulver har bäst släckkapacitet per kilo och att skum kräver mer precision och inte tål frost.",
  },
  {
    publisher: "Housegard",
    title: "Bra att veta om släckare",
    url: "https://housegard.se/sv/produktkunskap/bra-att-veta-om-slackare",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen produktkunskap. Citeras som standard och inte som test av uppenbart skäl: de säljer flera av släckarna vi rankar. Bidrar ändå med hur effektklasserna hänger ihop med släckmedelsmängd.",
  },
  {
    publisher: "Brandskyddskollen",
    title: "Vilken brandsläckare ska man ha hemma?",
    url: "https://brandskyddskollen.se/vilken-brandslackare-ska-man-ha-hemma/",
    market: "SE",
    kind: "comparison",
    note: "Svensk jämförelsesajt. Refererar Räddningsverket, Konsumentverket och SVEBRA:s samstämmiga rekommendation om 6 kilos pulversläckare, och citeras för den hänvisningen och inte som test.",
  },
  {
    publisher: "Kjell & Company",
    title: "Housegard brandsläckare 6 kg, produktsida",
    url: "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandslackare/housegard-brandslackare-med-pulver-6-kg-rod-p21233",
    market: "SE",
    kind: "standard",
    note: "Butikskälla, men den enda i hela vår kartläggning som förklarar effektklassen för läsaren: att 55A betyder släckyta upp till 5,5 meter från släckaren och 233B att den klarar 233 liter brinnande vätska. Den förklaringen ligger till grund för hur vi beskriver klasserna på sidan.",
  },
  {
    publisher: "Biltema",
    title: "Brandsläckare pulver ABC 6 kg, produktsida",
    url: "https://www.biltema.se/hem/sakerhet/brandslackare/brandslackare-pulver-abc-6-kg-2000046826",
    market: "SE",
    kind: "standard",
    note: "Enda produktsidan i kartläggningen som skriver ut typgodkännandet, EN 3-7/8, tillsammans med manometer, övertrycksventil och att släckaren får användas mot elektrisk utrustning upp till 1 000 V på en meters avstånd.",
  },
  /*
   * Fem svenska jämförelser till, mätta 2026-08-03.
   *
   * ⚠️ **Det här är den kategori där vi inte har något kunskapsövertag, och
   * det ska stå här så att ingen bygger sidan som om vi hade det.** Alla fem
   * skriver ut effektklassen: testkollen.se nämner 43A trettiosju gånger,
   * testix.se trettiofem. Fyra av fem nämner EN 3 eller ordet effektklass.
   *
   * Skälet är att koden står tryckt på varje etikett. Där andra kategorier
   * kräver att någon läser en standard, räcker det här att läsa burken, och
   * då gör konkurrenterna det också.
   *
   * Det som faktiskt saknas är ägandet över tid: **omladdning nämns av två av
   * fem**, och en pulversläckare behöver service med jämna mellanrum för att
   * fungera som avsett. Där finns utrymme, inte i effektklassen.
   */
  {
    publisher: "Testkollen",
    title: "Brandsläckare 6 kg bäst i test, toppval för hem och garage",
    url: "https://www.testkollen.se/brandslackare",
    market: "SE",
    kind: "comparison",
    note: "Störst i kategorin, 12 147 ord och 21 tabeller. Skriver ut effektklassen genomgående, både 43A och 233B, men nämner aldrig standarden EN 3 vid namn och aldrig omladdning.",
  },
  {
    publisher: "Testix",
    title: "Brandsläckare bäst i test, trygghet för hem och bil",
    url: "https://testix.se/test/brandslackare",
    market: "SE",
    kind: "comparison",
    note: "6 580 ord och sex tabeller. Skriver 43A om och om igen utan att en enda gång förklara vad bokstaven och talet står för.",
  },
  {
    publisher: "Testexperterna",
    title: "Brandsläckare bäst i test, 3 bästa brandsläckarna",
    url: "https://testexperterna.se/brandslackare",
    market: "SE",
    kind: "comparison",
    note: "Den mest kompletta svenska jämförelsen vi sett i någon kategori, sett till om den förklarar sitt eget mått: EN 3, effektklass, 43A, 233B och omladdning får alla en riktig förklaring. 5 004 ord. Här har vi ingen faktafördel, och det ska erkännas.",
  },
  {
    publisher: "Test.se",
    title: "Test av brandsläckare, se alla vinnare",
    url: "https://www.test.se/brandslackare/",
    market: "SE",
    kind: "comparison",
    note: "3 392 ord och 59 bilder utan en enda tabell. Nämner 233B sexton gånger, alltså vätskeklassen, mer än någon annan.",
  },
  {
    publisher: "Brandinfo",
    title: "Brandsläckare bäst i test, topp 4",
    url: "https://brandinfo.se/brandslackare/basta-brandslackaren-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "3 134 ord och fyra tabeller. En av två som nämner omladdning, och den som lägger mest vikt vid vätskeklassen 233B i förhållande till sin längd.",
  },
];

/**
 * Brandfilt.
 *
 * ## Det finns inget oberoende test av brandfiltar
 *
 * Inte hos Råd & Rön, inte hos Testfakta, inte hos någon nordisk testredaktion.
 * Kontrollerat 2026-08-02. De svenska sidor som säger sig ha testat redovisar
 * varken metod, mätvärden eller testdatum.
 *
 * Listan nedan innehåller därför noll poster med `kind: "test"`, till skillnad
 * från /smart-belysning där alla sex är tester. Det är inte en lucka att gömma
 * utan en uppgift läsaren har nytta av, och den står på sidan i avsnittet
 * Källor och i en egen FAQ-fråga.
 *
 * ## Standarden själv bär sidan
 *
 * Tidigare vilade beskrivningen av vad revisionen 2019 ändrade på en
 * katalogpost vars innehåll inte gick att läsa. Den ersattes 2026-08-02 av
 * BSI:s förhandsvisning, sju läsbara sidor ur standarden. Se
 * .agent/research/brandfilt-verifiering.md.
 *
 * Kontrollen avslöjade ett fel i vår egen text: 1997 provade inte "enbart
 * matolja", den innehöll också ett elprov. Det som tillkom 2019 är heptanprovet.
 */
export const BRANDFILT_SOURCES: Source[] = [
  {
    publisher: "BSI och CEN",
    title: "BS EN 1869:2019, Fire blankets, förhandsvisade sidor",
    url: "https://webstore.ansi.org/preview-pages/BSI/preview_30372446.pdf",
    date: "2019-08-31",
    kind: "standard",
    note: 'Sidans viktigaste källa, och den enda plats där standardens egen text går att läsa utan att köpa den. Sju sidor ur BS EN 1869:2019, publicerade av ANSI. Här står att dokumentet ersätter EN 1869:1997, som är tillbakadraget, och innehållsförteckningen visar tre normativa bilagor: elprov, matoljeprov och heptanprov. Ur avsnitt 1: standarden gäller filtar "which are not reusable", den begränsar risken för elstöt vid oavsiktlig användning på spänningsförande utrustning, och tillräckligt stora filtar anses lämpliga för att kväva elden på en person vars kläder brinner. Den sista meningen är källan till att storlek är vårt näst tyngsta kriterium.',
  },
  {
    publisher: "Intertek Inform",
    title: "EN 1869:1997, Fire blankets, katalogpost",
    url: "https://www.intertekinform.com/en-us/Standards/EN-1869-1997-346449_SAIG_CEN_CEN_792211/",
    date: "1997",
    kind: "standard",
    note: "Den tillbakadragna versionen. Tas med eftersom en av filtarna vi rankar fortfarande säljs med den certifieringen. Dess tillämpningsområde var begränsat till brand i matolja, men den innehöll redan ett prov av elektrisk ledningsförmåga. Det är skälet till att vi beskriver skillnaden mot 2019 som ett tillkommet heptanprov och ett skärpt elprov, inte som att 1997 saknade allt utom matolja.",
  },
  {
    publisher: "Storstockholms brandförsvar",
    title: "Brandutrustning att ha hemma",
    url: "https://www.storstockholm.brand.se/i-hemmet/brandutrustning-att-ha-hemma/",
    market: "SE",
    kind: "standard",
    note: "Räddningstjänstens rekommendation om att varje hem ska ha en brandfilt utöver brandvarnare och pulversläckare, och att den bör placeras lättillgängligt nära köket.",
  },
  {
    publisher: "Räddningstjänsten Syd",
    title: "Rekommenderat brandskydd",
    url: "https://www.rsyd.se/hem-fritid/brand/rekommenderat-brandskydd/",
    market: "SE",
    kind: "standard",
    note: "Källan till storleksrekommendationen 120 × 180 cm, som är den enskilt viktigaste uppgiften på den här sidan och som fyra av åtta filtar i jämförelsen inte uppfyller.",
  },
  {
    publisher: "Housegard",
    title: "Bra att veta om brandfiltar",
    url: "https://housegard.se/sv/produktkunskap/bra-att-veta-om-brandfiltar",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen produktkunskap om användning och placering. Citeras som standard och inte som test, eftersom de säljer en av filtarna vi rankar, och den vi rankar sist.",
  },
  {
    publisher: "Myndigheten för civilt försvar",
    title: "Brandvarnare, pulversläckare och brandfilt i bostäder",
        /* Flyttad under /brandskyddsutrustning/ hos myndigheten. Den gamla
       adressen svarade 404, kontrollerat 2026-08-03. */
    url: "https://www.mcf.se/sv/amnesomraden/skydd-mot-olyckor-och-farliga-amnen/stod-till-kommunal-raddningstjanst/brandskydd-och-forebyggande/brandskyddsutrustning/brandvarnare-pulverslackare-och-brandfilt-i-bostader---for-dig-som-ger-rad/",
    market: "SE",
    kind: "standard",
    note: "Myndighetens underlag till dem som ger brandskyddsråd, alltså grunden för de gemensamma rekommendationerna om vad ett hem ska ha.",
  },
  {
    publisher: "Biltema",
    title: "Brandfilt 120 × 120 cm, produktsida",
    url: "https://www.biltema.se/hem/sakerhet/brandfiltar/brandfilt-120-x-120-cm-2000066301",
    market: "SE",
    kind: "standard",
    note: "Butikskälla som är värd att peka på: de anger både certifikat EN 1869:2019, temperaturbeständighet 500 °C och att materialet är asbestfritt i en tydlig specifikationsruta, på en produkt för under hundra kronor. Samma butik anger ingenting om standarden för sin större filt.",
  },
  /*
   * De sex svenska jämförelserna, mätta 2026-08-03.
   *
   * ⚠️ Mätningen kullkastade ett påstående som stod i den här filens
   * kommentarer: att versionsnumret av EN 1869 "står i butikstexten men i ingen
   * jämförelse". **Det var fel.** Fem av sex skriver ut en version, och
   * brandinfo.se gör det tolv gånger.
   *
   * Det verkliga fyndet är ett annat och skarpare: **ingen av dem nämner att
   * det finns två versioner.** Var och en citerar en enda som om den vore den
   * enda som finns.
   *
   *   EN 1869:2019 ensamt   brandinfo.se (12 ggr), bäst-i-test.org (10), testvinnarna.se (1)
   *   EN 1869:1997 ensamt   testexperterna.se, brandskyddskollen.se
   *   nämner ingen version  testix.se
   *
   * Två av dem rekommenderar alltså filtar mot en tillbakadragen standard utan
   * att skriva att den är tillbakadragen. Det är precis den skillnad sidans
   * tyngsta kriterium bygger på, och den är osynlig i hela fältet.
   */
  {
    publisher: "Testexperterna",
    title: "Brandfilt bäst i test, 5 bästa brandfiltarna",
    url: "https://testexperterna.se/brandfilt",
    market: "SE",
    kind: "comparison",
    note: "Störst i kategorin med 6 516 ord. Nämner EN 1869 genomgående, men bara versionen från 1997, alltså den tillbakadragna, utan att skriva att den är det.",
  },
  {
    publisher: "Testix",
    title: "Brandfilt bäst i test, trygg brandsäkerhet för hemmet",
    url: "https://testix.se/test/brandfilt",
    market: "SE",
    kind: "comparison",
    note: "6 185 ord och sex tabeller, alltså den mest arbetade sidan redaktionellt. Ändå inte ett enda omnämnande av EN 1869, och därmed den enda av de sex som inte nämner standarden alls.",
  },
  {
    publisher: "Testvinnarna",
    title: "Bäst brandfilt, Solstickan brandfilt är bäst",
    url: "https://testvinnarna.se/brandfilt/",
    market: "SE",
    kind: "comparison",
    note: "3 165 ord. Nämner EN 1869:2019 en gång, i förbigående.",
  },
  {
    publisher: "Bäst i test",
    title: "Bästa brandfiltar",
    /* .org, inte .se. Se varningen vid vattenlarmskällorna. */
    url: "https://xn--bst-i-test-q5a.org/basta-brandfiltar/",
    market: "SE",
    kind: "comparison",
    note: "2 522 ord och tre tabeller. Skriver ut EN 1869:2019 genomgående, alltså rätt version, men utan att nämna att det finns en äldre som fortfarande står på svenska produktsidor.",
  },
  {
    publisher: "Brandinfo",
    title: "Bästa brandfilten, brandfilt bäst i test",
    url: "https://brandinfo.se/brandfilt/basta-brandfilten-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "Den som ligger närmast vår egen hållning. Skriver ut EN 1869:2019 på sina 2 304 ord och gör certifieringen till sitt bärande argument. Ändå inte ett ord om 1997-versionen, som två av de andra jämförelserna rekommenderar filtar mot.",
  },
  {
    publisher: "Brandskyddskollen",
    title: "Bästa brandfilten hemma, brandfilt bäst i test",
    url: "https://brandskyddskollen.se/basta-brandfilten/",
    market: "SE",
    kind: "comparison",
    note: "Kortast av de sex, 1 417 ord, och nämner EN 1869:1997 en gång som om den vore den gällande.",
  },
];

/**
 * Kolmonoxidvarnare.
 *
 * ## Underlaget skiljer sig från brandfilt på en viktig punkt
 *
 * Här finns riktig oberoende provning. Consumer Reports mäter CO-varnare i
 * labb och publicerar tider vid givna ppm-nivåer. Men de provar mot UL 2034 och
 * inte mot EN 50291, och deras X-Sense-test gäller märkets Portable-modell och
 * inte XC01-M som vi rankar. Källan är därför `standard` och inte `test`: den
 * beskriver hur kategorin kan fallera, den bedömer inte våra produkter.
 *
 * Det svenska läget är samma som för brandfilt. Råd & Rön och Testfakta har
 * inget test av kategorin, och sidorna som säger sig ha testat redovisar
 * varken metod, mätvärden eller datum.
 *
 * ## Vad som inte gick att läsa i original
 *
 * Till skillnad från BS EN 1869:2019 hittade vi ingen läsbar förhandsvisning av
 * EN 50291-1 eller -2. Katalogposterna hos iTeh är JS-renderade och ANSI:s
 * söksida blockerar hämtning. Beskrivningen av vad delarna omfattar och vad
 * revisionerna ändrade vilar därför på tillverkarled, tre samstämmiga källor.
 * Det står också på sidan, eftersom en läsare ska veta hur nära källan vi kom.
 */
export const KOLMONOXIDVARNARE_SOURCES: Source[] = [
  {
    publisher: "Ei Electronics",
    title: "EN 50291-1:2018 och EN 50291-2:2019, produktstandarder för CO-varnare",
    url: "https://www.eielectronics.ie/en-50291%E2%80%9112018-en-50291%E2%80%9122019/",
    kind: "standard",
    note: "Tillverkarens genomgång av vad de två delarna omfattar. Del 1 gäller bostäder, del 2 gäller husvagn, husbil, campervan och båt med förbränningsapparater. Del 2 lägger till provning för rörliga och tuffa miljöer: rörelse, vibration och temperaturväxling. Källan till hela sidans uppdelning mellan del 1 och del 2.",
  },
  {
    publisher: "FireAngel",
    title: "What professionals need to know about EN 50291-1:2018",
    url: "https://www.fireangel.co.uk/trade/knowledge-hub/what-do-professionals-need-to-know-about-new-changes-to-the-en-50291%E2%80%9112018-standard/",
    date: "2018",
    kind: "standard",
    note: "Vad revisionen 2018 lade till jämfört med 2010+A1:2012: obligatorisk livslängdsindikering med ljud och synlig signal, tydligare krav på bedömd batterikapacitet, övervakning av reservkraft i nätanslutna varnare, fler störgaser i provningen och provning av valfri tystningsfunktion. Livslängdsindikeringen är den som betyder mest för en köpare, eftersom en förbrukad CO-sensor annars inte syns.",
  },
  {
    publisher: "Designing Buildings",
    title: "BS EN 50291",
    url: "https://www.designingbuildings.co.uk/wiki/BS_EN_50291",
    kind: "standard",
    note: "Oberoende uppslagsverk för byggbranschen. Bekräftar uppdelningen mellan del 1 och del 2 och att EN 50291-1:2010 drogs tillbaka av BSI den 26 september 2021, varefter 2018 gäller för produkter tillverkade därefter. Används som tredje samstämmig källa, eftersom de två andra är tillverkarled.",
  },
  {
    publisher: "Consumer Reports",
    title: "Best portable carbon monoxide detectors, labbtestade",
    url: "https://www.consumerreports.org/home-garden/smoke-carbon-monoxide-detectors/best-portable-carbon-monoxide-detectors-a4805719130/",
    market: "US",
    kind: "standard",
    note: 'Den enda oberoende part vi hittat som faktiskt mäter CO-varnare. De finner att flera varnare underrapporterar halten och larmar för sent, och anger att en X-Sense Portable tog nitton minuter vid 400 ppm, en nivå som är livsfarlig inom timmar. Citeras som standard och inte som test av två skäl: de provar mot amerikanska UL 2034 med helt andra tröskeltider, och modellen de provat är inte XC01-M som vi rankar. Ett omdöme om ett märke är inte ett omdöme om en produkt.',
  },
  {
    publisher: "OSHA",
    title: "Effects of carbon monoxide at different concentrations",
    url: "https://www.osha.gov/sites/default/files/2018-12/fy15_sh-27664-sh5_Confined_Space_Handout_Effects_of_CO.pdf",
    market: "US",
    kind: "standard",
    note: "Amerikanska arbetsmiljömyndighetens sammanställning av vad olika halter gör med en människa och hur lång tid det tar. Ligger bakom räknaren CO-halt och larmgräns. Talen gäller friska vuxna, vilket står utskrivet där, eftersom barn, gravida, äldre och hjärt- eller lungsjuka påverkas vid lägre halter och tidigare. Samstämmig med publicerade tabeller från tillverkare och amerikanska räddningstjänster.",
  },
  {
    publisher: "MSB RIB",
    title: "Kolmonoxid, komprimerad, ämnessida i Farliga ämnen",
    url: "https://rib.msb.se/fa/Substance/Index?id=395",
    market: "SE",
    kind: "standard",
    /*
     * ⚠️ Ersatte 2026-08-03 en död länk till `msb.se/.../brandskydd/`, som
     * gav 404 och skickade vidare till mcf.se. MSB:s uppgifter flyttade när
     * myndigheten delades vid årsskiftet 2026, så fler msb.se-adresser i
     * underlaget kan ha gått samma väg.
     *
     * Den nya adressen är inte bara en lagning utan en uppgradering: den
     * gamla var en allmän brandskyddssida utan ett ord om kolmonoxid.
     */
    note: 'Myndighetens egen ämnesdatabas, och den svenska motsvarigheten till OSHA-tabellen ovan. Två saker står här som sidan vilar på. Ämnet beskrivs som "Giftig och brandfarlig gas" och lukten anges rakt av som "Luktfri", vilket är hela skälet till att en varnare behövs och inte bara ett öppet fönster. Och gränsvärdena finns i svensk myndighetsform: AEGL-3, alltså risk för dödsfall, går från 1 700 ppm vid 10 minuter till 130 ppm vid 8 timmar, medan AEGL-2, allvarliga och bestående effekter, går från 420 ppm vid 10 minuter till 27 ppm vid 8 timmar. IDLH anges till 1 200 ppm, gränsen där filtermask inte längre duger. Sidan skriver också ut att MSB och Socialstyrelsen är överens om att AEGL-värdena håller högst kvalitet av de gränsvärdesserier som finns.',
  },
  {
    publisher: "Kjell & Company",
    title: "Housegard Kolmonoxidlarm, produktsida",
    url: "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/gaslarm/housegard-kolmonoxidlarm-p32831",
    market: "SE",
    kind: "standard",
    note: "Butikskälla värd att peka på: den enda produktsidan i kartläggningen som anger båda delarna av standarden i gällande utgåva, EN 50291-1:2018 samt EN 50291-2:2019. Att det är möjligt att skriva ut är skälet till att vi betygsätter de butiker som låter bli.",
  },
  {
    publisher: "Clas Ohlson",
    title: "Netatmo smart kolmonoxidvarnare, produktsida",
    url: "https://www.clasohlson.com/se/Netatmo-smart-kolmonoxidvarnare/p/36-8763",
    market: "SE",
    kind: "standard",
    note: 'Enda produkten i jämförelsen som säljs uttryckligen för fritidsfordon och anger EN50291-2:2019 med orden "specifik för fritidsfordon". Källan till att del 2 inte är en teoretisk skillnad utan något butikerna faktiskt skriver ut när produkten har det.',
  },
  /*
   * De fem svenska jämförelserna, mätta 2026-08-03.
   *
   * Kategorin är svår att söka på: svenska sidor skriver "gasvarnare" och
   * blandar kolmonoxid med gasol, butan och propan, vilket är tre helt olika
   * sensorer. Fyra av de fem sidorna nedan heter gasvarnare i rubriken.
   *
   * **Fyndet, och det är hårt: noll av fem nämner EN 50291-2.** Samtidigt
   * skriver alla fem om husvagn, husbil eller båt, tillsammans 94 gånger.
   * Del 2 är den del av standarden som gäller just fritidsfordon och som
   * provar mot skakning, temperatursvängningar och fukt. Hela det svenska
   * fältet rekommenderar alltså varnare till husvagnen utan att nämna den
   * standard som handlar om husvagnar.
   *
   *   nämner 50291-2   0 av 5
   *   nämner 50291-1   1 av 5
   *   nämner 50291     2 av 5
   *   nämner husvagn   5 av 5
   */
  {
    publisher: "Testkollen",
    title: "Gasvarnare bäst i test, test av gaslarm och kolmonoxidvarnare",
    url: "https://www.testkollen.se/gaslarm-gasvarnare",
    market: "SE",
    kind: "comparison",
    note: "Störst i kategorin, 12 937 ord och femton tabeller. Nämner EN 50291 men aldrig vilken del, och skriver mycket om husvagnar. Det är den sida som kommer närmast att göra skillnaden och ändå inte gör den.",
  },
  {
    publisher: "Testexperterna",
    title: "Gasvarnare bäst i test, 5 bästa gasvarnarna",
    url: "https://testexperterna.se/gasvarnare",
    market: "SE",
    kind: "comparison",
    note: "6 618 ord, och den mest påkostade av de fem. Skriver om husvagnar men nämner EN 50291 inte alls. Anger ppm-värden utan att koppla dem till någon gränsvärdesserie.",
  },
  {
    publisher: "Testix",
    title: "Gasvarnare bäst i test, trygghet och säkerhet i hemmet",
    url: "https://testix.se/test/gasvarnare",
    market: "SE",
    kind: "comparison",
    note: "5 918 ord och sex tabeller. Handlar mer om husvagnar än någon av de andra fem, men nämner varken standarden eller ett enda ppm-tal.",
  },
  {
    publisher: "Brandinfo",
    title: "Bästa gasvarnaren, bäst i test gaslarm",
    url: "https://brandinfo.se/brandsakerhet/basta-gasvarnaren-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "3 063 ord och fyra tabeller. Handlar till stor del om husvagnar utan att nämna EN 50291 alls, vilket är anmärkningsvärt eftersom samma sajt är den enda som gör standarden rätt på brandstegar.",
  },
  {
    publisher: "Tryggt och säkert hem",
    title: "Vi testar: bästa kolmonoxidvarnare",
    url: "https://www.xn--tryggtochskerthem-zqb.se/brandskydd/brandvarnare/kolmonoxidvarnare-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "Enda av de fem som har kolmonoxidvarnare och inte gasvarnare i rubriken, och enda som skriver ut EN 50291-1. Den kommer alltså längst av alla, och stannar ändå före del 2 trots att sidan nämner husvagn.",
  },
];

/**
 * Brandstege. Kategorin saknar både oberoende test och tillämplig
 * produktstandard, så varje post här är antingen en myndighetskälla eller en
 * standardkatalog vi använt för att kontrollera vad butikerna påstår.
 */
export const BRANDSTEGE_SOURCES: Source[] = [
  {
    publisher: "Svenska institutet för standarder",
    title: "SS-EN 131-6:2015, Ladders – Part 6: Telescopic ladders",
    url: "https://www.sis.se/en/produkter/domestic-and-commercial-equipment-entertainment-sports/ladders/ssen13162015/",
    date: "2015",
    market: "SE",
    kind: "standard",
    note: 'Sidans viktigaste källa, och en primärkälla. SIS anger status "Withdrawn" och "Replaced by: SS-EN 131-6:2019", samt omfattningen "leaning and standing telescopic ladders". Bauhaus anger EN 131-6:2015 för Nexa FLB-104, alltså en tillbakadragen utgåva av en standard som gäller lutande och stående teleskopstegar, på en stege som hänger fritt i nylonband. Housegard anger samma standard utan årtal.',
  },
  {
    publisher: "Boverket",
    title: "Antal utrymningsvägar och utrymning via fönster",
    url: "https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/utrymning/antal-utrymningsvagar/",
    market: "SE",
    kind: "standard",
    note: 'Primärkälla för femmetersgränsen. Fönstrets underkant får sitta högst 5,0 meter över marken, eller 8,0 meter om det finns en fast monterad stege. Boverket skriver också rakt ut vad alternativet är: "Om avståndet till marken nedanför fönstret är högst fem meter accepteras att personer utrymmer genom att hoppa. Att hoppa från den höjden innebär att personer riskerar att bli skadade." Samma sida anger att en bärbar utskjutsstege från räddningstjänsten normalt når 11 meter.',
  },
  {
    publisher: "Brandskyddsföreningen",
    title: "Utrymning från villa",
    url: "https://www.brandskyddsforeningen.se/villa/utrymning/",
    market: "SE",
    kind: "standard",
    note: "Bekräftar Boverkets tolkning i klartext: grundkravet är två utrymningsvägar, utrymning från villa ska kunna ske utan hjälp av räddningstjänsten, och krav på fast stege gäller generellt om avståndet till mark från fönstret överstiger fem meter, oberoende av räddningstjänstens insatstid. Används som andra samstämmig källa så att femmetersgränsen inte vilar på en enda läsning.",
  },
  {
    publisher: "Housegard",
    title: "Brandstege 4,5 meter EL45A, tillverkarens produktsida",
    url: "https://housegard.se/sv/produkter/brandstegar/p/housegard-brandstege-4-5-meter-el45a",
    market: "SE",
    kind: "standard",
    note: "Enda källan i hela kartläggningen som anger karmtjocklek i båda riktningarna, 15 till 34 centimeter. Anger också att produkten är testad enligt EN 131-6 och att maxbelastningen är 200 kilo men att stegen testats upp till 450. Ingen av de butiker som säljer stegen, Kjell och Clas Ohlson, för uppgifterna vidare. Tillverkaren rekommenderar dessutom kontroll två gånger om året, förvaring under 50 grader och utan direkt solljus, samt byte efter sex till åtta år.",
  },
  {
    publisher: "Jula",
    title: "Hard Head Brandstege 4,3 m, produktsida",
    url: "https://www.jula.se/catalog/hem-och-hushall/brand-och-sakerhet/brand/brandstegar/brandstege-025385/",
    market: "SE",
    kind: "standard",
    note: 'Butikskälla vi pekar på för en enda mening: "Endast avsedd för engångsbruk." Den står i löpande text i ett säljstycke och inte i specifikationen, och den betyder att stegen inte går att öva med. Samma sida anger som enda källa väggavståndet i utfällt läge som ett mått, 43 centimeter, och den lägsta maxlasten i kategorin, 150 kilo.',
  },
  {
    publisher: "Kjell & Company",
    title: "Housegard Brandstege 3,9 m EL39, fast monterad",
    url: "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandstegar/housegard-brandstege-39-m-p21279",
    market: "SE",
    kind: "standard",
    note: "Referenspunkten som gör kilotalsfyndet skarpt. Den fasadmonterade stegen anges vara testad enligt EN 131-1:2015 och EN 131-2:2010, alltså de allmänna stegstandarderna, och uppger maxlast 150 kilo. Produkten som faktiskt provats mot en tillämplig standard anger den lägsta lasten av alla, medan hängande stegar utan angiven provning uppger upp till 450.",
  },
  {
    publisher: "Bauhaus",
    title: "Brandstege Skeppshultstegen plast 7,5 m, art 1503513",
    url: "https://www.bauhaus.se/brandstege-skepphultstegen-plast-7-5m",
    market: "SE",
    kind: "standard",
    note: 'Kategorins tydligaste lucka, läst 2026-08-03. Under Teknisk information står material, längd, bredd, antal steg, avstånd från fasad och max väggtjocklek. Ingen maxlast. I samma produkttext står ändå: "Överskrid aldrig den maximala belastningsvikten som anges av tillverkaren." Butiken hänvisar till ett tal den inte publicerar. Talet finns på en etikett på stegen, synlig på butikens egen produktbild.',
  },
  {
    publisher: "Stegfabriken",
    title: "Skeppshultstegen Repstege, tillverkarens text och hela längdserien",
    url: "https://www.stegfabriken.se/stegar/brand-utrymning/utrymningsstegar/skeppshultstegen-repstege",
    market: "SE",
    kind: "standard",
    note: 'Samma stegar som Bauhaus säljer, men med tillverkarens egen text: "Stegen är konstruerad för att användas en gång enbart och ska rullas ut enbart när behov finns." Den meningen finns inte hos Bauhaus. Sidan visar också att serien går upp till 10 meter, vilket är skälet till att vi inte kallar någon stege den längsta i svensk handel, och att priserna ligger 42 till 43 procent över Bauhaus på identiska artiklar.',
  },
  /*
   * De fyra svenska jämförelserna, mätta 2026-08-03.
   *
   * Samma fyra sidor står också vid UTRYMNINGSSTEGE_SOURCES, och det är
   * avsiktligt. Ingen svensk sida skiljer på hängande fönsterstege och fast
   * fasadstege: de rankar båda i samma lista. `dedupeByUrl` räknar dem en gång
   * på sin category.
   *
   * Fältet är starkt på volym och svagt på det som avgör. testkollen.se skriver
   * 12 081 ord med sexton tabeller. Ändå nämner **ingen av de fyra** ordet
   * fasadstege, ryggbygel eller SINTEF.
   */
  {
    publisher: "Testkollen",
    title: "Brandstege bäst i test, säkerhet och pris jämförda",
    url: "https://www.testkollen.se/brandstege",
    market: "SE",
    kind: "comparison",
    note: 'Störst i hela vårt underlag, 12 081 ord och sexton tabeller. Tar upp både EN 131 och Boverket, alltså rätt saker. Ändå går det fel i sak: sidan rankar Skeppshultstegens 7,5-metersprodukt och anger i specifikationen "Montering: Fast på vägg/fasad, inkl. skruv och fästen". Den produkten är en repstege som hängs över fönsterkarmen, utan skruvar och fästen. Specifikationen för den fasta stegen har hamnat på den hängande. Sidan beskriver också ett eget test som svårligen kan ha ägt rum: "Efter testet låg FLB-104 i förrådet i tre månader, där det är fuktigt och varierande temperatur."',
  },
  {
    publisher: "Testexperterna",
    title: "Brandstege bäst i test, toppval",
    url: "https://testexperterna.se/brandstege",
    market: "SE",
    kind: "comparison",
    note: "8 500 ord, men inte ett omnämnande av vare sig EN 131 eller Boverket, alltså varken produktstandarden eller byggreglerna. Listan blandar dessutom produkter som inte hör ihop: en Housegard för 791 kronor bredvid en Zarges proffsstege för 6 850. Varje produkt får dessutom ett betyg som ser ut som ett snitt men vilar på ett enda omdöme.",
  },
  {
    publisher: "Testix",
    title: "Brandstege bäst i test, trygg och säker utrymning hemma",
    url: "https://testix.se/test/brandstege",
    market: "SE",
    kind: "comparison",
    note: "5 999 ord och sex tabeller, men i praktiken en sida om ett enda märke. Nämner varken EN 131, Boverket eller karmtjocklek.",
  },
  {
    publisher: "Brandinfo",
    title: "Brandstege bäst i test, bäst brandstegen",
    url: "https://brandinfo.se/brandsakerhet/brandstege-for-utrymning-vid-brand/",
    market: "SE",
    kind: "comparison",
    note: 'Kortast av de fyra, 2 506 ord, och ändå den enda som tar upp allt som avgör: EN 131, Boverket, karmtjocklek och när stegen behöver bytas. Deras återgivning av femmetersregeln stämmer mot Boverkets egen text, kontrollerat ord för ord. Det finns inget att invända mot den sidan i sak. Anmärkningen är en annan: de skriver "Inga av våra tester är sponsrade" och "Vi testat produkter", alltså ett testpåstående utan redovisad metod.',
  },
];

/**
 * Utrymningsstege, de fasta fasadstegarna.
 *
 * Kategorins primärkälla är inte ett test utan ett certifikat. SINTEF
 * Teknisk Godkjenning TG 2536 är fyra sidor som anger provlast, provmetod,
 * monteringsvillkor, användningsområde i meter och utgångsdatum för en
 * produkt som säljs i svensk handel. Ingen annan stege i kategorin har någon
 * motsvarighet, och ingen svensk jämförelse nämner att ordningen finns.
 */
export const UTRYMNINGSSTEGE_SOURCES: Source[] = [
  {
    publisher: "SINTEF Certification",
    title: "SINTEF Teknisk Godkjenning TG 2536, Modum Original redningsstige",
    url: "https://www.sintefcertification.no/product/index/1785",
    date: "2024-10-29",
    market: "NO",
    kind: "standard",
    note: 'Sidans viktigaste källa och en primärkälla. Certifikatet är läst i sin helhet: bärförmågan "tilfredsstiller lastkravene som er angitt i EN 131 Stiger – Bærbare stiger", provlast 2,6 kN mitt på steget och vid yttre vange, brandklass A1 enligt EN 13501-1, och användningsområdet "rømning fra vinduer med avstand maksimalt 5 m over planert terreng for stiger uten ryggbøyle. Med ryggbøyle ... maksimalt 7,5 meter". Utfärdat 2017-06-28, reviderat 2023-03-10, korrigerat 2024-10-29, giltigt till 2028-04-01. Samma register visar att produktgruppen Redningsstiger innehåller fyra godkända stegar och att bara en av dem säljs i Sverige.',
  },
  {
    publisher: "Boverket",
    title: "Antal utrymningsvägar och utrymning via fönster",
    url: "https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/utrymning/antal-utrymningsvagar/",
    market: "SE",
    kind: "standard",
    note: 'Primärkälla för den enda regelskillnaden mellan en hängande och en fast stege: "Fönstrets underkant är högst 5,0 meter ovan utanförliggande marknivå eller högst 8,0 meter ovanför utanförliggande marknivå om det finns en fast monterad stege." Samma sida anger fönsteröppningens minsta mått, 0,50 meter brett, 0,60 meter högt och summan minst 1,50 meter. Gränsen på 8,0 meter ligger över det Modums eget godkännande tillåter, vilket är sidans andra fynd.',
  },
  {
    publisher: "Svenska institutet för standarder",
    title: "SS-EN 131-1:2015 och SS-EN 131-2:2010, Ladders",
    url: "https://www.sis.se/en/produkter/domestic-and-commercial-equipment-entertainment-sports/ladders/ssen13112015/",
    date: "2015",
    market: "SE",
    kind: "standard",
    note: 'SIS anger båda utgåvorna som "Withdrawn". Del 1 från 2015 är ersatt av +A1:2019, som i sin tur är ersatt av +A2:2025 som är den gällande. Del 2 från 2010 är ersatt av +A1:2012, och kedjan går vidare via +A2:2017 till +A3:2025. Kjell anger EN 131-1:2015 och EN 131-2:2010 för Housegard EL39, alltså utgåvor som ligger två respektive tre ändringar efter. SIS återger också standardens omfattning, "portable ladders", vilket förklarar varför en ren EN 131-hänvisning inte beskriver infästningen i fasaden.',
  },
  {
    publisher: "Modum",
    title: "Modum utrymningsstege, tillverkarens svenska produktsida",
    url: "https://modum.se/utrymningsstegen",
    market: "SE",
    kind: "standard",
    note: "Anger stabiliteten mätt på en 2,4 meters stege, vertikalt 9,5 kN motsvarande 969 kilo och horisontellt 2 kN motsvarande 204 kilo, samt SP typkontroll nr 102101. Talen mäter något annat än certifikatets 2,6 kN per steg och ska inte slås ihop med det. Här står också stegavståndet 300 millimeter och fotstegets bredd 311 millimeter, som ingen butik för vidare.",
  },
  {
    publisher: "Kjell & Company",
    title: "Housegard Brandstege 3,9 m, art 21279",
    url: "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandstegar/housegard-brandstege-39-m-p21279",
    market: "SE",
    kind: "standard",
    note: "Enda butiken i kategorin som anger en standard, och den anger två indragna utgåvor. Sidan är också den enda som anger en maxlast för en fast stege, 150 kilo, och totallängden 3,86 meter mot produktnamnets 3,9. Housegards egen produktsida nämner ingen standard alls, vilket betyder att uppgiften finns hos återförsäljaren men inte hos tillverkaren.",
  },
  {
    publisher: "Bauhaus",
    title: "Utrymningsstege Skeppshultstegen aluminium, tre längder",
    url: "https://www.bauhaus.se/bygg/stegar-byggstallningar/stegar/utrymningsstegar",
    market: "SE",
    kind: "standard",
    note: "Källa för att en svensktillverkad stege kan säljas helt utan lastuppgift. Bauhaus tekniska information för alla tre längderna består av fyra rader: material, längd, bredd utfälld och djup ihopfällt. Ingen maxlast, ingen standard, ingen monteringsanvisning i texten. Samma sida är källan till att kategorin Utrymningsstegar hos Bauhaus även innehåller två hängande repstegar, vilket är varför de två produkttyperna blandas ihop i svensk handel.",
  },
  /*
   * De fyra svenska jämförelserna, mätta 2026-08-03. Samma fyra som vid
   * BRANDSTEGE_SOURCES, och det är själva poängen.
   *
   * **Ingen svensk sida är skriven om fasta fasadstegar.** De som rankar dem
   * gör det mitt i en lista över hängande fönsterstegar, utan att markera att
   * det är två olika produkter med olika montering, olika pris och olika krav.
   *
   * Kontrollerat term för term på alla fyra, 2026-08-03:
   *
   *   fasadstege   0 av 4
   *   ryggbygel    0 av 4
   *   SINTEF       0 av 4
   *
   * Att SINTEF saknas är det tyngsta. Det är det enda verkliga godkännandet i
   * kategorin, en enda av produkterna har det, och hela det svenska fältet
   * rankar de här stegarna utan att nämna att godkännandet finns.
   */
  {
    publisher: "Testkollen",
    title: "Brandstege bäst i test, säkerhet och pris jämförda",
    url: "https://www.testkollen.se/brandstege",
    market: "SE",
    kind: "comparison",
    note: 'Den mest utbyggda svenska sidan i kategorin, 12 081 ord och sexton tabeller. Den rankar en fast fasadstege på fjärde plats och beskriver den som "Montering: Fast på vägg/fasad, inkl. skruv och fästen. Stegbredd 40 cm". Produkten den pekar på, Skeppshultstegen 7,5 meter, är en repstege som hängs över fönsterkarmen och är 306 mm bred. Specifikationen kommer alltså från den fasta stegen och sitter på den hängande. Priset de anger, 1 988 kronor, stämmer inte heller mot Bauhaus 2 249.',
  },
  {
    publisher: "Testexperterna",
    title: "Brandstege bäst i test, toppval",
    url: "https://testexperterna.se/brandstege",
    market: "SE",
    kind: "comparison",
    note: "8 500 ord, och skriver aldrig fasadstege. Nämner Boverket men inte EN 131. Deras ranking blandar hängande stegar med proffsstegar i ett tiofaldigt prisspann.",
  },
  {
    publisher: "Testix",
    title: "Brandstege bäst i test, trygg och säker utrymning hemma",
    url: "https://testix.se/test/brandstege",
    market: "SE",
    kind: "comparison",
    note: "5 999 ord om i stort sett ett enda märke, utan att en enda gång skriva fasadstege eller fast monterad, trots att tillverkaren gör båda sorterna.",
  },
  {
    publisher: "Brandinfo",
    title: "Brandstege bäst i test, bäst brandstegen",
    url: "https://brandinfo.se/brandsakerhet/brandstege-for-utrymning-vid-brand/",
    market: "SE",
    kind: "comparison",
    note: "Bäst av de fyra på hängande stegar: EN 131, Boverket, karmtjocklek och utbytesintervall, allt korrekt. Nämner Skeppshult men aldrig deras fasta stegar, och därmed inte heller SINTEF-godkännandet.",
  },
];

/**
 * Övervakningskamera, utomhus vid villa.
 *
 * Kategorins primärkälla är inte ett test utan en myndighetstext plus fem
 * tillverkares egen dokumentation av en enda funktion. IMY pekar ut digital
 * maskering som åtgärden när kameran råkar få med grannens tomt, och varje
 * tillverkare publicerar en brasklapp som urholkar den. Alla fem lästa i
 * original 2026-08-03.
 */
export const OVERVAKNINGSKAMERA_SOURCES: Source[] = [
  {
    publisher: "Integritetsskyddsmyndigheten",
    title: "Kamerabevaka inom privatundantaget",
    url: "https://www.imy.se/privatperson/kamerabevakning/regler-for-dig-som-kamerabevakar/kamerabevaka-inom-privatundantaget/",
    date: "2026-06-05",
    market: "SE",
    kind: "standard",
    note: 'Sidans viktigaste källa och en primärkälla. Fem villkor måste alla vara uppfyllda för att varken GDPR eller kamerabevakningslagen ska gälla, och IMY skriver att undantaget "ska tolkas snävt". Två av villkoren är produktfrågor: bevakningen får inte filma grannens tomt eller en plats dit allmänheten har tillträde, och "Ljud tas inte heller upp utanför tomten". Åtgärden myndigheten själv pekar ut är att "vinkla om kameran eller maskera området digitalt". Sidan innehåller också fyra färdiga exempel där undantaget inte gäller, bland annat en dörrkamera på en lägenhetsdörr och en kamera i hemmet hos någon med hemtjänst.',
  },
  {
    publisher: "Arlo",
    title: "Privacy Zones FAQ",
    url: "https://www.arlo.com/en_gb/support/faq/digital-masking-privacy-zones/privacy-zones-faqs",
    date: "2026-01-27",
    market: "UK",
    kind: "standard",
    note: 'Tillverkarens egen FAQ, och den skarpaste brasklappen i kategorin. Fråga 5: "when Auto Zoom & tracking is enabled the privacy zones will be automatically deleted." Fråga 6: samma sak när du ändrar synfältet. Fråga 7: samma sak vid rotering 180 grader. För pan/tilt-modellerna står dessutom "As soon as the camera moves, the privacy zone disappears." Fråga 8 skiljer själv på de två begreppen: aktivitetszonen styr vad som spelas in vid rörelse utanför zonen, sekretesszonen döljer ett område i inspelningen.',
  },
  {
    publisher: "TP-Link",
    title: "Set Privacy Zone for Tapo Camera and Doorbell",
    url: "https://www.tp-link.com/nordic/support/faq/4338/",
    date: "2026-03-31",
    market: "SE",
    kind: "standard",
    note: 'Nordiska supportsidan, och den anger både funktionen och dess gräns: "Privacy Zones are applied based on the current camera view. If the camera is rotated or repositioned, the Privacy Zones will remain active but will shift with the view and no longer cover the original areas." Högst fyra zoner. Modellistan omfattar både Tapo C425 och Tapo C660 KIT, alltså båda de kameror vi rankar.',
  },
  {
    publisher: "Reolink",
    title: "How to Set up Privacy Mask for Reolink Cameras",
    url: "https://support.reolink.com/articles/360003493454-How-to-Set-up-Privacy-Mask-for-Reolink-Cameras/",
    market: "SE",
    kind: "standard",
    note: 'Den enda tillverkardokumentationen som anger "Applies to: All Reolink cameras" och som säger rakt ut att masken syns "in the live view and recordings". Artikeln öppnar dessutom med precis det fall IMY beskriver: "you are worried that you might get in trouble with your neighbor over privacy issues." Begränsningen finns även här, men gäller rörliga kameror: en statisk mask "will offset with PTZ movements", och den dynamiska masken som följer med finns bara på RLC-823S1, RLC-823S1W och RLC-823S2.',
  },
  {
    publisher: "eufy",
    title: "About Privacy Zones",
    url: "https://support.nz.eufy.com/support/solutions/articles/154000241622-about-privacy-zones",
    date: "2025-12-10",
    market: "UK",
    kind: "standard",
    note: 'Kortaste dokumentationen och den mest uppseendeväckande formuleringen: "when you enable the privacy zones feature, activity in the privacy zones may not be avoided completely to be recorded." Alltså att maskeringen inte säkert hindrar inspelning. Modellistan omfattar S100 Wall Light Cam, eufyCam 2 Pro, 2C Pro, 2 och 2C, och därmed varken SoloCam S220 eller eufyCam C35 som säljs i svensk handel.',
  },
  {
    publisher: "Kjell & Company",
    title: "Övervakningskameror, 67 produkter",
    url: "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror",
    market: "SE",
    kind: "standard",
    note: "Butikskälla för priser, upplösning, lagring och kundbetyg. Den är också källan till att abonnemangsberoendet syns redan i butiken: specifikationen för Arlo Essential 3 anger AI-detektering av personer, fordon och paket \u0022(via Arlo Secure)\u0022, och för Arlo Pro 6 dessutom branddetektering via samma abonnemang. Reolink, Tapo och eufy anger sin igenkänning utan asterisk. Kjell är dessutom en av två butiker som alls skiljer på detekteringszon och sekretesszon i sina specifikationer, i raderna för Ring och Yale.",
  },
  /*
   * De sex svenska jämförelserna, mätta 2026-08-03. Konkurrenterna stod som
   * "ej mätt" i `.agent/research/overvakningskamera.md` §5 fram till dess.
   *
   * **Fyndet är vad som saknas.** Sökt term för term på alla sex:
   *
   *   maskering                  0 av 6
   *   GDPR                       0 av 6
   *   kamerabevakning            1 av 6
   *   IMY                        1 av 6, en enda gång
   *   granne                     2 av 6, en gång vardera
   *
   * Fältet säljer alltså utomhuskameror till villaägare, 28 000 ord
   * tillsammans, utan att behandla den fråga som avgör om kameran är laglig:
   * vad som händer när den ser grannens tomt eller trottoaren. Digital
   * maskering är den åtgärd IMY pekar ut, och ingen av de sex nämner ordet.
   */
  {
    publisher: "Testix",
    title: "Bästa utomhus övervakningskameran, testade modeller för hemmet",
    url: "https://testix.se/test/utomhus-overvakningskamera",
    market: "SE",
    kind: "comparison",
    note: "Störst av de sex, 6 212 ord och sex tabeller. Nämner ändå varken IMY, GDPR, kamerabevakning, maskering eller grannar, alltså ingen av frågorna som avgör var kameran får sitta.",
  },
  {
    publisher: "Bäst i Test Guiden",
    title: "Bästa övervakningskamera utomhus bäst i test",
    url: "https://www.bast-i-test.se/tester_pa_basta/overvakningskamera.html",
    market: "SE",
    kind: "comparison",
    note: "5 061 ord, och den mest påkostade av de sex. Nämner grannar en gång och myndigheten inte alls.",
  },
  {
    publisher: "Testproffs",
    title: "Övervakningskamera utomhus bäst i test, topp 6 modeller",
    url: "https://testproffs.se/overvakningskamera-utomhus/",
    market: "SE",
    kind: "comparison",
    note: "4 742 ord, alltså mitt i fältet av de sex i omfång.",
  },
  {
    publisher: "Testvinnarna",
    title: "Bäst övervakningskamera utomhus",
    url: "https://testvinnarna.se/overvakningskamera-utomhus/",
    market: "SE",
    kind: "comparison",
    note: "4 454 ord, och inte ett ord om integritetsfrågan.",
  },
  {
    publisher: "Bäst i test",
    title: "Övervakningskamera utomhus, 6 modeller i test",
    url: "https://www.xn--bst-i-test-q5a.se/overvakningskamera-utomhus",
    market: "SE",
    kind: "comparison",
    note: "4 013 ord, kortast av de sex, och inte heller den nämner integritetsfrågan.",
  },
  {
    publisher: "Test.se",
    title: "Bäst i test övervakningskamera, bästa kameran för inomhus och utomhus",
    url: "https://www.test.se/overvakningskamera/",
    market: "SE",
    kind: "comparison",
    note: "Den enda av de sex som över huvud taget nämner Integritetsskyddsmyndigheten, och då bara i förbigående. Skriver aldrig maskering, och sidan blandar dessutom inomhus- och utomhuskameror i samma ranking trots att myndighetens bedömning skiljer sig åt mellan dem.",
  },
];

/**
 * Dörrklocka med kamera.
 *
 * Delar IMY-källan med /overvakningskamera, men lyfter det exempel som gäller
 * just den här produkten: en dörrkamera på en lägenhetsdörr faller utanför
 * privatundantaget. Resten är tillverkarnas egen dokumentation av
 * sekretesszoner, alla lästa i original.
 */
export const DORRKLOCKA_SOURCES: Source[] = [
  {
    publisher: "Integritetsskyddsmyndigheten",
    title: "Kamerabevaka inom privatundantaget, exemplet dörrkamera i lägenhetshus",
    url: "https://www.imy.se/privatperson/kamerabevakning/regler-for-dig-som-kamerabevakar/kamerabevaka-inom-privatundantaget/",
    date: "2026-06-05",
    market: "SE",
    kind: "standard",
    note: 'Sidans viktigaste källa. Myndigheten publicerar fyra egna exempel där privatundantaget inte gäller, och det första handlar om precis den här produkten: "En boende i ett lägenhetshus har satt upp en dörrkamera/titthålskamera på sin ytterdörr i trygghetssyfte. Omfattas kamerabevakningen av privatundantaget? Svar: Nej. Om bevakningen sker från en lägenhetsdörr och förbipasserande i trapphuset eller grannars lägenheter riskerar att komma med i bild gäller GDPR och kamerabevakningslagen." Samma sida anger de fem villkoren för undantaget, inklusive att ljud inte tas upp utanför tomten, och att undantaget ska tolkas snävt.',
  },
  {
    publisher: "TP-Link",
    title: "Set Privacy Zone for Tapo Camera and Doorbell",
    url: "https://www.tp-link.com/nordic/support/faq/4338/",
    date: "2026-03-31",
    market: "SE",
    kind: "standard",
    note: 'Modellistan omfattar både Tapo D230S1 och Tapo D235, alltså två av de dörrklockor vi rankar. Samma sida anger gränsen: "Privacy Zones are applied based on the current camera view. If the camera is rotated or repositioned, the Privacy Zones will remain active but will shift with the view and no longer cover the original areas." Högst fyra zoner.',
  },
  {
    publisher: "Arlo",
    title: "Privacy Zones FAQ",
    url: "https://www.arlo.com/en_gb/support/faq/digital-masking-privacy-zones/privacy-zones-faqs",
    date: "2026-01-27",
    market: "UK",
    kind: "standard",
    note: 'Listar modellnumret AVD4001 som "Arlo Video Doorbell 2K (2nd Generation)", alltså den dörrklocka vi rankar. Brasklappen är densamma som för deras kameror: zonerna raderas automatiskt vid autospårning, vid ändrat synfält och vid rotering 180 grader. Fråga 8 i samma FAQ skiljer själv på aktivitetszon och sekretesszon, vilket är den begreppsskillnad hela sidan bygger på.',
  },
  {
    publisher: "Aqara",
    title: "Doorbell Camera Hub G410, tillverkarens produktsida",
    url: "https://www.aqara.com/eu/product/doorbell-camera-hub-g410/",
    market: "SE",
    kind: "standard",
    note: 'Tillverkarens egen formulering om maskering: "Privacy Masking. For more privacy, you can mask out parts of the image so that they will be completely blocked while recording." Tillsammans med Reolink den enda vars text säger att maskeringen gäller inspelningen. Samma sida anger att molnbackup via HomeGuardian bara fungerar i kabelansluten drift, vilket är en begränsning på en produkt som levereras med sex AA-batterier.',
  },
  {
    publisher: "Reolink",
    title: "How to Set up Privacy Mask for Reolink Cameras",
    url: "https://support.reolink.com/articles/360003493454-How-to-Set-up-Privacy-Mask-for-Reolink-Cameras/",
    market: "SE",
    kind: "standard",
    note: 'Anger "Applies to: All Reolink cameras" och att masken syns "in the live view and recordings". Den enda dokumentationen i kategorin utan brasklapp som träffar en fast monterad dörrklocka: begränsningen gäller PTZ-rörelser, och en dörrklocka panorerar inte.',
  },
  {
    publisher: "Kjell & Company",
    title: "Smarta dörrklockor, 45 artiklar",
    url: "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor",
    market: "SE",
    kind: "standard",
    note: "Butikskälla för priser, upplösning, synfält, strömförsörjning och kundbetyg. Framför allt källan till vad som ligger i lådan: Ring Battery Video Doorbell levereras utan signalenhet, medan Aqara G410 levereras med chime-hubb och sex AA-batterier och Tapo D235 med en signalenhet för eluttag. Samma butik anger att Arlos igenkänning kräver Arlo Secure och att Yales fordons-, paket- och husdjursdetektering är abonnemangsfunktioner.",
  },
  /*
   * De sex svenska jämförelserna, mätta 2026-08-03.
   *
   * Sidans tre fynd prövades ett och ett mot hela fältet, och alla tre höll:
   *
   * 1. **Lägenheten.** Noll av sex nämner IMY eller
   *    Integritetsskyddsmyndigheten. Fyra av sex skriver ändå om lägenheter,
   *    tillsammans 48 gånger, med testkollen.se på 25. De behandlar alltså
   *    lägenhetsköparen utförligt utan att nämna myndighetens eget exempel:
   *    att en dörrkamera på en lägenhetsdörr faller utanför privatundantaget.
   * 2. **Ringklockan.** Noll av sex nämner signalenhet eller inomhusklocka.
   *    Att fyra av åtta produkter levereras utan den enhet som gör att det
   *    ringer inne i bostaden syns alltså ingenstans i svensk jämförelse.
   * 3. **Synfältet.** En av sex nämner vertikalt synfält, och den gör det fyra
   *    gånger. Det är måttet som avgör om ett paket på marken syns i bild.
   *
   * ⚠️ testkollen.se gav först en falsk träff på `IMY`. Den satt inuti
   * **Energimyndighetens**. Se kommentaren i
   * `.agent/tmp/analysera-konkurrent.mjs` om varför termräkning behöver
   * ordgräns före men inte efter.
   */
  {
    publisher: "Testkollen",
    title: "Dörrklockor bäst i test, toppval och priser jämförda",
    url: "https://www.testkollen.se/dorrklockor",
    market: "SE",
    kind: "comparison",
    note: "Störst i kategorin, 12 642 ord och 21 tabeller. Skriver mer om lägenheter än någon annan, utan att en enda gång nämna att myndighetens bedömning skiljer sig åt mellan villadörr och lägenhetsdörr.",
  },
  {
    publisher: "Testra",
    title: "Smart dörrklocka bäst i test",
    url: "https://testra.se/test/smart-dorrklocka-bast-i-test-2026",
    market: "SE",
    kind: "comparison",
    note: "8 968 ord och tretton tabeller, alltså mycket arbete lagt på själva jämförelsen.",
  },
  {
    publisher: "Testix",
    title: "Dörrklocka bäst i test, smarta och trådlösa alternativ",
    url: "https://testix.se/test/dorrklocka",
    market: "SE",
    kind: "comparison",
    note: "6 660 ord och sex tabeller. Nämner lägenhet tretton gånger och signalenhet inte en enda.",
  },
  {
    publisher: "Bäst i Test Guiden",
    title: "Trådlös ringklocka bäst i test, dörrklocka med kamera",
    url: "https://www.bast-i-test.se/tester_pa_basta/smart_dorrklocka.html",
    market: "SE",
    kind: "comparison",
    note: "5 189 ord, och den enda av de sex som alls nämner vertikalt synfält, fyra gånger, alltså det mått som avgör om ett paket på marken syns.",
  },
  {
    publisher: "Prylstaden",
    title: "Bästa dörrklocka med kamera",
    url: "https://www.prylstaden.se/prylbloggen/dorrklocka-med-kamera-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "1 467 ord utan tabeller, och nämner aldrig lägenheter.",
  },
  {
    publisher: "Handlasmart",
    title: "Hitta den bästa dörrklockan med kamera",
    url: "https://www.handlasmart.se/dorrklocka-kamera",
    market: "SE",
    kind: "comparison",
    note: "Kortast av de sex, 1 191 ord och fem bilder.",
  },
];

/**
 * Inomhuskamera.
 *
 * Omvänd juridik mot utomhussidan: IMY säger att inomhus oftast är tillåtet,
 * men gör undantag för hemtjänst. Produktfrågan blir därför en annan, och
 * källorna handlar om avstängning i stället för maskering.
 */
export const INOMHUSKAMERA_SOURCES: Source[] = [
  {
    publisher: "Integritetsskyddsmyndigheten",
    title: "Kamerabevaka inom privatundantaget, exemplet hemtjänstpersonal",
    url: "https://www.imy.se/privatperson/kamerabevakning/regler-for-dig-som-kamerabevakar/kamerabevaka-inom-privatundantaget/",
    date: "2026-06-05",
    market: "SE",
    kind: "standard",
    note: 'Sidans viktigaste källa, och den enda som pekar åt två håll. Grundregeln är generös: "Kamerabevakning inne i din bostad omfattas oftast av privatundantaget. Det gäller även om kamerorna är kopplade till en larmcentral." Men myndighetens eget exempel säger nej till det vanligaste skälet att köpa produkten: "Om en privatperson regelbundet får besök av hemtjänsten omfattas inte kamerabevakningen av privatundantaget. Det beror på att hemtjänstpersonalen besöker hemmet i sin yrkesroll och på så sätt blir bevakade under sin arbetstid." Skillnaden mot hantverkarfallet är regelbundenheten, inte avsikten.',
  },
  {
    publisher: "Arlo",
    title: "How do I use the Privacy Shield on my Arlo Essential Indoor Camera?",
    url: "https://www.arlo.com/en_gb/support/faq/000062930/how-do-i-use-the-privacy-shield-on-my-arlo-essential-indoor-camera",
    date: "2025-11-27",
    market: "UK",
    kind: "standard",
    note: 'Kategorins bästa integritetslösning, beskriven av tillverkaren själv: "The Privacy Shield automatically covers the camera lens when the camera is disarmed, and opens when the camera is armed. Motion detection, audio detection, and the camera microphone are turned off when the Privacy Shield is closed." Och brasklappen i samma text: "If continuous video recording (CVR) is enabled, the Privacy Shield stays open, and your camera continues recording." Alltså slutar skyddet fungera på den dyraste abonnemangsnivån. Sidan anger också att live-visning av en kamera som inte spelar in kräver lösenord, ansiktsigenkänning eller fingeravtryck.',
  },
  {
    publisher: "TP-Link",
    title: "Privacy Mode on Tapo and Kasa Cameras",
    url: "https://www.tp-link.com/nordic/support/faq/2791/",
    date: "2026-07-01",
    market: "SE",
    kind: "standard",
    note: 'Källan till både programläget och det fysiska skyddet. "When Privacy Mode is enabled on a Tapo or Kasa camera, it stops streaming and recording both video and audio", alltså både bild och ljud och inte bara inspelningen. Och: "Select Tapo camera models, such as Tapo C125 and Tapo C225, support a physical privacy button. Pressing it lowers a shield over the lens or rotates the lens away for complete privacy." Det är den uppgiften som gör C225 till sidans vinnare.',
  },
  {
    publisher: "Kjell & Company",
    title: "Övervakningskameror inomhus, 62 artiklar",
    url: "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus",
    market: "SE",
    kind: "standard",
    note: 'Butikskälla för priser, upplösning, panorering, lagring och kundbetyg. Också källan till att Ring levererar ett fysiskt skydd: innehållsförteckningen för Indoor Camera Plus listar "1 × Linsskydd" och för Pan-Tilt Indoor Camera "1x sekretesskydd (fäst på kameran)". Samma butik anger att Arlos AI-detektering och molnlagring kräver Arlo Secure, och att Ring Pan-Tilt kräver Ring Home-abonnemang. Butiken publicerar dessutom ingen specifikation alls för Tapo C100, kategorins mest sålda produkt, eller för eufys två inomhuskameror.',
  },
  /*
   * De sex svenska jämförelserna, mätta 2026-08-03.
   *
   * **Bara två av de sex är skrivna om inomhuskameror.** De övriga fyra rankar
   * inomhusmodeller mitt i en lista över övervakningskameror i allmänhet, utan
   * att markera att myndighetens bedömning skiljer sig åt: inomhus är enligt
   * IMY oftast tillåtet, utomhus sällan lika enkelt. Samma mönster som på
   * utrymningsstegarna, där fältet blandar två produkttyper i en lista.
   *
   * Sökt term för term på alla sex:
   *
   *   hemtjänst                  0 av 6
   *   linsskydd eller slutare    0 av 6
   *   Integritetsskyddsmyndigheten  1 av 6, en gång
   *
   * Att hemtjänst saknas helt är det tyngsta. Myndigheten gör uttryckligt
   * undantag för hem som regelbundet får besök av hemtjänst, och det är precis
   * den köpare kategorin marknadsförs mot. Att linsskyddet saknas är det näst
   * tyngsta: det är den enda integritetskontroll en läsare kan se med ögat.
   */
  {
    publisher: "Testix",
    title: "Bästa inomhus övervakningskameran, trygghet för hemmet",
    url: "https://testix.se/test/inomhus-overvakningskamera",
    market: "SE",
    kind: "comparison",
    note: "En av två som faktiskt är skriven om inomhuskameror. Störst av dem, 6 072 ord och fem tabeller. Tar upp integritet en enda gång på hela sidan.",
  },
  {
    publisher: "MakeITSecure",
    title: "Bästa övervakningskameran inomhus",
    url: "https://makeitsecure.org/sv/basta-overvakningskameran/inomhus/",
    market: "SE",
    kind: "comparison",
    note: "Den andra av de två som är skriven om inomhuskameror. 2 428 ord utan tabeller. Nämner varken hemtjänst, linsskydd eller myndigheten.",
  },
  {
    publisher: "Testexperterna",
    title: "Övervakningskamera bäst i test, toppval",
    url: "https://testexperterna.se/overvakningskamera",
    market: "SE",
    kind: "comparison",
    note: "Störst av alla sex, 10 045 ord och 77 bilder, och den enda som nämner Integritetsskyddsmyndigheten, en gång. Skriver ordet integritet nitton gånger utan att komma fram till hemtjänstundantaget eller till linsskyddet. Rankar inomhus- och utomhusmodeller i samma lista.",
  },
  {
    publisher: "Prylstaden",
    title: "Bästa övervakningskameran",
    url: "https://www.prylstaden.se/prylbloggen/overvakningskamera-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "2 628 ord utan tabeller, blandar inomhus och utomhus.",
  },
  {
    publisher: "Kjell & Company",
    title: "Bäst i test: övervakningskamera",
    url: "https://www.kjell.com/se/kunskap/guider/bast-i-test-overvakningkamera",
    market: "SE",
    kind: "comparison",
    note: "Butikens egen redaktionella topplista över det egna sortimentet, alltså både domare och part, och samma butik vi själva länkar till. 1 272 ord. Värd att läsa just därför: den visar hur kort en jämförelse kan vara när syftet är att sälja det som redan står på hyllan.",
  },
  {
    publisher: "Bygghemma",
    title: "Övervakningskamera bäst i test, vi jämför modeller med smarta funktioner",
    url: "https://www.bygghemma.se/reportage-och-guider/bast-i-test-overvakningskamera/",
    market: "SE",
    kind: "comparison",
    note: "Kortast av de sex, 1 244 ord. Butikens egen sida om det egna sortimentet.",
  },
];

/**
 * Kodlås till ytterdörr.
 *
 * Den enda kategorin på sajten där primärkällan är ett certifikat med
 * nummer, klass och giltighetstid, plus den norm certifikatet utfärdats mot.
 * Certifikatets eget fält Additional är sidans fynd.
 */
export const KODLAS_SOURCES: Source[] = [
  {
    publisher: "Svensk Brand- och Säkerhetscertifiering",
    title: "Certifikat 21-537, Digital lock units, Yale Doorman L3 + Yale Home",
    url: "https://www.sbsc.se/en/productcertificate/21-537/digital-lock-units/yale-doorman-l3-yale-home/assa-abloy-opening-solutions-sweden-ab/",
    date: "2027-11-27",
    market: "SE",
    kind: "standard",
    note: 'Sidans viktigaste källa och en primärkälla. Certifikat 21-537, innehavare ASSA ABLOY Opening Solutions Sweden AB, klass S3 enligt SSF 3523 utgåva 1, ordning Scheme 5 enligt ISO/IEC 17067:2013, giltigt till 2027-11-27. Certifikatets fält Additional anger vad godkännandet omfattar: "Gäller bortasäkert läge med blockerade användarkoder och låsöppning med nyckelbricka eller med appen Yale Home." Den certifierade konfigurationen har alltså användarkoderna blockerade, på den produkt kategorin är uppkallad efter. Datumfältet här är certifikatets giltighetstid och inte ett publiceringsdatum.',
  },
  {
    publisher: "Stöldskyddsföreningen",
    title: "Lås och beslag, godkänd låsenhet och klassindelning",
    url: "https://www.stoldskyddsforeningen.se/foretag/sakerhetsguider/inbrottsskydd/las-beslag/",
    date: "2021-10-14",
    market: "SE",
    kind: "standard",
    note: 'Normgivarens egen text. Definierar godkänd låsenhet som hela enheten, alltså låshus, låscylinder, säkerhetsslutbleck och förstärkningsbehör, där "hela låsenheten och dess ingående produkter tillsammans och var för sig" ska nå klass 3 enligt SSF 3522 eller klass S3 enligt SSF 3523. Innehåller också den mening som förklarar sidans fynd: "För vissa produkter, främst elektromekaniska/digitala med många olika funktioner, finns det begränsningar i vilka funktioner som får aktiveras för att uppfylla kraven för godkänd låsenhet." Samt varningen "Kontrollera alltid vad försäkringsbolag/kravställare har för krav på låsenhet innan du förändrar något!" Sidan ger dessutom hela klasstabellen för båda normerna, och noterar att SSF 3523 saknar motsvarighet till SSF 3522 klass 4.',
  },
  {
    publisher: "Svensk Brand- och Säkerhetscertifiering",
    title: "Godkända lås, information om lås och beslag",
    url: "https://www.sbsc.se/guide/godkanda-las-och-beslag/",
    market: "SE",
    kind: "standard",
    note: "Certifieringsorganets egen guide, använd som andra samstämmig källa så att definitionen av godkänd låsenhet inte vilar på en enda läsning. Anger samma klassindelning som SSF och samma krav på att varje ingående produkt ska klara klass 3 var för sig. Beskriver också vad provningen omfattar: hållfasthet, dyrkning och manipulering, manuella och elektriska angrepp, samt funktionskrav på medveten handling, behörighet och direktmanövrering.",
  },
  {
    publisher: "Kjell & Company",
    title: "Smarta lås, 51 artiklar",
    url: "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las",
    market: "SE",
    kind: "standard",
    note: 'Butikskälla för priser, upplåsningsmetoder, dörrtjocklek, batterityp och kundbetyg. Också den enda butik vi gått igenom som redovisar låsklass per produkt, och som skriver ut det negativa: för Aqara U200 står "OBS! Aqara Smart Lock U200 är inte godkänt enligt SSF 3522 klass 3 eller SSF 3523 klass S3." För Nimly Code anges "Låsklass 2A och SSF3522", för Nimly Code Pro "Låsklass: Klass 3", och för Yale Doorman L3S att låset är försäkringsgodkänt för både mekanisk och digital säkerhet. För Yale Doorman Classic Home, Yale Linus L2, Nimly Touch Pro och Danalock V3 Scandi anges ingen låsklass alls.',
  },
  /*
   * De sex svenska jämförelserna, mätta 2026-08-03. Kategorin är den där
   * konkurrensen skriver mest och kontrollerar minst.
   *
   * Sökt term för term på alla sex:
   *
   *   SSF 3522, mekaniskt certifikat   3 av 6
   *   SBSC, den som utfärdar dem       0 av 6
   *   SSF 1075, digitala nycklar       0 av 6
   *   prEN 16867, elektroniskt angrepp 0 av 6
   *   låsenhet                         0 av 6
   *
   * Halva fältet nämner alltså det mekaniska certifikatet, ingen nämner vem
   * som utfärdar det, och ingen nämner de två digitala provningarna. Framför
   * allt: **ingen av dem skriver ordet låsenhet.** En godkänd låsenhet är fyra
   * delar och varje del måste nå klass 3, vilket är hela skillnaden mellan ett
   * lås som duger för försäkringen och ett som ser ut att göra det.
   */
  {
    publisher: "Produktbetyg",
    title: "Kodlås ytterdörr bäst i test",
    url: "https://produktbetyg.se/kodlas-ytterdorr",
    market: "SE",
    kind: "comparison",
    note: "Störst i kategorin, 7 361 ord. Nämner varken SBSC, SSF 3522, SSF 1075 eller låsenhet, alltså inget av det som avgör om låset räknas av försäkringsbolaget.",
  },
  {
    publisher: "Testix",
    title: "Dörrlås bäst i test, smarta lås för tryggt hem",
    url: "https://testix.se/test/dorrlas",
    market: "SE",
    kind: "comparison",
    note: "6 879 ord och sex tabeller, men inte ett ord om certifiering.",
  },
  {
    publisher: "Bäst i Test Guiden",
    title: "Kodlås ytterdörr bäst i test, elektroniskt dörrlås",
    url: "https://www.bast-i-test.se/tester_pa_basta/smart_las.html",
    market: "SE",
    kind: "comparison",
    note: "4 877 ord. Nämner SSF 3522 en enda gång, alltså det mekaniska certifikatet, men inte klassindelningen och inte de digitala proven.",
  },
  {
    publisher: "Testvinnarna",
    title: "Bäst kodlås ytterdörr, säkra kodlås",
    url: "https://testvinnarna.se/kodlas-ytterdorr/",
    market: "SE",
    kind: "comparison",
    note: "3 922 ord. Nämner SSF 3522 i förbigående, men aldrig SSF 3523 som är den digitala motsvarigheten.",
  },
  {
    publisher: "Test.se",
    title: "Smarta lås, bäst i test smarta lås till ytterdörren",
    url: "https://www.test.se/smarta-las/",
    market: "SE",
    kind: "comparison",
    note: "2 903 ord och 66 bilder utan en enda tabell, och inte ett ord om certifiering i en kategori där certifikatet är det som räknas.",
  },
  {
    publisher: "Bygghemma",
    title: "Kodlås ytterdörr bäst i test, vi jämför elektroniska dörrlås",
    url: "https://www.bygghemma.se/reportage-och-guider/kodlas-ytterdorr-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "Kortast av de sex, 1 741 ord, och ändå den som nämner SSF 3522 flest gånger, tre. Butikens egen sida om det egna sortimentet.",
  },
];

/**
 * Hemlarm.
 *
 * Kategorin saknar oberoende test och kan inte få ett: en tjänst med
 * larmcentral går inte att prova i ett labb. Källorna är därför av ett annat
 * slag än på produktsidorna, nämligen **de dokument som binder bolaget**. Ett
 * avtalsvillkor är på sitt sätt starkare bevis än ett test, eftersom det är
 * vad bolaget lovar och kan hållas till.
 *
 * Samtliga lästa i original 2026-08-03, med utgåva angiven där sådan finns.
 */
export const HEMLARM_SOURCES: Source[] = [
  {
    publisher: "Verisure Sverige AB",
    title: "Allmänna villkor Verisure, avtalsversion 2025:1",
    url: "https://www.verisure.se/sites/se/files/flmngr/pdf-villkor/privat/allmanna_villkor/allmanna-villkor-verisure-2025-1.pdf",
    market: "SE",
    kind: "standard",
    note: 'Primärkälla, läst i sin helhet. Punkt 5 om äganderätt: "Vi behåller äganderätten till alla av Verisure monterade och uppkopplade komponenter samt komponenter som i övrigt omfattas i larmtjänsten, oavsett om dessa införskaffats via Verisure webbshop eller på annat sätt." Punkt 13 anger uppsägningstiden till löpande tre kalendermånader och ger rätt att debitera en återtagandeavgift om 7 000 kronor om kunden inte lämnar tillträde för avslutningsbesöket. Bindningstid nämns bara på ett enda ställe, i punkt 12 om prisändring, och då villkorat: "för tjänster som löper med viss bindningstid". Någon bindningstid för privatkunder anges alltså inte i de allmänna villkoren.',
  },
  {
    publisher: "Verisure Sverige AB",
    title: "Tjänstevillkor inbrottslarm, version 2024:2",
    url: "https://www.verisure.se/sites/se/files/flmngr/pdf-villkor/privat/tjanstevillkor/tjanstevillkor-inbrottslarm-2024-2.pdf",
    market: "SE",
    kind: "standard",
    note: 'Primärkälla för vad som faktiskt sker vid larm. Definierar verifierat inbrott som att kameradetektor eller videodetektor visar obehörig person eller misstanke om brott, eller att person på plats verifierar. Punkt 4: "Utryckning sker vidare inte under provdriftsperiod om sju dagar från dagen för ny uppkoppling om inbrott inte har kunnat verifieras", och vid larm enbart från styrkontakt utan verifiering "avslutas ärendet. Ingen väktarutryckning sker." Anger också att bolaget inte kan garantera fasta utryckningstider eller att polisen rycker ut, samt självriskeliminering upp till 10 000 kronor mot uppvisat försäkringsbesked.',
  },
  {
    publisher: "Verisure Sverige AB",
    title: "Allmänna villkor, larm monterat av kund, avtalsversion 2025:1",
    url: "https://www.verisure.se/sites/se/files/flmngr/pdf-villkor/privat/allmanna_villkor/allmanna-villkor-verisure-Larm-monterat-av-kund-2025-1.pdf",
    market: "SE",
    kind: "standard",
    note: 'Den enda plats där en bindningstid för privatkunder står utskriven i något av de avtalsdokument vi läst. Punkt 15: "Avtalet är bindande i 24 kalendermånader efter tecknandet. Om uppsägning av Avtalet inte sker senast tre kalendermånader före bindningstidens utgång förlängs avtalet tillsvidare med en uppsägningstid om tre kalendermånader." Det billigare egenmonterade alternativet har alltså en bindningstid som det dyrare installerade saknar i sina publicerade villkor, vilket ingen jämförelsesajt vi läst nämner.',
  },
  {
    publisher: "Verisure Sverige AB",
    title: "Friköp av komponenter, prislista",
    url: "https://www.verisure.se/frikop",
    market: "SE",
    kind: "standard",
    note: 'Publicerad pristrappa för att köpa loss utrustningen, och den enda i kategorin. 7 000 kronor inom två år, 4 000 kronor vid två till fyra år, 2 000 kronor vid fyra till fem år och en krona efter fem år. Sidans egna förbehåll är avgörande: "I samband med Friköp garanterar Verisure ingen funktion, och du kan inte använda Mina Sidor / Verisures App och tillhörande produkter och tjänster för övervakning efter avslutat avtal", samt "För att du ska kunna friköpa larmlösningen och/eller komponenter krävs det att du har anmält friköpet innan avtalstiden löper ut. När ditt avtal väl har gått ut har du tyvärr ingen rätt till friköp längre."',
  },
  {
    publisher: "Sector Alarm AB",
    title: "Avtalsvillkor, utgåva SAS 2.1",
    url: "https://www.sectoralarm.se/hubfs/SE%20Documents/Avtalsvillkor_SAS_2.1_web.pdf",
    market: "SE",
    kind: "standard",
    note: 'Det utförligaste publicerade avtalet i kategorin, 22 paragrafer, läst i sin helhet. Punkt 8: "Larmsystemet är och ska vid var tid förbli Företagets egendom och Kunden förvärvar ingen rätt till eller i Larmsystemet utöver en nyttjanderätt under avtalstiden." Punkt 12.5 anger 24 månaders bindningstid enbart för företagskunder; för privatkunder anges bara "eventuell bindningstid" i punkt 12.1. Punkt 12.3: nycklar förstörs utan föregående meddelande om kunden inte skriftligen begär dem tillbaka, och returen kostar 1 990 kronor inklusive moms. Punkt 7 slår fast att ingen utryckningsgaranti finns. Punkt 11.5 ger självriskeliminering upp till 10 000 kronor per år, punkt 11.8 begränsar totalt skadeståndsansvar till 100 000 kronor och punkt 13.5 ger rätt att ändra priset tolv månader efter undertecknandet.',
  },
  {
    publisher: "Verisure Sverige AB",
    title: "Hemlarm, produktsida med pris",
    url: "https://www.verisure.se/hemlarm",
    market: "SE",
    kind: "standard",
    note: 'Prisuppgiften som gör att bindningstiden går att värdera i kronor: "Uppkopplingskostnad för Smart Voice Alarm med 12-månaders bindningstid: 3 990 kr (utan bindningstid: 5 990 kr). Månadskostnad på 599 kr tillkommer." Att slippa bindningstiden kostar alltså 2 000 kronor, vilket ingen jämförelsesajt vi läst skriver ut. Här bekräftades också att alertalarm.se numera omdirigerar hit.',
  },
  {
    publisher: "SecuritasHome",
    title: "Abonnemang och startpaket",
    url: "https://www.securitashome.se/abonnemang",
    market: "SE",
    kind: "standard",
    note: "Det andra av två bolag som publicerar hela priset. Abonnemang LILLA 349 kronor i månaden med bildverifiering, STORA 399 kronor i månaden med video. Startpaket i tre storlekar efter boendeform: lägenhet från 995 kronor, radhus från 1 495 och villa från 1 995. Bindningstid och uppsägningstid framgår däremot inte, vilket är skälet till att bolaget inte får full poäng på öppna villkor.",
  },
  {
    publisher: "Avarn Security",
    title: "SAFE HOME",
    url: "https://www.avarnsecurity.se/tjanster/safe-home/",
    market: "SE",
    kind: "standard",
    note: "Publicerar en månadsavgift på 449 kronor rakt ut på tjänstesidan, vilket är mer än de flesta gör, men ingen startavgift och inga avtalsvillkor vi kunnat hitta. Sidan ligger under en tjänstemeny på en sajt som i övrigt vänder sig till företag, vilket är skälet till att erbjudandet sällan syns i jämförelser.",
  },
  {
    publisher: "Svenska Alarm",
    title: "Hemlarm, priser och kampanjer",
    url: "https://www.svenskaalarm.se/hemlarm/",
    market: "SE",
    kind: "standard",
    note: 'Publicerar ett från-pris: "Tjänster tillkommer från 175 kr/mån. Alla priser till privatperson är inklusive moms." Sidan innehåller också en delbetalningskalkylator för hårdvaran med löptider upp till 72 månader. Ett från-pris med tillägg är inte ett pris, vilket är skälet till att bolaget hamnar i mitten och inte i toppen på kriteriet öppna villkor.',
  },
  {
    publisher: "Gardio",
    title: "Allmänna villkor",
    url: "https://gardio.se/villkor",
    market: "SE",
    kind: "standard",
    note: "Fullständiga villkor publicerade och läsbara utan inloggning, vilket är ovanligt för ett mindre bolag. Anger uppsägningstid normalt tre månader, hanterar avtal både med och utan bindningstid, och innehåller en formulering de större saknar: att äganderätten övergår till kunden när utrustningen är köpt.",
  },
  {
    publisher: "Gardio",
    title: "Gardio hemlarm med två HD-kameror och väktare",
    url: "https://gardio.se/produkt/gardio-trygg-larmadress-avarn/",
    date: "2026-08-05",
    market: "SE",
    kind: "standard",
    note: 'Produktsidan för hemlarmet, med hela priset utskrivet: "249,00 kr /månad", "Ingen startavgift, 24 månaders bindningstid". Anger att två HD-kameror, Avarns larmcentral och väktare med fria utryckningar ingår. Samtliga elva produkter i butiken har priset utskrivet. Sidan är skälet till rättelsen den 5 augusti 2026: vi hade läst förstasidan, sett ingen prislapp och dragit slutsatsen att bolaget inte publicerar priser.',
  },
  {
    publisher: "Svensk Brand- och Säkerhetscertifiering",
    title: "SSF 1015, anläggarfirma inbrottslarmanläggning",
    url: "https://www.sbsc.se/certifikat/ssf-1015-anlaggarfirma-inbrottslarmanlaggning/",
    market: "SE",
    kind: "standard",
    note: 'Certifieringsorganets beskrivning av den norm försäkringsbolag hänvisar till. Kräver bland annat registrering som företag i Sverige, tillstånd från Polismyndigheten enligt larmlagen, minst en behörig ingenjör, kvalitetsledningssystem enligt SSF 1044 och egna lokaler som minst motsvarar skyddsklass 1 enligt SSF 200. Deras egen formulering om varför det spelar roll: "Som certifierad anläggarfirma för inbrottslarm kan ni utföra inbrottslarmanläggningar som möter de krav som försäkringsbolag och andra kravställare ställer."',
  },
  {
    publisher: "Larmkollen",
    title: "Hemlarm bäst i test",
    url: "https://www.larmkollen.se/hemlarm/hemlarm-bast-i-test/",
    market: "SE",
    note: 'Kategorins starkaste svenska jämförelse, medtagen därför att den är det och inte trots. De publicerar en metod, är öppna med att de tjänar pengar på offertförmedling, och avstår medvetet från betyg: "Vi har testat och utvärderat hemlarm de senaste tretton åren på Larmkollen men aktar oss för att sätta egna betyg eller utropa testvinnare." De publicerar också femårskostnader per bolag, vilket betyder att femårsperspektivet inte är något vi uppfunnit. Vår skillnad mot dem är att vi citerar avtalen med punktnummer, räknar kostnaden att lämna och faktiskt rangordnar.',
    kind: "comparison",
  },
  /*
   * Två allmänna svenska jämförelser till, mätta 2026-08-03. De fyra som
   * behandlar larm utan abonnemang står vid LARM_UTAN_ABONNEMANG_SOURCES.
   *
   * Ingen av dem nämner certifierad installatör, och ingen av dem citerar ett
   * avtalsvillkor med punktnummer. Det senare är hela vår skillnad i
   * kategorin: bindningstid och uppsägning avgörs av avtalstexten, inte av
   * vad bolagets säljsida sammanfattar.
   */
  {
    publisher: "Konsumentguiden",
    title: "Larm bäst i test, jämför hemlarm, villalarm och säkerhetslösningar",
    url: "https://www.konsumentguiden.se/hem-och-hushall/larm-sakerhet-overvakning/",
    market: "SE",
    kind: "comparison",
    note: "Störst av de allmänna, 7 678 ord. Nämner både SBSC och hemförsäkring, men aldrig larmklass eller SSF 140.",
  },
  {
    publisher: "Bäst i Test Guiden",
    title: "Hemlarm bäst i test, vilket hemlarm är bäst?",
    url: "https://www.bast-i-test.se/tester_pa_basta/hemlarm.html",
    market: "SE",
    kind: "comparison",
    note: "3 404 ord. Lutar sig mer på hemförsäkringen än någon annan i fältet, utan att en enda gång nämna SBSC, larmklass eller SSF 140. Det är kombinationen som gör den värd att peka på: starkast påstående om försäkringen, svagast underlag för det.",
  },
];

/**
 * Larm utan abonnemang.
 *
 * Kategorin har fyra svenska tester och alla fyra handlar om Ajax, så listan
 * domineras i stället av normer och lagtext. Det är rätt tyngdpunkt: det som
 * avgör om ett larm du monterat själv duger i försäkringssammanhang står inte
 * i ett test utan i SSF 140, i SBSC:s krav på installatören och i larmlagen.
 *
 * ⚠️ SSF 140 finns fritt bara som förhandsgranskning av **utgåva 1 från
 * 2005**. Utgåva 2 är den gällande och säljs. Vi citerar utgåva 1 med årtal
 * utskrivet, och utgåva 2:s krav via SBSC:s egen beskrivning.
 */
export const LARM_UTAN_ABONNEMANG_SOURCES: Source[] = [
  {
    publisher: "Stöldskyddsföreningen",
    title: "SSF 140 utgåva 1, projektering och installation av inbrottslarmanläggningar med intern radioöverföring",
    url: "https://www.stoldskyddsforeningen.se/app/uploads/2019/11/Frhandsgranskning-SSF-140-01-Proj-o-inst-av-Inbrottslarmanl-med-intern-radioverfring.pdf",
    market: "SE",
    kind: "standard",
    note: 'Normen för precis den här produkten, publicerad fritt av SSF som förhandsgranskning. Utgåva 1, daterad 2005-09-13. Omfattningen enligt §1: "Dessa regler gäller för inbrottslarmanläggningar med intern trådlös förbindelse avsedda för i första hand användning inomhus i bostäder." Inledningen anger att reglerna specificerar krav som kan finnas i försäkringsvillkor, och §5.1 heter Larmklass R. Utgåva 2 är den gällande och säljs, så texten vi läst är den äldre.',
  },
  {
    publisher: "SBSC",
    title: "SSF 1112 Behörig installatör, inbrottslarm med intern radioöverföring",
    url: "https://www.sbsc.se/certifikat/ssf-1112-behorig-installator-inbrottslarm-med-intern-radiooverforing/",
    market: "SE",
    kind: "standard",
    note: 'Certifieringsorganets egen text om vad som krävs för att en anläggning ska uppfylla SSF 140:2: "den som projekterar och installerar anläggningen, som lägst, är certifierad installatör enligt SSF 1112 eller att installatören är certifierad anläggarfirma enligt SSF 1015 med en behörig ingenjör inbrottslarm enligt SSF 1016". Samma sida säger att certifieringen riktar sig till installatörer som installerar hemlarm. Det är alltså installationen och intyget som gör anläggningen godkänd, inte hårdvaran.',
  },
  {
    publisher: "Svensk Försäkring",
    title: "Information om inbrottslarm",
    url: "https://www.svenskforsakring.se/globalassets/forsakringstekniska-rekommendationer/mer-information-om-skadeforebyggande-atgarder/information-om-inbrottslarm.pdf/",
    market: "SE",
    kind: "standard",
    note: 'Tre sidor, daterade 2016-09-01. Definierar en försäkringsanläggning som "en anläggning som är villkorad i ett försäkringsavtal" och listar regelverket bakom: SSF 130, SSF 136 larmcentraler, SSF 1014 materiel, SSF 1015 anläggarfirma, SSF 1016 behörig ingenjör och SSF 1058 anläggarintyg. Skriften säger också rakt ut att rekommendationerna är vägledande och frivilliga och att försäkringsbolag får avtala om annat, vilket är varför vi inte skriver att ett larm utan anläggarintyg är värdelöst.',
  },
  {
    publisher: "Sveriges riksdag",
    title: "Lag (1983:1097) med vissa bestämmelser om larmanläggningar m.m.",
    url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-19831097-med-vissa-bestammelser-om_sfs-1983-1097/",
    market: "SE",
    kind: "standard",
    note: 'Larmlagen, läst i original. §1 definierar en larmanläggning som en anläggning inrättad för att avge signal till en särskild larmmottagare. §6 lägger på larminnehavaren skyldigheten att motverka obefogade larm. §8: efter ett föreläggande, om larmet ändå orsakar en ny polisutryckning, "ska innehavaren betala kostnaden för utryckningen, om det inte är uppenbart oskäligt". Utan larmcentral är det du som är larminnehavare. §2 kräver tillstånd för larminstallationsverksamhet, vilket är yrkesmässig installation åt andra och inte att montera sitt eget larm.',
  },
  {
    publisher: "Kjell & Company",
    title: "Yale Startlarmkit+, produktsida med specifikation",
    url: "https://www.kjell.com/se/produkter/smarta-hem/smarta-larm/yale-startlarmkit-p67921",
    market: "SE",
    kind: "standard",
    note: 'Butikskällan för sidans andra fynd. Specifikationsraden lyder ordagrant "Kommunikation: Wi-fi, Ethernet, Bluetooth, 4G (kräver SIM-kort och prenumeration), Horizon+". Samma sida listar vad prenumerationsplanen ger: 4G-backup, automatiserad samtalsvarning och professionell övervakning. Här står också reservbatteriet som 12 timmar med fotnoten cirka 6 timmar vid wifi-anslutning, vilket ingen jämförelse vi läst nämner.',
  },
  {
    publisher: "Kjell & Company",
    title: "Ring Alarm (2. gen) Larmsystem, produktsida",
    url: "https://www.kjell.com/se/produkter/smarta-hem/smarta-larm/ring-alarm-2.-gen-larmsystem-p51858",
    market: "SE",
    kind: "standard",
    note: 'Samma fynd hos den andra tillverkaren, med butikens egna ord: "Genom att prenumerera på tjänsten Ring Protect Plus kan du dessutom använda mobilnätet för att kontrollera att systemet fungerar om du inte har en internetuppkoppling." Sidan anger också sirenen till 104 dB och reservbatteriet till 24 timmar, båda högst i jämförelsen, och att sensorerna använder Z-Wave.',
  },
  {
    publisher: "Clas Ohlson",
    title: "Hemlarm Eufy Security Alarm Kit 5 delar",
    url: "https://www.clasohlson.com/se/Hemlarm-Eufy-Security-Alarm-Kit-5-delar/p/36-8328",
    market: "SE",
    kind: "standard",
    note: "Den enda butikssida i kategorin som har en specifikationsrad för larmuppringning, och där står Nej. Sidan bekräftar också att systemet bygger på hemmets befintliga wifi och att HomeBase 2 fungerar som repeater. Varken sirenens ljudnivå eller hubbens reservbatteri anges, vare sig här eller hos Kjell, och därför står de som saknad uppgift i vår tabell.",
  },
  {
    publisher: "Ajax Systems",
    title: "Hub 2 Plus, tillverkarens produktsida",
    url: "https://ajax.systems/products/hub2-plus/",
    kind: "standard",
    note: "Tillverkarens egen specifikation av det som gör paketet till vinnare: fyra kommunikationskanaler, två separata internetleverantörer över Ethernet och wifi plus två mobilabonnemang i beredskap, med växling mellan kanalerna på sekunder. Reservbatteriet anges till upp till 15 timmar med Ethernet och wifi avstängda. Hubben pollar varje enhet var tolfte sekund och upptäcker en bruten förbindelse inom 60 sekunder.",
  },
  {
    publisher: "PC för Alla",
    title: "Test: Ajax hemlarm-system, lättanvänt med många komponenter",
    url: "https://www.pcforalla.se/article/1712280/ajax-hemlarm.html",
    market: "SE",
    note: "Ett av fyra svenska tester i kategorin, och ett av två med riktig Product- och Review-markup med betyg. Det testar Ajax, precis som de tre andra, vilket är skälet till att vi inte har något kriterium för testomdöme: täckningen är en av fem rankade produkter.",
  },
  {
    publisher: "Allt för Hemmet",
    title: "Test av hemlarm från Ajax Systems",
    url: "https://alltforhemmet.se/smarta-hem/test-av-hemlarm-fran-ajax-systems/",
    market: "SE",
    note: "Det mest bildrika av de svenska testerna, 54 bilder, med genomgång av installation, design, appens gränssnitt och sortiment. Även detta enbart om Ajax.",
  },
  {
    publisher: "Låskompaniet",
    title: "Ajax Larmpaket Hub2Plus, LAN WIFI 4G",
    url: "https://www.laskompaniet.se/product/ajax-larmpaket-hub2plus-lan-wifi-4g",
    market: "SE",
    kind: "standard",
    note: "Prissättningen och paketinnehållet för vinnaren, läst 2026-08-03: centralapparat Hub 2 Plus, manöverpanel, IR-detektor för husdjur 12 m, magnetkontakt och inomhussiren. Samma butik prissätter delarna var för sig, vilket är underlaget för vad en utbyggnad kostar: magnetkontakt 495 kr, rörelsedetektor 823 kr, siren 820 kr, manöverpanel 1 315 kr.",
  },
  /*
   * De fyra svenska jämförelserna som faktiskt behandlar larm utan
   * abonnemang, mätta 2026-08-03. De rent allmänna hemlarmssidorna står vid
   * HEMLARM_SOURCES i stället.
   *
   * Sökt term för term över hela larmfältet, sju sidor:
   *
   *   SBSC                    5 av 7
   *   larmklass               2 av 7
   *   SSF 140                 1 av 7
   *   certifierad installatör 0 av 7
   *
   * Fältet nämner alltså gärna SBSC, men **ingen** nämner att en anläggning
   * enligt normen kräver en certifierad installatör. Det är just det ledet som
   * gör påståendet om sänkt hemförsäkring ogrundat för den här produktklassen,
   * och det är det ledet som saknas överallt.
   *
   * ⚠️ `hus.se/hemlarm/` går inte att mäta härifrån: sidan svarar med
   * Cloudflares "Just a moment"-utmaning. Den är därför inte medtagen. Vi
   * påstår ingenting om en sida vi inte kunnat läsa.
   */
  {
    publisher: "Larmfakta",
    title: "Hemlarm utan abonnemang, guide och alternativ",
    url: "https://larmfakta.se/artikel/hemlarm-utan-abonnemang/",
    market: "SE",
    kind: "comparison",
    note: "Den enda av sju svenska larmsidor som nämner SSF 140, och den som kommer närmast vår egen hållning: både SBSC och larmklass får riktig plats, och den har en egen tabell över vad man faktiskt betalar. 3 538 ord med bara två bilder, alltså text och inte bildspel. Stannar ändå före kravet på certifierad installatör.",
  },
  {
    publisher: "Prylstaden",
    title: "Bästa hemlarm och villalarm",
    url: "https://www.prylstaden.se/prylbloggen/hemlarm-villalarm-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "Den av de sju som tar både larmklassen och reservuppkopplingen på störst allvar. 2 307 ord utan tabeller.",
  },
  {
    publisher: "MakeITSecure",
    title: "Bästa hemlarmet, jämför hemlarm idag",
    url: "https://makeitsecure.org/sv/larm/hemlarm/",
    market: "SE",
    kind: "comparison",
    note: "3 029 ord och elva tabeller, alltså mest tabelldriven av de sju. Nämner SBSC men varken larmklass eller SSF 140, och inte 4G en enda gång.",
  },
  {
    publisher: "HootSafe",
    title: "Hemlarm, jämför larmsystem i Sverige",
    url: "https://hootsafe.com/se/larm/",
    market: "SE",
    kind: "comparison",
    note: "Kortast i hela larmfältet, 1 054 ord och två bilder. Upprepar utan abonnemang utan att nämna en enda norm, klass eller certifiering.",
  },
];

/**
 * Luftrenare.
 *
 * Kategorins primärkälla är inte ett test utan en marknadskontroll. Två
 * myndigheter köpte in tjugo luftrenare, mätte ozonavgivningen, provade
 * elsäkerheten och analyserade kemikalieinnehållet, och publicerade resultatet
 * i en rapport på 45 sidor. Det är mer än något test i kategorin gör.
 *
 * ⚠️ Rapporten **namnger inte** de produkter som föll. Källistan får därför
 * aldrig läsas som att någon rankad produkt var en av dem.
 *
 * ⚠️ Råd & Röns test finns medvetet **inte** med. Uppgiften om att de testat
 * med poäng kommer från en sökmotorsammanfattning och gick inte att bekräfta i
 * original. Se .agent/research/luftrenare.md §9.
 */
export const LUFTRENARE_SOURCES: Source[] = [
  {
    publisher: "Kemikalieinspektionen och Elsäkerhetsverket",
    title: "Tillsyn 2/26: Luftrenare, produkter med risk för ozonavgivning",
    url: "https://www.kemi.se/publikationer/tillsynsrapporter/2026/tillsyn-2-26-luftrenare",
    date: "2026-01-23",
    market: "SE",
    kind: "standard",
    note: 'Sidans primärkälla, 45 sidor, läst i sin helhet. Ur sammanfattningen: "Resultaten av granskningen visade att 4 av 20 analyserade luftrenare inte klarade gränsvärdena för ozonavgivning, varav tre låg långt över." Granskningen gällde luftrenare som avger ozon som biprodukt och som är avsedda att stå på medan personer vistas i rummet, alltså inte ozongeneratorer. Rapporten anger gränsvärdet till 0,05 ppm, konstaterar att förfrågningarna till Giftinformationscentralen om symptom efter ozon från luftrenare gick från 12 år 2015 till 132 år 2024, och att Norge sedan 2022 förbjuder att ozongeneratorer tillhandahålls privatpersoner medan Sverige inte gör det. Den räknar också upp vilka tekniker som kan bilda ozon: katalytisk oxidation, plasma, ultraviolett bakteriedödande bestrålning och jonisering.',
  },
  {
    publisher: "Kemikalieinspektionen",
    title: "Höga ozonhalter från luftrenare utgör hälsorisk",
    url: "https://www.kemi.se/arkiv/nyhetsarkiv/nyheter/2026-01-23-hoga-ozonhalter-fran-luftrenare-utgor-halsorisk",
    date: "2026-01-23",
    market: "SE",
    kind: "standard",
    note: 'Myndighetens egen sammanfattning av granskningen, med två uppgifter som inte står lika tydligt i rapporten. Den första: "Majoriteten av kontrollerade luftrenare hade någon form av brist." Den andra är ett citat från Kerstin Gustafsson, inspektör: "Att 20 procent av de granskade luftrenarna gav ifrån sig för höga halter är allvarligt." Här står också att två produkter hade brister i komponenter som ska skydda mot elchock och brand, och att flera riskerade att exponera användaren för UV-strålning vid byte av UV-lampa.',
  },
  {
    publisher: "Elsäkerhetsverket",
    title: "Höga ozonhalter från luftrenare utgör hälsorisk",
    url: "https://www.elsakerhetsverket.se/om-oss/press/nyheter/2026/hoga-ozonhalter-fran-luftrenare-utgor-halsorisk/",
    date: "2026-01-23",
    market: "SE",
    kind: "standard",
    note: "Den andra myndigheten i den gemensamma kontrollen, med samma resultat publicerat parallellt. Elsäkerhetsverket svarade för elsäkerhetsprovningen, Kemikalieinspektionen för de kemiska analyserna. Att två myndigheter gick ihop är i sig ett besked om hur kategorin bedömdes: rapporten skriver att samarbetet möjliggjorde en kontroll med en bredd och ett djup som inte varit möjlig var för sig.",
  },
  {
    publisher: "Kjell & Company",
    title: "Rubicson Jonisator 10 m², produktsida",
    url: "https://www.kjell.com/se/produkter/hem-fritid/inomhusklimat-uppvarmning/luftrenare/rubicson-jonisator-10-m-p40793",
    market: "SE",
    kind: "standard",
    note: 'Butikskällan som binder ihop myndighetsgranskningen med en produkt du kan köpa i dag. Under rubriken Ozon och lukt skriver Kjell: "En joniserande luftrenare producerar små mängder ozon vid användning." Det är säljarens egna ord om sin egen produkt. Specifikationen anger elektrostatiskt filter och VOC-filter, alltså inget HEPA-filter över huvud taget, och produkten har kategorins lägsta kundbetyg med 3,0 på 17 omdömen.',
  },
  {
    publisher: "Kjell & Company",
    title: "Xiaomi Mijia Smart Air Purifier 6, produktsida",
    url: "https://www.kjell.com/se/produkter/hem-fritid/inomhusklimat-uppvarmning/luftrenare/xiaomi-mijia-smart-air-purifier-6-smart-luftrenare-2950-m-p47220",
    market: "SE",
    kind: "standard",
    note: 'Den andra produkten i jämförelsen med ett aktivt reningssteg. Butiken skriver: "Den inbyggda UVC-modulen bidrar dessutom till att eliminera bakterier och virus och hjälper till att hålla filtret rent." UV-strålning är en av de tekniker myndighetsrapporten räknar upp. Samma produktsida anger CADR 443 m³/h och fem sensorer, men ingen filterklass alls, vilket är ovanligt i prisläget 2 490 kronor.',
  },
  {
    publisher: "Camfil",
    title: "EPA, HEPA och ULPA-filter: vilket behöver du och när är HEPA rätt val?",
    url: "https://www.camfil.com/sv-se/kunskapscenter/utbildning-och-expertis/epa-hepa-ulpa-filter-vilket-behover-du",
    market: "SE",
    kind: "standard",
    note: "Filtertillverkarens genomgång av klassindelningen i EN 1822, som är underlaget för vårt kriterium om filterklass. Standarden delar in filter i EPA (E10 till E12), HEPA (H13 och H14) och ULPA (U15 till U17). Bara H13 och H14 är alltså HEPA, medan formuleringar som HEPA-typ och HEPA-liknande i regel betyder ett EPA-filter. Camfil är en av källorna, inte den enda: klassgränserna finns i standarden själv, som säljs av SIS.",
  },
  /*
   * De sex svenska jämförelserna, mätta 2026-08-03. Underlaget står i
   * `.agent/research/luftrenare.md` §2.
   *
   * ⚠️ Det här är den hårdaste konkurrensen vi mött, och det är värt att veta
   * innan någon föreslår att sidan ska bli längre. testat.nu skriver 7 214 ord
   * med sju tabeller, och bast-i-test.se har mer strukturerad data än vi:
   * `OfferShippingDetails` och `MerchantReturnPolicy` skickar vi inte ut alls.
   * Vi vinner inte den här kategorin på volym.
   *
   * Det vi har som de saknar är myndighetsgranskningen. Sökt term för term på
   * alla sex: **noll träffar** på Kemikalieinspektionen, Elsäkerhetsverket,
   * Giftinformationscentralen och marknadskontroll, sju månader efter att
   * rapporten kom.
   *
   * ⚠️ Räkna aldrig `ozon` som delsträng i den här kategorin. Underlaget i
   * `.agent/research/luftrenare.md` skrev att bast-i-test.se "säger ordet ozon
   * 33 gånger", och det talet är uppblåst: 22 av de 33 är varumärket
   * **Ozoneair**. Ämnet nämns 11 gånger. Slutsatsen står sig, men siffran ska
   * vara den rätta.
   */
  {
    publisher: "Testat.nu",
    title: "Luftrenare bäst i test, jämförelse av modeller för hemmet",
    url: "https://testat.nu/luftrenare/",
    market: "SE",
    kind: "comparison",
    note: "Längst i kategorin, 7 214 ord och sju tabeller. Nämner ozon i förbigående och myndighetsgranskningen inte alls.",
  },
  {
    publisher: "Bäst i Test Guiden",
    title: "Luftrenare bäst i test, bästa luftrenaren",
    url: "https://www.bast-i-test.se/tester_pa_basta/luftrenare.html",
    market: "SE",
    kind: "comparison",
    note: 'Den tystaste av de sex, och den mest talande. Ozon är genomgående på sidan, men nästan alltid som varumärket Ozoneair, deras egen testvinnare, och bara ibland som ämnet. Granskningen där två myndigheter mätte ozon från tjugo luftrenare nämns inte med ett ord. Köpguiden beskriver tvärtom ozon som en finess: avancerade modeller använder tekniker som HEPA, aktivt kol "och till och med ozon" för att förgöra bakterier och virus. 5 038 ord.',
  },
  {
    publisher: "M3",
    title: "Test: bästa luftrenare, mindre pollen och renare luft hemma",
    url: "https://www.m3.se/article/1845205/luftrenare.html",
    market: "SE",
    kind: "comparison",
    note: "Den enda av de sex som ligger på en etablerad teknikredaktion. 3 048 ord och 69 bilder, men inga tabeller och inget om ozon.",
  },
  {
    publisher: "Test.se",
    title: "Förbättra luften med en bäst i test luftrenare",
    url: "https://www.test.se/luftrenare/",
    market: "SE",
    kind: "comparison",
    note: "2 309 ord och noll tabeller. Samma mall som deras luftfuktar- och avfuktarsidor.",
  },
  {
    publisher: "Proffsmagasinet",
    title: "Luftrenare bäst i test, 4 kundfavoriter jämförda",
    url: "https://www.proffsmagasinet.se/kunskapsportalen/tester/luftrenare-bast-i-test",
    market: "SE",
    kind: "comparison",
    note: "Rubriken säger kundfavoriter, alltså rankas butikens bästsäljare. 1 691 ord utan tabell.",
  },
  {
    publisher: "Bygghemma",
    title: "Luftrenare bäst i test, vi jämför luftrengörare mot damm och allergi",
    url: "https://www.bygghemma.se/reportage-och-guider/bast-i-test-luftrenare/",
    market: "SE",
    kind: "comparison",
    note: "Kortast av de sex, 1 385 ord. Butikens egen redaktionella sida om det egna sortimentet.",
  },
];


/**
 * Luftfuktare. Två svenska normkällor, två tyska laboratorieprov, ett svenskt
 * handhavandetest och en butikssida som utser en titel testet aldrig gav.
 *
 * De två första är sidans grund. Bägge lästa i original och sparade i
 * .agent/tmp/, eftersom en PDF som flyttas är en källa som försvinner.
 */
export const LUFTFUKTARE_SOURCES: Source[] = [
  {
    publisher: "SweSIAQ",
    title: "Vilken betydelse har luftfuktigheten för innemiljön?",
    url: "https://swesiaq.se/onewebmedia/Dokument/7.%20Vilken%20betydelse%20har%20luftfuktigheten%20f%C3%B6r%20innemilj%C3%B6n.pdf",
    market: "SE",
    kind: "standard",
    note: 'Svenska föreningen för inomhusmiljö, alltså svensk avdelning av International Society of Indoor Air Quality and Climate. Under rubriken Problem med låg luftfuktighet står meningen som gör hela den här sidan: "I allmänhet bör man undvika konstgjord befuktning av luften (risker med mögel-/bakterieväxt) och man kan ibland behöva acceptera den lägre luftfuktigheten." Deras två alternativ kostar ingenting: låt inte inomhustemperaturen vara onödigt hög, och anpassa ventilationen så luftflödena inte är högre än antalet personer kräver. Samma skrift anger att kvalstertillväxt kan uppstå i rumstemperatur redan vid en luftfuktighet över 45 till 50 procent.',
  },
  {
    publisher: "Folkhälsomyndigheten",
    title: "FoHMFS 2014:14, allmänna råd om fukt och mikroorganismer",
    url: "https://www.folkhalsomyndigheten.se/contentassets/26ea6c0d999742c0a5351c63e70cb0ce/fohmfs-2014-14.pdf",
    date: "2014-01-02",
    market: "SE",
    kind: "standard",
    note: 'Åtta sidor, lästa i sin helhet. Ger rekommendationer för tillämpningen av 9 kap. 3 § och 26 kap. 22 § miljöbalken. Under rubriken Undersökningar listas de indikationer som kan få tillsynsmyndigheten att kräva undersökning av en byggnad, och två av dem gäller fukt i luften: "om fukttillskottet inomhus, under vinterförhållanden, regelmässigt överstiger 3 g/m³ luft" och "om luftfuktighetens medelvärde överstiger 7 g vatten/kg torr luft under en längre period under eldningssäsongen, vilket motsvarar ca 45 % relativ luftfuktighet vid 21° C". Observera vad detta är: allmänna råd är rekommendationer och inte bindande regler, vilket författningssamlingen själv skriver ut, och 45 procent är en indikation för undersökning och inte ett gränsvärde. Råden innehåller inget rekommenderat spann för luftfuktighet alls.',
  },
  {
    publisher: "ÖKO-TEST",
    title: "Luftbefeuchter-Test: Fünf Bakterienschleudern entlarvt",
    url: "https://www.oekotest.de/bauen-wohnen/Luftbefeuchter-Test-Fuenf-Bakterienschleudern-entlarvt_111548_1.html",
    date: "2019-10-25",
    kind: "test",
    note: "Åtta luftfuktare, och fem av dem spred bakterier i oroande mängd. Mätvärdena är kategorins starkaste tal: mellan 400 000 och drygt 60 miljoner kolonibildande enheter per timme, att jämföra med normal inomhusluft som innehåller ungefär 100 till 500 per kubikmeter. Ultraljudsförnebulare pekas ut särskilt. Bara tre av åtta fick omdömet mycket bra eller bra. Deras egen rekommendation är återhållsam: använd en luftfuktare först när den relativa luftfuktigheten legat under 30 procent under en längre tid, byt vatten dagligen, och kom ihåg att över 60 procent under lång tid gynnar mögel. Uppdaterad för årsboken 2020.",
  },
  {
    publisher: "Stiftung Warentest",
    title: "Luftbefeuchter im Test: Nein zur Keimschleuder",
    /* Upplöst adress. Nyhetsnotisen `.../news/...-6257837-0/` omdirigerar hit,
       till testets egen sida. Innehållet är detsamma, kontrollerat mot noten:
       åtta apparater, 247 euro om året, bakterier i rumsluften och Beurer
       LB 300 Plus, publicerat 2025-09-17. */
    url: "https://www.test.de/Luftbefeuchter-im-Test-Gute-Verdunster-ab-130-Euro-4957429-0/",
    date: "2025-09-17",
    kind: "test",
    note: "Åtta apparater, fem evaporativa och tre ultraljud. Några av dem avger bakterier till rumsluften och flera gör det inte, vilket är skillnaden mot att avråda från hela kategorin. Deras slutsats är skötsel: utan regelbunden tömning, påfyllning, rengöring och avkalkning kan bakterier föröka sig eller mögel bildas. Testets andra fynd är driftkostnaden, 13 till 247 euro om året, alltså grovt 150 till 2 800 kronor, där förbrukningsdelarna driver kostnaden. Av de åtta provade säljs Beurer LB 300 Plus i Sverige och finns i vår rankning.",
  },
  {
    publisher: "Ljud & Bild",
    title: "Luftfuktare: slut på torr hy, kliande ögon och frissigt hår",
    url: "https://www.ljudochbild.se/test/smart-hem/luftfuktare-slut-pa-torr-hy-kliande-ogon-och-frissigt-har/",
    date: "2025-02-10",
    market: "SE",
    kind: "test",
    note: 'Det enda svenska grupptestet vi hittat, fem apparater, skrivet av Åsa Warme Hallén. Metoden är beskriven öppet och är ett handhavandetest och inget labbtest: varje apparat användes i ett antal dagar i ett rum av rimlig storlek, med en Airthings View Plus som kontrollmätare tre till sju meter bort. Ingen bakteriemätning. Testet utser ingen vinnare och sätter inga betyg, utan ger varje produkt plus och minus. Av de fem är bara Philips 5000 samma modell vi rankar: testets Wilfa är HU1A-43C mot Kjells Dew TX450, och testets Levoit är OasisMist 1000S mot Kjells 450S. Ingressen säger att det inte finns några exakta gränsvärden för hälsosam luftfuktighet, vilket FoHMFS 2014:14 motsäger.',
  },
  {
    publisher: "Clas Ohlson",
    title: "Philips 5000 Series HU5710/00 luftfuktare, produktsida",
    url: "https://www.clasohlson.com/se/Philips-5000-Series-HU5710-00-luftfuktare,-56-m2/p/36-312",
    market: "SE",
    kind: "standard",
    note: 'Butikssidan för vår testvinnare, och samtidigt ett exempel på varför vi läser testet och inte butikens sammanfattning av det. Produktbeskrivningen inleds med orden "Bäst i test." och skriver längre ner "Bäst i test feb 2025 enligt Ljud & Bild". Publikationen stämmer och datumet stämmer, men testet utser ingen vinnare och sätter inga betyg alls. Samma sida anger också "NanoCloud-teknik minskar bakterier med upp till 99 procent", vilket är tillverkarens eget påstående och inte en klassning enligt någon standard.',
  },
  /*
   * De sex svenska jämförelserna. Mätta med
   * `.agent/tmp/analysera-konkurrent.mjs` 2026-08-03, underlaget i
   * `.agent/research/luftfuktare.md` §2.
   *
   * Sidan påstår i brödtexten att ingen av **sju** svenska jämförelser nämner
   * normerna. Sju är sex plus Ljud & Bilds grupptest ovan, som står som `test`
   * eftersom det faktiskt är ett handhavandetest och inte en topplista.
   *
   * Sökningen bekräftar påståendet: noll träffar av sex på `SweSIAQ`, `FoHMFS`,
   * `miljöbalk`, `olägenhet`, `fukttillskott` och `allmänna råd`. Enda träffen
   * i hela svepet är Testkompassens tre omnämnanden av Folkhälsomyndigheten,
   * och det är just den felcitering sidan tar upp separat.
   */
  {
    publisher: "Bäst i Test Guiden",
    title: "Luftfuktare bäst i test, bästa luftfuktare",
    url: "https://www.bast-i-test.se/tester_pa_basta/luftfuktare.html",
    market: "SE",
    kind: "comparison",
    note: "4 735 ord, och bara en enda jämförelsetabell trots omfånget.",
  },
  {
    publisher: "Testkompassen",
    title: "Luftfuktare, 5 modeller vi testat inför 2026",
    url: "https://www.testkompassen.se/kategorier/vvs-inomhusklimat/klimat-och-varme/luftfuktare",
    market: "SE",
    kind: "comparison",
    note: 'Längst av alla, 8 632 ord och nio tabeller, och den enda som publicerar sin viktning i procent. Den är också den enda av de sex som namnger Folkhälsomyndigheten, och den gör det fel: sidan skriver att cirka 30 till 50 procent relativ luftfuktighet "ligger i linje med råd från bland annat Folkhälsomyndigheten". Något sådant spann finns inte i FoHMFS 2014:14, som anger 45 procent vid 21 grader som indikation för att kräva undersökning av bostaden.',
  },
  {
    publisher: "Luftfuktare.se",
    title: "Luftfuktare bäst i test, bästa luftfuktaren",
    url: "https://luftfuktare.se/luftfuktare-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note: "2 769 ord, inga tabeller, inga spårlänkar vi kan se. Kommer närmast rätt av de sex på nivåfrågan: att luftfuktigheten på vintern inte bör ligga över 45 procent, eftersom det ökar risken för kvalster. Rätt tal och rätt riktning, men utan källa och kopplat till kvalster i stället för till fukt i konstruktionen.",
  },
  {
    publisher: "OG Teknik",
    title: "Bästa luftfuktare, bäst i test",
    url: "https://ogteknik.se/hemelektronik/basta-luftfuktare/",
    market: "SE",
    kind: "comparison",
    note: 'Skriver att fuktigheten "bör vara under 45 %, vilket vi menar på att man enkelt kan åstadkomma med en luftfuktare". En luftfuktare höjer luftfuktigheten, så meningen säger att man håller sig under en gräns genom att röra sig mot den. 3 029 ord och femton h2-rubriker, alltså mycket sida och lite riktning.',
  },
  {
    publisher: "Test.se",
    title: "Bäst i test luftfuktare, se vilken som vann",
    url: "https://www.test.se/luftfuktare/",
    market: "SE",
    kind: "comparison",
    note: "2 155 ord, 42 bilder och noll tabeller. Samma mall som deras avfuktarsida.",
  },
  {
    publisher: "Bygghemma",
    title: "Luftfuktare bäst i test, vi jämför luftfuktare inomhus",
    url: "https://www.bygghemma.se/reportage-och-guider/bast-i-test-luftfuktare/",
    market: "SE",
    kind: "comparison",
    note: "Kortast av de sex, 1 288 ord. Butikens egen redaktionella sida om det egna sortimentet, alltså både domare och part.",
  },
];

/**
 * Avfuktare. En europeisk standard, två svenska normkällor, två oberoende
 * provningar och tre butiks- eller tillverkarsidor som bevisar sidans fynd.
 *
 * De tre sista är märkta `standard` med flit. De är inte tester, de är
 * dokumentation av vad tillverkarna faktiskt skriver, och just därför måste de
 * ligga här: hela sidan står och faller med att den som vill kan gå och läsa
 * samma rader.
 */
export const AVFUKTARE_SOURCES: Source[] = [
  {
    publisher: "SIS, Svenska institutet för standarder",
    title:
      "SS-EN 810, Luftavfuktare med eldriven kompressor: provning av avfuktningsförmåga, märkning, funktionskrav och redovisning av tekniska data",
    url: "https://www.sis.se/produkter/byggnadsmaterial-och-byggnader/bygginstallationer/ventilation-och-luftkonditionering/ssen810/",
    date: "1997-04-30",
    market: "SE",
    kind: "standard",
    note: 'Det finns alltså en europeisk standard för precis det problem den här sidan handlar om, och titelns sista led är ordagrant "redovisning av tekniska data". Uppgifterna hos SIS, lästa 2026-08-03: status Gällande, utgåva 1, fastställd 1997-04-30, 21 sidor, framtagen av kommittén Värmepumpar SIS/TK 467, artikelnummer STD-20397, pris 1 097 kronor. Två saker är värda att stanna vid. Standarden är snart trettio år gammal och har aldrig fått en andra utgåva. Och den gäller enligt sin egen titel bara avfuktare med eldriven kompressor, alltså inte sorptionsavfuktare, som är den typ varje svensk jämförelse rekommenderar till kalla krypgrunder. Vi har inte köpt standarden och påstår därför ingenting om vilka provvillkor den föreskriver.',
  },
  {
    publisher: "Stiftung Warentest",
    title: "Luftentfeuchter im Test: Was sie leisten und was nicht",
    url: "https://www.test.de/Luftentfeuchter-Was-sie-leisten-und-was-nicht-5780477-0/",
    date: "2021-08-24",
    kind: "test",
    note: 'Stiftung Warentest driver ingen egen provning av avfuktare utan publicerar den brittiska systerorganisationen Which?:s resultat, och håller listan uppdaterad: tillgängligheten kontrollerades senast i slutet av januari 2026. Metoden är det viktiga för oss. Om provningen skriver de ordagrant "Getestet wird bei einer Raumtemperatur von 21 Grad, aber auch bei kühleren Temperaturen", alltså 21 grader och kallare, och om elen att Which? inte sätter förbrukningen i relation till tiden utan till mängden uppsamlat vatten, eftersom vissa apparater behöver dubbelt så lång drifttid för samma vattenmängd. Åtta modeller nådde minst 80 procent av maxpoängen. Av dem säljs Meaco Arete One 12L och 25L i svenska butiker och finns i vår rankning, Duux Bora Smart finns hos Elgiganten men utan läsbart pris, och EcoAir DD1 och DD3 saknar svensk återförsäljare. Sidan anger också gränsen där risken börjar: stiger luftfuktigheten varaktigt över 60 procent hotar mögel.',
  },
  {
    publisher: "ÖKO-TEST",
    title: 'Luftentfeuchter-Test: Nur ein Raumentfeuchter "sehr gut"',
    url: "https://www.oekotest.de/bauen-wohnen/Luftentfeuchter-Test-Nur-ein-Raumentfeuchter-sehr-gut_111435_1.html",
    date: "2018-10-17",
    kind: "test",
    note: 'Publicerad i ÖKO-TESTs årsbok för 2019. Bara en av de provade apparaterna nådde omdömet mycket bra. Det som gör källan värdefull är inte betygen, som hunnit bli gamla, utan hållningen: "Die Geräte aber haben ihre Tücken und sind als Dauerlösung ungeeignet", och längre ner utan omsvep "Luftentfeuchter sind keine Dauerlösung. Definitiv nein." Deras slutsats är att permanent för fuktiga rum betyder att något är fel med byggnaden, och att orsaken då ska åtgärdas, annars tar både hälsan och byggnaden skada. Det är samma sak Folkhälsomyndighetens allmänna råd säger från andra hållet.',
  },
  {
    publisher: "Folkhälsomyndigheten",
    title: "FoHMFS 2014:14, allmänna råd om fukt och mikroorganismer",
    url: "https://www.folkhalsomyndigheten.se/contentassets/26ea6c0d999742c0a5351c63e70cb0ce/fohmfs-2014-14.pdf",
    date: "2014-01-02",
    market: "SE",
    kind: "standard",
    note: 'Åtta sidor, lästa i sin helhet. Samma dokument bär vår sida om luftfuktare, men här läses det åt andra hållet. Under rubriken Undersökningar listas indikationer som kan få tillsynsmyndigheten att kräva undersökning av en byggnad enligt 26 kap. 22 § miljöbalken, och en av dem är "om luftfuktighetens medelvärde överstiger 7 g vatten/kg torr luft under en längre period under eldningssäsongen, vilket motsvarar ca 45 % relativ luftfuktighet vid 21° C". För den som köper avfuktare är det den nivå man vill komma under, och den är lägre än de 60 procent apparaterna oftast är förinställda på. Observera att allmänna råd är rekommendationer och inte bindande regler, vilket författningssamlingen själv skriver ut, och att 45 procent är en indikation och inte ett gränsvärde.',
  },
  {
    publisher: "SweSIAQ",
    title: "Vilken betydelse har luftfuktigheten för innemiljön?",
    url: "https://swesiaq.se/onewebmedia/Dokument/7.%20Vilken%20betydelse%20har%20luftfuktigheten%20f%C3%B6r%20innemilj%C3%B6n.pdf",
    market: "SE",
    kind: "standard",
    note: "Svenska föreningen för inomhusmiljö, svensk avdelning av International Society of Indoor Air Quality and Climate. Skriften anger att kvalstertillväxt kan uppstå i rumstemperatur redan vid en luftfuktighet över 45 till 50 procent relativ fuktighet, vilket är det bästa svenska svaret på frågan varför man skulle vilja avfukta ett rum som inte känns fuktigt. Samma skrift avråder från konstgjord befuktning, alltså den motsatta produkten, och pekar på ventilation och temperatur som de verktyg som inte kostar något.",
  },
  {
    publisher: "Clas Ohlson",
    title: "Wood's LD40 avfuktare källare och tvättstuga, produktsida",
    url: "https://www.clasohlson.com/se/Wood%E2%80%99s-LD40-avfuktare-kallare-och-tvattstuga,-100-m2/p/46-1453",
    market: "SE",
    kind: "standard",
    note: 'Den här produktsidan är sidans viktigaste enskilda bevis, och den är en butikssida och inget test. I butikens egen specifikation står två rader efter varandra: "Avfuktning (20 °C / 70 % RF): 7,5 liter per dygn" och "Avfuktning (30 °C / 80 % RF): 13 liter per dygn". Samma apparat, samma sida, samma dag, och talet nästan fördubblas beroende på vilka villkor som väljs. Det är den enda avfuktaren hos Clas Ohlson som publicerar båda. Övriga publicerar ett tal, och de flesta utan att ange några villkor alls. Hämtad 2026-08-03.',
  },
  {
    publisher: "Wood's",
    title: "Wood's SW42FW, tillverkarens produktsida",
    url: "https://woods.se/sv/produkter/avfuktare/kallare/woods-sw42fw/",
    market: "SE",
    kind: "standard",
    note: 'Tillverkarens egen spectabell anger "Avfuktningskapacitet (30 ºC & 80 % RH): 25 liter/24 h" och "Strömförbrukning (30 ºC & 80 % RH): 600 watt", alltså båda talen vid namngivna villkor. Det är den öppnaste redovisningen vi hittat i kategorin. Samma sida marknadsför apparaten för källare, garage och andra kalla utrymmen med driftstemperatur +2 till +35 ºC, alltså 28 grader under den temperatur kapacitetstalet är uppmätt vid. Värt att notera: Clas Ohlson, som säljer samma apparat, anger 25,5 liter och 550 watt utan villkor. Två av tillverkarens tal och två av butikens, för en och samma produkt. Hämtad 2026-08-03.',
  },
  {
    publisher: "Bygghemma",
    title: "Meaco MeacoDry Arete One 25L, produktsida",
    url: "https://www.bygghemma.se/hus-och-bygg/varme-och-ventilation/inomhusklimat-och-luktsanering/avfuktare/avfuktare-och-luftrenare-meaco-meacodry-arete-one-25l/p-1887651",
    market: "SE",
    kind: "standard",
    note: 'Tredje varianten av samma problem, och den mest talande. Modellen heter 25L, alltså är literantalet själva produktnamnet, men specifikationen säger inte med ett ord vid vilka villkor de 25 literna gäller. Däremot anges elen exakt: "Strömförbrukning vid 20 °C och 60 % RH: 267 watt". Meaco redovisar alltså effekten vid en realistisk svensk nivå och kapaciteten vid ingen angiven nivå alls, medan Wood\'s gör tvärtom och anger båda vid 30 grader. Hämtad 2026-08-03.',
  },
  /*
   * De sex svenska jämförelserna, hämtade som rå HTML 2026-08-03 och
   * genomsökta term för term. Underlaget står i `.agent/research/avfuktare.md`
   * med ordantal, schematyper och affiliatenätverk per sida.
   *
   * De stod tidigare bara som ett påstående i brödtexten, "ingen av de sex
   * svenska jämförelser vi läst", utan att någon kunde se vilka sex. Ett
   * påstående om vad andra inte skriver är värdelöst om läsaren inte kan gå
   * och kontrollera det.
   *
   * Ingen utom Clas Ohlson har en riktig jämförelsetabell, och ingen av dem
   * nämner mätvillkoren 30 °C och 80 % RF, EN 810, SweSIAQ eller
   * Folkhälsomyndigheten. Det är den slutsats sidans brödtext vilar på och den
   * står sig: noll träffar av sex på var och en av termerna.
   *
   * ⚠️ Här stod tidigare "noll av sex har `Product`-schema, `Review` eller
   * `ItemList`, tre har ingen strukturerad data alls". **Det var fel**, och
   * felet är värt att komma ihåg: den första genomgången läste bara
   * `application/ld+json`. bäst-i-test.se märker upp sina produkter med
   * **microdata** i stället, och har både `Product`, `Review`, `Rating` och
   * `AggregateRating`. test.se har `FAQPage` på samma sätt. Alla sex har
   * strukturerad data i någon form.
   *
   * `.agent/tmp/analysera-konkurrent.mjs` läser numera båda formaten, och
   * följer dessutom omdirigeringar och rapporterar slutadressen. Också det
   * kom av ett verkligt fel: Bygghemmas sida flyttade från `/inspiration/` till
   * `/reportage-och-guider/`, och den gamla adressen svarar `200` genom att
   * skicka besökaren till startsidan. En kontroll som bara ser statuskoden
   * kallar den länken frisk.
   */
  {
    publisher: "Bäst i test",
    title: "Avfuktare bäst i test",
        /* Punycode, inte unicode. Adressen är ett IDN och ska stå i den form
       en webbläsare och en crawler ser. */
    url: "https://www.xn--bst-i-test-q5a.se/avfuktare",
    market: "SE",
    kind: "comparison",
    note: "3 160 ord och 61 bilder utan en enda jämförelsetabell. Nämner varken mätvillkor eller standard.",
  },
  {
    publisher: "Test.se",
    title: "Avfuktare",
    url: "https://www.test.se/avfuktare/",
    market: "SE",
    kind: "comparison",
    note: "3 399 ord, 78 bilder och inte en enda tabell. Längst av de sex och den som säger minst om hur produkterna bedömts.",
  },
  {
    publisher: "Clas Ohlson",
    title: "Avfuktare bäst i test",
    url: "https://www.clasohlson.com/se/avfuktare-bast-i-test",
    market: "SE",
    kind: "comparison",
    note: "Enda av de sex med en riktig jämförelsetabell. Butikens egen redaktionella sida om det egna sortimentet, alltså både domare och part.",
  },
  {
    publisher: "Proffsmagasinet",
    title: "Luftavfuktare bäst i test, kundfavoriter jämförda",
    url: "https://www.proffsmagasinet.se/kunskapsportalen/tester/5-populara-avfuktare-testade",
    market: "SE",
    kind: "comparison",
    note: "Rankar butikens egna bästsäljare och kallar det test.",
  },
  {
    publisher: "Inredningsvis",
    title: "6 bästa avfuktare för källare, test och köpguide",
    url: "https://inredningsvis.se/6-basta-avfuktare-for-kallare-2026-test-kopguide/",
    market: "SE",
    kind: "comparison",
    note: "1 710 ord om källarmiljö specifikt. Anger urvalskriterier i löptext men inga mätvärden och ingen viktning.",
  },
  {
    publisher: "Bygghemma",
    title: "Avfuktare bäst i test",
    url: "https://www.bygghemma.se/reportage-och-guider/bast-i-test-luftavfuktare/",
    market: "SE",
    kind: "comparison",
    note: "Kortast av de sex, 1 435 ord. Butikens egen sida om det egna sortimentet.",
  },
];

/**
 * Robotdammsugare. Underlag i .agent/research/robotdammsugare.md.
 *
 * Två riktiga labb bär sidan, och de kom oberoende av varandra fram till
 * samma sak. Båda har betalvägg på produktnivå, så enskilda betyg återges
 * aldrig. Det som citeras är metoden och de slutsatser som ligger fritt.
 */
export const ROBOTDAMMSUGARE_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Robotdammsugare, bäst i test",
    url: "https://www.radron.se/tester/koksmaskiner-stadning/robotdammsugare/",
    date: "2025-08-14",
    market: "SE",
    kind: "test",
    note: "62 robotar mellan 1 000 och 17 000 kronor, alltså hela marknaden och inte ett urval. Labbet mäter damm, skräp och djurhår från golv och mattor och i hörn, moppning av lera och choklad, hur robotarna undviker hinder, ljudnivå, energiförbrukning och hur lätt de är att rengöra. Slutsatsen är hårdare än något som står i en svensk jämförelse: roboten har inget munstycke som skapar vakuum, den sopar i stället för att suga, och samtliga 62 får lägsta möjliga betyg för att få upp damm ur springor i golvet. På matta sugs nästan inget damm upp oavsett modell och pris. I moppningen delas många ettor ut, och labbet noterar att robotarna ofta smetar ut chokladen så att golvet ser smutsigare ut efteråt. Tjugo små högar fullkornsflingor lades ut för att mäta ytteckning, och ingen robot var i närheten av att städa bort alla. Fyra iRobot-modeller läser flingorna som möjligt hundbajs och kör runt dem. Fler än hälften trasslar in sig i elsladden i köket. Tömningsstationerna får bottenbetyg för ljud, den värsta 80 decibel. Två saker är lugnande: alla vänder vid trappöppning, och av de tretton som kan sätta virtuella gränser i appen är det två som inte respekterar dem. Betygen per modell ligger bakom betalvägg och återges inte här.",
  },
  {
    publisher: "Stiftung Warentest",
    title: "Saugroboter & Wischroboter im Test",
    url: "https://www.test.de/Saugroboter-im-Test-4806685-0/",
    date: "2026-06-30",
    kind: "test",
    note: 'Sidans vinkel kommer härifrån. Om sugkraften skriver de ordagrant att "Saugkräfte mit vielen Tausend Pa … sind Werbe-Anpreisungen, die Sie getrost ignorieren können", alltså att talet är reklam du lugnt kan bortse från, och samma sak gäller enligt dem hänvisningar till fast cleaning och särskild lasernavigering. Provningen följer DIN EN 62929: mineraldamm fördelas jämnt och robotarna kör tio gånger över provytan, kaffepulver läggs i en tio centimeter bred remsa längs väggarna för att mäta hörn och kanter, och på matta valsas fibrer in som bedöms efter fem överfarter. Vikterna är 30 procent sugning på hårt golv för kombimaskiner och 40 för rena sugrobotar, matta 10 respektive 15, moppning 15 respektive 0, och praktisk användbarhet 10. Räckvidden på en laddning skiljer sig mer än fem gånger mellan bäst och sämst, 193 mot 33 kvadratmeter. Golvtäckningen mätt uppifrån visar en robot som missar en sjättedel av rummet och en annan som missar mer än en tredjedel. Elförbrukningen står sällan på förpackningen trots att skillnaderna är stora. Sedan november 2025 provas maskinerna på tillverkarens rekommenderade inställning för kraftigt smutsade golv. Tabellen med betyg per modell är betald och återges inte här.',
  },
  {
    publisher: "Ljud & Bild",
    title: "4 robotdammsugare i mellanklassen",
    url: "https://www.ljudochbild.se/test/smart-hem/4-robotdammsugare-i-mellanklassen-2026/",
    date: "2026-03-07",
    market: "SE",
    kind: "test",
    note: "Natasja Broström provar Tapo RV50 Pro Omni, eufy Clean X10 Pro Omni, Dreame L40 Ultra AE och Xiaomi X20 Pro. Det här är källan som bär trösklarna, och fyndet finns inte i något internationellt test: nordiska trösklar visade sig vara en av de största utmaningarna i hela grupptestet, och en av de fyra robotarna fick ge upp helt. På kaffesump från köksgolvet drog flera robotar runt sumpen i stället för att ta upp den, medan Xiaomis modell klarade det bättre. Redaktionen har också provat DJI ROMO P och kallar den följsam och tyst, men skriver att den ofta tappar bort både sig själv och smutsen. Om Dreames första robot med mopprulle skriver de att den är nästan perfekt och att bara mindre brister hindrar högsta betyg.",
  },
  {
    publisher: "Ljud & Bild",
    title: "Så väljer du rätt robotdammsugare 2026",
    url: "https://www.ljudochbild.se/guide/sa-valjer-du-ratt-robotdammsugare-2026",
    date: "2026-03-12",
    market: "SE",
    /* Köpguide utan egen provning. Ligger som `comparison` för att den inte
       ska räknas in i "tester vi läst", där bara riktiga provningar hör hemma. */
    kind: "comparison",
    note: "Peter Gotschalks köpguide. Går igenom navigering, moppsystem och basstationer utan att ranka produkter, och är rak med att alla specifikationer inte är lika viktiga i praktiken. Nyttig som motvikt till butikstexterna, som ordnar sortimentet efter sugkraft.",
  },
  {
    publisher: "RTINGS",
    title: "The best robot vacuums",
    url: "https://www.rtings.com/robot-vacuum/reviews/best/robot",
    kind: "test",
    note: "Amerikanskt labb som köper sina exemplar själva och redovisar öppet att sajten också tjänar pengar på länkar. Täcker Roborock, Dreame, MOVA, iRobot, Dyson, eufy, Shark och Matic. Modellurvalet är amerikanskt och priserna är i dollar, så den fungerar som stöd för hur enskilda maskiner beter sig, inte för vad du bör köpa i Sverige.",
  },
  {
    publisher: "DIN",
    title: "DIN EN 62929, robotdammsugare för hushållsbruk, provmetoder",
    url: "https://www.beuth.de/de/norm/din-en-62929/230011661",
    date: "2015-05-01",
    kind: "standard",
    note: "Provmetoden Stiftung Warentest lutar sig mot när de mäter dammupptagning. Att den finns är i sig ett argument i den här kategorin: det existerar en standardiserad metod för att mäta hur mycket smuts en robotdammsugare faktiskt tar upp, medan pascaltalet som står på kartongen inte vilar på någon. Vi har inte köpt standarden och påstår därför ingenting om dess innehåll utöver att den är den metod labbet anger.",
  },
  {
    publisher: "M3",
    title: "Bäst i test, självtömmande robotdammsugare",
    url: "https://www.m3.se/article/1860791/robotdammsugare-sjalvtommande.html",
    market: "SE",
    kind: "comparison",
    note: "Svensk teknikredaktion med egen provning av enskilda modeller. Listan är byggd kring självtömmande stationer och saknar viktning, så den fungerar som orientering snarare än som rangordning.",
  },
  {
    publisher: "bäst-i-test.se",
    title: "Bästa robotdammsugaren",
    url: "https://www.xn--bst-i-test-q5a.se/robotdammsugare",
    market: "SE",
    kind: "comparison",
    note: "Störst av de svenska jämförelserna med 10 701 ord och 133 bilder, och ändå utan strukturerad märkning av produkterna. Nio robotar rankas, varav sex Roborock och två Mova, som är Dreames andramärke. Två koncerner håller alltså åtta av nio placeringar.",
  },
  {
    publisher: "Konsumentguiden",
    title: "Robotdammsugare bäst i test",
    url: "https://www.konsumentguiden.se/hem-och-hushall/robotdammsugare/",
    market: "SE",
    kind: "comparison",
    note: "2 962 ord, och den av de svenska sidorna som lagt mest arbete på vanliga frågor. Ingen viktning och inga egna mätvärden.",
  },
];

/**
 * Vilken källista som hör till vilken kategori.
 *
 * ⚠️ Fanns inte förrän 2026-08-03, och avsaknaden var ett verkligt fel.
 * Categories skickade en handplockad lista till `SourceList`: `/hem-hushall`
 * skickade luftrenarens källor, som råkar bestå av sex standarder och noll
 * tester. Panelen "Det här har vi gått igenom" visade därför **noll, noll,
 * noll** och två rader som slutade i en ensam punkt, på en grupp där
 * avfuktare och luftfuktare tillsammans har fem experttester.
 *
 * Kartan gör att en category inte kan välja fel lista, och att en ny test page
 * räknas med så snart den får en rad här.
 */
/**
 * Hygrometer. Kategorin har en enda riktig provning och den är tio år gammal,
 * vilket är hela skälet till att sidan finns: **ingen annan har mätt, och
 * nästan ingen tillverkare publicerar.**
 *
 * De fyra tillverkarsidorna nedan är inte utfyllnad. De är beviset. Två anger
 * en tolerans och två anger ingen, och att kunna visa båda sorterna i original
 * är skillnaden mellan ett påstående och ett fynd.
 *
 * Samtliga URL:er kontrollerade 200 den 2026-08-04.
 */
export const HYGROMETER_SOURCES: Source[] = [
  {
    publisher: "Bundesverband Schimmelpilzsanierung",
    title: "Hygrometer im Test",
    url: "https://bss-schimmelpilz.de/hygrometertest/",
    date: "2016-01-01",
    kind: "test",
    note: "Tyska mögelsaneringsförbundet, alltså en yrkeskår som lever på att mäta fukt rätt, provade fjorton mätare mot ett kalibrerat referensinstrument för 1 050 euro, löpande kontrollerat mot ett andra proffsinstrument på omkring 750 euro. Åtta digitala mellan 5,99 och 136 euro, fem analoga i byggvaruhuskvalitet mellan 8,25 och 124,95 euro, och ett analogt labbinstrument. Det är den enda provning vi hittat som faktiskt mäter avvikelsen i procentenheter, och resultatet går tvärtemot vad priset antyder: bäst av alla digitala var TFA Moxx för 9,99 euro med högst 0,5 procentenheters avvikelse och 0,2 grader, medan den sämsta digitala, en Pearl för 5,99 euro, låg 4,4 procentenheter fel och ändå godkändes. Det allvarliga fyndet gäller de analoga. Den analoga modell som först vann visade sig ha upp till tolv procentenheters spridning mellan tre exemplar av samma modell, alltså inte ett fel som går att kalibrera bort utan en skillnad mellan enskilda urtavlor. Förbundet rekommenderar digitalt rakt av. Observera årtalet: provningen gjordes 2015 och 2016 och gäller de exemplaren, inte dagens produkter.",
  },
  {
    publisher: "Beurer",
    title: "Thermo-Hygrometer HM 16, tillverkarens tekniska data",
    url: "https://www.beurer.com/de/p/67915/",
    kind: "standard",
    note: 'Den ena av två tillverkare i hela vår kartläggning som skriver ut hur mycket fel mätaren får visa. Tekniska data anger "± 5% RH" i spannet 40 till 80 procent och "± 8% RH" i spannen 20 till 40 och 80 till 95, samt ± 1 grad mellan 0 och 40 och ± 2 grader mellan 40 och 50. Det dubbla värdet är sidans mest användbara enskilda uppgift: toleransen är dubbelt så vid utanför mellanspannet, alltså sämst precis i krypgrunden om vintern och i badrummet efter en dusch. Läst i original 2026-08-04, inte i en söklista.',
  },
  {
    publisher: "TFA Dostmann",
    title: "Digital thermo-hygrometer MOXX 30.5026, tillverkarens tekniska data",
    url: "https://www.tfa-dostmann.de/en/product/digital-thermo-hygrometer-moxx-30-5026/",
    kind: "standard",
    note: 'Motstycket till Beurer, och lika viktig av motsatt skäl. Tabellen anger mätområdet "20...99% rH" och "0...+50°C", mått, vikt och batteri, men ingen tolerans alls, varken för fukt eller temperatur. Det är samma modell som mögelsaneringsförbundet mätte till 0,5 procentenheters avvikelse, alltså kategorins mest träffsäkra mätare enligt den enda provning som finns. Tillverkaren själv lovar ingenting. Det säger något om hur lite ett utelämnat tal går att tolka som ett dåligt tal.',
  },
  {
    publisher: "Shelly",
    title: "Shelly H&T Gen3, tillverkarens kunskapsbas",
    url: "https://kb.shelly.cloud/knowledge-base/shelly-h-t-gen3",
    kind: "standard",
    note: 'Kontrollerad, inte antagen. Specifikationen anger batterityp "4 AA (LR6) 1.5 V (not included)" och batteritid omkring ett år, och bekräftar att det finns en temperatur- och en fuktgivare, men publicerar varken mätområde eller noggrannhet för fukten. Det är den modell som sex svenska jämförelsesajter korat till bäst i test i kategorin, och ingen av dem efterlyste talet. Hos Kjell kostar den 429 kronor och har 3,5 i kundbetyg från 36 betyg, vilket är det lägsta vi noterat i kategorin.',
  },
  {
    publisher: "Folkhälsomyndigheten",
    title: "FoHMFS 2014:14, allmänna råd om fukt och mikroorganismer",
    url: "https://www.folkhalsomyndigheten.se/contentassets/26ea6c0d999742c0a5351c63e70cb0ce/fohmfs-2014-14.pdf",
    date: "2014-01-02",
    market: "SE",
    kind: "standard",
    note: 'Samma åtta sidor som bär våra sidor om luftfuktare och avfuktare, men här är de själva ärendet: dokumentet ger talet läsaren ska mäta mot. Under Undersökningar listas indikationer som kan få tillsynsmyndigheten att kräva undersökning av en byggnad enligt 26 kap. 22 § miljöbalken, och en av dem är "om luftfuktighetens medelvärde överstiger 7 g vatten/kg torr luft under en längre period under eldningssäsongen, vilket motsvarar ca 45 % relativ luftfuktighet vid 21° C". Det är precis den sortens gräns en mätare med ± 5 procentenheters tolerans inte kan avgöra om du ligger över eller under. Allmänna råd är rekommendationer och inte bindande regler, vilket författningssamlingen själv skriver ut, och 45 procent är en indikation och inte ett gränsvärde.',
  },
  {
    publisher: "SweSIAQ",
    title: "Vilken betydelse har luftfuktigheten för innemiljön?",
    url: "https://swesiaq.se/onewebmedia/Dokument/7.%20Vilken%20betydelse%20har%20luftfuktigheten%20f%C3%B6r%20innemilj%C3%B6n.pdf",
    market: "SE",
    kind: "standard",
    note: "Svenska föreningen för inomhusmiljö, svensk avdelning av International Society of Indoor Air Quality and Climate. Skriften anger att kvalstertillväxt kan uppstå i rumstemperatur redan vid en luftfuktighet över 45 till 50 procent relativ fuktighet. Det är den andra av de två gränser sidan handlar om, och den ligger så nära den första att skillnaden mellan dem är mindre än toleransen hos flera av mätarna vi rankar.",
  },
];

/**
 * Luftkvalitetsmätare. Kategorins tyngsta källa är inte en provning utan en
 * myndighetsvägledning, och det är hela skälet till att sidan har något att
 * säga: **fyra svenska jämförelser säljer radonmätare utan att nämna vad
 * radonsiffran duger till.**
 *
 * Samtliga URL:er kontrollerade 200 den 2026-08-04.
 */
export const LUFTKVALITETSMATARE_SOURCES: Source[] = [
  {
    publisher: "Stiftung Warentest",
    title: "CO2-Messgeräte und CO2-Ampeln im Test",
    url: "https://www.test.de/CO2-Messgeraete-und-CO2-Ampeln-im-Test-5709239-0/",
    date: "2021-12-22",
    kind: "test",
    note: 'Kategorins enda oberoende provning, och den täcker just den givare sidan handlar om. 26 koldioxidmätare och koldioxidampuller provades på mätning, handhavande, strömförbrukning och utförande. Utfallet var blandat: 18 av 26 fick bra betyg för mätningen, tre underkändes och resten hamnade på tillfredsställande eller nöjaktigt. Att var åttonde apparat inte klarade att mäta det den säljs för att mäta är skälet att bry sig om givartekniken. Airthings View Plus, som vi rankar först, fick **sehr gut (1,2) för mätningarna** och gut (1,9) totalt. Det är den starkaste sortens belägg vi har i kategorin, eftersom det är någon annan än tillverkaren som mätt. Prisspannet i provningen gick från under 100 euro för den billigaste bra apparaten till nästan 500 för den dyraste. Observera att den tyska betygsskalan går åt andra hållet än den svenska: 1,0 är bäst och 5,0 sämst. Provningen är från slutet av 2021 och täcker en av de sju vi rankar.',
  },
  {
    publisher: "Strålsäkerhetsmyndigheten",
    title: "Att mäta radon",
    url: "https://www.stralsakerhetsmyndigheten.se/omraden/radon/att-mata-radon/",
    market: "SE",
    kind: "standard",
    note: 'Myndighetens egen vägledning, och kategorins avgörande källa. Referensnivån för bostäder är 200 Bq/m³. En mätning som ska gälla som årsmedelvärde ska pågå i minst två månader mellan 1 oktober och 30 april, ske i minst två rum, och dosorna beställs genom och skickas till ett ackrediterat mätlaboratorium. En korttidsmätning kräver minst sju dagar med spårfilm, och myndigheten säger själv vad en sådan är värd: "En korttidsmätning är dock bara rådgivande, den kan inte användas för något myndighetsbeslut." Det gäller alltså även den avläsning en digital mätare visar efter en vecka. Eldningssäsongen 1 oktober till 30 april gäller hela landet enligt vägledningen till SSMFS 2018:10. Myndigheten uppskattar att nära 400 000 svenska bostäder ligger över referensnivån, vilket är skälet att mäta över huvud taget.',
  },
  {
    publisher: "Airthings",
    title: "Uncovering the Airthings carbon dioxide sensor",
    url: "https://www.airthings.com/resources/carbon-dioxide-sensor",
    kind: "standard",
    note: 'Tillverkarens egen redogörelse för vilken teknik de använder, och den enda i kategorin som sätter en siffra på noggrannheten. Givaren är NDIR, alltså en mätning av hur infrarött ljus absorberas av koldioxiden i luften, och den beskrivs som "a compact NDIR sensor installed in every Airthings Wave Plus device". Noggrannheten anges till "±30ppm ±3% within 15 – 35°C ... and 0 – 80%RH" och mätområdet till 400 till 5 000 ppm. Källan är värdefull för kontrasten mot de mätare som anger eCO2: den beskriver vad en riktig koldioxidgivare gör, och den som har en sådan visar sig också våga skriva ut vad den klarar.',
  },
];

/**
 * Robotgräsklippare. Två av källorna är peer-review och det är ovanligt för
 * oss. Skälet är att kategorins mest användbara fynd ligger i forskning och
 * inte i en produktprovning: **provet finns, klassningen finns, och ingen
 * tillverkare redovisar ett resultat.**
 *
 * ⚠️ `doi.org/10.3390/ani14010122` svarar 403 mot curl (MDPI:s botskydd).
 * PMC-spegeln används i stället och är kontrollerad 200.
 *
 * Samtliga URL:er kontrollerade 200 den 2026-08-04.
 */
export const ROBOTGRASKLIPPARE_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Robotgräsklippare, bäst i test",
    url: "https://www.radron.se/tester/boende-tradgard/robotgrasklippare/",
    date: "2026-06-26",
    market: "SE",
    kind: "test",
    note: "69 robotar avsedda för vanliga villatomter, alltså hela den svenska marknaden och inte ett urval, och publicerad fyra veckor innan vi läste den. Labbet bedömer utseende och jämnhet på normal gräsmatta, största yta roboten klarar, långt gräs, blött gräs, klipptid, ljudnivå, hur robotarna tar sig runt träd och rabatter, och laddtid. Prisspannet i testet är 2 000 till 35 000 kronor, vilket stämmer med vad vi själva läste i handeln. Två slutsatser är fritt läsbara och båda används här: blött gräs och svackor i mattan är det som skiljer robotarna åt, och slinglös navigering är flexiblare än slinga men har ojämn tillförlitlighet beroende på tomtens form. En tredje är viktig för vår igelkottssektion: samtliga provade robotar klarar de mekaniska säkerhetsproven och stannar när de lyfts. Modellbetygen ligger bakom betalvägg, 69 kronor för 30 dagar, och återges inte här.",
  },
  {
    publisher: "Rasmussen m.fl., Aalborg universitet och Oxford",
    title:
      "Wildlife Conservation at a Garden Level: The Effect of Robotic Lawn Mowers on European Hedgehogs",
    url: "https://www.natursidan.se/nyheter/ny-studie-om-igelkottar-och-robotgrasklippare/",
    date: "2021-04-01",
    kind: "test",
    note: "Publicerad i tidskriften Animals 2021 och refererad här via Natursidan, eftersom förlagets egen sida avvisar läsning. Arton robotmodeller kördes mot redan döda igelkottar i fyra storlekar från tre vinklar, tolv prov per modell. Två resultat bär hela vår sektion: ingen av de arton kunde upptäcka en igelkott innan den körde på den, och samtliga körde över ungar som ännu var beroende av modern. Skillnaden mellan modellerna i vad som hände vid kontakt var däremot stor, från lindriga märken till svåra skador. Forskaren beskriver det som hemskt att se hur vissa modeller lemlästade de döda djuren medan andra klarade sig utan att skada dem.",
  },
  {
    publisher: "Rasmussen m.fl.",
    title:
      "Testing the Impact of Robotic Lawn Mowers on European Hedgehogs and Designing a Safety Test",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10777904/",
    date: "2024-01-16",
    kind: "standard",
    note: 'Uppföljningen, i Animals 14(1):122, och den viktigaste källan på sidan. Här konstrueras ett standardiserat säkerhetsprov: attrapper i två storlekar på kokosmatta, sextio försök per storlek, tre vinklar, och en skadeklassning i fem steg. Reglerna är citerbara i klartext: en robot som bara ger klass 0 till 2 får kallas säker för igelkottar, en som ger klass 3 eller 4 får inte, och klass 4 innebär underkänt. Studien prövade dessutom vilka konstruktionsdrag som faktiskt förutsäger utfallet, alltså knivtyp, kollisionssensorer, strömavkänning i hjulmotorer, ultraljud, klipphöjd, glidplåtar, strålkastare, antal hjul och fram- eller bakhjulsdrift, och fann inget med säkerställd skyddande effekt. Det är skälet till att den här sidan inte betygsätter igelkottssäkerhet och inte heller jämför knivtyp: den som gör det jämför något som studien inte kunde belägga betyder något. Författarna skriver att protokollet nu bör valideras innan det förs in i CENELEC-standarden, vilket alltså inte har skett.',
  },
  {
    publisher: "Oxfords universitet",
    title: "Researchers develop hedgehog safety test for robotic lawnmowers",
    url: "https://www.ox.ac.uk/news/2024-01-16-researchers-develop-hedgehog-safety-test-robotic-lawnmowers",
    date: "2024-01-16",
    kind: "standard",
    note: "Universitetets eget pressmeddelande om provet, och den kortaste vägen för en läsare som vill kontrollera att provet finns utan att läsa en vetenskaplig artikel. Bekräftar att syftet är att tillverkare ska kunna säkerställa att en modell är igelkottsvänlig innan den släpps på marknaden.",
  },
  {
    publisher: "Husqvarna",
    title: "Husqvarnakoncernen välkomnar ny forskning om säkerhet för robotgräsklippare",
    url: "https://www.husqvarna.com/se/utforska-och-upptack/nyheter-och-media/husqvarnakoncernen-valkomnar-ny-forskning-om-sakerhet-for-robotgrasklippare/",
    date: "2021-04-26",
    kind: "standard",
    note: 'Tillverkarens eget svar, och den finns med för att den visar exakt var gränsen går mellan att välkomna forskning och att redovisa ett resultat. Husqvarna välkomnar studien, uppger att deras robotar "fick bra resultat i testet" och att de har lätta svängbara knivar på 3 gram. Någon poäng, någon skadeklass eller något jämförbart tal publiceras inte. Texten är dessutom från 2021 och gäller den första studien, alltså inte den från 2024 som konstruerade provet och som inte kunde belägga att svängbara knivar hjälper. Läs den som ett vittnesmål om vad branschen säger, inte som ett provresultat.',
  },
  {
    publisher: "SLU Artdatabanken",
    title: "Igelkott, dagens rödlistade art",
    url: "https://www.slu.se/artdatabanken/rodlistade-arter/dagens-rodlistade-art/igelkott/",
    market: "SE",
    kind: "standard",
    note: "Igelkotten är rödlistad som nära hotad i Sverige, uppflyttad från livskraftig. Källan finns här av två skäl, och det andra är viktigast. Den ger arten dess status, och den anger att orsakerna till minskningen är oklara: myndigheten spekulerar i grävling som predator och i en okänd sjukdom. Robotgräsklippare nämns inte. Sidan påstår därför aldrig att robotar orsakar rödlistningen, och det behövs inte, eftersom det som är belagt om vad som händer vid kontakt räcker.",
  },
];

/**
 * Fönsterputsrobot. Kategorin saknar oberoende provning, och källorna är
 * därför tillverkarnas egna manualer. Det är ovanligt för oss, men här är det
 * själva poängen: **de tre säkerhetstalen publiceras ojämnt, och skillnaden
 * mellan vad de skriver är fyndet.**
 *
 * Samtliga URL:er kontrollerade 2026-08-04.
 */
export const FONSTERPUTSROBOT_SOURCES: Source[] = [
  {
    publisher: "HOBOT Technology",
    title: "HOBOT-388, bruksanvisning",
    url: "https://manuals.plus/hobot/388-window-cleaning-robot-manual",
    kind: "standard",
    note: 'Den enda tillverkare i jämförelsen som sätter ett tal på säkerhetslinan: "the safety rope can endure the impact force up to 200kg to catch any fall". Samma manual anger att det inbyggda reservbatteriet håller roboten kvar på rutan i tjugo minuter vid strömavbrott, vilket är kortast av dem som anger något, och att glaset får vara hur tjockt som helst. Den innehåller också kategorins skarpaste förbud: "Do not use on frameless glass". Att en tillverkare uttryckligen förbjuder det en annan tillåter är skälet att läsa manualen före butikstexten.',
  },
  {
    publisher: "Kärcher",
    title: "Window cleaning robot RCW 2, tekniska data",
    url: "https://www.kaercher.com/int/home-garden/window-cleaning-robot/rcw-2-12692100.html",
    kind: "standard",
    note: 'Den öppnaste redovisningen av hålltid i kategorin. Nödbatteriet anges hålla roboten kvar i fyrtio minuter vid strömavbrott, och till skillnad från de andra publiceras batteriet självt: litiumjon, 0,65 Ah, 14,8 V, så talet går att kontrollera. Sidan anger också sugkraften till 3 300 Pa normalt och 5 000 Pa som mest, och minsta fönster till 35 × 35 cm. Den sista uppgiften är den mest användbara för svenska hus, eftersom spröjsade fönster ofta har mindre rutor än så. Säkerhetslina står i utrustningslistan utan hållfasthet.',
  },
  {
    publisher: "Ecovacs",
    title: "Winbot W1 Pro, bruksanvisning",
    url: "https://manuals.plus/ecovacs/w1-pro-winbot-website-manual",
    kind: "standard",
    note: 'Motstycket till HOBOT, och den finns med för kontrasten. Manualen är detaljerad om glaset och tyst om linan. Båglöst glas är tillåtet men med marginal: "Do not stick the WINBOT too close to the edge when cleaning the frameless glass. It is recommended to be more than 10 cm away from the edge." Bågen måste vara minst 5 mm bred, glaset minst 3 mm tjockt och speglar minst 4 mm. Om säkerhetslinan står bara att den ska knytas i något stadigt, utan hållfasthet, och någon hålltid vid strömavbrott anges inte alls, bara att säkerhetsbatteriet driver apparaten om strömmen bryts.',
  },
  {
    publisher: "Ecovacs",
    title: "Winbot fönsterputsrobot, svenska produktsidan",
    url: "https://www.ecovacs.com/se/winbot-window-cleaning-robot",
    market: "SE",
    kind: "standard",
    note: 'Tillverkarens svenska sida för W2- och W3-serien, och den enda plats där Ecovacs sätter en siffra på hålltiden. Sidan beskriver en "förstärkt kompositkabel som fungerar som ett säkerhetsrep" och ett reservbatteri som kan "hålla den fäst i mer än 30 minuter om huvudbatteriet tar slut". Formuleringen "mer än" är värd att notera: den är ett golv och inte ett mätvärde, till skillnad från Kärchers fyrtio minuter med batteridata bakom.',
  },
];

/**
 * Smart hem-hubb. Kategorin saknar oberoende provning, och källorna är därför
 * tillverkarnas egna sidor. Det är själva poängen: **de beskriver tre olika
 * produkter, och hyllan säljer dem som en.**
 *
 * Samtliga URL:er kontrollerade 2026-08-04.
 */
/**
 * Smart termostat.
 *
 * Ovanligt för oss: här finns två riktiga provningar, och båda är med just för
 * vad de **inte** säger om besparingen. Ljud & Bild avstår från ett tal av
 * princip, Stiftung Warentest låser avsnittet bakom betalvägg, och de fem
 * tillverkarna fyller tomrummet med tal mellan 28 och 42 procent.
 *
 * Fraunhofer-rapporten är läst i original och står som `standard`, eftersom
 * den är en beställd simulering och inte en oberoende produktprovning.
 */
export const SMART_TERMOSTAT_SOURCES: Source[] = [
  {
    publisher: "Ljud & Bild",
    title: "Grupptest: 3 smarta radiatortermostater (2026)",
    url: "https://www.ljudochbild.se/test/smart-hem/3-smarta-radiatortermostater-2026/",
    market: "SE",
    kind: "test",
    note: 'Sidans viktigaste källa, och den är viktig för en mening som inte finns i den. Ola Larsson provade Netatmo Smart Radiator Valves, Aqara Radiator Thermostat W600 och Eve Thermo, publicerat 2026-02-18. Om besparingen skriver han: "Hur mycket pengar man kan spara på denna typ av individuell temperaturstyrning för varje rum i huset är inget som avhandlas i detta test, eftersom det skulle kräva ett test under väldigt lång tid, men sannolikt finns det pengar att spara." Det är den enda svenska redaktion som haft produkterna i handen, och den enda som avstår från en siffra. Testet sätter också förutsättningen rakt ut: "Har man vattenburen värme hemma är det enkelt att byta ut de befintliga termostaterna." Ingen vinnare koras; valet sägs bero på om man prioriterar wifi framför Matter, design eller ljudlöshet.',
  },
  {
    publisher: "Ljud & Bild",
    title: "Test: Tado Wireless Smart Radiator Termostat X Starter Kit",
    url: "https://www.ljudochbild.se/test/smart-hem/tado-wireless-smart-radiator-termostat-x-starter-kit/",
    market: "SE",
    kind: "test",
    note: 'Mikael Hansen, publicerat 2024-12-24. Två uppgifter härifrån väger tungt på sidan. Den första gäller adaptern: efter år som tado-användare skriver han att "de medföljande plastadaptrarna inte har varit av bästa kvalitet och därför inte har klarat trycket när termostaterna stängt och öppnat värmen. Resultatet har blivit att termostater har fallit av och landat på golvet medan värmen har varit helt uppskruvad – ibland på natten." Hans lösning är att köpa en metalladapter från en VVS-återförsäljare. Den andra gäller abonnemanget: funktionerna som får termostaterna att tänka själva ingår numera delvis i den årliga tjänsten Auto-Assist, och han kallar den "en riktig bromskloss som tyvärr luktar mer girighet än god service". Han rekommenderar ändå produkten starkt till den som inte redan har smarta termostater. Testet noterar också att tado själva anger 22 procent i genomsnitt.',
  },
  {
    publisher: "Stiftung Warentest",
    title: "Smarte Heizkörperthermostate im Test, test 9/2023",
    url: "https://www.test.de/Heizkoerperthermostat-Test-5115581-0/",
    kind: "test",
    note: 'Elva modeller labbprovade, 44 till 110 euro: sex fick gut, fyra befriedigend och en ausreichend. Fyra uppgifter är fritt läsbara och används här. "Leicht zu bedienen sind nur zwei", av elva. "Beim Frostschutz-Test patzte ein Gerät, bei Minusgraden kann das zu geplatzten Rohren führen." "Zwei Apps greifen Daten ab, die sie nicht zum Funktionieren brauchen." Och om ventilen: "Welches Thermostat das richtige ist, hängt nicht so sehr vom Heizkörper ab, die Anbieter liefern teils zahlreiche Adapter mit." ⚠️ Betygen per modell ligger bakom betalvägg och återges inte. Vi vet därför inte vilken av de elva som föll på frostskyddet, och gissar aldrig. Provade märken: AVM, Bosch, Danfoss, Eurotronic, Eve, Hama, Homematic IP, Netatmo, Shelly, Somfy och Tado. Tado-modellen är 2023 års, alltså V3+ och inte X-serien.',
  },
  {
    publisher: "Fraunhofer IBP",
    title: "IBP-Report 579 E (2022): The energy saving potential of an intelligent heating control system",
    url: "https://cdn.bfldr.com/607DGEMS/as/mtjrbvmqvfnhc36qwsmkbps5/EN_Fraunhofer_Study",
    kind: "standard",
    note: 'Grundkällan bakom talet som upprepas i hela kategorin, läst i original. Fyra saker står i rapporten och inte i marknadsföringen. Den är en beräkning och inte en mätning: "The study described here is based on transient calculations (TRNSYS 17)." Klimatet är tyskt: väderdata "is represented in this study by a Test Reference Year for Munich". Resultatet är ett spann och inte ett tal: systemet "can reduce the heating energy requirements … by 12–28 %". Och uppdragsgivaren är tillverkaren: sammanfattningen bygger på "a full report No. EER-021/2022/720 that can be requested from the client tado° GmbH". Referensfallet som besparingen räknas mot är ett hem där termostaterna står på konstant 20 °C hela dagen. Delsiffrorna i rapporten är också spann: närvarodetektering 13–23 procent, väderprognos 0,4–6, öppet fönster 1–12. Marknadsföringen citerar taket i varje spann.',
  },
  {
    publisher: "tado",
    title: "Scientifically proven: With tado° you save up to 28% energy when heating",
    url: "https://www.tado.com/en-gb/about/fraunhofer-study",
    kind: "standard",
    note: 'Tillverkarens egen redovisning av rapporten ovan, och den är ärligare än de flesta i kategorin. Talen stämmer mot originalet, och tado skriver själva att delsiffrorna inte får adderas: "the savings potentials of the different functions can\'t simply be added up, because they can influence each other." De publicerar dessutom sitt eget användarsnitt, 22 procent, vilket är lägre än rubriken. Det som inte framgår är att studien är en simulering med münchenklimat och att spannets golv är 12 procent.',
  },
  {
    publisher: "tado",
    title: "Which radiator valves are the Smart Radiator Thermostats compatible with?",
    url: "https://support.tado.com/en/articles/3482335-which-radiator-valves-are-the-smart-radiator-thermostats-compatible-with-do-i-need-an-adapter-to-mount-the-device",
    kind: "standard",
    note: 'Kategorins bästa adaptertabell, och den ligger på fel ställe. Uppdaterad 2025-10-07. Sex adaptrar ingår i förpackningen: Danfoss RA, RAV och RAVL, M28x1,5 för Comap, Herz, Terrier, Siemens och Olymp, samt Caleffi och Giacomini. Fyra ingår inte: Vaillant 30,5 mm, Oventrop M30x1,0, Ista M32x1,0 och Orkli M28x1,0. tado skriver också att produkten "is only compatible with thermostatic radiator valves" och friskriver sig för adaptrar de inte tillverkat själva. Ingenting av detta står i butikstexten, som nöjer sig med att termostaten "passar termostatventiler från en mängd olika tillverkare".',
  },
  {
    publisher: "Netatmo",
    title: "Which adaptor should I use to install my Smart Radiator Valve?",
    url: "https://helpcenter.netatmo.com/hc/en-us/articles/360015739059-Which-adaptor-should-I-use-to-install-my-Smart-Radiator-Valve",
    kind: "standard",
    note: 'Samma mönster som hos tado: full redovisning i hjälpcentret, ingenting i butiken. Netatmo skiljer uttryckligen på vad som följer med och vad som kostar extra. Ingår: M30x1,5, M28x1,5, M30x1, Giacomini, Danfoss RA23 och Danfoss RAVL. Säljs separat i tiopack: M28x1, Caleffi, Danfoss RAV34 och Pettinaroli PEM28x1,5. Artikeln beskriver dessutom hur man mäter gängan med en linjal, vilket är den enda praktiska anvisningen någon tillverkare i kategorin ger. Det Netatmo inte publicerar någonstans vi kunnat nå är underlaget för de 37 procent butikerna skriver ut.',
  },
  {
    publisher: "Aqara",
    title: "Radiator Thermostat E1, tillverkarens produktsida",
    url: "https://www.aqara.com/eu/product/radiator-thermostat-e1/",
    kind: "standard",
    note: 'Den enda tillverkaren i kategorin som skriver ut vad produkten **inte** fungerar med, och den uppgiften är värd mer än en adapter till. Ordagrant: "The E1 supports most popular radiator valve standards thanks to the following adapters included into the package: standard screw of M30*1.5mm as well as Danfoss RA, RAV, RAVL valves are supported. While it is only compatible with thermostatic valves, others such as manual, return temperature limiter (RTL) and monotube radiator systems are not supported." Enrörssystem är vanligt i svenskt flerbostadsbestånd från 1960- och 70-talen, och ingen annan tillverkare nämner det. Sidan anger också upp till ett års batteritid och frostskydd genom en inställd lägstatemperatur. Ingen besparingsprocent förekommer.',
  },
  {
    publisher: "Aqara",
    title: "Radiator Thermostat W600, tillverkarens produktsida",
    url: "https://www.aqara.com/en/product/radiator-thermostat-w600/",
    kind: "standard",
    note: 'Sex adaptrar namngivna på produktsidan i stället för i ett hjälpcenter: RA, RAV, RAVL, GIA för Giacomini, M28x1,5 och CAL för Caleffi, utöver den egna M30x1,5-fattningen. Frostskyddet är beskrivet med tal: värmen slås på automatiskt när temperaturen faller under 5 °C och återgår vid 8 °C. Ljudnivån anges till under 30 dB, vilket stämmer med Ljud & Bilds omdöme att den arbetar helt ljudlöst. ⚠️ Öppet fönster-funktionen kräver enligt samma sida en separat dörr- och fönstersensor och en temperaturskillnad på 3 °C, till skillnad från de flesta konkurrenter som känner av temperaturfallet själva. Tvåårig batteritid på två AA-celler. Ingen besparingsprocent förekommer.',
  },
  {
    publisher: "Danfoss",
    title: "Ally, artikel 014G2460 och 014G2420 i Danfoss egen butik",
    url: "https://store.danfoss.com/en/p/014G2460",
    kind: "standard",
    note: 'Två artikelnummer för samma termostat, och produkttitlarna hos Danfoss själva avgör vad de skiljer sig i. 014G2460 heter "Adapter type: RAV; RA; RAVL; M30" och kostar 760 kronor hos Proshop. 014G2420 heter "Adapter type: RA; M30" och kostar 890. Den dyrare passar alltså färre ventiler, och butiken saluför den under namnet Danfoss Ally Radiator Thermostat RA, vilket läses som den man ska ha om man har en RA-ventil. Danfoss lösningssida skiljer inte artiklarna åt utan säger att Ally "passar till Danfoss standardventiler (RA, RAV, RAVL) samt andra ventiler (M30x1.5)". Samma sida anger "Upp till 30% energibesparingar", medan butikstexten för samma system anger 23 procent.',
  },
  {
    publisher: "Fibaro",
    title: "Radiator Thermostat, tillverkarens produktsida",
    url: "https://www.fibaro.com/en/products/radiator-thermostat/",
    kind: "standard",
    note: 'Kategorins högsta besparingstal och kategorins tunnaste underlag, på samma sida. Rubriken lyder "Costs reduction ¹ of up to 42%", och fotnot 1 längst ned på sidan lyder i sin helhet: "Based on research by Fibar Group S.A." Alltså tillverkarens egen forskning, utan publicering, utan metod och utan länk. Samma sida ersätter ventillistan med ett annat procenttal: produkten "works with 98% of radiator types" tack vare adaptrar som följer med, och vilka de två procenten är står ingenstans. Två sakuppgifter är däremot användbara: batteriet är laddbart via en vanlig telefonladdare, och funktionen för öppet fönster finns enligt sidan bara i Z-Wave-versionen.',
  },
  {
    publisher: "Schneider Electric",
    title: "Wiser radiatortermostat CCTFR6100Z3, tillverkarens produktsida",
    url: "https://www.se.com/se/sv/product/CCTFR6100Z3/",
    market: "SE",
    kind: "standard",
    note: 'Den enda tillverkare som anger passformen på svenska och rakt av: "Kompatibel med Danfoss RA, RAV, RAVL och M30x1.5-ventiler." Zigbee, styrs via Wiser-appen, max 32 enheter i upp till 16 rum. ⚠️ Samma sida anger batteriet på två sätt, "batteri 2x AA" i produkttiteln och "Batteri 3V /LR03 AAA" i beskrivningen, och vi återger därför båda i stället för att välja åt läsaren. Produkten säljs hos Proshop under märket LK, men artikelnumret 3606482072589 är Schneider Electrics eget och leder till CCTFR6100Z3 hos Rexel.',
  },
  {
    publisher: "SONOFF",
    title: "Zigbee Thermostatic Radiator Valve TRVZB, dokumentation",
    url: "https://help.sonoff.tech/docs/trvzb",
    kind: "standard",
    note: 'Kategorins billigaste termostat, 361 kronor, och den enda som uttryckligen räknar upp vilka tredjepartshubbar den fungerar med: "Compatible with Zigbee 3.0 hubs such as SONOFF iHost, NSPanel Pro, ZB Bridge Pro, ZBDongle-P, and ZBDongle-E, as well as any Zigbee 3.0-compliant hubs." Det är motsatsen till en märkesbunden brygga och väger tungt på raden om oberoende. Om ventilen säger de bara "Fits standard M30 x 1.5mm radiator valves; includes adapters compatible with most heating systems and manufacturers", alltså en gänga och ett löfte, utan lista. Frostskydd anges: "Frost protection avoids pipe freezing and bursting."',
  },
  {
    publisher: "Eve Systems",
    title: "Eve Thermo, tillverkarens produktsida",
    url: "https://www.evehome.com/en/eve-thermo",
    kind: "standard",
    note: 'Den enda produkten i jämförelsen där tillverkaren gör oberoendet till själva säljargumentet: "No subscription, no registration, No Eve cloud, 100% privacy." Adaptrarna anges i förpackningsinnehållet, "Adapter Set (Danfoss RA, RAV, RAVL)". Frostskyddet finns och är namngivet: "built-in Valve Protection to protect against frost, you\'ll never have to worry again about your pipes freezing solid." Termostaten talar Thread och kräver en kompatibel hubb, vilket tillverkaren skriver ut i stället för att tona ner. Ingen besparingsprocent förekommer.',
  },
];

export const SMART_HEM_HUBB_SOURCES: Source[] = [
  {
    publisher: "Plejd",
    title: "Gateway GWY-01, tillverkarens produktsida",
    url: "https://www.plejd.com/sv-se/produkter/gwy-01",
    market: "SE",
    kind: "standard",
    note: 'Den tydligaste källan på sidan, och den som gör skillnaden mellan sorterna konkret. Plejd skriver att gatewayen "ansluter användarens Plejd-mesh till internet, vilket möjliggör fjärrstyrning och integration mot tredjepartstjänster". Den styr alltså enbart Plejd-produkter och förutsätter en befintlig Plejd-installation. Integrationerna går utåt: HomeKit, Google Home, Alexa, Homey och Verisure. Produkten kostar 899 kronor och står i butikens hubbkategori bredvid apparater som styr vilket märke som helst.',
  },
  {
    publisher: "Philips Hue",
    title: "Philips Hue och Matter",
    url: "https://www.philips-hue.com/sv-se/explore-hue/works-with/matter",
    kind: "standard",
    note: 'Finns med för det den inte säger. Butikstexten för Hue Bridge lovar att den "kan kopplas till enheter från flera tillverkare", vilket en köpare rimligen läser som att bryggan kan styra andra märken. Philips egen Matter-sida beskriver bara riktningen utåt: "Du kan ansluta till alla favoriter – Amazon Alexa, Apple Home och Google Assistant." Något besked om huruvida bryggan kan lägga till andra tillverkares Matter-enheter finns inte, varken ja eller nej. Sidan återger det som en saknad uppgift, eftersom det är vad det är.',
  },
  {
    publisher: "Athom",
    title: "Homey Pro, produktuppgifter hos återförsäljaren",
    url: "https://www.kjell.com/se/athom-homey-pro-2026-smarthubb-for-hela-hemmet-4-gb-ram-2026-p52065",
    market: "SE",
    kind: "standard",
    note: 'Den bredaste radiouppsättningen i kartläggningen: wifi, Zigbee 3.0, Z-Wave Plus, Bluetooth LE, Matter, Thread, infraröd och 433 MHz i samma låda. Två meningar avgör placeringen lika mycket som radiolistan: "Lokal bearbetning – fungerar även utan internet" och "Inget abonnemang krävs för grundfunktioner". Infraröd och 433 MHz är värda att notera separat, eftersom de når äldre utrustning som ingen modern standard täcker.',
  },
  {
    publisher: "Nabu Casa",
    title: "Home Assistant Green, produktuppgifter hos återförsäljaren",
    url: "https://www.kjell.com/se/nabu-casa-home-assistant-green-p88430",
    market: "SE",
    kind: "standard",
    note: 'Den enda plattformen i jämförelsen där oberoendet är själva produkten: "Grundfunktionen i Home Assistant är gratis och körs lokalt – du äger din data och kan styra hemmet även om internet ligger nere." Nabu Casa-abonnemanget är uttryckligen valfritt och köper fjärråtkomst, inte funktion. Z-Wave kräver en separat USB-sticka, vilket är en verklig extrakostnad och står i produkttexten. 69 kundbetyg är näst mest av hubbarna i jämförelsen.',
  },
  {
    publisher: "Aqara",
    title: "Hub M3, produktuppgifter hos återförsäljaren",
    url: "https://www.kjell.com/se/aqara-hub-m3-smarta-hem-controller-p57869",
    market: "SE",
    kind: "standard",
    note: 'Ensam i hela sortimentet om att skriva ut vad en Matter-controller gör: "Matter-controller – kan styra tredjepartsprodukter." Formuleringen är den enda i kategorin som rakt ut svarar på frågan om hubben når andra märken än sitt eget, och den är skälet till att sorten går att klassificera för den här produkten utan att tolka. Stöd för Zigbee, Bluetooth, Thread och Matter.',
  },
];

/**
 * Vattenfelsbrytare. Underlag i .agent/research/vattenfelsbrytare.md.
 *
 * Kategorin är en av få på sajten med en **riktig oberoende provning**, och
 * den enda där provningen bekostats av ett försäkringsbolags forskningsfond.
 * Två av källorna nedan är därför `kind: "test"`, vilket är ovanligt här.
 *
 * Notera att fackpressen bär det hårdare talet. Pressmeddelandet säger att två
 * av åtta godkändes; Svensk Byggtjänst har intervjun där det framgår att noll
 * klarade sig i första omgången och att tillverkarna fick åtgärda och prova om.
 * Det är samma mönster som på /luftfuktare, där butikens "bäst i test" visade
 * sig komma ur ett test som inte utsåg någon vinnare: läs alltid ett steg
 * längre in än pressmeddelandet.
 */
export const VATTENFELSBRYTARE_SOURCES: Source[] = [
  {
    publisher: "Länsförsäkringar",
    title: "Stort test: Få vattenfelsbrytare godkända",
    url: "https://www.lansforsakringar.se/stockholm/privat/om-oss/press-media/pressmeddelanden/381372/",
    date: "2022-02-10",
    market: "SE",
    kind: "test",
    note: 'Länsförsäkringars Forskningsfond lät RISE prova åtta vattenfelsbrytare mot den standard de ska uppfylla. Två godkändes: Vatette från Villeroy & Boch Gustavsberg och WaterFuse Villa Control från Tollco. Bolagets vattenskadespecialist: "Vi uppmanar våra kunder att installera vattenfelsbrytare som är typgodkända." Provningen är från 2022 och säger ingenting om vad som är godkänt i dag.',
  },
  {
    publisher: "Svensk Byggtjänst",
    title: "Två vattenfelsbrytare godkändes i stort test",
    url: "https://byggkoll.byggtjanst.se/artiklar/2022/februari/tva-vattenfelsbrytare-godkandes-i-stort-test/",
    date: "2022-02-16",
    market: "SE",
    kind: "test",
    note: 'Fackpressens version, och den innehåller det pressmeddelandet utelämnar. Mari Sparr på Länsförsäkringars Forskningsfond: "Vi var färdiga med testningen redan i oktober men då klarade sig tyvärr ingen av produkterna. Vi fick ge tillverkarna lite mer tid och en chans att åtgärda de delar som de inte klarat." Namnger också provmetoden, SP-Metod 5314 Provning av vattenfelsbrytare för villor och enskilda lägenheter, och anger att Länsförsäkringar inte ställer något krav på vattenfelsbrytare.',
  },
  {
    publisher: "Säker Vatten",
    title: "Branschregler Säker Vatteninstallation 2026:1",
    url: "https://sakervatten.se/branschregler/branschregler-saker-vatteninstallation-20261/",
    date: "2026",
    market: "SE",
    kind: "standard",
    note: 'Gäller sedan 1 januari 2026. Bland de största regelförändringarna: "Det ska finnas ett aktivt skydd mot vattenskador i kök. Det ska finnas en fuktsensor som är kopplad till en läckagebrytare, vattenfelsbrytare eller vattenlarm. Produkterna ska vara typgodkända enligt en ny provmetod." Arbete med bygglov beviljat före årsskiftet får följa den tidigare utgåvan 2021:2.',
  },
  {
    publisher: "Säker Vatten",
    title: "Ändringar och nyheter i Branschregler Säker Vatteninstallation 2026:1",
    url: "https://sakervatten.se/wp-content/uploads/2025/10/branschregler-2026-samlade-andringar-lagupplost.pdf",
    date: "2025-10",
    market: "SE",
    kind: "standard",
    note: 'Det officiella ändringsdokumentet, med paragrafnummer. Ordagrant: "Vattentät insats eller tråg ska ha fuktsensor som är kopplad till läckagebrytare, vattenfelsbrytare eller vattenlarm som bryter tappvattentillförseln eller larmar om läckage. (4.3 och 4.3.1)" Kravet hänger på insatsen eller tråget, inte på köket i allmänhet, vilket är snävare än hur handeln återger det.',
  },
  {
    publisher: "Säker Vatten",
    title: "Aktiva skydd",
    url: "https://sakervatten.se/vvs-produkter/aktivaskydd/",
    date: "2026-07-02",
    market: "SE",
    kind: "standard",
    note: 'Namnger certifieringsregeln: läckagebrytare, vattenfelsbrytare eller vattenlarm "ska vara godkända enligt CR 139". Säker Vatten godkänner inte produkter själva utan accepterar monteringsanvisningar, och hänvisar frågor om provning och typgodkännande till RISE.',
  },
  {
    publisher: "VVS-Forum",
    title: "Hur vet jag om vattenfelsbrytaren är godkänd?",
    url: "https://www.vvsforum.se/hur-vet-jag-om-vattenfelsbrytaren-ar-godkand/",
    date: "2024-08-07",
    market: "SE",
    kind: "standard",
    note: 'Pierre Lundborg på Säker Vatten svarar en installatör som inte vet om godkända vattenfelsbrytare finns: "Det stämmer att Säker Vatten inte godkänner produkter men däremot accepterar Säker Vatten monteringsanvisningar och då ingår det att vi kontrollerar att produkten är Typgodkänd. Vattenfelsbrytare ska vara Typgodkända enligt SP-metod 5314." Att frågan ställs av en yrkesman säger något om hur svårt det är att få svar.',
  },
  {
    publisher: "VVS-Forum",
    title: "Läckagebrytare och vattenfelsbrytare, är det samma sak?",
    url: "https://www.vvsforum.se/lackagebrytare-och-vattenfelsbrytare-ar-det-samma-sak/",
    date: "2025-02",
    market: "SE",
    kind: "standard",
    note: "Skiljer de två produkttyperna: vattenfelsbrytaren mäter vattentryck med tidsintervall och sitter centralt, och i flerfamiljshus stängs vattnet av för alla brukare vid en stängning. Anger också att typgodkända läckagebrytare med sensorer var på väg under året, vilket är skälet till att den här sidan rankar båda typerna.",
  },
  {
    publisher: "Tollco",
    title: "Tollcos vattenlarm nu RISE-certifierade enligt CR 139",
    url: "https://tollco.se/nyheter/rise-certifierade-vattenlarm/",
    market: "SE",
    kind: "standard",
    note: "Certifikat C901472 enligt CR 139, som utöver produktens funktion även omfattar tillverkningskontroll. Gäller bolagets vattenlarm och inte deras vattenfelsbrytare, vilket är värt att hålla isär när ett fabrikat marknadsförs som certifierat.",
  },
  {
    publisher: "RISE",
    title: "Typgodkännande C900737, LK CubicSecure Vattenfelsbrytare",
    url: "https://www.lksystems.se/download/1831/C900737%202024-06-13.pdf",
    date: "2024-06-13",
    market: "SE",
    kind: "standard",
    note: "Typgodkännande med beslut om tillverkningskontroll, utfärdat till LK Systems AB. Beskriver produkten som utrustad med flödesmätare och tryckmätare, med integrerad kulventil som stänger vid avvikande flöde, och avsedd för villor, radhus eller lägenheter vid högst 1,0 MPa. Tillverkarens egenkontroll övervakas av RISE enligt kontrollanvisning ref nr 900737. Det här är kategorins starkaste enskilda belägg och det ligger fritt nedladdningsbart hos tillverkaren.",
  },
  {
    publisher: "RISE",
    title: "Typgodkännande SC0056-15, VATETTE Vattenfelsbrytare",
    url: "https://www.vatette.se/fileadmin/uploads/Vatette/Documents/Type_approvals/Rise/SC0056-15.pdf",
    date: "2022-01-31",
    market: "SE",
    kind: "standard",
    note: "Utgåva 4, utfärdad till Villeroy & Boch Gustavsberg AB. Samma konstruktion som ovan, men med invändig G3/4 in och Vatette Dy22 klämringskoppling ut, alltså bunden till kopparrör. Anger också det som ingen butikstext nämner: maximal vattentemperatur 60 °C.",
  },
  {
    publisher: "RISE",
    title: "Typgodkännande C901455, Vatette Läckagebrytare",
    url: "https://www.vatette.se/fileadmin/uploads/Vatette/Documents/Type_approvals/Rise/C901455.pdf",
    date: "2026-04-17",
    market: "SE",
    kind: "standard",
    note: "Kategorins färskaste typgodkännande, och skälet till att den här sidan rankar läckagebrytare. Certifikatet namnger fyra artiklar med RSK-nummer, vilket gör att en köpare kan kontrollera exakt vilken variant som omfattas i stället för att lita på ett varumärke. Anger också att brytaren fungerar utan Wi-Fi och app, via kontrollpanelen.",
  },
  {
    publisher: "Vatette",
    title: "Typgodkännanden inom System Vatette",
    url: "https://www.vatette.se/planera-montera/typgodkannanden",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens samlade certifikatbibliotek, en PDF per produkt. Ovanligt öppet för branschen och skälet till att vi kan skilja på vad som är belagt och vad som bara påstås. Beskriver också vad ett typgodkännande är: ett nationellt och frivilligt system.",
  },
  {
    publisher: "Tollco",
    title: "Nya regler mot vattenskador i kök 2026",
    url: "https://tollco.se/regelverk/",
    market: "SE",
    kind: "standard",
    note: 'Namnger båda certifieringsreglerna, CR 057 för läckageskydd åt vitvaror och bänkskåp och CR 139 för läckagebrytare och vattenlarm, och anger att ett typgodkännande gäller i fem år. Skriver samtidigt att "försäkringsbolagens villkor är direkt kopplade till" reglerna, vilket är tillverkarens formulering och står mot Länsförsäkringars Forskningsfond, som sagt att bolaget inte ställer något krav.',
  },
  {
    publisher: "Vattenskadecentrum",
    title: "Så mycket kostar vattenskadorna i Sverige",
    url: "https://www.vattenskadecentrum.se/nyheter/sa-mycket-kostar-vattenskadorna-i-sverige",
    market: "SE",
    kind: "standard",
    note: "Branschens egen skadestatistik, och den enda rimliga jämförelsepunkten för vad ett skydd får kosta. Snittkostnad 49 700 kronor per skada, självrisk 3 440 till 10 000 och åldersavdrag 9 700 till 26 100 utöver det.",
  },
  {
    publisher: "Länsförsäkringar",
    title: "Rabatt på villaförsäkringen med vattenfelsbrytare",
    url: "https://www.lansforsakringar.se/norrbotten/privat/om-oss/erbjudanden/rabatt-pa-villaforsakringen-med-vattenfelsbrytare/",
    market: "SE",
    kind: "standard",
    note: "Tio procents rabatt på villa- och fritidshusförsäkringen vid godkänd vattenfelsbrytare, mot uppvisat installationsintyg. Villkoren sätts av respektive länsbolag, så nivån kan skilja sig mellan län.",
  },
  {
    publisher: "Folksam",
    title: "Förebygg vattenskada och få rabatt",
    url: "https://www.folksam.se/forsakringar/rabatter-och-formaner/forebygg-vattenskada",
    market: "SE",
    kind: "standard",
    note: "Tio procent på villa- eller fritidshusförsäkringen, men bara med godkänd vattenfelsbrytare och underlägg under vitvaror och diskbänk. Bolaget anger inte vattenlarm som rabattgrundande.",
  },
];

/**
 * Nyckelskåp.
 *
 * Kategorins underlag är ovanligt bra och ovanligt outnyttjat: ett ackrediterat
 * institut har provat produkterna, rapporten ligger gratis på nätet i sin
 * helhet, och ingen av de fem svenska jämförelsesajter som rankar på ordet
 * nämner den. Samtliga URL:er hämtade och lästa i original 2026-08-05.
 */
export const NYCKELSKAP_SOURCES: Source[] = [
  {
    publisher: "RISE Research Institutes of Sweden",
    title: "Provning av nyckelskåp, rapport P115210",
    url: "https://www.villaagarna.se/contentassets/a90045292c544db0a96a8c6bac14c345/p115210_rapport-rise-nyckelskap-2022-11.pdf",
    date: "2022-11-07",
    market: "SE",
    kind: "test",
    note: 'Kategorins enda riktiga labbprovning, utförd på uppdrag av Villaägarnas Riksförbund och läst i sin helhet: sex sidor rapport och femton sidor bilaga med foton. Provad 2022-06-16 vid RISE Tillämpad Mekaniks laboratorium i Borås enligt SS-EN 1630:2021, nivå RC2 och RC3. Fyra skåp, samtliga forcerade. Med kofot mot infästningen lossnade Master Lock 5441 på 16 sekunder, Masunt 520 M på 23, ABUS 787 C på 35 och HMF 2030-11 på 1 minut och 15. Det snabbaste angreppet i hela rapporten står i §4.6: åtta slag med en 700 grams snickarhammare öppnade Master Lock 5441 på nio sekunder, och hammaren ingår inte i standardens verktygslistor utan lades till som en objektsspecifik svag punkt. Rapporten skriver också rakt ut att SS-EN 1630 inte omfattar nyckelskåp, vilket är skälet till att inget skåp här kallas RC2-klassat.',
  },
  {
    publisher: "Villaägarnas Riksförbund",
    title: "Nyckelskåp inger falsk trygghet",
    url: "https://www.villaagarna.se/radgivning-och-tips/produktgranskning/artiklar/nyckelskap-inger-falsk-trygghet/",
    market: "SE",
    kind: "test",
    note: 'Uppdragsgivarens egen sammanfattning av provningen ovan, och den som gör slutsatsen användbar. Chefsjuristen Ulf Stenberg: "Vårt test visar att nyckelskåpen håller låg säkerhet och ger en falsk trygghet. Om du använder ett sådant skåp, förvara inte nycklar och annan värdefull egendom där längre tid än nödvändigt." Rådet därefter, att köpa ett säkerhetsklassat nyckelskåp i stället, är skälet till att köpguiden tar upp vad ett sådant kostar: de finns, men de börjar på 5 495 kronor och rymmer 42 nycklar.',
  },
  {
    publisher: "Master Lock Europe",
    title: "Select Access Smart 5441EURD, tillverkarens produktblad",
    url: "https://cdn.masterlock.com/masterlock/resources/documents/pdf/catalogues/product-sheets/5441EURD_Select-Access-SMART-Product-Sheet_EN.pdf",
    kind: "standard",
    note: 'Enda produktbladet i jämförelsen som anger både kapslingsklass och temperaturspann: IP 55 mot saltdimma, väderpåverkan, korrosion och vattenstänk, och funktion från -40 °C till +50 °C. Bladet anger också zinkkropp "for a greater resistance against attacks" och ett dubbelt låssystem "for a greater resistance against lever effects". Mot RISE:s nio sekunder med hammare är det två påståenden som är värda att läsa bredvid varandra. Mått utvändigt 12,1 x 7,6 x 7 cm, invändigt 8,9 x 6,4 x 4,4 cm, vikt 1,02 kg, CR123-batteri med angiven livslängd på två år och möjlighet att brygga med ett 9-voltsbatteri utifrån.',
  },
  {
    publisher: "ABUS",
    title: "KeyGarage 787, tillverkarens produktsida",
    url: "https://www.abus.com/se/Konsument/KeyGarage-Nyckelrutor/787-KeyGarage",
    kind: "standard",
    note: "Källan som binder RISE:s provobjekt till en produkt som går att köpa. EAN 4003318463310 är samma nummer som butiken anger för den mekaniska 787:an, och rapportens Bild 5 visar fyra mekaniska kodhjul, alltså inte den elektroniska Smart-BT-modellen. Härifrån kommer också lucka i tryckgjuten zink, plats för 20 nycklar eller 14 kort, fyrsiffrig inställbar kod, 80 x 120 x 45 mm och 683 gram. ABUS anger montering i skyddad utomhusmiljö, vilket är det närmaste ett väderbesked som finns för modellen.",
  },
  {
    publisher: "ABUS",
    title: "KeyGarage 707, tillverkarens produktsida",
    url: "https://www.abus.com/se/Konsument/KeyGarage-Nyckelrutor/707-KeyGarage",
    kind: "standard",
    note: "Underlaget för den billigaste produkten i jämförelsen: aluminiumhölje, plats för cirka 7 nycklar eller 4 plastkort, fyrsiffrig kod som ställs in med kodhjul, 88 x 120 x 39 mm och 502 gram. Också här anger tillverkaren väggmontering inomhus eller i skyddat område utomhus, vilket är samma begränsning som för 787:an och värt att väga in innan skåpet sätts på en fasad utan tak över.",
  },
  {
    publisher: "Svensk Försäkring",
    title: "FTR 1028 Beloppsgränser i värdeskåp, utgåva 2",
    url: "https://www.svenskforsakring.se/globalassets/forsakringstekniska-rekommendationer/ftr-1028-vardeskap.pdf/",
    date: "2016-10-03",
    market: "SE",
    kind: "standard",
    note: "Med för att hålla isär tre standarder som blandas ihop i kategorin. Dokumentet slår fast att SS-EN 1143-1 gäller värdeskåp och styr vilka belopp ett försäkringsbolag rekommenderar, från 50 000 kronor för grade 0 och uppåt, och att den svenska standarden SS 3492 för säkerhetsskåp ersattes av SSF 3492 år 2015 med identiska krav och provningsmetoder. Myndigheter refererar till SSF 3492 för vapenförvaring och förvaring av hemlig handling. Ingen av standarderna gäller en nyckelbox för några hundra kronor, vilket är skälet till att köpguiden tar upp saken.",
  },
];

/**
 * Källor för /usb-c-laddare.
 *
 * ⚠️ Attributionen är kategorins största fälla. Den provning som citeras är
 * **Testaankoops**, inte Stiftung Warentests. Warentest skriver i löptexten att
 * "unsere belgischen Partner von Testaankoop" utfört den, och bekräftar det i
 * ett redaktionssvar i kommentarsfältet 2026-03-18: "Zum einen ist der Test
 * nicht von uns, sondern wir berichteten über den Test der belgischen
 * Kollegen." Båda ligger med, i den ordningen, och Warentest är märkt som
 * referat.
 */
export const USB_C_KABEL_SOURCES: Source[] = [
  {
    publisher: "Testfakta",
    title: "Dyraste laddkabeln sämst",
    url: "https://www.testfakta.se/sv/teknik/article/dyraste-laddkabeln-samst",
    date: "2020-02-24",
    market: "SE",
    kind: "test",
    note: 'Kategorins enda oberoende provning, och den enda källa här som mätt något. Testfakta lät tyska laboratoriet PZT GmbH prova tolv laddkablar, sex med Lightning och sex med USB-C, och betalade själva för provningen. Metoden är publicerad och det är ovanligt: kabeln spändes fast på en roterbar balk med en vikt på 150 gram i andra änden, balken vred kabeln 90 grader åt vardera hållet, och funktionen provades efter 1 000, 2 500, 3 500 och 5 000 böjningar. Båda ändarna provades och den sämsta av dem rapporterades, eftersom en kabel inte är starkare än sin svagaste punkt. Testfakta skriver själva att 150-gramsvikten simulerar milda vardagliga belastningar och att det är något annat än att rycka loss en sladd som fastnat. Resultatet är sidans mest citerade: den dyraste kabeln i provningen, Cellularline LongLife från Circle K för 240 kronor, gick sönder redan under de första 1 000 böjningarna och fick 1 av 10, medan IKEA LILLHULT för 50 kronor tog sig igenom hela cykeln utan skada och fick 10. Belkin, Clas Ohlsons Exibel och Samsung fick också 10; Kjells Linocell USB-C 3.0 fick 8 med synliga förslitningar i höljet. Resultattabellen ligger öppet som PDF. ⚠️ Provningen är från februari 2020 och samtliga sex USB-C-kablar är USB-A-formen, alltså USB-A till USB-C. Den här sidan rankar bara USB-C till USB-C, så noll av de rankade kablarna är provade. Därför finns inget kriterium för testomdöme, och inget resultat härifrån knyts till någon rankad produkt.',
  },
  {
    publisher: "Europeiska unionen",
    title:
      "Direktiv (EU) 2022/2380 om ändring av direktiv 2014/53/EU, den gemensamma laddaren",
    url: "https://eur-lex.europa.eu/legal-content/SV/TXT/HTML/?uri=CELEX:32022L2380",
    date: "2022-11-23",
    kind: "standard",
    note: 'Läst i svensk språkversion i sin helhet, och omläst med kabeln som sökbegrepp. Bilaga Ia del I punkt 2 ställer två krav och båda gäller apparaten: punkt 2.1 att den ska ha ett don av USB typ C enligt EN IEC 62680-1-3:2021, punkt 2.2 att den ska "kunna laddas med kablar som uppfyller standarden EN IEC 62680-1-3:2021". Standardens svenska titel är "Gränssnitt för seriebuss för datakommunikation (USB) – Del 1–3: Gemensamma komponenter – Specifikation för kabel och anslutningsdon USB Typ C®", alltså en kabelstandard namngiven i svensk lagtext. Ingenting i direktivet kräver att en kabel som säljs fristående uppfyller den. Artikel 47, ny punkt 3, ålägger kommissionen att senast den 28 december 2026 lägga fram en rapport om effekterna av att kunna köpa radioutrustning "utan laddningsenhet och utan kabel", vid behov åtföljd av ett lagförslag om obligatoriskt separat försäljning av laddningsenheter och kablar. Skälstexten säger att kommissionen bör överväga att utvidga kravet till att omfatta kablar. Skälstexten bekräftar också 240-wattsgränsen: specifikationen för USB typ C har anpassats så att kraven omfattar "anslutningsdon och kablar så att de får stöd upp till 240 watt". ⚠️ Rapporten är en skyldighet att utreda, inte ett beslut att lagstifta.',
  },
  {
    publisher: "USB Implementers Forum",
    title: "Product Search, Certified Product List",
    url: "https://www.usb.org/products",
    kind: "standard",
    note: "USB-IF:s publika lista över produkter som certifierats för att bära USB-logotypen, med som källa för vad en certifiering faktiskt betyder och vad den inte kan användas till. Fyra uppgifter på sidan avgör det: listorna underhålls av medlemsföretagen själva och USB-IF friskriver sig från ansvar för innehållet, sökningen omfattar bara produkter som klarat certifieringsprogrammet, den publika vyn visar som standard bara det som certifierats de senaste två åren, och USB-IF:s eget råd när en produkt saknas är att kontakta tillverkaren. ⚠️ Konsekvensen är att en frånvaro i listan inte bevisar något, och vi skriver därför aldrig att en kabel saknar certifiering. Vi återger vad säljaren skriver ut. ⚠️ Integratörslistan, som är den fullständiga, är förbehållen medlemmar: cms.usb.org/integrators-list leder till USB-IF:s inloggning.",
  },
  {
    publisher: "heise / c't",
    title: "Kabel testen: So gut ist Ihr USB-C-Kabel wirklich",
    url: "https://www.heise.de/ratgeber/Kabel-testen-So-gut-ist-Ihr-USB-C-Kabel-wirklich-11274048.html",
    date: "2026-06-30",
    market: "DE",
    kind: "test",
    note: "Teknisk genomgång av hur man kontrollerar en kabel man redan äger, av Rudolf Opitz i c't. Ingen rankning, och därför ingen betygsgrund, men den bästa förklaringen vi hittat av varför två likadana kontakter döljer olika produkter. De uppgifter vi använder i köpguiden kommer härifrån: en USB 2.0-kontakt har 4 kontakter, USB 3.2 har 9 och USB-C har 24 stift, och eftersom USB-C-kontakten är symmetrisk måste många ledare finnas i dubbel uppsättning. Tillverkarna sparar genom att inte koppla alla kontakter, och i laddkablar utgår ofta de snabba datakanalerna, alltså åtta ledare färre. Billiga laddkablar saknar dessutom e-markerchipet som krävs för höga laddeffekter. Artikelns egen slutsats är att kabeltjocklek är ett indicium på en fullt kopplad kabel men aldrig ett bevis. ⚠️ heise har flera renodlade kabeltester bakom betalvägg, bland annat ett om kablar från tre meters längd. De är inte lästa och refereras inte.",
  },
  {
    publisher: "Anker",
    title: "Anker USB-C to USB-C Cable (240W, Upcycled-Braided), A82E2",
    url: "https://www.anker.com/eu-en/products/a82e2",
    note: 'Tillverkarens egen europeiska produktsida, med av två skäl. Den anger både "480 Mbps data transfer" i produkttexten och "Data Transfer Protocols: USB2.0" i artikeldatan för A82E2, vilket är de uppgifter vi använder: Amazons svenska specifikationstabell för samma artikel anger i stället 480 gigabyte per sekund, en enhet som inte finns. ⚠️ Ankers amerikanska adress för samma produkt omdirigerar en nordisk besökare till ankernordics.com, så den går inte att citera. Och den visar spridningen i tillverkarens egna böjtal, som är skälet till att sidan inte har något hållbarhetskriterium: över Ankers sortiment står 5 000, 10 000, 20 000, 25 000, 35 000 och 300 000 böjningar, det sista marknadsfört som "100-Year Bend Durability". Ingen metod publiceras för något av talen, och de går därför inte att jämföra vare sig med varandra eller med Testfaktas provning.',
  },
];

export const USB_C_LADDARE_SOURCES: Source[] = [
  {
    publisher: "Testaankoop",
    title: "Wat zijn de beste USB-C opladers? Dit zegt onze test",
    url: "https://www.test-aankoop.be/hightech/universele-usb-c-oplader/nieuws/beste-usb-c-opladers",
    date: "2026-04-14",
    market: "BE",
    kind: "test",
    note: 'Kategorins enda riktiga labbprovning och den enda källa här som mätt något. Runt fyrtio universella USB-C-nätaggregat i tre effektklasser: 10 modeller på 50–100 W, 18 på 65 W och 11 på 35–45 W. Fyra kriterier vägs till en slutpoäng: prestanda, användbarhet, egenskaper och säkerhet. Under prestanda mättes både in- och uteffekt, verkningsgrad, maxeffekt på en port, maxeffekt över alla portar, tomgångsförbrukning, kortslutningsström och maxtemperatur. Talen vi använder i köpguiden kommer härifrån: verkningsgrad 85–91 %, högsta uppmätta effekt på en enskild port 113 W (OtterBox), typiskt cirka 90 W för 100 W-klassen, högst 48 W på andra porten i hela fältet, temperaturer mellan 46 och 82 °C utan att säkerhetsgränsen överskreds, och att exakt en laddare av alla stödde PD 3.1. Säkerhetsslutsatsen är värd att läsa ordagrant: inga säkerhetsproblem hittades i något exemplar, samtliga bar CE-märkning, och därav att man inte behöver välja de stora märkena för att köpa tryggt. ⚠️ Källan är inte konsekvent om antalet: samma sida skriver både "in totaal 40" och "bijna 40", klassindelningen summerar till 39, dossiersidan säger 34 och jämförarsidan "meer dan 20". Vi skriver därför runt fyrtio och aldrig ett exakt tal. ⚠️ Källan motsäger också sig själv om märkeffekten: metodavsnittet säger att alla angivna effekter uppnåddes och i de flesta fall överskreds med 5 %, medan produktposten för Belkin BoostCharge Pro 3 anger 87 W mot utlovade 100. Båda uppgifterna återges.',
  },
  {
    publisher: "Stiftung Warentest",
    title: "Universal-Ladegeräte im Test: Eines für alles",
    url: "https://www.test.de/USB-C-Ladegeraete-im-Test-Ein-Ladegeraet-fuer-alle-Faelle-6169942-0/",
    date: "2026-05-02",
    market: "DE",
    kind: "test",
    note: '⚠️ Referat, inte egen provning. Warentest rapporterar om Testaankoops test ovan och skriver det själva i ingressen. Med här ändå av tre skäl. Den namnger vinnarna per effektklass med tyska riktpriser, vilket den nederländska sidan inte gör lika samlat: Xtorm 100W GaN² Ultra XEC100 för knappt 66 euro i 100 W-klassen, Hama Universal USB-C Notebook Power för 50 euro i 65 W-klassen, Xtorm GaN² Ultra XEC035 för runt 30 euro i 45 W-klassen, och belgarnas pristips IKEA SJÖSS 45 W för runt 15 euro. Den är dessutom öppen och inte betald, till skillnad från Warentests egna tester. ⚠️ Och den formulerar avbuntningsregeln löst: "Zudem müssen sie ohne eigenes Netzteil angeboten werden" om bärbara datorer. Direktivet kräver att konsumenten ska erbjudas valet att köpa utan laddare, inte att laddare måste utelämnas. Vi återger därför regeln ur direktivet och inte ur referatet.',
  },
  {
    publisher: "Europeiska unionen",
    title:
      "Direktiv (EU) 2022/2380 om ändring av direktiv 2014/53/EU, den gemensamma laddaren",
    url: "https://eur-lex.europa.eu/legal-content/SV/TXT/HTML/?uri=CELEX:32022L2380",
    date: "2022-11-23",
    kind: "standard",
    note: 'Sidans bärande källa, läst i svensk språkversion i sin helhet. Bilaga Ia del I punkt 1 räknar upp den radioutrustning kraven gäller: mobiltelefoner, datorplattor, digitalkameror, hörlurar, headset, handhållna spelkonsoler, bärbara högtalare, läsplattor, tangentbord, datormöss, bärbara navigeringssystem, öronsnäckor och, som punkt 1.13, bärbara datorer. Punkt 2.1 kräver att *apparaten* har ett don av USB typ C enligt EN IEC 62680-1-3:2021. Ingenting i direktivet ställer krav på en fristående laddare, vilket är hela sidans utgångspunkt. Punkt 3 sätter tröskeln för när USB PD blir obligatoriskt: laddning "vid spänning högre än 5 V eller ström högre än 3 A eller effekt högre än 15 W". Punkt 3.2 är den som skyddar tredjepartsladdaren genom att kräva att eventuella ytterligare laddningsprotokoll låter USB PD fungera fullt ut "oavsett vilken laddningsenhet som används". Del IV beskriver etiketten som ska ange "YY W", alltså den effekt en laddare minst måste ge för att apparaten ska nå högsta laddhastighet, plus förkortningen "USB PD"; artikel 10.8 kräver att den visas på förpackningen och vid distansförsäljning nära prisuppgiften. Artikel 2 anger tillämpning från 28 december 2024 för punkterna 1.1–1.12 och från 28 april 2026 för punkt 1.13. ⚠️ Datumet 28 december 2025 förekommer i texten men gäller kommissionens första utvärderingsrapport, inte när kraven börjar tillämpas.',
  },
  {
    publisher: "Testaankoop",
    title: "Universele oplader: USB-C wordt verplicht voor laptops",
    url: "https://www.test-aankoop.be/hightech/universele-usb-c-oplader/dossier/usb-c-lader",
    market: "BE",
    kind: "standard",
    note: "Testaankoops egen genomgång av regelverket, med som oberoende läsning av samma direktiv. Bekräftar att kravet gäller sedan 28 december 2024, vilket är det datum en av de svenska jämförelsesajterna anger fel. ⚠️ Källan skriver själv att bärbara datorer omfattas från 26 april 2026; direktivet säger 28 april. Ingen av de sekundära källorna återger regeln helt korrekt, vilket är skälet till att sidan citerar direktivet direkt.",
  },
  {
    publisher: "M3 (IDG)",
    title: "Stort test: Supersnabba gan-laddare (usb-c) för dina prylar",
    url: "https://www.m3.se/article/1860723/snabbladdare-gan.html",
    date: "2023-10-24",
    market: "SE",
    kind: "test",
    note: "Det enda svenska jämförande testet i kategorin, av Petter Ahrnstedt, med betyg per modell för nio GaN-laddare från Anker, Satechi, Ugreen och Unisynk. ⚠️ Med som bakgrund och aldrig som betygsunderlag, av två skäl. Det är två år och nio månader gammalt, vilket i den här kategorin räcker för att modellerna ska ha bytts ut. Och metoden är bruksprov, inte labbmätning: texten beskriver att systeminställningar visar 65 watt och att laddaren är ljummen efter en timme, inte instrumenterad mätning av verkningsgrad eller effekt per port. Vi skriver därför aldrig att M3 mätt något. Det testet ändå bidrar med är den svenska förklaringen av vad galliumnitrid är och varför laddaren blir mindre, samt en prisbild från 2023 som visar hur snabbt kategorin rört sig.",
  },
];

/**
 * Garageportsöppnare.
 *
 * ⚠️ Kategorin har **ingen oberoende provning**. Varken Råd & Rön, Ljud & Bild
 * eller Stiftung Warentest har provat portöppnare, och de tyska träffarna är
 * `Vergleich`-sidor utan egen provning. Ingen källa nedan bär därför
 * `kind: "test"`, och sidan saknar testomdömekriterium av samma skäl som
 * /utomhustimer, /vattenlarm och /luftrenare.
 *
 * Tyngdpunkten ligger i stället på tillverkarnas egna bruksanvisningar, som är
 * tier A och som visar sig innehålla det butikerna inte skriver ut: en
 * kraftgräns för stängning, vilka standarder produkten åberopar, och i ett fall
 * en dragkraft i newton som butiken gjort om till newtonmeter.
 */
export const GARAGEPORTSOPPNARE_SOURCES: Source[] = [
  {
    publisher: "Chamberlain",
    title: "Garageportöppnare ML700, ML750 och ML850, bruksanvisning 114A2806B-S",
    url: "https://www.clasohlson.com/medias/sys_master/9542690930718.pdf",
    market: "SE",
    kind: "standard",
    note: 'Kategorins viktigaste dokument, och det Clas Ohlson själva serverar för sin ML700. Manualen är Chamberlains egen och namnger deras tillbehör, vilket bekräftar att ML700 är en Chamberlain. Avsnitt 28 anger den enda kraftgräns vi hittat som är satt för att skydda någon: "Kraften som uppstår vid den stängande portkanten får inte överstiga 400N (40kg). Om stängningskraften ställs in på över 400N måste samtidigt \'Protector System\' installeras." Protector System är fotocellen, och den ligger i avsnitt 30 som tillbehör 770EML, alltså inte i lådan. Samma avsnitt: "Vi rekommenderar verkligen detta system för garageägare som har småbarn." Avsnitt 27 ger två prov ägaren kan göra själv: porten ska reversera mot ett 40 mm högt hinder, och testet ska upprepas en gång i månaden, samt att en 20 kg vikt på porten får höja den högst 500 mm. Manualen åberopar ZH1/494 och VDE 0700, alltså äldre beteckningar, och nämner inte EN 12453.',
  },
  {
    publisher: "Jula",
    title: "Garageportsöppnare 377011, bruksanvisning och EU-försäkran om överensstämmelse",
    url: "https://www.jula.se/catalog/bygg-och-farg/beslag-och-byggvaror/port-garagebeslag/garageportoppnare/garageportsoppnare-377011/",
    date: "2021-03-05",
    market: "SE",
    kind: "standard",
    note: 'Försäkran om överensstämmelse, utfärdad av Jula AB i Skara "på tillverkarens eget ansvar" och undertecknad av Fredrik Bohman, anger produkten som "230V, 100W, 700N". Alltså 700 newton dragkraft. Butikens egen produktsida anger i stället "Vridmoment 700 Nm" och bär talet i produktnamnet, vilket är en annan storhet: newton är kraft, newtonmeter är vridmoment. Manualens tekniska data har ingen momentrad alls, bara märkspänning 230 V, effekt 100 W, max porthöjd 2,5 m, max portbredd 5 m, max portvikt 100 kg. Försäkran är också den enda i jämförelsen som åberopar de standarder som faktiskt gäller maskindrivna portar: EN 12453:2017 om säkerhet vid användning, EN 13241:2003/A2:2016, EN 12635:2002/A1:2008 och EN ISO 12100:2010, utöver EN 60335-1 och EN 60335-2-95. Manualen anger hinderprovet till ett föremål 50 mm högt. Dokumentet ligger bakom en JavaScript-injicerad länk till assets.cdn.jula.com och går inte att nå utan webbläsare.',
  },
  {
    publisher: "Jula",
    title: "Garageportsöppnare 018980, bruksanvisning",
    url: "https://www.jula.se/catalog/bygg-och-farg/beslag-och-byggvaror/port-garagebeslag/garageportoppnare/garageportsoppnare-018980/",
    market: "SE",
    kind: "standard",
    note: 'Den andra Hard Head-öppnaren, och den där butikens uppgift stämmer med manualen. Tekniska data: max portbladsvikt 80 kg, max porthöjd 230 cm, max portöppningsarea 12 m², hastighet 12 cm/s, märkeffekt 120 W, vridmoment 8 Nm, 230 VAC, vikt 14 kg. Ingen dragkraft i newton publiceras. Manualen listar tillbehörsportens plintar, där plint 3 och 4 anges som "Fotocell (säkerhetsfunktion)". Anslutningen finns alltså, men cellen ingår inte. Dokumentet motsäger sig självt om hinderprovet: säkerhetsavsnittet anger ett föremål "ca 50 mm högt", symbolavsnittet ett "100 mm högt". Minsta avstånd mellan tak och portblad i öppet läge anges till 30 mm.',
  },
  {
    publisher: "Millarco International",
    title: "Boxer garageportsöppnare 63.002 och 63.003, bruksanvisning version 3",
    url: "https://www.bauhaus.se/media/pdf/5514481A.pdf",
    date: "2015-01-05",
    kind: "standard",
    note: 'Manualen för Boxer 3000 IIII, som är modell 63.003 med typbeteckningen ZTGD 1000NM. Tre saker står här som inte står i butiken. För det första heter fältet i tekniska data "Öppnings- och stängningskraft" och anger "Max. 1000 N", alltså samma tal för att öppna och för att stänga, mot Chamberlains gräns på 400 N vid stängning. För det andra är dragkraften inte en fast egenskap: "Trækkraften kan reguleres i en skala 1-9, hvor 9 er det maksimale (800N / 1000N)." Talet på kartongen är alltså högsta läget på ett reglage. För det tredje är automatisk stängning påslagen när apparaten kommer ur lådan: "Bemærk: Automatisk lukke funktion er aktiveret fra fabrikken." Innehållsförteckningen listar skenor, kedja, löpvagn, motor, två fjärrkontroller, stroppar och nödutkopplingslås, men ingen fotocell. Den svenska och den danska tabellen för samma modell säger dessutom olika saker: standbyförbrukning 8 watt på danska och 800 watt på svenska, dragskena 3,5 respektive 3 meter, glödlampa 230 V 15 W respektive 24 V 5 W.',
  },
  {
    publisher: "Europeiska unionen",
    title: "Direktiv 98/37/EG om maskiner, CELEX 31998L0037",
    url: "https://eur-lex.europa.eu/legal-content/SV/ALL/?uri=CELEX:31998L0037",
    kind: "standard",
    note: 'Läst för att kunna datera Boxers CE-försäkran, som åberopar direktivet. Fältet "Date of end of validity" anger 1998-års maskindirektiv som upphävt 2009-12-28 genom 2006/42/EG. Boxers försäkran undertecknades 2015-01-05, alltså drygt fem år senare. Samma försäkran åberopar även 89/336/EEG, som enligt CELEX 31989L0336 upphörde att gälla 2007-07-19. Det tredje direktivet, 2006/95/EG, gällde till 2016-04-20 och var alltså giltigt vid undertecknandet. Detta säger ingenting om produktens säkerhet eller om CE-märkningens giltighet, bara vad dokumentet hänvisar till och när direktiven upphörde.',
  },
  {
    publisher: "Svenska institutet för standarder",
    title: "SS-EN 12453, Portar – Säkerhet vid användning av maskindrivna portar – Krav",
    url: "https://www.sis.se/produkter/byggnadsmaterial-och-byggnader/byggnadsdelar/dorrar-och-fonster/ssen12453/",
    market: "SE",
    kind: "standard",
    note: "Standarden som Julas försäkran åberopar i utgåvan 2017 och som varken Boxer eller Chamberlain nämner. Vi har inte köpt den och återger därför ingenting om vilka provvillkor eller kraftgränser den föreskriver. Att den finns, vad den heter och vem som åberopar den är däremot kontrollerbart, och det är allt sidan påstår. Samma hållning som SS-EN 810 på /avfuktare.",
  },
  {
    publisher: "Bauhaus",
    title: "Garageportsöppnare 1000N Boxer 3000 IIII, produktsida",
    url: "https://www.bauhaus.se/garageportsoppnare-1000n-boxer-3000-iiii",
    market: "SE",
    note: "Den enda produktsidan i kartläggningen som anger dragkraft, portyta och portvikt på samma ställe: lyftkraft 1000 newton upp till 16 m² och max 120 kg, plus 150 W, dragskena 3,5 m, max porthöjd 2,80 m, fjärrkontrollräckvidd 35 m och standbyförbrukning 8 watt. Den uppgiften om standby stämmer med manualens danska tabell och inte med dess svenska. Priset 1 955 kr och kundbetyget 4,5 av 158 lästes samma dag.",
  },
  {
    publisher: "Ljud & Bild",
    title: "TEST: Yale Smart Opener Garage",
    url: "https://www.ljudochbild.se/test/smart-hem/yale-smart-opener-garage/",
    date: "2025-01-21",
    market: "SE",
    kind: "test",
    note: "Det enda oberoende svenska testet vi hittat i hela ämnesområdet, och det gäller inte portöppnare utan smart styrning av en öppnare du redan har. Geir Gråbein Nordby har monterat produkten och anger riktpris 1 700 kr. Det hör därför hemma på systersidan om smart garageportstyrning och väger inte in i betygen här. Det står med eftersom köpguiden hänvisar dit, och eftersom det är belägget för att eftermontering är ett verkligt alternativ till att byta motor.",
  },
];

/**
 * Smart garageportsöppnare.
 *
 * Systersida till /garageportsoppnare. Ljud & Bilds Yale-test är kategorins
 * enda oberoende provning och täcker en av sex produkter, vilket är för tunt
 * för ett eget kriterium men tillräckligt för att vara källa.
 */
export const SMART_GARAGEPORTSOPPNARE_SOURCES: Source[] = [
  {
    publisher: "Ljud & Bild",
    title: "TEST: Yale Smart Opener Garage",
    url: "https://www.ljudochbild.se/test/smart-hem/yale-smart-opener-garage/",
    date: "2025-01-21",
    market: "SE",
    kind: "test",
    note: "Kategorins enda oberoende provning, och den enda gången någon svensk redaktion monterat en av de här modulerna och beskrivit vad som hände. Geir Gråbein Nordby anger riktpris 1 700 kr och konstaterar tre begränsningar som inte står i någon butik: produkten stöder inte HomeKit, Google Assistant kräver PIN-kod vid varje öppning, och wifi-täckningen i garaget måste vara stabil. Han monterade även Yale Smart Keypad och anger batteritiden till runt ett halvår på två AAA-batterier. Testet beskriver också geotaggningen, alltså att porten öppnas när telefonen närmar sig och stängs när den lämnat garaget.",
  },
  {
    publisher: "Kjell & Company",
    title: "Yale Smart Opener för motordrivna garageportar, produktsida",
    url: "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-smart-opener-for-motordrivna-garageportar-p66156",
    market: "SE",
    note: 'Den utförligaste specifikationen i kategorin, och den enda som säger något om kontosäkerhet. Ordagrant: "Tvåfaktorssäkerhet: tvåfaktorsautentisering, förutom ditt lösenordet verifieras din identitet genom e-post eller telefonnummer" och "Kryptering: Bluetooth Low Energy (BLE) samt AES- och TLS-kryptering". Ingen annan produktsida i jämförelsen nämner vare sig kryptering eller tvåstegsverifiering. Sidan anger också måtten, 50 × 50 × 32 mm för styrenheten och 70 × 46 × 21 mm för positionssensorn, och att produkten passar takskjutportar och vipportar.',
  },
  {
    publisher: "SwitchBot",
    title: "SwitchBot Garage Door Opener, tillverkarens produktsida",
    url: "https://eu.switch-bot.com/products/switchbot-garage-door-opener",
    kind: "standard",
    note: 'Enda produkten i jämförelsen som stöder Matter. Tillverkaren skriver "Supports Matter over Wi-Fi and works with Apple Home, Google, Alexa, and Samsung", vilket gör den till den enda som når Apples ekosystem utan att man behöver köpa en särskild artikelvariant. Sidan anger också att modulen kan koppla upp till två SwitchBot-enheter över Bluetooth.',
  },
  {
    publisher: "Meross",
    title: "Smart Wi-Fi Garage Door Opener MSG100, tillverkarens produktsida",
    url: "https://www.meross.com/en-gc/smart-garage-door-opener/smart-wi-fi-garage-door-opener/58",
    kind: "standard",
    note: 'Tillverkarens beskrivning av MSG100-familjen, som anger att modulen fungerar med Apple HomeKit, Siri, Amazon Alexa, Google Assistant och SmartThings och att ingen hubb krävs. ⚠️ Meross säljer flera artiklar under MSG100-namnet, och HomeKit-stödet hör historiskt till varianten MSG100HK som säljs separat i Sverige för 569 kr. Vi anger därför inte HomeKit som en egenskap hos den artikel NetOnNet säljer, eftersom vi inte kunnat bekräfta artikelnumret mot tillverkarens variantlista. Samma variantfälla som ABUS 787 mot 787 Smart-BT på /nyckelskap.',
  },
  {
    publisher: "Elsäkerhetsverket",
    title: "Det här får du göra själv med el",
    url: "https://www.elsakerhetsverket.se/privatpersoner/din-elsakerhet/det-har-far-du-gora-sjalv/",
    market: "SE",
    kind: "standard",
    note: "Myndighetens lista över tillåtet egenarbete, och skälet till att strömförsörjningen är ett eget kriterium här. Gränsen går inte vid om produkten är smart utan vid om du byter något befintligt eller förändrar den fasta installationen. Att lägga in en relämodul i en kopplingsdosa hör till det senare och kräver registrerat elinstallationsföretag. Samma källa bär motsvarande avsnitt på /smart-strombrytare, där formuleringen rättades en gång efter att ett utkast dragit gränsen vid fel sak.",
  },
];

/**
 * Powerbank.
 *
 * Kategorin har en riktig labbprovning, Stiftung Warentest 2/2026, men
 * resultaten per modell ligger bakom betalvägg. Metoden och spannen är öppna
 * och används; inga modellbetyg gissas. Samma hantering som Warentest på
 * /smart-termostat och Testaankoop på /usb-c-laddare.
 */
export const POWERBANK_SOURCES: Source[] = [
  {
    publisher: "Stiftung Warentest",
    title: "Powerbanks im Test: Kraft für müde Akkus",
    url: "https://www.test.de/Powerbanks-im-Test-5019032-0/",
    date: "2026-02-01",
    market: "DE",
    kind: "test",
    note: 'Kategorins enda riktiga labbprovning, 24 powerbanks i häfte 2/2026. Slutsatsen som bär den här sidan står i det öppna avsnittet, ordagrant: "Beworben werden die Powerbanks im Test mit Nennkapazitäten von rund 10 000 oder 20 000 Milliamperestunden (mAh). Doch diese Anbieterangaben sind nur begrenzt aussagekräftig. Wichtiger ist die tatsächlich nutzbare Energiemenge, gemessen in Wattstunden (Wh)." De uppmätta spannen är också öppna: 28,5 till 35,8 Wh för de små och kompakta, 58,3 till 69,9 Wh för de stora. Betyg och mätvärden per modell kräver betalning, 4,90 euro, och vi har inte köpt dem. Inget modellresultat härifrån återges eller gissas.',
  },
  {
    publisher: "Transportstyrelsen",
    title: "Batteridrivna produkter och reservbatterier",
    url: "https://www.transportstyrelsen.se/sv/luftfart/flygresenar/Bagage/Vad-far-jag-ta-med-mig-ombord/Batterier-och-batteridrivna-produkter/",
    market: "SE",
    kind: "standard",
    note: "Myndighetens tabell över vad som får följa med på flyget, och skälet till att wattimmar är den enhet som avgör. Lösa litiumjonbatterier inklusive powerbanks upp till 100 Wh får tas med i handbagage men står som Nej i incheckat bagage. Mellan 100 och 160 Wh gäller handbagage, högst två batterier, och flygbolagets godkännande krävs. Över 160 Wh är de inte tillåtna alls. Gränserna uttrycks genomgående i wattimmar, alltså i den storhet som sällan står i produktnamnet.",
  },
  {
    publisher: "Kjell & Company",
    title: "Powerbank, produktkategori och specifikationer",
    url: "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank",
    market: "SE",
    note: "Den butik vi kartlagt hylla för hylla, 39 produkter 2026-08-05. Underlaget för hur ojämnt kapaciteten redovisas: av åtta produkter i den storleksklass sidan rankar anger två wattimmar, och tre saknar specifikationsruta helt. Anker Nano 30 W anger 10 000 mAh / 37 Wh och Linocell Premium 30 W anger 10 000 mAh (36 Wh), alltså olika wattimmar för samma nominella kapacitet. Priser, artikelnummer och kundbetyg är lästa här samma dag.",
  },
  {
    publisher: "Kjell & Company",
    title: "Bäst i test: Powerbank 2026",
    url: "https://www.kjell.com/se/kunskap/guider/bast-i-test-powerbank",
    market: "SE",
    note: "Butikens egen guide om produkterna i den egna hyllan. Den är med som mätpunkt och inte som underlag: 1 265 ord, ordet mAh 23 gånger, ordet Wh noll gånger, och varken flyg eller handbagage nämns. Vi har inte hämtat någon uppgift härifrån.",
  },
  {
    publisher: "Testkompassen",
    title: "Powerbank: 5 favoriter efter hårda tester",
    url: "https://www.testkompassen.se/kategorier/elektronik-och-foto/mobiltilbehor/powerbank",
    market: "SE",
    note: 'Den enda svenska jämförelsen som tar upp wattimmar, och den gör det ordentligt: 47 förekomster av Wh, nio av 100 Wh-gränsen och elva av omvandlingsförluster. De publicerar omräkningen ordagrant, "Wh ≈ (mAh ÷ 1000) × 3,7 V", och skriver att verklig leverans blir 10 till 30 procent lägre. Deras wattimmar är räknade ur mAh och inte uppmätta, vilket är skillnaden mot Warentest. Källan står med eftersom den är korrekt och eftersom sidan aldrig ska påstå att ämnet är obehandlat på svenska.',
  },
];

/**
 * Powerbank, reseklassen.
 *
 * Delar de flesta källor med /powerbank. Skillnaden är att den här sidan
 * faktiskt behöver Transportstyrelsens gränser: två av produkterna ligger
 * inom en wattimme från taket på 100 Wh.
 */
export const POWERBANK_20000_SOURCES: Source[] = [
  {
    publisher: "Transportstyrelsen",
    title: "Batteridrivna produkter och reservbatterier",
    url: "https://www.transportstyrelsen.se/sv/luftfart/flygresenar/Bagage/Vad-far-jag-ta-med-mig-ombord/Batterier-och-batteridrivna-produkter/",
    market: "SE",
    kind: "standard",
    note: "Kategorins viktigaste dokument, och skälet till att wattimmar är den enhet som avgör i den här storleksklassen. Lösa litiumjonbatterier inklusive powerbanks upp till 100 Wh får tas med i handbagage men aldrig i incheckat bagage. Mellan 100 och 160 Wh gäller handbagage, högst två batterier, och flygbolagets godkännande krävs. Över 160 Wh är de inte tillåtna alls. Två av produkterna som jämförs här anger 99,75 respektive 99,36 wattimmar, alltså inom en wattimme från gränsen.",
  },
  {
    publisher: "Stiftung Warentest",
    title: "Powerbanks im Test: Kraft für müde Akkus",
    url: "https://www.test.de/Powerbanks-im-Test-5019032-0/",
    date: "2026-02-01",
    market: "DE",
    kind: "test",
    note: 'Labbprovning av 24 powerbanks, häfte 2/2026, som delar sitt test på samma storlekar som vi. För de stora modellerna mätte de uttagbar energi till mellan 58,3 och 69,9 wattimmar, alltså under vad de nominella talen antyder. Slutsatsen i det öppna avsnittet är att tillverkarnas mAh-uppgifter är "nur begrenzt aussagekräftig" och att det som betyder något är uttagbar energi i Wh. Betyg och mätvärden per modell kräver betalning, 4,90 euro, som vi inte lagt. Inget modellresultat härifrån återges eller gissas.',
  },
  {
    publisher: "Kjell & Company",
    title: "Powerbank, produktkategori och specifikationer",
    url: "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank",
    market: "SE",
    note: "Butiken vi kartlagt produkt för produkt. Underlaget för hur olika samma nominella kapacitet redovisas: av tre powerbanks på 20 000 mAh anger Linocell Premium 72 Wh med spänningen 3,6 V utsatt, Anker Prime 72,36 Wh för 20 100 mAh, och Xtorm 100 Wh. Sju av nio produkter i storleksklassen anger sitt energiinnehåll, mot två av åtta i den mindre klassen. Priser, artikelnummer, kundbetyg och specifikationer är lästa här 2026-08-05.",
  },
  {
    publisher: "Testkompassen",
    title: "Powerbank: 5 favoriter efter hårda tester",
    url: "https://www.testkompassen.se/kategorier/elektronik-och-foto/mobiltilbehor/powerbank",
    market: "SE",
    note: 'Den enda svenska jämförelsen som tar upp wattimmar, och den gör det korrekt: omräkningen "Wh ≈ (mAh ÷ 1000) × 3,7 V" står ordagrant, liksom att verklig leverans blir 10 till 30 procent lägre, och gränserna 100 och 160 Wh återges rätt. Källan står med eftersom sidan aldrig ska påstå att ämnet är obehandlat på svenska.',
  },
];

/**
 * iPhone-skal.
 *
 * ⚠️ Ingen källa här har `kind: "test"`, och det är inte ett förbiseende.
 * Kategorin saknar oberoende provning helt. Se noten på Råd & Rön nedan.
 *
 * De tre MIL-STD-utgåvorna står som separata källor med flit. Hela sidans fynd
 * ligger i skillnaden mellan dem, och en läsare som vill kontrollera det ska
 * kunna öppna rätt dokument utan att leta.
 */
export const IPHONE_SKAL_SOURCES: Source[] = [
  {
    publisher: "US Department of Defense",
    title: "MIL-STD-810H, Environmental Engineering Considerations and Laboratory Tests",
    url: "https://cvgstrategy.com/wp-content/uploads/2019/03/MIL-STD-810H.pdf",
    date: "2019-01-31",
    market: "US",
    kind: "standard",
    note: 'Gällande utgåva sedan den 31 januari 2019, läst i original. Ingen produktsida i svensk handel hänvisar till den. Fyra ställen bär sidans fynd. Del ett §1.2 b: "It is not valid to call out all of the Methods in this Standard in a blanket fashion for a materiel system; nor is it valid, once a Method is determined appropriate, (except for Method 528) to regard the environmental stress data, test criteria, and procedures in the Method as unalterable." Varje metod i 500-serien bär dessutom noten "Tailoring is essential". Tabell 516.8-IX not 1 gör stål till förvalt underlag och tillåter plywood bara under två namngivna villkor, och not 5 säger ordagrant: "If desired, divide the 26 drops among no more than five test items." §4.6.5.1 anger plattan till minst 76 mm stål med Brinellhårdhet 200 på armerad betong och skriver att "The most severe damage potential is impact with a non-yielding mass that absorbs minimal energy". §4.6.4 d säger att procedur IV gäller stötar vid lastning och lossning av materiel i sin transportlåda. ⚠️ Del ett §1.3 punkt f undantar "Packaging performance or design", men *packaging* betyder transportemballage i dokumentet och inte mobilskal. Punkten får inte användas.',
  },
  {
    publisher: "US Department of Defense",
    title: "MIL-STD-810G w/Change 1, metod 516.7 Shock",
    url: "https://cvgstrategy.com/wp-content/uploads/2019/03/MIL-STD-810G-1.pdf",
    date: "2014-04-15",
    market: "US",
    kind: "standard",
    note: 'Läst i original. Den här utgåvan avgjorde två frågor under bygget. För det första numrerades stötmetoden om från 516.6 till 516.7, vilket betyder att X2O:s hänvisning "MIL-STD810G-516.7" är riktig och den mest exakta som förekommer i svensk handel. Ett utkast var på väg att kalla den ett påhittat metodnummer. För det andra står bytet av underlag här och inte i 810H: "The default drop surface is steel backed by concrete. Concrete or 5cm (2 in.) plywood backed by concrete should be selected if it can be shown that the natural frequency of the test item is not adequately excited when dropped on the default steel surface." Plywooden har alltså inte varit förvalt underlag sedan den 15 april 2014.',
  },
  {
    publisher: "US Department of Defense",
    title: "MIL-STD-810G, metod 516.6 Shock, procedur IV Transit Drop",
    url: "https://www.vibrationdata.com/tutorials/MIL810G_shock.pdf",
    date: "2008-10-31",
    market: "US",
    kind: "standard",
    note: 'Metodutdraget ur 2008 års utgåva, läst i original. Det är den utgåva OtterBox hänvisar till på sina svenska produktsidor, och den enda av de tre där plywood fortfarande är föreskrivet underlag: "For the floor or barrier receiving the impact, use two-inch plywood backed by concrete. For materiel over 454 kg, use a concrete floor or barrier." Ersatt två gånger sedan dess, 2014 och 2019.',
  },
  {
    publisher: "Råd & Rön",
    title: "Tester, telefoni, datorer och internet",
    url: "https://www.radron.se/tester/telefoni-datorer--internet/mobiler/",
    market: "SE",
    note: "Med som belägg för att kategorin saknar oberoende provning. Råd & Rön provar mobiltelefoner, inklusive falltrumma, men har ingen provning av skyddsskal. Sökning över radron.se gav inget test av mobilskal. Ingen uppgift på sidan är hämtad härifrån, och vi påstår aldrig att någon provat skalen.",
  },
  {
    publisher: "Android Police",
    title: "Why most military-grade cases need to go back to basic training",
    url: "https://www.androidpolice.com/most-military-grade-cases-are-a-lie/",
    market: "US",
    note: 'Andrahandskälla, med som bekräftelse på att branschen inte följt med utgåvorna: "810G 516.6 is still the testing standard used by almost all cases today". Artikeln daterar dock bytet av underlag till 810H 2019, vilket vi läst i original och funnit skedde redan 2014. Där de går isär gäller dokumentet.',
  },
  {
    publisher: "Apple",
    title: "Apple lanserar iPhone 17 Pro och iPhone 17 Pro Max",
    url: "https://www.apple.com/se/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max-the-most-powerful-and-advanced-pro-models-ever/",
    date: "2025-09-09",
    market: "SE",
    note: "Tillverkarens eget pressmeddelande, som källa för vilka modeller som finns och när de kom. iPhone 17-familjen presenterades den 9 september 2025 och kom i handeln den 19 september. Används för att avgränsa vilka modeller sidan gäller. ⚠️ Apple har inte presenterat någon iPhone 18 och publicerar inga mått för en sådan, vilket är relevant eftersom butiken anger passform mot den modellen.",
  },
  {
    publisher: "Testix",
    title: "Bästa mobilskal till Apple iPhone 17 Pro 2026",
    url: "https://testix.se/test/mobilskal-apple-iphone-17-pro",
    market: "SE",
    note: 'Konkurrent, med som mätpunkt och inte som underlag. 6 200 ord, fem rankade skal, och viktningen 30 stöttålighet, 20 MagSafe, 20 grepp, 15 design, 15 prisvärde. Sidan skriver "Vårt testteam använde varje mobilskal i minst en vecka" och "Testet är helt oberoende och ingen av tillverkarna har haft insyn i processen". Kontrollerat ord för ord: MIL-STD-810, militärstandard, fallhöjd, provunderlag och Qi2 förekommer inte en enda gång. Ingen uppgift är hämtad härifrån.',
  },
  {
    publisher: "Bäst i test Guiden",
    title: "Bästa mobilskalet 2026",
    url: "https://www.bast-i-test.se/tester_pa_basta/mobilskal.html",
    market: "SE",
    note: 'Konkurrent, med som mätpunkt. Ärligast av de svenska sidorna om sin metod: "För att se vilka mobilskal som presterar bäst just nu har vi hört vad experterna säger i sina tester, på internet och i tidningar." Rankar dock fortfarande iPhone 15 Pro-skal år 2026, och nämner varken standard, utgåva eller fallhöjd. Ingen uppgift är hämtad härifrån.',
  },
];

/**
 * Källor för /slackspray.
 *
 * ⚠️ Kategorins enda oberoende utvärdering är ett examensarbete, inte en
 * ackrediterad provning eller en myndighetsgranskning. Det ska stå rakt ut
 * varje gång rapporten åberopas.
 */
export const SLACKSPRAY_SOURCES: Source[] = [
  {
    publisher: "Lunds tekniska högskola, Avdelningen för Brandteknik",
    title: "Effekten av släcksprayer vid brandtillbud",
    url: "https://lup.lub.lu.se/student-papers/search/publication/9071795",
    date: "2022-01-17",
    market: "SE",
    kind: "test",
    note: 'Kategorins enda oberoende utvärdering, och den enda källa här som prövat produkterna mot eld. Examensarbete på Brandingenjörsprogrammet av Casper Flensburg och Axel Kriborg, ISRN LUTVDG/TVBB--51XX--SE, 61 sidor. ⚠️ Skrivet under höstterminen 2020 och publicerat 2022; omslaget anger 2020 och copyrightraden 2022, så ett ensamt årtal blir missvisande. ⚠️ Det är ett examensarbete och inte en ackrediterad provning, vilket sidan säger rakt ut. Handledare var bland andra Marcus Runefors vid LTH, och de avslutande släckförsöken gjordes på övningsfältet Revinge. Två produkter provades, valda för att de var vanligast hos stora återförsäljare: Housegard FireStopper 600 ml och Taerosol Fire Fighter 500 ml. Härifrån kommer klasserna 5A 21B (E) 5F respektive 3A 13B (E) 5F, uppgiften att 43A 233B C är den lägsta klassning som rekommenderas till hemmet och i dagsläget bara uppfylls av sexkilos pulversläckare och niolitersskumsläckare, tömningstiderna 20–30 respektive 15–25 sekunder, kastlängderna 5–7 meter för pulversläckare och 4–5 för skumsläckare, samt beräkningen att en spray klarar släckning i möbler i cirka tre minuter efter att brandtillväxten startat. Rapportens egen slutsats är sidans utgångspunkt: "De största bristerna med produkten utgörs utöver detta av bristande eller annars misstolkningsbar information från tillverkare och återförsäljare." Den varnar också för att behållaren "riskerar att explodera vid upphettning". Två nyanser återges eftersom de talar för produkten: de som omkommit vid släckförsök hade enligt rapporten inte använt handbrandsläckare utan exempelvis vatten, och sprayen pekas ut som lämplig för den som på grund av rörelsesvårigheter inte kan hantera traditionell släckutrustning.',
  },
  {
    publisher: "Svenska institutet för standarder",
    title: "SS-EN 3-7:2004, Brand och räddning – Handbrandsläckare – Del 7: Egenskaper, funktionskrav och provningsmetoder",
    url: "https://www.sis.se/produkter/miljo-och-halsoskydd-sakerhet/skydd-mot-brand/brandbekampning/ssen372004/",
    kind: "standard",
    note: 'Standarden som avgör vad talen på burken betyder, och skälet till att sidan alls går att skriva. Enligt LTH-rapporten klassas inom EU alla brandsläckningsprodukter avsedda för privatbruk enligt SS-EN 3–7, med undantag för brandfiltar. Det gäller alltså även släcksprayer, vilket är sidans utgångspunkt: sprayen säljs bredvid handbrandsläckaren och mäts med samma måttstock. A avser fibrösa bränslen som trä, textil och kartong, och talet framför är storleken på testbålet; B avser vätskeformiga bränslen och talet är liter n-heptan; C avser gasformiga bränslen och F fettbränder. D för metallbränder omfattas inte av standarden men förekommer ändå på släckare avsedda för det, vilket är relevant för litiumsprayerna. ⚠️ Vi har inte köpt standarden och återger därför ingenting om provvillkoren utöver det rapporten beskriver. Samma hållning som SS-EN 810 på /avfuktare och SS-EN 12453 på /garageportsoppnare.',
  },
  {
    publisher: "Myndigheten för civilt försvar",
    title: "Brandsäkerhet i hemmet",
    url: "https://www.mcf.se/sv/rad-till-privatpersoner/brandsakerhet/brandsakerhet-i-hemmet/",
    market: "SE",
    kind: "standard",
    note: '⚠️ Med som kontroll, och kontrollen föll ut negativt. Myndighetens råd till privatpersoner är att alla bör ha "brandvarnare, brandfilt och pulversläckare i sitt hem". Släckspray nämns inte, och talet 43A 233B C står inte på sidan. Den siffran har vi därför bara som LTH-rapportens återgivning av MSB, och den tillskrivs rapporten och aldrig myndigheten direkt. ⚠️ Adressen är dessutom flyttad: msb.se svarar med omdirigering hit sedan myndigheten delades vid årsskiftet 2026, vilket redan noterats för MSB RIB på /brandslackare. Att myndigheten rekommenderar en pulversläckare och inte en spray är i sig det tyngsta enskilda argumentet för hur sidan rangordnar.',
  },
];

/**
 * iPhone-fodral, alltså uppfällbara plånboksfodral.
 *
 * ⚠️ Ingen källa har `kind: "test"`. Kategorin saknar oberoende provning helt,
 * precis som /iphone-skal, och sidan säger det rakt ut enligt IDÉ-012.
 *
 * ⚠️ RAID-papperet nedan är med som **avgränsning** och inte som stöd. Det är
 * enda gången någon utvärderat RFID-blockerande produkter, och just därför
 * måste sidan vara tydlig med att resultatet inte gäller ett fodral.
 */
export const IPHONE_FODRAL_SOURCES: Source[] = [
  {
    publisher: "Alecci m.fl., RAID '23",
    title: "Beware of Pickpockets: A Practical Attack against Blocking Cards",
    url: "https://arxiv.org/pdf/2302.08992",
    date: "2023-07-12",
    market: "BE",
    kind: "standard",
    note: 'Läst i original, arXiv:2302.08992v2, publicerad på RAID \'23 (ACM). Den första och enda oberoende utvärderingen av RFID-blockerande produkter: "Whereas vendors claim the reliability of their blocking cards, no previous study has ever focused on evaluating their effectiveness." Forskarna köpte 14 blockeringskort, analyserade deras spektrum och kringgick 8 av 11 utvärderade. ⚠️ RESULTATET GÄLLER INTE ETT PLÅNBOKSFODRAL, och papperet skiljer själv på mekanismerna: "While covers and wallets generally rely on their metal shielding structure to protect smart cards, blocking cards employ a higher range of approaches (e.g., shielding, jamming)." Tre av korten var skärmande, alltså samma Faraday-princip som ett fodral, och de uteslöts uttryckligen ur angreppsutvärderingen: "we have made the decision to exclude these cards from the Attack Evaluation." När de tre lades framför ett kort kom inget svar alls från kortet. Källan är därför med som avgränsning: vi lånar aldrig talet 8 av 11 till ett fodral. Det andra som gör papperet användbart är vilka kort som angreps, nämligen MIFARE Ultralight och Classic, som enligt papperet är "widely used in access control systems, such as public transportation, event ticketing, prepaid applications, loyalty", medan MIFARE Plus och DESFire med AES respektive Triple-DES bär "electronic payments, e-passports, identity cards".',
  },
  {
    publisher: "Testix",
    title: "Plånboksfodral till mobil, bäst i test 2026",
    url: "https://testix.se/test/planboksfodral-till-mobil",
    market: "SE",
    note: "Konkurrent, med som mätpunkt och inte som underlag. Tio modeller mellan 179 och 399 kronor. De är ärligare om metoden här än på sin skalsida och skriver att de läst igenom över 200 kundrecensioner och jämfört utbudet hos fem större svenska återförsäljare, alltså ingen egen provning. Deras modellspecifika sida gäller dessutom iPhone 14 Pro Max, två generationer bakåt. Ingen uppgift är hämtad härifrån.",
  },
  {
    publisher: "Testexperterna",
    title: "Plånboksfodral bäst i test 2026",
    url: "https://testexperterna.se/planboksfodral",
    market: "SE",
    note: "Konkurrent, med som mätpunkt. Generisk sida utan modellavgränsning. Samma schemastack som vår, se IDÉ-009. Ingen uppgift är hämtad härifrån.",
  },
  {
    publisher: "Apple",
    title: "Apple lanserar iPhone 17 Pro och iPhone 17 Pro Max",
    url: "https://www.apple.com/se/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max-the-most-powerful-and-advanced-pro-models-ever/",
    date: "2025-09-09",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens eget pressmeddelande, som källa för vilka modeller som finns och när de kom. Används för att avgränsa vilka modeller sidan gäller, och för att priset genomgående avser 17 Pro-varianten.",
  },
];

export const SOURCES_BY_HREF: Record<string, Source[]> = {
  "/iphone-fodral": IPHONE_FODRAL_SOURCES,
  "/slackspray": SLACKSPRAY_SOURCES,
  "/iphone-skal": IPHONE_SKAL_SOURCES,
  "/powerbank-20000": POWERBANK_20000_SOURCES,
  "/powerbank": POWERBANK_SOURCES,
  "/smart-garageportsoppnare": SMART_GARAGEPORTSOPPNARE_SOURCES,
  "/garageportsoppnare": GARAGEPORTSOPPNARE_SOURCES,
  "/usb-c-laddare": USB_C_LADDARE_SOURCES,
  "/nyckelskap": NYCKELSKAP_SOURCES,
  "/vattenfelsbrytare": VATTENFELSBRYTARE_SOURCES,
  "/avfuktare": AVFUKTARE_SOURCES,
  "/smart-termostat": SMART_TERMOSTAT_SOURCES,
  "/smart-hem-hubb": SMART_HEM_HUBB_SOURCES,
  "/fonsterputsrobot": FONSTERPUTSROBOT_SOURCES,
  "/robotgrasklippare": ROBOTGRASKLIPPARE_SOURCES,
  "/hygrometer": HYGROMETER_SOURCES,
  "/luftkvalitetsmatare": LUFTKVALITETSMATARE_SOURCES,
  "/robotdammsugare": ROBOTDAMMSUGARE_SOURCES,
  "/brandfilt": BRANDFILT_SOURCES,
  "/brandslackare": BRANDSLACKARE_SOURCES,
  "/brandstege": BRANDSTEGE_SOURCES,
  "/brandvarnare": BRANDVARNARE_SOURCES,
  "/dorrklocka-med-kamera": DORRKLOCKA_SOURCES,
  "/elektrisk-rullgardin": ELEKTRISK_RULLGARDIN_SOURCES,
  "/hemlarm": HEMLARM_SOURCES,
  "/inomhuskamera": INOMHUSKAMERA_SOURCES,
  "/kodlas-ytterdorr": KODLAS_SOURCES,
  "/kolmonoxidvarnare": KOLMONOXIDVARNARE_SOURCES,
  "/larm-utan-abonnemang": LARM_UTAN_ABONNEMANG_SOURCES,
  "/luftfuktare": LUFTFUKTARE_SOURCES,
  "/luftrenare": LUFTRENARE_SOURCES,
  "/overvakningskamera": OVERVAKNINGSKAMERA_SOURCES,
  "/smart-belysning": SMART_BELYSNING_SOURCES,
  "/smart-brandvarnare": SMART_BRANDVARNARE_SOURCES,
  "/smart-plug": SMART_PLUG_SOURCES,
  "/smart-strombrytare": SMART_STROMBRYTARE_SOURCES,
  "/utomhustimer": UTOMHUSTIMER_SOURCES,
  "/utrymningsstege": UTRYMNINGSSTEGE_SOURCES,
  "/vattenlarm": VATTENLARM_SOURCES,
};

/** Samma källa kan citeras av flera kategorier. Räkna den en gång. */
function dedupeByUrl(sources: Source[]): Source[] {
  return sources.filter((s, i, all) => all.findIndex((x) => x.url === s.url) === i);
}

/**
 * Alla källor en grupp vilar på, avdubblerade.
 *
 * Bara publicerade kategorier. En grupp ska inte kunna skryta med läsning som
 * gjorts för en sida ingen kan öppna, och räkningen skulle dessutom skilja sig
 * mellan utveckling och produktion, eftersom förhandsläget visar planerade
 * kategorier.
 *
 * `extra` finns för källor som hör till gruppen snarare än till en enskild
 * kategori, exempelvis `SMART_HEM_SOURCES`.
 */
export function groupSources(group: Category, extra: Source[] = []): Source[] {
  const fromCategories = testPagesInCategory(group)
    .filter((c) => c.status === "live")
    .flatMap((c) => SOURCES_BY_HREF[c.href] ?? []);
  return dedupeByUrl([...extra, ...fromCategories]);
}
