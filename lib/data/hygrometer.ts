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
 * mått och angiven noggrannhet. Allt läst 2026-08-04 hos butiken eller
 * tillverkaren, i strukturerad data eller i deras egen specifikation.
 *
 * **Uppmätt av annan:** raden `Uppmätt avvikelse` finns för en enda produkt och
 * kommer från Bundesverband Schimmelpilzsanierungs provning, inte från oss.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte mätt någon
 * luftfuktighet och inte provat någon mätare.
 *
 * ## Sidans fynd
 *
 * **Av tretton kartlagda produkter mellan 139,90 och 1 199 kronor anger två
 * hur många procentenheter de får visa fel.** Mätområdet trycks alltid,
 * avvikelsen aldrig. Där en tolerans står gäller den ofta temperaturen och inte fukten,
 * inte det man köpte mätaren för: Rubicsons produktblad hos Kjell anger ±1 °C
 * och ingenting om fukten.
 *
 * Det spelar roll därför att våra egna sidor ber läsaren agera vid 45 procent
 * (FoHMFS 2014:14), vid 45 till 50 (SweSIAQ, kvalster) och vid 60 (mögel). En
 * mätare med ±5 procentenheter som visar 58 kan stå på 53 eller 63.
 *
 * ## De två som anger något är inte de dyra
 *
 * - **Govee H5075**, 219 kr: ±3 procentenheter.
 * - **Beurer HM 16**, 199,90 kr: ±5 mellan 40 och 80 procent, ±8 utanför.
 * - **Beurer HM 22**, 269 kr: 8 procentenheter, sämre än den billigare.
 *
 * Och den enda produkt någon faktiskt mätt, TFA Moxx, anger själv ingenting.
 * Mögelsaneringsförbundet fann 0,5 procentenheters avvikelse på en mätare som
 * kostade 9,99 euro. Utelämnat tal betyder alltså inte dåligt tal, vilket är
 * skälet till att `Angiven noggrannhet` och `Uppmätt avvikelse` är två rader.
 *
 * ⚠️ **Slå aldrig ihop dem.** Det ena är en utfästelse, det andra ett resultat.
 * Båda står i `ALDRIG_BEDOMD` i lib/spec-schema.mjs: en gissad tolerans vore en
 * påhittad mätning.
 *
 * ## Shelly rankas fyra trots att sex konkurrenter kallar den bäst i test
 *
 * Testexperterna, Testix, Testkollen, Testkalle, Ulrikkelund och hygrometer.se
 * korar Shelly H&T Gen 3. Den publicerar ingen tolerans för fukt, varken på
 * produktsidan, i dokumentationen eller i kunskapsbasen. Det är kontrollerat
 * 2026-08-04, inte antaget. Hos Kjell har den 3,5 i kundbetyg, lägst av allt vi
 * mätt i kategorin, och kostar mest av de rankade.
 *
 * Den rankas ändå fyra och inte sist, eftersom trådlös avläsning och loggning
 * är verkliga fördelar och väger 40 av 100 tillsammans. Poängen är inte att
 * produkten är dålig, utan att ingen av de sex frågade efter talet.
 *
 * ## Analogt rankas inte
 *
 * TFA Analog Hygrometer, 139,90 kr, ligger bland de övervägda. Skälet är
 * mätbart och inte en smaksak: mögelsaneringsförbundet fann upp till tolv
 * procentenheters spridning mellan tre exemplar av en och samma analoga modell.
 * Det är inte ett fel som går att kalibrera bort.
 */

export const PRICE_CHECKED = "2026-08-04";

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
    tagline: "± 3 procentenheter, utskrivet av tillverkaren.",
    scores: {
      noggrannhet: 5,
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
    superlative: "± 3 procentenheter, angivet",
    pros: [
      "Anger ± 3 procentenheter, snävast av de tretton",
      "Tre tums display med stora siffror, läsbar tvärs över ett rum",
      "Loggar mätvärden över tid och går att exportera",
      "Larm när fukten passerar en gräns du satt själv",
    ],
    cons: [
      "Bluetooth och inte wifi, så avläsning på håll kräver att du är i närheten",
      "Två AAA-batterier räcker omkring ett halvår",
      "Toleransen är tillverkarens uppgift, ingen oberoende provning har mätt den",
    ],
    specs: [
      { label: "Pris", value: "219 kr", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "± 3 procentenheter",
        highlight: true,
      },
      { label: "Uppmätt avvikelse", value: "Ej provad", highlight: true },
      { label: "Mätområde fukt", value: "0–99 %", highlight: true },
      { label: "Uppkoppling", value: "Bluetooth, app", highlight: true },
      { label: "Loggning", value: "Ja, med export" },
      { label: "Avläsning", value: 'Display, 3"' },
      { label: "Mätområde temperatur", value: "−20 till 60 °C" },
      { label: "Ström", value: "2 × AAA" },
      { label: "Batteritid", value: "Cirka 6 månader" },
      { label: "GTIN", value: "6974316991489" },
    ],
    verdict:
      "Govee anger ± 3 procentenheter. Av de tretton vi jämfört är det den snävaste toleransen någon tillverkare skrivit ut, och en av bara två som står där över huvud taget. Den andra är Beurer HM 16 med ± 5 i mellanspannet och ± 8 utanför.\n\nTalen ska användas till något. Folkhälsomyndighetens allmänna råd namnger cirka 45 procent vid 21 grader som en indikation för att kräva undersökning av bostaden. Kvalster kan börja växa över 45 till 50 procent, enligt SweSIAQ. Mögel brukar sättas vid 60. Tre gränser inom femton procentenheter. En mätare med ± 8 kan inte skilja dem åt; med ± 3 vet du åtminstone vilken sida av 60 du står på.\n\nDisplayen är tre tum med stora siffror och går att läsa från andra sidan rummet. Den loggar över tid och låter dig exportera, så du kan följa om avfuktaren gör nytta i stället för att gissa. Larm vid en gräns du satt själv ingår.\n\nTvå invändningar. Den går på Bluetooth och inte wifi, så du måste vara i närheten för att läsa av. Ska mätaren sitta i en krypgrund du sällan besöker är det fel verktyg. Två AAA-batterier räcker omkring ett halvår, vilket är kortare än de enkla displayerna klarar.\n\nEn sak till, som betyget inte väger in: ± 3 är tillverkarens egen uppgift. Ingen oberoende provning har mätt just den här modellen. Det är ett löfte, inte ett resultat, och det är ändå mer än elva av de tretton lämnar ifrån sig.",
  },
  {
    id: "tfa-moxx",
    name: "Moxx digital termo-hygrometer",
    shortName: "TFA Moxx",
    brand: "TFA Dostmann",
    image: productImage(HYGROMETER.slug, "tfa-moxx"),
    tagline: "Mätt mot ett referensinstrument, och den låg 0,5 fel.",
    scores: {
      noggrannhet: 4.5,
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
    superlative: "0,5 procentenheters uppmätt avvikelse",
    pros: [
      "0,5 procentenheters avvikelse när mögelsaneringsförbundet mätte, bäst av fjorton",
      "Knappcell som räcker år, inte månader",
      "Komfortzonsindikator och min- och maxminne",
      "Går både att ställa och hänga",
    ],
    cons: [
      "Tillverkaren anger själv ingen tolerans, bara mätområdet",
      "Provningen är från 2015 och 2016 och gäller de exemplaren",
      "Liten display, 57 × 69 mm, ingen app och ingen loggning över tid",
    ],
    specs: [
      { label: "Pris", value: "229 kr", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "Ej angiven",
        highlight: true,
      },
      {
        label: "Uppmätt avvikelse",
        value: "0,5 procentenheter",
        highlight: true,
      },
      { label: "Mätområde fukt", value: "20–99 %", highlight: true },
      { label: "Uppkoppling", value: "Ingen", highlight: true },
      { label: "Loggning", value: "Min och max" },
      { label: "Avläsning", value: "Display, 57 × 69 mm" },
      { label: "Mätområde temperatur", value: "0 till 50 °C" },
      { label: "Ström", value: "1 × CR2032" },
      { label: "Mått", value: "57 × 13 × 69 mm" },
      { label: "GTIN", value: "4009816022929" },
    ],
    verdict:
      "Bundesverband Schimmelpilzsanierung, tyska mögelsaneringsförbundet, jämförde fjorton mätare mot ett kalibrerat referensinstrument för 1 050 euro. Moxx låg högst 0,5 procentenheter och 0,2 grader fel, bäst av samtliga digitala, och kostade 9,99 euro. Tre exemplar av samma modell skilde sig högst en procentenhet från varandra.\n\nAv de tretton vi jämfört är det den enda produkt någon utomstående faktiskt har mätt.\n\nFörstaplatsen får den ändå inte. Talet gäller de exemplar förbundet provade 2015 och 2016, och provningen är tio år gammal. TFA anger själva ingen tolerans i sitt datablad: mätområdet 20 till 99 procent står där, sedan ingenting.\n\nDet säger något om hur lite ett utelämnat tal går att tolka. Mätaren som klarade sig bäst av alla lovade minst. Därför står angiven noggrannhet och uppmätt avvikelse i skilda rader ovan.\n\nI övrigt är den enkel på ett sätt som håller. Knappcellen räcker år där de uppkopplade drar batterier på månader, den har komfortzonsindikator och min- och maxminne, och den går både att ställa på en hylla och hänga på en vägg.\n\nDisplayen mäter 57 gånger 69 millimeter, så du får gå fram till den. Ingen app, ingen loggning, inga larm. Vill du veta vad fukten gjorde i natt räcker min- och maxvärdet. Vill du se en kurva ska du köpa något annat.",
  },
  {
    id: "beurer-hm-16",
    name: "HM 16 termo-hygrometer",
    shortName: "Beurer HM 16",
    brand: "Beurer",
    image: productImage(HYGROMETER.slug, "beurer-hm-16"),
    tagline: "Anger också var toleransen blir dubbelt så vid.",
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
    superlative: "Öppnast redovisning av alla",
    pros: [
      "Anger ± 5 procentenheter mellan 40 och 80 procent",
      "Anger också ± 8 utanför det spannet, vilket nästan ingen gör",
      "508 omdömen hos butiken, största kundunderlaget av de tretton",
      "Billigare än Beurers egen HM 22, som anger en sämre tolerans",
    ],
    cons: [
      "± 5 procentenheter räcker inte för att avgöra om du ligger över eller under 60",
      "Fördubblad tolerans under 40 och över 80 procent, där krypgrund och badrum ligger",
      "Ingen loggning över tid, ingen app",
    ],
    specs: [
      { label: "Pris", value: "199,90 kr", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "± 5 pe (40–80 %), ± 8 utanför",
        highlight: true,
      },
      { label: "Uppmätt avvikelse", value: "Ej provad", highlight: true },
      { label: "Mätområde fukt", value: "20–95 %", highlight: true },
      { label: "Uppkoppling", value: "Ingen", highlight: true },
      { label: "Noggrannhet temperatur", value: "± 1 °C (0–40), ± 2 °C (40–50)" },
      { label: "Mätområde temperatur", value: "0 till 50 °C" },
      { label: "Avläsning", value: "Display med komfortindikator" },
    ],
    verdict:
      "Beurer gör något nästan ingen annan gör: de skriver ut var mätaren blir sämre.\n\nTekniska data anger ± 5 procentenheter mellan 40 och 80 procent, och ± 8 under 40 och över 80. Det är den öppnaste redovisningen vi hittat, och den är obekväm för tillverkaren, vilket gör den trovärdig.\n\nVarningen är värd att ta på allvar. De två ställen där man oftast vill mäta är en krypgrund om vintern och ett badrum efter en dusch. Båda ligger utanför mellanspannet, och där gäller ± 8.\n\nInne i mellanspannet ligger de tre gränser som avgör vad du ska göra: 45 procent från Folkhälsomyndigheten, 45 till 50 från SweSIAQ, 60 för mögel. Med ± 5 kan en avläsning på 58 i verkligheten vara 53 eller 63. Mätaren kan säga ungefär var du ligger. Den kan inte avgöra åt dig om du ska agera.\n\n508 omdömen hos Clas Ohlson med 4,5 i snitt är det största kundunderlaget av de tretton. Det säger inget om noggrannheten och en del om att den håller.\n\nJämför den framför allt med Beurers egen HM 22, som kostar 69 kronor mer och anger 8 procentenheter rakt av. Samma tillverkare, dyrare modell, vidare tolerans.",
  },
  {
    id: "shelly-ht-gen3",
    name: "H&T Gen 3 termometer och hygrometer",
    shortName: "Shelly H&T Gen 3",
    brand: "Shelly",
    image: productImage(HYGROMETER.slug, "shelly-ht-gen3"),
    tagline: "Sex jämförelser korar den. Ingen frågade efter toleransen.",
    scores: {
      noggrannhet: 2.5,
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
      "Loggar över tid och kan larma vid en gräns du satt själv",
      "Kan styra annat, exempelvis starta en avfuktare vid en nivå",
      "Fyra AA-batterier räcker omkring ett år",
    ],
    cons: [
      "Publicerar ingen noggrannhet för fukt, kontrollerat på tre ställen",
      "Dyrast av de rankade, 429 kronor",
      "3,5 i kundbetyg hos Kjell, lägst av mätarna",
    ],
    specs: [
      { label: "Pris", value: "429 kr", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Uppmätt avvikelse", value: "Ej provad", highlight: true },
      { label: "Mätområde fukt", value: "Ej angivet", highlight: true },
      { label: "Uppkoppling", value: "Wifi, app, automationer", highlight: true },
      { label: "Loggning", value: "Ja, i molnet" },
      { label: "Avläsning", value: "Display och app" },
      { label: "Ström", value: "4 × AA (LR6), medföljer ej" },
      { label: "Batteritid", value: "Cirka 1 år" },
    ],
    verdict:
      "Sex svenska jämförelsesajter utser Shelly H&T Gen 3 till bäst i test. Toleransuppgiften finns varken på produktsidan, i dokumentationen eller i Shellys egen kunskapsbas. Specifikationen anger batterityp, batteritid och att det sitter en fukt- och en temperaturgivare i den. Varken mätområde eller noggrannhet för fukten står där. Ingen av de sex efterlyste talet.\n\nProdukten är ändå inte dålig, och fjärdeplatsen är inte en straffplats. Wifi och loggning väger 40 av 100 i vår viktning, och den förtjänar det. En mätare i krypgrunden gör nytta först när du läser av den, och det här är den av de sju du kan läsa av från soffan. Den larmar vid en gräns du satt själv och kan styra annat, exempelvis starta en avfuktare vid 60 procent.\n\nPriset är 429 kronor, nästan dubbelt mot Govee, som anger ± 3 procentenheter och loggar den också. Hos Kjell har den 3,5 i kundbetyg från 36 betyg, lägst av mätarna.\n\nKöp den för uppkopplingen och för att den ska styra något annat. Att sex sajter kallar den bäst i test är inget skäl, för ingen av dem kontrollerade hur rätt den visar.",
  },
  {
    id: "clas-ohlson-3-pack",
    name: "Digital termometer och hygrometer inomhus, 3-pack",
    shortName: "Clas Ohlson 3-pack",
    brand: "Clas Ohlson",
    image: productImage(HYGROMETER.slug, "clas-ohlson-3-pack"),
    tagline: "Femtio kronor per rum, och fukt är en fråga per rum.",
    scores: {
      noggrannhet: 2.5,
      avlasning: 5,
      funktion: 2.5,
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
    superlative: "Tre mätare för 149,90",
    pros: [
      "Tre mätare för 149,90, femtio kronor per rum",
      "Låter dig jämföra rum mot varandra, vilket en ensam mätare aldrig kan",
      "Digital konstruktion, som klarade sig genomgående bra i provningen",
      "Billigast per mätare av de tretton",
    ],
    cons: [
      "Ingen tolerans angiven någonstans",
      "Ingen loggning, ingen app, inget larm",
      "Små displayer avsedda att stå nära",
    ],
    specs: [
      { label: "Pris", value: "149,90 kr", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Uppmätt avvikelse", value: "Ej provad", highlight: true },
      { label: "Uppkoppling", value: "Ingen", highlight: true },
      { label: "Avläsning", value: "Tre fristående displayer", highlight: true },
      { label: "Placering", value: "Tre rum samtidigt" },
    ],
    verdict:
      "Clas Ohlsons trepack kostar 149,90 kronor och låter dig mäta tre rum samtidigt. Fukt är en egenskap hos ett rum och inte hos en bostad. Sovrummet bakom garderoben, badrummet efter duschen, källartrappan och krypgrunden ger fyra olika svar, och en ensam mätare i vardagsrummet ger inget av dem. Tre mätare för 149,90 kronor låter dig jämföra rummen mot varandra, och det är jämförelsen som pekar ut var problemet sitter.\n\nDen som ställer en mätare för 429 kronor i vardagsrummet vet mindre om sin bostad än den som sprider ut tre för 150.\n\nInvändningen är verklig: ingen tolerans anges någonstans, så vi vet inte hur rätt de visar. Det som talar för dem är mögelsaneringsförbundets provning, där de billiga digitala mätarna klarade sig genomgående bra. Även den sämsta digitala låg 4,4 procentenheter fel och godkändes ändå. Det som föll igenom var analogt, inte billigt.\n\nVarken loggning, app eller larm ingår, och displayerna är små och avsedda att stå nära. Betrakta dem som tre termometrar som också visar fukt.\n\nKöp de här om du vill veta var i bostaden problemet finns. Vet du redan var det sitter och vill följa det över tid är någon av de andra bättre.",
  },
  {
    id: "beurer-hm-22",
    name: "HM 22 termo-hygrometer",
    shortName: "Beurer HM 22",
    brand: "Beurer",
    image: productImage(HYGROMETER.slug, "beurer-hm-22"),
    tagline: "Kostar mer än HM 16 och anger en vidare tolerans än den.",
    scores: {
      noggrannhet: 3,
      avlasning: 3.5,
      funktion: 3,
      prisvarde: 2.5,
      bygg: 4,
    },
    price: 269,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Beurer-HM-22-hygrometer---termometer/p/36-8777",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 82, checkedAt: PRICE_CHECKED },
    superlative: "Visar också datum och tid",
    pros: [
      "Anger sin tolerans, vilket elva av de tretton låter bli",
      "Visar datum, tid och har timerfunktion",
      "4,5 i kundbetyg hos butiken",
    ],
    cons: [
      "8 procentenheter, sämre än den billigare HM 16",
      "69 kronor dyrare än HM 16 från samma tillverkare",
      "Temperaturområdet börjar först vid 10 °C, så inte för krypgrunden",
    ],
    specs: [
      { label: "Pris", value: "269 kr", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "8 procentenheter",
        highlight: true,
      },
      { label: "Uppmätt avvikelse", value: "Ej provad", highlight: true },
      { label: "Mätområde fukt", value: "20–95 %", highlight: true },
      { label: "Uppkoppling", value: "Ingen", highlight: true },
      { label: "Noggrannhet temperatur", value: "2 °C" },
      { label: "Mätområde temperatur", value: "10 till 50 °C" },
      { label: "Avläsning", value: "Display med datum och tid" },
    ],
    verdict:
      "HM 22 kostar 269 kronor och anger 8 procentenheters noggrannhet. HM 16, från samma tillverkare, kostar 199,90 och anger ± 5 i mellanspannet. Du betalar 69 kronor extra för en vidare tolerans.\n\nDet du får för pengarna är datum, tid och en timerfunktion. Rimliga saker att vilja ha, utan koppling till fuktmätning, och noggrannheten väger 35 av 100 i vår viktning.\n\n8 procentenheter är mycket i sammanhanget. En avläsning på 55 kan i verkligheten vara 47 eller 63. De tre gränser som avgör vad du ska göra ligger på 45, 50 och 60, och alla tre ryms inom felmarginalen från det talet. Mätaren kan tala om att det är fuktigt. Om du ska göra något åt det får du veta någon annanstans ifrån.\n\nTemperaturområdet börjar först vid 10 grader, vilket gör den olämplig i just de kalla utrymmen där fukt oftast blir ett problem.\n\nDen får ändå kredit för att den anger ett tal. Elva av de tretton anger inget alls, och en vid tolerans som står utskriven är mer användbar än en snäv som hemlighålls.",
  },
  {
    id: "rubicson-kompakt-digital",
    name: "Kompakt digital hygrometer",
    shortName: "Rubicson Kompakt",
    brand: "Rubicson",
    image: productImage(HYGROMETER.slug, "rubicson-kompakt-digital"),
    tagline: "473 betyg, och inte ett ord om noggrannhet.",
    scores: {
      noggrannhet: 2.5,
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
    superlative: "473 betyg, flest av de tretton",
    pros: [
      "473 betyg hos Kjell, störst kundunderlag av de tretton",
      "Liten nog att ställa var som helst, 66 × 43 × 26 mm",
      "Knappcell som medföljer",
    ],
    cons: [
      "Ingen noggrannhet angiven för vare sig fukt eller temperatur",
      "Mätområdet börjar vid 20 procent och slutar vid 95",
      "Ingen loggning, inget min- och maxminne angivet",
    ],
    specs: [
      { label: "Pris", value: "179,90 kr", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Uppmätt avvikelse", value: "Ej provad", highlight: true },
      { label: "Mätområde fukt", value: "20–95 %", highlight: true },
      { label: "Uppkoppling", value: "Ingen", highlight: true },
      { label: "Mätområde temperatur", value: "−10 till 50 °C" },
      { label: "Ström", value: "1 × CR2032, medföljer" },
      { label: "Mått", value: "66 × 43 × 26 mm" },
    ],
    verdict:
      "Rubicson Kompakt har 473 betyg hos Kjell med 4,0 i snitt, det största kundunderlaget av mätarna, och det säger en del: den håller, den visar något, folk är nöjda. Vad det inte säger är om den visar rätt. Det kan en köpare inte avgöra utan ett referensinstrument.\n\nKjells produktblad anger mätområdet 20 till 95 procent och −10 till 50 grader. Ingenting om hur mycket fel den får visa. Systermodellen Rubicson Digital, 249,90 kronor, anger ± 1 grad för temperaturen och fortfarande ingenting för fukten. Toleransen skrivs ut för det du inte köpte mätaren för.\n\nStorleken och priset talar för den. 66 gånger 43 millimeter går att ställa var som helst, knappcellen medföljer, och 179,90 är billigt för en ensam mätare.\n\nEmot talar att trettio kronor mindre ger dig tre mätare hos Clas Ohlson, och fyrtio kronor mer ger dig en Govee med ± 3 procentenheter och loggning över tid. Sist av de rankade hamnar den för att den blivit omsprungen åt båda hållen.",
  },
];

export const HYGROMETER_PRODUCTS: Product[] = resolveProducts(HYGROMETER, SEEDS);

/**
 * Övervägda men inte rankade.
 *
 * Den analoga ligger här av ett mätbart skäl och inte av smak, se filhuvudet.
 * De två sista är givare till andra apparater och inte fristående mätare, så de
 * hade inte gått att jämföra på kategorins kriterier.
 */
export const HYGROMETER_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "TFA",
    name: "Analog Hygrometer",
    reason:
      "Billigast av de tretton, 139,90 kronor, men analog. Mögelsaneringsförbundet fann upp till tolv procentenheters spridning mellan tre exemplar av en och samma analoga modell, mellan enskilda urtavlor av samma vara. Det går inte att kalibrera bort och det syns inte på mätaren. Deras rekommendation efter provningen var digitalt rakt av. Mätområdet anges dessutom till 0 till 99 procent, vilket är hela skalan och därför ingen upplysning.",
    approxPrice: 139.9,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/termometrar-hygrometrar/hygrometrar/tfa-analog-hygrometer-p48598",
  },
  {
    brand: "Rubicson",
    name: "Digital hygrometer",
    reason:
      "249,90 kronor, 70 kronor mer än systermodellen Rubicson Kompakt, för en större display och ett min- och maxminne. Den anger ± 1 grad för temperaturen och ingenting för fukten, vilket gör den till det tydligaste exemplet på att toleransen skrivs ut för fel storhet. Rankas inte eftersom Kompakt-modellen ger samma besked billigare.",
    approxPrice: 249.9,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/termometrar-hygrometrar/hygrometrar/rubicson-digital-hygrometer-p48829",
  },
  {
    brand: "Clas Ohlson",
    name: "Trådlös hygrometer/termometer",
    reason:
      "299 kronor för en inomhusdel och en trådlös givare, och därmed rätt tanke för en krypgrund eller källare du inte vill gå ner i. Ingen noggrannhet anges, och för trettio kronor mindre ger Govee både en angiven tolerans på ± 3 procentenheter och loggning över tid. Den hade rankats om toleransen stått någonstans.",
    approxPrice: 299,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Tradlos-hygrometer-termometer/p/36-6725",
  },
  {
    brand: "Nexa",
    name: "WTH-103 trådlös termometer/hygrometer",
    reason:
      "199,90 kronor och tänkt att ingå i Nexas system snarare än att stå för sig själv. Ingen noggrannhet anges. Den som redan har Nexa hemma har ett skäl att välja den som vi inte kan väga in i en rankning som ska gälla alla.",
    approxPrice: 199.9,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Nexa-WTH-103-tradlos-termometer---hygrometer/p/36-8988",
  },
  {
    brand: "Schneider",
    name: "Wiser sensor temperatur och luftfuktighet",
    reason:
      "489 kronor, Zigbee 3.0, och därmed dyrast av det vi övervägt utom Kjells datalogger. Ingen noggrannhet anges. Den kräver dessutom en Wiser-hubb för att göra nytta, vilket gör den till en systemkomponent och inte en hygrometer man köper för att mäta fukt.",
    approxPrice: 489,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Schneider-Wiser-sensor-temperatur-och-luftfuktighet/p/36-9675",
  },
  {
    brand: "Kjell & Company",
    name: "Datalogger Pro",
    reason:
      "1 199 kronor och dyrast av de tretton, avsedd att logga över långa perioder. Den anger ingen noggrannhet för fukt, och det är den mest talande uppgiften vi hittat: den dyraste av dem lovar inte mer om sin mätning än den för 139,90. Fyra betyg hos butiken.",
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
      "Govee H5075 för 219 kronor hos Proshop. Den anger ± 3 procentenheter, vilket är den snävaste noggrannhet någon tillverkare i vår jämförelse skriver ut, och bara två av tretton anger något alls. Den loggar dessutom mätvärden över tid, går att exportera och larmar vid en gräns du satt själv, och displayen är tre tum med stora siffror. Tvåa är TFA Moxx för 229 kronor hos Hornbach, som är den enda mätaren någon oberoende faktiskt har mätt: tyska mögelsaneringsförbundet fann högst 0,5 procentenheters avvikelse mot ett kalibrerat referensinstrument. TFA anger själva ingen tolerans.",
  },
  {
    question: "Vad ska luftfuktigheten vara inomhus?",
    answer:
      "30 till 45 procent är vanligt i ett uppvärmt svenskt hem under eldningssäsongen, och det finns inget svenskt riktvärde som säger att det är för torrt. Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 innehåller ingen nedre gräns och inget råd om att fukta. Åt andra hållet anger de 7 gram vatten per kilo torr luft under eldningssäsongen, vilket motsvarar cirka 45 procent vid 21 grader, som en indikation som kan få tillsynsmyndigheten att kräva undersökning av byggnaden. SweSIAQ anger att kvalster kan börja växa över 45 till 50 procent, och mögel brukar sättas vid varaktigt över 60. Observera att allmänna råd är rekommendationer och inte bindande regler, och att 45 procent är en indikation och inget gränsvärde.",
  },
  {
    question: "Varför anger nästan ingen hygrometer sin noggrannhet?",
    answer:
      "Vi vet inte varför, men vi har kontrollerat att det är så. Av de tretton mätarna mellan 139,90 och 1 199 kronor anger två hur många procentenheter de får visa fel. Alla anger mätområdet, alltså mellan vilka värden de visar något alls, vilket är en annan uppgift och inte säger något om hur rätt de visar. Där en tolerans faktiskt står gäller den ofta temperaturen i stället för fukten: Rubicsons produktblad hos Kjell anger ± 1 grad och sedan ingenting. Även TFA Dostmann, vars Moxx mätte bäst av fjorton i en oberoende provning, anger bara mätområdet i sitt eget datablad.",
  },
  {
    question: "Är en dyr hygrometer noggrannare än en billig?",
    answer:
      "Inte enligt den enda mätning vi hittat. När tyska mögelsaneringsförbundet jämförde fjorton mätare mot ett kalibrerat referensinstrument för 1 050 euro var den mest träffsäkra digitala en modell för 9,99 euro, som låg inom 0,5 procentenheter. Den sämsta digitala kostade 5,99 euro och låg 4,4 procentenheter fel, alltså fortfarande godkänt. Samma mönster syns i priserna här: den dyraste mätaren i vår jämförelse kostar 1 199 kronor och anger ingen tolerans alls, medan en för 219 anger ± 3 procentenheter. Det priset köper är display, loggning och uppkoppling, inte noggrannhet.",
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
