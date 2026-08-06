import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { GALAXY_S26_SKAL } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /galaxy-s26-skal.
 *
 * Priser, artikelnummer och produkttexter är lästa på TheMobileStores egna
 * produktsidor 2026-08-05. Butiken svarar tomt på curl och besvaras av
 * r.jina.ai, vilket är noterat i `.agent/research/galaxy-s26-skal.md`: en tom
 * hämtning från den här butiken betyder aldrig att uppgiften saknas.
 *
 * Material, hörnkonstruktioner, vikter, tjocklekar, fallprov och GTIN är
 * kompletterade hos tillverkarna 2026-08-06. Varje sådant värde bär en
 * kommentar med källa vid raden där det inte är uppenbart.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans än. Se lib/links.ts.
 *
 * ## Avgränsningen
 *
 * Sidan rankar **bara skyddsskal till basmodellen Galaxy S26**, båda delarna
 * efter användarbeslut 2026-08-05. Plånboksfodral får systersidan
 * /galaxy-s26-fodral. Skal till S26+ och S26 Ultra hör inte hit: ett skal
 * passar exakt en modellstorlek även när det heter samma sak.
 *
 * ## ⚠️ Serien heter S26, S26+ och S26 Ultra
 *
 * Aldrig "S26 Pro" eller "S26 Edge". De namnen kommer ur ryktesrapporteringen
 * före lanseringen den 25 februari 2026 och ligger kvar i svensk teknikpress.
 * Verifierat tre gånger: Samsungs egen svenska sida, Elgigantens produktdata
 * (modellnamn Samsung Galaxy S26, serie S26, SM-S942BZKGEUB) och Skal-mans
 * modellnavigation.
 *
 * TheMobileStore har trots det kvar en kategori för "Galaxy S26 Pro" med **en**
 * produkt i, på lagerrensning. Flera artiklar säljs dessutom som "Galaxy S26 /
 * S26 Pro". Ingen sådan artikel är rankad här, eftersom vi då skulle ange
 * passform mot en telefon som inte finns. Samma fälla som iPhonebutikens
 * passform mot iPhone 18 Pro på /iphone-skal.
 *
 * ## ⚠️ Materialet är kontrollerat mot tillverkaren, inte mot butiken
 *
 * Butikens attributfält är handskrivet och motsäger sig självt: både
 * *Silicone Magnet* och *AirSkin Aramid* står som `Hårdplast`, och `Funktion`
 * är stavat *MagSafe-komtaibel* på två produkter. `Material` nedan följer
 * tillverkarens egen specifikation där en sådan finns, annars
 * produktbeskrivningen. Aldrig attributfältet ensamt.
 *
 * ## ⚠️ 2026-08-06: kriteriet öppen redovisning är borttaget
 *
 * Sidan hade ett fjärde kriterium på 20 som betygsatte hur mycket säljaren
 * skrivit ut om skyddet. Det rankade dokumentationen och inte varan, och det
 * avgjorde andraplatsen: Samsung Rugged Magnet fick 5,0 på det ensamt och
 * klättrade från åttonde till andra plats. Vikten är omfördelad proportionellt
 * över de tre kriterier som är kvar, och Rugged Magnet ligger nu åttonde.
 *
 * Gap-passet mot tillverkarna visade samtidigt varför kriteriet var fel byggt:
 * det mätte vad TheMobileStore råkat skriva av. Spigen anger själva 1,2 meter
 * och 26 fall för Tough Armor, UNIQ anger tre meter för Combat, och Samsungs
 * egen sida anger 1,22 meter i fem omgångar om 26 fall mot stål — mer exakt än
 * de "1,2 meter" butiken återgav. Tre tillverkare av tolv anger alltså ett tal,
 * inte en av arton.
 *
 * ## ⚠️ Två skal utan magnetring rankas kvar, och det är meningen
 *
 * Ringke Fusion X och Spigen Liquid Crystal saknar magnetring. De ligger sist
 * av det skälet, och de ligger **kvar** efter användarbeslut: Ringke säljer
 * samma skal i två versioner som skiljer 30 kronor och ett ord i namnet, och
 * den skillnaden syns bara om båda står i tabellen.
 *
 * Kontrollerat på Fusion X:s egen produktsida hos Ringke: konstruktionen
 * beskrivs med exakt samma formuleringar som magnetversionen, och magneten
 * nämns inte. Skillnaden mellan dem är ringen.
 */

export const PRICE_CHECKED = "2026-08-05";

/* SPEC_CHECKED nedan i kommentarerna avser 2026-08-06, då tillverkarnas egna
   sidor lästes. Se .agent/research/galaxy-s26-skal.md §14. */

const SEEDS: ProductSeed[] = [
  {
    id: "ringke-magnetic-fusion-x-s26",
    brand: "Ringke",
    name: "Magnetic Fusion X",
    shortName: "Ringke Magnetic Fusion X",
    image: productImage(GALAXY_S26_SKAL.slug, "ringke-magnetic-fusion-x-s26"),
    tagline: "Förstärkta hörn, förhöjda kanter och magnetringen som telefonen saknar.",
    scores: {
      magnet: 4.5,
      konstruktion: 4.5,
      prisvarde: 5,
    },
    price: 229,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/ringke-mobilskal-for-galaxy-s26-magsafe-magnetic-fusion-x-svart",
    award: "winner",
    superlative: "Bäst för den som laddar magnetiskt",
    pros: [
      "Magnetringen sitter i, så Samsungs egen powerbank och magnetladdare fäster utan att du köper något mer",
      "Luftkuddar i hörnen, alltså där telefonen faktiskt tar i marken när den faller",
      "33,7 gram, och 550 kronor under Samsungs eget skal med samma magnetring och samma förhöjda kanter",
    ],
    cons: [
      "Spigen Tough Armor lägger ett skumlager mellan plasten och telefonen, vilket det här skalet inte gör",
      "Klar baksida, så repor i plasten syns tydligare än på ett matt skal",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, inbyggd ring", highlight: true },
      /* Ringkes egen materialrad för artikeln: "Polycarbonate, Thermoplastic
         Polyurethane, Neodymium Magnet". Läst SPEC_CHECKED. */
      { label: "Material", value: "Polykarbonat, TPU och neodymmagnet", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Luftkuddar i hörnen",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "Militärklassat, utan siffra",
        highlight: true,
      },
      { label: "Pris", value: "229 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Knappar", value: "Täckta" },
      /* Ringkes egen produktsida, SPEC_CHECKED. Tjockleken anges inte där. */
      { label: "Vikt", value: "33,7 g" },
      { label: "Tjocklek", value: "Ej angiven" },
      /* Butikens artikel, alltså den vi prissatt och länkar till. Ringkes egen
         butik listar 8800328815629 för samma modell i svart. */
      { label: "GTIN", value: "8800328815643" },
    ],
    verdict:
      "Ringke Magnetic Fusion X kostar 229 kronor och gör det enda som verkligen betyder något på den här telefonen: den bär magneten som Samsung valde bort.\n\nGalaxy S26 har inga inbyggda magneter. Det låter som en detalj tills du köper Samsungs egen magnetiska powerbank eller deras magnetladdare, för då sitter de bara fast om skalet har en ring. Det här skalet har den. Konstruktionen är dessutom rätt prioriterad: luftkuddar i hörnen, förhöjd kant både runt skärmen och runt kameran, hård polykarbonatbaksida och mjuk TPU-ram. En telefon som faller landar nästan aldrig platt, och kamerablocket på en S26 är det som möter bordsskivan först när du lägger ner den.\n\nDet finns ett steg till att ta i skydd, och det kostar. Spigen Tough Armor lägger ett skumlager innanför plasten och tar 519 kronor för det. Fusion X stannar vid två material och 33,7 gram, alltså ett skal du märker mindre av i fickan och som ändå tar hand om hörnen.\n\nKöp det här. Det är billigare än nio av de elva andra skalen, det skyddar där det ska, och det gör resten av dina Samsung-tillbehör användbara i stället för att du upptäcker problemet först när laddaren glider av bordet.",
  },
  {
    id: "ringke-magnetic-onyx-s26",
    brand: "Ringke",
    name: "Magnetic Onyx",
    shortName: "Ringke Magnetic Onyx",
    image: productImage(GALAXY_S26_SKAL.slug, "ringke-magnetic-onyx-s26"),
    tagline: "Matt yta som inte blir hal, med magnetring och luftkuddar i hörnen.",
    scores: {
      magnet: 4.5,
      konstruktion: 4,
      prisvarde: 4.5,
    },
    price: 249,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/ringke-mobilskal-for-galaxy-s26-magsafe-magnetic-onyx-svart",
    award: "editor",
    superlative: "Bäst matta skalet med magnetring",
    pros: [
      "Matt granulatyta som inte glider ur handen och inte visar fingeravtryck",
      "Luftkuddar i hörnen som tar upp kraften där telefonen landar",
      "2,0 millimeter och 34,2 gram, alltså tunnare än hybridskalen i samma klass",
    ],
    cons: [
      "Helt i TPU utan hård baksida, så det håller formen sämre över tid än ett hybridskal",
      "50 kronor dyrare än samma skal utan magnet, vilket är hela skillnaden mellan dem",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, inbyggd ring", highlight: true },
      /* Ringke beskriver artikeln som "slim magnetic TPU case" med granulatyta.
         Ingen hård baksida, till skillnad från Fusion X. Läst SPEC_CHECKED. */
      { label: "Material", value: "TPU med matt granulatyta", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Luftkuddar i hörnen",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "Militärklassat, utan siffra",
        highlight: true,
      },
      { label: "Pris", value: "249 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Knappar", value: "Täckta" },
      /* Ringkes egen produktsida, SPEC_CHECKED. */
      { label: "Vikt", value: "34,2 g" },
      { label: "Tjocklek", value: "2,0 mm" },
      { label: "GTIN", value: "8800328816503" },
    ],
    verdict:
      "Ringke Magnetic Onyx kostar 249 kronor och löser ett problem de klara skalen inte kan lösa: en telefon som inte glider.\n\nYtan är matt och gummerad i stället för blank. Det betyder att skalet sitter kvar i handen och inte samlar fingeravtryck, och 2,0 millimeter gör det till ett av de tunnaste skalen på hyllan som ändå bär en magnetring. Ringen är stark och beskrivs för hela kedjan av tillbehör, alltså laddare, bilhållare och magnetplånbok, vilket är precis det som inte fungerar utan ring på den här telefonen.\n\nSkillnaden mot vinnaren sitter i vad skalet är gjort av. Onyx är helt i TPU, alltså mjukt hela vägen igenom, medan Fusion X har en styv polykarbonatbaksida innanför den mjuka ramen. Den styva baksidan håller formen bättre över tid och fördelar kraften bredare vid ett fall. Hörnen är luftkuddar på båda.\n\nDet här är skalet att välja om du bryr dig mer om att telefonen ska stanna i handen än om vad som händer när den inte gör det. För tjugo kronor mindre får du Fusion X med hård baksida, men den är blank och den blir hal.",
  },
  {
    id: "nillkin-super-frosted-shield-pro-s26",
    brand: "Nillkin",
    name: "Super Frosted Shield Pro",
    shortName: "Nillkin Super Frosted Shield Pro",
    image: productImage(GALAXY_S26_SKAL.slug, "nillkin-super-frosted-shield-pro-s26"),
    tagline: "Frostad yta som ger grepp, med magnetring och luftkuddar i alla fyra hörn.",
    scores: {
      magnet: 4,
      konstruktion: 4,
      prisvarde: 5,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/nillkin-mobilskal-for-galaxy-s26-magsafe-super-frosted-shield-pro-svart",
    superlative: "Bäst magnetskal för 199 kronor",
    pros: [
      "Luftkuddar i alla fyra hörn, alltså den konstruktion som tar upp fall snarare än bara täcker baksidan",
      "Hård polykarbonatbaksida och mjuk TPU-ram, den kombination som faktiskt fördelar kraften vid ett fall",
      "Frostad yta som ger grepp utan att bli hal, och som inte visar fingeravtryck",
    ],
    cons: [
      "Frostad yta repas synligt av nycklar i samma ficka, till skillnad från gummerade skal",
      "Dux Ducis Clin Mag har också magnetring och luftkuddar i hörnen, för 40 kronor mindre",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, inbyggd magnetmodul", highlight: true },
      /* Nillkins egen produktsida: "TPU + PC structure and four-corner
         airbags". Läst SPEC_CHECKED. */
      { label: "Material", value: "Polykarbonat och TPU", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Luftkuddar i alla fyra hörn",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "Ej angivet",
        highlight: true,
      },
      { label: "Pris", value: "199 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Knappar", value: "Täckta" },
      /* Nillkin publicerar bruttovikt med förpackning, 87,7 g, vilket inte är
         skalets vikt och därför inte skrivs hit. */
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "GTIN", value: "6902048307353" },
    ],
    verdict:
      "Nillkin Super Frosted Shield Pro kostar 199 kronor och är ett fullvuxet hybridskal med magnetring till priset av ett enkelt gummiskal.\n\nKonstruktionen är den som räknas. Hård polykarbonat på baksidan och mjuk TPU i ramen är kombinationen som fördelar kraften vid ett fall i stället för att leda den rakt in i telefonens ram, och Nillkin lägger luftkuddar i alla fyra hörn ovanpå det. Magnetmodulen är inbyggd, så magnetladdaren, bilhållaren och Samsungs egen powerbank fäster som de ska.\n\nDen frostade ytan är skalets signatur och dess svaghet. Den ger ett torrt, säkert grepp och döljer fingeravtryck helt, men den är också det material i jämförelsen som repas synligast av en nyckelknippa i samma ficka. Ett gummerat skal som Magnetic Onyx tar den sortens nötning bättre.\n\nFör 199 kronor finns det ingen bättre kombination av magnetring och riktig hybridkonstruktion på hyllan. Vill du lägga trettio kronor till får du vinnarens luftkuddar och en yta som håller sig snyggare längre.",
  },
  {
    id: "spigen-tough-armor-s26",
    brand: "Spigen",
    name: "Tough Armor MagFit",
    shortName: "Spigen Tough Armor",
    image: productImage(GALAXY_S26_SKAL.slug, "spigen-tough-armor-s26"),
    tagline: "Tre materiallager mot fall, och ett inbyggt stöd att luta telefonen mot.",
    scores: {
      magnet: 4.5,
      konstruktion: 5,
      prisvarde: 2.5,
    },
    price: 519,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/spigen-mobilskal-for-galaxy-s26-magsafe-tough-armor-svart",
    award: "premium",
    superlative: "För den som tappar telefonen ofta",
    pros: [
      "Ett skumlager mellan hårdplasten och telefonen, alltså tre materiallager där de flesta har två",
      "Inbyggt stöd i baksidan, så telefonen står upp på bordet utan att du håller i den",
      "Provat mot 1,2 meter i 26 fall enligt Spigen, alltså både en höjd och ett antal",
    ],
    cons: [
      "519 kronor, alltså mer än dubbla vinnarens pris för ett extra materiallager",
      "Skalet bygger på tjockleken, så en telefon Samsung gjorde smal känns märkbart större i fickan",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, inbyggd ring", highlight: true },
      /* Spigens egen konstruktionsbeskrivning för artikeln: PC, SPCC, MagFit-ring
         och TPU med ett lager Extreme Impact Foam. SPCC är stålplåt. Läst
         SPEC_CHECKED. */
      { label: "Material", value: "Polykarbonat, TPU, stålplåt och stötdämpande skum", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Flerlagerskydd med skumlager",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      /* Spigens egen produktsida för Tough Armor MagFit till S26-serien:
         "drop protection tested at 1.2 meters for 26 drops". Butiken skriver
         bara "militärklassat skydd". Läst SPEC_CHECKED. */
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "1,2 m, 26 fall",
        highlight: true,
      },
      { label: "Pris", value: "519 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Knappar", value: "Täckta" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "GTIN", value: "8800283318708" },
    ],
    verdict:
      "Spigen Tough Armor har mest konstruktion av alla tolv skalen, och den kostar 519 kronor.\n\nSkillnaden mot resten sitter på insidan. Utöver den hårda baksidan och den mjuka ramen ligger ett skumlager och en stålplåt, alltså fyra material där de flesta skal på hyllan har två. Skummets enda uppgift är att ta upp energi, samma princip som en cykelhjälm använder, och det är den enda konstruktionen i jämförelsen som är byggd för att offras. Spigen anger 1,2 meter och 26 fall, vilket är standardens egen höjd och standardens eget antal snarare än ett uppblåst tal.\n\nDet finns en funktion till som ingen annan har: ett stöd i baksidan som fäller ut, så telefonen står upp på bordet under ett videomöte eller en film. På ett skal i den här prisklassen är det skillnaden mellan ett tillbehör och en enda pryl att hålla reda på.\n\nSkalet är rätt köp för en tydlig person: den som redan har tappat telefonen mer än en gång och vet det om sig själv. För alla andra är räkningen svårare. Ringke Magnetic Fusion X kostar 229 kronor, har samma magnetring, samma förhöjda kanter och luftkuddar i hörnen, och saknar skumlagret och stödet. Är du osäker på om du behöver dem, behöver du dem förmodligen inte.",
  },
  {
    id: "dux-ducis-clin-mag-s26",
    brand: "Dux Ducis",
    name: "Clin Mag",
    shortName: "Dux Ducis Clin Mag",
    image: productImage(GALAXY_S26_SKAL.slug, "dux-ducis-clin-mag-s26"),
    tagline: "Klart skal med luftkuddar i hörnen och magnetringen på plats.",
    scores: {
      magnet: 4,
      konstruktion: 3.5,
      prisvarde: 5,
    },
    price: 159,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/dux-ducis-mobilskal-for-galaxy-s26-magsafe-clin-mag-transparent",
    award: "budget",
    superlative: "Minst pengar för mest magnet",
    pros: [
      "Billigaste skalet i hela jämförelsen, och det har ändå magnetring",
      "Luftkuddar i hörnen, alltså den konstruktion som tar upp fall snarare än bara täcker baksidan",
      "Förhöjda kanter runt både skärm och kamera trots priset",
    ],
    cons: [
      "Dux Ducis beskriver skalet mot repor och daglig nötning, inte mot fall från höjd",
      "Helt genomskinligt, så varje repa i plasten syns direkt mot telefonens svarta baksida",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, inbyggd ring", highlight: true },
      { label: "Material", value: "Polykarbonat och TPU", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Luftkuddar i hörnen",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "Ej angivet",
        highlight: true,
      },
      { label: "Pris", value: "159 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Knappar", value: "Ej angivet" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "GTIN", value: "6978943385048" },
    ],
    verdict:
      "Dux Ducis Clin Mag kostar 159 kronor och är det billigaste skalet i jämförelsen. Det har ändå en magnetring, vilket två dyrare skal här inte har.\n\nDet är den jämförelsen som spelar roll i den här prisklassen. Under tvåhundra kronor är regeln på hyllan att du får ett skal eller en magnet, inte båda. Det här skalet ger dig båda, plus luftkuddar i hörnen och förhöjda kanter runt skärm och kamera. Konstruktionen är alltså rätt prioriterad även om materialet är tunnare än hos vinnaren.\n\nDet du inte får är ett skal byggt för fall. Dux Ducis beskriver Clin Mag mot repor och daglig nötning, och konstruktionen stämmer med den beskrivningen: ett tunt klart skal med kuddar i hörnen skyddar telefonen i fickan och på bordet, inte mot betong. Den som vill ha det senare får titta 360 kronor högre upp i listan.\n\nTill 159 kronor är det ändå det mest kompletta lilla köpet på sidan. Köp det om du vill ha magnetfunktionen igång nu och inte vill lägga mer än ett par hundralappar på ett skal.",
  },
  {
    id: "spigen-nano-pop-s26",
    brand: "Spigen",
    name: "Nano Pop MagFit",
    shortName: "Spigen Nano Pop",
    image: productImage(GALAXY_S26_SKAL.slug, "spigen-nano-pop-s26"),
    tagline: "Luftkuddar i hörnen, magnetring och färg som syns.",
    scores: {
      magnet: 4.5,
      konstruktion: 4,
      prisvarde: 3.5,
    },
    price: 339,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/spigen-mobilskal-for-galaxy-s26-magsafe-nano-pop-svart",
    superlative: "För dig som vill synas i färg",
    pros: [
      "Luftkuddar i hörnen där telefonen är som mest utsatt vid fall",
      "Punktmönstrade sidor som ger grepp utan att skalet byggs på i tjocklek",
      "Finns i avokadogrön och blåbärsmarin, alltså färger resten av hyllan inte har",
    ],
    cons: [
      "110 kronor dyrare än vinnaren, med samma magnetring och samma sorts hörnkonstruktion",
      "Färgad baksida döljer telefonens egen finish helt",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, inbyggd ring", highlight: true },
      /* Spigens egen beskrivning av artikeln: "premium PC and TPU ... with
         dotted side pattern for extra grip". Läst SPEC_CHECKED. */
      { label: "Material", value: "Polykarbonat och TPU med punktmönstrade sidor", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Luftkuddar i hörnen",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "Militärklassat, utan siffra",
        highlight: true,
      },
      { label: "Pris", value: "339 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Knappar", value: "Täckta" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "GTIN", value: "8800337241877" },
    ],
    verdict:
      "Spigen Nano Pop kostar 339 kronor och är skalet för den som inte vill att telefonen ska se ut som alla andras.\n\nDet är ett riktigt argument och inte en eftergift. Nästan hela den här hyllan är svart eller genomskinlig, och Nano Pop finns i färgställningar som avokadogrön och blåbärsmarin. Skalet är dessutom byggt på rätt sätt under färgen: luftkuddar i hörnen, hård polykarbonat mot mjuk TPU, och punktmönstrade sidor som ger grepp utan att bygga på tjockleken. Magnetringen fäster mot laddare och hållare som den ska.\n\nSkyddet är alltså fullgott, ungefär i klass med Ringke Magnetic Onyx. Det du betalar extra för är utseendet, och det är 110 kronor över vinnaren.\n\nDet är en rimlig summa för något du håller i handen femtio gånger om dagen. Tycker du inte det finns samma skyddsnivå och samma magnetring i Ringke Magnetic Fusion X för 229 kronor, i genomskinligt, eller i Magnetic Onyx för 249 i matt svart.",
  },
  {
    id: "uniq-combat-s26",
    brand: "UNIQ",
    name: "Combat MagClick",
    shortName: "UNIQ Combat",
    image: productImage(GALAXY_S26_SKAL.slug, "uniq-combat-s26"),
    tagline: "Polymer som styvnar vid hårdare smäll, med tre material i ramen.",
    scores: {
      magnet: 4,
      konstruktion: 4.5,
      prisvarde: 3,
    },
    price: 399,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/uniq-mobilskal-for-galaxy-s26-magsafe-combat-svart",
    superlative: "För dig som bär telefonen i jobbet",
    pros: [
      "Provat mot fall från tre meter enligt UNIQ, den högsta höjden någon tillverkare anger här",
      "Tre material i konstruktionen, polykarbonat, TPU och TPE, i stället för ett eller två",
      "Specialutvecklad polymer som absorberar och fördelar stötenergi, alltså mer än ett vanligt TPU-skal",
    ],
    cons: [
      "Magneten kallas MagClick, ett eget namn som inte går att söka på och som inte säger vad den passar",
      "399 kronor för ett skydd som Ringke Magnetic Fusion X ligger nära för 229",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, inbyggda magneter", highlight: true },
      { label: "Material", value: "Polykarbonat, TPU och TPE", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Energifördelande polymer i tre lager",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      /* UNIQ:s egen produktsida för artikeln: "Drop-tested to withstand falls of
         up to 10 ft / 3 m". Utgåva och underlag anges inte. Läst SPEC_CHECKED. */
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "3 m, utan angivet underlag",
        highlight: true,
      },
      { label: "Pris", value: "399 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Knappar", value: "Täckta" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "GTIN", value: "8886463697498" },
    ],
    verdict:
      "UNIQ Combat kostar 399 kronor och har den mest intressanta konstruktionen i jämförelsen efter Spigen Tough Armor.\n\nSkalet bygger på en polymer som enligt tillverkaren styvnar ju hårdare smällen är, alltså ett material som beter sig olika vid en knuff mot dörrkarmen och vid ett fall mot betong. Runt det ligger tre material: polykarbonat för styvhet, TPU för dämpning och TPE i ramen. UNIQ anger tre meter, vilket är mer än dubbelt så högt som något annat skal här bär.\n\nDet gör det till ett rimligt köp för den som har telefonen med sig på en byggarbetsplats eller i en verkstad snarare än i en kontorsficka. Tre meter är ungefär från en stege, och det är den situation resten av hyllan inte är byggd för.\n\nMagneten är skalets svaga punkt, och inte för att den är svag. UNIQ kallar den MagClick, alltså ett eget varumärke, och beskriver den mot UNIQ:s egna laddare. Ringen fungerar mot magnetiska laddare i allmänhet, men en köpare som söker efter ett skal med magnet hittar aldrig ordet MagClick.\n\nÄr du hård mot dina prylar är det här skalet värt sina 170 kronor över vinnaren. Är du det inte betalar du för en marginal du aldrig kommer i närheten av.",
  },
  {
    id: "samsung-rugged-magnet-s26",
    brand: "Samsung",
    name: "Rugged Magnet Case",
    shortName: "Samsung Rugged Magnet",
    image: productImage(GALAXY_S26_SKAL.slug, "samsung-rugged-magnet-s26"),
    tagline: "Mönstrad greppyta och förstärkta kanter, provat mot 1,22 meter.",
    scores: {
      magnet: 4.5,
      konstruktion: 4.5,
      prisvarde: 1.5,
    },
    price: 779,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/samsung-mobilskal-for-galaxy-s26-magsafe-rugged-magnet-svart",
    superlative: "Bäst för dig som är ute i terrängen",
    pros: [
      "Provat mot 1,22 meter i fem omgångar om 26 fall mot stål, alltså det mest detaljerade fallprovet här",
      "Mönstrad yta med spår, det enda greppet i jämförelsen som är beskrivet som en konstruktion",
      "Magnetring från tillverkaren som byggde både telefonen och de tillbehör du sannolikt köper till den",
    ],
    cons: [
      "779 kronor, alltså 550 mer än Ringke Magnetic Fusion X som har samma magnetring och samma förhöjda kanter",
      "1,22 meter är ungefär bordshöjd, och UNIQ Combat anger tre meter för halva priset",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, inbyggd ring", highlight: true },
      { label: "Material", value: "Polykarbonat med mönstrad yta", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Förstärkta kanter, effektiv stötdämpning",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      /* Samsungs egen svenska produktsida för EF-RS942CBEGWW, alltså exakt den
         artikel butiken säljer: "Testad enligt MIL-STD-810H Transit
         Drop-standarder med totalt 5 omgångar av transitfall (26 fall per
         omgång) på en stålyta från en höjd av 1,22 meter." Butiken återger bara
         "1,2 meter enligt MIL-STD-810H". Läst SPEC_CHECKED. */
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "1,22 m, 5 × 26 fall mot stål, MIL-STD-810H",
        highlight: true,
      },
      { label: "Pris", value: "779 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Knappar", value: "Täckta" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "GTIN", value: "8806097935636" },
    ],
    verdict:
      "Samsung Rugged Magnet är det dyraste skalet i jämförelsen på 779 kronor, och det är byggt för en telefon som lever utomhus.\n\nYtan är mönstrad med spår som ger grepp med handskar eller våta händer, vilket är den enda greppfunktionen på hela sidan som är beskriven som något annat än en känsla. Kanterna är förstärkta runt både skärm och kamera, stötdämpningen är genomgående, och magnetringen kommer från företaget som byggde både telefonen och powerbanken du kommer att fästa på den.\n\nSamsung anger 1,22 meter, fem omgångar om 26 fall, mot stål. Det är standardens egen höjd och standardens eget antal, inte ett uppblåst tal, och det är den mest detaljerade uppgiften någon tillverkare på sidan lämnar. Det säger däremot inte att skalet skyddar bättre än de andra: UNIQ Combat anger tre meter och kostar 399 kronor.\n\nProblemet är räkningen. Ringke Magnetic Fusion X kostar 229 kronor, har samma magnetring, samma förhöjda kanter och luftkuddar i hörnen. Skillnaden är 550 kronor för en greppyta och ett tillverkarnamn. Det är värt pengarna om telefonen följer med ut i terrängen varje helg, och inte annars.",
  },
  {
    id: "spigen-thin-fit-s26",
    brand: "Spigen",
    name: "Thin Fit Mag",
    shortName: "Spigen Thin Fit",
    image: productImage(GALAXY_S26_SKAL.slug, "spigen-thin-fit-s26"),
    tagline: "Tunnaste magnetskalet, för den som inte vill känna att telefonen har skal.",
    scores: {
      magnet: 4,
      konstruktion: 3.5,
      prisvarde: 3,
    },
    price: 379,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/spigen-mobilskal-for-galaxy-s26-magsafe-thin-fit-svart",
    superlative: "Tunnast av skalen med magnet",
    pros: [
      "Tunnaste skalet i jämförelsen som ändå har magnetring inbyggd",
      "Luftkuddar i hörnen trots att hela poängen med skalet är att inte bygga på",
      "Exakta urtag för knappar, portar och kamera",
    ],
    cons: [
      "Ett tunt skal har mindre material att offra vid ett fall än ett flerlagersskal har",
      "379 kronor, alltså 150 mer än vinnaren för mindre skydd",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, inbyggd ring", highlight: true },
      /* Spigens egen beskrivning av artikeln: "Made from PC and TPU for
         durability", "Military-grade drop protection via Air Cushion
         Technology". Butiken nämner bara hårdplast. Läst SPEC_CHECKED. */
      { label: "Material", value: "Polykarbonat och TPU", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Luftkuddar i hörnen",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "Militärklassat, utan siffra",
        highlight: true,
      },
      { label: "Pris", value: "379 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Knappar", value: "Exakta urtag" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "GTIN", value: "8800337245295" },
    ],
    verdict:
      "Spigen Thin Fit kostar 379 kronor och är för den som köpte en tunn telefon och inte vill göra den tjock igen.\n\nGalaxy S26 är byggd smal, och Samsung angav uttryckligen tunnare och lättare design som skälet till att magneterna ströks. Ett fyra millimeter tjockt skal tar tillbaka precis det du betalade för. Thin Fit gör inte det, och den har ändå en magnetring inbyggd, vilket är den kombination som är svår att hitta.\n\nSpigen bygger dessutom in luftkuddar i hörnen och kombinerar hård polykarbonat med mjuk TPU, alltså samma två grepp som de tjockare skalen använder. Skillnaden är hur mycket material det finns av dem. Ett tunt skal har helt enkelt mindre att offra när telefonen slår i asfalt, och det är den avvägning du gör här.\n\nDet är också ett dyrt sätt att göra den avvägningen. 379 kronor är 150 över vinnaren, och du får mindre skydd för pengarna, eftersom tunnheten i sig är det du betalar för.\n\nVälj Thin Fit om formatet är hela poängen och du sällan tappar telefonen. Är fallskyddet viktigare får du både magnetring och en tjockare hybridkonstruktion för 229 kronor.",
  },
  {
    id: "samsung-clear-magnet-s26",
    brand: "Samsung",
    name: "Clear Magnet Case",
    shortName: "Samsung Clear Magnet",
    image: productImage(GALAXY_S26_SKAL.slug, "samsung-clear-magnet-s26"),
    tagline: "Klart skal med beläggning mot gulning och fingeravtryck.",
    scores: {
      magnet: 4,
      konstruktion: 2.5,
      prisvarde: 1.5,
    },
    price: 529,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/samsung-mobilskal-for-galaxy-s26-magsafe-clear-transparent",
    superlative: "Bäst klara skalet mot gulning",
    pros: [
      "Beläggning mot både gulning och fingeravtryck, så det klara skalet håller sig klart",
      "Magnetring från tillverkaren själv, byggd runt Samsungs egna magnettillbehör",
      "Slät kant och smal profil, alltså ett skal du knappt känner att telefonen har",
    ],
    cons: [
      "Samsung beskriver skalet mot repor och lättare stötar, inte mot fall, till 529 kronor",
      "Dux Ducis Clin Mag är också klart, har också magnetring och luftkuddar i hörnen, och kostar 370 kronor mindre",
      "Samsungs eget Rugged Magnet kostar 250 kronor mer och är byggt för fall, om det är skydd du är ute efter",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, inbyggd ring", highlight: true },
      /* Samsungs egen svenska produktsida för EF-CS942CTEGWW: "anti-gulnings-
         och anti-fingeravtrycksbeläggning". Läst SPEC_CHECKED. */
      { label: "Material", value: "Genomskinlig hårdplast med beläggning mot gulning", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ej angiven", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ej angiven",
        highlight: true,
      },
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "Ej angivet",
        highlight: true,
      },
      { label: "Pris", value: "529 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Knappar", value: "Ej angivet" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tjocklek", value: "Ej angiven" },
      { label: "GTIN", value: "8806097935650" },
    ],
    verdict:
      "Samsung Clear Magnet kostar 529 kronor och är det svåraste köpet i jämförelsen att försvara.\n\nDet gör två saker bra. Magnetringen kommer från tillverkaren som byggde telefonen och de tillbehör du sannolikt köper till den, och plasten har en beläggning mot både gulning och fingeravtryck. Klara skal är kategorins mest kortlivade produkt just för att de gulnar, så en beläggning mot det är en riktig egenskap och inte en formulering.\n\nSkyddet är en annan sak. Samsung beskriver skalet mot repor och lättare stötar, och konstruktionen stämmer med det: slät kant, smal profil, inga förstärkta hörn. Det är ett skal som håller telefonen fin, inte ett som håller den hel. Samsungs eget Rugged Magnet gör det andra jobbet för 250 kronor till.\n\nOch priset är svårt. Dux Ducis Clin Mag är också klart, har också magnetring, har dessutom luftkuddar i hörnen och kostar 159 kronor. Skillnaden är 370 kronor, en beläggning och ett varumärke på insidan.\n\nÄr du beredd att betala det för att det klara skalet ska se ut som nytt om ett år, är det här ett ärligt köp. Handlar det om skydd finns pengarna bättre placerade nästan var som helst annars på sidan.",
  },
  {
    id: "ringke-fusion-x-s26",
    brand: "Ringke",
    name: "Fusion X",
    shortName: "Ringke Fusion X",
    image: productImage(GALAXY_S26_SKAL.slug, "ringke-fusion-x-s26"),
    tagline: "Samma skal som vinnaren, 30 kronor billigare, utan magnetringen.",
    scores: {
      magnet: 0,
      konstruktion: 4.5,
      prisvarde: 3.5,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl: "https://www.themobilestore.se/ringke-mobilskal-for-galaxy-s26-fusion-x-svart",
    superlative: "Samma skal, utan magneten",
    pros: [
      "Samma konstruktion som vinnaren: luftkuddar i hörnen, hård baksida och upphöjda kanter",
      "Billigast av alla skal med den här skyddsnivån, och 3,0 millimeter tjockt för 30,4 gram",
    ],
    cons: [
      "Ingen magnetring, så varken Samsungs powerbank, magnetladdaren eller en bilhållare fäster",
      "Namnet skiljer sig från magnetversionen på ett enda ord, vilket är lätt att missa i kassan",
      "Att lägga till magneten i efterhand går inte, du får köpa ett nytt skal",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Nej", highlight: true },
      { label: "Material", value: "Polykarbonat och TPU", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Luftkuddar i hörnen",
        highlight: true,
      },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "Militärklassat, utan siffra",
        highlight: true,
      },
      { label: "Pris", value: "199 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja, utan magnetisk uppriktning" },
      { label: "Knappar", value: "Täckta" },
      /* Ringkes egen produktsida, SPEC_CHECKED. */
      { label: "Vikt", value: "30,4 g" },
      { label: "Tjocklek", value: "3,0 mm" },
      { label: "GTIN", value: "8800328815582" },
    ],
    verdict:
      "Ringke Fusion X kostar 199 kronor och är den här sidans viktigaste varning, inte dess sämsta skal.\n\nSkyddet är nämligen utmärkt. Luftkuddar i hörnen, upphöjda kanter runt både skärm och kamera, hård baksida och mjuk ram, 3,0 millimeter och 30,4 gram. Det är exakt samma konstruktion som vinnaren, för trettio kronor mindre, och på vilken annan telefon som helst hade det varit ett kap.\n\nPå den här telefonen är det en fälla. Galaxy S26 har inga inbyggda magneter, så allt magnetiskt du äger eller kommer att äga hänger på att skalet bär ringen. Det gör inte det här. Köper du det, och sedan Samsungs magnetiska powerbank eller deras magnetladdare till serien, upptäcker du att ingenting fäster och att lösningen är ett nytt skal.\n\nDet enda som skiljer i butikshyllan är ordet Magnetic i namnet och trettio kronor i priset. Väljer du det här ska det vara för att du laddar med sladd, aldrig använder en bilhållare och vet att du inte kommer att ändra dig.\n\nGör det medvetet, så är det ett bra skal. Gör det av misstag, och det blir det dyraste billiga skalet du köpt.",
  },
  {
    id: "spigen-liquid-crystal-s26",
    brand: "Spigen",
    name: "Liquid Crystal",
    shortName: "Spigen Liquid Crystal",
    image: productImage(GALAXY_S26_SKAL.slug, "spigen-liquid-crystal-s26"),
    tagline: "Tunt och klart, med luftfickor men utan magnetring.",
    scores: {
      magnet: 0,
      konstruktion: 3.5,
      prisvarde: 3,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/spigen-mobilskal-for-galaxy-s26-liquid-crystal-clear",
    superlative: "Bara för den som laddar med sladd",
    pros: [
      "Luftfickor i konstruktionen som absorberar stötar vid fall",
      "Förhöjda kanter runt både skärm och kamera lyfter glas och linser från bordsskivan",
      "Tunt och lätt, så telefonens format behålls",
    ],
    cons: [
      "Ingen magnetring, alltså ingen magnetladdare, ingen powerbank och ingen bilhållare",
      "Helt i TPU utan hård baksida, vilket ger mindre styvhet än hybridskalen i samma prisklass",
      "Nillkin Super Frosted Shield Pro kostar exakt lika mycket och har både magnetring och hård baksida",
    ],
    specs: [
      { label: "Magnetring", shortLabel: "Magnet", value: "Nej", highlight: true },
      { label: "Material", value: "TPU", highlight: true },
      {
        label: "Hörnkonstruktion",
        shortLabel: "Hörn",
        value: "Luftfickor",
        highlight: true,
      },
      /* Spigens egen produkttext för ACS10727, återgiven ordagrant av två
         oberoende återförsäljare: "Raised bezels lift screen and camera off
         flat surfaces". Butiken nämner ingen av kanterna. Läst SPEC_CHECKED. */
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      {
        label: "Förhöjd kant kamera",
        shortLabel: "Kant kamera",
        value: "Ja",
        highlight: true,
      },
      {
        label: "Falltest enligt tillverkaren",
        shortLabel: "Falltest",
        value: "Militärklassat, utan siffra",
        highlight: true,
      },
      { label: "Pris", value: "199 kr" },
      { label: "Passar modeller", value: "Galaxy S26" },
      { label: "Trådlös laddning genom skalet", value: "Ja, utan magnetisk uppriktning" },
      { label: "Knappar", value: "Täckta" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tjocklek", value: "Ej angiven" },
      /* Artikelnumret är ACS10727, alltså Spigens europeiska serie. Kontrollerat
         mot fyra oberoende återförsäljare att det är basmodellen S942 och inte
         S26+ eller Ultra. Spigens amerikanska butik för inte artikeln. */
      { label: "GTIN", value: "8800283318593" },
    ],
    verdict:
      "Spigen Liquid Crystal kostar 199 kronor och är ett hederligt tunt skal till en telefon där det inte räcker.\n\nDet gör vad ett klart mjukplastskal ska göra. Luftfickorna i konstruktionen absorberar stötar, kanterna är förhöjda runt både skärm och kamera så att glaset och linserna lyfts från bordsskivan, och skalet väger nästan ingenting. För den som laddar med sladd varje kväll, aldrig har haft en bilhållare och inte tänker skaffa en magnetplånbok är det ett fullt rimligt köp.\n\nFör alla andra är det fel skal, och skälet är telefonen snarare än skalet. Galaxy S26 saknar inbyggda magneter, och det här skalet lägger inte till några. Samsungs egen magnetiska powerbank fäster inte, magnetladdaren fäster inte, och en magnetisk bilhållare blir en klämma du får skruva fast.\n\nDärtill är mjukplast utan hård baksida den minst styva konstruktionen i jämförelsen. Ett hybridskal med polykarbonat på baksidan håller formen bättre över tid och fördelar kraften bredare vid ett fall.\n\nFör exakt samma 199 kronor får du Nillkin Super Frosted Shield Pro med både magnetring, hård baksida och luftkuddar i alla fyra hörn. Det finns nästan ingen läsare för vilken det här skalet är det rätta valet av de två.",
  },
];

/**
 * Övervägda men inte rankade.
 *
 * Fem av sex är bortvalda på att de inte tillför något som inte redan finns i
 * listan, och det sjätte är bortvalt på pris. Alla sex finns i handeln och
 * priserna är lästa samma dag som de rankade.
 */
export const GALAXY_S26_SKAL_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Samsung",
    name: "Carbon Magnet Case",
    reason:
      "Riktig aramidfiber och det dyraste skalet vi hittade till basmodellen, 899 kronor. Bortvalt för att det kostar fyra gånger vinnaren utan att lägga till vare sig en magnetlösning eller en konstruktion som de billigare skalen saknar. Samsungs eget Rugged Magnet är dessutom byggt för fall och kostar 120 kronor mindre.",
    merchantUrl: "https://www.themobilestore.se/samsung-mobilskal-for-galaxy-s26-magsafe-carbon-magnet-svart",
  },
  {
    brand: "Spigen",
    name: "AirSkin Aramid MagFit",
    reason:
      "Aramidfiber, magnetring och 679 kronor. Bortvalt av samma skäl som Carbon Magnet: materialet är på riktigt, men det som skiljer skalen i den här jämförelsen är magnet och konstruktion, och där ligger det jämnt med skal som kostar en tredjedel.",
    merchantUrl: "https://www.themobilestore.se/spigen-mobilskal-for-galaxy-s26-magsafe-airskin-aramid-svart",
  },
  {
    brand: "Samsung",
    name: "Silicone Magnet Case",
    reason:
      "Tillverkarens eget silikonskal med magnetring, 599 kronor. Bortvalt för att Ringkes silikonskal med magnetring kostar 249 och gör samma sak. Butikens attributfält anger dessutom Hårdplast för ett skal som heter Silicone, vilket vi inte kunde reda ut mot tillverkaren.",
    merchantUrl: "https://www.themobilestore.se/samsung-mobilskal-for-galaxy-s26-magsafe-silikon-magnet-svart",
  },
  {
    brand: "UNIQ",
    name: "Lyden MagClick",
    reason:
      "TPU och polykarbonat med magnetring, 349 kronor. Bortvalt för att UNIQ Combat ligger i listan med en mer utförligt beskriven konstruktion för 50 kronor mer, och två skal från samma tillverkare med samma magnetlösning skiljer inte läsaren åt.",
    merchantUrl: "https://www.themobilestore.se/uniq-mobilskal-for-galaxy-s26-magsafe-lyden-svart",
  },
  {
    brand: "Ringke",
    name: "Onyx",
    reason:
      "Matt skal utan magnetring, 199 kronor, alltså 50 kronor under Magnetic Onyx som ligger tvåa. Bortvalt för att paret Fusion X och Magnetic Fusion X redan visar exakt samma sak i listan, och två identiska par gör tabellen längre utan att göra den tydligare.",
    merchantUrl: "https://www.themobilestore.se/ringke-mobilskal-for-galaxy-s26-onyx-svart",
  },
  {
    brand: "Ringke",
    name: "Silicone MagSafe",
    reason:
      "Silikonskal med magnetring, 249 kronor. Bortvalt för att det ligger mellan Magnetic Onyx och Magnetic Fusion X i både pris och egenskaper utan att göra något av dem bättre, och silikon som material bärs redan av Samsungs silikonskal bland de övervägda.",
    merchantUrl: "https://www.themobilestore.se/ringke-mobilskal-for-galaxy-s26-magsafe-silikon-svart",
  },
];

export const GALAXY_S26_SKAL_FAQ = [
  {
    question: "Har Galaxy S26 magneter på baksidan som en iPhone?",
    answer:
      "Nej. Galaxy S26, S26+ och S26 Ultra saknar alla inbyggda magneter. Samsung uppgav i februari 2026 att det är en följd av arbetet med tunnare och lättare design, och att serien i stället stöder magnetiska skal. Samtidigt säljer Samsung både en magnetisk powerbank och en magnetladdare till serien. Följden är enkel och kostsam: de tillbehören fäster bara om skalet du köper har en magnetring. Tio av de tolv skalen i jämförelsen har det, två har det inte, och skillnaden syns knappt i produktnamnet.",
  },
  {
    question: "Vad är skillnaden mellan Ringke Fusion X och Ringke Magnetic Fusion X?",
    answer:
      "Magnetringen, och trettio kronor. Fusion X kostar 199 kronor och Magnetic Fusion X 229. I övrigt beskriver tillverkaren dem likadant: luftkuddar i hörnen, upphöjda kanter runt skärm och kamera, hård polykarbonatbaksida och mjuk TPU-ram. På en telefon utan inbyggda magneter är det ordet Magnetic som avgör om en magnetladdare, en bilhållare eller Samsungs egen powerbank fäster. Ringen går inte att lägga till i efterhand, så väljer du fel får du köpa ett nytt skal.",
  },
  {
    question: "Varför står det MagSafe på skal till en Samsung-telefon?",
    answer:
      "MagSafe är Apples namn på sin magnetlösning, men det har blivit det ord handeln använder för magnetringar oavsett telefon. Samtliga magnetskal i den här jämförelsen säljs som MagSafe-kompatibla, inklusive Samsungs egna. UNIQ kallar sin lösning MagClick i stället. För dig som köper betyder orden samma sak i praktiken: skalet har en magnetring som fäster mot magnetiska laddare och hållare. Problemet är att det inte finns någon term att söka på som fångar hela hyllan, och den som söker på magnet missar merparten.",
  },
  {
    question: "Betyder militärklassat att skalet är provat?",
    answer:
      "Det betyder mindre än det låter, och hur mycket beror på vem du frågar. Tre av tolv tillverkare sätter en siffra på sitt fallprov: Samsung anger 1,22 meter i fem omgångar om 26 fall mot stål enligt MIL-STD-810H, Spigen anger 1,2 meter och 26 fall för Tough Armor, och UNIQ anger tre meter för Combat utan att säga mot vad. Resten skriver militärklassat skydd eller Mil-Grade och stannar där. Talen går ändå inte att jämföra rakt av: standarden säger själv att provvillkoren får anpassas till det som provas, och att de 26 fallen får delas på upp till fem exemplar. Ett skal som klarar 26 fall ensamt och ett som klarar fem fall vardera på fem exemplar bär samma mening i marknadsföringen.",
  },
  {
    question: "Passar ett skal till Galaxy S26 även på S26+ eller S26 Ultra?",
    answer:
      "Nej. De tre modellerna har olika storlek och olika kameraplacering, och ett skal passar exakt en av dem. Alla skal på den här sidan är prissatta och kontrollerade som artiklar till basmodellen Galaxy S26, och varje rad bär artikelnumret vi matchat mot. Var också uppmärksam på att en del skal säljs som Galaxy S26 eller S26 Pro. Någon Galaxy S26 Pro finns inte: serien består av S26, S26+ och S26 Ultra, och Pro-namnet kommer från rykten före lanseringen. Vi har inte tagit med någon sådan artikel.",
  },
  {
    question: "Kan jag ladda trådlöst genom skalet utan magnetring?",
    answer:
      "Ja, trådlös laddning i sig fungerar genom alla skalen i jämförelsen. Skillnaden är att du måste lägga telefonen rätt för hand på laddplattan varje gång, eftersom ingenting drar den på plats. Det är också därför magnetringen spelar roll för laddhastigheten: de snabbare Qi2-laddarna bygger på magnetisk uppriktning, och utan ring får du varken den hjälpen eller ett tillbehör som sitter kvar när du lyfter telefonen. Laddar du alltid på en platta på nattduksbordet märks skillnaden minst.",
  },
];

const resolved = resolveProducts(GALAXY_S26_SKAL, SEEDS);

export const GALAXY_S26_SKAL_PRODUCTS = resolved;
