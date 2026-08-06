import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { SMARTWATCH } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /smartwatch.
 *
 * Priser, lagerstatus och artikelnummer lästa på Proshops, Kjells och
 * Kompletts egna produktsidor 2026-08-06. Varenda batteritid är hämtad hos
 * tillverkaren och aldrig hos butiken.
 *
 * AFFILIATE-SWAP — `merchantUrl` är butikens egna produktsida. Se lib/links.ts
 * för vad som faktiskt hamnar i href.
 *
 * ## Avgränsningen
 *
 * Premiumhalvan från cirka 3 000 kronor, efter användarbeslut 2026-08-06.
 * Mibro, Hama och de skärmlösa armbanden på 499–1 149 kr faller bort.
 * Träningsklockorna — Garmin Forerunner och Fēnix, Polar, Coros, Suunto —
 * får systersidan `/traningsklocka`.
 *
 * ## FYNDET: `batteritid` är inte ett tal, det är ett läge
 *
 * Garmin publicerar sju lägen för Venu 4 45 mm i sin egen svenska handbok:
 * 12 dagar i smartwatchläge och 9 timmar med alla satellitsystem och musik.
 * Faktor 32 på samma klocka. Samsung publicerar fyra för Galaxy Watch Ultra:
 * 100 h energibesparing, 80 h med skärmen släckt, 60 h med skärmen tänd och
 * 48 h utomhusträning med GPS. Huawei fyra för Watch GT 6 Pro: 21 dagar lätt,
 * 12 normal, 7 med alltid på-skärm, 40 timmar utomhussport.
 *
 * Handeln trycker ett av talen. Vilket varierar, och det syns skarpast i
 * Kjells egen hylla: Galaxy Watch Ultra (2025) bär `Upp till 100 h
 * batteritid` och den nyare Ultra2 bär `Upp till 60 timmars normal
 * användning`, vilket får den äldre att se ut att hålla 67 procent längre.
 *
 * ## ⚠️ Vi skriver aldrig att en tillverkare är ärlig som publicerar talen
 *
 * Det är sidans största frestelse och den fällan har fällt två tidigare
 * bygg. Huawei publicerar fyra lägen och Apple hela sitt testrecept, men det
 * som betygsätts är hur länge klockan går — aldrig hur väl den beskrivs.
 * Talen används, berömmet inte. Se `/new-page` fas 4.
 *
 * ## ⚠️ GPS-batteritiden bär ingen vikt
 *
 * Apple publicerar inget sådant tal för någon av sina tre modeller. Ett
 * kriterium hade därför dragit av för en uppgift vi inte fått fram. Raden
 * `Batteritid med GPS` är markerad trots att bara fem av elva har ett värde,
 * av samma skäl som `Skumtemperatur` på /mjolkskummare: att fylla cellen åt
 * de sex som tiger raderar spridningen. Withings värde är inte tomt utan
 * `Ingen egen GPS`, vilket är en egenskap och inte en lucka.
 *
 * ## ⚠️ Amazfits och Apple SE 3:s saknade EKG är fastställt, inte antaget
 *
 * Amazfit räknar upp sina sensorer uttömmande på båda produktsidorna och
 * ingen elektrisk hjärtsensor finns med. Apples tre systersidor har samma
 * mall hos samma utgivare, och SE 3 listar `Optisk hjärtsensor` där Series 11
 * och Ultra 3 listar `Elektrisk hjärtsensor`. Det är två skilda saker från en
 * misslyckad sökning.
 *
 * ## ⚠️ Butikens specifikation är inte tillverkarens
 *
 * Kompletts data för Pixel Watch 4 anger `GPS/GLONASS/Galileo-mottagare`.
 * Googles egen sida anger `GPS med dubbla frekvenser`. Skillnaden flyttade
 * klockan två placeringar. Specifikationer hämtas hos tillverkaren.
 */

export const PRICE_CHECKED = "2026-08-06";

const SEEDS: ProductSeed[] = [
  {
    id: "huawei-watch-gt-6-pro",
    brand: "Huawei",
    name: "Watch GT 6 Pro 46 mm",
    shortName: "Huawei GT 6 Pro",
    image: productImage(SMARTWATCH.slug, "huawei-watch-gt-6-pro"),
    tagline: "Tolv dagar normalt, sju med skärmen tänd, fyrtio timmar med GPS.",
    scores: {
      batteritid: 4.5,
      halsosensorer: 4,
      traningsmatning: 4.5,
      telefon: 5,
      prisvarde: 5,
    },
    price: 3890,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Pulsmaetare-Stegraeknare/Huawei-Watch-GT-6-Pro-46mm-Svart/3403236",
    award: "winner",
    superlative: "Bäst för dig som hatar att ladda",
    pros: [
      "Tolv dagar vid normal användning och sju med skärmen tänd hela tiden, alltså mer än en vecka även i det tyngsta vardagsläget",
      "Fungerar med både iPhone och Android, till skillnad från Apple, Samsung och Google",
      "Satellitmottagning på två band, L1 och L5, som är det som håller positionen rätt mellan höga hus",
    ],
    cons: [
      "Kör Huaweis eget system, så app-utbudet är litet jämfört med Apple Watch och Wear OS",
      "Ingen blodtrycksmätning, som Samsung och Apple har på sina dyraste",
    ],
    specs: [
      { label: "Batteritid vardag", value: "12 dagar", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "40 h", highlight: true },
      { label: "EKG", value: "Ja, EKG-sensor", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "L1 + L5, två band", highlight: true },
      { label: "Fungerar med", value: "iPhone och Android", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "5 ATM", highlight: true },
      { label: "Batteritid med alltid på-skärm", value: "7 dagar" },
      { label: "Batteritid i sparläge", value: "21 dagar vid lätt användning" },
      { label: "Syremättnad", value: "Ja" },
      { label: "Hudtemperatur", value: "Ja, temperatursensor" },
      { label: "Blodtryck", value: "Nej" },
      { label: "Vikt", value: "54,7 g utan armband" },
      { label: "Boettstorlek", value: "45,6 × 45,6 × 11,25 mm" },
      { label: "Offlinekartor", value: "Ja" },
      { label: "GTIN", value: "6942103168185" },
    ],
    verdict:
      "Huawei Watch GT 6 Pro kostar 3 890 kronor och går tolv dagar vid normal användning. Det är mer än fyra gånger så länge som Apple Watch Series 11, som kostar 1 100 kronor mer.\n\n**Det är den enda klockan här som håller mer än en vecka även när du använder den som du faktiskt vill.** Tolv dagar gäller normal användning, sju dagar gäller med skärmen tänd hela tiden, och fyrtio timmar gäller med satellitmottagning och pulsmätning igång oavbrutet. Även det sista talet är längre än vad flera av klockorna här klarar med skärmen släckt och GPS av. Mottagningen går på två band, L1 och L5, vilket är det som gör att en runda genom en stadskärna hamnar på rätt gata i stället för i kvarteret bredvid. Den har EKG-sensor, syremättnad och temperatursensor, tål 5 ATM och väger 54,7 gram utan armband.\n\nDen kör Huaweis eget system i stället för Wear OS, och det märks i app-utbudet. Vill du ha Spotify-kontroll, Strava direkt på handleden och ett tredjepartsbibliotek att välja ur är det här fel klocka. Den saknar också blodtrycksmätning, som Samsungs och Apples dyraste har.\n\nKöp den här. Den håller längst av alla klockor du kan använda på riktigt, den fungerar oavsett vilken telefon du har nu eller byter till, och den kostar minst av de fullt utrustade. Vill du ha ett riktigt appbibliotek och tränar seriöst är Garmin Venu 4 för 5 250 kronor den att ta i stället.",
  },
  {
    id: "garmin-venu-4",
    brand: "Garmin",
    name: "Venu 4 45 mm",
    shortName: "Garmin Venu 4",
    image: productImage(SMARTWATCH.slug, "garmin-venu-4"),
    tagline: "Tolv dagar i smartwatchläge och nio timmar med satelliter och musik.",
    scores: {
      batteritid: 4.5,
      halsosensorer: 4.5,
      traningsmatning: 4.5,
      telefon: 5,
      prisvarde: 4,
    },
    price: 5250,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Pulsmaetare-Stegraeknare/Garmin-Venu-4/3436192",
    award: "editor",
    superlative: "Bäst för dig som tränar på riktigt",
    pros: [
      "EKG-appen är godkänd som medicinteknisk enhet i klass IIa, och får därmed säga något om förmaksflimmer",
      "Tolv dagar i smartwatchläge och tjugofem i batterisparläge",
      "Fungerar med både iPhone och Android, och Garmin Connect är samma app oavsett vilken",
    ],
    cons: [
      "Nio timmar med alla satellitsystem och musik igång, alltså kortare än ett långpass med spellista",
      "Kostar 1 360 kronor mer än Huawei och håller ungefär lika länge i vardagen",
    ],
    specs: [
      { label: "Batteritid vardag", value: "12 dagar", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "19 h, 9 h med musik", highlight: true },
      { label: "EKG", value: "Ja, klass IIa enligt (EU) 2017/745", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "Flera band, SatIQ", highlight: true },
      { label: "Fungerar med", value: "iPhone och Android", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "5 ATM, simning", highlight: true },
      { label: "Batteritid i sparläge", value: "25 dagar" },
      { label: "Syremättnad", value: "Ja, pulsoximetri" },
      { label: "Blodtryck", value: "Nej" },
      { label: "Skärm", value: "AMOLED, alltid på-läge som tillval" },
      { label: "Offlinekartor", value: "Ja" },
      { label: "GTIN", value: "753759342876" },
    ],
    verdict:
      "Garmin Venu 4 i 45-millimetersutförande kostar 5 250 kronor och går tolv dagar i smartwatchläge. Samma klocka går nio timmar med alla satellitsystem och musik igång.\n\n**Det är klockan att välja om träningen är skälet till att du köper en.** Garmins EKG-app är godkänd som medicinteknisk enhet i klass IIa enligt EU:s förordning 2017/745, vilket betyder att den får säga något om förmaksflimmer och inte bara visa en kurva. Mottagningen använder flera band med SatIQ, som växlar mellan lägen efter hur svår miljön är, och klockan tål simning enligt 5 ATM. Batterisparläget tar den till tjugofem dagar om du reser bort och inte vill ta med laddaren. Den fungerar med både iPhone och Android, och Garmin Connect ser likadant ut på båda.\n\nDe nio timmarna är värda att stanna vid. Ett maratonlopp med musik i öronen ligger inom den ramen, men ett långpass i fjällen med kartan uppe gör det inte, och det är samma klocka som annonseras med tolv dagar. Den kostar också 1 360 kronor mer än Huawei och håller ungefär lika länge i vardagen.\n\nTa den här om du springer, cyklar eller simmar regelbundet och vill att klockan ska räknas som mer än en stegräknare. Ska den mest sitta på armen och visa notiser räcker Huawei för 3 890 kronor, och tränar du i väder och terräng är Amazfit T-Rex 3 Pro tåligare för 760 kronor mindre.",
  },
  {
    id: "amazfit-t-rex-3-pro",
    brand: "Amazfit",
    name: "T-Rex 3 Pro 48 mm",
    shortName: "Amazfit T-Rex 3 Pro",
    image: productImage(SMARTWATCH.slug, "amazfit-t-rex-3-pro"),
    tagline: "25 dagar, 38 timmar med noggrann GPS och fridykning till 45 meter.",
    scores: {
      batteritid: 5,
      halsosensorer: 2.5,
      traningsmatning: 5,
      telefon: 5,
      prisvarde: 4.5,
    },
    price: 4490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar/smartwatch/amazfit-t-rex-3-pro-48-mm-p80427",
    superlative: "Bäst för dig som är ute i väder",
    pros: [
      "25 dagar vid typisk användning och 38 timmar i det noggranna GPS-läget, alltså längst uthållighet under träning här",
      "10 ATM och certifierad för fridykning till 45 meter, plus safirglas och titanram",
      "Offlinekartor med ruttplanering, så telefonen kan stanna i fickan",
    ],
    cons: [
      "Ingen EKG-funktion, vilket sensoruppräkningen hos tillverkaren bekräftar",
      "48 millimeter och byggd som en fältklocka, vilket är för stort för många handleder",
    ],
    specs: [
      { label: "Batteritid vardag", value: "25 dagar", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "38 h noggrant läge", highlight: true },
      { label: "EKG", value: "Nej", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "6 satellitsystem", highlight: true },
      { label: "Fungerar med", value: "iPhone och Android", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "10 ATM, 45 m fridykning", highlight: true },
      { label: "Batteritid i sparläge", value: "85 h i GPS-batterisparläge" },
      { label: "Syremättnad", value: "Ja" },
      { label: "Blodtryck", value: "Nej" },
      { label: "Hudtemperatur", value: "Ja, temperatursensor" },
      { label: "Glas", value: "Safirglas" },
      { label: "Barometrisk höjdmätare", value: "Ja" },
      { label: "Offlinekartor", value: "Ja, med ruttplanering" },
    ],
    verdict:
      "Amazfit T-Rex 3 Pro i 48-millimetersutförande kostar 4 490 kronor och går 25 dagar vid typisk användning. I det noggranna GPS-läget går den 38 timmar, vilket är längst i jämförelsen.\n\n**Den är byggd för att vara ute och det syns i varje siffra.** 10 ATM och certifiering för fridykning till 45 meter betyder att den klarar mer än att bli blöt, safirglaset klarar sand och grus bättre än härdat glas, och ramen är titan. Sex satellitsystem, barometrisk höjdmätare och offlinekartor med ruttplanering gör att en dagsvandring går att navigera utan att telefonen lämnar fickan. GPS-batterisparläget tar den till 85 timmar, alltså tre dygn med positionen igång.\n\nDen har ingen EKG-funktion. Amazfit räknar upp sina sensorer i sin helhet: optisk pulssensor, accelerometer, gyroskop, barometer, ljussensor, geomagnetisk sensor och temperatursensor, och en elektrisk hjärtsensor finns inte bland dem. Den mäter alltså puls och syremättnad men kan inte säga något om hjärtrytm. Och 48 millimeter är en stor klocka som sticker upp under en skjortärm.\n\nVälj den här om klockan ska följa med i fjällen, i skogen eller under vattenytan och du vill slippa laddaren i flera veckor. Är hjärthälsa det du är ute efter är Garmin Venu 4 den enda här med ett godkänt EKG till ett rimligt pris, och vill du ha samma uthållighet i ett mindre format kostar Amazfit Balance 2 tusen kronor mindre.",
  },
  {
    id: "amazfit-balance-2",
    brand: "Amazfit",
    name: "Balance 2",
    shortName: "Amazfit Balance 2",
    image: productImage(SMARTWATCH.slug, "amazfit-balance-2"),
    tagline: "21 dagar och 10 ATM för 3 490 kronor.",
    scores: {
      batteritid: 4.5,
      halsosensorer: 2.5,
      traningsmatning: 4.5,
      telefon: 5,
      prisvarde: 4.5,
    },
    price: 3490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar/smartwatch/amazfit-balance-2-black-p80428",
    userRating: { value: 5, count: 4, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Mest klocka för under 3 500 kr",
    pros: [
      "21 dagar vid typisk användning, alltså tre gånger så länge som de flesta i samma prisklass",
      "10 ATM och safirglas i en klocka som kostar under 3 500 kronor",
      "Satellitmottagning på två band med sex satellitsystem",
    ],
    cons: [
      "Ingen EKG-funktion, vilket sensoruppräkningen hos tillverkaren bekräftar",
      "Tillverkaren anger ingen uthållighet med GPS igång, så den siffran går inte att jämföra",
    ],
    specs: [
      { label: "Batteritid vardag", value: "21 dagar", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "–", highlight: true },
      { label: "EKG", value: "Nej", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "Dubbelband, 6 system", highlight: true },
      { label: "Fungerar med", value: "iPhone och Android", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "10 ATM", highlight: true },
      { label: "Syremättnad", value: "Ja" },
      { label: "Blodtryck", value: "Nej" },
      { label: "Hudtemperatur", value: "Ja, temperatursensor" },
      { label: "Glas", value: "Safirglas" },
      { label: "Barometrisk höjdmätare", value: "Ja" },
      { label: "GTIN", value: "6972596108948" },
    ],
    verdict:
      "Amazfit Balance 2 kostar 3 490 kronor och går 21 dagar vid typisk användning. Det är sidans billigaste klocka som håller mer än ett par dygn.\n\n**Den ger dig nästan hela T-Rex-paketet i ett format som får plats under en skjortärm.** 10 ATM, safirglas, barometrisk höjdmätare och satellitmottagning på två band med sex system, och det är utrustning som annars kostar över 5 000 kronor. Tre veckor mellan laddningarna betyder i praktiken att laddaren ligger i en låda och inte på nattduksbordet, och det är den skillnad mot en klocka som ska laddas varje kväll som märks mest i vardagen. Amazfit definierar också sitt typiska scenario: pulsmätning var femte minut, dygnet runt.\n\nDen har ingen EKG-funktion, av samma skäl som storasystern: tillverkarens egen sensorlista innehåller ingen elektrisk hjärtsensor. Amazfit anger inte heller någon uthållighet med satellitmottagningen igång, så hur länge den räcker på ett långpass är inget vi kan jämföra mot de fem klockor som anger det.\n\nTa den här om du vill ha lång batteritid, riktig vattentålighet och ett bra glas utan att lägga över 3 500 kronor. Behöver du hjärtrytm mätt är den fel produkt oavsett pris, och ska klockan tåla dykning och fjäll är T-Rex 3 Pro tusen kronor mer.",
  },
  {
    id: "withings-scanwatch-2",
    brand: "Withings",
    name: "ScanWatch 2 38 mm",
    shortName: "Withings ScanWatch 2",
    image: productImage(SMARTWATCH.slug, "withings-scanwatch-2"),
    tagline: "30 dagar, om skärmen är på fem minuter om dagen.",
    scores: {
      batteritid: 5,
      halsosensorer: 4.5,
      traningsmatning: 1,
      telefon: 5,
      prisvarde: 3,
    },
    price: 4295,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Pulsmaetare-Stegraeknare/Withings-Scanwatch-2-38mm-Svart/3197554",
    superlative: "Bäst för dig som vill ha en klocka",
    pros: [
      "30 dagar mellan laddningarna, längst i jämförelsen",
      "EKG, syremättnad och temperaturmätning i en klocka som ser ut som en vanlig analog klocka",
      "Fungerar med både iPhone och Android",
    ],
    cons: [
      "Ingen egen satellitmottagning, så en löprunda kräver att telefonen följer med",
      "Trettio dagar förutsätter fem minuters skärmtid om dagen och att nattens syremätning är avstängd",
    ],
    specs: [
      { label: "Batteritid vardag", value: "30 dagar", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "Ingen egen GPS", highlight: true },
      { label: "EKG", value: "Ja", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "Använder telefonens", highlight: true },
      { label: "Fungerar med", value: "iPhone och Android", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "5 ATM", highlight: true },
      { label: "Syremättnad", value: "Ja" },
      { label: "Blodtryck", value: "Nej" },
      { label: "Hudtemperatur", value: "Ja" },
      { label: "Boettstorlek", value: "38 mm" },
      { label: "GTIN", value: "3700546708275" },
    ],
    verdict:
      "Withings ScanWatch 2 i 38 millimeter kostar 4 295 kronor och går trettio dagar mellan laddningarna. Ingen annan klocka här kommer i närheten.\n\n**Det är den enda här som ser ut som en klocka och inte som en skärm på armen.** Visarna är riktiga, urtavlan är rund och analog, och den lilla digitala rutan sitter diskret ovanför centrum. Under det sitter EKG, syremättnad, temperaturmätning och andningsanalys, alltså en hälsouppsättning som konkurrerar med klockor som kostar dubbelt. På ett möte, på en middag eller till kavaj är det den enda av elva som inte signalerar att du bär teknik.\n\nTrettio dagar har ett pris, och det är att klockan mest står still. Scenariot bakom talet förutsätter fem minuters total skärmtid per dygn, att alltid på-läget är avstängt, att andningsanalysen är av, att nattens automatiska syremätning är av och att du tar ett EKG var tredje dag. Och klockan har ingen egen satellitmottagning, utan lånar telefonens, vilket Withings själva anger som skälet till att GPS inte påverkar batteriet. En löprunda utan telefon blir alltså inte mätt.\n\nVälj den här om du vill ha hälsosensorer och en månads batteritid i något som passar på en handled där en sportklocka ser fel ut. Ska klockan mäta träning på egen hand är den fel produkt, och då är Huawei för 3 890 kronor både billigare och mer kapabel.",
  },
  {
    id: "apple-watch-ultra-3",
    brand: "Apple",
    name: "Watch Ultra 3 49 mm",
    shortName: "Apple Watch Ultra 3",
    image: productImage(SMARTWATCH.slug, "apple-watch-ultra-3"),
    tagline: "42 timmar, 100 meter och Apples enda med två GPS-frekvenser.",
    scores: {
      batteritid: 2.5,
      halsosensorer: 5,
      traningsmatning: 5,
      telefon: 2.5,
      prisvarde: 2,
    },
    price: 9294,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Pulsmaetare-Stegraeknare/Apple-Watch-Ultra-3-GPS-Cellular-49mm-Black-Titanium-Case-with-Black-Ocean-Band/3405309",
    award: "premium",
    superlative: "Bäst för dig som dyker och vandrar",
    pros: [
      "Precisions-GPS på två frekvenser, L1 och L5, och den enda Apple-modellen som har det",
      "Vattentålig till 100 meter enligt ISO 22810:2010, med djupmätare",
      "Fullständig hälsouppsättning: EKG, syremättnad, hudtemperatur och varningar om högt blodtryck",
    ],
    cons: [
      "42 timmar, alltså laddning varannan dag, mot tolv dagar hos vinnaren",
      "9 294 kronor, dyrast här med drygt två tusen kronor",
    ],
    specs: [
      { label: "Batteritid vardag", value: "42 h", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "–", highlight: true },
      { label: "EKG", value: "Ja, EKG-appen", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "L1 + L5, två frekvenser", highlight: true },
      { label: "Fungerar med", value: "Endast iPhone 11 eller senare", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "100 m, ISO 22810:2010", highlight: true },
      { label: "Batteritid i sparläge", value: "72 h" },
      { label: "Laddning till 80 %", value: "Cirka 45 minuter" },
      { label: "Syremättnad", value: "Ja, ej medicinsk användning enligt Apple" },
      { label: "Blodtryck", value: "Varningar om högt blodtryck" },
      { label: "Hudtemperatur", value: "Ja" },
      { label: "Vikt", value: "61,6 g" },
      { label: "Glas", value: "Platt safirglas" },
      { label: "Ljusstyrka", value: "3 000 cd/m²" },
      { label: "GTIN", value: "195950484212" },
    ],
    verdict:
      "Apple Watch Ultra 3 kostar 9 294 kronor och går 42 timmar vid normal användning. Det är den dyraste klockan i jämförelsen med drygt två tusen kronor.\n\n**Den är den mest kapabla klockan här på allt utom batteri.** Precisions-GPS på två frekvenser, L1 och L5, är det enda Apple-modellen som har och det märks i skog och stadsbebyggelse. Vattentåligheten är 100 meter enligt ISO 22810:2010, alltså sportdykning och inte bara simning, och den har djupmätare och sensor för vattentemperatur. Hälsouppsättningen är komplett: EKG, syremättnad, hudtemperatur, varningar om sömnapné och varningar om högt blodtryck. Safirglaset är platt och titanboetten är grad 5, och skärmen når 3 000 cd/m², dubbelt så mycket som Series 11.\n\nBatteriet är där den förlorar. 42 timmar betyder laddning varannan dag, och talet gäller ett dygn med 300 blickar på klockan, 90 notiser och sex timmars sömnspårning. Den fungerar bara med iPhone 11 eller senare, så byter du till Android om två år är klockan en armbandsklocka utan appar.\n\nKöp den om du har iPhone, dyker eller vandrar långt, och tycker att pengarna är värda den bästa mottagningen och den mest kompletta hälsomätningen som finns på en iPhone-klocka. Har du inte iPhone är den inte ett alternativ alls, och vill du ha samma tålighet för hälften av pengarna är Amazfit T-Rex 3 Pro 4 804 kronor billigare.",
  },
  {
    id: "samsung-galaxy-watch-ultra",
    brand: "Samsung",
    name: "Galaxy Watch Ultra 47 mm LTE",
    shortName: "Galaxy Watch Ultra",
    image: productImage(SMARTWATCH.slug, "samsung-galaxy-watch-ultra"),
    tagline: "Från 100 timmar till 48, beroende på vad den gör.",
    scores: {
      batteritid: 3.5,
      halsosensorer: 4.5,
      traningsmatning: 4.5,
      telefon: 1.5,
      prisvarde: 2,
    },
    price: 7990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar/smartwatch/samsung-galaxy-watch-ultra-2025-47-mm-lte-titanium-gray-p29985",
    userRating: { value: 5, count: 2, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för Galaxy-ägaren som tränar",
    pros: [
      "80 timmar med skärmen släckt och 60 med den tänd, längst av de klockor som mäts i timmar och inte i dagar",
      "10 ATM och 100 meters vattentålighet i titanboett, plus 590 mAh batteri",
      "Satellitmottagning på två band och 48 timmars utomhusträning med GPS igång",
    ],
    cons: [
      "EKG och blodtrycksmätning kräver en Samsung Galaxy-telefon, inte bara Android",
      "Blodtrycket måste kalibreras om var fjärde vecka mot en armmanschett",
    ],
    specs: [
      { label: "Batteritid vardag", value: "80 h med skärmen släckt", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "48 h utomhusträning", highlight: true },
      { label: "EKG", value: "Ja, kräver Galaxy-telefon", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "L1 + L5, två band", highlight: true },
      { label: "Fungerar med", value: "Endast Android", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "10 ATM, 100 m", highlight: true },
      { label: "Batteritid med alltid på-skärm", value: "60 h" },
      { label: "Batteritid i sparläge", value: "100 h" },
      { label: "Batterikapacitet", value: "590 mAh" },
      { label: "Syremättnad", value: "Ja" },
      { label: "Blodtryck", value: "Ja, kalibrering var fjärde vecka" },
      { label: "Vikt", value: "60 g" },
      { label: "Utbytbart batteri", value: "Nej" },
    ],
    verdict:
      "Samsung Galaxy Watch Ultra i 47 millimeter kostar 7 990 kronor och bär 590 milliampèretimmar batteri, mest av alla klockor här.\n\n**Den är Samsungs svar på Apple Watch Ultra och den slår den på uthållighet.** 80 timmar med skärmen släckt, 60 med den tänd hela tiden och 48 timmar utomhusträning med satellitmottagningen igång. Det sista talet är särskilt användbart, eftersom det är ett av bara fem i jämförelsen. Titanboetten tål 10 ATM och 100 meter, mottagningen går på två band, och hälsouppsättningen omfattar EKG, syremättnad och blodtryck.\n\nTvå villkor följer med. EKG och blodtrycksmätning kräver inte bara Android utan en Samsung Galaxy-telefon med Samsung Health Monitor, så på en Pixel eller en Motorola är det en annan klocka än den i butikens beskrivning. Blodtrycket måste dessutom kalibreras om var fjärde vecka mot en riktig armmanschett, vilket är ett återkommande moment och inte en engångsinställning.\n\nTa den här om du har en Galaxy-telefon, tränar utomhus och vill ha den längsta uthålligheten som finns i den delen av marknaden. Har du någon annan Android-telefon förlorar du hälften av det du betalar för, och vill du ha samma sorts tålighet för mindre än hälften kostar Amazfit T-Rex 3 Pro 3 500 kronor mindre.",
  },
  {
    id: "samsung-galaxy-watch8",
    brand: "Samsung",
    name: "Galaxy Watch8 44 mm",
    shortName: "Galaxy Watch8",
    image: productImage(SMARTWATCH.slug, "samsung-galaxy-watch8"),
    tagline: "40 timmar, och talet gäller med skärmen släckt.",
    scores: {
      batteritid: 2.5,
      halsosensorer: 4.5,
      traningsmatning: 4,
      telefon: 1.5,
      prisvarde: 3.5,
    },
    price: 4590,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar/smartwatch/samsung-galaxy-watch8-44mm-bluetooth-graphite-p29957",
    superlative: "Bäst för dig med en Galaxy-telefon",
    pros: [
      "EKG, syremättnad och blodtrycksmätning för 4 590 kronor",
      "Satellitmottagning på två band, L1 och L5",
      "435 mAh batteri och 5 ATM med IP68 och MIL-STD-810H",
    ],
    cons: [
      "40 timmar gäller med skärmen släckt, och det är talet butiken trycker utan villkoret",
      "EKG och blodtryck kräver en Samsung Galaxy-telefon, inte bara Android",
    ],
    specs: [
      { label: "Batteritid vardag", value: "40 h med skärmen släckt", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "–", highlight: true },
      { label: "EKG", value: "Ja, kräver Galaxy-telefon", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "L1 + L5, två band", highlight: true },
      { label: "Fungerar med", value: "Endast Android 11 eller senare", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "5 ATM, IP68, MIL-STD-810H", highlight: true },
      { label: "Batterikapacitet", value: "435 mAh" },
      { label: "Syremättnad", value: "Ja" },
      { label: "Blodtryck", value: "Ja, kalibrering var fjärde vecka" },
      { label: "Hudtemperatur", value: "Ja" },
      { label: "Vikt", value: "34 g" },
      { label: "Utbytbart batteri", value: "Nej" },
      { label: "GTIN", value: "8806097413325" },
    ],
    verdict:
      "Samsung Galaxy Watch8 i 44 millimeter kostar 4 590 kronor och väger 34 gram, lättast av alla klockor här utom Apples två minsta.\n\n**Den ger dig hela Samsungs hälsouppsättning för under 5 000 kronor.** EKG, syremättnad, hudtemperatur och blodtrycksmätning i en klocka som kostar mindre än Apple Watch Series 11, som saknar blodtryck. Satellitmottagningen går på två band, kapslingen klarar 5 ATM med IP68 och MIL-STD-810H, och 435 milliampèretimmar är gott om batteri för storleken.\n\nDe 40 timmarna behöver en förklaring, och Samsung ger den själva. Raden i deras spectabell heter ordagrant \"Normal användning (Timmar, AOD Off)\", alltså med skärmen släckt tills du lyfter armen. Har du skärmen tänd hela tiden, vilket är hela poängen med en klocka du ska kunna kasta en blick på, blir det kortare, och för systermodellen Watch8 Classic anger Samsung 30 timmar i det läget. Butikens produktsida trycker fyrtiotalet utan villkoret. Och som på Ultra kräver EKG och blodtryck en Galaxy-telefon.\n\nKöp den om du har en Samsung-telefon och vill ha mest hälsomätning per krona. Har du en annan Android-telefon är Google Pixel Watch 4 ärligare mot dig, och vill du slippa ladda varannan dag håller Huawei för 700 kronor mindre tolv dagar i stället för knappt två.",
  },
  {
    id: "google-pixel-watch-4",
    brand: "Google",
    name: "Pixel Watch 4 45 mm",
    shortName: "Pixel Watch 4",
    image: productImage(SMARTWATCH.slug, "google-pixel-watch-4"),
    tagline: "40 timmar, och talet gäller med skärmen tänd hela tiden.",
    scores: {
      batteritid: 2.5,
      halsosensorer: 4,
      traningsmatning: 4,
      telefon: 2.5,
      prisvarde: 2.5,
    },
    price: 5090,
    oldPrice: 5490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Komplett",
    merchantUrl:
      "https://www.komplett.se/product/1326843/mobil-tablets-klockor/smartwatches/google-pixel-watch-4-45mm-wifi-svart",
    superlative: "Bäst för dig som lever i Google",
    pros: [
      "40 timmar med skärmen tänd hela tiden, vilket är ett strängare villkor än de flesta anger",
      "GPS med dubbla frekvenser, plus höjdmätare, barometer och hudtemperatursensor",
      "Full laddning på 45 minuter, och halva batteriet på en kvart",
    ],
    cons: [
      "EKG-appen är begränsad till vissa länder och till personer över 22 år enligt Google",
      "Fungerar bara med Android, och 5 090 kronor är dyrare än flera som håller längre",
    ],
    specs: [
      { label: "Batteritid vardag", value: "40 h med skärmen tänd", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "–", highlight: true },
      { label: "EKG", value: "Ja, med landsbegränsning", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "Dubbla frekvenser", highlight: true },
      { label: "Fungerar med", value: "Endast Android 11 eller senare", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "5 ATM, IP68", highlight: true },
      { label: "Batteritid i sparläge", value: "72 h" },
      { label: "Batterikapacitet", value: "455 mAh" },
      { label: "Laddning till 80 %", value: "Cirka 25 minuter" },
      { label: "Syremättnad", value: "Ja" },
      { label: "Blodtryck", value: "Nej" },
      { label: "Hudtemperatur", value: "Ja" },
      { label: "Vikt", value: "36,7 g utan armband" },
      { label: "Glas", value: "Corning Gorilla Glass 5" },
      { label: "Barometrisk höjdmätare", value: "Ja" },
    ],
    verdict:
      "Google Pixel Watch 4 i 45 millimeter kostar 5 090 kronor, nedsatt från 5 490, och går 40 timmar med skärmen tänd hela tiden.\n\n**Det talet är strängare än det ser ut.** De flesta klockor i den här klassen anger sin vardagstid med skärmen släckt tills du lyfter armen; Googles fyrtiotimmarssiffra gäller med alltid aktiv skärm. Ställd mot Samsung Galaxy Watch8, som också anger 40 timmar men med skärmen släckt, är det alltså en annan sorts fyrtio. Utrustningen är stark för priset: GPS med dubbla frekvenser, höjdmätare, barometer, magnetometer, hudtemperatursensor, syremättnad och EKG. Laddningen är snabbast här: halva batteriet på en kvart och fullt på 45 minuter.\n\nGoogle sätter själva två gränser för EKG-appen: den är bara tillgänglig i vissa länder och inte avsedd för personer under 22 år. Klockan fungerar bara med Android 11 eller senare, och 5 090 kronor är mer än både Huawei och Amazfit Balance 2 kostar, som båda håller åtskilliga gånger längre.\n\nVälj den här om du redan lever i Googles värld, vill ha Wear OS med ett riktigt appbibliotek och tycker att en klocka som laddas på 45 minuter kompenserar för att den ska laddas varannan dag. Handlar det mest om batteri och sensorer får du mer för pengarna hos Huawei för 3 890 kronor.",
  },
  {
    id: "apple-watch-series-11",
    brand: "Apple",
    name: "Watch Series 11 GPS 42 mm",
    shortName: "Apple Watch Series 11",
    image: productImage(SMARTWATCH.slug, "apple-watch-series-11"),
    tagline: "24 timmar, om du tittar på den 300 gånger under dygnet.",
    scores: {
      batteritid: 1.5,
      halsosensorer: 5,
      traningsmatning: 3,
      telefon: 2.5,
      prisvarde: 3.5,
    },
    price: 4995,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Pulsmaetare-Stegraeknare/Apple-Watch-Series-11-GPS-42mm-Space-Grey-Aluminium-Case-with-Black-Sport-Band-ML/3405585",
    superlative: "Bäst för dig som har en iPhone",
    pros: [
      "Den mest kompletta hälsouppsättningen här: EKG, syremättnad, hudtemperatur, sömnapné och varningar om högt blodtryck",
      "30,3 gram, alltså nästan hälften av vad de tåliga klockorna väger",
      "80 procent laddning på ungefär 30 minuter, snabbast av Apples tre",
    ],
    cons: [
      "24 timmar, kortast av alla klockor här utom SE 3, alltså laddning varje kväll",
      "Satellitmottagning på ett enda band, där sju av elva har två",
    ],
    specs: [
      { label: "Batteritid vardag", value: "24 h", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "–", highlight: true },
      { label: "EKG", value: "Ja, EKG-appen", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "GPS L1, ett band", highlight: true },
      { label: "Fungerar med", value: "Endast iPhone 11 eller senare", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "50 m, simtålig", highlight: true },
      { label: "Batteritid i sparläge", value: "38 h" },
      { label: "Laddning till 80 %", value: "Cirka 30 minuter" },
      { label: "Syremättnad", value: "Ja, ej medicinsk användning enligt Apple" },
      { label: "Blodtryck", value: "Varningar om högt blodtryck" },
      { label: "Hudtemperatur", value: "Ja" },
      { label: "Vikt", value: "30,3 g" },
      { label: "Glas", value: "Ion-X i aluminium, safir i titan" },
      { label: "Ljusstyrka", value: "2 000 cd/m²" },
      { label: "GTIN", value: "195950460827" },
    ],
    verdict:
      "Apple Watch Series 11 i 42 millimeter kostar 4 995 kronor och går 24 timmar. Det är kortast i jämförelsen med undantag för Apples egen SE 3.\n\n**Hälsomätningen är den bästa som finns på en klocka i den här prisklassen.** EKG, syremättnad, hudtemperatur, varningar om sömnapné och varningar om högt blodtryck. Ingen annan klocka här har alla fem, och för många köpare är det ensamt skäl nog. Den väger 30,3 gram, alltså nästan hälften av vad de tåliga klockorna väger, och det märks när den ska sitta på under natten för sömnmätning. Laddningen tar den till 80 procent på ungefär en halvtimme.\n\nDe 24 timmarna gäller enligt Apples eget scenario: 300 blickar på klockan, 90 notiser, femton minuters appanvändning, en timmes träning med musik och sex timmars sömnspårning på ett dygn. Använder du den mer än så räcker den inte dygnet, och laddningen konkurrerar då med sömnmätningen om samma natt. Satellitmottagningen går dessutom på ett enda band, medan sju av elva klockor här har två, och det är i tät stad och under trädtak skillnaden syns. Den fungerar bara med iPhone.\n\nKöp den om du har iPhone och vill ha bästa möjliga hälsomätning i minsta möjliga format, och om du kan leva med att klockan ligger i laddaren varje kväll. Vill du ha månader i stället för dygn mellan laddningarna finns ingen Apple-klocka som ger dig det, och då är Withings ScanWatch 2 den enda som kombinerar EKG med lång batteritid.",
  },
  {
    id: "apple-watch-se-3",
    brand: "Apple",
    name: "Watch SE 3 GPS 40 mm",
    shortName: "Apple Watch SE 3",
    image: productImage(SMARTWATCH.slug, "apple-watch-se-3"),
    tagline: "18 timmar, utan EKG och utan syremätning, för 2 972 kronor.",
    scores: {
      batteritid: 1,
      halsosensorer: 2,
      traningsmatning: 2.5,
      telefon: 2.5,
      prisvarde: 3.5,
    },
    price: 2972,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Pulsmaetare-Stegraeknare/Apple-Watch-SE-3-GPS-40mm-Midnight-Aluminium-Case-with-Midnight-Sport-Band-ML/3405504",
    superlative: "Billigast väg in i Apples system",
    pros: [
      "Billigast här med 518 kronor, och den enda vägen in i Apples ekosystem under 3 000 kronor",
      "26,3 gram, lättast av alla elva",
      "Har ändå hudtemperatursensor och varningar om sömnapné",
    ],
    cons: [
      "Ingen elektrisk hjärtsensor, alltså inget EKG, och ingen sensor för syremättnad",
      "18 timmar, kortast i jämförelsen, och 45 minuter till 80 procents laddning",
    ],
    specs: [
      { label: "Batteritid vardag", value: "18 h", highlight: true },
      { label: "Batteritid med GPS", shortLabel: "Med GPS", value: "–", highlight: true },
      { label: "EKG", value: "Nej", highlight: true },
      { label: "Satellitmottagning", shortLabel: "Satellit", value: "GPS L1, ett band", highlight: true },
      { label: "Fungerar med", value: "Endast iPhone 11 eller senare", highlight: true },
      { label: "Vattentålighet", shortLabel: "Vatten", value: "50 m, simtålig", highlight: true },
      { label: "Batteritid i sparläge", value: "32 h" },
      { label: "Laddning till 80 %", value: "Cirka 45 minuter" },
      { label: "Syremättnad", value: "Nej" },
      { label: "Blodtryck", value: "Nej" },
      { label: "Hudtemperatur", value: "Ja" },
      { label: "Vikt", value: "26,3 g" },
      { label: "Glas", value: "Ion-X, 4× tåligare mot sprickor" },
      { label: "Ljusstyrka", value: "1 000 cd/m²" },
      { label: "GTIN", value: "195950387346" },
    ],
    verdict:
      "Apple Watch SE 3 i 40 millimeter kostar 2 972 kronor och går 18 timmar. Den är billigast här och håller kortast.\n\n**Den gör det en Apple Watch mest används till, och inget mer.** Notiser, samtal, Apple Pay, aktivitetsringar, träningspass, sömnmätning med hudtemperatur och varningar om sömnapné. Den väger 26,3 gram, lättast av alla elva, och Ion-X-glaset är enligt Apple fyra gånger tåligare mot sprickor än föregångarens. För någon som vill in i Apples ekosystem utan att lägga fem tusen är det ett rakt erbjudande.\n\nDet som är borttaget är hjärtat. SE 3 har optisk pulssensor men ingen elektrisk hjärtsensor, vilket betyder att den aldrig kommer att kunna ta ett EKG, och den har ingen sensor för syremättnad alls. Båda sitter i hårdvaran och ingen uppdatering lägger till dem. De 18 timmarna gäller dessutom utan sömnspårning i Apples grundscenario, och laddningen till 80 procent tar 45 minuter mot Series 11:s 30.\n\nTa den här om du vill ha en Apple Watch, mest bryr dig om notiser och aktivitet, och tycker att 2 000 kronor är för mycket att lägga på hjärtsensorer du inte kommer att använda. Är hälsomätningen skälet till köpet är den fel klocka, och då är Series 11 för 4 995 kronor den billigaste Apple som faktiskt gör det.",
  },
];

/**
 * Övervägda och bortvalda. Varje rad har ett verkligt skäl och en kontrollerad
 * adress hos butiken.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Samsung",
    name: "Galaxy Watch9 44 mm Bluetooth",
    reason:
      "Nyare än Watch8 och billigare hos Kjell, 3 890 kronor mot 4 590. Den ligger här ändå, eftersom Samsung själva fortfarande säljer den som förköp på sin svenska sajt och lagret i handeln är tunt. Rankas in vid nästa prisrunda när den går att köpa på samma villkor som de övriga.",
    approxPrice: 3890,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar/smartwatch/samsung-galaxy-watch9-44mm-bluetooth-graphite-p29501",
  },
  {
    brand: "Samsung",
    name: "Galaxy Watch Ultra2 47 mm",
    reason:
      "Efterföljaren till den Ultra vi rankar, 7 290 kronor. Står som förköp hos Samsung och slut online hos Kjell. Den är också anledningen till att sidan finns: butikens bullet säger 60 timmar för den nyare och 100 för den äldre, vilket är två olika rader i samma tabell och inte en försämring.",
    approxPrice: 7290,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar/smartwatch/samsung-galaxy-watch-ultra2-47mm-titanium-gray-p29500",
  },
  {
    brand: "Apple",
    name: "Watch Series 9 och Series 10",
    reason:
      "Säljs fortfarande i handeln för 4 485 till 6 090 kronor, men de är två respektive en generation gamla och Apple har ersatt dem med Series 11. Att ranka dem hade varit att rekommendera restlager. Tre av de sju konkurrenterna vi mätte gör just det.",
    approxPrice: 5199,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar/apple-watch",
  },
  {
    brand: "Garmin",
    name: "Instinct 3 AMOLED 50 mm",
    reason:
      "6 049 kronor och 24 dagars batteritid, alltså en riktig utmanare på papperet. Den hör hemma på systersidan för träningsklockor: Instinct-serien är en äventyrsklocka med knappstyrning och inte den vardagsklocka den här sidan handlar om.",
    approxPrice: 6049,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar/garmin-klockor",
  },
  {
    brand: "Garmin",
    name: "Forerunner 265 och 265S",
    reason:
      "5 949 kronor och 13 dagars batteritid i smartwatchläge. Löparklockor byggda kring träningspass och återhämtning snarare än kring notiser, och de får sitt eget sammanhang på systersidan tillsammans med Polar, Coros och Suunto.",
    approxPrice: 5949,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar/garmin-klockor",
  },
  {
    brand: "Withings",
    name: "ScanWatch Light 37 mm",
    reason:
      "2 490 kronor och 30 dagars batteritid, alltså samma uthållighet som ScanWatch 2 för nästan tusen kronor mindre. Den saknar däremot EKG och syremättnad, vilket är det enda som gör en hybridklocka utan egen GPS värd priset. Slut online hos Kjell.",
    approxPrice: 2490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/smartklockor-och-ringar/smartwatch",
  },
  {
    brand: "Amazfit",
    name: "Balance 3",
    reason:
      "4 499 kronor och efterföljare till den Balance 2 som är sidans budgetval. Den står som förköp hos Proshop, alltså ännu inte levererad, och en klocka som inte går att få hem rankas inte.",
    approxPrice: 4499,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Pulsmaetare-Stegraeknare/Amazfit-Balance-3-Titanium-Black/3481395",
  },
];

export const SMARTWATCH_PRODUCTS = resolveProducts(SMARTWATCH, SEEDS);

export const SMARTWATCH_CONSIDERED = CONSIDERED;

/**
 * Frågorna är de som faktiskt ställs i kategorin, och svaren står på egna ben
 * eftersom FAQ-rutan kan visas ensam i ett sökresultat.
 */
export const SMARTWATCH_FAQ = [
  {
    question: "Varför håller min smartklocka kortare än vad det stod på kartongen?",
    answer:
      "För att talet på kartongen gäller ett läge, och du använder förmodligen ett annat. Nästan alla tillverkare anger sin vardagstid med skärmen släckt tills du lyfter armen. Har du alltid på-skärmen igång, vilket är hela poängen med en klocka du ska kunna kasta en blick på, försvinner mellan en fjärdedel och en tredjedel. Samsung anger 40 timmar för Galaxy Watch8 Classic med skärmen släckt och 30 med den tänd. Huawei anger 12 dagar normalt och 7 med alltid på-skärm. Startar du dessutom ett träningspass med satellitmottagning och pulsmätning igång går det betydligt fortare: Garmin anger 12 dagar i smartwatchläge och 9 timmar med alla satellitsystem och musik för samma klocka. Din klocka är alltså sannolikt inte trasig. Du använder den bara inte i det läge talet mättes i.",
  },
  {
    question: "Vad betyder alltid på-skärm, och är det värt batteriet?",
    answer:
      "Alltid på-skärm, ofta förkortat AOD efter engelskans always-on display, betyder att urtavlan visas hela tiden i stället för att tändas när du lyfter armen. Det kostar ungefär en fjärdedel till en tredjedel av batteritiden. Om det är värt det beror på vad du använder klockan till. Ska du kunna se tiden i ett möte utan att göra en gest är det värt mycket, eftersom en klocka som kräver en armrörelse för att visa vad den är i praktiken är sämre än en billig kvartsklocka. Ska klockan mest mäta sömn och steg och samla notiser är det bortkastad ström. Den praktiska konsekvensen är att du bör läsa batteritalet tillsammans med villkoret: två klockor som båda anger 40 timmar kan skilja sig med tio timmar i verklig användning beroende på vilket läge talet gäller.",
  },
  {
    question: "Fungerar en Apple Watch med Android?",
    answer:
      "Nej. Apple Watch kräver en iPhone 11 eller senare med iOS 26, och det finns ingen väg runt det. Åt andra hållet gäller samma sak: Samsung Galaxy Watch och Google Pixel Watch kräver Android, och Pixel Watch anges fungera med de flesta telefoner som kör Android 11 eller senare. Det är den dyraste egenskapen att missa när man köper, eftersom en klocka du inte kan flytta med dig blir värdelös den dag du byter telefonsystem. Klockorna som fungerar med båda är Garmin, Huawei, Withings och Amazfit. Ett extra steg finns inom Android: Samsungs EKG och blodtrycksmätning kräver inte bara Android utan en Samsung Galaxy-telefon med appen Samsung Health Monitor, så på en Pixel eller en Motorola får du en annan klocka än den i produktbeskrivningen.",
  },
  {
    question: "Vad är skillnaden mellan en smartklocka och en träningsklocka?",
    answer:
      "Fokus, och det syns i tre saker. En smartklocka har pekskärm, färre knappar och ett appbibliotek, och är byggd för att vara en förlängning av telefonen. En träningsklocka har fler och större knappar som går att trycka med svettiga fingrar, längre batteritid och funktioner byggda kring träningspass, återhämtning och belastning. Gränsen är otydlig och blir otydligare: Garmins Venu-serie är en smartklocka från ett träningsklockeföretag, och Apple Watch Ultra är en smartklocka byggd för friluftsliv. Den praktiska frågan är om du tänker läsa data efter passet eller bara samla den. Gör du det första är en träningsklocka byggd för dig, och de bor på en egen sida.",
  },
  {
    question: "Kan en smartklocka mäta blodtryck?",
    answer:
      "Två av klockorna här gör det, men inte på det sätt de flesta tänker sig. Samsungs Galaxy Watch8 och Galaxy Watch Ultra mäter blodtryck via appen Samsung Health Monitor, men mätningen kräver att klockan kalibreras om var fjärde vecka mot en riktig blodtrycksmätare med armmanschett. Klockan mäter alltså inte blodtryck fristående, den uppskattar det utifrån en kalibrering du gör med en annan apparat. Apple gör något annat: Series 11 och Ultra 3 ger varningar om högt blodtryck, alltså en signal om att du bör mäta ordentligt, inte ett värde. Ingen av klockorna ersätter en blodtrycksmätare, och behöver du följa ett blodtryck av medicinska skäl är en manschett för några hundra kronor både noggrannare och billigare.",
  },
  {
    question: "Vad betyder 5 ATM och 10 ATM?",
    answer:
      "Talet anger vilket vattentryck klockan är provad mot, uttryckt i atmosfärer. 5 ATM motsvarar trycket på femtio meters djup och räcker till dusch, bassäng och simning i öppet vatten. 10 ATM motsvarar hundra meter och räcker till snorkling och vattensporter i högre hastighet. Det är däremot inte ett dykdjup: talen kommer från statiska tryckprov, och när du rör armen genom vattnet blir det momentana trycket högre än djupet antyder. Vill du dyka ska klockan vara certifierad för det uttryckligen, som Apple Watch Ultra 3 enligt ISO 22810:2010 eller Amazfit T-Rex 3 Pro som anges klara fridykning till 45 meter. Sju av elva klockor här klarar 5 ATM och fyra klarar 10.",
  },
  {
    question: "Vad är GPS med dubbla frekvenser, och behöver jag det?",
    answer:
      "En satellitmottagare med en frekvens lyssnar bara på signalbandet L1. En med dubbla frekvenser lyssnar på både L1 och L5, och kan då jämföra de två för att räkna bort fel som uppstår när signalen studsar mot husfasader eller dämpas av lövverk. Skillnaden märks inte på en öppen åker men mycket väl i en stadskärna eller under trätak, alltså precis där en löprunda annars hamnar på fel sida gatan. Behöver du det beror på var du tränar: springer du på öppen mark spelar det liten roll, springer du i stan eller i skog gör det det. Sju av elva klockor här har dubbla frekvenser, och det är värt att notera att Apple bara ger det på Ultra 3 och inte på Series 11, som kostar 4 300 kronor mindre.",
  },
  {
    question: "Går det att byta batteri i en smartklocka?",
    answer:
      "Inte i dag. Batteriet är inbyggt i samtliga elva klockor här, och Samsung har raden Utbytbart med värdet Nej i sin egen spectabell för både Galaxy Watch8 och Galaxy Watch Ultra. Batteriet är alltså det som avgör hur länge klockan lever: när cellen efter några år tappat en märkbar del av sin kapacitet är klockan förbrukad även om allt annat fungerar. Det finns en förändring på väg. Från den 18 februari 2027 kräver EU:s batteriförordning att bärbara batterier ska gå att avlägsna och ersätta av användaren själv, med verktyg som finns i vanlig handel. Det finns ett undantag för apparater byggda för att användas i vatten, och för dem räcker det att bytet görs av en oberoende yrkesutövare. Hur varje tillverkare kommer att göra vet vi inte, och vi gissar inte.",
  },
];
