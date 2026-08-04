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
 * Brandvarnare.se tar fyra av åtta platser, inklusive de två översta. Det beror
 * på en enda sak: de är den enda butiken som säljer 120 × 180 med utskriven
 * 2019-certifiering, och de gör det för 179 till 199 kronor. Kjells 120 × 180
 * kostar 299,90 och är certifierad mot 1997. Biltemas 120 × 180 kostar 269 och
 * anger ingen standard.
 *
 * De är också den enda annonserbara butiken i brandfamiljen, vilket inte
 * påverkat rankningen. Hade Kjells filt varit 2019-certifierad hade den vunnit
 * på storlek och kundbetyg.
 *
 * Sedan omkontrollen står det här också på sidan, i avsnittet "Vem har
 * kontrollerat det här?". Det duger inte att bara redovisa det i en fil som
 * läsaren aldrig ser: fyra av åtta filtar är butikens egna omärkta varor, de
 * tar plats 1, 2, 4 och 5, och deras certifieringsuppgift vilar helt på
 * butikens eget ord.
 *
 * ## Kriteriet mäter dokumentation, inte filt
 *
 * `certifiering` gav tidigare 3,0 åt en filt där butiken inte anger något alls.
 * Den siffran var påhittad och gjorde dessutom tystnad mer lönsam än ett ärligt
 * utskrivet 1997. Kriteriet heter nu Dokumenterad certifiering och betygsätter
 * uttryckligen vad köparen kan kontrollera före köp: 5,0 för utskrivet 2019,
 * 2,5 för standard utan årtal, 1,5 för utskrivet 1997, 1,0 när ingenting anges.
 * Skalan står i lib/categories.ts och publiceras på sidan.
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
    tagline: "Rätt storlek, rätt version av standarden, och snabbast ut ur förpackningen.",
    scores: { certifiering: 5, storlek: 5, atkomst: 4.5, material: 4, prisvarde: 4.5 },
    price: 199,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandfilt-120x180-silikon-hard-box/",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst i alla tre frågor som spelar roll",
    pros: [
      "SS-EN 1869:2019 står som godkännande i butikens specifikation, med provning mot matolja, heptan och ett skärpt elprov",
      "120 × 180 cm, storleken räddningstjänsterna rekommenderar",
      "Hård box öppnas med ett grepp, till skillnad från en påse man ska dra i",
      "Hundra kronor billigare än den enda andra 120 × 180 med utskriven standard",
    ],
    cons: [
      "Tjugo kronor dyrare än samma filt i mjuk påse",
      "Butiken säljer den utan angiven tillverkare, så certifieringen vilar på butikens eget ord",
    ],
    specs: [
      { label: "Certifiering", value: "SS-EN 1869:2019", highlight: true },
      { label: "Storlek", value: "120 × 180 cm", highlight: true },
      { label: "Förpackning", value: "Hård box", highlight: true },
      { label: "Material", value: "Silikonbehandlad glasfiber", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
      { label: "Engångsprodukt", value: "Ja, enligt EN 1869:2019" },
    ],
    verdict:
      "Rätt storlek, utskriven 2019-certifiering och en hård box. Ingen annan filt här har alla tre.\n\nStorleken är 120 × 180. En filt på 120 × 120 räcker till en kastrull, men inte till en soffa eller en människa vars kläder brinner, och det är den senare situationen man köper en brandfilt för att kunna hantera.\n\nI butikens specifikation står SS-EN 1869:2019 som godkännande, den gällande versionen med heptanprovet. Vad det innebär står i avsnittet ovanför jämförelsen.\n\nOch den sitter i hård box, som öppnas med ett grepp. En mjuk påse ska dras isär åt två håll, av händer som skakar.\n\nHundranittionio kronor. Kjells 120 × 180 kostar hundra kronor mer och är certifierad mot 1997.\n\nEn reservation vi tycker att du ska ha med dig: filten säljs utan angiven tillverkare, så certifieringsuppgiften vilar helt på butikens eget ord. Det gäller fyra av de åtta filtarna här, och vi har inte sett något provningsintyg för någon av dem.",
  },
  {
    id: "brandfilt-120x180-mjuk-pase",
    name: "Brandfilt 120 × 180 silikon, mjuk påse",
    shortName: "120×180 mjuk påse",
    brand: "Brandvarnare.se",
    image: productImage(BRANDFILT.slug, "brandfilt-120x180-mjuk-pase"),
    tagline: "Samma filt som vinnaren, tjugo kronor billigare, i påse i stället för box.",
    scores: { certifiering: 5, storlek: 5, atkomst: 3.5, material: 4, prisvarde: 5 },
    price: 179,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandfilt120x180mjuk_silikon-mjuk-pase/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigaste rätt-storleken",
    pros: [
      "SS-EN 1869:2019 och 120 × 180 cm för 179 kronor",
      "Mjuk påse tar mindre plats och går att hänga i ett skåp",
      "Billigaste vägen till rätt storlek och rätt standard",
    ],
    cons: [
      "Mjuk påse kräver att du drar i två flikar, hård box öppnas med ett grepp",
      "Butiken säljer den utan angiven tillverkare, så certifieringen vilar på butikens eget ord",
    ],
    specs: [
      { label: "Certifiering", value: "SS-EN 1869:2019", highlight: true },
      { label: "Storlek", value: "120 × 180 cm", highlight: true },
      { label: "Förpackning", value: "Mjuk påse", highlight: true },
      { label: "Material", value: "Silikonbehandlad glasfiber", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
      { label: "Engångsprodukt", value: "Ja, enligt EN 1869:2019" },
    ],
    verdict:
      "Exakt samma filt som testvinnaren, i mjuk påse i stället för hård box, och 20 kronor billigare.\n\nDe 20 kronorna köper en snabbare start. Boxen har ett lock som åker upp med ett grepp, medan påsen har två flikar du ska dra isär åt varsitt håll. Det är en sekund, kanske två, och i ett kök där något brinner är det inte ingenting.\n\nÅ andra sidan tar påsen mindre plats och går att hänga inne i ett skåp där en box inte får rum. Bor du trångt är det ett rimligt byte.\n\nAllt annat är identiskt: 120 × 180 centimeter, EN 1869:2019, silikonbehandlad glasfiber. 179 kronor är billigast av alla för den kombinationen, och det är den kombination du ska ha.",
  },
  {
    id: "biltema-brandfilt-120x120",
    name: "Brandfilt 120 × 120 cm",
    shortName: "Biltema 120×120",
    brand: "Biltema",
    image: productImage(BRANDFILT.slug, "biltema-brandfilt-120x120"),
    tagline: "Hundra kronor, 2019-certifierad och gjord för att hänga på väggen.",
    scores: { certifiering: 5, storlek: 2.5, atkomst: 4.5, material: 4.5, prisvarde: 5 },
    price: 99.9,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandfiltar/brandfilt-120-x-120-cm-2000066301",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Billigast med rätt certifiering",
    pros: [
      "99,90 kronor, billigast av filtarna i jämförelsen",
      "EN 1869:2019 utskrivet i specifikationen",
      "Förpackningen hängs på väggen och filten dras ut med ett handgrepp",
      "Anger 500 °C och att materialet är asbestfritt",
    ],
    cons: [
      "120 × 120 cm, inte den storlek räddningstjänsterna rekommenderar",
      "Räcker till en kastrull, inte till en soffa eller en människa",
    ],
    specs: [
      { label: "Certifiering", value: "EN 1869:2019", highlight: true },
      { label: "Storlek", value: "120 × 120 cm", highlight: true },
      { label: "Förpackning", value: "Vägghängd, dras ut", highlight: true },
      { label: "Material", value: "Silikonbehandlad glasfiberväv, asbestfri", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
      { label: "Vikt", value: "800 g" },
      { label: "Artikelnummer", value: "21-389" },
    ],
    verdict:
      "99,90 kronor för en filt som är certifierad mot rätt version av standarden och gjord för atthängas på väggen. Det är en anmärkningsvärd prislapp, och Biltema anger dessutom att materialet är asbestfritt, vilket ingen annan butik skriver ut.\n\nDen enda invändningen är storleken, och den är verklig. Hundratjugo gånger hundratjugo centimeter räcker gott till en kastrull eller en brinnande stekpanna, det vanligaste tillbudet i ett svenskt kök. Den räcker inte till en soffa, en gardin eller en människa vars kläder tagit eld, och räddningstjänsterna rekommenderar därför 120 × 180.\n\nVårt råd är att köpa den här till köket och en 120 × 180 till hallen. Tillsammans kostar det under 300 kronor, mindre än Kjells enda filt.",
  },
  {
    id: "brandfilt-120x120-hard-silikon",
    name: "Brandfilt 120 × 120 silikon, hård box",
    shortName: "120×120 hård box",
    brand: "Brandvarnare.se",
    image: productImage(BRANDFILT.slug, "brandfilt-120x120-hard-silikon"),
    tagline: "Den lilla storleken i hård box, för den som vill ha snabb åtkomst i köket.",
    scores: { certifiering: 5, storlek: 2.5, atkomst: 4.5, material: 4, prisvarde: 4.5 },
    price: 147,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandfilt-120x120-hard-silikon/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Snabbast åtkomst i det lilla formatet",
    pros: [
      "SS-EN 1869:2019",
      "Hård box, snabbast att öppna",
      "Silikonbehandlad, tätare mot genomträngning",
    ],
    cons: [
      "120 × 120 cm",
      "Femtio kronor dyrare än Biltemas i samma storlek och med samma certifiering",
      "Ingen angiven tillverkare",
    ],
    specs: [
      { label: "Certifiering", value: "SS-EN 1869:2019", highlight: true },
      { label: "Storlek", value: "120 × 120 cm", highlight: true },
      { label: "Förpackning", value: "Hård box", highlight: true },
      { label: "Material", value: "Silikonbehandlad glasfiber", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
    ],
    verdict:
      "Om du vet att filten ska sitta i köket och att den bara ska klara en kastrull, är det här den snabbaste av de små: hård box, rätt certifiering, silikonbehandlad väv.\n\nProblemet är prislappen bredvid. Biltema säljer samma storlek med samma certifiering och samma 500 grader för 99 kronor, 50 mindre, och anger dessutom att materialet är asbestfritt. Det du får för mellanskillnaden är boxen i stället för en vägghängd förpackning, och silikonbehandlingen.\n\nSka du ändå handla hos Brandvarnare.se, exempelvis för att du köper brandvarnare samtidigt, är den ett bra val. Ska du handla filten separat finns det billigare vägar till samma sak.",
  },
  {
    id: "brandfilt-120x120-mjuk-pase",
    name: "Brandfilt 120 × 120, mjuk påse",
    shortName: "120×120 mjuk påse",
    brand: "Brandvarnare.se",
    image: productImage(BRANDFILT.slug, "brandfilt-120x120-mjuk-pase"),
    tagline: "Billigast hos Brandvarnare.se, men inte billigast av filtarna i jämförelsen.",
    scores: { certifiering: 5, storlek: 2.5, atkomst: 3.5, material: 3.5, prisvarde: 5 },
    price: 118,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/brandfilt120x120mjuk/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Enklast att stoppa undan",
    pros: [
      "SS-EN 1869:2019 för 118 kronor",
      "Mjuk påse tar minimal plats",
    ],
    cons: [
      "120 × 120 cm",
      "Mjuk påse är långsammare att öppna än en box",
      "Fortfarande dyrare än Biltemas motsvarande",
      "Osilikoniserad väv, till skillnad från butikens dyrare varianter",
    ],
    specs: [
      { label: "Certifiering", value: "SS-EN 1869:2019", highlight: true },
      { label: "Storlek", value: "120 × 120 cm", highlight: true },
      { label: "Förpackning", value: "Mjuk påse", highlight: true },
      { label: "Material", value: "Glasfiber utan silikonbehandling", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
    ],
    verdict:
      "Butikens instegsmodell: rätt certifiering, liten storlek, mjuk påse, 118 kronor.\n\nDen gör inget fel, men den blir svår att motivera bredvid grannarna i listan. Nitton kronor till ger dig hård box i samma storlek. Sextioen kronor till ger dig 120 × 180 i mjuk påse, den storlek som faktiskt rekommenderas. Och Biltema säljer samma sak som den här för aderton kronor mindre.\n\nDen är alltså rätt köp bara i ett scenario: du handlar redan hos Brandvarnare.se, du vill ha en filt i ett trångt köksskåp, och du vet att den bara ska släcka en stekpanna.",
  },
  {
    id: "biltema-brandfilt-120x180",
    name: "Brandfilt 120 × 180 cm",
    shortName: "Biltema 120×180",
    brand: "Biltema",
    image: productImage(BRANDFILT.slug, "biltema-brandfilt-120x180"),
    tagline: "Rätt storlek och högst temperaturtålighet, men standarden nämns inte alls.",
    scores: { certifiering: 1, storlek: 5, atkomst: 4.5, material: 4.5, prisvarde: 3 },
    price: 269,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandfiltar/brandfilt-120-x-180-cm-2000042777",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Tål högst temperatur",
    pros: [
      "120 × 180 cm, storleken räddningstjänsterna rekommenderar",
      "550 °C, högst angivna temperaturtålighet av alla åtta",
      "Förpackningen hängs på väggen och filten dras ut med ett handgrepp",
      "Asbestfri silikonbehandlad glasfiberväv",
    ],
    cons: [
      "Butiken anger ingen version av EN 1869, trots att deras mindre filt gör det",
      "Sjuttio kronor dyrare än en 120 × 180 med utskriven 2019-certifiering",
    ],
    specs: [
      { label: "Certifiering", value: "Ej angiven av butiken", highlight: true },
      { label: "Storlek", value: "120 × 180 cm", highlight: true },
      { label: "Förpackning", value: "Vägghängd, dras ut", highlight: true },
      { label: "Material", value: "Silikonbehandlad glasfiberväv, asbestfri", highlight: true },
      { label: "Temperatur", value: "550 °C", highlight: true },
      { label: "Vikt", value: "1 kg" },
      { label: "Artikelnummer", value: "21-349" },
    ],
    verdict:
      "Rätt storlek, högst temperaturtålighet av filtarna i jämförelsen och en förpackning som är byggd för att hänga på väggen och dras ut med ett grepp. På papperet är det mycket bra för 269 kronor.\n\nDet som drar ner den är en märklig utelämning. Biltema anger EN 1869:2019 i specifikationen för sin mindre filt på nittionio kronor, men skriver ingenting alls om standarden för den här. Vi läste produktsidan igen 2026-08-02, och den säger fortfarande ingenting om vare sig certifiering eller standard.\n\nFilten kan mycket väl vara provad mot 2019. Vi kan bara inte veta det, och det kan inte du heller innan du betalar. Eftersom vårt kriterium mäter just vad som går att kontrollera före köp får den lägsta betyget där, och det kostar den placeringar den annars hade tagit. Ringer du Biltema och får uppgiften bekräftad är det här en bra filt till rätt storlek.",
  },
  {
    id: "luxorparts-brandfilt-120x120",
    name: "Brandfilt 120 × 120 cm röd",
    shortName: "Luxorparts",
    brand: "Luxorparts",
    image: productImage(BRANDFILT.slug, "luxorparts-brandfilt-120x120"),
    tagline: "Flest kundbetyg av filtarna i jämförelsen, men standarden anges utan årtal.",
    scores: { certifiering: 2.5, storlek: 2.5, atkomst: 3.5, material: 4, prisvarde: 2.5 },
    price: 199.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandfiltar/luxorparts-brandfilt-120x120-cm-rod-p21114",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 306, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Flest kundbetyg",
    pros: [
      "307 betyg på 4,5 och 78 skrivna omdömen, klart störst underlag av de åtta filtarna",
      "Glasfiber som står emot 500 °C",
      "Kjell anger att filten är tät och står emot gasgenomträngning",
      "Röd, synlig och lätt att hitta",
    ],
    cons: [
      "Butiken anger EN 1869 men inte vilken version",
      "120 × 120 cm till dubbla priset mot Biltemas motsvarande",
    ],
    specs: [
      { label: "Certifiering", value: "EN 1869, årtal ej angivet", highlight: true },
      { label: "Storlek", value: "120 × 120 cm", highlight: true },
      { label: "Förpackning", value: "Påse", highlight: true },
      { label: "Material", value: "Glasfiber", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
      { label: "Vikt", value: "1 100 g" },
      { label: "Gastäthet", value: "Tät mot gasgenomträngning" },
    ],
    verdict:
      "307 betyg på 4,5 är mer underlag än alla de andra filtarna tillsammans, och 78 av köparna har skrivit ett omdöme. Folk köper den, hittar den i butik och blir nöjda.\n\nKjell är också ovanligt informativa om materialet. De anger femhundra grader, vikten 1 100 gram, och skriver dessutom att filten är tät och står emot gasgenomträngning, vilket är en egenskap ingen annan butik nämner.\n\nMen i specifikationsfältet Certifiering står bara EN1869, utan årtal. Båda versionerna innebär prov mot matolja och ett elprov, så den delen är klar. Det vi inte vet är om den också klarat heptanprovet, det som tillkom 2019. Därför mittbetyg och inte toppbetyg.\n\nOch priset är svårt. Tvåhundra kronor för 120 × 120 när Biltema säljer samma storlek med utskriven 2019-certifiering för nittionio. Det du betalar för är kundunderlaget och att den finns att hämta i en butik i dag.",
  },
  {
    id: "housegard-design-edition-120x180",
    name: "Brandfilt Design Edition 120 × 180 cm svart",
    shortName: "Housegard DE",
    brand: "Housegard",
    image: productImage(BRANDFILT.slug, "housegard-design-edition-120x180"),
    tagline: "Rätt storlek, snyggast, dyrast, och certifierad mot 1997 års version.",
    scores: { certifiering: 1.5, storlek: 5, atkomst: 3.5, material: 3.5, prisvarde: 1.5 },
    price: 299.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandfiltar/housegard-brandfilt-design-edition-120x180-cm-svart-p21044",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 13, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Den du vågar ha framme",
    pros: [
      "120 × 180 cm, storleken räddningstjänsterna rekommenderar",
      "Designad för att få hänga synligt i stället för att gömmas",
      "Finns i svart och vit till samma pris",
      "Enda filten med både namngiven tillverkare och utskrivet årtal",
    ],
    cons: [
      "Certifierad enligt EN 1869:1997, den tillbakadragna versionen, utan heptanprov",
      "Dyrast av de åtta, 100 kronor över en 120 × 180 med 2019-certifiering",
    ],
    specs: [
      { label: "Certifiering", value: "EN 1869:1997", highlight: true },
      { label: "Storlek", value: "120 × 180 cm", highlight: true },
      { label: "Förpackning", value: "Designpåse", highlight: true },
      { label: "Material", value: "Glasfiber", highlight: true },
      { label: "Temperatur", value: "500 °C", highlight: true },
      { label: "Färg", value: "Svart, finns även vit" },
    ],
    verdict:
      "En brandfilt du vågar hänga framme i köket hittar du på tre sekunder i stället för trettio. Housegard har designat bort skälet att stoppa undan den, och det är brandskydd snarare än fåfänga.\n\nDen har också rätt storlek och är den enda filten som både har en namngiven tillverkare och ett utskrivet årtal i certifieringsfältet. Öppenheten är värd något, och den är skälet till att den inte hamnar sist.\n\nProblemet är vilket årtal det är. Kjells specifikation anger EN 1869:1997, versionen som drogs tillbaka när 2019 kom. Skillnaden är heptanprovet, provningen mot brand i vätska. Matolja och elprov klarade även 1997 års filtar.\n\nFör 299,90 kronor, hundra mer än en 120 × 180 med 2019-certifiering, är det svårt att motivera. Vill du ha den synliga designen är den värd att överväga ändå, men köp den då med vetskapen om vad den är provad mot.\n\nDen var dessutom slut vid priskontrollen.",
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
    label: "EN 1869:2019 utskrivet",
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
      "Det säljs brandfiltar på marknadsplatser och i lågprishandeln som inte anger någon standard alls, ofta utan namngiven tillverkare och utan svensk återförsäljare att fråga. Vi tar inte in dem, eftersom det inte finns någon uppgift att jämföra. Två av filtarna vi rankar saknar också ett årtal, och de finns med därför att de säljs av etablerade svenska kedjor där uppgiften går att efterfråga. Båda får lågt betyg för det, vilket syns i tabellen.",
  },
];

export const BRANDFILT_FAQ = [
  {
    question: "Finns det något oberoende test av brandfiltar?",
    answer:
      "Nej. Vi har letat hos Råd & Rön, Testfakta och de nordiska testredaktionerna och hittar inget test av kategorin. De svenska sidor som säger sig ha testat brandfiltar redovisar varken metod, mätvärden eller testdatum, och en av dem daterar sin artikel i framtiden. Vår jämförelse är därför inte ett laboratorietest heller. Den läser standarden i original och kontrollerar vad varje butik dokumenterar mot den, och vi skriver ut var gränsen går.",
  },
  {
    question: "Vilken storlek på brandfilt ska man ha?",
    answer:
      "120 × 180 centimeter. Standarden EN 1869:2019 säger själv att filtar som är tillräckligt stora anses lämpliga för att kväva elden på en person vars kläder brinner, men den anger ingen centimetersiffra. Den kommer från räddningstjänsterna. Skälet är att filten ska kunna täcka mer än en kastrull: en brinnande soffa, en gardin eller en människa. En filt på 120 × 120 räcker till stekpannan och är ett bra komplement i köket, men den bör inte vara husets enda.",
  },
  {
    question: "Vilken brandfilt är bäst 2026?",
    answer:
      "Brandvarnare.se:s 120 × 180 i hård box för 199 kronor. Den är den enda filten som är rätt på alla tre punkter som spelar roll: rekommenderad storlek, certifiering mot EN 1869:2019 och en hård box som öppnas med ett grepp. Vill du spara tjugo kronor finns samma filt i mjuk påse.",
  },
  {
    question: "Vad kostar en brandfilt?",
    answer:
      "De vi jämför kostar mellan 99,90 och 299,90 kronor, kontrollerat 2026-08-02. En 120 × 120 med rätt certifiering går att få för hundra kronor, och en 120 × 180 med samma certifiering för 179. Den dyraste filten är certifierad mot den äldre versionen av standarden.",
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
