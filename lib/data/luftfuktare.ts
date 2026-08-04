import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { LUFTFUKTARE } from "@/lib/test-pages";

/**
 * Luftfuktare. Underlag i .agent/research/luftfuktare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, GTIN, teknik, kapacitet i
 * ml/h, tankvolym, rekommenderad yta, ljudnivå, effekt och om målfukten går
 * att ställa. Allt läst 2026-08-03 på butikens egen produktsida, i deras
 * strukturerade data eller i produktbeskrivningen.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte mätt luftfuktighet,
 * inte odlat bakterier och inte provat någon apparat.
 *
 * ## Sidans fynd
 *
 * SweSIAQ, svenska föreningen för inomhusmiljö, skriver att man **i allmänhet
 * bör undvika konstgjord befuktning av luften**. Folkhälsomyndighetens
 * allmänna råd FoHMFS 2014:14 namnger 45 % relativ luftfuktighet vid 21 °C som
 * en indikation som kan få tillsynsmyndigheten att kräva undersökning av
 * bostaden. Det ligger mitt i det spann varje butik marknadsför.
 *
 * ⚠️ **Var noga med vad det är.** 45 % är ingen hälsogräns och inget
 * gränsvärde, och allmänna råd är rekommendationer och inte bindande regler.
 * Filen påstår aldrig att en luftfuktare är olaglig eller att 46 % är farligt.
 *
 * ## Teknikuppgiften avgjorde rankningen, och den stod i butikstexten
 *
 * Två produkter hamnade långt från där produktnamnet antydde, för att
 * beskrivningen sa något annat än specifikationstabellen:
 *
 * - **Xiaomi Smart Humidifier Pro** heter varken evaporativ eller förångning, men Kjell skriver "fuktar luften genom naturlig avdunstning – utan synlig dimma eller vattenånga". Den finfördelar alltså inte tankinnehållet, och tvättbart filter betyder ingen förbrukningsdel. Den gick från botten till andra plats.
 * - **Wilfa Dew TX450** kostar 1 999 kr, lika mycket som testvinnaren, men Kjell skriver "en modern ultrasonisk luftfuktare". Den gick från mitten till sist.
 *
 * Ingen av uppgifterna går att gissa ur namnet. Båda står i klartext hos
 * butiken, och ingen av de sju svenska jämförelser vi läste nämner dem.
 *
 * ## Om testomdöme
 *
 * Det finns inget sådant kriterium här, och det är kontrollerat produkt för
 * produkt. Av de tolv rankade täcks två av oberoende test: Philips 5000 av
 * Ljud & Bild 2025-02-10 och Beurer LB 300 Plus av Stiftung Warentest
 * 2025-09-17. Tio är oprovade. Ett kriterium som tio av tolv inte kan få poäng
 * på mäter vem som blivit provad, inte vad produkten går för.
 *
 * ## Wilfa Lotus kom in i efterhand
 *
 * Den låg först bland de övervägda med lagerstatus som skäl. Efter
 * användarbeslut 2026-08-03 rankas slutsålda produkter ändå: rankningen svarar
 * på vilken produkt som är bäst, inte på vad en butik råkar ha på hyllan en
 * given dag. Ingen lagerstatus anges längre någonstans på sidan.
 */

export const PRICE_CHECKED = "2026-08-03";

const KJELL = "Kjell & Company";
const KJELL_BASE =
  "https://www.kjell.com/se/produkter/hem-fritid/inomhusklimat-uppvarmning/luftfuktare";

const APOTEA = "Apotea";
const APOTEA_BASE = "https://www.apotea.se";

const CLAS_OHLSON = "Clas Ohlson";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "philips-5000-hu5710",
    name: "5000 Series HU5710/00 luftfuktare",
    shortName: "Philips 5000",
    brand: "Philips",
    image: productImage(LUFTFUKTARE.slug, "philips-5000-hu5710"),
    tagline: "Enda apparaten där du kan ställa målfukten under 45 procent.",
    scores: {
      fuktreglering: 5,
      hygien: 5,
      kapacitet: 5,
      drift: 3,
      prisvarde: 3.5,
    },
    price: 1999,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Philips-5000-Series-HU5710-00-luftfuktare,-56-m2/p/36-312",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 14 },
    award: "winner",
    superlative: "Ställbar 30 till 70 procent i femsteg",
    pros: [
      "Målfukten går att ställa från 30 till 70 procent i steg om fem",
      "Förångning, som inte finfördelar tankens innehåll ut i rummet",
      "56 m² och 400 ml/h är den största kapaciteten någon av de tolv anger",
      "12 till 34 dB, tystast av alla tolv på lägsta läget",
    ],
    cons: [
      "Dyrast av de tolv apparaterna, tillsammans med Wilfa Dew",
      "Filtret är en förbrukningsdel som måste bytas",
      'Butiken kallar den "Bäst i test" utan att testet utsett någon vinnare',
    ],
    specs: [
      { label: "Pris", value: "1 999 kr", highlight: true },
      { label: "Ställbar fukt", value: "30–70 %, steg om 5", highlight: true },
      { label: "Teknik", value: "Förångning, NanoCloud", highlight: true },
      { label: "Kapacitet", value: "400 ml/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 56 m²", highlight: true },
      { label: "Tank", value: "4,5 liter" },
      { label: "Drifttid", value: "Upp till 37 h" },
      { label: "Ljudnivå", value: "12–34 dB" },
      { label: "App", value: "Air+" },
    ],
    verdict:
      "Du kan ställa målfukten mellan 30 och 70 procent i steg om fem. Ingen annan här kommer i närheten.\n\nTvå av tolv har ingen fuktreglering alls, fyra har effektlägen utan målnivå, och Beurers båda förångare kan bara välja mellan 40, 50 och 60 procent. Här kan du ställa 40 och stanna där, vilket spelar roll när Folkhälsomyndigheten namnger 45 procent vid 21 grader som en indikation för att kräva undersökning av bostaden.\n\nTekniken är den andra halvan. Philips kallar den NanoCloud, men det den gör är förångning: luft blåses genom ett fuktigt filter och vattnet avdunstar. Mineraler och mikrober stannar kvar i filtret i stället för att skickas ut i rummet. Den skillnaden mätte ÖKO-TEST när fem av åtta apparater spred mellan 400 000 och 60 miljoner kolonibildande enheter i timmen, och ultraljuden var de utpekade.\n\nKapaciteten är störst av apparaterna i jämförelsen: 56 kvadratmeter och 400 milliliter i timmen, med 37 timmars drifttid på en tank. Ljudnivån börjar på 12 decibel, lägst av alla här.\n\nPriset är det högsta av de tolv apparaterna tillsammans med Wilfa Dew, och filtret är en förbrukningsdel: Stiftung Warentest räknade fram 13 till 247 euro om året för åtta apparater och det är just filter och vekar som gör skillnaden.\n\nOch en sak som inte påverkar betyget men som du bör veta. Clas Ohlsons produktsida inleds med orden Bäst i test och hänvisar till Ljud & Bild i februari 2025. Testet finns, datumet stämmer och Philips är med i det. Men testet utser ingen vinnare och sätter inga betyg alls. Philips omdöme där är rubricerat Funktion före stil, med Utseendet som enda minus.",
  },
  {
    id: "xiaomi-humidifier-pro",
    name: "Smart Humidifier Pro",
    shortName: "Xiaomi Pro",
    brand: "Xiaomi",
    image: productImage(LUFTFUKTARE.slug, "xiaomi-humidifier-pro"),
    tagline: "Avdunstning, tvättbart filter och 13 watt. Billigast att äga.",
    scores: {
      fuktreglering: 3.5,
      hygien: 5,
      kapacitet: 4,
      drift: 5,
      prisvarde: 4,
    },
    price: 1499,
    merchant: KJELL,
    merchantUrl: `${KJELL_BASE}/xiaomi-smart-humidifier-pro-p47222`,
    priceCheckedAt: PRICE_CHECKED,
    /* Kortad från "Tvättbart filter, alltså ingen förbrukningsdel" 2026-08-03:
       den mätte 234 px mot QuickPickPanels 222 och klipptes mitt i ordet. */
    superlative: "Tvättbart filter, inget att köpa",
    pros: [
      "Naturlig avdunstning utan synlig dimma, enligt butikens egen text",
      "Tvättbart filter med antibakteriell behandling, inget att köpa",
      "13 W är lägsta effekten av apparaterna i jämförelsen, en tjugondel av Levoits 280",
      "600 ml/h är högst av alla tolv, och tanken rymmer 5 liter",
    ],
    cons: [
      "Butiken anger ingen ställbar målfuktighet, bara appstyrning",
      "20 till 30 m² är mindre än Philips 56",
      "Inga kundomdömen alls hos butiken vi länkar till",
      "Kräver Xiaomi Home-appen för att styras",
    ],
    specs: [
      { label: "Pris", value: "1 499 kr", highlight: true },
      { label: "Ställbar fukt", value: "Anges inte", highlight: true },
      { label: "Teknik", value: "Avdunstning", highlight: true },
      { label: "Kapacitet", value: "600 ml/h", highlight: true },
      { label: "Rumsyta", value: "20–30 m²", highlight: true },
      { label: "Tank", value: "5 liter" },
      { label: "Drifttid", value: "Upp till 20 h i sovläge" },
      { label: "Ljudnivå", value: "30,7 dB sovläge, ≤55 dB max" },
      { label: "Effekt", value: "13 W" },
    ],
    verdict:
      "Kjell skriver att den fuktar luften genom naturlig avdunstning, utan synlig dimma eller vattenånga. Det är skälet till andraplatsen.\n\nDet är ingen marknadsföring utan en teknikuppgift. En apparat som låter vattnet avdunsta skickar inte ut tankens innehåll i rummet, och det var det ÖKO-TEST mätte hos ultraljuden. Ingen av de sju jämförelser vi läst nämner skillnaden.\n\nDen andra halvan är driftkostnaden, och där är den ensam bäst. **13 watt.** Levoit drar 280, mer än tjugo gånger så mycket. Och filtret är tvättbart med antibakteriell behandling, vilket betyder att det inte finns någon förbrukningsdel att köpa. Stiftung Warentest hittade 13 till 247 euro om året för åtta apparater, och skillnaden ligger nästan helt i just filter och vekar. Den här ligger i botten av det spannet.\n\n600 milliliter i timmen är högst av alla tolv, med en femlitertank.\n\nDet som håller den från förstaplatsen är regleringen. Kjell anger ingen ställbar målfuktighet, bara att den styrs via Xiaomi Home. Appen kan mycket väl ha ett målvärde, men vi skriver bara det butiken skriver, och en uppgift du inte kan kontrollera före köp får inte full poäng här. Ytan är också mindre: 20 till 30 kvadratmeter mot Philips 56.\n\nNoll kundomdömen hos Kjell, vilket är värt att väga mot Rubicsons 561.",
  },
  {
    id: "beurer-lb-300-plus",
    name: "LB 300 Plus luftfuktare",
    shortName: "Beurer LB 300 Plus",
    brand: "Beurer",
    image: productImage(LUFTFUKTARE.slug, "beurer-lb-300-plus"),
    tagline: "Den enda i rankningen som en riktig labbprovning tittat på.",
    scores: {
      fuktreglering: 4,
      hygien: 5,
      kapacitet: 4.5,
      drift: 3.5,
      prisvarde: 3.5,
    },
    price: 1599,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/beurer-lb-300-plus-luftfuktare`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Med i Stiftung Warentests provning",
    pros: [
      "Kall förångning, utan finfördelning av tankinnehållet",
      "Automatiskt läge som mäter fukten och håller 40, 50 eller 60 procent",
      "45 m² och 360-gradersdesign för jämn spridning",
      "Enda produkten i rankningen som ingick i Stiftung Warentests provning",
    ],
    cons: [
      "Målfukten går bara att välja i tre fasta steg, inte fritt",
      "Lägsta valbara nivå är 40 procent, näst lägsta 50",
      "Filter eller veke är en förbrukningsdel",
      "Inga kundomdömen hos butiken vi länkar till",
    ],
    specs: [
      { label: "Pris", value: "1 599 kr", highlight: true },
      { label: "Ställbar fukt", value: "40, 50 eller 60 %", highlight: true },
      { label: "Teknik", value: "Kall förångning", highlight: true },
      { label: "Rumsyta", value: "Upp till 45 m²", highlight: true },
      { label: "Fläktlägen", value: "Tre hastigheter" },
      { label: "Reglering", value: "Automatiskt läge med fuktmätning" },
      { label: "GTIN", value: "4211125100674" },
      { label: "Garanti", value: "3 år" },
      { label: "Vikt", value: "2,92 kg" },
      { label: "Kapacitet", value: "Upp till 300 ml/h" },
    ],
    verdict:
      "Stiftung Warentest har haft den här i händerna. Ingen annan av luftfuktarna i jämförelsen.\n\nStiftung Warentest provade åtta luftfuktare i september 2025 under rubriken Nein zur Keimschleuder, alltså nej till bakteriespridaren. Fem var förångare och tre var ultraljud. LB 300 Plus var en av de åtta. Vi publicerar inte deras betyg, eftersom det ligger bakom betalvägg och vi inte har läst det i original, men att den ingick är i sig mer än de övriga elva kan säga.\n\nTekniken är kall förångning. Apotea beskriver det som ett intelligent automatiskt läge som mäter luftfuktigheten och justerar effekten till den önskade nivån, med tre fläkthastigheter och en 360-gradersdesign som fördelar fukten jämnt. Upp till 45 kvadratmeter.\n\nHaken är regleringen, och det är därför den inte vinner. Du kan välja 40, 50 eller 60 procent. Tre knappar, inget däremellan. Folkhälsomyndighetens indikation ligger på 45 vid 21 grader, vilket betyder att du i praktiken har ett val: 40 och ligga under, eller 50 och ligga över. Philips låter dig ställa 45 exakt, eller 30, eller vad du nu mätt att du behöver.\n\nApotea publicerar riktiga GTIN-koder, vilket Kjell inte gör. Det är ingen produktegenskap, men det gör produkten lättare att prisjämföra hos andra butiker.",
  },
  {
    id: "beurer-lb-200",
    name: "LB 200 luftfuktare",
    shortName: "Beurer LB 200",
    brand: "Beurer",
    image: productImage(LUFTFUKTARE.slug, "beurer-lb-200"),
    tagline: "Samma teknik som storasystern, 17 watt och 40 kronor billigare.",
    scores: {
      fuktreglering: 4,
      hygien: 5,
      kapacitet: 3.5,
      drift: 4,
      prisvarde: 3.5,
    },
    price: 1559,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/beurer-lb-200-luftfuktare`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "17 watt, näst lägst av tolv",
    pros: [
      "Kall förångning, samma princip som den dyrare LB 300 Plus",
      "Automatiskt läge som håller 40, 50 eller 60 procent",
      "17 W, näst lägst effekt av alla apparaterna",
      "Särskilt tyst nattläge och digital fuktighetsindikator",
    ],
    cons: [
      "30 m² mot LB 300 Plus 45, för 40 kronor mindre",
      "Samma begränsning till tre fasta nivåer",
      "Utbytbart filter som är en förbrukningsdel",
      "Inga kundomdömen hos butiken vi länkar till",
    ],
    specs: [
      { label: "Pris", value: "1 559 kr", highlight: true },
      { label: "Ställbar fukt", value: "40, 50 eller 60 %", highlight: true },
      { label: "Teknik", value: "Kall förångning", highlight: true },
      { label: "Rumsyta", value: "Upp till 30 m²", highlight: true },
      { label: "Effekt", value: "17 W", highlight: true },
      { label: "Lägen", value: "Tre nivåer plus nattläge" },
      { label: "GTIN", value: "4211125100698" },
      { label: "Garanti", value: "3 år" },
      { label: "Vikt", value: "2,87 kg" },
      { label: "Tank", value: "3 liter" },
      { label: "Kapacitet", value: "Upp till 200 ml/h" },
    ],
    verdict:
      "Skillnaden mot LB 300 Plus är mindre än prislappen antyder.\n\nSamma teknik: kall förångning, utan finfördelning av tankens innehåll. Samma reglering: intelligent automatiskt läge som mäter fukten och håller 40, 50 eller 60 procent. Samma tysta nattläge och digital fuktighetsindikator.\n\nSkillnaden är ytan. 30 kvadratmeter mot 45. För det betalar du 40 kronor mindre, vilket är en dålig affär om rummet är stort och en helt rimlig affär om det inte är det. Har du ett sovrum eller ett vardagsrum under 30 kvadrat är det här samma apparat till nästan samma pris med kapacitet du ändå inte skulle använda.\n\nEffekten är värd en rad för sig: 17 watt. Bara Xiaomis 13 är lägre, och Levoit drar 280. Över en vinter med kontinuerlig drift är det skillnaden mellan 30 kronor och 500.\n\nSamma invändning som mot systern gäller här. Tre fasta nivåer betyder att du väljer mellan 40 och 50, och Folkhälsomyndighetens indikation ligger på 45. Du kan alltså inte sikta på den.",
  },
  {
    id: "cleverio-am300",
    name: "AM300 Kraftfull Luftfuktare",
    shortName: "Cleverio AM300",
    brand: "Cleverio",
    image: productImage(LUFTFUKTARE.slug, "cleverio-am300"),
    tagline: "Enda som anger rummet i kubikmeter i stället för kvadrat.",
    scores: {
      fuktreglering: 4.5,
      hygien: 4.5,
      kapacitet: 3.5,
      drift: 2.5,
      prisvarde: 4.5,
    },
    price: 999,
    merchant: KJELL,
    merchantUrl: `${KJELL_BASE}/cleverio-am300-kraftfull-luftfuktare-p47167`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 154 },
    superlative: "Stänger av sig vid önskad nivå",
    pros: [
      "Stänger av sig automatiskt när önskad luftfuktighet är uppnådd",
      "Varm ånga innebär kokat vatten, utan kall dimma från tanken",
      "Anger rummet i kubikmeter, vilket är ärligare än en yta",
      "999 kr med 154 kundomdömen och 4,0 i snitt",
    ],
    cons: [
      "Kokande vatten drar mer el, och Kjell anger ingen effekt alls",
      "30 till 40 m³ motsvarar bara omkring 12 till 16 m² golvyta",
      "Kräver appen Smart Life för fjärrstyrning",
      "Varm ånga är het och bör inte stå åtkomligt för små barn",
    ],
    specs: [
      { label: "Pris", value: "999 kr", highlight: true },
      { label: "Ställbar fukt", value: "Ja, med avstängning", highlight: true },
      { label: "Teknik", value: "Varm eller kall ånga", highlight: true },
      { label: "Kapacitet", value: "400 ml/h varm, 300 kall", highlight: true },
      { label: "Rumsyta", value: "30–40 m³", highlight: true },
      { label: "Tank", value: "4 liter, räcker 10–40 h" },
      { label: "Ljudnivå", value: "Under 25 dB" },
      { label: "Effekt", value: "Anges inte" },
    ],
    verdict:
      "**Den anger rummet i kubikmeter.** Ingen av de elva andra gör det.\n\n30 till 40 kubikmeter. Alla andra skriver kvadratmeter, vilket förutsätter en takhöjd som aldrig skrivs ut. Med 2,5 meter i tak motsvarar Cleverios tal ungefär 12 till 16 kvadratmeter golvyta, vilket är ett sovrum. Det är mindre än det låter, och det är just därför de andras kvadratmeter är svåra att lita på.\n\nBara Philips reglerar bättre. Kjell skriver: automatisk avstängning när önskad luftfuktighet är uppnådd, och tydlig display för inställningar samt önskad luftfuktighet. Du sätter alltså ett mål och apparaten slutar när den nått det, vilket är precis vad man vill ha när risken ligger i att fukta för mycket.\n\nVarm ånga betyder kokat vatten. Mikroberna i tanken dör av värmen på vägen ut, vilket gör den hygieniskt bättre än varje ultraljudsmodell här. Kall ånga finns också som läge, och då gäller inte det.\n\nPriset är rätt: 999 kronor med 154 omdömen och 4,0 i snitt, det näst bästa kundunderlaget av alla apparaterna.\n\nDet som drar ner är driften. Att koka vatten kostar el, och Kjell anger ingen effekt över huvud taget, vilket gör att du inte kan räkna på det före köp. Och het ånga är het, vilket är värt att tänka på i ett barnrum.",
  },
  {
    id: "levoit-oasismist-450s",
    name: "OasisMist 450S Smart luftfuktare",
    shortName: "Levoit OasisMist 450S",
    brand: "Levoit",
    image: productImage(LUFTFUKTARE.slug, "levoit-oasismist-450s"),
    tagline: "Bäst reglering i appen, sämst siffra på elmätaren.",
    scores: {
      fuktreglering: 4.5,
      hygien: 2.5,
      kapacitet: 4.5,
      drift: 2.5,
      prisvarde: 3,
    },
    price: 1590,
    merchant: KJELL,
    merchantUrl: `${KJELL_BASE}/levoit-oasismist-450s-smart-luftfuktare-p47258`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Ställbar målfukt per rum och säsong",
    pros: [
      "Inbyggd fuktsensor, och önskad luftfuktighet ställs in i appen",
      "Både varm och kall dimma, upp till 550 respektive 300 ml/h",
      "20 till 40 m² och 4,5-liters tank som fylls uppifrån",
      "Under 26 dB på lägsta kalla läget",
    ],
    cons: [
      "280 W är den högsta effekten av de tolv, tjugo gånger Xiaomis 13",
      "Kall dimma innebär att tankens innehåll finfördelas ut i rummet",
      "Ljud och kapacitet i toppklass bara på det varma läget, som drar mest",
      "Inga kundomdömen hos butiken vi länkar till",
    ],
    specs: [
      { label: "Pris", value: "1 590 kr", highlight: true },
      { label: "Ställbar fukt", value: "Ja, i appen", highlight: true },
      { label: "Teknik", value: "Varm och kall dimma", highlight: true },
      { label: "Kapacitet", value: "550 ml/h varm, 300 kall", highlight: true },
      { label: "Rumsyta", value: "20–40 m²", highlight: true },
      { label: "Tank", value: "4,5 liter, upp till 45 h" },
      { label: "Ljudnivå", value: "<26 dB kall, <41 dB varm" },
      { label: "Effekt", value: "280 W" },
    ],
    verdict:
      "Den bästa regleringen av apparaterna i jämförelsen sitter i den apparat som är dyrast att äga.\n\nKjell skriver att den inbyggda fuktsensorn mäter rummets luftfuktighet och att du i appen kan ställa in önskad luftfuktighet efter rum och säsong, samt skapa scheman. Det är precis rätt funktion för den här kategorin, och bara Philips gör det bättre genom att låta dig göra det på apparaten själv.\n\nSedan kommer effekten. **280 watt.** Xiaomi drar 13, Beurer LB 200 drar 17. Går den kontinuerligt under en eldningssäsong är skillnaden mot Xiaomi i storleksordningen ett par tusen kronor. Levoit anger visserligen 280 som toppeffekt och den siffran gäller det varma läget, men det är också det läget som ger den kapacitet de marknadsför.\n\nDet andra problemet är tekniken. Kall dimma är ultraljud, metoden som slår sönder vattnet och skickar med allt som finns i det. Det var de apparaterna ÖKO-TEST mätte upp till 60 miljoner kolonibildande enheter i timmen från. Varmt läge kokar och är bättre, men då är du tillbaka på 280 watt.\n\nDen som vill ha den här ska veta vad köpet innebär: en välreglerad, tyst och rymlig apparat med den högsta driftkostnaden av apparaterna i jämförelsen och en teknik som kräver att du faktiskt byter vatten dagligen.",
  },
  {
    id: "beurer-lb-45",
    name: "Luftfuktare LB 45",
    shortName: "Beurer LB 45",
    brand: "Beurer",
    image: productImage(LUFTFUKTARE.slug, "beurer-lb-45"),
    tagline: "Billigaste vettiga köpet, om du sköter den varje dag.",
    scores: {
      fuktreglering: 2,
      hygien: 2.5,
      kapacitet: 3.5,
      drift: 4,
      prisvarde: 4.5,
    },
    price: 546,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/beurer-luftfuktare-lb-45`,
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "546 kr för 30 m² och fyra liter",
    pros: [
      "546 kronor för 30 m², mest kapacitet per krona av de tolv",
      "Fyra liters tank med synlig vattennivå",
      "Justerbar ångmängd och uttalat tyst för sovrum",
      "Publicerat GTIN gör den lätt att prisjämföra",
    ],
    cons: [
      "Ultraljud, som finfördelar tankens innehåll ut i rummet",
      "Ingen ställbar målfuktighet, bara ångmängd",
      "Utan hygrostat kan du inte se när du passerat 45 procent",
      "Inga kundomdömen hos butiken vi länkar till",
    ],
    specs: [
      { label: "Pris", value: "546 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej, bara ångmängd", highlight: true },
      { label: "Teknik", value: "Ultraljud", highlight: true },
      { label: "Kapacitet", value: "300 ml/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 30 m²", highlight: true },
      { label: "Tank", value: "4 liter med synlig nivå" },
      { label: "GTIN", value: "4211125681074" },
      { label: "Garanti", value: "3 år" },
      { label: "Vikt", value: "1,54 kg" },
    ],
    verdict:
      "Ska du lägga under 600 kronor är det här apparaten.\n\nFör 546 kronor får du fyra liters tank, 300 milliliter i timmen och 30 kvadratmeter. Levoit tar 1 590 för 20 till 40 kvadrat. Ren kapacitet per krona är det här det bästa köpet av apparaterna i jämförelsen, med god marginal, och Apotea publicerar dessutom GTIN så du kan kontrollera priset någon annanstans.\n\nInvändningarna är samma som mot alla billiga luftfuktare, och de är verkliga.\n\nTekniken är ultraljud. Vattnet slås sönder till dimma och allt som finns i tanken följer med ut. ÖKO-TEST mätte fem av åtta apparater till mellan 400 000 och drygt 60 miljoner kolonibildande enheter i timmen, mot 100 till 500 per kubikmeter i normal inomhusluft, och det var ultraljuden som pekades ut. Beurer har en silverstav som motåtgärd, vilket är mer än de flesta i prisklassen gör, men det är inte samma sak som att inte finfördela vattnet alls.\n\nDen andra är regleringen. Du kan ställa ångmängden men inte en målfuktighet. Apparaten vet inte hur fuktigt rummet är och stannar aldrig av sig själv. Vill du hålla dig under 45 procent behöver du en egen hygrometer och en klocka.\n\nKöp den här om du sköter den. Byt vatten dagligen, torka tanken, och skaffa en hygrometer för hundra kronor. Gör du inte det är en apparat som står ostädad sämre än ingen apparat alls.",
  },
  {
    id: "beurer-lb-37",
    name: "Luftfuktare LB 37",
    shortName: "Beurer LB 37",
    brand: "Beurer",
    image: productImage(LUFTFUKTARE.slug, "beurer-lb-37"),
    tagline: "Samma apparat som LB 45, mindre av allting, 27 kronor billigare.",
    scores: {
      fuktreglering: 2,
      hygien: 2.5,
      kapacitet: 2.5,
      drift: 4,
      prisvarde: 4.5,
    },
    price: 519,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/beurer-luftfuktare-lb-37`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Lägst pris med publicerat GTIN",
    pros: [
      "519 kronor, lägsta priset på en apparat med publicerad specifikation",
      "20 W och automatisk avstängning när tanken är tom",
      "Rengöringsborste ingår, vilket få i prisklassen skickar med",
      "Nattläge för sovrum",
    ],
    cons: [
      "Tvålitertank och 200 ml/h, halva LB 45 för 27 kronor mindre",
      "Bara 20 m², minsta ytan i hela rankningen",
      "Ultraljud utan hygrostat, samma två problem som LB 45",
      "Inga kundomdömen hos butiken vi länkar till",
    ],
    specs: [
      { label: "Pris", value: "519 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej", highlight: true },
      { label: "Teknik", value: "Ultraljud", highlight: true },
      { label: "Kapacitet", value: "200 ml/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 20 m²", highlight: true },
      { label: "Tank", value: "2 liter" },
      { label: "Effekt", value: "20 W" },
      { label: "GTIN", value: "4211125681135" },
      { label: "Garanti", value: "3 år" },
    ],
    verdict:
      "**27 kronor är fel ställe att spara.**\n\nLB 37 kostar 519 kronor, LB 45 kostar 546. För de 27 kronorna får du dubbla tanken, 4 liter mot 2, halva kapaciteten till, 300 milliliter i timmen mot 200, och ett 50 procent större rum, 30 kvadratmeter mot 20. Det är samma tillverkare, samma teknik och samma silverstav.\n\nDet enda LB 37 gör bättre är att den skickar med en rengöringsborste, vilket är mer relevant än det låter, och att 20 watt är marginellt mindre än systerns.\n\nI övrigt gäller allt som står under LB 45. Ultraljud betyder att tankens innehåll finfördelas ut i rummet, och utan hygrostat vet apparaten inte hur fuktigt det är och stannar aldrig själv.\n\nKöp den bara om rummet verkligen är litet och du vet att du aldrig kommer flytta apparaten.",
  },
  {
    id: "wilfa-lotus-hu4-4w",
    name: "Lotus HU4-4W luftfuktare",
    shortName: "Wilfa Lotus",
    brand: "Wilfa",
    image: productImage(LUFTFUKTARE.slug, "wilfa-lotus-hu4-4w"),
    tagline: "Trettio kronor mer än Beurer LB 45, och halva tanken.",
    scores: {
      fuktreglering: 2,
      hygien: 2,
      kapacitet: 3,
      drift: 4,
      prisvarde: 3,
    },
    price: 549,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/wilfa-luftfuktare-lotus-hu4-4w`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Fem års garanti, längst av alla",
    pros: [
      "Fem års garanti, vilket är längre än någon annan här anger",
      "20 W, i nivå med de snålaste här",
      "30 m² på 549 kronor, samma yta som Beurer LB 45",
      "Publicerat GTIN gör den lätt att prisjämföra",
    ],
    cons: [
      "Ultraljud utan silverstav eller annan angiven motåtgärd",
      'Apotea skriver "justerbar fuktighetsnivå" men anger varken hygrostat, målvärde i procent eller display',
      "Tvålitertank och 200 ml/h, halva Beurer LB 45 för 3 kronor mer",
      "Doftfunktion, ytterligare något att låta stå i vattnet",
      "Inga kundomdömen hos butiken vi länkar till",
    ],
    specs: [
      { label: "Pris", value: "549 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej, bara ångmängd", highlight: true },
      { label: "Teknik", value: "Ultraljud, kall ånga", highlight: true },
      { label: "Kapacitet", value: "200 ml/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 30 m²", highlight: true },
      { label: "Tank", value: "2 liter, räcker cirka 10 h" },
      { label: "Effekt", value: "20 W" },
      { label: "Garanti", value: "5 år" },
      { label: "GTIN", value: "7044876012234" },
    ],
    verdict:
      "Fem års garanti, längst av alla. Den ligger ändå långt ner, och skälet är 3 kronor.\n\nBeurer LB 45 kostar 546 kronor. Den här kostar 549. För den skillnaden får du hos Beurer dubbla tanken, fyra liter mot två, och femtio procent mer kapacitet, 300 milliliter i timmen mot 200. Ytan är densamma, 30 kvadratmeter. Tekniken är densamma, ultraljud. Effekten är i praktiken densamma, 20 watt mot Beurers likaledes låga. Det finns alltså ingen egenskap där den här är den bättre affären, förutom garantin.\n\nOch garantin är verkligen ett argument. Fem år är längre än någon annan tillverkare här anger, och Apotea skriver ut det. På en produkt för 500 kronor är det ovanligt.\n\nRegleringen är den svaga punkten och kräver en förklaring, eftersom Apotea listar \"justerbar fuktighetsnivå\" bland egenskaperna. Det låter som en hygrostat. Men ingenstans på produktsidan finns ett målvärde i procent, en fuktsensor eller en display, och utan något av det kan apparaten inte veta hur fuktigt rummet är. Det som går att justera är alltså hur mycket dimma den avger, inte vilken nivå den håller. Vi betygsätter det butiken skriver, och här skriver butiken inte det som krävs.\n\nHygienen är den vanliga invändningen mot billiga ultraljudsmodeller: tankens innehåll slås sönder och skickas ut i rummet. Beurer har åtminstone en silverstav. Här anges ingen motåtgärd alls. Att den dessutom har en doftfunktion, en plats där du häller i olja, betyder en sak till som står och blir gammal i vattnet.\n\nVill du ha en liten fuktare till ett sovrum för under 600 kronor, ta Beurer LB 45. Vill du ha fem års garanti och tycker att formen är snyggare, är det här ett fullt rimligt köp, men byt vatten varje dag.",
  },
  {
    id: "vicks-sweet-dreams",
    name: "Sweet Dreams Luftfuktare",
    shortName: "Vicks Sweet Dreams",
    brand: "Vicks",
    image: productImage(LUFTFUKTARE.slug, "vicks-sweet-dreams"),
    tagline: "Nattlampa som också fuktar, och den kombinationen är problemet.",
    scores: {
      fuktreglering: 1.5,
      hygien: 2,
      kapacitet: 3.5,
      drift: 3.5,
      /* 2,5 och inte 3,0: 829 kronor för en ultraljudsfuktare helt utan
         fuktreglering är dyrare än Beurer LB 45, som gör mer för 546. Sänkt
         2026-08-03 för att skilja den från Rubicson, som annars visar
         samma betyg. */
      prisvarde: 2.5,
    },
    price: 829,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/vicks-sweet-dreams-luftfuktare`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Projicerar tre motiv i taket",
    pros: [
      "3,8 liters tank som räcker upp till 24 timmar på lägsta läget",
      "Max 40 dB och angiven för sovrum upp till 35 m²",
      "Fungerar som nattlampa med tre motiv i taket",
      "Publicerat GTIN gör den lätt att prisjämföra",
    ],
    cons: [
      "Ultraljud utan silverstav eller annan angiven motåtgärd",
      "Ingen fuktreglering alls, den går tills du stänger av den",
      "Marknadsförs för barnrum, där skötseln oftast glöms",
      "829 kronor är dyrare än Beurer LB 45 med sämre reglering",
    ],
    specs: [
      { label: "Pris", value: "829 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej", highlight: true },
      { label: "Teknik", value: "Ultraljud", highlight: true },
      { label: "Rumsyta", value: "Upp till 35 m²", highlight: true },
      { label: "Tank", value: "3,8 liter, upp till 24 h", highlight: true },
      { label: "Ljudnivå", value: "Max 40 dB" },
      { label: "Extra", value: "Projicerar tre motiv i taket" },
      { label: "GTIN", value: "4022167005755" },
    ],
    verdict:
      "En luftfuktare med projektor, marknadsförd för barnrummet. Kombinationen är den vi är mest tveksamma till.\n\nProdukten i sig är inte dålig. 3,8 liters tank, upp till 24 timmar, max 40 decibel, angiven för rum upp till 35 kvadratmeter. Apotea skriver att den kan lindra vid förkylning, torra slemhinnor och hosta, vilket är den vanligaste anledningen att någon köper en luftfuktare till ett barn.\n\nProblemet är att två brister förstärker varandra.\n\nDen har ingen fuktreglering. Ingen sensor, inget målvärde, ingen avstängning vid uppnådd nivå. Den kör tills du stänger av den eller tanken tar slut, vilket kan vara ett helt dygn. I ett stängt barnrum är det så man passerar 45 procent utan att märka det.\n\nOch den är ultraljud utan angiven motåtgärd. Beurer har åtminstone en silverstav. ÖKO-TEST mätte att fem av åtta apparater spred bakterier, ultraljuden var de utpekade, och en apparat som står tänd hela natten i ett barnrum är den plats där man minst vill ha det.\n\nDet finns dessutom en praktisk sak. En apparat som också är nattlampa står tänd varje natt, och den apparat som används mest är den som oftast glöms bort vid rengöring.\n\nVill du fukta ett barnrum är Beurer LB 45 billigare, och Cleverio AM300 för 999 kronor stänger av sig själv vid rätt nivå.",
  },
  {
    id: "rubicson-25l",
    name: "Luftfuktare med timer och stämningsbelysning 2,5 L",
    shortName: "Rubicson 2,5 L",
    brand: "Rubicson",
    image: productImage(LUFTFUKTARE.slug, "rubicson-25l"),
    tagline: "561 kundomdömen och nästan ingen specifikation.",
    scores: {
      fuktreglering: 1,
      hygien: 2,
      kapacitet: 2.5,
      drift: 4,
      prisvarde: 4.5,
    },
    price: 399.9,
    merchant: KJELL,
    merchantUrl: `${KJELL_BASE}/rubicson-luftfuktare-med-timer-och-stamningsbelysning-25-l-p47011`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 561 },
    superlative: "Lägst pris, flest omdömen",
    pros: [
      "399,90 kronor, lägsta priset av alla tolv",
      "4,5 i snitt på 561 kundomdömen, största kundunderlaget av alla tolv",
      "Ultraljud är energisnålt och tyst",
      "Justerbar belysning och timer",
    ],
    cons: [
      "Butiken anger varken kapacitet, ljudnivå, effekt eller drifttid",
      "Ingen fuktreglering, bara timer",
      "Ultraljud utan angiven motåtgärd mot bakterier",
      "Kjell hänvisar till en uppdaterad rengöringsmanual under supportfliken",
    ],
    specs: [
      { label: "Pris", value: "399,90 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej, bara timer", highlight: true },
      { label: "Teknik", value: "Ultraljud", highlight: true },
      { label: "Rumsyta", value: "Upp till 20 m²", highlight: true },
      { label: "Tank", value: "2,5 liter", highlight: true },
      { label: "Kapacitet", value: "Anges inte" },
      { label: "Ljudnivå", value: "Anges inte" },
      { label: "Effekt", value: "Anges inte" },
    ],
    verdict:
      "Mest köpt av de tolv apparaterna, och sämst beskriven.\n\n561 kundomdömen med 4,5 i snitt. Det är fler omdömen än alla de övriga tillsammans, och det säger något verkligt: folk köper den, och de flesta blir nöjda. För 399,90 kronor får du en tyst ultraljudsfuktare med timer och stämningsbelysning som gör vad den ska.\n\nMen titta på vad Kjell inte skriver. Ingen kapacitet i milliliter per timme. Ingen ljudnivå. Ingen effekt. Ingen drifttid. Fyra av de uppgifter varje annan produkt här anger saknas, och kvar står tankvolym, yta och att den är energisnål.\n\nDet betyder att du inte kan jämföra den med något. Du kan inte räkna ut om 2,5 liter räcker natten, du kan inte veta om den passar sovrummet, och du kan inte uppskatta driftkostnaden.\n\nRegleringen är den svagaste av apparaterna i jämförelsen. En timer är inte en hygrostat. Timern stänger av apparaten efter en tid, oavsett hur fuktigt rummet blivit, vilket är fel storhet: risken ligger i procenten, inte i minuterna.\n\nEn detalj till, som Kjell själva lägger in i produkttexten: en uppdaterad manual för rengöring finns under supportfliken. Att en tillverkare behöver uppdatera rengöringsanvisningen för en luftfuktare är ingen anklagelse, men det är värt att läsa innan du köper.\n\nKöp den om du vet att du ska ha den i ett litet rum, byter vatten dagligen och skaffar en egen hygrometer. Då är det 400 välanvända kronor.",
  },
  {
    id: "wilfa-dew-tx450",
    name: "Dew TX450 luftfuktare",
    shortName: "Wilfa Dew TX450",
    brand: "Wilfa",
    image: productImage(LUFTFUKTARE.slug, "wilfa-dew-tx450"),
    tagline: "Kostar lika mycket som vinnaren, och gör nästan inget av det den gör.",
    scores: {
      fuktreglering: 2.5,
      hygien: 2,
      kapacitet: 3,
      drift: 3,
      /* 1,5 och inte 2,0: den kostar lika mycket som testvinnaren och saknar
         varje egenskap denna har, och Beurer LB 45 gör mer för 546 kronor.
         Sänkt 2026-08-03 efter avläsning av den renderade tabellen, där 2,0
         gav samma betyg som Rubicson på 399,90 kronor. */
      prisvarde: 1.5,
    },
    price: 1999,
    merchant: KJELL,
    /* Suffixet -p66651 saknades, och utan det 302:ar Kjell till kategorisidan
       i stället för till produkten. Rättat 2026-08-03. */
    merchantUrl: `${KJELL_BASE}/wilfa-dew-tx450-luftfuktare-p66651`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 5 },
    superlative: "Dyrast per angiven uppgift",
    pros: [
      "450 ml/h och 4,3 liters tank, god kapacitet",
      "Wifi, app och stöd för både Google Assistant och Alexa",
      "Textilklädd design som smälter in bättre än plasten i klassen",
      "Digital kontrollpanel med tre hastighetslägen",
    ],
    cons: [
      "Ultraljud, enligt butikens egen beskrivning",
      "Inställningarna är luftfuktning, nattläge och timer, men ingen målnivå",
      "Kjell anger ingen rumsyta alls, vilket ingen annan produkt här saknar",
      "1 999 kronor, samma pris som testvinnaren",
    ],
    specs: [
      { label: "Pris", value: "1 999 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej", highlight: true },
      { label: "Teknik", value: "Ultraljud, varm och kall", highlight: true },
      { label: "Kapacitet", value: "450 ml/h", highlight: true },
      { label: "Rumsyta", value: "Anges inte", highlight: true },
      { label: "Tank", value: "4,3 liter" },
      { label: "Effekt", value: "30–110 W" },
      { label: "App", value: "Ja, med Google och Alexa" },
      { label: "Garanti", value: "5 år" },
    ],
    verdict:
      "Sist av de tolv, till exakt samma pris som vinnaren.\n\n1 999 kronor är samma pris som Philips 5000. För de pengarna får du hos Philips förångning, ställbar målfukt mellan 30 och 70 procent i femsteg, 56 kvadratmeter och 12 decibel som lägsta ljudnivå.\n\nHär får du en apparat som Kjell själva beskriver som en modern ultrasonisk luftfuktare. Ultraljud är den teknik ÖKO-TEST pekade ut när fem av åtta spred bakterier, och den kräver att du byter vatten varje dag.\n\nInställningarna listas som luftfuktning, nattläge och timer. Ingen målfuktighet, trots wifi, app och röststyrning. Du kan alltså be Alexa slå på den, men inte be den hålla 45 procent.\n\nOch en sak som är ovanlig: **Kjell anger ingen rumsyta över huvud taget.** Varje annan produkt här har ett tal för hur stort rum den passar, även Rubicson för 399 kronor. Här står bara ångkapaciteten. Du kan alltså inte avgöra före köp om den räcker till rummet du tänkt.\n\nDet finns bra saker. 450 milliliter i timmen är god kapacitet, textilklädseln är snyggare än plasten i klassen, och 4,3 liter räcker länge. Fem kundomdömen med 4,5 i snitt är ett för tunt underlag att dra slutsatser ur, men de som köpt den verkar nöjda.\n\nVi kan ändå inte rekommendera den. Inte för att den är dålig, utan för att samma pengar hos en annan butik ger dig varje egenskap den här saknar.",
  },
];

export const LUFTFUKTARE_PRODUCTS = resolveProducts(LUFTFUKTARE, SEEDS);

export const LUFTFUKTARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Stadler Form",
    name: "Oskar",
    reason:
      "En av de fem i Ljud & Bilds svenska test, och ett av de märken som brukar toppa nordiska jämförelser. Clas Ohlson skriver dock \"Produkten har utgått\" på sin produktsida, och samma sida har 4,5 i betyg på 37 omdömen som alltså inte hjälper någon som vill köpa den i dag. Vi rankar inte produkter som butiken själv säger har utgått.",
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Luftfuktare-Stadler-Form-Oskar/p/36-8097",
  },
  {
    brand: "Stadler Form",
    name: "Emma",
    reason:
      "En USB-driven reseluftfuktare för rum upp till 12 kvadratmeter som kopplas till en laptop eller en powerbank. Det är en annan produkt än de övriga, ungefär som en resestrykjärn inte hör hemma i en jämförelse av strykjärn.",
    approxPrice: 739,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/stadler-form-emma-luftfuktare-vit",
  },
  {
    brand: "Boneco",
    name: "Ultrasonic U250",
    reason:
      "Med i Stiftung Warentests provning, och Boneco är ett av Europas mest respekterade luftfuktarmärken. Men såvitt vi kan se säljs den bara via Amazon.se, inte hos någon butik med egen produktsida och egen prisuppgift vi kan datera. Vi rankar bara produkter vi kan läsa priset på hos säljaren.",
  },
  {
    brand: "Venta",
    name: "LW25",
    reason:
      "Också med i Stiftung Warentests provning, och en luftvättare snarare än en ren luftfuktare: den tvättar luften genom vattenbad och fuktar som följd. Samma problem som Boneco, den finns i Sverige bara via Amazon.se och begagnatmarknaden.",
  },
  {
    brand: "Diverse",
    name: "Avfuktare",
    reason:
      "Grannkategorin som ofta blandas ihop med den här. En avfuktare tar bort fukt, en luftfuktare tillför den, och de löser motsatta problem. Den som har kondens på fönstren invändigt vintertid ska ha en avfuktare eller bättre ventilation, inte det här. Avfuktare bär 12 100 sökningar i månaden och får en egen sida.",
  },
];

export const LUFTFUKTARE_FAQ = [
  {
    question: "Vilken luftfuktare är bäst 2026?",
    answer:
      "Philips 5000 Series HU5710/00 för 1 999 kronor hos Clas Ohlson. Den är den enda i vår jämförelse där du kan ställa målfuktigheten fritt, 30 till 70 procent i steg om fem, vilket är avgörande eftersom hela risken i kategorin ligger i att fukta för mycket. Den använder dessutom förångning i stället för ultraljud, så den finfördelar inte tankens innehåll ut i rummet, och den har den största kapaciteten av alla tolv, 56 kvadratmeter och 400 milliliter i timmen. Näst bäst är Xiaomi Smart Humidifier Pro för 1 499 kronor hos Kjell: samma avdunstningsprincip, tvättbart filter utan förbrukningskostnad och lägsta effekten av alla apparaterna, 13 watt.",
  },
  {
    question: "Är luftfuktare farliga?",
    answer:
      "Farliga är fel ord, men den svenska expertorganisationen för inomhusmiljö avråder faktiskt från kategorin. SweSIAQ skriver att man i allmänhet bör undvika konstgjord befuktning av luften på grund av risk för mögel- och bakterieväxt, och att man ibland behöver acceptera den lägre luftfuktigheten. Det finns mätningar bakom. ÖKO-TEST provade åtta luftfuktare och fem av dem spred mellan 400 000 och drygt 60 miljoner kolonibildande enheter per timme, mot 100 till 500 per kubikmeter i normal inomhusluft, och ultraljudsmodellerna var de utpekade. Stiftung Warentest kom 2025 fram till att några modeller avger bakterier till rumsluften och flera inte gör det, och deras slutsats var skötsel snarare än avrådan. Kort sagt: en välvald och välskött luftfuktare är inte farlig, en ostädad ultraljudsmodell som står på dygnet runt är en risk du inte behöver ta.",
  },
  {
    question: "Vilken luftfuktighet ska man ha inomhus?",
    answer:
      "Det finns inget officiellt svenskt riktvärde för vad som är lagom, men det finns ett tal du bör känna till åt andra hållet. Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 räknar upp de indikationer som kan få tillsynsmyndigheten att kräva undersökning av en byggnad enligt miljöbalken, och en av dem är om luftfuktighetens medelvärde överstiger 7 gram vatten per kilo torr luft under en längre period under eldningssäsongen, vilket motsvarar cirka 45 procent relativ luftfuktighet vid 21 grader. Det är ingen hälsogräns och ingen bindande regel, allmänna råd är rekommendationer. Men det betyder att övre halvan av det spann butikerna marknadsför, 40 till 60 procent, ligger över det tal myndigheten själv namnger. ÖKO-TEST rekommenderar att man använder luftfuktare först när fukten legat under 30 procent en längre tid.",
  },
  {
    question: "Vad är skillnaden mellan ultraljud, förångning och ånga?",
    answer:
      "Det är den viktigaste frågan, och den avgör både hygien och elräkning. Ultraljud låter en platta vibrera så att vattnet slås sönder till synlig dimma. Det är tyst och energisnålt, men allt som finns i tanken följer med ut i luften, både kalk som vitt damm och bakterier. Förångning blåser luft genom en fuktig veke eller ett filter så att vattnet avdunstar; mineraler och mikrober stannar i filtret, och metoden är dessutom självreglerande eftersom torr luft tar upp mer fukt än fuktig. Ånga kokar vattnet, vilket dödar mikroberna men drar mest el. Av våra tolv använder sju ultraljud, fyra förångning eller avdunstning och en ånga, och två av ultraljudsmodellerna har dessutom ett varmt läge som kokar vattnet.",
  },
  {
    question: "Vad är vitt damm och hur blir man av med det?",
    answer:
      "Vitt damm är mineralerna ur kranvattnet, framför allt kalk, som ultraljudsfuktaren finfördelar och sprider ut i rummet tillsammans med vattnet. Det lägger sig som en tunn vit hinna på möbler och elektronik nära apparaten. Det är i första hand ett städproblem, men det är också ett kvitto på vad tekniken gör: allt som finns i tanken hamnar i luften du andas, och mineraler är det mest oskyldiga av det. Har du hårt vatten blir det värre. Lösningen är antingen en avkalkningspatron där tillverkaren erbjuder det, eller att välja en apparat som förångar i stället för att finfördela. En förångare kan inte ge vitt damm alls, eftersom mineralerna stannar kvar i filtret.",
  },
  {
    question: "Hur ofta måste jag rengöra en luftfuktare?",
    answer:
      "Byt vatten varje dag och låt inte vatten stå kvar i tanken när apparaten inte används. Rengör tanken och de ytor vattnet rör vid enligt tillverkarens anvisning, oftast en gång i veckan, och avkalka regelbundet. De tyska proven visar varför: en luftfuktare med stillastående vatten är en odlingsplats, och ultraljudsmodellen skickar sedan ut innehållet i rummet. ÖKO-TEST rekommenderar dagligt vattenbyte, och utan underhåll kan bakterier föröka sig och mögel bildas, enligt Stiftung Warentest. Är apparaten krånglig att komma åt och rengöra kommer du inte att göra det, så titta på hur tanken öppnas redan i butiken.",
  },
  {
    question: "Behöver jag verkligen en luftfuktare?",
    answer:
      "Förmodligen inte. SweSIAQ pekar på två åtgärder som fungerar och som inte kostar något: låt inte inomhustemperaturen vara onödigt hög, eftersom uppvärmd luft är det som gör den relativa fuktigheten låg, och anpassa ventilationen så att luftflödena inte är högre än vad antalet personer i rummet kräver. Torr luft inomhus vintertid är i huvudsak ett symptom på för varmt och för mycket ventilation, och båda går att justera. En luftfuktare är motiverad när du har mätt att fukten ligger under 30 procent under längre tid, när du har besvär som faktiskt hänger ihop med det, och när du vet att du orkar sköta den. Köp en hygrometer för hundra kronor först och mät i två veckor.",
  },
  {
    question: "Kan en luftfuktare hjälpa mot astma och allergi?",
    answer:
      "Det är komplicerat, och kategorin marknadsförs hårdare mot allergiker än underlaget bär. Torr luft kan irritera slemhinnor och göra att flimmerhåren i luftvägarna fungerar sämre, vilket i sin tur försämrar kroppens försvar. Men åt andra hållet gäller att dammkvalster enligt SweSIAQ kan börja växa i rumstemperatur redan vid en luftfuktighet över 45 till 50 procent, och kvalster är en av de vanligaste allergikällorna i svenska sovrum. En luftfuktare som körs för hårt kan alltså förvärra precis det den såldes för att lindra. Har du astma eller allergi är det här en fråga för vården och inte för en jämförelsesajt, och mät fukten innan du köper något.",
  },
  {
    question: "Vad kostar en luftfuktare i drift?",
    answer:
      "Det är förbrukningsdelarna och inte elen som avgör. Stiftung Warentest räknade fram mellan 13 och 247 euro om året för åtta apparater, grovt 150 till 2 800 kronor, och skillnaden ligger nästan helt i filter och vekar som måste bytas. Elen skiljer också mycket: Xiaomi anger 13 watt och Levoit 280, en faktor tjugo, vilket vid kontinuerlig drift under en eldningssäsong blir en verklig summa. Xiaomi Smart Humidifier Pro sticker ut genom att ha ett tvättbart filter, utan förbrukningsdel alls. Räkna alltid filterkostnaden innan du jämför två inköpspris.",
  },
  {
    question: "Ska jag fylla luftfuktaren med kranvatten eller destillerat vatten?",
    answer:
      "Kranvatten fungerar i de flesta apparater, men vilken teknik du har avgör hur mycket det spelar roll. I en ultraljudsfuktare finfördelas allt som finns i tanken och skickas ut i rummet, kalken inräknad, och det är den som blir vitt damm på möbler och elektronik. Har du hårt vatten blir det påtagligt. Destillerat eller avjoniserat vatten tar bort det problemet men kostar pengar varje vecka, och en del tillverkare avråder från det eftersom vissa givare behöver mineraler för att mäta rätt. I en förångare stannar mineralerna i filtret och frågan är i praktiken oviktig. Viktigare än vattentypen är att byta vattnet varje dag, vilket ÖKO-TEST rekommenderar, och att aldrig låta vatten stå kvar i tanken när apparaten inte används.",
  },
  {
    question: "Hjälper en luftfuktare mot torr hals och snarkning på natten?",
    answer:
      "Det finns ett rimligt resonemang bakom, men underlaget är svagare än marknadsföringen antyder och det finns en baksida. Torr luft kan irritera slemhinnor och göra att luftvägarnas flimmerhår fungerar sämre, vilket är skälet till att ÖKO-TEST anser en luftfuktare motiverad när fukten legat under 30 procent en längre tid. Åt andra hållet anger SweSIAQ att dammkvalster kan börja växa i rumstemperatur redan över 45 till 50 procent, och kvalster i sängen är en vanlig orsak till just täppt näsa på natten. En luftfuktare som körs för hårt i ett sovrum kan alltså förvärra det den såldes för att lindra. Mät först, ställ målet under 45 procent, och tala med vården om besvären är återkommande.",
  },
  {
    question: "Var ska luftfuktaren stå?",
    answer:
      "I det rum du faktiskt vistas i, en bit från väggen och inte direkt på golvet om tillverkaren rekommenderar annat. Ställ den inte nära ett fönster eller en yttervägg, eftersom kalla ytor är där fukten kondenserar och det är kondens som ger mögel. Rikta inte dimman mot möbler eller elektronik, särskilt inte om det är en ultraljudsmodell, eftersom vitt damm lägger sig där. Och ha en hygrometer i samma rum men några meter bort, så att du mäter rummet och inte apparatens egen dimma. Ljud & Bild använde just den metoden i sitt test, med mätaren tre till sju meter från apparaten.",
  },
];
