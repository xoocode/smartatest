import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { GARAGEPORTSOPPNARE } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /garageportsoppnare.
 *
 * Priser, produktnamn, EAN och butiks-URL:er är lästa ur butikernas egen
 * JSON-LD eller specifikationstabell på PRICE_CHECKED. Kraftuppgifter,
 * portmått och skyddsfunktioner kommer från tillverkarnas egna
 * bruksanvisningar, alltså tier A, och hämtades som PDF.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans. Se lib/links.ts.
 *
 * ⚠️ INGEN AV BUTIKERNA HAR NÅGOT PROGRAM. Adtraction saknar Jula, Bauhaus,
 * Bygghemma, CDON, Clas Ohlson, Byggmax, Hornbach och Elgiganten. Sidan tjänar
 * i dag ingenting och går inte att annonsera. Se
 * .agent/research/garageportsoppnare.md §7.
 *
 * ## Varför `Dragkraft` och `Vridmoment` är två rader
 *
 * Newton är kraft, newtonmeter är vridmoment. Slås de ihop till en rad ser 700
 * och 1000 ut som jämförbara tal. Fyra av fem öppnare anger dragkraft i newton;
 * Hard Head 018980 anger i stället 8 Nm och har ingen newtonuppgift alls.
 *
 * ⚠️ **Bara `Dragkraft` är `highlight`.** `Vridmoment` var det först, och
 * `pnpm check:tackning` fällde raden på 20 procent, 1 av 5. Den fällningen var
 * riktig: de fyra andra öppnarna saknar inte ett momenttal, de har aldrig haft
 * något, eftersom de är specificerade i newton. `Ej angiven` betyder att vi
 * letat efter en uppgift som finns, och det gör den inte här.
 *
 * Fyndet renderar bättre ändå. Dragkraftsraden står på 4 av 5, och det enda
 * strecket i den raden är Hard Head 018980 — alltså precis den öppnare som
 * inte går att jämföra med de andra på kraft. Ett streck i kraftraden säger
 * det på en gång. Momentet ligger kvar som vanlig specrad på 018980, där det
 * hör hemma.
 *
 * Båda fälten ligger i `ALDRIG_BEDOMD` i lib/spec-schema.mjs. Att räkna om Nm
 * till N kräver utväxling och kuggdiameter som ingen publicerar, och att låna
 * ett tal från en systermodell raderar spridningen. Se
 * .claude/context/data.md §2b.
 *
 * ## ⚠️ Enhetsfällan på 377011, kontrollerad och avgjord 2026-08-05
 *
 * Julas produktsida anger "Vridmoment 700 Nm" och bär talet i produktnamnet.
 * Tillverkarens egen försäkran om överensstämmelse, hämtad som PDF från
 * assets.cdn.jula.com, anger produkten som "230V, 100W, 700N". Manualens
 * tekniska data har ingen momentrad alls. Vi för in 700 N på dragkraftsraden
 * och `Ej angiven` på momentraden, eftersom manualen är tier A och butiken är
 * tier B.
 *
 * Systermodellen 018980 anger 8 Nm i både butik och manual, och där stämmer
 * uppgiften. De två talen var alltså aldrig jämförbara.
 *
 * Enhetsfrågan står i köpguiden och i viktningen. Den står aldrig i ett
 * omdöme, en för- eller nackdel eller ett FAQ-svar, eftersom vad en butik
 * skrivit inte är en egenskap hos produkten. Se skillen `swedish-voice`,
 * `references/who-you-are.md`.
 *
 * ## Stängningskraften, och varför den bär kriteriet `skydd`
 *
 * Chamberlains bruksanvisning för ML-serien anger att kraften vid den
 * stängande portkanten inte får överstiga 400 N och att fotocell krävs över
 * den gränsen. Millarcos manual för Boxer anger i stället "Öppnings- och
 * stängningskraft: Max. 1000 N", alltså samma tal åt båda hållen, och Boxer
 * levereras med automatisk stängning påslagen från fabrik.
 *
 * Ingen av de fem levereras med fotocell. Hos Chamberlain är den tillbehör
 * 770EML, hos Hard Head 018980 finns plint 3 och 4 förberedda, hos Boxer
 * nämns den inte.
 *
 * ## Vad ingen har gjort
 *
 * Ingen oberoende provning finns av kategorin. Betygen bygger på publicerade
 * konstruktionsuppgifter och på vad tillverkarna själva anger i sina manualer
 * och försäkringar om överensstämmelse. Vi har inte monterat en öppnare och
 * inte mätt en kraft.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "hard-head-377011",
    brand: "Hard Head",
    name: "Garageportsöppnare 377011",
    shortName: "Hard Head 377011",
    image: productImage(GARAGEPORTSOPPNARE.slug, "hard-head-377011"),
    tagline: "700 newton och 100 kilo port, för 499 kronor.",
    scores: {
      /* Åberopar EN 12453:2017, EN 13241 och EN 12635 i försäkran, alltså de
         standarder som faktiskt gäller maskindrivna portar och som ingen annan
         här åberopar. Hinderprovet anges till 50 mm. Ingen stängningskraft
         anges, och fotocell ingår inte, vilket håller den under Chamberlain. */
      skydd: 3.5,
      /* 700 N, 100 kg, 2,5 m höjd och 5 m bredd. Klarar dubbelport, men ligger
         under Boxers 1000 N och 120 kg. */
      kapacitet: 3.5,
      /* 5,0: försäkran åberopar EN 12453:2017 tillsammans med EN 13241,
         EN 12635 och EN ISO 12100. Läst i Julas egen bruksanvisning
         2026-08-06, assets.cdn.jula.com/v2/127887, som produktsidan länkar. */
      standarder: 5,
      prisvarde: 5,
      /* 5 års garanti, längst här. Standbyförbrukning okänd. */
      drift: 4,
    },
    price: 499,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/bygg-och-farg/beslag-och-byggvaror/port-garagebeslag/garageportoppnare/garageportsoppnare-377011/",
    userRating: { value: 4.6, count: 375, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för villaporten",
    pros: [
      "700 newton drar en port på 100 kilo, det billigaste sättet att få den kraften",
      "Tar 5 meter bred port, alltså även dubbelport",
      "Byggd mot EN 12453 och EN 13241, portstandarderna",
      "5 års garanti, dubbelt mot det vanliga i klassen",
    ],
    cons: [
      "Hur hårt porten trycker när den stänger är okänt",
      "Fotocell ingår inte, och den behövs om småbarn rör sig i garaget",
      "Max 2,5 meter porthöjd, så en hög industriport faller bort",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "499 kr", highlight: true },
      { label: "Dragkraft", shortLabel: "Kraft", value: "700 N", highlight: true },
      { label: "Standarder i försäkran", shortLabel: "Standarder", value: "EN 12453:2017, EN 13241, EN 12635" },
      { label: "Vridmoment", value: "Ej angiven" },
      { label: "Max portvikt", shortLabel: "Portvikt", value: "100 kg", highlight: true },
      { label: "Max portyta", shortLabel: "Portyta", value: "Ej angiven", highlight: true },
      { label: "Fotocell", value: "Ingår ej", highlight: true },
      { label: "Hinderdetektering", shortLabel: "Hinder", value: "Ja, prov mot 50 mm", highlight: true },
      { label: "Nödöppning", value: "Ja, manuell frikoppling", highlight: true },
      { label: "Max porthöjd", value: "2,5 m" },
      { label: "Max portbredd", value: "5 m" },
      { label: "Skentyp", value: "Kedja" },
      { label: "Effekt", value: "100 W" },
      { label: "Standbyförbrukning", value: "Ej angiven" },
      { label: "Spänning", value: "230 V ~ 50 Hz" },
      { label: "Vikt", value: "13,5 kg" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "377011" },
    ],
    verdict:
      "Hard Head 377011 drar en garageport på 100 kilo och kostar 499 kronor. Det är den billigaste vägen till riktig dragkraft i den här jämförelsen, med god marginal.\n\n**700 newton räcker till en normal villaport, och 5 meters portbredd betyder att även en dubbelport går att öppna.** Det är samma portbredd som en öppnare för fem gånger priset klarar. Skenan tar 2,5 meters porthöjd, vilket täcker praktiskt taget varje garage byggt som bostadsgarage.\n\nDen är också byggd mot EN 12453 och EN 13241, alltså de standarder som gäller säkerhet vid användning av maskindrivna portar och portar som produkt. Det är det enda kontrollerbara påstående någon tillverkare gör om säkerheten i den här kategorin, och det är värt mer än ett tal på en kartong. Till det kommer 5 års garanti, dubbelt mot vad klassen brukar ge.\n\nÖppnaren har ingen inställbar kraftgräns i newton. Den lär sig i stället hur mycket motstånd som är normalt i din port, uppåt och nedåt, och vänder när motståndet blir för stort. Det fungerar, men det betyder att du inte kan ställa in en gräns själv, och fotocellen ingår inte. Rör sig småbarn i garaget ska du räkna in en fotocell i budgeten, och då hamnar du runt tusenlappen ändå.\n\nKöp den. Den gör samma jobb som öppnare för tre gånger pengarna, och de 500 kronorna du sparar räcker till fotocellen den saknar.",
  },
  {
    id: "chamberlain-ml810ev",
    brand: "Chamberlain",
    name: "Garageportsmotor ML810EV",
    shortName: "Chamberlain ML810EV",
    image: productImage(GARAGEPORTSOPPNARE.slug, "chamberlain-ml810ev"),
    tagline: "Porten får inte trycka hårdare än 400 newton när den stänger.",
    scores: {
      /* Enda tillverkaren som anger ett tak för stängningskraften, 400 N, och
         som kräver fotocell över den. Hinderprovet anges mot 40 mm och ska
         upprepas månadsvis. Fotocellen är tillbehör 770EML, vilket hindrar 5,0. */
      skydd: 4,
      /* 800 N, 110 kg, 11,5 m², 2,1 m höjd, 5 m bredd. Näst mest kapabel. */
      kapacitet: 4,
      /* 2,0: manualen åberopar VDE 0700 och ZH1/494, alltså äldre tyska
         beteckningar, och ingen portstandard. */
      standarder: 2,
      prisvarde: 3,
      drift: 2.5,
    },
    price: 2541,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bygghemma",
    merchantUrl:
      "https://www.bygghemma.se/hus-och-bygg/dorrar-och-portar/garageportar/garageportsoppnare/garageportsmotor-chamberlain-ml810ev/p-1417898",
    userRating: { value: 5, count: 1, scale: 5, checkedAt: PRICE_CHECKED },
    award: "editor",
    superlative: "Bäst för småbarnsfamiljen",
    pros: [
      "Porten får inte trycka hårdare än 400 newton vid stängning",
      "Backautomatiken provas mot ett 40 millimeter högt hinder, en gång i månaden",
      "800 newton och 110 kilo port, näst kraftigast här",
      "Tar 11,5 kvadratmeter port och 5 meters bredd",
    ],
    cons: [
      "Fotocellen är tillbehör, och den krävs så snart stängningskraften ställs över 400 newton",
      "Max 2,1 meter porthöjd, lägst tillsammans med systermodellen",
      "Vad den drar i viloläge är okänt",
      "2 541 kronor är över tusen mer än en öppnare som tar tyngre port",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 541 kr", highlight: true },
      { label: "Dragkraft", shortLabel: "Kraft", value: "800 N", highlight: true },
      { label: "Standarder i försäkran", shortLabel: "Standarder", value: "VDE 0700, ZH1/494" },
      { label: "Vridmoment", value: "Ej angiven" },
      { label: "Max portvikt", shortLabel: "Portvikt", value: "110 kg", highlight: true },
      { label: "Max portyta", shortLabel: "Portyta", value: "11,5 m²", highlight: true },
      { label: "Fotocell", value: "Tillbehör, krävs över 400 N", highlight: true },
      { label: "Hinderdetektering", shortLabel: "Hinder", value: "Ja, prov mot 40 mm", highlight: true },
      { label: "Nödöppning", value: "Ja, rep och handtag", highlight: true },
      { label: "Max porthöjd", value: "2,1 m" },
      { label: "Max portbredd", value: "5 m" },
      { label: "Skentyp", value: "Kedja" },
      { label: "Effekt", value: "Ej angiven" },
      { label: "Standbyförbrukning", value: "Ej angiven" },
      { label: "Belysning", value: "Ja" },
      { label: "GTIN", value: "4014243221968" },
    ],
    verdict:
      "Chamberlain ML810EV tar en port på 110 kilo och 11,5 kvadratmeter, och kostar 2 541 kronor. Den är den enda här som sätter en gräns för hur hårt porten får trycka på vägen ner.\n\n**Kraften vid den stängande portkanten får inte överstiga 400 newton, och över den gränsen krävs fotocell.** Det är ett annat och lägre tal än de 800 newton öppnaren drar uppåt, och skillnaden är hela poängen: uppåt lyfter den en tung port, nedåt ska den ge efter för ett barn eller en bilhuv. Ingen annan öppnare i jämförelsen sätter något tak alls åt det hållet.\n\nDen är också konkret med hur du kontrollerar att det fungerar. Lägg ett 40 millimeter högt föremål på golvet, kör porten nedåt, och den ska vända när den träffar det. Provet ska göras en gång i månaden, vilket tar en halv minut och är det enda underhåll en portöppnare egentligen kräver.\n\nFotocellen ingår däremot inte, utan är ett tillbehör som köps separat. Det är obekvämt just här, eftersom den blir obligatorisk så fort kraften ställs över 400 newton, och en tung port kan behöva mer än så. Räkna in den från början om garaget är ett rum barnen rör sig i.\n\nHar du småbarn och en tung port är det här öppnaren att välja, och då köper du fotocellen i samma order. Är garaget ett utrymme där bara du går in och ut gör Hard Head 377011 samma arbete för en femtedel av priset.",
  },
  {
    id: "boxer-3000-iiii",
    brand: "Boxer",
    name: "Garageportsöppnare 3000 IIII 1000N",
    shortName: "Boxer 3000 IIII",
    image: productImage(GARAGEPORTSOPPNARE.slug, "boxer-3000-iiii"),
    tagline: "Tar 16 kvadratmeter port och 120 kilo, mest av alla här.",
    scores: {
      /* Manualen anger "Öppnings- och stängningskraft: Max. 1000 N", alltså
         inget särskilt tak för stängningsriktningen. Automatisk stängning är
         påslagen från fabrik och ingen fotocell ingår. Kraftbaserat
         automatiskt stopp finns, vilket är det som räddar betyget från botten. */
      skydd: 1.5,
      /* 1000 N, 120 kg, 16 m², 2,80 m porthöjd. Mest kapabel i jämförelsen. */
      kapacitet: 5,
      /* 1,0: försäkran undertecknad 2015-01-05 åberopar 98/37/EG, som upphörde
         2009-12-28, och 89/336/EEG, som upphörde 2007-07-19. Verifierat mot
         CELEX 31998L0037 och 31989L0336 på EUR-Lex. Säger ingenting om att
         produkten skulle sakna giltig CE-märkning, se kriteriets beskrivning. */
      standarder: 1,
      prisvarde: 4,
      /* 8 watt standby är publicerat, vilket ingen annan gör, men det är också
         mycket: ungefär 70 kWh om året. */
      drift: 3.5,
    },
    price: 1955,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/garageportsoppnare-1000n-boxer-3000-iiii",
    userRating: { value: 4.5, count: 158, scale: 5, checkedAt: PRICE_CHECKED },
    award: "premium",
    superlative: "Bäst för den tyngsta porten",
    pros: [
      "1000 newton, 120 kilo port och 16 kvadratmeter, mest kapabel här",
      "Klarar 2,80 meters porthöjd, en halvmeter mer än näst bästa",
      "Två fjärrkontroller och trådlös väggknapp ingår",
      "Dragkraften ställs i nio steg, så den kan skruvas ner till en lätt port",
    ],
    cons: [
      "Porten får trycka lika hårt nedåt som den drar uppåt, 1000 newton",
      "Automatisk stängning är påslagen när den kommer ur lådan",
      "Fotocell ingår inte",
      "8 watt dygnet runt blir ungefär 70 kilowattimmar om året",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 955 kr", highlight: true },
      { label: "Dragkraft", shortLabel: "Kraft", value: "1000 N", highlight: true },
      { label: "Standarder i försäkran", shortLabel: "Standarder", value: "98/37/EG och 89/336/EEG, båda upphävda" },
      { label: "Vridmoment", value: "Ej angiven" },
      { label: "Max portvikt", shortLabel: "Portvikt", value: "120 kg", highlight: true },
      { label: "Max portyta", shortLabel: "Portyta", value: "16 m²", highlight: true },
      { label: "Fotocell", value: "Ingår ej", highlight: true },
      { label: "Hinderdetektering", shortLabel: "Hinder", value: "Ja, automatiskt stopp", highlight: true },
      { label: "Nödöppning", value: "Ja, lås med snör till löpvagn", highlight: true },
      { label: "Max porthöjd", value: "2,80 m" },
      { label: "Skentyp", value: "Kedja" },
      { label: "Skenlängd", value: "3,5 m" },
      { label: "Effekt", value: "150 W" },
      { label: "Standbyförbrukning", value: "8 W" },
      { label: "Antal fjärrkontroller", value: "2 st" },
      { label: "Räckvidd fjärrkontroll", value: "35 m" },
      { label: "Rullande kod", value: "Ja" },
      { label: "Spänning", value: "220–240 V ~ 50 Hz" },
      { label: "Vikt", value: "16 kg" },
      { label: "GTIN", value: "5708614630037" },
    ],
    verdict:
      "Boxer 3000 IIII är den kraftigaste öppnaren i jämförelsen och kostar 1 955 kronor. 1000 newton, 120 kilo port och 16 kvadratmeter är mer än någon annan här klarar.\n\n**Porthöjden är det som skiljer mest.** 2,80 meter är en halvmeter mer än näst bästa öppnare tar, och det avgör om en hög garageport över huvud taget går att motorisera. Dragkraften ställs dessutom i nio steg, så samma motor kan skruvas ner till en lätt port utan att dra mer än den behöver. Två fjärrkontroller och en trådlös väggknapp ligger i lådan, vilket annars är ett par hundralappar extra.\n\nDet som drar ner den är vad som händer på vägen ner. Kraften anges till högst 1000 newton för både öppning och stängning, alltså samma tal åt båda hållen, och den automatiska stängningen är påslagen redan när apparaten kommer ur kartongen. Porten kan alltså börja gå ner av sig själv, och det som ska stoppa den är att motorn känner motstånd. Någon fotocell ingår inte.\n\nSlå av den automatiska stängningen innan du börjar använda den, och köp en fotocell om garaget är ett utrymme där barn rör sig. Med de två åtgärderna är det här rätt öppnare till en stor och tung port. Har du en normal villaport på under 100 kilo betalar du för kapacitet du aldrig använder, och då räcker Hard Head 377011.",
  },
  {
    id: "chamberlain-ml580ev",
    brand: "Chamberlain",
    name: "Garageportsmotor ML580EV",
    shortName: "Chamberlain ML580EV",
    image: productImage(GARAGEPORTSOPPNARE.slug, "chamberlain-ml580ev"),
    tagline: "Samma 400-newtonsgräns vid stängning, till den lilla porten.",
    scores: {
      /* Samma manual och samma 400 N-gräns som ML810EV. */
      skydd: 4,
      /* 550 N, 80 kg, 7,4 m², 2,1 m höjd, 3,5 m bredd. Minst kapabel här. */
      kapacitet: 2,
      /* Inget betyg. ML580EV:s egen försäkran har vi inte fått fram: Chamberlain
         publicerar en samlingsmanual för ML-serien som nämner EN 12453 och
         pekar på doc.chamberlain.de, men den identifierar inte ML580EV, och ett
         värde får inte bäras över mellan modeller. Betyget utelämnas hellre än
         sätts lågt — vi drar inte av för vad vi inte hittat. Se
         .agent/research/garageportsoppnare.md. */
      /* 1 990 kr för 550 N är kategorins svagaste förhållande mellan pris och
         kraft: Hard Head 377011 ger 700 N för en fjärdedel. */
      prisvarde: 2,
      drift: 2.5,
    },
    price: 1990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "CDON",
    merchantUrl:
      "https://cdon.se/produkt/chamberlain-ml580ev-ml580ev-motor-for-garagedorr-80-kg-4f1be211f5c250d1/",
    superlative: "Bäst för den låga enkelporten",
    pros: [
      "Porten får inte trycka hårdare än 400 newton vid stängning",
      "Backautomatiken provas mot ett 40 millimeter högt hinder",
      "550 newton räcker gott till en lätt enkelport",
      "Belysning och fjärrkontroll ingår",
    ],
    cons: [
      "Bara 7,4 kvadratmeter och 80 kilo, minst av alla här",
      "3,5 meters portbredd stänger ute dubbelporten",
      "Fotocellen är tillbehör",
      "1 990 kronor för 550 newton, när 700 newton finns för 499",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 990 kr", highlight: true },
      { label: "Dragkraft", shortLabel: "Kraft", value: "550 N", highlight: true },
      { label: "Standarder i försäkran", shortLabel: "Standarder", value: "Ej fastställd" },
      { label: "Vridmoment", value: "Ej angiven" },
      { label: "Max portvikt", shortLabel: "Portvikt", value: "80 kg", highlight: true },
      { label: "Max portyta", shortLabel: "Portyta", value: "7,4 m²", highlight: true },
      { label: "Fotocell", value: "Tillbehör, krävs över 400 N", highlight: true },
      { label: "Hinderdetektering", shortLabel: "Hinder", value: "Ja, prov mot 40 mm", highlight: true },
      { label: "Nödöppning", value: "Ja, rep och handtag", highlight: true },
      { label: "Max porthöjd", value: "2,1 m" },
      { label: "Max portbredd", value: "3,5 m" },
      { label: "Skentyp", value: "Kedja" },
      { label: "Effekt", value: "Ej angiven" },
      { label: "Standbyförbrukning", value: "Ej angiven" },
      { label: "Belysning", value: "Ja" },
      { label: "GTIN", value: "4014243222033" },
    ],
    verdict:
      "Chamberlain ML580EV är den minsta öppnaren i jämförelsen: 550 newton, 80 kilo port och 7,4 kvadratmeter, för 1 990 kronor.\n\nDen bär samma skyddstänk som den större systermodellen. **Porten får inte trycka hårdare än 400 newton när den stänger, och backautomatiken kontrolleras mot ett 40 millimeter högt föremål på golvet.** Till en lätt enkelport är 550 newton dessutom fullt tillräckligt, och en motor som inte överdimensioneras är ingen nackdel i sig.\n\nProblemet är vad de 1 990 kronorna köper. 7,4 kvadratmeter räcker till en enkelport på 2,4 gånger 2 meter och inte mycket mer, portbredden stannar på 3,5 meter, och porthöjden på 2,1. Har du en dubbelport eller en port över två meter är den utesluten direkt, och det är mått värda att kontrollera med tumstock innan du beställer.\n\nDen som har just den lilla porten och vill ha 400-newtonsgränsen får den här billigare än i ML810EV. Alla andra får mer öppnare för pengarna någon annanstans: Hard Head 377011 drar 700 newton och 100 kilo för 499 kronor.",
  },
  {
    id: "hard-head-018980",
    brand: "Hard Head",
    name: "Garageportsöppnare 018980",
    shortName: "Hard Head 018980",
    image: productImage(GARAGEPORTSOPPNARE.slug, "hard-head-018980"),
    tagline: "Plintarna för fotocell sitter färdiga på drivenheten.",
    scores: {
      /* Plint 3 och 4 är märkta för fotocell, alltså en förberedd anslutning
         som inte alla har. Drar ner: ingen stängningskraft anges, och
         manualens två avsnitt anger hinderprovet till 50 respektive 100 mm. */
      skydd: 3,
      /* 80 kg, 12 m², 2,3 m höjd. Ingen dragkraft i newton publicerad. */
      kapacitet: 2.5,
      /* 3,0: försäkran åberopar gällande maskindirektiv 2006/42/EG och
         EN ISO 12100 plus EN 60335, men varken EN 12453 eller EN 13241. Läst i
         Julas egen bruksanvisning 2026-08-06, assets.cdn.jula.com/v2/162235. */
      standarder: 3,
      prisvarde: 2.5,
      drift: 3,
    },
    price: 999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/bygg-och-farg/beslag-och-byggvaror/port-garagebeslag/garageportoppnare/garageportsoppnare-018980/",
    userRating: { value: 4, count: 68, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som ska koppla in fotocell",
    pros: [
      "Två märkta plintar för fotocell sitter färdiga på drivenheten",
      "Tar 12 kvadratmeter port, mer än två öppnare som kostar dubbelt",
      "Två fjärrkontroller ingår, och kodlås finns som tillbehör",
      "Kräver bara 30 millimeter mellan tak och portblad",
    ],
    cons: [
      "Hur mycket den drar i newton är okänt, så den går inte att jämföra på kraft",
      "Bara 80 kilo portvikt, lägst tillsammans med den minsta Chamberlain",
      "Hur hårt porten trycker vid stängning är okänt",
      "12 centimeter i sekunden gör den till den långsammaste här",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "999 kr", highlight: true },
      { label: "Dragkraft", shortLabel: "Kraft", value: "Ej angiven", highlight: true },
      { label: "Standarder i försäkran", shortLabel: "Standarder", value: "2006/42/EG, EN ISO 12100" },
      { label: "Vridmoment", value: "8 Nm" },
      { label: "Max portvikt", shortLabel: "Portvikt", value: "80 kg", highlight: true },
      { label: "Max portyta", shortLabel: "Portyta", value: "12 m²", highlight: true },
      { label: "Fotocell", value: "Ingår ej, plint 3 och 4 förberedda", highlight: true },
      { label: "Hinderdetektering", shortLabel: "Hinder", value: "Ja, automatisk reversering", highlight: true },
      { label: "Nödöppning", value: "Ja, nödutlösare som tillbehör", highlight: true },
      { label: "Max porthöjd", value: "2,3 m" },
      { label: "Skentyp", value: "Kedja" },
      { label: "Öppningshastighet", value: "12 cm/s" },
      { label: "Effekt", value: "120 W" },
      { label: "Standbyförbrukning", value: "Ej angiven" },
      { label: "Spänning", value: "230 V AC" },
      { label: "Vikt", value: "14 kg" },
      { label: "Artikelnummer", value: "018980" },
    ],
    verdict:
      "Hard Head 018980 kostar 999 kronor och tar en port på 12 kvadratmeter och 80 kilo. Den är byggd för vipport och takskjutport.\n\n**På drivenhetens sida sitter två märkta plintar för fotocell.** Det låter smått, men det är den praktiska skillnaden mellan att kunna komplettera med ett ljusskydd och att behöva lösa det på egen hand, och plintarna gör det till en skruvmejseljobb. Skenan kräver bara 30 millimeter mellan tak och portblad i öppet läge, vilket är ovanligt lite och räddar installationen i ett lågt garage. Två fjärrkontroller ingår, och kodlås för utsidan finns som tillbehör.\n\nSvagheten är att den inte går att jämföra med något. Kraften anges som ett vridmoment på 8 newtonmeter, medan varje annan öppnare här anger dragkraft i newton, och de två talen beskriver olika saker. Du kan alltså inte ställa den här mot de andra på det som avgör om motorn orkar med din port. Kvar finns portvikten på 80 kilo, som är den lägsta i jämförelsen tillsammans med den minsta Chamberlain.\n\nDen går också långsammast av alla, 12 centimeter i sekunden. På en port på 2,3 meter blir det närmare 20 sekunder att öppna, och det märks en regnig morgon.\n\nSka du sätta upp en fotocell från början är den förberedd för det. I övrigt får du mer öppnare för mindre pengar en hylla bort: 377011 kostar 500 kronor mindre och drar en port som väger 20 kilo mer.",
  },
];

export const GARAGEPORTSOPPNARE_PRODUCTS = resolveProducts(GARAGEPORTSOPPNARE, SEEDS);

/**
 * Tittade på, valde bort.
 *
 * `reason` är undantagen från källpratsregeln, se skillen `swedish-voice`.
 * Bortvalet är dess enda ämne, och då är det rätt svar att säga varför.
 */
export const GARAGEPORTSOPPNARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Clas Ohlson",
    name: "Garageport-öppnare ML700",
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Garageport-oppnare-ML700/p/31-3458",
    reason:
      "Produktsidan ligger kvar men saknar pris, artikelnummer och lagerbesked, och varumärket står som ett internt platshållarnamn. Vi utgår från att den har utgått ur sortimentet och rankar den därför inte. Dess bruksanvisning är däremot kvar och ligger som källa till den här sidan: det är den som anger 400-newtonsgränsen för stängningskraft och som visar att ML700 är en Chamberlain. Vill du ha samma konstruktion köper du ML580EV eller ML810EV, som är samma familj.",
  },
  {
    brand: "Somfy",
    name: "Serenia 700 io",
    approxPrice: 3290,
    merchant: "CDON",
    merchantUrl:
      "https://cdon.se/produkt/somfy-serenia-700-io-1246360-motor-for-garagedorr-6d4b79c016ab5119/",
    reason:
      "Utelämnad på grund av en oklarhet vi inte kunnat lösa. Butiken anger referens 1246360 och tillverkaren 1246363 för det som ser ut att vara samma modell, och vi vet inte om skillnaden är kit mot enbart motor eller två olika produkter. Ingen svensk butik publicerar dragkraft, portvikt eller portyta för den. Att ranka en öppnare vars kapacitet vi inte kan fastställa, och vars artikelnummer inte stämmer mellan led, vore att gissa åt dig.",
  },
  {
    brand: "Boxer",
    name: "5000 Premium 1000N Wifi",
    approxPrice: 3869,
    merchant: "Bygghemma",
    merchantUrl: "https://www.bygghemma.se/hus-och-bygg/dorrar-och-portar/garageportar/garageportsoppnare/",
    reason:
      "Samma 1000 newton som Boxer 3000 IIII, men med wifi och app, för 1 914 kronor mer. Uppkopplingen är en annan sorts köp än motorn och löser ett annat problem: den handlar om att kunna öppna porten från telefonen, inte om att orka lyfta den. Vill du ha det kan du också behålla en billigare motor och koppla en separat modul till den, vilket kostar under tusenlappen. Vi rankar den kraftigaste motorn och tar upp uppkopplingen för sig.",
  },
  {
    brand: "Chamberlain",
    name: "ML1040EV-Smart",
    approxPrice: 3323,
    merchant: "Bygghemma",
    merchantUrl: "https://www.bygghemma.se/hus-och-bygg/dorrar-och-portar/garageportar/garageportsoppnare/",
    reason:
      "Toppmodellen i ML-serien, med appstyrning inbyggd. Den bär samma skyddskonstruktion som ML810EV, och för 782 kronor mer får du uppkopplingen. Skälet att den inte rankas är detsamma som för Boxer 5000: sidan jämför motorer, och appen är en egen produktkategori som får en egen jämförelse. Behöver du enbart mer kraft än ML810EV ger är steget uppåt litet.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const GARAGEPORTSOPPNARE_FAQ = [
  {
    question: "Hur stark garageportsöppnare behöver jag?",
    answer:
      "Gå efter portens vikt och yta, inte efter det högsta talet du hittar. En normal isolerad villaport på 2,4 gånger 2,1 meter väger mellan 60 och 90 kilo, och till den räcker 550 till 700 newton väl. En dubbelport, en port i massivt trä eller en äldre port med tunga fjädrar kan väga över 100 kilo, och då vill du ha 800 newton eller mer. Väg inte porten på gissning: står vikten inte på porten kan du känna efter genom att koppla loss den och lyfta för hand, och känns den tung för en person ska du gå upp ett steg. Tänk också på att kraften på kartongen är det högsta läget motorn kan ställas i, inte vad den levererar från start.",
  },
  {
    question: "Vad är skillnaden mellan newton och newtonmeter på en portöppnare?",
    answer:
      "Newton är kraft och newtonmeter är vridmoment, och de beskriver olika saker. En skenöppnare drar porten rakt uppåt med en vagn i en skena, och den dragkraften mäts i newton: 550 N, 700 N, 1000 N. Newtonmeter beskriver i stället hur hårt en axel vrids, alltså vad motorn gör innan kraften överförts till skenan. Talen går inte att räkna om till varandra utan att veta utväxling och kuggdiameter, som normalt inte publiceras. Ser du ett tal i newtonmeter kan du alltså inte jämföra det med en annan öppnares newtontal, och då får du gå på portvikt och portyta i stället.",
  },
  {
    question: "Behöver en garageportsöppnare fotocell?",
    answer:
      "Ja, om porten kan stänga sig när du inte ser den, och särskilt om barn rör sig i garaget. En fotocell är två små enheter som sitter en bit upp på vardera sidan om portöppningen och skickar en osynlig stråle mellan sig. Bryts strålen stannar porten och går upp igen, oavsett hur hårt motorn skulle ha tryckt. Chamberlains öppnare kräver fotocell så snart stängningskraften ställs över 400 newton. Ingen av öppnarna i den här jämförelsen levereras med fotocell, så räkna in den som en extra post i budgeten. Utan den är hinderdetekteringen ditt enda skydd, och den bygger på att motorn känner motstånd, alltså på att porten först träffar något.",
  },
  {
    question: "Hur testar jag att garageporten vänder som den ska?",
    answer:
      "Lägg ett föremål på golvet i portöppningen och kör porten nedåt. Den ska vända uppåt när den träffar föremålet, inte fortsätta trycka. Hur högt föremålet ska vara skiljer sig mellan tillverkarna: Chamberlain anger 40 millimeter, Hard Head 377011 anger 50. En bräda eller en rulle hushållspapper på högkant fungerar bra. Vänder porten inte ska kraften och gränslägena ställas om enligt manualen innan öppnaren används igen. Gör om provet en gång i månaden, det tar en halv minut och det är i praktiken det enda underhåll en portöppnare kräver utöver att smörja kedjan.",
  },
  {
    question: "Kan man montera en garageportsöppnare själv?",
    answer:
      "Ja, själva öppnaren är byggd för det, och alla i den här jämförelsen levereras med skena, beslag och skruv. Det du behöver är en stege, en skruvdragare och gärna en person till, eftersom skenan är otymplig att hålla ensam. Två saker avgör om det går: porten måste vara balanserad så att den går lätt att öppna för hand innan motorn sätts på, och taket måste bära. En port som kärvar eller är tung att lyfta ska justeras först, annars sliter motorn på en port som redan är trasig. Är porten fjäderbelastad och fjädern trasig ska du inte röra den själv, då kallar du in någon. Själva elanslutningen sker med stickpropp i ett jordat uttag, så ingen elektriker behövs för det.",
  },
  {
    question: "Hur mycket el drar en garageportsöppnare?",
    answer:
      "Nästan allt går åt när den står still. Själva körningen tar några sekunder om dagen och kostar praktiskt taget ingenting, medan mottagaren är strömsatt dygnet runt för att kunna lyssna efter fjärrkontrollen. Boxer 3000 IIII anger 8 watt i viloläge, vilket blir omkring 70 kilowattimmar om året. För övriga öppnare i jämförelsen är uppgiften okänd. Det är sällan skäl nog att välja bort en öppnare, men det är värt att veta att en portöppnare drar mer när den inte används än de flesta tror.",
  },
  {
    question: "Går det att öppna porten om strömmen försvinner?",
    answer:
      "Ja, alla öppnare här har en manuell frikoppling. Det är ett rep med handtag som hänger ner från vagnen i skenan, och när du drar i det lossnar porten från motorn så att den kan skjutas upp för hand. Handtaget ska sitta högst 1,8 meter över golvet så att det går att nå. Har garaget ingen annan dörr än porten är detta värt att tänka igenom innan installationen, eftersom repet hänger på insidan: står du utanför med strömavbrott kommer du inte in. Då behövs en nödupplåsning som monteras genom porten och manövreras med nyckel utifrån, och den är tillbehör hos samtliga.",
  },
  {
    question: "Vad kostar en bra garageportsöppnare?",
    answer:
      "Räkna med 500 till 2 500 kronor för motorn. Hard Head 377011 kostar 499 kronor och drar en port på 100 kilo, vilket gör den till det billigaste sättet att få tillräcklig kraft till en normal villaport. Runt 2 000 kronor får du antingen mer kapacitet, som Boxer 3000 IIII med 120 kilo och 16 kvadratmeter, eller en publicerad gräns för stängningskraften, som Chamberlains ML-serie. Över 3 000 kronor betalar du i huvudsak för appstyrning. Lägg till ett par hundralappar för en fotocell, som ingen av öppnarna har i lådan.",
  },
];
