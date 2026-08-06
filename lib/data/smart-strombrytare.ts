import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { SMART_STROMBRYTARE } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /smart-strombrytare.
 *
 * Priser, produktnamn, maxlaster, mått, protokoll och butiks-URL:er är lästa
 * ur Kjells egna produktsidor och deras JSON-LD på PRICE_CHECKED. URL:erna är
 * de kanoniska efter omdirigering.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans ännu, enligt beslut: vi
 * ansöker inte till något Adtraction-program förrän minst 16 sidor finns. Se
 * lib/links.ts.
 *
 * ## Modellbeteckningen som nästan blev fel
 *
 * Kjells "Plejd Infälld Bluetooth-fjärrströmbrytare 3500 W" är **CTR-01**,
 * inte REL-01. REL-01-2P är en helt annan produkt, ett relä för DIN-skena med
 * en- och tvåpolig brytning. Beteckningen står bara i brödtexten på
 * produktsidan, inte i titeln eller i schemat, så den är lätt att missa. Fel
 * modellnummer bakom ett pris och ett betyg är exakt den sortens fel som är
 * omöjlig att upptäcka i efterhand.
 *
 * ## Fyra av sex saknar `testomdome`
 *
 * Det finns inget svenskt grupptest av inbyggnadsreläer och smarta
 * väggbrytare. Shelly 1 Gen4 och Aqara H1 har publicerade produkttester,
 * Plejd CTR-01, Tapo S110E, Nexa infälld och Philips inbyggnadsrelä har inget
 * alls. Fältet utelämnas för de fyra, `weightedRating` fördelar om vikten och sidan skriver
 * "Ej testat" på raden. Det är också skälet till att det väger 15 här i
 * stället för 30 som på smart plug, se lib/categories.ts.
 *
 * ## Behörighetsfrågan, som skiljer produkttyperna åt
 *
 * Elsäkerhetsverket tillåter att en privatperson **byter** en befintlig
 * strömbrytare för högst 16 A i egen dosa, "om du vet hur du ska göra". Att
 * lägga in en relämodul bakom brytaren är däremot en förändring av den fasta
 * installationen, och Kjell skriver själv "Installation kräver behörig
 * elektriker" på Shelly 1 Gen4 och "ska installeras av behörig elektriker" på
 * Philips inbyggnadsrelä.
 *
 * Konsekvensen är hela sidans poäng: den typ som kräver elektriker är den alla
 * rekommenderar, och den typ du får montera själv är den ingen skriver om.
 * Aqara H1 är den enda i rankningen som är ett brytarbyte.
 *
 * Kriteriebetygen är redaktionell bedömning utifrån källorna i lib/sources.ts,
 * inte mätningar. Priserna kontrolleras med `pnpm priskoll`.
 *
 * ## Nexa infälld kom in i rankningen 2026-08-03
 *
 * Den låg bland de övervägda med lagerstatus som skäl. Efter användarbeslut
 * samma dag rankas slutsålda produkter ändå, och ingen lagerstatus anges.
 */

export const PRICE_CHECKED = "2026-08-03";

const SEEDS: ProductSeed[] = [
  {
    id: "shelly-1-gen4",
    userRating: { value: 5, count: 5, checkedAt: PRICE_CHECKED },
    brand: "Shelly",
    name: "1 Gen4 smart strömbrytarmodul",
    shortName: "1 Gen4",
    image: productImage(SMART_STROMBRYTARE.slug, "shelly-1-gen4"),
    tagline:
      "Wifi, Bluetooth, Zigbee och Matter i samma modul, och den fungerar när internet inte gör det.",
    scores: {
      installation: 2.5,
      ekosystem: 5,
      testomdome: 3.5,
      lokal: 5,
      prisvarde: 5,
      dimring: 4,
    },
    price: 269,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-inbyggnad/shelly-1-gen4-smart-strombrytarmodul-p52995",
    award: "winner",
    superlative: "Bäst för hela huset",
    pros: [
      "Fyra protokoll i en modul: wifi, Bluetooth, Zigbee och Matter",
      "Ingen hubb eller brygga behövs, och den styrs lokalt utan molnkonto",
      "16 A, vilket räcker till mer än belysning",
    ],
    cons: [
      "Kräver nolledare, och Kjell anger att installationen kräver behörig elektriker",
      "Zigbee-delen är ny och testaren fick den inte att para ihop sig via knappen",
      "Eco-läget gav märkbara fördröjningar i vissa firmwareversioner",
    ],
    specs: [
      { label: "Typ", value: "Relämodul bakom brytaren", highlight: true },
      { label: "Nolledare", shortLabel: "Nolla", value: "Krävs", highlight: true },
      { label: "Maxlast", value: "16 A vid 240 V AC", highlight: true },
      {
        label: "Protokoll",
        shortLabel: "Nätverk",
        value: "Wi-Fi, Bluetooth, Zigbee, Matter",
        highlight: true,
      },
      { label: "Hubb krävs", shortLabel: "Hubb", value: "Nej", highlight: true },
      /* Kjells egen specifikationstabell, läst renderad 2026-08-06:
         "Mått (B × H × D): 42 × 38 × 17 mm". Samma körning gav
         "Effektmätning: Nej", som ligger bakom Tapos energimätningsnackdel. */
      { label: "Mått", value: "42 × 38 × 17 mm", highlight: true },
      { label: "Dimring", value: "Nej, separat Shelly Dimmer Gen4" },
      { label: "Energimätning", value: "Nej, finns i 1PM Gen4" },
      { label: "Installation", value: "Behörig elektriker enligt Kjell" },
    ],
    verdict:
      "Shelly 1 Gen4 kostar 269 kronor och talar wifi, Bluetooth, Zigbee och Matter i samma modul. Ingen annan modul här talar mer än tre, och det betyder att den passar in i det du redan har hemma, vad det än råkar vara.\n\nStyrningen är lokal och kräver inget molnkonto. Ligger internet nere tänds lampan ändå, och den dag en tillverkares molntjänst stängs av sitter modulen kvar i väggen och gör sitt jobb. 16 A räcker dessutom till mer än belysning, så samma modul kan sitta bakom en handdukstork eller en pump. Priset gör resten: Elinstallatören räknade på en normalstor villa med arton belysningsgrupper och landade på 11 883 kronor för Shelly mot 13 758 för Plejd, alltså nästan två tusen kronor i skillnad på material innan någon dragit ett enda kabelstycke.\n\nDen kräver nolledare i dosan, och Kjell skriver att installationen kräver behörig elektriker. Räkna också med en kvart av trassel vid uppstarten: Zigbee-delen är ny, och testet som finns fick den inte att para ihop sig med knappen och behövde stänga av eco-läget för att bli av med fördröjningar.\n\n**Ska du styra belysningen i ett helt hus är det här modulen du ska köpa.** Den är billigast per punkt av allt som talar Matter, den låser dig inte till ett märke, och den fungerar utan uppkoppling. Bara en sak kan stoppa dig, och den sitter i väggen och inte i produkten: saknar dosan nolledare tar du Aqara H1.",
  },
  {
    id: "aqara-h1-utan-nolla",
    brand: "Aqara",
    name: "Smart Wall Switch H1 Singel utan neutralledare",
    shortName: "H1 utan nolla",
    image: productImage(SMART_STROMBRYTARE.slug, "aqara-h1-utan-nolla"),
    tagline:
      "Den enda modulen som fungerar i en dosa utan nolledare, och den enda du får byta själv.",
    scores: {
      installation: 5,
      ekosystem: 3,
      testomdome: 4,
      lokal: 3.5,
      prisvarde: 4,
      dimring: 2,
    },
    price: 369,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-inbyggnad/aqara-smart-wall-switch-h1-singel-utan-neutralledare-p51871",
    superlative: "Bäst utan nolledare",
    pros: [
      "Fungerar i dosor utan nolledare, vilket är vanligt i äldre svenska hus",
      "Ersätter brytaren, och ett brytarbyte står på Elsäkerhetsverkets lista över tillåtet egenarbete",
      "Zigbee 3.0, så den fungerar med fler system än bara Aqaras eget",
    ],
    cons: [
      "Kräver hubb eller annan Zigbee-controller, till skillnad från Shelly och Tapo",
      "Kostar 90 kronor mer än samma brytare i versionen med nolledare",
      "Maxlast 2 000 W, lägre än Shelly och Plejd",
    ],
    specs: [
      { label: "Typ", value: "Ersätter väggbrytaren", highlight: true },
      {
        label: "Nolledare",
        shortLabel: "Nolla",
        value: "Behövs inte",
        highlight: true,
      },
      { label: "Maxlast", value: "2 000 W", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee 3.0", highlight: true },
      { label: "Hubb krävs", shortLabel: "Hubb", value: "Ja", highlight: true },
      /* Kjells specifikationstabell, läst renderad 2026-08-06: "Mått:
         85,8x86x37,55 mm", modellnr WS-EUK01. Talet gäller hela brytaren och
         inte en modul som göms i dosan, vilket värdet säger ut. */
      { label: "Mått", value: "85,8 × 86 × 37,55 mm, hela brytaren", highlight: true },
      { label: "Dimring", value: "Nej" },
      { label: "Energimätning", value: "Nej" },
      { label: "Installation", value: "Brytarbyte, se Elsäkerhetsverket" },
    ],
    verdict:
      "Aqara H1 kostar 369 kronor och är den enda produkten här som fungerar i en dosa utan nolledare. Saknas nolledaren bakom knappen faller Shelly, Plejd, Tapo, Nexa och Philips bort på en gång.\n\nDen ersätter dessutom brytaren i stället för att gömmas bakom den, och det är skillnaden mellan ett jobb du får göra själv och ett du måste beställa. Ett brytarbyte står uttryckligen på Elsäkerhetsverkets lista över tillåtet egenarbete, medan en framdragen nolledare är en förändring av den fasta installationen och kräver ett registrerat elinstallationsföretag. Den skillnaden i pengar är mycket större än de nittio kronor extra som versionen utan nolledare kostar. Zigbee 3.0 gör den heller inte låst till Aqaras eget system, och knapparna har fått nya mikrobrytare med tydligt tryck, vilket är den del av produkten du faktiskt tar på flera gånger om dagen i tio år.\n\nDen kräver en Aqara Hub eller någon annan Zigbee-controller. Det är ett köp till, och en sak till som kan sluta fungera en tisdagskväll när bara lampan i hallen skulle tändas.\n\nSaknar dosan nolledare är valet redan gjort. Har du nolla är den här brytaren 100 kronor dyrare än Shelly 1 Gen4 och kräver en hubb till, och då finns det ingen anledning att välja den.",
  },
  {
    id: "plejd-ctr-01",
    userRating: { value: 5, count: 101, checkedAt: PRICE_CHECKED },
    brand: "Plejd",
    name: "CTR-01 infälld Bluetooth-fjärrströmbrytare 3 500 W",
    shortName: "CTR-01",
    image: productImage(SMART_STROMBRYTARE.slug, "plejd-ctr-01"),
    tagline:
      "Svensktillverkad, byggd för svenska dosor och det system landets elektriker faktiskt installerar.",
    scores: {
      installation: 3,
      ekosystem: 3,
      /* testomdome utelämnas: ingen oberoende part har testat CTR-01.
         Hemmastyrning har testat systerprodukten DIM-01, vilket är en annan
         produkt och räknas därför inte som ett omdöme för den här. */
      lokal: 5,
      prisvarde: 2.5,
      dimring: 4.5,
    },
    price: 599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-inbyggnad/plejd-infalld-bluetooth-fjarrstrombrytare-3500-w-p51013",
    award: "editor",
    superlative: "Redaktionens val",
    pros: [
      "3 500 W, den högsta maxlasten av modulerna",
      "Bluetooth-nätet är helt lokalt och behöver varken hubb eller internet",
      "Fungerar med både vanliga och återfjädrande väggströmbrytare",
    ],
    cons: [
      "Dyrast av reläerna, och hela systemet kostar mer än Shelly",
      "Eget Bluetooth-nät utan Matter eller Zigbee, så det står för sig självt",
      "Kräver nolledare i dosan, alltså inget alternativ i ett äldre hus utan nolla",
    ],
    specs: [
      { label: "Typ", value: "Relämodul bakom brytaren", highlight: true },
      { label: "Nolledare", shortLabel: "Nolla", value: "Krävs", highlight: true },
      {
        label: "Maxlast",
        value: "3 500 W, LED 800 W",
        highlight: true,
      },
      {
        label: "Protokoll",
        shortLabel: "Nätverk",
        value: "Bluetooth mesh",
        highlight: true,
      },
      { label: "Hubb krävs", shortLabel: "Hubb", value: "Nej", highlight: true },
      /* 46 × 46 × 18 mm står i Plejds egen tekniska data på
         plejd.com/sv-se/produkter/ctr-01, kontrollerat 2026-08-06. Samma sida
         anger standbyeffekt < 0,5 W och ingen energimätning. */
      { label: "Mått", value: "46 × 46 × 18 mm", highlight: true },
      { label: "Dimring", value: "Nej, separat DIM-01 i samma app" },
      { label: "Installation", value: "Behörig elektriker" },
    ],
    verdict:
      "Plejd CTR-01 kostar 599 kronor och tar 3 500 W, den högsta maxlasten här. Det är också det system svenska elektriker installerar när kunden ber om belysningsstyrning, vilket märks på allt utom priset.\n\nModulen är byggd för svenska förhållanden på ett sätt ingen annan här är. Den fungerar med både vanliga och återfjädrande väggbrytare, alltså med den knapp som redan sitter i väggen oavsett vilken sort det är, och den styr transformatorer med 1-10 V som annars kräver en pryl till. Bluetooth-nätet går mellan enheterna själva, utan hubb och utan internet, så belysningen i huset är oberoende av både router och molnkonto. Och 101 kunder har satt fem av fem, vilket är det bredaste omdömet någon produkt i hela vårt urval har fått. Plejd säljs dessutom mest genom elektriker, så butikens siffra underskattar spridningen snarare än tvärtom.\n\nDu köper ett system och inte en modul. Bluetooth-nätet är Plejds eget, utan Matter och utan Zigbee, och det betyder att den dag du vill byta ut en del byter du hela. Räknat på arton belysningsgrupper landar Elinstallatören på 13 758 kronor för Plejd mot 11 883 för Shelly.\n\nHar elektrikern redan satt Plejd i huset ska nästa punkt också bli Plejd, och 3 500 W tar laster ingen annan modul här klarar. Bygger du från noll och vill kunna byta märke en enhet i taget kostar Shelly 1 Gen4 330 kronor mindre och låser dig inte.",
  },
  {
    id: "tapo-s110e",
    userRating: { value: 4.5, count: 7, checkedAt: PRICE_CHECKED },
    brand: "TP-Link",
    name: "Tapo S110E smart switch-modul",
    shortName: "Tapo S110E",
    image: productImage(SMART_STROMBRYTARE.slug, "tapo-s110e"),
    tagline:
      "Minsta modulen av de sex, med energimätning inbyggd och Matter direkt ur lådan.",
    scores: {
      installation: 3,
      ekosystem: 4.5,
      /* testomdome utelämnas: inga oberoende tester, bara tillverkarens egna
         sidor och en nyhetsnotis. */
      lokal: 2.5,
      /* Står kvar på 4,0 trots att priset föll från 289 till 239 kronor vid
         omkontrollen 2026-08-03. Prisvärde är inte lägst pris: modulen tar
         bara 150 W LED, sidans lägsta last för belysning, och den saknar
         dimring helt. Att 4,5 en gång provades och gav samma betyg som
         Plejd CTR-01 var ett avrundningsfel som rättades i lib/products.ts
         2026-08-03, inte ett sakskäl. Sakskälet är lasten. */
      prisvarde: 4,
      dimring: 1.5,
    },
    price: 239,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-inbyggnad/tp-link-tapo-s110e-smart-switch-modul-wifi-bluetooth-matter-p57992",
    superlative: "Minsta modulen",
    pros: [
      "44,7 × 33,9 × 16,1 mm, minst av modulerna och lättast att få plats med",
      "Energimätning inbyggd, vilket ingen av de andra reläerna har",
      "Matter utan hubb, så den syns direkt i Apple Home, Google Home och Alexa",
    ],
    /* Dimmernackdelen sa tidigare att ingen dimmermodul finns i Tapos
       inbyggnadssortiment. TP-Links egen produktsida för Tapo S200D,
       kontrollerad 2026-08-06, visar vad som faktiskt finns: en batteridriven
       vridknapp på 86 × 86 × 23,7 mm som kräver Tapo Hub och dimrar smarta
       lampor. Nackdelen säger nu det köparen råkar ut för. */
    cons: [
      "Bara 150 W LED, den lägsta lasten för belysning i jämförelsen",
      "Tapo-appens egna funktioner förutsätter molnkonto",
      "Dimrar inte kretsen, och Tapos dimmer är en batteriknapp som kräver Tapo Hub och styr smarta lampor",
    ],
    specs: [
      { label: "Typ", value: "Relämodul bakom brytaren", highlight: true },
      { label: "Nolledare", shortLabel: "Nolla", value: "Krävs", highlight: true },
      {
        label: "Maxlast",
        value: "10 A resistivt, 150 W LED",
        highlight: true,
      },
      {
        label: "Protokoll",
        shortLabel: "Nätverk",
        value: "Wi-Fi, Bluetooth, Matter",
        highlight: true,
      },
      { label: "Hubb krävs", shortLabel: "Hubb", value: "Nej", highlight: true },
      { label: "Mått", value: "44,7 × 33,9 × 16,1 mm", highlight: true },
      { label: "Dimring", value: "Nej" },
      { label: "Energimätning", value: "Ja" },
    ],
    verdict:
      "Tapo S110E kostar 239 kronor och mäter 44,7 × 33,9 × 16,1 millimeter, minst av modulerna här. I en gammal grund dosa bakom en brytare med grova ledare är det skillnaden mellan att locket går igen och att det inte gör det.\n\nDen räknar dessutom kilowattimmar, vilket ingen av de andra reläerna gör, så du kan se vad golvvärmen i badrummet faktiskt drar i stället för att gissa. Matter sitter i modulen och kräver ingen hubb: den dyker upp direkt i Apple Home, Google Home och Alexa, och den styrs lokalt därifrån.\n\nSedan kommer talet som avgör om den passar dig, och det är 150 W LED. Det räcker gott till en taklampa eller ett par spottar. En hel belysningsgrupp med infälld spotbelysning i ett vardagsrum ligger över, och Plejd tar 800 W på samma rad. Tapo-appens egna scheman förutsätter dessutom ett konto hos TP-Link, även om grundstyrningen via Matter är lokal.\n\nSitter det en taklampa eller ett par spottar bakom en trång dosa är den här både minst och billigast, och energimätningen får du på köpet. Ska den ta hela vardagsrummets belysning räcker den inte, och då är Shelly 1 Gen4 för 269 kronor rätt modul.",
  },
  {
    id: "nexa-infalld-2000w",
    brand: "Nexa",
    name: "Infälld fjärrströmbrytare 2 000 W",
    shortName: "Nexa infälld",
    image: productImage(SMART_STROMBRYTARE.slug, "nexa-infalld-2000w"),
    tagline:
      "149,90 kronor mot 239 för nästa modul, och den lyder en fjärrkontroll utan router, konto eller app.",
    /* Kom in i rankningen 2026-08-03. Den låg bland de övervägda med
       lagerstatus som skäl, och efter användarbeslut samma dag rankas
       slutsålda produkter ändå. */
    scores: {
      installation: 2.5,
      ekosystem: 2,
      /* testomdome utelämnas: ingen oberoende part har testat modellen. */
      lokal: 4.5,
      prisvarde: 4.5,
      dimring: 1.5,
    },
    price: 149.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-inbyggnad/nexa-infalld-fjarrstrombrytare-2000-w-p65194",
    userRating: { value: 4.5, count: 47, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst för stugan",
    pros: [
      "149,90 kronor, alltså under två tredjedelar av näst billigaste modul",
      "Fungerar med en Nexa-fjärrkontroll helt utan hubb, konto och internet",
      "32 minnesplatser, så flera brytare och fjärrkontroller kan styra samma last",
      "2 000 W resistiv last, alltså marginal för en pump eller en värmare",
      "47 kundbetyg på 4,5, det bredaste underlaget efter Plejd",
    ],
    /* Ekosystemnackdelen sa tidigare "Varken Matter, Google, Alexa eller
       HomeKit anges av butiken". Ett påstående om vad en produkt klarar går
       inte att fastställa hos återförsäljaren, och Nexas egen sida
       nexa.se/nexa-bridge-x/roststyrning, läst 2026-08-06, visar Google
       Assistant genom bryggan med lokal styrning över nätverket. Matter,
       Alexa och HomeKit nämns inte där. Betyget för ekosystem står kvar på
       2,0: Google kräver ett bryggköp och de tre andra saknas.

       Maxlasten står som resistiv last hos Nexa. Den jämfördes tidigare med
       Tapos 150 W LED, vilket är två olika mått. */
    cons: [
      "Kräver både fas och nolla i dosan, som de flesta här utom Aqara",
      "Ingen app och ingen automation utan en Nexa Bridge, som kostar extra",
      "Google Assistant fungerar genom bryggan, men Nexa anger varken Matter, Alexa eller HomeKit",
      "Bara av och på, ingen dimring",
    ],
    specs: [
      { label: "Typ", value: "Relämodul i tak- eller apparatdosa", highlight: true },
      { label: "Nolledare", shortLabel: "Nolla", value: "Krävs", highlight: true },
      { label: "Maxlast", value: "2 000 W resistiv last", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Nexa självlärande radio", highlight: true },
      { label: "Hubb krävs", shortLabel: "Hubb", value: "Nej för fjärrkontroll, ja för app", highlight: true },
      /* 48 × 48 × 25 mm står både i Nexas produktdata för MCMR-2000 och i
         manualens tekniska tabell, kontrollerat 2026-08-06. Manualen anger
         också egenförbrukning < 1 W och ingen separat LED-last. */
      { label: "Mått", value: "48 × 48 × 25 mm", highlight: true },
      { label: "Dimring", value: "Nej" },
      { label: "Minnesplatser", value: "32" },
      { label: "Energimätning", value: "Nej" },
    ],
    verdict:
      "Nexa infälld kostar 149,90 kronor. Nästa modul här kostar 239 och den dyraste 639, och för de pengarna får du ett relä som fungerar utan konto, utan app och utan router.\n\nDu parar den mot en Nexa-fjärrkontroll genom att hålla in en knapp, och sedan gör den sitt jobb. Ingen inloggning som ska förnyas, ingen molntjänst som kan läggas ner, ingenting som slutar fungera för att bredbandet ligger nere. I ett sommarhus med skral uppkoppling är det rätt svar och inte en nödlösning. 32 minnesplatser gör att flera knappar och fjärrkontroller kan styra samma lampa, och 2 000 W resistiv last ger marginal för en pump eller en frostvakt. 47 kunder har satt 4,5, vilket är det bredaste omdömet efter Plejd.\n\n**Vill du ha app och automation behöver du en Nexa Bridge, och då är prisfördelen borta.** Nexa uppger Google Assistant genom bryggan, men varken Matter, Alexa eller HomeKit, så modulen håller sig för sig själv i ett blandat smart hem. Den dimrar inte, och den kräver både fas och nolla i dosan.\n\nKöp den till stugan, förrådet eller pumpen, alltså dit en knapp i handen räcker och nätet ändå inte når. Ska lampan gå på schema och tala med resten av huset kostar Shelly 1 Gen4 hundranitton kronor mer och är ett annat slags produkt.",
  },
  {
    id: "hue-inbyggnadsrela",
    brand: "Philips Hue",
    name: "Smart inbyggnadsrelä 2 kanaler",
    shortName: "Inbyggnadsrelä",
    image: productImage(SMART_STROMBRYTARE.slug, "hue-inbyggnadsrela"),
    tagline:
      "Två ljuskretsar in i Hue-systemet, för den som redan har bryggan och resten.",
    scores: {
      installation: 2,
      ekosystem: 3,
      /* testomdome utelämnas: produkten är märkt NYHET hos Kjell och ingen
         oberoende part har hunnit testa den. */
      lokal: 4,
      prisvarde: 2,
      dimring: 2.5,
    },
    price: 639,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-inbyggnad/philips-hue-smart-inbyggnadsrela-2-kanaler-p66851",
    award: "premium",
    superlative: "Bäst för Hue-hem",
    pros: [
      "Styr två ljuskretsar separat från en enda modul",
      "Vanliga armaturer blir en del av Hue-systemet, utan att lamporna byts",
      "Hue Bridge kör lokalt, så styrningen fungerar utan internet",
    ],
    cons: [
      "Dyrast i jämförelsen och bara 400 W LED",
      "Hue Bridge rekommenderas för full funktion, alltså ett köp till om du saknar den",
      "Kräver nolledare och ska enligt Kjell installeras av behörig elektriker",
    ],
    specs: [
      { label: "Typ", value: "Relämodul, 2 kanaler", highlight: true },
      { label: "Nolledare", shortLabel: "Nolla", value: "Krävs", highlight: true },
      { label: "Maxlast", value: "400 W LED", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee", highlight: true },
      {
        label: "Hubb krävs",
        shortLabel: "Hubb",
        value: "Hue Bridge rekommenderas",
        highlight: true,
      },
      /* 41 × 37,3 × 16,8 mm och 20 g står i Signifys egen produktdata för
         8721103111753, kontrollerad 2026-08-06, och samma tal står i Kjells
         specifikationstabell. Manualen som Kjell länkar anger 16 A och
         220-240 V för hela modulen; 400 W är LED-talet, som är det som gäller
         för belysning. */
      { label: "Mått", value: "41 × 37,3 × 16,8 mm", highlight: true },
      { label: "Dimring", value: "Nej, dimra med Hue-lampor i stället" },
      { label: "Energimätning", value: "Nej" },
      { label: "Installation", value: "Behörig elektriker enligt Kjell" },
    ],
    verdict:
      "Philips Hue inbyggnadsrelä kostar 639 kronor och tar in två separata ljuskretsar i Hue-systemet från en enda modul. Det är dyrast här, och det är också den enda modulen som gör två kretsar samtidigt.\n\nDen löser ett problem smarta lampor inte kommer åt: badrumsarmaturen, köksbänken, den infällda taklösningen förra ägaren monterade. Sådant går inte att skruva en Hue-lampa i, och med reläet blir de ändå en del av samma system, med samma scener och samma app som resten av huset. Hue Bridge kör dessutom lokalt, så knappen på väggen och scenerna fungerar när bredbandet ligger nere. Med 41 × 37,3 × 16,8 millimeter är den näst minst av modulerna, alltså inget problem att få ner i dosan.\n\n400 W LED är hälften av vad Plejd tar, och saknar du Hue Bridge tillkommer den. Då blir en modul som ska ersätta en strömbrytare för femtio kronor plötsligt en investering på över tusen.\n\nHar du redan Hue i halva huset är det här sättet att ta med resten, och två kretsar för 639 kronor är billigare än två moduler. Har du inget Hue gör Shelly 1 Gen4 samma jobb för 269 kronor, och då finns det ingen anledning att börja här.",
  },
];

export const SMART_STROMBRYTARE_PRODUCTS = resolveProducts(
  SMART_STROMBRYTARE,
  SEEDS,
);

/**
 * Installationsegenskaperna i maskinläsbar form, för InstallationPicker.
 *
 * Ett eget typat fält snarare än en tolkning av specsträngarna. Att läsa
 * "Krävs" ur en spec med etiketten "Nolledare" fungerar exakt tills någon
 * skriver "Ja" eller "Krävs (blå ledare)" i stället, och då rekommenderar
 * verktyget en modul som är omöjlig att installera hemma hos läsaren. Det är
 * det enda felet det här verktyget finns för att förhindra.
 */
export type SwitchCapability = {
  id: string;
  /** rela göms bakom knappen, brytare ersätter den. Avgör vad reglerna säger. */
  kind: "rela" | "brytare";
  needsNeutral: boolean;
};

export const SMART_STROMBRYTARE_CAPABILITIES: SwitchCapability[] = [
  { id: "shelly-1-gen4", kind: "rela", needsNeutral: true },
  { id: "aqara-h1-utan-nolla", kind: "brytare", needsNeutral: false },
  { id: "plejd-ctr-01", kind: "rela", needsNeutral: true },
  { id: "tapo-s110e", kind: "rela", needsNeutral: true },
  /* Saknades här från 2026-08-03, då Nexa flyttade in i rankningen, till
     2026-08-06. Listan är verktygets hela urval, så sidans billigaste modul
     gick inte att få som svar i installationsguiden trots att den låg i
     tabellen. Nexas manual för MCMR-2000: "Mottagaren behöver både fas och
     nolla." Lägg alltid till en rad här när en produkt tillkommer. */
  { id: "nexa-infalld-2000w", kind: "rela", needsNeutral: true },
  { id: "hue-inbyggnadsrela", kind: "rela", needsNeutral: true },
];

/**
 * Övervägda men inte rankade.
 *
 * Två grupper dominerar, och båda är uteslutna på kategori snarare än på
 * kvalitet: dimrarna, som gör något annat än att slå av och på, och den
 * batteridrivna brytarmodulen, som inte bryter ström alls.
 */
export const SMART_STROMBRYTARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Shelly",
    name: "1 Mini Gen4 smart strömbrytarmodul",
    reason:
      "Billigare och mindre än Gen4, med butikens högsta betyg av alla Shelly-modulerna. Utesluten för att den ligger så nära vår testvinnare att två Shelly i samma topplista hade sagt mer om vårt urval än om marknaden. Klarar dessutom lägre last.",
    approxPrice: 219,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-inbyggnad/shelly-1-mini-gen4-smart-strombrytarmodul-p52993",
  },
  {
    brand: "Aqara",
    name: "Smart Wall Switch H1 Singel med neutralledare",
    reason:
      "Samma brytare som vår tvåa, 90 kronor billigare, men kräver nolledare i dosan. Vi rankar versionen utan nolledare eftersom den löser det svårare problemet. Har du nolla är den här varianten det billigare köpet.",
    approxPrice: 279,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-inbyggnad/aqara-smart-wall-switch-h1-singel-med-neutralledare-p51873",
  },
  {
    brand: "Plejd",
    name: "DIM-01 infälld Bluetooth-dimmermottagare 300 W",
    reason:
      "Dimmer och inte av-på-relä, alltså en annan produktkategori. Har vårt högsta butiksunderlag av alla produkter vi tittat på, fem av fem från 135 personer, och är testad av Hemmastyrning. Den hör hemma i avsnittet om dimring.",
    approxPrice: 529,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/smarta-dimmers/plejd-infalld-bluetooth-dimmermottagare-300-w-p51012",
  },
  {
    brand: "Shelly",
    name: "Dimmer Gen4 200 W",
    reason:
      "Dimmer och inte av-på-relä. Den är svaret för den som vill dimra i Shelly-systemet, men att ranka en dimmer mot ett relä på maxlast och installationskrav vore att jämföra två olika jobb.",
    approxPrice: 569,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/smarta-dimmers/shelly-dimmer-gen4-200-w-p52273",
  },
  {
    brand: "Philips Hue",
    name: "Väggbrytarmodul 1-pack",
    reason:
      "Bryter ingen ström. Modulen är batteridriven och läser av din befintliga brytare för att skicka en Zigbee-signal, så den hör till avsnittet om brytare utan installation snarare än till rankningen.",
    approxPrice: 399,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/philips-hue/philips-hue-tillbehor/philips-hue-vaggbrytarmodul-1-pack-p51737",
  },
];

export const SMART_STROMBRYTARE_FAQ = [
  {
    question: "Får jag installera en smart strömbrytare själv?",
    answer:
      "Det beror på vilken typ. Elsäkerhetsverket tillåter att du själv byter en befintlig strömbrytare för högst 16 A som sitter i egen kapsling eller dosa, med tillägget att det gäller om du vet hur du ska göra. Att i stället lägga in en relämodul bakom brytaren är en förändring av den fasta installationen och kräver ett registrerat elinstallationsföretag. Kjell skriver själv att installation kräver behörig elektriker på både Shelly 1 Gen4 och Philips inbyggnadsrelä. Är du det minsta osäker ska du anlita ett elinstallationsföretag, vilket är myndighetens egen formulering.",
  },
  {
    question: "Vad betyder det att en smart brytare kräver nolla?",
    answer:
      "Elektroniken i en smart brytare behöver ström dygnet runt för att kunna ta emot kommandot att tända. För det krävs både fas och nolledare i dosan. I många äldre svenska hem går bara fasen till brytaren och nolledaren möter lampan direkt i taket, och då fungerar inte en brytare som kräver nolla. Vissa produkter, som Aqara H1 i versionen utan neutralledare, är byggda för att klara sig ändå. Att i stället dra fram en nolledare är en ändring av den fasta installationen och kräver behörigt elinstallationsföretag.",
  },
  {
    question: "Hur vet jag om jag har nolla i strömbrytardosan?",
    answer:
      "Slå av säkringen, skruva loss brytaren och titta på ledarna. Finns det en blå ledare i dosan utöver de svarta eller bruna är det sannolikt nolledaren. Ett vanligt undantag är att det sitter ett vägguttag i golvnivå rakt under brytaren, för då passerar ofta en nolledare genom dosan bakom knappen. Är du osäker på vad du ser ska du inte gissa, utan fråga en elektriker. Fel koppling kan enligt Elsäkerhetsverket innebära livsfara.",
  },
  {
    question: "Vilken smart strömbrytare är bäst i test 2026?",
    answer:
      "Shelly 1 Gen4 får högst betyg i vår jämförelse, 269 kronor hos Kjell & Company. Den talar wifi, Bluetooth, Zigbee och Matter i samma modul, behöver ingen hubb och styrs lokalt utan molnkonto. Den kräver däremot nolledare i dosan och Kjell anger att installationen kräver behörig elektriker. Saknar du nolla är Aqara Smart Wall Switch H1 utan neutralledare svaret i stället, eftersom den är den enda i jämförelsen som fungerar utan.",
  },
  {
    question: "Behöver jag en hubb till en smart strömbrytare?",
    answer:
      "Inte alltid. Shelly 1 Gen4 och Tapo S110E ansluter direkt till ditt wifi och behöver ingen hubb. Plejd bygger ett eget Bluetooth-nät mellan sina egna enheter och klarar sig också utan. Aqara H1 kräver däremot en Aqara Hub eller någon annan Zigbee-controller, och Philips inbyggnadsrelä vill ha en Hue Bridge för full funktion. Räkna in det i priset, eftersom en hubb både kostar pengar och är ytterligare en sak som kan sluta fungera.",
  },
  {
    question: "Fungerar en smart strömbrytare när internet ligger nere?",
    answer:
      "Den fysiska knappen på väggen fungerar alltid, oavsett produkt. Det som skiljer är om appen och automatiseringarna gör det. Shelly och Plejd styrs lokalt utan molnkonto, och Hue Bridge kör också lokalt. Tapos egna scheman och automatiseringar förutsätter däremot TP-Links moln, även om Matter ger lokal grundstyrning. Det är skälet till att vi väger Drift utan moln som ett eget kriterium: en väggbrytare ska fungera i tio år, och molntjänster har kortare livslängd än så.",
  },
  {
    question: "Kan jag dimra med en smart strömbrytare?",
    answer:
      "Inte med någon av de sex produkter vi rankar. Alla är av-på-reläer. Vill du dimra behöver du en dimmervariant i samma system: Plejd DIM-01 kostar 529 kronor och Shelly Dimmer Gen4 kostar 569 kronor. Alternativet är att dimra i lampan i stället, alltså sätta smarta lampor i armaturen och låta väggbrytaren stå kvar. Tänk på att en dimmer alltid har lägre maxlast än ett relä, och att billiga LED-lampor kan flimra vid låg dimring oavsett vilken dimmer du väljer.",
  },
  {
    question: "Vad händer med mina smarta lampor om någon slår av väggbrytaren?",
    answer:
      "De försvinner ur appen, eftersom de inte har någon ström. Det är det vanligaste irritationsmomentet med smart belysning och hela skälet till att smarta strömbrytare finns. Lösningen är att flytta logiken från lampan till väggen: antingen en relämodul bakom brytaren så att strömmen alltid är på, eller en trådlös batteribrytare klistrad över den gamla knappen. Den senare kräver ingen installation alls och är den enda varianten vem som helst får sätta upp.",
  },
  {
    question: "Finns det smarta strömbrytare som inte kräver installation?",
    answer:
      "Ja, trådlösa batteribrytare. De skruvas eller klistras på väggen utan att kopplas till 230 volt och skickar en radiosignal till dina smarta lampor. Philips Hue Tap Dial, Ikeas fjärrkontroller och Shelly BLU Wall Switch hör hit. De kräver ingen elektriker och inget tillstånd, de kan sitta var som helst inklusive över en befintlig brytare som du vill hindra folk från att slå av, och de kostar mindre. Nackdelen är att de bara styr smarta lampor: en vanlig armatur blir inte smart av en trådlös knapp.",
  },
];
