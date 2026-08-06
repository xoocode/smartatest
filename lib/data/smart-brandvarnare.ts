import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { SMART_BRANDVARNARE } from "@/lib/test-pages";

/**
 * Smarta brandvarnare. Underlag i .agent/research/brandvarnare.md, §7 och §8,
 * och i .agent/research/smart-brandvarnare.md för reparationen 2026-08-06.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, batterityper, batteritider,
 * protokoll, ljudnivåer, mått, GTIN och kundbetyg. Allt läst 2026-08-02 på
 * butikens egen produktsida.
 *
 * **Tillagt 2026-08-06:** certifiering för samtliga nio, och Cleverios
 * batteri och batteritid ur Kjells egen manual till SA100 och ur
 * prestandadeklarationen. Båda uppgifterna stod tidigare som oangivna, vilket
 * var fel. Se lib/corrections.ts.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte tänt eld på något.
 *
 * ## Sidans vinkel: Google la ner Nest Protect
 *
 * Google upphörde med tillverkningen 28 mars 2025 och hänvisar till First
 * Alerts SC5. Proshop anger `Discontinued` på båda varianterna, Kjell har den
 * slut. Ändå rankar Brandinfos test daterat 2026 den fortfarande, och den låg i
 * toppen hos flera svenska jämförelser när vi mätte dem.
 *
 * Det är samma fel som `/elektrisk-rullgardin` byggdes för att rätta, och det
 * är skälet till att kriteriet **oberoende av tillverkaren** väger lika tungt
 * som vad appen gör. En brandvarnare ska sitta i taket i tio år. Nest Protect
 * lanserades 2015 och lades ner 2025.
 *
 * ## Gränsen mot /brandvarnare
 *
 * Housegard Luma finns på båda sidorna som två olika köp. Där rankas tvåpacket
 * för 599 kronor, som seriekopplas med radio helt utan app. Här rankas
 * systemet, alltså tvåpacket plus hubben för 499,90, till 1 098,90 kronor.
 *
 * ## Butiksfördelning
 *
 * Fyra länkar till Brandvarnare.se, tre till Kjell och en till Proshop.
 * Testvinnaren hamnade hos Kjell. Brandvarnare.se, som är den enda butiken i
 * kategorin med tillåten betalannonsering, tar platserna tre och fyra med
 * X-Sense-systemen.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-03";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "housegard-luma-system",
    name: "Luma-system: 2 varnare och smart hubb",
    shortName: "Luma-system",
    brand: "Housegard",
    image: productImage(SMART_BRANDVARNARE.slug, "housegard-luma-system"),
    tagline: "Larmar i sovrummet när det brinner i källaren, med eller utan internet.",
    scores: { app: 4.5, oberoende: 4.5, batteritid: 4.5, kravs: 2.5, prisvarde: 2.5 },
    price: 1098.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-luma-tradlos-brandvarnare-2-pack-vit-p21220",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 62, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst utan molnberoende",
    pros: [
      "Varnarna larmar ihop över 868 MHz utan att hubben är inblandad",
      "Upp till 40 enheter i systemet",
      "Förseglat batteri som räcker varnarens hela tioåriga livslängd",
      "Smart Life är ett av de största ekosystemen, inte en ensam tillverkares app",
      "Hubben har hundra meters räckvidd fri sikt",
    ],
    cons: [
      "Priset är två artiklar: tvåpacket 599 kr och hubben 499,90 kr. Länken går till varnarna",
      "Hubben måste sitta i ett eluttag och drar ström dygnet runt",
      "549 kronor per skyddad plats i den här konfigurationen",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, via Luma smart hubb", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, radio 868 MHz", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "2", highlight: true },
      { label: "Batteri", value: "123A förseglat", highlight: true },
      { label: "Batteritid", value: "Upp till 10 år", highlight: true },
      { label: "App", value: "Smart Life" },
      { label: "Max i system", value: "40 enheter" },
      { label: "Räckvidd hubb", value: "100 m fri sikt" },
      { label: "Per skyddad plats", shortLabel: "Kr/plats", value: "549 kr", highlight: true },
      { label: "Hubbens ström", value: "USB-C, under 1,5 W" },
      { label: "Larmsignal", value: "85 dB på 3 m" },
      /* Godkännanden lästa på Kjells produktsida 2026-08-06: "Godkännanden:
         CE, EN 14604" i specifikationen, och "Testad och godkänd enligt CE,
         EN14604:2008, RED, RoHS och Reach" i produkttexten. */
      { label: "Certifiering", value: "CE, EN 14604" },
    ],
    verdict:
      "Housegard Luma-systemet är två brandvarnare och en smart hubb för 1 098,90 kronor, och den enda lösningen här där uppkopplingen är ett tillägg och inte en förutsättning.\n\nVarnarna talar med varandra över 868 MHz utan att hubben är inblandad. Brinner det i källaren tjuter det i sovrummet, och det gäller under strömavbrott, under wifi-strul och den dag Housegard skulle stänga appen. Upp till 40 enheter går in i samma kedja, så systemet räcker till ett hus som växer. Batteriet är förseglat och håller varnarens hela tioåriga liv, alltså finns ingenting att byta och ingenting att glömma.\n\nHubben lägger till en sak: att telefonen får veta. Den kopplar in sig i Smart Life, som inte är Housegards egen app utan en av de största plattformarna som finns, med tusentals produkter från hundratals tillverkare bakom sig. Risken att den plattformen försvinner är av en annan storleksordning än risken att en enskild tillverkare tröttnar, och det är precis den risken Nest Protect visade var verklig.\n\nPriset är svagheten. 549 kronor per skyddad plats är näst dyrast här, och ska fyra rum täckas kostar det 2 296 kronor. **Köp det ändå om huset ska ha ett brandskydd som håller i tio år**, för det är den enda konfigurationen på sidan där varken larm eller sammankoppling kan tas ifrån dig. Ska du täcka fyra rum eller fler ger X-Sense FS61 dig sex varnare för 316 kronor per plats.",
  },
  {
    id: "netatmo-smart-brandvarnare",
    name: "Smart brandvarnare",
    shortName: "Netatmo",
    brand: "Netatmo",
    image: productImage(SMART_BRANDVARNARE.slug, "netatmo-smart-brandvarnare"),
    tagline: "Säger till när sensorn gått sönder, så du slipper klättra upp och trycka.",
    scores: { app: 5, oberoende: 2.5, batteritid: 5, kravs: 4.5, prisvarde: 1.5 },
    price: 910,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Netatmo-Smart-Brandvarnare/2679290",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst app",
    pros: [
      "Tio års integrerat batteri, ingenting att byta",
      "Självtestande, upptäcker en trasig sensor utan att du gör något",
      "Går att tysta från mobilen när du står nära larmet",
      "Ingen hubb, ansluter direkt till wifi",
      "HomeKit-stöd via Bluetooth LE",
      "Uppfyller EN 14604, inga radioaktiva ämnen",
    ],
    cons: [
      "910 kronor för en enda skyddad plats, dyrast per rum av alla",
      "Notiserna går genom Netatmos moln",
      "Kjell tar 1 090 kronor för samma varnare, 180 mer än Proshop",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, wifi direkt", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, lokal siren", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "1", highlight: true },
      { label: "Batteri", value: "Integrerat, byt enheten", highlight: true },
      { label: "Batteritid", value: "10 år", highlight: true },
      { label: "Per skyddad plats", shortLabel: "Kr/plats", value: "910 kr", highlight: true },
      { label: "App", value: "Netatmo, plus HomeKit" },
      { label: "Anslutning", value: "Wi-Fi 2,4 GHz och Bluetooth LE" },
      { label: "Larmsignal", value: "85 dB" },
      { label: "Självtest", value: "Ja" },
      { label: "Certifiering", value: "EN 14604, CE" },
      { label: "Mått", value: "Ø115 × 44 mm" },
      { label: "GTIN", value: "3700730502269" },
    ],
    verdict:
      "Netatmo Smart brandvarnare kostar 910 kronor och gör mest av alla nio med den uppkoppling du betalar för. Den skickar notis vid rök eller hög värme, den självtestar, och den kan tystas från mobilen när du står nära larmet.\n\nSjälvtestet är den funktion som betyder mest över tio år. En trasig rökkammare märks annars först den natt den skulle ha larmat, och den enda kontrollen är att klättra upp och trycka på knappen varje månad. Här säger varnaren till själv. Tystningen från mobilen är av samma sort: ett falsklarm klockan sju på morgonen tystas annars stående på en pall med en kvast i handen.\n\nTio års integrerat batteri betyder att du aldrig rör den. När batteriet är slut är sensorn också för gammal, och då byter du hela enheten. Det är rätt konstruktion för något som ska sitta i taket och glömmas bort.\n\nSvagheten är räknestycket. 910 kronor skyddar ett rum, dyrast per plats av allihop, och en varnare i hallen hör inte en brand bakom en stängd sovrumsdörr. Notiserna går dessutom genom Netatmos moln, och HomeKit-stödet mjukar bara upp det för den som redan bor hos Apple. **Köp den till sovrumskorridoren i ett hem som redan har varnare i övriga rum.** Ska de 910 kronorna täcka hela bostaden räcker de i stället till X-Sense FS31, som ger tre rum och en basstation.",
  },
  {
    id: "x-sense-fs61",
    name: "FS61: basstation och 6 rökvarnare",
    shortName: "X-Sense FS61",
    brand: "X-Sense",
    image: productImage(SMART_BRANDVARNARE.slug, "x-sense-fs61"),
    tagline: "Sex varnare och basstation. Billigast per rum av systemen.",
    scores: { app: 4, oberoende: 4, batteritid: 3, kravs: 4, prisvarde: 3.5 },
    price: 1897,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-fs61/",
    priceCheckedAt: PRICE_CHECKED,
    award: "premium",
    superlative: "Bäst för hela villan",
    pros: [
      "Sex varnare och basstationen ingår, 316 kronor per rum",
      "Larmar lokalt även om basstationen är urkopplad eller strömmen gått",
      "Inga löpande abonnemangskostnader",
      "Går att bygga ut med värme-, CO- och vattenvarnare i samma app",
      "Flera anläggningar i samma app, även sommarstugan",
    ],
    cons: [
      "Femårs utbytbart CR123A-batteri, inte tio års förseglat",
      "Nästan tvåtusen kronor i en klick",
      "X-Sense Home Security är tillverkarens egen app",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, via basstation SBS50", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, även vid strömavbrott", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "6", highlight: true },
      { label: "Batteri", value: "CR123A litium, utbytbart", highlight: true },
      { label: "Batteritid", value: "5 år", highlight: true },
      { label: "Per skyddad plats", shortLabel: "Kr/plats", value: "316 kr", highlight: true },
      { label: "App", value: "X-Sense Home Security" },
      { label: "Basstation", value: "SBS50, ingår" },
      { label: "Abonnemang", value: "Nej" },
      { label: "Anslutning", value: "Wi-Fi 2,4 GHz" },
      { label: "Garanti", value: "5 år" },
      { label: "Certifiering", value: "EN 14604:2005/AC:2008, LVD och RED" },
      { label: "Larmsignal", value: "Över 85 dB på 3 meter" },
      { label: "Mått", value: "Ø78,5 x 49 mm (varnaren)" },
      { label: "Detekterar", value: "Optisk rökdetektering" },
    ],
    verdict:
      "X-Sense FS61 är sex rökvarnare och en basstation för 1 897 kronor, alltså 316 kronor per skyddad plats och billigast per rum av allihop. En villa i två plan med källare och sovrum blir färdigskyddad i ett köp.\n\nVarnarna larmar lokalt även om basstationen är urkopplad eller strömmen gått i huset, och de larmar ihop över Link+ på 868 MHz med 500 meters räckvidd fri sikt. Går det åt skogen i pannrummet väcker det alltså sovrummet två plan upp, oavsett vad routern gör. Basstationen ingår, så det finns ingen andrakostnad som dyker upp i kassan, och det finns inget abonnemang.\n\nSystemet växer med värmevarnare till köket, CO-varnare vid pannan och vattenvarnare i tvättstugan, allt i samma app. Flera anläggningar går att lägga upp, vilket är funktionen man vill ha den dag sommarstugan också ska in.\n\nSvagheten är batteriet. Utbytbart CR123A med fem års livslängd mot Netatmos tio år integrerat betyder ett byte halvvägs genom varnarens liv, och med sex varnare är det sex batterier samma helg. **Ska du täcka fyra rum eller fler är det här köpet**, och prislappen på nästan tvåtusen är då billigare än varje alternativ på sidan. Räcker tre varnare tar du FS31 och sparar 583 kronor.",
  },
  {
    id: "x-sense-fs31",
    name: "FS31: basstation och 3 rökvarnare",
    shortName: "X-Sense FS31",
    brand: "X-Sense",
    image: productImage(SMART_BRANDVARNARE.slug, "x-sense-fs31"),
    tagline: "Tre varnare och basstation: ett våningsplan var och en utanför sovrummen.",
    /* prisvarde 2,5 och inte 3,0: sidan mäter genomgående kronor per
       skyddad plats, och där kostar FS31 438 kr mot FS61:s 316,
       39 procent mer för det mindre paketet. Justerat 2026-08-03 vid
       lanseringsgenomgången, då de två annars visade samma betyg. */
    scores: { app: 4, oberoende: 4, batteritid: 3, kravs: 4, prisvarde: 2.5 },
    price: 1314,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-fs31/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Rätt storlek för de flesta",
    pros: [
      "Tre varnare och basstationen ingår",
      "Larmar lokalt även om basstationen är urkopplad",
      "Inga löpande kostnader",
      "Samma utbyggbarhet som FS61",
    ],
    cons: [
      "438 kronor per skyddad plats, mot 316 för FS61",
      "Femårs utbytbart batteri",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, via basstation SBS50", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, även vid strömavbrott", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "3", highlight: true },
      { label: "Batteri", value: "CR123A litium, utbytbart", highlight: true },
      { label: "Batteritid", value: "5 år", highlight: true },
      { label: "Per skyddad plats", shortLabel: "Kr/plats", value: "438 kr", highlight: true },
      { label: "App", value: "X-Sense Home Security" },
      { label: "Basstation", value: "SBS50, ingår" },
      { label: "Abonnemang", value: "Nej" },
      { label: "Certifiering", value: "EN 14604:2005/AC:2008, LVD och RED" },
      { label: "Larmsignal", value: "Över 85 dB på 3 meter" },
      { label: "Mått", value: "Ø78,5 x 49 mm (varnaren)" },
      { label: "Detekterar", value: "Optisk rökdetektering" },
    ],
    verdict:
      "X-Sense FS31 är samma system som FS61 med tre varnare i stället för sex, för 1 314 kronor. Tre räcker till en normal villa: en per våningsplan plus en utanför sovrummen.\n\nBasstationen SBS50 ingår även här, och varnarna larmar ihop över Link+ och lokalt vid strömavbrott precis som i det stora paketet. Samma app, samma femåriga CR123A, samma utbyggnad med värme-, CO- och vattenvarnare. Ingenting är nedskalat utom antalet.\n\nRäknestycket är det enda som skiljer, och det talar emot den. 1 314 kronor på tre platser blir 438 kronor per rum mot 316 i FS61, alltså 39 procent mer för varje skyddat rum.\n\nDe 583 kronor som skiljer paketen åt ger dig tre varnare till, vilket är billigare än att komplettera i efterhand. **Ta FS31 om du har mätt upp bostaden och landat på exakt tre.** Är du osäker, eller finns det en källare eller en vind du inte räknat med, är FS61 det billigare köpet.",
  },
  {
    /* Tillagd i rankningen 2026-08-06. Låg tidigare bland de övervägda med
       motiveringen att den inte såldes i Sverige, vilket var fel: Kjell,
       Proshop, NetOnNet, Elgiganten, Inet, Komplett, Coolshop och Webhallen
       säljer den. Specifikationer lästa på Kjells produktsida och Aqaras egen
       EU-produktsida 2026-08-06. Se lib/corrections.ts. */
    id: "aqara-smoke-detector",
    name: "Smoke Detector med hubb M100",
    shortName: "Aqara",
    brand: "Aqara",
    image: productImage(SMART_BRANDVARNARE.slug, "aqara-smoke-detector"),
    tagline: "Larmar in i Apple Home, Google och Alexa utan att gå runt jorden.",
    /* Prissatt som varnare plus billigaste kompatibla hubb, 519 + 329, på
       samma sätt som Housegard Luma prissätts som tvåpack plus hubb. Aqara
       skriver själva ut fotnoten "Aqara Zigbee 3.0 hub is required", så en
       ensam detektor för 519 kronor når ingenting. Båda artiklarna hos Kjell. */
    scores: { app: 4.5, oberoende: 4, batteritid: 4.5, kravs: 2, prisvarde: 2 },
    price: 848,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-brandvarnare/aqara-smoke-detector-vit-p56561",
    priceCheckedAt: "2026-08-06",
    superlative: "Bäst för Apple- och Google-hem",
    pros: [
      "Matter over Bridge, så larmet syns i Apple Home, Google Home, Alexa och SmartThings",
      "Förseglat litiumbatteri på upp till 10 år, ingenting att byta",
      "En varnare som löser ut får de andra Aqara-varnarna att tjuta med",
      "Utlöser sirenen i alla Aqara-hubbar du har i huset",
      "Zigbee 3.0 går lokalt i huset och inte via en molntjänst",
    ],
    cons: [
      "Priset är två artiklar: varnaren 519 kr och hubben M100 329 kr",
      "Sammankopplingen kräver hubben, till skillnad från Housegard och X-Sense",
      "848 kronor för första rummet, näst dyrast per plats här",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, via Aqara-hubb", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, inbyggd siren", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "1", highlight: true },
      { label: "Batteri", value: "2 × CR17450, förseglat", highlight: true },
      { label: "Batteritid", value: "Upp till 10 år", highlight: true },
      { label: "Per skyddad plats", shortLabel: "Kr/plats", value: "848 kr", highlight: true },
      { label: "App", value: "Aqara Home, plus HomeKit och Matter" },
      { label: "Protokoll", value: "Zigbee 3.0, 2405–2480 MHz" },
      { label: "Kräver", value: "Aqara Zigbee-hubb, från 329 kr" },
      { label: "Larmsignal", value: "85 dB på 3 meter" },
      { label: "Certifiering", value: "EN 14604:2005" },
      { label: "Mått", value: "Ø104,6 × 42 mm" },
      { label: "Vikt", value: "260 g" },
      { label: "Drifttemperatur", value: "0–40 °C" },
      { label: "Modell", value: "SD-S01D" },
    ],
    verdict:
      "Aqara Smoke Detector kostar 519 kronor, och med den billigaste hubben som krävs 848 kronor för det första rummet. Den skiljer sig från allt annat här på en punkt: larmet går in i det smarta hem du redan har.\n\nZigbee 3.0 och Matter over Bridge gör att varnaren dyker upp i Apple Home, Google Home, Alexa och SmartThings som vilken sensor som helst. Det betyder att röklarmet kan tända hallbelysningen, stänga av ventilationen och skicka en avisering genom det system du redan tittar i, i stället för att kräva ännu en app med ännu ett konto. Trafiken går lokalt över Zigbee mellan varnaren och hubben, inte via en server i ett annat land.\n\nBatteriet är förseglat och håller upp till 10 år, alltså hela den tid varnaren får sitta uppe, och en varnare som löser ut får de andra Aqara-varnarna i huset att tjuta med. Sirenerna i hubbarna går i gång samtidigt.\n\nHaken är att hubben inte är valfri. Aqara skriver själva att en Zigbee-hubb krävs, och utan den är detektorn en vanlig fristående brandvarnare för 519 kronor. Sammankopplingen hänger alltså på en ruta i ett eluttag, till skillnad från Housegard och X-Sense där varnarna talar direkt med varandra. **Köp den om du redan kör Apple Home, Google Home eller SmartThings**, för då är den enda varnaren på sidan som blir en del av hemmet i stället för en ö bredvid det. Har du inget smart hem sedan tidigare ger Housegard Luma-systemet dig två varnare och en hubb för 250 kronor mer.",
  },
  {
    id: "cleverio-smart-rok-varme",
    name: "Smart rök- och värmedetektor",
    shortName: "Cleverio",
    brand: "Cleverio",
    image: productImage(SMART_BRANDVARNARE.slug, "cleverio-smart-rok-varme"),
    tagline: "Notis i telefonen för 179 kronor, och den känner både rök och hetta.",
    /* batteritid 1,5 och inte 2,5: sänkt 2026-08-06 när manualen till SA100
       gav den uppgift sidan tidigare kallade oangiven. Kjells egen manual,
       avsnittet Replacing the battery, anger att 2 × AA ska bytas minst en
       gång per år. Det är kortast intervall på sidan, under Fibaros två år
       som ligger på 2,0. Det gamla betyget var satt när uppgiften saknades
       i vårt underlag, alltså ett avdrag för vår research och inte för varan.
       Se lib/corrections.ts. */
    scores: { app: 4, oberoende: 2, batteritid: 1.5, kravs: 4.5, prisvarde: 5 },
    price: 179,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/cleverio-smart-rok-och-varmedetektor-p51328",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 271, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Billigast med app",
    pros: [
      "179 kronor för notis i telefonen, billigast vägen in i kategorin",
      "Separat värmesensor som larmar vid 54 till 70 °C, utöver rökkammaren",
      "Ansluter direkt till wifi, ingen hubb behövs",
      "Kan trigga andra Cleverio-enheter, till exempel tända lampor",
      "Batterier, skruvar, pluggar och fäste ligger i kartongen",
    ],
    cons: [
      "Batterierna ska bytas minst en gång om året, mot tio år på de förseglade",
      "Cleverio är Kjells eget varumärke, och appen är deras",
      "En enhet, en skyddad plats",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, wifi direkt", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, lokal siren", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "1", highlight: true },
      /* Batteri, batteritid, värmesensor, känslighet och räckvidd lästa
         2026-08-06 i Kjells egen manual till SA100, artikel 51328:
         867156_51328_manual_en_no_sv20220628.pdf. Specifikationstabellen på
         sidan 7 anger "Power: 2x 1.5 V Alkaline AA batteries", och avsnittet
         Replacing the battery anger "The recommended interval is to replace
         the batteries at least once per year". Butikens produktsida anger
         "Drivs med medföljande 2x AA-batterier". */
      { label: "Batteri", value: "2 × AA alkaliska, medföljer", highlight: true },
      { label: "Batteritid", value: "Byt minst en gång per år", highlight: true },
      { label: "Per skyddad plats", shortLabel: "Kr/plats", value: "179 kr", highlight: true },
      { label: "App", value: "Cleverio" },
      { label: "Detekterar", value: "Rök och snabb värmeutveckling" },
      { label: "Värmelarm", value: "54–70 °C" },
      { label: "Larmsignal", value: "Över 85 dB på 3 meter" },
      { label: "Automation", value: "Kan trigga andra Cleverio-enheter" },
      /* Prestandadeklaration Kjell_51328_DOP01, länkad från produktsidan:
         EN 14604:2005/AC:2008, system 1, typprovad av TÜV Rheinland 1008 med
         EC-certifikat 1008-CPR-MC 69262585 0001. */
      { label: "Certifiering", value: "EN 14604:2005/AC:2008, TÜV Rheinland" },
      { label: "Modell", value: "SA100" },
    ],
    verdict:
      "Cleverio Smart rök- och värmedetektor kostar 179 kronor, en femtedel av Netatmo, och gör ändå det uppkopplingen är till för: telefonen säger ifrån när det brinner och du är någon annanstans. Ingen hubb, ingen basstation, inget abonnemang.\n\nUtöver rökkammaren sitter en separat värmesensor som löser ut mellan 54 och 70 °C. Den fångar den brand som utvecklar hetta snabbare än synlig rök, en fritös eller en överhettad laddare, och den gör varnaren användbar närmare köket än en ren optisk. Prestandadeklarationen är typprovad av TÜV Rheinland mot EN 14604, samma standard som de dyra i jämförelsen.\n\nBatteriet är haken, och det är en större hake än prislappen antyder. Den går på två vanliga AA-batterier som enligt manualen ska bytas minst en gång om året. Housegard och Netatmo sitter orörda i tio år; den här vill ha ny uppmärksamhet varje år i tio år, och ett tomt batteri är den vanligaste orsaken till att en brandvarnare är tyst när det brinner. Lägg till att Cleverio är Kjells eget varumärke och appen deras, alltså hänger både varan och tjänsten på en enda kedjas intresse för kategorin.\n\n**Köp den för att sätta en uppkopplad varnare i ett rum som i dag saknar skydd helt**, till exempel källaren eller gästrummet, och sätt en påminnelse i kalendern på köpdagen. Ska hela hemmet vila på uppkopplade varnare i tio år är Housegard Luma-systemet det du ska lägga pengarna på.",
  },
  {
    id: "fibaro-smoke-sensor",
    name: "Z-Wave-rökdetektor",
    shortName: "Fibaro",
    brand: "Fibaro",
    image: productImage(SMART_BRANDVARNARE.slug, "fibaro-smoke-sensor"),
    tagline: "Den enda som fortsätter fungera oavsett vad tillverkaren gör.",
    scores: { app: 3.5, oberoende: 5, batteritid: 2, kravs: 1.5, prisvarde: 2.5 },
    price: 559,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/fibaro-z-wave-rokdetektor-p50779",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 43, scale: 5, checkedAt: PRICE_CHECKED },
    award: "editor",
    superlative: "Bäst för ett hem med egen styrenhet",
    pros: [
      "Z-Wave är öppet, så den lyder din styrenhet och inte tillverkarens moln",
      "Fungerar med Fibaro-controllers, Tellstick och Home Assistant",
      "Varnar även vid hastiga temperaturökningar och över 54 °C",
      "Minst av varnarna: 65 mm i diameter, 28 mm hög",
      "Inbyggd siren och sabotageskydd",
    ],
    cons: [
      "Kräver en Z-Wave-styrenhet, den dyraste förutsättningen någon varnare ställer",
      "Två års batteritid, kortast av alla",
      "559 kronor för en plats, plus styrenheten",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, via Z-Wave-styrenhet", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, inbyggd siren", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "1", highlight: true },
      { label: "Batteri", value: "CR123A, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 2 år", highlight: true },
      { label: "Per skyddad plats", shortLabel: "Kr/plats", value: "559 kr", highlight: true },
      { label: "Protokoll", value: "Z-Wave, öppet" },
      { label: "Extra", value: "Temperaturvarning över 54 °C" },
      { label: "Sabotageskydd", value: "Ja" },
      { label: "Mått", value: "Ø65 × 28 mm" },
      /* Kjells produktsida, läst 2026-08-06: "Z-wave Plus-certifierad.
         Uppfyller kraven i SS-EN 14604:2005. Modell: FGSD-002." */
      { label: "Certifiering", value: "SS-EN 14604:2005, Z-Wave Plus" },
      { label: "Modell", value: "FGSD-002" },
    ],
    verdict:
      "Fibaros Z-Wave-rökdetektor kostar 559 kronor och är den enda varnaren här som inte talar med någon molntjänst alls. Den lyder din egen styrenhet, hemma i huset, över ett öppet protokoll.\n\nDet betyder att den överlever sin tillverkare. Läggs Fibaro ner i morgon sitter detektorn kvar och gör exakt samma sak, eftersom ingen server behöver vara igång för att en notis ska nå fram. Google lade ner Nest Protect i mars 2025 och var då det största namnet i kategorin, så invändningen är prövad. Den fungerar med Fibaros egna controllers, med Tellstick och med Home Assistant.\n\nDen är också minst av varnarna, 65 mm i diameter och 28 mm hög, alltså den som syns minst i ett tak. Utöver rök larmar den vid hastiga temperaturhöjningar och vid allt över 54 °C, och den har sabotageskydd och egen siren.\n\nHaken är tvådelad och den är dyr. Batteriet räcker upp till 2 år, kortast på sidan, vilket blir fem byten under de tio år varnaren ska sitta uppe. Och den kräver en Z-Wave-styrenhet som kostar mer än detektorn själv. **Har du redan ett Z-Wave-hem är det här ett självklart köp** och det billigaste sättet att göra brandskyddet lika oberoende som resten av installationen. Har du ingen styrenhet är det ett dyrt sätt att börja, och då ger Housegard Luma-systemet dig samma oberoende larm för mindre pengar.",
  },
  {
    id: "x-sense-xs01-m-3-pack",
    name: "XS01-M rökvarnare 3-pack",
    shortName: "XS01-M 3-pack",
    brand: "X-Sense",
    image: productImage(SMART_BRANDVARNARE.slug, "x-sense-xs01-m-3-pack"),
    tagline: "297 kronor per varnare, billigaste sättet att växa ett X-Sense-hem.",
    scores: { app: 2, oberoende: 4, batteritid: 3, kravs: 2, prisvarde: 4 },
    price: 890,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xs01-m-3-pack/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast per varnare med bas",
    pros: [
      "297 kronor per varnare, billigast per plats av X-Sense-produkterna",
      "Sammankopplas med Link+ helt utan basstation",
      "Fem års garanti",
    ],
    cons: [
      "Ingen basstation ingår, så ingen app om du inte redan har SBS50",
      "Femårs utbytbart CR123A",
      "Lätt att förväxla med FS31, som ser nästan likadan ut i butiken",
    ],
    specs: [
      { label: "Når telefonen", value: "Endast med SBS50, som säljs separat", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, Link+ mellan varnarna", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "3", highlight: true },
      { label: "Batteri", value: "CR123A litium, utbytbart", highlight: true },
      { label: "Batteritid", value: "5 år", highlight: true },
      { label: "Per skyddad plats", shortLabel: "Kr/plats", value: "297 kr", highlight: true },
      { label: "Basstation", value: "Ingår inte" },
      { label: "Garanti", value: "5 år" },
      { label: "Certifiering", value: "EN 14604:2005/AC:2008" },
      { label: "Larmsignal", value: "Över 85 dB på 3 meter" },
      { label: "Mått", value: "Ø78,5 x 49 mm" },
      { label: "Detekterar", value: "Optisk rökdetektering" },
    ],
    verdict:
      "X-Sense XS01-M 3-pack kostar 890 kronor och är samma rökvarnare som sitter i FS31 och FS61, såld utan basstationen. 297 kronor per varnare är billigast per plats av allt X-Sense har.\n\nDe tre larmar ihop över Link+ på 868 MHz, alltså larmar hela huset när en av dem känner rök, och det fungerar utan ström, utan router och utan konto. Femårsbatteriet CR123A och de fem årens garanti är desamma som i systempaketen.\n\nDet som inte följer med är vägen till telefonen. Utan basstationen SBS50 finns ingen app och ingen notis, och SBS50 säljs separat. Tre varnare för 890 kronor som larmar högt i ett tomt hus är en sammankopplad brandvarnare, inte en uppkopplad.\n\n**Äger du redan en SBS50 är det här den billigaste varnaren på sidan att växa med**, och de tre nya dyker upp i appen bredvid dem du har. Börjar du från noll ska du ta FS31 för 1 314 kronor i stället: 424 kronor mer, och basstationen ingår.",
  },
  {
    id: "x-sense-xs0d-mr",
    name: "XS0D-MR rökvarnare",
    shortName: "XS0D-MR",
    brand: "X-Sense",
    image: productImage(SMART_BRANDVARNARE.slug, "x-sense-xs0d-mr"),
    tagline: "En varnare till, i samma app och samma larm som resten av huset.",
    scores: { app: 2, oberoende: 4, batteritid: 3, kravs: 2, prisvarde: 2.5 },
    price: 398,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xs0d-mr/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för det enstaka rum som blev över",
    pros: [
      "Passar in i ett befintligt Link+-system",
      "Fem års garanti",
      "Batteriet medföljer",
    ],
    cons: [
      "Ingen basstation, så ingen app på egen hand",
      "398 kronor för en enda plats",
      "Femårs utbytbart batteri",
    ],
    specs: [
      { label: "Når telefonen", value: "Endast med SBS50, som säljs separat", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, Link+ mellan varnarna", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "1", highlight: true },
      { label: "Batteri", value: "CR123A litium, utbytbart", highlight: true },
      { label: "Batteritid", value: "5 år", highlight: true },
      { label: "Per skyddad plats", shortLabel: "Kr/plats", value: "398 kr", highlight: true },
      { label: "Basstation", value: "Ingår inte" },
      { label: "Garanti", value: "5 år" },
      { label: "Certifiering", value: "EN 14604:2005/AC:2008" },
      { label: "Larmsignal", value: "Över 85 dB på 3 meter" },
      { label: "Mått", value: "Ø110 x 30 mm" },
      { label: "Detekterar", value: "Optisk rökdetektering" },
    ],
    verdict:
      "X-Sense XS0D-MR är en enstaka rökvarnare för 398 kronor, avsedd att läggas till ett X-Sense-system som redan står i huset.\n\nDen ansluter till Link+ och larmar ihop med de varnare du har, med samma femåriga CR123A och samma fem års garanti. Batteriet ligger i förpackningen, så den hänger uppe samma kväll den kommer. Har du en SBS50 sedan tidigare syns den i appen bredvid de andra utan att något behöver ställas om.\n\nStyckpriset är svagheten. 398 kronor per plats mot 297 i trepacket betyder att två lösa varnare kostar mer än tre i ett paket, och utan basstation når ingen av dem telefonen.\n\n**Köp den när du har mätt upp huset, fyllt det med X-Sense och saknar exakt ett rum.** Behöver du två eller fler tar du trepacket och sparar pengar, och ska du börja från noll är FS31 med basstation det enda av de tre som faktiskt ger dig en app.",
  },
];

export const SMART_BRANDVARNARE_PRODUCTS: Product[] = resolveProducts(
  SMART_BRANDVARNARE,
  SEEDS,
);

/**
 * Filter till jämförelsen. Den viktigaste frågan står först: fungerar larmet
 * utan tillverkarens moln?
 */
type SmartTrait = {
  id: string;
  hubIncluded: boolean;
  localAlarm: boolean;
  openProtocol: boolean;
  multi: boolean;
};

const TRAITS: SmartTrait[] = [
  { id: "housegard-luma-system", hubIncluded: true, localAlarm: true, openProtocol: false, multi: true },
  { id: "netatmo-smart-brandvarnare", hubIncluded: true, localAlarm: true, openProtocol: false, multi: false },
  /* hubIncluded: true eftersom priset omfattar hubben M100. openProtocol:
     Zigbee 3.0 med Matter over Bridge, alltså samma sorts öppenhet som
     Fibaros Z-Wave. */
  { id: "aqara-smoke-detector", hubIncluded: true, localAlarm: true, openProtocol: true, multi: false },
  { id: "x-sense-fs61", hubIncluded: true, localAlarm: true, openProtocol: false, multi: true },
  { id: "x-sense-fs31", hubIncluded: true, localAlarm: true, openProtocol: false, multi: true },
  { id: "cleverio-smart-rok-varme", hubIncluded: true, localAlarm: true, openProtocol: false, multi: false },
  { id: "fibaro-smoke-sensor", hubIncluded: false, localAlarm: true, openProtocol: true, multi: false },
  { id: "x-sense-xs01-m-3-pack", hubIncluded: false, localAlarm: true, openProtocol: false, multi: true },
  { id: "x-sense-xs0d-mr", hubIncluded: false, localAlarm: true, openProtocol: false, multi: false },
];

export const SMART_BRANDVARNARE_FILTERS: ComparisonFilter[] = [
  {
    key: "komplett",
    label: "Allt som behövs ingår",
    ids: TRAITS.filter((t) => t.hubIncluded).map((t) => t.id),
  },
  {
    key: "oppet",
    label: "Öppet protokoll",
    ids: TRAITS.filter((t) => t.openProtocol).map((t) => t.id),
  },
  {
    key: "flera",
    label: "Flera varnare ingår",
    ids: TRAITS.filter((t) => t.multi).map((t) => t.id),
  },
];

/**
 * Övervägda men inte rankade.
 *
 * Google Nest Protect står först med flit. Den är kategorins mest kända namn,
 * den ligger fortfarande högt hos svenska jämförelser, och den går inte att
 * köpa.
 */
export const SMART_BRANDVARNARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Google",
    name: "Nest Protect",
    reason:
      "Nedlagd. Google upphörde med tillverkningen 28 mars 2025 och har gått i partnerskap med First Alert, vars SC5 säljs som direkt ersättare och passar Nest Protects befintliga fästplatta. Proshop anger Discontinued på både batteri- och 230-voltsversionen, 1 724 respektive 1 499 kronor, och Kjell har den slut på 1 590. Befintliga enheter fortsätter fungera och få säkerhetsuppdateringar under sin tioåriga livslängd, sju år för första generationen. Vi tar upp den här eftersom flera svenska jämförelser fortfarande rankar den, bland annat i ett test daterat 2026.",
    approxPrice: 1724,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Google-Nest-Protect-Batteri-Brandvarnare-2-Gen/2689265",
  },
  {
    brand: "First Alert",
    name: "SC5 Smart Smoke & CO Alarm",
    reason:
      "Googles egen anvisade ersättare för Nest Protect, framtagen i partnerskap med Google Nest och byggd för att passa Nest Protects befintliga fästplatta. Den säljs på den amerikanska marknaden och går inte att beställa hos någon av de svenska butiker vi bevakar, alltså finns det varken ett pris i kronor eller en garanti att åberopa här. Den som har Nest Protect i taket och letar en direkt ersättare får titta på Housegard Luma-systemet i stället.",
  },
  {
    brand: "Housegard",
    name: "Luma smart hubb, lös",
    reason:
      "Hubben såld separat för 499,90 kronor, för den som redan har Luma-varnare i taket och bara vill lägga till notiser i telefonen. Vi rankar systemet i stället, eftersom en hubb utan varnare inte är ett köp någon gör, men det här är den billigaste vägen till en smart brandvarnare om du redan äger halva lösningen.",
    approxPrice: 499.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-luma-smart-hubb-p21221",
  },
  {
    brand: "X-Sense",
    name: "XS01-M, styckvis",
    reason:
      "En enda XS01-M för 332 kronor. Samma invändning som trepacket vi rankar, fast utan mängdrabatten: ingen basstation ingår, och därmed ingen app. Med i listan för att prisbilden ska gå att jämföra, eftersom butiken säljer samma sensor i tre storlekar och bara den största innehåller det som gör systemet smart.",
    approxPrice: 332,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/xsense_xs01m_rokvarnare/",
  },
  {
    brand: "Housegard",
    name: "Pebble Link trådlös 2-pack",
    reason:
      "Sammankopplas över 868 MHz och har förseglat tioårsbatteri, men saknar app helt. Den hör därför hemma på vår sida om vanliga brandvarnare och inte här. Var dessutom slut hos Kjell vid kontrollen.",
    approxPrice: 799,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-pebble-link-tradlos-brandvarnare-2-pack-p65305",
  },
  {
    brand: "Aqara",
    name: "Smoke Detector utan hubb",
    reason:
      "Detektorn ensam för 519 kronor. Vi rankar den tillsammans med hubben M100 i stället, eftersom Aqara skriver ut att en Zigbee-hubb krävs och en detektor utan hubb varken når telefonen eller de andra varnarna. Har du redan en Aqara-hubb i huset är det däremot det här priset som gäller, och då är varnaren 519 kronor per skyddad plats.",
    approxPrice: 519,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-sensorer/smarta-brandvarnare/aqara-smoke-detector-vit-p56561",
  },
];

export const SMART_BRANDVARNARE_FAQ = [
  {
    question: "Är Google Nest Protect nedlagd?",
    answer:
      "Ja. Google upphörde med tillverkningen 28 mars 2025 och hänvisar till First Alerts SC5 som ersättare. Befintliga enheter fortsätter fungera och få säkerhetsuppdateringar under sin tioåriga livslängd, räknat från tillverkningsdatum, och sju år för första generationen. Proshop anger Discontinued på båda varianterna och Kjell har den slut. Flera svenska jämförelser rankar den fortfarande, vilket är värt att veta innan du litar på en topplista.",
  },
  {
    question: "Vilken smart brandvarnare är bäst 2026?",
    answer:
      "Housegard Luma-systemet: två varnare plus smart hubb för 1 098,90 kronor. Det är den enda varnaren där uppkopplingen är ett tillägg och inte en förutsättning: varnarna larmar ihop över egen radio även utan hubben, vid strömavbrott och den dag appen skulle försvinna. Vill du täcka fler rum är X-Sense FS61 billigare per plats.",
  },
  {
    question: "Vad händer med en smart brandvarnare om tillverkaren lägger ner?",
    answer:
      "Det beror helt på konstruktionen, och det är den viktigaste frågan i kategorin. En varnare som talar ett öppet protokoll, som Fibaros Z-Wave, lyder din egen styrenhet och påverkas inte alls. En varnare som bara talar med tillverkarens moln tappar appen och notiserna och blir en vanlig siren. Grundfunktionen att tjuta vid rök finns kvar i båda fallen eftersom den sitter i själva enheten.",
  },
  {
    question: "Vad kostar en smart brandvarnare?",
    answer:
      "De vi rankar kostar mellan 179 och 1 897 kronor, kontrollerat 2026-08-03. Räknat per skyddad plats är spannet 179 till 910 kronor. Billigast per rum är Cleverio, som skyddar en plats för 179, och X-Sense FS61 är billigast för den som ska täcka många rum med sex varnare och basstation. Dyrast per plats är Netatmo på 910.",
  },
  {
    question: "Fungerar smarta brandvarnare vid strömavbrott?",
    answer:
      "Själva varnaren gör det, eftersom den går på batteri. Frågan är om larmet når din telefon. X-Sense-varnarna larmar lokalt även med basstationen urkopplad, och Housegard Luma larmar ihop över radio utan hubben, så i båda fallen väcker en varnare i källaren dig i sovrummet mitt i ett strömavbrott. En varnare som bara talar wifi tjuter där den sitter men tystnar i telefonen så länge routern är strömlös.",
  },
  {
    question: "Vad är skillnaden mot en vanlig sammankopplad brandvarnare?",
    answer:
      "En sammankopplad brandvarnare larmar i hela huset när en av dem känner rök, helt utan wifi eller app. En smart brandvarnare gör samma sak och skickar dessutom en notis till telefonen. Sammankopplingen är det som räddar liv, notisen är det som räddar huset när ingen är hemma. Vi har en separat jämförelse av de sammankopplade som klarar sig utan app.",
  },
  {
    question: "Behöver smarta brandvarnare abonnemang?",
    answer:
      "Nej, ingen av de nio. X-Sense, Housegard, Netatmo, Cleverio, Aqara och Fibaro tar alla noll kronor i månaden för appen och notiserna, och du betalar bara för hårdvaran. Det skiljer kategorin från övervakningskameror, där molnlagringen ofta kostar månadsvis. Kontrollera ändå innan köp, eftersom det är en avgift som kan införas i efterhand.",
  },
  {
    question: "Hur många brandvarnare behöver jag, och var ska de sitta?",
    answer:
      "Storstockholms brandförsvar är tydliga: en brandvarnare på varje våningsplan, helst i alla rum där någon sover. En varnare täcker cirka 60 kvadratmeter, men stängda dörrar begränsar räckvidden, vilket i praktiken betyder att en varnare i hallen inte hör en brand bakom en stängd sovrumsdörr. Bor du större än så behöver du fler. Den ska sitta i taket eftersom varm rök stiger, mitt i rummet eller minst 50 centimeter från väggen. Undvik ventilationsöppningar, kök och badrum om du vill slippa falsklarm, även om många moderna varnare har en pausfunktion för just köket. Det är också här smarta varnare gör mest nytta: sammankopplingen betyder att den i källaren väcker dig i sovrummet, och det är billigare per skyddad plats att köpa ett flerpack än att köpa en i taget.",
  },
  {
    question: "Hur ofta ska en brandvarnare testas och när ska den bytas?",
    answer:
      "Minst en gång per kvartal enligt Storstockholms brandförsvar, och byt ut hela varnaren efter åtta till tio år oavsett vad batteriet säger. De rekommenderar också att du testar efter varje bortavaro längre än en vecka, med motiveringen att ett urladdat batteri kan lura dig att tro att varnaren fungerar. Har du ett vanligt niovoltsbatteri ska det bytas en gång om året, och varnaren dammsugas samtidigt. Gör det den 1 december, som är brandvarnardagen. Här har de smarta ett verkligt övertag: Netatmo testar sig själv och skickar en notis om sensorn slutat fungera, och de varnare som har förseglat tioårsbatteri tar bort det årliga batteribytet helt. Testknappen ska du ändå trycka på, eftersom den provar sirenen och inte bara elektroniken.",
  },
  {
    question: "Vem ansvarar för brandvarnaren i en hyresrätt?",
    answer:
      "Lagen säger att ägare eller nyttjanderättshavare i skälig omfattning ska hålla utrustning för släckning av brand. I praktiken betyder det, enligt Storstockholms brandförsvar, att fastighetsägaren ansvarar för att det finns minst en brandvarnare installerad i varje hushåll, medan hyresgästen ansvarar för skötsel och underhåll. Äger du din bostad köper du den själv. Kontrollera vad som står i ditt hyresavtal, eftersom ansvaret kan vara annorlunda fördelat där. Vill du sätta upp en smart brandvarnare i en hyresrätt är det värt att veta att samtliga i vår jämförelse är batteridrivna eller magnetmonterade och alltså inte kräver ingrepp i lägenheten.",
  },
  {
    question: "Kan jag blanda smarta och vanliga brandvarnare i samma hem?",
    answer:
      "Ja, men de larmar inte ihop. Sammankopplingen sker över tillverkarens egen radio, oftast 868 megahertz, och den fungerar bara mellan varnare av samma fabrikat och serie. En Housegard Luma kopplar ihop sig med andra Luma, inte med en X-Sense och inte med en vanlig fristående varnare från järnaffären. Det är inget hinder mot att ha båda sorterna i huset, men räkna då med att den gamla varnaren i garaget bara larmar där den sitter. Vill du ha ett hem där allt larmar samtidigt behöver du byta ut allihop, och då är ett flerpack av samma märke nästan alltid billigare än att köpa styck.",
  },
];
