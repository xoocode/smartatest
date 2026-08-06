import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { PIZZAUGN } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /pizzaugn.
 *
 * Andra sidan i gruppen Kök, byggd 2026-08-06. Sidan rankar fristående
 * pizzaugnar mellan 2 100 och 8 990 kronor på gasol, ved, kol och el. Murade
 * och fast installerade ugnar från 19 000 kronor rankas inte, efter
 * användarbeslut.
 *
 * Priser, artikelnummer, lagerstatus och kundbetyg är lästa i produktsidans
 * egen JSON-LD hos butiken på PRICE_CHECKED. Specifikationerna är lästa hos
 * **tillverkaren**: Oonis egen EU-butik, Witts egen produktkatalog, Gozneys,
 * Sages, Ninjas och Arietes egna produktsidor.
 *
 * AFFILIATE-SWAP — `merchantUrl` är butikens egen produktsida. Inget
 * `affiliateUrl` någonstans; vi har inget program i kategorin. Se lib/links.ts
 * för vad LINK_MODE står på i dag.
 *
 * ## Spridningen över stenen, inte maxtemperaturen
 *
 * Femton ugnar av femton anger 500 grader. Ninja Artisan är enda undantaget med
 * 370. Talet är alltså en grind varje ugn passerar, och det som faktiskt
 * skiljer dem åt är hur mycket kallare stenen är framtill än baktill.
 *
 * tek.no har mätt det på tre punkter efter 30 minuters uppvärmning:
 *
 * - **Ooni Koda 12**: 480 grader bak, 220 fram. 260 graders skillnad.
 * - **Ooni Koda 16**: 500 bak, 420 mitt, 310 fram.
 * - **Gozney Roccbox**: 470 bak, 270 fram. Vedeldad bara 370 till 400.
 * - **FCC BBQ Pizza Chef**: 405, 350 och 332, alltså jämnast av de billiga.
 * - **Ooni Karu 12G**: cirka 400 över hela stenen efter 15 minuter, tack vare
 *   dörren.
 *
 * ⚠️ **Och tillverkaren säljer numera på samma tal.** Oonis egen produkttext
 * för Koda 2 anger att den nya brännaren sänker svängningarna i stentemperatur
 * "from 175 °C to 85 °C", och Koda 2 Pro "from 180 °C to 45 °C", båda uttryckt
 * mot första generationen. Ooni anger alltså själva att Koda 12 och Koda 16
 * hade 175 till 180 graders spridning. Två oberoende led, samma storhet.
 *
 * ## Därför betygsätter `jamn-varme` konstruktionen
 *
 * Bara fyra modeller säljs här under exakt det namn tek.no provat, och Ooni
 * bytte generation efter provningen. Ett kriterium satt på mätvärdet hade låtit
 * provningsurvalet avgöra rankningen. Skalan graderar därför det som orsakar
 * spridningen och går att läsa för hela fältet: roterande sten 5,0, dörr eller
 * dubbla brännare 4,0 till 4,5, enkel flamma i öppen kammare 3,0. Stenens
 * tjocklek väger in på samma sätt.
 *
 * ⚠️ `Uppmätt stentemperatur bak` och `Uppmätt stentemperatur fram` ligger i
 * ALDRIG_BEDOMD. Ooni Koda 12 och Ooni Koda 2 är olika ugnar, Karu 12G och
 * Karu 2 likaså, och ett tal lånat mellan generationer är samma fel som
 * Nanoleaf Lines mot Essentials på /smart-belysning.
 *
 * ## Sex av tolv är Ooni
 *
 * Det speglar handeln och inte ett urvalsfel. Bagaren och Kockens hela
 * pizzaugnssortiment under 9 000 kronor bär Ooni på ungefär hälften av
 * hyllan, och det står utskrivet på sidan.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte gräddat en pizza. tek.no har provat över 20 ugnar för hand och
 * Which? sex stycken; båda är namngivna där de citeras, och inget av deras
 * betyg påverkar en enda poäng här.
 */

export const PRICE_CHECKED = "2026-08-06";

const SEEDS: ProductSeed[] = [
  {
    id: "ooni-karu-2",
    brand: "Ooni",
    name: "Karu 2",
    shortName: "Ooni Karu 2",
    image: productImage(PIZZAUGN.slug, "ooni-karu-2"),
    tagline: "Glasdörren håller kvar värmen som andra ugnar blåser ut framtill.",
    scores: {
      /* Dörr i borosilikatglas i en kategori där de flesta har en öppen mun.
         Ooni anger 450 grader på så lite som 15 minuter. Föregångaren Karu 12G
         mättes av tek.no till cirka 400 grader jämnt över hela stenen efter
         15 minuter, vilket är konstruktionen den här ärver. 15 mm sten. */
      "jamn-varme": 4.5,
      /* 3 499 kr är billigast av allt som har både dörr och två bränslen. */
      prisvarde: 5,
      /* 12 tum, alltså en pizza i taget. */
      bakyta: 3,
      /* Ved och kol som standard, gasbrännare som tillbehör för 1 000 kr. */
      bransleflexibilitet: 5,
      /* 15,3 kg, hopfällbara ben, avtagbar skorsten och ett handtag som
         tillverkaren anger håller sig svalt. */
      barbarhet: 4.5,
    },
    price: 3499,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/ooni/ooni-karu-2-pizzaugn-12/?variantId=644218-01",
    award: "winner",
    superlative: "Bäst för dig som vill elda med ved",
    pros: [
      "Dörr i borosilikatglas, så värmen stannar inne mellan pizzorna",
      "Ved och kol som standard, gasbrännare som tillbehör",
      "Tillverkaren anger 450 grader på 15 minuter, snabbast bland de bränsleflexibla",
      "Inbyggd termometer, som fyra av tolv saknar",
      "15,3 kg med hopfällbara ben och avtagbar skorsten",
      "15 mm sten i kordierit",
    ],
    cons: [
      "12 tum räcker till en pizza i taget, så fyra personer får äta i tur och ordning",
      "Gasbrännaren kostar ungefär 1 000 kronor extra, så priset blir 4 500 för den som vill ha gasol",
      "Ved och kol måste matas medan du gräddar, till skillnad från en ratt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "3 499 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "Ved, kol, gasol (tillbehör)", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "12 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Ja, borosilikatglas", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "Bakre, under sten", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "15,3 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "500 °C", highlight: true },
      { label: "Stentjocklek", value: "15 mm" },
      { label: "Angiven uppvärmningstid", value: "15 min till 450 °C" },
      { label: "Inbyggd termometer", value: "Ja" },
      { label: "Yttermått", value: "72 × 42 × 77 cm" },
      { label: "Artikelnummer", value: "644218-01" },
    ],
    verdict:
      "Ooni Karu 2 kostar 3 499 kronor och är den billigaste ugnen här som både har en dörr och klarar mer än ett bränsle. Den gräddar 12-tumspizzor på ved, kol eller gasol.\n\n**Dörren i borosilikatglas är hela skälet att välja den.** De flesta pizzaugnar har en öppen mun, och värmen rinner ut just där pizzan läggs in: föregångaren Ooni Koda 12 mättes av tek.no till 480 grader längst bak och 220 längst fram på samma sten. Med en dörr som håller kvar värmen slipper du vrida pizzan tre gånger för att den ska gräddas jämnt, och du kan följa den utan att öppna. Ooni anger 450 grader på så lite som 15 minuter, vilket är snabbast bland de bränsleflexibla.\n\n**Att du kan byta bränsle betyder att ugnen duger både till tisdag och till lördag.** Ved och kol ger röksmaken som är hela poängen med en riktig pizzaugn, men kräver att du matar elden medan du gräddar. Gasbrännaren, som kostar ungefär 1 000 kronor extra, gör samma ugn till något du tänder med en ratt och släcker med samma ratt. Till det kommer en inbyggd termometer, som fyra av de tolv ugnarna här saknar helt, och 15,3 kilo med hopfällbara ben.\n\nGränsen är storleken. 12 tum är en pizza i taget, och ska fyra personer äta samtidigt blir det fyra vändor på 90 sekunder styck plus uppvärmning mellan. Är ni fler än två regelbundet ska du lägga 1 800 kronor till på Witt Piccolo Rotante 16\". Alla andra köper den här.",
  },
  {
    id: "witt-piccolo-rotante-16",
    brand: "Witt",
    name: "Piccolo Rotante 16\"",
    shortName: "Witt Piccolo Rotante 16\"",
    image: productImage(PIZZAUGN.slug, "witt-piccolo-rotante-16"),
    tagline: "Stenen snurrar, så pizzan gräddas jämnt utan att du rör den.",
    scores: {
      /* Enda ugnen i jämförelsen med roterande sten, driven av borstlös motor.
         C-formad brännare. tek.no mätte 400 till 410 grader över stenen efter
         15 minuter och kallade det den mest ideala temperaturen för
         napolitansk pizza. Betyg 8,5 av 10. */
      "jamn-varme": 5,
      /* 5 290 kr för en roterande 16-tums, mot 6 990 för Ooni Koda 2 Pro utan
         rotation och 8 190 för Gozney Arc på 14 tum. */
      prisvarde: 4.5,
      /* Sten på 40,5 cm, alltså 16 tum. Störst tillsammans med Koda 2 Pro. */
      bakyta: 5,
      /* Bara gasol. */
      bransleflexibilitet: 3.5,
      /* 22,9 kg, och Witt anger själva ugnen som inte bärbar. */
      barbarhet: 2.5,
    },
    price: 5290,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/witt-piccolo-rotante-16-pizzaugn-svart_69204/",
    award: "editor",
    superlative: "Bäst för fyra som äter samtidigt",
    pros: [
      "Roterande sten, så pizzan gräddas jämnt utan att vridas för hand",
      "Sten på 40,5 cm i kordierit, 15 mm tjock",
      "C-formad brännare på 7,0 kW som lägger värmen runt pizzan",
      "Tillverkaren anger 500 grader och klar på 15 minuter",
      "Färdig pizza på under 90 sekunder",
      "Borstlös motor, som drar mindre och låter mindre än en borstad",
    ],
    cons: [
      "22,9 kilo, och Witt anger själva att den inte är bärbar",
      "Motorn går på fem AA-batterier, som tar slut mitt i en pizzakväll",
      "Ingen temperaturvisning, så du får läsa värmen med en egen termometer",
      "Bara gasol, så röksmaken från ved är inte möjlig",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "5 290 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "Gasol", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "16 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Roterande", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Nej", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "C-formad runt stenen", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "22,9 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "500 °C", highlight: true },
      { label: "Stentjocklek", value: "15 mm" },
      { label: "Angiven uppvärmningstid", value: "15 min" },
      { label: "Effekt", value: "7,0 kW" },
      { label: "Inbyggd termometer", value: "Nej" },
      { label: "Yttermått", value: "65 × 57 × 38,3 cm" },
      { label: "Uppmätt stentemperatur bak", value: "400–410 °C" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "5707582040862" },
      { label: "Artikelnummer", value: "100000310" },
    ],
    verdict:
      "Witt Piccolo Rotante 16\" kostar 5 290 kronor och är den enda ugnen i jämförelsen där stenen snurrar. Den tar en pizza på 16 tum, alltså dubbla ytan mot de flesta här.\n\n**Den roterande stenen löser kategorins största problem i stället för att lindra det.** I en vanlig pizzaugn är stenen mycket varmare baktill än framtill, och botten bränns i ena änden medan den andra fortfarande är blek, vilket är varför man får vrida pizzan tre eller fyra gånger med en spade. Här vrider ugnen den åt dig, och tek.no mätte 400 till 410 grader över stenen efter 15 minuter och beskrev det som den mest ideala temperaturen för napolitansk pizza. Deras betyg blev 8,5 av 10.\n\n**16 tum är skillnaden mellan en pizza och en middag.** En 16-tumspizza har nästan dubbelt så stor yta som en 12-tums, alltså två portioner i stället för en, och den tar en hel kyckling eller ett bröd när du inte gör pizza. Brännaren är C-formad och lägger 7,0 kilowatt runt pizzan i stället för bakom den, och en färdig pizza tar under 90 sekunder.\n\nAtt motorn går på fem AA-batterier är den detalj som kommer att irritera. De tar slut mitt i en pizzakväll och du har dem inte hemma. Och med 22,9 kilo står ugnen där du ställer den; Witt anger själva att den inte är bärbar. Ska ugnen följa med till sommarstugan tar du Ooni Karu 2 för 1 800 kronor mindre.",
  },
  {
    id: "ooni-koda-2",
    brand: "Ooni",
    name: "Koda 2",
    shortName: "Ooni Koda 2",
    image: productImage(PIZZAUGN.slug, "ooni-koda-2"),
    tagline: "14 tum och 16 kilo, med tillverkarens jämnaste flamma utan dörr.",
    scores: {
      /* Ooni anger själva att den nya brännaren sänker svängningarna i
         stentemperatur från 175 till 85 grader mot första generationen. Ingen
         dörr, men den avsmalnande flamman är kategorins näst bästa lösning
         efter roterande sten. 15 mm sten. */
      "jamn-varme": 4,
      /* 3 990 kr för 14 tum, mot 6 990 för 16 tum hos samma tillverkare. */
      prisvarde: 4.5,
      /* 14 tum, alltså mitt emellan fältets ytterlägen. */
      bakyta: 4,
      /* Bara gasol. */
      bransleflexibilitet: 3.5,
      /* 16 kg, hopfällbara ben. */
      barbarhet: 4,
    },
    price: 3990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/ooni/ooni-koda-2-pizzaugn-gasol-14/?variantId=644214-01",
    award: "budget",
    superlative: "Bäst för gasol utan krångel",
    pros: [
      "Tillverkaren anger 85 graders skillnad över stenen, mot 175 för föregångaren",
      "14 tum, alltså en tredjedel större yta än en 12-tums",
      "Värmer om stenen 20 procent snabbare mellan pizzorna än första generationen",
      "16 kilo och 545 mm brett, så den får plats på en vanlig utebänk",
      "Pyrolytisk rengöring, alltså ugnen bränner av sig själv",
      "15 mm sten i kordierit",
    ],
    cons: [
      "Ingen dörr, så värmen rinner ut framtill varje gång du tittar",
      "Bara gasol, så ingen röksmak",
      "Ingen inbyggd termometer, till skillnad från Karu 2 och Gozney Roccbox",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "3 990 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "Gasol", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "14 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Nej", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "Bakre, avsmalnande flamma", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "16 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "500 °C", highlight: true },
      { label: "Stentjocklek", value: "15 mm" },
      { label: "Inbyggd termometer", value: "Nej" },
      { label: "Yttermått", value: "54,5 × 47,2 × 33,3 cm" },
      { label: "Artikelnummer", value: "644214-01" },
    ],
    verdict:
      "Ooni Koda 2 kostar 3 990 kronor, tar en pizza på 14 tum och går på gasol. Den är efterföljaren till Koda 12, som är den mest sålda pizzaugnen som gjorts.\n\n**Den avsmalnande brännaren är den enda i jämförelsen där tillverkaren sätter en siffra på hur jämn värmen blir.** Ooni anger att skillnaden i stentemperatur gick från 175 grader till 85 mellan första och andra generationen, och att stenen värms om 20 procent snabbare mellan pizzorna. Det andra talet märks först när du gräddar den tredje pizzan: en sten som inte hunnit ladda om ger en blek botten hur varm luften än är.\n\n**14 tum är en tredjedel större yta än en 12-tums**, vilket i praktiken är skillnaden mellan en portion och en portion med en bit över. Ugnen väger 16 kilo och är 545 millimeter bred, alltså smal nog för en vanlig utebänk, och den rengörs pyrolytiskt: du kör den varm och den bränner av sig själv i stället för att skrubbas.\n\nDen saknar dörr, och det kostar. Varje gång du tittar på pizzan går värmen ut genom öppningen, och det är just framtill stenen redan är kallast. Vill du ha en dörr för samma pengar finns Ooni Karu 2 på 3 499 kronor, som dessutom klarar ved. Koda 2 är för den som vill tända med en ratt, grädda och slippa tänka mer på bränsle.",
  },
  {
    id: "ooni-koda-2-pro",
    brand: "Ooni",
    name: "Koda 2 Pro",
    shortName: "Ooni Koda 2 Pro",
    image: productImage(PIZZAUGN.slug, "ooni-koda-2-pro"),
    tagline: "45 graders skillnad över stenen, jämnast av ugnarna utan rotation.",
    scores: {
      /* Ooni anger 45 graders svängning i stentemperatur mot första
         generationens 180. Det är det bästa talet någon tillverkare i
         jämförelsen publicerar för en ugn utan roterande sten. 20 mm sten
         lagrar dessutom mest värme tillsammans med Koda 2 Max. */
      "jamn-varme": 4.5,
      /* 6 990 kr, alltså 1 700 mer än en roterande 16-tums. */
      prisvarde: 3.5,
      /* 18-tumssten för pizzor på 16 tum. Störst tillsammans med Witt. */
      bakyta: 5,
      /* Bara gasol. */
      bransleflexibilitet: 3.5,
      /* 30 kg. */
      barbarhet: 2.5,
    },
    price: 6990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/ooni-koda-2-pro-pizzaugn_67326/",
    award: "premium",
    superlative: "Bäst för den som lagar mer än pizza",
    pros: [
      "Tillverkaren anger 45 graders skillnad över stenen, bäst av alla utan rotation",
      "Temperaturen ställs från 160 till 500 grader, alltså även för långsam matlagning",
      "20 mm sten, som lagrar mest värme tillsammans med Koda 2 Max",
      "18-tumssten som tar pizzor på 16 tum",
      "Digital temperaturmätare på fronten med mattermometer",
      "Värmer om stenen 25 procent snabbare än första generationen",
    ],
    cons: [
      "6 990 kronor, alltså 1 700 mer än en roterande sten i samma storlek",
      "30 kilo, så den flyttas inte utan hjälp",
      "Bara gasol",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "6 990 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "Gasol", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "16 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Nej", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "Bakre, avsmalnande flamma", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "30 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "500 °C", highlight: true },
      { label: "Stentjocklek", value: "20 mm" },
      { label: "Inbyggd termometer", value: "Ja, digital" },
      { label: "Yttermått", value: "68,2 × 65,2 × 39,3 cm" },
      { label: "Artikelnummer", value: "67326" },
    ],
    verdict:
      "Ooni Koda 2 Pro kostar 6 990 kronor och tar pizzor på 16 tum på en sten som mäter 18. Den är gasoldriven och väger 30 kilo.\n\n**Ingen annan ugn utan roterande sten kommer i närheten av dess jämnhet.** Ooni anger 45 graders skillnad i stentemperatur mot första generationens 180, alltså en fjärdedel så stor spridning, och det är det bästa talet någon tillverkare här publicerar för en fast sten. Stenen är 20 millimeter tjock mot de flestas 15, vilket betyder att den lagrar mer värme och laddar om snabbare mellan pizzorna. Det är skillnaden mellan att grädda fyra pizzor i följd och att vänta mellan varje.\n\n**Temperaturen går ner till 160 grader, och det gör den till något annat än en pizzaugn.** De andra gasolugnarna här har i praktiken ett läge, mycket varmt, och duger därför till pizza och nästan ingenting mer. Med 160 grader som golv går det att steka en hel kyckling eller långsamt tillaga kött, och den digitala mätaren på fronten har en mattermometer så att du ser innertemperaturen i stället för att gissa.\n\nPriset är svårt att försvara mot Witt Piccolo Rotante 16\", som tar samma pizzastorlek, gräddar jämnare tack vare rotationen och kostar 1 700 kronor mindre. Köp Koda 2 Pro om du vill använda ugnen till annat än pizza. Ska den bara grädda pizza tar du Witt.",
  },
  {
    id: "ariete-da-gennaro",
    brand: "Ariete",
    name: "Da Gennaro 3901/00",
    shortName: "Ariete Da Gennaro",
    image: productImage(PIZZAUGN.slug, "ariete-da-gennaro"),
    tagline: "430 grader inomhus för 2 100 kronor, och väger 9,5 kilo.",
    scores: {
      /* Två separat reglerade värmeelement och tre lägen för var elementen
         arbetar, i en sluten kammare med dubbelglas. Ingen öppen mun att tappa
         värme genom. 430 grader är högst av de elektriska. */
      "jamn-varme": 3.5,
      /* 2 100 kr, alltså billigast med god marginal. Näst billigaste kostar
         890 kr mer. */
      prisvarde: 5,
      /* Invändigt 33 × 35 cm, alltså ungefär 13 tum. */
      bakyta: 3,
      /* El, och den enda tillsammans med Sage som får stå inomhus. */
      bransleflexibilitet: 3,
      /* 9,49 kg, lättast i jämförelsen, men bunden till ett eluttag. */
      barbarhet: 4,
    },
    price: 2100,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/ariete-da-gennaro-pizzaugn_82923/",
    superlative: "Bäst för lägenhet utan balkong",
    pros: [
      "2 100 kronor, alltså 890 kronor billigare än näst billigaste",
      "430 grader, högst av de elektriska ugnarna här",
      "Två separat reglerade värmeelement med tre lägen",
      "9,49 kilo, lättast i jämförelsen",
      "Eldfast sten som går att lyfta ur och rengöra",
      "Dubbelglas och innerbelysning, så du ser pizzan utan att öppna",
    ],
    cons: [
      "Invändigt 33 × 35 centimeter, så pizzan får inte bli större än 13 tum",
      "430 grader mot gasolugnarnas 500, vilket märks på hur snabbt skorpan bubblar",
      "Bunden till ett eluttag, så den följer inte med till stranden",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 100 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "El", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "13 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Ja, dubbelglas", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "Två element, över och under", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "9,49 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "430 °C", highlight: true },
      { label: "Angiven uppvärmningstid", value: "Pizza på 2 min" },
      { label: "Inbyggd termometer", value: "Nej, ratt med gradering" },
      { label: "Yttermått", value: "46 × 44 × 29 cm" },
      { label: "Artikelnummer", value: "82923" },
    ],
    verdict:
      "Ariete Da Gennaro kostar 2 100 kronor, går på el och når 430 grader. Den väger 9,49 kilo och är den billigaste och lättaste ugnen i jämförelsen.\n\n**Att den får stå inomhus är hela argumentet.** En gasolugn kräver öppen låga och därmed en uteplats, och många bostadsrättsföreningar tillåter inte gasol på balkong över huvud taget. Den här ställs på köksbänken och kopplas in i ett vanligt uttag, vilket gör den till den enda ugnen här som fungerar för den som bor i lägenhet utan balkong. 430 grader är dessutom högst bland de elektriska, och 130 grader varmare än en vanlig hushållsugn klarar.\n\n**Två separat reglerade element med tre lägen ger kontroll som är ovanlig i prisklassen.** Du styr var värmen kommer ifrån, vilket är hur du löser den klassiska nybörjarmissen med bränd botten och obakad ost: lägg mer värme uppifrån. Stenen lyfts ur för rengöring, och dubbelglaset med innerbelysning gör att du kan följa pizzan utan att öppna och tappa värme.\n\nUtrymmet är gränsen. Invändigt mäter den 33 gånger 35 centimeter, så pizzan får inte bli större än ungefär 13 tum, och höjden på 9 centimeter utesluter en hel kyckling. Har du en uteplats och vill åt de 500 grader som ger riktig napolitansk skorpa är Ooni Koda 2 för 3 990 kronor rätt ugn. Bor du i lägenhet är det här den enda på listan som faktiskt går att använda.",
  },
  {
    id: "gozney-roccbox",
    brand: "Gozney",
    name: "Roccbox",
    shortName: "Gozney Roccbox",
    image: productImage(PIZZAUGN.slug, "gozney-roccbox"),
    tagline: "Silikonmanteln gör utsidan säker att ta i medan stenen är 470 grader.",
    scores: {
      /* Rullande flamma och tjock isolering, men ingen dörr. tek.no mätte 470
         grader bak mot 270 fram, alltså 200 graders spridning, och gav 7,0 av
         10. Vedeldad nådde den bara 370 till 400. Which? utsåg den till
         testvinnare bland sex mobila ugnar. */
      "jamn-varme": 3.5,
      /* 4 803 kr för 12 tum. */
      prisvarde: 4,
      /* Cirka 12 tum, sten 310 × 340 mm. */
      bakyta: 3,
      /* Gasol som standard, vedbrännare som tillbehör. Omvänt mot Karu 2. */
      bransleflexibilitet: 4.5,
      /* 20 kg, infällbara ben, avtagbar brännare och en silikonmantel som gör
         utsidan säker att ta i. */
      barbarhet: 4,
    },
    price: 4803,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/gozney-roccbox-pizzaugn_66028/",
    userRating: { value: 4.7, count: 3, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst med barn runt ugnen",
    pros: [
      "Silikonmantel som gör utsidan säker att ta i, ensam i jämförelsen",
      "Gasol som standard och vedbrännare som tillbehör",
      "Inbyggd termometer",
      "Infällbara ben och avtagbar brännare, så den packas ihop",
      "Which? utsåg den till testvinnare bland sex mobila pizzaugnar",
      "Tjock isolering som håller värmen mellan pizzorna",
    ],
    cons: [
      "tek.no mätte 470 grader bak mot 270 fram, alltså 200 graders skillnad",
      "Vedeldad nådde den bara 370 till 400 grader enligt tek.no, alltså under napolitansk temperatur",
      "12 tum räcker till en pizza i taget",
      "20 kilo utan att ha en dörr, vilket Ooni Karu 2 har vid 15,3",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "4 803 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "Gasol, ved (tillbehör)", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "12 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Nej", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "Bakre, rullande flamma", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "20 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "500 °C", highlight: true },
      { label: "Inbyggd termometer", value: "Ja" },
      { label: "Yttermått", value: "54 × 41,3 × 47,3 cm utfälld" },
      { label: "Uppmätt stentemperatur bak", value: "470 °C" },
      { label: "Uppmätt stentemperatur fram", value: "270 °C" },
      { label: "Artikelnummer", value: "66028" },
    ],
    verdict:
      "Gozney Roccbox kostar 4 803 kronor, går på gasol och tar en pizza på 12 tum. Vedbrännare finns som tillbehör.\n\n**Silikonmanteln runt ugnen är något ingen annan här har, och den är skälet att välja den om det finns barn i närheten.** En pizzaugn i stål är brännhet över hela utsidan medan den arbetar, och 500 grader inuti betyder att metallhöljet klarar att ge en brännskada på ett ögonblick. Roccbox har ett mjukt yttre som du kan ta i, plus infällbara ben och en avtagbar brännare som gör att den packas ihop till något som får plats i en bagagelucka. Den har också en inbyggd termometer, vilket fyra av de tolv saknar.\n\n**Källorna är oense om just den här ugnen, och det är värt att veta innan du köper.** Brittiska Which? provade sex mobila pizzaugnar och utsåg Roccbox till testvinnare. Norska tek.no gav den 7,0 av 10, sitt lägsta betyg bland de dyrare ugnarna, och mätte 470 grader längst bak på stenen mot 270 längst fram. Båda har provat den på riktigt. Skillnaden ligger sannolikt i att tek.no vägde jämnheten tyngst av allt.\n\nVedeldningen håller inte vad namnet lovar. tek.no mätte bara 370 till 400 grader med vedbrännaren, alltså under de 400 till 500 som krävs för napolitansk pizza på 90 sekunder. Vill du elda med ved på riktigt är Ooni Karu 2 både billigare och byggd för det. Roccbox köper du för att den är trygg att ha igång när folk rör sig omkring den.",
  },
  {
    id: "ninja-artisan",
    brand: "Ninja",
    name: "Artisan MO201",
    shortName: "Ninja Artisan",
    image: productImage(PIZZAUGN.slug, "ninja-artisan"),
    tagline: "Fem funktioner i en, och 11,9 kilo att bära ut på altanen.",
    scores: {
      /* Sluten elektrisk kammare utan öppen mun, alltså liten spridning. Men
         taket ligger på 370 grader, vilket är lägst i jämförelsen och under
         det band napolitansk pizza kräver. */
      "jamn-varme": 3.5,
      /* 3 999 kr för en ugn som också är airfryer, bakugn och grill. */
      prisvarde: 4.5,
      /* 12 tum. */
      bakyta: 3,
      /* El, men avsedd enbart för utomhusbruk, alltså kräver både uttag ute
         och tak över huvudet. Sämst av de elektriska på den punkten. */
      bransleflexibilitet: 2.5,
      /* 11,9 kg, näst lättast, men bunden till ett eluttag. */
      barbarhet: 4,
    },
    price: 3999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/ninja-artisan-elektrisk-pizzaugn-och-airfryer_82348/",
    superlative: "Bäst för altanen som saknar utekök",
    pros: [
      "Fem funktioner: pizza, airfryer, bakugn, grill och varmhållning",
      "11,9 kilo, näst lättast i jämförelsen",
      "Pizzasten på 12 tum, bakplåt 30 × 30 cm, pizzaspade och fritörkorg ingår",
      "Ingen låga, alltså inget gasolbyte och ingen ved",
      "2 års garanti",
      "Tar 6 kycklingfiléer eller 1,3 kilo pommes frites",
    ],
    cons: [
      "370 grader är lägst i jämförelsen, och under de 400 som napolitansk pizza kräver",
      "Bara för utomhusbruk trots att den går på el, så du behöver ett uttag ute",
      "12 tum räcker till en pizza i taget",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "3 999 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "El", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "12 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Ja", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "Element, över och under", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "11,9 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "370 °C", highlight: true },
      { label: "Effekt", value: "1 760 W" },
      { label: "Inbyggd termometer", value: "Nej, digital ratt" },
      { label: "Yttermått", value: "59 × 42 × 32 cm" },
      { label: "Garanti", value: "2 år" },
      { label: "Artikelnummer", value: "82348" },
    ],
    verdict:
      "Ninja Artisan kostar 3 999 kronor, går på el och gör fem saker: pizza, airfryer, bakugn, grill och varmhållning. Den väger 11,9 kilo.\n\n**Den är den enda ugnen här som är fem apparater**, och det avgör om priset är rimligt. En pizzaugn används i praktiken några gånger per sommar av de flesta som köper en, och står sedan i förrådet. Den här tar 6 kycklingfiléer eller 1,3 kilo pommes frites, har en bakplåt på 30 gånger 30 centimeter och en fritörkorg med i lådan, så den har något att göra även de kvällar ingen bakar deg. Elen betyder också att det aldrig blir ett gasolbyte mitt i en middag.\n\n**370 grader är det tal som skiljer den från alla andra**, och Ninja skriver ut det själva medan varenda konkurrent anger 500. Det är ärligt, och det är också en verklig begränsning: napolitansk pizza gräddas på 60 till 90 sekunder vid 400 till 500 grader, och vid 370 tar det tre minuter. Skorpan blir god men får inte de brända blåsorna som är hela poängen med den italienska stilen. Till amerikansk pizza med tjockare botten spelar det ingen roll alls.\n\nAtt en elektrisk ugn bara får användas utomhus är den udda detaljen. Du behöver alltså ett eluttag på altanen, vilket många inte har, och tak över den om det regnar. Vill du grädda inomhus är Ariete Da Gennaro på 2 100 kronor rätt val. Har du uttag ute och vill ha en apparat i stället för fyra är det här den.",
  },
  {
    id: "ooni-koda-2-max",
    brand: "Ooni",
    name: "Koda 2 Max",
    shortName: "Ooni Koda 2 Max",
    image: productImage(PIZZAUGN.slug, "ooni-koda-2-max"),
    tagline: "Två pizzor på 12 tum samtidigt, i var sin temperaturzon.",
    scores: {
      /* Två separat reglerade brännare med avsmalnande flammor, alltså värme
         från två håll över en 24-tumsyta. 20 mm sten. Ingen dörr. */
      "jamn-varme": 4.5,
      /* 8 990 kr, dyrast i jämförelsen. */
      prisvarde: 2.5,
      /* 24 tums bakyta, alltså två pizzor på 12 tum eller tre på 10. Störst. */
      bakyta: 5,
      /* Bara gasol. */
      bransleflexibilitet: 3.5,
      /* 43 kg, alltså tyngst med marginal. */
      barbarhet: 1.5,
    },
    price: 8990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/ooni-koda-2-max-pizzaugn_67325/",
    superlative: "Bäst för det inbyggda uteköket",
    pros: [
      "24 tums bakyta som tar två pizzor på 12 tum samtidigt",
      "Två separat reglerade brännare med var sin temperaturzon",
      "20 mm sten, som lagrar mest värme tillsammans med Koda 2 Pro",
      "Digital temperaturmätare med två mattermometrar",
      "Går att koppla till Oonis app över Bluetooth",
      "Klar att grädda på 30 minuter vid 400 grader",
    ],
    cons: [
      "43 kilo, alltså tyngst i jämförelsen med 13 kilo",
      "8 990 kronor, dyrast här och nästan tre gånger den billigaste",
      "80 centimeter bred, så den kräver en egen bänk",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "8 990 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "Gasol", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "2 × 12 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Nej", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "Två, separat reglerade", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "43 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "500 °C", highlight: true },
      { label: "Stentjocklek", value: "20 mm" },
      { label: "Angiven uppvärmningstid", value: "30 min till 400 °C" },
      { label: "Inbyggd termometer", value: "Ja, digital med två givare" },
      { label: "Yttermått", value: "80 × 72,2 × 42,8 cm" },
      { label: "Artikelnummer", value: "67325" },
    ],
    verdict:
      "Ooni Koda 2 Max kostar 8 990 kronor och har en bakyta på 24 tum, alltså plats för två pizzor på 12 tum bredvid varandra. Den väger 43 kilo.\n\n**Två separat reglerade brännare är det som gör den till något annat än en stor pizzaugn.** Ytan är delad i två zoner med var sin ratt, så du kan hålla 500 grader i ena halvan för pizza och 250 i den andra för grönsaker eller bröd samtidigt. Att grädda två pizzor parallellt halverar dessutom kön vid en pizzakväll, vilket är den verkliga flaskhalsen när åtta personer ska äta: de andra ugnarna klarar en pizza var nittionde sekund, den här två.\n\n**20 millimeter sten och digital mätning med två mattermometrar hör ihop.** Den tjocka stenen laddar om mellan pizzorna i stället för att kylas ned, och givarna gör att du ser innertemperaturen i köttet i stället för att skära i det. Ugnen kopplas till Oonis app över Bluetooth och larmar när maten är klar.\n\n43 kilo och 80 centimeters bredd betyder att den inte flyttas och inte ställs undan. Den här ugnen förutsätter att du har en plats åt den i ett utekök och tänker låta den stå där. Ska ugnen bäras ut när det är fint väder och in igen är Ooni Koda 2 för 3 990 kronor rätt ugn, och skillnaden i pengar räcker till gasol i tio år.",
  },
  {
    id: "ooni-koda-16",
    brand: "Ooni",
    name: "Koda 16",
    shortName: "Ooni Koda 16",
    image: productImage(PIZZAUGN.slug, "ooni-koda-16"),
    tagline: "16 tum för 6 490 kronor, med den L-formade flamman som vändes en gång.",
    scores: {
      /* Första generationen, och Ooni märker själva sidan så. tek.no mätte 500
         grader bak, 420 mitt och 310 fram, alltså 190 graders spridning, och
         gav 8,5 av 10. Den L-formade brännaren är byggd för att pizzan bara ska
         behöva vridas en gång. 15 mm sten, ingen dörr. */
      "jamn-varme": 3,
      /* 6 490 kr för en generation tillverkaren själv säljer parallellt med
         efterföljaren. */
      prisvarde: 3,
      /* 16 tum. */
      bakyta: 5,
      /* Bara gasol. */
      bransleflexibilitet: 3.5,
      /* 18,2 kg, hopfällbara ben. */
      barbarhet: 3.5,
    },
    price: 6490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/ooni-koda-16-pizzaugn-gas_44933/",
    userRating: { value: 4.9, count: 9, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst köp när priset faller",
    pros: [
      "16 tum, alltså största bakytan tillsammans med Witt och Koda 2 Pro",
      "L-formad brännare som lägger värme längs två sidor",
      "18,2 kilo, lättare än både Koda 2 Pro och Witt Piccolo Rotante",
      "tek.no gav den 8,5 av 10, näst högsta betyget i deras test",
      "Tar en hel kyckling eller ett bröd tack vare storleken",
    ],
    cons: [
      "tek.no mätte 500 grader bak mot 310 fram, alltså 190 graders skillnad",
      "Ooni säljer den själva som första generationen medan Koda 2 Pro är andra",
      "6 490 kronor, alltså 1 200 mer än en roterande 16-tums från Witt",
      "Ingen dörr och ingen inbyggd termometer",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "6 490 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "Gasol", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "16 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Nej", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "L-formad, bak och sida", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "18,2 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "500 °C", highlight: true },
      { label: "Stentjocklek", value: "15 mm" },
      { label: "Inbyggd termometer", value: "Nej" },
      { label: "Yttermått", value: "63 × 58 × 37 cm" },
      { label: "Uppmätt stentemperatur bak", value: "500 °C" },
      { label: "Uppmätt stentemperatur fram", value: "310 °C" },
      { label: "Artikelnummer", value: "44933" },
    ],
    verdict:
      "Ooni Koda 16 kostar 6 490 kronor, tar pizzor på 16 tum och väger 18,2 kilo. Ooni säljer den parallellt med Koda 2 Pro och märker själva den här som första generationen.\n\n**Den L-formade brännaren var kategorins bästa lösning i flera år.** I stället för en rak flamma längs bakkanten lägger den värme längs två sidor, vilket enligt Ooni betyder att pizzan bara behöver vridas ett halvt varv i stället för fyra kvarts. tek.no mätte 500 grader längst bak, 420 mitt på och 310 längst fram efter 30 minuter, och gav ugnen 8,5 av 10, näst högst i deras test av över 20 ugnar. Den är alltså genuint bra, och 18,2 kilo gör den lättare än både Koda 2 Pro på 30 och Witt Piccolo Rotante på 22,9.\n\n**Men de 190 gradernas skillnad är precis det efterföljaren byggdes för att ta bort.** Ooni anger själva att Koda 2 Pro sänker svängningen i stentemperatur till 45 grader, alltså en fjärdedel, och den har dessutom 20 millimeter sten mot 15. Att köpa den äldre generationen till nästan samma pris betyder att du betalar för storleken och avstår från förbättringen.\n\nDen är därför ett köp bara när priset faller. Ligger den på 6 490 tar du Witt Piccolo Rotante 16\" för 5 290, som gräddar jämnare på lika stor sten. Hittar du Koda 16 på rea under 5 000 är den däremot mycket ugn för pengarna, och det är då den är värd att ha ögonen på.",
  },
  {
    id: "gozney-arc",
    brand: "Gozney",
    name: "Arc",
    shortName: "Gozney Arc",
    image: productImage(PIZZAUGN.slug, "gozney-arc"),
    tagline: "Flamman rullar längs sidan i stället för att stå still bakom.",
    scores: {
      /* Lateral rullande flamma byggd för att härma en vedeldad ugn och sprida
         värmen jämnt, i en tung och välisolerad kropp. Ingen dörr. Gozney
         publicerar inget spridningstal och tek.no har inte provat den. */
      "jamn-varme": 4,
      /* 8 190 kr för 14 tum, alltså dyrast per bakyta i jämförelsen. */
      prisvarde: 2.5,
      /* 14 tum, invändig bredd 377 mm. */
      bakyta: 4,
      /* Bara gasol. */
      bransleflexibilitet: 3.5,
      /* 21,5 kg utan hopfällbara ben. */
      barbarhet: 3,
    },
    price: 8190,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/gozney-arc-pizzaugn_67081/",
    superlative: "Bäst byggkvalitet på 14 tum",
    pros: [
      "Lateral rullande flamma som ska efterlikna en vedeldad ugn",
      "14 tums pizza på 60 sekunder enligt tillverkaren",
      "Invändig höjd 173 mm, alltså mer takhöjd än de flesta",
      "Tung och välisolerad kropp som håller värmen mellan pizzorna",
      "Låg och bred form som är stadig på en bänk",
    ],
    cons: [
      "8 190 kronor för 14 tum, alltså dyrast per bakyta här",
      "21,5 kilo utan hopfällbara ben",
      "Ingen oberoende provning har mätt den, till skillnad från Roccbox",
      "Bara gasol, och ingen vedbrännare som tillbehör",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "8 190 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "Gasol", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "14 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Nej", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "Lateral, rullande flamma", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "21,5 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "500 °C", highlight: true },
      { label: "Yttermått", value: "48 × 56,4 × 34,2 cm" },
      { label: "Artikelnummer", value: "67081" },
    ],
    verdict:
      "Gozney Arc kostar 8 190 kronor, går på gasol och tar en pizza på 14 tum. Den väger 21,5 kilo och är låg och bred i formen.\n\n**Brännaren ligger längs sidan i stället för bakom, och det är ovanligt.** Nästan alla gasolugnar har flamman som en rak eller L-formad remsa i bakkanten, vilket är förklaringen till att stenen blir mycket varmare där än framme vid öppningen. Gozney låter i stället flamman rulla lateralt genom kammaren för att härma hur elden rör sig i en vedeldad ugn, med målet att pizzan ska behöva vridas mindre. Invändigt är den 173 millimeter hög, alltså mer takhöjd än de flesta, vilket gör att värmen ovanifrån hinner smälta osten innan botten är klar.\n\n**Kroppen är tung och välisolerad**, och det märks på tredje pizzan snarare än på den första. En lätt ugn med tunna väggar tappar värme varje gång du öppnar, och stenen hinner inte ladda om. En 14-tumspizza tar 60 sekunder enligt Gozney.\n\nPriset är svårt att komma runt. 8 190 kronor för 14 tum är dyrast per bakyta i jämförelsen, och Witt Piccolo Rotante 16\" kostar 2 900 kronor mindre för en större sten som dessutom snurrar. Ingen oberoende provning har heller mätt Arc, till skillnad från Gozneys egen Roccbox som både Which? och tek.no gått igenom. Köp den för byggkvaliteten och formen, inte för att den är den mest ugn du får för pengarna.",
  },
  {
    id: "sage-pizzaiolo-spz820",
    brand: "Sage",
    name: "the Smart Oven Pizzaiolo SPZ820",
    shortName: "Sage Pizzaiolo",
    image: productImage(PIZZAUGN.slug, "sage-pizzaiolo-spz820"),
    tagline: "400 grader på köksbänken, alltså 100 mer än en vanlig ugn klarar.",
    scores: {
      /* Sluten bänkugn som återskapar tre värmetyper, med tek.nos betyg 8,0 av
         10. Jämnheten är god i en sluten kammare, men taket ligger på 400
         grader mot gasolugnarnas 500. */
      "jamn-varme": 4,
      /* 6 999 kr för 12 tum är näst dyrast per bakyta här. */
      prisvarde: 3,
      /* 30 cm, alltså 12 tum. */
      bakyta: 3,
      /* El, och får stå inomhus. */
      bransleflexibilitet: 3,
      /* Bänkugn som står där den ställs. */
      barbarhet: 3,
    },
    price: 6999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/sage-spz820-the-smart-oven-pizzaiolo-pizzaugn_44007/",
    userRating: { value: 4.9, count: 18, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som gräddar året om",
    pros: [
      "400 grader, alltså högst av de elektriska ugnar som får stå inomhus",
      "Färdig pizza på 2 minuter enligt tillverkaren",
      "Återskapar tre olika värmetyper i samma kammare",
      "tek.no gav den 8,0 av 10",
      "18 kundbetyg hos butiken med snittet 4,9 av 5, flest i jämförelsen",
      "Fungerar lika bra i januari som i juli",
    ],
    cons: [
      "6 999 kronor för 12 tum, alltså näst dyrast per bakyta här",
      "400 grader mot gasolugnarnas 500, vilket ger mindre av de brända blåsorna",
      "Låg invändigt, så en hel kyckling får inte plats",
      "Står på bänken och tar plats året om",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "6 999 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "El", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "12 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Ja", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "Element, över och under", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "Ej angiven", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "400 °C", highlight: true },
      { label: "Angiven uppvärmningstid", value: "Pizza på 2 min" },
      { label: "Effekt", value: "1 800 W" },
      { label: "Inbyggd termometer", value: "Nej, förvalda lägen" },
      { label: "Yttermått", value: "46,1 × 47,2 × 27 cm" },
      { label: "Artikelnummer", value: "44007" },
    ],
    verdict:
      "Sage the Smart Oven Pizzaiolo kostar 6 999 kronor, går på el och når 400 grader. Den tar en pizza på 30 centimeter och står på köksbänken.\n\n**Att den fungerar i januari är hela skillnaden mot resten av listan.** En gasolugn står ute, och i Sverige betyder det att den används i fyra månader och är inplastad i åtta. Den här kopplas in i ett vanligt uttag inomhus och gräddar en pizza på 2 minuter i februari lika gärna som i juli. Sage anger den som den första bänkugnen som når 400 grader, vilket är 100 grader mer än en vanlig hushållsugn klarar och tillräckligt för att degen ska pösa i stället för att torka.\n\n**Den återskapar tre olika värmetyper i samma kammare**, alltså strålningsvärme uppifrån, ledningsvärme från stenen och konvektion i luften, vilket är vad en vedeldad ugn gör naturligt. tek.no gav den 8,0 av 10. Butikens egna kunder har lagt 18 betyg med snittet 4,9 av 5, vilket är flest omdömen av alla ugnar här och därför den mest tillförlitliga kundsignalen på sidan.\n\nDe sista 100 graderna kostar dig något, och det är värt att veta. Napolitansk pizza vid 500 grader får brända blåsor på kanten som en ugn på 400 inte ger, hur bra den än är i övrigt. Söker du just det ska du ha en gasolugn ute. Vill du kunna göra riktigt bra pizza en tisdag i november är det här den enda ugnen på listan som klarar det.",
  },
  {
    id: "ooni-volt-2",
    brand: "Ooni",
    name: "Volt 2",
    shortName: "Ooni Volt 2",
    image: productImage(PIZZAUGN.slug, "ooni-volt-2"),
    tagline: "Klar att grädda på 12 minuter, snabbast av alla här.",
    scores: {
      /* Sluten elektrisk kammare med adaptiv styrning och sensorer som
         justerar löpande. Men stenen är bara 10 mm, alltså tunnast i
         jämförelsen, vilket ger sämst återhämtning mellan pizzorna. */
      "jamn-varme": 4,
      /* 6 490 kr för 12 tum, alltså dyrast per bakyta bland de elektriska. */
      prisvarde: 2.5,
      /* 12 tum. */
      bakyta: 3,
      /* El, och får stå inomhus. */
      bransleflexibilitet: 3,
      /* 17,6 kg och bunden till ett uttag, men bärbar till formen. */
      barbarhet: 3.5,
    },
    price: 6490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/ooni-volt-2-elektrisk-pizzaugn-12-charcoal-grey_76458/",
    userRating: { value: 4.3, count: 3, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för spontan pizza på en vardag",
    pros: [
      "Klar att grädda på 12 minuter, snabbast i jämförelsen",
      "450 grader, näst högst bland de elektriska",
      "Sensorer som justerar temperaturen löpande under gräddningen",
      "Förvalda lägen för napolitansk, tunn och pan pizza",
      "Får stå inomhus och går även att använda som vanlig ugn och grill",
      "Fönster i tre glas över hela framsidan",
    ],
    cons: [
      "10 mm sten, alltså tunnast här, så den återhämtar sig långsamt mellan pizzorna",
      "6 490 kronor för 12 tum är dyrast per bakyta bland de elektriska",
      "Ugnsöppningen är 9,1 cm hög, så det som gräddas får vara platt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "6 490 kr", highlight: true },
      { label: "Bränsle", shortLabel: "Bränsle", value: "El", highlight: true },
      { label: "Max pizzastorlek", shortLabel: "Pizza", value: "12 tum", highlight: true },
      { label: "Stenens rörelse", shortLabel: "Sten", value: "Fast", highlight: true },
      { label: "Dörr", shortLabel: "Dörr", value: "Ja, tre glas", highlight: true },
      { label: "Brännarens placering", shortLabel: "Brännare", value: "Element, över och under", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "17,6 kg", highlight: true },
      { label: "Angiven maxtemperatur", shortLabel: "Max", value: "450 °C", highlight: true },
      { label: "Stentjocklek", value: "10 mm" },
      { label: "Angiven uppvärmningstid", value: "12 min" },
      { label: "Inbyggd termometer", value: "Nej, förvalda lägen" },
      { label: "Yttermått", value: "54,5 × 44,2 × 26,3 cm" },
      { label: "Artikelnummer", value: "76458" },
    ],
    verdict:
      "Ooni Volt 2 kostar 6 490 kronor, går på el och når 450 grader. Den tar en pizza på 12 tum och får stå inomhus.\n\n**Tolv minuter till baktemperatur är snabbast på hela listan**, och det avgör hur ofta ugnen faktiskt används. En gasolugn behöver 15 till 30 minuter innan stenen är laddad, vilket i praktiken betyder att pizza blir något man planerar. Med 12 minuter går det att bestämma sig när degen redan ligger framme. Sensorer inuti justerar temperaturen löpande medan pizzan gräddas, och det finns förvalda lägen för napolitansk, tunn och amerikansk pan pizza så att du slipper lista ut inställningen själv.\n\n**450 grader är näst högst bland de elektriska**, vilket är nära nog gasolens 500 för att skorpan ska bete sig rätt. Fönstret i tre glas går över hela framsidan, så du ser pizzan hela tiden utan att öppna, och ugnen går att köra i vanligt ugnsläge och grillläge för annat än pizza.\n\nStenen är 10 millimeter, alltså tunnast i jämförelsen, och det är den verkliga begränsningen. En tunn sten ger snabb uppvärmning men lite lagrad värme, så den tredje pizzan i rad blir märkbart sämre än den första medan du väntar på att stenen laddar om. Ska du grädda till många på en gång är Ooni Koda 2 Max byggd för det. Volt 2 är för den som gör en eller två pizzor ofta, och vill kunna bestämma sig sent.",
  },
];

/**
 * Övervägda och bortvalda. Varje rad bär ett riktigt skäl och en verifierad
 * butikslänk, så att den som vill ha den vi valde bort ändå kan köpa den.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Witt",
    name: "Piccolo Rotante 13\"",
    approxPrice: 4799,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/witt-piccolo-rotante-pizzaugn-13-svart_69203/",
    reason:
      "Samma ugn som den vi rankat, med samma roterande sten och samma C-formade brännare, men 13 tum i stället för 16. Den kostar 4 799 kronor mot 5 290, alltså 491 kronor mindre för en sten som tar en tredjedel mindre pizza. Två omdömen om samma konstruktion hade sagt samma sak två gånger, och prisskillnaden är för liten för att motivera den mindre. Väljer du Witt tar du 16-tumsmodellen.",
  },
  {
    brand: "Ooni",
    name: "Karu 2 Pro",
    approxPrice: 6990,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/ooni/ooni-karu-2-pro-pizzaugn-16/?variantId=644219-01",
    reason:
      "Storebror till vår vinnare: samma glasdörr och samma bränsleflexibilitet, men 16 tum i stället för 12 och 6 990 kronor i stället för 3 499. Den är en utmärkt ugn och hade platsat, men gasbrännaren kostar ytterligare cirka 1 200 kronor och totalen på drygt 8 000 hamnar då i samma klass som Koda 2 Max, som gräddar två pizzor samtidigt. Vill du ha ved och 16 tum är det här ändå rätt ugn.",
  },
  {
    brand: "Gozney",
    name: "Dome Gen 2",
    approxPrice: 23999,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/gozney-dome-gen-2-pizzaugn-svart_78548/",
    reason:
      "Faller på avgränsningen och inte på kvaliteten. 23 999 kronor och en vikt som gör den till en fast installation snarare än en apparat, alltså en annan produkt för en annan köpare. Stiftung Warentest beskriver föregångaren som testets dyraste ugn men också den mest mångsidiga: bröd, kyckling och rökt kött utöver pizza. Sidan rankar fristående ugnar under 9 000 kronor.",
  },
  {
    brand: "Clementi",
    name: "Pulcinella vedeldad 60 × 60 cm",
    approxPrice: 25490,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/clementi-pulcinella-vedeldad-pizzaugn-60x60-cm_46045/",
    reason:
      "En italiensk vedeldad ugn på 25 490 kronor, alltså tolv gånger den billigaste här. Den murade eller vagnsmonterade klassen köps av någon som bygger en uteplats runt ugnen, inte av någon som jämför pizzaugnar. Den hör hemma i en egen jämförelse som vi inte byggt.",
  },
  {
    brand: "Wilfa",
    name: "Crust PO2B-E2200",
    approxPrice: 2690,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/wilfa-po2b-e2200-elektrisk-pizzaugn_77827/",
    reason:
      "Elektrisk bänkugn på 2 690 kronor, alltså 590 kronor dyrare än Ariete Da Gennaro som gör 430 grader. tek.no har provat Wilfas pizzaugnar i 13 och 16 tum och gav dem 7,5 och 6,5 av 10, deras svagaste betyg bland de dyrare modellerna, men den här är en annan modell och de talen gäller inte den. Vi har inte kunnat belägga vad Crust når för temperatur hos Wilfa själva, och rankar därför inte in den.",
  },
  {
    brand: "Panetti",
    name: "Pizzetta Primo",
    approxPrice: 5299,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/panetti-pizzetta-primo-elektrisk-pizzaugn_64006/",
    reason:
      "Elektrisk ugn på 5 299 kronor från ett norskt märke som marknadsförs tungt i Norden. Den ligger mellan Ariete på 2 100 och Sage på 6 999 utan att erbjuda något de två inte gör, och ingen oberoende provning har mätt den. Är budgeten 5 000 kronor för en elugn är Ariete billigare och Sage bättre.",
  },
  {
    brand: "Cozze",
    name: "17\" Classic gasol",
    approxPrice: 3495,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Grill-tillbehoer/cozze-17-pizzaugn-CLASSIC-gas-30-mbar/3370317",
    reason:
      "Dansk gasolugn som tek.no provat i två utföranden och gav 7,5 för 13-tumsmodellen och 7,0 för 17-tumsversionen med roterbar sten. Den säljs i Sverige, men inte hos någon av butikerna sidans övriga priser är lästa hos, och tek.nos kritik gällde just att den roterande varianten inte tillför nog för prisskillnaden. Den som vill ha störst sten för minst pengar bör ändå titta på den.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const PIZZAUGN_FAQ = [
  {
    question: "Blir en pizzaugn verkligen 500 grader?",
    answer:
      "Inte över hela stenen, och det är den viktigaste sak du kan veta innan du köper. Nästan varje tillverkare anger 500 grader, men talet gäller den varmaste punkten, alltså längst bak där flamman sitter. Norska tek.no har mätt stentemperaturen på tre punkter efter 30 minuters uppvärmning och funnit stora skillnader: Ooni Koda 12 låg på 480 grader längst bak och 220 längst fram, alltså 260 graders skillnad på samma sten. Ooni Koda 16 mättes till 500 bak, 420 i mitten och 310 fram, och Gozney Roccbox till 470 mot 270. Ooni bekräftar bilden själva när de beskriver sin andra generation: den nya brännaren sänker svängningarna i stentemperatur från 175 grader till 85. Det praktiska problemet är att pizzan läggs in framtill, alltså på den kallaste delen, vilket är varför du måste vrida den flera gånger under gräddningen. En ugn med roterande sten eller med dörr minskar skillnaden kraftigt.",
  },
  {
    question: "Gasol, ved eller el, vilket ska jag välja?",
    answer:
      "Gasol om du vill grädda ofta, ved om smaken är poängen, el om du bor i lägenhet. Gasol tänds med en ratt, når 500 grader på 15 till 30 minuter och släcks lika enkelt, vilket gör att ugnen används på en vardag och inte bara vid planerade tillfällen. Ved och kol ger en röksmak som ingen gasolugn kan härma, men kräver att du matar elden medan du gräddar och att du har torr lövved hemma. El är det enda alternativet där öppen låga inte är tillåten, alltså på de flesta balkonger och inomhus, och de elektriska ugnarna når 370 till 450 grader mot gasolens 500. Flera ugnar klarar två bränslen: Ooni Karu 2 går på ved och kol med en gasbrännare som tillbehör, och Gozney Roccbox tvärtom, gasol som standard med vedbrännare som tillval. Räkna in tillbehörets pris, det ligger runt 1 000 kronor.",
  },
  {
    question: "Hur stor pizzaugn behöver jag?",
    answer:
      "Utgå från hur många som ska äta samtidigt, inte från hur många som bor i hushållet. En ugn på 12 tum tar en pizza i taget och gräddar den på 60 till 90 sekunder, så två personer får sina pizzor med ett par minuters mellanrum, vilket fungerar utmärkt. Fyra personer som ska äta samtidigt får vänta i tur och ordning, och då blir uppvärmningen mellan pizzorna flaskhalsen snarare än gräddningen. En 16-tumspizza har nästan dubbelt så stor yta som en 12-tums, alltså två portioner, och storleken avgör också vad ugnen duger till utöver pizza: en hel kyckling eller ett bröd kräver 16 tum. Störst i den här jämförelsen är Ooni Koda 2 Max med en bakyta på 24 tum som tar två pizzor på 12 tum bredvid varandra, men den väger 43 kilo och kostar 8 990 kronor. Prisskillnaden mellan 12 och 16 tum ligger annars kring 1 800 kronor.",
  },
  {
    question: "Vad gör en roterande pizzasten för nytta?",
    answer:
      "Den tar bort behovet av att vrida pizzan för hand, vilket är kategorins vanligaste orsak till misslyckade pizzor. I en vanlig pizzaugn är stenen mycket varmare baktill än framtill, så botten bränns i ena änden medan den andra fortfarande är blek om du låter pizzan ligga still. Lösningen i en fast ugn är att vrida den tre eller fyra gånger med en spade under de 90 sekunder gräddningen tar, vilket kräver både verktyg och vana. Med roterande sten sköter ugnen det åt dig. Witt Piccolo Rotante är den enda ugnen i den här jämförelsen med rotation, och tek.no mätte 400 till 410 grader över stenen efter 15 minuter, alltså jämnt. Ett förbehåll är värt att känna till: tek.no påpekar att stenen måste rotera även under uppvärmningen, annars blir innerkanten 500 grader och ytterkanten omkring 300. Det står inte på kartongen.",
  },
  {
    question: "Kan jag ha en pizzaugn på balkongen?",
    answer:
      "Bara om den går på el, och kontrollera reglerna med föreningen först. Gasol och ved innebär öppen låga, och många bostadsrättsföreningar och hyresvärdar förbjuder det på balkong helt, dels av brandrisk och dels för att en pizzaugn avger mycket värme mot fasaden ovanför. En elektrisk pizzaugn har ingen låga och kan i de flesta fall användas där en vanlig köksapparat får användas. Två varianter finns: Ariete Da Gennaro och Sage Pizzaiolo är gjorda för inomhusbruk och kan alltså stå på köksbänken eller inne, medan Ninja Artisan går på el men enligt tillverkaren bara får användas utomhus, vilket betyder att du behöver ett eluttag ute. Ooni Volt 2 fungerar både inne och ute. Räkna med att en elugn når 370 till 450 grader mot gasolens 500, vilket ger en något mindre bubblig skorpa men fullt användbar pizza.",
  },
  {
    question: "Hur lång tid tar det att värma upp en pizzaugn?",
    answer:
      "Mellan 12 och 30 minuter, och tillverkarens uppgift stämmer inte alltid. De elektriska går snabbast: Ooni Volt 2 anges klar på 12 minuter och Ooni Karu 2 når 450 grader på så lite som 15. Bland gasolugnarna anger Witt Piccolo Rotante 15 minuter och Ooni Koda 2 Max 30 minuter till 400 grader. tek.no har dock mätt att flera ugnar behöver längre tid än vad som anges: Witt Etna Fermo Rotante anges nå 500 grader på 15 minuter men låg på 400 efter 30, och Ooni Koda 16 tog drygt 30 minuter att nå 500 grader. Räkna därför med en halvtimme för en gasolugn om du vill vara säker på att stenen är genomvarm, och kom ihåg att det är stenen och inte luften som avgör. En sten på 20 millimeter tar längre tid att ladda än en på 10, men håller värmen bättre mellan pizzorna.",
  },
  {
    question: "Behöver jag en pizzaugn om jag redan har en grill?",
    answer:
      "Ja, om du vill ha napolitansk pizza, annars troligen inte. Skillnaden ligger i temperaturen: en kolgrill eller gasolgrill klarar sällan mer än 275 till 350 grader, och en vanlig hushållsugn stannar oftast vid 250 till 300. Napolitansk pizza gräddas på 60 till 90 sekunder vid 400 till 500 grader, och det är den snabbheten som ger den elastiska degen med brända blåsor på kanten samtidigt som ingredienserna ovanpå förblir färska i smaken. Vid 300 grader tar samma pizza fem till åtta minuter, och då hinner degen torka ut och osten bli oljig. tek.no mätte en Weber Spirit 300 med pizzasten till 370 grader, vilket är bättre än väntat men fortfarande under bandet. Med en pizzasten i grillen får du alltså en klart bättre pizza än i ugnen, men inte en pizzeriapizza. Det är den skillnaden en pizzaugn köper dig.",
  },
  {
    question: "Vad kostar det att använda en pizzaugn?",
    answer:
      "Räkna med ungefär 5 till 15 kronor per pizzakväll i bränsle, alltså mindre än de flesta tror. En gasolugn på 4 till 7 kilowatt drar ungefär 0,3 till 0,5 kilo gasol per timme, och en gasolflaska på 5 kilo kostar omkring 250 kronor plus flaskdeposition, vilket räcker till ungefär tio pizzakvällar. Ved och pellets ligger i samma härad: tek.no använde omkring 800 gram pellets för att nå maxtemperatur och grädda tre pizzor i en Ooni Fyra. En elektrisk ugn på 1 760 till 1 800 watt som går i en timme drar knappt 1,8 kilowattimmar, alltså under 5 kronor vid ett normalt elpris. Den större kostnaden är därför ugnen själv och tillbehören: en ordentlig pizzaspade, en infraröd termometer för att läsa stentemperaturen och ett skyddsöverdrag kostar tillsammans 800 till 1 500 kronor och är i praktiken nödvändiga.",
  },
];

export const PIZZAUGN_PRODUCTS = resolveProducts(PIZZAUGN, SEEDS);

export const PIZZAUGN_CONSIDERED: ConsideredProduct[] = CONSIDERED;
