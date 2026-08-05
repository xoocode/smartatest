import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { SMART_GARAGEPORTSOPPNARE } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /smart-garageportsoppnare.
 *
 * Systersida till /garageportsoppnare. Den här filen bär modulerna som kopplas
 * till en öppnare du redan har; motorerna ligger i lib/data/garageportsoppnare.ts.
 *
 * Priser, produktnamn, GTIN och butiks-URL:er är lästa ur butikernas egen
 * JSON-LD på PRICE_CHECKED. Uppgifter om ekosystem och kontosäkerhet kommer
 * från tillverkarnas egna produktsidor och från Kjells specifikation.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans. Se lib/links.ts.
 *
 * ## ⚠️ Yale länkas till Kjell trots att Proshop är billigare
 *
 * Samma artikel: Kjell 1 690 kr, Proshop 1 439 kr, alltså **251 kronor mer hos
 * den butik som betalar oss bättre** (Kjell 5 % / 30 d mot Proshop 3,2 % / 7 d).
 * Båda lästa och i lager 2026-08-05.
 *
 * `.claude/context/money.md` tillåter att välja den bättre betalande butiken
 * "at the same price, or near enough", och 17 procent är inte near enough. Jag
 * lyfte invändningen och **användaren beslutade Kjell 2026-08-05**. Skälen som
 * talar för: Kjell är den enda butik som publicerar Yales tvåfaktorssäkerhet
 * och kryptering, alltså den uppgift kriteriet `sakerhet` vilar på, och
 * cookien är 30 dagar mot 7.
 *
 * Beslutet ligger här och inte i en kommentar i förbifarten, eftersom det är
 * det enda stället på sajten där en dyrare butik valts framför en billigare.
 * Ompröva det vid nästa prisrunda: håller spridningen i sig bör den skrivas ut
 * för läsaren, som prisspridningen på Master Lock 5441 på /nyckelskap.
 *
 * ## ⚠️ Positionssensorn skiljer dem inte åt
 *
 * En hypotes prövades och föll: att billiga reläer bara kan trycka på knappen
 * medan dyrare också vet var porten står. Garageportsbrytarreläet på 374 kr
 * anger "visning av styrenhetens aktuella status (öppen/stängd)" och
 * Tuya-modulen på 384 kr levereras med öppningssensor för tungkontakt. Sensorn
 * är standard från 374 kronor och uppåt.
 *
 * Den skillnad som faktiskt bär kategorin är strömförsörjningen, se kriteriet
 * `installation`. Se .agent/research/smart-garageportsoppnare.md §3.
 *
 * ## ⚠️ Variantfällan på Meross
 *
 * Meross säljer MSG100 och MSG100**HK** som skilda artiklar, där HK-varianten
 * är den med HomeKit och kostar 569 kr hos m.nu. NetOnNet säljer MSG100 för
 * 499 kr. Tillverkarens familjesida anger HomeKit-stöd, men vi har inte kunnat
 * bekräfta vilket artikelnummer NetOnNet för, och därför står `HomeKit` som
 * `Ej angiven` på den produkten. Samma fälla som ABUS 787 mot 787 Smart-BT på
 * /nyckelskap och Nanoleaf Lines mot Essentials på /smart-belysning.
 *
 * ## Vad ingen har gjort
 *
 * Ingen har provat modulerna i labb. Ljud & Bild har monterat Yale och skrivit
 * om det, vilket täcker en av sex produkter och därför inte blivit ett eget
 * kriterium. Vi har inte monterat något.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "yale-smart-opener",
    brand: "Yale",
    name: "Smart Opener för motordrivna garageportar",
    shortName: "Yale Smart Opener",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "yale-smart-opener"),
    tagline: "Tvåfaktor och kryptering, utskrivet i butikens specifikation.",
    scores: {
      /* Matas från portöppnaren, ingen 230 V-inkoppling, positionssensor
         ingår i lådan. Skruvmejseljobb. */
      installation: 4.5,
      /* Ensam i kategorin om att publicera tvåfaktorsautentisering samt AES-
         och TLS-kryptering. Enda produkten där kriteriet går att fylla alls. */
      sakerhet: 5,
      /* Google, Alexa och Yales eget ekosystem, men inget HomeKit alls och
         ingen Matter. Det är den enda produkten som stänger ute Apple helt. */
      ekosystem: 2.5,
      /* Takskjutportar och vipportar utskrivet av tillverkaren, alltså den
         enda som anger porttyp i klartext. */
      kompatibilitet: 4,
      /* 1 690 kr mot 483 för SwitchBot. Du betalar för kontosäkerheten och
         för det enda oberoende testet i kategorin. */
      prisvarde: 2,
    },
    price: 1690,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-smart-opener-for-motordrivna-garageportar-p66156",
    /* Tvåa på 3,77 mot SwitchBots 3,83, alltså sex hundradelar. Yale vinner
       säkerhet stort och förlorar ekosystem och pris. Utmärkelsen följer
       poängen och inte tvärtom, se .claude/context/data.md. */
    award: "premium",
    superlative: "Bäst för den säkerhetsmedvetne",
    pros: [
      "Tvåstegsverifiering, så ett stulet lösenord räcker inte för att öppna porten",
      "AES- och TLS-kryptering mellan telefon, modul och tjänst",
      "Positionssensor ingår, 70 × 46 × 21 mm",
      "Öppnar automatiskt när telefonen närmar sig och stänger när du gått in",
      "Passar både takskjutportar och vipportar",
    ],
    cons: [
      "Inget HomeKit, så den är utesluten om hemmet är byggt kring Apple",
      "1 690 kronor, tre gånger den billigaste modulen som gör samma sak",
      "Kräver stabil wifi i garaget, vilket sällan finns där täckningen tar slut",
      "Röststyrning via Google kräver att du knappar in en kod varje gång",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 690 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "Från portöppnaren", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Nej", highlight: true },
      { label: "Positionssensor", shortLabel: "Sensor", value: "Ja, ingår", highlight: true },
      { label: "Statusbesked i app", shortLabel: "Status", value: "Ja", highlight: true },
      { label: "Ekosystem", value: "Google Home, Amazon Alexa, Yale Home", highlight: true },
      { label: "Kräver hubb", shortLabel: "Hubb", value: "Nej", highlight: true },
      { label: "Tvåfaktorsautentisering", value: "Ja" },
      { label: "Matter", value: "Nej" },
      { label: "HomeKit", value: "Nej" },
      { label: "Kryptering", value: "AES och TLS, BLE" },
      { label: "Aviseringar", value: "Ja" },
      { label: "Anslutning", value: "Wifi 2,4 GHz och Bluetooth" },
      { label: "Passar porttyp", value: "Takskjutport och vipport" },
      { label: "Antal portar", value: "1 st" },
      { label: "Mått", value: "50 × 50 × 32 mm" },
      { label: "Artikelnummer", value: "66156" },
    ],
    verdict:
      "Yale Smart Opener kostar 1 690 kronor och är den enda modulen här vars kontosäkerhet går att läsa innan du köper.\n\n**Tvåstegsverifiering och kryptering står utskrivet i specifikationen:** identiteten bekräftas med e-post eller telefonnummer utöver lösenordet, och trafiken skyddas med AES och TLS. Det låter som en teknisk detalj tills man tänker på vad produkten gör. Den kopplar en dörr till ditt hus till internet, och då är kontot bakom appen en nyckel. Ingen annan modul i jämförelsen låter dig kontrollera hur den nyckeln skyddas.\n\nDen är också den enda som någon svensk redaktion faktiskt har monterat och skrivit om, och den enda som är utpekad för både takskjutport och vipport. Positionssensorn ligger i lådan, geotaggningen öppnar porten när du svänger in på uppfarten och stänger den när du gått in i huset, och installationen är två kablar till portöppnaren utan att något behöver dras om.\n\nSedan kommer bristen som avgör för många: **det finns inget HomeKit-stöd**. Är hemmet byggt kring Apple faller den bort, och det spelar ingen roll hur bra resten är. Röststyrning via Google kräver dessutom en kod varje gång, vilket är rimligt för en garageport men irriterande i vardagen.\n\nBetalar du 1 207 kronor extra för att kunna läsa hur kontot skyddas är det värt pengarna, förutsatt att hemmet inte är byggt kring Apple. Är det det faller den, och då är SwitchBot både billigare och den enda som kommer in i Apple Home.",
  },
  {
    id: "switchbot-garageportsoppnare",
    brand: "SwitchBot",
    name: "Garageportsöppnare",
    shortName: "SwitchBot",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "switchbot-garageportsoppnare"),
    tagline: "Matter, så den fungerar med Apple, Google, Alexa och Samsung.",
    scores: {
      /* USB-matad, ingen fast installation. */
      installation: 4.5,
      /* Ingen publicerad uppgift om tvåfaktor eller kryptering. */
      sakerhet: 2,
      /* Enda produkten med Matter, och därmed den enda som når alla fyra
         ekosystemen utan variantköp. Bäst i kategorin. */
      ekosystem: 5,
      kompatibilitet: 3.5,
      /* 483 kr för Matter och USB-installation är kategorins bästa affär. */
      prisvarde: 4.5,
    },
    price: 483,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "CDON",
    merchantUrl: "https://cdon.se/produkt/switchbot-garageportsoppnare-6c047aa1344d5a79/",
    award: "winner",
    superlative: "Bäst för alla fyra ekosystemen",
    pros: [
      "Matter över wifi, alltså Apple Home, Google, Alexa och Samsung utan variantköp",
      "483 kronor, en fjärdedel av den dyraste modulen",
      "USB-matad, så monteringen är en skruvmejsel och två kablar",
      "Kan koppla upp till två SwitchBot-enheter över Bluetooth",
    ],
    cons: [
      "Om kontot skyddas av tvåstegsverifiering är okänt",
      "Vilken kryptering som används är okänt",
      "Måtten och porttypen är okända tills lådan är öppnad",
      "Vilka porttyper den passar står inte angivet",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "483 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "USB", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Nej", highlight: true },
      { label: "Positionssensor", shortLabel: "Sensor", value: "Ja, ingår", highlight: true },
      { label: "Statusbesked i app", shortLabel: "Status", value: "Ja", highlight: true },
      { label: "Ekosystem", value: "Apple Home, Google, Alexa, Samsung", highlight: true },
      { label: "Kräver hubb", shortLabel: "Hubb", value: "Nej", highlight: true },
      { label: "Tvåfaktorsautentisering", value: "Ej angiven" },
      { label: "Matter", value: "Ja, över wifi" },
      { label: "HomeKit", value: "Ja, via Matter" },
      { label: "Kryptering", value: "Ej angiven" },
      { label: "Aviseringar", value: "Ja" },
      { label: "Anslutning", value: "Wifi och Bluetooth" },
      { label: "Passar porttyp", value: "Ej angiven" },
      { label: "Antal portar", value: "1 st" },
      { label: "GTIN", value: "0810150545708" },
    ],
    verdict:
      "SwitchBot garageportsöppnare kostar 483 kronor och är den enda modulen här som talar Matter.\n\n**Det avgör vilket hem den passar i.** Matter är den gemensamma standarden som Apple, Google, Amazon och Samsung alla stöder, och en Matter-enhet fungerar därför i alla fyra utan att tillverkaren behöver bygga stöd för vart och ett. Konkurrenterna löser Apple genom att sälja en särskild artikelvariant, eller inte alls. Här behöver du inte tänka på vilken låda du plockar från hyllan.\n\nDen går på USB, vilket betyder att monteringen är två kablar till portöppnaren och en strömadapter. Ingen fast installation, ingen elektriker, och positionssensorn ligger i lådan. För 483 kronor är det den mest kompletta modulen i jämförelsen.\n\nDet du inte får veta är hur kontot skyddas. Varken tvåstegsverifiering eller kryptering finns angivet någonstans, och för en produkt vars enda uppgift är att öppna en dörr till huset över internet är det en verklig lucka. Vilka porttyper den passar och hur stor den är får du dessutom se först när paketet är öppnat.\n\nKöp den ändå. Den kostar 483 kronor, den monteras med en skruvmejsel och den fungerar i vilket smart hem du än råkar ha, vilket ingen annan modul här kan säga. Slå på tvåstegsverifiering i appen om den erbjuds, så har du gjort det du kan åt den enda invändningen.",
  },
  {
    id: "meross-msg100",
    brand: "Meross",
    name: "Smart Garage Door Opener MSG100",
    shortName: "Meross MSG100",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "meross-msg100"),
    tagline: "118 kundbetyg på 4,5, mest omdömda modulen i jämförelsen.",
    scores: {
      installation: 4.5,
      sakerhet: 2,
      /* Google, Alexa och SmartThings utan hubb. HomeKit går inte att
         bekräfta för just den artikel NetOnNet säljer, se filhuvudet. */
      ekosystem: 3.5,
      kompatibilitet: 3,
      prisvarde: 4.5,
    },
    price: 499,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "NetOnNet",
    merchantUrl:
      "https://www.netonnet.se/art/hem-fritid/smarta-hem/smarta-sensorer/meross-smart-wifi-garage-door-opener/1025577.19001/",
    userRating: { value: 4.5, count: 118, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som inte kör Apple",
    pros: [
      "118 kundbetyg på 4,5, det bredaste användarunderlaget i jämförelsen",
      "Ingen hubb krävs, modulen kopplar upp sig på wifit du redan har",
      "Google Assistant, Alexa och SmartThings",
      "USB-matad, alltså skruvmejsel och inte elfirma",
    ],
    cons: [
      "Om just den här artikeln stöder Apple HomeKit går inte att avgöra före köpet",
      "Om kontot skyddas av tvåstegsverifiering är okänt",
      "Vilken kryptering som används är okänt",
      "Fungerar bara på 2,4 GHz, så nätet i garaget måste nå dit",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "499 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "USB", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Nej", highlight: true },
      { label: "Positionssensor", shortLabel: "Sensor", value: "Ja, ingår", highlight: true },
      { label: "Statusbesked i app", shortLabel: "Status", value: "Ja", highlight: true },
      { label: "Ekosystem", value: "Google, Alexa, SmartThings", highlight: true },
      { label: "Kräver hubb", shortLabel: "Hubb", value: "Nej", highlight: true },
      { label: "Tvåfaktorsautentisering", value: "Ej angiven" },
      { label: "Matter", value: "Ej angiven" },
      { label: "HomeKit", value: "Ej angiven" },
      { label: "Kryptering", value: "Ej angiven" },
      { label: "Aviseringar", value: "Ja" },
      { label: "Anslutning", value: "Wifi 2,4 GHz" },
      { label: "Passar porttyp", value: "Ej angiven" },
      { label: "Antal portar", value: "1 st" },
      { label: "GTIN", value: "0787446925622" },
    ],
    verdict:
      "Meross MSG100 kostar 499 kronor och har 118 kundbetyg med snittet 4,5, vilket är det bredaste underlaget i jämförelsen med marginal.\n\n**Det säger inget om hur bra modulen är, men mycket om att den fungerar i vardagen** hos ett stort antal hushåll som satt upp den själva. Ingen annan produkt här kommer i närheten, och för en produkt som ska sitta i taket och glömmas bort är det värt att ta på allvar.\n\nDen kräver ingen hubb utan kopplar upp sig direkt på wifit, och den går på USB, så monteringen är två kablar och en adapter. Google Assistant, Alexa och SmartThings fungerar. Positionssensorn ingår.\n\nDen stora osäkerheten är Apple. Meross säljer flera moduler under samma namn där HomeKit-stödet hör till en egen artikel med eget artikelnummer, och vilken av dem som ligger i lådan går inte att avgöra från butikens uppgifter. **Köp den inte i tron att den fungerar med Apple Home.** Kontosäkerheten är dessutom lika oredovisad som hos de flesta här, så du får inte veta om tvåstegsverifiering finns.\n\nKör du Google eller Alexa och vill ha den modul som flest andra redan har fungerande i taket är det den här. Ska den in i Apple Home tar du SwitchBot för 16 kronor mindre.",
  },
  {
    id: "ismartgate-lite",
    brand: "iSmartGate",
    name: "Garageöppnare Lite, 1 port",
    shortName: "iSmartGate Lite",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "ismartgate-lite"),
    tagline: "Kopplar ihop porten med en kamera du redan har.",
    scores: {
      /* USB och batterier, ingen fast installation. */
      installation: 4,
      sakerhet: 2.5,
      /* IFTTT och röstassistenter, men ingen Matter och inget utskrivet
         HomeKit. Videointegrationen är det som skiljer den från resten. */
      ekosystem: 3.5,
      kompatibilitet: 3.5,
      /* 2 109 kr är kategorins dyraste, och det som motiverar det är
         videofunktionen och flera användare. */
      prisvarde: 1.5,
    },
    price: 2109,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "CDON",
    merchantUrl:
      "https://cdon.se/produkt/ismartgate-garageoppnare-lite-1-port-a6a711fbccc2521f/",
    superlative: "Bäst för garaget med kamera",
    pros: [
      "Kan visa bild från en kamera du redan har, tillsammans med portens läge",
      "Hanterar flera användare med egna konton",
      "Fungerar med IFTTT, så porten kan kopplas till annat i hemmet",
      "Går på USB och batterier, alltså ingen fast installation",
    ],
    cons: [
      "2 109 kronor, mer än fyra gånger den billigaste modulen som styr en port",
      "Lite-versionen klarar en enda port, för fler krävs den dyrare Pro",
      "Om kontot skyddas av tvåstegsverifiering är okänt",
      "Inget angivet Matter-stöd, så Apple-hemmet får gå omvägar",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 109 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "USB och batterier", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Nej", highlight: true },
      { label: "Positionssensor", shortLabel: "Sensor", value: "Ja, ingår", highlight: true },
      { label: "Statusbesked i app", shortLabel: "Status", value: "Ja", highlight: true },
      { label: "Ekosystem", value: "Röstassistenter och IFTTT", highlight: true },
      { label: "Kräver hubb", shortLabel: "Hubb", value: "Nej", highlight: true },
      { label: "Tvåfaktorsautentisering", value: "Ej angiven" },
      { label: "Matter", value: "Ej angiven" },
      { label: "HomeKit", value: "Ej angiven" },
      { label: "Kryptering", value: "Ej angiven" },
      { label: "Aviseringar", value: "Ja" },
      { label: "Videoövervakning", value: "Ja, integrerar befintlig kamera" },
      { label: "Antal portar", value: "1 st" },
      { label: "GTIN", value: "8437022462738" },
    ],
    verdict:
      "iSmartGate Lite kostar 2 109 kronor och är den enda modulen här som kan visa dig porten i stället för att bara berätta om den.\n\n**Den kopplar in en kamera du redan har i samma vy som portens läge.** Skillnaden mot en avisering är att du kan se varför porten står öppen: om bilen är på väg ut, om någon lastar av, eller om ingen är där. Det är den funktion som gör att en modul faktiskt används efter första månaden, och ingen annan här har den.\n\nDen hanterar också flera användare med egna konton, vilket löser ett verkligt problem i ett hushåll där fyra personer ska kunna öppna porten men inte dela ett lösenord. IFTTT gör att porten kan kopplas till annat, och strömmen tas från USB och batterier utan fast installation.\n\nPriset är svårt att försvara mot resten. 2 109 kronor är över fyra gånger SwitchBots 483 för att styra en enda port, och Lite-versionen klarar just en. Ska du ha två portar kostar Pro-versionen ännu mer. Kontosäkerheten är dessutom lika tyst som hos de flesta här, vilket är svårare att acceptera i den här prisklassen.\n\nHar du redan en kamera i garaget och vill se porten i samma app är den värd pengarna. Ska du bara kunna öppna och stänga betalar du fyra gånger för mycket, och då är SwitchBot rätt köp.",
  },
  {
    id: "tuya-wgm2",
    brand: "Tuya",
    name: "Smart Wifi garageportskontroll WGM2 med sensor",
    shortName: "Tuya WGM2",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "tuya-wgm2"),
    tagline: "Öppningssensorn larmar och sparar varje händelse i appen.",
    scores: {
      /* 230 V och kopplingsdosa. Kräver registrerat elinstallationsföretag,
         vilket är kategorins tyngsta enskilda nackdel. */
      installation: 1.5,
      /* Ingen publicerad kontosäkerhet, men larm vid obehörig öppning och
         händelsehistorik är verkliga säkerhetsfunktioner. */
      sakerhet: 3,
      /* Google Assistant och Alexa via Tuya/Smart Life. Ingen Matter, ingen
         HomeKit. */
      ekosystem: 2.5,
      /* "Valfri grindmekanism med en standardingång" är den bredaste
         kompatibiliteten i jämförelsen. */
      kompatibilitet: 4,
      /* 384 kr i hyllan, men elfirman ligger utanför. */
      prisvarde: 2.5,
    },
    price: 384,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "CDON",
    merchantUrl:
      "https://cdon.se/produkt/tuya-smart-wifi-garageportskontroll-sensor-f09d3dc0a0ae57b0/",
    superlative: "Bäst när elektrikern ändå kommer",
    pros: [
      "Larmar vid obehörig öppning och sparar varje händelse i en historik",
      "Passar valfri portmekanism med ingång för en normalt öppen knapp",
      "Öppningssensor för tungkontakt ingår i satsen",
      "Veckoschema för automatisk öppning och stängning",
    ],
    cons: [
      "Matas med 230 volt och ska sitta i en kopplingsdosa, alltså ett jobb för elfirma",
      "Om kontot skyddas av tvåstegsverifiering är okänt",
      "Inget Matter och inget Apple Home",
      "Priset i hyllan är inte priset i garaget när installationen räknas in",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "384 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "230 V AC", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Ja", highlight: true },
      { label: "Positionssensor", shortLabel: "Sensor", value: "Ja, tungkontakt ingår", highlight: true },
      { label: "Statusbesked i app", shortLabel: "Status", value: "Ja", highlight: true },
      { label: "Ekosystem", value: "Google Assistant, Alexa, Tuya/Smart Life", highlight: true },
      { label: "Kräver hubb", shortLabel: "Hubb", value: "Nej", highlight: true },
      { label: "Tvåfaktorsautentisering", value: "Ej angiven" },
      { label: "Matter", value: "Ej angiven" },
      { label: "HomeKit", value: "Nej" },
      { label: "Kryptering", value: "Ej angiven" },
      { label: "Aviseringar", value: "Ja, inklusive larm vid obehörig öppning" },
      { label: "Anslutning", value: "Wifi" },
      { label: "Passar porttyp", value: "Alla med ingång för normalt öppen knapp" },
      { label: "Antal portar", value: "1 st" },
      { label: "GTIN", value: "5903794123663" },
    ],
    verdict:
      "Tuya WGM2 kostar 384 kronor och har den mest genomtänkta larmfunktionen i jämförelsen.\n\n**Öppningssensorn används till mer än att visa status.** Varje gång porten öppnas utan att kommandot kom från appen skickas ett meddelande, och varje händelse sparas i en historik du kan bläddra i. Det gör modulen till en enkel inbrottsindikator för garaget, inte bara till en fjärrkontroll, och det är en funktion de dyrare modulerna inte marknadsför.\n\nDen är också den mest kompatibla. Den styr valfri portmekanism med en ingång för en normalt öppen knapp, vilket i praktiken betyder nästan varje portöppnare med väggknapp. Veckoschema och automatisk stängning ingår.\n\n**Sedan kommer det som avgör.** Modulen matas med 230 volt och är konstruerad för att sitta i en kopplingsdosa bakom väggknappen. Att lägga in en relämodul i den fasta installationen kräver ett registrerat elinstallationsföretag, och då är 384 kronor inte vad produkten kostar. Med ett par timmars arbete inräknat är den här den dyraste modulen i jämförelsen, inte den billigaste.\n\nSka en elektriker ändå dra el i garaget är det ett bra tillfälle att lägga in den här samtidigt. Ska du montera själv i helgen ska du inte köpa den, och då är Meross MSG100 för 115 kronor mer det du letar efter.",
  },
  {
    id: "garageportsbrytarrela",
    brand: "Tuya",
    name: "Garageportsbrytarrelä med reedbrytare",
    shortName: "Brytarrelä + reed",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "garageportsbrytarrela"),
    tagline: "Billigast av modulerna, och visar ändå om porten är öppen.",
    scores: {
      /* Kopplingsdosa på minst 60 mm, alltså fast installation. */
      installation: 1.5,
      sakerhet: 2,
      ekosystem: 2.5,
      kompatibilitet: 3.5,
      prisvarde: 2.5,
    },
    price: 374,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "CDON",
    merchantUrl:
      "https://cdon.se/produkt/garageportsbrytarrela-reedbrytare-a21cc900e0fe5d87/",
    superlative: "Bäst för Smart Life-hemmet",
    pros: [
      "Visar portens aktuella läge, öppet eller stängt, trots lägsta priset",
      "Reedbrytare ingår i satsen",
      "Passar alla portmekanismer med ingång för mekanisk knapp",
      "Går in i Smart Life tillsammans med lampor, uttag och sensorer",
    ],
    cons: [
      "Ska sitta i en kopplingsdosa på minst 60 millimeter, alltså ett jobb för elfirma",
      "Om kontot skyddas av tvåstegsverifiering är okänt",
      "Inget Matter och inget Apple Home",
      "Måtten och märkspänningen är okända",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "374 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "230 V AC", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Ja", highlight: true },
      { label: "Positionssensor", shortLabel: "Sensor", value: "Ja, reedbrytare ingår", highlight: true },
      { label: "Statusbesked i app", shortLabel: "Status", value: "Ja", highlight: true },
      { label: "Ekosystem", value: "Google Assistant, Alexa, Tuya/Smart Life", highlight: true },
      { label: "Kräver hubb", shortLabel: "Hubb", value: "Nej", highlight: true },
      { label: "Tvåfaktorsautentisering", value: "Ej angiven" },
      { label: "Matter", value: "Ej angiven" },
      { label: "HomeKit", value: "Nej" },
      { label: "Kryptering", value: "Ej angiven" },
      { label: "Aviseringar", value: "Ja" },
      { label: "Anslutning", value: "Wifi" },
      { label: "Passar porttyp", value: "Alla med ingång för mekanisk knapp" },
      { label: "Antal portar", value: "1 st" },
      { label: "GTIN", value: "5904553905926" },
    ],
    verdict:
      "Garageportsbrytarreläet kostar 374 kronor och är den billigaste modulen i jämförelsen.\n\n**Den kan ändå det som spelar mest roll:** en reedbrytare ingår, och appen visar om porten står öppen eller stängd. Det är värt att säga rakt ut, eftersom man lätt antar att den billigaste bara kan trycka på knappen i blindo. Den kan mer än så, och skillnaden mot moduler för fem gånger priset är mindre än prislappen antyder.\n\nDen passar också nästan vad som helst, alltså varje portmekanism med en ingång för en mekanisk knapp, och eftersom den ligger i Tuyas Smart Life kan porten kopplas ihop med lampor, uttag och sensorer du redan har där.\n\n**Men den ska sitta i en kopplingsdosa på minst 60 millimeter.** Att lägga in ett relä i den fasta installationen är arbete för ett registrerat elinstallationsföretag, och därmed bär de 374 kronorna en osynlig kostnad som är flera gånger produktens pris. Måtten och märkspänningen är dessutom okända, så förutsättningarna får du leta reda på innan du beställer.\n\nBygger du redan ut ett Smart Life-hem och har en elektriker inbokad är den ett billigt tillskott. Ska du lösa garaget i helgen med en skruvmejsel är den här fel produkt, oavsett vad den kostar.",
  },
];

export const SMART_GARAGEPORTSOPPNARE_PRODUCTS = resolveProducts(
  SMART_GARAGEPORTSOPPNARE,
  SEEDS,
);

/**
 * Tittade på, valde bort.
 *
 * `reason` är undantagen från källpratsregeln, se skillen `swedish-voice`.
 */
export const SMART_GARAGEPORTSOPPNARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Meross",
    name: "MSG100HK med HomeKit",
    approxPrice: 569,
    merchant: "m.nu",
    merchantUrl:
      "https://www.m.nu/rela-wifi/smart-garageportsoppnare-med-stod-for-homekit",
    reason:
      "HomeKit-varianten av den modul vi rankar, 70 kronor dyrare. Den är utelämnad ur rankningen av samma skäl som vi rankar en av två nära identiska varianter i andra kategorier: två poster som bara skiljer sig på en rad hjälper ingen som väljer. Priset och lagerstatusen gick inte att läsa maskinellt hos butiken. Vill du ha Apple Home är SwitchBot billigare och når dit via Matter, vilket är den lösning som håller längre.",
  },
  {
    brand: "iSmartGate",
    name: "Ultimate Lite Kit",
    approxPrice: 3439,
    merchant: "CDON",
    merchantUrl:
      "https://cdon.se/produkt/ismartgate-garageopener-ultimate-lite-kit-8eb5621d2a8f58ee/",
    reason:
      "Den större syskonmodellen till iSmartGate Lite, 1 330 kronor dyrare och byggd för fler portar och fler tillbehör. Den löser inte ett annat problem än Lite för den som har en garageport, och att ranka två modeller ur samma serie hade tagit en plats från en produkt som gör något annat. Har du två portar eller en grind därtill är det den här du ska titta på i stället.",
  },
  {
    brand: "Blow",
    name: "72-081 smart wifi Tuya grindkontroll",
    approxPrice: 563,
    merchant: "CDON",
    merchantUrl:
      "https://cdon.se/produkt/blow-72-081-smart-wifi-tuya-grindkontroll-9f6b8622a59f57b5/",
    reason:
      "Marknadsförd för grind snarare än garageport, och 179 kronor dyrare än Tuya WGM2 som gör samma sak med samma app. Vi hittade ingen uppgift som skiljer den från de Tuya-moduler vi redan rankar, och en fjärde modul i samma familj hade gjort listan längre utan att göra den mer användbar.",
  },
  {
    brand: "Chamberlain",
    name: "myQ",
    reason:
      "Den mest kända produkten i den här kategorin internationellt, och den enda som tillverkas av samma företag som gör portöppnarna. Den säljs inte av någon svensk butik vi hittat, och en produkt du får importera själv med oklar garanti hör inte hemma i en rankning för svenska köpare. Har du en Chamberlain-öppnare fungerar de universella modulerna här lika bra, eftersom de alla kopplas till samma två plintar för väggknappen.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const SMART_GARAGEPORTSOPPNARE_FAQ = [
  {
    question: "Hur fungerar en smart garageportsöppnare?",
    answer:
      "Den härmar ett tryck på väggknappen. Inuti modulen sitter ett relä som sluter en krets mellan två skruvplintar på din befintliga portöppnare, alltså exakt samma sak som händer när du trycker på knappen innanför porten. Modulen kopplar upp sig på ditt wifi och tar emot kommandot från appen. Till det hör en liten sensor som sätts på porten och känner av om den är öppen eller stängd, så att appen kan visa läget i stället för att bara skicka tryckningar i blindo. Du byter alltså inte motor, och portöppnarens egen fjärrkontroll fortsätter fungera precis som förut.",
  },
  {
    question: "Passar en smart modul till min garageportsöppnare?",
    answer:
      "Nästan säkert, om din öppnare har två skruvplintar för en väggknapp. Det har de allra flesta motordrivna portöppnare, och det är den enda anslutning modulen behöver. Titta efter en liten kopplingsplint på motorenhetens sida, ofta märkt för just väggknapp eller extern knapp. Har du redan en knapp innanför porten sitter kablarna där. Modulerna är i regel märkeslösa på den punkten och fungerar med valfri portmekanism som har en ingång för en normalt öppen knapp. Har din öppnare ingen sådan plint alls, exempelvis för att den är mycket gammal eller styrs helt trådlöst, fungerar de här modulerna inte.",
  },
  {
    question: "Får jag montera en smart garageportsmodul själv?",
    answer:
      "Det beror på hur modulen får ström, och skillnaden är större än priset antyder. En modul som går på USB eller matas från portöppnaren kopplar du in själv: två kablar till plinten, en strömadapter, klart på en halvtimme. En modul som ska matas med 230 volt och sitta i en kopplingsdosa är något annat. Att lägga in en relämodul i den fasta installationen räknas som en förändring av den, och det kräver ett registrerat elinstallationsföretag. Det gäller oavsett hur enkel kopplingen ser ut i anvisningen. Kontrollera därför strömförsörjningen innan du jämför priser, eftersom en modul för 384 kronor som kräver elektriker kostar mer än en för 499 kronor som inte gör det.",
  },
  {
    question: "Är det säkert att kunna öppna garaget från mobilen?",
    answer:
      "Det beror helt på hur kontot skyddas, och det är där produkterna skiljer sig mest. Modulen flyttar en dörr till ditt hus ut på internet, vilket betyder att den som kommer åt ditt konto kommer in i garaget. Det viktigaste skyddet heter tvåstegsverifiering: utöver lösenordet måste en kod från e-post eller sms bekräftas, så att ett läckt lösenord inte räcker. Yale Smart Opener anger både tvåstegsverifiering och kryptering av trafiken. För övriga moduler i vår jämförelse är uppgiften okänd, vilket inte betyder att skyddet saknas men att du inte kan kontrollera det före köpet. Slå på tvåstegsverifiering om appen erbjuder det, använd ett lösenord du inte använt någon annanstans, och koppla loss gamla telefoner från kontot när du byter.",
  },
  {
    question: "Fungerar de med Apple HomeKit?",
    answer:
      "Bara vissa, och det är den vanligaste dyra missen i kategorin. Yale Smart Opener stöder inte HomeKit alls. Meross säljer HomeKit-stödet som en egen artikel med eget artikelnummer, så två lådor som ser likadana ut kan skilja sig på just den punkten. SwitchBot löser det annorlunda genom att stödja Matter, alltså den gemensamma standarden som Apple Home, Google, Alexa och Samsung alla talar, och det är den lösning som håller längst eftersom den inte beror på att tillverkaren orkar underhålla stöd för varje plattform. Kör du Apple hemma: leta efter Matter i första hand, och kontrollera artikelnumret i andra hand.",
  },
  {
    question: "Vad händer om internet eller strömmen försvinner?",
    answer:
      "Porten fungerar precis som förut. Modulen sitter parallellt med väggknappen och tar inte över portöppnaren, så både knappen innanför porten och den vanliga fjärrkontrollen fortsätter att fungera utan wifi. Det du förlorar är appen, statusbesked och aviseringar. Vid strömavbrott gäller samma sak som utan modul: portöppnarens manuella frikoppling, alltså repet med handtag som hänger ner från skenan, kopplar loss porten så att den kan skjutas upp för hand. Modulen ändrar ingenting i den kedjan, vilket också är skälet till att den är ett lågriskköp jämfört med att byta motor.",
  },
  {
    question: "Behöver jag en hubb eller ett nav?",
    answer:
      "Nej, ingen av modulerna i vår jämförelse kräver det. De kopplar upp sig direkt på ditt vanliga wifi, vilket är en fördel eftersom en hubb är både en extra kostnad och en extra sak som kan sluta fungera. Två saker är däremot värda att kontrollera. Modulerna arbetar på 2,4 GHz och inte på 5 GHz, så nätet måste nå ut i garaget på rätt band, och ett garage med betongväggar eller en plåtport är precis den plats där täckningen brukar ta slut. Testa med mobilen på den plats där modulen ska sitta innan du beställer. Behöver du förstärka finns billiga lösningar, men räkna in det i kalkylen.",
  },
  {
    question: "Vad kostar en smart garageportsöppnare?",
    answer:
      "Räkna med 400 till 700 kronor för en modul du monterar själv. SwitchBot kostar 483 kronor och Meross MSG100 499, och båda går på USB, vilket betyder att priset i butiken är hela kostnaden. Vill du kunna läsa hur kontosäkerheten fungerar innan du köper får du gå upp till Yale Smart Opener på 1 690 kronor. Över 2 000 kronor betalar du för videointegration och stöd för flera portar. Under 400 kronor finns moduler som matas med 230 volt, och där tillkommer en elektriker, vilket gör dem till de dyraste i praktiken.",
  },
];
