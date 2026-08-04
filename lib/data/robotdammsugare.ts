import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { ROBOTDAMMSUGARE } from "@/lib/test-pages";

/**
 * Robotdammsugare. Underlag i .agent/research/robotdammsugare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, GTIN, sugkraft i pascal, moppsystem,
 * angiven passerhöjd, stationens funktioner och batterikapacitet. Allt läst
 * 2026-08-04 i butikens egen strukturerade data eller i tillverkarens egen
 * produkttext, hos den butik produkten faktiskt länkar till.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte dammsugit några
 * golv, inte vägt något damm och inte provat någon robot.
 *
 * ## Sidans fynd: talet som står störst är det du kan strunta i
 *
 * Stiftung Warentest skriver rakt ut att sugkrafter på många tusen pascal är
 * reklampåståenden utan samband med hur rent det blir. Prislistan visar samma
 * sak utan att man behöver tro dem på deras ord:
 *
 * - **Dreame L10s Ultra Gen 3**: 25 000 Pa för 4 990 kronor.
 * - **Roborock Qrevo Curv 2 Flow**: 20 000 Pa för 11 490 kronor.
 *
 * Den billigare roboten anger alltså mer sugkraft än den som kostar mer än
 * dubbelt så mycket.
 *
 * ⚠️ Rättat 2026-08-04. Filen påstod tidigare att "Roborocks eget toppskikt
 * ligger på 20 000". Det var fel, och felet kom av att Roborocks svenska butik
 * inte anger något Pa-tal alls för Saros 20 Sonic. Ljud & Bilds test av just
 * den modellen anger **36 000 Pa**, alltså mer än Dreame X60 Ultra på 35 000.
 * Rättelsen gör argumentet starkare: Saros 20 Sonic kostar 8 990 kronor och
 * anger mer sugkraft än en robot för 14 990. Talen är inte jämförbara mellan
 * märken eftersom ingen anger provmetod, och Råd & Rön är tydliga med varför
 * det inte spelar roll ändå: roboten har inget munstycke som skapar vakuum,
 * den sopar i stället för att suga.
 *
 * ⚠️ Samma förbehåll gäller **passerhöjden**. Dreames 40 mm på L50s Pro Ultra
 * och 8,8 cm på X60 Ultra kommer från tillverkaren själv, ingen anger
 * provmetod, och de används här som uppgift och aldrig som mätning.
 *
 * ## Om testomdöme
 *
 * Det finns inget eget kriterium för det, efter användarbeslut 2026-08-04.
 * Råd & Rön har provat 62 robotar och Stiftung Warentest provar efter
 * DIN EN 62929, men båda har betalvägg på produktnivå. Att bygga ett kriterium
 * på betyg vi inte får läsa hade varit ett sken av mätning. Labben citeras i
 * stället för sina metodfynd, som gäller hela kategorin.
 *
 * Fritt läsbara omdömen per produkt finns hos Ljud & Bild, och de är få. Där
 * de finns står de utskrivna i produktens omdöme.
 *
 * ## ⚠️ Aqua10 Ultra Roller är inte Aqua10 Ultra Track
 *
 * Ljud & Bilds omdöme om Dreames första robot med mopprulle gäller **Roller**,
 * som kostar 14 890 kronor hos Dreame. Proshop säljer en Aqua10 Ultra **Track**
 * för 9 990, och det är en annan maskin. Flytta aldrig omdömet mellan dem.
 *
 * ## Butikerna
 *
 * Länkarna är spridda över tre butiker med avsikt. Två produkter går till
 * märkets egen svenska butik eftersom maskinen inte finns hos Proshop, och
 * resten till Proshop. Priset är i varje enskilt fall läst hos just den butik
 * produkten länkar till, aldrig hos den andra: Dreame X60 Pro Ultra Complete
 * skiljer 3 000 kronor mellan Dreame och Proshop samma dag.
 */

export const PRICE_CHECKED = "2026-08-04";

const PROSHOP = "Proshop";
const PROSHOP_BASE = "https://www.proshop.se/Robotdammsugare";

const DREAME = "Dreame Sverige";
const ROBOROCK = "Roborock Sverige";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "dreame-aqua10-ultra-roller",
    name: "Aqua10 Ultra Roller",
    shortName: "Aqua10 Roller",
    brand: "Dreame",
    image: productImage(ROBOTDAMMSUGARE.slug, "dreame-aqua10-ultra-roller"),
    tagline: "Moppen sköljs ren medan den arbetar, inte efteråt.",
    scores: {
      moppning: 5,
      trosklar: 4,
      station: 4.5,
      navigering: 4,
      prisvarde: 2.5,
    },
    price: 14890,
    merchant: DREAME,
    merchantUrl:
      "https://se.dreametech.com/products/aqua10-ultra-roller-robotdammsugare",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Enda moppen som sköljs under drift",
    pros: [
      "Rullmoppen sköljs och skrapas ren kontinuerligt medan roboten moppar",
      "Ljud & Bild kallar Dreames första mopprulle nästan perfekt",
      "Moppskyddet fälls ner över rullen när roboten kör upp på matta",
      "Stationen tvättar rullen i 100 grader och torkar den efteråt",
    ],
    cons: [
      "Dyrast av robotarna i jämförelsen, 3 400 kronor upp till tvåan",
      "Dreame anger ingen passerhöjd i millimeter för den här modellen",
      "Rullen och filtret är egna reservdelar, filter 349 kronor",
      "Moppvattnet måste du fortfarande byta för hand efter varje pass",
    ],
    specs: [
      { label: "Pris", value: "14 890 kr", highlight: true },
      { label: "Moppsystem", value: "Rullmopp med självrengöring under drift", highlight: true },
      { label: "Mopptvätt", value: "100 °C i stationen", highlight: true },
      { label: "Mattskydd", value: "Moppskydd fälls ner automatiskt", highlight: true },
      { label: "Torkning", value: "Varmluft i stationen" },
      { label: "Borste", value: "Dubbel, trasselutredande" },
      { label: "Butik", value: "Dreames egen svenska butik" },
      { label: "Sugkraft", value: "30 000 Pa enligt Ljud & Bild" },
      { label: "Navigering", value: "VersaLift LDS-sensor och AstroVision AI" },
      { label: "Station", value: "Självtömmande, 3,2 liters påse" },
      { label: "Dammbehållare", value: "220 ml i roboten" },
      { label: "Ljudnivå", value: "Från 37 dB(A)" },
      { label: "Höjd", value: "98 mm (120 mm med upphöjd LDS)" },
    ],
    verdict:
      "Aqua10 Ultra Roller har en rullmopp som sköljs och skrapas ren under drift. Duken som möter golvet på sista varvet är alltså inte samma smutsiga duk som på det första.\n\nStationen tvättar rullen i 100 grader och torkar den med varmluft, så moppen börjar inte lukta efter några veckor. Kör du mattor fälls ett moppskydd ner över rullen när roboten går upp på mattan, i stället för att moppen bara lyfts några millimeter. Ljud & Bild kallade Dreames första robot med mopprulle nästan perfekt.\n\nDet angriper den svaghet som väger tyngst i vår rankning. Råd & Rön lät 62 robotar moppa upp lera och choklad och delade ut många ettor, med noteringen att chokladen ofta smetas ut så att golvet ser smutsigare ut efteråt än före. En fuktig duk som släpas runt ett helt pass blir smutsig tidigt och flyttar sedan smutsen i stället för att ta upp den.\n\nTvå saker talar emot. Priset är det högsta av robotarna i jämförelsen, och Dreame anger ingen passerhöjd i millimeter för just den här modellen, så du kan inte kontrollera i förväg om den tar sig över din tröskel. Moppvattnet töms inte heller i stationen utan byts för hand efter varje moppning, precis som på alla andra robotar.\n\nKöp den om moppningen är det du bryr dig om och budgeten tål 14 890 kronor. Har du höga trösklar och ont om pengar finns bättre val längre ner.",
  },
  {
    id: "roborock-qrevo-curv-2-flow",
    name: "Qrevo Curv 2 Flow",
    shortName: "Qrevo Curv 2 Flow",
    brand: "Roborock",
    image: productImage(ROBOTDAMMSUGARE.slug, "roborock-qrevo-curv-2-flow"),
    tagline: "Samma idé som vinnaren, 3 400 kronor billigare.",
    scores: {
      moppning: 4.5,
      trosklar: 4,
      station: 4,
      navigering: 4.5,
      prisvarde: 3,
    },
    price: 11490,
    merchant: ROBOROCK,
    merchantUrl: "https://se.roborock.com/products/roborock-qrevo-curv-2-flow",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst hinderigenkänning i toppen",
    pros: [
      "Rullmopp som rengörs i realtid, samma princip som vinnaren",
      "Reactive AI känner igen hinder i stället för att bara känna dem",
      "Dubbel trasselfri borste, vilket Råd & Rön pekar ut som ett verkligt problem",
      "3 400 kronor billigare än Aqua10 Ultra Roller",
    ],
    cons: [
      "Roborock anger 20 000 Pa medan en robot för 4 990 anger 25 000",
      "Ingen passerhöjd i millimeter i den svenska produkttexten",
      "Tillbehörsset och borstskydd är egna köp, 540 respektive 210 kronor",
      "Finns inte hos Proshop, så butiksvalet är Roborocks egen kanal",
    ],
    specs: [
      { label: "Pris", value: "11 490 kr", highlight: true },
      { label: "Moppsystem", value: "Rullmopp, självrengöring i realtid", highlight: true },
      { label: "Sugkraft", value: "20 000 Pa enligt Roborock", highlight: true },
      { label: "Hinder", value: "Reactive AI-igenkänning", highlight: true },
      { label: "Borste", value: "Dubbel, trasselfri" },
      { label: "Butik", value: "Roborocks egen svenska butik" },
      { label: "Navigering", value: "PreciSense LiDAR" },
      { label: "Station", value: "Självtömmande, 2,5 liters påse" },
      { label: "Dammbehållare", value: "324 ml i roboten" },
      { label: "Ljudnivå", value: "Från 64 dB(A)" },
      { label: "Höjd", value: "119 mm" },
    ],
    verdict:
      "Samma grundidé som vinnaren, 3 400 kronor billigare. Roborock kallar systemet SpiraFlow och rengör rullen i realtid, så moppen håller sig ren genom hela passet. Skillnaden mot Dreames rulle ligger i stationens efterarbete, inte i principen.\n\nPå hinderigenkänning är den starkast av alla sju. Roborocks system försöker avgöra vad ett föremål är och inte bara att det finns. Råd & Rön fann att fler än hälften av 62 robotar trasslade in sig i elsladden de lagt längs väggen i köket, och att fyra iRobot-modeller läste utlagda fullkornsflingor som möjligt hundbajs och körde runt dem i stället för att suga upp dem.\n\nSedan står den där med det sämsta pascaltalet av alla robotarna: 20 000 för 11 490 kronor, mot 25 000 för en Dreame som kostar 4 990. Att den ändå ligger tvåa är hela poängen med att strunta i talet.\n\nVill du ha rullmoppens fördel utan vinnarens prislapp är det här köpet. Mät bara din besvärligaste tröskel först, eftersom Roborock inte anger någon passerhöjd.",
  },
  {
    id: "roborock-saros-20-sonic",
    name: "Saros 20 Sonic",
    shortName: "Saros 20 Sonic",
    brand: "Roborock",
    image: productImage(ROBOTDAMMSUGARE.slug, "roborock-saros-20-sonic"),
    tagline: "Roborock säljer den på trösklar och tjocka mattor.",
    scores: {
      moppning: 4,
      trosklar: 4.5,
      station: 4,
      navigering: 4,
      prisvarde: 3.5,
    },
    price: 8990,
    merchant: PROSHOP,
    merchantUrl: `${PROSHOP_BASE}/Roborock-Robotdammsugare-Saros-20-Sonic-White/3457221`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Uttalat byggd för trösklar",
    pros: [
      "Roborock lyfter själva fram trösklar och tjocka mattor för den här modellen",
      "Vibrerande moppning i stället för en duk som bara släpas",
      "Stationen återställer moppen mellan passen",
      "Samma pris hos Proshop som i Roborocks egen butik",
    ],
    cons: [
      "Vibrerande mopp når inte rullmopparna i toppen",
      "Ingen passerhöjd i millimeter anges trots att trösklar är säljargumentet",
      "Moppfästen och borstskydd är förbrukningsdelar, 220 respektive 290 kronor",
    ],
    specs: [
      { label: "Pris", value: "8 990 kr", highlight: true },
      { label: "Moppsystem", value: "Vibrerande moppning", highlight: true },
      { label: "Passerhöjd", value: "Uttalat konstruerad för trösklar och tjocka mattor", highlight: true },
      { label: "Station", value: "RockDock, återställer moppen" },
      { label: "GTIN", value: "6936905905376" },
      { label: "Sugkraft", value: "36 000 Pa enligt Ljud & Bild" },
      { label: "Navigering", value: "RetractSense LiDAR, infällbar" },
      { label: "Dammbehållare", value: "228 ml i roboten" },
      { label: "Ljudnivå", value: "56–64 dB(A)" },
      { label: "Höjd", value: "79,8 mm" },
      { label: "Batteritid", value: "200 min" },
    ],
    verdict:
      "Saros 20 Sonic är byggd för trösklar. Chassit arbetar sig uppåt över en list, moppen vibrerar i stället för att bara släpas, och stationen återställer moppen mellan passen. Allt för 8 990 kronor.\n\nDet träffar rätt problem. I Ljud & Bilds grupptest av fyra mellanklassrobotar var nordiska trösklar en av de största utmaningarna, och en av de fyra fick ge upp helt. Att både Roborock och Dreame säljer en tröskelramp som tillbehör, för 330 respektive 199 kronor, säger samma sak från andra hållet.\n\nMoppningen är svagheten. Vibration lossar intorkad smuts bättre än en duk som bara släpas, men det är fortfarande samma duk hela passet. Där ligger rullmopparna över.\n\nIrriterande nog anger Roborock ingen passerhöjd i millimeter, trots att det är just trösklar de säljer maskinen på. Vill du ha en siffra att hålla tumstocken mot är Dreame L50s Pro Ultra härnäst det tydligaste alternativet.\n\nKöp den om trösklar är ditt största problem och du kan leva med en dukmopp. Priset är detsamma hos Proshop som i Roborocks egen butik.",
  },
  {
    id: "dreame-l50s-pro-ultra",
    name: "L50s Pro Ultra",
    shortName: "L50s Pro Ultra",
    brand: "Dreame",
    image: productImage(ROBOTDAMMSUGARE.slug, "dreame-l50s-pro-ultra"),
    tagline: "Anger 40 millimeters passerhöjd. Ingen annan gör det.",
    scores: {
      moppning: 4,
      trosklar: 5,
      station: 4,
      navigering: 3.5,
      prisvarde: 4,
    },
    price: 7990,
    merchant: PROSHOP,
    merchantUrl: `${PROSHOP_BASE}/Dreame-Robotdammsugare-L50s-Pro-Ultra-White/3467918`,
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    /* Håll den kort. 41 tecken klipptes av i kortets 222 px breda slot, mätt
       med scrollWidth mot clientWidth på 1440 px. Taket ligger runt 35. */
    superlative: "40 mm, högsta angivna passerhöjd",
    pros: [
      "40 millimeters angiven passerhöjd, den enda siffran att jämföra med i mellanskiktet",
      "Mopptvätt i varmt vatten med torkning i stationen",
      "Dubbelborste som ska hindra hår från att linda sig",
      "Samma pris hos Proshop som hos Dreame",
    ],
    cons: [
      "Passerhöjden är tillverkarens uppgift, ingen anger provmetod",
      "Dukmopp och inte rullmopp, samma duk hela passet",
      "Navigeringen är enklare än hos de två i toppen",
    ],
    specs: [
      { label: "Pris", value: "7 990 kr", highlight: true },
      { label: "Passerhöjd", value: "40 mm enligt Dreame", highlight: true },
      { label: "Moppsystem", value: "Roterande moppar med tvätt i stationen", highlight: true },
      { label: "Mopptvätt", value: "Varmvatten och torkning" },
      { label: "Borste", value: "Dubbel, trasselutredande" },
      { label: "GTIN", value: "6979181920589" },
      { label: "Sugkraft", value: "30 000 Pa enligt Dreame" },
      { label: "Station", value: "ThermoHub med mopptvätt och torkning" },
      { label: "Navigering", value: "LiDAR med flexarmar" },
    ],
    verdict:
      "Dreame anger 40 millimeters passerhöjd. Ingen annan robot i det här prisskiktet sätter en siffra på vad den tar sig över, och trösklar fällde en av fyra robotar i Ljud & Bilds grupptest. Har du en list mellan hall och vardagsrum som du redan vet är besvärlig, kan du hålla en tumstock mot den och veta i förväg.\n\nVar noga med vad siffran är. Den kommer från Dreame, ingen anger någon provmetod, och den är därför en uppgift och inte ett mätvärde. Men en uppgift du kan kontrollera själv är mer värd än ett pascaltal som inte betyder något alls.\n\nDen tar också med sig det som gör dyrare robotar drägliga att leva med: moppen tvättas i varmt vatten och torkas i stationen, så den börjar inte lukta. Borsten är dubbel och ska hindra hår från att linda sig, ett återkommande besvär enligt Råd & Rön.\n\nFör 7 990 kronor får du ingen rullmopp. Det här är roterande dukar, samma duk hela passet, och navigeringen är enklare än hos de två i toppen.\n\nVi rekommenderar den här till de flesta: den löser tröskelproblemet med en siffra du kan kontrollera själv, och kostar ungefär halva vinnaren.",
  },
  {
    id: "dreame-l10s-ultra-gen-3",
    name: "L10s Ultra Gen 3",
    shortName: "L10s Ultra Gen 3",
    brand: "Dreame",
    image: productImage(ROBOTDAMMSUGARE.slug, "dreame-l10s-ultra-gen-3"),
    tagline: "Anger 25 000 Pa. Kostar mindre än halva tvåan som anger 20 000.",
    scores: {
      moppning: 3.5,
      trosklar: 3,
      station: 4,
      navigering: 3.5,
      prisvarde: 5,
    },
    price: 4990,
    merchant: PROSHOP,
    merchantUrl: `${PROSHOP_BASE}/Dreame-Robotdammsugare-L10s-Ultra-Gen-3-White/3434017`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Lägst pris med fullstor station",
    pros: [
      "3,2 liters dammpåse i stationen ger långt mellan tömningarna",
      "Två flexarmar som når in i hörn",
      "Mopplyft på 10,5 millimeter över mattor",
      "Halva priset mot maskiner som anger lägre sugkraft",
    ],
    cons: [
      "Ingen angiven passerhöjd, och trösklar är det som fäller robotar här",
      "Dukmoppar utan rullfunktion",
      "Sugkraftstalet är just det tal Stiftung Warentest säger att du ska bortse från",
    ],
    specs: [
      { label: "Pris", value: "4 990 kr", highlight: true },
      { label: "Sugkraft", value: "25 000 Pa enligt Dreame", highlight: true },
      { label: "Mopplyft", value: "10,5 mm över matta", highlight: true },
      { label: "Station", value: "3,2 liter i stationen", highlight: true },
      { label: "Hörn", value: "Två flexarmar" },
      { label: "GTIN", value: "6978515257025" },
      { label: "Navigering", value: "3D Adapt hinderundvikning" },
      { label: "Borste", value: "Dubbel skrubbmopp med flexarmar" },
    ],
    verdict:
      "För 4 990 kronor får du en fullstor station med 3,2 liters dammpåse, alltså veckor mellan tömningarna. Flexarmarna når in i hörn, ytan som rullborstar normalt missar, och mopplyftet på 10,5 millimeter räcker för att hålla mattan torr.\n\nPrislappen gör den samtidigt till det tydligaste exemplet på att pascaltalet inte betyder något. Dreame anger 25 000 pascal för 4 990 kronor. Roborock anger 20 000 för Qrevo Curv 2 Flow, som kostar 11 490.\n\nTalen är reklampåståenden man kan bortse från, och detsamma gäller hänvisningar till särskild lasernavigering. Det är Stiftung Warentests slutsats. Råd & Rön kommer åt samma sak från ett annat håll: roboten har inget munstycke som skapar vakuum, den sopar ihop smuts som sedan sugs upp i en öppning, och därför får samtliga 62 robotar i deras test lägsta möjliga betyg för att få upp damm ur springor i golvet.\n\nTrösklar och rullmopp får du inte. Dreame anger ingen passerhöjd för den här modellen, och i ett hem med lister mellan rummen avgör den uppgiften om roboten kommer in i hallen alls. Köp den om golvet är jämnt och du vill ha stationen billigt. Har du lister mellan rummen är L50s Pro Ultra värd de 3 000 kronorna extra.",
  },
  {
    id: "roborock-qr-798",
    name: "QR 798",
    shortName: "QR 798",
    brand: "Roborock",
    image: productImage(ROBOTDAMMSUGARE.slug, "roborock-qr-798"),
    tagline: "Sju veckor mellan tömningarna, för 3 990 kronor.",
    scores: {
      moppning: 3,
      trosklar: 2.5,
      station: 4.5,
      navigering: 4,
      prisvarde: 4.5,
    },
    price: 3990,
    merchant: PROSHOP,
    merchantUrl: `${PROSHOP_BASE}/Roborock-Robotdammsugare-QR-798-White/3393491`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Längst mellan tömningarna",
    pros: [
      "Upp till sju veckors automatiskt underhåll enligt Roborock",
      "Kartlägger upp till fyra våningar",
      "Lyftbara moppar som känner av matta",
      "LiDAR-navigering, vilket sällan finns i det här priset",
    ],
    cons: [
      "10 000 Pa, samma tal som en robot för 1 999 kronor",
      "Ingen angiven passerhöjd",
      "Moppar som roterar i 200 varv men fortfarande är dukar",
    ],
    specs: [
      { label: "Pris", value: "3 990 kr", highlight: true },
      { label: "Tömningsintervall", value: "Upp till 7 veckor", highlight: true },
      { label: "Kartor", value: "Upp till fyra våningar", highlight: true },
      { label: "Navigering", value: "LiDAR och Reactive Tech" },
      { label: "Moppsystem", value: "Lyftbar, upp till 200 varv/min" },
      { label: "GTIN", value: "6936905901682" },
      { label: "Station", value: "Självtömmande, 2,7 liters påse" },
      { label: "Ljudnivå", value: "65 dB(A)" },
      { label: "Batteritid", value: "180 min" },
      { label: "Höjd", value: "96,5 mm" },
    ],
    verdict:
      "Sju veckor mellan tömningarna är det längsta intervallet av de sju, och måttet som avgör hur ofta du måste befatta dig med roboten alls.\n\nRåd & Rön är hårda mot underhållet genomgående: robotens egen behållare är ofta svår att få loss utan att damm ramlar ut, och att byta borstar och filter får låga betyg rakt igenom. Ju färre gånger du behöver göra det, desto mindre spelar det roll att det är bökigt.\n\nFör 3 990 kronor får du dessutom LiDAR och kartor för fyra våningar, funktioner som normalt ligger ett skikt högre. Mopparna lyfts när roboten känner matta, så du slipper välja mellan att moppa golvet och att blöta mattan.\n\nTrösklar är den svaga punkten. Roborock anger ingen passerhöjd, och i det här prisskiktet är chassit enklare än i toppen. Bor du i en lägenhet med jämna golv är det här mest robot för pengarna. Har du en villa från sjuttiotalet med lister mellan varje rum, räkna med att bära den ibland.",
  },
  {
    id: "xiaomi-s40-eu",
    name: "Robot Vacuum S40 EU",
    shortName: "Xiaomi S40",
    brand: "Xiaomi",
    image: productImage(ROBOTDAMMSUGARE.slug, "xiaomi-s40-eu"),
    tagline: "Räcker för hårda golv utan mattor och husdjur.",
    scores: {
      moppning: 1.5,
      trosklar: 2,
      station: 1.5,
      navigering: 3,
      prisvarde: 4,
    },
    price: 1999,
    merchant: PROSHOP,
    merchantUrl: `${PROSHOP_BASE}/Xiaomi-Robotdammsugare-S40-EU/3403675`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast av de sju robotarna",
    pros: [
      "Lasernavigering trots priset, så den kör i mönster och inte slumpvis",
      "5 200 mAh batteri räcker för en normal lägenhet",
      "Xiaomi Home om du redan har annat i den appen",
      "En femtedel av vad rullmopprobotarna kostar",
    ],
    cons: [
      "Ingen tömningsstation, så du tömmer behållaren för hand",
      "Moppen är en fuktig duk som släpas runt hela passet",
      "Ingen mopptvätt och ingen torkning",
      "Ingen angiven passerhöjd",
    ],
    specs: [
      { label: "Pris", value: "1 999 kr", highlight: true },
      { label: "Station", value: "Laddning, ingen tömning", highlight: true },
      { label: "Moppsystem", value: "Fuktig duk, ingen tvätt", highlight: true },
      { label: "Navigering", value: "LDS-lasernavigering", highlight: true },
      { label: "Batteri", value: "5 200 mAh" },
      { label: "Sugkraft", value: "10 000 Pa enligt Xiaomi" },
      { label: "GTIN", value: "6932554440893" },
    ],
    verdict:
      "För 1 999 kronor får du lasernavigering, vilket sällan finns i det här priset. Roboten kör i ordnade banor i stället för att studsa runt slumpvis, och batteriet räcker för en normal lägenhet. På ett hårt golv utan mattor håller den undan damm och smulor, och det är det robotar är bäst på enligt Råd & Rön.\n\nResten är bortskalat. Utan tömningsstation tömmer du den lilla behållaren för hand varje eller varannan körning, och Råd & Rön beskriver just den uppgiften som besvärlig: behållaren är svår att få loss utan att damm ramlar ut.\n\nMoppningen bör du betrakta som obefintlig. En fuktig duk som släpas runt hela passet, utan tvätt och utan torkning, är den konstruktion båda labben kritiserar hårdast. Vill du moppa golv, gör det själv eller köp en robot med rullmopp.\n\nHar du en lägenhet med hårda golv och vill se om en robot passar dig, är det här ett billigt och vettigt sätt att ta reda på det. Har du mattor, husdjur, trösklar eller förväntningar på moppen, lägg 2 991 kronor till och ta QR 798.",
  },
];

export const ROBOTDAMMSUGARE_PRODUCTS = resolveProducts(ROBOTDAMMSUGARE, SEEDS);

export const ROBOTDAMMSUGARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "DJI",
    name: "ROMO P",
    reason:
      "Drönartillverkarens flaggskepp bland robotdammsugare och den mest omtalade nykomlingen just nu. Ljud & Bild har provat den: följsam och tyst, men den tappar ofta bort både sig själv och smutsen. Det omdömet fäller den mot maskiner som kostar mindre. Priset är 12 649 kronor hos Proshop, mer än andraplatsen, och DJI:s svenska sida saknar den helt.",
    approxPrice: 12649,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Robotdammsugare/DJI-Robotdammsugare-ROMO-P/3417381",
  },
  {
    brand: "Dreame",
    name: "X60 Ultra",
    reason:
      "Anger 8,8 centimeters hinderpassering och 35 000 pascal, de högsta talen på marknaden i båda avseendena, och identifierar enligt Dreame upp till 280 objekttyper. Den kostar 14 990 kronor. Vi rankar den inte, av två skäl som hänger ihop: sugkraftstalet är enligt Stiftung Warentest utan värde, och passerhöjden är tillverkarens egen uppgift utan angiven provmetod. Två obekräftade rekordtal gör inte ett köpargument. Är du ändå ute efter mesta möjliga framkomlighet är det här maskinen att titta på.",
    approxPrice: 14990,
    merchant: "Dreame Sverige",
    merchantUrl: "https://se.dreametech.com/products/x60-ultra-robotdammsugare",
  },
  {
    brand: "Dreame",
    name: "Aqua10 Ultra Track",
    reason:
      "Förväxlas lätt med vinnaren och är en annan maskin. Track kostar 9 990 kronor hos Proshop mot Rollers 14 890 hos Dreame, och Ljud & Bilds omdöme om Dreames första robot med mopprulle gäller Roller. Vi flyttar inte ett omdöme mellan två modeller för att namnen liknar varandra. Track kan mycket väl vara ett bra köp, men vi har inget läsbart omdöme om just den.",
    approxPrice: 9990,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Robotdammsugare/Dreame-Robotdammsugare-Aqua10-Ultra-Track-Complete-White/3436109",
  },
  {
    brand: "iRobot",
    name: "Roomba, hela serien",
    reason:
      "Märket som gjorde kategorin känd, och det enda som får ett namngivet bakslag i Råd & Röns test. Labbet lade ut 20 högar fullkornsflingor för att mäta hur stor del av golvet robotarna verkligen når, och fyra iRobot-modeller läste flingorna som möjligt hundbajs och körde runt dem i stället för att suga upp dem. Funktionen är avsedd att skydda mot en verklig olycka, men i praktiken blev den ett skäl att lämna smuts kvar. Vi har inget svenskt pris hos någon butik vi länkar till.",
  },
  {
    brand: "Ecovacs",
    name: "Deebot T80 och X9 Pro Omni",
    reason:
      "Finns hos Proshop för 7 299 respektive 7 499 kronor och konkurrerar rakt mot L50s Pro Ultra i pris. Ingen av de källor vi läser har ett fritt läsbart omdöme om dem, och Ecovacs egen svenska butik svarar inte. Utan omdöme och utan tillverkaruppgifter om passerhöjd blir det gissningar, och vi rankar inte på gissningar.",
    approxPrice: 7299,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Robotdammsugare/Ecovacs-Robotdammsugare-Deebot-T80-Omni-Black/3356576",
  },
  {
    brand: "TP-Link",
    name: "Tapo RV50 Pro Omni",
    reason:
      "Ingick i Ljud & Bilds grupptest av fyra mellanklassrobotar och är därmed en av få modeller med ett svenskt omdöme. Den ligger ändå här, eftersom testet inte utser någon vinnare och redaktionens genomgång inte ger oss underlag att placera just den mot de sju rankade. Priset är 5 990 kronor hos Proshop. Läs grupptestet om den intresserar dig.",
    approxPrice: 5990,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Robotdammsugare/TP-Link-Robotdammsugare-Tapo-RV50-Pro-Omni/3441941",
  },
];

export const ROBOTDAMMSUGARE_FAQ = [
  {
    question: "Vilken robotdammsugare är bäst 2026?",
    answer:
      "Dreame Aqua10 Ultra Roller för 14 890 kronor, och skälet är moppen. Både Råd & Rön och Stiftung Warentest pekar ut moppningen som robotarnas svagaste funktion, och orsaken är att de flesta släpar runt samma fuktiga duk hela passet. Råd & Rön noterar att många smetar ut chokladfläckar så att golvet ser smutsigare ut efteråt än före. Aqua10 Ultra Roller har en rullmopp som sköljs och skrapas ren medan roboten arbetar, och stationen tvättar den sedan i 100 grader och torkar den. Ljud & Bild provade Dreames första robot med mopprulle och kallade den nästan perfekt. Vill du inte lägga så mycket är Dreame L50s Pro Ultra för 7 990 kronor det bästa köpet av robotarna i jämförelsen, framför allt för att den anger 40 millimeters passerhöjd.",
  },
  {
    question: "Vad betyder Pa på en robotdammsugare?",
    answer:
      "Pa står för pascal och anger undertryck, det vill säga sugkraft. Det är också det tal du kan strunta i. Sugkrafter på många tusen Pa är reklampåståenden man kan bortse från, och detsamma gäller hänvisningar till fast cleaning och särskild lasernavigering, enligt Stiftung Warentest. Priserna visar samma sak: Dreame L10s Ultra Gen 3 anger 25 000 Pa och kostar 4 990 kronor, medan Roborock Qrevo Curv 2 Flow anger 20 000 Pa och kostar 11 490. Ingen tillverkare anger vid vilken provmetod talet är uppmätt, så talen går inte heller att jämföra mellan märken. Råd & Rön förklarar varför siffran spelar så liten roll: roboten har inget munstycke som skapar vakuum, den sopar ihop smuts som sedan sugs upp i en öppning.",
  },
  {
    question: "Är robotdammsugare tillräckligt bra för att ersätta en vanlig dammsugare?",
    answer:
      "Nej, och det är den raka slutsatsen av båda labbtesterna. Råd & Rön har provat 62 robotar mellan 1 000 och 17 000 kronor och skriver att roboten sopar i stället för att suga, eftersom den saknar det munstycke som skapar vakuum i en vanlig dammsugare. Samtliga 62 får lägsta möjliga betyg för att få upp damm ur springor i golvet, och på matta sugs nästan inget damm upp oavsett modell och pris. På hårt golv presterar de däremot betydligt bättre, och smulor och skräp klarar de flesta bra. Så tänk på roboten som något som håller undan mellan städningarna, inte som något som ersätter dem. Har du mycket heltäckningsmatta är det den vanliga dammsugaren som gör jobbet.",
  },
  {
    question: "Klarar en robotdammsugare trösklar?",
    answer:
      "Det beror på tröskeln, och det är den fråga du bör ställa först i ett svenskt hem. Ljud & Bild provade fyra robotar i mellanklassen och skriver att nordiska trösklar var en av de största utmaningarna i hela grupptestet, där en av de fyra fick ge upp helt. Att både Roborock och Dreame säljer en tröskelramp som tillbehör, för 330 respektive 199 kronor, bekräftar bilden. Praktiskt råd: mät din högsta tröskel innan du väljer robot. Bland de rankade anger Dreame L50s Pro Ultra 40 millimeter, och Dreame X60 Ultra uppger 8,8 centimeter men kostar 14 990 kronor. Var medveten om att talen kommer från tillverkarna själva och att ingen anger provmetod, så de är uppgifter och inte mätvärden.",
  },
  {
    question: "Hur bra moppar en robotdammsugare egentligen?",
    answer:
      "Dåligt, men det skiljer mycket mellan konstruktionerna. Råd & Rön stämplade labbets golv med tassavtryck av lera och lät robotarna moppa upp dem, och där blir betygen i vissa fall höga. En lågprisrobot får till och med maxbetyg. Chokladfläckar är svårare, och där delas många ettor ut, med noteringen att robotarna ofta smetar ut chokladen så att golvet ser smutsigare ut efter moppningen än före. Det som avgör är hur moppen hålls ren under passet. En fuktig duk som släpas runt blir smutsig tidigt och flyttar sedan smuts. En rullmopp som sköljs och skrapas kontinuerligt möter golvet ren även på sista varvet, och det är därför moppningen väger tyngst i vår rankning. En sak gäller alla: moppvattnet töms inte i stationen utan måste bytas för hand efter varje moppning.",
  },
  {
    question: "Räcker det med en billig robotdammsugare?",
    answer:
      "Om du har hårda golv, inga mattor och inga förväntningar på moppen, ja. Xiaomi S40 för 1 999 kronor har lasernavigering, så den kör i ordnade banor i stället för slumpvis, och batteriet räcker för en normal lägenhet. Kör du den ofta håller den undan damm och smulor, vilket är det robotar är bäst på. Tömningsstation får du inte, så du tömmer den lilla behållaren för hand, och Råd & Rön beskriver just den uppgiften som besvärlig eftersom behållaren ofta är svår att få loss utan att damm ramlar ut. Moppen är en fuktig duk utan tvätt och utan torkning, den konstruktion labben kritiserar hårdast. Har du mattor, husdjur eller trösklar är steget till Roborock QR 798 för 3 990 kronor det som ger mest tillbaka: sju veckor mellan tömningarna och kartor för fyra våningar.",
  },
  {
    question: "Låter en robotdammsugare mycket?",
    answer:
      "Roboten själv går att stå ut med. Tömningsstationen gör det knappt. Råd & Rön placerade en mikrofon 1,6 meter från robotarna och kom fram till att betygen i bästa fall blir medelmåttiga och att de flesta låter rätt illa. Men det är när stationen tar emot smutsen från roboten som det blir riktigt påfrestande: där är det bottenbetyg genomgående, och den värsta stationen ligger på 80 decibel. Det motsvarar ungefär ljudet från en trafikerad gata, inne i ditt vardagsrum. Tömningen tar visserligen bara några sekunder, men schemalägg städningen till när ingen är hemma. En kuriositet ur samma test: alla robotar utom tre pratar, och kan säga allt från att de börjar städa till diverse felmeddelanden.",
  },
  {
    question: "Behöver jag en robotdammsugare med tömningsstation?",
    answer:
      "Det är den funktion som gör mest skillnad för hur ofta du måste befatta dig med maskinen, och samtidigt den som höjer priset mest. Utan station tömmer du robotens egen behållare, som rymmer några deciliter, ungefär varje eller varannan körning. Med station åker roboten dit själv och tömmer, och stationerna rymmer enligt Råd & Rön ungefär tio gånger så mycket som robotens interna behållare. Roborock QR 798 anger upp till sju veckor mellan tömningarna. Stationen låter dock mycket när den tar emot smutsen, upp till 80 decibel enligt labbet. Och den tar plats: räkna med en pall bredvid väggen, inte en liten docka.",
  },
  {
    question: "Fastnar hår och djurhår i robotdammsugaren?",
    answer:
      "Ja, och det är ett av de mest konkreta besvären med en robot. Betygen för att få bort djurhår från matta är i flera fall hyfsade, men håren fastnade ofta i robotarnas borstar under Råd & Röns test. Deras råd är rakt: räkna med att behöva rengöra borstarna ofta om du har hund eller katt. Flera tillverkare svarar med borstar som är formade för att leda ut håret i stället för att låta det linda sig, och bland de rankade har Aqua10 Ultra Roller, Qrevo Curv 2 Flow och L50s Pro Ultra alla någon variant av dubbelborste med den funktionen. Räkna ändå med underhåll, och notera att labbet ger låga betyg genomgående för hur lätt borstar och filter är att komma åt och byta.",
  },
  {
    question: "Hur mycket el drar en robotdammsugare?",
    answer:
      "Städningen drar lite. Det är standbyläget som kostar. Råd & Rön ger de flesta robotar låga betyg för energiförbrukning, och skälet är standbyläget: maskinerna drar flera watt i timmen medan de bara står i dockan och väntar. Labbet är samtidigt tydligt med proportionerna. Det blir många kilowattimmar i onödig förbrukning räknat på hela samhället, men din egen elräkning påverkas bara marginellt. Stiftung Warentest mätte skillnaderna mellan modeller och fann dem betydande: den snålaste roboten drar över ett år långt mindre än en sladdad eller batteridriven dammsugare, medan den törstigaste kombimaskinen drar lika mycket som en betydligt starkare vanlig dammsugare. Förbrukningen står sällan på förpackningen.",
  },
  {
    question: "Kan roboten köra ner för trappan?",
    answer:
      "Nej. Det är en av få saker där hela kategorin får godkänt utan förbehåll. Råd & Rön skriver att samtliga modeller i deras test vänder om när de kommer för nära trappans öppning, så har du fler än en våning behöver du inte oroa dig för det. Vad du däremot behöver veta är att roboten inte tar sig mellan våningarna själv. Flera modeller kan spara flera kartor, till exempel Roborock QR 798 som klarar fyra våningar, men du bär roboten dit. Vill du ha automatik på övervåningen behöver du en robot till, eller acceptera att bära.",
  },
  {
    question: "Respekterar robotdammsugaren de zoner jag ritar upp i appen?",
    answer:
      "Nästan alltid, men inte alltid. Av de robotar i Råd & Röns test som över huvud taget kan sätta virtuella begränsningar, 13 stycken, respekterade 11 den gräns labbet ritade upp i provrummet. Två gjorde det inte. Det är värt att veta om du tänkt använda funktionen för något som spelar roll, till exempel att hålla roboten borta från hundskålarna eller från ett rum med sladdar på golvet. Testa gränsen ett par gånger medan du är hemma innan du litar på den. Och kom ihåg det praktiska: Råd & Rön fann att fler än hälften av robotarna trasslade in sig i elsladden de lagt längs väggen i köket, så en zon är ingen ersättning för att plocka undan sladdar.",
  },
];
