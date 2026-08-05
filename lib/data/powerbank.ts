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
 * Priser, artikelnummer, kundbetyg och specifikationer är lästa hos Kjell på
 * PRICE_CHECKED, i produktsidans egen JSON-LD och specifikationstext.
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
 * ## Wattimmen är kategorins hela poäng
 *
 * `Kapacitet` är laddningsmängd i mAh vid cellens egen spänning.
 * `Energiinnehåll` är energi i Wh och är den storhet Transportstyrelsen
 * reglerar efter: högst 100 Wh utan flygbolagets godkännande, och aldrig i
 * incheckat bagage oavsett storlek.
 *
 * **Två av åtta produkter anger Wh.** Anker Nano 30 W anger 37 Wh och Linocell
 * Premium 30 W anger 36 Wh — för samma nominella 10 000 mAh. Att de två som
 * faktiskt räknat får olika svar är beviset för att vi aldrig ska räkna åt dem
 * som tiger. `Energiinnehåll` ligger i `ALDRIG_BEDOMD`.
 *
 * ⚠️ Tre produkter saknar specifikationsruta helt hos butiken, och två av dem
 * är hyllans mest omdömda med 303 respektive 222 kundbetyg. Det syns som
 * `Ej angiven` på flera rader och kostar poäng på `redovisning`. Det förklaras
 * en gång i viktningen och står aldrig i ett omdöme, en för- eller nackdel
 * eller ett FAQ-svar. Se skillen `swedish-voice`.
 *
 * ⚠️ Anker MagGo Slim: butikens ruta "I förpackningen" listar "Anker Nano
 * Powerbank 5000 mAh", alltså ett annat produktnamn än sidans rubrik. Vi
 * använder inte den uppgiften och återger inget paketinnehåll för modellen.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte laddat ur en enda powerbank. Stiftung Warentest har mätt uttagbar
 * energi på 24 modeller, men resultaten per modell ligger bakom betalvägg och
 * inget av dem knyts till en produkt här.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "anker-nano-30w-10000",
    brand: "Anker",
    name: "Nano powerbank 30 W 10000 mAh",
    shortName: "Anker Nano 30 W",
    image: productImage(POWERBANK.slug, "anker-nano-30w-10000"),
    tagline: "Kabeln sitter fast, så den ligger aldrig kvar hemma.",
    scores: {
      /* 10 000 mAh och 37 Wh utskrivet, alltså full kapacitet i klassen och
         den enda tillsammans med Linocell Premium där talet går att läsa. */
      kapacitet: 4.5,
      /* 30 W PD in och ut, USB-A upp till 22,5 W, tre portar varav en fast
         kabel, laddar tre enheter samtidigt. Bäst i klassen. */
      laddeffekt: 5,
      /* Enda produkten med både wattimmar, batterityp, effekt per port och
         display som visar procent, tid och temperatur. */
      redovisning: 5,
      /* Fast kabel är en verklig fördel, men vikten är inte publicerad. */
      format: 3.5,
      /* 799 kr är klassens högsta pris. */
      prisvarde: 2.5,
    },
    price: 799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-nano-powerbank-30-w-10000-mah-svart-p80235",
    userRating: { value: 4.5, count: 32, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för den som glömmer kabeln",
    pros: [
      "Fast USB-C-kabel sitter i enheten, plus en USB-C-port och en USB-A",
      "30 W in och ut, alltså laddar den både telefonen och sig själv snabbt",
      "Laddar tre enheter samtidigt",
      "Färgdisplay med batteriprocent, beräknad tid och temperatur",
      "10 000 mAh motsvarar 37 wattimmar, utskrivet",
    ],
    cons: [
      "799 kronor är klassens högsta pris för 10 000 mAh",
      "Vikten är okänd, så den går inte att väga mot de tunnare",
      "Ingen trådlös laddning, alltså inget magnetiskt fäste till iPhone",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "799 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "10 000 mAh", highlight: true },
      { label: "Energiinnehåll", value: "37 Wh" },
      { label: "Uteffekt", shortLabel: "Ut", value: "30 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "3 st", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Nej", highlight: true },
      { label: "Vikt", value: "Ej angiven" },
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
      "Anker Nano 30 W rymmer 10 000 mAh och kostar 799 kronor. Det är klassens dyraste, och den enda med en kabel som sitter fast i enheten.\n\n**Den fasta kabeln löser det vanligaste skälet till att en powerbank inte gör nytta.** En laddad powerbank utan sladd är lika användbar som en tom, och sladden är precis vad man glömmer. Här sitter den i, och till det kommer en USB-C-port och en USB-A, så tre saker kan laddas samtidigt.\n\n**30 watt åt båda hållen är det andra som skiljer.** Ut betyder det att en iPhone går från tom till ungefär halv på en halvtimme. In betyder det att powerbanken själv fylls på under en lunch i stället för under en kväll, vilket är skillnaden mellan att den är laddad när du ska iväg och att den inte är det. Displayen visar procent, beräknad tid och temperatur i stället för fyra lysdioder du får gissa utifrån.\n\nDen är också en av två i jämförelsen där energiinnehållet står utskrivet: 10 000 mAh motsvarar 37 wattimmar. Det är talet du behöver när någon frågar om den får följa med i kabinen, och svaret med 37 wattimmar är ja med god marginal.\n\nKöp den. Åttahundra kronor är mycket för 10 000 mAh, men du får den snabbaste laddningen i klassen, tre uttag och en sladd du inte kan glömma, och det är de tre sakerna som avgör om en powerbank används eller ligger i en låda.",
  },
  {
    id: "linocell-premium-30w-10000",
    brand: "Linocell",
    name: "Premium Powerbank 30 W 10000 mAh",
    shortName: "Linocell Premium 30 W",
    image: productImage(POWERBANK.slug, "linocell-premium-30w-10000"),
    tagline: "30 watt och utskrivna wattimmar för 499 kronor.",
    scores: {
      kapacitet: 4.5,
      /* 30 W PD via USB-C, 15 W QC via USB-A, max total 30 W, laddas på
         ca 2,5 h. Näst bäst efter Anker. */
      laddeffekt: 4,
      /* Anger 10 000 mAh (36 Wh), effekt per port, laddtid och standarder. */
      redovisning: 4.5,
      /* Vikt och mått saknas i butiken. */
      format: 3,
      /* 300 kronor billigare än Anker för nästan samma sak. */
      prisvarde: 4.5,
    },
    price: 499.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-premium-powerbank-30-w-10000-mah-p80198",
    userRating: { value: 4.5, count: 40, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst för fart till lågt pris",
    pros: [
      "30 W via USB-C, samma laddfart som klassens dyraste",
      "10 000 mAh motsvarar 36 wattimmar, utskrivet",
      "Både USB-C och USB-A, så äldre kablar fungerar",
      "Laddas själv på ungefär två och en halv timme",
      "300 kronor billigare än den snabbaste",
    ],
    cons: [
      "Vikt och mått är okända, så fickvänligheten går inte att bedöma",
      "Ingen kabel sitter fast, alltså en sladd till att hålla reda på",
      "Ingen trådlös laddning",
      "Max 30 W totalt, så två enheter samtidigt delar på effekten",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "499,90 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "10 000 mAh", highlight: true },
      { label: "Energiinnehåll", value: "36 Wh" },
      { label: "Uteffekt", shortLabel: "Ut", value: "30 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "2 st", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Nej", highlight: true },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Porttyper", value: "1× USB-C, 1× USB-A" },
      { label: "Power Delivery", value: "Ja, USB PD 3.0 via USB-C" },
      { label: "Quick Charge", value: "Ja, QC 3.0 via båda portarna" },
      { label: "Laddningstid", value: "Ca 2,5 h" },
      { label: "Inbyggd kabel", value: "Nej" },
      { label: "Artikelnummer", value: "80198" },
    ],
    verdict:
      "Linocell Premium 30 W rymmer 10 000 mAh och kostar 499,90 kronor. Den laddar lika fort som klassens dyraste och kostar 300 kronor mindre.\n\n**30 watt via USB-C är samma effekt som toppmodellen ger**, och i praktiken betyder det att en iPhone går från tom till ungefär halv på en halvtimme. Att den dessutom har en USB-A-port gör att alla äldre kablar i byrålådan fortfarande fungerar, vilket den renodlat moderna konkurrensen har slutat med. Den fyller sig själv på ungefär två och en halv timme.\n\nDen är också en av två här som skriver ut energiinnehållet: 10 000 mAh motsvarar 36 wattimmar. Det talet är värt mer än det ser ut, eftersom det är i wattimmar reglerna för flyg är skrivna, och 36 ligger tryggt under varje gräns som finns.\n\nDet du inte får veta är hur stor och tung den är. Varken vikt eller mått finns att läsa före köpet, och i en klass där skillnaden mellan modellerna är 70 gram är det en verklig lucka för den som tänker bära den i fickan varje dag.\n\nSka du ha fart och kapacitet till lägsta möjliga pris är det här köpet. Vill du slippa hålla reda på en kabel kostar Anker Nano 300 kronor mer och har en fastsittande.",
  },
  {
    id: "linocell-magnetisk-10000",
    brand: "Linocell",
    name: "Magnetisk powerbank 10 000 mAh",
    shortName: "Linocell Magnetisk 10 000",
    image: productImage(POWERBANK.slug, "linocell-magnetisk-10000"),
    tagline: "Fäster på iPhone och laddar trådlöst med 15 watt.",
    scores: {
      kapacitet: 4,
      /* 15 W ut både trådlöst och via USB-C. Halva Ankers effekt. */
      laddeffekt: 2.5,
      /* Full specruta med effekt per spänning, mått, vikt och laddtid, men
         ingen wattimme. */
      redovisning: 3,
      /* 200 g är tyngst i jämförelsen, men magnetfästet är en verklig fördel. */
      format: 3,
      prisvarde: 3.5,
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
      "15 W trådlöst, alltså den snabbaste trådlösa laddningen här",
      "357 kundbetyg på 4,5, det bredaste underlaget i jämförelsen",
      "USB-C-kabel medföljer",
      "Full specifikation med effekt, mått, vikt och laddtid",
    ],
    cons: [
      "200 gram gör den till den tyngsta i jämförelsen",
      "Max 15 W via kabel, alltså halva effekten mot de snabbaste",
      "Laddar sig själv på tre till fyra timmar",
      "Energiinnehållet i wattimmar är okänt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "399,90 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "10 000 mAh", highlight: true },
      { label: "Energiinnehåll", value: "Ej angiven" },
      { label: "Uteffekt", shortLabel: "Ut", value: "15 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "1 st", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Ja, upp till 15 W", highlight: true },
      { label: "Vikt", value: "200 g" },
      { label: "Porttyper", value: "1× USB-C" },
      { label: "Mått", value: "103 × 67 × 21 mm" },
      { label: "Laddningstid", value: "Ca 3–4 h" },
      { label: "Inbyggd kabel", value: "Nej, USB-C-kabel medföljer" },
      { label: "Artikelnummer", value: "20623" },
    ],
    verdict:
      "Linocell Magnetisk 10 000 mAh kostar 399,90 kronor och fäster på baksidan av telefonen utan sladd.\n\n**Magnetfästet ändrar hur en powerbank används.** I stället för att ligga i väskan med en sladd som ska dras fram sitter den fast på telefonen medan du går, och det gör att den faktiskt kommer till användning under dagen i stället för bara i nödfall. 15 watt trådlöst är dessutom den snabbaste trådlösa laddningen i jämförelsen.\n\nMed 357 kundbetyg på 4,5 är den också den mest omdömda produkten här. Det säger inget om hur mycket ström som kommer ut, men mycket om att magnetfästet håller och att den fungerar i vardagen hos ett stort antal människor.\n\n**Priset är vikten.** 200 gram är tyngst av allt i jämförelsen och 70 gram mer än de tunnaste, vilket märks tydligt när den sitter fast på en telefon du håller i handen. Kabelanslutningen stannar dessutom på 15 watt, alltså halva farten mot de snabbaste, så har du bråttom är det inte den här du ska välja.\n\nHar du en iPhone 12 eller senare och vill slippa sladden är den värd sina pengar. Vill du ha samma kapacitet men fart och lägre vikt tar du Linocell Premium 30 W, som kostar hundra kronor mer och laddar dubbelt så snabbt.",
  },
  {
    id: "anker-maggo-slim-5k",
    brand: "Anker",
    name: "MagGo Powerbank Slim 5k Qi2",
    shortName: "Anker MagGo Slim",
    image: productImage(POWERBANK.slug, "anker-maggo-slim-5k"),
    tagline: "8,6 millimeter tunn, med Qi2 och inbyggd USB-C-kontakt.",
    scores: {
      /* 5 000 mAh, alltså halva klassens topp. */
      kapacitet: 2.5,
      /* 22,5 W ut är näst bäst, och Qi2 är den nyare trådlösa standarden. */
      laddeffekt: 3.5,
      redovisning: 3,
      /* 8,6 mm tjock är det tunnaste här, men 130 g för 5 000 mAh är inte
         lätt räknat per wattimme. */
      format: 4,
      /* 599 kr för 5 000 mAh är dyrast per mAh i jämförelsen. */
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
      "8,6 millimeter tjock, tunnast i jämförelsen",
      "Qi2, den nyare trådlösa standarden med magnetfäste",
      "22,5 W uteffekt, näst snabbast här",
      "USB-C-kontakt sitter inbyggd i enheten",
    ],
    cons: [
      "5 000 mAh räcker till ungefär en telefonladdning, inte två",
      "599 kronor för halva kapaciteten gör den dyrast per milliamperetimme",
      "Energiinnehållet i wattimmar är okänt",
      "130 gram är mycket för 5 000 mAh, alltså tungt räknat per laddning",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "599 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "5 000 mAh", highlight: true },
      { label: "Energiinnehåll", value: "Ej angiven" },
      { label: "Uteffekt", shortLabel: "Ut", value: "22,5 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "1 st", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Ja, Qi2", highlight: true },
      { label: "Vikt", value: "130 g" },
      { label: "Porttyper", value: "Inbyggd USB-C-kontakt" },
      { label: "Mått", value: "102 × 76 × 8,6 mm" },
      { label: "Display", value: "LED-indikator" },
      { label: "Artikelnummer", value: "80237" },
    ],
    verdict:
      "Anker MagGo Slim är 8,6 millimeter tjock, rymmer 5 000 mAh och kostar 599 kronor.\n\n**Tjockleken är hela argumentet.** Med telefonen på baksidan blir paketet fortfarande tunt nog för en innerficka eller ett litet handväskefack, och det är skillnaden mellan att ta med den och att låta bli. Qi2 är dessutom den nyare trådlösa standarden, vilket ger stabilare magnetfäste och snabbare trådlös laddning än den äldre generationen.\n\n22,5 watt via kabel är näst snabbast i jämförelsen, och USB-C-kontakten sitter inbyggd i enheten så att den kan laddas utan lös sladd.\n\n**Sedan kommer räkningen som avgör.** 5 000 mAh är ungefär en full telefonladdning, inte två, och för det betalar du 599 kronor. Linocell Magnetisk 10 000 mAh kostar 200 kronor mindre och rymmer dubbelt så mycket. Räknat per milliamperetimme är det här den dyraste produkten i jämförelsen med bred marginal, och de 130 grammen är dessutom mycket för halv kapacitet.\n\nBetalar du för tjockleken är den värd pengarna, och den som burit en tjock powerbank i kavajfickan vet varför. Ska du klara en hel dag borta från uttag räcker den inte, och då är det de tio tusen du ska titta på.",
  },
  {
    id: "linocell-magnetisk-5000",
    brand: "Linocell",
    name: "Magnetisk powerbank 5000 mAh",
    shortName: "Linocell Magnetisk 5000",
    image: productImage(POWERBANK.slug, "linocell-magnetisk-5000"),
    tagline: "Magnetladdning till iPhone för under trehundra.",
    scores: {
      kapacitet: 2.5,
      /* Max 12 W totalt, lägst i jämförelsen. */
      laddeffekt: 2,
      redovisning: 3,
      /* 128 g, alltså lättast här, men 13 mm tjock. */
      format: 3.5,
      prisvarde: 3.5,
    },
    price: 299.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-magnetisk-powerbank-5000-mah-p20622",
    userRating: { value: 4.5, count: 334, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för att prova magnetladdning",
    pros: [
      "Billigaste magnetiska powerbanken i jämförelsen",
      "128 gram, lättast av alla här",
      "334 kundbetyg på 4,5",
      "Laddas själv på ungefär två timmar",
      "USB-C-kabel medföljer",
    ],
    cons: [
      "Max 12 W totalt gör den till den långsammaste i jämförelsen",
      "5 000 mAh räcker till ungefär en telefonladdning",
      "Energiinnehållet i wattimmar är okänt",
      "Bara en port, så inget andra uttag för en kompis telefon",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "299,90 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "5 000 mAh", highlight: true },
      { label: "Energiinnehåll", value: "Ej angiven" },
      { label: "Uteffekt", shortLabel: "Ut", value: "12 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "1 st", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Ja, upp till 10 W", highlight: true },
      { label: "Vikt", value: "128 g" },
      { label: "Porttyper", value: "1× USB-C" },
      { label: "Mått", value: "103 × 67 × 13 mm" },
      { label: "Laddningstid", value: "Ca 2 h" },
      { label: "Inbyggd kabel", value: "Nej, USB-C-kabel medföljer" },
      { label: "Artikelnummer", value: "20622" },
    ],
    verdict:
      "Linocell Magnetisk 5000 mAh kostar 299,90 kronor och är den billigaste vägen till magnetladdning i jämförelsen.\n\n**Den väger 128 gram, mindre än allt annat här**, och är 13 millimeter tjock. Med 334 kundbetyg på 4,5 är den dessutom en av hyllans mest köpta, vilket för en magnetisk produkt främst säger att fästet håller. En USB-C-kabel följer med, så du kommer igång utan att köpa något extra, och den fyller sig själv på ungefär två timmar.\n\nDen laddar telefonen trådlöst med upp till 10 watt och via kabeln med sammanlagt högst 12.\n\n**Det talet är också dess gräns.** 12 watt är den lägsta effekten i hela jämförelsen, ungefär en tredjedel av vad de snabbaste ger, och skillnaden märks varje gång du har en halvtimme och vill ha så mycket batteri som möjligt. Till det kommer att 5 000 mAh är ungefär en telefonladdning, och att bara en port betyder att ingen annan kan låna ström samtidigt.\n\nVill du prova om magnetladdning passar dig utan att lägga sexhundra kronor är den här rätt ingång. Vet du redan att du vill ha det tar du tiotusenmodellen för hundra kronor mer.",
  },
  {
    id: "anker-nano-45w-10000",
    brand: "Anker",
    name: "Nano Powerbank 10 000 mAh 45 W",
    shortName: "Anker Nano 45 W",
    image: productImage(POWERBANK.slug, "anker-nano-45w-10000"),
    tagline: "45 watt ut, högsta effekten i klassen.",
    scores: {
      kapacitet: 4,
      /* 45 W är högst i klassen och räcker till en lättare bärbar dator. */
      laddeffekt: 5,
      /* ⚠️ Ingen specifikationsruta alls i butiken. Varken vikt, mått,
         portar, wattimmar eller laddtid går att läsa före köp. */
      redovisning: 1,
      format: 3,
      prisvarde: 3,
    },
    price: 699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-nano-powerbank-10-000-mah-45-w-vit-p80232",
    userRating: { value: 5, count: 27, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för att ladda datorn",
    pros: [
      "45 W uteffekt, högst i jämförelsen",
      "Räcker till en lättare bärbar dator och inte bara till telefonen",
      "10 000 mAh, full kapacitet i klassen",
      "5,0 i snittbetyg av 27 kunder",
    ],
    cons: [
      "Varken vikt, mått, portar eller laddtid går att läsa före köp",
      "Energiinnehållet i wattimmar är okänt",
      "699 kronor utan att du vet vad du får utöver effekten",
      "Ingen trådlös laddning",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "699 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "10 000 mAh", highlight: true },
      { label: "Energiinnehåll", value: "Ej angiven" },
      { label: "Uteffekt", shortLabel: "Ut", value: "45 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "Ej angiven", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Nej", highlight: true },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Artikelnummer", value: "80232" },
    ],
    verdict:
      "Anker Nano 45 W rymmer 10 000 mAh, ger 45 watt ut och kostar 699 kronor.\n\n**45 watt är den högsta effekten i hela jämförelsen** och flyttar produkten till en annan användning. Det räcker inte bara till en telefon i full fart, utan till en lättare bärbar dator, en surfplatta eller två enheter som laddar rejält samtidigt. Har du en dator som laddas via USB-C är det här den enda i klassen som gör verklig nytta på ett tåg.\n\nMed 5,0 i snitt av 27 kunder ligger den dessutom högst i betyg av allt här.\n\n**Men du köper den nästan blint.** Vikten, måtten, hur många portar den har, hur lång tid den tar att ladda och hur många wattimmar den rymmer går inte att läsa någonstans före köpet. I en klass där skillnaden mellan modellerna är 70 gram och där wattimmen avgör vad som får följa med i kabinen är det ovanligt lite att gå på för sjuhundra kronor.\n\nBehöver du ladda en dator och inte bara en telefon finns det inget alternativ här, och då är den värd pengarna. Ska den bara hålla telefonen igång gör Linocell Premium 30 W samma jobb för tvåhundra kronor mindre, och där kan du dessutom läsa vad du får.",
  },
  {
    id: "linocell-10000-20w",
    brand: "Linocell",
    name: "Powerbank 10000 mAh med 20 W laddning",
    shortName: "Linocell 10000",
    image: productImage(POWERBANK.slug, "linocell-10000-20w"),
    tagline: "Tio tusen milliamperetimmar för 249 kronor.",
    scores: {
      kapacitet: 4,
      laddeffekt: 3,
      /* ⚠️ Ingen specifikationsruta alls, trots 303 kundbetyg. */
      redovisning: 1,
      format: 2.5,
      /* Billigast per mAh i jämförelsen. */
      prisvarde: 4.5,
    },
    price: 249.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/linocell-powerbank-10000-mah-med-20w-laddning-svart-p80206",
    userRating: { value: 4.5, count: 303, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för lådan i hallen",
    pros: [
      "Billigast per milliamperetimme i jämförelsen",
      "10 000 mAh för 249,90 kronor",
      "20 W laddning, tillräckligt för en telefon i rimlig fart",
      "303 kundbetyg på 4,5",
    ],
    cons: [
      "Varken vikt, mått, portar eller laddtid går att läsa före köp",
      "Energiinnehållet i wattimmar är okänt",
      "20 W är en tredjedel långsammare än klassens snabbaste",
      "Ingen trådlös laddning och ingen display",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "249,90 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "10 000 mAh", highlight: true },
      { label: "Energiinnehåll", value: "Ej angiven" },
      { label: "Uteffekt", shortLabel: "Ut", value: "20 W", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "Ej angiven", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Nej", highlight: true },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Artikelnummer", value: "80206" },
    ],
    verdict:
      "Linocell 10000 mAh kostar 249,90 kronor och är den billigaste vägen till full kapacitet i klassen.\n\n**Räknat per milliamperetimme är ingenting här i närheten.** Du får lika mycket ström som produkter för tre gånger priset, och 20 watt laddar en telefon i fullt rimlig fart, bara inte i den snabbaste. Med 303 kundbetyg på 4,5 är den dessutom en av hyllans mest köpta, vilket säger att den håller vad en powerbank ska hålla.\n\nDet gör den till precis rätt produkt för en bestämd uppgift: den som ska ligga i lådan i hallen, i bilen eller i ryggsäcken och finnas där den dagen någon har slut på batteri.\n\n**Vad du inte får veta är i stort sett allt annat.** Vikt, mått, antal portar, laddtid och wattimmar saknas i butiken, och det är ovanligt magert för kategorins näst mest omdömda produkt. Vill du veta om den ryms i fickan eller hur många uttag den har får du köpa den och se efter.\n\nSka den ligga och vänta någonstans är det ingen förlust och priset är rätt. Ska den följa med varje dag och laddas snabbt är det de trehundra extra till Linocell Premium 30 W som är de mest välanvända i hela jämförelsen.",
  },
  {
    id: "linocell-5000",
    brand: "Linocell",
    name: "Powerbank 5000 mAh",
    shortName: "Linocell 5000",
    image: productImage(POWERBANK.slug, "linocell-5000"),
    tagline: "Billigast i jämförelsen, 149 kronor.",
    scores: {
      kapacitet: 2,
      laddeffekt: 2,
      redovisning: 1,
      format: 3,
      /* Lägsta priset i jämförelsen med marginal. */
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
      "149,90 kronor, lägsta priset i jämförelsen",
      "5 000 mAh räcker till att få tillbaka en tom telefon",
      "222 kundbetyg på 4,5",
      "Liten nog att ligga i en jackficka utan att märkas",
    ],
    cons: [
      "Varken vikt, mått, effekt eller portar går att läsa före köp",
      "Energiinnehållet i wattimmar är okänt",
      "5 000 mAh räcker till ungefär en laddning",
      "Ingen trådlös laddning och ingen display",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "149,90 kr", highlight: true },
      { label: "Kapacitet", shortLabel: "mAh", value: "5 000 mAh", highlight: true },
      { label: "Energiinnehåll", value: "Ej angiven" },
      { label: "Uteffekt", shortLabel: "Ut", value: "Ej angiven", highlight: true },
      { label: "Antal portar", shortLabel: "Portar", value: "Ej angiven", highlight: true },
      { label: "Trådlös laddning", shortLabel: "Trådlöst", value: "Nej", highlight: true },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Artikelnummer", value: "80205" },
    ],
    verdict:
      "Linocell Powerbank 5000 mAh kostar 149,90 kronor och är billigast i jämförelsen.\n\n**Den gör en sak och den gör den för under en femtiolapp per tusen milliamperetimmar:** ger dig tillbaka en telefon som dött. 5 000 mAh räcker ungefär till en full laddning, vilket är precis vad som behövs den dagen du glömt ladda över natten. Med 222 kundbetyg på 4,5 är den en av hyllans mest köpta, och den är liten nog att ligga i en jackficka utan att kännas.\n\n**Sedan tar uppgifterna slut.** Uteffekten, vikten, måtten, antalet portar och wattimmarna går inte att läsa någonstans i butiken. Du vet alltså inte hur fort den laddar, hur mycket den väger eller om den har ett eller två uttag förrän du står med den i handen. För 149 kronor är insatsen låg, men det är ändå den tunnaste produktinformationen i hela jämförelsen.\n\nDet finns ett läge där den ändå är rätt: som andra powerbank, den som ligger i bilen eller i necessären och aldrig behöver vara bäst på något. Ska den vara din enda är fem tusen för lite, och då är Linocell 10000 hundra kronor dyrare och rymmer dubbelt så mycket.",
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
      "Utanför den storleksklass sidan rankar. 25 000 mAh och 90 wattimmar hör till rese- och laptopklassen, där både vikten och flygreglerna ser annorlunda ut, och den jämförs på systersidan i stället. Den är värd att nämna här ändå, eftersom den är en av få produkter i hela hyllan som skriver ut sina wattimmar, och 90 av 100 tillåtna är nära nog gränsen för att talet ska spela roll när du packar.",
  },
  {
    brand: "Anker",
    name: "Prime Powerbank 300 W PD 3.1 26 250 mAh",
    approxPrice: 2490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/ladda-koppla/powerbank/anker-prime-powerbank-300-w-pd-3.1-26250-mah-p88933",
    reason:
      "Också utanför storleksklassen, och sidans dyraste granne på 2 490 kronor. Den tas upp här för en enda uppgifts skull: den anger 99,75 wattimmar mot en gräns på 100. Marginalen är en fjärdedels wattimme, alltså är produkten konstruerad för att precis rymmas under flyggränsen, och det är därför talet står utskrivet. Jämförs på systersidan.",
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
      "Räkna med ungefär två gånger, inte tre. En modern telefon har ett batteri på mellan 3 000 och 5 000 mAh, så på papperet ser tre laddningar rimliga ut. Men powerbankens tal gäller cellen vid dess egen spänning, omkring 3,6 till 3,7 volt, medan telefonen laddas vid 5 volt eller mer. Omvandlingen mellan de två kostar energi, och en del försvinner dessutom som värme i kabeln och i telefonen. Det som återstår ligger typiskt kring 60 till 70 procent av det nominella talet. En bank på 10 000 mAh ger alltså en normal telefon ungefär två fulla laddningar, och en bank på 5 000 mAh ungefär en.",
  },
  {
    question: "Vad betyder Wh på en powerbank, och varför står det sällan?",
    answer:
      "Wattimmar är energi, och det är den enhet som avgör om powerbanken får följa med på flyget. Milliamperetimmar mäter laddningsmängd vid en viss spänning och säger därför inget ensamt. Omräkningen är kapaciteten i amperetimmar gånger cellspänningen, så 10 000 mAh vid 3,7 volt blir 37 wattimmar. Att talet sällan står i butiken är produktens problem och inte ditt: av de åtta powerbanks vi jämför anger två sitt energiinnehåll i wattimmar. Vi räknar inte om åt de övriga, eftersom cellspänningen varierar och de två tillverkare som faktiskt räknat anger 36 respektive 37 wattimmar för samma nominella tiotusen.",
  },
  {
    question: "Får jag ta med en powerbank på flyget?",
    answer:
      "Ja, i handbagaget, och nej i det incheckade. Transportstyrelsen anger att lösa litiumjonbatterier inklusive powerbanks upp till 100 wattimmar får tas med i kabinen men inte checkas in. Mellan 100 och 160 wattimmar gäller fortfarande handbagage, då högst två batterier och med flygbolagets godkännande. Över 160 wattimmar får de inte tas med alls. Det praktiska av det för den här storleksklassen: en powerbank på 5 000 eller 10 000 mAh landar på 18 till 37 wattimmar och är alltid tillåten i kabinen. Regeln som oftare ställer till det är den andra, att den aldrig får ligga i väskan du checkar in, och den gäller även den minsta.",
  },
  {
    question: "Hur stor powerbank ska jag välja?",
    answer:
      "Utgå från hur länge du är borta från ett uttag. Är svaret en dag i stan räcker 5 000 mAh, som ger tillbaka en tom telefon en gång och väger runt 130 gram. Är svaret en hel dag ute, en flygresa eller en helg utan säker tillgång till el är 10 000 mAh rätt storlek, alltså ungefär två laddningar. Ska en bärbar dator laddas behöver du både mer kapacitet och högre effekt, minst 45 watt, och då är det den större klassen du ska titta på. Köp inte större än du behöver: kapacitet kostar vikt, och en powerbank som är för tung för fickan blir liggande hemma och laddar därför ingenting alls.",
  },
  {
    question: "Vad betyder watt på en powerbank?",
    answer:
      "Watt är laddfarten, och den finns i två riktningar som båda spelar roll. Uteffekten avgör hur fort telefonen fylls: 12 watt är långsamt, 20 watt är rimligt, och 30 watt tar en iPhone från tom till ungefär halv på en halvtimme. Ineffekten avgör hur fort powerbanken själv laddas, och den är lätt att glömma trots att en bank som tar fyra timmar ofta står tom när du ska iväg. Har powerbanken flera portar delar de dessutom oftast på en gemensam maxeffekt, så två telefoner samtidigt laddas långsammare än en. Leta efter USB Power Delivery, förkortat PD, som är den standard telefoner och datorer använder för snabbladdning.",
  },
  {
    question: "Är magnetiska powerbanks värda pengarna?",
    answer:
      "De är värda det om du faktiskt använder telefonen medan den laddas. En magnetisk bank fäster på baksidan av en iPhone 12 eller senare och laddar utan sladd, vilket gör att den kan sitta kvar medan du går, pratar eller står på en perrong. Det är skillnaden mellan en powerbank som används under dagen och en som bara kommer fram i nödfall. Två saker talar emot. Trådlös laddning är långsammare och förlorar mer energi som värme än en kabel gör, så du får ut mindre av samma batteri. Och de magnetiska modellerna väger mer per milliamperetimme: den tyngsta i vår jämförelse är en magnetisk på 200 gram. Har du Android utan magnetring i skalet är frågan dessutom sällan aktuell.",
  },
  {
    question: "Kan jag ladda powerbanken och telefonen samtidigt?",
    answer:
      "På vissa modeller, och funktionen kallas genomladdning eller pass-through. Den är praktisk på resa, eftersom ett vägguttag på hotellrummet då räcker till både telefonen och banken över natten. Alla har den inte, och den anges inte alltid i butiken. Två saker är värda att veta om du använder den. Powerbanken blir varmare när den laddar och laddas samtidigt, vilket på sikt sliter på cellen mer än vanlig användning. Och laddningen av själva banken går långsammare, eftersom en del av effekten går rakt igenom till telefonen. Ska du bara ladda en sak i taget är funktionen inget att betala extra för.",
  },
  {
    question: "Hur länge håller en powerbank?",
    answer:
      "Räkna med några år av normal användning, men talet som avgör publiceras nästan aldrig. Ett litiumjonbatteri åldras av laddcykler och av värme, och tillverkare anger ibland hur många cykler cellen klarar innan kapaciteten fallit till 80 procent. Ingen av produkterna i vår jämförelse anger något sådant tal i butiken. Det du själv kan göra spelar mer roll än märket: undvik att förvara den fulladdad i värme, till exempel i en bil på sommaren, och låt den inte ligga helt urladdad i månader. En powerbank som används och laddas då och då mår bättre än en som ligger orörd i en låda i tre år.",
  },
];
