import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { SMART_BELYSNING } from "@/lib/categories";
import { productImage } from "@/lib/images";

/**
 * Real products for /smart-belysning.
 *
 * Prices, product names, GTINs and merchant URLs were read from the retailers'
 * own product pages on PRICE_CHECKED, and the URLs below are the canonical
 * ones after redirects. Kjell in particular 302s from its campaign paths, and
 * linking to a redirect wastes a hop for both the reader and the crawler.
 *
 * AFFILIATE-SWAP — `merchantUrl` is what ships in the href today: direct,
 * untracked, dofollow. No `affiliateUrl` anywhere yet, by decision: we do not
 * apply to any Adtraction program until at least 16 pages exist. See
 * lib/links.ts.
 *
 * ## testomdome, infört retroaktivt 2026-08-01
 *
 * Tre av fem lampor saknar ett publicerat omdöme om just den modell vi rankar,
 * och fältet utelämnas då i stället för att gissas. `weightedRating` fördelar
 * om vikten och sidan skriver "Ej testat" på raden.
 *
 * Två av utelämnandena beror på att testet gäller en **annan produkt** än den
 * som namnet antyder, vilket är lätt att missa:
 *
 * - Ljud & Bild testar "Nanoleaf **Lines**", en ljusstav, inte Essentials E27.
 * - Tek.no testar "TP-Link **LB120**", inte Tapo L530E.
 *
 * Det tredje, IKEA, är ett generationsproblem: Tek.no 2017 och Dinside 2019
 * handlar om Trådfri-systemet i dess första år, inte om dagens TRÅDFRI E27 med
 * vitt spektrum. Se motiveringen i lib/categories.ts.
 *
 * ⚠️ Utmärkelserna bakom Hues och WiZ betyg är matchade på **modellnamn, inte
 * GTIN**. Råd & Rön skriver "Hue White and color ambiance" och "Wiz E27 A60
 * 922-65 RGB". Att 922-65 betyder 2200-6500 K RGB och alltså är vår
 * `wiz-color-a60-e27` är en tolkning. Innan en synlig utmärkelsebadge byggs
 * enligt IDÉ-001 måste matchningen bekräftas, eftersom fel produkt bakom en
 * utmärkelse är värre än ingen utmärkelse alls.
 *
 * ⚠️ STILL NOT PUBLISHABLE. The criterion scores below are editorial judgement
 * derived from the sourced tests in lib/sources.ts, not measurements, and the
 * Prices move; re-run the check before launch.
 */

export const PRICE_CHECKED = "2026-08-01";

const SEEDS: ProductSeed[] = [
  {
    id: "philips-hue-color-ambiance-e27",
    userRating: { value: 5, count: 73, checkedAt: PRICE_CHECKED },
    brand: "Philips Hue",
    name: "Color Ambiance E27 1100 lm",
    image: productImage(SMART_BELYSNING.slug, "philips-hue-color-ambiance-e27"),
    tagline:
      "Dyrast per lampa, men färgåtergivningen och appen är fortfarande i en egen klass.",
    scores: {
      fargatergivning: 5,
      dimring: 5,
      anslutning: 5,
      /* Råd & Rön: "får också högst samlat betyg i testet och vi utser den
         till Bäst i test". Tek.no gav den best-i-test i sitt samletest, och
         både TechRadar och Expert Reviews är positiva. Det tyngsta underlaget
         för någon enskild produkt i hela projektet. */
      testomdome: 5,
      ljusstyrka: 5,
      prisvarde: 2.5,
    },
    price: 599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/philips-hue/philips-hue-ljuskallor/philips-hue-color-ambiance-smart-led-lampa-e27-1100-lm-p51501",
    award: "winner",
    superlative: "Bäst i test",
    pros: [
      "Renaste färgåtergivningen av lamporna i jämförelsen",
      "Zigbee håller anslutningen även genom betongvägg",
      "Fungerar med Google, Alexa, HomeKit och Matter via bryggan",
    ],
    cons: [
      "Nästan sex gånger priset på billigaste alternativet",
      "Kräver bryggan för fjärrstyrning och scheman",
    ],
    specs: [
      { label: "Ljusflöde", shortLabel: "Lumen", value: "1 100 lm", highlight: true },
      { label: "Färgtemperatur", shortLabel: "Kelvin", value: "2 000–6 500 K", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee + Bluetooth", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "9 W" },
      { label: "Matter", value: "Via Hue Bridge" },
    ],
    verdict:
      "Hue kostar mest per lampa och behöver dessutom bryggan för att bli riktigt användbar. Ändå hamnar den överst. Testerna vi gått igenom är påfallande eniga om två saker: färgerna är renare än hos konkurrenterna, och anslutningen är den som håller när lamporna blir många. Ska du ha fem lampor är prisskillnaden hanterbar. Ska du ha trettio är det en annan diskussion.",
  },
  {
    id: "nanoleaf-essentials-e27",
    brand: "Nanoleaf",
    name: "Essentials Smart E27 (Matter)",
    shortName: "Essentials E27 Matter",
    image: productImage(SMART_BELYSNING.slug, "nanoleaf-essentials-e27"),
    tagline: "Matter över Thread rakt av, utan brygga och utan omvägar.",
    scores: {
      fargatergivning: 4.5,
      dimring: 4,
      anslutning: 5,
      /* testomdome utelämnas: Ljud & Bild testar Nanoleaf Lines, en ljusstav,
         inte Essentials E27. Ingen oberoende part har testat vår modell. */
      ljusstyrka: 4.5,
      prisvarde: 4,
    },
    price: 232,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Nanoleaf-Essentials-Smart-E27-Bulb-Matter/3170357",
    award: "runnerup",
    superlative: "Bäst för Thread-hem",
    pros: [
      "Matter över Thread utan brygga",
      "Svarar nästan omedelbart med en Thread border router",
      "Fungerar i alla fyra ekosystem samtidigt",
    ],
    cons: [
      "Kräver en Thread border router för full nytta",
      "Appen är rörigare än Hues",
    ],
    specs: [
      { label: "Ljusflöde", shortLabel: "Lumen", value: "1 100 lm", highlight: true },
      { label: "Färgtemperatur", shortLabel: "Kelvin", value: "2 700–6 500 K", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Thread + Matter", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "8,5 W" },
      { label: "Matter", value: "Inbyggt" },
    ],
    verdict:
      "En av få lampor som kör Matter över Thread utan mellanled. Har du en HomePod, Apple TV, nyare Nest Hub eller Dirigera hemma har du redan den border router som krävs, och då svarar lampan snabbare än Wi-Fi-alternativen. Har du ingen faller den tillbaka på Bluetooth och tappar mycket av poängen.",
  },
  {
    id: "tp-link-tapo-l530e",
    brand: "TP-Link",
    name: "Tapo L530E RGBW E27",
    image: productImage(SMART_BELYSNING.slug, "tp-link-tapo-l530e"),
    tagline: "Wi-Fi direkt i lampan. Smidigt i början, trängre vid tolfte lampan.",
    scores: {
      fargatergivning: 3.5,
      dimring: 3.5,
      anslutning: 3.5,
      /* testomdome utelämnas: Tek.no testar TP-Link LB120, inte Tapo L530E.
         Det omdömet ("Svakt") gäller en annan lampa och får inte smittas hit. */
      ljusstyrka: 4,
      prisvarde: 4,
    },
    price: 299,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Power",
    merchantUrl:
      "https://www.power.se/smart-home/smart-belysning/smarta-glodlampor/tp-link-tapo-l530e-rgbw-smart-ljuskalla-e27/p-1173881/",
    superlative: "Enklast att komma igång med",
    pros: [
      "Ingen brygga behövs",
      "Tydlig app med bra schemaläggning",
      "Inbyggd energimätning",
    ],
    cons: [
      "Belastar wifi-nätet när lamporna blir många",
      "Märkbar fördröjning vid röststyrning",
    ],
    specs: [
      { label: "Ljusflöde", shortLabel: "Lumen", value: "806 lm", highlight: true },
      { label: "Färgtemperatur", shortLabel: "Kelvin", value: "2 500–6 500 K", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Wi-Fi 2,4 GHz", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "8,7 W" },
      { label: "Matter", value: "Nej" },
    ],
    verdict:
      "Den enklaste vägen in: skruva i, öppna appen, klart. Priset du betalar kommer senare. Varje lampa tar en plats på nätverket, och runt tio enheter börjar en vanlig router klaga. Saknar dessutom Matter, vilket gör den beroende av att TP-Link fortsätter driva sin molntjänst.",
  },
  {
    id: "ikea-tradfri-e27",
    userRating: { value: 3.3, count: 7, checkedAt: PRICE_CHECKED },
    brand: "IKEA",
    name: "TRÅDFRI E27 806 lm, vitt spektrum",
    shortName: "TRÅDFRI E27 806 lm",
    image: productImage(SMART_BELYSNING.slug, "ikea-tradfri-e27"),
    tagline: "Billigast per lumen, men färgversionen finns inte längre.",
    scores: {
      fargatergivning: 3,
      dimring: 3.5,
      anslutning: 4.5,
      /* testomdome utelämnas: Tek.no 2017 och Dinside 2019 testar
         Trådfri-systemet i dess första år, inte dagens E27 med vitt spektrum.
         Se lib/categories.ts för hela motiveringen. */
      ljusstyrka: 4,
      prisvarde: 5,
    },
    price: 99,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "IKEA",
    merchantUrl:
      "https://www.ikea.com/se/sv/p/tradfri-led-ljuskaella-e27-806-lumen-smart-tradloes-dimbar-vitt-spektrum-klar-globformad-30486788/",
    award: "budget",
    superlative: "Bäst prisvärde",
    pros: [
      "Lägsta pris per lumen i jämförelsen",
      "Zigbee, så den belastar inte wifi-nätet",
      "Går att para mot en Hue Bridge",
    ],
    cons: [
      "Endast vitt spektrum, ingen färg",
      "Kräver Dirigera eller annan Zigbee-hubb för fjärrstyrning",
    ],
    specs: [
      { label: "Ljusflöde", shortLabel: "Lumen", value: "806 lm", highlight: true },
      { label: "Färgtemperatur", shortLabel: "Kelvin", value: "2 200–4 000 K", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "8,4 W" },
      { label: "Matter", value: "Via Dirigera" },
    ],
    verdict:
      "Ska du lysa upp ett helt hem blir prisskillnaden mot Hue snabbt flera tusen kronor, och Zigbee gör att lamporna bildar eget nät i stället för att tynga routern. Två saker att veta: färgversionen av TRÅDFRI E27 säljs inte längre på ikea.se, så det här är vitt spektrum, och du behöver Dirigera för att styra dem utanför hemmet.",
  },
  {
    id: "wiz-color-a60-e27",
    userRating: { value: 4.5, count: 31, checkedAt: PRICE_CHECKED },
    brand: "WiZ",
    name: "Color A60 E27 806 lm",
    image: productImage(SMART_BELYSNING.slug, "wiz-color-a60-e27"),
    tagline: "Färg för hundralappen. Gör jobbet, men inte mycket mer.",
    scores: {
      fargatergivning: 3,
      dimring: 2.5,
      anslutning: 3.5,
      /* Råd & Rön: "vi ger den utmärkelsen Bra köp". Inte högre än 3,5, för
         samma test skriver att betyget "dras ner av att den är krånglig att
         installera och att det saknas såväl länk till som namn på den
         tillhörande appen". En utmärkelse med uttalat förbehåll. */
      testomdome: 3.5,
      ljusstyrka: 3.5,
      prisvarde: 5,
    },
    price: 103,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/belysning-lampor/smart-belysning/smarta-e27-lampor/wiz-color-a60-smart-led-lampa-e27-806-lm-p52140",
    superlative: "Billigast med färg",
    pros: [
      "Färg till ungefär en sjättedel av Hues pris",
      "Ingen brygga behövs",
      "Går att styra med vanlig strömbrytare",
    ],
    cons: [
      "Svagast färgåtergivning i jämförelsen",
      "Flimmer rapporteras vid låg dimring",
      "Wi-Fi, med samma takproblem som Tapo",
    ],
    specs: [
      { label: "Ljusflöde", shortLabel: "Lumen", value: "806 lm", highlight: true },
      { label: "Färgtemperatur", shortLabel: "Kelvin", value: "2 200–6 500 K", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Wi-Fi + Bluetooth", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "8,8 W" },
      { label: "Matter", value: "Nej" },
    ],
    verdict:
      "Vill du bara ha färgat ljus i en läslampa är WiZ svår att argumentera emot på pris. Skillnaden mot de dyrare lamporna syns när du dimrar ner: flera av testerna vi gått igenom noterar synligt flimmer i nedre registret, och färgerna är blekare. Som komplement fungerar den bra, som grund för hela hemmet mindre bra.",
  },
];

export const SMART_BELYSNING_PRODUCTS = resolveProducts(SMART_BELYSNING, SEEDS);

/**
 * Looked at, left out. Every reason here is a real one that a reader can check
 * against the product page, not a hedge.
 */
export const SMART_BELYSNING_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "LIFX",
    name: "Colour 1200 lm E27",
    approxPrice: 738,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/LIFX-Colour-1200-Lumens-E27/2940657",
    reason:
      "Starkast färger av allt vi tittat på och ljusast av alla, men priset ligger över Hue utan att ge vare sig brygga eller mesh-nät. Wi-Fi i den prisklassen är svårt att motivera.",
  },
  {
    brand: "Philips Hue",
    name: "White Ambiance 9,5 W E27",
    approxPrice: 349,
    merchant: "NetOnNet",
    merchantUrl:
      "https://www.netonnet.se/art/smarta-hem/system-varumarke/philipshue/philips-hue-white-ambiance-95w-e27/231554.14004/",
    reason:
      "Samma system som testvinnaren men utan färg. Är du helt säker på att du aldrig vill ha färgat ljus är den ett rimligt köp, annars är prisskillnaden för liten för att spara på.",
  },
  {
    brand: "Yeelight",
    name: "Smart LED E27 1S",
    approxPrice: 213,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Yeelight-Smart-LED-E27-1S-Dimmbar/2829321",
    reason:
      "Bra app och stabil anslutning, men sortimentet i svenska butiker är ojämnt och priset hoppar kraftigt. Svårt att rekommendera något du kanske inte hittar om ett halvår.",
  },
  {
    brand: "Nedis",
    name: "SmartLife LED E27",
    approxPrice: 153,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Nedis-SmartLife-LED-Lampor/3067255",
    reason:
      "Billig och fungerande, men saknar Matter och har den svagaste dimringen av allt vi tittat på. WiZ gör samma sak bättre för ungefär samma pengar.",
  },
  {
    brand: "Govee",
    name: "Smart Wi-Fi och Bluetooth E27",
    approxPrice: 149,
    merchant: "Webhallen",
    merchantUrl:
      "https://www.webhallen.com/se/product/358018-Govee-Smart-Wifi-Bluetooth-Light-Bulb-E27",
    reason:
      "Prisvärd och ljusstark, men appen kräver konto och samlar mer data än nödvändigt. Vi väntar på en version som går att köra utan molnkonto.",
  },
  {
    brand: "IKEA",
    name: "TRÅDFRI E14 806 lm, färg",
    approxPrice: 129,
    merchant: "IKEA",
    merchantUrl:
      "https://www.ikea.com/se/sv/p/tradfri-led-ljuskaella-e14-806-lumen-tradloes-dimbar-faergat-och-vitt-spektrum-klot-opalvit-80547464/",
    reason:
      "Utesluten på sockel, inte på kvalitet. Värd att känna till ändå: IKEA säljer fortfarande färgade TRÅDFRI i E14, trots att färgversionen i E27 har utgått. Har du E14-sockel finns alltså färg kvar för 129 kronor.",
  },
];

/**
 * Mirrors the buying guide: every question the guide answers has an entry
 * here, phrased the way people search rather than the way we write headings.
 *
 * The duplication is deliberate. The guide is for someone reading top to
 * bottom; this is for someone who arrived with one question, and for the
 * FAQPage markup that can surface a single answer directly in search. Answers
 * are self-contained so neither context depends on the other.
 */
export const SMART_BELYSNING_FAQ = [
  {
    question: "Behöver jag en brygga för att styra smarta lampor?",
    answer:
      "Inte alltid. Wi-Fi-lampor som Tapo och WiZ ansluter direkt, och Nanoleaf Essentials kör Matter över Thread utan brygga. Philips Hue och IKEA TRÅDFRI kör Zigbee och behöver en brygga för fjärrstyrning och scheman, även om Hue går att styra via Bluetooth på kort håll.",
  },
  {
    question: "Hur många smarta lampor klarar ett vanligt hemnätverk?",
    answer:
      "Räkna med runt tio Wi-Fi-lampor innan en normal router börjar tappa i prestanda. Ska du ha fler är Zigbee eller Thread ett bättre val, eftersom lamporna då bildar ett eget nät i stället för att var och en ta en plats på wifi-nätet.",
  },
  {
    question: "Fungerar smarta lampor med vanliga strömbrytare?",
    answer:
      "Ja, men bara när strömbrytaren står på. Slår du av strömmen försvinner lampan ur appen tills den slås på igen. Många ersätter därför den vanliga brytaren med en trådlös scenbrytare ovanpå.",
  },
  {
    question: "Säljer IKEA fortfarande färgade TRÅDFRI-lampor?",
    answer:
      "Inte i E27-sortimentet på ikea.se. När vi kontrollerade fanns TRÅDFRI E27 kvar med vitt spektrum, medan de färgade varianterna leder vidare till serieöversikten. Vill du ha färg billigt är WiZ Color A60 det närmaste alternativet i den här jämförelsen.",
  },
  {
    question: "Lönar det sig att köpa smarta lampor?",
    answer:
      "Det beror helt på var du sätter dem. Det lönar sig när du styr ljus du annars inte styr, som utomhusbelysning som ska följa årstiden eller en hall som tänds när någon kommer hem, och när ljuset ska ändra karaktär under dygnet med varmt på kvällen och kallare på morgonen. Det lönar sig sällan i ett rum med en enda lampa och en strömbrytare inom räckhåll, eftersom det går fortare att sträcka sig efter brytaren än att lyfta telefonen. I utrymmen du knappt använder lönar det sig inte alls: en smart lampa i en garderob drar ström dygnet runt för att kunna tändas i tio minuter. Rådet är att köpa två lampor till det rum där du faktiskt vill att ljuset ska förändras, leva med dem i en månad och köpa resten sedan.",
  },
  {
    question: "Hur många lumen behöver jag i vardagsrummet?",
    answer:
      "Räkna med 100 till 150 lumen per kvadratmeter i allmänbelysning. Ett vardagsrum på 20 kvadratmeter landar alltså på 2 000 till 3 000 lumen totalt, vilket motsvarar ungefär tre lampor på 806 lumen. Ett kök behöver det dubbla per kvadratmeter. Fördela ljuset på flera ljuspunkter i stället för en stark lampa i taket, för samma antal lumen upplevs helt olika beroende på hur många ställen det kommer från.",
  },
  {
    question: "Vad motsvarar en 60-wattslampa i lumen?",
    answer:
      "Ungefär 806 lumen. Watt mäter hur mycket ström lampan drar och säger ingenting om hur mycket den lyser, vilket bara fungerade som jämförelse så länge alla lampor var glödlampor. En LED på runt 9 W ger lika mycket ljus som den gamla 60-wattaren. Andra vanliga motsvarigheter: 40 W blir 470 lumen, 75 W blir 1 055 lumen och 100 W blir 1 521 lumen.",
  },
  {
    question: "Drar smarta lampor ström när de är släckta?",
    answer:
      "Ja. Radion måste vara vaken för att kunna ta emot kommandot att tända, och det kostar ungefär tre tiondels watt per lampa dygnet runt. I kronor är det sällan mycket. Det intressanta är andelen: en lampa som lyser tio minuter om dagen kan förbruka mer i viloläge än i drift, medan samma lampa i ett vardagsrum inte gör det. Slutsatsen är inte att låta bli, utan att inte sätta smarta lampor i utrymmen du knappt använder.",
  },
  {
    question: "Vad är CRI och vilket värde ska jag välja?",
    answer:
      "CRI är färgåtergivning på en skala till 100 och beskriver hur naturligt lampan återger färger jämfört med dagsljus. Åttio är golvet för en anständig lampa. Nittio och uppåt är där det märks i praktiken: mat ser aptitlig ut, träslag får rätt ton och hudfärg ser levande ut i stället för grå. Skillnaden syns tydligast i kök och badrum, alltså där du tittar på mat och på dig själv. I en hall spelar det mindre roll.",
  },
  {
    question: "Varför flimrar min LED-lampa när jag dimrar ner?",
    answer:
      "LED dimras nästan alltid genom att lampan slås av och på snabbare än ögat hinner uppfatta. Ju lägre du dimrar desto längre blir pauserna, och vid någon punkt börjar det synas. På en billig lampa ligger den punkten runt tjugo procent, vilket är precis där man vill ha ljuset på kvällen. De flesta ser inte flimret direkt utan känner det som att de blir trötta i ögonen. Ett enkelt test: filma lampan med mobilkameran och dimra ner, för blir det ränder i bilden flimrar den.",
  },
  {
    question: "Vilken färgtemperatur ska jag välja?",
    answer:
      "Ska du bara ha en inställning är 2 700 K det tryggaste valet i ett hem, eftersom det motsvarar en gammal glödlampa. Lägre tal ger varmare ljus: 2 200 K är levandeljusvarmt, medan 6 500 K är kallt dagsljus som väcker på morgonen men blir obehagligt på kvällen. De flesta vill ha varmt på kvällen och kallare på morgonen, vilket är hela poängen med en lampa som klarar båda.",
  },
  {
    question: "Vad är skillnaden mellan smart lampa, smart strömbrytare och smart uttag?",
    answer:
      "Välj smart lampa när du bryr dig om ljuset självt, eftersom färg, färgtemperatur och dimring bara finns där. Välj smart strömbrytare när du har många lampor i samma tak och bara vill kunna tända och släcka dem, för då styr en brytare hela armaturen oavsett hur många sockar den rymmer. Välj smart uttag när det du vill styra står på golvet, som en golvlampa eller julbelysning. De flesta hem slutar med en blandning av alla tre.",
  },
  {
    question: "Vilken sockel har min lampa?",
    answer:
      "Sockeln står nästan alltid tryckt på sidan av den gamla lampan. E27 är den stora skruvsockeln och den vanligaste i svenska taklampor. E14 är den lilla skruven, vanlig i kronor och vägglampor. GU10 är en tvåpinnars vridsockel för spotlights i tak, och G9 är en liten tvåpinnars som ersätter halogen. Alla lampor i den här jämförelsen är E27. Fel sockel är det vanligaste felköpet och det enda som gör lampan helt oanvändbar.",
  },
  {
    question: "Får jag installera smarta strömbrytare själv?",
    answer:
      "Nej. I Sverige får du byta ljuskälla, sätta stickpropp på en sladd och byta en trasig lamphållare i en lampa med sladd. Att dra ny fast installation, byta väggströmbrytare eller koppla in en dimmer i väggen kräver behörig elektriker. Det är därför smarta lampor och smarta uttag är så populära: de kräver ingen installation alls. Reglerna finns hos Elsäkerhetsverket och gäller oavsett hur enkelt en engelskspråkig guide får det att låta.",
  },
];
