import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { KOLMONOXIDVARNARE } from "@/lib/test-pages";

/**
 * Kolmonoxidvarnare. Underlag i .agent/research/kolmonoxidvarnare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser och kundbetyg, lästa på butikens egen sida
 * 2026-08-02. Certifiering, sensorns livslängd, batteri, driftstemperatur,
 * ljudtryck, mått, vikt och sammankoppling är hämtade ur tillverkarens egna
 * dokument 2026-08-06, inte ur butikens specifikationsrad. Se
 * kommentaren vid varje produkt för vilket dokument.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte utsatt någon varnare
 * för kolmonoxid och vi har inte sett något provningsintyg utöver de öppna
 * register som anges nedan.
 *
 * ## ⚠️ Läs inte certifieringen ur butiksledet
 *
 * Det här är sidans dyraste läxa. Fram till 2026-08-06 bar sidan butikernas
 * specifikationsrader, och **sex av sju kontrollerade uppgifter var fel**:
 *
 * | Butiken sa | Tillverkaren säger |
 * |---|---|
 * | Netatmo: bara del 2 | Både -1:2018 och -2:2019, EU-försäkran NCO01_v5 |
 * | Fireblitz: 2010+A1:2012 och 2010 | BS EN 50291-1:2018 och -2:2019, specblad 8162 V1.2 |
 * | Deltronic: 2010+A1:2012 och 2010 | BS EN 50291-1:2018 och -2:2019, produktblad 2024 |
 * | Fireblitz: livslängdsindikering okänd | END OF LIFE INDICATOR, tre pip i minuten |
 * | Deltronic: livslängdsindikering okänd | Tre klick i minuten, byt hela varnaren |
 * | Heiman: 2 års sensorlivslängd | Upp till 10 år. Två år är distributörens garanti |
 *
 * Deltronics **egen webbtabell säger fortfarande 2010-utgåvorna** medan deras
 * eget produktblad och deras egen manual säger 2018 och 2019. PDF:erna gäller:
 * de är nyare, mer specifika, och en manual reviderad i mars 2022 som pekar på
 * 2018 är internt konsistent med att 2010-utgåvan drogs tillbaka i september
 * 2021. Konflikten är loggad i researchfilen.
 *
 * ## Vad som faktiskt skiljer varnarna åt
 *
 * **Alla sex är provade mot EN 50291-1:2018.** Utgåveaxeln som sidan byggdes på
 * finns inte. Kvar finns två skillnader som håller:
 *
 * 1. **Del 2 eller inte.** Fyra av sex är dessutom provade enligt EN 50291-2,
 *    som lägger till prov för vibration, rörelse och temperaturväxling. De får
 *    sitta i husvagn, husbil och båt. X-Sense och Heiman får inte det.
 * 2. **Driftstemperatur.** X-Sense XC01-M fungerar först vid +4 °C. De fem
 *    andra går ner till -10 °C. I ett ouppvärmt garage eller en båt är det
 *    skillnaden mellan en varnare som fungerar på vintern och en som inte gör
 *    det, och ingen svensk jämförelse nämner det.
 *
 * ## ⚠️ Batteritid och livslängd är två olika tal
 *
 * Housegards CA108 har två utbytbara AA som räcker tre år och en sensor som
 * räcker tio. Fireblitz har ett inbyggt batteri där båda talen är tio.
 * Kriteriet `livslangd` bedömer **enhetens livslängd**, inte batteriets,
 * eftersom det är enheten som måste kastas när sensorn löpt ut.
 *
 * ## Oberoende provningsmärken står som fördel, aldrig som avdrag
 *
 * Fireblitz bär BSI:s Kitemark KM 573122, Netatmo bär NF-DAACO enligt NF292 och
 * X-Sense XC01-M står namngiven i TÜV Rheinlands öppna register. De tre får det
 * som en fördel. För Housegard, Deltronic och Heiman hittades inget sådant
 * märke, och **det ger inget avdrag och står ingenstans i läsartexten**, av
 * skälet i .claude/references/establishing-absence.md: ett märke vi inte hittat
 * är inte ett märke som inte finns.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

/** Specar hämtade ur tillverkarnas egna dokument detta datum. */
export const SPECS_CHECKED = "2026-08-06";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    /* Specar ur Housegards egen manual 604024 (housegard.se) och deras
       produktsida, båda lästa 2026-08-06. Manualen bär tillverkarens
       försäkran om överensstämmelse mot EN 50291-1:2018 och -2:2019, samt
       raden "This CO Alarm has a product life of 10 years from the production
       date". Larmminnet anges till 7 dagar i manualen och till 48 timmar på
       produktsidan; manualen gäller, eftersom den beskriver funktionen i
       detalj och anger att minnet nollställs automatiskt efter 7 dagar. */
    id: "housegard-ca108",
    name: "Kolmonoxidlarm CA108",
    shortName: "CA108",
    brand: "Housegard",
    image: productImage(KOLMONOXIDVARNARE.slug, "housegard-ca108"),
    tagline: "Provad för både bostaden och husvagnen, med halten i klartext på displayen.",
    scores: { certifiering: 5, livslangd: 4.5, larmvag: 2, prisvarde: 5, avlasning: 4.5 },
    price: 449.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/gaslarm/housegard-kolmonoxidlarm-p32831",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 12, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för dig som har både hus och husvagn",
    pros: [
      "Provad enligt både EN 50291-1:2018 och -2:2019, alltså godkänd för bostad, husvagn och båt",
      "Tio år på sensorn, med två vanliga AA-batterier du byter själv i stället för att kasta varnaren",
      "Displayen visar halten i ppm löpande, och larmminnet sparar högsta uppmätta värde i sju dagar",
      "Säger till med ljud och \"END\" i displayen när sensorn är förbrukad",
      "100 gram, lättast av varnarna med display",
    ],
    cons: [
      "Fristående. Larmar den i pannrummet är det inte säkert att den väcker någon två plan upp, och där löser X-Sense XC01-M problemet",
      "Batterierna räcker tre år, så du byter dem tre gånger under varnarens liv",
    ],
    specs: [
      { label: "Certifiering", value: "EN 50291-1:2018 och -2:2019", highlight: true },
      { label: "Godkänd för", value: "Bostad, husvagn och båt", highlight: true },
      { label: "Sensorns livslängd", value: "10 år", highlight: true },
      { label: "Batteri", value: "2 × AA, 3 år", highlight: true },
      { label: "Driftstemperatur", value: "-10 till +40 °C", highlight: true },
      { label: "Display", value: "LCD med ppm och larmminne", highlight: true },
      { label: "Sammankoppling", value: "Nej", highlight: true },
      { label: "Ljudtryck", value: "85 dB på 3 m" },
      { label: "Mått", value: "120 × 73 × 34 mm" },
      { label: "Vikt", value: "100 g" },
    ],
    verdict:
      "Housegard CA108 är den billigaste varnaren som är provad för både bostaden och fordonet. Den kostar 449,90.\n\nDel 2 av EN 50291 lägger till prov för vibration, rörelse och temperaturväxling, alltså det en varnare utsätts för i en husvagn och aldrig i ett vardagsrum. CA108 är provad mot båda delarna, så samma varnare kan sitta vid kaminen på vintern och följa med i husbilen på sommaren. Sensorn håller tio år, och batterierna är två vanliga AA som du byter för en tjugolapp när de tar slut efter tre år. De två varnare som har inbyggt batteri måste du i stället kasta i sin helhet.\n\nDisplayen visar halten i ppm löpande, och larmminnet sparar det högsta värdet i sju dagar. Det är mer värt än det låter. Det farliga förloppet är sällan en akut topp utan en låg halt under lång tid, och den som vaknar med huvudvärk tre morgnar i rad kan läsa av vad som faktiskt hänt i huset medan alla sov.\n\nDen pratar inte med något annat. Ingen sammankoppling, ingen app, så den skyddar det rum den hänger i och inget mer. Köp den om varnaren ska sitta där du är, eller ska följa med mellan huset och fordonet. Ska larmet väcka någon på ett annat plan tar du X-Sense XC01-M och kopplar ihop flera.",
  },
  {
    /* Specar ur Fireblitz eget specifikationsblad 8162 V1.2 (juni 2025) och
       CO10-RF-manualen, lästa 2026-08-06. Specbladet anger "Approval/Certified
       to: BS EN50291-1:2018; BS EN50291-2:2019" och Kitemark-numret KM 573122,
       samt END OF LIFE INDICATOR. Butiksledets uppgift om 2010-utgåvorna är
       felaktig och rättades 2026-08-06, se lib/corrections.ts. */
    id: "fireblitz-co10-rf",
    name: "CO10-RF CO-varnare",
    shortName: "CO10-RF",
    brand: "Fireblitz",
    image: productImage(KOLMONOXIDVARNARE.slug, "fireblitz-co10-rf"),
    tagline: "Kopplas ihop med rök- och värmevarnarna, så hela huset larmar samtidigt.",
    scores: { certifiering: 5, livslangd: 5, larmvag: 4.5, prisvarde: 2.5, avlasning: 2.5 },
    price: 1058,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/co10-rf/",
    priceCheckedAt: PRICE_CHECKED,
    award: "editor",
    superlative: "Bäst för dig som redan har seriekopplade brandvarnare",
    pros: [
      "Provad enligt både EN 50291-1:2018 och -2:2019, alltså godkänd för bostad, husvagn och båt",
      "Bär BSI:s Kitemark, KM 573122, alltså provning och löpande fabrikskontroll av tredje part",
      "Kopplas trådlöst ihop med upp till 20 enheter på 868 MHz, och rök- och värmevarnare får sitta i samma system",
      "Tio års garanti, längst av varnarna, med ett inbyggt batteri som räcker lika länge",
      "80 gram och 30 millimeter djup, minst av varnarna",
    ],
    cons: [
      "1 058 kronor, alltså mer än det dubbla mot Housegard CA108 som är provad för samma sak",
      "Ingen display. Den larmar men visar ingen halt, och vill du se talet kostar Deltronic CO7BD mindre än hälften",
      "Inbyggt batteri, så hela varnaren kastas efter tio år",
    ],
    specs: [
      { label: "Certifiering", value: "EN 50291-1:2018 och -2:2019", highlight: true },
      { label: "Godkänd för", value: "Bostad, husvagn och båt", highlight: true },
      { label: "Sensorns livslängd", value: "10 år", highlight: true },
      { label: "Batteri", value: "Inbyggt, 10 år", highlight: true },
      { label: "Driftstemperatur", value: "-10 till +40 °C", highlight: true },
      { label: "Display", value: "Nej", highlight: true },
      { label: "Sammankoppling", value: "20 varnare, 868 MHz", highlight: true },
      { label: "Ljudtryck", value: "85 dB på 3 m" },
      { label: "Mått", value: "100 × 65 × 30 mm" },
      { label: "Vikt", value: "80 g" },
      { label: "Artikelnummer", value: "10573" },
    ],
    verdict:
      "CO10-RF är varnaren för den som vill att ett larm var som helst i huset ska höras överallt. Den kostar 1 058 kronor.\n\nDen kopplas trådlöst ihop med upp till 20 enheter på 868 MHz, och det är inte bara andra CO-varnare: rök- och värmevarnare ur samma serie sitter i samma system. Har du redan seriekopplade brandvarnare på plan två blir kolmonoxidlarmet i pannrummet hört i hela huset utan att du drar en enda kabel. Det är den ena av två anledningar att betala det här priset.\n\nDen andra är BSI:s Kitemark, KM 573122. Ett CE-märke betyder att tillverkaren själv försäkrat att varan följer standarden. En Kitemark betyder att ett oberoende laboratorium provat varnaren och att fabriken kontrolleras löpande. På en produkt som ska upptäcka en luktfri gas är det en verklig skillnad, och den kommer med tio års garanti, längst i jämförelsen.\n\nDen visar ingenting. Ingen display, ingen ppm-siffra, så du får veta att något är fel men inte hur illa det är eller hur länge det pågått. Köp den om huset har flera plan eller en fristående byggnad och du vill att alla larm ska höras överallt. Räcker det med en varnare i rummet du sitter i gör Housegard CA108 samma provade jobb för mindre än halva priset.",
  },
  {
    /* Specar ur Netatmos egen EU-försäkran om överensstämmelse (NCO01_v5,
       netatmo.com/document/6ad57846-...pdf) och användarmanualen, båda länkade
       från tillverkarens produktsida och lästa 2026-08-06. Försäkran anger
       EN 50291-1:2018 och EN 50291-2:2019. Manualens NF-tabell anger sensorns
       livslängd till 10 år, livslängdsindikering "Oui" och att enheten inte är
       hopkopplingsbar med andra detektorer. Butiken angav bara del 2. */
    id: "netatmo-smart-co",
    name: "Smart kolmonoxidvarnare",
    /* Inte "Netatmo": varumärket renderas separat i väljare och tabell, och
       ett shortName som upprepar det ger "Netatmo Netatmo". */
    shortName: "Smart CO-varnare",
    brand: "Netatmo",
    image: productImage(KOLMONOXIDVARNARE.slug, "netatmo-smart-co"),
    tagline: "Larmet når telefonen, även när du är åtta mil bort.",
    scores: { certifiering: 5, livslangd: 4.5, larmvag: 4, prisvarde: 2.5, avlasning: 4 },
    price: 1099,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Netatmo-smart-kolmonoxidvarnare/p/36-8763",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för fritidshuset du inte bor i",
    pros: [
      "Provad enligt både EN 50291-1:2018 och -2:2019, alltså godkänd för bostad, husvagn och båt",
      "Bär franska NF-DAACO enligt NF292, alltså oberoende provning och löpande kvalitetskontroll",
      "Larmet går till telefonen, det enda som hjälper när ingen är i byggnaden",
      "Inbyggt batteri på tio år, du rör den aldrig under dess livstid",
    ],
    cons: [
      "1 099 kronor, dyrast av varnarna, mot 449,90 för Housegard CA108 som är provad för samma sak",
      "Kräver wifi där varnaren sitter, och pannrum och garage är just de utrymmen där täckningen tar slut",
      "Ingen display på enheten, halten syns bara i appen",
      "Kopplas inte ihop med andra varnare. Ska flera rum larma samtidigt är Fireblitz CO10-RF byggd för det",
    ],
    specs: [
      { label: "Certifiering", value: "EN 50291-1:2018 och -2:2019", highlight: true },
      { label: "Godkänd för", value: "Bostad, husvagn och båt", highlight: true },
      { label: "Sensorns livslängd", value: "10 år", highlight: true },
      { label: "Batteri", value: "Inbyggt, 10 år", highlight: true },
      { label: "Driftstemperatur", value: "-10 till +40 °C", highlight: true },
      { label: "Display", value: "I appen", highlight: true },
      { label: "Sammankoppling", value: "App via wifi", highlight: true },
      { label: "Ljudtryck", value: "85 dB på 3 m" },
      { label: "Mått", value: "100 × 100 × 23 mm" },
      { label: "Vikt", value: "147 g" },
    ],
    verdict:
      "Netatmos smarta kolmonoxidvarnare skickar larmet till telefonen i stället för till rummet. Den kostar 1 099 kronor och är dyrast i jämförelsen.\n\nDet är också det enda skälet att välja den, och för rätt person är det ett tillräckligt skäl. En varnare i ett fritidshus du besöker varannan helg, eller i en båt som ligger i hamnen, tjuter för ingen. Notisen i telefonen är skillnaden mellan att få veta i dag och att få veta i maj. Batteriet är inbyggt och räcker tio år, så det finns ingenting att underhålla mellan besöken.\n\nDen bär dessutom franska NF-DAACO enligt NF292, ett märke som kräver att ett oberoende organ provat varnaren och fortsätter kontrollera tillverkningen. Housegard och Deltronic vilar på tillverkarens egen försäkran.\n\nDen kräver wifi där den hänger, och kolmonoxid uppstår i pannrum, garage och intill kaminer, alltså precis de utrymmen där täckningen brukar ta slut. Köp den till huset du inte är i. Ska den sitta där du bor får du samma provning och en avläsbar display för 449,90 med Housegard CA108.",
  },
  {
    /* Specar ur X-Sense egen produktspecifikation för EU-marknaden,
       DOC NO. 230613XC01MEU, läst 2026-08-06. Den anger EN 50291-1:2018,
       "Operating Life 10 years", driftstemperatur 4 till 38 °C och
       livslängdsindikering. Butiken angav batteri över 5 år, vilket är
       batteriet och inte enheten. TÜV-uppgiften är kontrollerad mot TÜV
       Rheinlands öppna register Certipedia: testmärke 1111291538, certifikat
       50649025, där XC01-M står namngiven bland de täckta modellerna. */
    id: "x-sense-xc01-m",
    name: "XC01-M CO-varnare",
    shortName: "XC01-M",
    brand: "X-Sense",
    image: productImage(KOLMONOXIDVARNARE.slug, "x-sense-xc01-m"),
    tagline: "Kopplar ihop 24 varnare med 500 meters räckvidd.",
    scores: { certifiering: 3.5, livslangd: 5, larmvag: 5, prisvarde: 3.5, avlasning: 2 },
    price: 495,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xc01-m/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för stora hus och uthus",
    pros: [
      "Trådlös sammankoppling av upp till 24 varnare, eller 50 med basstationen SBS50",
      "500 meters räckvidd på 868 MHz, alltså genom ett helt hus och ut till garaget",
      "Tio år på sensorn med ett utbytbart CR123A-batteri, den enda som ger båda delarna",
      "Namngiven i TÜV Rheinlands öppna register, testmärke 1111291538",
      "88 gram och 16,5 millimeter djup, plattast av varnarna",
    ],
    cons: [
      "Provad bara enligt EN 50291-1, alltså inte för husvagn eller båt. Ska den till fordonet är Housegard CA108 provad för det och kostar mindre",
      "Fungerar först vid +4 °C, så den passar inte i ett ouppvärmt garage eller en båt på vintern",
      "Ingen display, den larmar men visar ingen halt",
    ],
    specs: [
      { label: "Certifiering", value: "EN 50291-1:2018", highlight: true },
      { label: "Godkänd för", value: "Bostad", highlight: true },
      { label: "Sensorns livslängd", value: "10 år", highlight: true },
      { label: "Batteri", value: "Utbytbart CR123A", highlight: true },
      { label: "Driftstemperatur", value: "+4 till +38 °C", highlight: true },
      { label: "Display", value: "Nej", highlight: true },
      { label: "Sammankoppling", value: "24 varnare, 868 MHz", highlight: true },
      { label: "Ljudtryck", value: "85 dB på 3 m" },
      { label: "Mått", value: "135 × 63 × 16,5 mm" },
      { label: "Vikt", value: "88 g" },
      { label: "Artikelnummer", value: "10246" },
    ],
    verdict:
      "XC01-M är varnaren för ett stort hus, en gård eller ett hus med uthus. Den kostar 495 kronor och är billigast av dem som kan kopplas ihop.\n\nKolmonoxid dödar framför allt den som sover, och en varnare som tjuter i vardagsrummet väcker inte nödvändigtvis någon på övervåningen. XC01-M kopplas trådlöst ihop med upp till 24 andra varnare, eller 50 med basstationen, på 868 MHz med 500 meters räckvidd. Larmar en, larmar alla, och räckvidden når ut till ett fristående garage eller ett gäststugor på tomten. Sensorn håller tio år och batteriet är ett utbytbart CR123A, så du får den långa livslängden utan att behöva kasta varnaren när cellen tar slut.\n\nDen är provad enligt del 1 av standarden, alltså den som gäller bostäder. Proven för vibration och temperaturväxling ligger i del 2, och den är XC01-M inte provad enligt, så den hör hemma i ett hus och inte i en husvagn.\n\nEn sak till innan du beställer, och den avgör åt en del läsare: den fungerar först vid +4 °C. De fem andra varnarna går ner till -10 °C. Ska den sitta i ett ouppvärmt garage, en carport eller en båt är den fel produkt på vintern. Ska den täcka en villa i två plan där alla rum är uppvärmda finns det ingen bättre här.",
  },
  {
    /* Specar ur Heimans egen produktsida för HS-720ES-serien
       (heimantech.com) och manualen 601012124, båda lästa 2026-08-06.
       Tillverkaren anger "SENSOR LIFESPAN 10 years", batteritid 5 år,
       ≥85 dB/3m, -10 till +40 °C och EN 50291-1:2018. Sidan angav tidigare
       2 års sensorlivslängd, vilket är den svenska distributörens garantitid
       och inte sensorns liv. Rättat 2026-08-06. */
    id: "heiman-ws-720es",
    name: "WS-720ES Wi-Fi CO-larm",
    shortName: "WS-720ES",
    brand: "Heiman",
    image: productImage(KOLMONOXIDVARNARE.slug, "heiman-ws-720es"),
    tagline: "Larm i telefonen för under femhundra kronor.",
    scores: { certifiering: 3.5, livslangd: 4, larmvag: 4, prisvarde: 4, avlasning: 3.5 },
    price: 449,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/heiman-ws-720es/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast med app",
    pros: [
      "Larm i telefonen via wifi, för 650 kronor mindre än Netatmo",
      "Sensorn håller upp till tio år",
      "Två vanliga AA-batterier som räcker fem år och går att köpa i vilken butik som helst",
      "Visar halten och larmhistoriken i appen",
    ],
    cons: [
      "Provad bara enligt EN 50291-1, alltså inte för husvagn eller båt",
      "Två års garanti, kortast av varnarna",
      "230 gram, nästan tre gånger så tung som Fireblitz CO10-RF",
      "Kräver wifi där varnaren sitter, vilket sällan finns i ett pannrum eller garage",
    ],
    specs: [
      { label: "Certifiering", value: "EN 50291-1:2018", highlight: true },
      { label: "Godkänd för", value: "Bostad", highlight: true },
      { label: "Sensorns livslängd", value: "Upp till 10 år", highlight: true },
      { label: "Batteri", value: "2 × AA, 5 år", highlight: true },
      { label: "Driftstemperatur", value: "-10 till +40 °C", highlight: true },
      { label: "Display", value: "I appen", highlight: true },
      { label: "Sammankoppling", value: "App via wifi", highlight: true },
      { label: "Ljudtryck", value: "Över 85 dB på 3 m" },
      { label: "Mått", value: "83 × 83 × 27 mm" },
      { label: "Vikt", value: "230 g" },
      { label: "Artikelnummer", value: "10625" },
    ],
    verdict:
      "WS-720ES gör samma sak som Netatmo för 650 kronor mindre. Den kostar 449 kronor och är den billigaste vägen till ett larm som når telefonen.\n\nSensorn håller upp till tio år och batterierna är två vanliga AA som räcker fem, så driften kostar ungefär vad ett par batterier gör. Appen visar halten löpande och sparar larmhistoriken, vilket gör den användbar i ett fritidshus: du ser om något hänt sedan sist innan du ens har låst upp dörren.\n\nDen är provad enligt del 1 av standarden. Husvagnen och båten ligger utanför det den är avsedd för, och där är Housegard CA108 provad för uppgiften till nästan samma pris.\n\nGarantin är två år, kortast i jämförelsen, på en produkt som ska sitta uppe i tio. Det är också en av de tyngre varnarna, 230 gram mot 80 för Fireblitz, vilket märks om den ska sitta på tejp i stället för skruv. Köp den om du vill ha larm i telefonen till ett hus eller en lägenhet och tycker att Netatmos pris är svårt att försvara. Ska varnaren till fordonet väljer du en annan.",
  },
  {
    /* Specar ur Deltronics eget produktblad för CO7BD (januari 2024) och
       manualen 220309, båda lästa 2026-08-06. Båda anger BS EN50291-1:2018
       och BS EN50291-2:2019. ⚠️ Deltronics egen HTML-specifikationstabell på
       deltronic.se anger fortfarande 2010-utgåvorna. PDF:erna gäller, se
       filkommentaren högst upp och researchfilen. Manualen anger också
       livslängdsindikering (tre klick i minuten) och 12-timmarsminne för
       högsta uppmätta halt. */
    id: "deltronic-co7bd",
    name: "CO7BD CO-varnare",
    shortName: "CO7BD",
    brand: "Deltronic",
    image: productImage(KOLMONOXIDVARNARE.slug, "deltronic-co7bd"),
    tagline: "Visar hur stor del av blodets syretransport som slagits ut.",
    scores: { certifiering: 5, livslangd: 3.5, larmvag: 2, prisvarde: 4, avlasning: 5 },
    price: 399,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/deltronic-co7bd/",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Mest information på displayen",
    pros: [
      "Billigast av varnarna på 399 kronor",
      "Provad enligt både EN 50291-1:2018 och -2:2019, alltså godkänd för bostad, husvagn och båt",
      "Displayen visar aktuell halt, högsta uppmätta värde och beräknad andel COHb i blodet",
      "IP42, alltså tål damm och droppande vatten, till skillnad från flera av de andra",
    ],
    cons: [
      "Sju år på sensorn mot tio hos de fem andra, på en produkt som kastas när sensorn löper ut",
      "Inbyggt batteri, så hela varnaren åker i återvinningen när det tar slut",
      "Fristående, ingen sammankoppling och ingen app. Ska larmet nå ett annat plan är X-Sense XC01-M lösningen",
    ],
    specs: [
      { label: "Certifiering", value: "EN 50291-1:2018 och -2:2019", highlight: true },
      { label: "Godkänd för", value: "Bostad, husvagn och båt", highlight: true },
      { label: "Sensorns livslängd", value: "7 år", highlight: true },
      { label: "Batteri", value: "Inbyggt, 7 år", highlight: true },
      { label: "Driftstemperatur", value: "-10 till +40 °C", highlight: true },
      { label: "Display", value: "LCD med ppm, maxvärde och COHb", highlight: true },
      { label: "Sammankoppling", value: "Nej", highlight: true },
      { label: "Ljudtryck", value: "85 dB på 3 m" },
      { label: "Mått", value: "100 × 65 × 30 mm" },
      { label: "Vikt", value: "114 g" },
      { label: "Artikelnummer", value: "10632" },
    ],
    verdict:
      "CO7BD är billigast i jämförelsen på 399 kronor, och den som visar mest.\n\nDisplayen anger inte bara aktuell halt utan också högsta uppmätta värde och en beräknad andel COHb, alltså hur stor del av blodets syretransport som slagits ut. Det sista finns på ingen annan varnare här och det är faktiskt användbart. Det vanligaste sättet att bli förgiftad är inte en akut topp utan en låg halt under lång tid, och den som fått huvudvärk varje morgon i tre veckor har nytta av ett tal att ta med till läkaren. Den är dessutom provad enligt båda delarna av standarden, så den får sitta i husvagnen lika väl som i huset.\n\nSensorn håller sju år. De fem andra håller tio, och eftersom hela varnaren ska kastas när sensorn löper ut betyder det att den billigaste varnaren blir dyrare per år än vinnaren som kostar femtio kronor mer.\n\nDen är också fristående. Ingen sammankoppling, ingen app, så den skyddar rummet den hänger i. Köp den om du vill ha en avläsbar varnare till ett rum och gärna byter den om sju år ändå. Ska den täcka flera plan är X-Sense XC01-M byggd för det.",
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
 *
 * ⚠️ Efter passet 2026-08-06 gäller detta bara så länge tillverkarledet inte
 * heller svarar. För de sex rankade produkterna satt svaret i tillverkarens
 * egna dokument i sex fall av sju. Innan någon av de två flyttas hit eller
 * härifrån ska Housegards och Kjells egna dokument läsas, inte butikssidan.
 */
export const KOLMONOXIDVARNARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Housegard",
    name: "Luma Trådlös Kolmonoxidvarnare CA150",
    reason:
      "Kopplas ihop med upp till 40 Luma-enheter och blir uppkopplad med Luma Hub, samma system som vi rankar bland brandvarnarsidor. På funktion hade den hört hemma här. Vi har ännu inte fastställt vilken del av EN 50291 den är provad mot, varken hos butiken eller hos Housegard, och den rankas inte förrän vi vet det. Kontrollerat för hand 2026-08-02 och 2026-08-06.",
    approxPrice: 449,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/gaslarm/housegard-luma-tradlos-kolmonoxidvarnare-p21272",
  },
  {
    brand: "Kjell & Company",
    name: "Kolmonoxidlarm",
    reason:
      "Billigare än vinnaren och med det största kundunderlaget i kategorin, 36 betyg på 4,0. Varnaren säljs under butikens eget namn utan angiven tillverkare, vilket gör att vi inte har något tillverkarled att gå till för att fastställa vad den är provad mot. Kundbetyg är inte ett substitut för det när produkten ska upptäcka en dödlig gas.",
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
      "Det säljs kolmonoxidvarnare på marknadsplatser där varken butik eller tillverkare går att spåra till en angiven provning. En CO-varnare är svårare att kontrollera själv än nästan vilken annan produkt som helst: du kan inte se om den fungerar, och du märker inte att den inte gör det förrän det är för sent. Vi tar inte in dem.",
  },
];

export const KOLMONOXIDVARNARE_FAQ = [
  {
    question: "Vilken kolmonoxidvarnare är bäst 2026?",
    answer:
      "Housegard Kolmonoxidlarm CA108 hos Kjell för 449,90 kronor. Den är provad enligt både EN 50291-1:2018 för bostäder och EN 50291-2:2019 för husvagn, husbil och båt, vilket gör att samma varnare kan sitta vid kaminen på vintern och följa med i husbilen på sommaren. Sensorn håller tio år, batterierna är två vanliga AA som du byter själv, och displayen visar aktuell halt i ppm plus högsta uppmätta värde i sju dagar. Det den inte gör är att koppla ihop sig med andra varnare eller nå en telefon.",
  },
  {
    question: "Behöver alla hem en kolmonoxidvarnare?",
    answer:
      "Nej. Kolmonoxid bildas vid ofullständig förbränning, så risken finns där något förbränns: braskamin, vedspis, oljepanna, gasolkök, fotogenkamin, eller ett garage som ligger under eller i direkt anslutning till bostaden. En lägenhet med enbart el och fjärrvärme har ingen sådan källa. Har du däremot husvagn, husbil eller båt med gasol eller motor är svaret ja, och då behöver du en varnare som är provad enligt del 2 av standarden.",
  },
  {
    question: "Vad är skillnaden mellan EN 50291-1 och EN 50291-2?",
    answer:
      "Del 1 gäller kolmonoxidvarnare i bostäder. Del 2 gäller husvagn, husbil och båt och lägger till prov för vibration, rörelse och temperaturväxling, alltså det en varnare utsätts för i ett fordon och aldrig i ett vardagsrum. Fyra av de sex varnare vi jämför är provade enligt båda delarna: Housegard CA108, Fireblitz CO10-RF, Netatmo och Deltronic CO7BD. X-Sense XC01-M och Heiman WS-720ES är provade enligt del 1 och hör därför hemma i en bostad.",
  },
  {
    question: "Finns det något oberoende test av kolmonoxidvarnare?",
    answer:
      "Inte i Sverige eller Norden. Amerikanska Consumer Reports mäter däremot CO-varnare i labb och har funnit att flera underrapporterar halten och larmar för sent. Vi lånar ändå inte deras omdömen, av två skäl: de provar mot amerikanska UL 2034 med andra tröskeltider än den europeiska standarden, och deras X-Sense-test gäller en annan modell än den vi rankar. Ett omdöme om ett märke är inte ett omdöme om en produkt.",
  },
  {
    question: "Hur länge håller en kolmonoxidvarnare?",
    answer:
      "Sju till tio år beroende på modell, och det är sensorn som sätter gränsen, inte batteriet. Blanda inte ihop talen: Housegards CA108 har batterier som räcker tre år och en sensor som räcker tio, medan Deltronic CO7BD har ett inbyggt batteri där båda talen är sju. När sensorn löper ut ska hela varnaren kastas. Sedan 2018 års utgåva av standarden ska varnaren själv säga till när det är dags, med både ljud och synlig signal, och alla sex varnare vi jämför gör det.",
  },
  {
    question: "Vad kostar en kolmonoxidvarnare?",
    answer:
      "De vi jämför kostar mellan 399 och 1 099 kronor, kontrollerat 2026-08-02. Housegard CA108 kostar 449,90 och är billigast av dem som är provade för både bostad och fordon. Räkna hellre per år än per styck, eftersom hela varnaren ska kastas när sensorn löpt ut: en varnare på 399 kronor med sju års livslängd kostar mer per år än en på 449,90 med tio.",
  },
  {
    question: "Måste man ha kolmonoxidvarnare i husvagn?",
    answer:
      "Det finns inget lagkrav i Sverige, men det är den plats där risken är som störst i förhållande till hur liten volymen luft är. Har du gasol i husvagnen, husbilen eller båten bör du välja en varnare som är provad enligt EN 50291-2, den del som provats för vibration och temperaturväxling. Kontrollera också driftstemperaturen om fordonet står ouppställt på vintern: X-Sense XC01-M fungerar först vid +4 °C, medan de andra fem går ner till -10 °C. Tänk dessutom på att en gasolvarnare är en annan produkt: den känner av gasol som läcker, inte kolmonoxid från förbränning.",
  },
  {
    question: "Var kommer kolmonoxiden ifrån i ett svenskt hem?",
    answer:
      "Från allt som förbränner något inomhus, och listan är kortare än i länder med gaspannor men den finns. Vedeldad kamin, kakelugn och braskamin med dåligt drag eller igensatt skorsten står för de flesta fallen. Gasolspis och gasolkylskåp i husvagn, husbil och båt är den andra stora gruppen. Till det kommer bilar och gräsklippare som startas i ett garage som gränsar till bostaden, och elverk eller byggtorkar som ställs för nära en dörr. Bor du i en lägenhet med fjärrvärme och elspis finns i praktiken ingen källa alls, och då är en kolmonoxidvarnare inte fel men inte heller nödvändig. Har du eldstad ska du ha en.",
  },
  {
    question: "Varför räcker det inte att sätta varnaren i taket?",
    answer:
      "För att kolmonoxid varken stiger eller sjunker på det sätt många tror. Gasen har nästan samma densitet som luft och blandar sig med den i stället för att lägga sig som ett skikt. Rök stiger för att den är varm, och därför sitter en brandvarnare i taket. En kolmonoxidvarnare ska i stället sitta i andningshöjd i det rum där du vistas, ungefär en och en halv meter över golvet, och gärna i sovrummet eftersom förgiftning oftast sker under sömn. Håll den några meter från eldstaden så att den inte larmar varje gång du tänder, och sätt den inte i ett stängt skåp eller bakom en gardin.",
  },
  {
    question: "Vad betyder talen i ppm på displayen?",
    answer:
      "Antal miljondelar kolmonoxid i luften, och det är också det tal larmtröskeln bygger på. En varnare enligt EN 50291 larmar inte vid ett enda värde utan på tid gånger koncentration: låga halter måste hålla i sig länge innan den ljuder, höga halter larmar på minuter. Det är avsiktligt, eftersom en kortvarig puff när du öppnar kaminluckan inte är en förgiftning. En display som visar noll betyder alltså inte att varnaren är trasig, och ett par tiotal ppm en stund efter vedpåfyllning är inte nödvändigtvis larmvärt. Ser du ett stigande värde utan att du eldat: vädra och gå ut.",
  },
  {
    question: "Vad gör jag när kolmonoxidvarnaren larmar?",
    answer:
      "Gå ut, ring 112, gå inte in igen. I den ordningen. Kolmonoxid är luktfri, och de tidiga symtomen huvudvärk, illamående och trötthet gör att man vill lägga sig ner i stället för att gå ut. Öppna fönster på vägen ut om det går fort, men lägg ingen tid på det. Räkna alla i hushållet och husdjuren, eftersom en katt eller hund som ligger stilla i det rum där halten är högst ofta är det första tecknet. Gå inte in igen för att stänga av något och släck inte elden själv. Räddningstjänsten har mätinstrument och kan avgöra när huset är säkert. Det kan inte du.",
  },
  {
    question: "Behöver jag både brandvarnare och kolmonoxidvarnare?",
    answer:
      "Ja, om du har en förbränningskälla. De känner två helt olika saker: en rökvarnare reagerar på partiklar i luften, en CO-varnare på en gas som är osynlig och luktfri. En brand ger nästan alltid rök innan den ger farliga kolmonoxidhalter, medan en dåligt dragande kamin kan ge livsfarliga halter utan att det ryker synligt i rummet. Det finns kombinationsvarnare som gör båda, och de är rimliga i ett sovrum intill en eldstad, men de har en svaghet: de två uppgifterna vill sitta på olika höjd. Rök stiger till taket, kolmonoxid blandar sig i andningshöjd. En kombinerad enhet i taket är alltså en bra rökvarnare och en medelmåttig CO-varnare.",
  },
];
