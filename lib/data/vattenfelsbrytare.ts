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
 * ## ⚠️ Kriterium 1 gjordes om 2026-08-06: registret går att läsa
 *
 * Den gamla skalan mätte vad tillverkaren publicerade, inte vad produkten var,
 * eftersom `ri.se/sv/certifikat` levererar en botkontroll. **Det var fel värd.**
 * RISE öppna certifikatregister ligger på `cert.ri.se` och är fullt sökbart:
 * 5 127 produktcertifikat, sökbara på nummer, produktnamn och innehavare, via
 * `POST cert.ri.se/api/v1/sv/ProductCertificate/Paged`. Läst 2026-08-06.
 *
 * Följden är att godkännandet nu går att fastställa **positivt åt båda hållen**.
 * Skalan mäter därför vad produkten genomgått: 5,0 för giltigt typgodkännande
 * enligt CR 139, 2,5 för provning och godkännande av ett annat oberoende organ,
 * 1,0 när ingen oberoende provning för svensk marknad finns.
 *
 * Registret gav också certifikatens **giltighetstid**, som ingen tillverkare
 * skyltar med. Vatettes vattenfelsbrytare löper ut 2027-01-30, alltså inom ett
 * halvår från den här revisionen. Det är en ny rad i tabellen.
 *
 * ⚠️ CR 139 är RISE egen certifieringsregel och Säker Vatten hänvisar bara till
 * den. Registret är alltså uttömmande för det branschreglerna kräver. Ett
 * godkännande från ett annat organ, som Tollcos SINTEF-godkännande, säger något
 * om produkten men uppfyller inte 2026:1.
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
      "Mäter trycket varje natt och hittar droppläckaget bakom väggen, för minst av de centrala.",
    scores: {
      /* Typgodkänd enligt CR 139, C900737, giltigt t.o.m. 2028-02-08.
         Kontrollerat i RISE öppna register 2026-08-06. */
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
      "Typgodkänd enligt CR 139, alltså giltig för både installationsintyg och försäkringsrabatt",
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
      /* Giltighetstiden är ur RISE öppna register, cert.ri.se, läst 2026-08-06.
         Ingen tillverkare publicerar den på sin produktsida.

         ⚠️ Kommentaren ligger UTANFÖR objektet med flit. check-tackning.mjs
         matchar `{\s*label:` och tappar tyst varje spec som inleds med en
         kommentar, vilket får raden att se omarkerad ut hos första produkten. */
      {
        label: "Certifikatet gäller till",
        value: "2028-02-08",
        highlight: true,
      },
      { label: "Typ", value: "Central vattenfelsbrytare", highlight: true },
      {
        label: "Vad den mäter",
        /* Manualen anger alla tre: "kontinuerligt mäter vattenflöde,
           vattentrycket och temperaturen". Temperaturen saknades här. */
        value: "Flöde med ultraljud, tryck och temperatur",
        highlight: true,
      },
      { label: "Stänger av", value: "Hela tappvattensystemet", highlight: true },
      { label: "Sensorer krävs", value: "Nej, men kan anslutas", highlight: true },
      /* Ur tillverkarens egen användarmanual SE.40.C.12.01, hämtad 2026-08-06:
         "Efter strömavbrott återgår enheten till samma läge den var i innan
         strömavbrottet" och "Enheten är utrustad med ett vred för manuell
         avstängning vid strömavbrott eller nödssituationer". */
      {
        label: "Vid strömavbrott",
        value: "Ventilen står kvar i sitt läge, vred för manuell stängning",
        highlight: true,
      },
      { label: "Installation", value: "Rörmokare, inkommande ledning" },
      { label: "Anslutning", value: "G20 EuroCone utvändig, båda ändar" },
      { label: "Fungerar utan internet", value: "Ja, helt" },
      { label: "App", value: "MyLK, med förbrukning och notiser" },
      { label: "Max driftstryck", value: "1,0 MPa (10 bar)" },
      /* Vattentemperatur, vikt och mått ur användarmanualens tekniska data,
         SE.40.C.12.01, hämtad 2026-08-06.

         ⚠️ Måttet stod tidigare som 117 × 121 × 82 mm. Det är förpackningens
         mått ur artikellistan på tillverkarens produktsida, inte enhetens.
         Manualen anger höjd 85, bredd 71 och längd 110 mm. */
      { label: "Max vattentemperatur", value: "0,1 till 70 °C" },
      { label: "Mått", value: "85 × 71 × 110 mm" },
      { label: "Vikt", value: "720 g" },
      { label: "RSK-nummer", value: "1882667" },
      { label: "GTIN", value: "7331590060505" },
    ],
    verdict:
      "LK CubicSecure kostar 5 373 kronor, stänger av vattnet till hela huset och är typgodkänd enligt CR 139. Det är den billigaste av de centrala brytarna och den enda med ett godkännande som räcker till februari 2028.\n\n**En gång per dygn stänger den ventilen och mäter trycket.** Det är den mätningen som hittar droppläckaget i röret bakom väggen, där ingen sensor på golvet någonsin kommer att ligga, och den görs oftast nattetid när ingen tappar vatten. Utöver det mäter ultraljudssensorer flödet kontinuerligt och en separat tryckgivare letar efter det ett flödesmått missar. Det är hela skillnaden mot ett vattenlarm, som talar om att golvet redan är blött.\n\n**Skyddet ligger i enheten och inte i molnet.** Appen MyLK ger notiser och förbrukningsstatistik ovanpå, men brytaren gör sitt jobb med routern avstängd och skulle göra det även den dag tillverkaren lade ner tjänsten. Godkännandet är dessutom av den starkare sorten, med beslut om tillverkningskontroll, alltså med löpande övervakning av tillverkarens egenkontroll.\n\nDet som kostar är installationen. Det här är ett ingrepp på inkommande servisledning och kräver rörmokare, och Länsförsäkringar anger 6 000 till 10 000 kronor för arbetet. Läckagesensorer till golvet säljs dessutom separat.\n\nKöp den. Du får det färskaste godkännandet, den enda dygnsvisa tryckmätningen i jämförelsen och ett skydd som står på egna ben, för 3 122 kronor mindre än den andra centrala brytaren.",
  },
  {
    id: "vatette-lackagebrytare",
    name: "Läckagebrytare med kulventil",
    shortName: "Läckagebrytare",
    brand: "Vatette",
    image: productImage(VATTENFELSBRYTARE.slug, "vatette-lackagebrytare"),
    tagline:
      "Uppfyller det nya kökskravet, och snäpps fast för hand på ventilen du redan har.",
    scores: {
      /* Typgodkänd enligt CR 139, C901455, giltigt t.o.m. 2031-04-16 — längst
         av de rankade. Kontrollerat i RISE öppna register 2026-08-06. */
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
      "Typgodkänd enligt CR 139, alltså giltig för kravet på aktivt skydd i kök",
      "Godkännandet gäller till april 2031, längst av produkterna här",
      "Snäpps fast för hand på en befintlig Vatette kulventil eller väggfördelare",
      "Fungerar utan Wi-Fi och app, via kontrollpanelen med schema eller vattentimer",
      "Klarar 70 °C kontinuerligt, alltså även varmvattensidan",
    ],
    cons: [
      "Stänger bara vid den ventil motorn sitter på, inte hela huset",
      "Förutsätter att du redan har Vatette kulventil eller väggfördelare V6",
      "En snarlik Vatette-läckagebrytare säljs 30 kronor dyrare utan att omfattas av samma godkännande, så kontrollera RSK 5215023 i ordern",
      "Nästan lika dyr som en central brytare kostar hos en dyr butik",
    ],
    specs: [
      {
        label: "Typgodkännande",
        value: "C901455, RISE, 2026-04-17",
        highlight: true,
      },
      { label: "Certifikatet gäller till", value: "2031-04-16", highlight: true },
      { label: "Typ", value: "Läckagebrytare", highlight: true },
      { label: "Vad den mäter", value: "Ingenting, stänger på sensorsignal", highlight: true },
      { label: "Stänger av", value: "Den ventil motorn sitter på", highlight: true },
      { label: "Sensorer krävs", value: "Ja, en ingår", highlight: true },
      /* Ur tillverkarens monterings- och bruksanvisning FC650443/5, avsnittet
         VID STRÖMAVBROTT, hämtad 2026-08-06: "Ventilerna som styr vattenflödet
         behåller det läge de befann sig i vid strömavbrottet … kan ventilerna
         öppnas manuellt: Försäkra dig om att motorn är strömlös. Lyft upp och
         vrid det blåmarkerade vredet på motorn." */
      {
        label: "Vid strömavbrott",
        value: "Ventilen står kvar i sitt läge, öppnas manuellt med vred",
        highlight: true,
      },
      { label: "Installation", value: "Snäpps fast för hand, ingen rörmokare" },
      { label: "Fungerar utan internet", value: "Ja, via kontrollpanelen" },
      { label: "App", value: "Vatette Läckagebrytare, Wi-Fi" },
      { label: "Max driftstryck", value: "1,0 MPa (10 bar)" },
      { label: "Max vattentemperatur", value: "70 °C kontinuerligt, 95 °C momentant" },
      /* IP-klass och mått ur samma anvisnings tekniska specifikation. Måttet
         gäller manöverpanelen; motorn sitter på kulventilen. */
      { label: "IP-klass", value: "IP67 på ventilmotorn" },
      { label: "Mått", value: "83 × 83 × 23 mm, manöverpanelen" },
      { label: "RSK-nummer", value: "5215023" },
      { label: "Varianter", value: "Utan kulventil, RSK 5215022, 3 356 kr" },
    ],
    verdict:
      "Vatette Läckagebrytare kostar 3 465 kronor, snäpps fast för hand på en kulventil du redan har och är typgodkänd enligt CR 139. Det är den billigaste vägen till ett skydd som uppfyller det nya kökskravet.\n\n**Sedan 1 januari 2026 ska den vattentäta insatsen i ett kök ha en fuktsensor kopplad till ett typgodkänt skydd.** Ska du renovera kök och vill att det auktoriserade VVS-företaget ska kunna intyga arbetet är det här den enklaste produkten som klarar kravet, och godkännandet räcker till april 2031, längre än något annat här.\n\n**Installationen kräver ingen rörmokare.** Motorn snäpps fast för hand på Vatettes egna kulventiler eller väggfördelare V6, alltså inget ingrepp i ett rör och ingen faktura för arbetstid. Den klarar 70 grader kontinuerligt, så den kan sitta på varmvattensidan, och den går att styra från kontrollpanelen med schema eller vattentimer även utan Wi-Fi.\n\nBegränsningen ska sägas rakt ut: den stänger vid den ventil motorn sitter på, alltså diskmaskinen eller tvättmaskinen. Rörbrottet i badrumsväggen tar den inte, och den förutsätter dessutom att du redan har Vatette-ventiler.\n\nSka du klara kökskravet utan att öppna ett rör är det här köpet. Ska hela huset skyddas räcker den inte, och då börjar de centrala brytarna på 5 373 kronor.",
  },
  {
    id: "vatette-vattenfelsbrytare",
    name: "Vattenfelsbrytare komplett",
    shortName: "Vattenfelsbrytare",
    brand: "Vatette",
    image: productImage(VATTENFELSBRYTARE.slug, "vatette-vattenfelsbrytare"),
    tagline:
      "Inget konto, ingen app och ingen molntjänst som kan läggas ner.",
    scores: {
      /* Typgodkänd enligt CR 139, SC0056-15, giltigt t.o.m. 2027-01-30 — kortast
         kvar av de rankade. Kontrollerat i RISE öppna register 2026-08-06.
         Kvarvarande giltighetstid sänker inte betyget: ett typgodkännande
         förnyas, och produkten är godkänd i dag. */
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
      "Typgodkänd enligt CR 139, med beslut om tillverkningskontroll",
      "Den ena av de två som klarade RISE-provningen 2022, namngiven av Länsförsäkringar",
      "Självlärande övervakning som anpassar sig till hushållets eget mönster",
      "Inga vattendetektorer behövs, och inget konto att skapa",
    ],
    cons: [
      "3 122 kronor dyrare än LK CubicSecure, som skyddar lika mycket",
      "Skyddar fullt ut först efter 7 till 28 dagar, medan den lär sig hushållets mönster",
      "Ingen app, ingen notis, och inget sätt att veta något på distans",
      "Utgående anslutning är klämringskoppling för kopparrör, alltså inte fritt val av rör",
      "Tål 60 °C, lägst av produkterna här",
      "Godkännandet löper ut i januari 2027, så be installatören kontrollera det innan ett intyg skrivs",
    ],
    specs: [
      {
        label: "Typgodkännande",
        value: "SC0056-15, RISE, utgåva 4, 2022-01-31",
        highlight: true,
      },
      { label: "Certifikatet gäller till", value: "2027-01-30", highlight: true },
      { label: "Typ", value: "Central vattenfelsbrytare", highlight: true },
      { label: "Vad den mäter", value: "Flöde och tryck, självlärande", highlight: true },
      { label: "Stänger av", value: "Hela tappvattensystemet", highlight: true },
      { label: "Sensorer krävs", value: "Nej, men kan anslutas", highlight: true },
      /* Ur SINTEF Teknisk Godkjenning nr. 20544, som Vatette själva publicerar
         bland sina produktdokument, hämtad 2026-08-06: "Motorventil forblir i
         samme posisjon ved eventuell strømstans, men ventilen kan åpnes/lukkes
         manuelt."

         ⚠️ Dokumentet är ett norskt godkännande som gick ut 2021 och åberopas
         aldrig som ett giltigt godkännande. Det används här enbart som
         tillverkarens egen tekniska beskrivning av hur ventilen beter sig, och
         det stämmer med de två andra motorstyrda kulventilerna på sidan. */
      {
        label: "Vid strömavbrott",
        value: "Ventilen står kvar i sitt läge, går att öppna och stänga manuellt",
        highlight: true,
      },
      { label: "Installation", value: "Rörmokare, inkommande ledning" },
      /* Samma dokument: "Systemet er fullt operativt etter en innlæringsperiode
         på 7-28 dager." Ingen butik nämner det. */
      { label: "Inlärningstid", value: "7 till 28 dagar innan fullt skydd" },
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
      "Vatette Vattenfelsbrytare kostar 8 495 kronor, skyddar hela huset och har varken app, konto eller molntjänst. Den är den ena av de två som klarade RISE-provningen 2022, och den är fortfarande typgodkänd.\n\n**Övervakningen är självlärande.** Den bygger en bild av hushållets eget vattenmönster och slår larm på det som avviker från just din vardag i stället för på ett fast tröskelvärde, och den upptäcker både droppläckage och flödesläckage utan en enda vattendetektor på golvet. Priset för den finessen är att den behöver lära känna dig först: tillverkarens tekniska dokumentation anger 7 till 28 dagar innan systemet är fullt operativt, så månaden efter installationen är inte månaden att resa bort. Att den inte kan kopplas upp betyder å andra sidan att den inte kan sluta fungera för att en tjänst läggs ner, vilket för en del köpare är hela argumentet.\n\n**Två uppgifter avgör om den passar ditt hus**, och båda står i certifikatet snarare än i butiken. Utgående anslutning är en klämringskoppling Vatette Dy22 för kopparrör, så rörvalet är inte fritt. Och den tål 60 grader, lägre än allt annat här. Fråga din rörmokare om båda innan du beställer.\n\nPriset är det som är svårt att försvara. 8 495 kronor är 3 122 mer än LK CubicSecure, som skyddar lika mycket, har ett godkännande som räcker fyra år längre och dessutom en app. Samma artikelnummer kostade mellan 8 495 och 10 951 kronor hos fyra butiker samma dag, en skillnad på 29 procent, så butiksvalet är en del av priset.\n\nVill du ha ett hus utan ännu en uppkopplad pryl är den värd sina pengar. Vill du bara ha vattnet avstängt när något går sönder gör LK CubicSecure samma jobb för tre tusenlappar mindre.",
  },
  {
    id: "tollco-waterfuse-plugin",
    name: "WaterFuse PlugIn G15",
    shortName: "WaterFuse PlugIn",
    brand: "Tollco",
    image: productImage(VATTENFELSBRYTARE.slug, "tollco-waterfuse-plugin"),
    tagline: "Bryter både vattnet och strömmen till maskinen, för 2 399 kronor.",
    scores: {
      /* Sänkt från 3,0 2026-08-06. Inte typgodkänd enligt CR 139: Tollco har
         tre certifikat i RISE register (0505/01 och C901548 för tråg och
         insatser, C901472 för vattenlarmet) och inget av dem täcker WaterFuse.
         Tollco avgränsar själv sitt CR 139-påstående till "alla våra
         vattenlarm". Tillverkaren anger däremot SINTEF Teknisk Godkjenning,
         alltså provning av ett annat oberoende organ, vilket ger 2,5. */
      typgodkannande: 2.5,
      /* Höjt från 2,0 2026-08-06: bryter enligt tillverkaren även strömmen till
         den inkopplade apparaten, vilket ingen annan produkt här gör. */
      omfattning: 2.5,
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
      "Bryter både vatten och ström till den inkopplade maskinen, vilket ingen annan här gör",
      "Motorventil på ledningen till maskinen, sensorn under den",
      "Provad och godkänd av SINTEF enligt tillverkaren",
      "Larmar med pipsignal på plats",
    ],
    cons: [
      "Inte typgodkänd enligt CR 139, så installationen kan inte intygas mot branschreglerna",
      "Ger ingen försäkringsrabatt, eftersom den inte räknas som godkänd vattenfelsbrytare",
      "En ventil och en sensor, alltså en maskin",
      "Ingen app och ingen notis i grundutförandet",
    ],
    specs: [
      /* Inte "Ej angivet": tabellen växlar den strängen till ett streck, och ett
         streck läser som en lucka i vår research i stället för som det den är.
         Här är frånvaron fastställd positivt i RISE öppna register 2026-08-06.
         Se EJ_ANGIVET i components/product/comparison-table.tsx.

         Kommentaren ligger utanför objektet, se noten hos lk-cubicsecure. */
      {
        label: "Typgodkännande",
        value: "Nej, inte enligt CR 139",
        highlight: true,
      },
      { label: "Certifikatet gäller till", value: "Inget certifikat", highlight: true },
      { label: "Typ", value: "Läckagebrytare", highlight: true },
      { label: "Annan provning", value: "SINTEF Teknisk Godkjenning enligt tillverkaren" },
      { label: "Vad den mäter", value: "Ingenting, stänger på sensorsignal", highlight: true },
      { label: "Stänger av", value: "Ledningen till en maskin", highlight: true },
      { label: "Sensorer krävs", value: "Ja, en ingår", highlight: true },
      /* Enda produkten på sidan där ventilens läge vid strömavbrott inte går
         att belägga. Sökt 2026-08-06 i Tollcos egen dokumentbank, där samtliga
         fjorton artiklar under Läckagebrytare och Läckagebrytare trådlös står
         som "Inga dokument tillgängliga", på tollco.se kategorisida för
         läckage- och vattenbrytare, och på Bauhaus produktsida. Ingen av dem
         anger det. "Ej angivet" växlas av ComparisonTable till ett streck,
         vilket är rätt här: uppgiften är okänd, till skillnad från
         typgodkännandet som är fastställt frånvarande. */
      { label: "Vid strömavbrott", value: "Ej angivet", highlight: true },
      { label: "Installation", value: "Motorventil på tilloppet, behörig fackperson" },
      { label: "Anslutning", value: "G15" },
      { label: "Antal ventiler", value: "1" },
      { label: "App", value: "Nej, pipsignal på plats" },
      { label: "Spänning", value: "230 V" },
      { label: "GTIN", value: "7392832001151" },
    ],
    verdict:
      "För 2 399 kronor får du en motorventil på tilloppet till diskmaskinen och en sensor som ligger under den. Det är det billigaste sättet att gå från att bli varnad till att faktiskt få vattnet avstängt, och skillnaden mellan de två är hela poängen med den här sidan.\n\n**Den bryter strömmen också.** Enheten sitter i vägguttaget och maskinen kopplas in i den, så vid läckage stängs både vattnet och elen till apparaten. Ingen annan produkt här gör det, och det spelar roll: en diskmaskin som fortsätter gå med stängt tillopp pumpar torrt. Tollco anger dessutom att produkten är provad och godkänd av SINTEF, det norska organet för teknisk godkännande.\n\n**Men den är inte typgodkänd enligt CR 139**, och den regeln är det som gäller i Sverige. Tollco har tre godkännanden i RISE register: två för uppsamlingstråg och insatser, ett för bolagets vattenlarm. WaterFuse PlugIn är inte ett av dem. Tollco avgränsar det själva och skriver att alla deras *vattenlarm* är godkända enligt CR 139.\n\nFöljden är konkret. Ska köket renoveras så att ett auktoriserat VVS-företag kan intyga arbetet mot branschreglerna 2026:1 duger den inte, och den ger heller ingen försäkringsrabatt. Grundutförandet larmar dessutom bara där det står, utan notis i telefonen.\n\nSka du skydda en diskmaskin i ett kök du inte ska renovera är det här mest skydd per krona som finns. Ska installationen kunna intygas är Vatette Läckagebrytare 1 066 kronor dyrare och löser problemet.",
  },
  {
    id: "aqara-valve-controller-t1",
    name: "Valve Controller T1",
    shortName: "Valve Controller T1",
    brand: "Aqara",
    image: productImage(VATTENFELSBRYTARE.slug, "aqara-valve-controller-t1"),
    tagline: "Skruvas fast på ventilen du redan har, på några minuter och för 819 kronor.",
    scores: {
      /* Sänkt från 1,5 2026-08-06. Ingen träff på Aqara i RISE öppna register,
         kontrollerat 2026-08-06, och ingen annan oberoende provning för svensk
         marknad angiven av tillverkaren. */
      typgodkannande: 1,
      omfattning: 2,
      /* Sänkt från 4,5 2026-08-06. Monteringen är enklast i jämförelsen, men
         kriteriet väger även vad som händer utan uppkoppling, och den här
         slutar skydda när hubben eller routern går ned: sensorn når enheten
         bara via hubben. Kriteriebeskrivningen fäller det uttryckligen. */
      installation: 3,
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
      "Inte typgodkänd enligt CR 139, så installationen kan inte intygas och rabatten uteblir",
      "Slutar skydda när hubben eller routern går ned, eftersom sensorn bara når enheten den vägen",
      "Kräver både en Aqara-hubb och en separat läckagesensor, båda köps till",
      "Ingen IP-klass, avsedd för inomhusbruk",
    ],
    specs: [
      { label: "Typgodkännande", value: "Nej, inte enligt CR 139", highlight: true },
      { label: "Certifikatet gäller till", value: "Inget certifikat", highlight: true },
      { label: "Typ", value: "Ventilstyrning", highlight: true },
      { label: "Annan provning", value: "Ingen angiven" },
      { label: "Vad den mäter", value: "Ingenting, stänger på sensorsignal", highlight: true },
      { label: "Stänger av", value: "Den ventil den sitter på", highlight: true },
      { label: "Sensorer krävs", value: "Ja, säljs separat", highlight: true },
      /* Enda produkten här som inte hänger på nätspänning: den går på fyra
         AA-batterier. Men larmvägen gör det, eftersom sensorn bara når enheten
         via en Aqara-hubb, som i sin tur sitter i ett uttag. Båda leden är
         belagda på Kjells produktsida, läst 2026-08-06. */
      {
        label: "Vid strömavbrott",
        value: "Batteridriven och opåverkad, men hubben behöver ström",
        highlight: true,
      },
      { label: "Installation", value: "Skruvas på befintligt handtag, några minuter" },
      { label: "Anslutning", value: "DN15, DN20, DN25" },
      { label: "Fungerar utan internet", value: "Nej, hubb krävs" },
      { label: "App", value: "Aqara Home, Zigbee 3.0 och Matter via hubb" },
      { label: "Batteri", value: "4 × AA, medföljer" },
      { label: "Batteritid", value: "Upp till 2 år" },
      /* Ventiltryck och drifttemperatur ur Kjells specifikationsblock,
         läst 2026-08-06. Tryckraden fanns inte på produkten tidigare. */
      { label: "Max driftstryck", value: "1,6 MPa (16 bar)" },
      { label: "Drifttemperatur", value: "−10 till 50 °C" },
      { label: "Mått", value: "93 × 72 × 84 mm" },
      { label: "Vikt", value: "775 g" },
      { label: "Modell", value: "VC-X01D" },
    ],
    verdict:
      "Aqara Valve Controller T1 kostar 819 kronor och skruvas fast på handtaget till en ventil du redan har. Det tar några minuter, kräver ingen rörmokare och inget hål i något rör, och det är den enda automatiska avstängningen här för under tusenlappen.\n\n**Sedan tar likheterna slut.** Den mäter ingenting, så den hittar aldrig ett droppläckage inne i väggen. Den behöver en läckagesensor för att veta att något hänt och en Aqara-hubb för att sensorn ska nå den, och båda köps separat, så 819 kronor blir i praktiken det dubbla. Går hubben eller routern ned står ventilen kvar där den står, alltså skyddar den inte längre.\n\n**Den är inte typgodkänd enligt CR 139**, vilket är kontrollerat i RISE öppna register och inte en gissning. Aqara finns inte där över huvud taget. Följden är att en installation med den varken kan intygas mot branschreglerna eller ge tio procent på villaförsäkringen, och det är hela skälet till att de andra produkterna kostar det de kostar.\n\nBatteridriven ventilstyrning på ett befintligt handtag är dessutom en annan sorts tillförlitlighet än en nätansluten motorventil på ett rör. Fyra AA-batterier räcker i upp till två år, men de tar slut.\n\nKöp den om du redan fyllt hemmet med Aqara och vill kunna stänga vattnet från telefonen. Ska den ersätta en riktig vattenfelsbrytare gör den inte det, och skillnaden syns i försäkringsbrevet.",
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
  /**
   * Produkten har ett giltigt typgodkännande enligt CR 139, kontrollerat i
   * RISE öppna certifikatregister.
   *
   * ⚠️ Hette `publiceratCertifikat` och beskrev om tillverkaren publicerade ett
   * nummer, alltså säljarens dokumentation. Kriteriet gjordes om 2026-08-06 när
   * registret visade sig gå att läsa, men filtret bar kvar den gamla frågan och
   * hette "Publicerat certifikatnummer" i gränssnittet. Grupperingen är
   * densamma, frågan är det inte: den gäller nu varan.
   */
  typgodkand: boolean;
  /** Skyddet fungerar utan internetuppkoppling. */
  utanInternet: boolean;
  /** Går att sätta dit utan att öppna ett rör. */
  utanRormokare: boolean;
};

export const VATTENFELSBRYTARE_CAPABILITIES: BreakerCapability[] = [
  { id: "lk-cubicsecure", typ: "central", typgodkand: true, utanInternet: true, utanRormokare: false },
  { id: "vatette-lackagebrytare", typ: "lokal", typgodkand: true, utanInternet: true, utanRormokare: true },
  { id: "vatette-vattenfelsbrytare", typ: "central", typgodkand: true, utanInternet: true, utanRormokare: false },
  { id: "tollco-waterfuse-plugin", typ: "lokal", typgodkand: false, utanInternet: true, utanRormokare: false },
  { id: "aqara-valve-controller-t1", typ: "lokal", typgodkand: false, utanInternet: false, utanRormokare: true },
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
    key: "typgodkand",
    label: "Typgodkänd enligt CR 139",
    ids: VATTENFELSBRYTARE_CAPABILITIES.filter((c) => c.typgodkand).map((c) => c.id),
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
      "Utgången. Grohe skriver på sin egen produktsida, två gånger, att produkten inte längre är tillgänglig, och de två svenska butiker som anger status har den som slut respektive inkommande. Vi rankar inte produkter som tillverkaren själv har avvecklat. Hittar du den kvar på en hylla är den en fullvärdig central brytare som mäter flöde, tryck och temperatur, och den är typgodkänd enligt CR 139: certifikat C900767 står på SenseGuard GmbH och gäller till 23 mars 2028. Den enda begränsningen i godkännandet är att den bara får anslutas på inkommande tappkallvattenledning. Produktnummer 22500LN0, RSK 5216552.",
    approxPrice: 8920,
    merchant: "Golvshop",
    merchantUrl:
      "https://www.golvshop.se/bygg/vvs/vattensakerhet/vattenfelsbrytare/vattenfelsbrytare-grohe-sense-guard-22500/p-857495",
  },
  {
    brand: "Tollco",
    name: "WaterFuse Villa Control",
    reason:
      "Den andra av de två som klarade RISE-provningen 2022, och den finns inte i handeln. Tollcos egen produktsida leder numera till en kategori som heter Läckage- och vattenbrytare och som inte innehåller den. Deras webbshop och Rinkaby Rörs Tollco-hylla bär läckagebrytare och vattenlarm i stället. St George har kvar en sida med rubriken UTGÅTT. Tollco har i dag tre certifikat i RISE register och inget av dem gäller Villa Control, så godkännandet från 2022 finns inte kvar. Att den ena av de två godkända inte går att köpa fyra år senare säger något om hur ung marknaden är.",
    approxPrice: 7995,
  },
  {
    brand: "Fell Technology",
    name: "Waterguard+ Wireless och Wireless Pro",
    reason:
      "Typgodkänd läckagebrytare enligt CR 139, certifikat C900825 som gäller till 27 maj 2029, med motoriserad kulventil eller magnetventil, sensor och centralenhet med Wi-Fi eller 4G. Den kan alltså det Vatettes läckagebrytare kan och når dessutom över mobilnätet, vilket är intressant i ett fritidshus utan bredband. Den har numera en svensk väg in i handeln: Tollco för hela serien under egna artikelnummer, från kulventil och ställdon till sensorer och en 4G-box. Vi rankar den ändå inte, eftersom ingen svensk butik publicerar ett pris på den, och ett pris vi inte kan läsa på en butiks egen sida är samma villkor som fäller Uponor nedan.",
  },
  {
    brand: "Brass & Beyond",
    name: "Aqualarm PowerStop",
    reason:
      "Typgodkänd läckagebrytare enligt CR 139, certifikat C901015 som gäller till 12 september 2029. Enheten består av en styrenhet, en motorventil i DN15 med invändig G15-anslutning och en sensorkabel, alltså samma princip som Tollcos WaterFuse PlugIn men med ett godkännande som räknas mot branschreglerna. Även den saknar en svensk butikssida med pris hos oss, och den står här för att en köpare som söker ett certifierat alternativ ska veta att det finns fler än de tre vi rankar.",
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
      "Sex produkter är typgodkända enligt CR 139, och tre av dem rankas här. LK CubicSecure har C900737 som gäller till 8 februari 2028, Vatette Vattenfelsbrytare har SC0056-15 till 30 januari 2027 och Vatette Läckagebrytare har C901455 till 16 april 2031. Utanför vår ranking finns SenseGuard Vattenfelsbrytare med C900767 till 23 mars 2028, alltså den som säljs som Grohe Sense Guard, samt läckagebrytarna Waterguard+ från Fell Technology med C900825 och Aqualarm PowerStop med C901015. Listan går att kontrollera själv: RISE certifikatregister på cert.ri.se är öppet och sökbart på både nummer och produktnamn.",
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
      "Det beror på ventilen, och svaret står i manualen snarare än i butiken. De tre typgodkända produkterna här använder alla motorstyrda kulventiler som står kvar i det läge de befann sig i, och alla tre går att vrida för hand när motorn är strömlös: LK CubicSecure har ett vred på ovansidan, och Vatettes båda brytare öppnas och stängs manuellt på motorn. Uponors Waterguard gör tvärtom, med en solenoidventil som är stängd vid strömavbrott och en nödöppning som drivs av ett 9 V-batteri. Aqara Valve Controller T1 går på batteri och påverkas därför inte själv, men hubben som sensorn larmar genom sitter i ett vägguttag. Ingendera lösningen är fel, men skillnaden avgör om du blir utan vatten eller utan skydd när strömmen går.",
  },
  {
    question: "Vilken vattenfelsbrytare är bäst 2026?",
    answer:
      "LK CubicSecure, om du ska skydda ett helt hus. Den har det färskaste typgodkännandet, den enda dygnsvisa tryckmätningen som hittar riktigt små droppläckage, den fungerar utan internet och den är billigast av de centrala brytarna. Ska du bara uppfylla kravet på aktivt skydd i ett kök som renoveras är Vatette Läckagebrytare rätt köp för mindre än halva pengen, förutsatt att du har Vatette kulventiler sedan tidigare.",
  },
  {
    question: "Var sitter en vattenfelsbrytare?",
    answer:
      "På den inkommande servisledningen, alltså där vattnet kommer in i huset, normalt efter huvudavstängningen och vattenmätaren. Det är därför den kräver rörmokare: ledningen måste öppnas. En läckagebrytare sitter i stället på tilloppet till den maskin den ska skydda, eller snäpps fast på en befintlig kulventil, och är därför ett betydligt mindre ingrepp. Byggmåttet spelar roll i ett trångt utrymme, och där skiljer det ordentligt: LK anger 85 × 71 millimeter och 110 i längd, mot Vatettes 175 × 195 × 115.",
  },
  {
    question: "Räcker ett vattenlarm i stället?",
    answer:
      "Nej, om målet är att stoppa skadan. Ett vattenlarm för ett par hundra kronor talar om att vatten runnit ut, men det stänger ingenting. Är du hemma och hör det vinner du de minuter som avgör. Är du bortrest larmar det i ett tomt hus, eller skickar en notis du inte kan göra något åt. Det är också därför försäkringsbolagen ger rabatt för en vattenfelsbrytare men inte för ett larm. Har du redan larm är de fortfarande värda att behålla: de flesta brytare kan ta emot signal från en sensor och stänga av på den.",
  },
  {
    question: "Hur vet jag om en produkt verkligen är typgodkänd?",
    answer:
      "Slå upp den själv. RISE certifikatregister ligger öppet på cert.ri.se, går att söka på produktnamn, certifikatnummer eller tillverkare, och visar både vad godkännandet omfattar och vilket datum det löper ut. Det tar under en minut och är säkrare än att fråga i butiken, eftersom ordet godkänd används om annat än typgodkännande. Kontrollera samtidigt att godkännandet gäller just den artikel du köper: Vatettes certifikat namnger fyra artiklar med RSK-nummer, och det finns snarlika produkter i handeln som inte står med. Titta också på slutdatumet, för ett typgodkännande gäller en bestämd tid och ett av dem i den här jämförelsen går ut i januari 2027.",
  },
  {
    question: "Vad kostar samma vattenfelsbrytare hos olika butiker?",
    answer:
      "Betydligt mer än man tror. Samma artikelnummer på Vatette Vattenfelsbrytare kostade mellan 8 495 och 10 951 kronor hos fyra butiker samma dag, en skillnad på 2 456 kronor eller 29 procent. LK CubicSecure låg mellan 5 373 och 6 495, alltså 21 procent. Kategorin säljs av rörgrossister och byggvaruhus som prissätter helt olika, och ingen prisjämförare täcker dem alla. Kontrollera minst tre butiker innan du beställer, det är den enklaste tusenlappen på hela köpet.",
  },
];
