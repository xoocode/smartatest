import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { STAVMIXER } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /stavmixer.
 *
 * Tredje sidan i gruppen Kök, byggd 2026-08-06. Sidan rankar tolv stavmixrar
 * mellan 549 och 3 299 kronor, både sladdade och batteridrivna, efter
 * användarbeslut.
 *
 * Priser, artikelnummer, GTIN, lagerstatus och kundbetyg är lästa i
 * produktsidans egen JSON-LD hos KitchenTime på PRICE_CHECKED, och renderade i
 * riktig webbläsare hos Cervera, Elon och Bagaren och Kocken, som alla bygger
 * priset med JavaScript. Specifikationerna är lästa hos **tillverkaren**.
 *
 * AFFILIATE-SWAP — `merchantUrl` är butikens egen produktsida. Inget
 * `affiliateUrl` någonstans; ansökningar till Bosch Home SE och Cervera pågår.
 * Se lib/links.ts för vad LINK_MODE står på i dag.
 *
 * ## Watt mäter uttaget, varvtal mäter kniven
 *
 * Hela handeln säljer kategorin på watt. Varenda konkurrent har effekt som
 * första specrad, och ingen av de tio publicerar ett varvtal. Talet mäter
 * motorns anslutningseffekt, alltså elen in i vägguttaget, och det följer inte
 * hur fort kniven går:
 *
 * - **Philips ProMix HR2652/90**: 800 W och max 11 500 v/min, ur Philips eget
 *   datablad, version 6.0.1.
 * - **Bamix Swissline**: 200 W i Sverige och 17 000 till 18 000 v/min i läge 2,
 *   ur F&H:s svenska manual och bamix.us egen specifikation.
 * - **Wilfa Prostick**: 1 000 W och tre steg om 5 000, 10 000 och 15 000 v/min,
 *   ur Wilfas egen produktsida.
 * - **Bamix Cordless**: 200 W och 8 000 till 13 000 v/min.
 *
 * ⚠️ **Samma bamix anges som 150 W i USA och 200 W i Sverige**, eftersom
 * nätspänningen skiljer. Varvtalet är detsamma i båda dokumenten, 18 000 i
 * läge 2. Talet på kartongen ändras alltså med landet; det kniven gör med maten
 * gör det inte.
 *
 * ## Därför bär `Varvtal` ingen vikt
 *
 * Fyra av tolv tillverkare anger ett tal, åtta anger ingenting. Ett kriterium
 * som en tredjedel av fältet kan placeras på delar ut de andras vikt gratis,
 * exakt felet som beskrivs vid `redistributeMissing` i lib/products.ts. Talet
 * bär i stället ett eget avsnitt högt på sidan och en tabellrad som får vara
 * gles. Se `ALDRIG_BEDOMD` i lib/spec-schema.mjs.
 *
 * ## `Effekt` är tillverkarens specfält, aldrig säljtextens tal
 *
 * Brauns egen svenska produktsida för MQ 9135XI anger `Effekt (W) 1000` i två
 * specifikationsrutor och `1200 W` tre gånger i säljtexten på samma sida.
 * MQ7035X anger 850 W i specfältet där Elon säljer den som 1 000 W. Vi tar
 * specfältet, samma disciplin som JBL Charge 6 på /bluetooth-hogtalare.
 *
 * ## ⚠️ ninjasverige.com.se är inte Ninja
 *
 * Ett första svep hämtade Ninjas specifikationer från `ninjasverige.com.se`,
 * som ligger överst på Google för "Ninja Kitchen Sverige". Sidan anger
 * **120 volt, 60 tums sladd, 3,17 pounds och 5,4 ampere**, alltså amerikanska
 * enheter, och dess inloggningsformulär är på spanska. `ninjakitchen.se`
 * pekar om till **sharkninja.se**, som är tillverkarens riktiga svenska butik.
 *
 * Talen skiljer sig i sak: den falska sidan anger 650 W och 1 års garanti,
 * SharkNinja anger **850 W och 2 år**. Båda hade blivit publicerade och båda
 * hade varit fel. Samma fälla som `levoit.com.se` i .claude/context/money.md.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte mixat en enda soppa. Råd & Rön har provat 57 stavmixrar i labb
 * och M3 sju för hand; ingendera provningens betyg påverkar en enda poäng här,
 * och Råd & Rön förbjuder dessutom vidarepublicering av sina resultat.
 */

export const PRICE_CHECKED = "2026-08-06";

const SEEDS: ProductSeed[] = [
  {
    id: "obh-nordica-infinyforce-pro",
    brand: "OBH Nordica",
    name: "InfinyForce Pro",
    shortName: "OBH InfinyForce Pro",
    image: productImage(STAVMIXER.slug, "obh-nordica-infinyforce-pro"),
    tagline:
      "Steglös fart plus puréfot, och reservdelar utlovade i 15 år.",
    scores: {
      /* Steglös reglering plus turboknapp och en display som visar vilket läge
         du står i. Tillsammans med Braun MQ 9135XI det finaste greppet om
         farten i fältet. */
      hastighetsreglering: 5,
      /* Ballongvisp, minihackare, mixerbägare och en puréfot, alltså fyra
         tillbehör där de flesta har två eller tre. Puréfoten är ovanlig. */
      tillbehor: 4.5,
      /* Fyrbladig Powelix-kniv i rostfritt, skaft i rostfritt stål och plast,
         löstagbart och maskindiskbart tillsammans med visp och hackarblad. */
      mixerfot: 5,
      /* OBH håller reservdelar tillgängliga 15 år efter inköpsdatum sedan
         2022-01-01, även efter garantitidens slut, och märker de produkter som
         klarar kravet. Längsta uttalade åtagandet i fältet vid sidan av bamix
         livstidsgaranti på motorn. */
      reservdelar: 5,
      /* 1 200 W, högst av de tolv enligt tillverkarens eget specfält. */
      effekt: 5,
    },
    price: 1490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/obh-nordica-infiny-force-pro-stavmixer-set-1200-w_56674/",
    award: "winner",
    superlative: "Bäst för den som mixar varje dag",
    pros: [
      "Steglös hastighet plus turboknapp, så du kan starta långsamt i majonnäsen och gå upp i frysta bär",
      "Reservdelar utlovade i 15 år efter inköpsdatum, längst i jämförelsen tillsammans med bamix",
      "Fyrbladig Powelix-kniv i rostfritt stål på ett löstagbart skaft",
      "Puréfot ingår, alltså den som gör potatismos utan att degen blir seg",
      "1 200 W enligt tillverkarens eget specfält, mest i jämförelsen",
      "Visp, minihackare och mixerbägare med i lådan",
    ],
    cons: [
      "1,63 kilo, tyngst av de tolv, vilket märks när du står och mixar en stor gryta soppa",
      "Kabeln är 1,1 meter, så du behöver ett uttag nära spisen",
      "Garantin är två år, alltså samma som de billigaste maskinerna här, medan Wilfa ger fem och bamix livstid på motorn",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 490 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 200 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "Ej angivet", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "Steglös + turbo", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Rostfritt stål", highlight: true },
      { label: "Antal knivblad", shortLabel: "Blad", value: "4 (Powelix)", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "15 år efter inköp", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "2 år", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "1,63 kg", highlight: true },
      { label: "Tillbehör", value: "Ballongvisp, minihackare, mixerbägare, puréfot" },
      { label: "Löstagbar mixerfot", value: "Ja" },
      { label: "Strömkälla", value: "Sladd" },
      { label: "Sladdlängd", value: "1,1 m" },
      { label: "Maskindiskbara delar", value: "Skaft, bägare, skål, hackarblad, visp och puréfot" },
      { label: "Artikelnummer", value: "HN95HDS0" },
    ],
    verdict:
      "OBH Nordica InfinyForce Pro kostar 1 490 kronor och tar hem jämförelsen på att den är bäst eller näst bäst på fyra av fem punkter samtidigt. Den drar 1 200 watt enligt OBH:s eget specfält, mest av de tolv.\n\n**Det som avgör är hastighetsreglaget.** Farten är steglös och sitter under tummen, med en turboknapp bredvid och en display som visar var du står. Det låter som en detalj tills du gör majonnäs: äggulan och oljan måste startas långsamt för att emulsionen ska ta, och en maskin med en enda fast fart slår sönder den. Samma reglage låter dig gå upp till full effekt när frysta hallon ligger i botten av bägaren.\n\n**Fyra tillbehör följer med, och ett av dem är ovanligt.** Ballongvisp, minihackare och mixerbägare är standard i den här prisklassen, men puréfoten är det inte. Den är gjord för potatis, som blir seg och klistrig av vanliga knivblad eftersom stärkelsen piskas sönder, och den ensam gör att maskinen ersätter potatispressen i lådan. Kniven är fyrbladig i rostfritt stål och skaftet går att lyfta av och lägga i diskmaskinen tillsammans med visp och hackarblad.\n\nDen väger 1,63 kilo, tyngst i jämförelsen, och det märks efter en minut över en full gryta. Kabeln är dessutom bara 1,1 meter. Vill du ha något lättare i handen tar du Braun MultiQuick 9 för 1 573 kronor, som väger 0,7 kilo. Alla andra köper den här.",
  },
  {
    id: "braun-multiquick-9-mq9135xi",
    brand: "Braun",
    name: "MultiQuick 9 MQ 9135XI",
    shortName: "Braun MQ 9135XI",
    image: productImage(STAVMIXER.slug, "braun-multiquick-9-mq9135xi"),
    tagline: "Kniven rör sig upp och ner, så isen krossas utan att du lyfter.",
    scores: {
      /* Steglös reglering där trycket på knappen är hastigheten, plus imode med
         tre lägen: puls, låg och hög. Finaste greppet i fältet. */
      hastighetsreglering: 5,
      /* Hackare 500 ml, iskrossarkniv, visp och bägare. Iskniven är ensam i
         jämförelsen. */
      tillbehor: 4.5,
      /* ActiveBlade: kniven rör sig upp och ner i skaftet under mixningen, det
         enda rörliga knivsystemet i fältet, plus stänkskydd och EasyClick Plus.
         Metall och plast. */
      mixerfot: 5,
      /* Reservdelar går via auktoriserad servicekanal och tredjepartslager,
         inte via Braun själva. Garanti på normalnivå. */
      reservdelar: 3,
      /* 1 000 W enligt Brauns eget specfält. Säljtexten på samma sida säger
         1 200, och handeln återger det talet. Se filhuvudet. */
      effekt: 4.5,
    },
    price: 1573,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Cervera",
    merchantUrl:
      "https://www.cervera.se/produkt/braun-braun-stavmixer-hb901ai-mq9135xi",
    award: "editor",
    superlative: "Bäst för frysta bär och is",
    pros: [
      "ActiveBlade, där kniven rör sig upp och ner under mixningen, ensam i jämförelsen",
      "Steglös hastighet under tummen plus tre lägen: puls, låg och hög",
      "Iskrossarkniv följer med, vilket ingen annan här har",
      "0,7 kilo, lättast av de sladdade, alltså hälften av vinnarens vikt",
      "Sladden är 1,2 meter, längst i jämförelsen",
      "Hackare på 500 ml, visp och bägare i lådan",
    ],
    cons: [
      "Reservdelar går via verkstad och tredjepartslager i stället för direkt från tillverkaren, till skillnad från bamix, OBH och Ninja",
      "Braun anger 1 000 W i sitt eget specfält medan säljtexten och butikerna skriver 1 200, så du får mindre motor än siffran i hyllan lovar",
      "83 kronor dyrare än vinnaren utan att ge fler tillbehör",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 573 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 000 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "Ej angivet", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "Steglös + 3 lägen", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Metall och plast", highlight: true },
      { label: "Antal knivblad", shortLabel: "Blad", value: "ActiveBlade, rörlig", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "Via auktoriserad verkstad", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "2 år", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "0,7 kg", highlight: true },
      { label: "Tillbehör", value: "Hackare 500 ml, iskrossarkniv, visp, bägare" },
      { label: "Löstagbar mixerfot", value: "Ja, EasyClick Plus" },
      { label: "Strömkälla", value: "Sladd" },
      { label: "Sladdlängd", value: "1,2 m" },
      { label: "Artikelnummer", value: "HB901-MQ9135XI" },
    ],
    verdict:
      "Braun MultiQuick 9 MQ 9135XI kostar 1 573 kronor och är den enda stavmixern här vars kniv rör sig. Den väger 0,7 kilo, alltså mindre än hälften av vinnaren.\n\n**ActiveBlade är skälet att välja den.** I en vanlig stavmixer sitter kniven still längst ner i skyddskorgen, och när du mixar något hårt eller frusen trycker maten undan och lägger sig ovanför bladet, så du får lyfta och sänka staven själv för att få ner den igen. Här går kniven upp och ner inne i skaftet medan den snurrar. Frysta bär och isbitar dras in i stället för att flyta upp, och det märks tydligast i den sista fjärdedelen av en smoothie, där de flesta stavmixrar lämnar bitar.\n\n**Greppet om farten är det finaste i jämförelsen.** Hastigheten är steglös och styrs av hur hårt du trycker på knappen, ovanpå det ligger tre lägen: puls, låg och hög. Låg begränsar spannet så att en mjuk avokado inte blir vattnig, puls ger korta stötar för lök som ska hackas och inte moseras. En iskrossarkniv följer med, vilket ingen annan här har, och sladden på 1,2 meter är den längsta i jämförelsen.\n\nSvagheten är vad som händer efter garantitiden. Braun säljer inte reservdelar direkt, utan hänvisar till auktoriserad verkstad, medan bamix, OBH och Ninja säljer delar över disk. Räknar du med att ha maskinen i tio år tar du OBH Nordica InfinyForce Pro för 83 kronor mindre.",
  },
  {
    id: "wilfa-prostick-im4b-1000fp",
    brand: "Wilfa",
    name: "Prostick IM4B-1000FP",
    shortName: "Wilfa Prostick",
    image: productImage(STAVMIXER.slug, "wilfa-prostick-im4b-1000fp"),
    tagline: "15 000 varv i minuten, och fem års garanti på motorn.",
    scores: {
      /* Tre fasta steg om 5 000, 10 000 och 15 000 v/min. Publicerade, väl
         spridda, men fasta: du väljer före du startar i stället för under. */
      hastighetsreglering: 3.5,
      /* Två mixerarmar, precisionshackare, visp och två Tritan-bägare på 0,5
         och 1 liter som tål 100 grader. Rikast i lådan tillsammans med
         bamix Swissline. */
      tillbehor: 5,
      /* Stål och plast, två utbytbara mixerarmar. */
      mixerfot: 4.5,
      /* 5 års garanti på hela Wilfas sortiment och upp till 10 på utvalda
         produkter, i båda fallen på motorn. Näst starkast efter bamix
         livstidsgaranti och OBH:s 15 år. */
      reservdelar: 4.5,
      /* 1 000 W. */
      effekt: 4.5,
    },
    price: 2499,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/wilfa/wilfa-prostick-im4b1000fp-stavmixer/",
    superlative: "Bäst för den som vill ha allt med",
    pros: [
      "Tre hastigheter angivna som 5 000, 10 000 och 15 000 varv i minuten, alltså ett av fyra märken här som säger hur fort kniven går",
      "Fem års garanti på motorn, mot två år hos Braun, Bosch, Smeg och Ninja",
      "Två mixerarmar, precisionshackare och visp i lådan",
      "Bägare i Tritan på 0,5 och 1 liter som tål 100 grader, alltså går att mixa soppan direkt i",
      "1 000 W enligt tillverkarens eget specfält",
    ],
    cons: [
      "Tre fasta steg i stället för steglöst, så du väljer farten innan du startar och inte medan du mixar",
      "2 499 kronor, alltså tusen kronor över vinnaren utan att mixa bättre",
      "Wilfas eget kundbetyg på KitchenTime är 3,3 av 5, lägst av de tolv",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 499 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 000 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "5 000 / 10 000 / 15 000 v/min", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "3 fasta steg", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Stål och plast", highlight: true },
      { label: "Antal knivblad", shortLabel: "Blad", value: "4", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "5 års motorgaranti", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "5 år", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "1,1 kg", highlight: true },
      { label: "Tillbehör", value: "Två mixerarmar, precisionshackare, visp, bägare 0,5 och 1 l" },
      { label: "Bägarens volym", value: "500 och 1 000 ml, Tritan, tål 100 °C" },
      { label: "Strömkälla", value: "Sladd" },
      { label: "GTIN", value: "7044876040107" },
    ],
    userRating: { value: 3.3, count: 6, scale: 5, checkedAt: PRICE_CHECKED },
    verdict:
      "Wilfa Prostick IM4B-1000FP kostar 2 499 kronor och är en av fyra maskiner här som talar om hur fort kniven går: 5 000, 10 000 och 15 000 varv i minuten. Den drar 1 000 watt och har fem års garanti på motorn.\n\n**De publicerade varvtalen är mer värda än de låter.** Åtta av tolv tillverkare anger bara watt, alltså vad motorn drar ur vägguttaget, och du får gissa vad som händer i botten av kastrullen. Här vet du: det översta steget ligger på 15 000 varv, vilket räcker till frysta bär och till att få smoothien slät i stället för grynig. Steget på 5 000 är låg nog för majonnäs.\n\n**Lådan är den rikaste i jämförelsen.** Två mixerarmar, en precisionshackare, en visp och två bägare i Tritan på en halv och en hel liter, båda tåliga upp till 100 grader. Det sista är inte en detalj: du kan hälla den heta soppan direkt i bägaren och mixa där i stället för att flytta den till en skål först. Femårsgarantin gäller motorn, mot två år hos Braun, Bosch, Smeg och Ninja.\n\nMen farten sitter i tre fasta lägen, inte i tummen, och du måste välja innan du startar. Priset är dessutom tusen kronor över vinnaren. Vill du ha samma trygghet billigare finns OBH Nordica InfinyForce Pro för 1 490 kronor, som lovar reservdelar i 15 år.",
  },
  {
    id: "braun-multiquick-7-mq7035",
    brand: "Braun",
    name: "MultiQuick 7 MQ7035",
    shortName: "Braun MQ7035",
    image: productImage(STAVMIXER.slug, "braun-multiquick-7-mq7035"),
    tagline: "Samma rörliga kniv som storebror, för 583 kronor mindre.",
    scores: {
      /* Steglös SmartSpeed: ju hårdare du trycker desto mer effekt. Saknar
         MQ 9:ans imode med tre separata lägen. */
      hastighetsreglering: 4.5,
      /* Hackare 500 ml, visp och bägare. Ingen iskniv. */
      tillbehor: 4,
      /* Samma ActiveBlade som MQ 9135XI, alltså rörlig kniv, plus EasyClick.
         Metall och plast. */
      mixerfot: 5,
      /* Samma läge som MQ 9135XI: verkstad och tredjepartslager. */
      reservdelar: 3,
      /* 850 W enligt Brauns eget specfält. Elon säljer den som 1 000 W. */
      effekt: 4,
    },
    price: 990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/braun-mq7035iwh-118378",
    superlative: "Bäst för under tusenlappen",
    pros: [
      "Samma ActiveBlade med rörlig kniv som den dubbelt så dyra MultiQuick 9",
      "Steglös SmartSpeed, där trycket på knappen är hastigheten",
      "Hackare på 500 ml, visp och bägare i lådan",
      "Kostar 583 kronor mindre än MQ 9135XI",
    ],
    cons: [
      "Braun anger 850 W i sitt specfält medan Elon säljer den som 1 000 W, så motorn är svagare än hyllan påstår",
      "Ingen iskrossarkniv, till skillnad från MQ 9135XI",
      "Reservdelar går via verkstad i stället för direkt från tillverkaren",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "990 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "850 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "Ej angivet", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "Steglös (SmartSpeed)", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Metall och plast", highlight: true },
      { label: "Antal knivblad", shortLabel: "Blad", value: "ActiveBlade, rörlig", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "Via auktoriserad verkstad", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "2 år", highlight: true },
      { label: "Tillbehör", value: "Hackare 500 ml, visp, bägare" },
      { label: "Löstagbar mixerfot", value: "Ja, EasyClick" },
      { label: "Strömkälla", value: "Sladd" },
      { label: "Artikelnummer", value: "MQ7035IWH" },
    ],
    verdict:
      "Braun MultiQuick 7 MQ7035 kostar 990 kronor och har samma rörliga kniv som Brauns dyraste modell. Den är den billigaste vägen till ActiveBlade i jämförelsen.\n\n**Kniven som går upp och ner är det du betalar för.** I varje annan stavmixer utom MultiQuick 9 sitter bladet still, och när du mixar frysta bär eller en tjock soppa trycks maten undan och lägger sig ovanför skyddskorgen. Då står du och pumpar staven upp och ner för att få ner den igen. Här gör maskinen det åt dig, och skillnaden är störst i slutet av jobbet när det bara är de sista bitarna kvar.\n\n**Farten är steglös och sitter i trycket.** Trycker du lätt går den långsamt, trycker du hårdare går den fortare, vilket är den reglering som passar bäst när du inte vet i förväg hur segt något är. Hackare på 500 ml, visp och bägare följer med, alltså allt utom iskrossarkniven som MQ 9135XI har.\n\nSiffran i hyllan stämmer inte. Elon säljer den som 1 000 W medan Brauns eget specfält anger 850, och det är den lägre siffran som gäller. Reservdelar går dessutom via verkstad. Är den skillnaden viktig för dig tar du Wilfa Prostick, som ger fem års garanti på motorn, men den kostar 2 499 kronor. För tusenlappen finns inget bättre än den här.",
  },
  {
    id: "bosch-ergomixx-msm67160",
    brand: "Bosch",
    name: "ErgoMixx MSM67160",
    shortName: "Bosch MSM67160",
    image: productImage(STAVMIXER.slug, "bosch-ergomixx-msm67160"),
    tagline: "Tolv fasta farter, och en stålfot du lyfter av och diskar.",
    scores: {
      /* Tolv hastighetsval plus turboknapp. Många steg, men diskreta: du ställer
         in före du startar i stället för att modulera med fingret. */
      hastighetsreglering: 4,
      /* Minihack, bägare och visp. */
      tillbehor: 4,
      /* Mixerfot i stål, löstagbar, med fyrvingad QuattroBlade. Enda maskinen
         där tillverkaren skriver ut både material och att foten går av. */
      mixerfot: 5,
      /* Bosch driver egen reservdelsförsäljning för hushållsapparater, alltså
         delar direkt från tillverkaren. Garanti 2 år. */
      reservdelar: 3.5,
      /* 750 W enligt Boschs tekniska översikt. */
      effekt: 3.5,
    },
    price: 794,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/bosch/bosch-ergomixx-stavmixer-750w/",
    superlative: "Bäst för dig som vill finjustera",
    pros: [
      "Tolv hastighetsval plus turboläge, flest steg i jämförelsen",
      "Mixerfot i stål som lyfts av och går i diskmaskinen",
      "Fyrvingad QuattroBlade, som drar in maten från fler håll än ett tvåbladigt kors",
      "Bosch säljer reservdelar direkt i stället för att hänvisa till verkstad",
      "1,3 kilo och 4,6 av 5 i kundbetyg hos butiken",
    ],
    cons: [
      "Tolv fasta steg betyder att du ställer in farten innan du startar, inte medan du mixar",
      "750 W, alltså under Braun, Wilfa och OBH i det tal handeln jämför på",
      "Varken puréfot eller iskniv ingår, så potatismos och krossad is blir maskinens svaga punkter",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "794 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "750 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "Ej angivet", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "12 steg + turbo", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Stål", highlight: true },
      { label: "Antal knivblad", shortLabel: "Blad", value: "4 (QuattroBlade)", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "Egen reservdelsbutik", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "2 år", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "1,3 kg", highlight: true },
      { label: "Tillbehör", value: "Minihack, mixerbägare, visp" },
      { label: "Löstagbar mixerfot", value: "Ja" },
      { label: "Strömkälla", value: "Sladd" },
      { label: "GTIN", value: "4242002739120" },
    ],
    userRating: { value: 4.6, count: 5, scale: 5, checkedAt: PRICE_CHECKED },
    verdict:
      "Bosch ErgoMixx MSM67160 kostar 794 kronor och har tolv hastighetsval, flest i jämförelsen. Mixerfoten är i stål och lyfts av för disk.\n\n**Stålfoten är skälet att välja den framför de billigare.** En mixerfot i plast missfärgas av tomat och gurkmeja, mjuknar i het soppa och repar en non-stick-kastrull långt lättare. Bosch anger sin i stål och att den går att ta loss, vilket betyder att den delen både tål grytan och kan läggas i diskmaskinen medan motorenheten torkas av. Kniven är fyrvingad och drar in maten från fyra håll i stället för två.\n\n**Tolv steg låter överdrivet och är det inte riktigt.** Skillnaden mellan steg tre och steg fem märks när du gör barnmat på kokta morötter, där du vill ha slät konsistens utan att purén blir vattnig, och turboknappen ligger kvar för det som kräver full kraft. Kundbetyget hos butiken ligger på 4,6 av 5.\n\nStegen är däremot fasta, så du ställer in farten innan du drar igång och inte under tiden. Vill du modulera med fingret medan du mixar tar du Braun MultiQuick 7 för 990 kronor. Ska maskinen mest göra soppa och pannkakssmet på en vardag räcker den här gott, och du sparar 700 kronor mot vinnaren.",
  },
  {
    id: "ninja-foodi-ci100eu",
    brand: "Ninja",
    name: "Foodi 3-i-1 CI100EU",
    shortName: "Ninja CI100EU",
    image: productImage(STAVMIXER.slug, "ninja-foodi-ci100eu"),
    tagline: "Samma motor blir stavmixer, elvisp och hackare.",
    scores: {
      /* Flera hastigheter med smartTorque, som håller varvet uppe i tjock smet.
         Antalet steg anges inte av tillverkaren. */
      hastighetsreglering: 3.5,
      /* Tre redskap ur samma motorbas: stavmixer, femstegs elvisp och hackare,
         plus mixkopp. Ingen annan här ersätter en elvisp. */
      tillbehor: 4.5,
      /* Löstagbart skaft, maskindiskbart, BPA-fritt. Tillverkaren anger inte
         materialet i mixerfoten. */
      mixerfot: 4,
      /* SharkNinja säljer delarna direkt: motorbasen kostar 749,99 kr, och
         hackare, visp, blad, lock och koppar finns var för sig. Garanti 2 år. */
      reservdelar: 4,
      /* 850 W enligt SharkNinjas eget specfält. ⚠️ INTE 650 W — se filhuvudet
         om ninjasverige.com.se. */
      effekt: 4,
    },
    price: 1142,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/ninja/ninja-3i1-stavmixersats/",
    superlative: "Bäst för den som också bakar",
    pros: [
      "Samma motorbas blir stavmixer, femstegs elvisp och hackare, alltså tre apparater i en låda",
      "SharkNinja säljer motorbasen som reservdel för 749,99 kronor, plus visp, hackare och blad var för sig",
      "smartTorque håller varvtalet uppe i tjock smet i stället för att sakta ner",
      "850 W enligt tillverkarens eget specfält",
      "Alla delar tål maskindisk och är BPA-fria",
    ],
    cons: [
      "2,16 kilo för hela satsen, så den tar en hel låda i stället för en plats i besticklådan",
      "Två års garanti, mot Wilfas fem och bamix livstid på motorn",
      "Vispdelen och hackaren kostar 319,99 kronor styck att ersätta, så en tappad del blir dyr",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 142 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "850 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "Ej angivet", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "Variabel + smartTorque", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Ej angivet", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "Motorbas och delar säljs styckvis", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "2 år", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "2,16 kg", highlight: true },
      { label: "Tillbehör", value: "Stavmixerarm, femstegs elvisp, hackare, mixkopp" },
      { label: "Strömkälla", value: "Sladd" },
      { label: "Maskindiskbara delar", value: "Samtliga utom motorbasen" },
      { label: "GTIN", value: "622356254762" },
    ],
    userRating: { value: 4.8, count: 6, scale: 5, checkedAt: PRICE_CHECKED },
    verdict:
      "Ninja Foodi CI100EU kostar 1 142 kronor och är tre apparater med en motor: stavmixer, elvisp med fem lägen och hackare. Den drar 850 watt enligt SharkNinjas eget specfält.\n\n**Elvispen är det som skiljer den från alla andra här.** En ballongvisp på en stavmixer piskar grädde och gör pannkakssmet, men den är en enda visp på ett roterande skaft och orkar inte en marängsmet eller en tjock kaksmet. Ninjas vispdel har två riktiga vispar och fem lägen, alltså det en fristående elvisp gör, och den sitter på samma motorbas. Bakar du regelbundet ersätter den här lådan två apparater i skåpet.\n\n**smartTorque är namnet på att motorn håller varvet när det tar emot.** En vanlig stavmixer sjunker i varvtal när smeten blir tjock, och då blir resultatet ojämnt just där du behöver den som mest. Att SharkNinja dessutom säljer motorbasen separat för 749,99 kronor betyder att en trasig visp eller ett slött blad inte gör hela satsen till skrot.\n\nBaksidan är plats. Hela satsen väger 2,16 kilo och tar en egen låda, och Ninja anger inte vad mixerfoten är gjord av. Ska maskinen bara göra soppa tar du Bosch ErgoMixx för 794 kronor och får en stålfot som tillverkaren skriver ut.",
  },
  {
    id: "kitchenaid-go-5khbrv71",
    brand: "KitchenAid",
    name: "Go sladdlös 5KHBRV71",
    shortName: "KitchenAid Go",
    image: productImage(STAVMIXER.slug, "kitchenaid-go-5khbrv71"),
    tagline: "30 minuters mixning utan att leta efter ett vägguttag.",
    scores: {
      /* Variabelt hastighetsreglage enligt KitchenAid själva. Icecat anger två
         knappar; tillverkarens egen text gäller. */
      hastighetsreglering: 4,
      /* Mixerskål 700 ml med lock, kastrullskydd och batteri. Ingen visp,
         ingen hackare. */
      tillbehor: 3,
      /* Löstagbar mixerarm med fyrpunktsblad i rostfritt stål. */
      mixerfot: 4.5,
      /* Batteriet är utbytbart och delas med hela Go-serien, alltså kan det
         bytas när cellerna åldras i stället för att maskinen kasseras.
         Garanti 2 år plus 90 dagars pengarna tillbaka. */
      reservdelar: 4,
      /* Ingen effekt angiven. Maskinen går på ett 12-voltsbatteri och
         KitchenAid publicerar inget watt-tal. Poängen lämnas utanför
         räkningen i stället för att sättas i botten — se `redistributeMissing`
         i lib/products.ts. */
    },
    price: 1799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/kitchenaid/go-cordless-stavmixer-inklusive-batteri/",
    superlative: "Bäst för köket utan ledigt uttag",
    pros: [
      "Sladdlös med 30 minuters drifttid, alltså fri över hela bänken och ut till matbordet",
      "Batteriet är utbytbart och driver hela KitchenAid Go-serien, så det går att byta när cellerna åldras",
      "Löstagbar mixerarm med fyrpunktsblad i rostfritt stål",
      "1,01 kilo, lättast av alla tolv",
      "Kastrullskydd följer med, som håller kniven från botten i en tunn kastrull",
    ],
    cons: [
      "Varken visp eller hackare ingår, så den gör bara det en stavmixer gör",
      "Tre timmars laddning för 30 minuters mixning",
      "1 799 kronor för en maskin som gör en enda sak, mot 1 142 för Ninja som gör tre",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 799 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "Ej angiven", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "Ej angivet av tillverkaren", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "Variabel", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Rostfritt stål", highlight: true },
      { label: "Antal knivblad", shortLabel: "Blad", value: "4", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "Utbytbart batteri, delat med Go-serien", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "2 år", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "1,01 kg", highlight: true },
      { label: "Strömkälla", value: "Batteri, 12 V litiumjon" },
      { label: "Tillbehör", value: "Mixerskål 700 ml med lock, kastrullskydd, batteri" },
      { label: "Bägarens volym", value: "700 ml" },
      { label: "GTIN", value: "5413184002855" },
    ],
    userRating: { value: 5, count: 1, scale: 5, checkedAt: PRICE_CHECKED },
    verdict:
      "KitchenAid Go kostar 1 799 kronor och är den enda maskinen här som varken har eller behöver ett vägguttag. Den väger 1,01 kilo, lättast av de tolv.\n\n**Sladdlösheten löser ett problem som är större i vissa kök än i andra.** Har du en spis mitt på en ö, eller ett kök där de två uttagen sitter bakom brödrosten, är sladden på 1,1 till 1,2 meter det som avgör var du får mixa. Här bär du maskinen dit maten står, och trettio minuters drifttid räcker till betydligt mer soppa än någon gör på en kväll. Kastrullskyddet som följer med håller kniven från botten, vilket spelar roll i en tunn kastrull.\n\n**Batteriet är det som gör den värd priset på sikt.** Det är utbytbart och samma batteri driver hela KitchenAid Go-serien, så när cellerna tappat kapacitet om fem år köper du ett nytt batteri i stället för en ny maskin. Mixerarmen är i rostfritt stål med fyrpunktsblad och lyfts av för disk.\n\nMen lådan är tom i övrigt: varken visp eller hackare ingår, och laddningen tar tre timmar. Vill du ha samma frihet med tillbehören kvar kostar bamix Cordless 3 111 kronor. Har du ett uttag där du lagar mat sparar du 300 kronor på OBH Nordica InfinyForce Pro och får både visp och hackare.",
  },
  {
    id: "bamix-swissline-d",
    brand: "bamix",
    name: "SwissLine D 200 W",
    shortName: "bamix SwissLine",
    image: productImage(STAVMIXER.slug, "bamix-swissline-d"),
    tagline: "18 000 varv i minuten, och livstids garanti på motorn.",
    scores: {
      /* Två fasta lägen, 12 000–13 000 och 17 000–18 000 v/min. Båda snabbare
         än vad de flesta maskiner når över huvud taget, men du kan inte starta
         långsamt och du kan inte modulera under tiden. */
      hastighetsreglering: 3,
      /* Multiblad, visp, hackare, processor, mixbägare 900 ml och bordsställ.
         Rikast i jämförelsen tillsammans med Wilfa Prostick. */
      tillbehor: 5,
      /* Rostfritt stål och ett dubbelisolerat vattentätt hölje som får sänkas
         ner ända upp till handtaget. Skaftet är däremot inte löstagbart. */
      mixerfot: 4.5,
      /* Livstids garanti på motorn, egen reservdelsbutik, och delar finns kvar
         till enheter som gått i trettio år. Starkast i fältet. */
      reservdelar: 5,
      /* 200 W i den svenska versionen. Lägst av de sladdade. Samma maskin anges
         som 150 W i USA, där nätet är 120 volt. */
      effekt: 1,
    },
    price: 3299,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Cervera",
    merchantUrl:
      "https://www.cervera.se/produkt/bamix-swissline-stavmixer-swissline-200-watt-d-svart-svart",
    award: "premium",
    superlative: "Bäst för den som köper en gång",
    pros: [
      "17 000 till 18 000 varv i minuten i läge två, snabbast i jämförelsen",
      "Livstids garanti på motorn, och delar säljs till enheter som gått i trettio år",
      "Multiblad, visp, hackare, processor, bägare på 900 ml och bordsställ ingår",
      "Dubbelisolerat vattentätt hölje som får sänkas ner ända upp till handtaget",
      "Tillverkad i Schweiz i samma fabrik sedan 1950-talet",
    ],
    cons: [
      "Två fasta farter och ingen steglös reglering, så du kan inte gå upp gradvis medan du mixar",
      "3 299 kronor, alltså dubbelt mot vinnaren och mest av de tolv",
      "Skaftet sitter fast på motorenheten och går inte att lyfta av för disk, till skillnad från Bosch, OBH och KitchenAid",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "3 299 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "200 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "12 000–13 000 / 17 000–18 000 v/min", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "2 fasta lägen", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Rostfritt stål", highlight: true },
      { label: "Antal knivblad", shortLabel: "Blad", value: "Multiblad, 4 vingar", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "Livstids motorgaranti, egen reservdelsbutik", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "Livstid på motorn", highlight: true },
      { label: "Tillbehör", value: "Multiblad, visp, hackare, processor, mixbägare 900 ml, bordsställ" },
      { label: "Bägarens volym", value: "900 ml" },
      { label: "Löstagbar mixerfot", value: "Nej" },
      { label: "Strömkälla", value: "Sladd" },
    ],
    verdict:
      "bamix SwissLine D kostar 3 299 kronor och går 18 000 varv i minuten, snabbast i jämförelsen. Den drar 200 watt, alltså minst av de sladdade maskinerna här.\n\n**De två talen tillsammans är hela poängen med den.** Watt mäter vad motorn drar ur vägguttaget; varvtal mäter hur fort kniven går. bamix drar en fjärdedel av vad Philips ProMix drar och snurrar 50 procent fortare, eftersom motorn är byggd för högt varvtal och lågt vridmoment i stället för tvärtom. I praktiken märks det på soppan: hög knivhastighet river sönder fibrer i stället för att slå isär dem, och det är skillnaden mellan slät och nästan slät.\n\n**Livstidsgarantin på motorn är inte marknadsföring.** bamix säljer reservdelar till maskiner som gått i trettio år, och tillverkar dem fortfarande i samma schweiziska fabrik. Med multiblad, visp, hackare, processor, bägare på 900 ml och bordsställ i paketet är det också den rikaste lådan i jämförelsen. Höljet är dubbelisolerat och vattentätt ända upp till handtaget, så du diskar den genom att köra den i en skål vatten.\n\nDen kostar dubbelt mot vinnaren och har bara två fasta farter, båda höga. Du kan alltså inte krypa igång försiktigt i en burk majonnäs eller lägga dig mitt emellan när avokadon är mjukare än väntat. Vill du kunna gå upp gradvis medan du mixar tar du OBH Nordica InfinyForce Pro för 1 490 kronor. Köp bamix om du köper en stavmixer en gång i livet och menar det.",
  },
  {
    id: "severin-sm-3772",
    brand: "Severin",
    name: "SM 3772 stavmixerset",
    shortName: "Severin SM 3772",
    image: productImage(STAVMIXER.slug, "severin-sm-3772"),
    tagline: "Hela setet för 625 kronor, med steglös fart och stålfot.",
    scores: {
      /* Steglöst varvtalsreglage plus turboläge, enligt Severins egen
         produkttext. Ovanligt i prisklassen. */
      hastighetsreglering: 4,
      /* Ballongvisp, minihack och mixerbägare. */
      tillbehor: 4,
      /* Löstagbar mixerstav i rostfritt stål, angivet av Severin själva. */
      mixerfot: 4.5,
      /* Reservdelar finns via auktoriserade kanaler, garanti på normalnivå.
         Inget uttalat åtagande från Severin. */
      reservdelar: 3,
      /* 600 W enligt tillverkarens egen bruksanvisning. */
      effekt: 3,
    },
    price: 625,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/severin/severin-stavmixer-hack-visp/",
    award: "budget",
    superlative: "Bäst för ett komplett set billigt",
    pros: [
      "Steglöst varvtalsreglage plus turboläge, ovanligt under tusenlappen",
      "Löstagbar mixerstav i rostfritt stål, inte plast",
      "Ballongvisp, minihack och mixerbägare ingår",
      "625 kronor, näst billigast i jämförelsen",
      "124 kronor under Severins eget pris i deras svenska butik",
    ],
    cons: [
      "600 W, alltså näst svagast av de sladdade",
      "Severin ger inget uttalat åtagande om reservdelar, till skillnad från OBH:s 15 år och bamix livstid",
      "Bara ett kundomdöme hos butiken, så betyget säger ännu inget",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "625 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "600 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "Ej angivet", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "Steglös + turbo", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Rostfritt stål", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "Via auktoriserad kanal", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "2 år", highlight: true },
      { label: "Tillbehör", value: "Ballongvisp, minihack, mixerbägare" },
      { label: "Löstagbar mixerfot", value: "Ja" },
      { label: "Strömkälla", value: "Sladd" },
      { label: "GTIN", value: "4008146040689" },
    ],
    userRating: { value: 4, count: 1, scale: 5, checkedAt: PRICE_CHECKED },
    verdict:
      "Severin SM 3772 kostar 625 kronor och är hela paketet: stavmixer, ballongvisp, minihack och bägare. Den drar 600 watt och har steglös hastighet.\n\n**Steglös fart under tusenlappen är det ovanliga här.** De flesta billiga stavmixrar har en fart och en turboknapp, vilket betyder att du antingen mixar långsamt eller för fullt. Severin har ett riktigt varvtalsreglage och turboläget ovanpå, så du kan lägga dig mitt emellan när du gör barnmat eller startar en majonnäs. Det är samma sorts reglering som Braun tar 990 kronor för.\n\n**Mixerstaven är i rostfritt stål och lyfts av.** I den här prisklassen är plast normen, och plast missfärgas av tomat och gurkmeja och tål het soppa sämre. Att staven dessutom går att ta loss betyder att den delen kan i diskmaskinen medan motorenheten torkas av. Ballongvispen och minihacken gör att paketet täcker grädde och lök utan att du behöver köpa något extra.\n\nMotorn är näst svagast av de sladdade, och Severin lovar ingenting om reservdelar utöver garantitiden. Ska maskinen gå i tio år är OBH Nordica Super Mix Pro för 549 kronor faktiskt tryggare, med sitt femtonårsåtagande. Men den har bara en fart. För den som vill ha ett komplett set och en riktig hastighetsreglering är det här billigaste vägen dit.",
  },
  {
    id: "smeg-hbf01",
    brand: "Smeg",
    name: "50's Style HBF01",
    shortName: "Smeg HBF01",
    image: productImage(STAVMIXER.slug, "smeg-hbf01"),
    tagline: "700 W med steglöst reglage, i en maskin som får stå framme.",
    scores: {
      /* Steglöst reglage plus turbofunktion enligt Smegs egen produkttext. */
      hastighetsreglering: 4.5,
      /* Bara mixerarm och bägare. Visp och hackare kräver HBF03-setet, som
         kostar 1 795 kr. Tunnast i lådan av de tolv tillsammans med
         KitchenAid Go. */
      tillbehor: 2.5,
      /* Arm och blad i rostfritt stål med FlowBlend, som Smeg anger ger jämnare
         cirkulation i bägaren. */
      mixerfot: 4.5,
      /* Smeg driver egen reservdelssida för svensk marknad. Garanti på
         normalnivå, inget uttalat åtagande om tid. */
      reservdelar: 3,
      /* 700 W. */
      effekt: 3.5,
    },
    price: 995,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/smeg/smeg-retro-stavmixer/",
    superlative: "Bäst för köket där allt syns",
    pros: [
      "Steglöst reglage plus turbofunktion, alltså full kontroll över farten",
      "Arm och blad i rostfritt stål med FlowBlend, som ger jämnare cirkulation i bägaren",
      "Finns i sex färger och är byggd för att stå framme på bänken",
      "5,0 av 5 i kundbetyg hos butiken",
    ],
    cons: [
      "Varken visp eller hackare ingår, och setet med tillbehör kostar 1 795 kronor",
      "700 W, alltså i nedre halvan av fältet",
      "995 kronor för en maskin som gör mindre än Bosch ErgoMixx för 794",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "995 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "700 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "Ej angivet", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "Steglös + turbo", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Rostfritt stål (FlowBlend)", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "Egen reservdelssida", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "2 år", highlight: true },
      { label: "Tillbehör", value: "Mixerbägare" },
      { label: "Strömkälla", value: "Sladd" },
      { label: "GTIN", value: "8017709319588" },
    ],
    userRating: { value: 5, count: 4, scale: 5, checkedAt: PRICE_CHECKED },
    verdict:
      "Smeg 50's Style HBF01 kostar 995 kronor och drar 700 watt med steglöst reglage. Den finns i sex färger och är byggd för att stå framme.\n\n**Utseendet är en verklig egenskap och inte en efterhandskonstruktion.** En stavmixer som ligger i en låda används mer sällan än en som står på bänken, och den enda maskinen i jämförelsen som någon vill ha framme är den här. Har du redan en Smeg-brödrost eller vattenkokare i samma kulör är det inte en liten sak.\n\n**Under emaljen finns riktig teknik.** Reglaget är steglöst med en turbofunktion ovanpå, alltså samma kontroll som Braun ger, och armen och bladen är i rostfritt stål med det Smeg kallar FlowBlend, som ska ge jämnare cirkulation i bägaren så att maten inte lägger sig ovanför kniven. Kundbetyget hos butiken ligger på 5,0 av 5 på fyra omdömen.\n\nLådan är däremot nästan tom. Du får en bägare och inget annat, och vill du ha visp och hackare kostar Smegs set 1 795 kronor. Bosch ErgoMixx ger dig minihack, bägare och visp för 794. Köp den här om maskinen ska synas i köket, inte om den ska göra flest saker.",
  },
  {
    id: "bamix-cordless",
    brand: "bamix",
    name: "Cordless",
    shortName: "bamix Cordless",
    image: productImage(STAVMIXER.slug, "bamix-cordless"),
    tagline: "13 000 varv på batteri, med samma livstidsgaranti på motorn.",
    scores: {
      /* Två fasta lägen, 8 000 och 13 000 v/min. Lägre än de sladdade bamix,
         men fortfarande över det mesta i fältet. */
      hastighetsreglering: 3,
      /* Multiblad, visp, hackare, bägare och laddstation. */
      tillbehor: 4,
      /* Rostfritt stål, skaft 14 cm, samma vattentäta hölje som de sladdade. */
      mixerfot: 4,
      /* Samma som SwissLine: livstids motorgaranti och egen reservdelsbutik. */
      reservdelar: 5,
      /* 200 W enligt bamix egen specifikation, alltså samma som de sladdade. */
      effekt: 1,
    },
    price: 3111,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/bamix/bamix-cordless-stavmixer/",
    superlative: "Bäst för sommarstugan",
    pros: [
      "8 000 och 13 000 varv i minuten på batteri, alltså fortare än de flesta sladdade här",
      "Livstids garanti på motorn, samma som de sladdade bamix",
      "Skaft på 14 cm i rostfritt stål med vattentätt hölje",
      "Multiblad, visp, hackare, bägare och laddstation ingår",
    ],
    cons: [
      "3 111 kronor, alltså dubbelt mot vinnaren, för en maskin med två fasta farter",
      "13 000 varv mot SwissLines 18 000, så batteriversionen är långsammare än den sladdade",
      "Laddstationen tar egen plats på bänken",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "3 111 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "200 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "8 000 / 13 000 v/min", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "2 fasta lägen", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Rostfritt stål", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "Livstids motorgaranti, egen reservdelsbutik", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "Livstid på motorn", highlight: true },
      { label: "Tillbehör", value: "Multiblad, visp, hackare, bägare, laddstation" },
      { label: "Strömkälla", value: "Batteri" },
      { label: "Skaftlängd", value: "14 cm" },
      { label: "GTIN", value: "7610497621447" },
    ],
    verdict:
      "bamix Cordless kostar 3 111 kronor och går 13 000 varv i minuten utan sladd. Den bär samma livstidsgaranti på motorn som de sladdade bamix.\n\n**Den är fortare på batteri än de flesta här är med sladd.** 13 000 varv i det övre läget ligger över Philips ProMix 11 500, och Philips står i ett vägguttag. Det säger något om vad watt är värt som mått: bamix anger 200 W för den här maskinen, alltså en fjärdedel av Philips, och kommer ändå längre. På 8 000 varv i det lägre läget gör du majonnäs och slår ihop en vinägrett.\n\n**Skaftet är 14 centimeter i rostfritt stål och hela höljet tål vatten.** Du diskar den genom att köra den i en skål med diskvatten, vilket i ett kök utan diskmaskin är en verklig skillnad. Multiblad, visp, hackare, bägare och laddstation ingår, alltså allt utom processorn som SwissLine har.\n\nMen den kostar dubbelt mot vinnaren och är långsammare än den sladdade SwissLine, 13 000 mot 18 000 varv. Ska maskinen stå i ett kök med uttag är SwissLine 188 kronor dyrare och bättre. Vill du bara ha friheten från sladden gör KitchenAid Go samma sak för 1 799 kronor, om du klarar dig utan visp och hackare.",
  },
  {
    id: "obh-nordica-super-mix-pro",
    brand: "OBH Nordica",
    name: "Super Mix Pro 7699",
    shortName: "OBH Super Mix Pro",
    image: productImage(STAVMIXER.slug, "obh-nordica-super-mix-pro"),
    tagline: "549 kronor, och reservdelar utlovade i 15 år.",
    scores: {
      /* En fart plus turboknapp. OBH anger uttryckligen "steglös
         hastighetsreglering: False" i sin egen specifikationstabell. Svagast
         i fältet. */
      hastighetsreglering: 2,
      /* Miniprocessor och mixerbägare. Ingen ballongvisp, angivet av OBH. */
      tillbehor: 3,
      /* Yttre material anges som plast av OBH själva, och kniven har två blad
         mot fyra hos de flesta. Svagast i fältet. */
      mixerfot: 2,
      /* Samma femtonåriga reservdelsåtagande som InfinyForce Pro. Det är
         maskinens starkaste egenskap. */
      reservdelar: 5,
      /* 400 W, lägst av de sladdade med motor byggd för nätdrift. */
      effekt: 2,
    },
    price: 549,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/obh-nordica-super-mix-pro-7699-113711",
    superlative: "Bäst för soppa då och då",
    pros: [
      "Reservdelar utlovade i 15 år efter inköp, samma åtagande som den fem gånger dyrare InfinyForce Pro",
      "Billigast i jämförelsen på 549 kronor",
      "Miniprocessor och mixerbägare ingår",
      "Turboknapp för det som kräver full kraft",
    ],
    cons: [
      "En enda fart plus turbo, vilket OBH skriver ut själva, så du kan inte starta långsamt i en majonnäs",
      "Höljet är i plast, som missfärgas av tomat och gurkmeja och tål het soppa sämre än stål",
      "Två knivblad mot fyra hos de flesta andra, och 400 W är svagast i fältet",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "549 kr", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "400 W", highlight: true },
      { label: "Varvtal", shortLabel: "Varvtal", value: "Ej angivet", highlight: true },
      { label: "Hastighetsreglering", shortLabel: "Fart", value: "1 fart + turbo", highlight: true },
      { label: "Mixerfotens material", shortLabel: "Mixerfot", value: "Plast", highlight: true },
      { label: "Antal knivblad", shortLabel: "Blad", value: "2", highlight: true },
      { label: "Reservdelsåtagande", shortLabel: "Reservdelar", value: "15 år efter inköp", highlight: true },
      { label: "Garanti", shortLabel: "Garanti", value: "2 år", highlight: true },
      { label: "Tillbehör", value: "Miniprocessor, mixerbägare" },
      { label: "Strömkälla", value: "Sladd" },
      { label: "Sladdlängd", value: "1,0 m" },
      { label: "Artikelnummer", value: "7699" },
    ],
    verdict:
      "OBH Nordica Super Mix Pro 7699 kostar 549 kronor och är billigast i jämförelsen. Den drar 400 watt och har en fart plus en turboknapp.\n\n**Det femtonåriga reservdelslöftet är skälet att den finns med här.** OBH håller delar tillgängliga i 15 år efter inköpsdatum, även efter garantitidens slut, och det gäller den här lika mycket som deras fem gånger dyrare toppmodell. För en maskin som kostar 549 kronor är det ovanligt: i den prisklassen är normen att en trasig kniv gör hela apparaten till avfall.\n\n**I övrigt får du precis vad du betalar för.** En fart och en turboknapp, vilket OBH skriver ut i sin egen specifikation, betyder att du inte kan gå igång långsamt. Majonnäs blir därför svårt, och en mjuk avokado blir vattnig innan du hinner släppa. Höljet är i plast, som missfärgas av tomat och gurkmeja och mjuknar i het soppa, och kniven har två blad där de flesta andra har fyra.\n\nFör soppa och pannkakssmet ett par gånger i månaden gör den jobbet, och då är 549 kronor rätt pris. Ska du mixa oftare än så är Severin SM 3772 för 625 kronor en helt annan maskin: steglös fart, stålfot och en visp på köpet. 76 kronor är den billigaste uppgraderingen på hela sidan.",
  },
];

/**
 * Övervägda och bortvalda. Varje skäl är ett riktigt skäl.
 *
 * ⚠️ Wilfa SM-1FP är utsedd till bäst i test av bäst-i-test.se och står ändå
 * här. Skälet är lagerläget, som är ett operativt hinder och alltså en uppgift
 * att följa upp — se .agent/research/stavmixer.md. Vid nästa prisrunda: står
 * den i lager rankas den in.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Wilfa",
    name: "SM-1FP Essential Mix & Chop",
    approxPrice: 899,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/wilfa/sm1fp-essential-mix-chop-stavmixerset/",
    reason:
      "Utsedd till bäst i test av bäst-i-test.se och rankad som bästa billiga av Testkompassen, alltså den mest omtalade stavmixern i svenska jämförelser just nu. Den står som restnoterad hos butiken och bär dessutom fältets lägsta kundbetyg där, 3,3 av 5 på sex omdömen. Kommer den tillbaka i lager hör den hemma i rankningen.",
  },
  {
    brand: "Wilfa",
    name: "Fusion 1500",
    approxPrice: 1499,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/wilfa-wilfa-fusion-1500-stavmixer/",
    reason:
      "1 500 watt, alltså den starkaste motorn vi hittade i svensk handel, och ett bra exempel på varför watt inte avgör: Wilfa publicerar inget varvtal för den, medan de gör det för den billigare Prostick. Den ligger utanför rankningen därför att Prostick täcker samma prisläge med publicerade varvtal och rikare tillbehör.",
  },
  {
    brand: "Bosch",
    name: "ErgoMixx MSM66120",
    approxPrice: 549,
    merchant: "Bosch",
    merchantUrl:
      "https://www.bosch-home.se/sv/product/koksverktyg/stavmixers/ovrigt/MSM66120",
    reason:
      "Samma tolv hastighetssteg, samma stålfot och samma QuattroBlade som MSM67160 men 600 watt i stället för 750, och 245 kronor billigare direkt hos Bosch. Den rankas inte därför att den är samma maskin en storlek ner, och två Bosch i samma jämförelse hade sagt samma sak två gånger. Är priset avgörande är den ett fullgott byte mot den rankade.",
  },
  {
    brand: "Bosch",
    name: "Serie 4 ErgoMaster MSM4B621",
    approxPrice: 995,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/bosch/bosch-serie-4-ergomaster-stavmixer-1000w/",
    reason:
      "1 000 watt och nyare serie än ErgoMixx, men den kostar 200 kronor mer än MSM67160 utan att lägga till något som väger i vår viktning: samma sorts stålfot, samma fyrvingade kniv och samma garanti. Den som vill ha Boschs starkaste stavmixer tar den här.",
  },
  {
    brand: "Dualit",
    name: "Stavmixer med tillbehör",
    approxPrice: 1899,
    merchant: "KitchenTime",
    merchantUrl:
      "https://www.kitchentime.se/varumarken/dualit/dualit-stavmixer-med-tillbehor/",
    reason:
      "Rankad tia av bäst-i-test.se och bästa premiumval av Testkompassen, med en gedigen brittisk konstruktion och mixerskål på köpet. Dualit publicerar varken varvtal eller ett uttalat reservdelsåtagande, alltså saknas underlag på två av de fem punkter sidan väger, och att gissa åt dem hade varit att betygsätta vår egen research.",
  },
  {
    brand: "Electrolux",
    name: "Create 5 E5HB1-4SS",
    approxPrice: 799,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/koksapparater/stavmixers",
    reason:
      "Fick 4 av 5 av M3 i deras handpålagda test, med beröm för steglös reglering och rostfri konstruktion i mellanprisklassen. Electrolux anger ett års garanti på den, vilket är kortast av allt vi tittade på och hälften av vad Bosch, Braun, Smeg och OBH ger. Den som hittar den på rea får ändå en bra maskin.",
  },
  {
    brand: "Philips",
    name: "ProMix HR2652/90",
    approxPrice: 799,
    merchant: "Bagaren och Kocken",
    merchantUrl:
      "https://www.bagarenochkocken.se/p/philips-hr253400-daily-collection-promix-stavmixer-650-watt_55791/",
    reason:
      "Ett av två märken i hela svepet som publicerar ett varvtal i sitt eget datablad: 800 watt och max 11 500 varv i minuten. Talet är jämförelsepunkten som gör hela sidans poäng, och det är därför modellen står som källa i stället för i rankningen. Det svenska sortimentet är dessutom rörigt, med Daily och Viva Collection under samma ProMix-namn i olika effektklasser.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const STAVMIXER_FAQ = [
  {
    question: "Hur många watt behöver en stavmixer?",
    answer:
      "Mindre än handeln antyder, och watt är inte det tal du bör välja på. Effekten mäter vad motorn drar ur vägguttaget, inte hur fort kniven går i maten, och de två följer inte varandra. Philips anger i sitt eget datablad 800 watt och maximalt 11 500 varv i minuten, medan bamix anger 200 watt och 17 000 till 18 000 varv för sin SwissLine. Den schweiziska maskinen drar alltså en fjärdedel så mycket ström och snurrar 50 procent fortare, eftersom motorn är byggd för högt varvtal i stället för högt vridmoment. Ett annat exempel på hur lite talet betyder: bamix anger samma maskin som 150 watt i USA och 200 watt i Sverige, därför att nätspänningen skiljer, medan varvtalet är detsamma i båda dokumenten. I praktiken klarar 600 till 800 watt allt en normal hushållsanvändning kräver, alltså soppa, smoothie, pannkakssmet och barnmat. Vill du ha ett tal att jämföra på är varvtalet mer användbart, men bara fyra av tolv tillverkare anger det.",
  },
  {
    question: "Vad är skillnaden mellan en stavmixer och en blender?",
    answer:
      "Stavmixern går ner i kärlet, blendern kräver att maten kommer till den. Det låter som en detalj och avgör i praktiken vilken du använder. En stavmixer sänks ner direkt i grytan på spisen, alltså kan du mixa soppan där den står, utan att hälla över tre liter het vätska till en glaskanna och tillbaka igen. Den är också snabbare att diska, eftersom bara skaftet blir smutsigt. En blender har däremot en tätslutande kanna och ett blad som arbetar mot kärlets väggar, vilket ger den ett övertag på allt som ska bli riktigt slätt eller riktigt kallt: isade drinkar, nötsmör och gröna smoothies på hela blad. Råd & Rön konstaterar i sitt test av 57 stavmixrar att en stavmixer gör en smoothie som mest liknar en fruktsallad om man dömer av bitarnas storlek. Ska du göra soppa, barnmat, pannkakssmet och majonnäs är stavmixern rätt verktyg. Ska du göra smoothies varje morgon behöver du en blender.",
  },
  {
    question: "Varför blir min majonnäs inte tjock med stavmixern?",
    answer:
      "Nästan alltid därför att maskinen startar för fort eller att kniven inte når ner. Majonnäs är en emulsion: oljan måste tillföras långsamt i äggulan medan kniven arbetar, och startar mixern direkt på full effekt slås blandningen sönder i stället för att binda. Därför är hastighetsregleringen den viktigaste egenskapen på en stavmixer och den vi väger tyngst. En maskin med en enda fast fart plus turboknapp, som OBH Nordica Super Mix Pro, ger dig inget lågt läge alls. Det andra vanliga problemet är geometrin. Råd & Rön skriver i sitt test att knivarna i en del fall inte når ner tillräckligt för att vispa om ordentligt i ett smalt kärl, vilket är precis det som händer när du gör majonnäs i en hög burk. Använd ett kärl som är knappt bredare än mixerfotens skyddskorg, håll staven i botten tills botten börjar tjockna, och lyft den sedan långsamt uppåt.",
  },
  {
    question: "Vad betyder varvtal på en stavmixer och varför anger så få det?",
    answer:
      "Varvtalet är hur många gånger kniven roterar per minut, alltså det enda talet som beskriver vad som faktiskt händer i maten. Wilfa förklarar det i sin egen produkttext och anger tre steg för sin Prostick: 5 000, 10 000 och 15 000 varv i minuten. bamix anger 8 000 och 13 000 för sin Cordless och 17 000 till 18 000 för SwissLine. Ett högre varvtal river isär fibrer i stället för att slå sönder dem, vilket är skillnaden mellan en slät soppa och en nästan slät. Åtta av de tolv tillverkarna i den här jämförelsen anger inget varvtal alls, och Boschs egen tekniska översikt tar upp effekt, antal hastighetssteg, bladform och nettovikt utan att nämna det. Eftersom uppgiften bara finns för en tredjedel av fältet får den ingen vikt i vår rankning, men den står i tabellen där tillverkaren publicerat den. Att fylla i ett tal åt de övriga hade varit en gissning, och en gissad specifikation är samma sak som en påhittad mätning.",
  },
  {
    question: "Är det värt att köpa ett stavmixerset med tillbehör?",
    answer:
      "Oftast ja, men kontrollera vad tillbehören faktiskt är. En ballongvisp gör pannkakssmet och grädde, en minihackare tar löken utan skärbräda, och en processor eller puréfot gör potatismos utan att det blir segt. Skillnaden mellan ett paket och en ensam stav ligger sällan mer än ett par hundralappar, och Råd & Rön har en iakttagelse värd att känna till: samma mixerstav säljs under olika namn beroende på vilka tillbehör som ingår, och paketversionen får i deras test ofta ett lägre samlat betyg än den ensamma staven, just därför att tillbehören vägs in i bedömningen. Själva mixern är alltså likadan. Det betyder att du bör välja paket efter vad du kommer att använda, inte efter betyget på förpackningen. Ett par exempel ur den här jämförelsen: Smeg HBF01 kostar 995 kronor med bara en bägare, medan Bosch ErgoMixx ger minihack, bägare och visp för 794. Ninja Foodi ersätter dessutom en fristående elvisp, vilket är värt något om du bakar.",
  },
  {
    question: "Ska mixerfoten vara i plast eller rostfritt stål?",
    answer:
      "Rostfritt stål, om du någonsin tänker mixa något varmt. En mixerfot i plast missfärgas permanent av tomat, curry och gurkmeja, mjuknar i het soppa och repar en non-stick-kastrull minst lika lätt som stål gör. Skillnaden är också en prisfråga: under 600 kronor är plast normen, och OBH Nordica Super Mix Pro anger sitt yttre material som plast. Severin SM 3772 kostar 625 kronor och har rostfri stav, vilket gör den till den billigaste vägen till stål i den här jämförelsen. Titta samtidigt efter två andra saker. Om foten går att lyfta av kan den delen läggas i diskmaskinen medan motorenheten torkas av, och den går dessutom att byta ut separat om kniven blir slö. Och skyddskorgens utstickande ben håller kniven från kastrullens botten, vilket både skyddar beläggningen och gör att maten sugs in underifrån i stället för att pressas undan.",
  },
  {
    question: "Hur länge håller en stavmixer?",
    answer:
      "Det varierar mer än priset antyder, och det är värt att välja efter. Råd & Röns hållbarhetsprov, där maskinerna körs i upprepade cykler, slog sönder en stavmixer efter 26 cykler och efter bara 8 när provet gjordes om med ett nytt exemplar av samma modell. En annan blev 90 grader varm efter 50 cykler och började smälta, men gick att köra klart när den svalnat. Eftersom vi inte vet vilka modeller det gällde, och Råd & Rön inte tillåter att deras resultat återges, väger vi i stället det tillverkarna själva åtar sig. Där är spannet stort: bamix ger livstids garanti på motorn och säljer delar till maskiner som gått i trettio år, OBH Nordica håller reservdelar tillgängliga i 15 år efter inköpsdatum, Wilfa ger fem års garanti på motorn i hela sortimentet, och SharkNinja säljer motorbasen till sin Ninja Foodi som lös reservdel för 749,99 kronor. Braun, Bosch, Severin och Smeg ligger på lagstadgade två år med reservdelar via verkstad.",
  },
  {
    question: "Är en sladdlös stavmixer bra nog?",
    answer:
      "Ja, och det är nytt. Tidigare betydde batteridrift lägre varvtal, men bamix anger 13 000 varv i minuten för sin Cordless, alltså mer än Philips 11 500 för en modell som står i vägguttaget. Frågan är därför inte längre om den orkar, utan om du behöver friheten. Den gör mest nytta i kök där uttagen sitter fel: en spis mitt på en ö, eller en bänk där de två uttagen redan är upptagna. Med en sladd på 1,0 till 1,2 meter, vilket är vad de sladdade modellerna här ger, avgör uttagets placering var du får mixa. Räkna med två saker till. Drifttiden ligger runt 30 minuter, vilket räcker gott till en middag men kräver planering om du lagar mat till många, och laddningen tar ungefär tre timmar. Titta också efter om batteriet går att byta: KitchenAid Go använder samma batteri i hela sin Go-serie, vilket betyder att du köper ett nytt batteri om fem år i stället för en ny maskin.",
  },
];

export const STAVMIXER_PRODUCTS = resolveProducts(STAVMIXER, SEEDS);

export const STAVMIXER_CONSIDERED: ConsideredProduct[] = CONSIDERED;
