import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { LUFTFUKTARE } from "@/lib/test-pages";

/**
 * Luftfuktare. Underlag i .agent/research/luftfuktare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, GTIN, teknik, kapacitet i
 * ml/h, tankvolym, rekommenderad yta, ljudnivå, effekt och om målfukten går
 * att ställa. Priser lästa 2026-08-03 på butikens egen produktsida. Specarna
 * kompletterade 2026-08-06 ur tillverkarnas manualer och hemmamarknadssidor,
 * se `## Manualpasset` nedan.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte mätt luftfuktighet,
 * inte odlat bakterier och inte provat någon apparat.
 *
 * ## Sidans fynd
 *
 * SweSIAQ, svenska föreningen för inomhusmiljö, skriver att man **i allmänhet
 * bör undvika konstgjord befuktning av luften**. Folkhälsomyndighetens
 * allmänna råd FoHMFS 2014:14 namnger 45 % relativ luftfuktighet vid 21 °C som
 * en indikation som kan få tillsynsmyndigheten att kräva undersökning av
 * bostaden. Det ligger mitt i det spann varje butik marknadsför.
 *
 * ⚠️ **Var noga med vad det är.** 45 % är ingen hälsogräns och inget
 * gränsvärde, och allmänna råd är rekommendationer och inte bindande regler.
 * Filen påstår aldrig att en luftfuktare är olaglig eller att 46 % är farligt.
 *
 * ## Manualpasset 2026-08-06, som flyttade två produkter
 *
 * Sidan publicerades med tolv påståenden om att en uppgift inte gick att få
 * tag på. Sju av dem var falska, och fem av de sju låg i ett dokument butiken
 * själv länkade till under supportfliken.
 *
 * - **Wilfa Dew TX450** rankades sist därför att Kjells specifikationstabell
 *   bara listar "Inställningar: luftfuktning, nattläge, timer" och ingen
 *   rumsyta. Brödtexten på **samma sida** anger inbyggd hygrostat, målnivå
 *   35–75 % i steg om 5 %, 70 m² (störst av de tolv), UV-funktion och
 *   keramiskt filter. Fyra betyg omräknade, produkten gick från tolfte till
 *   sjätte plats. ⚠️ Läs brödtexten, inte bara spectabellen.
 * - **Xiaomi Smart Humidifier Pro:** målfukten ställs 40–70 % RH i Xiaomi
 *   Home, vilket står i klartext i Kjells produkttext. Vi hade skrivit
 *   "Anges inte". Fuktreglering 3,5 → 4,5.
 * - **Cleverio AM300:** 105 W står i Kjells länkade manual, liksom målnivå
 *   40–80 %. Autoläget siktar på 55–68 %, alltså över myndighetens 45.
 * - **Rubicson 2,5 L:** 150 ml/h och 13 h står på produktsidan, 25 W i
 *   manualen. Vi hade skrivit att fyra uppgifter saknades. Bara ljudnivån
 *   saknas verkligen.
 * - **Philips 5000:** 8 W, lägst av alla tolv, står i Ljud & Bilds
 *   specifikationsruta återgiven på Clas Ohlsons produktsida.
 * - **Beurer LB 300 Plus (26 W) och LB 45 (25 W)** ur Beurers egna
 *   manualer på pim.beurer.com.
 * - **Wilfa Lotus:** kontrollerad mot Wilfas egen produktsida. Ingen
 *   hygrostat, ingen display, ingen målnivå. Påståendet höll.
 *
 * Kvar som verklig lucka: Vicks Sweet Dreams effekt och ångkapacitet, samt
 * Rubicsons ljudnivå. Sökvägar i .agent/research/luftfuktare.md §9.
 *
 * ## Teknikuppgiften avgjorde rankningen, och den stod i butikstexten
 *
 * Två produkter hamnade långt från där produktnamnet antydde, för att
 * beskrivningen sa något annat än specifikationstabellen:
 *
 * - **Xiaomi Smart Humidifier Pro** heter varken evaporativ eller förångning, men Kjell skriver "fuktar luften genom naturlig avdunstning – utan synlig dimma eller vattenånga". Den finfördelar alltså inte tankinnehållet, och tvättbart filter betyder ingen förbrukningsdel. Den gick från botten till andra plats.
 * - **Wilfa Dew TX450** kostar 1 999 kr, lika mycket som testvinnaren, men Kjell skriver "en modern ultrasonisk luftfuktare". Tekniken drog ner hygienbetyget. Rumsytan och hygrostaten lyfte den ändå till sjätte plats, se manualpasset ovan.
 *
 * Ingen av uppgifterna går att gissa ur namnet. Båda står i klartext hos
 * butiken, och ingen av de sju svenska jämförelser vi läste nämner dem.
 *
 * ## Om testomdöme
 *
 * Det finns inget sådant kriterium här, och det är kontrollerat produkt för
 * produkt. Av de tolv rankade täcks två av oberoende test: Philips 5000 av
 * Ljud & Bild 2025-02-10 och Beurer LB 300 Plus av Stiftung Warentest
 * 2025-09-17. Tio är oprovade. Ett kriterium som tio av tolv inte kan få poäng
 * på mäter vem som blivit provad, inte vad produkten går för.
 *
 * ## Wilfa Lotus kom in i efterhand
 *
 * Den låg först bland de övervägda med lagerstatus som skäl. Efter
 * användarbeslut 2026-08-03 rankas slutsålda produkter ändå: rankningen svarar
 * på vilken produkt som är bäst, inte på vad en butik råkar ha på hyllan en
 * given dag. Ingen lagerstatus anges längre någonstans på sidan.
 */

export const PRICE_CHECKED = "2026-08-03";

const KJELL = "Kjell & Company";
const KJELL_BASE =
  "https://www.kjell.com/se/produkter/hem-fritid/inomhusklimat-uppvarmning/luftfuktare";

const APOTEA = "Apotea";
const APOTEA_BASE = "https://www.apotea.se";

const CLAS_OHLSON = "Clas Ohlson";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "philips-5000-hu5710",
    name: "5000 Series HU5710/00 luftfuktare",
    shortName: "Philips 5000",
    brand: "Philips",
    image: productImage(LUFTFUKTARE.slug, "philips-5000-hu5710"),
    tagline: "Enda apparaten där du kan ställa målfukten under 45 procent.",
    scores: {
      fuktreglering: 5,
      hygien: 5,
      kapacitet: 5,
      /* 3,0 → 3,5 2026-08-06. Ljud & Bilds specifikationsruta, återgiven på
         Clas Ohlsons produktsida, anger 8 W, vilket är lägst av de tolv.
         Förbrukningsfiltret håller den från högre. */
      drift: 3.5,
      prisvarde: 3.5,
    },
    price: 1999,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Philips-5000-Series-HU5710-00-luftfuktare,-56-m2/p/36-312",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 14 },
    award: "winner",
    superlative: "Ställbar 30 till 70 procent i femsteg",
    pros: [
      "Målfukten går att ställa från 30 till 70 procent i steg om fem",
      "Förångning, som inte finfördelar tankens innehåll ut i rummet",
      "56 m² och 400 ml/h, näst största kapaciteten av de tolv",
      "8 W, lägst effekt av alla tolv och en trettiondel av Levoits 280",
      "12 till 34 dB, tystast av alla tolv på lägsta läget",
    ],
    cons: [
      "Dyrast av de tolv apparaterna, tillsammans med Wilfa Dew",
      "Filtret är en förbrukningsdel som måste bytas varje år",
      "Wilfa Dew fuktar 70 m² mot 56, till samma pris",
    ],
    specs: [
      { label: "Pris", value: "1 999 kr", highlight: true },
      { label: "Ställbar fukt", value: "30–70 %, steg om 5", highlight: true },
      { label: "Teknik", value: "Förångning, NanoCloud", highlight: true },
      { label: "Kapacitet", value: "400 ml/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 56 m²", highlight: true },
      { label: "Tank", value: "4,5 liter", highlight: true },
      { label: "Effekt", value: "8 W", highlight: true },
      { label: "Drifttid", value: "Upp till 37 h" },
      { label: "Ljudnivå", value: "12–34 dB" },
      { label: "Vikt", value: "2,125 kg" },
      { label: "App", value: "Air+" },
    ],
    verdict:
      "Philips 5000 är apparaten där du sätter en målfuktighet på själva apparaten och sedan går därifrån. 1 999 kronor hos Clas Ohlson, dyrast här tillsammans med Wilfa Dew.\n\nDu ställer 30 till 70 procent i steg om fem, alltså kan du lägga dig på 40 och stanna där, under de 45 procent Folkhälsomyndigheten namnger som indikation för att kräva undersökning av bostaden. Bara Wilfa Dew går lika lågt i steg, och den börjar först vid 35. Tekniken är förångning: luft blåses genom ett fuktigt filter och vattnet avdunstar, så kalk och mikrober stannar i filtret i stället för att följa med ut i rummet. Det var precis den skillnaden ÖKO-TEST mätte när fem av åtta apparater spred mellan 400 000 och 60 miljoner kolonibildande enheter i timmen, och ultraljuden var de utpekade. **8 watt** är dessutom lägst av alla tolv, en trettiondel av Levoits 280, och den går ner till 12 decibel.\n\nFiltret är en förbrukningsdel, och det är där pengarna tar vägen. Stiftung Warentest räknade fram 13 till 247 euro om året för åtta apparater, grovt 150 till 2 800 kronor, och skillnaden ligger nästan helt i filter och vekar. Räkna med den kostnaden varje år ovanpå inköpspriset.\n\nKöp den. Den fuktar 56 kvadratmeter, håller 37 timmar på en tank och är den enda här som låter dig ställa exakt den nivå du mätt att du behöver utan att först ta upp mobilen.",
  },
  {
    id: "xiaomi-humidifier-pro",
    name: "Smart Humidifier Pro",
    shortName: "Xiaomi Pro",
    brand: "Xiaomi",
    image: productImage(LUFTFUKTARE.slug, "xiaomi-humidifier-pro"),
    tagline: "600 ml i timmen, mest av alla, och inget filter att köpa.",
    scores: {
      /* 3,5 → 4,5 2026-08-06. Kjells egen produkttext anger att önskad
         luftfuktighet ställs mellan 40 och 70 % RH i Xiaomi Home. Målnivån
         finns alltså; att den bara går att nå via appen och att golvet ligger
         på 40 och inte 30 skiljer den från Philips. */
      fuktreglering: 4.5,
      hygien: 5,
      kapacitet: 4,
      drift: 5,
      prisvarde: 4,
    },
    price: 1499,
    merchant: KJELL,
    merchantUrl: `${KJELL_BASE}/xiaomi-smart-humidifier-pro-p47222`,
    priceCheckedAt: PRICE_CHECKED,
    /* Kortad från "Tvättbart filter, alltså ingen förbrukningsdel" 2026-08-03:
       den mätte 234 px mot QuickPickPanels 222 och klipptes mitt i ordet. */
    superlative: "Tvättbart filter, inget att köpa",
    pros: [
      "Avdunstar vattnet utan synlig dimma, så ingen kalk lägger sig på möblerna",
      "Tvättbart filter som håller 6 till 12 månader, alltså inget att köpa",
      "600 ml/h är högst av alla tolv, och tanken rymmer 5 liter",
      "Målfukten ställs mellan 40 och 70 procent i Xiaomi Home",
      "Silverjonbehandlad tank som hämmar bakterietillväxt i vattnet",
    ],
    cons: [
      "Målfukten går bara att ställa i appen, inte på apparaten",
      "Lägsta nivån du kan välja är 40 procent, mot Philips 30",
      "20 till 30 m² är mindre än Philips 56 och Wilfa Dews 70",
      "Kräver Xiaomi Home-appen och 2,4 GHz-wifi",
    ],
    specs: [
      { label: "Pris", value: "1 499 kr", highlight: true },
      { label: "Ställbar fukt", value: "40–70 % i appen", highlight: true },
      { label: "Teknik", value: "Avdunstning", highlight: true },
      { label: "Kapacitet", value: "600 ml/h", highlight: true },
      { label: "Rumsyta", value: "20–30 m²", highlight: true },
      { label: "Tank", value: "5 liter", highlight: true },
      { label: "Effekt", value: "13 W", highlight: true },
      { label: "Drifttid", value: "Upp till 20 h i sovläge" },
      { label: "Ljudnivå", value: "30,7 dB sovläge, ≤55 dB max" },
      { label: "Vikt", value: "2,7 kg" },
      { label: "App", value: "Xiaomi Home" },
    ],
    verdict:
      "Xiaomi Smart Humidifier Pro avdunstar vattnet i stället för att spruta ut det, och kostar 1 499 kronor hos Kjell. Det är 500 kronor under vinnaren.\n\nAtt den avdunstar är hela poängen. Vattnet går genom ett 3D-filter och lämnar kalken och mikroberna kvar, så du får ingen vit hinna på tv-bänken och inget av det ÖKO-TEST mätte upp ur ultraljuden. **600 milliliter i timmen är mest av alla tolv**, med en femlitertank som räcker natten. Filtret tvättas för hand eller i maskin och håller 6 till 12 månader, alltså finns det ingen förbrukningsdel att köpa, och det är förbrukningsdelarna, inte elen, som gör att Stiftung Warentest landade på mellan 13 och 247 euro om året för åtta apparater. Tanken är dessutom silverjonbehandlad, och 13 watt är näst lägst här.\n\nMålfuktigheten ställs mellan 40 och 70 procent, men bara i Xiaomi Home. Står apparaten i ett sovrum utan mobilen inom räckhåll finns ingen ratt att vrida på, och golvet på 40 procent gör att du inte kan sikta lika lågt som med Philips 30.\n\nTa den här om rummet är under 30 kvadratmeter och du ändå har telefonen i handen. Ska apparaten skötas av någon som inte vill installera en app är Philips 5000 de 500 kronorna värd.",
  },
  {
    id: "beurer-lb-300-plus",
    name: "LB 300 Plus luftfuktare",
    shortName: "Beurer LB 300 Plus",
    brand: "Beurer",
    image: productImage(LUFTFUKTARE.slug, "beurer-lb-300-plus"),
    tagline: "Torkar filtret själv efter passet, så inget möglar i skåpet.",
    scores: {
      fuktreglering: 4,
      hygien: 5,
      kapacitet: 4.5,
      drift: 3.5,
      prisvarde: 3.5,
    },
    price: 1599,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/beurer-lb-300-plus-luftfuktare`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för 45 kvadratmeter utan dimma",
    pros: [
      "Kall förångning, så kalken stannar i filtret i stället för på möblerna",
      "Automatiskt läge som mäter fukten och håller 40, 50 eller 60 procent",
      "45 m² och 360-gradersdesign som sprider fukten åt alla håll",
      "Torkar filtret efter användning, så det inte står fuktigt mellan passen",
      "26 W, i den snålare halvan av de tolv",
    ],
    cons: [
      "Målfukten går bara att välja i tre fasta steg, inte fritt",
      "Lägsta valbara nivå är 40 procent, näst lägsta 50",
      "Filtret är en förbrukningsdel som måste bytas",
      "3 liters tank, minst av förångarna här",
    ],
    specs: [
      { label: "Pris", value: "1 599 kr", highlight: true },
      { label: "Ställbar fukt", value: "40, 50 eller 60 %", highlight: true },
      { label: "Teknik", value: "Kall förångning", highlight: true },
      { label: "Rumsyta", value: "Upp till 45 m²", highlight: true },
      { label: "Kapacitet", value: "Upp till 300 ml/h", highlight: true },
      { label: "Tank", value: "3 liter", highlight: true },
      { label: "Effekt", value: "26 W", highlight: true },
      { label: "Fläktlägen", value: "Tre hastigheter" },
      { label: "Reglering", value: "Automatiskt läge med fuktmätning" },
      { label: "GTIN", value: "4211125100674" },
      { label: "Garanti", value: "3 år" },
      { label: "Vikt", value: "2,92 kg" },
      { label: "App", value: "Nej" },
    ],
    verdict:
      "Beurer LB 300 Plus är förångaren för den som glömmer bort apparaten mellan säsongerna. 1 599 kronor hos Apotea.\n\nDen torkar sitt eget filter efter användning. Det låter litet och är det inte: ett fuktigt filter som ställs undan i april är precis den odlingsplats både ÖKO-TEST och Stiftung Warentest skriver om, och den här löser det utan att du behöver komma ihåg något. I övrigt kall förångning, alltså ingen dimma och ingen kalk ut i rummet, med ett automatläge som mäter fukten och justerar effekten själv. 45 kvadratmeter, tre fläkthastigheter och en 360-gradersdesign som sprider åt alla håll i stället för åt ett. 26 watt.\n\nRegleringen är grovhuggen, och det är därför den inte vinner. Du väljer 40, 50 eller 60 procent. Tre knappar, inget däremellan. Folkhälsomyndighetens indikation ligger på 45, så du har i praktiken ett val: 40 och ligga under, eller 50 och ligga över.\n\nDen passar dig som vill ha ett stort rum fuktat utan att tänka på apparaten. Vill du sikta på en nivå du själv mätt fram, och inte på 40 eller 50, ska du lägga 400 kronor till på Philips 5000.",
  },
  {
    id: "beurer-lb-200",
    name: "LB 200 luftfuktare",
    shortName: "Beurer LB 200",
    brand: "Beurer",
    image: productImage(LUFTFUKTARE.slug, "beurer-lb-200"),
    tagline: "Samma teknik som storasystern, 17 watt och 40 kronor billigare.",
    scores: {
      fuktreglering: 4,
      hygien: 5,
      kapacitet: 3.5,
      drift: 4,
      prisvarde: 3.5,
    },
    price: 1559,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/beurer-lb-200-luftfuktare`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för sovrummet under 30 kvadrat",
    pros: [
      "Kall förångning, samma princip som den dyrare LB 300 Plus",
      "Automatiskt läge som håller 40, 50 eller 60 procent",
      "17 W, tredje lägst av de tolv och en sextondel av Levoits 280",
      "Särskilt tyst nattläge och digital fuktighetsindikator",
    ],
    cons: [
      "30 m² mot LB 300 Plus 45, för bara 40 kronor mindre",
      "Samma begränsning till tre fasta nivåer",
      "Utbytbart filter som är en förbrukningsdel",
      "200 ml/h, en tredjedel av Xiaomis 600",
    ],
    specs: [
      { label: "Pris", value: "1 559 kr", highlight: true },
      { label: "Ställbar fukt", value: "40, 50 eller 60 %", highlight: true },
      { label: "Teknik", value: "Kall förångning", highlight: true },
      { label: "Rumsyta", value: "Upp till 30 m²", highlight: true },
      { label: "Kapacitet", value: "Upp till 200 ml/h", highlight: true },
      { label: "Tank", value: "3 liter", highlight: true },
      { label: "Effekt", value: "17 W", highlight: true },
      { label: "Lägen", value: "Tre nivåer plus nattläge" },
      { label: "GTIN", value: "4211125100698" },
      { label: "Garanti", value: "3 år" },
      { label: "Vikt", value: "2,87 kg" },
    ],
    verdict:
      "Beurer LB 200 är den mindre systern till LB 300 Plus, och skillnaden är mindre än prislappen antyder. 1 559 kronor, alltså 40 kronor billigare.\n\nSamma kalla förångning, alltså ingen dimma och ingen kalk ut i rummet. Samma automatläge som mäter fukten och håller 40, 50 eller 60 procent. Samma tysta nattläge och samma digitala fuktindikator. **17 watt** är tredje lägst av de tolv: går den hela eldningssäsongen kostar elen ett fyrtiotal kronor, mot Levoits femhundra.\n\nDet du betalar mindre för är ytan, 30 kvadratmeter mot 45, och kapaciteten, 200 milliliter i timmen mot 300. Fyrtio kronor är en löjligt liten rabatt för en tredjedel mindre apparat.\n\nDen är därför bara rätt köp om rummet verkligen är litet: ett sovrum eller ett arbetsrum där de extra kvadratmetrarna ändå står oanvända. Har du ett vardagsrum ska du lägga de 40 kronorna på LB 300 Plus i stället.",
  },
  {
    id: "cleverio-am300",
    name: "AM300 Kraftfull Luftfuktare",
    shortName: "Cleverio AM300",
    brand: "Cleverio",
    image: productImage(LUFTFUKTARE.slug, "cleverio-am300"),
    tagline: "Enda som anger rummet i kubikmeter i stället för kvadrat.",
    scores: {
      fuktreglering: 4.5,
      hygien: 4.5,
      kapacitet: 3.5,
      /* 2,5 → 3,0 2026-08-06. Kjells länkade manual anger 105 W, alltså näst
         högsta effekten men knappt en tredjedel av Levoits 280. Det gamla
         betyget vilade på att talet inte gick att räkna på. */
      drift: 3,
      prisvarde: 4.5,
    },
    price: 999,
    merchant: KJELL,
    merchantUrl: `${KJELL_BASE}/cleverio-am300-kraftfull-luftfuktare-p47167`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 154 },
    superlative: "Stänger av sig vid önskad nivå",
    pros: [
      "Målfukten ställs mellan 40 och 80 procent, och apparaten stänger av sig där",
      "Varm ånga innebär kokat vatten, alltså inga mikrober ut med dimman",
      "Inbyggd hygrometer som visar rummets fukt och temperatur på displayen",
      "999 kr med 154 kundomdömen och 4,0 i snitt",
    ],
    cons: [
      "105 W, näst mest av de tolv, eftersom vattnet kokas",
      "Autoläget siktar på 55 till 68 procent, alltså långt över myndighetens 45",
      "30 till 40 m³ motsvarar bara omkring 12 till 16 m² golvyta",
      "Varm ånga är het och bör inte stå åtkomligt för små barn",
    ],
    specs: [
      { label: "Pris", value: "999 kr", highlight: true },
      { label: "Ställbar fukt", value: "40–80 %, stänger av sig", highlight: true },
      { label: "Teknik", value: "Varm eller kall ånga", highlight: true },
      { label: "Kapacitet", value: "400 ml/h varm, 300 kall", highlight: true },
      { label: "Rumsyta", value: "30–40 m³", highlight: true },
      { label: "Tank", value: "4 liter, räcker 10–40 h", highlight: true },
      { label: "Effekt", value: "105 W", highlight: true },
      { label: "Ljudnivå", value: "Under 25 dB" },
      { label: "Vikt", value: "2,25 kg" },
      { label: "App", value: "Smart Life" },
    ],
    verdict:
      "Cleverio AM300 kokar vattnet och stänger av sig när rummet nått den fukt du valt. 999 kronor hos Kjell, alltså den billigaste apparaten här som kan sluta fukta av sig själv.\n\nDu sätter ett mål mellan 40 och 80 procent och apparaten stannar där. Bara Philips och Wilfa Dew reglerar finare, och båda kostar dubbelt. Att ångan är kokt betyder samtidigt att mikroberna i tanken dör på vägen ut, vilket gör den hygieniskt bättre än varje ultraljudsmodell i listan. Kall ånga finns som läge, och då gäller inte det. En inbyggd hygrometer visar fukten och temperaturen på displayen, så du ser rummet utan att köpa en mätare till. **Och den anger rummet i kubikmeter i stället för kvadrat**, 30 till 40 m³, vilket med 2,5 meter i tak blir ungefär 12 till 16 kvadratmeter golv. Ärligare, och mindre än det låter.\n\nAtt koka vatten kostar el: 105 watt, näst mest av de tolv. Går den en hel eldningssäsong hamnar du på ett par hundra kronor mot Philips tjugo. Ställ också om autoläget direkt, eftersom fabriksinställningen siktar på 55 till 68 procent, alltså långt över de 45 myndigheten namnger.\n\nTa den till ett sovrum eller ett arbetsrum om du vill ha en hygrostat under tusenlappen. Ska den stå i ett barnrum ska du veta att ångan är het, och då är Beurer LB 300 Plus det tryggare köpet.",
  },
  {
    id: "levoit-oasismist-450s",
    name: "OasisMist 450S Smart luftfuktare",
    shortName: "Levoit OasisMist 450S",
    brand: "Levoit",
    image: productImage(LUFTFUKTARE.slug, "levoit-oasismist-450s"),
    tagline: "Bäst reglering i appen, sämst siffra på elmätaren.",
    scores: {
      fuktreglering: 4.5,
      hygien: 2.5,
      kapacitet: 4.5,
      drift: 2.5,
      prisvarde: 3,
    },
    price: 1590,
    merchant: KJELL,
    merchantUrl: `${KJELL_BASE}/levoit-oasismist-450s-smart-luftfuktare-p47258`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Ställbar målfukt per rum och säsong",
    pros: [
      "Inbyggd fuktsensor, och önskad luftfuktighet ställs in i appen",
      "Både varm och kall dimma, upp till 550 respektive 300 ml/h",
      "20 till 40 m² och 4,5-liters tank som fylls uppifrån",
      "Under 26 dB på lägsta kalla läget",
    ],
    cons: [
      "280 W är den högsta effekten av de tolv, trettiofem gånger Philips 8",
      "Kall dimma innebär att tankens innehåll finfördelas ut i rummet",
      "Ingen angiven åtgärd mot bakterier i vattnet, till skillnad från Wilfa Dew",
      "Ljud och kapacitet i toppklass bara på det varma läget, som drar mest",
    ],
    specs: [
      { label: "Pris", value: "1 590 kr", highlight: true },
      { label: "Ställbar fukt", value: "Ja, i appen", highlight: true },
      { label: "Teknik", value: "Varm och kall dimma", highlight: true },
      { label: "Kapacitet", value: "550 ml/h varm, 300 kall", highlight: true },
      { label: "Rumsyta", value: "20–40 m²", highlight: true },
      { label: "Tank", value: "4,5 liter, upp till 45 h", highlight: true },
      { label: "Effekt", value: "280 W", highlight: true },
      { label: "Ljudnivå", value: "<26 dB kall, <41 dB varm" },
      { label: "App", value: "Ja, med schemaläggning" },
    ],
    verdict:
      "Levoit OasisMist 450S är den dyraste apparaten här att ha igång. 1 590 kronor att köpa, och sedan börjar det.\n\nDen gör mycket rätt. En inbyggd fuktsensor läser rummet, du sätter målnivån per rum och säsong i appen och lägger scheman ovanpå. Både varm och kall dimma, 550 respektive 300 milliliter i timmen, en fyrahalvlitertank som fylls uppifrån och under 26 decibel på lägsta kalla läget. 20 till 40 kvadratmeter.\n\nSedan kommer talet: **280 watt.** Philips klarar samma jobb på 8, Beurer LB 200 på 17. Går den kontinuerligt genom en eldningssäsong är det skillnaden mellan tjugo kronor och femhundra, och det är innan man räknar filtren. Toppeffekten gäller det varma läget, men det är också det läget som ger kapaciteten som säljer den. Tekniken är dessutom ultraljud på kallt läge, alltså den metod ÖKO-TEST mätte upp till 60 miljoner kolonibildande enheter i timmen ur, och här utan silverstav, UV eller något annat i vattnet.\n\nDet finns bättre köp i båda riktningarna. Vill du ha appstyrd målfukt tar du Xiaomi Pro för hundra kronor mindre och sjuttonde delen av elräkningen. Vill du ha varm ånga och en hygrostat räcker Cleverio AM300 på 999.",
  },
  {
    id: "beurer-lb-45",
    name: "Luftfuktare LB 45",
    shortName: "Beurer LB 45",
    brand: "Beurer",
    image: productImage(LUFTFUKTARE.slug, "beurer-lb-45"),
    tagline: "Billigaste vettiga köpet, om du sköter den varje dag.",
    scores: {
      fuktreglering: 2,
      hygien: 2.5,
      kapacitet: 3.5,
      drift: 4,
      prisvarde: 4.5,
    },
    price: 546,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/beurer-luftfuktare-lb-45`,
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "546 kr för 30 m² och fyra liter",
    pros: [
      "546 kronor för 30 m², mest kapacitet per krona av de tolv",
      "Fyra liters tank med synlig vattennivå, störst i prisklassen",
      "Steglöst justerbar ångmängd, inte bara fasta lägen",
      "Silverstav i tanken som hämmar bakterietillväxt",
    ],
    cons: [
      "Ultraljud, som finfördelar tankens innehåll ut i rummet",
      "Ingen ställbar målfuktighet, bara ångmängd",
      "Utan hygrostat kan du inte se när du passerat 45 procent",
      "Kräver att du byter vatten varje dag för att vara vettig",
    ],
    specs: [
      { label: "Pris", value: "546 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej, bara ångmängd", highlight: true },
      { label: "Teknik", value: "Ultraljud", highlight: true },
      { label: "Kapacitet", value: "300 ml/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 30 m²", highlight: true },
      { label: "Tank", value: "4 liter med synlig nivå", highlight: true },
      { label: "Effekt", value: "25 W", highlight: true },
      { label: "GTIN", value: "4211125681074" },
      { label: "Garanti", value: "3 år" },
      { label: "Vikt", value: "1,54 kg" },
      { label: "App", value: "Nej" },
    ],
    verdict:
      "Beurer LB 45 är apparaten för den som ska lägga under 600 kronor. 546 hos Apotea.\n\nFör de pengarna får du fyra liters tank med synlig nivå, 300 milliliter i timmen och 30 kvadratmeter. Levoit tar 1 590 för 20 till 40 kvadrat och drar elva gånger så mycket ström. Ren kapacitet per krona är det här det bästa köpet i listan med god marginal, ångmängden är steglöst justerbar i stället för låst till tre lägen, och den väger 1,54 kilo, alltså lätt att flytta mellan rummen. 25 watt.\n\nSedan kommer det som skiljer en femhundring från en tusenlapp. Tekniken är ultraljud: vattnet slås sönder till dimma och allt som finns i tanken följer med ut i luften. ÖKO-TEST mätte fem av åtta apparater till mellan 400 000 och drygt 60 miljoner kolonibildande enheter i timmen, mot 100 till 500 per kubikmeter i normal inomhusluft, och det var ultraljuden som pekades ut. Silverstaven i tanken är mer än de flesta i prisklassen har, men den ersätter inte en apparat som aldrig finfördelar vattnet. Och utan hygrostat stannar den aldrig av sig själv, så du får hålla reda på procenten.\n\nKöp den om du faktiskt sköter den: byt vatten varje dag, torka tanken, och lägg hundra kronor på en hygrometer. Vet du redan att du inte kommer att göra det ska du lägga 453 kronor till på Cleverio AM300, som kokar vattnet och stänger av sig själv.",
  },
  {
    id: "beurer-lb-37",
    name: "Luftfuktare LB 37",
    shortName: "Beurer LB 37",
    brand: "Beurer",
    image: productImage(LUFTFUKTARE.slug, "beurer-lb-37"),
    tagline: "Samma apparat som LB 45, mindre av allting, 27 kronor billigare.",
    scores: {
      fuktreglering: 2,
      hygien: 2.5,
      kapacitet: 2.5,
      drift: 4,
      prisvarde: 4.5,
    },
    price: 519,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/beurer-luftfuktare-lb-37`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för rum under 20 kvadrat",
    pros: [
      "20 W och automatisk avstängning när tanken är tom",
      "Rengöringsborste ingår, vilket få i prisklassen skickar med",
      "Silverstav i tanken, samma motåtgärd som den dyrare LB 45",
      "Nattläge för sovrum",
    ],
    cons: [
      "Tvålitertank och 200 ml/h, halva LB 45 för 27 kronor mindre",
      "Bara 20 m², minsta ytan i hela rankningen",
      "Ultraljud utan hygrostat, samma två problem som LB 45",
      "Tanken räcker inte en hel natt på högsta läget",
    ],
    specs: [
      { label: "Pris", value: "519 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej", highlight: true },
      { label: "Teknik", value: "Ultraljud", highlight: true },
      { label: "Kapacitet", value: "200 ml/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 20 m²", highlight: true },
      { label: "Tank", value: "2 liter", highlight: true },
      { label: "Effekt", value: "20 W", highlight: true },
      { label: "GTIN", value: "4211125681135" },
      { label: "Garanti", value: "3 år" },
    ],
    verdict:
      "**27 kronor är fel ställe att spara.** LB 37 kostar 519, LB 45 kostar 546.\n\nFör de 27 kronorna får du hos systern dubbla tanken, 4 liter mot 2, femtio procent mer kapacitet, 300 milliliter i timmen mot 200, och ett rum som är halva gången större, 30 kvadratmeter mot 20. Samma tillverkare, samma ultraljud, samma silverstav i vattnet.\n\nDet LB 37 gör bättre är två småsaker: en rengöringsborste följer med, vilket är mer värt än det låter på en apparat som måste torkas ur varje vecka, och 20 watt är fem mindre än systerns 25. Tvålitertanken betyder samtidigt att den inte räcker natten på högsta läget.\n\nI övrigt gäller allt som står under LB 45: ultraljudet skickar ut tankens innehåll i rummet, och utan hygrostat stannar den aldrig av sig själv. Köp den bara om rummet är ett riktigt litet sovrum och apparaten aldrig ska flyttas. Ska den kunna följa med till vardagsrummet är LB 45 nästan gratis uppgradering.",
  },
  {
    id: "wilfa-lotus-hu4-4w",
    name: "Lotus HU4-4W luftfuktare",
    shortName: "Wilfa Lotus",
    brand: "Wilfa",
    image: productImage(LUFTFUKTARE.slug, "wilfa-lotus-hu4-4w"),
    tagline: "Trettio kronor mer än Beurer LB 45, och halva tanken.",
    scores: {
      fuktreglering: 2,
      hygien: 2,
      kapacitet: 3,
      drift: 4,
      prisvarde: 3,
    },
    price: 549,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/wilfa-luftfuktare-lotus-hu4-4w`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Fem års garanti, längst av alla",
    pros: [
      "Fem års garanti, vilket är längre än någon annan här anger",
      "20 W, i nivå med de snålaste här",
      "30 m² på 549 kronor, samma yta som Beurer LB 45",
      "Droppformad högglansdesign som tar liten plats på nattduksbordet",
    ],
    cons: [
      "Ultraljud utan silverstav, UV eller annan åtgärd mot bakterier i vattnet",
      "Ingen hygrostat och ingen display, du justerar bara hur mycket dimma den ger",
      "Tvålitertank och 200 ml/h, halva Beurer LB 45 för 3 kronor mer",
      "Doftfunktion, ytterligare något att låta stå i vattnet",
    ],
    specs: [
      { label: "Pris", value: "549 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej, bara ångmängd", highlight: true },
      { label: "Teknik", value: "Ultraljud, kall ånga", highlight: true },
      { label: "Kapacitet", value: "200 ml/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 30 m²", highlight: true },
      { label: "Tank", value: "2 liter, räcker cirka 10 h", highlight: true },
      { label: "Effekt", value: "20 W", highlight: true },
      { label: "Garanti", value: "5 år" },
      { label: "GTIN", value: "7044876012234" },
      { label: "App", value: "Nej" },
    ],
    verdict:
      "Wilfa Lotus har fem års garanti, längre än någon annan apparat här. Den ligger ändå långt ner, och skälet är tre kronor.\n\nGarantin är ett riktigt argument. Fem år på en produkt för 549 kronor är ovanligt, och det är dubbelt mot Beurers tre. Den är dessutom liten och droppformad i högblank vit, alltså byggd för att stå framme på ett nattduksbord snarare än att gömmas bakom en fåtölj, och 20 watt gör den billig att låta gå.\n\nProblemet är att Beurer LB 45 kostar 546. För tre kronor mindre får du dubbla tanken, fyra liter mot två, och femtio procent mer kapacitet, 300 milliliter i timmen mot 200. Ytan är densamma, tekniken är densamma och strömmen är i praktiken densamma. Lotus reglerar inte heller fukten: du justerar hur mycket dimma den ger, men den mäter inget och stannar aldrig av sig själv. Och där Beurer har en silverstav i vattnet har den här ingenting, plus en doftfunktion, alltså ännu en sak som står och blir gammal i tanken.\n\nSka du ha en liten fuktare till ett sovrum för under 600 kronor tar du Beurer LB 45. Väger fem års garanti och formen tyngre än en tank som räcker natten är det här ett rimligt köp, men byt vatten varje dag.",
  },
  {
    id: "vicks-sweet-dreams",
    name: "Sweet Dreams Luftfuktare",
    shortName: "Vicks Sweet Dreams",
    brand: "Vicks",
    image: productImage(LUFTFUKTARE.slug, "vicks-sweet-dreams"),
    tagline: "Nattlampa som också fuktar, och den kombinationen är problemet.",
    scores: {
      fuktreglering: 1.5,
      hygien: 2,
      kapacitet: 3.5,
      drift: 3.5,
      /* 2,5 och inte 3,0: 829 kronor för en ultraljudsfuktare helt utan
         fuktreglering är dyrare än Beurer LB 45, som gör mer för 546. Sänkt
         2026-08-03 för att skilja den från Rubicson, som annars visar
         samma betyg. */
      prisvarde: 2.5,
    },
    price: 829,
    merchant: APOTEA,
    merchantUrl: `${APOTEA_BASE}/vicks-sweet-dreams-luftfuktare`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Projicerar tre motiv i taket",
    pros: [
      "3,8 liters tank som räcker upp till 24 timmar på lägsta läget",
      "Max 40 dB och angiven för sovrum upp till 35 m²",
      "Fungerar som nattlampa med tre motiv i taket",
      "Tyst nog för ett sovrum, max 40 dB",
    ],
    cons: [
      "Ultraljud utan silverstav, UV eller annan åtgärd mot bakterier i vattnet",
      "Ingen fuktreglering alls, den går tills du stänger av den",
      "Marknadsförs för barnrum, där skötseln oftast glöms",
      "829 kronor är dyrare än Beurer LB 45 med sämre reglering",
      "Projektorn står tänd hela natten, alltså den apparat som glöms bort vid rengöring",
    ],
    specs: [
      { label: "Pris", value: "829 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej", highlight: true },
      { label: "Teknik", value: "Ultraljud", highlight: true },
      { label: "Rumsyta", value: "Upp till 35 m²", highlight: true },
      { label: "Tank", value: "3,8 liter, upp till 24 h", highlight: true },
      { label: "Ljudnivå", value: "Max 40 dB" },
      { label: "Extra", value: "Projicerar tre motiv i taket" },
      { label: "GTIN", value: "4022167005755" },
      { label: "App", value: "Nej" },
    ],
    verdict:
      "Vicks Sweet Dreams är en luftfuktare som också är en takprojektor, byggd för barnrummet och prissatt till 829 kronor. Kombinationen är den vi är mest tveksamma till på hela sidan.\n\nApparaten i sig gör sitt. 3,8 liters tank som räcker upp till 24 timmar på lägsta läget, max 40 decibel, och tre motiv som lyser i taket när barnet ska somna. Det är rätt sorts produkt för den som köper en fuktare mot torra slemhinnor och nattlig hosta.\n\nMen två brister förstärker varandra. Den har ingen fuktreglering alls: ingen sensor, inget målvärde, ingen avstängning vid uppnådd nivå. Den går tills du stänger av den eller tanken tar slut, alltså potentiellt ett helt dygn, och i ett stängt barnrum är det så man passerar 45 procent utan att märka det. Samtidigt är den ultraljud, med varken silverstav, UV-lampa eller keramiskt filter i vattnet. ÖKO-TEST mätte upp till 60 miljoner kolonibildande enheter i timmen ur just den sortens apparat, och ett barnrum där maskinen står tänd varje natt är den sämsta tänkbara platsen för det.\n\nSka du fukta ett barnrum: ta Cleverio AM300 för 999 kronor, som kokar vattnet och stänger av sig vid rätt nivå. Är projektorn hela poängen köper du en separat nattlampa för tvåhundra och Beurer LB 45 för 546, och får både bättre fuktare och bättre lampa för mindre pengar.",
  },
  {
    id: "rubicson-25l",
    name: "Luftfuktare med timer och stämningsbelysning 2,5 L",
    shortName: "Rubicson 2,5 L",
    brand: "Rubicson",
    image: productImage(LUFTFUKTARE.slug, "rubicson-25l"),
    tagline: "399,90 kronor, och 561 köpare som ger den 4,5.",
    scores: {
      fuktreglering: 1,
      hygien: 2,
      kapacitet: 2.5,
      drift: 4,
      prisvarde: 4.5,
    },
    price: 399.9,
    merchant: KJELL,
    merchantUrl: `${KJELL_BASE}/rubicson-luftfuktare-med-timer-och-stamningsbelysning-25-l-p47011`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 561 },
    superlative: "Lägst pris, flest omdömen",
    pros: [
      "399,90 kronor, lägsta priset av alla tolv med 120 kronor",
      "4,5 i snitt på 561 kundomdömen, största kundunderlaget av alla tolv",
      "25 W, alltså billig att låta gå en hel eldningssäsong",
      "Justerbar stämningsbelysning och timer på 2, 4 eller 8 timmar",
    ],
    cons: [
      "150 ml/h är lägsta kapaciteten av de tolv, en fjärdedel av Xiaomis 600",
      "Ingen fuktreglering, bara timer",
      "Ultraljud utan silverstav, UV eller annan åtgärd mot bakterier i vattnet",
      "Tillverkaren vill att tanken rengörs var tredje dag, inte varje vecka",
    ],
    specs: [
      { label: "Pris", value: "399,90 kr", highlight: true },
      { label: "Ställbar fukt", value: "Nej, bara timer", highlight: true },
      { label: "Teknik", value: "Ultraljud", highlight: true },
      { label: "Rumsyta", value: "Upp till 20 m²", highlight: true },
      { label: "Kapacitet", value: "150 ml/h (± 25 %)", highlight: true },
      { label: "Tank", value: "2,5 liter", highlight: true },
      { label: "Effekt", value: "25 W", highlight: true },
      { label: "Drifttid", value: "Upp till 13 h" },
      { label: "Timer", value: "2, 4 eller 8 h" },
      { label: "Mått", value: "Ø180 × 258 mm" },
      { label: "App", value: "Nej" },
    ],
    verdict:
      "Rubicson 2,5 L kostar 399,90 kronor, alltså 120 kronor mindre än näst billigaste apparaten här, och 561 personer har gett den 4,5 i snitt.\n\nDet kundunderlaget är fler omdömen än alla de övriga elva tillsammans och säger något verkligt: folk köper den, och de flesta blir nöjda. Du får en tyst ultraljudsfuktare med stämningsbelysning som byter färg, en timer på 2, 4 eller 8 timmar och 25 watt, alltså några tior för en hel eldningssäsong. Tanken räcker 13 timmar, vilket är natten och morgonen efter.\n\nMen kapaciteten är kategorins lägsta: **150 milliliter i timmen**, en fjärdedel av Xiaomis 600 och hälften av Beurer LB 45. I ett rum på 20 kvadratmeter räcker det till att lyfta fukten några procentenheter, inte till att rädda en torr vinter. Regleringen är också den svagaste här. En timer räknar minuter, och risken mäts i procent, så apparaten stänger av sig utan att veta hur fuktigt det blivit. Ultraljudet skickar ut tankens innehåll i rummet utan silverstav eller UV, och tillverkaren skriver själv att tanken ska rengöras var tredje dag, inte varje vecka.\n\nKöp den till ett litet sovrum om du byter vatten dagligen och lägger hundra kronor på en hygrometer. Då är det 400 välanvända kronor. Ska den fukta ett vardagsrum är den för svag, och Beurer LB 45 gör dubbla jobbet för 146 kronor mer.",
  },
  {
    id: "wilfa-dew-tx450",
    name: "Dew TX450 luftfuktare",
    shortName: "Wilfa Dew TX450",
    brand: "Wilfa",
    image: productImage(LUFTFUKTARE.slug, "wilfa-dew-tx450"),
    tagline: "70 kvadratmeter, och den håller nivån du ställt in.",
    scores: {
      /* Fyra betyg omräknade 2026-08-06. Kjells specifikationstabell listar
         bara "Inställningar: luftfuktning, nattläge, timer", men brödtexten på
         samma sida anger inbyggd hygrostat, målnivå 35–75 % i steg om 5 %,
         70 m², UV-funktion och keramiskt filter. Vi läste tabellen och inte
         texten, och rankade produkten sist på det. Se .agent/research. */
      fuktreglering: 5,
      /* 2,0 → 2,5: ultraljud med UV-funktion och keramiskt filter i vattnet,
         alltså en åtgärd i skalans mening. */
      hygien: 2.5,
      /* 3,0 → 4,5: 70 m² är största ytan av de tolv, 450 ml/h näst högsta. */
      kapacitet: 4.5,
      drift: 3,
      /* 1,5 → 3,0: den gamla motiveringen var att den saknade varje egenskap
         vinnaren har. Den har dem. */
      prisvarde: 3,
    },
    price: 1999,
    merchant: KJELL,
    /* Suffixet -p66651 saknades, och utan det 302:ar Kjell till kategorisidan
       i stället för till produkten. Rättat 2026-08-03. */
    merchantUrl: `${KJELL_BASE}/wilfa-dew-tx450-luftfuktare-p66651`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 5 },
    superlative: "Bäst för rum upp till 70 kvadrat",
    pros: [
      "70 m² är största ytan av de tolv, 14 mer än testvinnaren",
      "Hygrostat med målnivå 35 till 75 procent i steg om 5",
      "450 ml/h och 4,3 liters tank, näst högsta kapaciteten här",
      "UV-funktion och keramiskt filter som renar vattnet före ångan",
      "Wifi, app och stöd för både Google Assistant och Alexa",
    ],
    cons: [
      "Ultraljud, alltså finfördelas tankens innehåll ut i rummet",
      "1 999 kronor, samma pris som testvinnaren",
      "Upp till 110 W på varmt läge, mot Philips 8",
      "Aromafunktion, ytterligare något att låta stå i vattnet",
    ],
    specs: [
      { label: "Pris", value: "1 999 kr", highlight: true },
      { label: "Ställbar fukt", value: "35–75 %, steg om 5", highlight: true },
      { label: "Teknik", value: "Ultraljud, varm och kall", highlight: true },
      { label: "Kapacitet", value: "450 ml/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 70 m²", highlight: true },
      { label: "Tank", value: "4,3 liter", highlight: true },
      { label: "Effekt", value: "30–110 W", highlight: true },
      { label: "Rening", value: "UV-funktion och keramiskt filter" },
      { label: "App", value: "WiLife, Google och Alexa" },
      { label: "Garanti", value: "5 år" },
    ],
    verdict:
      "Wilfa Dew TX450 fuktar det största rummet av alla tolv och kostar 1 999 kronor, exakt lika mycket som testvinnaren.\n\n**70 kvadratmeter**, alltså 14 mer än Philips och mer än dubbelt mot Beurer LB 300 Plus. Har du ett öppet plan där kök, matplats och vardagsrum hänger ihop är det här den enda apparaten i listan som är byggd för det. Hygrostaten låter dig sätta målet mellan 35 och 75 procent i steg om fem och håller sedan nivån själv, alltså samma finkorniga reglering som vinnaren, och du kan lägga dig på 40 och stanna under myndighetens 45. Ovanpå det 450 milliliter i timmen, en 4,3 liters tank som fylls direkt från kranen, tre hastigheter, nattläge som dämpar displayen och styrning via app, Google och Alexa.\n\nTekniken är ändå ultraljud, och det är vad som skiljer den från Philips. Vattnet slås sönder till dimma och det som finns i tanken följer med ut i rummet, alltså den metod ÖKO-TEST pekade ut när fem av åtta apparater spred mellan 400 000 och 60 miljoner kolonibildande enheter i timmen. Wilfa möter det med en UV-funktion och ett keramiskt filter som renar vattnet på vägen, vilket är mer än de flesta ultraljudsmodeller har, men det är inte samma sak som att aldrig finfördela vattnet. Varma läget drar dessutom upp till 110 watt mot Philips 8.\n\nKöp den om rummet är stort och du byter vatten varje dag. Är rummet under 56 kvadratmeter får du samma reglering, tystare drift och en teknik som inte skickar ut tankens innehåll för samma pengar hos Philips 5000.",
  },
];

export const LUFTFUKTARE_PRODUCTS = resolveProducts(LUFTFUKTARE, SEEDS);

export const LUFTFUKTARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Stadler Form",
    name: "Oskar",
    reason:
      "En av de fem i Ljud & Bilds svenska test, och ett av de märken som brukar toppa nordiska jämförelser. Clas Ohlson skriver dock \"Produkten har utgått\" på sin produktsida, och samma sida har 4,5 i betyg på 37 omdömen som alltså inte hjälper någon som vill köpa den i dag. Vi rankar inte produkter som butiken själv säger har utgått.",
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Luftfuktare-Stadler-Form-Oskar/p/36-8097",
  },
  {
    brand: "Stadler Form",
    name: "Emma",
    reason:
      "En USB-driven reseluftfuktare för rum upp till 12 kvadratmeter som kopplas till en laptop eller en powerbank. Det är en annan produkt än de övriga, ungefär som en resestrykjärn inte hör hemma i en jämförelse av strykjärn.",
    approxPrice: 739,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/stadler-form-emma-luftfuktare-vit",
  },
  {
    brand: "Boneco",
    name: "Ultrasonic U250",
    reason:
      "Med i Stiftung Warentests provning, och Boneco är ett av Europas mest respekterade luftfuktarmärken. Men såvitt vi kan se säljs den bara via Amazon.se, inte hos någon butik med egen produktsida och egen prisuppgift vi kan datera. Vi rankar bara produkter vi kan läsa priset på hos säljaren.",
  },
  {
    brand: "Venta",
    name: "LW25",
    reason:
      "Också med i Stiftung Warentests provning, och en luftvättare snarare än en ren luftfuktare: den tvättar luften genom vattenbad och fuktar som följd. Samma problem som Boneco, den finns i Sverige bara via Amazon.se och begagnatmarknaden.",
  },
  {
    brand: "Diverse",
    name: "Avfuktare",
    reason:
      "Grannkategorin som ofta blandas ihop med den här. En avfuktare tar bort fukt, en luftfuktare tillför den, och de löser motsatta problem. Den som har kondens på fönstren invändigt vintertid ska ha en avfuktare eller bättre ventilation, inte det här. Avfuktare bär 12 100 sökningar i månaden och får en egen sida.",
  },
];

export const LUFTFUKTARE_FAQ = [
  {
    question: "Vilken luftfuktare är bäst 2026?",
    answer:
      "Philips 5000 Series HU5710/00 för 1 999 kronor hos Clas Ohlson. Den är den enda i vår jämförelse där du kan ställa målfuktigheten fritt på apparaten själv, 30 till 70 procent i steg om fem, vilket är avgörande eftersom hela risken i kategorin ligger i att fukta för mycket. Den använder dessutom förångning i stället för ultraljud, så den finfördelar inte tankens innehåll ut i rummet, den fuktar 56 kvadratmeter och drar 8 watt, lägst av alla tolv. Näst bäst är Xiaomi Smart Humidifier Pro för 1 499 kronor hos Kjell: samma avdunstningsprincip, tvättbart filter utan förbrukningskostnad och kategorins högsta kapacitet, 600 milliliter i timmen. Har du ett öppet plan över 56 kvadratmeter är Wilfa Dew TX450 den enda som räcker till, 70 kvadratmeter, men den är ultraljud.",
  },
  {
    question: "Är luftfuktare farliga?",
    answer:
      "Farliga är fel ord, men den svenska expertorganisationen för inomhusmiljö avråder faktiskt från kategorin. SweSIAQ skriver att man i allmänhet bör undvika konstgjord befuktning av luften på grund av risk för mögel- och bakterieväxt, och att man ibland behöver acceptera den lägre luftfuktigheten. Det finns mätningar bakom. ÖKO-TEST provade åtta luftfuktare och fem av dem spred mellan 400 000 och drygt 60 miljoner kolonibildande enheter per timme, mot 100 till 500 per kubikmeter i normal inomhusluft, och ultraljudsmodellerna var de utpekade. Stiftung Warentest kom 2025 fram till att några modeller avger bakterier till rumsluften och flera inte gör det, och deras slutsats var skötsel snarare än avrådan. Kort sagt: en välvald och välskött luftfuktare är inte farlig, en ostädad ultraljudsmodell som står på dygnet runt är en risk du inte behöver ta.",
  },
  {
    question: "Vilken luftfuktighet ska man ha inomhus?",
    answer:
      "Det finns inget officiellt svenskt riktvärde för vad som är lagom, men det finns ett tal du bör känna till åt andra hållet. Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 räknar upp de indikationer som kan få tillsynsmyndigheten att kräva undersökning av en byggnad enligt miljöbalken, och en av dem är om luftfuktighetens medelvärde överstiger 7 gram vatten per kilo torr luft under en längre period under eldningssäsongen, vilket motsvarar cirka 45 procent relativ luftfuktighet vid 21 grader. Det är ingen hälsogräns och ingen bindande regel, allmänna råd är rekommendationer. Men det betyder att övre halvan av det spann butikerna marknadsför, 40 till 60 procent, ligger över det tal myndigheten själv namnger. ÖKO-TEST rekommenderar att man använder luftfuktare först när fukten legat under 30 procent en längre tid.",
  },
  {
    question: "Vad är skillnaden mellan ultraljud, förångning och ånga?",
    answer:
      "Det är den viktigaste frågan, och den avgör både hygien och elräkning. Ultraljud låter en platta vibrera så att vattnet slås sönder till synlig dimma. Det är tyst och energisnålt, men allt som finns i tanken följer med ut i luften, både kalk som vitt damm och bakterier. Förångning blåser luft genom en fuktig veke eller ett filter så att vattnet avdunstar; mineraler och mikrober stannar i filtret, och metoden är dessutom självreglerande eftersom torr luft tar upp mer fukt än fuktig. Ånga kokar vattnet, vilket dödar mikroberna men drar mest el. Av våra tolv använder sju ultraljud, fyra förångning eller avdunstning och en ånga, och två av ultraljudsmodellerna har dessutom ett varmt läge som kokar vattnet.",
  },
  {
    question: "Vad är vitt damm och hur blir man av med det?",
    answer:
      "Vitt damm är mineralerna ur kranvattnet, framför allt kalk, som ultraljudsfuktaren finfördelar och sprider ut i rummet tillsammans med vattnet. Det lägger sig som en tunn vit hinna på möbler och elektronik nära apparaten. Det är i första hand ett städproblem, men det är också ett kvitto på vad tekniken gör: allt som finns i tanken hamnar i luften du andas, och mineraler är det mest oskyldiga av det. Har du hårt vatten blir det värre. Lösningen är antingen en avkalkningspatron där tillverkaren erbjuder det, eller att välja en apparat som förångar i stället för att finfördela. En förångare kan inte ge vitt damm alls, eftersom mineralerna stannar kvar i filtret.",
  },
  {
    question: "Hur ofta måste jag rengöra en luftfuktare?",
    answer:
      "Byt vatten varje dag och låt inte vatten stå kvar i tanken när apparaten inte används. Rengör tanken och de ytor vattnet rör vid enligt tillverkarens anvisning, oftast en gång i veckan, och avkalka regelbundet. De tyska proven visar varför: en luftfuktare med stillastående vatten är en odlingsplats, och ultraljudsmodellen skickar sedan ut innehållet i rummet. ÖKO-TEST rekommenderar dagligt vattenbyte, och utan underhåll kan bakterier föröka sig och mögel bildas, enligt Stiftung Warentest. Är apparaten krånglig att komma åt och rengöra kommer du inte att göra det, så titta på hur tanken öppnas redan i butiken.",
  },
  {
    question: "Behöver jag verkligen en luftfuktare?",
    answer:
      "Förmodligen inte. SweSIAQ pekar på två åtgärder som fungerar och som inte kostar något: låt inte inomhustemperaturen vara onödigt hög, eftersom uppvärmd luft är det som gör den relativa fuktigheten låg, och anpassa ventilationen så att luftflödena inte är högre än vad antalet personer i rummet kräver. Torr luft inomhus vintertid är i huvudsak ett symptom på för varmt och för mycket ventilation, och båda går att justera. En luftfuktare är motiverad när du har mätt att fukten ligger under 30 procent under längre tid, när du har besvär som faktiskt hänger ihop med det, och när du vet att du orkar sköta den. Köp en hygrometer för hundra kronor först och mät i två veckor.",
  },
  {
    question: "Kan en luftfuktare hjälpa mot astma och allergi?",
    answer:
      "Det är komplicerat, och kategorin marknadsförs hårdare mot allergiker än underlaget bär. Torr luft kan irritera slemhinnor och göra att flimmerhåren i luftvägarna fungerar sämre, vilket i sin tur försämrar kroppens försvar. Men åt andra hållet gäller att dammkvalster enligt SweSIAQ kan börja växa i rumstemperatur redan vid en luftfuktighet över 45 till 50 procent, och kvalster är en av de vanligaste allergikällorna i svenska sovrum. En luftfuktare som körs för hårt kan alltså förvärra precis det den såldes för att lindra. Har du astma eller allergi är det här en fråga för vården och inte för en jämförelsesajt, och mät fukten innan du köper något.",
  },
  {
    question: "Vad kostar en luftfuktare i drift?",
    answer:
      "Det är förbrukningsdelarna och inte elen som avgör. Stiftung Warentest räknade fram mellan 13 och 247 euro om året för åtta apparater, grovt 150 till 2 800 kronor, och skillnaden ligger nästan helt i filter och vekar som måste bytas. Elen skiljer också mycket: Philips 5000 drar 8 watt och Levoit OasisMist 450S 280, alltså trettiofem gånger, vilket vid kontinuerlig drift under en eldningssäsong blir en verklig summa. Xiaomi Smart Humidifier Pro sticker ut genom att ha ett tvättbart filter, utan förbrukningsdel alls. Räkna alltid filterkostnaden innan du jämför två inköpspris.",
  },
  {
    question: "Ska jag fylla luftfuktaren med kranvatten eller destillerat vatten?",
    answer:
      "Kranvatten fungerar i de flesta apparater, men vilken teknik du har avgör hur mycket det spelar roll. I en ultraljudsfuktare finfördelas allt som finns i tanken och skickas ut i rummet, kalken inräknad, och det är den som blir vitt damm på möbler och elektronik. Har du hårt vatten blir det påtagligt. Destillerat eller avjoniserat vatten tar bort det problemet men kostar pengar varje vecka, och en del tillverkare avråder från det eftersom vissa givare behöver mineraler för att mäta rätt. I en förångare stannar mineralerna i filtret och frågan är i praktiken oviktig. Viktigare än vattentypen är att byta vattnet varje dag, vilket ÖKO-TEST rekommenderar, och att aldrig låta vatten stå kvar i tanken när apparaten inte används.",
  },
  {
    question: "Hjälper en luftfuktare mot torr hals och snarkning på natten?",
    answer:
      "Det finns ett rimligt resonemang bakom, men underlaget är svagare än marknadsföringen antyder och det finns en baksida. Torr luft kan irritera slemhinnor och göra att luftvägarnas flimmerhår fungerar sämre, vilket är skälet till att ÖKO-TEST anser en luftfuktare motiverad när fukten legat under 30 procent en längre tid. Åt andra hållet anger SweSIAQ att dammkvalster kan börja växa i rumstemperatur redan över 45 till 50 procent, och kvalster i sängen är en vanlig orsak till just täppt näsa på natten. En luftfuktare som körs för hårt i ett sovrum kan alltså förvärra det den såldes för att lindra. Mät först, ställ målet under 45 procent, och tala med vården om besvären är återkommande.",
  },
  {
    question: "Var ska luftfuktaren stå?",
    answer:
      "I det rum du faktiskt vistas i, en bit från väggen och inte direkt på golvet om tillverkaren rekommenderar annat. Ställ den inte nära ett fönster eller en yttervägg, eftersom kalla ytor är där fukten kondenserar och det är kondens som ger mögel. Rikta inte dimman mot möbler eller elektronik, särskilt inte om det är en ultraljudsmodell, eftersom vitt damm lägger sig där. Och ha en hygrometer i samma rum men några meter bort, så att du mäter rummet och inte apparatens egen dimma. Ljud & Bild använde just den metoden i sitt test, med mätaren tre till sju meter från apparaten.",
  },
];
