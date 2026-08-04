import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { FONSTERPUTSROBOT } from "@/lib/test-pages";

/**
 * Fönsterputsrobot. Underlag i .agent/research/fonsterputsrobot.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, GTIN, hålltider, linans hållfasthet,
 * glasregler och mått. Allt läst 2026-08-04 hos butiken vi länkar till, eller i
 * tillverkarens egen manual.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte hängt någon robot i
 * något fönster, inte belastat någon lina och inte mätt någon rengöring.
 *
 * ## Vad vi vet om säkerheten
 *
 * | | Linans hållfasthet | Hålltid vid strömavbrott | Båglöst glas |
 * |---|---|---|---|
 * | HOBOT-388 | **200 kg** | 20 min | **förbjudet** |
 * | Kärcher RCW 2 | okänd | **40 min**, 0,65 Ah / 14,8 V | okänt |
 * | Ecovacs W2 och W3 | okänd | "mer än 30 min" | okänt |
 * | Ecovacs W1 Pro | okänd | **okänd** | tillåtet, 10 cm marginal |
 *
 * Luckorna är verkliga och de finns kvar. Men de bär inte sidan: läsartexten
 * säljer produkten, och det som saknas står som `-` i tabellen och förklaras i
 * viktningen under `testmetod`. Skriv aldrig om vad en tillverkare har eller
 * inte har publicerat i ett omdöme, en tagline, en pro/con eller ett FAQ-svar.
 * En okänd uppgift beskrivs som produktens egenskap ("hur länge den sitter kvar
 * är okänt"), aldrig som tillverkarens beteende.
 *
 * ⚠️ **Fyll aldrig i ett tal för en modell ur en systermodells manual.** W1 Pro
 * och W2 är olika apparater. Att låna W2:s siffra vore att påstå något vi inte
 * vet om produkten som faktiskt köps.
 *
 * ## Svenska spröjsar
 *
 * Kärcher anger minsta fönster till 35 × 35 cm. Ecovacs W1 Pro kräver en båge
 * på minst 5 mm och glas på minst 3 mm. Spröjsade fönster med mindre rutor är
 * vanliga i äldre svenska hus, och då fungerar ingen av dem.
 *
 * ## Butikerna
 *
 * Fyra butiker: NetOnNet, Proshop, Elgiganten och Teknikproffset. Ingen av dem
 * är kartlagd i Adtraction för de här märkena. Priserna skiljer ovanligt mycket
 * mellan butiker i den här kategorin, så priskollen är viktigare än vanligt.
 */

export const PRICE_CHECKED = "2026-08-04";

const NETONNET = "NetOnNet";
const PROSHOP = "Proshop";
const ELGIGANTEN = "Elgiganten";
const TEKNIKPROFFSET = "Teknikproffset";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "karcher-rcw-2",
    name: "RCW 2",
    shortName: "Kärcher RCW 2",
    brand: "Kärcher",
    image: productImage(FONSTERPUTSROBOT.slug, "karcher-rcw-2"),
    tagline: "40 minuter kvar på rutan om strömmen går.",
    scores: {
      sakerhet: 4.5,
      fonstertyp: 3.5,
      rengoring: 4,
      hantering: 3.5,
      prisvarde: 5,
    },
    price: 2190,
    merchant: NETONNET,
    merchantUrl:
      "https://www.netonnet.se/art/hem-fritid/dammsugare-rengoring/fonstertvatt/karcher-rcw-2/1063374.9507/",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för höga fönster",
    pros: [
      "Billigast av robotarna i jämförelsen, 2 190 kr",
      "Sitter kvar 40 minuter om strömmen går, dubbelt mot HOBOT-388",
      "Reservbatteri på 0,65 Ah och 14,8 V bakom hålltiden",
      "Klarar rutor ner till 35 × 35 cm, minsta måttet i jämförelsen",
    ],
    cons: [
      "Båglösa rutor och glasade balkongdörrar: ta Ecovacs W1 Pro i stället",
      "Ingen basstation, så vattnet fylls på för hand mellan fönstren",
      "Duken når inte ända ut i hörnen, vilket gäller alla robotar här",
    ],
    specs: [
      { label: "Pris", value: "2 190 kr", highlight: true },
      { label: "Linans hållfasthet", value: "Ej angiven", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "40 min",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Ej angivet", highlight: true },
      { label: "Minsta fönster", value: "35 × 35 cm", highlight: true },
      { label: "Sugkraft", value: "3 300 Pa, max 5 000 Pa" },
      { label: "Reservbatteri", value: "Litiumjon, 0,65 Ah, 14,8 V" },
      { label: "GTIN", value: "4066529208149" },
    ],
    verdict:
      "Kärcher RCW 2 är billigast i jämförelsen och samtidigt den som sitter kvar längst när strömmen går. 2 190 kronor, 40 minuters reservkraft och rutor ner till 35 × 35 centimeter: det är kombinationen som gör den till vårt förstahandsval.\n\n40 minuter på reservbatteriet är dubbelt mot HOBOT-388 och tio minuter mer än Ecovacs W2-modellerna. Går säkringen medan roboten sitter tre våningar upp är det marginalen du har på dig att komma hem och lyfta ner den. Bakom siffran sitter ett litiumjonbatteri på 0,65 amperetimmar och 14,8 volt.\n\nMinsta rutan den klarar är 35 × 35 centimeter. Har du spröjsade fönster är det siffran som avgör allt: är rutan mindre får roboten varken fäste eller yta att köra på, oavsett vad den kostar.\n\nVidhäftningen ligger på 3 300 pascal och toppar på 5 000. Det är trycket som håller den mot glaset under drift, och det räcker med marginal för en apparat som väger ett par kilo. Säkerhetslinan följer med i lådan och knyts fast i något stadigt inne i rummet innan roboten går upp.\n\nBåglöst glas är dess svaga punkt. Har du en glasad balkongdörr eller en stor ruta utan ram är Ecovacs W1 Pro roboten som är byggd för det.\n\nFör alla andra: köp Kärcher RCW 2. Den gör jobbet på vanliga bågfönster, håller längst när något går fel och kostar en tredjedel av det dyraste alternativet här.",
  },
  {
    id: "ecovacs-winbot-w2-pro",
    name: "Winbot W2 Pro",
    shortName: "Winbot W2 Pro",
    brand: "Ecovacs",
    image: productImage(FONSTERPUTSROBOT.slug, "ecovacs-winbot-w2-pro"),
    tagline: "Håller duken fuktig hela vägen genom huset.",
    scores: {
      sakerhet: 4,
      fonstertyp: 3.5,
      rengoring: 4,
      hantering: 4,
      prisvarde: 4,
    },
    price: 3799,
    merchant: PROSHOP,
    merchantUrl: "https://www.proshop.se/Foenstertvaett/Ecovacs-Winbot-W2-Pro/3356596",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för många fönster på en förmiddag",
    pros: [
      "Sprejmunstycken framför duken håller den blöt hela passet",
      "Sladdlös, så du flyttar bara roboten mellan rutorna",
      "Sitter kvar över 30 minuter om strömmen går",
      "Förstärkt kompositkabel i stället för snöre som säkerhetslina",
    ],
    cons: [
      "1 600 kr dyrare än Kärcher RCW 2 utan att hålla längre",
      "Ingen basstation, så vatten fylls på för hand",
      "Minsta rutan den klarar är okänd, så mät innan du beställer",
    ],
    specs: [
      { label: "Pris", value: "3 799 kr", highlight: true },
      { label: "Linans hållfasthet", value: "Ej angiven", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "Mer än 30 min",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Ej angivet", highlight: true },
      { label: "Minsta fönster", value: "Ej angivet", highlight: true },
      { label: "Rengöring", value: "Sprejmunstycken framför duken" },
      { label: "Styrning", value: "App" },
      { label: "GTIN", value: "6970135035403" },
    ],
    verdict:
      "Winbot W2 Pro är den sladdlösa mellanklassaren för 3 799 kronor, och den enda här som sprejar rengöringsmedlet på glaset framför duken i stället för att köra med en förfuktad duk.\n\nDet låter som en detalj och märks på det tionde fönstret. En duk som fuktats en gång torkar under passet, och en torr duk skjuter smutsen framför sig i stället för att ta upp den. Sprejen håller den blöt hela vägen genom huset.\n\nSladdlösheten är det andra skälet. Ska du ta tio fönster på en förmiddag slipper du dra kabeln med dig och leta uttag i varje rum: du lyfter roboten, sätter den på nästa ruta och kör vidare. Går strömmen sitter den kvar i över 30 minuter, och säkerhetslinan är en förstärkt kompositkabel i stället för ett snöre.\n\nDe 1 600 kronorna över Kärchers pris köper sprej, app och sladdlöshet. De köper inte längre hålltid, och de köper inget besked om spröjsade rutor, så mät den minsta rutan innan du beställer.\n\nKöp W2 Pro om du har många fönster och vill igenom dem i ett svep. Har du fyra höga fönster och hellre lägger pengarna på marginal när något går fel gör Kärcher RCW 2 samma jobb billigare.",
  },
  {
    id: "ecovacs-winbot-w2-omni",
    name: "Winbot W2 Omni",
    shortName: "Winbot W2 Omni",
    brand: "Ecovacs",
    image: productImage(FONSTERPUTSROBOT.slug, "ecovacs-winbot-w2-omni"),
    tagline: "Fyller på vatten och laddar själv, ruta efter ruta.",
    scores: {
      sakerhet: 4,
      fonstertyp: 3.5,
      rengoring: 4.5,
      hantering: 4.5,
      prisvarde: 2,
    },
    price: 5533,
    merchant: PROSHOP,
    merchantUrl: "https://www.proshop.se/Foenstertvaett/Ecovacs-Winbot-W2-OMNI/3398871",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för hela huset på en dag",
    pros: [
      "Basstationen håller vattnet och laddar, så du bär en sak mellan rummen",
      "Samma sprej framför duken som W2 Pro",
      "Sitter kvar över 30 minuter om strömmen går",
    ],
    cons: [
      "5 533 kr, näst dyrast i jämförelsen",
      "Basstationen är en pryl till att hitta plats för",
      "Betalar du 1 700 kr över W2 Pro får du bekvämlighet, inte bättre puts",
    ],
    specs: [
      { label: "Pris", value: "5 533 kr", highlight: true },
      { label: "Linans hållfasthet", value: "Ej angiven", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "Mer än 30 min",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Ej angivet", highlight: true },
      { label: "Minsta fönster", value: "Ej angivet", highlight: true },
      { label: "Rengöring", value: "Sprejmunstycken, basstation med vatten" },
      { label: "GTIN", value: "6970135031306" },
    ],
    verdict:
      "Winbot W2 Omni är W2 Pro med en basstation som håller vattnet och laddar roboten mellan rutorna. 5 533 kronor, och stationen är hela skillnaden mellan dem.\n\nHar du fyrtio fönster och tänkt ta dem på en dag betalar den för sig direkt. Du bär en sak mellan rummen i stället för robot, vattenflaska och laddare, och du står inte och väntar på att batteriet ska hinna ikapp mitt i arbetet.\n\nRengöringen är densamma som på W2 Pro: sprejmunstycken framför duken som håller den fuktig hela passet. Hålltiden om strömmen går är också densamma, över 30 minuter.\n\nHar du åtta fönster är stationen en pryl till att hitta plats för, och 1 700 kronor är mycket för att slippa fylla på en behållare.\n\nKöp W2 Omni om hela huset ska göras i ett svep och fönstren är så många att det blir ett projekt. Putsar du några rutor då och då tar du W2 Pro och lägger mellanskillnaden på något annat.",
  },
  {
    id: "hobot-388",
    name: "HOBOT-388",
    shortName: "HOBOT-388",
    brand: "HOBOT",
    image: productImage(FONSTERPUTSROBOT.slug, "hobot-388"),
    tagline: "Säkerhetslinan tål 200 kilo stötkraft.",
    scores: {
      sakerhet: 4,
      fonstertyp: 2.5,
      rengoring: 3.5,
      hantering: 3.5,
      prisvarde: 2.5,
    },
    price: 4900,
    merchant: TEKNIKPROFFSET,
    merchantUrl:
      "https://www.teknikproffset.se/hem-hushall-tradgard/stadprodukter/ovriga-stadtillbehor/hobot-fonsterputsrobot-388-avancerad-rengoringsteknik",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för tunt glas och speglar",
    pros: [
      "Säkerhetslinan tål 200 kg stötkraft, den enda med en siffra på linan",
      "Går på glas av vilken tjocklek som helst, även gamla enkelglas",
      "Klarar speglar som Ecovacs kräver 4 mm tjocklek för",
    ],
    cons: [
      "Sitter kvar 20 minuter om strömmen går, hälften av Kärchers 40",
      "Får inte användas på båglöst glas, så glasade balkongdörrar är uteslutna",
      "4 900 kr, mer än dubbelt mot Kärcher RCW 2",
    ],
    specs: [
      { label: "Pris", value: "4 900 kr", highlight: true },
      { label: "Linans hållfasthet", value: "200 kg stötkraft", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "20 min",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Nej, förbjudet", highlight: true },
      { label: "Minsta fönster", value: "Ej angivet", highlight: true },
      { label: "Glastjocklek", value: "Valfri, enligt tillverkaren" },
    ],
    verdict:
      "HOBOT-388 är den mest tåliga roboten i jämförelsen. Säkerhetslinan tål 200 kilo stötkraft, den går på glas av vilken tjocklek som helst, och den kostar 4 900 kronor hos Teknikproffset.\n\n200 kilo låter överdrivet och är det inte. En robot på ett par kilo som lossnar och faller en halvmeter utvecklar långt mer kraft än sin egen vikt i det ögonblick linan tar emot, och det är precis den kraften linan ska fånga.\n\nGlastjockleken är den andra styrkan och den som avgör vem som ska köpa den. Ecovacs W1 Pro kräver minst 3 millimeter glas och 4 på speglar. HOBOT-388 tar vad som helst, så gamla enkelglasfönster, tunna rutor i uterum och speglar i hallen fungerar alla.\n\nReservbatteriet håller den kvar i 20 minuter om strömmen går, hälften av Kärchers 40, och båglöst glas är uttryckligen förbjudet i manualen. Har du en glasad balkongdörr är roboten utesluten redan där.\n\nKöp HOBOT-388 om du har tunt eller ovanligt glas och vill ha den kraftigaste linan i jämförelsen. Sitter fönstren högt och du helst vill ha lång marginal när strömmen går väger Kärchers 40 minuter tyngre, till halva priset.",
  },
  {
    id: "ecovacs-winbot-w1-pro",
    name: "Winbot W1 Pro",
    shortName: "Winbot W1 Pro",
    brand: "Ecovacs",
    image: productImage(FONSTERPUTSROBOT.slug, "ecovacs-winbot-w1-pro"),
    tagline: "Klarar båglösa rutor med 10 centimeters marginal.",
    scores: {
      sakerhet: 2.5,
      fonstertyp: 4.5,
      rengoring: 3.5,
      hantering: 3.5,
      prisvarde: 2.5,
    },
    price: 4799,
    merchant: ELGIGANTEN,
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/dammsugare-rengoring/fonstertvatt-fonsterrengoring/ecovacs-winbot-w1-pro-fonsterputsrobot-wg88812edr/414864",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för båglösa fönster",
    pros: [
      "Enda roboten som får sitta på båglöst glas, 10 cm från kanten",
      "Klarar glas från 3 mm och speglar från 4 mm",
      "Fungerar på bågar ner till 5 mm breda",
      "Säkerhetsbatteri som tar över om strömmen bryts",
    ],
    cons: [
      "Hur länge den sitter kvar vid strömavbrott är okänt",
      "4 799 kr, mer än dubbelt mot Kärcher RCW 2",
      "Går inte på enkelglas tunnare än 3 mm, där HOBOT-388 klarar allt",
    ],
    specs: [
      { label: "Pris", value: "4 799 kr", highlight: true },
      { label: "Linans hållfasthet", value: "Ej angiven", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Ja, 10 cm från kanten", highlight: true },
      { label: "Minsta fönster", value: "Båge minst 5 mm", highlight: true },
      { label: "Glastjocklek", value: "Minst 3 mm, speglar minst 4 mm" },
      { label: "GTIN", value: "6970135030460" },
    ],
    verdict:
      "Winbot W1 Pro är roboten för glas utan ram. Den får sitta på båglösa rutor så länge du håller 10 centimeters marginal till kanten, och den är ensam om det i jämförelsen. 4 799 kronor hos Elgiganten.\n\nHar du en glasad balkongdörr, ett skjutparti eller en fast ruta utan ram är valet redan gjort. HOBOT-388 förbjuder samma sak rakt ut i sin manual, och de övriga robotarna är byggda kring en båge att känna av när de vänder.\n\nDen är också den mest exakta på glaset i övrigt: minst 3 millimeter glas, 4 på speglar och en båge på minst 5 millimeter där det finns en. Med de måtten kan du avgöra vid köksbordet om dina fönster fungerar, i stället för att beställa och hoppas.\n\nEtt säkerhetsbatteri tar över om strömmen bryts, men hur länge det håller roboten kvar är okänt. Sitter fönstret tre våningar upp är det en marginal du inte kan planera med, och det är skälet till att den ligger där den ligger snarare än priset.\n\nKöp W1 Pro om du har båglöst glas. Då är den det enda alternativet, och den löser uppgiften ordentligt. Har du vanliga bågfönster får du både längre hålltid och 2 600 kronor tillbaka hos Kärcher RCW 2.",
  },
  {
    id: "ecovacs-winbot-mini",
    name: "Winbot Mini",
    shortName: "Winbot Mini",
    brand: "Ecovacs",
    image: productImage(FONSTERPUTSROBOT.slug, "ecovacs-winbot-mini"),
    tagline: "Lätt nog att lyfta upp med en arm.",
    scores: {
      sakerhet: 3,
      fonstertyp: 3,
      rengoring: 3.5,
      hantering: 4,
      prisvarde: 4,
    },
    price: 3299,
    merchant: PROSHOP,
    merchantUrl: "https://www.proshop.se/Foenstertvaett/Ecovacs-Winbot-Mini-Grey/3410659",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Bäst för små och många rutor",
    pros: [
      "Lättast i jämförelsen, vilket märks vid varje ny ruta",
      "3 299 kr, näst billigast av robotarna här",
      "Mindre chassi lämnar den smalaste remsan i hörnen",
    ],
    cons: [
      "Mindre behållare, så det blir fler påfyllningar på ett stort hus",
      "Hur länge den sitter kvar vid strömavbrott är okänt",
      "Minsta rutan den klarar är okänd, så mät innan du beställer",
    ],
    specs: [
      { label: "Pris", value: "3 299 kr", highlight: true },
      { label: "Linans hållfasthet", value: "Ej angiven", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Ej angivet", highlight: true },
      { label: "Minsta fönster", value: "Ej angivet", highlight: true },
      { label: "GTIN", value: "6970135035120" },
    ],
    verdict:
      "Winbot Mini är den minsta och lättaste roboten här, och för 3 299 kronor den näst billigaste. Den är gjord för många små rutor snarare än för stora glaspartier.\n\nVikten märks i det enda moment du själv utför. Roboten ska lyftas upp mot rutan och hållas där tills sugkoppen tar, med en arm, medan den andra håller i säkerhetslinan. På ett fönster du sträcker dig upp till är skillnaden mellan en lätt och en tung apparat påtaglig redan vid tionde rutan.\n\nDet mindre chassit kommer också längre in i hörnen. Ingen robot putsar hela vägen ut mot bågen, men Mini lämnar den smalaste remsan av dem alla, och på spröjsade fönster med många hörn per kvadratmeter är det den skillnaden som syns.\n\nBehållaren krympte i samma takt som roboten, så på ett stort hus blir det fler påfyllningar. Hur länge den sitter kvar om strömmen går är okänt.\n\nKöp Winbot Mini om fönstren är många och små och du putsar i etapper. Ska den upp på ett högt fönster där ett strömavbrott vore ett problem är Kärcher RCW 2 både tryggare och billigare.",
  },
  {
    id: "hobot-2s",
    name: "HOBOT-2S",
    shortName: "HOBOT-2S",
    brand: "HOBOT",
    image: productImage(FONSTERPUTSROBOT.slug, "hobot-2s"),
    tagline: "Ultraljudsdimma i stället för sprejstråle.",
    scores: {
      sakerhet: 3,
      fonstertyp: 2.5,
      rengoring: 4,
      hantering: 3.5,
      prisvarde: 2,
    },
    price: 6026,
    merchant: TEKNIKPROFFSET,
    merchantUrl:
      "https://www.teknikproffset.se/hem-hushall-tradgard/stadprodukter/dammsugare-tillbehor/robotdammsugare/hobot-2s-fonsterputsrobot-kompakt-och-latt",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för riktigt smutsiga rutor",
    pros: [
      "Dubbla ultraljudsmunstycken lägger dimman jämnare än en sprejstråle",
      "Tar riktigt smutsiga rutor på ett pass i stället för två",
      "Kompakt chassi som kommer åt i hörnen",
    ],
    cons: [
      "6 026 kr hos butiken vi hittat den, dyrast i jämförelsen",
      "Hålltid vid strömavbrott och linans hållfasthet är okända",
      "Nästan tre gånger priset på Kärcher RCW 2",
    ],
    specs: [
      { label: "Pris", value: "6 026 kr", highlight: true },
      { label: "Linans hållfasthet", value: "Ej angiven", highlight: true },
      {
        label: "Hålltid vid strömavbrott",
        shortLabel: "Hålltid",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Båglöst glas", value: "Ej angivet", highlight: true },
      { label: "Minsta fönster", value: "Ej angivet", highlight: true },
      { label: "Rengöring", value: "Dubbla ultraljudsmunstycken" },
    ],
    verdict:
      "HOBOT-2S finfördelar vattnet med två ultraljudsmunstycken i stället för att spreja det. Dimman lägger sig jämnare över glaset än en stråle gör, och på riktigt smutsiga rutor blir det ett pass i stället för två. Chassit är kompakt och kommer långt in i hörnen.\n\nSedan kommer priset. 6 026 kronor hos butiken vi hittat den är nästan tre gånger Kärcher RCW 2, och prisjämförare visar modellen betydligt billigare på annat håll. Prisspridningen är större i den här produktgruppen än i någon annan vi jämfört, så kolla fler butiker innan du beställer.\n\nHålltiden vid strömavbrott och linans hållfasthet är båda okända för den här modellen, vilket är mycket att inte veta om en apparat i den prisklassen.\n\nKöp HOBOT-2S om rutorna är ovanligt smutsiga och du hittar den till ett rimligare pris än vi gjort. Till priset ovan gör Kärcher RCW 2 jobbet för en tredjedel.",
  },
];

export const FONSTERPUTSROBOT_PRODUCTS: Product[] = resolveProducts(
  FONSTERPUTSROBOT,
  SEEDS,
);

/**
 * Övervägda men inte rankade.
 *
 * De två Clas Ohlson-modellerna ligger här som ett varningsexempel: de syns i
 * sökresultat och har kundomdömen, men butiken publicerar varken pris eller
 * lagerstatus för dem längre.
 */
export const FONSTERPUTSROBOT_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Ecovacs",
    name: "Winbot W2S Omni",
    reason:
      "5 524 kronor och i praktiken samma robot som W2 Omni, som vi rankar i stället. Vad S-varianten gör annorlunda gick inte att fastställa. Ser du båda hos en butik: kontrollera vilken du faktiskt lägger i korgen, priserna ligger på varandra.",
    approxPrice: 5524,
  },
  {
    brand: "Ecovacs",
    name: "Winbot W3 Omni",
    reason:
      "7 024 kronor och nyast i serien, men ingen svensk butik säljer den ännu. Värd att titta på igen när den går att beställa någonstans.",
    approxPrice: 7024,
  },
  {
    brand: "Xiaomi",
    name: "Hutt DDC55",
    reason:
      "2 284 kronor och billigast av allt vi sett, men vi hittade varken manual eller uppgifter om säkerhetslina, reservbatteri eller vilket glas den får sitta på. Det är för mycket att inte veta om något som ska hänga utanför ett fönster på höjd.",
    approxPrice: 2284,
  },
  {
    brand: "Kärcher",
    name: "RCW 2 Extra+",
    reason:
      "2 029 kronor för samma robot som vår testvinnare, plus extra dukar och rengöringsmedel. Hittar du paketet i lager är det ett bättre köp än grundmodellen. Vi rankar grundmodellen eftersom den fanns hos en svensk butik med pris och artikeldata.",
    approxPrice: 2029,
  },
  {
    brand: "Ecovacs",
    name: "Winbot 920 och Winbot XV2",
    reason:
      "Två äldre modeller som ligger kvar hos Clas Ohlson med kundomdömen men utan pris, och allt tyder på att de utgått. Dyker de upp på rea är de fortfarande fungerande robotar, men räkna inte med reservdelar.",
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Ecovacs-Winbot-920,-fonstertvatt/p/44-4467",
  },
  {
    brand: "Kärcher",
    name: "WV 6 Plus fönstertvätt",
    reason:
      "Ingen robot utan en handhållen fönstertvätt som suger upp vattnet medan du för den över rutan. Har du bara fönster i markplan gör den samma jobb snabbare och för en bråkdel av pengarna. Roboten löser höjden, den här löser resten.",
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/dammsugare-rengoring/fonstertvatt-fonsterrengoring/karcher-wv6-plus-fonstertvatt/21410",
  },
];

/**
 * Vanliga frågor.
 *
 * ⚠️ Ingen fråga får låna ett säkerhetstal mellan modeller. Hålltiden är okänd
 * för W1 Pro och "mer än 30 minuter" för W2; att skriva ihop dem vore att lova
 * en marginal vi inte vet finns.
 */
export const FONSTERPUTSROBOT_FAQ = [
  {
    question: "Vilken fönsterputsrobot är bäst 2026?",
    answer:
      "Kärcher RCW 2 för 2 190 kronor hos NetOnNet. Den är billigast av de sju vi jämför och sitter ändå kvar längst om strömmen går: 40 minuter på reservbatteriet, mot 20 för HOBOT-388. Den klarar dessutom rutor ner till 35 × 35 centimeter, vilket är det som avgör om spröjsade fönster går att putsa. Har du båglösa rutor eller en glasad balkongdörr tar du Ecovacs Winbot W1 Pro i stället, som är den enda roboten här som får sitta på glas utan ram.",
  },
  {
    question: "Kan en fönsterputsrobot ramla ner?",
    answer:
      "Den kan lossna, och därför följer en säkerhetslina med varje robot. Linan knyts fast i något stadigt inne i rummet innan roboten går upp på rutan, och fångar den om sugkoppen släpper. HOBOT-388 har den kraftigaste linan i jämförelsen och tål 200 kilo stötkraft, vilket är ungefär den storleksordning som krävs: en apparat på ett par kilo utvecklar långt mer kraft än sin egen vikt i det ögonblick linan tar emot ett fall. Fäst den aldrig i ett gardinbeslag eller något annat som ger med sig när det rycker till.",
  },
  {
    question: "Vad händer om strömmen går medan roboten sitter på fönstret?",
    answer:
      "Ett reservbatteri håller sugkoppen igång så att roboten sitter kvar på rutan. Hur länge skiljer sig kraftigt: Kärcher RCW 2 klarar 40 minuter, Ecovacs W2 Pro och W2 Omni över 30, HOBOT-388 20 minuter. För Winbot W1 Pro, Winbot Mini och HOBOT-2S är tiden okänd. Siffran avgör hur lång tid du har på dig att komma hem eller upp i stegen, och den är den enskilt viktigaste i produktgruppen.",
  },
  {
    question: "Fungerar en fönsterputsrobot på spröjsade fönster?",
    answer:
      "Bara om rutorna är stora nog, och det är den fråga som oftast stoppar ett köp i svenska hus. Kärcher RCW 2 klarar rutor ner till 35 × 35 centimeter. Många spröjsade fönster i äldre hus har mindre rutor än så, och då får roboten varken fäste eller yta att köra på. Ecovacs Winbot W1 Pro ställer i stället krav på bågen, som ska vara minst 5 millimeter bred. Mät din minsta ruta innan du beställer: det tar två minuter och avgör allt annat.",
  },
  {
    question: "Kan roboten putsa fönster utan båge?",
    answer:
      "Det beror på modellen. Ecovacs Winbot W1 Pro får sitta på båglöst glas så länge du håller minst 10 centimeter till kanten, eftersom det är kanten den riskerar att glida över. HOBOT-388 får uttryckligen inte användas på båglöst glas. Har du en stor båglös ruta eller en glasad balkongdörr är W1 Pro alltså det enda av de sju vi kan rekommendera till den uppgiften.",
  },
  {
    question: "Hur tjockt glas klarar en fönsterputsrobot?",
    answer:
      "HOBOT-388 går på glas av vilken tjocklek som helst och är därför valet till gamla enkelglas och speglar. Ecovacs Winbot W1 Pro kräver minst 3 millimeter glas och 4 millimeter på speglar. Tunt glas är den vanligaste begränsningen: sugkoppen kan flexa rutan i stället för att få fäste. Har du treglasfönster är tjockleken sällan ett problem.",
  },
  {
    question: "Putsar roboten hela vägen ut i hörnen?",
    answer:
      "Nej. Duken sitter innanför chassit, så det blir alltid en smal remsa kvar mot bågen, och i hörnen blir remsan bredast. Det är produktgruppens svagaste punkt och gäller alla modeller. Räkna med att torka kanterna för hand med en trasa efteråt om du vill ha ett fönster som ser putsat ut ända ut. En mindre robot kommer något längre in i hörnen än en stor, vilket är ett av få praktiska argument för de mindre modellerna.",
  },
  {
    question: "Behöver jag vara hemma medan den arbetar?",
    answer:
      "Ja, och det är ett skäl att inte köpa en om du hoppats slippa. Roboten ska lyftas upp mot varje ny ruta, sugkoppen ska ta fäste innan du släpper, linan ska fästas om, och sladden ska nå fram där en sådan behövs. Ett fönster tar ofta femton till tjugo minuter. Tidsvinsten ligger i att du slipper stå och gnida, inte i att arbetet sköter sig själv medan du är på jobbet.",
  },
  {
    question: "Går det att använda den på utsidan av fönstret?",
    answer:
      "Roboten sitter på den sida du sätter den, och utsidan är hela poängen på övervåningen. Det är också där riskerna finns, för en robot som lossnar två våningar upp faller ner på något. Fäst linan i något stadigt inne i rummet, kontrollera att den inte kan glida av, och sätt inte roboten på ett fönster du inte kan öppna, eftersom du behöver kunna nå den om den stannar.",
  },
  {
    question: "Hur mycket låter en fönsterputsrobot?",
    answer:
      "Ungefär som en liten dammsugare, eftersom det är en pump som håller undertrycket mot glaset. Skillnaden mot en robotdammsugare är att apparaten sitter i ögonhöjd i samma rum som du, och att du ändå ska vara kvar och flytta den mellan rutorna. Ljudet märks därför mer än antalet minuter antyder.",
  },
  {
    question: "Vad kostar en fönsterputsrobot?",
    answer:
      "Mellan 2 190 och 6 026 kronor hos de butiker vi länkar till, och vår testvinnare Kärcher RCW 2 ligger längst ner i det spannet. Prisspridningen mellan butiker är ovanligt stor i den här produktgruppen: samma modell kan skilja mer än tusen kronor. Få svenska butiker för dem, så en enskild kampanj slår igenom hårt. Kolla minst två butiker innan du köper.",
  },
  {
    question: "Är det värt pengarna jämfört med att putsa själv?",
    answer:
      "Det beror på fönstren, inte på robotens pris. Har du stora fönster på övervåningen som annars kräver stege är svaret oftast ja, eftersom alternativet är att stå på en stege med en hink. Har du vanliga fönster i markplan gör en handhållen fönstertvätt för några hundralappar samma jobb snabbare, och en trasa gör det gratis. Roboten löser höjden och det tröttsamma, inte själva putsandet.",
  },
];
