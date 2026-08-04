import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { SMART_HEM_HUBB } from "@/lib/test-pages";

/**
 * Smart hem-hubb. Underlag i .agent/research/smart-hem-hubb.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, artikelnummer, radiouppsättning
 * och tillverkarnas uttalanden om lokal drift. Allt läst 2026-08-04 hos Kjell
 * eller på tillverkarens egen sida.
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
 * | Matter-controller | andra tillverkares Matter-enheter | Aqara M3, Aqara M100 |
 * | Universell hubb | varje radio, lokalt | Homey Pro, Home Assistant Green |
 *
 * Alla står i samma butikskategori, från 329 till 4 999 kronor.
 *
 * ⚠️ **Philips säger varken ja eller nej.** Butikstexten för Hue Bridge lovar
 * att den "kan kopplas till enheter från flera tillverkare"; Philips egen
 * Matter-sida beskriver bara riktningen utåt. Raden `Styr andra märken` står
 * därför som ej angiven för Hue, aldrig som nej.
 *
 * ⚠️ **Fyll aldrig i en sort ur en systermodell.** Aqara M3 säger rakt ut att
 * den styr tredjepart; M100 och M200 gör det inte, och deras rad ska spegla vad
 * som faktiskt står.
 *
 * ## Alla sju länkar till Kjell
 *
 * Kjell är den enda svenska butik vi hittat med en egen hubbkategori, 33
 * artiklar. Den ligger dessutom på 5 % / 30 dagar i Adtraction, alltså sajtens
 * bästa kartlagda villkor. Koncentrationen är en svaghet och står utskriven i
 * "Vem har kontrollerat det här?" på sidan.
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
    tagline: "Åtta radior i en låda, och ingen av dem behöver internet.",
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
      "Automationer körs lokalt och fungerar även utan internet",
      "Inget abonnemang krävs för grundfunktionerna",
    ],
    cons: [
      "4 999 kronor, dyrast av hubbarna i jämförelsen",
      "Femton gånger priset på den billigaste Matter-controllern",
      "Tretton kundbetyg är ett tunt underlag",
    ],
    specs: [
      { label: "Pris", value: "4 999 kr", highlight: true },
      { label: "Sort", value: "Universell hubb", highlight: true },
      {
        label: "Radior",
        value: "Wifi, Zigbee, Z-Wave, BLE, Matter, Thread, IR, 433 MHz",
        highlight: true,
      },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, enligt tillverkaren",
        highlight: true,
      },
      { label: "Styr andra märken", value: "Ja", highlight: true },
      { label: "Abonnemang", value: "Nej, inte för grundfunktioner" },
      { label: "Artikelnummer", value: "52065" },
    ],
    verdict:
      "Homey Pro talar åtta radior: wifi, Zigbee 3.0, Z-Wave Plus, Bluetooth LE, Matter, Thread, infraröd och 433 MHz. Ingen annan hubb i jämförelsen kommer i närheten, och de två sista är värda mer än de låter. Infraröd når en gammal luftvärmepump och 433 MHz når äldre trådlösa givare. Det är precis den utrustning som redan sitter i huset och som ingen modern standard bryr sig om.\n\nDen kör dessutom lokalt. Athom skriver att bearbetningen sker i lådan och att den fungerar även utan internet, och att grundfunktionerna inte kräver abonnemang. För en apparat som är hela hemmets nav är det den viktigaste meningen i produktbladet: går internet ner ska lampan i hallen fortfarande tändas av rörelsevakten.\n\nPriset är svårare. 4 999 kronor är femton gånger vad Aqaras billigaste Matter-controller kostar, och den skillnaden är bara motiverad om du faktiskt har blandade märken att samla. Har du enbart Hue-lampor köper du sju radior du aldrig tänder.\n\nTretton kundbetyg säger lite om hur den håller över tid.\n\nKöp den om huset innehåller enheter från flera tillverkare och några av dem är äldre än Matter. Har du ett enda märke räcker märkets egen brygga för en sjättedel.",
  },
  {
    id: "nabu-casa-home-assistant-green",
    name: "Home Assistant Green",
    shortName: "HA Green",
    brand: "Nabu Casa",
    image: productImage(SMART_HEM_HUBB.slug, "nabu-casa-home-assistant-green"),
    tagline: "Gratis mjukvara som körs lokalt, och du äger datan.",
    scores: {
      rackvidd: 4,
      oberoende: 5,
      upprattande: 3,
      framtid: 5,
      prisvarde: 4.5,
    },
    price: 2199,
    merchant: KJELL,
    merchantUrl: "https://www.kjell.com/se/nabu-casa-home-assistant-green-p88430",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 69, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som vill äga sitt hem",
    pros: [
      "Grundfunktionen är gratis och körs lokalt",
      "Fungerar även om internet ligger nere, enligt tillverkaren",
      "Öppen plattform som lever vidare oavsett vad en tillverkare bestämmer",
      "69 kundbetyg, största underlaget av hubbarna i jämförelsen",
    ],
    cons: [
      "Z-Wave kräver en separat USB-sticka som kostar extra",
      "Kräver mer av dig vid uppsättningen än en märkesbrygga gör",
      "Nabu Casa-abonnemanget behövs för enkel fjärråtkomst",
    ],
    specs: [
      { label: "Pris", value: "2 199 kr", highlight: true },
      { label: "Sort", value: "Universell hubb", highlight: true },
      {
        label: "Radior",
        value: "Wifi, Zigbee, Thread, Matter. Z-Wave via sticka",
        highlight: true,
      },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, enligt tillverkaren",
        highlight: true,
      },
      { label: "Styr andra märken", value: "Ja", highlight: true },
      { label: "Abonnemang", value: "Valfritt, för fjärråtkomst" },
      { label: "Artikelnummer", value: "88430" },
    ],
    verdict:
      "Home Assistant Green kostar 2 199 kronor och kör en mjukvara som är gratis och öppen. Nabu Casa skriver att grundfunktionen körs lokalt, att du äger din data och att hemmet går att styra även när internet ligger nere.\n\nDet sista är den fråga som avgör allt annat. En hubb är navet, och ett nav som kräver att någon annans server svarar är ett nav vars livslängd någon annan bestämmer. Här är plattformen dessutom öppen, vilket betyder att den lever vidare även om företaget bakom skulle sluta.\n\n69 kundbetyg är största underlaget av hubbarna vi jämför, och i en produktgrupp där flera modeller har under tio säger det något om att den används av riktiga människor över tid.\n\nZ-Wave finns inte i lådan utan kräver en separat USB-sticka, så har du Z-Wave-enheter är den verkliga prislappen högre än 2 199. Uppsättningen kräver dessutom mer av dig än en brygga som hittar sina egna lampor på tre minuter: räkna med en kväll och en vilja att läsa.\n\nKöp den om du vill att hemmet ska fungera oberoende av moln och tillverkare och tycker att en kväll är ett rimligt pris för det. Vill du vara klar före middagen är det fel produkt.",
  },
  {
    id: "athom-homey-pro-mini",
    name: "Homey Pro Mini",
    shortName: "Homey Pro Mini",
    brand: "Athom",
    image: productImage(SMART_HEM_HUBB.slug, "athom-homey-pro-mini"),
    tagline: "Samma plattform som storebror, utan de gamla radiorna.",
    scores: {
      rackvidd: 4,
      oberoende: 4.5,
      upprattande: 4,
      framtid: 4,
      prisvarde: 3.5,
    },
    price: 2999,
    merchant: KJELL,
    merchantUrl: "https://www.kjell.com/se/athom-homey-pro-mini-p52066",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 8, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för ett nyare hem",
    pros: [
      "Samma app och samma plattform som Homey Pro",
      "2 000 kronor billigare än den stora modellen",
      "Kör lokalt på samma sätt",
    ],
    cons: [
      "Saknar infraröd och 433 MHz, som är det som når äldre utrustning",
      "800 kronor dyrare än Home Assistant Green, som når fler protokoll",
      "Åtta kundbetyg",
    ],
    specs: [
      { label: "Pris", value: "2 999 kr", highlight: true },
      { label: "Sort", value: "Universell hubb", highlight: true },
      {
        label: "Radior",
        value: "Wifi, Zigbee, Matter, Thread, BLE",
        highlight: true,
      },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, enligt tillverkaren",
        highlight: true,
      },
      { label: "Styr andra märken", value: "Ja", highlight: true },
      { label: "Artikelnummer", value: "52066" },
    ],
    verdict:
      "Homey Pro Mini är samma plattform och samma app som Homey Pro, för 2 000 kronor mindre. Det som försvunnit är radiorna längst ner i listan: infraröd och 433 MHz.\n\nDe två är hela skillnaden, och om de spelar roll avgörs av vad du redan äger. En luftvärmepump som styrs med fjärrkontroll talar infraröd. Äldre trådlösa givare och en del rörelsevakter talar 433 MHz. Har du sådant i huset gör Mini inte jobbet, hur bra appen än är. Har du bara enheter köpta de senaste åren märker du aldrig att de saknas.\n\nProblemet är prislappen däremellan. 2 999 kronor är 800 mer än Home Assistant Green, som når fler protokoll och kostar ingenting i mjukvara. Det du betalar för är en färdig upplevelse i stället för en kväll med dokumentation, vilket är värt något men inte självklart värt 800 kronor.\n\nKöp den om du vill ha Homeys app och ditt hem är nytt nog att sakna infraröd och 433 MHz. Är du osäker på vad du har, ta den stora modellen: det är en dyr upptäckt att göra i efterhand.",
  },
  {
    id: "aqara-hub-m3",
    name: "Hub M3",
    shortName: "Aqara M3",
    brand: "Aqara",
    image: productImage(SMART_HEM_HUBB.slug, "aqara-hub-m3"),
    tagline: "Ensam om att säga att den styr andra märken.",
    scores: {
      rackvidd: 3.5,
      oberoende: 3,
      upprattande: 4.5,
      framtid: 4.5,
      prisvarde: 3.5,
    },
    price: 1729,
    merchant: KJELL,
    merchantUrl: "https://www.kjell.com/se/aqara-hub-m3-smarta-hem-controller-p57869",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 13, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som vill veta",
    pros: [
      "Ensam i sortimentet om att skriva ut att den styr tredjepartsprodukter",
      "Zigbee, Bluetooth, Thread och Matter i samma enhet",
      "Enklare att komma igång med än en universell plattform",
    ],
    cons: [
      "Saknar Z-Wave, infraröd och 433 MHz",
      "Anger ingenting om huruvida automationer fungerar utan internet",
      "1 729 kronor är nära Home Assistant Green, som når mer",
    ],
    specs: [
      { label: "Pris", value: "1 729 kr", highlight: true },
      { label: "Sort", value: "Matter-controller", highlight: true },
      {
        label: "Radior",
        value: "Zigbee, Bluetooth, Thread, Matter",
        highlight: true,
      },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ej angivet",
        highlight: true,
      },
      { label: "Styr andra märken", value: "Ja, uttryckligen", highlight: true },
      { label: "Artikelnummer", value: "57869" },
    ],
    verdict:
      "Aqara Hub M3 är den enda produkten i hela sortimentet som svarar rakt på frågan: \"Matter-controller – kan styra tredjepartsprodukter.\" Sju ord som ingen annan tillverkare i jämförelsen skriver.\n\nDet är därför den står här och inte bland de övervägda. I en produktgrupp där hälften av texterna säger \"fungerar med Matter\" utan att avslöja i vilken riktning, är en tillverkare som talar klarspråk värd något i sig.\n\nRäckvidden är ändå smalare än de universella. Zigbee, Bluetooth, Thread och Matter täcker det mesta som säljs i dag, men Z-Wave saknas, liksom infraröd och 433 MHz. Har du en gammal luftvärmepump eller äldre givare når den dem inte.\n\nOch en rad är tom där de tre bästa har text: Aqara säger ingenting om huruvida automationerna fortsätter fungera när internet ligger nere. Deras billigare M100 säger uttryckligen att de gör det, vilket gör tystnaden här svårare att tolka, och vi fyller inte i ett svar åt dem.\n\n1 729 kronor är dessutom nära nog Home Assistant Green för att jämförelsen ska svida.\n\nKöp den om du bygger på Aqaras sensorer och vill kunna lägga till andra märkens Matter-enheter utan att läsa forum. Vill du ha lokal drift bekräftad i skrift ska du välja högre upp i listan.",
  },
  {
    id: "philips-hue-bridge-pro",
    name: "Hue Bridge Pro",
    shortName: "Hue Bridge Pro",
    brand: "Philips",
    image: productImage(SMART_HEM_HUBB.slug, "philips-hue-bridge-pro"),
    tagline: "Gör Hue bättre, och säger inget om resten av hemmet.",
    scores: {
      rackvidd: 2,
      oberoende: 3,
      upprattande: 5,
      framtid: 3,
      prisvarde: 3,
    },
    price: 899,
    merchant: KJELL,
    merchantUrl: "https://www.kjell.com/se/philips-hue-bridge-pro-brygga-p51982",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 7, checkedAt: PRICE_CHECKED },
    superlative: "Bäst om hemmet är Hue",
    pros: [
      "Enklast av alla att komma igång med: koppla in och den hittar lamporna",
      "Exponerar Hue mot Alexa, Apple Home och Google via Matter",
      "Zigbee-kryptering genom Trust Center",
    ],
    cons: [
      "Philips säger inte om den kan lägga till andra tillverkares Matter-enheter",
      "899 kronor för en brygga till ett enda märke",
      "Sju kundbetyg",
    ],
    specs: [
      { label: "Pris", value: "899 kr", highlight: true },
      { label: "Sort", value: "Märkesbrygga", highlight: true },
      { label: "Radior", value: "Zigbee, Matter utåt", highlight: true },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ej angivet",
        highlight: true,
      },
      { label: "Styr andra märken", value: "Ej angivet", highlight: true },
      { label: "Artikelnummer", value: "51982" },
    ],
    verdict:
      "Hue Bridge Pro är den enklaste produkten i jämförelsen att komma igång med. Du kopplar in den, den hittar dina Hue-lampor, och du är klar innan kaffet kallnat. Ingen universell hubb kommer i närheten av det.\n\nSedan kommer frågan som avgör om 899 kronor är rätt pris, och den går inte att besvara ur Philips egna texter. Butiken skriver att bryggan \"fungerar med Matter och kan kopplas till enheter från flera tillverkare\", vilket en köpare rimligen läser som att den styr andra märken. Philips egen Matter-sida beskriver bara riktningen utåt: Hue går att ansluta till Alexa, Apple Home och Google Assistant.\n\nAtt bryggan kan lägga till en annan tillverkares Matter-lås eller sensor står ingenstans. Det står heller inte att den inte kan. Vi skriver därför att uppgiften saknas, och det är i sig ett skäl att räkna med det smalare svaret när du budgeterar.\n\nSjälva Zigbee-nätet är däremot det stabilaste av hubbarna här, och Trust Center-krypteringen är mer än de flesta erbjuder.\n\nKöp den om hemmet är Hue och du vill styra det från Apple Home eller Google. Ska den samla flera märken finns inget publicerat besked att luta sig mot, och då är en Matter-controller det tryggare köpet.",
  },
  {
    id: "plejd-gateway",
    name: "Gateway GWY-01",
    shortName: "Plejd Gateway",
    brand: "Plejd",
    image: productImage(SMART_HEM_HUBB.slug, "plejd-gateway"),
    tagline: "Styr enbart Plejd, och står ändå i hubbhyllan.",
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
    superlative: "Bäst om huset har Plejd",
    pros: [
      "89 kundbetyg med 5,0 i snitt, flest av hubbarna i jämförelsen",
      "Gör ett befintligt Plejd-system fjärrstyrt",
      "Integreras utåt mot HomeKit, Google Home, Alexa, Homey och Verisure",
    ],
    cons: [
      "Styr enbart Plejd-produkter, enligt Plejd själva",
      "Kräver en befintlig Plejd-installation för att göra någon nytta alls",
      "Kräver internet: hela funktionen är att koppla meshen till nätet",
    ],
    specs: [
      { label: "Pris", value: "899 kr", highlight: true },
      { label: "Sort", value: "Märkesbrygga", highlight: true },
      { label: "Radior", value: "Plejd mesh, Ethernet", highlight: true },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Nej, det är hela funktionen",
        highlight: true,
      },
      { label: "Styr andra märken", value: "Nej", highlight: true },
      { label: "Nätverk", value: "Ethernet, RJ45" },
      { label: "Artikelnummer", value: "51061" },
    ],
    verdict:
      "Plejd Gateway står i butikens hubbhylla bredvid apparater som styr vilket märke som helst, och den styr enbart Plejd. Det är Plejds egna ord: gatewayen ansluter användarens Plejd-mesh till internet och möjliggör fjärrstyrning och integration mot tredjepartstjänster.\n\nLäs riktningen noga. Integrationerna går utåt, mot HomeKit, Google Home, Alexa, Homey och Verisure. Ingenting går in. Har du inte redan Plejd i väggarna gör den ingenting alls, och Plejd installeras av elektriker bakom strömbrytare, så det är inte ett köp du gör i efterhand.\n\nDärför ligger den sist trots ett kundbetyg som är det bästa av hubbarna här: 5,0 på 89 omdömen, fler än någon annan hubb här. De betygen kommer från människor som redan har Plejd, och för dem är produkten precis rätt.\n\nAtt den kräver internet är inte heller ett fel utan definitionen: att koppla meshen till nätet är hela uppgiften. Men det betyder att fjärrstyrningen försvinner när nätet gör det, till skillnad från de universella hubbarna.\n\nKöp den om huset har Plejd och du vill nå det hemifrån. Letar du efter något som ska samla flera märken är den här produkten inte en kandidat, och den bör inte stå på samma hylla.",
  },
  {
    id: "aqara-smart-hub-m100",
    name: "Smart Hub M100",
    shortName: "Aqara M100",
    brand: "Aqara",
    image: productImage(SMART_HEM_HUBB.slug, "aqara-smart-hub-m100"),
    tagline: "329 kronor, och automationerna körs utan internet.",
    scores: {
      rackvidd: 3,
      oberoende: 4,
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
      "Anger uttryckligen att lokala automationer fungerar utan internet",
      "Thread Border Router som stärker nätet för alla Thread-enheter i huset",
      "Matter-certifierad med Zigbee och Thread",
    ],
    cons: [
      "Säger inte om den kan styra andra tillverkares Matter-enheter",
      "Saknar Z-Wave, infraröd och 433 MHz",
      "Sex kundbetyg",
    ],
    specs: [
      { label: "Pris", value: "329 kr", highlight: true },
      { label: "Sort", value: "Matter-controller", highlight: true },
      { label: "Radior", value: "Zigbee, Thread, Matter", highlight: true },
      {
        label: "Fungerar utan internet",
        shortLabel: "Utan internet",
        value: "Ja, för lokala automationer",
        highlight: true,
      },
      { label: "Styr andra märken", value: "Ej angivet", highlight: true },
      { label: "Thread", value: "Ja, Thread Border Router" },
      { label: "Artikelnummer", value: "56569" },
    ],
    verdict:
      "Aqara M100 kostar 329 kronor och anger att lokala automationer fungerar utan internet. Det är den billigaste produkten i jämförelsen och en av tre som säger något alls om lokal drift, vilket är en ovanlig kombination.\n\nDen är dessutom Thread Border Router. Det låter tekniskt och betyder något konkret: varje Thread-enhet i huset får bättre täckning av att den finns, även enheter som styrs av något annat. En router för 329 kronor som stärker nätet för allt annat är svår att argumentera emot.\n\nRäckvidden är begränsad till Zigbee, Thread och Matter. Ingen Z-Wave, ingen infraröd, ingen 433 MHz. Det räcker för sensorer, lampor och lås köpta de senaste åren och inte för något äldre.\n\nEn rad står tom, och den är samma som hos Hue: Aqara säger inte om M100 kan lägga till andra tillverkares Matter-enheter. Deras dyrare M3 skriver det rakt ut, vilket gör tystnaden här värd att notera. Vi skriver inte in M3:s besked åt M100.\n\nKöp den som första hubb, eller som ett billigt sätt att förbättra Thread-täckningen i ett hus som redan har en annan hubb. Ska den bli navet för blandade märken är beskedet för tunt.",
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
 */
export const SMART_HEM_HUBB_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "IKEA",
    name: "Dirigera",
    reason:
      "899 kronor och den mest sålda hubben i landet, men IKEA publicerar ingen uppgift om huruvida den styr andra tillverkares Matter-enheter eller om automationer fungerar utan internet. Det är samma två rader som avgör placeringen för alla andra här, och utan dem går den inte att väga rättvist mot de sju. Värd att ta in när IKEA skriver ut vad den når.",
    approxPrice: 899,
    merchant: "IKEA",
    merchantUrl:
      "https://www.ikea.com/se/sv/p/dirigera-hubb-foer-smarta-produkter-vit-smart-10503406/",
  },
  {
    brand: "Aqara",
    name: "Hub M200",
    reason:
      "599 kronor för Matter, Zigbee 3.0 och Thread, mitt emellan M100 och M3 i både pris och räckvidd. Vi rankar de två ytterlägena eftersom de visar spannet tydligare: den billigaste som ändå kör lokalt, och den som ensam skriver ut att den styr tredjepart. M200 gör varken det ena eller det andra tydligare.",
    approxPrice: 599,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/aqara-hub-m200-smart-hub-med-matter-zigbee-och-thread-p56570",
  },
  {
    brand: "Philips",
    name: "Hue Bridge",
    reason:
      "599 kronor, 300 mindre än Bridge Pro som vi rankar. Samma sort och samma öppna fråga om vad den når. Vi tog Pro-modellen eftersom den är den som säljs till nya kunder i dag, men har du ett mindre Hue-system gör grundmodellen samma jobb billigare.",
    approxPrice: 599,
    merchant: "Kjell & Company",
    merchantUrl: "https://www.kjell.com/se/philips-hue-bridge-brygga-p50840",
  },
  {
    brand: "TP-Link",
    name: "Tapo H200",
    reason:
      "399 kronor och butikens näst billigaste i hubbhyllan, men produkttexten nämner inte Matter över huvud taget och beskriver i stället lokal inspelning på micro-SD. Den är ett nav för Tapos egna sensorer och kameror snarare än en hubb i den mening sidan handlar om. Har du Tapo-produkter är den rätt; letar du efter något som samlar flera märken är den det inte.",
    approxPrice: 399,
    merchant: "Kjell & Company",
    merchantUrl: "https://www.kjell.com/se/tp-link-tapo-h200-smart-hub-p65276",
  },
  {
    brand: "Nabu Casa",
    name: "Connect ZBT-2 och Connect ZWA-2",
    reason:
      "USB-stickor som ger Zigbee respektive Z-Wave till en dator som redan kör Home Assistant. De är inte hubbar utan radior, och de står ändå på samma hylla som hubbarna, vilket är precis den sammanblandningen. Har du redan en server hemma är de billigare än en färdig hubb; har du ingen löser de ingenting.",
    merchant: "Kjell & Company",
    merchantUrl: "https://www.kjell.com/se/nabu-casa-home-assistant-connect-zbt-2-p88438",
  },
  {
    brand: "Aeotec",
    name: "Z-Stick Gen 7",
    reason:
      "Samma sak som Nabu Casas stickor fast för Z-Wave, och den kompletterar Home Assistant Green som saknar Z-Wave i lådan. Den är alltså ett tillbehör till en av produkterna vi rankar snarare än en konkurrent till dem, och den räknas in i den verkliga kostnaden för Green om du har Z-Wave-enheter.",
    merchant: "Kjell & Company",
    merchantUrl: "https://www.kjell.com/se/aeotec-z-stick-gen-7-usb-adapter-p52098",
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
      "Athom Homey Pro för 4 999 kronor hos Kjell, om hemmet innehåller enheter från flera tillverkare. Den talar åtta radior i samma låda: wifi, Zigbee 3.0, Z-Wave Plus, Bluetooth LE, Matter, Thread, infraröd och 433 MHz, och de två sista når äldre utrustning som ingen modern standard bryr sig om. Athom anger dessutom att automationerna körs lokalt och fungerar utan internet, och att grundfunktionerna inte kräver abonnemang. Vill du ha samma oberoende billigare är Home Assistant Green på 2 199 kronor svaret, men räkna med en kväll vid uppsättningen och en extra USB-sticka om du har Z-Wave.",
  },
  {
    question: "Behöver jag verkligen en hubb?",
    answer:
      "Ofta inte. Enheter som talar wifi, exempelvis de flesta smarta uttag och kameror, ansluter direkt till routern och behöver ingenting mer. Hubben behövs när enheterna talar Zigbee, Z-Wave eller Thread, eftersom de radiorna inte finns i en vanlig router, och när du vill att automationer ska köras även om internet ligger nere. Har du en enda smart lampa och en app som fungerar är en hubb en lösning på ett problem du inte har.",
  },
  {
    question: "Vad är skillnaden mellan en hubb och en brygga?",
    answer:
      "En brygga talar med sitt eget märke och exponerar det utåt mot andra system. Plejd Gateway är det tydligaste exemplet: den ansluter ett befintligt Plejd-system till internet och integrerar mot HomeKit, Google Home, Alexa och Homey, men den styr enbart Plejd-produkter. En universell hubb går åt andra hållet och samlar enheter från flera tillverkare hos sig. Båda säljs under ordet hubb i samma butikskategori, och prislappen skiljer dem inte åt: bryggan kostar 899 kronor och en universell hubb kan kosta både mer och mindre.",
  },
  {
    question: "Vad betyder det att en hubb stöder Matter?",
    answer:
      "Mindre än man tror, eftersom ordet täcker två motsatta roller. En Matter-controller kan lägga till och styra andra tillverkares Matter-enheter. En Matter-bridge gör tvärtom: den exponerar sina egna enheter för andra system. Båda skriver Matter på förpackningen. Aqara Hub M3 är den enda produkten i vår jämförelse som skriver ut vilken roll den har, med orden att den kan styra tredjepartsprodukter. Fråga alltid i vilken riktning stödet går innan du köper på ordet.",
  },
  {
    question: "Fungerar hubben om internet ligger nere?",
    answer:
      "Det beror helt på modellen, och de flesta säger ingenting om saken. Athom skriver att Homey Pro bearbetar lokalt och fungerar utan internet. Nabu Casa skriver att Home Assistant körs lokalt och att hemmet går att styra även när nätet är nere. Aqara anger att M100 kör lokala automationer utan internet. Övriga produkter i vår jämförelse lämnar frågan obesvarad, vilket inte betyder att de kräver moln men betyder att du inte kan veta i förväg. För en apparat som är hela hemmets nav är det en uppgift värd att leta efter.",
  },
  {
    question: "Vilken hubb ska jag välja till Philips Hue?",
    answer:
      "Har du bara Hue räcker Hue Bridge, och den är enklast av alla att komma igång med: koppla in den och den hittar lamporna. Bridge Pro kostar 899 kronor och grundmodellen 599. Vill du styra lamporna från Apple Home eller Google löser bryggan det via Matter. Vill du däremot samla Hue tillsammans med andra märken behöver du en Matter-controller eller en universell hubb, eftersom Philips inte anger om bryggan kan lägga till andra tillverkares Matter-enheter.",
  },
  {
    question: "Kan jag ha två hubbar hemma?",
    answer:
      "Ja, och det är vanligare än man skulle tro. Ett hem har ofta en märkesbrygga för lamporna och en universell hubb för allt annat, och de talar med varandra via Matter eller via molntjänsternas integrationer. Det kostar en apparat till och en app till, men det är ofta enklare än att flytta ett fungerande lampsystem. Har du redan en brygga är frågan inte om du ska byta ut den utan vad den inte når.",
  },
  {
    question: "Vad är Thread och behöver jag en Thread Border Router?",
    answer:
      "Thread är ett radionät för batteridrivna enheter, byggt så att enheterna vidarebefordrar varandras signaler och nätet blir starkare ju fler de är. En Thread Border Router är bryggan mellan det nätet och ditt vanliga hemnätverk, och utan en sådan når Thread-enheterna ingenting. Flera produkter fungerar som router, bland dem Aqara M100 för 329 kronor, och den stärker täckningen för alla Thread-enheter i huset även om något annat styr dem.",
  },
  {
    question: "Vad kostar en smart hem-hubb?",
    answer:
      "Hubbarna vi jämför kostar mellan 329 och 4 999 kronor, alltså femton gånger, och priset säger nästan ingenting om vad de når. Den billigaste är en Matter-controller som kör lokala automationer och fungerar som Thread Border Router. En produkt i mitten av prislistan kan vara en brygga som bara talar med sitt eget märke. Väg alltid priset mot vilka radior hubben talar och om den styr andra tillverkares enheter, aldrig mot vad grannen på hyllan kostar.",
  },
  {
    question: "Vad händer med mitt smarta hem om tillverkaren lägger ner?",
    answer:
      "Det beror på var intelligensen sitter. Kör hubben automationerna lokalt fortsätter de fungera även om företaget försvinner, åtminstone tills något går sönder. Ligger de i molnet slutar de fungera samma dag som servern stängs. Öppna plattformar är tryggast i det avseendet, eftersom någon annan kan hålla dem vid liv: Home Assistant är gratis och öppen och lever oberoende av vad Nabu Casa bestämmer. Det är samma fråga vi ställer om smarta lås och kameror, och för en hubb väger den tyngre, eftersom allt annat hänger på den.",
  },
  {
    question: "Krävs abonnemang för en hubb?",
    answer:
      "Inte för grundfunktionerna hos dem vi rankar. Athom anger uttryckligen att Homey Pro inte kräver abonnemang för grundfunktioner. Home Assistant är gratis, och Nabu Casa-abonnemanget köper enkel fjärråtkomst snarare än funktion, alltså möjligheten att nå hemmet utifrån utan att själv ordna det. Kontrollera ändå innan du köper, eftersom en avgift för fjärrstyrning i praktiken är en avgift för att hubben ska vara användbar när du inte är hemma.",
  },
  {
    question: "Är IKEA Dirigera ett bra val?",
    answer:
      "Den är den mest sålda hubben i landet och kostar 899 kronor, men vi rankar den inte, och skälet är att IKEA inte publicerar de två uppgifter som avgör placeringen för alla andra: om den kan styra andra tillverkares Matter-enheter, och om automationer fungerar utan internet. Utan dem går den inte att väga rättvist mot de sju vi jämför. Har du redan IKEA-produkter är den självklar; ska den bli navet för blandade märken saknas beskedet.",
  },
];
