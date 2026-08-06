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
 * Priser, artikelnummer och kundbetyg är lästa hos Kjell på PRICE_CHECKED.
 * Specifikationer är lästa hos butiken och hos tillverkaren, se
 * .agent/research/powerbank-20000.md för vilken uppgift som kom varifrån.
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
 * ## ⚠️ Kriteriet Öppen redovisning är borttaget 2026-08-06
 *
 * Det vägde 15 och betygsatte om uppgifterna gick att hitta och förena. Varje
 * ingång i det — energiinnehåll, effekt per port, vikt, mått — vägs redan av
 * ett annat kriterium, och resten mätte vår egen research. Vikten är omfördelad
 * proportionellt: kapacitet 35, laddeffekt 29, vikt 18, prisvärde 18.
 *
 * Samma runda fyllde de fem celler som stod tomma. Tre vikter och ett
 * energiinnehåll gick att få fram, och det räknade om hela viktkriteriet.
 * Vinnaren bytte därmed från Linocell 165 W till Linocell 25 000. Se
 * lib/corrections.ts 2026-08-06.
 *
 * ## Här publiceras wattimmen, och det är själva poängen
 *
 * Taket på 100 Wh är bara i sikte i den här storleken. Två produkter ligger
 * inom en wattimme under gränsen:
 *
 * - Anker Prime 26 250 mAh: **99,75 Wh**
 * - Linocell 27 600 mAh: **99,36 Wh**
 *
 * ## ⚠️ Xtorms 100 Wh är butikens uppgift och står kvar som streck
 *
 * Kjell anger "20 000 mAh (100 Wh)" för Xtorm Fuel Series 5. Xtorm publicerar
 * inget energiinnehåll alls på sin egen produktsida, i sin specifikationstabell
 * eller i manualen till FS5201, utan skriver bara att produkten är godkänd att
 * flyga med. Ett påstående om tillverkaren går inte att fastställa hos en
 * butik, och talet är dessutom inte förenligt med de tre andra produkterna på
 * 20 000 mAh som alla ligger på 72 Wh.
 *
 * Cellen är därför ett streck, inte 100 Wh och inte 72. En uppgift bärs aldrig
 * över mellan modeller. Konflikten ligger i .agent/research/powerbank-20000.md
 * och står inte i läsartexten, eftersom den handlar om vad en källa skrivit och
 * inte om vad produkten gör.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte laddat ur en enda powerbank. Stiftung Warentest mätte uttagbar
 * energi till 58,3 till 69,9 Wh för den här storleksklassen, men resultaten per
 * modell ligger bakom betalvägg och knyts inte till någon produkt här.
 *
 * ## Identiteter, för matchning vid nästa runda
 *
 * Modell- och streckkoder står här och inte som specifikationsrader. De
 * identifierar artikeln men jämför ingenting, och som rader blev de fyra
 * halvfyllda kolumner i tabellen.
 *
 * | Produkt | Modell | GTIN | Butikens artikelnummer |
 * |---|---|---|---|
 * | Anker Prime 300 W | A110AH11 | — | Kjell 88933 |
 * | Anker Prime 220 W | A110B | — | Kjell 88932 |
 * | Ugreen Nexode 165 W | PB726 | 6941876269921 | Teknikdelar |
 * | Xtorm Fuel Series 5 | FS5201 | 8718182277593 | Kjell 22599 |
 * | Denver 22,5 W | PQC-20009 | 5706751092893 | Kjell 80220 |
 *
 * Ankers modellnummer skiljer sig mellan marknader: Kjell trycker A110AH11 på
 * 300 W-modellen medan Ankers egen supportartikel heter A110A. Samma artikel.
 * De tre Linocell-modellerna är Kjells eget varumärke och har bara
 * artikelnummer, 89035, 88996 och 89361.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "linocell-25000",
    brand: "Linocell",
    name: "Powerbank 25 000 mAh",
    shortName: "Linocell 25 000",
    image: productImage(POWERBANK_20000.slug, "linocell-25000"),
    tagline: "140 watt till datorn, och 117 gram lättare än den största här.",
    scores: {
      /* 25 000 mAh och 90 Wh. */
      kapacitet: 4.5,
      /* 140 W ur USB-C 2, 145 W över de två USB-C-portarna, 120 W med allt
         inkopplat, 100 W in, full på 2 h. */
      laddeffekt: 4,
      /* 508 g enligt Kjells eget specifikationsblock. Platt: 27 mm tjock mot
         51 hos Linocell 165 W. */
      vikt: 3.5,
      prisvarde: 4.5,
    },
    price: 999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-powerbank-25-000-mah-p89035",
    userRating: { value: 4.5, count: 133, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för datorväskan varje dag",
    pros: [
      "140 W ur en USB-C-port, alltså full fart till en stor bärbar dator",
      "25 000 mAh räcker till en dator plus telefon över en lång resdag",
      "508 gram och 27 millimeter tjock, alltså platt nog för en datorficka",
      "Full på 2 timmar med en 100 W-laddare",
      "133 kundbetyg på 4,5, det bredaste underlaget i jämförelsen",
    ],
    cons: [
      "120 W med allt inkopplat, alltså mindre till datorn när telefonen laddas samtidigt",
      "Ingen kabel sitter fast i enheten, så en 140 W-kabel måste med i väskan",
      "90 wattimmar mot 99,36 hos Linocell 165 W, som kostar exakt lika mycket",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "999 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "25 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "90 Wh", highlight: true },
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "120 W", highlight: true },
      { label: "Effekt per port", shortLabel: "Per port", value: "140 W", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "508 g", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "2 h", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Antal portar", value: "3 st" },
      { label: "Porttyper", value: "2× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, upp till 140 W ur USB-C 2" },
      { label: "Ineffekt", value: "Upp till 100 W" },
      { label: "Display", value: "Ja, visar batterikapacitet i procent" },
      { label: "App", value: "Nej" },
      { label: "Batteri", value: "5× 5 000 mAh litiumpolymer, 3,6 V" },
      { label: "Mått", value: "160 × 82 × 27 mm" },
      { label: "Artikelnummer", value: "89035" },
    ],
    verdict:
      "Linocell 25 000 mAh kostar 999 kronor, väger 508 gram och ger 140 watt ur en enda USB-C-port. Det räcker till en stor bärbar dator på full laddfart.\n\n**Den är 27 millimeter tjock, och det är det som gör den till en vardagsprodukt.** De flesta powerbanks i den här effektklassen är kloss­formade tegelstenar på 44 till 51 millimeter som ligger och bråkar med datorn i väskan. Den här är platt och bred i stället, glider ner bredvid laptopen och väger 117 gram mindre än den största här.\n\n**25 000 milliamperetimmar och 90 wattimmar tar dig genom en resdag med marginal**, alltså en full datorladdning plus telefonen flera gånger om. Uppladdningen tar 2 timmar med en 100 W-laddare, så den hinner bli full över en middag och inte över en natt. Fem battericeller på 5 000 mAh vardera driver det hela.\n\nDen totala effekten stannar på 120 watt när allt är inkopplat samtidigt, trots att en ensam port ger 140. Laddar du dator och telefon på samma gång får datorn alltså mindre än den skulle kunnat få, och du behöver en egen kabel som klarar effekten.\n\nKöp den. Du får den kombination av kapacitet, effekt och format som faktiskt följer med i en datorväska varje dag, och 133 personer har redan kört den i ett år.",
  },
  {
    id: "linocell-165w-27600",
    brand: "Linocell",
    name: "Powerbank 165 W PD 27 600 mAh",
    shortName: "Linocell 165 W",
    image: productImage(POWERBANK_20000.slug, "linocell-165w-27600"),
    tagline: "99,36 wattimmar, alltså så nära flyggränsen man kommer.",
    scores: {
      /* Störst kapacitet i jämförelsen och 99,36 Wh, alltså 0,64 wattimmar
         under taket. */
      kapacitet: 5,
      /* 165 W totalt, 140 W per USB-C-port, inbyggd kabel, 100 W in,
         2,5 h uppladdning. */
      laddeffekt: 4,
      /* 625,1 g, tyngst. 161 × 59 × 51 mm ger 484 cm³, mest utrymmeskrävande.
         Rättat 2026-08-05: vikten stod i Kjells eget specifikationsblock hela
         tiden, som brödtext och inte som tabell. Vi läste efter en tabell. */
      vikt: 1.5,
      /* 999 kr för nära maximal tillåten kapacitet. */
      prisvarde: 4.5,
    },
    price: 999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-powerbank-165-w-pd-27-600-mah-p88996",
    userRating: { value: 5, count: 1, scale: 5, checkedAt: PRICE_CHECKED },
    award: "editor",
    superlative: "Bäst för längsta resan",
    pros: [
      "27 600 mAh, störst kapacitet i jämförelsen",
      "99,36 wattimmar, alltså 0,64 under gränsen för handbagage",
      "165 W totalt och 140 W ur en port, alltså dator och telefon på full fart",
      "Inbyggd USB-C-kabel plus en USB-C-port och en USB-A",
      "Upp till sex mobilladdningar",
    ],
    cons: [
      "625 gram, alltså den tyngsta här och märkbar i en jackficka",
      "51 millimeter tjock, alltså en kloss bredvid datorn i väskan",
      "99,36 wattimmar lämnar ingen marginal om ett flygbolag räknar annorlunda",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "999 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "27 600 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "99,36 Wh", highlight: true },
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "165 W", highlight: true },
      { label: "Effekt per port", shortLabel: "Per port", value: "140 W", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "625,1 g", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "2,5 h", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Ja, USB-C", highlight: true },
      { label: "Antal portar", value: "3 st" },
      { label: "Porttyper", value: "1× USB-C in/ut, 1× inbyggd USB-C-kabel in/ut, 1× USB-A ut" },
      { label: "Power Delivery", value: "Ja, PD 3.0 och PD 3.1, upp till 140 W per USB-C" },
      { label: "Ineffekt", value: "Upp till 100 W" },
      { label: "Display", value: "TFT med portstatus, batterinivå, effekt och återstående tid" },
      { label: "App", value: "Nej" },
      { label: "Batteri", value: "6× 4 600 mAh litium" },
      { label: "Mobilladdningar", value: "Upp till ca 6" },
      { label: "Mått", value: "161 × 59 × 51 mm" },
      { label: "Artikelnummer", value: "88996" },
    ],
    verdict:
      "Linocell 165 W rymmer 27 600 mAh och kostar 999 kronor. Det är den största powerbanken i jämförelsen, och den ligger 0,64 wattimmar under gränsen för vad du får ta med ombord.\n\n**99,36 wattimmar är inte ett slumptal.** Taket för handbagage utan flygbolagets godkännande går vid 100, och den här produkten är byggd för att rymmas precis under. Du får alltså maximal kapacitet som fortfarande är fri att ta med, och den räcker till ungefär sex mobilladdningar eller en dator plus en telefon över en lång resdag.\n\n**165 watt totalt och 140 ur en enda port gör den till en riktig datorladdare**, inte bara en telefonreserv, och den inbyggda USB-C-kabeln betyder att du klarar dig utan lös sladd. Till det kommer en USB-C-port och en USB-A, så tre saker kan laddas samtidigt, och med 100 watt in är den full igen på två och en halv timme.\n\nDu betalar för det med format. 625 gram är tyngst här, 51 millimeter är tjockast, och tillsammans gör det den till en kloss som märks både i väskan och i jackfickan.\n\nFlyger du och vill ha största möjliga reserv är valet redan gjort: mer än så här får inte följa med ombord utan flygbolagets tillstånd.",
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
      /* 300 W totalt, 140 W per USB-C-port med PD 3.1, 250 W in,
         full på en timme. Överlägset snabbast. */
      laddeffekt: 5,
      /* 600 g enligt Kjells eget specifikationsblock, näst tyngst.
         159,9 × 38 × 62,7 mm. Fylld 2026-08-06. */
      vikt: 2,
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
      "Laddas själv med upp till 250 W och är full på en timme",
      "99,75 wattimmar, alltså strax under gränsen för handbagage",
      "App via Bluetooth som visar status per port",
    ],
    cons: [
      "2 490 kronor, två och en halv gånger vinnarens pris",
      "600 gram, näst tyngst i jämförelsen",
      "250 W uppladdning kräver en laddare de flesta inte äger",
      "99,75 wattimmar lämnar bara en fjärdedels wattimme till gränsen",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 490 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "26 250 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "99,75 Wh", highlight: true },
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "300 W", highlight: true },
      { label: "Effekt per port", shortLabel: "Per port", value: "140 W", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "600 g", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "1 h", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Antal portar", value: "3 st" },
      { label: "Porttyper", value: "2× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, PD 3.1 upp till 140 W och 28 V / 5 A" },
      { label: "Ineffekt", value: "Upp till 250 W via båda USB-C-portarna" },
      { label: "Display", value: "Smart display med status per port" },
      { label: "App", value: "Anker för iOS och Android via Bluetooth" },
      { label: "Mått", value: "159,9 × 38 × 62,7 mm" },
      { label: "Artikelnummer", value: "88933" },
    ],
    verdict:
      "Anker Prime 300 W rymmer 26 250 mAh, väger 600 gram och kostar 2 490 kronor. Den laddar snabbare än allt annat i jämförelsen, åt båda hållen.\n\n**300 watt totalt och 140 watt per USB-C-port** betyder att den håller en stor bärbar dator på full laddfart medan den samtidigt driver en telefon och en surfplatta. PD 3.1 med 28 volt och 5 ampere är den nyaste generationen av standarden, och den finns inte i något annat här.\n\n**Uppladdningen är det som verkligen skiljer.** Upp till 250 watt in gör en tom bank på 26 250 mAh full igen på en timme, mot två till tre och en halv för resten. På en resa där du laddar på hotellet mellan två dagar är det skillnaden mellan att hinna och att inte hinna. Energiinnehållet ligger på 99,75 wattimmar, alltså en fjärdedels wattimme under gränsen för handbagage, och appen visar status per port över Bluetooth.\n\n**Priset är invändningen och den är stor.** 2 490 kronor är två och en halv gånger vad vinnaren kostar för nästan samma kapacitet, och de 250 watten in kräver en laddare de flesta inte äger, så en del av det du betalar för blir liggande.\n\nLaddar du två datorer på resande fot och tycker att en timmes laddtid är värd pengarna är den värd sitt pris. Ska den bara hålla en dator och en telefon igång gör Linocell 25 000 samma sak för 1 491 kronor mindre.",
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
      /* 100 W PD ut via USB-C, men max 87,5 W totalt. 65 W in, ca 2 h. */
      laddeffekt: 3.5,
      /* 492 g enligt Kjells eget specifikationsblock, tredje lättast.
         159 × 53 × 35 mm ger 295 cm³. Fylld 2026-08-06. */
      vikt: 4,
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
      "492 gram, alltså tredje lättast trots att den laddar en dator",
      "72 wattimmar räcker till ungefär en full datorladdning",
      "Färgdisplay som visar nivå, spänning och ström i realtid",
      "Både USB-C och USB-A, så äldre kablar fungerar",
    ],
    cons: [
      "Max 87,5 W totalt, så två enheter samtidigt delar på mindre än utlovat",
      "20 000 mAh är minst i jämförelsen tillsammans med tre andra",
      "In via USB-C stannar på 65 W, alltså långsammare påfyllning än toppen",
      "Bara två portar, så en tredje enhet får vänta",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "699 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "20 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "72 Wh", highlight: true },
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "87,5 W", highlight: true },
      { label: "Effekt per port", shortLabel: "Per port", value: "100 W", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "492 g", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "2 h", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Antal portar", value: "2 st" },
      { label: "Porttyper", value: "1× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, PD 3.0 upp till 100 W" },
      { label: "Ineffekt", value: "Upp till 65 W via USB-C" },
      { label: "Display", value: "TFT-färgdisplay med nivå, spänning och ström" },
      { label: "App", value: "Nej" },
      { label: "Batteri", value: "Litium, 3,6 V" },
      { label: "Mått", value: "159 × 53 × 35 mm" },
      { label: "Artikelnummer", value: "89361" },
    ],
    verdict:
      "Linocell Premium 100 W rymmer 20 000 mAh, väger 492 gram och kostar 699 kronor. Det är den billigaste powerbanken här som verkligen laddar en bärbar dator.\n\n**Hundra watt ut via USB-C är gränsen där en powerbank slutar vara en telefonreserv** och börjar vara en strömkälla för arbete. De flesta bärbara datorer laddar i full fart vid den effekten, och det finns ingenting billigare i jämförelsen som klarar det. De 72 wattimmarna räcker till ungefär en full datorladdning, alltså en extra arbetsdag utan vägguttag.\n\n**492 gram är dessutom lätt för klassen.** Bara Xtorm och Denver väger mindre, och båda de två stannar långt under hundra watt. Färgdisplayen visar nivå, spänning och ström i realtid, vilket är enda sättet att se om det är kabeln eller banken som bromsar.\n\n**Två tal drar ner den.** Den totala effekten stannar på 87,5 watt trots att den ensamma porten ger 100, så laddar du dator och telefon samtidigt får datorn mindre än den kunde fått. Och den tar bara emot 65 watt, så påfyllningen tar två timmar mot en hos de dyra.\n\nSka du kunna ladda en dator utan att lägga över tusenlappen är det här köpet. Behöver du mer än en datorladdning på samma dag räcker inte 72 wattimmar, och då kostar Linocell 25 000 tre hundralappar till.",
  },
  {
    id: "anker-prime-220w-20100",
    brand: "Anker",
    name: "Prime Powerbank 220 W PD 20 100 mAh",
    shortName: "Anker Prime 220 W",
    image: productImage(POWERBANK_20000.slug, "anker-prime-220w-20100"),
    tagline: "140 watt per port i det nättaste paketet, fullt på en timme.",
    scores: {
      kapacitet: 3.5,
      /* 220 W totalt, 140 W per USB-C, 100 W in, full på en timme. */
      laddeffekt: 4.5,
      /* 510 g. 147 × 50 × 44 mm ger 323 cm³, minst av dem som ger 140 W per
         port. */
      vikt: 3.5,
      prisvarde: 2,
    },
    price: 1990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-prime-powerbank-220w-pd-20100-mah-p88932",
    superlative: "Minst med full datorfart",
    pros: [
      "140 W per USB-C-port och 220 W totalt",
      "323 kubikcentimeter, minst av dem som ger 140 W ur en port",
      "Full på en timme med en 100 W-laddare",
      "App via Bluetooth som visar status per port",
      "Laddkabel för 240 W och fodral ingår",
    ],
    cons: [
      "1 990 kronor för 20 100 mAh, alltså dyrast per milliamperetimme",
      "72,36 wattimmar, alltså minst kapacitet av de dyra modellerna",
      "510 gram trots att kapaciteten är den minsta i klassen",
      "Ingen kabel sitter fast i enheten",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 990 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "20 100 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "72,36 Wh", highlight: true },
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "220 W", highlight: true },
      { label: "Effekt per port", shortLabel: "Per port", value: "140 W", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "510 g", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "1 h", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Antal portar", value: "3 st" },
      { label: "Porttyper", value: "2× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, upp till 140 W per USB-C" },
      { label: "Ineffekt", value: "Upp till 100 W via USB-C" },
      { label: "Display", value: "Smart display med status per port" },
      { label: "App", value: "Anker för iOS och Android via Bluetooth" },
      { label: "Mått", value: "147 × 50 × 44 mm" },
      { label: "Artikelnummer", value: "88932" },
    ],
    verdict:
      "Anker Prime 220 W rymmer 20 100 mAh, väger 510 gram och kostar 1 990 kronor. Den ger 140 watt ur en enda port i det minsta paketet i den effektklassen.\n\n**323 kubikcentimeter är det som skiljer den från de andra som laddar en dator på full fart.** Linocell 165 W tar 484 och Anker Prime 300 W tar 381 för samma 140 watt per port. Är det plats och inte gram som är problemet i din väska är det här den som passar in.\n\n**220 watt totalt räcker till en stor dator och en telefon samtidigt**, och med 100 watt in är den själv full på en timme. Appen visar status per port över Bluetooth, och i kartongen ligger både en kabel för 240 watt och ett fodral, vilket är ovanligt i klassen.\n\n**Räkningen är ändå svår.** 1 990 kronor för 20 100 mAh gör den till den dyraste per milliamperetimme i hela jämförelsen, och 72,36 wattimmar är minst av de dyra modellerna: full laddning ger ungefär 11 250 mAh ut i praktiken.\n\nFör 500 kronor mer får du systermodellen med 30 procent mer kapacitet och 300 watt, och för tusen kronor mindre får du Linocell 25 000 med mer ström och nästan lika hög effekt. Köp den här bara om formatet är det som avgör.",
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
      /* 35 W per USB-C-port är lägst av de dyrare, räcker till telefon men
         inte till en dator i full fart. 3,5 h uppladdning, längst här. */
      laddeffekt: 2.5,
      /* 400 g är lättast i jämförelsen. 143 × 80 × 28 mm ger 320 cm³. */
      vikt: 5,
      prisvarde: 3,
    },
    price: 769,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/xtorm-powerbank-fuel-series-5-35-w-20-000-mah-svart-p22599",
    superlative: "Bäst för lättaste packningen",
    pros: [
      "400 gram, lättast i jämförelsen med 60 grams marginal",
      "28 millimeter tunn, alltså platt mot ryggen i en ryggsäck",
      "Tre utgångar, alltså två USB-C och en USB-A",
      "Höljet är gjort av återvunnen ABS och polykarbonat",
    ],
    cons: [
      "35 W räcker till en telefon men inte till en dator i full fart",
      "3,5 timmar att fylla, alltså längst uppladdning i jämförelsen",
      "Inga kundbetyg alls",
      "80 millimeter bred, alltså klumpigare än vikten antyder",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "769 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "20 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "Ej angiven", highlight: true },
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "Ej angiven", highlight: true },
      { label: "Effekt per port", shortLabel: "Per port", value: "35 W", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "400 g", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "3,5 h", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Antal portar", value: "3 st" },
      { label: "Porttyper", value: "2× USB-C PD 35 W, 1× USB-A QC 3.0 18 W" },
      { label: "Power Delivery", value: "Ja, upp till 35 W per USB-C" },
      { label: "Ineffekt", value: "Ej angiven" },
      { label: "Display", value: "Digital display med batterinivå i procent" },
      { label: "App", value: "Nej" },
      { label: "Batteri", value: "Litiumpolymer, 2 celler" },
      { label: "Material", value: "Återvunnen ABS och polykarbonat" },
      { label: "Mått", value: "143 × 80 × 28 mm" },
      { label: "Artikelnummer", value: "22599" },
    ],
    verdict:
      "Xtorm Fuel Series 5 rymmer 20 000 mAh, väger 400 gram och kostar 769 kronor. Den är den lättaste powerbanken i jämförelsen med god marginal.\n\n**60 gram lättare än den näst lättaste är en verklig skillnad** när något ska ligga i en ryggsäck en hel resdag, och mot den tyngsta här är avståndet 225 gram, alltså mer än en telefon. Med 28 millimeter ligger den dessutom platt mot ryggen i stället för att bulta. Tre utgångar räcker till telefon, hörlurar och en läsplatta samtidigt, och höljet är gjort av återvunnen plast.\n\n**35 watt är samtidigt dess gräns.** Det är gott om effekt för en telefon och en surfplatta, men för lite för att ladda en bärbar dator i den takt datorn drar ström när den används. Ska en dator med i beräkningen är det inte den här du ska välja, och det är den vanligaste anledningen att köpa den här storleken.\n\nDen är också långsammast att fylla själv: 3,5 timmar mot en timme för de snabbaste. Ska den vara full till morgonen behöver den stå på laddning hela kvällen, och 80 millimeters bredd gör den klumpigare i en sidoficka än de 400 grammen antyder.\n\nKöp den inte till datorn. Till en ryggsäck med telefoner, hörlurar och en läsplatta är den däremot den lättaste vägen till 20 000 milliamperetimmar som finns här, och det märks efter en dag i backen.",
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
      /* 165 W totalt, inbyggd 100 W-kabel på 65 cm, sju protokoll, full på
         under 2 h. */
      laddeffekt: 4,
      /* 535 g är tyngst av dem under 600 gram. 146 × 54 × 50 mm ger 394 cm³. */
      vikt: 2.5,
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
      "165 W totalt, alltså dator på 100 W och telefon på 65 samtidigt",
      "21700-celler som behåller över 70 procent efter 1 000 laddcykler",
    ],
    cons: [
      "535 gram, tyngst av dem som väger under 600",
      "72 wattimmar för 990 kronor, alltså samma energi som en för 699",
      "Två kundbetyg, alltså tunt underlag",
      "146 × 54 × 50 mm gör den klumpig i en full väska",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "990 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "20 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "72 Wh", highlight: true },
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "165 W", highlight: true },
      { label: "Effekt per port", shortLabel: "Per port", value: "100 W", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "535 g", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "Under 2 h", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Ja, USB-C 100 W, 65 cm", highlight: true },
      { label: "Antal portar", value: "3 st" },
      { label: "Porttyper", value: "1× USB-C 100 W in/ut, 1× USB-A 33 W, 1× inbyggd kabel" },
      { label: "Power Delivery", value: "Ja, PD 3.0, QC 4.0, PPS, SCP, FCP, AFC, UFCS" },
      { label: "Ineffekt", value: "Upp till 100 W via USB-C" },
      { label: "Display", value: "TFT med batteri, effekt och laddtid" },
      { label: "App", value: "Nej" },
      { label: "Batteri", value: "4× 21700 litiumjon, 3,6 V, 14,4 V totalt" },
      { label: "Mått", value: "146 × 54 × 50 mm" },
    ],
    verdict:
      "Ugreen Nexode rymmer 20 000 mAh, väger 535 gram och kostar 990 kronor. Den har en kabel som sitter fast och klarar hundra watt.\n\n**Den inbyggda kabeln är 65 centimeter och tar 100 watt**, vilket är ovanligt: de flesta fasta kablar är korta och effektsvaga. Här kan den ladda en bärbar dator på riktigt, och du slipper packa en separat sladd som klarar effekten. Till det kommer en USB-C-port och en USB-A, plus en TFT-display som visar batterinivå, effekt och beräknad laddtid.\n\n**Sju laddprotokoll är fler än något annat här.** PD, QC, PPS, SCP, FCP, AFC och UFCS betyder i praktiken att den snabbladdar nästan vilken telefon som helst, inklusive kinesiska märken som använder egna standarder. Inuti sitter fyra 21700-celler som behåller över 70 procent av sin kapacitet efter tusen laddcykler, alltså efter ungefär tre års dagligt bruk.\n\n**Energin räcker inte lika långt som priset antyder.** 72 wattimmar är exakt vad Linocell Premium ger för 699 kronor, alltså 291 kronor mindre, och 535 gram är tyngre än alla utom de två största. 146 × 54 × 50 millimeter gör den dessutom kantig i en full väska.\n\nLaddar du en dator och en telefon på tåget och vill slippa hålla reda på en tjock kabel är kabeln värd de 291 kronorna. Är det ström per krona du är ute efter ger Linocell 25 000 dig 25 procent mer för 9 kronor mer.",
  },
  {
    id: "denver-225w-20000",
    brand: "Denver",
    name: "Fast Charge-powerbank med PD 22,5 W 20 000 mAh",
    shortName: "Denver 22,5 W",
    image: productImage(POWERBANK_20000.slug, "denver-225w-20000"),
    tagline: "349 kronor för 20 000 milliamperetimmar.",
    scores: {
      /* 20 000 mAh, samma nominella kapacitet som tre andra här. Höjt från
         3,0 2026-08-06: det lägre betyget var ett avdrag för att
         energiinnehållet inte gått att fastställa, inte för varan. */
      kapacitet: 3.5,
      /* 22,5 W lägst i jämförelsen, och micro-USB som ingång är förlegat. */
      laddeffekt: 1.5,
      /* 460 g är näst lättast. 138 × 29 × 70 mm ger 280 cm³, minst av alla. */
      vikt: 4.5,
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
      "280 kubikcentimeter, alltså den mest kompakta i jämförelsen",
      "460 gram, näst lättast här",
      "Tre utgångar, alltså en USB-C och två USB-A",
    ],
    cons: [
      "22,5 W räcker inte till en bärbar dator",
      "Full effekt bara ur USB-A, medan USB-C stannar på 20 W",
      "Micro-USB som andra ingång är en förlegad kontakt",
      "12 V och 1,5 A in gör påfyllningen till en kvällssyssla",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "349 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "20 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "Ej angiven", highlight: true },
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "22,5 W", highlight: true },
      { label: "Effekt per port", shortLabel: "Per port", value: "22,5 W", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "460 g", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "Ej angiven", highlight: true },
      { label: "Inbyggd kabel", shortLabel: "Kabel", value: "Nej", highlight: true },
      { label: "Antal portar", value: "3 st" },
      { label: "Porttyper", value: "1× USB-C, 2× USB-A" },
      { label: "Power Delivery", value: "Ja, men 22,5 W når bara USB-A-porten" },
      { label: "Utgång USB-A", value: "5 V/2 A, 9 V/2 A, 10 V/2,25 A" },
      { label: "Utgång USB-C", value: "5 V/2 A, 9 V/2 A, 12 V/1,67 A" },
      { label: "Ineffekt", value: "USB-C och micro-USB upp till 12 V / 1,5 A" },
      { label: "Display", value: "4 lysdioder" },
      { label: "App", value: "Nej" },
      { label: "Batteri", value: "Litiumpolymer, 3,7 V" },
      { label: "Mått", value: "138 × 29 × 70 mm" },
      { label: "Artikelnummer", value: "80220" },
    ],
    verdict:
      "Denver Fast Charge rymmer 20 000 mAh, väger 460 gram och kostar 349 kronor. Det är mindre än hälften av den näst billigaste i jämförelsen.\n\n**Kapaciteten är densamma som hos banker för tre gånger priset**, och den sitter dessutom i det minsta höljet här: 280 kubikcentimeter mot 484 för den mest utrymmeskrävande. 20 000 milliamperetimmar räcker till ungefär fyra telefonladdningar, och tre utgångar gör att hela familjen kan ladda samtidigt på en campingplats.\n\n**Effekten är där pengarna sparats.** 22,5 watt är lägst i jämförelsen och räcker till telefoner och surfplattor men inte till en bärbar dator. Fällan är att de 22,5 watten bara kommer ur USB-A-porten: USB-C toppar på 12 volt och 1,67 ampere, alltså 20 watt, tvärtemot vad man väntar sig av den nyare kontakten.\n\nPåfyllningen är långsam åt båda hållen. Ingången tar 12 volt och 1,5 ampere, och micro-USB som andra ingång hör till en generation som håller på att försvinna, så den som laddar banken den vägen får räkna med en hel kväll.\n\nTill 349 kronor finns ingenting att invända i bilen, i sommarstugan eller i lådan på landet där ingen har bråttom. Till datorn börjar de riktiga alternativen på det dubbla.",
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
      "Den största Anker Prime-modellen, med 27 650 milliamperetimmar. Vi rankar 300 W-versionen i stället, eftersom den ger 50 watt mer ut, laddar sig själv på 250 watt mot den härs lägre ingång och har fler kundbetyg. Den här är värd att titta på om du vill ha maximal kapacitet från Anker, men kontrollera wattimmarna innan du bokar en flygresa: 27 650 milliamperetimmar ligger i det spann där hundragränsen avgörs av cellspänningen.",
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
      "Därför att wattimmar beror på både kapaciteten och cellspänningen, och den senare varierar. Räkningen är kapaciteten i amperetimmar gånger spänningen, så 20 000 milliamperetimmar vid 3,6 volt ger 72 wattimmar medan samma kapacitet vid 3,7 volt ger 74. Skillnader i den storleksordningen är normala och betyder inget för dig. I den här jämförelsen ligger tre powerbanks på 20 000 milliamperetimmar alla på 72 wattimmar, och en på 20 100 landar på 72,36, vilket är precis vad räkningen förutsäger. Ser du däremot ett tal som avviker med tiotals procent från det mönstret är det värt att kontrollera mot tillverkarens egen sida innan du reser på det.",
  },
  {
    question: "Kan en powerbank ladda en bärbar dator?",
    answer:
      "Ja, om effekten räcker, och det är där de flesta faller. En vanlig bärbar dator vill ha mellan 45 och 100 watt, och en stor med kraftigt grafikkort ännu mer. En powerbank med 22,5 eller 35 watt laddar datorn långsammare än den drar ström när den används, alltså tappar batteriet ändå. Från ungefär 65 watt börjar det fungera, och vid 100 watt eller mer laddar de flesta datorer i full fart. Kontrollera två saker: att powerbanken anger USB Power Delivery, och att den totala uteffekten inte är lägre än vad en enskild port lovar. Flera produkter ger 100 eller 140 watt ur en port men mindre totalt när något annat laddas samtidigt.",
  },
  {
    question: "Hur många telefonladdningar ger 20 000 mAh?",
    answer:
      "Ungefär fyra. Kapacitetstalet gäller cellen vid dess egen spänning omkring 3,6 till 3,7 volt, medan telefonen laddas vid 5 volt eller mer, och omvandlingen mellan de två kostar energi som försvinner i värme. Kvar blir typiskt 60 till 70 procent av det nominella talet: två av produkterna här anger själva att en full bank ger ungefär 11 250 respektive 11 600 milliamperetimmar ut. För en normal telefon med 4 000 till 5 000 milliamperetimmar batteri blir det tre till fyra fulla laddningar. Ett labb som mätt uttagbar energi på den här storleksklassen fann mellan 58 och 70 wattimmar, vilket stämmer med samma resonemang.",
  },
  {
    question: "Hur lång tid tar det att ladda en powerbank på 20 000 mAh?",
    answer:
      "Mellan en timme och en hel kväll, beroende på hur mycket effekt den tar emot. Det här är den siffra som glöms bort mest. I den här jämförelsen spänner uppladdningen från 1 timme till 3,5, och skillnaden ligger i ineffekten: en bank som tar emot 250 watt är full på en timme, en som tar 100 watt behöver två till två och en halv, och en som stannar på 18 watt behöver runt tio. Kontrollera ineffekten och inte bara uteffekten när du jämför. Tänk också på att du behöver en väggladdare som klarar samma effekt: en powerbank som kan ta emot 250 watt laddas inte snabbare än den laddare du kopplar in den i.",
  },
  {
    question: "Vad väger en powerbank på 20 000 mAh?",
    answer:
      "Mellan 400 och 625 gram i den här jämförelsen, alltså mellan en och en och en halv telefon extra i packningen. Skillnaden på 225 gram mellan den lättaste och den tyngsta märks tydligt över en hel resdag, och den följer inte kapaciteten särskilt väl: den lättaste och den näst tyngsta rymmer båda 20 000 milliamperetimmar. Det som väger är effektelektroniken och antalet celler, inte milliamperetimmarna. Väg också in formen. Den mest kompakta här tar 280 kubikcentimeter och den mest utrymmeskrävande 484, alltså nästan dubbelt så mycket plats för 25 procent mer ström.",
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
