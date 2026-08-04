import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { AVFUKTARE } from "@/lib/test-pages";

/**
 * Avfuktare. Underlag i .agent/research/avfuktare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, kapacitet i liter per dygn,
 * effekt, driftstemperatur, tankvolym, ljudnivå, luftflöde, rekommenderad yta
 * och köldmedium. Allt läst 2026-08-03 på butikens eller tillverkarens egen
 * produktsida, i deras strukturerade data eller i produktbeskrivningen.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte mätt avfuktning,
 * inte vägt uppsamlat vatten och inte provat någon apparat.
 *
 * ## Sidans fynd: talet alla jämför är inte jämförbart
 *
 * Tre olika deklarationsbaser ligger sida vid sida i svenska butiker:
 *
 * - **Wood's** anger både kapacitet och effekt vid **30 ºC och 80 % RH**. LD40 anger dessutom ett andra tal vid 20 °C och 70 % RF, och de två skiljer 73 procent: **7,5 mot 13 liter per dygn för samma apparat**.
 * - **Meaco** anger effekten vid **20 °C och 60 % RH** men säger inte ett ord om vid vilka villkor literantalet i modellnamnet gäller.
 * - **Clas Ohlsons egna, eeese, Xiaomi och Duux** anger inga villkor alls.
 *
 * Till det kommer att samma apparat får olika tal hos tillverkare och butik.
 * Wood's SW42FW är 25 liter och 600 watt enligt Wood's, och 25,5 liter och
 * 550 watt enligt Clas Ohlson.
 *
 * `SS-EN 810` handlar om precis det här och heter i sin svenska titel
 * "provning av avfuktningsförmåga, märkning, funktionskrav och redovisning av
 * tekniska data". Den är gällande, utgåva 1, fastställd 1997-04-30, och gäller
 * bara avfuktare med eldriven kompressor.
 *
 * ⚠️ Vi har inte köpt standarden. Filen påstår aldrig vilka provvillkor den
 * föreskriver, bara vad SIS publicerar öppet om den.
 *
 * ## Om testomdöme
 *
 * Det finns inget eget kriterium för det, efter användarbeslut 2026-08-03.
 * Which?, som Stiftung Warentest publicerar, är enda riktiga provningen i
 * Europa, och den täcker **två av tolv rankade**: Meaco Arete One 12L och 25L.
 * Där omdömet finns styr det avfuktningspoängen, och där det saknas står det
 * utskrivet i produktens omdöme. Ett eget kriterium som tio av tolv inte kan få
 * poäng på hade mätt vem som blivit provad, inte vad produkten går för.
 *
 * ## Två produkter kom in i efterhand
 *
 * eeese Adam och Clas Ohlsons tiolitersapparat låg först bland de övervägda med
 * lagerstatus som skäl. Efter användarbeslut 2026-08-03 rankas slutsålda
 * produkter ändå, och ingen lagerstatus anges längre någonstans på sidan.
 * Cleverio AD100 flyttades däremot inte tillbaka: den tar 0,75 liter per dygn
 * mot rankningens 10 till 25, alltså en annan sorts produkt.
 *
 * ## Vad energipoängen egentligen bygger på
 *
 * Which? mäter el per uppsamlad liter vatten och inte per timme, eftersom
 * drifttiden för samma vattenmängd kan skilja dubbelt. Vi räknar samma kvot ur
 * deklarerade tal, men **kvoten ärver jämförbarhetsproblemet**: Meacos watt är
 * mätt vid 20 °C och 60 % RH, Wood's vid 30 ºC och 80 % RH, och Clas Ohlsons
 * egna vid ingenting angivet. Det står utskrivet i varje omdöme där det spelar
 * roll, och det är därför öppen redovisning är ett eget kriterium.
 */

export const PRICE_CHECKED = "2026-08-03";

const BYGGHEMMA = "Bygghemma";
const BYGGHEMMA_BASE =
  "https://www.bygghemma.se/hus-och-bygg/varme-och-ventilation/inomhusklimat-och-luktsanering/avfuktare";

const CLAS_OHLSON = "Clas Ohlson";
const CLAS_OHLSON_BASE = "https://www.clasohlson.com/se";

const KJELL = "Kjell & Company";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "meaco-arete-one-25l",
    name: "MeacoDry Arete One 25L",
    shortName: "Meaco 25L",
    brand: "Meaco",
    image: productImage(AVFUKTARE.slug, "meaco-arete-one-25l"),
    tagline: "En av två som Which? faktiskt har mätt.",
    scores: {
      avfuktning: 5,
      kyla: 4,
      energi: 5,
      redovisning: 3,
      prisvarde: 4,
    },
    price: 4299,
    merchant: BYGGHEMMA,
    merchantUrl: `${BYGGHEMMA_BASE}/avfuktare-och-luftrenare-meaco-meacodry-arete-one-25l/p-1887651`,
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Lägst driftkostnad enligt Which?",
    pros: [
      "Which? ger den lägst driftkostnad av alla rekommenderade apparater",
      "Fungerar bra även i kyla, enligt Which?",
      "267 watt vid 20 °C och 60 % RH, en realistisk nivå",
      "H13 HEPA-filter, så den går som luftrenare när fukten är borta",
      "Slangadapter för vanlig trädgårdsslang ger kontinuerlig dränering",
    ],
    cons: [
      "Specifikationen säger inte vid vilka villkor de 25 literna gäller",
      "16 kilo, inget man bär mellan våningar",
      "Går ner till 5 °C, medan Wood's klarar 2",
      "Bygghemma publicerar inga kundbetyg alls",
    ],
    specs: [
      { label: "Pris", value: "4 299 kr", highlight: true },
      { label: "Kapacitet", value: "25 l/dygn, villkor ej angivna", highlight: true },
      { label: "Effekt", value: "267 W vid 20 °C / 60 % RH", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Provad av Which?", value: "Ja, minst 80 % av maxpoängen", highlight: true },
      { label: "Hygrostat", value: "40–70 % RH" },
      { label: "Tank", value: "4,8 liter" },
      { label: "Luftflöde", value: "150/175 m³/h" },
      { label: "Ljudnivå", value: "40 och 42 dB(A)" },
      { label: "Köldmedium", value: "R290, 90 g" },
      { label: "Vikt", value: "16 kg" },
      { label: "Display", value: "Ja" },
      { label: "Mått", value: "618 x 366 x 272 mm (HxBxD)" },
      { label: "Garanti", value: "5 år" },
      { label: "Filter", value: "Tvättbart dammfilter, HEPA ingår" },
      { label: "Slanganslutning", value: "Ja, 12,5 mm trädgårdsslang" },
    ],
    verdict:
      "Which? har mätt den här apparaten. Det gäller bara två av de tolv.\n\nWhich?, som Stiftung Warentest publicerar och håller uppdaterad, provar avfuktare vid 21 grader och kallare. Tillverkarnas literantal är i regel uppmätta vid 30 grader, en temperatur som inte råder i något utrymme man vill avfukta. Provningen är därför värd något här. Omdömet: avfuktar toppenbra, lägst driftkostnad av samtliga rekommenderade apparater, fungerar bra även i kyla.\n\nWhich? räknar el per uppsamlad liter vatten och inte per timme, med motiveringen att vissa apparater behöver dubbelt så lång drifttid för samma vattenmängd. Watt per timme säger ingenting utan literantalet bredvid, och det är på den kvoten Arete One vinner.\n\nMeaco redovisar dessutom effekten vid namngivna villkor, 267 watt vid 20 grader och 60 procent relativ fuktighet. Det är den nivå du faktiskt har i en källare, inte den nivå marknadsföringen väljer.\n\nMen de är inte oskyldiga. Literantalet är själva produktnamnet, och ändå säger specifikationen inte med ett ord vid vilka villkor de 25 literna gäller. Det kostar dem på redovisningskriteriet, där Wood's LD40 ensam får full poäng.\n\nDen väger 16 kilo och har hjul men inget bärhandtag värt namnet, så tänk igenom var den ska stå. Och den går ner till 5 grader, vilket räcker för källare och tvättstuga men inte för en krypgrund som går mot noll. Där ska du ha Wood's, eller en sorptionsavfuktare.",
  },
  {
    id: "meaco-arete-one-12l",
    name: "MeacoDry Arete One 12L",
    shortName: "Meaco 12L",
    brand: "Meaco",
    image: productImage(AVFUKTARE.slug, "meaco-arete-one-12l"),
    tagline: "Samma provade serie i den storlek de flesta faktiskt behöver.",
    scores: {
      avfuktning: 5,
      kyla: 3.5,
      energi: 4.5,
      redovisning: 3,
      prisvarde: 4.5,
    },
    price: 2999,
    merchant: BYGGHEMMA,
    merchantUrl: `${BYGGHEMMA_BASE}/avfuktare-och-luftrenare-meaco-meacodry-arete-one-12l/p-1887649`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Provad av Which?, 1 300 kr billigare",
    pros: [
      "Provad av Which? med minst 80 procent av maxpoängen",
      "Which? kallar den energieffektiv, lätt att bära och förhållandevis tyst",
      "151 watt vid 20 °C och 60 % RH, en realistisk nivå",
      "1 300 kronor billigare än 25-litersmodellen med samma teknik",
      "Samma H13 HEPA-filter och slangadapter som den större",
    ],
    cons: [
      "Specifikationen säger inte vid vilka villkor de 12 literna gäller",
      "Which? nämner den inte som särskilt bra i kyla, till skillnad från 25L",
      "Går ner till 5 °C, så ingen krypgrundsapparat",
      "Bygghemma publicerar inga kundbetyg alls",
    ],
    specs: [
      { label: "Pris", value: "2 999 kr", highlight: true },
      { label: "Kapacitet", value: "12 l/dygn, villkor ej angivna", highlight: true },
      { label: "Effekt", value: "151 W vid 20 °C / 60 % RH", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Provad av Which?", value: "Ja, minst 80 % av maxpoängen", highlight: true },
      { label: "Hygrostat", value: "40–70 % RH" },
      { label: "Ljudnivå", value: "35 och 38 dB(A)" },
      { label: "Filter", value: "Tvättbart dammfilter, HEPA som tillval" },
      { label: "Display", value: "Ja" },
      { label: "Mått", value: "472 x 319 x 237 mm (HxBxD)" },
      { label: "Vikt", value: "10,9 kg" },
      { label: "Garanti", value: "5 år" },
      { label: "Slanganslutning", value: "Ja, 12,5 mm trädgårdsslang" },
    ],
    verdict:
      "Samma serie, samma teknik och samma filter som vinnaren, 1 300 kronor billigare.\n\nWhich? provade båda. Om 12-litersmodellen: avfuktar toppenbra, energieffektiv, lätt att bära, enkel att använda och förhållandevis tyst, med rätt låga driftkostnader.\n\nWhich? lyfter däremot uttryckligen fram den större som bra i kyla och skriver ingenting motsvarande om den här. Kvoten mellan effekt och kapacitet är dessutom sämre: 151 watt för 12 liter mot 267 watt för 25, ungefär 12,6 mot 10,7 watt per liter och dygn.\n\nHar du en tvättstuga, ett badrum eller ett sovrum med kondens på rutorna räcker den här med marginal. Har du en källare på hundra kvadratmeter, eller ett utrymme som går mot fem grader på vintern, ta den större.\n\nSamma anmärkning som på vinnaren gäller här. Modellen heter 12L, men ingenstans i specifikationen står det vid vilken temperatur och luftfuktighet de 12 literna är uppmätta. Elen redovisas exakt, kapaciteten inte alls. Det är den vanligaste formen av halv öppenhet bland avfuktare, och fortfarande bättre än att inte ange någonting.",
  },
  {
    id: "woods-ld40",
    name: "LD40 avfuktare källare och tvättstuga",
    shortName: "Wood's LD40",
    brand: "Wood's",
    image: productImage(AVFUKTARE.slug, "woods-ld40"),
    tagline: "Publicerar kapaciteten vid två olika villkor.",
    scores: {
      avfuktning: 3.5,
      kyla: 5,
      energi: 5,
      redovisning: 5,
      prisvarde: 1.5,
    },
    price: 7890,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/Wood%E2%80%99s-LD40-avfuktare-kallare-och-tvattstuga,-100-m2/p/46-1453`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 0, count: 0 },
    superlative: "Anger kapaciteten vid två nivåer",
    pros: [
      "Enda apparaten i handeln som publicerar kapaciteten vid två olika villkor",
      "7,5 liter vid 20 °C och 70 % RF, siffran du faktiskt får",
      "Fungerar ner till +2 °C, även i ett kallt garage",
      "180 till 250 watt, lägst effekt i förhållande till kapacitet av alla tolv",
      "11,4 liters tank och 10 års garanti från tillverkaren",
    ],
    cons: [
      "7 890 kronor, dyrast av apparaterna i jämförelsen, med bred marginal",
      "7,5 liter per dygn vid realistiska villkor är lågt för priset",
      "Noll kundomdömen, så vi vet ingenting om hur den beter sig i vardagen",
      "Inte provad av Which? eller någon annan oberoende part",
    ],
    specs: [
      { label: "Pris", value: "7 890 kr", highlight: true },
      { label: "Kapacitet", value: "7,5 l/dygn vid 20 °C / 70 % RF", highlight: true },
      { label: "Samma apparat", value: "13 l/dygn vid 30 °C / 80 % RF", highlight: true },
      { label: "Effekt", value: "180–250 W", highlight: true },
      { label: "Drifttemperatur", value: "+2 till +35 °C", highlight: true },
      { label: "Rumsyta", value: "10–100 m²" },
      { label: "Luftflöde", value: "200/300 m³/h" },
      { label: "Tank", value: "11,4 liter" },
      { label: "Ljudnivå", value: "45–55 dB(A)" },
      { label: "Köldmedium", value: "R290, 99 g" },
      { label: "Garanti", value: "10 år" },
      { label: "Display", value: "Ja, digital" },
      { label: "Filter", value: "SMF mögel- och partikelfilter" },
      { label: "Hygrostat", value: "35–75 % RH, variabel" },
      { label: "Slanganslutning", value: "Ja, 1/2 tum (slang ingår ej)" },
    ],
    verdict:
      "Wood's publicerar sin kapacitet vid två olika villkor. Ingen annan gör det, och de två talen skiljer 73 procent.\n\nI Clas Ohlsons egen specifikation står raderna efter varandra. Avfuktning vid 20 °C och 70 % RF: 7,5 liter per dygn. Avfuktning vid 30 °C och 80 % RF: 13 liter per dygn. Samma apparat, samma sida, samma dag.\n\nAlla andra tillverkare anger ett tal. Wood's anger båda, och därmed också det låga. Det är den enda produktsidan där du kan se med egna ögon vad villkoren gör med siffran, och därför står den som källa i vår källista.\n\nPå kyla och energi är den också stark. Den arbetar ner till +2 grader, vilket räcker för ett garage som inte värms, och drar 180 till 250 watt för det. Det är det bästa förhållandet mellan effekt och kapacitet av de tolv apparaterna. Wood's beskriver den som en klädtorkare som återvinner värmen ur fukten, och tio års garanti är ovanligt.\n\nSedan kommer priset. 7 890 kronor för 7,5 liter per dygn vid realistiska villkor är svårt att försvara mot Meaco Arete One 25L på 4 299, och den skillnaden är hela skälet till att den ligger trea och inte högre. Att den saknar kundomdömen helt hjälper inte, och Clas Ohlson anger begränsat antal.\n\nKöp den om du torkar tvätt i ett kallt utrymme och vill ha en apparat som talar om vad den gör. Köp den inte för literantalet.",
  },
  {
    id: "meaco-arete-one-20l",
    name: "MeacoDry Arete One 20L",
    shortName: "Meaco 20L",
    brand: "Meaco",
    image: productImage(AVFUKTARE.slug, "meaco-arete-one-20l"),
    tagline: "Serien mellan de två provade, till mellanpris.",
    scores: {
      avfuktning: 4,
      kyla: 3.5,
      energi: 5,
      redovisning: 3,
      /* 3,0 och inte 3,5: 429 kronor mer ger 25-litersmodellen, som både är
         större och är den enda i serien Which? kallar bra i kyla. Att betala
         3 870 för mellanstorleken är svårare att motivera än att lägga till
         resten. Justerat 2026-08-03 efter avläsning av den renderade
         tabellen, där 3,5 gav samma betyg som Wood's LD40. */
      prisvarde: 3,
    },
    price: 3870,
    merchant: BYGGHEMMA,
    merchantUrl: `${BYGGHEMMA_BASE}/avfuktare-och-luftrenare-meaco-meacodry-arete-one-20l/p-1887650`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "216 watt för 20 liter",
    pros: [
      "216 watt vid 20 °C och 60 % RH, 10,8 watt per liter och dygn",
      "Samma teknik, filter och slangadapter som de två provade syskonen",
      "38 och 40 dB(A), tystare än 25-litersmodellen",
      "Fyller luckan mellan 12L och 25L till 871 kronor mindre än den största",
    ],
    cons: [
      "Just den här storleken är inte provad av Which?, till skillnad från 12L och 25L",
      "Specifikationen säger inte vid vilka villkor de 20 literna gäller",
      "Går ner till 5 °C, ingen krypgrundsapparat",
      "Bygghemma publicerar inga kundbetyg alls",
    ],
    specs: [
      { label: "Pris", value: "3 870 kr", highlight: true },
      { label: "Kapacitet", value: "20 l/dygn, villkor ej angivna", highlight: true },
      { label: "Effekt", value: "216 W vid 20 °C / 60 % RH", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      { label: "Ljudnivå", value: "38 och 40 dB(A)" },
      { label: "Filter", value: "Tvättbart dammfilter, HEPA som tillval" },
      { label: "Display", value: "Ja" },
      { label: "Mått", value: "618 x 366 x 272 mm (HxBxD)" },
      { label: "Vikt", value: "15 kg" },
      { label: "Garanti", value: "5 år" },
      { label: "Köldmedium", value: "R290, 65 g" },
      { label: "Slanganslutning", value: "Ja, 12,5 mm trädgårdsslang" },
    ],
    verdict:
      "Which? provade 12L och 25L, men inte den här storleken.\n\nDet syns i betyget. Poängen för avfuktning bygger på Meacos egna tal plus det faktum att tekniken, filtret och konstruktionen är densamma som i de provade syskonen, vilket är ett rimligt men svagare underlag än en mätning.\n\nDär den är stark är energin. 216 watt vid 20 grader och 60 procent för 20 liter per dygn ger ungefär 10,8 watt per liter, vilket är i nivå med 25-litersmodellen och bättre än 12L. Den är också tystare än den största, 38 och 40 decibel mot 40 och 42.\n\nVal mellan de tre: ta 12L om utrymmet är ett rum, ta den här om det är en normalstor källare eller tvättstuga du kör året runt, och ta 25L om ytan är stor eller om du vill ha den enda med uttalat gott betyg i kyla.\n\nSamma anmärkning som på de andra Meaco-modellerna. Elen redovisas vid namngivna villkor, kapaciteten inte alls.",
  },
  {
    id: "woods-sw42fw",
    name: "SW42FW luftavfuktare",
    shortName: "Wood's SW42FW",
    brand: "Wood's",
    image: productImage(AVFUKTARE.slug, "woods-sw42fw"),
    tagline: "Går ner till +2 grader och säger vid vilken temperatur den mätts.",
    scores: {
      avfuktning: 4,
      kyla: 5,
      energi: 3,
      redovisning: 4,
      prisvarde: 2.5,
    },
    price: 5999,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/Luftavfuktare-Woods-SW42FW/p/36-7872`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 181 },
    superlative: "Fuktkontroll ner till +2 grader",
    pros: [
      "Fungerar ner till +2 °C tack vare avfrostningssystemet",
      "Tillverkaren anger både kapacitet och effekt vid 30 ºC och 80 % RH",
      "11,4 liters tank plus slanganslutning för trädgårdsslang",
      "181 kundomdömen på 4,5, ett brett underlag",
      "Plåthölje, tillverkad i Sverige, upp till 6 års garanti vid registrering",
    ],
    cons: [
      "550 eller 600 watt beroende på vem man frågar, hög förbrukning oavsett",
      "Clas Ohlson anger 25,5 liter och 550 W, Wood's anger 25 liter och 600 W",
      "Butiken utelämnar de villkor tillverkaren själv skriver ut",
      "Ingen display och ingen timer",
      "5 999 kronor, 1 700 mer än vinnaren",
    ],
    specs: [
      { label: "Pris", value: "5 999 kr", highlight: true },
      { label: "Kapacitet", value: "25 l/24 h vid 30 ºC / 80 % RH", highlight: true },
      { label: "Enligt butiken", value: "25,5 l/dygn, villkor ej angivna", highlight: true },
      { label: "Effekt", value: "600 W (Wood's) / 550 W (Clas Ohlson)", highlight: true },
      { label: "Drifttemperatur", value: "+2 till +35 °C", highlight: true },
      { label: "Rumsyta", value: "Upp till 190 m²" },
      { label: "Luftflöde", value: "315 m³/h" },
      { label: "Tank", value: "11,4 liter" },
      { label: "Display", value: "Nej" },
      { label: "Köldmedium", value: "R290" },
      { label: "Filter", value: "SMF mögel- och partikelfilter" },
      { label: "Hygrostat", value: "Variabel" },
      { label: "Slanganslutning", value: "Ja, 1/2 tum (slang ingår ej)" },
      { label: "Ljudnivå", value: "56–60 dB" },
      { label: "Vikt", value: "25 kg" },
      { label: "Garanti", value: "Upp till 6 år vid årligt filterbyte" },
    ],
    verdict:
      "Bäst av apparaterna i jämförelsen för ett riktigt kallt utrymme.\n\nDen arbetar ner till +2 grader, 3 grader lägre än Meaco-serien och lägst tillsammans med LD40. Den har 11,4 liters tank, slanganslutning för vanlig trädgårdsslang, plåthölje och 181 kundomdömen på 4,5, vilket är ett brett underlag. Wood's tillverkar den i Sverige och ger upp till sex års garanti om du registrerar den och byter filter.\n\nOch tillverkaren gör rätt sak: spectabellen på woods.se anger \"Avfuktningskapacitet (30 ºC & 80 % RH): 25 liter/24 h\" och \"Strömförbrukning (30 ºC & 80 % RH): 600 watt\". Båda talen, båda vid namngivna villkor.\n\nSedan går man till Clas Ohlson, som säljer samma apparat, och läser 25,5 liter per dygn och 550 watt. Utan villkor. Två av tillverkarens tal och två av butikens, för en och samma produkt, samma dag.\n\nIngen av dem ljuger. Det som saknas är en gemensam grund. Och det får en praktisk följd för dig: kapacitetstalet är uppmätt vid 30 grader, medan apparaten marknadsförs för utrymmen ner till 2. Det är 28 graders skillnad, och en kondensavfuktare fäller ut mindre vatten ju kallare luften är.\n\nDet som drar ner betyget är elen. 550 eller 600 watt för 25 liter är ungefär dubbelt så mycket per liter som Meaco anger, och priset på 5 999 kronor ligger 1 700 över vinnaren.",
  },
  {
    id: "meaco-arete-one-10l",
    name: "MeacoDry Arete One 10L",
    shortName: "Meaco 10L",
    brand: "Meaco",
    image: productImage(AVFUKTARE.slug, "meaco-arete-one-10l"),
    tagline: "Minsta i serien och den tystaste apparaten i jämförelsen.",
    scores: {
      avfuktning: 3,
      kyla: 3.5,
      energi: 4,
      redovisning: 3,
      prisvarde: 4.5,
    },
    price: 2586,
    merchant: BYGGHEMMA,
    merchantUrl: `${BYGGHEMMA_BASE}/avfuktare-och-luftrenare-meaco-meacodry-arete-one-10l/p-1887648`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "35 dB(A) på låg fläkt",
    pros: [
      "35 och 38 dB(A), tystast av apparaterna i jämförelsen",
      "Samma serie, filter och hygrostat som de två provade syskonen",
      "2 586 kronor, billigast av de fyra Meaco-storlekarna",
      "151 watt vid 20 °C och 60 % RH, vid namngiven nivå",
    ],
    cons: [
      "Samma 151 watt som 12L men 2 liter mindre kapacitet, sämre kvot",
      "Inte provad av Which?, till skillnad från 12L och 25L",
      "Specifikationen säger inte vid vilka villkor de 10 literna gäller",
      "10 liter räcker inte till en källare av normal storlek",
    ],
    specs: [
      { label: "Pris", value: "2 586 kr", highlight: true },
      { label: "Kapacitet", value: "10 l/dygn, villkor ej angivna", highlight: true },
      { label: "Effekt", value: "151 W vid 20 °C / 60 % RH", highlight: true },
      { label: "Ljudnivå", value: "35 och 38 dB(A)", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Hygrostat", value: "40–70 % RH" },
      { label: "Display", value: "Ja" },
      { label: "Mått", value: "472 x 319 x 237 mm (HxBxD)" },
      { label: "Vikt", value: "10,7 kg" },
      { label: "Garanti", value: "5 år" },
      { label: "Köldmedium", value: "R290, 35 g" },
      { label: "Filter", value: "Tvättbart dammfilter, HEPA ingår" },
      { label: "Slanganslutning", value: "Ja, 12,5 mm trädgårdsslang" },
    ],
    verdict:
      "Ljudnivån är hela skälet att välja den här framför 12-litersmodellen.\n\n35 och 38 decibel är hörbart men inte störande, och det spelar roll om den ska stå i ett sovrum eller en liten lägenhet. På alla andra punkter är 12L det bättre köpet: den kostar 413 kronor mer, ger två liter mer per dygn på exakt samma 151 watt, och den är dessutom provad av Which? medan den här inte är det.\n\nRäkna på kvoten och skillnaden blir tydlig. 151 watt för 10 liter är drygt 15 watt per liter och dygn, mot 12,6 för 12L. Det är samma apparat med en mindre kompressorkapacitet och samma grundförbrukning, vilket är en vanlig och sällan påpekad effekt av att köpa den minsta modellen i en serie.\n\nTa den här om ljudnivån avgör eller om utrymmet är litet. Ta annars 12L.\n\nSamma redovisningsanmärkning som resten av serien. Elen anges vid 20 grader och 60 procent, literantalet vid ingenting alls.",
  },
  {
    id: "eeese-adam-20l",
    name: "Air Care Adam luftavfuktare WiFi 20 L",
    shortName: "eeese Adam",
    brand: "eeese",
    image: productImage(AVFUKTARE.slug, "eeese-adam-20l"),
    tagline: "Bäst kvot mellan watt och liter av alla utom Meaco.",
    scores: {
      avfuktning: 3,
      kyla: 3,
      energi: 4.5,
      redovisning: 1.5,
      prisvarde: 4.5,
    },
    price: 2699,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/eeese-Air-Care-Adam-luftavfuktare-WiFi,-20-l,-100-m2/p/36-21`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 44 },
    superlative: "255 W för 20 liter per dygn",
    pros: [
      "255 watt för 20 liter per dygn, 12,75 watt per liter och dygn",
      "1 171 kronor billigare än Meaco 20L med samma nominella kapacitet",
      "5 liters tank, störst av alla utom Wood's två",
      "44 kundomdömen på 4,5",
      "Wifi, timer 1 till 24 timmar, barnlås, hjul och tvättbart filter",
    ],
    cons: [
      "Inga villkor angivna för vare sig kapaciteten eller effekten",
      "100 m² för samma 20 liter per dygn som Clas Ohlsons egen apparat anger 52 för",
      "44 dB(A) på hög fläkt, bland de högre här",
      "Går ner till 5 °C, ingen apparat för ett kallt garage",
      'Butiken kallar den "Bästa Hög kapacitet i test 2024" utan att namnge testet',
    ],
    specs: [
      { label: "Pris", value: "2 699 kr", highlight: true },
      { label: "Kapacitet", value: "20 l/dygn, villkor ej angivna", highlight: true },
      { label: "Effekt", value: "255 W, villkor ej angivna", highlight: true },
      { label: "Rumsyta", value: "100 m²", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Tank", value: "5 liter" },
      { label: "Luftflöde", value: "145/130 m³/h" },
      { label: "Ljudnivå", value: "44 och 42 dB(A)" },
      { label: "Filter", value: "Tvättbart" },
      { label: "Garanti", value: "3 år" },
      { label: "Display", value: "Ja" },
      { label: "Vikt", value: "15,2 kg" },
      { label: "Köldmedium", value: "R290" },
      { label: "Slanganslutning", value: "Ja, 14 mm (slang ingår ej)" },
    ],
    verdict:
      "Bästa affären av de tolv för den som vill ha 20 liter utan att betala Meacopris.\n\n255 watt för 20 liter per dygn ger 12,75 watt per liter, vilket bara Meacoserien slår. Clas Ohlsons egen tjugolitersapparat drar 440 watt för samma kapacitet, 73 procent mer, och kostar bara 200 kronor mindre. Tanken rymmer 5 liter, mer än allt annat här utom Wood's 11,4. Wifi, timer mellan 1 och 24 timmar, barnlås, hjul och tvättbart filter ingår, och 44 kundomdömen på 4,5 är ett rimligt underlag.\n\nSedan kommer areatalet. **eeese anger 100 kvadratmeter för 20 liter per dygn. Clas Ohlson anger 52 kvadratmeter för 20 liter per dygn.** Samma butik, samma hylla, samma dag, nästan dubbla talet för identisk nominell kapacitet. Ingen av dem säger hur de räknat, och det finns ingen gemensam grund att räkna på. Gå efter liter och watt i stället för kvadratmeter. Adam är illustrationen till varför.\n\nSamma sak gäller literantalet självt. Ingenstans står det vid vilken temperatur och luftfuktighet de 20 literna eller de 255 watten är uppmätta, vilket ger 1,5 på öppen redovisning. Kvoten mellan effekt och kapacitet ser bra ut, men den ärver osäkerheten i båda talen.\n\nClas Ohlson inleder produkttexten med Bästa Hög kapacitet i test 2024. Vilket test det gäller står inte, och vi har inte hittat något test med den indelningen. Vi har inte räknat det som ett testomdöme.\n\nDen går ner till 5 grader, samma undre gräns som Meaco och eeese i övrigt. Ska apparaten stå i ett ouppvärmt garage är det Wood's du ska titta på.",
  },
  {
    id: "eeese-hugo-25l",
    name: "Air Care Hugo luftavfuktare och luftrenare 25 L",
    shortName: "eeese Hugo",
    brand: "eeese",
    image: productImage(AVFUKTARE.slug, "eeese-hugo-25l"),
    tagline: "IPX4-klassad, den enda som får stå i ett badrum.",
    scores: {
      avfuktning: 3.5,
      kyla: 3,
      energi: 4.5,
      redovisning: 1.5,
      prisvarde: 2.5,
    },
    price: 4499,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/eeese-Air-Care-Hugo-luftavfuktare,-luftrenare-25-l/p/36-22`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 3, count: 1 },
    superlative: "IPX4, godkänd för våtutrymme",
    pros: [
      "IPX4-klassad, den enda här som får användas i badrum",
      "290 watt för 25 liter per dygn, god kvot på papperet",
      "HEPA-filter, så den fungerar som luftrenare när fukten är borta",
      "4,5 liters tank och torkläge för kläder",
    ],
    cons: [
      "Inga villkor alls angivna för de 25 literna",
      "4 499 kronor, 200 mer än vinnaren som är provad",
      "Ett enda kundomdöme, satt till 3 av 5",
      "44 dB(A), bland de högre ljudnivåerna här",
      "eeese Adam ger 20 liter på 255 watt för 1 800 kronor mindre",
    ],
    specs: [
      { label: "Pris", value: "4 499 kr", highlight: true },
      { label: "Kapacitet", value: "25 l/dygn, villkor ej angivna", highlight: true },
      { label: "Effekt", value: "290 W, villkor ej angivna", highlight: true },
      { label: "Kapslingsklass", value: "IPX4", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Tank", value: "4,5 liter" },
      { label: "Luftflöde", value: "190 m³/h" },
      { label: "Ljudnivå", value: "44 dB(A)" },
      { label: "Filter", value: "HEPA, tvättbart förfilter" },
      { label: "Display", value: "Ja" },
      { label: "Garanti", value: "Upp till 3 år" },
    ],
    verdict:
      "Ensam om att vara kapslad för ett våtutrymme.\n\nIPX4 betyder skydd mot vattenstänk från alla riktningar. Ett badrum utan fönster där duschen används dagligen är ett av de vanligaste ställena en avfuktare hamnar på, och de flesta apparater här har ingen kapslingsklass alls angiven. Har du det problemet är valet nästan gjort.\n\nPå papperet är den också energieffektiv: 290 watt för 25 liter per dygn ger 11,6 watt per liter, i nivå med Meaco. Problemet är att ingetdera talet är kopplat till några villkor. Vi vet inte vid vilken temperatur eller luftfuktighet de 25 literna gäller, och därmed inte heller vad kvoten är värd. Det är därför den får 1,5 på öppen redovisning.\n\nPriset gör resten. 4 499 kronor är 200 kronor mer än Meaco Arete One 25L, som har samma nominella kapacitet, redovisar sin effekt vid namngivna villkor och dessutom är provad av Which?. Det enda kundomdöme som finns är satt till 3 av 5.\n\nKöp den för badrummet. Köp den inte för literantalet, eftersom du inte vet vad det betyder.",
  },
  {
    id: "clas-ohlson-20l",
    name: "Luftavfuktare 20 liter, 52 m²",
    shortName: "Clas Ohlson 20 L",
    brand: "Clas Ohlson",
    image: productImage(AVFUKTARE.slug, "clas-ohlson-20l"),
    tagline: "416 kundomdömen, bredast vardagsunderlag av alla apparaterna.",
    scores: {
      avfuktning: 3,
      kyla: 2.5,
      energi: 3,
      redovisning: 1.5,
      prisvarde: 4.5,
    },
    price: 2499,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/Luftavfuktare-20-liter,-52-m2/p/36-8322`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 416 },
    superlative: "416 omdömen på 4,5",
    pros: [
      "416 kundomdömen på 4,5, flest av alla apparaterna",
      "2 499 kronor för 20 liter per dygn och 52 kvadratmeter",
      "Display, ställbar fuktnivå, timer och avfrostningsfunktion",
      "Slanganslutning med 13,5 mm innerdiameter för kontinuerlig dränering",
    ],
    cons: [
      "Inga villkor angivna för vare sig kapacitet eller effekt",
      "440 watt för 20 liter, 22 watt per liter och dygn",
      "Stannar vid 5 °C i nedre kanten och 32 i övre, snävast intervall här",
      "46 dB(A), högst ljudnivå av de rankade",
      "3 liters tank, så tömning ofta om du inte kopplar slang",
    ],
    specs: [
      { label: "Pris", value: "2 499 kr", highlight: true },
      { label: "Kapacitet", value: "20 l/dygn, villkor ej angivna", highlight: true },
      { label: "Effekt", value: "440 W, villkor ej angivna", highlight: true },
      { label: "Rumsyta", value: "52 m²", highlight: true },
      { label: "Drifttemperatur", value: "5–32 °C", highlight: true },
      { label: "Tank", value: "3 liter" },
      { label: "Ljudnivå", value: "46 dB" },
      { label: "Köldmedium", value: "R290, 0,07 kg" },
      { label: "Avfrostning", value: "Ja" },
      { label: "Display", value: "Ja" },
      { label: "Timer", value: "Ja" },
      { label: "Hygrostat", value: "Ja, justerbar" },
      { label: "Slanganslutning", value: "Ja, 13,5 mm innerdiameter" },
      { label: "Mått", value: "510 x 350 x 245 mm (HxBxD)" },
    ],
    verdict:
      "416 kundomdömen på 4,5 gör den till den mest köpta apparaten i jämförelsen.\n\nClas Ohlsons egen tioliters ligger närmast med 374. Meacos fyra modeller har noll omdömen hos Bygghemma, Wood's LD40 har noll, och eeese Hugo har ett. Det säger inget om avfuktningsförmåga, men mycket om att apparaten fungerar i vardagen hos ett stort antal hushåll.\n\nFör 2 499 kronor får du 20 liter per dygn, 52 kvadratmeter, display, ställbar fuktnivå, timer, avfrostning och slanganslutning. Det är den mest kompletta funktionslistan per krona av apparaterna här.\n\nElen är hög: 440 watt för 20 liter blir 22 watt per liter och dygn, ungefär dubbelt Meacos siffra. Temperaturintervallet är snävast här, 5 till 32 grader, vilket gör den till en apparat för uppvärmda utrymmen och inte för garaget. Och 46 decibel är den högsta ljudnivån bland de rankade.\n\nDen principiella invändningen står kvar. Butiken anger 20 liter per dygn och 440 watt, och säger ingenting om vid vilken temperatur eller luftfuktighet något av det är uppmätt. Du kan alltså inte ställa den mot Meaco på annat än förhoppning. Det är därför den får 1,5 på öppen redovisning trots att allt annat på produktsidan är ovanligt utförligt.",
  },
  {
    id: "eeese-emil-10l",
    name: "Air Care Emil luftavfuktare 10 liter",
    shortName: "eeese Emil",
    brand: "eeese",
    image: productImage(AVFUKTARE.slug, "eeese-emil-10l"),
    tagline: "155 watt mot 360 för samma tio liter.",
    scores: {
      avfuktning: 2.5,
      kyla: 3,
      energi: 4,
      redovisning: 1.5,
      /* 3,0 och inte 3,5. Prisvärde är inte lägst pris: Clas Ohlsons
         tjugolitersapparat ger dubbla kapaciteten för 350 kronor mer.
         Justerat 2026-08-03 efter avläsning av den renderade tabellen, där
         3,5 gav de två samma betyg. Den behöll budgetutmärkelsen när Clas
         Ohlsons tioliters kom in på 1 499 kr, eftersom 155 watt mot 360 för
         samma kapacitet gör den billigare att äga. */
      prisvarde: 3,
    },
    price: 2149,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/eeese-Air-Care-Emil-luftavfuktare,-10-liter,-42-m2/p/36-20`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 6 },
    award: "budget",
    superlative: "155 W mot 360 för samma tio liter",
    pros: [
      "2 149 kronor för 10 liter per dygn på 155 watt",
      "155 watt för 10 liter per dygn, låg förbrukning",
      "Tvättbart filter, ingen förbrukningsdel att köpa",
      "Barnlås, timer, två fläkthastigheter och integrerade handtag",
    ],
    cons: [
      "Inga villkor angivna för kapacitet eller effekt",
      "Produktnamnet säger 42 m², spectabellen säger 40",
      "Bara 2,6 liters tank, så ofta tömning utan slang",
      "10 liter per dygn räcker inte till en källare",
      "6 kundomdömen, tunt underlag",
    ],
    specs: [
      { label: "Pris", value: "2 149 kr", highlight: true },
      { label: "Kapacitet", value: "10 l/dygn, villkor ej angivna", highlight: true },
      { label: "Effekt", value: "155 W, villkor ej angivna", highlight: true },
      { label: "Rumsyta", value: "40 m² i spectabellen", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Tank", value: "2,6 liter" },
      { label: "Luftflöde", value: "105 m³/h" },
      { label: "Filter", value: "Tvättbart" },
      { label: "Display", value: "Ja" },
      { label: "Garanti", value: "Upp till 3 år" },
    ],
    verdict:
      "Budgetvalet ligger här och inte på det lägsta priset. 155 watt mot 360 för samma tio liter är skälet.\n\n2 149 kronor för 10 liter per dygn på 155 watt är en rimlig affär. Kvoten blir 15,5 watt per liter och dygn, bättre än både Clas Ohlsons egna och Wood's SW42FW. Filtret är tvättbart, så det finns ingen förbrukningsdel att köpa, och efter elen är det den enskilt viktigaste driftkostnaden.\n\nDen är också liten. 46 centimeter hög, integrerade handtag, barnlås och timer. Ska apparaten flyttas mellan sovrum och tvättstuga är det en verklig fördel framför Meacos 16 kilo.\n\nMen den har samma grundproblem som resten av eeese-sortimentet: ingenstans står det vid vilka villkor de 10 literna eller de 155 watten gäller. Och den har ett eget litet fel som säger något om hur noga uppgifterna hanteras. Produktnamnet hos Clas Ohlson säger 42 kvadratmeter. Butikens egen spectabell på samma sida säger 40.\n\nClas Ohlsons tiolitersapparat kostar 650 kronor mindre för samma tio liter, men drar mer än dubbelt så mycket el. Åt andra hållet kostar tjugolitersapparaten 350 kronor mer och ger dubbla kapaciteten, vilket håller prisvärdet nere på 3,0.",
  },
  {
    id: "clas-ohlson-10l",
    name: "Luftavfuktare 10 liter, 31 m²",
    shortName: "Clas Ohlson 10 L",
    brand: "Clas Ohlson",
    image: productImage(AVFUKTARE.slug, "clas-ohlson-10l"),
    tagline: "Enda produkttexten som ger literantalet ett förbehåll.",
    scores: {
      avfuktning: 2.5,
      kyla: 2.5,
      energi: 1.5,
      /* 2,0 enligt skalan i sidans fotnot: en vag reservation i löptext. Den
         är sidans enda, och den ligger över dem som inget säger och under dem
         som anger temperatur och luftfuktighet. */
      redovisning: 2,
      prisvarde: 4,
    },
    price: 1499,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/Luftavfuktare-10-liter,-31-m2/p/36-8321`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 374 },
    superlative: "1 499 kr, lägsta priset här",
    pros: [
      "1 499 kronor, lägsta priset bland de rankade",
      "374 kundomdömen på 4,5, näst bredaste underlaget",
      "Enda produkttexten som ger ett förbehåll för literantalet",
      "Fuktnivån ställs 35 till 85 procent i steg om fem, finaste steget här",
      "Minnesfunktion som startar om apparaten efter strömavbrott",
    ],
    cons: [
      "360 watt för 10 liter, 36 watt per liter och dygn och sämst av de tolv apparaterna",
      "eeese Emil ger samma 10 liter på 155 watt, mindre än halva",
      "5 till 32 °C, snävast intervall av apparaterna i jämförelsen",
      "1,6 liters tank, minst av apparaterna i jämförelsen, så tömning ofta utan slang",
      "Förbehållet anger ingen temperatur och ingen luftfuktighet, bara cirka 15 grader",
    ],
    specs: [
      { label: "Pris", value: "1 499 kr", highlight: true },
      { label: "Kapacitet", value: "10 l/dygn, vagt förbehåll i texten", highlight: true },
      { label: "Effekt", value: "360 W, villkor ej angivna", highlight: true },
      { label: "Rumsyta", value: "31 m²", highlight: true },
      { label: "Drifttemperatur", value: "5–32 °C", highlight: true },
      { label: "Hygrostat", value: "35–85 %, steg om 5" },
      { label: "Tank", value: "1,6 liter" },
      { label: "Ljudnivå", value: "41 dB" },
      { label: "Slanganslutning", value: "Innerdiameter 13,5 mm" },
      { label: "Köldmedium", value: "R290, 45 g" },
      { label: "Display", value: "Ja" },
      { label: "Timer", value: "Ja" },
      { label: "Avfrostning", value: "Ja" },
      { label: "Mått", value: "441 x 334 x 224 mm (HxBxD)" },
    ],
    verdict:
      "Billigast av apparaterna i jämförelsen, 1 499 kronor.\n\nClas Ohlson skriver: avfuktar upp till 10 liter per dygn \"vid optimala temperaturförhållanden, från cirka 15 grader och uppåt\". Det är ingen deklaration. Det anger varken luftfuktighet eller en mätpunkt, och cirka 15 grader är inte ett provvillkor. Men det är mer än någon annan produkttext här säger, och den får därför 2,0 på öppen redovisning i stället för 1,5.\n\nApparaten är marknadsförd för tvättstugor, uppvärmda källare och garage, och den anger 5 grader som undre driftgräns. Samtidigt säger tillverkaren att literantalet gäller från ungefär 15 grader och uppåt. Mellan 5 och 15 grader arbetar den alltså, men inte i närheten av tio liter. Det gäller med all sannolikhet varje kondensavfuktare i jämförelsen. Skillnaden är att den här skriver det.\n\nIngen av de andra elva reglerar lika fint. Fuktnivån ställs mellan 35 och 85 procent i steg om fem, finare steg än de flesta här erbjuder, och det finns display, timer, avfrostning och en minnesfunktion som startar om apparaten efter strömavbrott. 374 kundomdömen på 4,5 säger att den fungerar i vardagen.\n\nDet som sänker den är elen. **360 watt för 10 liter per dygn blir 36 watt per liter, den sämsta kvoten av alla apparaterna, med bred marginal.** eeese Emil gör samma tio liter på 155 watt. Meaco Arete One 25L ligger på 10,7. Kör du en avfuktare kontinuerligt under en fuktig höst är det där pengarna försvinner, inte i inköpspriset.\n\nTill det kommer det snävaste temperaturintervallet av de tolv, 5 till 32 grader, och den minsta tanken, 1,6 liter, som en apparat med tio liters kapacitet fyller flera gånger om dygnet.\n\nKöp den om du vill ha en billig apparat till ett uppvärmt rum och tänker koppla slang. Ska den gå mycket, räkna på elen först.",
  },
  {
    id: "xiaomi-dehumidifier-lite",
    name: "Smart Dehumidifier Lite avfuktare 13 l/dygn",
    shortName: "Xiaomi Lite",
    brand: "Xiaomi",
    image: productImage(AVFUKTARE.slug, "xiaomi-dehumidifier-lite"),
    tagline: "Appstyrd och tyst, men butiken talar knappt om vad den gör.",
    scores: {
      avfuktning: 2.5,
      kyla: 1.5,
      energi: 2,
      redovisning: 1,
      prisvarde: 3,
    },
    price: 2490,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/inomhusklimat-uppvarmning/luftavfuktare/xiaomi-smart-dehumidifier-lite-avfuktare-13-ldygn-p47223",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "34 dB(A) i sovläge",
    pros: [
      "34 dB(A) i sovläge, bland de tystare här",
      "Tre lägen: smart, torkning och sov",
      "Styrs via Xiaomi Home, samma app som övrig Xiaomi-utrustning",
      "3 liters tank och direktavlopp via slang",
    ],
    cons: [
      "Kjell anger varken effekt, driftstemperatur eller max rumsstorlek",
      "Inga villkor angivna för de 13 literna",
      "Utan effektuppgift går driftkostnaden inte att räkna alls",
      "Inga kundomdömen publicerade",
      "2 490 kronor för 13 liter är dyrt mot eeese Emil på 2 149 för 10",
    ],
    specs: [
      { label: "Pris", value: "2 490 kr", highlight: true },
      { label: "Kapacitet", value: "13 l/dygn, villkor ej angivna", highlight: true },
      { label: "Effekt", value: "Uppgift saknas", highlight: true },
      { label: "Drifttemperatur", value: "Uppgift saknas", highlight: true },
      { label: "Rumsyta", value: "Uppgift saknas", highlight: true },
      { label: "Ljudnivå", value: "34 dB(A) i sovläge" },
      { label: "Tank", value: "3 liter" },
      { label: "App", value: "Xiaomi Home" },
      { label: "Display", value: "Ja, med pekkontroll" },
      { label: "Filter", value: "Tvättbart antibakteriellt filter" },
      { label: "Slanganslutning", value: "Ja, 1 m slang 13,5 mm ingår" },
    ],
    verdict:
      "Sist av de rankade. Apparaten är inte problemet; det vi inte får veta om den är det.\n\nKjell anger 13 liter per dygn, 34 decibel i sovläge, tre liters tank, tre lägen och appstyrning. Sedan tar uppgifterna slut. Ingen effekt i watt. Ingen driftstemperatur. Ingen maximal rumsstorlek. Inga kundomdömen.\n\nUtan effektuppgift går driftkostnaden inte att räkna över huvud taget, och den är enligt Which? den enda meningsfulla axeln. Utan driftstemperatur vet du inte om den klarar en källare på åtta grader. Utan rumsstorlek vet du inte om 13 liter är mycket eller lite för ditt utrymme.\n\nDen får därför 1,0 på öppen redovisning, lägst av de tolv apparaterna, och låga poäng på både kyla och energi. Vi sätter inte en nolla där en uppgift saknas, vi skriver att den saknas, men en uppgift som saknas kan inte heller ge poäng.\n\nDet finns ett verkligt argument för den ändå. Har du redan Xiaomi Home och vill styra fukten i samma app som allt annat, och står apparaten i ett sovrum där 34 decibel spelar roll, då är den rimlig. För alla andra ger eeese Emil mer redovisad information för 341 kronor mindre.",
  },
];

export const AVFUKTARE_PRODUCTS = resolveProducts(AVFUKTARE, SEEDS);

export const AVFUKTARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Duux",
    name: "Bora Smart",
    reason:
      "En av de åtta modeller Which? rekommenderar, och den finns hos Elgiganten med artikelnummer 563304 och GTIN 8716164994575. Vi rankar den ändå inte, av ett enda skäl: ingen butik skriver ut vad den kostar. Elgiganten visar inget pris på sin produktsida, duux.se anger inget alls, och Electrolux Homes sida för märket är borta. Vi rankar bara produkter vars pris vi kan läsa hos säljaren och datera. Specifikationen är i övrigt bra: 20 liter per dygn, 420 watt, 40 kvadratmeter, hygrostat 40 till 80 procent i femstegsintervall, autofrost, WiFi och kolfilter. Villkoren för de 20 literna anges inte.",
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/inomhusklimat-uppvarmning/luftkvalitet/luftavfuktare/duux-bora-smart-avfuktare-420-watt-vit/563304",
  },
  {
    brand: "Cleverio",
    name: "AD100 kompakt luftavfuktare",
    reason:
      "Den ligger kvar här av ett skäl som inte är priset och inte lagret: den gör något annat än apparaterna vi rankar. Kjell anger 750 milliliter avfuktning per dag, 0,75 liter. Den minsta apparaten i rankningen tar 10 liter, den största 25. Det är en trettondel av den minsta, i en låda på 2,7 kilo avsedd för garderober och förrådsutrymmen upp till 20 kvadratmeter. Att ställa den mot en kondensavfuktare som flyttar 145 kubikmeter luft i timmen vore som att jämföra ett resestrykjärn med ett strykjärn. Kjell publicerar inte heller effekt eller driftstemperatur, så driftkostnaden går inte att räkna. 899 kronor, 69 kundomdömen på 3,5.",
    approxPrice: 899,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/inomhusklimat-uppvarmning/luftavfuktare/cleverio-ad100-kompakt-luftavfuktare-med-hepa-filter-p90231",
  },
  {
    brand: "EcoAir",
    name: "DD1 Classic MK6 och DD3 Classic MK3",
    reason:
      "Två av de åtta Which? rekommenderar, och de enda sorptionsavfuktarna på listan. Båda arbetar toppenbra vid såväl höga som låga temperaturer enligt Which?, som också noterar att DD3 har ovanligt god energieffektivitet för att vara sorption. Vi hittar ingen återförsäljare här. De säljs direkt från ecoair.org i Storbritannien, och en apparat utan pris, garanti och retur i landet hör inte hemma i rankningen.",
  },
  {
    brand: "Pro Breeze",
    name: "OmniDry 20 L och 30L Smart",
    reason:
      "Också rekommenderade av Which?. Pro Breeze driver en egen EU-butik på eu.probreeze.com med 201 produkter, men den prissätter i euro, och i övrigt hittar vi dem i Sverige bara via Amazon.se. Samma princip som EcoAir: vi rankar bara produkter med ett pris hos en säljare här som vi kan läsa och datera.",
  },
  {
    brand: "Pattex",
    name: "Aero 360",
    reason:
      "Kjell säljer den i sin avfuktarkategori och den heter luftavfuktare, men den är en passiv fuktabsorbent: en behållare med en tablett kalciumklorid som drar åt sig fukt tills den är mättad och sedan ska bytas. Ingen kompressor, ingen fläkt, ingen kapacitet per dygn, ingen reglering. Den fungerar i en garderob eller en husvagn som står still, och den löser ingenting i en källare. Vi jämför inte den med en apparat som flyttar 300 kubikmeter luft i timmen.",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/inomhusklimat-uppvarmning/luftavfuktare/pattex-aero-360-luftavfuktare-p53387",
  },
  {
    brand: "Diverse",
    name: "Luftfuktare",
    reason:
      "Löser det motsatta problemet. En avfuktare tar bort fukt, en luftfuktare tillför den. Har du torr luft och statisk elektricitet vintertid är det luftfuktare du ska läsa om, men läs noga: SweSIAQ avråder i allmänhet från konstgjord befuktning.",
  },
];

export const AVFUKTARE_FAQ = [
  {
    question: "Vilken avfuktare är bäst 2026?",
    answer:
      "Meaco MeacoDry Arete One 25L för 4 299 kronor hos Bygghemma. Den är en av bara två apparater i svensk handel som brittiska Which? har provat och gett minst 80 procent av maxpoängen, och deras omdöme är att den har lägst driftkostnad av samtliga rekommenderade apparater och fungerar bra även i kyla. Det spelar roll eftersom Which? provar vid 21 grader och kallare, medan tillverkarnas egna literantal i regel är uppmätta vid 30 grader. Meaco redovisar dessutom effekten vid namngivna villkor, 267 watt vid 20 grader och 60 procent relativ fuktighet. Behöver du inte 25 liter är samma serie i 12-litersutförande för 2 999 kronor det klokare köpet, och den är också provad.",
  },
  {
    question: "Vad betyder liter per dygn på en avfuktare?",
    answer:
      "Det är hur mycket vatten apparaten tar ur luften på ett dygn, men talet är nästan värdelöst utan de villkor det är uppmätt vid, och de anges sällan. Wood's anger sina tal vid 30 grader och 80 procent relativ fuktighet. Meaco anger effekten vid 20 grader och 60 procent men säger ingenting om vid vilka villkor literantalet i modellnamnet gäller. Clas Ohlsons egna apparater, eeese, Xiaomi och Duux anger inga villkor alls. Hur mycket det betyder syns bäst på Wood's LD40, som är den enda apparat i svensk handel som publicerar båda talen: 7,5 liter per dygn vid 20 grader och 70 procent, och 13 liter vid 30 grader och 80 procent. Samma apparat, 73 procents skillnad.",
  },
  {
    question: "Kondensavfuktare eller sorptionsavfuktare?",
    answer:
      "Temperaturen avgör. En kondensavfuktare har en kompressor och kyler luften under daggpunkten så att vattnet fälls ut, precis som imma på en kall flaska. Den fungerar bra i uppvärmda utrymmen och sämre ju kallare det blir, eftersom kall luft innehåller mindre vatten från början. En sorptionsavfuktare använder i stället ett torkmedel som binder fukten och värms för att släppa den, och den fungerar även under noll grader. Stiftung Warentest sammanfattar det som att kondensavfuktare spelar ut sina styrkor i uppvärmda rum medan sorptionsavfuktare är effektiva även vid lägre temperaturer, och att kondenstypen fungerar bäst från ungefär 10 grader och uppåt. Har du krypgrund eller ouppvärmt garage är sorption rätt svar, men de säljs i praktiken inte av de stora svenska butikerna.",
  },
  {
    question: "Vilken luftfuktighet bör man ha inomhus?",
    answer:
      "Under 60 procent, och gärna en bra bit under. Mögel hotar om luftfuktigheten i rum varaktigt stiger över den nivån, enligt Stiftung Warentest. Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 går längre och räknar upp de indikationer som kan få tillsynsmyndigheten att kräva undersökning av en byggnad enligt miljöbalken, och en av dem är om luftfuktighetens medelvärde överstiger 7 gram vatten per kilo torr luft under en längre period under eldningssäsongen, vilket motsvarar cirka 45 procent relativ luftfuktighet vid 21 grader. Observera vad det är: allmänna råd är rekommendationer och inte bindande regler, och 45 procent är en indikation för undersökning och inte ett gränsvärde. SweSIAQ tillägger att dammkvalster kan börja växa i rumstemperatur redan över 45 till 50 procent.",
  },
  {
    question: "Fungerar en avfuktare i ett kallt garage eller en krypgrund?",
    answer:
      "En kondensavfuktare fungerar sämre ju kallare det blir och slutar helt under sin angivna nedre gräns, som för de flesta apparater i vår jämförelse ligger på 5 grader. Wood's SW42FW och LD40 går ner till 2 grader tack vare avfrostning, och det är de enda i vår rankning som gör det. Under det behöver du en sorptionsavfuktare, som arbetar även i minusgrader. Tänk också på att kapacitetstalet på kartongen i regel är uppmätt vid 30 grader: en apparat som anger 25 liter per dygn tar ut betydligt mindre i ett garage som håller 6. Wood's LD40 visar storleksordningen genom att publicera båda talen, 13 liter vid 30 grader mot 7,5 vid 20.",
  },
  {
    question: "Hur mycket el drar en avfuktare?",
    answer:
      "Mellan 151 och 600 watt bland apparaterna i vår jämförelse, men det är fel sätt att räkna. Which?, den enda oberoende provningen i Europa, sätter förbrukningen i relation till mängden uppsamlat vatten i stället för till tiden, och motiverar det med att vissa apparater behöver dubbelt så lång drifttid för samma vattenmängd. Räknar man så blir spannet i vår jämförelse ungefär 10,7 watt per liter och dygn för Meaco Arete One 25L upp till 36 för Clas Ohlsons tiolitersapparat, mer än tre gånger. Var noga med att kvoten ärver samma problem som talen den bygger på: Meacos watt är uppmätta vid 20 grader och 60 procent, Wood's vid 30 och 80, och Clas Ohlsons vid ingenting angivet.",
  },
  {
    question: "Finns det en standard för hur avfuktare ska mätas?",
    answer:
      "Ja, och den heter SS-EN 810. Den svenska titeln är Luftavfuktare med eldriven kompressor: provning av avfuktningsförmåga, märkning, funktionskrav och redovisning av tekniska data, vilket är precis det som gör talen ojämförbara. Hos SIS anges den som gällande, utgåva 1, fastställd 30 april 1997, 21 sidor, framtagen av kommittén för värmepumpar, och den kostar 1 097 kronor. Den är snart trettio år gammal och har aldrig fått en andra utgåva. Och den gäller enligt sin egen titel bara avfuktare med eldriven kompressor, inte sorptionsavfuktare, som är den typ som rekommenderas för kalla krypgrunder. Vi har inte köpt standarden och påstår därför ingenting om vilka provvillkor den föreskriver.",
  },
  {
    question: "Behöver jag verkligen en avfuktare?",
    answer:
      "Kanske inte. En avfuktare är ingen permanent lösning, enligt ÖKO-TEST: är rum varaktigt för fuktiga är något fel, och då ska orsaken åtgärdas, annars tar både hälsan och byggnaden skada. Folkhälsomyndighetens allmänna råd säger samma sak från andra hållet, genom att göra ihållande hög luftfuktighet till en indikation för att undersöka byggnaden. En avfuktare är rätt verktyg för ett avgränsat jobb: torka tvätt inomhus, ta hand om en fuktig höst, hålla en källare i schack medan orsaken utreds. Den är fel verktyg mot en läckande grund eller en trasig ventilation. Köp en hygrometer för hundra kronor och mät i två veckor först.",
  },
  {
    question: "Vilken storlek på avfuktare behöver jag?",
    answer:
      "Butikernas kvadratmetertal går inte att lita på, eftersom ingen anger hur de räknat. Clas Ohlson anger 52 kvadratmeter för sin tjugolitersapparat, medan eeese anger 100 kvadratmeter för samma 20 liter per dygn. Samma butik, samma hylla, nästan dubbla talet. Gå i stället efter hur stort utrymmet faktiskt är, hur kallt det blir där, och hur snabbt du behöver ha fukten borta. Ett rum eller ett badrum klarar sig med 10 till 12 liter per dygn. En normalstor källare eller tvättstuga du kör året runt bör ha 20. Ett stort eller uppdelat utrymme behöver 25 eller mer, och då ska du också titta på luftflödet i kubikmeter per timme, eftersom vatten som fälls ut i ett hörn inte hjälper i det andra.",
  },
  {
    question: "Hur ofta måste jag tömma vattentanken?",
    answer:
      "I ett fuktigt utrymme varje dygn, och det är oftare än de flesta räknar med. Tankarna i vår jämförelse rymmer mellan 2,6 och 11,4 liter, och en apparat som anger 20 liter per dygn fyller en trelitertank flera gånger om dagen om den verkligen arbetar. När tanken är full stannar apparaten, och en avfuktare som står stilla avfuktar ingenting. Har du golvbrunn eller avlopp i utrymmet ska du därför koppla slang för kontinuerlig dränering och sluta bry dig om tankstorleken helt. Kontrollera vilken koppling som gäller: Wood's tar en vanlig trädgårdsslang via halvtumskoppling, medan Clas Ohlsons egna apparater vill ha 13,5 millimeters innerdiameter.",
  },
  {
    question: "Låter en avfuktare mycket? Kan den stå i sovrummet?",
    answer:
      "De apparater vi jämför anger mellan 35 och 46 decibel, en skillnad som hörs tydligt. Meaco Arete One 10L är tystast med 35 och 38 dB(A) på sina två fläktlägen, och Clas Ohlsons tjugolitersapparat högst med 46. Som jämförelse brukar ett tyst sovrum ligga runt 30 decibel. En avfuktare är dessutom inte som en fläkt: kompressorn startar och stannar när hygrostaten slår till och från, och det är ofta växlingen snarare än ljudnivån som väcker folk. Ska den stå i ett sovrum, välj den lägsta angivna nivån du kan få och räkna med att köra den på lågt fläktläge.",
  },
  {
    question: "Blir det billigare att torka tvätt med avfuktare än med torktumlare?",
    answer:
      "Ofta ja, och skälet är att energin inte försvinner. En kondensavfuktare fäller ut vattnet ur luften och avger samtidigt värmen som frigörs, så en del av elen kommer tillbaka till rummet i stället för att blåsas ut. Wood's anger för LD40 att den återför 780 watt värme per liter vattenånga. Apparaterna i vår jämförelse drar mellan 151 och 600 watt, medan en torktumlare typiskt ligger på flera gånger det. Räkna dock med att det tar längre tid, och att du behöver stänga dörren till rummet, annars fuktar du resten av bostaden i stället för att torka tvätten.",
  },
  {
    question: "Vad är R290, och är det farligt?",
    answer:
      "R290 är propan, och det är köldmediet i samtliga kondensavfuktare i vår jämförelse. Det används för att det har mycket låg klimatpåverkan jämfört med äldre syntetiska köldmedier. Det är brandfarligt, och det är skälet till att mängden anges i gram i specifikationen: Clas Ohlsons tiolitersapparat innehåller 45 gram och deras tjugolitersapparat 70 gram, medan Meacos Arete One trappas upp med storleken: 35 gram i tiolitersmodellen, 45 i tolvan, 65 i tjugan och 90 i tjugofemman. Mängderna är små och systemet är slutet, men det förklarar varför tillverkarna anger en minsta rumsstorlek för vissa modeller och varför en skadad apparat inte ska köras vidare.",
  },
];
