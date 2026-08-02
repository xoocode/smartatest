import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { UTOMHUSTIMER } from "@/lib/categories";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /utomhustimer.
 *
 * Priser, maxlaster, kapslingsklasser, drifttemperaturer och butiks-URL:er är
 * lästa ur butikernas egna produktsidor och deras JSON-LD på PRICE_CHECKED.
 *
 * ## Tre produkttyper i samma lista, med flit
 *
 * Mekanisk timer, digital veckotimer och smart plugg gör samma jobb i samma
 * uttag för samma köpare. Filtret ovanför tabellen delar upp dem, men
 * rankningen är gemensam eftersom det är den jämförelsen läsaren faktiskt
 * behöver och ingen svensk sida gör den. Se lib/categories.ts för resonemanget.
 *
 * ## Butikerna är spridda med flit
 *
 * Kjell fem, Jula tre, Proshop en, SmartaSaker en. Jula betalar oss ingenting
 * och finns inte i något nätverk vi kan söka till, men har kategorins billigaste
 * och bäst betygsatta produkt. Att i stället skicka den som söker en timer till
 * julbelysningen vidare till en plugg på 399 kronor vore precis det
 * förtroendebrott sajten finns för att undvika. Shelly Outdoor Plug S Gen3
 * länkas till Proshop på 297 kronor och inte till Kjell på 399, alltså 102
 * kronor billigare hos en butik vi ändå har.
 *
 * ## Det finns inget `testomdome` här
 *
 * Ingen oberoende part har testat kategorin på någon nordisk marknad. Kriteriet
 * finns därför inte alls, till skillnad från på /smart-plug (vikt 30) och
 * /elektrisk-rullgardin (vikt 10). Se lib/sources.ts.
 *
 * ## Tre produkter var slut vid priskontrollen
 *
 * Nedis Zigbee, och i noteringar även Popp och Cleverio GP100. Kategorin är
 * säsongsvara och lagret byggs upp inför hösten, men sidan är byggd i augusti
 * och det står i specen på varje berörd produkt. ⚠️ Kör om priskontrollen före
 * lansering.
 *
 * ## Rättelse till /smart-plug
 *
 * `SMART_PLUG_CONSIDERED` påstår att Cleverio GP120 har drifttemperatur ner
 * till −20 °C. Kjells produktsida anger 2026-08-01 ingen drifttemperatur alls
 * för den produkten, varken i specifikationen eller i produkttexten. Uppgiften
 * går inte att verifiera och ska tas bort därifrån.
 *
 * ⚠️ ÄNNU INTE PUBLICERBAR. Kriteriebetygen är redaktionell bedömning utifrån
 * specifikationer och källorna i lib/sources.ts, inte mätningar. Priser rör sig, kör om kontrollen före lansering.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans ännu. Se lib/links.ts.
 */

export const PRICE_CHECKED = "2026-08-01";

const SEEDS: ProductSeed[] = [
  {
    id: "tp-link-tapo-p410m",
    userRating: { value: 4.5, count: 15, checkedAt: PRICE_CHECKED },
    brand: "TP-Link",
    name: "Tapo P410M smart fjärrströmbrytare 3 680 W",
    shortName: "Tapo P410M",
    image: productImage(UTOMHUSTIMER.slug, "tp-link-tapo-p410m"),
    tagline:
      "Den enda med IP54 i stället för IP44, och den enda som klarar 16 A med Matter i samma produkt.",
    scores: {
      vaderskydd: 5,
      styrning: 5,
      maxlast: 5,
      driftsakerhet: 4,
      prisvarde: 3.5,
    },
    price: 399,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-utomhusbruk/tp-link-tapo-p410m-smart-fjarrstrombrytare-med-energimatning-3680-w-p60083",
    award: "winner",
    superlative: "Bäst i test",
    pros: [
      "IP54, alltså ett steg bättre skydd än allt annat i jämförelsen",
      "3 680 W och 16 A, räcker till motorvärmare med kupévärmare",
      "Matter-certifierad och fungerar i alla fyra ekosystemen samtidigt",
    ],
    cons: [
      "Nästan åtta gånger dyrare än Julas mekaniska timer",
      "Drifttemperaturen stannar vid −20 °C, mot Shellys −25 °C",
      "Fjärrstyrning kräver att Tapos molntjänst svarar",
    ],
    specs: [
      { label: "Typ", value: "Smart plugg", highlight: true },
      { label: "Maxlast", value: "3 680 W (16 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP54", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 50 °C", highlight: true },
      { label: "Styrning", value: "App, röst, schema och astro", highlight: true },
      { label: "Matter", value: "Ja, certifierad" },
      { label: "Energimätning", value: "Ja" },
      { label: "Mått", value: "93,3 × 83 × 48,2 mm" },
    ],
    verdict:
      "Den vinner på att vara ensam om två saker samtidigt. IP54 i stället för IP44 betyder att den tål vatten från alla håll och inte bara stänk, vilket spelar roll på en fasad utan tak över sig. Och 16 A gör att den räcker till motorvärmaren med kupévärmaren på samma uttag, vilket ingen av de billigare digitala timrarna gör. Matter-certifieringen är det som gör att den inte bara fungerar i dag utan sannolikt även när Tapo-appen en dag byter skepnad: pluggen går att lägga i Apple Home, Google Home, Alexa och SmartThings utan tillverkarens app. Två förbehåll. Priset är 399 kronor, alltså åtta gånger Julas mekaniska timer, och för en julgransslinga i trädgården är det svårt att motivera. Drifttemperaturen stannar dessutom vid −20 °C, vilket är fem grader sämre än Shellys och i tunnaste laget norr om Dalarna. Kjell hade den i lager när vi kontrollerade.",
  },
  {
    id: "shelly-outdoor-plug-s-gen3",
    brand: "Shelly",
    name: "Outdoor Plug S Gen3 utomhuskontakt",
    shortName: "Outdoor Plug S Gen3",
    image: productImage(UTOMHUSTIMER.slug, "shelly-outdoor-plug-s-gen3"),
    tagline:
      "Specad för −25 °C och den enda som fortsätter lyda scheman när både molnet och internet är borta.",
    scores: {
      vaderskydd: 5,
      styrning: 5,
      maxlast: 3,
      driftsakerhet: 5,
      prisvarde: 4.5,
    },
    price: 297,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Shelly-Outdoor-Plug-S-Gen3-WiFi-smart-plug/3351764",
    award: "runnerup",
    superlative: "Bäst för svensk vinter",
    pros: [
      "−25 till 51 °C, det bredaste temperaturspannet i jämförelsen",
      "Matter och MQTT, styrs lokalt utan att något moln behöver svara",
      "Hundra kronor billigare hos Proshop än hos Kjell",
    ],
    cons: [
      "2 500 W och 12 A, alltså för lite för motorvärmare med kupévärmare",
      "IP44 och inte IP54 som testvinnaren",
      "Ingen av butikerna vi hittat den hos publicerar något kundbetyg",
    ],
    specs: [
      { label: "Typ", value: "Smart plugg", highlight: true },
      { label: "Maxlast", value: "2 500 W (12 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−25 till 51 °C", highlight: true },
      { label: "Styrning", value: "App, schema och astro, även lokalt", highlight: true },
      { label: "Matter", value: "Ja, plus MQTT" },
      { label: "Energimätning", value: "Ja" },
      { label: "Mått", value: "56 × 56 × 103 mm" },
    ],
    verdict:
      "Det här är produkten att välja om timern ska sitta ute hela vintern och du bor där det faktiskt blir kallt. Shelly anger −25 till 51 °C, vilket är sex grader mer marginal i botten än testvinnaren och femton grader mer än Nedis. Den andra styrkan är att den inte behöver någon annan: schemat ligger i pluggen, den talar både Matter och MQTT, och den går att styra från det lokala nätet utan att ett moln är inblandat. Ligger internet nere fortsätter julbelysningen tändas ändå. Det som håller den från förstaplatsen är maxlasten. 2 500 W räcker gott till belysning, men inte till en motorvärmare med kupévärmare på samma uttag, och det är en av de två stora anledningarna att köpa något av det här slaget i Sverige. Vi länkar till Proshop, som hade den för 297 kronor mot Kjells 399. Inet hade den för 349 kronor med betyget 4,6 av tio kunder, vilket är det enda kundbetyg vi hittat på produkten.",
  },
  {
    id: "smartline-utomhuskontakt",
    userRating: { value: 4, count: 4, checkedAt: PRICE_CHECKED },
    brand: "Smartline",
    name: "Utomhuskontakt IP44 med astrotimer",
    shortName: "Utomhuskontakt IP44",
    image: productImage(UTOMHUSTIMER.slug, "smartline-utomhuskontakt"),
    tagline:
      "Astrofunktion och veckoschema utan konto, utan wifi och utan att något moln vet att den finns.",
    scores: {
      vaderskydd: 3,
      styrning: 4,
      maxlast: 5,
      driftsakerhet: 4.5,
      prisvarde: 3,
    },
    price: 245,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "SmartaSaker",
    merchantUrl: "https://www.smartasaker.se/sv/smartline-utomhuskontakt-ip44",
    superlative: "Följer solen utan konto",
    pros: [
      "Astrotimer som följer solens upp- och nedgång, utan hubb och utan konto",
      "3 680 W och 16 A, klarar motorvärmaren",
      "Separata scheman för olika veckodagar",
    ],
    cons: [
      "Bluetooth med femton meters räckvidd, alltså ingen styrning hemifrån jobbet",
      "Ingen drifttemperatur anges av vare sig butiken eller tillverkaren",
      "Bara fyra kundbetyg, alltså ett tunt underlag",
    ],
    specs: [
      { label: "Typ", value: "Smart plugg", highlight: true },
      { label: "Maxlast", value: "3 680 W (16 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven", highlight: true },
      { label: "Styrning", value: "Bluetooth-app, astro och veckoschema", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Räckvidd", value: "Cirka 15 m" },
      { label: "App", value: "Smartline Flow" },
    ],
    verdict:
      "Den löser kategorins svåraste problem billigare än någon annan smart produkt här: astrofunktionen gör att belysningen tänds när solen faktiskt går ner och inte klockan fyra hela vintern. Att den gör det över Bluetooth och inte wifi är både styrkan och svagheten. Styrkan är att det inte finns något konto, ingen hubb, ingen molntjänst som kan stängas, och att schemat ligger kvar i uttaget oavsett vad som händer med nätet. Svagheten är räckvidden på cirka femton meter: du kan inte tända lamporna hemifrån jobbet, bara programmera om dem när du står på gården. Den klarar dessutom 16 A, alltså mer last än både Shelly-pluggarna. Det som drar ner betyget är att ingen anger drifttemperatur, vilket för en produkt som ska stå ute i februari är en uppgift vi hade velat ha, och att fyra kundbetyg är för tunt för att säga något om hållbarheten. Teknikproffset hade samma produkt för 172 kronor men den var slut när vi kontrollerade.",
  },
  {
    id: "cleverio-gp120",
    userRating: { value: 4.5, count: 750, checkedAt: PRICE_CHECKED },
    brand: "Cleverio",
    name: "GP120 Smart fjärrströmbrytare 3 680 W",
    shortName: "GP120 3 680 W",
    image: productImage(UTOMHUSTIMER.slug, "cleverio-gp120"),
    tagline:
      "Kategorins bäst betygsatta produkt av 750 kunder, till en tredjedel av testvinnarens pris.",
    scores: {
      vaderskydd: 3,
      styrning: 3.5,
      maxlast: 5,
      driftsakerhet: 2.5,
      prisvarde: 5,
    },
    price: 149.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-utomhusbruk/cleverio-gp120-smart-fjarrstrombrytare-for-utomhusbruk-3680-w-p52191",
    award: "budget",
    superlative: "Billigast med app",
    pros: [
      "150 kronor för 16 A, app och schema",
      "Betyget 4,5 av 750 kunder, det överlägset största underlaget i jämförelsen",
      "Anger sin egen viloförbrukning frivilligt, under 0,5 W",
    ],
    cons: [
      "Ingen drifttemperatur anges, trots att produkten säljs för utomhusbruk",
      "Inget Matter, så den är beroende av att Smart Life-appen finns kvar",
      "Ingen astrofunktion, du ställer klockslag",
    ],
    specs: [
      { label: "Typ", value: "Smart plugg", highlight: true },
      { label: "Maxlast", value: "3 680 W (16 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven", highlight: true },
      { label: "Styrning", value: "App och schema, inget astro", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Viloförbrukning", value: "Under 0,5 W" },
      { label: "Mått", value: "80 × 58 × 93 mm" },
    ],
    verdict:
      "Prisvärdet är det bästa i jämförelsen och betygsunderlaget är i en egen klass: 750 kunder hos Kjell har satt 4,5. För 150 kronor får du 16 A, app och schemaläggning, alltså det mesta av vad testvinnaren gör för 399. Två saker gör att den ändå hamnar mitt i fältet. Kjell anger ingen drifttemperatur, varken i specifikationen eller i produkttexten, vilket är anmärkningsvärt för en produkt som säljs uttryckligen för utomhusbruk och som konkurrenterna specar ner till −25 °C. Vi sätter hellre ett medelbetyg på väderskyddet än gissar en siffra. Och den saknar både Matter och astrofunktion, vilket betyder att du dels ställer fasta klockslag som blir fel när solnedgången flyttar sig, dels är beroende av att Smart Life fortsätter finnas. Är det julbelysning som ska tändas och du redan tänkt använda en app är det ändå det billigaste rimliga köpet här.",
  },
  {
    id: "shelly-wave-outdoor-plug-s-lr",
    brand: "Shelly",
    name: "Wave Outdoor Plug S LR med Z-Wave 800",
    shortName: "Wave Outdoor Plug S LR",
    image: productImage(UTOMHUSTIMER.slug, "shelly-wave-outdoor-plug-s-lr"),
    tagline:
      "Räckvidd upp till en kilometer utomhus, och kräver en hubb du förmodligen inte har.",
    scores: {
      vaderskydd: 5,
      styrning: 3,
      maxlast: 3,
      driftsakerhet: 4,
      prisvarde: 2,
    },
    price: 689,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-utomhusbruk/shelly-wave-outdoor-plug-s-lr-p52287",
    award: "premium",
    superlative: "Längst räckvidd",
    pros: [
      "Z-Wave Long Range når upp till en kilometer utomhus enligt tillverkaren",
      "−25 till 51 °C, samma köldtålighet som Outdoor Plug S Gen3",
      "S2-autentisering med AES-128, alltså krypterad styrning utan moln",
    ],
    cons: [
      "Kräver en Z-Wave-hubb, och utan den gör den ingenting alls",
      "689 kronor, alltså fjorton gånger Julas mekaniska timer",
      "2 500 W och 12 A, för lite för motorvärmare med kupévärmare",
    ],
    specs: [
      { label: "Typ", value: "Smart plugg", highlight: true },
      { label: "Maxlast", value: "2 500 W (12 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−25 till 51 °C", highlight: true },
      { label: "Styrning", value: "Kräver Z-Wave-hubb", highlight: true },
      { label: "Matter", value: "Nej, Z-Wave 800" },
      { label: "Egenförbrukning", value: "Max 0,7 W" },
      { label: "Räckvidd", value: "Upp till 1 km utomhus" },
    ],
    verdict:
      "Rätt produkt för ett problem de flesta inte har. Z-Wave Long Range är byggt för avstånd, och tillverkaren anger upp till en kilometer utomhus, vilket gör den till det enda rimliga valet om uttaget sitter i ett uthus eller vid en grind långt från huset där wifi aldrig når. Köldtåligheten är densamma som hos Outdoor Plug S Gen3, och S2-autentiseringen betyder att styrningen är krypterad och lokal utan att något moln är inblandat. Sedan kommer förbehållen, och de är stora. Utan en Z-Wave-hubb är produkten ett dyrt förlängningsuttag: det finns ingen app att ladda ner och ingen knapp som ger dig ett schema. Priset är 689 kronor, alltså mer än fyra av produkterna här tillsammans. Och maxlasten är samma 2 500 W som lillasystern. Har du redan Z-Wave hemma är det här en självklarhet till uthuset. Har du inte det ska du inte börja här.",
  },
  {
    id: "nedis-zigbee-utomhus",
    userRating: { value: 4, count: 12, checkedAt: PRICE_CHECKED },
    brand: "Nedis",
    name: "Zigbee fjärrströmbrytare för utomhusbruk 3 680 W",
    shortName: "Zigbee utomhus",
    image: productImage(UTOMHUSTIMER.slug, "nedis-zigbee-utomhus"),
    tagline:
      "16 A och energimätning för 199 kronor, men specad ner till bara −10 °C.",
    scores: {
      vaderskydd: 1.5,
      styrning: 3.5,
      maxlast: 5,
      driftsakerhet: 4,
      prisvarde: 3.5,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-utomhusbruk/nedis-zigbee-fjarrstrombrytare-for-utomhusbruk-3680-w-p52389",
    superlative: "Billigast med Zigbee",
    pros: [
      "3 680 W och 16 A till under tvåhundra kronor",
      "Zigbee 3.0, alltså lokal styrning via hubb utan att belasta wifi-nätet",
      "Energimätning inbyggd",
    ],
    cons: [
      "Drifttemperatur −10 till 40 °C, vilket är för lite för svensk vinter",
      "Kräver en Zigbee-hubb för att fungera",
      "Var slut hos Kjell när vi kontrollerade priset",
    ],
    specs: [
      { label: "Typ", value: "Smart plugg", highlight: true },
      { label: "Maxlast", value: "3 680 W (16 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−10 till 40 °C", highlight: true },
      { label: "Styrning", value: "Kräver Zigbee-hubb", highlight: true },
      { label: "Matter", value: "Nej, Zigbee 3.0" },
      { label: "Energimätning", value: "Ja" },
      { label: "Lagerstatus", value: "Slut hos Kjell 2026-08-01" },
    ],
    verdict:
      "Den här är billig, kapabel och fel årstid. På papperet är 199 kronor för 16 A, Zigbee och energimätning ett av jämförelsens bättre erbjudanden, och Zigbee betyder att den styrs lokalt via hubben utan att belasta wifi-nätet. Problemet står i specifikationen och är svårt att förbise: drifttemperaturen är −10 till 40 °C. Det är den sämsta siffran i hela jämförelsen och den är inte marginellt sämre, den är femton grader sämre än Shellys. En produkt som ska styra julbelysningen i december i Sverige kommer att arbeta utanför sin specifikation flera veckor om året, och det är hela skälet till att den hamnar näst sist trots goda betyg i övrigt. Lägg till att den kräver en Zigbee-hubb och att den var slut hos Kjell när vi kontrollerade. Vill du ha Zigbee ute och bor söder om Skåne kan den fungera. I övriga Sverige ska du välja något annat.",
  },
  {
    id: "luxorparts-digital-7-dygn",
    userRating: { value: 4, count: 78, checkedAt: PRICE_CHECKED },
    brand: "Luxorparts",
    name: "Digital timer 7 dygn för utomhusbruk",
    shortName: "Digital timer 7 dygn",
    image: productImage(UTOMHUSTIMER.slug, "luxorparts-digital-7-dygn"),
    tagline:
      "Backupbatteri som håller hundra timmar, alltså den enda timern utan app som överlever ett strömavbrott.",
    scores: {
      vaderskydd: 3,
      styrning: 2.5,
      maxlast: 4.5,
      driftsakerhet: 4.5,
      prisvarde: 2,
    },
    price: 279.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/el-verktyg/el-produkter/starkstrom/timers-klockstrombrytare/luxorparts-digital-timer-7-dygn-for-utomhusbruk-p40711",
    superlative: "Bäst utan app",
    pros: [
      "Uppladdningsbart backupbatteri som håller upp till 100 timmar",
      "Tio programmerbara till- och frånslag, ner till en minuts steg",
      "Slumpmässig förlängning på 2 till 30 minuter, som ser bebott ut",
    ],
    cons: [
      "280 kronor, alltså dyrare än två av de smarta pluggarna",
      "Fast klockslag, ingen astrofunktion",
      "Ingen drifttemperatur anges",
    ],
    specs: [
      { label: "Typ", value: "Digital timer", highlight: true },
      { label: "Maxlast", value: "3 600 W", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven", highlight: true },
      { label: "Styrning", value: "Display, 10 program per vecka", highlight: true },
      { label: "Backupbatteri", value: "Ja, upp till 100 h" },
      { label: "Kortaste steg", value: "1 minut" },
      { label: "Slumpfunktion", value: "2 till 30 minuter" },
    ],
    verdict:
      "Om du inte vill ha en app men vill ha något som klarar verkligheten är det den här. Backupbatteriet är skälet: hundra timmars gångreserv betyder att ett strömavbrott i december inte gör att timern går fel resten av säsongen, vilket är exakt vad som händer med en mekanisk. Tio program i veckan och steg ner till en minut räcker till allt en villaägare behöver, och slumpfunktionen på två till trettio minuter finns för att belysningen ska se bebodd ut när ni är bortresta. Det som drar ner den är priset. 280 kronor är mer än både Cleverio och Shelly kostar, och för de pengarna får du hos dem både app och astrofunktion. Här ställer du fortfarande fasta klockslag, och de blir fel några veckor efter att du satt dem. Kjell anger inte heller någon drifttemperatur. Köp den om du bestämt dig för att inte ha ännu en app i telefonen, inte för att den är billigare.",
  },
  {
    id: "anslut-skymningsrela",
    userRating: { value: 4.6, count: 236, checkedAt: PRICE_CHECKED },
    brand: "Anslut",
    name: "Skymningsrelä med nedräkningstimer IP44",
    shortName: "Skymningsrelä IP44",
    image: productImage(UTOMHUSTIMER.slug, "anslut-skymningsrela"),
    tagline:
      "Den enda produkten här som inte har någon klocka att gå fel, eftersom den tittar på ljuset i stället.",
    scores: {
      vaderskydd: 3,
      styrning: 3,
      maxlast: 1,
      driftsakerhet: 5,
      prisvarde: 4,
    },
    price: 129,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/el-och-belysning/elinstallation/belysningstillbehor/timers/skymningsrela-med-nedrakningstimer-006053/",
    superlative: "Kan inte gå fel",
    pros: [
      "Tänder när det faktiskt blir mörkt, så du behöver aldrig ställa om",
      "Har ingen klocka och kan därför inte tappa tiden vid strömavbrott",
      "Betyget 4,6, det högsta i hela jämförelsen",
    ],
    cons: [
      "Bara 1 000 W, alltså jämförelsens överlägset lägsta maxlast",
      "Ingen fjärrstyrning och inget veckoschema",
      "Ljussensorn kan luras av gatubelysning eller en snötäckt sensor",
    ],
    specs: [
      { label: "Typ", value: "Skymningsrelä", highlight: true },
      { label: "Maxlast", value: "1 000 W", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven", highlight: true },
      { label: "Styrning", value: "Ljussensor plus nedräkning", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Backupbatteri", value: "Behövs inte, ingen klocka" },
      { label: "Butik", value: "Jula" },
    ],
    verdict:
      "Den löser astroproblemet på det enklaste tänkbara sättet: i stället för att räkna ut när solen går ner tittar den på hur ljust det är. Belysningen tänds i skymningen året om utan att du ställer om något, och eftersom det inte finns någon klocka i produkten finns det heller ingenting som kan gå fel efter ett strömavbrott. Nedräkningsfunktionen ovanpå gör att den kan släcka efter ett antal timmar i stället för att lysa till gryningen. Kunderna ger den 4,6 av 236 röster, vilket är jämförelsens högsta betyg. Den faller på en enda siffra. 1 000 W är en fjärdedel av vad de bästa här klarar, och det utesluter motorvärmare, terrassvärmare och de flesta pumpar helt. Till ljusslingor och en fasadbelysning i LED är det gott om marginal, och det är också precis vad den ska användas till. Placeringen av sensorn spelar dessutom roll: sitter den där gatubelysningen lyser på den tänder den aldrig.",
  },
  {
    id: "anslut-digital-utomhustimer",
    userRating: { value: 3.7, count: 167, checkedAt: PRICE_CHECKED },
    brand: "Anslut",
    name: "Digital utomhustimer IP44",
    shortName: "Digital utomhustimer",
    image: productImage(UTOMHUSTIMER.slug, "anslut-digital-utomhustimer"),
    tagline:
      "Jämförelsens sämst betygsatta produkt, och den enda där kunderna sätter lägre betyg än på den mekaniska halva priset.",
    scores: {
      vaderskydd: 3,
      styrning: 2.5,
      maxlast: 2,
      driftsakerhet: 3.5,
      prisvarde: 3,
    },
    price: 99.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/el-och-belysning/elinstallation/belysningstillbehor/timers/digital-utomhustimer-006248/",
    superlative: "Digital till lägsta pris",
    pros: [
      "140 till- och frånslag per vecka, alltså långt fler än du behöver",
      "Backupbatteri som håller tiden vid strömavbrott",
      "Hundra kronor, vilket är en tredjedel av Luxorparts digitala",
    ],
    cons: [
      "1 800 W, ungefär halva vad den mekaniska timern för halva priset klarar",
      "Betyget 3,7, det lägsta i jämförelsen",
      "Fast klockslag, ingen astrofunktion",
    ],
    specs: [
      { label: "Typ", value: "Digital timer", highlight: true },
      { label: "Maxlast", value: "1 800 W", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven", highlight: true },
      { label: "Styrning", value: "Display, 140 slag per vecka", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Backupbatteri", value: "Ja" },
      { label: "Butik", value: "Jula" },
    ],
    verdict:
      "Den här är instruktiv snarare än rekommenderad, och det är värt att förklara varför. Den kostar dubbelt så mycket som den mekaniska timern i samma serie och klarar ungefär halva lasten: 1 800 W mot 3 500. Det är tvärtemot vad de flesta antar, nämligen att en dyrare och mer avancerad produkt också tål mer. Kunderna märker det: 3,7 av 167 röster är jämförelsens lägsta betyg, och den mekaniska systern för halva priset får 4,5 av 609. Det den faktiskt gör bättre är att den har ett backupbatteri, alltså att den inte tappar tiden vid ett strömavbrott, och att den kan ställas i minutsteg i stället för halvtimmar. Behöver du fler än ett par kopplingar om dygnet och vill hålla dig under hundralappen är den ett rimligt köp till en ljusslinga. Ska något med värme i kopplas in ska du inte köpa den.",
  },
  {
    id: "anslut-utomhustimer",
    userRating: { value: 4.5, count: 609, checkedAt: PRICE_CHECKED },
    brand: "Anslut",
    name: "Utomhustimer IP44 mekanisk",
    shortName: "Utomhustimer IP44",
    image: productImage(UTOMHUSTIMER.slug, "anslut-utomhustimer"),
    tagline:
      "Femtio kronor, 3 500 W och inget som kan sluta fungera. Räcker till julbelysningen, och det är vad de flesta köper.",
    scores: {
      vaderskydd: 3,
      styrning: 1,
      maxlast: 4.5,
      driftsakerhet: 1.5,
      prisvarde: 5,
    },
    price: 49.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/el-och-belysning/elinstallation/belysningstillbehor/timers/utomhustimer-406065/",
    award: "editor",
    superlative: "Redaktionens val till julbelysningen",
    pros: [
      "49,90 kronor, en åttondel av testvinnaren",
      "3 500 W och 16 A, alltså mer last än båda Shelly-pluggarna",
      "Ingen app, inget konto och ingenting som kan sluta stödjas",
    ],
    cons: [
      "Tappar tiden helt vid strömavbrott och går fel resten av säsongen",
      "Halvtimmessegment och samma schema varje dygn",
      "Fast klockslag, så den blir fel när solnedgången flyttar sig",
    ],
    specs: [
      { label: "Typ", value: "Mekanisk timer", highlight: true },
      { label: "Maxlast", value: "3 500 W (16 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven", highlight: true },
      { label: "Styrning", value: "Segment om 30 min, 24 h", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Backupbatteri", value: "Nej" },
      { label: "Butik", value: "Jula" },
    ],
    verdict:
      "Den hamnar sist i tabellen och är ändå den vi rekommenderar till de flesta som letar en utomhustimer, vilket kräver en förklaring. Viktningen belönar styrning och driftsäkerhet, och där har en mekanisk skiva ingenting att komma med: samma schema varje dygn, halvtimmessegment, och vid ett strömavbrott tappar den tiden och går fel tills någon ställer om den. Det är verkliga brister. Men läs vad som står bredvid. 3 500 W är mer last än både Shelly-pluggarna klarar. 4,5 av 609 kunder är det näst största och näst bästa betygsunderlaget i hela jämförelsen. Och den kostar 49,90 kronor. Ska den tända en ljusslinga i en buske mellan fyra och elva under sex veckor i december finns det ingenting den gör sämre än en plugg för 399, utom att du inte kan ändra tiden från soffan. Köp den smarta när du har en anledning: motorvärmaren som ska starta olika tider, uthuset som wifi inte når, eller att du faktiskt vill kunna släcka hemifrån. Köp den här när du bara vill att lamporna ska tändas.",
  },
];

export const UTOMHUSTIMER_PRODUCTS = resolveProducts(UTOMHUSTIMER, SEEDS);

/**
 * Maskinläsbar version av de tre uppgifter som avgör vilken produkt som duger:
 * vilken sorts timer det är, hur mycket den orkar, och om den kan följa solen.
 *
 * Eget fält i stället för att tolkas ur `specs`-strängarna, av samma skäl som i
 * lib/data/smart-plug.ts: en regex som plockar "16 A" ur "3 680 W (16 A)"
 * fungerar ända tills någon skriver "3500W", och då rekommenderar väljaren en
 * timer på 1 000 W till en motorvärmare.
 *
 * Håll listan i synk med `specs.Maxlast` ovan. Avviker de är specen sanningen.
 */
export type TimerCapability = {
  id: string;
  kind: "smart" | "digital" | "mekanisk";
  /** Märkeffekt i watt, som butiken anger den. */
  watt: number;
  /**
   * Följer solen utan att du ställer om. Astrofunktion i app räknas, liksom en
   * ljussensor. Ett fast klockslag gör det inte, hur många program det än har.
   */
  followsSun: boolean;
  /** Går att styra när du inte står bredvid den. Bluetooth räknas inte. */
  remote: boolean;
};

export const UTOMHUSTIMER_CAPABILITIES: TimerCapability[] = [
  { id: "tp-link-tapo-p410m", kind: "smart", watt: 3680, followsSun: true, remote: true },
  { id: "shelly-outdoor-plug-s-gen3", kind: "smart", watt: 2500, followsSun: true, remote: true },
  { id: "smartline-utomhuskontakt", kind: "smart", watt: 3680, followsSun: true, remote: false },
  { id: "cleverio-gp120", kind: "smart", watt: 3680, followsSun: false, remote: true },
  { id: "shelly-wave-outdoor-plug-s-lr", kind: "smart", watt: 2500, followsSun: true, remote: true },
  { id: "nedis-zigbee-utomhus", kind: "smart", watt: 3680, followsSun: false, remote: true },
  { id: "luxorparts-digital-7-dygn", kind: "digital", watt: 3600, followsSun: false, remote: false },
  { id: "anslut-skymningsrela", kind: "mekanisk", watt: 1000, followsSun: true, remote: false },
  { id: "anslut-digital-utomhustimer", kind: "digital", watt: 1800, followsSun: false, remote: false },
  { id: "anslut-utomhustimer", kind: "mekanisk", watt: 3500, followsSun: false, remote: false },
];

/**
 * Filtren över jämförelsetabellen. Härledda ur capabilities så att en produkt
 * aldrig kan ligga i fel grupp utan att specen också är fel.
 *
 * En dimension med flit, nämligen produkttyp. Att blanda in "klarar
 * motorvärmare" i samma pillrad hade gjort två olika frågor till ett val, och
 * den frågan har i stället ett eget verktyg i köpguiden.
 */
export const UTOMHUSTIMER_FILTERS = [
  {
    key: "smart",
    label: "Smarta med app",
    ids: UTOMHUSTIMER_CAPABILITIES.filter((c) => c.kind === "smart").map((c) => c.id),
  },
  {
    key: "digital",
    label: "Digitala med display",
    ids: UTOMHUSTIMER_CAPABILITIES.filter((c) => c.kind === "digital").map((c) => c.id),
  },
  {
    key: "mekanisk",
    label: "Mekaniska och ljussensor",
    ids: UTOMHUSTIMER_CAPABILITIES.filter((c) => c.kind === "mekanisk").map((c) => c.id),
  },
];

/**
 * Tittade på, valde bort.
 *
 * Två av dem är Bygghemmas och Kjells egna testvinnare, uteslutna av skäl som
 * inte handlar om kvalitet: den ena går inte att köpa utanför en enda
 * butikskoncern, de andra två är utgående lagerrensning.
 */
export const UTOMHUSTIMER_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Gelia",
    name: "Kapslad EMT444S IP44 jordad",
    approxPrice: 199,
    merchant: "Bygghemma",
    merchantUrl: "https://www.bygghemma.se/reportage-och-guider/timer-utomhus-bast-i-test/",
    reason:
      "Bygghemmas egen testvinnare, med femtonminuterssegment och specad ner till −25 °C, vilket är den enda mekaniska timer vi sett med en angiven köldtålighet. Vi hittade den bara inom Bygghemmakoncernens egna butiker, och en produkt som en enda kedja säljer går inte att jämföra på pris. Hittar du den och ska ha mekaniskt är den sannolikt bättre än Julas.",
  },
  {
    brand: "Luxorparts",
    name: "Timer för utomhusbruk 24 h",
    approxPrice: 29,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/el-verktyg/el-produkter/starkstrom/timers-klockstrombrytare/luxorparts-timer-for-utomhusbruk-24-h-p50167",
    reason:
      "Kjells mekaniska motsvarighet till Julas, med 4,5 i betyg av 172 kunder. Utesluten eftersom den 2026-08-01 var slutsåld och märkt lagerrensning med ordinariepriset nedsatt från 99,90 till 29 kronor, alltså på väg ur sortimentet. Vi rankar inte produkter som håller på att utgå.",
  },
  {
    brand: "Kjell & Company",
    name: "Säkerhetstimer för utomhusbruk IP44",
    approxPrice: 99,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/el-verktyg/el-produkter/starkstrom/timers-klockstrombrytare/sakerhetstimer-for-utomhusbruk-ip44-p50384",
    reason:
      "Nedräkningstimer som bryter efter 2, 4, 6 eller 8 timmar och har inbyggd ljussensor, alltså samma idé som Anslut skymningsrelä. Även den slutsåld och märkt lagerrensning, nedsatt från 199,90 till 99 kronor, och utesluten av samma skäl.",
  },
  {
    brand: "Cleverio",
    name: "GP100 dubbel fjärrströmbrytare utomhus",
    approxPrice: 200,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-utomhusbruk/cleverio-gp100-dubbel-fjarrstrombrytare-for-utomhusbruk-p51898",
    reason:
      "Två separat styrbara uttag i samma dosa, vilket är den rätta produkten om både motorvärmaren och kupévärmaren ska ha var sin tid. Slut vid priskontrollen, och två uttag i ett hölje gör den svår att jämföra rakt av mot enkeluttagen.",
  },
  {
    brand: "Popp",
    name: "Utomhusbrytare Z-Wave",
    approxPrice: 629,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-utomhusbruk/popp-utomhusbrytare-z-wave-p51352",
    reason:
      "Z-Wave-alternativ till Shelly Wave, med 4,0 i betyg av 35 kunder. Slut vid priskontrollen, och Shelly Wave Outdoor Plug S LR gör samma jobb med nyare radio och angiven köldtålighet.",
  },
  {
    brand: "Clas Ohlson",
    name: "Motorvärmartimer med temperatursensor",
    approxPrice: 400,
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Motorvarmartimer-med-temperatursensor/p/36-6047",
    reason:
      "En egen produkttyp: den mäter utetemperaturen och räknar själv ut hur länge motorvärmaren behöver gå, i stället för att du gissar. Utesluten eftersom Clas Ohlsons sidor blockerar automatiserad läsning, så vi kunde varken verifiera pris eller specifikation mot butiken själv. Värd att känna till om motorvärmare är hela anledningen till köpet.",
  },
];

/**
 * Speglar köpguiden: varje fråga guiden svarar på har en post här, formulerad
 * som folk söker snarare än som vi skriver rubriker.
 *
 * Svaren står för sig själva och förutsätter inte varandra, eftersom
 * FAQPage-uppmärkningen kan visa ett enskilt svar direkt i sökresultatet.
 */
export const UTOMHUSTIMER_FAQ = [
  {
    question: "Vilken IP-klass behöver en timer som står ute?",
    answer:
      "Minst IP44. Elsäkerhetsverket skriver att IP44 eller högre siffervärde gäller för en ljusslinga som kan placeras på mark utomhus, och samma gräns gäller det som strömmen går igenom. Fyran i andra positionen betyder att produkten tål vatten som stänker från alla riktningar. IP54 lägger till bättre dammskydd och tål mer vatten, vilket är värt något på en fasad utan tak över sig. En inomhustimer i en plastpåse är inte samma sak som en timer byggd för utomhusbruk, och skillnaden är en brandrisk och inte bara ett funktionsproblem.",
  },
  {
    question: "Fungerar en utomhustimer i minusgrader?",
    answer:
      "Det beror helt på produkten, och uppgiften är den som oftast saknas. IP-klassen säger ingenting om kyla, bara om vatten och damm. Av produkterna i den här jämförelsen anger Shelly −25 till 51 °C, TP-Link −20 till 50 °C och Nedis bara −10 till 40 °C. Fem av tio anger ingen drifttemperatur alls, vilket inkluderar samtliga mekaniska och digitala timers. En produkt som används utanför sitt temperaturspann behöver inte gå sönder, men tillverkaren lovar ingenting om att den fungerar, och en mekanisk kopplingsskiva blir trög när smörjmedlet stelnar.",
  },
  {
    question: "Vad är skillnaden mellan mekanisk och digital utomhustimer?",
    answer:
      "En mekanisk timer är en skiva som snurrar ett varv per dygn, där du trycker ner segment om oftast trettio minuter för de tider strömmen ska vara på. Samma schema gäller varje dygn, och vid ett strömavbrott stannar skivan och går sedan fel tills någon ställer om den. En digital timer har display och kan ha olika program för olika veckodagar, kortare steg och ofta ett backupbatteri som håller tiden vid avbrott. Priset förutsäger däremot inte kapaciteten: Julas mekaniska timer på 49,90 kronor klarar 3 500 W medan deras digitala på 99,90 stannar vid 1 800 W.",
  },
  {
    question: "Vilken timer klarar en motorvärmare?",
    answer:
      "En som är märkt för minst 16 A, alltså runt 3 680 W, om kupévärmaren sitter på samma uttag. Själva motorvärmaren ligger ofta mellan 400 och 1 000 W, men kupévärmaren kan ensam dra 1 500 W eller mer, och det är summan som räknas. Av produkterna i den här jämförelsen klarar TP-Link Tapo P410M, Smartline utomhuskontakt, Cleverio GP120, Nedis Zigbee och Anslut mekaniska timer den lasten. Skymningsreläet på 1 000 W och den digitala Anslut-timern på 1 800 W gör det inte. Räkna ihop båda värmarnas effekt och lägg på tjugo procent innan du väljer.",
  },
  {
    question: "Vad är en astrotimer och behöver jag en?",
    answer:
      "En astrotimer räknar ut när solen går upp och ner på din plats och flyttar tändningen automatiskt efter årstiden. Det spelar större roll i Sverige än på de flesta håll: solnedgången i Stockholm ligger runt kvart i tre i december och efter tio på kvällen i juni. En timer med fast klockslag blir därför fel några veckor efter att du ställt den, och du får gå ut och skruva om. Behöver du en beror på användningen. För en säsong i december räcker ett fast klockslag gott, eftersom solnedgången knappt rör sig de veckorna. För belysning som ska gå året runt är astro eller en ljussensor värd pengarna.",
  },
  {
    question: "Vad händer med timern vid strömavbrott?",
    answer:
      "Tre olika saker beroende på typ. En mekanisk timer stannar och tappar tiden helt, så när strömmen kommer tillbaka ligger skivan fel med exakt så många timmar som avbrottet varade, och den går fel tills du ställer om den. En digital timer med backupbatteri behåller tiden, och Luxorparts anger upp till hundra timmars gångreserv. En smart plugg behåller sitt schema i minnet, men om schemat körs i molnet i stället för i pluggen kan den missa både på- och avslag tills uppkopplingen är tillbaka. Ett skymningsrelä är det enda som inte kan gå fel, eftersom det inte har någon klocka alls.",
  },
  {
    question: "Får jag koppla julbelysningen till en timer utomhus?",
    answer:
      "Ja, och Elsäkerhetsverket lyfter själva att timerfunktion och fjärrstyrning minskar risken att belysningen glöms tänd. Tre saker måste stämma. Timern ska vara märkt för utomhusbruk med minst IP44. Uttaget den sitter i ska vara skyddsjordat, och för nya uttag gäller dessutom krav på jordfelsbrytare. Och skarvsladden ska vara jordad och avsedd för utomhusbruk, inte skarvad i flera led och inte dragen genom ett fönster som kläms igen om den.",
  },
  {
    question: "Ska timern sitta ute hela vintern?",
    answer:
      "Här går myndighetens två råd åt olika håll, och det är värt att veta om. Elsäkerhetsverket skriver att timer minskar brandrisken genom att belysningen inte glöms tänd, men också att du bara ska ansluta elprodukten för utomhusbruk under den tid du använder den. En timer som styr julbelysningen används i praktiken hela december, så den sitter ute i sex veckor. Det rimliga är att se produkten som ansluten så länge säsongen pågår, kontrollera den när du sätter upp den och ta in den när slingorna plockas ner, i stället för att låta den sitta kvar över sommaren.",
  },
  {
    question: "Kan man styra en utomhustimer från mobilen?",
    answer:
      "Bara om den är en smart plugg med wifi, Zigbee eller Z-Wave. Mekaniska och digitala timers ställs på plats och har ingen radio alls. En viktig mellanform finns: Smartline utomhuskontakt styrs via Bluetooth, vilket betyder att du programmerar den från mobilen men bara när du står inom cirka femton meter. Det räcker för att slippa böja sig ner och trycka på segment, men inte för att tända lamporna på väg hem från jobbet. För det krävs wifi eller en hubb.",
  },
  {
    question: "Vad kostar julbelysningen att ha tänd?",
    answer:
      "Mindre än de flesta tror, och det är därför en timer sällan lönar sig på elräkningen ensam. En LED-slinga på 5 W som lyser åtta timmar om dygnet i sex veckor drar cirka 1,7 kWh, alltså några kronor för hela säsongen. Har du femton slingor och de lyser dygnet runt blir det i stället runt 150 kWh och några hundralappar. Timerns verkliga värde ligger inte i besparingen utan i att belysningen inte står tänd i onödan och att du inte behöver komma ihåg att släcka. Räkna gärna på ditt eget fall med driftkostnadsräknaren i köpguiden.",
  },
  {
    question: "Behöver en smart utomhusplugg Matter?",
    answer:
      "Inte för att fungera, men det avgör hur länge den fungerar. Matter gör att pluggen går att styra från Apple Home, Google Home, Alexa och SmartThings utan tillverkarens egen app. En plugg utan Matter är beroende av att tillverkarens molntjänst finns kvar, och sådana tjänster stängs. Av produkterna här är TP-Link Tapo P410M och Shelly Outdoor Plug S Gen3 Matter-certifierade. Cleverio GP120 och Nedis är det inte, och Shelly Wave kör Z-Wave i stället, vilket är lokalt men kräver hubb.",
  },
  {
    question: "Hur skiljer sig utomhustimer och fjärrströmbrytare utomhus?",
    answer:
      "Orden pekar på samma hylla men olika halvor av den. Utomhustimer betyder oftast en timer du ställer på plats, mekaniskt eller på en display. Fjärrströmbrytare är vad Kjell kallar hela kategorin smarta uttag, alltså sådana som styrs med app eller fjärrkontroll. I praktiken löser båda samma problem, att något ska slås på och av utan att du står där, och den här jämförelsen rankar dem därför i samma lista.",
  },
  {
    question: "Var ska skymningsreläets ljussensor sitta?",
    answer:
      "Där den ser himlen men inte annan belysning. Sitter sensorn under ett tak, i skuggan av en vägg eller vänd mot en gatlykta får den fel bild av hur mörkt det är, och belysningen tänds för sent, för tidigt eller inte alls. Snö som lägger sig över sensorn ger samma effekt. En vanlig lösning är att låta reläet sitta högre än den belysning det styr, så att det inte mäter sitt eget ljus, vilket annars ger en produkt som tänder och släcker om vartannat.",
  },
];
