import type { Category } from "@/lib/products";

/**
 * The single registry of what test pages exist, which category they belong to
 * and which ones are published yet.
 *
 * Before this file the same list lived in four places: NAV in lib/site.ts, a
 * local const on the homepage, LIVE_CATEGORY_SLUGS in app/sitemap.ts and
 * TEST_PAGES in lib/test-pages.ts. Nav, sitemap, search index, homepage and the
 * categories all read from here now, so adding a test page is one entry.
 *
 * Deliberately free of imports beyond the Category type: lib/site.ts reads
 * this, and lib/site.ts is read by nearly everything.
 */

/* `satisfies` rather than `:` so `href` stays a known string here, while the
   Category type keeps it optional for categories that have no page yet. */
export const SMART_HEM = {
  key: "smart-hem",
  label: "Smart hem",
  href: "/smart-hem",
} satisfies Category;

/**
 * Säkerhet, öppnad 2026-08-02 med /vattenlarm.
 *
 * Fick sin category samma dag som /brandvarnare landade. Skälet var inte främst
 * smulan utan huvudmenyn: den listade varje kategori platt och sköt ut
 * sidhuvudet utanför fönstret så fort kategorierna blev fler än tio. Menyn
 * visar nu grupper, och en grupp utan `href` hoppas över. Se lib/site.ts.
 *
 * Gruppen planeras bära sex sidor enligt .agent/plans/sidkarta-framat.md:
 * vattenlarm, brandvarnare, hemlarm, kodlås, övervakningskamera och
 * dörrklocka med kamera. Fyra av dem låg felaktigt under Smart hem, eftersom
 * den som söker brandvarnare inte tänker på det som en smart hem-produkt.
 */
export const SAKERHET = {
  key: "sakerhet",
  label: "Säkerhet",
  href: "/sakerhet",
} satisfies Category;

/**
 * Hem & hushåll, öppnad 2026-08-03 med /luftrenare.
 *
 * Den bredaste av grupperna, och det är avsiktligt. Den bär två kluster som
 * inte hör hemma någon annanstans:
 *
 * - **Luften inomhus.** Luftrenare, och på sikt luftfuktare (18 100/mån),
 *   avfuktare (12 100) och luftkvalitetsmätare (720).
 * - **Maskinerna som gör hushållsarbetet.** Robotdammsugare (49 500/mån) och
 *   robotgräsklippare (49 500).
 *
 * Robotdammsugare flyttades hit 2026-08-04, när sidan byggdes. Alternativet
 * var en egen grupp Städ enligt .agent/plans/sidkarta-framat.md, tillsammans
 * med robotgräsklippare och fönsterputsrobot. Den valdes bort eftersom
 * gruppen hade stått på en enda sida tills robotgräsklipparen byggs, medan
 * Hem & hushåll redan är öppen och enligt sin egen beskrivning bär just
 * klustret "maskinerna som gör hushållsarbetet".
 *
 * Alternativen som övervägdes och valdes bort 2026-08-03 var Hälsa &
 * inomhusmiljö, som hade ramat in luften som hälsa men lämnat robotarna
 * hemlösa, och Klimat & energi, som hade knutit an till elpriset men satt
 * snett eftersom en luftrenare sällan köps av energiskäl.
 */
export const HEM_HUSHALL = {
  key: "hem-hushall",
  label: "Hem & hushåll",
  href: "/hem-hushall",
} satisfies Category;

/**
 * Elektronik, öppnad 2026-08-05 med /usb-c-laddare.
 *
 * Sajtens fjärde grupp och den första som inte handlar om huset. De tre
 * befintliga bär hemmet, säkerheten och hushållsarbetet; en laddare hör till
 * personen och följer med ut. Alternativen som övervägdes och valdes bort var
 * att lägga den under Smart hem, vilket hade gjort gruppen till en restpost
 * eftersom en laddare varken styr något eller är uppkopplad, och under Hem &
 * hushåll, som redan är sajtens bredaste och tänjts en gång.
 *
 * ⚠️ Gruppen är ett strategiskt vägval och inte bara en rubrik. Den öppnar ett
 * stort angränsande fält — powerbank, kablar, hörlurar, bildskärmar — som är
 * den mest affiliatemättade delen av internet, och där vi möter Prisjakt och
 * PriceRunner i stället för fem tunna testsajter. Att vi tar oss in där ska
 * vara ett beslut, inte en glidning.
 *
 * ⚠️ INGEN AV KATEGORINS BUTIKER TILLÅTER PPC. Kjell 5 %, Teknikdelar 5 %,
 * IKEA 9 %, Proshop 3,2 %, Komplett 2,5 %, Dustin 2 % och Webhallen 1 % bär
 * alla `ppcMarketing: 0` i Adtractions katalog. Gruppens sidor går alltså inte
 * att annonsera med nuvarande utbud, till skillnad från /nyckelskap som fick
 * E-safe på 7,5 % med ppc=2. Prylstaden (8 %, ppc=2) och Estore (5 %, ppc=2)
 * är okontrollerade mot sortimentet och är enda vägen dit.
 */
export const ELEKTRONIK = {
  key: "elektronik",
  label: "Elektronik",
  href: "/elektronik",
} satisfies Category;

/**
 * Kök, öppnad 2026-08-05 med /mjolkskummare.
 *
 * Sajtens femte grupp. Elektronik öppnade fältet som hör till personen; det
 * här hör till bänken. Alternativen som övervägdes och valdes bort var Hem &
 * hushåll, vars egen beskrivning säger att den bär två kluster — luften
 * inomhus och maskinerna som gör hushållsarbetet — och en mjölkskummare är
 * ingetdera, och Elektronik, som är definierad som det som följer med ut.
 *
 * ⚠️ Gruppen är öppnad på ett pengaskäl lika mycket som på ett taxonomiskt.
 * Den är den **första gruppen där flera program tillåter PPC**: AIVIQ 15 %,
 * Coffee Friend 10 % och Kaffepro 10 % bär alla `ppcMarketing: 2`, mot noll av
 * sju i Elektronik. Kaffe- och köksapparater ligger dessutom hos specialister
 * snarare än hos kedjorna, och specialisterna är de som betalar.
 *
 * ⚠️ Men kontrollera sortimentet, inte katalogen. AIVIQ och Kaffepro såg på
 * papperet ut att vara sajtens bästa utbud någonsin. Vid kontroll mot deras
 * egna Shopify-flöden 2026-08-05 har de **en enda mjölkskummare mellan sig,
 * samma artikel, slutsåld hos båda**. Se .agent/research/mjolkskummare.md §4.
 *
 * Gruppen kan bära kaffebryggare, espressomaskin, kaffekvarn, vattenkokare,
 * airfryer och blender. Ingen av dem är köad; en sida byggs när det finns
 * något att säga som inte redan står någon annanstans.
 */
export const KOK = {
  key: "kok",
  label: "Kök",
  href: "/kok",
} satisfies Category;

export const CATEGORIES: Category[] = [
  SMART_HEM,
  SAKERHET,
  HEM_HUSHALL,
  ELEKTRONIK,
  KOK,
];

export type TestPageEntry = {
  /** Path, always flat. The category is taxonomy and never a URL segment. */
  href: string;
  label: string;
  category: Category;
  blurb: string;
  /**
   * live    — the page exists, so link it and put it in the sitemap
   * planned — listed for orientation, never linked, never sitemapped
   *
   * Linking a planned test page feeds Google a 404 and feeds a reader a dead
   * end. Flip this in the same commit as the page, not before.
   */
  status: "live" | "planned";
  /**
   * Datum då sidans innehåll senast ändrades i sak, `YYYY-MM-DD`.
   *
   * Samma värde som `const UPDATED` på sidfilen, och det som blir `<lastmod>`
   * i sitemapen. Anledningen till att det ligger här och inte bara på sidan är
   * att sitemapen inte kan läsa en konstant inuti en sidkomponent utan att dra
   * in hela komponentträdet.
   *
   * Två kopior av ett datum glider isär, så `pnpm check:refs` jämför de här
   * mot sidfilernas `UPDATED` och fäller bygget om de skiljer sig.
   *
   * Lämnas tom tills sidan finns. Ett påhittat datum är sämre än inget:
   * Google slutar lita på `lastmod` för hela sajten om värdena inte stämmer.
   */
  updated?: string;
  /**
   * Datum då sidan först fanns, `YYYY-MM-DD`. Blir `datePublished` i schemat
   * och "Publicerad" i sidhuvudet, vid sidan av `updated`.
   *
   * Finns för att `updated` ensamt ger en falsk bild. Ett reparationspass över
   * hela sajten sätter samma `updated` på fyrtio sidor samma dag, och sidan ser
   * då ut att ha uppstått ur ingenting. Publiceringsdatumet är det som visar
   * att sidan har en historia.
   *
   * ⚠️ **Varje värde här är belagt, inget är valt för att se bra ut.** Källorna,
   * i prioritetsordning: kommentaren `<slug> byggd <datum>` i den här filen,
   * raden i `.agent/byggda-sidor.md`, eller datumet då `lib/data/<slug>.ts`
   * lades till i git. Finns inget belägg sätts fältet inte.
   *
   * Frestelsen att sprida ut de här datumen för att sajten ska se äldre ut
   * övervägdes och avvisades 2026-08-06: repots första commit är 2026-08-01, så
   * ett tidigare datum påstår att sidan ändrades innan den fanns. Se resonemanget
   * ovan vid `updated` — ett påhittat datum kostar `lastmod`-förtroendet för
   * hela sajten.
   */
  published?: string;
  /** Products covered. Only set once the page is live and the count is real. */
  count?: number;
};

export const TEST_PAGE_INDEX: TestPageEntry[] = [
  {
    /* `mjolkskummare` byggd 2026-08-05. Öppnar gruppen Kök, sajtens femte.
       Rankar bara elektriska kannor med värmeelement; manuell pumpskummare och
       handhållen batterivisp förklaras i köpguiden, efter användarbeslut.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. Grep på `mjölkskum`, `skumm`, `latte`,
       `cappuc`, `kaffe` och `espresso` över samtliga sex keyword-CSV:er ger
       noll träffar. Kör Keyword Planner på `mjölkskummare`,
       `mjölkskummare bäst i test`, `elektrisk mjölkskummare` och
       `mjölkskummare visp`. Slugen är dock enkel: samtliga åtta konkurrenter,
       Råd & Rön och varenda butik säger `mjölkskummare` i ett ord.

       FYNDET: en mjölkskummare har två maxnivåer och talet i modellnamnet är
       den högre. Severins hela sortiment, läst på tillverkarens egen svenska
       butik: SM 3584 skummar 100 av 200 ml, SM 3588 "300" skummar 150,
       SM 3579 och 3589 "Light 400" skummar 220, "Spuma 500" skummar 120–260,
       "Spuma 700" skummar 120–350. Sju modeller, skummaxet är halva namnet
       varje gång.

       ANDRA FYNDET, och det starkare: **samma butik använder samma fält för
       två olika storheter.** Coffee Friends `Kapacitet (vätskor)` bär 240 ml
       för Bialetti MK01, som skummar 115, och 150 ml för Bialetti MKF02, som
       värmer 300. Samma fabrikat, två produktsidor bredvid varandra.

       TREDJE: fyra konventioner ligger sida vid sida. Severin publicerar båda
       talen, Wilfa anger 150–250 ml och menar skummaxet, Sage anger "3 koppar"
       och ingen milliliter alls, Philips anger 120 ml och räknar själv om det
       till två cappuccino. Philips omräkning är sidans måttstock, cirka 60 ml
       skum per kopp, och den är tillverkarens egen.

       ⚠️ INGET TESTOMDÖMEKRITERIUM, trots att provningen finns. Råd & Rön har
       provat 18 elektriska mjölkskummare med riktig labbmetod, publicerat
       2024-09-03. Testet kostar 59 kr och köptes INTE, efter användarbeslut.
       Vi vet alltså inte vilken modell som vann och påstår det aldrig. Metoden,
       betygsspannet 71/61/48 och temperaturbandet 63–67 °C är fritt läsbara.
       Samma läge som Stiftung Warentest på /powerbank.

       ⚠️ `.../mjolkskummare/sa-testar-vi-mjolkskummare/` cirkulerar i
       sökresultat men är Råd & Röns egen 404-sida. Länka aldrig den.

       ⚠️ HAVREDRYCK ÄR INGET TOMRUM. Testkollen nämner havre 58 gånger och
       Testkompassen 19. Påstå ALDRIG att ingen tar upp växtbaserad dryck.
       Det som däremot saknas hos alla åtta konkurrenter är temperaturtalet och
       volymökningen.

       ⚠️ EN PRODUKT SAKNAR BETYG PÅ `skumkapacitet` MED FLIT. Sage anger sin
       kapacitet i koppar och inte i milliliter, och `weightedRating` fördelar
       om vikten. Att dra ner betyget för en tom cell vore att betygsätta
       produktbladet, vilket den nya regeln förbjuder — se nedan. Melitta och
       Alessi stod här till 2026-08-06; deras tal fanns publicerade.

       ⚠️ NY STÅENDE REGEL, beslutad här: **redovisning får aldrig bära vikt.**
       `Öppen redovisning` föreslogs med 20 och ströks helt. `pnpm
       check:redovisning` listar de nio sidor som ärvde kriteriet innan regeln
       fanns; de rättas en och en med /fix-page.

       PENGAR: gruppen är den första där flera program tillåter PPC. Coffee
       Friend 10 % / 30 d / ppc 2 är den enda annonserbara butik som faktiskt
       för sortimentet, och den bär både den billigaste och den dyraste
       produkten. KitchenTime 8 % / ppc 0 har bredast utbud och bäst priser.
       ⚠️ AIVIQ 15 % och Kaffepro 10 % såg på papperet ut att vara sajtens bästa
       utbud någonsin och har **en enda mjölkskummare mellan sig, samma artikel,
       slutsåld hos båda**. Kontrollera sortimentet, inte katalogen.
       ⚠️ Elgiganten har kategorins bästa specifikationer men ligger på Awin,
       där vi inte har konto. En produkt länkas dit ändå, på egen förtjänst.

       Se .agent/research/mjolkskummare.md. */
    href: "/mjolkskummare",
    label: "Mjölkskummare",
    category: KOK,
    blurb:
      "Talet på kartongen är hur mycket den värmer. Skummar gör den hälften.",
    /* Live 2026-08-05. Alla tio priser, artikelnummer och GTIN lästa på
       butikernas egna produktsidor samma dag, och samtliga kapacitetstal lästa
       hos tillverkaren: hela Severins sortiment på severinshop.se, Wilfa på
       wilfa.se, Philips på philips.se. Tio packshots på plats. Uppmätt vid
       1440 och 390 px: ingen sidscroll vid någondera bredden och inget klippt
       superlativ.

       ⚠️ ETT SUPERLATIV KORTADES efter mätning, från 43 till 33 tecken.
       CHiATOs klipptes vid båda bredderna, 241 px innehåll i en ruta på 236.
       Taket ligger runt 39 tecken. Fjärde gången felet uppstår, se IDÉ-015.

       ⚠️ EN MARKERAD RAD LIGGER UNDER 50 %: `Skumtemperatur` 4/10. Det är
       avsiktligt och av samma sort som `Angiven fallhöjd` på /iphone-skal.
       Fyra tillverkare anger ett tal, och de är inte överens: Wilfa 65–75 °C,
       Severin justerbart 45–65, RIG-TIG 60, CHiATO 75–80, mot Råd & Röns
       63–67. Att fylla cellen åt de sex som tiger raderar spridningen.

       ⚠️ NESPRESSO AEROCCINO 4 LIGGER BLAND ÖVERVÄGDA AV FEL SKÄL. Den var
       rankad åtta av elva och flyttades därför att packshoten inte gick att
       hämta: Elgiganten renderar bilderna med JavaScript, Nespressos egen sida
       lämnar ingen adress, Coffee Friend för den inte, och CDON:s bilder är
       marknadsplatssäljarnas. Skälet läsaren får är sant och skrivet före
       flytten, men det är ett operativt hinder och alltså en uppgift: hämta
       bilden ur Elgigantens renderade DOM med Chrome-verktygen och ranka in
       den igen. Dess specifikationsläge är kategorins bästa.

       ⚠️ SÖKVOLYMEN ÄR FORTFARANDE OMÄTT vid lansering, som på /powerbank,
       /iphone-skal och /usb-c-laddare. Slugen är vald på handelns,
       konkurrenternas och Råd & Röns gemensamma språkbruk. Kör Keyword Planner
       ändå.

       ⚠️ GAP-PASS 2026-08-06 med /fix-page. Melittas och Alessis skumtal stod
       som opublicerade och låg i butikens egen produkttext; båda är nu ifyllda
       och betygsatta. Fyra påståenden om RIG-TIG, CHiATO och Sage var
       felaktiga och är rättade. Sage och Melitta byter plats sju och åtta.
       Rättelsen ligger i lib/corrections.ts. Kvar obetygsatt på skumkapacitet:
       enbart Sage, som anger koppar och inte milliliter. */
    status: "live",
    updated: "2026-08-06",
    count: 10,
  },
  {
    /* `bluetooth-hogtalare` byggd 2026-08-05. Bärbara Bluetooth-högtalare.

       ⚠️ KATEGORIN LÅG PARKERAD I SIDKARTAN, men parkeringen gällde en annan
       produkt: `.agent/plans/sidkarta-framat.md` parkerar `/smart-hogtalare`,
       alltså Nest och Echo, med skälet "ingen affiliateförsörjning". En bärbar
       Bluetooth-högtalare är en annan produkt med en annan handel, och
       försörjningen kontrollerades först. Elon bär 5 % med 14 dagars cookie och
       samtliga tio rankade modeller. `/fonsterputsrobot` stod också parkerad
       och byggdes ändå.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. Grep över samtliga sex keyword-CSV:er ger
       en enda träff, `bäst i test smart högtalare`, och den står utan volymdata
       i plan.md samt gäller den parkerade produkten. Kör Keyword Planner på
       `bluetooth högtalare`, `bärbar högtalare`, `trådlös högtalare` och
       `jbl charge`.

       SLUGEN ÄR VALD PÅ HANDELNS SPRÅKBRUK efter användarbeslut. Elon, Kjell
       och Komplett säger alla Bluetooth-högtalare, och tre av fyra svenska
       konkurrenter har bluetooth i URL:en. Redaktionerna säger bärbar högtalare;
       Ljud & Bild rubricerar sitt test så.

       AVGRÄNSNING efter användarbeslut: bara de bärbara, alltså under cirka två
       kilo. Marshall Kilburn III på 2,8 kg, Sony ULT Field 5 på 3,3 och
       Soundcore Boom 2 Pro på 3,8 är partihögtalare och får en egen systersida.

       FYNDET: batteriet blir utbytbart 18 februari 2027. Förordning (EU)
       2023/1542 artikel 11, läst i original i svensk språkversion på EUR-Lex,
       CELEX 32023R1542. Kravet är att batteriet "lätt kan avlägsnas och
       ersättas av slutanvändaren när som helst under produktens livslängd", med
       kommersiellt tillgängliga verktyg och utan värmeenergi eller lösningsmedel.
       Slutartikeln: "Artikel 11 ska tillämpas från och med den 18 februari 2027."

       ⚠️ UNDANTAGET ÄR SIDANS POÄNG. Artikel 11.2 a låter apparater "särskilt
       utformade för att främst användas i en miljö som regelbundet innebär
       vattenstänk, strömmande vatten eller nedsänkning i vatten" nöja sig med
       att batteriet byts av en oberoende yrkesutövare, och bara "om sådant
       undantag är nödvändigt för att säkerställa användarens och apparatens
       säkerhet". Vattentätheten är kategorins främsta säljargument och samtidigt
       enda vägen till undantaget.

       ⚠️ VI BEDÖMER ALDRIG om en namngiven högtalare omfattas av undantaget
       eller inte. Det är tillverkarens bedömning mot den egna konstruktionen.
       Samma disciplin som passformen på /iphone-skal.

       ANDRA FYNDET: speltiden anges två gånger på samma produktsida och talen
       är inte överens. JBL Charge 6 står som 28 timmar i säljpunkterna och 24 i
       specifikationens fält för drifttid, JBL Flip 7 som 16 mot 14. Clip 5 och
       Sonos Roam 2 stämmer med sig själva. De två som anger flest timmar är
       alltså de två som motsäger sig själva. Betygen använder det lägre talet.

       TREDJE: den dyraste provade högtalaren är den enda som inte tål
       nedsänkning. Marshall Kilburn III kostar 3 990 kr och är IP54; de övriga
       sex i Ljud & Bilds test är IP67 eller IP68. Den ligger bland de övervägda
       av viktskäl, men uppgiften står där.

       ⚠️ INGET TESTOMDÖMEKRITERIUM, och den här gången är det fastställt och
       inte antaget. Användarbeslutet var att lägga tiden på att hämta betyg ur
       Ljud & Bilds sju enskilda recensioner. Alla sju är hämtade och genomsökta
       efter betyg, poäng och stjärnmönster: noll av sju bär ett betyg. De
       skriver prosaomdömen med faktaruta. Omdömena återges per modell med
       publikationen namngiven och påverkar inga poäng.

       ⚠️ LJUDET ÄR INTE BETYGSATT. Det är den egenskap köparen bryr sig mest om
       och den enda vi inte kan väga, och det står rakt ut i viktningen.

       ⚠️ BUTIKENS VIKTFÄLT ÄR OPÅLITLIGT. Elon anger 1,23 kg för JBL Flip 7 där
       Ljud & Bild och storleksklassen ger 0,56 kg, sannolikt förpackad vikt. För
       Charge 6 stämmer de däremot, 1,35 mot 1,37, så felet är inte systematiskt.
       Vikt hämtas från tillverkaren eller oberoende test, aldrig maskinellt ur
       butiken. En publicerad siffra som är fel är värre än en tom cell.

       ⚠️ PRYLSTADEN ÄR AVFÖRD FÖR KATEGORIN, och det svarar på en fråga tre
       andra sidor bär. Prylstaden 8 % med ppcMarketing 2 har stått som enda
       vägen till annonsering i Elektronik. Kontrollerat 2026-08-05 med alla tre
       stegen i scripts/fetch.mjs: sortimentet är gadgethögtalare 239–499 kr,
       plasma och blinkande LED, med noll träffar på JBL, Sonos, Bose och
       Marshall. Uppgiften bör föras in i researchfilerna för /usb-c-laddare,
       /usb-c-kabel och /iphone-skal.

       PENGAR: Elon 5 % / 14 d bär samtliga tio. Kjell 5 % har föregångarna,
       Proshop 3,2 % och Komplett 2,5 % bär Charge 6. ⚠️ Ingen av dem tillåter
       PPC. Märkesprogram för JBL, Sonos, Bose och Marshall är INTE utredda:
       sökningen gav bara aggregatorkataloger, och Awin, Partner-ads, Adrecord
       och Addrevenue är osvepta.

       ⚠️ Sex av tio är JBL eller Harman Kardon, alltså samma koncern. Det
       speglar Elons sortiment och står utskrivet på sidan.

       Se .agent/research/barbar-hogtalare.md. */
    href: "/bluetooth-hogtalare",
    label: "Bluetooth-högtalare",
    category: ELEKTRONIK,
    blurb: "34 wattimmar och IP68 för 1 690 kronor tar hem tio bärbara.",
    /* Live 2026-08-05. Alla tio priser och specifikationer lästa på Elons egna
       produktsidor samma dag, och batteriförordningen läst i original på
       EUR-Lex. Tio packshots på plats.

       ⚠️ SÖKVOLYMEN ÄR FORTFARANDE OMÄTT vid lansering, som på de sex övriga
       Elektronik-sidorna. Slugen är vald på handelns språkbruk, vilket är det
       stabilare underlaget av de två gånger sajten gissat fel.

       ⚠️ M3:s test av tio trådlösa högtalare är INTE läst i original. Ingen
       uppgift på sidan kommer därifrån, och inget påstående görs om vad svenska
       konkurrenter nämner eller inte nämner om batteriförordningen — det är
       inte mätt term för term. Gör det vid nästa runda. */
    status: "live",
    updated: "2026-08-06",
    count: 10,
  },
  {
    /* `powerstation` byggd 2026-08-05. Åttonde sidan i Elektronik och
       storebror till /powerbank. Beställd med Prisjakts kategori som
       utgångspunkt.

       SLUGEN ÄR AVGJORD AV HANDELN och inte av beställningen. Prisjakt kallar
       kategorin `Bärbar kraftstation`, men Clas Ohlson säger `Power Stations`,
       NetOnNet och Elgiganten `Powerstation`, Kjell `Powerstations` och
       EcoFlows egen svenska butik `Powerstation`. Fem av sex konkurrenter säger
       powerstation. Ordet `portabel kraftstation` lever i produktnamnen och bär
       därför H1, ingress och köpguide, men inte URL:en.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. Grep på `powerstation`, `kraftstation`,
       `elverk`, `jackery`, `ecoflow` och `solpanel` över samtliga sex
       keyword-CSV:er ger noll träffar. Kör Keyword Planner på `powerstation`,
       `bärbar kraftstation`, `portabel kraftstation`, `powerstation bäst i
       test` och `elverk` i samma körning.

       ⚠️ `elverk` är EN ANNAN PRODUKT, förbränningsmotor på bensin eller
       diesel. Både Prisjakt och Clas Ohlson har den som egen syskonkategori.
       Sidan får inte glida in i den.

       AVGRÄNSNING efter användarbeslut: 231 till 1 024 wattimmar, alltså
       camping, stugan och ett strömavbrott. Gränsen nedåt mot powerbank är
       Stiftung Warentests egen — en powerstation har minst ett 230 V-uttag —
       vilket utesluter EcoFlows Trail DC-serie och de 60 000 mAh-powerbanks som
       säljs som "bärbar kraftstation" på Amazon. Hemreservklassen från 2 kWh,
       15 000 till 40 000 kr, får en systersida.

       FYNDET: talet i produktnamnet är ingen enhet. Cocraft Advance 240 lagrar
       231 Wh och lämnar 200 W, alltså varken det ena eller det andra. Advance
       500 lagrar 386 och lämnar 500. TogoPower Advance 650 lagrar 634 och
       lämnar 500. Jackery Explorer 1000 Pro lagrar 1 002 och lämnar 1 000.
       EcoFlow numrerar inte alls.

       ANDRA FYNDET, och det som bär tabellen: watt-talet finns i tre versioner
       och butikerna blandar dem i samma fält. Anker Solix C2000 Gen 2, EAN
       0194644395735: tillverkaren anger 2 400 W kontinuerligt och 4 000 W topp,
       Prisjakt publicerar 2 400, Elgigantens fält `Max. AC` publicerar 4 000.
       På samma kategorisida bär samma fält 300 W för EcoFlow River 3, alltså
       den kontinuerliga effekten, och 2 400 W för Delta 3, alltså X-Boost mot
       tillverkarens 1 800. Därför tre skilda rader: kontinuerlig, topp, boost.

       TREDJE FYNDET: cellkemin är en faktor fyra på livslängden och syns inte i
       priset. Anker anger 4 000 cykler till 80 %, EcoFlow 3 000 till 4 000,
       Jackery 1 000 för ternär litium. Sidans billigaste per wattimme, 6,18 kr,
       är också den med kortast liv.

       ⚠️ RÄTTAD LÄSNING, dokumenterad: ett utkast skulle ha tillskrivit
       Stiftung Warentest meningen att powerstations duger dåligt som reservkraft
       eftersom energimängden är för liten. Den står i LÄSARKOMMENTARERNA på
       test.de, skriven av användaren `uboche` 2026-01-07. Får varken citeras
       eller tillskrivas dem.

       ⚠️ CLAS OHLSON SÄLJER TVÅ ARTIKLAR MED SAMMA NAMN till samma pris:
       36-8703 med 400 Wh och 48 kundbetyg, och 46-1461 med 386 Wh och inga.
       Bruksanvisningen till den äldre säger "500 W / 400 Wh" på omslaget. Det
       är två generationer under ett namn och inte en självmotsägelse. Vi rankar
       den nyare och lägger den äldre bland övervägda.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Warentests provning av elva powerstations
       är från 2023-07-20 och gäller föregående generation, resultat per modell
       bakom betalvägg på 4,90 EUR. M3:s svenska grupptest av åtta är från
       2021–2023 och NOLL av de åtta säljs i de svenska kategorier vi läste.
       Metoden bär däremot viktningen, efter användarbeslut.

       PENGAR: kategorins problem är att butikerna med sortimentet saknar
       program. Elgiganten 26 artiklar och Clas Ohlson 13 har inget program.
       Kjell har 5 % / 30 d men noll i lager online på samtliga nio artiklar.
       Prylstaden är enda butiken med både bra villkor och tillåten betald
       sökning, 8 % / 45 d / ppc 2, och för tre stationer varav en i klassen.
       EcoFlow driver eget program på eu.ecoflow.com, minst 5 % med sju dagars
       cookie. Sidan länkar bästa pris efter användarbeslut, och gapet står
       utskrivet i metodrutan.

       ⚠️ CLAS OHLSON ÄGER TEKNIKDELAR OCH BATTERIEXPERTEN, som båda har
       Adtraction-program på 5 %. Koncernen är alltså nåbar även om
       clasohlson.com inte är det. Värt ett försök.

       Se .agent/research/powerstation.md. */
    href: "/powerstation",
    label: "Powerstation",
    category: ELEKTRONIK,
    blurb:
      "Talet i namnet är ibland watt, ibland wattimmar och ibland ingetdera.",
    /* Live 2026-08-05. Alla tio priser, artikelnummer, streckkoder och
       kundbetyg lästa på butikernas egna produktsidor samma dag, samtliga
       kontinuerliga effekttal hämtade hos tillverkaren, och Cocrafts
       bruksanvisning läst i original som PDF. Tio packshots på plats. Uppmätt
       vid 1440 och 390 px: noll pixlar sidscroll vid någondera bredden och
       inget klippt superlativ.

       ⚠️ TVÅ LÄNKAR FLYTTADES TILL PROSHOP samma dag, efter att ett tidigare
       svep felaktigt sagt att de inte för kategorin. Anker C800x och C1000X
       Gen 2 kostar exakt lika mycket i båda butikerna, GTIN stämmer, och
       Proshop ligger på 3,2 % medan Elgiganten inte har något program.
       C300x ligger kvar hos Elgiganten, som är 15 procent billigare där.

       ⚠️ ELGIGANTENS BILD-CDN SVARADE 429 under hela bygget, så fyra packshots
       är hämtade hos Proshop och Jackery i stället. Ankers egen C300-sida bär
       bilder på A1722, alltså DC-varianten, och användes därför inte.

       EGET VERKTYG: `hur-stor-powerstation`, byggt direkt efter sidan. Tre
       frågor ger kontinuerlig effekt, toppeffekt och kapacitet.

       ⚠️ Verktygets första energimodell var obrukbar och rättades före
       lansering: den räknade varje apparat som om den gick oavbrutet, vilket
       lät en vattenkokare koka i två timmar och gjorde att SAMTLIGA provade
       kombinationer hamnade över klassens tak. Modellen skiljer nu på last som
       går en del av tiden och last som går i korta pass. Sju kombinationer är
       genomräknade efter rättelsen, se researchfilen §15.

       ⚠️ REPARERAD 2026-08-06 med /fix-page. Sidan drog av poäng för uppgifter
       vi inte fått fram — det stod utskrivet i `livslangd`-kriteriet, i
       metodrutan och i datafilens huvud — och tre av de påstådda luckorna var
       inte luckor. Ankers datablad för A1723 anger 3 000+ cykler för C300x, och
       TogoPowers egen bruksanvisning anger både cellkemi och garanti för
       Advance 650. Sju betyg räknades om, se lib/corrections.ts.

       ⚠️ IP-KLASSERNA GÄLLER BATTERIPAKETET. EcoFlows egen tabellrad heter
       `Waterproof Level of Battery Pack` och River-sidornas fotnot säger att
       klassen inte gäller hela apparaten. Sidan påstod att Delta 3 klarade att
       stå ute i regn, vilket är mer än tillverkaren lovar. */
    status: "live",
    updated: "2026-08-06",
    count: 10,
  },
  {
    /* `galaxy-s26-fodral` byggd 2026-08-05, samma dag som /galaxy-s26-skal och
       med delad research. Skalsidans avgränsning sköt plånboksfodralen hit.

       FYNDET FÖLJER DIREKT UR SKALSIDANS, OCH DET ÄR SIDANS SKÄL ATT FINNAS.
       Skalsidan lär läsaren att Galaxy S26 saknar inbyggda Qi2-magneter och att
       magnetringen därför är det viktigaste på ett skal. Läsaren kommer hit och
       letar efter ordet magnet — och hittar det på tolv av tretton fodral. Det
       är **spännet som håller locket stängt**, inte en laddmagnet. Ett enda
       fodral (Gear) anger att trådlös laddning fungerar genom fodralet, och ett
       till (Tech-Protect Matte) nämner magneter i ett laddningssammanhang.
       Tabellen bär därför två skilda kolumner, `Magnetens funktion` och
       `Trådlös laddning genom fodralet`, i stället för en.

       ⚠️ EN RAD ÄR EN KONSTRUKTION, ALDRIG ETT MÖNSTER. Kategorin har 35
       artiklar till basmodellen men omkring tretton konstruktioner: Mezzo säljs
       i fem mönster, Sensitive i fyra, Luna i fyra, Tender och Smart Pro i tre.
       Samma regel som /iphone-fodral.

       ⚠️ FYRA ARTIKLAR ÄR UTGÅNGNA OCH LIGGER KVAR I BUTIKENS KATEGORILISTA.
       De fyra "Galaxy S26 / S26 Pro"-fodralen svarar "Tyvärr, produkten har
       utgått ur vårt sortiment, 0 st. i lager eller fjärrlager" och saknar pris.
       De ligger bland övervägda. **Det var inte modellnamnet som avgjorde:** ett
       utkast ville utesluta dem för att "S26 Pro" inte finns, vilket användaren
       invände mot med att ett fodral med mjuk insats spänner över flera
       storlekar på ett sätt ett gjutet skal inte gör. Invändningen är riktig.
       De faller på att de inte går att köpa. Tre av dem bär dessutom EAN, vilket
       är de enda GTIN vi fått fram på någon av de två sidorna.

       ⚠️ MEZZO ÄR RANKAD, MEN BARA PÅ ETT AV SINA FEM MÖNSTER. Butikens sex
       produktbilder på mönstret **Röd Cats** visar Galaxy S26 **Ultra**, samma
       fel som Ringke-paret på skalsidan, och vi publicerar aldrig en packshot av
       en annan modell än raden gäller. Raden använder därför Mandala-bilden, som
       är rätt modell, och Röd Cats ligger bland övervägda. Kontrollera bilderna
       vid nästa prisrunda. (Ett tidigare utkast lyfte hela konstruktionen ur
       rankningen och lät Sensitive ta platsen; efter 08-06 ligger båda kvar.)

       ⚠️ BUTIKENS PRODUKTTEXTER ÄR MALLADE. Flera fodralbeskrivningar säger
       "mobilskalet" om ett fodral, alltså text återanvänd från skalsortimentet.
       Vi återger sakuppgiften och aldrig formuleringen.

       ⚠️ RFID-SKYDD BETYGSÄTTS ALDRIG, samma beslut som /iphone-fodral. Se
       ALDRIG_BEDOMD i lib/spec-schema.mjs.

       VIKTNING: identisk med /iphone-fodral efter användarbeslut, alltså
       kortkapacitet 25, konstruktion 25, laddning 20, prisvärde 20,
       vardagsfunktion 10. Det gör systersidorna direkt jämförbara.

       PENGAR: samma läge som /galaxy-s26-skal, alltså TheMobileStore 10 % och
       30 dagars cookie. iPhonebutikens 15 % är Apple-only och går inte att
       använda för Samsung.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. Kör Keyword Planner på `galaxy s26 fodral`,
       `plånboksfodral samsung`, `mobilfodral samsung`.

       Se .agent/research/galaxy-s26-skal.md, som bär researchen för båda. */
    href: "/galaxy-s26-fodral",
    label: "Galaxy S26 plånboksfodral",
    category: ELEKTRONIK,
    blurb: "Nästan alla lovar magnet. Två laddar, ett bär tillbehör, fem gör ingetdera.",
    /* Live 2026-08-05. Tolv priser lästa på TheMobileStores egna produktsidor
       samma dag, tolv packshots på plats och kontrollerade filnamn för filnamn
       mot modell, pnpm check och pnpm build gröna, sidan uppmätt vid 1440 och
       390 px.

       Reparerad 2026-08-06 med /fix-page. Specifikationerna är hämtade hos
       Tech-Protect, Puro, Celly, Partner Tele.com och Icecat, elva GTIN lagda
       till, och kriteriet för laddning graderar nu varan i stället för om
       säljaren publicerat uppgiften. Nio placeringar flyttade, se
       lib/corrections.ts.

       Andra passet samma dag: Smart Pro stod som konstläder och är äkta läder
       enligt tillverkaren, vilket gav sidan sitt enda riktiga läderfodral och
       höjde två delbetyg utan att flytta någon placering. Raden Fotofack är
       borttagen (ett värde av tolv), fem likalydande omdömesmeningar och fyra
       likalydande nackdelar är omskrivna, och två räknefel i läsartexten är
       rättade. Se lib/corrections.ts. */
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-05",
    count: 12,
  },
  {
    /* `galaxy-s26-skal` byggd 2026-08-05, tillsammans med /galaxy-s26-fodral och
       med delad research i .agent/research/galaxy-s26-skal.md. Sajtens första
       Samsung-sida, och systersida till /iphone-skal.

       FYNDET ÄR IPHONE-SIDANS FYND UPP OCH NED. Galaxy S26-serien saknar
       inbyggda Qi2-magneter, medan Samsung säljer både magnetisk powerbank och
       magnetladdare till just den serien. Samsung svarade 9to5Google
       2026-02-28 att serien "supports Qi2-compatible phone cases, offering
       users flexibility without embedding the feature directly into the
       device", alltså hänvisar tillverkaren köparen till skalet för en funktion
       telefonen inte har. Samsungs egen specifikation nämner varken Qi2 eller
       trådlös laddning. Magnetkriteriet väger 38 efter reparationen 2026-08-06,
       mot 21 på iPhone-sidan.

       FYNDET ÄR DESSUTOM SHOPPINGBART. Ringke säljer samma skal i två
       versioner: Fusion X 199 kr utan magnetring, Magnetic Fusion X 229 kr med.
       Onyx och Magnetic Onyx skiljer 50 kr. Namnen skiljer sig på ett ord. De
       två rankade skalen utan magnetring ligger kvar sist efter användarbeslut,
       i stället för att flyttas till övervägda, eftersom kontrasten bara syns om
       båda står i tabellen.

       ⚠️ SERIEN HETER S26, S26+ OCH S26 ULTRA, aldrig "S26 Pro" eller
       "S26 Edge". De namnen kommer ur ryktesrapporteringen före lanseringen den
       25 februari 2026 och ligger kvar i svensk teknikpress, bland annat i
       TheMobileStores eget magasin. Verifierat tre gånger: Samsungs egen
       svenska sida, Elgigantens produktdata (SM-S942BZKGEUB, serie S26) och
       Skal-mans modellnavigation. Butiken har ändå kvar en kategori för
       "Galaxy S26 Pro" med en enda produkt, på lagerrensning, och flera
       artiklar säljs som "S26 / S26 Pro". Ingen sådan artikel är rankad.

       ⚠️ 2026-08-06: "ETT ENDA SKAL AV ARTON ANGER FALLHÖJD" VAR FEL, OCH DET
       PÅSTÅENDET BAR SIDANS ANDRAPLATS. Fyndet gällde butikens produktsidor,
       inte tillverkarnas. Spigen anger själva 1,2 m och 26 fall för Tough
       Armor, UNIQ tre meter för Combat, och Samsungs egen sida för
       EF-RS942CBEGWW anger 1,22 m i fem omgångar om 26 fall mot stål, alltså
       mer än de "1,2 meter" butiken skrev av. Tre tillverkare av tolv sätter en
       siffra.

       Kriteriet "öppen redovisning av skydd" på 20 är därmed borttaget: det
       betygsatte hur mycket TheMobileStore råkat skriva av, alltså
       dokumentationen och inte varan. Samsung Rugged Magnet föll från andra
       till åttonde plats när vikten fördelades om. HÄMTA ALLTID FALLPROVET,
       MATERIALET OCH HÖRNKONSTRUKTIONEN HOS TILLVERKAREN. Butiken skriver
       "hårdplast" om skal Spigen beskriver som polykarbonat och TPU med
       luftkuddar. Se lib/corrections.ts.

       ⚠️ RANKNINGEN VILAR PÅ EN PAGINERAD KATEGORI SOM FÖRST LÄSTES FEL. Ett
       tidigt svep av Ultra-kategorins första sida gav bara Ringke plus Samsungs
       egna och såg ut som en tunn märkeshylla. Kategorin har sex sidor och 234
       skal till basmodellen: Tech-Protect 32, Samsung 16, Spigen 14, Ringke 12.
       En paginerad listning får aldrig ligga till grund för ett påstående om
       vad en butik för.

       ⚠️ BUTIKENS ATTRIBUTFÄLT ÄR OPÅLITLIGT. `Silicone Magnet` och `AirSkin
       Aramid` står båda som Hårdplast, och `Funktion` är stavat
       "MagSafe-komtaibel" på två produkter. `Material` följer produkttexten där
       de går isär, aldrig attributfältet ensamt.

       ⚠️ KATEGORIN SAKNAR SVENSKT ORD FÖR MAGNETRINGEN. Samtliga magnetskal
       säljs som MagSafe-kompatibla, alltså Apples varumärke på en
       Samsung-telefon, inklusive Samsungs egna. UNIQ kallar sitt MagClick.
       Iakttagelsen bar tabellraden `Butikens term för magneten` fram till
       2026-08-06, då den togs bort: en rad i jämförelsetabellen som mäter
       butikens copy är inte en rad om produkterna. Den står nu i köpguiden och
       i sidans FAQ, där den hör hemma.

       ⚠️ TELEFONERNA ÄR VÄL PROVADE, SKALEN INTE ALLS. Mobil.se, PC-tidningen
       och Prisjakt har riktiga tester av S26, S26+ och S26 Ultra. De testar
       telefoner och får aldrig citeras som stöd för ett skalomdöme. Inget
       kriterium för testomdöme finns.

       PENGAR: ⚠️ SÄMRE VILLKOR ÄN IPHONE-SIDORNA, OCH DET ÄR STRUKTURELLT.
       iPhonebutikens 15 % är Apple-only. Taket här är TheMobileStore på 10 %
       med 30 dagars cookie, som dock för en riktig märkeshylla. Teknikdelar
       5 %, Estore 5 % med ppcMarketing 2 och alltså enda vägen till annonsering.
       Samma arbete ger ungefär två tredjedelar av intäkten per krona. Inget
       program är ansökt ännu.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT, samma läge som /iphone-skal och
       /iphone-fodral. Kör Keyword Planner på `galaxy s26 skal`,
       `samsung s26 skal`, `mobilskal samsung` och `galaxy s26 fodral`.

       Se .agent/research/galaxy-s26-skal.md. */
    href: "/galaxy-s26-skal",
    label: "Galaxy S26-skal",
    category: ELEKTRONIK,
    blurb:
      "Telefonen saknar magneter. Skalet är det som avgör om laddaren fäster.",
    /* Live 2026-08-05. Tolv priser lästa på TheMobileStores egna produktsidor
       samma dag, tolv packshots på plats, pnpm check och pnpm build gröna, och
       sidan uppmätt vid 1440 och 390 px utan sidscroll eller klippt innehåll.

       ⚠️ TVÅ PACKSHOTS KOMMER FRÅN TILLVERKAREN OCH INTE FRÅN BUTIKEN. Både
       Ringke Fusion X och Magnetic Fusion X illustreras hos TheMobileStore med
       bilder på S26 PLUS, och magnetversionens bilder är dessutom clear matte
       på en artikel som säljs i svart. De två hämtades i stället från
       ringkestore.com, vars sidtitlar bekräftar basmodellen. Länk och pris
       ligger kvar hos TheMobileStore. De tio övriga bilderna kommer från
       butiken och är kontrollerade filnamn för filnamn mot modell och färg.

       Reparerad 2026-08-06: kriteriet öppen redovisning borttaget, viktningen
       omräknad, sex placeringar ändrade och tabellen ombyggd mot tillverkarnas
       egna uppgifter. Samtliga tolv GTIN är nu framme och matchade, vilket
       också bekräftade att varje rad gäller basmodellen S942. Se
       lib/corrections.ts. */
    status: "live",
    updated: "2026-08-06",
    count: 12,
  },
  {
    /* `iphone-skarmskydd` byggd 2026-08-05. Tredje sidan i iPhone-familjen och
       sjunde i Elektronik. Skalsidans avgränsning sköt uttryckligen
       skärmskydden hit, se .agent/research/iphone-skal.md.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. Grep på `skärm`, `skarm`, `glas`,
       `display`, `iphone` och `mobil` över samtliga sex keyword-CSV:er under
       .agent/ ger noll träffar. Kör Keyword Planner på `skärmskydd`,
       `skärmskydd iphone`, `härdat glas`, `iphone 17 pro skärmskydd` och
       `panzerglas` i samma körning som skal- och fodralsidornas termer.

       Slugen är dock enkel: Testix, Testkollen, iPhonebutiken, Kjell,
       Elgiganten och Holdit säger alla skärmskydd. `panzerglas` är ett tyskt
       varumärkesord som inte används generiskt i svensk handel.

       AVGRÄNSNING efter användarbeslut: alla skärmskydd i ett spann, alltså
       härdat glas, sekretessglas och plastfilm från 69 till 399 kr.
       Kameralinsskydd förklaras i köpguiden och får en egen systersida. Att den
       billigaste filmen gör mindre än ordet skärmskydd antyder syns bara om den
       får vara med, samma resonemang som spannet 99 till 1 099 på /iphone-skal.

       FYNDET: 9H är taket på en färgstandards skala. Läst i original hos ASTM
       och ISO 2026-08-05. ASTM D3363-22 §1.1 beskriver metoden som bestämning
       av "the film hardness of an organic coating on a metal or similarly hard
       substrate", kommitté D01, Book of Standards vol. 06.01, alltså
       färgvolymen. ISO 15184:2020 heter "Paints and varnishes — Determination
       of film hardness by pencil test", ICS 87.040. Skalan går enligt Tekras
       tekniska not från 6B, mjukast, till 9H, hårdast — alltså anger tio av
       femton produkter skalans maximum.

       ANDRA FYNDET, och det avgörande: ISO underkänner själva användningen.
       Abstractet ordagrant: "This rapid test has not been found to be useful in
       comparing the pencil hardness of different coatings." Att jämföra
       produkter är det enda talet används till i handeln. ASTM §5.2 lägger till
       att resultatet varierar mellan laboratorier och pennfabrikat, och Tekra
       att lasten kan sänkas för att få ett högre värde. Ingen butik anger last.

       TREDJE: gap-passet mot tillverkaren kommer tillbaka tomt, till skillnad
       från /iphone-skal där det fungerade. PanzerGlass egen produktsida för
       iPhone 17 Pro anger varken hårdhet, tjocklek, glastyp eller provmetod.
       Den enda standard sidan namnger är Global Recycled Standard, och den
       gäller det återvunna innehållet och inte glasets styrka.

       FJÄRDE: Spigen marknadsför `9H plus` i en bildbeskrivning på sin egen
       sida, alltså ett steg över skalans tak.

       ⚠️ FÖRVÄXLINGEN FINNS UTSKRIVEN HOS EN KONKURRENT. repareraiphone.se
       skriver att 9H "refererar till Mohs hårdhetsskala där diamant är 10".
       Vi säger att uppgiften är fel, aldrig att sajten ljuger, och vi påstår
       ALDRIG att tillverkarna hänvisar till Mohs — det gör de inte. Samma
       disciplin som "Philips säger varken ja eller nej" på /smart-hem-hubb.

       ⚠️ TESTKOLLEN TILLSKRIVER RÅD & RÖN ETT LABBTEST av ljustransmission
       genom skärmskydd. Sökning på radron.se ger en konsumenträttsfråga och
       inget test. Obelagt, INTE motbevisat: får varken citeras eller användas
       som motargument. Samma läge som Råd & Rön-påståendet på /nyckelskap.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Råd & Rön och Testfakta har ingen provning.
       connect 12/2014 provade tretton folier med riktig labbmetod — filtskiva,
       8 N, 30 000 slag, plus luminans, kontrast, gloss och haze — men testet är
       tolv år gammalt, gäller folier och innehåller noll av de rankade. Samma
       läge som Testfaktas kabelprovning på /usb-c-kabel.

       ⚠️ HÅRDHETEN ÄR INGET BETYGSATT MÄTVÄRDE, av samma skäl som `Angiven
       fallhöjd` på /iphone-skal och `Angiven besparing` på /smart-termostat.
       Femte gången beslutet fattas. Se ALDRIG_BEDOMD i lib/spec-schema.mjs.

       ⚠️ ENKAY BÄR EN VARIANTMISS I BUTIKENS EGEN LISTNING: sidtiteln säger
       iPhone 17 Pro Max, specifikationsraden och produkttexten säger 17 Pro.
       Fältet följer specifikationsraden. Kontrollera vid nästa prisrunda.

       ⚠️ TROLSK OCH ENKAY ANGER PASSFORM MOT IPHONE 18 PRO, en modell Apple
       inte presenterat. Samma uppgift som /iphone-skal §10 fann. Vi påstår
       varken att de kommer att passa eller att de inte gör det.

       ⚠️ LAGERSTATUS VÄGER INTE IN, efter användarbeslut 2026-08-05. Spigen
       Glas.tR EZ Fit hade 2–6 veckors leveranstid vid bygget, vinner ändå, och
       lagerläget nämns inte i någon läsartext.

       PENGAR: samma utbud som /iphone-skal och /iphone-fodral, alltså
       iPhonebutiken 15 % och 45 dagars cookie, sajtens bästa villkor.
       ⚠️ ppcMarketing 0, så sidan går inte att annonsera. Prylstaden 8 % och
       Estore 5 % med ppc 2 är fortfarande okontrollerade mot sortimentet.

       Se .agent/research/iphone-skarmskydd.md. */
    href: "/iphone-skarmskydd",
    label: "iPhone skärmskydd",
    category: ELEKTRONIK,
    blurb:
      "Tio av femton anger 9H. Det är taket på en skala för färg och lack.",
    /* Live 2026-08-05. Alla femton priser och artikelnummer lästa på
       iPhonebutikens egna produktsidor samma dag, och båda hårdhetsstandarderna
       lästa i original hos ASTM och ISO. Femton packshots på plats.

       De tre markerade rader som låg under 50 % — `Täckning`, `Monteringsram`
       och `Angiven hårdhet` — är fyllda 2026-08-06 och ligger nu på 9/15,
       14/15 och 12/15. Det första gap-passet kom tillbaka tomt därför att det
       stannade vid butikens specifikationstabell. Uppgifterna låg i
       produkttexten på samma sidor, hos tillverkarna och i Copters egen
       appliceringsanvisning.

       ⚠️ TVÅ AV CELLERNA VAR INTE TOMMA UTAN FELAKTIGA. UAG Glass Shield stod
       utan monteringsram och utan innehållsförteckning, och båda uppgifterna
       stod ordagrant på den produktsida vår egen köpknapp pekar på. Betyget
       för montering var satt till 2,0 på kategorins mest kompletta
       monteringssats, och rättelsen flyttar produkten från tolfte till femte
       plats. Se lib/corrections.ts.

       Raderna `Angiven hårdhetsstandard`, `Angiven provlast` och `GTIN` är
       borttagna. De var tomma för samtliga femton och fanns till för kriteriet
       öppen redovisning, som togs bort 2026-08-06 därför att det rankade
       butikens produktsida i stället för skyddet. I stället står nu
       `Garanti` för alla femton, från 6 månader till livstid, hämtad ur
       butikens eget garantifält per artikel. Den väger inte in i något betyg.

       ⚠️ SÖKVOLYMEN ÄR FORTFARANDE OMÄTT vid lansering, som på /iphone-skal,
       /iphone-fodral, /usb-c-laddare och /garageportsoppnare. Slugen är vald på
       handelns och konkurrenternas gemensamma språkbruk, vilket är ett stabilare
       underlag än de två gånger sajten gissat fel. Kör Keyword Planner ändå.

       ⚠️ TVÅ SPIGEN-ARTIKLAR LIGGER ETTA OCH TVÅA. De har skilda superlativ som
       pekar på olika köpare, den ena på den som monterat snett förr och den
       andra på den som vill ha insynsskydd billigt, men kontrollera vid nästa
       runda att de inte glidit ihop. */
    status: "live",
    updated: "2026-08-06",
    count: 15,
  },
  {
    /* `iphone-fodral` byggd 2026-08-05, samma dag som /iphone-skal och som dess
       systersida. Skalsidans avgränsning sköt uttryckligen plånboksfodralen hit.

       ⚠️ SLUGEN ÄR VALD MOT REKOMMENDATIONEN, OCH DET ÄR ETT MEDVETET BESLUT.
       Ordet `fodral` bär två betydelser i svensk handel: plånboksfodral, och
       allmänt mobilskydd. Testix driver båda samtidigt, med
       /test/planboksfodral-till-mobil och /test/fodral-till-mobil.
       `/planboksfodral` rekommenderades för att undvika krock med /iphone-skal,
       eftersom repot avvisat en slug på just det skälet förut: det bortvalda
       `/hemlarm-utan-abonnemang` byggde in kannibalisering i URL:en.
       Användaren valde `/iphone-fodral` med risken utskriven.

       MOTÅTGÄRDEN LIGGER PÅ SIDAN. H1, title, ingress och metabeskrivning säger
       alla **plånboksfodral** och inte bara fodral, och de två sidorna
       korslänkar varandra i metoden, köpguiden och FAQ, som /brandvarnare mot
       /smart-brandvarnare. Kontrollera i Search Console om sidorna börjar byta
       plats på samma fråga; då är det slugen och inte texten som ska ändras.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT, samma läge som /iphone-skal. Kör Keyword
       Planner på `iphone fodral`, `plånboksfodral`, `plånboksfodral iphone`
       och `mobilfodral` i samma körning som skalsidans termer.

       AVGRÄNSNING efter användarbeslut: bara uppfällbara plånboksfodral.
       Avtagbara 2-i-1, magnetiska korthållare och skal med kortficka förklaras
       i köpguiden. ⚠️ Gränsen mot 2-i-1 är en bedömning: Gear Buffalo har ett
       avtagbart magnetskal och ligger med, eftersom avtagbarheten är en
       konstruktionsdetalj och inte säljargumentet. Decoded, DG Ming och
       dbramante Lynge är uteslutna eftersom det är hela deras poäng.

       FYNDET: sju av tolv fodral stänger av den trådlösa laddningen helt, och
       uppgiften står i specifikationen men aldrig i rubriken. Den följer inte
       heller priset. Trolsk säljer ett fodral för 199 kr som laddar trådlöst
       med magnetring och ett för 249 som inte laddar alls.

       ANDRA FYNDET: kortkapaciteten följer inte priset åt andra hållet heller.
       Flest fack har CaseMe C30 på 279 kr med tio, medan fodralen för 699 och
       799 tar tre respektive två till tre.

       ⚠️ RFID BETYGSÄTTS INTE, efter användarbeslut. Tre skäl: ingen anger
       dämpning, frekvens eller standard; uppgiften skiljer inte produkterna åt
       eftersom både det billigaste och det dyraste anger den; och den enda
       oberoende utvärderingen som finns, Alecci m.fl. RAID '23, kringgick 8 av
       11 blockeringskort men uteslöt uttryckligen de tre skärmande korten,
       alltså just fodralens mekanism. Att låna det talet hit vore samma
       variantfälla som ABUS 787 mot 787 Smart-BT.

       ⚠️ RADICOVERS STRÅLNINGSPÅSTÅENDE ÅTERGES INTE. Produktsidan anger ett
       strålningsdämpande membran med en procentsiffra. Ett hälsopåstående är
       safety-shaped och kräver tier A; Strålsäkerhetsmyndighetens hållning är
       inte läst i original. Talet står varken i specs, omdöme, för- och
       nackdelar eller FAQ, och vi bemöter det inte heller.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Ingen har provat plånboksfodral. Testix
       säger själva att de läst kundrecensioner och jämfört sortiment, vilket är
       ärligare än deras skalsida.

       PENGAR: samma som /iphone-skal, alltså iPhonebutiken 15 % och 45 dagars
       cookie, sajtens bästa villkor. Snittpriset är dessutom högre här än på
       skalsidan. ⚠️ ppcMarketing 0, så sidan går inte att annonsera.

       Se .agent/research/iphone-fodral.md. */
    href: "/iphone-fodral",
    label: "iPhone-fodral",
    category: ELEKTRONIK,
    blurb:
      "Sju av tolv fodral stänger av den trådlösa laddningen. Det står aldrig i rubriken.",
    /* Live 2026-08-05. Alla tolv priser, artikelnummer och lagerstatus lästa på
       iPhonebutikens egna produktsidor samma dag, och RAID-papperet läst i
       original som PDF. Tolv packshots på plats. Uppmätt vid 1440 och 390 px:
       ingen sidscroll vid någondera bredden och ingen klippt text.

       Till skillnad från /iphone-skal rapporterar `check:tackning` inga glesa
       markerade rader här: samtliga sex ligger över 50 procent, eftersom
       butiken publicerar kortfack, material och laddning för varje artikel.

       ⚠️ SÖKVOLYMEN ÄR FORTFARANDE OMÄTT vid lansering, och slugen krockar
       medvetet med /iphone-skal. Kör Keyword Planner på `iphone fodral`,
       `plånboksfodral`, `plånboksfodral iphone` och `mobilfodral`, och följ
       sidorna i Search Console. Byter de plats på samma fråga är det slugen och
       inte texten som ska ändras.

       EGET VERKTYG: `planboksfodralvaljare`, byggt 2026-08-05 direkt efter
       sidan. Tre frågor om laddning, kapacitet och livslängd.

       ⚠️ Verktyget är byggt tvärtemot skaltypsväljaren på /iphone-skal, och det
       är avsiktligt. Där ger noll av arton kombinationer ett tomt svar. Här ger
       **15 av 24** det, eftersom en hel plånbok och trådlös laddning inte går
       ihop i den här hyllan. Nejet är sidans fynd och ska stå kvar, men ett
       verktyg som svarar nej i två fall av tre är obrukbart hur sant nejet än
       är. Därför visar widgeten alltid vad som händer om ett krav släpps, och
       samtliga 15 tomma utfall har minst en väg vidare. Uppmätt, inte antaget:
       se .agent/tmp-körningen i researchfilen §10.

       REPARERAD 2026-08-06 med /fix-page. Guess Book 4G angavs sakna
       stativfunktion och ha ett sedelfack; licenstagarens egen produkttext
       säger tvärtom, och den finns i sin helhet hos Empik medan iPhonebutiken
       bara återger ett sammandrag. Fyra celler fyllda och tre betyg omräknade,
       utan att ordningen ändrades. Viktningens fotnot sa att en uppgift som
       inte publiceras räknas som en brist under respektive kriterium, alltså
       raka motsatsen till repots regel; den är omskriven. Raden
       `Öppningsriktning` ströks, som var horisontell för samtliga tolv och
       jämförde ingenting, och `Passar modeller` och `Garanti` markerades i
       stället. Åtta av tolv anges passa iPhone 18 Pro också. Se
       lib/corrections.ts och researchfilen §11. */
    status: "live",
    updated: "2026-08-06",
    count: 12,
  },
  {
    /* `iphone-skal` byggd 2026-08-05. Fjärde sidan i Elektronik. Beställd
       utifrån med ofylld platshållare, "iPhone {latest model} skal", så första
       uppgiften var att avgöra vilken modell som är den senaste.

       MODELLÄGET, kontrollerat 2026-08-05: iPhone 17-familjen är den senaste,
       presenterad 2025-09-09. ⚠️ iPhone 18 Pro och Pro Max väntas i september
       2026, alltså cirka fem veckor efter att sidan byggdes, medan basmodellen
       iPhone 18 skjuts till våren 2027. Det är första gången Apple delar
       lanseringen. Användarbeslut: ingen 18-sida köas nu.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. Grep på `mobilskal`, `iphone`, `skal` och
       `telefon` över samtliga keyword-CSV:er under .agent/ ger en enda träff,
       och den är `porttelefon med kamera`. Kör Keyword Planner på `iphone skal`,
       `mobilskal`, `iphone 17 pro skal` och `magsafe skal` när det passar.
       Slugen är dock enkel den här gången: Testix, iPhonebutiken, Elgiganten och
       Kjell säger alla skal, och ordet fodral betyder plånboksfodral i handeln.

       AVGRÄNSNING efter användarbeslut: bara skyddsskal. Plånboksfodral,
       korthållare, skärmskydd och kameralinsskydd förklaras i köpguiden och får
       egna systersidor. En enda rankning över hela spannet 99 till 1 099 kr,
       eftersom att de billigaste inte redovisar något är en del av fyndet och
       syns bara om de får vara med.

       FYNDET: plywooden som hela branschen beskriver försvann 2014. Läst i
       original i tre utgåvor. MIL-STD-810G:2008 metod 516.6 föreskriver
       "two-inch plywood backed by concrete". Change 1, 2014-04-15, numrerade om
       metoden till 516.7 och gjorde stål till förval: "The default drop surface
       is steel backed by concrete." 810H:2019 metod 516.8 behöll stålet och
       tillåter plywood bara under två namngivna villkor. Standarden skriver
       själv att underlaget avgör: "The most severe damage potential is impact
       with a non-yielding mass that absorbs minimal energy."

       ANDRA FYNDET: de 26 fallen får delas på fem exemplar. Tabell 516.8-IX
       not 5, ordagrant: "If desired, divide the 26 drops among no more than
       five test items."

       TREDJE: precisionen följer inte priset. X2O på 259 kr anger utgåva och
       metodnummer, OtterBox på 229 och 449 anger 2008 års utgåva, Spigen säger
       bara "militärklassad", och UAG:s dyraste på 1 099 kr anger 7,6 meter utan
       att namnge någon standard alls. 7,6 m är sex gånger standardens 122 cm.

       ⚠️ TVÅ HYPOTESER PRÖVADES OCH FÖLL under bygget, båda dokumenterade i
       researchfilen. Utkastet skulle ha kallat X2O:s `516.7` ett påhittat
       metodnummer; Change 1 numrerade faktiskt om metoden dit. Utkastet
       daterade också bytet plywood till stål till 810H 2019; det skedde 2014.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Ingen har provat skyddsskal: Råd & Rön
       provar mobiler men inte skal, Testfakta har ingen provning, och Stiftung
       Warentests fallprov gäller vattentäta dykhus. Samma läge som
       /utomhustimer, /vattenlarm och /garageportsoppnare.

       ⚠️ FALLHÖJD OCH MILITÄRSTANDARD ÄR INGA BETYGSATTA MÄTVÄRDEN, av samma
       skäl som `Angiven besparing` på /smart-termostat och `Angivet böjtal` på
       /usb-c-kabel. De bär kriteriet öppen redovisning i stället.

       ⚠️ BUTIKEN ANGER PASSFORM MOT IPHONE 18 PRO för flera produkter, och
       flera bär den i produktnamnet, trots att Apple inte presenterat modellen
       och inte publicerat några mått. Uppgiften står i köpguiden. Vi påstår
       varken att skalen kommer att passa eller att de inte gör det.

       PENGAR: sidans bästa villkor hittills. iPhonebutiken.se bär 15 % med 45
       dagars cookie och TheMobileStore SE 10 %, mot tidigare bäst E-safe 7,5 %.
       ⚠️ Båda ligger under `Media` i Adtraction-katalogen och inte under
       `Electronics`, vilket är tredje gången kategorifältet döljer en butik för
       en Elektronik-sida. Svep på sortiment, inte på kategori.

       ⚠️ SIDAN GÅR SANNOLIKT INTE ATT ANNONSERA. Både iPhonebutiken och
       TheMobileStore bär ppcMarketing 0. Prylstaden 8 % och Estore 5 % har
       ppc 2 men är okontrollerade mot skalsortimentet.

       Se .agent/research/iphone-skal.md. */
    href: "/iphone-skal",
    label: "iPhone-skal",
    category: ELEKTRONIK,
    blurb:
      "Plywooden som varje skaltillverkare beskriver byttes mot stål 2014.",
    /* Live 2026-08-05. Alla tolv priser, artikelnummer och lagerstatus lästa på
       iPhonebutikens egna produktsidor samma dag, och militärstandarden läst i
       original i tre utgåvor som PDF. Tolv packshots på plats. Uppmätt vid
       1440 och 390 px: ingen sidscroll vid någondera bredden, och inget klippt
       superlativ sedan X2O:s kortades från 44 till 36 tecken enligt IDÉ-015.

       ⚠️ VARNINGEN NEDAN INFRIADES. Sidan hävdade att gap-passet mot
       tillverkarnas egna sidor kom tillbaka tomt och att `Angiven fallhöjd`
       4/12 och `Angiven militärstandard` 5/12 därför fick ligga tunna med
       avsikt. Det stämde inte. urbanarmorgear.com skriver ut metoden för båda
       UAG-skalen, "Meets 3X MIL-SPEC 810G-516.6" respektive 5X, och nomadgoods
       .com publicerar kanthöjd, bufferttjocklek och magnetkraft. Passet
       gjordes om 2026-08-06.

       Raderna är sedan dess omgjorda: sju rader som mätte publicering är borta
       eller sammanslagna till `Falltest enligt tillverkaren`, 8/12, och
       `Förhöjd kant kamera` är befordrad till markerad rad. Kriteriet `Öppen
       redovisning av skydd` (vikt 22) är borttaget och vikterna är 51/28/21.
       Sex placeringar flyttade. Se lib/corrections.ts.

       ⚠️ Den här sidan citerade tidigare `Angiven noggrannhet` på /hygrometer
       som prejudikat. Gör inte det: det gap-passet var ofullständigt. Talen
       stod i bruksanvisningarna, raden gick från 3/7 till 5/7 den 2026-08-06
       och tre placeringar ändrades. Två sidor i rad har nu haft en "avsiktligt
       tunn" rad som visade sig vara ofullständig research. Behandla varje
       sådan motivering som obevisad tills passet är gjort om.

       ⚠️ SÖKVOLYMEN ÄR FORTFARANDE OMÄTT vid lansering, som på /usb-c-laddare
       och /garageportsoppnare. Slugen är vald på handelns och konkurrenternas
       gemensamma språkbruk, alltså skal och inte fodral, vilket är ett stabilare
       underlag än de två gånger sajten gissat fel. Kör Keyword Planner ändå.

       ⚠️ PASSFORMSKOLUMNEN GÄLLER BARA 17 PRO. Sidan rankar skalmodeller med
       17 Pro-varianten som referenspris, men `Passar modeller` anger enbart den
       artikel som faktiskt prissatts. Att skriva in de övriga storlekarna utan
       att kontrollera dem artikel för artikel vore variantfällan. Nästa runda
       bör kontrollera 17, 17 Pro Max och Air per modell.

       EGET VERKTYG: `skaltypsvaljare`, byggt 2026-08-05 direkt efter sidan.
       Tre frågor om var telefonen är, hur den laddas och hur skalet ska se ut
       ger kraven plus de rankade skal som uppfyller dem, billigast först.
       Verktyget frågar aldrig efter fallhöjd eller militärstandard, av samma
       skäl som kriterierna inte betygsätter dem.

       ⚠️ Alla arton kombinationer är genomräknade: urvalet spänner 1 till 12
       träffar, inget svar ger noll, och bara `hemma/sladd/egal` ger alla tolv.
       Den tomma grenen i widgeten är alltså onåbar med dagens produkter men
       står kvar, eftersom urvalet ändras när en produkt byts ut. */
    status: "live",
    updated: "2026-08-06",
    count: 12,
  },
  {
    /* `powerbank-20000` byggd 2026-08-05. Systersida till /powerbank, delad på
       storlek efter användarbeslut. Den här rankar från 20 000 mAh och uppåt.
       Stiftung Warentest delar sitt eget test på samma storlekar.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT, samma sak som moderssidan. `powerbank
       20000` ska med i samma Keyword Planner-körning. Slugen följer
       Teknikdelars egen kategori, `powerbank-20000mah`.

       TVÅ PRODUKTER ÄR BYGGDA INTILL TAKET: Linocell 27 600 mAh ligger på
       99,36 Wh och Anker Prime 26 250 mAh på 99,75 Wh. Marginal 0,64 respektive
       0,25 wattimmar mot en gräns på 100. Konstruktion, inte slump.

       FYNDET EFTER GAP-PASSET 2026-08-06: de två som ligger intill taket är
       också de två tyngsta, 625 och 600 g mot 400-535 för dem på 20 000 mAh.
       Maximal laglig kapacitet kostar ca 200 gram. Det är sidans bärande
       poäng och det ersatte en poäng om vem som publicerar vad.

       ⚠️ XTORMS 100 Wh ÄR KJELLS UPPGIFT, INTE XTORMS. Kontrollerat 2026-08-06
       mot xtorm.eu, tillverkarens spectabell och manualen till FS5201: Xtorm
       publicerar inget Wh-tal alls, bara "Allowed on the plane". Talet är
       dessutom oförenligt med de tre andra 20 000 mAh-bankerna som alla ligger
       på 72 Wh. Cellen är ett STRECK, inte 100 och inte 72 — ett värde bärs
       aldrig över mellan modeller. Hela konfliktberättelsen är borta ur
       läsartexten: den handlar om vad en källa skrivit, inte om varan.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Warentest mätte uttagbar energi till
       58,3-69,9 Wh för storleksklassen, men resultat per modell ligger bakom
       betalvägg på 4,90 EUR som vi inte köpt.

       ⚠️ VIKT ÄR ETT EGET KRITERIUM här men inte på moderssidan: produkterna
       väger 400 till 625 g. Alla åtta vikter är framtagna 2026-08-06. Tre av
       dem stod i Kjells eget specifikationsblock hela tiden, som brödtext och
       inte som tabell — samma fel som rättades på Linocell 165 W i augusti.

       ⚠️ KRITERIET ÖPPEN REDOVISNING (vikt 15) ÄR BORTTAGET 2026-08-06. Vikten
       omfördelad proportionellt: kapacitet 35, laddeffekt 29, vikt 18,
       prisvärde 18. Tillsammans med de tre nya vikterna flyttade det vinnaren
       från Linocell 165 W till Linocell 25 000. Se lib/corrections.ts.

       ⚠️ Sju av åtta länkar går till Kjell, 5 % / 30 d. Ugreen Nexode flyttades
       till Teknikdelar 2026-08-05 efter butikskartläggningen: samma artikel
       (GTIN 6941876269921 = Nexode = PB726), samma 990 kr, samma 5 % / 30 d.
       Bytet ger ingen extra provision utan bryter koncentrationen. Ingen av
       butikerna tillåter PPC. Se .agent/plans/butikskartlaggning-elektronik.md
       och .agent/research/powerbank.md §7b. */
    href: "/powerbank-20000",
    label: "Powerbank 20 000 mAh",
    category: ELEKTRONIK,
    blurb: "Två ligger under en wattimme från gränsen du får flyga med.",
    /* Live 2026-08-05. Alla åtta priser, artikelnummer och kundbetyg lästa i
       butikens egen JSON-LD samma dag. Linocell Premium 65 W var slutsåld och
       ligger bland övervägda, men av variantskäl och inte av lagerskäl: den är
       samma kapacitet, samma wattimmar och samma pris som 100 W-modellen.

       Reparerad 2026-08-06: kriteriet Öppen redovisning borttaget, fem tomma
       celler fyllda, tabellen utökad med effekt per port och laddningstid,
       samtliga åtta omdömen omskrivna. Priserna är INTE kontrollerade om. */
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-05",
    count: 8,
  },
  {
    /* `powerbank` byggd 2026-08-05. Tredje systersidan ur /usb-c-laddares
       avgränsning, efter /usb-c-kabel.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. Grep på `powerbank`, `batteripack` och
       `reservbatteri` över samtliga keyword-CSV:er ger noll träffar. Kör
       Keyword Planner på `powerbank`, `powerbank bäst i test`, `batteripack`
       och `powerbank 20000` när det passar.

       Slugen är enkel: handeln och samtliga konkurrenter säger powerbank i ett
       ord. Ingen använder batteripack eller reservbatteri som produktnamn.

       AVGRÄNSNING efter användarbeslut: sidan rankar vardagsklassen, 5 000 till
       10 000 mAh, alltså det som laddar en telefon och ryms i en ficka. Rese-
       och laptopklassen från 20 000 mAh får /powerbank-20000. Stiftung
       Warentest delar sitt eget test på exakt samma sätt.

       FYNDET ligger i enheten. Milliamperetimmar mäter laddningsmängd vid
       cellens spänning; wattimmar mäter energi och är det Transportstyrelsen
       reglerar efter. Av de åtta rankade anger TVÅ sitt energiinnehåll i Wh.
       Warentest 2/2026 skriver rakt ut att mAh-uppgifterna är "nur begrenzt
       aussagekräftig" och att det som betyder något är uttagbar energi i Wh,
       uppmätt till 28,5-35,8 Wh för de små och 58,3-69,9 för de stora.

       ⚠️ DE TVÅ SOM ANGER Wh ÄR INTE ÖVERENS: Anker Nano 30 W anger 37 Wh och
       Linocell Premium 30 W anger 36 Wh, för samma nominella 10 000 mAh.
       Cellspänningen skiljer. Det är beviset för att aldrig räkna om åt den som
       tiger, och `Energiinnehåll` ligger därför i ALDRIG_BEDOMD.

       ⚠️ TRE AV ÅTTA SAKNAR SPECIFIKATIONSRUTA HELT hos butiken, och två av dem
       är hyllans mest omdömda med 303 respektive 222 kundbetyg.

       ⚠️ FLYGREGELN gäller alla storlekar: en powerbank får ALDRIG ligga i
       incheckat bagage. Handbagage upp till 100 Wh, 100-160 Wh kräver
       flygbolagets godkännande och max två, över 160 Wh inte alls.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Warentests resultat per modell ligger bakom
       betalvägg på 4,90 EUR som vi inte köpt. Metod och spann bär köpguiden.

       ⚠️ KONKURRENSEN ÄR INTE TOM, till skillnad från garagesidorna.
       Testkompassen täcker Wh-vinkeln bra: 47 förekomster av Wh, nio av
       100 Wh-gränsen och elva av omvandlingsförluster, med korrekt formel.
       Påstå ALDRIG att ingen tar upp det. Kjells egen "Bäst i test"-guide och
       bast-i-test.se nämner däremot Wh noll gånger.

       ⚠️ Alla åtta länkar går till Kjell, 5 % / 30 d, ingen PPC. Koncentrationen
       står utskriven på sidan. Se .agent/research/powerbank.md. */
    href: "/powerbank",
    label: "Powerbank",
    category: ELEKTRONIK,
    blurb:
      "Samma 10 000 mAh rymmer 36, 37 eller 38,5 wattimmar. Talet på kartongen är inte energin.",
    /* Live 2026-08-05. Alla åtta priser, artikelnummer och kundbetyg lästa i
       butikens egen JSON-LD samma dag, samtliga i lager.

       ⚠️ Reparerad 2026-08-06, och rättelsen är stor. Gap-passet 2026-08-05
       misslyckades mot anker.com, vars korsförsäljningskarusell returnerade
       främmande tal. Slutsatsen blev då att uppgifterna inte publicerades, och
       kriteriet `Öppen redovisning` drog av för det. Fel: wattimmen fanns för
       sju av åtta i tillverkarnas manualer, i flera fall i PDF:er butiken
       själv länkar, och samtliga åtta har en strukturerad specruta under
       `Teknisk information` som första insamlingen inte läste.

       Kriteriet är borttaget, vikten omfördelad till 41/23/18/18, och
       testvinnaren är en annan: Anker Nano 45 W bar det tyngsta avdraget och
       vinner nu. `Energiinnehåll`, `Vikt`, `Mått` och `Laddningstid` är
       tabellrader. Se lib/corrections.ts. */
    status: "live",
    updated: "2026-08-06",
    count: 8,
  },
  {
    href: "/smart-belysning",
    label: "Smart belysning",
    category: SMART_HEM,
    blurb: "Färgåtergivning, dimring och vilket protokoll du bör välja.",
    status: "live",
    /* 2026-08-03: WiZ Color A60 hade stigit från 103 till 129 kronor sedan
       lanseringen, alltså 25 procent på två dagar på en sida som låg live.
       Prisvärdet sänktes till 4,5. Det var fyndet som gjorde priskollen till
       ett nattligt jobb i stället för en punktinsats.

       2026-08-06: IKEA TRÅDFRI utbytt mot KAJPLATS, färgåtergivning hämtad för
       alla fem och omfördelningen av saknade kriterier avstängd. Rankningen
       ändrades, se lib/corrections.ts. */
    updated: "2026-08-06",
    published: "2026-08-02",
    count: 5,
  },
  {
    href: "/smart-plug",
    label: "Smart plug",
    category: SMART_HEM,
    blurb: "Maxeffekt, energimätning och vilket uttag som klarar garaget.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-01",
  },
  {
    href: "/smart-strombrytare",
    label: "Smart strömbrytare",
    category: SMART_HEM,
    blurb:
      "Nolla i dosan, vad du får installera själv och vad som funkar utan.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-01",
  },
  {
    /* Slugen var `/smarta-gardiner` fram till 2026-08-01. Keyword Planner:
       `elektrisk rullgardin` 1 600/mån mot `smarta gardiner` 110, alltså
       fjorton gånger. Ändringen var gratis eftersom sidan aldrig gick live och
       därmed aldrig låg i sitemapen. Se .agent/keywords/utfall.md. */
    href: "/elektrisk-rullgardin",
    label: "Elektrisk rullgardin",
    category: SMART_HEM,
    blurb: "Rullgardinsmotorer, gardinrobotar och vilken skena de passar.",
    status: "live",
    /* 2026-08-06: reparationspass. Fyra påståenden om saknade uppgifter var
       falska, tabellen gick från tre till sju rader och två placeringar bytte
       plats. Se lib/corrections.ts och .agent/research/elektrisk-rullgardin.md. */
    updated: "2026-08-06",
    published: "2026-08-01",
  },
  {
    /* `utomhustimer` 1 300/mån mot 90 för `smart uttag utomhus`, som planen
       först köade. Termen betyder i svensk SERP mekanisk timer och inte smart
       plugg, och sidan rankar därför båda. Extrem säsong: 6 600 i november mot
       260 i april. Se .agent/research/utomhustimer.md. */
    href: "/utomhustimer",
    label: "Utomhustimer",
    category: SMART_HEM,
    blurb: "Mekanisk, digital eller smart, och vad som klarar svensk vinter.",
    /* Live 2026-08-03. Alla tio priser kontrollerade mot butikernas egna
       sidor: sju stämde, Tapo P410M hade fallit från 399 till 259 och
       Cleverio GP120 från 149,90 till 119. Se .agent/priskoll-2026-08-03.md.
       ⚠️ Säsongen är extrem, 6 600 sökningar i november mot 260 i april, så
       lagerstatus och pris bör kontrolleras om inför november.

       Reparerad 2026-08-06 med /fix-page. Drifttemperatur hämtad ur
       tillverkarnas bruksanvisningar för samtliga tio, vilket fyllde två celler
       och flyttade Luxorparts från sjätte till åttonde plats. Se rättelsen. */
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-01",
  },
  {
    /* Flyttad från Smart hem till Hem & hushåll 2026-08-04 efter
       användarbeslut, enligt kommentaren vid HEM_HUSHALL. Den som söker
       robotdammsugare tänker inte på den som en smart hem-produkt.

       Sajtens hårdaste SERP: konkurrensindex 100 och toppbud 15,53 kr, mot
       23 kr för brandsläckare och 60 för brandvarnare. Topplistan är dessutom
       affiliatemättad. Räkna inte med snabb organisk position.

       Vinkeln är att pascaltalet på kartongen är reklam. Stiftung Warentest
       skriver det rakt ut, och prislistan visar det: Dreame L10s Ultra Gen 3
       anger 25 000 Pa för 4 990 kronor medan Roborock Qrevo Curv 2 Flow anger
       20 000 för 11 490. Se .agent/research/robotdammsugare.md.

       ⚠️ Ingen provision är läst i klartext för de butiker sidan länkar till.
       Proshop ligger i Adtraction-katalogen på 3,2 %, och ansökningar till
       Roborock via Impact och till Awin pågår parallellt. */
    href: "/robotdammsugare",
    label: "Robotdammsugare",
    category: HEM_HUSHALL,
    blurb: "Två labb har provat dem. Båda säger att de sopar, inte suger.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-04",
  },
  {
    /* `vattenfelsbrytare` 2 900/mån, alltså mer än vattenlarm trots att
       produkten kostar tjugo gånger mer. Sidan rankar både vattenfelsbrytare
       och läckagebrytare, efter användarbeslut 2026-08-04: certifieringsregeln
       CR 139 omfattar båda, och sedan 2026-01-01 kräver Branschregler Säker
       Vatteninstallation 2026:1 ett typgodkänt aktivt skydd i kök, där båda
       typerna duger. Vattenlarm ligger kvar på /vattenlarm.

       Vinkeln är att godkännandet går att slå upp, att sex produkter är
       godkända enligt CR 139 och att ingen konsumentsida vet det. Den
       vanligaste uppgiften i kategorin, att bara två vattenfelsbrytare är
       godkända, är hämtad ur ett pressmeddelande från 2022.

       ⚠️⚠️ REGISTRET GÅR ATT LÄSA, och det vände sidan 2026-08-06. RISE öppna
       certifikatregister ligger på `cert.ri.se`, inte på `ri.se`, och är fullt
       sökbart: 5 127 certifikat via POST /api/v1/sv/ProductCertificate/Paged.
       Den gamla noten om att registret inte gick att söka utifrån gällde fel
       värd, och hela kriterium 1 var byggt på den. Kriteriet mätte publicering
       och mäter nu godkännande. Se lib/corrections.ts 2026-08-06.

       Registret gav också certifikatens GILTIGHETSTID, som ingen tillverkare
       skyltar med, och som är en ny tabellrad. Vatettes centrala brytare löper
       ut 2027-01-30.

       ⚠️ Kategorins enda affiliateprogram, VVSochBad via Partner-ads på
       2,40 %, är dyrast eller näst dyrast på båda de centrala brytarna. Vi
       länkar dit ingen produkt. Se .agent/research/vattenfelsbrytare.md §9.11. */
    href: "/vattenfelsbrytare",
    label: "Vattenfelsbrytare",
    category: SAKERHET,
    blurb: "Sex är godkända enligt CR 139. Registret är öppet.",
    /* Live 2026-08-05. Alla fem priser lästa på butikens egen sida 2026-08-04,
       och de tre typgodkännandena hämtade som PDF hos RISE via tillverkarnas
       dokumentbibliotek. Ingen av de sex konkurrentsidorna nämner CR 139 eller
       branschreglernas 2026:1, och ingen återger ett certifikatnummer.

       Reparerad 2026-08-06: kriterium 1 omgjort mot RISE öppna register, ny
       rad för certifikatens giltighetstid, fyra betyg omräknade, samtliga fem
       omdömen omskrivna, tre godkända produkter tillagda bland de övervägda.
       Priserna är INTE kontrollerade om. */
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-05",
  },
  {
    /* `vattenlarm` 2 400/mån mot `läckagevarnare` 90, alltså tjugosex gånger.
       Sidan rankar bara sensorerna. Vattenfelsbrytare bär 2 900/mån i egen rätt
       och får en egen sida, vilket också håller isär två produkter som skiljer
       en tiopotens i pris. Se .agent/research/vattenlarm.md. */
    href: "/vattenlarm",
    label: "Vattenlarm",
    category: SAKERHET,
    blurb: "Larmar det i mobilen eller bara i ett tomt hus?",
    /* Live 2026-08-03. Alla nio priser omkontrollerade hos butiken samma dag:
       åtta stämde, Tapo T300 hade fallit från 199 till 179 och är rättad. De
       fyra Kjell-produkternas kundbetyg räknade skrivna recensioner i stället
       för antalet betyg och är omlagda till butikens aggregateRating.

       2026-08-05: de tre bortvalda som är vattenfelsbrytare pekade framåt mot
       en sida som inte fanns. Den finns nu, så texterna säger var produkterna
       rankas i stället. LK Cubicsecure fick samtidigt sitt certifikatnummer
       och ett omkontrollerat riktpris, 4 798 till 5 373 hos en annan butik.

       2026-08-06, gap-pass: tabellen gick från fem till nio jämförelserader,
       alla hämtade hos tillverkarna. Fem påståenden om att en uppgift saknades
       visade sig falska och tre betyg är omräknade, men ingen produkt bytte
       plats. Se lib/corrections.ts och research §13. */
    status: "live",
    updated: "2026-08-06",
  },
  {
    /* `brandvarnare` 9 900/mån mot `smart brandvarnare` 720. Den här sidan
       rankar bara de icke-smarta, alltså fristående och radiosammankopplade
       utan app. De app- och hubbanslutna får /smart-brandvarnare, och
       /optisk-brandvarnare ströks eftersom nästan allt som säljs i Sverige är
       optiskt och sidorna hade blivit dubbletter. Se
       .agent/research/brandvarnare.md. */
    href: "/brandvarnare",
    label: "Brandvarnare",
    category: SAKERHET,
    blurb: "Larmar de tillsammans, eller bara den som står närmast branden?",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-02",
  },
  {
    /* `brandsläckare` 12 100/mån, alltså mer än brandvarnare, och toppbudet är
       23 kr mot deras 60. Släckmedlen delar inte marknaden: allt som säljs till
       privatpersoner är pulver, så ingen /pulverslackare. Släckspray och
       litiumbrand blir egna sidor. Se .agent/research/brandvarnare.md. */
    /* `slackspray` byggd 2026-08-05. Sjätte sidan i brandfamiljen.

       VALD PÅ INTERN EFTERFRÅGAN, inte på volym. Kön i sidkarta-framat.md är
       slut, och av alla keyword-CSV:er finns bara nio termer med minst 500
       sökningar i månaden — samtliga har redan en sida. Sidan valdes därför på
       ett stående löfte i läsartext: /brandslackare säger om släcksprayen att
       "den får en egen sida hos oss". Samma metod som gav /hygrometer.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. `släckspray` finns inte i någon keyword-CSV.
       Ta med `släckspray`, `brandsläckningsspray`, `släckspray litium` och
       `brandspray` i nästa Keyword Planner-körning.

       FYNDET: släcksprayer omfattas av SS-EN 3–7, alltså samma standard som
       handbrandsläckarna på /brandslackare, och klassen ska stå på burken.
       Housegard FireStopper anger 5A 21B (E) 5F och Taerosol Fire Fighter
       3A 13B (E) 5F. Den lägsta klassning som rekommenderas till hemmet är
       43A 233B C, alltså ett testbål ungefär åtta respektive fjorton gånger
       större, och den nås bara av en sexkilos pulversläckare eller en
       niolitersskumsläckare. Sidorna förklarar samma kod och länkar i varandra.

       ANDRA FYNDET: Biltema anger ingen klass alls för någon av sina två
       sprayer. Det är ett utfall på kriteriet och inget tomrum, se
       ALDRIG_BEDOMD i lib/spec-schema.mjs.

       TREDJE FYNDET: litiumsprayerna säljs mot ett brandscenario standarden
       inte provar. SS-EN 3–7 har ingen klass för litiumjonbatteribrand, och den
       A-klass Lith-EX bär gäller trä och textil.

       KÄLLAN är ett examensarbete från Avdelningen för Brandteknik vid Lunds
       universitet, skrivet hösten 2020 och publicerat 2022, med släckförsök på
       övningsfältet Revinge. ⚠️ Det är inte en ackrediterad provning och inte
       en myndighetsgranskning, vilket sidan säger rakt ut. Rapportens egen
       slutsats är sidans utgångspunkt: största bristen är "bristande eller
       annars misstolkningsbar information från tillverkare och återförsäljare".

       ⚠️ Housegards påstående att sprayen "ligger nära en traditionell
       handbrandsläckares egenskaper" är LTH:s citat från omkring 2020.
       housegard.se/brandslackare/slackspray.html svarar 404 i dag, så det får
       aldrig skrivas i presens. Samma fälla som pressmeddelandet på
       /vattenfelsbrytare.

       ⚠️ KATEGORIN ÄR LITEN och det är kartlagt. Julas släckspraykategori
       innehåller "0 av 0 produkter", och Brandvarnare.se — sajtens bästa
       program på 15 % — för ingen släckspray alls. Fem produkter är hela
       marknaden.

       ⚠️ INGEN AV BUTIKERNA FINNS I ADTRACTION. Nayad, Clas Ohlson, Biltema och
       Brandspecialisten saknas alla i katalogens 480 program, och inget eget
       program hittades. Sidan länkar bästa pris.
       Se .agent/research/slackspray.md. */
    href: "/slackspray",
    label: "Släckspray",
    category: SAKERHET,
    blurb: "43A rekommenderas för hemmet. Sprayerna når 5A och 3A.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-05",
    count: 5,
  },
  {
    href: "/brandslackare",
    label: "Brandsläckare",
    category: SAKERHET,
    blurb: "55A eller 43A? Siffran på etiketten som ingen förklarar.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-02",
  },
  {
    /* `brandfilt` 5 400/mån, bud 19,47 kr. Vinkeln är att EN 1869 finns i två
       versioner: 1997 provade brand i matolja och elektrisk ledningsförmåga,
       2019 lade till ett heptanprov för brand i vätska. Årtalet står ofta i
       butikstexten, och när det inte gör det står det tryckt på förpackningen.
       Se .agent/research/brandvarnare.md och .agent/research/brandfilt.md. */
    href: "/brandfilt",
    label: "Brandfilt",
    category: SAKERHET,
    blurb: "Årtalet efter EN 1869 avgör vad filten faktiskt provats mot.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-02",
  },
  {
    /* `kolmonoxidvarnare` cirka 1 880/mån och toppbudet 5,56 kr, alltså det
       billigaste i hela brandfamiljen. Vinkeln är att EN 50291 har två delar:
       del 1 gäller bostäder, del 2 gäller husvagn, husbil och båt med krav på
       vibration och temperaturväxling. Fyra av sex är provade enligt båda.
       Den andra vinkeln kom ur reparationspasset 2026-08-06: driftstemperatur.
       X-Sense XC01-M fungerar först vid +4 °C, de fem andra ner till -10 °C.
       ⚠️ Utgåveaxeln som sidan byggdes på visade sig vara ett researchfel, se
       lib/corrections.ts. Gasolvarnare är en annan sensor och blir egen sida,
       se .agent/research/kolmonoxidvarnare.md. */
    href: "/kolmonoxidvarnare",
    label: "Kolmonoxidvarnare",
    category: SAKERHET,
    blurb:
      "Fyra av sex får sitta i husvagnen. En fungerar inte under fyra plusgrader.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-02",
  },
  {
    /* `brandstege` 1 300/mån plus räddningsstege 170 och utrymningsstege 170.
       Termen täcker två marknader: hängande fönsterstegar för 699 till 2 249
       kronor och fasta fasadstegar från 5 599. Den här sidan rankar bara de
       hängande, de fasta får /utrymningsstege. Vinkeln sedan 2026-08-06 är
       engångsbruket: sex av åtta stegar ska enligt sin egen bruksanvisning
       kasseras efter en utlösning, och samtliga manualer säger att du inte ska
       fälla ut stegen när du övar. Kilotalet är fortfarande ett andra fynd. Se
       .agent/research/brandstege.md. */
    href: "/brandstege",
    label: "Brandstege",
    category: SAKERHET,
    blurb:
      "Sex av åtta ska kasseras efter en utlösning. Det står i manualen, inte i butiken.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-02",
  },
  {
    /* Fasta fasadstegar. Egen sida efter användarbeslut 2026-08-02: en hängande
       stege för 699 kronor och en Skeppshultstege för 9 199 löser inte samma
       problem, och bara den fasta räknas som utrymningsväg i BBR när fönstrets
       underkant sitter mer än fem meter över marken. */
    href: "/utrymningsstege",
    label: "Utrymningsstege",
    category: SAKERHET,
    blurb:
      "Fast monterad på fasaden, och det enda byggreglerna räknar över fem meter.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-02",
  },
  {
    href: "/smart-brandvarnare",
    label: "Smart brandvarnare",
    category: SAKERHET,
    blurb:
      "Google la ner Nest Protect. Vad finns kvar som faktiskt går att köpa?",
    /* Först live 2026-08-03, efter att alla åtta priser kontrollerats mot
       butikernas egna sidor. Se .agent/priskoll-2026-08-03.md. */
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-02",
  },
  {
    /* `övervakningskamera` 8 100/mån mot `säkerhetskamera` 260 och
       `bevakningskamera` 720, alltså trettio respektive elva gånger. Första
       slugen på sajten som är avgjord av siffror i stället för gissad. Sidan
       rankar bara utomhuskameror: inomhus är enligt IMY oftast tillåtet och är
       ett annat köp. Se .agent/research/overvakningskamera.md. */
    href: "/overvakningskamera",
    label: "Övervakningskamera",
    category: SAKERHET,
    blurb: "Maskeringen som glider av när kameran svänger.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-03",
  },
  {
    /* `dörrklocka med kamera` 1 300/mån mot `videodörrklocka` 170 och
       `smart dörrklocka` 140. Systersida till /overvakningskamera, och den
       enda kategori där IMY har ett eget exempel som säger nej: en dörrkamera
       på en lägenhetsdörr faller utanför privatundantaget. */
    href: "/dorrklocka-med-kamera",
    label: "Dörrklocka med kamera",
    category: SAKERHET,
    blurb:
      "I lägenhet gäller inte privatundantaget. I villa avgör om du hör den.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-03",
  },
  {
    /* Inomhus är enligt IMY oftast tillåtet, även kopplat till larmcentral.
       Undantaget är hemtjänst, där myndighetens eget exempel säger nej
       eftersom personalen bevakas under sin arbetstid. Den enda kontrollen du
       kan se med egna ögon är ett fysiskt linsskydd. */
    href: "/inomhuskamera",
    label: "Inomhuskamera",
    category: SAKERHET,
    blurb: "En avstängning du kan se är den enda integritet du kan lita på.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-03",
  },
  {
    /* `kodlås ytterdörr` 5 400/mån mot `smarta lås` 260, alltså tjugo gånger.
       Svenskar söker inte "smart lås", de söker kodlås. Slugen ändrad innan
       sidan byggdes. Se .agent/keywords/utfall.md. */
    /* `kodlås ytterdörr` 5 400/mån mot `smart lås` 480, alltså elva gånger.
       Varumärkestermen `yale doorman` bär dessutom 27 100 i egen rätt, den
       starkaste enskilda varumärkeseffekten vi mätt. Vinkeln är att
       varje SBSC-certifikat i kategorin bär ett villkorsfält, och två av dem
       stänger av den funktion produkten säljs på. Se
       .agent/research/kodlas-ytterdorr.md. */
    href: "/kodlas-ytterdorr",
    label: "Kodlås till ytterdörr",
    category: SAKERHET,
    blurb: "Fem certifikat, fem villkor. Två stänger av en säljande funktion.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-03",
  },
  {
    /* `hemlarm` 2 900/mån, och toppbudet 40,61 till 179,12 kr är sajtens
       högsta med marginal: brandvarnare toppar på cirka 60. Sajtens första
       tjänst i stället för produkt, se lib/services.ts. Larm utan abonnemang
       blir en egen systersida efter användarbeslut 2026-08-03, av samma skäl
       som brandvarnare delades i två. */
    href: "/hemlarm",
    label: "Hemlarm",
    category: SAKERHET,
    blurb: "Två av åtta bolag skriver ut vad tjänsten faktiskt kostar.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-03",
  },
  {
    /* Systersidan till /hemlarm, beslutad 2026-08-03. Slugen är vald på
       bedömning och inte på siffror: `larm utan abonnemang` är inte mätt i
       Keyword Planner. Alternativen var `/inbrottslarm`, uppmätt till 590 i
       månaden men tyst om abonnemang, och `/hemlarm-utan-abonnemang`, som
       bygger in kannibalisering mot /hemlarm i själva URL:en. Termen ska med
       i nästa körning. Se .agent/research/larm-utan-abonnemang.md §1. */
    href: "/larm-utan-abonnemang",
    label: "Larm utan abonnemang",
    category: SAKERHET,
    blurb: "Två av fem säljer reservuppkopplingen som ett abonnemang.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-03",
  },
  {
    /* `luftrenare` 18 100/mån, och den jämnaste säsongen vi mätt: kvot 1,2
       mellan topp och botten, mot 6,1 för luftfuktare. Öppnar gruppen Hem &
       hushåll. ⚠️ Ingen av våra tio befintliga programbutiker säljer
       luftrenare, men Kjell finns i Adtractions katalog på 5 procent. Se
       .agent/plans/affiliatenatverk.md. */
    href: "/luftrenare",
    label: "Luftrenare",
    category: HEM_HUSHALL,
    blurb: "Fyra av tjugo klarade inte ozongränsen när myndigheterna mätte.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-03",
  },
  {
    /* `skaftdammsugare` är klustrets största term, mätt i Google Trends för
       Sverige över tolv månader 2026-08-06: 1 401 mot 598 för handdammsugare
       och 563 för sladdlös dammsugare. Keyword Planner-volymen är inte mätt,
       och det är uppföljning och inte ett hinder. Se
       .agent/research/skaftdammsugare.md §2.

       Avgränsningen mot /robotdammsugare och mot handdammsugare kommer ur
       branschens egen indelning: Råd & Rön, Elgiganten, NetOnNet, Jula och
       Bosch håller alla tre isär. De två sidorna nämner inte varandra i dag
       annat än som avgränsning.

       Vinkeln är att drifttiden på kartongen är uppmätt i ekoläge, i flera
       fall med ett munstycke utan motor. Bosch anger själva 80 minuter så och
       11 i turboläge med det motoriserade golvmunstycket; Philips anger 60 mot
       15; Electrolux 700 anger 40, 20 och 10. Ingen av de sex konkurrentsidor
       vi mätte skriver det, och den enda som citerar Råd & Rön citerar en
       uppdatering från september 2022.

       ⚠️ Bosch Home SE och Siemens Home SE är sajtens första annonserbara
       program i en stor kategori: 4 respektive 5 procent, 45 dygns cookie och
       ppcMarketing 2, mot noll av sju i Elektronik. Men Bosch egen butik ligger
       omkring 20 procent över handeln på samma modell, så sidan länkar Power,
       NetOnNet, Kjell, Elgiganten och Proshop, som ger läsaren rätt pris. Se
       .agent/research/skaftdammsugare.md §4. */
    href: "/skaftdammsugare",
    label: "Skaftdammsugare",
    category: HEM_HUSHALL,
    blurb: "80 minuter på kartongen blir 11 när borsten snurrar.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-06",
  },
  {
    /* `luftfuktare` 18 100/mån, och sajtens skarpaste säsong: kvot 6,1 mellan
       topp och botten mot 1,2 för luftrenare, med toppen i vintern. Sidan är
       den enda i sitt slag som säger vad SweSIAQ säger, alltså att man i
       allmänhet bör undvika konstgjord befuktning, och den enda som citerar
       FoHMFS 2014:14. Butikerna är Kjell, Apotea och Clas Ohlson, de två
       första på 5 procent. Se .agent/research/luftfuktare.md. */
    href: "/luftfuktare",
    label: "Luftfuktare",
    category: HEM_HUSHALL,
    blurb: "Expertorganet för inomhusmiljö avråder från hela produktkategorin.",
    /* Live 2026-08-03. Alla tolv priser kontrollerade samma dag med
       scripts/priskoll.mjs, Clas Ohlsons via webblaesare eftersom butiken
       botkontrollerar. Wilfa Lotus togs in i rankningen sedan lagerstatus
       slutade vara ett skaal, och Wilfa Dews laenk saknade Kjells
       artikelsuffix och gick till kategorisidan. Baada raettade.

       Manualpass 2026-08-06: sju publicerade "anges inte" var falska, fem av
       dem loesta i ett dokument butiken sjaelv laenkade. Wilfa Dew TX450 gick
       fraan tolfte till sjaette plats. Se lib/data/luftfuktare.ts. */
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-03",
  },
  {
    /* `avfuktare` 12 100/mån. Tredje och sista sidan i luftklustret, som med
       luftrenare och luftfuktare på 18 100 var blir 48 300 sökningar i
       månaden. Vinkeln är att talet i modellnamnet är uppmätt vid 30 °C och
       80 % RH och att du får ungefär 40 procent av det i ett svalt rum. Meacos
       egen extraktionstabell bevisar det rad för rad: Arete One 25L tar 10,7
       liter vid 20 °C och 60 % RH och 3,5 liter vid 10 °C och 60 % RH.
       SS-EN 810 finns och är gällande sedan 1997, men gäller bara
       kompressoravfuktare. Se .agent/research/avfuktare.md. */
    href: "/avfuktare",
    label: "Avfuktare",
    category: HEM_HUSHALL,
    blurb: "Apparaten som heter 25L tar 10,7 liter i en sval källare.",
    /* Live 2026-08-03. Alla tolv priser kontrollerade samma dag, sju av dem
       hos Clas Ohlson via webblaesare. eeese Adam och Clas Ohlsons tioliters
       kom in i rankningen samtidigt, se .agent/uppgift-atersta-slutsalda.md.

       ⚠️ 2026-08-06: fyra betyg och aatta placeringar aendrade efter att
       Meacos och eeeses egna spectabeller lasts. Samma dag, andra passet: tre
       betyg och tre placeringar till efter Wood's bruksanvisning foer
       SW-serien, som har en egen rad foer 20 °C/70 % RF, och Kjells
       spectabell foer Xiaomi. Se lib/corrections.ts. */
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-03",
  },
  {
    /* `hygrometer` byggd 2026-08-04. Sidan foeddes ur intern efterfraagan och
       inte ur volym: fyra sidor ber elva gaanger laesaren maeta fukten foerst,
       utan att ha naagot att laenka till. Fyra inlaenkar fraan sidor som redan
       rankar, direkt vid lansering.

       ⚠️ VOLYMEN AER ALDRIG MAETT. Termen finns inte i naagon av vaara
       keyword-CSV:er. Systertermen `luftkvalitetsmaetare` ligger paa 720/maan.
       Koer Keyword Planner paa `hygrometer`, `fuktmaetare` och
       `luftfuktighetsmaetare` naer det passar. Sajten har gissat
       slug tvaa gaanger och haft fel baada gaangerna, se
       .agent/keywords/utfall.md.

       ⚠️ VINKELN AER OMSKRIVEN 2026-08-06 EFTER ETT SAKFEL. Sidan paastod att
       tvaa av tretton maetare anger hur maanga procentenheter de faar visa fel.
       Ett gap-pass mot bruksanvisningarna gav FEM av de sju rankade, och tre av
       de kontrollerade fraanvaropaastaaendena var falska: TFA Moxx, Rubicson
       Kompakt och Beurer HM 22. Tre placeringar aendrades. Se
       lib/corrections.ts.

       LAERDOMEN, och den gaeller hela sajten: toleransen staar aldrig i
       produktsidans spectabell. Den staar paa sista uppslaget i
       bruksanvisningen, som PDF, en laenk ned fraan samma sida. Oeppna den.

       Vinkeln nu: ± 5 procentenheter i mellanspannet och ± 8 utanfoer aer
       branschstandard, och Rubicson Kompakt (179,90), Beurer HM 16 (199,90) och
       Beurer HM 22 (269) anger identiska tal. Standarden aer foer vid foer de
       tre graenser laesaren ska agera vid, som ligger inom femton
       procentenheter. Tvaa slaar den: TFA Moxx med ± 4 och Govee H5075 med ± 3.
       Sex svenska jaemfoerelsesajter korar Shelly H&T Gen 3, som fortfarande
       inte publicerar naagot tal alls; den fraanvaron drar inte ner betyget.
       Butikerna aer Kjell, Proshop, Clas Ohlson och Hornbach; bara Kjell aer
       kartlagd, paa 5 procent, och den tillaater inte PPC. Se
       .agent/research/hygrometer.md. */
    href: "/hygrometer",
    label: "Hygrometer",
    category: HEM_HUSHALL,
    blurb: "Tre mätare, tre priser, exakt samma felmarginal.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-04",
  },
  {
    /* `luftkvalitetsmaetare` 720/maan, uppmaett 2026-08-01, konkurrens High
       index 100 med toppbud 2,57 till 19,85 kr. Systersida till hygrometer och
       byggd samma dag, efter anvaendarbeslut att dela pao tvao sidor.

       Detta aer en dyr kategori: 729 till 3 299 kronor mot hygrometerns 139,90
       till 1 199. Vinkeln aer att givaruppsaettningen inte aer den man tror.
       Tre av aotta saknar CO2-givare helt trots att de saeljs som
       luftkvalitetsmaetare, och Mill Sense anger `eCO2` i butikens egen text,
       alltsao ett tal uträknat ur VOC-halten. Mill skriver sjaelv i sin
       bruksanvisning att eCO2 laeses hoegre aen den faktiska halten.

       ⚠️ Airthings NDIR-tal skiljer per modell: Wave Plus ±30 ppm ±3 %,
       View Plus ±50 ppm ±3 %, Wave Enhance ±50 ppm ±5 %. Sidan skrev samma
       tal foer alla tre till 2026-08-06. Den noggrannaste sitter alltsao i
       mellanmodellen. Kriteriet `Angiven noggrannhet` aer borttaget: det
       maette vad tillverkaren publicerat, inte vad varan goer.

       ⚠️ Radonregeln ligger i koepguiden och FAQ, INTE i rankningen, efter
       anvaendarbeslut. SSM: en korttidsmaetning "kan inte anvaendas foer naogot
       myndighetsbeslut". Ingen av de fyra konkurrenterna naemner det.

       ⚠️ Inget pris pao ackrediterad maetning publiceras: laboratoriernas egna
       produktsidor svarar 404 och sökresultaten gav tre olika tal.

       Butikerna aer Clas Ohlson och Proshop, ingen av dem i Adtraction. Se
       .agent/research/luftkvalitetsmatare.md. */
    href: "/luftkvalitetsmatare",
    label: "Luftkvalitetsmätare",
    category: HEM_HUSHALL,
    blurb: "Tre av åtta mäter inte koldioxid, hur mycket de än kostar.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-04",
  },
  {
    /* `robotgraesklippare` 49 500/maan, uppmaett 2026-08-01. Sajtens stoersta
       kategori tillsammans med robotdammsugare.

       BYGGD I AUGUSTI AV ETT SKAEL: saesongen aer den skarpaste vi maett,
       kvot 13,6. 9 900 i januari, 135 000 i maj och juni. Sidan byggs paa
       nedgaangen foer att hinna aaldras foere rampen i mars. Samma resonemang
       som valde luftfuktare.

       ⚠️ Vinkeln "utan slinga" aer redan avgjord: 17 av 18 robotar hos Clas
       Ohlson aer slingloesa. Den fraagan aer inte laengre ett val.

       Fyndet ligger i koepguiden och inte i betygen: Rasmussen m.fl. provade
       18 robotar mot igelkottar och ingen upptaeckte djuret innan paakoerning.
       2024 publicerades ett standardiserat saekerhetsprov med klassning 0-4,
       foereslaget foer CENELEC. Ingen tillverkare redovisar ett resultat.
       Husqvarna vaelkomnar forskningen och publicerar ingen siffra.

       ⚠️ Igelkotten aer INGET kriterium: inga provresultat per modell finns,
       och 2024 aars studie kunde inte belaegga att naagot konstruktionsdrag
       foerutsaeger utfallet. Ett betyg vore ett paahittat maetvaerde.

       ⚠️ Raad & Roens test av 69 robotar ligger bakom betalvaegg. Inga
       modellbetyg daerifraan aatergess.

       ⚠️ Adtraction aer i praktiken tomt: enda traeffen aer Bosch Home SE paa
       4 %, och Bosch saeljer inga robotar i sortimentet. Se
       .agent/research/robotgrasklippare.md. */
    href: "/robotgrasklippare",
    label: "Robotgräsklippare",
    category: HEM_HUSHALL,
    blurb: "Ingen av de provade robotarna såg igelkotten innan den kördes på.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-04",
  },
  {
    /* `fonsterputsrobot` byggd 2026-08-04. Femte maskinsidan i Hem & hushall.

       Sokvolymen ar inte uppmatt och det ar ingen blockerare. Sidan star pa
       att den svarar pa en fraga ingen annan svarar pa.

       Fyndet efter omarbetningen 2026-08-06: minsta ruta spanner fran 22 x 25
       till 40 x 40 cm, alltsa nastan tre ganger ytan, och det avgor kopet oftare
       an priset. Winbot Mini ar ensam under 30 x 40. Halltid: Karcher 40 min med
       batteridata, W2 Pro och Mini 30, W2 Omni mer an 30, bada HOBOT 20 var.
       Baglost glas: fyra Ecovacs godkanda, HOBOT-388 forbjuder, Karcher kraver
       bage enligt sin manual.

       Svenska vinkeln ar sprojsen, och den ar nu ett kop-rad och inte ett
       avrad: ett korspostfonster ligger kring 30 x 40 cm och stryker fyra av
       de sju, men Winbot Mini kommer upp pa det.

       ⚠️ Tva kandidater foll fore den har. Matavfallskvarn diskvalificerades av
       regelverket: sedan 2024-01-01 ar kvarnar direkt till avloppet inte
       godkanda. Fonsterputsrobot nara diskvalificerades pa min egen felaktiga
       skrapning av butikernas kategorisidor.

       Butiker: NetOnNet, Proshop, Elgiganten, Teknikproffset. Adtraction ej
       kartlagt for markena. Se .agent/research/fonsterputsrobot.md. */
    href: "/fonsterputsrobot",
    label: "Fönsterputsrobot",
    category: HEM_HUSHALL,
    blurb:
      "Minsta rutan spänner från 22 × 25 till 40 × 40 cm. Måttet stryker fyra av sju innan priset spelar roll.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-04",
  },
  {
    /* `smart-hem-hubb` byggd 2026-08-04. Punkt 7 i sidkarta-framat.md.

       Byggd av intern efterfragan: orden hubb, gateway, brygga och bridge
       forekommer 285 ganger over 16 kategorier, och det fanns inget lankmal.
       Hygrometersidan byggdes pa elva omnamnanden over fyra filer.

       Fyndet: ordet hubb tacker tre olika produkter pa samma hylla, 329 till
       4 999 kr. Markesbrygga (Plejd Gateway styr enbart Plejd, enligt Plejd),
       Matter-controller (Aqara M100 ar bade bridge och controller for 329 kr)
       och universell hubb (Homey Pro talar varje radio och kor lokalt).

       ⚠️ RESEARCHPASS 2026-08-06 rev fyra pastaenden om saknade uppgifter och
       fann tva fel at andra hallet. Aqara M3 har IR-blaster och kor lokalt,
       Aqara M100 ar Matter Controller, Hue Bridge kor lokalt. HA Green har
       inga inbyggda radior alls och Homey Pro mini saknar aven Z-Wave och BLE.
       Fyra placeringar flyttade. Se /rattelser och datafilens huvud.

       ⚠️ Kvar som konflikt: Kjell sager att Hue Bridge kan lagga till andra
       markens produkter, Philips tva egna dokument beskriver bara riktningen
       utat. Vi foljer tillverkaren.

       ⚠️ IKEA Dirigera rankad 2026-08-06 efter anvandarbeslut, som attonde
       produkt och pa femte plats. IKEA skriver sjalva att den ar bade
       Matter-brygga och Matter-styrenhet. Enda produkten som inte lankar till
       Kjell: IKEA ligger pa 9 % mot Kjells 5 %.

       ⚠️ Raden Thread Border Router for Dirigera ar sidans enda cell som inte
       vilar pa tillverkaren. IKEA dokumenterar inte Thread; tva tekniska
       genomgangar visar firmware 2.805.6 och OpenThread 1.4.

       Alla sju lankar gar till Kjell, som har hela sortimentet och ligger pa
       5 % / 30 d i Adtraction. Koncentrationen star utskriven pa sidan.
       Se .agent/research/smart-hem-hubb.md. */
    href: "/smart-hem-hubb",
    label: "Smart hem-hubb",
    category: SMART_HEM,
    blurb: "Tre olika produkter säljs under samma ord, från 329 till 4 999 kr.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-04",
  },
  {
    /* `smart-termostat` byggd 2026-08-04. Punkt 8 i sidkarta-framat.md.

       AVGRANSNING efter anvandarbeslut: ordet tacker fyra produkter i svensk
       handel, och sidan rankar bara radiatortermostater, alltsa de som skruvas
       pa ventilen pa ett vattenburet element. Rums- och golvvarmetermostat,
       IR-styrning av luftvarmepump och framledningsstyrning (Ngenic) forklaras
       i kopguiden och far egna sidor. Slugen ar bred och H1 bar avgransningen,
       samma losning som /brandvarnare.

       FYNDET: alla anger en besparingsprocent utom de som provat produkterna.
       Fibaro 42 %, Netatmo 37 %, Danfoss 30 %, tado 28 %, Aqara ingenting.
       Ljud & Bild, som holl i tre av dem, vagrar ange ett tal och skriver att
       det skulle krava ett test under valdigt lang tid. Stiftung Warentest, som
       labbprovade elva, lagger avsnittet bakom betalvagg.

       ⚠️ Fibaros 42 % ar fotnotat "Based on research by Fibar Group S.A.",
       alltsa tillverkarens egen opublicerade forskning. Hogsta talet, tunnaste
       underlaget.

       ⚠️ tados 28 % kommer fran Fraunhofer IBP-Report 579 E (2022), last i
       original: det ar en TRNSYS-SIMULERING med testarsklimat for MUNCHEN,
       spannet ar 12-28 och hela rapporten fas bara av uppdragsgivaren tado.
       Skriv aldrig att nagon mätt det i bebodda hus.

       ⚠️ BESPARINGEN AR INGET KRITERIUM, efter anvandarbeslut. Det finns inga
       provresultat per modell, bara tillverkarnas egna pastaenden, och att
       betygsatta ett pastaende ar att mata butikens copywriting. Samma
       resonemang som igelkotten pa /robotgrasklippare.

       ANDRA FYNDET: adaptertabellerna finns, men aldrig dar man koper. tado
       publicerar sex adaptrar som ingar och fyra som inte gor det, i sitt
       hjalpcenter; butikstexten sager "en mangd olika tillverkare". Netatmo
       skiljer likadant i sitt hjalpcenter. Aqara ar ensam om att lagga listan
       pa produktsidan, och E1 ar ensam om att namna vad som INTE fungerar:
       manuella ventiler, RTL och enrorssystem.

       ⚠️ Danfoss tva artikelnummer, lasta hos Danfoss egen butik: 014G2460
       tacker "RAV; RA; RAVL; M30" och kostar 760 kr, 014G2420 tacker "RA; M30"
       och kostar 890. Den dyrare passar farre ventiler, och butiken kallar den
       for RA-versionen.

       ⚠️ Warentest fann att en av elva inte klarade frostskyddsprovet. Vilken
       ligger bakom betalvagg och far aldrig gissas.

       Butiker: Kjell 5 %/30 d och Proshop 3,2 %/7 d. Inget markesprogram nar
       Sverige for tado, Danfoss, Aqara, Netatmo eller SONOFF.
       Se .agent/research/smart-termostat.md. */
    href: "/smart-termostat",
    label: "Smart termostat",
    category: SMART_HEM,
    blurb:
      "Fran 2 till 10 ventilfattningar, och butiken skriver aldrig vilken.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-04",
  },
  {
    /* `nyckelskap` byggd 2026-08-05.

       SLUGEN ÄR VALD PÅ HANDELNS SPRÅKBRUK, INTE PÅ SIFFROR. Termen är inte
       uppmätt: grep på `skåp` och `skap` över samtliga keyword-CSV:er ger noll
       träffar. Kjell, Jula, Biltema och Clas Ohlson använder alla nyckelskåp i
       produktnamnen, och Villaägarna har det i rubriken. `nyckelgömma` och
       `nyckelbox` ska med i nästa Keyword Planner-körning. Sajten har gissat
       slug två gånger och haft fel båda gångerna, se .agent/keywords/utfall.md.

       AVGRÄNSNING efter användarbeslut: sidan rankar bara konsumentboxarna,
       349 till 2 599 kr. Ordet täcker även SSF 3492-klassade stålskåp som
       börjar på 5 495 kr och rymmer 42 till 2 400 nycklar; de förklaras i
       köpguiden och får en egen systersida. Samma lösning som /brandstege mot
       /utrymningsstege, och H1 bär avgränsningen som på /brandvarnare.

       FYNDET: RISE provade fyra nyckelskåp åt Villaägarna, rapport P115210
       2022-11-07, metod SS-EN 1630:2021 på nivå RC2 och RC3. Samtliga fyra
       forcerades. Med kofot lossnade alla från väggen på 16 till 75 sekunder.

       ⚠️ Master Lock 5441 är det skåp som klarar sig BÄST mot standardens
       verktyg och som öppnades på 9 sekunder med 8 slag av en 700 grams
       snickarhammare. Hammaren ingår inte i verktygslistorna i SS-EN 1630;
       RISE lade till den som en objektsspecifik svag punkt. Vinnaren mot
       metoden är förloraren mot hammaren.

       ⚠️ SKÅPEN ÄR INTE KLASSADE ENLIGT RC2 ELLER RC3. RISE skriver rakt ut att
       standarden inte omfattar nyckelskåp och att den valdes som lämplig metod
       för att simulera ett standardiserat inbrottsförsök. Skriv aldrig att ett
       skåp "är RC2".

       ⚠️ VARIANTFÄLLAN, kontrollerad och avgjord: RISE provade ABUS 787C med
       analog kod, bekräftat i rapportens Bild 5 som visar fyra mekaniska
       kodhjul. Kjell säljer ABUS KeyGarage 787 Smart-BT, alltså elektronisk
       knappsats med sexsiffrig kod och app. Provresultatet gäller den mekaniska
       787:an, EAN 4003318463310, och får aldrig knytas till Smart-BT. Samma
       fälla som Nanoleaf Lines mot Essentials på /smart-belysning.

       ⚠️ Fem svenska konkurrenter rankar på ordet och ingen av dem nämner RISE,
       Villaägarna, SS-EN 1630 eller RC2. Testkollen anger i stället SSF 3492 på
       ett skåp för 479 kr och EN 1143-1 på ett för 899, när golvet för ett
       verkligt SSF 3492-skåp ligger på 5 495 kr och EN 1143-1 är
       värdeskåpsstandarden. Påståendet att Råd & Rön provat kategorin är
       obelagt och får varken citeras eller motbevisas.

       Butiker: Byggahus Shop, Nordsec, Kjell 5 % och E-safe 7,5 % med
       ppcMarketing 2. E-safe är sajtens bästa villkor hittills.
       Se .agent/research/nyckelskap.md. */
    /* `usb-c-laddare` byggd 2026-08-05. Öppnar gruppen Elektronik.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. `laddare` ger noll träffar i samtliga
       keyword-CSV:er under .agent/. Termen fanns inte i planen, i
       ideas-testsidor.md eller i sidkarta-framat.md: sidan är en beställning
       utifrån och inte en köad idé. Kör Keyword Planner på `usb-c laddare`,
       `usb laddare`, `snabbladdare`, `gan-laddare` och `mobilladdare` innan
       status flippas till live. Sajten har gissat slug två gånger och haft fel
       båda gångerna, se .agent/keywords/utfall.md.

       ⚠️ SLUGEN ÄR VALD PÅ BUTIKERNAS SPRÅKBRUK, inte konkurrenternas.
       Kjell, CDON och Teknikdelar säger alla usb-c-laddare; samtliga tre
       svenska jämförelsesajter säger usb-laddare. Kjells egen kanoniska sökväg
       är dessutom /mobilladdare/usb-laddare/ trots att kategorilänken heter
       usb-c-laddare. Användarbeslut 2026-08-05.

       AVGRÄNSNING efter användarbeslut: bara väggladdare, inklusive flerports-
       och bordsladdare. Billaddare, powerbank och kablar förklaras i köpguiden
       och får egna systersidor. En enda rankning över alla effekter, inte
       delad per effektklass.

       FYNDET: direktiv (EU) 2022/2380 reglerar apparaten, inte laddaren. Bilaga
       Ia del I listar radioutrustning — mobiler, plattor och sedan 2026-04-28
       även bärbara datorer — och kravet är att *de* ska ha USB typ C. Ingenting
       i direktivet ställer krav på en fristående laddare. Den vanliga svenska
       formuleringen att EU bestämt att alla laddare ska vara USB-C är alltså
       baklänges, och konsekvensen är att laddaren är det enda ledet i kedjan
       ingen myndighet ställt krav på. Läst i original på EUR-Lex, CELEX
       32022L2380.

       ANDRA FYNDET: etiketten med det tal köparen behöver sitter på fel
       kartong. Bilaga Ia del IV kräver att apparatens förpackning anger "YY W",
       alltså den effekt en laddare minst måste ge för högsta laddhastighet,
       plus "USB PD" om apparaten stöder det — och vid distansförsäljning ska
       den visas nära prisuppgiften.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Testaankoop provade runt 40 laddare i tre
       effektklasser, refererat av Stiftung Warentest 2026-05-02, men noll av de
       nio modeller de namnger med poäng finns i Kjells eller Teknikdelars
       sortiment. Mätvärdena bär köpguiden i stället. Se
       .agent/research/usb-c-laddare.md §7.1.

       ⚠️ TESTET ÄR INTE WARENTESTS EGET. Det är belgiska Testaankoops, vilket
       Warentest skriver i löptexten och bekräftar i ett redaktionssvar. Skriv
       aldrig att Stiftung Warentest provat laddarna.

       ⚠️ TESTAANKOOP MOTSÄGER SIG SJÄLV och båda uppgifterna ska stå: i
       metodavsnittet att alla angivna effekter uppnåddes, i produktposten för
       Belkin BoostCharge Pro 3 att den ger 87 W mot utlovade 100.

       ⚠️ Testkompassen daterar direktivet till 28 dec 2025. Rätt datum är
       28 december 2024; 2025 finns i direktivet men gäller kommissionens
       utvärderingsrapport. De har läst rätt dokument och fel rad.

       ⚠️ Dustin visar priser EXKLUSIVE moms. Xtorm XEC100 står som 699 kr där
       och är alltså cirka 874 kr för konsument. Produkten är utesluten ur
       rankningen av det skälet plus att den är beställningsvara.

       Butiker: Kjell 5 %/30 d, IKEA 9 %/30 d, Teknikdelar 5 %/30 d. Tio av tolv
       länkar går till Kjell, och koncentrationen står utskriven på sidan, samma
       lösning som /smart-hem-hubb. Se .agent/research/usb-c-laddare.md. */
    href: "/usb-c-laddare",
    label: "USB-C-laddare",
    category: ELEKTRONIK,
    blurb: "EU:s krav gäller telefonen. Laddaren är ledet ingen reglerat.",
    /* Live 2026-08-05. Alla tretton priser lästa på butikernas egna
       produktsidor samma dag, och direktivet läst i original på EUR-Lex.
       Tretton packshots på plats.

       ⚠️ SLUGEN LÅSES I OCH MED DETTA. Sökvolymen är fortfarande omätt, och
       konkurrenterna använder `usb-laddare` medan butikerna använder
       `usb-c-laddare`. Fram till nu hade ett slugbyte varit gratis eftersom
       sidan aldrig legat i sitemapen; efter det här kostar det omdirigeringar.
       Publicerad på användarbeslut med den vetskapen. Kör ändå Keyword Planner
       på `usb-c laddare`, `usb laddare`, `snabbladdare` och `gan-laddare`, och
       byt bara om skillnaden är stor nog att bära ett byte.

       ⚠️ SIDAN GÅR INTE ATT ANNONSERA. Samtliga fyra butiker sidan länkar till
       bär `ppcMarketing: 0` i Adtraction: Kjell 5 %, IKEA 9 %, Teknikdelar 5 %
       och Estore 5 %. Estore tillåter visserligen PPC, men bär bara plats fem.
       Kontrollerat 2026-08-05, se .agent/research/usb-c-laddare.md §5.1b. */
    status: "live",
    updated: "2026-08-06",
    count: 13,
  },
  {
    /* `garageportsoppnare` byggd 2026-08-05. Beställd utifrån, som
       /usb-c-laddare, och alltså inte köad i planerade-sidor.md.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. `garage` ger noll träffar i samtliga
       keyword-CSV:er under .agent/. Kör Keyword Planner på `garageportsöppnare`,
       `garageportöppnare`, `garageöppnare`, `portautomatik` och
       `garageport motor` naer det passar. Sajten har gissat slug
       två gånger och haft fel båda gångerna, se .agent/keywords/utfall.md.

       SLUGEN ÄR VALD PÅ HANDELNS SPRÅKBRUK. Jula, Bauhaus, Elgiganten, CDON och
       Bygghemma säger alla garageportsöppnare med foge-s, liksom alla tre
       svenska konkurrenter. Beställningens ord `garageöppnare` förekommer i
       praktiken bara hos smarthemsåterförsäljare för Meross-modulen.

       AVGRÄNSNING efter användarbeslut: sidan rankar bara motorerna, alltså
       själva portöppnaren från 499 kr och uppåt. Smart styrning av en befintlig
       öppnare — Meross, SwitchBot, Tuya, Yale, iSmartGate, 384 till 5 353 kr —
       är en annan produkt och får en egen systersida under Smart hem. Samma
       lösning som /brandvarnare mot /smart-brandvarnare.

       FYNDET: talet som säljs är inte talet som skyddar. Chamberlains manual,
       den Clas Ohlson själva serverar, säger att kraften vid den stängande
       portkanten inte får överstiga 400 N och att fotocell blir obligatorisk
       över den. Fotocellen är tillbehör 770EML. Kategorin marknadsförs samtidigt
       på dragkraft uppåt: 600, 800, 1000 N. Ingen av de fyra öppnarna levereras
       med fotocell.

       ⚠️ ANDRA FYNDET, och det som rättade det första: Julas 377011 anger
       "230V, 100W, 700N" i sin egen försäkran om överensstämmelse. Butiken
       säljer den som "Vridmoment 700 Nm" och bär talet i produktnamnet. Newton
       är kraft, newtonmeter är vridmoment. Systermodellen 018980 anger 8 Nm och
       där stämmer butiken med manualen. De två talen var alltså aldrig
       jämförbara, och det ena har fel enhet i rubriken.

       ⚠️ TREDJE: den billigaste har den bästa dokumentationen. Julas 377011 på
       499 kr åberopar EN 12453:2017, EN 13241, EN 12635 och EN ISO 12100.
       Boxer 3000 på 1 955 kr åberopar 98/37/EG och 89/336/EEG, som enligt
       EUR-Lex upphörde att gälla 2009-12-28 respektive 2007-07-19, alltså före
       försäkrans undertecknande 2015-01-05. Det säger inget om säkerheten,
       bara om vad som går att kontrollera.

       ⚠️ FJÄRDE: Boxers svenska och danska tabell i samma PDF anger 8 respektive
       800 watt standby för samma modell, och 3,5 respektive 3 meter skena.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Ingen har provat portöppnare: varken
       Råd & Rön eller Stiftung Warentest, och de tyska träffarna är
       Vergleich-sidor. Ljud & Bilds enda test i ämnet gäller Yale Smart Opener
       och hör till systersidan. Samma läge som /utomhustimer och /vattenlarm.

       ⚠️ DRAGKRAFTEN ÄR ETT REGLAGE, inte en egenskap. Boxers manual: kraften
       ställs på en skala 1–9 där 9 är maximum. Chamberlains lärs in vid
       installation. Därför sänktes kriteriet från 40 till 25 efter
       användarbeslut, och skydd vid stängning gick upp till 30.

       ⚠️ PROGRAMFÖRSÖRJNINGEN ÄR TOM. Adtraction har ingen av kategorins
       butiker: inte Jula, Bauhaus, Biltema, Clas Ohlson, Bygghemma, Byggmax,
       Hornbach, CDON eller Elgiganten. Beijer Bygg 7 %, P Lindberg 6 % med
       ppc 2 och E-safe 7,5 % med ppc 2 är okontrollerade mot sortimentet.
       Sidan går alltså inte att annonsera och tjänar i dag ingenting, samma
       läge som /robotgrasklippare och /avfuktare.

       Se .agent/research/garageportsoppnare.md. */
    href: "/garageportsoppnare",
    label: "Garageportsöppnare",
    category: HEM_HUSHALL,
    blurb:
      "Kraften de säljer är uppåt. Den som kan klämma någon står i manualen.",
    /* Live 2026-08-05. Alla fem priser och artikelnummer lästa i butikens egen
       JSON-LD eller specifikationstabell samma dag, och kraftuppgifterna hämtade
       ur tillverkarnas bruksanvisningar som PDF.

       ⚠️ SÖKVOLYMEN ÄR FORTFARANDE OMÄTT vid lansering, efter användarbeslut.
       Slugen är vald på handelns språkbruk: Jula, Bauhaus, Elgiganten, CDON och
       Bygghemma säger alla garageportsöppnare med foge-s, liksom alla tre
       svenska konkurrenter. Kör Keyword Planner ändå, och gör det innan sidan
       hunnit indexeras: en slugändring efter indexering är den dyra sorten. */
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-05",
    count: 5,
  },
  {
    /* Systersidan till /garageportsoppnare, byggd 2026-08-05 efter
       användarbeslut. Den rankar modulerna som kopplas till en öppnare du
       redan har; motorerna ligger kvar på moderssidan. Samma delning som
       /brandvarnare mot /smart-brandvarnare.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT, samma sak som moderssidan. Kör
       `smart garageportsöppnare`, `garageportsöppnare wifi`, `garageport app`
       och `meross garageport` i samma Keyword Planner-körning.

       KONKURRENSEN ÄR NOLL. De tre svenska jämförelsesajterna som rankar på
       garageportsöppnare rankar samtliga motorer. Ingen svensk jämförelse av
       eftermonterade garagemoduler har hittats. Det är samma läge som
       /elektrisk-rullgardin hade, och enligt sidkarta-framat.md sajtens
       starkaste sorts position.

       FYNDET: strömförsörjningen avgör vem som får montera. De två billigaste
       modulerna, 374 och 384 kr, matas med 230 V och ska sitta i en
       kopplingsdosa bakom väggknappen. Enligt Elsäkerhetsverket är en relämodul
       i den fasta installationen arbete för registrerat elinstallationsföretag.
       De från 499 kr och uppåt går på USB och är ett skruvmejseljobb. Räknar
       man in elektrikern är den billigaste inte billigast. Gränsen är redan
       utredd och rättad en gång på /smart-strombrytare.

       ANDRA FYNDET: Yale är ensam om att publicera kontosäkerhet.
       Tvåfaktorsautentisering plus AES- och TLS-kryptering står i Kjells egen
       specifikation. Ingen annan produktsida i kategorin nämner vare sig
       kryptering eller tvåstegsverifiering, för en produkt vars hela funktion
       är att öppna en dörr till huset över internet.

       ⚠️ EN HYPOTES PRÖVADES OCH FÖLL. Utkastet byggde på att billiga reläer
       bara kan trycka på knappen medan dyra också vet var porten står. Fel:
       brytarreläet på 374 kr anger "visning av styrenhetens aktuella status
       (öppen/stängd)" och Tuya-modulen på 384 kr levereras med öppningssensor.
       Sensorn är standard från 374 kr och uppåt och blev inget kriterium. Se
       .agent/research/smart-garageportsoppnare.md §3.

       ✅ VARIANTFÄLLAN AVFÖRD 2026-08-06: Meross egen produktsida för MSG100
       skriver "Support Apple HomeKit, Amazon Alexa, Google Assistant,
       SmartThings", och NetOnNets produktsida skriver HomeKit på fyra ställen.
       MSG100HK ligger kvar i bortvalslistan som en dyrare dubblett.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Ljud & Bilds Yale-test täcker en av sex.

       PENGAR: till skillnad från moderssidan finns här faktiskt program. Kjell
       5 %/30 d och Proshop 3,2 %/7 d bär båda Yale. Ingen av dem tillåter PPC.
       ⚠️ Yale kostar 1 690 kr hos Kjell och 1 439 hos Proshop, alltså 251 kr
       mer hos den butik som betalar bättre. Användarbeslut 2026-08-05: länka
       Kjell. Se motiveringen i lib/data/smart-garageportsoppnare.ts. */
    href: "/smart-garageportsoppnare",
    label: "Smart garageportsöppnare",
    category: SMART_HEM,
    blurb: "De två billigaste kräver elektriker. Det står inte på prislappen.",
    /* Live 2026-08-05. Alla sex priser och GTIN lästa i butikens egen JSON-LD
       samma dag, samtliga i lager.

       ⚠️ Samma omätta sökvolym som moderssidan, se kommentaren där.

       ✅ 2026-08-06: variantfällan avförd. Meross egen produktsida för MSG100
       och NetOnNets egen produktsida anger båda HomeKit-stöd, och cellen står
       nu som ja. Samtidigt gjordes kontoskyddet om från ett kriterium som
       betygsatte publicering till ett som betygsätter skyddet, vilket flyttade
       vinnaren från SwitchBot till Meross. Se lib/corrections.ts. */
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-05",
    count: 6,
  },
  {
    /* `usb-c-kabel` byggd 2026-08-05. Systersida till /usb-c-laddare, vars
       avgränsning uttryckligen sköt kablarna hit.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. Grep på `kabel`, `sladd`, `laddkabel` och
       `usb` över samtliga keyword-CSV:er under .agent/ ger noll träffar för
       kategorin. Kör Keyword Planner på `usb-c kabel`, `usb c sladd`,
       `laddkabel` och `thunderbolt kabel` när det passar.

       Slugen är däremot enkel den här gången, till skillnad från laddarsidan:
       Kjell, Clas Ohlson, Teknikdelar, Testkollen och Testix säger alla kabel.
       Beställningens ord var sladd, som ingen i handeln använder.

       AVGRÄNSNING efter användarbeslut: bara USB-C till USB-C. USB-A- och
       Lightning-formerna förklaras i köpguiden och får egna systersidor. En rad
       per modell vid 2 m som referens, eftersom Kjells 52 poster i kategorin är
       ungefär femton produkter i fyra längder och tre färger.

       FYNDET: priset följer inte förmågan, och alla tal är butikernas egna.
       Kjells Linocell Flätad 240 W kostar 299,90 kr och anger 480 Mb/s; Kjells
       Unisynk USB4 kostar 329 kr och anger 40 Gbps. Trettio kronor isär,
       83 gånger i datahastighet, och den dyrare är den långsamma. Apples
       240 W-kabel för 445 kr hos Kjell beskrivs av Clas Ohlson som
       "Dataöverföring: USB 2-hastighet". Hos Teknikdelar kostar en 40 Gbps-kabel
       från Delock 199 kr, alltså hundra kronor mindre än Kjells 480 Mb/s-kabel.

       ⚠️ BÅDA SVENSKA KONKURRENTERNA KORAR DEN LÅNGSAMMA DYRASTE. Testkollen
       ger Apple 240 W 2 m 9,61 av 10 och förstaplatsen, Testix samma kabel som
       etta. Ingen av dem nämner USB 2-hastigheten.

       ANDRA FYNDET: direktivet namnger kabelstandarden utan att gälla kabeln.
       Bilaga Ia del I punkt 2.2 kräver att *apparaten* ska "kunna laddas med
       kablar som uppfyller standarden EN IEC 62680-1-3:2021". Standardens egen
       titel innehåller ordet kabel, den står i svensk lagtext, och ingenting
       kräver att kabeln i butiken uppfyller den.

       TREDJE: artikel 47.3 ålägger kommissionen att senast den 28 december 2026
       rapportera om att sälja radioutrustning utan laddare *och utan kabel*, vid
       behov med ett lagförslag om obligatoriskt separat försäljning. Under fem
       månader bort när sidan byggs. Skriv aldrig att det är beslutat.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Testfakta lät PZT GmbH böja tolv kablar
       5 000 gånger, publicerat 2020-02-24, och det är kategorins enda riktiga
       provning. Den är sex år gammal och samtliga sex USB-C-kablar där är
       USB-A-formen, alltså noll av de rankade. Mätvärdena bär köpguiden.

       ⚠️ INGET HÅLLBARHETSKRITERIUM heller, efter användarbeslut. Anker anger
       böjtal som spänner 5 000, 10 000, 20 000, 25 000, 35 000 och 300 000 över
       sitt eget sortiment utan att publicera någon metod. Att betygsätta det
       vore att mäta tillverkarens copywriting. Samma beslut som besparingen på
       /smart-termostat.

       ⚠️ TESTKOLLEN SÄGER ATT DE SKULLE CITERAT TESTFAKTA. Ordagrant: "Om
       tester från Råd & Rön eller Testfakta finns, använder vi deras oberoende
       data som jämförelse." Testet finns, öppet, med resultattabell som PDF. De
       återger inte ett enda resultat ur den.

       ⚠️ Apple-kabeln kostar 399 kr hos Clas Ohlson och 445 hos Kjell, alltså
       46 kronor för samma artikel. Vi länkar Clas Ohlson, som saknar program.

       ⚠️ SIDAN GÅR SANNOLIKT INTE ATT ANNONSERA, samma läge som laddarsidan.
       Nytt i svepet: TheMobileStore SE bär 10 % och är kategorins bästa villkor,
       men ligger under `Media` i katalogen och missades därför av laddarsidan.
       Sortimentet är budgetmärken och är inte kartlagt produkt för produkt.
       Amazon.se togs in efter användarbeslut, och ansökan till Amazon Associates
       följer. Se .agent/research/usb-c-kabel.md. */
    href: "/usb-c-kabel",
    label: "USB-C-kabel",
    category: ELEKTRONIK,
    blurb:
      "Trettio kronor isär hos samma butik. Den dyrare är 83 gånger långsammare.",
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-05",
    count: 13,
  },
  {
    href: "/nyckelskap",
    label: "Nyckelskåp",
    category: SAKERHET,
    blurb:
      "Alla fyra som provades lossnade från väggen. Den bästa tog 16 sekunder.",
    /* Live 2026-08-05. Alla sex priser kontrollerade mot butikernas egna sidor
       samma dag och samtliga stämde: 490 Byggahus, 2 599 Nordsec, 349 och
       1 899 Kjell, 695 och 895 E-safe.

       ⚠️ Master Lock 5441 har den bredaste prisspridningen på sajten för en och
       samma artikel: 2 015 kr hos Amazon.se, 2 599 hos Nordsec och 2 995 hos
       Bauhaus, som är slut. PriceRunner anger lowPrice 1 994 över fem
       erbjudanden. Vi länkar Nordsec, se motiveringen i lib/data/nyckelskap.ts.
       Kontrollera om spridningen vid nästa prisrunda.

       2026-08-06: /fix-page. Väderskyddskriteriet gjordes om sedan det visat
       sig sänka betyget för uppgifter vi inte hittat, och samtliga fem fick ett
       belagt värde ur tillverkarnas datablad. Smart-BT visade sig vara IP 54
       och flyttade från femte till andra plats. Se lib/corrections.ts.

       `count` stod på 6 sedan Top Safe T26 flyttades till övervägda. Rättat
       till 5, vilket är antalet rankade skåp på sidan. */
    status: "live",
    updated: "2026-08-06",
    count: 5,
  },
  {
    /* `babyvakt` byggd 2026-08-06. Ljud- och videovakter. Andningslarm rankas
       inte, efter samma resonemang som /vattenlarm förde om vattenfelsbrytare:
       att blanda en apparat för 399 kronor med en för 3 799 är ingen rankning,
       och ett andningslarm är en annan produkt med en annan köpare. De fyra
       ligger bland övervägda och förklaras i köpguiden.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT. Grep på `baby`, `barnvakt` och `nanny` över
       samtliga sex keyword-CSV:er ger noll träffar. Kör Keyword Planner på
       `babyvakt`, `babyvakt bäst i test`, `babymonitor`, `babylarm` och
       `andningslarm`. Slugen är dock ovanligt entydig: Råd & Rön, Clas Ohlson,
       Kjell, Jollyroom, Babyland, Apotea, Elgiganten och Bygghemma säger alla
       babyvakt, och `babymonitor` förekommer aldrig ensamt som kategorinamn.

       FYNDET: **den enda svenska laboratorieprovningen är från 15 juni 2012.**
       Råd & Röns test ligger kvar under rubriken Bäst i test: Babyvakter och är
       förstasidesträff nummer fem. Ingen av de tretton provade modellerna säljs
       i svensk handel 2026 — Withings Smart Baby Monitor, IKEA Patrull, Topcom
       Babytalker, Neonate BC-5000. Samma sorts fel som /elektrisk-rullgardin
       byggdes för att rätta, men fjorton år gammalt.

       ANDRA FYNDET, och det som bär sidan: **räckvidden på kartongen är mätt i
       fri sikt, och inomhus gäller en sjättedel.** Fyra tillverkare publicerar
       båda talen och kvoten är nästan identisk hos alla fyra: Motorola PIP10
       49 mot 305 meter, Philips Avent SCD892 50 mot 300, VTech DM1212 75 mot
       460, Alecto 50 mot 300. Alltså 6,0 till 6,2 gånger. Resten publicerar
       bara talet i fri sikt. Räckvidd väger därför bara 15.

       TREDJE: **sändareffekten går inte att läsa två gånger med samma svar.**
       CAPiDi anges till "max 10mW (ca 4 % av DECT)" hos Jollyroom och "max 10mA"
       hos Apotea, medan tillverkarens egen manual deklarerar 12 dBm, alltså
       15,8 mW, och samtidigt påstår 10 procent av DECT, vilket vore 25 mW. Tre
       tal för samma sändare. Neonate BC-6500D anges till 20 mW hos Jollyroom och
       25 mW hos Babyland. Jämförelsebasen är läst hos en tredje tillverkare:
       VTech DM1212 deklarerar 0,25 W, alltså DECT-klassens toppeffekt.

       ⚠️ SÄNDAREFFEKT BLEV INGET KRITERIUM. Att belöna lägre effekt hade byggt
       in en hälsohierarki vi inte kan belägga, och lägre effekt betalas med
       kortare räckvidd, som redan vägs. Talet ligger i tabellen och i guiden.

       FJÄRDE: **två tillverkare skriver själva att apparaten inte är
       medicinteknisk.** CAPiDis manual under WARNING och VTechs DM1212-manual,
       båda ordagrant. 1177:s sida om plötslig spädbarnsdöd, granskad av
       barnläkare och uppdaterad 2026-01-14, ger sex råd och inget av dem är en
       apparat. Det är köpguidens ryggrad.

       ⚠️ RÅD & RÖN FÖRBJUDER VIDAREPUBLICERING av testresultat och betyg. Sidan
       säger att provningen finns och vilket datum den bär, aldrig vad den kom
       fram till. Betygen ligger i researchfilen.

       PENGAR: ingen butik som för babyvakter tillåter PPC. Jollyroom 5 %,
       Apotea 5 %, Apohem 5 %, Kjell 5 %, Babysam 8 %, Baby V 7 % och Babyland
       4 % bär alla ppcMarketing 0. Safekid ligger på 20 % men säljer GPS-klockor
       för barn och inga babyvakter, kontrollerat. Sidan går alltså inte att
       annonsera med nuvarande utbud, samma läge som gruppen Elektronik.
       ⚠️ Jollyrooms cookie är 3 dygn, kortast av alla butiker vi använder.

       Se .agent/research/babyvakt.md. */
    href: "/babyvakt",
    label: "Babyvakt",
    category: SAKERHET,
    blurb:
      "800 meter på kartongen. Genom väggar räcker den till 130, enligt tillverkarnas egna tal.",
    /* Ligger kvar som `planned` efter uttrycklig instruktion: sidan ska granskas
       innan den publiceras. Priser, GTIN och bilder är kontrollerade 2026-08-06
       och elva manualer lästa i original. */
    status: "live",
    updated: "2026-08-06",
    published: "2026-08-06",
    count: 11,
  },
];

/**
 * Förhandsläge: behandla planerade kategorier som browsbara.
 *
 * ## Varför det här finns i stället för att flippa `status`
 *
 * `status` svarade tidigare på två frågor samtidigt: *går sidan att klicka på*
 * och *ska den publiceras till sökmotorer*. De frågorna har olika svar under
 * hela bygget av en kategori. Man vill klicka runt i navigationen långt innan
 * man vill ligga i sitemapen med opriskontrollerade priser.
 *
 * Att sätta `status: "live"` bara för att kunna surfa hade löst det första
 * problemet genom att skapa det andra, och indexering är det enda steget i
 * kedjan som är svårt att ta tillbaka. Google glömmer långsamt.
 *
 * Därför gäller:
 *
 * - `liveTestPages()` betyder **publicerad**. Sitemap och llms.txt läser den
 *   och ska fortsätta göra det.
 * - `browsableTestPages()` betyder **klickbar**. Navigation, sökindex,
 *   categories och test page-rutnät läser den.
 *
 * I utvecklingsläge är allt klickbart. På en driftsatt miljö krävs
 * `NEXT_PUBLIC_PREVIEW_PLANNED=1`, vilket gör att en förhandsdeploy går att
 * klicka runt i utan att produktionsbygget ändrar beteende.
 *
 * ⚠️ Sätt aldrig flaggan i produktion. Den påverkar inte sitemapen, men den
 * gör att interna länkar pekar på sidor vi ännu inte står för.
 */
export const PREVIEW_PLANNED =
  process.env.NEXT_PUBLIC_PREVIEW_PLANNED === "1" ||
  process.env.NODE_ENV === "development";

/** Publicerade test pages. Sitemap och llms.txt, ingenting annat. */
export function liveTestPages(): TestPageEntry[] {
  return TEST_PAGE_INDEX.filter((c) => c.status === "live");
}

/** Test pages som ska gå att klicka på. Navigation, sök, categories. */
export function browsableTestPages(): TestPageEntry[] {
  return PREVIEW_PLANNED
    ? TEST_PAGE_INDEX
    : TEST_PAGE_INDEX.filter((c) => c.status === "live");
}

/** Om en enskild post ska renderas som länk eller som död text. */
export function isBrowsable(entry: TestPageEntry): boolean {
  return entry.status === "live" || PREVIEW_PLANNED;
}

export function testPagesInCategory(category: Category): TestPageEntry[] {
  return TEST_PAGE_INDEX.filter((p) => p.category.key === category.key);
}

export function findCategory(key: string): Category | undefined {
  return CATEGORIES.find((g) => g.key === key);
}

/**
 * Publiceringsdatumet för en sida, eller `undefined` om det inte är belagt.
 *
 * Slås upp på slug i stället för att skickas som en konstant på varje sidfil,
 * eftersom `UPDATED` redan finns i två kopior som `check:refs` måste hålla
 * ihop. Ett tredje datum på 37 ställen till hade blivit ett tredje ställe att
 * glömma.
 */
export function publishedFor(slug: string): string | undefined {
  const ren = slug.startsWith("/") ? slug : `/${slug}`;
  return TEST_PAGE_INDEX.find((p) => p.href === ren)?.published;
}
