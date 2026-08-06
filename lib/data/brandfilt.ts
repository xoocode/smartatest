import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { BRANDFILT } from "@/lib/test-pages";

/**
 * Brandfilt. Underlag i .agent/research/brandvarnare.md och, för omkontrollen
 * 2026-08-02, .agent/research/brandfilt-verifiering.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, storlekar, material,
 * temperaturtålighet, vikt, artikelnummer, kundbetyg och framför allt vilken
 * version av EN 1869 varje butik anger. Allt läst 2026-08-02 på butikens egen
 * produktsida, och varje uppgift omkontrollerad samma dag.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte tänt eld på något
 * och vi har inte sett något provningsintyg.
 *
 * ## Sidans fynd: två versioner av samma standard
 *
 * Kontrollerat mot standardens egen text, se BSI:s förhandsvisning av
 * BS EN 1869:2019 i lib/sources.ts. EN 1869:1997 provade filtar mot brand i
 * matolja och innehöll ett elprov. Revisionen 2019 lade till ett obligatoriskt
 * heptanprov, alltså brand i vätska, skärpte elprovet och slog fast att filten
 * är en engångsprodukt.
 *
 * ⚠️ Sidan påstod tidigare att 1997 provade "enbart matolja, ingenting annat".
 * Det var fel: elprovet fanns redan 1997. Rättat 2026-08-02.
 *
 * Fördelningen bland de åtta filtarna:
 *
 * - **EN 1869:2019 utskrivet:** alla fem hos Brandvarnare.se, plus Biltemas 120 × 120.
 * - **Standarden nämnd utan årtal:** Kjells Luxorparts.
 * - **EN 1869:1997:** Kjells Housegard Design Edition, jämförelsens dyraste.
 * - **Nämns inte alls:** Biltemas 120 × 180, trots att deras mindre filt anger 2019.
 *
 * ## Butiksfördelning, och varför den ser skev ut
 *
 * Brandvarnare.se tar fyra av sju platser, inklusive de två översta. Det beror
 * på en enda sak: de är den enda butiken som säljer 120 × 180 provad mot 2019,
 * och de gör det för 179 till 199 kronor. Kjells 120 × 180 kostar 299,90 och är
 * provad mot 1997.
 *
 * De är också den enda annonserbara butiken i brandfamiljen, vilket inte
 * påverkat rankningen. Hade Kjells filt varit provad mot 2019 hade den vunnit
 * på storlek och kundbetyg.
 *
 * Sedan omkontrollen står det här också på sidan, i avsnittet "Vem har
 * kontrollerat det här?". Det duger inte att bara redovisa det i en fil som
 * läsaren aldrig ser: fyra av filtarna är butikens egna omärkta varor och de
 * tar plats 1, 2, 4 och 5.
 *
 * ## 2026-08-06: kriteriet betygsatte butikstexten, inte filten
 *
 * `certifiering` hette Dokumenterad certifiering, vägde 35 och betygsatte
 * uttryckligen "vad köparen kan kontrollera före köp". Tre fel föll ut av det,
 * och alla tre är rättade här. Se lib/corrections.ts och
 * .agent/research/brandfilt.md.
 *
 * 1. **Skalan belönade okunskap.** En filt med utskrivet 1997 fick 1,5 medan en
 *    där årtalet saknades fick 2,5. Det vi inte visste rankades alltså över det
 *    vi visste. Skalan mäter nu provningsregimen: 5,0 för 2019, 3,0 när matolja
 *    och elprov är fastställda men heptanprovet inte är det.
 * 2. **Ett researchgap drog ner ett betyg.** Biltemas 120 × 180 fick 1,0 för att
 *    Biltema inte skriver ut någon standard. Att vi inte hittat uppgiften är
 *    inget filten gör. Den är flyttad till de övervägda, eftersom den inte går
 *    att placera på sidans tyngsta kriterium alls.
 * 3. **Vikten vilade på fel skäl.** 35 motiverades med att uppgiften "saknas i
 *    varje annan svensk jämförelse", alltså med vad som skiljer oss från andra
 *    sajter och inte med vad köparen förlorar. Provning och storlek väger nu
 *    30 vardera.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "brandfilt-120x180-hard-box",
    name: "Brandfilt 120 × 180 silikon, hård box",
    shortName: "120×180 hård box",
    brand: "Brandvarnare.se",
    image: productImage(BRANDFILT.slug, "brandfilt-120x180-hard-box"),
    tagline: "Stor nog att svepa om en vuxen, och öppnas med ett grepp.",
    scores: { certifiering: 5, storlek: 5, atkomst: 4.5, material: 4, prisvarde: 4.5 },
    price: 199,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandfilt-120x180-silikon-hard-box/",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst som hemmets enda filt",
    pros: [
      "Provad mot SS-EN 1869:2019, alltså även mot brand i vätska och inte bara i matolja",
      "120 × 180 cm, storleken räddningstjänsterna rekommenderar",
      "Hård box med lock som åker upp med ett grepp",
      "100 kronor billigare än den andra 120 × 180 i jämförelsen",
    ],
    cons: [
      "20 kronor dyrare än samma filt i mjuk påse",
      "Boxen är otymplig i ett fullt köksskåp, där påsen får plats",
    ],
    specs: [
      { label: "Certifiering", value: "SS-EN 1869:2019", highlight: true },
      { label: "Provad mot brand i vätska", value: "Ja", highlight: true },
      { label: "Storlek", value: "120 × 180 cm", highlight: true },
      { label: "Förpackning", value: "Hård box", highlight: true },
      { label: "Material", value: "Silikonbehandlad glasfiber", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
      { label: "Engångsprodukt", value: "Ja, enligt EN 1869:2019" },
    ],
    verdict:
      "**Den enda filten i jämförelsen som är stor nog att svepa om en vuxen, provad mot brinnande vätska och öppnas med ett grepp.** 199 kronor.\n\nStorleken är 120 × 180 centimeter. En filt på 120 × 120 räcker över en kastrull men når inte runt en soffa, en gardin eller en människa vars kläder brinner, och det är den situationen man skaffar en brandfilt för att klara. Provningen är SS-EN 1869:2019, som kräver att filten kvävt brand i vätska och inte bara i matolja: en brinnande fritös och en brinnande stekpanna är två skilda prov. Locket på boxen åker upp med ett grepp, medan en mjuk påse ska dras isär åt två håll av händer som skakar.\n\nDen kostar 20 kronor mer än exakt samma filt i påse, och boxen tar plats. Har du ett fullt köksskåp är det påsen som får rum där.\n\nSka huset ha en enda brandfilt är det den här. 199 kronor för rätt storlek, rätt provning och den snabbaste förpackningen ligger 100 kronor under vad Kjell tar för en 120 × 180 som bara är provad mot matolja och el.",
  },
  {
    id: "brandfilt-120x180-mjuk-pase",
    name: "Brandfilt 120 × 180 silikon, mjuk påse",
    shortName: "120×180 mjuk påse",
    brand: "Brandvarnare.se",
    image: productImage(BRANDFILT.slug, "brandfilt-120x180-mjuk-pase"),
    tagline: "Rätt storlek och rätt provning för 179 kronor, i en påse som får plats i skåpet.",
    scores: { certifiering: 5, storlek: 5, atkomst: 3.5, material: 4, prisvarde: 5 },
    price: 179,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandfilt120x180mjuk_silikon-mjuk-pase/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast i rätt storlek",
    pros: [
      "120 × 180 cm provad mot SS-EN 1869:2019 för 179 kronor, billigast i jämförelsen",
      "Påsen går att hänga innanför en skåpdörr där en box inte får rum",
      "Silikonbehandlad väv, tätare mot genomträngning",
    ],
    cons: [
      "Två flikar att dra isär åt varsitt håll, vilket kostar en sekund mot boxens lock",
      "Vill du ha den snabbaste förpackningen kostar samma filt i hård box 20 kronor mer",
    ],
    specs: [
      { label: "Certifiering", value: "SS-EN 1869:2019", highlight: true },
      { label: "Provad mot brand i vätska", value: "Ja", highlight: true },
      { label: "Storlek", value: "120 × 180 cm", highlight: true },
      { label: "Förpackning", value: "Mjuk påse", highlight: true },
      { label: "Material", value: "Silikonbehandlad glasfiber", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
      { label: "Engångsprodukt", value: "Ja, enligt EN 1869:2019" },
    ],
    verdict:
      "**Samma filt som testvinnaren, i mjuk påse, för 179 kronor.** Det är den billigaste vägen till 120 × 180 provad mot 2019.\n\nAllt som avgör är identiskt: 120 × 180 centimeter, SS-EN 1869:2019, silikonbehandlad glasfiberväv. Påsen är dessutom platt och går att hänga innanför en skåpdörr där boxen inte får rum, så bor du trångt är den lättare att placera nära spisen, vilket är där filten gör nytta.\n\nDe 20 kronorna du sparar kostar en sekund. Påsen har två flikar du ska dra isär åt varsitt håll, och det görs med händer som skakar.\n\nBor du i en liten lägenhet och vill ha filten inom räckhåll för köket är den här rätt. Har du väggen ledig tar du boxen och betalar de 20 kronorna för lockets grepp.",
  },
  {
    id: "biltema-brandfilt-120x120",
    name: "Brandfilt 120 × 120 cm",
    shortName: "Biltema 120×120",
    brand: "Biltema",
    image: productImage(BRANDFILT.slug, "biltema-brandfilt-120x120"),
    tagline: "99,90 kronor, provad mot 2019 och hängs på väggen bredvid spisen.",
    scores: { certifiering: 5, storlek: 2.5, atkomst: 4.5, material: 4.5, prisvarde: 5 },
    price: 99.9,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandfiltar/brandfilt-120-x-120-cm-2000066301",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Bäst andra filt till köket",
    pros: [
      "99,90 kronor, billigast av filtarna i jämförelsen",
      "Provad mot EN 1869:2019, samma provning som de dubbelt så dyra",
      "Förpackningen hängs på väggen och filten dras ut med ett handgrepp",
      "Asbestfri silikonbehandlad väv, 800 g",
    ],
    cons: [
      "120 × 120 cm räcker över en kastrull men inte runt en soffa eller en människa",
      "Ska den vara husets enda filt behöver du 120 × 180 i stället",
    ],
    specs: [
      { label: "Certifiering", value: "EN 1869:2019", highlight: true },
      { label: "Provad mot brand i vätska", value: "Ja", highlight: true },
      { label: "Storlek", value: "120 × 120 cm", highlight: true },
      { label: "Förpackning", value: "Vägghängd, dras ut", highlight: true },
      { label: "Material", value: "Silikonbehandlad glasfiberväv, asbestfri", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
      { label: "Vikt", value: "800 g" },
      { label: "Artikelnummer", value: "21-389" },
    ],
    verdict:
      "**99,90 kronor för en filt provad mot samma version av standarden som de dubbelt så dyra.** Förpackningen hängs på väggen och filten dras ut med ett handgrepp.\n\nProvningen är EN 1869:2019, alltså matolja, brand i vätska och elprov. Väven är asbestfri silikonbehandlad glasfiber och väger 800 gram, så den går att hålla utsträckt framför sig med raka armar på väg fram mot spisen. Och det finns ingen box att öppna: du drar, och filten följer med ut ur hållaren på väggen.\n\nStorleken är invändningen. 120 × 120 räcker gott till en kastrull eller en stekpanna, det vanligaste tillbudet i ett svenskt kök, men den når inte runt en soffa, en gardin eller en vuxen som brinner.\n\nKöp den till köket och en 120 × 180 till hallen. Tillsammans kostar de 279 kronor, mindre än Housegards filt kostar ensam. Ska hemmet bara ha en enda filt ska det inte vara den här.",
  },
  {
    id: "brandfilt-120x120-hard-silikon",
    name: "Brandfilt 120 × 120 silikon, hård box",
    shortName: "120×120 hård box",
    brand: "Brandvarnare.se",
    image: productImage(BRANDFILT.slug, "brandfilt-120x120-hard-silikon"),
    tagline: "Hård box i det lilla formatet, för filten som ska sitta i köksskåpet.",
    scores: { certifiering: 5, storlek: 2.5, atkomst: 4.5, material: 4, prisvarde: 4.5 },
    price: 147,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandfilt-120x120-hard-silikon/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Snabbast av de små",
    pros: [
      "Provad mot SS-EN 1869:2019",
      "Hård box med lock, snabbast att öppna av filtarna i det lilla formatet",
      "Silikonbehandlad väv, tätare mot genomträngning än en obehandlad",
    ],
    cons: [
      "120 × 120 cm räcker till en kastrull, inte runt en människa",
      "50 kronor dyrare än Biltemas 120 × 120, som är provad mot samma version",
    ],
    specs: [
      { label: "Certifiering", value: "SS-EN 1869:2019", highlight: true },
      { label: "Provad mot brand i vätska", value: "Ja", highlight: true },
      { label: "Storlek", value: "120 × 120 cm", highlight: true },
      { label: "Förpackning", value: "Hård box", highlight: true },
      { label: "Material", value: "Silikonbehandlad glasfiber", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
    ],
    verdict:
      "**Den snabbaste av filtarna i det lilla formatet:** hård box med lock, provad mot SS-EN 1869:2019, silikonbehandlad väv. 147 kronor.\n\nBoxen är hela argumentet mot syskonet i påse. Locket åker upp med ett grepp medan påsen ska dras isär åt två håll, och silikonet gör väven tätare mot genomträngning, vilket är skillnaden mellan att lägga på filten och att lägga på den ordentligt.\n\nPrislappen bredvid är problemet. Biltema säljer 120 × 120 provad mot samma version och samma 500 grader för 99,90, alltså 47 kronor mindre, och den hängs dessutom på väggen i stället för att ligga i ett skåp.\n\nHandlar du ändå hos Brandvarnare.se, för att du köper brandvarnare i samma order, är den ett bra val. Köper du filten för sig går du till Biltema.",
  },
  {
    id: "brandfilt-120x120-mjuk-pase",
    name: "Brandfilt 120 × 120, mjuk påse",
    shortName: "120×120 mjuk påse",
    brand: "Brandvarnare.se",
    image: productImage(BRANDFILT.slug, "brandfilt-120x120-mjuk-pase"),
    tagline: "Plattast av allihop, för filten som ska ligga i en full kökslåda.",
    scores: { certifiering: 5, storlek: 2.5, atkomst: 3.5, material: 3.5, prisvarde: 5 },
    price: 118,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandfilt120x120mjuk/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Enklast att stoppa undan",
    pros: [
      "Provad mot SS-EN 1869:2019 för 118 kronor",
      "Mjuk påse utan box tar minimal plats i ett fullt skåp",
    ],
    cons: [
      "120 × 120 cm räcker till en kastrull, inte runt en människa",
      "Två flikar att dra isär, långsammare än ett lock",
      "Obehandlad väv, alltså mindre tät än butikens silikonbehandlade filtar",
    ],
    specs: [
      { label: "Certifiering", value: "SS-EN 1869:2019", highlight: true },
      { label: "Provad mot brand i vätska", value: "Ja", highlight: true },
      { label: "Storlek", value: "120 × 120 cm", highlight: true },
      { label: "Förpackning", value: "Mjuk påse", highlight: true },
      { label: "Material", value: "Glasfiber utan silikonbehandling", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
    ],
    verdict:
      "**Butikens instegsmodell:** 120 × 120 provad mot SS-EN 1869:2019, i mjuk påse utan box, för 118 kronor.\n\nDen är den plattaste förpackningen i jämförelsen, och det är dess argument. En påse utan hårt fodral går ner i en full kökslåda eller innanför en skåpdörr där ingenting annat får plats, och en filt som ryms nära spisen är en filt du hinner hämta.\n\nVäven är obehandlad, till skillnad från butikens dyrare filtar. Silikonet gör väven tätare mot genomträngning, och det är den skillnad du betalar 29 kronor för en trappa upp i sortimentet.\n\nHar du en trång kökslåda och vet att filten bara ska klara en stekpanna gör den jobbet. Har du 61 kronor till över ska du ta 120 × 180 i påse i samma butik, eftersom storleken avgör mer än väven.",
  },
  {
    /* Provningen är läst ur Biltemas egen förpackningsbild, 21-349_xxl_1.jpg på
       productimages.biltema.com, hämtad 2026-08-06: "MODEL: 21-349 · 1,2 x 1,8 M
       · STANDARD: EN 1869 : 199…". Sista siffran viker runt påsens kant, och
       1997 är EN 1869:s enda utgåva på 199x. Biltemas specifikationsblock har
       ingen certifieringsrad, vilket sidan tidigare läste som att filten saknade
       standard. Den läsningen var fel. Se .agent/research/brandfilt.md. */
    id: "biltema-brandfilt-120x180",
    name: "Brandfilt 120 × 180 cm",
    shortName: "Biltema 120×180",
    brand: "Biltema",
    image: productImage(BRANDFILT.slug, "biltema-brandfilt-120x180"),
    tagline: "Hängs på hallväggen och dras ut med ett handgrepp, i rätt storlek.",
    scores: { certifiering: 3, storlek: 5, atkomst: 4.5, material: 4.5, prisvarde: 3 },
    price: 269,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandfiltar/brandfilt-120-x-180-cm-2000042777",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för hallväggen",
    pros: [
      "120 × 180 cm, storleken räddningstjänsterna rekommenderar",
      "550 °C, högsta temperaturtåligheten av filtarna i jämförelsen",
      "Förpackningen hängs på väggen och filten dras ut med ett handgrepp",
      "Asbestfri silikonbehandlad glasfiberväv",
    ],
    cons: [
      "Provad mot EN 1869:1997, alltså inte mot brand i vätska",
      "90 kronor dyrare än en 120 × 180 provad mot 2019",
    ],
    specs: [
      { label: "Certifiering", value: "EN 1869:1997", highlight: true },
      { label: "Provad mot brand i vätska", value: "Nej", highlight: true },
      { label: "Storlek", value: "120 × 180 cm", highlight: true },
      { label: "Förpackning", value: "Vägghängd, dras ut", highlight: true },
      { label: "Material", value: "Silikonbehandlad glasfiberväv, asbestfri", highlight: true },
      { label: "Temperatur", value: "550 °C", highlight: true },
      { label: "Vikt", value: "1 kg" },
      { label: "Artikelnummer", value: "21-349" },
    ],
    verdict:
      "**120 × 180 centimeter som hängs på väggen och dras ut med ett handgrepp**, för 269 kronor.\n\nStorleken är den räddningstjänsterna rekommenderar, alltså stor nog att svepa om en vuxen vars kläder brinner. Förpackningen har ingen box och inga flikar: den skruvas upp på väggen och du drar i handtagen, vilket är det snabbaste greppet av förpackningstyperna här. Väven är asbestfri silikonbehandlad glasfiber och tål 550 grader, 50 mer än någon annan filt i jämförelsen.\n\nProvningen är EN 1869:1997, versionen som drogs tillbaka 2020. Den innebär brand i matolja och ett elprov, men inte heptanprovet, så filten är inte provad mot brand i vätska. Det är skillnaden mot de två 120 × 180 som ligger över den i listan.\n\nVill du ha rätt storlek hängande synligt på hallväggen gör den jobbet. Ska filten också vara provad mot brinnande vätska betalar du 90 kronor mindre för 120 × 180 i mjuk påse hos Brandvarnare.se och får 2019 års provning på köpet.",
  },
  {
    /* Årtalet är läst ur Kjells egen produktbild 215367_21114_2.jpg, hämtad
       2026-08-06: påsen bär "Model: 21114 · Standard: EN 1869:1997". Kjells
       specifikationsblock skriver bara "EN1869" utan årtal, och sidan angav
       därför tidigare att versionen var okänd. Den fanns på förpackningen hela
       tiden. Kundbetygen är 306 på samma sida, inte 307. */
    id: "luxorparts-brandfilt-120x120",
    name: "Brandfilt 120 × 120 cm röd",
    shortName: "Luxorparts",
    brand: "Luxorparts",
    image: productImage(BRANDFILT.slug, "luxorparts-brandfilt-120x120"),
    tagline: "306 kundbetyg på 4,5, och tät nog att stå emot gasgenomträngning.",
    scores: { certifiering: 3, storlek: 2.5, atkomst: 3.5, material: 4, prisvarde: 2.5 },
    price: 199.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandfiltar/luxorparts-brandfilt-120x120-cm-rod-p21114",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 306, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Flest kundbetyg",
    pros: [
      "306 kundbetyg på 4,5, klart störst underlag av filtarna i jämförelsen",
      "Tät nog att stå emot gasgenomträngning, vilket ingen annan filt här uppger",
      "Röd påse med öljett, synlig på väggen och lätt att hitta",
    ],
    cons: [
      "Provad mot EN 1869:1997, alltså inte mot brand i vätska",
      "199,90 kronor för 120 × 120, dubbelt mot Biltemas i samma storlek",
    ],
    specs: [
      { label: "Certifiering", value: "EN 1869:1997", highlight: true },
      { label: "Provad mot brand i vätska", value: "Nej", highlight: true },
      { label: "Storlek", value: "120 × 120 cm", highlight: true },
      { label: "Förpackning", value: "Påse", highlight: true },
      { label: "Material", value: "Glasfiber", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
      { label: "Vikt", value: "1 100 g" },
      { label: "Gastäthet", value: "Tät mot gasgenomträngning" },
    ],
    verdict:
      "**306 kundbetyg på 4,5 är mer underlag än alla de andra filtarna tillsammans.** 120 × 120 centimeter för 199,90 kronor.\n\nDet stora antalet betyg är dess egentliga argument: folk köper den, hittar den i butiken och blir nöjda. Den är dessutom tät nog att stå emot gasgenomträngning, en egenskap ingen av de andra filtarna uppger, och det är just tätheten som avgör om en filt kväver en brand eller bara lägger sig över den. Den röda påsen har en öljett och syns på en vägg.\n\nProvningen är EN 1869:1997, alltså matolja och elprov men inte heptanprovet. Filten är inte provad mot brand i vätska, och 1997 års version drogs tillbaka 2020.\n\nPriset är det som fäller den. 199,90 för 120 × 120 när Biltema säljer samma storlek, provad mot den nyare versionen, för 99,90. Vill du hämta en filt i en butik i dag och struntar i årtalet duger den. Alla andra får mer för pengarna någon annanstans.",
  },
  {
    id: "housegard-design-edition-120x180",
    name: "Brandfilt Design Edition 120 × 180 cm svart",
    shortName: "Housegard DE",
    brand: "Housegard",
    image: productImage(BRANDFILT.slug, "housegard-design-edition-120x180"),
    tagline: "Designad för att få hänga synligt, i storleken som räcker runt en vuxen.",
    scores: { certifiering: 3, storlek: 5, atkomst: 3.5, material: 3.5, prisvarde: 1.5 },
    price: 299.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandfiltar/housegard-brandfilt-design-edition-120x180-cm-svart-p21044",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 13, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Den du vågar ha framme",
    pros: [
      "120 × 180 cm, storleken räddningstjänsterna rekommenderar",
      "Designad för att få hänga synligt, så den hittas på tre sekunder",
      "Finns i svart och vit till samma pris",
    ],
    cons: [
      "Provad mot EN 1869:1997, alltså inte mot brand i vätska",
      "Dyrast av filtarna i jämförelsen, 120 kronor över en 120 × 180 provad mot 2019",
    ],
    specs: [
      { label: "Certifiering", value: "EN 1869:1997", highlight: true },
      { label: "Provad mot brand i vätska", value: "Nej", highlight: true },
      { label: "Storlek", value: "120 × 180 cm", highlight: true },
      { label: "Förpackning", value: "Designpåse", highlight: true },
      { label: "Material", value: "Glasfiber", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
      { label: "Färg", value: "Svart, finns även vit" },
    ],
    verdict:
      "**Den enda filten i jämförelsen som är gjord för att synas.** 120 × 180 centimeter i svart designpåse, 299,90 kronor.\n\nDesignen är ett brandskyddsargument och inte fåfänga. En filt du vågar hänga framme i köket hittar du på tre sekunder, medan en du stoppat undan längst in i en byrålåda tar trettio, och de sekunderna är hela skillnaden mellan en kastrullbrand och en köksbrand. Storleken är 120 × 180, alltså stor nog att svepa om en vuxen. Den finns i svart och i vitt till samma pris, så den går att sätta upp i ett kök där en röd påse hade skurit i ögonen.\n\nProvningen är EN 1869:1997, versionen som drogs tillbaka 2020. Den innebär brand i matolja och ett elprov men inte heptanprovet, så filten är inte provad mot brand i vätska.\n\nDet gör priset svårt: 299,90 kronor är 120 kronor mer än en 120 × 180 som är provad mot 2019. Vill du ha en filt som får sitta framme i ett kök du är stolt över är den värd pengarna, och det är ett hederligt skäl. Vill du ha den bästa provningen för minst pengar tar du den mjuka påsen för 179.",
  },
];

export const BRANDFILT_PRODUCTS: Product[] = resolveProducts(BRANDFILT, SEEDS);

/** Underlag till filtret, härlett ur specifikationerna ovan. */
type BlanketTrait = {
  id: string;
  cm: number;
  standard2019: boolean;
  hardCase: boolean;
};

const TRAITS: BlanketTrait[] = [
  { id: "brandfilt-120x180-hard-box", cm: 180, standard2019: true, hardCase: true },
  { id: "brandfilt-120x180-mjuk-pase", cm: 180, standard2019: true, hardCase: false },
  { id: "biltema-brandfilt-120x120", cm: 120, standard2019: true, hardCase: false },
  { id: "brandfilt-120x120-hard-silikon", cm: 120, standard2019: true, hardCase: true },
  { id: "brandfilt-120x120-mjuk-pase", cm: 120, standard2019: true, hardCase: false },
  /* De tre nedan är provade mot EN 1869:1997. Ingen av filtarna har längre en
     okänd version: årtalet för Biltemas 120 × 180 och för Luxorparts stod på
     respektive förpackning, se kommentarerna vid produkterna. */
  { id: "biltema-brandfilt-120x180", cm: 180, standard2019: false, hardCase: false },
  { id: "luxorparts-brandfilt-120x120", cm: 120, standard2019: false, hardCase: false },
  { id: "housegard-design-edition-120x180", cm: 180, standard2019: false, hardCase: false },
];

export const BRANDFILT_FILTERS: ComparisonFilter[] = [
  {
    key: "storre",
    label: "120 × 180, rekommenderad",
    ids: TRAITS.filter((t) => t.cm === 180).map((t) => t.id),
  },
  {
    key: "mindre",
    label: "120 × 120, för köket",
    ids: TRAITS.filter((t) => t.cm === 120).map((t) => t.id),
  },
  {
    key: "standard2019",
    label: "Provad mot EN 1869:2019",
    ids: TRAITS.filter((t) => t.standard2019).map((t) => t.id),
  },
  {
    key: "hardbox",
    label: "Hård box",
    ids: TRAITS.filter((t) => t.hardCase).map((t) => t.id),
  },
];

/** Övervägda men inte rankade. */
export const BRANDFILT_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Housegard",
    name: "Brandfilt Design Edition 120 × 180 cm vit",
    reason:
      "Identisk med den svarta vi rankar: samma pris 299,90 kronor, samma storlek, samma certifiering mot EN 1869:1997 och samma kundbetyg, eftersom Kjell delar betygen mellan färgvarianterna. Vi rankar bara den ena för att inte fylla listan med samma produkt två gånger. Var också slut vid kontrollen.",
    approxPrice: 299.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandfiltar/housegard-brandfilt-design-edition-120x180-cm-vit-p21045",
  },
  {
    brand: "Brandvarnare.se",
    name: "Brandfilt 120 × 120 silikon, mjuk påse",
    reason:
      "Mellanvarianten i butikens 120 × 120-serie, 129 kronor mot 118 för den utan silikonbehandling och 147 för hård box. Vi rankar de två ytterligheterna eftersom skillnaden mellan dem är begriplig, medan elva kronor för silikonbehandling i mjuk påse är en gradskillnad som inte förändrar något köpbeslut.",
    approxPrice: 129,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandfilt-120x120-mjuk-silikon/",
  },
  {
    brand: "Housegard",
    name: "Safety Box för brandsäkerhet",
    reason:
      "Kjells paket med brandfilt, brandvarnare och pulversläckare för 1 099 kronor. Det är ett brandskyddspaket och inte en brandfilt, och vi jämför inte ett paket mot en enskild produkt. Var dessutom slut vid kontrollen. Paketformatet mätte vi separat och det bär bara omkring 200 sökningar i månaden, så det får ingen egen sida.",
    approxPrice: 1099,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-safety-box-for-brandsakerhet-p21311",
  },
  {
    brand: "Diverse",
    name: "Brandfiltar utan angiven standard",
    reason:
      "Det säljs brandfiltar på marknadsplatser och i lågprishandeln som inte anger någon standard alls, ofta utan namngiven tillverkare och utan svensk återförsäljare att fråga. Dem tar vi inte in, eftersom det inte går att säga vad de är provade mot. Samtliga filtar vi rankar bär ett årtal, antingen i butikens specifikation eller tryckt på förpackningen.",
  },
];

export const BRANDFILT_FAQ = [
  {
    question: "Finns det något oberoende test av brandfiltar?",
    answer:
      "Nej. Vi har letat hos Råd & Rön, Testfakta och de nordiska testredaktionerna och hittar inget test av kategorin. De svenska sidor som säger sig ha testat brandfiltar redovisar varken metod, mätvärden eller testdatum, och en av dem daterar sin artikel i framtiden. Vår jämförelse är inte ett laboratorietest heller. Den läser standarden i original och jämför filtarna på vad de är provade mot, hur stora de är och hur snabbt de går att få ut ur förpackningen.",
  },
  {
    question: "Vilken storlek på brandfilt ska man ha?",
    answer:
      "120 × 180 centimeter. Standarden EN 1869:2019 säger själv att filtar som är tillräckligt stora anses lämpliga för att kväva elden på en person vars kläder brinner, men den anger ingen centimetersiffra. Den kommer från räddningstjänsterna. Skälet är att filten ska kunna täcka mer än en kastrull: en brinnande soffa, en gardin eller en människa. En filt på 120 × 120 räcker till stekpannan och är ett bra komplement i köket, men den bör inte vara husets enda.",
  },
  {
    question: "Vilken brandfilt är bäst 2026?",
    answer:
      "Brandvarnare.se:s 120 × 180 i hård box för 199 kronor. Den är den enda filten som är rätt på alla tre punkter som spelar roll: rekommenderad storlek, provning mot EN 1869:2019 och en hård box som öppnas med ett grepp. Vill du spara 20 kronor finns samma filt i mjuk påse.",
  },
  {
    question: "Vad kostar en brandfilt?",
    answer:
      "De vi jämför kostar mellan 99,90 och 299,90 kronor, kontrollerat 2026-08-02. En 120 × 120 provad mot 2019 går att få för 99,90, och en 120 × 180 med samma provning för 179. Den dyraste filten är provad mot den äldre versionen av standarden.",
  },
  {
    question: "Brandfilt eller brandsläckare?",
    answer:
      "Båda, och de löser olika saker. Filten kväver en brand i en kastrull, i textil eller på en människa, och den lämnar ingen sanering efter sig. Släckaren klarar större bränder och brinnande vätska i mängd. Räddningstjänsterna rekommenderar att ett hem har både en 6-kilos pulversläckare och en brandfilt.",
  },
  {
    question: "Håller en brandfilt för alltid?",
    answer:
      "Nej, men den har lång livslängd så länge den ligger orörd och torrt i sin förpackning. Kontrollera med jämna mellanrum att förpackningen är hel och att filten går att dra ut. Har du använt filten en gång ska den kasseras enligt EN 1869:2019, oavsett hur den ser ut.",
  },
  {
    question: "Kan man använda en brandfilt på en person som brinner?",
    answer:
      "Ja, och det är en av de få situationerna där den är oersättlig. Få personen ner på golvet först, eftersom lågor stiger och en stående människa får elden i ansiktet. Lägg filten över från halsen och nedåt, tryck till så att syret stängs ute och rulla personen om det behövs. Släpp inte upp filten för tidigt. Har du ingen brandfilt går en vanlig filt bra, men Storstockholms brandförsvar varnar för fleece, som i sig är brandfarligt. Kyl brännskadan med svalt vatten efteråt och ring 112. En filt på 120 gånger 180 centimeter, som är den storlek de rekommenderar, räcker till en vuxen. En på 100 gånger 100 gör det inte.",
  },
  {
    question: "Fungerar en brandfilt på en brand i litiumbatterier?",
    answer:
      "Bara delvis, och du ska inte lita på den. En brandfilt kväver lågor genom att stänga ute syret, men ett litiumbatteri i termisk rusning avger syre inifrån cellerna och fortsätter därför brinna under filten. Den kan hejda spridningen till möbler och gardiner, vilket är ett verkligt värde, men den släcker inte batteriet och branden kan blossa upp igen när filten lyfts. Ring 112 direkt vid en batteribrand. Bär aldrig en brinnande enhet i händerna, eftersom en cell kan brisera, och ladda aldrig en elcykel eller en hoverboard i en utrymningsväg. Det är också skälet till att en brandfilt i hallen inte är samma sak som ett brandskydd för elfordon.",
  },
  {
    question: "Räcker en brandfilt som enda brandskydd i en lägenhet?",
    answer:
      "Nej. Storstockholms brandförsvar kallar brandfilten ett bra komplement till övrig utrustning, och ordet komplement är valt med omsorg. Grundskyddet är brandvarnare, en på varje våningsplan och helst i varje sovrum, plus en pulversläckare på minst sex kilo. Brandfilten löser en avgränsad uppgift, att kväva en initialbrand innan den vuxit, och den gör det bättre än en släckare i just köket eftersom pulver mot en varm kastrull kan slunga ut brinnande fett. Ha den nära köket, sätt fast fodralet i väggen så att den går att slita loss med en hand, och använd gärna handskar, eftersom värmen går rakt igenom filten.",
  },
];
