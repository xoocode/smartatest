import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { FONSTERLARM } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /fonsterlarm.
 *
 * Systersida till /dorr-och-fonstersensor. Här ligger det fristående
 * sirenlarmet, alltså dosan som tjuter själv utan app, hubb eller konto.
 * Magnetkontakten som rapporterar till ett smart hem ligger på systersidan.
 *
 * Priser och lagerstatus lästa hos butikerna på PRICE_CHECKED.
 * Specifikationerna hos Nedis egna svenska produktsidor där de finns, annars
 * hos butiken. Se .agent/research/fonsterlarm.md.
 *
 * ## ⚠️ Omfördelningen avgör förstaplatsen på den här sidan
 *
 * `montering` väger 15 och saknas för **Luxorparts och eStore**. Ingen av dem
 * publicerar måtten: Kjells specblock har dem inte, Luxorparts manual är en
 * inskannad bild utan textlager, och eStore anger bara vikten 35 gram. Tre
 * modaliteter prövade, se researchfilen.
 *
 * Sidan kör **förvalet** `redistributeMissing: true`. Räknat båda vägarna:
 *
 *   med omfördelning   Luxorparts 9,00   Clas Ohlson 7,50
 *   utan               Luxorparts 7,65   Clas Ohlson 7,50   → nästan jämnt
 *
 * Utan omfördelning krymper försprånget till en tiondel, och en enda
 * poängjustering någon annanstans hade vänt sidan. Förvalet ger rätt utfall
 * här: Luxorparts vinner de tre tyngsta kriterierna med 75 av 100 viktpoäng,
 * och att sätta noll för ett mått tillverkaren inte publicerat är precis det
 * avdrag `pnpm check:avdrag` finns för att fånga. Kostnaden står utskriven i
 * metodrutan, som sajtens regel säger. **Räkna om ordningen om måtten senare
 * fastställs.**
 *
 * ## Priset per fönster är inte styckpriset
 *
 * Tre av sju levereras utan batterier, och Luxorparts fyrpack kräver åtta AAA.
 * `Pris per bevakad öppning` bär därför den faktiska kostnaden per fönster
 * inklusive celler, inte hyllpriset. Det flyttar Luxorparts från 75 till
 * omkring 92 kronor och SkyddsExperten från 59 till omkring 84.
 *
 * ## Nedis-familjen är tre produkter och en enda skillnad
 *
 * ALRMD20WT, ALRMGBD20WT och ALRMD30WT ligger alla på 85 dB. Det som skiljer
 * dem är utlösaren och avlarmningen, inte ljudet. Det är sidans tydligaste
 * illustration av att pengarna i den här kategorin inte köper decibel.
 *
 * ## Priser och länkmål
 *
 * ⚠️ **Samma Nedis-larm kostar 79 kronor hos Teknikdelar och 130 hos
 * Teknikproffset.** ALRMD30WT länkas därför till Teknikdelar, som dessutom bär
 * 5 procent mot Teknikproffsets 2. Kontrollera båda vid varje prisrunda.
 *
 * ⚠️ Clas Ohlson och SkyddsExperten saknar affiliateprogram vi kartlagt. De
 * rankas ändå: att utelämna sidans näst bästa larm och dess billigaste för att
 * de inte betalar är precis vad konkurrenterna gör.
 */

export const PRICE_CHECKED = "2026-08-07";

const SEEDS: ProductSeed[] = [
  {
    id: "luxorparts-mc-02-4-pack",
    brand: "Luxorparts",
    name: "Trådlöst fönster- och dörrlarm 4-pack",
    shortName: "Fönster- och dörrlarm",
    image: productImage(FONSTERLARM.slug, "luxorparts-mc-02-4-pack"),
    tagline:
      "130 decibel i 30 sekunder och en fjärrkontroll, till fyra fönster för omkring 92 kronor styck.",
    scores: {
      /* 130 dB, delat högst i fältet med Clas Ohlson. */
      ljudniva: 5,
      /* 299 kr för fyra plus åtta AAA som säljs separat, alltså omkring 92 kr
         per fönster. Dyrare per styck än eStore men med 130 dB och
         fjärrkontroll i priset. */
      prisperoppning: 4.5,
      /* Enda med fjärrkontroll. Knappen sitter alltså inte på larmet. */
      avlarmning: 5,
      /* Utelämnat: varken Kjell, tillverkaren eller manualen publicerar
         måtten. Se filhuvudet. */
      /* Åtta AAA säljs separat, vilket är fältets sämsta batteriläge. */
      batteri: 2,
    },
    price: 299,
    oldPrice: 399.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/larmsystem/hemlarm/inbrottslarm/luxorparts-tradlost-fonster-och-dorrlarm-4-pack-p51448",
    userRating: { value: 4.5, count: 117, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst när flera fönster ska larmas",
    pros: [
      "130 decibel i 30 sekunder, delat högst i jämförelsen och hörbart genom en stängd dörr",
      "Fjärrkontroll med 15 meters räckvidd, så du larmar av innan du öppnar i stället för att famla medan sirenen går",
      "Fyra larm i förpackningen, alltså omkring 92 kronor per fönster med batterier inräknade",
      "117 personer har gett den 4,5 av 5, vilket är det bredaste kundunderlaget i hela jämförelsen",
    ],
    cons: [
      "Kräver åtta AAA-batterier som säljs separat, vilket lägger omkring 70 kronor på priset",
      "Varken Kjell eller tillverkaren publicerar måtten, så du vet inte om dosan får plats på en smal båge",
      "En enda fjärrkontroll till fyra larm, och flera köpare skriver att de gärna hade betalat för en till",
    ],
    specs: [
      { label: "Pris", value: "299 kr", highlight: true },
      { label: "Ljudnivå", value: "130 dB", highlight: true },
      { label: "Pris per bevakad öppning", value: "Cirka 92 kr", highlight: true },
      { label: "Avlarmning", value: "Fjärrkontroll", highlight: true },
      { label: "Utlöses av", value: "Magnetkontakt", highlight: true },
      { label: "Batterityp", value: "8 × AAA och 1 × CR2032", highlight: true },
      { label: "Batterier medföljer", value: "Nej, utom CR2032 till fjärrkontrollen" },
      /* Streck, inte utelämnad rad. ComparisonTable bygger radlistan ur
         FÖRSTA produktens markerade specar, så en rad som saknas här
         försvinner tyst för alla tretton. Se scripts/check-tackning.mjs.
         Måtten publiceras varken av Kjell eller av tillverkaren, och
         manualen är en inskannad bild utan textlager. */
      { label: "Mått larmenhet", value: "–", highlight: true },
      { label: "Larmtid", value: "30 s" },
      { label: "Antal i förpackningen", value: "4 larm och 1 fjärrkontroll" },
      { label: "Räckvidd fjärrkontroll", value: "15 m" },
    ],
    verdict:
      "Luxorparts fyrpack kostar 299 kronor och är det enda larmet här som är byggt för att sitta på flera fönster.\n\nDet mesta i den här kategorin säljs styckvis, och den som ska säkra en källarvåning köper då fyra separata dosor med var sin strömbrytare. Här ingår fyra larm och en fjärrkontroll som styr dem alla. Räknat per fönster, med de åtta AAA-batterierna som säljs separat inräknade, landar det på omkring 92 kronor. Det är mer än eStores 69 och mindre än Clas Ohlsons 120.\n\nOch du får det som faktiskt betyder något. 130 decibel i 30 sekunder är delat högst i jämförelsen och en helt annan sak än de 85 decibel som hela Nedis-familjen ligger på. Fjärrkontrollen med 15 meters räckvidd flyttar dessutom av-knappen ur rummet, vilket är skillnaden mellan ett larm och en larmdosa som vem som helst kan slå av på vägen in.\n\nDet som drar ner är batterierna och tystnaden om måtten. Åtta AAA lägger omkring 70 kronor på priset, och varken Kjell eller tillverkaren skriver ut hur stor dosan är. Ska bara ett fönster larmas är fyrpacket fel köp, och då är Clas Ohlsons enskilda larm lika högljutt för 120 kronor.",
  },
  {
    id: "clas-ohlson-dorrlarm-passagelarm",
    brand: "Clas Ohlson",
    name: "Dörrlarm och passagelarm 36-8496",
    shortName: "Dörrlarm 36-8496",
    image: productImage(FONSTERLARM.slug, "clas-ohlson-dorrlarm-passagelarm"),
    tagline:
      "Cirka 130 decibel som butiken själv kallar smärtsamt högt, och en lägesväljare som gör om det till dörrklocka.",
    scores: {
      /* Cirka 130 dB enligt butikens egen text. */
      ljudniva: 5,
      /* 119,90 kr med batterier, alltså dyrast per fönster i fältet. */
      prisperoppning: 3,
      /* Lägesväljare med fem funktioner, men ingen kod och ingen
         fjärrkontroll. Bättre än en ren strömbrytare, sämre än båda. */
      avlarmning: 3,
      /* Larmenhet 65 × 34 × 17 mm, magnet 36 × 10 × 14. Kompakt. */
      montering: 4,
      /* Tre LR44 medföljer. Knappceller, alltså kort livslängd. */
      batteri: 3,
    },
    price: 119.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Dorrlarm---passagelarm-med-magnetkontakt/p/36-8496",
    userRating: { value: 4, count: 132, scale: 5, checkedAt: PRICE_CHECKED },
    award: "premium",
    superlative: "Högst ljud av de enskilda larmen",
    pros: [
      "Cirka 130 decibel, alltså lika högt som sidans vinnare men i en enda dosa du kan köpa styckvis",
      "Fem funktioner, så samma enhet kan larma som siren eller plinga som dörrklocka när någon kommer",
      "Tre LR44-batterier och monteringstejp ligger i förpackningen, alltså inget att köpa till",
      "132 kundomdömen ger 4,0 av 5, näst bredaste underlaget i jämförelsen",
    ],
    cons: [
      "119,90 kronor för ett larm är dyrast per bevakad öppning i hela jämförelsen",
      "Bara en lägesväljare, alltså varken kod eller fjärrkontroll som hindrar någon från att slå av den",
      "LR44-knappceller håller kortare än en CR2032 och sitter i tre för att räcka till sirenen",
    ],
    specs: [
      { label: "Pris", value: "119,90 kr", highlight: true },
      { label: "Ljudnivå", value: "Cirka 130 dB", highlight: true },
      { label: "Pris per bevakad öppning", value: "119,90 kr", highlight: true },
      { label: "Avlarmning", value: "Lägesväljare, fem funktioner", highlight: true },
      { label: "Utlöses av", value: "Magnetkontakt", highlight: true },
      { label: "Batterityp", value: "3 × LR44", highlight: true },
      { label: "Batterier medföljer", value: "Ja" },
      { label: "Mått larmenhet", value: "65 × 34 × 17 mm", highlight: true },
      { label: "Mått magnet", value: "36 × 10 × 14 mm" },
      { label: "Antal i förpackningen", value: "1 larm" },
    ],
    verdict:
      "Clas Ohlsons dörrlarm kostar 119,90 kronor och är det högljuddaste enskilda larmet i jämförelsen.\n\nButiken skriver själv att sirenen ligger på cirka 130 decibel och kallar det en ljudstyrka som är smärtsamt hög. Det är samma nivå som Luxorparts fyrpack och 45 decibel över hela Nedis-familjen, vilket på en logaritmisk skala är skillnaden mellan ett ljud som väcker huset och ett du kan sova igenom.\n\nDen kan också vara något annat än ett larm. Lägesväljaren har fem funktioner, så samma dosa kan ställas om till en ding-dong-signal och användas som dörrvakt i en butik eller för att höra när barnen går ut. Larmenheten är 65 × 34 × 17 millimeter, alltså kompakt nog för en fönsterbåge, och tre LR44-celler ligger i förpackningen.\n\nSvagheten är att den bara har en lägesväljare. Det finns varken kod eller fjärrkontroll, så den som tagit sig in kan slå av den lika enkelt som du. Och 119,90 kronor för ett fönster är dyrast i jämförelsen. Ska fler än två fönster larmas är Luxorparts fyrpack billigare, lika högljutt och har en av-knapp som inte sitter på dosan.",
  },
  {
    id: "nedis-alrmd20wt",
    brand: "Nedis",
    name: "Dörr- och fönsterlarm ALRMD20WT",
    shortName: "ALRMD20WT",
    image: productImage(FONSTERLARM.slug, "nedis-alrmd20wt"),
    tagline:
      "Åtta millimeter tjock med batterierna i lådan, men sirenen ligger på 85 decibel.",
    scores: {
      /* 85 dB, lägst i fältet tillsammans med de två andra Nedis. */
      ljudniva: 2,
      /* 85 kr med batterier, allt inkluderat. */
      prisperoppning: 4,
      /* Enkel på- och avknapp. */
      avlarmning: 2,
      /* 76 × 8 × 76 mm och 41 g, alltså fältets tunnaste. */
      montering: 5,
      /* Två CR2032 medföljer, fältets mest praktiska cell. */
      batteri: 4.5,
    },
    price: 85,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Teknikproffset",
    merchantUrl:
      "https://www.teknikproffset.se/hem-hushall-tradgard/larm-sakerhet/rorelsesensorer/tunt-dorr-fonsterlarm-med-magnetisk-sensor-batterier-ingar",
    award: "editor",
    superlative: "Tunnast, och batterier ingår",
    pros: [
      "Åtta millimeter tjock och 41 gram, alltså den enda här som knappt syns på en smal fönsterbåge",
      "Två CR2032-celler medföljer, och det är den cell som håller längst och finns i varje mataffär",
      "85 kronor är allt du betalar, till skillnad från de larm som kräver batterier du köper separat",
      "Fästs med dubbelhäftande tejp utan verktyg, och tillverkaren publicerar hela specifikationen",
    ],
    cons: [
      "85 decibel är lägst i jämförelsen, ungefär en dammsugare, och 45 dB under sidans vinnare",
      "Bara en på- och avknapp på sidan, som vem som helst kan trycka på",
      "Rapporterar ingenting och lyser inte, så du får aldrig veta att den larmat om du inte var hemma",
    ],
    specs: [
      { label: "Pris", value: "85 kr", highlight: true },
      { label: "Ljudnivå", value: "85 dB", highlight: true },
      { label: "Pris per bevakad öppning", value: "85 kr", highlight: true },
      { label: "Avlarmning", value: "På- och avknapp", highlight: true },
      { label: "Utlöses av", value: "Magnetkontakt", highlight: true },
      { label: "Batterityp", value: "2 × CR2032", highlight: true },
      { label: "Batterier medföljer", value: "Ja" },
      { label: "Mått larmenhet", value: "76 × 8 × 76 mm", highlight: true },
      { label: "Vikt", value: "41 g" },
      { label: "Material", value: "ABS" },
    ],
    verdict:
      "Nedis ALRMD20WT kostar 85 kronor och är det larm som märks minst på fönstret.\n\nÅtta millimeter är tunnare än en tumme och 41 gram är knappt något alls. På en smal fönsterbåge, där hakar och handtag redan tar plats, är det skillnaden mellan ett larm du ser varje dag och ett du glömmer bort. Nedis publicerar dessutom hela specifikationen på sin egen svenska sida, vilket ingen annan tillverkare i fältet gör.\n\nDe två CR2032-cellerna ligger i förpackningen, och det är den bästa cellen i jämförelsen: den håller längst i den här sortens konstruktion och finns i varje mataffär. Priset på 85 kronor är därmed hela kostnaden, till skillnad från Luxorparts och SkyddsExperten där batterierna tillkommer.\n\nLjudet är problemet. 85 decibel är fältets lägsta, ungefär en dammsugare på en meters håll, och 45 decibel under Clas Ohlson och Luxorparts. Som skrämsel mot en inbrottstjuv är det tveksamt. Som en signal om att altandörren står öppen, eller som något som väcker dig i en husvagn, räcker det gott. Köp den till det, inte till skalskydd.",
  },
  {
    id: "estore-fonster-dorrlarm-90db",
    brand: "eStore",
    name: "Kompakt fönster- och dörrlarm 90 dB",
    shortName: "Fönster- och dörrlarm",
    image: productImage(FONSTERLARM.slug, "estore-fonster-dorrlarm-90db"),
    tagline:
      "69 kronor med batterier och tejp i förpackningen, alltså billigaste vägen till ett larmat fönster.",
    scores: {
      /* 90 dB. */
      ljudniva: 2.5,
      /* 69 kr med batterier, billigast per fönster i hela fältet. */
      prisperoppning: 5,
      /* Enkel ON/OFF-switch. */
      avlarmning: 2,
      /* Utelämnat: bara vikten publiceras, inga mått. Se filhuvudet. */
      /* Tre LR44 medföljer. */
      batteri: 3,
    },
    price: 69,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "eStore",
    merchantUrl:
      "https://estore.nu/sv/fonster-och-dorrlarm/2590-kompakt-och-lattmonterat-fonster-d-rr-larm-med-90-db.html",
    award: "budget",
    superlative: "Billigast med batterier i lådan",
    pros: [
      "69 kronor med tre LR44-celler och monteringstejp i förpackningen, alltså inget att köpa till",
      "90 decibel, vilket är fem över Nedis-familjen och det högsta i den billigaste tredjedelen",
      "35 gram och beskriven som kompakt, så den tynger inte en tejpad infästning",
      "Enkel av- och påknapp gör att den går att flytta mellan husvagnen och hemmet utan omprogrammering",
    ],
    cons: [
      "90 decibel är fortfarande långt under de 130 som sidans två högljuddaste ger",
      "Varken butiken eller tillverkaren publicerar måtten, bara vikten",
      "Tre LR44-knappceller håller kort, och det finns ingen indikering när de börjar ta slut",
    ],
    specs: [
      { label: "Pris", value: "69 kr", highlight: true },
      { label: "Ljudnivå", value: "90 dB", highlight: true },
      { label: "Pris per bevakad öppning", value: "69 kr", highlight: true },
      { label: "Avlarmning", value: "På- och avknapp", highlight: true },
      { label: "Utlöses av", value: "Magnetkontakt", highlight: true },
      { label: "Batterityp", value: "3 × LR44", highlight: true },
      { label: "Batterier medföljer", value: "Ja" },
      /* Streck, se kommentaren hos Luxorparts. eStore publicerar bara vikten. */
      { label: "Mått larmenhet", value: "–", highlight: true },
      { label: "Vikt", value: "35 g" },
      { label: "Antal i förpackningen", value: "1 larm" },
    ],
    verdict:
      "eStores fönster- och dörrlarm kostar 69 kronor och är det billigaste sättet att larma ett fönster som finns i jämförelsen.\n\nDet viktiga är att 69 kronor faktiskt är hela summan. Tre LR44-celler och monteringstejp ligger i förpackningen, medan SkyddsExpertens billigare larm på 59 kronor kräver två AAA du köper själv och därmed landar högre. Räknat per bevakad öppning är det här alltså sidans lägsta kostnad.\n\n90 decibel är inte mycket, men det är fem över hela Nedis-familjen och det högsta i den billiga tredjedelen. Larmet utlöses när de två delarna separeras och stängs av med en enkel knapp på sidan.\n\nDen enkla knappen är också invändningen. Den som tagit sig in genom fönstret kan trycka på den, och till skillnad från Nedis kodlåsvariant finns ingenting som hindrar det. Butiken publicerar dessutom bara vikten och inga mått, så du får inte veta om dosan får plats innan den ligger på bordet. Som ett billigt sätt att veta att ett fönster öppnats fungerar den. Som skalskydd gör den det inte.",
  },
  {
    id: "nedis-alrmgbd20wt",
    brand: "Nedis",
    name: "Dörr- och fönsterlarm med glaskrossensor ALRMGBD20WT",
    shortName: "ALRMGBD20WT",
    image: productImage(FONSTERLARM.slug, "nedis-alrmgbd20wt"),
    tagline:
      "Larmar både när fönstret öppnas och när rutan krossas, för tjugo kronor mer än magnetvarianten.",
    scores: {
      /* 85 dB, samma som resten av Nedis-familjen. */
      ljudniva: 2,
      /* 105 kr med batterier. */
      prisperoppning: 3.5,
      /* Enkel på- och avknapp. */
      avlarmning: 2,
      /* 76 × 9 × 76 mm och 45 g, alltså en millimeter tjockare än
         magnetvarianten. */
      montering: 4.5,
      /* Två CR2032 medföljer. */
      batteri: 4.5,
    },
    price: 105,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Teknikproffset",
    merchantUrl:
      "https://www.teknikproffset.se/hem-hushall-tradgard/larm-sakerhet/rorelsesensorer/tunn-glaskrossdetektor-med-larm-for-dorrar-och-fonster-inbyggd",
    superlative: "Larmar även om rutan krossas",
    pros: [
      "Reagerar på två saker: att fönstret öppnas och att glaset krossas, vilket ingen annan här gör",
      "Glaskrossensorn larmar innan någon tagit sig in, till skillnad från en ren magnetkontakt",
      "Nio millimeter tjock och 45 gram, alltså nästan lika diskret som Nedis magnetvariant",
      "Två CR2032-celler medföljer, samma praktiska cell som deras enklare modell",
    ],
    cons: [
      "85 decibel, alltså samma svaga siren som resten av Nedis-familjen",
      "Tjugo kronor dyrare än magnetvarianten utan att låta högre eller sitta smidigare",
      "Bara en på- och avknapp, som den som krossat rutan kan trycka på",
    ],
    specs: [
      { label: "Pris", value: "105 kr", highlight: true },
      { label: "Ljudnivå", value: "85 dB", highlight: true },
      { label: "Pris per bevakad öppning", value: "105 kr", highlight: true },
      { label: "Avlarmning", value: "På- och avknapp", highlight: true },
      { label: "Utlöses av", value: "Magnetkontakt och glaskross", highlight: true },
      { label: "Batterityp", value: "2 × CR2032", highlight: true },
      { label: "Batterier medföljer", value: "Ja" },
      { label: "Mått larmenhet", value: "76 × 9 × 76 mm", highlight: true },
      { label: "Vikt", value: "45 g" },
      { label: "Material", value: "ABS" },
    ],
    verdict:
      "Nedis ALRMGBD20WT kostar 105 kronor och är det enda larmet i jämförelsen som reagerar på två olika saker.\n\nEn vanlig magnetkontakt larmar när fönstret öppnas. Krossar någon rutan och kliver in genom hålet händer ingenting, eftersom kontakten aldrig bröts. Den här dosan lyssnar också efter ljudet av krossat glas, och larmar alltså i det ögonblick rutan går sönder i stället för flera sekunder senare.\n\nDen är i övrigt Nedis tunna larm med en millimeter påbyggt: 76 × 9 × 76 millimeter, 45 gram, två CR2032 i förpackningen. Tjugo kronor skiljer den från magnetvarianten, och det är hela priset för den extra utlösaren.\n\nMen sirenen är densamma, 85 decibel, alltså fältets lägsta. Det är produktens motsägelse: den upptäcker inbrottet tidigare än något annat larm här och gör sedan minst väsen av sig om det. Vill du ha tidig upptäckt är den värd tjugolappen. Vill du att någon ska höra det finns ingenting under 130 decibel som duger.",
  },
  {
    id: "skyddsexperten-dorr-och-fonsterlarm",
    brand: "SkyddsExperten",
    name: "Dörr- och fönsterlarm",
    shortName: "Dörr- och fönsterlarm",
    image: productImage(FONSTERLARM.slug, "skyddsexperten-dorr-och-fonsterlarm"),
    tagline:
      "59 kronor på hyllan och 95 till 100 decibel, men de två AAA-batterierna får du köpa själv.",
    scores: {
      /* 95 till 100 dB enligt butikens egen text. */
      ljudniva: 3,
      /* 59 kr plus två AAA, alltså omkring 84 kr per fönster. */
      prisperoppning: 4,
      /* Enkel på- och avströmbrytare på huvudenheten. */
      avlarmning: 2,
      /* Huvudenhet 93 × 31 mm, magnetkontakt 50 × 13 mm. */
      montering: 3,
      /* Två AAA medföljer inte. */
      batteri: 2,
    },
    price: 59,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "SkyddsExperten",
    merchantUrl:
      "https://www.skyddsexperten.se/hem-tradgard/larm-overvakning/dorr-och-fonsterlarm",
    superlative: "Lägsta hyllpriset i jämförelsen",
    pros: [
      "59 kronor är lägsta hyllpriset i jämförelsen, och du kan larma ett extra fönster för nästan ingenting",
      "95 till 100 decibel är tio över Nedis-familjen och det näst högsta i den billiga halvan",
      "Går på AAA-batterier, som är billigare per byte och håller längre än knappceller",
      "Marknadsförs för husvagn och husbil, och formatet passar den användningen",
    ],
    cons: [
      "De två AAA-batterierna medföljer inte, så den verkliga kostnaden är närmare 84 kronor",
      "Bara en på- och avströmbrytare på huvudenheten, utan kod eller fjärrkontroll",
      "Inga kundomdömen alls hos butiken, till skillnad från Clas Ohlson och Luxorparts som har över hundra var",
    ],
    specs: [
      { label: "Pris", value: "59 kr", highlight: true },
      { label: "Ljudnivå", value: "95 till 100 dB", highlight: true },
      { label: "Pris per bevakad öppning", value: "Cirka 84 kr", highlight: true },
      { label: "Avlarmning", value: "På- och avströmbrytare", highlight: true },
      { label: "Utlöses av", value: "Magnetkontakt", highlight: true },
      { label: "Batterityp", value: "2 × AAA", highlight: true },
      { label: "Batterier medföljer", value: "Nej" },
      { label: "Mått larmenhet", value: "93 × 31 mm", highlight: true },
      { label: "Mått magnet", value: "50 × 13 mm" },
      { label: "Material", value: "Plast" },
    ],
    verdict:
      "SkyddsExpertens dörr- och fönsterlarm kostar 59 kronor och har jämförelsens lägsta hyllpris.\n\nHyllpriset är dock inte priset. De två AAA-batterierna medföljer inte, och med dem inräknade landar larmet på omkring 84 kronor, alltså mer än eStores 69 där allt ligger i lådan. Det är värt att veta innan man jämför i en pristabell.\n\nI gengäld är AAA en bättre cell än de knappceller de billigare konkurrenterna använder: billigare per byte och längre livslängd. Ljudnivån anges till 95 till 100 decibel, vilket är tio över hela Nedis-familjen och det näst högsta i den billiga halvan av fältet. Huvudenheten mäter 93 × 31 millimeter och magnetkontakten 50 × 13.\n\nTvå saker talar emot. Larmet slås av med en enkel strömbrytare på huvudenheten, alltså samma svaghet som de flesta här. Och butiken har inte ett enda kundomdöme på produkten, medan Clas Ohlson och Luxorparts har 132 respektive 117. Det gör den svårare att lita på än talen antyder. Som ett extra larm till husvagnen är den ändå prisvärd.",
  },
  {
    id: "nedis-alrmd30wt",
    brand: "Nedis",
    name: "Dörr- och fönsterlarm med knappsats ALRMD30WT",
    shortName: "ALRMD30WT",
    image: productImage(FONSTERLARM.slug, "nedis-alrmd30wt"),
    tagline:
      "Enda larmet med fyrsiffrig kod på fronten, alltså det enda som inte kan slås av av den som tagit sig in.",
    scores: {
      /* 85 dB, samma som resten av Nedis-familjen. */
      ljudniva: 2,
      /* 79 kr hos Teknikdelar plus tre AAA, alltså omkring 104 kr. */
      prisperoppning: 3,
      /* Fyrsiffrig PIN-kod på fronten och tre driftlägen. Enda kodlåset. */
      avlarmning: 4.5,
      /* 33 × 105 × 62 mm och 105 g, alltså fältets klumpigaste. */
      montering: 1.5,
      /* Tre AAA medföljer inte. */
      batteri: 2.5,
    },
    price: 79,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Teknikdelar",
    merchantUrl:
      "https://www.teknikdelar.se/produkt/nedis-dorr-och-fonsterlarm-batteridriven-85-db-vit",
    superlative: "Enda med kodlås på fronten",
    pros: [
      "Fyrsiffrig kod på fronten, så den som tagit sig in genom fönstret kan inte bara trycka av larmet",
      "Tre driftlägen, däribland ett nödläge som utlöser sirenen direkt oavsett om larmet är påslaget",
      "79 kronor hos Teknikdelar mot 130 för samma artikel hos en annan butik, alltså 39 procent skillnad",
      "AAA-batterier i stället för knappceller, vilket är billigare per byte och räcker längre",
    ],
    cons: [
      "105 millimeter hög och 105 gram, alltså mer än dubbelt så tung som Nedis tunna variant",
      "85 decibel, samma svaga siren som resten av familjen",
      "De tre AAA-batterierna medföljer inte, så priset per fönster blir omkring 104 kronor",
    ],
    specs: [
      { label: "Pris", value: "79 kr", highlight: true },
      { label: "Ljudnivå", value: "85 dB", highlight: true },
      { label: "Pris per bevakad öppning", value: "Cirka 104 kr", highlight: true },
      { label: "Avlarmning", value: "Fyrsiffrig kod, tre driftlägen", highlight: true },
      { label: "Utlöses av", value: "Magnetkontakt", highlight: true },
      { label: "Batterityp", value: "3 × AAA", highlight: true },
      { label: "Batterier medföljer", value: "Nej" },
      { label: "Mått larmenhet", value: "33 × 105 × 62 mm", highlight: true },
      { label: "Vikt", value: "105 g" },
      { label: "GTIN", value: "5412810329465" },
    ],
    verdict:
      "Nedis ALRMD30WT kostar 79 kronor hos Teknikdelar och är det enda larmet här med en kod.\n\nDet låter som en detalj och är det inte. Sex av de sju larmen i jämförelsen stängs av med en knapp eller en strömbrytare på själva dosan, vilket betyder att den som just krossat sig in genom fönstret kan tysta larmet med ett finger. Den här kräver en fyrsiffrig kod på fronten. Den har dessutom tre driftlägen, varav ett nödläge som startar sirenen direkt.\n\nPriset är också värt att notera. Samma artikel kostar 130 kronor hos en annan svensk butik, alltså 39 procent mer för exakt samma vara. Kontrollera båda innan du beställer.\n\nMen den betalar för sin knappsats i format och i ljud. 105 millimeter hög och 105 gram gör den till den klumpigaste dosan i jämförelsen, mer än dubbelt så tung som Nedis egen tunna variant, och på en fönsterbåge syns den. Sirenen ligger på samma 85 decibel som resten av familjen, och de tre AAA-batterierna följer inte med. Köp den till en ytterdörr eller en källardörr där formatet inte spelar roll och koden gör det.",
  },
];

export const FONSTERLARM_PRODUCTS = resolveProducts(FONSTERLARM, SEEDS);

/**
 * Produkter vi tittade på och lämnade utanför rankningen.
 *
 * Den första föll på att den håller på att försvinna ur sortimentet, den andra
 * på att den egentligen är en produkt från systersidan. Ingen av dem är dålig.
 */
export const FONSTERLARM_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Clas Ohlson",
    name: "Dörr- och fönsterlarm med magnetkontakt 36-6145",
    reason:
      "120 decibel, 40 × 62 × 15 millimeter och fyra SR44-celler som medföljer, alltså ett fullt konkurrenskraftigt larm. Clas Ohlsons egen produktsida säger däremot Produkten har utgått, kontrollerat 7 augusti 2026. Vi rankar inte något som lämnat sortimentet. Deras dörrlarm 36-8496 ligger tvåa på sidan och är efterföljaren i praktiken.",
    approxPrice: 129,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Dorr--fonsterlarm-med-magnetkontakt/p/36-6145",
  },
  {
    brand: "Bright",
    name: "Smart magnetkontakt med larm",
    reason:
      "99 kronor för ett larm som både tjuter lokalt och skickar en notis till appen, alltså en hybrid mellan den här sidan och vår sida om dörr- och fönstersensorer. Den hör hemma där snarare än här, och Jula säljer den dessutom bara i butik och inte online. Den som vill ha app och notiser bör läsa sensorsidan i stället.",
    approxPrice: 99,
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/el-och-belysning/elinstallation/belysningstillbehor/fjarrstrombrytare/magnetkontakt-med-larm-for-fonsterdorr-025998/",
  },
  {
    brand: "Sunsky",
    name: "Dörrstopp med larm 120 dB",
    reason:
      "119 kronor för en kil som läggs under en stängd dörr och tjuter på 120 decibel om dörren rör sig. Den bevakar alltså inte ett fönster utan blockerar en dörr fysiskt, vilket är ett annat sätt att lösa problemet. Populär till hotellrum och vandrarhem, och fyra kunder ger den 5,0 av 5.",
    approxPrice: 119,
    merchant: "Teknikdelar",
    merchantUrl: "https://www.teknikdelar.se/produkt/dorrstopp-med-larm-120db-svart",
  },
  {
    brand: "Verisure",
    name: "Vibrationsdetektor",
    reason:
      "Larmar när någon börjar bryta på ett fönster, alltså innan det öppnats eller krossats. Den säljs bara som del av ett abonnemang med larmcentral och går inte att köpa styckvis, vilket gör den till en annan produkt än de fristående larmen här. Vår sida om hemlarm jämför abonnemangen.",
  },
  {
    brand: "Lancoon",
    name: "Dörr- och fönsterlarm 2-pack",
    reason:
      "105 decibel och två fjärrkontroller för ungefär 200 kronor på Amazon. Den och ett tjugotal snarlika vitmärkta larm på Amazon, CDON och Fyndiq utelämnas av samma skäl: decibeltalen är säljtext utan tillverkare bakom sig, och samma dosa säljs under fem olika namn med olika angivna värden.",
    approxPrice: 200,
  },
];

/**
 * Mirrors the buying guide: every question the guide answers has an entry
 * here, phrased the way people search rather than the way we write headings.
 */
export const FONSTERLARM_FAQ = [
  {
    question: "Vad är skillnaden mellan ett fönsterlarm och en fönstersensor?",
    answer:
      "Ett fönsterlarm är en fristående dosa med inbyggd siren som tjuter direkt på fönstret när magnetkontakten bryts. Den behöver varken app, hubb, wifi eller konto, och den kostar mellan 59 och 299 kronor. En dörr- och fönstersensor ser nästan likadan ut men låter ingenting själv: den skickar en signal till en app eller en hubb, som i sin tur kan tända lampor, skicka en notis eller starta en siren någon annanstans i huset. Den kostar 129 till 499 kronor och förutsätter oftast att du redan har eller köper en hubb. Välj larmet om du vill att något ska höras på plats utan nätverk, och sensorn om du vill veta saker om ditt hem och automatisera dem. De säljs i samma hylla och förväxlas ständigt.",
  },
  {
    question: "Hur många decibel behöver ett fönsterlarm?",
    answer:
      "Mer än de flesta ger. Larmen i den här jämförelsen spänner från 85 till 130 decibel, och eftersom skalan är logaritmisk är det inte en halvering utan en helt annan produkt. 85 decibel motsvarar ungefär en dammsugare på en meters håll och går utmärkt att sova igenom två rum bort. 130 decibel ligger vid smärtgränsen och hörs genom en stängd dörr. Tre av de sju larmen vi jämför ligger på 85 dB trots att alla marknadsförs på ordet högljudd, och talet står sällan i rubriken. Ska larmet skrämma bort någon eller väcka huset vill du ha 120 dB eller mer. Ska det bara tala om för dig att altandörren öppnats räcker 85 gott.",
  },
  {
    question: "Vad kostar det att larma alla fönster i ett hus?",
    answer:
      "Räkna på de öppningar någon faktiskt kan ta sig in genom, inte på alla fönster. I en normal villa blir det ytterdörren, altandörren, källardörren och fönstren i markplan, alltså ofta fyra till sex ställen. Med det billigaste larmet i vår jämförelse på 69 kronor landar sex öppningar på drygt 400 kronor. Med Clas Ohlsons på 119,90 blir det runt 720. Ett fyrpack är oftast billigare per fönster än fyra enskilda larm, men kontrollera batterierna: Luxorparts fyrpack kostar 299 kronor och kräver åtta AAA som säljs separat, vilket lägger omkring 70 kronor på notan. Priset per bevakad öppning är alltså sällan det som står på hyllan.",
  },
  {
    question: "Kan en inbrottstjuv stänga av ett fönsterlarm?",
    answer:
      "På de flesta, ja, och det är den fråga som skiljer larmen mest åt. Fyra av de sju vi jämför stängs av med en enkel knapp eller strömbrytare på själva dosan. Den som tagit sig in genom fönstret står alltså direkt framför av-knappen och kan tysta larmet med ett finger. Ett larm som kräver en fyrsiffrig kod på fronten kan inte stängas av på det sättet, och Nedis ALRMD30WT är den enda i jämförelsen som har det. Luxorparts löser det på ett annat sätt genom att lägga av-knappen i en fjärrkontroll, alltså utanför rummet. Om larmet ska göra mer än att låta i några sekunder är det här viktigare än decibeltalet.",
  },
  {
    question: "Fungerar ett fönsterlarm om tjuven krossar rutan?",
    answer:
      "Inte om det bara har en magnetkontakt. En vanlig magnetkontakt består av två delar som sitter mitt för varandra, och larmet går när de skiljs åt, alltså när fönstret öppnas. Krossar någon glaset och kliver in genom hålet bryts kontakten aldrig och ingenting händer. Ett larm med glaskrossensor lyssnar också efter ljudet av krossat glas och larmar i samma ögonblick rutan går sönder. Nedis ALRMGBD20WT är den enda i vår jämförelse som har båda, och den kostar tjugo kronor mer än deras magnetvariant. Verisure säljer samma princip som en vibrationsdetektor, som larmar redan när någon börjar bryta på fönstret, men den ingår bara i ett abonnemang.",
  },
  {
    question: "Vilka batterier går ett fönsterlarm på?",
    answer:
      "Knappceller eller AAA, och det är värt att kolla före köpet eftersom tre av de sju larmen vi jämför levereras utan batterier. Knappceller som LR44, SR44 och CR2032 är billiga och gör dosan tunn, men de håller kortare, och flera larm behöver tre eller fyra i rad för att driva sirenen. CR2032 är den bästa av dem: den finns i varje mataffär och håller längst i den här sortens konstruktion. AAA räcker längre och kostar mindre per byte, men gör dosan större, vilket syns tydligt på Nedis kodlåsvariant som blir 105 millimeter hög. Luxorparts fyrpack kräver åtta AAA, alltså omkring 70 kronor utöver köpet.",
  },
  {
    question: "Får ett fönsterlarm plats på en smal fönsterbåge?",
    answer:
      "Det beror helt på modellen, och spannet är stort. Nedis tunna larm är 8 millimeter tjockt och väger 41 gram, alltså knappt märkbart på en båge. Deras kodlåsvariant är 105 millimeter hög och väger 105 gram. Clas Ohlsons larmenhet mäter 65 × 34 × 17 millimeter. Alla fästs med dubbelhäftande tejp och kräver varken skruv eller verktyg, så det är formatet och inte monteringen som avgör. Två av larmen i vår jämförelse publicerar inga mått alls, varken hos butiken, hos tillverkaren eller i manualen. Mät bågens bredd och det fria djupet innan du beställer, och tänk på att fönstret ska gå att öppna förbi dosan.",
  },
  {
    question: "Är ett fönsterlarm bra i husvagn eller husbil?",
    answer:
      "Ja, och det är en av de vanligaste användningarna. Ett fristående larm behöver varken ström, wifi eller täckning, vilket gör det till en av få säkerhetsprodukter som fungerar på en campingplats. Flera av larmen i jämförelsen marknadsförs uttryckligen för husvagn och husbil. Två saker är värda att tänka på. Utrymmet är trängre än hemma, så de tunnare modellerna passar bättre, och ett larm på 85 decibel räcker längre i en husvagn än i en villa eftersom du sover några meter bort. Ta ett larm som går på AAA hellre än på knappceller om ekipaget står oanvänt långa perioder.",
  },
  {
    question: "Finns det något oberoende test av fönsterlarm?",
    answer:
      "Nej. Råd & Rön har inte provat fristående fönsterlarm, Stiftung Warentest har provat smarta larmsystem och mekaniska fönsterlås men inte den här produktklassen, och norska tek.no nämner dem inte alls. Det betyder att vår rankning bygger på tillverkarnas publicerade specifikationer, på manualerna butikerna länkar och på priser vi läst hos butikerna och daterat. Decibeltalen är tillverkarnas egna uppgifter och inte något vi mätt. Vi säger det hellre rakt ut än låtsas ha ett underlag vi inte har, och det är också skälet till att vi utelämnar de vitmärkta larmen på Amazon och CDON: samma dosa säljs under fem olika namn med olika angivna decibeltal.",
  },
  {
    question: "Kan man använda ett fönsterlarm som dörrklocka?",
    answer:
      "Vissa, ja. Clas Ohlsons dörrlarm har fem funktioner och kan ställas om från siren till en ding-dong-signal, vilket gör samma dosa användbar för att höra när någon kommer in i en butik eller när barnen går ut genom ytterdörren. Det kallas ofta dörrvakt eller passagelarm i handeln. Nedis kodlåsvariant har tre driftlägen med samma tanke. De enklaste larmen har bara siren och ingenting annat. Vill du ha den funktionen ska du leta efter ordet passagelarm eller dörrvakt i produktnamnet, för det är sällan utskrivet i specifikationen.",
  },
  {
    question: "Behöver jag larmdekaler om jag har fönsterlarm?",
    answer:
      "De skadar inte, men förvänta dig ingenting av dem. En dekal säger att huset är larmat och kostar under femtio kronor, och tanken är att en tjuv väljer nästa hus i stället. Det finns inget publicerat underlag som visar hur mycket det hjälper, och vi påstår därför inte att det gör det. Det som säkert har effekt är att larmet faktiskt hörs: 130 decibel skiljer sig från 85 på ett sätt som märks genom en stängd dörr. Lägg pengarna på ett högljutt larm och på fler bevakade öppningar innan du lägger dem på dekaler.",
  },
];
