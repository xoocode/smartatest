import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { POWERSTATION } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /powerstation.
 *
 * Storebror till /powerbank. Gränsen mellan de två är Stiftung Warentests egen:
 * en powerstation har **minst ett 230 V-uttag**. Sidan rankar 231 till 1 024
 * wattimmar, alltså camping, stugan och ett strömavbrott. Hemreservklassen från
 * 2 kWh, 15 000 till 40 000 kronor, får en systersida.
 *
 * Priser, artikelnummer, kundbetyg och specifikationer är lästa på butikernas
 * egna produktsidor på PRICE_CHECKED. Effekttalen är hämtade hos tillverkaren,
 * se nedan.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans. Se lib/links.ts.
 *
 * ## ⚠️ Effekten står i tre rader, och det är hela sidans konstruktion
 *
 * Ett watt-tal på en powerstation kan vara tre olika storheter:
 *
 * - **Kontinuerlig effekt** — vad växelriktaren orkar hela tiden.
 * - **Toppeffekt** — sekunderna när en motor startar.
 * - **Boosteffekt** — EcoFlows `X-Boost` och Ankers `SurgePad`, där stationen
 *   sänker spänningen för att driva resistiv last över märkeffekten.
 *
 * Handeln publicerar dem i samma fält utan att säga vilken. Uppmätt hos
 * Elgiganten 2026-08-05, fältet `Max. AC 230v effekt`: 300 W för EcoFlow River
 * 3 (kontinuerligt), 2 400 W för Delta 3 (X-Boost, tillverkaren säger 1 800),
 * 3 000 W för Anker C1000X Gen 2 (topp, tillverkaren säger 2 000) och 4 000 W
 * för C2000 Gen 2 (topp, tillverkaren säger 2 400).
 *
 * Därför är varje kontinuerligt watt-tal här hämtat hos tillverkaren eller hos
 * Clas Ohlson, som är den enda butik i svepet som skriver ut skillnaden i
 * klartext: "AC-uttag: 3 × 600 W (X-Boost upp till 1200 W)".
 *
 * ## ⚠️ Talet i modellnamnet är ingen enhet
 *
 * Cocraft Advance 240 lagrar 231 Wh och lämnar 200 W. Advance 500 lagrar 386
 * och lämnar 500. TogoPower Advance 650 lagrar 634 och lämnar 500. Anker Solix
 * C300x lagrar 288 och lämnar 300. Jackery Explorer 1000 Pro lagrar 1 002 och
 * lämnar 1 000. EcoFlow numrerar inte alls. Fältet `Energi` bär alltid den
 * publicerade kapaciteten.
 *
 * ## ⚠️ Cykeltal och ljudnivå gissas aldrig — och kostar aldrig poäng
 *
 * Båda ligger i `ALDRIG_BEDOMD`. Spannet på cykler är en faktor fyra — Anker
 * och EcoFlow anger 3 000 till 4 000 för litiumjärnfosfat, Jackery 1 000 för
 * ternär litium — och att härleda talet ur cellkemin raderar just den
 * spridning kriteriet mäter.
 *
 * ⚠️ **Fram till 2026-08-06 drog en saknad uppgift ner betyget på `livslangd`,
 * och det stod utskrivet både här, i kriteriets beskrivning och i metodrutan.**
 * Det var fel: ett batteri håller lika länge vare sig talet står tryckt eller
 * inte, och avdraget betygsatte vår research. Se lib/corrections.ts.
 *
 * Gap-passet 2026-08-06 visade dessutom att två av de fyra tomma cykelcellerna
 * inte var tomma hos tillverkaren. Ankers eget datablad för A1723, matchat på
 * GTIN 0194644298845, anger `Cycle Life 3000+ (to 80%)` för C300x — den cell
 * sidan publicerade som `Ej angiven` och drog av för.
 *
 * Kvar som verkligt okända, kontrollerade mot tier A: cykeltal och ljudnivå för
 * båda Cocraft-modellerna, ljudnivå för Anker C800x, och hela batteriuppgiften
 * för TogoPower. Cocrafts två bruksanvisningar lästes i sin helhet; batterityp,
 * cellspänning, amperetimmar, kapacitet och effekt per port står utskrivna,
 * cykeltal och dB gör det inte.
 *
 * De syns som `Ej angiven`, alltså ett streck, och står aldrig i ett omdöme, en
 * för- eller nackdel eller ett FAQ-svar. Se skillen `swedish-voice`.
 *
 * ## ⚠️ IP-klassen gäller batteripaketet, inte apparaten
 *
 * EcoFlow anger IP54 för River 3 och River 3 Plus och IP65 för Delta 3. I deras
 * egen specifikationstabell heter raden `Waterproof Level of Battery Pack`, och
 * fotnoten på River-sidorna säger ordagrant att klassen "applies only to the
 * battery pack, not the entire package".
 *
 * Sidan påstod till 2026-08-06 att Delta 3 var den enda som "klarar att stå ute
 * i regn". Det är mer än tillverkaren lovar. Formuleringarna säger nu vad som
 * är provat: cellerna.
 *
 * Samma fälla åt andra hållet hos Anker: databladet för C800x marknadsför
 * "IP65-rated water-resistant build", men meningen gäller den löstagbara
 * campinglampan i locket. Stationen har ingen klass, och butikens fält säger
 * det rakt ut.
 *
 * ## ⚠️ Butiksläget, och varför länkarna ser ut som de gör
 *
 * De två butiker som har sortimentet, Clas Ohlson och Elgiganten, har inget
 * affiliateprogram. Kjell har programmet men noll i lager online på samtliga
 * nio artiklar 2026-08-05. Sidan länkar därför bästa pris, efter användarbeslut,
 * och gapet står utskrivet i "Vem har kontrollerat det här?". Samma lösning som
 * /utomhustimer och /slackspray.
 *
 * Prylstaden är kategorins enda butik som både betalar bra och tillåter betald
 * sökning, 8 % på 45 dagars cookie. De för tre powerstations, varav en ligger i
 * den här storleksklassen, och den rankas på sina egna meriter.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte laddat ur en enda powerstation. Stiftung Warentest gjorde det på
 * elva modeller 2023, men testet gäller föregående generation, resultaten per
 * modell ligger bakom betalvägg, och ingen av produkterna här ingår i det.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "ecoflow-delta-3-1024",
    brand: "EcoFlow",
    name: "Delta 3 portabel powerstation 1024 Wh",
    shortName: "EcoFlow Delta 3",
    image: productImage(POWERSTATION.slug, "ecoflow-delta-3-1024"),
    tagline: "Fyra vägguttag, 1 800 watt och full laddning på 56 minuter.",
    scores: {
      /* 1 024 Wh och 1 800 W kontinuerligt, alltså både störst batteri och
         näst högst märkeffekt. Fyra 230 V-uttag är flest i jämförelsen. */
      energi: 5,
      /* LFP med 4 000 cykler till 80 procent, flest i jämförelsen, plus fem
         års garanti. IP-klassen räknas under barbarhet och inte här. */
      livslangd: 5,
      /* 56 minuter till full och 500 W solpanel är klassens bästa. 30 dB vid
         600 W och 40 dB vid 1 200, alltså mätt i två laster. */
      drift: 5,
      /* 12,5 kg är tyngst, men fyra uttag och IP65 på batteripaketet väger
         upp. EcoFlows egen fotnot begränsar klassen till just paketet. */
      barbarhet: 3,
      /* 8,59 kr/Wh är bra, men 8 799 kronor är mycket pengar. */
      prisvarde: 3.5,
    },
    price: 8799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/EcoFlow-Delta-3-portabel-powerstation-1024-Wh/p/36-379",
    userRating: { value: 4.5, count: 19, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst när allt ska igång",
    pros: [
      "1 800 watt kontinuerligt driver kylskåp, vattenkokare och elverktyg",
      "Fyra 230 V-uttag, så ingen grendosa behövs",
      "1 024 wattimmar räcker till ett kylskåp ungefär ett dygn",
      "Full laddning på 56 minuter från ett vanligt vägguttag",
      "IP65 på batteripaketet, tätast mot damm och vatten i jämförelsen",
      "4 000 cykler till 80 procents kapacitet, alltså tio år av dagligt bruk",
      "Fem års garanti",
    ],
    cons: [
      "12,5 kilo är nästan fem gånger den lättaste här",
      "8 799 kronor är näst högsta priset",
      "40 decibel vid 1 200 watt, alltså hörbar när den arbetar hårt",
      "Extrabatteriet kostar 6 990 kronor till",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "8 799 kr", highlight: true },
      { label: "Energi", shortLabel: "Energi", value: "1 024 Wh", highlight: true },
      {
        label: "Kontinuerlig effekt",
        shortLabel: "Effekt",
        value: "1 800 W",
        highlight: true,
      },
      { label: "Toppeffekt", shortLabel: "Topp", value: "3 600 W", highlight: true },
      { label: "Boosteffekt", value: "2 400 W (X-Boost)" },
      { label: "Cellkemi", shortLabel: "Batteri", value: "LiFePO4", highlight: true },
      {
        label: "Cykler till 80 %",
        shortLabel: "Cykler",
        value: "4 000",
        highlight: true,
      },
      { label: "Vikt", shortLabel: "Vikt", value: "12,5 kg", highlight: true },
      {
        label: "Antal 230 V-uttag",
        shortLabel: "230 V",
        value: "4 st",
        highlight: true,
      },
      {
        label: "Laddtid till 100 %",
        shortLabel: "Laddtid",
        value: "56 min",
        highlight: true,
      },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "30 dB", highlight: true },
      /* EcoFlows egen tabellrad heter `Waterproof Level of Battery Pack`, och
         River-sidornas fotnot säger att klassen inte gäller hela apparaten.
         Läst på us.ecoflow.com respektive uk.ecoflow.com 2026-08-06. */
      { label: "IP-klass", shortLabel: "IP", value: "IP65 (batteripaket)", highlight: true },
      { label: "Solladdning max", value: "500 W" },
      { label: "USB-portar", value: "2× USB-C 100 W, 2× USB-A 18 W" },
      { label: "12 V-uttag", value: "1 st, 126 W" },
      { label: "Display", value: "Ja" },
      { label: "App", value: "Ja" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "36-379" },
      { label: "GTIN", value: "4895251626422" },
    ],
    verdict:
      "EcoFlow Delta 3 rymmer 1 024 wattimmar, lämnar 1 800 watt och kostar 8 799 kronor. Den gör det ingen annan i jämförelsen gör: driver det du faktiskt har hemma.\n\n**1 800 watt är gränsen där en powerstation slutar vara en laddare och blir ett vägguttag.** Under 500 watt kan du ladda telefoner och driva lampor. Vid 1 800 startar en vattenkokare, en mikrovågsugn, en cirkelsåg och en kaffebryggare, alltså saker som drar ström i stället för att ta emot den. Fyra 230-voltsuttag gör dessutom att tre lampor och en router kan gå samtidigt utan att du släpar med en grendosa. De 1 024 wattimmarna räcker till ett normalt kylskåp i ungefär ett dygn, eller en router och några lampor i två.\n\n**Batteriet är det som gör den värd pengarna på tio års sikt.** Litiumjärnfosfat med 4 000 cykler till 80 procents kapacitet betyder att du kan ladda och tömma den varje vecka i sjuttio år, eller varje dag i elva. Räknat på hur mycket energi den levererar under sin livstid blir kronan per uttagen kilowattimme lägre här än hos de billigare stationerna, och det är den räkningen som betyder något när produkten kostar nästan nio tusen. Batteripaketet är dessutom klassat IP65, alltså tätt mot damm och sprutande vatten, vilket är det starkaste skyddet någon tillverkare här anger. Det gäller cellerna och inte hela lådan, så den tål en regnskur på en byggarbetsplats bättre än de andra, men den ska fortfarande inte lämnas ute över natten. Garantin är fem år.\n\nDen är också hyllans snabbaste att fylla: 56 minuter från tom till full via vägguttaget, mot fyra och en halv timme för de billigare. På en stugresa där du laddar under lunchen i stället för över natten är det skillnaden mellan att ha ström på kvällen och att inte ha det. Priset är att den väger 12,5 kilo, alltså fem gånger den lättaste här, och att den hörs vid 40 decibel när den arbetar över 1 200 watt.\n\nSka något faktiskt fungera när strömmen går är det här köpet. Fyra uttag, 1 800 watt och 4 000 laddcykler löser problemet i ett hus, en stuga eller en husvagn, och gör det i tio år. De 12,5 kilona är vad det kostar, och för en station som ändå ska stå still är det ingen invändning.",
  },
  {
    id: "anker-solix-c1000x-gen2",
    brand: "Anker",
    name: "Solix C1000X Gen 2 portabel powerstation",
    shortName: "Anker C1000X Gen 2",
    image: productImage(POWERSTATION.slug, "anker-solix-c1000x-gen2"),
    tagline: "2 000 watt, 20 decibel och full på 49 minuter.",
    scores: {
      /* Högst kontinuerlig effekt i jämförelsen, 2 000 W, och 1 024 Wh. */
      energi: 5,
      /* LFP med 4 000 cykler och fem års garanti, alltså samma celler och
         samma garanti som Delta 3. Höjd från 4,5 den 2026-08-06: avdraget
         gällde att ingen IP-klass var publicerad, vilket är en lucka i vår
         research och dessutom räknades två gånger. Se lib/corrections.ts. */
      livslangd: 5,
      /* Snabbast av alla, 49 minuter, och tystast av alla, 20 dB. */
      drift: 5,
      /* 11,3 kg, alltså näst tyngst, men fyra 230 V-uttag är flest. */
      barbarhet: 3,
      /* 8,79 kr/Wh och sidans högsta pris. */
      prisvarde: 3,
    },
    price: 8999,
    priceCheckedAt: PRICE_CHECKED,
    /* Flyttad från Elgiganten till Proshop 2026-08-05, samma skäl som C800x:
       samma GTIN 0194644274788, samma pris 8 999 kr, och Proshop betalar.
       Proshop bekräftar dessutom artikelidentiteten i klartext — deras egen
       produkttext säger "Anker SOLIX C1000 Gen 2 levererar 1,024Wh kapacitet,
       2,000W uteffekt" — vilket avfärdar variantrisken kring X-suffixet. */
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Powerstation/Anker-Solix-C1000X-Gen-2-1024Wh/3478466",
    award: "premium",
    superlative: "Bäst för den som vill ha tyst",
    pros: [
      "2 000 watt kontinuerligt är högst i jämförelsen",
      "20 decibel är tystast här, alltså tystare än ett viskande rum",
      "Full laddning på 49 minuter",
      "4 000 cykler till 80 procents kapacitet",
      "Fyra 230 V-uttag och tre USB-C med PD 3.1",
      "Omkoppling på 10 millisekunder vid strömavbrott",
      "Fem års garanti",
    ],
    cons: [
      "8 999 kronor, alltså 200 kronor mer än Delta 3 för samma 1 024 wattimmar",
      "11,3 kilo, alltså en tvåhandsbörda som blir stående där du ställer den",
      "3 000 watt topp mot Delta 3:s 3 600, alltså mindre marginal när en motor startar",
      "Kostar 2 800 kronor mer än Jackery Explorer 1000 Pro för lika mycket batteri",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "8 999 kr", highlight: true },
      { label: "Energi", shortLabel: "Energi", value: "1 024 Wh", highlight: true },
      {
        label: "Kontinuerlig effekt",
        shortLabel: "Effekt",
        value: "2 000 W",
        highlight: true,
      },
      { label: "Toppeffekt", shortLabel: "Topp", value: "3 000 W", highlight: true },
      { label: "Cellkemi", shortLabel: "Batteri", value: "LiFePO4", highlight: true },
      {
        label: "Cykler till 80 %",
        shortLabel: "Cykler",
        value: "4 000",
        highlight: true,
      },
      { label: "Vikt", shortLabel: "Vikt", value: "11,3 kg", highlight: true },
      {
        label: "Antal 230 V-uttag",
        shortLabel: "230 V",
        value: "4 st",
        highlight: true,
      },
      {
        label: "Laddtid till 100 %",
        shortLabel: "Laddtid",
        value: "49 min",
        highlight: true,
      },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "20 dB", highlight: true },
      { label: "IP-klass", shortLabel: "IP", value: "Ej angiven", highlight: true },
      { label: "UPS-omkoppling", value: "10 ms" },
      { label: "USB-portar", value: "3× USB-C PD 3.1" },
      { label: "Display", value: "Ja" },
      { label: "App", value: "Ja" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "A1763" },
      { label: "GTIN", value: "0194644274788" },
    ],
    verdict:
      "Anker Solix C1000X Gen 2 rymmer 1 024 wattimmar, lämnar 2 000 watt och kostar 8 999 kronor. Den har jämförelsens högsta märkeffekt och dess lägsta ljudnivå på samma gång.\n\n**Tjugo decibel är den siffra som skiljer den här från allt annat på hyllan.** Det ligger under vad ett tyst sovrum mäter, och i praktiken betyder det att den kan stå i samma rum som någon sover utan att märkas. Konkurrenterna ligger på 25 och 30, och EcoFlow Delta 3 går upp till 40 när den arbetar hårt. Skillnaden mellan 20 och 40 decibel är inte dubbelt så tyst utan ungefär fyra gånger, eftersom skalan är logaritmisk. Ska stationen driva en router och en syrgaskoncentrator över natten, eller stå i en husvagn med sovande människor, är det här den enda i klassen som gör det obemärkt.\n\n**2 000 watt kontinuerligt är också mest i jämförelsen**, tvåhundra watt över Delta 3, och tillsammans med fyra vägguttag och tre USB-C-portar med PD 3.1 tar den emot i stort sett allt du kan koppla in. Den laddas full på 49 minuter, snabbast av alla, och kopplar om till batteridrift på tio millisekunder, vilket är kort nog för att en dator inte ska märka strömavbrottet. Batteriet är litiumjärnfosfat med 4 000 cykler till 80 procent, alltså samma tioårsklass som Delta 3, och garantin är fem år.\n\nPriset är det som talar emot den. 8 999 kronor är 200 kronor över Delta 3 för ett batteri i samma storlek, och 2 800 kronor över Jackery Explorer 1000 Pro som rymmer lika mycket. Toppeffekten stannar dessutom på 3 000 watt mot Delta 3:s 3 600, alltså mindre marginal i sekunden när en kompressor drar igång.\n\nSka stationen stå i samma rum som någon sover är den här den enda som gör det obemärkt, och då är valet redan avgjort. Väger det skälet lätt pekar allt annat mot Delta 3: 200 kronor billigare, högre toppeffekt och ett batteripaket som tål väder.",
  },
  {
    id: "ecoflow-river-3-plus-286",
    brand: "EcoFlow",
    name: "River 3 Plus portabel powerstation 286 Wh",
    shortName: "EcoFlow River 3 Plus",
    image: productImage(POWERSTATION.slug, "ecoflow-river-3-plus-286"),
    tagline: "Tre vägguttag och IP54 i en station på 4,7 kilo.",
    scores: {
      /* 600 W kontinuerligt ur 286 Wh, alltså hög effekt i ett litet batteri.
         Tre 230 V-uttag är ovanligt i den här storleken. */
      energi: 3,
      /* LiFePO4 med 3 000 cykler till 80 procent. IP54 räknas under
         barbarhet och inte här. */
      livslangd: 4.5,
      /* 60 minuter till full, under 30 dB, 220 W solpanel, UPS 10 ms. */
      drift: 4.5,
      /* 4,7 kg, tre 230 V-uttag och IP54 på batteripaketet. Bäst
         kombination i jämförelsen. */
      barbarhet: 4.5,
      /* 13,25 kr/Wh är sidans dyraste per wattimme. */
      prisvarde: 2,
    },
    price: 3790,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/EcoFlow-River-3-Plus-portabel-powerstation-286-Wh/p/36-375",
    userRating: { value: 4.5, count: 9, scale: 5, checkedAt: PRICE_CHECKED },
    award: "editor",
    superlative: "Bäst att bära med sig",
    pros: [
      "4,7 kilo, alltså bärbar på riktigt",
      "Tre 230 V-uttag trots storleken",
      "IP54 på batteripaketet, alltså provat mot damm och stänk",
      "600 watt kontinuerligt räcker till dator, kylbox och verktyg",
      "1 200 watt topp, alltså dubbla märkeffekten när något startar",
      "3 000 cykler till 80 procents kapacitet",
      "Full laddning på 60 minuter",
      "Under 30 decibel",
    ],
    cons: [
      "13,25 kronor per wattimme är sidans dyraste",
      "286 wattimmar räcker inte till ett kylskåp ett dygn",
      "Extrabatteriet kostar 3 090 kronor till",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "3 790 kr", highlight: true },
      { label: "Energi", shortLabel: "Energi", value: "286 Wh", highlight: true },
      {
        label: "Kontinuerlig effekt",
        shortLabel: "Effekt",
        value: "600 W",
        highlight: true,
      },
      /* EcoFlows egen specifikationstabell, uk.ecoflow.com 2026-08-06, säger
         "3 outlets, 600W total (Surge 1200W, X-Boost 1200W)". Topp och boost
         sammanfaller alltså på den här modellen och båda talen är 1 200. */
      {
        label: "Toppeffekt",
        shortLabel: "Topp",
        value: "1 200 W",
        highlight: true,
      },
      { label: "Boosteffekt", value: "1 200 W (X-Boost)" },
      { label: "Cellkemi", shortLabel: "Batteri", value: "LiFePO4", highlight: true },
      {
        label: "Cykler till 80 %",
        shortLabel: "Cykler",
        value: "3 000",
        highlight: true,
      },
      { label: "Vikt", shortLabel: "Vikt", value: "4,7 kg", highlight: true },
      {
        label: "Antal 230 V-uttag",
        shortLabel: "230 V",
        value: "3 st",
        highlight: true,
      },
      {
        label: "Laddtid till 100 %",
        shortLabel: "Laddtid",
        value: "60 min",
        highlight: true,
      },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Under 30 dB", highlight: true },
      { label: "IP-klass", shortLabel: "IP", value: "IP54 (batteripaket)", highlight: true },
      { label: "UPS-omkoppling", value: "10 ms" },
      { label: "Solladdning max", value: "220 W" },
      { label: "USB-portar", value: "1× USB-C 100 W, 2× USB-A 18 W" },
      { label: "12 V-uttag", value: "1 st, 126 W" },
      { label: "Display", value: "Ja" },
      { label: "App", value: "Ja" },
      { label: "Artikelnummer", value: "36-375" },
      { label: "GTIN", value: "4895251627917" },
    ],
    verdict:
      "EcoFlow River 3 Plus rymmer 286 wattimmar, lämnar 600 watt och kostar 3 790 kronor. Det är den enda i jämförelsen som är både liten nog att bära och komplett nog att räcka.\n\n**4,7 kilo är den viktiga siffran.** Kategorins ord är portabel, men produkterna här väger från 2,75 till 12,5 kilo, alltså nästan en femdubbling under samma ord. Vid 4,7 kilo bär du den till en tältplats, ner till bryggan eller upp för en trappa utan att planera för det. Vid tolv kilo bär du den från bilen till dörren och sedan står den. Att den ändå har tre 230-voltsuttag är ovanligt i den här storleken, eftersom de andra små har ett, och det betyder att en lampa, en laddare och en fläkt kan gå samtidigt utan grendosa.\n\n**600 watt kontinuerligt räcker längre än talet antyder.** En bärbar dator drar 60, en kylbox 50, en router 10 och en projektor 200. Det som inte fungerar är värme: vattenkokare, hårtork och kaffebryggare ligger alla över. Startrycket klarar den också: 1 200 watt i toppen är dubbla märkeffekten, vilket räcker till kompressorn i en kylbox eller en liten pump. Batteriet är litiumjärnfosfat med 3 000 cykler till 80 procents kapacitet, och batteripaketet är klassat IP54, alltså provat mot damm och stänk. Den fylls på en timme och hörs under 30 decibel.\n\nDet du betalar för det är hyllans sämsta pris per wattimme. 13,25 kronor per wattimme är mer än dubbelt mot Jackery Explorer 1000 Pro, och 286 wattimmar är lite: ett kylskåp tömmer den på en kväll, och en dator laddas ungefär tre gånger. Vill du ha kapacitet för pengarna är det här fel produkt.\n\nKöp den ändå om stationen ska flyttas. Det här är den enda i jämförelsen som gör det den lovar när den ska bäras någonstans, och en powerstation som är för tung för resan står hemma och laddar ingenting alls.",
  },
  {
    id: "anker-solix-c800x-768",
    brand: "Anker",
    name: "Solix C800x portabel powerstation",
    shortName: "Anker C800x",
    image: productImage(POWERSTATION.slug, "anker-solix-c800x-768"),
    tagline: "768 wattimmar och 1 200 watt för under sju och ett halvt tusen.",
    scores: {
      /* 768 Wh och 1 200 W kontinuerligt, alltså mellanklassens starkaste. */
      energi: 4,
      /* LiFePO4 med 3 000 cykler till 80 procent och fem års garanti, båda
         ur Ankers eget datablad för A1755. Höjd från 4,0 den 2026-08-06:
         avdraget gällde en IP-klass som räknas under barbarhet. */
      livslangd: 4.5,
      /* 58 minuter till full, 300 W solpanel och MPPT. Höjd från 3,5 den
         2026-08-06: avdraget gällde att ingen ljudnivå gått att få fram,
         alltså vår research och inte fläkten. Se lib/corrections.ts. */
      drift: 4,
      /* 10,9 kg är näst tyngst, och tillverkaren anger ingen kapsling alls. */
      barbarhet: 2.5,
      /* 9,63 kr/Wh, alltså mitten av fältet. */
      prisvarde: 3.5,
    },
    price: 7399,
    priceCheckedAt: PRICE_CHECKED,
    /* Flyttad från Elgiganten till Proshop 2026-08-05. Samma artikel, samma
       GTIN 0194644187774, samma pris 7 399 kr. Proshop ligger på 3,2 % i
       Adtraction och Elgiganten har inget program alls, så bytet följer
       .claude/context/money.md: vid samma pris tar vi den som betalar. */
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Powerstation/Anker-SOLIX-C800X-768Wh/3336606",
    superlative: "Bäst till kylboxen på campingen",
    pros: [
      "768 wattimmar räcker till en kylbox i två dygn",
      "1 200 watt kontinuerligt driver de flesta elverktyg",
      "3 000 cykler till 80 procents kapacitet",
      "Full laddning på 58 minuter",
      "Tre 230 V-uttag och 300 watt solpanel",
      "Inbyggd belysning i tre lägen",
    ],
    cons: [
      "10,9 kilo, alltså mer än dubbelt mot EcoFlow River 3 Plus",
      "Ingen kapslingsklass alls, så den ska stå under tak",
      "Snabbladdningen på 58 minuter kräver att du aktiverar den i appen",
      "768 wattimmar räcker inte till ett kylskåp ett dygn, till det behövs EcoFlow Delta 3",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "7 399 kr", highlight: true },
      { label: "Energi", shortLabel: "Energi", value: "768 Wh", highlight: true },
      {
        label: "Kontinuerlig effekt",
        shortLabel: "Effekt",
        value: "1 200 W",
        highlight: true,
      },
      {
        label: "Toppeffekt",
        shortLabel: "Topp",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Boosteffekt", value: "1 600 W (SurgePad)" },
      { label: "Cellkemi", shortLabel: "Batteri", value: "LiFePO4", highlight: true },
      {
        label: "Cykler till 80 %",
        shortLabel: "Cykler",
        value: "3 000",
        highlight: true,
      },
      { label: "Vikt", shortLabel: "Vikt", value: "10,9 kg", highlight: true },
      {
        label: "Antal 230 V-uttag",
        shortLabel: "230 V",
        value: "3 st",
        highlight: true,
      },
      {
        label: "Laddtid till 100 %",
        shortLabel: "Laddtid",
        value: "58 min",
        highlight: true,
      },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Ej angiven", highlight: true },
      /* Butikens strukturerade fält säger ordagrant "Ingen IP-klassificering",
         alltså en publicerad uppgift och inte ett tomrum. Skillnaden mot
         `Ej angiven` är hela poängen med raden. */
      { label: "IP-klass", shortLabel: "IP", value: "Ingen", highlight: true },
      { label: "Solladdning max", value: "300 W" },
      { label: "USB-portar", value: "2× USB-C, 2× USB-A, 130 W totalt" },
      { label: "12 V-uttag", value: "1 st, 120 W" },
      { label: "Display", value: "Ja" },
      { label: "App", value: "Ja" },
      { label: "Inbyggd belysning", value: "Ja, tre lägen" },
      /* Ankers eget datablad för A1755, läst 2026-08-06: "an industry-leading
         5-year device warranty". Samma villkor som C300x och C1000X. */
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "A1755311" },
      { label: "GTIN", value: "0194644187774" },
    ],
    verdict:
      "Anker Solix C800x rymmer 768 wattimmar, lämnar 1 200 watt och kostar 7 399 kronor. Den sitter i mitten av jämförelsen och det är precis där de flesta campingbehov ligger.\n\n**768 wattimmar är den storlek där en kylbox slutar vara ett problem.** En kompressorkylbox drar mellan 40 och 50 watt när kompressorn går, och den går ungefär en tredjedel av tiden, alltså runt 15 watt i snitt. Det ger drygt två dygn på en full laddning, vilket täcker en helg utan eluttag med marginal. Under 500 wattimmar blir samma kylbox en kalkyl du måste hålla i huvudet; över tusen betalar du för mer än en helg behöver.\n\n**1 200 watt kontinuerligt är också rätt avvägt för det bruket.** Det driver en kaffebryggare, en handmaskin eller en pump, alltså det man faktiskt vill starta på en camping eller ett bygge, medan den dyrare klassen ovanför kostar två tusen till för watt du sällan använder. Litiumjärnfosfat med 3 000 cykler till 80 procent betyder tio års veckobruk, garantin är fem år, och 300 watt solpanel in gör den självförsörjande under en sommarvecka. Tillverkarens egna körtider för samma batteri sätter siffror på det: en kaffebryggare på 1 000 watt i 41 minuter, eller en cpap-apparat i 17 timmar. Tre vägguttag och en inbyggd lampa i tre lägen hör till samma användning.\n\nTvå saker drar ner. Den väger 10,9 kilo, alltså mer än dubbelt mot River 3 Plus, och det märks varje gång den ska flyttas. Och den har ingen kapslingsklass alls: Anker anger uttryckligen ingen, så den ska stå under tak även om resten av produkten är byggd för att följa med ut. Lampan i locket är tät, men det är bara lampan.\n\nKylboxen är hela skälet att välja den här. 768 wattimmar täcker en helg utan eluttag med marginal, och det för fjortonhundra kronor mindre än EcoFlow Delta 3. Ska den bäras längre än från bakluckan tar du River 3 Plus i stället.",
  },
  {
    id: "jackery-explorer-1000-pro",
    brand: "Jackery",
    name: "Explorer 1000 Pro portabel powerstation",
    shortName: "Jackery 1000 Pro",
    image: productImage(POWERSTATION.slug, "jackery-explorer-1000-pro"),
    tagline: "Tusen wattimmar för 6 196 kronor, och tusen laddcykler.",
    scores: {
      /* 1 002 Wh och 1 000 W kontinuerligt, alltså full storlek. */
      energi: 4.5,
      /* Ternär litium med 1 000 cykler, alltså en fjärdedel av LiFePO4-fältet.
         Det är sidans största skillnad och den syns inte i priset. */
      livslangd: 1.5,
      /* 1 h 48 min till full, 30 dB. Ingen UPS-uppgift. */
      drift: 3,
      /* 11,5 kg och ingen IP-klass, men bara två 230 V-uttag. */
      barbarhet: 2.5,
      /* 6,18 kr/Wh är sidans billigaste per wattimme. */
      prisvarde: 4.5,
    },
    price: 6196,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/belysning-elprodukter/powerstation/jackery-explorer-1000-pro-portabel-powerstation/564515",
    superlative: "Bäst för några gånger om året",
    pros: [
      "1 002 wattimmar för 6 196 kronor, alltså 6,18 kronor per wattimme",
      "1 000 watt kontinuerligt och 2 000 watt topp",
      "Ren sinusvåg, alltså samma strömkvalitet som ur vägguttaget hemma",
      "30 decibel vid drift",
      "Fem års garanti, tre plus två",
      "Fälls handtaget ner blir ovansidan plan",
    ],
    cons: [
      "1 000 cykler till 80 procent, alltså en fjärdedel av vad de flesta här klarar",
      "Ternär litium i stället för litiumjärnfosfat",
      "11,5 kilo",
      "Bara två 230 V-uttag",
      "1 timme och 48 minuter till full laddning",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "6 196 kr", highlight: true },
      { label: "Energi", shortLabel: "Energi", value: "1 002 Wh", highlight: true },
      {
        label: "Kontinuerlig effekt",
        shortLabel: "Effekt",
        value: "1 000 W",
        highlight: true,
      },
      { label: "Toppeffekt", shortLabel: "Topp", value: "2 000 W", highlight: true },
      {
        label: "Cellkemi",
        shortLabel: "Batteri",
        value: "Ternär litium",
        highlight: true,
      },
      {
        label: "Cykler till 80 %",
        shortLabel: "Cykler",
        value: "1 000",
        highlight: true,
      },
      { label: "Vikt", shortLabel: "Vikt", value: "11,5 kg", highlight: true },
      {
        label: "Antal 230 V-uttag",
        shortLabel: "230 V",
        value: "2 st",
        highlight: true,
      },
      {
        label: "Laddtid till 100 %",
        shortLabel: "Laddtid",
        value: "1 h 48 min",
        highlight: true,
      },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "30 dB", highlight: true },
      { label: "IP-klass", shortLabel: "IP", value: "Ej angiven", highlight: true },
      { label: "Vågform", value: "Ren sinusvåg" },
      { label: "USB-portar", value: "2× USB-C 100 W, 2× USB-A 18 W" },
      { label: "12 V-uttag", value: "1 st, 120 W" },
      { label: "Display", value: "Ja" },
      { label: "Garanti", value: "5 år (3 + 2)" },
      { label: "Artikelnummer", value: "102131" },
      { label: "GTIN", value: "0190074000324" },
    ],
    verdict:
      "Jackery Explorer 1000 Pro rymmer 1 002 wattimmar, lämnar 1 000 watt och kostar 6 196 kronor. Den är billigast per wattimme på hela sidan, och den är samtidigt det köp som kostar mest i längden.\n\n**6,18 kronor per wattimme är verkligen billigt.** Närmaste konkurrent i samma storlek kostar 8,59, och den dyraste på sidan 13,25. Du får tusen wattimmar, tusen watt kontinuerligt och två tusen i topp för 2 600 kronor mindre än Delta 3, med ren sinusvåg utskriven och 30 decibel vid drift. För den som behöver kapacitet en handfull gånger om året, alltså en sommarstuga, ett par helger eller ett strömavbrott, är den räkningen svår att argumentera emot.\n\n**Skillnaden ligger i cellen, och den kostar mer än den syns.** Batteriet är ternär litium och klarar 1 000 cykler innan kapaciteten fallit till 80 procent. Litiumjärnfosfat i den här jämförelsen ligger på mellan 3 000 och 4 000. Laddar du och tömmer den varje vecka är det nitton år mot fem, och räknat på hur mycket energi produkten levererar under sin livstid vänder priset helt: 6,18 kronor per wattimme gånger en fjärdedel så många cykler är dyrare per uttagen kilowattimme än Delta 3 på 8,59. Ternär litium är dessutom den kemi som tål värme sämst, vilket spelar roll i en bil på sommaren.\n\nDen har också bara två vägguttag mot fyra hos konkurrenterna i samma storlek, och laddar på nästan två timmar mot deras femtio minuter. Fem års garanti mildrar det, men garantin täcker fel och inte den normala åldringen som cykeltalet beskriver.\n\nSka stationen arbeta varje vecka ska du inte köpa den här. Tusen cykler är slut på fem år vid det bruket, och EcoFlow Delta 3 blir då billigare per uttagen kilowattimme trots att den kostar 2 600 kronor mer i kassan. Används den ett par helger om året och sedan står still är räkningen den omvända, och då är det här jämförelsens bästa affär.",
  },
  {
    id: "togopower-advance-650",
    brand: "TogoPower",
    name: "Advance 650 portabel powerstation 634 Wh",
    shortName: "TogoPower Advance 650",
    image: productImage(POWERSTATION.slug, "togopower-advance-650"),
    tagline: "634 wattimmar och ren sinusvåg för 5 495 kronor.",
    scores: {
      /* 634 Wh och 500 W kontinuerligt, alltså mellanklass. */
      energi: 3.5,
      /* 18650-litium enligt tillverkarens egen bruksanvisning, alltså samma
         cellfamilj som Cocraft och inte LiFePO4, plus tolv månaders garanti
         som är kortast i jämförelsen. Höjd från 1,0 den 2026-08-06: betyget
         satt tidigare på att ingenting gick att läsa, vilket var vår research
         och dessutom fel — manualen fanns hos tillverkaren. Cykeltalet är
         fortfarande okänt och räknas inte. Se lib/corrections.ts. */
      livslangd: 1.5,
      /* 100 W in enligt manualen, MPPT-regulator och display som visar in-
         och uteffekt. Höjd från 2,0: avdraget gällde laddtid och ljudnivå
         som vi inte fått fram. */
      drift: 3,
      /* 6,8 kg är mitten av fältet, och tillverkaren anger att den inte tål
         väta. Antalet 230 V-uttag är inte fastställt för den svenska
         artikeln och räknas inte. */
      barbarhet: 3,
      /* 8,67 kr/Wh, alltså bättre än halva fältet. */
      prisvarde: 4,
    },
    price: 5495,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Prylstaden",
    merchantUrl:
      "https://www.prylstaden.se/togopower-advance-650-portable-powerstation-kraftstation-stromstation-ups-solcellsbatteri",
    userRating: { value: 5, count: 2, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst pris i mellanklassen",
    pros: [
      "634 wattimmar för 5 495 kronor, alltså 8,67 kronor per wattimme",
      "500 watt kontinuerligt och 1 000 watt topp",
      "Ren sinusvåg",
      "MPPT-regulator för solladdning",
      "Display som visar både in- och uteffekt samtidigt",
      "6,8 kilo, alltså hälften av de stora",
    ],
    cons: [
      "Tolv månaders garanti, alltså kortast här; Anker och EcoFlow ger fem år",
      "18650-litium i stället för litiumjärnfosfat, alltså färre laddningar innan kapaciteten faller",
      "Tillverkaren anger att den inte tål väta, så den ska stå under tak",
      "Tar emot högst 100 watt in, så den fylls över natten och inte över lunchen",
      "Enda produkten här från en tillverkare utan svensk närvaro, och modellen har utgått ur deras eget sortiment",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "5 495 kr", highlight: true },
      { label: "Energi", shortLabel: "Energi", value: "634 Wh", highlight: true },
      {
        label: "Kontinuerlig effekt",
        shortLabel: "Effekt",
        value: "500 W",
        highlight: true,
      },
      { label: "Toppeffekt", shortLabel: "Topp", value: "1 000 W", highlight: true },
      /* Tillverkarens egen bruksanvisning, `Advance_Series_240_330_350_650_
         User_Manual.pdf`, hämtad från togopower.com/pages/manual-download
         2026-08-06: "Battery — 18650 Lithium Battery", "Capacity — 634Wh
         (22.2V 28.6Ah)". Dokumentet är en bildskannad PDF utan textlager,
         vilket är skälet till att tidigare sökningar kom tillbaka tomma.
         Stod som `Ej angiven` till 2026-08-06. */
      {
        label: "Cellkemi",
        shortLabel: "Batteri",
        value: "Litiumjon (18650)",
        highlight: true,
      },
      {
        label: "Cykler till 80 %",
        shortLabel: "Cykler",
        value: "Ej angiven",
        highlight: true,
      },
      /* Manualen anger 7 kg, Prylstaden 6,8 kg för den svenska artikeln. Vi
         behåller butikens tal för varan som säljs här och noterar avvikelsen
         i .agent/research/powerstation.md. */
      { label: "Vikt", shortLabel: "Vikt", value: "6,8 kg", highlight: true },
      {
        label: "Antal 230 V-uttag",
        shortLabel: "230 V",
        value: "Ej angiven",
        highlight: true,
      },
      {
        label: "Laddtid till 100 %",
        shortLabel: "Laddtid",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Ej angiven", highlight: true },
      /* Bruksanvisningen, tier A: "It's not waterproof, do not expose to
         liquids" och "DO NOT expose the ADVANCE to moisture, rain, or snow".
         Alltså belagd frånvaro av skydd, inte en okänd uppgift — samma
         läsning som för de två Cocraft-modellerna. */
      { label: "IP-klass", shortLabel: "IP", value: "Ingen", highlight: true },
      { label: "Vågform", value: "Ren sinusvåg" },
      { label: "Solladdning max", value: "MPPT, 100 till 120 W panel" },
      { label: "Laddeffekt in max", value: "100 W" },
      { label: "Mått", value: "290 × 201 × 200 mm" },
      { label: "Display", value: "Ja, visar in- och uteffekt samtidigt" },
      /* Manualens garantiavsnitt: "limited warranty ... under consumer for 12
         months from the date of purchase". Kortast i jämförelsen. */
      { label: "Garanti", value: "1 år" },
      { label: "Artikelnummer", value: "tg-adv-650" },
    ],
    verdict:
      "TogoPower Advance 650 rymmer 634 wattimmar, lämnar 500 watt och kostar 5 495 kronor. Det är 8,67 kronor per wattimme, alltså näst billigast i jämförelsen, och den lagrar nästan lika mycket som en Anker Solix C800x som kostar nitton hundra kronor mer.\n\n**Femhundra watt kontinuerligt och tusen i topp täcker mellanklassens vanligaste bruk.** Dator, kylbox, belysning och en mindre pump går utan vidare, och tusen watt i startögonblicket tar rycket när en kompressor drar igång. Ren sinusvåg gör att elektronik och laddare beter sig som hemma i vägguttaget. MPPT-regulatorn håller solpanelen på sin bästa arbetspunkt när molnen kommer och går, och displayen visar in- och uteffekt samtidigt, vilket är enda sättet att se om det är panelen eller stationen som begränsar.\n\n**Batteriet är byggt av 18650-celler, alltså samma cylindriska litiumjon som Cocraft använder och inte litiumjärnfosfat.** Den kemin tål färre laddningar innan kapaciteten faller och åldras snabbare i värme, vilket spelar roll i en husvagn på sommaren. Garantin är dessutom tolv månader, mot fem år hos Anker, EcoFlow och Jackery. Det är den kortaste utfästelsen i jämförelsen, och den kommer på en station som kostar över fem tusen.\n\nVikten är däremot rimlig, 6,8 kilo, alltså ungefär hälften av de stora och en och en halv gång River 3 Plus. Den bärs till bilen och in i husvagnen utan att bli ett projekt. Tillverkaren skriver samtidigt rakt ut att den inte tål väta, så den ska stå under tak.\n\n8,67 kronor per wattimme är ett riktigt pris i mellanklassen, och för en husvagn som rullar några veckor om sommaren räcker stationen gott. Anker Solix C800x kostar nitton hundra kronor mer och svarar med tre tusen laddcykler, fem års garanti och en tillverkare som fortfarande säljer modellen.",
  },
  {
    id: "cocraft-advance-500-386",
    brand: "Cocraft",
    name: "Advance 500 powerstation, 386 Wh",
    shortName: "Cocraft Advance 500",
    image: productImage(POWERSTATION.slug, "cocraft-advance-500-386"),
    tagline: "Mest lagrad energi under fyra tusen kronor.",
    scores: {
      /* 386 Wh och 500 W kontinuerligt. Ett 230 V-uttag. */
      energi: 3,
      /* Litiumjon 18650, alltså cylindriska celler av samma familj som
         Jackerys ternära litium och inte LiFePO4. Betyget sätts på kemin,
         som står i bruksanvisningen. Cykeltalet är okänt och räknas inte. */
      livslangd: 1.5,
      /* 100 W in och solpanelsadapter i kartongen, ingen MPPT angiven. Höjd
         från 2,0 den 2026-08-06: avdraget gällde laddtid och ljudnivå som vi
         inte fått fram, alltså vår research. Se lib/corrections.ts. */
      drift: 2.5,
      /* 4,0 kg är näst lättast, men bara ett 230 V-uttag. */
      barbarhet: 3.5,
      /* 9,84 kr/Wh, alltså strax över mitten. */
      prisvarde: 3,
    },
    price: 3799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Cocraft-Advance-500-powerstation,-portabel-el,-386-Wh/p/46-1461",
    superlative: "Bäst med arbetslampa till garaget",
    pros: [
      "386 wattimmar, alltså mest lagrad energi under fyra tusen kronor",
      "500 watt kontinuerligt räcker till dator, kylbox och belysning",
      "1 000 watt starteffekt tar rycket när en kompressor drar igång",
      "Ren sinusvåg, alltså samma strömkvalitet som ur vägguttaget hemma",
      "4,0 kilo, alltså näst lättast i jämförelsen",
      "USB-C som laddar åt båda hållen med 100 watt",
      "Arbetsbelysning och ficklampa med SOS-läge inbyggda",
      "Adapterkabel för solpanel ingår i stället för att kosta extra",
    ],
    cons: [
      "Litiumjon 18650 i stället för litiumjärnfosfat, alltså färre laddningar innan kapaciteten faller",
      "Bara ett 230 V-uttag, så en grendosa behövs så fort två saker ska drivas",
      "Bruksanvisningen varnar uttryckligen för fukt och väta, och någon kapslingsklass finns inte",
      "Ingen app, till skillnad från Ankers och EcoFlows stationer i samma prisklass",
      "Tar emot högst 100 watt in, så den fylls över natten och inte över lunchen",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "3 799 kr", highlight: true },
      { label: "Energi", shortLabel: "Energi", value: "386 Wh", highlight: true },
      {
        label: "Kontinuerlig effekt",
        shortLabel: "Effekt",
        value: "500 W",
        highlight: true,
      },
      { label: "Toppeffekt", shortLabel: "Topp", value: "1 000 W", highlight: true },
      { label: "Cellkemi", shortLabel: "Batteri", value: "Litiumjon", highlight: true },
      {
        label: "Cykler till 80 %",
        shortLabel: "Cykler",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Vikt", shortLabel: "Vikt", value: "4,0 kg", highlight: true },
      {
        label: "Antal 230 V-uttag",
        shortLabel: "230 V",
        value: "1 st",
        highlight: true,
      },
      {
        label: "Laddtid till 100 %",
        shortLabel: "Laddtid",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Ej angiven", highlight: true },
      /* Bruksanvisningen, tier A, säger ordagrant "Utsätt aldrig produkten för
         höga/låga temperaturer, dammig miljö, starka vibrationer, stötar, fukt
         eller väta". Ingen kapslingsklass finns och skyddet är uttryckligen
         inget. Samma läsning för Advance 240, som delar handbok. */
      { label: "IP-klass", shortLabel: "IP", value: "Ingen", highlight: true },
      { label: "Vågform", value: "Ren sinusvåg" },
      /* Bruksanvisningen, tier A, läst 2026-08-06: en USB-C PD3.0 som är både
         in- och utgång på 100 W, plus en USB-C PD3.0 på 60 W ut och två
         USB-A QC3.0 på 36 W totalt. Raden angav tidigare bara 60 W-porten. */
      { label: "USB-portar", value: "2× USB-C (100 W in/ut + 60 W), 2× USB-A 36 W" },
      { label: "Laddeffekt in max", value: "100 W" },
      { label: "12 V-uttag", value: "1 st, 10 A" },
      { label: "Mått", value: "230 × 168 × 178 mm" },
      { label: "Inbyggd belysning", value: "Ja, arbetslampa och ficklampa med SOS" },
      { label: "Artikelnummer", value: "46-1461" },
    ],
    verdict:
      "Cocraft Advance 500 rymmer 386 wattimmar, lämnar 500 watt och kostar 3 799 kronor. Det är mest lagrad energi under fyra tusen kronor, och hundra wattimmar mer än EcoFlow River 3 Plus som kostar nio kronor mindre.\n\n**Femhundra watt räcker till mer än de flesta tror.** En bärbar dator drar 60 watt, en kompressorkylbox 50, en router 10 och en LED-arbetslampa 20. Det som inte går är värme: vattenkokare, hårtork och kaffebryggare ligger över gränsen. De 386 wattimmarna ger kylboxen drygt ett dygn eller datorn fem laddningar, och starteffekten på 1 000 watt tar rycket i sekunden när kompressorn drar igång.\n\n**Den är byggd för ett garage snarare än ett vardagsrum.** Arbetsbelysningen och ficklampan med SOS-läge sitter inbyggda, adapterkabeln för solpanel ligger i kartongen i stället för att kosta ett par hundra extra, och USB-C-porten laddar 100 watt åt båda hållen, alltså både fyller stationen och driver en dator i full fart. Vid 4,0 kilo lyfter du den med en hand upp på en arbetsbänk.\n\nBatteriet är det som skiljer den från de dyrare. Cellerna är litiumjon av typen 18650, samma cylindriska familj som Jackery använder och inte litiumjärnfosfat, vilket betyder färre laddningar innan kapaciteten faller och snabbare åldrande i värme. Ett enda 230-voltsuttag och 100 watt in är de andra begränsningarna: två apparater kräver grendosa, och en tom station fylls över natten.\n\nUnder fyra tusen kronor finns ingen som lagrar mer, och för ett garage som behöver ström några gånger om året räcker det argumentet hela vägen. EcoFlow River 3 Plus kostar nio kronor mindre, rymmer hundra wattimmar mindre och håller tre gånger fler laddningar. Ska stationen användas varje vecka är det den du ska ha i stället.",
  },
  {
    id: "anker-solix-c300x-288",
    brand: "Anker",
    name: "Solix C300x portabel powerstation",
    shortName: "Anker C300x",
    image: productImage(POWERSTATION.slug, "anker-solix-c300x-288"),
    tagline: "288 wattimmar, 25 decibel och app för 2 599 kronor.",
    scores: {
      /* 288 Wh och 300 W kontinuerligt. Två 230 V-uttag i litet format. */
      energi: 2.5,
      /* LiFePO4 med 3 000+ cykler till 80 procent och fem års garanti, båda
         ur Ankers eget datablad för A1723, matchat på GTIN. Höjd från 3,5 den
         2026-08-06: sidan publicerade cykeltalet som `Ej angiven` och drog av
         för det, och talet fanns hos tillverkaren hela tiden. Det var alltså
         ett avdrag för vår research. Se lib/corrections.ts. */
      livslangd: 4.5,
      /* 68 minuter till full, 25 dB, UPS 10 ms, 280 W ut via USB. */
      drift: 4,
      /* 4,1 kg och två 230 V-uttag. */
      barbarhet: 4,
      /* 9,02 kr/Wh och sidans näst lägsta pris. */
      prisvarde: 4,
    },
    price: 2599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/belysning-elprodukter/powerstation/anker-solix-c300x-portabel-powerstation/826250",
    userRating: { value: 5, count: 8, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst liten till hemmakontoret",
    pros: [
      "25 decibel, alltså tystare än ett vanligt rum",
      "280 watt ut via USB räcker till två datorer",
      "Tre USB-C-portar och två 230 V-uttag",
      "Litiumjärnfosfat med 3 000 cykler till 80 procent och fem års garanti",
      "Omkoppling på 10 millisekunder vid strömavbrott",
      "4,1 kilo och app med batteristatus",
      "2 599 kronor är sidans näst lägsta pris",
    ],
    cons: [
      "288 wattimmar räcker till en dator i ungefär fyra timmar",
      "300 watt kontinuerligt utesluter allt som värmer",
      "Bara två 230 V-uttag mot fyra på de stora Ankermodellerna",
      "Tar emot 100 watt solpanel, alltså minst i jämförelsen",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 599 kr", highlight: true },
      { label: "Energi", shortLabel: "Energi", value: "288 Wh", highlight: true },
      {
        label: "Kontinuerlig effekt",
        shortLabel: "Effekt",
        value: "300 W",
        highlight: true,
      },
      /* Ankers datablad för A1723 anger `AC Surge Power 600W`, och samma 600 W
         marknadsförs som SurgePad. Talen sammanfaller alltså; raderna bär en
         uppgift och inte två. Läst 2026-08-06, matchat på GTIN. */
      {
        label: "Toppeffekt",
        shortLabel: "Topp",
        value: "600 W",
        highlight: true,
      },
      { label: "Boosteffekt", value: "600 W (SurgePad)" },
      { label: "Cellkemi", shortLabel: "Batteri", value: "LiFePO4", highlight: true },
      /* Ankers datablad för A1723, GTIN 0194644298845: `Cycle Life 3000+ (to
         80%)`. Stod som `Ej angiven` till 2026-08-06. */
      {
        label: "Cykler till 80 %",
        shortLabel: "Cykler",
        value: "3 000+",
        highlight: true,
      },
      { label: "Vikt", shortLabel: "Vikt", value: "4,1 kg", highlight: true },
      {
        label: "Antal 230 V-uttag",
        shortLabel: "230 V",
        value: "2 st",
        highlight: true,
      },
      {
        label: "Laddtid till 100 %",
        shortLabel: "Laddtid",
        value: "1 h 8 min",
        highlight: true,
      },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "25 dB", highlight: true },
      { label: "IP-klass", shortLabel: "IP", value: "Ej angiven", highlight: true },
      { label: "UPS-omkoppling", value: "10 ms" },
      /* Ankers datablad för A1723: `Solar Input Power 11-28V 8.2A (100W Max)`,
         MPPT-stöd ja. Läst 2026-08-06. */
      { label: "Solladdning max", value: "100 W, MPPT" },
      { label: "USB-portar", value: "3× USB-C, 1× USB-A, 280 W totalt" },
      { label: "12 V-uttag", value: "1 st, 120 W" },
      { label: "Display", value: "Ja" },
      { label: "App", value: "Ja" },
      { label: "Inbyggd belysning", value: "Ja, tre lägen och SOS" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "A1723311" },
      { label: "GTIN", value: "0194644298845" },
    ],
    verdict:
      "Anker Solix C300x rymmer 288 wattimmar, lämnar 300 watt och kostar 2 599 kronor. Den är sidans näst billigaste och den enda lilla som är byggd för att stå bredvid en dator.\n\n**280 watt ut via USB är det ovanliga här.** Tre USB-C-portar delar på nästan hela stationens effekt, vilket betyder att två bärbara datorer kan laddas på full fart samtidigt utan att ett enda 230-voltsuttag används. Vägen via USB-C är dessutom effektivare än via växelriktaren, eftersom strömmen slipper omvandlas till 230 volt och tillbaka igen, så du får ut mer av batteriet. Det gör den till en annan sorts produkt än de övriga små: en arbetsplats som fortsätter fungera, inte en reserv för hela hushållet.\n\n**Tjugofem decibel och tio millisekunder hör ihop med samma bruk.** Den hörs knappt i ett kontorsrum, och när strömmen går kopplar den om så snabbt att en dator inte hinner starta om. Batteriet är litiumjärnfosfat med 3 000 cykler till 80 procents kapacitet, alltså samma tioårsklass som stationerna för tre gånger priset, garantin är fem år, och den fylls på drygt en timme. Två 230-voltsuttag, en app som visar återstående drifttid och en inbyggd lampa hör till samma paket. Vid 4,1 kilo följer den med i en ryggsäck om det behövs.\n\nBegränsningen är storleken, och den är verklig. 288 wattimmar driver en dator i ungefär fyra timmar utöver dess eget batteri, eller en router och några lampor i ett dygn. 300 watt kontinuerligt betyder att allt som värmer är uteslutet, och SurgePad-läget på 600 watt når sina watt genom att sänka spänningen, vilket bara fungerar på just värmande last och inte på motorer.\n\nKöp den till hemmakontoret, till en helg med kamerautrustning eller som den lilla reserven som håller router och telefoner igång. Ska ett kylskåp gå ett dygn behöver du fyra gånger så mycket batteri, och då är Anker Solix C800x rätt produkt.",
  },
  {
    id: "ecoflow-river-3-245",
    brand: "EcoFlow",
    name: "River 3 powerstation, portabel ström",
    shortName: "EcoFlow River 3",
    image: productImage(POWERSTATION.slug, "ecoflow-river-3-245"),
    tagline: "IP54, 3 000 cykler och 3,5 kilo för 3 190 kronor.",
    scores: {
      /* 245 Wh och 300 W kontinuerligt. Ett enda 230 V-uttag. */
      energi: 2,
      /* LiFePO4 med 3 000 cykler till 80 procent, alltså samma celler som
         systermodellen River 3 Plus. Höjd från 4,0 den 2026-08-06, då IP54
         flyttade till barbarhet och betyget annars skilde sig från
         River 3 Plus utan sakskäl. */
      livslangd: 4.5,
      /* 80 procent på 45 minuter, 30 dB, men bara 110 W solpanel och
         omkoppling på 20 ms i stället för 10. */
      drift: 3.5,
      /* 3,5 kg med IP54 på batteripaketet är bästa vikt-till-tålighet i
         jämförelsen, men bara ett 230 V-uttag. */
      barbarhet: 4,
      /* 13,02 kr/Wh, alltså näst dyrast per wattimme. */
      prisvarde: 2,
    },
    price: 3190,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/EcoFlow-River-3-powerstation,-portabel-strom/p/36-373",
    userRating: { value: 4.5, count: 31, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för tält och brygga",
    pros: [
      "3,5 kilo, alltså näst lättast i jämförelsen",
      "IP54 på batteripaketet, alltså provat mot damm och stänk",
      "Litiumjärnfosfat med 3 000 cykler till 80 procent",
      "80 procents laddning på 45 minuter",
      "Under 30 decibel",
      "600 watt topp, alltså dubbla märkeffekten när något startar",
      "App via Bluetooth och wifi",
    ],
    cons: [
      "245 wattimmar är minst i jämförelsen",
      "Bara ett 230 V-uttag, så en grendosa behövs för två saker",
      "13,02 kronor per wattimme",
      "Omkoppling på 20 millisekunder, dubbelt mot systermodellen",
      "Solpanel upp till 110 watt, alltså halva vad River 3 Plus tar emot",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "3 190 kr", highlight: true },
      { label: "Energi", shortLabel: "Energi", value: "245 Wh", highlight: true },
      {
        label: "Kontinuerlig effekt",
        shortLabel: "Effekt",
        value: "300 W",
        highlight: true,
      },
      /* EcoFlows egen tabell, uk.ecoflow.com 2026-08-06: "1 outlets, 300W
         total (Surge 600W, X-Boost 600W)". Topp och boost sammanfaller. */
      {
        label: "Toppeffekt",
        shortLabel: "Topp",
        value: "600 W",
        highlight: true,
      },
      { label: "Boosteffekt", value: "600 W (X-Boost)" },
      { label: "Cellkemi", shortLabel: "Batteri", value: "LiFePO4", highlight: true },
      {
        label: "Cykler till 80 %",
        shortLabel: "Cykler",
        value: "3 000",
        highlight: true,
      },
      { label: "Vikt", shortLabel: "Vikt", value: "3,5 kg", highlight: true },
      {
        label: "Antal 230 V-uttag",
        shortLabel: "230 V",
        value: "1 st",
        highlight: true,
      },
      {
        label: "Laddtid till 100 %",
        shortLabel: "Laddtid",
        value: "60 min",
        highlight: true,
      },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Under 30 dB", highlight: true },
      { label: "IP-klass", shortLabel: "IP", value: "IP54 (batteripaket)", highlight: true },
      { label: "UPS-omkoppling", value: "20 ms" },
      { label: "Solladdning max", value: "110 W" },
      { label: "USB-portar", value: "1× USB-C 100 W, 2× USB-A" },
      { label: "12 V-uttag", value: "1 st" },
      { label: "Display", value: "Ja" },
      { label: "App", value: "Ja" },
      { label: "Artikelnummer", value: "36-373" },
    ],
    verdict:
      "EcoFlow River 3 rymmer 245 wattimmar, lämnar 300 watt och kostar 3 190 kronor. Den väger 3,5 kilo och är den enda i den vikten som tål väder.\n\n**IP54 på en station som väger tre och ett halvt kilo är kombinationen som gör den värd att titta på.** Sifferparet betyder att batteripaketet är provat mot damm och stänk, alltså att en regnskur på bryggan inte är någon katastrof. EcoFlow är noga med att klassen gäller just paketet och inte hela lådan, så den ska fortfarande inte stå ute över natten, men marginalen är större än hos de torra konkurrenterna. Batteriet är litiumjärnfosfat med 3 000 cykler till 80 procent, vilket är samma tioårsklass som stationerna för dubbla priset. Den fylls till 80 procent på 45 minuter och hörs under 30 decibel.\n\n**Kapaciteten är samtidigt sidans minsta**, och det ska tas på allvar. 245 wattimmar laddar en telefon femton gånger, en dator två till tre, eller driver en router och en lampa ett dygn. En kylbox tömmer den på en halv dag. Trehundra watt kontinuerligt utesluter allt som värmer, och X-Boost-läget på 600 watt når sitt tal genom att sänka spänningen, vilket bara hjälper på just värmande last. Ett enda 230-voltsuttag betyder dessutom att en grendosa följer med så fort två saker ska drivas.\n\nPrislappen per wattimme är därför hög: 13,02 kronor, näst dyrast på sidan. Systermodellen River 3 Plus kostar 600 kronor mer och ger 41 wattimmar till, dubbla effekten, tre uttag och halva omkopplingstiden, vilket är en bättre affär i nästan varje läge.\n\nSexhundra kronor skiljer upp till systermodellen River 3 Plus, och för dem får du dubbla effekten, tre uttag i stället för ett och 41 wattimmar till. Finns de pengarna är det den du ska ha. Finns de inte är det här den lättaste vägen till ett riktigt vägguttag som dessutom tål en regnskur.",
  },
  {
    id: "cocraft-advance-240-231",
    brand: "Cocraft",
    name: "Advance 240 Power Station",
    shortName: "Cocraft Advance 240",
    image: productImage(POWERSTATION.slug, "cocraft-advance-240-231"),
    tagline: "2,75 kilo, alltså den som faktiskt följer med.",
    scores: {
      /* 231 Wh och 200 W kontinuerligt, alltså minst i jämförelsen. */
      energi: 1.5,
      /* Litiumjon 18650 enligt bruksanvisningen, alltså inte LiFePO4.
         Betyget sätts på kemin. Cykeltalet är okänt och räknas inte. */
      livslangd: 1.5,
      /* Ingång på högst 48 W, alltså lägsta laddeffekten i jämförelsen och
         en publicerad egenskap. Bruksanvisningen, tier A. */
      drift: 1.5,
      /* 2,75 kg är sidans lättaste med god marginal. */
      barbarhet: 4.5,
      /* 8,65 kr/Wh och sidans lägsta pris. */
      prisvarde: 4,
    },
    price: 1999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Cocraft-Advance-240-Power-Station/p/36-9571",
    userRating: { value: 4, count: 27, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst första powerstation",
    pros: [
      "2,75 kilo, alltså lättast i jämförelsen med god marginal",
      "1 999 kronor, alltså lägsta priset in i klassen",
      "Ren sinusvåg, alltså samma strömkvalitet som ur vägguttaget hemma",
      "400 watt starteffekt mot 200 watt kontinuerligt, alltså dubbel marginal i startögonblicket",
      "Ficklampa med SOS-läge inbyggd",
      "Adapterkabel för solpanel ingår i stället för att kosta extra",
      "Displayen visar återstående drifttid och laddtid i timmar och minuter",
    ],
    cons: [
      "231 wattimmar är minst i jämförelsen",
      "200 watt kontinuerligt utesluter allt som värmer",
      "Litiumjon 18650 i stället för litiumjärnfosfat, alltså färre laddningar innan kapaciteten faller",
      "Tar emot högst 48 watt in, alltså den långsammaste påfyllningen här",
      "Ett enda 230 V-uttag och ingen app",
      "Bruksanvisningen varnar uttryckligen för fukt och väta, och någon kapslingsklass finns inte",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 999 kr", highlight: true },
      { label: "Energi", shortLabel: "Energi", value: "231 Wh", highlight: true },
      {
        label: "Kontinuerlig effekt",
        shortLabel: "Effekt",
        value: "200 W",
        highlight: true,
      },
      { label: "Toppeffekt", shortLabel: "Topp", value: "400 W", highlight: true },
      { label: "Cellkemi", shortLabel: "Batteri", value: "Litiumjon", highlight: true },
      {
        label: "Cykler till 80 %",
        shortLabel: "Cykler",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Vikt", shortLabel: "Vikt", value: "2,75 kg", highlight: true },
      {
        label: "Antal 230 V-uttag",
        shortLabel: "230 V",
        value: "1 st",
        highlight: true,
      },
      {
        label: "Laddtid till 100 %",
        shortLabel: "Laddtid",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Ej angiven", highlight: true },
      { label: "IP-klass", shortLabel: "IP", value: "Ingen", highlight: true },
      { label: "Vågform", value: "Ren sinusvåg" },
      { label: "USB-portar", value: "1× USB-C 60 W, 2× USB-A 36 W" },
      /* Bruksanvisningen, tier A, läst 2026-08-06: "Input (charging) DC 12−28 V,
         max. 48 W". Lägsta laddeffekten i jämförelsen. */
      { label: "Laddeffekt in max", value: "48 W" },
      { label: "12 V-uttag", value: "1 st, 10 A" },
      { label: "Mått", value: "192 × 142 × 148 mm" },
      { label: "Inbyggd belysning", value: "Ja, ficklampa med SOS" },
      { label: "Artikelnummer", value: "36-9571" },
    ],
    verdict:
      "Cocraft Advance 240 rymmer 231 wattimmar, lämnar 200 watt och kostar 1 999 kronor. Det är lägsta priset in i klassen, och den enda som väger under tre kilo.\n\n**2,75 kilo är produktens hela argument, och det är ett bra argument.** Näst lättaste stationen väger 3,5 kilo, den tyngsta 12,5. Vid under tre kilo hamnar den i ryggsäcken utan att du tänker på det, och det avgör om den följer med på fisketuren eller står kvar i garaget. Att den ändå har ett riktigt 230-voltsuttag med ren sinusvåg är skillnaden mot en powerbank: en laddare med stickpropp fungerar, och det gör den inte i en USB-port hur många milliamperetimmar den än har.\n\n**Starteffekten är dubbla märkeffekten**, alltså 400 watt mot 200, vilket är den marginal som avgör om en pump eller en liten kompressor kommer igång över huvud taget. Displayen räknar dessutom ut återstående drifttid och laddtid i timmar och minuter medan du tittar på den, så du slipper räkna på wattimmar i huvudet vid tältet. Ficklampan med SOS-läge och solpanelsadaptern ligger i kartongen.\n\nTvåhundra watt är samtidigt lite. En bärbar dator på 60 watt går bra, en router och några lampor likaså, men en kylbox med kompressor ligger nära gränsen och allt som värmer är uteslutet. 231 wattimmar räcker till telefonen tolv gånger eller datorn två. Cellerna är litiumjon av typen 18650 och inte litiumjärnfosfat, och den tar bara emot 48 watt in, vilket är den långsammaste påfyllningen här.\n\nKöp den som första powerstation, till tältet, till husvagnen eller som något att ha stående inför nästa strömavbrott. Ska den driva en kylbox en helg är den för liten, och då börjar rätt storlek runt 400 wattimmar.",
  },
];

export const POWERSTATION_PRODUCTS = resolveProducts(POWERSTATION, SEEDS);

/**
 * Övervägda och bortvalda. Varje rad har ett verkligt skäl och en kontrollerad
 * butikslänk.
 */
export const POWERSTATION_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Cocraft",
    name: "Advance 500 Power Station, 400 Wh",
    approxPrice: 3799,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Cocraft-Advance-500-Power-Station/p/36-8703",
    reason:
      "Föregående utförande av den vi rankar, och den säljs parallellt till exakt samma pris under exakt samma namn. Skillnaden syns bara i artikelnumret och i ett tal inne i produkttiteln: 22,2 V och 18 Ah ger 400 wattimmar här mot 17,4 Ah och 386 i den nyare, vikten är 4,2 kilo mot 4,0, och den driver sex enheter samtidigt mot fem. Bruksanvisningens omslag säger 500 W / 400 Wh. Vi rankar den nyare eftersom det är den som är aktuell, men den här har 48 kundbetyg mot inga och är precis lika bra ett köp om den står på hyllan.",
  },
  {
    brand: "EcoFlow",
    name: "River 3 UPS portabel kraftstation 245 Wh",
    approxPrice: 3290,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/EcoFlow-River-3-Plus-portabel-powerstation-286-Wh/p/36-375",
    reason:
      "Samma 245 wattimmar, samma 300 watt och samma batteri som River 3 vi rankar, för hundra kronor mer. Det enda som skiljer är omkopplingstiden vid strömavbrott: under 10 millisekunder i stället för 20. Butiken skriver ut skillnaden själv. Två produkter som skiljer sig med tio tusendels sekund hjälper ingen som väljer, så vi rankar den billigare. Ska stationen sitta permanent bakom en stationär dator eller en server är de hundra kronorna däremot väl använda.",
  },
  {
    brand: "EcoFlow",
    name: "River 3 Max Plus powerstation 858 Wh, Qi2",
    approxPrice: 6999,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/EcoFlow-River-3-Plus-portabel-powerstation-286-Wh/p/36-375",
    reason:
      "858 wattimmar och trådlös laddning ovanpå locket, alltså mitt i det spann sidan rankar och tekniskt intressant. Den valdes bort eftersom effekten stannar på 600 watt kontinuerligt trots tre gånger så stort batteri som River 3 Plus, vilket gör den till en udda produkt: kapacitet för en helg men effekt för ett skrivbord. Anker Solix C800x kostar fyrahundra kronor mindre, ger 1 200 watt och löser samma behov bättre.",
  },
  {
    brand: "EcoFlow",
    name: "Trail 300 DC portabel powerstation 288 Wh",
    approxPrice: 2099,
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/belysning-elprodukter/powerstation/ecoflow-trail-300dc-portabel-powerstation/986781",
    reason:
      "288 wattimmar för 2 099 kronor är sidans billigaste energi, men den saknar 230-voltsuttag helt och lämnar bara 140 watt via 12 volt. Det är gränsen mellan en powerstation och en stor powerbank, och gränsen är inte vår: labbet som provat kategorin definierar en powerstation som en enhet med minst ett 230 V-uttag. Utan det kan du inte koppla in en vanlig stickpropp, vilket är hela poängen. Jämförs på /powerbank-20000 i stället.",
  },
  {
    brand: "Anker",
    name: "Solix C2000 Gen 2 portabel powerstation 2048 Wh",
    approxPrice: 11883,
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/belysning-elprodukter/powerstation/anker-solix-c2000-gen-2-portabel-power-station/1041188",
    reason:
      "Dubbelt så stor som den största här, 2 048 wattimmar och 2 400 watt kontinuerligt, och därmed i hemreservklassen som får en egen sida. Den tas ändå upp för en uppgifts skull: Ankers egen specifikation anger 2 400 watt kontinuerligt och 4 000 watt topp, medan Elgigantens strukturerade fält för samma streckkod anger 4 000 och Prisjakt anger 2 400. Samma artikel, tre säljkanaler, två olika svar på vad den orkar.",
  },
  {
    brand: "AllPowers",
    name: "S2000 Pro powerstation, 2400 W",
    approxPrice: 19999,
    merchant: "Prylstaden",
    merchantUrl: "https://www.prylstaden.se/catalogsearch/result/?q=powerstation",
    reason:
      "Ligger i klassen ovanför och kostar 19 999 kronor, alltså 68 procent mer än en Anker Solix C2000 Gen 2 med samma 2 400 watt och 2 048 wattimmar. Butiken är kategorins bästa affärsmässiga läge sett från vårt håll, vilket gör det värt att säga rakt ut att produkten är dyr för vad den är. Vi rankar deras Advance 650 i stället, som håller sig i klassen och prissätter sig rimligt.",
  },
  {
    brand: "AgfaPhoto",
    name: "PowerCube 300Pro portabel powerstation 278 Wh",
    approxPrice: 4199,
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/belysning-elprodukter/powerstation/agfaphoto-powercube-300pro-portabel-powerstation/622600",
    reason:
      "278 wattimmar för 4 199 kronor med 120 watt maximal effekt och ett enda 230-voltsuttag. Både priset per wattimme och effekten är sämre än Cocraft Advance 240, som kostar 2 200 kronor mindre och lämnar 200 watt. Den säljs dessutom av en tredjepartshandlare på Elgigantens marknadsplats och inte av Elgiganten själva, vilket gör garantivägen längre.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const POWERSTATION_FAQ = [
  {
    question: "Vad är skillnaden mellan en powerstation och en powerbank?",
    answer:
      "Ett 230-voltsuttag. Det är den gräns Stiftung Warentest själva drar när de skiljer produkterna åt: en powerstation har minst ett vanligt vägguttag, en powerbank har bara USB. Skillnaden är praktisk och inte teknisk finess. Med ett 230-voltsuttag kan du koppla in vad som helst som har stickpropp, alltså en laddare till kameran, en lampa, en pump eller en kylbox, medan en powerbank kräver att prylen laddas via USB. Storleken följer på det: powerbanks ligger på 18 till 100 wattimmar, powerstations börjar runt 200 och går upp mot 4 000. Vikten också, från 130 gram till över 50 kilo. Var uppmärksam på att flera säljare kallar stora powerbanks för bärbara kraftstationer utan att de har något vägguttag alls.",
  },
  {
    question: "Vad betyder talet i produktnamnet på en powerstation?",
    answer:
      "Det beror helt på tillverkaren, och det är kategorins största fälla. Cocraft Advance 500 lagrar 386 wattimmar och lämnar 500 watt, alltså är talet effekten. Cocraft Advance 240 lagrar 231 wattimmar och lämnar 200 watt, alltså är talet varken det ena eller det andra. Jackery Explorer 1000 Pro lagrar 1 002 wattimmar och lämnar 1 000 watt, alltså stämmer båda tolkningarna av en slump. TogoPower Advance 650 lagrar 634 wattimmar och lämnar 500 watt. EcoFlow numrerar inte alls utan använder namn som River 3 och Delta 3. Slutsatsen är enkel: läs aldrig kapaciteten ur modellnamnet. Leta upp wattimmarna, som beskriver hur länge något kan drivas, och den kontinuerliga effekten i watt, som beskriver vad som går att koppla in.",
  },
  {
    question: "Hur många watt behöver jag?",
    answer:
      "Räkna på det du faktiskt tänker koppla in, och räkna med värmen som gräns. En bärbar dator drar omkring 60 watt, en router 10, en LED-lampa 5 till 20, en kompressorkylbox 50 medan kompressorn går, och en projektor runt 200. Allt det ryms under 500 watt. Sedan kommer ett hopp: en vattenkokare drar 2 000 watt, en hårtork 1 800, en kaffebryggare 1 000 och en mikrovågsugn 1 200. Vill du kunna använda något av dem behöver du en station med minst 1 800 watt kontinuerligt. Elverktyg ligger däremellan och kräver dessutom marginal för startrycket, eftersom en motor drar två till tre gånger sin märkeffekt under den första sekunden. Det talet heter toppeffekt och står separat.",
  },
  {
    question: "Vad är X-Boost och SurgePad, och kan jag lita på de watten?",
    answer:
      "Det är lägen där stationen sänker utspänningen för att kunna driva mer effektkrävande utrustning än växelriktaren egentligen orkar. En EcoFlow River 3 Plus anger 600 watt kontinuerligt och X-Boost upp till 1 200. Talet är riktigt men det gäller inte allt. Sänkt spänning fungerar på resistiv last, alltså sådant som bara ska bli varmt: en värmefläkt, en kokplatta eller en glödlampa blir helt enkelt lite svalare respektive svagare. Det fungerar inte på utrustning med motor, kompressor eller elektronik, som kan gå fel eller ta skada av för låg spänning. Räkna därför alltid med den kontinuerliga effekten när du väljer, och betrakta boostläget som en bonus på just värmande apparater.",
  },
  {
    question: "Hur länge räcker en powerstation?",
    answer:
      "Dela kapaciteten i wattimmar med apparatens effekt i watt, och dra sedan av ungefär 15 procent för omvandlingsförluster. En station på 1 000 wattimmar driver alltså en router på 10 watt i runt 85 timmar, en bärbar dator på 60 watt i cirka 14, och en kylbox som i snitt drar 15 watt i drygt två dygn. Ett vanligt kylskåp landar också runt ett dygn, eftersom kompressorn står stilla större delen av tiden. Det som tömmer en powerstation snabbt är värme: en vattenkokare på 2 000 watt förbrukar en tredjedel av samma batteri på tio minuter. Räkna alltid på det du ska driva över tid och inte på det du ska driva en gång.",
  },
  {
    question: "Vilket batteri ska jag välja, LiFePO4 eller vanlig litiumjon?",
    answer:
      "Litiumjärnfosfat, förkortat LiFePO4 eller LFP, om stationen ska användas ofta. Den klarar 3 000 till 4 000 laddcykler innan kapaciteten fallit till 80 procent, mot omkring 1 000 för ternär litium och för de cylindriska 18650-cellerna i de billigare stationerna. Skillnaden är en faktor tre till fyra på hur mycket energi produkten levererar under sin livstid, och den syns inte i priset: den billigaste per wattimme i den här jämförelsen är också den med kortast livslängd. Räknar du om till kronor per uttagen kilowattimme över produktens liv vänder ordningen helt. Litiumjärnfosfat tål dessutom värme bättre, vilket spelar roll i en bil på sommaren eller i en husvagn. Ska stationen användas några gånger om året och sedan stå still är skillnaden mindre viktig.",
  },
  {
    question: "Kan jag ladda en powerstation med solpanel?",
    answer:
      "Ja, och de flesta har regulatorn inbyggd så att du bara kopplar in panelen. Två tal avgör hur bra det fungerar. Det ena är hur många watt panel stationen tar emot, och spannet är stort: 110 watt för de minsta och 500 för de största i den här jämförelsen. Det andra är om den har MPPT, en teknik som håller panelen på sin bästa arbetspunkt när ljuset ändras. Räkna med att en panel ger ungefär hälften av sin märkeffekt under en normal svensk sommardag, mindre i moln och betydligt mindre på vintern. En station på 500 wattimmar och en panel på 200 watt betyder alltså i praktiken en dag för en full laddning. Kabeln med MC4-kontakter ingår ibland och kostar annars några hundra kronor.",
  },
  {
    question: "Fungerar en powerstation som reservkraft vid strömavbrott?",
    answer:
      "Ja, för enskilda apparater, men inte för huset. En powerstation kopplas in med sladd och matar det du kopplar till den, alltså kylskåpet, routern, några lampor och telefonerna. Den kan inte mata husets fasta installation, och att koppla in den i en vägguttagskrets är både farligt och otillåtet. Kapaciteten sätter också en gräns: 1 000 wattimmar räcker till ett kylskåp ungefär ett dygn, inte till en vecka. Det som verkligen är värt att titta på är omkopplingstiden, alltså hur snabbt stationen tar över när nätet försvinner. Under 20 millisekunder märker en dator eller en router ingenting. Vill du ha reservvärme eller ström till hela hemmet är det ett fast batteri eller ett elverk du ska titta på i stället.",
  },
  {
    question: "Får jag ta med en powerstation på flyget?",
    answer:
      "Nej. Reglerna för litiumbatterier i flyg är skrivna i wattimmar, och gränsen går vid 160 wattimmar även med flygbolagets godkännande. Den minsta powerstationen i den här jämförelsen lagrar 231 wattimmar och den största 1 024, alltså ligger hela kategorin över gränsen. Det gäller både handbagage och incheckat bagage, och det går inte att ansöka om undantag som privatperson. Ska du ha batteri med på en flygresa är det powerbanksklassen som gäller, alltså upp till 100 wattimmar i handbagaget och aldrig i det incheckade. Färja, tåg och bil har inga motsvarande begränsningar för normalt privat bruk.",
  },
  {
    question: "Hur mycket låter en powerstation?",
    answer:
      "Mellan 20 och 40 decibel, och skillnaden är större än talen ser ut. Decibelskalan är logaritmisk, så 40 decibel upplevs ungefär fyra gånger så starkt som 20. Vid 20 decibel hörs stationen knappt i ett tyst rum. Vid 30 låter den ungefär som en tyst fläkt. Vid 40 hör du att den arbetar. Ljudet kommer från kylfläkten, och den går både när stationen laddas och när den lämnar hög effekt, vilket är skälet till att det labb som provat kategorin mätte i båda riktningarna. Talet gäller dessutom sällan hela arbetsområdet: EcoFlow Delta 3 ligger på 30 decibel upp till 600 watt och 40 decibel vid 1 200, alltså dubbelt så starkt upplevt när den arbetar hårt. Ska stationen stå i ett sovrum eller bredvid ett skrivbord är det tystaste alternativet Anker Solix C1000X Gen 2 på 20 decibel.",
  },
];
