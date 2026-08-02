import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { KOLMONOXIDVARNARE } from "@/lib/categories";

/**
 * Kolmonoxidvarnare. Underlag i .agent/research-kolmonoxidvarnare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, lagerstatus, batterityp, batteritid,
 * angiven livslängd, ljudtryck, sammankopplingsteknik, artikelnummer,
 * kundbetyg och framför allt vilken del och vilken utgåva av EN 50291 varje
 * butik anger. Allt läst 2026-08-02 på butikens egen produktsida.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte utsatt någon varnare
 * för kolmonoxid och vi har inte sett något provningsintyg.
 *
 * ## Sidans fynd: två delar och två generationer
 *
 * Del 1 av EN 50291 gäller bostäder. Del 2 gäller husvagn, husbil och båt och
 * lägger till provning för vibration, rörelse och temperaturväxling. Utgåvan
 * spelar också roll: 2018 gjorde livslängdsindikering obligatorisk, och
 * föregångaren 2010+A1:2012 drogs tillbaka av BSI i september 2021.
 *
 * | Produkt | Del 1 | Del 2 | Utgåva |
 * |---|---|---|---|
 * | Housegard CA108 | Ja | Ja | 2018 och 2019, båda gällande |
 * | Netatmo | | Ja | 2019 |
 * | X-Sense XC01-M | Ja | Nej | 2018 |
 * | Heiman WS-720ES | Ja | Nej | 2018 |
 * | Fireblitz CO10-RF | Ja | Ja | 2010+A1:2012 och 2010, tillbakadragna |
 * | Deltronic CO7BD | Ja | Ja | 2010+A1:2012 och 2010, tillbakadragna |
 *
 * ## ⚠️ Batteritid och livslängd är två olika tal
 *
 * Butikerna blandar ihop dem, och skillnaden är avgörande. Housegards CA108
 * anger "batteritid upp till 3 år" och "livslängd 10 år": batteriet är två
 * utbytbara AA, sensorn räcker tio. Fireblitz anger i stället ett inbyggt
 * batteri med tio års garanterad livslängd, alltså ett enda tal för båda.
 *
 * Kriteriet `livslangd` bedömer **enhetens livslängd**, inte batteriets,
 * eftersom det är enheten som måste kastas när sensorn löpt ut.
 *
 * ## Butiksfördelningen blev bättre än på /brandfilt
 *
 * Användaren bad uttryckligen om att Clas Ohlson skulle tas in för att bredda
 * underlaget. Det gav utfall: Kjell tar förstaplatsen och Clas Ohlson andra,
 * och Brandvarnare.se, den enda butik vi kan annonsera mot, tar plats tre till
 * sex. Det är ingenting vi styrt fram, det är vad certifieringen och
 * livslängden ger.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "housegard-ca108",
    name: "Kolmonoxidlarm CA108",
    shortName: "CA108",
    brand: "Housegard",
    image: productImage(KOLMONOXIDVARNARE.slug, "housegard-ca108"),
    tagline: "Enda varnaren som anger båda delarna av standarden i gällande utgåva.",
    scores: { certifiering: 5, livslangd: 4.5, larmvag: 2, prisvarde: 5, avlasning: 4.5 },
    price: 449.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/gaslarm/housegard-kolmonoxidlarm-p32831",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 11, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst dokumenterad, och godkänd för både hem och husvagn",
    pros: [
      "EN 50291-1:2018 samt EN 50291-2:2019, alltså båda delarna i gällande utgåva",
      "Godkänd för både bostad och husvagn eller båt, till skillnad från fyra av de andra",
      "Tio års livslängd på enheten, med utbytbara AA-batterier i stället för ett inbyggt",
      "LCD visar aktuell CO-nivå och om varnaren larmat de senaste 48 timmarna",
    ],
    cons: [
      "Fristående, går inte att koppla ihop med andra varnare och når ingen telefon",
      "Batteritiden är bara upp till tre år, så den kräver batteribyte tre gånger under sin livslängd",
    ],
    specs: [
      { label: "Certifiering", value: "EN 50291-1:2018 och -2:2019", highlight: true },
      { label: "Godkänd för", value: "Bostad, husvagn och båt", highlight: true },
      { label: "Livslängd", value: "10 år", highlight: true },
      { label: "Batteri", value: "2 × AA, upp till 3 år", highlight: true },
      { label: "Display", value: "LCD med ppm och 48-timmarshistorik", highlight: true },
      { label: "Sammankoppling", value: "Nej" },
    ],
    verdict:
      "Den här vinner för att den är den enda varnaren i jämförelsen där du kan läsa dig till att den är provad för både bostaden och husvagnen, i de utgåvor som faktiskt gäller.\n\nKjell anger EN 50291-1:2018 samt EN 50291-2:2019. Del 2 är den som lägger till provning för vibration, rörelse och temperaturväxling, alltså det som skiljer en husvagn från ett vardagsrum. Fyra av de sex varnarna vi rankar saknar antingen del 2 eller anger den i en utgåva som drogs tillbaka 2021.\n\nDen skiljer också på två tal som resten av branschen blandar ihop. Batteritiden är upp till tre år och batteriet är två vanliga AA. Livslängden är tio år och gäller sensorn. Det är sensorn som avgör när hela varnaren ska kastas, och tio år är den längsta livslängden i jämförelsen tillsammans med de två dyraste.\n\nDisplayen visar aktuell halt i ppm och om varnaren larmat de senaste 48 timmarna. Den andra funktionen är mer värd än den låter: en långsam läcka som ger huvudvärk på nätterna syns i historiken även om ingen var vaken när det small.\n\nDet den inte gör är att prata med något annat. Ingen sammankoppling, ingen app. Hänger den i husvagnen på tomten hör du den inte inifrån huset, och det är den enda verkliga invändningen mot att den kostar 449,90.",
  },
  {
    id: "netatmo-smart-co",
    name: "Smart kolmonoxidvarnare",
    /* Inte "Netatmo": varumärket renderas separat i väljare och tabell, och
       ett shortName som upprepar det ger "Netatmo Netatmo". */
    shortName: "Smart CO-varnare",
    brand: "Netatmo",
    image: productImage(KOLMONOXIDVARNARE.slug, "netatmo-smart-co"),
    tagline: "Byggd för fritidsfordon, med larm i telefonen och tio år i batteriet.",
    scores: { certifiering: 4, livslangd: 4.5, larmvag: 4, prisvarde: 2.5, avlasning: 4 },
    price: 1099,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Netatmo-smart-kolmonoxidvarnare/p/36-8763",
    priceCheckedAt: PRICE_CHECKED,
    award: "runnerup",
    superlative: "Bäst för husvagnen och båten",
    pros: [
      "EN50291-2:2019, alltså den gällande utgåvan av delen som gäller fritidsfordon",
      "Clas Ohlson skriver ut att certifieringen är specifik för fritidsfordon",
      "Tio års batteritid, du behöver aldrig byta batteri under varnarens liv",
      "Larmet når telefonen, vilket är hela poängen när varnaren sitter i ett fordon du inte är i",
    ],
    cons: [
      "Dyrast i jämförelsen med råge, 1 099 kronor mot 449,90 för vinnaren",
      "Butiken anger bara del 2, så det står ingenstans att den är provad mot del 1 för bostäder",
      "Kräver wifi och app för att larmet ska nå längre än till rummet",
    ],
    specs: [
      { label: "Certifiering", value: "EN 50291-2:2019", highlight: true },
      { label: "Godkänd för", value: "Husvagn, husbil och båt", highlight: true },
      { label: "Livslängd", value: "10 år", highlight: true },
      { label: "Batteri", value: "Inbyggt, 10 år", highlight: true },
      { label: "Display", value: "I appen", highlight: true },
      { label: "Sammankoppling", value: "Via app och wifi" },
    ],
    verdict:
      "Om varnaren ska sitta i husvagnen, husbilen eller båten är det här den som är byggd för uppgiften och den som säger det rakt ut.\n\nClas Ohlson anger EN50291-2:2019 och skriver att certifieringen är specifik för fritidsfordon. Det är den formulering vi letat efter i hela kategorin, och den finns på exakt en produktsida.\n\nDen löser också problemet vinnaren har. En varnare i ett fordon på tomten, eller i en båt i hamnen, larmar för ingen om larmet stannar i fordonet. Netatmo skickar det till telefonen. Det är dyrt köpt, men det är skillnaden mellan ett larm och ett larm som når fram.\n\nTio års inbyggt batteri betyder att du aldrig rör den under dess livslängd. Det är bekvämt och det är också det enda alternativet, eftersom batteriet inte går att byta.\n\nTvå invändningar. Priset är mer än det dubbla mot vinnaren. Och butiken anger bara del 2, alltså inte del 1 för bostäder. Vi vet därför inte om den är provad mot den. Ska den sitta i ett hus i stället är det en uppgift som saknas.",
  },
  {
    id: "x-sense-xc01-m",
    name: "XC01-M CO-varnare",
    shortName: "XC01-M",
    brand: "X-Sense",
    image: productImage(KOLMONOXIDVARNARE.slug, "x-sense-xc01-m"),
    tagline: "Den enda som kopplar ihop 24 varnare så att hela huset larmar samtidigt.",
    scores: { certifiering: 3.5, livslangd: 3, larmvag: 5, prisvarde: 3, avlasning: 2 },
    price: 495,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xc01-m/",
    priceCheckedAt: PRICE_CHECKED,
    award: "editor",
    superlative: "Bäst sammankoppling",
    pros: [
      "EN 50291-1:2018, alltså gällande utgåva, plus ett TÜV-nummer i specifikationen",
      "Trådlös sammankoppling av upp till 24 varnare, eller 50 med basstation",
      "Räckvidd 500 meter fri sikt på 868 MHz, alltså genom ett helt hus",
      "Över 85 dB på tre meters avstånd",
      "Utbytbart CR123A-batteri i stället för ett inbyggt som tvingar fram nyköp",
    ],
    cons: [
      "Ingen del 2, alltså inte provad för husvagn eller båt",
      "Ingen display, den larmar men visar ingen halt",
      "Fem års garanti är kortast bland de dyrare varnarna",
    ],
    specs: [
      { label: "Certifiering", value: "EN 50291-1:2018", highlight: true },
      { label: "Godkänd för", value: "Bostad", highlight: true },
      { label: "Livslängd", value: "Batteri över 5 år, 5 års garanti", highlight: true },
      { label: "Batteri", value: "Utbytbart 3 V CR123A", highlight: true },
      { label: "Display", value: "Nej", highlight: true },
      { label: "Sammankoppling", value: "868 MHz, max 24 enheter" },
      { label: "Ljudtryck", value: "Över 85 dB på 3 m" },
      { label: "Artikelnummer", value: "10246" },
    ],
    verdict:
      "Har du en villa i två plan med en braskamin på bottenvåningen och sovrum en trappa upp är det här den enda varnaren i jämförelsen som löser det riktiga problemet.\n\nKolmonoxid dödar framför allt den som sover, och en varnare som tjuter i vardagsrummet väcker inte nödvändigtvis någon på övervåningen. XC01-M kopplas trådlöst ihop med upp till 24 andra varnare, femtio med basstation, på 868 MHz med 500 meters räckvidd. Larmar en, larmar alla.\n\nCertifieringen är EN 50291-1:2018, alltså gällande utgåva, och butiken anger dessutom ett TÜV-nummer. Det gäller bara del 1. Ska varnaren till husvagnen är det fel produkt.\n\nBatteriet är ett utbytbart CR123A, vilket vi räknar som en fördel: när ett inbyggt batteri tar slut kastar du hela varnaren även om sensorn hade år kvar.\n\nDen visar ingenting. Ingen display, ingen ppm-siffra, ingen historik. Det räcker för att larma men inte för att förstå varför den larmade.",
  },
  {
    id: "heiman-ws-720es",
    name: "WS-720ES Wi-Fi CO-larm",
    shortName: "WS-720ES",
    brand: "Heiman",
    image: productImage(KOLMONOXIDVARNARE.slug, "heiman-ws-720es"),
    tagline: "Billigaste vägen till larm i telefonen, men kortast liv i jämförelsen.",
    scores: { certifiering: 3.5, livslangd: 2.5, larmvag: 4, prisvarde: 2.5, avlasning: 3.5 },
    price: 449,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/heiman-ws-720es/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast med app",
    pros: [
      "BS EN50291-1:2018 utskrivet i specifikationen",
      "Wi-Fi och app, alltså larm som når dig när du inte är hemma",
      "Vanliga AA-batterier som går att byta i vilken butik som helst",
      "Sexhundrafemtio kronor billigare än Netatmo för samma sorts appfunktion",
    ],
    cons: [
      "Bara två års sensorgaranti, kortast i jämförelsen",
      "Fem års batteritid mot tio hos de bästa",
      "Ingen del 2, alltså inte provad för husvagn eller båt",
      "Kräver wifi där varnaren sitter, vilket sällan finns i ett pannrum eller garage",
    ],
    specs: [
      { label: "Certifiering", value: "BS EN 50291-1:2018", highlight: true },
      { label: "Godkänd för", value: "Bostad", highlight: true },
      { label: "Livslängd", value: "2 års sensorgaranti", highlight: true },
      { label: "Batteri", value: "2 × AA, cirka 5 år", highlight: true },
      { label: "Display", value: "I appen", highlight: true },
      { label: "Sammankoppling", value: "Wi-Fi till app" },
      { label: "Artikelnummer", value: "10625" },
    ],
    verdict:
      "Vill du ha larmet i telefonen och tycker att Netatmos 1 099 kronor är för mycket är det här alternativet, och det kostar 449.\n\nCertifieringen är BS EN50291-1:2018, alltså gällande utgåva av delen för bostäder. Wi-Fi och app gör att du får veta något även när du är borta, och det är den enda funktion som spelar roll för ett fritidshus du besöker varannan helg.\n\nDet som drar ner den är hur länge den lever. Två års sensorgaranti är kortast i hela jämförelsen, mot sju hos Deltronic och tio hos vinnaren. Batteritiden anges till fem år. Räknat per år är den därför dyrare än den ser ut, och det är skälet till att den hamnar i mitten trots rätt certifiering och app.\n\nEn praktisk sak värd att tänka på innan du beställer: den kräver wifi där den hänger. Kolmonoxid uppstår oftast i pannrum, garage och intill braskaminer, alltså precis de utrymmen där täckningen brukar ta slut.",
  },
  {
    id: "fireblitz-co10-rf",
    name: "CO10-RF CO-varnare",
    shortName: "CO10-RF",
    brand: "Fireblitz",
    image: productImage(KOLMONOXIDVARNARE.slug, "fireblitz-co10-rf"),
    tagline: "Tio år, sammankopplingsbar och godkänd för fordon, men mot tillbakadragna utgåvor.",
    scores: { certifiering: 2, livslangd: 4.5, larmvag: 4.5, prisvarde: 2, avlasning: 2 },
    price: 1058,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/co10-rf/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Längst garanti",
    pros: [
      "Anger både del 1 och del 2, alltså godkänd för bostad, husvagn och båt",
      "Inbyggt batteri med tio års garanterad livslängd",
      "Tio års garanti, längst i jämförelsen",
      "Radiosammankopplingsbar, så flera varnare larmar samtidigt",
    ],
    cons: [
      "Utgåvorna är BS EN50291-1:2010+A1:2012 och BS-EN50291-2:2010, alltså de som föregick dagens",
      "EN 50291-1:2010 drogs tillbaka av BSI i september 2021",
      "Butiken nämner ingen livslängdsindikering, kravet som tillkom i 2018 års utgåva",
      "Dyrast i jämförelsen efter Netatmo, utan att ge mer än vinnaren gör för 449,90",
      "Ingen display",
    ],
    specs: [
      { label: "Certifiering", value: "BS EN 50291-1:2010+A1:2012 och -2:2010", highlight: true },
      { label: "Godkänd för", value: "Bostad, husvagn och båt", highlight: true },
      { label: "Livslängd", value: "10 år", highlight: true },
      { label: "Batteri", value: "Inbyggt 3 V litium, 10 år", highlight: true },
      { label: "Display", value: "Nej", highlight: true },
      { label: "Sammankoppling", value: "Radio (RF)" },
      { label: "Artikelnummer", value: "10573" },
    ],
    verdict:
      "På pappret har den allt: tio års batteri, tio års garanti, radiosammankoppling och godkännande för både bostad och fordon. Det är kombinationen vinnaren saknar.\n\nProblemet står i samma spec-rad. Utgåvorna är BS EN50291-1:2010+A1:2012 och BS-EN50291-2:2010, alltså de som gällde innan revisionerna. EN 50291-1:2010 drogs tillbaka av BSI i september 2021.\n\nDet spelar roll av en konkret anledning. Det viktigaste 2018 års utgåva lade till är kravet på obligatorisk livslängdsindikering, med både ljud och synlig signal. En CO-sensor löper ut, och utan indikering hänger det kvar en varnare på väggen som ingen vet är död. Butiken nämner ingen sådan funktion. Vi skriver inte att den saknas, vi skriver att den inte står någonstans.\n\nFör 1 058 kronor är det svårt att motivera mot vinnarens 449,90, som anger båda delarna i gällande utgåva och har samma tio års livslängd.",
  },
  {
    id: "deltronic-co7bd",
    name: "CO7BD CO-varnare",
    shortName: "CO7BD",
    brand: "Deltronic",
    image: productImage(KOLMONOXIDVARNARE.slug, "deltronic-co7bd"),
    tagline: "Billigast, och den enda som visar hur mycket kolmonoxid du har i blodet.",
    scores: { certifiering: 2, livslangd: 3.5, larmvag: 2, prisvarde: 3.5, avlasning: 5 },
    price: 399,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/deltronic-co7bd/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Mest information på displayen",
    pros: [
      "Billigast i jämförelsen på 399 kronor",
      "Displayen visar CO-halt, högsta uppmätta värde och beräknad andel COHb i blodet",
      "Sju års inbyggt litiumbatteri och sju års sensorgaranti",
      "Anger både del 1 och del 2 av standarden",
    ],
    cons: [
      "Utgåvorna är 2010+A1:2012 och 2010, alltså tillbakadragna",
      "Butiken nämner ingen livslängdsindikering",
      "Fristående, ingen sammankoppling och ingen app",
      "Inbyggt batteri, så hela varnaren kastas när det tar slut",
    ],
    specs: [
      { label: "Certifiering", value: "BS EN 50291-1:2010+A1:2012 och -2:2010", highlight: true },
      { label: "Godkänd för", value: "Bostad, husvagn och båt", highlight: true },
      { label: "Livslängd", value: "7 år", highlight: true },
      { label: "Batteri", value: "Inbyggt 3 V litium, 7 år", highlight: true },
      { label: "Display", value: "CO-halt, maxvärde och COHb", highlight: true },
      { label: "Sammankoppling", value: "Nej" },
      { label: "Artikelnummer", value: "10632" },
    ],
    verdict:
      "Billigast i jämförelsen och den som visar mest. Displayen anger inte bara aktuell CO-halt utan också högsta uppmätta värde och en beräknad andel COHb, alltså hur mycket av blodets syretransport som slagits ut.\n\nDet sista är ovanligt och faktiskt användbart. Det vanligaste sättet att bli förgiftad är inte en akut topp utan en låg halt under lång tid, och den som får huvudvärk varje morgon utan att veta varför har nytta av ett tal att visa upp.\n\nMen certifieringen är angiven mot 2010 och 2012 års utgåvor, precis som Fireblitz, och den ena av dem drogs tillbaka 2021. Butiken nämner ingen livslängdsindikering. Sju års sensorgaranti är mitt i fältet.\n\nDen är alltså rätt köp i ett smalt läge: du vill ha en avläsbar varnare till ett rum i bostaden, du tänker byta den inom sju år ändå, och du bryr dig mer om vad den visar än om vilken utgåva av standarden butiken hänvisar till. Vill du ha det bäst dokumenterade kostar det femtio kronor mer.",
  },
];

export const KOLMONOXIDVARNARE_PRODUCTS: Product[] = resolveProducts(
  KOLMONOXIDVARNARE,
  SEEDS,
);

/**
 * Övervägda men inte rankade.
 *
 * De två första är ett användarbeslut: en säkerhetsprodukt där certifieringen
 * inte går att kontrollera hör inte hemma i en rankning. På /brandfilt valde vi
 * motsatt linje och gav lägsta betyg i stället. Skillnaden är att Kjell där
 * publicerade en specifikation som bara saknade årtalet, medan de här inte
 * publicerar någon specifikation alls.
 */
export const KOLMONOXIDVARNARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Housegard",
    name: "Luma Trådlös Kolmonoxidvarnare CA150",
    reason:
      "Kopplas ihop med upp till 40 Luma-enheter och blir uppkopplad med Luma Hub, alltså samma system som vi rankar på våra brandvarnarsidor. På funktion hade den hört hemma här. Men Kjell publicerar ingen specifikation alls för den, och därmed ingen uppgift om vilken del eller utgåva av EN 50291 den är provad mot. Vi rankar den inte förrän den uppgiften finns. Kontrollerat för hand 2026-08-02.",
    approxPrice: 449,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/gaslarm/housegard-luma-tradlos-kolmonoxidvarnare-p21272",
  },
  {
    brand: "Kjell & Company",
    name: "Kolmonoxidlarm",
    reason:
      "Billigare än vinnaren och med det största kundunderlaget i kategorin, 36 betyg på 4,0. Men även här saknas specifikation helt hos butiken, så det går inte att läsa sig till vilken del av standarden den är provad mot. Kundbetyg är inte ett substitut för en certifieringsuppgift när produkten är till för att upptäcka en dödlig gas.",
    approxPrice: 399.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/gaslarm/kolmonoxidlarm-p21188",
  },
  {
    brand: "Nexa",
    name: "Gasvarnare för 230 eller 12 V",
    reason:
      "En gasolvarnare, inte en kolmonoxidvarnare. Den känner av oförbränd gasol som läcker ut, medan en CO-varnare känner av kolmonoxid som bildas när något förbränns ofullständigt. Två olika sensorer för två olika faror, och de ersätter inte varandra. Har du gasol i husvagnen behöver du båda. Gasolvarnare får en egen sida.",
    approxPrice: 449,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/gaslarm",
  },
  {
    brand: "Diverse",
    name: "CO-varnare utan angiven standard",
    reason:
      "Det säljs kolmonoxidvarnare på marknadsplatser som inte anger någon del av EN 50291 alls. En CO-varnare är svårare att kontrollera själv än nästan vilken annan produkt som helst: du kan inte se om den fungerar, och du märker inte att den inte gör det förrän det är för sent. Vi tar inte in dem.",
  },
];

export const KOLMONOXIDVARNARE_FAQ = [
  {
    question: "Vilken kolmonoxidvarnare är bäst 2026?",
    answer:
      "Housegard Kolmonoxidlarm CA108 hos Kjell för 449,90 kronor. Den är den enda varnaren i vår jämförelse där butiken anger båda delarna av EN 50291 i gällande utgåva, alltså -1:2018 för bostäder och -2:2019 för husvagn och båt. Den har tio års livslängd på enheten, utbytbara AA-batterier och en display som visar aktuell halt och om varnaren larmat de senaste 48 timmarna. Det den inte gör är att koppla ihop sig med andra varnare eller nå en telefon.",
  },
  {
    question: "Vad betyder EN 50291 på en kolmonoxidvarnare?",
    answer:
      "Det är den europeiska standarden för kolmonoxidvarnare, och den har två delar. Del 1 gäller varnare i bostäder. Del 2 gäller husvagn, husbil och båt och lägger till provning för vibration, rörelse och temperaturväxling. En varnare som bara anger del 1 är alltså inte provad för det fordon många köper den till. Kontrollera dessutom utgåvan: 2018 gjorde livslängdsindikering obligatorisk, och föregångaren från 2010 drogs tillbaka i september 2021.",
  },
  {
    question: "Behöver alla hem en kolmonoxidvarnare?",
    answer:
      "Nej, och det är värt att säga rakt ut. Kolmonoxid bildas vid ofullständig förbränning, så risken finns där något förbränns: braskamin, vedspis, oljepanna, gasolkök, fotogenkamin, eller ett garage som ligger under eller i direkt anslutning till bostaden. En lägenhet med enbart el och fjärrvärme har ingen sådan källa. Har du däremot husvagn, husbil eller båt med gasol eller motor är svaret ja, och då behöver du en varnare som anger del 2 av standarden.",
  },
  {
    question: "Finns det något oberoende test av kolmonoxidvarnare?",
    answer:
      "Inte i Sverige eller Norden. Amerikanska Consumer Reports mäter däremot CO-varnare i labb och har funnit att flera underrapporterar halten och larmar för sent. Två saker gör att vi inte lånar deras omdömen: de provar mot amerikanska UL 2034 med andra tröskeltider än den europeiska standarden, och deras X-Sense-test gäller en annan modell än den vi rankar. Ett omdöme om ett märke är inte ett omdöme om en produkt.",
  },
  {
    question: "Hur länge håller en kolmonoxidvarnare?",
    answer:
      "Fem till tio år beroende på modell, och det är sensorn som sätter gränsen, inte batteriet. Blanda inte ihop talen: Housegards CA108 anger batteritid upp till tre år och livslängd tio år, alltså utbytbara batterier och en sensor som räcker längre. När sensorn löper ut ska hela varnaren kastas. Från och med 2018 års utgåva av standarden ska varnaren själv säga till när det är dags, med både ljud och synlig signal.",
  },
  {
    question: "Var ska kolmonoxidvarnaren sitta?",
    answer:
      "I samma rum som förbränningskällan, alltså där braskaminen, pannan eller gasolköket står, och i eller strax utanför sovrummet om det ligger på ett annat plan. Kolmonoxid är ungefär lika tungt som luft och blandar sig, så den behöver inte sitta i taket som en brandvarnare. Undvik att sätta den direkt ovanför en eldstad eller i drag från ett fönster.",
  },
  {
    question: "Kan en brandvarnare känna av kolmonoxid?",
    answer:
      "Nej. En optisk brandvarnare känner av rökpartiklar, och kolmonoxid är en osynlig och luktfri gas utan partiklar. De två larmen skyddar mot olika saker och ersätter inte varandra. Det finns kombinerade enheter, men de är två sensorer i samma hölje och inte en sensor som gör båda jobben.",
  },
  {
    question: "Vad kostar en kolmonoxidvarnare?",
    answer:
      "De vi jämför kostar mellan 399 och 1 099 kronor, kontrollerat 2026-08-02. Den bäst dokumenterade kostar 449,90. Räkna hellre per år än per styck, eftersom hela varnaren ska kastas när sensorn löpt ut: en varnare på 449 kronor med två års sensorgaranti är dyrare över tid än en på 449,90 med tio års livslängd.",
  },
  {
    question: "Måste man ha kolmonoxidvarnare i husvagn?",
    answer:
      "Det finns inget lagkrav i Sverige, men det är den plats där risken är som störst i förhållande till hur liten volymen luft är. Har du gasol i husvagnen, husbilen eller båten bör du ha en varnare som anger EN 50291-2, alltså den del som provats för vibration och temperaturväxling. Tänk också på att en gasolvarnare är en annan produkt: den känner av gasol som läcker, inte kolmonoxid från förbränning.",
  },
];
