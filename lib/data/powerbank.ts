import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { POWERBANK } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /powerbank.
 *
 * Systersida till /usb-c-laddare och /usb-c-kabel. Sidan rankar vardagsklassen,
 * 5 000 till 10 000 mAh. Rese- och laptopklassen från 20 000 mAh får
 * /powerbank-20000, efter användarbeslut 2026-08-05.
 *
 * Priser, artikelnummer och kundbetyg är lästa hos Kjell på PRICE_CHECKED.
 * Specifikationerna är kompletterade 2026-08-06 ur tillverkarnas egna manualer
 * och användarguider, se SPECS_CHECKED och `.agent/research/powerbank.md` §9.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans. Se lib/links.ts.
 *
 * ⚠️ ALLA ÅTTA LÄNKAR GÅR TILL KJELL. Det är avsiktligt och det står utskrivet
 * på sidan, samma lösning som /smart-hem-hubb och /usb-c-laddare. Kjell för
 * hela storleksklassen i ett sortiment som gick att kartlägga produkt för
 * produkt, och de ligger på 5 % / 30 d i Adtraction. Nästa runda bör bredda
 * mot Teknikdelar, Proshop och TheMobileStore, se
 * .agent/research/powerbank.md §5.
 *
 * ## ⚠️ HELA SIDANS FYND VAR FEL, OCH FELET LÅG I VÅR RESEARCH
 *
 * Fram till 2026-08-06 bar sidan påståendet att **två av åtta** produkter anger
 * sitt energiinnehåll i wattimmar, och tre saknade specifikation helt. Ett
 * gap-pass mot manualerna 2026-08-06 gav wattimmen för **sju av åtta**. Varenda
 * en låg i ett dokument Kjell själva länkar från produktsidan, eller i en
 * strukturerad specruta under rubriken `Teknisk information` som den förra
 * insamlingen inte läste. Se lib/corrections.ts.
 *
 * Kriteriet `Öppen redovisning`, vikt 15, betygsatte alltså vår egen
 * researchbrist och tog bort 1,0 från de tre produkter vars specruta vi missat.
 * Det avgjorde förstaplatsen: Anker Nano 45 W låg trea och vinner nu.
 *
 * ## Wattimmen är kategorins hela poäng, och fyndet är bättre än det gamla
 *
 * `Kapacitet` är laddningsmängd i mAh vid cellens egen spänning.
 * `Energiinnehåll` är energi i Wh och är den storhet Transportstyrelsen
 * reglerar efter: högst 100 Wh utan flygbolagets godkännande, och aldrig i
 * incheckat bagage oavsett storlek.
 *
 * **Fyra produkter med nominellt 10 000 mAh anger 36, 37 och 38,5 Wh.**
 * Spridningen är cellspänningen: Linocell Premium räknar med 3,6 V, Anker Nano
 * och Linocell 10000 med 3,7 V, Linocell Magnetisk med 3,85 V. Samma tal på
 * kartongen, tre olika mängder energi. Det är ett faktum om produkterna och
 * inte om vem som publicerat vad, och det är skälet att `Energiinnehåll` är en
 * egen kolumn.
 *
 * ⚠️ Anker MagGo Slim är den enda utan publicerad wattimme. Anker anger bara
 * cellkapaciteten i sin användarguide för A1665. Cellen står tom och renderas
 * som streck. Vi räknar aldrig om åt den som tiger — de tre spänningarna ovan
 * är belägget för varför.
 *
 * ⚠️ Anker MagGo Slim: butikens ruta "I förpackningen" listar "Anker Nano
 * Powerbank 5000 mAh", alltså ett annat produktnamn än sidans rubrik. Vi
 * använder inte den uppgiften och återger inget paketinnehåll för modellen.
 *
 * ## ⚠️ Trådlöst mot iPhone är 7,5 W, inte 15
 *
 * Båda Linocells magnetiska modeller anger i manualen `5 W/7,5 W/10 W/15 W
 * (iPhone 7,5 W)`. Sidan sålde tidigare 15 W som iPhone-fart på 10 000-modellen,
 * vilket är dubbelt mot vad manualen ger. Rättat, se lib/corrections.ts.
 *
 * ## Uteffekt totalt är en tabellrad, ifylld för alla åtta
 *
 * Andra specrundan 2026-08-06 hämtade den summa varje tillverkare anger när
 * flera uttag används samtidigt, ur Ankers användarguider för A1638, A1259 och
 * A1665 och ur Linocells manualer. Raden fanns förut på fem produkter utan att
 * synas i tabellen; nu är den ifylld på åtta och framhävd.
 *
 * Spannet är det bredaste på sidan efter kapaciteten: 10,5 till 45 W. Linocell
 * Premium 30 W är den enda vars summa är **högre** än en ensam port, 30 W plus
 * 15 W, medan vinnaren faller från 45 till 24 W totalt och till 15 W i kabeln
 * så snart en andra enhet kopplas in. Det stod inte på sidan förut och det
 * ändrar vad tre uttag är värda.
 *
 * ⚠️ Betygen är oförändrade. Uppgiften är ny och talar för Linocell Premium,
 * men laddeffekt väger också antal uttag, USB-A-effekt och fast kabel, där
 * Anker Nano 30 W leder. Ingen produkt fick avdrag för en uppgift som saknades,
 * så det finns inget betygsfel att rätta. Se `.agent/research/powerbank.md` §10.
 *
 * ## ⚠️ Två konflikter mellan butik och tillverkare, tillverkaren vinner
 *
 * - Anker MagGo Slim: Kjell skriver 22,5 W ut, Ankers användarguide för A1665
 *   anger USB-C 5 V/3 A och 9 V/2,22 A, alltså 20 W. Vi anger 20 W.
 * - Linocell 10000: Kjells produktsida skriver ca 3,5 h laddtid, manualen 4 h.
 *   Vi anger 4 h.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte laddat ur en enda powerbank. Stiftung Warentest har mätt uttagbar
 * energi på 24 modeller, men resultaten per modell ligger bakom betalvägg och
 * inget av dem knyts till en produkt här. Ljud & Bild har provat 14 powerbanks
 * och en av dem är sidans vinnare, Anker Nano A1638. Ett testomdömekriterium
 * kräver täckning över fältet, och en av åtta räcker inte.
 */

export const PRICE_CHECKED = "2026-08-05";

/** Specrundan mot manualer och användarguider. Se filhuvudet. */
export const SPECS_CHECKED = "2026-08-06";

const SEEDS: ProductSeed[] = [
  {
    id: "anker-nano-45w-10000",
    brand: "Anker",
    name: "Nano Powerbank 10 000 mAh 45 W",
    shortName: "Anker Nano 45 W",
    image: productImage(POWERBANK.slug, "anker-nano-45w-10000"),
    tagline: "45 watt räcker till datorn, inte bara telefonen.",
    scores: {
      /* 10 000 mAh / 37 Wh enligt Ljud & Bilds provexemplar. Full kapacitet
         i klassen. */
      kapacitet: 4.5,
      /* 45 W ut på enkelport är högst i jämförelsen, 30 W in, tre uttag varav
         en inbyggd utdragbar kabel, genomladdning och display. Bäst i test. */
      laddeffekt: 5,
      /* 231 g och 36 mm tjock. Kort och knubbig, men kabeln bor i enheten. */
      format: 2.5,
      /* 699 kr ger 18,90 kr per wattimme. Dyrt per wattimme, men det är den
         enda här som laddar en dator. */
      prisvarde: 3.5,
    },
    price: 699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-nano-powerbank-10-000-mah-45-w-vit-p80232",
    userRating: { value: 5, count: 27, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för dig som laddar datorn",
    pros: [
      "45 W ut räcker till en lättare bärbar dator, inte bara telefonen",
      "Inbyggd utdragbar USB-C-kabel på 70 cm, så sladden kan inte glömmas",
      "Tre uttag: den inbyggda kabeln, en USB-C-port och en USB-A",
      "Laddar sig själv full på ungefär två timmar med 30 W in",
      "Display som visar effekt per uttag och batteriets temperatur",
    ],
    cons: [
      "231 gram och 36 millimeter tjock, klumpigast i jämförelsen",
      "18,90 kronor per wattimme är näst dyrast här",
      "Ingen trådlös laddning, alltså inget magnetfäste till iPhone",
      "Redan två enheter samtidigt sänker kabeln från 45 till 15 W",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "699 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "10 000 mAh", highlight: true },
      /* Ljud & Bild, provexemplar, 2026-02. Anker anger bara cellkapaciteten. */
      { label: "Energiinnehåll", shortLabel: "Wh", value: "37 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "45 W", highlight: true },
      /* Ankers användarguide A1638: Total Output 5 V 4,8 A (24 W Max). Två
         portar i bruk ger 15 W + 7,5 W, tre portar 7,5 W + 7,5 W + 7,5 W. */
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "24 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "3 st", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "231 g", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Nej", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "Ca 2 h", highlight: true },
      /* Ljud & Bild 2026-02, 82 × 51 × 36 mm. Överensstämmer med Ankers egna
         81,5 × 50,5 × 36 mm inom avrundningen. */
      { label: "Mått", shortLabel: "Mått", value: "82 × 51 × 36 mm", highlight: true },
      { label: "Ineffekt", value: "30 W" },
      { label: "Porttyper", value: "1× inbyggd USB-C-kabel, 1× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, 45 W ut och 30 W in" },
      { label: "Display", value: "Ja, effekt per uttag och temperatur" },
      { label: "Inbyggd kabel", value: "Ja, utdragbar USB-C på 70 cm" },
      { label: "Quick Charge", value: "Ja, Samsung QC 2.0 via USB-C" },
      { label: "Genomladdning", value: "Ja" },
      { label: "Artikelnummer", value: "80232" },
    ],
    verdict:
      "Anker Nano 45 W rymmer 10 000 mAh, ger 45 watt ut och kostar 699 kronor. Ingen annan powerbank på sidan ger mer än 30, och de femton wattens skillnad märks först när det sitter en bärbar dator i andra änden.\n\n**45 watt flyttar produkten till en annan användning.** En telefon behöver 20 till 30, och allt däröver är överskott ända tills du sätter i en USB-C-dator eller en surfplatta på ett tåg. Då är det här den enda i klassen som laddar i datorns egen fart i stället för att bara hålla den vid liv. En iPhone 16 Pro går från tom till halv på 27 minuter, och 30 watt in fyller powerbanken själv på ungefär två timmar, alltså under en kväll i stället för över natten.\n\n**Kabeln bor i enheten och rullas in av sig själv.** Sjuttio centimeter USB-C dras ut ur magen och åker tillbaka när du släpper, vilket löser det vanligaste skälet till att en laddad powerbank inte hjälper: att sladden ligger hemma. Utöver den finns en USB-C-port och en USB-A, så tre saker kan laddas samtidigt. Men då delar de på 24 watt totalt, och redan den andra enheten sänker kabeln från 45 till 15. Full fart får du bara med en sak i taget.\n\nDet du betalar med är fickan. 231 gram och 36 millimeter gör den kort och tjock snarare än platt, och den märks i ett innerfack på ett sätt som de magnetiska modellerna inte gör. Räknat per wattimme är den dessutom bland de dyraste här.\n\nKöp den. Har du något som laddas via USB-C och är större än en telefon finns det inget alternativ i den här storleken, och även om du bara laddar telefon får du tre uttag, en sladd du inte kan glömma och två timmars återladdning.",
  },
  {
    id: "anker-nano-30w-10000",
    brand: "Anker",
    name: "Nano powerbank 30 W 10000 mAh",
    shortName: "Anker Nano 30 W",
    image: productImage(POWERBANK.slug, "anker-nano-30w-10000"),
    tagline: "Kabeln sitter fast, så den ligger aldrig kvar hemma.",
    scores: {
      /* 10 000 mAh / 37 Wh vid 3,7 V, utskrivet av Anker. */
      kapacitet: 4.5,
      /* 30 W PD in och ut, USB-A upp till 22,5 W, tre portar varav en fast
         kabel, laddar tre enheter samtidigt. Näst bäst efter 45 W-modellen. */
      laddeffekt: 4.5,
      /* 215 g och 26 mm. Fast kabel är en verklig fördel i formatet. */
      format: 3,
      /* 799 kr ger 21,60 kr per wattimme, dyrast i jämförelsen. */
      prisvarde: 2.5,
    },
    price: 799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-nano-powerbank-30-w-10000-mah-svart-p80235",
    userRating: { value: 4.5, count: 32, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som glömmer kabeln",
    pros: [
      "Fast USB-C-kabel sitter i enheten, plus en USB-C-port och en USB-A",
      "30 W in och ut, alltså laddar den både telefonen och sig själv snabbt",
      "Laddar tre enheter samtidigt",
      "Färgdisplay med batteriprocent, beräknad tid och temperatur",
      "Höljet är gjort av 80 procent återvunnen plast",
    ],
    cons: [
      "21,60 kronor per wattimme är dyrast i jämförelsen",
      "215 gram, alltså tyngre än de magnetiska modellerna med samma kapacitet",
      "Ingen trådlös laddning, alltså inget magnetiskt fäste till iPhone",
      "Anker Nano 45 W kostar hundra kronor mindre och laddar en dator",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "799 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "10 000 mAh", highlight: true },
      { label: "Energiinnehåll", shortLabel: "Wh", value: "37 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "30 W", highlight: true },
      /* Ankers användarguide A1259: Total Output 24 W Max. */
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "24 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "3 st", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "215 g", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Nej", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "Ej angiven", highlight: true },
      { label: "Mått", shortLabel: "Mått", value: "104 × 52 × 26 mm", highlight: true },
      { label: "Ineffekt", value: "30 W" },
      { label: "Porttyper", value: "1× USB-C in/ut, 1× USB-A ut, 1× fast USB-C-kabel" },
      { label: "Power Delivery", value: "Ja, 30 W tvåvägs" },
      { label: "Display", value: "Färgskärm med procent, tid och temperatur" },
      { label: "Genomladdning", value: "Ja, upp till 3 enheter" },
      { label: "Inbyggd kabel", value: "Ja" },
      { label: "Batterityp", value: "Litiumjon" },
      { label: "Artikelnummer", value: "80235" },
    ],
    verdict:
      "Anker Nano 30 W rymmer 10 000 mAh, motsvarande 37 wattimmar, och kostar 799 kronor. Det är klassens dyraste, och den enda med en kabel som sitter fast i enheten.\n\n**Den fasta kabeln löser det vanligaste skälet till att en powerbank inte gör nytta.** En laddad powerbank utan sladd är lika användbar som en tom, och sladden är precis vad man glömmer. Här sitter den i, och till det kommer en USB-C-port och en USB-A, så tre saker kan laddas samtidigt.\n\n**30 watt åt båda hållen är det andra som skiljer.** Ut betyder det att en iPhone går från tom till ungefär halv på en halvtimme. In betyder det att powerbanken själv fylls på under en lunch i stället för under en kväll, vilket är skillnaden mellan att den är laddad när du ska iväg och att den inte är det. Displayen visar procent, beräknad tid och temperatur i stället för fyra lysdioder du får gissa utifrån.\n\nPrislappen är svår att försvara mot syskonet. 21,60 kronor per wattimme är det högsta talet i jämförelsen, och Anker Nano 45 W kostar hundra kronor mindre, väger sexton gram mer och laddar dessutom en bärbar dator.\n\nVälj den här om formen är viktigare än effekten. Den är tio millimeter smalare än 45-modellen och lättare att hålla mot en telefon, och den fasta kabeln gör samma jobb som den utdragbara. Ska pengarna räcka längre gör Linocell Premium 30 W samma sak för 300 kronor mindre.",
  },
  {
    id: "linocell-premium-30w-10000",
    brand: "Linocell",
    name: "Premium Powerbank 30 W 10000 mAh",
    shortName: "Linocell Premium 30 W",
    image: productImage(POWERBANK.slug, "linocell-premium-30w-10000"),
    tagline: "Full laddfart för trehundra kronor mindre.",
    scores: {
      /* 10 000 mAh / 36 Wh vid 3,6 V. Lägst wattimme av de fyra tiotusen,
         men skillnaden mot 38,5 är sju procent. */
      kapacitet: 4.5,
      /* 30 W PD ut via USB-C, 15 W via USB-A, 30 W in, laddas på 2 h 30 min.
         Två portar mot Ankers tre. */
      laddeffekt: 4,
      /* 240 g och 35 mm är tyngst och näst tjockast i jämförelsen. */
      format: 2,
      /* 13,90 kr per wattimme för full laddfart. */
      prisvarde: 4,
    },
    price: 499.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-premium-powerbank-30-w-10000-mah-p80198",
    userRating: { value: 4.5, count: 40, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för fart till lågt pris",
    pros: [
      "30 W via USB-C, samma laddfart som klassens dyraste",
      "45 W när båda uttagen används samtidigt, mest av alla åtta",
      "Både USB-C och USB-A, så äldre kablar fungerar",
      "Laddas själv på 2 timmar och 30 minuter",
      "300 kronor billigare än Anker Nano 30 W",
    ],
    cons: [
      "240 gram är tyngst i jämförelsen",
      "35 millimeter tjock, alltså ingen produkt för en innerficka",
      "Ingen kabel sitter fast, alltså en sladd till att hålla reda på",
      "Ingen trådlös laddning",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "499,90 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "10 000 mAh", highlight: true },
      /* Manual 903896, 10 000 mAh / 3,6 V / 36 Wh. */
      { label: "Energiinnehåll", shortLabel: "Wh", value: "36 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "30 W", highlight: true },
      /* Manual 903896: USB-C+USB-A total output 30,0 W + 15,0 W, och
         derateringstabellen anger 45 W för alla portar vid normal temperatur.
         Enda produkten på sidan som inte sänker summan när båda uttagen används. */
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "45 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "2 st", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "240 g", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Nej", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "2 h 30 min", highlight: true },
      { label: "Mått", shortLabel: "Mått", value: "88 × 53 × 35 mm", highlight: true },
      { label: "Ineffekt", value: "30 W" },
      { label: "Porttyper", value: "1× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, 30 W via USB-C" },
      { label: "Quick Charge", value: "Ja, 15 W via USB-A" },
      { label: "Display", value: "Ja, effekt in och ut, temperatur och tid" },
      { label: "Inbyggd kabel", value: "Nej, USB-C-kabel på 30 cm medföljer" },
      { label: "Artikelnummer", value: "80198" },
    ],
    verdict:
      "Linocell Premium 30 W rymmer 10 000 mAh, motsvarande 36 wattimmar, och kostar 499,90 kronor. Den laddar lika fort som klassens dyraste och kostar 300 kronor mindre.\n\n**30 watt via USB-C är samma effekt som toppmodellen ger**, och i praktiken betyder det att en iPhone går från tom till ungefär halv på en halvtimme. Att den dessutom har en USB-A-port med 15 watt gör att alla äldre kablar i byrålådan fortfarande fungerar, vilket den renodlat moderna konkurrensen har slutat med. De två uttagen tar inte heller från varandra: tillsammans ger de 45 watt, vilket är mer än någon annan powerbank här klarar med allt inkopplat, och mer än vinnaren ger när tre saker hänger i den.\n\n**Den fyller sig själv på två och en halv timme**, vilket är snabbare än allt annat i jämförelsen utom 45-modellen. Displayen visar watt in, watt ut, temperatur och återstående tid, alltså samma information som Anker tar 300 kronor extra för. En USB-C-kabel på 30 centimeter ligger i lådan.\n\nVikten är priset. 240 gram och 35 millimeter gör den till den tyngsta och näst tjockaste produkten här, ungefär dubbelt så tung som de magnetiska femtusenmodellerna. Det här är en powerbank för en ryggsäck eller en väska, inte för en jackficka.\n\nSka du ha full laddfart och full kapacitet till lägsta möjliga pris är det här köpet. Vill du bära den varje dag i en ficka är det de magnetiska modellerna eller Anker MagGo Slim du ska titta på i stället.",
  },
  {
    id: "linocell-10000-20w",
    brand: "Linocell",
    name: "Powerbank 10000 mAh med 20 W laddning",
    shortName: "Linocell 10000",
    image: productImage(POWERBANK.slug, "linocell-10000-20w"),
    tagline: "Två telefonladdningar för under 250 kronor.",
    scores: {
      /* 10 000 mAh / 37 Wh vid 3,7 V, ur manual 911271. Samma energi som de
         två Anker-modellerna. */
      kapacitet: 4.5,
      /* 20 W PD ut via USB-C och 18 W QC via USB-A, men max 15 W totalt när
         båda används, och 4 timmar att ladda sig själv. Långsammast in. */
      laddeffekt: 2.5,
      /* 225 g och 27 mm. Mitt i fältet på vikt, tjockare än de magnetiska. */
      format: 2.5,
      /* 6,75 kr per wattimme, billigast i jämförelsen med god marginal. */
      prisvarde: 5,
    },
    price: 249.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-powerbank-10000-mah-med-20w-laddning-svart-p80206",
    userRating: { value: 4.5, count: 303, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst för pengarna per laddning",
    pros: [
      "6,75 kronor per wattimme, billigast i jämförelsen",
      "37 wattimmar, alltså lika mycket energi som produkter för tre gånger priset",
      "20 W PD via USB-C och 18 W Quick Charge via USB-A",
      "303 kundbetyg på 4,5, näst bredast underlag i jämförelsen",
    ],
    cons: [
      "Fyra timmar att ladda sig själv, långsammast i jämförelsen",
      "Max 15 W totalt när båda portarna används samtidigt",
      "225 gram och 27 millimeter tjock",
      "Ingen trådlös laddning",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "249,90 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "10 000 mAh", highlight: true },
      /* Manual 911271, 10 000 mAh / 3,7 V / 37 Wh. */
      { label: "Energiinnehåll", shortLabel: "Wh", value: "37 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "20 W", highlight: true },
      /* Manual 911271: max 15 W när båda portarna används samtidigt. */
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "15 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "2 st", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "225 g", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Nej", highlight: true },
      /* ⚠️ Kjells produktsida skriver ca 3,5 h, manualen 4 h. Manualen gäller. */
      { label: "Laddningstid", shortLabel: "Laddtid", value: "4 h", highlight: true },
      { label: "Mått", shortLabel: "Mått", value: "94 × 62 × 27 mm", highlight: true },
      { label: "Ineffekt", value: "18 W" },
      { label: "Porttyper", value: "1× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, 20 W via USB-C" },
      { label: "Quick Charge", value: "Ja, 18 W via USB-A" },
      { label: "Genomladdning", value: "Nej, avråds i manualen" },
      { label: "Inbyggd kabel", value: "Nej" },
      { label: "Display", value: "Ja, batterinivå i procent" },
      { label: "Batterityp", value: "Litiumpolymer" },
      { label: "Artikelnummer", value: "80206" },
    ],
    verdict:
      "Linocell 10000 kostar 249,90 kronor och rymmer 37 wattimmar. Det är exakt lika mycket energi som Anker tar 799 kronor för.\n\n**Räknat per wattimme är ingenting här i närheten.** 6,75 kronor mot 21,60 för den dyraste, och de wattimmarna gör samma jobb i din telefon oavsett vad de kostade. 20 watt Power Delivery via USB-C laddar en modern telefon i fullt rimlig fart, och USB-A-porten ger 18 watt Quick Charge till äldre Android. Med 303 kundbetyg på 4,5 är den dessutom en av hyllans mest köpta.\n\n**Det du ger upp är fart in, inte fart ut.** Fyra timmar tar det att fylla den själv, mot två och en halv för Linocell Premium och två för Anker Nano 45 W. Det låter som en detalj tills den står tom en morgon du ska iväg, och det är den vanligaste anledningen till att en powerbank inte hjälper. Används båda portarna samtidigt sjunker dessutom summan till 15 watt.\n\n225 gram och 27 millimeter placerar den mitt i fältet. Den ryms i en ryggsäck utan att märkas och i en jackficka utan att vara bekväm.\n\nSka den ligga i väskan, i bilen eller i hallen och finnas där dagen någon fått slut på batteri är det här rätt köp, och de trehundra kronorna du sparar mot Linocell Premium köper en laddare som fyller den snabbare.",
  },
  {
    id: "linocell-magnetisk-10000",
    brand: "Linocell",
    name: "Magnetisk powerbank 10 000 mAh",
    shortName: "Linocell Magnetisk 10 000",
    image: productImage(POWERBANK.slug, "linocell-magnetisk-10000"),
    tagline: "Fäster på iPhone och laddar medan du går.",
    scores: {
      /* 10 000 mAh / 38,5 Wh vid 3,85 V, högst energiinnehåll i jämförelsen.
         Trådlös överföring ger tillbaka en del som värme, så den ligger kvar
         i nivå med de kabelanslutna tiotusen. */
      kapacitet: 4.5,
      /* 20 W ut via USB-C, 15 W trådlöst men 7,5 W mot iPhone, ett enda uttag
         och 3-4 timmar att ladda sig själv. */
      laddeffekt: 2.5,
      /* 200 g och 21 mm, alltså tung, men magnetfästet gör att den bärs på
         telefonen i stället för i fickan. */
      format: 3,
      /* 10,40 kr per wattimme. */
      prisvarde: 4,
    },
    price: 399.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-magnetisk-powerbank-10-000-mah-p20623",
    userRating: { value: 4.5, count: 357, scale: 5, checkedAt: PRICE_CHECKED },
    award: "editor",
    superlative: "Bäst för iPhone utan sladd",
    pros: [
      "Fäster magnetiskt på baksidan av iPhone 12 och senare",
      "38,5 wattimmar, mest energi av alla åtta",
      "357 kundbetyg på 4,5, det bredaste underlaget i jämförelsen",
      "20 W ut via USB-C när du har bråttom",
      "USB-C-kabel på 30 centimeter följer med",
    ],
    cons: [
      "Trådlöst mot iPhone är 7,5 W, alltså hälften av vad andra telefoner får",
      "200 gram gör den tyngst av de magnetiska",
      "Tre till fyra timmar att ladda sig själv",
      "Bara ett uttag, så ingen kan låna ström samtidigt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "399,90 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "10 000 mAh", highlight: true },
      /* Manual 900090, 10 000 mAh / 3,85 V / 38,5 Wh. */
      { label: "Energiinnehåll", shortLabel: "Wh", value: "38,5 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "20 W", highlight: true },
      /* Manual 900090: max 15 W när kabel och trådlöst används samtidigt. */
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "15 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "1 st", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "200 g", highlight: true },
      /* ⚠️ Manualen: 5 W/7,5 W/10 W/15 W (iPhone 7,5 W). */
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Ja, 15 W (iPhone 7,5 W)", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "3–4 h", highlight: true },
      { label: "Mått", shortLabel: "Mått", value: "103 × 67 × 21 mm", highlight: true },
      { label: "Ineffekt", value: "18 W" },
      { label: "Porttyper", value: "1× USB-C" },
      { label: "Genomladdning", value: "Nej, avråds i manualen" },
      { label: "Quick Charge", value: "Nej" },
      { label: "Inbyggd kabel", value: "Nej, USB-C-kabel på 30 cm medföljer" },
      { label: "Batterityp", value: "Litiumpolymer" },
      { label: "Artikelnummer", value: "20623" },
    ],
    verdict:
      "Linocell Magnetisk 10 000 mAh kostar 399,90 kronor och fäster på baksidan av telefonen utan sladd. Med 38,5 wattimmar bär den dessutom mest energi av alla åtta.\n\n**Magnetfästet ändrar hur en powerbank används.** I stället för att ligga i väskan med en sladd som ska dras fram sitter den fast på telefonen medan du går, och det gör att den kommer till användning under dagen i stället för bara i nödfall. Med 357 kundbetyg på 4,5 är den den mest omdömda produkten här, vilket för en magnetisk produkt framför allt säger att fästet håller.\n\n**Har du bråttom ska du ändå dra fram kabeln.** USB-C-porten ger 20 watt, medan det trådlösa fästet ger 7,5 watt mot en iPhone. Det är hälften av vad Qi2-modellerna klarar och en fjärdedel av vad sidans snabbaste ger, så magneten är till för bekvämlighet under dagen och kabeln för de gånger telefonen ska fyllas fort.\n\n200 gram är tyngst av de magnetiska och 72 gram mer än syskonet på 5 000 mAh, vilket märks tydligt när det sitter fast på en telefon du håller i handen. Tre till fyra timmar tar det att fylla den själv.\n\nHar du en iPhone 12 eller senare och vill slippa sladden i vardagen är den värd sina pengar, och de extra wattimmarna gör den till den magnetiska som räcker längst. Vill du ha snabbare trådlös laddning kostar Anker MagGo Slim 200 kronor mer och ger 15 watt, men bara halva kapaciteten.",
  },
  {
    id: "anker-maggo-slim-5k",
    brand: "Anker",
    name: "MagGo Powerbank Slim 5k Qi2",
    shortName: "Anker MagGo Slim",
    image: productImage(POWERBANK.slug, "anker-maggo-slim-5k"),
    tagline: "Tunn nog att sitta kvar i innerfickan.",
    scores: {
      /* 5 000 mAh. Ankers användarguide för A1665 anger cellkapaciteten men
         ingen wattimme. Betygsatt på den etablerade kapaciteten, i nivå med
         de andra femtusen. */
      kapacitet: 2.5,
      /* 20 W ut via USB-C och 15 W trådlöst med Qi2, alltså dubbelt mot
         Linocells magnetiska. Ett uttag, laddas på 2 h. */
      laddeffekt: 3,
      /* 8,6 mm är tunnast i jämförelsen med marginal, 130 g. */
      format: 4.5,
      /* 599 kr för 5 000 mAh är dyrast per enhet kapacitet i jämförelsen. */
      prisvarde: 2,
    },
    price: 599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-maggo-powerbank-slim-5k-qi2-p80237",
    userRating: { value: 4.5, count: 17, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för innerfickan",
    pros: [
      "8,6 millimeter tjock, tunnast i jämförelsen med god marginal",
      "Qi2 ger 15 W trådlöst, dubbelt mot de magnetiska Linocell-modellerna",
      "USB-C-kontakt sitter inbyggd i enheten",
      "Laddar sig själv full på ungefär två timmar",
    ],
    cons: [
      "5 000 mAh räcker till ungefär en telefonladdning, inte två",
      "599 kronor för halva kapaciteten gör den dyrast per milliamperetimme",
      "Bara ett uttag",
      "Trådlöst och kabel samtidigt ger tillsammans mindre än kabeln ensam",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "599 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "5 000 mAh", highlight: true },
      /* Anker anger bara cellkapaciteten i användarguiden för A1665. Vi räknar
         aldrig om åt den som tiger: samma nominella tal ger 36, 37 och 38,5 Wh
         hos de tre tillverkare på sidan som faktiskt räknat. */
      { label: "Energiinnehåll", shortLabel: "Wh", value: "Ej angiven", highlight: true },
      /* ⚠️ Kjell skriver 22,5 W. Ankers användarguide A1665: USB-C 5 V/3 A och
         9 V/2,22 A, alltså 20 W. Tillverkaren gäller. */
      { label: "Uteffekt", shortLabel: "Ut", value: "20 W", highlight: true },
      /* Ankers användarguide A1665: Gesamtleistung USB-C 5 V 2,4 A max och
         kabellöst 5 W max, alltså 12 W ur porten när båda används samtidigt.
         Talen står var för sig och summeras inte av tillverkaren. */
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "12 W + 5 W trådlöst", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "1 st", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "130 g", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Ja, Qi2 15 W", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "Ca 2 h", highlight: true },
      { label: "Mått", shortLabel: "Mått", value: "102 × 76 × 8,6 mm", highlight: true },
      { label: "Ineffekt", value: "20 W" },
      { label: "Porttyper", value: "Inbyggd USB-C-kontakt" },
      { label: "Display", value: "LED-indikator" },
      { label: "Genomladdning", value: "Ja" },
      { label: "Inbyggd kabel", value: "Ja, USB-C-kontakt i enheten" },
      { label: "Modellnummer", value: "A1665" },
      { label: "Artikelnummer", value: "80237" },
    ],
    verdict:
      "Anker MagGo Slim är 8,6 millimeter tjock, rymmer 5 000 mAh och kostar 599 kronor.\n\n**Tjockleken är hela argumentet.** Med telefonen på baksidan blir paketet fortfarande tunt nog för en innerficka eller ett litet handväskefack, och det är skillnaden mellan att ta med den och att låta bli. Ingen annan här är i närheten: näst tunnaste modellen är 13 millimeter, alltså halva enheten tjockare.\n\n**Qi2 är det andra som skiljer.** Den nyare trådlösa standarden ger 15 watt mot fästet, medan de magnetiska Linocell-modellerna stannar på 7,5 mot en iPhone. I praktiken laddar den alltså dubbelt så fort utan sladd, och USB-C-kontakten sitter inbyggd i enheten så att banken själv fylls på två timmar utan lös kabel.\n\n**Sedan kommer räkningen som avgör.** 5 000 mAh är ungefär en full telefonladdning, inte två, och för det betalar du 599 kronor. Linocell Magnetisk 10 000 mAh kostar 200 kronor mindre och bär dubbelt så mycket energi. Räknat per milliamperetimme är det här den dyraste produkten i jämförelsen med bred marginal.\n\nBetalar du för tjockleken är den värd pengarna, och den som burit en tjock powerbank i kavajfickan vet varför. Ska du klara en hel dag borta från uttag räcker den inte, och då är det de tio tusen du ska titta på.",
  },
  {
    id: "linocell-5000",
    brand: "Linocell",
    name: "Powerbank 5000 mAh",
    shortName: "Linocell 5000",
    image: productImage(POWERBANK.slug, "linocell-5000"),
    tagline: "Den som ligger i väskan och räddar dagen.",
    scores: {
      /* 5 000 mAh / 18,5 Wh vid 3,7 V, ur manual 911270. */
      kapacitet: 2.5,
      /* 10,5 W totalt är lägsta effekten i jämförelsen, och 3 timmar in. */
      laddeffekt: 1.5,
      /* 120 g är lättast av alla åtta, och 15 mm är näst tunnast. */
      format: 4,
      /* 8,10 kr per wattimme, näst billigast i jämförelsen. */
      prisvarde: 4,
    },
    price: 149.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-powerbank-5000-mah-svart-p80205",
    userRating: { value: 4.5, count: 222, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst som extra reserv",
    pros: [
      "120 gram, lättast av alla åtta",
      "15 millimeter tjock, alltså näst tunnast i jämförelsen",
      "8,10 kronor per wattimme, näst billigast här",
      "Både USB-C och USB-A, så äldre kablar fungerar",
      "222 kundbetyg på 4,5",
    ],
    cons: [
      "10,5 W är lägsta effekten i jämförelsen, alltså långsam laddning",
      "18,5 wattimmar räcker till ungefär en telefonladdning",
      "Varken Power Delivery eller Quick Charge",
      "Tre timmar att ladda sig själv",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "149,90 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "5 000 mAh", highlight: true },
      /* Manual 911270, 5 000 mAh / 3,7 V / 18,5 Wh. */
      { label: "Energiinnehåll", shortLabel: "Wh", value: "18,5 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "10,5 W", highlight: true },
      /* Manual 911270: max 10,5 W totalt, alltså samma som en ensam port. */
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "10,5 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "2 st", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "120 g", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Nej", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "3 h", highlight: true },
      { label: "Mått", shortLabel: "Mått", value: "94 × 62 × 15 mm", highlight: true },
      { label: "Ineffekt", value: "10,5 W" },
      { label: "Porttyper", value: "1× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Nej" },
      { label: "Quick Charge", value: "Nej" },
      { label: "Genomladdning", value: "Nej, avråds i manualen" },
      { label: "Inbyggd kabel", value: "Nej" },
      { label: "Display", value: "Fyra lysdioder" },
      { label: "Batterityp", value: "Litiumpolymer" },
      { label: "Artikelnummer", value: "80205" },
    ],
    verdict:
      "Linocell Powerbank 5000 mAh kostar 149,90 kronor, väger 120 gram och rymmer 18,5 wattimmar.\n\n**Den är lättast av allt på sidan och näst tunnast**, alltså den enda som får plats i en jeansficka utan att sitta i vägen. Femton millimeter och 120 gram är ungefär en tredjedel av vad Linocell Premium väger, och det avgör om den följer med eller ligger kvar. 18,5 wattimmar räcker till att ta en tom telefon tillbaka till full en gång.\n\n**Farten är där sparandet syns.** 10,5 watt är den lägsta effekten i hela jämförelsen, ungefär en fjärdedel av vad de snabbaste ger, och varken Power Delivery eller Quick Charge finns med. En halvtimme i den här ger alltså en dryg tiondel av telefonen, mot halva hos en trettiowattsmodell. Den fyller dessutom sig själv på tre timmar.\n\nTill det finns två uttag, ett USB-C och ett USB-A, så en gammal sladd i en byrålåda duger fortfarande. De 222 kundbetygen på 4,5 säger att den gör det den lovar.\n\nSom andra powerbank är den svår att göra fel på: den som ligger i necessären, i bilen eller i barnvagnen och aldrig behöver vara bäst på något. Ska den vara din enda är 18,5 wattimmar för lite, och då är Linocell 10000 hundra kronor dyrare och rymmer dubbelt så mycket.",
  },
  {
    id: "linocell-magnetisk-5000",
    brand: "Linocell",
    name: "Magnetisk powerbank 5000 mAh",
    shortName: "Linocell Magnetisk 5000",
    image: productImage(POWERBANK.slug, "linocell-magnetisk-5000"),
    tagline: "Lättast av de magnetiska, och den fäster direkt.",
    scores: {
      /* 5 000 mAh / 19,25 Wh vid 3,85 V, ur manual 900089. Högst wattimme av
         femtusenmodellerna. */
      kapacitet: 2.5,
      /* Max 12 W totalt via kabel, 10 W trådlöst men 7,5 W mot iPhone. Näst
         lägst i jämförelsen. Laddas på 2 h. */
      laddeffekt: 2,
      /* 128 g och 13 mm, alltså näst lättast och tredje tunnast. */
      format: 4,
      /* 15,60 kr per wattimme, näst dyrast per wattimme i jämförelsen. */
      prisvarde: 3,
    },
    price: 299.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-magnetisk-powerbank-5000-mah-p20622",
    userRating: { value: 4.5, count: 334, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för att testa magneten",
    pros: [
      "Billigaste magnetiska powerbanken i jämförelsen",
      "128 gram, alltså näst lättast av alla åtta",
      "13 millimeter tjock, tunnast av Linocells modeller",
      "Laddas själv på ungefär två timmar",
      "334 kundbetyg på 4,5",
    ],
    cons: [
      "Max 12 W via kabel gör den till den näst långsammaste här",
      "Trådlöst mot iPhone är 7,5 W, alltså halva Qi2-farten",
      "19,25 wattimmar räcker till ungefär en telefonladdning",
      "Bara ett uttag, så inget andra uttag för en kompis telefon",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "299,90 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "5 000 mAh", highlight: true },
      /* Manual 900089, 5 000 mAh / 3,85 V / 19,25 Wh. */
      { label: "Energiinnehåll", shortLabel: "Wh", value: "19,25 Wh", highlight: true },
      { label: "Uteffekt", shortLabel: "Ut", value: "12 W", highlight: true },
      /* Manual 900089: max 12 W när kabel och trådlöst används samtidigt. */
      { label: "Uteffekt totalt", shortLabel: "Totalt", value: "12 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "1 st", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "128 g", highlight: true },
      /* ⚠️ Manualen: 5 W/7,5 W/10 W (iPhone 7,5 W). */
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Ja, 10 W (iPhone 7,5 W)", highlight: true },
      { label: "Laddningstid", shortLabel: "Laddtid", value: "Ca 2 h", highlight: true },
      { label: "Mått", shortLabel: "Mått", value: "103 × 67 × 13 mm", highlight: true },
      { label: "Ineffekt", value: "12 W" },
      { label: "Porttyper", value: "1× USB-C" },
      { label: "Genomladdning", value: "Nej, avråds i manualen" },
      { label: "Quick Charge", value: "Nej" },
      { label: "Inbyggd kabel", value: "Nej, USB-C-kabel på 30 cm medföljer" },
      { label: "Batterityp", value: "Litiumpolymer" },
      { label: "Artikelnummer", value: "20622" },
    ],
    verdict:
      "Linocell Magnetisk 5000 mAh kostar 299,90 kronor och är den billigaste vägen till magnetladdning i jämförelsen.\n\n**Den väger 128 gram och är 13 millimeter tjock**, alltså näst lättast av alla åtta och tunnast av Linocells modeller. På en telefon blir paketet fortfarande hanterbart, vilket är hela poängen med en magnetisk bank: den ska kunna sitta kvar medan du använder telefonen. Den fyller sig själv på ungefär två timmar och en USB-C-kabel ligger i lådan.\n\nMed 334 kundbetyg på 4,5 är den en av hyllans mest köpta, och för en magnetisk produkt säger det framför allt att fästet håller genom en dags användning.\n\n**Effekten är dess gräns, åt båda hållen.** 12 watt via kabel är näst lägst i hela jämförelsen, och trådlöst mot en iPhone får du 7,5 watt, alltså hälften av vad Qi2-modellerna ger. Skillnaden märks varje gång du har en halvtimme och vill ha så mycket batteri som möjligt. Till det kommer att 19,25 wattimmar är ungefär en telefonladdning, och att ett enda uttag betyder att ingen annan kan låna ström samtidigt.\n\nVill du veta om magnetladdning passar dig innan du lägger sexhundra kronor är den här rätt ingång. Vet du redan att du vill ha det tar du tiotusenmodellen för hundra kronor mer och får dubbelt så många wattimmar.",
  },
];

export const POWERBANK_PRODUCTS = resolveProducts(POWERBANK, SEEDS);

/**
 * Tittade på, valde bort.
 *
 * `reason` är undantagen från källpratsregeln, se skillen `swedish-voice`.
 */
export const POWERBANK_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Linocell",
    name: "Powerbank 25 000 mAh",
    approxPrice: 999,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-powerbank-25-000-mah-p89035",
    reason:
      "Utanför den storleksklass sidan rankar. 25 000 mAh och 90 wattimmar hör till rese- och laptopklassen, där både vikten och flygreglerna ser annorlunda ut, och den jämförs på systersidan i stället. Värd att nämna här ändå: 90 av 100 tillåtna wattimmar är nära nog gränsen för att talet ska spela roll när du packar.",
  },
  {
    brand: "Anker",
    name: "Prime Powerbank 300 W PD 3.1 26 250 mAh",
    approxPrice: 2490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-prime-powerbank-300-w-pd-3.1-26250-mah-p88933",
    reason:
      "Också utanför storleksklassen, och sidans dyraste granne på 2 490 kronor. Den tas upp här för en enda uppgifts skull: 99,75 wattimmar mot en gräns på 100. Marginalen är en fjärdedels wattimme, alltså är produkten konstruerad för att precis rymmas under flyggränsen. Jämförs på systersidan.",
  },
  {
    brand: "Denver",
    name: "Fast Charge Powerbank 10 000 mAh",
    approxPrice: 249,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/denver-fast-charge-powerbank-10-000-mah-p80219",
    reason:
      "Samma kapacitet och nästan samma pris som Linocell 10000, med 22,5 watt i stället för 20. Vi rankar Linocell eftersom den har 303 kundbetyg mot Denvers inga, och två produkter som skiljer sig med två och en halv watt hjälper ingen som väljer. Är den i lager när Linocell inte är det gör den samma jobb.",
  },
  {
    brand: "BMX",
    name: "Ultratunn magnetisk Qi2-powerbank 5000 mAh i titanhölje",
    merchant: "Kjell & Company",
    merchantUrl: "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank",
    reason:
      "Den mest intressanta produkten vi valde bort. Titanhölje och halvfast elektrolyt i stället för vanlig litiumjon är ovanligt i konsumentledet, och båda färgvarianterna har ett enda kundbetyg var. Vi rankar inte en produkt vars underlag består av en person, och celltekniken är dessutom för ny för att vi ska kunna säga något om hur den åldras. Värd att titta på igen om ett år.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const POWERBANK_FAQ = [
  {
    question: "Hur många gånger laddar en powerbank på 10 000 mAh min telefon?",
    answer:
      "Räkna med ungefär två gånger, inte tre. En modern telefon har ett batteri på mellan 3 000 och 5 000 mAh, så på papperet ser tre laddningar rimliga ut. Men powerbankens tal gäller cellen vid dess egen spänning, omkring 3,6 till 3,85 volt, medan telefonen laddas vid 5 volt eller mer. Omvandlingen mellan de två kostar energi, och en del försvinner dessutom som värme i kabeln och i telefonen. Det som återstår ligger typiskt kring 60 till 70 procent av det nominella talet. En bank på 10 000 mAh ger alltså en normal telefon ungefär två fulla laddningar, och en bank på 5 000 mAh ungefär en.",
  },
  {
    question: "Vad betyder Wh på en powerbank?",
    answer:
      "Wattimmar är energi, och det är den enhet som avgör om powerbanken får följa med på flyget. Milliamperetimmar mäter laddningsmängd vid en viss spänning och säger därför inget ensamt. Omräkningen är kapaciteten i amperetimmar gånger cellspänningen, och det är där det blir intressant: de fyra powerbanks på 10 000 mAh som jämförs här rymmer 36, 37 respektive 38,5 wattimmar, eftersom tillverkarna räknar med 3,6, 3,7 och 3,85 volt. Samma tal på kartongen, tre olika mängder energi, och en skillnad på sju procent mellan den minsta och den största. Det är skälet att titta på wattimmen och inte på milliamperetimmen när du jämför två modeller från olika märken.",
  },
  {
    question: "Får jag ta med en powerbank på flyget?",
    answer:
      "Ja, i handbagaget, och nej i det incheckade. Transportstyrelsen anger att lösa litiumjonbatterier inklusive powerbanks upp till 100 wattimmar får tas med i kabinen men inte checkas in. Mellan 100 och 160 wattimmar gäller fortfarande handbagage, då högst två batterier och med flygbolagets godkännande. Över 160 wattimmar får de inte tas med alls. Det praktiska av det för den här storleksklassen: en powerbank på 5 000 eller 10 000 mAh landar på 18,5 till 38,5 wattimmar och är alltid tillåten i kabinen. Regeln som oftare ställer till det är den andra, att den aldrig får ligga i väskan du checkar in, och den gäller även den minsta.",
  },
  {
    question: "Hur stor powerbank ska jag välja?",
    answer:
      "Utgå från hur länge du är borta från ett uttag. Är svaret en dag i stan räcker 5 000 mAh, som ger tillbaka en tom telefon en gång och väger mellan 120 och 130 gram. Är svaret en hel dag ute, en flygresa eller en helg utan säker tillgång till el är 10 000 mAh rätt storlek, alltså ungefär två laddningar, och då väger enheten mellan 200 och 240 gram. Ska en bärbar dator laddas behöver du både mer kapacitet och högre effekt, minst 45 watt. Köp inte större än du behöver: kapacitet kostar vikt, och en powerbank som är för tung för fickan blir liggande hemma och laddar därför ingenting alls.",
  },
  {
    question: "Vad betyder watt på en powerbank?",
    answer:
      "Watt är laddfarten, och den finns i två riktningar som båda spelar roll. Uteffekten avgör hur fort telefonen fylls: 12 watt är långsamt, 20 watt är rimligt, och 30 watt tar en iPhone från tom till ungefär halv på en halvtimme. Ineffekten avgör hur fort powerbanken själv laddas, och den är lätt att glömma trots att en bank som tar fyra timmar ofta står tom när du ska iväg. Skillnaden är verklig: bland de åtta här laddas den snabbaste på två timmar och den långsammaste på fyra. Har powerbanken flera portar delar de dessutom oftast på en gemensam maxeffekt, så två telefoner samtidigt laddas långsammare än en. Leta efter USB Power Delivery, förkortat PD, som är den standard telefoner och datorer använder för snabbladdning.",
  },
  {
    question: "Är magnetiska powerbanks värda pengarna?",
    answer:
      "De är värda det om du faktiskt använder telefonen medan den laddas. En magnetisk bank fäster på baksidan av en iPhone 12 eller senare och laddar utan sladd, vilket gör att den kan sitta kvar medan du går, pratar eller står på en perrong. Två saker talar emot. Trådlös laddning är långsammare och förlorar mer energi som värme än en kabel gör, och farten skiljer sig mer än man tror: en Qi2-certifierad bank ger 15 watt mot en iPhone, medan de äldre magnetiska stannar på 7,5. Titta alltså efter Qi2 och inte bara efter ordet magnetisk. Och de magnetiska väger mer per wattimme: den tyngsta i vår jämförelse är en magnetisk på 200 gram. Har du Android utan magnetring i skalet är frågan sällan aktuell.",
  },
  {
    question: "Kan jag ladda powerbanken och telefonen samtidigt?",
    answer:
      "På vissa modeller, och funktionen kallas genomladdning eller pass-through. Den är praktisk på resa, eftersom ett vägguttag på hotellrummet då räcker till både telefonen och banken över natten. Två saker är värda att veta om du använder den. Powerbanken blir varmare när den laddar och laddas samtidigt, vilket på sikt sliter på cellen mer än vanlig användning. Och laddningen av själva banken går långsammare, eftersom en del av effekten går rakt igenom till telefonen. Ska du bara ladda en sak i taget är funktionen inget att betala extra för.",
  },
  {
    question: "Hur länge håller en powerbank?",
    answer:
      "Räkna med några år av normal användning. Ett litiumjonbatteri åldras av laddcykler och av värme, och kapaciteten sjunker gradvis med antalet fulla cykler snarare än plötsligt. Det du själv gör spelar större roll än märket: undvik att förvara den fulladdad i värme, till exempel i en bil på sommaren, och låt den inte ligga helt urladdad i månader. Flera av modellerna här stänger själva av utmatningen om cellen blir för varm, vilket skyddar batteriet men också betyder att en powerbank som ligger i solen laddar sämre just då. En powerbank som används och laddas då och då mår bättre än en som ligger orörd i en låda i tre år.",
  },
];
