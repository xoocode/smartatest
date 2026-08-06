import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { AVFUKTARE } from "@/lib/test-pages";

/**
 * Avfuktare. Underlag i .agent/research/avfuktare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser och kundbetyg lästa 2026-08-03. Kapacitet,
 * effekt, driftstemperatur, tankvolym, ljudnivå, luftflöde, vikt och köldmedium
 * lästa 2026-08-06 hos tillverkaren där tillverkaren publicerar dem, annars hos
 * butiken. Källan står i kommentar vid varje värde som ändrats.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte mätt avfuktning,
 * inte vägt uppsamlat vatten och inte provat någon apparat.
 *
 * ## Sidans fynd, omskrivet 2026-08-06
 *
 * Sidan påstod tidigare att nio av tolv tillverkare inte anger vid vilka
 * villkor literantalet gäller. **Det var fel, och felet låg hos oss.** Tre
 * tillverkare publicerar villkoren, två av dem på sidor vi inte hade öppnat:
 *
 * - **Meaco** publicerar en extraktionstabell per modell med sex rader, 10, 20
 *   och 30 ºC mot 50, 60 och 80 % RH, och både liter och watt i varje rad. Det
 *   är den utförligaste uppgiften i hela kategorin, och den enda som sträcker
 *   sig ned till 10 ºC. Meaco var den tillverkare sidan pekade ut som värst.
 * - **eeese** publicerar två rader per modell: 30 ºC/80 % RH och 27 ºC/60 % RH.
 * - **Wood's** anger 30 ºC/80 % RH, och bruksanvisningen till hela SW- och
 *   LD-serien har en egen rad för 20 ºC/70 % RF med både liter och watt.
 * - **Xiaomi**, via Kjell: 13 l/dygn vid 30 ºC/80 % RH och 0,29 kg/h vid
 *   27 ºC/60 % RH, alltså 7,0 liter per dygn. Läst 2026-08-06.
 *
 * Kvar utan villkor: Clas Ohlsons två egna. Bruksanvisningarna till båda
 * skriver att kapaciteten sjunker under 15 ºC.
 *
 * **Fyndet blev starkare av rättelsen.** Det heter inte längre att ingen anger
 * villkoren, utan att talet i modellnamnet är mätt vid 30 ºC och 80 % RH, och
 * att du får ungefär 40 procent av det i ett svalt rum. Meacos egen tabell
 * bevisar det: apparaten som heter 25L tar 10,7 liter per dygn vid 20 ºC och
 * 60 % RH.
 *
 * ## Vad energipoängen bygger på
 *
 * Watt delat med liter per dygn **vid samma villkor**, inte deklarerad effekt
 * delad med talet i modellnamnet. Den gamla kvoten blandade baser och gav Meaco
 * 10,7 W/l genom att dela 267 watt uppmätta vid 20 ºC/60 % RH med 25 liter
 * uppmätta vid 30 ºC/80 % RH. Två olika rum, en kvot. Se rättelsen 2026-08-06.
 *
 * Basen är nu 30 ºC och 80 % RH, där sju av tolv har ett publicerat par. Meaco
 * 20L och 25L publicerar ingen 30-gradersrad, så för dem används 20 ºC/80 % RH,
 * vilket är ett svårare läge än de övriga mäts vid och alltså håller deras tal
 * på den försiktiga sidan.
 *
 * ## Om testomdöme
 *
 * Det finns inget eget kriterium för det, efter användarbeslut 2026-08-03.
 * Which?, som Stiftung Warentest publicerar, är enda riktiga provningen i
 * Europa, och den täcker **två av tolv rankade**: Meaco Arete One 12L och 25L.
 * Där omdömet finns styr det avfuktningspoängen. Ett eget kriterium som tio av
 * tolv inte kan få poäng på hade mätt vem som blivit provad, inte vad produkten
 * går för.
 *
 * ## Två produkter kom in i efterhand
 *
 * eeese Adam och Clas Ohlsons tiolitersapparat låg först bland de övervägda med
 * lagerstatus som skäl. Efter användarbeslut 2026-08-03 rankas slutsålda
 * produkter ändå, och ingen lagerstatus anges längre någonstans på sidan.
 * Cleverio AD100 flyttades däremot inte tillbaka: den tar 0,75 liter per dygn
 * mot rankningens 10 till 25, alltså en annan sorts produkt.
 */

export const PRICE_CHECKED = "2026-08-03";

/** Specar och tillverkarvärden lästa om i researchpasset. */
export const SPECS_CHECKED = "2026-08-06";

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
    tagline: "Den enda apparaten här som ett oberoende labb har mätt och gett toppbetyg.",
    scores: {
      avfuktning: 5,
      kyla: 4,
      /* 4,5 och inte 5,0. Den gamla femman byggde på 267 W / 25 l = 10,7 W per
         liter, men de 267 watten är uppmätta vid 20 ºC/60 % RH där apparaten
         tar 10,7 liter, inte 25. Vid 20 ºC/80 % RH, den svåraste rad Meaco
         publicerar för den här modellen, går det 280 W på 17,53 liter, alltså
         16,0 W per liter. Rättad 2026-08-06, se lib/corrections.ts. */
      energi: 4.5,
      prisvarde: 4,
    },
    price: 4299,
    merchant: BYGGHEMMA,
    merchantUrl: `${BYGGHEMMA_BASE}/avfuktare-och-luftrenare-meaco-meacodry-arete-one-25l/p-1887651`,
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för en källare du kör hela hösten",
    pros: [
      "10,7 liter per dygn vid 20 °C och 60 % RH, alltså en tiolitersapparat i en oktoberkällare",
      "Which? ger den lägst driftkostnad av alla rekommenderade apparater",
      "Fungerar bra även i kyla, enligt Which?",
      "H13 HEPA-filter ingår, så den går som luftrenare när fukten är borta",
      "4,8 liters tank och slangadapter för vanlig trädgårdsslang",
    ],
    cons: [
      "16 kilo, inget man bär mellan våningar",
      "Går ner till 5 °C, medan Wood's två klarar 2",
      "42 dB(A) på hög fläkt, hörs genom en stängd sovrumsdörr",
      "4 299 kronor, 1 600 mer än eeese Adam som anger 20 liter per dygn",
    ],
    specs: [
      { label: "Pris", value: "4 299 kr", highlight: true },
      { label: "Kapacitet", value: "25 l/dygn (modellnamnet)", highlight: true },
      /* Meacos egen extraktionstabell, meaco.com, läst 2026-08-06. Raden
         20 ºC/60 % RH: 10,73 l/dygn vid 267 W. */
      { label: "Avfuktning i svalt", value: "10,7 l/dygn vid 20 °C / 60 % RH", highlight: true },
      { label: "Effekt", value: "267 W vid 20 °C / 60 % RH", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Ljudnivå", value: "40 och 42 dB(A)", highlight: true },
      { label: "Luftflöde", value: "150/175 m³/h", highlight: true },
      { label: "Vikt", value: "16 kg", highlight: true },
      { label: "Tank", value: "4,8 liter", highlight: true },
      { label: "Provad av Which?", value: "Ja, minst 80 % av maxpoängen", highlight: true },
      { label: "Hygrostat", value: "40–70 % RH" },
      { label: "Köldmedium", value: "R290, 90 g" },
      { label: "Display", value: "Ja" },
      { label: "Mått", value: "618 x 366 x 272 mm (HxBxD)" },
      { label: "Garanti", value: "5 år" },
      { label: "Filter", value: "Tvättbart dammfilter, H13 HEPA ingår" },
      { label: "Torkläge", value: "Ja" },
      { label: "Slanganslutning", value: "Ja, 12,5 mm trädgårdsslang" },
    ],
    verdict:
      "MeacoDry Arete One 25L kostar 4 299 kronor och tar **10,7 liter vatten per dygn vid 20 grader och 60 procents luftfuktighet**, alltså ungefär en svensk källare i oktober.\n\nDen är den enda i jämförelsen som en oberoende provning har mätt och gett toppbetyg. Which? provar vid 21 grader och kallare, räknar elen per uppsamlad liter i stället för per timme, och skriver att den avfuktar toppenbra, har lägst driftkostnad av samtliga rekommenderade apparater och fungerar bra även i kyla. Vid 10 grader och 60 procent tar den fortfarande 3,5 liter per dygn på 220 watt, vilket är ungefär vad en ouppvärmd källare i november ger. Tanken rymmer 4,8 liter och slangadaptern passar en vanlig trädgårdsslang, så står den nära en golvbrunn behöver du aldrig tömma den.\n\nDen väger 16 kilo och har hjul men inget bärhandtag värt namnet. Bestäm var den ska stå innan den kommer, för att flytta den mellan våningar är ett tvåmansjobb.\n\nKöp den. Det är den enda apparaten här där någon oberoende har mätt både vattnet och elen, och den orkar 3,5 liter om dygnet även i en tiogradig källare. Går ditt utrymme under 5 grader behöver du Wood's SW42FW i stället.",
  },
  {
    id: "meaco-arete-one-12l",
    name: "MeacoDry Arete One 12L",
    shortName: "Meaco 12L",
    brand: "Meaco",
    image: productImage(AVFUKTARE.slug, "meaco-arete-one-12l"),
    tagline: "Provad av Which? och 1 300 kronor billigare än vinnaren.",
    scores: {
      /* 4,5 och inte 5,0. Femman gav samma poäng som 25L på ett kriterium som
         mäter vatten i ett svalt rum, fast den här tar 5,2 liter mot 10,7. Den
         låg dessutom över Meaco 20L, som tar 8,5 liter, alltså rankade skalan
         den mindre apparaten högre än den större enbart på Which?-omdömet.
         Which? väger fortfarande tyngst och håller den över 20L, men inte över
         en apparat som tar dubbelt så mycket vatten och som Which? också har
         provat. Sänkt 2026-08-06, se lib/corrections.ts. */
      avfuktning: 4.5,
      kyla: 3.5,
      /* 198 W på 12,18 l vid 30 ºC/80 % RH ur Meacos extraktionstabell, alltså
         16,3 W per liter. Oförändrat betyg, ny grund. */
      energi: 4.5,
      prisvarde: 4.5,
    },
    price: 2999,
    merchant: BYGGHEMMA,
    merchantUrl: `${BYGGHEMMA_BASE}/avfuktare-och-luftrenare-meaco-meacodry-arete-one-12l/p-1887649`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för ett rum du kör året runt",
    pros: [
      "Provad av Which? med minst 80 procent av maxpoängen",
      "Which? kallar den energieffektiv, lätt att bära och förhållandevis tyst",
      "5,2 liter per dygn vid 20 °C och 60 % RH på 151 watt",
      "10,9 kilo, alltså 5 kilo lättare än vinnaren och möjlig att bära",
      "Samma H13 HEPA-filter och slangadapter som den större",
    ],
    cons: [
      "2,5 liters tank, som fylls på ett halvt dygn i ett fuktigt rum",
      "80/100 m³/h luftflöde räcker till ett rum, inte till en källarplan",
      "Which? nämner den inte som särskilt bra i kyla, till skillnad från 25L",
      "Går ner till 5 °C, så ingen garageapparat",
    ],
    specs: [
      { label: "Pris", value: "2 999 kr", highlight: true },
      { label: "Kapacitet", value: "12 l/dygn (modellnamnet)", highlight: true },
      /* Meacos extraktionstabell: 20 ºC/60 % RH ger 5,23 l/dygn vid 151 W. */
      { label: "Avfuktning i svalt", value: "5,2 l/dygn vid 20 °C / 60 % RH", highlight: true },
      { label: "Effekt", value: "151 W vid 20 °C / 60 % RH", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Ljudnivå", value: "35 och 38 dB(A)", highlight: true },
      /* Tillagt 2026-08-06 ur Meacos Technical Overview. */
      { label: "Luftflöde", value: "80/100 m³/h", highlight: true },
      { label: "Vikt", value: "10,9 kg", highlight: true },
      /* Tillagt 2026-08-06: Meaco anger 2,5 liter. */
      { label: "Tank", value: "2,5 liter", highlight: true },
      { label: "Provad av Which?", value: "Ja, minst 80 % av maxpoängen", highlight: true },
      { label: "Hygrostat", value: "40–70 % RH" },
      { label: "Köldmedium", value: "R290, 45 g" },
      /* Rättat 2026-08-06: stod "HEPA som tillval". Meaco anger fritt
         HEPA-filter medföljande på hela Arete One-serien. */
      { label: "Filter", value: "Tvättbart dammfilter, H13 HEPA ingår" },
      { label: "Display", value: "Ja" },
      { label: "Torkläge", value: "Ja" },
      { label: "Mått", value: "472 x 319 x 237 mm (HxBxD)" },
      { label: "Garanti", value: "5 år" },
      { label: "Slanganslutning", value: "Ja, 12,5 mm trädgårdsslang" },
    ],
    verdict:
      "Samma serie, samma teknik och samma H13-filter som vinnaren, 1 300 kronor billigare. Den tar 5,2 liter per dygn vid 20 grader och 60 procent.\n\nWhich? provade den och skriver att den avfuktar toppenbra, är energieffektiv, lätt att bära, enkel att använda och förhållandevis tyst, med rätt låga driftkostnader. Två av de omdömena hänger ihop med vikten: 10,9 kilo mot 25-litersmodellens 16 gör att den här faktiskt går att bära uppför en trappa, och 35 decibel på låg fläkt är tyst nog för ett sovrum med kondens på rutorna.\n\nTanken rymmer 2,5 liter. Kör du den i ett riktigt fuktigt rum är den full på ett halvt dygn, och en avfuktare som står stilla avfuktar ingenting. Har du inget avlopp att koppla slangen till blir det två tömningar om dagen.\n\nHar du ett rum, ett badrum eller en tvättstuga räcker den här med marginal. Ska den ta hand om en hel källarplan är 80 till 100 kubikmeter luft i timmen för lite, och då är det 25-litersmodellen som gäller.",
  },
  {
    id: "woods-ld40",
    name: "LD40 avfuktare källare och tvättstuga",
    shortName: "Wood's LD40",
    brand: "Wood's",
    image: productImage(AVFUKTARE.slug, "woods-ld40"),
    tagline: "Blåser 350 kubikmeter i timmen och arbetar ner till +2 grader.",
    scores: {
      avfuktning: 3.5,
      kyla: 5,
      /* 4,0 och inte 5,0. Den gamla femman kom ur "180 till 250 watt" hos Clas
         Ohlson ställt mot 13 liter. Wood's egen spectabell anger 250 W vid
         30 ºC/80 % RH för 13 liter vid samma villkor, alltså 19,2 W per liter,
         mitt i fältet. Rättad 2026-08-06, se lib/corrections.ts. */
      energi: 4,
      prisvarde: 1.5,
    },
    price: 7890,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/Wood%E2%80%99s-LD40-avfuktare-kallare-och-tvattstuga,-100-m2/p/46-1453`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 0, count: 0 },
    superlative: "Bäst för att torka tvätt i ett kallt rum",
    pros: [
      "350 m³/h på hög fläkt, kraftigaste luftströmmen av alla apparaterna",
      "Fungerar ner till +2 °C, även i ett kallt garage",
      "11,4 liters tank, störst av alla, och stänger av sig själv när den är full",
      "Återför 780 watt värme per liter vattenånga till rummet",
      "10 års garanti från tillverkaren, dubbelt mot närmaste konkurrent",
    ],
    cons: [
      "7 890 kronor, dyrast av apparaterna i jämförelsen med bred marginal",
      "7,5 liter per dygn vid 20 °C och 70 % RF, mindre än vinnaren för nästan dubbla priset",
      "55 dB(A) på hög fläkt, hörs genom en stängd dörr",
      "19,5 kilo utan bärhandtag, alltså ingen apparat du flyttar mellan våningar",
    ],
    specs: [
      { label: "Pris", value: "7 890 kr", highlight: true },
      /* Wood's egen spectabell, woods.se, läst 2026-08-06. */
      { label: "Kapacitet", value: "13 l/dygn vid 30 °C / 80 % RH", highlight: true },
      /* Clas Ohlsons spectabell för samma artikel. Wood's egen sida publicerar
         bara 30/80-raden. */
      { label: "Avfuktning i svalt", value: "7,5 l/dygn vid 20 °C / 70 % RF", highlight: true },
      /* Rättat 2026-08-06: stod "180–250 W" utan villkor. Bruksanvisningen till
         LD-serien visar att butikens spann är samma apparat vid två villkor:
         250 W vid 30 ºC/80 % RH och 180 W vid 20 ºC/70 % r.h. */
      { label: "Effekt", value: "250 W vid 30 °C / 80 % RH, 180 W vid 20 °C / 70 % RF", highlight: true },
      { label: "Drifttemperatur", value: "+2 till +35 °C", highlight: true },
      { label: "Ljudnivå", value: "45–55 dB(A)", highlight: true },
      /* Rättat 2026-08-06: stod 200/300 efter Clas Ohlson. Wood's egen tabell
         anger 200/350 m³/h. Konflikten står i .agent/research/avfuktare.md. */
      { label: "Luftflöde", value: "200/350 m³/h", highlight: true },
      /* Tillagt 2026-08-06 ur Clas Ohlsons produktsida, 46-1453. Wood's egen
         spectabell och bruksanvisningen till LD-serien anger ingen nettovikt. */
      { label: "Vikt", value: "19,5 kg", highlight: true },
      { label: "Tank", value: "11,4 liter", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      { label: "Rumsyta", value: "10–100 m²" },
      /* Bruksanvisningen till LD40/LD44/LD48PRO+ ger också 4,3 kWh/dygn vid
         20 ºC/70 % r.h. Den siffran står i omdömet, inte som egen rad: en
         etikett hos en enda produkt jämför ingenting. */
      { label: "Köldmedium", value: "R290, 99 g" },
      { label: "Garanti", value: "10 år" },
      { label: "Display", value: "Ja, digital" },
      { label: "Filter", value: "SMF mögel- och partikelfilter" },
      { label: "Hygrostat", value: "35–75 % RH, variabel" },
      { label: "Torkläge", value: "Ja" },
      { label: "Avfrostning", value: "Ja" },
      { label: "Kapslingsklass", value: "IPX1" },
      { label: "Mått", value: "640 x 348 x 575 mm (HxBxD)" },
      { label: "Slanganslutning", value: "Ja, 1/2 tum (slang ingår ej)" },
    ],
    verdict:
      "Wood's LD40 är byggd för att torka tvätt i ett rum som inte värms, och den kostar 7 890 kronor.\n\nDet den gör bättre än något annat här är att flytta luft. 350 kubikmeter i timmen på hög fläkt är över dubbelt mot vinnarens 175, och för en tvättlina är det luftströmmen och inte literantalet som avgör hur fort plaggen blir torra. Den arbetar ner till +2 grader, tanken rymmer 11,4 liter och stänger av apparaten när den är full, och Wood's anger att den återför 780 watt värme per liter vattenånga till rummet, alltså kommer en del av elen tillbaka som värme i stället för att blåsas ut. Garantin är tio år, vilket ingen annan här kommer i närheten av. I ett svalt rum drar den 180 watt, alltså 4,3 kilowattimmar om dygnet, ungefär sex kronor på ett vanligt elpris.\n\nDen tar 7,5 liter per dygn vid 20 grader och 70 procent. Vinnaren tar 10,7 vid 20 grader och 60, alltså mer vatten i torrare luft, för 3 591 kronor mindre. Betalar du de pengarna gör du det för fläkten, kylan och plåten, inte för vattnet.\n\nHar du en tvättstuga i en ouppvärmd källare och torkar tvätt där året om är det här apparaten som gör jobbet. Ska den bara hålla fukten nere i ett uppvärmt utrymme lägger du 3 591 kronor på något annat och tar Meaco Arete One 25L.",
  },
  {
    id: "meaco-arete-one-20l",
    name: "MeacoDry Arete One 20L",
    shortName: "Meaco 20L",
    brand: "Meaco",
    image: productImage(AVFUKTARE.slug, "meaco-arete-one-20l"),
    tagline: "8,5 liter per dygn i ett svalt rum för 429 kronor mindre än vinnaren.",
    scores: {
      avfuktning: 4,
      kyla: 3.5,
      /* 225 W på 14,02 l vid 20 ºC/80 % RH, alltså 16,0 W per liter. Samma
         grund som 25L, och en svårare rad än de som mäts vid 30 ºC. */
      energi: 4.5,
      /* 3,0 och inte 3,5: 429 kronor mer ger 25-litersmodellen, som tar 10,7
         liter i svalt mot 8,5 och är den enda i serien Which? kallar bra i
         kyla. Justerat 2026-08-03, oförändrat i researchpasset 2026-08-06. */
      prisvarde: 3,
    },
    price: 3870,
    merchant: BYGGHEMMA,
    merchantUrl: `${BYGGHEMMA_BASE}/avfuktare-och-luftrenare-meaco-meacodry-arete-one-20l/p-1887650`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för en tvättstuga året runt",
    pros: [
      "8,5 liter per dygn vid 20 °C och 60 % RH på 216 watt",
      "38 och 40 dB(A), tystare än 25-litersmodellen på båda fläktlägena",
      "4,8 liters tank, samma som vinnaren, och slangadapter för trädgårdsslang",
      "Samma H13 HEPA-filter och femåriga garanti som de två provade syskonen",
    ],
    cons: [
      "3 870 kronor är bara 429 mindre än vinnaren, som tar 2,2 liter mer per dygn",
      "145/160 m³/h, alltså mindre luft än 25-litersmodellen i samma chassi",
      "Just den här storleken är inte provad av Which?, till skillnad från 12L och 25L",
      "Går ner till 5 °C, ingen garageapparat",
    ],
    specs: [
      { label: "Pris", value: "3 870 kr", highlight: true },
      { label: "Kapacitet", value: "20 l/dygn (modellnamnet)", highlight: true },
      /* Meacos extraktionstabell: 20 ºC/60 % RH ger 8,5 l/dygn vid 216 W. */
      { label: "Avfuktning i svalt", value: "8,5 l/dygn vid 20 °C / 60 % RH", highlight: true },
      { label: "Effekt", value: "216 W vid 20 °C / 60 % RH", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Ljudnivå", value: "38 och 40 dB(A)", highlight: true },
      /* Tillagt 2026-08-06 ur Meacos Technical Overview. */
      { label: "Luftflöde", value: "145/160 m³/h", highlight: true },
      { label: "Vikt", value: "15 kg", highlight: true },
      /* Tillagt 2026-08-06: Meaco anger 4,8 liter. */
      { label: "Tank", value: "4,8 liter", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      { label: "Hygrostat", value: "40–70 % RH" },
      /* Rättat 2026-08-06: stod "HEPA som tillval". */
      { label: "Filter", value: "Tvättbart dammfilter, H13 HEPA ingår" },
      { label: "Display", value: "Ja" },
      { label: "Torkläge", value: "Ja" },
      { label: "Mått", value: "618 x 366 x 272 mm (HxBxD)" },
      { label: "Garanti", value: "5 år" },
      { label: "Köldmedium", value: "R290, 65 g" },
      { label: "Slanganslutning", value: "Ja, 12,5 mm trädgårdsslang" },
    ],
    verdict:
      "Mellanstorleken i Arete One-serien tar 8,5 liter per dygn vid 20 grader och 60 procent, och kostar 3 870 kronor.\n\nDen sitter i samma chassi som 25-litersmodellen och har samma 4,8-liters tank, samma H13-filter och samma femåriga garanti, men går tystare: 38 och 40 decibel mot 40 och 42. I en tvättstuga som ligger vägg i vägg med ett sovrum är de två decibelen skillnaden mellan att köra den på natten och att stänga av den.\n\nPriset är det svåra. 429 kronor mer ger dig 25-litersmodellen, som tar 2,2 liter mer per dygn i samma svala rum, blåser 175 kubikmeter i timmen i stället för 160, och är den enda i serien Which? uttryckligen kallar bra i kyla.\n\nTa den här om ljudnivån avgör och utrymmet är en normalstor tvättstuga eller källare du kör året runt. Ska den ta en hel källarplan lägger du till de 429 kronorna.",
  },
  {
    id: "woods-sw42fw",
    name: "SW42FW luftavfuktare",
    shortName: "Wood's SW42FW",
    brand: "Wood's",
    image: productImage(AVFUKTARE.slug, "woods-sw42fw"),
    tagline: "Tar 12 liter per dygn i ett svalt rum och arbetar ner till +2 grader.",
    scores: {
      /* 4,5 och inte 4,0. Bruksanvisningen till SW-serien, som woods.se länkar
         från produktsidan, har en egen rad "Dehumidifying at 20 ˚C and 70 %
         r.h." och där står 12 l/24h för SW42/45. Det är näst mest vatten i
         svalt av alla tolv och 60 procent mer än LD40 vid exakt samma villkor.
         Höjt 2026-08-06, se lib/corrections.ts. */
      avfuktning: 4.5,
      kyla: 5,
      /* 600 W på 25 l vid 30 ºC/80 % RH, alltså 24,0 W per liter. Oförändrat
         betyg, men nu på ett par som är uppmätt vid samma villkor. */
      energi: 3,
      prisvarde: 2.5,
    },
    price: 5999,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/Luftavfuktare-Woods-SW42FW/p/36-7872`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 181 },
    superlative: "Bäst för ett stort och kallt utrymme",
    pros: [
      "12 liter per dygn vid 20 °C och 70 % RF, näst mest av alla i svalt",
      "Fungerar ner till +2 °C tack vare avfrostningssystemet",
      "11,4 liters tank plus slanganslutning för trädgårdsslang",
      "181 kundomdömen på 4,5, bredaste underlaget bland de dyrare",
      "Plåthölje, tillverkad i Sverige, upp till 6 års garanti vid registrering",
    ],
    cons: [
      "600 watt för 25 liter, alltså 24 watt per liter och dygn och näst sämst här",
      "60 dB(A) på hög fläkt, högsta ljudnivån av alla apparaterna",
      "25 kilo, tyngst av alla, och den har inget bärhandtag",
      "Ingen display och ingen timer, så du ställer den för hand varje gång",
    ],
    specs: [
      { label: "Pris", value: "5 999 kr", highlight: true },
      { label: "Kapacitet", value: "25 l/dygn vid 30 °C / 80 % RH", highlight: true },
      /* Tillagt 2026-08-06 ur bruksanvisningen till SW-serien, som woods.se
         länkar: raden "Dehumidifying at 20 ˚C and 70 % r.h." ger 12 l/24h och
         raden "Power at 20 ˚C and 70 % r.h." 420 W för SW42/45. */
      { label: "Avfuktning i svalt", value: "12 l/dygn vid 20 °C / 70 % RF", highlight: true },
      /* Bruksanvisningen till SW-serien ger båda raderna, se källnoten. */
      { label: "Effekt", value: "600 W vid 30 °C / 80 % RH, 420 W vid 20 °C / 70 % RF", highlight: true },
      { label: "Drifttemperatur", value: "+2 till +35 °C", highlight: true },
      { label: "Ljudnivå", value: "56–60 dB(A)", highlight: true },
      /* Rättat 2026-08-06: stod 315 m³/h. Wood's anger 220–315. */
      { label: "Luftflöde", value: "220–315 m³/h", highlight: true },
      { label: "Vikt", value: "25 kg", highlight: true },
      { label: "Tank", value: "11,4 liter", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      { label: "Rumsyta", value: "Upp till 190 m²" },
      { label: "Display", value: "Nej" },
      /* Rättat 2026-08-06: stod bara "R290". Wood's anger R290/120 g. */
      { label: "Köldmedium", value: "R290, 120 g" },
      /* Tillagt 2026-08-06 ur Wood's spectabell. */
      { label: "Kapslingsklass", value: "IPX1" },
      { label: "Filter", value: "SMF mögel- och partikelfilter" },
      { label: "Hygrostat", value: "Variabel" },
      { label: "Avfrostning", value: "Ja" },
      { label: "Mått", value: "527 x 345 x 495 mm (HxBxD)" },
      { label: "Garanti", value: "Upp till 6 år vid årligt filterbyte" },
      { label: "Slanganslutning", value: "Ja, 1/2 tum (slang ingår ej)" },
    ],
    verdict:
      "Wood's SW42FW är apparaten för ett stort utrymme som går mot nollan, och den kostar 5 999 kronor.\n\nI ett rum på 20 grader tar den 12 liter vatten per dygn, näst mest av alla apparaterna här och 60 procent mer än Wood's egen LD40 vid exakt samma villkor. Den arbetar dessutom ner till +2 grader, tre grader lägre än hela Meaco-serien, med ett avfrostningssystem som smälter bort isen på kylslingorna innan den hinner lägga sig. Höljet är plåt och inte plast, den är tillverkad i Sverige och Wood's ger upp till sex års garanti om du registrerar den och byter filter varje år. 181 kundomdömen på 4,5 är det bredaste underlaget bland de dyrare apparaterna, och det säger något om hur den står sig efter ett par vintrar.\n\nElen är priset för det. 600 watt för 25 liter per dygn är 24 watt per liter, näst sämst av alla apparaterna, och den saknar både display och timer, så fuktnivån ställer du för hand på en ratt varje gång du varit där. På hög fläkt låter den 60 decibel, alltså mer än något annat här, och 25 kilo utan bärhandtag betyder att den ställs på plats en gång.\n\nHar du ett garage, ett förråd eller en källare på över hundra kvadratmeter som håller några få plusgrader är det här apparaten. Den och LD40 är de enda två som ens fungerar där, och av dem är det den här som tar upp mest vatten. Håller utrymmet 15 grader och uppåt betalar du 1 700 kronor för mycket jämfört med vinnaren.",
  },
  {
    id: "meaco-arete-one-10l",
    name: "MeacoDry Arete One 10L",
    shortName: "Meaco 10L",
    brand: "Meaco",
    image: productImage(AVFUKTARE.slug, "meaco-arete-one-10l"),
    tagline: "35 decibel på låg fläkt, tystast av kompressorapparaterna.",
    scores: {
      avfuktning: 3,
      kyla: 3.5,
      /* 199 W på 10,42 l vid 30 ºC/80 % RH, alltså 19,1 W per liter.
         Oförändrat betyg, ny grund. */
      energi: 4,
      prisvarde: 4.5,
    },
    price: 2586,
    merchant: BYGGHEMMA,
    merchantUrl: `${BYGGHEMMA_BASE}/avfuktare-och-luftrenare-meaco-meacodry-arete-one-10l/p-1887648`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för sovrummet",
    pros: [
      "35 och 38 dB(A), tystast av kompressorapparaterna här",
      "10,7 kilo och 47 centimeter hög, alltså lätt att flytta mellan rum",
      "2 586 kronor, billigast av de fyra Meaco-storlekarna",
      "Samma H13 HEPA-filter, hygrostat och femåriga garanti som de provade syskonen",
    ],
    cons: [
      "4,3 liter per dygn vid 20 °C och 60 % RH, minst av apparaterna i jämförelsen",
      "Samma 151 watt som 12L men en liter mindre i svalt, alltså sämre kvot",
      "2,5 liters tank, som räcker ett halvt dygn i ett riktigt fuktigt rum",
      "80/100 m³/h räcker till ett rum och ingenting mer",
    ],
    specs: [
      { label: "Pris", value: "2 586 kr", highlight: true },
      { label: "Kapacitet", value: "10 l/dygn (modellnamnet)", highlight: true },
      /* Meacos extraktionstabell: 20 ºC/60 % RH ger 4,34 l/dygn vid 151 W. */
      { label: "Avfuktning i svalt", value: "4,3 l/dygn vid 20 °C / 60 % RH", highlight: true },
      { label: "Effekt", value: "151 W vid 20 °C / 60 % RH", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Ljudnivå", value: "35 och 38 dB(A)", highlight: true },
      /* Tillagt 2026-08-06 ur Meacos Technical Overview. */
      { label: "Luftflöde", value: "80/100 m³/h", highlight: true },
      { label: "Vikt", value: "10,7 kg", highlight: true },
      /* Tillagt 2026-08-06: Meaco anger 2,5 liter. */
      { label: "Tank", value: "2,5 liter", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      { label: "Hygrostat", value: "40–70 % RH" },
      { label: "Display", value: "Ja" },
      { label: "Torkläge", value: "Ja" },
      { label: "Mått", value: "472 x 319 x 237 mm (HxBxD)" },
      { label: "Garanti", value: "5 år" },
      { label: "Köldmedium", value: "R290, 35 g" },
      { label: "Filter", value: "Tvättbart dammfilter, H13 HEPA ingår" },
      { label: "Slanganslutning", value: "Ja, 12,5 mm trädgårdsslang" },
    ],
    verdict:
      "Minsta Arete One kostar 2 586 kronor och går på 35 decibel i sitt låga fläktläge.\n\nDet är hela skälet att välja den. 35 decibel är hörbart men inte störande, ungefär en tyst kyl, och den väger 10,7 kilo med integrerade grepp, så den kan stå i sovrummet på natten och i tvättstugan på dagen. HEPA-filtret ingår, vilket betyder att den renar luften från damm och pollen när fukten är borta.\n\nDen tar 4,3 liter per dygn vid 20 grader och 60 procent, alltså minst av alla apparaterna här. För 413 kronor mer ger 12-litersmodellen 5,2 liter på **exakt samma 151 watt**, och den är dessutom provad av Which?. Det är en liter vatten om dagen gratis, varje dag apparaten går.\n\nTa den här bara om ljudnivån är det som avgör och rummet är litet. I alla andra lägen är 12-litersmodellen det bättre köpet.",
  },
  {
    id: "eeese-adam-20l",
    name: "Air Care Adam luftavfuktare WiFi 20 L",
    shortName: "eeese Adam",
    brand: "eeese",
    image: productImage(AVFUKTARE.slug, "eeese-adam-20l"),
    tagline: "11,5 liter per dygn i svalt för 2 699 kronor.",
    scores: {
      /* 3,5 och inte 3,0. eeese publicerar 11,5 l/dygn vid 27 ºC/60 % RH, ett
         kontrollerbart tal vid svalare villkor. Kriteriet säger uttryckligen
         att ett lägre tal som går att kontrollera väger tyngre än ett högt utan
         villkor. Höjt 2026-08-06, se lib/corrections.ts. */
      avfuktning: 3.5,
      kyla: 3,
      /* 255 W på 20 l vid 30 ºC/80 % RH, alltså 12,75 W per liter och bäst
         näst efter Hugo. Höjt från 4,5. */
      energi: 5,
      prisvarde: 4.5,
    },
    price: 2699,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/eeese-Air-Care-Adam-luftavfuktare-WiFi,-20-l,-100-m2/p/36-21`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 44 },
    award: "budget",
    superlative: "Mest vatten per krona",
    pros: [
      "11,5 liter per dygn vid 27 °C och 60 % RH, ett tal att räkna med i ett uppvärmt rum",
      "255 watt för 20 liter, alltså 12,8 watt per liter och näst bäst av alla",
      "4,8 liters tank, timer 1 till 24 timmar, barnlås och hjul",
      "Wifi och styrning via Google Assistant, så fukten kan följas från telefonen",
      "44 kundomdömen på 4,5",
    ],
    cons: [
      "44 dB(A) på hög fläkt, alltså inget för ett sovrum",
      "Går ner till 5 °C, ingen apparat för ett kallt garage",
      "Slang ingår inte, och den tar 14 mm och inte en vanlig trädgårdsslang",
      "IPX0, alltså ingen kapsling mot stänk och därmed ingen badrumsapparat",
    ],
    specs: [
      { label: "Pris", value: "2 699 kr", highlight: true },
      /* eeese egen spectabell, eeese-aircare.com, läst 2026-08-06. */
      { label: "Kapacitet", value: "20 l/dygn vid 30 °C / 80 % RH", highlight: true },
      { label: "Avfuktning i svalt", value: "11,5 l/dygn vid 27 °C / 60 % RH", highlight: true },
      { label: "Effekt", value: "255 W", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      /* Rättat 2026-08-06: stod "44 och 42". eeese anger 42 låg / 44 hög. */
      { label: "Ljudnivå", value: "42 och 44 dB(A)", highlight: true },
      /* Rättat 2026-08-06: stod 145/130. eeese anger 130 låg / 145 hög. */
      { label: "Luftflöde", value: "130/145 m³/h", highlight: true },
      { label: "Vikt", value: "15,2 kg", highlight: true },
      /* Rättat 2026-08-06: butiken anger 5 liter, tillverkaren 4,8. */
      { label: "Tank", value: "4,8 liter", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      /* Tillverkarens spectabell gäller. Butiken skriver 100 m². Konflikten
         står i .agent/research/avfuktare.md. */
      { label: "Rumsyta", value: "70 m²" },
      { label: "Timer", value: "1–24 timmar" },
      { label: "Filter", value: "Tvättbart" },
      { label: "Garanti", value: "3 år" },
      { label: "Display", value: "Ja" },
      { label: "Torkläge", value: "Ja" },
      { label: "Köldmedium", value: "R290" },
      { label: "Kapslingsklass", value: "IPX0" },
      { label: "Mått", value: "540 x 335 x 285 mm (HxBxD)" },
      { label: "Slanganslutning", value: "Ja, 14 mm (slang ingår ej)" },
    ],
    verdict:
      "eeese Adam kostar 2 699 kronor och tar **11,5 liter per dygn vid 27 grader och 60 procents luftfuktighet**, alltså mer än hälften av modellnamnets tjugo i ett normalvarmt rum.\n\nDen är också den näst snålaste apparaten här: 255 watt för 20 liter per dygn blir 12,8 watt per liter, mot 22 för Clas Ohlsons egen tjugolitersapparat som kostar bara 200 kronor mindre. Tanken rymmer 4,8 liter, timern går att ställa mellan 1 och 24 timmar, det finns barnlås och hjul, och wifi gör att fuktnivån kan följas och ändras från telefonen utan att du går ner i källaren. 44 kundomdömen på 4,5 är ett rimligt underlag.\n\nDe 27 graderna är den viktiga hakan. Det är sommarvärme och inte källartemperatur, så i ett rum på 15 grader får du mindre än de 11,5 literna. Apparaten stannar dessutom helt vid 5 grader, precis som Meaco-serien, och IPX0 betyder att den inte får stå där det stänker.\n\nHar du en källare eller tvättstuga som håller vanlig rumstemperatur är det här sidans klokaste affär, och pengarna du sparar räcker till en hygrometer och en slang. Ska apparaten stå i ett ouppvärmt garage är det Wood's du ska titta på.",
  },
  {
    id: "eeese-hugo-25l",
    name: "Air Care Hugo luftavfuktare och luftrenare 25 L",
    shortName: "eeese Hugo",
    brand: "eeese",
    image: productImage(AVFUKTARE.slug, "eeese-hugo-25l"),
    tagline: "IPX4-klassad, den enda som får stå i ett badrum.",
    scores: {
      /* 4,0 och inte 3,5. eeese publicerar 15 l/dygn vid 27 ºC/60 % RH, det
         högsta kontrollerbara talet vid svala villkor av alla utom Meacos
         serie. Höjt 2026-08-06, se lib/corrections.ts. */
      avfuktning: 4,
      kyla: 3,
      /* 290 W på 25 l vid 30 ºC/80 % RH, alltså 11,6 W per liter och bäst av
         alla tolv. Höjt från 4,5. */
      energi: 5,
      prisvarde: 2.5,
    },
    price: 4499,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/eeese-Air-Care-Hugo-luftavfuktare,-luftrenare-25-l/p/36-22`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 3, count: 1 },
    superlative: "Bäst för badrummet",
    pros: [
      "IPX4-klassad, den enda här som får användas i ett våtutrymme",
      "290 watt för 25 liter, alltså 11,6 watt per liter och snålast av alla",
      "15 liter per dygn vid 27 °C och 60 % RH, mest av alla utom Wood's SW42FW",
      "HEPA-filter, så den fungerar som luftrenare när fukten är borta",
      "4,5 liters tank, torkläge för kläder och timer 1 till 24 timmar",
    ],
    cons: [
      "4 499 kronor, 200 mer än vinnaren som är provad av Which?",
      "eeese Adam tar 11,5 liter i svalt för 1 800 kronor mindre",
      "44 dB(A) på hög fläkt, bland de högre ljudnivåerna här",
      "Ett enda kundomdöme, satt till 3 av 5",
    ],
    specs: [
      { label: "Pris", value: "4 499 kr", highlight: true },
      /* eeese egen spectabell, läst 2026-08-06. */
      { label: "Kapacitet", value: "25 l/dygn vid 30 °C / 80 % RH", highlight: true },
      { label: "Avfuktning i svalt", value: "15 l/dygn vid 27 °C / 60 % RH", highlight: true },
      { label: "Effekt", value: "290 W", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      /* Rättat 2026-08-06: stod 44 dB(A). eeese anger 42 låg / 44 hög. */
      { label: "Ljudnivå", value: "42 och 44 dB(A)", highlight: true },
      /* Rättat 2026-08-06: stod 190 m³/h. eeese anger 160 låg / 190 hög. */
      { label: "Luftflöde", value: "160/190 m³/h", highlight: true },
      /* Tillagt 2026-08-06 ur eeese spectabell. */
      { label: "Vikt", value: "15,6 kg", highlight: true },
      { label: "Tank", value: "4,5 liter", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      { label: "Kapslingsklass", value: "IPX4" },
      { label: "Timer", value: "1–24 timmar" },
      { label: "Filter", value: "HEPA H13, tvättbart förfilter" },
      { label: "Display", value: "Ja" },
      { label: "Torkläge", value: "Ja" },
      { label: "Köldmedium", value: "R290" },
      { label: "Mått", value: "580 x 378 x 273 mm (HxBxD)" },
      { label: "Garanti", value: "Upp till 3 år" },
      { label: "Slanganslutning", value: "Ja, 14 mm (slang ingår ej)" },
    ],
    verdict:
      "eeese Hugo är den enda apparaten här som är kapslad för ett våtutrymme, och den kostar 4 499 kronor.\n\nIPX4 betyder skydd mot vattenstänk från alla riktningar. Ett fönsterlöst badrum där någon duschar varje dag är ett av de vanligaste ställena en avfuktare hamnar på, och det är också det enda ställe där de andra elva formellt inte får stå. Hugo är dessutom den snålaste av alla: 290 watt för 25 liter per dygn blir 11,6 watt per liter, och den tar 15 liter vid 27 grader och 60 procent. HEPA-filtret gör att den renar luften från damm och pollen resten av året.\n\nPriset är svårt att försvara utanför badrummet. 4 499 kronor är 200 mer än vinnaren, som är den enda apparaten här någon oberoende har mätt, och 1 800 mer än eeese Adam, som tar 11,5 liter i svalt av samma tillverkare med samma teknik.\n\nHar du det fönsterlösa badrummet är valet redan gjort. Ska apparaten stå någon annanstans tar du Adam och lägger 1 800 kronor på en fuktspärr i stället.",
  },
  {
    id: "clas-ohlson-20l",
    name: "Luftavfuktare 20 liter, 52 m²",
    shortName: "Clas Ohlson 20 L",
    brand: "Clas Ohlson",
    image: productImage(AVFUKTARE.slug, "clas-ohlson-20l"),
    tagline: "416 kundomdömen och tre fläktlägen för 2 499 kronor.",
    scores: {
      avfuktning: 3,
      kyla: 2.5,
      /* 440 W på 20 l, alltså 22,0 W per liter. Villkoren anges inte i
         butikens spectabell, men bruksanvisningen skriver att kapaciteten
         sjunker under 15 ºC. Oförändrat betyg. */
      energi: 3,
      prisvarde: 4.5,
    },
    price: 2499,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/Luftavfuktare-20-liter,-52-m2/p/36-8322`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 416 },
    superlative: "Mest funktion för 2 499 kronor",
    pros: [
      "416 kundomdömen på 4,5, flest av alla apparaterna",
      "Tre fläktlägen på 41, 43 och 46 dB(A), fler steg än någon annan här",
      "Display, ställbar fuktnivå, timer och avfrostningsfunktion",
      "Slanganslutning med 13,5 mm innerdiameter för kontinuerlig dränering",
    ],
    cons: [
      "440 watt för 20 liter, alltså 22 watt per liter och dygn",
      "Kapaciteten sjunker under 15 °C enligt bruksanvisningen",
      "Stannar vid 5 °C i nedre kanten och 32 i övre, snävast intervall här",
      "3 liters tank, som en tjugolitersapparat fyller flera gånger om dygnet",
    ],
    specs: [
      { label: "Pris", value: "2 499 kr", highlight: true },
      { label: "Kapacitet", value: "20 l/dygn", highlight: true },
      { label: "Effekt", value: "440 W", highlight: true },
      { label: "Drifttemperatur", value: "5–32 °C", highlight: true },
      /* Rättat 2026-08-06: stod 46 dB. Bruksanvisningen anger tre fläktlägen,
         46/43/41 dB(A). */
      { label: "Ljudnivå", value: "41, 43 och 46 dB(A)", highlight: true },
      /* Tillagt 2026-08-06 ur bruksanvisningen till 36-8322, som produktsidan
         länkar. Butikens egen spectabell anger bara förpackningens vikt,
         15,15 kg. Manualen anger nettovikten. */
      { label: "Vikt", value: "14 kg", highlight: true },
      { label: "Tank", value: "3 liter", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      { label: "Rumsyta", value: "52 m²" },
      { label: "Köldmedium", value: "R290, 0,07 kg" },
      { label: "Avfrostning", value: "Ja" },
      { label: "Display", value: "Ja" },
      { label: "Timer", value: "Ja, start och stopp" },
      { label: "Hygrostat", value: "Ja, justerbar" },
      { label: "Slanganslutning", value: "Ja, 13,5 mm innerdiameter" },
      { label: "Mått", value: "510 x 350 x 245 mm (HxBxD)" },
    ],
    verdict:
      "Clas Ohlsons egen tjugolitersapparat kostar 2 499 kronor och har 416 kundomdömen på 4,5, alltså det bredaste vardagsunderlaget i hela jämförelsen.\n\nFör pengarna får du en ovanligt komplett funktionslista: display, ställbar fuktnivå, start- och stopptimer, avfrostning och slanganslutning för 13,5-millimetersslang. Den har tre fläktlägen på 41, 43 och 46 decibel, alltså ett steg fler än något annat här, och det låga läget är tyst nog för ett arbetsrum. Att 416 hushåll har satt 4,5 säger inget om hur mycket vatten den tar, men mycket om att den fortfarande går efter ett par år.\n\nElen är det dyra. 440 watt för 20 liter per dygn blir 22 watt per liter, dubbelt mot eeese Adam som kostar 200 kronor mer. Bruksanvisningen skriver dessutom att kapaciteten sjunker under 15 grader, och apparaten stannar helt vid 5, så den hör hemma i ett uppvärmt utrymme.\n\nKör du apparaten några veckor om året i ett uppvärmt rum är det här mest funktion per krona på hela sidan. Ska den gå hela hösten tar du eeese Adam, för de 200 kronorna har du tjänat in på elräkningen före jul.",
  },
  {
    id: "eeese-emil-10l",
    name: "Air Care Emil luftavfuktare 10 liter",
    shortName: "eeese Emil",
    brand: "eeese",
    image: productImage(AVFUKTARE.slug, "eeese-emil-10l"),
    tagline: "11,3 kilo med grepp i sidorna, byggd för att flyttas.",
    scores: {
      avfuktning: 2.5,
      kyla: 3,
      /* 165 W på 10 l vid 30 ºC/80 % RH, alltså 16,5 W per liter. Höjt från
         4,0 sedan tillverkarens tal ersatt butikens 155 W utan villkor. */
      energi: 4.5,
      /* 3,0 och inte 3,5. Prisvärde är inte lägst pris: eeese Adam ger dubbla
         kapaciteten för 550 kronor mer och drar bara 90 watt mer. */
      prisvarde: 3,
    },
    price: 2149,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/eeese-Air-Care-Emil-luftavfuktare,-10-liter,-42-m2/p/36-20`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 6 },
    superlative: "Bäst för den som flyttar apparaten mellan rum",
    pros: [
      "11,3 kilo och 46 centimeter hög, med integrerade grepp i sidorna",
      "36 dB(A) på låg fläkt, tyst nog för ett sovrum",
      "165 watt för 10 liter, alltså 16,5 watt per liter och bättre än båda Wood's",
      "Tvättbart filter, alltså ingen förbrukningsdel att köpa",
      "Barnlås, timer 1 till 24 timmar och två fläkthastigheter",
    ],
    cons: [
      "5 liter per dygn vid 27 °C och 60 % RH, alltså en apparat för ett rum",
      "2,6 liters tank, så tömning varje dygn om du inte kopplar slang",
      "eeese Adam ger dubbla kapaciteten för 550 kronor mer",
      "77 m³/h på låg fläkt, alltså minst luft av alla apparaterna här",
    ],
    specs: [
      { label: "Pris", value: "2 149 kr", highlight: true },
      /* eeese egen spectabell, läst 2026-08-06. */
      { label: "Kapacitet", value: "10 l/dygn vid 30 °C / 80 % RH", highlight: true },
      { label: "Avfuktning i svalt", value: "5 l/dygn vid 27 °C / 60 % RH", highlight: true },
      /* Rättat 2026-08-06: butiken anger 155 W, tillverkaren 165 W. */
      { label: "Effekt", value: "165 W", highlight: true },
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      /* Tillagt 2026-08-06 ur eeese spectabell. */
      { label: "Ljudnivå", value: "36 och 40 dB(A)", highlight: true },
      /* Rättat 2026-08-06: stod 105 m³/h. eeese anger 77 låg / 105 hög. */
      { label: "Luftflöde", value: "77/105 m³/h", highlight: true },
      { label: "Vikt", value: "11,3 kg", highlight: true },
      { label: "Tank", value: "2,6 liter", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      /* Tillverkarens spectabell gäller. Produktnamnet hos butiken säger
         42 m². Konflikten står i .agent/research/avfuktare.md. */
      { label: "Rumsyta", value: "40 m²" },
      { label: "Timer", value: "1–24 timmar" },
      { label: "Filter", value: "Tvättbart" },
      { label: "Display", value: "Ja" },
      { label: "Torkläge", value: "Ja" },
      { label: "Köldmedium", value: "R290" },
      { label: "Kapslingsklass", value: "IPX2" },
      { label: "Mått", value: "463 x 300 x 250 mm (HxBxD)" },
      { label: "Garanti", value: "Upp till 3 år" },
      { label: "Slanganslutning", value: "Ja, 14 mm (slang ingår ej)" },
    ],
    verdict:
      "eeese Emil kostar 2 149 kronor, väger 11,3 kilo och är 46 centimeter hög, med grepp instansade i sidorna.\n\nDen är byggd för att flyttas, och det är dess bästa egenskap. Står den i sovrummet på natten går den på 36 decibel, vilket är tystare än allt utom Meacos två minsta, och på morgonen bär du den till tvättstugan utan att behöva två händer under kanten. Timern går mellan 1 och 24 timmar, det finns barnlås, och filtret tvättas i stället för att bytas, så det finns ingen förbrukningsdel att köpa.\n\n5 liter per dygn vid 27 grader och 60 procent är däremot lite. Det räcker för ett sovrum med kondens på rutorna eller ett badrum, men inte för en källare, och tanken på 2,6 liter betyder tömning varje dygn om du inte har ett avlopp att koppla den 14-millimeters slangen till.\n\nBehöver du en apparat som bor i ett rum i taget är den här rätt. Ska den stå still i en källare hela hösten kostar eeese Adam 550 kronor mer och tar dubbelt så mycket vatten.",
  },
  {
    id: "clas-ohlson-10l",
    name: "Luftavfuktare 10 liter, 31 m²",
    shortName: "Clas Ohlson 10 L",
    brand: "Clas Ohlson",
    image: productImage(AVFUKTARE.slug, "clas-ohlson-10l"),
    tagline: "1 499 kronor, och fuktnivån ställs i steg om fem procent.",
    scores: {
      avfuktning: 2.5,
      kyla: 2.5,
      /* 360 W på 10 l, alltså 36,0 W per liter och sämst av alla tolv med bred
         marginal. Oförändrat betyg. */
      energi: 1.5,
      prisvarde: 4,
    },
    price: 1499,
    merchant: CLAS_OHLSON,
    merchantUrl: `${CLAS_OHLSON_BASE}/Luftavfuktare-10-liter,-31-m2/p/36-8321`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 374 },
    superlative: "Billigast av alla apparaterna",
    pros: [
      "1 499 kronor, lägsta priset bland de rankade",
      "374 kundomdömen på 4,5, näst bredaste underlaget",
      "Fuktnivån ställs 35 till 85 procent i steg om fem, finaste steget här",
      "36 dB(A) på låg fläkt, tyst nog för ett sovrum, och 11,6 kilo att bära",
      "Minnesfunktion som startar om apparaten efter strömavbrott",
    ],
    cons: [
      "360 watt för 10 liter, alltså 36 watt per liter och sämst av alla apparaterna",
      "eeese Emil ger samma 10 liter på 165 watt, mindre än halva",
      "Kapaciteten sjunker under 15 °C enligt bruksanvisningen, och apparaten stannar vid 5",
      "1,6 liters tank, minst av alla, så tömning flera gånger om dygnet utan slang",
    ],
    specs: [
      { label: "Pris", value: "1 499 kr", highlight: true },
      { label: "Kapacitet", value: "10 l/dygn", highlight: true },
      { label: "Effekt", value: "360 W", highlight: true },
      { label: "Drifttemperatur", value: "5–32 °C", highlight: true },
      /* Rättat 2026-08-06: stod 41 dB(A). Bruksanvisningen till 36-8321 anger
         tre fläktlägen, 41/39/36 dB(A), precis som systermodellen 36-8322. */
      { label: "Ljudnivå", value: "36, 39 och 41 dB(A)", highlight: true },
      /* Tillagt 2026-08-06 ur bruksanvisningen till 36-8321. */
      { label: "Vikt", value: "11,6 kg", highlight: true },
      { label: "Tank", value: "1,6 liter", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      { label: "Rumsyta", value: "16–31 m²" },
      { label: "Hygrostat", value: "35–85 %, steg om 5" },
      { label: "Slanganslutning", value: "Innerdiameter 13,5 mm" },
      { label: "Köldmedium", value: "R290, 45 g" },
      { label: "Display", value: "Ja" },
      { label: "Timer", value: "Ja, start och stopp" },
      { label: "Avfrostning", value: "Ja" },
      { label: "Mått", value: "440 x 330 x 220 mm (HxBxD)" },
    ],
    verdict:
      "1 499 kronor är billigast av apparaterna i jämförelsen, och 374 kundomdömen på 4,5 säger att den fungerar i vardagen.\n\nIngen av de andra elva reglerar lika fint. Fuktnivån ställs mellan 35 och 85 procent i steg om fem procentenheter, vilket betyder att du kan sikta på 45 procent i stället för att välja mellan 40 och 50. Till det kommer display, start- och stopptimer, avfrostning och en minnesfunktion som startar apparaten igen efter ett strömavbrott. Den väger 11,6 kilo och går ner till 36 decibel på lägsta fläktläget, så den går att flytta och den går att sova bredvid.\n\nElen är invändningen, och den är stor. **360 watt för 10 liter per dygn blir 36 watt per liter, sämst av alla apparaterna med bred marginal.** eeese Emil gör samma tio liter på 165 watt, alltså mindre än halva, och kostar 650 kronor mer. Kör du apparaten kontinuerligt en fuktig höst är mellanskillnaden intjänad långt före våren, och tanken på 1,6 liter betyder dessutom flera tömningar om dygnet om du inte kopplar slang.\n\nKöp den om apparaten ska gå några veckor om året i ett uppvärmt rum och du vill lägga så lite som möjligt. Ska den stå på hela hösten är det här sidans dyraste apparat att äga.",
  },
  {
    id: "xiaomi-dehumidifier-lite",
    name: "Smart Dehumidifier Lite avfuktare 13 l/dygn",
    shortName: "Xiaomi Lite",
    brand: "Xiaomi",
    image: productImage(AVFUKTARE.slug, "xiaomi-dehumidifier-lite"),
    tagline: "34 decibel i sovläge, tystast av alla apparaterna.",
    scores: {
      /* 3,0 och inte 2,5. Kjells spectabell anger "Avfuktning vid 27 ºC,
         60 % RH: 0,29 kg/h", alltså 7,0 liter per dygn vid samma villkor som
         eeese mäter vid. Det är 40 procent mer än eeese Emil, som står på 2,5,
         och klart under eeese Adams 11,5, som står på 3,5. Höjt 2026-08-06,
         se lib/corrections.ts. */
      avfuktning: 3,
      kyla: 1.5,
      /* 4,5 och inte 2,0. Tvåan sattes för att effekten troddes saknas. Kjell
         publicerar den: 190 W nominellt, 250 W max. 190 W på 13 l är 14,6 W
         per liter, tredje bäst av alla tolv. Rättad 2026-08-06, se
         lib/corrections.ts. */
      energi: 4.5,
      prisvarde: 3,
    },
    price: 2490,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/inomhusklimat-uppvarmning/luftavfuktare/xiaomi-smart-dehumidifier-lite-avfuktare-13-ldygn-p47223",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för ett Xiaomi-hem",
    pros: [
      "34 dB(A) i sovläge, tystast av alla apparaterna här",
      "7 liter per dygn vid 27 °C och 60 % RH, mer än eeese Emil för samma pengar",
      "190 watt för 13 liter, alltså 14,6 watt per liter och tredje bäst av alla",
      "Ø290 millimeter och 11,1 kilo, alltså rundast och nätt intill en säng",
      "Styrs via Xiaomi Home, samma app som övrig Xiaomi-utrustning",
      "1 meters avloppsslang ingår, till skillnad från eeese och Wood's",
    ],
    cons: [
      "3 liters tank, som fylls på ett dygn i ett fuktigt rum",
      "140 m³/h luftflöde, alltså minst av alla utom Meacos två minsta",
      "Går ner till 5 °C, ingen apparat för ett kallt garage",
      "2 490 kronor för 13 liter, mot 2 699 för eeese Adams 20",
    ],
    specs: [
      { label: "Pris", value: "2 490 kr", highlight: true },
      /* Rättat 2026-08-06: stod "13 l/dygn" utan villkor. Kjells spectabell
         anger "Avfuktningskapacitet: 13 liter/dygn (30 °C, 80 % RH)". */
      { label: "Kapacitet", value: "13 l/dygn vid 30 °C / 80 % RH", highlight: true },
      /* Tillagt 2026-08-06 ur samma spectabell: "Avfuktning vid 27 °C, 60 % RH:
         0,29 kg/h", alltså 6,96 liter per dygn. Avrundat till 7,0. */
      { label: "Avfuktning i svalt", value: "7,0 l/dygn vid 27 °C / 60 % RH", highlight: true },
      /* Rättat 2026-08-06: stod "Uppgift saknas". Kjells egen spectabell för
         artikel 47223 anger 190 W, maxeffekt 250 W. */
      { label: "Effekt", value: "190 W (max 250 W)", highlight: true },
      /* Rättat 2026-08-06: stod "Uppgift saknas". Kjell anger 5–35 °C. */
      { label: "Drifttemperatur", value: "5–35 °C", highlight: true },
      { label: "Ljudnivå", value: "34 dB(A) i sovläge, högst 38", highlight: true },
      /* Tillagt 2026-08-06 ur Kjells spectabell. */
      { label: "Luftflöde", value: "140 m³/h", highlight: true },
      { label: "Vikt", value: "11,1 kg", highlight: true },
      { label: "Tank", value: "3 liter", highlight: true },
      { label: "Provad av Which?", value: "Nej", highlight: true },
      { label: "Rumsyta", value: "5–20 m² beroende på rumstyp" },
      { label: "App", value: "Xiaomi Home" },
      { label: "Röststyrning", value: "Google Assistant och Amazon Alexa" },
      { label: "Display", value: "Ja, med pekkontroll" },
      { label: "Köldmedium", value: "R290, 38 g" },
      { label: "Filter", value: "Tvättbart antibakteriellt filter" },
      { label: "Mått", value: "Ø290 x 520 mm" },
      { label: "Slanganslutning", value: "Ja, 1 m slang 13,5 mm ingår" },
    ],
    verdict:
      "Xiaomi Smart Dehumidifier Lite kostar 2 490 kronor, tar 7 liter vatten per dygn i ett normalvarmt rum och går på 34 decibel i sovläge.\n\n34 decibel är det tystaste läget i hela jämförelsen, en bit under Meacos 35 och långt under Clas Ohlsons 46. Det är skillnaden mellan en apparat som får stå i sovrummet över natten och en som måste stängas av vid läggdags. Den är rund, 29 centimeter i diameter och 52 höga, så den tar mindre golv än de fyrkantiga och ser inte ut som en maskin bredvid en säng. Den drar 190 watt för sina 13 liter, alltså 14,6 watt per liter, vilket bara eeese två slår, och en meters avloppsslang ligger i kartongen.\n\nLuftflödet är 140 kubikmeter i timmen, minst av alla utom Meacos två minsta. Det räcker till ett sovrum och ett badrum, men fukten i det ena hörnet av en källare når aldrig fram till apparaten i det andra.\n\nHar du redan Xiaomi Home och vill ha fukten i samma app som lamporna, och apparaten ska stå där någon sover, är det här rätt köp. Ska den ta hand om en hel källarplan tar du eeese Adam för 209 kronor mer.",
  },
];

export const AVFUKTARE_PRODUCTS = resolveProducts(AVFUKTARE, SEEDS);

export const AVFUKTARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Duux",
    name: "Bora Smart",
    reason:
      "En av de åtta modeller Which? rekommenderar, och den finns hos Elgiganten med artikelnummer 563304 och GTIN 8716164994575. Vi rankar den ändå inte, av ett enda skäl: ingen butik skriver ut vad den kostar. Elgiganten visar inget pris på sin produktsida, duux.se anger inget alls, och Electrolux Homes sida för märket är borta. Vi rankar bara produkter vars pris vi kan läsa hos säljaren och datera. Specifikationen är i övrigt bra: 20 liter per dygn, 420 watt, 40 kvadratmeter, hygrostat 40 till 80 procent i femstegsintervall, autofrost, WiFi och kolfilter.",
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/inomhusklimat-uppvarmning/luftkvalitet/luftavfuktare/duux-bora-smart-avfuktare-420-watt-vit/563304",
  },
  {
    brand: "Cleverio",
    name: "AD100 kompakt luftavfuktare",
    reason:
      "Den ligger kvar här av ett skäl som inte är priset och inte lagret: den gör något annat än apparaterna vi rankar. Kjell anger 750 milliliter avfuktning per dag, 0,75 liter. Den minsta apparaten i rankningen tar 10 liter, den största 25. Det är en trettondel av den minsta, i en låda på 2,7 kilo avsedd för garderober och förrådsutrymmen upp till 20 kvadratmeter. Att ställa den mot en kondensavfuktare som flyttar 145 kubikmeter luft i timmen vore som att jämföra ett resestrykjärn med ett strykjärn. 899 kronor, 69 kundomdömen på 3,5.",
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
      "Meaco MeacoDry Arete One 25L för 4 299 kronor hos Bygghemma. Den tar 10,7 liter vatten per dygn vid 20 grader och 60 procents luftfuktighet, alltså mer än någon annan apparat i vår jämförelse gör i ett svalt rum, och den är en av bara två i svensk handel som brittiska Which? har provat och gett minst 80 procent av maxpoängen. Deras omdöme är att den har lägst driftkostnad av samtliga rekommenderade apparater och fungerar bra även i kyla. Behöver du inte den kapaciteten är samma serie i 12-litersutförande för 2 999 kronor det klokare köpet, och den är också provad. Vill du ha mest vatten per krona tar du eeese Adam för 2 699, som anger 11,5 liter per dygn vid 27 grader och 60 procent.",
  },
  {
    question: "Vad betyder liter per dygn på en avfuktare?",
    answer:
      "Det är hur mycket vatten apparaten tar ur luften på ett dygn vid ett bestämt klimat, och klimatet är nästan alltid 30 grader och 80 procents relativ luftfuktighet. Ett svenskt hus är inte det. Meaco publicerar hela kurvan för sina modeller, och den visar hur stor skillnaden är: apparaten som heter Arete One 25L tar 25 liter i det varma och fuktiga, 17,5 liter vid 20 grader och 80 procent, 10,7 liter vid 20 grader och 60 procent, och 3,5 liter vid 10 grader och 60 procent. Samma apparat, samma dygn, en femtedel så mycket vatten i den kallaste kolumnen. Wood's LD40 visar samma sak i två tal: 13 liter vid 30 grader och 80 procent, 7,5 liter vid 20 grader och 70 procent. Räkna alltså aldrig med talet i modellnamnet i en källare.",
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
      "En kondensavfuktare fungerar sämre ju kallare det blir och slutar helt under sin angivna nedre gräns, som för de flesta apparater i vår jämförelse ligger på 5 grader. Wood's SW42FW och LD40 går ner till 2 grader tack vare avfrostning, och det är de enda i vår rankning som gör det. Under det behöver du en sorptionsavfuktare, som arbetar även i minusgrader. Räkna också med att vattenmängden faller brant. Meacos egen tabell för Arete One 25L går från 17,5 liter per dygn vid 20 grader och 80 procent till 7,2 liter vid 10 grader och samma fuktighet, alltså mindre än hälften för tio graders skillnad, och den apparaten stannar ändå vid 5.",
  },
  {
    question: "Hur mycket el drar en avfuktare?",
    answer:
      "Mellan 151 och 600 watt bland apparaterna i vår jämförelse, men det är fel sätt att räkna. Which?, den enda oberoende provningen i Europa, sätter förbrukningen i relation till mängden uppsamlat vatten i stället för till tiden, och motiverar det med att vissa apparater behöver dubbelt så lång drifttid för samma vattenmängd. Räknar man watt per liter och dygn vid 30 grader och 80 procent blir spannet i vår jämförelse 11,6 för eeese Hugo upp till 36 för Clas Ohlsons tiolitersapparat, alltså mer än tre gånger. Och kvoten stiger när det blir kallare: Meacos Arete One 25L går från 16 watt per liter vid 20 grader och 80 procent till 62 vid 10 grader och 60, eftersom kompressorn drar nästan lika mycket medan vattnet nästan tar slut.",
  },
  {
    question: "Finns det en standard för hur avfuktare ska mätas?",
    answer:
      "Ja, och den heter SS-EN 810. Den svenska titeln är Luftavfuktare med eldriven kompressor: provning av avfuktningsförmåga, märkning, funktionskrav och redovisning av tekniska data. Hos SIS anges den som gällande, utgåva 1, fastställd 30 april 1997, 21 sidor, framtagen av kommittén för värmepumpar, och den kostar 1 097 kronor. Den är snart trettio år gammal och har aldrig fått en andra utgåva. Och den gäller enligt sin egen titel bara avfuktare med eldriven kompressor, inte sorptionsavfuktare, som är den typ som rekommenderas för kalla krypgrunder. Vi har inte köpt standarden och påstår därför ingenting om vilka provvillkor den föreskriver.",
  },
  {
    question: "Behöver jag verkligen en avfuktare?",
    answer:
      "Kanske inte. En avfuktare är ingen permanent lösning, enligt ÖKO-TEST: är rum varaktigt för fuktiga är något fel, och då ska orsaken åtgärdas, annars tar både hälsan och byggnaden skada. Folkhälsomyndighetens allmänna råd säger samma sak från andra hållet, genom att göra ihållande hög luftfuktighet till en indikation för att undersöka byggnaden. En avfuktare är rätt verktyg för ett avgränsat jobb: torka tvätt inomhus, ta hand om en fuktig höst, hålla en källare i schack medan orsaken utreds. Den är fel verktyg mot en läckande grund eller en trasig ventilation. Köp en hygrometer för hundra kronor och mät i två veckor först.",
  },
  {
    question: "Vilken storlek på avfuktare behöver jag?",
    answer:
      "Butikernas kvadratmetertal går inte att lita på, eftersom ingen anger hur de räknat. Clas Ohlson anger 52 kvadratmeter för sin tjugolitersapparat, medan eeese anger 100 kvadratmeter i butikstexten för samma 20 liter per dygn och 70 i sin egen spectabell. Gå i stället efter hur stort utrymmet faktiskt är, hur kallt det blir där, och hur snabbt du behöver ha fukten borta. Ett rum eller ett badrum klarar sig med 4 till 6 liter per dygn i verklig avfuktning. En normalstor källare eller tvättstuga du kör året runt bör ha 8 till 12. Ett stort eller uppdelat utrymme behöver mer, och då ska du också titta på luftflödet i kubikmeter per timme, eftersom vatten som fälls ut i ett hörn inte hjälper i det andra.",
  },
  {
    question: "Hur ofta måste jag tömma vattentanken?",
    answer:
      "I ett fuktigt utrymme varje dygn, och det är oftare än de flesta räknar med. Tankarna i vår jämförelse rymmer mellan 1,6 och 11,4 liter, och en apparat som tar 10 liter per dygn fyller en trelitertank tre gånger om dagen om den verkligen arbetar. När tanken är full stannar apparaten, och en avfuktare som står stilla avfuktar ingenting. Har du golvbrunn eller avlopp i utrymmet ska du därför koppla slang för kontinuerlig dränering och sluta bry dig om tankstorleken helt. Kontrollera vilken koppling som gäller: Wood's tar en vanlig trädgårdsslang via halvtumskoppling, Meaco en 12,5-millimeters trädgårdsslang, eeese en 14-millimeters som säljs separat, och Clas Ohlsons egna apparater vill ha 13,5 millimeters innerdiameter.",
  },
  {
    question: "Låter en avfuktare mycket? Kan den stå i sovrummet?",
    answer:
      "De apparater vi jämför anger mellan 34 och 60 decibel, en skillnad som hörs tydligt. Xiaomi Smart Dehumidifier Lite är tystast med 34 dB(A) i sovläge, Meacos två minsta ligger på 35, och Wood's SW42FW högst med 60. Som jämförelse brukar ett tyst sovrum ligga runt 30 decibel. En avfuktare är dessutom inte som en fläkt: kompressorn startar och stannar när hygrostaten slår till och från, och det är ofta växlingen snarare än ljudnivån som väcker folk. Ska den stå i ett sovrum, välj den lägsta angivna nivån du kan få och räkna med att köra den på lågt fläktläge.",
  },
  {
    question: "Blir det billigare att torka tvätt med avfuktare än med torktumlare?",
    answer:
      "Ofta ja, och skälet är att energin inte försvinner. En kondensavfuktare fäller ut vattnet ur luften och avger samtidigt värmen som frigörs, så en del av elen kommer tillbaka till rummet i stället för att blåsas ut. Wood's anger för LD40 att den återför 780 watt värme per liter vattenånga. Apparaterna i vår jämförelse drar mellan 151 och 600 watt, medan en torktumlare typiskt ligger på flera gånger det. Titta på luftflödet och inte bara på literantalet: det är luftströmmen över plaggen som torkar dem, och där ligger LD40 på 350 kubikmeter i timmen mot Meaco Arete One 25L:s 175. Räkna dock med att det tar längre tid, och att du behöver stänga dörren till rummet, annars fuktar du resten av bostaden i stället för att torka tvätten.",
  },
  {
    question: "Vad är R290, och är det farligt?",
    answer:
      "R290 är propan, och det är köldmediet i samtliga kondensavfuktare i vår jämförelse. Det används för att det har mycket låg klimatpåverkan jämfört med äldre syntetiska köldmedier. Det är brandfarligt, och det är skälet till att mängden anges i gram i specifikationen: Xiaomis apparat innehåller 38 gram, Clas Ohlsons tioliters 45 och deras tjugoliters 70, medan Meacos Arete One trappas upp med storleken från 35 gram i tiolitersmodellen till 90 i tjugofemman. Wood's LD40 ligger högst med 99 gram. Mängderna är små och systemet är slutet, men det förklarar varför tillverkarna anger en minsta rumsstorlek för vissa modeller och varför en skadad apparat inte ska köras vidare.",
  },
];
