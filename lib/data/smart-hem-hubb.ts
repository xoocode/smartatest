import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { SMART_HEM_HUBB } from "@/lib/test-pages";

/**
 * Smart hem-hubb. Underlag i .agent/research/smart-hem-hubb.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, artikelnummer, radiouppsättning,
 * anslutningssätt och uppgifter om lokal drift. Läst 2026-08-04 (priser) och
 * kontrollerat om 2026-08-06 hos Kjell och på tillverkarnas egna sidor.
 *
 * **Vår klassificering:** raden `Sort`. Den är vår slutsats ur tillverkarens
 * egen beskrivning, inte butikens rubrik, och den står i klartext på sidan.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte kopplat in någon
 * hubb och inte dragit ur någon internetkabel.
 *
 * ## Sidans fynd: tre produkter, ett ord
 *
 * | Sort | Vad den når | Exempel här |
 * |---|---|---|
 * | Märkesbrygga | bara sitt eget märke | Plejd Gateway, Hue Bridge Pro |
 * | Matter-controller | andra tillverkares Matter-enheter | Aqara M3 och M100, IKEA Dirigera |
 * | Universell hubb | varje radio, lokalt | Homey Pro, Home Assistant Green |
 *
 * Alla står i samma butikskategori, från 329 till 4 999 kronor.
 *
 * ## ⚠️ Researchpasset 2026-08-06 rev fyra påståenden om saknade uppgifter
 *
 * Sidan byggdes på att flera tillverkare inte publicerar om hubben når andra
 * märken eller kör utan internet. Fyra av de påståendena var fel, och tre av
 * dem stod på den butikssida vi redan länkade till.
 *
 * 1. **Aqara M3 har en 360° IR-blaster.** Vi skrev i en nackdel att den saknar
 *    infraröd. Kjells egen produkttext för artikel 57869 listar den.
 * 2. **Aqara M3 kör lokalt.** "Edge-hubb – automatisering och styrning sker
 *    lokalt i stället för i molnet", samma produktsida. Vi skrev "Ej angivet".
 * 3. **Aqara M100 är Matter Controller.** "Hub M100 fungerar som både Matter
 *    Bridge och Matter Controller", artikel 56569. Vi skrev "Ej angivet" med
 *    motiveringen att M3:s besked inte får lånas till M100. Motiveringen var
 *    riktig och slutsatsen ändå fel: M100 har ett eget besked.
 * 4. **Hue Bridge kör lokalt.** Philips egen Matter-guide har raden "Local
 *    control (offline) ✅" för uppsättning med brygga.
 *
 * Två fel av annat slag hittades samtidigt, båda till produktens nackdel:
 *
 * 5. **Home Assistant Green har inga inbyggda radior alls.** Vi angav "Wifi,
 *    Zigbee, Thread, Matter. Z-Wave via sticka". Nabu Casas egen sida: Zigbee
 *    och Thread kräver Connect ZBT-2, Z-Wave och Bluetooth kräver en sticka
 *    från tredjepart, och nätverket är gigabit Ethernet. Ingen wifi.
 * 6. **Homey Pro mini saknar även Z-Wave och Bluetooth.** Vi angav dem som
 *    inbyggda och skrev att skillnaden mot storebror var infraröd och 433 MHz.
 *    Athom och Kjell är överens: Z-Wave, BLE, IR och 433 MHz kräver Homey
 *    Bridge, som säljs separat för 799 kronor hos Kjell.
 *
 * ⚠️ **Kvar som en verklig konflikt: Hue och riktningen.** Kjell skriver att
 * du med Matter "dessutom [kan] lägga till produkter från flera tillverkare".
 * Philips två egna dokument beskriver uteslutande riktningen utåt, och varje
 * Matter-controller de namnger är någon annans nav (HomePod mini, Nest Hub,
 * Echo). Vi följer tillverkaren före butiken och skriver vad bryggan gör:
 * lämnar Hue vidare utåt. Se .agent/research/smart-hem-hubb.md.
 *
 * ⚠️ **Fyll aldrig i en sort ur en systermodell.** Varje rad nedan har ett eget
 * belägg på produktens egen sida.
 *
 * ## Sju av åtta länkar till Kjell
 *
 * Kjell är den enda svenska butik vi hittat med en egen hubbkategori, 33
 * artiklar. Den ligger dessutom på 5 % / 30 dagar i Adtraction, alltså sajtens
 * bästa kartlagda villkor. Koncentrationen är en svaghet och står utskriven i
 * "Vem har kontrollerat det här?" på sidan. IKEA Dirigera är undantaget och
 * länkar till IKEA, som ligger på 9 % enligt money.md.
 */

export const PRICE_CHECKED = "2026-08-04";

const KJELL = "Kjell & Company";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "athom-homey-pro-2026",
    name: "Homey Pro (2026)",
    shortName: "Homey Pro",
    brand: "Athom",
    image: productImage(SMART_HEM_HUBB.slug, "athom-homey-pro-2026"),
    tagline: "Åtta radior i en låda, och automationerna körs lokalt.",
    scores: {
      rackvidd: 5,
      oberoende: 5,
      upprattande: 4,
      framtid: 4.5,
      prisvarde: 2.5,
    },
    price: 4999,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/athom-homey-pro-2026-smarthubb-for-hela-hemmet-4-gb-ram-2026-p52065",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 13, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för blandade märken",
    pros: [
      "Wifi, Zigbee 3.0, Z-Wave Plus, Bluetooth LE, Matter, Thread, infraröd och 433 MHz",
      "Infraröd och 433 MHz når äldre utrustning ingen modern standard täcker",
      "Automationerna körs i lådan och fungerar även utan internet",
      "Inget abonnemang krävs för grundfunktionerna",
    ],
    cons: [
      "4 999 kronor, dyrast av hubbarna i jämförelsen",
      "Femton gånger priset på den billigaste Matter-controllern",
      "Nätverkskabel kräver Athoms Ethernet-adapter, som säljs separat",
    ],
    specs: [
      { label: "Pris", value: "4 999 kr", highlight: true },
      { label: "Sort", value: "Universell hubb", highlight: true },
      {
        label: "Radior",
        value: "Wifi, Zigbee, Z-Wave, BLE, Matter, Thread, IR, 433 MHz",
        highlight: true,
      },
      { label: "Styr andra märken", value: "Ja", highlight: true },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, all automation körs lokalt",
        highlight: true,
      },
      {
        label: "Thread Border Router",
        shortLabel: "Thread-router",
        value: "Ja",
        highlight: true,
      },
      /* Athom: Homey Pro ansluts över wifi. Ethernet-adaptern är ett
      tillbehör för 29 USD, läst på homey.app 2026-08-06. */
      {
        label: "Anslutning",
        value: "Wifi 2,4/5 GHz, Ethernet via adapter",
        highlight: true,
      },
      { label: "Abonnemang", value: "Nej, inte för grundfunktioner" },
      { label: "Processor och minne", value: "1,5 GHz fyrkärnig, 4 GB RAM" },
      { label: "Artikelnummer", value: "52065" },
    ],
    verdict:
      "Homey Pro talar åtta radior i samma låda: wifi, Zigbee 3.0, Z-Wave Plus, Bluetooth LE, Matter, Thread, infraröd och 433 MHz. Ingen annan hubb i jämförelsen kommer i närheten, och den kostar 4 999 kronor.\n\nDe två sista radiorna är värda mer än de låter. Infraröd når en luftvärmepump som bara lyder en fjärrkontroll, och 433 MHz når äldre trådlösa givare och rörelsevakter. Det är utrustning som redan sitter i huset, och utan de radiorna står den kvar utanför systemet hur bra hubben än är i övrigt. Automationerna bearbetas dessutom i enheten: går internet ner tänds hallampan av rörelsevakten ändå, och grundfunktionerna kostar ingen månadsavgift.\n\nPriset är det svåra. 4 999 kronor är femton gånger vad Aqaras billigaste controller kostar, och skillnaden betalar sig bara om du faktiskt har blandade märken att samla. Har du enbart Hue-lampor köper du sju radior du aldrig tänder. Hubben ansluts över wifi som standard, så vill du ha den på nätverkskabel kostar Athoms adapter extra.\n\nInnehåller huset enheter från flera tillverkare och några av dem är äldre än Matter är det här köpet. För alla andra: ta Aqara Hub M3 och lägg mellanskillnaden på enheterna i stället.",
  },
  {
    id: "aqara-hub-m3",
    name: "Hub M3",
    shortName: "Aqara M3",
    brand: "Aqara",
    image: productImage(SMART_HEM_HUBB.slug, "aqara-hub-m3"),
    tagline: "Styr både Zigbee-sensorerna och luftvärmepumpen från samma app.",
    scores: {
      rackvidd: 4,
      oberoende: 4,
      upprattande: 4.5,
      framtid: 4.5,
      prisvarde: 4,
    },
    price: 1729,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/aqara-hub-m3-smarta-hem-controller-p57869",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 13, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för hem med fjärrkontrollstyrd utrustning",
    pros: [
      "360-graders infraröd sändare styr luftvärmepump, TV och receiver",
      "Zigbee, Thread, Matter och Bluetooth 5.1 i samma enhet",
      "Automationerna bearbetas i hubben, inte i molnet",
      "Kan strömförsörjas över nätverkskabeln och sitta där eluttag saknas",
    ],
    cons: [
      "Saknar Z-Wave och 433 MHz, så äldre lås och givare nås inte",
      "Strömadapter ingår inte, bara USB-kabeln",
      "1 729 kronor är fem gånger priset på Aqaras egen M100",
    ],
    specs: [
      { label: "Pris", value: "1 729 kr", highlight: true },
      { label: "Sort", value: "Matter-controller", highlight: true },
      {
        label: "Radior",
        value: "Zigbee, Thread, Matter, Bluetooth 5.1, infraröd",
        highlight: true,
      },
      /* Kjell, artikel 57869: "Matter-controller – kan styra
      tredjepartsprodukter". Läst 2026-08-06. */
      {
        label: "Styr andra märken",
        value: "Ja, uttryckligen",
        highlight: true,
      },
      /* Kjell, artikel 57869: "Edge-hubb – automatisering och styrning sker
      lokalt i stället för i molnet". Stod tidigare som Ej angivet. */
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, automationen körs i hubben",
        highlight: true,
      },
      {
        label: "Thread Border Router",
        shortLabel: "Thread-router",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Anslutning",
        value: "Wifi 2,4/5 GHz eller PoE",
        highlight: true,
      },
      { label: "Mått", value: "Ø 105 × 36,5 mm" },
      { label: "Artikelnummer", value: "57869" },
    ],
    verdict:
      "Aqara Hub M3 kostar 1 729 kronor och samlar Zigbee, Thread, Matter och Bluetooth i en enhet som dessutom har en 360-graders infraröd sändare.\n\nDen sändaren är det som skiljer den från allt annat under 2 000 kronor här. Den styr luftvärmepumpen, TV:n och receivern, alltså apparater som lyder en fjärrkontroll och ingenting annat, och den gör det från samma app som sensorerna. Automationerna bearbetas i hubben i stället för i molnet, vilket ger snabbare svar och innebär att rutinerna fortsätter rulla under ett driftstopp. Den kan strömförsörjas över nätverkskabeln, så den går att sätta i ett tak eller en hall där det inte finns något eluttag.\n\nZ-Wave och 433 MHz saknas. Har du ett Z-Wave-lås eller äldre givare på 433 MHz når M3 dem inte, och då är Homey Pro den enda vägen i den här jämförelsen. Strömadaptern ligger heller inte i lådan, bara USB-kabeln.\n\nKöp den om hemmet är byggt på Zigbee och Thread och du vill nå den fjärrkontrollstyrda utrustningen också. Ska den nå Z-Wave kostar rätt hubb 3 270 kronor mer.",
  },
  {
    id: "nabu-casa-home-assistant-green",
    name: "Home Assistant Green",
    shortName: "HA Green",
    brand: "Nabu Casa",
    image: productImage(SMART_HEM_HUBB.slug, "nabu-casa-home-assistant-green"),
    tagline: "Gratis mjukvara som körs lokalt, och du äger datan.",
    scores: {
      rackvidd: 3.5,
      oberoende: 5,
      upprattande: 3,
      framtid: 5,
      prisvarde: 4,
    },
    price: 2199,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/nabu-casa-home-assistant-green-p88430",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 69, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som vill äga sitt hem",
    pros: [
      "Grundfunktionen är gratis och körs lokalt i ditt eget nätverk",
      "Öppen plattform som lever vidare oavsett vad tillverkaren bestämmer",
      "Två USB-portar för de radior du faktiskt behöver",
      "69 kundbetyg, största underlaget bland hubbarna i jämförelsen",
    ],
    cons: [
      "Inga radior i lådan: Zigbee och Thread kräver Connect ZBT-2, Z-Wave en sticka till",
      "Ansluts bara med nätverkskabel, så den måste stå vid routern",
      "Kräver mer av dig vid uppsättningen än en märkesbrygga gör",
    ],
    specs: [
      { label: "Pris", value: "2 199 kr", highlight: true },
      { label: "Sort", value: "Universell hubb", highlight: true },
      /* Nabu Casa, home-assistant.io/green, läst 2026-08-06: inga inbyggda
      radior. Zigbee och Thread via Connect ZBT-2, Z-Wave och Bluetooth
      via tredjepartssticka. Stod tidigare felaktigt som wifi + Zigbee. */
      {
        label: "Radior",
        value: "Inga inbyggda. Zigbee och Thread via ZBT-2, Z-Wave via sticka",
        highlight: true,
      },
      { label: "Styr andra märken", value: "Ja", highlight: true },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, hemmet styrs lokalt",
        highlight: true,
      },
      {
        label: "Thread Border Router",
        shortLabel: "Thread-router",
        value: "Nej, kräver Connect ZBT-2",
        highlight: true,
      },
      { label: "Anslutning", value: "Ethernet, gigabit", highlight: true },
      { label: "Abonnemang", value: "Valfritt, för fjärråtkomst" },
      { label: "Artikelnummer", value: "88430" },
    ],
    verdict:
      "Home Assistant Green kostar 2 199 kronor och kör en mjukvara som är gratis, öppen och helt lokal.\n\nDet är den enda produkten här där oberoendet är själva varan. Hemmet styrs från ditt eget nätverk, datan stannar hos dig, och plattformen lever vidare även om företaget bakom skulle stänga, eftersom källkoden är öppen och underhålls av andra. 69 kundbetyg är dessutom det största underlaget bland hubbarna i jämförelsen, och i en grupp där flera modeller har under tio säger det något om att den används över tid.\n\nLådan innehåller däremot inga radior alls. Green ansluts med nätverkskabel och når enheter över nätverket. Zigbee och Thread kräver Nabu Casas Connect ZBT-2 och Z-Wave en sticka därutöver, så har du Zigbee-sensorer är den verkliga prislappen 2 199 kronor plus dongel. Uppsättningen kräver en kväll och en vilja att läsa dokumentation, till skillnad från en brygga som hittar sina egna lampor på tre minuter.\n\nVill du att hemmet ska fungera oberoende av moln och tillverkare, och tycker att en kväll är ett rimligt pris för det, finns inget bättre köp på den här sidan. Vill du vara klar före middagen är det fel produkt.",
  },
  {
    id: "aqara-smart-hub-m100",
    name: "Smart Hub M100",
    shortName: "Aqara M100",
    brand: "Aqara",
    image: productImage(SMART_HEM_HUBB.slug, "aqara-smart-hub-m100"),
    tagline: "Billigaste vägen till Matter, Thread och lokala automationer.",
    scores: {
      rackvidd: 3.5,
      oberoende: 3.5,
      upprattande: 4.5,
      framtid: 4,
      prisvarde: 5,
    },
    price: 329,
    merchant: KJELL,
    merchantUrl: "https://www.kjell.com/se/aqara-smart-hub-m100-vit-p56569",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 6, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Billigast med lokal drift",
    pros: [
      "329 kronor, billigast av hubbarna i jämförelsen",
      "Både Matter Bridge och Matter Controller, alltså når andra tillverkares enheter",
      "Lokala automationer som fortsätter fungera under ett driftstopp",
      "Thread Border Router som stärker nätet för alla Thread-enheter i huset",
    ],
    cons: [
      "Taket ligger på 40 enheter, varav 20 på Zigbee",
      "Saknar Z-Wave, Bluetooth och infraröd",
      "Sex kundbetyg",
    ],
    specs: [
      { label: "Pris", value: "329 kr", highlight: true },
      { label: "Sort", value: "Matter-controller", highlight: true },
      { label: "Radior", value: "Zigbee, Thread, Matter", highlight: true },
      /* Kjell, artikel 56569: "Hub M100 fungerar som både Matter Bridge och
      Matter Controller". Stod tidigare som Ej angivet. Läst 2026-08-06. */
      {
        label: "Styr andra märken",
        value: "Ja, både bridge och controller",
        highlight: true,
      },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, för lokala automationer",
        highlight: true,
      },
      {
        label: "Thread Border Router",
        shortLabel: "Thread-router",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Anslutning",
        value: "Wifi 6 (2,4 GHz), ström via USB-A",
        highlight: true,
      },
      { label: "Max antal enheter", value: "40, varav 20 Zigbee" },
      { label: "Artikelnummer", value: "56569" },
    ],
    verdict:
      "Aqara M100 kostar 329 kronor och är ändå en fullvärdig Matter-controller: den lägger till och styr andra tillverkares Matter-enheter, inte bara Aqaras egna.\n\nFör en femtedel av vad nästa Aqara i listan kostar får du Zigbee, Thread och Matter, automationer som körs lokalt och fortsätter under ett driftstopp, och en Thread Border Router. Det sista är värt något i sig: varje Thread-enhet i huset får bättre täckning av att den finns, även enheter som styrs av något helt annat. Den drivs från en USB-A-port och kan sitta direkt i routern.\n\nTaket sitter vid 40 enheter, varav 20 på Zigbee. Det räcker gott för en lägenhet och tar slut i ett hus som fylls på i flera år. Z-Wave, Bluetooth och infraröd finns inte alls, så fjärrkontrollstyrd utrustning når den aldrig.\n\nTa den som första hubb, eller som ett billigt sätt att stärka Thread-täckningen i ett hus som redan har en annan. Ska den bära ett helt hus på sikt är taket för lågt.",
  },
  {
    /* Rankad 2026-08-06 efter användarbeslut. Stod tidigare bland de övervägda
       med motiveringen att IKEA inte publicerar om den styr andra märken eller
       kör utan internet, vilket var fel: båda står på IKEA:s egna sidor.
       Enda produkten på sidan som inte länkar till Kjell. */
    id: "ikea-dirigera",
    name: "Dirigera",
    shortName: "IKEA Dirigera",
    brand: "IKEA",
    image: productImage(SMART_HEM_HUBB.slug, "ikea-dirigera"),
    tagline: "Tar 100 enheter och styr andra märkens Matter-produkter.",
    scores: {
      rackvidd: 3.5,
      oberoende: 3.5,
      upprattande: 4,
      framtid: 4.5,
      prisvarde: 3.5,
    },
    price: 899,
    merchant: "IKEA",
    merchantUrl:
      "https://www.ikea.com/se/sv/p/dirigera-hubb-foer-smarta-produkter-vit-smart-10503406/",
    priceCheckedAt: "2026-08-06",
    userRating: { value: 3.6, count: 714, checkedAt: "2026-08-06" },
    superlative: "Bäst för ett hem som växer billigt",
    pros: [
      "Både Matter-brygga och Matter-styrenhet, alltså styr andra märkens Matter-produkter",
      "Tar 100 smarta produkter samtidigt, dubbelt mot föregångaren",
      "Thread Border Router som stärker nätet för alla Thread-enheter i huset",
      "Tillbehören kostar 99 kronor styck, billigast av alla ekosystem här",
    ],
    cons: [
      "3,6 av 5 på 714 omdömen, lägsta kundbetyget bland hubbarna i jämförelsen",
      "Måste stå bredvid routern: den kräver nätverkskabel och har ingen egen wifi",
      "Saknar Z-Wave, Bluetooth och infraröd",
    ],
    specs: [
      { label: "Pris", value: "899 kr", highlight: true },
      { label: "Sort", value: "Matter-controller", highlight: true },
      { label: "Radior", value: "Zigbee, Thread, Matter", highlight: true },
      /* IKEA:s egen produktsida: "Hubben DIRIGERA är en Matter-brygga … Hubben
         DIRIGERA är en Matter-styrenhet. Det innebär att alla Matter-produkter
         som stöds kan anslutas till hubben." Läst 2026-08-06. */
      {
        label: "Styr andra märken",
        value: "Ja, både brygga och styrenhet",
        highlight: true,
      },
      /* IKEA:s kundserviceartikel om internetavbrott beskriver styrning i det
         egna nätverket och tar bara upp Dirigera för tilläggsfunktionen
         "kontroll överallt", som är den som kräver uppkoppling. */
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, styrning i samma nätverk",
        highlight: true,
      },
      /* IKEA dokumenterar inte Thread. Två oberoende tekniska granskningar
         (Matter Alpha, matter-smarthome.de) visar att firmware 2.805.6 aktiverar
         Thread-radion och att hubben kör OpenThread 1.4 som border router.
         Tier B, två samstämmiga källor. */
      {
        label: "Thread Border Router",
        shortLabel: "Thread-router",
        value: "Ja, sedan firmware 2.805.6",
        highlight: true,
      },
      {
        label: "Anslutning",
        value: "Ethernet, ingen egen wifi",
        highlight: true,
      },
      { label: "Max antal enheter", value: "100" },
      { label: "Artikelnummer", value: "105.034.06" },
    ],
    verdict:
      "IKEA Dirigera kostar 899 kronor och är både Matter-brygga och Matter-styrenhet, alltså en hubb som både lämnar IKEA:s egna produkter vidare och tar in andra tillverkares Matter-enheter.\n\nDen tar 100 smarta produkter samtidigt, vilket är mer än dubbelt mot vad de andra Matter-controllerna här klarar, och den fungerar som Thread Border Router så att Thread-enheterna i huset får bättre täckning. Det verkliga argumentet är ändå tillbehören: en rörelsesensor kostar 99 kronor och en smart stickpropp lika mycket. Ska hemmet växa med tjugo enheter är det där pengarna finns, inte i hubben.\n\nKundbetyget är det svaga. 3,6 av 5 på 714 omdömen är lägst av hubbarna här, och det är samtidigt det överlägset största underlaget, så talet väger tyngre än de sexor och sjuor de andra vilar på. Den måste dessutom sitta bredvid routern: hubben kräver nätverkskabel och har ingen egen wifi.\n\nBygger du ett smart hem underifrån och vill att varje ny sensor ska kosta hundralappar i stället för femhundralappar är Dirigera vägen dit. Vill du ha Z-Wave eller styra en luftvärmepump via infraröd når den ingendera.",
  },
  {
    id: "athom-homey-pro-mini",
    name: "Homey Pro Mini",
    shortName: "Homey Pro Mini",
    brand: "Athom",
    image: productImage(SMART_HEM_HUBB.slug, "athom-homey-pro-mini"),
    tagline: "Samma lokala automationer som storebror, i ett mindre chassi.",
    scores: {
      rackvidd: 3,
      oberoende: 4.5,
      upprattande: 4,
      framtid: 4,
      prisvarde: 2.5,
    },
    price: 2999,
    merchant: KJELL,
    merchantUrl: "https://www.kjell.com/se/athom-homey-pro-mini-p52066",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 8, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för ett hem utan äldre radior",
    pros: [
      "Samma app och samma automationsmotor som Homey Pro",
      "All bearbetning sker lokalt, så hemmet fungerar under ett driftstopp",
      "Thread Border Router och Matter i grundutförandet",
      "2 000 kronor billigare än den stora modellen",
    ],
    cons: [
      "Z-Wave, Bluetooth, infraröd och 433 MHz kräver Homey Bridge för 799 kronor extra",
      "Ansluts bara med nätverkskabel, ingen wifi",
      "800 kronor dyrare än Home Assistant Green och 1 270 mer än Aqara Hub M3",
    ],
    specs: [
      { label: "Pris", value: "2 999 kr", highlight: true },
      { label: "Sort", value: "Universell hubb", highlight: true },
      /* Athom och Kjell (artikel 52066) är överens: Z-Wave, BLE, IR och
      433 MHz kräver Homey Bridge, som säljs separat. Wifi och Bluetooth
      stod tidigare felaktigt som inbyggda. Läst 2026-08-06. */
      {
        label: "Radior",
        value:
          "Zigbee, Thread, Matter. Z-Wave, BLE, IR och 433 MHz via Homey Bridge",
        highlight: true,
      },
      { label: "Styr andra märken", value: "Ja", highlight: true },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, all automation körs lokalt",
        highlight: true,
      },
      {
        label: "Thread Border Router",
        shortLabel: "Thread-router",
        value: "Ja",
        highlight: true,
      },
      { label: "Anslutning", value: "Ethernet", highlight: true },
      { label: "Abonnemang", value: "Valfritt, för molnbackup" },
      { label: "Artikelnummer", value: "52066" },
    ],
    verdict:
      "Homey Pro mini kostar 2 999 kronor och ger samma app, samma automationsmotor och samma lokala drift som Homey Pro, i ett mindre chassi.\n\nDet som försvunnit är radiorna, och det är mer än prislappen antyder. Mini talar Zigbee 3.0, Thread och Matter och ansluts med nätverkskabel. Z-Wave, Bluetooth, infraröd och 433 MHz finns inte i lådan utan kräver Homey Bridge, som kostar 799 kronor till. Har du ett Z-Wave-lås eller en luftvärmepump som lyder fjärrkontroll landar du alltså på 3 798 kronor, och då är den stora modellen 1 200 kronor dyrare men färdig från start.\n\nPriset däremellan är svårt att försvara. 2 999 kronor är 800 mer än Home Assistant Green och 1 270 mer än Aqara Hub M3, som båda når mer ur kartongen. Det du betalar för är Homeys app och en färdig upplevelse i stället för en kväll med dokumentation.\n\nVet du att huset bara innehåller Zigbee, Thread och Matter, och vill ha Homeys automationer, är den rätt. Är du osäker på vad huset innehåller blir Homey Pro billigare i slutänden.",
  },
  {
    id: "philips-hue-bridge-pro",
    name: "Hue Bridge Pro",
    shortName: "Hue Bridge Pro",
    brand: "Philips",
    image: productImage(SMART_HEM_HUBB.slug, "philips-hue-bridge-pro"),
    tagline: "Hittar alla Hue-lampor själv och kopplar dem till Apple Home.",
    scores: {
      rackvidd: 2,
      oberoende: 3.5,
      upprattande: 5,
      framtid: 3,
      prisvarde: 3,
    },
    price: 899,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/philips-hue-bridge-pro-brygga-p51982",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 7, checkedAt: PRICE_CHECKED },
    superlative: "Bäst om hemmet är Hue",
    pros: [
      "Enklast av alla att komma igång med: koppla in och den hittar lamporna",
      "MotionAware låter lamporna reagera på rörelse utan separat sensor",
      "Tar 150 ljuskällor och 50 tillbehör",
      "Styrningen sker lokalt i nätverket, så ljuset fungerar utan uppkoppling",
    ],
    cons: [
      "Lämnar Hue utåt men samlar inte andra tillverkares Matter-enheter",
      "899 kronor för en brygga till ett enda märke",
      "Zigbee är enda radion, så Thread-enheter når den inte",
    ],
    specs: [
      { label: "Pris", value: "899 kr", highlight: true },
      { label: "Sort", value: "Märkesbrygga", highlight: true },
      { label: "Radior", value: "Zigbee, Matter utåt", highlight: true },
      /* Philips två egna dokument (Matter-guiden 000012 och works-with/matter)
      beskriver uteslutande riktningen utåt, och varje Matter-controller de
      namnger är någon annans nav. Kjells produkttext säger motsatsen. Vi
      följer tillverkaren. Konflikten står i researchfilen. */
      {
        label: "Styr andra märken",
        value: "Nej, lämnar Hue utåt",
        highlight: true,
      },
      /* Philips Matter-guide, raden "Local control (offline) ✅" för
      uppsättning med brygga. Stod tidigare som Ej angivet. */
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, lokal styrning i nätverket",
        highlight: true,
      },
      {
        label: "Thread Border Router",
        shortLabel: "Thread-router",
        value: "Nej",
        highlight: true,
      },
      { label: "Anslutning", value: "Ethernet", highlight: true },
      { label: "Max antal enheter", value: "150 ljuskällor, 50 tillbehör" },
      { label: "Artikelnummer", value: "51982" },
    ],
    verdict:
      "Hue Bridge Pro kostar 899 kronor, tar 150 ljuskällor och 50 tillbehör, och är den enklaste produkten i jämförelsen att komma igång med. Du kopplar in den, den hittar dina Hue-lampor, och du är klar innan kaffet kallnat.\n\nDen gör Hue bättre på två sätt utöver det. MotionAware låter lamporna reagera på rörelse utan att du köper en separat sensor, och Zigbee-nätet är det stabilaste bland produkterna här, med kryptering genom Trust Center. Styrningen sker lokalt i ditt nätverk, så ljuset lyder dig även när uppkopplingen inte fungerar.\n\nRiktningen är däremot enkelriktad. Bryggan lämnar Hue vidare till Apple Home, Google och Alexa; den samlar inte andra tillverkares Matter-enheter hos sig. 899 kronor är alltså priset för att göra ett enda märke tillgängligt någon annanstans, och Thread-enheter når den inte alls.\n\nHar du Hue och vill styra lamporna från Apple Home eller Google är det här rätt produkt. Ska hemmet samlas under ett tak räcker en Aqara M100 för 329 kronor längre.",
  },
  {
    id: "plejd-gateway",
    name: "Gateway GWY-01",
    shortName: "Plejd Gateway",
    brand: "Plejd",
    image: productImage(SMART_HEM_HUBB.slug, "plejd-gateway"),
    tagline: "Gör ett färdigt Plejd-system styrbart hemifrån.",
    scores: {
      rackvidd: 1.5,
      oberoende: 2,
      upprattande: 4.5,
      framtid: 3,
      prisvarde: 2.5,
    },
    price: 899,
    merchant: KJELL,
    merchantUrl: "https://www.kjell.com/se/plejd-gateway-p51061",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 89, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för ett färdigt Plejd-system",
    pros: [
      "89 kundbetyg med 5,0 i snitt, flest av hubbarna i jämförelsen",
      "Behåller tidsfunktionerna vid strömavbrott, vilket mottagarna ensamma inte gör",
      "Lämnar systemet vidare till HomeKit, Google Home, Alexa, Homey och Verisure",
    ],
    cons: [
      "Styr enbart Plejd-produkter",
      "Kräver en befintlig Plejd-installation för att göra någon nytta alls",
      "Fjärrstyrningen försvinner när internet gör det",
    ],
    specs: [
      { label: "Pris", value: "899 kr", highlight: true },
      { label: "Sort", value: "Märkesbrygga", highlight: true },
      { label: "Radior", value: "Plejd BLE-mesh", highlight: true },
      { label: "Styr andra märken", value: "Nej", highlight: true },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Nej, fjärrstyrningen är hela funktionen",
        highlight: true,
      },
      {
        label: "Thread Border Router",
        shortLabel: "Thread-router",
        value: "Nej",
        highlight: true,
      },
      { label: "Anslutning", value: "Ethernet, RJ45", highlight: true },
      { label: "Artikelnummer", value: "51061" },
    ],
    verdict:
      "Plejd Gateway kostar 899 kronor och gör ett befintligt Plejd-system styrbart utifrån. Den styr enbart Plejd.\n\nFör den som har Plejd i väggarna är det ett rakt köp, och kundbetygen visar det: 5,0 på 89 omdömen, det största underlaget bland hubbarna här. Den behåller dessutom tidsfunktionerna vid strömavbrott, vilket Plejd-mottagarna utan gateway inte gör, och den lämnar systemet vidare till HomeKit, Google Home, Alexa, Homey och Verisure.\n\nUtan Plejd i huset gör den ingenting alls. Plejd monteras av elektriker bakom strömbrytarna, så det är inget du kompletterar med i efterhand. Fjärrstyrningen försvinner också när nätet gör det, eftersom det är hela uppgiften: enheten kopplar meshen till internet och inget mer.\n\nHar huset Plejd och du vill nå det hemifrån är den självklar. Letar du efter något som ska samla flera märken är det här inte en kandidat, och den bör inte stå på samma hylla.",
  },
];

export const SMART_HEM_HUBB_PRODUCTS: Product[] = resolveProducts(
  SMART_HEM_HUBB,
  SEEDS,
);

/**
 * Övervägda men inte rankade.
 *
 * De två USB-stickorna är inte hubbar utan radior till en dator som redan
 * finns, och de hör hemma här just därför: butiken sorterar dem tillsammans
 * med hubbarna.
 *
 * ⚠️ IKEA Dirigera stod här till 2026-08-06 med motiveringen att IKEA inte
 * publicerar om den styr andra märken eller kör utan internet. Det var fel:
 * IKEA skriver ut båda på sin egen svenska sida. Produkten är nu rankad, efter
 * användarbeslut samma dag.
 */
export const SMART_HEM_HUBB_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Aqara",
    name: "Hub M200",
    reason:
      "599 kronor för Matter, Zigbee 3.0 och Thread, mitt emellan M100 och M3 i både pris och räckvidd, med en inbyggd IR-sändare som M100 saknar. Vi rankar de två ytterlägena eftersom de visar spannet tydligare: den billigaste som ändå kör lokalt, och den som lägger infraröd och PoE till samma grund. M200 hamnar mellan dem utan att flytta någon gräns.",
    approxPrice: 599,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/aqara-hub-m200-smart-hub-med-matter-zigbee-och-thread-p56570",
  },
  {
    brand: "Philips",
    name: "Hue Bridge",
    reason:
      "599 kronor, 300 mindre än Bridge Pro som vi rankar. Samma sort och samma riktning utåt, men utan MotionAware och med lägre tak för antalet lampor. Vi tog Pro-modellen eftersom den är den som säljs till nya kunder i dag; har du ett mindre Hue-system gör grundmodellen samma jobb billigare.",
    approxPrice: 599,
    merchant: "Kjell & Company",
    merchantUrl: "https://www.kjell.com/se/philips-hue-bridge-brygga-p50840",
  },
  {
    brand: "TP-Link",
    name: "Tapo H200",
    reason:
      "399 kronor, tar 64 enheter och fyra kameror och har inbyggd siren och lokal inspelning på micro-SD. Den är ett nav för Tapos egna sensorer och kameror snarare än en hubb i den mening sidan handlar om. Har du Tapo-produkter är den rätt; ska den samla flera märken är den det inte.",
    approxPrice: 399,
    merchant: "Kjell & Company",
    merchantUrl: "https://www.kjell.com/se/tp-link-tapo-h200-smart-hub-p65276",
  },
  {
    brand: "Nabu Casa",
    name: "Connect ZBT-2 och Connect ZWA-2",
    reason:
      "USB-stickor som ger Zigbee respektive Z-Wave till en dator som redan kör Home Assistant. De är inte hubbar utan radior, och de står ändå på samma hylla som hubbarna, vilket är precis den sammanblandningen sidan handlar om. ZBT-2 är dessutom det tillbehör Home Assistant Green behöver för att nå Zigbee och Thread, så den hör till kostnaden för den produkten.",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/nabu-casa-home-assistant-connect-zbt-2-p88438",
  },
  {
    brand: "Aeotec",
    name: "Z-Stick Gen 7",
    reason:
      "Samma sak som Nabu Casas stickor fast för Z-Wave, och den kompletterar Home Assistant Green som saknar radion. Den är alltså ett tillbehör till en av produkterna vi rankar snarare än en konkurrent till dem, och den räknas in i den verkliga kostnaden för Green om du har Z-Wave-enheter.",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/aeotec-z-stick-gen-7-usb-adapter-p52098",
  },
];

/**
 * Vanliga frågor.
 *
 * ⚠️ Ingen fråga får slå ihop sorterna. En märkesbrygga, en Matter-controller
 * och en universell hubb löser olika problem, och svaret ska säga vilken sort
 * frågan gäller.
 */
export const SMART_HEM_HUBB_FAQ = [
  {
    question: "Vilken smart hem-hubb är bäst 2026?",
    answer:
      "Athom Homey Pro för 4 999 kronor hos Kjell, om hemmet innehåller enheter från flera tillverkare. Den talar åtta radior i samma låda: wifi, Zigbee 3.0, Z-Wave Plus, Bluetooth LE, Matter, Thread, infraröd och 433 MHz, och de två sista når äldre utrustning som ingen modern standard bryr sig om. Automationerna körs lokalt och grundfunktionerna kräver inget abonnemang. Vill du ha nästan samma räckvidd för en tredjedel är Aqara Hub M3 på 1 729 kronor svaret; den saknar Z-Wave och 433 MHz men har infraröd, Thread och lokal drift.",
  },
  {
    question: "Behöver jag verkligen en hubb?",
    answer:
      "Ofta inte. Enheter som talar wifi, exempelvis de flesta smarta uttag och kameror, ansluter direkt till routern och behöver ingenting mer. Hubben behövs när enheterna talar Zigbee, Z-Wave eller Thread, eftersom de radiorna inte finns i en vanlig router, och när du vill att automationer ska köras även om internet ligger nere. Har du en enda smart lampa och en app som fungerar är en hubb en lösning på ett problem du inte har.",
  },
  {
    question: "Vad är skillnaden mellan en hubb och en brygga?",
    answer:
      "En brygga talar med sitt eget märke och lämnar det vidare utåt till andra system. Plejd Gateway är det tydligaste exemplet: den gör ett befintligt Plejd-system styrbart hemifrån och integrerar mot HomeKit, Google Home, Alexa och Homey, men den styr enbart Plejd-produkter. En universell hubb går åt andra hållet och samlar enheter från flera tillverkare hos sig. Båda säljs under ordet hubb i samma butikskategori, och prislappen skiljer dem inte åt: bryggan kostar 899 kronor medan en Matter-controller som når flera märken kostar 329.",
  },
  {
    question: "Vad betyder det att en hubb stöder Matter?",
    answer:
      "Mindre än man tror, eftersom ordet täcker två motsatta roller. En Matter-controller kan lägga till och styra andra tillverkares Matter-enheter. En Matter-bridge gör tvärtom och lämnar sina egna enheter vidare till andra system. Båda skriver Matter på förpackningen. Aqara M100 för 329 kronor är båda delarna, medan Philips Hue Bridge Pro för 899 bara går åt ena hållet: den gör Hue tillgängligt i Apple Home, Google och Alexa. Fråga i vilken riktning stödet går innan du köper på ordet.",
  },
  {
    question: "Fungerar hubben om internet ligger nere?",
    answer:
      "Sju av de åtta vi rankar fortsätter fungera. Homey Pro och Homey Pro mini bearbetar all automation i enheten, Home Assistant körs lokalt i ditt eget nätverk, Aqara M3 är en så kallad edge-hubb som hanterar automationerna i hubben, Aqara M100 kör sina lokala automationer vidare, och både Hue Bridge och IKEA Dirigera styr sina enheter över det egna nätverket. Undantaget är Plejd Gateway, och där är det inte ett fel utan definitionen: dess enda uppgift är att koppla Plejd-meshen till internet, så fjärrstyrningen försvinner med uppkopplingen.",
  },
  {
    question: "Vilken hubb ska jag välja till Philips Hue?",
    answer:
      "Har du bara Hue räcker Hue Bridge, och den är enklast av alla att komma igång med: koppla in den och den hittar lamporna. Bridge Pro kostar 899 kronor, tar 150 ljuskällor och lägger till MotionAware, medan grundmodellen kostar 599. Vill du styra lamporna från Apple Home eller Google löser bryggan det. Vill du däremot samla Hue tillsammans med andra märken behöver du en Matter-controller eller en universell hubb, eftersom bryggan lämnar Hue utåt men inte tar in andra tillverkares enheter.",
  },
  {
    question: "Kan jag ha två hubbar hemma?",
    answer:
      "Ja, och det är vanligare än man skulle tro. Ett hem har ofta en märkesbrygga för lamporna och en universell hubb för allt annat, och de talar med varandra via Matter eller via molntjänsternas integrationer. Det kostar en apparat till och en app till, men det är ofta enklare än att flytta ett fungerande lampsystem. Har du redan en brygga är frågan inte om du ska byta ut den utan vad den inte når.",
  },
  {
    question: "Vad är Thread och behöver jag en Thread Border Router?",
    answer:
      "Thread är ett radionät för batteridrivna enheter, byggt så att enheterna vidarebefordrar varandras signaler och nätet blir starkare ju fler de är. En Thread Border Router är bryggan mellan det nätet och ditt vanliga hemnätverk, och utan en sådan når Thread-enheterna ingenting. Fem av de åtta vi rankar är border router: Homey Pro, Homey Pro mini, Aqara M3, Aqara M100 och IKEA Dirigera. Den billigaste kostar 329 kronor och stärker täckningen för alla Thread-enheter i huset även om något annat styr dem.",
  },
  {
    question: "Vad kostar en smart hem-hubb?",
    answer:
      "Hubbarna vi jämför kostar mellan 329 och 4 999 kronor, alltså femton gånger, och priset säger nästan ingenting om vad de når. Den billigaste är en Matter-controller som kör lokala automationer och fungerar som Thread Border Router. En produkt mitt i prislistan kan vara en brygga som bara talar med sitt eget märke. Räkna dessutom med tillbehören: Home Assistant Green behöver en radiodongel och Homey Pro mini en Homey Bridge för 799 kronor om huset innehåller Z-Wave eller infraröd.",
  },
  {
    question: "Vad händer med mitt smarta hem om tillverkaren lägger ner?",
    answer:
      "Det beror på var intelligensen sitter. Kör hubben automationerna lokalt fortsätter de fungera även om företaget försvinner, åtminstone tills något går sönder. Ligger de i molnet slutar de fungera samma dag som servern stängs. Öppna plattformar är tryggast i det avseendet, eftersom någon annan kan hålla dem vid liv: Home Assistant är gratis och öppen och lever oberoende av vad Nabu Casa bestämmer. Det är samma fråga vi ställer om smarta lås och kameror, och för en hubb väger den tyngre, eftersom allt annat hänger på den.",
  },
  {
    question: "Krävs abonnemang för en hubb?",
    answer:
      "Inte för grundfunktionerna hos dem vi rankar. Homey Pro klarar sig utan abonnemang för grundfunktioner, Home Assistant är gratis och Nabu Casa-abonnemanget köper enkel fjärråtkomst snarare än funktion, alltså möjligheten att nå hemmet utifrån utan att själv ordna det. Homey Pro mini har på samma sätt ett valfritt abonnemang för molnbackup. Kontrollera ändå innan du köper, eftersom en avgift för fjärrstyrning i praktiken är en avgift för att hubben ska vara användbar när du inte är hemma.",
  },
  {
    question: "Är IKEA Dirigera ett bra val?",
    answer:
      "Ja, särskilt om hemmet ska växa billigt. Dirigera kostar 899 kronor, är både Matter-brygga och Matter-styrenhet och tar 100 smarta produkter samtidigt, vilket är mer än dubbelt mot de andra Matter-controllerna i jämförelsen. Den fungerar dessutom som Thread Border Router. Det starkaste argumentet är tillbehören: en rörelsesensor eller en smart stickpropp från IKEA kostar 99 kronor, mot flera hundra i de andra ekosystemen. Två saker drar ner den: kundbetyget ligger på 3,6 av 5 på 714 omdömen, lägst bland hubbarna vi rankar, och den kräver nätverkskabel till routern eftersom den saknar egen wifi.",
  },
];
