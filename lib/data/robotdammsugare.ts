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
 * passerhöjd, mopptvättens temperatur, dammbehållare, batterikapacitet,
 * körtid och robotens höjd. Allt läst 2026-08-06 hos tillverkarens egen
 * svenska butik, i den manual butiken länkar till, eller i Icecat på GTIN.
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
 * ligger på 20 000". Det var fel. Ljud & Bilds test av Saros 20 Sonic anger
 * **36 000 Pa**, och Roborock anger sedermera samma tal i sin egen FAQ.
 * Talen är inte jämförbara mellan märken eftersom ingen anger provmetod, och
 * Råd & Rön är tydliga med varför det inte spelar roll ändå: roboten har
 * inget munstycke som skapar vakuum, den sopar i stället för att suga.
 *
 * ## ⚠️⚠️ Rättat 2026-08-06: passerhöjden fanns hela tiden
 *
 * Sidan påstod på sex av sju produkter att passerhöjden inte publiceras.
 * **Fyra av de sex påståendena var falska**, och samtliga fyra svaren låg på
 * den sida vi redan länkade priset till:
 *
 * | Modell | Vi skrev | Vad som faktiskt står |
 * |---|---|---|
 * | Aqua10 Ultra Roller | "anger ingen passerhöjd" | 4,2 cm enkelsteg, 8 cm tvåstegs |
 * | Saros 20 Sonic | "ingen passerhöjd anges" | 4,5 cm enkelsteg, 8,8 cm max, i Roborocks egen FAQ |
 * | Xiaomi S40 | "ingen angiven passerhöjd" | 20 mm, med provbeskrivning |
 * | L50s Pro Ultra | "40 mm, högsta angivna" | 40 mm gäller **tvåstegströskel**, enkelsteget är 22 mm |
 *
 * Den sista är den dyraste. Dreames egen fotnot säger att 40 mm förutsätter en
 * tröskel med två steg med mer än 3 cm mellan stegen; över en vanlig list i
 * ett steg klarar roboten 22 mm. Sidan sålde L50s Pro Ultra på ett tal som
 * gällde något annat än det läsaren mäter med tumstock, gav den 5,0 på
 * tröskelkriteriet och lyfte den över Saros 20 Sonic. Se lib/corrections.ts.
 *
 * Kvar som verklig frånvaro efter kontroll av butikssida, manual och Icecat:
 * **Qrevo Curv 2 Flow, L10s Ultra Gen 3 och QR 798.** De står som streck i
 * tabellen och nämns inte i texten. Ett tomt fält är inte ett ämne.
 *
 * ⚠️ Förbehållet står kvar: passerhöjderna kommer från tillverkarna själva.
 * Dreame, Roborock och Xiaomi anger alla att talet är uppmätt i eget labb,
 * ingen anger en gemensam provmetod, och talen används därför som uppgift och
 * aldrig som mätning. Skillnaden mot pascaltalet är ändå reell: en
 * passerhöjd i millimeter går att hålla en tumstock mot.
 *
 * ## Om testomdöme
 *
 * Det finns inget eget kriterium för det, efter användarbeslut 2026-08-04.
 * Råd & Rön har provat 62 robotar och Stiftung Warentest provar efter
 * DIN EN 62929, men båda har betalvägg på produktnivå. Att bygga ett kriterium
 * på betyg vi inte får läsa hade varit ett sken av mätning. Labben citeras i
 * stället för sina metodfynd, som gäller hela kategorin.
 *
 * Fritt läsbara omdömen per produkt finns hos Ljud & Bild, och de täcker tre
 * av de sju: Aqua10 Ultra Roller, Qrevo Curv 2 Flow och Saros 20 Sonic. Där
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

export const PRICE_CHECKED = "2026-08-06";

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
      /* 4,5, höjd från 4,0 den 2026-08-06. 4,2 cm enkelsteg och 8 cm tvåstegs
         står i Dreames egen specifikationstabell, och vi skrev att uppgiften
         saknades. Näst högsta enkelsteget efter Saros 20 Sonics 4,5 cm. */
      trosklar: 4.5,
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
      "Tar sig över 42 millimeters tröskel, 80 om tröskeln har två steg",
      "Stationen tvättar rullen i 100 grader och torkar den efteråt",
      "Moppskyddet fälls ner över rullen när roboten kör upp på matta",
    ],
    cons: [
      "Dyrast av robotarna i jämförelsen, 5 900 kronor upp till tvåan",
      "Rullen och filtret är egna reservdelar, filter 349 kronor",
      "Moppvattnet byter du för hand efter varje pass",
      "Lyft LDS-sensor gör roboten 120 millimeter hög och stänger vissa möbler",
    ],
    specs: [
      { label: "Pris", value: "14 890 kr", highlight: true },
      { label: "Moppsystem", value: "Rullmopp med självrengöring under drift", highlight: true },
      { label: "Mopptvätt", value: "100 °C med varmluftstorkning", highlight: true },
      /* 4,2 cm enkelsteg / 8 cm tvåstegs, Dreames specifikationstabell läst
         2026-08-06. Fotnoten: tvåstegstalet förutsätter att det nedre stegets
         ovansida är mer än 8 cm bred. Egna labbtester, ingen gemensam metod. */
      { label: "Passerhöjd", value: "42 mm (80 mm över tvåstegströskel)", highlight: true },
      { label: "Sugkraft", value: "30 000 Pa", highlight: true },
      { label: "Station", value: "Självtömmande, 3,2 liters påse", highlight: true },
      { label: "Navigering", value: "VersaLift-LDS med OmniSight 2.0", highlight: true },
      { label: "Dammbehållare", value: "220 ml i roboten", highlight: true },
      { label: "Batteri", value: "6 400 mAh" },
      { label: "Borste", value: "Dubbel, trasselutredande" },
      { label: "Ljudnivå", value: "Från 37 dB(A)" },
      { label: "Höjd", value: "97,5 mm (120 mm med upphöjd LDS)" },
      { label: "Butik", value: "Dreames egen svenska butik" },
    ],
    verdict:
      "Aqua10 Ultra Roller har en rullmopp som sköljs och skrapas ren under drift. Duken som möter golvet på sista varvet är alltså lika ren som på det första. Den kostar 14 890 kronor.\n\nDet angriper precis den svaghet båda labben pekar ut. Råd & Rön lät 62 robotar moppa upp lera och choklad och delade ut många ettor, med noteringen att chokladen ofta smetas ut så att golvet ser smutsigare ut efteråt än före. Stationen tvättar rullen i 100 grader och torkar den med varmluft, så moppen inte börjar lukta efter några veckor. Över trösklar tar roboten sig 42 millimeter, och 80 om tröskeln har två steg. Det är mer än dubbelt mot de 10 till 20 millimeter Ljud & Bild uppger att de flesta städrobotar klarar. Om Dreames första robot med mopprulle skriver de att den är nästan perfekt.\n\nPriset är det verkliga argumentet emot. 5 900 kronor skiljer ner till Saros 20 Sonic, som tar sig över ännu högre trösklar. Och moppvattnet byter du för hand efter varje pass, precis som på varenda annan robot här.\n\nSka moppen faktiskt göra något åt golvet är det här roboten att köpa.",
  },
  {
    id: "roborock-saros-20-sonic",
    name: "Saros 20 Sonic",
    shortName: "Saros 20 Sonic",
    brand: "Roborock",
    image: productImage(ROBOTDAMMSUGARE.slug, "roborock-saros-20-sonic"),
    tagline: "Kommer in i rummen där andra robotar vänder.",
    scores: {
      moppning: 4,
      /* 5,0, höjd från 4,5 den 2026-08-06. 4,5 cm enkelsteg och 8,8 cm max
         står i Roborocks egen FAQ på den svenska produktsidan. Högsta
         enkelsteget i hela jämförelsen, och AdaptiLift-chassit lyfter sig. */
      trosklar: 5,
      station: 4,
      navigering: 4,
      prisvarde: 3.5,
    },
    price: 8990,
    merchant: PROSHOP,
    merchantUrl: `${PROSHOP_BASE}/Roborock-Robotdammsugare-Saros-20-Sonic-White/3457221`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för hem med höga trösklar",
    pros: [
      "Klarar 45 millimeters tröskel i ett steg, högst av robotarna i jämförelsen",
      "Chassit lyfter sig över listen i stället för att köra rakt på den",
      "Stationen tvättar moppen i 100 grader och torkar dammpåsen i 55",
      "79,8 millimeter hög, så den kommer in under lägre möbler än de andra",
    ],
    cons: [
      "Vibrerande dukmopp, alltså samma duk hela passet",
      "Moppfästen och borstskydd är förbrukningsdelar, 220 respektive 290 kronor",
      "56 till 64 dB(A) under städning, så den passar illa när någon sover",
    ],
    specs: [
      { label: "Pris", value: "8 990 kr", highlight: true },
      { label: "Moppsystem", value: "Vibrerande mopp, förlängbar", highlight: true },
      { label: "Mopptvätt", value: "100 °C, 55 °C torkning av dammpåsen", highlight: true },
      /* 4,5 cm enkelsteg, 4,5 + 4,3 cm tvåstegs, 8,8 cm max. Roborocks egen
         FAQ på den svenska produktsidan, läst 2026-08-06, fråga 5. */
      { label: "Passerhöjd", value: "45 mm (88 mm som mest)", highlight: true },
      { label: "Sugkraft", value: "36 000 Pa", highlight: true },
      { label: "Station", value: "RockDock, självtömmande", highlight: true },
      { label: "Navigering", value: "RetractSense LiDAR med Reactive AI 3.0", highlight: true },
      { label: "Dammbehållare", value: "228 ml i roboten", highlight: true },
      { label: "Batteri", value: "6 400 mAh" },
      { label: "Batteritid", value: "200 min" },
      { label: "Ljudnivå", value: "56–64 dB(A)" },
      { label: "Höjd", value: "79,8 mm" },
      { label: "GTIN", value: "6936905905376" },
    ],
    verdict:
      "Saros 20 Sonic tar sig över högre trösklar än någon annan robot här: 45 millimeter i ett steg och 88 som mest. Den kostar 8 990 kronor.\n\nDet är två till fyra gånger de 10 till 20 millimeter Ljud & Bild uppger att de flesta städrobotar klarar, och trösklarna är vad som fäller robotar i svenska hem: en av fyra fick ge upp helt i deras grupptest. Chassit lyfter sig över listen i stället för att köra rakt på den. Stationen tvättar moppen i 100 grader och torkar dammpåsen med 55-gradig varmluft, så påsen inte hinner lukta mellan tömningarna. Och med 79,8 millimeters höjd är den lägsta roboten här, nästan två centimeter under de andra, vilket avgör om den kommer in under soffan eller sängen.\n\nMoppen är svagheten. Den vibrerar, vilket lossar intorkad smuts bättre än en duk som bara släpas, men det är fortfarande samma duk hela passet.\n\nHar du lister mellan varje rum är det här roboten som kommer in i alla. Bryr du dig mer om moppen än om trösklarna får du lägga 5 900 kronor till på Aqua10 Ultra Roller.",
  },
  {
    id: "dreame-l50s-pro-ultra",
    name: "L50s Pro Ultra",
    shortName: "L50s Pro Ultra",
    brand: "Dreame",
    image: productImage(ROBOTDAMMSUGARE.slug, "dreame-l50s-pro-ultra"),
    tagline: "Tvättar moppen i 100 grader efter varje pass.",
    scores: {
      moppning: 4,
      /* 3,5, sänkt från 5,0 den 2026-08-06. De 40 mm sidan sålde den på är
         Dreames tvåstegstal; enkelsteget, alltså en vanlig list, är 22 mm.
         Se rättelsen i lib/corrections.ts. */
      trosklar: 3.5,
      station: 4,
      navigering: 3.5,
      prisvarde: 4,
    },
    price: 7990,
    merchant: PROSHOP,
    merchantUrl: `${PROSHOP_BASE}/Dreame-Robotdammsugare-L50s-Pro-Ultra-White/3467918`,
    priceCheckedAt: PRICE_CHECKED,
    /* Håll den kort. 41 tecken klipptes av i kortets 222 px breda slot, mätt
       med scrollWidth mot clientWidth på 1440 px. Taket ligger runt 35. */
    superlative: "Bäst mopphygien under 8 000 kr",
    pros: [
      "Billigaste roboten här som tvättar moppen i 100-gradigt vatten",
      "Varmluftstorkning i stationen, så moppen inte möglar mellan passen",
      "Dubbelborste som leder ut håret i stället för att låta det linda sig",
      "3,2 liters dammpåse i stationen, samma som robotar för dubbla priset",
    ],
    cons: [
      "Klarar 22 millimeters tröskel i ett steg, hälften av Saros 20 Sonic",
      "Roterande dukmoppar, alltså samma dukar hela passet",
      "Navigeringen är enklare än hos de två i toppen",
    ],
    specs: [
      { label: "Pris", value: "7 990 kr", highlight: true },
      { label: "Moppsystem", value: "Roterande moppar med tvätt i stationen", highlight: true },
      { label: "Mopptvätt", value: "100 °C med varmluftstorkning", highlight: true },
      /* 2,2 cm enkelsteg / 4 cm tvåstegs, Dreames specifikationstabell och
         fotnot, läst 2026-08-06: "För en enda hinderpassering och ett enda
         vertikalt steg är den högsta hinderpasseringshöjden 2,2 cm." */
      { label: "Passerhöjd", value: "22 mm (40 mm över tvåstegströskel)", highlight: true },
      { label: "Sugkraft", value: "30 000 Pa", highlight: true },
      { label: "Station", value: "ThermoHub, självtömmande 3,2 liters påse", highlight: true },
      { label: "Navigering", value: "LiDAR med flexarmar", highlight: true },
      { label: "Dammbehållare", value: "250 ml i roboten", highlight: true },
      { label: "Batteri", value: "5 200 mAh" },
      { label: "Borste", value: "Dubbel, trasselutredande" },
      { label: "Höjd", value: "103,8 mm" },
      { label: "GTIN", value: "6979181920589" },
    ],
    verdict:
      "L50s Pro Ultra tvättar moppen i 100-gradigt vatten och torkar den med varmluft i stationen, och är den billigaste roboten här som gör det. Priset är 7 990 kronor.\n\nEn mopp som torkar blöt i en sluten docka börjar lukta inom några veckor, och det är den lukten hela stationen finns för. Dubbelborsten leder ut håret i stället för att låta det linda sig runt valsen, vilket Råd & Rön beskriver som ett av de mest konkreta besvären med att äga en robot: håren fastnade ofta, och deras råd till hund- och kattägare är att räkna med att rengöra borstarna ofta. Dammpåsen rymmer 3,2 liter, lika mycket som i stationer till robotar för dubbla priset.\n\nTrösklarna är svagare än marknadsföringen låter påskina. De 40 millimeter Dreame skyltar med gäller en tröskel med två steg. Över en vanlig list i ett steg tar sig roboten 22 millimeter, alltså hälften av vad Saros 20 Sonic klarar för 1 000 kronor mer.\n\nHar du jämna golv och vill att moppen ska sköta sig själv räcker den här gott. Vet du redan att listen mellan hall och vardagsrum är besvärlig, mät den innan du beställer.",
  },
  {
    id: "roborock-qrevo-curv-2-flow",
    name: "Qrevo Curv 2 Flow",
    shortName: "Qrevo Curv 2 Flow",
    brand: "Roborock",
    image: productImage(ROBOTDAMMSUGARE.slug, "roborock-qrevo-curv-2-flow"),
    tagline: "270 millimeter bred rulle som skrapas ren under drift.",
    scores: {
      moppning: 4.5,
      /* 3,0, sänkt från 4,0 den 2026-08-06. Ingen passerhöjd publicerad på
         svensk sida, amerikansk sida eller i manualen, och roboten saknar
         lyftchassi. Betyget bedömer konstruktionen, inte publiceringen. */
      trosklar: 3,
      station: 4,
      /* 3,5, sänkt från 4,5 den 2026-08-06. Ljud & Bild har provat exakt den
         här modellen och skriver att den har svårt med orienteringen och en
         tung bakdel. Det var sidans högsta navigeringsbetyg. */
      navigering: 3.5,
      prisvarde: 3,
    },
    price: 11490,
    merchant: ROBOROCK,
    merchantUrl: "https://se.roborock.com/products/roborock-qrevo-curv-2-flow",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för stora golvytor i ett svep",
    pros: [
      "Rullmopp som skrapas ren i realtid, samma princip som vinnaren",
      "270 millimeter bred rulle som trycker med 15 newton mot golvet",
      "Rullen lyfts 15 millimeter över mattan, så mattan förblir torr",
      "Känner igen över 200 sorters föremål, sladdar på golvet inräknade",
    ],
    cons: [
      "Ljud & Bild fann att den har svårt med orienteringen och en tung bakdel",
      "Tillbehörsset och borstskydd är egna köp, 540 respektive 210 kronor",
      "119 millimeter hög med fast lidar, så låga möbler stänger den ute",
      "Mopptvätten går på 75 grader, mot 100 hos billigare robotar här",
    ],
    specs: [
      { label: "Pris", value: "11 490 kr", highlight: true },
      { label: "Moppsystem", value: "Rullmopp, självrengöring i realtid", highlight: true },
      { label: "Mopptvätt", value: "75 °C, 55 °C varmluftstorkning", highlight: true },
      { label: "Sugkraft", value: "20 000 Pa", highlight: true },
      { label: "Station", value: "Självtömmande, 2,5 liters påse", highlight: true },
      { label: "Navigering", value: "PreciSense LiDAR med Reactive AI", highlight: true },
      { label: "Dammbehållare", value: "324 ml i roboten", highlight: true },
      { label: "Borste", value: "Dubbel, trasselfri" },
      /* Batteriet står i den manual Roborock länkar från produktsidan,
         "14,4 V/5 200 mAh (TYP) litiumjonbatteri", läst 2026-08-06. */
      { label: "Batteri", value: "5 200 mAh" },
      { label: "Kartor", value: "Upp till fyra våningar" },
      { label: "Ljudnivå", value: "Från 64 dB(A)" },
      { label: "Höjd", value: "119 mm" },
      { label: "Butik", value: "Roborocks egen svenska butik" },
    ],
    verdict:
      "Qrevo Curv 2 Flow har samma sorts rullmopp som vinnaren: åtta återfuktningspunkter och en inbyggd skrapa håller rullen ren genom hela passet. Den kostar 11 490 kronor.\n\nRullen är 270 millimeter bred och trycker med 15 newton mot golvet, alltså det som lossar intorkad smuts snarare än flyttar den. Stationen tvättar den i 75 grader och torkar med varmluft. Går roboten upp på en matta lyfts rullen 15 millimeter, så mattan förblir torr medan resten av golvet moppas. Och hinderigenkänningen läser över 200 sorters föremål, däribland sladden längs väggen som fler än hälften av Råd & Röns 62 robotar trasslade in sig i.\n\nLjud & Bild har provat just den här maskinen och skriver att den har svårt med orienteringen och har en tung bakdel. Det är det enda svenska omdömet om modellen, och en robot som tappar bort sig städar mindre av golvet oavsett hur bra moppen är.\n\nVill du ha rullmopp och tycker att vinnarens 3 400 kronor extra är för mycket är det här alternativet. De flesta får mer robot för pengarna hos Saros 20 Sonic, som kostar 2 500 kronor mindre.",
  },
  {
    id: "dreame-l10s-ultra-gen-3",
    name: "L10s Ultra Gen 3",
    shortName: "L10s Ultra Gen 3",
    brand: "Dreame",
    image: productImage(ROBOTDAMMSUGARE.slug, "dreame-l10s-ultra-gen-3"),
    tagline: "Flexarmar som når in i hörnen andra robotar rundar.",
    scores: {
      moppning: 3.5,
      /* 2,5, sänkt från 3,0 den 2026-08-06. Ingen passerhöjd i Dreames
         specifikationstabell för den här modellen, och inget lyftchassi. */
      trosklar: 2.5,
      station: 4,
      navigering: 3.5,
      prisvarde: 5,
    },
    price: 4990,
    merchant: PROSHOP,
    merchantUrl: `${PROSHOP_BASE}/Dreame-Robotdammsugare-L10s-Ultra-Gen-3-White/3434017`,
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Mest robot för under 5 000 kr",
    pros: [
      "3,2 liters dammpåse i stationen ger veckor mellan tömningarna",
      "Mopp och sidoborste skjuts ut 4 centimeter och når in i hörn",
      "231 minuters körtid, alltså en hel våning på en laddning",
      "Mopplyft på 10,5 millimeter håller mattan torr",
    ],
    cons: [
      "Roterande dukmoppar utan tvätt i hög temperatur mellan varven",
      "Klarar inga höga trösklar, och chassit lyfter sig inte",
      "Sugkraftstalet är just det tal Stiftung Warentest säger att du ska bortse från",
    ],
    specs: [
      { label: "Pris", value: "4 990 kr", highlight: true },
      { label: "Moppsystem", value: "Roterande dukmoppar, mopplyft 10,5 mm", highlight: true },
      { label: "Sugkraft", value: "25 000 Pa", highlight: true },
      { label: "Station", value: "PowerDock, självtömmande 3,2 liters påse", highlight: true },
      { label: "Navigering", value: "3D Adapt hinderundvikning", highlight: true },
      { label: "Dammbehållare", value: "250 ml i roboten", highlight: true },
      { label: "Batteri", value: "5 200 mAh" },
      { label: "Batteritid", value: "231 min" },
      { label: "Hörn", value: "Två flexarmar, 4 cm utskjut" },
      { label: "Kartor", value: "Upp till fyra våningar" },
      { label: "Höjd", value: "97 mm" },
      { label: "GTIN", value: "6978515257025" },
    ],
    verdict:
      "För 4 990 kronor får du en fullstor station med 3,2 liters dammpåse, alltså veckor mellan tömningarna, och 231 minuters körtid på en laddning.\n\nMopp och sidoborste skjuts ut fyra centimeter ur chassit när roboten kör längs en vägg, så socklarna och hörnen får en överfart de annars missar. Just den ytan är vad Stiftung Warentest mäter när de lägger kaffepulver i en tio centimeter bred remsa längs väggarna, och det är där robotar normalt tappar mest. Mopplyftet på 10,5 millimeter räcker för att hålla en vanlig matta torr, och kartorna täcker fyra våningar.\n\nMoppen är det du får mindre av. Roterande dukar, samma dukar hela passet, utan tvätt i hög temperatur mellan varven. Prislappen visar samtidigt varför pascaltalet inte betyder något: Dreame anger 25 000 pascal här och Roborock 20 000 för en robot som kostar 11 490.\n\nDet här är mest robot för pengarna på hela sidan. Vill du att moppen ska göra mer än fukta golvet lägger du 3 000 kronor till på L50s Pro Ultra.",
  },
  {
    id: "roborock-qr-798",
    name: "QR 798",
    shortName: "QR 798",
    brand: "Roborock",
    image: productImage(ROBOTDAMMSUGARE.slug, "roborock-qr-798"),
    tagline: "Sju veckor mellan tömningarna.",
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
      "Upp till sju veckors automatiskt underhåll, längst av robotarna här",
      "LiDAR-navigering och kartor för fyra våningar i det här priset",
      "330 milliliters behållare i roboten, störst i mellanskiktet",
      "Ultraljudssensor lyfter mopparna när roboten känner matta",
    ],
    cons: [
      "Roterande dukmopp utan tvätt och utan torkning i stationen",
      "65 dB(A) under städning, och tömningen låter mer än så",
      "Klarar inga höga trösklar, och chassit lyfter sig inte",
    ],
    specs: [
      { label: "Pris", value: "3 990 kr", highlight: true },
      { label: "Moppsystem", value: "Lyftbar dukmopp, upp till 200 varv/min", highlight: true },
      { label: "Sugkraft", value: "10 000 Pa", highlight: true },
      { label: "Station", value: "Självtömmande, 2,7 liters påse", highlight: true },
      { label: "Navigering", value: "LiDAR, Reactive Tech och ultraljud", highlight: true },
      /* 0,33 l, Icecat på GTIN 6936905901682, läst 2026-08-06. Samma post ger
         batteri, körtid, ljudnivå och höjd. Roborock säljer inte modellen i
         sin svenska butik, så butiksdatan hos Proshop är tunn. */
      { label: "Dammbehållare", value: "330 ml i roboten", highlight: true },
      { label: "Tömningsintervall", value: "Upp till 7 veckor" },
      { label: "Batteri", value: "5 200 mAh" },
      { label: "Batteritid", value: "180 min" },
      { label: "Kartor", value: "Upp till fyra våningar" },
      { label: "Ljudnivå", value: "65 dB(A)" },
      { label: "Höjd", value: "96,5 mm" },
      { label: "GTIN", value: "6936905901682" },
    ],
    verdict:
      "Sju veckor mellan tömningarna är det längsta intervallet här, och måttet som avgör hur ofta du alls behöver befatta dig med roboten. QR 798 kostar 3 990 kronor.\n\nRåd & Rön är hårda mot underhållet rakt igenom: robotens egen behållare är ofta svår att få loss utan att damm ramlar ut, och att byta borstar och filter får låga betyg genomgående. Ju färre gånger du behöver göra det, desto mindre spelar det roll att det är bökigt. För pengarna får du dessutom LiDAR, kartor för fyra våningar och 180 minuters körtid, funktioner som normalt ligger ett prisskikt högre. En ultraljudssensor lyfter mopparna när roboten känner matta, så du slipper välja mellan att moppa golvet och att blöta mattan.\n\nMoppen roterar men förblir en duk, utan tvätt och utan torkning i stationen. Och 65 decibel under städning är hörbart genom en stängd dörr. Tömningen låter mer än så, och den värsta stationen Råd & Rön mätte låg på 80.\n\nBor du i lägenhet med jämna golv finns det liten anledning att betala mer. Har du lister mellan rummen är Saros 20 Sonic den som faktiskt tar sig över dem.",
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
      /* 2,5, höjd från 2,0 den 2026-08-06. Xiaomi anger 20 mm passerhöjd med
         beskriven provning, och vi skrev att uppgift saknades. */
      trosklar: 2.5,
      station: 1.5,
      navigering: 3,
      prisvarde: 4,
    },
    /* 2 290 kr hos Proshop 2026-08-06, upp från 1 990 vid förra kontrollen. */
    price: 2290,
    merchant: PROSHOP,
    merchantUrl: `${PROSHOP_BASE}/Xiaomi-Robotdammsugare-S40-EU/3403675`,
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast av robotarna",
    pros: [
      "Lasernavigering trots priset, så den kör i mönster och inte slumpvis",
      "520 milliliters dammbehållare, störst av robotarna i jämförelsen",
      "180 minuters körtid räcker för en normal lägenhet på en laddning",
      "Tar sig över 20 millimeters tröskel, vilket täcker många innerdörrar",
    ],
    cons: [
      "Ingen tömningsstation, så du tömmer behållaren för hand",
      "Moppen är en fuktig duk som släpas runt hela passet",
      "Ingen mopptvätt och ingen torkning",
      "270 milliliters vattentank räcker inte för hela lägenheten i ett pass",
    ],
    specs: [
      { label: "Pris", value: "2 290 kr", highlight: true },
      { label: "Moppsystem", value: "Fuktig duk, ingen tvätt", highlight: true },
      /* 20 mm, mi.com globalt, läst 2026-08-06, med provbeskrivning: gäller
         när moppdynan är torr. */
      { label: "Passerhöjd", value: "20 mm", highlight: true },
      { label: "Sugkraft", value: "10 000 Pa", highlight: true },
      { label: "Station", value: "Laddning, ingen tömning", highlight: true },
      { label: "Navigering", value: "LDS-lasernavigering", highlight: true },
      { label: "Dammbehållare", value: "520 ml i roboten", highlight: true },
      { label: "Batteri", value: "5 200 mAh" },
      { label: "Batteritid", value: "180 min" },
      { label: "Vattentank", value: "270 ml" },
      { label: "GTIN", value: "6932554440893" },
    ],
    verdict:
      "Xiaomi S40 kostar 2 290 kronor och har lasernavigering, vilket sällan finns i det priset.\n\nRoboten kör i ordnade banor och studsar inte runt slumpvis, och batteriet räcker 180 minuter, alltså en normal lägenhet på en laddning. Dammbehållaren rymmer 520 milliliter, mer än dubbelt mot vad robotarna i mellanskiktet har i sina, vilket är tur eftersom du tömmer den för hand. Över en tröskel tar den sig 20 millimeter, så en vanlig innerdörrslist stoppar den inte.\n\nMoppningen bör du betrakta som obefintlig. En fuktig duk som släpas runt hela passet, utan tvätt och utan torkning, är den konstruktion båda labben kritiserar hårdast, och 270 milliliter vatten räcker ändå inte för hela lägenheten.\n\nPå ett hårt golv utan mattor håller den undan damm och smulor, och det är det robotar är bäst på enligt Råd & Rön. Vill du moppa golv gör du det själv, eller lägger 1 700 kronor till på QR 798 och får en station på köpet.",
  },
];

export const ROBOTDAMMSUGARE_PRODUCTS = resolveProducts(ROBOTDAMMSUGARE, SEEDS);

export const ROBOTDAMMSUGARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "DJI",
    name: "ROMO P",
    reason:
      "Drönartillverkarens flaggskepp bland robotdammsugare och den mest omtalade nykomlingen just nu. Ljud & Bild har provat den: följsam och tyst, men den tappar ofta bort både sig själv och smutsen. Det omdömet fäller den mot maskiner som kostar mindre. Priset är 12 649 kronor hos Proshop, mer än andraplatsen.",
    approxPrice: 12649,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Robotdammsugare/DJI-Robotdammsugare-ROMO-P/3417381",
  },
  {
    brand: "Dreame",
    name: "X60 Ultra",
    reason:
      "Klättrar 8,8 centimeter och anger 35 000 pascal, och identifierar enligt Dreame upp till 280 objekttyper. Den kostar 14 990 kronor. Vi rankar den inte, eftersom Saros 20 Sonic når samma 8,8 centimeter för 6 000 kronor mindre och sugkraftstalet enligt Stiftung Warentest inte betyder något. Är du ändå ute efter mesta möjliga framkomlighet i ett hem med grova trösklar är det här maskinen att titta på.",
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
      "Finns hos Proshop för 7 299 respektive 7 499 kronor och konkurrerar rakt mot L50s Pro Ultra i pris. Ingen av de källor vi läser har ett fritt läsbart omdöme om dem, och vi rankar inte robotar vi varken kan belägga eller läsa ett omdöme om.",
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
      "Dreame Aqua10 Ultra Roller för 14 890 kronor, och skälet är moppen. Både Råd & Rön och Stiftung Warentest pekar ut moppningen som robotarnas svagaste funktion, och orsaken är att de flesta släpar runt samma fuktiga duk hela passet. Råd & Rön noterar att många smetar ut chokladfläckar så att golvet ser smutsigare ut efteråt än före. Aqua10 Ultra Roller har en rullmopp som sköljs och skrapas ren medan roboten arbetar, och stationen tvättar den sedan i 100 grader och torkar den. Ljud & Bild provade Dreames första robot med mopprulle och kallade den nästan perfekt. Vill du inte lägga så mycket är Roborock Saros 20 Sonic för 8 990 kronor det bästa köpet av robotarna i jämförelsen: den tar sig över 45 millimeters tröskel, högst av alla här, och tvättar också moppen i 100 grader.",
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
      "Det beror på tröskeln, och det är den fråga du bör ställa först i ett svenskt hem. Ljud & Bild provade fyra robotar i mellanklassen och skriver att nordiska trösklar var en av de största utmaningarna i hela grupptestet, där en av de fyra fick ge upp helt. De uppger också att de flesta städrobotar klarar 10 till 20 millimeter, vilket är mindre än många innerdörrslister. Bland de rankade tar sig Roborock Saros 20 Sonic över 45 millimeter i ett steg och 88 som mest, Dreame Aqua10 Ultra Roller 42 respektive 80, och Dreame L50s Pro Ultra 22 respektive 40. Läs de talen rätt: det högre gäller en tröskel med två steg, till exempel en skjutdörrsskena, och det lägre en vanlig list. Praktiskt råd: mät din högsta tröskel innan du väljer robot. Var också medveten om att talen kommer från tillverkarna själva, som anger att de mätt i eget labb utan gemensam provmetod.",
  },
  {
    question: "Hur bra moppar en robotdammsugare egentligen?",
    answer:
      "Dåligt, men det skiljer mycket mellan konstruktionerna. Råd & Rön stämplade labbets golv med tassavtryck av lera och lät robotarna moppa upp dem, och där blir betygen i vissa fall höga. En lågprisrobot får till och med maxbetyg. Chokladfläckar är svårare, och där delas många ettor ut, med noteringen att robotarna ofta smetar ut chokladen så att golvet ser smutsigare ut efter moppningen än före. Det som avgör är hur moppen hålls ren under passet. En fuktig duk som släpas runt blir smutsig tidigt och flyttar sedan smuts. En rullmopp som sköljs och skrapas kontinuerligt möter golvet ren även på sista varvet, och det är därför moppningen väger tyngst i vår rankning. En sak gäller alla: moppvattnet töms inte i stationen utan måste bytas för hand efter varje moppning.",
  },
  {
    question: "Räcker det med en billig robotdammsugare?",
    answer:
      "Om du har hårda golv, inga mattor och inga förväntningar på moppen, ja. Xiaomi S40 för 2 290 kronor har lasernavigering, så den kör i ordnade banor i stället för slumpvis, batteriet räcker 180 minuter och den tar sig över 20 millimeters tröskel. Kör du den ofta håller den undan damm och smulor, vilket är det robotar är bäst på. Tömningsstation får du inte, så du tömmer behållaren för hand, och Råd & Rön beskriver just den uppgiften som besvärlig eftersom behållaren ofta är svår att få loss utan att damm ramlar ut. Moppen är en fuktig duk utan tvätt och utan torkning, den konstruktion labben kritiserar hårdast. Har du mattor, husdjur eller trösklar är steget till Roborock QR 798 för 3 990 kronor det som ger mest tillbaka: sju veckor mellan tömningarna och kartor för fyra våningar.",
  },
  {
    question: "Låter en robotdammsugare mycket?",
    answer:
      "Roboten själv går att stå ut med. Tömningsstationen gör det knappt. Råd & Rön placerade en mikrofon 1,6 meter från robotarna och kom fram till att betygen i bästa fall blir medelmåttiga och att de flesta låter rätt illa. Men det är när stationen tar emot smutsen från roboten som det blir riktigt påfrestande: där är det bottenbetyg genomgående, och den värsta stationen ligger på 80 decibel. Det motsvarar ungefär ljudet från en trafikerad gata, inne i ditt vardagsrum. Tömningen tar visserligen bara några sekunder, men schemalägg städningen till när ingen är hemma. Bland de rankade spänner robotens eget ljud från 37 decibel för Aqua10 Ultra Roller till 65 för QR 798. En kuriositet ur samma test: alla robotar utom tre pratar, och kan säga allt från att de börjar städa till diverse felmeddelanden.",
  },
  {
    question: "Behöver jag en robotdammsugare med tömningsstation?",
    answer:
      "Det är den funktion som gör mest skillnad för hur ofta du måste befatta dig med maskinen, och samtidigt den som höjer priset mest. Utan station tömmer du robotens egen behållare, som rymmer några deciliter, ungefär varje eller varannan körning. Med station åker roboten dit själv och tömmer, och stationerna rymmer enligt Råd & Rön ungefär tio gånger så mycket som robotens interna behållare. Roborock QR 798 klarar upp till sju veckor mellan tömningarna. Stationen låter dock mycket när den tar emot smutsen, upp till 80 decibel enligt labbet. Och den tar plats: räkna med en pall bredvid väggen, inte en liten docka.",
  },
  {
    question: "Fastnar hår och djurhår i robotdammsugaren?",
    answer:
      "Ja, och det är ett av de mest konkreta besvären med en robot. Betygen för att få bort djurhår från matta är i flera fall hyfsade, men håren fastnade ofta i robotarnas borstar under Råd & Röns test. Deras råd är rakt: räkna med att behöva rengöra borstarna ofta om du har hund eller katt. Flera tillverkare svarar med borstar som är formade för att leda ut håret i stället för att låta det linda sig, och bland de rankade har Aqua10 Ultra Roller, Qrevo Curv 2 Flow och L50s Pro Ultra alla någon variant av dubbelborste med den funktionen. Räkna ändå med underhåll, och notera att labbet ger låga betyg genomgående för hur lätt borstar och filter är att komma åt och byta.",
  },
  {
    question: "Hur mycket el drar en robotdammsugare?",
    answer:
      "Städningen drar lite. Det är standbyläget som kostar. Råd & Rön ger de flesta robotar låga betyg för energiförbrukning, och skälet är standbyläget: maskinerna drar flera watt i timmen medan de bara står i dockan och väntar. Labbet är samtidigt tydligt med proportionerna. Det blir många kilowattimmar i onödig förbrukning räknat på hela samhället, men din egen elräkning påverkas bara marginellt. Stiftung Warentest mätte skillnaderna mellan modeller och fann dem betydande: den snålaste roboten drar över ett år långt mindre än en sladdad eller batteridriven dammsugare, medan den törstigaste kombimaskinen drar lika mycket som en betydligt starkare vanlig dammsugare.",
  },
  {
    question: "Kan roboten köra ner för trappan?",
    answer:
      "Nej. Det är en av få saker där hela kategorin får godkänt utan förbehåll. Råd & Rön skriver att samtliga modeller i deras test vänder om när de kommer för nära trappans öppning, så har du fler än en våning behöver du inte oroa dig för det. Vad du däremot behöver veta är att roboten inte tar sig mellan våningarna själv. Flera modeller kan spara flera kartor, till exempel Roborock QR 798 och Dreame L10s Ultra Gen 3 som båda klarar fyra våningar, men du bär roboten dit. Vill du ha automatik på övervåningen behöver du en robot till, eller acceptera att bära.",
  },
  {
    question: "Respekterar robotdammsugaren de zoner jag ritar upp i appen?",
    answer:
      "Nästan alltid, men inte alltid. Av de robotar i Råd & Röns test som över huvud taget kan sätta virtuella begränsningar, 13 stycken, respekterade 11 den gräns labbet ritade upp i provrummet. Två gjorde det inte. Det är värt att veta om du tänkt använda funktionen för något som spelar roll, till exempel att hålla roboten borta från hundskålarna eller från ett rum med sladdar på golvet. Testa gränsen ett par gånger medan du är hemma innan du litar på den. Och kom ihåg det praktiska: Råd & Rön fann att fler än hälften av robotarna trasslade in sig i elsladden de lagt längs väggen i köket, så en zon är ingen ersättning för att plocka undan sladdar.",
  },
];
