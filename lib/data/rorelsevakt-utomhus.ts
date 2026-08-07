import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { RORELSEVAKT_UTOMHUS } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /rorelsevakt-utomhus.
 *
 * Priser, kundbetyg och lagerstatus lästa i butikernas egen JSON-LD på
 * PRICE_CHECKED. Belastningsrader, räckvidder, luxområden, efterlystider och
 * drifttemperaturer hämtade hos tillverkaren eller hos Steinels svenska
 * distributör Karl H Ström (khs.se), som publicerar hela den tekniska
 * databladstexten per modell.
 *
 * ## Sidans fynd, och varför `Last LED` är två kolumner och inte en
 *
 * Wattalet i annonsen gäller resistiv last, alltså glödlampa. Fem tillverkare
 * delar upp belastningen på fem olika sätt och handeln plockar genomgående det
 * högsta talet:
 *
 * - Steinel räknar mikrofarad och antal drivdon (IS 240: 132 µF / 8 don)
 * - Steinels nyare generation räknar watt per lampstorlek (IS 3180: 100 W av
 *   lampor under 2 W, 300 W av 2–8 W, 600 W av lampor över 8 W)
 * - Schneider anger watt per lamptyp (200 W LED mot 2 200 W resistivt)
 * - ESYLUX anger startström i ampere (max 4,5 A)
 * - Kjell och Biltema skiljer resistivt från induktivt
 * - Jula anger glödljus och halogen och hoppar över LED
 *
 * Det är samma begränsning uttryckt på fem sätt, och det finns ingen omräkning
 * mellan dem. Därför står enheten i värdet.
 *
 * ## Fyra av nio är Steinel
 *
 * Det speglar svensk handel och inget annat. Bygghemma, Jula, Proffsmagasinet
 * och Karl H Ström leder alla sina kategorier med Steinel, och de tre modeller
 * Bygghemma rankar i sin egen jämförelse är två Steinel och en Sunwind. Det
 * står utskrivet på sidan, som "nio av tretton är TP-Link" på /wifi-repeater.
 *
 * ## Butikerna betalar nästan ingenting, och det ändrar ingenting
 *
 * Bygghemma bär tre av nio och finns inte i något nätverk vi kartlagt. Jula och
 * Biltema likaså. Kvar blir Kjell 5 %, Proffsmagasinet 2 % och Elbutik, som
 * ligger på Tradedoubler där vi saknar konto. Samma bild som /utomhustimer:
 * butikerna som äger den billiga halvan av kategorin saknas i Adtraction.
 *
 * Att i stället lyfta en dyrare produkt hos en butik som betalar vore precis
 * det förtroendebrott sajten finns för att undvika. Se
 * .agent/research/rorelsevakt-utomhus.md §6.
 *
 * ## Anslut Rörelsevakt IP44 saknar betyg på `last` med flit
 *
 * Julas produktsida och manual anger 1 000 W för glödljus och 500 W för
 * halogen. Vad reläet tål med elektroniska drivdon har inte gått att belägga,
 * och att sätta ett lågt betyg där hade betygsatt vår research i stället för
 * varan. Vikten fördelas om, se `redistributeMissing` i lib/products.ts.
 *
 * ## ⚠️ Proffsmagasinet motsäger sig själv om Steinel IS 1
 *
 * Punktlistan på deras produktsida säger "500 W glödljus och halogen, max 3 st
 * HF-don"; specifikationsrutan på samma sida säger "Max. omkopplingseffekt
 * 1 000 W". Karl H Ströms tekniska data för samma artikel säger 88 µF, max 3
 * don och 300 W lysrör. Vi använder distributörens, som är den enda av de tre
 * som är fullständig.
 *
 * Kriteriebetygen är redaktionell bedömning utifrån specifikationer och
 * källorna i lib/sources.ts, inte mätningar.
 *
 * AFFILIATE-SWAP — `merchantUrl` är butikens egen produktsida. Inget
 * `affiliateUrl` någonstans ännu. Se lib/links.ts för vad som faktiskt renderas.
 */

export const PRICE_CHECKED = "2026-08-07";

const SEEDS: ProductSeed[] = [
  {
    id: "steinel-is-240",
    brand: "Steinel",
    name: "IS 240 rörelsevakt",
    shortName: "IS 240",
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "steinel-is-240"),
    tagline: "240 grader, alltså hela hörnet och båda väggarna från en dosa.",
    scores: {
      last: 4.5,
      bevakning: 5,
      vaderskydd: 4.5,
      installningar: 4.5,
      prisvarde: 2.5,
    },
    price: 1143,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bygghemma",
    merchantUrl:
      "https://www.bygghemma.se/hus-och-bygg/elmaterial-och-energi/elartiklar-och-elprodukter/sensor-och-rela/rorelsevakt-steinel-is-240/p-1554658-1554659",
    award: "winner",
    superlative: "Bäst för hörnet på en gårdsplan",
    pros: [
      "240 graders bevakning, så ett ytterhörn täcker två fasader med en enhet",
      "Åtta drivdon eller 132 mikrofarad, mest elektronisk last i jämförelsen",
      "Linsen finjusteras 160 grader i sidled, så gatan går att skärma bort",
    ],
    cons: [
      "Slår inte till under 10 W, så en ensam LED-lampa på 5 W håller den tyst",
      "Nästan tretton gånger dyrare än Biltemas, som ser 180 grader",
      "Justervreden sitter dolt under kåpan och kräver att fronten öppnas",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "240°", highlight: true },
      { label: "Räckvidd", value: "12 m tvärs över synfältet", highlight: true },
      { label: "Last LED", value: "132 µF, max 8 drivdon", highlight: true },
      { label: "Last glödljus", value: "1 000 W resistiv last", highlight: true },
      { label: "Minsta last", value: "10 W" },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP54", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 50 °C", highlight: true },
      { label: "Efterlystid", value: "10 s till 15 min", highlight: true },
      { label: "Skymningsnivå", value: "2–2 000 lux" },
      { label: "Montering", value: "Vägg, ytterhörn, stolpe eller mast" },
      { label: "Justering", value: "Linsen 160° i sidled, avskärmningar medföljer" },
      { label: "Strömförsörjning", value: "230/240 V AC, 50 Hz" },
      { label: "Mått", value: "100 × 90 × 60 mm" },
    ],
    verdict:
      "Steinel IS 240 ser 240 grader, vilket är det bredaste synfältet här, och kostar 1 143 kronor.\n\nDe extra graderna är hela argumentet för att betala så mycket. Sätter du den på ett ytterhörn täcker en enhet både uppfarten och gaveln, och du slipper dra fram en andra dosa på andra sidan huset. Linsen går dessutom att finjustera 160 grader i sidled med avskärmningar som följer med, så gatan utanför tomten kan skäras bort utan att du tappar entrén. På elsidan tar den åtta drivdon eller 132 mikrofarad, mer elektronisk last än något annat här, vilket i praktiken betyder att du kan hänga fyra LED-armaturer på den utan att fundera.\n\n**Golvet är det som överraskar: under 10 watt slår reläet inte till alls.** En modern LED-lampa på 5 W räcker inte för att hålla den igång, så en ensam liten entrélykta är fel last för den här vakten.\n\nKöp den om du ska bevaka ett hörn eller två fasader från samma punkt. Ska du bevaka en rak vägg räcker IS 180-2 för 164 kronor mindre, och ska du bara tända över garageporten gör IS 1 samma jobb för 269.",
  },
  {
    id: "steinel-is-180-2",
    brand: "Steinel",
    name: "IS 180-2 rörelsevakt",
    shortName: "IS 180-2",
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "steinel-is-180-2"),
    tagline: "Linsen sitter i två lägen: 5 meter för entrén, 12 för uppfarten.",
    scores: {
      last: 4,
      bevakning: 4,
      vaderskydd: 4.5,
      installningar: 4.5,
      prisvarde: 2.5,
    },
    price: 979,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bygghemma",
    merchantUrl:
      "https://www.bygghemma.se/hus-och-bygg/elmaterial-och-energi/elartiklar-och-elprodukter/sensor-och-rela/rorelsevakt-steinel-is-180-2/p-1554661",
    superlative: "Bäst för en lång rak fasad",
    pros: [
      "Linsen flyttas mellan 5 och 12 meter, så räckvidden kortas utan täckskal",
      "Sex drivdon och 132 mikrofarad, näst mest elektronisk last här",
      "Flatast av Steinel-modellerna, 56 mm ut från väggen",
    ],
    cons: [
      "180 grader, så ett ytterhörn kräver två enheter i stället för en",
      "Efterlystiden stannar vid 15 minuter mot 35 på IS 130-2",
      "979 kronor för ett synfält Biltemas 89,90-kronorsvakt också har",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "180°", highlight: true },
      { label: "Räckvidd", value: "5 eller 12 m tvärs, två linslägen", highlight: true },
      { label: "Last LED", value: "132 µF, max 6 drivdon", highlight: true },
      { label: "Last glödljus", value: "400 W lysrör", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP54", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 50 °C", highlight: true },
      { label: "Efterlystid", value: "10 s till 15 min", highlight: true },
      { label: "Skymningsnivå", value: "2–2 000 lux" },
      { label: "Montering", value: "Vägg" },
      { label: "Justering", value: "Linsen i två lägen, avskärmningar medföljer" },
      { label: "Strömförsörjning", value: "230/240 V AC, 50 Hz" },
      { label: "Mått", value: "120 × 76 × 56 mm" },
    ],
    verdict:
      "Steinel IS 180-2 är den flataste vakten här, 56 millimeter ut från väggen, och kostar 979 kronor.\n\nDet som skiljer den från resten av 180-gradersfältet sitter i linsen. Den kan sättas i två lägen, ett på 5 meter och ett på 12, vilket betyder att du kortar räckvidden med ett handgrepp i stället för att klippa till täckskal. På en entré där du inte vill att lampan tänds av folk som passerar på trottoaren är det skillnaden mellan en vakt som fungerar och en som irriterar. Sex drivdon och 132 mikrofarad räcker till tre eller fyra LED-armaturer på samma krets.\n\n**Synfältet är ändå bara 180 grader, och det får du för 89,90 kronor hos Biltema.** Det du betalar de återstående niohundra för är linsen, kapslingen och att den håller −20 grader utan att bli trög.\n\nSka du bevaka en rak fasad och slippa att lampan tänds av gatan är det här rätt vakt. Ska du täcka ett hörn tar du IS 240, och letar du billigast möjliga 180-gradersvakt står Biltema längre ned i listan.",
  },
  {
    id: "steinel-is-1",
    brand: "Steinel",
    name: "IS 1 rörelsevakt",
    shortName: "IS 1",
    userRating: { value: 5, count: 1, checkedAt: PRICE_CHECKED },
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "steinel-is-1"),
    tagline: "Håller lampan tänd i 35 minuter, längre än vakterna för tusen.",
    scores: {
      last: 3,
      bevakning: 3,
      vaderskydd: 4.5,
      installningar: 5,
      prisvarde: 5,
    },
    price: 269,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter/steinel-is-1-rorelsesensor-120-vit-2361582",
    award: "editor",
    superlative: "Bäst för uppfarten till garaget",
    pros: [
      "IP54 för 269 kronor, samma kapsling som vakterna för fyra gånger pengarna",
      "Efterlystid upp till 35 minuter, så en armatur hinner komma upp i ljus",
      "Underkrypskydd i linsen, alltså ett segment rakt ned längs väggen",
    ],
    cons: [
      "120 grader och 10 meter, minst av 230-voltsvakterna här",
      "Tre drivdon, så fler än ett par LED-armaturer blir för mycket",
      "Sitter 120 mm ut från väggen trots att den är den minsta i övrigt",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "120°", highlight: true },
      { label: "Räckvidd", value: "10 m tvärs över synfältet", highlight: true },
      { label: "Last LED", value: "88 µF, max 3 drivdon", highlight: true },
      { label: "Last glödljus", value: "300 W lysrör", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP54", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 50 °C", highlight: true },
      { label: "Efterlystid", value: "10 s till 35 min", highlight: true },
      { label: "Skymningsnivå", value: "2–2 000 lux" },
      { label: "Underkrypskydd", value: "Ja" },
      { label: "Montering", value: "Vägg eller tak" },
      { label: "Justering", value: "Höjd och sidled, täckskal medföljer" },
      { label: "Strömförsörjning", value: "230/240 V AC, 50 Hz" },
      { label: "Mått", value: "50 × 80 × 120 mm" },
    ],
    verdict:
      "Steinel IS 1 kostar 269 kronor och har samma IP54-kapsling som modellerna för fyra gånger pengarna.\n\nDen är byggd för en punkt, inte för en gårdsplan: 120 grader och 10 meter räcker till en garageport, en altandörr eller en trappa upp till entrén. Linsen har underkrypskydd, alltså ett segment som tittar rakt ned längs väggen, vilket är det som avgör om någon kan gå in tätt under sensorn utan att den märker det. Efterlystiden går upp till 35 minuter, längre än på både IS 240 och IS 180-2, och det är den inställning som gör att en armatur som behöver tid för att komma upp i fullt ljus slipper slås av och på hela kvällen.\n\n**Tre drivdon är taket.** Hänger du fyra LED-strålkastare på den ligger du över, och då är det IS 240 eller en kontaktor som gäller.\n\nHar du ett ställe att lysa upp och en eller två armaturer att göra det med finns det ingen anledning att betala mer. Ska du täcka två väggar från samma punkt är IS 240 svaret i stället.",
  },
  {
    id: "steinel-is-130-2",
    brand: "Steinel",
    name: "IS 130-2 rörelsevakt",
    shortName: "IS 130-2",
    userRating: { value: 5, count: 3, checkedAt: PRICE_CHECKED },
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "steinel-is-130-2"),
    tagline:
      "Riktas om efter uppsättning, när du sett var ljuset faktiskt faller.",
    scores: {
      last: 3.5,
      bevakning: 3.5,
      vaderskydd: 4.5,
      installningar: 5,
      prisvarde: 3,
    },
    price: 549,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Bygghemma",
    merchantUrl:
      "https://www.bygghemma.se/hus-och-bygg/elmaterial-och-energi/elartiklar-och-elprodukter/sensor-och-rela/rorelsevakt-steinel-is-130-2/p-1554665-1554667",
    superlative: "Bäst för en smal passage",
    pros: [
      "Sensorhuvudet vrids 50 grader i sidled och 90 i höjdled efter montering",
      "Efterlystid upp till 35 minuter, längst tillsammans med IS 1",
      "Fyra drivdon och 88 mikrofarad, mer än Kjells och Biltemas vakter tar",
    ],
    cons: [
      "130 grader, alltså smalast av 230-voltsvakterna i jämförelsen",
      "Dubbelt så dyr som IS 1, som ser tio meter mot samma tolv",
      "80 mm djup, den klumpigaste av de tre Steinel-modellerna på fasaden",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "130°", highlight: true },
      { label: "Räckvidd", value: "12 m tvärs över synfältet", highlight: true },
      { label: "Last LED", value: "88 µF, max 4 drivdon", highlight: true },
      { label: "Last glödljus", value: "400 W lysrör", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP54", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 50 °C", highlight: true },
      { label: "Efterlystid", value: "10 s till 35 min", highlight: true },
      { label: "Skymningsnivå", value: "2–2 000 lux" },
      { label: "Montering", value: "Vägg" },
      { label: "Justering", value: "50° i sidled, 90° i höjdled" },
      { label: "Strömförsörjning", value: "230/240 V AC, 50 Hz" },
      { label: "Mått", value: "120 × 50 × 80 mm" },
    ],
    verdict:
      "Steinel IS 130-2 ser 130 grader på 12 meter och kostar 549 kronor.\n\nDet smala synfältet är poängen och inte en brist. En passage mellan hus, en gång längs en tomtgräns eller ett cykelförråd bevakas bättre av en vakt som tittar rakt fram än av en som tar in grannens uppfart på köpet. Sensorhuvudet vrids dessutom 50 grader i sidled och 90 i höjdled efter att den suttit uppe, vilket betyder att du kan rikta om den när du sett var den faktiskt tänder. Fyra drivdon räcker till tre LED-armaturer.\n\n**Prislappen är svår att försvara mot IS 1.** För 269 kronor får du samma IP54, samma 35 minuter och samma märke, mot 10 meter i stället för 12 och 120 grader i stället för 130.\n\nTa den om du ska rikta om vakten efter uppsättning och vet att du kommer att behöva det. Vet du redan var ljuset ska falla gör IS 1 samma sak för halva priset.",
  },
  {
    id: "kjell-rorelsevakt-vagg",
    brand: "Kjell & Company",
    name: "Rörelsevakt med skymningsrelä Vägg",
    shortName: "Rörelsevakt Vägg",
    userRating: { value: 4.5, count: 108, checkedAt: PRICE_CHECKED },
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "kjell-rorelsevakt-vagg"),
    tagline: "Slår till redan vid 1 watt, alltså även för en ensam LED-lampa.",
    scores: {
      last: 4,
      bevakning: 3.5,
      vaderskydd: 3,
      installningar: 3,
      prisvarde: 4.5,
    },
    price: 199.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/belysning-lampor/skymningsrela/rorelsevakt-med-skymningsrela-vagg-p50614",
    award: "budget",
    superlative: "Bäst för dig som bytt till LED",
    pros: [
      "Minsta last 1 W, lägsta golvet här och tio gånger under Steinels",
      "300 W induktiv last, alltså gott om marginal för LED-drivdon",
      "180 grader på 12 meter för 199,90 kronor",
    ],
    cons: [
      "IP44 i stället för IP54, så en fasad utan tak över sig är fel plats",
      "Efterlystiden stannar vid 7 minuter mot 35 hos Steinel",
      "Kräver neutralledare i dosan, vilket äldre hus sällan har framdraget",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "180°", highlight: true },
      { label: "Räckvidd", value: "12 m", highlight: true },
      { label: "Last LED", value: "300 W induktiv last", highlight: true },
      { label: "Last glödljus", value: "1 200 W resistiv last", highlight: true },
      { label: "Minsta last", value: "1 W" },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Efterlystid", value: "10 s till 7 min", highlight: true },
      { label: "Skymningsnivå", value: "3–2 000 lux" },
      { label: "Montering", value: "Vägg" },
      { label: "Strömförsörjning", value: "230 V, skruvplint, kräver neutralledare" },
      { label: "Mått", value: "121 × 73 × 82 mm" },
    ],
    verdict:
      "Kjells väggvakt kostar 199,90 kronor och slår till redan vid 1 watt.\n\nGolvet är det som gör den intressant, och det är precis tvärtemot vad man förväntar sig av den billigaste halvan. Steinel IS 240 behöver 10 watt för att reläet ska dra, så en ensam LED-lampa på 5 W håller den tyst; den här tänder samma lampa. Uppåt tar den 300 watt induktiv last, vilket räcker till ett par LED-strålkastare, och 180 grader på 12 meter täcker en normal villafasad. 108 kunder hos Kjell har satt 4,5 av 5.\n\n**Kapslingen är IP44 och inte IP54.** Det betyder stänk från alla håll men inte vattenstråle, så en helt oskyddad gavelvägg mot väster är fel plats för den.\n\nHar du bytt ut hela utebelysningen mot LED och undrar varför den gamla vakten inte längre tänder är det här svaret för tvåhundralappen. Sitter vakten under bar himmel tar du en Steinel med IP54 i stället.",
  },
  {
    id: "biltema-rorelsevakt-ip44",
    brand: "Biltema",
    name: "Rörelsevakt IP44 (46-207)",
    shortName: "Biltema 46-207",
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "biltema-rorelsevakt-ip44"),
    tagline: "Samma 180 grader och 12 meter som vakterna för tusenlappen.",
    scores: {
      last: 3.5,
      bevakning: 3.5,
      vaderskydd: 3,
      installningar: 2,
      prisvarde: 4.5,
    },
    price: 89.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/bygg/elinstallationer/rorelsevakter/rorelsevakt-ip44-2000023280",
    superlative: "Bäst för ett enkelt garageljus",
    pros: [
      "89,90 kronor, billigast i jämförelsen med god marginal",
      "300 W för lysrör och lågenergilampor, samma tak som Kjells vakt",
      "Monteringshöjden står angiven, 1,8 till 2,5 meter",
    ],
    cons: [
      "Efterlystiden går bara till 4 minuter, kortast här",
      "Skymningsreläet stannar vid 200 lux, så den tänder sent i skymningen",
      "IP44 och inget mer, alltså ingen plats på en oskyddad gavel",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "180°", highlight: true },
      { label: "Räckvidd", value: "12 m", highlight: true },
      { label: "Last LED", value: "300 W lysrör och lågenergilampor", highlight: true },
      { label: "Last glödljus", value: "1 000 W", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Efterlystid", value: "10 s till 4 min", highlight: true },
      { label: "Skymningsnivå", value: "5–200 lux" },
      { label: "Montering", value: "Vägg" },
      { label: "Montagehöjd", value: "1,8–2,5 m" },
      { label: "Strömförsörjning", value: "230 V AC, 50 Hz" },
    ],
    verdict:
      "Biltemas rörelsevakt kostar 89,90 kronor och ser 180 grader på 12 meter.\n\nFör en tiondel av vad IS 240 kostar får du samma synfält och samma räckvidd, och 300 watt för lysrör och lågenergilampor är exakt samma tak som Kjells vakt för dubbla priset. Den anger dessutom monteringshöjden, 1,8 till 2,5 meter, vilket är det som avgör hur konen faller på marken och som resten av det billiga fältet lämnar åt dig att gissa. Till ett garageljus, en vedbod eller en soptunnesida gör den precis vad den ska.\n\n**Efterlystiden går bara till 4 minuter.** Står du och lastar ur bilen slocknar den mitt i, och du får vifta med armen för att få tillbaka ljuset.\n\nSka lampan tändas när du kliver ur bilen och slockna strax efter är det här hela produkten du behöver. Ska du stå kvar och göra något under lampan tar du Steinel IS 1 för 269 kronor, som håller den tänd i upp till 35 minuter.",
  },
  {
    id: "anslut-rorelsevakt-ip44",
    brand: "Anslut",
    name: "Rörelsevakt IP44 (422080)",
    shortName: "Anslut 422080",
    userRating: { value: 3.9, count: 216, checkedAt: PRICE_CHECKED },
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "anslut-rorelsevakt-ip44"),
    tagline: "Svart hölje, så den försvinner mot en tjärad eller falurött fasad.",
    scores: {
      bevakning: 3.5,
      vaderskydd: 3,
      installningar: 2.5,
      prisvarde: 4,
    },
    price: 99.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/el-och-belysning/elinstallation/belysningstillbehor/rorelsevakter-och-skymningsrela/rorelsevakt-422080/",
    superlative: "Bäst för en mörk träfasad",
    pros: [
      "Svart hölje, enda mörka vakten här och osynlig mot en tjärad fasad",
      "180 grader på 12 meter för 99,90 kronor",
      "Går ned till −20 grader, tio grader lägre än Nexas smarta sensor",
    ],
    cons: [
      "3,9 av 5 från 216 kunder, lägsta kundbetyget i jämförelsen",
      "Efterlystiden går till 7 minuter och ljusnivån ställs på ett vred utan skala",
      "1 000 W gäller glödljus och 500 W halogen, alltså inga tal du kan handla LED på",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "180°", highlight: true },
      { label: "Räckvidd", value: "12 m", highlight: true },
      { label: "Last glödljus", value: "1 000 W glödljus, 500 W halogen", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−20 till 45 °C", highlight: true },
      { label: "Efterlystid", value: "5 s till 7 min", highlight: true },
      { label: "Montering", value: "Vägg" },
      { label: "Färg", value: "Svart" },
      { label: "Strömförsörjning", value: "230 V" },
    ],
    verdict:
      "Julas Anslut-vakt kostar 99,90 kronor och är den enda svarta i jämförelsen.\n\nFärgen är ett verkligt argument och inte en detalj. En vit plastvakt på en falurött eller tjärad fasad syns från gatan och drar blicken till precis det du helst ville ha diskret; den här försvinner. I övrigt gör den vad den ska: 180 grader på 12 meter, ned till −20 grader och 5 sekunder till 7 minuters efterlystid. 216 kunder har satt betyg, fler än på någon annan produkt här.\n\n**Betyget de satt är 3,9 av 5, lägst i jämförelsen.** Det är inte ett underkännande, men det är en påtaglig marginal ned till Kjells 4,5 för dubbla priset.\n\nSka vakten sitta på en mörk fasad och kosta under hundralappen är den svår att gå förbi. Vill du ha kundernas eget omdöme på din sida lägger du hundra kronor till och tar Kjells väggvakt.",
  },
  {
    id: "esylux-md-120",
    brand: "ESYLUX",
    name: "MD 120 rörelsedetektor",
    shortName: "MD 120",
    userRating: { value: 4.5, count: 2, checkedAt: PRICE_CHECKED },
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "esylux-md-120"),
    tagline: "Klarar −25 grader, fem lägre än hela Steinel-serien.",
    scores: {
      last: 3,
      bevakning: 3.5,
      vaderskydd: 4,
      installningar: 2.5,
      prisvarde: 2.5,
    },
    price: 505,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter/esylux-md-120-rorelsesensor-120-3084766",
    superlative: "Bäst för fjällstugans vindsida",
    pros: [
      "−25 till 55 grader, bredaste temperaturspannet i jämförelsen",
      "Kulled som vrids och böjs, så konen riktas fritt efter montering",
      "Anger både djup och bredd på bevakningsområdet, 12 respektive 10 meter",
    ],
    cons: [
      "Efterlystiden går bara till 5 minuter, näst kortast här",
      "Startströmmen får inte överstiga 4,5 A, vilket är snålt för LED-strålkastare",
      "IP44 och 505 kronor, medan Steinel IS 1 ger IP54 för 269",
    ],
    specs: [
      { label: "Typ", value: "230 V-vakt", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "120°", highlight: true },
      { label: "Räckvidd", value: "12 m framåt, 10 m i sidled", highlight: true },
      { label: "Last LED", value: "Startström max 4,5 A", highlight: true },
      { label: "Last glödljus", value: "1 000 W", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−25 till 55 °C", highlight: true },
      { label: "Efterlystid", value: "Upp till 5 min", highlight: true },
      { label: "Skymningsnivå", value: "2–1 000 lux" },
      { label: "Underkrypskydd", value: "Ja" },
      { label: "Montering", value: "Vägg" },
      { label: "Justering", value: "Vrid- och böjbar kulled" },
      { label: "Strömförsörjning", value: "230 V, snabbanslutning" },
    ],
    verdict:
      "ESYLUX MD 120 går ned till −25 grader och kostar 505 kronor.\n\nFem grader lägre än hela Steinel-serien låter marginellt och är det inte i Jämtland eller norrut, där en normal februarinatt ligger under −20 och en kall vecka ligger under −25. Uppåt går den till 55 grader, vilket spelar roll på en söderfasad i plåt. Kulleden är den andra styrkan: hela sensorhuvudet både vrids och böjs, så konen kan riktas ned mot en trappa eller ut mot en grind efter att kabeln redan är dragen. Området anges dessutom både på djupet och på bredden, 12 meter framåt och 10 i sidled.\n\n**Startströmmen får inte passera 4,5 ampere.** En LED-strålkastare drar långt mer än sin märkeffekt i det ögonblick den slår på, och det är den toppen som svetsar ihop reläkontakter.\n\nSitter vakten där kylan är det verkliga problemet är det här den som håller längst. Ska den bara sitta på en villafasad i södra Sverige får du IP54, längre efterlystid och 236 kronor kvar i fickan med Steinel IS 1.",
  },
  {
    id: "nexa-sp-816",
    brand: "Nexa",
    name: "SP-816 Z-Wave rörelsevakt",
    shortName: "SP-816",
    image: productImage(RORELSEVAKT_UTOMHUS.slug, "nexa-sp-816"),
    tagline: "Batteridriven, så den sätts upp där ingen kabel går att dra.",
    scores: {
      last: 2,
      bevakning: 2.5,
      vaderskydd: 2,
      installningar: 3.5,
      prisvarde: 2,
    },
    price: 389,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elbutik",
    merchantUrl: "https://www.elbutik.se/product.html/nexa-z-wave-rorelsevakt-sp-816",
    superlative: "Bäst för dig som redan kör Z-Wave",
    pros: [
      "Batteridriven, så den kan sitta på ett staket eller ett uthus utan el",
      "Z-Wave Plus, alltså inte låst till en enda tillverkares lampor",
      "Sabotagelarm och varning för svagt batteri, ingen annan här har det",
    ],
    cons: [
      "Bryter ingen ström själv, så strålkastaren du redan har tänds inte av den",
      "Stannar vid −10 grader, femton grader sämre än ESYLUX",
      "Kräver en Z-Wave-styrenhet, som kostar mer än vakten",
    ],
    specs: [
      { label: "Typ", value: "Batteridriven sensor", highlight: true },
      { label: "Bevakningsvinkel", shortLabel: "Vinkel", value: "100°", highlight: true },
      { label: "Räckvidd", value: "10 m vid 2 m montagehöjd under 20 °C", highlight: true },
      { label: "Last LED", value: "Bryter ingen ström, kräver styrenhet", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP-klass", value: "IP44", highlight: true },
      { label: "Drifttemperatur", shortLabel: "Kyla", value: "−10 till 50 °C", highlight: true },
      { label: "Efterlystid", value: "5 s till 12 min", highlight: true },
      { label: "Montering", value: "Vägg eller tak" },
      { label: "Strömförsörjning", value: "3 × AA, ingår" },
      { label: "Batteritid", value: "1 år vid 10 detektioner per dygn" },
      { label: "Styrning", value: "Z-Wave Plus, 868,42 MHz, 30 m radioräckvidd" },
      { label: "Mått", value: "101 × 95 × 95 mm" },
    ],
    verdict:
      "Nexa SP-816 är den enda batteridrivna vakten i jämförelsen och kostar 389 kronor.\n\nDen löser ett problem ingen av de andra kan röra: ett staketstolpe, ett uthus eller en grind dit det inte går någon kabel. Sensorn skickar i stället en Z-Wave-signal upp till 30 meter till en styrenhet, som tänder vad du vill. Att den kör Z-Wave Plus och inte ett eget protokoll betyder att den fungerar med Nexa Bridge X likaväl som med Homey eller Home Assistant, alltså inte låst till en tillverkares lampor. Tre AA-batterier ingår och räcker ett år vid tio detektioner om dygnet.\n\n**Den bryter ingen ström.** Har du redan en strålkastare på väggen tänds den inte av den här sensorn förrän du också köpt en styrenhet och ett relä, och då kostar lösningen tre gånger vad Kjells väggvakt gör.\n\nHar du redan en Z-Wave-styrenhet i huset och ett ställe utan framdragen el är det här rätt produkt. Ska du bara få lampan över garageporten att tända går du till Steinel IS 1 eller Kjells väggvakt i stället.",
  },
];

export const RORELSEVAKT_UTOMHUS_PRODUCTS = resolveProducts(
  RORELSEVAKT_UTOMHUS,
  SEEDS,
);

/**
 * Filtret delar på bevakningsvinkel och inte på pris eller märke.
 *
 * Det är den enda uppdelning som svarar mot ett beslut läsaren redan fattat
 * innan hen kommer hit: ska ljuset täcka en gårdsplan eller en dörr. Ett filter
 * på IP-klass hade delat fältet fyra mot fem men inte hjälpt någon välja, och
 * ett på produkttyp hade blivit åtta mot en.
 */
export const RORELSEVAKT_UTOMHUS_FILTERS = [
  {
    key: "bred",
    label: "180 grader och bredare",
    ids: [
      "steinel-is-240",
      "steinel-is-180-2",
      "kjell-rorelsevakt-vagg",
      "biltema-rorelsevakt-ip44",
      "anslut-rorelsevakt-ip44",
    ],
  },
  {
    key: "smal",
    label: "Smalare än 180 grader",
    ids: ["steinel-is-130-2", "steinel-is-1", "esylux-md-120"],
  },
  {
    key: "batteri",
    label: "Batteridriven",
    ids: ["nexa-sp-816"],
  },
];

export const RORELSEVAKT_UTOMHUS_FAQ = [
  {
    question: "Vad betyder wattalet på en rörelsevakt?",
    answer:
      "Det gäller resistiv last, alltså glödlampa. Steinel IS 240 är märkt 1 000 W, men för elektroniska drivdon stannar samma detektor på 132 mikrofarad eller åtta armaturer, och Kjells vakt på 1 200 W tar 300 W induktivt. Schneider skriver ut båda talen för samma detektor: 2 200 W resistivt och 200 W LED. Leta efter LED-talet, antalet drivdon eller startströmmen i ampere, för det är de tal som gäller den belysning du faktiskt köper.",
  },
  {
    question: "Kan jag koppla LED-strålkastare till en rörelsevakt?",
    answer:
      "Ja, men räkna på antalet armaturer i stället för på summan watt. Varje LED-drivdon har en kondensator som laddas i det ögonblick strömmen slås på, och den strömtoppen kan vara tiotals gånger armaturens märkeffekt under några millisekunder. Det är den toppen som svetsar ihop reläkontakterna, inte den ström lampan drar sedan. Därför räknar Steinel drivdon och mikrofarad, och därför anger ESYLUX en högsta startström på 4,5 A i stället för ett watt-tal.",
  },
  {
    question: "Varför tänds lampan inte när jag går rakt mot sensorn?",
    answer:
      "För att en pyrodetektor läser skillnaden mellan intilliggande segment i linsen. Går du tvärs över synfältet passerar din kropp segment efter segment och sensorn ser en tydlig växling. Går du rakt emot fyller du samma segment hela vägen in, och växlingen uteblir tills du är nära. Räckvidden i annonsen gäller det första fallet: Steinels tolv meter mäts för gående personer som inte kommer rakt emot sensorn. Rikta därför sensorn så att den som kommer korsar synfältet i stället för att gå längs det.",
  },
  {
    question: "Vilken IP-klass behöver en rörelsevakt utomhus?",
    answer:
      "Minst IP44. Elsäkerhetsverket sätter IP44 eller högre som gräns för det som placeras utomhus, och fyran i andra positionen betyder att produkten tål vatten som stänker från alla riktningar. IP54 lägger till bättre dammskydd och tål vatten som sprutar, vilket är värt något på en gavelvägg utan tak över sig. Av de nio vakterna i jämförelsen har fyra IP54 och fem IP44.",
  },
  {
    question: "Hur högt ska en rörelsevakt sitta?",
    answer:
      "Mellan 1,8 och 2,5 meter för de flesta väggvakter, vilket är det spann Biltema anger för sin. Höjden avgör hur bevakningskonen faller på marken: för lågt och konen når bara några meter, för högt och den missar någon som går tätt intill väggen. Steinel IS 3180 anger sina 20 meter vid just 2,5 meters montagehöjd och hänvisar till en tabell i bruksanvisningen för andra höjder. Har linsen underkrypskydd, alltså ett segment som tittar rakt ned längs fasaden, spelar höjden mindre roll för den som kommer tätt inpå.",
  },
  {
    question: "Varför tänds lampan mitt på dagen?",
    answer:
      "Skymningsreläet är inställt för högt. Vreden märkta LUX eller en soloch månsymbol bestämmer vid vilken ljusnivå vakten börjar reagera på rörelse alls. Steinel-modellerna går från 2 till 2 000 lux, vilket täcker allt från mörk natt till mulen dag, medan Biltemas stannar vid 200 lux och alltså håller sig tystare i dagsljus. Vrid mot månsymbolen och gör om gångtestet i skymningen, inte mitt på dagen.",
  },
  {
    question: "Fungerar en rörelsevakt i kyla?",
    answer:
      "De flesta gör det, men spannet skiljer femton grader. ESYLUX MD 120 anger −25 till 55 grader, hela Steinel-serien −20 till 50, och Nexa SP-816 stannar vid −10. Kylan gör dessutom detektionen bättre snarare än sämre: en pyrodetektor mäter skillnaden mellan människan och bakgrunden, och den skillnaden växer när det är kallt. Nexa anger därför sina tio meter vid temperaturer under tjugo grader, och Steinel bygger in kompensation som de kallar temperaturstabiliserad räckvidd.",
  },
  {
    question: "Får jag installera en rörelsevakt själv?",
    answer:
      "Nej, inte en som kopplas till 230 volt. En sådan vakt kräver installation av behörig elinstallatör, och Elsäkerhetsverket kräver dessutom skyddsjordade uttag utomhus och jordfelsbrytare för nya installationer. En batteridriven sensor som Nexa SP-816 sätter du upp själv med två skruvar, eftersom ingenting där går på nätspänning.",
  },
];

export const RORELSEVAKT_UTOMHUS_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Philips",
    name: "Hue Outdoor Sensor",
    reason:
      "Tänder bara Hue-lampor, och bara genom en Hue Bridge. Strålkastaren du redan har på väggen berörs inte, vilket är fel svar på frågan sidan handlar om. Har du redan Hue ute är den däremot en bra sensor: IP54, två AA-batterier och ned till −20 grader.",
    approxPrice: 557,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Philips-Hue-Outdoor-Sensor/2990979",
  },
  {
    brand: "Steinel",
    name: "IS 3180 rörelsevakt",
    reason:
      "Ser 20 meter över 180 grader vid 2,5 meters montagehöjd, längst av allt vi hittade, och delar upp lasten efter lampstorlek: 100 W av lampor under 2 W, 300 W av 2 till 8 W och 600 W av lampor över 8 W. Byggd för lastkaj och parkering snarare än för villafasad, och priset följer med dit.",
    approxPrice: 1441,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter",
  },
  {
    brand: "Steinel",
    name: "IS 2160 ECO",
    reason:
      "Anger 250 W LED rakt av, utan omvägen över mikrofarad, och har underkrypskydd med 160 graders vinkel. Såld i två utföranden med skilda artikelnummer som butiken inte skiljer åt i texten, så vilken variant du får är oklart tills paketet öppnas.",
    approxPrice: 709,
    merchant: "Proffsmagasinet",
    merchantUrl:
      "https://www.proffsmagasinet.se/el-belysning/belysning/styrning-anslutning/rorelsevakter",
  },
  {
    brand: "Steinel",
    name: "NightMatic 3000 Vario",
    reason:
      "Tänder på mörker och inte på rörelse. Den lyser alltså hela natten, vilket är en annan produkt än en rörelsevakt även om butikerna lägger dem i samma hylla. 399 kronor hos Jula.",
    approxPrice: 399,
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/el-och-belysning/elinstallation/belysningstillbehor/rorelsevakter-och-skymningsrela/",
  },
  {
    brand: "Clas Ohlson",
    name: "Batteridriven rörelsesensor och eluttag",
    reason:
      "Sensor och trådlöst utomhusuttag i samma paket, 25 meter mellan delarna. Bra tanke för den som vill slippa elektriker, men 7 meters räckvidd och 110 graders vinkel är minst av allt vi tittade på.",
    approxPrice: 179.9,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Batteridriven-rorelsesensor-och-eluttag,-utomhus/p/46-1262",
  },
  {
    brand: "Malmbergs",
    name: "Gamma rörelsesensor 500 W",
    reason:
      "Infälld i apparatdosa och byggd för inomhusbruk, så kapslingen tål varken slagregn eller kyla. 192 kronor hos Bygghemma, och den billigaste vägen till en rörelsevakt som inte får sitta ute.",
    approxPrice: 192,
    merchant: "Bygghemma",
    merchantUrl:
      "https://www.bygghemma.se/hus-och-bygg/elmaterial-och-energi/elartiklar-och-elprodukter/sensor-och-rela/",
  },
];
