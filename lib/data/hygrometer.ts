import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { HYGROMETER } from "@/lib/test-pages";

/**
 * Hygrometer. Underlag i .agent/research/hygrometer.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, GTIN, mätområden, batterityper,
 * mått, vikter och noggrannhet för både fukt och temperatur. Priser och betyg
 * lästa 2026-08-04, toleranser och mått lästa 2026-08-06 i tillverkarens egen
 * specifikation eller i den manual butiken själv länkar till.
 *
 * **Uppmätt av annan:** `Uppmätt avvikelse` finns för en enda produkt och
 * kommer från Bundesverband Schimmelpilzsanierungs provning, inte från oss.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte mätt någon
 * luftfuktighet och inte provat någon mätare.
 *
 * ## ⚠️ Sidans fynd är omskrivet 2026-08-06, och det gamla var fel
 *
 * Sidan byggdes 2026-08-04 på påståendet att **två av tretton mätare anger hur
 * många procentenheter de får visa fel**. Ett gap-pass mot manualerna gav fem
 * av de sju rankade, och tre av de tre kontrollerade påståendena om att en
 * uppgift saknades var falska:
 *
 * - **TFA Moxx** anger ± 4 procentenheter mellan 30 och 80 procent och ± 5
 *   utanför. Det står i §10 i tillverkarens egen svenska bruksanvisning, som
 *   TFA länkar från sin egen produktsida. Webbsidans spectabell tar bara upp
 *   mätområdet, och det var den vi läste.
 * - **Rubicson Kompakt** anger ± 5 mellan 40 och 80 procent och ± 8 utanför.
 *   Det står i manualen Kjell länkar från produktsidan. En kundrecension på
 *   samma sida hänvisade till "noggrannhets-intervallet enligt manualen".
 * - **Beurer HM 22** anger ± 5 mellan 40 och 80 procent och ± 8 utanför,
 *   alltså exakt samma som HM 16. Sidan skrev "8 procentenheter rakt av" och
 *   byggde ett helt omdöme på att den dyrare modellen lovade sämre. Beurers
 *   egen produktsida anger båda spannen för båda modellerna.
 *
 * **Regeln som gäller framåt:** en tolerans står nästan aldrig på
 * produktsidan. Den står i manualen. Öppna manualen innan du skriver något om
 * vad en tillverkare inte anger.
 *
 * ## Vad kategorin faktiskt handlar om
 *
 * ± 5 procentenheter i mellanspannet och ± 8 utanför är branschstandarden:
 * Beurer HM 16, Beurer HM 22 och Rubicson Kompakt anger identiska tal. Det
 * räcker inte. Våra egna sidor ber läsaren agera vid 45 procent (FoHMFS
 * 2014:14), vid 45 till 50 (SweSIAQ, kvalster) och vid 60 (mögel), alltså tre
 * gränser inom femton procentenheter. En mätare med ± 5 spänner tio.
 *
 * Två slår standarden. Govee H5075 anger ± 3, och TFA Moxx anger ± 4 och låg
 * 0,5 fel när någon utomstående mätte den.
 *
 * ## Uppmätt slår angivet
 *
 * ⚠️ `Noggrannhet fukt` är tillverkarens utfästelse, `Uppmätt avvikelse` är ett
 * provningsresultat. **Slå aldrig ihop dem.** Båda står i `ALDRIG_BEDOMD` i
 * lib/spec-schema.mjs: en gissad tolerans vore en påhittad mätning.
 *
 * `Uppmätt avvikelse` är däremot inte längre en markerad jämförelserad. Den
 * kan bara någonsin fyllas för en produkt, eftersom BSS provning från 2015 och
 * 2016 täcker en enda av de sju, och en rad som aldrig går att fylla är en
 * halvbyggd jämförelse. Den ligger kvar som spec hos TFA Moxx.
 *
 * ## Shelly rankas trea trots att sex konkurrenter kallar den bäst i test
 *
 * Testexperterna, Testix, Testkollen, Testkalle, Ulrikkelund och hygrometer.se
 * korar Shelly H&T Gen 3. Den publicerar ingen tolerans för fukt, varken på
 * produktsidan, i dokumentationen eller i kunskapsbasen. Kontrollerat på nytt
 * 2026-08-06, inte antaget.
 *
 * ⚠️ **Den frånvaron drar inte ner betyget**, sedan 2026-08-06. Ett avdrag ska
 * svara mot något varan gör. Shelly får samma noggrannhetsbetyg som varje annan
 * digital mätare utan publicerad tolerans, och det bygger på BSS fynd att
 * samtliga digitala i provningen låg inom 4,4 procentenheter. Den ligger trea
 * på pris och kundbetyg, inte på tystnaden.
 *
 * ## Analogt rankas inte
 *
 * TFA Analog Hygrometer, 139,90 kr, ligger bland de övervägda. Skälet är
 * mätbart och inte en smaksak: mögelsaneringsförbundet fann upp till tolv
 * procentenheters spridning mellan tre exemplar av en och samma analoga modell.
 * Det är inte ett fel som går att kalibrera bort.
 */

export const PRICE_CHECKED = "2026-08-04";

/** Toleranser, mått och vikter lästa i tillverkarens original och i de manualer
 *  butikerna länkar. Se rättelsen 2026-08-06 i lib/corrections.ts. */
export const SPECS_CHECKED = "2026-08-06";

const KJELL = "Kjell & Company";
const PROSHOP = "Proshop";
const CLAS_OHLSON = "Clas Ohlson";
const HORNBACH = "Hornbach";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "govee-h5075",
    name: "H5075 Bluetooth termo-hygrometer",
    shortName: "Govee H5075",
    brand: "Govee",
    image: productImage(HYGROMETER.slug, "govee-h5075"),
    tagline: "Håller sig inom 3 procentenheter. Ingen annan mätare är snävare.",
    scores: {
      noggrannhet: 4.5,
      avlasning: 4.5,
      funktion: 5,
      prisvarde: 4.5,
      bygg: 3.5,
    },
    price: 219,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Govee-Bluetooth-Thermometer-Hygrometer-with-Screen/3129539",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst nära mögelgränsen",
    pros: [
      "± 3 procentenheter, snävast tolerans av mätarna",
      "3 tums display med stora siffror, läsbar tvärs över ett rum",
      "Loggar mätvärden över tid och går att exportera",
      "Larm när fukten passerar en gräns du satt själv",
    ],
    cons: [
      "Bluetooth och inte wifi, så räckvidden slutar ungefär vid en våning",
      "Två AAA-batterier räcker omkring ett halvår, mot år för knappcellerna",
      "Ingen skruvinfästning, den ställs eller magnetfästs",
    ],
    specs: [
      { label: "Pris", value: "219 kr", highlight: true },
      {
        label: "Noggrannhet fukt",
        shortLabel: "Noggrannhet",
        value: "± 3 procentenheter",
        highlight: true,
      },
      { label: "Mätområde fukt", value: "0–99 %", highlight: true },
      { label: "Noggrannhet temperatur", value: "± 0,3 °C", highlight: true },
      { label: "Uppkoppling", value: "Bluetooth, app", highlight: true },
      { label: "Avläsning", value: "Display, 3 tum", highlight: true },
      { label: "Loggning", value: "Ja, med export" },
      { label: "Mätområde temperatur", value: "−20 till 60 °C" },
      { label: "Ström", value: "2 × AAA" },
      { label: "Batteritid", value: "Cirka 6 månader" },
      { label: "Mått", value: "65 × 19 × 79 mm" },
      { label: "Vikt", value: "50 g" },
      { label: "GTIN", value: "6974316991489" },
    ],
    verdict:
      "Govee H5075 kostar 219 kronor och håller sig inom 3 procentenheter. Ingen annan mätare i jämförelsen är snävare, och de tre som ligger närmast anger ± 5 i mellanspannet och ± 8 utanför det.\n\nDe två procentenheterna avgör något konkret. Mögel brukar sättas vid varaktigt över 60 procent, och en avläsning på 58 med ± 5 kan i verkligheten vara 53 eller 63. Med ± 3 vet du att du ligger mellan 55 och 61, alltså i värsta fall precis på gränsen och inte tre enheter över den. Temperaturen anges till ± 0,3 grader, tio gånger snävare än vad Beurer och Rubicson lovar. Displayen är tre tum med stora siffror och går att läsa från andra sidan rummet. Den loggar över tid och låter dig exportera, så du kan se om avfuktaren ändrade något. Larm vid en egen gräns ingår.\n\n**Räckvidden är begränsningen.** Den går på Bluetooth, inte wifi, och kopplingen når ungefär en våning. Ska mätaren sitta i en krypgrund du sällan går ner i får du gå ner dit ändå för att läsa av den, och då är Shelly H&T Gen 3 rätt verktyg trots att den kostar dubbelt.\n\nKöp den. Den mäter noggrannast, den loggar, den larmar, och den kostar 219 kronor. Ska den sitta bortom Bluetooth-räckvidd tar du Shelly i stället.",
  },
  {
    id: "tfa-moxx",
    name: "Moxx digital termo-hygrometer",
    shortName: "TFA Moxx",
    brand: "TFA Dostmann",
    image: productImage(HYGROMETER.slug, "tfa-moxx"),
    tagline: "Mätt mot ett kalibrerat referensinstrument, och den låg 0,5 fel.",
    scores: {
      noggrannhet: 5,
      avlasning: 3.5,
      funktion: 3,
      prisvarde: 4.5,
      bygg: 4,
    },
    price: 229,
    merchant: HORNBACH,
    merchantUrl:
      "https://www.hornbach.se/p/termo-hygrometer-tfa-moxx-digital-svart-inkl-batteri/6382927/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "0,5 procentenheters uppmätt fel",
    pros: [
      "0,5 procentenheters avvikelse när mögelsaneringsförbundet mätte, bäst av fjorton",
      "± 4 procentenheter mellan 30 och 80 procent, näst snävast av mätarna",
      "Knappcell som räcker år, inte månader",
      "Komfortzonsindikator och min- och maxminne",
    ],
    cons: [
      "Provningen är från 2015 och 2016 och gäller de exemplaren",
      "Liten display, 57 × 69 mm, avsedd att läsas på nära håll",
      "Ingen app, ingen loggning över tid och inget larm",
    ],
    specs: [
      { label: "Pris", value: "229 kr", highlight: true },
      {
        label: "Noggrannhet fukt",
        shortLabel: "Noggrannhet",
        value: "± 4 pe (30–80 %), ± 5 utanför",
        highlight: true,
      },
      { label: "Mätområde fukt", value: "20–99 %", highlight: true },
      { label: "Noggrannhet temperatur", value: "± 1,0 °C", highlight: true },
      { label: "Uppkoppling", value: "Ingen", highlight: true },
      { label: "Avläsning", value: "Display, 57 × 69 mm", highlight: true },
      { label: "Uppmätt avvikelse", value: "0,5 procentenheter" },
      { label: "Loggning", value: "Min och max" },
      { label: "Mätområde temperatur", value: "0 till 50 °C" },
      { label: "Ström", value: "1 × CR2032" },
      { label: "Mått", value: "57 × 13 × 69 mm" },
      { label: "Vikt", value: "25 g" },
      { label: "GTIN", value: "4009816022929" },
    ],
    verdict:
      "TFA Moxx kostar 229 kronor och är den enda mätaren här som någon utomstående har mätt. Bundesverband Schimmelpilzsanierung, tyska mögelsaneringsförbundet, jämförde fjorton mätare mot ett kalibrerat referensinstrument för 1 050 euro. Moxx låg högst 0,5 procentenheter och 0,2 grader fel, bäst av samtliga digitala.\n\n**Det talet är av en annan sort än de andra i tabellen.** Ett par procentenheter från tillverkaren är ett löfte; 0,5 är ett utfall. Tre exemplar av samma modell skilde dessutom högst en procentenhet från varandra, vilket är det som skiljer en tillverkning som håller från en som råkar träffa rätt. TFA anger själva ± 4 procentenheter mellan 30 och 80 procent och ± 5 utanför, snävare än branschstandarden på ± 5 och ± 8. Knappcellen räcker år där de uppkopplade drar batterier på månader, och komfortzonsindikatorn plus min- och maxminnet svarar på vad fukten gjorde i natt.\n\n**Provningen är tio år gammal.** Den gjordes 2015 och 2016 och gäller de exemplar förbundet hade på bordet, inte den som ligger i lådan hos Hornbach i dag. Sifferbeviset är alltså starkare än på någon annan mätare här, och samtidigt äldre än man vill.\n\nTa den om du vill ha den mätare vars noggrannhet någon faktiskt kontrollerat, och nöjer dig med att gå fram till den. Displayen är 57 gånger 69 millimeter och det finns varken app, kurva eller larm. Vill du se en kurva är Govee H5075 tio kronor billigare.",
  },
  {
    id: "shelly-ht-gen3",
    name: "H&T Gen 3 termometer och hygrometer",
    shortName: "Shelly H&T Gen 3",
    brand: "Shelly",
    image: productImage(HYGROMETER.slug, "shelly-ht-gen3"),
    tagline: "Visar krypgrunden i telefonen utan att du går ner i den.",
    scores: {
      noggrannhet: 3.5,
      avlasning: 5,
      funktion: 5,
      prisvarde: 2.5,
      bygg: 3.5,
    },
    price: 429,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-temperatursensorer/shelly-ht-gen-3-termometer-och-hygrometer-vit-p52245",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 3.5, count: 36, checkedAt: PRICE_CHECKED },
    superlative: "Läses av var du än är",
    pros: [
      "Wifi, så du ser krypgrunden utan att gå ner i den",
      "E-pappersdisplay som visar värdet även när batteriet är nästan slut",
      "Kan starta en avfuktare vid en nivå du satt själv",
      "Fyra AA-batterier räcker omkring ett år",
    ],
    cons: [
      "429 kronor, dyrast av mätarna, och Govee loggar för hälften",
      "3,5 i kundbetyg hos Kjell, lägst av mätarna",
      "Rapporterar först vid 0,5 graders eller 5 procentenheters ändring, så små rörelser syns inte i kurvan",
    ],
    specs: [
      { label: "Pris", value: "429 kr", highlight: true },
      { label: "Uppkoppling", value: "Wifi, app, automationer", highlight: true },
      { label: "Avläsning", value: "E-pappersdisplay och app", highlight: true },
      { label: "Loggning", value: "Ja, i molnet" },
      { label: "Rapporttröskel", value: "0,5 °C eller 5 procentenheter" },
      { label: "Ström", value: "4 × AA (LR6), medföljer ej" },
      { label: "Batteritid", value: "Cirka 1 år" },
      { label: "Mått", value: "70 × 70 × 26 mm" },
      { label: "Vikt", value: "47 g" },
    ],
    verdict:
      "Shelly H&T Gen 3 kostar 429 kronor och är den enda mätaren du kan läsa av från soffan. Wifi, app och molnloggning ingår, och den kan styra andra apparater, exempelvis starta en avfuktare när fukten passerar 60 procent.\n\n**En mätare i krypgrunden gör nytta först när någon läser av den, och en krypgrund besöks sällan.** Det är hela argumentet, och det är starkt: samma sak gäller vinden, förrådet och stugan i februari. E-pappersdisplayen visar dessutom senaste värdet utan ström, så den är läsbar även när batteriet tagit slut. Fyra AA-batterier räcker omkring ett år. Den rapporterar när temperaturen ändrats 0,5 grader eller fukten 5 procentenheter, vilket ger en kurva som visar förlopp men rundar av småsvängningar.\n\n**Priset är invändningen.** 429 kronor är nästan dubbelt mot Govee H5075, som loggar, larmar och dessutom anger ± 3 procentenheters tolerans. Hos Kjell får den 3,5 i kundbetyg från 36 betyg, lägst av mätarna här.\n\nKöp den om mätaren ska sitta där du inte går, eller om den ska dra igång något annat. Ska den stå i sovrummet betalar du 210 kronor extra för en uppkoppling du inte behöver, och då är Govee bättre på varje punkt som återstår.",
  },
  {
    id: "clas-ohlson-3-pack",
    name: "Digital termometer och hygrometer inomhus, 3-pack",
    shortName: "Clas Ohlson 3-pack",
    brand: "Clas Ohlson",
    image: productImage(HYGROMETER.slug, "clas-ohlson-3-pack"),
    tagline: "Tre rum samtidigt, och fukt är en fråga per rum.",
    scores: {
      noggrannhet: 3.5,
      avlasning: 5,
      funktion: 3,
      prisvarde: 5,
      bygg: 3.5,
    },
    price: 149.9,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Digital-termometer-och-hygrometer-inomhus,-3-pack/p/46-1514",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 90, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst för att hitta rätt rum",
    pros: [
      "Tre mätare för 149,90, femtio kronor per rum",
      "Låter dig jämföra rum mot varandra, vilket en ensam mätare aldrig kan",
      "Mäter 1 till 99 procent, bredaste mätområdet av mätarna",
      "± 0,5 grader på temperaturen, näst snävast här",
    ],
    cons: [
      "Ingen loggning, ingen app och inget larm",
      "45 × 58 millimeter stora displayer, avsedda att stå nära",
      "Knappcellen sitter bakom en skruv, så batteribytet kräver mejsel",
    ],
    specs: [
      { label: "Pris", value: "149,90 kr", highlight: true },
      { label: "Mätområde fukt", value: "1–99 %", highlight: true },
      { label: "Noggrannhet temperatur", value: "± 0,5 °C", highlight: true },
      { label: "Uppkoppling", value: "Ingen", highlight: true },
      {
        label: "Avläsning",
        value: "Tre fristående displayer, 45 × 58 mm",
        highlight: true,
      },
      { label: "Mätområde temperatur", value: "−10 till 50 °C" },
      { label: "Placering", value: "Tre rum samtidigt" },
      { label: "Ström", value: "1 × CR2032 per mätare, medföljer" },
      { label: "Mått", value: "45 × 58 × 15 mm" },
      { label: "Vikt", value: "31 g" },
    ],
    verdict:
      "Clas Ohlsons trepack kostar 149,90 kronor och ger tre mätare, alltså femtio kronor per rum. Mätområdet är 1 till 99 procent, bredare än de 20 till 95 som är standard i kategorin, och temperaturen anges till ± 0,5 grader.\n\n**Fukt är en egenskap hos ett rum och inte hos en bostad.** Sovrummet bakom garderoben, badrummet efter duschen, källartrappan och krypgrunden ger fyra olika svar, och en ensam mätare i vardagsrummet ger inget av dem. Tre mätare låter dig jämföra rummen mot varandra, och det är jämförelsen som pekar ut var problemet sitter: 55 i vardagsrummet betyder något helt annat när sovrummet visar 68. Det breda mätområdet spelar roll i en kall krypgrund om vintern, där mätare som slutar vid 95 slår i taket. Displayerna är 45 gånger 58 millimeter och går att både hänga och ställa.\n\n**De visar bara.** Ingen loggning, ingen app, inget larm och inget min- och maxminne, så du får läsa av dem själv med jämna mellanrum. Knappcellen sitter dessutom bakom en skruv.\n\nKöp de här först, innan du köper något annat i luftklustret. De talar om vilket rum problemet sitter i, och det är den frågan du behöver svar på innan en avfuktare för fyra tusen kronor är ett rimligt köp. Vet du redan vilket rum det gäller och vill följa det över tid ska du ta Govee H5075.",
  },
  {
    id: "beurer-hm-16",
    name: "HM 16 termo-hygrometer",
    shortName: "Beurer HM 16",
    brand: "Beurer",
    image: productImage(HYGROMETER.slug, "beurer-hm-16"),
    tagline: "± 5 procentenheter i det spann ett vardagsrum ligger i.",
    scores: {
      noggrannhet: 4,
      avlasning: 3.5,
      funktion: 3,
      prisvarde: 4,
      bygg: 4,
    },
    price: 199.9,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Beurer-HM-16-hygrometer---termometer/p/36-8776",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 508, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för sovrum och vardagsrum",
    pros: [
      "± 5 procentenheter mellan 40 och 80 procent, alltså i normalt inomhusklimat",
      "± 1 grad på temperaturen mellan 0 och 40",
      "508 omdömen hos butiken, största kundunderlaget av mätarna",
      "Sjuttio gram och elva millimeter tjock, ligger platt mot väggen",
    ],
    cons: [
      "± 8 procentenheter under 40 och över 80, alltså i krypgrunden och badrummet",
      "± 5 räcker inte för att avgöra om du ligger över eller under 60",
      "Ingen loggning, ingen app och inget larm",
    ],
    specs: [
      { label: "Pris", value: "199,90 kr", highlight: true },
      {
        label: "Noggrannhet fukt",
        shortLabel: "Noggrannhet",
        value: "± 5 pe (40–80 %), ± 8 utanför",
        highlight: true,
      },
      { label: "Mätområde fukt", value: "20–95 %", highlight: true },
      {
        label: "Noggrannhet temperatur",
        value: "± 1 °C (0–40), ± 2 °C (40–50)",
        highlight: true,
      },
      { label: "Uppkoppling", value: "Ingen", highlight: true },
      { label: "Avläsning", value: "Display med komfortindikator", highlight: true },
      { label: "Mätområde temperatur", value: "0 till 50 °C" },
      { label: "Mått", value: "99 × 11 × 81 mm" },
      { label: "Vikt", value: "70 g" },
      { label: "GTIN", value: "4211125679156" },
    ],
    verdict:
      "Beurer HM 16 kostar 199,90 kronor och håller ± 5 procentenheter mellan 40 och 80 procent. Utanför det spannet, alltså under 40 och över 80, blir toleransen ± 8. Temperaturen ligger på ± 1 grad upp till 40.\n\n**Fördubblingen faller på fel ställen.** De två platser man oftast vill mäta är en krypgrund om vintern och ett badrum efter en dusch, och båda ligger utanför mellanspannet. Inne i spannet ligger däremot de tre gränser som avgör vad du ska göra: 45 procent från Folkhälsomyndigheten, 45 till 50 från SweSIAQ och 60 för mögel. Där håller ± 5, vilket betyder att en avläsning på 58 kan vara 53 eller 63. Mätaren kan tala om ungefär var du ligger. Om du ska agera avgör den inte åt dig.\n\n**Det är samma tolerans som Beurers egen HM 22 och som Rubicson Kompakt.** Tre mätare mellan 179,90 och 269 kronor med identiska tal, vilket gör noggrannheten till en icke-fråga mellan dem och priset till hela skillnaden. HM 16 är billigast av de tre.\n\nTa den om mätaren ska stå i ett bostadsrum och du vill ha en stor, platt display på väggen utan app. Ska den ner i krypgrunden gäller ± 8 och då är Govee H5075 för tjugo kronor mer ett bättre köp på varje punkt.",
  },
  {
    id: "beurer-hm-22",
    name: "HM 22 termo-hygrometer",
    shortName: "Beurer HM 22",
    brand: "Beurer",
    image: productImage(HYGROMETER.slug, "beurer-hm-22"),
    tagline: "Klocka, timer och fuktmätare i samma display.",
    scores: {
      noggrannhet: 4,
      avlasning: 3.5,
      funktion: 3.5,
      prisvarde: 2.5,
      bygg: 4,
    },
    price: 269,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Beurer-HM-22-hygrometer---termometer/p/36-8777",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 82, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som vill ha klockan också",
    pros: [
      "Visar datum, tid och har timerfunktion",
      "± 5 procentenheter mellan 40 och 80 procent, samma som HM 16",
      "Mäter från −10 grader, alltså även i ett kallt utrymme",
      "4,5 i kundbetyg hos butiken",
    ],
    cons: [
      "69 kronor dyrare än HM 16, som mäter exakt lika noga",
      "160 gram och 29 millimeter djup, klumpigast av mätarna",
      "Ingen loggning över tid och ingen app",
    ],
    specs: [
      { label: "Pris", value: "269 kr", highlight: true },
      {
        label: "Noggrannhet fukt",
        shortLabel: "Noggrannhet",
        value: "± 5 pe (40–80 %), ± 8 utanför",
        highlight: true,
      },
      { label: "Mätområde fukt", value: "20–95 %", highlight: true },
      { label: "Noggrannhet temperatur", value: "± 1 °C (0–40)", highlight: true },
      { label: "Uppkoppling", value: "Ingen", highlight: true },
      { label: "Avläsning", value: "Display med datum och tid", highlight: true },
      { label: "Mätområde temperatur", value: "−10 till 50 °C" },
      { label: "Mått", value: "106 × 29 × 109 mm" },
      { label: "Vikt", value: "160 g" },
      { label: "GTIN", value: "4211125678043" },
    ],
    verdict:
      "Beurer HM 22 kostar 269 kronor och mäter precis lika noga som HM 16 för 199,90: ± 5 procentenheter mellan 40 och 80 procent, ± 8 utanför, ± 1 grad upp till 40. De 69 kronorna köper alltså inte en bättre mätning.\n\n**Vad de köper är en klocka.** Datum, tid och timer i samma display, och ett mätområde som börjar vid −10 grader mot HM 16:s noll, vilket gör den användbar i ett ouppvärmt förråd. Det är rimliga saker att vilja ha på ett nattduksbord eller i ett kök, där du ändå vill ha en klocka och lika gärna kan låta den visa fukten också.\n\n**Den är stor.** 106 gånger 109 millimeter och 29 millimeter djup, 160 gram, alltså mer än dubbelt så tung som HM 16 och tre gånger så tjock. Den står på en bänk snarare än sitter på en vägg, och den tar plats där.\n\nKöp den bara om du vill ha klockan och timern. Är det fukten du är ute efter mäter HM 16 identiskt för 69 kronor mindre, och Govee H5075 mäter snävare för 50 kronor mindre.",
  },
  {
    id: "rubicson-kompakt-digital",
    name: "Kompakt digital hygrometer",
    shortName: "Rubicson Kompakt",
    brand: "Rubicson",
    image: productImage(HYGROMETER.slug, "rubicson-kompakt-digital"),
    tagline: "Samma tolerans som Beurer, i en mätare stor som en tändsticksask.",
    scores: {
      noggrannhet: 4,
      avlasning: 3,
      funktion: 2.5,
      prisvarde: 3.5,
      bygg: 3.5,
    },
    price: 179.9,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/termometrar-hygrometrar/hygrometrar/rubicson-kompakt-digital-hygrometer-p48599",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 473, checkedAt: PRICE_CHECKED },
    superlative: "Minst av allihop, 66 × 43 mm",
    pros: [
      "± 5 procentenheter mellan 40 och 80 procent, samma som båda Beurer",
      "66 × 43 millimeter och 31 gram, ryms var som helst",
      "473 betyg hos Kjell, störst kundunderlag av mätarna",
      "Knappcellen medföljer och sitter i en hållare utan skruv",
    ],
    cons: [
      "± 8 procentenheter under 40 och över 80 procent",
      "Inget min- och maxminne, så du ser bara läget just nu",
      "Mätområdet slutar vid 95 procent, så en blöt krypgrund slår i taket",
    ],
    specs: [
      { label: "Pris", value: "179,90 kr", highlight: true },
      {
        label: "Noggrannhet fukt",
        shortLabel: "Noggrannhet",
        value: "± 5 pe (40–80 %), ± 8 utanför",
        highlight: true,
      },
      { label: "Mätområde fukt", value: "20–95 %", highlight: true },
      { label: "Noggrannhet temperatur", value: "± 1 °C (0–40)", highlight: true },
      { label: "Uppkoppling", value: "Ingen", highlight: true },
      { label: "Avläsning", value: "Display, 66 × 43 mm", highlight: true },
      { label: "Mätområde temperatur", value: "−10 till 50 °C" },
      { label: "Ström", value: "1 × CR2032, medföljer" },
      { label: "Mått", value: "66 × 43 × 26 mm" },
      { label: "Vikt", value: "31 g" },
    ],
    verdict:
      "Rubicson Kompakt kostar 179,90 kronor och mäter ± 5 procentenheter mellan 40 och 80 procent, ± 8 utanför. Det är samma tolerans som Beurer HM 16 för 199,90 och Beurer HM 22 för 269, i en mätare som är 66 gånger 43 millimeter och väger 31 gram.\n\n**Storleken är hela argumentet mot de andra tre.** Den ryms på en fönsterbräda bakom en kruka, i en garderob, i ett skåp under diskbänken eller i en husvagn, alltså på ställen där en display på tio centimeter inte får plats eller är i vägen. Knappcellen medföljer och sitter i en hållare utan skruv. 473 betyg hos Kjell med 4,0 i snitt är det största kundunderlaget av mätarna här, vilket säger att den håller.\n\n**Den kommer inte ihåg något.** Inget min- och maxminne, ingen loggning, alltså bara läget i det ögonblick du tittar. Luftfuktigheten varierar över dygnet och med om någon nyss duschat, så en enskild avläsning säger mindre än man tror, och här får du inget annat.\n\nTa den när mätaren ska in på ett trångt ställe, eller när du vill ha flera och Clas Ohlsons trepack är för stort. Ska du följa fukten över tid är min- och maxminnet på TFA Moxx femtio kronor extra värt.",
  },
];

export const HYGROMETER_PRODUCTS: Product[] = resolveProducts(HYGROMETER, SEEDS);

/**
 * Övervägda men inte rankade.
 *
 * Den analoga ligger här av ett mätbart skäl och inte av smak, se filhuvudet.
 * De två sista är givare till andra apparater och inte fristående mätare, så de
 * hade inte gått att jämföra på kategorins kriterier.
 *
 * ⚠️ Clas Ohlsons trådlösa anger "Noggrannhet: Temperatur ± 0,5 ºC,
 * Luftfuktighet 1 % (RH)" både på produktsidan och i manualen. En procentenhets
 * noggrannhet på en hygrometer för 299 kronor är labbklass och orimlig, och
 * butikens egen kundfråga besvarar samma tal som displayens steg. Vi återger
 * det därför inte som en tolerans. Se .agent/research/hygrometer.md.
 */
export const HYGROMETER_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "TFA",
    name: "Analog Hygrometer",
    reason:
      "Billigast av det vi kartlagt, 139,90 kronor, men analog. Mögelsaneringsförbundet fann upp till tolv procentenheters spridning mellan tre exemplar av en och samma analoga modell, mellan enskilda urtavlor av samma vara. Det går inte att kalibrera bort och det syns inte på mätaren. Deras rekommendation efter provningen var digitalt rakt av. Mätområdet är dessutom 0 till 99 procent, alltså hela skalan, vilket inte utesluter något.",
    approxPrice: 139.9,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/termometrar-hygrometrar/hygrometrar/tfa-analog-hygrometer-p48598",
  },
  {
    brand: "Rubicson",
    name: "Digital hygrometer",
    reason:
      "249,90 kronor, 70 kronor mer än systermodellen Rubicson Kompakt, för en display på 99 × 81 millimeter och ett min- och maxminne. Manualen anger ± 0,1 grad för temperaturen och ingen tolerans för fukten, medan den mindre och billigare Kompakt-modellen anger ± 5 procentenheter mellan 40 och 80. Den som vill ha minnet får alltså ge upp den enda uppgift som avgör om avläsningen går att lita på.",
    approxPrice: 249.9,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/termometrar-hygrometrar/hygrometrar/rubicson-digital-hygrometer-p48829",
  },
  {
    brand: "Clas Ohlson",
    name: "Trådlös hygrometer/termometer",
    reason:
      "299 kronor för en inomhusdel och en trådlös givare, och därmed rätt tanke för en krypgrund eller källare du inte vill gå ner i. Givaren mäter 20 till 95 procent och sänder var sextionde sekund. För trettio kronor mindre ger Govee H5075 en angiven tolerans på ± 3 procentenheter, loggning över tid och larm, och för hundratrettio kronor mer ger Shelly H&T Gen 3 samma räckvidd över wifi i stället för på 433 megahertz.",
    approxPrice: 299,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Tradlos-hygrometer-termometer/p/36-6725",
  },
  {
    brand: "Nexa",
    name: "WTH-103 trådlös termometer/hygrometer",
    reason:
      "199,90 kronor och byggd för att ingå i Nexas system snarare än att stå för sig själv. Den som redan har Nexa hemma har ett skäl att välja den som inte går att väga in i en rankning som ska gälla alla.",
    approxPrice: 199.9,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Nexa-WTH-103-tradlos-termometer---hygrometer/p/36-8988",
  },
  {
    brand: "Schneider",
    name: "Wiser sensor temperatur och luftfuktighet",
    reason:
      "489 kronor och Zigbee 3.0, alltså dyrast av det vi övervägt utom Kjells datalogger. Den kräver en Wiser-hubb för att göra någon nytta alls, vilket gör den till en systemkomponent och inte en hygrometer man köper för att mäta fukt.",
    approxPrice: 489,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Schneider-Wiser-sensor-temperatur-och-luftfuktighet/p/36-9675",
  },
  {
    brand: "Kjell & Company",
    name: "Datalogger Pro",
    reason:
      "1 199 kronor och dyrast av det vi kartlagt, byggd för att logga över långa perioder och läsas ut i efterhand. Den riktar sig till den som ska dokumentera ett förlopp, exempelvis inför en fuktutredning, snarare än till den som vill veta hur det står till i sovrummet. Fyra betyg hos butiken.",
    approxPrice: 1199,
    merchant: KJELL,
  },
];

/**
 * Vanliga frågor.
 *
 * ⚠️ Saltmetoden nämns i en av frågorna men **redovisas aldrig som något vi
 * utfört**. Vi har inte kontrollmätt någon hygrometer, och ett resultat vore
 * ett påhittat mätvärde. Frågan säger vad metoden är och pekar på det enklare
 * greppet att ställa två mätare bredvid varandra.
 */
export const HYGROMETER_FAQ = [
  {
    question: "Vilken hygrometer är bäst 2026?",
    answer:
      "Govee H5075 för 219 kronor hos Proshop. Den håller sig inom 3 procentenheter, vilket är snävast av mätarna vi jämfört och två enheter bättre än de ± 5 som är branschstandard. Den loggar mätvärden över tid, går att exportera och larmar vid en gräns du satt själv, och displayen är 3 tum med stora siffror. Tvåa är TFA Moxx för 229 kronor hos Hornbach, som är den enda mätaren någon oberoende har mätt: tyska mögelsaneringsförbundet fann högst 0,5 procentenheters avvikelse mot ett kalibrerat referensinstrument. Ska mätaren sitta i en krypgrund du inte går ner i är Shelly H&T Gen 3 för 429 kronor den enda med wifi.",
  },
  {
    question: "Vad ska luftfuktigheten vara inomhus?",
    answer:
      "30 till 45 procent är vanligt i ett uppvärmt svenskt hem under eldningssäsongen, och det finns inget svenskt riktvärde som säger att det är för torrt. Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 innehåller ingen nedre gräns och inget råd om att fukta. Åt andra hållet anger de 7 gram vatten per kilo torr luft under eldningssäsongen, vilket motsvarar cirka 45 procent vid 21 grader, som en indikation som kan få tillsynsmyndigheten att kräva undersökning av byggnaden. SweSIAQ anger att kvalster kan börja växa över 45 till 50 procent, och mögel brukar sättas vid varaktigt över 60. Observera att allmänna råd är rekommendationer och inte bindande regler, och att 45 procent är en indikation och inget gränsvärde.",
  },
  {
    question: "Hur mycket fel får en hygrometer visa?",
    answer:
      "± 5 procentenheter mellan 40 och 80 procent, och ± 8 utanför det spannet, är vad de flesta tillverkare anger. Beurer HM 16, Beurer HM 22 och Rubicson Kompakt anger exakt samma tal trots att de kostar 179,90, 199,90 och 269 kronor. Två mätare är snävare: TFA Moxx anger ± 4 mellan 30 och 80 procent, och Govee H5075 anger ± 3 rakt av. Talet står nästan aldrig på produktsidan utan i bruksanvisningen, och den ligger som PDF på tillverkarens eller butikens egen sida.",
  },
  {
    question: "Räcker ± 5 procentenheter?",
    answer:
      "Inte nära en gräns. De tre nivåer där det är rimligt att göra något ligger på 45 procent (Folkhälsomyndigheten), 45 till 50 (SweSIAQ, kvalster) och 60 (mögel), alltså tre gränser inom femton procentenheter. En mätare med ± 5 spänner tio procentenheter, så en avläsning på 58 kan i verkligheten vara 53 eller 63, på båda sidor om mögelgränsen. Med ± 8 täcker felmarginalen alla tre gränserna samtidigt. Det betyder inte att en sådan mätare är oanvändbar, men den svarar på om det är fuktigt, inte på om du ska agera. Mät hellre upprepat under två veckor än en gång med hög precision.",
  },
  {
    question: "Är en dyr hygrometer noggrannare än en billig?",
    answer:
      "Inte enligt den enda mätning vi hittat, och inte enligt tillverkarnas egna tal. När tyska mögelsaneringsförbundet jämförde fjorton mätare mot ett kalibrerat referensinstrument för 1 050 euro var den mest träffsäkra digitala en modell för 9,99 euro, som låg inom 0,5 procentenheter. Den sämsta digitala kostade 5,99 euro och låg 4,4 procentenheter fel, alltså fortfarande godkänt. Samma mönster syns här: Rubicson Kompakt för 179,90 anger samma tolerans som Beurer HM 22 för 269, och den snävaste av allihop kostar 219. Det priset köper är display, loggning och uppkoppling, inte noggrannhet.",
  },
  {
    question: "Är analoga hygrometrar sämre än digitala?",
    answer:
      "På den punkt som gått att mäta, ja. Mögelsaneringsförbundet fann upp till tolv procentenheters spridning mellan tre exemplar av en och samma analoga modell, alltså mellan urtavlor av samma vara. Det går inte att kalibrera bort och syns inte på mätaren. Deras rekommendation efter provningen var digitalt rakt av, eftersom de digitala klarade sig genomgående bra oavsett pris. Vi rankar därför ingen analog mätare, utan har lagt TFA Analog Hygrometer bland de övervägda med det skälet utskrivet.",
  },
  {
    question: "Hur många hygrometrar behöver jag?",
    answer:
      "Fler än en, om du inte redan vet var problemet sitter. Luftfuktighet är en egenskap hos ett rum och inte hos en bostad, och sovrummet bakom garderoben, badrummet efter duschen, källartrappan och krypgrunden ger fyra olika svar. En ensam mätare i vardagsrummet svarar på ingen av dem. Clas Ohlsons trepack för 149,90 kronor ger dig femtio kronor per rum och låter dig jämföra rummen mot varandra, och det är jämförelsen som pekar ut var fukten samlas. Har du redan hittat rummet är en mätare som loggar över tid mer värd än tre som bara visar.",
  },
  {
    question: "Var ska hygrometern sitta?",
    answer:
      "Fritt i rummet, i ungefär den höjd där du vistas, och en bit från fönster, ytterväggar och värmekällor. En mätare bakom en gardin, i solljus eller ovanför ett element mäter mikroklimatet på just den platsen och inte rummet. Ska du mäta i en krypgrund eller på en vind är det platsens klimat du är ute efter, och då gäller i stället att välja en mätare du kan läsa av utan att gå dit, trådlös eller uppkopplad.",
  },
  {
    question: "Kan jag kontrollera att min hygrometer visar rätt?",
    answer:
      "Det finns en känd metod med mättad koksaltlösning i en sluten behållare, som ger ungefär 75 procent relativ fuktighet vid rumstemperatur. Vi har inte utfört den och redovisar därför inga resultat från den. Det enklare greppet är att ställa två mätare bredvid varandra i samma rum ett dygn. Skiljer de sig mer än några procentenheter vet du att åtminstone den ena visar fel, men inte vilken, och då ska du inte lita på någon av dem för beslut nära en gräns.",
  },
  {
    question: "Vad är skillnaden mellan en hygrometer och en hygrostat?",
    answer:
      "En hygrometer visar luftfuktigheten. En hygrostat mäter också, men styr dessutom något utifrån värdet, exempelvis startar en avfuktare vid 60 procent och stänger av den vid 50. Flera avfuktare och luftfuktare har inbyggd hygrostat, och det är den funktionen som avgör om apparaten kan sluta i tid i stället för att gå tills tanken är full eller tom. Shelly H&T Gen 3 hamnar mitt emellan: den är en hygrometer som kan styra andra apparater via appen, förutsatt att de går att styra.",
  },
  {
    question: "Mäter en hygrometer fukt i väggar?",
    answer:
      "Nej. En hygrometer mäter luftens fuktighet, medan fukt i trä, betong eller gips mäts som fuktkvot med ett instrument med stift som trycks in i materialet. Det är två olika mätningar och två olika instrument. Ett högt värde i luften kan mycket väl bero på fukt i konstruktionen, men mätaren kan inte skilja det från markfukt, en läcka, dålig ventilation eller tvätt som hänger på tork. Misstänker du en skada i konstruktionen är det en besiktning som behövs, inte en display på väggen.",
  },
  {
    question: "Varför får jag imma på fönstren fast hygrometern visar normalt?",
    answer:
      "Därför att kondens uppstår när fuktig luft möter en kall yta, och glaset är kallare än rummet. Den temperatur där luften blir mättad kallas daggpunkt, och ett gammalt tvåglasfönster kan mycket väl ligga under den även när rummets luft håller 40 procent. Imma på insidan betyder alltså antingen att luften är för fuktig eller att fönstret är kallt, ofta både och. Visar mätaren under 45 procent är det fönstret som är problemet och en avfuktare gör ingen nytta.",
  },
  {
    question: "Hur ofta ska jag läsa av mätaren?",
    answer:
      "Läs den ett par gånger i veckan under två veckor innan du drar någon slutsats. Luftfuktigheten varierar över dygnet, med vädret och med om någon nyss duschat eller lagat mat, så en enskild avläsning säger lite. En mätare med min- och maxminne gör jobbet åt dig genom att spara det högsta och lägsta värdet sedan du nollställde, och en som loggar över tid låter dig se om en avfuktare faktiskt ändrat något. Efter de två veckorna räcker det att titta till den när årstiden byter.",
  },
];
