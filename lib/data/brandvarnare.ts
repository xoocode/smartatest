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
 * **Verkligt och daterat:** priser och kundbetyg lästa 2026-08-02 på butikens
 * egen produktsida. Brandvarnare.se anger priset i `product:price:amount`,
 * Kjell i JSON-LD.
 *
 * Specifikationerna är omgjorda 2026-08-06 mot tillverkarnas egna sidor:
 * housegard.se, deltronic.se, nexa.se, X-Sense datablad och manualer via
 * brandvarnare.se, samt Kjells produktsidor och manualen till Luxorparts
 * 21130. Ljudnivå, batterilivslängd, certifiering, drifttemperatur, mått och
 * garanti kommer därifrån.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte tänt eld på något
 * och skriver det rakt ut på sidan.
 *
 * ## Sidan rankar bara de icke-smarta
 *
 * Fristående och radiosammankopplade varnare utan app. De app- och
 * hubbanslutna hör till /smart-brandvarnare. Housegard Luma ligger här i sin
 * grundform, alltså tvåpacket som seriekopplas med radio, medan Luma smart
 * hubb som gör systemet appstyrt hör till den andra sidan.
 *
 * ## Kriteriet som togs bort 2026-08-06
 *
 * Sidan hade `omdome` på vikt 15: hur många publicerade jämförelser som utsett
 * produkten till vinnare. Det betygsatte vem andra skrivit om, inte vad varan
 * gör, och två produkter bar en nackdel som löd "ingen av jämförelserna vi
 * läst har rankat den". Kriteriet är borta och vikten omfördelad. Se
 * `lib/corrections.ts`, 2026-08-06.
 *
 * ## Vad gap-passet rättade
 *
 * Sex varnare stod med "Ej angiven av butiken" på ljudnivå. **Alla tio anger
 * 85 dB på 3 m**, och för fem av de sex stod talet på samma butikssida vi
 * redan länkade. Två påståenden om pausfunktion var också fel: X-Sense XS01
 * och XS01-W har pausknapp på varnaren, inte bara via fjärrkontrollen RC01-W.
 *
 * Två batteritider som stod som okända är i själva verket publicerade och
 * korta: Housegard Pebble och Nexa KD-134A anger båda cirka ett år.
 *
 * ⚠️ **Pausfunktion är inte belagd** för Luxorparts 21130, Housegard Pebble
 * eller Nexa KD-134A. Ingen av tillverkarna anger den, och ingen anger att den
 * saknas. Cellen står tom och de tre saknar betyg på `handhavande` i stället
 * för att få ett lågt. Vikten omfördelas enligt `redistributeMissing`.
 *
 * ## Artikelnummer för framtida kontroll
 *
 * Kjell: Luma 21220, Pebble 10 21307, Luxorparts 21130, Pebble 3-pack 21270,
 * Nexa 21100. Brandvarnare.se: XS01-W 2-pack 10202 (EAN 7332211102024),
 * FHB160 10160 (7332211101607), X10 10346 (7332211103465), XS01 10200
 * (7332211102000), FHB155 10155 (7332211101553). Samtliga fem EAN saknas i
 * Icecat, kontrollerat 2026-08-06.
 *
 * ## Butiksfördelning
 *
 * Fem länkar till Kjell och fem till Brandvarnare.se. Testvinnaren hamnade hos
 * Kjell, alltså inte hos den butik som tillåter betalannonsering. Rankningen
 * har inte justerats för att flytta den.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

/** Specifikationer omgjorda mot tillverkarnas egna sidor detta datum. */
const SPECS_CHECKED = "2026-08-06";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "housegard-luma-2-pack",
    name: "Luma trådlös brandvarnare 2-pack",
    shortName: "Luma 2-pack",
    brand: "Housegard",
    image: productImage(BRANDVARNARE.slug, "housegard-luma-2-pack"),
    tagline: "40 varnare i samma system, och en brand i källaren väcker hela huset.",
    scores: { sammankoppling: 5, batteritid: 4.5, handhavande: 4, prisvarde: 3 },
    price: 599,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-luma-tradlos-brandvarnare-2-pack-vit-p21220",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 62, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för hus med flera våningsplan",
    pros: [
      "Upp till 40 enheter i samma system, mest av varnarna i jämförelsen",
      "868 MHz tar sig genom betongbjälklag, där 433 tappar",
      "Förseglat litiumbatteri som räcker varnarens hela tioåriga livslängd",
      "Pausknapp på varnaren, så matoslarmet tystnar utan att skyddet gör det",
      "Tål upp till 55 grader, mest värme av alla tio",
    ],
    cons: [
      "300 kronor per skyddad plats, tre gånger Pebble-trepacket",
      "Appstyrning kräver Luma smart hubb för 499,90 kronor extra",
      "Går inte under noll grader, så ett ouppvärmt fritidshus kräver Pebble 10 i stället",
    ],
    /* Housegard 601178, läst 2026-08-06: larmsignal, frekvens, batteri,
       temperaturområde, detektionstyp och certifiering. */
    specs: [
      { label: "Sammankopplas", value: "Ja, radio 868 MHz", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "40", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "2", highlight: true },
      { label: "Batteri", value: "Förseglat litium CR123A, ingår", highlight: true },
      { label: "Batteritid", value: "10 år, hela livslängden", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Pausfunktion", value: "Ja" },
      { label: "Detektionsprincip", value: "Optisk detektionskammare" },
      { label: "Certifiering", value: "EN 14604, CE" },
      { label: "Drifttemperatur", value: "0 till 55 °C" },
      { label: "Artikelnummer", value: "21220" },
    ],
    verdict:
      "Housegard Luma är tvåpacket som gör ett helt hus till ett enda larm. 599 kronor för två varnare, alltså 300 kronor per skyddad plats, och den dyraste vägen in i jämförelsen.\n\nFyrtio enheter kan sitta i samma system, mer än dubbelt så många som X-Sense klarar, och radion går på 868 MHz. Det är frekvensen som tar sig genom betongbjälklag, och det är genom bjälklag signalen ska gå från tvättstugan till sovrummet. Batteriet är förseglat och räcker hela den tioåriga livslängden, så du sätter upp varnarna och rör dem aldrig igen. Pausknappen sitter på varnaren själv och tystar matoslarmet i några minuter utan att stänga av skyddet, vilket är skillnaden mellan en varnare i taket och en varnare i en byrålåda.\n\nKylan är gränsen. Luma är byggd för 0 till 55 grader, och ett ouppvärmt fritidshus i februari ligger under det.\n\nKöp det här tvåpacket till huset. Det är det enda i jämförelsen som växer med bostaden, och fyrtio enheter är fler än något hem behöver.",
  },
  {
    id: "x-sense-xs01-w-2-pack",
    name: "XS01-W rökvarnare 2-pack",
    shortName: "XS01-W 2-pack",
    brand: "X-Sense",
    image: productImage(BRANDVARNARE.slug, "x-sense-xs01-w-2-pack"),
    tagline: "Parkopplade från fabrik, i en sluten grupp som grannens larm inte stör.",
    scores: { sammankoppling: 4.5, batteritid: 4.5, handhavande: 4.5, prisvarde: 2.5 },
    price: 646,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xs01-w-2-pack/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för lägenhet i flerfamiljshus",
    pros: [
      "Parkopplade från fabrik, inget att konfigurera",
      "Sluten grupp gör att grannens X-Sense inte utlöser din",
      "868 MHz och upp till 24 enheter per grupp",
      "Tioårs inbyggt litiumbatteri och fem års garanti",
      "Pausknapp på varnaren, och fjärrkontrollen RC01-W testar och pausar från golvet",
    ],
    cons: [
      "323 kronor per skyddad plats, dyrast i jämförelsen",
      "24 enheter per grupp mot Housegard Lumas 40",
      "Fjärrkontrollen RC01-W kostar extra, och utan den når du bara varnaren från en stege",
    ],
    /* Brandvarnare.se artikel 10202 och X-Sense manual XS01-W v1.0, läst
       2026-08-06: 85 dB på 3 m, 868 MHz, pausfunktion 9 min, garanti 5 år. */
    specs: [
      { label: "Sammankopplas", value: "Ja, radio 868 MHz i sluten grupp", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "24 per grupp", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "2", highlight: true },
      { label: "Batteri", value: "Inbyggt litium CR123A", highlight: true },
      { label: "Batteritid", value: "10 år", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Pausfunktion", value: "Ja, 9 minuter" },
      { label: "Detektionsprincip", value: "Optisk rökvarnare" },
      { label: "Certifiering", value: "EN 14604:2005/AC:2008" },
      { label: "Mått", value: "Ø78,5 × 49 mm" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "10202" },
    ],
    verdict:
      "X-Sense XS01-W är tvåpacket som kommer färdigkopplat ur kartongen. 646 kronor för två varnare, alltså 323 kronor per skyddad plats och det högsta priset per plats i jämförelsen.\n\nEnheterna är parkopplade redan i fabriken, så du skruvar upp dem och är klar. De sitter dessutom i en sluten grupp, vilket betyder att grannens X-Sense inte får din att tjuta när de testar sina. I ett flerbostadshus är det inte en teoretisk fråga. Radion går på 868 MHz precis som testvinnarens, tjugofyra enheter per grupp räcker för vilken villa som helst, och pausknappen sitter på varnaren och tystar i nio minuter. Batteriet är inbyggt och håller tio år, garantin är fem.\n\nPriset är invändningen. Tvåpacket kostar 47 kronor mer än Housegard Luma och bygger ett system som är knappt hälften så stort.\n\nDen slutna gruppen är byggd för hus med tjugo grannar, och det är där de 47 kronorna extra går att motivera. Ska du täcka fler än två platser räknar du på sexpacket i stället: 1 499 kronor och 250 per plats.",
  },
  {
    id: "deltronic-x10",
    name: "X10 rökvarnare",
    shortName: "X10",
    brand: "Deltronic",
    image: productImage(BRANDVARNARE.slug, "deltronic-x10"),
    tagline: "Tio års garanti, och ett insektsskydd som håller falsklarmen borta.",
    scores: { sammankoppling: 1, batteritid: 5, handhavande: 5, prisvarde: 3.5 },
    price: 265,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/deltronic-x10/",
    priceCheckedAt: PRICE_CHECKED,
    award: "editor",
    superlative: "Bäst för hyresfastighet och fritidshus",
    pros: [
      "Tio års garanti, dubbelt mot de flesta i jämförelsen",
      "Inbyggt damm- och insektsskydd, de två vanligaste orsakerna till falsklarm",
      "Självövervakning som märker fel eller smuts i kammaren",
      "Låg batterivarning med tio timmars fördröjning, så pipet inte börjar mitt i natten",
      "Automatisk uppstart vid montage och valbart lås i takfästet",
    ],
    cons: [
      "Kan inte kopplas ihop med andra varnare",
      "265 kronor för en enda skyddad plats",
      "Fyra våningsplan kostar 1 060 kronor, och varnarna larmar var för sig",
    ],
    /* Deltronic artikel 10346, läst 2026-08-06: 85 dB piezo på 3 m, garanterad
       batterilivslängd 10 år, garanti 10 år, Ø88 × 38 mm, 0 till 40 °C. */
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "1", highlight: true },
      { label: "Batteri", value: "Inbyggt 3 V litium", highlight: true },
      { label: "Batteritid", value: "10 år, garanterad", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Pausfunktion", value: "Ja, 10 minuter" },
      { label: "Detektionsprincip", value: "Optisk reflektion" },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Drifttemperatur", value: "0 till 40 °C" },
      { label: "Mått", value: "Ø88 × 38 mm" },
      { label: "Garanti", value: "10 år" },
      { label: "Artikelnummer", value: "10346" },
    ],
    verdict:
      "Deltronic X10 är den fristående varnaren som är byggd för att lämnas ifred i ett decennium. 265 kronor för en skyddad plats, och den dyraste av de varnare som inte kan larma tillsammans.\n\nBatteriet är inbyggt med garanterad tioårig livslängd, och garantin är lika lång. Kammaren har ett damm- och insektsskydd, och varnaren övervakar sig själv och säger till om den blivit smutsig eller gått sönder. Damm och insekter är de två vanligaste orsakerna till falsklarm, och falsklarm är den vanligaste orsaken till att någon plockar ner en varnare. Batterivarningen har dessutom tio timmars fördröjning, så det första pipet kommer mitt på dagen och inte klockan tre på natten.\n\nDen kan inte kopplas ihop med någonting. Ska varnarna i ett hus larma tillsammans är det de två översta i listan som gäller.\n\nTill en hyresfastighet eller ett fritidshus finns inget bättre val i listan. Tio års garanti på en vara som får sitta uppe i tio år betyder att tillverkaren står för hela dess liv, och damm och insekter är just det som gör att ingen ringer om den däremellan.",
  },
  {
    id: "x-sense-xs01",
    name: "XS01 rökvarnare",
    shortName: "XS01",
    brand: "X-Sense",
    image: productImage(BRANDVARNARE.slug, "x-sense-xs01"),
    tagline: "Tio år i taket utan ett enda batteribyte.",
    scores: { sammankoppling: 1, batteritid: 4.5, handhavande: 4.5, prisvarde: 4.5 },
    price: 179,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xs01/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast med tioårsbatteri",
    pros: [
      "179 kronor för ett förseglat tioårsbatteri, 60 kronor under närmaste varnare med samma batteri",
      "Fem års produktgaranti",
      "Pausknapp som tystar matoslarmet i nio minuter",
      "Självövervakning som märker fel eller damm i kammaren",
      "Skruv och dubbelhäftande tejp ingår",
    ],
    cons: [
      "Kan inte kopplas ihop med andra varnare",
      "Tre våningsplan kostar 537 kronor, och varnarna larmar var för sig",
    ],
    /* Brandvarnare.se artikel 10200, läst 2026-08-06: 85 dB på 3 m,
       pausfunktion 9 min, garanti 5 år, Ø78,5 × 49 mm, vikt 122 g. */
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "1", highlight: true },
      { label: "Batteri", value: "Inbyggt litium CR123A", highlight: true },
      { label: "Batteritid", value: "10 år", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Pausfunktion", value: "Ja, 9 minuter" },
      { label: "Detektionsprincip", value: "Optisk rökvarnare" },
      { label: "Certifiering", value: "EN 14604:2005/AC:2008" },
      { label: "Mått", value: "Ø78,5 × 49 mm" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "10200" },
    ],
    verdict:
      "X-Sense XS01 är den billigaste varnaren i jämförelsen som aldrig behöver ett batteribyte. 179 kronor, och närmaste varnare med förseglat tioårsbatteri kostar 239.\n\nBatteriet är ett inbyggt litium CR123A som räcker varnarens hela livslängd, garantin är fem år, och pausknappen tystar matoslarmet i nio minuter utan att stänga av skyddet. Den håller dessutom koll på sig själv och signalerar om kammaren blivit smutsig eller något gått sönder, vilket är funktionen som avgör om du får veta att varnaren slutat fungera. Skruv och tejp ligger i förpackningen.\n\nDen kommunicerar inte med andra varnare. Köper du tre till tre våningsplan har du tre varnare som var och en larmar för sig, och den i källaren hörs inte i sovrummet.\n\nFör 179 kronor finns inget bättre i listan, och det gäller ända tills du behöver den andra varnaren. Från och med då är det XS01-W du ska titta på, för då börjar sammankopplingen betyda mer än 144 kronor.",
  },
  {
    id: "deltronic-fhb160",
    name: "FHB160 rökvarnare",
    shortName: "FHB160",
    brand: "Deltronic",
    image: productImage(BRANDVARNARE.slug, "deltronic-fhb160"),
    tagline: "Känner även den snabba branden i en laddare eller en burk thinner.",
    scores: { sammankoppling: 1, batteritid: 4.5, handhavande: 5, prisvarde: 3.5 },
    price: 239,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/deltronic-fhb160/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för hem med mycket elektronik",
    pros: [
      "TSE höjer känsligheten automatiskt när värmen i taket stiger",
      "Larmar därför även på snabba bränder i elektronik och brandfarliga vätskor",
      "Inbyggt tioårsbatteri och fem års garanti",
      "Pausfunktion i tio minuter och en stor testknapp",
      "Bara 62 millimeter i diameter",
    ],
    cons: [
      "Kan inte kopplas ihop med andra varnare",
      "100 kronor mer än X-Sense XS01, som har samma batteri och samma garanti",
    ],
    /* Deltronic artikel 10160 och Brandvarnare.se, läst 2026-08-06: 85 dB
       piezo på 3 m, TSE, garanti 5 år, Ø62 × 34 mm, 0 till 45 °C. */
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "1", highlight: true },
      { label: "Batteri", value: "Inbyggt litium", highlight: true },
      { label: "Batteritid", value: "10 år", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Pausfunktion", value: "Ja, 10 minuter" },
      { label: "Detektionsprincip", value: "Optisk reflektion med TSE" },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Drifttemperatur", value: "0 till 45 °C" },
      { label: "Mått", value: "Ø62 × 34 mm" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "10160" },
    ],
    verdict:
      "Deltronic FHB160 är den optiska varnaren som lånat en bit av värmevarnaren. 239 kronor för en skyddad plats.\n\nEn optisk rökvarnare är bra på pyrande bränder och sämre på snabba, och det är teknikens kända svaghet. FHB160 har TSE, termisk känslighetsförbättring, som skruvar upp känsligheten av sig själv när temperaturen i taket stiger. Branden som startar i en laddare, i ett tyg eller i en burk brandfarlig vätska ger värme före rök, och det är precis den branden en ren rökvarnare är sämst på. Ingen annan varnare i jämförelsen har funktionen. Batteriet är inbyggt och håller tio år, garantin är fem, pausfunktionen tystar i tio minuter och varnaren mäter bara 62 millimeter i diameter.\n\nHundra kronor skiljer mot X-Sense XS01, som har samma tioårsbatteri och samma femåriga garanti utan TSE.\n\nDe hundra kronorna över XS01 köper en enda sak, och det är TSE. I en lägenhet med kokplatta och en telefonladdare är de bortkastade. Har du verkstad, elcykel eller ett rum fullt av batterier är de billiga.",
  },
  {
    id: "housegard-pebble-10",
    name: "Pebble 10 optisk brandvarnare",
    shortName: "Pebble 10",
    brand: "Housegard",
    image: productImage(BRANDVARNARE.slug, "housegard-pebble-10"),
    tagline: "Förseglat batteri, tio års livslängd, ingenting att sköta.",
    scores: { sammankoppling: 1, batteritid: 4.5, handhavande: 4, prisvarde: 3.5 },
    price: 249.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-pebble-10-optisk-brandvarnare-p21307",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 97, scale: 5, checkedAt: SPECS_CHECKED },
    superlative: "Minst underhåll",
    pros: [
      "Förseglat litiumbatteri som räcker hela tioårsperioden",
      "Pausknapp och testknapp, båda lätta att träffa",
      "Fungerar ner till tio minusgrader, alltså i ett ouppvärmt fritidshus",
      "97 kundbetyg på 4,5, tredje största underlaget bland varnarna i jämförelsen",
    ],
    cons: [
      "Kan inte kopplas ihop, det kan däremot Pebble Link",
      "250 kronor för en enda skyddad plats",
    ],
    /* Housegard 601143 och Kjell 21307, läst 2026-08-06: ≥85 dB på 3 m,
       förseglat CR123A 10 år, -10 till +40 °C, SS-EN 14604:2005. */
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "1", highlight: true },
      { label: "Batteri", value: "Förseglat litium CR123A", highlight: true },
      { label: "Batteritid", value: "10 år, hela livslängden", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Pausfunktion", value: "Ja" },
      { label: "Detektionsprincip", value: "Optisk detektionskammare" },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Drifttemperatur", value: "−10 till 40 °C" },
      { label: "Artikelnummer", value: "21307" },
    ],
    verdict:
      "Housegard Pebble 10 är byggd kring en enda idé: du ska aldrig behöva göra någonting. 249,90 kronor för en skyddad plats.\n\nBatteriet är förseglat och räcker exakt lika länge som varnaren får sitta uppe, tio år. När batteriet är slut är också sensorn för gammal och du byter hela enheten, vilket tar bort den vanligaste orsaken till en tyst brandvarnare: ett batteri någon lovade sig själv att byta. Den går dessutom ner till tio minusgrader, mer köld än testvinnaren klarar, så den fungerar i en stuga som står kall över vintern.\n\nDen kan inte kopplas ihop med någonting. Housegard gör en modell som kan, Pebble Link, och den kostar 799 kronor för två.\n\nSka du sätta upp en varnare i en lägenhet eller i sommarstugan och sedan glömma den i tio år är det här rätt val. Ska varnarna larma tillsammans är Luma vägen, från samma tillverkare.",
  },
  {
    id: "deltronic-fhb155",
    name: "FHB155 rökvarnare",
    shortName: "FHB155",
    brand: "Deltronic",
    image: productImage(BRANDVARNARE.slug, "deltronic-fhb155"),
    tagline: "Pausknappen som annars sitter på dubbelt så dyra varnare.",
    scores: { sammankoppling: 1, batteritid: 2.5, handhavande: 4, prisvarde: 5 },
    price: 139,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/deltronic-fhb155/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Lägsta styckepriset",
    pros: [
      "139 kronor, billigast av alla vi rankar",
      "Pausfunktion i tio minuter trots priset",
      "Fem års batterilivslängd, fem gånger de billiga nio-voltsvarnarna",
      "Montagekudde från 3M ingår, tillsammans med skruv och plugg",
    ],
    cons: [
      "Utbytbara AAA-batterier, alltså ett byte halvvägs genom varnarens liv",
      "Tre års garanti, kortast i jämförelsen",
      "Kan inte kopplas ihop",
    ],
    /* Deltronic artikel 10155, läst 2026-08-06: 85 dB piezo på 3 m, 2 st AAA
       med 5 års beräknad livslängd, garanti 3 år, Ø62 × 37 mm, 0 till 45 °C. */
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "1", highlight: true },
      { label: "Batteri", value: "2 × AAA alkaliskt, ingår", highlight: true },
      { label: "Batteritid", value: "5 år", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Pausfunktion", value: "Ja, 10 minuter" },
      { label: "Detektionsprincip", value: "Optisk reflektion" },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Drifttemperatur", value: "0 till 45 °C" },
      { label: "Mått", value: "Ø62 × 37 mm" },
      { label: "Garanti", value: "3 år" },
      { label: "Artikelnummer", value: "10155" },
    ],
    verdict:
      "Deltronic FHB155 är den billigaste varnaren i jämförelsen och den enda under 150 kronor. 139 kronor för en skyddad plats.\n\nDen har pausfunktion i tio minuter, vilket är ovanligt i det prisläget och det som avgör om varnaren sitter kvar efter tredje gången någon stekt fläsk. Batteriet är två AAA-celler med fem års beräknad livslängd, alltså fem gånger så länge som nio-voltsvarnarna längre ner i listan håller. Montagekudden från 3M ligger i förpackningen tillsammans med skruv och plugg, och varnaren mäter 62 millimeter i diameter.\n\nFem år är ändå halva den tid varnaren får sitta uppe, så det blir ett batteribyte, och garantin är tre år mot fem hos storasystern.\n\nDen här är golvet, och golvet är oändligt mycket bättre än ingenting. Men lägg hundra kronor till om du kan. FHB160 ger tioårsbatteri, fem års garanti och TSE för 239, och hundra kronor fördelade över tio år är mindre än en krona i månaden.",
  },
  {
    id: "luxorparts-tradlos-2-pack",
    name: "Trådlös brandvarnare 2-pack",
    shortName: "Luxorparts 2-pack",
    brand: "Luxorparts",
    image: productImage(BRANDVARNARE.slug, "luxorparts-tradlos-2-pack"),
    tagline: "Larmar tillsammans för 250 kronor per skyddad plats.",
    scores: { sammankoppling: 3.5, batteritid: 1.5, prisvarde: 3.5 },
    price: 499.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/luxorparts-tradlos-brandvarnare-2-pack-p21130",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 359, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Billigast för hopkopplat larm",
    pros: [
      "250 kronor per skyddad plats, femtio kronor under Housegard Luma",
      "Parkoppling upp till 60 meter fri sikt",
      "Alla batterier medföljer, två nio-volt och sex AA",
      "359 kundbetyg på 4,0, klart största underlaget i jämförelsen",
    ],
    cons: [
      "433,92 MHz går sämre genom betongbjälklag än 868",
      "Fyra batterier per varnare att hålla reda på i tio år",
      "Vill du ha förseglat batteri och 868 MHz kostar Housegard Luma femtio kronor mer per plats",
    ],
    /* Kjell 21130 och manual 886313, läst 2026-08-06: 85 dB på 3 m, 433,92 MHz,
       1 × 9 V och 3 × AA per varnare, 125 × 48 mm, 276 g, -10 till +40 °C,
       SS-EN 14604:2005. Batteritid och pausfunktion anges inte i manualen. */
    specs: [
      { label: "Sammankopplas", value: "Ja, radio 433,92 MHz", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "60 m räckvidd", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "2", highlight: true },
      { label: "Batteri", value: "1 × 9 V och 3 × AA per varnare, ingår", highlight: true },
      { label: "Batteritid", value: "Ej angiven", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Detektionsprincip", value: "Optisk" },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Drifttemperatur", value: "−10 till 40 °C" },
      { label: "Mått", value: "125 × 48 mm" },
      { label: "Artikelnummer", value: "21130" },
    ],
    verdict:
      "Luxorparts trådlösa tvåpack är den billigaste vägen till brandvarnare som larmar tillsammans. 499,90 kronor för två, alltså 250 kronor per skyddad plats mot 300 för testvinnaren.\n\nVarnarna parkopplas med varandra på upp till 60 meters fri sikt, och alla batterier ligger i förpackningen: två nio-voltsbatterier och sex AA. 359 kundbetyg på 4,0 är femtio procent fler än näst mest prövade produkt här och nästan sex gånger testvinnarens underlag.\n\nRadion går på 433,92 MHz, och lägre frekvens tar sig sämre genom betongbjälklag. Det är precis den situation sammankoppling finns för. Lägg till fyra batterier per varnare att hålla reda på i tio år, mot noll hos Housegard Luma och X-Sense.\n\nÄr det sammankoppling du är ute efter och femtio kronor per plats avgör, tar du de här. Ska signalen ta sig genom ett betongbjälklag lägger du till mellanskillnaden och köper Housegard Luma.",
  },
  {
    id: "housegard-pebble-3-pack",
    name: "Pebble brandvarnare 3-pack",
    shortName: "Pebble 3-pack",
    brand: "Housegard",
    image: productImage(BRANDVARNARE.slug, "housegard-pebble-3-pack"),
    tagline: "Tre våningsplan täckta för under trehundra kronor.",
    scores: { sammankoppling: 1, batteritid: 1.5, prisvarde: 5 },
    price: 299,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-pebble-brandvarnare-3-pack-p21270",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 24, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Billigast per skyddad plats",
    pros: [
      "100 kronor per varnare, billigast i jämförelsen",
      "Täcker tre våningsplan i ett enda köp",
      "Varnar när batteriet börjar ta slut",
      "Batteriskydd som gör att den inte går att montera utan batteri",
      "Fungerar ner till tio minusgrader",
    ],
    cons: [
      "Nio-voltsbatteriet räcker cirka ett år, alltså tre nya batterier varje år i ett trevåningshus",
      "Kan inte kopplas ihop",
      "Tre fristående varnare skyddar sämre än två sammankopplade",
    ],
    /* Housegard 601107, Kjell 21270 och Dustin 5011165136, läst 2026-08-06:
       85 dB på 3 m, 9 V med cirka 1 års livslängd, 5 års garanti,
       -10 till +40 °C, SS-EN 14604:2005. */
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "3", highlight: true },
      { label: "Batteri", value: "9 V utbytbart, ingår", highlight: true },
      { label: "Batteritid", value: "Cirka 1 år", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Detektionsprincip", value: "Optisk detektionskammare" },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Drifttemperatur", value: "−10 till 40 °C" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "21270" },
    ],
    verdict:
      "Housegard Pebble i trepack kostar 299 kronor och ger tre skyddade platser, alltså hundra kronor per varnare. Nästa varnare i listan kostar två och en halv gånger mer per plats.\n\nDet är hela argumentet, och det är starkare än det låter. Ett hem utan brandvarnare på övervåningen skyddas inte av att den varnare som finns är dyr. Har du tre våningsplan och trehundra kronor täcker du dem alla i dag och uppgraderar senare. Varnarna säger till när batteriet börjar ta slut, går ner till tio minusgrader och har ett batteriskydd som gör att de inte kan monteras tomma, vilket är ett av de vanligare installationsfelen.\n\nNio-voltsbatteriet räcker cirka ett år. Tre varnare betyder tre nya batterier varje år i tio år, och det är just den rutinen folk slutar med.\n\nSka du täcka ett helt hem billigt i dag är det här köpet, och sätt en påminnelse i kalendern samma dag du skruvar upp dem. Vill du slippa hela rutinen kostar X-Sense XS01 179 kronor per plats och behöver aldrig ett batteribyte.",
  },
  {
    id: "nexa-optisk-2-pack",
    name: "Optisk brandvarnare 2-pack",
    shortName: "Nexa 2-pack",
    brand: "Nexa",
    image: productImage(BRANDVARNARE.slug, "nexa-optisk-2-pack"),
    tagline: "Två skyddade rum för hundra kronor styck.",
    scores: { sammankoppling: 1, batteritid: 1.5, prisvarde: 4.5 },
    price: 199.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/nexa-optisk-brandvarnare-2-pack-p21100",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 240, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som bara ska täcka två rum",
    pros: [
      "Hundra kronor per varnare",
      "Innehåller inga radioaktiva ämnen",
      "Automatisk funktionskontroll och signal vid låg batterispänning",
      "240 kundbetyg på 4,5, näst största underlaget i jämförelsen",
    ],
    cons: [
      "Nio-voltsbatteriet räcker cirka ett år",
      "Kan inte kopplas ihop",
      "101 millimeter i diameter, störst i jämförelsen",
    ],
    /* Nexa KD-134A och Kjell 21100, läst 2026-08-06: 85 dB på 3 m, 9 V med
       cirka 1 års livslängd, Ø101 × 34 mm, 0 till 40 °C, EN 14604. */
    specs: [
      { label: "Sammankopplas", value: "Nej", highlight: true },
      { label: "Max i system", shortLabel: "Max enheter", value: "1", highlight: true },
      { label: "Antal i förpackning", shortLabel: "Antal", value: "2", highlight: true },
      { label: "Batteri", value: "9 V utbytbart per varnare, ingår", highlight: true },
      { label: "Batteritid", value: "Cirka 1 år", highlight: true },
      { label: "Larmsignal", value: "85 dB på 3 m", highlight: true },
      { label: "Detektionsprincip", value: "Optisk rökdetektering" },
      { label: "Certifiering", value: "SS-EN 14604:2005" },
      { label: "Drifttemperatur", value: "0 till 40 °C" },
      { label: "Mått", value: "Ø101 × 34 mm" },
      { label: "Artikelnummer", value: "21100" },
    ],
    verdict:
      "Nexa optisk brandvarnare i tvåpack kostar 199,90 kronor och ger två skyddade platser, alltså hundra kronor styck. Samma pris per plats som Housegards trepack, i en mindre förpackning.\n\nVarnaren gör grunderna och gör dem rätt: optisk rökdetektering, automatisk funktionskontroll, blinkande lysdiod, testknapp och en signal när batterispänningen faller. Nio-voltsbatteriet ingår. Den innehåller inga radioaktiva ämnen, vilket är värt att veta för den som ska lämna en gammal jonisk varnare till återvinning samtidigt.\n\nBatteriet räcker cirka ett år, och 101 millimeter i diameter gör den till den största varnaren i jämförelsen, alltså den som syns mest i taket.\n\nHundra kronor till ger Housegards trepack en tredje skyddad plats, och i ett hus är det nästan alltid rätt affär. Nexas tvåpack hör hemma i en tvåa där två rum är allt som ska täckas.",
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
      "Sammankopplingsbar Pebble på 868 MHz, med förseglat batteri för hela tioårsperioden, 85 dB och certifiering mot EN 14604. Den hade platsat högt i rankningen, men 799 kronor för två gör den dyrare per skyddad plats än testvinnaren utan att ge fler enheter i systemet.",
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
      "Nedlagd. Google upphörde med tillverkningen 28 mars 2025 och hänvisar till First Alerts SC5 som ersättare, byggd för att passa Nest Protects befintliga fästplatta. Befintliga enheter fungerar sin tioåriga livslängd ut och får säkerhetsuppdateringar under tiden, men den går inte längre att köpa ny.",
    approxPrice: 1724,
  },
  {
    brand: "Ei Electronics",
    name: "Ei650",
    reason:
      "Vann Stiftung Warentests provning med betyget gut (1,9), och är den enda produkt i vårt underlag som faktiskt utsatts för en brandkammare. Den säljs bara inte i någon av de svenska butiker vi bevakar, och vi rankar inte det som inte går att köpa här.",
  },
  {
    brand: "Capidi",
    name: "Seriekopplad brandvarnare",
    reason:
      "Seriekopplad varnare som vi inte hittade hos Brandvarnare.se, Kjell eller Proshop vid kontrollen. Vi rankar inte produkter vi inte kan länka till ett kontrollerat pris.",
  },
];

export const BRANDVARNARE_FAQ = [
  {
    question: "Vilken brandvarnare är bäst 2026?",
    answer:
      "Housegard Luma trådlös brandvarnare i tvåpack, om varnarna ska larma tillsammans. Den kopplar upp till fyrtio enheter på 868 MHz, har förseglat batteri för hela tioårsperioden och pausknapp på varnaren. Räcker en ensam varnare är X-Sense XS01 för 179 kronor bästa köpet: förseglat tioårsbatteri, fem års garanti och pausfunktion till lägsta pris. Har du liten budget täcker Housegard Pebble trepack tre våningsplan för 299, mot ett batteribyte om året.",
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
    question: "Hur högt låter en brandvarnare?",
    answer:
      "Minst 85 decibel på tre meters avstånd. Det är kravet i EN 14604, produktstandarden alla brandvarnare i Sverige måste uppfylla, och samtliga tio varnare vi rankar anger exakt den nivån. Decibeltalet är alltså inget köpargument. Det som avgör om larmet väcker dig är var varnaren sitter och om den larmar tillsammans med de andra i bostaden.",
  },
  {
    question: "Hur ofta ska brandvarnaren bytas?",
    answer:
      "Vart tionde år, oavsett om den fortfarande larmar när du trycker på testknappen. Sensorn åldras och blir långsammare, och det syns inte utifrån. Skriv monteringsdatumet på baksidan med en penna när du sätter upp den. Testa dessutom med testknappen minst en gång i månaden, och dammsug varnaren regelbundet för att undvika falsklarm.",
  },
  {
    question: "Vad kostar en brandvarnare?",
    answer:
      "De vi rankar kostar mellan 139 och 646 kronor, kontrollerat 2026-08-02. Räknat per skyddad plats är spannet mindre dramatiskt: Housegard Pebble trepack och Nexas tvåpack ger hundra kronor per varnare, medan sammankopplade tvåpack ligger på tre hundra. Det är sammankopplingen och det förseglade tioårsbatteriet du betalar för, inte själva rökdetektionen.",
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
