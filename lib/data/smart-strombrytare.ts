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
    superlative: "Bäst i test",
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
      { label: "Dimring", value: "Nej, separat Shelly Dimmer Gen4" },
      { label: "Energimätning", value: "Nej, finns i 1PM Gen4" },
      { label: "Installation", value: "Behörig elektriker enligt Kjell" },
    ],
    verdict:
      "Shelly 1 Gen4 kostar 269 kronor och talar fyra protokoll i samma modul. Det betyder att den passar in i nästan vilket system som helst, och till skillnad från de flesta konkurrenter fungerar den lokalt: ligger internet nere tänds lampan ändå, och läggs en molntjänst ner om fem år står modulen kvar.\n\nPriset gör resten. Elinstallatören har räknat på en normalstor villa med arton belysningsgrupper och landar på 11 883 kronor för Shelly mot 13 758 för Plejd, nästan två tusen i skillnad på material innan någon dragit ett enda kabelstycke.\n\nMen läs kritiken innan du beställer. Testet som finns är i grunden positivt men har konkreta invändningar: Zigbee-parningen gick inte att göra med knappen, en virtuell brytare gick inte att ställa om, och eco-läget gav fördröjningar som fick stängas av.\n\nDet viktigaste förbehållet är ändå ett annat, och det är inte produktens fel: den kräver nolledare i dosan. Har du inte det är den här modulen inte ett alternativ, oavsett hur bra den är, och då är Aqara svaret i stället.",
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
      { label: "Dimring", value: "Nej" },
      { label: "Energimätning", value: "Nej" },
      { label: "Installation", value: "Brytarbyte, se Elsäkerhetsverket" },
    ],
    verdict:
      "Aqara H1 fungerar utan nolledare i brytardosan. Saknas nolledare i brytardosan faller Shelly, Plejd, Tapo och Philips bort på en gång, och då återstår i praktiken den här.\n\nAtt dra fram en nolla är inte en helgeftermiddag utan en förändring av den fasta installationen, vilket kräver registrerat elinstallationsföretag. Att byta brytaren mot den här är däremot ett brytarbyte, och det står uttryckligen på Elsäkerhetsverkets lista över vad du får göra själv om du vet hur du ska göra. Skillnaden i pengar är större än de nittio kronor extra som versionen utan nolledare kostar.\n\nDen kräver en hubb eller någon annan Zigbee-controller, vilket är ett extra köp och ett extra fel som kan uppstå, och den är låst till av och på: vill du dimra måste du lösa det med lamporna i stället.\n\nDe brittiska testarna, vars hus har samma nolledarproblem som våra äldre, är samstämmigt positiva och lyfter särskilt att knapparna fått nya mikrobrytare med tydlig känsla. Det är den delen du tar på flera gånger om dagen i tio år.",
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
      "Ingen oberoende part har testat just den här modulen",
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
      { label: "Dimring", value: "Nej, separat DIM-01 i samma app" },
      { label: "Mått", value: "46 × 46 × 18 mm" },
      { label: "Installation", value: "Behörig elektriker" },
    ],
    verdict:
      "Plejd är det system svenska elektriker installerar när kunden ber om belysningsstyrning, och det märks på allt utom priset. Modulen är gjord för svenska förhållanden på ett sätt ingen av de andra är: den klarar 3 500 W, den fungerar med både vanliga och återfjädrande brytare, och den styr transformatorer med 1-10 V som annars kräver en extra pryl. Bluetooth-nätet är dessutom helt lokalt, utan hubb och utan internet, vilket är en av de starkaste egenskaperna någon modul här har.\n\nButiksbetyget är vårt högsta i hela projektet: fem av fem från 101 personer, och Plejd säljs dessutom mest genom elektriker, så butikens siffra underskattar spridningen snarare än tvärtom.\n\nPriset först: 599 kronor styck, och Elinstallatören räknar hem hela Plejd-systemet på 13 758 kronor mot Shellys 11 883 för samma villa. Sedan slutenheten. Bluetooth-nätet är Plejds eget, utan Matter och utan Zigbee, så du köper ett helt system snarare än en modul.\n\nÄr det systemet du vill ha är det här rätt produkt. Vill du kunna byta ut en del i taget är det inte det.",
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
    cons: [
      "Bara 150 W LED, den lägsta lasten för belysning i jämförelsen",
      "Tapo-appens egna funktioner förutsätter molnkonto",
      "Ingen dimmermodul finns i Tapos inbyggnadssortiment",
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
      { label: "Dimring", value: "Nej" },
      { label: "Energimätning", value: "Ja" },
      { label: "Mått", value: "44,7 × 33,9 × 16,1 mm" },
    ],
    verdict:
      "Tapo S110E mäter 44,7 × 33,9 × 16,1 millimeter och är den minsta modulen av de sex, och i en gammal grund dosa bakom en brytare med tjocka ledare är det skillnaden mellan att locket går igen och att det inte gör det. Att TP-Link dessutom lagt in energimätning, som ingen av de andra reläerna har, till 239 kronor är svårt att klaga på.\n\nSedan kommer siffran som avgör om den passar dig: 150 W LED. Det räcker gott till en taklampa eller ett par spottar, men en hel belysningsgrupp i ett vardagsrum kan ligga över, och då är det fel produkt. Jämför med Plejds 800 W LED.\n\nDet andra förbehållet är molnet. Matter ger lokal styrning, men Tapo-appens egna scheman och automatiseringar hänger på TP-Links moln, och det är TP-Links moln som styr när funktionerna får finnas kvar.\n\nIngen oberoende testare har heller granskat modulen. Det som finns är tillverkarens egna sidor och en nyhetsnotis, så kriteriet står tomt och vikten fördelas på de övriga.",
  },
  {
    id: "nexa-infalld-2000w",
    brand: "Nexa",
    name: "Infälld fjärrströmbrytare 2 000 W",
    shortName: "Nexa infälld",
    image: productImage(SMART_STROMBRYTARE.slug, "nexa-infalld-2000w"),
    tagline: "Halva priset på näst billigaste, och ingen app om du inte köper en hubb.",
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
    superlative: "149,90 kr, billigast på sidan",
    pros: [
      "149,90 kronor, alltså under två tredjedelar av näst billigaste modul",
      "Fungerar med en Nexa-fjärrkontroll helt utan hubb, konto och internet",
      "32 minnesplatser, så flera brytare och fjärrkontroller kan styra samma last",
      "2 000 W, alltså mer än dubbelt Tapos 150 W för belysning",
      "47 kundbetyg på 4,5, näst bredaste underlaget bland reläerna",
    ],
    cons: [
      "Kräver både fas och nolla i dosan, som de flesta här utom Aqara",
      "Ingen app och ingen automation utan Nexa Smart Hub eller Bridge X",
      "Varken Matter, Google, Alexa eller HomeKit anges av butiken",
      "Bara av och på, ingen dimring",
      "Ingen oberoende part har testat den",
    ],
    specs: [
      { label: "Typ", value: "Relämodul i tak- eller apparatdosa", highlight: true },
      { label: "Nolledare", shortLabel: "Nolla", value: "Krävs", highlight: true },
      { label: "Maxlast", value: "2 000 W", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Nexa självlärande radio", highlight: true },
      { label: "Hubb krävs", shortLabel: "Hubb", value: "Nej för fjärrkontroll, ja för app", highlight: true },
      { label: "Dimring", value: "Nej" },
      { label: "Minnesplatser", value: "32" },
      { label: "Energimätning", value: "Nej" },
      { label: "Mått", value: "48 × 48 × 25 mm" },
    ],
    verdict:
      "Nexa infälld kostar 149,90 kronor och är den enda modulen som fungerar helt utan konto.\n\n149,90 kronor. Nästa modul kostar 239 och den dyraste 639. För pengarna får du ett självlärande relä som du parar mot en Nexa-fjärrkontroll genom att hålla in en knapp, och sedan fungerar det. Ingen app, ingen inloggning, ingen molntjänst som kan läggas ner, och ingen router som behöver vara igång. I ett sommarhus med dålig uppkoppling är det inte en nödlösning utan rätt svar.\n\nDen tar 2 000 watt, alltså mer än tio gånger Tapo S110E:s 150 watt för belysning, och har 32 minnesplatser så att flera brytare och fjärrkontroller kan styra samma lampa. 47 kundbetyg på 4,5 är näst bredaste underlaget bland reläerna här.\n\nSedan kommer det som håller den nere. **Vill du ha en app behöver du köpa en Nexa Smart Hub eller Bridge X**, och då är prisfördelen borta. Butiken anger varken Matter, Google, Alexa eller HomeKit, vilket betyder att modulen inte talar med resten av ett blandat smart hem. Den dimrar inte. Och den kräver nolla i dosan, vilket i ett hus byggt före 1994 ofta betyder att den inte går att använda i väggbrytaren alls.\n\nKöp den om du vill fjärrstyra en lampa eller en pump och inte bryr dig om appen. Vill du ha automation, ta Shelly 1 Gen4 för 269 kronor, som är ett annat slags produkt för hundranitton kronor mer.",
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
      { label: "Dimring", value: "Nej, dimra med Hue-lampor i stället" },
      { label: "Energimätning", value: "Nej" },
      { label: "Installation", value: "Behörig elektriker enligt Kjell" },
    ],
    verdict:
      "Hue inbyggnadsrelä är inte för dig som ska köpa din första smarta brytare. Den är för dig som redan har Hue i halva huset och står inför de armaturer som inte går att göra smarta med en lampa: badrumsbelysningen, köksbänken, den infällda taklösningen från förra ägaren. Att få två separata ljuskretsar in i samma system från en modul löser det problemet snyggt, och Hue Bridge kör lokalt så knappen på väggen fungerar även när internet inte gör det.\n\nPriset är svårare. 639 kronor är dyrast i jämförelsen och du får 400 W LED, alltså under Plejds 800 W. Saknar du Hue Bridge tillkommer den. Räknar man ihop det blir en modul som ska ersätta en femtiolapps strömbrytare plötsligt en investering på över tusen kronor, och då ska man vilja ha just Hue.\n\nProdukten är dessutom märkt som nyhet hos Kjell och ingen har hunnit testa den, så kriteriet står tomt.\n\nHar du redan systemet är det ett rimligt köp. Har du det inte finns det ingen anledning att börja här.",
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
