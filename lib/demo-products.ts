import { resolveProducts, type ProductSeed } from "@/lib/products";
import { SMART_BELYSNING } from "@/lib/test-pages";

/**
 * Styleguide fixtures only. Prices, scores and verdicts are invented — nothing
 * here may be published. Real category data will live next to its MDX page.
 * Merchant URLs are inert placeholders — real data lives in lib/data/.
 */
export const DEMO_CATEGORY = SMART_BELYSNING;

/** Authored data: criterion scores only. Totals are derived below. */
const DEMO_SEEDS: ProductSeed[] = [
  {
    id: "hue-white-color-e27",
    brand: "Philips Hue",
    name: "White & Color Ambiance E27",
    tagline:
      "Dyrast i testet, men färgåtergivningen och appen är fortfarande i en egen klass.",
    scores: {
      fargatergivning: 5,
      dimring: 5,
      anslutning: 5,
      ljusstyrka: 4.5,
      prisvarde: 3.5,
    },
    price: 549,
    oldPrice: 649,
    merchant: "Lampan.se",
    merchantUrl: "#demo",
    award: "winner",
    superlative: "Bäst i test",
    pros: [
      "Bäst färgåtergivning i testet",
      "Stabil zigbee-anslutning även genom betongvägg",
      "Fungerar med allt: Google, Alexa, HomeKit, Matter",
    ],
    cons: ["Kräver bryggan för full funktionalitet", "Klart dyrast per lampa"],
    specs: [
      { label: "Ljusflöde", value: "1 100 lm", highlight: true },
      { label: "Färgtemperatur", value: "2 000–6 500 K", highlight: true },
      { label: "Protokoll", value: "Zigbee + Bluetooth", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "9,5 W" },
      { label: "Livslängd", value: "25 000 h" },
    ],
    verdict:
      "Hue kostar nästan dubbelt så mycket som billigaste alternativet och kräver dessutom en brygga för att bli riktigt bra. Ändå vinner den. Färgerna är renare, dimringen går hela vägen ner utan att flimra, och anslutningen framhålls som stabil i så gott som varje test vi gått igenom.",
  },
  {
    id: "ikea-tradfri-e27",
    brand: "IKEA",
    name: "Tradfri E27 färg",
    tagline: "Halva priset mot Hue och ärligt talat 80 procent av upplevelsen.",
    scores: {
      fargatergivning: 4,
      dimring: 3.5,
      anslutning: 4.5,
      ljusstyrka: 4,
      prisvarde: 5,
    },
    price: 199,
    merchant: "Prylstaden",
    merchantUrl: "#demo",
    award: "budget",
    superlative: "Bäst prisvärde",
    pros: [
      "Prisvärd per lumen",
      "Fungerar utan brygga via Matter",
      "Enkel att para ihop",
    ],
    cons: ["Trögare dimring i nedre registret", "Färre färgnyanser än Hue"],
    specs: [
      { label: "Ljusflöde", value: "806 lm", highlight: true },
      { label: "Färgtemperatur", value: "2 200–4 000 K", highlight: true },
      { label: "Protokoll", value: "Zigbee / Matter", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "9 W" },
      { label: "Livslängd", value: "20 000 h" },
    ],
    verdict:
      "Om du ska lysa upp ett helt hem blir prisskillnaden mot Hue snabbt flera tusen kronor. Tradfri klarar det mesta, och sedan Matter-uppdateringen behöver du inte längre IKEA:s egen brygga.",
  },
  {
    id: "tapo-l530e",
    brand: "TP-Link",
    name: "Tapo L530E",
    superlative: "Enklast att komma igång med",
    tagline: "Wi-Fi direkt i lampan. Smidigt i början, rörigt vid tolfte lampan.",
    scores: {
      fargatergivning: 3.5,
      dimring: 3.5,
      anslutning: 3.5,
      ljusstyrka: 4,
      prisvarde: 5,
    },
    price: 149,
    merchant: "Prylstaden",
    merchantUrl: "#demo",
    pros: ["Ingen brygga behövs", "Billigast i testet", "Bra app för scheman"],
    cons: [
      "Belastar wifi-nätet vid många lampor",
      "Märkbar fördröjning vid röststyrning",
    ],
    specs: [
      { label: "Ljusflöde", value: "806 lm", highlight: true },
      { label: "Färgtemperatur", value: "2 500–6 500 K", highlight: true },
      { label: "Protokoll", value: "Wi-Fi 2,4 GHz", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "8,7 W" },
      { label: "Livslängd", value: "15 000 h" },
    ],
    verdict:
      "Wi-Fi-lampor är enklast att komma igång med eftersom du slipper köpa en brygga. Nackdelen märks först senare: varje lampa tar en plats på nätverket, och runt tio enheter börjar routern klaga.",
  },
  {
    id: "nanoleaf-essentials-a19",
    brand: "Nanoleaf",
    name: "Essentials Matter A19",
    tagline: "Matter från start och tydligt ljusare än specen antyder.",
    scores: {
      fargatergivning: 4.5,
      dimring: 4,
      anslutning: 5,
      ljusstyrka: 5,
      prisvarde: 3.5,
    },
    price: 279,
    oldPrice: 329,
    merchant: "Nexsmart",
    merchantUrl: "#demo",
    superlative: "Bäst för Thread-hem",
    pros: ["Matter över Thread", "Stark ljusstyrka", "Snabb respons"],
    cons: ["Appen är stökig", "Kräver Thread-router för bästa resultat"],
    specs: [
      { label: "Ljusflöde", value: "1 100 lm", highlight: true },
      { label: "Färgtemperatur", value: "2 700–6 500 K", highlight: true },
      { label: "Protokoll", value: "Thread / Matter", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "9 W" },
      { label: "Livslängd", value: "25 000 h" },
    ],
    verdict:
      "Nanoleaf gör en av få lampor som kör Matter över Thread rakt av. Har du en Thread-router hemma svarar den nästan omedelbart. Har du inte det tappar den halva poängen.",
  },
  {
    id: "wiz-a60-color",
    brand: "WiZ",
    name: "A60 Color",
    superlative: "Billigast i test",
    tagline: "Prisvärd färglampa som gör jobbet, men inte mer än så.",
    scores: {
      fargatergivning: 3,
      dimring: 2.5,
      anslutning: 3.5,
      ljusstyrka: 3.5,
      prisvarde: 5,
    },
    price: 129,
    merchant: "Valostore",
    merchantUrl: "#demo",
    pros: ["Lågt pris", "Ingen brygga", "Enkla scener i appen"],
    cons: [
      "Svagast färgåtergivning i testet",
      "Synligt flimmer vid låg dimring",
      "Kort garanti",
    ],
    specs: [
      { label: "Ljusflöde", value: "806 lm", highlight: true },
      { label: "Färgtemperatur", value: "2 700–6 500 K", highlight: true },
      { label: "Protokoll", value: "Wi-Fi 2,4 GHz", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "8,8 W" },
      { label: "Livslängd", value: "15 000 h" },
    ],
    verdict:
      "WiZ är billigast per lampa och det märks framför allt när du dimrar ner. Under ungefär 20 procent syns ett flimmer som de andra lamporna i testet inte har.",
  },
];

/**
 * `score` and `rating` are computed here from the criterion scores and the
 * category weights. Nothing downstream sets a total by hand.
 */
export const DEMO_PRODUCTS = resolveProducts(DEMO_CATEGORY, DEMO_SEEDS);

export const DEMO_FAQ = [
  {
    question: "Behöver jag en brygga för att styra smarta lampor?",
    answer:
      "Nej, inte längre. Lampor med Wi-Fi eller Matter över Thread ansluter direkt. Zigbee-lampor som Philips Hue kräver fortfarande en brygga för full funktionalitet, men går att styra via Bluetooth på kort håll.",
  },
  {
    question: "Hur många smarta lampor klarar ett vanligt hemnätverk?",
    answer:
      "Räkna med runt tio Wi-Fi-lampor innan en normal router börjar tappa i prestanda. Ska du ha fler än så är Zigbee eller Thread ett bättre val, eftersom lamporna då bildar ett eget nät.",
  },
  {
    question: "Fungerar smarta lampor med vanliga strömbrytare?",
    answer:
      "Ja, men bara när strömbrytaren står på. Slår du av strömmen försvinner lampan ur appen tills du slår på den igen. Därför ersätter många den vanliga brytaren med en trådlös scenbrytare.",
  },
];
