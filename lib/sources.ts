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
    | "PL"
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
  PL: "Polen",
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
  const tests = sources.filter(
    (s) => s.kind !== "standard" && s.kind !== "comparison",
  );
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
    publisher: "Energimyndigheten",
    title: "Enkla elmätare och smarta pluggar med energimätning",
    url: "https://www.energimyndigheten.se/effektiv-energianvandning/tester/tester-a-o/enkla-elmatare-och-smarta-pluggar-med-energimatning/",
    market: "SE",
    note: "Myndighetstest av åtta uttag enligt SS-EN 50564 och SS-EN 50643, med uppmätt viloförbrukning och mätfel vid laster från 0,3 W till 2 500 W.\n\nInget av uttagen kunde mäta 0,3 W och flera visade noll även vid 1,5 W. Först från 30 W är felet under 3,5 procent. De uppmätta modellerna är andra generationer än våra, så siffrorna ligger i köpguiden som kategorifakta och är inte förda till någon produkt.",
  },
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
    title:
      "SwitchBot Curtain 3 review: 3rd-gen curtain controller gets it right",
    url: "https://www.techhive.com/article/2238336/switchbot-curtain-3-review-3rd-gen-curtain-controller-gets-it-right.html",
    market: "US",
    note: "Testar just tredje generationen och jämför den mot föregångaren. Lyfter den kraftigare motorn och magneten som ersätter manuell kalibrering av stoppläget.",
  },
  {
    publisher: "Trusted Reviews",
    title:
      "SwitchBot Curtain 3 review: The quiet way to turn your curtains smart",
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
    publisher: "The Ambient",
    title: "SwitchBot Roller Shade review",
    url: "https://www.the-ambient.com/reviews/switchbot-roller-shade-r/",
    market: "UK",
    note: "David Ludlow testar den kompletta rullgardinen och beskriver den som mjuk och pålitlig i drift, med pillig montering och två färger som invändningar. Ligger bakom betyget på Omdöme i oberoende tester, som fram till 2026-08-06 stod tomt.",
  },
  {
    publisher: "SmartHomeScene",
    title: "Aqara Roller Shade Driver E1 Review",
    url: "https://smarthomescene.com/reviews/aqara-roller-shade-driver-e1-review/",
    market: "UK",
    note: "Går igenom kedjemotorn lokalt via Home Assistant och beskriver den som mycket tystgående. Ljudbetyget på 4,0 vilar på den här iakttagelsen och på HomeKit News nedan.",
  },
  {
    publisher: "HomeKit News",
    title: "Aqara Roller Shade Driver E1 (review)",
    url: "https://homekitnews.com/2021/09/22/aqara-roller-shade-driver-e1-review/",
    market: "UK",
    note: "Sätter 8,5 till 9,5 av 10 på delbetygen och lyfter att motorn är betydligt tystare än föregångarens. Den återkommande invändningen är att den är långsam.",
  },
  {
    publisher: "Aqara",
    title: "Curtain Driver E1 (Track Version) User Manual",
    url: "https://www.aqara.com/eu/product/curtain-driver-e1-track-version/user-manual/",
    kind: "standard",
    note: "Sidan 3 avgör vilka skenor produkten får sitta på: både U-skena och I-skena, och I-skenan ska vara slät och bredare än 10 mm. Ligger bakom att den är den enda i rankningen som svarar på I-skena.",
  },
  {
    publisher: "Android Police",
    title:
      "Aqara Curtain Driver E1 review: Smart but expensive curtain automation",
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
    title:
      "Test: IKEA Fyrtur, smart rullgardin styrs med app och fjärrkontroll",
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
    title:
      "Rullgardin bäst i test, guide till mörkläggande och smarta rullgardiner",
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
/**
 * Källor för /rorelsevakt-utomhus.
 *
 * ## Inget enda oberoende test finns
 *
 * Sökt på svenska, norska och danska. Råd & Rön, Ljud & Bild och tek.no har
 * ingen provning av kategorin. De fem svenska sidorna i sökresultatet är
 * affiliatelistor utom Bygghemmas, som är en butiks jämförelse av det egna
 * sortimentet och därför märkt `standard`. Samma läge som /utomhustimer.
 *
 * ## Karl H Ström bär merparten av specifikationerna
 *
 * De är Steinels svenska distributör och publicerar hela den tekniska
 * databladstexten per modell — belastning i mikrofarad, antal drivdon,
 * omgivningstemperatur, luxområde och efterlystid. Det är tier B och inte
 * tillverkaren själv, men det är den enda svenska källan som har talen alls,
 * och de fyra Steinel-modellerna i rankningen vilar på den.
 */
export const RORELSEVAKT_UTOMHUS_SOURCES: Source[] = [
  {
    publisher: "Elsäkerhetsverket",
    title: "Säker el utomhus",
    url: "https://www.elsakerhetsverket.se/privatpersoner/du-ar-ansvarig-for-elen/saker-el-utomhus/",
    market: "SE",
    kind: "standard",
    note: "Uttag utomhus ska alltid vara skyddsjordade, och för nya uttag gäller dessutom krav på jordfelsbrytare. Det är den regel som avgör vad du får koppla en rörelsevakt till, och den som gör installationen till ett jobb för behörig elinstallatör.",
  },
  {
    publisher: "Elsäkerhetsverket",
    title: "Julbelysning och IP-klass",
    url: "https://www.elsakerhetsverket.se/om-oss/press/nyhetsbrev/2024/december/nyhetsbrev-fran-elsakerhetsverket-december-2024/julbelysning-och-ip-klass/",
    date: "2024-12",
    market: "SE",
    kind: "standard",
    note: "Myndighetens gräns för vad som får sitta ute: IP44 eller högre siffervärde. Det är golvet varje produkt i jämförelsen klarar, och skälet att kriteriet väderskydd mäter steget över gränsen i stället för gränsen själv.",
  },
  {
    publisher: "Karl H Ström",
    title: "Steinel rörelsevakter, tekniska data per modell",
    url: "https://khs.se/produkt-kategori/sensorer/rorelsevakt/",
    market: "SE",
    kind: "standard",
    note: "Steinels svenska distributör, och den enda svenska källan som publicerar hela belastningsraden: mikrofarad, antal drivdon, minsta last och omgivningstemperatur per modell.\n\nHärifrån kommer talen för IS 240, IS 180-2, IS 130-2 och IS 1, och även den nyare generationens sätt att räkna. IS 3180 delar lasten efter lampstorlek och IS 2160 ECO anger 250 W LED rakt av.",
  },
  {
    publisher: "Proffsmagasinet",
    title: "Rörelsevakter, 348 artiklar med specifikationer",
    url: "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter",
    market: "SE",
    kind: "standard",
    note: "Kategorins bredaste sortiment i svensk handel och den butik som bär både Steinel, ESYLUX, Niko och Schneider. Härifrån kommer ESYLUX MD 120:s startström på 4,5 A och Schneiders uppdelning i 200 W LED mot 2 200 W resistiv last, som är sidans tydligaste enskilda belägg.",
  },
  {
    publisher: "Nexa",
    title: "Z-Wave SP-816, teknisk data",
    url: "https://nexa.se/smarta-hem/z-wave/sp-816",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen specifikation, och den enda i kategorin som villkorar räckvidden med både monteringshöjd och lufttemperatur: tio meter vid två meters montage under tjugo grader.",
  },
  {
    publisher: "Biltema",
    title: "Rörelsevakt IP44, bruksanvisning 46-207",
    url: "https://docs.biltema.com/v2/documents/file/da/ddd5551c-4063-4a7b-8413-55eeccb878bf",
    market: "SE",
    kind: "standard",
    note: "Manualen bär det produktsidan inte har: skymningsreläets område 5 till 200 lux, inkopplingstiden 10 sekunder till 4 minuter och rådet att inte montera vakten nära utsläpp från värmepump eller ventilation, eftersom varm luft utlöser den.",
  },
  {
    publisher: "Bygghemma",
    title: "Rörelsevakt utomhus bäst i test 2026",
    url: "https://www.bygghemma.se/reportage-och-guider/rorelsevakt-utomhus-bast-i-test/",
    date: "2026-02",
    market: "SE",
    kind: "standard",
    note: "Den enda seriöst gjorda svenska jämförelsen i kategorin, med egen redaktion och daterad. Citeras som standard och inte som test, eftersom Bygghemma är butiken och de tre produkter de jämför är tre produkter de själva säljer. Deras text är också den enda i handeln som skriver ut att räckvidden gäller den som går tvärs och inte rakt emot.",
  },
  {
    publisher: "Philips Hue",
    title: "Hue Outdoor Sensor, produktspecifikation",
    url: "https://www.philips-hue.com/sv-se/p/hue-outdoor-sensor/8719514342262",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens specifikation för den batteridrivna sensor som ligger bland övervägda: IP54, två AA-batterier och drift ned till −20 grader.",
  },
];

export const VATTENLARM_SOURCES: Source[] = [
  {
    publisher: "Brandinfo",
    title: "Recension av X-Sense smart brandsäkerhetssystem",
    url: "https://brandinfo.se/brandvarnare/x-sense-fs31-smart-brandsakerhetssystem/",
    market: "SE",
    kind: "test",
    note: "Recension av X-Sense-systemet med basstationen SBS50 och vattenvarnaren SWS51, alltså tekniken bakom både vinnaren och sjätteplatsen. Täcker en av nio rankade produkter, vilket är för lite för ett eget testomdöme-kriterium. Skälet står i viktningen.",
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
    title:
      "Ändringar och nyheter i Branschregler Säker Vatteninstallation 2026:1",
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
    note: "Certifikat C901472 enligt CR 139, som omfattar både batteridriven och nätansluten modell samt löpande tillverkningskontroll. Tillverkarens egen uppgift. Numret är det din VVS-installatör kan slå upp mot RISE register när branschreglerna gäller ditt bygge.",
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
    note: "Anger typgodkännandet EN 3-7/8 direkt i produkttexten, tillsammans med manometer, övertrycksventil och att släckaren får användas mot elektrisk utrustning upp till 1 000 V på en meters avstånd. Källa till samtliga uppgifter om Biltemas tre släckare.",
  },
  {
    publisher: "Brandskyddsföreningen",
    title: "Norm Hembrandsläckare SBF 2011:1",
    url: "https://www.brandskyddsforeningen.se/globalassets/blandade-pdfer/norm-hembrandslackare-webb.pdf",
    date: "2015-03-01",
    market: "SE",
    kind: "standard",
    note: "Sidans viktigaste källa, och den som avgör hur vi betygsätter färgen. Normen slår fast att en hembrandsläckare ska uppfylla samtliga krav i SS-EN 3-7 utom punkt 16.1 om färgen, vara pulver, väga 6 kg och klara provbål 43A och 233B.\n\nDärav följer att en vit släckare inte kan vara EN 3-7-certifierad, och att undantaget uttryckligen inte gäller bostäder som hyrs ut.",
  },
  {
    publisher: "Brandskyddsföreningen",
    title: "Handbrandsläckare",
    url: "https://www.brandskyddsforeningen.se/brandsakerhet-i-hemmet/hemma/brandslackare/",
    market: "SE",
    kind: "standard",
    note: "Rekommendationen om minst 6 kg pulver för hem, villa, fritidshus och kontor, en släckare per våningsplan i flervåningshus, och att släckaren ska vara certifierad av SBSC, DNV eller annat Swedac-ackrediterat organ.",
  },
  {
    publisher: "Dafo",
    title: "Standarder, regler och råd för brandsläckare",
    url: "https://www.dafo.se/produkter/brandslackare/standarder-regler-och-rad/",
    market: "SE",
    kind: "standard",
    note: "Branschens genomgång av SS-EN 3. Bidrar med att standarden reglerar färgsättning vid sidan av storlek och släckmedelsmängd, och med spannet för effektklasserna: A från 5 till 55, B från 21 till 233.",
  },
  {
    publisher: "Housegard",
    title: "Brandsläckare 6 kg pulver, röd, specifikation",
    url: "https://housegard.se/sv/produkter/brandsakerhet/brandslackare/pulverslackare/p/housegard-6-kg-pulverslackare-pe6hr-a-55a",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen specifikation för art. 600170: certifiering EN3-7, CE och Wheelmark, temperaturområde −30 till +60 °C, arbetstryck 15 bar, kastlängd 4–6 m, tömningstid 22 sekunder. Den vita systermodellen 600169 har samma modellbeteckning och enbart CE, vilket är hela färgpoängen på sidan.",
  },
  {
    publisher: "Deltronic Security",
    title: "Brandsläckare ABC, produktblad 6 kg och 2 kg",
    url: "https://brandvarnare.se/wp-content/uploads/sites/3/2024/06/Brandslackare-ABC.pdf",
    market: "SE",
    kind: "standard",
    note: "Importörens eget produktblad för art. 60500, 60505, 60510 och 60515. Källa till temperaturområde, fylld vikt, arbetstryck och provtryck, och till att röda släckare anges enligt SS-EN 3 medan vita anges enbart med CE.\n\n⚠️ Bladet beskriver en äldre fyllning och anger 42A där de nuvarande produktsidorna anger 43A och 55A. Vi följer de aktuella sidorna och noterar avvikelsen.",
  },
  {
    publisher: "Ogniochron",
    title: "Bruksanvisning för portabla brandsläckare, IO-01",
    url: "https://brandvarnare.se/wp-content/uploads/sites/3/2025/01/IO-01-Wyd.-B-11.2022-SE.pdf",
    date: "2022-11",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens manual för de tre släckare Brandvarnare.se säljer. Bidrar med brukstiden: högst 20 år, med utvändig besiktning varje år och kontroll av behållare, släckmedel och ventil minst vart femte år, samt 24 månaders garanti från tillverkningsdatum.",
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
    title:
      "EN 50291-1:2018 och EN 50291-2:2019, produktstandarder för CO-varnare",
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
    note: "Den enda oberoende part vi hittat som faktiskt mäter CO-varnare. De finner att flera varnare underrapporterar halten och larmar för sent, och anger att en X-Sense Portable tog nitton minuter vid 400 ppm, en nivå som är livsfarlig inom timmar. Citeras som standard och inte som test av två skäl: de provar mot amerikanska UL 2034 med helt andra tröskeltider, och modellen de provat är inte XC01-M som vi rankar. Ett omdöme om ett märke är inte ett omdöme om en produkt.",
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
    publisher: "Housegard",
    title: "Manual 604024, Housegard CA108, med försäkran om överensstämmelse",
    url: "https://housegard.se/Product/Files/Global/604024%20Manual%20Housegard%20CA108%20Global.pdf",
    market: "SE",
    kind: "standard",
    note: 'Tillverkarens egen manual, och källan till vinnarens uppgifter. Försäkran om överensstämmelse anger EN 50291-1:2018 och EN 50291-2:2019, och manualen skriver ut att varnaren har tio års livslängd räknat från tillverkningsdatum. Här står också larmtrösklarna, ljudtrycket 85 dB på 3 meter, driftstemperaturen och att varnaren visar "END" i displayen när sensorn är förbrukad.',
  },
  {
    publisher: "Netatmo",
    title: "EU-försäkran om överensstämmelse, NCO01, samt användarmanual",
    url: "https://www.netatmo.com/sv-se/smart-carbon-monoxide-alarm",
    kind: "standard",
    note: "Tillverkarens egna dokument, länkade från produktsidan. Försäkran anger både EN 50291-1:2018 och EN 50291-2:2019, alltså båda delarna, medan den svenska butiken bara angav del 2. Manualens tabell över egenskaper som täcks av NF-märkningen ger sensorns livslängd på tio år, livslängdsindikering och att enheten inte kopplas ihop med andra detektorer.",
  },
  {
    publisher: "Fireblitz",
    title: "Specifikationsblad 8162 V1.2 för CO10-RF",
    url: "https://www.fireblitz.co.uk/wp-content/uploads/2025/06/FIREHAWK-8162-V1.2-CO10-RF-Specification-Sheet-2025.pdf",
    date: "2025",
    kind: "standard",
    note: "Tillverkarens aktuella specifikationsblad, och skälet till att varnaren flyttades från femte till andra plats. Det anger BS EN 50291-1:2018 och -2:2019, Kitemark-numret KM 573122, livslängdsindikering och tio års garanti. Den svenska butiken angav utgåvorna från 2010 och 2012, alltså de som föregick dagens.",
  },
  {
    publisher: "Deltronic",
    title: "Produktblad och manual för CO7BD",
    url: "https://deltronic.se/wp-content/uploads/2024/01/Produktblad-SE-CO7BD.pdf",
    date: "2024",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens produktblad anger BS EN 50291-1:2018 och -2:2019, liksom manualen från mars 2022. ⚠️ Deltronics egen specifikationstabell på webben anger fortfarande 2010-utgåvorna. Vi följer PDF:erna: de är nyare och mer specifika, och en manual reviderad ett halvår efter att 2010-utgåvan drogs tillbaka är den interna konsistensen som avgör.",
  },
  {
    publisher: "X-Sense",
    title: "Produktspecifikation XC01-M för EU-marknaden, DOC 230613XC01MEU",
    url: "https://xsensepro.nl/wp-content/uploads/2025/08/X-SENSE_XC01-M_Product-Specification.pdf",
    kind: "standard",
    note: "Tillverkarens specifikation för EU-marknaden. Den anger EN 50291-1:2018, tio års livslängd på enheten, sammankoppling av 24 enheter och 500 meters räckvidd. Här står också driftstemperaturen 4 till 38 °C, alltså den uppgift som gör varnaren olämplig i ett ouppvärmt utrymme och som ingen butik för vidare.",
  },
  {
    publisher: "TÜV Rheinland",
    title: "Certipedia, testmärke 1111291538, certifikat 50649025",
    url: "https://www.certipedia.com/quality_marks/1111291538?certificate_number=50649025&locale=en",
    kind: "standard",
    note: "TÜV Rheinlands öppna certifikatregister, där XC01-M står namngiven bland de modeller som omfattas av typgodkännandet. Använt för att kontrollera en uppgift från butiksledet mot utfärdaren själv, vilket är den enda kontroll som betyder något för ett provningsmärke.",
  },
  {
    publisher: "Heiman",
    title: "HS-720ES-serien, tillverkarens specifikation",
    url: "https://www.heimantech.com/product/carbon-monoxide-alarm-hs-720es-series",
    kind: "standard",
    note: "Tillverkaren anger sensorns livslängd till tio år och batteritiden till fem, samt över 85 dB på 3 meter och drift mellan -10 och +40 °C. Den svenska distributörens tvåårssiffra är en garantitid och inte sensorns liv, en sammanblandning som tidigare kostade varnaren betyg på den här sidan.",
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
    note: "Tillverkarens marknadsföringssida, och den som säger emot sin egen bruksanvisning. Här anges karmtjockleken till 15 till 34 centimeter, och 34 står även i sidtiteln, medan bruksanvisningen anger 15 till 30 och Clas Ohlsons frågespalt svarar samma sak. Vi publicerar 30. Sidan anger också EN 131-6, medan manualen anger EN 131-1 och EN 131-2.\n\nDen är ändå värd att läsa för underhållsråden, som ingen butik för vidare: kontroll två gånger om året, förvaring under 50 grader och utan direkt solljus, och byte efter sex till åtta år.",
  },
  {
    publisher: "Housegard",
    title: "Bruksanvisning brandstege EL45S, PDF som Kjell länkar från produktsidan",
    url: "https://www.kjell.com/globalassets/mediaassets/897328_21053_stege_manual_se_no.pdf",
    market: "SE",
    kind: "standard",
    note: 'Sidans mest värdefulla dokument, och det ingen butik sammanfattar. Under Tekniska data står maximal belastning 200 kg testad till 450, maximal evakueringshöjd 4,7 meter mätt från fönstrets nederkant, maximal karmtjocklek 30 cm och godkännande enligt CE, EN 131-1:2007+A1-2011 och EN 131-2:2010.\n\nTvå meningar i löptexten ändrar hur produkten ska läsas. "Stegen är avsedd att användas av en person åt gången", vilket gäller framför både 200 och 450 kilo. Och en varning om att stegen inte får användas från fönster rakt ovanför ett annat, eftersom "avståndsklossarna på stegen" kan krossa rutan under, vilket är beviset för att stegen har distanser mot väggen. Biltemas manual för artikel 21-500 är samma dokument med samma bilder.',
  },
  {
    publisher: "SAVS",
    title: "Användarmanual utrymningsstege ESC-450 till ESC-2000, PDF hos Brandvarnare.se",
    url: "https://brandvarnare.se/wp-content/uploads/sites/3/2025/01/SAVS-manual-8fold-version-FINAL-v1.1-SE.pdf",
    market: "SE",
    kind: "standard",
    note: 'Tillverkarens manual till båda de stegar Brandvarnare.se säljer, publicerad av butiken själv under fliken Dokument. "Denna stege är endast avsedd för engångsbruk", "Det rekommenderas att byta ut denna stege efter 5 år", och om transportbandet: "gör inte det vid övning."\n\nSamma butiks produktsidor beskriver hur du övar genom att fälla ut stegen hela vägen ned mot marken. Specifikationstabellen i manualen ger också 13 respektive 21 fotsteg och 4,8 respektive 6,5 kilo.',
  },
  {
    publisher: "Jula",
    title: "Bruksanvisning Hard Head brandstege 025385, One time use fire ladder",
    url: "https://assets.cdn.jula.com/v2/177003",
    market: "SE",
    kind: "standard",
    note: 'Manualens titel är hela beskedet: "ONE TIME USE FIRE LADDER / Brandstege för engångsbruk." Tekniska data anger 150 kg maximal belastning och måtten hopfälld 18,5 × 37 × 25 cm och utfälld 430 × 31 × 43 cm. Det sista talet är stegens djup i utfällt läge, inte ett väggavstånd, och vi publicerade det som väggavstånd fram till 2026-08-06.\n\nSamma manual anger att fönsterbrädjupet får vara maximalt 30 cm, inte 28 som vi publicerade, att produkten bör bytas vart femte år, och att högst tre personer får använda stegen samtidigt trots de 150 kilona på föregående sida.',
  },
  {
    publisher: "Nexa",
    title: "Produktblad brandstege FLB-104, PDF som Bauhaus länkar",
    url: "https://www.bauhaus.se/brandstege-nexa-flb-104-4m",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens eget produktblad anger maximal belastning 450 kg. Bauhaus, som säljer stegen och länkar produktbladet på samma sida, anger 400 kg i sin specifikation. Etiketten på stegen i produktbladets egen bild läser 450 kg. Bladet ger också vikten 4,5 kg, tolv fotsteg, 30 cm stegbredd och maximal evakueringshöjd 4,3 meter.",
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
    note: 'SIS anger utgåvekedjan: del 1 från 2015 är ersatt av +A1:2019 och därefter av +A2:2025, del 2 från 2010 via +A1:2012 och +A2:2017 av +A3:2025. Housegards egen bruksanvisning anger EN 131-1:2015+A1:2019 och EN 131-2:2010+A2:2017, alltså en ändring efter den gällande i vardera delen, medan Kjells produktsida anger grundutgåvorna. Vi följer tillverkaren. SIS återger också standardens omfattning, "portable ladders", vilket förklarar varför en ren EN 131-hänvisning inte beskriver infästningen i fasaden.',
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
    note: "Källa för priset 3 695 kronor, maxlasten 150 kilo, totallängden 3,86 meter mot produktnamnets 3,9 och att stegen har halkskyddade steg. Standarduppgiften på sidan anger grundutgåvorna av EN 131-1 och -2; tillverkarens egen bruksanvisning anger nyare utgåvor och är den vi följer.",
  },
  {
    publisher: "Housegard",
    title: "Bruksanvisning utrymningsstege EL39, art 605020, ver 250320",
    url: "https://www.housegard.se/Product/Files/Global/605020%20-%20User%20manual%20-%20EL39%20-%20GB_SE_NO_DK_FI_EE%20-%20Ver%20250320.pdf",
    date: "2025-03-20",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen bruksanvisning, och den bar tre uppgifter som ingen butik för vidare: stegbredd 240 millimeter, avstånd mellan steg 300 millimeter, och provning enligt EN 131-1:2015+A1:2019 och EN 131-2:2010+A2:2017. Här står också väggfästets mått 50 × 114 millimeter, hela förpackningsinnehållet och rekommenderat fäste för trävägg, tegelmur och lecavägg. Läst 2026-08-06.",
  },
  {
    publisher: "Skeppshultstegen",
    title: "Produktblad och monterings- och bruksanvisning, utrymningsstege fällbar",
    url: "https://skeppshultstegen.se/sv/tak-fasadstegar/utrymningstege.html",
    market: "SE",
    kind: "standard",
    note: 'Tillverkarens två egna dokument, båda länkade från produktsidan. Monteringsanvisningen anger "Stegpinnarna har ett avstånd centrum - centrum på 300 mm" och en fullständig infästningstabell för sju väggmaterial, från träskruv A4 i panel till injekteringsmassa i håltegel och lättklinker, med dragkraft och tvärkraft per infästning. Produktbladet anger sex längder, stegantal per längd, bredd 430 millimeter utfälld och 67 infälld, samt vikt 11,8 kilo för 3,9 meter. Läst 2026-08-06.',
  },
  {
    publisher: "RISE",
    title: "Certifikat C900764 och typkontrollintyg 102102, Hultafors Group",
    url: "https://www.wsteps.se/documents/certificates",
    date: "2023-09-24",
    market: "SE",
    kind: "standard",
    note: "Lästa i sin helhet för att avgöra vad W.Steps utrymningsstegar omfattas av. P-märket C900764 gäller taksäkerhetsanordningar, och produktlistan på sidan 2 innehåller fyra glidskydd för lösa stegar. Typkontrollintyg 102102 listar bärbara stegar och arbetsbockar över fyra sidor. Utrymningsstegarnas artikelnummer, 727xxx, 729xxx och 741xxx, finns i ingetdera. Frånvaron av tredjepartsprövning är alltså belagd och inte antagen.",
  },
  {
    publisher: "W.steps",
    title: "Utrymningsstegar 320, 400 och 120, tillverkarens produktsidor",
    url: "https://www.wsteps.se/products/wall-and-roof-products/escape-ladders",
    market: "SE",
    kind: "standard",
    note: 'Källa för stegantal och vikt per längd, vilket ger stegavståndet 300 millimeter på samtliga nio modeller, samt för att 320 får skarvas till 7,2 meter och 400 till 18. Tillverkaren skriver att inga bultar medföljer eftersom väggkonstruktionen varierar, och positionerar serierna: "Välj mellan 320-stegen för privata hus och den lite bredare 400-stegen för kommersiella fastigheter." Våningsskarven för 400 gör att stegen kan öppnas på flera våningar samtidigt. Läst 2026-08-06.',
  },
  {
    publisher: "Bauhaus",
    title: "Utrymningsstege Skeppshultstegen aluminium, tre längder",
    url: "https://www.bauhaus.se/bygg/stegar-byggstallningar/stegar/utrymningsstegar",
    market: "SE",
    kind: "standard",
    note: "Källa för priset 7 799 kronor och för att kategorin Utrymningsstegar hos Bauhaus även innehåller två hängande repstegar, vilket är varför de två produkttyperna blandas ihop i svensk handel. Bauhaus anger bredd utfälld 400 millimeter och vikt 13,0 kilo; tillverkarens eget produktblad anger 430 respektive 11,8. Vi följer tillverkaren och konflikten står i underlaget.",
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
    note: 'Kortaste dokumentationen och den mest uppseendeväckande formuleringen: "when you enable the privacy zones feature, activity in the privacy zones may not be avoided completely to be recorded." Alltså att maskeringen inte säkert hindrar inspelning. Högst två zoner per kamera.\n\neufys nuvarande artikel på support.eufy.com anger funktionen för "one camera or doorbell" utan modellbegränsning. Den separata artikeln över vilka modeller som stöder zoner motsäger sig själv, eftersom rubriken räknar upp SoloCam C210, S230 och eufyCam E330 medan artikelnumren under inte gör det. Vi drar därför inga slutsatser om enskilda modeller ur den listan.',
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
    title:
      "Bäst i test övervakningskamera, bästa kameran för inomhus och utomhus",
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
    title:
      "Kamerabevaka inom privatundantaget, exemplet dörrkamera i lägenhetshus",
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
    publisher: "Google",
    title: "Set up and use Activity Zones",
    url: "https://support.google.com/googlenest/answer/9207697",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: 'Avgör betyget för Google Nest Doorbell. Googles egen hjälptext skriver ut vad en aktivitetszon gör och inte gör: "Although Activity Zones doesn\'t change the footage your camera streams and records, when you add a zone, you can get more useful alerts as it tells you where the motion has happened." Zonen styr alltså notiser och inte bilden, och är därmed den zontyp vår skala sätter lägst. Samma begreppsskillnad som gäller eufy, se den bortvalda posten.',
  },
  {
    publisher: "Arlo",
    title: "Arlo Secure, svenska abonnemangspriser",
    url: "https://www.arlo.com/sv_se/serviceplans",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: "Rättar noteringen att inget abonnemangspris gick att läsa. Arlo publicerar hela tabellen öppet: Arlo Secure 99 kr i månaden eller 1 089 om året för en enhet, 149 kr eller 1 639 för flera, Secure Plus 239 kr eller 2 629, Secure Pro 289 kr eller 3 179. Det var adressen vi tidigare provat som var fel, inte källan som var stängd.",
  },
  {
    publisher: "Ring",
    title: "Ring-abonnemang för Sverige",
    url: "https://ring.com/se/sv/plans",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: "Ring prissätter sina svenska planer i euro. Basic täcker en dörrklocka eller kamera för 3,99 € i månaden eller 39,99 € om året och ger upp till 180 dagars händelsehistorik; Standard 9,99 € eller 99,99 € för alla enheter på en adress; Premium 19,99 € eller 199,99 € med inspelning dygnet runt. Utan plan sparar Ring ingenting.",
  },
  {
    publisher: "Google",
    title: "Google Home Premium, tidigare Nest Aware",
    url: "https://store.google.com/se/product/nest_aware?hl=sv",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: "Nest Aware heter numera Google Home Premium. Standard kostar 100 kr i månaden eller 1 000 om året och ger 30 dagars händelsebaserad videohistorik; Advanced 200 kr eller 2 000 om året och ger 60 dagar plus inspelning dygnet runt, dock bara 10 dagars dygnetruntshistorik och bara för kameror och dörrklockor med kabel, vilket den batteridrivna Nest Doorbell inte är.",
  },
  {
    publisher: "Imou",
    title: "Doorbell 2S Kit, tillverkarens datablad",
    url: "https://static-website.imoulife.com/9e0f2f62-7aab-4d6f-ae00-87dcf5c8c15a.pdf",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: 'Bär de mått Kjell inte publicerar: synfältet uppdelat i 125° horisontellt, 98° vertikalt och 166° diagonalt, laddtemperatur 0 till 45 °C mot drifttemperatur -20 till 50 °C, och förpackningsinnehållet med chime och chime-plugg. Databladet räknar upp produktens funktioner i sin helhet, och den zon som finns är en detekteringszon; det Imou själva kallar integritetsskydd på den här modellen är röstförvrängning och snabbsvar. Imou marknadsför "Privacy Mask" uttryckligen på de modeller som har det, exempelvis Ranger Pro.',
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
    title: "Arlo Essential Pan Tilt Indoor Camera FAQ",
    url: "https://www.arlo.com/en_gb/support/faq/000063618/arlo-essential-pan-tilt-indoor-camera-faq",
    date: "2026-08-06",
    market: "UK",
    kind: "standard",
    note: 'Tillverkarens beskrivning av avstängningen på just den modell vi rankar: "Your Arlo Essential Pan Tilt Indoor Camera enters a privacy state when the system is in Standby or Arm Home mode. The camera moves to a downward-facing position, stops motion detection, and turns off its microphone." Mekaniken är alltså att kameran lutar ner objektivet mot foten, inte att en lucka fälls för linsen. Arlos produktblad för samma modell lägger till att läget också går att slå på för hand med ett tryck i appen, och att det går att knyta till egna rutiner: "Tilt to hide - Camera points fully down so the lens is covered by the base."',
  },
  {
    publisher: "Arlo",
    title: "Essential Pan Tilt Indoor Camera, användarmanual (VMC3073/2073)",
    url: "https://www.arlo.com/content/dam/arlo/support/user-manuals/essential-3-ptz-indoor/UM_E3%20PTZ%20Indoor%20(VMC3073_2073)_EN.pdf",
    date: "2025-10-01",
    market: "UK",
    kind: "standard",
    note: 'Manualen täcker båda varianterna, HD (VMC2073) och 2K (VMC3073), och det är HD-varianten Kjell säljer i tvåpack. Härifrån kommer synfältet, 130 grader, rörelseomfånget 360 grader horisontellt och 180 vertikalt, och drifttemperaturen 0 till 45 grader. Manualen listar avstängningen som "Privacy mode" bland kamerans funktioner och nämner inget motoriserat linsskydd, vilket är skillnaden mot den fasta Essential Indoor.',
  },
  {
    publisher: "TP-Link",
    title: "Privacy Mode on Tapo and Kasa Cameras",
    url: "https://www.tp-link.com/nordic/support/faq/2791/",
    date: "2026-07-01",
    market: "SE",
    kind: "standard",
    note: 'Källan till både programläget och den fysiska knappen. "When Privacy Mode is enabled on a Tapo or Kasa camera, it stops streaming and recording both video and audio", alltså både bild och ljud och inte bara inspelningen. Och: "Select Tapo camera models, such as Tapo C125 and Tapo C225, support a physical privacy button. Pressing it lowers a shield over the lens or rotates the lens away for complete privacy." Det är den uppgiften som gör C225 till sidans vinnare.',
  },
  {
    publisher: "TP-Link",
    title: "Specifikationer för Tapo C100, C220 och C225",
    url: "https://www.tapo.com/en/product/smart-camera/tapo-c100/",
    date: "2026-08-06",
    market: "US",
    kind: "standard",
    note: "Tillverkarens egna specifikationstabeller bär objektivets synfält, som den svenska produktsidan lämnar tom för C100. C100 anges till 117 grader diagonalt, 98,8 horisontellt och 53,5 vertikalt, med 1080p och minneskort upp till 512 GB. C220 anges till 89,7 diagonalt och 76,2 horisontellt, C225 till 100 diagonalt och 83 horisontellt. Det är alltså den mest sålda kameran i kategorin som har det bredaste objektivet av de tre, medan de dyrare kompenserar genom att vrida sig.",
  },
  {
    publisher: "Aqara",
    title: "Camera Hub G3, produktsida och specifikation",
    url: "https://www.aqara.com/en/product/camera-hub-g3/",
    date: "2026-08-06",
    market: "US",
    kind: "standard",
    note: 'Tillverkaren beskriver en fysisk avstängning under rubriken Physical Masking: "The G3 Camera Hub has a hardware privacy protection mode that can be turned on manually or automatically. This mode can be easily identified by a cute sleepy face." Linsenheten vrids alltså bort och framsidan visar ett sovande ansikte. Specifikationssidan ger 2K 2304 × 1296, 110 graders objektiv, rörelseomfång 340 grader horisontellt och 45 vertikalt, samt minneskort upp till 128 GB.',
  },
  {
    publisher: "Ring",
    title: "Indoor Cam Plus och Pan-Tilt Indoor Cam, specifikationer",
    url: "https://ring.com/support/products/cameras/pan-tilt-indoor-cam",
    date: "2026-08-06",
    market: "UK",
    kind: "standard",
    note: "Tillverkarens specifikation skiljer de två modellerna åt på ett sätt butikstexten inte gör. Pan-Tilt har ett inbyggt linsskydd, 143 graders objektiv och rörelseomfång 360 gånger 169 grader, medan Indoor Cam Plus har ett löst linsskydd i förpackningen, 138 grader diagonalt och 115 horisontellt, och står stilla. Båda anges till minst fyra års säkerhetsuppdateringar efter att modellen slutat säljas, vilket ingen annan tillverkare här utfäster.",
  },
  {
    publisher: "Ring",
    title: "Ring Home, abonnemangsplaner för Sverige",
    url: "https://ring.com/se/en/plans",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: "Rings svenska prislista, som avgör vad de två Ring-kamerorna faktiskt kostar. Basic täcker en dörrklocka eller kamera för 3,99 euro i månaden eller 39,99 om året, Standard täcker alla enheter på en adress för 9,99 euro i månaden, och Premium 19,99. Utan plan sparas ingen inspelning alls, eftersom ingen av modellerna har lokal lagring.",
  },
  {
    publisher: "Arlo",
    title: "Arlo Secure, abonnemangsplaner för Sverige",
    url: "https://www.arlo.com/sv_se/serviceplans",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: "Arlos svenska prislista. Arlo Secure kostar 99 kronor i månaden för en kamera och 149 kronor för flera, vilket är den nivå ett tvåpack kräver. Eftersom modellen saknar lokal lagring är det abonnemanget som avgör om den spelar in något över huvud taget, och tre år på 149 kronor kostar mer än fyra Tapo C225 gör att köpa.",
  },
  {
    publisher: "Kjell & Company",
    title: "Övervakningskameror inomhus, 62 artiklar",
    url: "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus",
    market: "SE",
    kind: "standard",
    note: "Butikskälla för priser och kundbetyg, och den butik alla sju länkar går till. Kundomdömena är sidans enda underlag som kommer från köpare i stället för från tillverkare, och två av dem är ovanligt tunga: Tapo C100 har 578 omdömen och C220 461, fler än någon annan produkt vi rankat i någon kategori.",
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
    title:
      "Övervakningskamera bäst i test, vi jämför modeller med smarta funktioner",
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
    note: 'Sidans viktigaste källa och en primärkälla. Certifikat 21-537, innehavare ASSA ABLOY Opening Solutions Sweden AB, klass S3 enligt SSF 3523 utgåva 1, ordning Scheme 5 enligt ISO/IEC 17067:2013, giltigt till 2027-11-27. Certifikatets fält Additional anger vad godkännandet omfattar: "Gäller bortasäkert läge med blockerade användarkoder och låsöppning med nyckelbricka eller med appen Yale Home." Den digitalt certifierade konfigurationen har alltså användarkoderna blockerade, på den produkt kategorin är uppkallad efter.\n\nYale Doorman L3S omfattas av samma certifikat: tillverkarens eget produktblad M4746.2409 anger "SSF 3522 klass 3 och SSF 3523 klass S3 Digital låsenhet, certifierat av SBSC". Datumfältet här är certifikatets giltighetstid och inte ett publiceringsdatum.',
  },
  {
    publisher: "Svensk Brand- och Säkerhetscertifiering",
    title: "Certifikat 22-316, 22-317 och 22-318, Nimly Code Pro",
    url: "https://www.sbsc.se/produktcertifikat/22-317/mekaniskt-lashus/nimly-touch-pro-nimly-code-pro/easyaccess-sverige-ab",
    date: "2027-09-07",
    market: "SE",
    kind: "standard",
    note: 'Tre certifikat, innehavare EasyAccess Sverige AB, samtliga klass 3 enligt SSF 3522 utgåva 2 och giltiga till 2027-09-07: mekatronikcylinder 22-316, mekaniskt låshus 22-317 och mekaniskt slutbleck 22-318. Alla tre bär samma villkorsfält: "Masterkoder och användarkoder ska ha minimum 4 siffror, anti-inbrottsfunktionen ska vara aktiverad, kamouflagefunktionen ska vara inaktiverad, bortasäkert läge ska vara aktiverat och 2-faktors autentisering ska vara aktiverat." Kamouflagefunktionen är den som omger koden med slumpsiffror, alltså en säljande funktion som ska stängas av. Nimlys egen produktsida bekräftar klassen: "Code Pro är certifierad enligt SBSC SSF 3522, låsklass 3."',
  },
  {
    publisher: "Svensk Brand- och Säkerhetscertifiering",
    title: "Certifikat 22-520, 22-521 och 22-522, Nimly Code",
    url: "https://www.sbsc.se/produktcertifikat/22-522/mekatronikcylinder/nimly-touch-nimly-code/easyaccess-sverige-ab",
    date: "2027-10-30",
    market: "SE",
    kind: "standard",
    note: 'Källan till varför Nimly Code inte når klass 3. Slutbleck 22-520 och låshus 22-521 är klass 3 enligt SSF 3522 utgåva 2, men mekatronikcylindern 22-522 är klass 2A. Eftersom en godkänd låsenhet kräver att varje ingående produkt når klass 3 var för sig kapar cylindern hela enheten till 2A. Samtliga tre giltiga till 2027-10-30 och med samma villkorsfält som systermodellen. Nimlys egen sida skriver samma sak: "Code låsen har ett certifikat för godkänd låsenhet utfärdat av SBSC enligt SSF 3522 Låsklass 2A."',
  },
  {
    publisher: "Svensk Brand- och Säkerhetscertifiering",
    title: "Certifikat 20-19 och 20-172, Yale Doorman och Yale Doorman L3",
    url: "https://www.sbsc.se/produktcertifikat/20-19/elektromekaniskt-lashus/yale-doorman/assa-abloy-opening-solutions-sweden-ab/",
    date: "2031-09-13",
    market: "SE",
    kind: "standard",
    note: 'Två elektromekaniska låshus enligt SSF 3522 utgåva 2. Certifikat 20-19 avser Yale Doorman, alltså den som säljs som Doorman Classic, och anger klass 2A med nytt certifikat utfärdat med giltighet till 2031-09-13. Villkor: "Integritetsswitchen ska vara ställd i nivå hög. Elektronisk nyckel eller elektronisk nyckel + PIN-kod ska användas för upplåsning. Automatisk låsning ska vara aktiverat." Certifikat 20-172 avser Yale Doorman L3 och anger klass 3 utan villkor, giltigt till 2030-10-22. Yales egen supportsida förklarar skillnaden mot äldre exemplar: produkten är oförändrad, men lås tillverkade till och med 2020-06-26 är klass 3 och lås efter det klass 2A, och klassen på förpackningen gäller oavsett inköpsdatum.',
  },
  {
    publisher: "Svensk Brand- och Säkerhetscertifiering",
    title: "Certifikat 24-365, Yale Linus L2",
    url: "https://www.sbsc.se/produktcertifikat/24-365/mekatronikcylinder/yale-linus-l2/assa-abloy-opening-solutions-sweden-ab",
    date: "2030-02-11",
    market: "SE",
    kind: "standard",
    note: 'Mekatronikcylinder, klass 2A enligt SSF 3522 utgåva 2, giltigt till 2030-02-11. Villkorsfältet lyder "Godkänt tillsamman med Yale DOT", alltså NFC-taggen som enligt butikens förpackningsinnehåll ligger i lådan. Certifikatet är skälet till att Linus L2 inte kan beskrivas som ett lås utan klass.',
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
    note: 'Butikskälla för priser, upplåsningsmetoder, batterityp, IP-klass och kundbetyg. Också den enda butik vi gått igenom som redovisar låsklass per produkt, och som skriver ut det negativa: för Aqara U200 står "OBS! Aqara Smart Lock U200 är inte godkänt enligt SSF 3522 klass 3 eller SSF 3523 klass S3." Det är sidans enda positivt belagda frånvaro av godkännande. Butikens klassuppgifter stämmer mot certifikaten där de finns: "Låsklass 2A och SSF3522" för Nimly Code och "Låsklass: Klass 3" för Nimly Code Pro. Klasserna för Yale Doorman Classic Home och Yale Linus L2 står inte hos butiken utan är hämtade ur certifikaten 20-19 och 24-365.',
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
    note: 'Ett av fyra bolag som publicerar hela priset. Abonnemang LILLA 349 kronor i månaden med bildverifiering, STORA 399 kronor i månaden med video. Startpaket i tre storlekar efter boendeform: lägenhet från 995 kronor, radhus från 1 495 och villa från 1 995. Avtalstiden står i §4.1 i de allmänna villkor sidan länkar till: "Avtalet gäller i tjugofyra (24) månader räknat från leveransdag och kan därefter sägas upp med en (1) månads varsel av vardera part." §7.1 låser månadsavgiften under de första 24 månaderna, och §15.7 anger att Securitas avaktiverar SIM-kortet vid avtalets slut och att kunden själv bekostar bortkopplingen.',
  },
  {
    publisher: "Avarn Security",
    title: "SAFE HOME",
    url: "https://www.avarnsecurity.se/tjanster/safe-home/",
    market: "SE",
    kind: "standard",
    note: "Publicerar en månadsavgift på 449 kronor rakt ut på tjänstesidan, vilket är mer än de flesta gör, men ingen startavgift. Sidan beskriver Crash and smash, alltså att en inkräktare som slår sönder panelen ändå registreras och larmcentralen får besked, samt inaktivitetslarm, visuell verifiering och att bilder skickas direkt vid larm. Avtalsvillkor för SAFE HOME finns inte publicerade: bolagets sitemap räknades upp i sin helhet den 6 augusti 2026 och innehåller integritetspolicy, cookie- och GDPR-sidor men inga allmänna villkor.",
  },
  {
    publisher: "Svenska Alarm",
    title: "Hemlarm, priser och kampanjer",
    url: "https://www.svenskaalarm.se/hemlarm/",
    market: "SE",
    kind: "standard",
    note: 'Publicerar ett från-pris: "Tjänster tillkommer från 175 kr/mån. Alla priser till privatperson är inklusive moms." Sidan innehåller också en delbetalningskalkylator för hårdvaran med löptider upp till 72 månader. Ett från-pris med tillägg går inte att räkna på, och en avbetalning över sex år binder kunden lika hårt som en bindningstid.',
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
    publisher: "Garda Alarm AB",
    title: "Villkor för hemlarm",
    url: "https://www.gardaalarm.se/uploads/1/3/5/0/135017696/garda_alarm_-_villkor_f%C3%B6r_hemlarm.pdf",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: 'Dokumentet som gav Garda Alarm två placeringars lyft, och det låg publicerat hela tiden. Punkt 2.5: "Kunden ska som privatkund betala en kostnad till Garda som f.n. är 1199 kr per år för säkerhetsavtalet", alltså uppkopplingen mot larmcentral enligt punkt 15. Punkt 14.1: "Samtliga tjänster har 36 månaders bindningstid", och avtalet förlängs ett år i sänder om uppsägning inte sker tre månader före avtalstidens utgång.\n\nPunkt 9.1 begränsar skadeståndsansvaret till 50 000 kronor och kräver skriftligt anspråk inom en månad. Punkt 9.3 ger självriskeliminering upp till 3 000 kronor och kräver både service- och säkerhetsavtal. Punkt 6.1 förbjuder kunden att koppla in produkter från annan leverantör, vid äventyr att garantin på hela systemet upphör.',
  },
  {
    publisher: "Garda Alarm AB",
    title: "Köp hemlarm",
    url: "https://www.gardaalarm.se/kop-hemlarm.html",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: 'Bolagets egen produktsida, med den andra löpande avgiften utskriven: "Serviceavtal ingår kostnadsfritt för alla nya kunder första året och förnyas sedan frivilligt för 695:-/år." Samma belopp står på kundtjänstsidan om larm- och serviceavtal, som också anger att ett servicebesök om 995 kronor krävs för att teckna serviceavtal i efterhand. Sidan namnger larmcentralen: Lövestad Larmcentral, uppgiven som certifierad enligt SBSC och SSF.',
  },
  {
    publisher: "Safeland AB",
    title: "Villkor för Safelands larmtjänster",
    url: "https://www.safeland.se/wp-content/uploads/2026/06/Villkor-Safelands-larmtjanster.pdf",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: 'Punkt 9: "Avtalet har ingen bindningstid eller uppsägningstid förutsatt att du inte betalar med avbetalning." Det gör Safeland till det enda av de åtta bolagen utan någondera.\n\nPunkt 6.2 beskriver larmcentralen som en tilläggstjänst: "Vi bedriver inte larmcentral eller väktarbolag i egen regi utan anlitar underleverantörer för dess utförande", och namnger Westra Security. Utryckning är kostnadsfri vid bekräftat inbrott, men "utan bevis på inbrott genom polisanmälan debiteras utryckningen till dig med 2400 kr". Bolaget förbehåller sig också rätten att neka utryckning där inget väktarbolag finns i närheten.',
  },
  {
    publisher: "Safeland AB",
    title: "Särskilda villkor för abonnemang av larmsystem, version 1.5",
    url: "https://www.safeland.se/wp-content/uploads/2026/06/Sarskilda-villkor-for-hyra-av-larmsystem-privat-1.5.pdf",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: 'Slår fast att systemet hyrs och inte köps, vilket vi tidigare angav tvärtom. "Du kan närsomhelst säga upp hyresavtalet", mot att kunden själv monterar ned, paketerar och bekostar returen. Prishöjningar begränsas till konsumentprisindex eller 5 procent per år och får inte ske alls under de första tolv månaderna. Friköp av hårdvaran erbjuds mot pris på förfrågan. Safeland får själva säga upp avtalet tidigast 36 månader efter startdatum.',
  },
  {
    publisher: "Safeland AB",
    title: "Larmpaket med abonnemang, webbutiken",
    url: "https://shop.safeland.se/se/butik/ajax/larm-bas-med-abonnemang/",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: 'Priset vi angav som opublicerat, i en webbutik på egen subdomän som bara är länkad från ordet Webbshop i sidfoten. Ordinarie 249 kr/mån och 3 990 kr i start, kampanjpris 198 respektive 2 490 den 6 augusti 2026. Produktsidan skriver ut villkoren: "Ingen bindningstid, ingen uppsägningstid" och "Med tjänsten hyr du larmsystemet, inklusive mobil datatrafik, support och full garanti. Du kan avsluta och återlämna systemet när du vill."\n\nHårdvaran är Ajax Hub 2 Plus med larmväg över ethernet, wifi och 4G, och sidan anger säkerhetsklass Grad 2. Larmcentral med väktare är en egen produkt, 1 490 kronor för tolv månader förbetalt, och ingår alltså inte i månadsavgiften. Det är den uppgiften som gör priset jämförbart med de bolag där larmcentralen ingår.',
  },
  {
    publisher: "Svenska Alarm",
    title: "Allmänna avtalsvillkor och villkor för Bemannad Larmcentral",
    url: "https://www.svenskaalarm.se/villkor/",
    date: "2026-08-06",
    market: "SE",
    kind: "standard",
    note: 'Sju separata villkorsdokument publicerade utan inloggning, fler än något annat bolag i jämförelsen lägger fram. De allmänna avtalsvillkoren punkt 6.3 anger tre månaders uppsägningstid och förlängning om uppsägning inte sker tre månader före bindningstidens utgång. Bindningstiden själv står bara som "överenskommen", alltså i det individuella kontraktet.\n\nVillkoren för Bemannad Larmcentral är den viktigare läsningen. Väktartjänsten utförs av ett bevakningsbolag som Svenska Alarm handlar upp åt kunden med fullmakt och "får ändras fritt av Svenska Alarm", och punkt 6.6 slår fast att bolaget inte ansvarar för bevakningstjänstens fullgörande, kvalitet, täckning eller tillgång. Väljer kunden inte väktartjänst skriftligt aktiveras ingen.',
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
    title:
      "SSF 140 utgåva 1, projektering och installation av inbrottslarmanläggningar med intern radioöverföring",
    url: "https://www.stoldskyddsforeningen.se/app/uploads/2019/11/Frhandsgranskning-SSF-140-01-Proj-o-inst-av-Inbrottslarmanl-med-intern-radioverfring.pdf",
    market: "SE",
    kind: "standard",
    note: 'Normen för precis den här produkten, publicerad fritt av SSF som förhandsgranskning. Utgåva 1, daterad 2005-09-13. Omfattningen enligt §1: "Dessa regler gäller för inbrottslarmanläggningar med intern trådlös förbindelse avsedda för i första hand användning inomhus i bostäder." Inledningen anger att reglerna specificerar krav som kan finnas i försäkringsvillkor, och §5.1 heter Larmklass R. Utgåva 2 är den gällande och säljs, så texten vi läst är den äldre.',
  },
  {
    publisher: "SBSC",
    title:
      "SSF 1112 Behörig installatör, inbrottslarm med intern radioöverföring",
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
    note: "Den enda butikssida i kategorin som har en specifikationsrad för larmuppringning, och där står Nej. Sidan bekräftar också att systemet bygger på hemmets befintliga wifi och att HomeBase 2 fungerar som repeater.",
  },
  {
    publisher: "eufy",
    title: "eufy Backup Battery for HomeBase 2, tillverkarens supportartikel",
    url: "https://service.eufy.com/article-description/How-long-does-the-Backup-Battery-for-HomeBase-2-last-on-a-full-charge",
    kind: "standard",
    note: "Belägger att HomeBase 2 inte har något inbyggt reservbatteri. eufy sålde ett separat tillbehör, eufy Backup Battery for HomeBase 2, och anger att det räcker upp till 8 timmar fulladdat. Tillbehöret är utgått. eufys tre egna manualer för HomeBase 2 räknar upp samma sju delar på enheten, ingen av dem ett batteri, och förpackningen innehåller hubb, nätadapter, nätverkskabel och återställningsnål. Manualerna kallar dessutom ljudkällan i hubben för högtalare, och eufy publicerar ingen decibelsiffra för den: de 105 dB som cirkulerar gäller T8970 eufy Security Siren, ett separat tillbehör.",
  },
  {
    publisher: "TP-Link",
    title: "Tapo H200, tillverkarens datablad",
    url: "https://static.tp-link.com/upload/product-overview/2023/202307/20230705/Tapo%20H200(EU)1.0_Datasheet.pdf",
    kind: "standard",
    note: "Belägger att Tapo H200 saknar reservbatteri. Databladet räknar upp hela enheten (SYNC-knapp, återställning, microSD-plats, status-LED) och hela förpackningen (hubb, snabbguide, nätverkskabel, nätadapter), och strömförsörjningen anges som adapter 9 V 0,85 A. Ingen av delarna är ett batteri, och TP-Links användarmanual på 19 851 tecken nämner heller inget batteri, bara nätadaptern. Databladet anger också kapaciteten: 64 sensorer, Sub-1G-brytare eller knappar plus 4 kameror eller videodörrklockor.",
  },
  {
    publisher: "Ring",
    title: "Setting up your Ring Alarm Base Station",
    url: "https://ring.com/support/articles/pq1zx/Setting-Up-Your-Ring-Alarm-Base-Station",
    kind: "standard",
    note: 'Tillverkarens egen bekräftelse av de två siffror som gör Ring till bästa köp: "The Ring Alarm Base Station has a 104 dB siren" och "The Base Station has a 24-hour backup battery that will switch on when your power goes out". Båda är högst i jämförelsen. Ring anger på annan plats att en basstation tar upp till 100 enheter.',
  },
  {
    publisher: "Yale",
    title: "Yale Smart Alarm Starter Kit+, tillverkarens produktsida",
    url: "https://yalehome.se/yale-smart-alarm-starter-kit-xl/",
    market: "SE",
    kind: "standard",
    note: 'Tillverkarens egen specifikation, och den rättar en siffra vi hade fel. Yale anger "100 db siren & högtalare", "Batteribackup: 12 timmar fullt fungerande", upp till 100 larmenheter och 1 km räckvidd med Horizon+. Samma sida bekräftar att mobilnätet ligger bakom en plan: "Få ut mer med en prenumeration – säker larmdrift via simkort och automatiska samtal vid larm."',
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
    note: 'Sidans primärkälla, 45 sidor, läst i sin helhet. Ur sammanfattningen: "Resultaten av granskningen visade att 4 av 20 analyserade luftrenare inte klarade gränsvärdena för ozonavgivning, varav tre låg långt över."\n\nGranskningen gällde luftrenare som avger ozon som biprodukt och som är avsedda att stå på medan personer vistas i rummet, alltså inte ozongeneratorer. Gränsvärdet anges till 0,05 ppm.\n\nRapporten konstaterar att förfrågningarna till Giftinformationscentralen om symptom efter ozon från luftrenare gick från 12 år 2015 till 132 år 2024, och att Norge sedan 2022 förbjuder att ozongeneratorer tillhandahålls privatpersoner medan Sverige inte gör det. Den räknar också upp vilka tekniker som kan bilda ozon: katalytisk oxidation, plasma, ultraviolett bakteriedödande bestrålning och jonisering.',
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
    publisher: "Rubicson",
    title: "Compact air purifier, bruksanvisning för artikel 40793",
    url: "https://www.kjell.com/globalassets/mediaassets/894622_40793_manual_en_no_sv_20231226.pdf",
    date: "2023-12-26",
    market: "SE",
    kind: "standard",
    note: 'Manualen butiken länkar till, läst 2026-08-06. Om ozonet: "Luftrenaren producerar aldrig mer än 0,05 ppm", alltså samma tal som gränsvärdet i myndighetsgranskningen, alltså taket och inte en marginal ner till det.\n\nOm driften: "Luftrenaren stängs av automatiskt efter 6 timmar." Och om placeringen: den ska stå minst 50 centimeter från den som vistas i rummet, eftersom långvarig exponering i stängda utrymmen kan ge torrhet i ögon och mun hos människor och djur.\n\nManualen beskriver genomgående en apparat för bilen, husvagnen och husbilen.',
  },
  {
    publisher: "Xiaomi",
    title: "Mijia Smart Air Purifier 6 FAQ, fråga 32",
    url: "https://www.mi.com/global/support/faq/details/KA-595230/",
    kind: "standard",
    note: 'Tillverkarens eget supportsvar på om jongeneratorn bildar ozon: "The negative ion technology used in the Mijia Smart Air Purifier 6 has been continuously upgraded and improved in manufacturing processes, resulting in ozone emissions that are extremely low and almost undetectable." Alltså ja, utan tal.\n\nSamma dokument anger att apparaten har både UV-sterilisering och jonfunktion, och att ljudnivån är högst 64 dB(A). Två uppgifter som saknas hos butiken och som avgör två av våra fem kriterier.',
  },
  {
    publisher: "SharkNinja",
    title: "Shark NeverChange5 Air Purifier HP150UK, specifikation",
    url: "https://www.sharkninja.co.uk/shark-neverchange5-air-purifier-hp150uk/HP150UK.html",
    market: "UK",
    kind: "standard",
    note: "Hemmamarknadens produktsida för samma apparat, läst 2026-08-06, med två uppgifter Kjell inte har.\n\nAvskiljningen anges till 99,97 procent vid 0,1 till 0,2 mikrometer enligt IEST-RP-CC007.3, alltså mätt vid den partikelstorlek som är svårast att fånga. Det är ett hårdare prov än de 0,3 mikrometer flera konkurrenter anger.\n\nOch ytan: 60 kvadratmeter gäller vid en enda luftväxling i timmen, medan 12 kvadratmeter gäller vid 4,8, båda enligt AHAM AC-1-2020. Samma apparat, två tal som skiljer fem gånger, och det första är det som står i marknadsföringen. Något CADR-tal publicerar Shark inte, varken här, hos sharkclean.eu, hos sharkclean.com eller i AHAM Verifides katalog.",
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
    title:
      "EPA, HEPA och ULPA-filter: vilket behöver du och när är HEPA rätt val?",
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
    title:
      "Luftrenare bäst i test, vi jämför luftrengörare mot damm och allergi",
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
    note: "Det enda svenska grupptestet vi hittat, fem apparater, skrivet av Åsa Warme Hallén. Metoden är beskriven öppet och är ett handhavandetest och inget labbtest: varje apparat användes i ett antal dagar i ett rum av rimlig storlek, med en Airthings View Plus som kontrollmätare tre till sju meter bort. Ingen bakteriemätning. Testet utser ingen vinnare och sätter inga betyg, utan ger varje produkt plus och minus. Av de fem är bara Philips 5000 samma modell vi rankar: testets Wilfa är HU1A-43C mot Kjells Dew TX450, och testets Levoit är OasisMist 1000S mot Kjells 450S. Ingressen säger att det inte finns några exakta gränsvärden för hälsosam luftfuktighet, vilket FoHMFS 2014:14 motsäger.",
  },
  {
    publisher: "Clas Ohlson",
    title: "Philips 5000 Series HU5710/00 luftfuktare, produktsida",
    url: "https://www.clasohlson.com/se/Philips-5000-Series-HU5710-00-luftfuktare,-56-m2/p/36-312",
    market: "SE",
    kind: "standard",
    note: 'Butikssidan för vår testvinnare, och samtidigt ett exempel på varför vi läser testet och inte butikens sammanfattning av det. Produktbeskrivningen inleds med orden "Bäst i test." och skriver längre ner "Bäst i test feb 2025 enligt Ljud & Bild". Publikationen stämmer och datumet stämmer, men testet utser ingen vinnare och sätter inga betyg alls. Samma sida anger också "NanoCloud-teknik minskar bakterier med upp till 99 procent", vilket är tillverkarens eget påstående och inte en klassning enligt någon standard.',
  },
  {
    publisher: "Wilfa",
    title: "Dew TX450 luftfuktare, produktsida och specifikation",
    url: "https://www.kjell.com/se/produkter/hem-fritid/inomhusklimat-uppvarmning/luftfuktare/wilfa-dew-tx450-luftfuktare-p66651",
    market: "SE",
    kind: "standard",
    note: 'Källan som flyttade en produkt sex placeringar, och en påminnelse om att spectabellen inte är produktsidan. Tabellen listar "Inställningar: luftfuktning, nattläge, timer" och ingen rumsyta, vilket vi läste och rankade på. Löptexten ovanför säger: "Luftfuktigheten kan justeras mellan 35 % och 75 % i steg om 5 %, och den inbyggda hygrostaten ser till att nivån hålls stabil", "passar Dew TX450 för rum upp till 70 m²" samt "Integrerad UV-funktion som minskar bakterier" och ett keramiskt filter som kan rengöras och återanvändas. Effekt 30–110 W, tank 4,3 liter, 450 ml/h.',
  },
  {
    publisher: "Rubicson",
    title: "Manual, luftfuktare art. 47011",
    url: "https://www.kjell.com/globalassets/mediaassets/910911_47011_manual_en_no_sv_20250211.pdf",
    date: "2025-02-11",
    market: "SE",
    kind: "standard",
    note: "Manualen bakom butikens supportflik, och svaret på tre av de fyra uppgifter vi publicerat som saknade. Specifikationsrutan ger 230 V, 25 W, 2,5 liter, 150 ml/h (± 25 %), upp till 13 timmar och Ø180×258 mm. Samma manual instruerar rengöring av vattentanken var tredje dag, inte varje vecka, med motiveringen att mikroorganismer i vattnet annars kan blåsas ut i luften. Ljudnivån är den enda uppgift som verkligen inte står någonstans.",
  },
  {
    publisher: "Cleverio",
    title: "Manual, AM300 luftfuktare art. 47167",
    url: "https://www.kjell.com/globalassets/mediaassets/898004_47167_manual_en_no_sv_20240301.pdf",
    date: "2024-03-01",
    market: "SE",
    kind: "standard",
    note: 'Ger effekten vi publicerat som oangiven: 105 W. Manualen anger också att målfuktigheten ställs mellan 40 och 80 procent och att apparaten stänger av sig när nivån nåtts, samt att autoläget siktar på 55 till 68 procent, alltså över de 45 procent Folkhälsomyndigheten namnger. Övrigt: 4 liters tank som räcker 10–40 timmar, 400 ml/h varm och 300 kall, under 25 dB, 2,25 kg.',
  },
  {
    publisher: "Beurer",
    title: "Gebrauchsanweisung LB 300 Plus och LB 45",
    url: "https://pim.beurer.com/images/attribut/100.67_LB300_2023-02-21_03_IM1_BEU.pdf",
    market: "DE",
    kind: "standard",
    note: "Tillverkarens egna manualer på hemmamarknaden, där Technische Daten ger de effekter varken Apotea eller Beurers svenska sidor publicerar: LB 300 Plus 220–240 V, 26 W och upp till 300 ml/h, LB 45 25 W, 30 m² och 1,5 kg. Beurers tyska produktsida ger dessutom LB 300 Plus tankvolym, 3,0 liter, och bekräftar att steglös reglering inte finns på någon av dem.",
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
    note: 'I butikens egen specifikation står två rader efter varandra: "Avfuktning (20 °C / 70 % RF): 7,5 liter per dygn" och "Avfuktning (30 °C / 80 % RF): 13 liter per dygn". Samma apparat, samma sida, samma dag, och talet skiljer 73 procent beroende på vilka villkor som väljs. Det är den enda avfuktaren hos Clas Ohlson som publicerar båda talen, och Wood\'s egen sida publicerar bara 30-gradersraden. Hämtad 2026-08-03.',
  },
  {
    publisher: "Meaco",
    title: "MeacoDry Arete One, tillverkarens extraktionstabeller",
    url: "https://meaco.com/products/meacodry-arete-one-25l-dehumidifier-and-air-purifier",
    market: "UK",
    kind: "standard",
    note: 'Sidans viktigaste enskilda bevis. Meaco publicerar under rubriken "Extraction Rate Data" en tabell per modell med sex rader: rumsvillkor, maximal vattenmängd och watt. För Arete One 25L går den från 17,53 liter per dygn vid 280 watt vid 20 °C och 80 % RH ned till 2,15 liter vid 215 watt vid 10 °C och 50 % RH, med 10,73 liter vid 267 watt på raden 20 °C och 60 % RH.\n\nDet är den enda uppgiften i kategorin som sträcker sig ned till 10 grader, alltså till den temperatur en ouppvärmd svensk källare håller i november. Tabellerna för 10L, 12L och 20L har samma form och finns på respektive produktsida. Hämtade 2026-08-06.',
  },
  {
    publisher: "eeese air care",
    title: "eeese Adam, Hugo och Emil, tillverkarens spectabeller",
    url: "https://eeese-aircare.com/se/eeese-sortiment/avfuktare",
    market: "SE",
    kind: "standard",
    note: 'Den danska tillverkaren publicerar två kapacitetsrader per modell: "Kapacitet 30 °C/RH80 %" och "Kapacitet 27 °C/RH60 %". Adam anger 20 respektive 11,5 liter per dygn, Hugo 25 och 15, Emil 10 och 5. Butiken som säljer dem publicerar bara det första talet.\n\nSpectabellerna rättar också fyra uppgifter mot butikens: Emil drar 165 watt och inte 155, Adams tank rymmer 4,8 liter och inte 5, och ljudnivåerna anges per fläktläge i stället för som ett enda tal. Hämtade 2026-08-06.',
  },
  {
    publisher: "Wood's",
    title: "Wood's SW42FW, tillverkarens produktsida",
    url: "https://woods.se/sv/produkter/avfuktare/kallare/woods-sw42fw/",
    market: "SE",
    kind: "standard",
    note: 'Tillverkarens egen spectabell anger "Avfuktningskapacitet (30 ºC & 80 % RH): 25 liter/24 h" och "Strömförbrukning (30 ºC & 80 % RH): 600 watt", alltså båda talen vid namngivna villkor. Samma sida marknadsför apparaten för källare, garage och andra kalla utrymmen med driftstemperatur +2 till +35 ºC, alltså 28 grader under den temperatur kapacitetstalet är uppmätt vid.\n\nBruksanvisningen, som produktsidan länkar till, går längre än produktsidan. Dess tekniska tabell för hela SW-serien har egna rader för "Dehumidifying at 20 ˚C and 70 % r.h." och "Power at 20 ˚C and 70 % r.h.", och för SW42 står där 12 liter per dygn på 420 watt. Det är näst mest vatten i svalt av de tolv apparaterna på sidan. Samma tabell ger nettovikt 25 kg, tankvolym 11,4 l, ljudnivå 56–60 dB, köldmedium R290/120 g och IPX1. Värt att notera: Clas Ohlson, som säljer samma apparat, anger 25,5 liter och 550 watt utan villkor. Produktsidan hämtad 2026-08-03, bruksanvisningen 2026-08-06.',
  },
  {
    publisher: "Bygghemma",
    title: "Meaco MeacoDry Arete One 25L, produktsida",
    url: "https://www.bygghemma.se/hus-och-bygg/varme-och-ventilation/inomhusklimat-och-luktsanering/avfuktare/avfuktare-och-luftrenare-meaco-meacodry-arete-one-25l/p-1887651",
    market: "SE",
    kind: "standard",
    note: 'Butiken vi länkar till för vinnaren. Specifikationen anger "Strömförbrukning vid 20 °C och 60 % RH: 267 watt" men bara modellnamnets 25 liter som kapacitet, alltså utan de villkor tillverkaren själv publicerar. Den som vill se hela kurvan får gå till Meacos egen sida, och det är skälet till att den ligger som egen källa ovan. Pris och lagerstatus hämtade 2026-08-03.',
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
    title: "Roborock Qrevo Curv 2 Flow",
    url: "https://www.ljudochbild.se/test/smart-hem/roborock-qrevo-curv-2-flow/",
    market: "SE",
    kind: "test",
    note: "Enskilt test av den robot som ligger fyra här, och det enda svenska omdömet om just den modellen. Redaktionen skriver att roboten har svårt med orienteringen och har en tung bakdel. Det motsade vårt eget navigeringsbetyg, som var sidans högsta, och betyget är sänkt efter den här läsningen. Se /rattelser.",
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
    note: 'Tekniska data anger "± 5% RH" i spannet 40 till 80 procent och "± 8% RH" i spannen 20 till 40 och 80 till 95, samt ± 1 grad mellan 0 och 40 och ± 2 grader mellan 40 och 50. Samma sida anger identiska fukttal för HM 22, som kostar 69 kronor mer, vilket är skälet att läsa båda i original och inte lita på bruksanvisningens sammanfattning: vi angav först "8 procentenheter" för HM 22 och byggde ett omdöme på att den dyrare modellen lovade sämre. Det dubbla värdet är kategorins mest användbara enskilda uppgift: toleransen är dubbelt så vid utanför mellanspannet, alltså sämst precis i krypgrunden om vintern och i badrummet efter en dusch. Läst i original 2026-08-04, kontrollerat på nytt 2026-08-06.',
  },
  {
    publisher: "TFA Dostmann",
    title:
      "Digitales Thermo-Hygrometer MOXX 30.5026, tillverkarens bruksanvisning",
    url: "https://www.tfa-dostmann.de/produkt/digitales-thermo-hygrometer-moxx-30-5026/",
    kind: "standard",
    note: 'Källan som visar var toleransen faktiskt bor. Produktsidans tabell "Technische Daten" anger mätområdet "20...99% rH" och "0...+50°C", material, mått, vikt och batteri, men ingen noggrannhet. Vi läste den och skrev att TFA inte anger någon. Talet står i §10 i den bruksanvisning TFA länkar från samma sida, i svensk utgåva: "±4 % vid 30...80 %rH, annars ±5 %" för fukten och "±1,0 °C" för temperaturen. Det är samma modell som mögelsaneringsförbundet mätte till 0,5 procentenheters avvikelse, alltså åtta gånger bättre än tillverkarens eget löfte. Läst 2026-08-06.',
  },
  {
    publisher: "Shelly",
    title: "Shelly H&T Gen3, tillverkarens kunskapsbas",
    url: "https://kb.shelly.cloud/knowledge-base/shelly-h-t-gen3",
    kind: "standard",
    note: 'Kontrollerad två gånger, 2026-08-04 och 2026-08-06, och båda gångerna utan träff. Specifikationen anger batterityp "4 AA (LR6) 1.5 V (not included)", batteritid omkring ett år, mått 70 × 70 × 26 mm, vikt 47 gram och att det finns en temperatur- och en fuktgivare, men varken mätområde eller noggrannhet för fukten. De "30 % to 70 % RH" som står under Environmental är driftvillkor och inte ett mätområde. Samma sida ger rapporttröskeln: mätaren skickar först när temperaturen ändrats 0,5 grader eller fukten 5 procentenheter. Det är den modell sex svenska jämförelsesajter korat till bäst i test, och ingen av dem efterlyste noggrannheten. Hos Kjell kostar den 429 kronor och har 3,5 i kundbetyg från 36 betyg.',
  },
  {
    publisher: "Rubicson",
    title: "Digital hygrometer 48599, bruksanvisning",
    url: "https://www.kjell.com/globalassets/mediaassets/914594_48599_manual_en_no_sv_20250416.pdf",
    date: "2025-05-16",
    market: "SE",
    kind: "standard",
    note: 'Beviset för att toleransen bor i manualen. Kjells produktsida för Rubicson Kompakt anger mätområde, batteri och mått men ingen noggrannhet, och vi skrev därför att mätaren inte anger någon. Sidan 8 i den bruksanvisning Kjell själv länkar från produktsidan har en tabell med rubriken "Noggrannhet": ± 8 procentenheter mellan 30 och 40 procent, ± 5 mellan 40 och 80, ± 8 mellan 80 och 90, samt ± 1 grad mellan 0 och 40. Det är exakt samma fukttolerans som Beurer HM 16 och HM 22 anger, i en mätare som kostar 20 respektive 89 kronor mindre. En kundrecension på Kjells egen produktsida hänvisade till "noggrannhets-intervallet enligt manualen", vilket var det som fick oss att öppna den. Läst 2026-08-06.',
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
    note: "Kategorins enda oberoende provning, och den täcker just den givare sidan handlar om. 26 koldioxidmätare och koldioxidampuller provades på mätning, handhavande, strömförbrukning och utförande. Utfallet var blandat: 18 av 26 fick bra betyg för mätningen, tre underkändes och resten hamnade på tillfredsställande eller nöjaktigt. Att var åttonde apparat inte klarade att mäta det den säljs för att mäta är skälet att bry sig om givartekniken. Airthings View Plus, som vi rankar först, fick **sehr gut (1,2) för mätningarna** och gut (1,9) totalt. Det är den starkaste sortens belägg vi har i kategorin, eftersom det är någon annan än tillverkaren som mätt. Prisspannet i provningen gick från under 100 euro för den billigaste bra apparaten till nästan 500 för den dyraste. Observera att den tyska betygsskalan går åt andra hållet än den svenska: 1,0 är bäst och 5,0 sämst. Provningen är från slutet av 2021 och täcker en av de sju vi rankar.",
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
    note: 'Tillverkarens egen redogörelse för vilken teknik de använder. Givaren är NDIR, alltså en mätning av hur infrarött ljus absorberas av koldioxiden i luften, och den beskrivs som "a compact NDIR sensor installed in every Airthings Wave Plus device". Noggrannheten anges till "±30ppm ±3% within 15 – 35°C ... and 0 – 80%RH" och mätområdet till 400 till 5 000 ppm.\n\n⚠️ Talet gäller Wave Plus. View Plus anger ±50 ppm ±3 % och Wave Enhance ±50 ppm ±5 %, båda på sina egna produktsidor. Sidan bar tidigare Wave Plus tal för alla tre.',
  },
  {
    publisher: "Netatmo",
    title: "How do I calibrate my Smart Indoor Air Quality Monitor?",
    url: "https://helpcenter.netatmo.com/hc/en-us/articles/360025217051-How-do-I-calibrate-my-Smart-Indoor-Air-Quality-Monitor",
    kind: "standard",
    note: 'Netatmos eget hjälpcenter, och den enda sida där de sätter en siffra på koldioxidmätningen: "we specify a precision of +/- 100ppm", plus +/- 0,3 grader för temperatur. Det är den vidaste koldioxidtoleransen bland de fyra mätare här som verkligen mäter koldioxid, och den står nu i jämförelsetabellen.\n\n⚠️ Artikeln gäller Smart Indoor Air Quality Monitor. Netatmos andra artikel om koldioxidgivaren beskriver en optisk mätning med lampa och infraröd mottagare och anger ±10 % över 1 000 ppm, men den handlar om Smart Home Weather Station och får inte bäras hit.',
  },
  {
    publisher: "Mill International AS",
    title: "Mill Sense Air, användarmanual",
    url: "https://www.clasohlson.com/medias/sys_master/hfc/h27/67895414849566.pdf",
    market: "SE",
    kind: "standard",
    note: 'Bruksanvisningen som ligger länkad från Clas Ohlsons egen produktsida, och kategorins skarpaste citat, eftersom det kommer från en tillverkare som beskriver sin egen svaghet: "eCO2 beräknas från VOC-mätningen ... Om det finns betydande koncentrationer av andra flyktiga organiska ämnen kommer eCO2-avläsningen att vara högre än den faktiska CO2-nivån." Mill bekräftar därmed sidans huvudfynd i eget tryck.\n\nManualen anger också precisionen: relativ fuktighetssensor ± 2,0 % RH och temperaturavvikelse ± 0,15 °C, snävast av alla sju. Sensorerna behöver 72 timmar för full noggrannhet, och en knapp på ovansidan visar läget i fyra färger.',
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
    note: "Uppföljningen, i Animals 14(1):122, och den viktigaste källan på sidan. Här konstrueras ett standardiserat säkerhetsprov: attrapper i två storlekar på kokosmatta, sextio försök per storlek, tre vinklar, och en skadeklassning i fem steg. Reglerna är citerbara i klartext: en robot som bara ger klass 0 till 2 får kallas säker för igelkottar, en som ger klass 3 eller 4 får inte, och klass 4 innebär underkänt. Studien prövade dessutom vilka konstruktionsdrag som faktiskt förutsäger utfallet, alltså knivtyp, kollisionssensorer, strömavkänning i hjulmotorer, ultraljud, klipphöjd, glidplåtar, strålkastare, antal hjul och fram- eller bakhjulsdrift, och fann inget med säkerställd skyddande effekt. Det är skälet till att den här sidan inte betygsätter igelkottssäkerhet och inte heller jämför knivtyp: den som gör det jämför något som studien inte kunde belägga betyder något. Författarna skriver att protokollet nu bör valideras innan det förs in i CENELEC-standarden, vilket alltså inte har skett.",
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
    title:
      "Husqvarnakoncernen välkomnar ny forskning om säkerhet för robotgräsklippare",
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
    note: 'Manualen bakom två av sidans hårdaste besked. Säkerhetslinan: "the safety rope can endure the impact force up to 200kg to catch any fall", och HOBOTs egen produktsida preciserar det till 4,5 meter som tål 200 kilo dragkraft. Reservbatteriet håller roboten kvar på rutan i tjugo minuter, och glaset får vara hur tjockt som helst.\n\nHär står också kategorins skarpaste förbud: "Do not use on frameless glass". Att en tillverkare uttryckligen förbjuder det en annan är godkänd för är skälet att läsa manualen före butikstexten.',
  },
  {
    publisher: "Kärcher",
    title: "RCW 2, bruksanvisning",
    url: "https://s1.kaercher-media.com/documents/manuals/html/BTA-5967734-000-00/EN.html",
    kind: "standard",
    note: 'Dokumentet Kärchers produktsida länkar till, och det bär två uppgifter produktsidan inte har. Under Intended use: roboten är "designed for cleaning vertical, framed glass surfaces", alltså fönster med båge. Och i tekniska data: säkerhetslinan är 4 meter.\n\nSamma manual beskriver rengöringen, som skiljer sig från vad butikstexten antyder: "2 ultrasonic spray nozzles atomise the cleaning solution into a mist and distribute it evenly over the glass surface", följt av två roterande putsdiskar och ett avslutande polersteg utan vätska.',
  },
  {
    publisher: "Kärcher",
    title: "Window cleaning robot RCW 2, tekniska data",
    url: "https://www.kaercher.com/int/home-garden/window-cleaning-robot/rcw-2-12692100.html",
    kind: "standard",
    note: "Fyrtio minuters hålltid vid strömavbrott, och batteriet bakom talet publicerat så att det går att räkna på: litiumjon, 0,65 Ah, 14,8 V. Det är den längsta hålltiden i jämförelsen och dubbelt mot båda HOBOT-modellerna.\n\nSidan anger också sugkraften till 3 300 Pa normalt och 5 000 Pa som mest, minsta fönster till 35 × 35 cm, städhastigheten till 3 min/m² och vikten till 1,1 kg utan tillbehör.",
  },
  {
    publisher: "Ecovacs",
    title: "Winbot W2 PRO, specifikationer",
    url: "https://www.ecovacs.com/us/shop/winbot-window-cleaning-robot/winbot-w2-pro",
    kind: "standard",
    note: 'Tillverkarens fullständiga speclista för W2 Pro, och den rättar tre saker vi haft fel om. "Applicable Frame Type: with Frame & Frameless" gör att modellen är godkänd för rutor utan båge. "Power-off Protection Duration (min) 30" ger ett exakt tal där Ecovacs svenska sida bara säger mer än 30 för hela serien.\n\nOch "Total Lenght of Power Cable（m）6,7" visar att roboten går på sladd; de 3 000 mAh är reservbatteriet för strömavbrott. Samma tabell ger 1,8 kg, 6 meters säkerhetslina, 3 mm minsta glastjocklek och 1 min 45 s per kvadratmeter, snabbast av de sju.',
  },
  {
    publisher: "Ecovacs",
    title: "Winbot W2 OMNI, produktsida",
    url: "https://www.ecovacs.com/us/winbot-window-cleaning-robot/winbot-w2-omni",
    kind: "standard",
    note: 'Enda plats där Ecovacs sätter ett tal på en lina: "The safety rope is made from a three-layer, durable composite material with a strong tensile strength of up to 100KG", i samma stycke som stationens 5,2 kilo och 800 newton mot glaset.\n\nSidan avgör också frågan om båge: "From floor-to-ceiling, small sized, frameless or tilting windows, the WINBOT W2 OMNI works with all types of windows." Hongkong-butikens specark för samma modell ger 30 × 40 cm minsta ruta, 1,6 kg och 72 dB.',
  },
  {
    publisher: "Ecovacs",
    title: "Winbot MINI och W1 PRO, specifikationer",
    url: "https://www.ecovacs.com/us/shop/winbot-window-cleaning-robot/winbot-mini",
    kind: "standard",
    note: "Winbot Mini kommer upp på 22 × 25 cm, minsta måttet i jämförelsen och knappt halva ytan av vad Kärcher behöver. Samma tabell anger 30 minuters hålltid vid strömavbrott, 3,3 meters lina, 1,3 kg och 3 min/m².\n\nSystersidan för W1 Pro ger 30 × 40 cm, 1,53 kg, en putsduk på 262 × 262 mm som är störst i jämförelsen, och en säkerhetslina på 1,5 meter, kortast av de sju. Samma tal står i den brittiska versionen.",
  },
  {
    publisher: "Ecovacs",
    title: "Winbot W1 Pro, bruksanvisning",
    url: "https://manuals.plus/ecovacs/w1-pro-winbot-website-manual",
    kind: "standard",
    note: 'Manualen ger marginalen på båglöst glas: "Do not stick the WINBOT too close to the edge when cleaning the frameless glass. It is recommended to be more than 10 cm away from the edge." Bågen ska vara minst 5 mm bred, glaset minst 3 mm tjockt och speglar minst 4 mm.\n\nSamma gränser står i W2 Omnis manual, vilket gör dem till Ecovacs regler för hela serien snarare än den här modellens egenheter.',
  },
  {
    publisher: "HOBOT Technology",
    title: "HOBOT-2S, produktsida och tekniska data",
    url: "https://www.hobot.com.tw/hobot-2s/",
    kind: "standard",
    note: 'Linan: "The 4.5-meter-long safety rope can bear up to 200kg pulling force." Reservkraften: "the embedded Uninterruptible Power System keeps HOBOT in position for 20 minutes with audio alert." Båda talen är samma som för HOBOT-388.\n\nHOBOTs amerikanska butik ger resten av bladet för samma modell: 40 × 40 cm minsta arbetsyta, vilket är det största minimimåttet i jämförelsen, 1 300 gram, 64 dB på en meters avstånd och 2 min 24 s per kvadratmeter.',
  },
  {
    publisher: "Ecovacs",
    title: "Winbot fönsterputsrobot, svenska produktsidan",
    url: "https://www.ecovacs.com/se/winbot-window-cleaning-robot",
    market: "SE",
    kind: "standard",
    note: 'Tillverkarens svenska sida för W2- och W3-serien. Sidan beskriver en "förstärkt kompositkabel som fungerar som ett säkerhetsrep" och ett reservbatteri som kan "hålla den fäst i mer än 30 minuter om huvudbatteriet tar slut". Talet i tabellen för W2 Omni kommer härifrån; för W2 Pro och Mini har vi modellernas egna speclistor, som är mer exakta.',
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
    title:
      "IBP-Report 579 E (2022): The energy saving potential of an intelligent heating control system",
    url: "https://cdn.bfldr.com/607DGEMS/as/mtjrbvmqvfnhc36qwsmkbps5/EN_Fraunhofer_Study",
    kind: "standard",
    note: 'Grundkällan bakom talet som upprepas i hela kategorin, läst i original. Fyra saker står i rapporten och inte i marknadsföringen. Den är en beräkning och inte en mätning: "The study described here is based on transient calculations (TRNSYS 17)." Klimatet är tyskt: väderdata "is represented in this study by a Test Reference Year for Munich". Resultatet är ett spann och inte ett tal: systemet "can reduce the heating energy requirements … by 12–28 %". Och uppdragsgivaren är tillverkaren: sammanfattningen bygger på "a full report No. EER-021/2022/720 that can be requested from the client tado° GmbH". Referensfallet som besparingen räknas mot är ett hem där termostaterna står på konstant 20 °C hela dagen. Delsiffrorna i rapporten är också spann: närvarodetektering 13–23 procent, väderprognos 0,4–6, öppet fönster 1–12. Marknadsföringen citerar taket i varje spann.',
  },
  {
    publisher: "tado",
    title:
      "Scientifically proven: With tado° you save up to 28% energy when heating",
    url: "https://www.tado.com/en-gb/about/fraunhofer-study",
    kind: "standard",
    note: 'Tillverkarens egen redovisning av rapporten ovan, och den är ärligare än de flesta i kategorin. Talen stämmer mot originalet, och tado skriver själva att delsiffrorna inte får adderas: "the savings potentials of the different functions can\'t simply be added up, because they can influence each other." De publicerar dessutom sitt eget användarsnitt, 22 procent, vilket är lägre än rubriken. Det som inte framgår är att studien är en simulering med münchenklimat och att spannets golv är 12 procent.',
  },
  {
    publisher: "tado",
    title:
      "Which radiator valves are the Smart Radiator Thermostats compatible with?",
    url: "https://support.tado.com/en/articles/3482335-which-radiator-valves-are-the-smart-radiator-thermostats-compatible-with-do-i-need-an-adapter-to-mount-the-device",
    kind: "standard",
    note: 'Kategorins bästa adaptertabell, och den ligger på fel ställe. Uppdaterad 2025-10-07. Sex adaptrar ingår i förpackningen: Danfoss RA, RAV och RAVL, M28x1,5 för Comap, Herz, Terrier, Siemens och Olymp, samt Caleffi och Giacomini. Fyra ingår inte: Vaillant 30,5 mm, Oventrop M30x1,0, Ista M32x1,0 och Orkli M28x1,0. tado skriver också att produkten "is only compatible with thermostatic radiator valves" och friskriver sig för adaptrar de inte tillverkat själva. Ingenting av detta står i butikstexten, som nöjer sig med att termostaten "passar termostatventiler från en mängd olika tillverkare".',
  },
  {
    publisher: "Netatmo",
    title: "Which adaptor should I use to install my Smart Radiator Valve?",
    url: "https://helpcenter.netatmo.com/hc/en-us/articles/360015739059-Which-adaptor-should-I-use-to-install-my-Smart-Radiator-Valve",
    kind: "standard",
    note: "Tio ventilfattningar, fler än någon annan termostat i jämförelsen. Sex adaptrar följer med varje ventil: M30x1,5, M28x1,5, M30x1, Giacomini, Danfoss RA och Danfoss RAVL. Fyra säljs separat i tiopack: Danfoss RAV, Vaillant, M28x1 och Pettinaroli. ⚠️ Vi angav tidigare Caleffi som den fjärde extraadaptern, vilket var fel; Netatmos egen utbildningsbok för återförsäljare anger Vaillant. Samma bok anger 2 AA-celler som följer med och omkring 2 års batteritid, samt frostläget Frost-Guard med 7 °C som förvalt värde. Artikeln beskriver dessutom hur man mäter gängan med en linjal.",
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
    note: "Sex adaptrar namngivna på produktsidan i stället för i ett hjälpcenter: RA, RAV, RAVL, GIA för Giacomini, M28x1,5 och CAL för Caleffi, utöver den egna M30x1,5-fattningen. Frostskyddet är beskrivet med tal: värmen slås på automatiskt när temperaturen faller under 5 °C och återgår vid 8 °C. Ljudnivån anges till under 30 dB, vilket stämmer med Ljud & Bilds omdöme att den arbetar helt ljudlöst. ⚠️ Öppet fönster-funktionen kräver enligt samma sida en separat dörr- och fönstersensor och en temperaturskillnad på 3 °C, till skillnad från de flesta konkurrenter som känner av temperaturfallet själva. Tvåårig batteritid på två AA-celler. Ingen besparingsprocent förekommer.",
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
    title: "The Heat Controller FGT-001, bruksanvisning v1.3",
    url: "https://manuals.fibaro.com/content/manuals/en/FGT-001/FGT-001-EN-T-v1.3.pdf",
    kind: "standard",
    note: '⚠️ Den här källan ersatte Fibaros produktsida 2026-08-06, sedan vi publicerat att Fibaro inte namnger en enda ventil. Uppgiften står på sidan 3 i deras egen bruksanvisning: termostaten är "to be installed on three types of valves: M30 x 1.5, Danfoss RTD-N and Danfoss RA-N". Manualen ger också två uppgifter som saknades: batteriet är ett inbyggt litiumpolymerpaket som laddas via micro-USB och uttryckligen inte får bytas ("Do not attempt to replace the battery!"), och produkten har både en anti-freeze-funktion och en avkalkningsfunktion. Fibaros produktsida svarade 404 vid kontroll 2026-08-06, liksom hela deras produktkatalog; sidan låg tidigare bakom talen "Costs reduction of up to 42%" med fotnoten "Based on research by Fibar Group S.A." och påståendet att termostaten passar 98 procent av alla element.',
  },
  {
    publisher: "Schneider Electric",
    title: "Wiser radiatortermostat CCTFR6100Z3, tillverkarens produktsida",
    url: "https://www.se.com/se/sv/product/CCTFR6100Z3/",
    market: "SE",
    kind: "standard",
    note: 'Fyra fattningar, angivna på svenska och rakt av: "Kompatibel med Danfoss RA, RAV, RAVL och M30x1.5-ventiler." Zigbee, styrs via Wiser-appen, max 32 enheter i upp till 16 rum, kapslingsklass IP30. ⚠️ Vi återgav tidigare batteriet på två sätt, 2 x AA och 3V LR03 AAA. Det är utrett: både produkttiteln och Schneiders bruksanvisning CCTFR6100_WH_DUG_EN anger 2 x 1,5 V IEC LR6 (AA), och manualen tillägger i versaler att endast vanliga alkaliska celler får användas, inte laddbara. Produkten säljs hos Proshop under märket LK, men artikelnumret 3606482072589 är Schneider Electrics eget och leder till CCTFR6100Z3.',
  },
  {
    publisher: "SONOFF",
    title: "Zigbee Thermostatic Radiator Valve TRVZB, dokumentation",
    url: "https://help.sonoff.tech/docs/trvzb",
    kind: "standard",
    note: 'Kategorins billigaste termostat, 361 kronor. Den talar ren Zigbee 3.0 och fungerar bakom vilken kompatibel hubb som helst, vilket väger tungt på raden om oberoende, men samma dokumentation anger att Philips, IKEA och Fritzbox gateways inte stöds. De hubbar som räknas upp vid namn är SONOFFs egna: iHost, NSPanel Pro, ZB Bridge Pro, ZBDongle-P och ZBDongle-E. ⚠️ Vi skrev tidigare att de räknar upp konkurrenternas hubbar, vilket var fel. Sidan anger också frostläge med justerbar tröskel ("Frost protection avoids pipe freezing and bursting"), att tre AA-celler krävs och att de inte ligger i förpackningen, temperaturområdet 4 till 35 °C och måtten 58,4 x 58,4 x 94 mm.',
  },
  {
    publisher: "SONOFF",
    title: "TRV Applicable Valve List, kompatibilitetsguide 2024-12-02",
    url: "https://sonoff.tech/wp-content/uploads/2024/12/SONOFF_TRV-Compatibility-Guide-20241202.pdf",
    kind: "standard",
    note: "⚠️ Dokumentet som gjorde att SONOFF TRVZB gick från fjärde till andra plats den 6 augusti 2026. Vi hade publicerat att SONOFF bara anger gängan M30x1,5 och lovar adaptrar för de flesta system utan att namnge en enda. Guiden ligger på SONOFFs egen domän, finns i två versioner sedan 2023, och räknar 41 ventilmärken från Boss och Comap till Heimeier, Oventrop och Watts. För var och en anges om adapter behövs och vilken: M28, CAL för Caleffi och Emmeti, GIA för Giacomini och Roca, RAV för Danfoss RAV och Oventrop UniLDV, RAVL för Danfoss RAVL, och RA för Danfoss och Honeywell RA-serien. Tjugo märken går direkt på M30x1,5 utan adapter. Guiden avslutar med att uppgifterna är vägledande och inte fullständiga, vilket är skälet till att betyget stannar på 4,0 och inte 5,0.",
  },
  {
    publisher: "Danfoss",
    title: "Produktregister, artiklarna 014G1115, 014G2460 och 014G2420",
    url: "https://designcenter.danfoss.com/products/p/014G1115",
    kind: "standard",
    note: "Danfoss eget produktregister, matchat på EAN mot de tre Danfoss-produkter vi rankar. Det avgjorde tre uppgifter vi haft fel eller luckor i. Danfoss Eco (014G1115, EAN 5702425245329) anger adaptertyp M30, RA, RAV och RAVL, alltså fyra fattningar och inte de två vi publicerat, samt öppet fönster-funktion, ljudnivå under 30 dB(A) enligt JIS C 9612, två AA-celler med 2,5 års livslängd och inställningsområdet 4 till 28 °C. Ally (014G2460, EAN 5702425245015) och Ally RA (014G2420, EAN 5702425245008) har samma batteri, samma ljudnivå och samma öppet fönster-funktion, med inställningsområdet 5 till 35 °C. Skillnaden mellan de två artiklarna är adaptertypen, M30, RA, RAV och RAVL mot M30 och RA.",
  },
  {
    publisher: "Netatmo",
    title: "Training Book, Smart Radiator Valves",
    url: "https://netatmostatic.blob.core.windows.net/static/pro/NRV/Training-Book-NRV-EN.pdf",
    kind: "standard",
    note: "Netatmos egen utbildningsbok för återförsäljare, och den innehåller det underlag vi tidigare skrev att Netatmo inte publicerar någonstans. De 37 procenten fotnotas till en studie från Centrale-Supélec på en standardlägenhet utrustad med Netatmos ventiler. ⚠️ Samma bok skriver dessutom att de 37 procenten gäller Netatmos rumstermostat i hus med egen panna eller värmepump, inte radiatorventilerna, medan butikerna sätter talet på ventilen. Boken bekräftar också sex medföljande adaptrar per ventil, fyra extra i tiopack, två AA-celler som följer med, omkring 2 års batteritid och frostläget Frost-Guard med 7 °C som förval.",
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
    note: 'Källan som avgör riktningen för Hue Bridge. Philips beskriver genomgående hur Hue ansluts utåt: "Du kan ansluta till alla favoriter – Amazon Alexa, Apple Home och Google Assistant."\n\nKjell skriver tvärtom att du med Matter kan lägga till produkter från flera tillverkare. Vi följer tillverkaren före butiken och räknar bryggan som enkelriktad.',
  },
  {
    publisher: "Philips Hue",
    title: "Philips Hue and Matter: Complete Setup & Support Guide",
    url: "https://www.philips-hue.com/en-us/support/article/philips-hue-and-matter-complete-setup-and-support-guide/000012",
    kind: "standard",
    note: 'Philips egen supportartikel, och den enda källan som svarar på om Hue Bridge fungerar utan internet. Jämförelsetabellen i artikeln har raden "Local control (offline)" med bock för uppsättning med brygga.\n\nVarje Matter-controller Philips namnger i artikeln är någon annans nav: HomePod mini, Nest Hub, Echo. Det är den andra halvan av belägget för att bryggan går utåt och inte inåt.',
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
    note: 'Den enda plattformen i jämförelsen där oberoendet är själva produkten: "Grundfunktionen i Home Assistant är gratis och körs lokalt – du äger din data och kan styra hemmet även om internet ligger nere." Nabu Casa-abonnemanget är uttryckligen valfritt och köper fjärråtkomst, inte funktion.\n\nButikens specifikationstabell är dessutom den som rättar oss: wifi, Bluetooth, Zigbee, Thread och Z-Wave står alla som Nej. 69 kundbetyg är flest av hubbarna i jämförelsen.',
  },
  {
    publisher: "Nabu Casa",
    title: "Home Assistant Green, tillverkarens produktsida",
    url: "https://www.home-assistant.io/green/",
    kind: "standard",
    note: "Belägget för att Green inte har någon radio i lådan: Zigbee och Thread kräver Home Assistant Connect ZBT-2, medan Z-Wave och Bluetooth kräver en USB-sticka från tredjepart. Nätverket är gigabit Ethernet.\n\nDet flyttar produkten i rankningen, eftersom vi tidigare räknade wifi, Zigbee och Thread som inbyggda och bara Z-Wave som tillbehör.",
  },
  {
    publisher: "Aqara",
    title: "Hub M3, produktuppgifter hos återförsäljaren",
    url: "https://www.kjell.com/se/aqara-hub-m3-smarta-hem-controller-p57869",
    market: "SE",
    kind: "standard",
    note: 'Tre uppgifter som avgör placeringen står här: "Matter-controller – kan styra tredjepartsprodukter", "Edge-hubb – automatisering och styrning sker lokalt i stället för i molnet" och en 360-graders IR-sändare för fjärrstyrning av apparater via infrarött.\n\nDe två sista hade vi missat, och sidan angav tidigare att M3 saknar infraröd och inte anger något om lokal drift. Stöd i övrigt för Zigbee, Bluetooth 5.1, Thread och Matter, samt PoE.',
  },
  {
    publisher: "Aqara",
    title: "Smart Hub M100, produktuppgifter hos återförsäljaren",
    url: "https://www.kjell.com/se/aqara-smart-hub-m100-vit-p56569",
    market: "SE",
    kind: "standard",
    note: 'Källan som gör den billigaste produkten till en fullvärdig controller: "Hub M100 fungerar som både Matter Bridge och Matter Controller." Samma sida anger lokala automationer utan internet, Thread Border Router och ett tak på 40 enheter varav 20 Zigbee.',
  },
  {
    publisher: "IKEA",
    title: "Dirigera hubb för smarta produkter, tillverkarens produktsida",
    url: "https://www.ikea.com/se/sv/p/dirigera-hubb-foer-smarta-produkter-vit-smart-10503406/",
    market: "SE",
    kind: "standard",
    note: 'IKEA skriver ut båda rollerna: "Hubben DIRIGERA är en Matter-brygga … Hubben DIRIGERA är en Matter-styrenhet. Det innebär att alla Matter-produkter som stöds kan anslutas till hubben."\n\nSamma sida ger priset 899 kronor och kundbetyget 3,6 av 5 på 714 omdömen, vilket är det överlägset största underlaget bland hubbarna vi rankar och samtidigt det lägsta betyget.',
  },
  {
    publisher: "IKEA",
    title: "Kan jag ansluta smarta produkter från andra märken till Dirigera?",
    url: "https://www.ikea.com/se/en/customer-service/knowledge/articles/eedg4f80-4032-4g32-9220-3f6gd9304gc2.html",
    market: "SE",
    kind: "standard",
    note: "IKEA:s egen kundserviceartikel: Dirigera kan ansluta smarta produkter från andra varumärken som stöder Matter, plus begränsat stöd för Zigbee från andra tillverkare.\n\nSidan angav tidigare att IKEA inte publicerar den uppgiften, vilket var skälet till att Dirigera inte rankades. Skälet höll inte, och produkten är nu rankad.",
  },
  {
    publisher: "Matter Alpha",
    title: "Ikea adds Matter Controller and Thread support",
    url: "https://www.matteralpha.com/explainer/ikea-adds-matter-controller-and-thread-support-integrating-third-party-matter-devices",
    kind: "standard",
    note: "Enda belägget för att Dirigera fungerar som Thread Border Router, eftersom IKEA inte dokumenterar Thread någonstans. Firmware 2.805.6 aktiverar Thread-radion, och skribenten verifierar via mDNS och OpenThreads REST-API att hubben kör OpenThread 1.4.\n\nEn andra teknisk genomgång hos matter-smarthome.de beskriver samma funktion. Två samstämmiga tier B-källor, och tabellcellen namnger firmwareversionen så att läsaren kan kontrollera sin egen hubb.",
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
    publisher: "RISE",
    title: "Certifierade produkter, RISE öppna certifikatregister",
    url: "https://cert.ri.se/sv/products",
    market: "SE",
    kind: "standard",
    date: "2026-08-06",
    note: "Sidans viktigaste källa och den som avgör kriterium 1. Registret är öppet, rymmer 5 127 produktcertifikat och går att söka på certifikatnummer, produktnamn eller innehavare. Här står vilka produkter som är typgodkända enligt CR 139, vad godkännandet omfattar och vilket datum det löper ut.\n\nHärifrån kommer giltighetstiderna, som ingen tillverkare skyltar med: C900737 till 2028-02-08, SC0056-15 till 2027-01-30 och C901455 till 2031-04-16. Härifrån kommer också beskedet att Tollco WaterFuse PlugIn och Aqara Valve Controller T1 inte är godkända enligt CR 139, och att tre godkända produkter finns utanför vår ranking.\n\n⚠️ Registret ligger på cert.ri.se. Huvudsajten ri.se levererar en botkontroll, och en tidigare version av den här sidan drog slutsatsen att registret inte gick att läsa. Det var fel värd.",
  },
  {
    publisher: "Säker Vatten",
    title: "Aktiva skydd, Branschregler Säker Vatteninstallation 2026:1",
    url: "https://sakervatten.se/vvs-produkter/aktivaskydd/",
    market: "SE",
    kind: "standard",
    note: 'Branschorganisationens egen sida om kravet. Ordagrant: läckagebrytare, vattenfelsbrytare eller vattenlarm "ska vara godkända enligt CR 139". Ingen annan certifieringsregel och inget annat certifieringsorgan nämns, vilket är skälet till att RISE register räcker för att avgöra frågan.',
  },
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
    title:
      "Ändringar och nyheter i Branschregler Säker Vatteninstallation 2026:1",
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
    note: "Kategorins enda riktiga labbprovning, utförd på uppdrag av Villaägarnas Riksförbund och läst i sin helhet: sex sidor rapport och femton sidor bilaga med foton. Provad 2022-06-16 vid RISE Tillämpad Mekaniks laboratorium i Borås enligt SS-EN 1630:2021, nivå RC2 och RC3. Fyra skåp, samtliga forcerade. Med kofot mot infästningen lossnade Master Lock 5441 på 16 sekunder, Masunt 520 M på 23, ABUS 787 C på 35 och HMF 2030-11 på 1 minut och 15. Det snabbaste angreppet i hela rapporten står i §4.6: åtta slag med en 700 grams snickarhammare öppnade Master Lock 5441 på nio sekunder, och hammaren ingår inte i standardens verktygslistor utan lades till som en objektsspecifik svag punkt. Rapporten skriver också rakt ut att SS-EN 1630 inte omfattar nyckelskåp, vilket är skälet till att inget skåp här kallas RC2-klassat.",
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
    note: "Källan som binder RISE:s provobjekt till en produkt som går att köpa. EAN 4003318463310 är samma nummer som butiken anger för den mekaniska 787:an, och rapportens Bild 5 visar fyra mekaniska kodhjul, alltså inte den elektroniska Smart-BT-modellen. Härifrån kommer också lucka i tryckgjuten zink, plats för 20 nycklar eller 14 kort, fyrsiffrig inställbar kod, 80 x 120 x 45 mm och 683 gram.\n\nDatabladet listar dessutom ett skyddslock med skjutmekanism över kodhjulen, och monteringsanvisningen för 787 och 797 beskriver momentet steg för steg: skjut ner locket, ställ in koden, öppna, skjut upp locket igen. Skåpet är byggt för väggmontering inomhus eller på ett skyddat ställe utomhus.",
  },
  {
    publisher: "ABUS",
    title: "KEYGARAGE One 787 för väggmontering, tillverkarens datablad",
    url: "https://www.abus.com/se/abusproductsheet.pdf/222847/swe-SE",
    kind: "standard",
    note: "Databladet för den elektroniska modellen, som Kjell säljer under namnet KeyGarage 787 Smart-BT. ABUS skriver att namnbytet till KEYGARAGE One följde med integrationen i ABUS One-appen, och att det är samma vara går att kontrollera på måtten 82,5 x 120 x 63 mm och batteriet 2 x AA, som är identiska hos butiken.\n\nHärifrån kommer kapslingsklassen: nyckelboxen är stänkskyddad enligt IP 54 och får installeras på skyddade ställen utomhus. Bladet anger också 20 nycklar, 3 bilnycklar eller 30 plastkort, belyst knappsats, automatisk låsning när facket stängs, batterifack åtkomligt från utsidan och 894 gram.",
  },
  {
    publisher: "Nivex Top Safe",
    title: "Nyckelgömma T7, tillverkarens produktsida",
    url: "https://nivextopsafe.se/produkt/t7-nyckelgomma/",
    market: "SE",
    kind: "standard",
    note: "Tillverkaren bakom gömmorna E-safe säljer, och den som anger de uppgifter butiken utelämnar: aluminiumgjutgods, väderskydd i gummi, vikt 0,6 kilo, utvändigt mått 106 x 66 x 57 mm och invändigt 70 x 38 x 22 mm. Innermåttet är värt att stanna vid, eftersom det är det som avgör om en bilnyckel med fjärrkontroll går ner i skåpet. Sidans bild på den öppna gömman visar också fyra infästningshål i bakväggen av nyckelfacket, alltså innanför luckan.",
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
    note: "Kategorins enda oberoende provning, och den enda källa här som mätt något. Testfakta lät tyska laboratoriet PZT GmbH prova tolv laddkablar, sex med Lightning och sex med USB-C, och betalade själva för provningen. Metoden är publicerad och det är ovanligt: kabeln spändes fast på en roterbar balk med en vikt på 150 gram i andra änden, balken vred kabeln 90 grader åt vardera hållet, och funktionen provades efter 1 000, 2 500, 3 500 och 5 000 böjningar. Båda ändarna provades och den sämsta av dem rapporterades, eftersom en kabel inte är starkare än sin svagaste punkt. Testfakta skriver själva att 150-gramsvikten simulerar milda vardagliga belastningar och att det är något annat än att rycka loss en sladd som fastnat. Resultatet är sidans mest citerade: den dyraste kabeln i provningen, Cellularline LongLife från Circle K för 240 kronor, gick sönder redan under de första 1 000 böjningarna och fick 1 av 10, medan IKEA LILLHULT för 50 kronor tog sig igenom hela cykeln utan skada och fick 10. Belkin, Clas Ohlsons Exibel och Samsung fick också 10; Kjells Linocell USB-C 3.0 fick 8 med synliga förslitningar i höljet. Resultattabellen ligger öppet som PDF. ⚠️ Provningen är från februari 2020 och samtliga sex USB-C-kablar är USB-A-formen, alltså USB-A till USB-C. Den här sidan rankar bara USB-C till USB-C, så noll av de rankade kablarna är provade. Därför finns inget kriterium för testomdöme, och inget resultat härifrån knyts till någon rankad produkt.",
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
    title:
      "Garageportöppnare ML700, ML750 och ML850, bruksanvisning 114A2806B-S",
    url: "https://www.clasohlson.com/medias/sys_master/9542690930718.pdf",
    market: "SE",
    kind: "standard",
    note: 'Kategorins viktigaste dokument, och det Clas Ohlson själva serverar för sin ML700. Manualen är Chamberlains egen och namnger deras tillbehör, vilket bekräftar att ML700 är en Chamberlain. Avsnitt 28 anger den enda kraftgräns vi hittat som är satt för att skydda någon: "Kraften som uppstår vid den stängande portkanten får inte överstiga 400N (40kg). Om stängningskraften ställs in på över 400N måste samtidigt \'Protector System\' installeras." Protector System är fotocellen, och den ligger i avsnitt 30 som tillbehör 770EML, alltså inte i lådan. Samma avsnitt: "Vi rekommenderar verkligen detta system för garageägare som har småbarn." Avsnitt 27 ger två prov ägaren kan göra själv: porten ska reversera mot ett 40 mm högt hinder, och testet ska upprepas en gång i månaden, samt att en 20 kg vikt på porten får höja den högst 500 mm. Manualen åberopar ZH1/494 och VDE 0700, alltså äldre beteckningar, och nämner inte EN 12453.',
  },
  {
    publisher: "Jula",
    title:
      "Garageportsöppnare 377011, bruksanvisning och EU-försäkran om överensstämmelse",
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
    title:
      "Boxer garageportsöppnare 63.002 och 63.003, bruksanvisning version 3",
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
    title:
      "SS-EN 12453, Portar – Säkerhet vid användning av maskindrivna portar – Krav",
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
    note: "Enda produkten i jämförelsen som stöder Matter, alltså den enda som läggs till en gång och syns i Apple Home, Google, Alexa och Samsung utan att tillverkaren behöver underhålla stöd för vart och ett.\n\nSpecifikationsrutan anger måtten 42 × 36 × 16 mm, vikten 27 gram och material PC, vilket gör den till den minsta modulen på sidan. I lådan ligger en 12 V-adapter med 1,5 meter kabel, en 0,3 meter torrkontaktkabel och en 7 meter lång kabel till reedbrytaren. Som gateway håller den 10 enheter över Bluetooth.",
  },
  {
    publisher: "Meross",
    title: "Smart Wi-Fi Garage Door Opener MSG100, tillverkarens produktsida",
    url: "https://www.meross.com/en-gc/smart-garage-door-opener/smart-wi-fi-garage-door-opener/58",
    kind: "standard",
    note: 'Tillverkarens produktsida för MSG100, ordagrant: "Support Apple HomeKit, Amazon Alexa, Google Assistant, SmartThings. Compatible with over 200 brands and 1600 different models." Ingen hubb krävs. Samma sida anger måtten 3,7 × 1,8 × 0,9 tum, alltså 94 × 46 × 23 mm, en 1,5 meter lång sladd och 5 V likström in.\n\nDen bredaste kompatibiliteten i jämförelsen, och den enda tillverkare som publicerar en kontroll där du kan slå upp din egen portöppnare före köpet. Sidan stod tidigare på att HomeKit-stödet krävde den separata artikeln MSG100HK; det stämmer inte för den modul som säljs i dag, och även butiken anger HomeKit för sin artikel.',
  },
  {
    publisher: "Meross",
    title: "Why do I need Two-factor authentication?",
    url: "https://www.meross.com/en-gc/support/FAQ/460.html",
    kind: "standard",
    note: 'Tillverkarens eget svar om kontoskyddet, och skälet till att Meross vinner kriteriet Säkerhet och kontoskydd. Ordagrant: "For meross, the second form of authentication is a code generated by an application on your mobile device" och "After you configure 2FA using a time-based one-time password (TOTP) mobile app, you can add a security key."\n\nSkillnaden mot en kod som skickas med e-post eller sms är att en TOTP-kod aldrig lämnar telefonen och därför inte går att fånga genom att ta över ett e-postkonto eller flytta ett telefonnummer till ett nytt sim-kort.',
  },
  {
    publisher: "SwitchBot",
    title: "Instructions for Two-Step Verification Feature (V9.0 or newer)",
    url: "https://support.switch-bot.com/hc/en-us/articles/23626131340055-Instructions-for-Two-Step-Verification-Feature-V9-0-or-newer",
    date: "2024-08-21",
    kind: "standard",
    note: "Tillverkarens hjälpcenter beskriver hur tvåstegsverifieringen slås på, under Profil och Hantera konton, och att inloggningen därefter kräver lösenord plus en bekräftelsekod via e-post. Betrodda enheter kan läggas till så att koden bara krävs från en ny telefon. Uppgiften saknades i butikens specifikation, vilket är skälet till att sidan tidigare bedömde skyddet som okänt.",
  },
  {
    publisher: "iSmartGate",
    title: "Säkerhet och integritet",
    url: "https://ismartgate.com/sv/saker-garageport/",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens beskrivning av den arkitektur som skiljer iSmartGate från de fem övriga: data och konfiguration lagras i enheten hemma hos köparen, reläservrarna fungerar som en databrygga utan att lagra något, och enheten är åtkomlig över hemmets wifi även när internet ligger nere.\n\nDet är ett annat svar på samma fråga som tvåstegsverifieringen besvarar, och sidan väger in det under kontoskydd: blir en molnplattform hackad exponeras alla dess användare på en gång, medan ett intrång här träffar en enhet.",
  },
  {
    publisher: "iSmartGate",
    title: "Matter och smarta hem, tillverkarens produktöversikt",
    url: "https://ismartgate.com/sv/matter-garage-door/",
    market: "SE",
    kind: "standard",
    note: 'Anger att iSmartGate är kompatibel med Apple HomeKit, Alexa, Google Assistant, IFTTT och SmartThings, med fotnoten att HomeKit och CarPlay gäller modellerna PRO och LITE. Jämförelsetabellen på samma sida anger HomeKit och Google Assistant som inbyggda och Alexa som "ENDAST USA / andra med IFTTT", vilket är skälet till att Alexa räknas som ett extra steg för en svensk köpare. Sidan anger också att en Chamberlain eller LiftMaster med Security+2.0, alltså den med gul inlärningsknapp, kräver en särskild omkopplaradapter.',
  },
  {
    publisher: "Botland",
    title: "Sterownik Bramy WiFi Tuya RTX WGM2, hemmamarknadens produktsida",
    url: "https://botland.com.pl/tuya-automatyka-domowa/15851-sterownik-bramy-wifi-tuya-rtx-wgm2-5903794123663.html",
    kind: "standard",
    note: "Samma artikel som CDON säljer, kontrollerat på GTIN 5903794123663, men med den specifikation den svenska produktsidan saknar: måtten 46 × 51 × 18 mm, matning 100 till 240 V, wifi på 2,4 GHz med upp till 30 meters räckvidd och drifttemperatur 0 till 50 °C. Sidan bekräftar också att modulen matas med 230 V direkt och därför inte behöver någon extra strömadapter, vilket är det som gör den till ett elinstallationsjobb.",
  },
  {
    publisher: "Wasserman",
    title: "Przekaźnik breaker do bramy garażowej + kontaktron",
    url: "https://www.wasserman.eu/pl/p/przekaznik-breaker-do-bramy-garazowej-kontaktron-1526757",
    kind: "standard",
    note: "Hemmamarknadens produktsida för den modul CDON säljer omärkt som Garageportsbrytarrelä, kontrollerat på GTIN 5904553905926. Den anger tillverkaren, GOMEDIA, och artikelnumret QS-WIFI-C03, som ingen svensk butik publicerar. Måtten anges som valda för att reläet ska rymmas i en standarddosa med minst 60 millimeters diameter, och matningen som 230 V utan behov av extra strömförsörjning.",
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
/**
 * Källor för /powerstation.
 *
 * ⚠️ Två provningar finns och båda är gamla. Warentests är från juli 2023 och
 * gäller föregående generation; M3:s är från 2021–2023 och **noll av de åtta
 * testade produkterna säljs i de svenska kategorier vi läste 2026-08-05**.
 * Därför finns inget kriterium för testomdöme, och inget modellresultat
 * härifrån återges. Metoden bär viktningen, inte betygen.
 *
 * ⚠️ Ankers och Jackerys specifikationstabeller är hämtade på deras
 * amerikanska sajter, eftersom EU-sidorna inte gick att läsa maskinellt.
 * Effekt-, cykel- och dB-tal gäller båda marknaderna. **Spänning, uttagstyp
 * och antal uttag gör det inte** — Jackery anger tre 230 V-uttag, den svenska
 * artikeln har två. Se noteringen på varje källa.
 */
export const POWERSTATION_SOURCES: Source[] = [
  {
    publisher: "Stiftung Warentest",
    title: "Powerstations im Test: Steckdosen für unterwegs",
    url: "https://www.test.de/Powerstation-Test-6023127-0/",
    date: "2023-07-20",
    market: "DE",
    kind: "test",
    note: 'Kategorins enda riktiga labbprovning, elva powerstations. Metoden är fri och bär den här sidans viktning: modellerna laddades ur "mit der vom Anbieter angegebenen maximalen Dauerleistung" tills batteriet var tomt, laddtiden mättes, ljudnivån mättes i labb vid både laddning och urladdning, flera provpersoner bedömde handhavande och transport, och säkerheten bedömdes vid upp- och urladdning. Det öppna fyndet är sidans utgångspunkt, ordagrant: "Ein Modell hat dabei nach 30 Minuten abgeschaltet und somit nicht eingehalten, was der Anbieter verspricht." Härifrån kommer också gränsen mot powerbank: "Eindeutiges Unterscheidungsmerkmal zu den kleineren Powerbanks: Powerstations haben mindestens eine Schuko-Steckdose mit 230 Volt Spannung." ⚠️ Testet är från 2023 och nämner EcoFlow River 2 Max vid namn medan svensk handel säljer River 3. Betyg per modell kräver betalning, 4,90 euro, och vi har inte köpt dem. Inget modellresultat härifrån återges eller gissas.',
  },
  {
    publisher: "M3",
    title: "Test: 8 portabla power stations med extra mycket laddkraft",
    url: "https://www.m3.se/article/1829842/test-power-station.html",
    date: "2024-02-01",
    market: "SE",
    kind: "test",
    note: "Sveriges enda grupptest av kategorin, åtta produkter med betyg av 5, av M3:s chefredaktör. Artikeln skriver själv att provningarna är från 2021–2023 och att bara priserna uppdaterats. ⚠️ Ingen av de åtta modellerna finns i Clas Ohlsons, Elgigantens eller Kjells kategorier 2026-08-05. De testade var Anker 535 Powerhouse, Bresser, EcoFlow Delta 1300, River 2 Max och River 600 Max, Goal Zero Yeti 1500X och 200X samt Jackery Explorer 1000. Källan står med som mätpunkt för vad som finns provat på svenska, och inget betyg härifrån knyts till en produkt här.",
  },
  {
    publisher: "Anker",
    title: "Anker SOLIX C1000 Gen 2 Portable Power Station, specifikation",
    url: "https://www.ankersolix.com/products/c1000-gen2",
    market: "US",
    note: 'Tillverkarens egen specifikationstabell, och en av de två källor som visar varför effekten står i tre rader hos oss. Ordagrant: "Output 2,000W (3,000W Peak Output)", plus "80% capacity after 4,000 cycles", "10 ms UPS" och "20dB Operation". Elgigantens fält "Max. AC 230v effekt" anger 3 000 watt för samma produkt, alltså toppeffekten. ⚠️ Tabellen är den amerikanska med 120 V; effekt-, cykel- och dB-tal gäller båda marknaderna, spänning och uttagstyp gör det inte.',
  },
  {
    publisher: "Anker",
    title: "Anker SOLIX C2000 Gen 2 Portable Power Station, specifikation",
    url: "https://www.ankersolix.com/products/c2000-gen2",
    market: "US",
    note: 'Den andra av de två, och den tydligaste. Ankers egen tabell anger "AC Output ... 2400W Max" och "Peak Power 4000W", alltså 2 400 watt kontinuerligt. Elgigantens strukturerade fält för samma EAN, 0194644395735, anger 4 000 watt, och deras egen brödtext på samma sida säger "upp till 4 000W toppeffekt". Prisjakt anger 2 400. Produkten ligger utanför den storleksklass sidan rankar och står här enbart som belägg för hur ett watt-tal byter betydelse mellan två svenska säljkanaler.',
  },
  {
    publisher: "Anker",
    title: "Anker SOLIX C300 Portable Power Station, specifikation",
    url: "https://www.ankersolix.com/products/c300",
    market: "US",
    note: 'Källan till att C300-seriens 600 watt är ett boostläge och inte en märkeffekt. Ankers egen FAQ svarar ordagrant: "The AC outlets can deliver a maximum of 300W rated power to connected devices (600W with SurgePad)." Här står också ljudnivån, "only emits 25dB from 3.3 ft away", cellkemin LFP och femårsgarantin. ⚠️ Produktsidan anger inget cykeltal, men Ankers datablad för samma artikel gör det, se nedan. Att en av tillverkarens två egna publiceringar tiger säger ingenting om den andra.',
  },
  {
    publisher: "Anker",
    title: "Anker SOLIX C300X Portable Power Station, datablad A1723",
    url: "https://storage.googleapis.com/mauser-public-images/prod_description_document/2025/293/1ec6f8c53a551984171093561f5aa725_0194644298845_f_0.pdf",
    market: "UK",
    note: 'Tillverkarens eget datablad, matchat på streckkod 0194644298845 och märkt "Sales Market: US/CA/JP/EU/UK", alltså samma artikel som säljs här. Anger "Cycle Life 3000+ (to 80%)", "AC Surge Power 600W", "Solar Input Power 11-28V 8.2A (100W Max)", "MPPT Support Yes", "EST Recharge Time AC recharging: 68min" och måtten 164 × 161 × 240 mm. ⚠️ Sidan publicerade cykeltalet som ej angivet och drog av poäng för det till 2026-08-06; talet fanns hos tillverkaren hela tiden. Se lib/corrections.ts.',
  },
  {
    publisher: "Anker",
    title: "Anker SOLIX C800X Portable Power Station, datablad A1755",
    url: "https://www.santansolar.com/wp-content/uploads/A1755-datasheet.pdf",
    market: "US",
    note: 'Tillverkarens datablad, åtta sidor. Anger "Cycle Life 3000+ (to 80%)", femårsgarantin, och körtiderna som citeras i omdömet: en kaffebryggare på 1 000 watt i 41 minuter och en cpap-apparat i 17 timmar. ⚠️ Databladet marknadsför "IP65-rated water-resistant build", men meningen gäller den löstagbara campinglampan i locket och inte stationen, som saknar klass. ⚠️ Tabellen gäller 120 V-artikeln med fem uttag; den svenska har tre. Ingen ljudnivå anges någonstans i dokumentet.',
  },
  {
    publisher: "TogoPower",
    title: "Advance Series 240/330/350/650, bruksanvisning",
    url: "https://togopower.com/pages/manual-download",
    market: "US",
    note: 'Tillverkarens egen bruksanvisning, hämtad från deras dokumentsida. Specifikationstabellen för ADVANCE 650 anger batterityp "18650 Lithium Battery", kapacitet "634Wh (22.2V 28.6Ah)", måtten 290 × 201 × 200 mm, "DC Input 12-28V, 100W", och garantin "12 months from the date of purchase". Säkerhetsavsnittet säger "It\'s not waterproof, do not expose to liquids". ⚠️ PDF:en är bildskannad och har noll textlager, så varje textbaserad sökning i den returnerar tomt. Den lästes som bild. Sidan påstod till 2026-08-06 att cellkemin inte gick att läsa före köpet. ⚠️ Tabellen anger två 120 V-uttag; uttagsantalet för den svenska 230 V-artikeln är inte fastställt och står som streck.',
  },
  {
    publisher: "EcoFlow",
    title: "RIVER 3 och RIVER 3 Plus, specifikation",
    url: "https://uk.ecoflow.com/products/river-3-plus-portable-power-station",
    market: "UK",
    note: 'Tillverkarens egen tabell för 230 V-marknaden, alltså samma utförande som säljs här. Anger "AC Output 3 outlets, 600W total (Surge 1200W, X-Boost 1200W)" för River 3 Plus och "1 outlets, 300W total (Surge 600W, X-Boost 600W)" för River 3, alltså de toppeffekter vår tabell saknade. Här står också "LiFePO4, 3000 cycles to 80% capacity" och "Noise Volume <30 dB". ⚠️ Fotnot 3 är källan till att sidans IP-rader numera säger batteripaket: "The IP54 waterproof rating applies only to the battery pack, not the entire package." EcoFlows egen specifikationsrad heter "Waterproof Level of Battery Pack", och samma gäller Delta 3:s IP65.',
  },
  {
    publisher: "Anker",
    title: "Anker SOLIX C800 Plus / C800, specifikation",
    url: "https://www.ankersolix.com/C800-plus-c800-pps",
    market: "US",
    note: 'Cykeltalet för C800-serien, ordagrant: "EV-Class LiFePO4 Batteries. Power on with 3,000 charge cycles for up to 10 years of everyday use, guaranteed." Elgigantens produkttext för den svenska artikeln anger "över 3 000 laddningscykler" och stämmer alltså. Samma sida är också belägget för att deras fält på 1 200 watt är den kontinuerliga effekten medan brödtextens 1 600 watt är SurgePad.',
  },
  {
    publisher: "Jackery",
    title: "Explorer 1000 Pro Portable Power Station, specifikation",
    url: "https://www.jackery.com/products/explorer-1000-pro-portable-power-station",
    market: "US",
    note: 'Tillverkarens egen sida, och den enda källa som anger cellkemin i klartext för den här produkten. FAQ:n svarar ordagrant "The Explorer 1000 Pro uses a ternary lithium battery" och "It is rated for 1000 full charge cycles, at that point you will have approximately 80% of your original capacity". Här står också "1000W, 2000W Peak Surge", "The working volume is at 30dB", vikten 25,4 lbs och "(3+2) Years Guarantee". ⚠️ Sidan anger tre 230 V-uttag; den svenska artikeln hos Elgiganten har två, och uttagsantalet är hämtat därifrån. ⚠️ Sidans korsförsäljningslista visar "LiFePO4 Battery" åtta gånger, samtliga för andra modeller. Inget av det gäller 1000 Pro.',
  },
  {
    publisher: "Clas Ohlson",
    title: "EcoFlow River 3 Plus portabel powerstation 286 Wh",
    url: "https://www.clasohlson.com/se/EcoFlow-River-3-Plus-portabel-powerstation-286-Wh/p/36-375",
    market: "SE",
    note: 'Kategorins bästa svenska specifikation, och den enda butik i svepet som skiljer kontinuerlig effekt från boostläge i klartext: "AC-uttag: 3 × 600 W (X-Boost upp till 1200 W)". Här står också "LiFePo4, 3000 cykler till 80 procent kapacitet", "Ljudnivå: Under 30 dB vid normal användning", vikt, mått, laddtid och solingång. Priser, artikelnummer och kundbetyg för samtliga EcoFlow- och Cocraft-produkter är lästa här samma dag.',
  },
  {
    publisher: "Clas Ohlson",
    title: "EcoFlow Delta 3 portabel powerstation 1024 Wh",
    url: "https://www.clasohlson.com/se/EcoFlow-Delta-3-portabel-powerstation-1024-Wh/p/36-379",
    market: "SE",
    note: 'Samma sorts fullständiga specifikation: "LFP, 4000 cykler till 80 procent kapacitet", "IP-klass: IP65", "Ljudnivå: 30 dB vid 600W, 40 dB vid 1200W", "AC-uttag: 4 × 1800 W (surge 3600 W)" och fem års garanti. Den kontinuerliga effekten på 1 800 watt är belägget mot Elgigantens 2 400 för samma produkt, där 2 400 är X-Boost-talet.',
  },
  {
    publisher: "Clas Ohlson",
    title: "Cocraft Advance 500 Power Station, bruksanvisning",
    url: "https://www.clasohlson.com/medias/sys_master/h0e/hed/68161233354782.pdf",
    market: "SE",
    note: 'Bruksanvisningen i original, fyra språk. Omslaget säger "500 W / 400 Wh" och specifikationstabellen "Typ 22,2 V, 18 Ah, Lithium-ion (18650). Kapacitet 400 Wh". Det är belägget för att talet i modellnamnet är watten och inte wattimmarna. Dokumentet är också det som gör raden för cykeltal tom snarare än gissad: batterityp, cellspänning, amperetimmar, kapacitet och laddtid står utskrivna på alla fyra språken, medan ett cykeltal inte förekommer någonstans i handboken.',
  },
  {
    publisher: "EcoFlow",
    title: "Powerstation, tillverkarens svenska butik",
    url: "https://ecoflow.se/collections/powerstation",
    market: "SE",
    note: "Tillverkarens egen svenska försäljningskanal, 137 artiklar hämtade i klartext 2026-08-05. Använd för att fastställa vilka effekttal EcoFlow själva publicerar för varje modell: River 3 anges till 300 W med X-Boost upp till 600, River 3 Plus till 600 W med X-Boost upp till 1200 och Delta 3 till 1 800 W. Här står också ljudnivån under 30 dB, cirka 3 000 cykler till 80 procent för River 3-serien och femårsgarantin. Priserna ligger inom nio kronor från Clas Ohlsons och används inte som prisunderlag.",
  },
];

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
    publisher: "Ljud & Bild",
    title: "14 powerbanks för flygresan",
    url: "https://www.ljudochbild.se/test/mobil/14-powerbanks-foer-flygresan/",
    date: "2026-02-01",
    market: "SE",
    kind: "test",
    note: "Svensk provning av fjorton powerbanks, med ett eget omdöme och en fullständig specifikation per modell. En av dem rankas här: Anker Nano A1638, alltså sidans testvinnare, som de mätte till 82 × 51 × 36 mm och 231 gram och som de anger till 10 000 mAh / 37 Wh. Deras omdöme om den inbyggda kabeln, att den är en mekanism och ingen gimmick, delar vi. Testet ger inget kriterium för testomdöme på sidan, eftersom en av åtta produkter inte är täckning nog att betygsätta ett fält på. Övriga tretton modeller säljs inte i den hylla sidan jämför och inget av deras resultat är överfört till någon annan produkt.",
  },
  {
    publisher: "Linocell",
    title: "Bruksanvisningar till powerbank 20622, 20623, 80198, 80205 och 80206",
    url: "https://www.kjell.com/globalassets/mediaassets/903896_80198_manual_en_no_sv_20240808.pdf",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egna manualer, samtliga länkade från butikens respektive produktsida. De bär specifikationerna som inte står i säljtexten: energiinnehåll i wattimmar med cellspänning, effekt per port och spänningsnivå, samlad effekt när flera portar används, laddtid, vikt och mått. Det är härifrån de tre cellspänningarna 3,6, 3,7 och 3,85 volt kommer, och härifrån uppgiften att de magnetiska modellernas trådlösa laddning ger 7,5 watt mot en iPhone. Där manualen och butikens produktsida säger olika, som om laddtiden för artikel 80206, gäller manualen.",
  },
  {
    publisher: "Anker",
    title: "Användarguider för A1638 och A1665",
    url: "https://support.anker.com/s/article/Anker-Nano-Power-Bank-10K-45W-Built-In-Retractable-USB-C-Cable-User-Guide-A1638",
    kind: "standard",
    note: "Tillverkarens specifikationer för de två Anker-modeller vars uppgifter butiken inte återger fullständigt. A1638 anger 30 watt in, 45 watt ut på ett uttag och 7,5 watt per uttag när alla tre används samtidigt, vilket är skälet att sidan skiljer på högsta effekt och samlad effekt. A1665 anger USB-C 5 V/3 A och 9 V/2,22 A, alltså 20 watt, där butiken skriver 22,5. Anker anger cellkapacitet men ingen wattimme för A1665, och den cellen står därför tom.",
  },
  {
    publisher: "Kjell & Company",
    title: "Powerbank, produktkategori och specifikationer",
    url: "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank",
    market: "SE",
    note: "Den butik vi kartlagt hylla för hylla, 39 produkter 2026-08-05. Priser, artikelnummer och kundbetyg är lästa här samma dag, tillsammans med den strukturerade specifikationsrutan under Teknisk information på varje produktsida. Butiken länkar också tillverkarnas manualer, vilket är vägen till de uppgifter säljtexten utelämnar.",
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
    note: "Butiken vi kartlagt produkt för produkt, och den som för nästan hela storleksklassen. Priser, artikelnummer och kundbetyg är lästa här 2026-08-05.\n\nSpecifikationerna är lästa i butikens eget specifikationsblock och därefter kontrollerade mot tillverkarens egen sida, manual eller supportartikel. Där de två inte stämmer överens gäller tillverkaren, och där bara butiken har uppgiften står den kvar som butikens.",
  },
  {
    publisher: "Chargerlab",
    title:
      "Teardown of UGREEN Nexode 20000mAh 165W Power Bank with Retractable USB-C Cable (PB726)",
    url: "https://www.chargerlab.com/teardown-of-ugreen-nexode-20000mah-165w-power-bank-with-retractable-usb-c-cable-pb726/",
    market: "US",
    kind: "test",
    note: "Isärtagning av just den Ugreen som jämförs här, matchad på modellbeteckningen PB726. Härifrån kommer energiinnehållet 72 Wh, avläst på produktens egen märkning, och celluppsättningen: fyra SunPower INR21700-5000 på 3,6 V och 18 Wh var, alltså 14,4 V och 5 000 mAh i serie. Talen går ihop med varandra och med de tre andra bankerna på 20 000 mAh.\n\nDärifrån kommer också cellernas uthållighet, över 70 procent kvar efter 1 000 fulla laddcykler, och en vägning på 534 gram mot tillverkarens 535.",
  },
  {
    publisher: "Anker",
    title: "Anker Prime Power Bank användarguider, A110A och A110B",
    url: "https://support.anker.com/s/article/Anker-Prime-Power-Bank-26K-300W-User-Guide-A110A",
    market: "US",
    kind: "standard",
    note: "Tillverkarens egna guider till de två Anker Prime-modellerna. Härifrån kommer uppladdningstiderna: båda blir fulla på ungefär en timme, 26 250 mAh-modellen med en 140 W-laddare och 20 100 mAh-modellen med en på 100 W.\n\nHärifrån kommer också den uttagbara kapaciteten, ungefär 11 250 mAh av 20 100, alltså 56 procent av det nominella talet. Det är den enda tillverkare i jämförelsen som skriver ut den siffran själv.",
  },
  {
    publisher: "Denver",
    title: "Denver PQC-20009, produktblad och bruksanvisning",
    url: "https://denver.eu/other-electronics/powerbanks/denver-pqc-20009-117140000790",
    market: "DK",
    kind: "standard",
    note: "Tillverkarens sida för den billigaste powerbanken i jämförelsen, matchad på artikelnumret 117140000790. Härifrån kommer batterityp och cellspänning, 3,7 V litiumpolymer, samt utgångarnas spänningssteg: USB-A når 10 V och 2,25 A medan USB-C stannar på 12 V och 1,67 A. De 22,5 watten kommer alltså ur USB-A-porten och inte ur USB-C.\n\nVarken produktsidan, produktbladet eller bruksanvisningen anger ett energiinnehåll i wattimmar, och cellen står därför tom.",
  },
  {
    publisher: "Testkompassen",
    title: "Powerbank: 5 favoriter efter hårda tester",
    url: "https://www.testkompassen.se/kategorier/elektronik-och-foto/mobiltilbehor/powerbank",
    market: "SE",
    kind: "comparison",
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
/**
 * /iphone-skarmskydd.
 *
 * De tre första bär sidans fynd och är lästa i original 2026-08-05: skalan
 * slutar på 9H, standarden bakom den är en färgstandard, och standardens eget
 * abstract säger att metoden inte duger till jämförelser.
 */
/**
 * /bluetooth-hogtalare.
 *
 * De två första bär sidan: förordningen som gör batteriet utbytbart 2027 och
 * det enda svenska testet av kategorin. Testet saknar betyg, vilket är
 * kontrollerat recension för recension och är skälet till att sidan inte har
 * något testomdömekriterium.
 */
export const SMARTWATCH_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Träningsklockor och aktivitetsarmband – bäst i test",
    url: "https://www.radron.se/tester/klader-vaskor-motion--fritid/pulsklockor-smartklockor-och-aktivitetsarmband/",
    date: "2026-06-09",
    market: "SE",
    kind: "test",
    note: "Kategorins enda svenska labbprovning, 57 modeller: pulsmätning i vila, gång, löpning och cykling, syremättnad, distans ur både steg och gps, stegräkning, användbarhet, repor, vatten och fall. Metoden är fritt läsbar och resultaten ligger bakom en betalvägg på 59 kronor.\n\n⚠️ Testet är inte köpt, efter användarbeslut. Vi vet alltså inte vilken modell som vann och påstår det aldrig, och sidan har därför inget testomdömekriterium. Deras sidfot förbjuder dessutom uttryckligen all vidarepublicering av testresultat och tabeller.\n\nTvå fritt publicerade slutsatser bär ändå sidan. De skriver att träningsfunktionerna vägt tyngst och att särskild vikt lagts vid pulsmätningen, men också att majoriteten får högsta eller näst högsta betyg och att det är de enskilda delbetygen som skiljer, eftersom vissa modeller har \"ganska stora avvikelser i till exempel hur bra de mäter puls under löpning\". Och de skriver att majoriteten får högsta betyg för repor, vatten och fall, vilket är skälet att tålighet inte är ett kriterium här.",
  },
  {
    publisher: "Apple",
    title: "Apple Watch Series 11, SE 3 och Ultra 3, tekniska specifikationer",
    url: "https://www.apple.com/se/watch/compare/",
    date: "2026-08-06",
    note: "Tillverkarens egen publicering, läst på de tre modellernas svenska specifikationssidor. Batteri: 24, 18 respektive 42 timmars normal användning, och 38, 32 respektive 72 timmar i strömsparläge.\n\nJämförelsesidans fotnot 15 anger testreceptet ordagrant: \"se vad klockan är 300 gånger, få 90 notiser, använda appar i 15 minuter, träna i 60 minuter med musikuppspelning från Apple Watch via Bluetooth samt 6 timmars sömnspårning fördelat över 24 timmar\". Apple skriver också ut att testerna kördes av dem själva i juli och augusti 2025 på förhandsversioner.\n\nSensoruppräkningen skiljer modellerna åt: Series 11 och Ultra 3 listar elektrisk hjärtsensor och sensor för syrenivå i blodet, SE 3 listar optisk hjärtsensor. Ultra 3 är den enda med precisions-gps på två frekvenser, L1 och L5, och den enda med 100 meters vattentålighet enligt ISO 22810:2010.\n\n⚠️ Ingen av de tre sidorna anger batteritid med gps igång. Det är skälet att uthållighet under träning inte bär vikt på sidan.",
  },
  {
    publisher: "Apple",
    title: "Mät syrenivån i blodet med appen Syrenivå i blodet",
    url: "https://support.apple.com/sv-se/guide/watch/apdaf17aa5ef/watchos",
    date: "2026-08-06",
    note: "Tillverkarens egen begränsning av vad funktionen får användas till, ordagrant: \"appen Syrenivå i blodet är inte avsedda för medicinsk användning\" och \"Appen Syrenivå i blodet är inte tillgänglig för användning av personer under 18 år\". EKG-appen är däremot en godkänd medicinteknisk funktion. Skillnaden mellan de två är det kriteriet för hälsosensorer väger.",
  },
  {
    publisher: "Garmin",
    title: "Venu 4-serien, användarhandbok: batteriinformation",
    url: "https://www8.garmin.com/manuals/webhelp/GUID-2CF5620C-E585-4E0A-9CC3-9565533EEE4D/SV-SE/GUID-5B48351E-A637-46DE-A737-9A470C5D1B63.html",
    date: "2026-06-01",
    note: "Handboken i svensk språkversion, v4 juni 2026, med sju batterilägen för samma klocka. För 45-millimetersmodellen: 12 dagar i smartwatchläge, 25 dagar i batterisparläge, 20 timmar med endast gps, 19 timmar med alla satellitsystem, 17 timmar med flera band och 9 timmar med alla satellitsystem och musik.\n\nTolv dagar och nio timmar skiljer med faktor 32, och det är samma klocka i båda ändarna. Handeln trycker det första talet.\n\nGarmins produktsida anger dessutom att EKG-appen är \"en medicinteknisk enhet i klass IIa enligt EU:s förordning om medicintekniska produkter (EU) 2017/745\", vattenklassningen \"Simning, 5 ATM\", gps med flera band och SatIQ, och smartphonekompatibilitet med både iPhone och Android.",
  },
  {
    publisher: "Samsung",
    title: "Galaxy Watch8 och Galaxy Watch Ultra, specifikationer",
    url: "https://www.samsung.com/se/watches/galaxy-watch/galaxy-watch-ultra-titanium-gray-lte-sm-l705fdaaeub/",
    date: "2026-08-06",
    note: "Tillverkarens egen svenska spectabell, som publicerar fyra batteritider för Galaxy Watch Ultra i fyra rader: \"Typisk användningstid (i energibesparing, timmar) Upp till 100\", \"Normal användning (Timmar, AOD Off) Upp till 80\", \"Normal användning (Timmar, AOD On) Upp till 60\" och \"Utomhusträning med GPS (i träningsenergibesparing, h) Upp till 48\". Galaxy Watch8 44 mm anger bara den första sorten, \"Normal användning (Timmar, AOD Off) Upp till 40\", på 435 mAh.\n\nSamsung anger också \"Utbytbart: Nej\" i klartext, och att blodtrycksmätningen kräver \"kalibrering var fjärde vecka med blodtrycksmätare och armmanchett\" samt \"en Samsung Galaxy-mobil med Android OS 12 eller senare och den senaste versionen av Samsung Health Monitor-appen\". Det sista är det som gör Samsung till en annan produkt på en Android-telefon som inte är en Galaxy.\n\n⚠️ Sidan för Galaxy Watch8 Classic motsäger sig själv mellan språkversionerna: den svenska texten säger 30 timmar med alltid på-skärm, den engelska i samma sidkälla säger 30 timmar med skärmen avstängd. Tabellen, som stämmer med sig själv, är den vi använder.",
  },
  {
    publisher: "Huawei",
    title: "Watch GT 6 Pro, specifikationer",
    url: "https://consumer.huawei.com/se/wearables/watch-gt6-pro/specs/",
    date: "2026-08-06",
    note: "Fältets mest fullständiga batteriredovisning, ordagrant: \"Batteriet håller i upp till 21 dagar, upp till 12 dagar vid normal användning, upp till 7 dagar med AOD aktiverat och upp till 40 timmar i utomhussportläget.\" Huawei skriver också ut villkoret för varje tal: lätt användning mäts med skärmen aktiverad 200 gånger per dag, typisk med skärmen på totalt 30 minuter per dag, och utomhussport med \"GNSS alltid på, pulsmätning alltid på\".\n\n21 dagar och 40 timmar är samma klocka. Övriga uppgifter: GNSS på två band, L1 med gps, Glonass, Galileo, BDS och QZSS och L5 med gps, Galileo, BDS och QZSS; 5 ATM enligt ISO 22810:2010; EKG-sensor och djupsensor; 45,6 × 45,6 × 11,25 mm och cirka 54,7 gram utan armband; Android 9.0 eller senare och iOS 13.0 eller senare.",
  },
  {
    publisher: "Withings",
    title: "ScanWatch 2 – Battery life information",
    url: "https://support.withings.com/hc/en-us/articles/17091601036689-ScanWatch-2-Battery-life-information",
    date: "2026-08-06",
    note: "Tillverkarens eget scenario bakom trettio dagar, och kategorins mest avslöjande dokument. Villkoren: 5 000 steg om dagen, 30 minuters träning i veckan med \"Screen Always On\" avstängt, Respiratory Scan av, automatisk syremättnadsmätning av under natten, ett EKG och en SpO2-mätning var tredje dag, fem notiser om dagen och \"Up to 5 minutes per day of total on-screen time\".\n\nWithings skriver också att \"use of connected GPS does not affect battery life\", vilket är sant av ett skäl köparen bör känna till: klockan har ingen egen gps utan använder telefonens.\n\nStällt mot Apples recept, 300 blickar och 90 notiser på ett dygn, är det tydligt att trettio dagar och tjugofyra timmar inte mäter samma sak.",
  },
  {
    publisher: "Google",
    title: "Pixel Watch 4, tekniska specifikationer",
    url: "https://store.google.com/se/product/pixel_watch_4_specs?hl=sv",
    date: "2026-08-06",
    note: "Den enda tillverkaren i fältet vars rubriktal är det hårdare av två. Google anger för 45-millimetersmodellen \"455 mAh (normalt)\", \"Upp till 40 timmar med alltid aktiv skärm\" och \"Upp till 72 timmar med batterisparläge\", samt laddning på cirka 15 minuter till 50 procent, 25 minuter till 80 och 45 minuter till 100.\n\nGoogle begränsar också EKG-appen själva: \"EKG-appen är endast tillgänglig i vissa länder. Ej avsedd att användas av personer under 22 år.\"",
  },
  {
    publisher: "Amazfit",
    title: "Balance 2 och T-Rex 3 Pro, produktsidor",
    url: "https://us.amazfit.com/products/t-rex-3-pro",
    date: "2026-08-06",
    note: "T-Rex 3 Pro publicerar tre lägen för 48-millimetersmodellen: 25 dagar med typisk användning, 38 timmar i noggrant gps-läge och 85 timmar i gps-batterisparläge. 44-millimetersmodellen anges till 17 dagar, 26 timmar och 60 timmar. Balance 2 anges till 21 dagar med typisk användning.\n\nAmazfit definierar också sina scenarier: typiskt är pulsmätning var femte minut, tungt är pulsmätning varje minut. Båda modellerna har 10 ATM, sex satellitsystem och safirglas, och T-Rex 3 Pro är certifierad för fridykning till 45 meter.\n\n⚠️ Ingen av de två har EKG. Det är fastställt ur tillverkarens egen uttömmande sensoruppräkning på båda produktsidorna: optisk pulssensor, accelerometer, gyroskop, barometer, ljussensor, geomagnetisk sensor och temperatursensor, och ingen elektrisk hjärtsensor, och inte ur en misslyckad sökning.",
  },
  {
    publisher: "Kjell & Company",
    title: "Smartklockor och -ringar",
    url: "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar",
    date: "2026-08-06",
    market: "SE",
    note: "Butiken fyra av de elva klockorna är prissatta hos, 254 artiklar i kategorin. Källa för pris, lagerstatus och kundbetyg.\n\n⚠️ Butikens batteribullets bär tillverkarens tal utan villkoret. Galaxy Watch8 står som \"Upp till 40 timmars batteritid\", vilket i Samsungs egen tabell är raden för alltid på-skärm avstängd. Skarpast syns det på två artiklar bredvid varandra: Galaxy Watch Ultra (2025) bär \"Upp till 100 h batteritid\" och den nyare Galaxy Watch Ultra2 \"Upp till 60 timmars normal användning\", vilket får den äldre att se ut att hålla 67 procent längre. Talen kommer från två olika rader i samma tabell.\n\nButiken gör tvärtom på en enda artikel: Garmin Forerunner 55 bär bulleten \"14 dagars batteritid (20 h i GPS-läge)\". Det är alltså tillverkarens underlag och inte butikens policy som slår igenom.\n\n⚠️ Butiken för inte Apples nuvarande generation. Underkategorin Apple Watch har 50 artiklar varav i praktiken tio klockor, samtliga Series 9 eller Ultra 2.",
  },
  {
    publisher: "Proshop",
    title: "Smartwatch, smartklockor och träningsklockor",
    url: "https://www.proshop.se/Pulsmaetare-Stegraeknare",
    date: "2026-08-06",
    market: "SE",
    note: "Butiken sex av de elva klockorna är prissatta hos, och en av få svenska handlare som för Apples nuvarande generation. Varje artikel bär streckkod och tillverkarens eget artikelnummer, vilket är det som gjort att varje rad i tabellen går att knyta till rätt storlek och färg.\n\n⚠️ En URL som byggdes för hand under researchen gav HTTP 200 på en helt annan produkt, en USB-hubb i stället för en Withings-klocka. Varje adress som används här är hämtad ur butikens egen sökning eller kategorilistning.",
  },
  {
    publisher: "Komplett",
    title: "Google Pixel Watch 4 45mm WiFi",
    url: "https://www.komplett.se/product/1326843/mobil-tablets-klockor/smartwatches/google-pixel-watch-4-45mm-wifi-svart",
    date: "2026-08-06",
    market: "SE",
    note: "Butiken Pixel Watch 4 är prissatt hos, eftersom Proshop för den som utgången.\n\n⚠️ Sidan publicerar två batteritider i två fält och rubrikfältet bär det generösare. \"Batteri › Körtid\" säger 72 timmar, medan \"Specifikationer för batterilivslängd › Körtidsinformation\" säger ordagrant \"Alltid aktivt displayläge - upp till 40 timme/timmar, Batterisparläge - upp till 72 timme/timmar\". Rubriktalet är alltså batterisparlägets, och villkoret står två rader längre ned på samma sida. Vår tabell använder tillverkarens 40 timmar för vardagsraden.",
  },
];

export const BLUETOOTH_HOGTALARE_SOURCES: Source[] = [
  {
    publisher: "Europeiska unionen",
    title:
      "Förordning (EU) 2023/1542 om batterier och förbrukade batterier, artikel 11",
    url: "https://eur-lex.europa.eu/legal-content/SV/TXT/HTML/?uri=CELEX:32023R1542",
    date: "2023-07-12",
    kind: "standard",
    note: 'Läst i original i svensk språkversion på EUR-Lex, CELEX 32023R1542. Artikel 11.1, ordagrant: "Varje fysisk eller juridisk person som på marknaden släpper ut produkter där det ingår bärbara batterier ska säkerställa att dessa batterier lätt kan avlägsnas och ersättas av slutanvändaren när som helst under produktens livslängd." Samma punkt definierar lätt att avlägsna som att det ska gå "med hjälp av kommersiellt tillgängliga verktyg, utan att det krävs användning av specialverktyg […] värmeenergi eller lösningsmedel", och kräver att anvisningar för batteribyte görs permanent tillgängliga på en offentlig webbplats. Slutartikeln anger tillämpningsdatum: "Artikel 11 ska tillämpas från och med den 18 februari 2027." Artikel 11.2 a låter apparater "särskilt utformade för att främst användas i en miljö som regelbundet innebär vattenstänk, strömmande vatten eller nedsänkning i vatten och som är avsedda att vara tvättbara eller sköljbara" nöja sig med att batteriet kan bytas av en oberoende yrkesutövare, och samma punkt begränsar undantaget till fall där det "är nödvändigt för att säkerställa användarens och apparatens säkerhet". ⚠️ Vi bedömer aldrig om en enskild högtalare omfattas av undantaget; det är tillverkarens bedömning mot den egna konstruktionen.',
  },
  {
    publisher: "Ljud & Bild",
    title: "De bästa bärbara högtalarna",
    url: "https://www.ljudochbild.se/test/hogtalare/de-basta-barbara-hogtalarna/",
    date: "2025-07-07",
    market: "SE",
    note: "Kategorins enda svenska test, av chefredaktör Lasse Svendsen. Sju modeller: JBL Charge 6, JBL Flip 7, Sony ULT Field 5, Sony ULT Field 3, Marshall Kilburn III, Marshall Middleton II och Soundcore Boom 2 Pro. Fyra av dem ligger i vår rankning, tre är partihögtalare och ligger bland de övervägda. ⚠️ Testet sätter inga betyg. Samtliga sju enskilda recensioner är hämtade och genomsökta efter betyg, poäng och stjärnmönster, och noll av sju bär något. Därför finns inget testomdömekriterium på sidan. Deras omdömen om enskilda modeller återges i våra recensioner med publikationen namngiven. Källan används också för vikt, eftersom butikens viktfält visade sig ange mer än dubbla den verkliga vikten för en av modellerna.",
  },
  {
    publisher: "Elon",
    title: "Bluetooth-högtalare",
    url: "https://www.elon.se/ljud/hogtalare/bluetooth-hogtalare",
    date: "2026-08-05",
    market: "SE",
    note: "Butiken samtliga tio rankade högtalare är prissatta hos, 88 produkter i kategorin. Källa för pris och kapslingsklass. ⚠️ Butiken anger speltiden på två ställen på samma produktsida och talen skiljer sig för de modeller som anger flest timmar: JBL Charge 6 står som 28 timmar i säljpunkterna och 24 i specifikationens fält, JBL Flip 7 som 16 respektive 14. Tabellen visar en speltid per modell, kontrollerad mot tillverkaren där den publicerar talet. ⚠️ Butikens viktfält anger 1,23 kg för JBL Flip 7 där tillverkaren och Ljud & Bild ger 0,56 kg, sannolikt förpackad vikt, och vikt har därför inte hämtats därifrån. ⚠️ Butikens sida för JBL Charge Essential 3 nämner ingen powerbank-funktion. Den finns, och är belagd hos två andra butiker.",
  },
  {
    publisher: "Marshall",
    title: "Emberton III och Middleton II, produktsidor och bruksanvisning",
    url: "https://www.marshall.com/se/sv/product/emberton-iii",
    date: "2026-08-06",
    note: 'Tillverkarens egen publicering, läst 2026-08-06. Emberton III anges till "32+ HOURS OF PORTABLE PLAYTIME", full laddning på 2 timmar och 20 minuters snabbladdning för 6 timmars speltid; Middleton II till "30+ HOURS" och 230 × 98 × 110 mm. Elon anger 30 timmar för Emberton III, alltså föregångarens tal, och 30 för Middleton II. Tabellen använder tillverkarens. Den fullständiga bruksanvisningen till Emberton III ger batterityp (litiumjon), fäste för rem där remmen inte ingår, och att två enheter kan vara anslutna samtidigt. ⚠️ Marshall publicerar varken batteriets wattimmar eller Bluetooth-versionen för någon av modellerna. Cellerna står tomma och inget betyg sänks av det.',
  },
  {
    publisher: "Harman Kardon",
    title: "Luna, spec sheet",
    url: "https://www.harmankardon.se/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw08c287d5/pdfs/HK_LUNA_Spec_Sheet_SV.pdf",
    date: "2026-08-06",
    note: "Tillverkarens eget produktblad, läst i original. Ger batteriet som litiumjonpolymer 17,28 Wh (3,6 V / 4 800 mAh), 12 timmars musikspeltid, 2,5 timmars laddningstid, Bluetooth 5.3 och stereoparning mellan två Luna. ⚠️ Produktbladet skiljer på produktens vikt 0,71 kg och förpackningens vikt 1,13 kg, medan tillverkarens egen webbspectabell publicerar 1,13 utan att säga vilken av dem det är. Sidan använder 0,71 kg. Bladet anger också att USB-porten bara är avsedd för service utanför den amerikanska versionen, vilket är skälet till att powerbank står som nej.",
  },
  {
    publisher: "Urbanista",
    title: "Malibu, produktsida och bruksanvisning",
    url: "https://urbanista.com/products/malibu",
    date: "2026-08-06",
    note: "Tillverkarens spectabell, läst 2026-08-06. Ger batteriet som 1 800 mAh vid 7,4 V, alltså 13,3 Wh, en batterireserv på 20 timmar, Bluetooth 5.2 med profilerna A2DP, AVRCP och SPP, samt IP67. Bruksanvisningen ger USB-C och appen Urbanista Audio. Samtliga dessa uppgifter stod tidigare som okända på sidan, hämtade enbart ur butiksledet.",
  },
  {
    publisher: "Sonos",
    title: "Roam 2",
    url: "https://www.sonos.com/en/shop/roam-2",
    date: "2026-08-06",
    note: "Tillverkarens produktsida. Bekräftar 18 Wh, upp till 10 timmars uppspelning vid måttlig volym, Bluetooth 5.2, IP67 med nedsänkning en meter i trettio minuter, samt 0,43 kg och 168 × 62 × 60 mm.",
  },
  {
    publisher: "Kjell & Company",
    title: "JBL Flip Essential 2",
    url: "https://www.kjell.com/se/produkter/ljud-bild/hogtalare/tradlosa-bluetooth-hogtalare/jbl-flip-essential-2-tradlos-bluetooth-hogtalare-p24277",
    date: "2026-08-06",
    note: "Använd för JBL:s Essential-modeller. Ger Flip Essential 2 som litiumjonpolymer 11,7 Wh (3,6 V / 3 250 mAh), 3 timmars laddningstid, Bluetooth 5.1, 520 g och IPX7. Butiken anger också 14 timmar för JBL Flip 7, alltså samma tal som Elons specifikationsfält och inte samma som Elons säljpunkt, vilket är det oberoende belägg tabellen vilar på.",
  },
  {
    publisher: "Clas Ohlson och Proshop",
    title: "JBL Charge Essential 3, två oberoende produktsidor",
    url: "https://www.clasohlson.com/se/JBL-Charge-Essential-3-Bluetooth-hogtalare,-vattentat/p/10-1-405",
    date: "2026-08-06",
    note: "Två butiker oberoende av varandra anger samma uppgifter: 27 Wh litiumjon (3,6 V / 7 500 mAh), 20 timmars speltid, cirka 4 timmars laddtid, Bluetooth 5.4, Auracast och USB-C in och ut. Det sista är avgörande: modellen laddar telefonen, vilket Elons produktsida inte nämner och vilket sidan tidigare beskrev som en funktion bara vinnaren hade.",
  },
  {
    publisher: "Stiftung Warentest",
    title: "Lautsprecher im Test",
    url: "https://www.test.de/Lautsprecher-im-Test-4987334-0/",
    market: "DE",
    note: "Med som belägg för vad som finns och inte finns av oberoende provning. Warentest provar högtalare löpande, men vi har inte kunnat knyta något publicerat resultat till de tio modeller sidan rankar, och innehållet ligger dessutom bakom betalvägg. Ingen uppgift på sidan är hämtad härifrån, och vi återger inga betyg därifrån.",
  },
  {
    publisher: "M3",
    title: "Test av 10 trådlösa bluetooth-högtalare",
    url: "https://www.m3.se/article/1845174/test-av-10-tradlosa-bluetooth-hogtalare.html",
    market: "SE",
    note: "Svensk jämförelse i samma kategori, med som mätpunkt. ⚠️ Inte läst i original vid publicering, och ingen uppgift på sidan är hämtad härifrån. Ska läsas vid nästa runda, både för modellöverlappet och för att kontrollera om någon svensk publikation tagit upp batteriförordningen.",
  },
];

export const IPHONE_SKARMSKYDD_SOURCES: Source[] = [
  {
    publisher: "ASTM International",
    title:
      "ASTM D3363-22, Standard Test Method for Film Hardness by Pencil Test",
    url: "https://store.astm.org/d3363-22.html",
    date: "2022-07-11",
    market: "US",
    kind: "standard",
    note: 'Standarden bakom talet 9H, läst i original. §1.1: "This test method covers a procedure for rapid, inexpensive determination of the film hardness of an organic coating on a metal or similarly hard substrate in terms of drawing leads or pencil leads of known hardness." Registerdata på samma sida: kommitté D01, Book of Standards vol. 06.01, alltså färgvolymen. §5.3 varnar för jämförelser: "Caution should be used when attempting to compare coatings of similar film hardness." §5.2 och not 3 anger att resultatet varierar mellan laboratorier och mellan pennfabrikat och pennsatser, och §5.5 att en gemensam uppsättning referenspennor måste avtalas om talet ska ligga till grund för ett köpavtal. §1.2 anger metoden som likvärdig i innehåll men inte tekniskt likvärdig med ISO 15184.',
  },
  {
    publisher: "ISO",
    title:
      "ISO 15184:2020, Paints and varnishes – Determination of film hardness by pencil test",
    url: "https://www.iso.org/standard/76044.html",
    date: "2020-01-08",
    kind: "standard",
    note: 'Den internationella motsvarigheten, tredje utgåvan. Titeln placerar metoden i färg och lack, ICS 87.040, teknisk kommitté ISO/TC 35/SC 9. Abstractet, ordagrant och avgörande: "This document specifies a method for determining the film hardness by pushing pencils of known hardness over the film. […] This rapid test has not been found to be useful in comparing the pencil hardness of different coatings. It is more useful in providing relative ratings for a series of coated panels exhibiting significant differences in pencil hardness." Att jämföra olika produkter är det enda talet används till i handeln. Standarden ligger sedan 2025-07-04 i status 90.92, alltså under revidering.',
  },
  {
    publisher: "Tekra",
    title: "Tek Tip: Pencil Hardness Test",
    url: "https://www.tekra.com/sites/default/files/downloads/Tek_Tip_Pencil_Hardness-Test.pdf",
    market: "US",
    kind: "standard",
    note: 'Teknisk not från en distributör av funktionsfilm, hämtad som PDF och läst i original. Två uppgifter bär sidan. Skalans omfång: "When expressing the measurement of pencil hardness, we do so with a value scale that ranges from 6B, softest, to 9H, hardest." 9H är alltså maximum och inte ett resultat. Och lastens betydelse, under rubriken Common Pitfalls: "One common way to alter the test is to lower the gram load weight used with the pencil hardness tester. The less pressure that is put on the pencil, there is a smaller chance that the lead will scratch the film, thus yielding a \'higher pencil hardness value\'." Noten anger också att ASTM D3363 kräver att vikten redovisas i resultatet.',
  },
  {
    publisher: "U.S. National Park Service",
    title: "Mohs Hardness Scale",
    url: "https://www.nps.gov/articles/mohs-hardness-scale.htm",
    market: "US",
    kind: "standard",
    note: "Mineralskalan, alltså den skala talet 9H ofta förväxlas med. Myndighetens egen tabell: diamant 10, korund 9, topas 8, kvarts 7, ortoklas 6, apatit 5. Bland de vardagsföremål som listas för jämförelse ligger en stålspik på 6,5 och en glasskiva på 5,5. Kvarts är huvudbeståndsdelen i vanlig sand, och den ligger alltså över allt glas på skalan. Används på sidan för att förklara varför sand repar ett skärmskydd oavsett vilket H-tal som står på kartongen.",
  },
  {
    publisher: "connect",
    title: "Displayschutz: 13 Folien für Smartphones im Test",
    url: "https://www.connect.de/vergleich/displayschutz-folien-test-vergleich-smartphone-2697784.html",
    date: "2014-11-18",
    market: "DE",
    note: "Den enda riktiga labbprovningen av kategorin som hittats. En filtskiva med bestämd hårdhet och diameter kördes över folien i nio steg med stigande antal slag och kraft, med kontroll i särskild belysning efter varje steg och väntetid för självläkande effekter; godkänt krävde 8 newton och 30 000 slag. Optiskt mättes luminans, kontrast, gloss och haze. Åtta av tretton klarade proceduren utan skador, men fem visade nötning i olika grad, och tre antireflexfolier föll på haze och kontrast eftersom de är byggda för låg spegling. ⚠️ Provningen är från 2014, gäller folier snarare än härdat glas och innehåller inte en enda av de produkter sidan rankar. Inget betyg härifrån är knutet till någon produkt. Metoden och mätstorheterna bär köpguiden.",
  },
  {
    publisher: "PanzerGlass",
    title:
      "PanzerGlass 2-way Privacy Screen Protector iPhone 17 Pro, Ultra-Wide Fit",
    url: "https://panzerglass.com/products/panzerglass%C2%AE-2-way-privacy-screen-protector-iphone-17-pro-ultra-wide-fit-w-easyaligner",
    date: "2026-08-05",
    market: "DK",
    note: "Tillverkarens egen produktsida, läst i sin helhet. Källa för täckning, sekretessfilter, EasyAligner och andelen återvunnet glas, 60 procent, certifierad enligt Global Recycled Standard. Sidan anger inget hårdhetstal, ingen tjocklek, ingen glastyp och ingen provmetod för glasets styrka, vilket är skälet till att de cellerna står tomma i tabellen.",
  },
  {
    publisher: "Spigen",
    title:
      "iPhone 17 Series GLAS.tR EZ Fit (Sensor Protection) Screen Protector",
    url: "https://www.spigen.com/products/iphone-17-series-screen-protector-glas-tr-ez-fit-sensor-protected",
    date: "2026-08-05",
    note: 'Tillverkarens egen produktsida. Källa för att förpackningen innehåller två skydd och en monteringsbygel, för AluminaCore-lagret och för att skyddet täcker sensorerna ovanför skärmen. Sidan har ingen specifikationstabell och anger varken tjocklek eller provmetod. Hårdheten anges som "9H plus" i en bildbeskrivning, alltså ett steg över pennskalans tak enligt ASTM D3363 och Tekras not ovan.',
  },
  {
    publisher: "Råd & Rön",
    title: "Tester, telefoni, datorer och internet",
    url: "https://www.radron.se/tester/telefoni-datorer--internet/mobiler/",
    market: "SE",
    note: "Med som belägg för att kategorin saknar oberoende svensk provning. Råd & Rön provar mobiltelefoner men har ingen provning av skärmskydd; sökning över radron.se ger en konsumenträttsfråga om bytesrätt och inget test. Ingen uppgift på sidan är hämtad härifrån. ⚠️ En svensk jämförelsesajt tillskriver Råd & Rön ett laboratorietest av ljustransmission genom skärmskydd. Något sådant test har inte gått att hitta, och vi varken citerar eller motbevisar uppgiften.",
  },
  {
    publisher: "Testkollen",
    title: "Skärmskydd bäst i test 2026",
    url: "https://www.testkollen.se/skarmskydd-mobil",
    market: "SE",
    note: "Konkurrent, med som mätpunkt och inte som underlag. 11 821 ord, fem rankade skydd, och den mest utförliga svenska sidan i kategorin. Talet 9H förekommer åtta gånger, alltid som en produktegenskap och aldrig förklarat. Kontrollerat term för term: ASTM, D3363, ISO 15184, pennhårdhet och provlast förekommer inte en enda gång. Ingen uppgift är hämtad härifrån.",
  },
  {
    publisher: "Reparera iPhone",
    title: "Bäst i test: Skärmskydd iPhone 17",
    url: "https://repareraiphone.se/skarmskydd-iphone-17-bast-i-test/",
    market: "SE",
    note: 'Konkurrent, med därför att den är den enda svenska sidan som försöker förklara vad 9H betyder, och därför att förklaringen pekar på fel skala. Ordagrant: "Du ser ofta beteckningen 9H. Detta refererar till Mohs hårdhetsskala där diamant är 10." Talet kommer ur pennskalan i ASTM D3363 och ISO 15184, se de tre första källorna. Ingen uppgift är hämtad härifrån.',
  },
  {
    publisher: "Testix",
    title: "Skärmskydd bäst i test 2026",
    url: "https://testix.se/test/skarmskydd",
    market: "SE",
    note: "Konkurrent, med som mätpunkt. 6 838 ord, fem rankade skydd över flera telefonmärken, monetiserad via PriceRunners betalda klick-ut. Talet 9H förekommer inte alls, och inte heller någon förklaring av hur reptålighet mäts. Ingen uppgift är hämtad härifrån.",
  },
];

/**
 * De tre MIL-STD-810-utgåvorna, delade av /iphone-skal och /galaxy-s26-skal.
 *
 * Ligger i en egen konstant därför att standarden inte är telefonberoende och
 * båda sidorna vilar på exakt samma läsning av den. Två kopior hade kunnat
 * glida isär, och noterna nedan bär citat ur dokumenten som det tog en halv
 * dags PDF-extraktion att få fram.
 *
 * Läsningen bär numera ingenting annat än ett skäl att **inte** betygsätta. Båda
 * sidorna hade ett kriterium för öppen redovisning som vägde talen; på
 * /galaxy-s26-skal togs det bort 2026-08-06, eftersom det rankade vem som
 * skrivit ut en siffra i stället för vad skalet gör. Citaten nedan är skälet:
 * provvillkoren får ändras och de 26 fallen får delas på fem exemplar, så två
 * tal mäter inte samma sak ens när båda anges.
 */
const MIL_STD_810_SOURCES: Source[] = [
  {
    publisher: "US Department of Defense",
    title:
      "MIL-STD-810H, Environmental Engineering Considerations and Laboratory Tests",
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
];

export const IPHONE_SKAL_SOURCES: Source[] = [
  ...MIL_STD_810_SOURCES,
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
 * Källor för /galaxy-s26-skal och /galaxy-s26-fodral.
 *
 * ⚠️ Kategorin saknar oberoende provning av skal, precis som iPhone-sidorna.
 * Telefonerna är däremot väl provade av Mobil.se, PC-tidningen och Prisjakt.
 * **De testerna gäller telefoner och får aldrig citeras som stöd för ett
 * skalomdöme**, och de står därför inte här.
 */
export const GALAXY_S26_SOURCES: Source[] = [
  ...MIL_STD_810_SOURCES,
  {
    publisher: "Samsung",
    title: "Vi introducerar den senaste Galaxy S26-serien",
    url: "https://www.samsung.com/se/mobile-phone-buying-guide/introducing-samsung-galaxy-s26/",
    date: "2026-02-25",
    market: "SE",
    note: 'Tillverkarens egen svenska sida, läst i original 2026-08-05. Källa för vilka modeller serien består av och när de kom: "Galaxy S26, S26+ och S26 Ultra presenterades den 25th februari 2026 på Galaxy Unpacked." Avgör sidans avgränsning. ⚠️ Svensk teknikpress skrev under ryktesfasen om en serie med namnen Pro och Edge, och de rubrikerna ligger kvar i sökresultaten. De namnen finns inte i Samsungs egen text och används aldrig på sajten. Bekräftat mot Elgigantens produktdata, där modellnamnet är Samsung Galaxy S26 och serien S26, och mot Skal-mans modellnavigation.',
  },
  {
    publisher: "9to5Google",
    title:
      "Samsung's excuse for skipping Qi2 magnets in Galaxy S26 ignores the big picture",
    url: "https://9to5google.com/2026/02/28/samsung-galaxy-s26-qi2-magnets-problem/",
    date: "2026-02-28",
    market: "US",
    note: 'Bär båda sidornas fynd, och det bärande i den är ett citerat tillverkarsvar snarare än publikationens bedömning. Samsung uppgav till 9to5Google att serien saknar inbyggda Qi2-magneter som en del av företagets "commitment to thinner, lighter designs", och att "Galaxy S26 series supports Qi2-compatible phone cases, offering users flexibility without embedding the feature directly into the device". Tillverkaren hänvisar alltså köparen till skalet för en funktion telefonen inte har, samtidigt som Samsung säljer magnetisk powerbank och magnetladdare till serien. ⚠️ Bedömningen att 25 W i praktiken kräver ett magnetiskt skal, eftersom ingen Qi2 25 W-laddare på marknaden saknar magnetisk uppriktning, är publikationens och inte tillverkarens. Den återges som en bedömning och aldrig som en mätning.',
  },
  {
    publisher: "Samsung",
    title: "Galaxy S26 Ultra, specifikationer",
    url: "https://www.samsung.com/se/smartphones/galaxy-s26-ultra/specs/",
    market: "SE",
    note: "Tillverkarens egen specifikation, läst 2026-08-05. Specifikationen tar varken upp Qi2 eller trådlös laddning, och den enda magnet som nämns är den geo-magnetiska sensorn, alltså kompassen. Det stämmer med Samsungs svar till 9to5Google. ⚠️ Sidan gäller Ultra-modellen; skalsidan rankar basmodellen. Uppgiften används enbart om serien som helhet, aldrig om en enskild modells mått.",
  },
  {
    publisher: "Skal-man.se",
    title: "Skal eller fodral till Samsung Galaxy S26, S26 Plus och S26 Ultra?",
    url: "https://skal-man.se/blogs/nyheter/skal-eller-fodral-till-samsung-galaxy-s26-s26-plus-och-s26-ultra",
    date: "2026-03-25",
    market: "SE",
    note: 'Konkurrent, med som mätpunkt och inte som underlag. Enda svenska texten som täcker både skal och fodral till serien. Läst i sin helhet 2026-08-05 och kontrollerad term för term: den rankar ingen produkt, anger inget pris, hänvisar till ingen provning, och nämner varken magnet, Qi2 eller trådlös laddning en enda gång. Påstår dessutom att "Alla våra fodral till Samsung Galaxy S26, S26 Plus och S26 Ultra har även kortfack", vilket beskriver butikens sortiment och inte kategorin. Ingen uppgift är hämtad härifrån.',
  },
];

/**
 * Källor för /galaxy-s26-fodral.
 *
 * Delar modellfrågan, magnetfrågan och konkurrenten med skalsidan, och lägger
 * till de tillverkarkällor som bär fodralsidans specifikationer. De ligger inte
 * i den delade listan eftersom de bara gäller plånboksfodralen.
 */
export const GALAXY_S26_FODRAL_SOURCES: Source[] = [
  ...GALAXY_S26_SOURCES,
  {
    publisher: "Partner Tele.com",
    title: "Produktkatalog, kabura Mezzo, Tender, Sensitive, Luna och Smart Pro",
    url: "https://partnertele.com/akcesoria_do_samsung_galaxy_s26/etui_do_samsung_galaxy_s26",
    market: "PL",
    note: "Tillverkaren bakom de fem fodral som säljs utan varumärke i Sverige och heter Holster i sin egen katalog. Varje artikel bär två fält som avgör sidans viktigaste kolumn: Wsparcie uchwytów magnetycznych och Wsparcie ładowania bezprzewodowego. Båda står på nie för samtliga fem, alltså varken stöd för magnetiska hållare eller trådlös laddning genom fodralet.\n\nHärifrån kommer också antalet innerfickor: tre för Tender, två för Mezzo, en för Sensitive, Luna och Smart Pro, samt Lunas aluminiumram och silikonhållare. Smart Pro anges som skóra naturalna och TPU, alltså äkta läder, och artikeln heter Smart Pro Book skórzane.\n\nLäst per artikel 2026-08-06 och matchad på EAN mot butikens artikelnummer, eftersom en gissad URL svarar 200 på en sida utan produkten.",
  },
  {
    publisher: "Tech-Protect",
    title: "Wallet MagSafe, Wallet och Smart Wallet för Galaxy S26",
    url: "https://tech-protect.eu/pl/products/tech-protect-wallet-magsafe-galaxy-s26-matte-black-187849.html",
    market: "PL",
    note: 'Tillverkarens egen butik, läst 2026-08-06. Specifikationstabellen anger MagSafe: Tak för Wallet MagSafe Matte och MagSafe: Nie för Wallet, vilket är skillnaden mellan att kunna hänga på en magnetladdare och att inte kunna det. Matte anger dessutom "ładowanie bezprzewodowe bez zdejmowania etui", alltså trådlös laddning utan att fodralet tas av. Funkcja podstawki står på Tak för båda.\n\nMattes artikelsida räknar upp förpackningens innehåll under Zestaw zawiera, och där står ett enda föremål: "1 × Etui Tech-Protect Wallet MagSafe". Det är grunden för Nej på handledsrem, alltså en uppräkning och inte en tystnad.\n\nFör Smart Wallet beskrivs fönsterfunktionen och att den styrs av en app som laddas ner separat. Antalet kortfack anges inte för någon av de tre, vilket är kontrollerat på tillverkarens sida och inte utläst ur butikstexten.',
  },
  {
    publisher: "Puro",
    title: "Coque Wallet Stand, Samsung Galaxy S26",
    url: "https://www.puro.it/fr-eu/products/coque-wallet-stand-samsung-galaxy-s-26",
    market: "IT",
    note: "Tillverkarens egen produktsida, läst 2026-08-06 och matchad på artikelnummer PUSGS26BOOKC8BLK, som är samma som butikens MPN. Anger fonction de support, rabat en cuir PU, 2 poches pour cartes, poche d'argent, bordures souples TPU och fermeture magnétique. Modellnamnet är Wallet Stand. Puros eget pris är 29,95 euro, vilket är underlaget för prisjämförelsen i omdömet.",
  },
  {
    publisher: "Celly",
    title: "Wally, datablad WALLY1163",
    url: "https://www.celly.com/en/datasheet/wallet-case-wally1163",
    market: "IT",
    note: "Tillverkarens datablad, läst 2026-08-06 och matchat på EAN 8021735226284. Anger built-in stand function, inside pockets for cards and documents, hard shell, horizontal closure with magnetic flap och faux leather. ⚠️ Databladets måttfält står på 0 cm i höjd, bredd och längd, och viktangivelsen 30 gram är därför behandlad som platshållardata och inte publicerad, trots att Icecat återger samma tal.",
  },
  {
    publisher: "Icecat",
    title: "Produktdata för Gear 7319925994572 och Celly 8021735226284",
    url: "https://icecat.biz/",
    note: "Strukturerad produktdata, hämtad på GTIN 2026-08-06. Bekräftar för Gear: Trådlös laddning Ja, Skrivbordsstativ Ja, Antal kort fickor 3, Handledsrem ingår Nej och vikt 72 gram. För Celly: Skrivbordsstativ Ja och Antal kort fickor 3, vilket är den andra källan bakom antalet. ⚠️ Tier B, alltså en katalog och inte tillverkaren själv. Nio av elva prövade artikelnummer gav ingen data, antingen bakom betalnivån eller utanför katalogen, vilket aldrig säger något om vad tillverkaren publicerar.",
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
    title:
      "SS-EN 3-7:2004, Brand och räddning – Handbrandsläckare – Del 7: Egenskaper, funktionskrav och provningsmetoder",
    url: "https://www.sis.se/produkter/miljo-och-halsoskydd-sakerhet/skydd-mot-brand/brandbekampning/ssen372004/",
    kind: "standard",
    note: "Standarden som avgör vad talen på burken betyder, och skälet till att sidan alls går att skriva. Enligt LTH-rapporten klassas inom EU alla brandsläckningsprodukter avsedda för privatbruk enligt SS-EN 3–7, med undantag för brandfiltar. Det gäller alltså även släcksprayer, vilket är sidans utgångspunkt: sprayen säljs bredvid handbrandsläckaren och mäts med samma måttstock. A avser fibrösa bränslen som trä, textil och kartong, och talet framför är storleken på testbålet; B avser vätskeformiga bränslen och talet är liter n-heptan; C avser gasformiga bränslen och F fettbränder. D för metallbränder omfattas inte av standarden men förekommer ändå på släckare avsedda för det, vilket är relevant för litiumsprayerna. ⚠️ Vi har inte köpt standarden och återger därför ingenting om provvillkoren utöver det rapporten beskriver. Samma hållning som SS-EN 810 på /avfuktare och SS-EN 12453 på /garageportsoppnare.",
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

/**
 * Mjölkskummare.
 *
 * Kategorin har en riktig svensk labbprovning, vilket är ovanligt: Råd & Rön
 * har provat 18 elektriska mjölkskummare med ett provprogram som täcker fem
 * mjölksorter, skummets fasthet, temperatur, energiförbrukning och ljudnivå.
 *
 * ⚠️ Resultaten per modell ligger bakom betalvägg som vi **inte** betalat,
 * efter användarbeslut 2026-08-05. Därför finns inget testomdömekriterium, och
 * vi påstår aldrig vilken produkt som vann. Det fria utdraget bär metoden,
 * betygsspannet och temperaturbandet, och det är allt vi använder. Samma
 * hållning som Stiftung Warentest på /powerbank.
 *
 * ⚠️ `.../mjolkskummare/sa-testar-vi-mjolkskummare/` cirkulerar i sökresultat
 * men svarar med Råd & Röns egen 404-sida. Länka aldrig den; metodlistan står
 * på testsidan själv.
 *
 * Tillverkarnas egna sidor bär sidans fynd. Severins svenska butik publicerar
 * skummax och värmemax var för sig genom hela sortimentet, vilket är det som
 * gör spridningen mätbar.
 */
const MJOLKSKUMMARE_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Mjölkskummare – bäst i test: 18 elektriska mjölkskummare",
    url: "https://www.radron.se/tester/koksmaskiner-stadning/mjolkskummare/",
    date: "2024-09-03",
    market: "SE",
    kind: "test",
    note: "Kategorins enda oberoende labbprovning. Skummar och värmer lättmjölk, mellanmjölk, standardmjölk samt mjölkdryck av soja och mandel, och mäter skummets fasthet, textur och stabilitet, tiden, energiförbrukningen och ljudnivån. Det fria utdraget anger att skummet bör hålla 63 till 67 grader, att volymökningen är måttet på skumkvalitet, och att bara testets bästa klarar alla mjölksorter. Resultat per modell ligger bakom betalvägg vi inte betalat, så inget betyg härifrån knyts till en produkt.",
  },
  {
    publisher: "Severin",
    title:
      "Mjölkskummare: Spuma 500 SM 3585, Spuma 700 SM 3586 och SM 3587, SM 3584, SM 3588, Spuma Light 400 SM 3579 och SM 3589",
    url: "https://www.severinshop.se/category/mjolkskummare",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen svenska butik, och den enda källa som publicerar skummax och värmemax var för sig för varje modell. Sju modeller: 100 av 200 ml, 150 av 300, 220 av 400 två gånger, 120–260 av 500 och 120–350 av 700 två gånger. Spuma 700 anger dessutom justerbar temperatur mellan 45 och 65 grader.",
  },
  {
    publisher: "Philips",
    title: "Milk Twister mjölkskummare CA6500/63",
    url: "https://www.philips.se/c-p/CA6500_63/milk-twister-mjolkskummare",
    market: "SE",
    kind: "standard",
    note: "Anger kapaciteten till 120 ml och räknar själv om talet till koppar: mjölkskummet räcker till två cappuccino. Den omräkningen ligger till grund för hur vi beskriver de andra apparaternas storlek, alltså ungefär 60 ml skum per cappuccino. Kannan rymmer 120 ml, så apparaten kan inte värma mer mjölk än den skummar.",
  },
  {
    publisher: "Melitta",
    title: "Cremio mjölkskummare",
    url: "https://www.melitta.se/produkter/maskiner/mjoelkskummare/cremio-mjoelkskummare-svart.html",
    market: "SE",
    kind: "standard",
    note: "Tillverkaren skriver att man för bästa skumningsresultat bör använda mjölk med högt proteininnehåll, alltså samma sak som labbet fann: resultatet beror på vad som hälls i.",
  },
  {
    publisher: "Melitta",
    title: "Cremio, bruksanvisning 6758122-04",
    url: "https://www.melitta.de/media/30/b1/57/1695020835/Cremio.pdf",
    market: "DE",
    kind: "standard",
    note: "Tillverkarens egen manual, läst i original. Anger max fyllnadsmängd till 150 ml mjölkskum och 250 ml varm mjölk, alltså de tal som ligger i tabellen.\n\nHär står också kategorins mest användbara råd: välj en dryck med minst 3 gram protein per 100 gram, eftersom högre halt ger stabilare och finporigare skum. Manualen anger dessutom att soja- och laktosfri mjölk fungerar, och att behållaren och bottenstationen aldrig får maskindiskas medan lock och visp får.",
  },
  {
    publisher: "Sage Appliances",
    title: "the Milk Café SMF600, bruksanvisning för Norden",
    url: "https://assets.sageappliances.com/Instruction-Booklets/Nordic/SMF600_The_Milk_Cafe_EU_UG7_A21_LowRes.pdf",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen manual, läst i original. Ratten är steglös mellan 40 och 80 grader med 60 utmärkt som optimal mjölktemperatur, vilket är det bredaste temperaturspannet bland de rankade apparaterna.\n\nManualen beskriver också de två vispskivorna Capp och Latté, läget Cold Stir som skummar utan värme, och att kanna, lock och mätkopp tål maskindisk medan skivorna helst handdiskas.",
  },
  {
    publisher: "Severin",
    title: "Induktions-Milchaufschäumer SM 3585, bruksanvisning",
    url: "https://d.otto.de/files/952fc75d-8669-5391-a501-3abe66fc2ef5.pdf",
    market: "DE",
    kind: "standard",
    note: "Tillverkarens egen manual, läst i original. Bekräftar Spuma 500:s tre nivåer: minst 120 ml, högst 260 ml för skumning och högst 500 ml för omrörning och uppvärmning, alltså den halvering som sidan bygger på.\n\nSeverin ger samma mjölkråd som Melitta, alltså hög proteinhalt och kylskåpskall mjölk, och ett knep som fungerar på vilken apparat som helst med båda lägena: kör en kall omgång först och en varm direkt efteråt för tätare skum.",
  },
  {
    publisher: "CHiATO",
    title: "milkPLAY Electric Milk Frother, bruksanvisning",
    url: "https://img.kavosdraugas.lt/a49e4c08-b14a-4202-ad7f-b1de08f055a7/original/250x210mmchiatofrothermanual-1pdf.pdf",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen manual, läst i original. Tekniska data anger minst 75 ml, högst 130 ml mjölkskum och högst 240 ml varm choklad, samt 450 till 550 watt.\n\nManualen slår också fast att apparaten aldrig får sänkas i vatten, eftersom mjölkbehållaren sitter ihop med basen. Den kan alltså inte maskindiskas, vilket cellen tidigare stod tom om.",
  },
  {
    publisher: "RIG-TIG by Stelton",
    title: "FOODIE electric milk frother",
    url: "https://www.rig-tig.com/products/foodie-electric-milk-frother",
    market: "DK",
    kind: "standard",
    note: "Tillverkarens egen produktsida. Anger tre program: varmt skum, kallt skum och uppvärmning utan skumning. Anger också att apparaten inte tål maskindisk. Sidan hade tidigare två program och påstod att kallskumsläge saknades.",
  },
  {
    publisher: "Coffee Friend",
    title: "Elektriska mjölkskummare",
    url: "https://www.coffeefriend.se/c/koksapparater/mjolkskummare/elektriska-mjolkskummare/",
    market: "SE",
    kind: "standard",
    note: "Priser, artikelnummer och GTIN för fem av de rankade produkterna. Butikens fält Kapacitet (vätskor) bär skummaxet för Bialetti MKF02 och värmemaxet för Bialetti MK01, alltså två storheter i samma fält för samma fabrikat.",
  },
  {
    publisher: "KitchenTime",
    title: "Mjölkskummare",
    url: "https://www.kitchentime.se/koksapparater/kaffemaskiner/mjolkskummare/",
    market: "SE",
    kind: "standard",
    note: "Priser för sju av de rankade produkterna. Produktsidan för Severin publicerar båda kapacitetstalen i brödtexten men bara det större i produktnamnet och i det strukturerade fältet.",
  },
  {
    publisher: "Elgiganten",
    title: "Nespresso Aeroccino 4 mjölkskummare",
    url: "https://www.elgiganten.se/product/hem-hushall-tradgard/kaffemaskiner-te/tillbehor-till-kaffemaskiner-te/mjolkskummare/nespresso-aeroccino-4-mjolkskummare-12478749/694779",
    market: "SE",
    kind: "standard",
    note: "Enda butiken som skriver ut båda talen i ett och samma fält, Kapacitet skum/mjölk 120/240 ml. Samma sidas brödtext kallar apparaten generös med 240 ml, alltså marknadsföring på det större talet.",
  },
  {
    publisher: "Icecat",
    title: "Produktdatablad Philips CA6500/63, GTIN 8720389007613",
    url: "https://icecat.biz/",
    kind: "standard",
    note: "Effekt 500 W, skumningstid 130 sekunder, tål maskindisk, sladdlös bas, teflonbehandlad, två års garanti. Slog bara igenom för Philips; Melitta, Sage och Nespresso ligger utanför den öppna katalogen, vilket inte säger något om vad tillverkarna publicerar.",
  },
  {
    publisher: "Bäst i test",
    title: "Mjölkskummare: 6 produkter i test",
    url: "https://www.xn--bst-i-test-q5a.se/mjolkskummare",
    date: "2026-03",
    market: "SE",
    kind: "comparison",
    note: "Namngiven redaktör och uppger eget test under minst sex veckor i ett vanligt hem, bedömt på uppvärmning, användning och rengöring. Nämner ingen mjölksort och ingen temperatur.",
  },
  {
    publisher: "Testkollen",
    title: "Mjölkskummare bäst i test",
    url: "https://www.testkollen.se/mjolkskummare-bast-i-test",
    market: "SE",
    kind: "comparison",
    note: "Den utförligaste svenska jämförelsen, och den täcker växtbaserad dryck grundligt med 58 omnämnanden av havre. Ingen temperatur och ingen volymökning.",
  },
  {
    publisher: "Testkompassen",
    title: "Bästa mjölkskummare",
    url: "https://www.testkompassen.se/kategorier/hem-och-kok/koeksmaskiner/mjolkskummare",
    market: "SE",
    kind: "comparison",
    note: "Tar upp proteinhalten som förklaring till skumresultatet, vilket ingen annan konkurrent gör. Ingen temperatur.",
  },
  {
    publisher: "Testix",
    title: "Mjölkskummare bäst i test",
    url: "https://testix.se/test/mjolkskummare",
    market: "SE",
    kind: "comparison",
    note: "Topplista över fem produkter med jämförelsetabell. Monetiseras via PriceRunner.",
  },
  {
    publisher: "Test.se",
    title: "Mjölkskummare som är bäst i test",
    url: "https://www.test.se/mjolkskummare/",
    market: "SE",
    kind: "comparison",
    note: "Rankar elektriska, manuella och handhållna i samma lista, och har egna avsnitt om vilken mjölk som går att använda och hur varm den får bli. Den enda konkurrent som nämner Råd & Rön.",
  },
];

/**
 * Babyvakt.
 *
 * Tyngdpunkten ligger på tillverkarnas egna manualer, och det är ett medvetet
 * val snarare än en nödlösning. Elva manualer besvarar den fråga hela sidan
 * vilar på — vad föräldraenheten gör när förbindelsen bryts — och ingen enda
 * butikstext i kategorin gör det fullständigt.
 *
 * ⚠️ Råd & Rön förbjuder vidarepublicering av testresultat, tabeller och betyg.
 * Källan är med för att provningen finns och bär ett datum, aldrig för vad den
 * kom fram till.
 */
/**
 * Kompaktkamera. Underlag i .agent/research/kompaktkamera.md.
 *
 * ⚠️ Canons, Sonys och Panasonics egna sidor svarar 403 på curl men renderar
 * normalt i en webbläsare och via r.jina.ai. Länkarna är alltså levande;
 * `check:refs` och en 200-koll med curl säger emot varandra här, och curl har
 * fel. Se scripts/fetch.mjs och stegtabellen i researchfilen.
 *
 * ⚠️ De tre Ljud & Bild-recensionerna bär INGA betyg. De har rubrikomdöme,
 * plus- och minuslista och en faktaruta. Samma läge som /bluetooth-hogtalare,
 * och skälet till att sidan saknar kriterium för testomdöme.
 */
export const KOMPAKTKAMERA_SOURCES: Source[] = [
  {
    publisher: "Ljud & Bild",
    title: "Test: Sony Cybershot RX100 VII",
    url: "https://www.ljudochbild.se/test/foto-video/sony-cybershot-rx100-vii/",
    date: "2019-09-02",
    market: "SE",
    kind: "test",
    note:
      "Lasse Svendsen kallar den klassens snabbaste autofokus och den bästa allroundkameran, men bara nätt och jämnt, och sätter svag ljusstyrka och högt pris som invändningar.\n\nRiktpriset i testet är 13 000 kronor. Kameran kostar 12 890 i dag, alltså praktiskt taget detsamma sju år senare.",
  },
  {
    publisher: "Ljud & Bild",
    title: "Test: Sony ZV-1F",
    url: "https://www.ljudochbild.se/test/foto-video/sony-zv-1f/",
    date: "2022-12-17",
    market: "SE",
    kind: "test",
    note:
      "Bekräftar att både zoomen och bildstabiliseringen är rent digitala, och att kameran bara sparar JPEG. Berömmer 4K-kvaliteten och den vridbara pekskärmen, och invänder mot små knappar, avsaknaden av sökare och en tveksam autofokus.\n\nFaktarutan anger optiken till 22 mm f2,2 medan brödtexten säger fast 20 mm f2. Sony anger själva f = 7,6 mm, motsvarande 20 mm, och F2,0, och det är talen sidan använder.",
  },
  {
    publisher: "Ljud & Bild",
    title: "Test: Fujifilm X half",
    url: "https://www.ljudochbild.se/test/foto-video/fujifilm-x-half/",
    date: "2025-07-18",
    market: "SE",
    kind: "test",
    note:
      "Beskriver kameran som det närmaste man kommer film med en digital kamera, och sätter avsaknaden av både bildstabilisering och RAW som priset för det.\n\nAnger sensorns använda yta till 8,8 × 11,7 mm i stående 3:4, vilket är en annan sak än Fujifilms egen uppgift om sensorns totala 13,3 × 8,8 mm. Riktpriset i testet är 9 500 kronor; kameran kostar 7 990 i dag.",
  },
  {
    publisher: "Canon",
    title: "PowerShot G7 X Mark III – Specifications",
    url: "https://www.canon.co.uk/cameras/powershot-g7-x-mark-iii/specifications/",
    market: "UK",
    kind: "standard",
    note:
      "Anger 1,0-typ staplad CMOS med 20,1 effektiva megapixel, 8,8–36,8 mm motsvarande 24–100 mm, 4,2x optisk zoom, f/1,8–2,8 och objektivförskjutande stabilisering med ungefär fyra stegs verkan. Vikten är 304 gram med batteri och minneskort.\n\nCanons svenska sida för samma kamera lämnar specifikationsblocket tomt, vilket är skälet att den brittiska används.",
  },
  {
    publisher: "Canon",
    title: "PowerShot V1 – Specifikationer",
    url: "https://www.canon.se/cameras/powershot-v1/specifications/",
    market: "SE",
    kind: "standard",
    note:
      "Anger en sensor av 1,4-tum med 22,3 effektiva megapixel, objektiv 8,2–25,6 mm med f/2,8 och optisk stabilisering. Det är den största sensorn bland de tio kamerorna på sidan.\n\nViktfältet och batterikapaciteten står tomma, och stegtalet för stabiliseringen anges inte.",
  },
  {
    publisher: "Canon",
    title: "PowerShot V1 – Bruksanvisning, Specifikationer",
    url: "https://cam.start.canon/en/C016/manual/html/UG-11_Reference_0080.html",
    kind: "standard",
    note:
      "Bruksanvisningen bär de tal produktsidan saknar: 426 gram med batteri och kort enligt CIPA, alltså kameran som väger mest på sidan.\n\nAnger också att 4K spelas in i 3840 × 2160 vid 29,97, 25 och 23,98 bilder per sekund, och att 59,94 bilder per sekund kräver beskuren bild.",
  },
  {
    publisher: "Canon",
    title: "PowerShot SX740 HS Lite Edition – Specifikationer",
    url: "https://www.canon.se/cameras/powershot-sx740-hs-lite-edition/specifications/",
    market: "SE",
    kind: "standard",
    note:
      "Anger 4,3–172 mm motsvarande 24–960 mm, 40x optisk zoom, bakbelyst CMOS av 1/2,3-typ med 20,3 effektiva megapixel, 299 gram och stabilisering med ungefär 3,5 stegs verkan.\n\nSidan anger också ett slutdatum för säkerhetssupport, 28 april 2027. Ingen av de nio övriga kamerorna har ett motsvarande datum.",
  },
  {
    publisher: "Canon",
    title: "IXUS 285 HS A – Specifikationer",
    url: "https://www.canon.se/cameras/ixus-285-hs-a/specifications/",
    market: "SE",
    kind: "standard",
    note:
      "Anger 4,5–54,0 mm motsvarande 25–300 mm, f/3,6–7,0, 146 gram och 99,6 × 58,0 × 22,8 millimeter. Det är den minsta och lättaste kameran på sidan, och den enda som är tunnare än 25 millimeter.\n\nFilmformatet stannar på 1 920 × 1 080 vid 29,97 bilder per sekund.",
  },
  {
    publisher: "Sony",
    title: "Cyber-shot DSC-RX100 VII – Specifikationer",
    url: "https://www.sony.se/electronics/cyber-shot-kompaktkameror/dsc-rx100m7/specifications",
    market: "SE",
    kind: "standard",
    note:
      "Anger sensorn till 13,2 × 8,8 millimeter, alltså det mått hela sidan använder för 1,0-typ, samt 24–200 mm, f/2,8–4,5, optisk SteadyShot motsvarande 4,0 stopp och 302 gram enligt CIPA.\n\nSökaren är en OLED-panel med 2 359 296 punkter, den enda elektroniska sökaren bland de tio.",
  },
  {
    publisher: "Sony",
    title: "ZV-1F Help Guide – Specifications",
    url: "https://helpguide.sony.net/dc/2210/v1/en/contents/TP1000935823.html",
    kind: "standard",
    note:
      "Anger ZEISS Tessar T* f = 7,6 mm, motsvarande 20 mm, med F2,0, en sensor på 13,2 × 8,8 millimeter och 256 gram med batteri och kort.\n\nStabiliseringen listas bara som SteadyShot för film med lägena Active och Off, och objektivavsnittet nämner ingen optisk stabilisering.",
  },
  {
    publisher: "Fujifilm",
    title: "X half (X-HF1) – Specifications",
    url: "https://www.fujifilm-x.com/en-us/products/cameras/x-hf1/specifications/",
    market: "US",
    kind: "standard",
    note:
      "Anger sensorn till 13,3 × 8,8 millimeter med 17,74 effektiva megapixel, ett fast Fujinon-objektiv på 10,8 mm motsvarande 32 mm med F2,8, och 240 gram med batteri och kort.\n\nBatteritiden är 880 bilder enligt CIPA, den överlägset längsta på sidan. Video stannar på Full HD i 24 bilder per sekund, i stående format.",
  },
  {
    publisher: "Panasonic",
    title: "LUMIX DC-TZ99 – Specifikationer",
    url: "https://www.panasonic.com/se/consumer/kamera-och-videokamera/lumix-kompaktkamera/tz-travel/dc-tz99.specs.html",
    market: "SE",
    kind: "standard",
    note:
      "Anger 4,3–129 mm motsvarande 24–720 mm, 30x optisk zoom, F3,3–6,4, en MOS-sensor av 1/2,3-tum med 20,3 effektiva megapixel och 322 gram med batteri och kort.\n\nStabiliseringen kallas 5-axlig hybrid O.I.S.+ utan att något stegtal anges.",
  },
  {
    publisher: "Ricoh Imaging",
    title: "PENTAX WG-8 – Specifications",
    url: "https://www.ricoh-imaging.co.jp/english/products/wg-8/spec/",
    kind: "standard",
    note:
      "Anger vattentäthet motsvarande JIS klass 8 och dammtäthet motsvarande JIS klass 6, 5–25 mm motsvarande 28–140 mm, F3,5–5,5 och 242 gram med batteri och kort.\n\nStabiliseringen heter Pixel Track SR och är elektronisk. Batteriet räcker 340 bilder enligt tillverkarens egen mätning.",
  },
  {
    publisher: "OM System",
    title: "TG-7 – Tough camera",
    url: "https://explore.omsystem.com/c/en/tg-7",
    kind: "standard",
    note:
      "Anger vattentäthet till 15 meter samt damm-, köld- och stöttålighet, 25–200 mm med f/2,0–4,9, en CMOS-sensor med 12 megapixel och sensorförskjutande stabilisering med 2,5 EV.\n\nVikten anges till 249 gram utan batteri och minneskort, vilket är ett annat mått än de nio övriga tillverkarna använder.",
  },
];

export const BABYVAKT_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Test: Babyvakter",
    url: "https://www.radron.se/tester/barn-familj-husdjur/babyvakter/",
    date: "2012-06-15",
    market: "SE",
    kind: "test",
    note:
      "Den enda svenska laboratorieprovningen av babyvakter. Tretton modeller, med tekniskt uppmätt lägsta ljudnivå och en egen axel för vilken varning apparaten ger när signalen bryts.\n\nAlla tretton är borta ur handeln. Testet är med här för att det finns och bär sitt datum, inte som underlag för någon produkt på sidan.",
  },
  {
    publisher: "1177",
    title: "Plötslig spädbarnsdöd – förebyggande råd",
    url: "https://www.1177.se/barn--gravid/att-skota-ett-nyfott-barn/plotslig-spadbarnsdod--forebyggande-rad/",
    date: "2026-01-14",
    market: "SE",
    kind: "standard",
    note:
      "Sex råd, granskade av specialist i barnmedicin vid Karolinska: sova på rygg, inget nikotin, fritt ansikte och lagom värme, egen säng under tre månader, amning och napp. Anger att ungefär 1 barn på 6 000 drabbas i Sverige.\n\nIngen av åtgärderna är en apparat, och det är utgångspunkten för guidens avsnitt om vad en babyvakt är till för.",
  },
  {
    publisher: "CAPiDi",
    title: "CAPiDi Premium Baby Monitor – Instruction Manual",
    url: "https://capidi.com/wp-content/uploads/2024/09/CAPiDi-Premium-manual.pdf",
    market: "DK",
    kind: "standard",
    note:
      "Anger 863–870 MHz, 12 dBm sändareffekt på babyenheten och 1 000 meters räckvidd i fri sikt. Beskriver larmet vid bruten förbindelse i detalj: efter 30 sekunder, med ljud och blinkande ikon, och med en prioritetsordning mellan larmen.",
  },
  {
    publisher: "CAPiDi",
    title: "CAPiDi Babyalarm – Instruction Manual",
    url: "https://capidi.com/wp-content/uploads/2019/07/Babyalarm_A5_manual_170925.pdf",
    market: "DK",
    kind: "standard",
    note:
      "Anger 800 meter i fri sikt, 109 timmars standby och larm efter 30 sekunder som även utlöses om babyenheten stängts av eller fått slut på batteri.\n\nBär också tillverkarens egen varning om att apparaten inte ska betraktas som medicinteknisk.",
  },
  {
    publisher: "Neonate",
    title: "User manual BC-5700D",
    url: "https://neonate.no/wp-content/uploads/2024/12/QG-BC-5700D-v8.pdf",
    market: "NO",
    kind: "standard",
    note:
      "Larmavsnittet är kategorins mest utförliga. Larmet vid bruten förbindelse går efter 30 sekunder och täcker tre fall: utanför räckvidd, babyenheten avstängd, och att babyenheten inte kan sända, till exempel för att den är trasig.",
  },
  {
    publisher: "Neonate",
    title: "User manual BC-6900D / BC-6500D",
    url: "https://neonate.no/wp-content/uploads/2024/12/BC-6X00D-200x150mm-v10.pdf",
    market: "NO",
    kind: "standard",
    note:
      "Anger larmet vid bruten förbindelse till 30 sekunder och tre fall: enheterna är utanför räckvidd, babyenheten är avstängd, eller dess batteri har tagit slut.\n\nSamma avsnitt bär kategorins viktigaste brasklapp: aktiverar du Zero Radiation stängs larmet av, och funktionen ska enligt tillverkaren bara användas när du vet att enheterna är inom räckhåll.",
  },
  {
    publisher: "Motorola Nursery",
    title: "PIP10 Digital Audio Baby Monitor – User Guide",
    url: "https://motorolanursery.com/media/zwhbtmkt/pip10-en_eu_na_v5.pdf",
    market: "UK",
    kind: "standard",
    note:
      "Anger räckvidden till 160 fot inomhus och 1 000 fot utomhus, alltså 49 mot 305 meter. Det är den ena av två manualer på sidan som publicerar båda talen, och grunden för att räkna om metertalet på kartongen.",
  },
  {
    publisher: "Motorola Nursery",
    title: "PIP15 Audio Baby Monitor – User Guide",
    url: "https://motorolanursery.com/media/w1neo1aq/pip15-multi_ug_en_v6.pdf",
    market: "UK",
    kind: "standard",
    note:
      "Anger 450 meter i fri sikt, mindre än 0,25 W sändareffekt i EU-utförandet och drifttiden 10 timmar för babyenheten och 9 för föräldraenheten. Beskriver också de fem nivåerna av mikrofonkänslighet.",
  },
  {
    publisher: "Motorola Nursery",
    title: "VM483 Video Baby Monitor – User Guide",
    url: "https://motorolanursery.com/media/kj5nnc12/vm483-ug-en-eu-us-v12.pdf",
    market: "UK",
    kind: "standard",
    note:
      "Anger 2 405–2 475 MHz, 2,8-tums skärm och batteritid 5 timmar. Larmet vid bruten förbindelse står inte i huvudavsnittet utan i felsökningen tre sidor senare, vilket är värt att veta för den som letar.",
  },
  {
    publisher: "Philips",
    title: "Avent SCD892 – User manual",
    url: "https://www.documents.philips.com/assets/20230725/712136d5b7374d0ba9f8b04a009135d3.pdf",
    market: "NL",
    kind: "standard",
    note:
      "Anger IEEE 802.11 b/g/n, 2 412–2 472 MHz och högst 20 dBm, alltså den kraftigaste sändaren i jämförelsen. Föräldraenheten har 2 600 mAh och 10 timmars drift i ekoläge.\n\nLarmet vid bruten förbindelse är ett pip var tjugonde sekund plus röd länklampa.",
  },
  {
    publisher: "VTech",
    title: "DM1212 Audio Baby Monitor – User's guide",
    url: "https://cdn-vtech-jouets.vtech.com/assets/32813391-90be-41cb-a93e-ffe4ae467ce4/DM1212_UK_CIB_V3_20210831.pdf",
    market: "UK",
    kind: "standard",
    note:
      "Deklarerar sändareffekten till 0,25 W, alltså DECT-klassens toppeffekt, och är därmed måttstocken när andra tillverkare anger sin effekt som en procentandel av DECT.\n\nAnger också 75 meter inomhus mot 460 utomhus, och att apparaten inte är medicinteknisk.",
  },
  {
    publisher: "VTech",
    title: "VM5254 Video Baby Monitor – Quick start guide",
    url: "https://cdn-web.vtp-media.com/products/VM/VM5254/VM5254-X_QSG_V7_20201211.pdf",
    market: "UK",
    kind: "standard",
    note:
      "Menyavsnittet visar att pipet när länken mellan enheterna bryts är en inställning du slår på, inte ett larm som är på från början.",
  },
  {
    publisher: "VTech",
    title: "RM5756HD Smart Wi-Fi Video Monitor – Quick start guide",
    url: "https://cdn-web.vtp-media.com/products/RM/RM5756/RM5756HD_US_QSG_V2_20221229.pdf",
    market: "UK",
    kind: "standard",
    note:
      "Bekräftar att både strömmen till appen och den lokala föräldraenheten går genom samma babyenhet, och att larmtonen vid bruten länk går att ställa i menyn.",
  },
  {
    publisher: "Bäst i test",
    title: "Test: Bästa Babyvakten",
    url: "https://www.xn--bst-i-test-q5a.se/babyvakt",
    market: "SE",
    kind: "comparison",
    note:
      "Rankar på sammanvägda expertbetyg och monetiseras via Prisjakt. Den är värd att känna till av ett annat skäl än rankningen: CAPiDi anger i sin egen produkttext hos Jollyroom att de är \"Testvinnare 2024 av Bäst-i-Test.se\", så butikens bäst-i-test-brickor pekar hit.",
  },
  {
    publisher: "Prisjakt",
    title: "Bästa babyvakterna 2026: Expertens 5 toppval",
    url: "https://www.prisjakt.nu/topplistor/topplista-basta-babyvakten",
    market: "SE",
    kind: "comparison",
    note:
      "Fem produkter med prisjämförelse. Prisjakt betalar per utklick, vilket förklarar varför listan är byggd för att klickas vidare snarare än för att övertyga.",
  },
  {
    publisher: "Bygghemma",
    title: "Babyvakt bäst i test 2026",
    url: "https://www.bygghemma.se/reportage-och-guider/babyvakt-bast-i-test/",
    market: "SE",
    kind: "comparison",
    note:
      "En av tre butiker som utser en vinnare bland produkter de själva säljer. Tas med för att den ligger på förstasidan och för att läsaren ska kunna se skillnaden mot en jämförelse som länkar till flera butiker.",
  },
];

/**
 * Skaftdammsugare. Underlag i .agent/research/skaftdammsugare.md.
 *
 * Sidan vilar på två sorters källor. Råd & Rön bär bilden av vad kategorin
 * klarar, och tillverkarnas egna datablad bär talen per maskin.
 *
 * ⚠️ Råd & Rön förbjuder vidarepublicering av testresultat, tabeller och betyg,
 * och det står i sidfoten på deras egen sida. Betygen per modell ligger dessutom
 * bakom en betalvägg på 69 kronor som vi inte betalat. Det fria utdraget bär
 * provprogrammet och de slutsatser som gäller hela fältet, och det är allt vi
 * använder. Samma hållning som /robotdammsugare och /mjolkskummare.
 *
 * ⚠️ `.../dammsugare/sa-testar-vi-dammsugare/` cirkulerar i sökresultat och
 * svarar med Råd & Röns egen 404-sida, kontrollerat 2026-08-06. Länka aldrig
 * den. Metodlistan står på testsidan själv.
 *
 * ⚠️ Electrolux egen sida för EP71AB14UG leder vidare till sortimentslistan,
 * kontrollerat 2026-08-06 med både jina och webbläsare. Därför står NetOnNets
 * produktsida som källa för den maskinen: det är där hela drifttidsstegen
 * finns, 40, 20 och 10 minuter. Sidan för ES52CB18UG ligger kvar och används.
 */
const SKAFTDAMMSUGARE_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Dammsugare och skaftdammsugare, bäst i test",
    url: "https://www.radron.se/tester/koksmaskiner-stadning/dammsugare/",
    date: "2025-08-13",
    market: "SE",
    kind: "test",
    note: "46 golvdammsugare och 65 skaftdammsugare mellan 900 och 10 000 kronor, alltså hela marknaden och inte ett urval. Samtliga åtta maskiner i vår jämförelse ingår. Labbet mäter damm, djurhår och smulor från hårt golv och matta, hur lätt maskinen är att använda i trappor, hur filter byts och behållaren töms, batteritiden vid max- och minieffekt, partikelutsläppen och ljudtrycket.\n\nSlutsatserna i det fria utdraget är hårdare än något en butik skriver. Batteritiden vid maximal effekt ligger på sju minuter till en kvart för de skaftdammsugare som toppar testet, och de som håller närmare en halvtimme orkar inte få upp damm ur springorna i parkett eller klinker. De sämsta släpper igenom upp till nio procent av partiklarna igen, och de sämre skaftmodellerna saknar utblåsfilter helt.\n\nMoppfunktionen underkänns rakt av: labbet moppade lera och choklad på samma sätt som på robotdammsugarna och kom till samma resultat. Betygen per modell ligger bakom betalvägg och återges inte här.",
  },
  {
    publisher: "Stiftung Warentest",
    title: "Staubsauger im Test: Akkustaubsauger und Bodenstaubsauger",
    url: "https://www.test.de/Staubsauger-im-Test-1838262-0/",
    market: "DE",
    kind: "test",
    note: "Det tyska labbets löpande jämförelse av batteridrivna och sladdburna dammsugare, med i huvudsak samma fabrikat som säljs här. Resultaten per modell ligger bakom betalvägg som vi inte betalat, så ingen produkt på sidan bär ett betyg härifrån.",
  },
  {
    publisher: "Bosch",
    title: "Sladdlös dammsugare Unlimited 10 BSS1041GHF, tekniskt datablad",
    url: "https://media3.bosch-home.com/Documents/specsheet/sv-SE/BSS1041GHF.pdf",
    market: "SE",
    kind: "standard",
    note: "Kategorins mest genomskinliga dokument, och det som gav sidan sin vinkel. Bosch anger drifttiden i fyra steg för samma maskin och samma batteri: 80 minuter i ekoläge med ett tillbehör utan motor, 65 i ekoläge med det motoriserade golvmunstycket, 25 i autoläge och 11 i turboläge.\n\nHärifrån kommer också ljudnivån 80 dB(A), vikten 2,9 kilo, HEPA-filtreringen på 99,99 procent, de tio årens motorgaranti och reparationsindex 9,8.",
  },
  {
    publisher: "Dyson",
    title: "Dyson V15 Detect Absolute",
    url: "https://www.dyson.se/dammsugare/sladdlosa/v15/2023",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen svenska sida, som anger 240 luftwatt i maxläge, 60 minuters drifttid, 0,77 liters behållare, 3,1 kilo och 4,5 timmars laddning. Filtreringen beskrivs som helt förseglad genom hela maskinen ned till 0,1 mikrometer.",
  },
  {
    publisher: "Philips",
    title: "Philips 5000 Series sladdlös dammsugare XC5141/01",
    url: "https://www.home-appliances.philips/se/sv/p/XC5141_01",
    market: "SE",
    kind: "standard",
    note: "Den andra tillverkaren som publicerar båda drifttiderna: 60 minuter i ekoläge och 15 i turboläge. Philips skriver dessutom ut villkoret i en fotnot, att båda talen gäller enbart handenheten utan golvmunstycke, vilket ingen butikstext återger.",
  },
  {
    publisher: "Electrolux",
    title: "Electrolux 500 skaftdammsugare ES52CB18UG",
    url: "https://www.electrolux.se/homecare/vacuum-cleaners/stick-vacuum-cleaners/cordless-sticks/es52cb18ug/",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens sida för den billigaste Electrolux i jämförelsen. Härifrån kommer 45 minuters drifttid på lägsta nivå, sugeffekten 29 luftwatt, dammbehållaren på 0,3 liter, 79 dB(A), 2,8 kilo och att batteriet går att byta.",
  },
  {
    publisher: "NetOnNet",
    title: "Electrolux Animal 700 Cordless EP71AB14UG",
    url: "https://www.netonnet.se/art/hem-fritid/dammsugare-rengoring/skaftdammsugare/electrolux-animal-700-cordless-ep71ab14ug/1028078.9265/",
    market: "SE",
    kind: "standard",
    note: "Butikens specifikationsruta bär hela drifttidsstegen för Animal 700: 40 minuter på lägsta effekt, 20 på normal och 10 på högsta. Härifrån kommer också 95 luftwatt, luftflödet 12,5 liter i sekunden, 0,3 liters behållare, 14,4 volt och att maskinen är provad enligt IEC 62885-2 och IEC 62885-4.",
  },
  {
    publisher: "Dreame",
    title: "Dreame Z30 sladdlös dammsugare",
    url: "https://se.dreametech.com/products/z30",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens svenska butik, som anger 310 luftwatt, 150 000 varv per minut, 99,99 procents filtrering vid 0,1 mikrometer, 0,6 liters behållare, 90 minuters maximal drifttid och åtta battericeller på 3 200 mAh. Talen är uppmätta i Dreames eget labb, vilket de skriver ut.",
  },
  {
    publisher: "Samsung",
    title: "Samsung Jet 85 Multi VS20C852CTN/WA",
    url: "https://www.samsung.com/se/vacuum-cleaners/stick/vs9500al-stick-more-advance-cleaning-performance-hexajet-motor-jet-cyclone-green-vs20c852ctn-wa/",
    market: "SE",
    kind: "standard",
    note: "Anger 210 luftwatt, en timmes drifttid, femskiktsfiltrering som håller kvar 99,999 procent av mikrodammet och en helt tvättbar dammbehållare på 0,8 liter. Samsung skriver också ut att luftwatten är uppmätt vid inloppet till ett verktyg utan motor med tom behållare, vilket är den fotnot som gör talet jämförbart med andras.",
  },
  {
    publisher: "Kjell & Company",
    title: "Xiaomi Vacuum Cleaner G20 Lite skaftdammsugare",
    url: "https://www.kjell.com/se/produkter/hem-fritid/stadning-rengoring/dammsugare/skaftdammsugare/xiaomi-vacuum-cleaner-g20-lite-skaftdammsugare-p24936",
    market: "SE",
    kind: "standard",
    note: "Butikens specifikationslista för den billigaste maskinen i jämförelsen, med 18 000 pascal, 40 till 45 minuters drifttid i standardläge och 15 i turboläge, 2 200 mAh på 22,2 volt, 0,5 liters behållare och femstegsfiltrering som håller kvar 99,9 procent av partiklar ned till 0,3 mikrometer.",
  },
  {
    publisher: "Bäst i test",
    title: "Skaftdammsugare: 12 modeller i test",
    url: "https://www.xn--bst-i-test-q5a.se/skaftdammsugare",
    market: "SE",
    kind: "comparison",
    note: "Längst av jämförelserna, 7 261 ord, och den enda som rankar tolv modeller. Ingen oberoende provning nämns och ingen drifttid vid full effekt anges.",
  },
  {
    publisher: "M3",
    title: "Bästa skaftdammsugare 2026, stort test av populära modeller",
    url: "https://www.m3.se/article/2168937/skaftdammsugare-test.html",
    market: "SE",
    kind: "comparison",
    note: "Teknikredaktionens genomgång, 2 557 ord, med egna intryck av varje maskin. Pengarna kommer från klick vidare till PriceRunner, och drifttiderna som anges är kartongens.",
  },
  {
    publisher: "Prisjakt",
    title: "Bästa skaftdammsugaren, expertens bäst i test",
    url: "https://www.prisjakt.nu/topplistor/basta-skaftdammsugaren",
    market: "SE",
    kind: "comparison",
    note: "Prisjämförarens egen topplista. Kortast av jämförelserna, 1 438 ord, och byggd för att skicka läsaren vidare till en butik snarare än för att skilja maskinerna åt.",
  },
  {
    publisher: "Bäst24",
    title: "Skaftdammsugare, sladdlös dammsugare, bäst i test 2026",
    url: "https://bast24.se/skaftdammsugare/",
    market: "SE",
    kind: "comparison",
    note: "Den enda jämförelse som hänvisar till Råd & Rön, men till en uppdatering från september 2022 och med testvinnare som inte längre säljs. Köpguiden är däremot den mest genomarbetade av konkurrenternas, med egna avsnitt om utbytbara batterier och batteriets livslängd.",
  },
];

/**
 * Pizzaugn.
 *
 * Kategorin har en ovanligt stark oberoende provning, och den är norsk. tek.no
 * har provat över 20 pizzaugnar för hand under tre år, publicerar betyg 1–10
 * per modell och har mätt stentemperaturen på tre punkter efter 30 minuters
 * uppvärmning. Den mätningen är hela sidans fynd.
 *
 * ⚠️ **Stiftung Warentest har inte provat pizzaugnar.** Artikeln refererar den
 * brittiska systerorganisationen Which?, som provat sex mobila ugnar.
 * Provningen tillskrivs alltid Which?, aldrig Warentest, och Which?-originalet
 * ligger bakom betalvägg vi inte betalat. Samma disciplin som läsarkommentaren
 * på test.de som /powerstation nästan tillskrev Warentest.
 *
 * ⚠️ **Källorna är oense om Gozney Roccbox.** Which? har den som testvinnare,
 * tek.no ger den 7 av 10. Motsättningen står utskriven på sidan; den är det
 * mest värdefulla vi kan publicera och ingen svensk konkurrent nämner den.
 *
 * ⚠️ Gozneys egen supportartikel anger Roccbox pizzasten till **190 mm tjock**,
 * vilket inte kan stämma när ugnsöppningen enligt samma artikel är 88 mm hög.
 * Talet är med all sannolikhet 19 mm feltypat. Vi publicerar varken 190 eller
 * 19: en gissning åt tillverkaren är samma fabrikation som ett påhittat
 * mätvärde. Cellen står tom och skälet står här.
 */
const BLENDER_SOURCES: Source[] = [
  {
    publisher: "Testfakta",
    title: "Mixat resultat i blendertest",
    url: "https://www.testfakta.se/sv/blender-bast-i-test",
    date: "2026-03-17",
    market: "SE",
    kind: "test",
    note: "Sidans huvudkälla. Testfakta lät laboratoriet Applitest GmbH i Nürnberg provköra nio blendrar under 4 000 kronor, med testledaren Anna Antonova ansvarig. Testet är initierat och betalt av Testfakta själva, vilket de skriver ut.\n\nMomenten är smoothie på fryst frukt med tidtagning och silning genom 4 mm-sil, iskrossning bedömd på jämnhet och smälthastighet, hackning av hasselnötter siktad genom 4 mm och 1,4 mm, samt ett uthållighetsprov på 100 cykler med vatten och sågspån. Ljudnivån mättes separat av Testfakta med maskinerna körande på is.\n\nProvningen gjordes i augusti 2025 och artikeln publicerades om i mars 2026.",
  },
  {
    publisher: "Applitest",
    title: "Oberoende laboratorietest: Blenders under 4 000 kronor",
    url: "https://www.testfakta.se/sites/default/files/2025-08/Grafik_Blenders_TFE%28250825%29.pdf",
    date: "2025-08",
    market: "DE",
    kind: "test",
    note: "Hela resultattabellen, fritt läsbar. Härifrån kommer varje mätvärde på sidan: bullernivån 83 till 94 dB, beredningstiden 45 till 147 sekunder, delbetygen för smoothie, iskrossning och nöthack, samt kannornas vikt och deklarerade volym.\n\nTotalbetyget viktas prestanda 50 procent, hanterbarhet 20, uthållighet 20 och bullernivå 10. Vår egen viktning är en annan och står i metodrutan.",
  },
  {
    publisher: "Råd & Rön",
    title: "Blender – bäst i test",
    url: "https://www.radron.se/tester/koksmaskiner-stadning/blender/",
    date: "2024-06-13",
    market: "SE",
    kind: "test",
    note: "30 blendrar provade i labb, varav sju powerblenders. Testet kostar 59 kronor och är inte köpt, och Råd & Rön förbjuder dessutom vidarepublicering av testresultat. Inget betyg och ingen placering härifrån knyts till någon produkt på sidan.\n\nDet som används är talen de själva publicerar fritt i ingressen, utan produktnamn: högsta uppmätta ljudnivå 98,4 dB, en powerblendersoppa som bara nådde 37 grader mot de övrigas 69 till 89, och en långsammaste maskin som behövde över fyra minuter på fryst frukt utan att bli klar.",
  },
  {
    publisher: "tek.no",
    title: "Blir blendere faktisk bedre med vakuum?",
    url: "https://www.tek.no/test/i/oWxxBV/blir-blendere-faktisk-bedre-med-vakuum",
    date: "2022-02-19",
    market: "NO",
    kind: "test",
    note: "Chef Matteo Blender III Vakuumblender får 7,5 av 10 i en egen handpåläggning, jämförd mot Sage The Super Q. Betyget gäller exakt den modell som säljs här.\n\nDeras vakuumprov är det enda vi hittat: en liter smoothie vägde 1 020 gram mixad med vakuum mot 913 utan, alltså mätbart mindre luft. Men i kylskåpsprovet oxiderade vakuumsmoothien mer än den utan, och de märkte ingen smakskillnad.",
  },
  {
    publisher: "tek.no",
    title: "Beste blender: Den beste blenderen til en overkommelig penge",
    url: "https://www.tek.no/samletest/i/lzzKjM/den-beste-blenderen-til-en-overkommelig-penge",
    date: "2025-10-31",
    market: "NO",
    kind: "test",
    note: "Samlingstest av blendrar under 2 000 norska kronor, betyg 1–10 per modell. Ninja BN750EU får 6,5 och utses till testets bästa på att krossa is, och det betyget gäller exakt den modell som säljs här.\n\n⚠️ Deras testvinnare heter Wilfa Xplode Vital och är BLSP-1800S på 1 800 W. Den Wilfa Xplode som säljs i Sverige är BLS-1500S på 1 500 W, alltså en annan maskin, och betyget 9 flyttas därför aldrig hit. Större delen av fältet i övrigt, alltså Point, Sabor, Kulz och Senz, säljs inte i svensk handel.",
  },
  {
    publisher: "Bosch",
    title: "Serie 6 Blender med hög prestanda VitaPower 1800 W, MMB6652B",
    url: "https://static.elongroup.se/Document/Article/538092/faktablad-matberedning-bosch-mmb6652b.pdf",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens eget faktablad, och källan till kategorins andra fynd: kannan anges som \"XLarge 3,0-liter max / 2,0-liter vid användning\". Bosch skriver alltså själva ut både bräddvolymen och arbetsvolymen, där handeln bara trycker den ena.\n\nHärifrån kommer också 10 års motorgaranti mot registrering, 45 000 varv per minut, Tritan-kannan, sex automatiska program med steglös hastighet, EAN 4242005393107 och nettovikten 5,3 kg.",
  },
  {
    publisher: "OBH Nordica",
    title: "Prime Mix 1,75 l glass jar 1400 W, 7739",
    url: "https://static.elongroup.se/Document/Article/355100/faktablad-matberedning-obh-nordica-7739.pdf",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens faktablad. Anger 1 400 W, kanna av tjockt glas på 1,75 liter, fyra förprogrammerade program med steglös hastighet och pulsfunktion, löstagbar knivsats med sex blad i rostfritt stål och rengöringsprogram.\n\nHärifrån kommer också säkerhetslocket, som gör att maskinen inte startar utan lock på.",
  },
  {
    publisher: "Philips",
    title: "7000 Series Höghastighetsmixer HR3760",
    url: "https://www.home-appliances.philips/se/sv/p/HR3760_10",
    market: "SE",
    kind: "standard",
    note: "Anger kannan som \"2 l glaskanna med 1,8 l effektiv kapacitet\", alltså båda talen utskrivna på samma rad. Det är den tydligaste formuleringen någon tillverkare i fältet ger av skillnaden mellan vad kannan rymmer och vad maskinen mixar.\n\nHärifrån kommer också 2 års garanti och snabbvalsprogrammen med förinställd tid och hastighet.",
  },
  {
    publisher: "SharkNinja",
    title: "Ninja Detect kraftfull mixer Pro och enportions, TB301EU",
    url: "https://www.sharkninja.se/ninja-detect-kraftfull-mixer-pro-och-enportions-tb301eu/TB301EU.html",
    market: "SE",
    kind: "standard",
    note: "Anger tillbringaren till 2,1 liter och kapaciteten för flytande ämnen till 1,9 liter, alltså samma två tal som Bosch och Philips publicerar. Testfakta deklarerar 1 900 ml för samma maskin.\n\nHärifrån kommer också 1 200 W, tio manuella mixningshastigheter, två portionskoppar på 700 ml, maskindiskbara delar, vikten 6,02 kg och två års begränsad garanti.",
  },
  {
    publisher: "Wilfa",
    title: "Xplode 1500 blender, BLS-1500S",
    url: "https://wilfa.com/sv/products/xplode-1500",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen produktsida för en av de fyra modeller som inte ingick i labbprovningen. Anger 1 500 W, glaskanna på 1,8 liter, steglös hastighet med 25 lägen, pulsfunktion, löstagbara knivar, automatiskt rengöringsprogram och 22 000 varv per minut.\n\nHärifrån kommer också ljudnivån 85 dB och Wilfas 5 års garanti på alla Wilfa-märkta produkter, som är fältets näst längsta åtagande efter Boschs motorgaranti.",
  },
];

const PIZZAUGN_SOURCES: Source[] = [
  {
    publisher: "tek.no",
    title: "Beste pizzaovn: Disse lager perfekt pizza på under to minutter",
    url: "https://www.tek.no/samletest/i/qLamqL/pizzaovn",
    date: "2025-05",
    market: "NO",
    kind: "test",
    note: "Sidans huvudkälla, och den enda nordiska provningen med egen handpåläggning. Över 20 ugnar provade under tre år av Niklas Plikk och Ole Henrik Johansen, med napolitansk margherita som utgångspunkt och flera ugnar dessutom provade med naanbröd och calzone.\n\nDet avgörande är mätningen: stentemperaturen tagen längst bak, mitt på och längst fram efter 30 minuters uppvärmning. Ooni Koda 12 ligger på 480 grader bak och 220 fram, Gozney Roccbox på 470 mot 270, medan FCC Pizza Chef håller sig mellan 405 och 332. Redaktionen anger själv jämnheten i värmen som testets mest avgörande punkt.\n\nBetygen är publicerade 1–10 per modell. De återges där modellen säljs här under samma namn och påverkar inga poäng.",
  },
  {
    publisher: "Stiftung Warentest",
    title: "Pizzaöfen im Test: Zu Hause italienisch genießen",
    url: "https://www.test.de/Pizzaoefen-im-Test-Zu-Hause-italienisch-geniessen-6024589-0/",
    date: "2023-07-25",
    market: "DE",
    kind: "test",
    note: "Referat av den brittiska konsumentorganisationen Which?, som provat sex mobila pizzaugnar för terrass och trädgård. Warentest har inte provat själva och skriver ut det.\n\nWhich? utsåg Gozney Roccbox till testvinnare och rekommenderade Ooni Karu 12 för den som vill kunna flytta ugnen. Samtliga sex godkändes. Resultat per modell hos Which? ligger bakom betalvägg vi inte betalat, så inget betyg härifrån knyts till en produkt.",
  },
  {
    publisher: "Ooni",
    title: "Ooni Koda 2 Gas Powered Pizza Oven, 2nd Generation",
    url: "https://eu.ooni.com/products/ooni-koda-2",
    market: "UK",
    kind: "standard",
    note: "Tillverkaren anger själv spridningen över stenen som andra generationens huvudsakliga förbättring: den nya brännaren sänker svängningarna i stentemperatur från 175 till 85 grader jämfört med första generationen, och värmer om stenen 20 procent snabbare. Det är samma storhet tek.no mätt upp oberoende, angiven av tillverkaren.\n\nHärifrån kommer också 14-tumsstenen, vikten 16 kg, måtten 545 × 472 × 333 mm och stentjockleken 15 mm.",
  },
  {
    publisher: "Ooni",
    title: "Ooni Koda 2 Pro Gas Powered Pizza Oven, 2nd Generation",
    url: "https://eu.ooni.com/products/ooni-koda-2-pro",
    market: "UK",
    kind: "standard",
    note: "Anger svängningarna i stentemperatur till 45 grader mot första generationens 180. Här kommer 18-tumsstenen, temperaturområdet 160 till 500 grader, vikten 30 kg och stentjockleken 20 mm ifrån.",
  },
  {
    publisher: "Ooni",
    title: "Ooni Koda 2 Max Gas Powered Pizza Oven, 2nd Generation",
    url: "https://eu.ooni.com/products/ooni-koda-2-max",
    market: "UK",
    kind: "standard",
    note: "Två separat reglerade brännare och två temperaturzoner på en bakyta av 24 tum, alltså två pizzor på 12 tum samtidigt. Anger 43 kg, 20 mm sten och 30 minuter till 400 grader.",
  },
  {
    publisher: "Ooni",
    title: "Ooni Karu 2 Multi-Fuel Pizza Oven, 2nd Generation",
    url: "https://eu.ooni.com/products/ooni-karu-2",
    market: "UK",
    kind: "standard",
    note: "Dörr i borosilikatglas, ved eller kol som standard och gasbrännare som tillbehör. Tillverkaren anger 450 grader på så lite som 15 minuter, alltså den snabbaste uppvärmningen bland de bränsleflexibla, och 36 procent lägre bränsleåtgång än föregående modell. Härifrån kommer 15,3 kg, 15 mm sten och den inbyggda termometern.",
  },
  {
    publisher: "Ooni",
    title: "Ooni Koda 16 Gas Powered Pizza Oven, 1st Generation",
    url: "https://eu.ooni.com/products/ooni-koda-16",
    market: "UK",
    kind: "standard",
    note: "Tillverkaren märker själv ugnen som första generationen medan Koda 2 Pro säljs parallellt som andra. Den L-formade brännaren beskrivs som gjord för att pizzan bara ska behöva vridas en gång. Härifrån kommer 18,2 kg, 15 mm sten och måtten 63 × 58 × 37 cm.",
  },
  {
    publisher: "Ooni",
    title: "Ooni Volt 2 Electric Pizza Oven",
    url: "https://eu.ooni.com/products/ooni-volt-2",
    market: "UK",
    kind: "standard",
    note: "Elektrisk, upp till 450 grader och klar att grädda på 12 minuter. Anger 17,6 kg, 10 mm sten och en ugnsöppning på 9,1 cm, alltså den lägsta invändiga höjden bland de elektriska.",
  },
  {
    publisher: "Witt",
    title: "Witt Piccolo Rotante 16\" EU Black, artikel 100000310",
    url: "https://b2b.witt.dk/en/item/100000310",
    market: "DK",
    kind: "standard",
    note: "Tillverkarens egen produktkatalog, och den mest kompletta specifikationen i kategorin. Roterande sten driven av borstlös motor på fem AA-batterier, C-formad brännare på 7,0 kW, sten på 40,5 cm i kordierit med 15 mm tjocklek, 500 grader och klar på 15 minuter.\n\nWitt anger själva ugnen som inte bärbar, medan Elgigantens produktdata för samma artikelnummer anger motsatsen. Tillverkarens uppgift gäller.",
  },
  {
    publisher: "Gozney",
    title: "Roccbox portabel pizzaugn",
    url: "https://eu.gozney.com/products/roccbox",
    market: "UK",
    kind: "standard",
    note: "Gasolbrännare som standard och vedbrännare som tillbehör, alltså den omvända ordningen mot Ooni Karu. Infällbara ben, avtagbar brännare, inbyggd termometer och en silikonmantel som gör utsidan säker att ta i, vilket är ovanligt i kategorin. Flamman beskrivs som rullande för att fördela värmen.",
  },
  {
    publisher: "Gozney",
    title: "Arc pizzaugn",
    url: "https://eu.gozney.com/products/arc",
    market: "UK",
    kind: "standard",
    note: "Anger 21,5 kg och yttermått 480 × 564 × 342 mm, med en invändig bredd på 377 mm för pizzor på 14 tum. Brännaren beskrivs som en lateral rullande flamma som ska efterlikna en vedeldad ugn och minska hur ofta pizzan måste vridas.",
  },
  {
    publisher: "Sage Appliances",
    title: "the Smart Oven Pizzaiolo BPZ820",
    url: "https://www.sageappliances.com/sv-fi/product/BPZ820",
    market: "FI",
    kind: "standard",
    note: "Tillverkaren anger 400 grader och en färdig pizza på 2 minuter, med måtten 46,1 × 47,2 × 27 cm och plats för 30 cm pizza. Den beskrivs som den första bänkugnen som når 400 grader, vilket är den högsta temperaturen bland de elektriska ugnarna som får stå inomhus.",
  },
  {
    publisher: "Ninja",
    title: "Ninja Artisan Electric Outdoor Pizza Oven & Air Fryer MO201",
    url: "https://www.ninjakitchen.ie/products/ninja-artisan-electric-outdoor-pizza-oven-air-fryer-mo201uk-zidmo201uk",
    market: "UK",
    kind: "standard",
    note: "Den enda ugnen i jämförelsen vars tillverkare anger något annat än 500 grader: 370 är taket, och det står utskrivet. 1 760 watt, 11,9 kg, 12-tumssten och 2 års garanti. Ugnen är avsedd för utomhusbruk trots att den går på el, och gör även airfryer, bakplåt och grill.",
  },
  {
    publisher: "Ariete",
    title: "Da Gennaro professional pizza oven 3901/00",
    url: "https://www.ariete.net/en/product/ariete-da-gennaro-professional-pizza-oven",
    market: "IT",
    kind: "standard",
    note: "Anger 430 grader och en pizza på 2 minuter, med två separat reglerade värmeelement och tre lägen för var elementet arbetar. Invändigt 33 × 35 × 9 cm, utvändigt 46 × 44 × 29 cm och 9,49 kg, alltså den lättaste ugnen i jämförelsen. Eldfast sten som går att ta ur, dubbelglas och innerbelysning.",
  },
];

/**
 * Eltandborste. Underlag i .agent/research/eltandborste.md.
 *
 * Tyngdpunkten ligger på tillverkarnas egna uppgifter, och det är avsiktligt:
 * hela sidan vilar på två tal som ingen butik publicerar bredvid varandra,
 * borsthuvudets pris per styck och laddtiden till full laddning.
 */
/**
 * Elscooter. Underlag i .agent/research/elscooter.md.
 *
 * ⚠️ Två källor som ligger nära och medvetet INTE är med:
 *
 * **Aftonbladets test av elsparkcyklar** ligger bakom betalvägg. Hämtningen gav
 * bara navigation, och de betyg som syntes hörde till en hörlursartikel på
 * samma sidmall. Testet är alltså inte läst och får inte citeras.
 *
 * **Råd & Rön har ingen provning av elsparkcyklar.** Kontrollerat i två
 * sökindex 2026-08-06. Enda träffen på radron.se är ett ARN-ärende om en
 * elskoter som gick för långsamt, vilket är något annat.
 */
export const WIFI_REPEATER_SOURCES: Source[] = [
  {
    publisher: "F.A.Z. Kaufkompass",
    title: "Der beste WLAN-Repeater",
    url: "https://www.faz.net/kaufkompass/test/der-beste-wlan-repeater/",
    date: "2026-06-16",
    market: "DE",
    kind: "test",
    note:
      "Kategorins tyngsta provning och sidans viktigaste källa. 39 repeatrar mätta med iperf över två sträckor i ett hushåll, med en Fritzbox som router och en bärbar dator med tvåströmsradio som fjärrklient. Hela resultattabellen ligger fritt läsbar.\n\nVarje apparat mäts två gånger per sträcka, en gång med klienten i sladd och en gång trådlöst. Skillnaden mellan de två talen är hela produktens fysik: med sladd tar signalen ett trådlöst hopp, trådlöst tar den två. Ingen svensk publikation mäter det.\n\nFyra av de tretton modeller som rankas här finns i provningen under exakt det namn de säljs under. Deras tal står i specifikationerna men bär inget betyg, eftersom nio saknas.",
  },
  {
    publisher: "Post- och telestyrelsen",
    title:
      "PTSFS 2022:19: föreskrifter om undantag från tillståndsplikt för användning av vissa radiosändare",
    url: "https://pts.se/contentassets/475c0285823d4966b321ca4ef4a6b4de/ptsfs-2022-19-undantag-fran-tillstandsplikt-for-anvandning-av-vissa-radiosandare.pdf",
    date: "2022-12-01",
    market: "SE",
    kind: "standard",
    note:
      "Föreskriften som sätter taket för hur starkt vilken wifi-sändare som helst får sända i Sverige, läst i original. §173 anger 100 mW e.i.r.p. på 2 400,0–2 483,5 MHz för dataöverföring, §181 och §182 anger 200 mW för inomhusbruk på 5,15–5,35 GHz och §184 anger 1 W på 5,470–5,725 GHz med krav på effektreglering och dynamiskt frekvensval.\n\nTaket gäller routern och repeatern lika. Det är skälet till att en repeater inte kan sända starkare än den router du redan har; den står bara närmare.",
  },
  {
    publisher: "TP-Link",
    title: "RE235BE, specifikationer",
    url: "https://www.tp-link.com/nordic/home-networking/range-extender/re235be/",
    market: "SE",
    kind: "standard",
    note:
      "Tillverkarens egen tabell för vinnaren, och mallen för de elva andra TP-Link-modellernas specifikationer. Anger 2 882 Mbit/s på 5 GHz och 688 på 2,4 GHz var för sig, ett nätverksuttag på 2,5 gigabit, två externa antenner och stöd för EasyMesh.\n\nSändareffekten anges bara som FCC-värde för den här modellen, alltså det amerikanska. Cellen står därför tom i specifikationerna.",
  },
  {
    publisher: "TP-Link Nordic",
    title: "Warranty & RMA Policy",
    url: "https://www.tp-link.com/nordic/support/replacement-warranty/",
    market: "SE",
    kind: "standard",
    note:
      "Garantivillkoren för den nordiska marknaden. Wi-Fi Extenders ligger under Network Expansion Products med tre års garanti, alltså samma tid som routrar och Deco-system.",
  },
  {
    publisher: "Mercusys",
    title: "ME80X AX3000 Wi-Fi 6 Range Extender, datablad",
    url: "https://static.mercusys.com/manual/ME80X(UK)_1.0_Datasheet20250516030526.pdf",
    market: "SE",
    kind: "standard",
    note:
      "Tillverkarens datablad för budgetvinnaren. Anger 2 402 Mbit/s på 5 GHz, 574 på 2,4 GHz, ett gigabituttag, två externa antenner och 13 W förbrukning.\n\nMercusys skriver också ut att apparaten talar EasyMesh utan att vara certifierad av Wi-Fi Alliance, vilket betyder att den kan krångla mot en router av annat märke.",
  },
  {
    publisher: "D-Link",
    title: "DAP-X1860 AX1800 Mesh Wi-Fi 6 Range Extender, datablad",
    url: "https://www.dlink.com/fi/fi/-/media/consumer_products/dap/dap-x1860/datasheet/dap_x1860_datasheet_eu_en.pdf",
    market: "SE",
    kind: "standard",
    note:
      "Tillverkarens datablad, med 1 200 Mbit/s på 5 GHz, 574 på 2,4 GHz, gigabituttag, två inbyggda antenner och 9,7 W förbrukning. Anger också att mesh-funktionen kräver en D-Link-router ur en uppräknad lista.",
  },
  {
    publisher: "ASUS",
    title: "RP-BE58, tekniska specifikationer",
    url: "https://www.asus.com/us/networking-iot-servers/range-extenders/all-series/rp-be58/techspec/",
    market: "SE",
    kind: "standard",
    note:
      "Tillverkarens tabell för den enda Asus-modellen här. Anger 2 882 Mbit/s på 5 GHz och 688 på 2,4 GHz, tvåströmsradio på båda banden, två inbyggda antenner, ett gigabituttag och stöd för AiMesh mot Asus egna routrar.\n\nBär också tre driftlägen: repeater, accesspunkt och mediabrygga.",
  },
  {
    publisher: "D-Link",
    title: "Warranty Information",
    url: "https://www.dlink.com/se/sv/support/warranty-information",
    market: "SE",
    kind: "standard",
    note:
      "Garantitabellen för den svenska marknaden. Trådlösa routrar, accesspunkter och adaptrar bär två års garanti, alltså ett år kortare än TP-Link och Mercusys ger på motsvarande produkter.",
  },
  {
    publisher: "Mercusys Nordic",
    title: "Warranty Terms and Conditions",
    url: "https://www.mercusys.com/nordic/support/warranty-terms/",
    market: "SE",
    kind: "standard",
    note:
      "Anger tre års garanti på samtliga Mercusys-produkter köpta i Sverige.",
  },
];

export const ELSCOOTER_SOURCES: Source[] = [
  {
    publisher: "Transportstyrelsen",
    title: "Vilka regler gäller för elsparkcykel?",
    url: "https://www.transportstyrelsen.se/elsparkcykel",
    date: "2026-07-22",
    market: "SE",
    kind: "standard",
    note:
      "Myndighetens egen sammanställning, och sidans utgångspunkt. Anger de två gränsvärden som avgör allt: högst 20 km/h och högst 250 W kontinuerlig märkeffekt, annars får fordonet bara köras inom inhägnat område. Rättsfall underkänner villatomter och campingplatser som inhägnat område.\n\nSkiljer också ut de två effekttalen i klartext, alltså att märkeffekten är den motorn klarar under längre tid medan maxeffekten bara gäller korta stunder. Lägger ansvaret för att fordonet uppfyller kraven på föraren.",
  },
  {
    publisher: "M3",
    title: "Stort test av elsparkcyklar – årets bästa elscootrar",
    url: "https://www.m3.se/article/1860877/elsparkcykel.html",
    date: "2026-05-24",
    market: "SE",
    kind: "test",
    note:
      "Den enda svenska jämförande provningen som är fritt läsbar. Sju modeller med betyg på femgradig skala, testmånad per modell och uppmätt räckvidd vid sidan av tillverkarens tal: 45 km specat mot cirka 25 km i verkligheten på en av dem.\n\nAnger nominell och maximal effekt var för sig för varje modell, vilket ingen av de svenska jämförelsesajterna gör. Bara en av de sju finns i den här jämförelsen, så testet bär inget betyg här.",
  },
  {
    publisher: "Segway",
    title: "Segway eKickScooter E2 E II – specifikationer",
    url: "https://eu-en.segway.com/ekickscooter/products/e2-e-ii.html",
    market: "SE",
    kind: "standard",
    note:
      "Tillverkarens egen tabell med 51 fält. Anger 250 W nominell effekt och 450 W maxeffekt var för sig, 220 Wh batteri, 16 kilo, trumbroms bak med elektronisk broms fram och 12 procents maximal lutning.\n\nAnger också räckvidden vid två hastigheter, 25 km i 15 km/h och 20 km i 20 km/h, vilket är skälet till att räckvidd inte betygsätts här.",
  },
  {
    publisher: "Pure Electric",
    title: "Pure Escape PRO Elscooter",
    url: "https://se.pureelectric.com/sv/products/escape-pro-elscooter",
    market: "SE",
    kind: "standard",
    note:
      "Tillverkarens variantbeskrivning, och den enskilt mest upplysande källan om varför modellnamn skiljer sig mellan länder. Samma elsparkcykel säljs med 250 W nominell effekt i Sverige, 350 W i övriga Europa och 500 W i Danmark och Norge, med oförändrad maxeffekt på 924 W.\n\nDet betyder att en svensk köpare som väljer varianten märkt Nordic får den dansk-norska versionen.",
  },
  {
    publisher: "E-Wheels",
    title: "E-wheels E2S V2 – produktdata",
    url: "https://www.ewheels.se/elsparkcykel/e2s-v2/?code=18973",
    market: "SE",
    kind: "standard",
    note:
      "Butikens produktdata för E2S-serien, som anger nominell effekt och maxeffekt var för sig på varje modell. Bär också två räckviddstal per elsparkcykel, 35 km optimalt mot 18 till 21 km förväntat, vilket är ovanligt konkret för kategorin.\n\nHastigheten väljs i kassan: 20 km/h utan tillägg, eller en högre topphastighet mot 490 kronor och krav på trafikförsäkring.",
  },
];

export const ELTANDBORSTE_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Test: Eltandborstar",
    url: "https://www.radron.se/tester/halsa--skonhet/eltandborstar/",
    date: "2026-01-23",
    market: "SE",
    kind: "test",
    note:
      "Svensk laboratorieprovning av 24 eltandborstar. De mäter hur mycket plack borstarna tar bort, hur länge batteriet räcker och hur länge det behöver laddas, hur bekväma borstarna är och hur enkla de är att rengöra. Bara grundmodellen provas, med det borsthuvud som följer med paketet.\n\nResultaten per modell ligger bakom betalvägg och vi har inte köpt dem, så vi vet inte vilken borste som vann. Två slutsatser är fritt publicerade och bär vår köpguide: att testet inte visar att oscillerande är bättre än soniskt eller tvärtom, och att en borste för 800 kronor ger lika rena tänder som den mer än dubbelt så dyra testvinnaren.",
  },
  {
    publisher: "Stiftung Warentest",
    title: "Elektrische Zahnbürsten im Test",
    url: "https://www.test.de/elektrische-Zahnbuersten-im-Test-4621863-0/",
    market: "DE",
    kind: "test",
    note:
      "48 modeller i databasen, 13 tillagda i november 2025. Fyra gruppbetyg: tandrengöring, hantering, hållbarhet och miljöegenskaper. Priserna sträcker sig från 12 euro till över 300.\n\nResultaten per modell ligger bakom betalvägg. Fritt läsbart är slutsatsen att bra modeller finns från 12 euro.",
  },
  {
    publisher: "Oral-B",
    title: "Eltandborstar, tandtråd och tandhälsa",
    url: "https://www.oralb.se/sv-se",
    market: "SE",
    kind: "standard",
    note:
      "Tillverkarens egen svenska sajt. Anger att borsthuvudet ska bytas var tredje månad, och att iO-huvudena är \"designad för att passa endast iO-handtag\". Den andra uppgiften är hela skälet till att fattningen väger 25 i vår viktning.\n\nAnger också två års garanti som standard och tre år vid registrering.",
  },
  {
    publisher: "Oral-B",
    title: "Elektriska tandborstar från Oral-B – iO Series",
    url: "https://www.oralb.se/sv-se/produkt-samling/eltandborstar-oral-io",
    market: "SE",
    kind: "standard",
    note:
      "Lägen, trycksensor, display och laddare per iO-modell. iO 10 har sju lägen och färgskärm, iO 6 fem lägen och svartvit display, iO 2 tre lägen och ingen display alls.\n\nAnger också att Series 7 och uppåt laddar fullt på tre timmar med magnetisk laddare, medan Series 6 och lägre \"laddas bäst över natten\".",
  },
  {
    publisher: "Oral-B",
    title: "Oral-B Vitality Pro eltandborste",
    url: "https://www.oralb.se/sv-se/produkter/eltandborstar/oral-b-vitality-pro-eltandborste",
    market: "SE",
    kind: "standard",
    note:
      "Tillverkarens produktsida. Anger 2D-teknik som oscillerar och roterar, tre borstlägen med Sensitive Plus som det skonsammaste, och en inbyggd kvadranttimer.",
  },
  {
    publisher: "Procter & Gamble",
    title: "How long does it take to charge my Oral-B electric toothbrush battery?",
    url: "https://pg-lex.my.salesforce-sites.com/CarehubStandalone/articles/en_US/Knowledge/How-long-does-it-take-to-charge-my-Oral-B-electric-toothbrush-battery-62811-62826",
    market: "US",
    kind: "standard",
    note:
      "Tillverkarens egen laddtidstabell per modell, och den enda källa vi hittat som täcker hela Oral-B-sortimentet. iO 7 och uppåt tre timmar, iO 3 till iO 6 sexton timmar, iO 2 tjugofyra timmar, Vitality Pro tjugotvå.\n\nSpridningen är åtta gånger och den följer inte priset. Talen bär kriteriet Batteri och laddning.",
  },
  {
    publisher: "Procter & Gamble",
    title: "Oral-B: laddtid och batterityp per version",
    url: "https://pg-lex.my.salesforce-sites.com/CarehubStandalone/articles/en_US/FAQ/How-long-does-it-take-to-charge-my-Oral-B-electric-toothbrush-battery",
    market: "US",
    kind: "standard",
    note:
      "Tabell över hur länge en laddning räcker vid två minuters borstning två gånger om dagen, uppdelad på nickelmetallhydrid och litiumjon. Nickelmodellerna räcker 5 till 12 dagar, litiummodellerna mer än två veckor.\n\nHär står också varför Pro 3000 och Pro 3 3000 är två olika borstar: \"When we upgraded the battery, we also changed the product name.\" Siffran före modellnumret är alltså batterikemin.",
  },
  {
    publisher: "Oral-B",
    title: "Information Requirements in accordance with Regulation (EU) 2023/826",
    url: "https://assets.ctfassets.net/by12sj8qbpuw/75DeyrL4Nu7k6chu9uT067/a5b07d58d01e212d52b653bd12a7d318/Information_Requirements_2023_826_POC.pdf",
    market: "SE",
    kind: "standard",
    note:
      "Tillverkarens deklaration av standbyeffekt enligt EU-förordning 2023/826. En iO Sense-laddare med wifi påslaget drar 1,2 watt dygnet runt, alltså 10,5 kilowattimmar om året, mot 0,1 watt med wifi avslaget och 0,24 till 0,26 watt för de enklare laddarna.",
  },
  {
    publisher: "Philips",
    title: "Sonicare Series 5300 HX7101/02",
    url: "https://www.philips.co.uk/c-p/HX7101_02/",
    market: "UK",
    kind: "standard",
    note:
      "Tillverkarens egen specifikation: 21 dagars borstning på en laddning, 62 000 borströrelser i minuten, optisk trycksensor som varnar med vibration, ett borstläge och två intensitetsnivåer, resefodral, samt BrushPacer var tjugonde sekund och SmartTimer på två minuter.",
  },
  {
    publisher: "Philips",
    title: "Sonicare Series 6500 HX7419/01",
    url: "https://www.philips.co.uk/c-p/HX7419_01/",
    market: "UK",
    kind: "standard",
    note:
      "Tillverkarens egen specifikation: 21 dagars borstning på en laddning, tre borstlägen, tre intensitetsnivåer, tryckvarning, S2 Sensitive-borsthuvud och resefodral.",
  },
  {
    publisher: "Philips",
    title: "Sonicare Series 7100 HX7421/01",
    url: "https://www.philips.co.uk/c-p/HX7421_01/",
    market: "UK",
    kind: "standard",
    note:
      "Tillverkarens egen specifikation: 21 dagars borstning på en laddning, fyra borstlägen, tre intensitetsnivåer, synlig tryckvarning, G3 Premium Gum Care-huvud och ett resefodral med inbyggd laddport.",
  },
  {
    publisher: "Philips",
    title: "Sonicare DiamondClean 9000 HX9911/09",
    url: "https://www.philips.co.uk/c-p/HX9911_09/",
    market: "UK",
    kind: "standard",
    note:
      "Tillverkarens egen specifikation: 14 dagars borstning på en laddning, fyra lägen, tre intensitetsnivåer, trycksensor, appuppkoppling, laddglas och ett kompakt resefodral.\n\nDe fjorton dagarna är sju kortare än vad Philips anger för sin billigaste modell i jämförelsen.",
  },
  {
    publisher: "Philips",
    title: "Sonicare – borsthuvuden och laddning",
    url: "https://www.philips.se/c-p/HX7101_02/",
    market: "SE",
    kind: "standard",
    note:
      "Tillverkarens svenska sida, med formuleringen som avgör hela borsthuvudsfrågan för Philips: varje Sonicare-huvud är \"kompatibel med alla Sonicare-handtag utom Philips One och Kids\".\n\nDeras egna listpriser samma dag: A3 Premium All-in-One tvåpack 449 kronor, W2 Optimal White fyrpack 429 kronor. Här står också kundbetyget 4,6 av 5 på 273 recensioner.",
  },
  {
    publisher: "Philips",
    title: "Philips Sonicare – laddning och drifttid",
    url: "https://images-na.ssl-images-amazon.com/images/I/81qIbjSjxFS.pdf",
    market: "UK",
    kind: "standard",
    note:
      "Tillverkarens bruksanvisning, med den uppgift som gäller hela serien: \"It can take up to 24 hours before your Philips Sonicare toothbrush is fully charged.\" Ingen Sonicare i jämförelsen laddar snabbare än så, oavsett pris.",
  },
  {
    publisher: "Oral-B",
    title: "Oral-B iO och iOsense – bruksanvisning",
    url: "https://gzhls.at/blob/ldb/4/a/b/d/06f208b48dec79f98f57a7c414770361d909.pdf",
    market: "DE",
    kind: "standard",
    note:
      "Tillverkarens bruksanvisning för iO-serien. Anger tre timmars full laddning för de modeller som använder den magnetiska laddaren, timerns zonbyte var trettionde sekund och två års garanti.",
  },
];

/**
 * Airfryer.
 *
 * Kategorin har tre riktiga provningar och de drar åt olika håll, vilket är det
 * mest värdefulla sidan kan publicera.
 *
 * ⚠️ **Två av tre ligger bakom betalvägg.** Råd & Röns tabell över 70
 * luftfritöser och Stiftung Warentests över 20 får inte återges, och Råd & Rön
 * förbjuder vidarepublicering av testresultat uttryckligen. Vi citerar deras
 * **metod och kategoriomfattande fynd**, aldrig en enskild modells placering.
 * Samma disciplin som /skaftdammsugare och /mjolkskummare.
 *
 * ⚠️ **RTINGS provar 120-voltsmodeller.** Deras konstruktionskritik och deras
 * tre faktorer gäller lika mycket här, men enskilda watt-tal går inte att
 * flytta över på EU-modellerna, som drar mer vid 230 volt. Inget RTINGS-mätvärde
 * knyts till en produkt på den här sidan utom där modellnumret är detsamma.
 *
 * ⚠️ **Tek.no motsäger de andra två.** De skriver att de i blindtest "trolig
 * aldri ville gjettet hvilken pommes som kom fra hvilken maskin", medan Råd &
 * Rön ger nio av 70 en etta för just pommes. Skillnaden är sannolikt metod:
 * RTINGS och tek.no skakar korgen under tillagningen, och tek.nos egen slutsats
 * är att det lönar sig oavsett maskin. Motsättningen står utskriven i köpguiden.
 */
const FRITOS_SOURCES: Source[] = [
  {
    publisher: "Test-Achats",
    title: "Fritteusen im Test: Top-Pommes schon ab 65 Euro",
    url: "https://www.test.de/Fritteusen-im-Test-6270419-0/",
    date: "2025-12-23",
    market: "BE",
    kind: "test",
    note: "Kategorins enda aktuella labbprovning: 24 fritöser bedömda på tillagningstid, pommesens textur, bryning och krispighet, energiförbrukning och rengöring. Provningen är gjord av belgiska Test-Achats och refereras här av Stiftung Warentest, som publicerar den fritt.\n\nTvå fynd bär sidan. Det första är att rengöringen fäller maskiner som friterar bra: Domo DO458FR fick full pott på bryning, krispighet och textur och underkändes ändå på rengöring, och den enda av de 24 som bara nådde medelmåttig kvalitet fälldes på rengöringen och på att kallzonen inte fungerade. Det andra är bytesintervallet: de rekommenderar att frityrfettet byts efter fem till sex omgångar, eftersom matrester samlas i fettet och ändrar smaken.\n\nHärifrån kommer också definitionen av kallzonen: ett område i botten som är svalare, dit matrester ska sjunka utan att brännas och förorena oljan.\n\nDe elva modeller som namnges är belgiska och tyska och säljs inte i svensk handel. Inget betyg härifrån knyts till en rankad produkt.",
  },
  {
    publisher: "Tefal",
    title: "Oleoclean Pro FR804 fritös – produktsida med jämförelsetabell",
    url: "https://www.tefal.se/K%C3%B6ksapparater/Frit%C3%B6ser/OLEOCLEAN-PRO-FR804-FRIT%C3%96S/p/7211001583",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen jämförelsetabell, och beviset för att litertalet är olja och inte mat. Tefal listar `Oljekapacitet` och `Livsmedelskapacitet` som två skilda rader: 3,5 liter olja mot 1,2 kg mat för Oleoclean Pro, 2 liter mot 800 gram för Oleoclean Compact.\n\nSamma sida anger en tredje kapacitet för Compact, 600 gram pommes frites, och det är skälet till att en butik och en annan kan citera olika tal för samma maskin och båda ha rätt.\n\nHärifrån kommer också hur automatfiltreringen fungerar: oljan rinner genom en sil ned i en oljeuppsamlare under maskinen när ratten vrids till automatisk filtrering, och Tefal anger effekten till 2 100–2 300 W.",
  },
  {
    publisher: "Tefal",
    title: "Standardfritös – bruksanvisning och vanliga frågor",
    url: "https://www.tefal.com/instructions-for-use/csp/1500633470",
    market: "FR",
    kind: "standard",
    note: "Tillverkarens egen driftdokumentation, och det andra oberoende belägget för hur ofta oljan ska bytas: \"The oil or fat should be replaced after frying 5 to 7 times.\" Test-Achats säger fem till sex, Tefal fem till sju.\n\nHärifrån kommer också filtrens livslängd, som ingen jämförelsesida i kategorin nämner: metall- och kolfilter byts efter 35 till 50 friteringar, skumfilter efter 20. Vid fisk rekommenderar Tefal separat filter och oljebyte efter användning.\n\nSamma sida förklarar varför fritöser kokar över, alltså fylld över maxstrecket eller blöt mat som lagts i olja, och att olika oljor aldrig ska blandas, eftersom de har olika friteringstemperatur och kan emulgera.",
  },
  {
    publisher: "Severin",
    title: "FR 2431 Deep Fryer – produktblad",
    url: "https://severin.com/wp-content/uploads/2025/08/2431000_en.pdf",
    date: "2023-10-28",
    market: "DE",
    kind: "standard",
    note: "Tillverkarens eget produktblad, tre sidor, och källan till fältets ytterlighet: \"approx. 3 litre capacity and approx. 400 g frying capacity\". Tre liter olja för fyra hekto mat är 7,5 liter per kilo, mest i jämförelsen.\n\nBladet anger också 2 000 W, termostat upp till 190 °C med överhettningsskydd, emaljerad löstagbar oljebehållare där både behållaren och korgen tål maskindisk, utbytbart fettfilter i locket och ett värmeelement som stänger av sig automatiskt när det lyfts av.\n\nDokumentet räknar upp funktion efter funktion utan att nämna någon kallzon, trots att en svensk butik säljer maskinen under just det ordet. Kallzonen står därför som streck i tabellen och drar inte ned något betyg.",
  },
  {
    publisher: "Princess",
    title: "Princess 182727 Black Fryer 3L – specifikationer",
    url: "https://www.princesshome.eu/en-gb/princess-products/fryers/princess-182727-black-fryer-3l-01.182727.01.050",
    market: "NL",
    kind: "standard",
    note: "Tillverkarens egen specifikationstabell, och den enda i fältet som anger både kallzon och oljefilter som separata ja- och nej-fält: `Cool zone Yes`, `Clean & safety oil filter No`.\n\nTalen som används här: 3 liter olja, 600 gram mat, 2 000 W, termostat upp till 190 °C, löstagbar innerskål och delar som tål maskindisk.\n\nPrincess beskriver också själva vad kallzonen är till för: smulor som faller genom korgen samlas under värmeelementet i stället för att brännas, \"so your oil stays cleaner for longer\".",
  },
  {
    publisher: "Princess",
    title: "Princess 184090 Deep Fryer 5L – specifikationer",
    url: "https://www.princesshome.eu/en-gb/princess-184090-deep-fryer-5l-01.184090.01.001",
    market: "NL",
    kind: "standard",
    note: "Fältets största oljemängd: 5 liter för 1 000 gram mat, alltså 5 liter per kilo. Effekten anges som ett spann, 2 740 till 3 270 W, vilket är högst i jämförelsen.\n\nSamma tabell anger emaljerad innergryta, kallzon, maskindiskbara delar och termostat till 190 °C, och `Clean & safety oil filter No`.",
  },
  {
    publisher: "Tristar",
    title: "Tristar FR-6919 Deep fryer 2L – specifikationer",
    url: "https://www.tristar.eu/en-gb/tristar-products/fryers-cookers/fryers/tristar-fr-6919-deep-fryer-2l-fr--6919",
    market: "NL",
    kind: "standard",
    note: "Jämförelsens minsta maskin på båda talen: 2 liter olja, 400 gram mat och 800 W, vilket är en fjärdedel av effekten hos den starkaste här.\n\nTillverkaren anger kallzon och maskindiskbara delar men inget oljefilter.",
  },
  {
    publisher: "Taurus",
    title: "Professional 3 Plus – produktsida",
    url: "https://taurus-home.com/products/professional-3-plus",
    market: "ES",
    kind: "standard",
    note: "Tillverkarens egna uppgifter: 2 100 W, 3 liter olja och \"apta para cocinar hasta 900 g de patatas\", alltså 900 gram potatis. Maskinen har ett filtreringssystem för oljan, lock med fönster och möjlighet att fritera med locket stängt, och går att ta isär helt.\n\nGTIN 8414234739537 knyts till just de här talen via CDON:s strukturerade produktdata, eftersom Taurus egen sida använder ett annat artikelnummer.",
  },
  {
    publisher: "Icakuriren",
    title: "Stort test: Olje- och varmluftsfritöser",
    url: "https://www.hemtrevligt.se/test/stort-test-fritoser/721177",
    date: "2016-09-19",
    market: "SE",
    kind: "test",
    note: "Den enda svenska provningen som ställt oljefritöser mot varmluftsfritöser i samma test, utförd av Birgitta Rasmusson, tidigare chef för Ica provkök. Tio modeller, sex med olja och fyra med varmluft, provade på pommes frites och panerade räkor.\n\nTestet är från 2016 och ingen av modellerna säljs längre, så inget betyg härifrån knyts till en produkt. Två kategoriomdömen står sig ändå: att den dyraste maskinen var sämst, och att rengöringen är det stora problemet i båda konstruktionerna: \"Det är oerhört mycket att diska. Med oljefritöserna är det bökigt med all olja.\"",
  },
];

const AIRFRYER_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Bäst i test air fryers (luftfritöser)",
    url: "https://www.radron.se/tester/koksmaskiner-stadning/luftfritoser/",
    date: "2025-11-25",
    market: "SE",
    kind: "test",
    note: "Den enda svenska labbprovningen, och den största som finns i kategorin: 70 luftfritöser, löpande uppdaterade och alla körda med samma testprogram. En expertpanel bedömer smak, utseende och krispighet på fabrikstillverkade frysta pommes och kylskåpskalla kycklingklubbor, och maskinerna får dessutom baka paj, chokladkaka och bake off-frallor.\n\nHärifrån kommer sidans viktigaste kategorifynd. Skillnaden mellan hur mycket som får plats och hur mycket som blir bra: minsta modellen tar 433 gram pommes, men bara 289 gram om de ska bli så bra som möjligt. Nio av fritöserna får bara en etta i delbetyget för pommes, oftast för att omgången inte blir jämnt tillagad. Den som låter mest blåser på i 65 dB(A). Och om dubbelkorgarna, när kyckling och pommes körs samtidigt i var sin korg: \"i några fall är det tydligt att det är svårare att få till bra pommes i det läget\".\n\nBetygen per modell ligger bakom betalvägg och får inte vidarepubliceras. Inget resultat härifrån knyts till en produkt eller påverkar en poäng.",
  },
  {
    publisher: "RTINGS",
    title: "Air Fryer Buying Guide: We Sabotaged A Top Model To Prove What Matters",
    url: "https://www.rtings.com/air-fryer/learn/research/how-to-buy-best-air-fryer",
    market: "US",
    kind: "test",
    note: "Kategorins starkaste fria källa, och den enda som publicerar hela metoden och varje mätvärde. 52 luftfritöser inköpta och provade, varav drygt 30 i det försök som ligger till grund för sidans betygsskala.\n\nMetoden: 250 gram handplockade frysta pommes, konstant spänning via variabel transformator, förvärmning till 204 grader, vikten loggad löpande och maten uttagen vid 45 procents viktförlust. Varje pommes sorteras därefter som undertillagad, krispig eller övertillagad.\n\nDet avgörande är att de sedan saboterade en toppmodell för att isolera varje faktor. En 33 procent mindre korgbotten gav kortare tillagningstid men mycket större andel både brända och råa pommes, eftersom maten staplades. Effekten nedskruvad från 1 600 till 900 watt förlängde tillagningen med tio minuter och gav övervägande undertillagad mat. Fläkten sänkt från 3 600 till 2 100 varv ångkokte maten i stället för att göra den krispig. Deras trösklar är 325 kvadratcentimeter bottenyta och 1 400 watt.\n\nProvningen gäller amerikanska 120-voltsmodeller. Principerna bär skalan; enskilda watt-tal flyttas aldrig över på en EU-modell.",
  },
  {
    publisher: "RTINGS",
    title: "Ninja Foodi DZ201 Air Fryer Review",
    url: "https://www.rtings.com/air-fryer/reviews/ninja/foodi-dz201",
    date: "2024-09-23",
    market: "US",
    kind: "test",
    note: "Den enskilda mätning som avgör hur sidan räknar effekt. RTINGS anger maximal effekt för den här dubbelkorgen till 1 540 watt med båda lådorna igång, och noterar att talet sjunker till 1 470 watt när bara en låda används. Den andra lådan lägger alltså till sjuttio watt, inte fjortonhundra.\n\nHärifrån kommer också bottenytan per låda, 279,7 kvadratcentimeter, vilket är under RTINGS egen tröskel på 325, och fördelningen i deras pommestest: 72,7 procent krispiga, 3,0 procent övertillagade och 24,2 procent undertillagade.\n\nDZ201 säljs inte i Sverige. Mätningen används för vad den säger om konstruktionen dubbelkorg, inte om någon rankad produkt.",
  },
  {
    publisher: "Stiftung Warentest",
    title: "Heißluftfritteusen im Test: Auch günstige Airfryer liefern knusprige Pommes",
    url: "https://www.test.de/Heissluftfritteusen-im-Test-5115675-0/",
    date: "2024-12-18",
    market: "DE",
    kind: "test",
    note: "Tjugo modeller provade, femton med ett garrum och fem med två fack. Bara sex av tjugo får sammanfattningsbetyget \"gut\", och i det tyngst vägande provmomentet, tillagningen av maten, spänner betygen från \"gut\" ned till \"ausreichend\".\n\nDeras iakttagelse om storlek ligger nära Råd & Röns: flera av maskinerna klarar inte stora portioner. De har också mätt energiförbrukningen och räknat om den till årskostnad per modell samt jämfört mot vanlig ugn.\n\nBetygen per modell ligger bakom betalvägg vi inte betalat. Inget resultat härifrån knyts till en produkt.",
  },
  {
    publisher: "tek.no",
    title: "Best i test – Airfryer over 2000 kr",
    url: "https://www.tek.no/samletest/i/O8yr01/den-beste-airfryeren-over-2000-kr",
    date: "2025",
    market: "NO",
    kind: "test",
    note: "Den nordiska provningen med egen handpåläggning, bedömd på tilberedning, lydnivå, rengjøring, allsidighet och korgarnas uppbyggnad. Philips Airfryer 5000 Dual Basket utses till testvinnare i den dyrare klassen.\n\nDen tas med för att den **motsäger** de andra två, och det är värt mer än ett medhåll. Tek.no skriver att de i en blindtest sannolikt aldrig hade gissat vilka pommes som kom från vilken maskin, och att den viktigaste slutsatsen är att det lönar sig att skaka korgen under tillagningen oavsett vilken maskin man har. Deras huvudpoäng är att skillnaderna ligger i funktionalitet snarare än i resultat.\n\nBetygen per modell återges inte, eftersom bara ett fåtal av de provade säljs här under samma namn.",
  },
  {
    publisher: "Ninja",
    title: "AF300EU Dual Zone Air Fryer – bruksanvisning",
    url: "https://gzhls.at/blob/ldb/6/b/4/8/56ed8b43de91e763d9cee80a0696d4daf2c0.pdf",
    kind: "standard",
    note: "Tillverkarens egen bruksanvisning, och den som avgör två av sidans påståenden.\n\nDe tekniska specifikationerna anger `Spänning: 220-240V~, 50-60Hz` och `Effekt: 2470W`. Samma tal står i manualen för AF400EU på 9,5 liter, alltså totalt för två zoner i båda fallen.\n\nOch i den svenska brukstexten står mekanismen bakom hela sidans betygsskala, skriven av tillverkaren själv: \"För en jämn tillagning, se till att ingredienserna placeras i ett jämnt lager på botten av lådan och att de inte ligger på varandra. Skaka lådan för att vända på ingredienser för jämn krispighet.\"",
  },
  {
    publisher: "Ninja",
    title: "AF500EU MegaZone FlexDrawer Air Fryer – bruksanvisning",
    url: "https://manuals.coolblue.be/b6/ninja-af500euwh.pdf",
    kind: "standard",
    note: "Anger `Effekt: 2470W` och 10,4 liter, och beskriver MegaZone-läget: delaren tas ur för att laga i en enda zon på 10,4 liter. Det är den konstruktion som skiljer AF500EU från de fasta dubbelkorgarna och som ger den toppbetyg på jämn tillagning.",
  },
  {
    publisher: "Philips",
    title: "Airfryer 3000 Series Dual Basket NA351/00",
    url: "https://acc.philips.se/c-p/NA351_00/3000-series-dual-basket-airfryer",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens svenska produktsida. Härifrån kommer effekten 2 750 W, maxtemperaturen 200 °C, nio liters kapacitet för upp till 1,5 kg brysselkål eller en kyckling på 1,5 kg i en korg, nonstick-beläggning, två års garanti, måtten 315 × 444 × 348 mm och vikten 7,85 kg.",
  },
  {
    publisher: "Bosch",
    title: "Serie 6 Air Fryer MAF671B1",
    url: "https://www.bosch-home.se/sv/product/koksverktyg/air-fryers/airfryersingledrawer/MAF671B1",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens svenska produktsida, och en av få som anger elementets placering: `Typ av element: Övervärme`, alltså den konventionella konstruktion RTINGS teardowns visar fungerar bäst. Härifrån också 7,2 liter, en korg, 1 800 W, temperaturintervall 40–200 °C och måtten 314 × 309 × 388 mm.",
  },
  {
    publisher: "OBH Nordica",
    title: "Easy Fry Mega Air Fryer 7,5 l – produktsida och bruksanvisning AG8558N0",
    url: "https://www.obhnordica.se/koksredskap/matlagning/airfryer/easy-fry-mega-air-fryer-75-l-black",
    market: "SE",
    kind: "standard",
    note: "Tillverkaren anger 7,5 liters **användbar** kapacitet och 2 kg mat, vilket är ovanligt: de flesta anger bara kammarens volym. Vidare en låda, åtta program, temperaturintervall 80–200 °C, non-stick, nettovikt 6 kg och måtten 390 × 315 × 305 mm.\n\nEffekten står inte på produktsidan utan i bruksanvisningen till AG8558N0, som anger 220–240 V och 1 700–2 020 W.",
  },
  {
    publisher: "Cosori",
    title: "Dual Blaze Twinfry 10L Smart Air Fryer",
    url: "https://cosori.co.uk/products/cosori-dual-blaze-twinfry-10l-smart-air-fryer",
    market: "UK",
    kind: "standard",
    note: "Tillverkarens egen produktsida, den brittiska eftersom Cosori inte driver någon svensk. Anger temperaturintervallet 35–240 °C, måtten 51,8 × 33,8 × 31,3 cm och att den svarta varianten har PFAS-fri keramisk beläggning medan den ljusa har vanlig non-stick.\n\nDet som gör den intressant för sidan är konstruktionen: en enda tioliterskammare som delas i två femtioliterszoner med en **löstagbar** delare, alltså samma princip som Ninjas MegaZone.",
  },
  {
    publisher: "AIVIQ",
    title: "Premio Dual Airfryer 8L, AAF-D321",
    url: "https://www.aiviq.se/products/premio-dual-airfryer-8l",
    market: "SE",
    kind: "standard",
    note: "Enda butiken och enda tillverkaren i hela svepet som publicerar korgens mått: L223,5 × B159 × H128 mm per låda, alltså 355 kvadratcentimeter bottenyta. Det är just det tal RTINGS mätning pekar ut som avgörande, och det ligger över deras tröskel på 325.\n\nHärifrån också effekten 2 460 W, kapaciteten 8 liter fördelat på 4 liter per låda, temperaturområdet 40–240 °C, sex program och yttermåtten 391 × 366 × 350 mm.",
  },
];

/**
 * Stavmixer. Underlag i .agent/research/stavmixer.md.
 *
 * ⚠️ **Råd & Röns test är inte köpt och får inte återges även om det köps.**
 * Deras sidfot förbjuder uttryckligen all vidarepublicering av testresultat,
 * tabeller, text och bild. Metoden och den fritt läsbara prosan refereras med
 * publikationen namngiven; inga betyg, inga placeringar, ingen uppgift om
 * vilken modell som vann. Efter användarbeslut 2026-08-06.
 *
 * ⚠️ **Brauns egen produktsida motsäger sig själv om effekten.** Specfältet
 * anger 1 000 W för MQ 9135XI, säljtexten på samma sida 1 200 W, tre gånger.
 * Sidan använder specfältet. Se `Effekt` i lib/spec-schema.mjs.
 *
 * ⚠️ **obhnordica.se svarar 404 på HEAD och 200 på GET.** Båda OBH-länkarna
 * nedan är kontrollerade med GET 2026-08-06 och levererar 66 respektive 94 kB.
 * En länkkontroll som bara skickar HEAD flaggar dem felaktigt.
 *
 * ⚠️ **bamix.dk har utgånget TLS-certifikat** (`ERR_CERT_DATE_INVALID`,
 * kontrollerat 2026-08-06) och länkas därför inte, trots att det är den
 * nordiska distributörens sajt. bamix.com och bamix.us svarar normalt.
 */
const STAVMIXER_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Test: Stavmixer",
    url: "https://www.radron.se/tester/koksmaskiner-stadning/stavmixer/",
    date: "2024-11-29",
    market: "SE",
    kind: "test",
    note: "Kategorins tyngsta provning: 57 stavmixrar i labb, med majonnäs, pannkakssmet, smoothie och barnmat, hackning av örter, nötter och lök, vispning av grädde och äggvita, ljudnivå, säkerhet och ett hållbarhetsprov mätt i cykler. Projektledare Lisa Wärmegård.\n\nTestet kostar 59 kronor och är inte köpt, och Råd & Rön förbjuder dessutom vidarepublicering av resultat och tabeller. Ingen placering och inget betyg härifrån finns därför på sidan. Det som återges är metoden och de slutsatser de publicerat fritt: att hållbarhetsprovet slog sönder en modell efter 26 cykler och efter 8 vid omprov, att en annan blev 90 grader varm och började smälta efter 50, och att samma mixerstav ofta får lägre samlat betyg när den säljs som paket eftersom tillbehören vägs in i bedömningen.",
  },
  {
    publisher: "M3",
    title: "Test: 7 stavmixrar som gör underverk i köket",
    url: "https://www.m3.se/article/1829862/stavmixrar.html",
    date: "2023-03-26",
    market: "SE",
    kind: "test",
    note: "Handpålagt svenskt test av sju stavmixrar med publicerade betyg 1–5, skrivet av Andreas Bergsman för M3, som ges ut av Foundry Sverige tillsammans med PC för Alla och Macworld.\n\nBetygen spänner från 2 av 5 för en Biltemamixer på 150 W till 4,5 för Braun MultiQuick 9. Testet är från 2023 och flera provade utföranden har bytts ut sedan dess, så betyget återges bara där modellen säljs i dag under samma namn. Det påverkar inga poäng.",
  },
  {
    publisher: "bamix",
    title: "bamix SwissLine Immersion Blender",
    url: "https://bamix.us/products/bamix-swissline",
    date: "2026-08",
    market: "US",
    note: "Tillverkarens egen specifikation, och den enda i kategorin som anger effekt och varvtal på samma rad: 150 W vid 120 volt, hastighet I 13 000 v/min och hastighet II 18 000. Livstidsgarantin på motorn anges här.\n\nSidan är amerikansk och effekten gäller det amerikanska nätet. Den svenska versionen av samma D-modell anges som 200 W, medan varvtalet är detsamma. Det är precis den iakttagelse sidan bär: talet på kartongen ändras med landet, varvtalet gör det inte.",
  },
  {
    publisher: "bamix",
    title: "bamix Cordless Hand Blender",
    url: "https://bamix.com/products/bamix-cordless",
    date: "2026-08",
    market: "CH",
    note: "Tillverkarens egen sida för den batteridrivna modellen: hastighet I 8 000 v/min, hastighet II 13 000 och skaftlängd 14 cm. Samma sajt bär bamix egen reservdelsavdelning, som är underlaget för märkets betyg på reparerbarhet.",
  },
  {
    publisher: "Wilfa",
    title: "Prostick immersion blender",
    url: "https://wilfa.com/products/prostick",
    date: "2026-08",
    market: "NO",
    note: "Tillverkarens egen specifikation för Prostick IM4B-1000FP: 1 000 W, tre hastigheter angivna som 5 000, 10 000 och 15 000 v/min, bägare i Tritan som tål 100 grader, och 5 års garanti på hela Wilfas sortiment med upp till 10 år på utvalda produkter, i båda fallen på motorn.",
  },
  {
    publisher: "OBH Nordica",
    title: "Femton års åtagande för reparation",
    url: "https://www.obhnordica.se/femton-ars-atagande-for-reparation",
    date: "2026-08",
    market: "SE",
    note: "Tillverkarens åtagande att hålla reservdelar tillgängliga i 15 år efter inköpsdatum, gällande sedan 1 januari 2022 och även efter garantitidens slut. Varje ny produkt kontrolleras mot märkningen 15 års reparerbar, och delarna säljs via auktoriserad verkstad.\n\nDet är det längsta uttalade åtagandet i fältet vid sidan av bamix livstidsgaranti på motorn, och underlaget för båda OBH-produkternas betyg på reparerbarhet.",
  },
  {
    publisher: "Braun Household",
    title: "MultiQuick 9 stavmixer MQ 9135XI",
    url: "https://www.braunhousehold.com/sv-se/p/multiquick-9-multiquick-9-stavmixer-mq-9135xi/HB901-MQ9135XI.html",
    date: "2026-08",
    market: "SE",
    note: "Tillverkarens egen svenska produktsida, och källan till sidans andra iakttagelse. Under Tekniska specifikationer står Effekt (W) 1000, i två separata rutor. I säljtexten på samma sida står 1 200 watt tre gånger.\n\nHandeln återger genomgående det högre talet. Tabellen här använder specfältet. Sidan ger också sladdlängd 1,2 meter, vikt 0,7 kilo, steglös hastighetsreglering och tillbehören: hackare på 500 ml, iskniv, visp och bägare.",
  },
  {
    publisher: "OBH Nordica",
    title: "InfinyForce Pro stavmixer",
    url: "https://www.obhnordica.se/koksredskap/matberedning-och-mixning/stavmixers/infinyforce-pro-stavmixer",
    date: "2026-08",
    market: "SE",
    note: "Tillverkarens specifikationstabell för HN95HDS0: 1 200 W, fyrbladig Powelix-kniv, steglös hastighetsreglering med turbo, kabel 1,1 meter, rostfritt stål och plast, 1,63 kilo, och tillbehören visp, minihackare, mixerbägare och puréfot.",
  },
  {
    publisher: "Bosch",
    title: "Stavmixer ErgoMixx 750 W MSM67160",
    url: "https://www.bosch-home.se/sv/product/koksverktyg/stavmixers/ovrigt/MSM67160",
    date: "2026-08",
    market: "SE",
    note: "Tillverkarens tekniska översikt: anslutningseffekt 750 W, tolv hastighetsval, mixerfot i stål som går att ta loss, fyrvingad QuattroBlade och nettovikt 1,3 kilo. Bosch driver egen reservdelsförsäljning för hushållsapparater.",
  },
  {
    publisher: "Ninja",
    title: "Ninja Foodi Power Mixer System CI100",
    url: "https://www.ninjasverige.com.se/product/ninja-foodi-power-mixer-system-hand-blender-and-5-speed-hand-mixer-combo-svarta/",
    date: "2026-08",
    market: "SE",
    note: "Tillverkarens egen svenska produktsida, som anger 650 W och garantitid 1 år. Det är den kortaste garantin bland de tolv, mot Wilfas fem år och bamix livstid på motorn.",
  },
  {
    publisher: "Severin",
    title: "Bruksanvisning SM 3771 / SM 3772",
    url: "https://cdn.starwebserver.se/shops/severin/files/3772.pdf",
    date: "2026-08",
    market: "DE",
    note: "Tillverkarens egen bruksanvisning, med tekniska data på tolv språk: 220–240 volt och 600 watt. Manualen beskriver varvtalsreglaget och turboknappen men anger inget varvtal, vilket är normalfallet i kategorin.",
  },
  {
    publisher: "Philips",
    title: "Datablad ProMix-stavmixer HR2652/90",
    url: "https://media.flixcar.com/f360cdn/Philips-43902866-hr2652_90_pss_swese.pdf",
    date: "2019-03-27",
    market: "SE",
    note: "Philips eget produktdatablad, version 6.0.1, och ett av två dokument i hela svepet som anger ett varvtal: 800 W och max 11 500 varv i minuten. Talet är jämförelsepunkten mot bamix 200 W och 18 000 v/min, alltså grunden för att effekt och varvtal inte följer varandra.\n\nModellen ingår inte i rankningen. Databladet är med som källa för själva storheten.",
  },
];

const SMOOTHIEMIXER_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Smoothie direkt i muggen: test av 22 smoothieblendrar",
    url: "https://www.radron.se/tester/koksmaskiner-stadning/smoothieblendrar/",
    date: "2017-12-22",
    market: "SE",
    kind: "test",
    note: "Den enda svenska labbprovningen av just den här produktklassen, med 22 modeller provade på tre smoothierecept av testledaren Ronny Karlsson. Testet är från 2017 och Råd & Rön har låst upp det själva med motiveringen att flera av modellerna inte längre säljs, så inga betyg och inga produkter härifrån ligger på den här sidan.\n\nDet som fortfarande gäller är metodens iakttagelser om kategorin: att många maskiner har en angiven maxtid på en minut och sedan måste vila, att motoreffekten då låg på 200 till 300 watt hos majoriteten, och att morötter och stjälkselleri är svårast att finfördela. Vi har kontrollerat maxtiden mot dagens bruksanvisningar och den står kvar.",
  },
  {
    publisher: "Testfakta",
    title: "Mixat resultat i blendertest, laboratorietest av nio blenders",
    url: "https://www.testfakta.se/sv/blender-bast-i-test",
    date: "2025-08",
    market: "SE",
    kind: "test",
    note: "Laboratorietest utfört av Applitest GmbH i Nürnberg på uppdrag av Testfakta, med tidtagning och silning av smoothie, iskrossning, nöthack, bullermätning och 100 uthållighetscykler.\n\nTestet gäller bänkblenders med kanna mellan 1,4 och 2 liter, alltså inte produkterna på den här sidan, och bär därför inga betyg här. Det är med som mätpunkt för vad en kannmaskin gör: nio av nio låg mellan 1 200 och 1 800 watt, och smoothieprogrammen tog mellan 45 och 147 sekunder.",
  },
  {
    publisher: "Ninja",
    title: "Ninja Blast Portable Blender BC100/BC150 Series, Owner's Guide",
    url: "https://www.trovaprezzi.it/manuali/ninja_blast_bc151eubk.pdf",
    market: "UK",
    kind: "standard",
    note: "Bruksanvisningen som definierar vad en mixning är: ett tryck på start startar en fast cykel på 30 sekunder. Det är talet som gör Ninjas mixningar jämförbara med KitchenAids minuter.\n\nHärifrån kommer också laddningstiden på minst 2 timmar, driftspänningen 5 volt över USB-C och anvisningen att låta motorn svalna omkring 15 minuter om den överhettas.",
  },
  {
    publisher: "OBH Nordica",
    title: "Bruksanvisning Twister Go 7740 och 7744",
    url: "https://static.elongroup.se/Document/Article/241360/manual-matberedning-obh-nordica-7744.pdf",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen bruksanvisning, och sidans skarpaste enskilda uppgift: \"Maximal användningstid: 1 minut, vänta minst 5 minuter innan apparaten används igen.\" Ingen produktsida i handeln återger det.\n\nHärifrån kommer också 300 watt, blenderflaskans volym 600 ml och beskedet att samtliga lösa delar diskas för hand, även flaskorna.",
  },
  {
    publisher: "Smeg",
    title: "Bruksanvisning kompakt blender PBF01",
    url: "https://static.elongroup.se/Document/Article/357070/manual-matberedning-smeg-121705.pdf",
    market: "SE",
    kind: "standard",
    note: "Anger att maskinen får köras i högst 60 sekunder åt gången och sedan ska vila i 60 sekunder, samt att kannan inte får fyllas över 600 ml. Jämförelsepunkten mot OBH Nordicas fem minuters vila på en maskin i samma klass.\n\nHär står också att ingredienserna ska skäras i bitar om högst 1 × 1 centimeter och att vätskan ska vara minst hälften av det fasta.",
  },
  {
    publisher: "Ninja",
    title: "Nutri Ninja QB3000-serien, bruksanvisning",
    url: "https://manuals.coolblue.be/61/nutri-ninja-qb3001.pdf",
    market: "US",
    kind: "standard",
    note: "Anger 700 watt och att muggar, lock och knivenhet alla tål maskindisk medan motordelen torkas av. Det är den bredaste maskindisken i hela jämförelsen.\n\nDokumentet är den amerikanska utgåvan och anger 120 volt och muggar på 16 oz. Den europeiska modellen säljs med 470 ml-muggar, vilket är talet som används här.",
  },
  {
    publisher: "Wilfa",
    title: "Swift RCBL-45 portabel blender",
    url: "https://wilfa.com/sv/products/swift-white",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen produktsida, och en av två i hela fältet som anger både effekt och programlängd: 45 watt, 18 000 varv i minuten och ett blenderprogram på 35 sekunder. Med upp till 14 mixningar per laddning ger det 8 minuter och 10 sekunders mixtid.\n\nHärifrån kommer också 300 ml i tritan, måtten 8,2 × 20,7 centimeter och artikelnumret 604163.",
  },
  {
    publisher: "KitchenAid",
    title: "How to use KitchenAid Go cordless personal blender",
    url: "https://www.kitchenaid.ie/product-tips/kitchenaid-go/cordless-personal-blender",
    market: "UK",
    kind: "standard",
    note: "Den enda tillverkaren som anger batteriet i minuter i stället för i mixningar: upp till 20 minuters mixtid på en laddning, med en knapp som kör maskinen i en minut och sedan stänger av automatiskt. Batteriet tar omkring 3 timmar att ladda fullt och delas med hela Go-serien.",
  },
  {
    publisher: "nutribullet",
    title: "nutribullet Portable NBP003: produktsida och specifikationer",
    url: "https://www.nutribullet.com/sv-se/p/nutribullet-portable-nutribullet-portable/NBP003NBL.html",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen specifikationstabell, där fältet Effekt innehåller \"2000mAh Battery\". Det är kategorins tydligaste exempel på att watt och batterikapacitet trycks in i samma rad.\n\nHärifrån kommer 475 ml i tritan, vikten 0,73 kilo, måtten 267 × 95 × 95 millimeter, korsbladet i rostfritt stål och uppgiften att en laddning räcker till över 15 användningar.",
  },
  {
    publisher: "Kjell & Company",
    title: "Ninja Blast Max bärbar mixer",
    url: "https://www.kjell.com/se/produkter/hem-fritid/kok-matsal/mixers-blenders/ninja-blast-max-barbar-mixer-p47505",
    market: "SE",
    kind: "standard",
    note: "Butiksspecifikationen som är fylligare än tillverkarens egen svenska sida: 570 ml deklarerad volym med max fyllning 490 ml, batterispänning 11,1 volt, laddningstid omkring 4 timmar, upp till 25 mixningar och ett manuellt läge på 30 sekunder.\n\nSamma sida bär BlendBoss-uppgifterna: 1 100 watt, resebägare på 710 ml med 650 ml max fyllnad, vikt 2,55 kilo och att lock, sugrör och kniv går i diskmaskinen.",
  },
];

/**
 * Dörr- och fönstersensor.
 *
 * ⚠️ Noll poster med `kind: "test"`, och det är ett riktigt läge och inte en
 * lucka. Ingen oberoende provning av magnetkontakter existerar: Råd & Rön har
 * ingen, Stiftung Warentest har provat smarta säkerhetssystem och mekaniska
 * fönsterlås, och tek.no nämner sensorerna bara inuti systemtester. Det står
 * utskrivet i metodrutan, i köpguiden och i en FAQ-post, enligt IDÉ-012.
 *
 * Tyngdpunkten ligger därför på manualer och tillverkarnas specifikationsflik.
 * De två PDF:erna gav uppgifter som inte står någonstans i handeln: Cleverios
 * mått och dess anti-tamper, och Fibaros TMP-knapp.
 */
const DORR_OCH_FONSTERSENSOR_SOURCES: Source[] = [
  {
    publisher: "Cleverio",
    title: "Window & Door Sensor SS100, user guide",
    url: "https://www.kjell.com/globalassets/mediaassets/864506_51826_manual_en_no_sv_20220921.pdf",
    market: "SE",
    kind: "standard",
    note: "Manualen som Kjell länkar från produktsidan, och den enda källan till sensorns mått: 54 × 22 × 12 mm för sensorn och 33 × 10 × 12 för magneten, vikt 23 gram. Butikens eget specifikationsblock anger inget av det.\n\nHärifrån kommer också att magneten får sitta högst 10 mm från sensorn, att drifttemperaturen är −10 till 55 °C, och att anti-tamper-skyddet finns. Manualen avråder uttryckligen från montering på dörrar och fönster med metallkarm, vilket inget produktblad i handeln nämner.",
  },
  {
    publisher: "Fibaro",
    title: "Door/Window Sensor 2 FGDW-002, operating manual",
    url: "https://www.kjell.com/globalassets/mediaassets/711865_50594_manual_en.pdf",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens manual, länkad från Kjells produktsida. Bekräftar sabotageknappen (TMP) som utlöser när enheten lossas eller öppnas, att sensorn är av Hall-effekttyp och Z-Wave Plus-certifierad, och att magneten ska sitta högst 5 mm från sensorn.\n\nAnger också räckvidden till upp till 50 meter utomhus och 40 meter inomhus, samt att en inbyggd temperaturmätning ingår. Den sista uppgiften är skälet till att Fibaro får poäng på kriteriet för fler mätvärden.",
  },
  {
    publisher: "Aqara",
    title: "Door and Window Sensor P2, specifications",
    url: "https://www.aqara.com/en/product/door-and-window-sensor-p2/specs/",
    kind: "standard",
    note: "Tillverkarens egen specifikationsflik. Huvudenheten mäter 77 × 22 × 22 mm och magneten 36 × 11,5 × 7,3, vilket gör den till fältets största huvudenhet, dubbelt så lång som Shellys. Batteriet är CR123A och protokollen Thread och Bluetooth, modellbeteckning DW-S02E och DW-S02D.\n\nAqara anger ingen batteritid för modellen och skriver att den beror på vilken Thread-router och vilken Matter-app sensorn används med. Det är skälet till att P2 saknar betyg på det kriteriet i stället för att få ett lågt.",
  },
  {
    publisher: "Kjell & Company",
    title: "Smarta magnetkontakter",
    url: "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter",
    market: "SE",
    kind: "standard",
    note: "Kategorisidan med 19 artiklar, alltså det djupaste sortimentet i svensk handel. Härifrån kommer priser, lagerstatus och kundbetyg för nio av de tolv rankade sensorerna.\n\nKjell publicerar batteritid och mått per produkt, vilket är ovanligt i den här kategorin. Däremot anges inget GTIN, så produkterna går inte att matcha mot tillverkarens artikelnummer härifrån.",
  },
  {
    publisher: "Kjell & Company",
    title: "Yale Magnetkontakt för inomhusbruk",
    url: "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/yale-magnetkontakt-for-inomhusbruk-p67914",
    market: "SE",
    kind: "standard",
    note: "Butiksspecifikationen med fältets längsta batteritid: upp till fyra år på ett CR2450. Anger också måtten 68,5 × 29 × 9,52 mm, vikten 35 gram, radion Horizon+ på 868 MHz och en räckvidd på upp till en kilometer.\n\nSamma sida är belägget för att produkten är ett tillbehör till Yale Smart Hub, vilket är skälet till att den bästa hårdvaran i fältet ändå bara får 2,0 på öppenhet.",
  },
  {
    publisher: "Kjell & Company",
    title: "Shelly BLU Door/Window ZB",
    url: "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/shelly-blu-doorwindow-zb-ivory-p52298",
    market: "SE",
    kind: "standard",
    note: "Butiksspecifikationen för fältets minsta sensor: 35 × 35 × 7 mm, med magnet på 35 × 12 × 7. Anger upp till tre års batteritid på ett enda CR2032 som medföljer, alltså samma drifttid som de sensorer som behöver två AAA-celler för att nå dit.\n\nHärifrån kommer också att sensorn mäter tiltvinkel och ljusnivå i lux vid sidan av öppet och stängt, att den talar både Bluetooth 5.0 och Zigbee 3.0, och att drifttemperaturen är −20 till 40 °C.",
  },
  {
    publisher: "Inet",
    title: "ThirdReality Dörr- och fönstersensor P1DSA1-GEU",
    url: "https://www.inet.se/produkt/8310162/thirdreality-dorr-fonstersensor",
    market: "SE",
    kind: "standard",
    note: "Anger två AAA-batterier och upp till två års drifttid, samt att sensorn fungerar med Home Assistant, SmartThings, Aeotec, Homey och Hubitat över Zigbee 3.0.\n\nInets specifikationsblock ligger i sidans HTML och går att läsa med vanlig hämtning, till skillnad från Kjells. Deras sida svarar däremot 403 på en automatiserad webbläsare, alltså tvärtemot Kjell. Två butiker, två motsatta hinder.",
  },
  {
    publisher: "Proshop",
    title: "Sonoff SNZB-04PR2 öppningssensor för fönster och dörr",
    url: "https://www.proshop.se/Smarta-Hem/Sonoff-SONOFF-SNZB-04PR2-oeppningssensor-foer-foenster-och-doerr/3491835",
    market: "SE",
    kind: "standard",
    note: "Enda källan i hela fältet som publicerar ett GTIN, 6979033600140. Anger Zigbee 3.0, två AAA-batterier för upp till tre års drift, sabotageavkänning, och att sensorn fungerar med eWeLink, Home Assistant, MQTT, iHost, Amazon Alexa och Apple Home via Matter-brygga.\n\nUppgifterna är butikens och inte Sonoffs egna, eftersom tillverkaren inte har någon fungerande produktsida för modellen. Måtten 90 × 26 × 13,5 mm kommer därför från två andra håll som stämmer överens.",
  },
  {
    publisher: "IKEA",
    title: "PARASOLL dörr-/fönstersensor, smart/vit",
    url: "https://www.ikea.com/se/sv/p/parasoll-doerr-foenstersensor-smart-vit-80504308/",
    market: "SE",
    kind: "standard",
    note: "Sidan är märkt \"Utgår inom kort\" och produkten ligger på IKEA:s egen sida \"Last chance to buy\", kontrollerat 2026-08-07. Det är skälet till att PARASOLL ligger bland övervägda i stället för i rankningen.\n\nSidan anger måtten 40 × 88 × 18 mm, att batteri inte medföljer, och att sensorn kräver DIRIGERA eftersom den inte kan anslutas till den äldre TRÅDFRI-gatewayen. Det sista är värt att veta för alla som byggt sitt IKEA-hem före 2023.",
  },
  {
    publisher: "Connectivity Standards Alliance",
    title: "Matter, the standard for smart home connectivity",
    url: "https://csa-iot.org/all-solutions/matter/",
    kind: "standard",
    note: "Standardorganet bakom Matter, citerat för vad märkningen innebär: en Matter-certifierad sensor fungerar med vilken certifierad controller som helst, oavsett vilket märke som tillverkat den.\n\nDet är definitionen som gör kriteriet Öppenhet mot hubbar mätbart i stället för en åsikt. Räknas inte som ett produkttest.",
  },
  {
    publisher: "Thread Group",
    title: "What is Thread, overview",
    url: "https://www.threadgroup.org/What-is-Thread/Overview",
    kind: "standard",
    note: "Citerad för skillnaden mellan Thread och Zigbee, som båda är lågenergiradio i mesh men inte samma sak: Thread bär IP-adressering och är transporten Matter använder i den här produktklassen.\n\nSkillnaden avgör varför Aqaras P2 får ett högre betyg på öppenhet än en Zigbee-sensor som kräver att hubben talar just Zigbee.",
  },
  {
    publisher: "Smarta Hem Test",
    title: "Bästa magnetsensor till smarta hem 2026",
    url: "https://www.smartahemtest.se/test/basta-smarta-magnetsensor",
    market: "SE",
    kind: "comparison",
    note: "Den enda svenska sajt som har en sida om den här kategorin över huvud taget. Deras topplista har Aqara P2 etta, Frient Entry Sensor Pro fyra och NEO Coolcam femma.\n\nDet är en jämförelse och ingen provning, så inga betyg härifrån väger i vår rankning. Den är med för att den är kategorins enda svenska konkurrent, och för att den bekräftade att sabotagelarm finns som egenskap i fältet, vilket vi sedan belade hos tillverkarna.",
  },
  {
    publisher: "Automatiserar.se",
    title: "Test av dörrsensorn PARASOLL från IKEA",
    url: "https://automatiserar.se/test-av-dorrsensorn-parasoll/",
    market: "SE",
    kind: "comparison",
    note: "Svensk blogg med riktig handpåläggning som publicerat enskilda tester av IKEA PARASOLL, Aeotec dörr- och fönstersensor och Nexa LMST-606, med egna betyg. Deras iakttagelse om PARASOLL är att den bara gör en sak, och att formfaktorn krånglar på äldre fönster.\n\nDet är en bloggs praktiska erfarenhet och inte en labbprovning, så den väger noll i rankningen och citeras bara i prosa. Den räknas som jämförelse och inte som experttest, just för att den inte ska addera till antalet oberoende tester vi säger oss ha läst.",
  },
];

const ESPRESSOMASKIN_SOURCES: Source[] = [
  {
    publisher: "Råd & Rön",
    title: "Fixa kaffet på minuten – test av 57 espressomaskiner",
    url: "https://www.radron.se/tester/koksmaskiner-stadning/espressomaskiner/",
    date: "2021-11-24",
    market: "SE",
    kind: "test",
    note: "Kategorins tyngsta provning, och ovanligt nog fritt läsbar. Sidan säger själv varför: \"Vi har låst upp det här testet för att flera av de testade modellerna inte längre kan köpas i butik.\" Tio specialtränade kaffeexperter blindtestade kopp efter kopp i enskilda bås, och labbet mätte temperaturen i varje kopp.\n\nTre tal härifrån bär den här sidan. Kaffet ur maskinerna höll mellan 53 och 71 grader, och Råd & Rön skriver att det inte går att se ett samband mellan låg temperatur och sämre kaffe. Tiden från påslag till första kopp gick från 44 sekunder till över fem minuter. Och i ett uthållighetsprov brygde två maskiner från var och en av fyra tillverkare 2 500 koppar, varav den ena bara fick sumplådan tömd, och kaffet ur de ovårdade smakade lika bra.\n\nBetygen och de sex utnämningarna används inte. Testet är fem år gammalt och deras villkor förbjuder vidarepublicering av testresultat och tabeller.",
  },
  {
    publisher: "Ljud & Bild",
    title: "Grupptest: 4 espressomaskiner (2024)",
    url: "https://www.ljudochbild.se/test/smart-hem/4-espressomaskiner-2024/",
    date: "2024-11-09",
    market: "SE",
    kind: "test",
    note: "Fyra helautomater i mellanklassen, provade med samma två bönor genomgående: en Lavazza för ungefär 205 kronor kilot och en Yirgacheffe för 475. Bedömningen väger kaffekvalitet och användarvänlighet tyngst.\n\nTvå av de provade säljs här under exakt samma modellbeteckning, och deras omdömen står vid respektive produkt: Philips Series 5500 EP5547/90 och Aiviq AEM-101S. Om den tredje, DeLonghi Dinamica Plus, skriver de att den gör \"den överlägset mest välsmakande espresson i testet\", men den varianten heter ECAM380.85.SB och säljs inte här, så talet flyttas inte.\n\n⚠️ Ljud & Bilds egen sidfot upplyser om att artiklar utanför plustjänsten är \"friköpta\" från betalvägggen av tillverkaren eller leverantören. Provningen är ändå kritisk mot flera av maskinerna, men uppgiften hör till bedömningen av källan.",
  },
  {
    publisher: "Ljud & Bild",
    title: "Grupptest: 4 espressomaskiner i toppklass",
    url: "https://www.ljudochbild.se/test/smart-hem/4-espressomaskiner-i-toppklass/",
    date: "2023-11-04",
    market: "SE",
    kind: "test",
    note: "De fyra dyraste maskinerna på marknaden, provade dagligen i flera veckor plus ett jämförande smaktest med två gäster.\n\nOm Siemens EQ900 skriver de \"Godkänd i teorin, misslyckad i praktiken\": maskinen slår konkurrenterna på utrustning och pris men ger espresso, americano och cappuccino \"under genomsnittet\". Det är den skarpaste illustrationen av att utrustningslistan och koppen inte följer varandra.\n\n⚠️ Omdömet knyts **inte** till TQ903R09 på den här sidan. Ljud & Bild beskriver sin EQ900 som \"två bönbehållare, var och en med sin egen kvarn\", medan Siemens egen produktsida för TQ903R09 anger en bönbehållare på 375 gram. Det är en annan variant, och ett betyg får aldrig flyttas mellan varianter.",
  },
  {
    publisher: "Testfakta",
    title: "Stora skillnader på espresson",
    url: "https://www.testfakta.se/sv/hem-hushall/article/stora-skillnader-pa-espresson",
    date: "2008-10-25",
    market: "SE",
    kind: "test",
    note: "Nio helautomater blindtestade av två kaffeproffs, med viktningen utskriven och en kemisk analys av bly, nickel, arsenik, koppar och kadmium i det bryggda kaffet utförd av Sveriges Tekniska Forskningsinstitut.\n\nTas med för metoden och inte för resultaten. Testet är från 2008 och ingen av de nio maskinerna säljs i dag, så inget tal härifrån rör en produkt på sidan. Det visar däremot att blindtestning av espresso ur helautomater har gjorts likadant i Sverige i snart tjugo år.",
  },
  {
    publisher: "Melitta",
    title: "Barista T Smart – produktsida och tekniska data",
    url: "https://www.melitta.se/espressomaskiner/barista-t-smart-/faerg-svart",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen specifikation, och den som rättar handeln. Melitta anger `Bean Select (bönbehållare med två kammare): Ja` och beskriver funktionen i prosa: \"Bönbehållaren med två kammare gör det möjligt att välja manuellt mellan två olika sorters kaffebönor.\" Butikens strukturerade attribut angav en behållare.\n\nSamma sida anger fem malningsnivåer, fem styrkelägen, avtagbar bryggenhet, arton kaffedrycker, fyra sparade profiler under \"My Coffee\" och styrning via Melitta Connect.",
  },
  {
    publisher: "Siemens",
    title: "Så här rengör du bryggenheten på din EQ900 kaffemaskin",
    url: "https://www.siemens-home.bsh-group.com/se/kundservice/rengoring-och-underhall/kaffemaskiner/eq900/djuprengoring/bryggenhet",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen serviceanvisning, som visar bryggenheten lyftas ur maskinen steg för steg. Den avgör en cell som varken butiken eller Icecat kunde fylla: EQ900 har avtagbar bryggenhet.",
  },
  {
    publisher: "Siemens",
    title: "TQ903R09 EQ900 – teknisk översikt",
    url: "https://www.siemens-home.bsh-group.com/se/sv/product/TQ903R09",
    market: "SE",
    kind: "standard",
    note: "Anger 2,3 liters vattentank, **en** bönbehållare på 375 gram, mjölksystem med integrerad mjölkbehållare och den fullständiga listan över mjölkdrycker som fås med ett tryck utan att koppen flyttas. Malningsgraden styrs elektroniskt per dryck, vilket Siemens kallar eGrinder.\n\nAntalet bönbehållare är skälet till att Ljud & Bilds EQ900-omdöme inte knyts till den här modellen.",
  },
  {
    publisher: "Siemens",
    title: "TE651209RW EQ.6 plus s100 – teknisk översikt",
    url: "https://www.siemens-home.bsh-group.com/se/sv/product/TE651209RW",
    market: "SE",
    kind: "standard",
    note: "Anger 1,7 liters vattentank, 300 grams bönbehållare, keramisk kvarn och mjölksystem med slang till extern mjölkbehållare eller mjölkpaket. Två funktioner står utskrivna: autoMilk Clean, som sköljer mjölksystemet efter varje dryck, och aromaDouble Shot, som mal och brygger i två omgångar.",
  },
  {
    publisher: "Coffee Friend",
    title: "Helautomatiska kaffemaskiner – sortiment, priser och specifikationer",
    url: "https://www.coffeefriend.se/c/kaffemaskiner/helautomatiska-kaffemaskiner/",
    date: "2026-08-07",
    market: "SE",
    kind: "standard",
    note: "Butikens eget sortiment, och underlaget för både priser och den mätning som satte vikten på mjölksystemet. 170 helautomater i katalogen, varav 54 i lager under 15 500 kronor den dag sidan skrevs.\n\nVarje produktsida publicerar EAN, mått, vikt och ett fyrtiotal strukturerade attribut, vilket är ovanligt utförligt för svensk handel. Priserna är lästa på produktsidorna samma dag.\n\n⚠️ Butiksdata är tier B och har rättats mot tillverkaren på två punkter: antalet bönkammare i Melitta Barista T Smart, och ett effektfält som för Philips EP5547/90 innehåller nätspänningen.",
  },
];

/**
 * Fönsterlarm.
 *
 * ⚠️ Noll poster med `kind: "test"`, precis som på systersidan
 * /dorr-och-fonstersensor. Ingen oberoende provning av fristående
 * fönsterlarm existerar. Det står utskrivet i metodrutan, i köpguiden och i
 * en FAQ-post, enligt IDÉ-012.
 *
 * Tyngdpunkten ligger på Nedis egna svenska produktsidor, som är den enda
 * tillverkaren i fältet med publicerade specifikationstabeller. Resten av
 * fältet är butiksdata.
 */
const FONSTERLARM_SOURCES: Source[] = [
  {
    publisher: "Nedis",
    title: "Dörr- och fönsterlarm med siren, magnetisk sensor, ALRMD20WT",
    url: "https://nedis.se/sv-se/product/550726778/dorr-och-fonsterlarm-med-siren-magnetisk-sensor-batteridriven-2x-cr2032-85-db-vit",
    market: "SE",
    kind: "standard",
    note: "Tillverkarens egen specifikationstabell, och den enda i hela fältet som publicerar mått, vikt och celltyp i ett sammanhållet format. Larmenheten mäter 76 × 8 × 76 mm och väger 41 gram, vilket gör den till fältets tunnaste. Ljudnivån anges till 85 dB och de två CR2032-cellerna medföljer.\n\nSamma sida bär glaskrossvarianten ALRMGBD20WT på 76 × 9 × 76 mm och 45 gram, alltså en millimeter tjockare för en extra utlösare. Båda aktiveras med en enkel av- och påknapp.",
  },
  {
    publisher: "Nedis",
    title: "Dörr- och fönsterlarm med siren, knappsats, ALRMD30WT",
    url: "https://nedis.se/sv-se/product/550727584/dorr-och-fonsterlarm-med-siren-knappsats-magnetisk-sensor-batteridriven-3x-aaalr03-85-db-vit",
    market: "SE",
    kind: "standard",
    note: "Fältets enda larm med kodlås på fronten, och tillverkarens beskrivning av vad det innebär: en fyrsiffrig PIN-kod aktiverar larmet och systemet har tre driftlägen. Ljudnivån är samma 85 dB som deras enklare modell.\n\nHärifrån kommer också priset man betalar i format: 33 × 105 × 62 mm och 105 gram, alltså mer än dubbelt så tungt som deras tunna variant, och de tre AAA-batterierna medföljer inte.",
  },
  {
    publisher: "Teknikdelar",
    title: "Nedis dörr- och fönsterlarm, batteridriven, 85 dB",
    url: "https://www.teknikdelar.se/produkt/nedis-dorr-och-fonsterlarm-batteridriven-85-db-vit",
    market: "SE",
    kind: "standard",
    note: "Enda källan i fältet som publicerar ett GTIN, 5412810329465 för ALRMD30WT. Priset är 79 kronor mot 130 för samma artikel hos en annan butik, alltså 39 procent skillnad på identisk vara.\n\nDeras beskrivning förklarar också de tre driftlägena, däribland ett nödläge som utlöser sirenen direkt oavsett om larmet är påslaget.",
  },
  {
    publisher: "Kjell & Company",
    title: "Luxorparts trådlöst fönster- och dörrlarm 4-pack, MC-02",
    url: "https://www.kjell.com/se/produkter/sakerhet-overvakning/larmsystem/hemlarm/inbrottslarm/luxorparts-tradlost-fonster-och-dorrlarm-4-pack-p51448",
    market: "SE",
    kind: "standard",
    note: "Fältets enda larm med fjärrkontroll och dess högsta ljudnivå: 130 dB i 30 sekunder, tre valbara larmsignaler och en fjärrkontroll med upp till 15 meters räckvidd. Kundbetyget 4,5 av 5 från 117 personer är det bredaste underlaget i hela jämförelsen.\n\nHär står också uppgiften som ändrar räkningen: paketet drivs av totalt åtta AAA-batterier som säljs separat, plus ett CR2032 till fjärrkontrollen som medföljer. Måtten publiceras inte, och den bifogade manualen är en inskannad bild utan sökbar text.",
  },
  {
    publisher: "Clas Ohlson",
    title: "Dörrlarm och passagelarm med magnetkontakt, 36-8496",
    url: "https://www.clasohlson.com/se/Dorrlarm---passagelarm-med-magnetkontakt/p/36-8496",
    market: "SE",
    kind: "standard",
    note: "Det högljuddaste enskilda larmet i jämförelsen. Butikens egen text anger cirka 130 dB och beskriver det som en ljudstyrka som är smärtsamt hög. Larmenheten mäter 65 × 34 × 17 mm och magneten 36 × 10 × 14, och tre LR44-celler medföljer.\n\nProdukten har fem funktioner och kan ställas om från siren till en ding-dong-signal, vilket gör den användbar som dörrvakt i stället för som inbrottslarm. 132 kundomdömen ger den 4,0 av 5.",
  },
  {
    publisher: "SkyddsExperten",
    title: "Dörr- och fönsterlarm",
    url: "https://www.skyddsexperten.se/hem-tradgard/larm-overvakning/dorr-och-fonsterlarm",
    market: "SE",
    kind: "standard",
    note: "Fältets billigaste larm på 59 kronor, med en angiven ljudnivå på 95 till 100 dB. Huvudenheten mäter 93 × 31 mm och magnetkontakten 50 × 13, och larmet aktiveras med en på- och avbrytare på huvudenheten.\n\nDe två AAA-batterierna medföljer inte, vilket butiken skriver ut och som gör att den faktiska kostnaden ligger närmare de larm som är dyrare på hyllan.",
  },
  {
    publisher: "eStore",
    title: "Kompakt och lättmonterat fönster- och dörrlarm med 90 dB",
    url: "https://estore.nu/sv/fonster-och-dorrlarm/2590-kompakt-och-lattmonterat-fonster-d-rr-larm-med-90-db.html",
    market: "SE",
    kind: "standard",
    note: "69 kronor med tre LR44-celler och monteringstejp i förpackningen, alltså det billigaste sättet att larma ett fönster utan att köpa något mer. Ljudnivån anges till 90 dB och larmet utlöses när de två delarna separeras.\n\nVikten anges till 35 gram men inga mått publiceras, varken här eller hos någon annan återförsäljare av samma artikel.",
  },
  {
    publisher: "Teknikproffset",
    title: "Nedis dörr- och fönsterlarm med glaskrossensor, ALRMGBD20WT",
    url: "https://www.teknikproffset.se/hem-hushall-tradgard/larm-sakerhet/rorelsesensorer/tunn-glaskrossdetektor-med-larm-for-dorrar-och-fonster-inbyggd",
    market: "SE",
    kind: "standard",
    note: "Den enda produkten i jämförelsen som reagerar på två saker: både att fönstret öppnas och att rutan krossas. Det senare betyder att larmet går innan någon tagit sig in, till skillnad från en ren magnetkontakt.\n\nButiken tar 105 kronor mot 85 för Nedis motsvarande larm utan glaskrossensorn, alltså tjugo kronor för den extra utlösaren. Ljudnivån är samma 85 dB.",
  },
];

export const SOURCES_BY_HREF: Record<string, Source[]> = {
  "/wifi-repeater": WIFI_REPEATER_SOURCES,
  "/espressomaskin": ESPRESSOMASKIN_SOURCES,
  "/fonsterlarm": FONSTERLARM_SOURCES,
  "/fritos": FRITOS_SOURCES,
  "/dorr-och-fonstersensor": DORR_OCH_FONSTERSENSOR_SOURCES,
  "/smoothiemixer": SMOOTHIEMIXER_SOURCES,
  "/airfryer": AIRFRYER_SOURCES,
  "/eltandborste": ELTANDBORSTE_SOURCES,
  "/pizzaugn": PIZZAUGN_SOURCES,
  "/blender": BLENDER_SOURCES,
  "/stavmixer": STAVMIXER_SOURCES,
  "/skaftdammsugare": SKAFTDAMMSUGARE_SOURCES,
  "/babyvakt": BABYVAKT_SOURCES,
  "/mjolkskummare": MJOLKSKUMMARE_SOURCES,
  "/powerstation": POWERSTATION_SOURCES,
  "/iphone-fodral": IPHONE_FODRAL_SOURCES,
  "/slackspray": SLACKSPRAY_SOURCES,
  "/smartwatch": SMARTWATCH_SOURCES,
  "/bluetooth-hogtalare": BLUETOOTH_HOGTALARE_SOURCES,
  "/iphone-skarmskydd": IPHONE_SKARMSKYDD_SOURCES,
  "/iphone-skal": IPHONE_SKAL_SOURCES,
  "/galaxy-s26-skal": GALAXY_S26_SOURCES,
  /* Delade källor: modellfrågan, magnetfrågan och konkurrenten gäller båda
     sidorna, och Skal-mans guide behandlar skal och fodral i samma text. */
  "/galaxy-s26-fodral": GALAXY_S26_FODRAL_SOURCES,
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
  "/rorelsevakt-utomhus": RORELSEVAKT_UTOMHUS_SOURCES,
  "/utomhustimer": UTOMHUSTIMER_SOURCES,
  "/utrymningsstege": UTRYMNINGSSTEGE_SOURCES,
  "/vattenlarm": VATTENLARM_SOURCES,
};

/** Samma källa kan citeras av flera kategorier. Räkna den en gång. */
function dedupeByUrl(sources: Source[]): Source[] {
  return sources.filter(
    (s, i, all) => all.findIndex((x) => x.url === s.url) === i,
  );
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
