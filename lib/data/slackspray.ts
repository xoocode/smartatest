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
 * från LTH-rapporten och är bekräftade av flera butikers egna produktsidor
 * oberoende av varandra; Clas Ohlson anger dessutom att Taerosol är klassad av
 * MPA Dresden GmbH. **Biltema publicerar ingen klass** för någon av sina två
 * sprayer. Se `ALDRIG_BEDOMD` i lib/spec-schema.mjs: klassen får aldrig gissas
 * eller lånas från en systermodell, och Biltemas 500 ml delar sammansättning,
 * pH, spraytid och kastlängd med Taerosol utan att det är ett belägg.
 *
 * ## ⚠️ En uppgift vi inte fått fram sänker aldrig ett betyg
 *
 * Sidan gjorde tvärtom fram till 2026-08-06: kriteriet hette `Angiven
 * släckeffekt`, viktningen skrev ut att en saknad klass "räknas som en brist i
 * betyget", och de två Biltemasprayerna låg på 1,5 av 5 för att de inte tryckt
 * en klass på burken. Det betygsatte säljarens produktblad och inte varan.
 * Kriteriet heter nu `Släckförmåga` och betygsätter det som är fastställt om
 * produkten. Se rättelsen 2026-08-06 i lib/corrections.ts.
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
    superlative: "Bäst för den som vill ha en enda burk",
    pros: [
      "5A 21B (E) 5F, det största testbål någon spray här är provad mot",
      "600 ml räcker 20 till 30 sekunder, längst av alla fem",
      "Provad mot fettbrand, alltså kastrullen på spisen",
    ],
    cons: [
      "5A är ungefär en åttondel av det testbål en sexkilos pulversläckare klarar",
      "3 års hållbarhet, sedan ska burken bytas",
    ],
    specs: [
      { label: "Effektivitetsklass", value: "5A 21B (E) 5F", highlight: true },
      { label: "Volym", value: "600 ml", highlight: true },
      { label: "Tömningstid", value: "20–30 s", highlight: true },
      { label: "Släckmedel", value: "Skum", highlight: true },
      /* Kastlängd: kontrollerad 2026-08-06 hos Nayad, Proffsmagasinet, Toolab,
         AllOffice, NetOnNet, Kjell och Brandspecialisten samt hos Housegard.
         Ingen anger den. Se .agent/research/slackspray.md. */
      { label: "Kastlängd", value: "Ej angiven", highlight: true },
      { label: "Fettbrand", value: "Ja, klass 5F" },
      { label: "Litiumbatteri", value: "Nej" },
      { label: "Temperaturområde", value: "Ej angiven" },
      /* EAN läst på Proffsmagasinets produktsida 2026-08-06. */
      { label: "GTIN", value: "7320896002135" },
    ],
    verdict:
      "Housegard FireStopper är den kraftigaste släcksprayen i jämförelsen och kostar 299 kronor.\n\nKlassen på burken lyder 5A 21B (E) 5F, alltså det största testbål någon spray här är provad mot, och femman före F betyder att den klarar fett i en kastrull. De 600 millilitren räcker i 20 till 30 sekunder, längst av alla fem, och den extra decilitern mot de andra sprayerna är marginalen du har kvar om första försöket inte tar. Den ska förvaras frostfritt, så köksskåpet duger medan den ouppvärmda carporten inte gör det.\n\nFemman i 5A ska ändå läsas för vad den är. Den lägsta klassning som rekommenderas till hemmet är 43A, ett testbål ungefär åtta gånger större, och dit når bara en sexkilos pulversläckare eller en niolitersskumsläckare.\n\n**Köp FireStoppern som det den är: den bästa av sprayerna, att ha i köksskåpet eller verktygslådan för att hinna ta en brand medan den är liten.** Ska den vara ditt enda brandskydd köper du en pulversläckare i stället.",
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
      "3A 13B (E) 5F, klassad av provningsanstalten MPA Dresden",
      "Skum utan fluortensider, enligt tillverkarens säkerhetsdatablad",
      "Den mest köpta i jämförelsen, 4,5 av 5 på 84 betyg",
    ],
    cons: [
      "3A är den minsta klassen här, ungefär en fjortondel av 43A",
      "500 ml töms på 15 till 25 sekunder, kortast av de provade",
    ],
    specs: [
      { label: "Effektivitetsklass", value: "3A 13B (E) 5F", highlight: true },
      { label: "Volym", value: "500 ml", highlight: true },
      { label: "Tömningstid", value: "15–25 s", highlight: true },
      /* Säkerhetsdatabladet från Taerosol Oy, omarbetat 2023-06-22 och länkat
         från Clas Ohlsons produktsida, listar 2-(2-butoxietoxi)etanol, alkohol-
         etersulfat och natriumoktylsulfat, drivgas N2. Ingen fluortensid.
         LTH-rapportens AFFF-uppgift är från 2020 och gäller inte längre. */
      { label: "Släckmedel", value: "Skum, utan fluortensider", highlight: true },
      { label: "Kastlängd", value: "3–4 m", highlight: true },
      { label: "Fettbrand", value: "Ja, klass 5F" },
      { label: "Litiumbatteri", value: "Nej" },
      { label: "Temperaturområde", value: "Ej angiven" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Taerosol Fire Fighter kostar 199,90 kronor och är den spray flest köpare här faktiskt har hemma, med 4,5 av 5 på 84 betyg.\n\nDen bär klassen 3A 13B (E) 5F, satt av den tyska provningsanstalten MPA Dresden, och det viktiga i koden är femman före F: sprayen är provad mot fett i en kastrull, den vanligaste brandstarten i ett kök och precis där en spray hör hemma. Skummet innehåller inga fluortensider, så den kan sköljas ned utan att du behöver tänka på var vätskan tar vägen. Strålen når 3 till 4 meter, alltså kan du stå kvar i dörröppningen.\n\nTrean i 3A är den minsta klassen här, och de 500 millilitren är slut på 15 till 25 sekunder. Du har en kort insats mot en liten brand.\n\nKöp den till spisen och till bilen, där den är billig nog att finnas på båda ställena. Vill du ha marginal i både klass och tid tar du Housegard FireStopper för hundra kronor mer.",
  },
  {
    id: "biltema-slackspray-500",
    brand: "Biltema",
    name: "Släckspray 500 ml",
    shortName: "Biltema 500 ml",
    image: productImage(SLACKSPRAY.slug, "biltema-slackspray-500"),
    tagline: "Under hundralappen, och billig nog att ligga i varje bil.",
    scores: {
      slackeffekt: 3,
      anvandning: 3,
      prisvarde: 4,
      uthallighet: 3.5,
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
      "Skum utan PFAS, och biologiskt nedbrytbart enligt butiken",
      "Billig nog att ha en i köket, en i bilen och en i garaget",
    ],
    cons: [
      "Ingen effektivitetsklass på burken, så den går inte att ställa mot de tre som bär en",
      "500 ml töms på 15 till 25 sekunder, en tredjedel kortare insats än vinnaren",
    ],
    specs: [
      /* ⚠️ Klassen får aldrig lånas. Biltemas spray delar sammansättning, pH,
         spraytid och kastlängd med Taerosol Fire Fighter, som är klassad
         3A 13B (E) 5F, men Biltema publicerar ingen klass och likheten är
         inget belägg. Se ALDRIG_BEDOMD i lib/spec-schema.mjs.
         Kontrollerat 2026-08-06: produktsidan, säkerhetsdatabladet för
         art. 21-968 och Biltemas dokumentsök anger ingen klass. */
      { label: "Effektivitetsklass", value: "Ej angiven", highlight: true },
      { label: "Volym", value: "500 ml", highlight: true },
      /* Spraytid och släckavstånd står i produkttexten hos Biltema,
         läst 2026-08-06: "Effektivt släckavstånd är 3–4 meter och spraytid
         15–25 sekunder." */
      { label: "Tömningstid", value: "15–25 s", highlight: true },
      { label: "Släckmedel", value: "Skum, utan PFAS", highlight: true },
      { label: "Kastlängd", value: "3–4 m", highlight: true },
      { label: "Fettbrand", value: "Ej angiven" },
      { label: "Litiumbatteri", value: "Nej" },
      { label: "Temperaturområde", value: "Ej angiven" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Biltemas släckspray kostar 99,90 kronor och är den billigaste vägen till en burk i köksskåpet.\n\nTill det priset kan du köpa tre och lägga en i bilen, en i garaget och en vid spisen, och en spray du har där branden startar är värd mer än en du inte har. Den sprutar 500 ml skum i 15 till 25 sekunder och når 3 till 4 meter, alltså samma räckvidd som sprayen för dubbla priset. Skummet är fritt från PFAS och biologiskt nedbrytbart, vilket spelar roll den dag du ska spola bort det ur en köksbänk.\n\nDet du inte får med på köpet är en effektivitetsklass. De tre sprayerna som bär en ligger på 5A, 3A och en A utan tal, och utan siffra på Biltemas burk kan du inte ställa den mot dem.\n\nKöp den om du vill ha flera burkar utspridda och priset avgör. Ska du ha en enda spray och kunna jämföra vad den klarar tar du Taerosol Fire Fighter för hundra kronor mer.",
  },
  {
    id: "housegard-lith-ex-500",
    brand: "Housegard",
    name: "Lith-EX släckspray AVD 500 ml",
    shortName: "Lith-EX AVD 500 ml",
    image: productImage(SLACKSPRAY.slug, "housegard-lith-ex-500"),
    tagline: "Lägger ett kylande vermikulittäcke över battericellerna.",
    scores: {
      slackeffekt: 2.5,
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
      "AVD, alltså vermikulit i vatten, som lägger ett kylande täcke över cellerna",
      "Vermikuliten står emot långt över 1 000 grader och ligger kvar på härden",
      "Väggfäste följer med, så den kan sitta framme vid laddplatsen",
    ],
    cons: [
      "539 kronor, mer än fem gånger den billigaste sprayen här",
      "Kastar 2 meter, halva skumsprayernas räckvidd, så du måste närmare elden",
      "Den klass den bär, A, gäller trä och textil och säger inget om batteriet",
    ],
    specs: [
      { label: "Effektivitetsklass", value: "Klass A, tal ej angivet", highlight: true },
      { label: "Volym", value: "500 ml", highlight: true },
      /* ⚠️ Tömningstiden är motstridig och står därför tom. AVD Fire Limited,
         som tillverkar aerosolen i Storbritannien, anger ≤90 s på sitt eget
         produktblad; Fire Champions broschyr för samma burk anger upp till
         35 s. Båda anger däremot ≤2 m kastlängd. Se research-filen. */
      { label: "Tömningstid", value: "Ej angiven", highlight: true },
      { label: "Släckmedel", value: "AVD, vermikulit i vatten", highlight: true },
      { label: "Kastlängd", value: "2 m", highlight: true },
      { label: "Fettbrand", value: "Ej angiven" },
      { label: "Litiumbatteri", value: "Ja, uttalat ändamål" },
      /* ⚠️ Rättat 2026-08-06 från +5/+60. Housegards produktsida motsäger sig
         själv: specifikationstabellen anger +5 °C/+50 °C och brödtexten
         +5 till +60 °C, och butikerna kopierar båda. +50 är det interna
         konsistenta värdet: det stämmer med tillverkaren AVD Fire Limited
         ("Maximum Working Temperature 50 °C"), med Fire Champions broschyr
         och med CLP-märkningen P410+P412 på burken, som förbjuder över 50 °C. */
      { label: "Temperaturområde", value: "+5 till +50 °C" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Housegard Lith-EX kostar 539 kronor och är gjord för en brand de andra sprayerna inte är gjorda för.\n\nSläckmedlet heter AVD och är vermikulit uppslammat i vatten. I stället för att kväva en låga lägger det ett täcke över battericellerna som kyler dem, och vermikulit står emot långt över 1 000 grader, alltså ligger täcket kvar när det blir som hetast. Det är elsparkcykeln i hallen, elcykelbatteriet på laddning och verktygsbatteriet i garaget den är avsedd för, och väggfästet följer med så att den kan sitta framme vid laddplatsen. Den får användas mellan 5 och 50 grader.\n\nStrålen når 2 meter, alltså hälften av vad skumsprayerna når. Mot ett batteri som redan brinner betyder det att du måste gå betydligt närmare än du hade behövt med en spray för hundralappen.\n\nKöp den om du laddar ett stort batteri inomhus och vill ha något på plats som är avsett för just det. Är oron i stället spisen och kastrullen är Taerosol Fire Fighter både billigare och provad mot fett.",
  },
  {
    id: "biltema-slackspray-litium-500",
    brand: "Biltema",
    name: "Släckspray för litium 500 ml",
    shortName: "Biltema litium 500 ml",
    image: productImage(SLACKSPRAY.slug, "biltema-slackspray-litium-500"),
    tagline: "Samma AVD-släckmedel som litiumsprayen för 539 kronor.",
    scores: {
      slackeffekt: 2,
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
      "Samma släckmedel som den dyra: AVD, framtaget för batteribrand",
      "Finns i en butik som ligger i varje medelstor stad",
    ],
    cons: [
      "Ingen effektivitetsklass på burken, så den går inte att ställa mot de tre som bär en",
      "Inget arbetstemperaturområde angivet, och en elsparkcykel laddas ofta i ett kallt förråd",
    ],
    specs: [
      /* Kontrollerat 2026-08-06: produktsidan för art. 21-097 och dess två
         säkerhetsdatablad anger ingen klass. Får aldrig lånas från Lith-EX,
         som bär samma släckmedel. Se ALDRIG_BEDOMD i lib/spec-schema.mjs. */
      { label: "Effektivitetsklass", value: "Ej angiven", highlight: true },
      { label: "Volym", value: "500 ml", highlight: true },
      { label: "Tömningstid", value: "Ej angiven", highlight: true },
      /* Biltemas produkttext, läst 2026-08-06: "Släcksprayen innehåller
         släckmedlet AVD som utvecklats för att effektivt släcka bränder som
         uppstår i litiumbatterier." */
      { label: "Släckmedel", value: "AVD", highlight: true },
      { label: "Kastlängd", value: "Ej angiven", highlight: true },
      { label: "Fettbrand", value: "Ej angiven" },
      { label: "Litiumbatteri", value: "Ja, uttalat ändamål" },
      { label: "Temperaturområde", value: "Ej angiven" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Biltemas litiumspray kostar 349 kronor och är den billigaste vägen till något avsett för batteribrand.\n\nDen innehåller AVD, samma släckmedel som litiumsprayen för 539 kronor, alltså vermikulit som kyler och kapslar in battericellerna. Prisskillnaden mot den är 190 kronor, och den säljs i en butik som ligger i varje medelstor stad, vilket betyder att du kan ha den hemma i dag utan att vänta på en leverans.\n\nDet står inget arbetstemperaturområde på den, och det spelar roll just här. Den andra litiumsprayen är angiven ned till 5 plusgrader, och en elsparkcykel laddas ofta i ett garage eller förråd som är kallare än så halva året. Om den här klarar det vet du inte förrän du behöver den.\n\nKöp den om du vill ha något på plats till elcykeln och priset avgör. Ska burken ligga i ett kallt utrymme tar du Housegard Lith-EX, som anger vad den tål.",
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
      "Kortare än de flesta tror. Skumsprayerna töms på 20 till 30 respektive 15 till 25 sekunder, och det är hela insatsen. Kastlängden är 3 till 4 meter mot 5 till 7 för en pulversläckare, så du står också närmare elden, och litiumsprayen Lith-EX når bara 2 meter. Beräkningarna i rapporten pekar på att en spray klarar en möbelbrand i ungefär tre minuter efter att brandtillväxten startat, och därefter inte.",
  },
  {
    question: "Var ska släcksprayen förvaras?",
    answer:
      "Nära där det kan börja brinna, men inte där det blir varmt. Alla fem burkarna bär varningen H229, alltså att tryckbehållaren kan sprängas vid uppvärmning, och ingen av dem tål över 50 grader. Skåpet under spisen är därför en bättre plats än hyllan ovanför den.\n\nKylan sätter den andra gränsen. Vinnaren ska förvaras frostfritt och Lith-EX är angiven ned till 5 plusgrader, så en ouppvärmd carport i februari är fel förvaring för båda. Ska burken stå i ett kallt utrymme är det den uppgiften du ska leta efter först.",
  },
  {
    question: "Är en släckspray bättre än inget alls?",
    answer:
      "Ja, och det är det starkaste argumentet för produkten. Den oberoende rapporten noterar att de som omkommit vid släckförsök inte hade använt handbrandsläckare utan exempelvis vatten, och drar slutsatsen att en spray i den situationen hade gett bättre möjlighet att klara sig. Rapporten pekar också ut en grupp den passar särskilt: den som på grund av rörelsesvårigheter inte kan hantera en sexkilos släckare. En spray du kan lyfta med en hand och faktiskt har hemma slår en släckare du inte orkar bära.",
  },
  {
    question: "Vad innehåller släcksprayen?",
    answer:
      "Två olika saker, beroende på vad den ska släcka. Skumsprayerna för kök och verktygslåda innehåller vatten med små mängder tensider och en glykoleter som bär skummet, drivet av kväve, och pH ligger nära neutralt. Fluortensider, alltså PFAS, är på väg ut ur kategorin: varken Taerosols eller Biltemas skum innehåller några, och båda är biologiskt nedbrytbara.\n\nLitiumsprayerna innehåller AVD, vilket står för vermikulit uppslammat i vatten. Vermikulit är ett naturligt mineral som står emot långt över 1 000 grader, och täcket det lägger över battericellerna kyler dem och hindrar branden från att sprida sig cell för cell.",
  },
];
