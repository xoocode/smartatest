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
 * rekommenderad yta, CADR, ljudnivå, effekt och vilken reningsteknik butiken
 * anger. Allt läst 2026-08-03 på Kjells egna produktsidor, i deras
 * strukturerade data eller i specifikationstabellen.
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
 * handlar om, och i båda fallen är det butikens egen text som säger det:
 *
 * - **Rubicson Jonisator.** Kjell skriver under rubriken Ozon och lukt: "En joniserande luftrenare producerar små mängder ozon vid användning." Butiken säger det alltså själv.
 * - **Xiaomi Mijia 6.** Kjell anger en inbyggd UVC-modul. Vi påstår inte att den avger ozon, bara att den har ett steg av den typ granskningen gällde.
 *
 * ## Filterklassen, tre nivåer
 *
 * | Nivå | Produkter |
 * |---|---|
 * | H13 i specifikationstabellen | Levoit Core 300S Pro, 400S, 600S |
 * | HEPA i säljtext eller utan klass | Cleverio, Shark, Xiaomi Pet Care |
 * | Ingen klass alls | Xiaomi Mijia 6, och Rubicson som saknar HEPA helt |
 *
 * ## Prisinversionen som är värd att känna till
 *
 * Levoit Core 600S kostar **9 kronor mindre** än Core 400S och har nästan
 * dubbla luftflödet, 697 mot 400 kubikmeter i timmen, samt 147 mot 83
 * kvadratmeter. Den dyrare modellen är alltså den sämre affären. Båda ligger
 * kvar i rankningen just därför.
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
    tagline: "Störst luftflöde, och billigare än den mindre modellen.",
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
    superlative: "Störst kapacitet, lägst pris av de två",
    pros: [
      "H13 True HEPA står i specifikationstabellen, inte bara i säljtexten",
      "CADR 697 m³/h är nästan dubbelt mot näst starkaste här",
      "Renar med filter enbart, utan jonisering och utan UV-lampa",
      "Kostar 9 kronor mindre än Core 400S trots betydligt högre kapacitet",
    ],
    cons: [
      "61 W är den högsta effekten av de åtta, dyrast i drift på högsta läget",
      "26 till 55 dB, vilket är högre än de mindre Levoit-modellerna",
      "Inga kundomdömen alls hos butiken vi länkar till",
    ],
    specs: [
      { label: "Pris", value: "2 990 kr", highlight: true },
      { label: "Filterklass", value: "H13 True HEPA, i spectabellen", highlight: true },
      { label: "Teknik", value: "Filter enbart", highlight: true },
      { label: "CADR", value: "697 m³/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 147 m²", highlight: true },
      { label: "Ljudnivå", value: "26–55 dB" },
      { label: "Effekt", value: "61 W" },
      { label: "Filter", value: "Förfilter, H13, aktivt kol" },
      { label: "Effektivitet", value: "Minst 99,97 % från 0,3 µm" },
    ],
    verdict:
      "H13 True HEPA står i specifikationstabellen, och apparaten renar med filter enbart. Ingen annan här gör båda.\n\nDet är en uppgift du kan kontrollera, till skillnad från en formulering i ett säljstycke. Enligt EN 1822 är H13 den lägsta klassen som faktiskt är HEPA, och tre av de åtta apparaterna här anger ingen klass alls.\n\nIngen jonisering, ingen UV-lampa, ingen plasma. Kemikalieinspektionens och Elsäkerhetsverkets granskning handlade om apparater som bildar ozon som biprodukt, och det är de aktiva stegen som gör det. En apparat som bara pressar luft genom ett filter har inte det problemet.\n\nKapaciteten är störst av apparaterna i jämförelsen, med marginal. 697 kubikmeter i timmen mot 443 för näst bästa, och en angiven yta på 147 kvadratmeter.\n\nSedan det som är svårt att förstå: den kostar 2 990 kronor och Core 400S kostar 2 999. Den mindre modellen kostar alltså 9 kronor mer och ger nästan halva luftflödet, 83 kvadratmeter i stället för 147. Vi vet inte varför Kjell prissatt dem så, men den mindre är svår att motivera så länge det står så.\n\nHaken är driften. 61 watt är dubbelt mot de flesta här, och 55 decibel på högsta läget är för mycket i ett sovrum. Den här ska stå i ett stort rum där den får jobba, inte bredvid sängen. Och den har noll kundomdömen hos Kjell, vilket är värt att väga mot Cleverios 721.",
  },
  {
    id: "levoit-core-300s-pro",
    name: "Core 300S Pro Smart luftrenare",
    shortName: "Core 300S Pro",
    brand: "Levoit",
    image: productImage(LUFTRENARE.slug, "levoit-core-300s-pro"),
    tagline: "Tystast av alla, med klassen utskriven där den ska stå.",
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
    superlative: "Den de flesta ska köpa",
    pros: [
      "H13 HEPA står i specifikationstabellen, som hos de större syskonen",
      "22 dB på lägsta läget är det tystaste angivna värdet av alla åtta",
      "Filter enbart, utan aktivt steg som kan bilda biprodukter",
      "1 590 kronor för 50 kvadratmeter och CADR 240 är jämförelsens bästa balans",
    ],
    cons: [
      "CADR 240 m³/h räcker inte till stora ytor",
      "Inga kundomdömen hos butiken",
      "Kräver 2,4 GHz-wifi för appen, vilket vissa moderna routrar gör krångligt",
    ],
    specs: [
      { label: "Pris", value: "1 590 kr", highlight: true },
      { label: "Filterklass", value: "H13 HEPA, i spectabellen", highlight: true },
      { label: "Teknik", value: "Filter enbart", highlight: true },
      { label: "CADR", value: "240 m³/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 50 m²", highlight: true },
      { label: "Ljudnivå", value: "22–50 dB" },
      { label: "Effekt", value: "23 W" },
      { label: "Filter", value: "3-stegs: förfilter, H13, aktivt kol" },
      { label: "App", value: "VeSync, Alexa och Google Assistant" },
    ],
    verdict:
      "Den de flesta ska köpa. I sitt prisläge är den svår att hitta invändningar mot.\n\nDen gör samma sak rätt som vinnaren. H13 står i specifikationstabellen, och den renar med filter enbart. För 1 590 kronor får du både den kontrollerbara filterklassen och friheten från de aktiva steg myndighetsgranskningen handlade om.\n\nDärtill det som gör den till ett sovrumsval: 22 decibel på lägsta läget. Det är det lägsta angivna värdet av de åtta och i praktiken en apparat du inte hör. 23 watt gör den också billig att ha igång dygnet runt, vilket är hur en luftrenare faktiskt används.\n\n50 kvadratmeter och CADR 240 räcker till ett sovrum, ett vardagsrum eller ett hemmakontor. Har du en öppen planlösning på 100 kvadratmeter ska du inte köpa den här, och då är Core 600S rätt trots att den låter mer.\n\nDet vi inte vet något om är hur den håller. Kjell har inga kundomdömen på den, till skillnad från Cleverio som har 721. Specifikationen är bättre, kundunderlaget sämre. Det är en avvägning vi inte kan göra åt dig, men vi kan säga att specifikationen är den enda av de två som går att kontrollera i förväg.",
  },
  {
    id: "levoit-core-400s",
    name: "Core 400S Smart luftrenare med HEPA-filter",
    shortName: "Core 400S",
    brand: "Levoit",
    image: productImage(LUFTRENARE.slug, "levoit-core-400s"),
    tagline: "Bra apparat, omöjligt pris så länge 600S kostar mindre.",
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
    superlative: "Tyst för sin storlek, men fel prislapp",
    pros: [
      "H13 True HEPA i specifikationstabellen",
      "24 till 48 dB, tystast på högsta läget av alla här",
      "Filter enbart, inget aktivt steg",
      "CADR 400 m³/h räcker till 83 kvadratmeter",
    ],
    cons: [
      "2 999 kronor, 9 kronor mer än Core 600S som har 697 i CADR mot 400",
      "Svår att motivera mot både sitt större och sitt mindre syskon",
      "Inga kundomdömen hos butiken",
    ],
    specs: [
      { label: "Pris", value: "2 999 kr", highlight: true },
      { label: "Filterklass", value: "H13 True HEPA, i spectabellen", highlight: true },
      { label: "Teknik", value: "Filter enbart", highlight: true },
      { label: "CADR", value: "400 m³/h", highlight: true },
      { label: "Rumsyta", value: "Upp till 83 m²", highlight: true },
      { label: "Ljudnivå", value: "24–48 dB" },
      { label: "Effekt", value: "24 W" },
      { label: "Effektivitet", value: "Minst 99,97 % från 0,3 µm" },
    ],
    verdict:
      "En bra luftrenare med en prislapp som inte går ihop.\n\nAllt tekniskt är rätt. H13 True HEPA i specifikationstabellen, filter enbart utan aktiva steg, CADR 400 och 83 kvadratmeter. 24 till 48 decibel är dessutom det lägsta maxvärdet av alla åtta, och därmed tystast när den arbetar för fullt. Med 24 watt är den billig i drift.\n\nProblemet är de 9 kronorna. Core 600S kostar 2 990 och har 697 i CADR mot 400, och 147 kvadratmeter mot 83. Samma tillverkare, samma filterklass, samma butik, samma dag. Den enda anledningen att välja 400S framför 600S är att den låter mindre, 48 mot 55 decibel på max, och drar 24 watt mot 61.\n\nDet är faktiskt ett argument om apparaten ska stå i ett sovrum. Men då är Core 300S Pro tystare än båda, kostar 1 590 kronor och räcker till 50 kvadratmeter, vilket är mer än ett sovrum.\n\nDen hamnar därför i kläm mellan sina två syskon och tappar nästan hela sitt betyg på prisvärde. Ändrar Kjell prissättningen blir den genast intressant, och priserna här är lästa en enda dag.",
  },
  {
    id: "cleverio-air-purifier",
    name: "Air Purifier smart luftrenare",
    shortName: "Air Purifier",
    brand: "Cleverio",
    image: productImage(LUFTRENARE.slug, "cleverio-air-purifier"),
    tagline: "721 kundomdömen, och klassen står i fel stycke.",
    scores: {
      teknik: 5,
      filterklass: 3.5,
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
    superlative: "Störst kundunderlag av alla åtta",
    pros: [
      "721 kundomdömen med 4,5 i snitt, vårt största underlag någonstans",
      "999 kronor är lägst pris av alla riktiga filterrenare här",
      "Filter enbart, inget joniseringssteg och ingen UV-lampa",
      "25 dB på lägsta läget och 30 W gör den billig och tyst att ha igång",
    ],
    cons: [
      "HEPA 13 anges bara i säljtexten och inte i specifikationstabellen",
      "17 kvadratmeter är den minsta angivna ytan av luftrenarna i jämförelsen",
      "Ingen CADR anges, så kapaciteten går inte att jämföra med de andra",
      "5 W i standby är förvånansvärt mycket för en apparat i den här klassen",
    ],
    specs: [
      { label: "Pris", value: "999 kr", highlight: true },
      { label: "Filterklass", value: "HEPA 13, men bara i säljtexten", highlight: true },
      { label: "Teknik", value: "Filter enbart", highlight: true },
      { label: "CADR", value: "Ej angivet", highlight: true },
      { label: "Rumsyta", value: "17 m² vid 3 cykler", highlight: true },
      { label: "Ljudnivå", value: "25–50 dB" },
      { label: "Effekt", value: "30 W, 5 W i standby" },
      { label: "Filter", value: "Tre lager med aktivt kol" },
    ],
    verdict:
      "721 kundomdömen med 4,5 i snitt. Ingen annan här har mer än ett.\n\nDet är fem gånger näst största underlaget vi har någonstans. Sju av de åtta här har noll eller ett omdöme. Det säger inte att Cleverio är bäst, men det säger att många har den och att de flesta är nöjda, och det är en annan sorts kunskap än en specifikation.\n\n999 kronor är dessutom lägst pris av alla riktiga filterrenare här, och den renar med filter enbart utan de aktiva steg myndighetsgranskningen handlade om.\n\nFilterklassen står som HEPA 13 i säljtexten men inte i specifikationstabellen, där det bara står att filtret har tre lager med aktivt kol. Det är en nivå sämre än Levoits sätt att redovisa samma sak, och kriteriet mäter precis det: vad du kan kontrollera före köp.\n\nSedan storleken. 17 kvadratmeter, och Kjell skriver hederligt ut att det gäller vid tre luftcykler. Ingen CADR anges, så du kan inte räkna själv. Den här är ett sovrum eller ett arbetsrum, ingenting mer. Till ett vardagsrum med öppen planlösning ska du köpa Levoit.\n\nFör 999 kronor till rätt rum är det ändå svårt att göra fel.",
  },
  {
    id: "shark-neverchange5",
    name: "NeverChange5 luftrenare",
    shortName: "NeverChange5",
    brand: "Shark",
    image: productImage(LUFTRENARE.slug, "shark-neverchange5"),
    tagline: "Fem år utan filterbyte, till 66 decibel.",
    scores: {
      teknik: 5,
      filterklass: 2,
      kapacitet: 3.5,
      ljudOchDrift: 3,
      /* 2,5 och inte 3,0: 2 999 kronor är exakt samma pris som Levoit Core
         400S, som skriver ut H13 i specifikationen där Shark bara skriver
         HEPA. Sänkt 2026-08-03. */
      prisvarde: 2.5,
    },
    price: 2999,
    merchant: KJELL,
    merchantUrl: `${BASE}/shark-neverchange5-luftrenare-p47517`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Lägst driftkostnad, högst ljudnivå",
    pros: [
      "Filterlivslängd upp till fem år, den överlägset lägsta driftkostnaden här",
      "Fyra lager med förfilter, husdjursspärr, HEPA och aktivt kol",
      "Partikelsensor som mäter tre storlekar: PM1, PM2,5 och PM10",
      "Filter enbart, inget aktivt steg",
    ],
    cons: [
      "Anger HEPA men ingen klass, så du vet inte om det är H13 eller något lägre",
      "66 dB på högsta läget är klart högst här, där övriga toppar på 48 till 55",
      "42,5 dB på lägsta läget är högre än vad de flesta andra har på högsta",
      "Ingen CADR anges",
    ],
    specs: [
      { label: "Pris", value: "2 999 kr", highlight: true },
      { label: "Filterklass", value: "HEPA, ingen klass angiven", highlight: true },
      { label: "Teknik", value: "Filter enbart", highlight: true },
      { label: "Filterbyte", value: "Upp till 5 år", highlight: true },
      { label: "Rumsyta", value: "Upp till 60 m²", highlight: true },
      { label: "Ljudnivå", value: "42,5–66 dB" },
      { label: "CADR", value: "Ej angivet" },
      { label: "Sensor", value: "PM1, PM2,5 och PM10" },
      { label: "Modell", value: "HP150EU" },
    ],
    verdict:
      "Fem år utan filterbyte, mot ungefär ett för de andra.\n\nFilterbyten är vad en luftrenare egentligen kostar. Ett filter går på några hundralappar och byts oftast årligen, så över fem år kan förbrukningen överstiga inköpspriset. Stämmer Sharks löfte är NeverChange5 den billigaste av de åtta räknat över sin livstid, trots att den kostar 2 999 kronor.\n\nIngen annan sensor här mäter lika brett. Den mäter tre partikelstorlekar, PM1, PM2,5 och PM10, medan de flesta här inte anger någon sensor alls.\n\nSedan filterklassen. Shark skriver fyra lager HEPA med namnet NanoSeal, men ingen klass. Enligt EN 1822 är bara H13 och H14 HEPA, och utan siffra vet du inte om filtret ligger där eller på en EPA-klass under. Det är kriteriets näst lägsta betyg och det är produktens största svaghet på papperet.\n\nDen andra invändningen hörs. 66 decibel på högsta läget mot 48 till 55 för de andra, och 42,5 på lägsta, vilket är mer än vad flera av de andra ligger på när de går för fullt. Det här är ingen sovrumsapparat.\n\nKöp den till ett vardagsrum eller en hall där ljudet spelar mindre roll och du inte vill tänka på filter på fem år.",
  },
  {
    id: "xiaomi-pet-care",
    name: "Smart Pet Care Air Purifier",
    shortName: "Smart Pet Care",
    brand: "Xiaomi",
    image: productImage(LUFTRENARE.slug, "xiaomi-pet-care"),
    tagline: "Byggd för att inte skrämma djuret, oklar om filtret.",
    scores: {
      teknik: 5,
      filterklass: 2,
      kapacitet: 3,
      ljudOchDrift: 3.5,
      prisvarde: 3,
    },
    price: 1499,
    merchant: KJELL,
    merchantUrl: `${BASE}/xiaomi-smart-pet-care-air-purifier-p47221`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Enda med pollen-CADR utskrivet",
    pros: [
      "Anger både partikel-CADR 230 och pollen-CADR 237,4 m³/h, vilket ingen annan gör",
      "Antistressalgoritm som ändrar fläkthastigheten mjukt så att djur inte skräms",
      "Filter enbart, inget joniseringssteg",
      "Treskiktsfilter med förfilter och aktivt kol",
    ],
    cons: [
      "Anger HEPA-klass utan siffra, så klassen går inte att kontrollera",
      "16 till 27 kvadratmeter är litet för priset",
      "Ingen ljudnivå anges, vilket är märkligt för en produkt som säljs på att vara skonsam",
      "Inga kundomdömen hos butiken",
    ],
    specs: [
      { label: "Pris", value: "1 499 kr", highlight: true },
      { label: "Filterklass", value: "HEPA-klass, ingen siffra", highlight: true },
      { label: "Teknik", value: "Filter enbart", highlight: true },
      { label: "CADR", value: "230 m³/h", highlight: true },
      { label: "CADR pollen", value: "237,4 m³/h", highlight: true },
      { label: "Rumsyta", value: "16–27 m²" },
      { label: "Ljudnivå", value: "Ej angivet" },
      { label: "Effekt", value: "27 W" },
      { label: "Modell", value: "AC-M30-SC" },
    ],
    verdict:
      "Ensam bland luftrenarna om att skriva ut en separat pollen-CADR: 237,4 kubikmeter i timmen.\n\nDet här är ingen apparat för kattlådan. Den anger 16 till 27 kvadratmeter och en partikel-CADR på 230, vilket gör den till en riktig luftrenare för ett rum. Husdjursdelen är dels en antistressalgoritm som ändrar fläkthastigheten mjukt i stället för i steg, så att djuret inte skräms när den drar igång, dels just pollentalet.\n\nAlla andra här anger antingen en allmän CADR eller ingen alls, och pollen är den partikel de flesta luftrenarköpare bryr sig om.\n\nSvagheten är filterklassen. Kjell skriver treskiktsfilter av HEPA-klass, utan siffra. Enligt EN 1822 är HEPA bara H13 och H14, medan E10 till E12 är EPA, och formuleringen HEPA-klass säger inte vilket. För 1 499 kronor borde det gå att få veta.\n\nIngen ljudnivå anges heller, vilket är underligt just för en produkt vars säljargument är att den är skonsam mot ett djur som hör bättre än du.\n\nHar du katt eller hund och ett rum på 20 kvadratmeter är den rimlig. Har du inte det får du mer luftrenare för pengarna hos Levoit.",
  },
  {
    id: "xiaomi-mijia-6",
    name: "Mijia Smart Air Purifier 6",
    shortName: "Mijia Air Purifier 6",
    brand: "Xiaomi",
    image: productImage(LUFTRENARE.slug, "xiaomi-mijia-6"),
    tagline: "Näst högst luftflöde, med en UVC-lampa och ingen filterklass.",
    scores: {
      teknik: 2.5,
      filterklass: 1,
      kapacitet: 4.5,
      ljudOchDrift: 3,
      prisvarde: 2.5,
    },
    price: 2490,
    merchant: KJELL,
    merchantUrl: `${BASE}/xiaomi-mijia-smart-air-purifier-6-smart-luftrenare-2950-m-p47220`,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 1, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst sensorer, sämst redovisat filter",
    pros: [
      "CADR 443 m³/h är näst högst av luftrenarna i jämförelsen",
      "Fem sensorer, inklusive PM1, PM2,5 och damm",
      "Anger formaldehyd-CADR separat, 218 m³/h",
      "87,5 kvadratmeter vid två luftväxlingar per timme, hederligt utskrivet",
    ],
    cons: [
      "Ingen filterklass anges över huvud taget, trots 2 490 kronor",
      "Inbyggd UVC-modul, ett aktivt steg av den typ myndighetsgranskningen gällde",
      "Ingen ljudnivå anges",
      "Ett enda kundomdöme",
    ],
    specs: [
      { label: "Pris", value: "2 490 kr", highlight: true },
      { label: "Filterklass", value: "Ej angiven", highlight: true },
      { label: "Teknik", value: "Filter plus UVC-modul", highlight: true },
      { label: "CADR", value: "443 m³/h", highlight: true },
      { label: "Formaldehyd", value: "218 m³/h", highlight: true },
      { label: "Rumsyta", value: "29–50 m², 87,5 m² vid 2 ACPH" },
      { label: "Sensorer", value: "Fem, inklusive PM1 och PM2,5" },
      { label: "Ljudnivå", value: "Ej angivet" },
    ],
    verdict:
      "Ingenstans står det vilken filterklass den har. Allt annat är välmätt.\n\nCADR 443 är näst högst här, bara Levoit Core 600S ligger över. Fem sensorer, och Kjell skriver dessutom ut ytan både som 29 till 50 kvadratmeter och som 87,5 vid två luftväxlingar i timmen, vilket är den ärligaste ytredovisningen av alla åtta. Formaldehyd-CADR anges separat på 218.\n\nSedan luckan. Det står ingenstans vilken filterklass den har. Inte H13, inte H14, inte ens ordet HEPA i specifikationen. För en apparat på 2 490 kronor är det anmärkningsvärt, och enligt vårt kriterium ger det lägsta betyg: du kan inte kontrollera vad den fångar.\n\nOch så UVC-modulen. Kjell skriver att den bidrar till att eliminera bakterier och virus och hjälper till att hålla filtret rent. UV-strålning är en av de tekniker Kemikalieinspektionen och Elsäkerhetsverket räknar upp som kan bilda ozon som biprodukt.\n\n**Vi påstår inte att den här apparaten avger ozon.** Rapporten namnger inga produkter och vi har inte mätt något. Vi konstaterar att den har ett aktivt steg av den typ granskningen gällde, att butiken inte nämner biprodukter, och att det är en uppgift du borde få väga in. Det är därför den får 2,5 och inte 1,0 på reningsteknik: skillnaden mot Rubicson är att Rubicson skriver ut ozonet.\n\nVill du ha kapaciteten och sensorerna finns de här. Vill du veta vad filtret gör får du köpa en Levoit.",
  },
  {
    id: "rubicson-jonisator",
    name: "Jonisator 10 m²",
    shortName: "Jonisator 10 m²",
    brand: "Rubicson",
    image: productImage(LUFTRENARE.slug, "rubicson-jonisator"),
    tagline: "Butiken skriver själv att den producerar ozon.",
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
    superlative: "Billigast, och den enda vars säljare varnar för den",
    pros: [
      "599,90 kronor är lägsta priset i kategorin",
      "Butiken varnar själv för att en joniserande luftrenare producerar ozon, vilket är mer än de flesta gör",
      "Liten och lätt, 540 gram, och drivs via USB-C",
      "Elektrostatiskt filter går att rengöra i stället för att bytas",
    ],
    cons: [
      "Producerar ozon vid användning, enligt butikens egen produkttext",
      "Inget HEPA-filter över huvud taget, bara elektrostatiskt filter och VOC-filter",
      "Varken CADR eller ljudnivå anges",
      "10 kvadratmeter, minsta ytan av alla åtta",
      "Strömadapter säljs separat",
    ],
    specs: [
      { label: "Pris", value: "599,90 kr", highlight: true },
      { label: "Filterklass", value: "Ingen HEPA alls", highlight: true },
      { label: "Teknik", value: "Jonisering, avger ozon", highlight: true },
      { label: "Filter", value: "Elektrostatiskt filter och VOC-filter", highlight: true },
      { label: "Rumsyta", value: "10 m²", highlight: true },
      { label: "CADR", value: "Ej angivet" },
      { label: "Ljudnivå", value: "Ej angivet" },
      { label: "Ström", value: "DC 5 V, adapter säljs separat" },
      { label: "Vikt", value: "540 g" },
    ],
    verdict:
      "Sist av luftrenarna i jämförelsen. Skälet står i butikens egen produkttext.\n\nUnder rubriken Ozon och lukt skriver Kjell: en joniserande luftrenare producerar små mängder ozon vid användning. Det är säljarens egna ord om sin egen produkt, i den kategori där den säljs som luftrenare.\n\nSätt det bredvid vad Kemikalieinspektionen och Elsäkerhetsverket kom fram till i januari 2026. Fyra av tjugo granskade luftrenare klarade inte gränsvärdet för ozon, tre av dem långt över, och granskningen gällde apparater som är avsedda att stå på medan människor är i rummet. Ozon irriterar luftvägar och ögon, orsakar hosta och kan förvärra astma. Förfrågningarna till Giftinformationscentralen om symptom efter ozon från luftrenare gick från 12 år 2015 till 132 år 2024.\n\n**Vi säger inte att den här produkten var en av de fyra.** Rapporten namnger inga produkter, och vi vet inte. Vi säger att den enligt sin egen säljare tillhör den grupp granskningen handlade om, och att den saknar det som gör en luftrenare till en luftrenare.\n\nFör den saknar HEPA helt. Specifikationen anger elektrostatiskt filter och VOC-filter, inget mer. Ingen CADR, ingen ljudnivå, 10 kvadratmeter, och strömadaptern ingår inte. Kundbetyget är 3,0 på 17 omdömen, lägst av luftrenarna i jämförelsen.\n\nDet ska sägas att Rubicson och Kjell gör en sak rätt som andra inte gör: de skriver ut ozonet i stället för att låta bli. Det är därför den ligger med här i stället för bland de bortvalda. Men det gör inte produkten till ett bra köp, och 599,90 kronor är inte billigt för något som inte löser uppgiften.",
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
      "Levoit Core 600S för 2 990 kronor hos Kjell, om rummet är stort. Den anger H13 True HEPA i specifikationstabellen, renar med filter enbart utan joniserings- eller UV-steg, och har det högsta luftflödet av apparaterna i jämförelsen, CADR 697 kubikmeter i timmen för upp till 147 kvadratmeter. För de flesta är dock Levoit Core 300S Pro för 1 590 kronor det bättre köpet: samma filterklass, samma teknik, 22 decibel på lägsta läget och tillräckligt för 50 kvadratmeter. Vill du ha lägsta pris finns Cleverio Air Purifier för 999 kronor, som har 721 kundomdömen med 4,5 i snitt men bara räcker till 17 kvadratmeter.",
  },
  {
    question: "Avger luftrenare ozon?",
    answer:
      "Vissa gör det, och Kemikalieinspektionen och Elsäkerhetsverket mätte det. I en gemensam granskning publicerad 23 januari 2026 klarade fyra av tjugo undersökta luftrenare inte gränsvärdet för ozonavgivning, och tre av dem låg långt över. Majoriteten av de kontrollerade hade någon form av brist. Granskningen gällde apparater som är avsedda att stå på medan människor är i rummet. Avgörande är tekniken: en apparat som bara pressar luft genom filter bildar inget ozon, medan jonisering, UV-ljus, plasma och katalytisk oxidation kan göra det som biprodukt. Gränsvärdet är 0,05 ppm. Rapporten namnger inte produkterna som föll.",
  },
  {
    question: "Vad betyder HEPA, och är alla HEPA-filter lika bra?",
    answer:
      "Nej, och ordet används friare än det borde. Standarden EN 1822 delar in filter i tre grupper: EPA är klasserna E10 till E12, HEPA är H13 och H14, och ULPA är U15 till U17. Bara H13 och H14 är alltså HEPA i standardens mening. Formuleringar som HEPA-liknande, HEPA-typ eller bara HEPA utan siffra betyder ofta ett E11- eller E12-filter, som släpper igenom betydligt fler partiklar vid den storlek som är svårast att fånga. Av de åtta apparater vi jämför anger tre H13 i specifikationstabellen, tre skriver HEPA utan klass eller bara i säljtexten, och två anger ingen klass alls.",
  },
  {
    question: "Vad är CADR och varför spelar det roll?",
    answer:
      "CADR står för Clean Air Delivery Rate och anges i kubikmeter renad luft per timme. Det är det enda måttet som säger något om hur snabbt apparaten faktiskt orkar rena ett rum, och det går att jämföra mellan fabrikat. Den kvadratmeteryta butikerna anger är sämre, eftersom den bygger på antaganden om takhöjd och antal luftväxlingar per timme som sällan skrivs ut. Av de åtta apparater vi jämför anger fem sin CADR, från 230 till 697 kubikmeter i timmen, och tre anger ingen alls. Xiaomi Mijia 6 är ensam om att skriva ut ytan både som spann och vid två luftväxlingar per timme, vilket är den ärligaste redovisningen av alla åtta.",
  },
  {
    question: "Vad kostar en luftrenare i drift?",
    answer:
      "Elen är sällan problemet, filtren är det. Apparaterna vi jämför drar mellan 23 och 61 watt, vilket på dygnetruntdrift blir grovt 50 till 130 kronor om året vid ett elpris kring en krona per kilowattimme. Filterbytena kostar mer: ett utbytesfilter går på ett par hundralappar och rekommenderas oftast en gång om året, så över fem år kan förbrukningen närma sig eller överstiga vad apparaten kostade. Shark NeverChange5 är ensam om att angripa det, med en angiven filterlivslängd på upp till fem år. Räkna alltid med filterkostnaden innan du jämför två inköpspris.",
  },
  {
    question: "Hjälper en luftrenare mot pollenallergi?",
    answer:
      "En luftrenare med filter fångar pollen ur inomhusluften, och det är vad den gör. Vi beskriver vad filtren fångar enligt tillverkarens och butikens uppgifter, men vi uttalar oss inte om vad det betyder för dina besvär, eftersom det är en medicinsk fråga och beror på person. Vill du köpa för pollen är två saker konkreta att titta på: att filterklassen anges, helst H13, och att kapaciteten räcker till rummet. Xiaomi Smart Pet Care är ensam om att ange en separat pollen-CADR, 237,4 kubikmeter i timmen. Prata med vården om besvären är stora.",
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
