import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { BRANDSLACKARE } from "@/lib/test-pages";

/**
 * Brandsläckare. Underlag i .agent/research/brandslackare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser (2026-08-02), och specifikationerna
 * (2026-08-06) från tillverkarnas och importörernas egna sidor och produktblad:
 * housegard.se för de två Housegard-släckarna, deltronic.se och brandvarnare.se
 * för de tre Deltronic-släckarna, biltema.se för Biltemas, kjell.com för
 * enkilossläckaren.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte tänt eld på något.
 *
 * ## Vad researchen 2026-08-06 rev upp
 *
 * Sidan påstod på nio ställen att butikerna inte anger sitt typgodkännande, och
 * byggde vinnaren på att Biltema var "enda som skriver ut sitt typgodkännande".
 * Det var fel i alla fall utom ett:
 *
 * - Brandvarnare.se anger `EN3-7:2004+A1:2007 (EN3-10:2009)` på **alla tre**
 *   släckarna, under fliken "Ytterligare information" på de sidor vi länkade.
 * - Housegard anger `EN3-7, CE, Wheelmark` i sin egen specifikation för 600170.
 * - Manometer: sagt om 1 av 7, gäller **7 av 7**. Kjell skriver "Försedd med
 *   manometer" på alla tre sina, Biltema i produkttexten, och Deltronic i
 *   skötselavsnittet på var och en.
 * - Väggfäste till Kjells enkilos: "Röd modell levereras med väggfäste, vit
 *   utan." Sidan sa att uppgiften saknades.
 *
 * ## Färgen är inte en smakfråga, den är godkännandet
 *
 * SS-EN 3-7 punkt 16.1 kräver röd färg. En vit släckare kan därför inte vara
 * EN 3-7-certifierad, hur hög effektklass den än har. Housegards två släckare
 * visar det rent: samma modell PE6HR-A, samma 55A 233B C, samma kropp — den
 * röda (600170) har `EN3-7, CE, Wheelmark`, den vita (600169) har bara `CE`.
 *
 * Brandskyddsföreningens norm SBF 2011:1 bygger på just den punkten: en
 * hembrandsläckare ska uppfylla samtliga krav i SS-EN 3-7 **utom** 16.1 om
 * färgen, vara pulver, väga 6 kg och klara provbål 43A och 233B.
 *
 * Det är därför `placeringsfrihet` finns som kriterium och `tillforlitlighet`
 * inte gör det. Se doc-kommentaren i lib/test-pages.ts och rättelsen i
 * lib/corrections.ts.
 *
 * ## En konflikt som är kvar
 *
 * Deltronics produktblad `Brandslackare-ABC.pdf` anger 42A 233B C och enbart
 * `CE-0029` för artikel 60505 (vit 6 kg), medan deras produktsida och
 * deltronic.se anger 55A 233B C och EN3-7. Bladet beskriver en äldre fyllning
 * (ABC 30 torr pulver), sidorna den nuvarande (Furex S ABC), och båda gäller
 * samma artikelnummer. Vi följer de två aktuella sidorna. Noterat i
 * researchfilen.
 *
 * ## Butiksfördelning
 *
 * Kjell tre, Brandvarnare.se tre, Biltema en. Brandvarnare.se är den enda
 * annonserbara butiken i brandfamiljen. Biltema finns inte i något
 * affiliatenätverk vi kan söka till, vilket inte påverkat placeringen åt något
 * håll: Biltemas sexkilos steg från tredje till andra plats i omräkningen.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

/** Specifikationerna lästa på tillverkarnas och importörernas egna sidor. */
export const SPECS_CHECKED = "2026-08-06";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "housegard-6-kg-rod",
    name: "Brandsläckare med pulver 6 kg röd",
    shortName: "Housegard 6 kg",
    brand: "Housegard",
    image: productImage(BRANDSLACKARE.slug, "housegard-6-kg-rod"),
    tagline: "Högsta effektklassen, och godkänd att stå ute året om.",
    scores: { slackeffekt: 5, placeringsfrihet: 5, hanterbarhet: 3, utrustning: 5, prisvarde: 3 },
    price: 699,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandslackare/housegard-brandslackare-med-pulver-6-kg-rod-p21233",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 21, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för garaget och stugan",
    pros: [
      "55A 233B C, högsta effektklassen en sexkilos når",
      "Certifierad enligt EN3-7, CE och Wheelmark, alltså godkänd att hänga var som helst",
      "Provad för −30 till +60 °C och godkänd för utomhusbruk",
      "Väggfäste och manometer följer med",
      "Kastlängd 4 till 6 meter, så du kan hålla avstånd till lågorna",
    ],
    cons: [
      "699 kronor, högst pris i jämförelsen",
      "9 kilo fylld, vilket inte alla i hushållet lyfter ur ett väggfäste",
      "Samma effektklass finns för 579 kronor, fast bara i vitt",
    ],
    specs: [
      /* housegard.se, art. 600170, modell PE6HR-A, läst 2026-08-06. */
      { label: "Effektklass", value: "55A 233B C", highlight: true },
      { label: "Certifiering", shortLabel: "Godkänd", value: "EN3-7, CE, Wheelmark", highlight: true },
      { label: "Får placeras", shortLabel: "Placering", value: "Överallt", highlight: true },
      { label: "Släckmedel", value: "6 kg pulver ABC", highlight: true },
      { label: "Manometer", value: "Ja", highlight: true },
      { label: "Temperaturområde", shortLabel: "Temp", value: "−30 till +60 °C", highlight: true },
      { label: "Väggfäste", value: "Ingår", highlight: true },
      { label: "Mått", value: "Ø150 × 519 mm", highlight: true },
      { label: "Tömningstid", value: "22 sekunder" },
      { label: "Arbetstryck", value: "15 bar" },
      { label: "Kastlängd", value: "4–6 m" },
      { label: "Drivgas", value: "Kvävgas" },
      { label: "Utomhus", value: "Ja, ej frostkänslig" },
      { label: "Artikelnummer", value: "600170 (Kjell 21233)" },
    ],
    verdict:
      "Housegards röda sexkilos klarar mest eld av släckarna här och är den enda som är godkänd för utomhusbruk. Den kostar 699 kronor.\n\n55A 233B C är den högsta effektklassen en sexkilos når: släckyta upp till 5,5 meter från munstycket och 233 liter brinnande vätska. Certifieringen är EN3-7 och färgen är en del av den, så den här släckaren får hänga i trapphuset och i det delade garaget lika gärna som innanför din egen dörr. Kastlängden är 4 till 6 meter, alltså kan du stå kvar i dörröppningen medan du släcker.\n\nDen är också provad för −30 till +60 grader och uttryckligen godkänd för utomhusbruk. I ett ouppvärmt garage eller en stuga som står kall från november till april är det skillnaden mellan en släckare som fungerar och en du får hoppas på. Väggfäste följer med, och manometern på ventilen visar på en sekund att trycket finns kvar.\n\nPriset är den enda invändningen. 699 kronor är högst i jämförelsen, och 55A finns för 579 hos Brandvarnare.se, fast bara i vitt, som inte får sitta någon annanstans än i din egen bostad.\n\nKöp den. Högsta effektklassen, fri placering och den enda släckaren tillverkaren skriver ut att du får hänga utomhus, är vad de 699 kronorna köper.",
  },
  {
    id: "biltema-pulver-6-kg",
    name: "Brandsläckare pulver ABC 6 kg",
    shortName: "Biltema 6 kg",
    brand: "Biltema",
    image: productImage(BRANDSLACKARE.slug, "biltema-pulver-6-kg"),
    tagline: "Billigast av sexkilosen, med manometer och övertrycksventil.",
    scores: { slackeffekt: 4, placeringsfrihet: 5, hanterbarhet: 3, utrustning: 4.5, prisvarde: 5 },
    price: 489,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandslackare/brandslackare-pulver-abc-6-kg-2000046826",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Billigast av sexkilosen",
    pros: [
      "489 kronor, 210 under den dyraste sexkilosen",
      "Typgodkänd enligt EN 3-7/8 och röd, alltså godkänd för trapphus och uthyrning",
      "Manometer, övertrycksventil och sprutmunstycke",
      "Tål −30 till +60 °C, även i ett ouppvärmt garage",
      "Godkänd för elektrisk utrustning upp till 1 000 V på en meters avstånd",
    ],
    cons: [
      "43A, alltså 4,3 meters släckyta mot 5,5 för de starkaste",
      "Finns bara i varuhus och på Biltemas egen sajt, inte hos någon annan butik",
      "Ø16 centimeter är bredast av sexkilosen, vilket märks i en smal städskrubb",
    ],
    specs: [
      /* biltema.se, art. 21-837, läst 2026-08-06. Väggfäste nämns inte i
         produkttexten och står inte i något dokument vi nått; Biltema säljer en
         separat monteringssats. Se researchfilen. */
      { label: "Effektklass", value: "43A 233B C", highlight: true },
      { label: "Certifiering", shortLabel: "Godkänd", value: "EN 3-7/8", highlight: true },
      { label: "Får placeras", shortLabel: "Placering", value: "Överallt", highlight: true },
      { label: "Släckmedel", value: "6 kg Prestolit ABC", highlight: true },
      { label: "Manometer", value: "Ja", highlight: true },
      { label: "Temperaturområde", shortLabel: "Temp", value: "−30 till +60 °C", highlight: true },
      { label: "Väggfäste", value: "Ej angiven", highlight: true },
      { label: "Mått", value: "Ø160 × 550 mm", highlight: true },
      { label: "Övertrycksventil", value: "Ja" },
      { label: "Elsäkerhet", value: "Upp till 1 000 V på 1 m" },
      { label: "Artikelnummer", value: "21-837" },
    ],
    verdict:
      "Biltemas sexkilos kostar 489 kronor. Det är 210 kronor under den dyraste släckaren i jämförelsen och den lägsta prislappen på en fullstor pulversläckare vi hittat.\n\nEffektklassen är 43A 233B C, typgodkänd enligt EN 3-7/8. Röd färg ingår i det godkännandet, vilket betyder att den får hänga i trapphuset, i det gemensamma garaget och i en lägenhet du hyr ut. Det är tre platser en vit släckare är utesluten från. Utrustningen är också den mest kompletta här: manometer, övertrycksventil och sprutmunstycke. Övertrycksventilen släpper undan trycket om behållaren blir för varm, vilket är precis vad som händer om elden hinner fram till släckaren där den hänger.\n\nTemperaturområdet −30 till +60 grader betyder att garaget, uthuset och sommarstugan är fria placeringar, och 1 000 volt på en meters avstånd gör den användbar mot brand i elcentralen.\n\nDet du betalar med är släckyta. 43A räcker 4,3 meter från munstycket, en 55A når 5,5. Har du en verkstad, ett garage med bensin eller ett hus i två plan är det den marginalen du väljer bort.\n\nFör en lägenhet eller en normal villa är det här släckaren att ta hem, och de 210 kronorna räcker till en brandfilt och två brandvarnare. Vill du ha 55A i rött kostar det 699 kronor hos Kjell.",
  },
  {
    id: "brandvarnare-se-vit-6-kg",
    name: "Brandsläckare vit 6 kg",
    shortName: "Vit 6 kg",
    brand: "Deltronic",
    image: productImage(BRANDSLACKARE.slug, "brandvarnare-se-vit-6-kg"),
    tagline: "Högsta effektklassen, 120 kronor under närmaste röda.",
    scores: { slackeffekt: 5, placeringsfrihet: 2, hanterbarhet: 3, utrustning: 4.5, prisvarde: 4.5 },
    price: 579,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandslackare-vit-6kg/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigaste 55A",
    pros: [
      "55A 233B C, samma effektklass som testvinnaren",
      "120 kronor billigare än närmaste röda släckare i samma klass",
      "Väggfäste och manometer följer med",
      "Vit gör att den kan hänga framme i hallen i stället för i städskåpet",
      "2 års garanti och svensk importör",
    ],
    cons: [
      "Får bara sitta i en privatbostad, inte i trapphus, delat garage eller uthyrd lägenhet",
      "9,4 kilo fylld och 51 centimeter hög",
      "Vill du ha samma klass utan placeringsbegränsning kostar Housegards röda 120 kronor mer",
    ],
    specs: [
      /* brandvarnare.se och deltronic.se, art. 60505, EAN 7332211605051, lästa
         2026-08-06. Temperaturområdet kommer från Deltronics produktblad för
         samma artikelnummer. Bladet anger 42A och enbart CE-0029 för en äldre
         fyllning; konflikten är beskriven i doc-kommentaren ovan. */
      { label: "Effektklass", value: "55A 233B C", highlight: true },
      { label: "Certifiering", shortLabel: "Godkänd", value: "EN3-7:2004+A1:2007", highlight: true },
      { label: "Får placeras", shortLabel: "Placering", value: "Endast privat hemmiljö", highlight: true },
      { label: "Släckmedel", value: "6 kg Furex S ABC", highlight: true },
      { label: "Manometer", value: "Ja", highlight: true },
      { label: "Temperaturområde", shortLabel: "Temp", value: "−30 till +60 °C", highlight: true },
      { label: "Väggfäste", value: "Ingår", highlight: true },
      { label: "Mått", value: "510 × 175 × 185 mm", highlight: true },
      { label: "Fylld vikt", value: "9,4 kg" },
      { label: "Garanti", value: "2 år" },
      { label: "Tillverkare", value: "Ogniochron, Polen" },
      { label: "Artikelnummer", value: "60505" },
    ],
    verdict:
      "Vit 6 kg från Brandvarnare.se har högsta effektklassen och kostar 579 kronor, alltså 120 kronor mindre än den billigaste röda släckaren med samma klass.\n\n55A 233B C ger släckyta upp till 5,5 meter och 233 liter brinnande vätska, alltså samma prestanda som testvinnaren, till fyra femtedelar av priset. Väggfäste ingår, manometern sitter på ventilen och släckaren väger 9,4 kilo fylld. Den vita kroppen gör att den kan hänga i hallen i stället för bakom dammsugaren, och en släckare du når på tre sekunder är värd mer än en du gräver fram på trettio.\n\nFärgen kostar dig platser, och det är den verkliga invändningen. Deltronic skriver själva att vita släckare bara är avsedda för hemmiljö och inte får sitta på allmänna ytor. Trapphuset, det gemensamma garaget och lägenheten du hyr ut på somrarna är alltså uteslutna, och SS-EN 3-7 kräver röd färg, så någon annan läsning finns inte.\n\nSka släckaren hänga innanför din egen dörr är det här mest släckeffekt per krona i hela jämförelsen. Ska en granne, en hyresgäst eller en hantverkare hitta den tar du butikens röda i stället.",
  },
  {
    id: "brandvarnare-se-rod-6-kg",
    name: "Brandsläckare röd 6 kg",
    shortName: "Röd 6 kg",
    brand: "Deltronic",
    image: productImage(BRANDSLACKARE.slug, "brandvarnare-se-rod-6-kg"),
    tagline: "Röd sexkilos med väggfäste, hemkörd till dörren.",
    scores: { slackeffekt: 4, placeringsfrihet: 5, hanterbarhet: 3, utrustning: 4.5, prisvarde: 3.5 },
    price: 529,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandslackare-rod-6kg-2/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst om den ska hem till dörren",
    pros: [
      "Röd och godkänd enligt EN3-7:2004+A1:2007, alltså fri placering",
      "Väggfäste och manometer följer med",
      "25 sekunders tömningstid, längst av släckarna i jämförelsen",
      "Kan stå på golvet eller hänga på vägg",
      "2 års garanti och svensk importör",
    ],
    cons: [
      "40 kronor dyrare än Biltemas släckare med samma effektklass och godkännande",
      "43A, alltså 4,3 meters släckyta mot 5,5 för butikens egen vita",
      "9,4 kilo fylld",
    ],
    specs: [
      /* brandvarnare.se och deltronic.se, art. 60500, EAN 7332211605006, lästa
         2026-08-06. Temperatur och tömningstid från Deltronics produktblad för
         samma artikelnummer. */
      { label: "Effektklass", value: "43A 233B C", highlight: true },
      { label: "Certifiering", shortLabel: "Godkänd", value: "EN3-7:2004+A1:2007", highlight: true },
      { label: "Får placeras", shortLabel: "Placering", value: "Överallt", highlight: true },
      { label: "Släckmedel", value: "6 kg Furex S Pro", highlight: true },
      { label: "Manometer", value: "Ja", highlight: true },
      { label: "Temperaturområde", shortLabel: "Temp", value: "−30 till +60 °C", highlight: true },
      { label: "Väggfäste", value: "Ingår", highlight: true },
      { label: "Mått", value: "510 × 175 × 185 mm", highlight: true },
      { label: "Fylld vikt", value: "9,4 kg" },
      { label: "Tömningstid", value: "25 sekunder" },
      { label: "Garanti", value: "2 år" },
      { label: "Artikelnummer", value: "60500" },
    ],
    verdict:
      "Röd 6 kg från Brandvarnare.se kostar 529 kronor och är den billigaste röda sexkilossläckaren som kommer hem till dörren.\n\n43A 233B C, godkänd enligt EN3-7:2004+A1:2007, med väggfäste i lådan. Röd betyder att den får hänga där du vill ha den: trapphuset, det gemensamma garaget, stugan du hyr ut i juli. Tömningstiden är 25 sekunder, längst av släckarna här, vilket ger dig fler försök om det första svepet hamnar i lågorna i stället för i glöden.\n\nDen är också samma kropp som butikens vita, 9,4 kilo fylld och 51 centimeter hög, men 50 kronor billigare och utan placeringsbegränsningen. Det du får mindre av är släckyta: 4,3 meter mot 5,5.\n\nInvändningen är 40 kronor. Biltemas sexkilos har samma effektklass och samma godkännande för 489, och skillnaden är att den här kommer med posten och med ett fäste.\n\nHar du inget Biltemavaruhus i närheten är det här samma släckare för 40 kronor mer, och det bästa köpet i butiken. Vill du hellre ha 55A ligger den vita 50 kronor högre, men bara innanför din egen dörr.",
  },
  {
    id: "housegard-design-6-kg-vit",
    name: "Brandsläckare Design Edition med pulver 6 kg vit",
    shortName: "Design Edition",
    brand: "Housegard",
    image: productImage(BRANDSLACKARE.slug, "housegard-design-6-kg-vit"),
    tagline: "55A som får hänga framme i hallen i stället för i städskåpet.",
    scores: { slackeffekt: 5, placeringsfrihet: 2, hanterbarhet: 3, utrustning: 5, prisvarde: 2.5 },
    price: 699,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandslackare/housegard-brandslackare-design-edition-med-pulver-6-kg-vit-p21067",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 50, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för hallen där den syns",
    pros: [
      "55A 233B C, samma effektklass och samma kropp som testvinnaren",
      "Väggfäste och manometer följer med",
      "Provad för −30 till +60 °C",
      "Ritad för att stå framme, vilket är hela poängen med en släckare du hittar snabbt",
    ],
    cons: [
      "CE-märkt men inte EN 3-7-certifierad, eftersom standarden kräver röd färg",
      "Får bara sitta i en privatbostad där de boende vet var den hänger",
      "Kostar lika mycket som den röda som saknar begränsningen",
      "Samma klass i vitt finns för 579 kronor hos en annan butik",
    ],
    specs: [
      /* housegard.se, art. 600169, modell PE6HR-A, läst 2026-08-06.
         Certifieringsfältet hos tillverkaren anger enbart CE, och Kjell skriver
         "OBS: Ej EN3-klassad". Samma modellbeteckning som den röda 600170. */
      { label: "Effektklass", value: "55A 233B C", highlight: true },
      { label: "Certifiering", shortLabel: "Godkänd", value: "CE, ej EN 3-7", highlight: true },
      { label: "Får placeras", shortLabel: "Placering", value: "Endast privat hemmiljö", highlight: true },
      { label: "Släckmedel", value: "6 kg pulver ABC", highlight: true },
      { label: "Manometer", value: "Ja", highlight: true },
      { label: "Temperaturområde", shortLabel: "Temp", value: "−30 till +60 °C", highlight: true },
      { label: "Väggfäste", value: "Ingår", highlight: true },
      { label: "Mått", value: "Ø150 × 519 mm", highlight: true },
      { label: "Tömningstid", value: "22 sekunder" },
      { label: "Arbetstryck", value: "15 bar" },
      { label: "Kastlängd", value: "5–8 m" },
      { label: "Artikelnummer", value: "600169 (Kjell 21067)" },
    ],
    verdict:
      "Design Edition är den vita versionen av testvinnaren. Samma kropp, samma 55A, samma pris på 699 kronor.\n\nEffektklassen är 55A 233B C, tömningstiden 22 sekunder och temperaturområdet −30 till +60 grader, precis som hos den röda. Kastlängden är till och med längre, 5 till 8 meter. Väggfäste ingår och manometern sitter på ventilen. Det du köper utöver släckeffekten är att den får stå framme: den är ritad för att hänga i hallen bredvid ytterdörren i stället för att gömmas, och det är ett riktigt brandskyddsargument, eftersom den släckare du når snabbast är den som gör nytta.\n\nFärgen har sitt pris i vad den får göra. Vit betyder CE-märkning men inte EN 3-7-certifiering, för standarden kräver rött, och Kjell skriver ut följden: endast privat bruk i hemmamiljö där användaren vet var släckaren är placerad. Trapphus, delat garage och uthyrning faller bort.\n\nVill du ha en vit 55A som får hänga framme finns samma klass för 579 kronor hos Brandvarnare.se, 120 billigare. Den här är värd sina 699 bara om det är just den här designen som får dig att faktiskt sätta upp en släckare i hallen.",
  },
  {
    id: "brandvarnare-se-rod-2-kg",
    name: "Brandsläckare röd 2 kg",
    shortName: "Röd 2 kg",
    brand: "Deltronic",
    image: productImage(BRANDSLACKARE.slug, "brandvarnare-se-rod-2-kg"),
    tagline: "Fyra kilo fylld, godkänd och röd, för båten och husvagnen.",
    scores: { slackeffekt: 2.5, placeringsfrihet: 5, hanterbarhet: 4.5, utrustning: 4.5, prisvarde: 4 },
    price: 349,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandslackare-rod_2kg/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för båten och husvagnen",
    pros: [
      "4 kilo fylld och 37,5 centimeter hög, alltså hanterbar för alla i hushållet",
      "Godkänd enligt EN3-7:2004+A1:2007 och röd, så den duger även i gemensamma utrymmen",
      "Väggfäste och manometer följer med",
      "13A 89B C, 62 procent mer släckeffekt än en enkilos",
      "Uppfyller den storlek försäkringsvillkoren brukar kräva ombord på båt",
    ],
    cons: [
      "13A räcker inte som enda skydd i en bostad, där rekommendationen är 6 kilo",
      "Ø11,5 centimeter smal kropp betyder också kortare tömningstid, 15 sekunder",
    ],
    specs: [
      /* brandvarnare.se och deltronic.se, art. 60510, EAN 7332211605105, lästa
         2026-08-06. Temperatur, tömningstid och fylld vikt från Deltronics
         produktblad för samma artikelnummer. */
      { label: "Effektklass", value: "13A 89B C", highlight: true },
      { label: "Certifiering", shortLabel: "Godkänd", value: "EN3-7:2004+A1:2007", highlight: true },
      { label: "Får placeras", shortLabel: "Placering", value: "Överallt", highlight: true },
      { label: "Släckmedel", value: "2 kg Furex Pro", highlight: true },
      { label: "Manometer", value: "Ja", highlight: true },
      { label: "Temperaturområde", shortLabel: "Temp", value: "−30 till +60 °C", highlight: true },
      { label: "Väggfäste", value: "Ingår", highlight: true },
      { label: "Mått", value: "375 × 115 × 115 mm", highlight: true },
      { label: "Fylld vikt", value: "4 kg" },
      { label: "Tömningstid", value: "15 sekunder" },
      { label: "Garanti", value: "2 år" },
      { label: "Artikelnummer", value: "60510" },
    ],
    verdict:
      "Röd 2 kg kostar 349 kronor, väger 4 kilo fylld och är 37,5 centimeter hög. Den får plats där en sexkilos inte gör det.\n\n13A 89B C i ett format som ryms i ett köksskåp, under en durk eller i husvagnens garderob. Den är godkänd enligt EN3-7:2004+A1:2007 och röd, alltså fri att sitta även där någon annan än du ska hitta den. Väggfäste ingår, och det är fästet som avgör om släckaren hänger monterad eller rullar omkring i ett bagageutrymme när den behövs.\n\nHar båten inombordare, utombordare på minst 20 hästkrafter, kök eller något annat med öppen låga kräver försäkringsvillkoren en funktionsduglig släckare ombord, och det är den här storleken det handlar om.\n\nSom enda skydd i en bostad räcker den inte. Brandskyddsföreningen rekommenderar minst 6 kilo pulver i hemmet, och deras norm för hembrandsläckare kräver 6 kilo och minst 43A. En 13A är en fjärdedel av en 55A.\n\nDet här är släckare nummer två, inte nummer ett. Har du redan sexkilosen på plats i hallen är den ett självklart komplement till bilen, båten eller köksskåpet.",
  },
  {
    id: "kjell-pulver-1-kg-rod",
    name: "Brandsläckare med pulver 1 kg röd",
    shortName: "Kjell 1 kg",
    brand: "Kjell & Company",
    image: productImage(BRANDSLACKARE.slug, "kjell-pulver-1-kg-rod"),
    tagline: "1,8 kilo som får plats i handskfacket.",
    scores: { slackeffekt: 1.5, placeringsfrihet: 5, hanterbarhet: 5, utrustning: 4, prisvarde: 2.5 },
    price: 349.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandslackare/brandslackare-med-pulver-1-kg-rod-p21026",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 506, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för handskfacket",
    pros: [
      "1,8 kilo och 35 centimeter, minst av släckarna i jämförelsen",
      "506 kundbetyg, 24 gånger mer underlag än någon annan släckare här",
      "Röd modell levereras med väggfäste",
      "ABC-pulver och manometer, samma grundfunktion som de stora",
    ],
    cons: [
      "8A 34B C, en sjättedel av släckytan hos en 55A",
      "Brandvarnare.se:s tvåkilos ger 62 procent mer släckeffekt för 90 öre mindre",
      "Säljs bara i butik, inte med hemleverans",
    ],
    specs: [
      /* kjell.com, art. 21026, läst 2026-08-06. Kjells egen produkt, ingen
         tillverkarsida hittad; certifiering och temperaturområde inte
         fastställda. Se researchfilen. */
      { label: "Effektklass", value: "8A 34B C", highlight: true },
      { label: "Certifiering", shortLabel: "Godkänd", value: "Ej angiven", highlight: true },
      { label: "Får placeras", shortLabel: "Placering", value: "Överallt", highlight: true },
      { label: "Släckmedel", value: "1 kg pulver ABC", highlight: true },
      { label: "Manometer", value: "Ja", highlight: true },
      { label: "Temperaturområde", shortLabel: "Temp", value: "Ej angiven", highlight: true },
      { label: "Väggfäste", value: "Ingår i röd", highlight: true },
      { label: "Mått", value: "Ø86 × 350 mm", highlight: true },
      { label: "Fylld vikt", value: "1,8 kg" },
      { label: "Färg", value: "Röd, finns även vit" },
      { label: "Artikelnummer", value: "21026" },
    ],
    verdict:
      "Kjells enkilos väger 1,8 kilo, är 35 centimeter hög och 8,6 i diameter, och kostar 349,90 kronor. Den får plats i ett handskfack.\n\n8A 34B C, ABC-pulver och manometer i den minsta kroppen i jämförelsen. Den röda modellen levereras med väggfäste, den vita utan. 506 kundbetyg på 4,5 är 24 gånger mer underlag än någon annan släckare här har, och recensionerna handlar nästan uteslutande om bilen och bakluckan. Folk köper den till rätt saker.\n\nDärför ligger den sist, och det är ingen kritik mot produkten utan mot hur den ofta köps. 8A är en sjättedel av släckytan hos en 55A och långt under Brandskyddsföreningens golv för en hemsläckare, som är 6 kilo och 43A. Kjell skriver själva att den lämpar sig som komplement till en större släckare.\n\nHar du redan en sexkilos hemma och vill ha något i bilen är det här rätt storlek och rätt kropp. Ska du bara ha en liten släckare ger Brandvarnare.se:s tvåkilos 62 procent mer släckeffekt för 90 öre mindre, och Biltemas enkilos kostar 199.",
  },
];

export const BRANDSLACKARE_PRODUCTS: Product[] = resolveProducts(BRANDSLACKARE, SEEDS);

/** Underlag till filtret, härlett ur specifikationerna ovan. */
type ExtinguisherTrait = {
  id: string;
  kg: number;
  klassA: number;
  /** Röd, och därmed fri att sitta i trapphus, delat garage och uthyrning. */
  anywhere: boolean;
  wallMount: boolean;
};

const TRAITS: ExtinguisherTrait[] = [
  { id: "housegard-6-kg-rod", kg: 6, klassA: 55, anywhere: true, wallMount: true },
  { id: "biltema-pulver-6-kg", kg: 6, klassA: 43, anywhere: true, wallMount: false },
  { id: "brandvarnare-se-vit-6-kg", kg: 6, klassA: 55, anywhere: false, wallMount: true },
  { id: "brandvarnare-se-rod-6-kg", kg: 6, klassA: 43, anywhere: true, wallMount: true },
  { id: "housegard-design-6-kg-vit", kg: 6, klassA: 55, anywhere: false, wallMount: true },
  { id: "brandvarnare-se-rod-2-kg", kg: 2, klassA: 13, anywhere: true, wallMount: true },
  { id: "kjell-pulver-1-kg-rod", kg: 1, klassA: 8, anywhere: true, wallMount: true },
];

export const BRANDSLACKARE_FILTERS: ComparisonFilter[] = [
  {
    key: "sexkilos",
    label: "Sex kilo, för hemmet",
    ids: TRAITS.filter((t) => t.kg === 6).map((t) => t.id),
  },
  {
    key: "smasläckare",
    label: "Ett till två kilo",
    ids: TRAITS.filter((t) => t.kg <= 2).map((t) => t.id),
  },
  {
    key: "hogsta-klass",
    label: "Högsta klassen, 55A",
    ids: TRAITS.filter((t) => t.klassA >= 55).map((t) => t.id),
  },
  {
    key: "far-sitta-overallt",
    label: "Får sitta var som helst",
    ids: TRAITS.filter((t) => t.anywhere).map((t) => t.id),
  },
  {
    key: "vaggfaste",
    label: "Väggfäste ingår",
    ids: TRAITS.filter((t) => t.wallMount).map((t) => t.id),
  },
];

/** Övervägda men inte rankade. */
export const BRANDSLACKARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Biltema",
    name: "Brandsläckare pulver ABC 2 kg",
    reason:
      "249 kronor för 13A 89B C, typgodkänd enligt EN 3-7/8, med manometer och övertrycksventil. Det är 100 kronor under den tvåkilos vi rankar och samma effektklass. Vi rankar Brandvarnare.se:s i stället eftersom väggfästet ingår där och den kommer hem till dörren, men handlar du ändå på Biltema är den här självklar.",
    approxPrice: 249,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandslackare/brandslackare-pulver-abc-2-kg-2000046825",
  },
  {
    brand: "Biltema",
    name: "Brandsläckare pulver ABC 1 kg",
    reason:
      "199 kronor för 8A 34B C, alltså 150 kronor billigare än enkilossläckaren vi rankar och med samma effektklass, manometer och EN 3-7/8. Vi rankar Kjells eftersom den har 506 kundbetyg och väggfäste, men slutsatsen är densamma för båda: en enkilos är ett komplement till bilen, inte ett hemskydd.",
    approxPrice: 199,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandslackare/brandslackare-pulver-abc-1-kg-2000046824",
  },
  {
    brand: "Kjell & Company",
    name: "Brandsläckare med pulver 1 kg vit",
    reason:
      "Identisk med den röda enkilos vi rankar på allt utom två punkter: väggfäste ingår inte, och vit färg gör att den bara får sitta i en privatbostad. Samma pris, 349,90 kronor, samma 8A 34B C och samma kundbetyg, eftersom Kjell delar betygen mellan färgvarianterna. Den röda är det bättre köpet av båda skälen.",
    approxPrice: 349.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandslackare/brandslackare-med-pulver-1-kg-vit-p21025",
  },
  {
    brand: "Biltema",
    name: "Släckspray 500 ml",
    reason:
      "En helt annan produkt: aerosolburk för under hundra kronor, avsedd för köket, verktygslådan och bilen. Den ersätter inte en handbrandsläckare och är svagare, vilket säljarna sällan skriver ut. Den får en egen sida hos oss, eftersom köparen, tillfället och prisläget är ett annat än för släckarna här.",
  },
  {
    brand: "Biltema",
    name: "Släckspray för litium 500 ml",
    reason:
      "Särskild spray för brand i litiumbatterier: elsparkcyklar, elcyklar och verktygsbatterier. En vanlig pulversläckare är inte svaret på en batteribrand, och kategorin växer snabbt i Sverige. Den får en egen sida tillsammans med resten av litiumfrågan.",
  },
  {
    brand: "E-safe",
    name: "FirePro brandsläckare",
    reason:
      "Dök upp i E-safes sortiment, men visade sig vara ett fast släcksystem för 13 000 till 22 000 kronor, en proffsprodukt för serverrum och maskiner, inte en handbrandsläckare. Butikens övriga tjugoen artiklar under brandsläckare var skyltar, skyddsöverdrag och skåp.",
  },
  {
    brand: "Diverse",
    name: "Skum-, kolsyre- och vattensläckare",
    reason:
      "Finns, men inte på svenska konsumenthyllor. Vi inventerade Kjell, Brandvarnare.se och Biltema 2026-08-02 och samtliga tio handsläckare de säljer är pulver. Brandskyddsföreningen, Konsumentverket och SVEBRA rekommenderar dessutom samstämmigt pulver till hemmet, eftersom det släcker flest typer av bränder. Skum är rimligt om du absolut inte vill ha pulverkladd, kolsyra i serverrum, men båda får du beställa från en brandskyddsfirma.",
  },
];

export const BRANDSLACKARE_FAQ = [
  {
    question: "Vilken brandsläckare ska man ha hemma?",
    answer:
      "En sex kilos pulversläckare av typen ABC. Det är vad Brandskyddsföreningen, Konsumentverket och SVEBRA samstämmigt rekommenderar, och pulver är det släckmedel som fungerar på flest sorters bränder: trä och textil, brinnande vätskor och gas. Komplettera gärna med en mindre i köket eller bilen, men låt den stora vara huvudskyddet.",
  },
  {
    question: "Vad betyder 55A 233B C på en brandsläckare?",
    answer:
      "Det är effektklassen enligt standarden EN 3. A-talet gäller brand i fasta material som trä och textil och anger hur stor yta släckaren klarar, där 55A motsvarar upp till 5,5 meter från släckaren. B-talet gäller brinnande vätska, och 233B betyder 233 liter bensin, olja eller färg. C betyder att den även klarar gasbränder. Ju högre tal, desto mer eld.",
  },
  {
    question: "Får man ha en vit brandsläckare?",
    answer:
      "I din egen bostad, ja. Utanför den, nej. SS-EN 3-7 kräver röd färg, så en vit släckare kan inte vara EN 3-7-certifierad, och både Kjell och Deltronic skriver ut vad det innebär: den är endast avsedd för privat bruk i hemmamiljö där användaren vet var släckaren är placerad. I ett trapphus, ett gemensamt garage eller en lägenhet du hyr ut ska släckaren vara röd, eftersom en främling ska hitta den på en sekund. Brandskyddsföreningens norm SBF 2011:1 finns just för det här undantaget: en hembrandsläckare ska uppfylla alla krav i SS-EN 3-7 utom punkt 16.1 om färgen, väga 6 kilo och klara minst 43A och 233B.",
  },
  {
    question: "Vad kostar en brandsläckare?",
    answer:
      "De vi jämför kostar mellan 349 och 699 kronor, kontrollerat 2026-08-02. En sex kilos ligger på 489 till 699, en två kilos på 249 till 349 och en ett kilos på 199 till 350. Det dyraste alternativet har inte högst effektklass, vilket är det första man bör kontrollera.",
  },
  {
    question: "Hur många brandsläckare behöver man?",
    answer:
      "En sex kilos per bostad som grund, placerad där du snabbt når den, gärna nära utgången och inte inne i köket där branden ofta börjar. Bor du i flera plan är rekommendationen en släckare per våningsplan. Komplettera med en mindre i bilen och gärna en i köket, eftersom de flesta bränder i hemmet startar just där.",
  },
  {
    question: "Hur länge håller en brandsläckare?",
    answer:
      "En pulversläckare håller normalt tio år, men den ska kontrolleras med jämna mellanrum och trycket ska ligga i det gröna fältet på manometern. Samtliga sju släckare i jämförelsen har manometer, så kontrollen tar en sekund. Ogniochron, som tillverkar tre av dem, anger 20 års maximal brukstid med årlig utvändig besiktning och kontroll av behållare och ventil minst vart femte år. Vänd släckaren upp och ner ett par gånger om året så att pulvret inte packar sig.",
  },
  {
    question: "Är pulver, skum eller kolsyra bäst?",
    answer:
      "Pulver för hemmet. Det har bäst släckkapacitet per kilo och fungerar på flest brandtyper, vilket spelar roll när den som använder släckaren aldrig har provat förut. Nackdelen är att pulvret är extremt finfördelat och tränger in överallt, så räkna med en rejäl sanering efteråt. Skum är lättare att torka upp men släcker sämre och tål inte frost. Kolsyra används i serverrum och hindrar inte återantändning.",
  },
  {
    question: "Kan man ha brandsläckare i ouppvärmt garage?",
    answer:
      "Ja, om släckaren är provad för det. Sex av de sju vi jämför anges till −30 till +60 grader, gott och väl vad en svensk vinter kräver, och Housegards röda sexkilos är dessutom uttryckligen godkänd för utomhusbruk och angiven som ej frostkänslig. Det gör garaget, uthuset och den kalla sommarstugan till fria placeringar.",
  },
  {
    question: "Ersätter en släckspray en brandsläckare?",
    answer:
      "Nej. En släckspray är en 500-millilitersburk för runt hundra kronor, avsedd för små bränder i köket eller bilen, och den har inte i närheten av en handbrandsläckares kapacitet. Den är ett bra komplement där en sexkilos inte får plats, men den ska inte vara ditt enda brandskydd.",
  },
  {
    question: "Hur använder man en brandsläckare?",
    answer:
      "Dra ut sprinten, håll släckaren upprätt, sikta mot glöden och inte mot lågorna, och tryck ut pulvret i korta stötar medan du sveper. Att sikta mot lågorna är det vanligaste misstaget: det är bränslet som brinner, och det är där nere pulvret ska hamna. Håll några meters avstånd och ha ryggen mot utrymningsvägen, så att du inte släcker dig själv in i ett hörn. Storstockholms brandförsvar påminner om att släckaren ska stå synlig och lätt åtkomlig, vilket i praktiken betyder att den inte ska ligga längst in i garderoben under vinterjackorna. Ring 112 först, även om du tror att du klarar det. En släckare köper tid, den ersätter inte räddningstjänsten.",
  },
  {
    question: "Kan en använd brandsläckare laddas om?",
    answer:
      "Ja, och den måste det. Storstockholms brandförsvar skriver att en brandsläckare bara går att använda en enda gång, sedan måste den laddas om. Det gäller även om du bara tryckt ut en liten mängd: trycket i behållaren går inte att återställa hemma, och en halvtom släckare är en släckare som slutar mitt i. Omladdning görs av en serviceverkstad och kostar en bit av vad en ny släckare kostar, så för en sexkilos pulversläckare i hemmet är det ofta enklare att köpa en ny. Konsumentverket rekommenderar dessutom att handbrandsläckaren kontrolleras vart femte år, och den kontrollen är ett annat ärende än omladdningen.",
  },
];
