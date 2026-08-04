import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { SMART_TERMOSTAT } from "@/lib/test-pages";

/**
 * Smart termostat. Underlag i .agent/research/smart-termostat.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, artikelnummer, GTIN,
 * adapterlistor, frostskyddsuppgifter och tillverkarnas besparingspåståenden.
 * Allt läst 2026-08-04 hos Kjell, hos Proshop eller på tillverkarens egen sida.
 *
 * **Citat:** Ljud & Bilds och Stiftung Warentests omdömen är återgivna med
 * deras egna ord och länkade i lib/sources.ts.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte skruvat på någon
 * termostat, inte mätt någon förbrukning och inte jämfört någon elräkning.
 *
 * ## Avgränsning
 *
 * Bara radiatortermostater, alltså de som skruvas på ventilen på ett
 * vattenburet element. Rumstermostat för elvärme, infraröd styrning av
 * luftvärmepump och framledningsstyrning löser andra problem och ligger bland
 * de övervägda. Beslut av användaren 2026-08-04.
 *
 * ## Fyndet: procentsatsen
 *
 * | Vem | Höll i den | Tal |
 * |---|---|---|
 * | Ljud & Bild, tre modeller | ja | inget, av princip |
 * | Stiftung Warentest, elva i labb | ja | bakom betalvägg |
 * | Fibaro | nej | 42 %, fotnot "research by Fibar Group S.A." |
 * | Netatmo | nej | 37 %, bara i butikstexten |
 * | Danfoss | nej | 30 % egen sida, 23 % i butiken |
 * | tado | nej | 28 %, och 22 % som eget användarsnitt |
 * | Aqara, Eve, SONOFF, Schneider | nej | inget tal |
 *
 * ⚠️ **Raden `Angiven besparing` får aldrig fyllas i åt någon.** Den står i
 * ALDRIG_BEDOMD i lib/spec-schema.mjs. Aqara anger ingenting, och det ska
 * synas som ingenting. Låna heller aldrig ett tal från en systermodell.
 *
 * ⚠️ **Besparingen påverkar inget betyg.** Användarbeslut 2026-08-04, av samma
 * skäl som igelkotten på /robotgrasklippare: det finns inga provresultat per
 * modell, och ett betyg på ett påstående mäter butikens copywriting.
 *
 * ## Fynd två: adaptertabellerna finns, men inte där man köper
 *
 * tado publicerar sex adaptrar som ingår och fyra som inte gör det, i sitt
 * hjälpcenter. Netatmo skiljer likadant, också i hjälpcentret. Aqara lägger
 * listan på produktsidan, och E1 är ensam om att namnge vad som inte fungerar:
 * manuella ventiler, RTL och enrörssystem. Butikstexterna säger "en mängd
 * olika tillverkare" och "de flesta".
 *
 * ⚠️ **Danfoss två artikelnummer**, lästa hos Danfoss egen butik: 014G2460
 * täcker RAV, RA, RAVL och M30 för 760 kr, medan 014G2420 täcker RA och M30
 * för 890. Den dyrare passar färre ventiler.
 *
 * ⚠️ **Warentest fann att en av elva föll på frostskyddsprovet.** Vilken ligger
 * bakom betalvägg. Skriv aldrig ett namn där.
 */

export const PRICE_CHECKED = "2026-08-04";

const KJELL = "Kjell & Company";
const PROSHOP = "Proshop";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "aqara-radiator-thermostat-w600",
    name: "Aqara Radiator Thermostat W600",
    shortName: "Aqara W600",
    brand: "Aqara",
    image: productImage(SMART_TERMOSTAT.slug, "aqara-radiator-thermostat-w600"),
    tagline: "Sex adaptrar namngivna på produktsidan, och den arbetar ljudlöst.",
    scores: {
      kravs: 3.5,
      ventil: 4.5,
      oberoende: 4,
      provning: 4.5,
      prisvarde: 4,
    },
    price: 559,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/aqara-termostatventil-w600-vit-p56576",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst passform och tystast",
    pros: [
      "Sex adaptrar namngivna på produktsidan: RA, RAV, RAVL, Giacomini, M28x1,5 och Caleffi",
      "Ljud & Bild: gör sitt jobb helt ljudlöst, och tillverkaren anger under 30 dB",
      "Talar både Thread och Zigbee, så den fungerar med de flesta Matter-hem",
      "Inget abonnemang och ingen månadskostnad",
      "Två års batteritid på två AA-celler",
    ],
    cons: [
      "Kräver en Matter Border Router eller en Aqara-hubb, som inte ingår",
      "Öppet fönster kräver en separat dörr- och fönstersensor, inte bara termostaten",
      "Ljud & Bild: styrning från både Aqaras app och Google Home samtidigt fungerar inte över Thread",
    ],
    specs: [
      { label: "Pris", value: "559 kr", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value: "M30x1,5 plus RA, RAV, RAVL, Giacomini, M28x1,5, Caleffi",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Matter Border Router eller Aqara-hubb",
        highlight: true,
      },
      { label: "Protokoll", value: "Thread och Zigbee", highlight: true },
      { label: "Matter", value: "Ja" },
      { label: "Abonnemang", value: "Nej" },
      { label: "Angiven besparing", value: "Ej angiven", highlight: true },
      { label: "Frostskydd", value: "Ja, värmer under 5 °C, återgår vid 8 °C" },
      { label: "Öppet fönster", value: "Ja, men kräver separat fönstersensor" },
      { label: "Batteri", value: "2 x AA" },
      { label: "Batteritid", value: "Upp till 2 år" },
      { label: "Ljud", value: "Under 30 dB enligt tillverkaren" },
      { label: "Artikelnummer", value: "56576" },
    ],
    verdict:
      "Aqara W600 vinner på att svara på frågan alla andra hoppar över. Produktsidan namnger sex adaptrar rakt av, RA, RAV, RAVL, Giacomini, M28x1,5 och Caleffi, utöver den egna M30x1,5-fattningen. Det låter torrt tills man inser att det är den uppgift som avgör om termostaten går att montera på elementet du faktiskt har, och att tado och Netatmo gömmer samma tabell i ett hjälpcenter medan butiken skriver att den passar en mängd olika tillverkare.\n\nLjud & Bild provade den i februari 2026 och lyfte fram att den arbetar helt ljudlöst. Det är ingen liten sak i ett sovrum: Netatmos termostat i samma test hörs när motorn justerar, och en apparat som väsnas klockan fyra på morgonen skruvas ner för hand och slutar vara smart. Aqara anger under 30 dB.\n\nFrostskyddet är beskrivet med tal i stället för med ord. Värmen slås på när temperaturen faller under fem grader och återgår vid åtta. Det är värt att veta i ett land där Stiftung Warentest hittade en termostat som inte klarade sitt frostskyddsprov och skrev att det vid minusgrader kan spricka rör.\n\nTvå saker drar ner den. Den behöver en Matter Border Router eller en Aqara-hubb, och har du ingen kostar termostaten mer än 559 kronor. Och funktionen för öppet fönster kräver en separat sensor, medan de flesta konkurrenter känner av temperaturfallet själva.\n\nKöp den om du har ett Matter- eller Zigbee-hem sedan tidigare och vill kunna kontrollera passformen innan du beställer. Har du ingen hubb alls blir slutnotan högre än prislappen antyder.",
  },
  {
    id: "aqara-radiator-thermostat-e1",
    name: "Aqara Radiator Thermostat E1",
    shortName: "Aqara E1",
    brand: "Aqara",
    image: productImage(SMART_TERMOSTAT.slug, "aqara-radiator-thermostat-e1"),
    tagline: "Ensam om att skriva ut vilka värmesystem den inte fungerar på.",
    scores: {
      kravs: 3,
      ventil: 5,
      oberoende: 3.5,
      prisvarde: 4,
    },
    price: 549,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/aqara-e1-smart-termostat-for-element-p52051",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 9, checkedAt: PRICE_CHECKED },
    award: "editor",
    superlative: "Bäst besked före köp",
    pros: [
      "Namnger både adaptrarna och undantagen: manuella ventiler, RTL och enrörssystem stöds inte",
      "Enrörssystem är vanligt i svenska hus från 1960- och 70-talen, och ingen annan nämner det",
      "Adaptrar för M30x1,5 samt Danfoss RA, RAV och RAVL ingår",
      "Upp till ett års batteritid",
      "549 kronor, näst billigast av dem vi rankar",
    ],
    cons: [
      "Kräver en Aqara-hubb för fjärrstyrning, som inte ingår",
      "För automatisk värmejustering krävs dessutom separata Aqara-sensorer",
      "Ingen redaktion har provat just den här modellen",
    ],
    specs: [
      { label: "Pris", value: "549 kr", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value: "M30x1,5 plus RA, RAV, RAVL. Ej manuella, RTL eller enrörssystem",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Aqara-hubb",
        highlight: true,
      },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Matter", value: "Via uppdatering av Aqaras hubbar" },
      { label: "Abonnemang", value: "Nej" },
      { label: "Angiven besparing", value: "Ej angiven", highlight: true },
      { label: "Frostskydd", value: "Ja, via inställd lägstatemperatur" },
      { label: "Öppet fönster", value: "Ja" },
      { label: "Batteritid", value: "Upp till 1 år" },
      { label: "Artikelnummer", value: "52051" },
    ],
    verdict:
      "Aqara E1 gör något ingen annan tillverkare i kategorin gör: den talar om vad den inte klarar. Produktsidan listar adaptrarna för M30x1,5 och Danfoss RA, RAV och RAVL, och fortsätter sedan med att manuella ventiler, returtemperaturbegränsare och enrörssystem inte stöds.\n\nDen sista är den som betyder mest i Sverige. Enrörssystem sitter i en stor del av flerbostadsbeståndet från 1960- och 70-talen, och den som bor i ett sådant hus kan köpa fyra termostater innan någon berättar att de aldrig kommer att fungera. Att det står på produktsidan i stället för i ett supportforum är hela skälet till att den får Redaktionens val.\n\nDen kostar 549 kronor och behöver en Aqara-hubb för att nås utifrån. Kjell länkar själva till hubben på produktsidan, vilket är hederligt av en butik, men det betyder att tre rum inte kostar 1 647 kronor utan mer. Vill du dessutom att den ska justera värmen automatiskt efter rummet krävs separata Aqara-sensorer.\n\nIngen redaktion har provat just den här modellen. Ljud & Bild testade W600 och inte E1, och vi lånar aldrig ett omdöme mellan syskonmodeller. Raden står därför tom, och betyget vilar på de fyra kriterier vi kan fylla.\n\nKöp den om du redan har Aqara hemma, eller om du misstänker att dina ventiler är udda och vill ha svaret innan paketet är öppnat.",
  },
  {
    id: "eve-thermo-comfort-set",
    name: "Eve Thermo Comfort Set (Matter)",
    shortName: "Eve Thermo",
    brand: "Eve Systems",
    image: productImage(SMART_TERMOSTAT.slug, "eve-thermo-comfort-set"),
    tagline: "Inget konto, inget moln, inget abonnemang. Tillverkarens egna ord.",
    scores: {
      kravs: 3.5,
      ventil: 4,
      oberoende: 5,
      provning: 4,
      prisvarde: 2.5,
    },
    price: 1890,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Eve-Thermo-Comfort-Set-Matter/3297390",
    priceCheckedAt: PRICE_CHECKED,
    award: "premium",
    superlative: "Bäst för den som vill slippa konto",
    pros: [
      "Tillverkaren anger varken konto, registrering, molntjänst eller abonnemang",
      "Ljud & Bild: smidig och tyst hantering, full integritet",
      "Adaptrar för Danfoss RA, RAV och RAVL ingår i lådan",
      "Frostskydd finns och är namngivet som Valve Protection",
      "Thread och Matter, så den fungerar över plattformsgränserna",
    ],
    cons: [
      "1 890 kronor för två termostater, alltså 945 kronor styck",
      "Kräver en Matter-controller och en Thread Border Router som inte ingår",
      "Säljs inte styckvis i svensk handel, så tre rum blir två paket",
    ],
    specs: [
      { label: "Pris", value: "1 890 kr för 2 st", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value: "Adaptrar för Danfoss RA, RAV och RAVL ingår",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Matter-controller och Thread Border Router",
        highlight: true,
      },
      { label: "Protokoll", value: "Thread", highlight: true },
      { label: "Matter", value: "Ja" },
      { label: "Abonnemang", value: "Nej, uttryckligen inget" },
      { label: "Angiven besparing", value: "Ej angiven", highlight: true },
      { label: "Frostskydd", value: "Ja, Valve Protection" },
      { label: "Öppet fönster", value: "Ja" },
      { label: "GTIN", value: "4260195392618" },
    ],
    verdict:
      "Eve Thermo är den produkt där tillverkaren gör oberoendet till själva säljargumentet i stället för till en fotnot. På Eves egen sida står fyra rader efter varandra: inget abonnemang, ingen registrering, inget Eve-moln, hundra procent integritet. I en kategori där en konkurrent flyttat sina automatiska funktioner till en årsavgift är det ett konkret löfte och inte en känsla.\n\nLjud & Bild provade den i februari 2026 och beskrev hanteringen som smidig och tyst, med full integritet eftersom varken registrering, abonnemang eller molntjänst finns. De noterade samma invändning som vi: den kräver en Matter-controller och en Thread Border Router. Har du en HomePod, en Apple TV, en Nest-högtalare eller en Home Assistant hemma är den redan där. Har du inte det ska den kostnaden med i kalkylen.\n\nAdaptrarna anges i förpackningsinnehållet, Danfoss RA, RAV och RAVL. Det är mindre komplett än Aqaras sex och tados tio, men det är en lista och inte ett löfte. Frostskyddet heter Valve Protection och finns.\n\nPriset är det som håller den från toppen. 1 890 kronor för Comfort Set betyder 945 kronor per termostat, nästan dubbelt mot Aqaras 559, och den säljs inte styckvis i svensk handel. Tre rum blir alltså två paket och fyra termostater.\n\nKöp den om du vill äga din värmestyrning utan att ha ett konto hos någon, och redan har en Matter-hubb. Räknar du kronor per rum finns billigare vägar till nästan samma sak.",
  },
  {
    id: "sonoff-trvzb",
    name: "SONOFF TRVZB Zigbee 3.0",
    shortName: "SONOFF TRVZB",
    brand: "SONOFF",
    image: productImage(SMART_TERMOSTAT.slug, "sonoff-trvzb"),
    tagline: "361 kronor, och den listar vilka andras hubbar den fungerar med.",
    scores: {
      kravs: 4,
      ventil: 2.5,
      oberoende: 4.5,
      prisvarde: 5,
    },
    price: 361,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Sonoff-Intelligent-TRVZB-Zigbee-30-Thermostatic-Head/3277532",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Billigast, och minst inlåst",
    pros: [
      "361 kronor, billigast av dem vi rankar",
      "Fungerar med vilken Zigbee 3.0-hubb som helst, inte bara tillverkarens egen",
      "Tillverkaren räknar upp konkurrenternas hubbar vid namn",
      "Frostskydd anges uttryckligen mot frusna och spruckna rör",
      "Detektering av öppet fönster ingår",
    ],
    cons: [
      "Anger bara gängan M30x1,5 och lovar adaptrar för de flesta, utan lista",
      "Ingen redaktion har provat den",
      "Kräver en Zigbee-hubb eller en USB-sticka som inte ingår",
    ],
    specs: [
      { label: "Pris", value: "361 kr", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value: "M30x1,5. Adaptrar för de flesta, ingen lista",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Valfri Zigbee 3.0-hubb",
        highlight: true,
      },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Abonnemang", value: "Nej" },
      { label: "Angiven besparing", value: "Ej angiven", highlight: true },
      { label: "Frostskydd", value: "Ja" },
      { label: "Öppet fönster", value: "Ja" },
      { label: "GTIN", value: "6920075740950" },
    ],
    verdict:
      "SONOFF TRVZB kostar 361 kronor och är kategorins motsats till en märkesbunden brygga. Tillverkarens dokumentation räknar upp vilka hubbar den fungerar med, och listan innehåller både deras egna och formuleringen att vilken Zigbee 3.0-kompatibel hubb som helst duger. Det är ovanligt hederligt av ett företag som också säljer hubbar, och det är skälet till att den får högt betyg på oberoende.\n\nI praktiken betyder det att den fungerar i Home Assistant, i SmartThings och bakom en USB-sticka för ett par hundralappar. Slutar SONOFF finnas fortsätter termostaten att vara en Zigbee-enhet.\n\nDen tappar poäng på ventilen. Dokumentationen anger gängan M30x1,5 och skriver att adaptrar för de flesta värmesystem och tillverkare följer med, men namnger dem inte. Har du en Danfoss RA-ventil, vilket många svenska hus har, får du köpa och hoppas i stället för att läsa och veta. Frostskyddet är däremot utskrivet, och formuleringen om frusna och spruckna rör är ovanligt rak.\n\nIngen redaktion har provat den, varken Ljud & Bild eller Stiftung Warentest, så raden för provning står tom.\n\nKöp den om du redan kör Zigbee och vill sätta termostater på fem element utan att priset skenar. Är du osäker på vilken ventil du har är Aqara ett tryggare köp för tvåhundra kronor mer.",
  },
  {
    id: "danfoss-eco-bluetooth",
    name: "Danfoss Eco Bluetooth",
    shortName: "Danfoss Eco",
    brand: "Danfoss",
    image: productImage(SMART_TERMOSTAT.slug, "danfoss-eco-bluetooth"),
    tagline: "Behöver ingenting extra, och når dig inte heller när du är borta.",
    scores: {
      kravs: 2,
      ventil: 3.5,
      oberoende: 4.5,
      prisvarde: 4.5,
    },
    price: 428,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Danfoss-Eco-Electronic-Radiator-Thermostat/2898649",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst utan hubb, sämst på avstånd",
    pros: [
      "Kräver varken hubb, brygga eller konto, bara telefonen i samma rum",
      "428 kronor, och inga dolda tillägg",
      "Danfoss anger adaptertyp RA och M30 i sin egen butik",
      "Fem års garanti enligt tillverkaren",
      "30 dB och ett handvred för manuell justering",
    ],
    cons: [
      "Bluetooth, så den går inte att nå när du inte är hemma",
      "Ingen integration med Matter, Google, Alexa eller Home Assistant",
      "Danfoss anger upp till 30 procents besparing utan att redovisa något underlag",
    ],
    specs: [
      { label: "Pris", value: "428 kr", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value: "RA och M30, enligt Danfoss artikelbeteckning",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Ingenting, men når bara telefonen i rummet",
        highlight: true,
      },
      { label: "Protokoll", value: "Bluetooth", highlight: true },
      { label: "Matter", value: "Nej" },
      { label: "Abonnemang", value: "Nej" },
      { label: "Angiven besparing", value: "Upp till 30 %", highlight: true },
      { label: "Ljud", value: "30 dB" },
      { label: "Garanti", value: "5 år" },
      { label: "GTIN", value: "5702425245329" },
    ],
    verdict:
      "Danfoss Eco är den ärligaste produkten i jämförelsen och samtidigt den som svarar sämst mot vad ordet smart brukar utlova. Den talar Bluetooth och ingenting annat. Du styr den från telefonen när du står i rummet, du lägger scheman som körs i termostaten, och sedan är det slut. Ingen hubb, ingen brygga, inget konto och ingen molntjänst.\n\nFör en del hushåll är det precis rätt. Vill du bara att sovrummet ska vara sextonn grader mellan åtta och fyra behöver ingenting av det du inte får här. Fem års garanti, ett handvred som fungerar när batteriet dör och 30 dB i drift är dessutom sådant som märks i tio år.\n\nProblemet är resan hem. Hela argumentet för en smart termostat är att du ska kunna höja värmen från tåget, eller att den ska sänka sig själv när huset står tomt längre än planerat. Den funktionen finns inte, och den går inte att köpa till. Vi ger den därför lågt betyg på raden för vad som krävs utöver termostaten, trots att svaret är ingenting: den har inte tagit bort kostnaden utan funktionen.\n\nDanfoss anger upp till 30 procents besparing också för den här modellen, utan att redovisa vad talet vilar på. Adaptrarna framgår däremot av artikelbeteckningen i deras egen butik, RA och M30, vilket är mer än de flesta ger.\n\nKöp den till ett gästrum, en källare eller ett fritidshus där schemat sköter sig självt. Ska du styra värmen på distans är den fel produkt oavsett pris.",
  },
  {
    id: "danfoss-ally-014g2460",
    name: "Danfoss Ally Radiatortermostat (014G2460)",
    shortName: "Danfoss Ally",
    brand: "Danfoss",
    image: productImage(SMART_TERMOSTAT.slug, "danfoss-ally-014g2460"),
    tagline: "Den billigare av Danfoss två artiklar, och den passar fler ventiler.",
    scores: {
      kravs: 2.5,
      ventil: 4.5,
      oberoende: 3.5,
      provning: 3.5,
      prisvarde: 3,
    },
    price: 760,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Danfoss-ally-radiator-thermostat/2884327",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst av Danfoss två artikelnummer",
    pros: [
      "Danfoss egen artikelbeteckning anger adaptertyp RAV, RA, RAVL och M30",
      "130 kronor billigare än syskonartikeln som passar färre ventiler",
      "Labbprovad av Stiftung Warentest bland elva modeller",
      "Zigbee 3.0-certifierad, så den kan anslutas till andra hubbar än Danfoss egen",
      "Ett sekel av ventiltillverkning bakom sig, och Danfoss-ventiler sitter i svenska hus",
    ],
    cons: [
      "Kräver Danfoss Ally Gateway för fjärrstyrning, som inte ingår",
      "Warentests betyg ligger bakom betalvägg, så vi vet inte hur den klarade sig",
      "Danfoss anger 30 procent på sin egen sida och 23 i butikstexten för samma system",
    ],
    specs: [
      { label: "Pris", value: "760 kr", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value: "RAV, RA, RAVL och M30",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Danfoss Ally Gateway",
        highlight: true,
      },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Abonnemang", value: "Nej" },
      { label: "Angiven besparing", value: "Upp till 30 %", highlight: true },
      { label: "Öppet fönster", value: "Ja" },
      { label: "GTIN", value: "5702425245015" },
      { label: "Artikelnummer", value: "014G2460" },
    ],
    verdict:
      "Danfoss Ally är den termostat vi rekommenderar av Danfoss två, och skälet är ett artikelnummer. Hos Danfoss egen butik heter den här 014G2460 och bär adaptertyp RAV, RA, RAVL och M30. Syskonet 014G2420 heter bara RA och M30, kostar 130 kronor mer och passar alltså färre ventiler. Butiken saluför den dyrare under namnet Radiator Thermostat RA, vilket är precis vad du söker efter om du har en RA-ventil, och precis fel svar.\n\nDanfoss har tillverkat radiatorventiler i nästan hundra år och deras ventiler sitter i en stor del av det svenska beståndet, vilket gör passformen till märkets starkaste kort. Den är Zigbee 3.0-certifierad, så den behöver inte vara inlåst i Danfoss egen app för alltid.\n\nStiftung Warentest hade den i labbet när de provade elva radiatortermostater. Betyget ligger bakom betalvägg och vi återger det inte, så poängen på den raden krediterar enbart att den genomgått en oberoende labbprovning.\n\nDet som drar ner är gatewayen. För att nå termostaten hemifrån behövs Danfoss Ally Gateway, och den ingår inte i lösnumret. Tre rum kostar 2 280 kronor plus brygga.\n\nOch en detalj som säger något om hela kategorin: Danfoss anger upp till 30 procents besparing på sin egen sida och 23 procent i butikens produkttext för samma system. Två tal, samma tillverkare, samma produkt.\n\nKöp den om du har Danfoss-ventiler och vill ha ett märke som funnits längre än standarden. Kontrollera bara att det står 014G2460 på kartongen.",
  },
  {
    id: "netatmo-smart-radiator-thermostat",
    name: "Netatmo Smart Radiator Thermostat",
    shortName: "Netatmo",
    brand: "Netatmo",
    image: productImage(
      SMART_TERMOSTAT.slug,
      "netatmo-smart-radiator-thermostat",
    ),
    tagline: "Bäst adapterlista i branschen, och kategorins näst högsta löfte.",
    scores: {
      kravs: 2,
      ventil: 5,
      oberoende: 2.5,
      provning: 4,
      prisvarde: 3,
    },
    price: 887,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Netatmo-Additional-Smart-Radiator-Thermostat/2574967",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst dokumenterad passform",
    pros: [
      "Skiljer på sex adaptrar som ingår och fyra som säljs separat i tiopack",
      "Enda tillverkaren som beskriver hur du mäter gängan med en linjal",
      "Ljud & Bild: fungerar precis som tänkt, informativ och lättnavigerad app",
      "Ingen månadskostnad enligt Ljud & Bild",
      "Labbprovad av Stiftung Warentest",
    ],
    cons: [
      "Butikerna anger 37 procents besparing utan att Netatmo publicerar underlaget",
      "Ljud & Bild: elmotorn hörs när temperaturen justeras",
      "Ljud & Bild: två appar till samma produkt gör installationen omständlig",
      "Kräver Netatmos relä, som bara ingår i startpaketet",
    ],
    specs: [
      { label: "Pris", value: "887 kr", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value:
          "Ingår: M30x1,5, M28x1,5, M30x1, Giacomini, RA23, RAVL. Extra: M28x1, Caleffi, RAV34, Pettinaroli",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Netatmos relä",
        highlight: true,
      },
      { label: "Protokoll", value: "Radio till relä, relä via wifi", highlight: true },
      { label: "Abonnemang", value: "Nej" },
      { label: "Angiven besparing", value: "37 %, enligt butikstexten", highlight: true },
      { label: "Öppet fönster", value: "Ja" },
      { label: "GTIN", value: "3700730501958" },
    ],
    verdict:
      "Netatmo publicerar den bästa adapterdokumentationen i hela kategorin, och den ligger på ett ställe nästan ingen köpare hittar. I hjälpcentret finns två listor: sex adaptrar som följer med, bland dem Danfoss RA23 och RAVL, och fyra som säljs separat i tiopack, bland dem Danfoss RAV34 och Caleffi. Artikeln beskriver dessutom hur du mäter gängan med en vanlig linjal. Ingen annan tillverkare kommer i närheten, och ingenting av det står i butiken.\n\nSamma butik skriver däremot ut något annat: spara 37 procent av din energiförbrukning. Talet står hos både Proshop och Inet, och Netatmos egna sidor gick inte att nå för att kontrollera var det kommer ifrån. Det är kategorins näst högsta löfte och vi har inte hittat något underlag för det alls.\n\nLjud & Bild provade den i februari 2026 och var övervägande positiva. Den fungerar precis som tänkt, appen är informativ och lättnavigerad, och det finns ingen månadskostnad. Två invändningar tog de upp: elmotorn hörs när temperaturen justeras, och det finns två appar till samma produkt, vilket gör installationen omständlig. Den var också med bland Stiftung Warentests elva.\n\nDen låga poängen på oberoende beror på reläet. Termostaten talar inte wifi själv utan går via Netatmos relä, som bara ingår i startpaketet, och hela systemet vilar på Netatmos konto och molntjänst.\n\nKöp den om du har en ovanlig ventil och vill kunna slå upp exakt vilken adapter som gäller innan du beställer. Bortse från procentsatsen.",
  },
  {
    id: "schneider-wiser-cctfr6100z3",
    name: "Schneider Electric Wiser Radiatortermostat",
    shortName: "Wiser",
    brand: "Schneider Electric",
    image: productImage(SMART_TERMOSTAT.slug, "schneider-wiser-cctfr6100z3"),
    tagline: "Enda tillverkaren som anger passformen på svenska.",
    scores: {
      kravs: 2,
      ventil: 4.5,
      oberoende: 3,
      prisvarde: 3.5,
    },
    price: 499,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/LK-Wiser-Radiatortermostat-White/3111975",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst besked på svenska",
    pros: [
      "Anger passformen på svenska: Danfoss RA, RAV, RAVL och M30x1,5",
      "499 kronor, tredje billigast av dem vi rankar",
      "Zigbee, och upp till 32 enheter i 16 rum i samma system",
      "Ingen besparingsprocent utlovas någonstans",
    ],
    cons: [
      "Kräver Wiser-hubb och Wiser-appen, som inte ingår",
      "Tillverkarens egen sida anger batteriet på två sätt, 2 x AA och 3V LR03 AAA",
      "Säljs hos Proshop under märket LK, vilket gör den svår att söka fram",
      "Ingen redaktion har provat den",
    ],
    specs: [
      { label: "Pris", value: "499 kr", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value: "Danfoss RA, RAV, RAVL och M30x1,5",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Wiser-hubb",
        highlight: true,
      },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Abonnemang", value: "Nej" },
      { label: "Angiven besparing", value: "Ej angiven", highlight: true },
      { label: "Batteri", value: "Anges som 2 x AA och som 3V LR03 AAA" },
      { label: "GTIN", value: "3606482072589" },
      { label: "Artikelnummer", value: "CCTFR6100Z3" },
    ],
    verdict:
      "Schneiders Wiser-termostat är den som talar svenska. På tillverkarens svenska produktsida står det rakt av att den är kompatibel med Danfoss RA, RAV, RAVL och M30x1,5-ventiler. Det låter som en självklarhet tills man har läst de andra tio och upptäckt att uppgiften antingen saknas, ligger på engelska i ett hjälpcenter eller har ersatts av ett procenttal.\n\nDen är också en av fyra produkter här som inte utlovar någon besparing alls. I den här kategorin är tystnad en dygd, eftersom talen som finns spänner från 23 till 42 procent utan att någon som provat produkterna vill skriva under på ett enda av dem.\n\n499 kronor är lågt, och systemet skalar till 32 enheter i 16 rum. Men den kräver Wiser-hubben och Wiser-appen, och där tar öppenheten slut. Till skillnad från SONOFF, som räknar upp konkurrenternas hubbar, är den här tänkt att leva i Schneiders eget system.\n\nTvå saker att veta innan du beställer. Proshop säljer den under märket LK, medan artikelnumret 3606482072589 är Schneiders eget och leder till CCTFR6100Z3. Och tillverkarens egen sida anger batteriet på två sätt i samma text, både två AA-celler och 3V LR03 AAA. Vi återger båda i stället för att välja åt dig.\n\nKöp den om du bygger med Wiser, eller om du vill ha ett svenskt besked om ventilen till under femhundra kronor.",
  },
  {
    id: "tado-smart-radiator-thermostat-x",
    name: "tado Smart Radiator Thermostat X",
    shortName: "tado X",
    brand: "tado",
    image: productImage(
      SMART_TERMOSTAT.slug,
      "tado-smart-radiator-thermostat-x",
    ),
    tagline: "Tio adaptrar dokumenterade, och en årsavgift för det som säljer den.",
    scores: {
      kravs: 3,
      ventil: 5,
      oberoende: 2,
      provning: 3,
      prisvarde: 1.5,
    },
    price: 1229,
    merchant: KJELL,
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/tado-smart-radiator-thermostat-x-1-pack-p52260",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 9, checkedAt: PRICE_CHECKED },
    superlative: "Bäst dokumenterad, dyrast att äga",
    pros: [
      "Sex adaptrar som ingår och fyra som inte gör det, alla namngivna av tillverkaren",
      "Fungerar med tredjepartshubbar, bland dem IKEA Dirigera, HomePod och Home Assistant",
      "Uppladdningsbart batteri som byts och laddas med USB-C",
      "Ljud & Bild rekommenderar den starkt till den som inte redan har smarta termostater",
    ],
    cons: [
      "Ljud & Bild: de medföljande plastadaptrarna har lossnat så att termostater fallit av med värmen uppskruvad",
      "Ljud & Bild: de smarta funktionerna ligger numera delvis bakom årsavgiften Auto-Assist",
      "1 229 kronor styck, dyrast av dem vi rankar, plus brygga",
      "Fungerar inte tillsammans med tidigare tado-generationer",
    ],
    specs: [
      { label: "Pris", value: "1 229 kr", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value:
          "Ingår: RA, RAV, RAVL, M28x1,5, Caleffi, Giacomini. Ingår ej: Vaillant, Oventrop, Ista, Orkli",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Bridge X eller en tredjepartshubb med NAT64",
        highlight: true,
      },
      { label: "Protokoll", value: "Thread och Matter", highlight: true },
      { label: "Matter", value: "Ja" },
      {
        label: "Abonnemang",
        value: "Auto-Assist krävs för delar av automatiken",
        highlight: true,
      },
      { label: "Angiven besparing", value: "Upp till 28 %", highlight: true },
      { label: "Batteri", value: "Uppladdningsbart, laddas via USB-C" },
      { label: "Batteritid", value: "Cirka 1 år enligt tillverkaren" },
      { label: "Artikelnummer", value: "52260" },
    ],
    verdict:
      "tado är märket som syns mest i hyllan och som sitter näst sist i vår lista, och det beror varken på tekniken eller på dokumentationen.\n\nDokumentationen är faktiskt kategorins bästa. tados hjälpcenter listar sex adaptrar som följer med, bland dem Danfoss RA, RAV och RAVL, och fyra som inte gör det, bland dem Vaillant och Oventrop. De skriver också att produkten bara fungerar på termostatiska ventiler. Ingenting av det står i butikstexten, som nöjer sig med att den passar termostatventiler från en mängd olika tillverkare.\n\nTvå saker fäller den. Den första kommer från Ljud & Bilds egen testare, som använt tado i flera år: de medföljande plastadaptrarna har inte klarat trycket när termostaterna öppnat och stängt värmen, med följden att termostater fallit av och landat på golvet medan värmen stått fullt uppskruvad, ibland på natten. Hans råd är att köpa en metalladapter från en VVS-butik. Det är den mest konkreta varningen någon oberoende testare ger i hela kategorin.\n\nDen andra är avgiften. Funktionerna som får termostaterna att sköta sig själva var tidigare gratis och ligger nu delvis i den årliga tjänsten Auto-Assist. Samma testare kallar den en riktig bromskloss som luktar mer girighet än god service, och han fick inget svar från tado han var nöjd med.\n\nRäkna på totalen. 1 229 kronor per termostat, plus Bridge X för 869 om du inte redan har en hubb som duger, plus en årsavgift. Tre rum passerar 4 500 kronor innan första vintern.\n\nKöp den om du vill ha den bäst dokumenterade passformen och accepterar abonnemanget. Ljud & Bild rekommenderar den starkt till den som börjar från noll, och det står vi inte emot, men billigare vägar till samma värme finns i den här listan.",
  },
  {
    id: "danfoss-ally-ra-014g2420",
    name: "Danfoss Ally Radiatortermostat RA (014G2420)",
    shortName: "Ally RA",
    brand: "Danfoss",
    image: productImage(SMART_TERMOSTAT.slug, "danfoss-ally-ra-014g2420"),
    tagline: "Kostar 130 kronor mer än syskonet och passar färre ventiler.",
    scores: {
      kravs: 2.5,
      ventil: 3.5,
      oberoende: 3.5,
      provning: 3.5,
      prisvarde: 2,
    },
    price: 890,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Danfoss-Ally-Radiator-Thermostat-RA/2891720",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Samma termostat, sämre affär",
    pros: [
      "Samma termostat och samma system som Danfoss Ally",
      "RA-adapter och M30-adapter ingår båda",
      "Labbprovad av Stiftung Warentest bland elva modeller",
      "Zigbee 3.0-certifierad",
    ],
    cons: [
      "890 kronor mot 760 för artikeln som täcker RAV och RAVL också",
      "Namnet läses som den variant du behöver om du har en RA-ventil",
      "Kräver Danfoss Ally Gateway, som inte ingår",
    ],
    specs: [
      { label: "Pris", value: "890 kr", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value: "RA och M30",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Danfoss Ally Gateway",
        highlight: true,
      },
      { label: "Protokoll", value: "Zigbee 3.0", highlight: true },
      { label: "Abonnemang", value: "Nej" },
      { label: "Angiven besparing", value: "Upp till 30 %", highlight: true },
      { label: "GTIN", value: "5702425245008" },
      { label: "Artikelnummer", value: "014G2420" },
    ],
    verdict:
      "Den här produkten står i listan för att visa en fälla, inte för att vi tycker att du ska köpa den.\n\nDanfoss säljer Ally under två artikelnummer. Hos Danfoss egen butik heter 014G2420 adaptertyp RA och M30, medan 014G2460 heter adaptertyp RAV, RA, RAVL och M30. Hos Proshop kostar den första 890 kronor och den andra 760. Den dyrare täcker alltså två ventiltyper färre.\n\nProblemet är namnet. Butiken kallar den Danfoss Ally Radiator Thermostat RA, och den som har konstaterat att elementet bär en Danfoss RA-ventil läser det som bekräftelse på att det är just den här man ska ha. Det stämmer, i den meningen att den passar. Det stämmer inte, i den meningen att den billigare passar likadant och dessutom passar RAV och RAVL om nästa element visar sig ha en annan ventil.\n\nAllt annat är identiskt. Samma Zigbee 3.0, samma krav på Danfoss Ally Gateway, samma plats i Stiftung Warentests provning av elva modeller, samma 30 procent som Danfoss anger utan underlag.\n\nKontrollera artikelnumret på kartongen innan du betalar. Står det 014G2420 och du inte har ett specifikt skäl att välja den, lägg tillbaka den och ta 014G2460.",
  },
  {
    id: "fibaro-radiator-thermostat",
    name: "Fibaro Radiator Thermostat Starter Pack",
    shortName: "Fibaro",
    brand: "Fibaro",
    image: productImage(SMART_TERMOSTAT.slug, "fibaro-radiator-thermostat"),
    tagline: "Kategorins högsta besparingslöfte, med kategorins tunnaste grund.",
    scores: {
      kravs: 2.5,
      ventil: 1.5,
      oberoende: 4,
      prisvarde: 3,
    },
    price: 727,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Fibaro-Radiator-Thermostat-Starter-Pack/2637987",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Laddbart batteri, opublicerat löfte",
    pros: [
      "Laddbart litiumpolymerbatteri som fylls med en vanlig telefonladdare",
      "Z-Wave, alltså lokal styrning utan molnberoende",
      "Startpaketet innehåller en separat temperaturgivare",
      "Reagerar på öppet fönster och på andra värmekällor i rummet",
    ],
    cons: [
      "Anger inga ventiler alls, bara att den passar 98 procent av alla element",
      "42 procents besparing, fotnotat till tillverkarens egen opublicerade forskning",
      "Detektering av öppet fönster finns enligt tillverkaren bara i Z-Wave-versionen",
      "Kräver en Z-Wave-styrenhet eller HomeKit, som inte ingår",
    ],
    specs: [
      { label: "Pris", value: "727 kr", highlight: true },
      {
        label: "Angivna ventiler",
        shortLabel: "Ventiler",
        value: "Inga namngivna. Uppges passa 98 % av alla element",
        highlight: true,
      },
      {
        label: "Krävs utöver termostaten",
        shortLabel: "Krävs till",
        value: "Z-Wave-styrenhet eller HomeKit",
        highlight: true,
      },
      { label: "Protokoll", value: "Z-Wave eller HomeKit", highlight: true },
      { label: "Abonnemang", value: "Nej" },
      { label: "Angiven besparing", value: "Upp till 42 %", highlight: true },
      { label: "Öppet fönster", value: "Ja, men bara i Z-Wave-versionen" },
      { label: "Batteri", value: "Laddbart litiumpolymer, laddas som en telefon" },
      { label: "GTIN", value: "5902701701079" },
    ],
    verdict:
      "Fibaro utlovar mest av alla och redovisar minst. På produktsidan står rubriken kostnadsminskning på upp till 42 procent, med en liten etta efter. Längst ned på samma sida lyder fotnot ett i sin helhet: baserat på forskning utförd av Fibar Group S.A. Alltså tillverkarens egen forskning, utan publicering, utan metod och utan länk. Det är kategorins högsta tal och kategorins tunnaste underlag, och de sitter på samma sida.\n\nSamma sida byter ut ventillistan mot ett annat procenttal. Termostaten uppges fungera med 98 procent av alla elementtyper tack vare adaptrar som följer med. Vilka adaptrar det är står ingenstans, och vilka de återstående två procenten är står inte heller. Det är den enda produkten här där du inte kan kontrollera passformen alls före köp, och det är därför den hamnar sist.\n\nSynd, för hårdvaran har en riktigt bra idé. Batteriet är laddbart litiumpolymer och fylls med en vanlig telefonladdare, vilket gör slut på decennier av AA-celler. Z-Wave betyder dessutom lokal styrning utan molnberoende, och startpaketet innehåller en separat temperaturgivare som mäter rummet i stället för elementet.\n\nEn brasklapp till: funktionen som stänger värmen vid öppet fönster finns enligt tillverkaren bara i Z-Wave-versionen. Köper du HomeKit-varianten får du inte samma produkt.\n\nKöp den om du redan kör Z-Wave och är trött på batterier. Vet du inte vilken ventil du har ska du köpa något annat.",
  },
];

export const SMART_TERMOSTAT_PRODUCTS: Product[] = resolveProducts(
  SMART_TERMOSTAT,
  SEEDS,
);

/**
 * Övervägda men inte rankade.
 *
 * De fyra första är de andra sorterna som säljs under samma ord. De ligger här
 * i stället för i rankningen efter användarbeslut 2026-08-04: en IR-dosa och
 * en ventiltopp löser olika problem och går inte att väga mot varandra.
 */
export const SMART_TERMOSTAT_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "tado",
    name: "Heat Pump Optimizer X",
    reason:
      "2 999 kronor, och en helt annan sorts produkt. Den styr värmekällan i stället för ventilen på ett element, vilket är den logiskt riktigare vägen i ett svenskt hus med värmepump: struper du enskilda radiatorer sänker du inte nödvändigtvis det pumpen arbetar med. Den hör hemma i en jämförelse av framledningsstyrning tillsammans med svenska Ngenic Tune, inte i en rankning av ventiltoppar.",
    approxPrice: 2999,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/tado-heat-pump-optimizer-x-p52264",
  },
  {
    brand: "Netatmo",
    name: "AC-controller",
    reason:
      "1 299 kronor för en infraröd sändare som härmar fjärrkontrollen till en luftvärmepump. Den sitter inte på någon ventil och har ingen ventil att passa, så inget av sidans två fynd gäller den. Har du luft-luft är det den här produktkategorin du ska titta på, och den förtjänar en egen jämförelse tillsammans med Sensibo.",
    approxPrice: 1299,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/netatmo-ac-controller-fjarrstyrning-for-luftvarmepump-och-ac-p52217",
  },
  {
    brand: "Aqara",
    name: "Golvtermostat W500",
    reason:
      "769 kronor för en termostat som monteras i väggen och bryter elvärme till golvslingor. Den kräver elarbete i en dosa, till skillnad från allt vi rankar som skruvas på för hand utan risk för vattenläckage. Två olika produkter, två olika installationer, och att blanda dem i en lista hade gjort betygen obegripliga.",
    approxPrice: 769,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Aqara-Golvtermostat-W500/3390001",
  },
  {
    brand: "Bosch",
    name: "Smart Home rumstermostat II",
    reason:
      "820 kronor, och en rumstermostat och inte en radiatortermostat. Den mäter och styr rummet som helhet i stället för ett enskilt element, vilket är rätt produkt i ett hus med en zon och fel produkt om avsikten är att sänka sovrummet men inte vardagsrummet. Bosch elementtermostat var däremot med bland Stiftung Warentests elva.",
    approxPrice: 820,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Bosch-Smart-Home-rumstermostat-II/3129623",
  },
  {
    brand: "Danfoss",
    name: "Ally 5-pack startpaket",
    reason:
      "4 220 kronor för fem termostater och en gateway. Rätt köp för den som ska göra hela huset på en gång, och 844 kronor per termostat är billigare än lösnumret plus brygga. Vi rankar enstyck för att priserna ska gå att jämföra, men räknar du på tre rum eller fler ska startpaketen med i kalkylen.",
    approxPrice: 4220,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Danfoss-Ally-5-pack-startpaket/8500160",
  },
  {
    brand: "tado",
    name: "Smart Radiator Thermostat V3+",
    reason:
      "949 kronor hos Kjell, alltså 280 mindre än X-serien, och det är den generation Stiftung Warentest faktiskt provade 2023. Vi rankar den ändå inte: tado skriver själva att X-serien inte är kompatibel med tidigare produktlinjer, och att rekommendera en utgående generation till en ny köpare skapar ett återvändsgränd om två år.",
    approxPrice: 949,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/temperaturstyrning/tado-extra-termostat-till-radiator-v3-1-pack-p52121",
  },
];

/**
 * Vanliga frågor.
 *
 * ⚠️ Ingen fråga får ange en besparingsprocent som ett faktum. Talen är
 * tillverkarnas påståenden och ska alltid bära vems de är.
 */
export const SMART_TERMOSTAT_FAQ = [
  {
    question: "Vilken smart termostat är bäst 2026?",
    answer:
      "Aqara Radiator Thermostat W600 för 559 kronor hos Kjell, om du redan har en Matter- eller Zigbee-hubb hemma. Den namnger sex adaptrar direkt på produktsidan, vilket gör att du kan kontrollera att den passar ditt element innan du beställer, och Ljud & Bild lyfte fram att den arbetar helt ljudlöst när den justerar värmen. Frostskyddet är beskrivet med tal: värmen slås på under fem grader och återgår vid åtta. Har du ingen hubb tillkommer en Matter Border Router, och då blir Aqara E1 på 549 kronor eller SONOFF TRVZB på 361 rimligare utgångspunkter.",
  },
  {
    question: "Hur mycket sparar man på en smart termostat?",
    answer:
      "Ingen som har provat produkterna vill svara på den frågan. Ljud & Bild, som är den enda svenska redaktion som haft tre av dem i handen, skriver att besparingen inte avhandlas i testet eftersom det skulle kräva ett test under mycket lång tid. Stiftung Warentest provade elva modeller i labb och lägger besparingsavsnittet bakom betalvägg. Tillverkarna fyller tomrummet: Fibaro anger 42 procent, Netatmo 37, Danfoss 30, tado 28, och Aqara, Eve, SONOFF och Schneider anger ingenting alls. Fibaros tal är fotnotat till tillverkarens egen opublicerade forskning. Det ärliga svaret är att det beror på hur du värmer i dag, och att den som redan skruvar ner värmen på natten har mindre att hämta än den som aldrig gör det.",
  },
  {
    question: "Var kommer siffran 28 procent från?",
    answer:
      "Från Fraunhofer IBP-Report 579 E, publicerad 2022 och beställd av tado. Vi har läst den i original, och tre saker i den står inte i marknadsföringen. Det är en beräkning och inte en mätning i bebodda hus: rapporten säger att studien bygger på transienta beräkningar i simuleringsprogrammet TRNSYS 17. Klimatdatan är ett typår för München. Och resultatet är ett spann, 12 till 28 procent, där marknadsföringen citerar taket. Referensfallet som besparingen räknas mot är ett hem där alla radiatortermostater står på konstant 20 grader hela dagen. Hela rapporten finns inte publikt utan fås enligt sammanfattningen på begäran från uppdragsgivaren tado.",
  },
  {
    question: "Passar en smart termostat på mitt element?",
    answer:
      "Bara om elementet har en termostatventil, alltså den vred du kan skruva mellan siffror i dag. Sitter det en enkel avstängningskran eller ingenting alls fungerar ingen av produkterna här. Därefter avgör ventilens fattning. De flesta moderna ventiler har gängan M30x1,5, och svenska hus har ofta Danfoss RA, RAV eller RAVL, som kräver var sin adapter. Aqara E1 skriver dessutom ut att manuella ventiler, returtemperaturbegränsare och enrörssystem inte stöds, och enrörssystem är vanligt i flerbostadshus från 1960- och 70-talen. Skruva loss ditt nuvarande vred och läs vad som står på ventilkroppen innan du beställer. Det läcker inte vatten när du gör det.",
  },
  {
    question: "Fungerar det om jag bor i lägenhet?",
    answer:
      "Tekniskt oftast ja, ekonomiskt oftast nej. Har lägenheten vattenburna radiatorer med termostatventiler går termostaterna att montera. Men i ett flerbostadshus med fjärrvärme betalar du normalt värmen genom månadsavgiften och inte efter förbrukning, och då sänker du grannarnas kostnad snarare än din egen. Det du köper är komfort och schemaläggning, vilket kan vara värt pengarna i sig, men räkna inte med att avgiften ändras. Kontrollera också med föreningen: ventilerna tillhör ofta husets system, och en del föreningar har regler om vad som får bytas.",
  },
  {
    question: "Behöver jag en hubb till en smart termostat?",
    answer:
      "Nästan alltid, och det är kategorins dolda kostnad. Danfoss Eco är undantaget: den talar Bluetooth direkt med telefonen och behöver ingenting, men kan inte nås när du inte är hemma. Zigbee-termostater som Aqara E1, Danfoss Ally, Schneider Wiser och SONOFF behöver en Zigbee-hubb. Thread- och Matter-termostater som Aqara W600, Eve Thermo och tado X behöver en Thread Border Router, vilket många redan har i form av en HomePod, en Apple TV, en Nest-högtalare eller en IKEA Dirigera. tado listar själva vilka tredjepartshubbar som duger. Räkna alltid in hubben i priset om du inte redan har en.",
  },
  {
    question: "Vad är skillnaden mellan Danfoss Ally 014G2460 och 014G2420?",
    answer:
      "Adaptrarna, och priset går åt fel håll. Hos Danfoss egen butik heter 014G2460 adaptertyp RAV, RA, RAVL och M30, medan 014G2420 heter adaptertyp RA och M30. Hos Proshop kostar den första 760 kronor och den andra 890. Den dyrare passar alltså två ventiltyper färre. Butiken saluför 014G2420 under namnet Danfoss Ally Radiator Thermostat RA, vilket är lätt att läsa som den variant man behöver om elementet har en RA-ventil, trots att den billigare passar RA också. Kontrollera artikelnumret på kartongen.",
  },
  {
    question: "Skyddar en smart termostat mot frusna rör?",
    answer:
      "De flesta anger en frostskyddsfunktion, men den är inte lika väl belagd som produktbladen antyder. Stiftung Warentest provade elva modeller och skriver i sin fritt läsbara text att en av dem missade frostskyddstestet, och att det vid minusgrader kan leda till spruckna rör. Vilken av de elva det var ligger bakom betalvägg, och vi gissar aldrig på en sådan sak. Av de vi rankar anger Aqara W600 att värmen slås på under fem grader och återgår vid åtta, Aqara E1 löser det med en inställd lägstatemperatur, Eve kallar sin funktion Valve Protection och SONOFF skriver ut att frostskyddet ska hindra rör från att frysa och spricka. Lämnar du ett hus obebott en vinter ska du inte lita på funktionen ensam.",
  },
  {
    question: "Vad kostar det att göra tre rum?",
    answer:
      "Mellan ungefär 1 100 och 4 600 kronor, beroende på märke och på vad du redan har. Tre SONOFF TRVZB kostar 1 083 kronor plus en Zigbee-sticka. Tre Aqara E1 kostar 1 647 plus hubb. Tre Danfoss Ally kostar 2 280 plus gateway, och fempaketet på 4 220 kronor blir billigare per termostat om du ändå ska göra fler rum. Tre tado X kostar 3 687 plus Bridge X för 869 och därtill årsavgiften Auto-Assist för delar av automatiken. Skillnaden mellan billigast och dyrast är alltså större än vad många av produkterna kostar var för sig, och det är därför vi räknar per hem i stället för per termostat.",
  },
  {
    question: "Krävs abonnemang för en smart termostat?",
    answer:
      "Bara för en av dem vi rankar, och det är den dyraste. tado flyttade delar av de automatiska funktionerna till den årliga tjänsten Auto-Assist, och Ljud & Bilds testare beskriver den som den enda riktiga bromsklossen och skriver att den luktar mer girighet än god service. Övriga tio kräver ingenting. Eve går längst åt andra hållet och anger uttryckligen varken abonnemang, registrering eller molntjänst. Kontrollera ändå vad som ingår innan du köper, eftersom en avgift för fjärrstyrning i praktiken är en avgift för att termostaten ska vara smart när du inte är hemma.",
  },
  {
    question: "Är radiatortermostater rätt lösning i ett hus med värmepump?",
    answer:
      "Inte självklart, och det är en fråga ingen svensk jämförelse ställer. En radiatortermostat struper flödet till ett enskilt element. I ett hus där värmen kommer från en värmepump som styrs av en värmekurva mot utetemperaturen sänker det inte nödvändigtvis det pumpen arbetar med, och nyttan blir mindre än i det gasuppvärmda tyska radhus produkterna är utvecklade för. Vill du styra själva värmekällan är det en annan produktkategori, med tado Heat Pump Optimizer X och svenska Ngenic Tune som exempel, och de ligger bland våra övervägda. Rumsvis styrning ger fortfarande komfort, och att hålla ett sovrum svalare än vardagsrummet fungerar oavsett värmekälla.",
  },
  {
    question: "Vad menas med enrörssystem, och varför spelar det roll?",
    answer:
      "Ett enrörssystem leder vattnet genom radiatorerna i en slinga efter varandra i stället för att mata var och en parallellt. Det var vanligt i svenska flerbostadshus under 1960- och 70-talen. Struper du en enskild radiator i ett sådant system påverkar du flödet till dem som ligger efter i slingan, och därför fungerar vanliga radiatortermostater dåligt eller inte alls. Aqara är den tillverkare som skriver ut att enrörssystem inte stöds, tillsammans med manuella ventiler och returtemperaturbegränsare. Ingen annan i vår jämförelse nämner det, och ingen av de svenska sidor vi läste gör det heller. Bor du i ett hus från den perioden är det första du bör ta reda på.",
  },
];
