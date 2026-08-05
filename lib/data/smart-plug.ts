import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { SMART_PLUG } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /smart-plug.
 *
 * Priser, produktnamn, maxlaster, viloeffekter och butiks-URL:er är lästa ur
 * butikernas egna produktsidor och deras JSON-LD på PRICE_CHECKED. URL:erna
 * nedan är de kanoniska efter omdirigering: Kjell lägger flera av de här
 * produkterna under /el-verktyg/starkstrom/energimatare/ trots att man hittar
 * dem via /smarta-hem/fjarrstrombrytare/, och att länka till kategorisökvägen
 * kostar ett extra hopp för både läsaren och crawlern.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans ännu, enligt beslut: vi
 * ansöker inte till något Adtraction-program förrän minst 16 sidor finns. Se
 * lib/links.ts.
 *
 * ## Två saker om betygen som inte får försvinna
 *
 * `testomdome` saknas för Cleverio IP200. Det är Kjells eget märke och ingen
 * oberoende part har testat den. Vi hittar hellre på ingenting än ett betyg,
 * så fältet utelämnas, `weightedRating` fördelar om vikten och sidan skriver
 * ut "Ej testat" på raden. Konsekvensen är att Cleverio hamnar överst bedömd
 * på 60 av 100 viktpoäng. Det är ett medvetet val av viktningsmodell, inte en
 * bugg, men det ska stå i verdicten och det gör det.
 *
 * `viloforbrukning` saknas för tre av fem. Shelly, Philips och Cleverio anger
 * ingen siffra alls, varken i butiken eller i databladet. Att sätta ett lågt
 * betyg för att uppgiften saknas vore att uppfinna en mätning.
 *
 * ⚠️ ÄNNU INTE PUBLICERBAR. Kriteriebetygen är redaktionell bedömning utifrån
 * källorna i lib/sources.ts, inte mätningar. Priser
 * rör sig, kör om kontrollen före lansering.
 */

export const PRICE_CHECKED = "2026-08-03";

const SEEDS: ProductSeed[] = [
  {
    id: "cleverio-ip200",
    userRating: { value: 4.5, count: 41, checkedAt: PRICE_CHECKED },
    brand: "Cleverio",
    name: "IP200 Smart fjärrströmbrytare 3 680 W",
    shortName: "IP200 3 680 W",
    image: productImage(SMART_PLUG.slug, "cleverio-ip200"),
    tagline:
      "Den enda pluggen som både klarar 16 A och mäter förbrukningen, till lägsta pris.",
    scores: {
      /* testomdome utelämnas medvetet: ingen oberoende test finns. */
      maxeffekt: 5,
      anslutning: 2,
      energimatning: 4.5,
      /* viloforbrukning utelämnas: Cleverio anger ingen siffra. */
      prisvarde: 5,
    },
    price: 99,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-inomhus/cleverio-ip200-smart-fjarrstrombrytare-med-energimatning-3680-w-p52210",
    award: "winner",
    superlative: "Bäst i test",
    pros: [
      "16 A, ensam om att klara element och torkskåp",
      "Energimätning inbyggd trots lägsta priset av pluggarna",
      "Ingen brygga eller hubb behövs",
    ],
    cons: [
      "Ingen oberoende testare har granskat den",
      "Saknar Matter, så den är beroende av att Smart Life-appen finns kvar",
      /* Stod "Viloförbrukningen anges inte av tillverkaren" till 2026-08-05.
         Fel: manualen som Kjell länkar från produktsidans supportflik anger
         "Standby: <1 W". Butikssidan har ingen specifikationstabell alls, och
         den tystnaden lästes som ett besked från tillverkaren. */
      "Manualen anger maxlast 2 300 W i tabellen och 3 680 W i säkerhetstexten",
    ],
    specs: [
      { label: "Maxlast", value: "3 680 W (16 A)", highlight: true },
      { label: "Energimätning", shortLabel: "Mätning", value: "Ja, i appen", highlight: true },
      /* Ur manualen, inte butikssidan: "Standby: <1 W". Se rättelsen
         2026-08-05 och .agent/research/pastaenden-kontroll-2026-08-05.md. */
      { label: "Viloförbrukning", shortLabel: "Viloläge", value: "<1 W", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Wi-Fi 2,4 GHz", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "App", value: "Smart Life" },
      { label: "Kapslingsklass", value: "Inomhus" },
    ],
    verdict:
      "Cleverio IP200 klarar 16 A och mäter energi, till 99 kronor. Ett element, en vattenkokare eller ett torkskåp behöver 16 A, och av de fem pluggarna är det bara den här och Plejd som är märkta för det. Cleverio är dessutom ensam om att kombinera det med energimätning, och det till 99 kronor, 45 procent under den svagaste pluggen här.\n\nMen var ärlig med vad betyget står på: det här är den enda produkten som ingen oberoende testare har granskat, och det vi väger tyngst är just det. Utan det väger 60 av 100 i vår bedömning. Cleverio anger inte heller vad pluggen själv drar i viloläge, vilket är en uppgift vi hade velat ha.\n\nÄr du osäker och vill ha något som blivit granskat är Shelly nästa på listan.",
  },
  {
    id: "shelly-plug-s-gen3",
    brand: "Shelly",
    name: "Plug S Gen3 smart kontakt",
    shortName: "Plug S Gen3",
    image: productImage(SMART_PLUG.slug, "shelly-plug-s-gen3"),
    tagline:
      "Matter, realtidsmätning och styrning som fungerar även när molnet ligger nere.",
    scores: {
      testomdome: 3.5,
      maxeffekt: 3,
      anslutning: 5,
      energimatning: 5,
      prisvarde: 4,
    },
    price: 249,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Hornbach",
    merchantUrl: "https://www.hornbach.se/p/smart-plug-shelly-plug-s-gen3/12341078/",
    superlative: "Bäst för lokal styrning",
    pros: [
      "Matter-certifierad, fungerar i Apple Home, Google Home och Alexa",
      "Går att styra lokalt utan molnkonto, och integreras direkt i Home Assistant",
      "Detaljerad energimätning i realtid",
    ],
    cons: [
      "2 500 W, inte tillräckligt för de tyngsta apparaterna",
      "Testet vi hittat gäller föregående generation",
      "Sticker ut mer ur uttaget än Plejd och Tapo",
    ],
    specs: [
      { label: "Maxlast", value: "2 500 W (12 A)", highlight: true },
      { label: "Energimätning", shortLabel: "Mätning", value: "Ja, i realtid", highlight: true },
      { label: "Viloförbrukning", shortLabel: "Viloläge", value: "Ej angiven", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Wi-Fi + Bluetooth", highlight: true },
      { label: "Matter", value: "Ja" },
      { label: "Mått", value: "44 × 44 × 70 mm" },
      { label: "Kapslingsklass", value: "Inomhus" },
    ],
    verdict:
      "Shelly Plug S Gen3 är valet för den som tänker bygga vidare. Matter gör att den fungerar i alla fyra ekosystemen samtidigt, och till skillnad från de andra går den att styra lokalt utan att ett moln behöver svara, vilket också är varför den är populär bland dem som kör Home Assistant. Energimätningen är den mest detaljerade av de fem.\n\nTvå förbehåll. Maxlasten på 2 500 W räcker för det mesta men inte för ett element, och det svenska test vi hittat gäller föregående Plug S, som både hade lägre maxlast och saknade Matter. Vi har därför vägt ner testomdömet i stället för att låta ett betyg på en annan produkt räknas som om det gällde den här.\n\nHornbach hade lägst pris när vi kontrollerade. Samma plugg finns hos Inet för trettio kronor mer, där kunderna ger den 4,3 av 5.",
  },
  {
    id: "plejd-spr-01",
    userRating: { value: 5, count: 532, checkedAt: PRICE_CHECKED },
    brand: "Plejd",
    name: "SPR-01 Smart Plug on/off",
    shortName: "SPR-01",
    image: productImage(SMART_PLUG.slug, "plejd-spr-01"),
    tagline:
      "Minst, snålast och svensk. Klarar 16 A men mäter ingenting och vill helst leva bland andra Plejd-produkter.",
    scores: {
      testomdome: 4,
      maxeffekt: 5,
      anslutning: 3,
      energimatning: 1,
      viloforbrukning: 5,
      prisvarde: 4,
    },
    price: 249,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-inomhus/plejd-spr-01-smart-plug-onoff-vit-p51899",
    award: "editor",
    superlative: "Minst och snålast",
    pros: [
      "0,3 W i viloläge, en femtedel av den sämsta av pluggarnaörelsen",
      "16 A, klarar samma laster som testvinnaren",
      "Så liten att två får plats i ett dubbeluttag, och scheman ligger i pluggen",
    ],
    cons: [
      "Ingen energimätning alls",
      "Bluetooth mesh i Plejds eget system, inget Matter",
      "Kräver en Plejd-gateway för att styras utanför hemmet",
    ],
    specs: [
      { label: "Maxlast", value: "16 A", highlight: true },
      { label: "Energimätning", shortLabel: "Mätning", value: "Nej", highlight: true },
      { label: "Viloförbrukning", shortLabel: "Viloläge", value: "0,3 W", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth mesh", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Mått", value: "Ø 43 × 66 mm" },
      { label: "Kapslingsklass", value: "Inomhus" },
    ],
    verdict:
      "Plejd SPR-01 drar 0,3 W i viloläge mot Tapos 1,48, och är så liten att två stycken får plats i samma dubbeluttag. Att timer, veckour och astrour ligger i själva pluggen är dessutom värt mer än det låter: schemat går i gång även när nätet är nere, vilket ingen av de molnberoende pluggarna kan lova.\n\nSedan kommer priset för det. Ingen energimätning, inget Matter, och för att styra den hemifrån behöver du en Plejd-gateway. Hemmastyrnings omdöme är att den är ett bra köp om du redan har Plejd, och att det finns bättre alternativ om du inte har det. Vi håller med.\n\nHar du Plejd i taket är det här en självklarhet. Har du inte det köper du in dig i ett system för ett enda uttags skull.",
  },
  {
    id: "philips-hue-smart-plug",
    userRating: { value: 4.5, count: 258, checkedAt: PRICE_CHECKED },
    brand: "Philips Hue",
    /* Utan varumärket i namnet: allt renderas som `brand + name`, och
       "Philips Hue Hue Smart Plug" är vad man får annars. */
    name: "Smart Plug",
    image: productImage(SMART_PLUG.slug, "philips-hue-smart-plug"),
    tagline:
      "Dyrast och minst utrustad, men den enda som gör en golvlampa till en riktig Hue-lampa.",
    scores: {
      testomdome: 4,
      maxeffekt: 2.5,
      anslutning: 4.5,
      energimatning: 1,
      prisvarde: 2.5,
    },
    price: 319,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/philips-hue/philips-hue-tillbehor/philips-hue-smart-plug-fjarrstrombrytare-p51533",
    superlative: "Bäst om du redan har Hue",
    pros: [
      "Zigbee via Hue Bridge, den stabilaste anslutningen av pluggarna",
      "Ligger i samma scener och rum som resten av belysningen",
      "Fungerar med Google, Alexa och HomeKit via bryggan",
    ],
    cons: [
      "Dyrast av pluggarna och saknar energimätning",
      "2 300 W, klarar inte tyngre apparater",
      "Ingen egen app, så utan Hue-brygga är den nästan meningslös",
    ],
    specs: [
      { label: "Maxlast", value: "2 300 W (10 A)", highlight: true },
      { label: "Energimätning", shortLabel: "Mätning", value: "Nej", highlight: true },
      { label: "Viloförbrukning", shortLabel: "Viloläge", value: "Ej angiven", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee + Bluetooth", highlight: true },
      { label: "Matter", value: "Via Hue Bridge" },
      { label: "Modell", value: "929003050601" },
      { label: "Kapslingsklass", value: "Inomhus" },
    ],
    verdict:
      "Hue Smart Plug har högst pris, ingen energimätning och lägst maxlast av de fem, och som fristående plugg är den svår att försvara. TechRadar landar i samma slutsats när de kallar den ett Hue-tillbehör snarare än en smart plug, och ger den fyra av fem på just den premissen. Det är också så du ska se på den. Har du Hue sedan tidigare gör pluggen att golvlampan hamnar i samma rum och samma scener som taklamporna, tänds med samma knapp och dimras i samma svep. Den saken kan ingen av de andra här göra. Har du inte Hue finns det ingen anledning att börja med den här produkten, eftersom den saknar egen app och alltså kräver en brygga för nästan allt.",
  },
  {
    id: "tp-link-tapo-p100",
    brand: "TP-Link",
    name: "Tapo P100 Mini Smart Wi-Fi",
    shortName: "Tapo P100",
    image: productImage(SMART_PLUG.slug, "tp-link-tapo-p100"),
    tagline:
      "Den mest rekommenderade pluggen i Sverige, och den som drar mest ström när den inte gör någonting.",
    scores: {
      testomdome: 4.5,
      maxeffekt: 2.5,
      anslutning: 3.5,
      energimatning: 1,
      viloforbrukning: 1,
      prisvarde: 3.5,
    },
    price: 179,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-inomhus/tp-link-tapo-mini-smart-wifi-fjarrstrombrytare-1-pack-p51639",
    superlative: "Billigast att prova på",
    pros: [
      "Enklaste appen och snabbast svar av wifi-pluggarna",
      "Liten nog att inte skymma grannuttaget",
      "Finns som fyrpack om du vill ha flera",
    ],
    cons: [
      "1,48 W i viloläge, femdubbelt mot Plejd",
      "2 300 W, inte tillräckligt för element eller torkskåp",
      "Varken energimätning eller Matter",
    ],
    specs: [
      { label: "Maxlast", value: "2 300 W (10 A)", highlight: true },
      { label: "Energimätning", shortLabel: "Mätning", value: "Nej", highlight: true },
      { label: "Viloförbrukning", shortLabel: "Viloläge", value: "1,48 W", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Wi-Fi 2,4 GHz", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Mått", value: "51 × 72 × 40 mm" },
      { label: "Kapslingsklass", value: "Inomhus" },
    ],
    verdict:
      "Tapo P100 är den mest rekommenderade smarta pluggen i landet och hamnar ändå sist här. Trusted Reviews ger den 4,5 av 5 och de har inte fel om det de bedömer: appen är den bästa av wifi-pluggarna, svarstiden är kort och den är liten nog att inte skymma grannuttaget.\n\nKjell anger 1,48 W i viloläge, nästan fem gånger Plejds 0,3 W. Med åtta pluggar i hemmet är det runt hundra kronor om året i ren bakgrundsförbrukning, av en produkt som ofta köps för att spara el. Och 2 300 W betyder att den inte får sitta på det som gör störst skillnad på elräkningen.\n\nSom första plugg till en golvlampa eller julbelysningen är den fortfarande ett rimligt köp. Som grund för hela hemmet är den det inte.",
  },
];

export const SMART_PLUG_PRODUCTS = resolveProducts(SMART_PLUG, SEEDS);

/**
 * Maskinläsbar version av de två specar som avgör om en produkt duger:
 * märkström och om den får sitta ute.
 *
 * Finns som eget fält i stället för att tolkas ur `specs`-strängarna. Att
 * plocka ut "16 A" ur "3 680 W (16 A)" med en regex fungerar ända tills någon
 * skriver "16A" eller "3680W", och då rekommenderar Effektkollen fel produkt
 * till ett element. Det är den ena feltypen den här sidan finns för att
 * förhindra.
 *
 * Håll listan i synk med `specs.Maxlast` ovan. Avviker de är specen sanningen.
 */
export type PlugCapability = {
  id: string;
  /** Märkström i ampere. 10 A är 2 300 W, 16 A är 3 680 W. */
  amp: 10 | 12 | 16;
  /** Får sitta utomhus eller i ouppvärmt utrymme. Ingen av de rankade får det. */
  outdoor: boolean;
};

export const SMART_PLUG_CAPABILITIES: PlugCapability[] = [
  { id: "cleverio-ip200", amp: 16, outdoor: false },
  { id: "plejd-spr-01", amp: 16, outdoor: false },
  { id: "shelly-plug-s-gen3", amp: 12, outdoor: false },
  { id: "tp-link-tapo-p100", amp: 10, outdoor: false },
  { id: "philips-hue-smart-plug", amp: 10, outdoor: false },
];

/**
 * Tittade på, valde bort. Tre av sex är utomhuspluggar, och de är uteslutna på
 * plats och inte på kvalitet: en IP44-plugg på 80 × 58 × 93 mm går inte att
 * jämföra med en inomhusmini på storlek, och köparen är en annan. De hör
 * hemma i köpguidens avsnitt om kalla utrymmen, som de också länkas från.
 */
export const SMART_PLUG_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Shelly",
    name: "Outdoor Plug S Gen3",
    approxPrice: 399,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-utomhusbruk/shelly-outdoor-plug-s-gen3-smart-utomhuskontakt-mocha-p52283",
    reason:
      "Utesluten på plats, inte på kvalitet, och den enda plugg vi hittat som är specad för svensk vinter: −25 till 51 °C och IP44. Ska pluggen sitta i garaget, i krypgrunden eller på altanen är det den här specen du ska leta efter, oavsett märke.",
  },
  {
    brand: "TP-Link",
    name: "Tapo P410M utomhus 3 680 W",
    approxPrice: 399,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/el-verktyg/starkstrom/energimatare/tp-link-tapo-p410m-smart-fjarrstrombrytare-med-energimatning-3680-w-p60083",
    reason:
      "Den enda utomhuspluggen vi sett som kombinerar IP54, 16 A, energimätning och Matter. Utomhus behandlas separat på den här sidan, men ska du ha en enda plugg till motorvärmaren är det den här kombinationen du vill ha.",
  },
  {
    brand: "Cleverio",
    name: "GP120 utomhus 3 680 W",
    approxPrice: 150,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-utomhusbruk/cleverio-gp120-smart-fjarrstrombrytare-for-utomhusbruk-3680-w-p52191",
    reason:
      /* Rättat 2026-08-01: här stod tidigare att drifttemperaturen stannar vid
         −20 °C. Kjells produktsida anger ingen drifttemperatur alls för GP120,
         varken i specifikationen eller i produkttexten, och uppgiften gick inte
         att belägga hos tillverkaren heller. Upptäckt vid researchen för
         /utomhustimer. */
      "Billigast av utomhuspluggarna och den enda i hela urvalet som anger sin viloförbrukning frivilligt, under 0,5 W. Varken Kjell eller Cleverio anger däremot någon drifttemperatur, vilket är en uppgift man vill ha på något som ska sitta ute i januari.",
  },
  {
    brand: "Shelly",
    name: "Wave Plug S LR",
    approxPrice: 549,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/el-verktyg/starkstrom/energimatare/shelly-wave-plug-s-lr-smart-z-wave-plugg-med-energimatning-vit-p52291",
    reason:
      "Z-Wave 800 med Long Range når betydligt längre än wifi och stör inte på 2,4 GHz-bandet. Men den kräver en Z-Wave-hubb, kostar dubbelt mot testvinnaren och saknar Matter helt. Rätt produkt för ett befintligt Z-Wave-hem, fel som första plugg.",
  },
  {
    brand: "WiZ",
    name: "Smart wifi-fjärrströmbrytare med energimätning",
    approxPrice: 143,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/el-verktyg/starkstrom/energimatare/wiz-smart-wifi-fjarrstrombrytare-med-energimatning-p52131",
    reason:
      "Billigast med både Matter och energimätning, vilket är en ovanlig kombination i den här prisklassen. Vi lämnade den utanför eftersom varken butiken eller tillverkaren anger maxlast, och Ljud & Bild anmärker på att WiZ rektangulära form tar upp plats i uttaget.",
  },
  {
    brand: "TP-Link",
    name: "Tapo P300 smart grenuttag",
    approxPrice: 499,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-inomhus/tp-link-tapo-p300-smart-grenuttag-med-usb-portar-p65237",
    reason:
      "Egentligen en annan produkt: tre separat styrbara uttag och USB-portar i en grenkontakt. Löser problemet med att en plugg skymmer grannuttaget genom att inte sitta i väggen alls. Värd att känna till om det du vill styra står samlat vid en tv-bänk eller ett skrivbord.",
  },
];

/**
 * Speglar köpguiden: varje fråga guiden svarar på har en post här, formulerad
 * som folk söker snarare än som vi skriver rubriker.
 *
 * Dubbleringen är avsiktlig. Guiden är för den som läser uppifrån och ner,
 * det här är för den som kom med en enda fråga, och för FAQPage-uppmärkningen
 * som kan visa ett enskilt svar direkt i sökresultatet. Svaren står därför för
 * sig själva och förutsätter inte varandra.
 */
export const SMART_PLUG_FAQ = [
  {
    question: "Hur många watt klarar en smart plug?",
    answer:
      "De flesta är märkta för antingen 2 300 W eller 3 680 W, alltså 10 eller 16 ampere. Skillnaden avgör vad du kan koppla in. En golvlampa, en tv eller en kaffebryggare klarar sig långt under 10 A, medan ett element, en vattenkokare, ett torkskåp eller en luftvärmepump behöver 16 A. Siffran står nästan alltid i produktnamnet hos svenska butiker, och den är det första du ska kontrollera. Kopplar du in något som drar mer än pluggen är märkt för blir pluggen varm, och i värsta fall smälter den.",
  },
  {
    question: "Drar en smart plug ström när den är avstängd?",
    answer:
      "Ja, och betydligt mer än många tror. Radion måste vara vaken dygnet runt för att kunna ta emot kommandot att slå på. Skillnaden mellan produkterna är stor: TP-Link anger 1,48 W för Tapo P100 medan Plejd anger 0,3 W för SPR-01, alltså nästan fem gånger så mycket. 1,48 W dygnet runt blir 13 kWh om året, vilket med två kronor per kilowattimme är runt 26 kronor per plugg. Åtta pluggar av den sämre sorten kostar alltså över tvåhundra kronor om året i ren bakgrundsförbrukning.",
  },
  {
    question: "Vilken smart plug klarar ett element?",
    answer:
      "En som är märkt för 16 A, alltså 3 680 W. Ett vanligt oljefyllt element drar mellan 1 000 och 2 000 W, vilket i sig ryms i en 10 A-plugg, men marginalen blir för liten för en apparat som står på i timmar. Rekommendationen är att lägga minst tjugo procent på apparatens märkeffekt när du väljer plugg. Av produkterna i den här jämförelsen är det bara Cleverio IP200 och Plejd SPR-01 som är märkta för 16 A.",
  },
  {
    question: "Kan man ha en smart plug utomhus eller i garaget?",
    answer:
      "Bara om den är byggd för det, och två uppgifter avgör. Kapslingsklassen ska vara minst IP44 för att pluggen ska tåla regn och stänk. Drifttemperaturen ska täcka det kallaste du kan vänta dig på platsen. Där brister de flesta: en vanlig inomhusplugg är ofta specad ner till 0 °C och slutar därmed fungera pålitligt i ett ouppvärmt garage på vintern. Shelly Outdoor Plug S Gen3 anger −25 till 51 °C, medan flera andra utomhuspluggar inte anger någon drifttemperatur alls. En inomhusplugg i ett fuktigt utrymme är dessutom en brandrisk, inte bara ett funktionsproblem.",
  },
  {
    question: "Fungerar en smart plug till motorvärmaren?",
    answer:
      "Ja, och det är en av de vanligaste svenska användningarna. Två krav gäller. Pluggen måste vara IP44-klassad eftersom den sitter ute, och den måste klara motorvärmarens effekt, som ofta ligger mellan 400 och 1 000 W för själva motorvärmaren och betydligt mer om kupévärmaren sitter på samma uttag. Räkna ihop båda. Fördelen mot en vanlig timer är att du kan flytta starttiden från sängen, se att den faktiskt gick i gång, och att tiden inte blir fel efter ett strömavbrott.",
  },
  {
    question: "Behöver en smart plug en hubb eller brygga?",
    answer:
      "Det beror på protokollet. Wi-Fi-pluggar som Cleverio IP200, Shelly Plug S Gen3 och TP-Link Tapo P100 ansluter direkt till hemmanätet och behöver ingenting extra. Philips Hue Smart Plug kör Zigbee och kräver en Hue Bridge för att fungera fullt ut. Plejd SPR-01 kör Bluetooth mesh och fungerar lokalt utan något extra, men behöver en Plejd-gateway om du vill styra den när du inte är hemma.",
  },
  {
    question: "Lönar det sig att köpa en smart plug?",
    answer:
      "Det beror helt på vad du kopplar in. Det lönar sig när apparaten drar mycket och du kan flytta den i tiden, som ett element eller en billaddning som kan gå när elen är billig. Det lönar sig när något står på i onödan och du inte märker det, vilket en plugg med energimätning kan visa. Det lönar sig sällan på något som redan drar nästan ingenting: en smart plugg på en LED-lampa på 9 W kan mycket väl dra mer i viloläge än lampan gör när den lyser. Och det lönar sig inte alls om du köper den enbart för bekvämligheten och sedan slutar använda appen efter två veckor, vilket är vanligare än man tror.",
  },
  {
    question: "Vilken smart plug är minst och blockerar inte grannuttaget?",
    answer:
      "Plejd SPR-01 är minst i den här jämförelsen på Ø 43 × 66 mm, och två stycken får plats i samma dubbeluttag. TP-Link Tapo P100 är näst minst på 51 × 72 × 40 mm. Problemet är verkligt och tas upp av flera testare: Ljud & Bild anmärker på att WiZ rektangulära form tar upp plats i uttaget, och Hemmastyrning konstaterar att Shelly Plug S skymmer det andra hålet. Har du ett dubbeluttag där båda hålen används är måtten värda att kontrollera innan du beställer.",
  },
  {
    question: "Behöver en smart plug Matter?",
    answer:
      "Inte för att fungera, men det avgör hur länge den fungerar. Matter gör att pluggen går att styra från Apple Home, Google Home, Alexa och SmartThings samtidigt, utan tillverkarens egen app. En plugg utan Matter är beroende av att tillverkarens molntjänst finns kvar och fortsätter fungera, och sådana tjänster stängs. Av produkterna här har Shelly Plug S Gen3 Matter inbyggt, Philips Hue får det via bryggan, medan Cleverio, Plejd och Tapo P100 saknar det.",
  },
  {
    question: "Vad händer med en smart plug om internet försvinner?",
    answer:
      "Det beror på var logiken ligger. Molnberoende wifi-pluggar tappar både fjärrstyrning och ofta schemaläggning när uppkopplingen bryts, och en apparat som slogs på kan i värsta fall bli stående på eftersom stoppkommandot aldrig kommer. Pluggar där schemat ligger i själva enheten fortsätter köra sitt program oavsett nät: Plejd SPR-01 har inbyggd timer, veckour och astrour. Shelly Plug S Gen3 går att styra lokalt utan moln. Ska pluggen styra något där det spelar roll att den slår av i tid, välj en som klarar sig själv.",
  },
];
