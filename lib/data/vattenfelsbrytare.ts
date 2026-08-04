import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { VATTENFELSBRYTARE } from "@/lib/test-pages";

/**
 * Vattenfelsbrytare och läckagebrytare. Underlag i
 * .agent/research/vattenfelsbrytare.md, särskilt §9 som är datainsamlingen.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, artikelnummer, RSK-nummer, EAN, mått,
 * anslutningar, tryck- och temperaturgränser och certifikatnummer. Allt läst
 * 2026-08-04 på butikens eller tillverkarens egen sida.
 *
 * **Läst i primärkälla, inte i en butikstext:** de tre typgodkännandena. Vi har
 * hämtat och läst PDF:erna hos RISE via tillverkarnas dokumentbibliotek, och
 * citaten i verdicts kommer ur certifikaten själva. Det är skillnaden mellan
 * den här sidan och varenda konkurrent i kategorin.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte installerat, provat
 * eller läckagetestat en enda av produkterna och skriver det rakt ut på sidan.
 *
 * ## Kriterium 1 mäter vad tillverkaren publicerar
 *
 * Inte vad produkten är. RISE certifieringsregister levererar en botkontroll
 * och går inte att läsa utifrån, så ett lågt betyg betyder att inget
 * certifikatnummer publiceras, aldrig att produkten provats och underkänts.
 * Den skillnaden är sidans viktigaste formuleringsfråga och står utskriven
 * både i kriteriebeskrivningen, i metodrutan och i köpguiden.
 *
 * Skalan: 5,0 när tillverkaren publicerar ett certifikatnummer eller en
 * oberoende källa namnger produkten som godkänd, 3,0 när tillverkaren skriver
 * att sortimentet uppfyller reglerna utan nummer för just den produkten, 1,5
 * när ingen uppgift alls går att hitta.
 *
 * ## Butiksfördelningen, och varför den ser ut som den gör
 *
 * Tre länkar går till Rinkaby Rör, en till Bauhaus och en till Kjell. Vi länkar
 * genomgående till den billigaste butik vars pris vi kunnat läsa på butikens
 * egen sida.
 *
 * ⚠️ Kategorins enda affiliateprogram är VVSochBad, 2,40 procent via
 * Partner-ads, och den butiken är dyrast eller näst dyrast på båda de centrala
 * brytarna: 10 951 kronor för Vatette mot Bauhaus 8 495, och 5 499 för LK mot
 * Rinkaby Rörs 5 373. Vi länkar därför inte dit. Samma väg som /luftfuktare,
 * där testvinnaren ligger hos en butik vi inte tjänar något på och det står på
 * sidan.
 *
 * ## Slutsålt kontra utgånget
 *
 * Grohe Sense Guard ligger bland de övervägda och inte i rankningen. Skälet är
 * att Grohe själva skriver "Den här produkten är inte längre tillgänglig" på
 * sin egen produktsida, alltså samma bevisnivå som fällde Shelly Flood på
 * /vattenlarm. LK WSS Mini är märkt "Utgått" av tillverkaren och ligger av
 * samma skäl utanför.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-04";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "lk-cubicsecure",
    name: "CubicSecure vattenfelsbrytare",
    shortName: "CubicSecure",
    brand: "LK Systems",
    image: productImage(VATTENFELSBRYTARE.slug, "lk-cubicsecure"),
    tagline:
      "Enda produkten här med ett typgodkännande från 2024, och den kostar minst av de centrala.",
    scores: {
      typgodkannande: 5,
      omfattning: 4.5,
      installation: 4,
      prisvarde: 4.5,
      uppkoppling: 4.5,
    },
    price: 5373,
    merchant: "Rinkaby Rör",
    merchantUrl: "https://www.rinkabyror.se/artikel/lk-cubicsecure-vattenfelsbrytare/",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för hela huset",
    pros: [
      "Typgodkännande C900737 ligger som nedladdningsbar PDF hos tillverkaren",
      "Stänger av hela huset, alltså även läckan bakom en vägg där ingen sensor ligger",
      "Stänger ventilen en gång per dygn och mäter trycket, vilket hittar droppläckage",
      "Fungerar helt utan internetuppkoppling",
      "Billigast av de centrala brytarna, med 3 122 kronor ner till nästa",
    ],
    cons: [
      "Kräver rörmokare och ett ingrepp på inkommande ledning",
      "Läckagesensorer säljs separat, som CubicDetector och CubicSensor",
      "Samma artikel skiljer 1 122 kronor mellan billigaste och dyraste butik",
    ],
    specs: [
      {
        label: "Typgodkännande",
        value: "C900737, RISE, 2024-06-13",
        highlight: true,
      },
      { label: "Typ", value: "Central vattenfelsbrytare", highlight: true },
      {
        label: "Vad den mäter",
        value: "Flöde med ultraljud, plus kontinuerligt tryck",
        highlight: true,
      },
      { label: "Stänger av", value: "Hela tappvattensystemet", highlight: true },
      { label: "Sensorer krävs", value: "Nej, men kan anslutas", highlight: true },
      { label: "Installation", value: "Rörmokare, inkommande ledning" },
      { label: "Anslutning", value: "G20 EuroCone utvändig, båda ändar" },
      { label: "Fungerar utan internet", value: "Ja, helt" },
      { label: "App", value: "MyLK, med förbrukning och notiser" },
      { label: "Max driftstryck", value: "1,0 MPa (10 bar)" },
      { label: "Mått", value: "117 × 121 × 82 mm, längd 110 mm" },
      { label: "RSK-nummer", value: "1882667" },
      { label: "GTIN", value: "7331590060505" },
    ],
    verdict:
      "Det här är den enda produkten i jämförelsen där du kan ladda ner beviset själv. LK Systems lägger typgodkännandet som en PDF under Dokumentation på sin egen produktsida, och det står C900737, utfärdat av RISE den 13 juni 2024. Certifikatet är dessutom av den starkare sorten: ett typgodkännande med beslut om tillverkningskontroll, där RISE löpande övervakar tillverkarens egenkontroll. Att en köpare kan kontrollera det på två minuter är hela skälet till att kriteriet väger trettio.\n\nFunktionen matchar. Ultraljudssensorer mäter flödet kontinuerligt, en separat tryckgivare letar efter det som ett flödesmått missar, och en gång per dygn stänger ventilen av vattnet och mäter trycket för att hitta de allra minsta droppläckagen. Det görs oftast nattetid. Det är den mätningen som skiljer en vattenfelsbrytare från ett vattenlarm: den hittar läckan i röret bakom väggen, där ingen sensor på golvet någonsin kommer att ligga.\n\nEn detalj som väger tyngre än den låter: den fungerar helt utan internetuppkoppling. Appen MyLK ger notiser och förbrukning, men skyddet ligger i enheten. En produkt som slutar skydda den dag routern går ned eller tillverkaren stänger tjänsten är inte ett skydd, och det är en fråga sajten ställer i varje uppkopplad kategori.\n\nKvar står det som gäller alla centrala brytare: det är ett ingrepp på inkommande servisledning och kräver rörmokare. Länsförsäkringar anger 6 000 till 10 000 kronor installerad. Räkna med det ovanpå de 5 373.",
  },
  {
    id: "vatette-lackagebrytare",
    name: "Läckagebrytare med kulventil",
    shortName: "Läckagebrytare",
    brand: "Vatette",
    image: productImage(VATTENFELSBRYTARE.slug, "vatette-lackagebrytare"),
    tagline:
      "Typgodkänd i april 2026, alltså den färskaste vägen in i det nya kökskravet.",
    scores: {
      typgodkannande: 5,
      omfattning: 2.5,
      installation: 4.5,
      prisvarde: 3.5,
      uppkoppling: 4.5,
    },
    price: 3465,
    merchant: "Rinkaby Rör",
    merchantUrl: "https://www.rinkabyror.se/artikel/va-lackagebrytare-uppkop-/",
    priceCheckedAt: PRICE_CHECKED,
    award: "editor",
    superlative: "Bäst för kravet i köket",
    pros: [
      "Typgodkännande C901455 från april 2026, det färskaste i kategorin",
      "Certifikatet namnger RSK-numret, så du kan kontrollera exakt vilken variant som omfattas",
      "Snäpps fast för hand på en befintlig Vatette kulventil eller väggfördelare",
      "Fungerar utan Wi-Fi och app, via kontrollpanelen med schema eller vattentimer",
      "Klarar 70 °C kontinuerligt, alltså även varmvattensidan",
    ],
    cons: [
      "Stänger bara vid den ventil motorn sitter på, inte hela huset",
      "Förutsätter att du redan har Vatette kulventil eller väggfördelare V6",
      "Nästan lika dyr som en central brytare kostar hos en dyr butik",
    ],
    specs: [
      {
        label: "Typgodkännande",
        value: "C901455, RISE, 2026-04-17",
        highlight: true,
      },
      { label: "Typ", value: "Läckagebrytare", highlight: true },
      { label: "Vad den mäter", value: "Ingenting, stänger på sensorsignal", highlight: true },
      { label: "Stänger av", value: "Den ventil motorn sitter på", highlight: true },
      { label: "Sensorer krävs", value: "Ja, en ingår", highlight: true },
      { label: "Installation", value: "Snäpps fast för hand, ingen rörmokare" },
      { label: "Fungerar utan internet", value: "Ja, via kontrollpanelen" },
      { label: "App", value: "Vatette Läckagebrytare, Wi-Fi" },
      { label: "Max driftstryck", value: "1,0 MPa (10 bar)" },
      { label: "Max vattentemperatur", value: "70 °C kontinuerligt, 95 °C momentant" },
      { label: "RSK-nummer", value: "5215023" },
      { label: "Varianter", value: "Utan kulventil, RSK 5215022, 3 356 kr" },
    ],
    verdict:
      "Den här produkten är skälet till att sidan rankar två produkttyper i stället för en. I februari 2025 skrev VVS-Forum att typgodkända läckagebrytare med sensorer skulle dyka upp under året. Certifikat C901455 är daterat den 17 april 2026, och det betyder att förutsägelsen har slagit in utan att någon konsumentsida har märkt det.\n\nVarför det spelar roll just nu: sedan 1 januari 2026 säger Branschregler Säker Vatteninstallation 2026:1 att den vattentäta insatsen eller tråget i ett kök ska ha en fuktsensor kopplad till en läckagebrytare, vattenfelsbrytare eller ett vattenlarm, och att produkten ska vara typgodkänd. Ska du renovera kök är det här den billigaste vägen som går att belägga.\n\nCertifikatet gör något ovanligt: det namnger fyra artiklar med RSK-nummer i klartext. Den med kulventil är RSK 5215023, den utan är 5215022. Det är värt att veta, för i handeln finns Vatette-läckagebrytare med snarlika namn och andra artikelnummer, och en av dem kostar mer än den certifierade utan att stå i certifikatet.\n\nBegränsningen ska sägas rakt ut. Den stänger vid den ventil motorn sitter på, alltså diskmaskinen eller tvättmaskinen. Rörbrottet i badrumsväggen tar den inte. Skyddets omfattning väger tjugofem på den här sidan, och där förlorar den mot de centrala brytarna med stor marginal. Att den ändå hamnar tvåa beror på att installation, pris och uppkoppling tillsammans väger fyrtiofem, och där vinner den allihop.",
  },
  {
    id: "vatette-vattenfelsbrytare",
    name: "Vattenfelsbrytare komplett",
    shortName: "Vattenfelsbrytare",
    brand: "Vatette",
    image: productImage(VATTENFELSBRYTARE.slug, "vatette-vattenfelsbrytare"),
    tagline:
      "Den ena av de två som klarade RISE-provningen 2022. Kan ingenting annat, och gör det bra.",
    scores: {
      typgodkannande: 5,
      omfattning: 4.5,
      installation: 3.5,
      prisvarde: 2.5,
      uppkoppling: 1.5,
    },
    price: 8495,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/vattenfelsbrytare-vatette-komplett-230v",
    priceCheckedAt: PRICE_CHECKED,
    award: "premium",
    superlative: "Bäst utan uppkoppling",
    pros: [
      "Typgodkännande SC0056-15 publicerat av tillverkaren, med tillverkningskontroll",
      "Den ena av de två som klarade RISE-provningen 2022, namngiven av Länsförsäkringar",
      "Självlärande övervakning som anpassar sig till hushållets eget mönster",
      "Inga vattendetektorer behövs, och inget konto att skapa",
    ],
    cons: [
      "3 122 kronor dyrare än LK CubicSecure, som har ett färskare certifikat",
      "Ingen app, ingen notis, och inget sätt att veta något på distans",
      "Utgående anslutning är klämringskoppling för kopparrör, alltså inte fritt val av rör",
      "Certifikatet anger maximalt 60 °C, lägst av de typgodkända här",
    ],
    specs: [
      {
        label: "Typgodkännande",
        value: "SC0056-15, RISE, utgåva 4, 2022-01-31",
        highlight: true,
      },
      { label: "Typ", value: "Central vattenfelsbrytare", highlight: true },
      { label: "Vad den mäter", value: "Flöde och tryck, självlärande", highlight: true },
      { label: "Stänger av", value: "Hela tappvattensystemet", highlight: true },
      { label: "Sensorer krävs", value: "Nej, men kan anslutas", highlight: true },
      { label: "Installation", value: "Rörmokare, inkommande ledning" },
      { label: "Anslutning", value: "G3/4 invändig in, klämring Dy22 ut" },
      { label: "Fungerar utan internet", value: "Ja, ingen uppkoppling finns" },
      { label: "App", value: "Nej" },
      { label: "Max driftstryck", value: "1,0 MPa (10 bar)" },
      { label: "Max vattentemperatur", value: "60 °C" },
      { label: "Spänning", value: "24 V / 230 V" },
      { label: "Mått", value: "175 × 195 × 115 mm" },
      { label: "RSK-nummer", value: "5618813" },
      { label: "GTIN", value: "7393792104685" },
    ],
    verdict:
      "Det här är produkten hela kategorins historia handlar om. När Länsförsäkringars Forskningsfond lät RISE prova åtta vattenfelsbrytare mot SP-Metod 5314 klarade sig ingen i första omgången. Tillverkarna fick tid att åtgärda, och två godkändes till slut. Vatette var den ena. Den andra hittar vi inte längre i handeln.\n\nTypgodkännandet finns kvar och är lätt att kontrollera: Vatette publicerar hela sitt certifikatbibliotek, och SC0056-15 ligger där som PDF, utgåva 4 daterad 31 januari 2022, med beslut om tillverkningskontroll. Övervakningen är självlärande, den upptäcker både droppläckage och flödesläckage, och den behöver inga vattendetektorer alls.\n\nProblemet är vad det kostar att välja den 2026. Den billigaste butik vi kunde läsa ett pris hos tar 8 495 kronor, vilket är 3 122 mer än LK CubicSecure, som har ett fyra år färskare certifikat och dessutom en app. Och priset är märkligt rörligt: samma artikelnummer kostade mellan 8 495 och 10 951 kronor hos fyra butiker samma dag, en skillnad på 29 procent.\n\nTvå saker i certifikatet står inte i någon butikstext. Utgående anslutning är en klämringskoppling Vatette Dy22 för kopparrör, så rörvalet är inte fritt. Och maximal vattentemperatur är 60 grader, vilket är lägre än både LK:s brytare och Vatettes egen läckagebrytare. Fråga din rörmokare om det innan du beställer.\n\nKöp den ändå om du vill ha ett hus utan ännu en uppkopplad pryl. Den har inget konto, ingen app och ingen molntjänst som kan läggas ner. För en del läsare är det ett argument och inte en brist.",
  },
  {
    id: "tollco-waterfuse-plugin",
    name: "WaterFuse PlugIn G15",
    shortName: "WaterFuse PlugIn",
    brand: "Tollco",
    image: productImage(VATTENFELSBRYTARE.slug, "tollco-waterfuse-plugin"),
    tagline: "Billigaste riktiga avstängningen, men certifikatnumret gäller något annat.",
    scores: {
      typgodkannande: 3,
      omfattning: 2,
      installation: 4,
      prisvarde: 4,
      uppkoppling: 1,
    },
    price: 2399,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/lackagebrytare-tollco-waterfuse-plugin-g15",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Billigast med motorventil",
    pros: [
      "Billigast av de produkter som faktiskt stänger av vattnet",
      "Motorventil på ledningen till maskinen, sensorn under den",
      "Larmar med pipsignal på plats",
      "Tollco är den tillverkare som förklarar de nya reglerna tydligast",
    ],
    cons: [
      "Tollco publicerar certifikatnummer för sina vattenlarm, inte för den här produkten",
      "En ventil och en sensor, alltså en maskin",
      "Ingen app och ingen notis i grundutförandet",
    ],
    specs: [
      {
        /* Inte "Ej angivet": tabellen växlar den strängen till ett streck, och
           ett streck läser som en lucka i vår research i stället för som det
           den är, nämligen att tillverkaren inte publicerar något nummer. Se
           EJ_ANGIVET i components/product/comparison-table.tsx. */
        label: "Typgodkännande",
        value: "Inget nummer publicerat",
        highlight: true,
      },
      { label: "Typ", value: "Läckagebrytare", highlight: true },
      { label: "Vad den mäter", value: "Ingenting, stänger på sensorsignal", highlight: true },
      { label: "Stänger av", value: "Ledningen till en maskin", highlight: true },
      { label: "Sensorer krävs", value: "Ja, en ingår", highlight: true },
      { label: "Installation", value: "Motorventil på tilloppet, behörig fackperson" },
      { label: "Anslutning", value: "G15" },
      { label: "Antal ventiler", value: "1" },
      { label: "App", value: "Nej, pipsignal på plats" },
      { label: "Spänning", value: "230 V" },
      { label: "GTIN", value: "7392832001151" },
    ],
    verdict:
      "För 2 399 kronor får du en motorventil som sitter på tilloppet till diskmaskinen och en sensor som ligger under den. Blir sensorn blöt stänger ventilen och enheten piper. Det är det billigaste sättet att gå från att bli varnad till att faktiskt få vattnet avstängt, och skillnaden mellan de två är hela poängen med den här sidan.\n\nMen kriterium ett landar på tre och inte fem, och skälet är värt att förstå. Tollco skriver utförligt och begripligt om de nya reglerna på sin egen webbplats, namnger både CR 057 och CR 139 och anger att ett typgodkännande gäller i fem år. De publicerar också ett certifikatnummer, C901472, men det gäller bolagets vattenlarm. För WaterFuse PlugIn hittar vi inget nummer.\n\nDet betyder inte att produkten är underkänd. RISE certifieringsregister går inte att söka utifrån, så vi uttalar oss aldrig om frånvaro. Det betyder att du inte kan kontrollera saken i butiken. Ska installationen räknas som ett aktivt skydd enligt 2026:1 är det numret du ska be om, och ordet godkänd räcker inte.\n\nGrundutförandet larmar bara där det står. Det är samma svaghet som en tredjedel av vattenlarmen på vår sensorsida har, och den är mindre allvarlig här, eftersom ventilen stänger av oavsett om någon hör pipet.",
  },
  {
    id: "aqara-valve-controller-t1",
    name: "Valve Controller T1",
    shortName: "Valve Controller T1",
    brand: "Aqara",
    image: productImage(VATTENFELSBRYTARE.slug, "aqara-valve-controller-t1"),
    tagline: "Skruvas fast på kranen du redan har. Ingen rörmokare, och inget certifikat.",
    scores: {
      typgodkannande: 1.5,
      omfattning: 2,
      installation: 4.5,
      prisvarde: 4,
      uppkoppling: 4,
    },
    price: 819,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/vattenlarm/aqara-valve-controller-t1-p56579",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst utan rörmokare",
    pros: [
      "Monteras på en befintlig ventil utan att röret öppnas",
      "En sjättedel av priset på billigaste läckagebrytare",
      "Zigbee 3.0 och Matter via hubb, fungerar med Apple Home, Google Home och Alexa",
      "Upp till två års batteritid på fyra AA",
    ],
    cons: [
      "Ingen uppgift om typgodkännande, och produkten har inget RSK-nummer",
      "Kräver både en Aqara-hubb och en separat läckagesensor, båda köps till",
      "Vrider ett befintligt handtag, alltså inget som en installatör kan intyga",
      "Ingen IP-klass, avsedd för inomhusbruk",
    ],
    specs: [
      { label: "Typgodkännande", value: "Inget nummer publicerat", highlight: true },
      { label: "Typ", value: "Ventilstyrning", highlight: true },
      { label: "Vad den mäter", value: "Ingenting, stänger på sensorsignal", highlight: true },
      { label: "Stänger av", value: "Den ventil den sitter på", highlight: true },
      { label: "Sensorer krävs", value: "Ja, säljs separat", highlight: true },
      { label: "Installation", value: "Skruvas på befintligt handtag, några minuter" },
      { label: "Anslutning", value: "DN15, DN20, DN25" },
      { label: "Fungerar utan internet", value: "Nej, hubb krävs" },
      { label: "App", value: "Aqara Home, Zigbee 3.0 och Matter via hubb" },
      { label: "Batteri", value: "4 × AA, medföljer" },
      { label: "Batteritid", value: "Upp till 2 år" },
      { label: "Mått", value: "93 × 72 × 84 mm" },
      { label: "Modell", value: "VC-X01D" },
    ],
    verdict:
      "Den här ligger med av ett skäl: den är det enda sättet att få automatisk avstängning för under tusen kronor, och en läsare som just insett vad de andra kostar förtjänar att veta att den finns. Den skruvas på handtaget till en ventil du redan har, tar några minuter och kräver ingen rörmokare och inget hål i något rör.\n\nSedan tar likheterna slut. Den mäter ingenting, så den hittar aldrig ett droppläckage inne i väggen. Den behöver en läckagesensor för att veta att något hänt och en Aqara-hubb för att sensorn ska nå den, och båda köps separat, vilket gör att 819 kronor i praktiken blir det dubbla. Batteridriven ventilstyrning är dessutom en annan sorts tillförlitlighet än en nätansluten motorventil på ett rör.\n\nDet avgörande är kriterium ett. Aqara publicerar ingen uppgift om typgodkännande, produkten har inget RSK-nummer och den finns inte i den svenska VVS-handeln. Vi påstår inte att den är underkänd, för det vet vi inte. Vi säger att det inte finns något att kontrollera, och att en installation med den inte går att belägga mot branschreglerna.\n\nKöp den för att du vill ha en smart avstängning i ett hem du redan fyllt med Aqara. Köp den inte för att slippa de andra produkterna på den här sidan. Det är två helt olika beslut.",
  },
];

export const VATTENFELSBRYTARE_PRODUCTS: Product[] = resolveProducts(
  VATTENFELSBRYTARE,
  SEEDS,
);

/**
 * Underlag till filtren i jämförelsetabellen.
 *
 * `typ` är kategorins viktigaste egenskap och den som sidan är byggd kring: en
 * central brytare mäter själv och skyddar hela huset, en läckagebrytare stänger
 * där en sensor larmar. Härlett ur produkterna ovan snarare än upprepat, så en
 * ändrad produkt inte kan hamna i fel grupp.
 */
export type BreakerCapability = {
  id: string;
  typ: "central" | "lokal";
  /** Tillverkaren publicerar ett certifikatnummer för just den här produkten. */
  publiceratCertifikat: boolean;
  /** Skyddet fungerar utan internetuppkoppling. */
  utanInternet: boolean;
  /** Går att sätta dit utan att öppna ett rör. */
  utanRormokare: boolean;
};

export const VATTENFELSBRYTARE_CAPABILITIES: BreakerCapability[] = [
  { id: "lk-cubicsecure", typ: "central", publiceratCertifikat: true, utanInternet: true, utanRormokare: false },
  { id: "vatette-lackagebrytare", typ: "lokal", publiceratCertifikat: true, utanInternet: true, utanRormokare: true },
  { id: "vatette-vattenfelsbrytare", typ: "central", publiceratCertifikat: true, utanInternet: true, utanRormokare: false },
  { id: "tollco-waterfuse-plugin", typ: "lokal", publiceratCertifikat: false, utanInternet: true, utanRormokare: false },
  { id: "aqara-valve-controller-t1", typ: "lokal", publiceratCertifikat: false, utanInternet: false, utanRormokare: true },
];

export const VATTENFELSBRYTARE_FILTERS: ComparisonFilter[] = [
  {
    key: "central",
    label: "Skyddar hela huset",
    ids: VATTENFELSBRYTARE_CAPABILITIES.filter((c) => c.typ === "central").map((c) => c.id),
  },
  {
    key: "lokal",
    label: "Skyddar en plats",
    ids: VATTENFELSBRYTARE_CAPABILITIES.filter((c) => c.typ === "lokal").map((c) => c.id),
  },
  {
    key: "certifikat",
    label: "Publicerat certifikatnummer",
    ids: VATTENFELSBRYTARE_CAPABILITIES.filter((c) => c.publiceratCertifikat).map((c) => c.id),
  },
  {
    key: "utan-rormokare",
    label: "Utan rörmokare",
    ids: VATTENFELSBRYTARE_CAPABILITIES.filter((c) => c.utanRormokare).map((c) => c.id),
  },
];

/**
 * Övervägda men inte rankade.
 *
 * Grohe Sense Guard är det viktigaste namnet här, av samma skäl som Shelly
 * Flood på /vattenlarm: den ligger högt hos flera konkurrenter och tillverkaren
 * skriver själv att den inte längre är tillgänglig.
 */
export const VATTENFELSBRYTARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Grohe",
    name: "Sense Guard 22500",
    reason:
      "Utgången. Grohe skriver på sin egen produktsida, två gånger, att produkten inte längre är tillgänglig, och de två svenska butiker som anger status har den som slut respektive inkommande. Vi rankar inte produkter som tillverkaren själv har avvecklat. Hittar du den kvar på en hylla är den en fullvärdig central brytare som mäter flöde, tryck och temperatur, men vi hittade ingen uppgift om typgodkännande för den svenska marknaden. Produktnummer 22500LN0, RSK 5216552.",
    approxPrice: 8920,
    merchant: "Golvshop",
    merchantUrl:
      "https://www.golvshop.se/bygg/vvs/vattensakerhet/vattenfelsbrytare/vattenfelsbrytare-grohe-sense-guard-22500/p-857495",
  },
  {
    brand: "Tollco",
    name: "WaterFuse Villa Control",
    reason:
      "Den andra av de två som klarade RISE-provningen 2022, och den finns inte i handeln. Tollcos egen produktsida leder numera till en kategori som heter Läckage- och vattenbrytare och som inte innehåller den. Deras webbshop och Rinkaby Rörs Tollco-hylla bär läckagebrytare och vattenlarm i stället. St George har kvar en sida med rubriken UTGÅTT. Vi säger inte att produkten är nedlagd, för det har Tollco inte skrivit någonstans. Att den ena av de två godkända ändå inte går att köpa fyra år senare säger något om hur ung marknaden är.",
    approxPrice: 7995,
  },
  {
    brand: "Uponor",
    name: "Aqua PLUS Waterguard",
    reason:
      "Säljs bara av rörgrossister, och ingen av dem publicerar ett pris. Vi rankar inte produkter vars pris vi inte kan läsa på en butiks egen sida. Den är dessutom bunden till Uponors eget PPM-fördelarsystem med bajonettgänga, så den är inget fritt val utan ett tillbehör till en installation du redan har. En detalj värd att låna av den: ventilen är stängd vid strömavbrott och kopplingsboxen har en nödöppning som drivs av ett 9 V-batteri.",
  },
  {
    brand: "LK Systems",
    name: "WSS Mini",
    reason:
      "Utgången enligt tillverkaren, som märker samtliga tre artiklar med Utgått på sin egen produktsida. Var ett paket med huvudenhet, motorventil, sensor och läckagedetektor, och kunde byggas ut till sexton detektorer. Den som redan har ett installerat behöver inte byta ut det, men den går inte längre att köpa.",
  },
  {
    brand: "Vatette",
    name: "Läckagebrytare FG0901121",
    reason:
      "Samma namn som vår tvåa och nästan samma pris, men ett annat artikelnummer. Typgodkännandet C901455 namnger FG0901122 och FG0901123, och FG0901121 står inte där. Vi vet inte varför, och vi påstår ingenting om produktens status. Vi noterar att den kostar 3 495 kronor hos Bauhaus medan den variant certifikatet faktiskt namnger kostar 3 465 hos Rinkaby Rör, och att skillnaden mellan dem inte syns någonstans i butiken.",
    approxPrice: 3495,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/lackagebrytare-vatette-med-kulventil",
  },
  {
    brand: "LK Systems",
    name: "CubicDetector och CubicSensor",
    reason:
      "Inte brytare utan sensorer, och de hör hit ändå: CubicSecure hittar läckor i rören själv, men vill du att den ska stänga av när diskmaskinen läcker på golvet behöver du en av dessa. Det är den kostnaden som inte syns i priset på en central brytare, och den är värd att ta med i kalkylen innan du jämför två produkter som ser likvärdiga ut.",
  },
];

export const VATTENFELSBRYTARE_FAQ = [
  {
    question: "Vad är skillnaden mellan vattenfelsbrytare och läckagebrytare?",
    answer:
      "En vattenfelsbrytare sitter centralt på inkommande ledning och mäter flöde och tryck hela tiden. Den upptäcker läckan i sig själv, även inne i en vägg där ingen sensor ligger, och stänger av vattnet till hela huset. En läckagebrytare mäter ingenting utan stänger en ventil när en sensor blir blöt, alltså vid diskmaskinen eller tvättmaskinen där sensorn ligger. Certifieringsregeln CR 139 omfattar båda, plus vattenlarm. Priset skiljer ungefär en faktor två och skyddet skiljer betydligt mer än så.",
  },
  {
    question: "Måste en vattenfelsbrytare vara typgodkänd?",
    answer:
      "Det beror på vad du gör. För att sätta dit en i din egen villa finns inget krav. Men sedan 1 januari 2026 gäller Branschregler Säker Vatteninstallation 2026:1, och där ska den vattentäta insatsen eller tråget i ett kök ha en fuktsensor kopplad till en läckagebrytare, vattenfelsbrytare eller ett vattenlarm som är typgodkänt enligt CR 139. Det träffar nybyggnation och köksrenovering. Branschregler är inte lag utan en standard som försäkringsbolag, beställare och auktoriserade installatörer håller sig till. Vill du att din installatör ska kunna intyga arbetet är typgodkännandet det som avgör.",
  },
  {
    question: "Vilka vattenfelsbrytare är typgodkända 2026?",
    answer:
      "Tre av produkterna på den här sidan har ett certifikatnummer som tillverkaren publicerar och som vi har läst i original. LK CubicSecure har C900737, utfärdat av RISE den 13 juni 2024. Vatette Vattenfelsbrytare har SC0056-15, utgåva 4 från 31 januari 2022. Vatette Läckagebrytare har C901455 från 17 april 2026. Alla tre är typgodkännanden med beslut om tillverkningskontroll. Att en produkt inte står här betyder inte att den är underkänd: RISE register går inte att söka utifrån, så listan säger vad som är belagt, inte vad som finns.",
  },
  {
    question: "Stämmer det att bara två vattenfelsbrytare är godkända?",
    answer:
      "Det stämde 2022 och stämmer inte i dag. När Länsförsäkringars Forskningsfond lät RISE prova åtta produkter mot SP-Metod 5314 klarade sig ingen i första omgången. Efter att tillverkarna fått åtgärda godkändes två: Vatette och Tollco WaterFuse Villa Control. Sedan dess har fler tillkommit, bland andra LK CubicSecure 2024 och Vatettes läckagebrytare 2026. Siffran två dyker fortfarande upp på jämförelsesajter som om den beskrev nuläget, och det gör den inte.",
  },
  {
    question: "Vad kostar en vattenfelsbrytare installerad?",
    answer:
      "Själva enheten kostar 5 373 till 8 495 kronor för de centrala brytarna vi jämför, kontrollerat 2026-08-04. Ovanpå det kommer installationen, och Länsförsäkringar anger 6 000 till 10 000 kronor för en vattenfelsbrytare monterad. En läckagebrytare vid en enskild maskin ligger på 2 399 till 3 465 kronor och kräver mindre arbete. Ställ det mot vad en vattenskada kostar: Vattenskadecentrum anger 49 700 kronor i snitt, och självrisken ensam ligger på 3 440 till 10 000 med åldersavdrag utöver det.",
  },
  {
    question: "Ger en vattenfelsbrytare rabatt på försäkringen?",
    answer:
      "Ja, till skillnad från ett vattenlarm. Både Länsförsäkringar och Folksam ger tio procent på villa- eller fritidshusförsäkringen för en godkänd vattenfelsbrytare, och Länsförsäkringar vill se ett installationsintyg. Folksam kräver dessutom underlägg under vitvaror och diskbänk. Villkoren sätts av respektive bolag och för Länsförsäkringars del av respektive länsbolag, så kontrollera nivån hos ditt eget. Räkna på återbetalningstiden innan du köper, den beror helt på vad din premie ligger på.",
  },
  {
    question: "Fungerar en vattenfelsbrytare utan internet?",
    answer:
      "De flesta gör det, och det är värt att kontrollera. LK CubicSecure fungerar helt på egen hand utan uppkoppling, appen ger notiser och förbrukningsstatistik ovanpå det. Vatette Vattenfelsbrytare har ingen app alls. Vatette Läckagebrytare kan styras via kontrollpanelen med schema eller timer även utan Wi-Fi. Aqara Valve Controller T1 är undantaget: den behöver en hubb för att över huvud taget få veta att en sensor larmat. Ett skydd som slutar skydda när routern går ned är inget skydd.",
  },
  {
    question: "Vad händer med vattnet vid strömavbrott?",
    answer:
      "Det beror på ventilen och tillverkarna anger det sällan i butiken. Uponors Waterguard har en solenoidventil som är stängd vid strömavbrott, med en nödöppning som drivs av ett 9 V-batteri i kopplingsboxen. LK CubicSecure och Vatettes brytare använder motorstyrda kulventiler, som står kvar i det läge de befann sig i. Ingendera är fel, men skillnaden avgör om du blir utan vatten eller utan skydd när strömmen går, och det är en fråga att ställa till installatören.",
  },
  {
    question: "Vilken vattenfelsbrytare är bäst 2026?",
    answer:
      "LK CubicSecure, om du ska skydda ett helt hus. Den har det färskaste typgodkännandet, den enda dygnsvisa tryckmätningen som hittar riktigt små droppläckage, den fungerar utan internet och den är billigast av de centrala brytarna. Ska du bara uppfylla kravet på aktivt skydd i ett kök som renoveras är Vatette Läckagebrytare rätt köp för mindre än halva pengen, förutsatt att du har Vatette kulventiler sedan tidigare.",
  },
  {
    question: "Var sitter en vattenfelsbrytare?",
    answer:
      "På den inkommande servisledningen, alltså där vattnet kommer in i huset, normalt efter huvudavstängningen och vattenmätaren. Det är därför den kräver rörmokare: ledningen måste öppnas. En läckagebrytare sitter i stället på tilloppet till den maskin den ska skydda, eller snäpps fast på en befintlig kulventil, och är därför ett betydligt mindre ingrepp. Byggmåttet spelar roll i ett trångt utrymme, och LK anger 110 millimeter för sin enhet mot Vatettes 175 millimeter i bredd.",
  },
  {
    question: "Räcker ett vattenlarm i stället?",
    answer:
      "Nej, om målet är att stoppa skadan. Ett vattenlarm för ett par hundra kronor talar om att vatten runnit ut, men det stänger ingenting. Är du hemma och hör det vinner du de minuter som avgör. Är du bortrest larmar det i ett tomt hus, eller skickar en notis du inte kan göra något åt. Det är också därför försäkringsbolagen ger rabatt för en vattenfelsbrytare men inte för ett larm. Har du redan larm är de fortfarande värda att behålla: de flesta brytare kan ta emot signal från en sensor och stänga av på den.",
  },
  {
    question: "Hur vet jag om en produkt verkligen är typgodkänd?",
    answer:
      "Be om certifikatnumret, inte om ordet godkänd. Ett typgodkännande har ett nummer i formen C900737 eller SC0056-15, en utgåva, ett datum och en innehavare, och seriösa tillverkare lägger hela PDF:en på sin egen webbplats. Kontrollera att numret gäller just den artikel du köper: Vatettes certifikat namnger fyra artiklar med RSK-nummer, och det finns snarlika produkter i handeln som inte står med. Ett typgodkännande gäller enligt Tollco i fem år, så titta också på datumet.",
  },
  {
    question: "Vad kostar samma vattenfelsbrytare hos olika butiker?",
    answer:
      "Betydligt mer än man tror. Samma artikelnummer på Vatette Vattenfelsbrytare kostade mellan 8 495 och 10 951 kronor hos fyra butiker samma dag, en skillnad på 2 456 kronor eller 29 procent. LK CubicSecure låg mellan 5 373 och 6 495, alltså 21 procent. Kategorin säljs av rörgrossister och byggvaruhus som prissätter helt olika, och ingen prisjämförare täcker dem alla. Kontrollera minst tre butiker innan du beställer, det är den enklaste tusenlappen på hela köpet.",
  },
];
