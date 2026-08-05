import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { SLACKSPRAY } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /slackspray.
 *
 * Priser, produktnamn, kundbetyg och butikslänkar är lästa på butikernas egna
 * produktsidor 2026-08-05.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans än. Se lib/links.ts.
 *
 * ## Kategorin är liten, och det är kartlagt
 *
 * Fem produkter är hela den svenska marknaden efter ett fullständigt svep, i
 * nivå med /vattenfelsbrytare och /garageportsoppnare. Två fällor bekräftade
 * att den inte är större:
 *
 * 1. **Julas kategori `/brand/slackspray/` innehåller "0 av 0 produkter".**
 * 2. **Brandvarnare.se har ingen släckspraykategori alls**, trots att de är
 *    sajtens bäst betalande program på 15 % / 45 d och för Housegard i övrigt.
 *
 * ⚠️ **Ingen av de fyra butikerna finns i Adtraction**, kontrollerat mot alla
 * 480 program: Nayad, Clas Ohlson, Biltema och Brandspecialisten saknas
 * samtliga, och ingen av dem driver ett eget program vi kunnat hitta. Sidan
 * länkar bästa pris och skeppas före programmet, som alla andra sidor här.
 *
 * ## Effektivitetsklassen är fältet allt hänger på
 *
 * Släcksprayer omfattas av SS-EN 3–7, samma standard som handbrandsläckarna på
 * /brandslackare. Housegards 5A 21B (E) 5F och Taerosols 3A 13B (E) 5F kommer
 * från LTH-rapporten och är bekräftade av två butikers egna produktsidor
 * oberoende av varandra. **Biltema anger ingen klass alls** för någon av sina
 * två sprayer, varken i HTML eller i produkttexten, och det är ett utfall och
 * inget tomrum. Se `ALDRIG_BEDOMD` i lib/spec-schema.mjs: klassen får aldrig
 * gissas eller lånas från en systermodell.
 *
 * ## ⚠️ Housegards påstående får inte skrivas i presens
 *
 * LTH citerar tillverkarens webbplats: "FireStopper är en effektiv släckspray
 * som ligger nära en traditionell handbrandsläckares egenskaper." Citatet är
 * från rapportens arbete omkring 2020, och `housegard.se/brandslackare/
 * slackspray.html` svarar **404** i dag. Meningen tillskrivs därför rapporten
 * och aldrig Housegard i presens. Samma fälla som pressmeddelandet från 2022 på
 * /vattenfelsbrytare.
 *
 * ## Betygen
 *
 * Kriteriepoängen är redaktionell bedömning ur publicerade uppgifter och ur
 * LTH-rapporten. Två av fem produkter har provats mot eld; övriga tre bedöms på
 * vad som är publicerat om dem, och får aldrig ett lånat provresultat.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "housegard-firestopper-600",
    brand: "Housegard",
    name: "FireStopper släckspray 600 ml",
    shortName: "FireStopper 600 ml",
    image: productImage(SLACKSPRAY.slug, "housegard-firestopper-600"),
    tagline: "Högsta klassen av sprayerna, och den enda som räcker i 30 sekunder.",
    scores: {
      slackeffekt: 4.5,
      anvandning: 4.5,
      prisvarde: 3.5,
      uthallighet: 4.5,
    },
    price: 299,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Nayad",
    merchantUrl: "https://nayad.se/product/firestopper-slackspray/",
    award: "winner",
    superlative: "Bäst i test",
    pros: [
      "5A 21B (E) 5F, högsta angivna klassen bland sprayerna här",
      "600 ml räcker 20 till 30 sekunder, längst av de provade",
      "Provad mot fettbrand, alltså kastrullen på spisen",
    ],
    cons: [
      "5A är ungefär en åttondel av det testbål en sexkilos pulversläckare klarar",
      "Vad skumvätskan innehåller är inte publicerat",
    ],
    specs: [
      { label: "Effektivitetsklass", value: "5A 21B (E) 5F", highlight: true },
      { label: "Volym", value: "600 ml", highlight: true },
      { label: "Tömningstid", value: "20–30 s", highlight: true },
      { label: "Släckmedel", value: "Skum, sammansättning ej angiven", highlight: true },
      { label: "Fettbrand", value: "Ja, klass 5F" },
      { label: "Litiumbatteri", value: "Nej" },
      { label: "Kastlängd", value: "Ej angiven" },
      { label: "Temperaturområde", value: "Ej angiven" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Housegard FireStopper är den kraftigaste släcksprayen i jämförelsen och kostar 299 kronor. Klassen på burken lyder 5A 21B (E) 5F, vilket betyder att den provats mot ett större testbål än någon annan spray här, och att den klarar fett i en kastrull. De 600 millilitren räcker i 20 till 30 sekunder, vilket är den längsta insatsen du får ur en spray och nästan dubbelt mot den billigaste. Femman i 5A ska ändå läsas för vad den är. Den lägsta klassning som rekommenderas till hemmet är 43A, alltså ett testbål ungefär åtta gånger större, och den uppnås bara av en sexkilos pulversläckare eller en niolitersskumsläckare. Köp FireStoppern som det den är: den bästa av sprayerna, att ha i köksskåpet eller verktygslådan för att hinna ta en brand medan den är liten. Ska den vara ditt enda brandskydd är det fel produkt, och då köper du en pulversläckare i stället.",
  },
  {
    id: "taerosol-fire-fighter-500",
    userRating: { value: 4.5, count: 84, checkedAt: PRICE_CHECKED },
    brand: "Taerosol",
    name: "Fire Fighter släckspray 500 ml",
    shortName: "Fire Fighter 500 ml",
    image: productImage(SLACKSPRAY.slug, "taerosol-fire-fighter-500"),
    tagline: "Provad mot eld, och den enda sprayen med 84 kundbetyg bakom sig.",
    scores: {
      slackeffekt: 3.5,
      anvandning: 4,
      prisvarde: 4.5,
      uthallighet: 3.5,
    },
    price: 199.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Slackspray-Taerosol-Fire-Fighter,-500-ml/p/36-7746",
    award: "editor",
    superlative: "Bäst för köket",
    pros: [
      "3A 13B (E) 5F angivet, alltså provad även mot fettbrand",
      "199,90 kronor för en spray som gått genom släckförsök",
      "Den mest köpta i jämförelsen, 4,5 av 5 på 84 betyg",
    ],
    cons: [
      "3A är den lägsta angivna klassen här, ungefär en fjortondel av 43A",
      "500 ml töms på 15 till 25 sekunder, kortast av de provade",
    ],
    specs: [
      { label: "Effektivitetsklass", value: "3A 13B (E) 5F", highlight: true },
      { label: "Volym", value: "500 ml", highlight: true },
      { label: "Tömningstid", value: "15–25 s", highlight: true },
      { label: "Släckmedel", value: "AFFF-skum", highlight: true },
      { label: "Fettbrand", value: "Ja, klass 5F" },
      { label: "Litiumbatteri", value: "Nej" },
      { label: "Kastlängd", value: "3–4 m enligt tillverkaren" },
      { label: "Temperaturområde", value: "Ej angiven" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Taerosol Fire Fighter kostar 199,90 kronor och är den spray flest svenskar faktiskt har hemma, med 4,5 av 5 på 84 betyg. Den bär klassen 3A 13B (E) 5F, och det viktiga i den koden är femman före F: sprayen är provad mot fett i en kastrull, vilket är den vanligaste brandstarten i ett kök och precis där en spray hör hemma. Den är en av två produkter i jämförelsen som gått genom riktiga släckförsök. Begränsningarna är två och de hänger ihop. Trean i 3A är den lägsta angivna klassen här, alltså ett litet testbål, och de 500 millilitren är slut på 15 till 25 sekunder. Du har en kort insats mot en liten brand. Köp den till spisen och till bilen, där den är billig nog att finnas på båda ställena. Vill du ha marginal i både klass och tid tar du Housegard FireStopper för hundra kronor mer.",
  },
  {
    id: "biltema-slackspray-500",
    brand: "Biltema",
    name: "Släckspray 500 ml",
    shortName: "Biltema 500 ml",
    image: productImage(SLACKSPRAY.slug, "biltema-slackspray-500"),
    tagline: "Under hundralappen, och billig nog att ligga i varje bil.",
    scores: {
      slackeffekt: 1.5,
      anvandning: 2.5,
      prisvarde: 3.5,
      uthallighet: 2.5,
    },
    price: 99.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandslackare/slackspray-500-ml-2000044487",
    award: "budget",
    superlative: "Billigast",
    pros: [
      "99,90 kronor, en tredjedel av den dyraste sprayen här",
      "Billig nog att ha en i köket, en i bilen och en i garaget",
    ],
    cons: [
      "Vilken brand den klarar är okänt, eftersom ingen klass anges",
      "Kan sprängas vid uppvärmning, enligt butikens egen varningstext",
    ],
    specs: [
      { label: "Effektivitetsklass", value: "Ej angiven", highlight: true },
      { label: "Volym", value: "500 ml", highlight: true },
      { label: "Tömningstid", value: "Ej angiven", highlight: true },
      { label: "Släckmedel", value: "Ej angiven", highlight: true },
      { label: "Fettbrand", value: "Ej angiven" },
      { label: "Litiumbatteri", value: "Nej" },
      { label: "Kastlängd", value: "Ej angiven" },
      { label: "Temperaturområde", value: "Ej angiven" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Biltemas släckspray kostar 99,90 kronor och är den billigaste vägen till en burk i köksskåpet. Till det priset kan du köpa tre och lägga en i bilen, en i garaget och en vid spisen, och en spray du har där branden startar är värd mer än en du inte har. Det du inte får veta är vad den klarar. Ingen effektivitetsklass anges, varken på produktsidan eller i texten, och därmed går det inte att jämföra den med någon annan spray eller att veta när den räcker till. De två sprayer som anger sin klass ligger på 3A och 5A, och var den här hamnar är en öppen fråga. Butikens egen varningstext säger dessutom att tryckbehållaren kan sprängas vid uppvärmning, vilket är skälet att inte förvara den bredvid spisen utan i skåpet under. Köp den om du vill ha flera burkar utspridda och priset avgör. Ska du ha en enda spray och veta vad den duger till tar du Taerosol Fire Fighter för hundra kronor mer.",
  },
  {
    id: "housegard-lith-ex-500",
    brand: "Housegard",
    name: "Lith-EX släckspray AVD 500 ml",
    shortName: "Lith-EX AVD 500 ml",
    image: productImage(SLACKSPRAY.slug, "housegard-lith-ex-500"),
    tagline: "Gjord för brand i elsparkcykelns batteri, inte för kastrullen.",
    scores: {
      slackeffekt: 2,
      anvandning: 3.5,
      prisvarde: 2,
      uthallighet: 3,
    },
    price: 539,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Brandspecialisten",
    merchantUrl:
      "https://brandspecialisten.se/products/housegard-lith-ex-slackspray-avd-500-ml",
    superlative: "Bäst för elcykeln och elsparkcykeln",
    pros: [
      "AVD som släckmedel, framtaget för brand i litiumjonbatterier",
      "Får användas från 5 plusgrader till 60, alltså även i ett förråd",
      "Angiven för hem, hotellrum och fordon",
    ],
    cons: [
      "539 kronor, mer än fem gånger den billigaste sprayen här",
      "Den klass den bär, A, gäller trä och textil och säger inget om batteriet",
    ],
    specs: [
      { label: "Effektivitetsklass", value: "Klass A, tal ej angivet", highlight: true },
      { label: "Volym", value: "500 ml", highlight: true },
      { label: "Tömningstid", value: "Ej angiven", highlight: true },
      { label: "Släckmedel", value: "AVD", highlight: true },
      { label: "Fettbrand", value: "Ej angiven" },
      { label: "Litiumbatteri", value: "Ja, uttalat ändamål" },
      { label: "Kastlängd", value: "Ej angiven" },
      { label: "Temperaturområde", value: "+5 till +60 °C" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Housegard Lith-EX kostar 539 kronor och är gjord för en brand de andra sprayerna inte är gjorda för. Släckmedlet heter AVD och är framtaget för brand i litiumjonbatterier av begränsad storlek, alltså elsparkcykeln i hallen, elcykelbatteriet på laddning och verktygsbatteriet i garaget. Den får användas mellan 5 och 60 grader, vilket räcker för ett förråd men inte för en obehandlad carport i februari. Här finns en sak att förstå innan du köper. Standarden som ger sprayerna sina klasser har ingen klass för brand i litiumjonbatterier, och den A-klass Lith-EX bär gäller trä och textil. Det finns alltså ingen jämförbar siffra som säger hur stort batteri den klarar, och tillverkaren anger inte heller något tal före A. Köp den om du laddar ett stort batteri inomhus och vill ha något på plats som är avsett för just det. Är oron i stället spisen och kastrullen är Taerosol Fire Fighter både billigare och provad mot fett.",
  },
  {
    id: "biltema-slackspray-litium-500",
    brand: "Biltema",
    name: "Släckspray för litium 500 ml",
    shortName: "Biltema litium 500 ml",
    image: productImage(SLACKSPRAY.slug, "biltema-slackspray-litium-500"),
    tagline: "Litiumspray för 349 kronor, tvåhundra under specialisternas.",
    scores: {
      slackeffekt: 1.5,
      anvandning: 3,
      prisvarde: 2.5,
      uthallighet: 2.5,
    },
    price: 349,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/bil---mc/bilinterior/solskydd/slackspray-for-litium-500-ml-2000047225",
    superlative: "Billigaste litiumsprayen",
    pros: [
      "349 kronor, 190 billigare än den andra litiumsprayen här",
      "Säljs i en butik som finns i varje medelstor svensk stad",
    ],
    cons: [
      "Varken klass, släckmedel eller temperaturområde anges",
      "Kan sprängas vid uppvärmning, enligt butikens egen varningstext",
    ],
    specs: [
      { label: "Effektivitetsklass", value: "Ej angiven", highlight: true },
      { label: "Volym", value: "500 ml", highlight: true },
      { label: "Tömningstid", value: "Ej angiven", highlight: true },
      { label: "Släckmedel", value: "Ej angiven", highlight: true },
      { label: "Fettbrand", value: "Ej angiven" },
      { label: "Litiumbatteri", value: "Ja, uttalat ändamål" },
      { label: "Kastlängd", value: "Ej angiven" },
      { label: "Temperaturområde", value: "Ej angiven" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Biltemas litiumspray kostar 349 kronor och är den billigaste vägen till något avsett för batteribrand. Prisskillnaden mot den andra litiumsprayen i jämförelsen är 190 kronor, och den finns i en butik som ligger i varje medelstor svensk stad, vilket betyder att du kan ha den hemma i dag. Sedan tar uppgifterna slut. Vilket släckmedel den innehåller anges inte, ingen effektivitetsklass anges, och inget temperaturområde heller, och det sista spelar roll just för den här produkten, eftersom en elsparkcykel ofta laddas i ett garage eller ett förråd som är kallare än fem grader på vintern. Butikens egen text varnar dessutom för att behållaren kan sprängas vid uppvärmning. Köp den om du vill ha något på plats till elcykeln och priset avgör. Vill du veta vad du köpt kostar Housegard Lith-EX 190 kronor mer och anger både släckmedel och temperaturområde.",
  },
];

/**
 * Övervägda och bortvalda, var och en med ett skäl som går att kontrollera.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Housegard",
    name: "FireStopper släckspray 600 ml",
    reason:
      "Samma produkt som rankas överst, men hos Clas Ohlson. Den ligger här som en anteckning om var den inte går att köpa: butikens produktsida står kvar och visar klassen 5A 21B, men produkten är slutsåld och inget pris publiceras alls. Vi rankar bara produkter vars pris vi kan läsa hos säljaren och datera, och därför länkar raden ovan till Nayad i stället.",
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Slackspray-Housegard-Firestopper/p/36-7017",
  },
  {
    brand: "Housegard",
    name: "Lith-EX släckspray AVD 500 ml, hos Swedron",
    reason:
      "Samma produkt som den rankade Lith-EX, hos en annan återförsäljare. Med här för att visa att den finns på fler ställen än ett, men den får ingen egen rad: två butiker som säljer samma burk är ett prisval, inte två produkter att jämföra.",
    merchant: "Swedron",
    merchantUrl:
      "https://www.swedron.se/fallskaermar-saekerhet/2398-lith-ex-brandslaeckare-slaeckspray-foer-lithiumbraender-500ml",
  },
  {
    brand: "Housegard",
    name: "Pulversläckare 6 kg, 43A 233B C",
    reason:
      "Inte en spray, och med här just därför. Det är den klassning som rekommenderas till hemmet, och den enda produkttyp som når dit tillsammans med niolitersskumsläckaren. Skillnaden mot sprayerna är inte en detalj: 43A mot 5A är ungefär åtta gånger testbålet. Ska du ha ett brandskydd och inte ett komplement är det den här du ska köpa, och den jämförs på vår sida om brandsläckare.",
  },
];

export const SLACKSPRAY_PRODUCTS = resolveProducts(SLACKSPRAY, SEEDS);

export const SLACKSPRAY_CONSIDERED = CONSIDERED;

/**
 * Frågorna är de som faktiskt ställs i kategorin, och svaren står på egna ben
 * eftersom FAQ-rutan kan visas ensam i ett sökresultat.
 */
export const SLACKSPRAY_FAQ = [
  {
    question: "Ersätter en släckspray en brandsläckare?",
    answer:
      "Nej, och skillnaden är större än priset antyder. Släcksprayer klassas enligt samma standard som handbrandsläckare, SS-EN 3–7, och talet före A i koden säger hur stort testbål produkten klarat. De sprayer som anger en klass ligger på 3A och 5A. Den lägsta klassning som rekommenderas till hemmet är 43A 233B C, alltså ett testbål ungefär åtta till fjorton gånger större, och den uppnås bara av en sexkilos pulversläckare eller en niolitersskumsläckare. Sprayen är ett komplement som du har nära, inte ett utbyte.",
  },
  {
    question: "Vad betyder 5A 21B (E) 5F på burken?",
    answer:
      "Det är effektivitetsklassen enligt SS-EN 3–7 och den läses i par. A avser fibrösa bränslen som trä, textil och kartong, och talet är storleken på testbålet. B avser brännbara vätskor, där talet är antalet liter n-heptan i provet. F avser fettbränder, alltså matolja i en kastrull. Bokstaven E inom parentes gäller släckning i elektrisk utrustning och har ersatts av en informativ text. En spray märkt 5A 21B (E) 5F är alltså provad mot alla tre bränsletyperna, men mot små bål.",
  },
  {
    question: "Fungerar en släckspray mot brand i litiumbatterier?",
    answer:
      "Det finns sprayer avsedda för det, med släckmedlet AVD, och de säljs för elsparkcyklar, elcyklar och verktygsbatterier. Men var medveten om en sak: standarden SS-EN 3–7 har ingen klass för brand i litiumjonbatterier. Klassen D, som avser metallbränder, omfattas inte av standarden. Det betyder att den A-klass en litiumspray bär gäller trä och textil, och att det inte finns någon jämförbar siffra som säger hur stort batteri den klarar. Du köper på tillverkarens ändamålsbeskrivning, inte på ett provat tal.",
  },
  {
    question: "Hur länge räcker en släckspray?",
    answer:
      "Kortare än de flesta tror. De två sprayer som gått genom oberoende släckförsök töms på 20 till 30 respektive 15 till 25 sekunder, och det är hela insatsen. Kastlängden är tre till fyra meter mot fem till sju för en pulversläckare, så du står också närmare elden. Beräkningarna i rapporten pekar på att en spray klarar en möbelbrand i ungefär tre minuter efter att brandtillväxten startat, och därefter inte.",
  },
  {
    question: "Var ska släcksprayen förvaras?",
    answer:
      "Nära där det kan börja brinna, men inte där det blir varmt. Aerosolbehållare kan sprängas vid uppvärmning, vilket både den oberoende rapporten och butikernas egen varningstext anger, så skåpet under spisen är en bättre plats än hyllan ovanför den. Tänk också på temperaturen där burken ligger: en spray med angivet område från 5 plusgrader är inte avsedd för en ouppvärmd carport i februari, och de flesta sprayer anger inget område alls.",
  },
  {
    question: "Är en släckspray bättre än inget alls?",
    answer:
      "Ja, och det är det starkaste argumentet för produkten. Den oberoende rapporten noterar att de som omkommit vid släckförsök inte hade använt handbrandsläckare utan exempelvis vatten, och drar slutsatsen att en spray i den situationen hade gett bättre möjlighet att klara sig. Rapporten pekar också ut en grupp den passar särskilt: den som på grund av rörelsesvårigheter inte kan hantera en sexkilos släckare. En spray du kan lyfta med en hand och faktiskt har hemma slår en släckare du inte orkar bära.",
  },
  {
    question: "Vad innehåller släcksprayen?",
    answer:
      "Det varierar, och för flera produkter är det inte publicerat. Taerosol anges använda AFFF-skum, en typ som uppmärksammats för att den kan innehålla fluortensider med potentiellt miljöfarliga egenskaper; alla AFFF-skum innehåller dock inte sådana, och tillverkaren anger att produkten är giftfri och miljöofarlig. Housegards skumsammansättning är enligt den oberoende rapporten en företagshemlighet. Biltemas två sprayer anger inget släckmedel alls. Rapporten som prövade produkterna satte kategorins miljöpåverkan på sin egen lista över vad som återstår att undersöka.",
  },
];
