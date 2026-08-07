import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { BLENDER } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /blender.
 *
 * Priser, artikelnummer, GTIN och kundbetyg lästa i butikernas egen JSON-LD på
 * PRICE_CHECKED. Specifikationerna hämtade hos tillverkaren, och mätvärdena ur
 * Applitests resultat-PDF via Testfakta. Se .agent/research/blender.md.
 *
 * ## Var mätvärdena kommer ifrån, och vad som aldrig får lånas
 *
 * Nio av tretton ingår i Testfaktas labbprovning. `Ljudnivå` och
 * `Beredningstid smoothie` ligger i ALDRIG_BEDOMD i lib/spec-schema.mjs och
 * fylls aldrig i åt de fyra som saknar dem. Skälet är starkare här än vanligt:
 * ett tal härlett ur motoreffekten hade inte bara varit påhittat utan
 * **systematiskt fel åt fel håll**. Wilfa Powerfuel drar 1 800 W och är näst
 * tystast med 85 dB; Braun drar 1 600 W och är högljuddast med 94.
 *
 * ## Varför alla tretton har betyg på alla fem kriterier
 *
 * Användarbeslut 2026-08-06. Alternativet var streck på labbraderna, och det
 * hade utlöst felet i lib/products.ts rad 241: förvalet fördelar om ett saknat
 * kriteriums vikt och delar därmed ut den gratis, vilket vände rankningen på
 * /smart-belysning. Sidan kör därför **förvalet** `redistributeMissing: true`
 * utan att det spelar någon roll, eftersom ingen produkt saknar ett betyg.
 *
 * De fyra otestade — Wilfa Xplode 1500, Ninja BN750EU, OBH Perfect Mix+ och
 * Smeg 50's Style — har mixningsbetyg satta på konstruktionen, och samtliga
 * ligger under de bäst mätta maskinerna. Det står i metodrutan.
 *
 * ⚠️ Tre av dem publicerar ingen ljudnivå någonstans, kontrollerat hos
 * tillverkaren och i sökning 2026-08-06. De ligger på 3,0 på `ljudniva`,
 * alltså mitt i fältet, och tabellcellen är tom. Betyget är avsiktligt
 * neutralt och får varken höjas eller sänkas utan en publicerad uppgift.
 *
 * ## Ordningen skiljer sig från Testfaktas, och det är viktningen
 *
 * Testfakta viktar prestanda 50 / hanterbarhet 20 / uthållighet 20 / buller 10.
 * Den här sidan viktar kannan tyngre och uthålligheten lättare. Följden:
 *
 * - **Bosch går från delad trea till andra plats.** Kannan är fältets bästa —
 *   Tritan, lättast med 1 079 g, 2,0 liter arbetsvolym, diskmaskinsäker,
 *   säkerhetslock — och motorgarantin är 10 år.
 * - **Braun går från andra till femte.** Perfekt smoothie på 59 sekunder, men
 *   fältets högljuddaste med 94 dB och kannan får inte gå i diskmaskinen.
 *
 * ## Priser och länkmål
 *
 * ⚠️ Testvinnaren är svårast att länka. Ninja TB301EU är slut hos Elgiganten
 * och förbeställning hos Proshop; enda butiken med lager är SharkNinjas egen
 * på 1 799 kr, och SharkNinja ligger på Awin där vi inte har konto. Efter
 * användarbeslut länkas den till KitchenTime på 2 279 kr, och Awin-ansökan är
 * uppföljning och inte villkor. Spannet mellan butikerna är 36 procent.
 *
 * ⚠️ Chef Matteo är Powers eget märke och säljs bara av Power, som saknar
 * program. Electrolux länkas till Elgiganten, som ligger på Awin. Båda rankas
 * ändå — att utelämna testets sjua och åtta för att de inte betalar är precis
 * vad konkurrenterna gör.
 *
 * ⚠️ Elons pris går inte att läsa utan att välja butik, så OBH Prime Mix
 * länkas till Power trots att Elon har programmet på 5 procent. En
 * webbläsarsession med butik vald är uppgiften som löser det.
 */

export const PRICE_CHECKED = "2026-08-06";

const SEEDS: ProductSeed[] = [
  {
    id: "ninja-detect-power-mixer-pro",
    brand: "Ninja",
    name: "Detect Power Mixer Pro TB301EU",
    shortName: "Detect Power Mixer Pro",
    image: productImage(BLENDER.slug, "ninja-detect-power-mixer-pro"),
    tagline: "Hackar nötter jämnt där de dubbelt så starka maskinerna river sönder dem.",
    scores: {
      /* Mixerprestanda 8,3 av 10 hos Applitest, delad högst i fältet. Högst av
         alla på nöthack med 9,5 mot fältets 4,0 i botten, 7,8 på is och 7,0 på
         smoothie. Smoothien blir godkänd men inte lika slät som Brauns. */
      mixningsresultat: 4.5,
      /* Kanna 1 370 g, diskmaskinsäker, säkerhetslock, plus två koppar på
         700 ml. 8,0 av 10 hos Applitest på att fylla på och tömma. */
      kannan: 4.5,
      /* Tio manuella hastigheter plus BlendSense som anpassar tid och varvtal
         efter mängd. Applitest gav 8,0 på att välja och anpassa program. */
      kontroll: 4.5,
      /* 89 dB uppmätt. Skalan är linjär mellan 83 (5,0) och 94 (1,0). */
      ljudniva: 3,
      /* Ingen anmärkning efter 100 cykler, alltså 10,0 av 10. Två års garanti
         drar ner mot Wilfas fem och Boschs tio. */
      uthallighet: 4,
    },
    price: 2279,
    oldPrice: 2699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/ninja/ninja-detect-tb301eu-blender-pro-single-serve/",
    award: "winner",
    superlative: "Bäst för den som mixar varje dag",
    pros: [
      "Jämnaste nöthacket i hela fältet, och det är det moment de flesta blendrar misslyckas med",
      "Kannan går i diskmaskinen och väger 1 370 gram, alltså 710 gram mindre än den tyngsta här",
      "Tio manuella hastigheter vid sidan av automatiken, så du kan ta över när konsistensen ska bli exakt rätt",
      "Två koppar på 700 ml följer med, så frukosten kan mixas direkt i det du dricker ur",
    ],
    cons: [
      "89 dB, alltså i den högljudda halvan. KitchenAid ligger på 83 och märks i ett öppet kök",
      "Smoothien blir godkänd men inte helt slät. Braun och Bosch gör den jämnare",
      "Kostar 2 279 kronor, dubbelt mot Wilfa Xplode 1500 som gör det mesta av samma jobb",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 200 W", highlight: true },
      /* SharkNinja anger 2,1 liter tillbringare och 1,9 liter för flytande
         ämnen. Testfakta deklarerar 1 900 ml. Raden bär arbetsvolymen. */
      { label: "Kannans volym", shortLabel: "Volym", value: "1 900 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Plast", highlight: true },
      { label: "Ljudnivå", value: "89 dB", highlight: true },
      { label: "Beredningstid smoothie", shortLabel: "Smoothietid", value: "55 sek", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "1–10", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Kannans bräddvolym", value: "2 100 ml" },
      { label: "Säkerhetslock", value: "Ja" },
      { label: "Totalvikt", value: "4 334 g" },
      { label: "Kannans vikt med lock", value: "1 370 g" },
      { label: "Antal program", value: "3 automatiska, 4 manuella" },
      { label: "GTIN", value: "0622356289801" },
    ],
    verdict:
      "Ninja Detect Power Mixer Pro hackar nötter jämnare än någon annan maskin här och kostar 2 279 kronor. Den är den enda i fältet som är bland de tre bästa på alla tre momenten laboratoriet körde.\n\nNöthacket är det som skiljer den. Sex knivblad sitter staplade på olika höjd, så ingredienserna träffas på flera nivåer i stället för att virvla runt ovanför en enda kniv, och resultatet blir 9,5 av 10 där fem av de nio provade maskinerna landar på 4,0 till 4,8. **Skillnaden i praktiken är att nötterna blir lika grova hela vägen i stället för hälften mjöl och hälften halva nötter.** Smoothien tar 55 sekunder, näst snabbast av alla, och kannan går i diskmaskinen.\n\nDen låter däremot. 89 dB gör den till en maskin du startar och går ifrån, och den som vill mixa frukost i ett öppet kök medan någon sover ska titta på KitchenAid i stället, som mättes till 83.\n\nKöp den. Den gör allt som ska göras i en blender utan att vara sämst på något, och det är ovanligt i den här kategorin.",
  },
  {
    id: "bosch-serie-6-vitapower",
    brand: "Bosch",
    name: "Serie 6 VitaPower MMB6652B",
    shortName: "Serie 6 VitaPower",
    userRating: { value: 4.4, count: 56, checkedAt: PRICE_CHECKED },
    image: productImage(BLENDER.slug, "bosch-serie-6-vitapower"),
    tagline: "Tio års motorgaranti, den längsta någon tillverkare här vågar lämna.",
    scores: {
      /* Mixerprestanda 7,7. Perfekt smoothie, 10,0 av 10, delad högst med
         Braun. Men 4,8 på nöthack och 6,2 på is, alltså svag i de tuffare
         momenten. */
      mixningsresultat: 4,
      /* Fältets bästa kanna: Tritan, lättast av de stora kannorna med 1 079 g, 2,0 liter
         arbetsvolym, diskmaskinsäker, säkerhetslock. Applitest 8,0 på att
         fylla på och tömma. */
      kannan: 5,
      /* Steglös hastighet, pulsfunktion, sex automatiska program och Smart
         Detect som känner av lock och kannstorlek. Applitest gav 9,0. */
      kontroll: 4.5,
      /* 90 dB uppmätt. */
      ljudniva: 2.5,
      /* Uthållighet 9,0 av 10, med anmärkningen att innehållet i kannan blir
         väldigt varmt vid längre körningar. 10 års motorgaranti mot
         registrering är fältets längsta åtagande. */
      uthallighet: 4.5,
    },
    price: 2399,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bosch",
    merchantUrl:
      "https://www.bosch-home.se/sv/product/koksverktyg/blenders/high-speed-blenders/MMB6652B",
    award: "editor",
    superlative: "Bäst för den som gör varm soppa",
    pros: [
      "Tio års motorgaranti mot registrering, mot två år hos nio av de tretton",
      "Lättaste tvålieterskannan, 1 079 gram, alltså nästan hälften av Electrolux glaskanna",
      "Gör en helt slät smoothie utan klumpar, ett av bara två resultat i toppklass i labbet",
      "Friktionen från knivarna värmer råvarorna till varm soppa utan spis",
    ],
    cons: [
      "Sämst i topptrion på att hacka nötter, och isen blir en blandning av stora och små bitar",
      "Innehållet i kannan blir väldigt varmt vid längre körningar, vilket märks när du bara ville ha en kall smoothie",
      "90 dB och 1 800 watt som ändå tar 90 sekunder på en smoothie. Ninja klarar den på 55",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 800 W", highlight: true },
      /* Boschs eget faktablad: "XLarge 3,0-liter max / 2,0-liter vid
         användning". Raden bär arbetsvolymen, bräddvolymen står nedan. */
      { label: "Kannans volym", shortLabel: "Volym", value: "2 000 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Tritan", highlight: true },
      { label: "Ljudnivå", value: "90 dB", highlight: true },
      { label: "Beredningstid smoothie", shortLabel: "Smoothietid", value: "90 sek", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "Steglös", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Garanti", value: "10 år motor", highlight: true },
      { label: "Kannans bräddvolym", value: "3 000 ml" },
      { label: "Säkerhetslock", value: "Ja" },
      { label: "Totalvikt", value: "4 389 g" },
      { label: "Kannans vikt med lock", value: "1 079 g" },
      { label: "Antal program", value: "6 automatiska" },
      { label: "Varvtal", value: "45 000 v/min" },
      { label: "GTIN", value: "4242005393107" },
    ],
    verdict:
      "Bosch Serie 6 VitaPower kostar 2 399 kronor och lämnar tio års garanti på motorn. Ingen annan tillverkare i jämförelsen sträcker sig längre än fem.\n\nKannan är det som lyfter den. Den är av Tritan, väger 1 079 gram med lock och rymmer två liter i arbetsvolym, alltså den lättaste av de stora kannorna, och den går i diskmaskinen. Electrolux glaskanna väger 2 080 gram för mindre volym. **Skillnaden känns varje gång kannan ska lyftas full ner i diskmaskinen eller upp ur skåpet.** Smoothien blir dessutom helt slät, ett av bara två sådana resultat i labbet.\n\nDe tuffare momenten är svagheten. Nöthacket blir ojämnt trots 1 800 watt, isen krossas till både stora och små bitar, och innehållet blir väldigt varmt vid längre körningar. Vill du främst krossa is tar du KitchenAid eller Wilfa Powerfuel.\n\nDen här är för dig som gör soppa lika ofta som smoothie och tänker behålla maskinen länge. Tio år på motorn är ett åtagande, inte en formulering.",
  },
  {
    id: "wilfa-xplode-1500",
    brand: "Wilfa",
    name: "Xplode 1500 BLS-1500S",
    shortName: "Xplode 1500",
    userRating: { value: 4, count: 5, checkedAt: PRICE_CHECKED },
    image: productImage(BLENDER.slug, "wilfa-xplode-1500"),
    tagline: "Steglöst reglage i 25 lägen och fem års garanti.",
    scores: {
      /* Otestad av Applitest. Betyget är vår bedömning av konstruktionen:
         glaskanna på 1,8 liter, löstagbara knivar, 22 000 varv och egna
         iskrossblad. Sätts under samtliga labbtestade toppmaskiner, eftersom
         inget mätvärde finns. tek.nos betyg 9 gäller Xplode Vital BLSP-1800S,
         alltså en annan maskin, och flyttas aldrig hit. */
      mixningsresultat: 3.5,
      /* Glaskanna 1,8 liter med löstagbara knivar och automatiskt
         rengöringsprogram. Glas väger, vilket drar ner. */
      kannan: 3.5,
      /* Steglös hastighet med 25 lägen plus pulsfunktion, alltså bland de mest
         reglerbara i hela fältet. */
      kontroll: 4.5,
      /* 85 dB, angivet av Wilfa på den egna produktsidan. Samma tal som
         Applitest mätte upp för Wilfa Powerfuel. */
      ljudniva: 4,
      /* Wilfa lämnar 5 års garanti på alla Wilfa-märkta produkter, fältets näst
         längsta. Ingen labbprovning av uthållighet finns för just den här. */
      uthallighet: 4,
    },
    price: 1222,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/wilfa-xplode-bls-1500s-blender_59477/",
    award: "budget",
    superlative: "Bäst budget som ska hålla länge",
    pros: [
      "Glaskanna på 1,8 liter för 1 222 kronor, alltså 1 057 kronor under vinnaren",
      "Steglös hastighet i 25 lägen, alltså finare kontroll än de flesta som kostar dubbelt",
      "Fem års garanti på hela produkten, mot två år hos nio av de tretton",
      "Knivarna går att ta loss, så du kommer åt beläggningen under dem",
    ],
    cons: [
      "Ingår inte i labbprovningen, så mixningsresultatet är bedömt på konstruktionen och inte uppmätt",
      "Glaskannan väger mer än plast och tål inte att tappas. Bosch Tritan-kanna väger 1 079 gram",
      "1,8 liter räcker till familjen men inte till de riktigt stora satserna som Bosch och Braun tar",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 500 W", highlight: true },
      { label: "Kannans volym", shortLabel: "Volym", value: "1 800 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Glas", highlight: true },
      /* 85 dB angivet av Wilfa själva. Ej uppmätt av Applitest — modellen
         ingick inte i provningen. */
      { label: "Ljudnivå", value: "85 dB", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "Steglös, 25 lägen", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Garanti", value: "5 år", highlight: true },
      { label: "Antal program", value: "Puls och automatisk rengöring" },
      { label: "Varvtal", value: "22 000 v/min" },
      { label: "GTIN", value: "7044876041548" },
    ],
    verdict:
      "Wilfa Xplode 1500 kostar 1 222 kronor och ger en glaskanna på 1,8 liter med steglöst reglage. Den ligger 1 057 kronor under vinnaren och 1 768 under den dyraste.\n\nReglaget är det oväntade. Hastigheten är steglös i 25 lägen med pulsfunktion, vilket är finare kontroll än KitchenAid ger för 2 990 kronor med sina fem fasta steg. **Det avgör om du kan starta försiktigt på en majonnäs och sedan ge full gas, eller bara får den fart programmet bestämt.** Knivarna går att lyfta ur för rengöring, och Wilfa lämnar fem års garanti på hela produkten.\n\nDen ingick inte i laboratorieprovningen, och det är den verkliga invändningen. De nio andra har uppmätta resultat på smoothie, is och nötter; den här har det inte, och betyget vilar på hur den är byggd.\n\nSka du köpa en blender för under 1 500 kronor är det den här. Vill du ha uppmätta resultat på det du faktiskt ska göra får du gå till Ninja och betala tusen kronor mer.",
  },
  {
    id: "kitchenaid-artisan-k400",
    brand: "KitchenAid",
    name: "Artisan K400 1,4 L",
    shortName: "Artisan K400",
    userRating: { value: 5, count: 2, checkedAt: PRICE_CHECKED },
    image: productImage(BLENDER.slug, "kitchenaid-artisan-k400"),
    tagline: "83 dB och 45 sekunder, alltså tystast och snabbast på samma maskin.",
    scores: {
      /* Mixerprestanda 8,3, delad högst. Bäst på iskrossning tillsammans med
         Wilfa, 8,7 av 10, och snabbast smoothie i hela fältet på 45 sekunder.
         7,9 på nöthack. */
      mixningsresultat: 4.5,
      /* Glaskanna men bara 1 375 ml, minst i fältet, och totalvikten 7 122 g
         är mer än dubbelt mot den lättaste. Applitest 7,0 på att fylla på och
         tömma. Diskmaskinsäker. */
      kannan: 3,
      /* Bara fem hastighetslägen, 0–5, alltså minst reglerbar av de dyra.
         Applitest gav 7,0 på att välja och anpassa program. */
      kontroll: 3,
      /* 83 dB, tystast i hela fältet. Skalans toppvärde. */
      ljudniva: 5,
      /* Uthållighet 7,0 av 10. Locket bedömdes något känsligt för varma
         vätskor och ånga, och deformerades i provet. */
      uthallighet: 3,
    },
    price: 2990,
    oldPrice: 4360,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/kitchenaid/artisan-blender-14-l/",
    award: "premium",
    superlative: "Tystast av alla, 83 dB",
    pros: [
      "83 dB, alltså tystast i jämförelsen och elva decibel under den högljuddaste",
      "Snabbaste smoothien av alla, 45 sekunder, trots att motorn är en av de svagaste bland de provade",
      "Krossar is jämnt utan sörja och utan stora bitar, delad bäst med Wilfa Powerfuel",
      "Glaskanna som tål varma vätskor och inte tar smak eller lukt",
    ],
    cons: [
      "7,1 kilo totalt, varav kannan 1,9. Den står där du ställer den och lyfts inte ner varje dag",
      "1 375 ml är minsta kannan här, alltså en sats mindre än de flesta andra",
      "Bara fem hastighetslägen för 2 990 kronor, där Wilfa Xplode ger 25 steglösa för 1 222",
      "Locket deformerades av ånga i uthållighetsprovet",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 200 W", highlight: true },
      { label: "Kannans volym", shortLabel: "Volym", value: "1 375 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Glas", highlight: true },
      { label: "Ljudnivå", value: "83 dB", highlight: true },
      { label: "Beredningstid smoothie", shortLabel: "Smoothietid", value: "45 sek", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "0–5", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Säkerhetslock", value: "Nej" },
      { label: "Totalvikt", value: "7 122 g" },
      { label: "Kannans vikt med lock", value: "1 876 g" },
      { label: "GTIN", value: "5413184906931" },
    ],
    verdict:
      "KitchenAid Artisan K400 kostar 2 990 kronor och är tystast i jämförelsen med 83 dB. Den gör dessutom den snabbaste smoothien av alla, 45 sekunder.\n\nDe två sakerna hör ihop och är hela argumentet för maskinen. Elva decibel skiljer den från den högljuddaste, och eftersom skalan är logaritmisk är det en påtaglig skillnad i köket: den här går att köra klockan sex på morgonen i ett hus där andra sover. **Isen krossas dessutom jämnt utan sörja, delat bäst med Wilfa Powerfuel.** Att den klarar det med 1 200 watt, alltså en av de svagaste motorerna bland de provade, säger en del om vad watt-talet är värt.\n\nSedan är den tung och trög. 7,1 kilo totalt, en kanna på bara 1 375 ml och fem fasta hastighetslägen för nästan tre tusen kronor. Wilfa Xplode 1500 ger 25 steglösa lägen för 1 222.\n\nDen här köper du för ljudnivån och för att den ska stå framme. Ska den in i ett skåp mellan varje användning väljer du Chef Matteo, som väger hälften.",
  },
  {
    id: "braun-powerblend-9",
    brand: "Braun",
    name: "PowerBlend 9 JB9040BK",
    shortName: "PowerBlend 9",
    userRating: { value: 4.6, count: 10, checkedAt: PRICE_CHECKED },
    image: productImage(BLENDER.slug, "braun-powerblend-9"),
    tagline: "Helt slät och krämig smoothie på 59 sekunder.",
    scores: {
      /* Mixerprestanda 8,3, delad högst. Perfekt smoothie 10,0 på 59 sekunder.
         7,2 på nöthack och 7,0 på is, alltså mitten. */
      mixningsresultat: 4.5,
      /* Tritan-kanna, lätt med 1 103 g och rymmer 2,0 liter, och Applitest gav
         9,0 på att fylla på och tömma — men **kannan får inte gå i
         diskmaskinen**, vilket är det man möter varje dag. */
      kannan: 3,
      /* Tio hastigheter, pulsfunktion och sex automatiska program i tre
         texturlägen. Applitest gav 10,0 på att välja och anpassa program,
         delat högst i fältet. */
      kontroll: 5,
      /* 94 dB, högljuddast i hela fältet. Skalans bottenvärde. */
      ljudniva: 1,
      /* Ingen anmärkning efter 100 cykler, 10,0 av 10. Två års garanti. */
      uthallighet: 4,
    },
    price: 1799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/braun-jb9040-power-blend-9-blender-3-liter_55743/",
    superlative: "Bäst för helt slät smoothie",
    pros: [
      "Helt slät och krämig smoothie, ett av bara två toppresultat i labbet, på 59 sekunder",
      "Tio hastigheter och sex program i tre texturlägen, alltså 18 kombinationer",
      "Klarade 100 cykler i uthållighetsprovet utan en enda anmärkning",
      "1 799 kronor för en maskin som mixar lika bra som de för 2 400 och uppåt",
    ],
    cons: [
      "Kannan får inte gå i diskmaskinen, alltså handdisk av en hög behållare med kniv i botten varje gång",
      "94 dB gör den till den högljuddaste här, jämförbart med en motorgräsklippare",
      "Bara mitten på is och nötter. Ska du krossa is ofta tar du KitchenAid eller Wilfa Powerfuel",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 600 W", highlight: true },
      /* Testfakta deklarerar 2 000 ml. Bagaren och Kocken säljer samma maskin
         under rubriken "3 liter", alltså kannans bräddvolym. */
      { label: "Kannans volym", shortLabel: "Volym", value: "2 000 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Tritan", highlight: true },
      { label: "Ljudnivå", value: "94 dB", highlight: true },
      { label: "Beredningstid smoothie", shortLabel: "Smoothietid", value: "59 sek", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "1–10", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Nej", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Säkerhetslock", value: "Nej" },
      { label: "Totalvikt", value: "4 656 g" },
      { label: "Kannans vikt med lock", value: "1 103 g" },
      { label: "Antal program", value: "6 automatiska i 3 texturlägen" },
      { label: "Varvtal", value: "45 000 v/min" },
    ],
    verdict:
      "Braun PowerBlend 9 gör den jämnaste smoothien i jämförelsen och kostar 1 799 kronor. Bara den och Bosch fick omdömet helt slät och krämig i laboratoriet.\n\nDen gör det dessutom snabbt, på 59 sekunder, och reglagen är fältets mest genomtänkta: tio hastigheter, pulsfunktion och sex program som var och en kan köras i tre texturlägen. **Vill du ha en grov salsa och en slät soppa ur samma maskin är det här den som låter dig bestämma vilket.** Den klarade också 100 cykler i uthållighetsprovet utan en enda anmärkning, vilket bara fyra andra gjorde.\n\nTvå saker drar ner den, och båda möter du varje gång. Kannan får inte gå i diskmaskinen, och 94 dB gör den till den högljuddaste maskinen här.\n\nStår du och mixar smoothie till frukost varje dag och orkar med handdisken är det här mycket blender för pengarna. Vill du slippa båda sakerna kostar Bosch sexhundra kronor mer och löser dem.",
  },
  {
    id: "obh-nordica-prime-mix",
    brand: "OBH Nordica",
    name: "Prime Mix 7739",
    shortName: "Prime Mix",
    image: productImage(BLENDER.slug, "obh-nordica-prime-mix"),
    tagline: "Säkerhetslocket gör att den inte startar utan lock på.",
    scores: {
      /* Mixerprestanda 7,7. Smoothie 8,5 och is 7,8, alltså bra i båda. Men
         4,8 på nöthack, i fältets bottenhalva. */
      mixningsresultat: 4,
      /* Glaskanna 1,75 liter med säkerhetslock och diskmaskinsäker, men kannan
         väger 1 940 g. Applitest 7,0 på att fylla på och tömma. */
      kannan: 3.5,
      /* Steglös hastighet, pulsfunktion och fyra program. Applitest gav 10,0
         på att välja och anpassa program, delat högst med Braun. */
      kontroll: 4.5,
      /* 92 dB uppmätt, näst högljuddast. */
      ljudniva: 2,
      /* Uthållighet 8,0 av 10. Locket bedömdes något känsligt för varma
         vätskor och ånga, och deformerades. Två års garanti. */
      uthallighet: 3,
    },
    price: 1999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Power",
    merchantUrl:
      "https://www.power.se/koksapparater/koksmaskiner-och-mixer/blenders/obh-nordica-prime-mix-mixer/p-1582216/",
    superlative: "Bäst reglage under 2 000 kronor",
    pros: [
      "Delad bästa programhantering i labbet, tillsammans med Braun som kostar lika mycket",
      "Steglös hastighet med pulsfunktion, alltså full kontroll över konsistensen",
      "Säkerhetslock som hindrar start utan lock på, vilket bara tre av de nio provade har",
      "Glaskannan på 1,75 liter går i diskmaskinen och knivsatsen lyfts ur",
    ],
    cons: [
      "Nöthacket blir ojämnt, alltså i fältets bottenhalva på det momentet",
      "92 dB, näst högljuddast av de provade maskinerna",
      "Locket deformerades av ånga i uthållighetsprovet",
      "Säljs bara av Power och OBH själva, så det finns ingen prispress mellan butiker",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 400 W", highlight: true },
      { label: "Kannans volym", shortLabel: "Volym", value: "1 750 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Glas", highlight: true },
      { label: "Ljudnivå", value: "92 dB", highlight: true },
      { label: "Beredningstid smoothie", shortLabel: "Smoothietid", value: "61 sek", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "Steglös", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Säkerhetslock", value: "Ja" },
      { label: "Totalvikt", value: "4 409 g" },
      { label: "Kannans vikt med lock", value: "1 940 g" },
      { label: "Antal program", value: "4 förinställda" },
    ],
    verdict:
      "OBH Nordica Prime Mix kostar 1 999 kronor och har jämförelsens bästa programhantering, delat med Braun. Kannan är av glas och rymmer 1,75 liter.\n\nReglagen är ovanligt genomtänkta för prisklassen: steglös hastighet, pulsfunktion med valfri fart och fyra förinställda program. **Säkerhetslocket gör dessutom att maskinen inte startar utan lock på, vilket bara tre av de nio provade maskinerna har och som spelar roll i ett kök med barn.** Smoothien blir bra och isen krossas jämnt.\n\nNötterna är svagheten. Hacket blir ojämnt, alltså samma problem som Wilfa Powerfuel, Electrolux och Philips har. Ska du göra eget nötsmör eller hacka nötter till bakning är det här fel maskin, och Ninja är rätt.\n\nFör den som mest gör smoothies och krossad is till drinkar räcker den gott, och glaskannan håller längre än plasten. Vill du ha nötterna med på köpet kostar Ninja 280 kronor mer.",
  },
  {
    id: "ninja-bn750eu-foodi",
    brand: "Ninja",
    name: "2-in-1 Foodi BN750EU",
    shortName: "2-in-1 Foodi",
    image: productImage(BLENDER.slug, "ninja-bn750eu-foodi"),
    tagline: "Mixar i en kopp på 700 ml du sedan skruvar lock på och tar med.",
    scores: {
      /* Otestad av Applitest. tek.no gav 6,5 av 10 och utsåg den till testets
         bästa på att krossa is, och det gäller exakt den här modellen. Betyget
         sätts därefter och under de labbtestade toppmaskinerna. */
      mixningsresultat: 3.5,
      /* 2,1 liter Total Crushing-kanna plus två koppar på 700 ml, allt
         maskindiskbart. Totalvikt 5,8 kg. */
      kannan: 4,
      /* Låg, medium, hög och puls, plus tre automatiska Auto-iQ-program och
         fyra manuella. Alltså fasta steg och inte steglöst. */
      kontroll: 3.5,
      /* Ingen publicerad ljudnivå, kontrollerat hos SharkNinja och i sökning
         2026-08-06. Neutralt mittvärde, se blockkommentaren överst. */
      ljudniva: 3,
      /* Två års begränsad garanti enligt SharkNinja. Ingen labbprovning av
         uthålligheten finns för den här modellen. */
      uthallighet: 3,
    },
    price: 1429,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Blender-Mixer/Ninja-Mixer-Blender-BN750EU-2-in-1-with-Auto-IQ-1200-W/2990695",
    superlative: "Bäst för smoothie i medhavd mugg",
    pros: [
      "Två koppar på 700 ml med lock, så frukosten mixas i det du sedan dricker ur på bussen",
      "Utsedd till bästa iskrossaren i tek.nos test av blendrar i den här prisklassen",
      "2,1 liter i den stora kannan, alltså störst i hela jämförelsen",
      "Både kanna och koppar går i diskmaskinen",
    ],
    cons: [
      "Fasta hastighetssteg: låg, medium och hög, där Wilfa Xplode ger 25 steglösa för mindre pengar",
      "Ingår inte i labbprovningen, så smoothie och nöthack är bedömda och inte uppmätta",
      "Plastkanna, där Wilfa Xplode 1500 ger glas för 207 kronor mindre",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 200 W", highlight: true },
      { label: "Kannans volym", shortLabel: "Volym", value: "2 100 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Plast", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "3 steg och puls", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Totalvikt", value: "5 800 g" },
      { label: "Antal program", value: "3 automatiska, 4 manuella" },
      { label: "Medföljande koppar", value: "2 × 700 ml med lock" },
      { label: "GTIN", value: "0622356235020" },
    ],
    verdict:
      "Ninja 2-in-1 Foodi kostar 1 429 kronor och mixar antingen i en kanna på 2,1 liter eller direkt i en kopp på 700 ml. Kannan är den största i jämförelsen.\n\nKoppen är hela poängen. Du mixar frukosten i den, skruvar på ett lock med pip och tar med den, alltså inget överhällande och en disk mindre. **Två koppar följer med, så två personer kan ta var sin utan att någon väntar.** Norska tek.no utsåg den dessutom till den bästa iskrossaren i sitt test av blendrar i den här prisklassen.\n\nReglagen är enklare än priset antyder. Tre fasta lägen och en pulsknapp, alltså ingen steglös fart, och Wilfa Xplode 1500 ger 25 lägen för 200 kronor mindre.\n\nDen här är för dig som mixar en portion åt gången och vill ta med den. Ska du göra stora satser till hela familjen och sedan hälla upp finns det bättre kannor på sidan.",
  },
  {
    id: "wilfa-powerfuel-1800",
    brand: "Wilfa",
    name: "Powerfuel 1800 PB-1800B",
    shortName: "Powerfuel 1800",
    image: productImage(BLENDER.slug, "wilfa-powerfuel-1800"),
    tagline: "Krossar is jämnt utan sörja, delat bäst av allt som mättes.",
    scores: {
      /* Mixerprestanda 7,5. Delad bäst på iskrossning med 8,7 och 9,3 på
         smoothiens jämnhet — men smoothieprogrammet tar 147 sekunder, och
         nöthacket är fältets sämsta på 4,0. */
      mixningsresultat: 3.5,
      /* Plastkanna 1,8 liter, 1 558 g, och **får inte gå i diskmaskinen**.
         Applitest gav 6,0 på att fylla på och tömma, lägst av de nio utom
         Philips. */
      kannan: 2,
      /* Variabel hastighet mellan min och max. Applitest gav 8,0 på att välja
         och anpassa program. */
      kontroll: 4,
      /* 85 dB uppmätt, näst tystast i fältet trots 1 800 W. */
      ljudniva: 4,
      /* Ingen anmärkning efter 100 cykler, 10,0 av 10, plus Wilfas 5 års
         garanti på alla Wilfa-märkta produkter. Fältets näst längsta åtagande. */
      uthallighet: 5,
    },
    price: 2699,
    oldPrice: 2999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/wilfa/wilfa-powerfuel-pb1800b-blender/",
    superlative: "Bäst för den som krossar is ofta",
    pros: [
      "Krossar is jämnt utan sörja och utan stora bitar, delat bäst med KitchenAid",
      "85 dB, alltså näst tystast här trots att motorn är fältets starkaste",
      "Fem års garanti på hela produkten, mot två år hos nio av de tretton",
      "Klarade 100 cykler i uthållighetsprovet utan anmärkning",
    ],
    cons: [
      "Smoothieprogrammet tar 2 minuter och 27 sekunder, mot 45 sekunder för KitchenAid",
      "Sämsta nöthacket i hela jämförelsen, delat med Philips",
      "Kannan får inte gå i diskmaskinen, och den väger 1 558 gram",
      "2 699 kronor, alltså mer än dubbelt mot Wilfas egen Xplode 1500",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 800 W", highlight: true },
      { label: "Kannans volym", shortLabel: "Volym", value: "1 800 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Plast", highlight: true },
      { label: "Ljudnivå", value: "85 dB", highlight: true },
      { label: "Beredningstid smoothie", shortLabel: "Smoothietid", value: "147 sek", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "Variabel", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Nej", highlight: true },
      { label: "Garanti", value: "5 år", highlight: true },
      { label: "Säkerhetslock", value: "Nej" },
      { label: "Totalvikt", value: "4 836 g" },
      { label: "Kannans vikt med lock", value: "1 558 g" },
      { label: "GTIN", value: "7044876023254" },
    ],
    verdict:
      "Wilfa Powerfuel 1800 krossar is jämnare än nästan allt annat här och kostar 2 699 kronor. Den är samtidigt näst tystast av de provade maskinerna med 85 dB.\n\nDe två egenskaperna tillsammans är ovanliga. Isen blir jämn utan sörja och utan stora bitar, delat bästa resultat med KitchenAid, och den gör det utan att låta som en borrmaskin. **Wilfa lämnar dessutom fem års garanti på hela produkten, mot två år hos merparten.** Uthållighetsprovet klarade den utan en enda anmärkning.\n\nSmoothien är den andra sidan av samma mynt. Programmet tar 2 minuter och 27 sekunder, alltså mer än tre gånger så lång tid som KitchenAids 45 sekunder, och resultatet blir slätt men inte bättre än de snabbas. Nöthacket är dessutom det sämsta i hela jämförelsen.\n\nHar du en isbit-vana, alltså drinkar, frozen margaritas och krossad is till glas, är det här maskinen. Ska du mest göra smoothie på morgonen är två och en halv minut för lång tid att stå och vänta.",
  },
  {
    id: "chef-matteo-blender-iii",
    brand: "Chef Matteo",
    name: "Blender III Vacuum",
    shortName: "Blender III",
    image: productImage(BLENDER.slug, "chef-matteo-blender-iii"),
    tagline: "3,4 kilo totalt, alltså den enda här du lyfter ur skåpet med en hand.",
    scores: {
      /* Mixerprestanda 7,8. Smoothie 9,3, alltså tredje bäst i fältet, och 7,9
         på nöthack. Men bara 5,3 på iskrossning, fältets sämsta. tek.no gav
         den 7,5 av 10 i en egen provning av just den här modellen. */
      mixningsresultat: 4,
      /* Kannan väger 754 g, klart lättast, och totalvikten 3 366 g är fältets
         lägsta. Diskmaskinsäker utom rotordelen med skärblad. Applitest 8,0 på
         att fylla på och tömma. Extra behållare på 0,7 liter medföljer. */
      kannan: 4.5,
      /* **Ingen hastighetsinställning alls**, bara fasta program. Det enda
         exemplaret i fältet utan reglage, och kriteriets bottenvärde. */
      kontroll: 2,
      /* 88 dB uppmätt, men med anmärkning för ett skärande ljud som stör mer
         än de andras dovare buller. Därför under vad talet ensamt ger. */
      ljudniva: 3,
      /* Uthållighet 6,0 av 10, lägst i fältet. Locket bedömdes **mycket**
         känsligt för varma vätskor och ånga, och deformerades. */
      uthallighet: 2,
    },
    price: 1998,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Power",
    merchantUrl:
      "https://www.power.se/koksapparater/koksmaskiner-och-mixer/blenders/chef-matteo-power-blender-iii-vakuummixer/p-1032944/",
    superlative: "Lättast att lyfta ur skåpet",
    pros: [
      "3 366 gram totalt, alltså hälften av KitchenAids vikt och lättast i jämförelsen",
      "Kannan väger 754 gram, alltså 325 gram mindre än den näst lättaste",
      "Tredje bästa smoothien i labbet, 9,3 av 10 på jämnhet",
      "Vakuumpumpen suger ur luften före mixning och ger mätbart kompaktare smoothie",
    ],
    cons: [
      "Ingen hastighetsinställning alls, bara fasta program, så du får den konsistens maskinen bestämmer",
      "Sämsta iskrossningen i hela jämförelsen",
      "Locket är mycket känsligt för varma vätskor och ånga, och deformerades i uthållighetsprovet",
      "Ett skärande ljud som stör mer än de andra maskinernas dovare buller",
      "Säljs bara av Power, så priset går inte att jämföra mellan butiker",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 500 W", highlight: true },
      { label: "Kannans volym", shortLabel: "Volym", value: "1 500 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Plast", highlight: true },
      { label: "Ljudnivå", value: "88 dB", highlight: true },
      { label: "Beredningstid smoothie", shortLabel: "Smoothietid", value: "61 sek", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "Ingen, endast program", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja, utom rotordelen", highlight: true },
      { label: "Säkerhetslock", value: "Nej" },
      { label: "Totalvikt", value: "3 366 g" },
      { label: "Kannans vikt med lock", value: "754 g" },
      { label: "Vakuumfunktion", value: "Ja, pump medföljer" },
    ],
    verdict:
      "Chef Matteo Blender III väger 3 366 gram och kostar 1 998 kronor. Den är den lättaste maskinen i jämförelsen, med bred marginal.\n\nVikten är argumentet. Kannan väger 754 gram där de tyngsta ligger på nästan tre gånger så mycket, och hela maskinen väger hälften av KitchenAid. **Det avgör om blendern får bo i ett skåp och plockas fram, eller måste stå framme på bänken för att den är för tung att flytta.** Smoothien blir dessutom bland de jämnaste i labbet, och en vakuumpump följer med som suger ur luften före mixning. Norska tek.no vägde en liter till 1 020 gram med vakuum mot 913 utan.\n\nReglagen saknas helt. Det finns ingen hastighetsinställning, bara fasta program, och det är den enda maskinen i jämförelsen som är byggd så. Isen krossas dessutom sämst av alla och locket deformerades av ånga i uthållighetsprovet.\n\nBor du litet och behöver kunna ställa undan blendern är det här den enda som verkligen är byggd för det. Vill du kunna bestämma farten själv finns det ingen anledning att välja den.",
  },
  {
    id: "obh-nordica-perfect-mix-plus",
    brand: "OBH Nordica",
    name: "Perfect Mix+ LH88ADS0",
    shortName: "Perfect Mix+",
    userRating: { value: 4.5, count: 2, checkedAt: PRICE_CHECKED },
    image: productImage(BLENDER.slug, "obh-nordica-perfect-mix-plus"),
    tagline: "1,5 liter och sugfötter, gjord för satsen till två personer.",
    scores: {
      /* Otestad av Applitest. Bedömd på konstruktionen: PowelixLife-knivar,
         1 200 W och 1,5 liter. Systermodellen Prime Mix har mer effekt och
         mätte 7,7 på mixerprestanda; betyget sätts under den. */
      mixningsresultat: 3.5,
      /* 1,5 liter, avtagbar insats som tål maskindisk, sugfötter i botten för
         stabilitet. Mindre kanna än merparten. */
      kannan: 3.5,
      /* Touchscreen med tre förinställda program plus rengöringsprogram. Ingen
         publicerad steglös reglering, alltså färre valmöjligheter än
         systermodellen Prime Mix. */
      kontroll: 3,
      /* Ingen publicerad ljudnivå, kontrollerat hos OBH Nordica och i sökning
         2026-08-06. Neutralt mittvärde, se blockkommentaren överst. */
      ljudniva: 3,
      /* Två års garanti enligt OBH Nordicas egen sidfot. Ingen labbprovning av
         uthålligheten finns för den här modellen. */
      uthallighet: 3,
    },
    price: 1749,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/obh-nordica/perfect-mix-advanced-blender-15-l/",
    superlative: "Bäst för små satser på bänken",
    pros: [
      "Sugfötter i botten, så den vandrar inte på bänken när isen tar emot",
      "Avtagbar insats som tål maskindisk, och ett rengöringsprogram som gör grovjobbet",
      "Touchscreen med tre program, alltså inget att torka rent i springor efter mixning",
      "1 749 kronor för 1 200 watt, vilket är prisvärt i sällskapet",
    ],
    cons: [
      "Tre fasta program och ingen angiven steglös reglering. Systermodellen Prime Mix ger full kontroll för 250 kronor mer",
      "1,5 liter är i minsta laget om du gör smoothie till fler än två",
      "Ingår inte i labbprovningen, så mixningsresultatet är bedömt och inte uppmätt",
      "Plastkanna, där systermodellen Prime Mix har glas för 250 kronor mer",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 200 W", highlight: true },
      { label: "Kannans volym", shortLabel: "Volym", value: "1 500 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Plast", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "3 förinställda program", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja, avtagbar insats", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Antal program", value: "3 plus rengöring" },
      { label: "Knivblad", value: "PowelixLife" },
      { label: "GTIN", value: "3016667290187" },
    ],
    verdict:
      "OBH Nordica Perfect Mix+ kostar 1 749 kronor och har en kanna på 1,5 liter. Den är byggd för satsen till en eller två personer snarare än till hela hushållet.\n\nSugfötterna är det praktiska draget. Blendrar vandrar på bänken när isen tar emot, och den här står still, vilket betyder att du kan lämna den igång och göra något annat. **Touchscreenen har tre program och ett rengöringsprogram, och en slät panel är betydligt lättare att torka ren än rader av knappar med springor emellan.** Insatsen lyfts ur och går i diskmaskinen.\n\nKontrollen är begränsad. Tre fasta program och ingen angiven steglös reglering betyder att du får den konsistens programmen ger. Systermodellen Prime Mix kostar 250 kronor mer och lägger till steglös hastighet och pulsfunktion.\n\nGör du en portion smoothie åt gången på en trång bänk passar den bra. Är ni fler än två i hushållet blir 1,5 liter en sats för lite, och då är Prime Mix eller Braun rätt köp.",
  },
  {
    id: "smeg-50s-style",
    brand: "Smeg",
    name: "50's Style BLF03 800 W",
    shortName: "50's Style",
    userRating: { value: 5, count: 3, checkedAt: PRICE_CHECKED },
    image: productImage(BLENDER.slug, "smeg-50s-style"),
    tagline: "Aluminiumhus i sex färger, byggd för att stå framme på bänken.",
    scores: {
      /* Otestad av Applitest. Bedömd på konstruktionen: 800 W är fältets
         svagaste motor med bred marginal, dubbla avtagbara knivblad och fyra
         program. Sätts lägst av de otestade, men inte lägst i fältet — den
         svagaste motorn förutsäger inte det sämsta resultatet, vilket är
         sidans eget fynd. */
      mixningsresultat: 3,
      /* Tritan-kanna 1,5 liter med dubbla avtagbara knivblad och
         säkerhetsstopp. Mindre än merparten. */
      kannan: 3.5,
      /* Fyra förinställda program: smoothie, green smoothie, iskross och
         auto-clean. Fasta steg. */
      kontroll: 3.5,
      /* Ingen publicerad ljudnivå, kontrollerat hos Smeg och i sökning
         2026-08-06. Neutralt mittvärde, se blockkommentaren överst. */
      ljudniva: 3,
      /* Två års garanti. Ingen labbprovning av uthålligheten finns. */
      uthallighet: 3,
    },
    price: 2395,
    oldPrice: 2995,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/smeg/smeg-50s-style-aesthetic-blender/",
    superlative: "Bäst för det öppna köket",
    pros: [
      "Hus i aluminium och sex färger, alltså den enda här som är gjord för att synas",
      "Säkerhetsstopp som hindrar start utan lock på",
      "Dubbla avtagbara knivblad i rostfritt stål, så du kommer åt under dem",
      "Auto-clean-program vid sidan av smoothie, green smoothie och iskross",
    ],
    cons: [
      "800 watt är fältets svagaste motor med bred marginal. Näst svagast är 1 200",
      "2 395 kronor för fyra fasta program, där Wilfa Xplode ger 25 steglösa lägen för hälften",
      "Ingår inte i labbprovningen, så mixningsresultatet är bedömt och inte uppmätt",
      "1,5 liter räcker inte till en sats för hela familjen",
    ],
    specs: [
      { label: "Motoreffekt", value: "800 W", highlight: true },
      { label: "Kannans volym", shortLabel: "Volym", value: "1 500 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Tritan", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "4 förinställda program", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Säkerhetslock", value: "Ja, säkerhetsstopp" },
      { label: "Hus", value: "Aluminium" },
      { label: "GTIN", value: "8017709328467" },
    ],
    verdict:
      "Smeg 50's Style kostar 2 395 kronor och har ett hus i aluminium som finns i sex färger. Den är den enda maskinen i jämförelsen som är byggd för att stå framme.\n\nDet är också hela argumentet, och det är ett riktigt argument. En blender som får plats på bänken används oftare än en som ska lyftas fram ur ett skåp, och den här är gjord för att någon ska vilja ha den där. **Fyra program täcker det de flesta gör: smoothie, green smoothie, iskross och en självrengöring, och knivbladen lyfts ur i två delar för att komma åt under.**\n\nMotorn är fältets svagaste med bred marginal. 800 watt mot 1 200 hos den näst svagaste betyder inte automatiskt sämre resultat, men den ingår inte i labbprovningen, så det finns inget mätvärde som visar var den landar.\n\nKöper du den köper du köket lika mycket som maskinen, och det är en fullt rimlig anledning. Handlar det bara om vad som kommer ur kannan får du mer för pengarna hos Braun, som kostar 600 kronor mindre.",
  },
  {
    id: "electrolux-explore-6",
    brand: "Electrolux",
    name: "Explore 6 E6TB1-6ST",
    shortName: "Explore 6",
    image: productImage(BLENDER.slug, "electrolux-explore-6"),
    tagline: "Billigast i jämförelsen, med glaskanna och variabel fart.",
    scores: {
      /* Mixerprestanda 6,3, näst lägst i fältet. Smoothien får 5,4 och
         beskrivs med klumpar av frysta bär och omixade havregryn. 6,2 på is
         och 4,8 på nöthack. */
      mixningsresultat: 3,
      /* Glaskanna 1,75 liter men **fältets tyngsta kanna**, 2 080 g med lock.
         Diskmaskinsäker. Applitest 7,0 på att fylla på och tömma. */
      kannan: 3,
      /* Variabel hastighet mellan min och max. Applitest gav 8,0 på att välja
         och anpassa program. */
      kontroll: 4,
      /* 93 dB uppmätt, näst högljuddast i fältet. */
      ljudniva: 1.5,
      /* Ingen anmärkning efter 100 cykler, 10,0 av 10. Två års garanti. */
      uthallighet: 4,
    },
    price: 1199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/koksapparater/mixers-blenders/blenders-mixers/electrolux-explore-6-blender-e6tb16st/455003",
    superlative: "Billigast av de labbtestade",
    pros: [
      "1 199 kronor, alltså 800 kronor under de flesta andra provade maskinerna",
      "Glaskanna på 1,75 liter som går i diskmaskinen",
      "Klarade 100 cykler i uthållighetsprovet utan anmärkning",
      "Variabel hastighet, alltså mer kontroll än flera maskiner som kostar dubbelt",
    ],
    cons: [
      "Smoothien blir ojämn med klumpar av frysta bär och omixade havregryn",
      "93 dB, näst högljuddast av allt som mättes",
      "Fältets tyngsta kanna, 2 080 gram med lock, i glas som inte tål att tappas",
      "Ojämnt nöthack, alltså i bottenhalvan på det momentet också",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 400 W", highlight: true },
      { label: "Kannans volym", shortLabel: "Volym", value: "1 750 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Glas", highlight: true },
      { label: "Ljudnivå", value: "93 dB", highlight: true },
      { label: "Beredningstid smoothie", shortLabel: "Smoothietid", value: "60 sek", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "Variabel", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Säkerhetslock", value: "Nej" },
      { label: "Totalvikt", value: "4 495 g" },
      { label: "Kannans vikt med lock", value: "2 080 g" },
      { label: "GTIN", value: "7332543793020" },
    ],
    verdict:
      "Electrolux Explore 6 kostar 1 199 kronor och är den billigaste maskinen som ingår i laboratorieprovningen. Kannan är av glas och rymmer 1,75 liter.\n\nDet den gör bra är att hålla. Den klarade 100 cykler i uthållighetsprovet utan en enda anmärkning, vilket bara fyra andra gjorde, och hastigheten är variabel i stället för fasta steg. **Glaskannan går i diskmaskinen och tar varken smak eller lukt.**\n\nSmoothien är problemet, och det är det de flesta köper en blender för. Laboratoriet fann klumpar av frysta bär och omixade havregryn efter avslutat program, och betyget blev näst lägst i hela fältet. Nöthacket blir också ojämnt, och 93 dB gör den till en av de två högljuddaste.\n\nSka du mest krossa is till drinkar och röra ihop en soppa då och då räcker den för pengarna. Är smoothie huvudärendet kostar Braun 600 kronor mer och gör den slät på 59 sekunder.",
  },
  {
    id: "philips-7000-series",
    brand: "Philips",
    name: "7000 Series HR3760/00",
    shortName: "7000 Series",
    image: productImage(BLENDER.slug, "philips-7000-series"),
    tagline: "Två liters glaskanna med 1,8 liter du faktiskt kan fylla.",
    scores: {
      /* Mixerprestanda 5,7, lägst i fältet. Smoothien får 4,3 med klumpar av
         frysta bär och omixade havregryn, och nöthacket 4,0, delat sämst. */
      mixningsresultat: 2.5,
      /* Glaskanna 1,8 liter arbetsvolym, diskmaskinsäker, men kannan väger
         1 990 g. Applitest gav 5,0 på att fylla på och tömma, lägst i fältet,
         och anmärkte på att locket var svårt att få av. */
      kannan: 3,
      /* Tolv hastighetslägen på pappret, men Applitest gav 4,0 på att välja och
         anpassa program, lägst av de nio: otydliga programval och en
         pulsfunktion som inte går att använda ihop med andra program. */
      kontroll: 2.5,
      /* 89 dB uppmätt. */
      ljudniva: 3,
      /* Ingen anmärkning efter 100 cykler, 10,0 av 10. Två års garanti. */
      uthallighet: 4,
    },
    price: 1389,
    oldPrice: 1799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/philips/7000-series-blender-hr376000-2-l/",
    superlative: "Bäst för milkshake och lättmixat",
    pros: [
      "1,8 liter arbetsvolym i glas för 1 389 kronor, delat störst glaskanna här",
      "Klarade 100 cykler i uthållighetsprovet utan anmärkning",
      "Tolv hastighetslägen, alltså flest steg av alla maskinerna",
      "Philips skriver själva ut både kannans två liter och den effektiva kapaciteten på 1,8",
    ],
    cons: [
      "Sämsta mixningsresultatet i hela jämförelsen, alltså klumpar av frysta bär och omixade havregryn",
      "Delat sämsta nöthacket, tillsammans med Wilfa Powerfuel",
      "Pulsfunktionen går inte att använda ihop med de andra programmen",
      "Locket är svårt att få av, och kannan väger 1 990 gram",
    ],
    specs: [
      { label: "Motoreffekt", value: "1 500 W", highlight: true },
      /* Philips egen formulering: "2 l glaskanna med 1,8 l effektiv
         kapacitet". Raden bär arbetsvolymen. */
      { label: "Kannans volym", shortLabel: "Volym", value: "1 800 ml", highlight: true },
      { label: "Material kannan", shortLabel: "Kanna", value: "Glas", highlight: true },
      { label: "Ljudnivå", value: "89 dB", highlight: true },
      { label: "Beredningstid smoothie", shortLabel: "Smoothietid", value: "62 sek", highlight: true },
      { label: "Hastighetsinställning", shortLabel: "Hastighet", value: "1–12", highlight: true },
      { label: "Diskmaskinsäker kanna", shortLabel: "Maskindisk", value: "Ja", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Kannans bräddvolym", value: "2 000 ml" },
      { label: "Säkerhetslock", value: "Nej" },
      { label: "Totalvikt", value: "4 560 g" },
      { label: "Kannans vikt med lock", value: "1 990 g" },
      { label: "GTIN", value: "8720389013539" },
    ],
    verdict:
      "Philips 7000 Series kostar 1 389 kronor och har en glaskanna som rymmer 1,8 liter i arbetsvolym, delat störst i jämförelsen.\n\nDen håller också. Hundra cykler i uthållighetsprovet utan en enda anmärkning, tolv hastighetslägen på pappret och en kanna som går i diskmaskinen. **Philips är dessutom en av tre tillverkare som skriver ut både kannans två liter och den effektiva kapaciteten på 1,8, i stället för att bara trycka det större talet.**\n\nMixningen är svagheten, och den är allvarlig. Smoothien fick lägst betyg av alla nio provade maskinerna, med klumpar av frysta bär och omixade havregryn kvar efter avslutat program, och nöthacket är delat sämst. De tolv hastighetslägena hjälper mindre än de låter, eftersom pulsfunktionen inte går att kombinera med de andra programmen och locket är svårt att få av.\n\nDen som bara vill ha en stor glaskanna till milkshake och lättmixade soppor får det billigt här. Ska frukostsmoothien bli slät finns det ingen anledning att välja den. Braun kostar 410 kronor mer och gör den perfekt.",
  },
];

export const BLENDER_PRODUCTS = resolveProducts(BLENDER, SEEDS);

/**
 * Produkter vi tittade på och lämnade utanför rankningen.
 *
 * Premiumänden är avsiktligt utelämnad. Prisjakt rankar Blendtec Designer 650
 * och Vitamix Ascent 3500i, och Råd & Rön skriver att hela deras prispall
 * bestod av powerblenders över 5 000 kronor. De säljs tunt i svensk handel och
 * ingen av dem ingår i den provning sidan bygger på, så de skulle ha rankats
 * på gissningar.
 */
export const BLENDER_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Vitamix",
    name: "Ascent 3500i",
    reason:
      "Kostar över 8 000 kronor och är en annan sorts maskin för en annan köpare. Den ingår inte i den labbprovning sidan bygger på, och att ranka den mot maskiner som mätts hade betytt att sätta ett betyg på rykte.",
    approxPrice: 8290,
    merchant: "KitchenTime",
    merchantUrl: "https://www.kitchentime.se/varumarken/vitamix/",
  },
  {
    brand: "Blendtec",
    name: "Designer 650",
    reason:
      "Samma skäl som Vitamix, plus att sortimentet i svensk handel är tunt och priset rör sig kraftigt mellan butikerna. Prisjakt rankar den etta i sin egen guide.",
    approxPrice: 7990,
  },
  {
    brand: "Sage",
    name: "The Super Q",
    reason:
      "Norska tek.no utsåg den till bäst i test bland toppblendrar och kostar omkring 5 900 kronor plus 900 för vakuumenheten, alltså tre gånger sidans vinnare. Den ligger utanför prisspannet och säljs sparsamt i Sverige.",
    approxPrice: 5900,
  },
  {
    brand: "WMF",
    name: "Kult X Mix & Go",
    reason:
      "En personlig smoothiemixer med drickflaska i stället för kanna, alltså en annan produkt. Den som vill mixa direkt i muggen får den funktionen på köpet med Ninja BN750EU, som också har en riktig kanna.",
    approxPrice: 749,
  },
  {
    brand: "Smeg",
    name: "50's Style Personal Blender 300 W",
    reason:
      "300 watt och en drickmugg på 600 ml. Den gör en smoothie åt en person och kan inte krossa is eller hacka nötter, alltså två av de tre moment sidan rankar på.",
    approxPrice: 1495,
    merchant: "KitchenTime",
    merchantUrl: "https://www.kitchentime.se/varumarken/smeg/personal-blender-2pack/",
  },
  {
    brand: "Bosch",
    name: "VitaPower Serie 4 MMB6141B",
    reason:
      "Föregångaren i plast till den Serie 6 som ligger tvåa här. tek.no gav den 6,5 av 10 i sitt samlingstest, alltså klart under Serie 6, och prisskillnaden mellan dem är liten i svensk handel.",
    approxPrice: 1290,
  },
];

/**
 * Mirrors the buying guide: every question the guide answers has an entry
 * here, phrased the way people search rather than the way we write headings.
 */
export const BLENDER_FAQ = [
  {
    question: "Hur många watt behöver en blender?",
    answer:
      "Färre än du tror, och watt-talet säger mindre om resultatet än något annat tal på kartongen. I Applitests laboratorieprovning av nio blendrar gjorde de två maskinerna på 1 200 watt sina smoothies på 45 och 55 sekunder, medan de två på 1 800 watt behövde 90 och 147. Nöthacket lutade åt samma håll: 9,5 och 7,9 av 10 för de svagaste motorerna mot 4,8 och 4,0 för de starkaste. Anledningen är att tiden bestäms av hur programmet är skrivet och resultatet av hur knivarna sitter, inte av hur mycket ström motorn drar. Räkna med att allt från 800 watt och uppåt räcker till smoothie, och lägg pengarna på kannan och reglagen i stället.",
  },
  {
    question: "Vad är skillnaden mellan en blender och en stavmixer?",
    answer:
      "En blender har en egen kanna som du fyller, och en stavmixer sänker du ner i grytan. Blendern är bättre på allt som ska bli riktigt slätt och på frysta råvaror, eftersom kannans form tvingar ner ingredienserna mot knivarna om och om igen. Stavmixern är bättre när det du mixar redan står i ett kärl, som en varm soppa, och den tar mindre plats. De flesta hushåll som gör smoothie flera gånger i veckan vill ha en blender; den som mest gör soppa klarar sig med en stavmixer.",
  },
  {
    question: "Vad är en powerblender?",
    answer:
      "En större blender med kraftigare motor, där friktionen från knivarna kan värma råvarorna så mycket att en kall soppa blir varm under mixningen. Råd & Rön provade sju sådana och fann att de nådde mellan 69 och 89 grader, utom en som stannade på 37 och alltså bara blev ljummen. Räkna med fem till åtta minuters mixning för att soppan ska bli varm, och lägg till tiden det tar att förkoka grönsakerna innan.",
  },
  {
    question: "Varför står det tre liter på kartongen när kannan rymmer två?",
    answer:
      "Därför att det större talet är kannans bräddvolym, alltså hur mycket som får plats om du fyller den till kanten, medan det mindre är vad maskinen faktiskt kan mixa. Tre tillverkare skriver ut båda talen själva: Bosch anger 3,0 liter max och 2,0 liter vid användning, Philips anger en tvålitersglaskanna med 1,8 liters effektiv kapacitet, och Ninja anger 2,1 liter tillbringare och 1,9 liter för flytande ämnen. Handeln trycker oftast bara det större. Jämför alltid arbetsvolymen, för det är den som avgör hur många portioner du får ur en körning.",
  },
  {
    question: "Hur högt låter en blender?",
    answer:
      "Mellan 83 och 94 decibel i den provning den här sidan bygger på, och Råd & Rön har uppmätt så mycket som 98,4 dB på en enskild modell. Skalan är logaritmisk, så de elva stegen mellan tystast och högljuddast är en mycket större skillnad än talen antyder. Testfakta jämför 93 och 94 dB med en motorgräsklippare eller en borrmaskin. Tänker du mixa frukost i ett öppet kök medan någon sover är det värt att leta upp en maskin i den nedre änden, och effekten hjälper dig inte att gissa, eftersom den tystaste maskinen i provningen drog 1 200 watt och en av de starkaste på 1 800 watt var näst tystast.",
  },
  {
    question: "Ska jag välja glaskanna eller plastkanna?",
    answer:
      "Glas tål varma vätskor, tar varken smak eller lukt och repas långsammare, men väger ungefär dubbelt och går sönder om det tappas. De tyngsta glaskannorna i jämförelsen väger runt två kilo med lock, mot 754 gram för den lättaste plastkannan. Modern blenderplast heter oftast Tritan och är både sprickfri och smakfri, så argumentet för glas är i dag mest känsla och hållbarhet över lång tid. Ska kannan lyftas ner i diskmaskinen full, eller upp ur ett högt skåp, är plast det som märks i vardagen.",
  },
  {
    question: "Kan man diska blenderkannan i maskin?",
    answer:
      "Oftast, men inte alltid, och det är värt att kolla innan köpet. Två av de nio labbtestade maskinerna har kannor som måste handdiskas, vilket betyder att du varje gång ska rengöra en hög smal behållare med en fast kniv i botten. Flera modeller har dessutom ett eget rengöringsprogram. Ett enkelt knep som fungerar på alla: häll i lite diskmedel, fyll till hälften med varmt vatten, kör på högsta hastighet i 30 sekunder och skölj ur.",
  },
  {
    question: "Varför blir min smoothie inte slät?",
    answer:
      "Vanligast är ordningen i kannan. Lägg vätskan och de mjuka råvarorna underst så att knivarna får något att arbeta i direkt, sedan torra ingredienser som pulver och havregryn, och tyngre frukt och grönsaker överst så att de trycker ner allt mot knivarna. Isbitar läggs i sist. Kör sedan igång lugnt och ge full gas efter några sekunder, och låt den gå längre än du tror, för en riktigt jämn textur tar ofta en till två minuter. Är det fortfarande klumpigt är det maskinen: i provningen fick två av nio anmärkning för klumpar av frysta bär och omixade havregryn kvar efter avslutat smoothieprogram.",
  },
  {
    question: "Vad är en vakuumblender och är det värt pengarna?",
    answer:
      "En vakuumblender suger ut luften ur kannan innan den mixar, med löftet om bättre smak, mer näring och längre hållbarhet. Norska tek.no har provat två och kunde mäta att smoothien blir kompaktare: en liter vägde 1 020 gram mixad med vakuum mot 913 gram utan, alltså mätbart mindre inblandad luft. Men de märkte ingen skillnad i smak, och i deras kylskåpsprov oxiderade vakuumsmoothien faktiskt mer än den vanliga. Köp funktionen om du är nyfiken på den, inte för att den löser ett problem du har.",
  },
  {
    question: "Behöver jag steglös hastighet eller räcker program?",
    answer:
      "Program räcker för smoothie, och det är det de flesta gör. Steglös hastighet spelar roll när konsistensen ska bli precis rätt eller när du börjar använda blendern till annat: en majonnäs vill startas långsamt, en grov salsa ska pulseras och inte pureas. Spannet i jämförelsen går från tolv lägen ner till en maskin utan hastighetsinställning över huvud taget, där du bara kan trycka på ett program och vänta. Har du bara program får du den konsistens tillverkaren har bestämt åt dig.",
  },
  {
    question: "Kan man göra varm soppa i en blender?",
    answer:
      "I de kraftigare modellerna, ja. Friktionen från knivarna värmer råvarorna medan de mixas, och en powerblender kan få soppan till mellan 70 och 90 grader på fem till åtta minuter. Två saker är värda att veta först. Använd förkokta grönsaker, eftersom rå potatis och lök smakar för skarpt, så den totala tillagningstiden blir längre än mixningstiden. Och kontrollera locket: i uthållighetsprovet deformerades fyra av nio lock av ångan från vätskan som knivarna värmt upp, och två av dem satt på maskiner som säljs just på soppfunktionen.",
  },
  {
    question: "Hur länge håller en blender?",
    answer:
      "Motorn är sällan det som ger upp. I uthållighetsprovet kördes varje maskin 100 gånger i tre minuter på max, och samtliga nio klarade det utan att motorn påverkades. Det som tar stryk är plastdetaljerna, framför allt locket: fyra av nio deformerades av ångan. Garantin säger något om vad tillverkaren själv tror, och där är spannet stort. Bosch lämnar tio år på motorn mot registrering, Wilfa fem år på hela produkten, och nio av de tretton maskinerna har två år.",
  },
];
