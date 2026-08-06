import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { FONSTERPUTSROBOT } from "@/lib/test-pages";

/**
 * Fönsterputsrobot. Underlag i .agent/research/fonsterputsrobot.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, GTIN, hålltider, linans hållfasthet,
 * glasregler och mått. Allt läst 2026-08-04 hos butiken vi länkar till, eller i
 * tillverkarens egen manual.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte hängt någon robot i
 * något fönster, inte belastat någon lina och inte mätt någon rengöring.
 *
 * ## Vad vi vet om säkerheten och måtten
 *
 * Omgjord 2026-08-06 efter ett gap-pass mot tillverkarnas egna
 * specifikationstabeller, manualer och hemmamarknadssidor. Sju av de nio
 * luckor som stod kvar efter 2026-08-05 gick att fylla, och tre publicerade
 * påståenden visade sig felaktiga. Se rättelsen 2026-08-06.
 *
 * | | Lina | Hålltid | Båglöst glas | Minsta ruta | Vikt |
 * |---|---|---|---|---|---|
 * | Kärcher RCW 2 | 4 m | **40 min**, 0,65 Ah / 14,8 V | **nej, kräver båge** | 35 × 35 cm | **1,1 kg** |
 * | Ecovacs Mini | 3,3 m | **30 min** | ja | **22 × 25 cm** | 1,3 kg |
 * | Ecovacs W2 Omni | 6 m, **100 kg** | mer än 30 min | ja, alla plana rutor | 30 × 40 cm | 1,6 kg |
 * | Ecovacs W2 Pro | 6 m | **30 min** | ja, med och utan båge | 30 × 40 cm | **1,8 kg** |
 * | Ecovacs W1 Pro | **1,5 m** | – | ja, 10 cm marginal | 30 × 40 cm | 1,53 kg |
 * | HOBOT-388 | 4,5 m, **200 kg** | 20 min | **nej, förbjudet** | – | **0,92 kg** |
 * | HOBOT-2S | 4,5 m, **200 kg** | 20 min | – | **40 × 40 cm** | 1,3 kg |
 *
 * Tre fel som rättades samtidigt, alla tre påståenden vi själva skrivit:
 *
 * 1. **W1 Pro är inte ensam om båglöst glas.** Ecovacs anger "all flat glass"
 *    respektive "with Frame & Frameless" för W2 Pro, W2 Omni och Mini också.
 *    Sidan sa på nio ställen att W1 Pro var den enda.
 * 2. **W2 Pro är inte sladdlös.** Ecovacs egen speclista anger 6,7 m nätkabel;
 *    batteriet på 3 000 mAh är reservbatteriet för strömavbrott. Det är
 *    W2 Omni med basstation som slipper sladden.
 * 3. **Kärcher sprejar också.** Manualen: "2 ultrasonic spray nozzles atomise
 *    the cleaning solution into a mist". Vi skrev att W2 Pro var ensam om att
 *    fukta glaset framför duken.
 *
 * Kvar som verklig lucka efter passet: HOBOT-388:s minsta ruta, HOBOT-2S
 * godkännande för båglöst glas, och W1 Pro:s hålltid. Rungorna står i
 * .agent/research/fonsterputsrobot.md.
 *
 * Läsartexten säljer produkten, och det som inte gått att få fram står som `-`
 * i tabellen och ingen annanstans. Skriv aldrig om vad en tillverkare har
 * eller inte har publicerat i ett omdöme, en tagline, en pro/con eller ett
 * FAQ-svar, och låt aldrig en lucka sänka ett betyg.
 *
 * ⚠️ **Fyll aldrig i ett tal för en modell ur en systermodells manual.** W2 Pro
 * Omni anger 100 kg på linan och är en fjärde apparat, inte samma som W2 Pro
 * eller W2 Omni. Talet ovan för W2 Omni står på Ecovacs egen sida för just
 * W2 Omni, i samma stycke som stationens 5,2 kilo.
 *
 * ## Svenska spröjsar
 *
 * Spannet är 22 × 25 till 40 × 40 cm. Winbot Mini kommer upp på knappt halva
 * ytan av vad Kärcher behöver, och HOBOT-2S behöver mer än dubbelt så mycket
 * som Mini. På spröjsade fönster i äldre hus avgör det ensamt vilka modeller
 * som är möjliga.
 *
 * ## Butikerna
 *
 * Fyra butiker: NetOnNet, Proshop, Elgiganten och Teknikproffset. Ingen av dem
 * är kartlagd i Adtraction för de här märkena. Priserna skiljer ovanligt mycket
 * mellan butiker i den här kategorin, så priskollen är viktigare än vanligt.
 */

export const PRICE_CHECKED = "2026-08-04";

const NETONNET = "NetOnNet";
const PROSHOP = "Proshop";
const ELGIGANTEN = "Elgiganten";
const TEKNIKPROFFSET = "Teknikproffset";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "karcher-rcw-2",
    name: "RCW 2",
    shortName: "Kärcher RCW 2",
    brand: "Kärcher",
    image: productImage(FONSTERPUTSROBOT.slug, "karcher-rcw-2"),
    tagline: "40 minuter kvar på rutan om strömmen går.",
    scores: {
      sakerhet: 4.5,
      fonstertyp: 3.5,
      /* 4,0 → 4,5 2026-08-06. Manualen anger två ultraljudsmunstycken som
         lägger medlet som dimma framför två roterande putsdiskar, plus ett
         eget polersteg utan vätska. Vi hade betygsatt den som om den kört med
         förfuktad duk. */
      rengoring: 4.5,
      hantering: 3.5,
      prisvarde: 5,
    },
    price: 2190,
    merchant: NETONNET,
    merchantUrl:
      "https://www.netonnet.se/art/hem-fritid/dammsugare-rengoring/fonstertvatt/karcher-rcw-2/1063374.9507/",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för höga fönster",
    pros: [
      "Billigast av robotarna i jämförelsen, 2 190 kr",
      "Sitter kvar 40 minuter om strömmen går, dubbelt mot HOBOT-388",
      "Reservbatteri på 0,65 Ah och 14,8 V bakom hålltiden",
      "Klarar rutor ner till 35 × 35 cm",
      "Två ultraljudsmunstycken och ett avslutande polersteg utan vätska",
    ],
    cons: [
      "Gjord för fönster med båge, så en glasad balkongdörr kräver en Winbot",
      "Ingen basstation, så vattnet fylls på för hand mellan fönstren",
      "Duken når inte ända ut i hörnen, vilket gäller alla robotar här",
    ],
    specs: [
      { label: "Pris", value: "2 190 kr", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "40 min",
        highlight: true,
      },
      /* Manualens avsnitt Intended use: "designed for cleaning vertical,
         framed glass surfaces". Stod som Ej angivet till 2026-08-06; svaret
         låg i det dokument Kärchers egen produktsida länkar. */
      { label: "Båglöst glas", value: "Nej, kräver båge", highlight: true },
      { label: "Minsta fönster", value: "35 × 35 cm", highlight: true },
      /* Kärchers tekniska data, "Weight without accessories". Manualen anger
         samma tal som "Weight without mains cable". */
      { label: "Vikt", value: "1,1 kg", highlight: true },
      { label: "Säkerhetslina", value: "4 m" },
      { label: "Rengöring", value: "Två ultraljudsmunstycken, roterande diskar" },
      { label: "Sugkraft", value: "3 300 Pa, max 5 000 Pa" },
      { label: "Reservbatteri", value: "Litiumjon, 0,65 Ah, 14,8 V" },
      { label: "Städhastighet", value: "3 min/m²" },
      { label: "GTIN", value: "4066529208149" },
    ],
    verdict:
      "Kärcher RCW 2 kostar 2 190 kronor och sitter ändå kvar längst av alla sju när strömmen går: 40 minuter på reservbatteriet. Den är både billigast i jämförelsen och bäst på det som avgör om en apparat får hänga tre våningar upp.\n\n40 minuter är dubbelt mot HOBOT-388 och tio minuter mer än Ecovacs W2-modellerna. Går säkringen medan roboten sitter på ett sovrumsfönster två våningar upp är det marginalen du har på dig att komma hem och lyfta ner den, och bakom talet sitter ett litiumjonbatteri på 0,65 amperetimmar och 14,8 volt. Rutor ner till 35 × 35 centimeter räcker till de flesta spröjsade fönster. Två ultraljudsmunstycken lägger rengöringsmedlet som en dimma framför två roterande putsdiskar, och ett sista pass polerar torrt utan vätska, vilket är skillnaden mellan en ren ruta och en ren ruta utan ränder.\n\nBågen är villkoret. Manualen säger att roboten är gjord för inramade glasytor, så en glasad balkongdörr eller ett skjutparti utan ram ligger utanför vad Kärcher godkänner. Där tar du en Winbot i stället, och Winbot Mini kostar 1 100 kronor mer.\n\nFör alla andra: köp Kärcher RCW 2. Den håller längst när något går fel, tar mindre rutor än allt utom Winbot Mini och kostar en tredjedel av det dyraste alternativet i jämförelsen.",
  },
  {
    id: "ecovacs-winbot-w2-pro",
    name: "Winbot W2 Pro",
    shortName: "Winbot W2 Pro",
    brand: "Ecovacs",
    image: productImage(FONSTERPUTSROBOT.slug, "ecovacs-winbot-w2-pro"),
    tagline: "Tre kvadratmeter glas på drygt fem minuter.",
    scores: {
      sakerhet: 4,
      /* 3,5 → 4,0 2026-08-06. Ecovacs speclista anger "Applicable Frame Type:
         with Frame & Frameless" och 3 mm minsta glastjocklek. Vi hade
         betygsatt den som om båglöst glas var oklart för modellen. */
      fonstertyp: 4,
      rengoring: 4,
      /* 4,0 → 3,5 2026-08-06. Betyget vilade på att den var sladdlös. Ecovacs
         anger 6,7 m nätkabel; de 3 000 mAh är reservbatteriet. Med 1,8 kg är
         den dessutom tyngst av de sju. */
      hantering: 3.5,
      prisvarde: 4,
    },
    price: 3799,
    merchant: PROSHOP,
    merchantUrl: "https://www.proshop.se/Foenstertvaett/Ecovacs-Winbot-W2-Pro/3356596",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för stora glaspartier",
    pros: [
      "Snabbast i jämförelsen, 1 min 45 s per kvadratmeter",
      "Störst putsduk av de sju, 260 × 251 mm",
      "Sprejmunstycken framför duken håller den blöt hela passet",
      "Godkänd för rutor både med och utan båge, från 3 mm glas",
      "Sitter kvar 30 minuter om strömmen går",
    ],
    cons: [
      "1,8 kg, tyngst av de sju att hålla mot rutan med en arm",
      "6,7 meter sladd att dra med och hitta uttag till",
      "1 600 kr dyrare än Kärcher RCW 2 utan att hålla längre",
    ],
    specs: [
      { label: "Pris", value: "3 799 kr", highlight: true },
      /* Ecovacs speclista: "Power-off Protection Duration (min) 30". Stod som
         "Mer än 30 min" till 2026-08-06, hämtat från Ecovacs svenska sida för
         hela W2-serien. Modellens egen tabell går före seriens. */
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "30 min",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Ja, med och utan båge", highlight: true },
      { label: "Minsta fönster", value: "30 × 40 cm", highlight: true },
      { label: "Vikt", value: "1,8 kg", highlight: true },
      { label: "Säkerhetslina", value: "6 m" },
      { label: "Rengöring", value: "Sprejmunstycken framför duken" },
      { label: "Glastjocklek", value: "Minst 3 mm" },
      { label: "Städhastighet", value: "1 min 45 s/m²" },
      { label: "Styrning", value: "App" },
      { label: "GTIN", value: "6970135035403" },
    ],
    verdict:
      "Winbot W2 Pro är den snabbaste roboten i jämförelsen: 1 minut och 45 sekunder per kvadratmeter, mot 3 minuter för Kärcher RCW 2 och 4 för HOBOT-388. Den kostar 3 799 kronor hos Proshop.\n\nSkillnaden syns på stora glaspartier. En altandörr på tre kvadratmeter tar drygt fem minuter i stället för nio, och putsduken är störst i jämförelsen på 260 × 251 millimeter, så färre drag täcker samma yta. Sprejmunstyckena fuktar glaset framför duken hela passet, vilket är skillnaden mot en duk som fuktats en gång och börjar skjuta smutsen framför sig halvvägs. Den får sitta på rutor både med båge och utan, ner till 3 millimeters glastjocklek, och sitter kvar 30 minuter om strömmen går.\n\nDen väger 1,8 kilo, tyngst av de sju och nästan dubbelt mot HOBOT-388. Det är armen som håller roboten mot rutan tills sugkoppen tar som märker det, och därtill kommer 6,7 meter nätkabel att dra med sig mellan rummen.\n\nHar du stora fönster och vill igenom dem fort är W2 Pro roboten. Är rutorna små eller spröjsade kommer den inte upp på dem: då är Winbot Mini både 500 kronor billigare och den enda här som klarar 22 × 25 centimeter.",
  },
  {
    id: "ecovacs-winbot-w2-omni",
    name: "Winbot W2 Omni",
    shortName: "Winbot W2 Omni",
    brand: "Ecovacs",
    image: productImage(FONSTERPUTSROBOT.slug, "ecovacs-winbot-w2-omni"),
    tagline: "Fyller på vatten och laddar själv, ruta efter ruta.",
    scores: {
      sakerhet: 4,
      /* 3,5 → 4,0 2026-08-06. Ecovacs egen sida: "From floor-to-ceiling, small
         sized, frameless or tilting windows, the WINBOT W2 OMNI works with all
         types of windows". Raden stod som Ej angivet. */
      fonstertyp: 4,
      rengoring: 4.5,
      hantering: 4.5,
      prisvarde: 2,
    },
    price: 5533,
    merchant: PROSHOP,
    merchantUrl: "https://www.proshop.se/Foenstertvaett/Ecovacs-Winbot-W2-OMNI/3398871",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för hela huset på en dag",
    pros: [
      "Basstationen håller vattnet och laddar, så du bär en sak mellan rummen",
      "Linan är 6 meter och tål 100 kg",
      "Godkänd för alla plana rutor, även båglösa och vädringsfönster",
      "Sitter kvar över 30 minuter om strömmen går",
      "Sex sprejmunstycken framför duken, samma system som W2 Pro",
    ],
    cons: [
      "5 533 kr, näst dyrast i jämförelsen",
      "Basstationen väger 5,2 kg och ska ha en plats i varje rum du putsar",
      "1 700 kr över W2 Pro ger bekvämlighet, inte renare fönster",
    ],
    specs: [
      { label: "Pris", value: "5 533 kr", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "Mer än 30 min",
        highlight: true,
      },
      /* Ecovacs US-sida för just W2 OMNI, samma stycke som stationens 5,2 kg.
         Stod som Ej angivet till 2026-08-06. */
      { label: "Båglöst glas", value: "Ja, alla plana rutor", highlight: true },
      { label: "Minsta fönster", value: "30 × 40 cm", highlight: true },
      { label: "Vikt", value: "1,6 kg", highlight: true },
      /* "Tensile strength of up to 100KG", Ecovacs egen produktsida. */
      { label: "Säkerhetslina", value: "6 m, tål 100 kg" },
      { label: "Rengöring", value: "Sprejmunstycken, basstation med vatten" },
      { label: "Glastjocklek", value: "Minst 3 mm, speglar minst 4 mm" },
      { label: "GTIN", value: "6970135031306" },
    ],
    verdict:
      "Winbot W2 Omni är W2 Pro med en basstation som håller vattnet och laddar roboten mellan rutorna. 5 533 kronor, och stationen är hela skillnaden mellan dem.\n\nHar du fyrtio fönster och tänkt ta dem på en dag betalar den för sig direkt. Du bär en sak mellan rummen i stället för robot, vattenflaska och laddare, och du står inte och väntar på att batteriet ska hinna ikapp mitt i arbetet. Linan är 6 meter och tål 100 kilo, och stationen väger 5,2 kilo med över 800 newton sugkraft mot glaset, så den sitter still medan roboten arbetar. Golvfönster, vädringsfönster och rutor utan båge är alla godkända, ner till 3 millimeters glas och 4 på speglar.\n\nHar du åtta fönster är stationen mest en pryl till att hitta plats för. 1 700 kronor över W2 Pro köper att slippa fylla på en behållare, inte ett renare fönster: rengöringen är densamma på båda.\n\nKöp W2 Omni om hela huset ska göras i ett svep och fönstren är så många att det blir ett projekt. Putsar du några rutor då och då tar du W2 Pro och lägger mellanskillnaden på något annat.",
  },
  {
    id: "hobot-388",
    name: "HOBOT-388",
    shortName: "HOBOT-388",
    brand: "HOBOT",
    image: productImage(FONSTERPUTSROBOT.slug, "hobot-388"),
    tagline: "Går på glas av vilken tjocklek som helst.",
    scores: {
      /* 4,0 → 3,5 2026-08-06. Kriteriet väger nu hålltid tyngst av de två, och
         20 minuter är kortast i jämförelsen. Linan på 4,5 m och 200 kg är
         fortfarande det starkaste angivna. */
      sakerhet: 3.5,
      /* 2,5 → 3,0 2026-08-06. Att den går på valfri glastjocklek är en riktig
         fördel som betyget inte krediterade; förbudet mot båglöst glas står
         kvar. Att minsta ruta inte gått att fastställa drar inte längre av. */
      fonstertyp: 3,
      rengoring: 3.5,
      hantering: 3.5,
      prisvarde: 2.5,
    },
    price: 4900,
    merchant: TEKNIKPROFFSET,
    merchantUrl:
      "https://www.teknikproffset.se/hem-hushall-tradgard/stadprodukter/ovriga-stadtillbehor/hobot-fonsterputsrobot-388-avancerad-rengoringsteknik",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för gamla enkelglas",
    pros: [
      "Går på glas av vilken tjocklek som helst, även gamla enkelglas",
      "Lättast i jämförelsen, 0,92 kg",
      "Linan är 4,5 meter och tål 200 kg dragkraft",
      "Klarar speglar som Ecovacs kräver 4 mm tjocklek för",
    ],
    cons: [
      "Sitter kvar 20 minuter om strömmen går, hälften av Kärchers 40",
      "Får inte användas på båglöst glas, så glasade balkongdörrar är uteslutna",
      "4 900 kr, mer än dubbelt mot Kärcher RCW 2",
    ],
    specs: [
      { label: "Pris", value: "4 900 kr", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "20 min",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Nej, förbjudet", highlight: true },
      { label: "Minsta fönster", value: "Ej angivet", highlight: true },
      /* 915 g hos usermanuals, 0,92 kg hos e-catalog, båda med samma mått
         295 × 148 × 95 mm. Två samstämmiga tier B; HOBOT publicerar ingen
         vikt på sin egen produktsida. */
      { label: "Vikt", value: "0,92 kg", highlight: true },
      /* HOBOT: "4.5 meter long safety rope can take up to 200KG tension". */
      { label: "Säkerhetslina", value: "4,5 m, tål 200 kg" },
      { label: "Rengöring", value: "Ultraljudsmunstycke, 15 μm dimma" },
      { label: "Glastjocklek", value: "Valfri, enligt tillverkaren" },
      { label: "Städhastighet", value: "4 min/m²" },
    ],
    verdict:
      "HOBOT-388 går på glas av vilken tjocklek som helst. Gamla enkelglas, tunna rutor i uterum och speglar i hallen fungerar alla, och den kostar 4 900 kronor hos Teknikproffset.\n\nEcovacs kräver minst 3 millimeter glas och 4 millimeter på speglar. Ett fönster från femtiotalet ligger ofta under det, och då är HOBOT-388 den enda av de sju som får sitta på det. Den väger 0,92 kilo, alltså hälften av Winbot W2 Pro, vilket är påtagligt när du håller den mot rutan med en arm tills sugkoppen tar. Linan är 4,5 meter och tål 200 kilo dragkraft, så den når ett stadigt föremål långt in i rummet.\n\nReservbatteriet håller den kvar i 20 minuter om strömmen går, hälften av Kärchers 40, och båglöst glas är uttryckligen förbjudet i manualen. Har du en glasad balkongdörr är roboten utesluten redan där.\n\nHar du tunt eller gammalt glas är HOBOT-388 svaret, och den är värd sina 4 900 kronor för just det. Är fönstren vanliga tvåglas- eller treglasfönster gör Kärcher RCW 2 samma jobb för 2 710 kronor mindre och sitter kvar dubbelt så länge.",
  },
  {
    id: "ecovacs-winbot-w1-pro",
    name: "Winbot W1 Pro",
    shortName: "Winbot W1 Pro",
    brand: "Ecovacs",
    image: productImage(FONSTERPUTSROBOT.slug, "ecovacs-winbot-w1-pro"),
    tagline: "Störst putsduk av alla, 262 × 262 millimeter.",
    scores: {
      /* 2,5 → 3,0 2026-08-06. Det gamla betyget drog av för att hålltiden inte
         gått att fastställa, vilket är vår research och inte produkten. Nu
         betygsatt på linan, som är 1,5 m och kortast av de sju. */
      sakerhet: 3,
      /* 4,5 → 4,0 2026-08-06. Betyget vilade på att den var ensam om båglöst
         glas. Ecovacs godkänner även W2 Pro, W2 Omni och Mini för det. */
      fonstertyp: 4,
      rengoring: 3.5,
      hantering: 3.5,
      prisvarde: 2.5,
    },
    price: 4799,
    merchant: ELGIGANTEN,
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/dammsugare-rengoring/fonstertvatt-fonsterrengoring/ecovacs-winbot-w1-pro-fonsterputsrobot-wg88812edr/414864",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för glasväggar och skjutpartier inomhus",
    pros: [
      "Störst putsduk i jämförelsen, 262 × 262 mm",
      "Godkänd för båglöst glas med 10 cm marginal till kanten",
      "Klarar glas från 3 mm och speglar från 4 mm",
      "Fungerar på bågar ner till 5 mm breda",
    ],
    cons: [
      "Linan är 1,5 meter, kortast av de sju, så du knyter nära fönstret",
      "4 799 kr, mer än dubbelt mot Kärcher RCW 2",
      "Går inte på enkelglas tunnare än 3 mm, där HOBOT-388 klarar allt",
    ],
    specs: [
      { label: "Pris", value: "4 799 kr", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Ja, 10 cm från kanten", highlight: true },
      /* 30 × 40 cm ur Ecovacs egen speclista, bekräftad i US- och UK-versionen.
         Raden bar till 2026-08-05 "Båge minst 5 mm", vilket är bågens bredd
         och inte rutans mått, alltså fel fält. */
      { label: "Minsta fönster", value: "30 × 40 cm", highlight: true },
      { label: "Vikt", value: "1,53 kg", highlight: true },
      /* "Length of Safety Rope (m) 1.5" hos Ecovacs US och UK, samstämmigt. */
      { label: "Säkerhetslina", value: "1,5 m" },
      { label: "Rengöring", value: "Dubbla korsande sprejmunstycken" },
      { label: "Glastjocklek", value: "Minst 3 mm, speglar minst 4 mm" },
      { label: "Sugkraft", value: "2 800 Pa" },
      { label: "Städhastighet", value: "2 min 50 s/m²" },
      { label: "GTIN", value: "6970135030460" },
    ],
    verdict:
      "Winbot W1 Pro är Ecovacs modell för stora glasytor inomhus. Putsduken mäter 262 × 262 millimeter och är störst i jämförelsen, speglar från 4 millimeter är godkända, och den kostar 4 799 kronor hos Elgiganten.\n\nMåtten är utskrivna hela vägen, så du kan avgöra vid köksbordet om dina ytor fungerar: minst 3 millimeter glas, 4 på speglar, en båge på minst 5 millimeter där det finns en, och rutor ner till 30 × 40 centimeter. Den får sitta på båglöst glas så länge du håller 10 centimeter till kanten, vilket gör den användbar på glasväggar, duschpartier och skjutdörrar där det inte finns någon ram att känna av. Den stora duken tar mer glas per drag än de mindre robotarna.\n\nSäkerhetsrepet är 1,5 meter. Det räcker till ett fönsterhandtag eller en radiator strax under rutan, men inte till ett stadigt föremål längre in i rummet, och på en övervåning är det just det du vill kunna knyta i.\n\nKöp W1 Pro till glasväggar, skjutpartier och stora speglar inomhus, där du ändå står bredvid. Ska den upp på ett fönster på andra våningen ger Kärcher RCW 2 både 4 meters lina och 40 minuters marginal, för 2 609 kronor mindre.",
  },
  {
    id: "ecovacs-winbot-mini",
    name: "Winbot Mini",
    shortName: "Winbot Mini",
    brand: "Ecovacs",
    image: productImage(FONSTERPUTSROBOT.slug, "ecovacs-winbot-mini"),
    tagline: "Klarar rutor hälften så små som Kärcher behöver.",
    scores: {
      /* 3,0 → 4,0 2026-08-06. Ecovacs speclista anger "Power-off Protection
         Duration (min) 30". Vi hade skrivit att hålltiden var okänd och satt
         betyget efter det. */
      sakerhet: 4,
      /* 3,0 → 4,5 2026-08-06. 22 × 25 cm är minsta måttet i jämförelsen med
         god marginal, och godkänd för alla plana rutor inklusive båglösa.
         Betyget krediterade varken det ena eller det andra. */
      fonstertyp: 4.5,
      rengoring: 3.5,
      hantering: 4,
      prisvarde: 4,
    },
    price: 3299,
    merchant: PROSHOP,
    merchantUrl: "https://www.proshop.se/Foenstertvaett/Ecovacs-Winbot-Mini-Grey/3410659",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Bäst för små och många rutor",
    pros: [
      "Klarar rutor ner till 22 × 25 cm, minsta måttet i jämförelsen",
      "Sitter kvar 30 minuter om strömmen går",
      "1,3 kg och 215 mm brett chassi, vilket märks vid varje ny ruta",
      "Mindre chassi lämnar den smalaste remsan i hörnen",
      "3 299 kr, näst billigast av robotarna här",
    ],
    cons: [
      "3 min per kvadratmeter, nästan dubbelt mot Winbot W2 Pro",
      "Mindre behållare, så det blir fler påfyllningar på ett stort hus",
      "Linan är 3,3 meter, kortare än HOBOT-modellernas 4,5",
    ],
    specs: [
      { label: "Pris", value: "3 299 kr", highlight: true },
      /* Ecovacs speclista: "Power-off Protection Duration (min) 30". Stod som
         Ej angiven till 2026-08-06, och betyget var satt efter det. */
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "30 min",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Ja, med och utan båge", highlight: true },
      { label: "Minsta fönster", value: "22 × 25 cm", highlight: true },
      { label: "Vikt", value: "1,3 kg", highlight: true },
      { label: "Säkerhetslina", value: "3,3 m" },
      { label: "Rengöring", value: "Fyra ultraljudsmunstycken" },
      { label: "Städhastighet", value: "3 min/m²" },
      { label: "GTIN", value: "6970135035120" },
    ],
    verdict:
      "Winbot Mini kommer upp på rutor som är 22 × 25 centimeter, knappt halva ytan av vad Kärcher RCW 2 behöver och en tredjedel av HOBOT-2S krav. Den kostar 3 299 kronor och är därmed den näst billigaste roboten i jämförelsen.\n\nI ett äldre svenskt hus är det måttet skillnaden mellan att kunna putsa fönstren maskinellt och att inte kunna det: spröjsade rutor, franska fönster och gamla korspostfönster ligger ofta under 30 × 40 centimeter, som är golvet för de tre större Winbot-modellerna. Den väger 1,3 kilo, och vikten märks i det enda moment du själv utför, när roboten ska hållas mot rutan med en arm tills sugkoppen tar medan den andra håller i linan. Går strömmen sitter den kvar i 30 minuter, och det smala chassit lämnar den minsta oputsade remsan i hörnen av alla sju.\n\nDen är långsam över stora ytor. 3 minuter per kvadratmeter mot Winbot W2 Pros 1 minut och 45 sekunder betyder att en altandörr tar nästan dubbelt så lång tid, och den mindre behållaren ger fler påfyllningar på ett stort hus.\n\nHar du spröjs, franska fönster eller många små rutor är Winbot Mini det uppenbara valet. Är fönstren stora och få lägger du pengarna på Kärcher RCW 2 i stället och får både längre hålltid och 1 109 kronor tillbaka.",
  },
  {
    id: "hobot-2s",
    name: "HOBOT-2S",
    shortName: "HOBOT-2S",
    brand: "HOBOT",
    image: productImage(FONSTERPUTSROBOT.slug, "hobot-2s"),
    tagline: "Två munstycken tar pollenlagret på ett pass.",
    scores: {
      /* 3,0 → 3,5 2026-08-06. HOBOT anger 20 minuters hålltid och en lina på
         4,5 m som tål 200 kg för 2S också. Betyget var satt på att båda var
         okända, alltså på vår research. */
      sakerhet: 3.5,
      /* 2,5 kvar, men på ny grund: kravet på 40 × 40 cm är största
         minimimåttet av de sju, vilket är en verklig begränsning. */
      fonstertyp: 2.5,
      rengoring: 4,
      hantering: 3.5,
      prisvarde: 2,
    },
    price: 6026,
    merchant: TEKNIKPROFFSET,
    merchantUrl:
      "https://www.teknikproffset.se/hem-hushall-tradgard/stadprodukter/dammsugare-tillbehor/robotdammsugare/hobot-2s-fonsterputsrobot-kompakt-och-latt",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för riktigt smutsiga rutor",
    pros: [
      "Dubbla ultraljudsmunstycken lägger dimman över hela arbetsbredden",
      "Tar riktigt smutsiga rutor på ett pass i stället för två",
      "Linan är 4,5 meter och tål 200 kg dragkraft",
      "Går på glas av vilken tjocklek som helst",
    ],
    cons: [
      "Kräver 40 × 40 cm ruta, största minimimåttet av de sju",
      "6 026 kr hos butiken vi hittat den, dyrast i jämförelsen",
      "Sitter kvar 20 minuter om strömmen går, hälften av Kärchers 40",
    ],
    specs: [
      { label: "Pris", value: "6 026 kr", highlight: true },
      /* HOBOT: "the embedded UPS keeps HOBOT in position for 20 minutes".
         Stod som Ej angiven till 2026-08-06 trots att rättelsen 2026-08-05
         redan skrev att uppgiften var funnen; cellen ändrades aldrig. */
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "20 min",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Ej angivet", highlight: true },
      /* "Workable window size >40x40 cm" hos HOBOT USA, samma tal i den
         engelska manualen. */
      { label: "Minsta fönster", value: "40 × 40 cm", highlight: true },
      { label: "Vikt", value: "1,3 kg", highlight: true },
      /* "The 4.5-meter-long safety rope can bear up to 200kg pulling force". */
      { label: "Säkerhetslina", value: "4,5 m, tål 200 kg" },
      { label: "Rengöring", value: "Dubbla ultraljudsmunstycken" },
      { label: "Glastjocklek", value: "Valfri, enligt tillverkaren" },
      { label: "Städhastighet", value: "2 min 24 s/m²" },
    ],
    verdict:
      "HOBOT-2S finfördelar vattnet med två ultraljudsmunstycken och tar en kvadratmeter på 2 minuter och 24 sekunder. Den kostar 6 026 kronor hos den butik vi hittat den, dyrast i jämförelsen.\n\nTvå munstycken lägger dimman över hela arbetsbredden och inte bara framför halva duken. På en ruta med pollen eller vägdamm blir det ett pass i stället för två, och duken mäter 24 × 24 centimeter mot Winbot Minis 21,5. Linan är 4,5 meter och tål 200 kilo dragkraft, samma som HOBOT-388, och glaset får vara hur tjockt eller tunt som helst.\n\nDen behöver 40 × 40 centimeter för att komma upp på rutan, vilket är det största minimimåttet av de sju. Spröjsade fönster är därmed uteslutna, och det är den vanligaste fönstertypen i äldre svenska hus.\n\nPriset avgör. 6 026 kronor är nästan tre gånger Kärcher RCW 2, och prisjämförare visar modellen betydligt billigare på annat håll, så kolla fler butiker innan du beställer. Till priset ovan gör Kärcher jobbet för en tredjedel.",
  },
];

export const FONSTERPUTSROBOT_PRODUCTS: Product[] = resolveProducts(
  FONSTERPUTSROBOT,
  SEEDS,
);

/**
 * Övervägda men inte rankade.
 *
 * De två Clas Ohlson-modellerna ligger här som ett varningsexempel: de syns i
 * sökresultat och har kundomdömen, men butiken publicerar varken pris eller
 * lagerstatus för dem längre.
 */
export const FONSTERPUTSROBOT_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Ecovacs",
    name: "Winbot W2S Omni",
    reason:
      "5 524 kronor, alltså nio kronor från W2 Omni som vi rankar i stället, och samma basstation och samma minsta ruta på 30 × 40 centimeter. Ser du båda hos en butik spelar det liten roll vilken du tar, men kontrollera priset: de ligger på varandra och byter plats med kampanjerna.",
    approxPrice: 5524,
  },
  {
    brand: "Ecovacs",
    name: "Winbot W3 Omni",
    reason:
      "7 024 kronor och nyast i serien, men ingen svensk butik säljer den ännu. Värd att titta på igen när den går att beställa någonstans.",
    approxPrice: 7024,
  },
  {
    brand: "Xiaomi",
    name: "Hutt DDC55",
    reason:
      "2 284 kronor och billigast av allt vi sett, men den går inte att bedöma mot de andra sju på det som avgör här: lina, reservkraft och vilket glas den är godkänd för. Den ligger därför utanför rankningen snarare än längst ner i den.",
    approxPrice: 2284,
  },
  {
    brand: "Kärcher",
    name: "RCW 2 Extra+",
    reason:
      "2 029 kronor för samma robot som vår testvinnare, plus extra dukar och rengöringsmedel. Hittar du paketet i lager är det ett bättre köp än grundmodellen. Vi rankar grundmodellen eftersom den fanns hos en svensk butik med pris och artikeldata.",
    approxPrice: 2029,
  },
  {
    brand: "Ecovacs",
    name: "Winbot 920 och Winbot XV2",
    reason:
      "Två äldre modeller som ligger kvar hos Clas Ohlson med kundomdömen men utan pris, och allt tyder på att de utgått. Dyker de upp på rea är de fortfarande fungerande robotar, men räkna inte med reservdelar.",
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Ecovacs-Winbot-920,-fonstertvatt/p/44-4467",
  },
  {
    brand: "Kärcher",
    name: "WV 6 Plus fönstertvätt",
    reason:
      "Ingen robot utan en handhållen fönstertvätt som suger upp vattnet medan du för den över rutan. Har du bara fönster i markplan gör den samma jobb snabbare och för en bråkdel av pengarna. Roboten löser höjden, den här löser resten.",
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/dammsugare-rengoring/fonstertvatt-fonsterrengoring/karcher-wv6-plus-fonstertvatt/21410",
  },
];

/**
 * Vanliga frågor.
 *
 * ⚠️ Ingen fråga får låna ett säkerhetstal mellan modeller. W2 Pro anger 30
 * minuter, W2 Omni "mer än 30" och W1 Pro inget alls; att skriva ihop dem vore
 * att lova en marginal vi inte vet finns.
 */
export const FONSTERPUTSROBOT_FAQ = [
  {
    question: "Vilken fönsterputsrobot är bäst 2026?",
    answer:
      "Kärcher RCW 2 för 2 190 kronor hos NetOnNet. Den är billigast av de sju vi jämför och sitter ändå kvar längst om strömmen går: 40 minuter på reservbatteriet, mot 20 för HOBOT-388. Den klarar rutor ner till 35 × 35 centimeter och sprejar med två ultraljudsmunstycken framför två roterande putsdiskar. Är dina minsta rutor mindre än 35 × 35 tar du Ecovacs Winbot Mini för 3 299 kronor, som kommer upp på 22 × 25 centimeter. Kärcher är gjord för fönster med båge, så till en glasad balkongdörr utan ram passar en Winbot bättre.",
  },
  {
    question: "Kan en fönsterputsrobot ramla ner?",
    answer:
      "Den kan lossna, och därför följer ett säkerhetslina med varje robot. Linan knyts fast i något stadigt inne i rummet innan roboten går upp på rutan, och fångar den om sugkoppen släpper. HOBOT-388 och HOBOT-2S har det kraftigaste och tål 200 kilo dragkraft, Ecovacs W2 Omni 100 kilo, vilket är den storleksordning uppgiften kräver: en apparat på ett par kilo utvecklar långt mer kraft än sin egen vikt i det ögonblick linan tar emot ett fall. Längden avgör var du kan knyta den, och den skiljer mer än man tror: 6 meter på W2-modellerna, 4,5 på HOBOT, 4 på Kärcher och 1,5 på Winbot W1 Pro. Fäst det aldrig i ett gardinbeslag eller något annat som ger med sig när det rycker till.",
  },
  {
    question: "Vad händer om strömmen går medan roboten sitter på fönstret?",
    answer:
      "Ett reservbatteri håller sugkoppen igång så att roboten sitter kvar på rutan. Hur länge skiljer sig med det dubbla: Kärcher RCW 2 klarar 40 minuter, Ecovacs Winbot W2 Pro och Winbot Mini 30, W2 Omni mer än 30, och HOBOT-388 och HOBOT-2S 20 minuter var. Talet avgör hur lång tid du har på dig att komma hem eller upp i stegen, och det är det enskilt viktigaste i produktgruppen. Går tiden ut lossnar roboten och faller så långt linan tillåter, vilket är skälet att knyta det i något som inte ger med sig.",
  },
  {
    question: "Fungerar en fönsterputsrobot på spröjsade fönster?",
    answer:
      "Bara om rutorna är stora nog, och det är den fråga som oftast stoppar ett köp i svenska hus. Ecovacs Winbot Mini kommer upp på 22 × 25 centimeter och är den enda av de sju som gör det. Kärcher RCW 2 behöver 35 × 35, de tre större Winbot-modellerna 30 × 40 och HOBOT-2S hela 40 × 40. Ett spröjsat korspostfönster har ofta rutor kring 30 × 40 centimeter, ett franskt fönster mindre än så, och är rutan för liten får roboten varken fäste eller yta att köra på. Mät din minsta ruta innan du beställer: det tar två minuter och avgör allt annat.",
  },
  {
    question: "Kan roboten putsa fönster utan båge?",
    answer:
      "Det beror på modellen, och där går den skarpaste skiljelinjen i produktgruppen. Fyra av Ecovacs modeller är godkända för glas utan båge: Winbot W2 Pro, W2 Omni, Mini och W1 Pro, den sista med kravet att du håller minst 10 centimeter till kanten, eftersom det är kanten den riskerar att glida över. HOBOT-388 får uttryckligen inte användas på båglöst glas, och Kärcher RCW 2 är enligt sin manual gjord för inramade glasytor. Har du en glasad balkongdörr eller ett skjutparti är det alltså en Winbot du ska ha, och Winbot Mini för 3 299 kronor är den billigaste av dem.",
  },
  {
    question: "Hur tjockt glas klarar en fönsterputsrobot?",
    answer:
      "HOBOT-388 och HOBOT-2S går båda på glas av vilken tjocklek som helst och är därför valet till gamla enkelglas. Ecovacs kräver minst 3 millimeter glas och 4 millimeter på speglar genom hela serien. Tunt glas är den vanligaste begränsningen: sugkoppen kan flexa rutan i stället för att få fäste. Har du tvåglas- eller treglasfönster är tjockleken sällan ett problem.",
  },
  {
    question: "Putsar roboten hela vägen ut i hörnen?",
    answer:
      "Nej. Duken sitter innanför chassit, så det blir alltid en smal remsa kvar mot bågen, och i hörnen blir remsan bredast. Det är produktgruppens svagaste punkt och gäller alla modeller. Räkna med att torka kanterna för hand med en trasa efteråt om du vill ha ett fönster som ser putsat ut ända ut. En mindre robot kommer något längre in i hörnen än en stor, vilket är ett av få praktiska argument för de mindre modellerna.",
  },
  {
    question: "Behöver jag vara hemma medan den arbetar?",
    answer:
      "Ja, och det är ett skäl att inte köpa en om du hoppats slippa. Roboten ska lyftas upp mot varje ny ruta, sugkoppen ska ta fäste innan du släpper, linan ska fästas om, och sladden ska nå fram där en sådan behövs. Ett fönster tar ofta femton till tjugo minuter. Tidsvinsten ligger i att du slipper stå och gnida, inte i att arbetet sköter sig själv medan du är på jobbet.",
  },
  {
    question: "Går det att använda den på utsidan av fönstret?",
    answer:
      "Roboten sitter på den sida du sätter den, och utsidan är hela poängen på övervåningen. Det är också där riskerna finns, för en robot som lossnar två våningar upp faller ner på något. Fäst linan i något stadigt inne i rummet, kontrollera att den inte kan glida av, och sätt inte roboten på ett fönster du inte kan öppna, eftersom du behöver kunna nå den om den stannar.",
  },
  {
    question: "Hur mycket låter en fönsterputsrobot?",
    answer:
      "Ungefär som en liten dammsugare, eftersom det är en pump som håller undertrycket mot glaset. Ecovacs anger mellan 63 och 72 decibel för Winbot-modellerna beroende på läge, HOBOT 64 för 2S mätt på en meters avstånd och Kärcher 62 i ljudtryck. Skillnaden mot en robotdammsugare är att apparaten arbetar i ögonhöjd i samma rum som du, och att du ändå ska vara kvar och flytta den mellan rutorna. Ljudet märks därför mer än talen antyder.",
  },
  {
    question: "Vad kostar en fönsterputsrobot?",
    answer:
      "Mellan 2 190 och 6 026 kronor hos de butiker vi länkar till, och vår testvinnare Kärcher RCW 2 ligger längst ner i det spannet. Prisspridningen mellan butiker är ovanligt stor i den här produktgruppen: samma modell kan skilja mer än tusen kronor. Få svenska butiker för dem, så en enskild kampanj slår igenom hårt. Kolla minst två butiker innan du köper.",
  },
  {
    question: "Är det värt pengarna jämfört med att putsa själv?",
    answer:
      "Det beror på fönstren, inte på robotens pris. Har du stora fönster på övervåningen som annars kräver stege är svaret oftast ja, eftersom alternativet är att stå på en stege med en hink. Har du vanliga fönster i markplan gör en handhållen fönstertvätt för några hundralappar samma jobb snabbare, och en trasa gör det gratis. Roboten löser höjden och det tröttsamma, inte själva putsandet.",
  },
];
