import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { BLUETOOTH_HOGTALARE } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /bluetooth-hogtalare.
 *
 * Priser och specifikationer lästa på Elons egna produktsidor 2026-08-05 med
 * `scripts/fetch.mjs`.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans än. Se lib/links.ts.
 *
 * ## Avgränsningen
 *
 * Sidan rankar **bara de bärbara**, alltså under cirka två kilo, efter
 * användarbeslut 2026-08-05. Partihögtalare — Marshall Kilburn III på 2,8 kg,
 * Sony ULT Field 5 på 3,3 och Soundcore Boom 2 Pro på 3,8 — får en egen
 * systersida tillsammans med Partybox- och Boombox-serierna.
 *
 * ## FYNDET: batteriet blir utbytbart 18 februari 2027
 *
 * Förordning (EU) 2023/1542 artikel 11, läst i original på EUR-Lex. Undantaget
 * i 11.2 a gäller apparater byggda för nedsänkning i vatten, alltså just den
 * egenskap kategorin säljer på, och det flyttar bytet till en oberoende
 * yrkesutövare i stället för att ta bort kravet.
 *
 * ⚠️ Vi påstår **aldrig** att en namngiven högtalare kommer att omfattas av
 * undantaget, eller att den inte kommer att göra det. Bedömningen är
 * tillverkarens. Samma disciplin som passformen på /iphone-skal.
 *
 * ## Speltiden: en rad, och tillverkarens tal
 *
 * Sidan bar två speltidsrader, `Angiven speltid` och `Speltid i
 * specifikationen`, eftersom Elon trycker två olika tal i två rutor. Det är en
 * egenskap hos butikens produktsida och inte hos högtalaren, så raderna slogs
 * ihop 2026-08-06 och talen kontrollerades hos tillverkaren:
 *
 * - Flip 7: 14 h, bekräftat av Kjell oberoende av Elon (Elons säljpunkt: 16).
 * - Charge 6: 24 h (Elons säljpunkt: 28).
 * - Emberton III: **32 h enligt Marshall själva**, där Elon anger 30. Marshall
 *   skriver "32+ HOURS" på sin produktsida och "30+" på Middleton II, som Elon
 *   återger som 30. Elons 30 för Emberton III är sannolikt Emberton II:s tal.
 * - Charge Essential 3: 20 h, samstämmigt hos Clas Ohlson och Proshop.
 * - Urbanista Malibu: 20 h, ur Urbanistas egen spectabell. Stod som okänd.
 *
 * ## ⚠️ Vikten kommer inte från butiken — och inte från webbspectabellen heller
 *
 * Elon anger 1,23 kg för Flip 7 där Ljud & Bild anger 0,56. Vikterna nedan är
 * Ljud & Bilds för de fyra modeller de täcker och tillverkarens för övriga,
 * rimlighetsprövade mot batteriets wattimmar. Se lib/spec-schema.mjs.
 *
 * Samma fälla finns hos tillverkaren. Harman Kardons webbspectabell anger
 * `Vikt (kg) 1.13` för Luna, medan deras eget spec sheet skiljer på
 * **produktens vikt 0,71 kg** och **förpackningens vikt 1,13 kg**. Webbtabellen
 * publicerar kartongen. 710 g står kvar och är nu belagt i tier A.
 *
 * ## ⚠️ RÄTTAT 2026-08-06: powerbank var aldrig unikt för vinnaren
 *
 * Charge 6 bar "laddar telefonen, vilket ingen annan här gör" i en säljpunkt
 * och i omdömet. Fel på två sätt: Middleton II stod redan som "Ja" i sidans
 * egen tabell, och Charge Essential 3 har USB-C in/ut, belagt hos både Clas
 * Ohlson och Proshop, där cellen stod som "Ej angiven". Se lib/corrections.ts.
 *
 * ## ⚠️ Ljudet är inte betygsatt
 *
 * Ingen har satt poäng på ljudet i den här kategorin och vi har inte lyssnat på
 * en enda högtalare. Ljud & Bilds omdömen återges per modell med publikationen
 * namngiven, och de påverkar inga betyg.
 *
 * ## ⚠️ Sex av tio är JBL eller Harman Kardon
 *
 * Samma koncern. Det speglar Elons sortiment och inte vår urvalsvilja, och det
 * står utskrivet på sidan.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "jbl-charge-6",
    brand: "JBL",
    name: "Charge 6",
    shortName: "JBL Charge 6",
    image: productImage(BLUETOOTH_HOGTALARE.slug, "jbl-charge-6"),
    tagline: "34 wattimmar batteri som också laddar telefonen.",
    scores: { batteri: 5, talighet: 5, prisvarde: 5, barbarhet: 2.5, anslutning: 5 },
    price: 1690,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/jbl-charge-6-black-149674",
    award: "winner",
    superlative: "Bäst för dig som är borta hela helgen",
    pros: [
      "34 wattimmar och 24 timmars speltid, alltså en hel helg utan att leta efter ett uttag",
      "IP68, högsta klassningen här: tål att ligga under vatten och inte bara att bli blöt",
      "Laddar telefonen ur samma batteri via USB-C-porten",
    ],
    cons: [
      "1,37 kilo, alltså nästan fem gånger den lättaste, så den bärs i väska och inte i handen",
      "Kostar exakt lika mycket som Flip 7, som väger 810 gram mindre",
    ],
    specs: [
      { label: "Speltid", value: "24 h", highlight: true },
      { label: "Batterikapacitet", shortLabel: "Batteri", value: "34 Wh", highlight: true },
      { label: "IP-klass", value: "IP68", highlight: true },
      { label: "Vikt", value: "1 370 g", highlight: true },
      { label: "Bluetooth-version", shortLabel: "Bluetooth", value: "5.4", highlight: true },
      { label: "Batterityp", value: "Litiumpolymer, inbyggt" },
      { label: "Powerbank-funktion", value: "Ja, laddar telefon via USB-C" },
      { label: "Laddport", value: "USB-C" },
      { label: "Parkoppling av flera", value: "Auracast" },
      { label: "Bärlösning", value: "Avtagbar rem" },
      { label: "Flyter i vatten", value: "Nej" },
      { label: "Wifi", value: "Nej" },
      { label: "App", value: "JBL Portable" },
    ],
    verdict:
      "JBL Charge 6 kostar 1 690 kronor och bär 34 wattimmar batteri, mer än dubbelt så mycket som de flesta här och nästan sju gånger den minsta.\n\n**Batteriet räcker längre än helgen, och det är hela skälet att välja den.** 24 timmars speltid betyder fredag kväll, lördag på bryggan och söndag på altanen utan att någon behöver leta efter ett uttag. Samma batteri går att tappa åt andra hållet: sätter du telefonen i USB-C-porten laddar högtalaren den, och en telefon på tjugo procent klockan sex är det vanligaste skälet att bryta upp och gå hem. IP68 är högsta klassningen i jämförelsen, och åttan betyder att den tål att ligga under vatten och inte bara att bli blöt av regn.\n\nDen väger 1,37 kilo och kostar exakt lika mycket som Flip 7, som väger 810 gram mindre. Ska högtalaren ner i en jackficka lägger du pengarna på fel egenskap.\n\nKöp den här. Den har mest batteri, tåligast kapsling och lägst pris per wattimme av allihop, och den räddar telefonen när dagen blir lång. Ska högtalaren i stället klippas fast i en ryggsäcksrem eller på ett cykelstyre är JBL Clip 5 för 790 kronor den att ta.",
  },
  {
    id: "jbl-flip-7",
    brand: "JBL",
    name: "Flip 7",
    shortName: "JBL Flip 7",
    image: productImage(BLUETOOTH_HOGTALARE.slug, "jbl-flip-7"),
    tagline: "IP68 och 560 gram, i den storlek som får plats överallt.",
    scores: { batteri: 3, talighet: 5, prisvarde: 4, barbarhet: 4, anslutning: 4.5 },
    price: 1690,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/jbl-flip-7-black-149681",
    superlative: "Bäst tålighet per gram",
    pros: [
      "IP68 i en högtalare på 560 gram, alltså högsta klassningen i minsta formatet här",
      "Bluetooth 5.4 med Auracast, så flera högtalare kan spela samma sak",
      "Samma pris som storebror, men 810 gram lättare att bära",
    ],
    cons: [
      "14 timmars speltid mot storebrors 24, för samma pengar",
      "Ingen powerbank-funktion, så telefonen får klara sig själv",
    ],
    specs: [
      { label: "Speltid", value: "14 h", highlight: true },
      { label: "Batterikapacitet", shortLabel: "Batteri", value: "17,28 Wh", highlight: true },
      { label: "IP-klass", value: "IP68", highlight: true },
      { label: "Vikt", value: "560 g", highlight: true },
      { label: "Bluetooth-version", shortLabel: "Bluetooth", value: "5.4", highlight: true },
      { label: "Batterityp", value: "Litiumpolymer, inbyggt" },
      { label: "Powerbank-funktion", value: "Nej" },
      { label: "Laddport", value: "USB-C" },
      { label: "Parkoppling av flera", value: "Auracast" },
      { label: "Bärlösning", value: "Snöre" },
      { label: "Flyter i vatten", value: "Nej" },
      { label: "Wifi", value: "Nej" },
      { label: "App", value: "JBL Portable" },
    ],
    verdict:
      "JBL Flip 7 kostar 1 690 kronor, samma som Charge 6, och väger 560 gram mot dess 1 370.\n\n**Det du betalar för är tålighet i ett format som faktiskt följer med.** IP68 betyder att damm inte tar sig in och att den tål nedsänkning, och att få den klassningen i en högtalare som ryms i en jackficka är ovanligt: den enda andra IP68-produkten här väger nästan två och ett halvt gånger så mycket. Bluetooth 5.4 med Auracast gör att den kan spela synkront med andra Auracast-högtalare, vilket är det som gör två små högtalare till en stereouppställning på en altan. Ljud & Bild kallar den \"liten, men förvånansvärt potent\" och pekar på AI Sound Boost som JBL:s sätt att kompensera för storleken.\n\nBatteriet är där skillnaden mot storebror sitter. 14 timmar mot 24, och båda kostar 1 690 kronor. Betalar du samma summa får du alltså välja mellan tio timmar och 810 gram.\n\nTa den här om högtalaren ska med i väskan varje dag och tåligheten inte får kosta storlek. Ska den stå still på en altan hela helgen är Charge 6 samma pengar och mycket mer batteri.",
  },
  {
    id: "jbl-charge-essential-3",
    brand: "JBL",
    name: "Charge Essential 3",
    shortName: "Charge Essential 3",
    image: productImage(BLUETOOTH_HOGTALARE.slug, "jbl-charge-essential-3"),
    tagline: "27 wattimmar för 1 290 kronor.",
    scores: { batteri: 4, talighet: 4, prisvarde: 4.5, barbarhet: 3, anslutning: 4.5 },
    price: 1290,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/jbl-charge-essential-3-152897",
    award: "editor",
    superlative: "Mest batteri per krona",
    pros: [
      "27 wattimmar för 1 290 kronor, alltså lägst pris per wattimme i hela jämförelsen",
      "Laddar telefonen via USB-C, samma powerbank-funktion som den 400 kronor dyrare vinnaren",
      "Auracast, så den kan spela synkront med andra JBL-högtalare",
    ],
    cons: [
      "912 gram utan rem eller krok, alltså en högtalare som ställs ner och inte hängs upp",
      "IP67 i stället för vinnarens IP68, alltså ett dopp men inte en längre nedsänkning",
    ],
    specs: [
      { label: "Speltid", value: "20 h", highlight: true },
      { label: "Batterikapacitet", shortLabel: "Batteri", value: "27 Wh", highlight: true },
      { label: "IP-klass", value: "IP67", highlight: true },
      { label: "Vikt", value: "912 g", highlight: true },
      { label: "Bluetooth-version", shortLabel: "Bluetooth", value: "5.4", highlight: true },
      { label: "Batterityp", value: "Litiumjon, 3,6 V / 7 500 mAh" },
      { label: "Powerbank-funktion", value: "Ja, laddar telefon via USB-C" },
      { label: "Laddport", value: "USB-C" },
      { label: "Parkoppling av flera", value: "Auracast" },
      { label: "Bärlösning", value: "Ej angiven" },
      { label: "Flyter i vatten", value: "Nej" },
      { label: "Wifi", value: "Nej" },
      { label: "App", value: "JBL Portable" },
    ],
    verdict:
      "JBL Charge Essential 3 kostar 1 290 kronor och bär 27 wattimmar, mer batteri per krona än något annat i jämförelsen.\n\n**Essential-serien är JBL:s enklare linje, och besparingen ligger på rätt ställen.** Batteriet är nästan lika stort som i Charge 6 för 400 kronor mindre, och 20 timmars speltid räcker två kvällar och en dag emellan. USB-C-porten går åt båda hållen, så den laddar telefonen precis som vinnaren gör: det är funktionen som skiljer Charge-serien från Flip-serien, och här kostar den 1 290 kronor. Auracast och Bluetooth 5.4 är samma generation som de dyrare modellerna, så både räckvidden och möjligheten att koppla ihop flera högtalare följer med ner i pris.\n\nDen väger 912 gram och kommer utan rem eller krok. Det gör den till en högtalare du ställer på ett bord och lämnar där, snarare än en du fäster i något.\n\nTa den här om du vill ha mest batteri per krona och tänker låta högtalaren stå still. Ska den fästas i en ryggsäcksrem väljer du Clip 5, och ska den tåla mer än ett dopp på en meter är Charge 6 och dess IP68 skillnaden.",
  },
  {
    id: "marshall-emberton-iii",
    brand: "Marshall",
    name: "Emberton III",
    shortName: "Emberton III",
    image: productImage(BLUETOOTH_HOGTALARE.slug, "marshall-emberton-iii"),
    tagline: "30 timmars speltid i 670 gram.",
    scores: { batteri: 4.5, talighet: 4, prisvarde: 3.5, barbarhet: 3.5, anslutning: 3.5 },
    price: 1990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/marshall-emberton-iii-black-brass-150228",
    superlative: "Längst speltid i det lilla formatet",
    pros: [
      "32 timmars speltid, alltså längst av allt under ett kilo här",
      "670 gram, så den långa speltiden inte kostar storlek",
      "20 minuters laddning ger 6 timmar, och full laddning tar 2 timmar",
    ],
    cons: [
      "Stereoparning bara mot andra Marshall-högtalare, så en utbyggnad låser dig till märket",
      "1 990 kronor, alltså 700 kronor mer än den billigaste som spelar 20 timmar",
    ],
    specs: [
      { label: "Speltid", value: "32 h", highlight: true },
      { label: "Batterikapacitet", shortLabel: "Batteri", value: "Ej angiven", highlight: true },
      { label: "IP-klass", value: "IP67", highlight: true },
      { label: "Vikt", value: "670 g", highlight: true },
      { label: "Bluetooth-version", shortLabel: "Bluetooth", value: "Ej angiven", highlight: true },
      { label: "Batterityp", value: "Litiumjon, inbyggt" },
      { label: "Powerbank-funktion", value: "Nej" },
      { label: "Laddport", value: "USB-C" },
      { label: "Parkoppling av flera", value: "Stereopar med andra Marshall" },
      { label: "Bärlösning", value: "Fäste för rem, rem ingår inte" },
      { label: "Flyter i vatten", value: "Nej" },
      { label: "Wifi", value: "Nej" },
      { label: "App", value: "Marshall Bluetooth" },
    ],
    verdict:
      "Marshall Emberton III kostar 1 990 kronor, väger 670 gram och spelar 32 timmar på en laddning.\n\n**Kombinationen speltid och storlek är den bästa i jämförelsen.** 32 timmar är längre än allt annat under ett kilo och åtta timmar mer än vinnaren, som väger dubbelt så mycket. Ljudet sprids åt 360 grader i stället för framåt, vilket gör att högtalaren kan stå mitt på ett bord utan att riktas mot någon. Laddningen är dessutom ovanligt snabb: tjugo minuter i väggen ger sex timmars speltid, alltså en hel kväll räddad medan du byter om, och full laddning tar två timmar. IP67 klarar damm helt och ett dopp på en meter.\n\nStereoparningen fungerar bara mot andra Marshall-högtalare. Tänker du komplettera med en högtalare till om ett år är du låst till märket, medan JBL:s Auracast spelar ihop med allt som bär samma märkning.\n\nTa den här om speltid och format väger tyngst och du gillar att högtalaren låter åt alla håll. Ska varje krona räknas gör JBL Charge Essential 3 sina 20 timmar för 700 kronor mindre.",
  },
  {
    id: "jbl-clip-5",
    brand: "JBL",
    name: "Clip 5",
    shortName: "JBL Clip 5",
    image: productImage(BLUETOOTH_HOGTALARE.slug, "jbl-clip-5"),
    tagline: "285 gram med karbinhaken inbyggd.",
    scores: { batteri: 2.5, talighet: 4, prisvarde: 4.5, barbarhet: 5, anslutning: 3.5 },
    price: 790,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/jbl-clip-5-black-124515",
    award: "budget",
    superlative: "Bäst att ha med sig",
    pros: [
      "285 gram och en karbinhake som sitter fast i chassit, så den hänger i ryggsäcken i stället för att ligga i den",
      "790 kronor, alltså under halva priset mot nästan allt annat här",
      "IP67 och 12 timmars speltid, alltså regn och en hel dag inräknade",
    ],
    cons: [
      "5,32 wattimmar batteri, alltså en sjättedel av vinnarens, så den ska laddas ofta",
      "Storleken sätter en gräns för hur högt den spelar utomhus",
    ],
    specs: [
      { label: "Speltid", value: "12 h", highlight: true },
      { label: "Batterikapacitet", shortLabel: "Batteri", value: "5,32 Wh", highlight: true },
      { label: "IP-klass", value: "IP67", highlight: true },
      { label: "Vikt", value: "285 g", highlight: true },
      { label: "Bluetooth-version", shortLabel: "Bluetooth", value: "5.3", highlight: true },
      { label: "Batterityp", value: "Litiumpolymer" },
      { label: "Powerbank-funktion", value: "Nej" },
      { label: "Laddport", value: "USB-C" },
      { label: "Parkoppling av flera", value: "Auracast" },
      { label: "Bärlösning", value: "Integrerad karbinhake" },
      { label: "Flyter i vatten", value: "Nej" },
      { label: "Wifi", value: "Nej" },
      { label: "App", value: "JBL Portable" },
    ],
    verdict:
      "JBL Clip 5 kostar 790 kronor, väger 285 gram och har en karbinhake som är en del av chassit.\n\n**Haken är skälet att den finns.** En högtalare som klipps fast i en ryggsäcksrem, en cykelstyrstång eller en duschstång är en högtalare som faktiskt följer med, och det är skillnaden mellan att äga en bärbar högtalare och att använda en. IP67 betyder damm helt ute och ett dopp på en meter inräknat, alltså tillräckligt för regn och en pool. Auracast gör dessutom att den kan spela synkront med en större JBL senare, om den lilla visar sig vara för liten.\n\nBatteriet är 5,32 wattimmar. Det är en sjättedel av vinnarens, och det märks som laddning varannan dag snarare än varannan vecka.\n\nKöp den här om högtalaren ska vara med överallt och priset ska vara lågt. Ska den spela för mer än ett par personer utomhus räcker den inte, och då är JBL Charge Essential 3 för 500 kronor mer den minsta som gör det.",
  },
  {
    id: "marshall-middleton-ii",
    brand: "Marshall",
    name: "Middleton II",
    shortName: "Middleton II",
    image: productImage(BLUETOOTH_HOGTALARE.slug, "marshall-middleton-ii"),
    tagline: "Stereo åt fyra håll, 30 timmar i sträck.",
    scores: { batteri: 4.5, talighet: 4, prisvarde: 2, barbarhet: 2, anslutning: 3.5 },
    price: 3490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/marshall-middleton-ii-black-and-brass-150866",
    award: "premium",
    superlative: "Bäst ljudbild för ett rum",
    pros: [
      "30 timmars speltid, i klass med de bästa här",
      "Element åt fyra håll ger stereo oavsett var i rummet du står",
      "Laddar telefonen via USB-C, vilket bara två andra här gör",
    ],
    cons: [
      "3 490 kronor, alltså dubbelt så mycket som vinnaren",
      "1,8 kilo, vilket är gränsen för vad som räknas som bärbart",
    ],
    specs: [
      { label: "Speltid", value: "30 h", highlight: true },
      { label: "Batterikapacitet", shortLabel: "Batteri", value: "Ej angiven", highlight: true },
      { label: "IP-klass", value: "IP67", highlight: true },
      { label: "Vikt", value: "1 800 g", highlight: true },
      { label: "Bluetooth-version", shortLabel: "Bluetooth", value: "Ej angiven", highlight: true },
      { label: "Batterityp", value: "Litiumjon, inbyggt" },
      { label: "Powerbank-funktion", value: "Ja, laddar telefon via USB-C" },
      { label: "Laddport", value: "USB-C" },
      { label: "Parkoppling av flera", value: "Stereopar med andra Marshall" },
      { label: "Bärlösning", value: "Bärrem" },
      { label: "Flyter i vatten", value: "Nej" },
      { label: "Wifi", value: "Nej" },
      { label: "App", value: "Marshall Bluetooth" },
    ],
    verdict:
      "Marshall Middleton II kostar 3 490 kronor, väger 1,8 kilo och spelar åt fyra håll samtidigt.\n\n**Den är byggd för ett rum, inte för en ryggsäck.** Elementen sitter på fyra sidor, vilket ger stereo var i rummet du än står i stället för en riktning som ska pekas åt rätt håll, och det är den egenskap som gör att den kan stå i ett hörn och ändå fylla ytan. Trettio timmars speltid betyder att den sällan behöver kopplas in, och IP67 gör att den tål att bäras ut på en altan i duggregn trots att den ser ut som en möbel. Ljud & Bild kallar den \"felfritt stereoljud\" och en märkbar förbättring mot föregångaren.\n\nPriset är svårt att försvara mot resten av listan. Den kostar dubbelt så mycket som vinnaren och väger 1,8 kilo, alltså mer än något annat här, och den bärs mellan rum snarare än ut i världen.\n\nTa den här om högtalaren mest ska stå inne och ljudbilden är viktigare än vad du bär. Ska den följa med ut gör Charge 6 det för hälften, och Emberton III spelar två timmar längre för 1 500 kronor mindre.",
  },
  {
    id: "sonos-roam-2",
    brand: "Sonos",
    name: "Roam 2",
    shortName: "Sonos Roam 2",
    image: productImage(BLUETOOTH_HOGTALARE.slug, "sonos-roam-2"),
    tagline: "Byter till wifi och blir en del av hemmets system.",
    scores: { batteri: 2, talighet: 4, prisvarde: 2, barbarhet: 4.5, anslutning: 5 },
    price: 2190,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/sonos-roam-2-white-150722",
    superlative: "Bäst för dig som redan har Sonos",
    pros: [
      "Både wifi och Bluetooth, så den spelar i multirum hemma och kopplas till telefonen ute",
      "430 gram, alltså näst lättast här",
      "Trueplay ställer in ljudet efter rummet den råkar stå i, utan att du gör något",
    ],
    cons: [
      "10 timmar, delat kortast i jämförelsen, trots 18 wattimmar batteri",
      "2 190 kronor, och den kostnaden betalar sig först om du har fler Sonos-enheter",
    ],
    specs: [
      { label: "Speltid", value: "10 h", highlight: true },
      { label: "Batterikapacitet", shortLabel: "Batteri", value: "18 Wh", highlight: true },
      { label: "IP-klass", value: "IP67", highlight: true },
      { label: "Vikt", value: "430 g", highlight: true },
      { label: "Bluetooth-version", shortLabel: "Bluetooth", value: "5.2", highlight: true },
      { label: "Batterityp", value: "Ej angiven" },
      { label: "Powerbank-funktion", value: "Nej" },
      { label: "Laddport", value: "USB-C" },
      { label: "Parkoppling av flera", value: "Stereopar med Sonos" },
      { label: "Bärlösning", value: "Ej angiven" },
      { label: "Flyter i vatten", value: "Nej" },
      { label: "Wifi", value: "Ja, med AirPlay 2 och multirum" },
      { label: "App", value: "Sonos" },
    ],
    verdict:
      "Sonos Roam 2 kostar 2 190 kronor, väger 430 gram och är den enda här som talar både wifi och Bluetooth.\n\n**Wifi-delen är det som skiljer den från allt annat i jämförelsen.** Hemma ansluter den till nätverket och blir en högtalare bland andra i Sonos-systemet, med multirum och AirPlay 2, så samma låt kan följa dig mellan kök och altan. Går du utanför räckvidden växlar den till Bluetooth och fungerar som vilken bärbar högtalare som helst. Att den dessutom väger 430 gram gör att den faktiskt går att flytta med, vilket inte gäller de flesta nätverkshögtalare. IP67 täcker damm och ett dopp.\n\nBatteriet räcker 10 timmar, delat kortast i jämförelsen, och det trots 18 wattimmar. Wifi kostar ström, och det syns här.\n\nTa den här om du redan har Sonos hemma och vill ha en enhet som fungerar i systemet och utanför det. Har du inte det betalar du 500 kronor extra för en funktion du inte använder, och Charge 6 ger dig mer än dubbla speltiden för mindre pengar.",
  },
  {
    id: "urbanista-malibu",
    brand: "Urbanista",
    name: "Malibu",
    shortName: "Urbanista Malibu",
    image: productImage(BLUETOOTH_HOGTALARE.slug, "urbanista-malibu"),
    tagline: "Solceller på ovansidan som fyller på medan den spelar.",
    scores: { batteri: 3, talighet: 4, prisvarde: 3, barbarhet: 3.5, anslutning: 3 },
    price: 1899,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/urbanista-malibu-midnight-black-135168",
    superlative: "Bäst för långa dagar utan eluttag",
    pros: [
      "Solceller på ovansidan som laddar medan högtalaren står i solen",
      "20 timmars batterireserv, och solcellen fyller på ovanpå det",
      "IP67, alltså byggd för samma miljö som solcellerna förutsätter",
    ],
    cons: [
      "13,3 wattimmar batteri, alltså mindre än hälften av vinnarens när solen inte är framme",
      "Solladdningen förutsätter sol, och en svensk badsäsong är kort",
    ],
    specs: [
      { label: "Speltid", value: "20 h", highlight: true },
      { label: "Batterikapacitet", shortLabel: "Batteri", value: "13,3 Wh", highlight: true },
      { label: "IP-klass", value: "IP67", highlight: true },
      { label: "Vikt", value: "700 g", highlight: true },
      { label: "Bluetooth-version", shortLabel: "Bluetooth", value: "5.2", highlight: true },
      { label: "Batterityp", value: "Litiumjon, 7,4 V / 1 800 mAh" },
      { label: "Powerbank-funktion", value: "Ej angiven" },
      { label: "Laddport", value: "USB-C" },
      { label: "Parkoppling av flera", value: "Ej angiven" },
      { label: "Bärlösning", value: "Integrerad rem" },
      { label: "Flyter i vatten", value: "Nej" },
      { label: "Wifi", value: "Nej" },
      { label: "App", value: "Urbanista Audio" },
    ],
    verdict:
      "Urbanista Malibu kostar 1 899 kronor, väger 700 gram och har solceller på ovansidan.\n\n**Solcellen angriper kategorins verkliga svaghet.** En bärbar högtalare tar slut, och den tar slut just när den används som mest, alltså en lång dag utomhus utan eluttag. Panelen laddar så länge det finns ljus och kräver ingen skötsel: ligger högtalaren ändå på en brygga fyller den på sig själv. Batterireserven är 20 timmar, alltså lika lång som hos den billigaste JBL:en här, och ovanpå den kommer det solen hinner ge. IP67 hänger ihop med samma tanke, eftersom den är byggd för att ligga där solen och sanden är.\n\nBatteriet är 13,3 wattimmar, mindre än hälften av vinnarens. I juli på en brygga spelar det ingen roll. I november på en altan är solcellen en dekoration, och då är det de 13,3 wattimmarna som ska räcka kvällen.\n\nTa den här om du tillbringar hela sommardagar utomhus och gärna slipper tänka på laddaren. Ska högtalaren gå året om ger Charge Essential 3 dig dubbelt så mycket batteri för 600 kronor mindre.",
  },
  {
    id: "harman-kardon-luna",
    brand: "Harman Kardon",
    name: "Luna",
    shortName: "Harman Kardon Luna",
    image: productImage(BLUETOOTH_HOGTALARE.slug, "harman-kardon-luna"),
    tagline: "Premiumkänsla i 710 gram, med 12 timmar i sträck.",
    scores: { batteri: 2.5, talighet: 4, prisvarde: 2.5, barbarhet: 3.5, anslutning: 4 },
    price: 2090,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/harman-kardon-luna-svart-122664",
    superlative: "Bäst utförande på bordet",
    pros: [
      "17,28 wattimmar och 12 timmars speltid, alltså exakt samma batteri som JBL Flip 7",
      "Tygklädsel och anodiserad aluminium, gjord för att stå framme i ett vardagsrum",
      "Två Luna kan paras ihop trådlöst till ett stereopar",
    ],
    cons: [
      "2 090 kronor för 12 timmar, när 1 290 kronor köper 20 timmar längre ner i listan",
      "Varken rem eller krok att fästa den i, så den flyttas mellan bord snarare än bärs med",
    ],
    specs: [
      { label: "Speltid", value: "12 h", highlight: true },
      { label: "Batterikapacitet", shortLabel: "Batteri", value: "17,28 Wh", highlight: true },
      { label: "IP-klass", value: "IP67", highlight: true },
      { label: "Vikt", value: "710 g", highlight: true },
      { label: "Bluetooth-version", shortLabel: "Bluetooth", value: "5.3", highlight: true },
      { label: "Batterityp", value: "Litiumjonpolymer, 3,6 V / 4 800 mAh" },
      { label: "Powerbank-funktion", value: "Nej" },
      { label: "Laddport", value: "USB-C" },
      { label: "Parkoppling av flera", value: "Stereopar med två Luna" },
      { label: "Bärlösning", value: "Ej angiven" },
      { label: "Flyter i vatten", value: "Nej" },
      { label: "Wifi", value: "Nej" },
      { label: "App", value: "Harman Kardon" },
    ],
    verdict:
      "Harman Kardon Luna kostar 2 090 kronor, väger 710 gram och spelar 12 timmar på en laddning.\n\n**Den är den av de mellanstora som är gjord för att stå framme.** Tygklädseln och den anodiserade aluminiumpanelen är premiumnära på ett sätt som JBL:s gummiklädda cylindrar inte försöker vara, och resultatet är en högtalare som får plats i ett vardagsrum snarare än i en ryggsäck. Två av dem kan dessutom paras ihop trådlöst till ett riktigt stereopar, vilket är det som gör den till en hemmahögtalare du kan bygga vidare på. Batteriet är 17,28 wattimmar, exakt samma som JBL Flip 7 för fyrahundra kronor mindre.\n\nDet är också där problemet ligger. Tolv timmar för 2 090 kronor står sig svagt när 1 290 kronor köper 20 timmar och ett större batteri i samma jämförelse.\n\nTa den här om högtalaren mest ska stå på en hylla och se ut som något du valt. Är det speltid per krona du är ute efter är Charge Essential 3 det uppenbara valet, och Flip 7 ger samma batteri i tåligare förpackning.",
  },
  {
    id: "jbl-flip-essential-2",
    brand: "JBL",
    name: "Flip Essential 2",
    shortName: "Flip Essential 2",
    image: productImage(BLUETOOTH_HOGTALARE.slug, "jbl-flip-essential-2"),
    tagline: "JBL-ljud för 1 190 kronor.",
    scores: { batteri: 2, talighet: 2.5, prisvarde: 3, barbarhet: 4, anslutning: 2.5 },
    price: 1190,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/jbl-flip-essential-2-119504",
    superlative: "Billigast av dem i mellanstorleken",
    pros: [
      "520 gram i ett format som ryms i en jackficka",
      "1 190 kronor, alltså femhundra kronor under Flip 7",
      "11,7 wattimmar batteri, vilket är mer än dubbelt mot den minsta här",
    ],
    cons: [
      "IPX7 i stället för IP6x, alltså är dammskyddet inte provat, och sand är det en strandhögtalare möter",
      "10 timmars speltid, kortast i jämförelsen tillsammans med Sonos",
    ],
    specs: [
      { label: "Speltid", value: "10 h", highlight: true },
      { label: "Batterikapacitet", shortLabel: "Batteri", value: "11,7 Wh", highlight: true },
      { label: "IP-klass", value: "IPX7", highlight: true },
      { label: "Vikt", value: "520 g", highlight: true },
      { label: "Bluetooth-version", shortLabel: "Bluetooth", value: "5.1", highlight: true },
      { label: "Batterityp", value: "Litiumjonpolymer, 3,6 V / 3 250 mAh" },
      { label: "Powerbank-funktion", value: "Nej" },
      { label: "Laddport", value: "USB-C" },
      { label: "Parkoppling av flera", value: "Ej angiven" },
      { label: "Bärlösning", value: "Snöre" },
      { label: "Flyter i vatten", value: "Nej" },
      { label: "Wifi", value: "Nej" },
      { label: "App", value: "JBL Portable" },
    ],
    verdict:
      "JBL Flip Essential 2 kostar 1 190 kronor och är den billigaste vägen in i JBL:s mellanstorlek.\n\n**Den gör grundsaken rätt.** 11,7 wattimmar batteri i 520 gram är en rimlig avvägning för en högtalare som ska ligga i en jackficka, formatet är samma välkända cylinder som går att ställa på högkant eller lägga ner, och femhundra kronor under Flip 7 är en verklig besparing för den som mest spelar musik i köket.\n\nSkillnaden som betyder något står i kapslingsklassen. IPX7 betyder att den provats mot nedsänkning i vatten men att dammskyddet inte provats alls, vilket är vad X:et står för. Alla andra i jämförelsen utom den här bär en sexa på den positionen, alltså dammtätt. Ska högtalaren med till en sandstrand är det den enda specifikationen som skiljer produkterna åt på ett sätt du märker ett år senare.\n\nKöp inte den här om den ska med till stranden. Ska den stå inne och spela är den prisvärd, men för hundra kronor mer ger Charge Essential 3 dig dubbla speltiden och ett fullständigt kapslingsskydd.",
  },
];

const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Marshall",
    name: "Kilburn III",
    reason:
      "2,8 kilo, alltså över den gräns den här jämförelsen dragit vid ungefär två kilo, och den hör hemma bland partihögtalarna. Värd att känna till av ett annat skäl också: den är IP54, alltså skyddad mot stänk men inte mot nedsänkning, och därmed den enda av de provade som inte tål att hamna i vattnet. Den kostar samtidigt 3 990 kronor.",
    approxPrice: 3990,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/ljud/hogtalare/bluetooth-hogtalare",
  },
  {
    brand: "Sony",
    name: "ULT Field 5",
    reason:
      "3,3 kilo och byggd för att spela för ett sällskap snarare än för att bäras. Den ingår i Ljud & Bilds test av bärbara högtalare och kallas där kungen av bas, men i den här jämförelsen skulle vikten ensam avgöra rankningen. Den får sin plats på systersidan om partihögtalare.",
    approxPrice: 3000,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/ljud/hogtalare/bluetooth-hogtalare",
  },
  {
    brand: "Soundcore",
    name: "Boom 2 Pro",
    reason:
      "3,8 kilo, tyngst av de sju Ljud & Bild provade, och med ljusshow. Den är en partihögtalare i allt utom namnet och jämförs bäst mot JBL Partybox-serien.",
    approxPrice: 2990,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/ljud/hogtalare/bluetooth-hogtalare",
  },
  {
    brand: "JBL",
    name: "Xtreme 3",
    reason:
      "Prissänkt till 1 990 kronor från 3 290 hos Elon, vilket är ett verkligt fynd, men den väger 2,1 kilo och ligger därmed strax utanför avgränsningen. Är du inte bunden av vikten är den värd en titt just nu.",
    approxPrice: 1990,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/ljud/hogtalare/bluetooth-hogtalare",
  },
  {
    brand: "Apple",
    name: "HomePod Mini",
    reason:
      "Ligger i butikens kategori för Bluetooth-högtalare men saknar batteri och måste vara inkopplad i vägguttaget. Den är en smart högtalare för hemmet och inte en bärbar, vilket är en annan produkt med andra kriterier.",
    approxPrice: 1690,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/ljud/hogtalare/bluetooth-hogtalare",
  },
  {
    brand: "Marshall",
    name: "Acton III och Stanmore III",
    reason:
      "Nätanslutna högtalare för hemmet, 3 290 respektive 3 490 kronor. De bär Bluetooth men inget batteri, och en högtalare som måste stå vid ett uttag löser inte det problem den här sidan handlar om.",
    approxPrice: 3290,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/ljud/hogtalare/bluetooth-hogtalare",
  },
];

export const BLUETOOTH_HOGTALARE_PRODUCTS = resolveProducts(
  BLUETOOTH_HOGTALARE,
  SEEDS,
);

export const BLUETOOTH_HOGTALARE_CONSIDERED = CONSIDERED;

/**
 * Frågorna är de som faktiskt ställs i kategorin, och svaren står på egna ben
 * eftersom FAQ-rutan kan visas ensam i ett sökresultat.
 */
export const BLUETOOTH_HOGTALARE_FAQ = [
  {
    question: "Går det att byta batteri i en bärbar högtalare?",
    answer:
      "Sällan i dag, och det är på väg att ändras. Från den 18 februari 2027 kräver EU:s batteriförordning att bärbara batterier ska gå att avlägsna och ersätta av användaren själv, när som helst under produktens livslängd, med verktyg som finns i vanlig handel och utan värme eller lösningsmedel. Det finns ett undantag för apparater som är särskilt utformade för att användas i vatten eller kraftigt vattenstänk, och för dem räcker det att batteriet kan bytas av en oberoende yrkesutövare. Undantaget gäller bara om det behövs för säkerheten. Köper du en högtalare i dag är batteriet nästan alltid inbyggt, och eftersom batteriet är det som avgör hur länge högtalaren lever är det värt att fråga butiken vad som gäller för just den modellen.",
  },
  {
    question: "Vad betyder IP67 och IPX7 på en högtalare?",
    answer:
      "Första siffran är dammskyddet och andra siffran vattenskyddet. IP67 betyder att damm inte tar sig in alls och att högtalaren tål att sänkas ner en meter i trettio minuter. IP68 är samma dammskydd med djupare eller längre nedsänkning. Ett X betyder att den positionen inte har provats: IPX7 säger alltså att den klarar nedsänkning men att dammskyddet är okänt. Skillnaden märks på en sandstrand snarare än vid en pool, eftersom sand är hårdare än de flesta material i en högtalare och tar sig in där damm gör det. Nio av tio högtalare i den här jämförelsen har en sexa i första positionen. Den tionde har ett X.",
  },
  {
    question: "Hur länge håller ett högtalarbatteri i verkligheten?",
    answer:
      "Kortare än talet på kartongen, av tre skäl. Speltiden mäts vid en måttlig volym, och spelar du högt drar förstärkaren mer ström. Kyla sänker kapaciteten tillfälligt, vilket märks på en altan i oktober. Och cellen åldras: efter ett par hundra laddcykler har den tappat en märkbar del av sin kapacitet, och det är den processen som avgör när högtalaren blir oanvändbar. Räkna alltså med en bra bit under kartongens tal efter ett par år, och med mindre en kall kväll i oktober än en varm i juli. Wattimmarna är den siffra som inte rör sig: de säger hur mycket energi som finns i batteriet, och de går att jämföra rakt av mellan två modeller.",
  },
  {
    question: "Vad är skillnaden mellan wattimmar och timmar?",
    answer:
      "Wattimmar mäter hur mycket energi som finns i batteriet, timmar mäter hur länge tillverkaren tycker att det räcker. Det första är en fysisk storhet du kan jämföra mellan modeller, det andra beror på volym, ljudinnehåll och hur mätningen gjorts. Därför är wattimmarna den mer användbara siffran när två högtalare anger olika speltid: 34 wattimmar mot 5,32 säger något entydigt, medan 24 timmar mot 12 kan bero på att den ena mätts vid lägre volym. Spannet i den här jämförelsen är 5,32 till 34 wattimmar, alltså mer än sex gånger, och det spannet säger mer om vad du får än timtalen gör.",
  },
  {
    question: "Vilken storlek ska jag välja?",
    answer:
      "Utgå från hur den ska bäras, inte från hur den ska låta. Under 300 gram klipps den fast i en ryggsäck eller ett cykelstyre och följer med utan att du planerar för det. Runt 500 till 700 gram ryms i en jackficka eller en handväska och räcker till ett bord på en altan. Över ett kilo packas den ner i en väska, och då spelar det mindre roll om den väger 1,4 eller 1,8 kilo. Över två kilo är det en partihögtalare som bärs mellan platser snarare än med. Den vanligaste besvikelsen är att köpa för stort: en högtalare som är obekväm att ta med blir en högtalare som står hemma.",
  },
  {
    question: "Behöver jag wifi i högtalaren?",
    answer:
      "Bara om du redan har ett multirumssystem hemma. Wifi ger stabilare anslutning, högre ljudkvalitet på papperet och möjlighet att spela samma musik i flera rum, men det kräver att det finns fler enheter att spela tillsammans med och drar mer batteri. Den enda wifi-högtalaren i den här jämförelsen har också jämförelsens kortaste speltid, tio timmar, vilket illustrerar priset. Ska högtalaren mest kopplas till en telefon räcker Bluetooth, och då är pengarna bättre lagda på batteri eller kapslingsklass.",
  },
  {
    question: "Kan jag koppla ihop två högtalare till stereo?",
    answer:
      "Ofta, men bara med rätt partner. JBL använder Auracast, som låter många kompatibla högtalare spela samma ljud samtidigt och två av samma modell spela som vänster och höger kanal. Marshall har sin egen stereoparning mellan Marshall-högtalare, och Sonos parar ihop två Sonos-enheter. Gemensamt för alla tre är att de fungerar inom sitt eget märke och inte mellan märken. Tänker du bygga ut med en högtalare till senare är det alltså värt att välja märke redan nu, och att kontrollera att just den modellen stöder funktionen.",
  },
  {
    question: "Tål högtalaren att ligga i solen?",
    answer:
      "Kapslingsklassen säger ingenting om värme, och det är en vanlig missuppfattning. IP-siffrorna gäller damm och vatten. Litiumbatterier mår däremot dåligt av hög temperatur, och en svart högtalare på en brygga en solig dag blir varmare än luften runt omkring. Det påskyndar åldrandet av cellen, alltså just det som avgör hur länge högtalaren lever, och de flesta tillverkare anger ett drifttemperaturintervall som slutar runt 45 grader. Lägg den i skuggan när den inte används. En av högtalarna här har tvärtom solceller på ovansidan och är byggd för att ligga i solen, vilket är ett medvetet undantag.",
  },
];
