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
 * ## Betygen: en lucka kvar, två stängda 2026-08-06
 *
 * `testomdome` saknas för Cleverio IP200. Det är Kjells eget märke och ingen
 * oberoende part har testat den. Vi hittar hellre på ingenting än ett betyg,
 * så fältet utelämnas, `weightedRating` fördelar om vikten och sidan skriver
 * ut "Ej testat" på raden. Cleverio bedöms därmed på 70 av 100 viktpoäng.
 * Det är ett medvetet val av viktningsmodell, inte en bugg, och det står i
 * metodavsnittets fotnot — inte i omdömet, som ska handla om produkten.
 *
 * `viloforbrukning` saknades för tre av fem fram till 2026-08-06 och var fel
 * i två av dem. Shelly publicerar "Power consumption: < 1 W" i specen på sin
 * egen produktsida, och Cleverio anger "Standby: <1 W" i manualen Kjell
 * länkar. Båda har nu betyg 3,5: en angiven takhöjd under 1 W är sämre än
 * Plejds uppmätta 0,3 W och klart bättre än Tapos 1,48 W. Philips Hue är den
 * enda kvarvarande luckan, och den är kontrollerad — se nedan.
 *
 * ## Maxlasten på Cleverio, och varför den står kvar på 16 A
 *
 * Manualen motsäger sig själv: specifikationstabellen anger "Max. belastning:
 * 2300 W, 10 A" medan säkerhetstexten på samma uppslag anger "Maximal resistiv
 * last: 16 A (3680 W)". Dokumentet täcker två artikelnummer — försättsbladet
 * säger "Item: 51701" och brödtexten hänvisar omväxlande till kjell.com/51701
 * och /52210 — så tabellen är med all sannolikhet syskonproduktens.
 *
 * 16 A står i produktnamnet, i Kjells produkttext och i manualens säkerhetstext,
 * alltså tre ställen mot ett. Specen står därför kvar på 3 680 W (16 A).
 * Av samma skäl används INTE måttet 49x49x70 mm ur samma dokument: det går
 * inte att avgöra vilken av de två artiklarna det gäller.
 *
 * Den riktiga lastbegränsningen är i stället den induktiva, 5 A (1 150 W), och
 * den saknades helt på sidan fram till 2026-08-06 trots att Kjells egen
 * produkttext säljer pluggen till vattenpumpar och kompressorer.
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
      "Enda uttaget som både driver ett element och visar vad elementet kostar.",
    scores: {
      /* testomdome utelämnas medvetet: ingen oberoende test finns. */
      maxeffekt: 5,
      anslutning: 2,
      energimatning: 4.5,
      /* "Standby: <1 W" i manualen, se filhuvudet. Angiven takhöjd, inte
         uppmätt värde, därför 3,5 och inte Plejds 5. */
      viloforbrukning: 3.5,
      prisvarde: 5,
    },
    price: 99,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-inomhus/cleverio-ip200-smart-fjarrstrombrytare-med-energimatning-3680-w-p52210",
    award: "winner",
    superlative: "Bäst för element och torkskåp",
    pros: [
      "16 A, klarar element och torkskåp som de flesta uttag inte får driva",
      "Energimätning inbyggd till lägsta priset av uttagen",
      "Ingen brygga eller hubb behövs",
    ],
    cons: [
      /* Ur manualens säkerhetstext, samma uppslag som maxlasten. Saknades på
         sidan till 2026-08-06 trots att Kjell säljer pluggen till pumpar. */
      "Bara 5 A induktiv last, alltså 1 150 W till pump, fläkt eller kompressor",
      "Saknar Matter, så den är beroende av att Smart Life-appen finns kvar",
      "0–35 °C, så den får inte sitta i garaget. Där är Shelly den enda här som duger",
    ],
    specs: [
      { label: "Maxlast", value: "3 680 W (16 A)", highlight: true },
      { label: "Energimätning", shortLabel: "Mätning", value: "Ja, i appen", highlight: true },
      /* Ur manualen, inte butikssidan: "Standby: <1 W". Se rättelsen
         2026-08-05 och .agent/research/pastaenden-kontroll-2026-08-05.md. */
      { label: "Viloförbrukning", shortLabel: "Viloläge", value: "<1 W", highlight: true },
      /* Manualen, 2026-08-06: "Endast för bruk i temperaturer mellan 0-35 °C." */
      { label: "Drifttemperatur", shortLabel: "Temperatur", value: "0 till 35 °C", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Wi-Fi 2,4 GHz", highlight: true },
      { label: "Induktiv last", value: "5 A (1 150 W)" },
      { label: "Matter", value: "Nej" },
      { label: "App", value: "Smart Life" },
      { label: "Kapslingsklass", value: "Inomhus" },
    ],
    verdict:
      "Cleverio IP200 kostar 99 kronor och är märkt för 16 A. Den och Plejd är de enda uttagen här som får driva ett element, ett torkskåp eller en vattenkokare, och Cleverio är ensam om att kombinera den lasten med energimätning.\n\n**16 A är hela poängen: det är först vid de apparaterna ett smart uttag börjar tjäna in sig.** En golvlampa syns inte på elräkningen, ett element gör det, och 3 680 W räcker till alla tre. Mätningen sitter i appen utan extra kostnad, och det är den som avslöjar frysen som drar dubbelt mot vad du trodde, medan Plejd kostar 150 kronor mer och inte mäter alls. Wifi rakt mot routern gör dessutom att den fungerar ur kartongen, utan brygga och utan gateway.\n\nDen tål däremot bara 5 A induktiv last, alltså 1 150 W. Allt med motor eller kompressor räknas dit: pumpar, byggfläktar, kylskåp. Överskrids gränsen går uttaget sönder, och det är en lägre gräns än siffran i produktnamnet får det att låta som.\n\nKöp den. För 99 kronor gör den mer än något annat uttag här gör för det dubbla, och det enda den ska väljas bort för är en motordriven apparat.",
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
      /* "Power consumption: < 1 W" i specen på shelly.com, läst 2026-08-06.
         Stod "Ej angiven" här till dess. Angiven takhöjd, inte uppmätt. */
      viloforbrukning: 3.5,
      prisvarde: 4,
    },
    price: 249,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Hornbach",
    merchantUrl: "https://www.hornbach.se/p/smart-plug-shelly-plug-s-gen3/12341078/",
    superlative: "Bäst för det ouppvärmda garaget",
    pros: [
      "−20 °C, enda uttaget här som får sitta i ett ouppvärmt utrymme",
      "Matter-certifierad, fungerar i Apple Home, Google Home och Alexa",
      "Går att styra lokalt utan molnkonto, och integreras direkt i Home Assistant",
    ],
    cons: [
      "2 500 W, räcker inte till element eller torkskåp. Där tar du Cleverio",
      "Sticker ut mer ur uttaget än Plejd och Tapo",
      "Högst 70 % luftfuktighet, så kylan klarar den men inte en fuktig krypgrund",
    ],
    specs: [
      { label: "Maxlast", value: "2 500 W (12 A)", highlight: true },
      { label: "Energimätning", shortLabel: "Mätning", value: "Ja, i realtid", highlight: true },
      /* shelly.com, 2026-08-06: "Power consumption: < 1 W". Stod "Ej angiven"
         här sedan sidan byggdes — uppgiften var aldrig hämtad hos Shelly. */
      { label: "Viloförbrukning", shortLabel: "Viloläge", value: "< 1 W", highlight: true },
      /* shelly.com: "Ambient temperature: -20 °C to 40 °C". */
      { label: "Drifttemperatur", shortLabel: "Temperatur", value: "−20 till 40 °C", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Wi-Fi + Bluetooth", highlight: true },
      { label: "Matter", value: "Ja" },
      { label: "Mått", value: "44 × 44 × 70 mm" },
      /* Shelly anger luftfuktighet men ingen IP-klass för Gen3. Skriv inte
         ut IP20 här: uppgiften finns för Wave Plug S LR, inte för den här. */
      { label: "Luftfuktighet", value: "30–70 % RH" },
      { label: "Kapslingsklass", value: "Inomhus" },
    ],
    verdict:
      "Shelly Plug S Gen3 kostar 249 kronor och är specad ner till −20 °C. Det är tjugo graders större marginal än något annat uttag här har, och det som gör den till den enda du kan sätta i ett ouppvärmt garage.\n\n**De fyra andra slutar vid 0 °C, alltså precis där ett svenskt garage ligger halva året.** Ovanpå det har den fältets starkaste anslutning: Matter gör att den fungerar i Apple Home, Google Home, Alexa och SmartThings samtidigt, och den går att styra lokalt utan att ett moln behöver svara, så den fortsätter lyda när uppkopplingen går ner. Energimätningen är den mest detaljerade av de fem och visar förbrukningen i realtid.\n\nMaxlasten stannar på 2 500 W. Det räcker till det mesta som står i ett garage, men inte till ett element eller ett torkskåp, och där är det Cleverio som gäller.\n\nSka uttaget sitta i kylan är valet redan gjort, för ingen annan här är godkänd för det. Ska det sitta inomhus betalar du 150 kronor extra för Matter och lokal styrning. Det är värt det om du tänker bygga vidare, inte om det ska styra en golvlampa.",
  },
  {
    id: "plejd-spr-01",
    userRating: { value: 5, count: 532, checkedAt: PRICE_CHECKED },
    brand: "Plejd",
    name: "SPR-01 Smart Plug on/off",
    shortName: "SPR-01",
    image: productImage(SMART_PLUG.slug, "plejd-spr-01"),
    tagline:
      "Snålast i viloläge och så liten att grannuttaget går att använda.",
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
      "0,3 W i viloläge, en femtedel av det törstigaste uttaget här",
      "16 A, klarar samma laster som testvinnaren",
      "Så liten att två får plats i ett dubbeluttag, och scheman ligger i uttaget",
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
      /* plejd.com, 2026-08-06: "Drifttemperatur 0 till +35 °C, inomhus". */
      { label: "Drifttemperatur", shortLabel: "Temperatur", value: "0 till 35 °C", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth mesh", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Mått", value: "Ø 43 × 66 mm" },
      { label: "Kapslingsklass", value: "IP20, inomhus" },
    ],
    verdict:
      "Plejd SPR-01 kostar 249 kronor, drar 0,3 W i viloläge och klarar 16 A. Det är den lägsta viloförbrukningen och den högsta lasten i samma produkt, vilket ingen annan här levererar.\n\n**0,3 W mot Tapos 1,48 låter litet och blir det inte: åtta uttag av den törstigare sorten kostar över tvåhundra kronor om året i ren bakgrundsförbrukning.** Den är dessutom minst av allihop på Ø 43 × 66 mm, så två får plats i samma dubbeluttag i stället för att det ena lägger sig över det andra. Att timer, veckour och astrour ligger i själva uttaget är värt mer än det låter, för schemat går i gång även när nätet ligger nere. Det kan inget molnberoende uttag lova.\n\nDen mäter däremot ingenting. Du ser aldrig vad apparaten drar, alltså får du heller aldrig veta vilken av dem som är värd att styra, och för att nå uttaget hemifrån krävs en Plejd-gateway ovanpå de 249 kronorna.\n\nHar du redan Plejd i taket är det här en självklarhet. Har du inte det köper du in dig i ett slutet system för ett enda uttags skull, och då ger Cleverio dig både mätningen och 16 A för 150 kronor mindre.",
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
      "Gör golvlampan till en Hue-lampa: samma rum, samma scener, samma knapp.",
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
      "Zigbee via Hue Bridge, den stabilaste anslutningen av uttagen",
      "Ligger i samma scener och rum som resten av belysningen",
      "Fungerar med Google, Alexa och HomeKit via bryggan",
    ],
    cons: [
      "Dyrast av uttagen och saknar energimätning",
      "2 300 W, klarar inte tyngre apparater",
      "Ingen egen app, så utan Hue-brygga är den nästan meningslös",
    ],
    specs: [
      { label: "Maxlast", value: "2 300 W (10 A)", highlight: true },
      { label: "Energimätning", shortLabel: "Mätning", value: "Nej", highlight: true },
      /* Kontrollerat 2026-08-06 hos Philips på rätt artikel (12NC 929003050601,
         EAN 8719514342309): rubriken "Strömförbrukning" finns och innehåller
         bara maxlast. Philips publicerar viloläge för Hue Bridge men inte för
         uttaget. Bridgens 0,1 W får inte hamna här. */
      { label: "Viloförbrukning", shortLabel: "Viloläge", value: "Ej angiven", highlight: true },
      /* philips-hue.com, 2026-08-06: "Drifttemperatur 0 °C–35 °C". */
      { label: "Drifttemperatur", shortLabel: "Temperatur", value: "0 till 35 °C", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee + Bluetooth", highlight: true },
      { label: "Matter", value: "Via Hue Bridge" },
      /* Ersatte raden "Modell 929003050601" 2026-08-06. Måtten står hos
         Philips och säger något; artikelnumret gjorde det inte. */
      { label: "Mått", value: "51 × 84 × 51 mm" },
      { label: "Kapslingsklass", value: "Inomhus" },
    ],
    verdict:
      "Philips Hue Smart Plug kostar 319 kronor och är det dyraste uttaget här. Den mäter ingenting, klarar lägst last av de fem och har inte ens en egen app.\n\n**Det den gör, gör den ensam: golvlampan hamnar i samma rum och samma scener som taklamporna.** Den tänds med samma knapp, släcks i samma svep och följer med i samma automationer, vilket förvandlar en vanlig lampa till en Hue-lampa utan att du byter ljuskälla. Zigbee via bryggan är dessutom den stabilaste anslutningen i fältet, eftersom enheterna bygger ett eget nät i stället för att belasta wifit.\n\nUtan en Hue Bridge faller det mesta av det bort. Uttaget har ingen egen app, så det du köper för 319 kronor är ett tillbehör till ett system, inte en fristående produkt.\n\nHar du Hue är det här det självklara sättet att få med golvlampan. Har du inte Hue finns det ingen anledning att börja här. Cleverio kostar en tredjedel och gör mer.",
  },
  {
    id: "tp-link-tapo-p100",
    brand: "TP-Link",
    name: "Tapo P100 Mini Smart Wi-Fi",
    shortName: "Tapo P100",
    image: productImage(SMART_PLUG.slug, "tp-link-tapo-p100"),
    tagline:
      "Enklaste appen och snabbaste svaret, till 179 kronor.",
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
      /* tp-link.com, 2026-08-06: "Operating Temperature: 0 ºC–35 ºC". */
      { label: "Drifttemperatur", shortLabel: "Temperatur", value: "0 till 35 °C", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Wi-Fi 2,4 GHz", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Mått", value: "51 × 72 × 40 mm" },
      { label: "Kapslingsklass", value: "Inomhus" },
    ],
    verdict:
      "TP-Link Tapo P100 kostar 179 kronor och har den enklaste appen av wifi-uttagen. Trusted Reviews ger den 4,5 av 5, det högsta betyget någon produkt här har fått.\n\n**Appen är den verkliga skillnaden: den kopplar upp sig på ett par minuter och svarar direkt när du trycker.** Uttaget är dessutom litet nog att inte lägga sig över grannuttaget, och det finns som fyrpack för 399 kronor om du vill ha flera, vilket är den billigaste vägen till ett halvt hem på schema.\n\nDen drar 1,48 W i viloläge, nästan fem gånger Plejds 0,3 W. Med åtta uttag i hemmet blir det runt hundra kronor om året i ren bakgrundsförbrukning, av en produkt många köper just för att spara el.\n\nSka du prova ett smart uttag för första gången på en golvlampa eller julbelysningen är 179 kronor rätt pris för det. Ska de bli många, eller sitta på något som värmer, kostar viloförbrukningen och de 2 300 watten mer än de 70 kronor du sparar mot Cleverio.",
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
      /* Rättat 2026-08-06: här stod att varken butiken eller tillverkaren
         anger maxlast. Kjells egen specifikationsruta anger 10 A, 230 V,
         2 300 W och IP20. Uppgiften fanns hela tiden på den sida vi länkade. */
      "Billigast med både Matter och energimätning, en ovanlig kombination för 143 kronor. Den stannar på 2 300 W och 10 A, alltså samma tak som Tapo P100, och Ljud & Bild anmärker på att den rektangulära formen tar upp plats i uttaget. Har du bara lampor och elektronik att styra är den prisvärd; ska något värmas räcker den inte.",
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
      "Ja, och betydligt mer än många tror. Radion måste vara vaken dygnet runt för att kunna ta emot kommandot att slå på. Skillnaden mellan produkterna är stor: TP-Link anger 1,48 W för Tapo P100 medan Plejd anger 0,3 W för SPR-01, alltså nästan fem gånger så mycket. Cleverio IP200 och Shelly Plug S Gen3 anger båda under 1 W. 1,48 W dygnet runt blir 13 kWh om året, vilket med två kronor per kilowattimme är runt 26 kronor per plugg. Åtta pluggar av den törstigare sorten kostar alltså över tvåhundra kronor om året i ren bakgrundsförbrukning.",
  },
  {
    question: "Vilken smart plug klarar ett element?",
    answer:
      "En som är märkt för 16 A, alltså 3 680 W. Ett vanligt oljefyllt element drar mellan 1 000 och 2 000 W, vilket i sig ryms i en 10 A-plugg, men marginalen blir för liten för en apparat som står på i timmar. Rekommendationen är att lägga minst tjugo procent på apparatens märkeffekt när du väljer plugg. Av produkterna i den här jämförelsen är det bara Cleverio IP200 och Plejd SPR-01 som är märkta för 16 A.",
  },
  {
    question: "Kan man ha en smart plug utomhus eller i garaget?",
    answer:
      "Bara om den är byggd för det, och två uppgifter avgör. Kapslingsklassen ska vara minst IP44 för att pluggen ska tåla regn och stänk. Drifttemperaturen ska täcka det kallaste du kan vänta dig på platsen. Där brister de flesta: fyra av de fem uttagen i den här jämförelsen är specade 0 till 35 °C och är alltså utanför sitt godkända område i ett svenskt garage hela vintern. Shelly Plug S Gen3 anger −20 till 40 °C och är det enda av de fem som klarar kylan, men den tål högst 70 procent luftfuktighet och hör därför inte hemma i en krypgrund. Ska uttaget tåla stänk krävs en utomhusmodell: Shelly Outdoor Plug S Gen3 anger −25 till 51 °C och IP44.",
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
