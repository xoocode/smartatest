import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { GALAXY_S26_FODRAL } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /galaxy-s26-fodral.
 *
 * Priser och produkttexter är lästa på TheMobileStores egna produktsidor
 * 2026-08-05. Butiken svarar tomt på curl och besvaras av r.jina.ai; en tom
 * hämtning därifrån betyder aldrig att uppgiften saknas.
 *
 * Specifikationer är kompletterade hos tillverkarna 2026-08-06, se
 * `.agent/research/galaxy-s26-fodral.md` för varje källa och datum.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans än. Se lib/links.ts.
 *
 * ## Avgränsningen
 *
 * Sidan rankar **uppfällbara plånboksfodral till basmodellen Galaxy S26**.
 * Skyddsskal utan kortfack får systersidan /galaxy-s26-skal. Fodral till S26+
 * och S26 Ultra hör inte hit.
 *
 * ## En rad per konstruktion, aldrig per mönster
 *
 * Samma regel som på /iphone-fodral. Kategorin har 35 artiklar till
 * basmodellen men bara omkring tretton konstruktioner: Mezzo säljs i fem
 * mönster, Sensitive i fyra, Luna i fyra, Tender och Smart Pro i tre var. Det
 * är samma fodral. Mönstret hör till färgvalet och inte till raden.
 *
 * ## ⚠️ FYNDET — magneten är spännet, inte laddaren
 *
 * Det här bär sidan, och det följer direkt ur skalsidan. Galaxy S26 saknar
 * inbyggda Qi2-magneter, så på ett skyddsskal är magnetringen det viktigaste
 * som finns. En läsare tar med sig det hit och börjar leta efter ordet magnet.
 *
 * I den här hyllan betyder magnet nästan alltid spännet som håller locket
 * stängt. Det är nu belagt hos tillverkarna och inte bara utläst ur
 * butikstexten:
 *
 * - **Partner Tele.com** publicerar två egna fält per artikel, `Wsparcie
 *   uchwytów magnetycznych` och `Wsparcie ładowania bezprzewodowego`, och båda
 *   står på **nie** för Mezzo, Tender, Sensitive, Luna och Smart Pro.
 * - **Tech-Protect** publicerar `MagSafe: Tak` för Wallet MagSafe (Matte) och
 *   `MagSafe: Nie` för Wallet.
 * - **Gear** och **Tech-Protect Matte** anger båda att telefonen laddas
 *   trådlöst genom fodralet; Icecat bekräftar Gear med `Trådlös laddning: Ja`.
 *
 * ⚠️ Skillnaden mot tidigare version: fem fodral hade `Ej angiven` på laddning
 * och drogs ner för det. Tillverkaren säger **nej**, vilket är en egenskap hos
 * varan, medan fyra fodral fortfarande saknar uppgift och därför inte får
 * något betyg alls på det kriteriet. Se `lib/corrections.ts`.
 *
 * ## ⚠️ Butikens produkttexter är mallade
 *
 * Flera fodralbeskrivningar säger "mobilskalet" om ett fodral, alltså text som
 * återanvänts från skalsortimentet. Vi återger sakuppgiften och aldrig
 * formuleringen, och där en text motsäger produkttypen följer fältet
 * produkttypen.
 *
 * ## ⚠️ Fyra artiklar är utgångna och rankas inte
 *
 * De fyra fodral som säljs som "Galaxy S26 / S26 Pro" ligger kvar i
 * kategorilistan men svarar "Tyvärr, produkten har utgått ur vårt sortiment,
 * 0 st. i lager eller fjärrlager" på sin egen produktsida, och de saknar pris.
 * De ligger bland övervägda med det skälet utskrivet.
 *
 * ⚠️ Det var **inte** modellnamnet som avgjorde. Ett utkast var på väg att
 * utesluta dem för att "S26 Pro" inte finns, vilket användaren invände mot: ett
 * fodral med mjuk insats spänner över flera storlekar på ett sätt ett gjutet
 * skal inte gör. Invändningen är riktig. Skälet de ändå faller på är att de
 * inte går att köpa.
 */

export const PRICE_CHECKED = "2026-08-05";

/** Specifikationer kompletterade hos tillverkarna, se research-filen. */
export const SPECS_CHECKED = "2026-08-06";

const SEEDS: ProductSeed[] = [
  {
    id: "gear-planboksfodral-s26",
    brand: "Gear",
    name: "Plånboksfodral 3 kortfack",
    shortName: "Gear Plånboksfodral",
    image: productImage(GALAXY_S26_FODRAL.slug, "gear-planboksfodral-s26"),
    tagline: "Telefonen ligger kvar i fodralet när den laddas.",
    scores: {
      kortkapacitet: 5,
      konstruktion: 3.5,
      laddning: 5,
      prisvarde: 4.5,
      vardagsfunktion: 3.5,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/gear-planboksfodral-for-galaxy-s26-3-kortfack-brun",
    award: "winner",
    superlative: "Bäst för dig som laddar trådlöst",
    pros: [
      "Laddar trådlöst genom fodralet, så telefonen kan ligga kvar på plattan med korten i",
      "Tre kortfack och ett eget sedelfack, alltså hela plånboken utom mynt",
      "72 gram med locket och korten inräknat, mindre än plånboken det ersätter",
    ],
    cons: [
      "Konstläder spricker i vecket med tiden, och vecket är det enda stället ett fodral alltid går sönder",
      "Finns bara i brunt, så den som vill ha svart får välja ett annat fodral",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning",
        highlight: true,
      },
      { label: "Kortfack", value: "3 st", highlight: true },
      { label: "Sedelfack", value: "Ja, separat", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "Integrerat skal",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ja", highlight: true },
      { label: "Pris", value: "199 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "Återvunnet konstläder" },
      { label: "Vikt", value: "72 g" },
      { label: "Handledsrem", value: "Nej" },
      { label: "Utskärningar", value: "Ej angivna" },
      { label: "GTIN", value: "7319925994572" },
    ],
    verdict:
      "Gear Plånboksfodral kostar 199 kronor och är det fodral här du kan lägga rakt på laddplattan med telefonen kvar i.\n\nTre kortfack och ett eget sedelfack tar bankkort, legitimation, resekort och sedlar, alltså hela plånboken utom mynt. Locket viks till ett stöd för film, och allt tillsammans väger 72 gram, vilket är mindre än plånboken det ersätter. Materialet är återvunnet konstläder.\n\nVecket är svagheten, som på varje fodral i den här prisklassen. Konstläder som viks flera gånger om dagen spricker där först, och det syns långt innan resten av fodralet är slitet. Det finns dessutom bara i brunt.\n\nKöp det. Det är det enda fodralet på hyllan som inte tvingar dig att plocka ut telefonen varje kväll, och det gör resten lika bra som fodral som kostar mer.",
  },
  {
    id: "celly-wally-s26",
    brand: "Celly",
    name: "Wally",
    shortName: "Celly Wally",
    image: productImage(GALAXY_S26_FODRAL.slug, "celly-wally-s26"),
    tagline: "Tre kortfack och ett eget kontantfack, med hårt innerskal.",
    scores: {
      kortkapacitet: 5,
      konstruktion: 4,
      prisvarde: 4,
      vardagsfunktion: 3.5,
    },
    price: 229,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/celly-planboksfodral-for-samsung-galaxy-s26-wally-svart",
    superlative: "Störst plånbok av fodralen",
    pros: [
      "Tre kortfack och ett separat kontantfack, alltså mest plånbok i hela jämförelsen",
      "Hårt innerskal under konstlädret, som håller formen när fodralet ligger i en väska",
      "Locket viks till ett stöd, och stänger horisontellt med en magnetflik",
    ],
    cons: [
      "30 kronor dyrare än vinnaren, som rymmer lika mycket och dessutom laddar genom fodralet",
      "Fodralet bär inga magnetiska tillbehör, så en magnetladdare eller bilhållare fäster inte",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Ej angiven",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning",
        highlight: true,
      },
      { label: "Kortfack", value: "3 st", highlight: true },
      { label: "Sedelfack", value: "Ja, separat kontantfack", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "Hårt innerskal",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ja", highlight: true },
      { label: "Pris", value: "229 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "Konstläder med hårt innerskal" },
      { label: "Handledsrem", value: "Ej angiven" },
      { label: "Utskärningar", value: "Ej angivna" },
      { label: "GTIN", value: "8021735226284" },
    ],
    verdict:
      "Celly Wally kostar 229 kronor och bär mer plånbok än något annat fodral i jämförelsen.\n\nTre kortfack plus ett kontantfack som ligger för sig självt är den kombination som gör att plånboken kan stanna hemma i stället för att bantas. Under konstlädret sitter ett hårt innerskal, vilket är skälet att fodralet håller formen i stället för att bågna när det ligger i en väska med annat ovanpå. Locket viks till ett stöd.\n\nMagneten är ett spänne och ingenting mer. Fodralet bär inga magnetiska tillbehör, så en magnetladdare, en bilhållare eller en magnetplånbok fäster inte mot det.\n\nFör 30 kronor mer än vinnaren får du samma tre kort, ett eget kontantfack och ett hårt innerskal, men inte den trådlösa laddningen.",
  },
  {
    id: "tech-protect-matte-s26",
    brand: "Tech-Protect",
    name: "Wallet MagSafe Matte",
    shortName: "Tech-Protect Matte",
    image: productImage(GALAXY_S26_FODRAL.slug, "tech-protect-matte-s26"),
    tagline: "Bär magnetladdare, bilhållare och magnetplånbok.",
    scores: {
      kortkapacitet: 3.5,
      konstruktion: 4,
      laddning: 5,
      prisvarde: 4,
      vardagsfunktion: 4.5,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/tech-protect-planboksfodral-for-galaxy-s26-matte-svart",
    award: "editor",
    superlative: "Bäst för magnetiska tillbehör",
    pros: [
      "Enda fodralet som bär magnetiska tillbehör, alltså laddare, bilhållare och magnetplånbok",
      "Laddar trådlöst genom fodralet, så telefonen stannar i det över natten",
      "Matt eko-läder som varken glänser eller visar fingeravtryck, på en TPU-bas",
    ],
    cons: [
      "Facken rymmer kort, legitimation och sedlar i samma utrymme, medan Gear och Celly håller sedlarna för sig",
      "TPU-bas i stället för hårt innerskal, så fodralet bågnar lättare i väskan än Celly Wally gör",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning och tillbehör",
        highlight: true,
      },
      { label: "Kortfack", value: "Flera", highlight: true },
      { label: "Sedelfack", value: "Ja", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "TPU-bas",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ja", highlight: true },
      { label: "Pris", value: "199 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "Eko-läder med TPU-bas" },
      /* Nej belagt positivt: Tech-Protects egen produktsida räknar upp
         förpackningens innehåll, "Zestaw zawiera 1 × Etui Tech-Protect Wallet
         MagSafe", läst 2026-08-06 och matchad på EAN 5906302322794. */
      { label: "Handledsrem", value: "Nej" },
      { label: "Utskärningar", value: "Ej angivna" },
      { label: "GTIN", value: "5906302322794" },
    ],
    verdict:
      "Tech-Protect Wallet MagSafe Matte kostar 199 kronor och är det andra av två fodral som låter telefonen ligga kvar när den laddas.\n\nMagneterna gör mer än att hålla locket. De bär tillbehör, vilket betyder att en magnetladdare, en bilhållare eller en magnetplånbok fäster mot fodralet, och det klarar ingen annan konstruktion i jämförelsen. Locket viks till ett stativ, ytan är matt eko-läder som inte tar fingeravtryck, och telefonen sitter i en TPU-bas som tar upp stötar.\n\nPlånboksdelen är byggd enklare än hos de två över. Kort, legitimation och sedlar delar samma utrymme, medan Gear och Celly ger sedlarna ett eget fack och räknar upp tre kortfack var.\n\nHar du magnetiska tillbehör till telefonen är det här det enda fodralet som fungerar ihop med dem. Har du inga kostar Gear lika mycket och rymmer mer.",
  },
  {
    id: "fallbart-med-stallning-s26",
    brand: "OEM",
    name: "Fällbart med ställning",
    shortName: "Fällbart med ställning",
    image: productImage(GALAXY_S26_FODRAL.slug, "fallbart-med-stallning-s26"),
    tagline: "Fyra platser att lägga saker på, och remmen ingår.",
    scores: {
      kortkapacitet: 4.5,
      konstruktion: 2.5,
      prisvarde: 5,
      vardagsfunktion: 5,
    },
    price: 89,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/planboksfodral-for-samsung-galaxy-s26-fallbart-med-stallning-rod",
    award: "budget",
    superlative: "Mest fodral för minst pengar",
    pros: [
      "Två kortfack, ett fotofack och en sedelhållare för 89 kronor, alltså mer förvaring än fodral som kostar dubbelt",
      "Handledsrem ingår i förpackningen, vilket bara ett annat fodral här bjuder på",
      "Egna utskärningar för portar, knappar, högtalare och kamera",
    ],
    cons: [
      "PU-läder i den här prisklassen spricker i vecket snabbare än eko-läder gör",
      "Säljs i rött, så den som vill ha ett diskret fodral får leta i en annan rad",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Ej angiven",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning",
        highlight: true,
      },
      { label: "Kortfack", value: "2 st plus fotofack", highlight: true },
      { label: "Sedelfack", value: "Ja, sedelhållare", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "TPU-insats",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ja, handsfree-stöd", highlight: true },
      { label: "Pris", value: "89 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "PU-läder och TPU" },
      { label: "Handledsrem", value: "Ja, ingår" },
      { label: "Utskärningar", value: "Portar, knappar, högtalare, kamera" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Det här fodralet kostar 89 kronor och har fler platser att lägga saker på än fodral som kostar dubbelt.\n\nTvå kortfack, ett fotofack och en sedelhållare blir fyra fickor, och till det kommer en handledsrem som ligger i förpackningen. Locket viks till ett handsfree-stöd. Utskärningarna är gjorda var för sig för portar, knappar, högtalare och kamera, vilket är den detalj billiga fodral annars slarvar med genom att ta ett stort hål över hela kamerablocket.\n\nPriset syns i materialet. PU-läder är styvare än eko-läder och spricker tidigare i vecket, och det är där fodralet till slut ger upp. Räkna med ett år, kanske ett och ett halvt.\n\nKöp det om du vill ta reda på om fodral passar dig innan du lägger riktiga pengar, eller om du vet med dig att du tappar bort saker och hellre byter ofta.",
  },
  {
    id: "tender-s26",
    brand: "Holster",
    name: "Tender",
    shortName: "Tender",
    image: productImage(GALAXY_S26_FODRAL.slug, "tender-s26"),
    tagline: "Tre innerfickor och ett TV-läge, för 129 kronor.",
    scores: {
      kortkapacitet: 4,
      konstruktion: 3.5,
      laddning: 2,
      prisvarde: 4.5,
      vardagsfunktion: 4,
    },
    price: 129,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/planboksfodral-for-galaxy-s26-tender-svart",
    superlative: "Tre fickor till lägsta pris",
    pros: [
      "Tre innerfickor för kort, dokument och sedlar, alltså lika många som fodral för det dubbla",
      "Perforerat veck, så locket viker sig till ett stabilt TV-läge i stället för att bågna",
      "Eko-läder snarare än blank plast, i den billigaste prisklassen",
    ],
    cons: [
      "Fickorna delas mellan kort och sedlar, så sedlarna ligger bland korten",
      "Trådlös laddning fungerar inte genom fodralet, så telefonen lyfts ur insatsen varje kväll",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Nej",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning",
        highlight: true,
      },
      { label: "Kortfack", value: "3 st", highlight: true },
      { label: "Sedelfack", value: "Ja, delat med korten", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "Flexibel insats",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ja, TV-läge", highlight: true },
      { label: "Pris", value: "129 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "Eko-läder" },
      { label: "Handledsrem", value: "Ej angiven" },
      { label: "Utskärningar", value: "Ej angivna" },
      { label: "GTIN", value: "5903396450815" },
    ],
    verdict:
      "Tender kostar 129 kronor och har tre innerfickor, alltså lika många som fodral för det dubbla priset.\n\nFickorna sitter synligt innanför locket och tar kort, dokument och sedlar. Vecket är perforerat, vilket är skälet att locket viker sig till ett stabilt TV-läge i stället för att bågna på mitten som ett omärkt veck gör efter ett par månader. Materialet är eko-läder, och telefonen trycks i en flexibel insats som går att lyfta den ur.\n\nFickorna är delade. Sedlarna ligger bland korten i stället för i ett eget fack, och bär du mycket kontanter blir det stökigt varje gång du ska fram till bankkortet.\n\nTill 129 kronor får du ingenstans mer plånbok än så här.",
  },
  {
    id: "tech-protect-wallet-s26",
    brand: "Tech-Protect",
    name: "Wallet",
    shortName: "Tech-Protect Wallet",
    image: productImage(GALAXY_S26_FODRAL.slug, "tech-protect-wallet-s26"),
    tagline: "Eko-läder, TPU-bas och ställfunktion för 169 kronor.",
    scores: {
      kortkapacitet: 3.5,
      konstruktion: 4,
      laddning: 2,
      prisvarde: 3.5,
      vardagsfunktion: 3.5,
    },
    price: 169,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/tech-protect-planboksfodral-for-galaxy-s26-svart",
    superlative: "Prisvärdast av eko-läderfodralen",
    pros: [
      "Eko-läder, TPU-bas, ställfunktion och plånbok för 169 kronor",
      "Förstärkta sömmar längs kanten, där locket annars börjar släppa först",
      "Finns i tre färgställningar, vilket är fler än de flesta märkesfodralen här",
    ],
    cons: [
      "Bär inga magnetiska tillbehör, så magnetladdaren och bilhållaren blir oanvändbara",
      "Kort och sedlar delar utrymme, medan Celly ger kontanterna ett eget fack",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Ej angiven",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning",
        highlight: true,
      },
      { label: "Kortfack", value: "Flera", highlight: true },
      { label: "Sedelfack", value: "Ja", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "TPU-bas",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ja", highlight: true },
      { label: "Pris", value: "169 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "Eko-läder med TPU-bas" },
      { label: "Handledsrem", value: "Ej angiven" },
      { label: "Utskärningar", value: "Ej angivna" },
      { label: "GTIN", value: "5906302390335" },
    ],
    verdict:
      "Tech-Protect Wallet kostar 169 kronor och ger eko-läder, stativ och plånbok för mindre än de flesta märkesfodral tar.\n\nTelefonen sitter i en TPU-bas som tar upp stötar i stället för att skicka dem vidare in i ramen, och sömmarna längs kanten är förstärkta, vilket är där ett lock börjar släppa först. Locket viks till ett stöd för film, och fodralet finns i tre färgställningar.\n\nMagneten är ett spänne. Tech-Protect anger själva att fodralet inte bär magnettillbehör, så en magnetladdare eller en bilhållare fäster inte mot det, till skillnad från märkets eget Matte.\n\nDet här är fodralet för dig som laddar med sladd och vill ha eko-läder billigt. Behöver du magneterna kostar Matte 30 kronor mer och släpper dessutom igenom laddningen.",
  },
  {
    id: "luna-s26",
    brand: "Holster",
    name: "Luna",
    shortName: "Luna",
    image: productImage(GALAXY_S26_FODRAL.slug, "luna-s26"),
    tagline: "Aluminiumram som håller formen, och mocka mot skärmen.",
    scores: {
      kortkapacitet: 2,
      konstruktion: 4.5,
      laddning: 2,
      prisvarde: 4,
      vardagsfunktion: 4,
    },
    price: 129,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/planboksfodral-for-galaxy-s26-luna-svart",
    superlative: "Enda fodralet med aluminiumram",
    pros: [
      "Förstärkt aluminiumram längs kanterna, som håller fodralet i form",
      "Insidan klädd i mockaliknande material, alltså mjukt mot skärmen när locket är stängt",
      "Telefonen sitter i en flexibel silikonhållare med egna utskärningar",
    ],
    cons: [
      "En enda liten ficka, så plånboken följer med ändå",
      "Laddar bara med sladd, och en magnetladdare eller bilhållare fäster inte mot fodralet",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Nej",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning, förstärkt",
        highlight: true,
      },
      { label: "Kortfack", value: "1 st", highlight: true },
      { label: "Sedelfack", value: "Ja, delat med korten", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "Flexibel silikonhållare",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ja", highlight: true },
      { label: "Pris", value: "129 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "Aluminiumram, mockaklädd insida" },
      { label: "Handledsrem", value: "Ej angiven" },
      { label: "Utskärningar", value: "I silikonhållaren" },
      { label: "GTIN", value: "5903396429002" },
    ],
    verdict:
      "Luna kostar 129 kronor och är det enda fodralet i jämförelsen med en ram i aluminium.\n\nRamen styvar upp kanterna, och kanterna är där ett plånboksfodral annars börjar vika sig utåt efter ett halvår så att locket inte längre ligger platt. Insidan är klädd med ett mockaliknande material som ligger direkt mot skärmen, telefonen trycks i en flexibel silikonhållare med egna utskärningar, och locket viks till ett stativ.\n\nPlånboksdelen är en enda liten ficka. Den tar ett kort och några sedlar, och sedan är det slut.\n\nKöp Luna för ramen, inte för plånboken. Den som är trött på ett lock som slutat ligga platt får här det enda fodralet i jämförelsen som är byggt mot just det.",
  },
  {
    id: "mandala-s26",
    brand: "Holster",
    name: "Mezzo",
    shortName: "Mezzo",
    image: productImage(GALAXY_S26_FODRAL.slug, "mandala-s26"),
    tagline: "Remmen håller telefonen kvar i handen.",
    scores: {
      kortkapacitet: 3.5,
      konstruktion: 3.5,
      laddning: 2,
      prisvarde: 3.5,
      vardagsfunktion: 3.5,
    },
    price: 129,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/planboksfodral-for-galaxy-s26-mandala-guld-rosa",
    superlative: "Bäst för den som tappat en telefon",
    pros: [
      "Handledsrem ingår, vilket är det som räddar en tung telefon från trottoaren",
      "Mönstret är pressat i materialet i stället för tryckt, så det nöts inte bort",
      "Flexibel TPU-insats, alltså telefonen går att lyfta ur när du vill ha den naken",
    ],
    cons: [
      "Två fickor är mindre än de tre kortfack plus sedelfack vinnaren ger för 70 kronor mer",
      "Locket viks inte till något stöd, till skillnad från Tender och Luna i samma prisklass",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Nej",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning",
        highlight: true,
      },
      { label: "Kortfack", value: "2 st", highlight: true },
      { label: "Sedelfack", value: "Ja, delat med korten", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "Flexibel TPU-insats",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ej angiven", highlight: true },
      { label: "Pris", value: "129 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "Eko-läder med TPU-insats" },
      { label: "Handledsrem", value: "Ja, ingår" },
      { label: "Utskärningar", value: "Ej angivna" },
      { label: "GTIN", value: "5903396429132" },
    ],
    verdict:
      "Mezzo kostar 129 kronor och kommer med en rem som låter telefonen hänga från handleden.\n\nEn Galaxy S26 i ett plånboksfodral är tyngre och halare än en naken telefon, och remmen är skillnaden mellan att tappa den på trottoaren och att inte göra det. Mönstret är pressat i materialet med press i stället för tryckt ovanpå, vilket betyder att det inte nöts bort där tummen ligger. Telefonen sitter i en flexibel TPU-insats och går att lyfta ur.\n\nFörvaringen är två fickor för kort och sedlar, alltså minsta rimliga plånbok, och locket viks inte till något stöd. Vill du se på film utan att hålla telefonen finns det ingen ställning att fälla ut.\n\nRemmen och det pressade mönstret är skälen att välja Mezzo. Vill du ha ett stativ gör Tender det för samma pengar, och tar tre fickor på köpet.",
  },
  {
    id: "puro-eco-leather-s26",
    brand: "Puro",
    name: "Wallet Stand",
    shortName: "Puro Wallet Stand",
    image: productImage(GALAXY_S26_FODRAL.slug, "puro-eco-leather-s26"),
    tagline: "Italienskt PU-läder med mjuka TPU-kanter.",
    scores: {
      kortkapacitet: 4,
      konstruktion: 3.5,
      prisvarde: 1.5,
      vardagsfunktion: 3,
    },
    price: 479,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/puro-planboksfodral-for-galaxy-s26-eco-leather-svart",
    award: "premium",
    superlative: "Bäst för den som vill ha ett märke",
    pros: [
      "Två kortfack och ett sedelfack, med mjuka TPU-kanter runt telefonen",
      "Puro är en italiensk tillverkare som säljer samma serie över hela Europa",
    ],
    cons: [
      "479 kronor, alltså mer än dubbla vinnarens pris, för två kortfack i stället för tre",
      "Puro säljer själva fodralet för 29,95 euro, ungefär 340 kronor",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Ej angiven",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning",
        highlight: true,
      },
      { label: "Kortfack", value: "2 st", highlight: true },
      { label: "Sedelfack", value: "Ja", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "Insats med mjuka TPU-kanter",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ja", highlight: true },
      { label: "Pris", value: "479 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "PU-läder med mjuka TPU-kanter" },
      { label: "Handledsrem", value: "Ej angiven" },
      { label: "Utskärningar", value: "Noggrant placerade" },
      { label: "GTIN", value: "8018417537158" },
    ],
    verdict:
      "Puro Wallet Stand kostar 479 kronor och är det dyraste fodralet i jämförelsen med bred marginal.\n\nDet är byggt ordentligt. Två kortfack och ett sedelfack innanför ett lock i PU-läder som viks till ett stöd, mjuka TPU-kanter runt telefonen, och utskärningar som är placerade var för sig. Puro är en italiensk tillverkare som säljer samma serie över hela Europa snarare än ett namn som dykt upp i en butiksdatabas.\n\nRäkningen är ändå svår att få ihop. Samma två kortfack finns i fodral för en fjärdedel av priset, vinnaren tar tre plus ett eget sedelfack, och Puro säljer fodralet i sin egen butik för 29,95 euro, alltså runt 340 kronor.\n\nDet här köper du för märket och materialkänslan. Det är ett hederligt skäl så länge du vet om det, men fyra billigare fodral ger dig mer för pengarna.",
  },
  {
    id: "smart-pro-s26",
    brand: "Holster",
    name: "Smart Pro",
    shortName: "Smart Pro",
    image: productImage(GALAXY_S26_FODRAL.slug, "smart-pro-s26"),
    tagline: "Äkta läder och två spännen som håller locket stängt.",
    /* ⚠️ MATERIALET ÄR RÄTTAT 2026-08-06. Partner Tele.com anger "Materiał:
       skóra naturalna, TPU" på sin egen produktsida, matchad på EAN
       5903396450747, och artikeln heter "Smart Pro Book skórzane" hos dem.
       Sidan hade Konstläder, vilket ingen källa säger. Butiken anger
       "Material: Mjukplast" i sin attributruta, men det är samma rullgardin
       som fyller i Produkttyp och Funktion, och butikens egen produkttext
       nämner inget material alls. Tillverkaren är intern konsistent på tre
       ställen: modellnamnet, URL:en och materialfältet. Konflikten är noterad
       i .agent/research/galaxy-s26-fodral.md.

       Betyget för konstruktion höjs 3,5 → 4,0 och prisvärde 3,0 → 3,5, båda
       på materialklausulen i respektive kriteriebeskrivning. Totalbetyget går
       5,5 → 5,9 och placeringen står kvar på tionde. Se lib/corrections.ts. */
    scores: {
      kortkapacitet: 2,
      konstruktion: 4,
      laddning: 2,
      prisvarde: 3.5,
      vardagsfunktion: 3.5,
    },
    price: 129,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/planboksfodral-for-galaxy-s26-smart-pro-svart",
    superlative: "Äkta läder för 129 kronor",
    pros: [
      "Äkta läder och TPU, alltså det enda riktiga lädret i jämförelsen",
      "Dubbel magnetstängning, så locket inte glider upp i jackfickan",
      "Förstärkta kanter med grov söm, och en styv konstruktion som håller formen",
    ],
    cons: [
      "En enda ficka innanför locket, så plånboken följer med ändå",
      "Båda spännena ska öppnas varje gång telefonen ska laddas, för laddning genom fodralet fungerar inte",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Nej",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning, dubbel",
        highlight: true,
      },
      { label: "Kortfack", value: "1 st", highlight: true },
      { label: "Sedelfack", value: "Ej angivet", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "Insats i fodralet",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ja", highlight: true },
      { label: "Pris", value: "129 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "Äkta läder och TPU" },
      { label: "Handledsrem", value: "Ej angiven" },
      { label: "Utskärningar", value: "Knappar och portar" },
      { label: "GTIN", value: "5903396450747" },
    ],
    verdict:
      "Smart Pro kostar 129 kronor och är det enda fodralet i jämförelsen som är sytt i äkta läder.\n\nLäder är det material som håller längst i vecket, alltså på den enda punkt där ett plånboksfodral nästan alltid ger upp, och här kostar det lika mycket som eko-läderfodralen bredvid. Kanterna är förstärkta med en grov söm i kontrastfärg, konstruktionen är styv och insidan mjuk mot skärmen. Två magnetspännen i stället för ett håller locket stängt i en jackficka, och det är precis där kort trillar ur ett fodral som glidit upp. Locket viks till ett stativläge.\n\nInnanför locket sitter en enda ficka. Den tar bankkortet och ett par dokument, och sedan är förvaringen slut.\n\nDe 129 kronorna går till materialet och till stängningen, inte till plånboken. Bär du korten i telefonen är det här fel fodral, hur bra lädret än är.",
  },
  {
    id: "sensitive-s26",
    brand: "Holster",
    name: "Sensitive Book",
    shortName: "Sensitive",
    image: productImage(GALAXY_S26_FODRAL.slug, "sensitive-s26"),
    tagline: "Ett kort, ett lock över skärmen och ett TV-läge.",
    scores: {
      kortkapacitet: 2,
      konstruktion: 3,
      laddning: 2,
      prisvarde: 3,
      vardagsfunktion: 3.5,
    },
    price: 129,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/planboksfodral-for-galaxy-s26-sensitive-svart",
    superlative: "För dig som bara bär ett kort",
    pros: [
      "Kraftig magnetstängning som gör locket lätt att öppna med en hand och ändå håller det stängt",
      "Locket viks till ett TV-läge, i den billigaste prisklassen",
      "Finns i fyra färger till samma pris",
    ],
    cons: [
      "En ficka är minsta möjliga plånboksfunktion, så plånboken följer med ändå",
      "Varken en magnetladdare eller en trådlös laddplatta fungerar med fodralet på",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Nej",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning, förstärkt",
        highlight: true,
      },
      { label: "Kortfack", value: "1 st", highlight: true },
      { label: "Sedelfack", value: "Ej angivet", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "Insats i fodralet",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ja, TV-läge", highlight: true },
      { label: "Pris", value: "129 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "Konstläder med mjuk insats" },
      { label: "Handledsrem", value: "Ej angiven" },
      { label: "Utskärningar", value: "Portar och knappar" },
      { label: "GTIN", value: "5903396427435" },
    ],
    verdict:
      "Sensitive Book kostar 129 kronor och är byggt för den som bär ett enda kort.\n\nDet låter bakvänt och är det inte. En ficka räcker för det kort de flesta faktiskt tar fram under en dag, alltså bankkortet eller passerkortet, och ett fodral med tre fack som du fyller med kort du aldrig använder gör bara telefonen tjockare. Magneten är kraftig nog att hålla locket stängt i fickan och ändå avvägd så att fodralet går att öppna med en hand, och locket viks till ett TV-läge.\n\nMer än så är det inte. Fodralet är ett lock med en ficka, och den fickan är hela plånboksfunktionen du betalar för.\n\nEtt kort och ett skydd över skärmen, till 129 kronor. Ska fodralet ersätta plånboken behöver du Celly Wally eller Gear i stället.",
  },
  {
    id: "tech-protect-smart-matt-s26",
    brand: "Tech-Protect",
    name: "Smart Wallet Matt",
    shortName: "Tech-Protect Smart Wallet",
    image: productImage(GALAXY_S26_FODRAL.slug, "tech-protect-smart-matt-s26"),
    tagline: "Fönster i locket som visar vem som ringer.",
    scores: {
      kortkapacitet: 2,
      konstruktion: 3,
      prisvarde: 2.5,
      vardagsfunktion: 4,
    },
    price: 219,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/tech-protect-planboksfodral-for-galaxy-s26-smart-matt-svart",
    superlative: "Ser notiser utan att öppna locket",
    pros: [
      "Fönster i locket visar tid, datum och notiser utan att fodralet öppnas",
      "Fönstret styrs av en app, så du väljer själv vad som ska synas",
      "Matt yta i tre färgställningar, bland annat lila och mullbär",
    ],
    cons: [
      "En enda ficka som delas mellan kort och sedlar, alltså minsta plånboken i jämförelsen",
      "Locket viks inte till något stöd, trots att märkets billigare Wallet gör det",
    ],
    specs: [
      {
        label: "Trådlös laddning genom fodralet",
        shortLabel: "Laddning",
        value: "Ej angiven",
        highlight: true,
      },
      {
        label: "Magnetens funktion",
        shortLabel: "Magneten",
        value: "Stängning",
        highlight: true,
      },
      { label: "Kortfack", value: "1 st, delat med sedlar", highlight: true },
      { label: "Sedelfack", value: "Ja, delat med korten", highlight: true },
      {
        label: "Telefonens infästning",
        shortLabel: "Infästning",
        value: "Hårdplastinsats",
        highlight: true,
      },
      { label: "Ställfunktion", shortLabel: "Ställ", value: "Ej angiven", highlight: true },
      { label: "Pris", value: "219 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Material", value: "Matt yta med hårdplastinsats" },
      { label: "Handledsrem", value: "Ej angiven" },
      { label: "Utskärningar", value: "Knappar, portar, kamera" },
      { label: "GTIN", value: "5906302390427" },
    ],
    verdict:
      "Tech-Protect Smart Wallet kostar 219 kronor och har ett fönster i locket som visar tid, datum och notiser.\n\nFönstret styrs av en app som du installerar själv och där du väljer vad som ska visas. I praktiken betyder det att telefonen kan ligga stängd på ett bord och du ändå ser vem som ringer, vilket är den enda funktionen i den här jämförelsen som gör något åt att ett lock döljer skärmen. Ytan är matt och fodralet finns i tre färgställningar, bland annat lila och mullbär.\n\nPlånboken är däremot den minsta av fodralen: en enda ficka som kort och sedlar delar på. Locket viks inte heller till något stöd, vilket märkets egna Wallet gör för 50 kronor mindre.\n\nKöp det för fönstret, som är ett riktigt skäl. Är det plånboken du är ute efter finns det bättre fodral på varje prisnivå under det här.",
  },
];

/**
 * Övervägda men inte rankade.
 *
 * ⚠️ De fyra första är **utgångna ur sortimentet** och saknar pris. De ligger
 * ändå kvar i butikens kategorilista, vilket är skälet att de fanns i urvalet
 * från början. Ingen prisuppgift har hittats, och vi rankar aldrig en produkt
 * vars pris vi inte kan läsa.
 */
export const GALAXY_S26_FODRAL_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "OEM",
    name: "Plånboksfodral Litchi Konstläder med rem",
    reason:
      "Konstläder med präglat litchimönster, tre kortfack, sedelficka och fotofack, EAN 7330163068153. Bortvald för att artikeln har utgått ur butikens sortiment och saknar både lagersaldo och pris, trots att den ligger kvar i kategorilistan.",
    merchantUrl:
      "https://www.themobilestore.se/galaxy-s26-s26-pro-planboksfodral-litchi-lader-med-rem-svart",
  },
  {
    brand: "OEM",
    name: "Plånboksfodral Imprinted Totem",
    reason:
      "Präglat konstläder i guld med kortfack och kontantficka, EAN 7330163081206. Utgången ur sortimentet och utan pris, av samma skäl som Litchi ovan.",
    merchantUrl:
      "https://www.themobilestore.se/galaxy-s26-s26-pro-planboksfodral-imprinted-totem-lader-guld",
  },
  {
    brand: "OEM",
    name: "Plånboksfodral L-shaped Grid Pattern",
    reason:
      "Rutmönstrat konstläder med kortfack och stark magnetstängning, EAN 7330163068214. Utgången ur sortimentet och utan pris.",
    merchantUrl:
      "https://www.themobilestore.se/galaxy-s26-s26-pro-planboksfodral-l-shaped-grid-pattern-bla",
  },
  {
    brand: "OEM",
    name: "Plånboksfodral Sunflower Imprint",
    reason:
      "Präglat konstläder i rosa med kortfack för kort och kontanter, EAN 7330163056549. Utgången ur sortimentet och utan pris.",
    merchantUrl:
      "https://www.themobilestore.se/galaxy-s26-s26-pro-planboksfodral-sunflower-imprint-lader-rosa",
  },
  {
    brand: "Holster",
    name: "Mezzo, övriga fyra mönster",
    reason:
      "Mezzo säljs i fem tryck till samma pris och samma konstruktion, och raden ovan gäller alla fem. Mönstret Röd Cats och tre till ligger här av den anledningen. Kontrollera bilderna vid nästa prisrunda: butikens sex produktbilder på Röd Cats visar Galaxy S26 Ultra, och vi publicerar aldrig en packshot av en annan modell än raden gäller.",
    merchantUrl: "https://www.themobilestore.se/planboksfodral-for-galaxy-s26-mezzo-rod-cats",
  },
  {
    brand: "Tech-Protect",
    name: "Wallet Mulberry",
    reason:
      "Samma konstruktion som Tech-Protect Wallet i rankningen, i färgen mullbär för samma 169 kronor. En rad är en konstruktion och inte en färg, så den ligger här i stället.",
    merchantUrl: "https://www.themobilestore.se/tech-protect-planboksfodral-for-galaxy-s26-mulberry",
  },
];

export const GALAXY_S26_FODRAL_FAQ = [
  {
    question: "Betyder magnetstängning att fodralet laddar trådlöst?",
    answer:
      "Nej, och det är den dyraste förväxlingen i den här kategorin. Magnetstängning är spännet som håller locket stängt så att fodralet inte glider upp i fickan, och det har ingenting med laddning att göra. Fem av tillverkarna anger uttryckligen att deras fodral varken bär magnetiska tillbehör eller släpper igenom trådlös laddning, samtidigt som de beskriver magnetstängningen som en fördel. Förväxlingen är särskilt lätt att göra på en Galaxy S26, eftersom telefonen saknar inbyggda Qi2-magneter och den som läst om skyddsskal har lärt sig att leta efter just ordet magnet.",
  },
  {
    question: "Kan jag ladda telefonen trådlöst utan att ta den ur fodralet?",
    answer:
      "Med två av fodralen i jämförelsen. Gear Plånboksfodral anger att laddning fungerar genom fodralet, vilket Icecats produktdata bekräftar, och Tech-Protect Wallet MagSafe Matte anger att magneterna bär både laddare och tillbehör utan att fodralet tas av. Fem fodral anger tvärtom att trådlös laddning inte fungerar genom dem. Laddar du med sladd spelar hela frågan ingen roll, och då öppnar sig hyllan.",
  },
  {
    question: "Vilket fodral bär en magnetladdare eller en bilhållare?",
    answer:
      "Bara Tech-Protect Wallet MagSafe Matte. Galaxy S26 saknar egna magneter, så ett tillbehör som ska sitta fast magnetiskt behöver magneterna i fodralet, och det är bara den konstruktionen som har dem. Tech-Protect anger själva att märkets billigare Wallet inte har det, och Partner Tele.com anger samma sak för Mezzo, Tender, Sensitive, Luna och Smart Pro. Har du en magnetladdare i bilen eller på nattduksbordet är det alltså ett val mellan ett fodral och tillbehören du redan äger.",
  },
  {
    question: "Hur många kort får plats i ett Galaxy S26-fodral?",
    answer:
      "Ett till tre. Celly Wally och Gear har tre kortfack var plus ett eget fack för sedlar och bär mest i jämförelsen, Tender har tre innerfickor som delas mellan kort och sedlar, och Mezzo, Puro och det fällbara har två. Fyra av fodralen har en enda ficka, vilket räcker till bankkortet men inte till att lämna plånboken hemma. Den här hyllan har inga fodral som tar nio eller tio kort, vilket finns i motsvarande sortiment till iPhone.",
  },
  {
    question: "Hur sitter telefonen fast i fodralet?",
    answer:
      "Mekaniskt, alltid. På en iPhone kan ett fodral fästa magnetiskt mot telefonens egna magneter, men Galaxy S26 har inga, så varje fodral måste hålla telefonen fysiskt. I den här jämförelsen är det antingen en TPU- eller silikonhållare som telefonen trycks ner i, ett hårt innerskal, eller ett integrerat skal. Skillnaden märks: en TPU- eller silikonhållare går att lyfta telefonen ur när du vill ha den naken, medan ett hårt innerskal håller formen bättre när fodralet ligger i en väska.",
  },
  {
    question: "Håller ett plånboksfodral i konstläder?",
    answer:
      "Vecket avgör, och det är där de går sönder. Ett plånboksfodral viks flera gånger om dagen på exakt samma ställe, och konstläder spricker där långt före resten av fodralet är slitet. Räkna med ungefär ett år i den billigaste klassen och längre ju tjockare materialet är. Tre konstruktioner gör något åt saken: Luna har en aluminiumram som styvar upp kanterna, Tender har ett perforerat veck som viker sig på en bestämd linje i stället för att bågna, och Smart Pro är sytt i äkta läder, som tål att vikas längre än konstläder gör. Det är också skälet att ett fodral för 89 kronor som byts varje år inte nödvändigtvis är billigare än ett för 229 som håller i tre.",
  },
  {
    question: "Passar ett fodral till Galaxy S26 även på S26+ eller S26 Ultra?",
    answer:
      "Nej. Serien består av Galaxy S26, S26+ och S26 Ultra, och de har olika storlek och olika kameraplacering. Alla fodral på den här sidan är kontrollerade och prissatta som artiklar till basmodellen Galaxy S26. Några fodral säljs mot två modellnamn samtidigt, vilket är vanligare för fodral än för hårda skal eftersom en mjuk insats spänner över ett litet storleksspann. Kontrollera ändå alltid att just din modell står med innan du beställer.",
  },
];

const resolved = resolveProducts(GALAXY_S26_FODRAL, SEEDS);

export const GALAXY_S26_FODRAL_PRODUCTS = resolved;
