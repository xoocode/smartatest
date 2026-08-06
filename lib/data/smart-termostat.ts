import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { SMART_TERMOSTAT } from "@/lib/test-pages";

/**
 * Smart termostat. Underlag i .agent/research/smart-termostat.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, artikelnummer, GTIN,
 * adapterlistor, batteri- och frostskyddsuppgifter och tillverkarnas
 * besparingspåståenden. Läst hos Kjell, hos Proshop eller på tillverkarens egen
 * sida, daterat per uppgift i kommentarerna nedan.
 *
 * **Citat:** Ljud & Bilds och Stiftung Warentests omdömen är återgivna med
 * deras egna ord och länkade i lib/sources.ts.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte skruvat på någon
 * termostat, inte mätt någon förbrukning och inte jämfört någon elräkning.
 *
 * ## Avgränsning
 *
 * Bara radiatortermostater, alltså de som skruvas på ventilen på ett
 * vattenburet element. Rumstermostat för elvärme, infraröd styrning av
 * luftvärmepump och framledningsstyrning löser andra problem och ligger bland
 * de övervägda. Beslut av användaren 2026-08-04.
 *
 * ## Fyndet: procentsatsen
 *
 * | Vem | Höll i den | Tal |
 * |---|---|---|
 * | Ljud & Bild, tre modeller | ja | inget, av princip |
 * | Stiftung Warentest, elva i labb | ja | bakom betalvägg |
 * | Fibaro | nej | 42 %, fotnot "research by Fibar Group S.A." |
 * | Netatmo | nej | 37 %, egen utbildningsbok, studie av Centrale-Supélec |
 * | Danfoss | nej | 30 % egen sida, 23 % i butiken |
 * | tado | nej | 28 %, och 22 % som eget användarsnitt |
 * | Aqara, Eve, SONOFF, Schneider | nej | inget tal |
 *
 * ⚠️ **Raden `Angiven besparing` får aldrig fyllas i åt någon.** Den står i
 * ALDRIG_BEDOMD i lib/spec-schema.mjs. Aqara anger ingenting, och det ska
 * synas som ingenting. Låna heller aldrig ett tal från en systermodell.
 *
 * ⚠️ **Besparingen påverkar inget betyg.** Användarbeslut 2026-08-04, av samma
 * skäl som igelkotten på /robotgrasklippare: det finns inga provresultat per
 * modell, och ett betyg på ett påstående mäter butikens copywriting.
 *
 * ## Ventilfattningarna, och den dyra läxan 2026-08-06
 *
 * Kriteriet hette `Angiven ventilpassning` och betygsatte om tillverkaren
 * publicerade en adapterlista. Det rankade säljarens dokumentation, inte varan,
 * och det gjorde tre fel som stod i tabellen i två dygn:
 *
 * - **SONOFF** låg på "adaptrar för de flesta, ingen lista" och betyg 2,5.
 *   SONOFF publicerar en kompatibilitetsguide över **41 ventilmärken** på sin
 *   egen domän, med adaptern angiven per märke: M28, CAL, GIA, RA, RAV, RAVL
 *   plus 20 märken som går direkt på M30x1,5.
 * - **Fibaro** låg på "anger inga ventiler alls" och betyg 1,5. Sidan 3 i
 *   Fibaros egen bruksanvisning: "to be installed on three types of valves:
 *   M30 x 1.5, Danfoss RTD-N and Danfoss RA-N".
 * - **Danfoss Eco** låg på "RA och M30". Danfoss eget produktregister för
 *   artikel 014G1115 anger **M30, RA, RAV, RAVL**.
 *
 * Alla tre gick att hämta ur ett dokument som butiken eller tillverkaren redan
 * länkade. Kriteriet räknar nu fattningar, se `ventil` i lib/test-pages.ts.
 *
 * ⚠️ **Danfoss två artikelnummer**, lästa i Danfoss produktregister 2026-08-06:
 * 014G2460 täcker M30, RA, RAV och RAVL för 760 kr, medan 014G2420 täcker M30
 * och RA för 890. Den dyrare passar färre ventiler.
 *
 * ⚠️ **Warentest fann att en av elva föll på frostskyddsprovet.** Vilken ligger
 * bakom betalvägg. Skriv aldrig ett namn där.
 */

export const PRICE_CHECKED = "2026-08-04";

const KJELL = "Kjell & Company";
const PROSHOP = "Proshop";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "aqara-radiator-thermostat-w600",
    name: "Aqara Radiator Thermostat W600",
    shortName: "Aqara W600",
    brand: "Aqara",
    image: productImage(SMART_TERMOSTAT.slug, "aqara-radiator-thermostat-w600"),
    tagline: "Passar sju ventilfattningar direkt ur lådan, och hörs inte.",
    scores: {
      kravs: 3.5,
      /* 7 fattningar, sex adaptrar i lådan. Aqara, förpackningsinnehåll,
         läst 2026-08-06. Var 4,5 när kriteriet mätte publicering. */
      ventil: 5,
      oberoende: 4,
      provning: 4.5,
      prisvarde: 4,
    },
    price: 559,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/aqara-termostatventil-w600-vit-p56576",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för sovrum och barnrum",
    pros: [
      "Går på sju fattningar med adaptrarna i lådan: M30x1,5 plus RA, RAV, RAVL, Caleffi, Giacomini och M28x1,5",
      "Under 30 dB, och Ljud & Bild kallade gången helt ljudlös",
      "Slår på värmen under 5 grader och släpper vid 8, så rören klarar en kall vecka i ett tomt hus",
      "Talar både Thread och Zigbee, så den fungerar i de flesta Matter-hem",
      "Två års batteritid på två AA-celler, som följer med",
    ],
    cons: [
      "Kräver en Matter Border Router eller en Aqara-hubb, som inte ingår",
      "Känner inte av ett öppet fönster själv, utan behöver en separat fönstersensor",
      "Går inte att styra från Aqaras app och Google Home samtidigt över Thread, enligt Ljud & Bild",
    ],
    specs: [
      { label: "Pris", value: "559 kr", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value: "7: M30x1,5 plus RA, RAV, RAVL, Caleffi, Giacomini, M28x1,5",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Matter Border Router eller Aqara-hubb",
        highlight: true,
      },
      { label: "Protokoll", value: "Thread och Zigbee", highlight: true },
      { label: "Abonnemang", value: "Nej", highlight: true },
      { label: "Batteri", value: "2 x AA, medföljer", highlight: true },
      { label: "Angiven besparing", value: "Ej angiven", highlight: true },
      { label: "Matter", value: "Ja" },
      { label: "Frostskydd", value: "Ja, värmer under 5 °C, släpper vid 8 °C" },
      { label: "Öppet fönster", value: "Ja, men kräver separat fönstersensor" },
      { label: "Batteritid", value: "Upp till 2 år" },
      { label: "Ljud", value: "Under 30 dB" },
      { label: "Artikelnummer", value: "56576" },
    ],
    verdict:
      "Aqara W600 går på sju ventilfattningar och kostar 559 kronor. Sex adaptrar ligger i lådan, RA, RAV, RAVL, Caleffi, Giacomini och M28x1,5, utöver den egna M30x1,5-gängan.\n\nBredden gör att du kan beställa innan du krupit bakom elementet med ett skjutmått. Har huset blandade ventiler, vilket det ofta har när radiatorer bytts vid olika tillfällen, är W600 den enda här som täcker både den nordiska Danfoss-familjen och de italienska klämfattningarna ur en och samma förpackning.\n\n**Den går under 30 dB.** Ljud & Bild provade den i februari 2026 och kallade gången helt ljudlös, medan Netatmos termostat i samma test hörs när motorn justerar. En apparat som väcker någon klockan fyra på morgonen skruvas ner för hand och slutar vara smart. Frostskyddet slår på värmen under 5 grader och släpper vid 8, vilket är precis den funktion Stiftung Warentest såg en av elva modeller missa, med spruckna rör som följd.\n\nTvå saker kostar. Den behöver en Matter Border Router eller en Aqara-hubb, så har du ingen sådan hemma är 559 kronor inte hela notan. Och den känner inte av ett öppet fönster själv utan vill ha en separat sensor, medan de flesta konkurrenterna märker temperaturfallet på egen hand.\n\nKöp den. Har du redan en HomePod, en Apple TV, en Nest-högtalare eller en Aqara-hubb i huset finns ingen anledning att titta vidare. Saknar du hubb helt är SONOFF TRVZB för 361 kronor plus en Zigbee-sticka den billigare vägen till nästan samma sak.",
  },
  {
    id: "aqara-radiator-thermostat-e1",
    name: "Aqara Radiator Thermostat E1",
    shortName: "Aqara E1",
    brand: "Aqara",
    image: productImage(SMART_TERMOSTAT.slug, "aqara-radiator-thermostat-e1"),
    tagline: "Klarar hela Danfoss-familjen för 549 kronor.",
    scores: {
      kravs: 3,
      /* 4 fattningar: M30x1,5 plus RA, RAV, RAVL. Aqara, förpackningsinnehåll,
         läst 2026-08-06. Var 5,0 när kriteriet mätte publicering. */
      ventil: 4,
      oberoende: 3.5,
      prisvarde: 4,
    },
    price: 549,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/aqara-e1-smart-termostat-for-element-p52051",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 9, checkedAt: PRICE_CHECKED },
    superlative: "Billigaste vägen in i Aqara",
    pros: [
      "Adaptrar för M30x1,5 samt Danfoss RA, RAV och RAVL ligger i lådan, alltså de fattningar de flesta svenska element har",
      "Fungerar inte på enrörssystem, och är den enda som säger det innan du beställer fyra stycken",
      "549 kronor, näst billigast av dem vi rankar",
      "Upp till ett års batteritid",
      "Ingen molntjänst och ingen månadskostnad",
    ],
    cons: [
      "Kräver en Aqara-hubb för fjärrstyrning, som inte ingår",
      "För automatisk värmejustering krävs dessutom separata Aqara-sensorer",
      "Tre fattningar färre än Aqara W600, som kostar 10 kronor mer",
    ],
    specs: [
      { label: "Pris", value: "549 kr", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value: "4: M30x1,5 plus RA, RAV, RAVL. Ej manuella, RTL eller enrörssystem",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Aqara-hubb",
        highlight: true,
      },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Abonnemang", value: "Nej", highlight: true },
      { label: "Batteri", value: "2 x AA", highlight: true },
      { label: "Angiven besparing", value: "Ej angiven", highlight: true },
      { label: "Matter", value: "Via uppdatering av Aqaras hubbar" },
      { label: "Frostskydd", value: "Ja, via inställd lägstatemperatur" },
      { label: "Öppet fönster", value: "Ja" },
      { label: "Batteritid", value: "Upp till 1 år" },
      { label: "Artikelnummer", value: "52051" },
    ],
    verdict:
      "Aqara E1 kostar 549 kronor och kommer med adaptrar för M30x1,5 samt Danfoss RA, RAV och RAVL. Fyra fattningar, alltså hela den familj som sitter på de allra flesta svenska element, för tio kronor mindre än storasystern.\n\n**Den fungerar inte på manuella ventiler, returtemperaturbegränsare eller enrörssystem**, och det är den enda produkten på sidan där du får veta det innan paketet är öppnat. Enrörssystem sitter i en stor del av flerbostadsbeståndet från 1960- och 70-talen, och där kostar en felbeställning fyra termostater i stället för en.\n\nDen behöver en Aqara-hubb för att nås utifrån, så tre rum landar över 1 647 kronor. Vill du dessutom att den ska justera värmen automatiskt efter rummets temperatur krävs separata Aqara-sensorer, och då börjar en färdig W600 se billigare ut än den ser ut på hyllan.\n\nHar du redan Aqara hemma är E1 rätt val och tio kronor billigare än W600. Har du inte det: lägg de tio kronorna, ta W600 och få tre fattningar till, tystare gång och ett frostskydd med tal i.",
  },
  {
    id: "eve-thermo-comfort-set",
    name: "Eve Thermo Comfort Set (Matter)",
    shortName: "Eve Thermo",
    brand: "Eve Systems",
    image: productImage(SMART_TERMOSTAT.slug, "eve-thermo-comfort-set"),
    tagline: "Värmen styrs utan konto, moln eller abonnemang.",
    scores: {
      kravs: 3.5,
      ventil: 4,
      oberoende: 5,
      provning: 4,
      prisvarde: 2.5,
    },
    price: 1890,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Eve-Thermo-Comfort-Set-Matter/3297390",
    priceCheckedAt: PRICE_CHECKED,
    award: "premium",
    superlative: "Bäst utan konto och moln",
    pros: [
      "Varken konto, registrering, molntjänst eller abonnemang, så den fungerar lika bra den dag Eve slutar finnas",
      "Ljud & Bild: smidig och tyst hantering, full integritet",
      "Adaptrar för Danfoss RA, RAV och RAVL ligger i lådan, plus den egna M30-gängan",
      "Valve Protection håller ventilen öppen mot frost och motar kalkbeläggning",
      "Thread och Matter, så den fungerar över plattformsgränserna",
    ],
    cons: [
      "1 890 kronor för två termostater, alltså 945 kronor styck",
      "Kräver en Matter-controller och en Thread Border Router som inte ingår",
      "Säljs inte styckvis i svensk handel, så tre rum blir två paket och fyra termostater",
    ],
    specs: [
      { label: "Pris", value: "1 890 kr för 2 st", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value: "4: M30x1,5 plus Danfoss RA, RAV och RAVL",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Matter-controller och Thread Border Router",
        highlight: true,
      },
      { label: "Protokoll", value: "Thread", highlight: true },
      { label: "Abonnemang", value: "Nej, uttryckligen inget", highlight: true },
      { label: "Batteri", value: "2 x AA, utbytbara", highlight: true },
      { label: "Angiven besparing", value: "Ej angiven", highlight: true },
      { label: "Matter", value: "Ja" },
      { label: "Frostskydd", value: "Ja, Valve Protection" },
      { label: "Öppet fönster", value: "Ja" },
      { label: "GTIN", value: "4260195392618" },
    ],
    verdict:
      "Eve Thermo styr värmen utan konto, utan registrering och utan molntjänst, och kostar 1 890 kronor för två. Den talar Thread och Matter, alltså samma språk som resten av ditt hem oavsett vem som byggt det.\n\nDet oberoendet är inte en känsla utan en konsekvens: ingenting i den här termostaten slutar fungera den dag Eve läggs ner, byter affärsmodell eller flyttar en funktion bakom en avgift. En konkurrent på den här sidan har redan gjort det sista. Ljud & Bild provade Eve i februari 2026 och beskrev hanteringen som smidig och tyst, med full integritet.\n\nAdaptrarna i lådan täcker Danfoss RA, RAV och RAVL utöver M30-gängan, alltså fyra fattningar. **Valve Protection öppnar ventilen med jämna mellanrum**, vilket både håller frosten borta och hindrar kalken från att låsa fast spindeln, och det senare är skälet till att gamla termostatventiler kärvar efter en sommar.\n\nPriset håller den från toppen. 945 kronor per termostat är nästan dubbelt mot Aqaras 559, den säljs inte styckvis i svensk handel, och en Matter-controller plus en Thread Border Router måste finnas i huset. Tre rum blir två paket, fyra termostater och 3 780 kronor.\n\nHar du en HomePod, en Apple TV eller en Home Assistant och tänker äga din värmestyrning utan att ha konto hos någon: köp den. Räknar du kronor per rum gör Aqara W600 samma jobb för 559.",
  },
  {
    id: "sonoff-trvzb",
    name: "SONOFF TRVZB Zigbee 3.0",
    shortName: "SONOFF TRVZB",
    brand: "SONOFF",
    image: productImage(SMART_TERMOSTAT.slug, "sonoff-trvzb"),
    tagline: "Billigast här, och passar lika många ventiler som de dyraste.",
    scores: {
      kravs: 4,
      /* 7 fattningar: M30x1,5 direkt plus adaptrarna RA, RAV, RAVL, CAL, GIA
         och M28. SONOFFs kompatibilitetsguide över 41 ventilmärken namnger
         adaptrarna, sonoff.tech, läst 2026-08-06.

         Att de ligger i lådan är bekräftat 2026-08-06 i tillverkarens egen
         listningstext på Amazon.se: "(Adaptrar RA/RAV/RAVL/CAL/GIA/M28 ingår)",
         och hos expert4house: "Include gli adattatori RA/RAV/RAVL/CAL/GIA/M28".
         Samma sex adaptrar som guiden namnger, alltså samma sju fattningar som
         Aqara W600 och tado X.

         ⚠️ Stod på 4,0 fram till 2026-08-06 med motiveringen att
         förpackningsinnehållet inte gick att belägga. Det var ett avdrag för
         vad vi inte visste, inte för vad termostaten gör, och sidans egen
         brödtext räknade redan SONOFF till de tre som klarar sju. Se
         lib/corrections.ts. */
      ventil: 5,
      /* 4,5 → 4,0: Philips, IKEA och Fritzbox gateways stöds inte, trots
         Zigbee 3.0. SONOFFs egen dokumentation, läst 2026-08-06. */
      oberoende: 4,
      prisvarde: 5,
    },
    price: 361,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Sonoff-Intelligent-TRVZB-Zigbee-30-Thermostatic-Head/3277532",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för hela huset på en gång",
    pros: [
      "361 kronor, billigast av dem vi rankar, så fem element kostar mindre än två tado",
      "Går på sju fattningar: M30x1,5 plus M28x1,5, Caleffi, Giacomini och Danfoss RA, RAV och RAVL",
      "Vilken Zigbee 3.0-hubb som helst duger, även en USB-sticka för ett par hundralappar",
      "Frostläge med en tröskel du sätter själv, mot rör som fryser och spricker",
      "Känner av öppet fönster utan extra sensor",
    ],
    cons: [
      "Philips, IKEA och Fritzbox gateways fungerar inte, trots Zigbee 3.0",
      "Går på tre AA-celler, och de ligger inte i lådan",
      "Kräver en Zigbee-hubb eller en USB-sticka som inte ingår",
    ],
    specs: [
      { label: "Pris", value: "361 kr", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value: "7: M30x1,5 plus RA, RAV, RAVL, Caleffi, Giacomini, M28x1,5",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Zigbee 3.0-hubb, dock ej Philips, IKEA eller Fritzbox",
        highlight: true,
      },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Abonnemang", value: "Nej", highlight: true },
      { label: "Matter", value: "Nej, Zigbee via hubb" },
      { label: "Batteri", value: "3 x AA, medföljer ej", highlight: true },
      { label: "Angiven besparing", value: "Ej angiven", highlight: true },
      { label: "Frostskydd", value: "Ja, med tröskel du ställer själv" },
      { label: "Öppet fönster", value: "Ja" },
      { label: "GTIN", value: "6920075740950" },
    ],
    verdict:
      "SONOFF TRVZB kostar 361 kronor och går på sju ventilfattningar. Det är kategorins lägsta pris med samma passform som termostater för tre gånger pengarna.\n\nAdaptrarna täcker M28x1,5, Caleffi, Giacomini och hela Danfoss-familjen utöver M30-gängan, tillsammans 41 ventilmärken från Boss och Comap till Heimeier och Oventrop. **Ska du göra fler än två element är det här den enda vägen under 2 000 kronor**, och skillnaden mot tado är fem termostater i stället för en och en halv.\n\nDen är också minst inlåst av allihop. Den talar ren Zigbee 3.0 och fungerar i Home Assistant, i SmartThings eller bakom en USB-sticka för ett par hundralappar, så den fortsätter vara en fungerande termostat även om SONOFF slutar finnas. Frostläget har en tröskel du sätter själv, och öppet fönster känner den av utan extra sensor.\n\nTre saker drar ner. Philips, IKEA och Fritzbox gateways fungerar inte trots Zigbee 3.0, så en Dirigera i hallen hjälper dig inte här. Den går på tre AA-celler som inte ligger i lådan. Och ingen redaktion har provat den, så den saknar det yttre omdöme fyra av modellerna här har.\n\nKör du redan Zigbee och ska sätta termostater på fyra eller fem element: köp den, och lägg mellanskillnaden på en extra. Ska du bara göra sovrummet och vill ha ett provat köp är Aqara W600 värd sina 200 kronor mer.",
  },
  {
    id: "danfoss-eco-bluetooth",
    name: "Danfoss Eco Bluetooth",
    shortName: "Danfoss Eco",
    brand: "Danfoss",
    image: productImage(SMART_TERMOSTAT.slug, "danfoss-eco-bluetooth"),
    tagline: "Enda termostaten som inte kräver något köpt utöver sig själv.",
    scores: {
      kravs: 2,
      /* 4 fattningar: M30, RA, RAV, RAVL. Danfoss produktregister, artikel
         014G1115, EAN 5702425245329, läst 2026-08-06. Var 3,5 på en tidigare
         läsning som bara fann RA och M30. */
      ventil: 4,
      oberoende: 4.5,
      prisvarde: 4.5,
    },
    price: 428,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Danfoss-Eco-Electronic-Radiator-Thermostat/2898649",
    priceCheckedAt: PRICE_CHECKED,
    award: "editor",
    superlative: "Bäst utan hubb, sämst på avstånd",
    pros: [
      "Kräver varken hubb, brygga eller konto, så 428 kronor är hela notan även för det första rummet",
      "Går på fyra fattningar: M30 plus Danfoss RA, RAV och RAVL",
      "Under 30 dB och ett handvred som fungerar även när batteriet dör",
      "Två AA-celler räcker 2,5 år, längst batteritid av dem som går på engångsbatterier",
      "Känner av öppet fönster utan extra sensor",
    ],
    cons: [
      "Bluetooth, så den går inte att nå när du inte är hemma",
      "Ingen integration med Matter, Google, Alexa eller Home Assistant",
      "Vill du styra värmen från tåget är Danfoss Ally samma märke med Zigbee, för 332 kronor mer",
    ],
    specs: [
      { label: "Pris", value: "428 kr", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value: "4: M30 plus Danfoss RA, RAV och RAVL",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Ingenting, men når bara telefonen i rummet",
        highlight: true,
      },
      { label: "Protokoll", value: "Bluetooth", highlight: true },
      { label: "Abonnemang", value: "Nej", highlight: true },
      { label: "Batteri", value: "2 x AA", highlight: true },
      { label: "Angiven besparing", value: "Upp till 30 %", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Öppet fönster", value: "Ja" },
      { label: "Batteritid", value: "2,5 år" },
      { label: "Ljud", value: "Under 30 dB" },
      { label: "GTIN", value: "5702425245329" },
    ],
    verdict:
      "Danfoss Eco kostar 428 kronor och är den enda termostaten här som inte kräver något köpt utöver sig själv. Ingen hubb, ingen brygga, inget konto och ingen molntjänst: du styr den från telefonen när du står i rummet, lägger ett schema som sedan körs inne i termostaten, och sedan är det klart.\n\nDet gör den till det billigaste första rummet i hela jämförelsen. En SONOFF för 361 kronor kostar 361 plus en Zigbee-sticka; den här kostar 428 och punkt. **Adaptrarna täcker M30 plus Danfoss RA, RAV och RAVL**, alltså lika många fattningar som Eve för en femtedel av priset, och Danfoss har tillverkat radiatorventiler i nästan hundra år, så deras egna sitter i en stor del av det svenska beståndet.\n\nDen är också byggd för att stå kvar. Två AA-celler räcker 2,5 år, den går under 30 dB, och handvredet fungerar även när batteriet dött. Det sista låter litet tills man har stått i ett kallt gästrum en söndagkväll i januari.\n\nBluetooth är gränsen. Du kan inte höja värmen från tåget, och huset sänker sig inte självt när resan blir tre dagar längre. Den funktionen går inte heller att köpa till, och den är hela skälet till att många köper en smart termostat över huvud taget.\n\nRedaktionens val till gästrummet, källaren och fritidshuset, alltså rum där ett schema räcker och ingen ska nås utifrån. Ska du styra värmen på distans är Danfoss Ally samma märke med Zigbee, för 332 kronor mer.",
  },
  {
    id: "danfoss-ally-014g2460",
    name: "Danfoss Ally Radiatortermostat (014G2460)",
    shortName: "Danfoss Ally",
    brand: "Danfoss",
    image: productImage(SMART_TERMOSTAT.slug, "danfoss-ally-014g2460"),
    tagline: "Den billigare av Danfoss två artiklar, och den passar fler ventiler.",
    scores: {
      kravs: 2.5,
      /* 4 fattningar: M30, RA, RAV, RAVL. Danfoss produktregister, artikel
         014G2460, EAN 5702425245015, läst 2026-08-06. */
      ventil: 4,
      oberoende: 3.5,
      provning: 3.5,
      prisvarde: 3,
    },
    price: 760,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Danfoss-ally-radiator-thermostat/2884327",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för hus med Danfoss-ventiler",
    pros: [
      "Går på fyra fattningar: M30 plus Danfoss RA, RAV och RAVL",
      "130 kronor billigare än syskonartikeln, som passar två ventiltyper färre",
      "Labbprovad av Stiftung Warentest bland elva modeller",
      "Zigbee 3.0-certifierad, så den kan anslutas till andra hubbar än Danfoss egen",
      "Under 30 dB, och två AA-celler räcker 2,5 år",
    ],
    cons: [
      "Kräver Danfoss Ally Gateway för fjärrstyrning, som inte ingår",
      "760 kronor styck, alltså mer än dubbelt mot SONOFF med samma Zigbee och fler fattningar",
      "Bär två olika besparingstal, 30 procent på Danfoss egen sida och 23 i butikstexten",
    ],
    specs: [
      { label: "Pris", value: "760 kr", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value: "4: M30 plus Danfoss RA, RAV och RAVL",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Danfoss Ally Gateway",
        highlight: true,
      },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Abonnemang", value: "Nej", highlight: true },
      { label: "Matter", value: "Nej, Zigbee via hubb" },
      { label: "Batteri", value: "2 x AA", highlight: true },
      { label: "Angiven besparing", value: "Upp till 30 %", highlight: true },
      { label: "Öppet fönster", value: "Ja" },
      { label: "Batteritid", value: "2,5 år" },
      { label: "Ljud", value: "Under 30 dB" },
      { label: "GTIN", value: "5702425245015" },
      { label: "Artikelnummer", value: "014G2460" },
    ],
    verdict:
      "Danfoss Ally kostar 760 kronor och går på fyra fattningar: M30 plus Danfoss RA, RAV och RAVL. Det är den av Danfoss två artiklar du ska ha, och skillnaden mot den andra är 130 kronor och två ventiltyper.\n\nSkälet att välja märket alls är att ventilen under termostaten ofta redan är en Danfoss. De har tillverkat radiatorventiler i nästan hundra år och sitter i en stor del av det svenska beståndet, vilket gör passformen till deras starkaste kort. Den är Zigbee 3.0-certifierad, så den är inte inlåst i Danfoss egen app för alltid, och Stiftung Warentest hade den i labbet bland elva modeller.\n\nGatewayen är vad som drar ner. **För att nå termostaten hemifrån krävs Danfoss Ally Gateway, som inte följer med lösnumret.** Tre rum kostar 2 280 kronor plus brygga, vilket är mer än dubbelt mot tre SONOFF med en USB-sticka, och SONOFF bär dessutom tre fattningar till.\n\nHar du Danfoss-ventiler på elementen och vill ha ett märke som funnits längre än standarden är den ett hederligt köp. Kontrollera bara att det står 014G2460 på kartongen, och räknar du kronor per rum gör SONOFF samma jobb för hälften.",
  },
  {
    id: "netatmo-smart-radiator-thermostat",
    name: "Netatmo Smart Radiator Thermostat",
    shortName: "Netatmo",
    brand: "Netatmo",
    image: productImage(
      SMART_TERMOSTAT.slug,
      "netatmo-smart-radiator-thermostat",
    ),
    tagline: "Tio ventilfattningar, fler än någon annan här klarar.",
    scores: {
      kravs: 2,
      /* 6 fattningar i lådan, 4 till i tiopack. Netatmos egen utbildningsbok
         för återförsäljare, läst 2026-08-06. Var 5,0 när kriteriet mätte
         publicering; 4,5 nu eftersom fyra av tio kostar extra. */
      ventil: 4.5,
      oberoende: 2.5,
      provning: 4,
      prisvarde: 3,
    },
    price: 887,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Netatmo-Additional-Smart-Radiator-Thermostat/2574967",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för ovanliga ventiler",
    pros: [
      "Sex adaptrar i lådan: M30x1,5, M30x1, M28x1,5, Giacomini, Danfoss RA och RAVL",
      "Fyra fattningar till finns att köpa, bland dem Vaillant, som ingen annan här når över huvud taget",
      "Ljud & Bild: fungerar precis som tänkt, informativ och lättnavigerad app",
      "Två AA-celler följer med och räcker omkring 2 år",
      "Labbprovad av Stiftung Warentest",
    ],
    cons: [
      "Ljud & Bild: elmotorn hörs när temperaturen justeras, så den passar sämre i ett sovrum",
      "Ljud & Bild: två appar till samma produkt gör installationen omständlig",
      "Kräver Netatmos relä, som bara ingår i startpaketet, och hela systemet vilar på Netatmos konto",
      "De fyra extra adaptrarna säljs i tiopack, så en enda udda ventil kostar tio",
    ],
    specs: [
      { label: "Pris", value: "887 kr", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value:
          "10, varav 6 i lådan: M30x1,5, M30x1, M28x1,5, Giacomini, RA, RAVL. Extra: RAV, Vaillant, M28x1, Pettinaroli",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Netatmos relä",
        highlight: true,
      },
      { label: "Protokoll", value: "Radio till relä, relä via wifi", highlight: true },
      { label: "Abonnemang", value: "Nej", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Batteri", value: "2 x AA, medföljer", highlight: true },
      { label: "Angiven besparing", value: "37 %", highlight: true },
      { label: "Frostskydd", value: "Ja, Frost-Guard, 7 °C som standard" },
      { label: "Öppet fönster", value: "Ja" },
      { label: "Batteritid", value: "Cirka 2 år" },
      { label: "GTIN", value: "3700730501958" },
    ],
    verdict:
      "Netatmo når tio ventilfattningar, fler än någon annan termostat på sidan. Sex adaptrar ligger i lådan och fyra går att köpa till, och en av dem är Vaillant, som ingen annan här kommer åt över huvud taget.\n\nDet är hela argumentet för att betala 887 kronor. Har elementen bytts i omgångar, eller sitter det något italienskt eller tyskt i ett rum, är Netatmo den termostat som täcker huset i stället för fyra femtedelar av det. De extra adaptrarna säljs dock i tiopack, så en enda udda ventil kostar tio.\n\nLjud & Bild provade den i februari 2026 och var övervägande positiva: den fungerar precis som tänkt, appen är informativ och lättnavigerad, och det finns ingen månadskostnad. **Elmotorn hörs däremot när temperaturen justeras**, vilket Aqara W600 inte gör, så den passar sämre i ett sovrum än i ett vardagsrum. Två appar till samma produkt gör dessutom installationen omständlig.\n\nDet som håller den nere är reläet. Termostaten talar inte wifi själv utan går via Netatmos relä, som bara följer med startpaketet, och hela systemet vilar på ett Netatmo-konto och deras molntjänst. Slutar den tjänsten finnas är termostaten ett handvred.\n\n328 kronor av prisskillnaden mot Aqara W600 går till fattningar de flesta svenska hem aldrig kommer att använda. Har du en av dem är de värda varenda krona, och då finns inget alternativ på den här sidan.",
  },
  {
    id: "schneider-wiser-cctfr6100z3",
    name: "Schneider Electric Wiser Radiatortermostat",
    shortName: "Wiser",
    brand: "Schneider Electric",
    image: productImage(SMART_TERMOSTAT.slug, "schneider-wiser-cctfr6100z3"),
    tagline: "Hela Danfoss-familjen för under 500 kronor.",
    scores: {
      kravs: 2,
      /* 4 fattningar: M30x1,5 plus Danfoss RA, RAV, RAVL. Schneiders svenska
         produktsida för CCTFR6100Z3, läst 2026-08-06. */
      ventil: 4,
      oberoende: 3,
      prisvarde: 3.5,
    },
    price: 499,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/LK-Wiser-Radiatortermostat-White/3111975",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst i ett Wiser-hem",
    pros: [
      "Går på fyra fattningar: M30x1,5 plus Danfoss RA, RAV och RAVL",
      "499 kronor, tredje billigast av dem vi rankar",
      "Zigbee, och upp till 32 enheter i 16 rum i samma system",
      "IP30, alltså tätare mot damm än de flesta här",
    ],
    cons: [
      "Kräver Wiser-hubb och Wiser-appen, som inte ingår",
      "Bunden till Schneiders eget system, till skillnad från SONOFF som duger till vilken Zigbee-hubb som helst",
      "Säljs hos Proshop under märket LK, vilket gör den svår att söka fram",
      "138 kronor dyrare än SONOFF, som bär tre fattningar till och duger till vilken Zigbee-hubb som helst",
    ],
    specs: [
      { label: "Pris", value: "499 kr", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value: "4: M30x1,5 plus Danfoss RA, RAV och RAVL",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Wiser-hubb",
        highlight: true,
      },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Abonnemang", value: "Nej", highlight: true },
      { label: "Matter", value: "Nej, Zigbee via hubb" },
      { label: "Batteri", value: "2 x AA, ej laddbara", highlight: true },
      { label: "Angiven besparing", value: "Ej angiven", highlight: true },
      { label: "GTIN", value: "3606482072589" },
      { label: "Artikelnummer", value: "CCTFR6100Z3" },
    ],
    verdict:
      "Schneider Wiser kostar 499 kronor och går på fyra fattningar: M30x1,5 plus Danfoss RA, RAV och RAVL. Det räcker till nästan varje svenskt element, och det är den billigaste vägen till den täckningen om du redan har en Wiser-hubb i huset.\n\nSystemet skalar till 32 enheter i 16 rum, vilket är gott om utrymme för ett helt hus, och kapslingen IP30 är tätare mot damm än vad de flesta här anger. Två AA-celler driver den, och Schneider är uttrycklig med att de ska vara vanliga alkaliska: laddbara celler ger för låg spänning för att motorn ska orka.\n\nDen är också en av fyra här som inte utlovar någon besparing alls, vilket i den här kategorin är en dygd snarare än en lucka.\n\n**Öppenheten tar slut vid hubben.** Den talar visserligen Zigbee 3.0, men är byggd för att leva i Wiser-appen och Wisers eget nav. Har du inte redan det är SONOFF 138 kronor billigare, bär tre fattningar till och fungerar bakom vilken Zigbee-hubb som helst.\n\nBygger du med Wiser är den ett självklart val och prisvärd. Gör du inte det finns ingen anledning att börja här. Och letar du efter den i butik: Proshop säljer den under märket LK, medan artikelnumret 3606482072589 leder till Schneiders eget CCTFR6100Z3.",
  },
  {
    id: "tado-smart-radiator-thermostat-x",
    name: "tado Smart Radiator Thermostat X",
    shortName: "tado X",
    brand: "tado",
    image: productImage(
      SMART_TERMOSTAT.slug,
      "tado-smart-radiator-thermostat-x",
    ),
    tagline: "Sju fattningar ur lådan, och ett laddbart batteri i stället för celler.",
    scores: {
      kravs: 3,
      ventil: 5,
      oberoende: 2,
      provning: 3,
      prisvarde: 1.5,
    },
    price: 1229,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/tado-smart-radiator-thermostat-x-1-pack-p52260",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 9, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för nybörjaren",
    pros: [
      "Går på sju fattningar ur lådan: M30 plus RA, RAV, RAVL, M28x1,5, Caleffi och Giacomini",
      "Fungerar med tredjepartshubbar, bland dem IKEA Dirigera, HomePod och Home Assistant",
      "Uppladdningsbart batteri som laddas med USB-C, så du slipper köpa celler i tio år",
      "Ljud & Bild rekommenderar den starkt till den som inte redan har smarta termostater",
    ],
    cons: [
      "Ljud & Bild: de medföljande plastadaptrarna har lossnat så att termostater fallit av med värmen uppskruvad",
      "Delar av automatiken ligger bakom årsavgiften Auto-Assist, som Ljud & Bilds testare kallar en riktig bromskloss",
      "1 229 kronor styck, dyrast av dem vi rankar, plus brygga",
      "Fungerar inte tillsammans med tidigare tado-generationer",
    ],
    specs: [
      { label: "Pris", value: "1 229 kr", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value:
          "7 i lådan: M30, RA, RAV, RAVL, M28x1,5, Caleffi, Giacomini. Ej Vaillant, Oventrop, Ista, Orkli",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Bridge X eller en tredjepartshubb med NAT64",
        highlight: true,
      },
      { label: "Protokoll", value: "Thread och Matter", highlight: true },
      {
        label: "Abonnemang",
        value: "Auto-Assist krävs för delar av automatiken",
        highlight: true,
      },
      {
        label: "Batteri",
        value: "Laddbart, via USB-C",
        highlight: true,
      },
      { label: "Angiven besparing", value: "Upp till 28 %", highlight: true },
      { label: "Matter", value: "Ja" },
      { label: "Batteritid", value: "Cirka 1 år" },
      { label: "Artikelnummer", value: "52260" },
    ],
    verdict:
      "tado X kostar 1 229 kronor styck och går på sju ventilfattningar ur lådan. Batteriet är laddbart och fylls med USB-C, alltså den enda av de elva som inte kräver nya celler var eller vartannat år.\n\nDe två sakerna gör den till en produkt du kan sätta på vilket element som helst och sedan glömma bort. Ljud & Bild rekommenderar den starkt till den som börjar från noll, och det står vi inte emot: kommer du utan hubb, utan app och utan tålamod är tado den mjukaste starten som finns här.\n\n**Sedan kommer priset, och det kommer två gånger.** 1 229 kronor per termostat plus Bridge X för 869 om ingen hubb duger, och därtill en årsavgift: funktionerna som får termostaterna att sköta sig själva ligger numera delvis i tjänsten Auto-Assist. Ljud & Bilds testare kallar den en riktig bromskloss som luktar mer girighet än god service. Tre rum passerar 4 500 kronor innan första vintern, och sedan fortsätter räkningen.\n\nDen tyngsta invändningen är fysisk. Samma testare har använt tado i flera år och skriver att de medföljande plastadaptrarna inte klarat trycket när termostaterna öppnat och stängt värmen, med följden att termostater fallit av och landat på golvet med värmen fullt uppskruvad, ibland på natten. Hans råd är att byta till en metalladapter från en VVS-butik, och det rådet ska du följa.\n\nSka du lösa ett enda rum och inte sätta dig in i någonting är tado pengarna värd. Ska du göra tre betalar du drygt 3 300 kronor extra för mjukstarten, och så mycket är den inte värd.",
  },
  {
    id: "danfoss-ally-ra-014g2420",
    name: "Danfoss Ally Radiatortermostat RA (014G2420)",
    shortName: "Ally RA",
    brand: "Danfoss",
    image: productImage(SMART_TERMOSTAT.slug, "danfoss-ally-ra-014g2420"),
    tagline: "Samma termostat som Danfoss Ally, med två ventiltyper färre.",
    scores: {
      kravs: 2.5,
      /* 2 fattningar: M30 och RA. Danfoss produktregister, artikel 014G2420,
         EAN 5702425245008, läst 2026-08-06. Var 3,5. */
      ventil: 2,
      oberoende: 3.5,
      provning: 3.5,
      prisvarde: 2,
    },
    price: 890,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Danfoss-Ally-Radiator-Thermostat-RA/2891720",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Samma termostat, sämre affär",
    pros: [
      "Samma termostat och samma system som Danfoss Ally",
      "RA-adapter och M30-adapter ligger båda i lådan",
      "Labbprovad av Stiftung Warentest bland elva modeller",
      "Zigbee 3.0-certifierad, och två AA-celler räcker 2,5 år",
    ],
    cons: [
      "890 kronor mot 760 för artikeln som tar RAV och RAVL också",
      "Namnet läses som den variant du behöver om du har en RA-ventil",
      "Kräver Danfoss Ally Gateway, som inte ingår",
      "Har du RAV eller RAVL på något element passar den inte, och du får köpa en till",
    ],
    specs: [
      { label: "Pris", value: "890 kr", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value: "2: M30 och Danfoss RA",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Danfoss Ally Gateway",
        highlight: true,
      },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Abonnemang", value: "Nej", highlight: true },
      { label: "Matter", value: "Nej, Zigbee via hubb" },
      { label: "Batteri", value: "2 x AA", highlight: true },
      { label: "Angiven besparing", value: "Upp till 30 %", highlight: true },
      { label: "Öppet fönster", value: "Ja" },
      { label: "Batteritid", value: "2,5 år" },
      { label: "Ljud", value: "Under 30 dB" },
      { label: "GTIN", value: "5702425245008" },
      { label: "Artikelnummer", value: "014G2420" },
    ],
    verdict:
      "Den här termostaten går på två ventilfattningar, M30 och Danfoss RA, och kostar 890 kronor. Den är i övrigt identisk med Danfoss Ally, som går på fyra och kostar 760.\n\nDet är alltså 130 kronor mer för två ventiltyper mindre, och skillnaden märks först när du står vid det andra elementet. Har något rum en RAV- eller RAVL-ventil, vilket är vanligt i hus där radiatorerna är från olika årtionden, passar den inte och du får beställa en till.\n\n**Namnet är det som gör den farlig.** Butiken kallar den Danfoss Ally Radiator Thermostat RA, och den som just konstaterat att elementet bär en Danfoss RA läser det som bekräftelse på att det är den här man ska ha. Den passar, men den billigare passar precis lika bra på samma ventil.\n\nAllt annat är samma sak: samma Zigbee 3.0, samma krav på Danfoss Ally Gateway, samma två AA-celler i 2,5 år, samma plats i Stiftung Warentests provning av elva modeller.\n\nKontrollera artikelnumret på kartongen innan du betalar. Står det 014G2420, lägg tillbaka den och ta 014G2460 i stället.",
  },
  {
    id: "fibaro-radiator-thermostat",
    name: "Fibaro Radiator Thermostat Starter Pack",
    shortName: "Fibaro",
    brand: "Fibaro",
    image: productImage(SMART_TERMOSTAT.slug, "fibaro-radiator-thermostat"),
    tagline: "Laddas som en telefon i stället för att äta AA-celler.",
    scores: {
      kravs: 2.5,
      /* 3 fattningar: M30x1,5, Danfoss RTD-N och Danfoss RA-N. Fibaros egen
         bruksanvisning FGT-001 v1.3, sidan 3, läst 2026-08-06. Var 1,5 med
         motiveringen att Fibaro inte namngav någon fattning alls, vilket var
         fel: uppgiften stod på första sidan i manualen. */
      ventil: 3,
      oberoende: 4,
      prisvarde: 3,
    },
    price: 719,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Fibaro-Radiator-Thermostat-Starter-Pack/2637987",
    priceCheckedAt: "2026-08-06",
    superlative: "Bäst för Z-Wave-hem",
    pros: [
      "Laddbart litiumpolymerbatteri som fylls med en vanlig telefonladdare",
      "Z-Wave, alltså lokal styrning utan molnberoende",
      "Startpaketet innehåller en separat temperaturgivare som mäter rummet i stället för elementet",
      "Reagerar på öppet fönster och på andra värmekällor i rummet",
      "Frostskydd och en avkalkningsfunktion som motionerar ventilen",
    ],
    cons: [
      "Går bara på tre fattningar: M30x1,5, Danfoss RTD-N och Danfoss RA-N, minst av alla här",
      "Batteriet är inbyggt och går inte att byta, så termostatens liv är batteriets liv",
      "Detektering av öppet fönster finns bara i Z-Wave-versionen, inte i HomeKit-varianten",
      "Kräver en Z-Wave-styrenhet eller HomeKit, som inte ingår",
    ],
    specs: [
      { label: "Pris", value: "719 kr", highlight: true },
      {
        label: "Ventilfattningar",
        shortLabel: "Ventiler",
        value: "3: M30x1,5, Danfoss RTD-N och Danfoss RA-N",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Z-Wave-styrenhet eller HomeKit",
        highlight: true,
      },
      { label: "Protokoll", value: "Z-Wave eller HomeKit", highlight: true },
      { label: "Abonnemang", value: "Nej", highlight: true },
      { label: "Matter", value: "Nej, Z-Wave eller HomeKit" },
      {
        label: "Batteri",
        value: "Inbyggt litiumpolymer, laddas via micro-USB, ej utbytbart",
        highlight: true,
      },
      { label: "Angiven besparing", value: "Upp till 42 %", highlight: true },
      { label: "Frostskydd", value: "Ja, plus avkalkningsfunktion" },
      { label: "Öppet fönster", value: "Ja, men bara i Z-Wave-versionen" },
      { label: "GTIN", value: "5902701701079" },
    ],
    verdict:
      "Fibaro Heat Controller kostar 719 kronor och har ett laddbart litiumpolymerbatteri som fylls med en vanlig telefonladdare. Det är den enda termostaten här vid sidan av tado som inte kräver nya celler, och den enda under tusenlappen.\n\nHårdvaran har fler bra idéer. Z-Wave ger lokal styrning utan molnberoende, startpaketet innehåller en separat temperaturgivare som mäter rummet i stället för luften vid elementet, och termostaten reagerar både på öppet fönster och på en brasa eller annan värmekälla som får rummet att stiga av sig självt. En avkalkningsfunktion motionerar dessutom ventilen så att spindeln inte kärvar fast över sommaren.\n\n**Passformen är det som fäller den.** Den går på tre fattningar: M30x1,5, Danfoss RTD-N och Danfoss RA-N. Det är minst av alla elva, och det utesluter varje element med RAV, RAVL, M28 eller en italiensk klämfattning. Har huset blandade ventiler är den här termostaten fel köp innan du ens vet vad den kostar.\n\nBatteriet är dessutom inbyggt och går inte att byta, vilket manualen är uttrycklig med. Termostatens livslängd är alltså batteriets, och en litiumcell som laddas varje månad i ett varmt rum håller inte i tio år.\n\nKör du redan Z-Wave, har M30- eller Danfoss RA-ventiler och är trött på att köpa AA-celler: köp den. Är ventilerna blandade eller okända ska du välja Aqara W600 eller SONOFF TRVZB i stället, som klarar mer än dubbelt så många fattningar.",
  },
];

export const SMART_TERMOSTAT_PRODUCTS: Product[] = resolveProducts(
  SMART_TERMOSTAT,
  SEEDS,
);

/**
 * Övervägda men inte rankade.
 *
 * De fyra första är de andra sorterna som säljs under samma ord. De ligger här
 * i stället för i rankningen efter användarbeslut 2026-08-04: en IR-dosa och
 * en ventiltopp löser olika problem och går inte att väga mot varandra.
 */
export const SMART_TERMOSTAT_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "tado",
    name: "Heat Pump Optimizer X",
    reason:
      "2 999 kronor, och en helt annan sorts produkt. Den styr värmekällan i stället för ventilen på ett element, vilket är den logiskt riktigare vägen i ett svenskt hus med värmepump: struper du enskilda radiatorer sänker du inte nödvändigtvis det pumpen arbetar med. Den hör hemma i en jämförelse av framledningsstyrning tillsammans med svenska Ngenic Tune, inte i en rankning av ventiltoppar.",
    approxPrice: 2999,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/tado-heat-pump-optimizer-x-p52264",
  },
  {
    brand: "Netatmo",
    name: "AC-controller",
    reason:
      "1 299 kronor för en infraröd sändare som härmar fjärrkontrollen till en luftvärmepump. Den sitter inte på någon ventil och har ingen ventil att passa, så inget av sidans två fynd gäller den. Har du luft-luft är det den här produktkategorin du ska titta på, och den förtjänar en egen jämförelse tillsammans med Sensibo.",
    approxPrice: 1299,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/netatmo-ac-controller-fjarrstyrning-for-luftvarmepump-och-ac-p52217",
  },
  {
    brand: "Aqara",
    name: "Golvtermostat W500",
    reason:
      "769 kronor för en termostat som monteras i väggen och bryter elvärme till golvslingor. Den kräver elarbete i en dosa, till skillnad från allt vi rankar som skruvas på för hand utan risk för vattenläckage. Två olika produkter, två olika installationer, och att blanda dem i en lista hade gjort betygen obegripliga.",
    approxPrice: 769,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Aqara-Golvtermostat-W500/3390001",
  },
  {
    brand: "Bosch",
    name: "Smart Home rumstermostat II",
    reason:
      "820 kronor, och en rumstermostat och inte en radiatortermostat. Den mäter och styr rummet som helhet i stället för ett enskilt element, vilket är rätt produkt i ett hus med en zon och fel produkt om avsikten är att sänka sovrummet men inte vardagsrummet. Bosch elementtermostat var däremot med bland Stiftung Warentests elva.",
    approxPrice: 820,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Bosch-Smart-Home-rumstermostat-II/3129623",
  },
  {
    brand: "Danfoss",
    name: "Ally 5-pack startpaket",
    reason:
      "4 220 kronor för fem termostater och en gateway. Rätt köp för den som ska göra hela huset på en gång, och 844 kronor per termostat är billigare än lösnumret plus brygga. Vi rankar enstyck för att priserna ska gå att jämföra, men räknar du på tre rum eller fler ska startpaketen med i kalkylen.",
    approxPrice: 4220,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Danfoss-Ally-5-pack-startpaket/8500160",
  },
  {
    brand: "tado",
    name: "Smart Radiator Thermostat V3+",
    reason:
      "949 kronor hos Kjell, alltså 280 mindre än X-serien, och det är den generation Stiftung Warentest faktiskt provade 2023. Vi rankar den ändå inte: tado skriver själva att X-serien inte är kompatibel med tidigare produktlinjer, och att rekommendera en utgående generation till en ny köpare skapar ett återvändsgränd om två år.",
    approxPrice: 949,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/tado-extra-termostat-till-radiator-v3-1-pack-p52121",
  },
];

/**
 * Vanliga frågor.
 *
 * ⚠️ Ingen fråga får ange en besparingsprocent som ett faktum. Talen är
 * tillverkarnas påståenden och ska alltid bära vems de är.
 */
export const SMART_TERMOSTAT_FAQ = [
  {
    question: "Vilken smart termostat är bäst 2026?",
    answer:
      "Aqara Radiator Thermostat W600 för 559 kronor hos Kjell, om du redan har en Matter- eller Zigbee-hubb hemma. Sex adaptrar ligger i lådan, så den går på sju ventilfattningar och passar därmed nästan vilket element som helst, och Ljud & Bild lyfte fram att den arbetar helt ljudlöst när den justerar värmen. Frostskyddet slår på värmen under 5 grader och släpper vid 8. Ska du göra fyra eller fem element gör SONOFF TRVZB samma jobb för 361 kronor styck, med lika många fattningar men utan oberoende test bakom sig.",
  },
  {
    question: "Hur mycket sparar man på en smart termostat?",
    answer:
      "Ingen som har provat produkterna vill svara på den frågan. Ljud & Bild, som är den enda svenska redaktion som haft tre av dem i handen, skriver att besparingen inte avhandlas i testet eftersom det skulle kräva ett test under mycket lång tid. Stiftung Warentest provade elva modeller i labb och lägger besparingsavsnittet bakom betalvägg. Tillverkarna fyller tomrummet: Fibaro anger 42 procent, Netatmo 37, Danfoss 30, tado 28, och Aqara, Eve, SONOFF och Schneider anger ingenting alls. Fibaros tal är fotnotat till tillverkarens egen opublicerade forskning. Netatmos 37 procent vilar på en studie från Centrale-Supélec på en standardlägenhet, men gäller enligt Netatmos eget material deras rumstermostat i hus med egen panna eller värmepump, inte radiatorventilerna butiken sätter talet på. Det ärliga svaret är att det beror på hur du värmer i dag, och att den som redan skruvar ner värmen på natten har mindre att hämta än den som aldrig gör det.",
  },
  {
    question: "Var kommer siffran 28 procent från?",
    answer:
      "Från Fraunhofer IBP-Report 579 E, publicerad 2022 och beställd av tado. Vi har läst den i original, och tre saker i den står inte i marknadsföringen. Det är en beräkning och inte en mätning i bebodda hus: rapporten säger att studien bygger på transienta beräkningar i simuleringsprogrammet TRNSYS 17. Klimatdatan är ett typår för München. Och resultatet är ett spann, 12 till 28 procent, där marknadsföringen citerar taket. Referensfallet som besparingen räknas mot är ett hem där alla radiatortermostater står på konstant 20 grader hela dagen. Hela rapporten finns inte publikt utan fås enligt sammanfattningen på begäran från uppdragsgivaren tado.",
  },
  {
    question: "Passar en smart termostat på mitt element?",
    answer:
      "Bara om elementet har en termostatventil, alltså den vred du kan skruva mellan siffror i dag. Sitter det en enkel avstängningskran eller ingenting alls fungerar ingen av produkterna här. Därefter avgör ventilens fattning. De flesta moderna ventiler har gängan M30x1,5, och svenska hus har ofta Danfoss RA, RAV eller RAVL, som kräver var sin adapter. Spannet mellan modellerna är femfaldigt: Netatmo når tio fattningar, Aqara W600, tado X och SONOFF sju, fem modeller fyra, och Danfoss Ally RA två. Aqara E1 fungerar dessutom inte alls på manuella ventiler, returtemperaturbegränsare eller enrörssystem, och enrörssystem är vanligt i flerbostadshus från 1960- och 70-talen. Skruva loss ditt nuvarande vred och läs vad som står på ventilkroppen innan du beställer. Det läcker inte vatten när du gör det.",
  },
  {
    question: "Fungerar det om jag bor i lägenhet?",
    answer:
      "Tekniskt oftast ja, ekonomiskt oftast nej. Har lägenheten vattenburna radiatorer med termostatventiler går termostaterna att montera. Men i ett flerbostadshus med fjärrvärme betalar du normalt värmen genom månadsavgiften och inte efter förbrukning, och då sänker du grannarnas kostnad snarare än din egen. Det du köper är komfort och schemaläggning, vilket kan vara värt pengarna i sig, men räkna inte med att avgiften ändras. Kontrollera också med föreningen: ventilerna tillhör ofta husets system, och en del föreningar har regler om vad som får bytas.",
  },
  {
    question: "Behöver jag en hubb till en smart termostat?",
    answer:
      "Nästan alltid, och det är kategorins dolda kostnad. Danfoss Eco är undantaget: den talar Bluetooth direkt med telefonen och behöver ingenting, men kan inte nås när du inte är hemma. Zigbee-termostater som Aqara E1, Danfoss Ally, Schneider Wiser och SONOFF behöver en Zigbee-hubb, och Danfoss och Schneider vill ha sin egen. Thread- och Matter-termostater som Aqara W600, Eve Thermo och tado X behöver en Thread Border Router, vilket många redan har i form av en HomePod, en Apple TV, en Nest-högtalare eller en IKEA Dirigera. Ett undantag är värt att veta: SONOFF TRVZB fungerar inte med Philips, IKEA eller Fritzbox gateways trots Zigbee 3.0, så en Dirigera i hallen räcker inte där. Räkna alltid in hubben i priset om du inte redan har en.",
  },
  {
    question: "Vad är skillnaden mellan Danfoss Ally 014G2460 och 014G2420?",
    answer:
      "Adaptrarna, och priset går åt fel håll. I Danfoss eget produktregister bär 014G2460 adaptertyp M30, RA, RAV och RAVL, medan 014G2420 bär M30 och RA. Hos Proshop kostar den första 760 kronor och den andra 890. Den dyrare passar alltså två ventiltyper färre. Butiken saluför 014G2420 under namnet Danfoss Ally Radiator Thermostat RA, vilket är lätt att läsa som den variant man behöver om elementet har en RA-ventil, trots att den billigare passar RA också. Kontrollera artikelnumret på kartongen.",
  },
  {
    question: "Skyddar en smart termostat mot frusna rör?",
    answer:
      "De flesta anger en frostskyddsfunktion, men den är inte lika väl belagd som produktbladen antyder. Stiftung Warentest provade elva modeller och skriver i sin fritt läsbara text att en av dem missade frostskyddstestet, och att det vid minusgrader kan leda till spruckna rör. Vilken av de elva det var ligger bakom betalvägg, och vi gissar aldrig på en sådan sak. Sex av de elva har en frostskyddsfunktion vi kunnat belägga: Aqara W600 slår på värmen under 5 grader och släpper vid 8, Aqara E1 löser det med en inställd lägstatemperatur, Eve kallar sin Valve Protection, SONOFF har ett frostläge med tröskel du sätter själv, Netatmos Frost-Guard står på 7 grader som förval och Fibaro har en anti-freeze-funktion. För de övriga fem står raden tom, vilket inte är samma sak som att funktionen saknas. Lämnar du ett hus obebott en vinter ska du hur som helst inte lita på den ensam.",
  },
  {
    question: "Vad kostar det att göra tre rum?",
    answer:
      "Mellan ungefär 1 100 och 4 600 kronor, beroende på märke och på vad du redan har. Tre SONOFF TRVZB kostar 1 083 kronor plus en Zigbee-sticka. Tre Aqara E1 kostar 1 647 plus hubb. Tre Danfoss Ally kostar 2 280 plus gateway, och fempaketet på 4 220 kronor blir billigare per termostat om du ändå ska göra fler rum. Tre tado X kostar 3 687 plus Bridge X för 869 och därtill årsavgiften Auto-Assist för delar av automatiken. Skillnaden mellan billigast och dyrast är alltså större än vad många av produkterna kostar var för sig, och det är därför vi räknar per hem i stället för per termostat.",
  },
  {
    question: "Krävs abonnemang för en smart termostat?",
    answer:
      "Bara för en av dem vi rankar, och det är den dyraste. tado flyttade delar av de automatiska funktionerna till den årliga tjänsten Auto-Assist, och Ljud & Bilds testare beskriver den som den enda riktiga bromsklossen och skriver att den luktar mer girighet än god service. Övriga tio kräver ingenting. Eve går längst åt andra hållet och anger uttryckligen varken abonnemang, registrering eller molntjänst. Kontrollera ändå vad som ingår innan du köper, eftersom en avgift för fjärrstyrning i praktiken är en avgift för att termostaten ska vara smart när du inte är hemma.",
  },
  {
    question: "Är radiatortermostater rätt lösning i ett hus med värmepump?",
    answer:
      "Inte självklart, och det är en fråga ingen svensk jämförelse ställer. En radiatortermostat struper flödet till ett enskilt element. I ett hus där värmen kommer från en värmepump som styrs av en värmekurva mot utetemperaturen sänker det inte nödvändigtvis det pumpen arbetar med, och nyttan blir mindre än i det gasuppvärmda tyska radhus produkterna är utvecklade för. Vill du styra själva värmekällan är det en annan produktkategori, med tado Heat Pump Optimizer X och svenska Ngenic Tune som exempel, och de ligger bland våra övervägda. Rumsvis styrning ger fortfarande komfort, och att hålla ett sovrum svalare än vardagsrummet fungerar oavsett värmekälla.",
  },
  {
    question: "Vad menas med enrörssystem, och varför spelar det roll?",
    answer:
      "Ett enrörssystem leder vattnet genom radiatorerna i en slinga efter varandra i stället för att mata var och en parallellt. Det var vanligt i svenska flerbostadshus under 1960- och 70-talen. Struper du en enskild radiator i ett sådant system påverkar du flödet till dem som ligger efter i slingan, och därför fungerar vanliga radiatortermostater dåligt eller inte alls. Aqara är den tillverkare som skriver ut att enrörssystem inte stöds, tillsammans med manuella ventiler och returtemperaturbegränsare. Ingen annan i vår jämförelse nämner det, och ingen av de svenska sidor vi läste gör det heller. Bor du i ett hus från den perioden är det första du bör ta reda på.",
  },
];
