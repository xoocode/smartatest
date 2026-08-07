import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { RORELSEVAKT_UTOMHUS } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /rorelsevakt-utomhus.
 *
 * Priser, GTIN, kundbetyg och lagerstatus lästa i butikernas egen JSON-LD på
 * PRICE_CHECKED. Specifikationerna hämtade i tillverkarnas egna datablad:
 * Steinels produktdatablad per EAN på steinel.de, ESYLUX svenska produktsidor
 * per artikelnummer, Nexas egen bruksanvisning för LMDT-810, och Icecat för
 * Philips Hue.
 *
 * ## Sidans fynd, och varför `Räckvidd` bär två tal
 *
 * **Räckvidden i annonsen gäller den som går tvärs över synfältet.** Kommer man
 * rakt emot ser sensorn en tredjedel så långt, och tillverkarna publicerar
 * båda talen i sina egna datablad utan att handeln för dem vidare:
 *
 *   Steinel IS 1        tangentiell 10 m    radiell   3 m     3,3 ggr
 *   Steinel IS 2160 ECO tangentiell 12 m    radiell   3 m     4,0 ggr
 *   ESYLUX MD 120       vinkelrätt  12 m    framifrån 5 m     2,4 ggr
 *   ESYLUX MD 200       vinkelrätt  Ø 20 m  framifrån Ø 10 m  2,0 ggr
 *   ESYLUX RC 230i      vinkelrätt  Ø 40 m  framifrån Ø 16 m  2,5 ggr
 *
 * Två tillverkare, fem produkter, samma sak. Skälet är fysiskt: en pyrodetektor
 * läser skillnaden mellan intilliggande linssegment, så den som korsar
 * synfältet passerar segment efter segment medan den som kommer rakt emot
 * fyller samma segment hela vägen in.
 *
 * Därför står båda talen i cellen. Ett naket tal hade dolt hela fyndet.
 *
 * ## Andra fyndet: wattalet gäller en lampa som inte säljs
 *
 * Steinels egna datablad delar LED-lasten i tre steg efter hur stor varje
 * enskild lampa är, och anger dessutom kapacitansen:
 *
 *   IS 1 och IS 2160 ECO:  < 2 W lampor 100 W · 2–8 W 125 W · > 8 W 250 W
 *                          kapacitiv last 88 µF
 *   IS 1 glödljus 500 W · IS 2160 ECO glödljus 600 W
 *
 * ESYLUX uttrycker samma begränsning som startström med varaktighet: RC 230i
 * tål 100 A i 200 µs, MD 200 tål 30 A i 20 ms. Kjell skiljer resistivt från
 * induktivt och anger dessutom ett golv på 1 W.
 *
 * Mekanismen är kondensatorn i varje LED-drivdon, som är tom i tändögonblicket.
 * Det är antalet drivdon och inte summan watt som avgör.
 *
 * ## ⚠️ Proffsmagasinet har ESYLUX räckvidder bakvänt
 *
 * Deras specifikationsruta för MD 120 säger "Max. räckvidd framåt 12 m" och
 * "Max. räckvidd i sidled 10 m". ESYLUX egen svenska produktsida för samma
 * artikelnummer säger `Avkänningsräckvidd vinkelrätt 12 m` och
 * `Avkänningsräckvidd framifrån 5 m`. Butiken har alltså både kastat om
 * riktningarna och ändrat det mindre talet. Tillverkaren gäller.
 *
 * Samma sida anger `Max inkopplingstid 5 min` där ESYLUX säger
 * `Efterlystid 10 s...15 min`. Kontrollera ESYLUX-uppgifter mot esylux.se.
 *
 * ## Philips Hue Outdoor Sensor saknar betyg på `bevakning` med flit
 *
 * Detekteringsvinkel och räckvidd finns varken på Philips svenska eller
 * brittiska produktsida, i bruksanvisningen eller bland Icecats 42 egenskaper
 * för GTIN 8719514342262. Att sätta ett lågt betyg där hade betygsatt vår
 * research i stället för varan, så kriteriet utelämnas och vikten fördelas om.
 * Se `redistributeMissing` i lib/products.ts.
 *
 * ⚠️ Bruksanvisningens `Range: 12 m indoor` står bland radiovarningarna och är
 * **Zigbee-räckvidden**, inte detekteringen. Galaxus säljer sensorn under
 * rubriken "12 m Motion sensors" och har sannolikt läst just den raden fel.
 * Använd inte det talet.
 *
 * ## Rankningen täcker de butiker vi länkar kommersiellt
 *
 * Efter användarbeslut 2026-08-07 ligger bara produkter hos Kjell,
 * Proffsmagasinet, Proshop och Teknikproffset i rankningen. Sex produkter som
 * bara säljs av Bygghemma, Jula, Biltema och Elbutik flyttades till övervägda
 * med pris och egenskaper kvar, däribland Steinel IS 240 och de två vakterna
 * under hundralappen. Det står utskrivet i avsnittet om övervägda produkter,
 * eftersom en läsare annars tror att de blev bortvalda på egenskaper.
 *
 * Kriteriebetygen är redaktionell bedömning utifrån specifikationer och
 * källorna i lib/sources.ts, inte mätningar.
 *
 * AFFILIATE-SWAP — `merchantUrl` är butikens egen produktsida. Inget
 * `affiliateUrl` någonstans ännu. Se lib/links.ts för vad som faktiskt renderas.
 */

export const PRICE_CHECKED = "2026-08-07";

const SEEDS: ProductSeed[] = [
  {
    id: "esylux-rc-230i",
    brand: "ESYLUX",
    name: "RC 230i rörelsedetektor",
    shortName: "RC 230i",
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "esylux-rc-230i"),
    tagline: "Två sensorhuvuden på 115 grader som ställs var för sig.",
    scores: {
      last: 4.5,
      bevakning: 5,
      vaderskydd: 5,
      installningar: 5,
      prisvarde: 2,
    },
    price: 1645,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter/esylux-rc-230i-rorelsesensor-230-vit-3084810",
    award: "winner",
    superlative: "Bäst för en stor tomt",
    pros: [
      "804 kvadratmeter bevakning, fyra gånger så mycket som näst bästa",
      "Två halvor på 115 grader ställs var för sig, så gatan skärmas bort",
      "Tål 100 ampere i 200 mikrosekunder, alltså gott om marginal för LED",
    ],
    cons: [
      "1 645 kronor, åtta gånger Kjells vakt som täcker en normal villafasad",
      "Fjärrkontrollen som gör den snabb att ställa in säljs separat",
      "230 grader räcker inte runt ett hörn, där Niko tar 300",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "230° (2 × 115°) + 360° underkrypskydd", highlight: true },
      { label: "Räckvidd", value: "Ø 40 m vinkelrätt, Ø 16 m framifrån", highlight: true },
      { label: "Last LED", value: "Startström 100 A i 200 µs", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP54", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−25 till 55 °C", highlight: true },
      { label: "Efterlystid", value: "15 s till 30 min", highlight: true },
      { label: "Bevakningsområde", value: "Upp till 804 m²" },
      { label: "Underkrypskydd", value: "Ja, 360° med Ø 6 m räckvidd" },
      { label: "Justering", value: "Elektroniskt och mekaniskt, per sensorhalva" },
      { label: "Inställning", value: "Fjärrkontroll eller potentiometer" },
      { label: "Effektförbrukning", value: "0,3 W" },
      { label: "Montering", value: "Vägg" },
      { label: "Strömförsörjning", value: "230 V, insticksanslutning" },
    ],
    verdict:
      "ESYLUX RC 230i bevakar upp till 804 kvadratmeter och kostar 1 645 kronor.\n\nDen ytan är fyra gånger vad näst bästa vakten klarar, och den kommer av att sensorn är två separata halvor på 115 grader som ställs var för sig. På en tomt där uppfarten går åt ett håll och altandörren åt ett annat kan du alltså rikta den ena halvan mot grinden och den andra mot huset, utan att den mellanliggande gatan tänder lampan hela kvällen. Underkrypskyddet går runt hela 360 grader med sex meters räckvidd, så ingen kan gå in tätt längs fasaden utan att synas. Elektriskt tål den 100 ampere i 200 mikrosekunder, den högsta startström någon tillverkare här anger.\n\n**Fjärrkontrollen som gör den snabb att ställa in ingår inte.** Utan den ställs allt med potentiometrar under kåpan, och då är mycket av poängen med de två halvorna borta.\n\nKöp den om du har en tomt med två håll att bevaka och tänker göra det ordentligt. Ska du bara lysa upp en fasad är det åtta gånger för mycket produkt, och Kjells väggvakt gör jobbet.",
  },
  {
    id: "niko-351-26570",
    brand: "Niko",
    name: "351-26570 rörelsesensor",
    shortName: "Niko 351-26570",
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "niko-351-26570"),
    tagline: "300 grader, alltså runt ett hörn utan en andra enhet.",
    scores: {
      last: 4,
      bevakning: 4.5,
      vaderskydd: 4.5,
      installningar: 4.5,
      prisvarde: 2.5,
    },
    price: 1244,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter/niko-351-26570-rorelsesensor-16-m-300-vit-3094485",
    award: "premium",
    superlative: "Bäst för den långa uppfarten",
    pros: [
      "300 grader, bredast här och nog för ett ytterhörn med två fasader",
      "Potentialfri kontakt, så den kan styra en kontaktor och därmed vad som helst",
      "Ställs in i Niko Sensor Tool-appen i stället för med vred under kåpan",
    ],
    cons: [
      "16 meter är ett enda tal, utan uppgift om hur långt den ser rakt emot",
      "148 millimeter djup, den klumpigaste av alla på fasaden",
      "1 244 kronor, och hörnfästet är det enda tillbehör som följer med",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "0–300°", highlight: true },
      { label: "Räckvidd", value: "16 m", highlight: true },
      { label: "Last LED", value: "Potentialfri kontakt, styr valfri kontaktor", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP54", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 50 °C", highlight: true },
      { label: "Efterlystid", value: "Upp till 20 min", highlight: true },
      { label: "Skymningsnivå", value: "5–2 000 lux" },
      { label: "Underkrypskydd", value: "Ja" },
      { label: "Inställning", value: "Manuellt eller via Niko Sensor Tool-appen" },
      { label: "Montering", value: "Vägg eller tak, hörnfäste medföljer" },
      { label: "Mått", value: "105 × 112 × 148 mm" },
    ],
    verdict:
      "Niko 351-26570 ser 300 grader och kostar 1 244 kronor.\n\nDe trehundra graderna är det ingen annan här kommer i närheten av, och de gör en verklig sak: sätter du den på ett ytterhörn med det medföljande hörnfästet täcker en enhet både uppfarten och gaveln, och du slipper dra fram en andra dosa. Utgången är dessutom en potentialfri kontakt, alltså en ren brytare utan egen spänning, och det betyder att den kan styra en kontaktor och därmed hur mycket belysning som helst. Inställningarna görs i Niko Sensor Tool-appen i stället för med vred under en kåpa i mörkret.\n\n**Räckvidden anges som ett enda tal, sexton meter.** Steinel och ESYLUX skriver ut både det tvärgående och det raka avståndet för sina sensorer, och skillnaden mellan dem är två till fyra gånger. Vad Nikos sexton meter blir för den som kommer rakt emot står inte att läsa.\n\nSka du bevaka ett hörn eller en lång uppfart och vill kunna hänga på mer belysning senare är det här rätt vakt. Räcker en fasad tar du Steinel IS 2160 ECO för 535 kronor mindre.",
  },
  {
    id: "steinel-is-2160",
    brand: "Steinel",
    name: "IS 2160 ECO rörelsevakt",
    shortName: "IS 2160 ECO",
    userRating: { value: 4, count: 1, checkedAt: PRICE_CHECKED },
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "steinel-is-2160"),
    tagline: "Delar LED-lasten i tre steg efter hur stor varje lampa är.",
    scores: {
      last: 4,
      bevakning: 3.5,
      vaderskydd: 4.5,
      installningar: 4.5,
      prisvarde: 3.5,
    },
    price: 709,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter/steinel-4007841606015-rorelsesensor-ip54-2-2000-lx-vit-3025541",
    superlative: "Bäst för entrén och vedboden",
    pros: [
      "260 bevakningszoner i linsen, alltså fint raster och färre missar",
      "Fem års garanti, längst av alla vakterna här",
      "Efterlystid upp till 35 minuter, så en armatur hinner komma upp i ljus",
    ],
    cons: [
      "Tre meter rakt emot, mot tolv för den som går tvärs över synfältet",
      "160 grader räcker inte runt ett hörn, där Niko tar 300",
      "Ideal monteringshöjd är 2 meter, alltså lägre än många vill sätta den",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "160°", highlight: true },
      { label: "Räckvidd", value: "12 m tvärs, 3 m rakt emot", highlight: true },
      { label: "Last LED", value: "100 W av lampor under 2 W, 125 W av 2–8 W, 250 W över 8 W", highlight: true },
      { label: "Last glödljus", value: "600 W" },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP54", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 50 °C", highlight: true },
      { label: "Efterlystid", value: "8 s till 35 min", highlight: true },
      { label: "Kapacitiv last", value: "88 µF" },
      { label: "Bevakningsområde", value: "201 m² tvärs, 13 m² rakt emot" },
      { label: "Bevakningszoner", value: "260" },
      { label: "Skymningsnivå", value: "2–2 000 lux" },
      { label: "Underkrypskydd", value: "Ja" },
      { label: "Justering", value: "40° i sidled, 70° i höjdled, täckfilm medföljer" },
      { label: "Montagehöjd", value: "2 m" },
      { label: "Mått", value: "73 × 78 × 113 mm" },
      { label: "Garanti", value: "5 år" },
    ],
    verdict:
      "Steinel IS 2160 ECO kostar 709 kronor och är den enda vakten här vars tillverkare skriver ut vad den tål med LED.\n\nDen delar lasten i tre steg efter hur stor varje enskild lampa är: 100 watt om lamporna drar under 2 W, 125 watt om de drar 2 till 8, och 250 watt om de drar mer än 8. Det låter bakvänt tills man vet varför. Det är kondensatorn i varje drivdon som laddas i tändögonblicket, så tio små lampor är hårdare mot reläet än två stora med samma sammanlagda effekt. Linsen har 260 bevakningszoner, alltså ett fint raster som gör en person mellan zonerna svår att missa, och garantin är fem år.\n\n**Rakt emot ser den tre meter.** Tolvmeterstalet gäller den som går tvärs över synfältet, och den skillnaden avgör var på huset den ska sitta.\n\nSka du bevaka en entré, en vedbod eller en garageport och vill veta exakt hur mycket belysning du får hänga på är den här svaret. Behöver du täcka två väggar från samma punkt går du till Niko.",
  },
  {
    id: "steinel-is-1",
    brand: "Steinel",
    name: "IS 1 rörelsevakt",
    shortName: "IS 1",
    userRating: { value: 5, count: 1, checkedAt: PRICE_CHECKED },
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "steinel-is-1"),
    tagline: "Håller lampan tänd i 35 minuter, längre än vakterna för tusen.",
    scores: {
      last: 3.5,
      bevakning: 3,
      vaderskydd: 4.5,
      installningar: 4,
      prisvarde: 5,
    },
    price: 269,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter/steinel-is-1-rorelsesensor-120-vit-2361582",
    award: "editor",
    superlative: "Bäst för uppfarten till garaget",
    pros: [
      "IP54 för 269 kronor, samma kapsling som vakterna för sex gånger pengarna",
      "Samma LED-tabell som storebrorsan, alltså 250 watt av lampor över 8 W",
      "Sensorn vrids 30 grader horisontellt och hela 180 vertikalt",
    ],
    cons: [
      "Tre meter rakt emot, mot tio för den som går tvärs",
      "Skymningsreläet stannar vid 1 000 lux mot 2 000 hos IS 2160 ECO",
      "Tre års garanti, mot fem på IS 2160 ECO",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "120°", highlight: true },
      { label: "Räckvidd", value: "10 m tvärs, 3 m rakt emot", highlight: true },
      { label: "Last LED", value: "100 W av lampor under 2 W, 125 W av 2–8 W, 250 W över 8 W", highlight: true },
      { label: "Last glödljus", value: "500 W" },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP54", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 50 °C", highlight: true },
      { label: "Efterlystid", value: "5 s till 35 min", highlight: true },
      { label: "Kapacitiv last", value: "88 µF" },
      { label: "Bevakningsområde", value: "105 m² tvärs, 9 m² rakt emot" },
      { label: "Bevakningszoner", value: "260" },
      { label: "Skymningsnivå", value: "2–1 000 lux" },
      { label: "Underkrypskydd", value: "Ja" },
      { label: "Justering", value: "30° horisontellt, 180° vertikalt, täckskal medföljer" },
      { label: "Montering", value: "Vägg eller tak" },
      { label: "Mått", value: "120 × 80 × 50 mm" },
      { label: "Garanti", value: "3 år" },
    ],
    verdict:
      "Steinel IS 1 kostar 269 kronor och har samma IP54-kapsling som vakterna för sex gånger pengarna.\n\nDen bär också samma LED-tabell som storebrorsan: 100 watt av lampor under 2 W, 125 av 2 till 8, och 250 av lampor över 8 W. Det är alltså inte en enklare elektrisk konstruktion utan en mindre lins, 120 grader i stället för 160, och det räcker gott till en garageport, en altandörr eller trappan upp till entrén. Sensorhuvudet vrids 30 grader horisontellt och hela 180 vertikalt, så du kan rikta ned den mot marken där du faktiskt vill ha ljuset. Efterlystiden går upp till 35 minuter.\n\n**Rakt emot ser den tre meter.** Den som kommer gående längs uppfarten rakt mot huset upptäcks alltså först på tre meters håll, och det avgör om vakten ska sitta på fasaden eller vridas mot sidan.\n\nHar du ett ställe att lysa upp finns det ingen anledning att betala mer. Ska du täcka en hel gårdsplan börjar det på 709 kronor med IS 2160 ECO.",
  },
  {
    id: "kjell-rorelsevakt-vagg",
    brand: "Kjell & Company",
    name: "Rörelsevakt med skymningsrelä Vägg",
    shortName: "Rörelsevakt Vägg",
    userRating: { value: 4.5, count: 108, checkedAt: PRICE_CHECKED },
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "kjell-rorelsevakt-vagg"),
    tagline: "Slår till redan vid 1 watt, alltså även för en ensam LED-lampa.",
    scores: {
      last: 4,
      bevakning: 3.5,
      vaderskydd: 3,
      installningar: 3,
      prisvarde: 4.5,
    },
    price: 199.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/belysning-lampor/skymningsrela/rorelsevakt-med-skymningsrela-vagg-p50614",
    award: "budget",
    superlative: "Bäst för dig som bytt till LED",
    pros: [
      "Minsta last 1 W, lägsta golvet här och den enda som tänder en 5-wattslampa",
      "300 W induktiv last, alltså gott om marginal för ett par LED-armaturer",
      "180 grader på 12 meter för 199,90 kronor",
    ],
    cons: [
      "IP44 i stället för IP54, så en fasad utan tak över sig är fel plats",
      "Efterlystiden stannar vid 7 minuter mot 35 hos de båda Steinel-vakterna",
      "Kräver neutralledare i dosan, vilket äldre hus sällan har framdraget",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "180°", highlight: true },
      { label: "Räckvidd", value: "12 m", highlight: true },
      { label: "Last LED", value: "300 W induktiv last", highlight: true },
      { label: "Last glödljus", value: "1 200 W resistiv last" },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven av tillverkaren", highlight: true },
      { label: "Efterlystid", value: "10 s till 7 min", highlight: true },
      { label: "Minsta last", value: "1 W" },
      { label: "Skymningsnivå", value: "3–2 000 lux" },
      { label: "Montering", value: "Vägg" },
      { label: "Strömförsörjning", value: "230 V, skruvplint, kräver neutralledare" },
      { label: "Mått", value: "121 × 73 × 82 mm" },
    ],
    verdict:
      "Kjells väggvakt kostar 199,90 kronor och slår till redan vid 1 watt.\n\nGolvet är det som gör den intressant, och det går tvärtemot vad man förväntar sig av den billigaste. Steinel-vakterna behöver mer för att reläet ska dra, så en ensam LED-lampa på 5 watt i en entrélykta håller dem tysta; den här tänder samma lampa. Uppåt tar den 300 watt induktiv last, vilket räcker till ett par LED-strålkastare, och 180 grader på 12 meter täcker en normal villafasad. 108 kunder hos Kjell har satt 4,5 av 5, vilket är det största betygsunderlaget i jämförelsen med god marginal.\n\n**Kapslingen är IP44 och inte IP54.** Det betyder stänk från alla håll men inte vattenstråle, så en helt oskyddad gavelvägg mot väster är fel plats för den.\n\nHar du bytt ut hela utebelysningen mot LED och undrar varför den gamla vakten inte längre tänder är det här svaret för tvåhundralappen. Sitter vakten under bar himmel tar du Steinel IS 1 för 69 kronor mer.",
  },
  {
    id: "esylux-md-200",
    brand: "ESYLUX",
    name: "MD 200 rörelsedetektor",
    shortName: "MD 200",
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "esylux-md-200"),
    tagline: "Bevakar 175 kvadratmeter från en punkt på väggen.",
    scores: {
      last: 3.5,
      bevakning: 4,
      vaderskydd: 4,
      installningar: 2.5,
      prisvarde: 3,
    },
    price: 670,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter/esylux-md-200-rorelsesensor-200-vit-3084804",
    superlative: "Bäst för carporten",
    pros: [
      "200 grader och 175 kvadratmeter, näst bredast av 230-voltsvakterna",
      "Går ned till −25 grader, fem lägre än båda Steinel-vakterna",
      "Sensorkulan böjs upp till 60 grader, så konen riktas efter montering",
    ],
    cons: [
      "IP44, alltså ett steg under Steinel och Niko på en oskyddad vägg",
      "Startströmmen får inte passera 30 ampere, en tredjedel av RC 230i",
      "670 kronor för en vakt utan fjärrkontroll eller app",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "200°, vridbar ±90°", highlight: true },
      { label: "Räckvidd", value: "Ø 20 m vinkelrätt, Ø 10 m framifrån", highlight: true },
      { label: "Last LED", value: "Startström 30 A i 20 ms", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−25 till 55 °C", highlight: true },
      { label: "Efterlystid", value: "10 s till 15 min", highlight: true },
      { label: "Bevakningsområde", value: "Upp till 175 m²" },
      { label: "Justering", value: "Kulled, böjs upp till 60°" },
      { label: "Effektförbrukning", value: "0,5 W" },
      { label: "Material", value: "UV-stabiliserat polykarbonat" },
      { label: "Montering", value: "Vägg" },
      { label: "Strömförsörjning", value: "230 V, snabbanslutning" },
    ],
    verdict:
      "ESYLUX MD 200 bevakar upp till 175 kvadratmeter och kostar 670 kronor.\n\nTvåhundra grader från en punkt på väggen räcker till en carport med infart, en gårdsplan eller en altan med två sidor, och sensorkulan böjs upp till 60 grader så att konen kan riktas ned mot marken efter att kabeln redan sitter. Kylan är den andra styrkan: −25 grader är fem lägre än båda Steinel-vakterna klarar, och plasten är UV-stabiliserad polykarbonat och inte vanlig vit ABS som gulnar mot en sydvägg.\n\n**Startströmmen får inte passera 30 ampere.** Det är en tredjedel av vad RC 230i tål, och det är den toppen som svetsar ihop reläkontakter när flera LED-armaturer tänds samtidigt.\n\nSka vakten sitta på en carport eller en fasad där kylan är det verkliga problemet gör den jobbet. Vill du ha IP54 på samma vägg är Steinel IS 2160 ECO 39 kronor dyrare och tål vattenstråle i stället för bara stänk.",
  },
  {
    id: "philips-hue-outdoor",
    brand: "Philips Hue",
    name: "Outdoor Sensor rörelsesensor",
    shortName: "Hue Outdoor",
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "philips-hue-outdoor"),
    tagline: "Mäter både ljus och temperatur, och kan tända olika ljus per timme.",
    scores: {
      last: 2,
      vaderskydd: 4,
      installningar: 4,
      prisvarde: 3,
    },
    price: 557,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Philips-Hue-Outdoor-Sensor/2990979",
    superlative: "Bäst för dig som redan har Hue ute",
    pros: [
      "Batteridriven, så den kan sitta där ingen kabel går att dra",
      "Inbyggd temperaturgivare vid sidan av ljussensorn, unik i jämförelsen",
      "Programvaran uppdateras, så sensorn får nya funktioner efter köpet",
    ],
    cons: [
      "Tänder bara Hue-lampor, och bara genom en Hue Bridge som säljs separat",
      "Två AA-batterier räcker ungefär två år och byts uppe på väggen",
      "Stannar vid +45 grader, lägst tak av alla vakterna här",
    ],
    specs: [
      { label: "Typ", value: "Batteridriven sensor", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "Ej angiven av tillverkaren", highlight: true },
      { label: "Räckvidd", value: "Ej angiven av tillverkaren", highlight: true },
      { label: "Last LED", value: "Bryter ingen ström, kräver Hue Bridge", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP54", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 45 °C", highlight: true },
      { label: "Efterlystid", value: "Ställs fritt i Hue-appen", highlight: true },
      { label: "Strömförsörjning", value: "2 × AA, ingår" },
      { label: "Batteritid", value: "Cirka 2 år" },
      { label: "Sensorer", value: "Rörelse, ljusnivå och temperatur" },
      { label: "Styrning", value: "Zigbee via Hue Bridge, app och röstassistent" },
      { label: "Montering", value: "Vägg eller stående" },
      { label: "Luftfuktighet", value: "5–95 %, icke-kondenserande" },
      { label: "Mått", value: "76 × 56 × 76 mm" },
      { label: "Vikt", value: "186 g" },
      { label: "Garanti", value: "2 år" },
    ],
    verdict:
      "Philips Hue Outdoor Sensor kostar 557 kronor och är den enda sensorn här som mäter mer än rörelse.\n\nVid sidan av pyrodetektorn sitter både en ljusgivare och en temperaturgivare, och det öppnar automationer ingen 230-voltsvakt kan göra. Du kan låta samma rörelse tända varmt och svagt efter midnatt men fullt ljus vid åttatiden, eller koppla temperaturen till något helt annat i huset. Programvaran uppdateras över Bridgen, så sensorn kan få funktioner den inte hade när du köpte den. Kapslingen är IP54, alltså samma klass som Steinel och Niko, och två AA-batterier ingår och räcker ungefär två år.\n\n**Den bryter ingen ström.** Strålkastaren du redan har på väggen tänds inte av den här sensorn, och Hue Bridge som krävs för att den ska göra något alls säljs separat.\n\nHar du redan Hue-armaturer ute är det här den självklara sensorn, och den enda som ger dig olika ljus vid olika tider på natten. Ska du få en vanlig lampa att tända är även den billigaste 230-voltsvakten ett bättre köp.",
  },
  {
    id: "esylux-md-120",
    brand: "ESYLUX",
    name: "MD 120 rörelsedetektor",
    shortName: "MD 120",
    userRating: { value: 4.5, count: 2, checkedAt: PRICE_CHECKED },
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "esylux-md-120"),
    tagline: "Klarar −25 grader, fem lägre än båda Steinel-vakterna.",
    scores: {
      last: 3.5,
      bevakning: 3,
      vaderskydd: 4,
      installningar: 3,
      prisvarde: 2,
    },
    price: 505,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter/esylux-md-120-rorelsesensor-120-3084766",
    superlative: "Bäst för en dörr i taget",
    pros: [
      "−25 till 55 grader, bredaste temperaturspannet tillsammans med MD 200",
      "Sensorn vrids ±90 grader horisontellt efter att kabeln sitter",
      "UV-stabiliserat polykarbonat, som inte gulnar mot en sydvägg",
    ],
    cons: [
      "Fem meter rakt emot, kortaste raka räckvidden av 230-voltsvakterna",
      "Efterlystiden stannar vid 15 minuter mot 35 hos båda Steinel-vakterna",
      "505 kronor mot Steinel IS 1:s 269, för ett steg sämre kapsling",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "120°, vridbar ±90°", highlight: true },
      { label: "Räckvidd", value: "12 m vinkelrätt, 5 m framifrån", highlight: true },
      { label: "Last LED", value: "Inkopplingsström 30 A i 20 ms", highlight: true },
      { label: "Last glödljus", value: "1 000 W" },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−25 till 55 °C", highlight: true },
      { label: "Efterlystid", value: "10 s till 15 min", highlight: true },
      { label: "Bevakningsområde", value: "Upp till 151 m²" },
      { label: "Skymningsnivå", value: "2–1 000 lux" },
      { label: "Underkrypskydd", value: "Ja" },
      { label: "Justering", value: "Vrid- och böjbar kulled" },
      { label: "Montagehöjd", value: "2,5 m" },
      { label: "Effektförbrukning", value: "0,5 W" },
      { label: "Material", value: "UV-stabiliserat polykarbonat" },
    ],
    verdict:
      "ESYLUX MD 120 går ned till −25 grader och kostar 505 kronor.\n\nFem grader lägre än båda Steinel-vakterna låter marginellt och är det inte i Jämtland eller norrut, där en normal februarinatt ligger under −20. Uppåt går den till 55 grader, vilket spelar roll på en söderfasad i plåt, och höljet är UV-stabiliserat polykarbonat i stället för vanlig vit plast som gulnar. Kulleden gör att hela sensorhuvudet både vrids ±90 grader och böjs, så konen kan riktas mot en trappa eller en grind efter att kabeln redan är dragen.\n\n**Rakt emot ser den fem meter.** Tolvmeterstalet gäller den som passerar tvärs över synfältet, och fem meter är den kortaste raka räckvidden bland 230-voltsvakterna här.\n\nSitter vakten där kylan är det verkliga problemet och du bara har en dörr att bevaka gör den jobbet. Ska den bara sitta på en villafasad i södra Sverige får du IP54, längre efterlystid och 236 kronor kvar i fickan med Steinel IS 1.",
  },
  {
    id: "nexa-lmdt-810",
    brand: "Nexa",
    name: "LMDT-810 trådlös rörelsevakt",
    shortName: "LMDT-810",
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "nexa-lmdt-810"),
    tagline: "Linsskyddet klipps till, så vinkeln snävas från 110 till 20 grader.",
    scores: {
      last: 2,
      bevakning: 2.5,
      vaderskydd: 2.5,
      installningar: 2.5,
      prisvarde: 3,
    },
    price: 268,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Teknikproffset",
    merchantUrl:
      "https://www.teknikproffset.se/hem-hushall-tradgard/larm-sakerhet/rorelsesensorer/nexa-tradlos-rorelsevakt-for-utomhusbruk-ip-44-sjalvlarande-koder-lmdt-810",
    superlative: "Bäst där ingen kabel går att dra",
    pros: [
      "Batteridriven och trådlös, så den kan sitta på ett staket eller ett uthus",
      "Linsskyddet klipps till och snävar vinkeln från 110 ned till 20 grader",
      "Kan också ringa en Nexa dörrklocka i stället för att tända en lampa",
    ],
    cons: [
      "Bryter ingen ström, så den kräver en Nexa-mottagare i uttaget",
      "Stannar vid +40 grader och batterierna följer inte med",
      "Fyra fasta efterlystider, 5 sekunder eller 1, 5 och 10 minuter",
    ],
    specs: [
      { label: "Typ", value: "Batteridriven sensor", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "110°, kan snävas till 20°", highlight: true },
      { label: "Räckvidd", value: "10 m", highlight: true },
      { label: "Last LED", value: "Bryter ingen ström, kräver Nexa-mottagare", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 40 °C", highlight: true },
      { label: "Efterlystid", value: "5 s, 1, 5 eller 10 min", highlight: true },
      { label: "Strömförsörjning", value: "2 × AAA, ingår ej" },
      { label: "Styrning", value: "433 MHz till System Nexa och Nexa Bridge" },
      { label: "Radioräckvidd", value: "Upp till 30 m" },
      { label: "Ljuslägen", value: "Dygnet runt, skymning och gryning, eller natt" },
      { label: "Montagehöjd", value: "2–3 m" },
    ],
    verdict:
      "Nexa LMDT-810 kostar 268 kronor och är den billigaste vägen till en vakt där ingen kabel går.\n\nEn staketstolpe, ett uthus eller en grind långt från huset får ström från två AAA-batterier och skickar i stället en radiosignal upp till trettio meter till en Nexa-mottagare inne. Det medföljande linsskyddet är den smartaste detaljen: det klipps till och snävar bevakningsvinkeln från 110 grader ned till 20, så du kan låta vakten se grinden och ingenting av gatan bakom. Den kan dessutom ringa en Nexa dörrklocka i stället för att tända en lampa, vilket gör den till en billig avisering när någon svänger in på tomten.\n\n**Den bryter ingen ström.** Utan en Nexa-mottagare i uttaget gör den ingenting alls, och med en kostar lösningen mer än Kjells inkopplade vakt.\n\nHar du redan System Nexa i huset och ett ställe utan el är den svår att slå på priset. Ska lampan över garageporten tända går du till Steinel IS 1 eller Kjells väggvakt i stället.",
  },
];

export const RORELSEVAKT_UTOMHUS_PRODUCTS = resolveProducts(
  RORELSEVAKT_UTOMHUS,
  SEEDS,
);

/**
 * Filtret delar på bevakningsvinkel och inte på pris eller märke.
 *
 * Det är den enda uppdelning som svarar mot ett beslut läsaren redan fattat
 * innan hen kommer hit: ska ljuset täcka en gårdsplan eller en dörr.
 */
export const RORELSEVAKT_UTOMHUS_FILTERS = [
  {
    key: "bred",
    label: "180 grader och bredare",
    ids: [
      "esylux-rc-230i",
      "niko-351-26570",
      "esylux-md-200",
      "kjell-rorelsevakt-vagg",
    ],
  },
  {
    key: "smal",
    label: "Smalare än 180 grader",
    ids: ["steinel-is-2160", "steinel-is-1", "esylux-md-120"],
  },
  {
    key: "batteri",
    label: "Batteridriven",
    ids: ["philips-hue-outdoor", "nexa-lmdt-810"],
  },
];

export const RORELSEVAKT_UTOMHUS_FAQ = [
  {
    question: "Varför tänds lampan inte när jag går rakt mot sensorn?",
    answer:
      "För att en pyrodetektor läser skillnaden mellan intilliggande segment i linsen. Går du tvärs över synfältet passerar din kropp segment efter segment och sensorn ser en tydlig växling. Går du rakt emot fyller du samma segment hela vägen in, och växlingen uteblir tills du är nära. Tillverkarna anger båda talen i sina datablad: Steinel IS 2160 ECO ser 12 meter tvärs men 3 meter rakt emot, ESYLUX MD 120 ser 12 respektive 5. Talet i annonsen är alltid det större. Rikta därför sensorn så att den som närmar sig korsar synfältet i stället för att gå längs det.",
  },
  {
    question: "Vad betyder wattalet på en rörelsevakt?",
    answer:
      "Det gäller nästan alltid glödljus. Steinel IS 2160 ECO är märkt 600 W för glödlampor, men samma detektor tar 100 W av LED-lampor under 2 W, 125 W av lampor mellan 2 och 8 W och 250 W av lampor över 8 W. Kjells vakt klarar 1 200 W resistivt och 300 W induktivt. ESYLUX anger i stället en högsta startström: 30 ampere för MD 200 och 100 ampere för RC 230i. Leta efter LED-talet, kapacitansen i mikrofarad eller startströmmen, för det är de tal som gäller den belysning du faktiskt köper.",
  },
  {
    question: "Kan jag koppla LED-strålkastare till en rörelsevakt?",
    answer:
      "Ja, men räkna på antalet armaturer i stället för på summan watt. Varje LED-drivdon har en kondensator som är tom när strömmen slås på, och den laddas med en strömtopp som kan ligga tiotals gånger över armaturens märkeffekt under några millisekunder. Det är den toppen som svetsar ihop reläkontakterna, inte strömmen lampan drar sedan. Därför är Steinels tak lägre för många små lampor än för få stora, och därför anger ESYLUX 30 respektive 100 ampere i stället för ett watt-tal.",
  },
  {
    question: "Vilken IP-klass behöver en rörelsevakt utomhus?",
    answer:
      "Minst IP44. Elsäkerhetsverket sätter IP44 eller högre som gräns för det som placeras utomhus, och fyran i andra positionen betyder att produkten tål vatten som stänker från alla riktningar. IP54 lägger till bättre dammskydd och tål vatten som sprutar, vilket är värt något på en gavelvägg utan tak över sig. Av de nio vakterna här har fyra IP54 och fem IP44.",
  },
  {
    question: "Hur högt ska en rörelsevakt sitta?",
    answer:
      "Runt två meter för de flesta väggvakter. Steinel anger ideal monteringshöjd 2 meter för både IS 1 och IS 2160 ECO, ESYLUX rekommenderar 2,5 meter för MD 120, och Nexa vill ha LMDT-810 mellan 2 och 3 meter över marknivå. Höjden avgör hur bevakningskonen faller på marken: för lågt och konen når bara några meter ut, för högt och den tittar ned framför fasaden och missar den som närmar sig. Har linsen underkrypskydd, alltså ett segment som ser rakt ned längs väggen, spelar höjden mindre roll för den som kommer tätt inpå.",
  },
  {
    question: "Varför tänds lampan mitt på dagen?",
    answer:
      "Skymningsreläet är inställt för högt. Vredet märkt LUX eller med en sol och en måne bestämmer vid vilken ljusnivå vakten börjar reagera på rörelse alls. Steinel IS 2160 ECO går från 2 till 2 000 lux, vilket täcker allt från mörk natt till mulen dag, medan IS 1 stannar vid 1 000 och Niko börjar först vid 5. Vrid mot månsymbolen och gör om gångtestet i skymningen, inte mitt på dagen.",
  },
  {
    question: "Fungerar en rörelsevakt i kyla?",
    answer:
      "De flesta gör det, och kylan gör faktiskt detektionen bättre. En pyrodetektor mäter skillnaden mellan människan och bakgrunden, och den skillnaden växer när bakgrunden är kall. Den svåra situationen är en varm sommarkväll när muren bakom personen håller kroppstemperatur. Elektroniken har däremot en gräns: båda ESYLUX-vakterna går till −25 grader, Steinel och Niko till −20, och Nexa LMDT-810 har ett tak på bara +40.",
  },
  {
    question: "Får jag installera en rörelsevakt själv?",
    answer:
      "Nej, inte en som kopplas till 230 volt. En sådan vakt kräver behörig elinstallatör, och Elsäkerhetsverket kräver dessutom skyddsjordade uttag utomhus och jordfelsbrytare för nya installationer. En batteridriven sensor som Philips Hue Outdoor eller Nexa LMDT-810 sätter du upp själv med två skruvar, eftersom ingenting där går på nätspänning.",
  },
];

/**
 * Tittade på, valde bort.
 *
 * ⚠️ Sex av dem ligger här av **kommersiella** skäl och inte redaktionella: de
 * säljs bara av butiker vi inte länkar till, efter användarbeslut 2026-08-07.
 * Pris och egenskaper står kvar så att läsaren kan köpa dem ändå, och skälet
 * står utskrivet i sektionsbeskrivningen på sidan. Att i stället hitta på en
 * produktinvändning hade varit det sämsta av alternativen.
 */
export const RORELSEVAKT_UTOMHUS_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Steinel",
    name: "IS 240 rörelsevakt",
    reason:
      "Kategorins bredaste 230-voltsvakt med 240 graders bevakning, tolv meter tvärs och IP54, och den enda som får sitta på ett ytterhörn och täcka två fasader. Slår inte till under 10 watt, så en ensam LED-lampa på 5 W håller den tyst. Säljs i Sverige bara inom Bygghemmakoncernen.",
    approxPrice: 1143,
    merchant: "Bygghemma",
  },
  {
    brand: "Steinel",
    name: "IS 180-2 rörelsevakt",
    reason:
      "Den flataste vakten vi hittade, 56 millimeter ut från väggen, och linsen sitter i två lägen med räckvidd 5 eller 12 meter. Samma butiksläge som IS 240.",
    approxPrice: 979,
    merchant: "Bygghemma",
  },
  {
    brand: "Steinel",
    name: "IS 130-2 rörelsevakt",
    reason:
      "Smal lins på 130 grader för en passage eller en gång längs tomtgränsen, och sensorhuvudet vrids 50 grader i sidled och 90 i höjdled efter uppsättning. Samma butiksläge som IS 240.",
    approxPrice: 549,
    merchant: "Bygghemma",
  },
  {
    brand: "Steinel",
    name: "IS 3180 rörelsevakt",
    reason:
      "Ser 20 meter över 180 grader vid 2,5 meters montagehöjd, längst av allt vi hittade, och delar upp lasten efter lampstorlek precis som IS 2160 ECO fast med taket 600 watt. Restnoterad hos Proffsmagasinet vid priskontrollen.",
    approxPrice: 1579,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter/steinel-10508-rorelsesensor-0-180-2-10000-lx-ip54-3026011",
  },
  {
    brand: "Osram",
    name: "SMART+ Outdoor Motion Sensor WiFi",
    reason:
      "Wifi i stället för Zigbee, alltså ingen bridge alls, och 292 kronor gör den till den billigaste smarta sensorn vi hittade. Restnoterad hos Proshop vid priskontrollen, och den enda i urvalet som inte gick att köpa samma dag.",
    approxPrice: 292,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Osram-SMART-Outdoor-Motion-Sensor-WiFi-grey/3409986",
  },
  {
    brand: "Nexa",
    name: "SP-816 Z-Wave rörelsevakt",
    reason:
      "Z-Wave Plus i stället för Nexas eget 433 MHz, alltså inte låst till en tillverkares mottagare, med sabotagelarm och batterivarning. Räckvidden anges till tio meter vid två meters montagehöjd under tjugo grader, vilket är den ärligaste räckviddsuppgiften i kategorin. Säljs av Elbutik.",
    approxPrice: 389,
    merchant: "Elbutik",
  },
  {
    brand: "Biltema",
    name: "Rörelsevakt IP44 (46-207)",
    reason:
      "180 grader på 12 meter för 89,90 kronor, alltså det billigaste sättet att få ljus över en garageport. Anger 1 000 W glödljus och 300 W för lysrör och lågenergilampor, och som enda billiga vakt även monteringshöjden 1,8 till 2,5 meter. Efterlystiden går bara till 4 minuter.",
    approxPrice: 89.9,
    merchant: "Biltema",
  },
  {
    brand: "Anslut",
    name: "Rörelsevakt IP44 (422080)",
    reason:
      "Den enda svarta vakten vi hittade, vilket gör den osynlig mot en tjärad eller falurött fasad. 180 grader, 12 meter och ned till −20 grader för 99,90 kronor, men 3,9 av 5 från 216 kunder är det lägsta betyget i hela urvalet. Säljs av Jula.",
    approxPrice: 99.9,
    merchant: "Jula",
  },
  {
    brand: "Clas Ohlson",
    name: "Batteridriven rörelsesensor och eluttag",
    reason:
      "Sensor och trådlöst utomhusuttag i samma paket, 25 meter mellan delarna, för den som vill slippa elektriker helt. 7 meters räckvidd och 110 graders vinkel är minst av allt vi tittade på.",
    approxPrice: 179.9,
    merchant: "Clas Ohlson",
  },
  {
    brand: "Steinel",
    name: "NightMatic 3000 Vario",
    reason:
      "Tänder på mörker och inte på rörelse, alltså en annan produkt även om butikerna lägger dem i samma hylla. Lyser hela natten i stället för i minuter.",
    approxPrice: 399,
    merchant: "Jula",
  },
];
