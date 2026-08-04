import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { ROBOTGRASKLIPPARE } from "@/lib/test-pages";

/**
 * Robotgräsklippare. Underlag i .agent/research/robotgrasklippare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundomdömen, klippytor, lutningar,
 * navigeringsteknik och ljudnivåer. Allt läst 2026-08-04 hos Clas Ohlson via
 * webbläsare med kakorna avvisade.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte klippt någon
 * gräsmatta, inte mätt någon ljudnivå och inte provat någon robot.
 *
 * ## Två fynd
 *
 * **1. Samma modellnamn, dubbla ytan, lägre pris.** Dreame A1 Pro finns i två
 * varianter hos samma butik: 1 000 m² för 12 990 kronor och 2 000 m² för
 * 11 490. Den som täcker dubbelt så stor tomt kostar alltså 1 500 kronor
 * mindre. Båda anger 45 procents lutning och samma 3D-lidar. Kontrollerat på
 * respektive produktsida 2026-08-04, inte i en träfflista.
 *
 * **2. Igelkotten, och den ligger i köpguiden.** Se kategorifilen och
 * `lib/sources.ts`. Ingen av de 18 robotar Rasmussen m.fl. provade kunde
 * upptäcka en igelkott innan påkörning, ett standardiserat prov finns sedan
 * 2024, och ingen tillverkare redovisar ett resultat.
 *
 * ⚠️ **Igelkottssäkerhet är inget kriterium och får inte bli ett.** Det finns
 * inga publicerade provresultat per modell, och 2024 års studie kunde inte
 * belägga att knivtyp, sensorer, glidplåtar eller hjuldrift förutsäger
 * utfallet. Jämför därför aldrig knivtyp som om det vore ett säkerhetsmått.
 *
 * ## Slinglöst är inte längre ett val
 *
 * 17 av 18 robotar i butikens sortiment är slinglösa. Cocraft CRM16G1 är den
 * enda med begränsningskabel och rankas som budgetalternativ, inte som en
 * representant för en levande teknikgren.
 *
 * ## Butikerna, och varför de blev som de blev
 *
 * Fem av sju länkar går till Clas Ohlson, som har bredast sortiment men inget
 * affiliateprogram. Två är bytta efter kontroll av tillverkarnas egna svenska
 * butiker:
 *
 * - **Dreame A1 Pro 2000** kostar 11 490 hos Clas Ohlson, Kjell och Dreames
 *   egen butik. Vid samma pris väljer vi Kjell, som är enda kartlagda
 *   programmet (Adtraction, 5 % / 30 d).
 * - **Luba Mini 2 AWD** kostar 16 089 hos Mammotion Sverige mot 16 490 hos
 *   Clas Ohlson, alltså 401 kronor billigare hos tillverkaren.
 *
 * ⚠️ **Navimow byttes INTE.** Segways egen svenska butik tar 9 999 kronor för
 * i105e mot Clas Ohlsons 7 990. Ett eget märkesprogram är värdelöst om läsaren
 * betalar 2 009 kronor extra för det.
 *
 * ⚠️ `dreame.se` svarar **HTTP 500 med noll byte** och är alltså ingen butik,
 * trots att `/pages/affiliate` gav 200 (det var nätverkets redirect). Den
 * riktiga svenska butiken är `se.dreametech.com`.
 *
 * Husqvarna har inget program vi hittat. Sunseeker, MOVA och Cocraft är inte
 * kontrollerade; Cocraft är Clas Ohlsons eget märke.
 *
 * ## Betygstalen
 *
 * Clas Ohlson publicerar `reviewCount`, Kjell publicerar `ratingCount`, och de
 * räknas olika. Mammotion publicerar inga alls. Talen här är därför inte
 * jämförbara mellan produkterna, vilket står utskrivet i tabellens fotnot.
 */

export const PRICE_CHECKED = "2026-08-04";

const CLAS_OHLSON = "Clas Ohlson";
const KJELL = "Kjell & Company";
const MAMMOTION = "Mammotion Sverige";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "dreame-a1-pro-2000",
    name: "A1 Pro, 2 000 m²",
    shortName: "Dreame A1 Pro",
    brand: "Dreame",
    image: productImage(ROBOTGRASKLIPPARE.slug, "dreame-a1-pro-2000"),
    tagline: "2 000 kvadratmeter och 45 procents lutning för 11 490.",
    scores: {
      ytaterrang: 4.5,
      navigering: 4.5,
      klippresultat: 4,
      ljud: 3.5,
      prisvarde: 5,
    },
    price: 11490,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/tradgard/robotgrasklippare-tillbehor/robotgrasklippare/dreame-a1-pro-robotgrasklippare-p66312",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 12, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Störst tomt per krona",
    pros: [
      "2 000 m² är största ytan under 15 000 kronor bland robotarna här",
      "45 procents lutning täcker slänter de flesta villatomter har",
      "3D-lidar ser hinder i förväg i stället för att köra in i dem",
      "Kostar 1 500 kronor mindre än samma modell för halva ytan",
    ],
    cons: [
      "Ingen ljudnivå angiven",
      "Lidar arbetar sämre i motljus än satellitmottagning gör på öppen tomt",
      "12 betyg hos butiken är ett tunt underlag",
    ],
    specs: [
      { label: "Pris", value: "11 490 kr", highlight: true },
      { label: "Klippyta", value: "2 000 m²", highlight: true },
      { label: "Max lutning", value: "45 %", highlight: true },
      { label: "Navigering", value: "3D-lidar", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Hinderhantering", value: "Ser hinder i förväg" },
      { label: "Ljudnivå", value: "Ej angiven" },
      { label: "App", value: "Ja, klipphöjd i appen" },
    ],
    verdict:
      "Dreame A1 Pro klarar 2 000 kvadratmeter och 45 procents lutning för 11 490 kronor. Det är största tomten per krona bland robotarna här, och marginalen är det som gör den till förstaval: en robot som ligger precis på gränsen till tomtens storlek får köra längre och oftare för att hinna med.\n\nNavigeringen sköts av 3D-lidar, som ser hinder i förväg i stället för att upptäcka dem genom att köra in i dem. På en tomt med utemöbler, leksaker och rabattkanter är det skillnaden mellan en robot du låter gå och en du plockar upp.\n\nEn sak att kontrollera innan du klickar, och den är lätt att missa. Samma modellnamn finns i en variant för 1 000 kvadratmeter som kostar 12 990 kronor hos samma butik. Den mindre roboten kostar alltså 1 500 kronor mer än den större. Läs vilken yta varianten gäller innan du jämför två priser.\n\nDet som saknas är en ljudnivå. Butiken anger ingen, och det spelar roll om du tänkt köra dagtid av hänsyn till igelkottar, eftersom det är då du själv är i trädgården.\n\nKöp den här om tomten är stor eller kuperad och du vill ha marginal. Ligger tomten under 600 kvadratmeter och är plan finns billigare robotar som gör samma jobb.",
  },
  {
    id: "mammotion-luba-mini-2-awd",
    name: "Luba Mini 2 AWD",
    shortName: "Luba Mini 2 AWD",
    brand: "Mammotion",
    image: productImage(ROBOTGRASKLIPPARE.slug, "mammotion-luba-mini-2-awd"),
    tagline: "80 procents lutning, fyrhjulsdrift, 1 000 kvadratmeter.",
    scores: {
      ytaterrang: 5,
      navigering: 4,
      klippresultat: 4,
      ljud: 3,
      prisvarde: 2.5,
    },
    price: 16089,
    merchant: MAMMOTION,
    merchantUrl: "https://se.mammotion.com/products/robotgrasklippare-luba-mini-2-awd-1000",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "80 procents lutning",
    pros: [
      "80 procents lutning, dubbelt mot det de flesta robotarna klarar",
      "Fyrhjulsdrift, som är det som gör den branta siffran möjlig",
      "1 000 m² räcker för en stor villatomt",
    ],
    cons: [
      "16 089 kronor, näst dyrast av robotarna här",
      "Tillverkaren publicerar inga kundomdömen",
      "Ingen ljudnivå angiven, och fyrhjulsdrift är sällan det tystaste valet",
    ],
    specs: [
      { label: "Pris", value: "16 089 kr", highlight: true },
      { label: "Klippyta", value: "1 000 m²", highlight: true },
      { label: "Max lutning", value: "80 %", highlight: true },
      { label: "Navigering", value: "AI, slinglös", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Drivning", value: "Fyrhjulsdrift" },
      { label: "Ljudnivå", value: "Ej angiven" },
    ],
    verdict:
      "Luba Mini 2 klarar 80 procents lutning. Ingen annan robot i den här jämförelsen anger mer än 45, så den löser ett problem de andra inte ens försöker lösa.\n\nSiffran är värd att förstå. 80 procents lutning betyder att marken stiger fyra meter på fem, vilket är brantare än de flesta trädgårdar har någonstans. Har du en sådan slänt är valet enkelt, för alternativet är att klippa den för hand. Har du ingen slänt betalar du för fyrhjulsdrift du aldrig kommer att använda.\n\nDärför står den tvåa och inte etta. Den är bäst i fältet på det kriterium som väger tyngst, men 16 089 kronor för 1 000 kvadratmeter är fyrtio procent mer än vad Dreame tar för dubbla ytan på plan mark.\n\nTillverkaren publicerar inga kundomdömen, och ingen ljudnivå anges. Fyrhjulsdrift på en slänt är sällan det tystaste man kan välja.\n\nKöp den om tomten lutar mer än fyrtio procent någonstans du vill ha klippt. Gör den inte det finns ingen anledning att betala för drivningen.",
  },
  {
    id: "segway-navimow-i105e",
    name: "Navimow i105e",
    shortName: "Navimow i105e",
    brand: "Segway",
    image: productImage(ROBOTGRASKLIPPARE.slug, "segway-navimow-i105e"),
    tagline: "RTK-satellit och kamera i samma robot för 7 990.",
    scores: {
      ytaterrang: 3,
      navigering: 4.5,
      klippresultat: 4,
      ljud: 4,
      prisvarde: 4,
    },
    price: 7990,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Segway-Navimow-i105e-AI-robotgrasklippare-utan-slinga,-500-m2/p/41-3776",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 27, checkedAt: PRICE_CHECKED },
    superlative: "Satellit och kamera tillsammans",
    pros: [
      "Hybridnavigering med både RTK-satellit och AI-kamera",
      "VisionFence-kameran anges känna igen över 150 hinder",
      "27 omdömen med 4,5 i snitt, näst största underlaget här",
      "7 990 kronor för slinglös navigering av den här sorten",
    ],
    cons: [
      "500 m² är minsta ytan bland de slinglösa robotarna här",
      "30 procents lutning är lägst av de slinglösa",
      "Satellitmottagning störs av tät trädkrona, och tomten avgör hur mycket",
    ],
    specs: [
      { label: "Pris", value: "7 990 kr", highlight: true },
      { label: "Klippyta", value: "500 m²", highlight: true },
      { label: "Max lutning", value: "30 %", highlight: true },
      { label: "Navigering", value: "RTK-satellit och AI-kamera", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Hinderhantering", value: "VisionFence, över 150 hinder" },
    ],
    verdict:
      "Navimow i105e kombinerar RTK-satellit med en AI-kamera, och det är den kombinationen som gör den intressant på en tomt med träd.\n\nSatellitnavigering är exakt på öppen mark och tappar positionen under tät krona och tätt intill husväggar. En kamera fungerar tvärtom: den bryr sig inte om himlen men behöver ljus. Att ha båda betyder att roboten har något att falla tillbaka på när det ena sviktar, och Råd & Rön pekar just på att slinglös navigering är flexibel men ojämnt tillförlitlig beroende på tomtens form.\n\nKameran anges känna igen över 150 sorters hinder. Det talet kommer från tillverkaren och är inte provat av någon vi läst, men riktningen är den rätta: en robot som ser en leksak är en robot du slipper hämta.\n\nBegränsningen är storleken. 500 kvadratmeter och 30 procents lutning är minst respektive lägst bland de slinglösa här. Är tomten större eller brantare än så växer du ur den direkt.\n\n27 omdömen med 4,5 i snitt är näst mest av robotarna här, vilket säger något om att den håller.\n\nKöp den till en normalstor och någorlunda plan villatomt med träd på. Där gör hybridnavigeringen mest nytta för pengarna.",
  },
  {
    id: "husqvarna-aspire-r6v",
    name: "Automower Aspire R6V",
    shortName: "Aspire R6V",
    brand: "Husqvarna",
    image: productImage(ROBOTGRASKLIPPARE.slug, "husqvarna-aspire-r6v"),
    tagline: "68 omdömen, flest av robotarna i jämförelsen.",
    scores: {
      ytaterrang: 3.5,
      navigering: 4,
      klippresultat: 4.5,
      ljud: 4,
      prisvarde: 2.5,
    },
    price: 13100,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Husqvarna-Automower-Aspire-R6V-robotgrasklippare,-600-m2/p/46-2000",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 68, checkedAt: PRICE_CHECKED },
    superlative: "Störst kundunderlag",
    pros: [
      "68 omdömen med 4,5 i snitt, klart största underlaget av robotarna här",
      "Husqvarna har byggt robotgräsklippare längre än något annat märke i fältet",
      "Slingfri med AI-kamera och appstyrning",
      "40 procents lutning räcker för de flesta villaslänter",
    ],
    cons: [
      "13 100 kronor för 600 m², dyrast per kvadratmeter av robotarna här",
      "Dreame ger dig drygt tre gånger ytan för 1 600 kronor mindre",
      "Tillverkaren uppger goda resultat i igelkottsprovet utan att publicera något tal",
    ],
    specs: [
      { label: "Pris", value: "13 100 kr", highlight: true },
      { label: "Klippyta", value: "600 m²", highlight: true },
      { label: "Max lutning", value: "40 %", highlight: true },
      { label: "Navigering", value: "AI-kamera, slingfri", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "App", value: "Ja" },
    ],
    verdict:
      "Aspire R6V har 68 omdömen med 4,5 i snitt hos butiken. Det är mer än dubbelt så många som näst mest i fältet, De flesta robotarna här har under tio omdömen, så det här är den enda av dem med ett kundunderlag värt namnet.\n\nHusqvarna har dessutom byggt robotgräsklippare längre än något annat märke här, och det syns i sådant som inte står i en specifikationstabell: reservdelar, verkstäder och att roboten fortfarande går att få servad om fem år.\n\nPriset är svårare att försvara. 13 100 kronor för 600 kvadratmeter är dyrast per kvadratmeter av robotarna här, och Dreame A1 Pro tar 11 490 för drygt tre gånger ytan.\n\nEn sak till, som betyget inte väger in men som hör hemma i beslutet. Husqvarna är det enda märket i fältet som uttalat sig om igelkottsforskningen. De välkomnar den och uppger att deras robotar fick bra resultat, men publicerar varken poäng eller skadeklass. Ett påstående utan tal går inte att kontrollera, och det gäller även när tillverkaren är den som byggt flest robotar.\n\nKöp den för servicenätet och för att många andra redan har den. Köp något annat om det är kvadratmeter du är ute efter.",
  },
  {
    id: "sunseeker-v3",
    name: "V3",
    shortName: "Sunseeker V3",
    brand: "Sunseeker",
    image: productImage(ROBOTGRASKLIPPARE.slug, "sunseeker-v3"),
    tagline: "Dubbla 3D-kameror, och den går att spola av.",
    scores: {
      ytaterrang: 3.5,
      navigering: 4,
      klippresultat: 3.5,
      ljud: 4,
      prisvarde: 4,
    },
    price: 7995,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Sunseeker-V3-robotgrasklippare-utan-slinga,-600-m2/p/46-3020",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 6, checkedAt: PRICE_CHECKED },
    superlative: "Går att spola av",
    pros: [
      "Dubbla 3D-kameror i stället för satellitmottagning",
      "Går att spola av, vilket ingen annan robot här anger",
      "42 procents lutning för under 8 000 kronor",
      "Tolv extra knivar ingår",
    ],
    cons: [
      "Kameranavigering behöver ljus och arbetar sämre i skymning",
      "Sex omdömen hos butiken",
      "600 m² räcker inte till en stor tomt",
    ],
    specs: [
      { label: "Pris", value: "7 995 kr", highlight: true },
      { label: "Klippyta", value: "600 m²", highlight: true },
      { label: "Max lutning", value: "42 %", highlight: true },
      { label: "Navigering", value: "Dubbla 3D-kameror", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Underhåll", value: "Går att spola av, 12 extra knivar ingår" },
    ],
    verdict:
      "Sunseeker V3 navigerar med dubbla 3D-kameror och kostar 7 995 kronor för 600 kvadratmeter och 42 procents lutning. Det är mer lutning än Husqvarna anger, till drygt halva priset.\n\nKameror i stället för satellit är ett medvetet vägval med en tydlig konsekvens. De bryr sig inte om trädkronor eller husväggar, vilket är där satellitmottagning tappar positionen, men de behöver ljus. En robot som ska gå i skymningen är alltså fel användning av just den här tekniken.\n\nDet praktiska draget är att den går att spola av. Ingen annan robot i jämförelsen anger det, och den som klippt blött gräs vet varför det spelar roll. Tolv extra knivar ingår, vilket är ett par säsongers förbrukning.\n\nUnderlaget är tunt med sex omdömen, och 600 kvadratmeter sätter en gräns som en villatomt med tomtgräns i alla riktningar snabbt når.\n\nKöp den till en tomt med mycket träd och mycket skugga, där kamerorna har övertaget och där du ändå tänkt köra mitt på dagen.",
  },
  {
    id: "mova-viax",
    name: "ViAX",
    shortName: "MOVA ViAX",
    brand: "MOVA",
    image: productImage(ROBOTGRASKLIPPARE.slug, "mova-viax"),
    tagline: "Under 57 decibel, och det talet står utskrivet.",
    scores: {
      ytaterrang: 3.5,
      navigering: 3.5,
      klippresultat: 3.5,
      ljud: 4.5,
      prisvarde: 4.5,
    },
    price: 5990,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/MOVA-ViAX-AI-robotgrasklippare-utan-slinga,-600-m2/p/46-3048",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 7, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Billigast utan slinga",
    pros: [
      "5 990 kronor, billigast av de slinglösa robotarna här",
      "Under 57 dB angivet, och de flesta anger ingenting alls",
      "600 m² och 40 procents lutning för priset",
      "Justerbar klipphöjd",
    ],
    cons: [
      "Kameranavigering utan satellitstöd",
      "Sju omdömen hos butiken",
      "Enklare hinderhantering än de dyrare robotarna",
    ],
    specs: [
      { label: "Pris", value: "5 990 kr", highlight: true },
      { label: "Klippyta", value: "600 m²", highlight: true },
      { label: "Max lutning", value: "40 %", highlight: true },
      { label: "Navigering", value: "Kameranavigering", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Ljudnivå", value: "Under 57 dB" },
    ],
    verdict:
      "MOVA ViAX kostar 5 990 kronor och är därmed billigast av de slinglösa robotarna i jämförelsen. För det får du 600 kvadratmeter och 40 procents lutning, alltså samma siffror som Husqvarna tar 13 100 för.\n\nDen anger dessutom sin ljudnivå: under 57 decibel. Det är ovanligt, eftersom de flesta robotarna här inte skriver ut något tal alls, och det är användbart av ett skäl som hör ihop med igelkottsavsnittet nedan. Rådet att köra dagtid fungerar bara om roboten är tyst nog att du står ut med den när du själv är ute.\n\nDet du betalar mindre för är navigeringen. Kamera utan satellitstöd är enklare än hybridlösningen hos Navimow och än lidarn hos Dreame, och hinderhanteringen är mer grundläggande.\n\nSju omdömen är för tunt för att säga något om hållbarheten.\n\nKöp den om tomten är normalstor och någorlunda öppen och du inte vill lägga över tiotusen. Det här är den billigaste vägen till en robot som slipper begränsningskabel.",
  },
  {
    id: "cocraft-crm16g1",
    name: "CRM16G1",
    shortName: "Cocraft CRM16G1",
    brand: "Cocraft",
    image: productImage(ROBOTGRASKLIPPARE.slug, "cocraft-crm16g1"),
    tagline: "1 999 kronor, och en kabel du gräver ner en gång.",
    scores: {
      ytaterrang: 2,
      navigering: 2,
      klippresultat: 3,
      ljud: 3,
      prisvarde: 4.5,
    },
    price: 1999,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Cocraft-CRM16G1-robotgrasklippare-med-slinga,-300-m2/p/41-4006",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 3.5, count: 31, checkedAt: PRICE_CHECKED },
    superlative: "En sjättedel av näst billigaste priset",
    pros: [
      "1 999 kronor, en tredjedel av näst billigaste roboten här",
      "Laddstation, begränsningskabel och anslutningar ingår",
      "Slinga är den beprövade metoden och påverkas inte av träd eller moln",
      "31 omdömen, näst största underlaget av robotarna här",
    ],
    cons: [
      "300 m² och 25 procents lutning, minst och lägst i jämförelsen",
      "Begränsningskabeln ska grävas ner och sitter sedan där",
      "3,5 i kundbetyg, lägst av robotarna här",
    ],
    specs: [
      { label: "Pris", value: "1 999 kr", highlight: true },
      { label: "Klippyta", value: "300 m²", highlight: true },
      { label: "Max lutning", value: "25 %", highlight: true },
      { label: "Navigering", value: "Slinga", highlight: true },
      { label: "Gränsmetod", value: "Begränsningskabel", highlight: true },
      { label: "Ingår", value: "Laddstation, kabel och anslutningar" },
    ],
    verdict:
      "Cocraft CRM16G1 kostar 1 999 kronor, en tredjedel av näst billigaste roboten i jämförelsen, och är ensam kvar med begränsningskabel.\n\nSlingan är inte ett sämre val i sig. Den bryr sig varken om trädkronor, moln eller motljus, och den vet exakt var gränsen går eftersom någon har grävt ner den. Råd & Rön beskriver kabeln som beprövad men oflexibel, och det är en rättvis sammanfattning.\n\nPriset på det valet betalas i arbete och i frihet. Kabeln ska läggas ut en gång, och sedan ligger gränsen där tills du gräver om den. Vill du flytta en rabatt eller öppna upp mot en ny yta blir det spadtag och inte en knapptryckning i appen.\n\nSiffrorna sätter den tydliga gränsen: 300 kvadratmeter och 25 procents lutning är minst och lägst här. Det räcker till en radhustomt eller en avgränsad gräsyta, inte till en villatomt runt hela huset.\n\n31 omdömen med 3,5 i snitt är det svagaste betyget bland robotarna här, och det största underlaget efter Husqvarna.\n\nKöp den till en liten och plan gräsyta där tvåtusen kronor är hela budgeten. Har du mer att röra dig med gör de slinglösa ett annat och friare jobb.",
  },
];

export const ROBOTGRASKLIPPARE_PRODUCTS: Product[] = resolveProducts(
  ROBOTGRASKLIPPARE,
  SEEDS,
);

/**
 * Övervägda men inte rankade.
 *
 * Dreame A1 Pro 1 000 m² ligger här som prisexempel och inte som produktfel:
 * den fungerar, men den kostar mer än sin egen större syskonmodell.
 */
export const ROBOTGRASKLIPPARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Dreame",
    name: "A1 Pro, 1 000 m²",
    reason:
      "12 990 kronor. Det är 1 500 mer än exakt samma modellnamn i varianten för 2 000 m² hos samma butik. Båda anger 45 procents lutning och samma 3D-lidar. Vi rankar den större varianten och lämnar den här utanför av ett enda skäl: det finns ingen tomt där den är det bättre köpet av de två. Kontrollera alltid vilken yta varianten gäller innan du jämför två priser på samma modellnamn.",
    approxPrice: 12990,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Dreame-A1-Pro-robotgrasklippare-utan-slinga,-1000-m2/p/46-3047",
  },
  {
    brand: "Mammotion",
    name: "Luba 3 AWD, 5 000 m²",
    reason:
      "36 789 kronor och dyrast av allt vi kartlagt. Den klarar 5 000 kvadratmeter och 80 procents lutning, vilket är imponerande och fel produkt för en villatomt. Råd & Röns test avser robotar för vanliga villatomter, och den här är byggd för en helt annan sorts mark. Har du fem tusen kvadratmeter gräs är det en annan jämförelse du behöver än den här.",
    approxPrice: 36789,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Mammotion-Luba-3-AWD-AI-robotgrasklippare,-5000-m2/p/10-1-5",
  },
  {
    brand: "Segway",
    name: "Navimow i215E",
    reason:
      "16 990 kronor för 1 500 kvadratmeter. Samma navigeringsfamilj som i105e som vi rankar, men i ett prisläge där Dreame A1 Pro ger 500 kvadratmeter mer för 5 500 kronor mindre. Den är inte sämre, den är sämre placerad i prislistan.",
    approxPrice: 16990,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Segway-Navimow-i215E-robotgrasklippare-utan-slinga,-1500-m2/p/46-2162",
  },
  {
    brand: "Sunseeker",
    name: "S5 RTK, 1 600 m²",
    reason:
      "12 995 kronor för 1 600 kvadratmeter med RTK-navigering. En rimlig produkt som faller på att Dreame A1 Pro tar 400 kvadratmeter mer för 1 500 kronor mindre. Butiken anger dessutom ingen lutning för den, vilket är den uppgift som avgör mest på en kuperad tomt.",
    approxPrice: 12995,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Sunseeker-S5-RTK-robotgrasklippare-utan-slinga-1600-m2/p/46-3021",
  },
  {
    brand: "Husqvarna",
    name: "Automower Aspire R4",
    reason:
      "6 990 kronor för 400 kvadratmeter, Husqvarnas billigaste. Den lämnades utanför till förmån för R6V, som har det stora kundunderlaget, och för att butiken inte anger någon maxlutning för R4. Utan det talet går den inte att väga mot de andra på kriteriet som väger tyngst.",
    approxPrice: 6990,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Husqvarna-Automower-Aspire-R4-med-tillbehor,-400-m2/p/46-3011",
  },
  {
    brand: "Mammotion",
    name: "Yuka Mini 2, 800 m²",
    reason:
      "10 490 kronor för 800 kvadratmeter. Butiken anger ingen maxlutning, vilket gör den omöjlig att placera på kriteriet yta och terräng. Den ligger dessutom nära Dreame A1 Pro i pris utan att komma i närheten av dess yta. Får den en publicerad lutningssiffra är den värd att pröva igen.",
    approxPrice: 10490,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Mammotion-Yuka-Mini-2-AI-robotgrasklippare,-800-m2/p/10-1-9",
  },
];

/**
 * Vanliga frågor.
 *
 * ⚠️ Igelkottsfrågorna återger Rasmussen m.fl. och får aldrig påstå att
 * robotgräsklippare orsakar rödlistningen. SLU anger att orsakerna är oklara
 * och nämner dem inte.
 *
 * ⚠️ Inga modellbetyg från Råd & Rön återges. Testet ligger bakom betalvägg.
 */
export const ROBOTGRASKLIPPARE_FAQ = [
  {
    question: "Vilken robotgräsklippare är bäst 2026?",
    answer:
      "Dreame A1 Pro i varianten för 2 000 kvadratmeter, 11 490 kronor hos Clas Ohlson. Den ger störst tomt per krona av robotarna vi jämför, klarar 45 procents lutning och navigerar med 3D-lidar som ser hinder i förväg i stället för att köra in i dem. Kontrollera vilken variant du lägger i korgen: samma modellnamn finns för 1 000 kvadratmeter och kostar då 12 990 kronor, alltså 1 500 mer för halva ytan. Lutar tomten mer än 45 procent någonstans är Mammotion Luba Mini 2 AWD svaret i stället, eftersom den anger 80 procent.",
  },
  {
    question: "Hur farliga är robotgräsklippare för igelkottar?",
    answer:
      "Farligare än de flesta tror, och skillnaden mellan modeller är stor. Forskare från Aalborg och Oxford körde 18 robotmodeller mot redan döda igelkottar i fyra storlekar och från tre vinklar. Ingen av de 18 kunde upptäcka en igelkott innan den körde på den, och samtliga körde över ungar som ännu var beroende av modern. Vad som hände vid kontakt skilde sig kraftigt: vissa lämnade lindriga märken, andra åsamkade svåra skador. Det enda råd som fungerar oavsett modell är att köra roboten dagtid, eftersom igelkotten är aktiv från skymning till gryning.",
  },
  {
    question: "Finns det ett igelkottstest jag kan titta efter?",
    answer:
      "Provet finns, men ingen tillverkare redovisar sitt resultat. Samma forskargrupp publicerade 2024 ett standardiserat säkerhetsprov med en skadeklassning i fem steg: en robot som bara ger klass 0 till 2 får kallas säker för igelkottar, en som ger klass 3 eller 4 får inte det, och klass 4 innebär underkänt. Protokollet är föreslaget för den europeiska standarden men ingår ännu inte i den. Husqvarna har uttalat sig och uppger att deras robotar fick bra resultat, men publicerar varken poäng eller skadeklass. Du kan alltså inte titta efter ett tal, för det finns inget att titta efter.",
  },
  {
    question: "Kan jag se på specifikationen om en robot är skonsam mot djur?",
    answer:
      "Nej, och det är värt att veta innan man försöker. Studien som konstruerade säkerhetsprovet undersökte också vilka konstruktionsdrag som förutsäger utfallet: knivtyp, kollisionssensorer, strömavkänning i hjulmotorerna, ultraljudssensorer, klipphöjd, glidplåtar, strålkastare, antal hjul och fram- eller bakhjulsdrift. Inget av dem visade någon säkerställd skyddande effekt. Den som jämför knivtyp jämför alltså något som forskningen inte kunnat koppla till utfallet. Det gör tidsinställningen viktigare än produktvalet.",
  },
  {
    question: "Behöver jag fortfarande begränsningskabel?",
    answer:
      "Nästan ingen ny robot använder den. Av 18 robotgräsklippare i Clas Ohlsons sortiment i augusti 2026 är 17 slinglösa och navigerar med satellit, lidar eller kamera. Slingan har fortfarande en fördel: den bryr sig varken om trädkronor, moln eller motljus, och gränsen ligger exakt där någon grävt ner den. Priset är att den ska läggas ut en gång och sedan sitter där, så en flyttad rabatt betyder spadtag i stället för en knapptryckning. Vill du ha kabel är urvalet i praktiken en modell, och den är avsedd för 300 kvadratmeter.",
  },
  {
    question: "Vad betyder maxlutning i procent?",
    answer:
      "Hur brant en backe roboten kan klippa, uttryckt som höjdökning delat med sträcka. 25 procent betyder att marken stiger en meter på fyra, 45 procent nästan en meter på två, och 80 procent fyra meter på fem. Det låter mycket men är lätt att underskatta i den egna trädgården: en till synes måttlig slänt ner mot en häck ligger ofta kring 25 till 30 procent. Mät den brantaste punkt du vill ha klippt innan du väljer, för det här är den siffra som oftast gör att ett köp inte fungerar.",
  },
  {
    question: "Fungerar satellitnavigering under träd?",
    answer:
      "Sämre, och det är den vanligaste orsaken till att en slinglös robot beter sig oberäkneligt. RTK-satellit behöver fri sikt mot himlen, så tät krona, höga husväggar och smala passager mellan byggnader stör mottagningen. Kameror och lidar har motsatt problem: de klarar sig under träd men behöver ljus och arbetar sämre i skymning och skarpt motljus. Har du mycket träd är en robot som kombinerar satellit med kamera det säkrare valet, eftersom den har något att falla tillbaka på. Råd & Rön beskriver slinglös navigering som flexiblare än kabel men ojämnt tillförlitlig beroende på tomtens form.",
  },
  {
    question: "Hur mycket väsen låter en robotgräsklippare?",
    answer:
      "Under 57 decibel räknas som tyst i den här produktgruppen, ungefär som ett samtal i ett rum. Problemet är att de flesta tillverkare inte anger något tal alls: av robotarna vi jämför är det en enda som skriver ut sin ljudnivå. Det gör det svårt att jämföra i förväg, och det spelar roll av två skäl. Roboten går många timmar i veckan i en trädgård med grannar runt om, och om du vill följa rådet att köra dagtid av hänsyn till igelkottar är det du själv som ska stå ut med ljudet.",
  },
  {
    question: "Hur stor tomt klarar en robotgräsklippare?",
    answer:
      "Modellerna vi jämför anger mellan 300 och 2 000 kvadratmeter, och det finns robotar upp till 5 000. Välj med marginal snarare än exakt. En robot som ligger precis på gränsen måste köra längre och oftare för att hinna med hela ytan, vilket betyder mer ljud, mer slitage och fler laddcykler. Räkna dessutom bara gräset: uppfarter, altaner och rabatter ska inte med i siffran. Är du osäker på hur många kvadratmeter gräs du har går det att mäta ut grovt i en kartapp innan du köper.",
  },
  {
    question: "Klipper roboten blött gräs?",
    answer:
      "Den klipper, men resultatet blir sämre, och det är en av de saker Råd & Rön pekar ut som skiljer robotarna åt. Blött gräs lägger sig och reser sig inte för knivarna, klippet klumpar ihop sig i stället för att falla ner i mattan, och hjulen får sämre grepp i slänter. Svackor i gräsmattan är det andra som ställer till det, av samma skäl. Det talar för att köra ofta och kort snarare än sällan och länge, eftersom kort gräs torkar fortare och kräver mindre av maskinen.",
  },
  {
    question: "Behöver roboten stå inne på vintern?",
    answer:
      "Ja, och det gäller framför allt batteriet. Ett litiumbatteri mår dåligt av att stå urladdat i kyla, så robotarna ska in i förråd eller garage när säsongen är slut, gärna laddade till omkring hälften. Passa samtidigt på med knivbyte och rengöring, för det underlättar starten på våren. Många tillverkare säljer vinterservice, men själva åtgärderna är enkla nog att göra själv om du orkar läsa manualen en gång.",
  },
  {
    question: "Ersätter roboten gräsklipparen helt?",
    answer:
      "På själva gräsmattan, oftast ja. Runt kanterna, nej. En robotgräsklippare når inte ända ut mot en mur, en husvägg eller en rabattkant, eftersom knivarna sitter innanför chassit. Räkna med att trimma kanterna för hand några gånger per säsong. Har du dessutom en yta roboten inte tar sig till, exempelvis en avskild gräsplätt bakom en grind, blir det en handklippare även där. Det är sällan skäl att avstå, men det är skäl att inte göra sig av med den gamla klipparen samma dag.",
  },
];
