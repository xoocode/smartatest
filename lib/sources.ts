/**
 * External test citations.
 *
 * We do not run a physical lab. Our scores come from specifications, published
 * measurements and independent tests, so those tests have to be named and
 * linked — an unsourced claim of measurement is the thing we are deliberately
 * not doing. Every URL here was verified to return 200 at its final location;
 * cite the resolved URL, not the one a competitor happens to link.
 */

export type Source = {
  publisher: string;
  title: string;
  url: string;
  /** Publication or last-update date of the cited test, when stated. */
  date?: string;
  /** Market the test was run in, so a reader can weigh it. */
  market?: "SE" | "NO" | "UK" | "US";
  /** What this source contributes that we did not measure ourselves. */
  note?: string;
  /**
   * test     — an independent product test, counted in the collation summary
   * standard — a spec body or authority, cited for definitions not verdicts
   */
  kind?: "test" | "standard";
};

export const MARKET_LABELS: Record<NonNullable<Source["market"]>, string> = {
  SE: "Sverige",
  NO: "Norge",
  UK: "Storbritannien",
  US: "USA",
};

/**
 * Derived stats for the "what we read" panel. Computed from the array rather
 * than authored, because "vi har läst 14 experttester" is exactly the kind of
 * claim that rots the moment someone edits the list and forgets the prose.
 */
export function sourceSummary(sources: Source[]) {
  const tests = sources.filter((s) => s.kind !== "standard");
  const publishers = [...new Set(tests.map((s) => s.publisher))];
  const markets = [...new Set(tests.flatMap((s) => (s.market ? [s.market] : [])))];
  return {
    testCount: tests.length,
    publishers,
    markets,
    marketLabels: markets.map((m) => MARKET_LABELS[m]),
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
    note: "Svensk myndighet. Gäller vad du får koppla själv och vad som kräver behörig elektriker.",
  },
  {
    publisher: "Connectivity Standards Alliance",
    title: "Matter: specifikation och certifiering",
    url: "https://csa-iot.org/all-solutions/matter/",
    kind: "standard",
    note: "Organisationen som äger Matter-standarden och certifieringen.",
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
    kind: "standard",
    note: "Utser Housegard Luma till bästa brandvarnare. Jämför sammankopplingsbarhet, uppkoppling, frekvens, storlek, batteri och garanti på åtta modeller. Citeras som standard och inte som test av två skäl: de beskriver ingen egen praktisk provning, och de länkar ut via Adtraction till Brandvarnare.se och Kjell, alltså samma monetisering som vår egen. De rankar dessutom Google Nest Protect, som Google lade ner i mars 2025.",
  },
  {
    publisher: "Testix",
    title: "Brandvarnare bäst i test",
    url: "https://testix.se/test/brandvarnare",
    date: "2026",
    market: "SE",
    kind: "standard",
    note: "Enda svenska sidan som publicerar en viktning: 30 procent detektionsförmåga, 20 ljudstyrka, 20 installation, 15 smarta funktioner, 15 prisvärde. Utser också Housegard Luma till vinnare. Påstår egna inköp och att de mätt hur snabbt varnaren reagerar på rök, men publicerar inget mätvärde, och sidan saknar strukturerad data helt.",
  },
  {
    publisher: "Testexperterna",
    title: "Brandvarnare bäst i test",
    url: "https://testexperterna.se/brandvarnare",
    date: "2026",
    market: "SE",
    kind: "standard",
    note: "Ärligast formulerade av de svenska jämförelserna: de säger rakt ut att de sammanställer expertutlåtanden, användaromdömen och pris i stället för att påstå eget test. Samtidigt märker de upp ett aggregerat kundbetyg på 5 av 1 recension och ett erbjudande som pekar på deras egen sida i stället för butikens.",
  },
  {
    publisher: "Brandskyddskollen",
    title: "Bästa seriekopplade brandvarnare",
    url: "https://brandskyddskollen.se/basta-seriekopplade-brandvarnare/",
    date: "2026",
    market: "SE",
    kind: "standard",
    note: "Den enda svenska sidan som byggt sin jämförelse runt sammankoppling, alltså samma axel som vi väger tyngst. Affiliatefinansierad via Adtraction.",
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
    kind: "standard",
    note: "En av två svenska sidor som gjort en egen jämförelse just för smarta brandvarnare. Affiliatefinansierad via Adtraction och Amazon, och redovisar ingen provning. Citeras för vad den utsett, inte som test.",
  },
  {
    publisher: "Smarta Hem-test",
    title: "Bästa brandvarnaren för smarta hem",
    url: "https://www.smartahemtest.se/test/basta-brandvarnaren-till-ditt-smarta-hem",
    date: "2026",
    market: "SE",
    kind: "standard",
    note: "Den andra svenska sidan med en egen smart-jämförelse, och den enda konkurrent vi mätt som märker upp skribentens meriter i schemat. Affiliatefinansierad. Redovisar ingen provning.",
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
    kind: "standard",
    note: "Svensk jämförelsesajt, affiliatefinansierad via Adtraction. Refererar Räddningsverket, Konsumentverket och SVEBRA:s samstämmiga rekommendation om 6 kilos pulversläckare. Citeras för den hänvisningen, inte som test.",
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
 * .agent/research-brandfilt-verifiering.md.
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
    url: "https://www.mcf.se/sv/amnesomraden/skydd-mot-olyckor-och-farliga-amnen/stod-till-kommunal-raddningstjanst/brandskydd-och-forebyggande/brandvarnare-pulverslackare-och-brandfilt-i-bostader---for-dig-som-ger-rad/",
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
    note: "Amerikanska arbetsmiljömyndighetens sammanställning av vad olika halter gör med en människa och hur lång tid det tar. Ligger bakom verktyget CO-halt och larmgräns. Talen gäller friska vuxna, vilket står utskrivet i verktyget, eftersom barn, gravida, äldre och hjärt- eller lungsjuka påverkas vid lägre halter och tidigare. Samstämmig med publicerade tabeller från tillverkare och amerikanska räddningstjänster.",
  },
  {
    publisher: "Myndigheten för samhällsskydd och beredskap",
    title: "Kolmonoxid och förgiftningsrisker i bostäder",
    url: "https://www.msb.se/sv/amnesomraden/skydd-mot-olyckor-och-farliga-amnen/brandskydd/",
    market: "SE",
    kind: "standard",
    note: "Myndighetens underlag om brandskydd i bostäder. Ligger bakom avsnittet om vem som faktiskt behöver en kolmonoxidvarnare, alltså hem med förbränning: braskamin, gasol, oljepanna eller garage under bostaden.",
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
];
