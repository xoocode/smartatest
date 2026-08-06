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
 * ## ⚠️ Variantfällan på Meross är avförd 2026-08-06
 *
 * Sidan stod till 2026-08-06 på att HomeKit-stödet hörde till artikeln
 * MSG100**HK** och att vi inte kunde avgöra vilken artikel NetOnNet för.
 * Kontrollerat i original: Meross egen produktsida för MSG100 skriver
 * "Support Apple HomeKit, Amazon Alexa, Google Assistant, SmartThings", och
 * NetOnNets egen produktsida skriver HomeKit på fyra ställen. Två oberoende
 * led säger samma sak om samma artikel, och `HomeKit` står nu som `Ja`.
 *
 * MSG100HK ligger kvar i bortvalslistan, men som en dyrare dubblett och inte
 * som HomeKit-varianten.
 *
 * ## ⚠️ Kontoskyddet var ett redovisningskriterium, och det var fel
 *
 * Till 2026-08-06 gav `sakerhet` betyget 5 till Yale och 2 till alla övriga,
 * med motiveringen att bara Yale publicerade sin kontosäkerhet. Kriteriet
 * rankade alltså säljarens dokumentation. Fyra av sex tillverkare beskriver
 * skyddet i sitt eget hjälpcenter, och Meross skydd visade sig vara starkast
 * i kategorin. Se .agent/research/smart-garageportsoppnare.md §10.
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
    id: "meross-msg100",
    brand: "Meross",
    name: "Smart Garage Door Opener MSG100",
    shortName: "Meross MSG100",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "meross-msg100"),
    tagline: "Provad mot 1 600 portöppnarmodeller, ända ner till 90-talet.",
    scores: {
      /* 5 V över USB, 1,5 m sladd, ingen fast installation. */
      installation: 4.5,
      /* Engångskod ur en autentiseringsapp (TOTP) plus stöd för
         säkerhetsnyckel. Starkast i kategorin: en TOTP-kod går inte att komma
         åt genom att kapa e-post eller flytta ett telefonnummer, vilket är
         precis vägen in i Yales och SwitchBots kodutskick.
         Källa: meross.com/en-gc/support/FAQ/460.html och FAQ/461, läst
         2026-08-06. */
      sakerhet: 5,
      /* HomeKit, Google, Alexa och SmartThings, alla fyra utan variantköp och
         utan hubb. Ingen bekräftad Matter, vilket är det enda SwitchBot har
         som inte finns här. */
      ekosystem: 4.5,
      /* "Compatible with over 200 brands and 1600 different models", med en
         publicerad kompatibilitetskontroll att slå upp sin egen öppnare i.
         Ingen annan i jämförelsen har något som liknar det. */
      kompatibilitet: 4.5,
      /* 499 kr för kategorins bredaste kompatibilitet och starkaste
         kontoskydd. 16 kr mer än SwitchBot. */
      prisvarde: 4.5,
    },
    price: 499,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "NetOnNet",
    merchantUrl:
      "https://www.netonnet.se/art/hem-fritid/smarta-hem/smarta-sensorer/meross-smart-wifi-garage-door-opener/1025577.19001/",
    userRating: { value: 4.5, count: 118, scale: 5, checkedAt: PRICE_CHECKED },
    /* Vinnare på 4,63 mot SwitchBots 4,33 efter omräkningen 2026-08-06.
       Utmärkelsen följer poängen, se .claude/context/data.md. */
    award: "winner",
    superlative: "Bäst för nästan varje garage",
    pros: [
      "Fungerar med Apple HomeKit, Google, Alexa och SmartThings utan att du behöver välja rätt artikel",
      "Provad mot över 200 märken och 1 600 portöppnarmodeller, och du kan slå upp din egen innan du beställer",
      "Inloggningskoden hämtas ur en autentiseringsapp, så ett kapat e-postkonto räcker inte för att öppna porten",
      "118 kundbetyg på 4,5, det bredaste användarunderlaget i jämförelsen",
      "5 volt över USB och 1,5 meter sladd, alltså skruvmejsel och inte elfirma",
    ],
    cons: [
      "Ingen Matter, så ett hem som byggs på den standarden är bättre betjänt av SwitchBot",
      "94 millimeter lång, den största modulen här och den som syns mest i taket",
      "En enhet styr en port, och två portar kräver två moduler och två uttag",
      "Bara 2,4 GHz, så nätet måste nå garaget på rätt band",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "499 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "USB, 5 V", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Nej", highlight: true },
      { label: "Kontoskydd", shortLabel: "Konto", value: "Tvåfaktor via autentiseringsapp", highlight: true },
      { label: "HomeKit", shortLabel: "HomeKit", value: "Ja", highlight: true },
      { label: "Ekosystem", value: "HomeKit, Google, Alexa, SmartThings", highlight: true },
      { label: "Passar porttyp", shortLabel: "Passar", value: "Över 200 märken, 1 600 modeller", highlight: true },
      { label: "Positionssensor", value: "Ja, ingår" },
      { label: "Statusbesked i app", value: "Ja" },
      { label: "Kräver hubb", value: "Nej" },
      { label: "Matter", value: "–" },
      { label: "Kryptering", value: "–" },
      { label: "Aviseringar", value: "Ja" },
      { label: "Anslutning", value: "Wifi 2,4 GHz" },
      { label: "Antal portar", value: "1 st" },
      /* 3.7 x 1.8 x 0.9 in enligt Meross egen SPECS-ruta, omräknat till mm.
         meross.com/en-gc/mTerminal/smart-garage-door-opener/..., 2026-08-06. */
      { label: "Mått", value: "94 × 46 × 23 mm" },
      { label: "GTIN", value: "0787446925622" },
    ],
    verdict:
      "Meross MSG100 kostar 499 kronor och är den modul som passar flest garage och flest hem av de sex.\n\n**Den fungerar med alla fyra ekosystemen utan tillbehör:** Apple HomeKit, Google, Alexa och SmartThings. Du behöver alltså inte veta vilken sida av Apple-gränsen ditt hem ligger på innan du beställer, vilket är den vanligaste dyra missen i kategorin. Mot själva porten är räckvidden lika bred: 200 märken och 1 600 modeller, ner till öppnare byggda på 90-talet, och du slår upp din egen i listan innan du beställer.\n\n**Kontoskyddet är det starkaste här.** Koden vid inloggning kommer ur en autentiseringsapp i telefonen, inte ur ett sms eller ett mejl, och du kan lägga till en säkerhetsnyckel därtill. Skillnaden är konkret för just den här produkten: den som kapar din e-post eller flyttar ditt telefonnummer till ett eget kort kommer förbi ett utskickat engångslösenord, men inte förbi en kod som genereras i din egen telefon. Monteringen är två kablar till plinten och en USB-adapter, och 118 kundbetyg på 4,5 säger att det går vägen även för den som aldrig gjort det.\n\nDen är samtidigt den största modulen i jämförelsen, 94 millimeter mot SwitchBots 42, och den syns i taket. Något Matter-stöd finns inte heller, så bygger du medvetet ett hem där varje ny pryl ska tala samma standard är det ett skäl att välja bort den.\n\nKöp den. Den kostar 499 kronor, monteras med en skruvmejsel, passar nästan vilken portöppnare som helst och skyddar kontot bättre än moduler för tre gånger priset. Bygger du på Matter tar du SwitchBot för 16 kronor mindre.",
  },
  {
    id: "switchbot-garageportsoppnare",
    brand: "SwitchBot",
    name: "Garageportsöppnare",
    shortName: "SwitchBot",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "switchbot-garageportsoppnare"),
    tagline: "Matter, så den läggs till en gång och syns i alla fyra apparna.",
    scores: {
      /* Medföljande 12 V-adapter med 1,5 m kabel, torrkontaktkabel och 7 m
         reedkabel i lådan. Ingen fast installation. */
      installation: 4.5,
      /* Tvåstegsverifiering med kod till e-posten, plus betrodda enheter.
         Ett steg under Meross TOTP, eftersom e-postkontot i sin tur kan kapas.
         Källa: support.switch-bot.com, artikel 23626131340055, läst
         2026-08-06. */
      sakerhet: 4,
      /* Enda produkten med Matter, och därmed den enda som når alla fyra
         ekosystemen genom en enda uppkoppling. Bäst i kategorin. */
      ekosystem: 5,
      /* Torrkontakt mot valfri väggknappsingång och en publicerad
         kompatibilitetslista, men utan Meross modellbredd. */
      kompatibilitet: 3.5,
      /* 483 kr, billigast av de fyra du får montera själv. */
      prisvarde: 4.5,
    },
    price: 483,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "CDON",
    merchantUrl: "https://cdon.se/produkt/switchbot-garageportsoppnare-6c047aa1344d5a79/",
    award: "editor",
    superlative: "Bäst för Matter-hemmet",
    pros: [
      "Matter över wifi, alltså en uppkoppling som räcker till Apple, Google, Alexa och Samsung på en gång",
      "483 kronor, billigast av de fyra du får sätta upp själv",
      "42 × 36 × 16 millimeter, den minsta modulen här och den som syns minst",
      "7 meter kabel till lägessensorn, så den når porten även från en högt sittande motor",
      "Betrodda enheter, så tvåstegskoden bara krävs från en ny telefon",
    ],
    cons: [
      "Inloggningskoden går till e-posten, medan Meross hämtar den ur en autentiseringsapp",
      "Kompatibilitetslistan är kortare än Meross 1 600 modeller, så slå upp din öppnare innan du beställer",
      "Bara 2,4 GHz, så nätet måste nå garaget på rätt band",
      "Som gateway håller den 10 Bluetooth-enheter, alltså ingen ersättning för en riktig hubb i ett stort hem",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "483 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "Medföljande 12 V-adapter", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Nej", highlight: true },
      { label: "Kontoskydd", shortLabel: "Konto", value: "Tvåfaktor via e-postkod", highlight: true },
      { label: "HomeKit", shortLabel: "HomeKit", value: "Ja, via Matter", highlight: true },
      { label: "Ekosystem", value: "Apple Home, Google, Alexa, Samsung", highlight: true },
      { label: "Passar porttyp", shortLabel: "Passar", value: "Öppnare med väggknappsingång", highlight: true },
      { label: "Positionssensor", value: "Ja, reedkabel 7 m ingår" },
      { label: "Statusbesked i app", value: "Ja" },
      { label: "Kräver hubb", value: "Nej" },
      { label: "Matter", value: "Ja, över wifi" },
      { label: "Kryptering", value: "–" },
      { label: "Aviseringar", value: "Ja" },
      { label: "Anslutning", value: "Wifi 2,4 GHz och Bluetooth" },
      { label: "Antal portar", value: "1 st" },
      /* switch-bot.com/products/switchbot-garage-door-opener, specrutan
         Product Info, läst 2026-08-06. Vikt 27 g, material PC. */
      { label: "Mått", value: "42 × 36 × 16 mm" },
      { label: "GTIN", value: "0810150545708" },
    ],
    verdict:
      "SwitchBot garageportsöppnare kostar 483 kronor och är den enda modulen här som talar Matter.\n\n**Det avgör hur länge den håller.** Matter är den gemensamma standarden bakom Apple, Google, Amazon och Samsung, och en Matter-enhet läggs till en gång och dyker upp i alla fyra utan att tillverkaren behöver bygga och underhålla stöd för vart och ett. Konkurrenterna löser samma sak genom att koda mot varje plattform för sig, vilket fungerar tills en av dem slutar orka. Här hänger det inte på att SwitchBot finns kvar om fem år.\n\nDen är också minst i klassen, 42 × 36 × 16 millimeter mot Meross 94, vilket märks när den ska sitta på en motorenhet i taket. Reedkabeln till lägessensorn är 7 meter, alltså tillräckligt även när motorn sitter högt och porten långt bort. Kontot skyddas med tvåstegsverifiering, och betrodda enheter gör att koden bara krävs när du loggar in från en ny telefon.\n\nKoden går däremot till e-posten, och den som kommer åt din e-post kommer därmed förbi den. Meross löser det med en autentiseringsapp i telefonen, som ingen kan komma åt utifrån, och skillnaden är verklig för en produkt vars uppgift är att öppna en dörr till huset.\n\nBygger du ett hem där varje ny pryl ska tala samma standard är den här rätt köp, och den är dessutom 16 kronor billigare. Ska du bara få upp porten från mobilen och vill ha det starkaste kontoskyddet tar du Meross.",
  },
  {
    id: "yale-smart-opener",
    brand: "Yale",
    name: "Smart Opener för motordrivna garageportar",
    shortName: "Yale Smart Opener",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "yale-smart-opener"),
    tagline: "Öppnar av sig själv när du svänger in på uppfarten.",
    scores: {
      /* Matas från portöppnaren, ingen 230 V-inkoppling, positionssensor
         ingår i lådan. Skruvmejseljobb. */
      installation: 4.5,
      /* Tvåfaktor med kod via e-post eller telefonnummer, plus AES- och
         TLS-kryptering och BLE. Enda produkten som publicerar krypteringen,
         men kodutskicket är ett steg under Meross autentiseringsapp. */
      sakerhet: 4.5,
      /* Google, Alexa och Yales eget ekosystem, men inget HomeKit alls och
         ingen Matter. Det är den enda produkten som stänger ute Apple helt. */
      ekosystem: 2.5,
      /* Takskjutportar och vipportar utskrivet, alltså den enda som pekar ut
         porttyp i klartext, men utan modellista över öppnare. */
      kompatibilitet: 4,
      /* 1 690 kr mot 499 för Meross. Du betalar för geotaggningen och för det
         enda oberoende testet i kategorin. */
      prisvarde: 2,
    },
    price: 1690,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-smart-opener-for-motordrivna-garageportar-p66156",
    award: "premium",
    superlative: "Bäst för handsfree-öppning",
    pros: [
      "Öppnar automatiskt när telefonen närmar sig och stänger när du gått in i huset",
      "AES- och TLS-kryptering mellan telefon, modul och tjänst, den enda som anger den",
      "Tvåstegsverifiering med kod via e-post eller telefonnummer",
      "Utpekad för både takskjutport och vipport, den enda som namnger porttyperna",
      "Matas från portöppnaren, så den behöver inget eget uttag i garaget",
    ],
    cons: [
      "Inget HomeKit och ingen Matter, så den är utesluten i ett Apple-hem",
      "1 690 kronor, mer än tre gånger Meross som gör samma sak och når fler system",
      "Röststyrning via Google kräver att du knappar in en kod varje gång",
      "Kräver stabil wifi i garaget, vilket sällan finns där täckningen tar slut",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 690 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "Från portöppnaren", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Nej", highlight: true },
      { label: "Kontoskydd", shortLabel: "Konto", value: "Tvåfaktor, AES och TLS", highlight: true },
      { label: "HomeKit", shortLabel: "HomeKit", value: "Nej", highlight: true },
      { label: "Ekosystem", value: "Google Home, Amazon Alexa, Yale Home", highlight: true },
      { label: "Passar porttyp", shortLabel: "Passar", value: "Takskjutport och vipport", highlight: true },
      { label: "Positionssensor", value: "Ja, ingår, 70 × 46 × 21 mm" },
      { label: "Statusbesked i app", value: "Ja" },
      { label: "Kräver hubb", value: "Nej" },
      { label: "Matter", value: "Nej" },
      { label: "Kryptering", value: "AES och TLS, BLE" },
      { label: "Aviseringar", value: "Ja" },
      { label: "Anslutning", value: "Wifi 2,4 GHz och Bluetooth" },
      { label: "Antal portar", value: "1 st" },
      { label: "Mått", value: "50 × 50 × 32 mm" },
      { label: "Artikelnummer", value: "66156" },
    ],
    verdict:
      "Yale Smart Opener kostar 1 690 kronor och är den enda modulen här som öppnar porten utan att du rör telefonen.\n\n**Geotaggningen är hela argumentet.** Porten går upp när bilen svänger in på uppfarten och stängs när du gått in i huset, vilket är skillnaden mellan en app du öppnar och en port som bara fungerar. Det är också den enda modulen någon svensk redaktion har monterat och skrivit om, och den enda som pekar ut både takskjutport och vipport i klartext, så du vet före köpet att den passar din port och inte bara din öppnare.\n\nKontoskyddet är gott: tvåstegsverifiering med kod via e-post eller telefonnummer, och trafiken mellan telefon, modul och tjänst är krypterad med AES och TLS. Den är ensam om att ange krypteringen. Strömmen tas från portöppnaren, så modulen behöver inget eget uttag i taket, och lägessensorn ligger i lådan.\n\n**Sedan kommer bristen som avgör för många: det finns inget HomeKit och ingen Matter.** Är hemmet byggt kring Apple faller den bort, och det spelar ingen roll hur bra resten är. Röststyrning via Google kräver dessutom en kod varje gång, vilket är rimligt för en garageport och tröttsamt i vardagen.\n\nVill du att porten sköter sig själv när du kommer hem är 1 191 kronor extra värt det, förutsatt att hemmet inte är byggt kring Apple. Är det det finns ingen väg runt, och då är Meross både billigare och den enda vägen in i Apple Home.",
  },
  {
    id: "ismartgate-lite",
    brand: "iSmartGate",
    name: "Garageöppnare Lite, 1 port",
    shortName: "iSmartGate Lite",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "ismartgate-lite"),
    tagline: "Kopplar ihop porten med en kamera du redan har.",
    scores: {
      /* USB och batterier, ingen fast installation. Två kablar till öppnaren
         plus sensor. */
      installation: 4,
      /* Ingen publicerad tvåfaktor, men arkitekturen tar bort molnet: data och
         inställningar ligger i enheten, reläservrarna lagrar ingenting, och
         porten nås över hemmets nät när internet ligger nere. Ett intrång
         träffar en enhet i stället för hela användarbasen.
         Källa: ismartgate.com/sv/saker-garageport, läst 2026-08-06. */
      sakerhet: 4,
      /* Inbyggt HomeKit och Google Assistant, plus SmartThings och IFTTT.
         Alexa går via IFTTT utanför USA, vilket är ett extra steg. Ingen
         Matter på Lite. */
      ekosystem: 4,
      /* Garage och grindar av olika märken, men Chamberlain och LiftMaster med
         Security+2.0 kräver en extra omkopplaradapter. */
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
      "Visar bild från en kamera du redan har, tillsammans med portens läge",
      "Inbyggt HomeKit och Google Assistant, alltså rösten utan omvägar i ett Apple-hem",
      "Data och inställningar ligger i enheten hemma hos dig, inte i en molntjänst",
      "Porten går att öppna över hemmets wifi även när internet ligger nere",
      "Hanterar flera användare med egna konton, så ingen behöver dela lösenord",
    ],
    cons: [
      "2 109 kronor, mer än fyra gånger Meross som styr samma port",
      "Lite-versionen klarar en enda port, för fler krävs den dyrare Pro",
      "En Chamberlain eller LiftMaster med Security+2.0 kräver en extra omkopplaradapter",
      "Alexa går via IFTTT utanför USA, alltså ett steg till att sätta upp",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 109 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "USB och batterier", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Nej", highlight: true },
      { label: "Kontoskydd", shortLabel: "Konto", value: "Lokalt, data lagras i enheten", highlight: true },
      { label: "HomeKit", shortLabel: "HomeKit", value: "Ja, inbyggt", highlight: true },
      { label: "Ekosystem", value: "HomeKit, Google, SmartThings, IFTTT", highlight: true },
      { label: "Passar porttyp", shortLabel: "Passar", value: "Garage och grind, olika märken", highlight: true },
      { label: "Positionssensor", value: "Ja, ingår" },
      { label: "Statusbesked i app", value: "Ja" },
      { label: "Kräver hubb", value: "Nej" },
      { label: "Matter", value: "–" },
      { label: "Kryptering", value: "–" },
      { label: "Aviseringar", value: "Ja" },
      { label: "Videoövervakning", value: "Ja, integrerar befintlig kamera" },
      { label: "Flera användare", value: "Ja, egna konton" },
      { label: "Antal portar", value: "1 st" },
      { label: "GTIN", value: "8437022462738" },
    ],
    verdict:
      "iSmartGate Lite kostar 2 109 kronor och är den enda modulen här som kan visa dig porten i stället för att bara berätta om den.\n\n**Den lägger in en kamera du redan har i samma vy som portens läge.** Skillnaden mot en avisering är att du ser varför porten står öppen: om bilen är på väg ut, om någon lastar av, eller om ingen är där. Det är den funktion som gör att en modul fortfarande används efter första månaden, och ingen annan här har den.\n\n**Den är också byggd tvärtemot resten.** Data, användarlista och inställningar ligger i enheten i ditt garage och inte i en molntjänst, och servrarna däremellan kopplar bara ihop telefonen med enheten utan att spara något. Två saker följer av det. Ligger internet nere når du fortfarande porten från hemmets wifi, medan de andra fem blir vanliga fjärrkontroller. Och den dag en molnplattform i den här branschen blir hackad exponeras alla dess användare på en gång; här finns ingen sådan hög att komma åt. Flera användare kan dessutom ha egna konton, vilket löser hushållet där fyra personer ska in men ingen ska dela lösenord.\n\nPriset är svårt att försvara. 2 109 kronor är över fyra gånger Meross 499 för att styra en enda port, och Lite klarar just en. Har du en Chamberlain eller LiftMaster med Security+2.0, alltså den med gul inlärningsknapp, tillkommer dessutom en omkopplaradapter.\n\nHar du redan en kamera i garaget, eller vill du att porten ska fungera utan att någon annans server är uppe, är den värd pengarna. Ska du bara kunna öppna och stänga betalar du fyra gånger för mycket.",
  },
  {
    id: "tuya-wgm2",
    brand: "RTX",
    name: "Smart Wifi garageportskontroll WGM2 med sensor",
    shortName: "Tuya WGM2",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "tuya-wgm2"),
    tagline: "Larmar när porten öppnas utan att du bett om det.",
    scores: {
      /* 230 V och kopplingsdosa. Kräver registrerat elinstallationsföretag,
         vilket är kategorins tyngsta enskilda nackdel. */
      installation: 1.5,
      /* Kontoskyddet i Smart Life har inte gått att fastställa, se
         filhuvudet. Larm vid obehörig öppning och händelsehistorik är däremot
         verkliga säkerhetsfunktioner som ingen dyrare modul marknadsför. */
      sakerhet: 3,
      /* Google Assistant och Alexa via Tuya/Smart Life. Ingen Matter, ingen
         HomeKit. */
      ekosystem: 2.5,
      /* "Valfri grindmekanism med en standardingång" är den bredaste
         mekaniska kompatibiliteten i jämförelsen. */
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
      "46 × 51 × 18 millimeter, alltså liten nog att gömmas bakom väggknappen",
    ],
    cons: [
      "Matas med 230 volt och ska sitta i en kopplingsdosa, alltså ett jobb för elfirma",
      "Priset i hyllan är inte priset i garaget när elektrikern räknas in",
      "Inget HomeKit och ingen Matter, så Apple-hemmet står utanför",
      "Wifi ut till 30 meter på 2,4 GHz, alltså knappt över en villatomt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "384 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "230 V AC", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Ja", highlight: true },
      { label: "Kontoskydd", shortLabel: "Konto", value: "Smart Life-konto, larm vid öppning", highlight: true },
      { label: "HomeKit", shortLabel: "HomeKit", value: "Nej", highlight: true },
      { label: "Ekosystem", value: "Google Assistant, Alexa, Tuya/Smart Life", highlight: true },
      { label: "Passar porttyp", shortLabel: "Passar", value: "Alla med ingång för normalt öppen knapp", highlight: true },
      { label: "Positionssensor", value: "Ja, tungkontakt ingår" },
      { label: "Statusbesked i app", value: "Ja" },
      { label: "Kräver hubb", value: "Nej" },
      { label: "Matter", value: "Nej" },
      { label: "Kryptering", value: "–" },
      { label: "Aviseringar", value: "Ja, inklusive larm vid obehörig öppning" },
      { label: "Anslutning", value: "Wifi 2,4 GHz, upp till 30 m" },
      { label: "Antal portar", value: "1 st" },
      /* Botland, hemmamarknadens produktsida för RTX WGM2, samma GTIN.
         "Wymiary: 46 x 51 x 18 mm", "Zasilanie: od 100 V do 240 V",
         drifttemperatur 0–50 °C. Läst 2026-08-06. */
      { label: "Mått", value: "46 × 51 × 18 mm" },
      { label: "Drifttemperatur", value: "0 °C till 50 °C" },
      { label: "GTIN", value: "5903794123663" },
    ],
    verdict:
      "Tuya WGM2 kostar 384 kronor och har den mest genomtänkta larmfunktionen i jämförelsen.\n\n**Öppningssensorn används till mer än att visa status.** Varje gång porten öppnas utan att kommandot kom från appen skickas ett meddelande, och varje händelse sparas i en historik du kan bläddra i. Det gör modulen till en enkel inbrottsindikator för garaget och inte bara till en fjärrkontroll, och det är en funktion de dyrare modulerna inte har. Den passar dessutom nästan vad som helst, alltså varje portmekanism med en ingång för en normalt öppen knapp, och 46 × 51 × 18 millimeter ryms bakom väggknappen där den inte syns.\n\n**Sedan kommer det som avgör.** Modulen matas med 230 volt och är konstruerad för att sitta i en kopplingsdosa bakom knappen. Att lägga in en relämodul i den fasta installationen kräver ett registrerat elinstallationsföretag, och då är 384 kronor inte vad produkten kostar. Med ett par timmars arbete inräknat är den här den dyraste modulen i jämförelsen, inte den billigaste.\n\nTill det kommer att Apple står utanför helt, och att räckvidden är angiven till 30 meter, vilket i ett garage med betongvägg mellan sig och routern är mindre marginal än det låter.\n\nSka en elektriker ändå dra el i garaget är det här ett billigt tillskott medan väggen är öppen. Ska du montera själv i helgen ska du inte köpa den, och då är Meross MSG100 för 115 kronor mer det du letar efter.",
  },
  {
    id: "garageportsbrytarrela",
    brand: "GOMEDIA",
    name: "Garageportsbrytarrelä med reedbrytare",
    shortName: "Brytarrelä + reed",
    image: productImage(SMART_GARAGEPORTSOPPNARE.slug, "garageportsbrytarrela"),
    tagline: "Billigast av modulerna, och visar ändå om porten är öppen.",
    scores: {
      /* Kopplingsdosa på minst 60 mm, alltså fast installation. */
      installation: 1.5,
      /* Kontoskyddet i Smart Life har inte gått att fastställa. Till skillnad
         från WGM2 saknar den larm vid obehörig öppning, alltså finns ingen
         säkerhetsfunktion att väga in i stället. */
      sakerhet: 2.5,
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
      "Går in i Smart Life tillsammans med lampor, uttag och sensorer du redan har",
      "Tar strömmen direkt ur dosan, så ingen adapter behöver få plats i taket",
    ],
    cons: [
      "Ska sitta i en kopplingsdosa på minst 60 millimeter, alltså ett jobb för elfirma",
      "Inget larm vid obehörig öppning, vilket WGM2 ger för 10 kronor mer",
      "Inget HomeKit och ingen Matter, så Apple-hemmet står utanför",
      "Priset i hyllan är inte priset i garaget när elektrikern räknas in",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "374 kr", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "230 V AC", highlight: true },
      { label: "Kräver elinstallatör", shortLabel: "Elfirma", value: "Ja", highlight: true },
      { label: "Kontoskydd", shortLabel: "Konto", value: "Smart Life-konto", highlight: true },
      { label: "HomeKit", shortLabel: "HomeKit", value: "Nej", highlight: true },
      { label: "Ekosystem", value: "Google Assistant, Alexa, Tuya/Smart Life", highlight: true },
      { label: "Passar porttyp", shortLabel: "Passar", value: "Alla med ingång för mekanisk knapp", highlight: true },
      { label: "Positionssensor", value: "Ja, reedbrytare ingår" },
      { label: "Statusbesked i app", value: "Ja" },
      { label: "Kräver hubb", value: "Nej" },
      { label: "Matter", value: "Nej" },
      { label: "Kryptering", value: "–" },
      { label: "Aviseringar", value: "Ja" },
      { label: "Anslutning", value: "Wifi 2,4 GHz" },
      { label: "Antal portar", value: "1 st" },
      /* Hemmamarknadens produktsida, samma GTIN: tillverkare GOMEDIA,
         artikel QS-WIFI-C03. "Zasilanie 230V - nie wymaga dodatkowego
         zasilania" och måtten valda för dosa med minst 60 mm diameter.
         wasserman.eu, läst 2026-08-06. */
      { label: "Mått", value: "Ryms i dosa från 60 mm" },
      { label: "Modell", value: "QS-WIFI-C03" },
      { label: "GTIN", value: "5904553905926" },
    ],
    verdict:
      "Garageportsbrytarreläet kostar 374 kronor och är den billigaste modulen i jämförelsen.\n\n**Den kan ändå det som spelar mest roll:** en reedbrytare ingår, och appen visar om porten står öppen eller stängd. Det är värt att säga rakt ut, eftersom man lätt antar att den billigaste bara trycker på knappen i blindo. Skillnaden mot moduler för fem gånger priset är mindre än prislappen antyder. Den passar dessutom nästan vad som helst med en ingång för en mekanisk knapp, den tar strömmen direkt ur dosan utan att någon adapter behöver få plats i taket, och ligger den i Smart Life kan porten kopplas ihop med lampor och sensorer du redan har där.\n\n**Men den ska sitta i en kopplingsdosa på minst 60 millimeter.** Att lägga in ett relä i den fasta installationen är arbete för ett registrerat elinstallationsföretag, och därmed bär de 374 kronorna en osynlig kostnad flera gånger produktens pris.\n\nDen saknar också larmet vid obehörig öppning. WGM2 kostar 10 kronor mer, kräver samma elektriker och skickar ett meddelande när porten går upp utan att någon bett om det, vilket är hela skillnaden mellan en fjärrkontroll och något som håller ett öga på garaget.\n\nDen som redan har elektrikern på plats bör lägga de tio kronorna på WGM2 i stället. Ska du lösa garaget i helgen med en skruvmejsel är den här fel produkt, oavsett vad den kostar.",
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
    name: "MSG100HK",
    approxPrice: 569,
    merchant: "m.nu",
    merchantUrl:
      "https://www.m.nu/rela-wifi/smart-garageportsoppnare-med-stod-for-homekit",
    reason:
      "Samma modul som vår vinnare, 70 kronor dyrare. HK-suffixet står kvar från den tid då HomeKit-stödet krävde en egen artikel, men den MSG100 som säljs i dag anges av Meross själva stödja Apple HomeKit, Google, Alexa och SmartThings. Två poster som bara skiljer sig på priset hjälper ingen som väljer, så vi rankar den billigare. Betalar du 70 kronor mer får du samma sak.",
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
      "Det beror på hur kontot skyddas, och där skiljer sig modulerna mer än priset antyder. Modulen flyttar en dörr till ditt hus ut på internet, vilket betyder att den som kommer åt ditt konto kommer in i garaget. Det viktigaste skyddet heter tvåstegsverifiering: utöver lösenordet krävs en engångskod, så att ett läckt lösenord inte räcker. Meross hämtar koden ur en autentiseringsapp i din telefon, vilket är det starkaste skyddet i jämförelsen, eftersom en sådan kod inte går att komma åt genom att kapa ett e-postkonto eller flytta ett telefonnummer. Yale och SwitchBot skickar koden till e-post eller telefon, alltså ett steg svagare men långt bättre än inget. Yale anger dessutom AES- och TLS-kryptering av trafiken. iSmartGate löser det från andra hållet och håller användare och inställningar i enheten hemma hos dig. Oavsett vilken du väljer: slå på tvåstegsverifiering direkt, använd ett lösenord du inte använt någon annanstans, och koppla loss gamla telefoner från kontot när du byter.",
  },
  {
    question: "Fungerar de med Apple HomeKit?",
    answer:
      "Fyra av sex gör det, och två gör det inte. Meross MSG100 och iSmartGate Lite har inbyggt HomeKit-stöd. SwitchBot når Apple Home via Matter, alltså den gemensamma standarden som Apple, Google, Alexa och Samsung alla talar, vilket är den lösning som håller längst eftersom den inte hänger på att tillverkaren orkar underhålla stöd för varje plattform var för sig. Yale Smart Opener stöder inte HomeKit alls, och det gör inte heller de två 230-voltsmodulerna i Tuyas Smart Life. Kör du Apple hemma är alltså det billigaste rätta valet Meross på 499 kronor, och den dyraste modulen på sidan, Yale för 1 690, är den du inte ska köpa.",
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
      "Räkna med 400 till 700 kronor för en modul du monterar själv. SwitchBot kostar 483 kronor och Meross MSG100 499, och båda tas i drift med en medföljande adapter, vilket betyder att priset i butiken är hela kostnaden. Vill du att porten ska öppna sig själv när du kommer hem får du gå upp till Yale Smart Opener på 1 690 kronor. Över 2 000 kronor betalar du för videointegration och för att slippa molnet. Under 400 kronor finns moduler som matas med 230 volt, och där tillkommer en elektriker, vilket gör dem till de dyraste i praktiken.",
  },
];
