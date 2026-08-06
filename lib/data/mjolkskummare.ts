import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { MJOLKSKUMMARE } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /mjolkskummare.
 *
 * Första sidan i gruppen Kök, byggd 2026-08-05. Sidan rankar elektriska
 * mjölkskummare med värmeelement. Manuella pumpskummare och handhållna
 * batterivispar förklaras i köpguiden och rankas inte, efter användarbeslut.
 *
 * Priser, artikelnummer, GTIN och kundbetyg är lästa hos butiken på
 * PRICE_CHECKED, i produktsidans egen JSON-LD och specifikationstext.
 * Kapacitetstalen är lästa hos **tillverkaren** där de publiceras.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans. Se lib/links.ts.
 *
 * ## Kapaciteten är två tal, och handeln blandar ihop dem
 *
 * `Skumkapacitet` är hur mycket skum apparaten gör. `Uppvärmningskapacitet` är
 * hur mycket mjölk den kan värma utan att skumma. De skiljer ungefär på hälften,
 * och talet i modellnamnet är genomgående det senare.
 *
 * **Fyra olika konventioner ligger sida vid sida i svensk handel**, uppmätt
 * 2026-08-05:
 *
 * - **Severin** publicerar båda talen för varje modell. Spuma 500 skummar
 *   120–260 ml och värmer 120–500. Genom hela sortimentet är skummaxet halva
 *   det tal produkten heter.
 * - **Wilfa** anger 150–250 ml, och hos dem är det **skummaxet**. Tvärtemot
 *   Severin är alltså talet i namnet, MF1B-250, det du får skum av.
 * - **Sage** anger ingen milliliter alls utan "3 koppar skummad mjölk".
 * - **Philips** anger 120 ml och räknar själv om det till två cappuccino, men
 *   publicerar ingen uppvärmningskapacitet.
 *
 * Och Coffee Friends fält `Kapacitet (vätskor)` bär skummaxet för Bialetti
 * MKF02 och värmemaxet för Bialetti MK01. Samma butik, samma fabrikat,
 * motsatt konvention.
 *
 * ⚠️ Därför ligger `Skumkapacitet`, `Uppvärmningskapacitet` och
 * `Skumtemperatur` i `ALDRIG_BEDOMD`. Severins kvot på hälften frestar till
 * omräkning och gäller ett enda fabrikat.
 *
 * ## Gap-passet 2026-08-06 tog bort fyra av fem tomma celler
 *
 * Sidan byggdes med tre produkter utan betyg på `skumkapacitet` — Melitta, Sage
 * och Alessi — därför att de inte ansågs publicera något skummax. **Två av tre
 * gjorde det, på den produktsida vi själva länkar:**
 *
 * - **Melitta Cremio** skummar 100–150 ml och värmer 100–250. Coffee Friends
 *   produkttext, bekräftat i Melittas egen bruksanvisning 6758122-04 s. 4.
 * - **Alessi Plissé** skummar 200 ml och värmer 350. Coffee Friends produkttext;
 *   kannan bekräftad av Alessi själva (MDL13B, 11.8 fl oz).
 * - **Sage the Milk Café** anger fortfarande bara "3 koppar" och står kvar utan
 *   betyg på kriteriet. Där fördelar `weightedRating` om vikten, vilket är rätt
 *   mekanism: att sänka betyget för en cell vi inte fyllt hade betygsatt vår
 *   research i stället för apparaten.
 *
 * Samtidigt föll tre andra påståenden: **RIG-TIG Foodie har ett kallskumsläge**
 * och tre program, inte två, och den **tål inte maskindisk** — allt tre sagt av
 * RIG-TIG själva. **CHiATO milkPLAY får aldrig sänkas i vatten**, sagt i
 * tillverkarens egen bruksanvisning. Och **Sage har en steglös temperaturratt
 * mellan 40 och 80 grader**, som stod i manualen hela tiden.
 *
 * Betygsändringarna är loggade i `lib/corrections.ts`.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte skummat en liter mjölk. Råd & Rön har provat 18 elektriska
 * mjölkskummare med labbmetod, men resultaten per modell ligger bakom betalvägg
 * vi inte betalat, och inget av dem knyts till en produkt här. Vi vet alltså
 * inte vilken modell som vann deras test och påstår det aldrig.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "wilfa-silky-mf1b-250",
    brand: "Wilfa",
    name: "Silky MF1B-250",
    shortName: "Wilfa Silky",
    image: productImage(MJOLKSKUMMARE.slug, "wilfa-silky-mf1b-250"),
    tagline: "Fem program, och ett av dem är gjort för latte art.",
    scores: {
      /* Skummar 150–250 ml enligt Wilfa själva, alltså fyra koppar i övre
         läget. Bara Severins två största gör mer. */
      skumkapacitet: 4,
      /* Fem program: varmt skum, latte art, varm omrörning, varm choklad och
         kallt skum, med egen temperatur per program. Enda apparaten där ett
         program är utpekat för växtbaserad dryck. */
      mjolktyper: 5,
      /* 699 kr hos KitchenTime mot 999 hos Wilfa själva, och fem års garanti. */
      prisvarde: 4.5,
      /* Löstagbar glaskanna, diskmaskinssäkra delar, magnetisk visp som lyfts
         av utan verktyg. */
      rengoring: 4.5,
    },
    price: 699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/wilfa/wilfa-silky-mf1b250-mjolkskummare/",
    award: "winner",
    superlative: "Bäst för latte art hemma",
    pros: [
      "Skummar 150 till 250 ml, alltså två till fyra koppar i samma körning",
      "Fem program med egen temperatur: varmt skum 65 grader, latte art 60",
      "Eget program för växtbaserad dryck",
      "Kallt skum till iskaffe utan att mjölken värms",
      "Löstagbar glaskanna som får gå i diskmaskinen",
      "Fem års garanti, mot två hos de flesta",
    ],
    cons: [
      "600 watt gör den till en av de strömtörstigare i jämförelsen",
      "Latte art-programmet tar 2 minuter och 45 sekunder, alltså längre än de enklare apparaterna",
      "Skummar man under 150 ml svämmar den över, så en enda liten kopp är fel användning",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "699 kr", highlight: true },
      { label: "Skumkapacitet", shortLabel: "Skum", value: "150–250 ml", highlight: true },
      { label: "Uppvärmningskapacitet", shortLabel: "Värmer", value: "Ej angiven", highlight: true },
      { label: "Antal program", shortLabel: "Program", value: "5 st", highlight: true },
      { label: "Skumtemperatur", shortLabel: "Temp", value: "65–75 °C", highlight: true },
      { label: "Maskindisk", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Kallskum", value: "Ja" },
      { label: "Effekt", value: "600 W" },
      { label: "Uppvärmningsteknik", value: "Magnetisk visp" },
      { label: "Löstagbar kanna", value: "Ja" },
      { label: "Material kanna", value: "Glas" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "605931" },
    ],
    verdict:
      "Wilfa Silky MF1B-250 skummar 150 till 250 ml och kostar 699 kronor hos KitchenTime. Det är fyra koppar skum i övre läget, till under halva priset för den apparat som gör mest i jämförelsen.\n\n**Fem program med var sin temperatur är det som skiljer den från allt annat här.** Varmt skum värmer mjölken till 65 grader och ger det tjocka skummet till cappuccino. Latte art går till 60 grader och lämnar ett finare mikroskum som faktiskt går att hälla ett mönster med, vilket är skillnaden mellan en latte och en latte som ser ut som på kafé. Varm choklad går upp till 75. Att temperaturen följer programmet i stället för att vara en enda inställning är ovanligt i den här prisklassen.\n\n**Ett av programmen är gjort för växtbaserad dryck**, och det är den enda apparaten i jämförelsen där tillverkaren pekat ut ett. Havre och soja beter sig annorlunda än komjölk i en skummare, så för den som aldrig häller mjölk i kaffet är det skillnaden mellan att apparaten fungerar och att den nästan gör det. Till det kommer kallt skum till iskaffe, och en glaskanna som lyfts av och ställs i diskmaskinen.\n\nDen har en verklig gräns: fyller du under 150 ml svämmar den över när skummet expanderar. Ska du göra en enda liten kopp är det fel apparat, och då är Philips Milk Twister på 120 ml den som passar. Alla andra köper den här.",
  },
  {
    id: "severin-spuma-700-sm-3586",
    brand: "Severin",
    name: "Spuma 700 SM 3586",
    shortName: "Severin Spuma 700",
    image: productImage(MJOLKSKUMMARE.slug, "severin-spuma-700-sm-3586"),
    tagline: "350 ml skum, alltså sex koppar utan påfyllning.",
    scores: {
      /* 120–350 ml skum är mest i jämförelsen med marginal. */
      skumkapacitet: 5,
      /* Varmt och kallt skum plus justerbar temperatur mellan 45 och 65 grader,
         men inget utpekat program för växtbaserad dryck. */
      mjolktyper: 4,
      /* 1 290 kr, alltså nästan dubbelt mot vinnaren. */
      prisvarde: 3.5,
      /* Induktion under en löstagbar rostfri behållare, alltså inget
         värmeelement i kärlet. Går i maskin. */
      rengoring: 5,
    },
    price: 1290,
    priceCheckedAt: "2026-08-06",
    merchant: "KitchenTime",
    /* ⚠️ Länken pekade till 2026-08-06 på `severin-sm-3586-sp500-…`, som trots
       talet 3586 i sökvägen är butikens sida för **SM 3585 Spuma 500**. Den här
       produkten är SM 3586 Spuma 700, och köparen landade alltså på fel modell.
       Rätt sida läst 2026-08-06: 1 290 kr, skummar 120–350, värmer 120–700,
       45–65 °C, mjölkbehållaren tål maskindisk. */
    merchantUrl:
      "https://www.kitchentime.se/varumarken/severin/severin-sm-3586-spuma-700-mjolkskummare/",
    award: "premium",
    superlative: "Bäst för helgfrukost med gäster",
    pros: [
      "Skummar upp till 350 ml, alltså ungefär sex koppar i en körning",
      "Värmer upp till 700 ml när du bara vill ha varm mjölk eller choklad",
      "Temperaturen ställs steglöst mellan 45 och 65 grader",
      "Induktion under kannan, så värmen sitter inte i kärlet",
      "Löstagbar rostfri behållare som tål maskindisk",
    ],
    cons: [
      "1 290 kronor är nästan dubbelt mot vinnaren för samma sorts skum",
      "Inget program utpekat för havre eller soja",
      "Bara 350 av 700 ml går att skumma, så halva kannan är till för varm mjölk",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 290 kr", highlight: true },
      { label: "Skumkapacitet", shortLabel: "Skum", value: "120–350 ml", highlight: true },
      { label: "Uppvärmningskapacitet", shortLabel: "Värmer", value: "120–700 ml", highlight: true },
      { label: "Antal program", shortLabel: "Program", value: "4 st", highlight: true },
      { label: "Skumtemperatur", shortLabel: "Temp", value: "45–65 °C", highlight: true },
      { label: "Maskindisk", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Kallskum", value: "Ja" },
      { label: "Effekt", value: "500 W" },
      { label: "Uppvärmningsteknik", value: "Induktion" },
      { label: "Löstagbar kanna", value: "Ja" },
      { label: "Material kanna", value: "Rostfritt stål" },
      { label: "Kannvolym", value: "700 ml" },
      { label: "Artikelnummer", value: "SM3586" },
    ],
    verdict:
      "Severin Spuma 700 skummar upp till 350 ml och kostar 1 290 kronor. Det är mest skum i jämförelsen med god marginal, och ungefär sex koppar cappuccino i en enda körning.\n\n**Talet 700 i namnet är hur mycket mjölk den värmer, inte hur mycket den skummar.** Skummar gör den 120 till 350. Det gäller hela Severins sortiment och är värt att veta innan du jämför den med något annat märke, eftersom nästan alla butiker skyltar med det större talet. Även halverat är den störst här, och för den som gör frukost åt fyra personer är det skillnaden mellan en körning och tre.\n\n**Temperaturen ställs steglöst mellan 45 och 65 grader**, vilket ingen annan apparat i jämförelsen erbjuder. 65 grader ger tjockt skum till cappuccino. Ner mot 45 får du ljummen mjölk som barn kan dricka direkt. Uppvärmningen sker med induktion under kannan i stället för med ett element i själva kärlet, så behållaren är bara ett rostfritt kärl som lyfts av och ställs i diskmaskinen.\n\nDen kostar nästan dubbelt mot Wilfa Silky och gör inte finare skum för pengarna, bara mer av det. Skummar du till fler än tre koppar åt gången är den värd mellanskillnaden. Räcker fyra koppar tar du Wilfa och lägger de 591 kronorna på kaffet i stället.",
  },
  {
    id: "severin-spuma-500-sm-3585",
    brand: "Severin",
    name: "Spuma 500 SM 3585",
    shortName: "Severin Spuma 500",
    image: productImage(MJOLKSKUMMARE.slug, "severin-spuma-500-sm-3585"),
    tagline: "Tre vispar följer med, en för varje sorts skum.",
    scores: {
      skumkapacitet: 4,
      /* Varmt och kallt skum, tre olika vispar i lådan. */
      mjolktyper: 4,
      /* 1 114 kr hos KitchenTime mot 1 499 hos Severin själva. */
      prisvarde: 4,
      rengoring: 5,
    },
    /* Priset läst om 2026-08-06 på butikens egen produktsida: 1 114 kr, upp
       från 1 100 vid bygget. */
    price: 1114,
    priceCheckedAt: "2026-08-06",
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/severin/severin-sm-3586-sp500-mjolkskummare/",
    superlative: "Bäst för fyra koppar i rad",
    pros: [
      "Skummar 120 till 260 ml, alltså ungefär fyra koppar",
      "Tre olika vispar följer med, för tjockt skum, fint skum och enbart uppvärmning",
      "Induktion under en löstagbar rostfri behållare",
      "385 kronor billigare hos KitchenTime än hos Severin själva",
      "Skummar kallt utan att mjölken värms",
    ],
    cons: [
      "Ingen justerbar temperatur, till skillnad från den större systermodellen",
      "1 114 kronor för 260 ml skum, mot Wilfas 250 ml för 699",
      "Inget program utpekat för havre eller soja",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 114 kr", highlight: true },
      { label: "Skumkapacitet", shortLabel: "Skum", value: "120–260 ml", highlight: true },
      { label: "Uppvärmningskapacitet", shortLabel: "Värmer", value: "120–500 ml", highlight: true },
      { label: "Antal program", shortLabel: "Program", value: "4 st", highlight: true },
      { label: "Skumtemperatur", shortLabel: "Temp", value: "Ej angiven", highlight: true },
      { label: "Maskindisk", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Kallskum", value: "Ja" },
      { label: "Effekt", value: "500 W" },
      { label: "Uppvärmningsteknik", value: "Induktion" },
      { label: "Antal vispar", value: "3 st" },
      { label: "Löstagbar kanna", value: "Ja" },
      { label: "Material kanna", value: "Rostfritt stål" },
      { label: "Kannvolym", value: "500 ml" },
      { label: "Artikelnummer", value: "SM3585" },
    ],
    verdict:
      "Severin Spuma 500 skummar 120 till 260 ml och kostar 1 114 kronor hos KitchenTime. Det är fyra koppar skum, och 385 kronor mindre än vad Severin tar i sin egen butik för samma artikel.\n\n**Tre vispar i lådan är det som skiljer den från de flesta.** En ger det tjocka skummet till cappuccino, en det finare till latte, och en rör bara om när du vill ha varm mjölk eller choklad utan bubblor. De andra apparaterna i jämförelsen löser samma sak med programval på samma visp, vilket fungerar men ger mindre skillnad mellan ytterlägena.\n\n**Uppvärmningen sker med induktion under kannan.** Det betyder att behållaren inte har någon elektronik i sig: den lyfts av, töms och ställs i diskmaskinen som vilken rostfri kanna som helst. Skillnaden märks efter ett halvår, eftersom en kanna med värmeelementet inbyggt måste handdiskas försiktigt varje gång och därför oftare får stå.\n\nDen saknar den justerbara temperaturen som storebrodern Spuma 700 har, och kostar 415 kronor mer än Wilfa Silky för tio milliliter mer skum. Vill du ha tre separata vispar och rostfritt i stället för glas är den värd det. Annars är Wilfa det bättre köpet.",
  },
  {
    id: "chiato-milkplay",
    brand: "CHiATO",
    name: "milkPLAY",
    shortName: "CHiATO milkPLAY",
    image: productImage(MJOLKSKUMMARE.slug, "chiato-milkplay"),
    tagline: "Fyra funktioner för 392 kronor, varm choklad inräknad.",
    scores: {
      /* 130 ml skum, alltså två koppar. Näst minst i jämförelsen. */
      skumkapacitet: 2.5,
      /* Fyra funktioner: varmt fast skum, krämigt skum, kallt skum och kakao. */
      mjolktyper: 4.5,
      /* Billigast i jämförelsen med marginal. */
      prisvarde: 5,
      /* CHiATOs egen bruksanvisning, kap. 5: apparaten får aldrig sänkas i
         vatten och mjölkbehållaren sitter ihop med basen. Alltså ingen
         maskindisk. Sidan hade 3,0 med cellen tom. */
      rengoring: 2.5,
    },
    price: 392,
    oldPrice: 560,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/chiato-milkplay-elektrisk-automatisk-mjolkskummare-vit/",
    userRating: { value: 5, count: 13, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    /* 33 tecken. Kortades från "Bäst för den som också vill ha varm choklad",
       som var 43 och klipptes vid både 1440 och 390 px: 241 px innehåll i en
       ruta på 236. Taket ligger runt 39 tecken. Samma fel som IDÉ-015 på
       /iphone-skal. Mät om superlativet ändras. */
    superlative: "Bäst för kakao lika ofta som kaffe",
    pros: [
      "392 kronor, alltså billigast i jämförelsen",
      "Fyra funktioner: fast skum, krämigt skum, kallt skum och kakao",
      "Skummar 130 ml, vilket räcker till två koppar",
      "Gör 240 ml varm choklad, alltså två stora muggar",
      "13 kundbetyg hos butiken med snittet 5,0",
    ],
    cons: [
      "Skummet håller 75 till 80 grader, alltså varmare än de 63 till 67 labbet rekommenderar",
      "130 ml skum räcker inte till tre koppar",
      "Får aldrig sänkas i vatten och tål inte maskindisk, så insidan torkas ur för hand",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "392 kr", highlight: true },
      { label: "Skumkapacitet", shortLabel: "Skum", value: "130 ml", highlight: true },
      { label: "Uppvärmningskapacitet", shortLabel: "Värmer", value: "240 ml", highlight: true },
      { label: "Antal program", shortLabel: "Program", value: "4 st", highlight: true },
      { label: "Skumtemperatur", shortLabel: "Temp", value: "75–80 °C", highlight: true },
      /* CHiATOs egen bruksanvisning, kap. 5: apparaten får aldrig sänkas i
         vatten. Behållaren sitter ihop med basen. Cellen stod tom. */
      { label: "Maskindisk", shortLabel: "Maskindisk", value: "Nej", highlight: true },
      { label: "Kallskum", value: "Ja" },
      /* Manualens tekniska data anger 450–550 W; butiken anger 450. */
      { label: "Effekt", value: "450–550 W" },
      { label: "GTIN", value: "4779060252051" },
    ],
    verdict:
      "CHiATO milkPLAY kostar 392 kronor och gör fyra saker: fast skum, krämigt skum, kallt skum och varm choklad. Det är jämförelsens lägsta pris, och den enda under 400 kronor som klarar mer än en sak.\n\n**Fyra funktioner för under fyrahundra kronor är ovanligt.** Det fasta skummet går till cappuccino, det krämiga till latte, och kallskummet till iskaffe på sommaren. Kakaoprogrammet rör om i 240 ml, alltså två stora muggar, vilket gör den till en apparat man använder även av den som inte dricker kaffe. Butikens tretton kundbetyg ligger allihop på fem.\n\n**Den är samtidigt den enda i jämförelsen som anger en temperatur ovanför det band labbet pekar ut.** Råd & Rön skriver att mjölkskum bör hålla mellan 63 och 67 grader; CHiATO anger 75 till 80. Vad det betyder i koppen kan vi inte säga, eftersom ingen har mätt just den här modellen, men det är ett tal värt att känna till innan du väljer den framför en apparat som håller sig lägre.\n\n130 ml skum är två koppar och inte mer, och behållaren sitter ihop med basen så att den aldrig får sänkas i vatten. Bor du ensam eller är ni två, och orkar torka ur den för hand, är det här jämförelsens bästa köp till lägsta pris. Ska ni vara fler vid bordet räcker den inte, och då är Wilfa Silky för 307 kronor mer den som faktiskt löser problemet.",
  },
  {
    id: "philips-milk-twister-ca6500",
    brand: "Philips",
    name: "Milk Twister CA6500/63",
    shortName: "Philips Milk Twister",
    image: productImage(MJOLKSKUMMARE.slug, "philips-milk-twister-ca6500"),
    tagline: "Två cappuccino på 130 sekunder, sagt av Philips själva.",
    scores: {
      /* 120 ml skum. Philips räknar själva om det till två cappuccino. */
      skumkapacitet: 2.5,
      /* Varmt och kallt skum, men inga namngivna program utöver det. */
      mjolktyper: 3.5,
      /* 567 kr mot ordinarie 1 020. */
      prisvarde: 4.5,
      /* Nonstick, sladdlös bas, tål maskindisk. */
      rengoring: 4.5,
    },
    price: 567,
    oldPrice: 1020,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/elektrisk-mjolkskummare-philips-milk-twister-ca6500-63/",
    award: "editor",
    superlative: "Bäst för två koppar till lägsta pris",
    pros: [
      "120 ml skum räcker till två cappuccino, uträknat av Philips själva",
      "Skumningen tar 130 sekunder",
      "Både varmt och kallt skum",
      "Nonstick-beläggning invändigt och tål maskindisk",
      "Sladdlös bas som roterar 360 grader, så kannan kan ställas åt vilket håll som helst",
      "567 kronor mot ordinarie 1 020",
    ],
    cons: [
      "120 ml är näst minst i jämförelsen och räcker inte till en tredje kopp",
      "Kannan rymmer 120 ml, så den kan inte värma mer mjölk än den skummar",
      "Inga valbara program utöver varmt och kallt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "567 kr", highlight: true },
      { label: "Skumkapacitet", shortLabel: "Skum", value: "120 ml", highlight: true },
      { label: "Uppvärmningskapacitet", shortLabel: "Värmer", value: "Ej angiven", highlight: true },
      { label: "Antal program", shortLabel: "Program", value: "2 st", highlight: true },
      { label: "Skumtemperatur", shortLabel: "Temp", value: "Ej angiven", highlight: true },
      { label: "Maskindisk", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Kallskum", value: "Ja" },
      { label: "Effekt", value: "500 W" },
      { label: "Uppvärmningsteknik", value: "Magnetisk visp" },
      { label: "Material kanna", value: "Nonstick-belagd" },
      { label: "Löstagbar kanna", value: "Ja, sladdlös bas" },
      /* Philips egen produktsida: "Rymmer 120 ml mjölk". Kannan rymmer alltså
         lika mycket som apparaten skummar. */
      { label: "Kannvolym", value: "120 ml" },
      { label: "Vikt", value: "0,79 kg" },
      { label: "Mått", value: "128 × 128 × 194 mm" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8720389007613" },
    ],
    verdict:
      "Philips Milk Twister gör 120 ml skum och kostar 567 kronor hos Coffee Friend, nedsatt från 1 020. Philips räknar själva om talet: det räcker till två cappuccino.\n\n**Den omräkningen är mer värd än den låter.** En cappuccino tar ungefär 60 ml skum, och med den måttstocken i handen går det att läsa varenda apparat här: 90 ml är en och en halv kopp, 200 ml är tre, 350 ml är sex. Philips landar på två, och skumningen tar 130 sekunder.\n\n**Rengöringen är den enklaste i jämförelsen.** Insidan är nonstick-belagd så mjölken inte bränner fast, delarna tål maskindisk, och basen är sladdlös och roterar hela varvet, vilket betyder att kannan kan ställas tillbaka åt vilket håll som helst i stället för att passas in i ett spår. Det låter litet och är precis den sortens sak som avgör om en apparat står framme eller åker in i skåpet.\n\nTvå koppar är taket. Är ni fler vid frukostbordet räcker den inte, och Wilfa Silky gör fyra för 132 kronor mer. Men för den som gör en eller två koppar om dagen och vill ha minsta möjliga diskning är det här rätt apparat till rätt pris.",
  },
  {
    id: "severin-sm-3588",
    brand: "Severin",
    name: "Mjölkskummare 300 SM 3588",
    shortName: "Severin SM 3588",
    image: productImage(MJOLKSKUMMARE.slug, "severin-sm-3588"),
    tagline: "Induktion och rostfri kanna för under 800 kronor.",
    scores: {
      /* 150 ml skum, alltså två till tre koppar. */
      skumkapacitet: 3,
      mjolktyper: 3.5,
      /* 799 kr för 150 ml skum, mot Wilfas 250 ml för 699. */
      prisvarde: 3,
      rengoring: 5,
    },
    price: 799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/koksapparater/kaffemaskiner/mjolkskummare/",
    superlative: "Billigaste induktionsskummaren",
    pros: [
      "Induktion under kannan, alltså ingen elektronik i kärlet",
      "Löstagbar rostfri behållare som tål maskindisk",
      "Skummar 150 ml och värmer 300",
      "Skummar både varmt och kallt",
      "550 watt, alltså snabbast uppvärmning bland Severins mindre modeller",
    ],
    cons: [
      "799 kronor för 150 ml skum, när Wilfa gör 250 ml för 699",
      "Ingen justerbar temperatur",
      "Inget program utpekat för havre eller soja",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "799 kr", highlight: true },
      { label: "Skumkapacitet", shortLabel: "Skum", value: "150 ml", highlight: true },
      { label: "Uppvärmningskapacitet", shortLabel: "Värmer", value: "300 ml", highlight: true },
      { label: "Antal program", shortLabel: "Program", value: "2 st", highlight: true },
      { label: "Skumtemperatur", shortLabel: "Temp", value: "Ej angiven", highlight: true },
      { label: "Maskindisk", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Kallskum", value: "Ja" },
      { label: "Effekt", value: "550 W" },
      { label: "Uppvärmningsteknik", value: "Induktion" },
      { label: "Löstagbar kanna", value: "Ja" },
      { label: "Material kanna", value: "Rostfritt stål" },
      { label: "Kannvolym", value: "300 ml" },
      { label: "Artikelnummer", value: "SM3588" },
    ],
    verdict:
      "Severin SM 3588 skummar 150 ml, värmer 300 och kostar 799 kronor. Den är billigaste vägen till induktionsuppvärmning i jämförelsen.\n\n**Induktion betyder att kannan är tom på teknik.** Värmen skapas i en spole under bänkytan på apparaten, inte i ett element inuti kärlet, så behållaren är ett rostfritt kärl som lyfts av och går i diskmaskinen. De billigare apparaterna här har värmeelementet i kannan och måste handdiskas. Efter ett halvårs dagliga cappuccino är det den skillnaden som avgör om apparaten fortfarande används.\n\n**150 ml skum är två till tre koppar**, och 550 watt gör den till den snabbaste av Severins mindre modeller. Talet 300 i namnet är hur mycket mjölk den värmer utan att skumma, alltså dubbelt mot vad du får skum av. Det gäller hela sortimentet och är värt att veta innan du jämför den med ett annat märke.\n\nPriset är dess problem. Wilfa Silky kostar 100 kronor mindre och gör 100 ml mer skum med fem program i stället för två. Vill du ha rostfritt och induktion just under åttahundra är det här enda vägen dit. Bryr du dig mest om hur mycket skum du får för pengarna ska du inte köpa den.",
  },
  {
    id: "melitta-cremio",
    brand: "Melitta",
    name: "Cremio",
    shortName: "Melitta Cremio",
    image: productImage(MJOLKSKUMMARE.slug, "melitta-cremio"),
    tagline: "En knapp, tre funktioner, och inget att ställa in.",
    scores: {
      /* 100–150 ml skum, alltså två koppar. Coffee Friends produkttext
         2026-08-06: "varmt eller kallt mjölkskum (kapacitet: 100-150 ml)".
         Bekräftat i Melittas egen bruksanvisning 6758122-04, s. 4: "Max.
         Füllmenge Milchschaum: 150 ml, max. Füllmenge warme Milch: 250 ml". */
      skumkapacitet: 3,
      mjolktyper: 3.5,
      prisvarde: 3.5,
      /* Nonstick invändigt, men värmeelementet sitter i kannan. Bruksanvisningen
         s. 6: behållaren och bottenstationen får aldrig maskindiskas, locket och
         vispen får. */
      rengoring: 2.5,
    },
    price: 757,
    oldPrice: 1090,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/mjolkskummare-melitta-cremio-black/",
    superlative: "Bäst för den som bara vill ha en knapp",
    pros: [
      "Skummar 100 till 150 ml, alltså två koppar cappuccino",
      "Värmer 100 till 250 ml, alltså en stor eller två små muggar",
      "Tre funktioner på en enda knapp: varmt skum, kallt skum och varm mjölk",
      "Melitta sätter en siffra på vilken mjölk som skummar bäst: minst 3 gram protein per 100 gram",
      "Nonstick invändigt, så mjölken bränner inte fast",
      "757 kronor mot ordinarie 1 090",
    ],
    cons: [
      "Värmeelementet sitter i kannan, alltså handdisk varje morgon",
      "150 ml skum räcker till två koppar och inte en tredje",
      "Bara locket och vispen tål maskindisk",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "757 kr", highlight: true },
      /* Skummax läst hos Coffee Friend 2026-08-06 och bekräftat i Melittas egen
         bruksanvisning 6758122-04 s. 4. Sidan skrev tidigare att talet inte
         publicerades; det gjorde det, på den produktsida vi själva länkar. */
      { label: "Skumkapacitet", shortLabel: "Skum", value: "100–150 ml", highlight: true },
      { label: "Uppvärmningskapacitet", shortLabel: "Värmer", value: "100–250 ml", highlight: true },
      { label: "Antal program", shortLabel: "Program", value: "3 st", highlight: true },
      { label: "Skumtemperatur", shortLabel: "Temp", value: "Ej angiven", highlight: true },
      { label: "Maskindisk", shortLabel: "Maskindisk", value: "Nej", highlight: true },
      { label: "Kallskum", value: "Ja" },
      { label: "Effekt", value: "450 W" },
      { label: "Material kanna", value: "Nonstick-belagd" },
      { label: "Kannvolym", value: "250 ml" },
      { label: "GTIN", value: "4006508215614" },
    ],
    verdict:
      "Melitta Cremio skummar 100 till 150 ml och kostar 757 kronor hos Coffee Friend, nedsatt från 1 090. Det är två koppar cappuccino ur en apparat med en enda knapp.\n\n**Enkelheten är hela argumentet.** Det finns inga lägen att läsa sig till och ingen display att tolka. Ett tryck ger varmt skum, ett långt tryck kallt, och knappen bredvid värmer mjölk utan att skumma den. Ska du göra varm choklad tar samma kanna 250 ml, alltså en stor mugg eller två små.\n\n**Melitta sätter en siffra på vilken mjölk som skummar bäst: minst 3 gram protein per 100 gram.** Ju mer protein, desto stabilare och finporigare blir skummet. Talet står på baksidan av varje mjölkpaket och varje havredryck, så du kan avgöra i butiken om drycken kommer att fungera i stället för att prova dig fram hemma.\n\nVärmeelementet sitter i själva kannan, och det är dess verkliga begränsning: bara locket och vispen får gå i diskmaskinen, resten torkas ur för hand varje morgon. Klarar du det är Cremio ett bra köp på rea. Vill du slippa handdisken gör Severin SM 3588 lika mycket skum i en rostfri kanna som tål maskinen, för 42 kronor mer.",
  },
  {
    id: "sage-milk-cafe-smf600",
    brand: "Sage",
    name: "the Milk Café SMF600",
    shortName: "Sage Milk Café",
    image: productImage(MJOLKSKUMMARE.slug, "sage-milk-cafe-smf600"),
    tagline: "Induktion och rostfri kanna som rymmer tre koppar skum.",
    /* Inget betyg på skumkapacitet: Sage anger "3 koppar skummad mjölk" och
       ingen milliliter. Att räkna om koppar till milliliter vore härlett. */
    scores: {
      /* Steglös temperatur 40–80 °C med 60 utmärkt som "optimum milk temp",
         två vispskivor (Capp och Latté) och ett Cold Stir-läge. Läst i Sages
         egen bruksanvisning SMF600_EU_UG7_A21, s. 7–8. Sidan hade 3,0 och
         påstod att ingen temperatur angavs. */
      mjolktyper: 4,
      prisvarde: 1.5,
      rengoring: 5,
    },
    price: 1999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/maidonvaahdotin-sage-the-milk-cafe-smf600/",
    superlative: "Bäst för proffskänsla på bänken",
    pros: [
      "Temperaturen ställs steglöst mellan 40 och 80 grader, med 60 utmärkt på ratten",
      "Två utbytbara vispskivor: en för cappuccino och en för latte",
      "Cold Stir-läge som skummar utan att värma, till iskaffe",
      "Induktionsuppvärmning som ger jämn värmefördelning och små bubblor",
      "Rostfri mjölkkanna som tål diskmaskin",
      "Kannan rymmer 740 ml, alltså mest i jämförelsen",
    ],
    cons: [
      "1 999 kronor är jämförelsens högsta pris med 709 kronors marginal",
      "Tre koppar skum, alltså mindre än Wilfa Silky gör för en tredjedel av priset",
      "Sage vill att vispskivorna handdiskas för att hålla längre",
      "Ingen varm choklad och inget program för växtbaserad dryck",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 999 kr", highlight: true },
      { label: "Skumkapacitet", shortLabel: "Skum", value: "3 koppar", highlight: true },
      { label: "Uppvärmningskapacitet", shortLabel: "Värmer", value: "Ej angiven", highlight: true },
      { label: "Antal program", shortLabel: "Program", value: "3 st", highlight: true },
      /* Steglös ratt 40–80 °C, läst i Sages egen bruksanvisning
         SMF600_EU_UG7_A21 s. 7. Cellen stod tom fram till 2026-08-06. */
      { label: "Skumtemperatur", shortLabel: "Temp", value: "40–80 °C", highlight: true },
      { label: "Maskindisk", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Kallskum", value: "Ja" },
      { label: "Effekt", value: "500 W" },
      { label: "Uppvärmningsteknik", value: "Induktion" },
      { label: "Antal vispar", value: "2 st" },
      { label: "Material kanna", value: "Rostfritt stål" },
      { label: "Kannvolym", value: "740 ml" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "9312432029926" },
    ],
    verdict:
      "Sage the Milk Café kostar 1 999 kronor och är jämförelsens dyraste med 709 kronors marginal. Kannan rymmer 740 ml, värms med induktion och gör tre koppar skum.\n\n**Temperaturen ställs steglöst mellan 40 och 80 grader, och 60 står utmärkt på ratten.** Det är det bredaste temperaturspannet i jämförelsen, och den enda apparaten här där du kan lägga dig precis i det band på 63 till 67 grader som labbet pekar ut för mjölkskum. Under 50 grader får du ljummen mjölk ett barn kan dricka direkt; högst upp går den varmare än skum mår bra av, vilket är ditt val och inte apparatens.\n\n**Två utbytbara vispskivor gör två sorters skum.** Capp-skivan ger det tjocka, fasta skummet till cappuccino och Latté-skivan ett silkeslent mikroskum till latte, och du byter dem med en handrörelse. Till det kommer ett Cold Stir-läge som skummar utan värme till iskaffe. Kannan är rostfri utan elektronik i sig, lyfts av och går i diskmaskinen.\n\nTre koppar skum för 1 999 kronor är svårt att motivera när Wilfa Silky gör fyra för 699, och Sage gör varken varm choklad eller har ett program för havredryck. Det du betalar för är kannan, induktionen och temperaturratten. Vill du ha den kontrollen och tänker behålla apparaten i tio år är den välbyggd nog att motivera det. Ska den bara göra cappuccino på morgonen finns det billigare vägar dit.",
  },
  {
    id: "rig-tig-foodie",
    brand: "RIG-TIG",
    name: "Foodie",
    shortName: "RIG-TIG Foodie",
    image: productImage(MJOLKSKUMMARE.slug, "rig-tig-foodie"),
    tagline: "90 ml skum till en kopp, och 474 kronor.",
    scores: {
      /* 90 ml skum är minst i jämförelsen, alltså knappt en och en halv kopp. */
      skumkapacitet: 2,
      /* Tre program: varmt skum, kallt skum och uppvärmning utan skumning.
         RIG-TIGs egen produktsida 2026-08-06: "It can froth both warm and cold
         milk and also heat milk without frothing it." Sidan hade 2,5 och
         påstod i en nackdel att kallskumsläge saknades. */
      mjolktyper: 3,
      prisvarde: 4,
      /* Tål inte maskindisk, sagt av RIG-TIG själva och av Kitchn. Sidan hade
         3,5 med cellen tom. */
      rengoring: 2.5,
    },
    price: 474,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/rig-tig/foodie-elektrisk-mjolkskummare/",
    superlative: "Bäst för en ensam kopp på morgonen",
    pros: [
      "474 kronor, alltså näst billigast i jämförelsen",
      "Skummar 90 ml och värmer 230",
      "Tre program: varmt skum, kallt skum och uppvärmning utan skumning",
      "Mjölken värms till 60 grader",
      "Nonstick invändigt, så mjölken bränner inte fast",
      "550 watt trots det låga priset",
    ],
    cons: [
      "90 ml skum är minst i jämförelsen och räcker till en och en halv kopp",
      "60 grader ligger under de 63 till 67 labbet pekar ut för skum",
      "Tål inte maskindisk, så den ska torkas ur för hand varje gång",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "474 kr", highlight: true },
      { label: "Skumkapacitet", shortLabel: "Skum", value: "90 ml", highlight: true },
      { label: "Uppvärmningskapacitet", shortLabel: "Värmer", value: "230 ml", highlight: true },
      /* Tre program, kallskum och maskindiskförbudet lästa hos RIG-TIG själva
         och hos Kitchn 2026-08-06. Sidan hade 2 program, Kallskum: Nej och en
         tom maskindiskcell, och en nackdel om ett kallskumsläge som finns. */
      { label: "Antal program", shortLabel: "Program", value: "3 st", highlight: true },
      { label: "Skumtemperatur", shortLabel: "Temp", value: "60 °C", highlight: true },
      { label: "Maskindisk", shortLabel: "Maskindisk", value: "Nej", highlight: true },
      { label: "Kallskum", value: "Ja" },
      { label: "Effekt", value: "550 W" },
      { label: "Material kanna", value: "Nonstick-belagd" },
      { label: "Kannvolym", value: "230 ml" },
      { label: "Vikt", value: "0,79 kg" },
    ],
    verdict:
      "RIG-TIG Foodie skummar 90 ml, värmer 230 och kostar 474 kronor. Det är minst skum i jämförelsen, till näst lägsta pris.\n\n**90 ml är en och en halv kopp**, med Philips måttstock om 60 ml skum per cappuccino. Det gör den till en apparat för en person. Bor du ensam och gör en kopp på morgonen är det exakt rätt mängd, och du slipper betala för kapacitet som ändå står oanvänd. Ska ni vara två räcker den inte till två koppar i följd utan påfyllning.\n\n**Tre program för 474 kronor är mer än prisklassen brukar ge.** Den skummar varmt, den skummar kallt till iskaffe, och den värmer mjölk utan att skumma den när det är varm choklad som ska bli av. Mjölken går till 60 grader, alltså strax under de 63 till 67 grader labbet pekar ut för mjölkskum och betydligt närmare bandet än de apparater som lägger sig på 75 till 80.\n\nDen får inte gå i diskmaskinen, och det är den verkliga kostnaden: 90 ml mjölk bränner fast lika villigt som 350, och kannan ska torkas ur för hand varje morgon. Gör du en kopp om dagen och orkar med det är det här billigaste vägen till riktigt mjölkskum. Ska ni vara två gör CHiATO milkPLAY 130 ml för 82 kronor mindre.",
  },
  {
    id: "alessi-plisse",
    brand: "Alessi",
    name: "Plissé",
    shortName: "Alessi Plissé",
    image: productImage(MJOLKSKUMMARE.slug, "alessi-plisse"),
    tagline: "200 ml skum ur Michele De Lucchis veckade kanna.",
    scores: {
      /* 200 ml skum, alltså tredje mest i jämförelsen. Coffee Friends
         produkttext 2026-08-06: "För skummad mjölk är maxvolymen 200 ml, och om
         du enbart vill värma mjölken kan du fylla på upp till 350 ml." Kannan
         om 350 ml bekräftad av Alessi själva, MDL13B: "Capacity 11.8 fl oz". */
      skumkapacitet: 3.5,
      /* Varm mjölk och varmt skum. Inget kallskum. */
      mjolktyper: 2,
      prisvarde: 1.5,
      rengoring: 2.5,
    },
    price: 1519,
    oldPrice: 1950,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/mjolkskummar-alessi-plisse-black/",
    superlative: "Bäst för den som köper med ögat",
    pros: [
      "Skummar 200 ml, alltså tre koppar cappuccino",
      "Värmer 350 ml när du bara vill ha varm mjölk",
      "600 watt, alltså mest effekt i jämförelsen",
      "Veckad form ritad av Michele De Lucchi, gjord för att stå framme",
      "1 519 kronor mot ordinarie 1 950",
    ],
    cons: [
      "Inget kallskum, så iskaffe är uteslutet",
      "1 519 kronor för två funktioner, mot fem funktioner för 699 hos Wilfa",
      "Termoplast där de dyra konkurrenterna har rostfritt eller glas",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 519 kr", highlight: true },
      /* Båda talen lästa i Coffee Friends produkttext 2026-08-06, kannvolymen
         dessutom hos Alessi själva (MDL13B, 11.8 fl oz ≈ 350 ml). Sidan skrev
         tidigare att ingetdera publicerades. */
      { label: "Skumkapacitet", shortLabel: "Skum", value: "200 ml", highlight: true },
      { label: "Uppvärmningskapacitet", shortLabel: "Värmer", value: "350 ml", highlight: true },
      { label: "Antal program", shortLabel: "Program", value: "2 st", highlight: true },
      { label: "Skumtemperatur", shortLabel: "Temp", value: "Ej angiven", highlight: true },
      { label: "Maskindisk", shortLabel: "Maskindisk", value: "Ej angiven", highlight: true },
      { label: "Kallskum", value: "Nej" },
      { label: "Effekt", value: "600 W" },
      { label: "Material kanna", value: "Termoplast" },
      { label: "Kannvolym", value: "350 ml" },
      { label: "GTIN", value: "8003299468492" },
    ],
    verdict:
      "Alessi Plissé skummar 200 ml, värmer 350 och kostar 1 519 kronor. Det är tredje mest skum i jämförelsen, ur den kanna Michele De Lucchi ritade.\n\n**200 ml är tre koppar cappuccino**, alltså mer än allt utom Severins två största, och de kostar mindre. Kannan tar 350 ml när du bara vill ha varm mjölk, och 600 watt är mest effekt av alla här, så uppvärmningen går fort. Den som gör frukost åt tre får ut det på en körning.\n\n**Den veckade formen är det du faktiskt betalar för.** Plissé-serien är gjord för att stå framme på bänken, och den som väljer köksmaskiner som inredning har redan bestämt sig innan resten av jämförelsen börjar. Termoplast är samtidigt ett billigare material än det rostfria och det glas de andra dyra apparaterna har.\n\nDen saknar kallskum, så iskaffe blir inget, och två funktioner för 1 519 kronor är svårt att försvara mot Wilfa Silky som har fem för 820 kronor mindre. Vill du ha just den här formen på bänken är den värd sitt pris. Väljer du efter vad som hamnar i koppen tar du Wilfa och behåller mellanskillnaden.",
  },
];

export const MJOLKSKUMMARE_PRODUCTS = resolveProducts(MJOLKSKUMMARE, SEEDS);

/**
 * Övervägda och bortvalda.
 *
 * Tre av dem — De'Longhi, Bialetti MK01 och Bialetti MKF02 — är slutsålda hos
 * Coffee Friend. De ligger här av det skälet och inte av produktskäl, och de
 * två Bialetti-artiklarna är dessutom sidans tydligaste belägg för att samma
 * butiksfält bär två olika storheter.
 */
export const MJOLKSKUMMARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Bialetti",
    name: "MKF02",
    approxPrice: 616,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/elektrisk-mjolkskummare-bialetti-mkf02-nero/",
    reason:
      "Slutsåld hos butiken vid prisrundan, annars hade den rankats. Den skummar 150 ml och värmer 300, alltså exakt samma mängder som Severin SM 3588 för 183 kronor mindre. Kommer den i lager igen är det ett av kategorins bästa köp under 700 kronor.",
  },
  {
    brand: "Bialetti",
    name: "MK01",
    approxPrice: 570,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/elektrisk-mjolkskummare-bialetti-mk01/",
    reason:
      "Slutsåld hos butiken. Skummar 115 ml och värmer 240, alltså knappt två koppar. Den ser i butikens lista ut att vara större än systermodellen MKF02, men gör 35 ml mindre skum, och det är MKF02 du ska ha av de två.",
  },
  {
    brand: "De'Longhi",
    name: "Alicia Latte EMF2.BK",
    approxPrice: 850,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/elektrisk-mjolkskummar-delonghi-alicia-latte-emf2-bk/",
    reason:
      "Slutsåld hos butiken. Skummar 140 ml och rymmer 250, alltså drygt två koppar. 850 kronor för 140 ml skum är sämre betalt än Wilfa Silkys 699 för 250, så den hade hamnat i nedre halvan även i lager.",
  },
  {
    brand: "Severin",
    name: "Mjölkskummare SM 3584",
    approxPrice: 699,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/koksapparater/kaffemaskiner/mjolkskummare/",
    reason:
      "Kostar exakt lika mycket som Wilfa Silky och skummar 100 ml mot Wilfas 250, alltså mindre än hälften för samma pengar. Den värmer 200 ml och drar 450 watt. Vi rankar tre Severin-modeller redan, och en fjärde som förlorar på pris mot vinnaren hjälper ingen som väljer. Behöver du bara en kopp gör RIG-TIG Foodie det för 225 kronor mindre.",
  },
  {
    brand: "Smeg",
    name: "50's Style MFF01",
    approxPrice: 1590,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/koksapparater/kaffemaskiner/mjolkskummare/",
    reason:
      "Kategorins mest kända formgivning, och en av få modeller som ingick i Råd & Röns labbtest. Kannan rymmer 60 cl och priset är 1 590 kronor. För 300 kronor mindre tar Severin Spuma 700 en 700 ml kanna, skummar 350 ml och låter dig ställa temperaturen, så det du betalar mellanskillnaden för är femtiotalsformen och emaljfärgen. Vill du ha just den på bänken är Smeg det självklara köpet i kategorin.",
  },
  {
    /* ⚠️ HEDERLIGHET OM VARFÖR DEN LIGGER HÄR. Produkten var rankad åtta av
       elva när sidan byggdes, och flyttades hit därför att **packshoten inte
       gick att hämta**: Elgiganten renderar sina produktbilder med JavaScript,
       Nespressos egen sida lämnar ingen bildadress, Coffee Friend för den inte,
       och CDON:s bilder kommer från marknadsplatssäljare och gick inte att
       knyta säkert till just Aeroccino 4. Att publicera fel produktbild är
       värre än att inte ranka produkten.

       Skälet läsaren får nedan är däremot sant och skrivet före flytten: den
       hade jämförelsens sämsta förhållande mellan pris och skum, och betyget
       6,0 placerade den i nedre halvan.

       ⚠️ DET HÄR ÄR ETT OPERATIVT HINDER OCH ALLTSÅ EN UPPGIFT, inte en dom.
       Se CLAUDE.md. Nästa runda: hämta bilden ur Elgigantens renderade DOM med
       Chrome-verktygen, eller ur tillverkarens pressrum, och ranka in den
       igen. Specifikationsläget är kategorins bästa och förtjänar en plats. */
    brand: "Nespresso",
    name: "Aeroccino 4",
    approxPrice: 1199,
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/kaffemaskiner-te/tillbehor-till-kaffemaskiner-te/mjolkskummare/nespresso-aeroccino-4-mjolkskummare-12478749/694779",
    reason:
      "Skummar 120 ml och värmer 240, och båda talen går att läsa på samma rad, vilket ingen annan produkt i kategorin klarar. Fyra inställningar, inklusive kallskum och enbart varm mjölk. Problemet är priset: 1 199 kronor för två koppar skum är tre gånger vad CHiATO milkPLAY tar för samma två koppar, och 500 kronor mer än Wilfa Silky som gör dubbelt så mycket. Har du redan en Nespresso-maskin och vill ha något som matchar finns det ett skäl. Väljer du på vad du får i koppen finns det inget.",
  },
  {
    brand: "Subminimal",
    name: "NanoFoamer Pro Gen 2",
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/subminimal-nanofoamer-pro-gen-2-automatisk-mikroskumstillverkare-svart/",
    reason:
      "Den mest intressanta produkten vi valde bort. Den gör mikroskum med utbytbara filter i stället för med en visp, vilket är tekniken baristor använder för latte art, och den ligger tvåa på Prisjakts egen expertlista. Men den värmer inte mjölken, och sidan rankar apparater som både värmer och skummar. Den hör hemma i en jämförelse av manuella och handhållna skummare, som vi inte byggt än.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const MJOLKSKUMMARE_FAQ = [
  {
    question: "Hur mycket mjölkskum behöver jag per kopp?",
    answer:
      "Räkna med ungefär 60 ml skum till en cappuccino. Talet kommer från Philips, som är den enda tillverkaren i kategorin som räknar om sin egen kapacitet till koppar: Milk Twister rymmer 120 ml och räcker enligt Philips till två cappuccino. Med den måttstocken går det att läsa varje annan apparat. En skummare som gör 90 ml räcker till en och en halv kopp, 150 ml till två eller tre, och 350 ml till ungefär sex. En latte tar mindre skum än en cappuccino eftersom den mest består av varm mjölk, så samma apparat räcker längre om det är latte du gör. Utgå från hur många koppar som ska serveras samtidigt, inte från hur många personer som bor i hushållet.",
  },
  {
    question: "Varför står det 500 ml på min mjölkskummare när den bara skummar 260?",
    answer:
      "För att en mjölkskummare har två maxnivåer och talet i namnet är den högre. Den ena gäller hur mycket mjölk apparaten kan värma utan att skumma, den andra hur mycket den kan skumma. Skummet expanderar i kannan, så skumnivån måste ligga lägre för att det inte ska rinna över. Severin är tydligast med det och publicerar båda talen för varje modell: Spuma 500 skummar 120 till 260 ml och värmer 120 till 500, och genom hela deras sortiment ligger skummaxet på ungefär hälften av det tal apparaten heter. Alla märken följer inte samma logik. Wilfa Silky MF1B-250 anger 150 till 250 ml, och där är det tvärtom skummängden som står i namnet. Leta efter ordet skum bredvid talet innan du jämför två apparater.",
  },
  {
    question: "Hur varm ska mjölken vara i ett mjölkskum?",
    answer:
      "Mellan 63 och 67 grader, enligt Råd & Rön som provat 18 elektriska mjölkskummare i labb. Under det blir skummet löst och kaffet ljummet. Över det börjar mjölken smaka kokt, och proteinerna som håller ihop bubblorna klarar värmen sämre, så skummet sjunker snabbare i koppen. Fyra apparater i den här jämförelsen låter dig styra temperaturen. Sage the Milk Café har den bredaste ratten, steglöst mellan 40 och 80 grader med 60 utmärkt som optimal mjölktemperatur. Severin Spuma 700 går mellan 45 och 65. Wilfa Silky har 65 grader för varmt skum och 60 för latte art. RIG-TIG Foodie ligger fast på 60 och CHiATO milkPLAY på 75 till 80, alltså över bandet. Har du en apparat utan temperaturval spelar det ändå roll att mjölken är kylskåpskall när du börjar, eftersom skumningen då hinner arbeta längre innan måltemperaturen nås.",
  },
  {
    question: "Går det att skumma havredryck och sojadryck?",
    answer:
      "Ja, men resultatet skiljer sig mycket mellan sorter, och det är den enskilt största orsaken till att en mjölkskummare känns som ett dåligt köp. Labbet som provat kategorin skummade lättmjölk, mellanmjölk, standardmjölk, soja och mandel, och fann att resultatet varierade enormt mellan dem: bara den bästa apparaten i testet klarade att göra bra skum av allihop. Förklaringen är proteinet, som bygger bubblornas väggar, och Melitta sätter en siffra på den: välj en dryck med minst 3 gram protein per 100 gram, och ju mer desto stabilare och finporigare skum. Talet står på baksidan av paketet, så du kan avgöra i butiken i stället för att prova dig fram hemma. Havre- och sojadrycker som säljs som barista ligger högre just därför och skummar märkbart bättre än standardvarianterna. Av apparaterna här är Wilfa Silky den enda med ett eget program för växtbaserad dryck.",
  },
  {
    question: "Vad är skillnaden mellan induktion och vanlig uppvärmning?",
    answer:
      "Var värmen skapas, och det avgör hur du diskar. En apparat med induktion har spolen i basen och värmer kannan utifrån, vilket betyder att själva behållaren inte innehåller någon elektronik alls: den lyfts av, töms och ställs i diskmaskinen som en vanlig rostfri kanna. En apparat med värmeelement har elementet inbyggt i kannan, och då får den aldrig sänkas i vatten utan måste torkas ur för hand. Skillnaden märks inte i butiken utan efter ett halvår av dagliga cappuccino, eftersom mjölk bränner fast och surnar och en apparat som är omständlig att diska används allt mer sällan. Induktion ger dessutom jämnare värmefördelning över hela botten, vilket enligt tillverkarna ger mindre bubblor. Severin Spuma-modellerna och Sage the Milk Café använder induktion; Melitta Cremio har elementet i kannan.",
  },
  {
    question: "Kan en mjölkskummare göra kallt skum till iskaffe?",
    answer:
      "De flesta har ett läge för det, men förvänta dig inte samma resultat som varmt. Labbet som provat 18 modeller skriver att ingen av dem lyckas göra ordentligt kallt skum, och att det utan värme är den feta mjölken som blir sämst, med stora bubblor och för rinnig konsistens. Lättmjölk blev åtminstone godkänd i vissa fall. Skälet är att värmen hjälper proteinet att bygga stabila bubbelväggar, och utan den faller skummet ihop snabbare. Vill du ha kallt skum till iskaffe ska du alltså välja en apparat som har läget, men räkna med att det blir en lättare skumkrona och inte det täta locket du får varmt. Nio av de tio här klarar kallt skum. Alessi Plissé är den enda som inte gör det, och Severin Spuma 500 har ett knep som fungerar på vilken apparat som helst med båda lägena: kör en kall omgång först och en varm direkt efteråt, så blir skummet tätare.",
  },
  {
    question: "Är en dyr mjölkskummare bättre än en billig?",
    answer:
      "Inte på det sätt priset antyder. I den här jämförelsen kostar den dyraste 1 999 kronor och gör tre koppar skum, medan en apparat för 699 gör fyra och har fem program. Det du faktiskt betalar mer för när priset stiger är oftast materialet och uppvärmningstekniken: rostfri kanna i stället för plast, och induktion i stället för element i kannan. Båda är verkliga fördelar för hur länge apparaten håller och hur lätt den är att diska, men ingen av dem gör skummet finare i sig. Det som däremot skiljer sig kraftigt med priset är hur mycket skum du får, och där följer talen inte varandra alls: en apparat på 392 kronor gör 130 ml, en på 567 gör 120, en på 699 gör 250 och en på 1 519 gör 200. Bestäm hur många koppar du behöver samtidigt först, och jämför sedan pris inom den storleken.",
  },
  {
    question: "Behöver jag en mjölkskummare om jag har en espressomaskin med ångrör?",
    answer:
      "Nej, om du använder ångröret och är nöjd med resultatet. Ett ångrör gör i princip samma sak och ger dessutom mer kontroll, eftersom du styr både luftinblandningen och sluttemperaturen för hand. Det som talar för en fristående skummare även då är två saker. Den sköter sig själv medan du gör annat, vilket på en vardagsmorgon är hela skillnaden. Och den gör kallt skum, varm mjölk utan bubblor och i flera fall varm choklad, alltså saker ett ångrör inte gör lika bra. Har du i stället en kapselmaskin eller en vanlig bryggare är en fristående skummare det enda sättet att få cappuccino hemma. Har du en helautomatisk maskin med inbyggd mjölkbehållare behöver du ingen alls.",
  },
];
