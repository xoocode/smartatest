import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { LARM_UTAN_ABONNEMANG } from "@/lib/test-pages";

/**
 * Larm utan abonnemang. Underlag i .agent/research/larm-utan-abonnemang.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, artikelnummer,
 * paketinnehåll, ljudnivå, batteritider, kommunikationskanaler och vilka
 * funktioner butiken anger kräver en prenumeration. Allt läst 2026-08-03 på
 * butikens egen produktsida, i dess strukturerade data eller på den renderade
 * sidan.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte monterat, larmat
 * eller försökt slå ut något system.
 *
 * ## Sidans fynd: reservuppkopplingen säljs som abonnemang
 *
 * | Produkt | Reservkanal när bredbandet dör | Reservbatteri i hubben |
 * |---|---|---|
 * | Tapo T30 KIT | **ingen**, endast 2,4 GHz wifi | **inget**, endast nätadapter |
 * | eufy Hemlarm | **ingen**, larmuppringning anges som Nej | **inget**, tillbehöret utgått |
 * | Ring Alarm | 4G, **kräver Ring Protect Plus** | 24 h |
 * | Yale Startlarmkit+ | 4G, **kräver SIM-kort och prenumeration** | 12 h, ca 6 h på wifi |
 * | Ajax Hub 2 Plus | **Ethernet + wifi + två SIM, ingår** | 15 h |
 *
 * Kjells egen specifikationsrad för Yale lyder ordagrant "4G (kräver SIM-kort
 * och prenumeration)". Kjells egen produkttext om Ring: "Genom att prenumerera
 * på tjänsten Ring Protect Plus kan du dessutom använda mobilnätet".
 *
 * ## Reservbatterierna, belagda hos tillverkarna 2026-08-06
 *
 * Kolumnen stod tidigare som "ej angivet" för eufy och Tapo. Den var vår
 * research och inte produkternas egenskap, och båda gick att belägga:
 *
 * - **Tapo H200 har inget batteri.** TP-Links eget datablad räknar upp hela
 *   enheten (SYNC, RESET, microSD, status-LED) och hela förpackningen (hubb,
 *   snabbguide, nätverkskabel, nätadapter). Manualen på 19 851 tecken nämner
 *   inte batteri en enda gång, bara nätadaptern.
 * - **eufy HomeBase 2 har inget inbyggt batteri.** eufys tre egna manualer
 *   listar samma sju delar, varav ingen är ett batteri, och förpackningen
 *   innehåller hubb, nätadapter, nätverkskabel och nålen. eufy sålde ett
 *   separat tillbehör, "eufy Backup Battery for HomeBase 2", angivet till upp
 *   till 8 timmar. Det är utgått.
 *
 * Båda är alltså belagda frånvaron, inte okända uppgifter. Skillnaden avgör
 * betyget: eufy gick från 1,5 till 1,0 på uppkoppling. Se lib/corrections.ts.
 *
 * ## eufys ljudnivå: högtalare, inte siren
 *
 * eufys egna manualer kallar komponenten **Speaker**, inte siren, och eufy
 * publicerar ingen decibelsiffra för HomeBase 2. Den siffra på 105 dB som
 * cirkulerar gäller **T8970 eufy Security Siren**, ett separat tillbehör som
 * Kjell säljer för 499 kr. Den får aldrig skrivas som HomeBase 2:s ljudnivå.
 * Tabellen säger därför vad komponenten är, utan att påstå ett tal.
 *
 * ## Butiksfördelningen
 *
 * Fem produkter, fyra butiker. Kjell tar två, och det beror på att de är enda
 * butiken som säljer Tapo-paketet och den som publicerar flest kundomdömen på
 * eufy. Ring länkas till Proshop trots att Kjell har samma pris, Yale till
 * tillverkarens egen butik och Ajax till Låskompaniet, eftersom Ajax inte
 * säljs i storhandeln alls.
 */

/** Alla priser och uppgifter lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-03";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "ajax-hub2-plus-kit",
    name: "Larmpaket Hub 2 Plus",
    shortName: "Hub 2 Plus-paket",
    brand: "Ajax",
    image: productImage(LARM_UTAN_ABONNEMANG.slug, "ajax-hub2-plus"),
    tagline: "Enda paketet där reservuppkopplingen ligger i priset.",
    scores: {
      uppkoppling: 5,
      utanAbonnemang: 4.5,
      larmfunktion: 4.5,
      utbyggnad: 5,
      prisvarde: 2,
    },
    price: 8259,
    merchant: "Låskompaniet",
    merchantUrl:
      "https://www.laskompaniet.se/product/ajax-larmpaket-hub2plus-lan-wifi-4g",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för huset som står tomt",
    pros: [
      "Fyra kommunikationsvägar: Ethernet, wifi och två SIM-kortsplatser för mobilnät",
      "Reservbatteri upp till 15 timmar, och hubben kollar varje sensor var tolfte sekund",
      "Separat siren i paketet, monterad där du vill ha den",
      "Enda systemet med riktiga svenska tester bakom sig",
    ],
    cons: [
      "8 259 kronor, nästan tre gånger Ring och fyra gånger eufy",
      "Säljs inte i storhandeln, utan av låssmeder och larminstallatörer",
      "Mobiltrafiken betalas separat, eftersom SIM-korten är dina egna abonnemang",
    ],
    specs: [
      { label: "Pris", value: "8 259 kr", highlight: true },
      { label: "Reservkanal", value: "Ethernet, wifi och två SIM", highlight: true },
      { label: "Reservbatteri i hubben", value: "Upp till 15 h", highlight: true },
      { label: "Siren", value: "Separat inomhussiren ingår", highlight: true },
      { label: "Knappsats", value: "Ingår", highlight: true },
      { label: "Delar i paketet", value: "5" },
      { label: "Max antal enheter", value: "200" },
      { label: "Rörelsedetektor", value: "IR 12 m, husdjursanpassad" },
      { label: "Artikelnummer", value: "50461012" },
    ],
    verdict:
      "Ajax Hub 2 Plus-paket kostar 8 259 kronor och är det enda larmet här som fortfarande fungerar när någon klipper uppkopplingen.\n\n**Hubben har fyra vägar ut: Ethernet, wifi och två SIM-kortsplatser, och den växlar mellan dem på sekunder.** Kapas telefonkabeln vid fasaden går larmet ut över mobilnätet ändå, och slås strömmen av lever hubben vidare i upp till 15 timmar på eget batteri. Den frågar dessutom varje sensor var tolfte sekund om den är kvar och upptäcker en bruten förbindelse inom 60, så en detektor som plockas ner ger dig en notis inom minuten. Sirenen är en egen enhet du monterar där du vill: hos Ring, Yale, eufy och Tapo sitter den inuti hubben, som står inomhus och går att hitta och tysta.\n\nDet du betalar för är just det. 8 259 kronor mot 2 899 för Ring, som har både längre reservbatteri och högre siren, och räknar du delarna i lådan är Ajax dyrt. Till det kommer att du köper det hos en låssmed och inte i storhandeln, och att de två SIM-korten är dina egna abonnemang med sin egen månadskostnad.\n\nDet här är larmet till huset som står tomt delar av året, och till hemmet där ett inbrott skulle kosta långt mer än mellanskillnaden upp till Ring. Köp det.",
  },
  {
    id: "ring-alarm-2gen",
    name: "Alarm 5-delat kit (2:a gen)",
    shortName: "Alarm 5-delat kit",
    brand: "Ring",
    image: productImage(LARM_UTAN_ABONNEMANG.slug, "ring-alarm-2gen"),
    tagline: "Högst siren och längst reservbatteri, till en tredjedel av priset.",
    scores: {
      uppkoppling: 3,
      utanAbonnemang: 3,
      larmfunktion: 4.5,
      utbyggnad: 4,
      prisvarde: 4,
    },
    price: 2899,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Ring-Larm-5-delat-kit-2nd-Gen/2971020",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Den de flesta ska köpa",
    pros: [
      "104 dB siren, den högsta ljudnivån av larmen här",
      "Reservbatteriet i basstationen räcker 24 timmar, längst av alla fem",
      "Basstationen kan kopplas med nätverkskabel och inte bara wifi",
      "Sensorerna använder Z-Wave, ett eget radioprotokoll skilt från hemmets wifi",
    ],
    cons: [
      "Mobilnätet som reserv kräver abonnemanget Ring Protect Plus",
      "Videohistorik kräver också Ring Protect, du ser annars bara händelser i realtid",
      "Ingen utomhussiren i paketet, den kostar extra",
    ],
    specs: [
      { label: "Pris", value: "2 899 kr", highlight: true },
      { label: "Reservkanal", value: "4G, kräver Ring Protect Plus", highlight: true },
      { label: "Reservbatteri i hubben", value: "Upp till 24 h", highlight: true },
      { label: "Siren", value: "104 dB, inbyggd i basstationen", highlight: true },
      { label: "Knappsats", value: "Ingår", highlight: true },
      { label: "Delar i paketet", value: "5" },
      { label: "Max antal enheter", value: "100" },
      { label: "Anslutning", value: "Nätverkskabel eller wifi" },
      { label: "Sensorprotokoll", value: "Z-Wave" },
      { label: "Modellnummer", value: "4K11SZ-0EU0" },
    ],
    verdict:
      "Ring Alarm 5-delat kit kostar 2 899 kronor och ger dig mest larm per krona i den här jämförelsen.\n\n**104 decibel är den högsta ljudnivån av larmen, och basstationens reservbatteri räcker 24 timmar.** Det första hörs genom en lägenhetsvägg och ut på gatan, det andra betyder att ett strömavbrott mitt i natten inte lämnar dig oskyddad förrän långt in på nästa dygn. Basstationen tar nätverkskabel och inte bara wifi, vilket är stabilare, och sensorerna talar Z-Wave på egen radio, så en router som går på knäna av strömmande video tar inte ner larmet med sig.\n\nHaken står i Kjells egen produkttext: mobilnätet som reserv kräver abonnemanget Ring Protect Plus. Att videohistoriken kostar extra är rimligt, men skyddet mot att någon klipper uppkopplingen är en larmfunktion, och den ligger alltså bakom en månadsavgift i en kategori som säljs på att du slipper månadsavgifter.\n\nHar du ett stabilt bredband och en lägenhet eller ett radhus att skydda är det här köpet. Ska larmet klara att någon drar ut kabeln vid fasaden får du gå till Ajax och betala nästan tre gånger så mycket.",
  },
  {
    id: "eufy-alarm-kit-5",
    name: "Security Hemlarm 5 delar",
    shortName: "Security Hemlarm",
    brand: "eufy",
    image: productImage(LARM_UTAN_ABONNEMANG.slug, "eufy-alarm-kit"),
    tagline: "Ingen funktion i larmet ligger bakom en betalplan.",
    scores: {
      uppkoppling: 1,
      utanAbonnemang: 4.5,
      larmfunktion: 3,
      utbyggnad: 3.5,
      prisvarde: 4.5,
    },
    price: 1990,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-larm/eufy-security-hemlarm-5-delar-p51927",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 43, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst för eufy-hemmet",
    pros: [
      "43 kundomdömen med 4,5 i snitt, alltså det största underlaget i kategorin",
      "Appen är gratis och ingen funktion i larmet ligger bakom en plan",
      "Knappsats ingår, så någon utan appen kan larma av",
      "HomeBase fungerar också som repeater för wifi-signalen",
    ],
    cons: [
      "Ingen reservuppkoppling, och butikens specifikation anger larmuppringning som Nej",
      "HomeBase 2 saknar reservbatteri, så larmet slocknar med strömmen",
      "Bygger helt på hemmets wifi, och går ner med routern",
      "Larmljudet kommer ur hubbens högtalare, och en riktig siren kostar 499 kronor till",
    ],
    specs: [
      { label: "Pris", value: "1 990 kr", highlight: true },
      { label: "Reservkanal", value: "Ingen", highlight: true },
      { label: "Reservbatteri i hubben", value: "Inget, tillbehöret är utgått", highlight: true },
      { label: "Siren", value: "Högtalare i HomeBase 2", highlight: true },
      { label: "Knappsats", value: "Ingår", highlight: true },
      { label: "Delar i paketet", value: "5" },
      { label: "Max antal enheter", value: "16 kameror och 34 sensorer" },
      { label: "Batteritid, knappsats", value: "6 månader" },
      { label: "Batteritid, sensorer", value: "2 år" },
      { label: "Larmuppringning", value: "Nej, enligt butikens specifikation" },
    ],
    verdict:
      "eufy Security Hemlarm kostar 1 990 kronor och håller kategorins löfte rakare än någon konkurrent.\n\n**Ingenting i larmet är avstängt tills du betalar.** Appen är gratis, det finns ingen plan att uppgradera till och ingen funktion som låses upp mot en månadsavgift. Knappsatsen ingår, så någon som inte har appen på sin telefon kan ändå larma av, och HomeBase 2 förstärker samtidigt wifi-signalen där den står. 43 kundomdömen med 4,5 i snitt hos Kjell och 36 till hos Clas Ohlson är dessutom det största underlaget i kategorin, alltså fler människor som uttalat sig om den här produkten än om de fyra andra tillsammans.\n\nPriset står i vad som händer när något går sönder. Systemet har hemmets wifi och ingenting annat, och Clas Ohlsons specifikation har en rad som heter Larmuppringning där det står Nej. HomeBase 2 har heller inget reservbatteri, och tillbehöret som gav den 8 timmars drift har eufy slutat sälja. Går routern ner står larmet still, går strömmen slocknar det helt. Larmljudet kommer ur hubbens högtalare, och den siren eufy säljer separat kostar 499 kronor till.\n\nKöp den om du redan har eufy-kameror och ett hem där strömmen och bredbandet står stadigt, för då får du mycket larm för 1 990 kronor. Ska larmet stå emot någon som vet var routern sitter är Ring 909 kronor dyrare och gör det.",
  },
  {
    id: "tapo-t30-kit",
    name: "Tapo T30 KIT",
    shortName: "Tapo T30 KIT",
    brand: "TP-Link",
    image: productImage(LARM_UTAN_ABONNEMANG.slug, "tapo-t30-kit"),
    tagline: "Säger ifrån när altandörren öppnas, för en femtedel av priset.",
    scores: {
      uppkoppling: 1,
      utanAbonnemang: 5,
      larmfunktion: 2,
      utbyggnad: 3.5,
      prisvarde: 5,
    },
    price: 629,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-larm/tp-link-tapo-t30-kit-smarta-sensorer-for-ett-tryggare-och-bekvamare-hem-p66396",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 5, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för en enskild dörr",
    pros: [
      "629 kronor är en tredjedel av näst billigaste larmpaket",
      "Ingen plan, inget konto att uppgradera, ingenting låst",
      "Sensorerna går på 868 MHz och inte på wifi, med upp till två års batteritid",
      "Tar 64 sensorer och 4 kameror, så den växer billigt inom Tapo",
    ],
    cons: [
      "90 dB i hubben är den lägsta ljudnivån av larmen här",
      "Ingen knappsats, alltså krävs appen för att larma av",
      "Varken reservuppkoppling eller reservbatteri: hubben går bara på nätadapter",
      "Fyra delar och ingen separat siren",
    ],
    specs: [
      { label: "Pris", value: "629 kr", highlight: true },
      { label: "Reservkanal", value: "Ingen", highlight: true },
      { label: "Reservbatteri i hubben", value: "Inget, endast nätadapter", highlight: true },
      { label: "Siren", value: "90 dB, inbyggd i hubben", highlight: true },
      { label: "Knappsats", value: "Ingår ej", highlight: true },
      { label: "Delar i paketet", value: "4" },
      { label: "Max antal enheter", value: "64 sensorer och 4 kameror" },
      { label: "Sensorradio", value: "868 MHz, upp till 50 m inomhus" },
      { label: "Hubbens nätverk", value: "2,4 GHz wifi" },
      { label: "Batteritid, rörelsesensor", value: "Upp till 2 år" },
    ],
    verdict:
      "Tapo T30 KIT kostar 629 kronor och får en dörr att säga ifrån. Det är en annan sak än att skydda ett hus.\n\n**För 629 kronor får du en hubb, en rörelsesensor och två kontaktsensorer, och ingenting av det kräver ett konto du betalar för.** Sensorerna talar 868 megahertz på egen radio, så de fungerar även när wifi-nätet är trögt, och batterierna räcker upp till två år innan du behöver tänka på dem igen. Hubben tar 64 sensorer och 4 kameror, alltså kan du börja med altandörren för 629 kronor och lägga till en fönstersensor i taget för ett par hundra styck.\n\nDet den inte har är nästan allt annat. 90 decibel är den lägsta ljudnivån här, och ljudet kommer inifrån hubben som står inomhus. Det finns ingen knappsats, så var och en som ska kunna larma av behöver appen och ett konto. Och hubben går bara på nätadapter: varken reservkanal eller reservbatteri, så ett strömavbrott eller en utdragen kontakt släcker larmet helt.\n\nSom inbrottsskydd i en villa är den för tunn, och där börjar Ring på 2 899 kronor. Som ett sätt att veta när altandörren öppnas är den svårslagen för 629.",
  },
  {
    id: "yale-startlarmkit-plus",
    name: "Smart Alarm Starter Kit+",
    shortName: "Startlarmkit+",
    brand: "Yale",
    image: productImage(LARM_UTAN_ABONNEMANG.slug, "yale-startlarmkit"),
    tagline: "Sex delar i lådan och plats för hundra, med en kilometers räckvidd.",
    scores: {
      uppkoppling: 2.5,
      utanAbonnemang: 2.5,
      larmfunktion: 4,
      utbyggnad: 4.5,
      prisvarde: 2.5,
    },
    price: 3990,
    merchant: "Yale",
    merchantUrl: "https://yalehome.se/yale-smart-alarm-starter-kit-xl/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för hem som redan har Yale Doorman",
    pros: [
      "Sex delar i lådan, alltså två kontakter och två rörelsesensorer",
      "Systemet tar upp till 100 enheter och räckvidden når 1 km",
      "Fungerar ihop med Yales lås och kameror, och med Google, Alexa och Philips Hue",
      "Sensorernas batterier räcker 3 till 4 år",
    ],
    cons: [
      "4G-backup kräver enligt Yales egen produktsida både SIM-kort och prenumeration",
      "Reservbatteriet räcker 12 timmar, och omkring 6 timmar när systemet körs på wifi",
      "3 990 kronor, alltså 1 091 mer än Ring för lägre siren och kortare batteri",
      "Automatiserad samtalsvarning ligger också i prenumerationsplanen",
    ],
    specs: [
      { label: "Pris", value: "3 990 kr", highlight: true },
      {
        label: "Reservkanal",
        value: "4G, kräver SIM-kort och prenumeration",
        highlight: true,
      },
      {
        label: "Reservbatteri i hubben",
        value: "12 h, ca 6 h på wifi",
        highlight: true,
      },
      { label: "Siren", value: "100 dB, inbyggd i hubben", highlight: true },
      { label: "Knappsats", value: "Ingår", highlight: true },
      { label: "Delar i paketet", value: "6" },
      { label: "Anslutning", value: "Wifi, Ethernet, Bluetooth" },
      { label: "Trådlös räckvidd", value: "1 km, 868 MHz" },
      { label: "Max antal enheter", value: "100" },
      { label: "Artikelnummer", value: "AL-SK2-1A-EU" },
    ],
    verdict:
      "Yale Startlarmkit+ kostar 3 990 kronor och är det larm som räcker längst när du bygger vidare.\n\n**Sex delar i lådan, alltså två kontaktsensorer och två rörelsesensorer, täcker en ytterdörr och en altandörr direkt utan påbyggnad.** Radion når enligt Yale en kilometer, vilket gör garaget och förrådet till rimliga platser för en sensor, och systemet tar hundra enheter innan det tar slut. Det talar dessutom både med Yales egna lås och kameror och med Google, Alexa och Philips Hue, alltså bredast i jämförelsen, så larmet kan tända lamporna när det går.\n\nTvå saker drar ner det. Mobilnätet som reserv kräver enligt Yales egen produktsida både SIM-kort och en prenumeration, samma plan som ger automatiserad samtalsvarning. Och reservbatteriet är angivet till 12 timmar fullt fungerande, men Kjells specifikation lägger till att det blir omkring 6 timmar när systemet körs över wifi, vilket är så de flesta kör det: en fjärdedel av Rings dygn, till 1 091 kronor mer.\n\nDe 1 091 kronorna över Rings pris köper räckvidd och utbyggnad, inte högre ljud eller längre batteri. Har du redan Yale Doorman på ytterdörren och tänker dra larmet ut till garaget är de väl använda.",
  },
];

export const LARM_UTAN_ABONNEMANG_PRODUCTS: Product[] = resolveProducts(
  LARM_UTAN_ABONNEMANG,
  SEEDS,
);

/**
 * Övervägda men inte rankade.
 *
 * Två avgränsningar bär listan. Den första är att abonnemangslarm hör hemma på
 * /hemlarm och inte här. Den andra är att en fristående dörrvakt för hundra
 * kronor inte är ett larmsystem, hur gärna butiken än kallar den larm.
 */
export const LARM_UTAN_ABONNEMANG_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Ajax",
    name: "Larmpaket Hub 2 · LAN",
    reason:
      "Samma paket som vinnaren men med den billigare hubben, 6 569 kronor hos Låskompaniet. Skillnaden går rakt in i sidans ämne: Hub 2 har bara nätverkskabel, alltså ingen reservkanal alls, medan Hub 2 Plus har wifi och två SIM-platser. Den billigare Ajax-hubben har därmed sämre uppkopplingsskydd än Ring för mer än dubbla priset, och vi rankar inte två hubbar från samma tillverkare i samma lista.",
    approxPrice: 6569,
    merchant: "Låskompaniet",
    merchantUrl: "https://www.laskompaniet.se/product/ajax-larmpaket-hub2-lan",
  },
  {
    brand: "Safeland",
    name: "Hemlarm",
    reason:
      "Listas av minst en konkurrent som ett larm utan abonnemang. Så säljs det inte längre: bolagets egen sida beskriver i dag uppkopplad larmcentral med väktare och tjänsten Kvarterskollen, och publicerar inget pris utan begär att du lämnar en offertförfrågan. Kontrollerat 2026-08-03. Det gör det till ett abonnemangslarm, och de jämför vi på systersidan.",
  },
  {
    brand: "Verisure",
    name: "Larm monterat av kund",
    reason:
      "Ser ut att höra hemma här eftersom du monterar det själv, men gör det inte. Punkt 15 i dess egna villkor anger att avtalet är bindande i 24 kalendermånader, alltså finns både abonnemang och bindningstid. Den ligger på systersidan om hemlarm med abonnemang.",
  },
  {
    brand: "Clas Ohlson",
    name: "Dörrlarm och rörelselarm, 119,90 till 249 kronor",
    reason:
      "Fristående enheter som piper där de sitter. De har varken hubb, app, knappsats eller möjlighet att kopplas ihop, och de larmar bara den som redan är hemma. Nyttiga på en altandörr eller i husvagnen, men de är inte larmsystem och går inte att jämföra mot ett paket för 2 899 kronor.",
    approxPrice: 249,
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Rorelselarm-med-fjarrkontroll/p/36-4784",
  },
  {
    brand: "Electia",
    name: "Protect EL-20 trådlös larmcentral",
    reason:
      "Finns kvar som produktsida hos Clas Ohlson med 3,0 i betyg på fem omdömen, men den syns inte i butikens egen kategori Hemlarm och tillbehör, och något pris står inte utskrivet. Vi rankar inte en produkt vars pris vi inte kan läsa. Sidan uppger annars både wifi och GSM, vilket hade varit intressant i den här jämförelsen.",
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Tradlos-larmcentral-Electia-Protect-EL-20/p/36-6920",
  },
  {
    brand: "Diverse",
    name: "Larmpaket från Amazon utan känt varumärke",
    reason:
      "En sökning på hemlarm utan abonnemang hos Amazon ger nästan uteslutande 120-decibels dörrlarm och sensorkit från märken som inte finns i någon butik här. Vi kan inte kontrollera vare sig support, appens framtid eller om delar går att köpa till om två år, och ett larm som inte går att bygga vidare på är en engångsprodukt.",
  },
];

export const LARM_UTAN_ABONNEMANG_FAQ = [
  {
    question: "Vilket larm utan abonnemang är bäst 2026?",
    answer:
      "Det beror på hur mycket du bryr dig om vad som händer när uppkopplingen försvinner. Ajax Hub 2 Plus-paket för 8 259 kronor hos Låskompaniet är enda systemet där reservuppkopplingen ingår i priset: Ethernet, wifi och två SIM-kortsplatser, plus femton timmars reservbatteri. För de flesta är Ring Alarm 5-delat kit för 2 899 kronor det bättre köpet, med kategorins högsta siren på 104 decibel och ett reservbatteri på 24 timmar, men där kräver mobilnätet abonnemanget Ring Protect Plus. Billigast är TP-Link Tapo T30 för 629 kronor, som är ett riktigt larm men med 90 decibel och utan knappsats.",
  },
  {
    question: "Vad kostar ett larm utan abonnemang?",
    answer:
      "Mellan 629 och 8 259 kronor en gång, för de fem paket vi jämför. Tapo T30 kostar 629 kronor, eufy Security 1 990, Ring Alarm 2 899, Yale Startlarmkit+ 3 990 och Ajax Hub 2 Plus-paket 8 259. Alla priser lästa på butikens egen sida den 3 augusti 2026. Till det kan komma delar du bygger ut med: hos Låskompaniet kostar en extra magnetkontakt 495 kronor, en rörelsedetektor 823 och en separat siren 820. Räkna också med att ett larm utan abonnemang inte har någon larmcentral, vilket är den stora skillnaden mot ett abonnemangslarm på 25 000 till 40 000 kronor över fem år.",
  },
  {
    question: "Sänker ett larm utan abonnemang hemförsäkringen?",
    answer:
      "Det finns ingen grund att räkna med det, och skälet är inte hårdvaran utan installationen. Svensk Försäkring beskriver en försäkringsanläggning som en anläggning villkorad i ett försäkringsavtal, och hänvisar till Stöldskyddsföreningens regelverk. För hemlarm med trådlösa detektorer är normen SSF 140, som definierar en egen larmklass R. SBSC, som certifierar mot normerna, skriver att den som projekterar och installerar en anläggning enligt SSF 140:2 som lägst måste vara certifierad installatör enligt SSF 1112, eller anläggarfirma enligt SSF 1015 med behörig ingenjör enligt SSF 1016. Monterar du själv är den vägen stängd oavsett vilket märke du köper. Samtidigt är normerna frivilliga och ditt försäkringsbolag får avtala om annat, så fråga dem i stället för att utgå från något.",
  },
  {
    question: "Vad händer med larmet om internet försvinner?",
    answer:
      "Det beror helt på vilket du köpt, och det är den fråga som skiljer produkterna mest. Ajax Hub 2 Plus har Ethernet, wifi och två SIM-kortsplatser för mobilnät, alltså fyra vägar ut, och växlar mellan dem automatiskt. Ring Alarm och Yale Startlarmkit+ kan använda mobilnätet, men bara med en prenumeration: Ring Protect Plus respektive Yales egen plan med SIM-kort. eufy Security och Tapo T30 har ingen reservkanal alls och går ner med routern. Clas Ohlsons specifikation för eufy anger till och med larmuppringning som Nej. Ett strömavbrott är den andra halvan av samma fråga: Ring håller 24 timmar på eget batteri, Ajax 15 och Yale 12, medan eufy och Tapo slocknar direkt. Kontrollera båda innan du köper, för det är svårare att åtgärda i efterhand än att välja rätt från början.",
  },
  {
    question: "Vad är skillnaden mot ett hemlarm med abonnemang?",
    answer:
      "Att någon annan tittar, och vem som bär ansvaret. Ett abonnemangslarm har en bemannad larmcentral som verifierar larmet, ringer dig och vid behov skickar väktare. Ett larm utan abonnemang skickar en notis till din mobil, och sedan är det du som ska avgöra om det är ett inbrott eller katten. Prisbilden skiljer lika mycket: 629 till 8 259 kronor en gång mot ungefär 25 000 till 40 000 kronor över fem år. Enligt larmlagen är du dessutom larminnehavare och skyldig att motverka obefogade larm, en roll larmcentralen annars sköter åt dig.",
  },
  {
    question: "Kan jag bli skyldig att betala för en polisutryckning?",
    answer:
      "Ja, under vissa förutsättningar, och det står i lagen. Lag (1983:1097) om larmanläggningar säger i sjätte paragrafen att en larminnehavare är skyldig att göra vad som skäligen kan krävas för att motverka att anläggningen genom obefogade larm förorsakar onödigt arbete för Polismyndigheten. Har en polisutryckning skett på grund av ett falsklarm får myndigheten enligt åttonde paragrafen förelägga dig att åtgärda orsaken, och sker det igen efter ett sådant föreläggande ska innehavaren betala kostnaden för utryckningen, om det inte är uppenbart oskäligt. Utan larmcentral är det du som är larminnehavare. Det praktiska svaret är att montera rörelsedetektorer så att husdjur och gardiner inte utlöser dem, och att lära alla i hushållet att larma av.",
  },
  {
    question: "Får jag installera larmet själv?",
    answer:
      "Ja. Larmlagen kräver polistillstånd för larminstallationsverksamhet, men det betyder yrkesmässig installation åt andra och gäller inte att montera sitt eget larm i sin egen bostad. Ingen av de fem produkterna kräver heller någon behörighet, de sätts upp med skruv eller tejp och kopplas ihop via appen. Det du inte får genom att montera själv är ett anläggarintyg, alltså det papper som gör larmet till en anläggning i normernas mening. Det kräver en certifierad installatör.",
  },
  {
    question: "Funkar larm utan abonnemang i lägenhet?",
    answer:
      "Ja, och det är ofta där det passar bäst, eftersom lägenheten har färre ingångar att täcka och grannar som hör en siren. Ett startpaket räcker längre: ytterdörren och eventuell balkongdörr är oftast allt som behövs, medan en villa har flera dörrar, fönster i markplan och ibland ett garage. Två saker skiljer sig ändå från villan. Kontrollera vad din bostadsrättsförening eller hyresvärd säger om att skruva i dörrkarm och vägg, eftersom sensorer med tejp sitter sämre men inte kräver tillstånd. Och tänk på att en siren inuti hubben hörs betydligt bättre genom en lägenhetsvägg än genom en villafasad, vilket gör det billigaste alternativet mer gångbart här. Ett bra lås gör dock ofta större nytta än ett larm i en lägenhet högt upp, och det säger vi hellre än säljer dig något du inte behöver.",
  },
  {
    question: "Hur högt ska sirenen låta?",
    answer:
      "Så högt att den hörs ut, och där skiljer produkterna mer än man tror. Ring har 104 decibel, Yale 100 och TP-Link Tapo 90. Tio decibel motsvarar ungefär en fördubbling av upplevd ljudstyrka, så skillnaden mellan 90 och 104 är stor. eufys larmljud kommer ur en högtalare i HomeBase 2, och den riktiga sirenen säljer eufy separat för 499 kronor hos Kjell. Viktigare än talet är ändå var sirenen sitter: hos Ring, Yale, eufy och Tapo ljuder den inifrån hubben, som står inomhus och går att hitta och tysta. Ajax-paketet har en separat siren du monterar där du vill, och alla systemen kan kompletteras med en utomhussiren som kostar extra.",
  },
  {
    question: "Kan jag koppla ett larm utan abonnemang till en larmcentral senare?",
    answer:
      "Ibland, men det gör det till ett abonnemangslarm igen. Ajax är byggt för det och säljs av installatörer som också erbjuder larmcentralsanslutning, och Yale erbjuder professionell övervakning i sin egen prenumerationsplan. Ring och eufy har ingen svensk larmcentralsanslutning. Tänk igenom det i förväg: vet du redan att du vill ha en larmcentral är frågan snarare vilket abonnemangslarm som är bäst, och då är hårdvaran sällan det som avgör.",
  },
  {
    question: "Finns det en svensk norm för larm utan abonnemang?",
    answer:
      "Ja, och nästan ingen nämner den. SSF 140 gäller inbrottslarmanläggningar med intern trådlös förbindelse avsedda för i första hand användning inomhus i bostäder, alltså den här produktklassen, och den definierar en egen larmklass R. Normen är skriven för att kunna refereras i försäkringsvillkor. Haken sitter i installationen: SBSC skriver att den som projekterar och installerar en anläggning enligt normen som lägst måste vara certifierad enligt SSF 1112. En anläggning blir alltså godkänd av vem som satt upp den och inte av hur bra hårdvaran är, vilket är skälet till att ett självinstallerat larm sällan kan åberopas mot ett försäkringsvillkor.",
  },
  {
    question: "Vad ska jag göra om larmet går när jag inte är hemma?",
    answer:
      "Ha en plan innan det händer, eftersom du är den som ska bedöma larmet när ingen larmcentral gör det. Skaffa dig först ett sätt att verifiera: en kamera, en granne eller en familjemedlem som kan titta. Åk inte själv och möt en pågående inbrottssituation. Ring 112 när du har skäl att tro att någon är inne, och 114 14 när du upptäcker något i efterhand. Var också medveten om att larmlagen gör dig till larminnehavare med kostnadsansvar om polisen rycker ut på ett larm som visar sig vara falskt. Det är den viktigaste praktiska skillnaden mot ett abonnemangslarm, där någon annan gör den bedömningen.",
  },
];
