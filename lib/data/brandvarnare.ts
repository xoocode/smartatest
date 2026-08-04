import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { BRANDVARNARE } from "@/lib/test-pages";

/**
 * Brandvarnare. Underlag i .agent/research/brandvarnare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, artikelnummer, EAN, batteri,
 * batteritid, ljudnivå, frekvens, systemstorlek, garanti och kundbetyg. Allt
 * läst 2026-08-02 på butikens egen produktsida. Brandvarnare.se anger priset i
 * `product:price:amount`, Kjell i JSON-LD.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte tänt eld på något
 * och skriver det rakt ut på sidan.
 *
 *
 * ## Sidan rankar bara de icke-smarta
 *
 * Fristående och radiosammankopplade varnare utan app. De app- och
 * hubbanslutna hör till /smart-brandvarnare. Housegard Luma ligger här i sin
 * grundform, alltså tvåpacket som seriekopplas med radio, medan Luma smart
 * hubb som gör systemet appstyrt hör till den andra sidan.
 *
 * ## Kriteriet omdöme, och dess svaghet
 *
 * Användaren valde 2026-08-02 att räkna alla publicerade jämförelser lika.
 * Poängen speglar alltså hur många av de sju svenska jämförelserna vi läst som
 * utsett produkten till vinnare eller topplacering.
 *
 * ⚠️ Cirkularitetsrisken är verklig och står i kriteriebeskrivningen: fyra av
 * de sju är affiliatesajter utan egen provning. Brandinfo länkar via Adtraction
 * till exakt de två butiker vi själva länkar till, och rankar dessutom Google
 * Nest Protect i ett test daterat 2026 trots att Google lade ner produkten i
 * mars 2025. Källorna anges därför per produkt i `specs`, så läsaren ser vem
 * som tyckt vad.
 *
 * Stiftung Warentest, den enda källan med verklig brandprovning, testade tyska
 * märken: Ei Electronics, Abus, Busch-Jaeger, Pyrexx, Cavius och Hekatron.
 * **Ingen av produkterna nedan finns med.** Därför heter kriteriet inte
 * testomdöme.
 *
 * ## Butiksfördelning
 *
 * Fem länkar till Kjell och fem till Brandvarnare.se. Testvinnaren hamnade hos
 * Kjell, alltså inte hos den butik som tillåter betalannonsering. Housegard
 * Luma har kategorins bästa specifikation, 40 enheter per system och både paus-
 * och testfunktion bekräftad, och är dessutom utsedd till vinnare av både
 * Brandinfo och Testix. Rankningen har inte justerats för att flytta den.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "housegard-luma-2-pack",
    name: "Luma trådlös brandvarnare 2-pack",
    shortName: "Luma 2-pack",
    brand: "Housegard",
    image: productImage(BRANDVARNARE.slug, "housegard-luma-2-pack"),
    tagline: "40 enheter i samma system, med både paus och test bekräftat.",
    scores: { sammankoppling: 5, batteritid: 4.5, tydlighet: 4.5, omdome: 5, prisvarde: 3.5 },
    price: 599,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-luma-tradlos-brandvarnare-2-pack-vit-p21220",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 62, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst sammankoppling",
    pros: [
      "Upp till 40 enheter i samma system, mest av varnarna i jämförelsen",
      "868 MHz går genom väggar och bjälklag bättre än 433",
      "Både pausfunktion och testfunktion, bekräftat i specifikationen",
      "Förseglat batteri som räcker varnarens hela tioåriga livslängd",
      "Utsedd till vinnare av både Brandinfo och Testix",
    ],
    cons: [
      "300 kronor per skyddad plats, tre gånger Pebble-trepacket",
      "Appstyrning kräver Luma smart hubb för 499,90 kronor extra",
      "Finns bara hos Kjell av de butiker vi bevakar",
    ],
    specs: [
      { label: "Sammankopplas", value: "Ja, radio 868 MHz", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "40", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "2", highlight: true },
      { label: "Batteri", value: "123A, ingår", highlight: true },
      { label: "Batteritid", value: "Upp till 10 år", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Pausfunktion", value: "Ja" },
      { label: "Testfunktion", value: "Ja" },
      { label: "Detektionsprincip", value: "Optisk detektionskammare" },
      { label: "Drifttemperatur", value: "0 till 55 °C" },
      { label: "Utsedd av", value: "Brandinfo, Testix" },
      { label: "Tystningsknapp", value: "Ja, test- och pausfunktion" },
    ],
    verdict:
      "40 enheter i samma system, mer än dubbelt så många som X-Sense klarar, och 868 MHz tar sig genom bjälklag på ett sätt som 433 inte gör. Den skillnaden avgör om varnaren i källaren väcker den som sover på övervåningen.\n\nDen är också den enda där både pausfunktion och testfunktion står utskrivna i butikens specifikation. Pausknappen avgör om varnaren sitter kvar i taket eller hamnar i en låda efter tredje gången någon stekt fläsk.\n\nTvå svenska jämförelser har dessutom utsett den till vinnare, Brandinfo och Testix. Ingen av dem har eldat i ett rum för att komma dit, och Testix påstår mätningar de inte publicerar. Att båda ändå landat i samma produkt säger något.\n\nPriset är svagheten. 300 kronor per skyddad plats mot Pebble-trepackets hundra. Ska du täcka fyra platser kostar Luma 1 200 kronor. Är budgeten det som styr finns billigare vägar längre ner i listan, men ingen av dem larmar tillsammans.",
  },
  {
    id: "x-sense-xs01-w-2-pack",
    name: "XS01-W rökvarnare 2-pack",
    shortName: "XS01-W 2-pack",
    brand: "X-Sense",
    image: productImage(BRANDVARNARE.slug, "x-sense-xs01-w-2-pack"),
    tagline: "Parkopplade från fabrik, i en sluten grupp som grannens larm inte stör.",
    scores: { sammankoppling: 5, batteritid: 4.5, tydlighet: 3.5, omdome: 3.5, prisvarde: 3.5 },
    price: 646,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xs01-w-2-pack/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Enklast att komma igång med",
    pros: [
      "Parkopplade från fabrik, inget att konfigurera",
      "Sluten grupp gör att andra enheter i närheten inte utlöser din",
      "Upp till 24 enheter per grupp, går att bygga ut",
      "Tioårs inbyggt litiumbatteri och fem års garanti",
      "Bara 78 mm i diameter",
    ],
    cons: [
      "Ingen ljudnivå angiven av butiken",
      "Pausfunktion kräver fjärrkontrollen RC01-W, som säljs separat",
      "323 kronor per skyddad plats",
    ],
    specs: [
      { label: "Sammankopplas", value: "Ja, radio i sluten grupp", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "24 per grupp", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "2", highlight: true },
      { label: "Batteri", value: "Inbyggt litium", highlight: true },
      { label: "Batteritid", value: "10 år", highlight: true },
      { label: "Larmsignal", value: "Ej angiven av butiken", highlight: true },
      { label: "Pausfunktion", value: "Via tillbehör RC01-W" },
      { label: "Diameter", value: "78 mm" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "10202" },
      { label: "EAN", value: "7332211102024" },
      { label: "Utsedd av", value: "Med i Brandinfos urval" },
      { label: "Certifiering", value: "EN 14604:2005/AC:2008" },
      { label: "Mått", value: "Ø78,5 x 49 mm" },
      { label: "Detekterar", value: "Optisk rökdetektering" },
      { label: "Tystningsknapp", value: "Ja, pausfunktion" },
    ],
    verdict:
      "Den här löser sammankopplingen på ett smartare sätt än priset antyder. Enheterna är parkopplade redan i fabriken, så du skruvar upp dem och är klar. Och de sitter i en sluten grupp, vilket betyder att grannens X-Sense inte får din att tjuta när de testar sina. I ett flerbostadshus är det inte en teoretisk fråga.\n\nTjugofyra enheter per grupp räcker för vilken villa som helst, och tioårsbatteriet är förseglat så det finns ingenting att byta. Fem års garanti på köpet.\n\nButiken anger ingen ljudnivå alls, vilket är märkligt för en produkt vars enda uppgift är att höras, och vi gissar inte. Och pausfunktionen finns inte på varnaren utan i en fjärrkontroll som kostar extra. Det är faktiskt en poäng när varnaren sitter i tak man inte når, men det betyder också att du betalar mer för en funktion Housegard har inbyggd.\n\nSkillnaden mot testvinnaren är i praktiken systemstorleken och pausknappen. Är hemmet litet spelar ingetdera roll, och då är den här ett lika bra köp.",
  },
  {
    id: "deltronic-fhb160",
    name: "FHB160 rökvarnare",
    shortName: "FHB160",
    brand: "Deltronic",
    image: productImage(BRANDVARNARE.slug, "deltronic-fhb160"),
    tagline: "Höjer själv känsligheten när det blir varmt i taket.",
    scores: { sammankoppling: 1, batteritid: 4.5, tydlighet: 4.5, omdome: 2, prisvarde: 3.5 },
    price: 239,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/deltronic-fhb160/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst sensor utan sammankoppling",
    pros: [
      "TSE höjer känsligheten automatiskt när värmen i taket stiger",
      "Larmar därför även på snabba bränder i vätskor och elektronik",
      "Inbyggt tioårsbatteri och fem års garanti",
      "Stor och tydlig testknapp",
      "Pausfunktion inbyggd",
    ],
    cons: [
      "Kan inte kopplas ihop med andra varnare",
      "Ingen ljudnivå angiven av butiken",
      "Ingen av jämförelserna vi läst har rankat den",
    ],
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "1", highlight: true },
      { label: "Batteri", value: "Inbyggt", highlight: true },
      { label: "Batteritid", value: "10 år", highlight: true },
      { label: "Larmsignal", value: "Ej angiven av butiken", highlight: true },
      { label: "Pausfunktion", value: "Ja" },
      { label: "Extra", value: "TSE, termisk känslighetsförbättring" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "10160" },
      { label: "EAN", value: "7332211101607" },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Mått", value: "Ø62 x 34 mm" },
      { label: "Detekterar", value: "Optisk reflektion" },
      { label: "Tystningsknapp", value: "Ja, pausfunktion" },
    ],
    verdict:
      "En optisk rökvarnare är bra på pyrande bränder och sämre på snabba, och det är den kända svagheten med tekniken. Deltronic har byggt bort en del av den. TSE, termisk känslighetsförbättring, gör att varnaren själv skruvar upp känsligheten när temperaturen i taket stiger. Butiken skriver att den därför larmar oavsett om branden startar i elektrisk utrustning, i textilier eller i brandfarliga vätskor.\n\nDet är den enda produkten med den funktionen, och det är skälet till att den ligger så här högt trots att den inte kan kopplas ihop med någonting.\n\nTioårsbatteriet är inbyggt, garantin fem år, och testknappen är stor nog att träffa från en stege. Pausfunktionen finns inbyggd, till skillnad från X-Sense där den kostar extra.\n\nKöp den till ett hem där en enda varnare räcker, en mindre lägenhet. Ska du ha flera ska de larma tillsammans, och då är det de två översta som gäller.",
  },
  {
    id: "housegard-pebble-10",
    name: "Pebble 10 optisk brandvarnare",
    shortName: "Pebble 10",
    brand: "Housegard",
    image: productImage(BRANDVARNARE.slug, "housegard-pebble-10"),
    tagline: "Förseglat batteri, tio års livslängd, ingenting att sköta.",
    scores: { sammankoppling: 1, batteritid: 4.5, tydlighet: 4, omdome: 2.5,      /* 3,0 och inte 3,5: 249,90 kronor för en enda varnare utan
         sammankoppling är dyrare per skyddad plats än Deltronic FHB160 på
         239, som dessutom har tydligare display. Sänkt 2026-08-03. */
 prisvarde: 3 },
    price: 249.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-pebble-10-optisk-brandvarnare-p21307",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 96, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Minst underhåll",
    pros: [
      "Förseglat litiumbatteri som räcker hela tioårsperioden",
      "Enkel att pausa och testa",
      "96 kundbetyg, tredje största underlaget av de tio",
      "Finns i 95 av Kjells butiker, lätt att få tag på",
    ],
    cons: [
      "Kan inte kopplas ihop, det kan däremot Pebble Link",
      "250 kronor för en enda skyddad plats",
    ],
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "1", highlight: true },
      { label: "Batteri", value: "Förseglat litium", highlight: true },
      { label: "Batteritid", value: "10 år, hela livslängden", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Pausfunktion", value: "Ja" },
      { label: "Detektionsprincip", value: "Optisk" },
      { label: "Detekterar", value: "Optisk detektionskammare" },
      { label: "Tystningsknapp", value: "Ja, pausfunktion" },
    ],
    verdict:
      "Housegard har byggt den här kring en enda idé: du ska aldrig behöva göra någonting. Batteriet är förseglat och räcker exakt lika länge som varnaren själv får sitta uppe, tio år. När batteriet är slut är också varnaren för gammal, och du byter hela enheten. Det är en fördel: den vanligaste orsaken till en tyst brandvarnare är ett batteri någon lovade sig själv att byta.\n\nDen har 96 kundbetyg på 4,5, tredje största underlaget av varnarna, och finns i 95 av Kjells butiker. Det senare låter trivialt tills du ska ersätta en varnare en söndag.\n\nSvagheten är att den inte kan kopplas ihop med någonting. Housegard gör en modell som kan, Pebble Link, men den var slut vid kontrollen. Vill du ha sammankoppling från Housegard är Luma vägen.",
  },
  {
    id: "deltronic-x10",
    name: "X10 rökvarnare",
    shortName: "X10",
    brand: "Deltronic",
    image: productImage(BRANDVARNARE.slug, "deltronic-x10"),
    tagline: "Sitter i allmännyttans lägenheter i tiotusental. Tio års garanti.",
    scores: { sammankoppling: 1, batteritid: 5, tydlighet: 4, omdome: 2, prisvarde: 3 },
    price: 265,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/deltronic-x10/",
    priceCheckedAt: PRICE_CHECKED,
    award: "editor",
    superlative: "Redaktionens val till uthyrning",
    pros: [
      "Tio års garanti, dubbelt mot de flesta här",
      "Inbyggt damm- och insektsskydd, som ger färre falsklarm",
      "Självövervakning och automatisk uppstart vid montage",
      "Flera monteringsmöjligheter",
      "Butikens storsäljare till allmännyttan",
    ],
    cons: [
      "Kan inte kopplas ihop med andra varnare",
      "265 kronor för en plats, dyrast av de fristående",
      "Ingen av jämförelserna vi läst har rankat den",
    ],
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "1", highlight: true },
      { label: "Batteri", value: "Inbyggt", highlight: true },
      { label: "Batteritid", value: "10 år, garanterad", highlight: true },
      { label: "Larmsignal", value: "Ej angiven av butiken", highlight: true },
      { label: "Pausfunktion", value: "Ja" },
      { label: "Garanti", value: "10 år" },
      { label: "Extra", value: "Damm- och insektsskydd, självövervakning" },
      { label: "Artikelnummer", value: "10346" },
      { label: "EAN", value: "7332211103465" },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Mått", value: "Ø88 x 38 mm" },
      { label: "Detekterar", value: "Optisk reflektion" },
      { label: "Tystningsknapp", value: "Ja, pausfunktion" },
    ],
    verdict:
      "Den här ligger femma på poäng och får ändå Redaktionens val, för det finns en situation där den slår allt annat i listan.\n\nDeltronic skriver att X10 är deras storsäljare och sitter monterad i stora antal hos allmännyttan runt om i Sverige. Det säger något som ingen specifikation gör. En bostadsstiftelse som sätter upp tiotusen varnare bryr sig inte om design eller app, den bryr sig om hur många servicebesök produkten orsakar på tio år. Att X10 vunnit de upphandlingarna, och att Deltronic vågar ge tio års garanti, är ett hållbarhetsbetyg vi inte kan mäta men gärna citerar.\n\nDamm- och insektsskyddet hör ihop med samma sak. Falsklarm från damm är den vanligaste orsaken till att någon plockar ner en varnare, och en varnare i en låda skyddar ingen.\n\nÄger du en hyresfastighet, ett fritidshus du inte besöker ofta, eller vill du helt enkelt sätta upp något och glömma det i ett decennium, är det här produkten. Ska varnarna larma tillsammans är den fel val.",
  },
  {
    id: "x-sense-xs01",
    name: "XS01 rökvarnare",
    shortName: "XS01",
    brand: "X-Sense",
    image: productImage(BRANDVARNARE.slug, "x-sense-xs01"),
    tagline: "Billigast av dem med tioårsbatteri, om en ensam varnare räcker.",
    scores: { sammankoppling: 1, batteritid: 4.5, tydlighet: 3, omdome: 2.5, prisvarde: 4 },
    price: 179,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xs01/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast med tioårsbatteri",
    pros: [
      "Tioårs inbyggt litiumbatteri för 179 kronor",
      "Fem års produktgaranti",
      "Bara 78 mm i diameter, syns knappt i taket",
      "Skruv och dubbelhäftande tejp ingår",
    ],
    cons: [
      "Butikens egen text: kommunicerar inte med andra varnare",
      "Ingen pausfunktion nämnd",
      "Ingen ljudnivå angiven",
    ],
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "1", highlight: true },
      { label: "Batteri", value: "Inbyggt litium", highlight: true },
      { label: "Batteritid", value: "10 år", highlight: true },
      { label: "Larmsignal", value: "Ej angiven av butiken", highlight: true },
      { label: "Diameter", value: "78 mm" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "10200" },
      { label: "EAN", value: "7332211102000" },
      { label: "Certifiering", value: "EN 14604:2005/AC:2008" },
      { label: "Mått", value: "Ø78,5 x 49 mm" },
      { label: "Detekterar", value: "Optisk rökdetektering" },
      { label: "Tystningsknapp", value: "Ja, pausfunktion" },
    ],
    verdict:
      "179 kronor för en varnare som aldrig behöver batteribyte är den bästa grundaffären i listan. Fem års garanti, 78 millimeter i diameter, och skruv och tejp i förpackningen.\n\nButiken är samtidigt rakt på sak om begränsningen: en fristående brandvarnare kommunicerar inte med andra varnare. Köper du tre XS01 till tre våningsplan har du tre varnare som var och en larmar för sig. Den i källaren hörs inte i sovrummet, och det är hela problemet räddningstjänsterna varnar för.\n\nDen är alltså rätt köp i en etta eller tvåa där en varnare täcker hela bostaden, och fel köp i ett hus. I ett hus kostar XS01-W bara ett par hundra mer per enhet och löser saken.",
  },
  {
    id: "luxorparts-tradlos-2-pack",
    name: "Trådlös brandvarnare 2-pack",
    shortName: "Luxorparts 2-pack",
    brand: "Luxorparts",
    image: productImage(BRANDVARNARE.slug, "luxorparts-tradlos-2-pack"),
    tagline: "Flest kundbetyg av varnarna i jämförelsen, men på lägre frekvens och lösa batterier.",
    scores: { sammankoppling: 4, batteritid: 2, tydlighet: 3.5, omdome: 2, prisvarde: 2.5 },
    price: 499.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/luxorparts-tradlos-brandvarnare-2-pack-p21130",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 359, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Flest kundbetyg",
    pros: [
      "359 kundbetyg, klart störst underlag av varnarna i jämförelsen",
      "Parkoppling upp till 60 meter fri sikt",
      "Alla batterier medföljer",
    ],
    cons: [
      "433,92 MHz går sämre genom väggar än 868",
      "Utbytbara batterier, 9 V plus 3 AA per enhet",
      "250 kronor per plats för en varnare utan tioårsbatteri",
    ],
    specs: [
      { label: "Sammankopplas", value: "Ja, radio 433,92 MHz", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "Ej angivet, 60 m räckvidd", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "2", highlight: true },
      { label: "Batteri", value: "1× 9 V och 3× AA, ingår", highlight: true },
      { label: "Batteritid", value: "Ej angiven", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Mått", value: "125 × 48 mm" },
      { label: "Drifttemperatur", value: "−10 till +40 °C" },
    ],
    verdict:
      "359 kundbetyg är 50 procent fler än näst mest prövade produkt här och 15 gånger fler än testvinnaren. 4,0 i snitt över så många röster säger något som en femma från två personer inte gör. Den fungerar, och folk är nöjda.\n\nDen hålls ändå nere av två skäl. Den kör 433,92 MHz i stället för 868, och lägre frekvens tar sig sämre genom betongbjälklag, vilket är den situation sammankoppling finns för. Kjell anger sextio meter fri sikt, och fri sikt är sällan vad man har mellan källare och sovrum.\n\nOch batterierna är utbytbara: 9 V plus tre AA per enhet. Det betyder fyra batterier per varnare att hålla reda på i tio år, mot noll hos Housegard, X-Sense och Deltronic. Just den skillnaden är den vanligaste orsaken till att en brandvarnare är tyst när den behövs.\n\nVar dessutom slut vid priskontrollen.",
  },
  {
    id: "housegard-pebble-3-pack",
    name: "Pebble brandvarnare 3-pack",
    shortName: "Pebble 3-pack",
    brand: "Housegard",
    image: productImage(BRANDVARNARE.slug, "housegard-pebble-3-pack"),
    tagline: "100 kronor per skyddad plats. Ingen kommer i närheten.",
    scores: { sammankoppling: 1, batteritid: 2.5, tydlighet: 3.5, omdome: 2.5, prisvarde: 5 },
    price: 299,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-pebble-brandvarnare-3-pack-p21270",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 24, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Billigast per skyddad plats",
    pros: [
      "100 kronor per varnare, billigast av de tio varnarna",
      "Täcker tre våningsplan för under trehundra kronor",
      "Varnar när batteriet börjar ta slut",
      "Finns i 92 av Kjells butiker",
    ],
    cons: [
      "Kan inte kopplas ihop",
      "Utbytbart batteri, tre stycken att hålla reda på",
      "Butiken anger ingen batteritid",
    ],
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "3", highlight: true },
      { label: "Batteri", value: "Utbytbart", highlight: true },
      { label: "Batteritid", value: "Ej angiven av butiken", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Batterivarning", value: "Ja" },
      { label: "Testknapp", value: "Ja" },
      { label: "Certifiering", value: "EN 14604" },
      { label: "Detekterar", value: "Optisk detektionskammare" },
      { label: "Tystningsknapp", value: "Ja, pausfunktion" },
    ],
    verdict:
      "100 kronor per skyddad plats. Nästa produkt i listan kostar två och en halv gånger mer per varnare, och testvinnaren tre gånger.\n\nDet är hela argumentet, och det är starkare än det låter. Ett hem utan brandvarnare på övervåningen skyddas inte av att den varnare som finns är dyr. Har du tre våningsplan och trehundra kronor är det här rätt köp, och du kan uppgradera senare.\n\nMen läs vad du inte får. De larmar inte tillsammans, så var och en väcker bara den som är i samma rum eller precis intill. Batterierna är utbytbara och butiken anger ingen livslängd, vilket i praktiken betyder att du ska testa dem varje månad och räkna med byte inom några år.\n\nDet gör den till golvet i kategorin, inte till taket. Ett hem med tre Pebble är oändligt mycket bättre skyddat än ett hem med en dyr varnare i hallen, och sämre skyddat än ett hem med två sammankopplade.",
  },
  {
    id: "deltronic-fhb155",
    name: "FHB155 rökvarnare",
    shortName: "FHB155",
    brand: "Deltronic",
    image: productImage(BRANDVARNARE.slug, "deltronic-fhb155"),
    tagline: "Billigast av varnarna i jämförelsen, och ensam om femårsbatteri i stället för tio.",
    scores: { sammankoppling: 1, batteritid: 2, tydlighet: 3.5, omdome: 2, prisvarde: 4 },
    price: 139,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/deltronic-fhb155/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Lägsta styckepriset",
    pros: [
      "139 kronor, billigast av alla vi rankar",
      "Pausfunktion inbyggd trots priset",
      "Montagekudde från 3M ingår",
    ],
    cons: [
      "Fem års batterilivslängd mot tio hos nästan alla andra",
      "Utbytbara AAA-batterier",
      "Tre års garanti, kortast av alla tio",
      "Kan inte kopplas ihop",
    ],
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "1", highlight: true },
      { label: "Batteri", value: "2× AAA alkaliskt", highlight: true },
      { label: "Batteritid", value: "5 år", highlight: true },
      { label: "Larmsignal", value: "Ej angiven av butiken", highlight: true },
      { label: "Pausfunktion", value: "Ja" },
      { label: "Garanti", value: "3 år" },
      { label: "Artikelnummer", value: "10155" },
      { label: "EAN", value: "7332211101553" },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Mått", value: "Ø62 x 37 mm" },
      { label: "Detekterar", value: "Optisk reflektion" },
      { label: "Tystningsknapp", value: "Ja, pausfunktion" },
    ],
    verdict:
      "139 kronor, med pausfunktion, vilket är ovanligt i det prisläget. Om budgeten är absolut och alternativet är ingen varnare alls är det här ett bra köp.\n\nMen jämför den med sin egen storasyster. FHB160 kostar hundra kronor mer och ger tioårsbatteri i stället för fem, fem års garanti i stället för tre, och TSE-funktionen som höjer känsligheten vid värme. Hundra kronor utspritt över tio år är en krona i månaden.\n\nFemårsbatteriet är den verkliga invändningen. En brandvarnare får sitta uppe i tio år, vilket betyder att den här kommer kräva ett batteribyte halvvägs, och det bytet är precis vad folk glömmer. Butikens egen text säger dessutom att batteriet ska vara alkaliskt av god kvalitet, ännu ett tillfälle att göra fel.",
  },
  {
    id: "nexa-optisk-2-pack",
    name: "Optisk brandvarnare 2-pack",
    shortName: "Nexa 2-pack",
    brand: "Nexa",
    image: productImage(BRANDVARNARE.slug, "nexa-optisk-2-pack"),
    tagline: "100 kronor per varnare, och standarden står utskriven.",
    scores: { sammankoppling: 1, batteritid: 2, tydlighet: 3, omdome: 2.5,      /* 3,5 och inte 4,0: tvåpacket ger två platser för 199,90, alltså
         hundra kronor styck, men båda saknar sammankoppling och har bara
         tvåårsbatteri. Deltronic FHB155 ger en plats för 139 med samma
         begränsningar. Sänkt 2026-08-03. */
 prisvarde: 3.5 },
    price: 199.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/nexa-optisk-brandvarnare-2-pack-p21100",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 240, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Tydligast om standarden",
    pros: [
      "Hundra kronor per varnare",
      "Enda produkten där butiken skriver ut SS-EN 14604:2005",
      "Anger uttryckligen att den inte innehåller radioaktiva ämnen",
      "240 kundbetyg på 4,5, näst största underlaget av alla tio",
    ],
    cons: [
      "9 V-batteri per enhet, utbytbart",
      "Kan inte kopplas ihop",
    ],
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "2", highlight: true },
      { label: "Batteri", value: "1× 9 V per enhet, ingår", highlight: true },
      { label: "Batteritid", value: "Ej angiven", highlight: true },
      { label: "Larmsignal", value: "Ej angiven av butiken", highlight: true },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Batterivarning", value: "Ja" },
      { label: "Detekterar", value: "Optisk rökdetektering" },
    ],
    verdict:
      "Nexa är ensam om att låta butiken skriva ut vilken standard varnaren uppfyller, SS-EN 14604:2005, och ensam om att uttryckligen säga att den inte innehåller radioaktiva ämnen. Båda uppgifterna borde stå på alla tio. Att de gör det på en produkt för 100 kronor styck säger något om vem som bemödar sig.\n\nI övrigt är den enkel: optisk, varnar vid låg batterinivå, 9 V-batteri per enhet som ingår.\n\nDen ligger sist av rent mekaniska skäl. Utbytbara batterier utan angiven livslängd ger låg poäng på det kriterium som väger näst tyngst, och den kan inte kopplas ihop. Lägg till att den var slut hos Kjell vid priskontrollen, så är det svårt att rekommendera den framför Housegard Pebble trepack, som kostar detsamma per varnare och finns i nittiotvå butiker.",
  },
];

export const BRANDVARNARE_PRODUCTS: Product[] = resolveProducts(BRANDVARNARE, SEEDS);

/**
 * Underlag till jämförelsens filter. Härlett ur produkterna i stället för
 * upprepat, så en ändrad specifikation inte kan hamna i otakt med filtret.
 */
type AlarmTrait = {
  id: string;
  linked: boolean;
  sealedBattery: boolean;
  multipack: boolean;
};

const TRAITS: AlarmTrait[] = [
  { id: "housegard-luma-2-pack", linked: true, sealedBattery: true, multipack: true },
  { id: "x-sense-xs01-w-2-pack", linked: true, sealedBattery: true, multipack: true },
  { id: "deltronic-fhb160", linked: false, sealedBattery: true, multipack: false },
  { id: "housegard-pebble-10", linked: false, sealedBattery: true, multipack: false },
  { id: "deltronic-x10", linked: false, sealedBattery: true, multipack: false },
  { id: "x-sense-xs01", linked: false, sealedBattery: true, multipack: false },
  { id: "luxorparts-tradlos-2-pack", linked: true, sealedBattery: false, multipack: true },
  { id: "housegard-pebble-3-pack", linked: false, sealedBattery: false, multipack: true },
  { id: "deltronic-fhb155", linked: false, sealedBattery: false, multipack: false },
  { id: "nexa-optisk-2-pack", linked: false, sealedBattery: false, multipack: true },
];

export const BRANDVARNARE_FILTERS: ComparisonFilter[] = [
  {
    key: "sammankopplade",
    label: "Larmar tillsammans",
    ids: TRAITS.filter((t) => t.linked).map((t) => t.id),
  },
  {
    key: "fristaende",
    label: "Fristående",
    ids: TRAITS.filter((t) => !t.linked).map((t) => t.id),
  },
  {
    key: "forseglat",
    label: "Förseglat tioårsbatteri",
    ids: TRAITS.filter((t) => t.sealedBattery).map((t) => t.id),
  },
  {
    key: "flerpack",
    label: "Flera i förpackningen",
    ids: TRAITS.filter((t) => t.multipack).map((t) => t.id),
  },
];

/**
 * Övervägda men inte rankade.
 *
 * De smarta ligger här med hänvisning vidare, eftersom de har en egen sida.
 */
export const BRANDVARNARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Housegard",
    name: "Pebble Link trådlös 2-pack",
    reason:
      "Sammankopplingsbar Pebble, 868 MHz, förseglat batteri för hela tioårsperioden, 85 dB och certifierad mot EN 14604. Den hade platsat högt i rankningen, men var slut hos Kjell vid priskontrollen och 799 kronor för två gör den dyrare per plats än testvinnaren utan att ge fler enheter i systemet.",
    approxPrice: 799,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-pebble-link-tradlos-brandvarnare-2-pack-p65305",
  },
  {
    brand: "Housegard",
    name: "Luma smart hubb",
    reason:
      "Gör Luma-systemet appstyrt och kopplar upp till 40 enheter mot Smart Life. Den hör därför hemma på vår sida om smarta brandvarnare och inte här, eftersom den här sidan handlar om varnare som klarar sig utan app. Värd att känna till för den som redan köpt Luma och vill ha notiser i mobilen.",
    approxPrice: 499.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-luma-smart-hubb-p21221",
  },
  {
    brand: "X-Sense",
    name: "XS01-W 6-pack",
    reason:
      "Samma varnare som tvåpacket vi rankar, i sexpack för 1 499 kronor. Det ger 250 kronor per plats i stället för 323, den bästa affären av alla om du verkligen behöver sex. Vi rankar tvåpacket eftersom det är den storlek de flesta hem köper, men räkna om på sexpacket innan du beställer flera tvåpack.",
    approxPrice: 1499,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xs01-w-6-pack/",
  },
  {
    brand: "Google",
    name: "Nest Protect",
    reason:
      "Nedlagd. Google upphörde med tillverkningen 28 mars 2025 och hänvisar till First Alerts SC5. Proshop anger Discontinued på både batteri- och 230-voltsversionen, och Kjell har den slut. Befintliga enheter fungerar sin tioåriga livslängd ut. Vi tar upp den här eftersom svenska jämförelser fortfarande rankar den, bland annat i ett test daterat 2026.",
    approxPrice: 1724,
  },
  {
    brand: "Ei Electronics",
    name: "Ei650",
    reason:
      "Vann Stiftung Warentests provning med betyget gut (1,9), och är den enda produkt i vårt underlag som faktiskt utsatts för brandkammare. Den säljs bara inte i någon av de svenska butiker vi bevakar. Vi rankar inte det som inte går att köpa här, men det är värt att veta att den tyska testvinnaren inte finns på svenska hyllor.",
  },
  {
    brand: "Capidi",
    name: "Seriekopplad brandvarnare",
    reason:
      "Utsedd till bästa seriekopplade av Brandinfo, och en av åtta i deras jämförelse. Vi hittade den inte hos Brandvarnare.se, Kjell eller Proshop vid kontrollen, och rankar inte produkter vi inte kan länka till ett kontrollerat pris.",
  },
];

export const BRANDVARNARE_FAQ = [
  {
    question: "Vilken brandvarnare är bäst 2026?",
    answer:
      "Housegard Luma trådlös brandvarnare i tvåpack, om varnarna ska larma tillsammans. Den kopplar upp till fyrtio enheter på 868 MHz, har förseglat batteri för hela tioårsperioden och både paus- och testfunktion. Två svenska jämförelser har också utsett den till vinnare. Räcker en ensam varnare är Deltronic FHB160 för 239 kronor ett bättre köp, och har du liten budget täcker Housegard Pebble trepack tre våningsplan för 299.",
  },
  {
    question: "Hur många brandvarnare behöver man?",
    answer:
      "Minst en per våningsplan, och helst en utanför varje sovrum. Avståndet mellan varnare bör inte överstiga tio till tolv meter, och varje varnare skyddar högst sextio kvadratmeter. En vanlig villa landar därför på tre till fyra. En etta klarar sig med en, förutsatt att den hörs i sovrummet med stängd dörr.",
  },
  {
    question: "Var ska brandvarnaren sitta?",
    answer:
      "I taket, mitt i rummet eller minst femtio centimeter från väggen, eftersom varm rök stiger och samlas högst upp. Undvik kök och garage, där matos och avgaser utlöser falsklarm, och undvik fuktiga utrymmen samt närheten av fläktar, lampor och luftintag. Behöver du bevaka köket är en värmevarnare rätt produkt i stället för en rökvarnare.",
  },
  {
    question: "Vad är skillnaden mellan optisk och jonisk brandvarnare?",
    answer:
      "En optisk varnare känner rökpartiklar med en fotocell och är bäst på pyrande bränder, som är den vanligaste typen i bostäder. En jonisk mäter luftens ledningsförmåga med hjälp av ett radioaktivt ämne och är bättre på snabba flambränder. I Sverige säljs i praktiken bara optiska till privatpersoner i dag, eftersom de joniska fasas ut av miljöskäl. Alla tio varnare vi rankar är optiska.",
  },
  {
    question: "Vad betyder seriekopplad eller sammankopplad brandvarnare?",
    answer:
      "Att varnarna talar med varandra över radio, så att alla i bostaden larmar samtidigt när en av dem känner rök. Det är den viktigaste funktionen en brandvarnare kan ha, eftersom en brand som börjar i källaren annars inte hörs i ett sovrum två våningar upp. Sammankoppling kräver ingen app och inget wifi. Tre av de tio varnare vi rankar klarar det: Housegard Luma, X-Sense XS01-W och Luxorparts trådlösa tvåpack.",
  },
  {
    question: "Hur ofta ska brandvarnaren bytas?",
    answer:
      "Vart tionde år, oavsett om den fortfarande larmar när du trycker på testknappen. Sensorn åldras och blir långsammare, och det syns inte utifrån. Skriv monteringsdatumet på baksidan med en penna när du sätter upp den. Testa dessutom med testknappen minst en gång i månaden, och dammsug varnaren regelbundet för att undvika falsklarm.",
  },
  {
    question: "Vad kostar en brandvarnare?",
    answer:
      "De vi rankar kostar mellan 139 och 646 kronor, kontrollerat 2026-08-02. Räknat per skyddad plats är spannet mindre dramatiskt: Housegard Pebble trepack ger hundra kronor per varnare, medan sammankopplade tvåpack ligger på tre hundra. Det är sammankopplingen och det förseglade tioårsbatteriet du betalar för, inte själva rökdetektionen.",
  },
  {
    question: "Behöver en brandvarnare wifi?",
    answer:
      "Nej. Ingen av de tio varnare vi rankar använder wifi, och de kan ändå larma tillsammans, eftersom sammankopplingen sker på egen radio. Wifi behövs bara om du vill ha en notis i telefonen när du inte är hemma, och då är det en smart brandvarnare du är ute efter, vilket är en egen produktkategori med egna för- och nackdelar.",
  },
  {
    question: "Är brandvarnare lagkrav i Sverige?",
    answer:
      "Boverkets byggregler kräver brandvarnare i nybyggda bostäder, och ansvaret för att det finns fungerande brandvarnare i en bostad ligger enligt lagen om skydd mot olyckor på den som äger eller nyttjar den. I hyresrätt är det normalt hyresvärden som ska sätta upp dem och du som ska sköta dem. Kontrollera vad som står i ditt hyresavtal.",
  },
  {
    question: "Vilken brandvarnare passar i köket?",
    answer:
      "Ingen rökvarnare, egentligen. Matos utlöser optiska varnare, och resultatet blir falsklarm som slutar med att varnaren plockas ner. Sätt rökvarnaren utanför köket och använd en värmevarnare inne i köket om du vill ha bevakning där. En värmevarnare larmar på temperaturstegring i stället för på rök och bryr sig inte om stekpannan.",
  },
  {
    question: "Varför piper brandvarnaren när det inte brinner?",
    answer:
      "Fyra orsaker täcker nästan allt. Ett enstaka pip med några minuters mellanrum är batterivarning, och det börjar nästan alltid mitt i natten, eftersom batterispänningen sjunker när temperaturen gör det. Full siren utan brand beror oftast på matos, ånga från duschen eller damm i kammaren, vilket är skälet till att Storstockholms brandförsvar avråder från att sätta varnaren i köket, i badrummet eller nära en ventilationsöppning. Insekter i kammaren ger samma sak. Och en varnare som passerat åtta till tio år kan börja larma av sig själv, eftersom sensorn åldras. Dammsug den en gång om året, byt batteri samtidigt, och byt hela varnaren när den är tio år oavsett hur den beter sig.",
  },
  {
    question: "Vad ska jag göra när brandvarnaren larmar?",
    answer:
      "Väck alla, ta er ut, ring 112. I den ordningen, och utan att packa. Röken kommer före värmen och det är den som är farlig. Är det tjock rök i trapphuset i en lägenhet är huvudregeln den omvända: stanna kvar bakom stängd dörr och gör dig synlig i fönstret, eftersom en brandklassad lägenhetsdörr håller längre än lungorna gör i ett rökfyllt trapphus. Vet du direkt att det är matos eller ånga räcker det att vädra och trycka på pausknappen om varnaren har en. Det du inte ska göra är att ta ur batteriet för att få tyst på den, eftersom det är precis så en varnare hamnar i en byrålåda och blir kvar där.",
  },
];
