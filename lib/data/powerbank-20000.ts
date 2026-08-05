import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { POWERBANK_20000 } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /powerbank-20000.
 *
 * Systersida till /powerbank. Den här filen bär reseklassen från 20 000 mAh
 * och uppåt; vardagsklassen ligger i lib/data/powerbank.ts.
 *
 * Priser, artikelnummer, kundbetyg och specifikationer är lästa hos Kjell på
 * PRICE_CHECKED, i produktsidans egen JSON-LD och specifikationstext.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans. Se lib/links.ts.
 *
 * ## Länkmålen, breddade 2026-08-05
 *
 * Sju av åtta länkar går till Kjell och en till Teknikdelar. Koncentrationen
 * står utskriven på sidan.
 *
 * **Ugreen Nexode flyttades till Teknikdelar** efter butikskartläggningen i
 * .agent/plans/butikskartlaggning-elektronik.md. Identiteten är bekräftad:
 * Kjell säljer den som "Nexode" utan att publicera GTIN, Teknikdelar som
 * "PB726" med GTIN 6941876269921, och det numret löser upp till "Ugreen Nexode
 * 20000mAh 165W med indragbar kabel" hos flera oberoende återförsäljare.
 * Chargerlabs teardown betitlar samma produkt "UGREEN Nexode 20000mAh 165W
 * Power Bank with Retractable USB-C Cable (PB726)". Samma artikel, två namn.
 *
 * Villkoren är identiska: 990 kr hos båda, 5 % provision, 30 dagars cookie.
 * Bytet ger alltså ingen extra provision. Skälet är att en sida där varje
 * produkt länkar till samma butik läses som köpt placering även när
 * rankningen är ärlig, se .claude/context/money.md. Teknikdelar publicerar
 * dessutom GTIN, vilket Kjell inte gör.
 *
 * ⚠️ Nio av sexton produkter över de två powerbanksidorna är Linocell, alltså
 * Kjells eget varumärke, och kan aldrig flyttas. TheMobileStores 10 % är
 * oanvändbar här: de för varken Anker, Ugreen eller Denver.
 *
 * ## Här publiceras wattimmen, och det är själva poängen
 *
 * På /powerbank anger två av åtta produkter sitt energiinnehåll. Här gör sju av
 * nio det. Skillnaden är att taket på 100 Wh bara är i sikte i den här
 * storleken. Två produkter ligger inom en wattimme under gränsen:
 *
 * - Anker Prime 26 250 mAh: **99,75 Wh**
 * - Linocell 27 600 mAh: **99,36 Wh**
 *
 * ## ⚠️ Tre gånger 20 000 mAh ger tre olika wattimmar
 *
 * Linocell Premium anger 72 Wh med spänningen 3,6 V utsatt. Anker Prime anger
 * 72,36 Wh för 20 100 mAh, vilket är förenligt. Xtorm anger **100 Wh** för
 * samma nominella 20 000 mAh, alltså 39 procent mer, och skriver dessutom
 * "Flygplansgodkänd: Ja" i samma ruta.
 *
 * **Vi påstår inte att någon har fel.** Talet återges som butikens publicerade
 * uppgift, spridningen redovisas, och `Energiinnehåll` ligger i
 * `ALDRIG_BEDOMD` så att ingen cell fylls med en egen uträkning. Samma hållning
 * som Clas Ohlsons 7,5 mot 13 liter på /avfuktare och Boxers 8 mot 800 watt på
 * /garageportsoppnare.
 *
 * ⚠️ Xtorms uppgift är **inte kontrollerad mot tillverkarens egen sida**. Gör
 * det vid nästa runda innan något skärps.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte laddat ur en enda powerbank. Stiftung Warentest mätte uttagbar
 * energi till 58,3 till 69,9 Wh för den här storleksklassen, men resultaten per
 * modell ligger bakom betalvägg och knyts inte till någon produkt här.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "linocell-165w-27600",
    brand: "Linocell",
    name: "Powerbank 165 W PD 27 600 mAh",
    shortName: "Linocell 165 W",
    image: productImage(POWERBANK_20000.slug, "linocell-165w-27600"),
    tagline: "99,36 wattimmar, alltså så nära flyggränsen man kommer.",
    scores: {
      /* Störst kapacitet i jämförelsen och 99,36 Wh utskrivet, alltså 0,64
         wattimmar under taket. */
      kapacitet: 5,
      /* 165 W total, inbyggd USB-C-kabel plus USB-C och USB-A. */
      laddeffekt: 4,
      /* Anger celluppsättning, wattimmar och effekt per port, men ingen vikt. */
      redovisning: 4.5,
      /* Vikten är inte publicerad, vilket är en verklig lucka i en reseprodukt. */
      vikt: 2.5,
      /* 999 kr för nära maximal tillåten kapacitet. */
      prisvarde: 4.5,
    },
    price: 999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-powerbank-165-w-pd-27-600-mah-p88996",
    userRating: { value: 5, count: 1, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för längsta resan",
    pros: [
      "27 600 mAh, störst kapacitet i jämförelsen",
      "99,36 wattimmar utskrivet, alltså strax under gränsen på 100",
      "165 W total uteffekt räcker till en bärbar dator",
      "Inbyggd USB-C-kabel plus en USB-C-port och en USB-A",
      "Upp till sex mobilladdningar",
    ],
    cons: [
      "Vikten är okänd, vilket är en lucka i något som ska bäras",
      "Ett enda kundbetyg, alltså tunt underlag för hur den fungerar över tid",
      "99,36 wattimmar lämnar ingen marginal om ett flygbolag räknar annorlunda",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "999 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "27 600 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "99,36 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "165 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "3 st", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Ja, USB-C", highlight: true },
      { label: "Porttyper", value: "1× USB-C in/ut, 1× inbyggd USB-C-kabel in/ut, 1× USB-A ut" },
      { label: "Batteri", value: "6× 4 600 mAh litium" },
      { label: "Mobilladdningar", value: "Upp till ca 6" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Artikelnummer", value: "88996" },
    ],
    verdict:
      "Linocell 165 W rymmer 27 600 mAh och kostar 999 kronor. Det är den största powerbanken i jämförelsen, och den ligger 0,64 wattimmar under gränsen för vad du får ta med ombord.\n\n**99,36 wattimmar är inte ett slumptal.** Taket för handbagage utan flygbolagets godkännande går vid 100, och den här produkten är byggd för att rymmas precis under. Det betyder att du får maximal kapacitet som fortfarande är fri att ta med, och den kapaciteten räcker till ungefär sex mobilladdningar eller en dator plus en telefon över en lång resdag.\n\n**165 watt total uteffekt gör den till en riktig datorladdare**, inte bara en telefonreserv, och den inbyggda USB-C-kabeln betyder att du klarar dig utan lös sladd. Till det kommer en USB-C-port och en USB-A, så tre saker kan laddas samtidigt. Sex battericeller på 4 600 mAh vardera står utskrivet, vilket är mer öppenhet än de flesta ger.\n\nTvå saker ska du gå in med öppna ögon om. Vikten går inte att läsa någonstans, och i en produkt vars hela syfte är att bäras är det en verklig lucka. Och den har ett enda kundbetyg, så hur den beter sig efter ett år vet ingen ännu.\n\nKöp den. Du får den största lagliga kapaciteten, en kabel som sitter i och effekt nog för en dator, för en tredjedel av vad den dyraste här kostar.",
  },
  {
    id: "anker-prime-300w-26250",
    brand: "Anker",
    name: "Prime Powerbank 300 W PD 3.1 26 250 mAh",
    shortName: "Anker Prime 300 W",
    image: productImage(POWERBANK_20000.slug, "anker-prime-300w-26250"),
    tagline: "300 watt ut och 250 in, snabbast i jämförelsen åt båda hållen.",
    scores: {
      kapacitet: 5,
      /* 300 W total, 140 W per USB-C-port med PD 3.1, och uppladdning på
         250 W. Överlägset snabbast. */
      laddeffekt: 5,
      /* Anger energi, effekt per port, uppladdningseffekt, mått och app. */
      redovisning: 5,
      vikt: 2.5,
      /* 2 490 kr är jämförelsens högsta pris med marginal. */
      prisvarde: 2,
    },
    price: 2490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-prime-powerbank-300-w-pd-3.1-26250-mah-p88933",
    userRating: { value: 5, count: 5, scale: 5, checkedAt: PRICE_CHECKED },
    award: "premium",
    superlative: "Bäst för två datorer samtidigt",
    pros: [
      "300 W total uteffekt, mer än något annat här",
      "140 W per USB-C-port med PD 3.1, alltså full fart till en stor dator",
      "Laddas själv med upp till 250 W, alltså full på under en timme",
      "99,75 wattimmar utskrivet, strax under flyggränsen",
      "App via Bluetooth som visar status per port",
    ],
    cons: [
      "2 490 kronor, två och en halv gånger vinnarens pris",
      "Vikten är okänd, och systermodellen på 20 100 mAh väger 510 gram",
      "250 W uppladdning kräver en laddare de flesta inte äger",
      "99,75 wattimmar lämnar bara en fjärdedels wattimme till gränsen",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 490 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "26 250 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "99,75 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "300 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "3 st", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Porttyper", value: "2× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, PD 3.1 upp till 140 W och 28 V / 5 A" },
      { label: "Ineffekt", value: "Upp till 250 W via båda USB-C-portarna" },
      { label: "App", value: "Anker för iOS och Android via Bluetooth" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Artikelnummer", value: "88933" },
    ],
    verdict:
      "Anker Prime 300 W rymmer 26 250 mAh och kostar 2 490 kronor. Den laddar snabbare än allt annat i jämförelsen, åt båda hållen.\n\n**300 watt total uteffekt och 140 watt per USB-C-port** betyder att den håller en stor bärbar dator på full laddfart medan den samtidigt driver en telefon och en surfplatta. PD 3.1 med 28 volt och 5 ampere är den nyaste generationen av standarden, och den finns inte i något annat här.\n\n**Uppladdningen är det som verkligen skiljer.** Upp till 250 watt in betyder att en tom bank på 26 250 mAh är full igen på under en timme, mot flera timmar för resten. På en resa där du laddar på hotellet mellan två dagar är det skillnaden mellan att hinna och att inte hinna. Appen visar dessutom status per port över Bluetooth.\n\nEnergiinnehållet står utskrivet till 99,75 wattimmar, alltså en fjärdedels wattimme under gränsen för handbagage.\n\n**Priset är invändningen och den är stor.** 2 490 kronor är två och en halv gånger vad vinnaren kostar för nästan samma kapacitet. De 250 watten in kräver dessutom en laddare de flesta inte äger, så en del av det du betalar för blir liggande. Och vikten står inte någonstans, medan systermodellen på 20 100 mAh väger 510 gram.\n\nLaddar du två datorer på resande fot och tycker att en timmes laddtid är värd pengarna är den värd sitt pris. Ska den bara hålla en dator och en telefon igång gör Linocell 165 W samma sak för 1 491 kronor mindre.",
  },
  {
    id: "linocell-25000",
    brand: "Linocell",
    name: "Powerbank 25 000 mAh",
    shortName: "Linocell 25 000",
    image: productImage(POWERBANK_20000.slug, "linocell-25000"),
    tagline: "140 watt ur en port, och 133 kunder har betygsatt den.",
    scores: {
      /* 25 000 mAh och 90 Wh utskrivet med spänningen 3,6 V. */
      kapacitet: 4.5,
      /* 145 W total, 140 W ur USB-C 2, 100 W in. */
      laddeffekt: 4,
      /* Anger celluppsättning, spänning, wattimmar och effekt per port och
         portkombination. Mest detaljerade specifikationen i jämförelsen. */
      redovisning: 4.5,
      vikt: 2.5,
      prisvarde: 4.5,
    },
    price: 999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-powerbank-25-000-mah-p89035",
    userRating: { value: 4.5, count: 133, scale: 5, checkedAt: PRICE_CHECKED },
    award: "editor",
    superlative: "Bäst för den beprövade vägen",
    pros: [
      "133 kundbetyg på 4,5, det bredaste underlaget i jämförelsen",
      "140 W ur en enda USB-C-port, alltså full fart till en stor dator",
      "90 wattimmar utskrivet, med spänningen 3,6 V angiven",
      "Fem battericeller på 5 000 mAh var, utskrivet",
      "Laddas själv med upp till 100 W",
    ],
    cons: [
      "Vikten är okänd, vilket är en lucka i en reseprodukt",
      "90 wattimmar mot vinnarens 99,36, alltså mindre kapacitet för samma pris",
      "Ingen kabel sitter fast i enheten",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "999 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "25 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "90 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "145 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "3 st", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Porttyper", value: "2× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, upp till 140 W ur USB-C 2" },
      { label: "Ineffekt", value: "Upp till 100 W" },
      { label: "Batteri", value: "5× 5 000 mAh litiumpolymer, 3,6 V" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Artikelnummer", value: "89035" },
    ],
    verdict:
      "Linocell 25 000 mAh kostar 999 kronor och har 133 kundbetyg på 4,5, vilket är det bredaste underlaget i hela jämförelsen.\n\n**Det säger inget om hur mycket ström som kommer ut, men mycket om att den fungerar** hos ett stort antal människor över tid. I en klass där flera produkter har ett eller två betyg är det värt att väga in, särskilt för något som ska överleva att slängas i en väska varje vecka.\n\n**140 watt ur en enda USB-C-port** räcker till de flesta bärbara datorer på full laddfart, och totalt ger den 145 watt fördelat över tre portar. Den tar själv emot 100 watt, så uppladdningen tar timmar och inte en kväll.\n\nSpecifikationen är dessutom den mest detaljerade här: fem battericeller på 5 000 mAh vardera, spänningen 3,6 volt utsatt, 90 wattimmar, och effekten angiven både per port och per portkombination. Det är precis den öppenhet som gör att du kan räkna på din egen resa i förväg.\n\nDet du betalar med är kapacitet. 90 wattimmar mot vinnarens 99,36 för exakt samma pris betyder att du får nästan en tiondel mindre ström för pengarna, och vikten går inte att läsa någonstans.\n\nVill du ha den produkt som flest andra redan kört i ett år är det den här. Vill du ha största möjliga kapacitet för samma pengar tar du Linocell 165 W i stället.",
  },
  {
    id: "linocell-premium-100w-20000",
    brand: "Linocell",
    name: "Premium Powerbank 100 W 20000 mAh",
    shortName: "Linocell Premium 100 W",
    image: productImage(POWERBANK_20000.slug, "linocell-premium-100w-20000"),
    tagline: "100 watt till datorn för 699 kronor.",
    scores: {
      kapacitet: 3.5,
      /* 100 W PD ut via USB-C, men max total 87,5 W. */
      laddeffekt: 3.5,
      /* Anger 20 000 mAh/3,6 V/72 Wh plus varje spänningssteg in och ut. */
      redovisning: 4.5,
      vikt: 2.5,
      /* Billigaste vägen till hundra watt. */
      prisvarde: 4.5,
    },
    price: 699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-premium-powerbank-100-w-20000-mah-p89361",
    userRating: { value: 4.5, count: 35, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst för datorn till lågt pris",
    pros: [
      "100 W PD ut, billigaste vägen till datorladdning i jämförelsen",
      "72 wattimmar utskrivet med spänningen 3,6 V angiven",
      "Varje spänningssteg in och ut står i specifikationen",
      "Både USB-C och USB-A, så äldre kablar fungerar",
    ],
    cons: [
      "Max 87,5 W totalt, så två enheter samtidigt delar på mindre än utlovat",
      "20 000 mAh är minst i jämförelsen tillsammans med tre andra",
      "Vikten är okänd",
      "In via USB-C stannar på 65 W, alltså långsammare uppladdning än toppen",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "699 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "20 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "72 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "100 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "2 st", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Porttyper", value: "1× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, PD 3.0 upp till 100 W" },
      { label: "Max total effekt", value: "87,5 W" },
      { label: "Ineffekt", value: "Upp till 65 W via USB-C" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Artikelnummer", value: "89361" },
    ],
    verdict:
      "Linocell Premium 100 W rymmer 20 000 mAh och kostar 699 kronor. Det är den billigaste powerbanken här som verkligen laddar en bärbar dator.\n\n**Hundra watt ut via USB-C är gränsen där en powerbank slutar vara en telefonreserv** och börjar vara en strömkälla för arbete. De flesta bärbara datorer laddar i full fart vid den effekten, och det finns ingenting billigare i jämförelsen som klarar det.\n\nSpecifikationen är ovanligt noggrann. 20 000 mAh vid 3,6 volt ger 72 wattimmar, och varje enskilt spänningssteg in och ut står utskrivet, från 5 volt och 3 ampere upp till 20 volt och 5. Det gör att du kan kontrollera i förväg att just din dator får det den vill ha, i stället för att hoppas.\n\n**Två tal drar ner den.** Den totala effekten stannar på 87,5 watt trots att en enskild port kan ge 100, så laddar du dator och telefon samtidigt får datorn mindre än den skulle kunnat få. Och uppladdningen tar bara emot 65 watt, vilket gör att 20 000 mAh tar sin tid att fylla.\n\nSka du kunna ladda en dator utan att lägga över tusenlappen är det här köpet, och specifikationen låter dig kontrollera att den passar innan du beställer. Behöver du mer kapacitet för samma resa kostar Linocell 165 W 300 kronor mer och rymmer 38 procent mer.",
  },
  {
    id: "anker-prime-220w-20100",
    brand: "Anker",
    name: "Prime Powerbank 220 W PD 20 100 mAh",
    shortName: "Anker Prime 220 W",
    image: productImage(POWERBANK_20000.slug, "anker-prime-220w-20100"),
    tagline: "Enda produkten här som anger både wattimmar och vikt.",
    scores: {
      kapacitet: 3.5,
      /* 220 W total, 140 W per USB-C, 100 W in. */
      laddeffekt: 4.5,
      /* Enda i jämförelsen som anger både energi, mått OCH vikt. */
      redovisning: 5,
      /* 510 g är näst tyngst, men uppgiften finns åtminstone. */
      vikt: 2.5,
      prisvarde: 2,
    },
    price: 1990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-prime-powerbank-220w-pd-20100-mah-p88932",
    superlative: "Bäst för den som vill väga den",
    pros: [
      "72,36 wattimmar, mått och vikt står alla utskrivna",
      "220 W total uteffekt och 140 W per USB-C-port",
      "Laddas själv med upp till 100 W",
      "App via Bluetooth som visar status per port",
    ],
    cons: [
      "510 gram, näst tyngst i jämförelsen",
      "1 990 kronor för 20 100 mAh, alltså dyrast per milliamperetimme",
      "72,36 wattimmar är minst kapacitet av de dyra modellerna",
      "Ingen kabel sitter fast i enheten",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 990 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "20 100 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "72,36 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "220 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "3 st", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Porttyper", value: "2× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, upp till 140 W per USB-C" },
      { label: "Ineffekt", value: "Upp till 100 W via USB-C" },
      { label: "App", value: "Anker för iOS och Android via Bluetooth" },
      { label: "Mått", value: "147 × 50 × 44 mm" },
      { label: "Vikt", value: "510 g" },
      { label: "Artikelnummer", value: "88932" },
    ],
    verdict:
      "Anker Prime 220 W rymmer 20 100 mAh, väger 510 gram och kostar 1 990 kronor.\n\n**Den är den enda i jämförelsen där du får veta allt tre.** Energiinnehållet står till 72,36 wattimmar, måtten till 147 × 50 × 44 millimeter och vikten till 510 gram. I en produktkategori där vikten oftast saknas är det ovanligt, och det är just den uppgiften som avgör om något ska ligga i en datorväska varje dag.\n\n**220 watt total uteffekt och 140 watt per USB-C-port** räcker till en stor bärbar dator i full fart samtidigt som en telefon laddas. Den tar själv emot 100 watt, och appen visar status per port över Bluetooth.\n\n**Räkningen är ändå svår.** 1 990 kronor för 20 100 mAh gör den till den dyraste per milliamperetimme i hela jämförelsen, och de 510 grammen är näst tyngst. För 500 kronor mer får du systermodellen med 30 procent mer kapacitet och 300 watt, och för tusen kronor mindre får du Linocell 25 000 med mer ström och nästan lika hög effekt.\n\nDen som vill kunna väga och mäta produkten innan den läggs i väskan har bara ett val här, och det här är det. För alla andra är det svårt att motivera priset.",
  },
  {
    id: "ugreen-nexode-165w-20000",
    brand: "Ugreen",
    name: "Nexode powerbank 20 000 mAh 165 W med inbyggd kabel",
    shortName: "Ugreen Nexode 165 W",
    image: productImage(POWERBANK_20000.slug, "ugreen-nexode-165w-20000"),
    tagline: "Sju laddprotokoll och en kabel som sitter i.",
    scores: {
      kapacitet: 3.5,
      /* 165 W total, inbyggd 100 W-kabel på 65 cm, sju protokoll. */
      laddeffekt: 4,
      /* Anger vikt, mått, batterityp, display och samtliga protokoll, men
         inget energiinnehåll i wattimmar. */
      redovisning: 2.5,
      /* 535 g är tyngst i jämförelsen. */
      vikt: 1.5,
      prisvarde: 3,
    },
    price: 990,
    priceCheckedAt: PRICE_CHECKED,
    /* Flyttad från Kjell till Teknikdelar 2026-08-05. Samma artikel, samma
       pris, samma villkor — se filhuvudet. */
    merchant: "Teknikdelar",
    merchantUrl:
      "https://www.teknikdelar.se/produkt/ugreen-powerbank-pb726-20000mah-165w-gra",
    userRating: { value: 4, count: 2, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för kabeln som sitter i",
    pros: [
      "Inbyggd USB-C-kabel på 65 cm som klarar 100 W",
      "Sju laddprotokoll, alltså PD, QC, PPS, SCP, FCP, AFC och UFCS",
      "TFT-display som visar batteri, effekt och laddtid",
      "165 W total uteffekt",
    ],
    cons: [
      "535 gram, tyngst i jämförelsen",
      "Energiinnehållet i wattimmar är okänt, så flygfrågan går inte att svara på",
      "Två kundbetyg, alltså tunt underlag",
      "146 × 54 × 50 mm gör den klumpig i en full väska",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "990 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "20 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "Ej angiven", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "165 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "3 st", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Ja, USB-C 100 W, 65 cm", highlight: true },
      { label: "Porttyper", value: "1× USB-C 100 W in/ut, 1× USB-A 33 W, 1× inbyggd kabel" },
      { label: "Power Delivery", value: "Ja, PD 3.0, QC 4.0, PPS, SCP, FCP, AFC, UFCS" },
      { label: "Display", value: "TFT med batteri, effekt och laddtid" },
      { label: "Batterityp", value: "Litiumjon" },
      { label: "Mått", value: "146 × 54 × 50 mm" },
      { label: "Vikt", value: "535 g" },
      { label: "GTIN", value: "6941876269921" },
    ],
    verdict:
      "Ugreen Nexode rymmer 20 000 mAh, väger 535 gram och kostar 990 kronor. Den har en kabel som sitter fast och klarar hundra watt.\n\n**Den inbyggda kabeln är 65 centimeter och tar 100 watt**, vilket är ovanligt: de flesta fasta kablar är korta och effektsvaga. Här kan den ladda en bärbar dator på riktigt, och du slipper packa en separat sladd som klarar effekten. Till det kommer en USB-C-port och en USB-A, plus en TFT-display som visar batterinivå, effekt och beräknad laddtid.\n\n**Sju laddprotokoll är fler än något annat här.** PD, QC, PPS, SCP, FCP, AFC och UFCS betyder i praktiken att den snabbladdar nästan vilken telefon som helst, inklusive kinesiska märken som använder egna standarder.\n\n**Två saker väger emot, bokstavligen.** 535 gram är tyngst i jämförelsen, 135 gram mer än den lättaste, och måtten på 146 × 54 × 50 millimeter gör den kantig i en full väska. Och energiinnehållet i wattimmar går inte att läsa någonstans, vilket är den enda uppgift du behöver för att svara på om den får följa med i kabinen.\n\nLaddar du en dator och en telefon på tåget och vill slippa hålla reda på en tjock kabel är den värd sina pengar. Ska den flyga med dig är det obekvämt att inte kunna svara på frågan vid gaten, och då är Linocell 165 W både lättare att räkna på och 9 kronor billigare.",
  },
  {
    id: "xtorm-fuel-5-35w-20000",
    brand: "Xtorm",
    name: "Powerbank Fuel Series 5 35 W 20 000 mAh",
    shortName: "Xtorm Fuel Series 5",
    image: productImage(POWERBANK_20000.slug, "xtorm-fuel-5-35w-20000"),
    tagline: "400 gram, lättast av alla här.",
    scores: {
      kapacitet: 3.5,
      /* 35 W är lägst av de dyrare, räcker till telefon men inte till en
         dator i full fart. */
      laddeffekt: 2.5,
      /* ⚠️ Anger 100 Wh för 20 000 mAh, medan två andra produkter med samma
         nominella kapacitet anger 72 och 72,36. Uppgiften går inte att förena
         med resten av hyllan, och en köpare kan inte avgöra vilken som gäller
         inför en flygresa. */
      redovisning: 2,
      /* 400 g är lättast i jämförelsen. */
      vikt: 4,
      prisvarde: 3,
    },
    price: 769,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/xtorm-powerbank-fuel-series-5-35-w-20-000-mah-svart-p22599",
    superlative: "Bäst för lättaste packningen",
    pros: [
      "400 gram, lättast i jämförelsen",
      "Tre utgångar, alltså två USB-C och en USB-A",
      "Laddas själv på 3,5 timmar",
      "Höljet är gjort av återvunnen ABS och polykarbonat",
    ],
    cons: [
      "35 W räcker till en telefon men inte till en dator i full fart",
      "Det angivna energiinnehållet går inte att förena med andra 20 000 mAh-banker",
      "Inga kundbetyg alls",
      "143 × 80 × 28 mm är brett, även om det är lätt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "769 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "20 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "100 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "35 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "3 st", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Porttyper", value: "2× USB-C PD 35 W, 1× USB-A QC 3.0 18 W" },
      { label: "Laddningstid", value: "3,5 h" },
      { label: "Batterityp", value: "Litiumpolymer" },
      { label: "Material", value: "Återvunnen ABS och polykarbonat" },
      { label: "Mått", value: "143 × 80 × 28 mm" },
      { label: "Vikt", value: "400 g" },
      { label: "Artikelnummer", value: "22599" },
    ],
    verdict:
      "Xtorm Fuel Series 5 rymmer 20 000 mAh, väger 400 gram och kostar 769 kronor. Den är den lättaste powerbanken i jämförelsen.\n\n**135 gram lättare än den tyngsta här är en verklig skillnad** när något ska ligga i en ryggsäck en hel resdag, och det är den enskilt bästa anledningen att välja den. Tre utgångar räcker till telefon, hörlurar och en läsplatta samtidigt, den laddar sig själv på tre och en halv timme, och höljet är gjort av återvunnen plast.\n\n**35 watt är samtidigt dess gräns.** Det är gott om effekt för en telefon och en surfplatta, men för lite för att ladda en bärbar dator i den takt datorn drar ström. Ska en dator med i beräkningen är det inte den här du ska välja, och det är den vanligaste anledningen att köpa en powerbank i den här storleken.\n\nEtt tal till är värt att titta på innan du packar. Det angivna energiinnehållet är 100 wattimmar, medan två andra banker med samma nominella 20 000 milliamperetimmar anger 72 respektive 72,36. De två sistnämnda är förenliga med varandra. Den här är det inte, och skillnaden är 39 procent. Behöver du ett tal att luta dig mot vid en incheckningsdisk är det obekvämt att det ligger precis på gränsen 100.\n\nSka du bära den långt och bara ladda telefoner är den lätt och tillräcklig. Ska den ladda en dator eller flyga med dig finns bättre val, och Linocell Premium 100 W kostar 70 kronor mindre och laddar nästan tre gånger så snabbt.",
  },
  {
    id: "denver-225w-20000",
    brand: "Denver",
    name: "Fast Charge-powerbank med PD 22,5 W 20 000 mAh",
    shortName: "Denver 22,5 W",
    image: productImage(POWERBANK_20000.slug, "denver-225w-20000"),
    tagline: "349 kronor för 20 000 milliamperetimmar.",
    scores: {
      kapacitet: 3,
      /* 22,5 W lägst i jämförelsen, och micro-USB som ingång är förlegat. */
      laddeffekt: 1.5,
      /* Anger batterityp med spänning, mått och vikt, men inget
         energiinnehåll. */
      redovisning: 2.5,
      vikt: 2.5,
      /* Billigast med bred marginal. */
      prisvarde: 4.5,
    },
    price: 349,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/denver-fast-charge-powerbank-med-pd-225-w-20-000-mah-p80220",
    superlative: "Bäst för bilen och stugan",
    pros: [
      "349 kronor, mindre än hälften av näst billigaste",
      "20 000 mAh, samma kapacitet som banker för tre gånger priset",
      "Tre utgångar, alltså en USB-C och två USB-A",
      "Vikt, mått och batterityp med spänning står utskrivna",
    ],
    cons: [
      "22,5 W räcker inte till en bärbar dator",
      "Micro-USB som andra ingång är en förlegad kontakt",
      "Energiinnehållet i wattimmar är okänt",
      "460 gram utan att ge effekten som motiverar vikten",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "349 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "20 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "Ej angiven", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "22,5 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "3 st", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Porttyper", value: "1× USB-C, 2× USB-A" },
      { label: "Ineffekt", value: "USB-C och micro-USB upp till 12 V / 1,5 A" },
      { label: "Batterityp", value: "Litiumpolymer, 3,7 V" },
      { label: "Mått", value: "138 × 29 × 70 mm" },
      { label: "Vikt", value: "460 g" },
      { label: "Artikelnummer", value: "80220" },
    ],
    verdict:
      "Denver Fast Charge rymmer 20 000 mAh och kostar 349 kronor. Det är mindre än hälften av den näst billigaste i jämförelsen.\n\n**Kapaciteten är densamma som hos banker för tre gånger priset.** 20 000 milliamperetimmar räcker till ungefär fyra telefonladdningar, och tre utgångar gör att hela familjen kan ladda samtidigt på en campingplats. Att batteritypen anges med spänningen 3,7 volt utsatt, plus vikt och mått, är dessutom mer öppenhet än flera dyrare produkter ger.\n\n**Effekten är där pengarna sparats.** 22,5 watt är lägst i jämförelsen och räcker till telefoner och surfplattor men inte till en bärbar dator. Micro-USB som andra ingång hör dessutom till en generation som håller på att försvinna, och den som laddar banken den vägen får vänta länge.\n\nDe 460 grammen är svåra att motivera när effekten inte följer med. Du bär nästan lika mycket som den tyngsta produkten här och får en bråkdel av farten.\n\nSka den ligga i bilen, i sommarstugan eller i en låda på landet där ingen har bråttom är den rätt köp och priset omöjligt att argumentera emot. Ska du ladda en dator eller resa med den är den fel produkt oavsett vad den kostar, och då börjar de riktiga alternativen på 699 kronor.",
  },
];

export const POWERBANK_20000_PRODUCTS = resolveProducts(POWERBANK_20000, SEEDS);

/**
 * Tittade på, valde bort.
 *
 * `reason` är undantagen från källpratsregeln, se skillen `swedish-voice`.
 */
export const POWERBANK_20000_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Linocell",
    name: "Premium Powerbank 65 W 20000 mAh",
    approxPrice: 699,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-premium-powerbank-65-w-20000-mah-p80199",
    reason:
      "Samma kapacitet, samma 72 wattimmar, samma pris och samma märke som den 100 W-modell vi rankar, men med 65 watt i stället för 100. Två poster som bara skiljer sig på en rad hjälper ingen som väljer, och den dyrare effekten kostar ingenting extra. Den har fler kundbetyg, 72 mot 35, så den som hellre går på underlag än på effekt kan mena att den är det tryggare köpet.",
  },
  {
    brand: "Anker",
    name: "Prime Powerbank 250 W PD 3.1 27 650 mAh",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-prime-powerbank-250-w-pd-3.1-27650-mah-p20643",
    reason:
      "Den största Anker Prime-modellen, med 27 650 milliamperetimmar. Vi rankar 300 W-versionen i stället eftersom den har fler kundbetyg och ett publicerat energiinnehåll vi kunnat läsa. Den här är värd att titta på om du vill ha maximal kapacitet från Anker, men kontrollera wattimmarna innan du bokar en flygresa: 27 650 milliamperetimmar ligger i det spann där hundragränsen avgörs av cellspänningen.",
  },
  {
    brand: "SHARGE",
    name: "Shargeek 170 powerbank 24 000 mAh",
    approxPrice: 1599,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/sharge-shargeek-170-powerbank-p60180",
    reason:
      "170 watt ur två USB-C och en USB-A, 24 000 milliamperetimmar och ett genomskinligt hölje som visar elektroniken. Den är den mest särpräglade produkten i hyllan och har en egen skara anhängare. Vi rankar den inte eftersom priset på 1 599 kronor ligger mellan två produkter som båda ger mer ström per krona, och eftersom designen är själva skälet att köpa den snarare än något vi kan väga.",
  },
  {
    brand: "Xtorm",
    name: "Rugged XR202 Xtreme powerbank 20 000 mAh",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/xtorm-rugged-xr202-xtreme-powerbank-20000-mah-p22597",
    reason:
      "Stöttålig och väderskyddad variant för utomhusbruk, vilket är ett annat köp än de övriga här. Den som ska ha en powerbank i en kajak eller på ett fjällpass ska titta på den och inte på våra rankade, men då är det tåligheten som ska jämföras och inte effekten, och det kräver en egen genomgång av kapslingsklasser som vi inte gjort.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const POWERBANK_20000_FAQ = [
  {
    question: "Hur stor powerbank får jag ta med på flyget?",
    answer:
      "Upp till 100 wattimmar utan att fråga, och bara i handbagaget. Transportstyrelsen anger att lösa litiumjonbatterier inklusive powerbanks upp till 100 wattimmar får tas med i kabinen men aldrig checkas in. Mellan 100 och 160 wattimmar krävs flygbolagets godkännande och du får ha högst två. Över 160 wattimmar är de förbjudna. I den här storleksklassen är gränsen verkligt nära: en powerbank på 20 000 milliamperetimmar landar runt 72 wattimmar, medan 27 600 ger 99,36 och alltså ligger 0,64 wattimmar under taket. Kontrollera talet på produkten innan du packar, och kom ihåg att regeln om incheckat bagage gäller alla storlekar.",
  },
  {
    question: "Varför anger två powerbanks med samma mAh olika wattimmar?",
    answer:
      "Därför att wattimmar beror på både kapaciteten och cellspänningen, och den senare varierar. Räkningen är kapaciteten i amperetimmar gånger spänningen, så 20 000 milliamperetimmar vid 3,6 volt ger 72 wattimmar medan samma kapacitet vid 3,7 volt ger 74. Skillnader i den storleksordningen är normala. I vår jämförelse finns dock ett större hopp: tre powerbanks med 20 000 respektive 20 100 milliamperetimmar anger 72, 72,36 och 100 wattimmar. De två första går att förena med varandra, den tredje inte. Vi återger vad som står och räknar aldrig om åt någon, men behöver du ett tal inför en flygresa är det värt att kontrollera det mot tillverkarens egen sida.",
  },
  {
    question: "Kan en powerbank ladda en bärbar dator?",
    answer:
      "Ja, om effekten räcker, och det är där de flesta faller. En vanlig bärbar dator vill ha mellan 45 och 100 watt, och en stor med kraftigt grafikkort ännu mer. En powerbank med 22,5 eller 35 watt laddar datorn långsammare än den drar ström när den används, alltså tappar batteriet ändå. Från ungefär 65 watt börjar det fungera, och vid 100 watt eller mer laddar de flesta datorer i full fart. Kontrollera två saker: att powerbanken anger USB Power Delivery, och att den totala uteffekten inte är lägre än vad en enskild port lovar. Flera produkter anger 100 watt på en port men en lägre total effekt när något annat laddas samtidigt.",
  },
  {
    question: "Hur många telefonladdningar ger 20 000 mAh?",
    answer:
      "Ungefär fyra. Kapacitetstalet gäller cellen vid dess egen spänning omkring 3,6 till 3,7 volt, medan telefonen laddas vid 5 volt eller mer, och omvandlingen mellan de två kostar energi som försvinner i värme. Kvar blir typiskt 60 till 70 procent av det nominella talet, vilket för en normal telefon med 4 000 till 5 000 milliamperetimmar batteri blir tre till fyra fulla laddningar. Ett labb som mätt uttagbar energi på den här storleksklassen fann mellan 58 och 70 wattimmar där de nominella talen antyder mer, vilket stämmer med samma resonemang.",
  },
  {
    question: "Hur lång tid tar det att ladda en powerbank på 20 000 mAh?",
    answer:
      "Mellan under en timme och en hel kväll, beroende på hur mycket effekt den tar emot. Det här är den siffra som glöms bort mest. En powerbank som laddas med 18 watt behöver runt tio timmar för 20 000 milliamperetimmar, medan en som tar emot 100 watt klarar det på ett par timmar och de snabbaste med 250 watt är fulla på under en timme. Kontrollera ineffekten och inte bara uteffekten när du jämför. Tänk också på att du behöver en väggladdare som klarar samma effekt: en powerbank som kan ta emot 250 watt laddas inte snabbare än den laddare du kopplar in den i.",
  },
  {
    question: "Vad väger en powerbank på 20 000 mAh?",
    answer:
      "Mellan 400 och 535 gram i vår jämförelse, alltså mellan en och en och en halv telefon extra i packningen. Skillnaden på 135 gram mellan den lättaste och den tyngsta märks tydligt över en hel resdag, och den följer inte kapaciteten särskilt väl: den tyngsta här har samma 20 000 milliamperetimmar som den lättaste. Vikten är också den uppgift som oftast saknas i butiken, och den går inte att gissa sig till. Ska powerbanken bäras varje dag är det värt att leta reda på talet innan du beställer, och att välja bort en produkt där det inte går att hitta.",
  },
  {
    question: "Får jag använda powerbanken under flygningen?",
    answer:
      "Det bestämmer flygbolaget, och flera har skärpt sina regler. Grundregeln från Transportstyrelsen gäller vad du får ta med ombord, inte vad du får göra med det under resan, och där har bolagen egna villkor som skiljer sig åt. Flera bolag har infört begränsningar för att ladda från powerbank i kabinen, och en del vill att den förvaras så att den är synlig i stället för i bagagehyllan. Kontrollera ditt eget bolags aktuella villkor före avresa, eftersom det här är den del av regelverket som ändrats mest de senaste åren. Ta också med powerbanken i handbagaget oavsett, eftersom den aldrig får checkas in.",
  },
  {
    question: "Vad kostar en bra powerbank på 20 000 mAh?",
    answer:
      "Räkna med 700 till 1 000 kronor om den ska ladda en dator. Under 400 kronor får du kapaciteten men inte effekten, alltså en produkt som laddar telefoner utmärkt och datorer knappt alls. Runt 700 kronor kommer du åt 100 watt, vilket räcker till de flesta bärbara datorer. Vid ungefär 1 000 kronor får du antingen större kapacitet, upp mot den gräns flyget tillåter, eller en inbyggd kabel som klarar full effekt. Över 2 000 kronor betalar du främst för laddfart i andra riktningen, alltså för att powerbanken själv ska bli full på en timme i stället för tre.",
  },
];
