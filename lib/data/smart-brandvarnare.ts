import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { SMART_BRANDVARNARE } from "@/lib/categories";

/**
 * Smarta brandvarnare. Underlag i .agent/research-brandvarnare.md, §7 och §8.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, lagerstatus, batterityper, batteritider,
 * protokoll, ljudnivåer, mått, GTIN och kundbetyg. Allt läst 2026-08-02 på
 * butikens egen produktsida.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte tänt eld på något.
 *
 * ## Sidans vinkel: Google la ner Nest Protect
 *
 * Google upphörde med tillverkningen 28 mars 2025 och hänvisar till First
 * Alerts SC5. Proshop anger `Discontinued` på båda varianterna, Kjell har den
 * slut. Ändå rankar Brandinfos test daterat 2026 den fortfarande, och den låg i
 * toppen hos flera svenska jämförelser när vi mätte dem.
 *
 * Det är samma fel som `/elektrisk-rullgardin` byggdes för att rätta, och det
 * är skälet till att kriteriet **oberoende av tillverkaren** väger lika tungt
 * som vad appen gör. En brandvarnare ska sitta i taket i tio år. Nest Protect
 * lanserades 2015 och lades ner 2025.
 *
 * ## Gränsen mot /brandvarnare
 *
 * Housegard Luma finns på båda sidorna som två olika köp. Där rankas tvåpacket
 * för 599 kronor, som seriekopplas med radio helt utan app. Här rankas
 * systemet, alltså tvåpacket plus hubben för 499,90, till 1 098,90 kronor.
 *
 * ## Butiksfördelning
 *
 * Fyra länkar till Brandvarnare.se, tre till Kjell och en till Proshop.
 * Testvinnaren hamnade hos Kjell. Brandvarnare.se, som är den enda butiken i
 * kategorin med tillåten betalannonsering, tar platserna tre och fyra med
 * X-Sense-systemen.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "housegard-luma-system",
    name: "Luma-system: 2 varnare och smart hubb",
    shortName: "Luma-system",
    brand: "Housegard",
    image: productImage(SMART_BRANDVARNARE.slug, "housegard-luma-system"),
    tagline: "Larmar ihop över egen radio. Hubben lägger bara till telefonen.",
    scores: { app: 4.5, oberoende: 4.5, batteritid: 4.5, kravs: 2.5, prisvarde: 2.5 },
    price: 1098.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-luma-smart-hubb-p21221",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 2, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst utan molnberoende",
    pros: [
      "Varnarna larmar ihop över 868 MHz utan att hubben är inblandad",
      "Upp till 40 enheter i systemet",
      "Förseglat batteri som räcker varnarens hela tioåriga livslängd",
      "Smart Life är ett av de största ekosystemen, inte en ensam tillverkares app",
      "Hubben har hundra meters räckvidd fri sikt",
    ],
    cons: [
      "Hubben kostar 499,90 kronor utöver varnarna",
      "Hubben måste sitta i ett eluttag och drar ström dygnet runt",
      "549 kronor per skyddad plats i den här konfigurationen",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, via Luma smart hubb", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, radio 868 MHz", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "2", highlight: true },
      { label: "Batteri", value: "123A förseglat", highlight: true },
      { label: "Batteritid", value: "Upp till 10 år", highlight: true },
      { label: "App", value: "Smart Life" },
      { label: "Max i system", value: "40 enheter" },
      { label: "Räckvidd hubb", value: "100 m fri sikt" },
      { label: "Hubbens ström", value: "USB-C, under 1,5 W" },
      { label: "Larmsignal", value: "85 dB på 3 m" },
    ],
    verdict:
      "Det här är den enda produkten i jämförelsen där uppkopplingen är ett tillägg och inte en förutsättning. Varnarna talar med varandra på 868 MHz helt utan hubben. Larmar den i källaren larmar den i sovrummet, och det fungerar under strömavbrott, under wifi-strul och den dag Housegard skulle lägga ner appen.\n\nHubben lägger till en enda sak: att telefonen får veta. Det är ett stort värde, men det är inte det som håller huset säkert, och den skillnaden är exakt vad Nest Protect-historien handlar om.\n\nSmart Life är dessutom inte Housegards egen app utan en av de största plattformarna som finns, med tusentals produkter från hundratals tillverkare. Risken att den försvinner är av en annan storleksordning än risken att en enskild tillverkare tröttnar.\n\nPriset är svagheten. 1 098,90 kronor för två skyddade platser är 549 styck, och vill du täcka fyra rum kostar det 2 296. Då är X-Sense FS61 med sex varnare billigare per plats.",
  },
  {
    id: "netatmo-smart-brandvarnare",
    name: "Smart brandvarnare",
    shortName: "Netatmo",
    brand: "Netatmo",
    image: productImage(SMART_BRANDVARNARE.slug, "netatmo-smart-brandvarnare"),
    tagline: "Bäst app i testet, och tio års batteri. Men helt beroende av Netatmo.",
    scores: { app: 5, oberoende: 2.5, batteritid: 5, kravs: 4.5, prisvarde: 1.5 },
    price: 910,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Netatmo-Smart-Brandvarnare/2679290",
    priceCheckedAt: PRICE_CHECKED,
    award: "runnerup",
    superlative: "Bäst app",
    pros: [
      "Tio års integrerat batteri, ingenting att byta",
      "Självtestande, upptäcker en trasig sensor utan att du gör något",
      "Går att tysta från mobilen när du står nära larmet",
      "Ingen hubb, ansluter direkt till wifi",
      "HomeKit-stöd via Bluetooth LE",
      "Uppfyller EN 14604, inga radioaktiva ämnen",
    ],
    cons: [
      "910 kronor för en enda skyddad plats, dyrast per rum i jämförelsen",
      "Notiserna går genom Netatmos moln",
      "Slut hos Kjell, där den dessutom kostar 1 090",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, wifi direkt", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, lokal siren", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "1", highlight: true },
      { label: "Batteri", value: "Integrerat, byt enheten", highlight: true },
      { label: "Batteritid", value: "10 år", highlight: true },
      { label: "App", value: "Netatmo, plus HomeKit" },
      { label: "Anslutning", value: "Wi-Fi 2,4 GHz och Bluetooth LE" },
      { label: "Larmsignal", value: "85 dB" },
      { label: "Självtest", value: "Ja" },
      { label: "Certifiering", value: "EN 14604, CE" },
      { label: "Mått", value: "Ø115 × 44 mm" },
      { label: "GTIN", value: "3700730502269" },
    ],
    verdict:
      "Appen är den bästa i jämförelsen och med marginal. Den skickar notis vid rök eller hög värme, den självtestar så att en trasig sensor upptäcks utan att du klättrar upp, och den kan tystas från mobilen när du står nära larmet. Den sista funktionen är underskattad: falsklarm klockan sju på morgonen tystas annars med en kvast.\n\nTio års integrerat batteri betyder att du aldrig rör den. När batteriet är slut är också sensorn för gammal, och du byter hela enheten. Det är rätt konstruktion för en produkt som ska glömmas bort.\n\nTvå saker drar ner den. Niohundratio kronor för ett enda rum är dyrast per skyddad plats i hela jämförelsen, och en brandvarnare i hallen skyddar hallen.\n\nOch så beroendet. Notiserna går genom Netatmos moln, och det är precis den konstruktion Google Nest Protect hade när Google lade ner den i mars 2025. HomeKit-stödet mjukar upp det något, eftersom Apple Home kan larma lokalt, men bara om du redan bor i det ekosystemet. Vi köper hellre ett larm vars grundfunktion inte hänger på att ett franskt bolag fortsätter driva en server.",
  },
  {
    id: "x-sense-fs61",
    name: "FS61: basstation och 6 rökvarnare",
    shortName: "X-Sense FS61",
    brand: "X-Sense",
    image: productImage(SMART_BRANDVARNARE.slug, "x-sense-fs61"),
    tagline: "Sex varnare och basstation. Billigast per rum av systemen.",
    scores: { app: 4, oberoende: 4, batteritid: 3, kravs: 4, prisvarde: 3.5 },
    price: 1897,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-fs61/",
    priceCheckedAt: PRICE_CHECKED,
    award: "premium",
    superlative: "Bäst för hela villan",
    pros: [
      "Sex varnare och basstationen ingår, alltså 316 kronor per rum",
      "Larmar lokalt även om basstationen är urkopplad eller strömmen gått",
      "Inga löpande abonnemangskostnader",
      "Går att bygga ut med värme-, CO- och vattenvarnare i samma app",
      "Flera anläggningar i samma app, alltså även sommarstugan",
    ],
    cons: [
      "Femårs utbytbart CR123A-batteri, inte tio års förseglat",
      "Nästan tvåtusen kronor i en klick",
      "X-Sense Home Security är tillverkarens egen app",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, via basstation SBS50", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, även vid strömavbrott", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "6", highlight: true },
      { label: "Batteri", value: "CR123A litium, utbytbart", highlight: true },
      { label: "Batteritid", value: "5 år", highlight: true },
      { label: "App", value: "X-Sense Home Security" },
      { label: "Basstation", value: "SBS50, ingår" },
      { label: "Abonnemang", value: "Nej" },
      { label: "Anslutning", value: "Wi-Fi 2,4 GHz" },
      { label: "Garanti", value: "5 år" },
    ],
    verdict:
      "Räknat per skyddad plats är det här det billigaste uppkopplade systemet i jämförelsen. Sex varnare och en basstation för 1 897 kronor blir 316 per rum, mot 549 för Luma och 910 för Netatmo. En villa med två våningar, källare och sovrum får full täckning i ett köp.\n\nBasstationen ingår, så det finns ingen dold andrakostnad, och X-Sense tar inget abonnemang. Systemet går att bygga ut med värmevarnare till köket, CO-varnare vid pannan och vattenvarnare i tvättstugan, allt i samma app. Flera anläggningar går att lägga upp, vilket är den funktion man vill ha till sommarstugan.\n\nX-Sense skriver också ut det som betyder mest här: varnarna larmar lokalt även om basstationen är urkopplad eller om strömmen gått i huset. Appen är ett tillägg, inte en förutsättning.\n\nSvagheten är batteriet. Femårs utbytbart CR123A mot Netatmos tio år integrerat betyder ett byte halvvägs genom varnarens liv, och med sex varnare är det sex batterier att komma ihåg samtidigt.",
  },
  {
    id: "x-sense-fs31",
    name: "FS31: basstation och 3 rökvarnare",
    shortName: "X-Sense FS31",
    brand: "X-Sense",
    image: productImage(SMART_BRANDVARNARE.slug, "x-sense-fs31"),
    tagline: "Samma system som FS61, i den storlek de flesta faktiskt behöver.",
    scores: { app: 4, oberoende: 4, batteritid: 3, kravs: 4, prisvarde: 3 },
    price: 1314,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-fs31/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Rätt storlek för de flesta",
    pros: [
      "Tre varnare och basstationen ingår",
      "Larmar lokalt även om basstationen är urkopplad",
      "Inga löpande kostnader",
      "Samma utbyggbarhet som FS61",
    ],
    cons: [
      "438 kronor per skyddad plats, mot 316 för FS61",
      "Femårs utbytbart batteri",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, via basstation SBS50", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, även vid strömavbrott", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "3", highlight: true },
      { label: "Batteri", value: "CR123A litium, utbytbart", highlight: true },
      { label: "Batteritid", value: "5 år", highlight: true },
      { label: "App", value: "X-Sense Home Security" },
      { label: "Basstation", value: "SBS50, ingår" },
      { label: "Abonnemang", value: "Nej" },
    ],
    verdict:
      "Tre varnare täcker en normal villa: en per våningsplan plus en utanför sovrummen. Det är den storlek de flesta hushåll faktiskt behöver, och det är därför den här ligger i jämförelsen bredvid sin större syster.\n\nAllt annat är identiskt med FS61. Samma basstation, samma app, samma lokala larm vid strömavbrott, samma femårsbatteri.\n\nDet enda som skiljer är räknestycket. 1 314 kronor delat på tre blir 438 per plats, mot 316 hos FS61. Behöver du fyra eller fler varnare är sexpacket alltså billigare trots att prislappen är högre, och det är värt att räkna efter innan du beställer det mindre.",
  },
  {
    id: "cleverio-smart-rok-varme",
    name: "Smart rök- och värmedetektor",
    shortName: "Cleverio",
    brand: "Cleverio",
    image: productImage(SMART_BRANDVARNARE.slug, "cleverio-smart-rok-varme"),
    tagline: "Trehundra kronor för notis i mobilen, utan hubb. Billigast vägen in.",
    scores: { app: 4, oberoende: 2, batteritid: 2.5, kravs: 4.5, prisvarde: 4.5 },
    price: 299.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/cleverio-smart-rok-och-varmedetektor-p51328",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 116, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Billigast med app",
    pros: [
      "Under trehundra kronor för notis i telefonen",
      "Reagerar på både rök och snabb värmeutveckling",
      "Ansluter direkt till wifi, ingen hubb behövs",
      "Kan trigga andra Cleverio-enheter, till exempel tända lampor",
      "116 kundbetyg, näst störst underlag i jämförelsen",
    ],
    cons: [
      "Cleverio är Kjells eget varumärke, och appen är deras",
      "Butiken anger ingen batteritid",
      "En enhet, en skyddad plats",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, wifi direkt", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, lokal siren", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "1", highlight: true },
      { label: "Batteri", value: "Ej angivet av butiken", highlight: true },
      { label: "Batteritid", value: "Ej angiven av butiken", highlight: true },
      { label: "App", value: "Cleverio" },
      { label: "Detekterar", value: "Rök och snabb värmeutveckling" },
      { label: "Larmsignal", value: "85 dB" },
      { label: "Automation", value: "Kan trigga andra Cleverio-enheter" },
    ],
    verdict:
      "Tvåhundranittionio kronor är en fjärdedel av vad Netatmo kostar, och du får ändå det viktigaste: en notis i telefonen när det brinner och du inte är hemma. Ingen hubb, ingen basstation, ingen extra kostnad.\n\nDen reagerar dessutom på både rök och snabb värmeutveckling, vilket är ovanligt i det här prisläget och gör den mer användbar nära kök än en ren rökvarnare.\n\nDet du betalar med är beroendet. Cleverio är Kjells eget varumärke och appen är deras, vilket betyder att både produkten och tjänsten hänger på en enda kedjas fortsatta intresse för kategorin. Det är samma sorts risk som fällde Nest Protect, fast med en mindre aktör.\n\nOch butiken anger ingen batteritid alls, vilket är en märklig utelämning på en produkt vars hela poäng är att sitta i ett tak i flera år. Vi gissar inte, men räkna med att behöva se till den.\n\nKöp den som ett billigt sätt att komplettera ett hem som redan har vanliga varnare, inte som grunden i ett skydd du ska lita på i tio år.",
  },
  {
    id: "fibaro-smoke-sensor",
    name: "Z-Wave-rökdetektor",
    shortName: "Fibaro",
    brand: "Fibaro",
    image: productImage(SMART_BRANDVARNARE.slug, "fibaro-smoke-sensor"),
    tagline: "Den enda som fortsätter fungera oavsett vad tillverkaren gör.",
    scores: { app: 3.5, oberoende: 5, batteritid: 2, kravs: 1.5, prisvarde: 2.5 },
    price: 559,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/fibaro-z-wave-rokdetektor-p50779",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 25, scale: 5, checkedAt: PRICE_CHECKED },
    award: "editor",
    superlative: "Redaktionens val till den som vill äga sitt system",
    pros: [
      "Z-Wave är öppet, så den lyder din styrenhet och inte tillverkarens moln",
      "Fungerar med Fibaro-controllers, Tellstick och Home Assistant",
      "Varnar även vid hastiga temperaturökningar och över 54 °C",
      "Minst i jämförelsen: 65 mm i diameter, 28 mm hög",
      "Inbyggd siren och sabotageskydd",
    ],
    cons: [
      "Kräver en Z-Wave-styrenhet, den dyraste förutsättningen i jämförelsen",
      "Två års batteritid, kortast av alla",
      "559 kronor för en plats, plus styrenheten",
    ],
    specs: [
      { label: "Når telefonen", value: "Ja, via Z-Wave-styrenhet", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, inbyggd siren", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "1", highlight: true },
      { label: "Batteri", value: "CR123A, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 2 år", highlight: true },
      { label: "Protokoll", value: "Z-Wave, öppet" },
      { label: "Extra", value: "Temperaturvarning över 54 °C" },
      { label: "Sabotageskydd", value: "Ja" },
      { label: "Mått", value: "Ø65 × 28 mm" },
    ],
    verdict:
      "Sexa på poäng, och ändå Redaktionens val, för den är den enda produkten på sidan som besvarar sidans egen fråga.\n\nZ-Wave är ett öppet protokoll. Detektorn talar med din styrenhet, inte med en molntjänst, och den bryr sig inte om vem som äger varumärket Fibaro nästa år. Kjell anger att den fungerar med Fibaros egna controllers och med Tellstick, och den fungerar med Home Assistant. Läggs Fibaro ner i morgon sitter din brandvarnare kvar och gör exakt samma sak.\n\nDet är inte en teoretisk fördel. Google lade ner Nest Protect i mars 2025, och de var det största namnet i kategorin.\n\nDen är dessutom minst i jämförelsen, sextiofem millimeter, och varnar för hastiga temperaturökningar och allt över femtiofyra grader utöver rök.\n\nHaken är tvådelad. Två års batteritid är kortast i hela jämförelsen, alltså fem byten under varnarens tioåriga liv. Och en Z-Wave-styrenhet kostar mer än detektorn. Har du redan ett Z-Wave-hem är det här ett självklart köp. Har du inte det är det ett dyrt sätt att börja.",
  },
  {
    id: "x-sense-xs01-m-3-pack",
    name: "XS01-M rökvarnare 3-pack",
    shortName: "XS01-M 3-pack",
    brand: "X-Sense",
    image: productImage(SMART_BRANDVARNARE.slug, "x-sense-xs01-m-3-pack"),
    tagline: "Sensorerna ur systemet, sålda utan basstationen. Läs det två gånger.",
    scores: { app: 2, oberoende: 4, batteritid: 3, kravs: 2, prisvarde: 4 },
    price: 890,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xs01-m-3-pack/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Utbyggnad till ett befintligt system",
    pros: [
      "297 kronor per varnare, billigast per plats av X-Sense-produkterna",
      "Sammankopplas med Link+ helt utan basstation",
      "Fem års garanti",
    ],
    cons: [
      "Ingen basstation ingår, alltså ingen app om du inte redan har SBS50",
      "Femårs utbytbart CR123A",
      "Lätt att förväxla med FS31, som ser nästan likadan ut i butiken",
    ],
    specs: [
      { label: "Når telefonen", value: "Endast med SBS50, som säljs separat", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, Link+ mellan varnarna", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "3", highlight: true },
      { label: "Batteri", value: "CR123A litium, utbytbart", highlight: true },
      { label: "Batteritid", value: "5 år", highlight: true },
      { label: "Basstation", value: "Ingår inte" },
      { label: "Garanti", value: "5 år" },
    ],
    verdict:
      "Det här är den produkt man köper av misstag, och därför står den i jämförelsen.\n\nXS01-M är sensorn ur FS31 och FS61, såld separat. Butikens egen text är tydlig: i det här paketet ingår ingen basstation. Utan SBS50 får du alltså tre varnare som larmar tillsammans över Link+, vilket är bra, men ingenting når din telefon. Du har köpt en icke-smart produkt på en smart sida.\n\nHar du redan basstationen är det däremot det billigaste sättet att bygga ut: 297 kronor per varnare mot 316 i FS61 och 438 i FS31.\n\nKontrollera alltså vad du redan äger innan du klickar. Ska du börja från noll är FS31 för 1 314 kronor rätt produkt, inte den här för 890 plus en basstation du sedan måste hitta.",
  },
  {
    id: "x-sense-xs0d-mr",
    name: "XS0D-MR rökvarnare",
    shortName: "XS0D-MR",
    brand: "X-Sense",
    image: productImage(SMART_BRANDVARNARE.slug, "x-sense-xs0d-mr"),
    tagline: "Enstaka sensor till ett system du redan har. Annars fel produkt.",
    scores: { app: 2, oberoende: 4, batteritid: 3, kravs: 2, prisvarde: 2.5 },
    price: 398,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-xs0d-mr/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Komplettering, styckvis",
    pros: [
      "Passar in i ett befintligt Link+-system",
      "Fem års garanti",
      "Batteriet medföljer",
    ],
    cons: [
      "Ingen basstation, alltså ingen app på egen hand",
      "398 kronor för en enda plats",
      "Femårs utbytbart batteri",
    ],
    specs: [
      { label: "Når telefonen", value: "Endast med SBS50, som säljs separat", highlight: true },
      { label: "Larmar utan app", shortLabel: "Utan app", value: "Ja, Link+ mellan varnarna", highlight: true },
      { label: "Antal varnare", shortLabel: "Varnare", value: "1", highlight: true },
      { label: "Batteri", value: "CR123A litium, utbytbart", highlight: true },
      { label: "Batteritid", value: "5 år", highlight: true },
      { label: "Basstation", value: "Ingår inte" },
      { label: "Garanti", value: "5 år" },
    ],
    verdict:
      "Samma sak som trepacket ovan, men styckvis och dyrare per plats. Trehundranittioåtta kronor för en varnare som inte når din telefon utan en basstation du köper separat.\n\nDen finns för ett enda ändamål: du har redan ett X-Sense-system och behöver täcka ett rum till. Då är den rätt, och då fungerar den precis som de andra i systemet.\n\nSka du börja från noll är den fel på varje sätt. Ett paket med basstation kostar mer men ger dig faktiskt det sidan handlar om, och ett vanligt sammankopplat tvåpack utan app kostar mindre om du ändå inte tänker koppla upp något.",
  },
];

export const SMART_BRANDVARNARE_PRODUCTS: Product[] = resolveProducts(
  SMART_BRANDVARNARE,
  SEEDS,
);

/**
 * Filter till jämförelsen. Den viktigaste frågan står först: fungerar larmet
 * utan tillverkarens moln?
 */
type SmartTrait = {
  id: string;
  hubIncluded: boolean;
  localAlarm: boolean;
  openProtocol: boolean;
  multi: boolean;
};

const TRAITS: SmartTrait[] = [
  { id: "housegard-luma-system", hubIncluded: true, localAlarm: true, openProtocol: false, multi: true },
  { id: "netatmo-smart-brandvarnare", hubIncluded: true, localAlarm: true, openProtocol: false, multi: false },
  { id: "x-sense-fs61", hubIncluded: true, localAlarm: true, openProtocol: false, multi: true },
  { id: "x-sense-fs31", hubIncluded: true, localAlarm: true, openProtocol: false, multi: true },
  { id: "cleverio-smart-rok-varme", hubIncluded: true, localAlarm: true, openProtocol: false, multi: false },
  { id: "fibaro-smoke-sensor", hubIncluded: false, localAlarm: true, openProtocol: true, multi: false },
  { id: "x-sense-xs01-m-3-pack", hubIncluded: false, localAlarm: true, openProtocol: false, multi: true },
  { id: "x-sense-xs0d-mr", hubIncluded: false, localAlarm: true, openProtocol: false, multi: false },
];

export const SMART_BRANDVARNARE_FILTERS: ComparisonFilter[] = [
  {
    key: "komplett",
    label: "Allt som behövs ingår",
    ids: TRAITS.filter((t) => t.hubIncluded).map((t) => t.id),
  },
  {
    key: "oppet",
    label: "Öppet protokoll",
    ids: TRAITS.filter((t) => t.openProtocol).map((t) => t.id),
  },
  {
    key: "flera",
    label: "Flera varnare ingår",
    ids: TRAITS.filter((t) => t.multi).map((t) => t.id),
  },
];

/**
 * Övervägda men inte rankade.
 *
 * Google Nest Protect står först med flit. Den är kategorins mest kända namn,
 * den ligger fortfarande högt hos svenska jämförelser, och den går inte att
 * köpa.
 */
export const SMART_BRANDVARNARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Google",
    name: "Nest Protect",
    reason:
      "Nedlagd. Google upphörde med tillverkningen 28 mars 2025 och har gått i partnerskap med First Alert, vars SC5 säljs som direkt ersättare och passar Nest Protects befintliga fästplatta. Proshop anger Discontinued på både batteri- och 230-voltsversionen, 1 724 respektive 1 499 kronor, och Kjell har den slut på 1 590. Befintliga enheter fortsätter fungera och få säkerhetsuppdateringar under sin tioåriga livslängd, sju år för första generationen. Vi tar upp den här eftersom flera svenska jämförelser fortfarande rankar den, bland annat i ett test daterat 2026.",
    approxPrice: 1724,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Google-Nest-Protect-Batteri-Brandvarnare-2-Gen/2689265",
  },
  {
    brand: "First Alert",
    name: "SC5 Smart Smoke & CO Alarm",
    reason:
      "Googles egen anvisade ersättare för Nest Protect, framtagen i partnerskap med Google Nest och byggd för att passa Nest Protects fästplatta. Vi hittade den inte hos någon svensk butik vi bevakar, och kan därför varken kontrollera pris eller att den är CE-märkt mot EN 14604. En amerikansk ersättare som inte säljs här hjälper ingen svensk läsare, så den rankas inte.",
  },
  {
    brand: "Housegard",
    name: "Luma smart hubb, lös",
    reason:
      "Hubben såld separat för 499,90 kronor, för den som redan har Luma-varnare i taket och bara vill lägga till notiser i telefonen. Vi rankar systemet i stället, eftersom en hubb utan varnare inte är ett köp någon gör, men det här är den billigaste vägen till en smart brandvarnare om du redan äger halva lösningen.",
    approxPrice: 499.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-luma-smart-hubb-p21221",
  },
  {
    brand: "X-Sense",
    name: "XS01-M, styckvis",
    reason:
      "En enda XS01-M för 332 kronor. Samma invändning som trepacket vi rankar, fast utan mängdrabatten: ingen basstation ingår, alltså ingen app. Med i listan för att prisbilden ska gå att jämföra, eftersom butiken säljer samma sensor i tre storlekar och bara den största innehåller det som gör systemet smart.",
    approxPrice: 332,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/xsense_xs01m_rokvarnare/",
  },
  {
    brand: "Housegard",
    name: "Pebble Link trådlös 2-pack",
    reason:
      "Sammankopplas över 868 MHz och har förseglat tioårsbatteri, men saknar app helt. Den hör därför hemma på vår sida om vanliga brandvarnare och inte här. Var dessutom slut hos Kjell vid kontrollen.",
    approxPrice: 799,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandvarnare/housegard-pebble-link-tradlos-brandvarnare-2-pack-p65305",
  },
  {
    brand: "Aqara",
    name: "Smoke Detector",
    reason:
      "Zigbee-ansluten rökvarnare som flera internationella jämförelser tar upp, bland annat Testix. Vi hittade den inte hos Brandvarnare.se, Kjell eller Proshop vid kontrollen 2026-08-02 och rankar inte produkter vi inte kan länka till ett kontrollerat pris.",
  },
];

export const SMART_BRANDVARNARE_FAQ = [
  {
    question: "Är Google Nest Protect nedlagd?",
    answer:
      "Ja. Google upphörde med tillverkningen 28 mars 2025 och hänvisar till First Alerts SC5 som ersättare. Befintliga enheter fortsätter fungera och få säkerhetsuppdateringar under sin tioåriga livslängd, räknat från tillverkningsdatum, och sju år för första generationen. Proshop anger Discontinued på båda varianterna och Kjell har den slut. Flera svenska jämförelser rankar den fortfarande, vilket är värt att veta innan du litar på en topplista.",
  },
  {
    question: "Vilken smart brandvarnare är bäst 2026?",
    answer:
      "Housegard Luma-systemet, alltså två varnare plus smart hubb för 1 098,90 kronor. Det är den enda produkten i jämförelsen där uppkopplingen är ett tillägg och inte en förutsättning: varnarna larmar ihop över egen radio även utan hubben, vid strömavbrott och den dag appen skulle försvinna. Vill du täcka fler rum är X-Sense FS61 billigare per plats.",
  },
  {
    question: "Vad händer med en smart brandvarnare om tillverkaren lägger ner?",
    answer:
      "Det beror helt på konstruktionen, och det är den viktigaste frågan i kategorin. En varnare som talar ett öppet protokoll, som Fibaros Z-Wave, lyder din egen styrenhet och påverkas inte alls. En varnare som bara talar med tillverkarens moln tappar appen och notiserna och blir en vanlig siren. Grundfunktionen, alltså att tjuta vid rök, finns kvar i båda fallen eftersom den sitter i själva enheten.",
  },
  {
    question: "Behöver en smart brandvarnare en hubb?",
    answer:
      "Det beror på modellen. Cleverio och Netatmo ansluter direkt till ditt wifi och behöver ingenting mer. Housegard Luma behöver sin hubb för att nå telefonen, men larmar ändå ihop utan den. X-Sense XS01-M och XS0D-MR kräver basstationen SBS50, som säljs separat och inte ingår i sensorpaketen. Fibaro kräver en Z-Wave-styrenhet.",
  },
  {
    question: "Vad kostar en smart brandvarnare?",
    answer:
      "De vi rankar kostar mellan 299,90 och 1 897 kronor, kontrollerat 2026-08-02. Räknat per skyddad plats är spannet 297 till 910 kronor. Billigast per rum är X-Sense FS61 med sex varnare och basstation, dyrast är Netatmo som skyddar ett rum för 910. Lägsta tröskeln in i kategorin är Cleverio för 299,90.",
  },
  {
    question: "Är det värt att betala extra för en smart brandvarnare?",
    answer:
      "Bara om du faktiskt är borta. Uppkopplingen tillför en enda sak: att du får veta något när du inte är hemma. Är någon nästan alltid hemma hörs sirenen ändå, och då är en vanlig sammankopplad brandvarnare både billigare och mer robust. Är bostaden tom om dagarna, eller står den tom delar av året, är notisen värd pengarna.",
  },
  {
    question: "Fungerar smarta brandvarnare vid strömavbrott?",
    answer:
      "Själva varnaren gör det, eftersom den går på batteri. Frågan är om larmet når din telefon. X-Sense skriver uttryckligen att deras varnare larmar lokalt även om basstationen är urkopplad eller strömmen gått. Housegard Luma larmar ihop över radio utan hubben. En varnare som bara talar wifi tystnar däremot i telefonen så länge routern är strömlös.",
  },
  {
    question: "Kan man tysta ett falsklarm från mobilen?",
    answer:
      "Netatmo kan det, förutsatt att telefonen är i närheten av larmet. Det är en av de mer användbara appfunktionerna i kategorin, eftersom falsklarm oftast kommer när man lagar mat och står med händerna fulla. De flesta andra kräver att du trycker på pausknappen på själva varnaren, alltså att du når upp till taket.",
  },
  {
    question: "Vad är skillnaden mot en vanlig sammankopplad brandvarnare?",
    answer:
      "En sammankopplad brandvarnare larmar i hela huset när en av dem känner rök, helt utan wifi eller app. En smart brandvarnare gör samma sak och skickar dessutom en notis till telefonen. Sammankopplingen är det som räddar liv, notisen är det som räddar huset när ingen är hemma. Vi har en separat jämförelse av de sammankopplade som klarar sig utan app.",
  },
  {
    question: "Behöver smarta brandvarnare abonnemang?",
    answer:
      "Ingen av dem vi rankar kräver det. X-Sense skriver uttryckligen ut att det inte finns några löpande abonnemangskostnader, och Housegard, Netatmo, Cleverio och Fibaro tar heller inget. Det skiljer kategorin från övervakningskameror, där molnlagring ofta kostar månadsvis. Kontrollera ändå innan köp, eftersom det är en avgift som kan införas i efterhand.",
  },
];
