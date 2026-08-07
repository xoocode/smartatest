import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { DORR_OCH_FONSTERSENSOR } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /dorr-och-fonstersensor.
 *
 * Priser, lagerstatus och kundbetyg lästa i butikernas egen JSON-LD på
 * PRICE_CHECKED. Måtten och batteriuppgifterna hämtade hos tillverkaren och i
 * de manualer butikerna länkar. Se .agent/research/dorr-och-fonstersensor.md.
 *
 * ## Var måtten kommer ifrån, och varför de är sidans arbete
 *
 * Ingen svensk konkurrent anger måtten på en dörr- och fönstersensor, och
 * ingen butik i svepet har dem i sitt specifikationsblock. De tolv talen nedan
 * kom ur tre olika källslag: Kjells länkade manual-PDF:er för Cleverio och
 * Fibaro, tillverkarens specifikationsflik för Aqara och eufy, och två
 * oberoende men samstämmiga uppgifter för Sonoff och Philips Hue.
 *
 * Det spelar roll därför att produkten sitter på en fönsterkarm, alltså den
 * plats i huset där det finns minst utrymme. Spannet är 35 till 90 millimeter
 * i längd, alltså en faktor 2,6.
 *
 * ## Tre produkter saknar betyg på `batteritid`, och det är avsiktligt
 *
 * Aqara publicerar inget tal för P2 och P100. Det är inte en lucka i vår
 * research utan ett val hos tillverkaren: deras egen sida för P2 skriver
 * "uninterrupted protection with infrequent battery changes" och lägger till
 * att livslängden beror på Thread-routern. Philips Hue publicerar inte heller
 * något tal.
 *
 * ⚠️ Sidan kör **förvalet** `redistributeMissing: true`, alltså fördelas de 20
 * viktpoängen om för de tre. Det lyfter Aqara P100 från 3,55 till 4,44 och för
 * den inom fyra hundradelar från andraplatsen, vilket är samma mekanism som
 * vände `/smart-belysning`. Alternativet `false` sätter noll för något Aqara
 * valt att inte publicera, och det är precis det avdrag `pnpm check:avdrag`
 * finns för att fånga. Kostnaden står utskriven i metodrutan, som sajtens
 * regel säger. Räkna om ordningen om ett batterital senare fastställs.
 *
 * ThirdReality saknar av samma skäl betyg på `montering`: Amazons
 * tumangivelse går inte att entydigt tolka som produktens mått snarare än
 * förpackningens, och ett gissat mått är en påhittad mätning.
 *
 * ## Ring ligger bland övervägda och inte i rankningen
 *
 * ⚠️ Ring säljer Contact Sensor i två generationer med **olika batteri och
 * olika mått**: 1st Gen på ett CR123A, 2nd Gen på två CR2032. Kjell skriver
 * bara "Ring Alarm Contact Sensor" utan generation. Att ranka den hade betytt
 * att sätta två av fem betyg på en gissning om vilken vara som ligger i
 * kartongen. Samma fälla som Nanoleaf Lines mot Essentials på
 * /smart-belysning och Wilfa Xplode på /blender.
 *
 * ## Priser och länkmål
 *
 * ⚠️ Nio av tolv länkar går till Kjell, vilket är fler än vanan att sprida
 * länkarna medger. Skälet är att Kjell är enda butiken med både affiliateprogram
 * och djup: deras kategori Smarta magnetkontakter har 19 artiklar. Inet är
 * billigare på Aqara P2 (259 mot 299) och bär T1 och ThirdReality, men saknar
 * program. Byt när Inet får ett.
 *
 * ⚠️ Tre Kjell-priser är sommarreapriser lästa 2026-08-07: Tapo T110 129 mot
 * ordinarie 199, Aqara P2 299 mot 379 och Cleverio 179,90 mot 209. Sidan
 * länkar Aqara P2 till Inet på 259, som är lägre än båda. Kontrollera vid
 * nästa prisrunda om reorna ligger kvar.
 *
 * ⚠️ Sonoff är beställningsvara hos Proshop med 6 till 7 vardagars leverans.
 * Den rankas ändå, eftersom den säljs och är fältets billigaste sensor med
 * öppen standard, men lagerläget står i nackdelarna.
 */

export const PRICE_CHECKED = "2026-08-07";

const SEEDS: ProductSeed[] = [
  {
    id: "shelly-blu-door-window-zb",
    brand: "Shelly",
    name: "BLU Door/Window ZB",
    shortName: "BLU Door/Window ZB",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "shelly-blu-door-window-zb"),
    tagline:
      "35 millimeter lång och tre år på ett knappcellsbatteri, alltså samma drifttid som sensorer tre gånger så stora.",
    scores: {
      /* Talar både Bluetooth 5.0 och Zigbee 3.0, alltså två öppna standarder i
         samma enhet, och fungerar enligt Kjell med Apple HomeKit, Google Home,
         Home Assistant och Homey. Inte Matter över Thread, därav 4,5. */
      hubbstod: 4.5,
      /* Upp till 3 år på ett CR2032 som medföljer. */
      batteritid: 4,
      /* 239 kr för fältets minsta hölje, längsta drifttid per cell, två öppna
         radior och två extra mätvärden. Billigare än Aqara P2 och eufy. */
      prisvarde: 4.5,
      /* 35 × 35 × 7 mm, minst i fältet med marginal. Magneten 35 × 12 × 7. */
      montering: 5,
      /* Mäter tiltvinkel och ljusnivå i lux vid sidan av öppet och stängt. */
      matvarden: 4.5,
    },
    price: 239,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/shelly-blu-doorwindow-zb-ivory-p52298",
    userRating: { value: 2, count: 1, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för den som har smal karm",
    pros: [
      "35 × 35 × 7 millimeter, alltså det enda höljet här som får plats på en smal fönsterkarm utan att sticka ut",
      "Tre år på ett enda CR2032, samma drifttid som sensorerna med två AAA-celler i ett hölje som är en tredjedel så långt",
      "Talar både Bluetooth 5.0 och Zigbee 3.0, så du väljer hubb i efterhand i stället för att låsas till en",
      "Mäter tiltvinkel och ljusnivå, vilket gör att ett vridfönster i luftningsläge går att skilja från ett stängt",
    ],
    cons: [
      "Kundbetyget hos Kjell är 2,0, men det bygger på ett enda omdöme och säger därför nästan ingenting",
      "Ingen uppgift om sabotageskydd, till skillnad från Cleverio och Fibaro som båda skriver ut det",
      "Svart och brun variant är slut hos Kjell, så färgvalet är i praktiken elfenben",
    ],
    specs: [
      { label: "Pris", value: "239 kr", highlight: true },
      { label: "Kräver hubb", value: "Valfri Zigbee- eller Bluetooth-hubb", highlight: true },
      { label: "Protokoll", value: "Bluetooth 5.0 och Zigbee 3.0", highlight: true },
      { label: "Batterityp", value: "1 × CR2032, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 3 år", highlight: true },
      { label: "Mått sensor", value: "35 × 35 × 7 mm", highlight: true },
      { label: "Mått magnet", value: "35 × 12 × 7 mm" },
      { label: "Mäter mer än öppet/stängt", value: "Tiltvinkel och ljusnivå i lux" },
      { label: "Montering", value: "Dubbelhäftande tejp" },
      { label: "Utomhusklassad", value: "Nej, −20 till 40 °C" },
    ],
    verdict:
      "Shelly BLU Door/Window ZB kostar 239 kronor och är den enda sensorn i jämförelsen som får plats där de andra inte gör det.\n\n35 × 35 × 7 millimeter är ungefär en tredjedel så långt som Sonoffs 90 millimeter och mindre än halva Aqara P2:s 77. På en dörrkarm spelar det ingen roll. På en smal fönsterkarm, som är den plats den här produkten faktiskt är gjord för, är det skillnaden mellan att sensorn syns och att den inte gör det.\n\nDet märkliga är att den inte betalar för storleken. Tre år på ett enda CR2032 är samma drifttid som Sonoff får ur två AAA-celler och ett hölje tre gånger så långt. Den talar dessutom både Bluetooth 5.0 och Zigbee 3.0, så du kan koppla den till Home Assistant i dag och byta till något annat om två år utan att köpa nya sensorer. Ovanpå det ligger tiltvinkel och ljusnivå, vilket låter som en gimmick tills du har ett vridfönster i luftningsläge som en vanlig magnetkontakt kallar stängt.\n\nKöp den här om du ska säkra fönster. Vill du hellre ha rörelse och fallavkänning kostar Aqaras P100 nittio kronor mer och gör det, men den är större. Ska det bara vara billigt och öppet gör Sonoff samma grundjobb för 159.",
  },
  {
    id: "aqara-multi-state-sensor-p100-kit",
    brand: "Aqara",
    name: "Multi-State Sensor P100 Kit",
    shortName: "Multi-State P100 Kit",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "aqara-multi-state-sensor-p100-kit"),
    tagline:
      "Ett enda stycke utan magnet att linjera, och den känner rörelse, tilt och fall utöver öppet och stängt.",
    scores: {
      /* Zigbee och Thread med Matter-stöd, alltså vilken Matter-controller
         eller Zigbee-hubb som helst. */
      hubbstod: 5,
      /* Aqara publicerar inget tal. Utelämnat, inte nollat. Se filhuvudet. */
      /* 329 kr är mer än Shelly och Aqara T1, men kitet bär skyddsfodral och
         extra tejp och ersätter i praktiken två sensorslag. */
      prisvarde: 3.5,
      /* 45 × 31 × 13 mm, alltså mitt i fältet, men enstycksformatet tar bort
         hela linjeringsproblemet. */
      montering: 4,
      /* Accelerometer, gyroskop och magnetometer ger rörelse, tilt, vibration
         och fall. Fältets bredaste med marginal. */
      matvarden: 5,
    },
    price: 329,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/aqara-multi-state-sensor-p100-kit-vit-p54995",
    award: "premium",
    superlative: "Bäst för den som vill mäta allt",
    pros: [
      "Ett enda stycke utan separat magnet, så det finns ingenting att linjera och inget glapp som kan bli för stort",
      "Känner rörelse, tilt, vibration och fall utöver öppet och stängt, med accelerometer, gyroskop och magnetometer",
      "Zigbee och Thread med Matter-stöd, alltså både den öppna gamla och den öppna nya vägen in i ditt hem",
      "Tio känslighetsnivåer och rapportintervall från 5 sekunder till 5 minuter, så den går att ställa in efter fönstret",
    ],
    cons: [
      "Aqara anger ingen batteritid för den, så du vet inte hur ofta CR2450-cellen behöver bytas",
      "329 kronor är nittio mer än Shelly, som är mindre och har en publicerad drifttid",
      "45 × 31 × 13 millimeter är tjockare än de flesta här, och tjocklek är det som märks på en karm",
    ],
    specs: [
      { label: "Pris", value: "329 kr", highlight: true },
      { label: "Kräver hubb", value: "Valfri Matter- eller Zigbee-hubb", highlight: true },
      { label: "Protokoll", value: "Zigbee och Thread med Matter-stöd", highlight: true },
      { label: "Batterityp", value: "1 × CR2450", highlight: true },
      { label: "Mått sensor", value: "45 × 31 × 13 mm", highlight: true },
      { label: "Mäter mer än öppet/stängt", value: "Rörelse, tilt, vibration och fall" },
      { label: "Montering", value: "Tejp, inget magnetpar att linjera" },
      { label: "Utomhusklassad", value: "Nej, inomhus" },
    ],
    verdict:
      "Aqara Multi-State Sensor P100 Kit kostar 329 kronor och löser ett problem alla andra sensorer här har.\n\nEn magnetkontakt består normalt av två delar som ska sitta mitt för varandra med några millimeters glapp. P100 är ett enda stycke. Det finns ingen magnet att rikta in, ingenting som glider ur läge när fönstret sätter sig, och inget avstånd som kan bli för stort. På ett gammalt fönster som inte längre stänger helt rakt är det en verklig skillnad.\n\nDen mäter också mer än något annat i jämförelsen. Accelerometer, gyroskop och magnetometer ger rörelse, tilt, vibration och fall, med tio känslighetsnivåer och ett rapportintervall du sätter mellan fem sekunder och fem minuter. Zigbee och Thread med Matter-stöd betyder att den fungerar oavsett om ditt hem är byggt på den gamla eller den nya öppna standarden.\n\nDen kostar nittio kronor mer än Shelly och är tjockare, 13 millimeter mot 7. Vill du bara veta om fönstret är öppet är det för mycket sensor. Vill du veta att någon rör vid det innan det öppnas är det den enda här som kan svara.",
  },
  {
    id: "aqara-door-window-sensor-t1",
    brand: "Aqara",
    name: "Dörr- och fönstersensor T1",
    shortName: "Sensor T1",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "aqara-door-window-sensor-t1"),
    tagline:
      "199 kronor för 41 millimeter och över två års drift, alltså den billigaste vägen till sex fönster.",
    scores: {
      /* Zigbee 3.0, alltså valfri Zigbee-hubb. Matter först via Aqaras egen
         hubb, vilket är ett steg sämre än P2:s rena Thread. */
      hubbstod: 4,
      /* Över 2 år på ett CR1632 enligt Aqaras egen produkttext, återgiven av
         både Proshop och smarterhome.sk. */
      batteritid: 3.5,
      /* 199 kr hos Inet är näst lägst i fältet, och den är näst minst. */
      prisvarde: 4.5,
      /* 41 × 22 × 11 mm, näst minst efter Shelly. */
      montering: 4.5,
      /* Bara öppet och stängt. */
      matvarden: 2,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Inet",
    merchantUrl: "https://www.inet.se/produkt/8309996/aqara-dorr-och-fonstersensor-t1",
    userRating: { value: 4.7, count: 15, scale: 5, checkedAt: PRICE_CHECKED },
    award: "editor",
    superlative: "Bäst när du ska köpa sex stycken",
    pros: [
      "199 kronor styck, så sex fönster kostar under 1 200 kronor i stället för nästan 2 000 med de dyraste här",
      "41 × 22 × 11 millimeter, näst minst i jämförelsen och tunnare än allt utom Shelly",
      "Över två års drift på ett CR1632, och batteriet är en vanlig knappcell du får tag på i mataffären",
      "Högsta kundbetyget i hela jämförelsen, 4,7 av 5 från femton personer hos Inet",
    ],
    cons: [
      "Rapporterar bara öppet och stängt, alltså inget om tilt, temperatur eller rörelse",
      "Matter-stöd kräver att du köper en Aqara-hubb, så den öppna vägen är inte gratis",
      "Magneten är en separat del som ska linjeras, till skillnad från Aqaras egen P100",
    ],
    specs: [
      { label: "Pris", value: "199 kr", highlight: true },
      { label: "Kräver hubb", value: "Valfri Zigbee-hubb", highlight: true },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Batterityp", value: "1 × CR1632", highlight: true },
      { label: "Batteritid", value: "Över 2 år", highlight: true },
      { label: "Mått sensor", value: "41 × 22 × 11 mm", highlight: true },
      { label: "Montering", value: "Dubbelhäftande fästkudde" },
      { label: "Utomhusklassad", value: "Nej, inomhus" },
    ],
    verdict:
      "Aqara Dörr- och fönstersensor T1 kostar 199 kronor och är sensorn du köper när du ska köpa flera.\n\nDet är sällan en av de här produkterna man behöver. Ett normalt hus har en ytterdörr, en altandörr och fyra till sex fönster värda att bevaka, och då är styckpriset det tal som avgör hela projektet. Sex T1 kostar 1 194 kronor. Sex Yale kostar 2 994.\n\nDen gör i gengäld en enda sak. Öppet eller stängt, rapporterat över Zigbee 3.0 till vilken Zigbee-hubb du än har, med över två års drift på ett CR1632. Ingen tilt, ingen temperatur, ingen rörelse. Höljet är 41 × 22 × 11 millimeter, alltså näst minst i jämförelsen, och femton personer hos Inet har gett den 4,7 av 5, vilket är högsta kundbetyget här.\n\nVill du ha Matter måste du köpa Aqaras egen hubb, och då är P2 den ärligare vägen. Vill du bara veta vilka fönster som står öppna, till lägsta möjliga pris per fönster, är det här svaret.",
  },
  {
    id: "aqara-door-window-sensor-p2",
    brand: "Aqara",
    name: "Sensor P2 Magnetkontakt",
    shortName: "Sensor P2",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "aqara-door-window-sensor-p2"),
    tagline:
      "Matter över Thread utan omväg via en hubb, men huvudenheten är 77 millimeter och äter ett CR123A.",
    scores: {
      /* Thread och Matter direkt, alltså vilken Matter-controller som helst
         utan tillverkarens egen hubb. Fältets högsta öppenhet. */
      hubbstod: 5,
      /* Aqara publicerar inget tal. Utelämnat, inte nollat. Se filhuvudet. */
      /* 259 kr hos Inet för fältets öppnaste standard är rimligt, men CR123A
         är en dyrare cell än CR2032 och finns i färre butiker. */
      prisvarde: 4,
      /* 77 × 22 × 22 mm, fältets största huvudenhet. */
      montering: 2,
      /* Bara öppet och stängt. Sabotagelarm finns men bär ingen vikt. */
      matvarden: 2,
    },
    price: 259,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Inet",
    merchantUrl: "https://www.inet.se/produkt/8309977/aqara-dorr-och-fonstersensor-p2",
    userRating: { value: 3, count: 2, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för ett rent Matter-hem",
    pros: [
      "Matter över Thread direkt i sensorn, så den fungerar med vilken Matter-controller som helst utan Aqaras egen hubb",
      "Sabotagelarm som skickar en notis om någon bryter loss sensorn, vilket bara fem andra här skriver ut",
      "Thread bygger mesh, så varje nätansluten Thread-enhet du redan har förlänger räckvidden",
      "259 kronor hos Inet, alltså fyrtio kronor under Kjells pris för samma sensor",
    ],
    cons: [
      "77 millimeter lång huvudenhet, mer än dubbelt så lång som Shelly och störst i jämförelsen",
      "Drivs av ett CR123A, som kostar mer och finns i färre butiker än en vanlig CR2032",
      "Aqara anger ingen batteritid och skriver att den beror på vilken Thread-router du har",
    ],
    specs: [
      { label: "Pris", value: "259 kr", highlight: true },
      { label: "Kräver hubb", value: "Valfri Matter-controller", highlight: true },
      { label: "Protokoll", value: "Thread och Bluetooth, Matter", highlight: true },
      { label: "Batterityp", value: "1 × CR123A", highlight: true },
      { label: "Mått sensor", value: "77 × 22 × 22 mm", highlight: true },
      { label: "Mått magnet", value: "36 × 11,5 × 7,3 mm" },
      { label: "Sabotageskydd", value: "Ja, notis vid åverkan" },
      { label: "Montering", value: "Tejp eller skruv" },
      { label: "Utomhusklassad", value: "Nej, inomhus" },
    ],
    verdict:
      "Aqara Sensor P2 kostar 259 kronor hos Inet och är den öppnaste sensorn i jämförelsen.\n\nMatter över Thread ligger i själva sensorn, inte i en hubb du måste köpa till. Den fungerar därför med vilken Matter-controller som helst, oavsett om det är en Apple TV, en Google-högtalare, en SmartThings-hubb eller Home Assistant. Thread bygger dessutom mesh, så varje nätansluten Thread-enhet du redan äger gör räckvidden bättre. Det är den tekniskt mest framtidssäkra konstruktionen här.\n\nDen betalar för det i fysisk storlek. Huvudenheten är 77 × 22 × 22 millimeter, alltså fältets längsta och mer än dubbelt så lång som Shellys 35. Cellen är ett CR123A i stället för en vanlig CR2032, vilket kostar mer och finns i färre butiker. Hur länge den räcker säger Aqara inte, med motiveringen att det beror på Thread-routern.\n\nBygger du ett Matter-hem från grunden och har karmar med plats är det här rätt val. Har du smala fönsterbågar tar Shelly samma jobb i en tredjedel av utrymmet, och kostar tjugo kronor mindre.",
  },
  {
    id: "sonoff-snzb-04pr2",
    brand: "Sonoff",
    name: "SNZB-04PR2",
    shortName: "SNZB-04PR2",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "sonoff-snzb-04pr2"),
    tagline:
      "159 kronor, tre års drift och Zigbee 3.0 till valfri hubb, men höljet är 90 millimeter långt.",
    scores: {
      /* Zigbee 3.0 till valfri hubb, plus Apple Home via Matter-brygga. */
      hubbstod: 4,
      /* Upp till 3 år på två AAA. */
      batteritid: 4,
      /* Billigast i fältet med öppen standard. */
      prisvarde: 5,
      /* 90 × 26 × 13,5 mm, längst i hela jämförelsen. */
      montering: 1.5,
      /* Bara öppet och stängt. Sabotageavkänning bär ingen vikt. */
      matvarden: 2,
    },
    price: 159,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Sonoff-SONOFF-SNZB-04PR2-oeppningssensor-foer-foenster-och-doerr/3491835",
    award: "budget",
    superlative: "Billigast med öppen standard",
    pros: [
      "159 kronor är lägsta priset i jämförelsen för en sensor som inte låser dig till ett märkes hubb",
      "Upp till tre års drift på två AAA-batterier, alltså celler du redan har hemma",
      "Sabotageavkänning som varnar vid åverkan, vilket bara fem andra sensorer här skriver ut",
      "Fungerar med eWeLink, Home Assistant, MQTT, iHost och Alexa, och med Apple Home via Matter-brygga",
    ],
    cons: [
      "90 millimeter lång, alltså den överlägset längsta här och nästan tre gånger Shellys 35",
      "Beställningsvara hos Proshop med sex till sju vardagars leverans, inte i lager",
      "Rapporterar bara öppet och stängt, utan tilt, temperatur eller rörelse",
    ],
    specs: [
      { label: "Pris", value: "159 kr", highlight: true },
      { label: "Kräver hubb", value: "Valfri Zigbee-hubb", highlight: true },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Batterityp", value: "2 × AAA", highlight: true },
      { label: "Batteritid", value: "Upp till 3 år", highlight: true },
      { label: "Mått sensor", value: "90 × 26 × 13,5 mm", highlight: true },
      { label: "Sabotageskydd", value: "Ja, varning vid åverkan" },
      { label: "Montering", value: "Tejp, avtagbar magnet" },
      { label: "Utomhusklassad", value: "Nej, inomhus" },
      { label: "GTIN", value: "6979033600140" },
    ],
    verdict:
      "Sonoff SNZB-04PR2 kostar 159 kronor och är det billigaste sättet att komma in i ett öppet system.\n\nZigbee 3.0 betyder att den fungerar med vilken Zigbee-hubb du än har, och Sonoff räknar själva upp eWeLink, Home Assistant, MQTT, iHost, Alexa och Apple Home via Matter-brygga. Den har dessutom sabotageavkänning, vilket bara fem andra sensorer i jämförelsen har, och tre års drift på två AAA-batterier du sannolikt redan har i en låda.\n\nPriset syns i formatet. 90 × 26 × 13,5 millimeter gör den till den längsta sensorn här, nästan tre gånger Shellys 35 millimeter, och det är AAA-cellerna som kräver utrymmet. På en dörrkarm märks det inte. På en fönsterbåge är 90 millimeter mycket, och det är där den här produkten oftast ska sitta.\n\nKöp den till dörrar, källarluckor och garderober där måttet inte spelar roll och priset gör det. Ska den upp på ett fönster i ett rum du tittar på varje dag är Aqara T1 fyrtio kronor dyrare och hälften så lång. Räkna också med leveranstiden: den är beställningsvara.",
  },
  {
    id: "thirdreality-door-window-sensor",
    brand: "ThirdReality",
    name: "Dörr- och fönstersensor",
    shortName: "Dörr-/fönstersensor",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "thirdreality-door-window-sensor"),
    tagline:
      "Byggd för Home Assistant och Hubitat, med två års drift på AAA och stöd för både ZHA och Zigbee2MQTT.",
    scores: {
      /* Zigbee 3.0 till valfri hubb, uttryckligen ZHA och Z2M. */
      hubbstod: 4,
      /* Upp till 2 år på två AAA. */
      batteritid: 3,
      /* 229 kr är mer än Aqara T1 för mindre sensor. */
      prisvarde: 3.5,
      /* Utelämnat: måttet går inte att fastställa. Se filhuvudet. */
      /* Bara öppet och stängt. */
      matvarden: 2,
    },
    price: 229,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Inet",
    merchantUrl: "https://www.inet.se/produkt/8310162/thirdreality-dorr-fonstersensor",
    superlative: "Bäst för Home Assistant",
    pros: [
      "Uttryckligen testad mot ZHA och Zigbee2MQTT, alltså de två vägar en Home Assistant-användare faktiskt går",
      "Fungerar med SmartThings, Aeotec, Homey och Hubitat vid sidan av Home Assistant",
      "Två års drift på två AAA-batterier, som är billigare per byte än knappceller",
      "ThirdReality säljer en egen Matter-brygga för 369 kronor om du vill ta hela sortimentet vidare",
    ],
    cons: [
      "229 kronor är trettio mer än Aqara T1, som är mindre och håller längre på ett batteri",
      "Varken tillverkaren eller butiken publicerar sensorns mått, så du vet inte om den får plats",
      "Rapporterar bara öppet och stängt",
    ],
    specs: [
      { label: "Pris", value: "229 kr", highlight: true },
      { label: "Kräver hubb", value: "Valfri Zigbee-hubb", highlight: true },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Batterityp", value: "2 × AAA", highlight: true },
      { label: "Batteritid", value: "Upp till 2 år", highlight: true },
      { label: "Montering", value: "Tejp" },
      { label: "Utomhusklassad", value: "Nej, inomhus" },
    ],
    verdict:
      "ThirdReality Dörr- och fönstersensor kostar 229 kronor och är gjord för den som bygger sitt hem själv.\n\nDe flesta tillverkare skriver att sensorn fungerar med Google Home och Alexa. ThirdReality skriver i stället att den fungerar med ZHA och Zigbee2MQTT, alltså de två integrationer en Home Assistant-användare faktiskt väljer mellan. Vid sidan av det ligger SmartThings, Aeotec, Homey och Hubitat. Det är ett annat sätt att beskriva en produkt, och det säger något om vem den är byggd för.\n\nTekniskt är den ordinär. Zigbee 3.0, två AAA-batterier, upp till två års drift, öppet eller stängt och ingenting mer. Vill du ta hela deras sortiment vidare till Matter säljer de en egen brygga för 369 kronor.\n\nProblemet är priset i förhållande till Aqara T1, som kostar trettio kronor mindre, är känd till måtten, håller längre på ett batteri och gör exakt samma sak. Välj ThirdReality om du vill ha en tillverkare som pratar ditt språk, inte för att sensorn är bättre.",
  },
  {
    id: "fibaro-door-window-sensor-2",
    brand: "Fibaro",
    name: "Door/Window Sensor 2 FGDW-002",
    shortName: "Door/Window Sensor 2",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "fibaro-door-window-sensor-2"),
    tagline:
      "Enda Z-Wave-sensorn här, med inbyggd temperaturmätning och en sabotageknapp som larmar när höljet öppnas.",
    scores: {
      /* Z-Wave Plus, alltså valfri Z-Wave-hubb. Öppen standard men ett
         mindre ekosystem än Zigbee. */
      hubbstod: 4,
      /* Upp till 2 år på ett 1/2AA 3,6 V som medföljer. */
      batteritid: 3,
      /* 449 kr är dyrt för en sensor som mäter en extra sak. */
      prisvarde: 2.5,
      /* 71 × 18 × 18 mm. Lång men mycket smal. */
      montering: 3,
      /* Inbyggd temperatursensor. */
      matvarden: 3.5,
    },
    price: 449,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/fibaro-z-wave-magnetkontakt-vit-p50594",
    userRating: { value: 4.5, count: 5, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som kör Z-Wave",
    pros: [
      "Enda Z-Wave-sensorn i jämförelsen, alltså den enda vägen in för den som byggt sitt hem på Z-Wave",
      "Sabotageknapp som larmar både när enheten lossas och när höljet öppnas",
      "Inbyggd temperaturmätning, så samma sensor säger både att fönstret står öppet och hur kallt det blivit",
      "Bara 18 millimeter bred och djup, alltså smalast i jämförelsen tvärs över karmen",
    ],
    cons: [
      "449 kronor är nästan dubbelt mot Shelly, som mäter två saker extra i stället för en",
      "Kräver att magneten sitter högst 5 millimeter från sensorn, vilket är hårdare än Cleverios 10",
      "Z-Wave har färre hubbar och färre produkter att bygga vidare med än Zigbee och Thread",
    ],
    specs: [
      { label: "Pris", value: "449 kr", highlight: true },
      { label: "Kräver hubb", value: "Valfri Z-Wave-hubb", highlight: true },
      { label: "Protokoll", value: "Z-Wave Plus", highlight: true },
      { label: "Batterityp", value: "1 × 1/2AA 3,6 V, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 2 år", highlight: true },
      { label: "Mått sensor", value: "71 × 18 × 18 mm", highlight: true },
      { label: "Sabotageskydd", value: "Ja, TMP-knapp vid åverkan" },
      { label: "Mäter mer än öppet/stängt", value: "Temperatur" },
      { label: "Max glapp", value: "5 mm" },
      { label: "Räckvidd", value: "50 m ute, 40 m inne" },
      { label: "Montering", value: "Tejp eller skruv" },
    ],
    verdict:
      "Fibaro Door/Window Sensor 2 kostar 449 kronor och är den enda Z-Wave-sensorn i jämförelsen.\n\nDet avgör frågan för en bestämd grupp läsare. Har du byggt ditt hem på Z-Wave, med en Fibaro-, Homey- eller Home Assistant-installation som talar den radion, är det här den enda produkten här du kan använda. De andra elva talar Zigbee, Thread eller en egen radio.\n\nDen är byggd som något man installerar och glömmer. Sabotageknappen larmar både när enheten bryts loss och när höljet öppnas, en inbyggd temperatursensor följer med, och 18 millimeters bredd gör den till den smalaste sensorn här tvärs över karmen, även om den är 71 millimeter lång. Räckvidden anges till 50 meter utomhus och 40 inomhus.\n\nPriset är svårt att försvara på annat sätt än protokollet. Shelly kostar 239, mäter två saker extra i stället för en, är mindre och håller ett år längre på batteriet. Kör du Zigbee eller Matter finns ingen anledning att titta hit. Kör du Z-Wave finns ingen anledning att titta någon annanstans.",
  },
  {
    id: "cleverio-smart-magnetsensor",
    brand: "Cleverio",
    name: "Smart Magnetsensor Zigbee 3.0",
    shortName: "Smart Magnetsensor",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "cleverio-smart-magnetsensor"),
    tagline:
      "179 kronor med sabotageskydd och tio millimeters tillåtet glapp, men bara ungefär ett års drift.",
    scores: {
      /* Zigbee 3.0 till valfri hubb, uttryckligen Athom Homey. */
      hubbstod: 4,
      /* Ca 1 år på två CR1632. Kortast i hela fältet. */
      batteritid: 1.5,
      /* 179,90 kr, men ett års drift betyder fyra batteribyten där andra
         klarar sig på ett. */
      prisvarde: 3.5,
      /* 54 × 22 × 12 mm, alltså mitten av fältet, och tio millimeters glapp
         tillåtet vilket är dubbelt mot Fibaro. */
      montering: 4,
      /* Bara öppet och stängt. */
      matvarden: 2,
    },
    price: 179.9,
    oldPrice: 209,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/cleverio-smart-magnetsensor-med-zigbee-3.0-p51826",
    userRating: { value: 4.5, count: 35, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Billigast att hämta i butik",
    pros: [
      "Tål tio millimeters glapp mellan sensor och magnet, dubbelt mot Fibaro, vilket förlåter ett fönster som satt sig",
      "Sabotageskydd som uppmärksammar dig om någon försöker plocka bort enheten",
      "Zigbee 3.0 till valfri hubb, och tillverkaren anger uttryckligen Athom Homey",
      "Finns i 52 av Kjells butiker, så du kan hämta den i dag i stället för att vänta på frakt",
    ],
    cons: [
      "Ungefär ett års standbytid, alltså kortast i jämförelsen och fyra batteribyten där Yale klarar ett",
      "Två CR1632-celler, och flera köpare skriver hos Kjell att den är svår att öppna för batteribyte",
      "Manualen avråder från montering på dörrar och fönster med metallkarm",
    ],
    specs: [
      { label: "Pris", value: "179,90 kr", highlight: true },
      { label: "Kräver hubb", value: "Valfri Zigbee-hubb", highlight: true },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Batterityp", value: "2 × CR1632", highlight: true },
      { label: "Batteritid", value: "Cirka 1 år", highlight: true },
      { label: "Mått sensor", value: "54 × 22 × 12 mm", highlight: true },
      { label: "Mått magnet", value: "33 × 10 × 12 mm" },
      { label: "Sabotageskydd", value: "Ja, vid borttagning" },
      { label: "Max glapp", value: "10 mm" },
      { label: "Vikt", value: "23 g" },
      { label: "Utomhusklassad", value: "Nej, −10 till 55 °C" },
    ],
    verdict:
      "Cleverio Smart Magnetsensor kostar 179,90 kronor och är Kjells egen, vilket är hela poängen med den.\n\nDen finns i 52 butiker. Behöver du en sensor i dag, eller upptäcker du mitt i installationen att du behöver en till, är det den enda i den här jämförelsen du kan gå och hämta. Zigbee 3.0 gör att den fungerar med vilken Zigbee-hubb du än har, och sabotageskyddet varnar om någon plockar bort den.\n\nDen tål också mer slarv än de flesta. Tio millimeters glapp mellan sensor och magnet är dubbelt mot Fibaros fem, och på ett äldre fönster som inte längre stänger helt tätt är det skillnaden mellan en sensor som fungerar och en som larmar falskt.\n\nBatteriet är problemet. Cirka ett års standbytid är kortast i jämförelsen, och Yale går fyra. Sitter sex av dem i huset är det sex batteribyten om året i stället för ett vartannat. Flera köpare skriver dessutom hos Kjell att den är besvärlig att få upp. Köp den när du behöver en snabbt, inte när du utrustar hela huset.",
  },
  {
    id: "yale-magnetkontakt-inomhus",
    brand: "Yale",
    name: "Magnetkontakt för inomhusbruk",
    shortName: "Magnetkontakt inomhus",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "yale-magnetkontakt-inomhus"),
    tagline:
      "Fyra års drift och en kilometers räckvidd, men den talar bara med Yales egen hubb.",
    scores: {
      /* Horizon+ på 868 MHz, tillbehör till Yale Smart Hub. Låst. */
      hubbstod: 2,
      /* Upp till 4 år på ett CR2450. Längst i fältet. */
      batteritid: 5,
      /* 499 kr och låst till ett system gör den dyr per fönster. */
      prisvarde: 2,
      /* 68,5 × 29 × 9,52 mm. Lång och bred men mycket tunn. */
      montering: 3,
      /* Bara öppet och stängt. Sabotageskydd bär ingen vikt. */
      matvarden: 2,
    },
    price: 499,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/yale-magnetkontakt-for-inomhusbruk-p67914",
    userRating: { value: 3, count: 6, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Längst mellan batteribytena",
    pros: [
      "Upp till fyra års drift på ett CR2450, alltså dubbelt mot fältets mitt och fyra gånger Cleverios",
      "Räckvidd upp till en kilometer, vilket täcker garaget, förrådet och friggeboden från samma hubb",
      "Sabotageskydd med direktnotis om någon försöker bryta loss enheten",
      "9,5 millimeter tjock, alltså den näst tunnaste här och den som sticker ut minst från karmen",
    ],
    cons: [
      "Fungerar bara med Yale Smart Hub, så du kan inte använda den i ett Zigbee-, Thread- eller Z-Wave-hem",
      "499 kronor styck gör sex fönster till nästan 3 000 kronor, mot 1 194 med Aqara T1",
      "68,5 millimeter lång och 29 bred, alltså större yta på karmen än Shelly och Aqara T1",
    ],
    specs: [
      { label: "Pris", value: "499 kr", highlight: true },
      { label: "Kräver hubb", value: "Yale Smart Hub", highlight: true },
      { label: "Protokoll", value: "Horizon+ RF 868 MHz", highlight: true },
      { label: "Batterityp", value: "1 × CR2450", highlight: true },
      { label: "Batteritid", value: "Upp till 4 år", highlight: true },
      { label: "Mått sensor", value: "68,5 × 29 × 9,52 mm", highlight: true },
      { label: "Sabotageskydd", value: "Ja, direktnotis vid åverkan" },
      { label: "Räckvidd", value: "Upp till 1 000 m" },
      { label: "Montering", value: "Skruv och tejp, medföljer" },
      { label: "Vikt", value: "35 g" },
    ],
    verdict:
      "Yale Magnetkontakt för inomhusbruk kostar 499 kronor och har den bästa hårdvaran i jämförelsen.\n\nFyra års drift är längst här, dubbelt mot fältets mitt och fyra gånger Cleverios. En kilometers räckvidd betyder att samma hubb når garaget, förrådet och friggeboden. Sabotageskyddet skickar en direktnotis, och 9,5 millimeters tjocklek gör den till den sensor som sticker ut näst minst från karmen.\n\nOch den sitter i det mest slutna systemet på sidan. Radion heter Horizon+ och går på 868 megahertz, och den talar bara med Yale Smart Hub. Har du en DIRIGERA, en Home Assistant, en SmartThings eller en Hue Bridge kan du inte använda den alls, oavsett hur bra batteriet är.\n\n499 kronor styck är dessutom mycket när sex fönster ska utrustas. Aqara T1 gör grundjobbet för 199 och håller över två år. Har du redan ett Yale-larm är det här den självklara utbyggnaden och du ska inte tveka. Har du inte det köper du en hubb, ett ekosystem och en produktfamilj, inte en sensor för 499 kronor.",
  },
  {
    id: "tp-link-tapo-t110",
    brand: "TP-Link",
    name: "Tapo T110 Magnetsensor",
    shortName: "Tapo T110",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "tp-link-tapo-t110"),
    tagline:
      "129 kronor är lägsta priset på sidan, men den fungerar bara med en Tapo-hubb som kostar mer än sensorn.",
    scores: {
      /* Egen radio på 868/922 MHz. Kräver Tapo H100 eller H200. */
      hubbstod: 2,
      /* Över 1 år på ett CR2032. */
      batteritid: 2,
      /* 129 kr är lägst i fältet, men hubben tillkommer. */
      prisvarde: 4,
      /* 61 × 37 × 12 mm. Bred, 37 mm tvärs över karmen. */
      montering: 3.5,
      /* Bara öppet och stängt. */
      matvarden: 2,
    },
    price: 129,
    oldPrice: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/tp-link-tapo-t110-magnetsensor-p65257",
    userRating: { value: 4.5, count: 45, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst om du redan har Tapo",
    pros: [
      "129 kronor är lägsta styckpriset i hela jämförelsen, och 45 personer hos Kjell har gett den 4,5 av 5",
      "Batteri och 3M-tejp medföljer, så det finns ingenting att köpa till för att komma igång",
      "Talar 868 och 922 megahertz på egen radio, alltså inte samma band som ett trögt wifi",
      "Bygger vidare på Tapos kameror och plugg, så allt hamnar i samma app",
    ],
    cons: [
      "Kräver Tapo H100 eller H200, och hubben kostar mer än sensorn själv",
      "Drygt ett års batteritid, alltså kortast här efter Cleverio",
      "37 millimeter bred, vilket är bredast i jämförelsen tvärs över karmen",
    ],
    specs: [
      { label: "Pris", value: "129 kr", highlight: true },
      { label: "Kräver hubb", value: "Tapo H100 eller H200", highlight: true },
      { label: "Protokoll", value: "Egen radio, 868 och 922 MHz", highlight: true },
      { label: "Batterityp", value: "1 × CR2032, medföljer", highlight: true },
      { label: "Batteritid", value: "Över 1 år", highlight: true },
      { label: "Mått sensor", value: "61 × 37 × 12 mm", highlight: true },
      { label: "Montering", value: "Dubbelhäftande 3M-tejp, medföljer" },
      { label: "Utomhusklassad", value: "Nej, inomhus" },
    ],
    verdict:
      "TP-Link Tapo T110 kostar 129 kronor och är den billigaste sensorn på sidan, med en asterisk.\n\nAsterisken är hubben. T110 talar en egen radio på 868 och 922 megahertz och fungerar bara med Tapo H100 eller H200. Har du ingen av dem är 129 kronor inte priset, för hubben kostar mer än sensorn. Har du redan en Tapo-kamera och en Tapo-hubb i huset är det tvärtom det billigaste sättet att lägga till ett fönster som finns.\n\nDen är omtyckt. 45 personer hos Kjell ger den 4,5 av 5, vilket är det bredaste kundunderlaget i jämförelsen. Batteri och 3M-tejp ligger i kartongen, och egen radio i stället för wifi betyder att den fungerar även när nätet är trögt.\n\nTvå saker drar ner. Drygt ett års batteritid är näst kortast här, och 37 millimeters bredd är bredast tvärs över karmen, vilket märks på en smal fönsterbåge. Och priset på 129 kronor är Kjells sommarrea; ordinarie är 199. Räkna med det talet om du planerar för hela huset.",
  },
  {
    id: "eufy-security-entry-sensor",
    brand: "eufy",
    name: "Security Dörr- och fönstersensor",
    shortName: "Security Entry Sensor",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "eufy-security-entry-sensor"),
    tagline:
      "Två års drift och 38 kundomdömen, men den kräver en eufy HomeBase och gör ingenting utan den.",
    scores: {
      /* Kräver eufy HomeBase eller HomeBase E. Låst. */
      hubbstod: 2,
      /* 2 år på ett CR123A som medföljer, enligt eufys egen servicesida. */
      batteritid: 3,
      /* 279 kr plus en HomeBase. */
      prisvarde: 2.5,
      /* 73 × 28 × 22 mm. Både lång och tjock. */
      montering: 2.5,
      /* Bara öppet och stängt. */
      matvarden: 2,
    },
    price: 279,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/eufy-security-dorr-och-fonstersensor-p51929",
    userRating: { value: 4.5, count: 38, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som har eufy-larm",
    pros: [
      "Utlöser den inbyggda sirenen i HomeBase, alltså ett hörbart larm och inte bara en notis i telefonen",
      "Två års drift på ett CR123A som medföljer, uppgivet av eufy själva",
      "38 kundomdömen med 4,5 av 5 hos Kjell, alltså näst bredaste underlaget i jämförelsen",
      "Skruvar, magnet och monteringstejp ligger i kartongen",
    ],
    cons: [
      "Kräver eufy HomeBase eller HomeBase E, och utan den gör sensorn ingenting alls",
      "73 millimeter lång och 22 tjock, alltså bland de klumpigaste här",
      "279 kronor för en sensor som bara rapporterar öppet och stängt inom ett slutet system",
    ],
    specs: [
      { label: "Pris", value: "279 kr", highlight: true },
      { label: "Kräver hubb", value: "eufy HomeBase eller HomeBase E", highlight: true },
      { label: "Protokoll", value: "Egen radio", highlight: true },
      { label: "Batterityp", value: "1 × CR123A, medföljer", highlight: true },
      { label: "Batteritid", value: "2 år", highlight: true },
      { label: "Mått sensor", value: "73 × 28 × 22 mm", highlight: true },
      { label: "Montering", value: "Tejp eller skruv, medföljer" },
      { label: "Vikt", value: "23 g" },
      { label: "Utomhusklassad", value: "Nej, inomhus" },
    ],
    verdict:
      "eufy Security Dörr- och fönstersensor kostar 279 kronor och är en larmdel, inte en smart hem-sensor.\n\nSkillnaden är viktig. De öppna sensorerna på den här sidan skickar en notis till en app och kan sedan tända en lampa eller starta en scen. eufys utlöser den inbyggda sirenen i HomeBase, alltså ett ljud i huset. Vill du att ett öppnat fönster ska höras och inte bara synas är det en verklig funktionsskillnad.\n\nPriset för det är att den är helt beroende av eufys egen basstation. Utan en HomeBase eller HomeBase E gör sensorn ingenting, och den går inte att koppla till en Zigbee-hubb, en Matter-controller eller Home Assistant. Två års drift på ett medföljande CR123A är godkänt men inte mer, och 73 × 28 × 22 millimeter gör den till en av de klumpigaste här.\n\n38 personer hos Kjell ger den 4,5 av 5, så de som köpt den är nöjda, och det är nästan alltid människor som redan har eufys larm. Är du en av dem är det rätt köp. Är du det inte köper du ett helt system.",
  },
  {
    id: "philips-hue-secure-kontaktsensor",
    brand: "Philips Hue",
    name: "Secure kontaktsensor",
    shortName: "Secure kontaktsensor",
    image: productImage(DORR_OCH_FONSTERSENSOR.slug, "philips-hue-secure-kontaktsensor"),
    tagline:
      "449 kronor för att en lampa ska tändas när dörren öppnas, och den fungerar bara med en Hue Bridge.",
    scores: {
      /* Kräver Philips Hue Bridge. Zigbee men Hue-dialekt. Låst. */
      hubbstod: 2,
      /* Philips publicerar inget tal. Utelämnat, inte nollat. */
      /* 449 kr är näst dyrast i fältet för minst funktion. */
      prisvarde: 2,
      /* 70 × 22 × 20 mm. */
      montering: 2.5,
      /* Bara öppet och stängt. */
      matvarden: 2,
    },
    price: 449,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/philips-hue-secure-kontaktsensor-vit-1-pack-p66107",
    userRating: { value: 5, count: 4, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som bara har Hue",
    pros: [
      "Sitter i samma app och samma automationer som belysningen, så en öppnad dörr kan tända hallen direkt",
      "Ingår i Hue Secure, alltså samma system som deras kameror och larmfunktioner",
      "Finns i vitt och svart, och i tvåpack för 799 kronor vilket sänker styckpriset till 400",
      "70 × 22 × 20 millimeter, alltså smalare tvärs över karmen än Tapo och eufy",
    ],
    cons: [
      "449 kronor för en sensor som bara rapporterar öppet och stängt är näst dyrast i jämförelsen",
      "Kräver Philips Hue Bridge, så den fungerar inte i ett Zigbee-hem som inte är Hue",
      "Philips publicerar ingen batteritid, så du vet inte hur ofta cellen behöver bytas",
    ],
    specs: [
      { label: "Pris", value: "449 kr", highlight: true },
      { label: "Kräver hubb", value: "Philips Hue Bridge", highlight: true },
      { label: "Protokoll", value: "Zigbee, Hue-dialekt", highlight: true },
      { label: "Mått sensor", value: "70 × 22 × 20 mm", highlight: true },
      { label: "Montering", value: "Tejp eller skruv" },
      { label: "Utomhusklassad", value: "Nej, inomhus" },
    ],
    verdict:
      "Philips Hue Secure kontaktsensor kostar 449 kronor och säljer en enda sak: att allt ligger på samma ställe.\n\nHar du redan Hue i huset är det ett verkligt argument. Sensorn dyker upp i samma app som lamporna, i samma rum och i samma automationer, och en öppnad ytterdörr kan tända hallen utan att du limmar ihop två system som inte känner varandra. Den ingår dessutom i Hue Secure vid sidan av deras kameror.\n\nAllt annat talar emot den. 449 kronor är näst dyrast i jämförelsen, och för det får du en sensor som bara rapporterar öppet och stängt, utan tilt, temperatur eller rörelse. Den kräver en Hue Bridge, alltså fungerar den inte i ett Zigbee-hem som inte är Hue. Philips anger ingen batteritid någonstans.\n\nTvåpacket för 799 kronor sänker styckpriset till 400 och är den enda formen där den är värd att överväga. Vill du bara veta om fönstret är öppet, och kan tänka dig en app till, gör Aqara T1 samma sak för 199.",
  },
];

export const DORR_OCH_FONSTERSENSOR_PRODUCTS = resolveProducts(
  DORR_OCH_FONSTERSENSOR,
  SEEDS,
);

/**
 * Produkter vi tittade på och lämnade utanför rankningen.
 *
 * Två av dem föll på att vi inte kunde fastställa vad som faktiskt ligger i
 * kartongen, inte på att de är dåliga. Det är en viktigare skillnad än den
 * låter: en produkt vi inte kan beskriva säkert ska inte rankas, och skälet
 * ska stå utskrivet.
 */
export const DORR_OCH_FONSTERSENSOR_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "IKEA",
    name: "PARASOLL dörr-/fönstersensor",
    reason:
      "129 kronor och 40 × 88 × 18 millimeter, men IKEA:s egen produktsida är märkt Utgår inom kort och produkten ligger på deras sida Last chance to buy. Vi rankar inte något som håller på att försvinna ur sortimentet. Värt att veta om du ändå fyndar en: batteri ingår inte, och den kräver DIRIGERA eftersom den inte går att ansluta till den äldre TRÅDFRI-gatewayen.",
    approxPrice: 129,
    merchant: "IKEA",
    merchantUrl:
      "https://www.ikea.com/se/sv/p/parasoll-doerr-foenstersensor-smart-vit-80504308/",
  },
  {
    brand: "Ring",
    name: "Alarm Contact Sensor",
    reason:
      "Ring säljer sensorn i två generationer med olika batteri och olika mått: första generationen på ett CR123A, andra på två CR2032. Kjell anger ingen generation i sin artikel, så två av fem betyg hade blivit gissningar om vilken vara som ligger i kartongen. Den kräver dessutom en Ring Alarm-basstation. Fastställ generationen så rankar vi den.",
    approxPrice: 299,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-magnetkontakter/ring-alarm-contact-sensor-p51859",
  },
  {
    brand: "Yale",
    name: "Magnetkontakt för utomhusbruk",
    reason:
      "Fältets enda utomhusprodukt, IP55-klassad med upp till tre års drift på ett CR123A och en kilometers räckvidd. Den ligger utanför rankningen eftersom 94 × 63,5 × 35 millimeter och 749 kronor svarar mot ett annat behov än en sensor på en fönsterkarm: grindar, garageportar och förrådsdörrar. Kräver Yale Smart Hub.",
    approxPrice: 749,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-larm/yale-magnetkontakt-for-utomhusbruk-p67919",
  },
  {
    brand: "Ubiquiti",
    name: "SuperLink Entry sensor",
    reason:
      "799 kronor för ett trepack, alltså 266 per sensor, men den förutsätter Ubiquitis eget ekosystem och säljs inte styckvis. Den som redan kör UniFi Protect ska titta på den; för alla andra är inträdesbiljetten hela poängen med att inte köpa den.",
    approxPrice: 799,
    merchant: "Inet",
    merchantUrl: "https://www.inet.se/kategori/1434/dorr-fonster",
  },
  {
    brand: "Deltaco",
    name: "Smart Home SH-WS02",
    reason:
      "Clas Ohlson anger standbytiden till ungefär fem månader, vilket är kortast i hela svepet och mindre än hälften av Cleverio, som redan ligger sist bland de rankade. Den laddas visserligen med USB i stället för att byta batteri, men fem månader betyder att du kopplar ner sensorn två gånger om året.",
    approxPrice: 249,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Deltaco-Smart-Home-SH-WS02-sensor-fonster-och-dorr/p/39-2310",
  },
  {
    brand: "Nexsmart",
    name: "Dörr-/fönstersensor",
    reason:
      "Fungerar bara med Nexsmarts egen GUARDIAN 2, alltså ett slutet system med en enda sensormodell. Den går inte att jämföra med en produkt du kan flytta mellan hubbar, och den som köper den köper i praktiken hela larmpaketet.",
    approxPrice: 249,
  },
  {
    brand: "Gigaset",
    name: "elements fönstersensor",
    reason:
      "Kräver en Gigaset elements-basstation, och sortimentet säljs numera tunt i svensk handel. Clas Ohlson har den kvar, men att bygga ett hem på en plattform som krymper är en risk vi inte lägger på läsaren.",
    approxPrice: 449,
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Fonstersensor-Gigaset-elements/p/36-4906",
  },
];

/**
 * Mirrors the buying guide: every question the guide answers has an entry
 * here, phrased the way people search rather than the way we write headings.
 */
export const DORR_OCH_FONSTERSENSOR_FAQ = [
  {
    question: "Vad är skillnaden mellan en fönstersensor och ett fönsterlarm?",
    answer:
      "En dörr- och fönstersensor är en magnetkontakt som rapporterar öppet eller stängt till en app eller en hubb. Den låter ingenting själv; ljudet kommer i så fall från en siren eller en basstation någon annanstans i huset. Ett fönsterlarm är tvärtom en fristående dosa med inbyggd siren på 100 till 130 decibel som tjuter direkt på fönstret och varken behöver app, hubb eller wifi. Sensorn kostar 129 till 499 kronor och passar den som vill bygga vidare, automatisera och se historik. Fönsterlarmet kostar under hundralappen och passar husvagnen, sommarstugan och hotellrummet. De säljs i samma butiker och förväxlas ständigt, men de löser olika problem.",
  },
  {
    question: "Behöver jag en hubb till en dörr- och fönstersensor?",
    answer:
      "Nästan alltid, och det är den viktigaste frågan innan du köper. Av de tolv sensorer vi jämför fungerar åtta med vilken hubb som helst som talar deras öppna standard, alltså Zigbee, Thread eller Z-Wave. Fyra fungerar bara med ett enda märkes basstation: Tapo T110 kräver Tapo H100 eller H200, eufy kräver HomeBase, Philips Hue Secure kräver Hue Bridge och Yale kräver Yale Smart Hub. Det betyder att den billigaste sensorn i vår jämförelse, på 129 kronor, förutsätter en hubb som kostar mer än sensorn själv. Har du redan en hubb ska du köpa en sensor som talar med den. Har du ingen är det hubben, inte sensorn, som är ditt egentliga köpbeslut.",
  },
  {
    question: "Vad är skillnaden mellan Zigbee, Thread, Z-Wave och Matter?",
    answer:
      "Zigbee, Thread och Z-Wave är radiotekniker med låg strömförbrukning som bygger mesh, alltså där enheterna hjälper varandra att nå fram. Matter är inget av det utan ett gemensamt språk som körs ovanpå Thread eller wifi, och som gör att certifierade produkter fungerar med vilken certifierad styrenhet som helst oavsett märke. I praktiken betyder det tre saker för dig. En Zigbee-sensor behöver en hubb som talar Zigbee. En Z-Wave-sensor behöver en Z-Wave-hubb, och det ekosystemet är mindre. En Matter-sensor över Thread, som Aqaras P2, fungerar med Apple, Google, Amazon, SmartThings och Home Assistant utan att du köper tillverkarens egen hubb.",
  },
  {
    question: "Hur länge håller batteriet i en fönstersensor?",
    answer:
      "Mellan ungefär ett och fyra år bland de sensorer vi jämför, och skillnaden är större än priset antyder. Yale anger upp till fyra år på ett CR2450 och Cleverio ungefär ett år på två CR1632, alltså fyra batteribyten mot ett över samma period. Shelly och Sonoff ligger båda på upp till tre år. Räkna med att du sällan har en enda sensor: sitter det sex i huset blir ett års drifttid sex batteribyten om året. Två tillverkare, Aqara och Philips, publicerar ingen siffra alls för vissa modeller. Aqara motiverar det med att drifttiden beror på vilken Thread-router du har, vilket är sant men inte till någon hjälp när du ska välja.",
  },
  {
    question: "Hur stor är en dörr- och fönstersensor?",
    answer:
      "Mellan 35 och 90 millimeter lång bland dem vi jämför, alltså en faktor 2,6, och det är den uppgift som är svårast att hitta och lättast att ångra. Shelly BLU mäter 35 × 35 × 7 millimeter, Aqara T1 41 × 22 × 11, Fibaro 71 × 18 × 18 och Sonoff 90 × 26 × 13,5. På en dörrkarm spelar det sällan roll. På en smal fönsterbåge, som är där produkten oftast ska sitta, avgör det om sensorn får plats utan att sticka ut i vägen för hakar och handtag. Mät karmen innan du beställer. Ingen svensk jämförelsesajt anger måtten, och butikernas specifikationsblock saknar dem nästan alltid; vi fick hämta dem i tillverkarnas manualer.",
  },
  {
    question: "Vad är sabotageskydd på en fönstersensor?",
    answer:
      "En funktion som gör att sensorn larmar när någon bryter loss den från karmen eller öppnar höljet, i stället för bara när fönstret öppnas. Poängen är att en inbrottstjuv annars kan lyfta av hela enheten utan att något händer. Fibaro har en särskild TMP-knapp som utlöser både när enheten lossas och när locket öppnas, Cleverio och Sonoff varnar vid borttagning, Aqaras P2 skickar en notis, och Yale gör det på både sin inomhus- och sin utomhusmodell. Sex av de produkter vi tittat på skriver ut att de har det. Övriga nämner det inte, vilket inte är samma sak som att de saknar det, och därför väger funktionen inga poäng i vår rankning.",
  },
  {
    question: "Kan man ha en dörr- och fönstersensor utomhus?",
    answer:
      "Bara om den är byggd för det, och nästan ingen är. Av allt vi tittat på är Yales Magnetkontakt för utomhusbruk den enda med en IP-klass, IP55, och den kostar 749 kronor mot 129 till 499 för inomhusmodellerna. Skälet är att en vanlig sensor har ett hölje som släpper in fukt, och att kondens inuti elektroniken både ger falsklarm och kortar livslängden. Ska du bevaka en grind, en garageport eller en förrådsdörr som sitter i väder behöver du alltså en särskild produkt. Ska du bevaka ett fönster inifrån, vilket är det normala, räcker en inomhusmodell även om fönstret vetter ut.",
  },
  {
    question: "Hur långt får det vara mellan sensorn och magneten?",
    answer:
      "Mellan 5 och 10 millimeter hos de tillverkare som anger det, och skillnaden avgör om sensorn fungerar på ett äldre fönster. Fibaro kräver att magneten sitter högst 5 millimeter från sensorn, Cleverio tillåter 10. Ett fönster som satt sig, en karm som slagit sig eller en list som byggts på kan lätt ge några millimeters extra spel, och då börjar en sensor med snäv tolerans larma falskt eller sluta reagera. Aqaras Multi-State P100 går runt hela problemet genom att vara ett enda stycke utan separat magnet. Mät glappet mellan båge och karm innan du väljer, och avstå från att montera på metallkarm: Cleverios manual avråder uttryckligen från det, eftersom metallen stör magnetfältet.",
  },
  {
    question: "Vad kan en fönstersensor mäta utöver öppet och stängt?",
    answer:
      "Ganska mycket hos några få, och ingenting alls hos de flesta. Shelly BLU Door/Window ZB mäter tiltvinkel och ljusnivå i lux, Fibaro har en inbyggd temperatursensor, och Aqaras Multi-State P100 känner rörelse, tilt, vibration och fall med accelerometer, gyroskop och magnetometer. De övriga rapporterar bara om kontakten är sluten. Tilt är mer användbart än det låter: ett vridfönster i luftningsläge är varken öppet eller stängt i en magnetkontakts mening, och en sensor som känner vinkeln kan skilja på ett fönster som står på glänt och ett som står vidöppet. Temperatur i samma enhet är praktiskt om du vill veta att någon lämnat altandörren öppen när det är noll grader ute.",
  },
  {
    question: "Finns det något oberoende test av dörr- och fönstersensorer?",
    answer:
      "Nej, inte i Sverige och inte hos de europeiska provningsinstitut vi normalt läser. Råd & Rön har inte provat magnetkontakter. Stiftung Warentest har provat smarta säkerhetssystem och mekaniska fönsterlås, vilket är två andra produkter som ofta blandas ihop med den här. Norska tek.no nämner sensorerna bara inuti tester av hela system som Futurehome och Netatmo. Det betyder att vår rankning bygger på tillverkarnas publicerade specifikationer, deras manualer och priser vi läst hos butikerna, inte på mätningar. Vi säger det hellre rakt ut än viktar in ett testbetyg som bara ett par av produkterna har.",
  },
  {
    question: "Hur många sensorer behöver jag till ett hus?",
    answer:
      "Räkna på de öppningar en person faktiskt kan ta sig in genom, inte på alla fönster. I en normal villa blir det ytterdörren, altandörren, källardörren och de fönster som sitter i markplan, alltså ofta sex till åtta. Övervåningens fönster hoppar de flesta över. Det är därför styckpriset betyder mer än det ser ut att göra: sex Aqara T1 kostar 1 194 kronor, sex Yale kostar 2 994. Flera tillverkare säljer trepack och kit som är billigare per sensor än styckpriset, så kolla det innan du lägger tolv enskilda i korgen. Lägg också till hubben om du inte redan har en.",
  },
  {
    question: "Kan en fönstersensor tända lampor?",
    answer:
      "Ja, och för många är det den egentliga anledningen att köpa en. En sensor är bara en kontakt som säger till din hubb att något har hänt, och vad som sedan händer bestämmer du. Vanliga användningar är att garderobsbelysningen tänds när dörren öppnas, att hallen tänds när ytterdörren går upp på kvällen, och att värmen i rummet stängs av när fönstret vädras. Det sista sparar verkliga pengar i ett hus med smarta termostater. Vill du ha just belysningsscener och redan har Philips Hue är deras egen sensor enklast, eftersom allt ligger i samma app. Vill du styra saker från flera märken behöver du en sensor med öppen standard.",
  },
];
