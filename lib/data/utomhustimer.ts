import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { UTOMHUSTIMER } from "@/lib/test-pages";
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
 * och finns inte i något nätverk vi kan söka till, men har det billigaste
 * och bäst betygsatta produkt. Att i stället skicka den som söker en timer till
 * julbelysningen vidare till en plugg på 259 kronor vore precis det
 * förtroendebrott sajten finns för att undvika. Shelly Outdoor Plug S Gen3
 * länkas till Proshop på 297 kronor och inte till Kjell på 399, en skillnad på 102
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
 * ## ⚠️ Rättelsen till /smart-plug var själv fel
 *
 * Här stod till 2026-08-06 att Kjells produktsida inte anger någon
 * drifttemperatur för Cleverio GP120, och den slutsatsen fick uppgiften
 * −20 °C struken ur `SMART_PLUG_CONSIDERED` den 1 augusti och en publicerad
 * rättelse den 6 augusti. Kjell anger den. Den står i produkttexten på
 * artikel 52191, inte i specifikationsrutan: "Lägsta drifttemperatur: -20 °C".
 * Läst med både jina och playwright 2026-08-06.
 *
 * /utomhustimer bär nu siffran och betyget är höjt. Sidan /smart-plug och dess
 * rättelse i lib/corrections.ts är fortfarande fel och rörs inte här, dels
 * för att det är en annan sidas reparation, dels för att båda filerna har
 * en annan sessions oavslutade arbete i sig. Se .agent/research/utomhustimer.md.
 *
 * Kriteriebetygen är redaktionell bedömning utifrån specifikationer och
 * källorna i lib/sources.ts, inte mätningar. Sidan är live sedan 2026-08-03.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans ännu. Se lib/links.ts.
 */

export const PRICE_CHECKED = "2026-08-03";

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
      /* 4,5 och inte 3,5: priset föll från 399 till 259 kronor mellan
         bygget och lanseringskontrollen 2026-08-03, alltså 35 procent.
         Den är fortfarande dyrast bland de smarta, men avståndet till
         Cleverio är nu 140 kronor och inte 249. */
      prisvarde: 4.5,
    },
    price: 259,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-utomhusbruk/tp-link-tapo-p410m-smart-fjarrstrombrytare-med-energimatning-3680-w-p60083",
    award: "winner",
    superlative: "Bäst för oskyddad fasad",
    pros: [
      "IP54, ett steg bättre skydd än allt annat i jämförelsen",
      "3 680 W och 16 A, räcker till motorvärmare med kupévärmare",
      "Matter-certifierad och fungerar i alla fyra ekosystemen samtidigt",
    ],
    cons: [
      "Fem gånger dyrare än Julas mekaniska timer",
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
      "Tapo P410M är den enda timern här som klarar 16 A bakom en kapsling på IP54, och den kostar 259 kronor.\n\nIP54 tål vatten som sprutar från alla riktningar, ett steg över det stänkskydd resten av fältet har, och det spelar roll på en fasad utan tak över sig. 16 A och 3 680 W räcker till motorvärmaren med kupévärmaren på samma uttag, vilket ingen av de billigare digitala timrarna gör. Matter-certifieringen gör att pluggen går att lägga i Apple Home, Google Home, Alexa och SmartThings utan tillverkarens app, alltså även den dag Tapo-appen byter skepnad.\n\nKylan är begränsningen. Drifttemperaturen bottnar på −20 °C, fem grader sämre än Shelly Outdoor Plug S Gen3, och det är i tunnaste laget norr om Dalarna.\n\nKöp den. Den tar mer last än de båda Shelly-pluggarna, sitter kvar på en vägg utan tak över sig, och fungerar i ditt hem även den dag du byter app.",
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
    superlative: "Bäst för svensk vinter",
    pros: [
      "−25 till 51 °C, det bredaste temperaturspannet av timrarna",
      "Matter och MQTT, styrs lokalt utan att något moln behöver svara",
      "Hundra kronor billigare hos Proshop än hos Kjell",
    ],
    cons: [
      "2 500 W och 12 A, för lite för motorvärmare med kupévärmare",
      "IP44, ett steg under testvinnarens IP54",
      "Wifi räcker sällan ut till ett uthus, där Wave-modellen tar över",
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
      "Shelly Outdoor Plug S Gen3 är timern för den vägg där det blir riktigt kallt, och den kostar 297 kronor.\n\n−25 till 51 °C ger sex graders större marginal i botten än testvinnaren och femton grader mer än Nedis, alltså hela den svenska vintern med råge. Schemat ligger dessutom i pluggen och inte i en molntjänst: den talar både Matter och MQTT och lyder från det lokala nätet, så julbelysningen tänds även den kväll internet ligger nere.\n\nMaxlasten är det som håller den från förstaplatsen. 2 500 W räcker gott till belysning men inte till en motorvärmare med kupévärmare på samma uttag, och det är den andra stora svenska anledningen att köpa något av det här slaget.\n\nDen kostar 38 kronor mer än testvinnaren och ger sex graders större marginal i botten, mot 1 180 W mindre last. För belysning som ska stå ute hela vintern långt norrut är det en bra affär.",
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
      "Bluetooth med 15 meters räckvidd, så ingen styrning hemifrån jobbet",
      "Varken Matter eller wifi, så den blir aldrig en del av resten av hemmet",
      "245 kronor, dubbla priset mot Cleverio GP120 som går att nå på avstånd",
    ],
    specs: [
      { label: "Typ", value: "Smart plugg", highlight: true },
      { label: "Maxlast", value: "3 680 W (16 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven", highlight: true },
      { label: "Styrning", value: "Bluetooth-app, astro och veckoschema", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Räckvidd", value: "Cirka 15 m" },
      /* SmartaSakers engelska produktsida för artikel 13377: längd 10,5 cm,
         bredd 5,5 cm, och 6 cm som sticker ut ur uttaget. Läst 2026-08-06. */
      { label: "Mått", value: "105 × 55 mm, 60 mm ut ur uttaget" },
      { label: "App", value: "Smartline Flow" },
    ],
    verdict:
      "Smartline utomhuskontakt är den billigaste vägen till en astrofunktion utan konto, och den kostar 245 kronor.\n\nAstrofunktionen gör att belysningen tänds när solen faktiskt går ner och inte klockan fyra hela vintern, och uttaget räknar ut tiden själv. Allt ligger i produkten: inget konto, ingen hubb, ingen molntjänst som kan stängas, och schemat står kvar oavsett vad som händer med nätet. Med 16 A och 3 680 W tar den dessutom mer last än de båda Shelly-pluggarna.\n\nRäckvidden är priset för det. Bluetooth når omkring 15 meter, så du programmerar om den när du står på gården men kan inte tända lamporna på väg hem från jobbet.\n\nHar du inget smart hem och tänker inte skaffa något är valet redan gjort här. Alla andra får mer för pengarna hos Cleverio GP120, som kostar hälften och går att nå hemifrån.",
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
      /* 4,0 och inte 3,0: drifttemperaturen var satt som okänd, men Kjells
         produktsida för artikel 52191 skriver ut "Lägsta drifttemperatur:
         -20 °C" i produkttexten. Läst 2026-08-06. Med IP44 och −20 °C ligger
         den ett steg under de båda Shelly-pluggarna, som har IP44 och −25 °C
         och får 5,0. ⚠️ Samma uppgift togs bort ur /smart-plug den 1 augusti
         som obelagd. Den rättelsen var fel. Se .agent/research/utomhustimer.md. */
      vaderskydd: 4,
      styrning: 3.5,
      maxlast: 5,
      driftsakerhet: 2.5,
      prisvarde: 5,
    },
    price: 119,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/fjarrstrombrytare/fjarrstrombrytare-for-utomhusbruk/cleverio-gp120-smart-fjarrstrombrytare-for-utomhusbruk-3680-w-p52191",
    award: "budget",
    superlative: "Billigast med app",
    pros: [
      "119 kronor för 16 A, app och schema",
      "Betyget 4,5 av 750 kunder, det överlägset största underlaget av timrarna",
      "Viloförbrukning under 0,5 W",
    ],
    cons: [
      "−20 °C som botten, fem grader sämre än de båda Shelly-pluggarna",
      "Inget Matter, så den är beroende av att Smart Life-appen finns kvar",
      "Ingen astrofunktion, du ställer klockslag",
    ],
    specs: [
      { label: "Typ", value: "Smart plugg", highlight: true },
      { label: "Maxlast", value: "3 680 W (16 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      /* Kjells produktsida, artikel 52191, skriver "Lägsta drifttemperatur:
         -20 °C" i produkttexten. Läst 2026-08-06. Ingen övre gräns anges. */
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Från −20 °C", highlight: true },
      { label: "Styrning", value: "App och schema, inget astro", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Viloförbrukning", value: "Under 0,5 W" },
      { label: "Mått", value: "80 × 58 × 93 mm" },
    ],
    verdict:
      "Cleverio GP120 kostar 119 kronor och är med god marginal den billigaste smarta pluggen här.\n\nFör pengarna får du 16 A och 3 680 W, alltså motorvärmaren med kupévärmaren på samma uttag, plus app och schemaläggning. Drifttemperaturen bottnar på −20 °C, vilket räcker för en normal vinter söder om fjällkedjan. 750 kunder har satt betyget 4,5, det överlägset största underlaget bland timrarna.\n\nDet den inte har är en astrofunktion. Du ställer fasta klockslag, och de blir fel några veckor efter att du satt dem, vilket märks direkt på belysning som ska gå året om. Utan Matter är den dessutom beroende av att Smart Life-appen finns kvar.\n\nSka julbelysningen eller motorvärmaren styras från mobilen och du ändå tänkt ha en app i telefonen är det här det billigaste rimliga köpet. Ska belysningen följa solnedgången året runt lägger du 126 kronor till på Smartline utomhuskontakt.",
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
      /* 1,5 och inte 2,0: 689 kronor är dyrast på sidan, och utan
         Z-Wave-hubb är produkten ett förlängningsuttag. Justeringen gjordes
         2026-08-03 för att skilja den från Cleverio GP120, som efter sitt
         prisfall till 119 kr visade samma betyg. Den fick effekt först när
         avrundningen i lib/products.ts rättades samma dag. */
      prisvarde: 1.5,
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
      { label: "Viloförbrukning", value: "Max 0,7 W" },
      { label: "Räckvidd", value: "Upp till 1 km utomhus" },
    ],
    verdict:
      "Shelly Wave Outdoor Plug S LR är byggd för avstånd, och kostar 689 kronor.\n\nZ-Wave Long Range når upp till en kilometer utomhus, vilket gör den till det enda rimliga valet när uttaget sitter i ett uthus eller vid en grind dit wifi aldrig når. Köldtåligheten är densamma som hos Outdoor Plug S Gen3, −25 till 51 °C, och S2-autentiseringen betyder att styrningen är krypterad och sker lokalt utan att något moln är inblandat.\n\nFörbehållen är stora. Utan en Z-Wave-hubb är produkten ett dyrt förlängningsuttag: det finns ingen app att ladda ner och ingen knapp som ger dig ett schema. Priset är mer än de fem billigaste produkterna här kostar tillsammans, och maxlasten stannar på samma 2 500 W som lillasystern.\n\nDe flesta ska inte köpa den här. Sitter uttaget så långt från huset att wifi aldrig når dit, och har du redan en Z-Wave-hubb, är den däremot det enda som faktiskt fungerar.",
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
      /* 3,0 och inte 3,5: priset är oförändrat men produkten var slut
         hos Kjell vid både bygget och lanseringskontrollen 2026-08-03.
         Ett pris du inte kan handla på är mindre värt. ⚠️ Samma sak här
         som hos Shelly Wave: justeringen skiljer den inte från
         Luxorparts, som fortfarande visar samma 6,8, eftersom prisvärde
         väger 10. Se kommentaren där. */
      prisvarde: 3,
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
      "Kräver en Zigbee-hubb för att fungera alls",
      "Ingen astrofunktion, du ställer fasta klockslag",
    ],
    specs: [
      { label: "Typ", value: "Smart plugg", highlight: true },
      { label: "Maxlast", value: "3 680 W (16 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−10 till 40 °C", highlight: true },
      { label: "Styrning", value: "Kräver Zigbee-hubb", highlight: true },
      { label: "Matter", value: "Nej, Zigbee 3.0" },
      { label: "Energimätning", value: "Ja" },
    ],
    verdict:
      "Nedis Zigbee utomhus kostar 199 kronor och är den billigaste vägen in i ett Zigbee-hem.\n\n16 A, 3 680 W och energimätning för under tvåhundra kronor är ett av jämförelsens bättre papper, och Zigbee betyder att pluggen styrs lokalt via hubben utan att belasta wifi-nätet.\n\nSedan står problemet i specifikationen. Drifttemperaturen är −10 till 40 °C, femton grader sämre i botten än Shellys. En plugg som ska styra julbelysningen i december arbetar utanför sitt spann flera veckor om året, och då lovar tillverkaren ingenting om att den fungerar. Lägg till att den kräver en Zigbee-hubb.\n\nBor du längst i söder och redan har Zigbee kan den göra jobbet. I resten av landet tar du Shelly Outdoor Plug S Gen3, som är specad ner till −25 °C.",
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
      /* 1,5 och inte 3,0: drifttemperaturen var satt som okänd. Luxorparts egen
         bruksanvisning för artikel 40711, daterad 2022-01-31, anger
         "Temperatur −10 °C till 40 °C" i specifikationstabellen på svenska,
         norska och engelska. Läst 2026-08-06. Det är samma spann som Nedis
         Zigbee, som får 1,5 för samma IP-klass och samma siffra. Betyget följer
         alltså den produkt den nu bevisligen är likvärdig med. Sänkningen
         flyttar den från sjätte till åttonde plats. */
      vaderskydd: 1.5,
      styrning: 2.5,
      maxlast: 4.5,
      driftsakerhet: 4.5,
      prisvarde: 2,
    },
    price: 279.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/el-verktyg/starkstrom/timers-klockstrombrytare/luxorparts-digital-timer-7-dygn-for-utomhusbruk-p40711",
    superlative: "Håller tiden genom strömavbrottet",
    pros: [
      "Uppladdningsbart backupbatteri som håller upp till 100 timmar",
      "Tio programmerbara till- och frånslag, ner till en minuts steg",
      "Slumpmässig förlängning på 2 till 30 minuter, som ser bebott ut",
    ],
    cons: [
      "−10 till 40 °C, alltså utanför sitt spann flera veckor varje vinter",
      "280 kronor, alltså dyrare än två av de smarta pluggarna",
      "Fast klockslag, ingen astrofunktion",
    ],
    specs: [
      { label: "Typ", value: "Digital timer", highlight: true },
      /* Bruksanvisningen för artikel 40711 anger "Kapacitet 16 A, 3600 W".
         Kjells produkttext anger bara 3 600 W. Läst 2026-08-06. */
      { label: "Maxlast", value: "3 600 W (16 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      /* Luxorparts bruksanvisning för artikel 40711, daterad 2022-01-31,
         specifikationstabellen: "Temperatur −10 °C till 40 °C". Samma tal i den
         svenska, norska och engelska spalten. Läst 2026-08-06. */
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−10 till 40 °C", highlight: true },
      { label: "Styrning", value: "Display, 10 program per vecka", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Backupbatteri", value: "NiMH, upp till 100 h" },
      { label: "Kortaste steg", value: "1 minut" },
      { label: "Slumpfunktion", value: "2 till 30 minuter" },
    ],
    verdict:
      "Luxorparts Digital timer 7 dygn är timern för den som vill ha ett veckoschema utan app, och den kostar 280 kronor.\n\nBackupbatteriet är skälet att välja den. 100 timmars gångreserv betyder att ett strömavbrott i december inte gör att timern går fel resten av säsongen, vilket är precis vad som händer med en mekanisk skiva. Tio program i veckan, steg ner till en minut och 16 A räcker till både ljusslingorna och kupévärmaren, och slumpfunktionen på 2 till 30 minuter finns för att belysningen ska se bebodd ut när ni är bortresta.\n\nKylan är svagheten, och den är allvarlig för något som ska sitta ute i december. Drifttemperaturen är −10 till 40 °C, samma smala spann som Nedis Zigbee, alltså utanför specifikationen flera veckor varje normal svensk vinter.\n\nSka timern sitta under tak eller i en carport och du vill slippa ännu en app är den värd sina 280 kronor. Ska den sitta oskyddad hela vintern tar du Shelly Outdoor Plug S Gen3 för 17 kronor mer.",
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
      "Bara 1 000 W och 5 A, den överlägset lägsta maxlasten här",
      "Bruksanvisningen förbjuder värmare helt, så motorvärmaren är utesluten",
      "Ljussensorn luras av gatubelysning och av snö som lägger sig över den",
    ],
    specs: [
      { label: "Typ", value: "Skymningsrelä", highlight: true },
      /* Julas bruksanvisning för artikel 006053 anger "Max load 1000 W,
         Amperage Max 5 A" i den engelska och tyska tekniska datan. Julas
         produktsida anger varken effekt eller ström. Läst 2026-08-06. */
      { label: "Maxlast", value: "1 000 W (5 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      /* Bruksanvisningen och produktsidan anger båda kapslingsklass och
         märkeffekt men ingen drifttemperatur. Kontrollerat 2026-08-06. */
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven", highlight: true },
      { label: "Styrning", value: "Ljussensor plus nedräkning", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Ljuskänslighet", value: "5 till 75 lux" },
      { label: "Backupbatteri", value: "Behövs inte, ingen klocka" },
      /* Julas specifikation för 006053, läst 2026-08-06. */
      { label: "Mått", value: "93 × 90 × 210 mm" },
    ],
    verdict:
      "Anslut Skymningsrelä sköter tändningstiden med en ljussensor, och kostar 129 kronor.\n\nDen tänder när ljuset omkring sensorn faller under skymningsnivån, någonstans mellan 5 och 75 lux, alltså i takt med årstiden utan att du någonsin ställer om något. Det finns ingen klocka i produkten, så ett strömavbrott lämnar ingenting fel efter sig. Nedräkningen ovanpå släcker efter 2, 4, 6 eller 8 timmar, så belysningen behöver inte lysa till gryningen. 236 kunder har satt 4,6, det högsta kundbetyget bland timrarna.\n\nDen faller på en enda siffra. 1 000 W och 5 A är en fjärdedel av vad de bästa här klarar, och bruksanvisningen förbjuder dessutom värmare helt, vilket utesluter motorvärmare och terrassvärmare oavsett effekt.\n\nTill ljusslingor och LED-fasadbelysning året om finns ingen enklare produkt, och ingen billigare som följer solen. Värme kopplar du någon annanstans.",
  },
  {
    id: "anslut-digital-utomhustimer",
    userRating: { value: 3.7, count: 167, checkedAt: PRICE_CHECKED },
    brand: "Anslut",
    name: "Digital utomhustimer IP44",
    shortName: "Digital utomhustimer",
    image: productImage(UTOMHUSTIMER.slug, "anslut-digital-utomhustimer"),
    tagline:
      "Veckoschema och backupbatteri för under hundra kronor, med steg ner till en minut.",
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
      "1 800 W och 8 A, ungefär hälften av vad den mekaniska systern klarar",
      "Betyget 3,7, det lägsta i jämförelsen",
      "Måste sitta lodrätt för att IP44 ska gälla",
    ],
    specs: [
      { label: "Typ", value: "Digital timer", highlight: true },
      /* Julas bruksanvisning för artikel 006248 anger "Max load 1800 W,
         Amperage Max 8 A". Produktsidan anger ingen ström. Läst 2026-08-06. */
      { label: "Maxlast", value: "1 800 W (8 A)", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      /* Bruksanvisningens tekniska data ger effekt, ström och kapslingsklass,
         men ingen drifttemperatur. Kontrollerat 2026-08-06. */
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven", highlight: true },
      { label: "Styrning", value: "Display, 140 slag per vecka", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Backupbatteri", value: "Ja, fulladdat efter 2 h i uttaget" },
      /* "Timern måste placeras i vertikalt läge för att kapslingsklass IP44
         ska bibehållas", bruksanvisningen för 006248. Läst 2026-08-06. */
      { label: "Montering", value: "Lodrätt läge krävs för IP44" },
      /* Julas specifikation för 006248, läst 2026-08-06. */
      { label: "Mått", value: "100 × 90 × 213 mm" },
    ],
    verdict:
      "Anslut Digital utomhustimer kostar 99,90 kronor och ger ett veckoschema med backupbatteri för under hundralappen.\n\n140 till- och frånslag i veckan är långt fler än någon behöver, och batteriet gör att tiden står kvar efter ett strömavbrott, vilket den mekaniska systern inte klarar. Stegen ställs dessutom i minuter, inte i halvtimmar.\n\nLasten går åt fel håll. 1 800 W och 8 A är ungefär hälften av vad den mekaniska timern i samma serie klarar för halva priset, och 167 kunder har satt 3,7, det lägsta betyget bland timrarna. Den måste också sitta lodrätt för att kapslingsklassen ska hålla, vilket utesluter en del uttag under tak.\n\nBehöver du fler än ett par kopplingar om dygnet till en ljusslinga och vill hålla dig under hundralappen är den ett rimligt köp. Ska något med värme i kopplas in tar du den mekaniska timern för 49,90, som klarar nästan dubbelt så mycket.",
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
      "49,90 kronor, en femtedel av testvinnaren",
      "3 500 W, alltså mer last än de båda Shelly-pluggarna",
      "Ingen app, inget konto och ingenting som kan sluta stödjas",
    ],
    cons: [
      "Tappar tiden helt vid strömavbrott och går fel resten av säsongen",
      "Halvtimmessegment och samma schema varje dygn",
      "Fast klockslag, så den blir fel när solnedgången flyttar sig",
    ],
    specs: [
      { label: "Typ", value: "Mekanisk timer", highlight: true },
      /* Bruksanvisningen för artikel 406-065 anger 230 V / 50 Hz, maxeffekt
         3 500 W och IP44, men ingen märkström. Den tidigare uppgiften "16 A"
         var uträknad ur effekten och inte hämtad någonstans, och är borttagen.
         Läst 2026-08-06. */
      { label: "Maxlast", value: "3 500 W", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      /* Varken bruksanvisningen eller produktsidan anger drifttemperatur.
         Kontrollerat 2026-08-06. */
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "Ej angiven", highlight: true },
      { label: "Styrning", value: "Segment om 30 min, 24 h", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Backupbatteri", value: "Nej" },
      /* Julas specifikation för 406065, läst 2026-08-06. */
      { label: "Mått", value: "100 × 72 × 190 mm" },
    ],
    verdict:
      "Anslut Utomhustimer kostar 49,90 kronor och är den billigaste vägen till att julbelysningen tänds och släcks av sig själv.\n\n3 500 W är mer last än de båda Shelly-pluggarna klarar, alltså gott om marginal till en motorvärmare, och 609 kunder har satt 4,5, det näst största betygsunderlaget bland timrarna. Det finns ingen app, inget konto och ingen molntjänst som kan stängas.\n\nBristerna är verkliga och de sitter i schemat. Samma tider gäller varje dygn, segmenten är om 30 minuter, och vid ett strömavbrott stannar skivan och går sedan fel med exakt avbrottets längd tills någon ställer om den.\n\nSka den tända en ljusslinga i en buske mellan fyra och elva under sex veckor i december gör den allt som behövs, och då finns det ingen anledning att lägga 259 kronor på Tapo P410M. Köp den smarta när du har ett skäl: motorvärmaren som ska starta olika tider, uthuset som wifi inte når, eller att du vill kunna släcka hemifrån.",
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
      "En egen produkttyp: den mäter utetemperaturen och räknar själv ut hur länge motorvärmaren behöver gå, i stället för att du gissar. Utesluten eftersom vi inte fick fram vare sig pris eller fullständig specifikation hos butiken. Värd att känna till om motorvärmare är hela anledningen till köpet.",
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
      "Det beror helt på produkten, och spannet är stort. IP-klassen säger ingenting om kyla, bara om vatten och damm. Av produkterna i den här jämförelsen går de båda Shelly-pluggarna ner till −25 °C, TP-Link Tapo P410M och Cleverio GP120 till −20 °C, medan Nedis Zigbee och Luxorparts digitala timer stannar redan vid −10 °C. Fyra av tio anger ingen drifttemperatur alls: Smartline utomhuskontakt och Julas tre timers. En produkt som används utanför sitt temperaturspann behöver inte gå sönder, men tillverkaren lovar ingenting om att den fungerar, och en mekanisk kopplingsskiva blir trög när smörjmedlet stelnar.",
  },
  {
    question: "Vad är skillnaden mellan mekanisk och digital utomhustimer?",
    answer:
      "En mekanisk timer är en skiva som snurrar ett varv per dygn, där du trycker ner segment om oftast trettio minuter för de tider strömmen ska vara på. Samma schema gäller varje dygn, och vid ett strömavbrott stannar skivan och går sedan fel tills någon ställer om den. En digital timer har display och kan ha olika program för olika veckodagar, kortare steg och ofta ett backupbatteri som håller tiden vid avbrott. Priset förutsäger däremot inte kapaciteten: Julas mekaniska timer på 49,90 kronor klarar 3 500 W medan deras digitala på 99,90 stannar vid 1 800 W.",
  },
  {
    question: "Vilken timer klarar en motorvärmare?",
    answer:
      "En som är märkt för minst 16 A, alltså runt 3 680 W, om kupévärmaren sitter på samma uttag. Själva motorvärmaren ligger ofta mellan 400 och 1 000 W, men kupévärmaren kan ensam dra 1 500 W eller mer, och det är summan som räknas. Av produkterna i den här jämförelsen klarar TP-Link Tapo P410M, Smartline utomhuskontakt, Cleverio GP120, Nedis Zigbee och Luxorparts digitala timer 16 A, och Julas mekaniska timer är märkt 3 500 W. Skymningsreläet på 1 000 W och den digitala Anslut-timern på 1 800 W räcker inte, och skymningsreläets bruksanvisning förbjuder dessutom värmare helt. Räkna ihop båda värmarnas effekt och lägg på tjugo procent innan du väljer.",
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
    question: "Var ska skymningsreläets ljussensor sitta?",
    answer:
      "Där den ser himlen men inte annan belysning. Sitter sensorn under ett tak, i skuggan av en vägg eller vänd mot en gatlykta får den fel bild av hur mörkt det är, och belysningen tänds för sent, för tidigt eller inte alls. Snö som lägger sig över sensorn ger samma effekt. En vanlig lösning är att låta reläet sitta högre än den belysning det styr, så att det inte mäter sitt eget ljus, vilket annars ger en produkt som tänder och släcker om vartannat.",
  },
  {
    question: "Behöver jag jordfelsbrytare för timern utomhus?",
    answer:
      "Uttaget den sitter i ska ha det. Elsäkerhetsverket skriver att uttag utomhus alltid ska vara skyddsjordade, och att det för nya uttag dessutom finns krav på jordfelsbrytare. Har du ett äldre uttag utan kan du komplettera med en portabel jordfelsbrytare, och de påminner om att testknappen ska tryckas in regelbundet så att du vet att den bryter. Två saker till ur samma text är värda att upprepa, eftersom det är det som oftast går fel med julbelysning. Anslut aldrig en apparat som kräver skyddsjord och ska användas ute till ett ojordat uttag inomhus, det kan vara livsfarligt. Och måste du använda skarvsladd ska den vara jordad, avsedd för utomhusbruk och skyddad mot klämskador. En timer med rätt IP-klass hjälper inte om strömmen till den kommer genom en inomhussladd ut genom en fönsterspringa."
  },
];
