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
 * navigeringsteknik, ljudnivåer, klippbredder, klipphöjder och vikter. Priser
 * och kundomdömen lästa 2026-08-04, tekniska data 2026-08-06.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte klippt någon
 * gräsmatta, inte mätt någon ljudnivå och inte provat någon robot.
 *
 * ## Tre fynd
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
 * **3. Husqvarnas 600 m² gäller en systematisk gräsmatta.** Husqvarna
 * publicerar två ytkapaciteter för Aspire R6V: 600 m² systematisk och
 * **400 m² oregelbunden**. Butiken och produktnamnet anger bara den högre.
 * En normal villatomt med rabatter och hörn är den oregelbundna.
 *
 * ⚠️ **Igelkottssäkerhet är inget kriterium och får inte bli ett.** Det finns
 * inga publicerade provresultat per modell, och 2024 års studie kunde inte
 * belägga att knivtyp, sensorer, glidplåtar eller hjuldrift förutsäger
 * utfallet. Jämför därför aldrig knivtyp som om det vore ett säkerhetsmått.
 *
 * ## ⚠️ Ljudnivån, och rättelsen 2026-08-06
 *
 * Sidan publicerades med `Ej angiven` på ljudnivån för sex av sju robotar, och
 * byggde ett helt avsnitt, en tagline och ett kriterium på att uppgiften inte
 * gick att få tag i. **Samtliga publicerar den**, inklusive S5 RTK som kom till
 * i samma körning. Fem av talen stod på den produktsida vi redan länkade till:
 *
 * | Robot | Ljudnivå | Källa |
 * |---|---|---|
 * | Luba Mini 2 AWD | 50 dB | se.mammotion.com, butiken vi länkar till |
 * | Dreame A1 Pro | Under 55 dB | Komplett, Bygghemma och Dreames eget lanseringsmaterial |
 * | Sunseeker V3 | 55 dB(A) | Clas Ohlson, butiken vi länkar till |
 * | MOVA ViAX | 57 dB | Clas Ohlson, butiken vi länkar till |
 * | Navimow i105e | 58 dB(A) | Clas Ohlson, butiken vi länkar till |
 * | S5 RTK | 60 dB(A) | Clas Ohlson och Maskinklippet, samstämmigt |
 * | Aspire R6V | 63 dB(A) | husqvarna.com, "upplevd ljudnivå" |
 * | Cocraft CRM16G1 | 64 dB | Clas Ohlson, butiken vi länkar till |
 *
 * ⚠️ Ingen av tillverkarna anger mätavstånd, så talen är jämförbara på
 * storleksordning och inte på decibelen. Det står i tabellens fotnot.
 *
 * ⚠️ Dreames tal är det enda som inte kommer från tillverkarens eller butikens
 * egen spectabell. Tre oberoende källor anger samma sak, och Notebookcheck
 * mätte 50 till 55 dB på en meter. Därför `Under 55 dB` och inte ett exakt tal.
 *
 * ## ⚠️ Aspire R4 har begränsningskabel, och det ändrar en siffra
 *
 * Fas 1 antecknade R4:s gränsmetod som okänd och räknade den som slinglös, så
 * sidan skrev "17 av 18 är slinglösa" och att den som vill ha kabel har **en**
 * modell att välja på. Husqvarna anger `Begränsningstyp: Begränsningskabel`
 * för R4, och Prisjakt beskriver samma sak. Rätt tal är **16 av 18**, och det
 * finns **två** kabelrobotar: Cocraft CRM16G1 för 300 m² och Aspire R4 för
 * 400 m².
 *
 * ## ⚠️ Luckan mellan 45 och 80 procent finns inte
 *
 * Sidan bar meningen "Mellan 45 och 80 finns ingenting alls" i tre fält.
 * Sunseeker S5 RTK anger **60 procent** på den produktsida vi redan länkade
 * till i bortvalslistan, där vi samtidigt skrev att butiken inte angav någon
 * lutning. Tröskelresonemanget är omskrivet efter det, och **S5 RTK är flyttad
 * till rankningen** och ligger trea. Sidan jämför åtta robotar, inte sju.
 *
 * ⚠️ S5 RTK har **drivning på alla tre hjulen**, inte fyrhjulsdrift. Clas
 * Ohlson skriver "Fyrhjulsdrift (AWD)", men tillverkarens egen text hos både
 * Bygghemma och Maskinklippet säger "drivning på alla tre hjulen". Roboten har
 * tre hjul, precis som V3. Vi följer tillverkaren.
 *
 * ⚠️ S5 RTK har **1,0 i kundbetyg på ett enda omdöme** hos Clas Ohlson. Det
 * står i en nackdel och i omdömet. Motonet visar 4,5 på sex omdömen för samma
 * modell, vilket är för spretigt för att väga in; `userRating` följer regeln i
 * data.md och tar butiken vi länkar till.
 *
 * ⚠️ Priset varierar kraftigt: Clas Ohlson 12 995, Motonet 12 499 (bara för
 * upphämtning i fem varuhus), Maskinklippet 16 999, Byggshop 17 343. Prisjakt
 * anger 17 342 som lägsta bland sina fem partnerbutiker. Vi länkar Clas Ohlson,
 * samma butik som sex av åtta andra länkar, och priset är daterat.
 *
 * ## Slinglöst är inte längre ett val
 *
 * 16 av 18 robotar i butikens sortiment är slinglösa. Cocraft CRM16G1 rankas
 * som budgetalternativ, inte som representant för en levande teknikgren.
 *
 * ## Butikerna, och varför de blev som de blev
 *
 * Sex av åtta länkar går till Clas Ohlson, som har bredast sortiment men inget
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
 *
 * ⚠️ Dreames vikt: Clas Ohlson anger 12 kg på två ställen, Kjell anger
 * "12,6 kg utan batteri", vilket är mer än Clas Ohlsons totalvikt och alltså
 * inte internt konsekvent. Vi tar Clas Ohlsons tal.
 */

export const PRICE_CHECKED = "2026-08-04";

/** Tekniska data lästa hos tillverkare och butik. Skild från prisdatumet. */
export const SPECS_CHECKED = "2026-08-06";

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
    tagline: "2 000 kvadratmeter klippt gräs för 11 490 kronor.",
    scores: {
      ytaterrang: 4.5,
      navigering: 4.5,
      klippresultat: 4,
      ljud: 4.5,
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
      "2 000 m², största gräsmattan här, till 5,75 kronor per kvadratmeter",
      "45 procents lutning täcker slänter de flesta villatomter har",
      "3D-lidar ser hinder i förväg i stället för att köra in i dem",
      "22 cm klippbredd, delad bredaste här, så den hinner mer per pass",
      "Laddar på 65 minuter, snabbast av robotarna i jämförelsen",
    ],
    cons: [
      "12 kg, tredje tyngst här, och den ska bäras in när säsongen är slut",
      "Lidar arbetar sämre i motljus än satellitmottagning gör på öppen tomt",
      "12 betyg hos butiken är ett tunt underlag",
    ],
    specs: [
      { label: "Pris", value: "11 490 kr", highlight: true },
      { label: "Klippyta", value: "2 000 m²", highlight: true },
      { label: "Max lutning", value: "45 %", highlight: true },
      { label: "Navigering", value: "3D-lidar", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Ljudnivå", value: "Under 55 dB", highlight: true },
      { label: "Klippbredd", value: "22 cm", highlight: true },
      { label: "Klipphöjd", value: "30–70 mm", highlight: true },
      { label: "Vikt", value: "12 kg", highlight: true },
      { label: "Laddningstid", value: "65 min" },
    ],
    verdict:
      "Dreame A1 Pro klipper 2 000 kvadratmeter och tar 45 procents lutning för 11 490 kronor. Det är den största gräsmattan i jämförelsen och det lägsta priset per kvadratmeter, 5,75 kronor mot 8,12 för den näst rymligaste roboten.\n\n**3D-lidarn ser hindret innan den når det.** Utemöbler, leksaker och rabattkanter blir något roboten kör runt i stället för något du plockar undan varje gång du startar den. Klippbredden på 22 cm är den bredaste här tillsammans med Husqvarnas, och den är skälet till att roboten hinner med dubbla ytan på samma dygn. Under 55 decibel går den dessutom att köra mitt på dagen utan att du behöver gå in, vilket är precis vad rådet om igelkottar kräver.\n\nTvå saker att veta innan du beställer. Den väger 12 kg och ska bäras in i förrådet på hösten. Och samma modellnamn säljs i en variant för 1 000 kvadratmeter som kostar 12 990 kronor, alltså 1 500 mer för halva gräsmattan. Läs vilken yta som står i produktnamnet innan du lägger den i korgen.\n\n**Köp den.** Den täcker mer gräs, tar brantare backar och låter mindre än robotar som kostar flera tusen mer. Den enda tomt där något annat gör ett bättre jobb är den som lutar brantare än 45 procent.",
  },
  {
    id: "mammotion-luba-mini-2-awd",
    name: "Luba Mini 2 AWD",
    shortName: "Luba Mini 2 AWD",
    brand: "Mammotion",
    image: productImage(ROBOTGRASKLIPPARE.slug, "mammotion-luba-mini-2-awd"),
    tagline: "Klipper slänten du annars tar för hand.",
    scores: {
      ytaterrang: 5,
      navigering: 4,
      klippresultat: 4,
      ljud: 5,
      prisvarde: 2.5,
    },
    price: 16089,
    merchant: MAMMOTION,
    merchantUrl: "https://se.mammotion.com/products/robotgrasklippare-luba-mini-2-awd-1000",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för den brantaste slänten",
    pros: [
      "80 procents lutning, 20 procentenheter mer än den näst brantaste här",
      "Fyrhjulsdrift, som är det som gör den branta siffran möjlig",
      "50 dB, tystast av robotarna i jämförelsen",
      "Separat kantkniv på 12 cm klipper ut mot kanten",
      "150 minuters klipptid per laddning, längst här",
    ],
    cons: [
      "16 089 kronor, dyrast av robotarna här",
      "15 kg, tyngst i jämförelsen",
      "1 000 m² för det priset, alltså dyraste gräset per kvadratmeter",
      "Sunseeker S5 RTK tar 60 procents lutning och 600 m² mer för 3 094 kronor mindre",
    ],
    specs: [
      { label: "Pris", value: "16 089 kr", highlight: true },
      { label: "Klippyta", value: "1 000 m²", highlight: true },
      { label: "Max lutning", value: "80 %", highlight: true },
      { label: "Navigering", value: "AI, slinglös", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Ljudnivå", value: "50 dB", highlight: true },
      { label: "Klippbredd", value: "20 cm", highlight: true },
      { label: "Klipphöjd", value: "20–65 mm", highlight: true },
      { label: "Vikt", value: "15 kg", highlight: true },
      { label: "Laddningstid", value: "120 min" },
      { label: "Drivning", value: "Fyrhjulsdrift" },
      { label: "Kantklippning", value: "Separat kantkniv, 12 cm" },
    ],
    verdict:
      "Luba Mini 2 AWD tar 80 procents lutning, 20 procentenheter mer än den näst brantaste roboten här. 16 089 kronor är samtidigt det högsta priset i jämförelsen.\n\n**80 procent betyder att marken stiger fyra meter på fem.** Det är brantare än de flesta trädgårdar har någonstans, och har du en sådan slänt är alternativet att gå dit med handklipparen några gånger per säsong. Den är dessutom tystast av alla åtta med 50 decibel, och en separat kantkniv på 12 cm klipper ut mot kanten så att remsan du annars trimmar för hand blir smalare. 150 minuter per laddning är längst här.\n\nDet du betalar för är drivningen, inte gräset. 1 000 kvadratmeter för 16 089 kronor är dyraste kvadratmetern i jämförelsen, Dreame A1 Pro tar dubbla ytan för 4 599 kronor mindre, och Sunseeker S5 RTK tar 60 procents lutning och 600 kvadratmeter mer för 3 094 kronor mindre. 15 kg gör den till den tyngsta att lyfta.\n\nLutar din brantaste backe mer än 60 procent är det här den enda roboten i jämförelsen som tar den, och då är den värd varenda krona. Ligger backen mellan 45 och 60 gör Sunseeker S5 RTK samma jobb billigare, och är tomten plan betalar du drygt fyra tusen kronor för fyra drivande hjul som aldrig går på.",
  },
  {
    id: "sunseeker-s5-rtk",
    name: "S5 RTK, 1 600 m²",
    shortName: "Sunseeker S5 RTK",
    brand: "Sunseeker",
    image: productImage(ROBOTGRASKLIPPARE.slug, "sunseeker-s5-rtk"),
    tagline: "60 procents backe och 1 600 kvadratmeter i samma robot.",
    scores: {
      ytaterrang: 4.5,
      navigering: 4.5,
      klippresultat: 4,
      ljud: 3,
      prisvarde: 3.5,
    },
    price: 12995,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Sunseeker-S5-RTK-robotgrasklippare-utan-slinga-1600-m2/p/46-3021",
    priceCheckedAt: SPECS_CHECKED,
    userRating: { value: 1, count: 1, checkedAt: SPECS_CHECKED },
    superlative: "Bäst för stora kuperade tomter",
    pros: [
      "60 procents lutning, den enda roboten vi hittat mellan 45 och 80 procent",
      "1 600 m², näst största gräsmattan i jämförelsen",
      "Drivning på alla tre hjulen, som är det som tar den uppför backen",
      "Går att spola av, och sex extra knivar ingår",
      "3 094 kronor mindre än den enda roboten här med brantare backe",
    ],
    cons: [
      "60 dB(A), bland de högre ljudnivåerna i jämförelsen",
      "Ett enda kundomdöme hos butiken, och det är det lägsta möjliga",
      "12,6 kg, näst tyngst av robotarna här",
      "Klipphöjden ställs för hand, inte i appen som hos Dreame",
    ],
    specs: [
      { label: "Pris", value: "12 995 kr", highlight: true },
      { label: "Klippyta", value: "1 600 m²", highlight: true },
      { label: "Max lutning", value: "60 %", highlight: true },
      { label: "Navigering", value: "RTK och dubbla AI-kameror", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Ljudnivå", value: "60 dB(A)", highlight: true },
      { label: "Klippbredd", value: "20 cm", highlight: true },
      { label: "Klipphöjd", value: "20–60 mm", highlight: true },
      { label: "Vikt", value: "12,6 kg", highlight: true },
      { label: "Drivning", value: "Alla tre hjulen" },
      { label: "Underhåll", value: "Går att spola av, 6 extra knivar ingår" },
      { label: "Garanti", value: "2 år, 3 år vid registrering" },
    ],
    verdict:
      "Sunseeker S5 RTK klipper 1 600 kvadratmeter och tar 60 procents lutning för 12 995 kronor. Den är den enda roboten vi hittat som ligger mellan huvudfältets 45 procent och Luba Mini 2:s 80.\n\n**Drivning på alla tre hjulen är det som tar den uppför backen**, och den kombinationen med 1 600 kvadratmeter finns ingen annanstans i det här prisläget. Navigeringen är RTK-satellit tillsammans med dubbla AI-kameror, alltså samma tvåbenta lösning som Navimow men på en robot byggd för fem gånger så stor tomt. Den går att spola av när klippet klibbat fast, och sex extra knivar ingår.\n\nDet finns fyra saker som drar ner den. 60 decibel hör till de högre talen i jämförelsen, 12,6 kg gör den näst tyngst att bära in på hösten, klipphöjden ställs för hand i stället för i appen, och butiken har ett enda kundomdöme på den lägsta möjliga nivån. Ett omdöme säger inte mycket om en produkt, men det säger att ingen ännu vet hur den håller.\n\nLutar din brantaste backe mellan 45 och 60 procent och har du mer än tusen kvadratmeter gräs är det här roboten som löser båda på en gång. Är backen brantare tar Luba Mini 2 AWD den för 3 094 kronor mer, och är tomten plan ger Dreame A1 Pro dig 400 kvadratmeter till för 1 505 kronor mindre.",
  },
  {
    id: "sunseeker-v3",
    name: "V3",
    shortName: "Sunseeker V3",
    brand: "Sunseeker",
    image: productImage(ROBOTGRASKLIPPARE.slug, "sunseeker-v3"),
    tagline: "Spolas ren med slangen när klippet klibbat fast.",
    scores: {
      ytaterrang: 3.5,
      navigering: 4,
      klippresultat: 3.5,
      ljud: 4.5,
      prisvarde: 4,
    },
    price: 7995,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Sunseeker-V3-robotgrasklippare-utan-slinga,-600-m2/p/46-3020",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 6, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som klipper blött",
    pros: [
      "Går att spola av, så klippet inte behöver skrapas bort för hand",
      "42 procents lutning, brantast av robotarna under 10 000 kronor",
      "55 dB, tystare än allt utom Luba Mini 2",
      "9,2 kg, lättast av de slinglösa robotarna här",
      "Tolv extra knivar ingår, ett par säsongers förbrukning",
    ],
    cons: [
      "Sex omdömen hos butiken",
      "Kameranavigering behöver ljus och arbetar sämre i skymning",
      "100 minuters laddning, längst av robotarna under 10 000 kronor",
      "600 m² räcker inte till en stor tomt",
    ],
    specs: [
      { label: "Pris", value: "7 995 kr", highlight: true },
      { label: "Klippyta", value: "600 m²", highlight: true },
      { label: "Max lutning", value: "42 %", highlight: true },
      { label: "Navigering", value: "Dubbla 3D-kameror", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Ljudnivå", value: "55 dB(A)", highlight: true },
      { label: "Klippbredd", value: "18 cm", highlight: true },
      { label: "Klipphöjd", value: "20–60 mm", highlight: true },
      { label: "Vikt", value: "9,2 kg", highlight: true },
      { label: "Laddningstid", value: "100 min" },
      { label: "Underhåll", value: "Går att spola av, 12 extra knivar ingår" },
    ],
    verdict:
      "Sunseeker V3 kostar 7 995 kronor för 600 kvadratmeter och 42 procents lutning. Det är brantare mark än någon annan robot under 10 000 kronor tar sig upp för, och 5 105 kronor mindre än Husqvarna tar för en robot med samma yta och flackare backe.\n\n**Den går att spola av med trädgårdsslangen.** Den som klippt blött gräs vet att klippet klibbar fast under chassit och att alternativet är att vända roboten och skrapa. 55 decibel gör den till den tystaste roboten här efter Luba Mini 2, och 9,2 kg gör den till den lättaste av de slinglösa, vilket märks varje gång den ska bäras. Tolv extra knivar ingår, alltså ett par säsongers förbrukning du slipper köpa.\n\nKameror utan satellitstöd är ett vägval med en tydlig följd: de bryr sig inte om trädkronor eller husväggar, men de behöver ljus. En robot som ska gå i skymningen är fel användning av just den här tekniken. Laddningen tar 100 minuter, längst i sitt prisläge, och sex omdömen är för tunt för att säga något om hur den håller.\n\nHar du träd, skugga och en backe som de billiga robotarna inte klarar är det här roboten som kostar minst av dem som tar sig upp. Ska den gå på kvällen ska du välja Navimow i105e i stället, som har satellit att falla tillbaka på.",
  },
  {
    id: "segway-navimow-i105e",
    name: "Navimow i105e",
    shortName: "Navimow i105e",
    brand: "Segway",
    image: productImage(ROBOTGRASKLIPPARE.slug, "segway-navimow-i105e"),
    tagline: "Satellit under öppen himmel, kamera under trädet.",
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
    superlative: "Bäst för tomten med mycket träd",
    pros: [
      "Hybridnavigering med både RTK-satellit och AI-kamera",
      "VisionFence-kameran känner igen över 150 sorters hinder",
      "27 omdömen med 4,5 i snitt, tredje största underlaget här",
      "IP66, tåligast kapsling av robotarna i jämförelsen",
    ],
    cons: [
      "500 m² är minsta ytan bland de slinglösa robotarna här",
      "30 procents lutning är lägst av de slinglösa",
      "60 minuters klipptid och 60 minuters laddning, alltså halva tiden i boet",
      "Satellitmottagning störs av tät trädkrona, och tomten avgör hur mycket",
    ],
    specs: [
      { label: "Pris", value: "7 990 kr", highlight: true },
      { label: "Klippyta", value: "500 m²", highlight: true },
      { label: "Max lutning", value: "30 %", highlight: true },
      { label: "Navigering", value: "RTK-satellit och AI-kamera", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Ljudnivå", value: "58 dB(A)", highlight: true },
      { label: "Klippbredd", value: "18 cm", highlight: true },
      { label: "Klipphöjd", value: "20–60 mm", highlight: true },
      { label: "Vikt", value: "10,9 kg", highlight: true },
      { label: "Laddningstid", value: "60 min" },
    ],
    verdict:
      "Navimow i105e kostar 7 990 kronor och är den billigaste roboten här som navigerar på två sätt samtidigt. På en tomt med träd är det hela argumentet.\n\n**Satellit och kamera har motsatta svagheter.** RTK-satellit är exakt på öppen mark och tappar positionen under tät krona och tätt intill husväggar. En kamera bryr sig inte om himlen men behöver ljus. Roboten som bär båda har något att falla tillbaka på när det ena sviktar, och Råd & Rön pekar just på att slinglös navigering är flexibel men ojämnt tillförlitlig beroende på tomtens form. VisionFence känner igen över 150 sorters hinder, och IP66 är den tåligaste kapslingen i jämförelsen. 27 omdömen med 4,5 i snitt är det tredje största underlaget här.\n\nStorleken är begränsningen, och den är dubbel. 500 kvadratmeter och 30 procents lutning är minst respektive lägst bland de slinglösa. Roboten klipper dessutom 60 minuter och laddar 60, alltså står den halva arbetsdagen i laddstationen, vilket är skälet till att den lilla ytan verkligen är en gräns och inte en försiktig uppgift.\n\nKöp den till en normalstor och någorlunda plan tomt med träd på, och särskilt om den ska gå på kvällen när kameror ensamma slutar fungera. Är tomten större än 500 kvadratmeter eller brantare än 30 procent växer du ur den första säsongen.",
  },
  {
    id: "mova-viax",
    name: "ViAX",
    shortName: "MOVA ViAX",
    brand: "MOVA",
    image: productImage(ROBOTGRASKLIPPARE.slug, "mova-viax"),
    tagline: "Billigaste vägen bort från begränsningskabeln.",
    scores: {
      ytaterrang: 3.5,
      navigering: 3.5,
      klippresultat: 3.5,
      ljud: 4,
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
      "Laddar 55 minuter och klipper 90 till 100, bästa förhållandet i jämförelsen",
      "20 cm klippbredd trots priset, bredare än båda robotarna kring 8 000 kronor",
      "600 m² och 40 procents lutning för under sextusen",
    ],
    cons: [
      "Kameranavigering utan satellitstöd att falla tillbaka på",
      "Sju omdömen hos butiken",
      "Enklare hinderhantering än de dyrare robotarna",
      "57 dB placerar den mitt i fältet, inte bland de tysta",
    ],
    specs: [
      { label: "Pris", value: "5 990 kr", highlight: true },
      { label: "Klippyta", value: "600 m²", highlight: true },
      { label: "Max lutning", value: "40 %", highlight: true },
      { label: "Navigering", value: "Kameranavigering", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Ljudnivå", value: "57 dB", highlight: true },
      { label: "Klippbredd", value: "20 cm", highlight: true },
      { label: "Klipphöjd", value: "20–60 mm", highlight: true },
      { label: "Vikt", value: "9,8 kg", highlight: true },
      { label: "Laddningstid", value: "55 min" },
    ],
    verdict:
      "MOVA ViAX kostar 5 990 kronor och är den billigaste roboten här som klarar sig utan begränsningskabel. För det får du 600 kvadratmeter och 40 procents lutning, alltså exakt samma två tal som Husqvarna tar 13 100 kronor för.\n\n**Den arbetar mer av dygnet än någon annan robot i jämförelsen.** 55 minuters laddning ger 90 till 100 minuters klippning, medan Navimow laddar lika länge som den klipper och Husqvarna laddar dubbelt så länge. På en gräsmatta som ska hinnas med innan regnet kommer är det skillnaden som märks. Klippbredden på 20 cm är dessutom bredare än hos båda robotarna i prisläget kring 8 000 kronor.\n\nDet du betalar mindre för är navigeringen. Kamera utan satellit har ingenting att falla tillbaka på när ljuset tryter, hinderhanteringen är mer grundläggande än hos de dyrare, och 57 decibel är mitt i fältet snarare än tyst. Sju omdömen säger ingenting om hur den håller över några säsonger.\n\nÄr tomten normalstor, någorlunda öppen och ska klippas på dagen finns det ingen anledning att lägga tiotusen på samma jobb. Ska den gå i skymning eller under täta träd är Navimow i105e värd två tusen till.",
  },
  {
    id: "husqvarna-aspire-r6v",
    name: "Automower Aspire R6V",
    shortName: "Aspire R6V",
    brand: "Husqvarna",
    image: productImage(ROBOTGRASKLIPPARE.slug, "husqvarna-aspire-r6v"),
    tagline: "Reservdelar och verkstad kvar om fem år.",
    scores: {
      ytaterrang: 3.5,
      navigering: 4,
      klippresultat: 4.5,
      ljud: 2.5,
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
      "68 omdömen med 4,5 i snitt, dubbelt så många som näst mest här",
      "Husqvarna har byggt robotgräsklippare längre än något annat märke i fältet",
      "22 cm klippbredd, delad bredaste i jämförelsen",
      "Glidplatta och tre svängbara knivblad, plus GeoFence och larm",
    ],
    cons: [
      "13 100 kronor för 600 m², dyrast per kvadratmeter av robotarna här",
      "600 m² gäller en systematisk gräsmatta; på en oregelbunden anger Husqvarna 400",
      "63 dB, näst högsta ljudnivån i jämförelsen",
      "100 minuters klipptid mot 200 minuters laddning, sämsta förhållandet här",
    ],
    specs: [
      { label: "Pris", value: "13 100 kr", highlight: true },
      { label: "Klippyta", value: "600 m²", highlight: true },
      { label: "Max lutning", value: "40 %", highlight: true },
      { label: "Navigering", value: "AI-kamera, slingfri", highlight: true },
      { label: "Gränsmetod", value: "Utan slinga", highlight: true },
      { label: "Ljudnivå", value: "63 dB(A)", highlight: true },
      { label: "Klippbredd", value: "22 cm", highlight: true },
      { label: "Klipphöjd", value: "20–50 mm", highlight: true },
      { label: "Vikt", value: "9,9 kg", highlight: true },
      { label: "Klippyta, oregelbunden", value: "400 m²" },
      { label: "Laddningstid", value: "200 min" },
    ],
    verdict:
      "Aspire R6V kostar 13 100 kronor och har 68 omdömen med 4,5 i snitt hos butiken, mer än dubbelt så många som någon annan robot här. Det är det starkaste skälet att välja den.\n\n**Husqvarna har byggt robotgräsklippare längre än något annat märke i fältet**, och det syns i sådant som inte står i en specifikationstabell: reservdelar, verkstäder och att roboten fortfarande går att få servad om fem år. Klippbredden på 22 cm är den bredaste här tillsammans med Dreames, den har glidplatta under chassit och tre svängbara knivblad, och stöldskyddet omfattar både GeoFence och larm.\n\nSiffrorna kring priset är svårare. 600 kvadratmeter gäller en systematisk gräsmatta; för en oregelbunden anger Husqvarna själv 400, och en villatomt med rabatter och hörn är den oregelbundna. Roboten klipper 100 minuter och laddar 200, alltså står den två tredjedelar av tiden stilla, och 63 decibel är näst mest i jämförelsen. Dreame A1 Pro tar drygt tre gånger ytan, låter mindre och kostar 1 610 kronor mindre.\n\nKöp den om du vill kunna lämna in roboten på en verkstad i stan om tre år, och om gräsmattan är liten och regelbunden nog att 400 kvadratmeter räcker. Är det kvadratmeter du är ute efter får du dem billigare någon annanstans i den här jämförelsen.",
  },
  {
    id: "cocraft-crm16g1",
    name: "CRM16G1",
    shortName: "Cocraft CRM16G1",
    brand: "Cocraft",
    image: productImage(ROBOTGRASKLIPPARE.slug, "cocraft-crm16g1"),
    tagline: "En tredjedel av priset för den lilla gräsplätten.",
    scores: {
      ytaterrang: 2,
      navigering: 2,
      klippresultat: 3,
      ljud: 2,
      prisvarde: 4.5,
    },
    price: 1999,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Cocraft-CRM16G1-robotgrasklippare-med-slinga,-300-m2/p/41-4006",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 3.5, count: 31, checkedAt: PRICE_CHECKED },
    superlative: "Billigast av alla, med marginal",
    pros: [
      "1 999 kronor, en tredjedel av näst billigaste roboten här",
      "Laddstation, begränsningskabel och anslutningar ingår",
      "Slinga påverkas varken av trädkronor, moln eller motljus",
      "5,5 kg, hälften mot de flesta robotarna här",
      "31 omdömen, näst största underlaget av robotarna i jämförelsen",
    ],
    cons: [
      "300 m² och 25 procents lutning, minst och lägst i jämförelsen",
      "Begränsningskabeln ska grävas ner och sitter sedan där",
      "64 dB, högsta ljudnivån av robotarna här",
      "Klipphöjden har två fasta lägen, 35 eller 50 mm, och inget däremellan",
      "3,5 i kundbetyg, lägst av robotarna här",
    ],
    specs: [
      { label: "Pris", value: "1 999 kr", highlight: true },
      { label: "Klippyta", value: "300 m²", highlight: true },
      { label: "Max lutning", value: "25 %", highlight: true },
      { label: "Navigering", value: "Slinga", highlight: true },
      { label: "Gränsmetod", value: "Begränsningskabel", highlight: true },
      { label: "Ljudnivå", value: "64 dB", highlight: true },
      { label: "Klippbredd", value: "16 cm", highlight: true },
      { label: "Klipphöjd", value: "35/50 mm", highlight: true },
      { label: "Vikt", value: "5,5 kg", highlight: true },
      { label: "Ingår", value: "Laddstation, kabel och anslutningar" },
    ],
    verdict:
      "Cocraft CRM16G1 kostar 1 999 kronor, en tredjedel av näst billigaste roboten i jämförelsen, och är den billigaste av de två kvarvarande robotarna med begränsningskabel.\n\n**Slingan är inte ett sämre val i sig.** Den bryr sig varken om trädkronor, moln eller motljus, och den vet exakt var gränsen går eftersom någon har grävt ner den. Råd & Rön beskriver kabeln som beprövad men oflexibel, och det är en rättvis sammanfattning. 5,5 kg gör den till den enda roboten här som en person lyfter med en hand.\n\nPriset betalas i arbete och i frihet. Kabeln läggs ut en gång, och sedan ligger gränsen där tills du gräver om den, så en flyttad rabatt betyder spadtag i stället för en knapptryckning. 300 kvadratmeter och 25 procents lutning är minst och lägst här, klipphöjden har två fasta lägen i stället för ett intervall, och 64 decibel är den högsta ljudnivån i jämförelsen. 31 omdömen med 3,5 i snitt är det svagaste betyget bland robotarna här.\n\nTill en liten och plan gräsyta där tvåtusen kronor är hela budgeten gör den jobbet, och 31 köpare har tyckt det var värt pengarna. Vill du ha kabel men behöver mer gräs eller finare klipphöjd är Husqvarna Aspire R4 för 6 990 kronor det andra alternativet.",
  },
];

export const ROBOTGRASKLIPPARE_PRODUCTS: Product[] = resolveProducts(
  ROBOTGRASKLIPPARE,
  SEEDS,
);

/**
 * Övervägda men inte rankade.
 *
 * ⚠️ Tre av skälen här löd tidigare "butiken anger ingen maxlutning". Samtliga
 * tre lutningar publiceras: Aspire R4 25 %, Yuka Mini 2 45 % och Sunseeker S5
 * RTK 60 %. Felet låg i vår research. Skälen är omskrivna 2026-08-06.
 *
 * ⚠️ Sunseeker S5 RTK låg här fram till 2026-08-06 och är nu rankad trea. Den
 * fyller luckan mellan 45 och 80 procents lutning som sidan tidigare påstod var
 * tom, och skälet den låg utanför var just det felaktiga påståendet att butiken
 * inte angav någon lutning.
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
    brand: "Husqvarna",
    name: "Automower Aspire R4",
    reason:
      "6 990 kronor för 400 kvadratmeter, Husqvarnas billigaste, och den andra av två robotar i sortimentet som fortfarande använder begränsningskabel. 25 procents lutning är samma tak som Cocraft, alltså den lägsta i kategorin, och 16 cm klippbredd är också den smalaste. Den lämnades utanför till förmån för R6V, som har det stora kundunderlaget och klarar dubbelt så brant mark. Vill du ha kabel och behöver mer än 300 kvadratmeter är det här alternativet till Cocraft.",
    approxPrice: 6990,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Husqvarna-Automower-Aspire-R4-med-tillbehor,-400-m2/p/46-3011",
  },
  {
    brand: "Mammotion",
    name: "Yuka Mini 2, 800 m²",
    reason:
      "10 490 kronor för 800 kvadratmeter och 45 procents lutning. Den ligger 1 000 kronor under Dreame A1 Pro utan att komma i närheten av dess yta, och tar samma backe. 19 cm klippbredd och 10,6 kg. Är 800 kvadratmeter mer än du har gräs är prisskillnaden verklig, men för de flesta tomter är Dreames extra 1 200 kvadratmeter värda tusenlappen.",
    approxPrice: 10490,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Mammotion-Yuka-Mini-2-AI-robotgrasklippare,-800-m2/p/10-1-9",
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
    brand: "Mammotion",
    name: "Luba 3 AWD, 5 000 m²",
    reason:
      "36 789 kronor och dyrast av allt vi kartlagt. Den klarar 5 000 kvadratmeter och 80 procents lutning, vilket är imponerande och fel produkt för en villatomt. Råd & Röns test avser robotar för vanliga villatomter, och den här är byggd för en helt annan sorts mark. Har du fem tusen kvadratmeter gräs är det en annan jämförelse du behöver än den här.",
    approxPrice: 36789,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Mammotion-Luba-3-AWD-AI-robotgrasklippare,-5000-m2/p/10-1-5",
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
      "Dreame A1 Pro i varianten för 2 000 kvadratmeter, 11 490 kronor. Den ger störst tomt per krona av robotarna vi jämför, klarar 45 procents lutning, navigerar med 3D-lidar som ser hinder i förväg och håller sig under 55 decibel. Kontrollera vilken variant du lägger i korgen: samma modellnamn finns för 1 000 kvadratmeter och kostar då 12 990 kronor, alltså 1 500 mer för halva ytan. Lutar tomten brantare än 45 procent någonstans är svaret ett annat: Sunseeker S5 RTK tar 60 procent för 12 995 kronor och Mammotion Luba Mini 2 AWD 80 procent för 16 089.",
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
      "Nästan ingen ny robot använder den. Av 18 robotgräsklippare i Clas Ohlsons sortiment i augusti 2026 är 16 slinglösa och navigerar med satellit, lidar eller kamera. Slingan har fortfarande en fördel: den bryr sig varken om trädkronor, moln eller motljus, och gränsen ligger exakt där någon grävt ner den. Priset är att den ska läggas ut en gång och sedan sitter där, så en flyttad rabatt betyder spadtag i stället för en knapptryckning. Vill du ha kabel finns två modeller att välja mellan: Cocraft CRM16G1 för 300 kvadratmeter och 1 999 kronor, och Husqvarna Automower Aspire R4 för 400 kvadratmeter och 6 990.",
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
      "Mellan 50 och 64 decibel bland robotarna vi jämför, alltså från ett lågmält samtal till en samtalston du hör genom ett öppet fönster. Mammotion Luba Mini 2 AWD är tystast med 50 dB, följd av Dreame A1 Pro och Sunseeker V3 kring 55. Högst ligger Cocraft CRM16G1 på 64 dB och Husqvarna Aspire R6V på 63. Skillnaden på fjorton decibel är stor i praktiken, eftersom decibelskalan är logaritmisk. Det spelar roll av två skäl: roboten går många timmar i veckan i en trädgård med grannar runt om, och rådet att köra dagtid av hänsyn till igelkottar förutsätter att du själv står ut med ljudet när du är ute. Tillverkarna anger inte mätavstånd, så jämför talen som storleksordningar snarare än på decibelen.",
  },
  {
    question: "Hur stor tomt klarar en robotgräsklippare?",
    answer:
      "Modellerna vi jämför anger mellan 300 och 2 000 kvadratmeter, och det finns robotar upp till 5 000. Välj med marginal snarare än exakt. En robot som ligger precis på gränsen måste köra längre och oftare för att hinna med hela ytan, vilket betyder mer ljud, mer slitage och fler laddcykler. Läs också hur ytan är angiven: Husqvarna publicerar 600 kvadratmeter för Aspire R6V på en systematisk gräsmatta men 400 på en oregelbunden, och en villatomt med rabatter och hörn är den oregelbundna. Räkna dessutom bara gräset: uppfarter, altaner och rabatter ska inte med i siffran.",
  },
  {
    question: "Hur länge klipper roboten mellan laddningarna?",
    answer:
      "Mellan 60 och 150 minuter bland robotarna vi jämför, och laddningstiden avgör lika mycket som klipptiden. MOVA ViAX laddar 55 minuter och klipper 90 till 100, alltså nästan två timmars arbete per timmes laddning. Navimow i105e klipper 60 minuter och laddar 60, och Husqvarna Aspire R6V klipper 100 minuter och laddar 200, alltså står den två tredjedelar av tiden. Förhållandet mellan de två talen är det som avgör hur stor yta roboten hinner med på ett dygn, och det är därför två robotar med samma angivna kvadratmeter ändå kan skilja sig åt i praktiken.",
  },
  {
    question: "Klipper roboten blött gräs?",
    answer:
      "Den klipper, men resultatet blir sämre, och det är en av de saker Råd & Rön pekar ut som skiljer robotarna åt. Blött gräs lägger sig och reser sig inte för knivarna, klippet klumpar ihop sig i stället för att falla ner i mattan, och hjulen får sämre grepp i slänter. Svackor i gräsmattan är det andra som ställer till det, av samma skäl. Det talar för att köra ofta och kort snarare än sällan och länge, eftersom kort gräs torkar fortare och kräver mindre av maskinen. Klipper du ofta i blött väder är det värt att välja en robot som går att spola av, som Sunseeker V3.",
  },
  {
    question: "Behöver roboten stå inne på vintern?",
    answer:
      "Ja, och det gäller framför allt batteriet. Ett litiumbatteri mår dåligt av att stå urladdat i kyla, så robotarna ska in i förråd eller garage när säsongen är slut, gärna laddade till omkring hälften. Väg in hur tung den är innan du köper: robotarna här väger mellan 5,5 och 15 kilo, och den tyngsta ska bäras samma sträcka som den lättaste. Passa samtidigt på med knivbyte och rengöring, för det underlättar starten på våren. Många tillverkare säljer vinterservice, men själva åtgärderna är enkla nog att göra själv om du orkar läsa manualen en gång.",
  },
  {
    question: "Ersätter roboten gräsklipparen helt?",
    answer:
      "På själva gräsmattan, oftast ja. Runt kanterna, nej. En robotgräsklippare når inte ända ut mot en mur, en husvägg eller en rabattkant, eftersom knivarna sitter innanför chassit. Räkna med att trimma kanterna för hand några gånger per säsong, eller välj en robot med separat kantkniv som Luba Mini 2 AWD, där en extra skiva på 12 centimeter klipper längre ut. Har du dessutom en yta roboten inte tar sig till, exempelvis en avskild gräsplätt bakom en grind, blir det en handklippare även där. Det är sällan skäl att avstå, men det är skäl att inte göra sig av med den gamla klipparen samma dag.",
  },
];
