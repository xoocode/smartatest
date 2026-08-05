import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { IPHONE_SKAL } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /iphone-skal.
 *
 * Priser, artikelnummer, lagerstatus och specifikationer är lästa på
 * iPhonebutikens egna produktsidor 2026-08-05, och URL:erna nedan är de
 * kanoniska efter omdirigering.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans än. Se lib/links.ts.
 *
 * ## Avgränsningen
 *
 * Sidan rankar **bara skyddsskal**, efter användarbeslut 2026-08-05.
 * Plånboksfodral, korthållare, skärmskydd och kameralinsskydd förklaras i
 * köpguiden och får egna systersidor. Samma lösning som /usb-c-laddare, vars
 * avgränsning sköt kablar och powerbanker vidare.
 *
 * ## En rad per skalmodell, iPhone 17 Pro som referenspris
 *
 * Ett skal passar exakt en modellstorlek. iPhone 17 och 17 Pro delar
 * skärmstorlek men inte skal, eftersom kameraplatån skiljer. Varje rad är
 * därför en **skalmodell**, prissatt på 17 Pro-varianten, precis som
 * /usb-c-kabel prissätter varje kabelmodell vid 2 meter.
 *
 * ⚠️ `Passar modeller` anger den artikel vi faktiskt prissatt och ingenting
 * mer. De flesta av modellerna säljs även till 17, 17 Pro Max och Air, men det
 * är inte kontrollerat artikel för artikel och får därför inte stå som en
 * uppgift. Att låna en systervariants passform är exakt den fälla som gav ABUS
 * 787 mot 787 Smart-BT på /nyckelskap och Meross MSG100 mot MSG100HK på
 * /smart-garageportsoppnare.
 *
 * ## ⚠️ Butiken anger passform mot iPhone 18 Pro
 *
 * Specifikationsraden Kompatibilitet anger *iPhone 18 Pro* för bland andra
 * OtterBox React, OtterBox Symmetry, UAG Plyo, UAG Monarch Pro Kevlar och
 * dbramante1928 Roskilde, och flera produkter bär den i själva produktnamnet.
 * Apple har inte presenterat någon iPhone 18 och publicerar inga mått.
 *
 * Uppgiften står i köpguiden och **inte** i produktdatan, eftersom vi inte vet
 * om skalen kommer att passa. Vi påstår varken att de gör det eller att de inte
 * gör det. Samma disciplin som "Philips säger varken ja eller nej" på
 * /smart-hem-hubb.
 *
 * ## ⚠️ Inga GTIN
 *
 * Butiken publicerar interna artikelnummer (V30843, M243, O270) men inga
 * EAN-koder. `GTIN` är därför `Ej angiven` för samtliga tolv och renderas som
 * ett streck. Det är produktens uppgift som saknas, inte vår.
 *
 * ## ⚠️ Lagerstatus är inget urvalsskäl
 *
 * X2O Mag Frosted har 2 till 6 veckors leveranstid och ligger kvar i
 * rankningen. Regeln avgjordes på /luftfuktare, där Wilfa Lotus togs in sedan
 * lagerstatus slutade vara ett skäl, och på /avfuktare. En utgången produkt
 * stryks, en slutsåld gör det inte.
 *
 * ## ⚠️ Två markerade rader ligger under 50 procent, och det är avsiktligt
 *
 * `pnpm check:tackning` rapporterar `Angiven fallhöjd` på 4 av 12 och
 * `Angiven militärstandard` på 5 av 12. Kontrollen frågar om raden är fel vald
 * eller om researchen behöver ett gap-pass till. Svaret är varken.
 *
 * Gap-passet är gjort med en annan modalitet än butikssidan, alltså mot
 * tillverkarens egen sida, och det kommer tillbaka tomt: Spigen publicerar inte
 * heller någon fallhöjd eller utgåva för Rugged Armor, bara ordet militärklassad.
 * Uppgiften finns alltså inte publicerad någonstans, till skillnad från
 * adaptertabellerna på /smart-termostat som fanns men låg i ett hjälpcenter.
 *
 * Att fylla cellen åt den som tiger vore att radera det raderna mäter. Samma
 * konstruktion som `Angiven noggrannhet` på /hygrometer, som ligger på 3 av 7
 * och är live av exakt samma skäl.
 *
 * ## Betygen
 *
 * Kriteriepoängen är redaktionell bedömning ur publicerade specifikationer och
 * produktbilder, inte mätningar. Ingen har provat skyddsskal, och vi har inte
 * tappat en enda telefon. Konstruktionen väger 40 efter användarbeslut, just
 * för att sidan inte ska kora den tillverkare som skriver mest.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "spigen-rugged-armor-magfit-17-pro",
    brand: "Spigen",
    name: "Rugged Armor MagFit",
    shortName: "Spigen Rugged Armor",
    image: productImage(IPHONE_SKAL.slug, "spigen-rugged-armor-magfit-17-pro"),
    tagline: "Stötdämpande skum i hörnen och ett lock över hela kamerablocket.",
    scores: {
      konstruktion: 4.5,
      redovisning: 2,
      prisvarde: 4,
      magnet: 4.5,
    },
    price: 349,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/spigen-rugged-armor-magfit-iphone-17-pro-57225.html",
    award: "winner",
    superlative: "Bäst för den som tappar telefonen ofta",
    pros: [
      "Stötdämpande skum utöver polykarbonat och TPU, alltså tre lager där hörnen tar smällen",
      "Kamerablocket är helt inbyggt, så linserna tar inte i när telefonen ligger på ett bord",
      "Ett extra TPU-lager över kameraknappen, som annars är den dyraste knappen på telefonen",
    ],
    cons: [
      "Hur högt skalet klarar är okänt, så köp det för konstruktionen och inte för ett tal",
      "80 kronor dyrare än Ultra Hybrid MagFit, som har samma magnet och nästan samma kant",
    ],
    specs: [
      { label: "Material", value: "Polykarbonat, TPU och stötdämpande skum", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Air Cushion, förstärkta hörn", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "Militärklassad, utan utgåva", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "Ej angiven", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, förstärkt", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ja, kamerablocket helt täckt" },
      { label: "Knappar", value: "Täckta, plus extra lager över kameraknappen" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Spigen Rugged Armor MagFit är skalet med mest konstruktion per krona i jämförelsen, och det kostar 349 kronor. Tre material ligger på varandra: en styv polykarbonatbaksida, en mjuk TPU-ram och stötdämpande skum där hörnen möter marken.\n\n**Kamerablocket är helt inbyggt i stället för omgärdat av en ring**, vilket betyder att linserna inte tar i bordet när du lägger ner telefonen med skärmen uppåt. Det är den vanligaste repan på en iPhone 17 Pro och den dyraste att laga. Hörnen är dessutom det enda stället där skalet är tjockare än på baksidan, och det är där en telefon som faller faktiskt landar. Ovanpå kameraknappen ligger ett tunt extra TPU-lager, så knappen fungerar men träffar inte asfalten först.\n\nDet du inte får veta är hur högt skalet klarar. Ingen höjd står utskriven, bara att skyddet är militärklassat, och det säger mindre än det låter. Vill du kunna kontrollera talet innan du betalar ska du ta X2O Mag Frosted för 259 kronor i stället.\n\nKöp det här om du vill sluta tänka på saken. Magnetringen sitter i, laddaren fastnar, och skalet gör det ett skal ska göra utan att telefonen blir dubbelt så tjock.",
  },
  {
    id: "nomad-rugged-case-17-pro",
    brand: "Nomad",
    name: "Rugged Case",
    shortName: "Nomad Rugged",
    image: productImage(IPHONE_SKAL.slug, "nomad-rugged-case-17-pro"),
    tagline: "Qi2 utskrivet, aluminiumknappar och hörn som lyfter kameran från bordet.",
    scores: {
      konstruktion: 4.5,
      redovisning: 2.5,
      prisvarde: 3,
      magnet: 5,
    },
    price: 449,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/nomad-rugged-case-iphone-17-pro-57986.html",
    award: "editor",
    superlative: "Bäst för den som laddar trådlöst",
    pros: [
      "Qi2 står utskrivet, vilket ingen annan här gör, så laddhastigheten är inte en gissning",
      "TPU-buffertar i hörnen på en styv polykarbonatram, alltså mjukt där det behövs och styvt där det inte gör det",
      "Knapparna är i anodiserad aluminium och kameraknappen i glas, så känslan i telefonen är kvar",
    ],
    cons: [
      "Garantin är 1 år mot 2 hos Spigen, OtterBox och UAG",
      "100 kronor dyrare än vinnaren utan att skydda mer",
    ],
    specs: [
      { label: "Material", value: "Polykarbonatram, TPU-hörn och PET-baksida", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Förstärkta TPU-buffertar", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "Ej angiven", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "4,5 m", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja, neodym", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ja, hörnbuffertarna lyfter kameran från underlaget" },
      { label: "Knappar", value: "Anodiserad aluminium, kameraknapp i glas" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja, Qi2 utskrivet" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "1 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Nomad Rugged Case kostar 449 kronor och är det enda skalet här där Qi2 står utskrivet. Konstruktionen är en styv polykarbonatram med mjuka TPU-buffertar i hörnen och en matt PET-baksida.\n\n**Qi2 betyder 25 watt i stället för 15 på en iPhone 17**, alltså ungefär halva laddtiden från tomt till hälften, och det är skillnaden mellan att ladda över natten och att ladda medan du duschar. Hörnbuffertarna sticker dessutom ut en aning mer än resten av skalet, vilket lyfter kameran från bordet när telefonen ligger platt. Knapparna är i anodiserad aluminium och kameraknappen i glas, så telefonen känns som en telefon och inte som ett gummiblock.\n\nGarantin är 1 år, medan Spigen, OtterBox och UAG ger 2 på skal som kostar mindre. På en produkt som ska sitta i två år är det en verklig skillnad.\n\nLaddar du med sladd finns ingen anledning att betala 100 kronor mer än vinnaren. Laddar du trådlöst varje natt är det här skalet som gör det snabbt.",
  },
  {
    id: "x2o-mag-frosted-17-pro",
    brand: "X2O",
    name: "Mag Frosted",
    shortName: "X2O Mag Frosted",
    image: productImage(IPHONE_SKAL.slug, "x2o-mag-frosted-17-pro"),
    tagline: "Frostad yta som inte tar fingeravtryck, och en fallhöjd du kan slå upp.",
    scores: {
      konstruktion: 3.5,
      redovisning: 4,
      prisvarde: 4,
      magnet: 4,
    },
    price: 259,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/x2o-mag-frosted-iphone-17-pro-59050.html",
    superlative: "Bäst för den som läser det finstilta",
    pros: [
      "3 meter angivet mot en namngiven metod med nummer, vilket går att slå upp och läsa själv",
      "Förstärkt kamerating och förhöjd kant runt hela skalet",
      "Frostad yta som varken blir blank av fingrar eller hal i handen",
    ],
    cons: [
      "2 till 6 veckors leveranstid, så den passar inte den som knäckt skärmen i dag",
      "Varken hörnkonstruktion eller stötdämpande skikt anges, till skillnad från vinnaren",
    ],
    specs: [
      { label: "Material", value: "Polykarbonat och TPU", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Ej angiven", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja, runt hela skalet", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "MIL-STD-810G 516.7", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "3 m", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ja, förstärkt kamerating" },
      { label: "Knappar", value: "Täckta" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "X2O Mag Frosted kostar 259 kronor och anger 3 meters fallskydd mot metod 516.7. Det är ett hybridskal i polykarbonat och TPU med magnetring och frostad yta.\n\n**Metodnumret är det som skiljer det här skalet från resten av hyllan.** Ett tal med en metod bakom sig går att slå upp och läsa, och du kan själv se vad de 26 fallen innebär, från vilken höjd och mot vilket underlag. Ett skal som bara säger militärklassat lämnar dig utan den möjligheten. Konstruktionen i övrigt är gedigen för priset: förhöjd kant runt hela skalet och en förstärkt ring runt kameran, alltså de två ställen där glas möter bord. Den frostade ytan gör dessutom att skalet varken blir blankt av fingrar eller halt i handen, vilket är den vanligaste orsaken till att en telefon glider ur handen från början.\n\nLeveranstiden är 2 till 6 veckor. Har du precis knäckt skärmen och behöver ett skal i veckan är det ett avgörande argument emot.\n\nKan du vänta får du kategorins mest kontrollerbara skydd för 90 kronor mindre än vinnaren. Behöver du något i morgon tar du OtterBox React för 229.",
  },
  {
    id: "spigen-ultra-hybrid-magfit-17-pro",
    brand: "Spigen",
    name: "Ultra Hybrid MagFit",
    shortName: "Spigen UH MagFit",
    image: productImage(IPHONE_SKAL.slug, "spigen-ultra-hybrid-magfit-17-pro"),
    tagline: "Genomskinlig baksida som står emot gulnande, med magnetring i.",
    scores: {
      konstruktion: 4,
      redovisning: 2,
      prisvarde: 4.5,
      magnet: 4.5,
    },
    price: 269,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/spigen-ultra-hybrid-magfit-iphone-17-pro-57675.html",
    superlative: "Bäst för den som vill se telefonens färg",
    pros: [
      "Förhöjd kant vid både skärm och kamera, vilket flera dyrare skal här saknar",
      "Air Cushion i hörnen trots att skalet är tunt nog att telefonens färg syns",
      "Magnetring för 269 kronor, alltså 180 kronor mindre än närmaste genomskinliga skal med magnet",
    ],
    cons: [
      "Genomskinlig plast gulnar med tiden, och hur länge den håller emot står inte",
      "Ingen fallhöjd angiven, så skyddet får bedömas på konstruktionen",
    ],
    specs: [
      { label: "Material", value: "TPU-ram och polykarbonatbaksida", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Air Cushion", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "Militärklassad, utan utgåva", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "Ej angiven", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ja" },
      { label: "Knappar", value: "Täckta" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Spigen Ultra Hybrid MagFit kostar 269 kronor och är det billigaste genomskinliga skalet här med magnetring. Baksidan är styv polykarbonat, ramen mjuk TPU.\n\n**Att kanten är förhöjd vid både skärmen och kameran är ovanligare än det borde vara**, och det är de två ytor som kostar mest att byta. Air Cushion i hörnen betyder att materialet är tjockare just där, trots att skalet i övrigt är tunt nog att du ser vilken färg telefonen har. För den som köpt en iPhone 17 Pro i Cosmic Orange och inte vill dölja den är det hela poängen.\n\nGenomskinlig plast gulnar. Spigen skriver att skalet står emot det, men inte hur länge, och ett gulnat skal är det vanligaste skälet till att ett genomskinligt skal byts ut efter ett år. UAG Plyo anger uttryckligen skydd mot gulnande om det bekymrar dig.\n\nVill du behålla telefonens utseende är det här skalet att köpa. Vill du ha maximalt skydd lägger du 80 kronor till på Rugged Armor och släpper färgen.",
  },
  {
    id: "otterbox-react-magsafe-17-pro",
    brand: "OtterBox",
    name: "React med MagSafe",
    shortName: "OtterBox React",
    image: productImage(IPHONE_SKAL.slug, "otterbox-react-magsafe-17-pro"),
    tagline: "OtterBox med magneter och namngiven metod för 229 kronor.",
    scores: {
      konstruktion: 3.5,
      redovisning: 3,
      prisvarde: 4.5,
      magnet: 4,
    },
    price: 229,
    oldPrice: 299,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/otterbox-react-case-with-magsafe-iphone-17-pro-57282.html",
    award: "budget",
    superlative: "Bäst under 250 kronor",
    pros: [
      "Billigast här med både magnetring och en standard som är angiven med metodnummer",
      "Förhöjd kant vid både skärm och kamera",
      "Ett enda stycke material, så det finns ingen skarv som glappar efter ett halvår",
    ],
    cons: [
      "Tunt och utan förstärkta hörn, alltså mindre marginal än vinnaren när telefonen landar på ett hörn",
      "Ingen fallhöjd angiven, bara en standard",
    ],
    specs: [
      { label: "Material", value: "Enstycke, mjuka kanter", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Ej angiven", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "MIL-STD-810G 516.6", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "Ej angiven", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ja" },
      { label: "Knappar", value: "Täckta, fri åtkomst till kameraknappen" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "OtterBox React med MagSafe kostar 229 kronor, nedsatt från 299, och är billigast här av de skal som både har magnetring och anger en standard med metodnummer. Det är gjort i ett enda stycke med mjuka kanter.\n\n**Enstyckskonstruktionen är dess bästa egenskap på lång sikt.** Ett skal i två delar glappar där delarna möts när plasten åldrats ett halvår, och det är då smuts börjar samlas mot telefonens ram. Här finns ingen skarv. Kanten är dessutom förhöjd vid både skärmen och kameran, alltså samma grundskydd som skal för dubbla priset ger.\n\nDet är tunt och saknar förstärkta hörn. En telefon som faller landar oftast på ett hörn, och där har det här skalet mindre marginal än vinnaren för 120 kronor mer.\n\nSka du lägga under 250 kronor är det här skalet att ta. Tappar du telefonen på betong regelbundet är det för lite skal.",
  },
  {
    id: "otterbox-symmetry-clear-magsafe-17-pro",
    brand: "OtterBox",
    name: "Symmetry Clear MagSafe",
    shortName: "OtterBox Symmetry",
    image: productImage(IPHONE_SKAL.slug, "otterbox-symmetry-clear-magsafe-17-pro"),
    tagline: "Genomskinligt skal med förhöjda kanter och tre gånger standardens fall.",
    scores: {
      konstruktion: 4,
      redovisning: 3.5,
      prisvarde: 3,
      magnet: 4,
    },
    price: 449,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/otterbox-symmetry-clear-magsafe-iphone-17-pro-57280.html",
    superlative: "Bäst genomskinligt med fästpunkter",
    pros: [
      "Både utgåva, metodnummer och en multipel angivna, vilket är mest av alla här",
      "Förhöjda kanter vid både kamera och skärm på ett skal som ändå är genomskinligt",
      "Fästpunkter för band och remmar, så telefonen kan hänga i stället för att tappas",
    ],
    cons: [
      "180 kronor dyrare än Spigen Ultra Hybrid MagFit, som har samma sorts skydd",
      "Multipeln bygger på ett prov vars underlag inte anges, så talet går inte att jämföra med andras",
    ],
    specs: [
      { label: "Material", value: "TPE och polykarbonat", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Ej angiven", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "MIL-STD-810G 516.6, 3X", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "Ej angiven", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ja" },
      { label: "Knappar", value: "Täckta, inbyggd kameraknapp" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "OtterBox Symmetry Clear MagSafe kostar 449 kronor och är det genomskinliga skalet med mest utskrivet om sitt skydd. Materialet är TPE mot en polykarbonatbaksida.\n\n**Fästpunkterna för band är det praktiska argumentet.** En telefon som hänger i en rem runt handleden tappas inte alls, och det skyddar bättre än något material gör. Kanterna är förhöjda vid både skärmen och kameran, och skalet är ändå tunt nog att telefonens färg syns igenom. Ytan är dessutom behandlad för att hålla sig klar längre, vilket är den egenskap ett genomskinligt skal står och faller med.\n\nPriset är problemet. Spigen Ultra Hybrid MagFit kostar 269 kronor och ger förhöjd kant på samma två ställen, magnetring och Air Cushion i hörnen, alltså mer konstruktion för 180 kronor mindre.\n\nVill du ha remfästena är de värda mellanskillnaden. Vill du bara ha ett genomskinligt skal med magnet tar du Spigen.",
  },
  {
    id: "uag-plyo-magsafe-17-pro",
    brand: "UAG",
    name: "Plyo med MagSafe",
    shortName: "UAG Plyo",
    image: productImage(IPHONE_SKAL.slug, "uag-plyo-magsafe-17-pro"),
    tagline: "Genomskinligt skal byggt för att inte gulna, med förstärkta hörn.",
    scores: {
      konstruktion: 4.5,
      redovisning: 2.5,
      prisvarde: 3,
      magnet: 4,
    },
    price: 499,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/uag-plyo-case-with-magsafe-iphone-17-pro-57374.html",
    superlative: "Bäst genomskinligt som ska hålla länge",
    pros: [
      "Uttalat skydd mot gulnande, vilket är det som annars gör genomskinliga skal förbrukade",
      "Förstärkta hörn på ett skal som ändå släpper igenom telefonens färg",
      "Fästpunkter för handledsrem ingår i konstruktionen",
    ],
    cons: [
      "4,8 meter är angivet utan att någon standard namnges, så talet går inte att jämföra",
      "230 kronor dyrare än Spigen Ultra Hybrid MagFit för samma sorts genomskinliga skydd",
    ],
    specs: [
      { label: "Material", value: "TPU-ram och hård polykarbonatbaksida", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Förstärkta hörn", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "Ej angiven", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "4,8 m", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ej angiven" },
      { label: "Knappar", value: "Täckta, upphöjda" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "UAG Plyo med MagSafe kostar 499 kronor och är det genomskinliga skalet som är byggt för att åldras. TPU-ram, hård polykarbonatbaksida och förstärkta hörn.\n\n**Skyddet mot gulnande är skälet att välja det.** Ett genomskinligt skal byts sällan ut för att det gått sönder, utan för att baksidan blivit gul och telefonen ser skabbig ut. Ett skal som håller sig klart i två år kostar därför mindre per år än ett billigare som byts varje höst. Hörnen är förstärkta, vilket flera genomskinliga skal saknar helt, och fästpunkter för en handledsrem sitter inbyggda.\n\nDe 4,8 meterna står utan att någon standard namnges. Talet går därför inte att ställa mot något annat skal, och du får ta det på förtroende.\n\nSka det genomskinliga skalet sitta kvar om två år är det här värt sina 499 kronor. Byter du skal varje år tar du Spigen Ultra Hybrid MagFit och sparar 230.",
  },
  {
    id: "uag-monarch-pro-kevlar-magsafe-17-pro",
    brand: "UAG",
    name: "Monarch Pro Kevlar med MagSafe",
    shortName: "UAG Monarch Pro",
    image: productImage(IPHONE_SKAL.slug, "uag-monarch-pro-kevlar-magsafe-17-pro"),
    tagline: "Fem lager med kevlar ytterst, byggt för att tåla en byggarbetsplats.",
    scores: {
      konstruktion: 5,
      redovisning: 2.5,
      prisvarde: 1.5,
      magnet: 4.5,
    },
    price: 1099,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/uag-monarch-pro-kevlar-case-with-magsafe-iphone-17-pro-57433.html",
    award: "premium",
    superlative: "Bäst för bygget och skogen",
    pros: [
      "Fem lager där varje lager har en uppgift, vilket ingen annan här kommer i närheten av",
      "Kevlarförstärkt ram och gummikant, alltså både styvhet och stötdämpning i samma skal",
      "Fästpunkter för nyckelband, så telefonen kan sitta fast i kläderna",
    ],
    cons: [
      "1 099 kronor, alltså mer än tre gånger vinnaren, för skydd de flesta aldrig behöver",
      "Skalet är kraftigt och gör telefonen märkbart större i fickan",
    ],
    specs: [
      { label: "Material", value: "Kevlar, polykarbonat och gummikant, fem lager", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Stötupptagande kärna i fem lager", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ja", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "Ej angiven", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "7,6 m", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ja" },
      { label: "Knappar", value: "Täckta, förhöjda med tydligt tryck" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "UAG Monarch Pro Kevlar kostar 1 099 kronor och har mer konstruktion än något annat skal här. Fem lager: kevlarförstärkt ram, stötupptagande kärna, polykarbonatplatta och gummikant.\n\n**Lagren gör olika saker, och det är därför de är fem.** Gummikanten tar den första stöten, kärnan sprider kraften vidare, och den styva plattan hindrar att telefonen böjs. Ett tjockt skal i ett enda material gör bara det första av de tre. Fästpunkterna för nyckelband betyder dessutom att telefonen kan sitta fast i overallen i stället för att ligga löst i ett bröstfickfack, vilket är det som faktiskt räddar telefoner på en byggarbetsplats.\n\nDe 7,6 meterna står utan standard, och det är sex gånger den höjd militärstandarden föreskriver. Ett tal utan metod bakom sig går inte att ställa mot något annat skal här.\n\nArbetar du med telefonen i handen utomhus är skalet värt pengarna. Bär du den i en jacka mellan kontoret och tunnelbanan lägger du 349 kronor på Rugged Armor och 750 på något annat.",
  },
  {
    id: "trolsk-stottaligt-kameraskydd-stativ-17-pro",
    brand: "Trolsk",
    name: "Mobilskal Stöttåligt med Kameraskydd och Stativ",
    shortName: "Trolsk Stöttåligt",
    image: productImage(IPHONE_SKAL.slug, "trolsk-stottaligt-kameraskydd-stativ-17-pro"),
    tagline: "Skjutbart lock över kameran och ett stativ som fälls ut ur baksidan.",
    scores: {
      konstruktion: 3.5,
      redovisning: 1,
      prisvarde: 3.5,
      magnet: 2,
    },
    price: 229,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-mobilskal-stottaligt-med-kameraskydd-och-stativ-iphone-17-pro-57022.html",
    superlative: "Bäst med stativ inbyggt",
    pros: [
      "Skjutbart lock som täcker linserna helt, alltså det enda fysiska kameraskyddet här",
      "Inbyggt stativ som roterar, så telefonen står både stående och liggande",
      "TPU mot polykarbonat, alltså mjukt ytterst och styvt innerst",
    ],
    cons: [
      "Metallplattan sitter fast på en bilhållare men laddar inte, så en MagSafe-laddare faller av",
      "Hur hårt skalet tål att falla är okänt, så köp det för stativet och inte för fallskyddet",
    ],
    specs: [
      { label: "Material", value: "TPU och polykarbonat", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Ej angiven", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ej angiven", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "Ej angiven", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "Ej angiven", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Nej, metallplatta för bilhållare", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ja, skjutbart lock över linserna" },
      { label: "Knappar", value: "Täckta" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "1 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Trolsk Mobilskal Stöttåligt kostar 229 kronor och är det enda skalet här med ett fysiskt lock över kameran. Konstruktionen är TPU mot polykarbonat, med ett utfällbart stativ i baksidan.\n\n**Locket skjuts över linserna och stänger dem helt.** En kameralins repas av sand i en ficka långt oftare än den spricker av ett fall, och det är den enda skada ett förhöjt kameraramverk inte hindrar. Stativet roterar dessutom, så telefonen står både stående och liggande utan att lutas mot en kaffekopp. Ser du en timme film om dagen i mobilen är det en funktion du använder varje dag, till skillnad från fallskyddet du använder en gång vartannat år.\n\nMetallplattan i baksidan är till för en magnetisk bilhållare, inte för MagSafe. En laddare eller plånbok som ska sitta fast med magnet faller av.\n\nLaddar du trådlöst ska du inte köpa det här skalet. Ser du film i sängen varje kväll är stativet värt mer än de 229 kronorna.",
  },
  {
    id: "spigen-ultra-hybrid-17-pro",
    brand: "Spigen",
    name: "Ultra Hybrid",
    shortName: "Spigen Ultra Hybrid",
    image: productImage(IPHONE_SKAL.slug, "spigen-ultra-hybrid-17-pro"),
    tagline: "Air Cushion i hörnen för 199 kronor, om du laddar med sladd.",
    scores: {
      konstruktion: 3.5,
      redovisning: 1.5,
      prisvarde: 3.5,
      magnet: 1,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/spigen-ultra-hybrid-iphone-17-pro-57213.html",
    superlative: "Bäst för den som laddar med sladd",
    pros: [
      "Air Cushion i hörnen och hybridkonstruktion för 199 kronor",
      "Förhöjd kant runt kameran, så linserna klarar att telefonen läggs ner",
      "Genomskinlig baksida med svart ram, alltså telefonens färg kvar utan att skalet syns",
    ],
    cons: [
      "Ingen magnetring, så MagSafe-laddare, plånbok och bilhållare slutar sitta fast",
      "Heter nästan samma sak som MagFit-versionen och ser likadan ut, vilket kostar 70 kronor att rätta till",
    ],
    specs: [
      { label: "Material", value: "Polykarbonatbaksida och TPU-ram", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Air Cushion", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ej angiven", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "Ej angiven", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "Ej angiven", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Nej", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ja" },
      { label: "Knappar", value: "Täckta" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja, utan magnetfäste" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Spigen Ultra Hybrid kostar 199 kronor och ger hybridkonstruktion med Air Cushion i hörnen till kategorins lägsta pris för den sortens skal. Styv polykarbonatbaksida, mjuk TPU-ram.\n\n**Air Cushion betyder att materialet är tjockare i hörnen än på baksidan**, vilket är där en telefon som faller träffar först. Kanten runt kameran är förhöjd, så linserna tar inte i bordet. Baksidan är genomskinlig med svart ram, alltså telefonens egen färg kvar utan att skalet gör sig påmint.\n\nDet finns ingen magnetring. Har du en MagSafe-laddare på nattduksbordet, en magnetplånbok eller en bilhållare kommer ingen av dem att sitta fast, och det är inget som går att lägga till i efterhand.\n\nLaddar du med sladd är det här jämförelsens bästa köp under 200 kronor. Laddar du magnetiskt lägger du 70 kronor till på MagFit-versionen, som annars är samma skal.",
  },
  {
    id: "dbramante1928-roskilde-magsafe-17-pro",
    brand: "dbramante1928",
    name: "Roskilde MagSafe",
    shortName: "dbramante Roskilde",
    image: productImage(IPHONE_SKAL.slug, "dbramante1928-roskilde-magsafe-17-pro"),
    tagline: "Fullnarvigt läder som mörknar med åren, med magnet under.",
    scores: {
      konstruktion: 2,
      redovisning: 1,
      prisvarde: 2,
      magnet: 4,
    },
    price: 399,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/dbramante1928-roskilde-magsafe-iphone-17-pro-57913.html",
    superlative: "Bäst i läder",
    pros: [
      "Fullnarvigt läder som mörknar och blir personligt i stället för att se slitet ut",
      "Magnetring under lädret, så laddare och plånbok sitter fast",
      "Tunt, så telefonen behåller sin form i fickan",
    ],
    cons: [
      "Varken förstärkta hörn eller förhöjda kanter, alltså minst fallskydd av alla skal här med magnet",
      "399 kronor för ett skal som skyddar mot repor snarare än mot fall",
    ],
    specs: [
      { label: "Material", value: "Fullnarvigt läder", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Ej angiven", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ej angiven", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "Ej angiven", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "Ej angiven", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Ja", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ej angiven" },
      { label: "Knappar", value: "Ej angivet" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "1 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "dbramante1928 Roskilde kostar 399 kronor och är jämförelsens läderskal, med magnetring under skinnet. Materialet är fullnarvigt läder, alltså den kvalitet som utvecklar patina.\n\n**Fullnarvigt läder blir vackrare av att användas.** Det mörknar där handen håller och får en yta som är telefonens egen efter ett år, medan ett plastskal bara blir repigt. Magnetringen sitter under lädret, så laddaren och en magnetplånbok fäster ändå.\n\nSkyddet är det svagaste av alla skal här som har magnet. Varken förstärkta hörn eller förhöjda kanter anges, och ett tunt läderskal dämpar lite av det som händer när en telefon landar på ett hörn mot betong.\n\nVill du ha ett vackert skal och lever ett liv där telefonen sällan hamnar på marken är det här rätt köp. Ska skalet skydda mot fall är nästan alla andra här bättre, och flera billigare.",
  },
  {
    id: "trolsk-mobilskal-matt-17-pro",
    brand: "Trolsk",
    name: "Mobilskal Matt",
    shortName: "Trolsk Matt",
    image: productImage(IPHONE_SKAL.slug, "trolsk-mobilskal-matt-17-pro"),
    tagline: "Matt yta som inte tar fingeravtryck, för 99 kronor.",
    scores: {
      konstruktion: 1.5,
      redovisning: 1,
      prisvarde: 4,
      magnet: 1,
    },
    price: 99,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-mobilskal-matt-iphone-17-pro-57074.html",
    superlative: "Bäst mot repor i fickan",
    pros: [
      "99 kronor, alltså billigast i jämförelsen",
      "Matt yta som varken samlar fingeravtryck eller glider i handen",
      "Tunt och lätt, så telefonen känns som utan skal",
    ],
    cons: [
      "Hård plast utan mjuk ram, så en stöt går rakt in i telefonens sida",
      "Ingen magnetring, alltså varken MagSafe-laddare, plånbok eller bilhållare",
    ],
    specs: [
      { label: "Material", value: "Polykarbonat", highlight: true },
      { label: "Hörnkonstruktion", shortLabel: "Hörn", value: "Ej angiven", highlight: true },
      { label: "Förhöjd kant skärm", shortLabel: "Kant skärm", value: "Ej angiven", highlight: true },
      { label: "Angiven militärstandard", shortLabel: "Standard", value: "Ej angiven", highlight: true },
      { label: "Angiven fallhöjd", shortLabel: "Fallhöjd", value: "Ej angiven", highlight: true },
      { label: "Magnetring", shortLabel: "Magnet", value: "Nej", highlight: true },
      { label: "Förhöjd kant kamera", value: "Ej angiven" },
      { label: "Knappar", value: "Täckta" },
      { label: "Passar modeller", value: "iPhone 17 Pro" },
      { label: "Trådlös laddning genom skalet", value: "Ja, utan magnetfäste" },
      { label: "Angivet provunderlag", value: "Ej angivet" },
      { label: "Angivet antal fall", value: "Ej angivet" },
      { label: "MagSafe-certifiering", value: "Ej angiven" },
      { label: "Angiven magnetstyrka", value: "Ej angiven" },
      { label: "Angiven kanthöjd", value: "Ej angiven" },
      { label: "Garanti", value: "1 år" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Trolsk Mobilskal Matt kostar 99 kronor och är billigast i jämförelsen. Det är ett tunt skal i hård polykarbonat med matt yta.\n\n**Den matta ytan gör två saker som spelar roll varje dag.** Den samlar inte fingeravtryck, och den glider inte i handen, vilket är där de flesta tappade telefoner börjar. Skalet är dessutom så tunt att telefonen behåller sin form och sin vikt i fickan.\n\nDet är hård plast hela vägen, utan mjuk ram och utan förstärkta hörn. En stöt går därför rakt igenom skalet in i telefonens sida i stället för att tas upp av materialet. Skalet skyddar mot repor i en ficka, inte mot betong.\n\nLägger du telefonen i en väska med nycklar och vill slippa repor räcker det här skalet, och det kostar 99 kronor. Ska det skydda mot ett fall lägger du 100 kronor till på Spigen Ultra Hybrid och får hörn som dämpar.",
  },
];

/**
 * Bortvalda, med skäl.
 *
 * Urvalet ur iPhonebutikens 95 skal till iPhone 17 Pro. Skälen är verkliga och
 * inte hedgar: en produkt som lämnats utanför för att den löser ett annat
 * problem säger något, en som lämnats utanför för att vi inte hann säger inget.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "X2O",
    name: "Mag Clear",
    reason:
      "Samma märke, samma pris och samma utlovade 3 meter som skalet på tredje plats, men i genomskinligt utförande och med kortare leveranstid. Den ligger utanför rankningen av ett enda skäl, och det är ett upplysande: där Mag Frosted anger metod 516.7 står här bara att fallskyddet är certifierat, utan att säga av vem eller mot vad. Ingen certifierar mobilskal. Två artiklar från samma tillverkare, till samma pris, med samma påstådda skydd, där bara den ena går att kontrollera.",
    approxPrice: 259,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/x2o-mag-clear-iphone-17-pro18-pro-59054.html",
  },
  {
    brand: "Spigen",
    name: "Thin Fit",
    reason:
      "Ett tunt skal för 269 kronor som anger militärklassat fallskydd men saknar magnetring, alltså samma kombination som gör Ultra Hybrid svårbedömd fast dyrare. Ultra Hybrid gör samma sak för 199 kronor och Ultra Hybrid MagFit lägger till magneten för 269. Den hamnar mellan sina egna syskon utan att vara bäst på något av det.",
    approxPrice: 269,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/spigen-thin-fit-iphone-17-pro-57219.html",
  },
  {
    brand: "Pitaka",
    name: "Ultra-Slim Case",
    reason:
      "Ett aramidskal för 899 kronor som är byggt för att vara tunt snarare än för att skydda: det saknar den mjuka ram och de förstärkta hörn som är hela poängen med kriteriet som väger 40 här. Produkten är utmärkt på det den gör, alltså att knappt märkas, men den konkurrerar med tunna skal för en tredjedel av priset och inte med skydd.",
    approxPrice: 899,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/pitaka-ultra-slim-case-iphone-17-pro-57207.html",
  },
  {
    brand: "Armor-X",
    name: "Waterproof Case with MagSafe",
    reason:
      "Ett vattentätt hus för 899 kronor, alltså den enda produktkategorin i mobilskyddshyllan där det faktiskt finns oberoende provning: Stiftung Warentest har provat dykhus och vattentäta fodral. Det är ett annat köp med ett annat syfte, och att ranka ett dykhus mot ett vardagsskal hade gjort båda listorna sämre. Får en egen systersida.",
    approxPrice: 899,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/armor-x-waterproof-case-with-magsafe-iphone-17-pro-57420.html",
  },
  {
    brand: "Burga",
    name: "Tough MagSafe Case",
    reason:
      "Säljs i tolv mönster till 499 kronor styck och är kategorins tydligaste designköp. Mönstret är hela argumentet, och det går inte att betygsätta mot förhöjda kanter och hörnkonstruktion utan att låtsas mäta smak. Den som väljer skal efter utseende ska köpa det skal som är snyggast, och det avgör inte vi.",
    approxPrice: 499,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/burga-tough-magsafe-case-velvet-night-iphone-17-pro-58521.html",
  },
  {
    brand: "Arc",
    name: "Pulse",
    reason:
      "En ram i två delar för 1 099 kronor som klickas fast över telefonens över- och underkant och lämnar både baksidan och sidorna bara. Det är ett medvetet val att skydda kanterna och visa telefonen, inte ett skal som misslyckats med att täcka den. Utanför avgränsningen av samma skäl som plånboksfodralen.",
    approxPrice: 1099,
    merchant: "iPhonebutiken",
    merchantUrl: "https://www.iphonebutiken.se/arc-pulse-iphone-17-pro-57409.html",
  },
  {
    brand: "SmallRig",
    name: "FilMov Photography Phone Case",
    reason:
      "Ett skal för 499 kronor med fästen för filmtillbehör, alltså byggt för den som monterar telefonen på ett stativ eller en rigg. Skyddet är en bieffekt av konstruktionen och inte dess syfte, och den som filmar seriöst väljer efter fästsystemet och inte efter hur skalet klarar ett fall.",
    approxPrice: 499,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/smallrig-filmov-photography-phone-case-iphone-17-pro-58128.html",
  },
];

export const IPHONE_SKAL_PRODUCTS = resolveProducts(IPHONE_SKAL, SEEDS);

export const IPHONE_SKAL_CONSIDERED = CONSIDERED;

/**
 * Frågorna är de som faktiskt ställs i kategorin, och svaren står på egna ben
 * eftersom FAQ-rutan kan visas ensam i ett sökresultat.
 */
export const IPHONE_SKAL_FAQ = [
  {
    question: "Vad betyder militärklassat på ett mobilskal?",
    answer:
      "Mindre än det låter, och det går att läsa själv. Uttrycket syftar på MIL-STD-810, ett amerikanskt försvarsdokument som beskriver hur man provar utrustning för miljöpåfrestningar. Det är ingen certifiering: det finns ingen myndighet som provar mobilskal och utfärdar ett intyg, och dokumentet säger själv att provvillkoren ska anpassas till det som provas. Varje metod bär noten att anpassning är nödvändig, och i del ett står att det inte är giltigt att betrakta en metods provvillkor som oföränderliga. Höjden, antalet fall och underlaget får alltså ändras. Två skal som båda är militärklassade kan därför ha provats på helt olika sätt, och tillverkaren väljer själv hur.",
  },
  {
    question: "Stämmer det att skalen tål 26 fall från 1,2 meter?",
    answer:
      "Det är rätt återgivet ur dokumentet men lätt att missförstå på två sätt. Det ena är att de 26 fallen inte behöver drabba samma skal: tabell 516.8-IX säger uttryckligen att de 26 fallen får delas på upp till fem provexemplar, alltså ungefär fem fall vardera. Det andra är att fallen är styrda och inte slumpade. Provet orienterar föremålet så att linjen från den träffade kanten till tyngdpunkten står vinkelrätt mot underlaget, och det görs ett fall på varje sida, varje kant och varje hörn. Det liknar inte en telefon som glider ur en ficka och studsar.",
  },
  {
    question: "Provas skalen mot plywood eller mot stål?",
    answer:
      "Mot stål, enligt de två senaste utgåvorna, men nästan alla förklaringar på nätet beskriver fortfarande plywood. Utgåvan från 2008 föreskrev fem centimeter plywood ovanpå betong. Den 15 april 2014 kom en ändring som gjorde stålplåt på armerad betong till förvalt underlag, och utgåvan från 2019 behöll det och tillåter plywood bara under två namngivna villkor. Skillnaden är stor: plywood tar upp en del av energin, medan en stålplåt inte gör det, vilket också är dokumentets eget skäl: den värsta skadan uppstår vid stöt mot en massa som inte ger efter. Ett skal provat mot plywood har alltså haft ett mildare prov än ett provat mot stål, och nästan ingen tillverkare skriver vilket underlag som använts.",
  },
  {
    question: "Vad är skillnaden mellan MagSafe och magnetisk?",
    answer:
      "Orden används om varandra i butik men betyder olika saker, och skillnaden kostar pengar. Ett skal med magnetring har en ring av magneter i rätt läge på baksidan, så att en MagSafe-laddare, en magnetplånbok eller en bilhållare fäster och laddningen fungerar genom skalet. Ett skal som bara kallas magnetiskt kan i stället ha en metallplatta inbyggd, avsedd för en magnetisk bilhållare. Plattan sitter fast på en magnet men laddar ingenting, och en MagSafe-laddare faller av. Läs efter ordet ring eller MagSafe i specifikationen, inte bara ordet magnetisk.",
  },
  {
    question: "Passar ett skal till iPhone 17 även på iPhone 17 Pro?",
    answer:
      "Nej. De två har samma skärmstorlek, 6,3 tum, men olika mått och olika kameraplatå, så skalen är inte utbytbara. iPhone 17 mäter 149,6 gånger 71,5 gånger 7,95 millimeter och iPhone 17 Pro 150,0 gånger 71,9 gånger 8,75. Skillnaden är liten i millimeter och total i praktiken, eftersom urtaget för kamerorna sitter olika. iPhone 17 Pro Max är dessutom 6,9 tum och iPhone Air bara 5,6 millimeter tjock. Kontrollera alltid att artikeln du lägger i korgen anger exakt din modell, inte bara serien.",
  },
  {
    question: "Laddar telefonen långsammare genom ett skal?",
    answer:
      "Med sladd, nej. Trådlöst beror det på magneterna och på tjockleken. En iPhone 17 stöder Qi2 med upp till 25 watt, men det kräver att laddaren sitter centrerad över spolen, och det är precis vad magnetringen är till för. Ett skal utan ring gör att laddaren hamnar snett eller glider, och effekten faller. Ett mycket tjockt skal ökar dessutom avståndet mellan spolarna, vilket sänker effekten och ger mer värme. I den här jämförelsen är Nomad Rugged Case det enda skal där Qi2 står utskrivet, medan övriga bara anger att trådlös laddning fungerar.",
  },
  {
    question: "Skyddar ett skal kameran?",
    answer:
      "Bara om kanten runt kamerablocket är högre än linserna. Det är den enskilt viktigaste detaljen på en iPhone 17 Pro, eftersom kameraglaset är dyrt att byta och eftersom telefonen läggs ner på bordet med skärmen uppåt flera gånger om dagen. Tre nivåer finns i handeln: ingen kant alls, en förhöjd ring runt blocket, och ett skal där hela kamerablocket är inbyggt. En fjärde variant är ett skjutbart lock som täcker linserna helt, vilket också skyddar mot sand och nycklar i en ficka. Titta på produktbilden från sidan: syns linserna sticka upp över skalet gör kanten ingen nytta.",
  },
  {
    question: "Är ett dyrt skal bättre än ett billigt?",
    answer:
      "Inte konsekvent, och prisspannet i den här jämförelsen är elva gånger. Det dyraste skalet har mest konstruktion, alltså fem lager där varje lager gör något, och det märks om du arbetar med telefonen i handen utomhus. Men ett skal för 349 kronor har stötdämpande skum i hörnen och ett inbyggt kamerablock, medan ett läderskal för 399 varken har förstärkta hörn eller förhöjda kanter. Titta på tre saker i stället för på priset: är hörnen förstärkta, är kanten högre än skärmen, och är kanten högre än linserna. De tre avgör mer än märket gör.",
  },
];
