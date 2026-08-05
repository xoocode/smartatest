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

export const CATEGORIES: Category[] = [SMART_HEM, SAKERHET, HEM_HUSHALL, ELEKTRONIK];

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
  /** Products covered. Only set once the page is live and the count is real. */
  count?: number;
};

export const TEST_PAGE_INDEX: TestPageEntry[] = [
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
    blurb: "Sju av tolv fodral stänger av den trådlösa laddningen. Det står aldrig i rubriken.",
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
       se .agent/tmp-körningen i researchfilen §10. */
    status: "live",
    updated: "2026-08-05",
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
    blurb: "Plywooden som varje skaltillverkare beskriver byttes mot stål 2014.",
    /* Live 2026-08-05. Alla tolv priser, artikelnummer och lagerstatus lästa på
       iPhonebutikens egna produktsidor samma dag, och militärstandarden läst i
       original i tre utgåvor som PDF. Tolv packshots på plats. Uppmätt vid
       1440 och 390 px: ingen sidscroll vid någondera bredden, och inget klippt
       superlativ sedan X2O:s kortades från 44 till 36 tecken enligt IDÉ-015.

       ⚠️ TVÅ MARKERADE RADER LIGGER UNDER 50 %, avsiktligt: `Angiven fallhöjd`
       4/12 och `Angiven militärstandard` 5/12. Gap-passet är gjort mot
       tillverkarens egen sida och kommer tillbaka tomt, så uppgiften finns inte
       publicerad någonstans. Att fylla cellen åt den som tiger raderar det
       raden mäter. Samma konstruktion som `Angiven noggrannhet` på /hygrometer.

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
    updated: "2026-08-05",
    count: 12,
  },
  {
    /* `powerbank-20000` byggd 2026-08-05. Systersida till /powerbank, delad på
       storlek efter användarbeslut. Den här rankar från 20 000 mAh och uppåt.
       Stiftung Warentest delar sitt eget test på samma storlekar.

       ⚠️ SÖKVOLYMEN ÄR ALDRIG MÄTT, samma sak som moderssidan. `powerbank
       20000` ska med i samma Keyword Planner-körning. Slugen följer
       Teknikdelars egen kategori, `powerbank-20000mah`.

       FYNDET ÄR DET OMVÄNDA MOT /powerbank. Där anger två av åtta produkter
       sitt energiinnehåll i wattimmar; här gör sju av nio det. Skälet är att
       taket på 100 Wh bara är i sikte i den här storleken. Wattimmen publiceras
       när tillverkaren har ett skäl att visa att produkten ryms under gränsen.

       TVÅ PRODUKTER ÄR BYGGDA INTILL TAKET: Linocell 27 600 mAh anger 99,36 Wh
       och Anker Prime 26 250 mAh anger 99,75 Wh. Marginal 0,64 respektive 0,25
       wattimmar mot en gräns på 100. Konstruktion, inte slump.

       ⚠️ ANDRA FYNDET: tre powerbanks med samma nominella 20 000 mAh anger 72,
       72,36 och 100 Wh. De två första är förenliga; Xtorms 100 Wh ligger 39 %
       högre och står bredvid "Flygplansgodkänd: Ja" i samma ruta. Vi påstår
       ALDRIG att någon har fel — vi redovisar spridningen, som Clas Ohlsons
       7,5 mot 13 liter på /avfuktare. Xtorms uppgift är INTE kontrollerad mot
       tillverkarens egen sida; gör det innan något skärps.

       ⚠️ INGET TESTOMDÖMEKRITERIUM. Warentest mätte uttagbar energi till
       58,3-69,9 Wh för storleksklassen, men resultat per modell ligger bakom
       betalvägg på 4,90 EUR som vi inte köpt.

       ⚠️ VIKT ÄR ETT EGET KRITERIUM här men inte på moderssidan: produkterna
       väger 400 till 535 g, och bara tre av åtta anger vikten i butiken.

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
       samma kapacitet, samma wattimmar och samma pris som 100 W-modellen. */
    status: "live",
    updated: "2026-08-05",
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
    blurb: "Två av åtta anger wattimmar. Det är den enhet flygreglerna är skrivna i.",
    /* Live 2026-08-05. Alla åtta priser, artikelnummer och kundbetyg lästa i
       butikens egen JSON-LD samma dag, samtliga i lager.

       ⚠️ Gap-passet mot tillverkarens egen sajt för att fylla Wh på fler
       produkter MISSLYCKADES och gjorde det farligt: anker.com returnerade
       identiska tal, 99,75 Wh och 26 250 mAh, för två olika produktsidor,
       eftersom värdena kom ur en korsförsäljningskarusell och inte ur
       produkten. Att föra in dem hade varit variantfällan. Raderna
       `Energiinnehåll` och `Vikt` är därför inte highlight, alltså inga
       tabellrader, och fyndet bärs av fyndavsnittet, kriteriet, köpguiden,
       omdömena och FAQ i stället. */
    status: "live",
    updated: "2026-08-05",
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
       ett nattligt jobb i stället för en punktinsats. */
    updated: "2026-08-03",
    count: 5,
  },
  {
    href: "/smart-plug",
    label: "Smart plug",
    category: SMART_HEM,
    blurb: "Maxeffekt, energimätning och vad de drar när de inte gör något.",
    status: "live",
    updated: "2026-08-03",
  },
  {
    href: "/smart-strombrytare",
    label: "Smart strömbrytare",
    category: SMART_HEM,
    blurb: "Nolla i dosan, vad du får installera själv och vad som funkar utan.",
    status: "live",
    updated: "2026-08-03",
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
    updated: "2026-08-03",
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
       lagerstatus och pris bör kontrolleras om inför november. */
    status: "live",
    updated: "2026-08-03",
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
    updated: "2026-08-04",
  },
  {
    /* `vattenfelsbrytare` 2 900/mån, alltså mer än vattenlarm trots att
       produkten kostar tjugo gånger mer. Sidan rankar både vattenfelsbrytare
       och läckagebrytare, efter användarbeslut 2026-08-04: certifieringsregeln
       CR 139 omfattar båda, och sedan 2026-01-01 kräver Branschregler Säker
       Vatteninstallation 2026:1 ett typgodkänt aktivt skydd i kök, där båda
       typerna duger. Vattenlarm ligger kvar på /vattenlarm.

       Vinkeln är att tre tillverkare publicerar certifikatnummer som går att
       ladda ner och läsa, och att ingen konsumentsida gör det. Den vanligaste
       uppgiften i kategorin, att bara två vattenfelsbrytare är godkända, är
       hämtad ur ett pressmeddelande från 2022 och stämmer inte 2026.

       ⚠️ Kategorins enda affiliateprogram, VVSochBad via Partner-ads på
       2,40 %, är dyrast eller näst dyrast på båda de centrala brytarna. Vi
       länkar dit ingen produkt. Se .agent/research/vattenfelsbrytare.md §9.11. */
    href: "/vattenfelsbrytare",
    label: "Vattenfelsbrytare",
    category: SAKERHET,
    blurb: "Tre publicerar certifikatnumret. Två gör det inte.",
    /* Live 2026-08-05. Alla fem priser lästa på butikens egen sida 2026-08-04,
       och de tre typgodkännandena hämtade som PDF hos RISE via tillverkarnas
       dokumentbibliotek. Ingen av de sex konkurrentsidorna nämner CR 139 eller
       branschreglernas 2026:1, och ingen återger ett certifikatnummer. */
    status: "live",
    updated: "2026-08-04",
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
       och ett omkontrollerat riktpris, 4 798 till 5 373 hos en annan butik. */
    status: "live",
    updated: "2026-08-05",
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
    updated: "2026-08-04",
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
    blurb: "43A rekommenderas för hemmet. Sprayerna anger 5A och 3A.",
    status: "live",
    updated: "2026-08-05",
    count: 5,
  },
  {
    href: "/brandslackare",
    label: "Brandsläckare",
    category: SAKERHET,
    blurb: "55A eller 43A? Siffran på etiketten som ingen förklarar.",
    status: "live",
    updated: "2026-08-03",
  },
  {
    /* `brandfilt` 5 400/mån, bud 19,47 kr. Vinkeln är att EN 1869 finns i två
       versioner: 1997 provade bara brand i matolja, 2019 lade till klass B och
       elektrisk utrustning. Årtalet står i butikstexten men i ingen jämförelse.
       Se .agent/research/brandvarnare.md. */
    href: "/brandfilt",
    label: "Brandfilt",
    category: SAKERHET,
    blurb: "Årtalet efter EN 1869 avgör vad filten faktiskt provats mot.",
    status: "live",
    updated: "2026-08-03",
  },
  {
    /* `kolmonoxidvarnare` cirka 1 880/mån och toppbudet 5,56 kr, alltså det
       billigaste i hela brandfamiljen. Vinkeln är att EN 50291 har två delar:
       del 1 gäller bostäder, del 2 gäller husvagn, husbil och båt med krav på
       vibration och temperaturväxling. Dessutom skiljer utgåvorna: 2018 gjorde
       livslängdsindikering obligatorisk, och 2010 drogs tillbaka 2021.
       Gasolvarnare är en annan sensor och blir egen sida, se
       .agent/research/kolmonoxidvarnare.md. */
    href: "/kolmonoxidvarnare",
    label: "Kolmonoxidvarnare",
    category: SAKERHET,
    blurb: "Del 1 eller del 2 av EN 50291? Den som ska till husvagnen behöver del 2.",
    status: "live",
    updated: "2026-08-03",
  },
  {
    /* `brandstege` 1 300/mån plus räddningsstege 170 och utrymningsstege 170.
       Termen täcker två marknader: hängande fönsterstegar för 699 till 1 294
       kronor och fasta fasadstegar för 1 327 till 9 199. Den här sidan rankar
       bara de hängande, de fasta får /utrymningsstege. Vinkeln är att kilotalet
       inte går att jämföra: samma sorts stege anges till 150, 200, 400 och 450
       kilo, ingen butik anger provmetod, och den standard två tillverkare pekar
       på gäller lutande och stående teleskopstegar. Se
       .agent/research/brandstege.md. */
    href: "/brandstege",
    label: "Brandstege",
    category: SAKERHET,
    blurb: "150 eller 450 kilo? Talet på kartongen är uppmätt av den som sålt den.",
    status: "live",
    updated: "2026-08-04",
  },
  {
    /* Fasta fasadstegar. Egen sida efter användarbeslut 2026-08-02: en hängande
       stege för 699 kronor och en Skeppshultstege för 9 199 löser inte samma
       problem, och bara den fasta räknas som utrymningsväg i BBR när fönstrets
       underkant sitter mer än fem meter över marken. */
    href: "/utrymningsstege",
    label: "Utrymningsstege",
    category: SAKERHET,
    blurb: "Fast monterad på fasaden, och det enda byggreglerna räknar över fem meter.",
    status: "live",
    updated: "2026-08-03",
  },
  {
    href: "/smart-brandvarnare",
    label: "Smart brandvarnare",
    category: SAKERHET,
    blurb: "Google la ner Nest Protect. Vad finns kvar som faktiskt går att köpa?",
    /* Först live 2026-08-03, efter att alla åtta priser kontrollerats mot
       butikernas egna sidor. Se .agent/priskoll-2026-08-03.md. */
    status: "live",
    updated: "2026-08-04",
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
    blurb: "Maskeringen alla har, och brasklappen alla också har.",
    status: "live",
    updated: "2026-08-03",
  },
  {
    /* `dörrklocka med kamera` 1 300/mån mot `videodörrklocka` 170 och
       `smart dörrklocka` 140. Systersida till /overvakningskamera, och den
       enda kategori där IMY har ett eget exempel som säger nej: en dörrkamera
       på en lägenhetsdörr faller utanför privatundantaget. */
    href: "/dorrklocka-med-kamera",
    label: "Dörrklocka med kamera",
    category: SAKERHET,
    blurb: "I lägenhet gäller inte privatundantaget. I villa avgör om du hör den.",
    status: "live",
    updated: "2026-08-03",
  },
  {
    /* Inomhus är enligt IMY oftast tillåtet, även kopplat till larmcentral.
       Undantaget är hemtjänst, där myndighetens eget exempel säger nej
       eftersom personalen bevakas under sin arbetstid. Den enda kontrollen du
       kan se med egna ögon är ett fysiskt linsskydd. */
    href: "/inomhuskamera",
    label: "Inomhuskamera",
    category: SAKERHET,
    blurb: "Ett skjutbart linsskydd är den enda integritet du kan se.",
    status: "live",
    updated: "2026-08-04",
  },
  {
    /* `kodlås ytterdörr` 5 400/mån mot `smarta lås` 260, alltså tjugo gånger.
       Svenskar söker inte "smart lås", de söker kodlås. Slugen ändrad innan
       sidan byggdes. Se .agent/keywords/utfall.md. */
    /* `kodlås ytterdörr` 5 400/mån mot `smart lås` 480, alltså elva gånger.
       Varumärkestermen `yale doorman` bär dessutom 27 100 i egen rätt, den
       starkaste enskilda varumärkeseffekten vi mätt. Vinkeln är att
       certifikatet för marknadens ledande lås gäller med blockerade
       användarkoder. Se .agent/research/kodlas-ytterdorr.md. */
    href: "/kodlas-ytterdorr",
    label: "Kodlås till ytterdörr",
    category: SAKERHET,
    blurb: "Certifikatet för marknadens ledande lås gäller utan koden.",
    status: "live",
    updated: "2026-08-03",
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
    updated: "2026-08-03",
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
    updated: "2026-08-03",
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
    updated: "2026-08-03",
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
       artikelsuffix och gick till kategorisidan. Baada raettade. */
    status: "live",
    updated: "2026-08-04",
  },
  {
    /* `avfuktare` 12 100/mån. Tredje och sista sidan i luftklustret, som med
       luftrenare och luftfuktare på 18 100 var blir 48 300 sökningar i
       månaden. Vinkeln är att literantalet på kartongen inte är jämförbart:
       Wood's anger vid 30 °C och 80 % RH, Meaco anger effekten vid 20 °C och
       60 % RH och namnger modellen efter liter utan att säga vid vilka
       villkor, och resten anger inga villkor alls. Clas Ohlson publicerar
       själva 7,5 och 13 liter för samma Wood's LD40. SS-EN 810 finns och är
       gällande sedan 1997, men gäller bara kompressoravfuktare. Se
       .agent/research/avfuktare.md. */
    href: "/avfuktare",
    label: "Avfuktare",
    category: HEM_HUSHALL,
    blurb: "Samma apparat, 7,5 eller 13 liter. Det beror på vem som mäter.",
    /* Live 2026-08-03. Alla tolv priser kontrollerade samma dag, sju av dem
       hos Clas Ohlson via webblaesare. eeese Adam och Clas Ohlsons tioliters
       kom in i rankningen samtidigt, se .agent/uppgift-atersta-slutsalda.md. */
    status: "live",
    updated: "2026-08-04",
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

       Vinkeln: av tretton kartlagda produkter mellan 139,90 och 1 199 kronor
       anger tvaa hur maanga procentenheter de faar visa fel. Kjells produktblad
       ger maatomraadet och en tolerans foer temperaturen, aldrig foer fukten.
       Sex svenska jaemfoerelsesajter korar Shelly H&T Gen 3, som inte
       publicerar naagon tolerans alls. Butikerna aer Kjell, Proshop, Clas
       Ohlson och Hornbach; bara Kjell aer kartlagd, paa 5 procent, och den
       tillaater inte PPC. Se .agent/research/hygrometer.md. */
    href: "/hygrometer",
    label: "Hygrometer",
    category: HEM_HUSHALL,
    blurb: "Tretton mätare. Två av dem säger hur mycket fel de får visa.",
    status: "live",
    updated: "2026-08-04",
  },
  {
    /* `luftkvalitetsmaetare` 720/maan, uppmaett 2026-08-01, konkurrens High
       index 100 med toppbud 2,57 till 19,85 kr. Systersida till hygrometer och
       byggd samma dag, efter anvaendarbeslut att dela pao tvao sidor.

       Detta aer en dyr kategori: 729 till 3 299 kronor mot hygrometerns 139,90
       till 1 199. Vinkeln aer att givaruppsaettningen inte aer den man tror.
       Tre av aotta saknar CO2-givare helt trots att de saeljs som
       luftkvalitetsmaetare, och Mill Sense anger `eCO2` i butikens egen text,
       alltsao ett tal uträknat ur VOC-halten. Airthings anvaender NDIR och
       publicerar ±30 ppm ±3 %.

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
    updated: "2026-08-05",
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
    updated: "2026-08-04",
  },
  {
    /* `fonsterputsrobot` byggd 2026-08-04. Femte maskinsidan i Hem & hushall.

       Sokvolymen ar inte uppmatt och det ar ingen blockerare. Sidan star pa
       att den svarar pa en fraga ingen annan svarar pa.

       Fyndet: tre sakerhetstal publiceras ojamnt. HOBOT-388 anger att linan
       tal 200 kg stotkraft; Ecovacs och Karcher anger inget tal. Halltid vid
       stromavbrott: Karcher 40 min med batteridata, Ecovacs W2 och W3 mer an
       30, HOBOT 20, Ecovacs W1 Pro inget alls. Baglost glas: HOBOT forbjuder
       det, Ecovacs tillater det med 10 cm marginal till kanten.

       Svenska vinkeln ar sprojsen: Karcher anger minsta fonster 35 x 35 cm,
       och mindre rutor ar vanliga i aldre svenska hus.

       ⚠️ Tva kandidater foll fore den har. Matavfallskvarn diskvalificerades av
       regelverket: sedan 2024-01-01 ar kvarnar direkt till avloppet inte
       godkanda. Fonsterputsrobot nara diskvalificerades pa min egen felaktiga
       skrapning av butikernas kategorisidor.

       Butiker: NetOnNet, Proshop, Elgiganten, Teknikproffset. Adtraction ej
       kartlagt for markena. Se .agent/research/fonsterputsrobot.md. */
    href: "/fonsterputsrobot",
    label: "Fönsterputsrobot",
    category: HEM_HUSHALL,
    blurb: "En av tillverkarna säger vad säkerhetslinan tål. De andra inte.",
    status: "live",
    updated: "2026-08-04",
  },
  {
    /* `smart-hem-hubb` byggd 2026-08-04. Punkt 7 i sidkarta-framat.md.

       Byggd av intern efterfragan: orden hubb, gateway, brygga och bridge
       forekommer 285 ganger over 16 kategorier, och det fanns inget lankmal.
       Hygrometersidan byggdes pa elva omnamnanden over fyra filer.

       Fyndet: ordet hubb tacker tre olika produkter pa samma hylla, 329 till
       4 999 kr. Markesbrygga (Plejd Gateway styr enbart Plejd, enligt Plejd),
       Matter-controller (Aqara M3 sager rakt ut att den styr tredjepart) och
       universell hubb (Homey Pro talar varje radio och kor lokalt).

       ⚠️ Philips sager varken ja eller nej om Hue Bridge kan styra andra
       markens Matter-enheter. Skriv att uppgiften saknas, aldrig att den inte
       kan.

       Andra axeln: fungerar den utan internet? Homey Pro, HA Green och Aqara
       M100 sager uttryckligen ja. Resten sager ingenting.

       Alla sju lankar gar till Kjell, som har hela sortimentet och ligger pa
       5 % / 30 d i Adtraction. Koncentrationen star utskriven pa sidan.
       Se .agent/research/smart-hem-hubb.md. */
    href: "/smart-hem-hubb",
    label: "Smart hem-hubb",
    category: SMART_HEM,
    blurb: "Tre olika produkter säljs under samma ord, från 329 till 4 999 kr.",
    status: "live",
    updated: "2026-08-04",
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
    blurb: "42, 37, 30 eller 28 procent? De som provat dem anger ingen siffra alls.",
    status: "live",
    updated: "2026-08-04",
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
    updated: "2026-08-05",
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
    blurb: "Kraften de säljer är uppåt. Den som kan klämma någon står i manualen.",
    /* Live 2026-08-05. Alla fem priser och artikelnummer lästa i butikens egen
       JSON-LD eller specifikationstabell samma dag, och kraftuppgifterna hämtade
       ur tillverkarnas bruksanvisningar som PDF.

       ⚠️ SÖKVOLYMEN ÄR FORTFARANDE OMÄTT vid lansering, efter användarbeslut.
       Slugen är vald på handelns språkbruk: Jula, Bauhaus, Elgiganten, CDON och
       Bygghemma säger alla garageportsöppnare med foge-s, liksom alla tre
       svenska konkurrenter. Kör Keyword Planner ändå, och gör det innan sidan
       hunnit indexeras: en slugändring efter indexering är den dyra sorten. */
    status: "live",
    updated: "2026-08-05",
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

       ⚠️ VARIANTFÄLLAN: Meross säljer MSG100 och MSG100HK som skilda artiklar,
       där HK är den med HomeKit. Vi anger inte HomeKit för den artikel
       NetOnNet säljer, eftersom artikelnumret inte gått att bekräfta mot
       tillverkarens variantlista. Samma fälla som ABUS 787 mot 787 Smart-BT.

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

       ⚠️ Meross artikelnummer är inte bekräftat mot MSG100 respektive MSG100HK,
       och därför står HomeKit som okänt på den produkten i stället för som ett
       ja. Bekräfta mot tillverkarens variantlista vid nästa runda. */
    status: "live",
    updated: "2026-08-05",
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
    blurb: "Trettio kronor isär hos samma butik. Den dyrare är 83 gånger långsammare.",
    status: "live",
    updated: "2026-08-05",
    count: 13,
  },
  {
    href: "/nyckelskap",
    label: "Nyckelskåp",
    category: SAKERHET,
    blurb: "Alla fyra som provades lossnade från väggen. Den bästa tog 16 sekunder.",
    /* Live 2026-08-05. Alla sex priser kontrollerade mot butikernas egna sidor
       samma dag och samtliga stämde: 490 Byggahus, 2 599 Nordsec, 349 och
       1 899 Kjell, 695 och 895 E-safe.

       ⚠️ Master Lock 5441 har den bredaste prisspridningen på sajten för en och
       samma artikel: 2 015 kr hos Amazon.se, 2 599 hos Nordsec och 2 995 hos
       Bauhaus, som är slut. PriceRunner anger lowPrice 1 994 över fem
       erbjudanden. Vi länkar Nordsec, se motiveringen i lib/data/nyckelskap.ts.
       Kontrollera om spridningen vid nästa prisrunda. */
    status: "live",
    updated: "2026-08-05",
    count: 6,
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
