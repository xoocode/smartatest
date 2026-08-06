import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { BABYVAKT } from "@/lib/test-pages";

/**
 * Babyvakt. Underlag i .agent/research/babyvakt.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, GTIN, räckvidder, frekvensband,
 * sändareffekter, batterikapaciteter, skärmstorlekar och larmbeteenden. Priser
 * och GTIN lästa 2026-08-06 i butikens egen JSON-LD. Larmbeteendena är lästa i
 * elva av tillverkarnas egna manualer, inte i butikstexten.
 *
 * **Redaktionell bedömning:** kriteriepoängen. De är vår sammanvägning av
 * specifikationerna ovan mot viktningen i lib/test-pages.ts, inte mätvärden. Vi
 * har inte haft en enda av apparaterna i handen och skriver det rakt ut.
 *
 * **Bilder:** butikernas egna packshots, elva av elva, körda genom `pnpm
 * images`. Sex från Jollyroom i 1200×1600, fem från Apotea i XL.
 *
 * ## Varför andningslarm inte rankas här
 *
 * Apotea för 38 artiklar i samma kategori, och åtta av dem är Owlet-sockor.
 * Att ranka en apparat för 399 kronor mot en för 3 799 är ingen rankning, och
 * ett andningslarm köps av en annan förälder av ett annat skäl. Samma
 * avgränsning som /vattenlarm gjorde mot vattenfelsbrytare. De fyra ligger
 * bland de övervägda och förklaras i köpguiden.
 *
 * ## Varför Motorola VM483 länkas till Apotea och inte till Kjell
 *
 * Kjell har den 290 kronor billigare, 999 mot 1 289, och den står som Ej i
 * lager. Vi länkar den butik som faktiskt kan leverera. Kontrollera om vid
 * nästa prisrunda: skillnaden är den största i jämförelsen för samma artikel.
 *
 * ## Butiksfördelningen
 *
 * Sex länkar går till Jollyroom och fem till Apotea. Båda bär 5 procent, ingen
 * av dem tillåter PPC, och Jollyroom har 3 dygns cookie mot Apoteas 14.
 * Babysam bär kategorins bästa villkor med 8 procent och 30 dygn men för inte
 * de här artiklarna, kontrollerat 2026-08-06.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-06";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "capidi-premium",
    name: "Premium Baby Alarm",
    shortName: "CAPiDi Premium",
    brand: "CAPiDi",
    image: productImage(BABYVAKT.slug, "capidi-premium"),
    tagline:
      "1 000 meter i fri sikt, alltså ungefär 165 genom väggar och ut till förrådet.",
    scores: {
      brytlarm: 5,
      fristaende: 5,
      foraldraenheten: 5,
      rackvidd: 5,
      prisvarde: 4.5,
    },
    price: 1399,
    merchant: "Jollyroom",
    merchantUrl:
      "https://www.jollyroom.se/babyprodukter/barnsakerhet/babyvakter/capidi-premium-babyvakt-grey",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för hela huset och tomten",
    pros: [
      "Larmar med ljud och blinkande ikon efter 30 sekunder om babyenheten försvinner",
      "Vibrationslarm, så du kan bära den i ett stökigt kök eller sova bredvid den",
      "Går att koppla till tre babyenheter, alltså räcker den till syskon i olika rum",
      "Justerbar mikrofonkänslighet avgör om du väcks av snörvlingar eller av skrik",
      "5 års garanti, alltså hela den tid du kommer att använda den",
    ],
    cons: [
      "Ingen bild, så vill du kunna se att barnet ligger fritt får du välja Philips Avent SCD892",
      "320 kronor dyrare än CAPiDis egen enklare modell, som har samma larm",
    ],
    specs: [
      { label: "Typ", value: "Ljud", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value: "Ljud och blinkande ikon efter 30 s",
        highlight: true,
      },
      {
        label: "Räckvidd fri sikt",
        shortLabel: "Räckvidd",
        value: "1 000 m",
        highlight: true,
      },
      { label: "Räckvidd inomhus", value: "–" },
      { label: "Överföring", value: "863–870 MHz, digital parkoppling", highlight: true },
      { label: "Kräver app eller konto", shortLabel: "App krävs", value: "Nej", highlight: true },
      { label: "Föräldraenhet", value: "Ingår, uppladdningsbar" },
      { label: "Vibrationslarm", value: "Ja" },
      { label: "Tvåvägstal", value: "Ja" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "Ja" },
      { label: "Temperaturvisning", value: "Ja, −19 till +50 °C" },
      { label: "Skärm", value: "LCD på föräldraenheten" },
      { label: "Flera babyenheter", value: "Upp till 3" },
      { label: "Max sändareffekt", value: "12 dBm på babyenheten enligt manualen" },
      { label: "Standbytid", value: "200 h" },
      { label: "Laddning", value: "USB-C" },
      { label: "Garanti", value: "5 år" },
      { label: "GTIN", value: "7391421923102" },
    ],
    verdict:
      "CAPiDi Premium är babyvakten för den som vill kunna gå ut i trädgården eller ner i tvättstugan och fortfarande höra barnet. 1 399 kronor hos Jollyroom, och den enda i jämförelsen som anger 1 000 meter.\n\nRäkna om det talet till ungefär 165 meter genom väggar, och du har fortfarande marginal i varje svensk villa. Larmet är det som gör den till vinnare: manualen beskriver hur föräldraenheten efter 30 sekunder ger både ljud och en blinkande ikon när kontakten med babyenheten bryts, med en bestämd prioritetsordning så att bara ett larm hörs i taget. Vibrationslarmet betyder att du kan ha den i fickan under middagen utan att stänga av ljudet, och den justerbara mikrofonkänsligheten avgör om du väcks av att barnet vänder sig eller först när det gråter. Tre babyenheter går att koppla till samma föräldraenhet, så syskon i olika rum kostar en extra sändare och inte ett nytt system.\n\nDen visar ingen bild. Vill du kunna se att ansiktet är fritt utan att gå in i rummet är det inte den här du ska köpa.\n\nKöp den om du vill höra barnet var som helst i huset och tomten. Ska du kunna se barnet också får du gå till Philips Avent SCD892, och då kostar det 2 500 kronor till.",
  },
  {
    id: "neonate-bc-6500d",
    name: "BC-6500D V2",
    brand: "Neonate",
    image: productImage(BABYVAKT.slug, "neonate-bc-6500d"),
    tagline:
      "Tre babyenheter på en föräldraenhet, och färgade lampor som visar vem som låter.",
    scores: {
      brytlarm: 4.5,
      fristaende: 5,
      foraldraenheten: 5,
      rackvidd: 4.5,
      prisvarde: 3.5,
    },
    price: 1599,
    merchant: "Jollyroom",
    merchantUrl:
      "https://www.jollyroom.se/babyprodukter/barnsakerhet/babyvakter/neonate-bc-6500d-digital-babyvakt",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för syskon i olika rum",
    pros: [
      "Färgade lampor visar vilken babyenhet som hör något, så du vet vilket barn som vaknat",
      "Två laddstationer ingår, en till varje enhet, plus monteringskit och två halsremmar",
      "Larmar efter 30 sekunder både när du gått för långt, när en babyenhet stängts av och när dess batteri tar slut",
      "Justerbara temperaturgränser som larmar både för varmt och för kallt",
    ],
    cons: [
      "Slår du på Zero Radiation stängs larmet vid bruten förbindelse av, enligt Neonates egen manual",
      "1 599 kronor, alltså 340 mer än Neonates egen BC-5700D med samma räckvidd och ett larm utan den hakan",
      "Två butiker anger olika sändareffekt för samma artikel, 20 mW respektive 25 mW",
    ],
    specs: [
      { label: "Typ", value: "Ljud", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value:
          "Ljud och blinkande display efter 30 s. Stängs av om Zero Radiation slås på",
        highlight: true,
      },
      {
        label: "Räckvidd fri sikt",
        shortLabel: "Räckvidd",
        value: "800 m",
        highlight: true,
      },
      { label: "Räckvidd inomhus", value: "–" },
      { label: "Överföring", value: "Helt digital, störningsfri parkoppling", highlight: true },
      { label: "Kräver app eller konto", shortLabel: "App krävs", value: "Nej", highlight: true },
      { label: "Föräldraenhet", value: "Ingår, litiumbatteri 1 450 mAh" },
      { label: "Vibrationslarm", value: "Ja" },
      { label: "Tvåvägstal", value: "Ja" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "Ja" },
      { label: "Temperaturvisning", value: "Ja, med justerbara larmgränser" },
      { label: "Skärm", value: "LCD på föräldraenheten" },
      { label: "Flera babyenheter", value: "Upp till 3" },
      { label: "Max sändareffekt", value: "20 mW enligt Jollyroom, 25 mW enligt Babyland" },
      { label: "Standbytid", value: "200 h" },
      { label: "Garanti", value: "2 år på batteriet" },
      { label: "GTIN", value: "7090025786501" },
    ],
    verdict:
      "Neonate BC-6500D V2 är babyvakten för familjen med mer än ett barn. 1 599 kronor hos Jollyroom, och den enda som visar med olikfärgade lampor vilken av upp till tre babyenheter som hör något.\n\nDet låter som en detalj tills du står i köket klockan fem på morgonen och behöver veta vilket rum du ska gå in i. Larmet är lika utförligt som lillebrorns: efter 30 sekunder ljuder det och displayen blinkar, och det gäller både när du gått för långt, när en babyenhet stängts av och när dess batteri tagit slut. Temperaturlarmet går att sätta på både en övre och en undre gräns, alltså larmar den både när barnrummet blivit för varmt under en sommarnatt och när det kallnat under en vinternatt. Två laddstationer ingår, så du slipper flytta en kabel mellan enheterna.\n\n**Den funktion Neonate marknadsför hårdast stänger av larmet.** Zero Radiation gör att enheterna slutar sända helt medan det är tyst, och manualen säger rakt ut att larmet vid bruten förbindelse då är avstängt, med tillägget att funktionen bara ska användas när du vet att enheterna är inom räckhåll. Slår du på den för barnets skull tappar du varningen om apparaten slutar fungera.\n\nLämna Zero Radiation avslagen, så är det här rätt köp för er med barn i två rum. Är det ett barn i ett rum gör BC-5700D samma sak för 340 kronor mindre, utan den hakan.",
  },
  {
    id: "neonate-bc-5700d",
    name: "BC-5700D V2",
    brand: "Neonate",
    image: productImage(BABYVAKT.slug, "neonate-bc-5700d"),
    tagline:
      "Larmar även när babyenheten slutat sända, inte bara när du gått för långt.",
    scores: {
      brytlarm: 5,
      fristaende: 5,
      foraldraenheten: 3.5,
      rackvidd: 4.5,
      prisvarde: 4,
    },
    price: 1259,
    merchant: "Jollyroom",
    merchantUrl:
      "https://www.jollyroom.se/babyprodukter/barnsakerhet/babyvakter/neonate-bc-5700d-digital-babyvakt",
    priceCheckedAt: PRICE_CHECKED,
    award: "editor",
    superlative: "Bäst larm om babyenheten tystnar",
    pros: [
      "Larmet täcker tre fel: du är för långt bort, babyenheten är avstängd, babyenheten kan inte sända",
      "Fungerar ner till −19 grader, alltså i barnvagnen på balkongen om vintern",
      "Väger 72 gram, lättast av föräldraenheterna här",
      "Vibrationslarm och justerbar mikrofonkänslighet",
    ],
    cons: [
      "Envägskommunikation, så du kan inte prata tillbaka. Vill du det tar du CAPiDi Premium",
      "Ingen bild",
    ],
    specs: [
      { label: "Typ", value: "Ljud", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value: "Ljud och blinkande display efter 30 s, även vid avstängd eller trasig babyenhet",
        highlight: true,
      },
      {
        label: "Räckvidd fri sikt",
        shortLabel: "Räckvidd",
        value: "800 m",
        highlight: true,
      },
      { label: "Räckvidd inomhus", value: "–" },
      { label: "Överföring", value: "Helt digital, förparad från fabrik", highlight: true },
      { label: "Kräver app eller konto", shortLabel: "App krävs", value: "Nej", highlight: true },
      { label: "Föräldraenhet", value: "Ingår, 72 g, 1 100 mAh li-polymer" },
      { label: "Vibrationslarm", value: "Ja" },
      { label: "Tvåvägstal", value: "Nej" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "Ja" },
      { label: "Temperaturvisning", value: "Ja, med justerbara larmgränser" },
      { label: "Skärm", value: "LCD på föräldraenheten" },
      { label: "Flera babyenheter", value: "–" },
      { label: "Max sändareffekt", value: "–" },
      { label: "Standbytid", value: "200 h" },
      { label: "Garanti", value: "2 år på batteriet" },
      { label: "Mått", value: "90 × 46 × 24 mm" },
      { label: "GTIN", value: "7090025785702" },
    ],
    verdict:
      "Neonate BC-5700D V2 är den babyvakt som är noggrannast med att tala om när den slutat fungera. 1 259 kronor hos Jollyroom, och det billigaste sättet att komma åt 800 meters räckvidd.\n\nTillverkarens manual räknar upp tre fall som utlöser larmet efter 30 sekunder, och det tredje är det som gör skillnad: att babyenheten inte längre kan skicka signal, exempelvis för att den gått sönder. De andra larmar för avstånd. Den här larmar för fel. Föräldraenheten väger 72 gram och är byggd för nordiskt bruk, funktionstestad ner till 19 minusgrader, vilket betyder att den fungerar i vagnen på balkongen under en januarisömn. Mikrofonkänsligheten är justerbar med knappar på babyenheten, så du bestämmer själv om apparaten ska väcka dig när barnet vänder sig eller först när det gråter.\n\nDu kan inte prata tillbaka. Det är envägskommunikation, och den som vill kunna säga något lugnande från köket får betala 140 kronor mer för CAPiDi Premium.\n\nFör en förälder med ett barn i ett rum är det här det klokaste köpet i hela jämförelsen.",
  },
  {
    id: "motorola-pip15",
    name: "PIP15 Audio",
    brand: "Motorola",
    image: productImage(BABYVAKT.slug, "motorola-pip15"),
    tagline: "Prata tillbaka, mät rumstemperaturen och nå 450 meter för 799 kronor.",
    scores: {
      brytlarm: 4,
      fristaende: 5,
      foraldraenheten: 4,
      rackvidd: 3.5,
      prisvarde: 5,
    },
    price: 799,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/motorola-baby-monitor-pip15-audio",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för dig som vill svara barnet",
    pros: [
      "Tvåvägstal, temperaturvisning och nattlampa som styrs från föräldraenheten",
      "Fem nivåer av röstaktivering, från bara högljutt skrik till minsta ljud",
      "Båda enheterna laddas med USB-C, alltså samma kabel som telefonen",
      "9 timmars drifttid på föräldraenheten och 10 på babyenheten, angivet av tillverkaren",
    ],
    cons: [
      "Inget vibrationslarm, så den måste låta för att nå dig",
      "1,5-tumsskärmen visar text och siffror, ingen bild",
    ],
    specs: [
      { label: "Typ", value: "Ljud", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value: "Ljud och blinkande länkindikator",
        highlight: true,
      },
      {
        label: "Räckvidd fri sikt",
        shortLabel: "Räckvidd",
        value: "450 m",
        highlight: true,
      },
      { label: "Räckvidd inomhus", value: "–" },
      { label: "Överföring", value: "DECT, 1 881,8–1 897,3 MHz", highlight: true },
      { label: "Kräver app eller konto", shortLabel: "App krävs", value: "Nej", highlight: true },
      { label: "Föräldraenhet", value: "Ingår, 9 h drift" },
      { label: "Vibrationslarm", value: "Nej" },
      { label: "Tvåvägstal", value: "Ja" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "Ja, 5 nivåer" },
      { label: "Temperaturvisning", value: "Ja" },
      { label: "Skärm", value: "1,5 tum, bakgrundsbelyst" },
      { label: "Flera babyenheter", value: "Ja, PIP15-2 och PIP15-3" },
      { label: "Max sändareffekt", value: "< 0,25 W enligt manualen" },
      { label: "Laddning", value: "USB-C" },
      { label: "GTIN", value: "5055374717073" },
    ],
    verdict:
      "Motorola PIP15 är den billigaste babyvakten här som låter dig svara barnet. 799 kronor hos Apotea, med tvåvägstal, temperaturvisning och nattlampa som tänds från föräldraenheten.\n\nDe fem nivåerna av röstaktivering är den funktion som avgör om apparaten blir kvar på nattduksbordet eller hamnar i lådan. På nivå ett hörs bara högt gråt och skrik, på nivå fem varje andetag, och de flesta föräldrar flyttar sig nedåt i skalan under det första halvåret. USB-C på båda enheterna betyder att du laddar dem med samma kabel som allt annat i huset. 450 meter i fri sikt är näst mest bland DECT-modellerna.\n\nDen saknar vibrationslarm. Sover du bredvid den och vill kunna ha ljudet av måste du välja en CAPiDi eller en Neonate i stället, och de kostar minst 280 kronor mer.\n\nFör en lägenhet eller ett radhus där du ändå hör den är PIP15 den mest apparat du kan få under tusenlappen.",
  },
  {
    id: "vtech-dm1212",
    name: "DM1212 Audio",
    brand: "VTech",
    image: productImage(BABYVAKT.slug, "vtech-dm1212"),
    tagline: "75 meter genom väggar, inte bara i fri sikt.",
    scores: {
      brytlarm: 4,
      fristaende: 5,
      foraldraenheten: 3.5,
      rackvidd: 3.5,
      prisvarde: 5,
    },
    price: 599,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/vtech-baby-monitor-audio-dm1212",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för första barnet",
    pros: [
      "En av tre här som anger räckvidden inomhus, 75 meter, vilket är mest av dem",
      "Reagerar snabbast av alla: displayen visar SEARCHING efter 10 sekunder utan kontakt",
      "Temperatursensorn larmar när barnrummet lämnar det intervall du ställt in",
      "Nattlampsprojektor som lyser en stjärnhimmel i taket",
    ],
    cons: [
      "Inget vibrationslarm och ingen justerbar mikrofonkänslighet",
      "Ingen bild, så vill du se barnet börjar priset på 1 289 kronor med Motorola VM483",
    ],
    specs: [
      { label: "Typ", value: "Ljud", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value: "SEARCHING i displayen efter 10 s, plus varning på föräldraenheten",
        highlight: true,
      },
      {
        label: "Räckvidd fri sikt",
        shortLabel: "Räckvidd",
        value: "460 m",
        highlight: true,
      },
      { label: "Räckvidd inomhus", value: "75 m" },
      { label: "Överföring", value: "DECT, 1 881,8–1 897,3 MHz", highlight: true },
      { label: "Kräver app eller konto", shortLabel: "App krävs", value: "Nej", highlight: true },
      { label: "Föräldraenhet", value: "Ingår, bakgrundsbelyst display och bältesklämma" },
      { label: "Vibrationslarm", value: "Nej" },
      { label: "Tvåvägstal", value: "Ja" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "–" },
      { label: "Temperaturvisning", value: "Ja, med larm" },
      { label: "Skärm", value: "35 × 21 mm svartvit LCD" },
      { label: "Flera babyenheter", value: "–" },
      { label: "Max sändareffekt", value: "0,25 W enligt manualen" },
      { label: "Kanaler", value: "10" },
      { label: "GTIN", value: "4897027125986" },
    ],
    verdict:
      "VTech DM1212 kostar 599 kronor hos Apotea och når 75 meter genom väggar, mot 460 i fri sikt.\n\nSjuttiofem meter räcker genom ett par väggar i en normal villa, och det är den siffra du kan planera efter. Den är också snabbast på att märka att något är fel: displayen slår om till SEARCHING när kontakten varit bruten i tio sekunder, mot trettio hos CAPiDi och Neonate. Temperatursensorn går att koppla till ett larm som ljuder när barnrummet blir för varmt eller för kallt, och det är den enda funktionen i den här prisklassen som fångar ett verkligt problem snarare än ett tänkbart. Nattlampsprojektorn i babyenheten är till för barnet snarare än för dig, men den är en riktig anledning att välja den framför Motorola PIP15.\n\nInget vibrationslarm och ingen justerbar mikrofonkänslighet. Den låter när den låter, och du bestämmer bara volymen.\n\nÄr det första barnet och du vill lägga så lite som möjligt utan att köpa en apparat som saknar hälften: ta den här.",
  },
  {
    id: "capidi-babyvakt",
    name: "Babyvakt 2.0",
    shortName: "CAPiDi 2.0",
    brand: "CAPiDi",
    image: productImage(BABYVAKT.slug, "capidi-babyvakt"),
    tagline: "Vibrationslarm och bältesclip, byggd för att bäras hela dagen.",
    scores: {
      brytlarm: 4.5,
      fristaende: 5,
      foraldraenheten: 3,
      rackvidd: 4.5,
      prisvarde: 3.5,
    },
    price: 1079,
    merchant: "Jollyroom",
    merchantUrl:
      "https://www.jollyroom.se/babyprodukter/barnsakerhet/babyvakter/capidi-babyvakt-grey",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst att bära hela dagen",
    pros: [
      "Larmet går också om babyenheten stängts av eller fått slut på batteri, inte bara vid avstånd",
      "Vibrationslarm och bältesclip, alltså byggd för att sitta i byxlinningen",
      "Funktionstestad ner till −20 grader",
      "Utbytbar front och 5 års garanti",
    ],
    cons: [
      "Inget tvåvägstal och ingen temperaturvisning, som CAPiDis egen Premium har för 320 kronor mer",
      "1 079 kronor för en ren ljudvakt, medan VTech DM1212 gör mer för 599",
    ],
    specs: [
      { label: "Typ", value: "Ljud", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value: "Ljud och blinkande LED efter 30 s, även vid avstängd babyenhet",
        highlight: true,
      },
      {
        label: "Räckvidd fri sikt",
        shortLabel: "Räckvidd",
        value: "800 m",
        highlight: true,
      },
      { label: "Räckvidd inomhus", value: "–" },
      { label: "Överföring", value: "863–870 MHz, krypterad självparning", highlight: true },
      { label: "Kräver app eller konto", shortLabel: "App krävs", value: "Nej", highlight: true },
      { label: "Föräldraenhet", value: "Ingår, li-po, bältesclip" },
      { label: "Vibrationslarm", value: "Ja" },
      { label: "Tvåvägstal", value: "Nej" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "Ja" },
      { label: "Temperaturvisning", value: "Nej" },
      { label: "Skärm", value: "LED-nivåmätare, ingen display" },
      { label: "Flera babyenheter", value: "–" },
      { label: "Max sändareffekt", value: "10 mW enligt butiken, 10 % av DECT enligt manualen" },
      { label: "Standbytid", value: "109 h enligt manualen" },
      { label: "Laddning", value: "USB-C" },
      { label: "Garanti", value: "5 år" },
      { label: "GTIN", value: "7391421329065" },
    ],
    verdict:
      "CAPiDi Babyvakt 2.0 är den enklaste apparaten i jämförelsen och den mest genomtänkta att bära. 1 079 kronor hos Jollyroom, med vibrationslarm, bältesclip och fyra knappar totalt.\n\nLarmet är det som lyfter den. Manualen beskriver hur föräldraenheten börjar låta och blinka efter 30 sekunder utan kontakt, och att samma larm går om babyenheten stängts av eller fått slut på batteri. Det är alltså ett larm som täcker de vanliga sätten en babyvakt slutar fungera på, inte bara det att du gått för långt. 800 meter i fri sikt blir ungefär 130 genom väggar, vilket räcker ut i garaget. Femårsgarantin är dubbelt så lång som något annat i jämförelsen anger, och fronten går att byta när den blivit repig.\n\nDen kan inget mer. Ingen tvåvägskommunikation, ingen temperatur, ingen display som visar en siffra.\n\nBär du den i byxlinningen från morgon till kväll och vill slippa lära dig en meny är det här rätt apparat. Vill du få något för mellanskillnaden gör VTech DM1212 mer för 480 kronor mindre.",
  },
  {
    id: "philips-avent-scd892",
    name: "Avent SCD892/26",
    shortName: "Philips SCD892",
    brand: "Philips",
    image: productImage(BABYVAKT.slug, "philips-avent-scd892"),
    tagline: "Bild på 3,5 tum utan konto, utan app och utan router.",
    scores: {
      brytlarm: 4.5,
      fristaende: 5,
      foraldraenheten: 5,
      rackvidd: 3,
      prisvarde: 1.5,
    },
    price: 3899,
    merchant: "Jollyroom",
    merchantUrl:
      "https://www.jollyroom.se/babyprodukter/barnsakerhet/babyvakter/philips-avent-scd892-26-babyvakt",
    priceCheckedAt: PRICE_CHECKED,
    award: "premium",
    superlative: "Bäst bild utan konto och moln",
    pros: [
      "Enda videovakten här med vibrationslarm, och det går att ställa så det bara vibrerar när ljudet är avstängt",
      "Piper var 20:e sekund så länge förbindelsen är bruten, inte bara en gång",
      "Anger både 50 meter inomhus och 300 utomhus, alltså båda talen",
      "10 timmars drift i ekoläge på 2 600 mAh",
    ],
    cons: [
      "3 899 kronor, alltså 2 200 mer än den näst dyraste i jämförelsen",
      "Kraftigaste sändaren här, högst 20 dBm enligt manualen, mot CAPiDis 12",
    ],
    specs: [
      { label: "Typ", value: "Ljud och video", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value: "Röd länklampa, pip var 20:e sekund och bild i displayen",
        highlight: true,
      },
      {
        label: "Räckvidd fri sikt",
        shortLabel: "Räckvidd",
        value: "300 m",
        highlight: true,
      },
      { label: "Räckvidd inomhus", value: "50 m" },
      { label: "Överföring", value: "IEEE 802.11 b/g/n, 2 412–2 472 MHz, direkt mellan enheterna", highlight: true },
      { label: "Kräver app eller konto", shortLabel: "App krävs", value: "Nej", highlight: true },
      { label: "Föräldraenhet", value: "Ingår, 2 600 mAh, 10 h i ekoläge" },
      { label: "Vibrationslarm", value: "Ja, med två lägen" },
      { label: "Tvåvägstal", value: "Ja" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "Ja, flera nivåer" },
      { label: "Temperaturvisning", value: "Ja" },
      { label: "Skärm", value: "3,5 tum med mörkerseende" },
      { label: "Flera babyenheter", value: "–" },
      { label: "Max sändareffekt", value: "≤ 20 dBm e.i.r.p enligt manualen" },
      { label: "Mörkerseende", value: "Ja" },
      { label: "Kamera", value: "Manuell rotation" },
      { label: "GTIN", value: "–" },
    ],
    verdict:
      "Philips Avent SCD892 är videovakten för den som inte vill ha barnets ansikte på någon annans server. 3 899 kronor hos Jollyroom, och enheterna talar direkt med varandra utan router, konto eller app.\n\nDet är ovanligt. De flesta kameror som ger dig bild i telefonen gör det genom att skicka strömmen via internet, och den här gör det inte alls: manualen har inget appavsnitt, ingen inloggning och ingen molntjänst. Larmet är också det uthålligaste här. Länklampan blir röd och föräldraenheten piper var tjugonde sekund så länge kontakten är bruten, alltså tills du reagerar, i stället för en enda signal du kan missa. Vibrationsläget går att ställa så att enheten bara vibrerar när högtalaren är avstängd, vilket gör att du kan ligga bredvid den i tyst läge och ändå bli väckt.\n\nPriset är svårt att försvara. 3 899 kronor är två och en halv gånger vad Motorola VM483 kostar för samma grundfunktion, och du får 300 meter i fri sikt mot CAPiDis 1 000.\n\nDen som vill ha bild och inte tänker låta ett barnrum ligga uppkopplat mot internet betalar det här. Alla andra tar VTech VM5254 och lägger 2 400 kronor på något annat.",
  },
  {
    id: "vtech-vm5254",
    name: "VM5254 Video",
    brand: "VTech",
    image: productImage(BABYVAKT.slug, "vtech-vm5254"),
    tagline: "Fem tums skärm, störst av videovakterna som klarar sig utan internet.",
    scores: {
      brytlarm: 3.5,
      fristaende: 5,
      foraldraenheten: 4.5,
      rackvidd: 3,
      prisvarde: 3.5,
    },
    price: 1499,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/vtech-baby-monitor-video-vm5254",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst femtumsskärm för pengarna",
    pros: [
      "5 tums färgskärm, störst här bland dem som inte kräver app",
      "Nattlampan anpassar sig efter ljuset i rummet och går att sätta i sju färger",
      "Ljudindikator i nio steg, så du ser hur mycket det låter även med ljudet av",
      "Skärmen tänds av sig själv när babyenheten hör något",
    ],
    cons: [
      "Pipet när förbindelsen bryts är en inställning du måste slå på, inte något som är på från början",
      "Inget vibrationslarm",
    ],
    specs: [
      { label: "Typ", value: "Ljud och video", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value: "Pip som slås på i menyn",
        highlight: true,
      },
      {
        label: "Räckvidd fri sikt",
        shortLabel: "Räckvidd",
        value: "300 m",
        highlight: true,
      },
      { label: "Räckvidd inomhus", value: "–" },
      { label: "Överföring", value: "Digital 2,4 GHz, direkt mellan enheterna", highlight: true },
      { label: "Kräver app eller konto", shortLabel: "App krävs", value: "Nej", highlight: true },
      { label: "Föräldraenhet", value: "Ingår, uppladdningsbar" },
      { label: "Vibrationslarm", value: "Nej" },
      { label: "Tvåvägstal", value: "Ja" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "Ja, ljudaktiverat skärmläge" },
      { label: "Temperaturvisning", value: "Ja, på föräldraenheten" },
      { label: "Skärm", value: "5 tum färg" },
      { label: "Flera babyenheter", value: "Ja, VM5254-2" },
      { label: "Max sändareffekt", value: "–" },
      { label: "Mörkerseende", value: "Automatiskt infrarött" },
      { label: "GTIN", value: "4897027125993" },
    ],
    verdict:
      "VTech VM5254 är den största skärmen du kan få utan att koppla upp barnrummet. 1 499 kronor hos Apotea, fem tum i färg, och ingen app inblandad.\n\nDet adaptiva nattljuset är den funktion som märks mest i vardagen. Det mäter ljuset i rummet och anpassar sig, i sju färger, i stället för att lysa lika starkt klockan nio som klockan tre. Skärmen tänds av sig själv när babyenheten hör något och slocknar igen, alltså ligger den mörk på nattduksbordet tills det finns något att titta på. Ljudindikatorn i nio steg gör att du kan ha volymen nere och ändå se om det är gnyende eller gråt.\n\nPipet när förbindelsen bryts är en inställning i menyn. Den som packar upp kartongen och inte går igenom inställningarna har alltså köpt en videovakt som kan tystna utan att säga till. Slå på det först av allt.\n\nVill du se barnet och inte betala Philips-priset är det här valet. Behöver du bara höra det gör Motorola PIP15 jobbet för hälften.",
  },
  {
    id: "motorola-vm483",
    name: "VM483 Video",
    brand: "Motorola",
    image: productImage(BABYVAKT.slug, "motorola-vm483"),
    tagline: "2,8 tum med mörkerseende och fjärrzoom för under 1 300 kronor.",
    scores: {
      brytlarm: 4,
      fristaende: 5,
      foraldraenheten: 3.5,
      rackvidd: 3,
      prisvarde: 3.5,
    },
    price: 1289,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/motorola-baby-monitor-vm483-video",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för barnrummet på samma våning",
    pros: [
      "Föräldraenheten piper när den tappar babyenheten, utöver den blå länklampan",
      "Temperaturlarm som du sätter en övre och undre gräns för",
      "Påminnelselarm på 2 till 6 timmar, alltså matningspåminnelse i samma apparat",
      "Digital zoom som styrs från föräldraenheten",
    ],
    cons: [
      "5 timmars batteritid på föräldraenheten, kortast i jämförelsen",
      "Kjell säljer samma artikel för 999 kronor men har den inte i lager",
    ],
    specs: [
      { label: "Typ", value: "Ljud och video", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value: "Blå blinkande länklampa och pip på föräldraenheten",
        highlight: true,
      },
      {
        label: "Räckvidd fri sikt",
        shortLabel: "Räckvidd",
        value: "300 m",
        highlight: true,
      },
      { label: "Räckvidd inomhus", value: "–" },
      { label: "Överföring", value: "FHSS 2 405–2 475 MHz, direkt mellan enheterna", highlight: true },
      { label: "Kräver app eller konto", shortLabel: "App krävs", value: "Nej", highlight: true },
      { label: "Föräldraenhet", value: "Ingår, 1 200 mAh, 5 h drift" },
      { label: "Vibrationslarm", value: "Nej" },
      { label: "Tvåvägstal", value: "Ja" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "–" },
      { label: "Temperaturvisning", value: "Ja, med larmgränser" },
      { label: "Skärm", value: "2,8 tum färg-TFT" },
      { label: "Flera babyenheter", value: "Ja, upp till 4" },
      { label: "Max sändareffekt", value: "–" },
      { label: "Mörkerseende", value: "Infrarött" },
      { label: "GTIN", value: "5055374710135" },
    ],
    verdict:
      "Motorola VM483 är den billigaste videovakten i jämförelsen som håller bilden hos sig själv. 1 289 kronor hos Apotea, 2,8 tums färgskärm och infrarött mörkerseende.\n\nPåminnelselarmet är den funktion ingen annan här har. Du ställer 2, 3, 4, 5 eller 6 timmar och föräldraenheten piper när tiden gått, vilket under de första månaderna betyder att matningarna sköts av babyvakten i stället för av telefonens väckarklocka. Temperaturlarmet fungerar likadant som VTechs, med en övre och en undre gräns. Upp till fyra babyenheter går att para ihop med samma föräldraenhet, alltså mer än något annat system här.\n\nBatteriet räcker fem timmar, kortast av alla. Det betyder att den ska stå i laddaren om natten, och att den inte följer med ut i trädgården en hel eftermiddag.\n\nSover barnet på samma våning som du är räckvidden och batteriet inget problem, och då är det här den mest bild för pengarna. Ska den med ut tar du VTech VM5254 i stället.",
  },
  {
    id: "motorola-pip10",
    name: "PIP10 Audio",
    brand: "Motorola",
    image: productImage(BABYVAKT.slug, "motorola-pip10"),
    tagline: "49 meter genom väggar för 399 kronor, billigast av alla elva.",
    scores: {
      brytlarm: 4,
      fristaende: 5,
      foraldraenheten: 1.5,
      rackvidd: 3,
      prisvarde: 5,
    },
    price: 399,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/motorola-baby-monitor-pip10-audio",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Bäst för en liten lägenhet",
    pros: [
      "Larm både när du går utanför räckvidden och när batteriet börjar ta slut",
      "Anger 49 meter inomhus i manualen, alltså det tal som faktiskt gäller",
      "DECT-band, så varken grannens babyvakt eller mobilerna stör",
      "Går att bygga ut med en andra föräldraenhet",
    ],
    cons: [
      "Ingen display, ingen temperatur och inget tvåvägstal, alltså bara ljud",
      "Mikrofonkänsligheten går inte att ställa, så du kan inte välja bort snörvlingarna",
    ],
    specs: [
      { label: "Typ", value: "Ljud", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value: "Ljudlarm vid räckviddsbrott och svagt batteri",
        highlight: true,
      },
      {
        label: "Räckvidd fri sikt",
        shortLabel: "Räckvidd",
        value: "305 m",
        highlight: true,
      },
      { label: "Räckvidd inomhus", value: "49 m" },
      { label: "Överföring", value: "DECT, 1 881,8–1 897,3 MHz", highlight: true },
      { label: "Kräver app eller konto", shortLabel: "App krävs", value: "Nej", highlight: true },
      { label: "Föräldraenhet", value: "Ingår, batteridriven och portabel" },
      { label: "Vibrationslarm", value: "Nej" },
      { label: "Tvåvägstal", value: "Nej" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "Nej" },
      { label: "Temperaturvisning", value: "Nej" },
      { label: "Skärm", value: "Ingen, LED-indikator" },
      { label: "Flera babyenheter", value: "Nej, men upp till 2 föräldraenheter" },
      { label: "Max sändareffekt", value: "< 0,25 W enligt manualen" },
      { label: "GTIN", value: "5055374712375" },
    ],
    verdict:
      "Motorola PIP10 är den billigaste babyvakten i jämförelsen och den enda under femhundra. 399 kronor hos Apotea, och den gör en enda sak: skickar ljudet från barnrummet till en dosa du bär med dig.\n\nDet den gör rätt är att säga till när den inte längre gör det. Funktionslistan i manualen räknar upp larm både för räckviddsbrott och för svagt batteri, alltså de två sätt den kan sluta fungera på. Samma manual anger 160 fot inomhus och 1 000 fot utomhus, vilket blir 49 respektive 305 meter, och den siffran är värd mer än marknadsföringstalet: 49 meter räcker genom väggarna i en tvåa eller trea men inte ut i ett trapphus. DECT-bandet gör att grannens apparat och husets mobiler inte stör.\n\nDen har ingen skärm, ingen temperaturvisning och inget sätt att svara. Mikrofonkänsligheten går inte att ställa, så du får varje snörvling.\n\nBor du i lägenhet och vill lägga så lite som möjligt gör den jobbet. Har du fler än ett rum mellan er, eller vill kunna säga något lugnande, är VTech DM1212 för 599 kronor en helt annan apparat.",
  },
  {
    id: "vtech-rm5756hd",
    name: "RM5756HD",
    brand: "VTech",
    image: productImage(BABYVAKT.slug, "vtech-rm5756hd"),
    tagline: "1080p och 135 graders vidvinkel, med bilden också i telefonen.",
    scores: {
      brytlarm: 3.5,
      fristaende: 3.5,
      foraldraenheten: 4.5,
      prisvarde: 3,
    },
    price: 1699,
    merchant: "Jollyroom",
    merchantUrl:
      "https://www.jollyroom.se/babyprodukter/barnsakerhet/babyvakter/vtech-rm5756hd-babyvakt",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för dig som är borta ibland",
    pros: [
      "1080p och 135 graders synfält, alltså hela spjälsängen och golvet runt om",
      "Flera vuxna kan se barnet samtidigt genom appen, från olika platser",
      "Fjärrstyrd panorering, lutning och zoom från både föräldraenheten och telefonen",
      "Nattlampa med pekfunktion som byter färg och styrka",
    ],
    cons: [
      "Halva funktionen ligger hos VTechs tjänst, så en nedstängning tar med sig appen",
      "Larmtonen vid bruten länk är en menyinställning och inte något som är på från början",
    ],
    specs: [
      { label: "Typ", value: "Ljud och video", highlight: true },
      {
        label: "Larm vid bruten förbindelse",
        shortLabel: "Larm vid brott",
        value: "Larmton som slås på i menyn",
        highlight: true,
      },
      { label: "Räckvidd fri sikt", shortLabel: "Räckvidd", value: "–", highlight: true },
      { label: "Räckvidd inomhus", value: "–" },
      { label: "Överföring", value: "Wi-Fi till appen, plus egen föräldraenhet", highlight: true },
      {
        label: "Kräver app eller konto",
        shortLabel: "App krävs",
        value: "Ja för mobilvisning, My VTech Baby",
        highlight: true,
      },
      { label: "Föräldraenhet", value: "Ingår, uppladdningsbar LCD-enhet" },
      { label: "Vibrationslarm", value: "–" },
      { label: "Tvåvägstal", value: "Ja" },
      { label: "Justerbar mikrofonkänslighet", shortLabel: "Justerbar mikrofon", value: "–" },
      { label: "Temperaturvisning", value: "Ja" },
      { label: "Skärm", value: "5 tum, 1080p-kamera" },
      { label: "Flera babyenheter", value: "–" },
      { label: "Max sändareffekt", value: "–" },
      { label: "Mörkerseende", value: "Infrarött" },
      { label: "Synfält", value: "135 grader" },
      { label: "GTIN", value: "–" },
    ],
    verdict:
      "VTech RM5756HD är babyvakten för hushållet där två vuxna vill kunna titta till barnet från var sitt håll. 1 699 kronor hos Jollyroom, 1080p och 135 graders synfält.\n\nVidvinkeln är det som skiljer den från de andra videovakterna. 135 grader tar hela spjälsängen och golvet runt om, i stället för en utsnittad bild du måste panorera i för att hitta barnet. Panorering, lutning och zoom går ändå att styra, både från föräldraenheten och från telefonen, och flera vuxna kan vara inloggade samtidigt. Det gör den till en verklig produkt för den som lämnat barnet hos en mor- eller farförälder och vill kunna titta själv.\n\nHalva funktionen ligger hos någon annan. Mobilbilden går genom VTechs tjänst och kräver konto, alltså försvinner den den dag tjänsten stängs eller nätet ligger nere, och föräldraenheten är kvar. Larmtonen när länken bryts är dessutom en inställning i menyn snarare än något som är på när du packar upp.\n\nVill du kunna se barnet hemifrån jobbet är det här enda valet i jämförelsen. Vill du att apparaten ska fungera likadant om tio år tar du Philips Avent SCD892, eller VTechs egen VM5254 för 200 kronor mindre.",
  },
];

/* redistributeMissing är förvalet. VTech RM5756HD saknar poäng på räckvidd,
   eftersom varken tillverkaren eller butiken anger något metertal för länken
   mellan enheterna. Att sätta ett lågt betyg på en uppgift vi inte etablerat
   hade varit att betygsätta vår egen research, vilket sidan uttryckligen inte
   gör. Se `redistributeMissing` i lib/products.ts och `pnpm check:avdrag`. */
export const BABYVAKT_PRODUCTS: Product[] = resolveProducts(BABYVAKT, SEEDS);

const VIDEO_IDS = [
  "philips-avent-scd892",
  "vtech-vm5254",
  "motorola-vm483",
  "vtech-rm5756hd",
];

const LJUD_IDS = SEEDS.map((s) => s.id).filter((id) => !VIDEO_IDS.includes(id));

/* Fyra filter, valda efter de fyra frågor en förälder faktiskt ställer i
   butiken: bild eller inte, ska den tåla att jag sover bredvid den, ska den
   fungera när internet ligger nere, och räcker den ut i trädgården. */
export const BABYVAKT_FILTERS: ComparisonFilter[] = [
  { key: "ljud", label: "Bara ljud", ids: LJUD_IDS },
  { key: "video", label: "Med bild", ids: VIDEO_IDS },
  {
    key: "vibration",
    label: "Vibrationslarm",
    ids: [
      "capidi-premium",
      "capidi-babyvakt",
      "neonate-bc-6500d",
      "neonate-bc-5700d",
      "philips-avent-scd892",
    ],
  },
  {
    key: "lang-rackvidd",
    label: "Minst 450 m i fri sikt",
    ids: [
      "capidi-premium",
      "capidi-babyvakt",
      "neonate-bc-6500d",
      "neonate-bc-5700d",
      "motorola-pip15",
      "vtech-dm1212",
    ],
  },
];

export const BABYVAKT_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Snuza",
    name: "Hero MD",
    reason:
      "Ett andningslarm som fästs på blöjkanten och känner av bröstkorgens rörelser. Det är en annan produkt än en babyvakt: den skickar inget ljud till dig och du kan inte höra barnet med den. Den förklaras i köpguiden i stället.",
    approxPrice: 1299,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/snuza-hero-md-2",
  },
  {
    brand: "Owlet",
    name: "Dream Sock",
    reason:
      "En strumpa som mäter puls och syremättnad och larmar i appen. Samma sak här: den ersätter inte en babyvakt utan är ett tillägg, och den kostar 3 799 kronor, alltså nio gånger den billigaste apparaten i rankningen.",
    approxPrice: 3799,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/owlet-dream-sock-mint",
  },
  {
    brand: "Motorola",
    name: "VM85 Connect",
    reason:
      "Videovakt med både föräldraenhet och app, alltså samma sorts apparat som VTech RM5756HD. Apotea märker den Sista chansen, vilket betyder att lagret tar slut, och vi rankar inte något som är på väg ut ur sortimentet.",
    approxPrice: 2499,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/motorola-baby-monitor-vm85-connect",
  },
  {
    brand: "Alecto",
    name: "Videobabyvakt med 2,4-tums färgskärm",
    reason:
      "Kjell för den och anger både 50 meter inomhus och 300 utomhus, vilket är ovanligt öppet. Den kom in i sortimentet så nyligen att det fanns ett exemplar online när vi kontrollerade, och en rankad produkt ska gå att beställa. Värd att ta med nästa gång.",
    approxPrice: 999,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/barn-baby/babymonitor/alecto-videobabyvakt-med-24-tums-fargskarm-p58030",
  },
  {
    brand: "Nedis",
    name: "SmartLife Babycam Full HD",
    reason:
      "En wifi-kamera som säljs som babyvakt, utan föräldraenhet. Den ger dig bild i telefonen och ingenting när routern startas om, alltså saknar den grundfunktionen de elva rankade har. Billig, 699 kronor, och det är hela argumentet för den.",
    approxPrice: 699,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/barn-baby/babymonitor/nedis-smartlife-babycam-full-hd-med-morkerseende-p58041",
  },
  {
    brand: "Philips Avent",
    name: "Advanced DECT Babymonitor",
    reason:
      "En ren ljudvakt från Philips som Apotea märker Sista chansen. Vi rankar Philips videovakt i stället, eftersom den finns kvar i sortimentet och eftersom en utgående artikel inte hjälper någon som ska köpa i dag.",
    approxPrice: 1357,
    merchant: "Apotea",
    merchantUrl: "https://www.apotea.se/philips-avent-advanced-dect-babymonitor",
  },
];

export const BABYVAKT_FAQ = [
  {
    question: "Vilken babyvakt är bäst 2026?",
    answer:
      "CAPiDi Premium Baby Alarm, 1 399 kronor. Den når 1 000 meter i fri sikt, larmar med både ljud och blinkande ikon efter 30 sekunder om kontakten med babyenheten bryts, har vibrationslarm och går att koppla till tre babyenheter. Vill du se barnet och inte bara höra det är Philips Avent SCD892 valet, men det kostar 3 899 kronor. Ska du lägga så lite som möjligt gör Motorola PIP10 jobbet för 399.",
  },
  {
    question: "Hur långt räcker en babyvakt inomhus?",
    answer:
      "Ungefär en sjättedel av talet på kartongen. Fyra tillverkare anger båda talen och de landar alla på samma kvot: Motorola PIP10 anger 49 meter inomhus mot 305 utomhus, Philips Avent 50 mot 300, VTech DM1212 75 mot 460 och Alecto 50 mot 300. En babyvakt som anges till 800 meter räcker alltså ungefär 130 meter genom väggar, vilket täcker varje svensk bostad och normalt garaget också. Betongbjälklag och plåt tar mer än gips.",
  },
  {
    question: "Behöver jag en babyvakt med kamera?",
    answer:
      "Inte för att höra att barnet vaknat. Bilden är till för två saker: att se om barnet ligger fritt utan att öppna dörren, och att se om det somnat om eller bara ligger tyst. Båda är verkliga, men de kostar 500 till 2 500 kronor extra och en videovakt drar mer batteri. Det vanliga är att bilden används mest under de första månaderna och sedan sällan. Köp video om ditt barn väcks av att dörren öppnas, annars räcker ljud.",
  },
  {
    question: "Skyddar en babyvakt mot plötslig spädbarnsdöd?",
    answer:
      "Nej. 1177 listar sex råd för att minska risken, senast uppdaterade i januari 2026 och granskade av barnläkare: låt barnet sova på rygg, använd inte nikotin, håll ansiktet fritt och barnet lagom varmt, låt barn under tre månader sova i egen säng i förälderns rum, amma om det går, och napp får användas. Ingen av åtgärderna är en apparat. Två av tillverkarna skriver samma sak i sina egna manualer: CAPiDi att apparaten inte ska betraktas som medicinteknisk, VTech att den inte är en medicinteknisk produkt och inte ska användas som en. En babyvakt är till för att du ska höra barnet från ett annat rum.",
  },
  {
    question: "Vad är skillnaden mellan babyvakt och andningslarm?",
    answer:
      "En babyvakt skickar ljud, och ibland bild, från barnrummet till en enhet du bär med dig. Ett andningslarm sitter på barnet eller under madrassen och larmar om det inte känner rörelse eller om syremättnaden faller. De löser olika problem och ersätter inte varandra. Priserna skiljer också: babyvakterna här kostar 399 till 3 899 kronor, medan Snuza Hero MD ligger på 1 299 och Owlet Dream Sock på 3 799.",
  },
  {
    question: "Kan någon annan lyssna på min babyvakt?",
    answer:
      "Det beror på tekniken. De elva vi jämför är alla digitala och parar ihop enheterna med varandra, vilket är en annan sak än de analoga FM-vakter som såldes förr och som vem som helst med en skanner kunde lyssna på. CAPiDi och Neonate arbetar på 868 megahertz med krypterad parning, Motorola PIP och VTech DM på DECT-bandet, och videomodellerna på 2,4 gigahertz. Det som ändrar bilden är app och konto: en babyvakt som skickar bilden via internet lägger till en tjänst, ett lösenord och en server, alltså tre saker till som kan gå fel. Det är därför fristående drift väger 25 av 100 här.",
  },
  {
    question: "Vad betyder det att en babyvakt har låg strålning?",
    answer:
      "Att sändaren går på lägre effekt än en DECT-telefon. VTech deklarerar 0,25 watt för sin DM1212, vilket är DECT-klassens toppeffekt, och Motorola anger mindre än 0,25 watt för sina. CAPiDi och Neonate arbetar på 868 megahertz i stället och anger klart lägre tal. Men talen håller inte för en andra läsning: CAPiDi anges till 10 milliwatt i två butiker medan tillverkarens egen manual deklarerar 12 dBm, alltså 15,8 milliwatt, och samtidigt påstår 10 procent av DECT, vilket vore 25. Neonate BC-6500D anges till 20 milliwatt hos Jollyroom och 25 hos Babyland. Vi väger därför inte in sändareffekten i betygen. Lägre effekt betalas dessutom med kortare räckvidd.",
  },
  {
    question: "Vad händer om babyvakten tappar kontakten?",
    answer:
      "Det är den viktigaste frågan att ställa före köp, och svaret står i manualen och inte i butiken. Neonate BC-5700D larmar efter 30 sekunder i tre fall: du är utanför räckvidden, babyenheten är avstängd, eller babyenheten kan inte sända, till exempel för att den är trasig. CAPiDi larmar efter 30 sekunder och även när babyenhetens batteri tagit slut. Philips Avent piper var tjugonde sekund tills du reagerar. VTech VM5254 och RM5756HD har larmet som en menyinställning du själv måste slå på. Gör det innan du börjar använda apparaten.",
  },
  {
    question: "Finns det ett svenskt test av babyvakter?",
    answer:
      "Råd & Rön har provat tretton babyvakter i labb, med tekniskt uppmätt lägsta ljudnivå och en egen mätning av vilken varning apparaten ger när signalen bryts. Testet är publicerat 15 juni 2012 och ingen av de tretton modellerna säljs i svensk handel i dag. Det är därför vi inte har något kriterium för testomdöme på den här sidan, och därför att alla siffror i vår tabell kommer från tillverkarnas egna manualer och butikernas produktsidor.",
  },
  {
    question: "Hur många babyenheter behöver jag till två barn?",
    answer:
      "En per rum, om barnen sover i olika rum. Neonate BC-6500D och CAPiDi Premium tar båda upp till tre babyenheter på samma föräldraenhet, och Motorola VM483 upp till fyra. Neonate har dessutom olikfärgade lampor som visar vilken enhet som hör något, vilket är skillnaden mellan att veta och att gissa vilket rum du ska gå in i. Sover barnen i samma rum räcker en enhet.",
  },
  {
    question: "Går det att använda en vanlig övervakningskamera som babyvakt?",
    answer:
      "Det går, och det är ett sämre köp än det låter. En wifi-kamera saknar föräldraenhet, alltså är telefonen din enda mottagare, och den slutar visa något när routern startas om eller när tjänsten ligger nere. Den larmar inte heller för att den tappat kontakten, den bara slutar uppdatera. En babyvakt med två enheter som pratar direkt med varandra har ingen av de svagheterna. Nedis SmartLife Babycam för 699 kronor är exemplet, och den ligger bland de bortvalda av precis det skälet.",
  },
];
