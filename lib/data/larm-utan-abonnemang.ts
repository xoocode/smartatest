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
 * | Tapo T30 KIT | **ingen**, endast 2,4 GHz wifi | ej angivet |
 * | eufy Hemlarm | **ingen**, larmuppringning anges som Nej | ej angivet |
 * | Ring Alarm | 4G, **kräver Ring Protect Plus** | 24 h |
 * | Yale Startlarmkit+ | 4G, **kräver SIM-kort och prenumeration** | 12 h, ca 6 h på wifi |
 * | Ajax Hub 2 Plus | **Ethernet + wifi + två SIM, ingår** | 15 h |
 *
 * Kjells egen specifikationsrad för Yale lyder ordagrant "4G (kräver SIM-kort
 * och prenumeration)". Kjells egen produkttext om Ring: "Genom att prenumerera
 * på tjänsten Ring Protect Plus kan du dessutom använda mobilnätet".
 *
 * ## Regeln om saknade uppgifter
 *
 * Samma som på /hemlarm: där butiken inte publicerar en uppgift står "Ej
 * angivet", aldrig en nolla och aldrig en gissning. Det gäller särskilt eufys
 * ljudnivå och reservbatteri, som ingen av de två butiker som säljer den
 * anger.
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
    superlative: "Bäst uppkoppling, dyrast av alla",
    pros: [
      "Fyra kommunikationsvägar: Ethernet, wifi och två SIM-kortsplatser för mobilnät",
      "Reservbatteri upp till 15 timmar, och hubben kollar varje sensor var tolfte sekund",
      "Separat siren i paketet i stället för en siren inuti hubben",
      "Enda systemet med riktiga svenska tester bakom sig",
    ],
    cons: [
      "8 259 kronor, nästan tre gånger Ring och fyra gånger eufy",
      "Säljs inte i storhandeln, utan av låssmeder och larminstallatörer",
      "Mobiltrafiken kräver ett SIM-abonnemang som vi inte hittat något pris på",
    ],
    specs: [
      { label: "Pris", value: "8 259 kr", highlight: true },
      { label: "Reservkanal", value: "Ethernet, wifi och två SIM", highlight: true },
      { label: "Reservbatteri i hubben", value: "Upp till 15 h", highlight: true },
      { label: "Siren", value: "Separat inomhussiren ingår", highlight: true },
      { label: "Knappsats", value: "Ingår", highlight: true },
      { label: "Delar i paketet", value: "5" },
      { label: "Rörelsedetektor", value: "IR 12 m, husdjursanpassad" },
      { label: "Artikelnummer", value: "50461012" },
    ],
    verdict:
      "Ajax Hub 2 Plus-paketet är det enda systemet här som svenska testredaktioner faktiskt provat, och det enda som överlever att någon klipper uppkopplingen. 8 259 kronor.\n\nEtt uppkopplat larm som bara har hemmets bredband slås ut av att någon klipper en kabel eller drar ur routern. Hub 2 Plus har fyra vägar ut: Ethernet, wifi och två separata SIM-kortsplatser, och den växlar mellan dem på sekunder. Vid strömavbrott går den vidare på eget batteri i upp till femton timmar. Den kollar dessutom varje sensor var tolfte sekund och upptäcker en bruten förbindelse inom sextio.\n\nDet andra den gör rätt är sirenen. I Ring, Yale, eufy och Tapo sitter sirenen inuti hubben, som står inomhus och går att hitta och tysta. Här är sirenen en egen enhet du sätter där du vill ha den.\n\nSedan priset. 8 259 kronor mot 2 899 för Ring, som har ett längre reservbatteri och en högre siren. Räknar du bara på delarna i lådan är Ajax dyrt. Det du betalar för är att uppkopplingen inte har någon enskild felpunkt, och det är en sak värd olika mycket för olika människor.\n\nEn reservation vi inte kan lösa: SIM-korten kostar pengar hos någon operatör, och Ajax egen SIM-tjänst har vi inte hittat något pris på. Att platserna finns i hubben betyder inte att trafiken är gratis. Vi drar ner den på det du får utan abonnemang av just det skälet.\n\nDet är också det enda systemet som svenska testredaktioner faktiskt har provat. PC för Alla och Allt för Hemmet har båda skrivit om det. Vi har inget kriterium för det, eftersom fyra av fyra tester handlar om samma märke och ett sådant kriterium bara hade blivit en bonus till Ajax.",
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
      "104 dB är den högsta angivna ljudnivån av larmen",
      "Reservbatteriet i basstationen anges till 24 timmar, längst av alla",
      "Basstationen kan kopplas med nätverkskabel och inte bara wifi",
      "Sensorerna använder Z-Wave, ett eget radioprotokoll och inte hemmets wifi",
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
      { label: "Anslutning", value: "Nätverkskabel eller wifi" },
      { label: "Sensorprotokoll", value: "Z-Wave" },
      { label: "Modellnummer", value: "4K11SZ-0EU0" },
    ],
    verdict:
      "Ring Alarm 5-delat kit kostar 2 899 kronor och är det bästa köpet för de flesta.\n\nBörja med det som är bra, för det är mycket. 104 decibel är den högsta ljudnivå någon butik anger för de här larmen. Reservbatteriet på 24 timmar är det längsta: ett dygn efter ett strömavbrott. Basstationen tar nätverkskabel och inte bara wifi, vilket är stabilare. Och sensorerna går på Z-Wave i stället för på hemmets wifi, så en överbelastad router tar inte ner larmet. För 2 899 kronor är det mycket larm.\n\nSedan meningen i Kjells produkttext: genom att prenumerera på Ring Protect Plus kan du dessutom använda mobilnätet för att kontrollera att systemet fungerar om du inte har en internetuppkoppling.\n\nLäs den igen. Skyddet mot att någon klipper din uppkoppling, det enklaste sättet att slå ut ett uppkopplat larm, är en prenumerationsfunktion. I en produktkategori vars hela försäljningsargument är att du slipper prenumerera.\n\nVi drar inte ner betyget för att videohistoriken kostar extra. Det är en tilläggstjänst och den är rimlig att ta betalt för. Reservuppkopplingen är inte en tilläggstjänst, den är en larmfunktion, och därför sitter avdraget på båda de två tyngsta kriterierna.\n\nSäg ändå så här: köper du utan abonnemang och har ett stabilt bredband får du för 2 899 kronor det högsta ljudet, det längsta batteriet och ett hederligt sensorprotokoll. Det räcker långt för en lägenhet eller ett radhus. Vill du ha ett larm som överlever att någon drar ut kabeln får du gå till Ajax och betala nästan tre gånger så mycket.",
  },
  {
    id: "eufy-alarm-kit-5",
    name: "Security Hemlarm 5 delar",
    shortName: "Security Hemlarm",
    brand: "eufy",
    image: productImage(LARM_UTAN_ABONNEMANG.slug, "eufy-alarm-kit"),
    tagline: "Inget abonnemang alls, och ingen reserv när nätet går ner.",
    scores: {
      uppkoppling: 1.5,
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
    superlative: "Störst kundunderlag, ingen plan",
    pros: [
      "43 kundomdömen med 4,5 i snitt, alltså det största underlaget i kategorin",
      "Appen är gratis och ingen funktion i larmet ligger bakom en plan",
      "Knappsats ingår, så någon utan appen kan larma av",
      "HomeBase fungerar också som repeater för wifi-signalen",
    ],
    cons: [
      "Ingen reservuppkoppling, och butiken anger larmuppringning som Nej",
      "Varken sirenens ljudnivå eller hubbens reservbatteri publiceras av någon av de två butiker som säljer den",
      "Bygger helt på hemmets wifi, och går ner med routern",
    ],
    specs: [
      { label: "Pris", value: "1 990 kr", highlight: true },
      { label: "Reservkanal", value: "Ingen", highlight: true },
      { label: "Reservbatteri i hubben", value: "Ej angivet", highlight: true },
      { label: "Siren", value: "Inbyggd, ljudnivå ej angiven", highlight: true },
      { label: "Knappsats", value: "Ingår", highlight: true },
      { label: "Delar i paketet", value: "5" },
      { label: "Batteritid, knappsats", value: "6 månader" },
      { label: "Batteritid, sensorer", value: "2 år" },
      { label: "Larmuppringning", value: "Nej, enligt butikens specifikation" },
    ],
    verdict:
      "X-Sense Security Hemlarm kostar 1 990 kronor och är den ärligaste produkten här om vad du får utan abonnemang.\n\nBörja med det ärliga. eufy har ingen plan att sälja dig. Appen är gratis, larmet fungerar, och ingen funktion är avstängd tills du betalar. Det är precis vad rubriken larm utan abonnemang lovar, och två av de fyra andra håller inte det löftet lika rakt.\n\n43 kundomdömen med 4,5 i snitt hos Kjell är dessutom det största underlaget i hela kategorin. Clas Ohlson säljer samma paket för samma pengar och har 36 recensioner. Tillsammans är det fler människor som uttalat sig om den här produkten än om de fyra andra tillsammans.\n\nSedan luckan. Systemet går på hemmets wifi och har ingenting annat. Clas Ohlsons specifikationstabell har en rad som heter Larmuppringning, och där står Nej. Går routern ner, eller drar någon ur den, står larmet still. Ingen av de två butikerna anger heller hur högt sirenen låter eller hur länge HomeBase går på eget batteri, och de uppgifterna skriver vi inte ut som nollor: vi vet inte, och det ska stå så.\n\nFör 1 990 kronor och ett hem där uppkopplingen är stabil är det ett rimligt köp, särskilt om du redan har eufy-kameror. Ska larmet stå emot någon som vet vad som görs räcker det inte.",
  },
  {
    id: "tapo-t30-kit",
    name: "Tapo T30 KIT",
    shortName: "Tapo T30 KIT",
    brand: "TP-Link",
    image: productImage(LARM_UTAN_ABONNEMANG.slug, "tapo-t30-kit"),
    tagline: "629 kronor, och en siren i hubben som får göra hela jobbet.",
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
    superlative: "Billigast, om du vet vad du inte får",
    pros: [
      "629 kronor är en femtedel av näst billigaste riktiga larmpaket",
      "Ingen plan, inget konto att uppgradera, ingenting låst",
      "Sensorerna går på 868 MHz och inte på wifi, med upp till två års batteritid",
      "Bygger vidare i Tapos ekosystem, som är brett och billigt",
    ],
    cons: [
      "90 dB i hubben är kategorins lägsta angivna ljudnivå",
      "Ingen knappsats, alltså krävs appen för att larma av",
      "Ingen reservuppkoppling och ingen angiven reservbatteritid",
      "Fyra delar och ingen separat siren",
    ],
    specs: [
      { label: "Pris", value: "629 kr", highlight: true },
      { label: "Reservkanal", value: "Ingen", highlight: true },
      { label: "Reservbatteri i hubben", value: "Ej angivet", highlight: true },
      { label: "Siren", value: "90 dB, inbyggd i hubben", highlight: true },
      { label: "Knappsats", value: "Ingår ej", highlight: true },
      { label: "Delar i paketet", value: "4" },
      { label: "Sensorradio", value: "868 MHz, upp till 50 m inomhus" },
      { label: "Hubbens nätverk", value: "2,4 GHz wifi" },
      { label: "Batteritid, rörelsesensor", value: "Upp till 2 år" },
    ],
    verdict:
      "Tapo T30 KIT kostar 629 kronor och får en dörr att säga ifrån. Det ska inte förväxlas med ett larm som skyddar ett hus.\n\nFör 629 kronor får du en hubb, en rörelsesensor och två kontaktsensorer. Sensorerna går på 868 megahertz i stället för på wifi, med upp till två års batteritid, och hubben har en inbyggd siren på 90 decibel. Utlöses något ljuder den och du får en notis. Ingen plan, inget konto, ingenting låst. På kriteriet som handlar om vad som fungerar utan abonnemang är den bäst i jämförelsen, och det är inte ett skämt: den har inget att sälja dig.\n\nDet den inte har är nästan allt annat. 90 decibel är kategorins lägsta angivna ljudnivå, och den sitter inuti hubben som står inomhus. Det finns ingen knappsats, så alla som ska kunna larma av behöver appen och ett konto. Det finns ingen reservuppkoppling, och ingen uppgift om hur länge hubben klarar sig utan ström.\n\nDärför står den på fjärde plats trots att den är billigast och trots att den har högsta betyg på ett av de tunga kriterierna. Prisvärde och abonnemangsfrihet väger tillsammans 40 av 100, larmfunktion och uppkoppling väger 45.\n\nKöp den om du vill veta när altandörren öppnas, om du redan har Tapo hemma, eller om du bor i en lägenhet där grannarna hör allt. Köp den inte som ditt inbrottsskydd i en villa.",
  },
  {
    id: "yale-startlarmkit-plus",
    name: "Smart Alarm Starter Kit+",
    shortName: "Startlarmkit+",
    brand: "Yale",
    image: productImage(LARM_UTAN_ABONNEMANG.slug, "yale-startlarmkit"),
    tagline: "Sex delar och störst ekosystem, med backupen bakom en plan.",
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
    superlative: "Störst utbyggnad, sämst prisvärde",
    pros: [
      "Sex delar i lådan, alltså två kontakter och två rörelsesensorer i stället för en av varje",
      "Systemet tar upp till 100 enheter och räckvidden anges till 1 km",
      "Fungerar ihop med Yales lås och kameror, och med Google, Alexa och Philips Hue",
      "Sensorernas batteritid anges till 3 och 4 år",
    ],
    cons: [
      "4G-backup kräver enligt butikens egen specifikation både SIM-kort och prenumeration",
      "Reservbatteriet anges till 12 timmar, och till ungefär 6 timmar på wifi",
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
      "Startlarmkit+ har 104 dB siren och 24 timmars reservbatteri, den högsta ljudnivån och det längsta strömavbrottsskyddet av larmen här.\n\nDet finns riktiga skäl att välja det här. Sex delar i lådan i stället för fem, alltså två kontaktsensorer och två rörelsesensorer, vilket täcker en ytterdörr och en altandörr direkt. Radion når enligt tillverkaren en kilometer, vilket gör garaget och förrådet möjliga. Systemet tar hundra enheter. Och det pratar både med Yales egna lås och kameror och med Google, Alexa och Philips Hue, alltså bredast i jämförelsen.\n\nProblemet står i Kjells specifikationstabell, i klartext: Kommunikation: Wi-fi, Ethernet, Bluetooth, 4G (kräver SIM-kort och prenumeration).\n\nSamma sida listar också vad prenumerationsplanen ger: 4G-backup, automatiserad samtalsvarning och professionell övervakning. Två av de tre är sådant vi tycker är rimligt att ta betalt för. 4G-backup är det inte, eftersom det är larmets skydd mot det enklaste angreppet.\n\nDärtill den uppgift som är lättast att missa. Reservbatteriet anges till tolv timmar, med en fotnot: cirka sex timmar vid wifi-anslutning. Kör du systemet trådlöst, som de flesta gör, halveras alltså tiden efter ett strömavbrott till en fjärdedel av Rings.\n\n3 990 kronor är 1 091 mer än Ring. För de pengarna får du en extra sensor, ett bredare ekosystem och en längre radioräckvidd, men en lägre siren och ett kortare batteri. Har du redan Yale Doorman på ytterdörren är det ett rimligt köp. Har du inte det finns det billigare vägar till samma sak.",
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
      "Det beror helt på vilket du köpt, och det är den fråga som skiljer produkterna mest. Ajax Hub 2 Plus har Ethernet, wifi och två SIM-kortsplatser för mobilnät, alltså fyra vägar ut, och växlar mellan dem automatiskt. Ring Alarm och Yale Startlarmkit+ kan använda mobilnätet, men bara med en prenumeration: Ring Protect Plus respektive Yales egen plan med SIM-kort. eufy Security och Tapo T30 har ingen reservkanal alls och går ner med routern. Clas Ohlsons specifikation för eufy anger till och med larmuppringning som Nej. Kontrollera det här innan du köper, för det är svårare att åtgärda i efterhand än att välja rätt från början.",
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
      "Så högt att den hörs ut, och där skiljer produkterna mer än man tror. Ring anger 104 decibel, Yale 100 och TP-Link Tapo 90. eufy anger ingen ljudnivå alls hos någon av de två butiker som säljer den. Tio decibel motsvarar ungefär en fördubbling av upplevd ljudstyrka, så skillnaden mellan 90 och 104 är stor. Viktigare än talet är dock var sirenen sitter: hos Ring, Yale, eufy och Tapo är den inbyggd i hubben, som står inomhus och går att hitta och tysta. Ajax-paketet har en separat siren du monterar där du vill, och alla systemen kan kompletteras med en utomhussiren som kostar extra.",
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
