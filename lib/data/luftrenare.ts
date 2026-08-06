import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { LUFTRENARE } from "@/lib/test-pages";

/**
 * Luftrenare. Underlag i .agent/research/luftrenare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, artikelnummer, filterklass,
 * rekommenderad yta, CADR, ljudnivå, effekt, mått, vikt, filterpris och vilken
 * reningsteknik som anges. Priserna är lästa 2026-08-03 hos Kjell. Specarna är
 * kompletterade 2026-08-06 ur tillverkarnas egna sidor, supportsvar och
 * manualer, se `.agent/research/luftrenare.md`.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte mätt partikelhalter,
 * inte mätt ozon och inte provat någon apparat.
 *
 * ## Sidans fynd
 *
 * Kemikalieinspektionen och Elsäkerhetsverket granskade tjugo luftrenare och
 * publicerade resultatet 2026-01-23. Fyra klarade inte gränsvärdet för ozon,
 * tre av dem långt över. **Rapporten namnger inte produkterna**, och därför
 * antyder vi aldrig vilka de var.
 *
 * Två av produkterna nedan har ett aktivt reningssteg av den typ rapporten
 * handlar om, och i båda fallen har tillverkaren själv satt ord på ozonet:
 *
 * - **Rubicson Jonisator.** Manualen (`40793_manual_EN_NO_SV_20231226.pdf`, läst
 *   2026-08-06) skriver att apparaten aldrig avger mer än 0,05 ppm. Det är
 *   exakt det gränsvärde granskningen mätte mot, inte tryggt under det. Samma
 *   manual: den stänger av sig efter 6 timmar och ska stå minst 50 cm bort.
 * - **Xiaomi Mijia 6.** Har både UVC-lampa **och** jongenerator. Xiaomis egen
 *   FAQ (KA-595230, fråga 32) svarar ja på om jonisatorn bildar ozon och kallar
 *   mängden "extremt låg och nästan omätbar", utan tal. Vi påstår inte att den
 *   överskrider någon gräns.
 *
 * ## Vad filtret fångar, fyra nivåer
 *
 * | Nivå | Produkter |
 * |---|---|
 * | H13 enligt EN 1822 | Levoit Core 300S Pro, 400S, 600S, Cleverio |
 * | Ingen klass, avskiljning angiven vid 0,1–0,2 µm | Shark, Xiaomi Pet Care |
 * | Ingen klass, avskiljning angiven vid 0,3 µm | Xiaomi Mijia 6 |
 * | Inget HEPA-filter alls | Rubicson |
 *
 * ⚠️ De två mellersta nivåerna skildes tidigare åt av **var** uppgiften stod.
 * De skiljs nu av vilken partikelstorlek avskiljningen är mätt vid, vilket är
 * en egenskap hos filtret. Rättelse loggad 2026-08-06.
 *
 * ## Prisinversionen som är värd att känna till
 *
 * Levoit Core 600S kostar **9 kronor mindre** än Core 400S och har nästan
 * dubbla luftflödet, 697 mot 400 kubikmeter i timmen, samt 147 mot 83
 * kvadratmeter. Den dyrare modellen är alltså den sämre affären. Båda ligger
 * kvar i rankningen just därför.
 *
 * ## Utbytesfiltret är en egen rad
 *
 * Priset på ett utbytesfilter hos samma butik, läst 2026-08-06 ur Kjells
 * luftrenarkategori: Rubicson 99,90, Cleverio 299,90, Levoit Core 300-serien
 * 499 (Pet Allergy, den enda Kjell för), Xiaomi Pet Care 499, Levoit 400S 749,
 * Xiaomi 6 699, Levoit 600S 1 099. Shark: inget på fem år. Köpguiden påstod att
 * filtren kostar mer än elen utan att någonsin visa talen. Nu står de i
 * tabellen.
 *
 * ## Elva rader, och varför de tre nya kom till
 *
 * Tabellen visade åtta rader och filen bar tjugofyra etiketter. De sexton som
 * inte var markerade renderades ingenstans: `ComparisonTable` tar radlistan ur
 * första produktens markeringar, och layouten `matrix` visar bara den listan.
 * Tre av dem bar köpbeslutet och är markerade sedan 2026-08-06:
 *
 * - **Effekt**, 7/8. Kriteriet `Ljudnivå och driftkostnad` väger 15 och räknar
 *   på watten, men läsaren såg dem inte. 23 W mot 61 W är hela argumentet för
 *   Core 400S mot Core 600S.
 * - **Filterbyte**, 8/8 efter att intervallet lästs på Kjells filtersidor för
 *   Levoit-modellerna (artikel 47263, 47264, 47265). Tillsammans med
 *   utbytesfilterpriset ger raden den verkliga ägandekostnaden, som är sidans
 *   starkaste argument för Shark och emot Core 600S.
 * - **Luftkvalitetssensor**, 8/8. Uppgiften var publicerad för samtliga men
 *   stod på två produkter i den här filen, under två etiketter: `Sensor` hos
 *   Shark och `Sensorer` hos Mijia. Samma egenskap, två namn, och båda
 *   osynliga. Kontrollen fångar omkastad ordning men inte synonymer.
 *
 * Rubicson saknar sensor och har ingen publicerad effekt. Båda står som streck,
 * vilket är rätt svar för en apparat som varken mäter luften eller anger vad
 * den drar.
 */

/** Alla priser och uppgifter lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-03";

const KJELL = "Kjell & Company";
const BASE =
  "https://www.kjell.com/se/produkter/hem-fritid/inomhusklimat-uppvarmning/luftrenare";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "levoit-core-600s",
    name: "Core 600S Smart luftrenare",
    shortName: "Core 600S",
    brand: "Levoit",
    image: productImage(LUFTRENARE.slug, "levoit-core-600s"),
    tagline: "Renar 147 kvadratmeter, mer än dubbelt så mycket som näst starkaste.",
    scores: {
      teknik: 5,
      filterklass: 5,
      kapacitet: 5,
      ljudOchDrift: 3.5,
      prisvarde: 4,
    },
    price: 2990,
    merchant: KJELL,
    merchantUrl: `${BASE}/levoit-core-600s-smart-luftrenare-p47262`,
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för öppen planlösning",
    pros: [
      "697 m³/h renad luft i timmen, nästan dubbelt mot näst starkaste",
      "H13 True HEPA fångar minst 99,97 % av partiklarna från 0,3 µm",
      "Renar med filter enbart, utan jonisering och utan UV-lampa",
      "Kostar 9 kronor mindre än Core 400S trots nästan dubbla luftflödet",
    ],
    cons: [
      "61 W är den högsta effekten här, dyrast i drift på högsta läget",
      "55 dB på högsta läget är för mycket att sova bredvid",
      "1 099 kronor för ett utbytesfilter, dyrast av alla åtta",
    ],
    /* Radordningen här styr hela tabellen: ComparisonTable tar radlistan ur
       första produktens markeringar. Elva markerade etiketter, i samma ordning
       hos samtliga åtta. Ändras ordningen här måste den ändras hos alla. */
    specs: [
      { label: "Pris", value: "2 990 kr", highlight: true },
      { label: "Reningsteknik", value: "Filter enbart", highlight: true },
      { label: "Filterklass", value: "H13 True HEPA", highlight: true },
      { label: "Angiven avskiljning", value: "99,97 % från 0,3 µm", highlight: true },
      { label: "CADR", value: "697 m³/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 147 m²", highlight: true },
      /* Luftkvalitetssensorn är ny rad 2026-08-06. Uppgiften fanns publicerad
         för samtliga åtta men stod bara hos två av dem i den här filen, under
         två olika etiketter (Sensor och Sensorer). Källa per produkt: Kjells
         egen produktsida, läst 2026-08-06. */
      { label: "Luftkvalitetssensor", value: "AirSight Plus, PM2,5 på displayen", highlight: true },
      { label: "Ljudnivå", value: "26–55 dB", highlight: true },
      { label: "Effekt", value: "61 W", highlight: true },
      { label: "Filterbyte", value: "Var 6:e till 12:e månad", highlight: true },
      { label: "Utbytesfilter", value: "1 099 kr", highlight: true },
      { label: "Filter", value: "Förfilter, H13, aktivt kol" },
      { label: "Timer", value: "1–12 h på enheten, 1–24 h i appen" },
      { label: "App", value: "VeSync, Alexa och Google Assistant" },
      { label: "Mått", value: "313 × 313 × 600 mm" },
      { label: "Vikt", value: "6,2 kg" },
    ],
    verdict:
      "Levoit Core 600S renar 147 kvadratmeter med ett H13 True HEPA och kostar 2 990 kronor. Det är den starkaste apparaten här, och samtidigt inte den dyraste.\n\n697 kubikmeter renad luft i timmen är nästan dubbelt mot näst starkaste, och det är skillnaden mellan att rena ett rum och att rena en öppen planlösning där kök, matplats och vardagsrum sitter ihop. Filtret är ett H13, alltså provat enligt EN 1822 vid den partikelstorlek som är svårast att fånga, och det fångar minst 99,97 procent från 0,3 mikrometer. Den renar med filter och ingenting annat: ingen jonisering, ingen UV-lampa, alltså inget av de steg som enligt Kemikalieinspektionens och Elsäkerhetsverkets granskning kan bilda ozon i rummet du sitter i.\n\n**Sedan det som är svårt att förstå.** Den kostar 9 kronor mindre än Core 400S, som ger 400 kubikmeter i timmen mot 697 och räcker till 83 kvadratmeter mot 147. Samma tillverkare, samma filterklass, samma butik, samma dag.\n\nDriften är haken. 61 watt är dubbelt mot de flesta här, utbytesfiltret kostar 1 099 kronor och är det dyraste av de åtta filtren, och 55 decibel på högsta läget är för mycket i ett sovrum. Den här ska stå i det stora rummet och få jobba.\n\nKöp den. Ingen annan apparat flyttar mer luft per krona, och den gör det utan att tillföra något du inte bett om. Ska den stå bredvid sängen tar du Core 300S Pro för 1 590 kronor.",
  },
  {
    id: "levoit-core-300s-pro",
    name: "Core 300S Pro Smart luftrenare",
    shortName: "Core 300S Pro",
    brand: "Levoit",
    image: productImage(LUFTRENARE.slug, "levoit-core-300s-pro"),
    tagline: "22 decibel på lägsta läget, i praktiken ohörbar bredvid sängen.",
    scores: {
      teknik: 5,
      filterklass: 5,
      kapacitet: 3.5,
      ljudOchDrift: 4.5,
      prisvarde: 4.5,
    },
    price: 1590,
    merchant: KJELL,
    merchantUrl: `${BASE}/levoit-core-300s-pro-smart-luftrenare-vit-p47257`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för sovrummet",
    pros: [
      "22 dB på lägsta läget, det lägsta värdet någon tillverkare anger här",
      "Samma H13-filter som de dubbelt så dyra syskonen, 99,97 % från 0,3 µm",
      "23 W gör den billig att ha igång dygnet runt",
      "Filter enbart, utan aktivt steg som kan bilda biprodukter",
    ],
    cons: [
      "240 m³/h räcker till 50 kvadratmeter och inte en kvadratmeter mer",
      "Kräver 2,4 GHz-wifi för appen, vilket vissa moderna routrar gör krångligt",
      "Utbytesfiltret Kjell för är Pet Allergy-varianten på 499 kronor",
    ],
    specs: [
      { label: "Pris", value: "1 590 kr", highlight: true },
      { label: "Reningsteknik", value: "Filter enbart", highlight: true },
      { label: "Filterklass", value: "H13 HEPA", highlight: true },
      { label: "Angiven avskiljning", value: "99,97 % från 0,3 µm", highlight: true },
      { label: "CADR", value: "240 m³/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 50 m²", highlight: true },
      { label: "Luftkvalitetssensor", value: "AirSight Plus, styr fläkten i realtid", highlight: true },
      { label: "Ljudnivå", value: "22–50 dB", highlight: true },
      { label: "Effekt", value: "23 W", highlight: true },
      /* Kjell för Pet Allergy-varianten till Core 300-serien, artikel 47263,
         som anger byte var 6:e till 8:e månad. Läst 2026-08-06. */
      { label: "Filterbyte", value: "Var 6:e till 8:e månad", highlight: true },
      { label: "Utbytesfilter", value: "499 kr", highlight: true },
      { label: "Filter", value: "3-stegs: förfilter, H13, aktivt kol" },
      { label: "App", value: "VeSync, Alexa och Google Assistant" },
      { label: "Mått", value: "220 × 220 × 360 mm" },
      { label: "Vikt", value: "2,7 kg" },
    ],
    verdict:
      "Levoit Core 300S Pro kostar 1 590 kronor och går ner till 22 decibel. Det är det lägsta värdet någon tillverkare anger på den här sidan, och i praktiken en apparat du inte hör medan du sover.\n\nDen gör samma sak rätt som vinnaren, för nästan halva priset. Ett H13-filter som fångar minst 99,97 procent från 0,3 mikrometer, och rening med filter enbart utan jonisering eller UV-lampa. 23 watt gör den billig att ha igång dygnet runt, vilket är hur en luftrenare faktiskt används: den som stängs av på morgonen renar ingenting under dagen. 240 kubikmeter i timmen räcker till 50 kvadratmeter, alltså ett sovrum, ett vardagsrum eller ett hemmakontor.\n\nRummet är begränsningen. 50 kvadratmeter är ingen öppen planlösning, och ställer du den i vardagsrummet gör den lite för luften i sovrummet, eftersom en luftrenare renar det rum den står i och nästan ingenting utanför.\n\nFör de allra flesta hem är det här rätt köp, och det är svårt att spendera 1 400 kronor mer och få mer nytta. Har du ett enda stort rum att rena är Core 600S dubbelt så stark.",
  },
  {
    id: "levoit-core-400s",
    name: "Core 400S Smart luftrenare med HEPA-filter",
    shortName: "Core 400S",
    brand: "Levoit",
    image: productImage(LUFTRENARE.slug, "levoit-core-400s"),
    tagline: "48 decibel på högsta läget, tystast av alla när den arbetar för fullt.",
    scores: {
      teknik: 5,
      filterklass: 5,
      kapacitet: 4,
      ljudOchDrift: 4.5,
      prisvarde: 2,
    },
    price: 2999,
    merchant: KJELL,
    merchantUrl: `${BASE}/levoit-core-400s-smart-luftrenare-med-hepa-filter-p47261`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för den som vill ha den igång jämt",
    pros: [
      "48 dB på högsta läget, lägsta maxvärdet av alla åtta",
      "24 W mot Core 600S 61 W, alltså en tredjedel av elräkningen",
      "H13 True HEPA fångar minst 99,97 % av partiklarna från 0,3 µm",
      "400 m³/h räcker till 83 kvadratmeter",
    ],
    cons: [
      "Kostar 9 kronor mer än Core 600S, som ger 697 m³/h mot 400",
      "Utbytesfiltret går på 749 kronor, näst dyrast här",
      "83 kvadratmeter för 2 999 kronor slås av 600S på varje mått utom ljud",
    ],
    specs: [
      { label: "Pris", value: "2 999 kr", highlight: true },
      { label: "Reningsteknik", value: "Filter enbart", highlight: true },
      { label: "Filterklass", value: "H13 True HEPA", highlight: true },
      { label: "Angiven avskiljning", value: "99,97 % från 0,3 µm", highlight: true },
      { label: "CADR", value: "400 m³/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 83 m²", highlight: true },
      { label: "Luftkvalitetssensor", value: "AirSight Plus, PM2,5 med färgindikator", highlight: true },
      { label: "Ljudnivå", value: "24–48 dB", highlight: true },
      { label: "Effekt", value: "24 W", highlight: true },
      { label: "Filterbyte", value: "Var 6:e till 12:e månad", highlight: true },
      { label: "Utbytesfilter", value: "749 kr", highlight: true },
      { label: "Filter", value: "3-stegs: förfilter, H13, aktivt kol" },
      { label: "Timer", value: "1–12 h på enheten, 1–24 h i appen" },
      { label: "App", value: "VeSync, Alexa och Google Assistant" },
      { label: "Mått", value: "274 × 274 × 520 mm" },
      { label: "Vikt", value: "5 kg" },
    ],
    verdict:
      "Levoit Core 400S renar 83 kvadratmeter, går ner till 24 decibel och toppar på 48. Den kostar 2 999 kronor.\n\nIngen annan går så tyst när den arbetar för fullt, och 48 decibel är den siffra som avgör om du kan låta apparaten gå på max medan någon är i rummet. 24 watt gör den till den billigaste av de stora att ha igång dygnet runt, mot 61 för Core 600S. Filtret är ett H13 True HEPA och den renar med filter enbart.\n\n**Priset går inte ihop.** Core 600S kostar 2 990 kronor, alltså 9 kronor mindre, och ger 697 kubikmeter i timmen mot 400 samt 147 kvadratmeter mot 83. Samma tillverkare, samma filterklass, samma butik, samma dag. Det enda som talar för 400S på lång sikt är utbytesfiltret: 749 kronor mot 1 099.\n\nSka apparaten gå dygnet runt i ett stort rum där någon sover intill är 400S det tystare och snålare valet, och det är ett riktigt argument. Ska den bara rena så mycket luft som möjligt tar du 600S och sparar nio kronor på köpet.",
  },
  {
    id: "cleverio-air-purifier",
    name: "Air Purifier smart luftrenare",
    shortName: "Air Purifier",
    brand: "Cleverio",
    image: productImage(LUFTRENARE.slug, "cleverio-air-purifier"),
    tagline: "HEPA 13 och aktivt kol för 999 kronor, och 721 personer har betygsatt den.",
    scores: {
      teknik: 5,
      filterklass: 5,
      kapacitet: 2.5,
      ljudOchDrift: 4,
      prisvarde: 5,
    },
    price: 999,
    merchant: KJELL,
    merchantUrl: `${BASE}/cleverio-air-purifier-smart-luftrenare-p47007`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 721, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst för ett rum och en tusenlapp",
    pros: [
      "721 kundomdömen med 4,5 i snitt, mot sjutton för näst mest omdömda",
      "HEPA 13 med aktivt kol, samma filterklass som de tre gånger dyrare Levoit",
      "Utbytesfiltret kostar 299,90 kronor, billigast av de riktiga filterrenarna",
      "25 dB på lägsta läget och 30 W gör den billig och tyst att ha igång",
      "Partikelsensorn ställer effekten själv, och billigare än så går det inte att få",
    ],
    cons: [
      "119 m³/h räcker till 17 kvadratmeter, minsta ytan av filterrenarna här",
      "Filtret vill bytas efter ungefär sex månader, dubbelt så ofta som de flesta",
      "5 W i standby är förvånansvärt mycket för en apparat i den här klassen",
    ],
    specs: [
      { label: "Pris", value: "999 kr", highlight: true },
      { label: "Reningsteknik", value: "Filter enbart", highlight: true },
      { label: "Filterklass", value: "HEPA 13", highlight: true },
      { label: "Angiven avskiljning", value: "99,97 % av luftburna partiklar", highlight: true },
      /* Kjell skriver "Filtrerar upp till 119 m³/h luft" och samtidigt 99,97 %
         avskiljning. Vid den avskiljningen är luftflöde och renluftsflöde samma
         tal inom avrundningen, så värdet står i CADR-raden. Cleverio namnger
         ingen provningsstandard; noterat i .agent/research/luftrenare.md. */
      { label: "CADR", value: "119 m³/h", highlight: true },
      { label: "Rumsyta", value: "17 m² vid 3 luftväxlingar", highlight: true },
      { label: "Luftkvalitetssensor", value: "Partikelsensor, styr effekten automatiskt", highlight: true },
      { label: "Ljudnivå", value: "25–50 dB", highlight: true },
      { label: "Effekt", value: "30 W, 5 W i standby", highlight: true },
      { label: "Filterbyte", value: "Ungefär var 6:e månad", highlight: true },
      { label: "Utbytesfilter", value: "299,90 kr", highlight: true },
      { label: "Filter", value: "Tre lager: förfilter, HEPA 13, aktivt kol" },
      { label: "App", value: "Smart Life, och Google Home" },
      { label: "Mått", value: "228 × 228 × 324 mm" },
      { label: "Vikt", value: "2,5 kg" },
      { label: "Modell", value: "AP100" },
    ],
    verdict:
      "Cleverio Air Purifier kostar 999 kronor, har ett HEPA 13 med aktivt kol och 721 kundomdömen på 4,5 i snitt. Ingen av de andra har fler än sjutton.\n\nFiltret sitter i tre lager: ett primärfilter som tar damm och pollen, HEPA 13 som tar de små partiklarna och virus, och aktivt kol som tar lukt. Det är samma filterklass som Levoit tar mellan 1 590 och 2 990 kronor för, i en apparat som renar med filter enbart. 119 kubikmeter i timmen räcker till 17 kvadratmeter vid tre luftväxlingar, alltså ett sovrum eller ett arbetsrum. Och utbytesfiltret kostar 299,90 kronor, mindre än en tredjedel av vad Core 600S kostar att fylla på.\n\nDe 17 kvadratmetrarna är inte förhandlingsbara. Till ett vardagsrum med öppen planlösning räcker den inte, och filtret vill dessutom bytas efter ungefär ett halvår, alltså dubbelt så ofta som de flesta andra här. 5 watt i standby är också mycket för en apparat i den här klassen.\n\nÄr rummet litet är det här det enklaste köpet. Du får ett riktigt HEPA 13 för under en tusenlapp, en partikelsensor som sköter fläkten åt dig, det billigaste filterbytet av de riktiga filterrenarna, och 721 personer har redan provat allt ihop.",
  },
  {
    id: "shark-neverchange5",
    name: "NeverChange5 luftrenare",
    shortName: "NeverChange5",
    brand: "Shark",
    image: productImage(LUFTRENARE.slug, "shark-neverchange5"),
    tagline: "Fem år utan filterbyte, och 99,97 procent fångat där det är svårast.",
    scores: {
      teknik: 5,
      /* 3,5 och inte 2,5 sedan 2026-08-06: Shark anger ingen EN 1822-klass men
         väl 99,97 % vid 0,1–0,2 µm enligt IEST-RP-CC007.3, alltså mätt vid den
         partikelstorlek som är svårast att fånga. Det är ett hårdare prov än de
         0,3 µm flera av de andra anger. Se sharkninja.co.uk, HP150UK. */
      filterklass: 3.5,
      kapacitet: 3.5,
      ljudOchDrift: 3,
      /* 2,5 och inte 3,0: exakt samma pris som Levoit Core 400S, som har ett
         H13 provat enligt EN 1822. Sänkt 2026-08-03. */
      prisvarde: 2.5,
    },
    price: 2999,
    merchant: KJELL,
    merchantUrl: `${BASE}/shark-neverchange5-luftrenare-p47517`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för den som inte vill byta filter",
    pros: [
      "Filterlivslängd upp till fem år, alltså noll kronor i filter under tiden",
      "99,97 % vid 0,1–0,2 µm, mätt vid den svåraste partikelstorleken",
      "Fyra lager med förfilter, husdjursspärr, HEPA och aktivt kol",
      "Läser av tre partikelstorlekar, PM1, PM2,5 och PM10, och ställer fläkten efter dem",
    ],
    cons: [
      "66 dB på högsta läget mot 48 till 55 för de andra, utesluter sovrummet",
      "42,5 dB på lägsta läget är mer än flera av de andra har på högsta",
      "De 60 kvadratmetrarna gäller vid en enda luftväxling i timmen, 12 vid 4,8",
    ],
    specs: [
      { label: "Pris", value: "2 999 kr", highlight: true },
      { label: "Reningsteknik", value: "Filter enbart", highlight: true },
      { label: "Filterklass", value: "HEPA utan angiven klass", highlight: true },
      { label: "Angiven avskiljning", value: "99,97 % vid 0,1–0,2 µm", highlight: true },
      /* Ej angivet står kvar efter en andra genomgång 2026-08-06: sharkninja.co.uk
         (HP150UK), sharkclean.eu, sharkclean.com (HP202), Kjells produktsida och
         AHAM Verifides katalog. Shark publicerar täckningsyta per AHAM AC-1-2020
         i stället för CADR. Etablerad frånvaro, se .agent/research/luftrenare.md. */
      { label: "CADR", value: "Ej angivet", highlight: true },
      { label: "Rumsyta", value: "60 m² vid 1 luftväxling, 12 m² vid 4,8", highlight: true },
      { label: "Luftkvalitetssensor", value: "Clean Sense IQ: PM1, PM2,5 och PM10", highlight: true },
      { label: "Ljudnivå", value: "42,5–66 dB", highlight: true },
      { label: "Effekt", value: "26 W", highlight: true },
      { label: "Filterbyte", value: "Upp till 5 år", highlight: true },
      { label: "Utbytesfilter", value: "Inget på 5 år", highlight: true },
      { label: "Filter", value: "Fyra lager: förfilter, husdjursspärr, HEPA, aktivt kol" },
      { label: "Garanti", value: "2 år" },
      { label: "Mått", value: "237 × 266 × 385 mm" },
      { label: "Vikt", value: "3,32 kg" },
      { label: "Modell", value: "HP150EU" },
    ],
    verdict:
      "Shark NeverChange5 kostar 2 999 kronor och behöver inget filterbyte på fem år. De övriga sju vill ha ett nytt filter inom sex till tolv månader.\n\nFilterbyten är vad en luftrenare egentligen kostar. Ett utbytesfilter går på mellan 300 och 1 099 kronor i samma butik, och den kostnaden återkommer så länge du äger apparaten. NeverChange5 kostar noll under fem år, och det är den enda av de åtta som ens försöker angripa den delen av räkningen. Filtret fångar dessutom 99,97 procent vid 0,1 till 0,2 mikrometer, alltså vid den partikelstorlek som är svårast att fånga, vilket är ett hårdare prov än de 0,3 mikrometer flera av de andra anger. Sensorn mäter tre partikelstorlekar, PM1, PM2,5 och PM10, och där anger de flesta här ingen sensor alls.\n\nLjudet är priset. 66 decibel på högsta läget mot 48 till 55 för de andra, och 42,5 på lägsta, vilket är mer än vad flera av de andra ligger på när de går för fullt. **Och de 60 kvadratmetrarna gäller vid en enda luftväxling i timmen.** Vid de nästan fem luftväxlingar som faktiskt renar ett rum räcker den till 12 kvadratmeter.\n\nTill en hall, ett vardagsrum eller ett kontor där ljudet spelar mindre roll är den värd sitt pris, eftersom du betalar en gång och sedan är klar. Ska den stå i ett sovrum är den utesluten redan på lägsta läget.",
  },
  {
    id: "xiaomi-pet-care",
    name: "Smart Pet Care Air Purifier",
    shortName: "Smart Pet Care",
    brand: "Xiaomi",
    image: productImage(LUFTRENARE.slug, "xiaomi-pet-care"),
    tagline: "Fläkten ändrar hastighet mjukt, så att djuret stannar kvar i rummet.",
    scores: {
      teknik: 5,
      /* 3,5 och inte 2,5 sedan 2026-08-06: ingen EN 1822-klass, men Kjell och
         Xiaomi anger båda 99,99 % vid 0,1–0,3 µm, alltså mätt vid den svåraste
         storleken. Samma rung som Shark. */
      filterklass: 3.5,
      kapacitet: 3,
      ljudOchDrift: 3.5,
      prisvarde: 3,
    },
    price: 1499,
    merchant: KJELL,
    merchantUrl: `${BASE}/xiaomi-smart-pet-care-air-purifier-p47221`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för hem med päls och pollen",
    pros: [
      "237,4 m³/h för pollen, ett eget tal som ingen annan apparat här har",
      "Antistressalgoritm som ändrar fläkthastigheten mjukt så att djur inte skräms",
      "99,99 % avskiljning vid 0,1–0,3 µm, mätt vid den svåraste storleken",
      "360-graders luftintag, så den kan stå mitt i rummet utan att kvävas",
    ],
    cons: [
      "16 till 27 kvadratmeter är litet för 1 499 kronor",
      "60 dB på högsta läget är högt för en apparat som säljs på att vara skonsam",
      "Filtret kostar 499 kronor och vill bytas var sjätte till tolfte månad",
      "360-graders intaget kräver fri plats runt om, alltså ingen hörna och ingen soffa bakom",
    ],
    specs: [
      { label: "Pris", value: "1 499 kr", highlight: true },
      { label: "Reningsteknik", value: "Filter enbart", highlight: true },
      { label: "Filterklass", value: "HEPA utan angiven klass", highlight: true },
      { label: "Angiven avskiljning", value: "99,99 % vid 0,1–0,3 µm", highlight: true },
      { label: "CADR", value: "230 m³/h", highlight: true },
      { label: "Rumsyta", value: "16–27 m², 48 m² vid 2 luftväxlingar", highlight: true },
      { label: "Luftkvalitetssensor", value: "Laserpartikelsensor med LED-display", highlight: true },
      /* ≤ 60 dB(A) enligt Xiaomis egen support-FAQ KA-632902, läst 2026-08-06.
         Kjells produktsida anger ingen ljudnivå, och sidan påstod därför i tre
         dagar att uppgiften inte fanns. Den fanns hos tillverkaren. */
      { label: "Ljudnivå", value: "Högst 60 dB", highlight: true },
      { label: "Effekt", value: "27 W", highlight: true },
      { label: "Filterbyte", value: "Var 6:e till 12:e månad", highlight: true },
      { label: "Utbytesfilter", value: "499 kr", highlight: true },
      { label: "CADR pollen", value: "237,4 m³/h" },
      { label: "Filter", value: "Tre lager: förfilter, HEPA, aktivt kol" },
      { label: "App", value: "Xiaomi Home, Alexa och Google Assistant" },
      { label: "Mått", value: "Ø220 × 390 mm" },
      { label: "Vikt", value: "2,3 kg" },
      { label: "Modell", value: "AC-M30-SC" },
    ],
    verdict:
      "Xiaomi Smart Pet Care Air Purifier kostar 1 499 kronor och är byggd för att inte skrämma djuret. Fläkten ändrar hastighet mjukt i stället för i steg, så den drar aldrig igång med ett ryck mitt i rummet.\n\nDen anger 237,4 kubikmeter i timmen för just pollen och 230 för partiklar i allmänhet, och pollen är den partikel de flesta som köper en luftrenare faktiskt bryr sig om. Filtret fångar 99,99 procent av partiklarna mellan 0,1 och 0,3 mikrometer, alltså mätt där det är svårast. 27 watt och ett filter på 499 kronor gör den billig att äga, och 360-graders luftintag betyder att den kan stå mitt i ett rum i stället för att pressas upp mot en vägg.\n\nRummet är litet: 16 till 27 kvadratmeter, eller 48 om du nöjer dig med två luftväxlingar i timmen. Och 60 decibel på högsta läget är mycket för en apparat vars hela idé är att vara skonsam mot ett djur som hör bättre än du. Det mjuka gäller hur den ändrar hastighet, inte hur mycket den låter när den väl har gjort det.\n\nDjuret är skälet att köpa den, och pollentalet är bonusen som följer med. Är det bara pollen du är ute efter räcker Cleverio till ett något mindre rum för 500 kronor mindre.",
  },
  {
    id: "xiaomi-mijia-6",
    name: "Mijia Smart Air Purifier 6",
    shortName: "Mijia Air Purifier 6",
    brand: "Xiaomi",
    image: productImage(LUFTRENARE.slug, "xiaomi-mijia-6"),
    tagline: "443 kubikmeter i timmen och fem sensorer, näst starkaste luftflödet här.",
    scores: {
      /* 2,0 och inte 2,5 sedan 2026-08-06: apparaten har två aktiva steg, inte
         ett. Utöver UVC-lampan sitter en jongenerator, och Xiaomis egen FAQ
         (KA-595230, fråga 32) svarar ja på om den bildar ozon. Skalans 2,5
         gäller ett enda aktivt steg utan bekräftad avgivning. */
      teknik: 2,
      /* 2,5 och inte 2,0: avskiljningen är angiven, 99,98 % vid 0,3 µm enligt
         Cheari (Beijing) Testing. Ingen EN 1822-klass, och 0,3 µm är ett
         lättare prov än Sharks och Pet Cares 0,1–0,2 µm, därav en rung under. */
      filterklass: 2.5,
      kapacitet: 4.5,
      ljudOchDrift: 3,
      prisvarde: 2.5,
    },
    price: 2490,
    merchant: KJELL,
    merchantUrl: `${BASE}/xiaomi-mijia-smart-air-purifier-6-smart-luftrenare-2950-m-p47220`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 1, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som vill mäta luften",
    pros: [
      "443 m³/h är näst starkaste luftflödet här, bara Core 600S ligger över",
      "Fem sensorer för PM1, PM2,5, damm, temperatur och luftfuktighet",
      "Mäter formaldehyd separat, 218 m³/h, vilket är relevant efter en renovering",
      "32 dB i sovläge, och LCD-skärmen visar värdena medan den går",
    ],
    cons: [
      "Två aktiva steg vid sidan av filtret: en UVC-lampa och en jongenerator",
      "Jongeneratorn avger ozon, och tillverkaren sätter ingen siffra på hur mycket",
      "Fångar 99,98 % först vid 0,3 µm, en lättare storlek än Shark och Pet Care mäter vid",
      "Utbytesfiltret kostar 699 kronor och byts var sjätte till tolfte månad",
    ],
    specs: [
      { label: "Pris", value: "2 490 kr", highlight: true },
      { label: "Reningsteknik", value: "Filter, UVC-lampa och jonisering", highlight: true },
      { label: "Filterklass", value: "Ej angiven", highlight: true },
      { label: "Angiven avskiljning", value: "99,98 % vid 0,3 µm", highlight: true },
      { label: "CADR", value: "443 m³/h", highlight: true },
      { label: "Rumsyta", value: "29–50 m², 87,5 m² vid 2 luftväxlingar", highlight: true },
      { label: "Luftkvalitetssensor", value: "Fem: PM1, PM2,5, damm, temperatur, luftfuktighet", highlight: true },
      /* 32 dB(A) i sovläge står hos Kjell, taket ≤ 64 dB(A) i Xiaomis FAQ
         KA-595230. Sidan påstod tidigare att ingen ljudnivå angavs; båda
         talen fanns, det ena på den sida vi länkar till. */
      { label: "Ljudnivå", value: "32–64 dB", highlight: true },
      { label: "Effekt", value: "40 W", highlight: true },
      { label: "Filterbyte", value: "Var 6:e till 12:e månad", highlight: true },
      { label: "Utbytesfilter", value: "699 kr", highlight: true },
      { label: "Formaldehyd-CADR", value: "218 m³/h" },
      { label: "Filter", value: "Femstegs kompositfilter med aktivt kol" },
      { label: "App", value: "Xiaomi Home, Alexa och Google Assistant" },
      { label: "Mått", value: "250 × 250 × 555 mm" },
      { label: "Vikt", value: "5,2 kg" },
      { label: "Modell", value: "BHR08MZEU" },
    ],
    verdict:
      "Xiaomi Mijia Smart Air Purifier 6 kostar 2 490 kronor, renar 443 kubikmeter i timmen och mäter mer om luften än någon av de andra.\n\nFem sensorer följer PM1, PM2,5, damm, temperatur och luftfuktighet, och LCD-skärmen visar dem medan apparaten går. Luftflödet är näst starkast här, bara Core 600S ligger över, och räcker till 29 till 50 kvadratmeter eller 87,5 om du nöjer dig med två luftväxlingar i timmen. Formaldehyd mäts separat, 218 kubikmeter i timmen, vilket är den siffra som betyder något i en nyrenoverad bostad. I sovläge går den ner till 32 decibel.\n\n**Den har två aktiva reningssteg vid sidan av filtret: en UVC-lampa och en jongenerator.** Xiaomi svarar själva på frågan om jongeneratorn bildar ozon, och svaret är ja. De kallar mängden extremt låg och nästan omätbar, men anger inget tal. Gränsvärdet Kemikalieinspektionen och Elsäkerhetsverket mätte mot, för apparater som ska stå på medan människor är i rummet, är 0,05 ppm.\n\nVi påstår inte att den här apparaten överskrider någon gräns. Rapporten namnger inga produkter och vi har inte mätt. Vi konstaterar att den har två steg av den typ granskningen gällde, och att tillverkaren bekräftar att det ena avger ozon.\n\nLuftflödet och mätvärdena är billiga till det här priset. De kostar dig två aktiva steg i rummet du sitter i, och Core 300S Pro renar med filter enbart för 900 kronor mindre.",
  },
  {
    id: "rubicson-jonisator",
    name: "Jonisator 10 m²",
    shortName: "Jonisator 10 m²",
    brand: "Rubicson",
    image: productImage(LUFTRENARE.slug, "rubicson-jonisator"),
    tagline: "540 gram och USB-driven, byggd för instrumentbrädan och husvagnen.",
    scores: {
      teknik: 1,
      filterklass: 1,
      kapacitet: 1,
      ljudOchDrift: 2.5,
      prisvarde: 2,
    },
    price: 599.9,
    merchant: KJELL,
    merchantUrl: `${BASE}/rubicson-jonisator-10-m-p40793`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 3, count: 17, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för garaget och husvagnen",
    pros: [
      "540 gram och USB-driven, alltså den enda som går att ta med i bilen",
      "Utbytesfiltret kostar 99,90 kronor, en tiondel av vinnarens",
      "Det elektrostatiska filtret rengörs med vatten i stället för att bytas",
      "Tar starka lukter, som är det den faktiskt är byggd för",
    ],
    cons: [
      "Avger ozon vid användning, upp till 0,05 ppm enligt tillverkaren",
      "Inget HEPA-filter alls, bara elektrostatiskt filter och VOC-filter",
      "Stänger av sig själv efter 6 timmar, så den kan inte gå över natten",
      "Ska stå minst 50 cm från dig när den går, enligt manualen",
      "10 kvadratmeter, minsta ytan här, och strömadaptern ingår inte",
    ],
    specs: [
      { label: "Pris", value: "599,90 kr", highlight: true },
      { label: "Reningsteknik", value: "Jonisering, avger ozon", highlight: true },
      { label: "Filterklass", value: "Inget HEPA-filter", highlight: true },
      { label: "Angiven avskiljning", value: "Ej angiven", highlight: true },
      { label: "CADR", value: "Ej angivet", highlight: true },
      { label: "Rumsyta", value: "Upp till 10 m²", highlight: true },
      { label: "Luftkvalitetssensor", value: "Ingen", highlight: true },
      { label: "Ljudnivå", value: "Ej angiven", highlight: true },
      /* Kjell anger bara "Strömförsörjning: DC 5 V (strömadapter säljes
         separat)". Ingen effekt i watt någonstans: Kjells produktsida läst
         2026-08-06, manualen 894622_40793 hämtad men bildsatt och inte
         textsökbar, och produkten säljs inte hos någon annan butik med
         specifikation. Etablerad frånvaro. */
      { label: "Effekt", value: "Ej angiven", highlight: true },
      { label: "Filterbyte", value: "VOC-filtret en gång om året", highlight: true },
      { label: "Utbytesfilter", value: "99,90 kr", highlight: true },
      /* Manualen 40793_manual_EN_NO_SV_20231226.pdf, läst 2026-08-06:
         "Luftrenaren producerar aldrig mer än 0,05 ppm". Kjells produktsida
         upprepar samma tal och lägger till att tillfällig exponering under
         0,3 ppm är ofarlig. Samma uppgift från båda, alltså ingen konflikt. */
      { label: "Angiven ozonavgivning", value: "Högst 0,05 ppm" },
      { label: "Automatisk avstängning", value: "Efter 6 timmar" },
      { label: "Filter", value: "Elektrostatiskt filter och VOC-filter" },
      { label: "Ström", value: "DC 5 V via USB-C, adapter säljs separat" },
      { label: "Mått", value: "200 × 139 × 51 mm" },
      { label: "Vikt", value: "540 g" },
    ],
    verdict:
      "Rubicson Jonisator 10 m² kostar 599,90 kronor, väger 540 gram och drivs från ett USB-uttag. Manualen beskriver hur du ställer den på instrumentbrädan i en bil, och det är där den hör hemma.\n\nDen har inget HEPA-filter. Specifikationen anger ett elektrostatiskt filter och ett VOC-filter, och reningsprincipen är jonisering: partiklarna laddas så att de klumpar ihop sig och faller ner på ytorna i rummet i stället för att fångas i ett filter. Biprodukten är ozon. **Rubicson skriver själva i manualen att apparaten aldrig avger mer än 0,05 ppm.** Det är exakt det gränsvärde Kemikalieinspektionen och Elsäkerhetsverket mätte mot för apparater som ska stå på medan människor är i rummet, alltså taket och inte en marginal ner till det.\n\nSamma manual säger att den stänger av sig efter sex timmar, att den ska stå minst 50 centimeter från dig när den går, och att långvarig exponering i stängda rum kan ge torrhet i ögon och mun hos både människor och djur. Det är alltså inte en apparat du sätter på och glömmer bort, vilket är precis vad man gör med en luftrenare.\n\nVi säger inte att den här produkten var en av de fyra som föll i granskningen. Rapporten namnger inga produkter, och vi vet inte.\n\nTill en husvagn, ett garage eller ett soprum som luktar illa gör den ett jobb ingen annan här gör: den är liten, den går på USB och den kostar 600 kronor. Som luftrenare i ett sovrum är den fel produkt. Vill du rena rumsluft för lite pengar kostar Cleverio 999 kronor och har ett HEPA 13.",
  },
];

export const LUFTRENARE_PRODUCTS: Product[] = resolveProducts(LUFTRENARE, SEEDS);

/**
 * Övervägda men inte rankade.
 *
 * Två grupper: produkter vi inte kunde prissätta, och produkter som testats av
 * andra men inte längre går att köpa. Den andra gruppen är värd att läsa,
 * eftersom den förklarar varför sidan inte har något kriterium för testomdöme.
 */
export const LUFTRENARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Dyson",
    name: "Luftrenare, hela serien",
    reason:
      "Det mest kända märket bland luftrenare, och vi hade gärna rankat den. Vi hittade inget pris: varken dyson.se eller fem svenska butiker skriver ut vad den kostar, och vi rankar aldrig en produkt vars pris vi inte läst. Den säljs inte av butiken jämförelsen bygger på. Och den ligger i ett annat prisläge, grovt 6 000 till 9 000 kronor, vilket hade sträckt spannet till 15 gånger mellan billigast och dyrast. Kontrollerat 2026-08-03.",
  },
  {
    brand: "Blueair",
    name: "Classic 405",
    reason:
      "Utsedd till bra köp i det test som oftast citeras i kategorin, och numera omöjlig att köpa. Både Clas Ohlson och Webhallen skriver Produkten har utgått, kontrollerat 2026-08-03. Clas Ohlson har kvar sidan med betyget 4,5 på 23 omdömen men utan pris, samma spöke som IKEA-lamporna i vår jämförelse av smart belysning.",
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Luftrenare-Blueair-Classic-405/p/Pr367322000",
  },
  {
    brand: "Kärcher",
    name: "AF 100",
    reason:
      "Nämns som testvinnare i flera sammanfattningar, men det är en proffsprodukt. Kärcher lägger den själva under Professional med texten För bästa möjliga luftkvalitet på arbetet, och specialisten luftrenare.se anger 11 990 kronor. Det är fyra gånger dyrare än den dyraste konsumentprodukten i vår rankning och löser en annan uppgift, på samma sätt som proffsstegarna vi lämnade utanför brandstegssidan.",
    approxPrice: 11990,
    merchant: "luftrenare.se",
    merchantUrl:
      "https://www.luftrenare.se/p/luftrenare/luftrenare-med-filter/karcher-luftrenare/karcher-af-100.html",
  },
  {
    brand: "Cleverio",
    name: "AF-F100 golvfläkt med luftfilter",
    reason:
      "Ligger i butikens luftrenarkategori men är en golvfläkt med filter, i första hand något som flyttar luft och i andra hand något som renar den. Vi jämför inte en fläkt mot en apparat som anger CADR och filterklass.",
    merchant: "Kjell & Company",
  },
  {
    brand: "Ozoneair",
    name: "Purify 60 Pro",
    reason:
      "Svenskt märke från Luleå som en av de större jämförelsesajterna utsåg till bäst i test för allergiker. Den modell som krönades, Purify 120, säljs inte längre: sidan är borta och sortimentet är i dag Purify 30, 60 och 120 Pro plus 150 och 180, från 4 490 till 9 990 kronor. Det är över hela vår rankning, där den dyraste kostar 2 999. Tillverkaren beskriver själv tekniken som HEPA-filter tillsammans med UV-lampor och Oxyplasma, två av de fyra aktiva tekniker myndighetsgranskningen räknar upp som möjliga ozonbildare, och anger 99,97 procent utan filterklass enligt EN 1822. Till det kommer ett tillbehörskit för 890 till 1 190 kronor som ska bytas en gång om året, den högsta förbrukningskostnaden av alla här. Vi jämför inte apparater vars filterklass inte går att kontrollera mot dem som skriver ut H13.",
    approxPrice: 5990,
    merchant: "Ozoneair",
    merchantUrl: "https://ozoneair.se/products/purify-60-pro",
  },
  {
    brand: "Diverse",
    name: "Luftfuktare och avfuktare",
    reason:
      "Två grannkategorier som ofta blandas ihop med luftrenare i butikshyllan och i jämförelser. En luftfuktare tillför fukt, en avfuktare tar bort den, och ingen av dem filtrerar partiklar. Ingen av dem gör alltså det en luftrenare gör. Båda har egna jämförelser.",
  },
];

export const LUFTRENARE_FAQ = [
  {
    question: "Vilken luftrenare är bäst 2026?",
    answer:
      "Levoit Core 600S för 2 990 kronor hos Kjell, om rummet är stort. Den har ett H13 True HEPA, renar med filter enbart utan joniserings- eller UV-steg, och har det högsta luftflödet av alla åtta: 697 kubikmeter i timmen för upp till 147 kvadratmeter. För de flesta är dock Levoit Core 300S Pro för 1 590 kronor det bättre köpet, med samma filterklass, samma teknik, 22 decibel på lägsta läget och tillräckligt för 50 kvadratmeter. Vill du ha lägsta pris finns Cleverio Air Purifier för 999 kronor, som har ett HEPA 13, 721 kundomdömen med 4,5 i snitt och det billigaste utbytesfiltret av de riktiga filterrenarna, men bara räcker till 17 kvadratmeter.",
  },
  {
    question: "Avger luftrenare ozon?",
    answer:
      "Vissa gör det, och Kemikalieinspektionen och Elsäkerhetsverket mätte det. I en gemensam granskning publicerad 23 januari 2026 klarade fyra av tjugo undersökta luftrenare inte gränsvärdet för ozonavgivning, och tre av dem låg långt över. Majoriteten av de kontrollerade hade någon form av brist. Granskningen gällde apparater som är avsedda att stå på medan människor är i rummet. Avgörande är tekniken: en apparat som bara pressar luft genom filter bildar inget ozon, medan jonisering, UV-ljus, plasma och katalytisk oxidation kan göra det som biprodukt. Gränsvärdet är 0,05 ppm. Rapporten namnger inte produkterna som föll.",
  },
  {
    question: "Vad betyder HEPA, och är alla HEPA-filter lika bra?",
    answer:
      "Nej, och ordet används friare än det borde. Standarden EN 1822 delar in filter i tre grupper: EPA är klasserna E10 till E12, HEPA är H13 och H14, och ULPA är U15 till U17. Bara H13 och H14 är alltså HEPA i standardens mening, och de är provade vid den partikelstorlek som är svårast att fånga, kring 0,1 till 0,2 mikrometer. Formuleringar som HEPA-liknande, HEPA-typ eller bara HEPA utan siffra kan lika gärna vara ett E11- eller E12-filter. Titta då på vad tillverkaren säger att filtret fångar, och framför allt vid vilken partikelstorlek: 99,97 procent vid 0,3 mikrometer är ett betydligt lättare prov än samma tal vid 0,1.",
  },
  {
    question: "Vad är CADR och varför spelar det roll?",
    answer:
      "CADR står för Clean Air Delivery Rate och anges i kubikmeter renad luft per timme. Det är det enda måttet som säger något om hur snabbt apparaten faktiskt orkar rena ett rum, och det går att jämföra mellan fabrikat. Kvadratmetertalet är sämre, eftersom det vilar på ett antagande om takhöjd och antal luftväxlingar per timme. Skillnaden är stor: Shark NeverChange5 anger 60 kvadratmeter vid en enda luftväxling i timmen och 12 kvadratmeter vid nästan fem, alltså samma apparat med två tal som skiljer fem gånger. Apparaterna här ligger på 119 till 697 kubikmeter i timmen. Tumregeln är att du vill ha ungefär två luftväxlingar i timmen, vilket för ett rum på 20 kvadratmeter med 2,5 meter i tak betyder omkring 100 kubikmeter i timmen.",
  },
  {
    question: "Vad kostar en luftrenare i drift?",
    answer:
      "Elen är sällan problemet, filtren är det. Apparaterna vi jämför drar mellan 23 och 61 watt, vilket på dygnetruntdrift blir grovt 50 till 130 kronor om året vid ett elpris kring en krona per kilowattimme. Filtren kostar mer. Ett utbytesfilter i samma butik går på 99,90 kronor för Rubicsons jonisator, 299,90 för Cleverio, 499 för Levoit Core 300-serien och Xiaomi Smart Pet Care, 699 för Xiaomi Mijia 6, 749 för Levoit Core 400S och 1 099 för Core 600S. De byts oftast en gång om året, så fem år med vinnaren kostar mer i filter än vad flera av apparaterna kostar att köpa. Shark NeverChange5 är ensam om att angripa det, med en angiven filterlivslängd på upp till fem år. Räkna alltid filterkostnaden innan du jämför två inköpspris.",
  },
  {
    question: "Hjälper en luftrenare mot pollenallergi?",
    answer:
      "En luftrenare med filter fångar pollen ur inomhusluften, och det är vad den gör. Vi beskriver vad filtren fångar enligt tillverkarens och butikens uppgifter, men vi uttalar oss inte om vad det betyder för dina besvär, eftersom det är en medicinsk fråga och beror på person. Vill du köpa för pollen är två saker konkreta att titta på: ett H13-filter, och tillräckligt luftflöde för rummet. Xiaomi Smart Pet Care har ett eget pollental, 237,4 kubikmeter i timmen, vilket ingen annan apparat här anger. Prata med vården om besvären är stora.",
  },
  {
    question: "Är en luftrenare med UV-ljus bättre?",
    answer:
      "Inte enligt myndighetsgranskningen, och det finns skäl att vara försiktig. UV-lampor är en av de aktiva tekniker Kemikalieinspektionen och Elsäkerhetsverket räknar upp som möjliga ozonbildare, tillsammans med jonisering, plasma och ozongenerering. Deras granskning av tjugo luftrenare fann att fyra inte klarade ozongränsvärdet och att majoriteten hade någon form av brist. Till det kommer att UV-ljus behöver tillräckligt lång exponeringstid för att göra något åt mikroorganismer, och luften i en hushållsapparat passerar lampan på bråkdelen av en sekund. Ett filter som fysiskt fångar partikeln är den kontrollerbara metoden. Är UV ett tillägg du kan stänga av är det inget problem; är det apparatens huvudsakliga princip, välj något annat.",
  },
  {
    question: "Vad är skillnaden mellan luftrenare, luftfuktare och avfuktare?",
    answer:
      "En luftrenare rör inte luftfuktigheten alls. Den drar luft genom ett filter och fångar partiklar: damm, pollen och pälsdjursallergen. En luftfuktare tillför vatten till luften, och en avfuktare tar bort det. Fukt och partiklar är två skilda axlar: du kan ha 70 procent luftfuktighet och samtidigt ren luft, eller 30 procent och full av pollen. Det betyder också att ingen av de tre kan ersätta en annan. Har du både partikelbesvär och ett fuktproblem är det två apparater, även om en del avfuktare har ett filter som gör en del av jobbet. Vet du inte vilken du behöver, mät luftfuktigheten först och använd sedan väljaren i vår köpguide.",
  },
  {
    question: "Var ska luftrenaren stå?",
    answer:
      "I det rum du faktiskt vistas i, med fritt runt om. En luftrenare renar det rum den står i och nästan ingenting utanför, så en apparat i vardagsrummet gör lite för sovrumsluften. Ställ den inte i ett hörn eller bakom en soffa, eftersom de flesta drar in luft runt om hela enheten. Sovrummet är för många rätt val, och då är ljudnivån avgörande: 22 decibel på lägsta läget hör du inte, 42 hör du hela natten.",
  },
  {
    question: "Behöver man verkligen en luftrenare?",
    answer:
      "Ofta inte. Vädring, att dammsuga med bra filter, att inte röka inomhus och att elda rätt i braskaminen gör mer för luften än de flesta apparater, och kostar ingenting. En luftrenare är motiverad när du har en källa du inte kan ta bort: pollen som kommer in utifrån under säsong, husdjur, en gata med mycket trafik utanför, eller en bostad där du märker att luften blir dålig. Är svaret att du inte vet om du behöver en, är svaret förmodligen nej.",
  },
  {
    question: "Vad sa myndigheterna att man ska tänka på vid köp?",
    answer:
      "Kemikalieinspektionen och Elsäkerhetsverket ger flera konkreta råd i sin rapport. Köp inte elektriska produkter som saknar CE-märke. Produkter som säljs här ska ha bruksanvisning på svenska. Undvik att köpa från marknadsplatser där säljaren finns utanför EU, eftersom risken är större att kraven inte uppfylls. Rapporten noterar att lågprisprodukter, ofta importerade från länder utanför EU, i högre grad uppvisade brister. Misstänker du att en produkt du köpt inte är säker kan du anmäla det till Elsäkerhetsverket eller tipsa Kemikalieinspektionen.",
  },
];
