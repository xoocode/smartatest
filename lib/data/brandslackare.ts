import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { BRANDSLACKARE } from "@/lib/test-pages";

/**
 * Brandsläckare. Underlag i .agent/research/brandvarnare.md, avsnittet
 * "Research: brandsläckare".
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, effektklasser, mått,
 * temperaturområden, artikelnummer och kundbetyg. Allt läst 2026-08-02 på
 * butikens egen produktsida.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte tänt eld på något.
 *
 * ## Sidans fynd: effektklassen
 *
 * Två sexkilos i listan skiljer 55A mot 43A, alltså tjugoåtta procents skillnad
 * i släckyta, och priset följer inte klassen. Billigaste 55A kostar 579 kronor,
 * dyraste 699. Kjells vita sexkilos kostar lika mycket som deras röda och är
 * enligt deras egen produktsida **inte EN3-klassad**.
 *
 * ## Kriteriet som skrevs om, och vad det gjorde med rankningen
 *
 * Första versionen hette "redovisad certifiering" och gav full poäng till den
 * butik som skrev ut sitt typgodkännande. Det mätte butikens produkttext och
 * inte produkten, och dubbelräknade dessutom Biltemas manometer i två
 * kriterier. Kriteriet heter nu tillförlitlighet, väger 15 i stället för 25,
 * och de tio poängen gick till släckeffekten, som är det enda måttet i
 * kategorin som provats fram av ett certifieringsorgan.
 *
 * Effekten: Biltema föll från första till tredje plats och Housegards 55A tog
 * över toppen. Se doc-kommentaren i lib/categories.ts.
 *
 * ## Butiksfördelning
 *
 * Kjell tre, Brandvarnare.se tre, Biltema en. Brandvarnare.se är den enda
 * annonserbara butiken i brandfamiljen och tar andraplatsen och två platser
 * till. Biltema finns inte i något affiliatenätverk vi kan söka till, vilket
 * inte påverkat placeringen åt något håll.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "biltema-pulver-6-kg",
    name: "Brandsläckare pulver ABC 6 kg",
    shortName: "Biltema 6 kg",
    brand: "Biltema",
    image: productImage(BRANDSLACKARE.slug, "biltema-pulver-6-kg"),
    tagline: "Enda som skriver ut sitt typgodkännande, och billigast av sexkilosen.",
    scores: { slackeffekt: 4, tillforlitlighet: 5, hanterbarhet: 3, placering: 3.5, prisvarde: 5 },
    price: 489,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandslackare/brandslackare-pulver-abc-6-kg-2000046826",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst dokumenterad",
    pros: [
      "Enda släckaren med utskrivet typgodkännande enligt EN 3-7/8",
      "Manometer, övertrycksventil och sprutmunstycke, alla angivna",
      "Billigast av sexkilosen, 210 kronor under den dyraste",
      "Godkänd för elektrisk utrustning upp till 1 000 V på en meters avstånd",
      "Tål −30 till +60 °C, även i ouppvärmt garage",
    ],
    cons: [
      "43A, 28 procent mindre släckyta än de bästa släckarna",
      "Butiken anger inte om väggfäste ingår",
      "Biltema har ingen näthandel med hemleverans i alla lägen",
    ],
    specs: [
      { label: "Effektklass", value: "43A 233B C", highlight: true },
      { label: "Typgodkännande", shortLabel: "Godkänd", value: "EN 3-7/8, utskrivet", highlight: true },
      { label: "Släckmedel", value: "6 kg Prestolit ABC", highlight: true },
      { label: "Manometer", value: "Ja", highlight: true },
      { label: "Temperaturområde", shortLabel: "Temp", value: "−30 till +60 °C", highlight: true },
      { label: "Mått", value: "Ø16 × 55 cm" },
      { label: "Elsäkerhet", value: "Upp till 1 000 V på 1 m" },
      { label: "Övertrycksventil", value: "Ja" },
      { label: "Artikelnummer", value: "21-837" },
    ],
    verdict:
      "Den här är inte starkast, men den är den enda som redovisar vad den är.\n\nBiltema skriver ut att släckaren är typgodkänd enligt EN 3-7/8. Ingen annan butik anger vilken standard produkten uppfyller, och en av dem skriver tvärtom att deras släckare inte är klassad. För en produkt som ska stå orörd i tio år och sedan fungera första gången är det inte en detalj.\n\nDe anger också manometer, övertrycksventil och sprutmunstycke. Manometern är den viktigaste av dem: den låter dig se att trycket finns kvar utan att beställa service, och en släckare som tappat trycket ser precis likadan ut som en som inte gjort det.\n\nOch den kostar 489 kronor, 210 mindre än den dyraste sexkilosen i listan.\n\nDet du betalar med är släckeffekt. 43A mot 55A är 28 procent mindre yta, 4,3 meter i stället för 5,5 från släckaren. I en normal villa spelar det sällan roll, i en verkstad eller ett garage med brandfarlig vätska kan det göra det. Vill du ha 55A ligger både ettan och tvåan över, och den billigaste av dem kostar nittio kronor mer än den här.",
  },
  {
    id: "brandvarnare-se-vit-6-kg",
    name: "Brandsläckare vit 6 kg",
    shortName: "Vit 6 kg",
    brand: "Brandvarnare.se",
    image: productImage(BRANDSLACKARE.slug, "brandvarnare-se-vit-6-kg"),
    tagline: "Högsta effektklassen till lägsta pris. Men vit släckare har en hake.",
    scores: { slackeffekt: 5, tillforlitlighet: 3, hanterbarhet: 3, placering: 4, prisvarde: 4 },
    price: 579,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandslackare-vit-6kg/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigaste 55A",
    pros: [
      "55A 233B C, högsta effektklassen för en sexkilos",
      "120 kronor billigare än samma klass hos Kjell",
      "Väggfäste medföljer",
      "Vit passar i hall och kök där en röd inte får plats visuellt",
    ],
    cons: [
      "Butiken anger inte vilket typgodkännande släckaren har",
      "Vita släckare är enligt Kjells produkttext endast för privat bruk i hemmamiljö",
      "Sex kilo pulver väger nära nio kilo fyllt",
    ],
    specs: [
      { label: "Effektklass", value: "55A 233B C", highlight: true },
      { label: "Typgodkännande", shortLabel: "Godkänd", value: "Ej angivet av butiken", highlight: true },
      { label: "Släckmedel", value: "6 kg pulver ABC", highlight: true },
      { label: "Manometer", value: "Ej angivet" },
      { label: "Temperaturområde", shortLabel: "Temp", value: "Ej angivet" },
      { label: "Väggfäste", value: "Ingår" },
      { label: "Färg", value: "Vit" },
    ],
    verdict:
      "55A är den högsta effektklassen en sexkilos pulversläckare når, och den här är billigast av släckarna med den klassen. 120 kronor under Kjells motsvarande.\n\nMen köp den med öppna ögon i två avseenden.\n\nButiken skriver inte ut vilket typgodkännande släckaren har. Det betyder inte att den saknar godkännande, och vi drar därför inte ner betyget till botten, men det betyder att du inte kan kontrollera det innan du klickar.\n\nOch färgen är inte bara en smaksak. Kjell skriver på sin egen vita släckare att brandsläckare i annan färg än röd endast är för privat bruk i hemmamiljö, där användaren förväntas veta var släckaren står. Ska släckaren sitta i en trappuppgång, ett garage för flera hushåll eller något som liknar en arbetsplats ska den vara röd, för då ska en främling hitta den på en sekund.\n\nI en villa eller lägenhet där du själv vet var den hänger är den vita ett fullgott köp, och du får mer släckeffekt per krona än någon annan i listan.",
  },
  {
    id: "housegard-6-kg-rod",
    name: "Brandsläckare med pulver 6 kg röd",
    shortName: "Housegard 6 kg",
    brand: "Housegard",
    image: productImage(BRANDSLACKARE.slug, "housegard-6-kg-rod"),
    tagline: "Högsta effektklassen, och enda släckaren som uttryckligen får stå kallt.",
    scores: { slackeffekt: 5, tillforlitlighet: 4, hanterbarhet: 3, placering: 4.5, prisvarde: 3 },
    price: 699,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandslackare/housegard-brandslackare-med-pulver-6-kg-rod-p21233",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 21, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Högsta klassen, och tål att stå kallt",
    pros: [
      "55A 233B C, högsta effektklassen",
      "Uttryckligen godkänd för både inomhus- och utomhusbruk, ej frostkänslig",
      "Tål −30 till +60 °C",
      "Väggfäste medföljer",
      "Kjell förklarar vad 55A och 233B faktiskt betyder på produktsidan",
    ],
    cons: [
      "Dyrast av släckarna i jämförelsen, 210 kronor över testvinnaren",
      "Samma effektklass finns för 579 kronor hos en annan butik",
      "Butiken anger inte vilket typgodkännande den har",
    ],
    specs: [
      { label: "Effektklass", value: "55A 233B C", highlight: true },
      { label: "Typgodkännande", shortLabel: "Godkänd", value: "Ej angivet av butiken", highlight: true },
      { label: "Släckmedel", value: "6 kg pulver ABC", highlight: true },
      { label: "Manometer", value: "Ej angivet" },
      { label: "Temperaturområde", shortLabel: "Temp", value: "−30 till +60 °C", highlight: true },
      { label: "Tömningstid", value: "15 sekunder" },
      { label: "Väggfäste", value: "Ingår" },
      { label: "Utomhus", value: "Ja, ej frostkänslig" },
      { label: "Mått", value: "Ø150 × 519 mm" },
    ],
    verdict:
      "55A är den högsta klassen en sexkilos når, och tre av släckarna har den. Släckeffekt väger dubbelt så tungt som något annat kriterium.\n\nKjell gör dessutom en sak ingen annan butik gör: de förklarar siffrorna. På produktsidan står att 55A betyder släckyta upp till 5,5 meter från släckaren och att 233B betyder 233 liter brinnande vätska. Den informationen saknas i resten av kategorin, och de skriver den på en produktsida i stället för att sälja på färg.\n\nSjälva släckaren är också bland de bäst utrustade. Högsta effektklassen, väggfäste, tömningstid femton sekunder, och uttryckligen godkänd för utomhusbruk och ej frostkänslig ner till minus trettio. Det senare gör den till rätt val för garage, uthus och sommarstuga, där de flesta släckare inte har någon angiven temperaturgräns alls.\n\nPriset är den uppenbara invändningen. 699 kronor är det högsta priset av släckarna, och samma effektklass finns för 579 kronor hos Brandvarnare.se. Det du betalar de hundratjugo kronorna för är den angivna temperaturtåligheten, tömningstiden och att släckaren är röd, vilket krävs så fort någon annan än du ska hitta den.\n\nSka den stå i en villa, ett garage eller ett uthus är det värt pengarna. Ska den stå i en hallgarderob i en lägenhet räcker tvåan.",
  },
  {
    id: "brandvarnare-se-rod-6-kg",
    name: "Brandsläckare röd 6 kg",
    shortName: "Röd 6 kg",
    brand: "Brandvarnare.se",
    image: productImage(BRANDSLACKARE.slug, "brandvarnare-se-rod-6-kg"),
    tagline: "Röd sexkilos med väggfäste, mitt i prisspannet.",
    scores: { slackeffekt: 4, tillforlitlighet: 3, hanterbarhet: 3, placering: 4, prisvarde: 4 },
    price: 529,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandslackare-rod-6kg-2/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Röd, med fäste, i mitten",
    pros: [
      "Röd, rätt färg där andra än du ska hitta den",
      "Väggfäste medföljer",
      "43A 233B C till 529 kronor",
      "Kan stå på golvet eller hängas",
    ],
    cons: [
      "Fyrtio kronor dyrare än Biltemas med samma effektklass",
      "Butiken anger varken typgodkännande, manometer eller temperaturområde",
    ],
    specs: [
      { label: "Effektklass", value: "43A 233B C", highlight: true },
      { label: "Typgodkännande", shortLabel: "Godkänd", value: "Ej angivet av butiken", highlight: true },
      { label: "Släckmedel", value: "6 kg pulver ABC", highlight: true },
      { label: "Manometer", value: "Ej angivet" },
      { label: "Temperaturområde", shortLabel: "Temp", value: "Ej angivet" },
      { label: "Väggfäste", value: "Ingår" },
      { label: "Färg", value: "Röd" },
    ],
    verdict:
      "En helt korrekt sexkilos i rätt färg med väggfäste, och det är ungefär allt vi kan säga om den, för butikens produkttext säger inte mer.\n\nEffektklassen 43A 233B C är densamma som testvinnarens. Priset är fyrtio kronor högre. Skillnaden är att Biltema skriver ut sitt typgodkännande, sin manometer och sitt temperaturområde, medan den här sidan anger ingetdera.\n\nDet är inget fel på produkten, och för den som ändå handlar hos Brandvarnare.se är den ett vettigt val. Men ska du välja mellan två släckare med identisk effektklass är den som talar om vad den är godkänd enligt det tryggare köpet.\n\nÄr det den röda färgen och väggfästet du är ute efter, och vill du ha högsta klassen, ligger butikens egen vita 55A hundra kronor högre upp i listan och femtio kronor högre i pris.",
  },
  {
    id: "brandvarnare-se-rod-2-kg",
    name: "Brandsläckare röd 2 kg",
    shortName: "Röd 2 kg",
    brand: "Brandvarnare.se",
    image: productImage(BRANDSLACKARE.slug, "brandvarnare-se-rod-2-kg"),
    tagline: "Billigast av släckarna, med väggfäste och i rätt färg.",
    scores: { slackeffekt: 2.5, tillforlitlighet: 3, hanterbarhet: 5, placering: 4, prisvarde: 4 },
    price: 349,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandslackare-rod_2kg/",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Billigast som ändå duger",
    pros: [
      "13A 89B C i det lilla formatet",
      "Väggfäste medföljer, till skillnad från konkurrenterna i samma storlek",
      "Röd, rätt färg i gemensamma utrymmen",
      "Butiken säger själv att pulver är bästa släckaren för privatpersoner",
    ],
    cons: [
      "Butiken anger varken typgodkännande, manometer eller temperaturområde",
    ],
    specs: [
      { label: "Effektklass", value: "13A 89B C", highlight: true },
      { label: "Typgodkännande", shortLabel: "Godkänd", value: "Ej angivet av butiken", highlight: true },
      { label: "Släckmedel", value: "2 kg pulver ABC", highlight: true },
      { label: "Manometer", value: "Ej angivet" },
      { label: "Temperaturområde", shortLabel: "Temp", value: "Ej angivet" },
      { label: "Väggfäste", value: "Ingår" },
      { label: "Färg", value: "Röd" },
    ],
    verdict:
      "Samma effektklass som budgetvinnaren, hundra kronor dyrare, men med väggfäste inkluderat och i rött.\n\nDe hundra kronorna köper alltså två saker: ett fäste, vilket i praktiken avgör om släckaren hänger synligt eller ligger i en garderob, och rätt färg för utrymmen där andra än du ska hitta den. Är släckaren tänkt för trappuppgången eller ett gemensamt garage är det pengarna värda.\n\nÄr den tänkt för bilen eller köksskåpet är den inte det, och då tar du Biltemas.\n\nButikens egen text är för övrigt rakare än de flesta i kategorin: de skriver att pulversläckare är den bästa släckaren för privatpersoner, vilket stämmer med vad Räddningsverket, Konsumentverket och SVEBRA rekommenderar.",
  },
  {
    id: "housegard-design-6-kg-vit",
    name: "Brandsläckare Design Edition med pulver 6 kg vit",
    shortName: "Design Edition",
    brand: "Housegard",
    image: productImage(BRANDSLACKARE.slug, "housegard-design-6-kg-vit"),
    tagline: "Högsta effektklassen. Och enligt butiken själv inte EN3-klassad.",
    scores: { slackeffekt: 5, tillforlitlighet: 1, hanterbarhet: 3, placering: 4.5,      /* 1,5 och inte 2,0: 699 kronor är 170 mer än Brandvarnare.se:s röda
         sexkilos, och butiken skriver själv att den här inte är EN3-klassad.
         Att betala mer för mindre dokumentation är sidans sämsta affär.
         Sänkt 2026-08-03. */
 prisvarde: 1.5 },
    price: 699,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandslackare/housegard-brandslackare-design-edition-med-pulver-6-kg-vit-p21067",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 50, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Snyggast, med en varning",
    pros: [
      "55A 233B C, högsta effektklassen",
      "Väggfäste medföljer",
      "Tål −30 till +60 °C",
      "Designad för att få stå framme i stället för att gömmas",
    ],
    cons: [
      "Butiken skriver uttryckligen: ej EN3-klassad",
      "Endast för privat bruk i hemmamiljö, enligt butikens egen text",
      "Kostar lika mycket som den röda som inte har den begränsningen",
    ],
    specs: [
      { label: "Effektklass", value: "55A 233B C", highlight: true },
      { label: "Typgodkännande", shortLabel: "Godkänd", value: "Ej EN3-klassad, enligt butiken", highlight: true },
      { label: "Släckmedel", value: "6 kg pulver ABC", highlight: true },
      { label: "Manometer", value: "Ej angivet" },
      { label: "Temperaturområde", shortLabel: "Temp", value: "−30 till +60 °C", highlight: true },
      { label: "Väggfäste", value: "Ingår" },
      { label: "Tömningstid", value: "15 sekunder" },
      { label: "Begränsning", value: "Endast privat bruk i hemmamiljö" },
    ],
    verdict:
      "Kjells egen produktsida är det bästa argumentet mot den här släckaren.\n\nPå produktsidan står det, med versaler, att släckaren inte är EN3-klassad, och att brandsläckare i annan färg än röd endast är för privat bruk i hemmamiljö där användaren förväntas veta var släckaren är placerad. Det är ovanligt rakt av en butik och förtjänar beröm.\n\nMen läs vad det betyder. Släckaren har högsta effektklassen och skulle på papperet ha legat i topp. Den saknar just den standard man köper en brandsläckare för, och den kostar exakt lika mycket som Kjells röda som inte har begränsningen.\n\nDet finns en situation där den ändå är rätt: du vill ha en släckare framme i hallen i stället för nedstoppad i en städskrubb, för en släckare du hittar på tre sekunder är bättre än en du hittar på trettio. Estetik är ett verkligt argument i brandskydd, av just det skälet.\n\nMen då finns en vit 55A för 579 kronor hos en annan butik, 120 billigare. Och den här var dessutom slut vid priskontrollen.",
  },
  {
    id: "kjell-pulver-1-kg-rod",
    name: "Brandsläckare med pulver 1 kg röd",
    shortName: "Kjell 1 kg",
    brand: "Kjell & Company",
    image: productImage(BRANDSLACKARE.slug, "kjell-pulver-1-kg-rod"),
    tagline: "Minst i testet. Bra i bilen, aldrig som enda släckare hemma.",
    scores: { slackeffekt: 1.5, tillforlitlighet: 3, hanterbarhet: 5, placering: 3, prisvarde: 2.5 },
    price: 349.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandslackare/brandslackare-med-pulver-1-kg-rod-p21026",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 506, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Får plats överallt",
    pros: [
      "506 kundbetyg, klart störst underlag av släckarna",
      "Ett kilo, som får plats i bilen, husvagnen eller ett köksskåp",
      "ABC-pulver, samma släckmedel som de stora",
      "Finns i röd och vit till samma pris",
    ],
    cons: [
      "8A 34B C, lägst effektklass av släckarna",
      "Dyrare än Biltemas tvåkilos, som ger sextiotvå procent mer släckeffekt",
      "Butiken kallar den själv ett komplement till en större släckare",
    ],
    specs: [
      { label: "Effektklass", value: "8A 34B C", highlight: true },
      { label: "Typgodkännande", shortLabel: "Godkänd", value: "Ej angivet av butiken", highlight: true },
      { label: "Släckmedel", value: "1 kg pulver ABC", highlight: true },
      { label: "Manometer", value: "Ej angivet" },
      { label: "Temperaturområde", shortLabel: "Temp", value: "Ej angivet" },
      { label: "Väggfäste", value: "Ej angivet" },
      { label: "Färg", value: "Röd, finns även vit" },
    ],
    verdict:
      "506 kundbetyg på 4,5 är 24 gånger mer underlag än testvinnaren har. Folk köper den här och blir nöjda.\n\nDe köper den också av rätt skäl. Ett kilo får plats i handskfacket, i husvagnen och i ett köksskåp, och Kjell skriver själva att den lämpar sig som komplement till en större släckare och till exempel för bilen.\n\nDärför ligger den sist, och det är ingen kritik mot produkten utan mot hur den ofta köps. 8A är lägst effektklass av släckarna, mindre än en sjättedel av en 55A. Som enda brandskydd i ett hem räcker den inte, och räddningstjänsterna rekommenderar entydigt en sexkilos.\n\nDet finns dessutom ett rakare problem. Brandvarnare.se:s tvåkilos kostar 349 kronor, 90 öre mindre, och ger 13A. Det är sextiotvå procent mer släckeffekt för samma pengar, och den har väggfäste. Ska du ha en liten släckare är det den du ska ha, om du inte behöver just den här formen eller vill hämta i butik samma dag.",
  },
];

export const BRANDSLACKARE_PRODUCTS: Product[] = resolveProducts(BRANDSLACKARE, SEEDS);

/** Underlag till filtret, härlett ur specifikationerna ovan. */
type ExtinguisherTrait = {
  id: string;
  kg: number;
  klassA: number;
  statedApproval: boolean;
  wallMount: boolean;
};

const TRAITS: ExtinguisherTrait[] = [
  { id: "biltema-pulver-6-kg", kg: 6, klassA: 43, statedApproval: true, wallMount: false },
  { id: "brandvarnare-se-vit-6-kg", kg: 6, klassA: 55, statedApproval: false, wallMount: true },
  { id: "housegard-6-kg-rod", kg: 6, klassA: 55, statedApproval: false, wallMount: true },
  { id: "brandvarnare-se-rod-6-kg", kg: 6, klassA: 43, statedApproval: false, wallMount: true },
  { id: "brandvarnare-se-rod-2-kg", kg: 2, klassA: 13, statedApproval: false, wallMount: true },
  { id: "housegard-design-6-kg-vit", kg: 6, klassA: 55, statedApproval: false, wallMount: true },
  { id: "kjell-pulver-1-kg-rod", kg: 1, klassA: 8, statedApproval: false, wallMount: false },
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
    key: "godkannande",
    label: "Godkännande utskrivet",
    ids: TRAITS.filter((t) => t.statedApproval).map((t) => t.id),
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
    name: "Brandsläckare pulver ABC 1 kg",
    reason:
      "Biltemas minsta, som kompletterar deras två- och sexkilos. Vi rankar Kjells enkilos i stället eftersom den har 506 kundbetyg mot Biltemas okända, men slutsatsen är densamma för båda: en enkilos är ett komplement och inte ett hemskydd. Har du ändå bestämt dig för formatet är det värt att jämföra priserna, eftersom Biltema ligger lägre på sina övriga storlekar.",
  },
  {
    brand: "Kjell & Company",
    name: "Brandsläckare med pulver 1 kg vit",
    reason:
      "Identisk med den röda enkilos vi rankar: samma pris 349,90 kronor, samma effektklass 8A 34B C och samma kundbetyg, eftersom Kjell delar betygen mellan färgvarianterna. Vi rankar bara den röda för att inte fylla listan med samma produkt två gånger, och för att röd är rätt färg om någon annan än du ska hitta släckaren.",
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
      "Finns, men inte på svenska konsumenthyllor. Vi inventerade Kjell, Brandvarnare.se och Biltema 2026-08-02 och samtliga tio handsläckare de säljer är pulver. Räddningsverket, Konsumentverket och SVEBRA rekommenderar dessutom samstämmigt pulver till hemmet, eftersom det släcker flest typer av bränder. Skum är rimligt om du absolut inte vill ha pulverkladd, kolsyra i serverrum, men båda får du beställa från en brandskyddsfirma.",
  },
];

export const BRANDSLACKARE_FAQ = [
  {
    question: "Vilken brandsläckare ska man ha hemma?",
    answer:
      "En sex kilos pulversläckare av typen ABC. Det är vad Räddningsverket, Konsumentverket och SVEBRA samstämmigt rekommenderar, och pulver är det släckmedel som fungerar på flest sorters bränder: trä och textil, brinnande vätskor och gas. Komplettera gärna med en mindre i köket eller bilen, men låt den stora vara huvudskyddet.",
  },
  {
    question: "Vad betyder 55A 233B C på en brandsläckare?",
    answer:
      "Det är effektklassen enligt standarden EN 3. A-talet gäller brand i fasta material som trä och textil och anger hur stor yta släckaren klarar, där 55A motsvarar upp till 5,5 meter från släckaren. B-talet gäller brinnande vätska, och 233B betyder 233 liter bensin, olja eller färg. C betyder att den även klarar gasbränder. Ju högre tal, desto mer eld.",
  },
  {
    question: "Vad kostar en brandsläckare?",
    answer:
      "De vi jämför kostar mellan 249 och 699 kronor, kontrollerat 2026-08-02. En sex kilos ligger på 489 till 699, en två kilos på 249 till 349 och en ett kilos runt 350. Det dyraste alternativet har inte högst effektklass, vilket är det första man bör kontrollera.",
  },
  {
    question: "Hur många brandsläckare behöver man?",
    answer:
      "En sex kilos per bostad som grund, placerad där du snabbt når den, gärna nära utgången och inte inne i köket där branden ofta börjar. I en villa i två plan är två rimligt. Komplettera med en mindre i bilen och gärna en i köket, eftersom de flesta bränder i hemmet startar just där.",
  },
  {
    question: "Hur länge håller en brandsläckare?",
    answer:
      "En pulversläckare håller normalt tio år, men den ska kontrolleras med jämna mellanrum och trycket ska ligga i det gröna fältet på manometern. Har släckaren ingen manometer kan du inte se om trycket finns kvar, vilket är ett verkligt argument för att välja en med. Vänd släckaren upp och ner ett par gånger om året så att pulvret inte packar sig.",
  },
  {
    question: "Är pulver, skum eller kolsyra bäst?",
    answer:
      "Pulver för hemmet. Det har bäst släckkapacitet per kilo och fungerar på flest brandtyper, vilket spelar roll när den som använder släckaren aldrig har provat förut. Nackdelen är att pulvret är extremt finfördelat och tränger in överallt, så räkna med en rejäl sanering efteråt. Skum är lättare att torka upp men släcker sämre och tål inte frost. Kolsyra används i serverrum och hindrar inte återantändning.",
  },
  {
    question: "Kan man ha brandsläckare i ouppvärmt garage?",
    answer:
      "Bara om temperaturområdet tillåter det, och det är långt ifrån alla butiker som anger det. Housegards sexkilos hos Kjell och Biltemas släckare anges båda till −30 till +60 grader, gott och väl vad en svensk vinter kräver. Där uppgiften saknas ska du utgå från att släckaren vill stå inomhus.",
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
