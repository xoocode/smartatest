import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { FRITOS } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /fritos.
 *
 * Fjärde sidan i gruppen Kök, byggd 2026-08-07. Sidan rankar elva
 * oljefritöser mellan 412 och 1 345 kronor. Varmluftsfritöser ligger på
 * /airfryer och är en annan produktklass; Elgigantens egen kategori heter
 * "Fritös med olja".
 *
 * Priser, artikelnummer, GTIN och lagerstatus är lästa hos butiken på
 * PRICE_CHECKED — Proshops JSON-LD, Cerveras mikrodata och KitchenTimes egen
 * produktsida. Specifikationerna är lästa hos **tillverkaren**: tefal.se egen
 * jämförelsetabell, princesshome.eu specifikationstabeller, Severins
 * produktblad för FR 2431, tristar.eu, taurus-home.com, samt Icecat för de sex
 * Tefal-GTIN där katalogen är öppen.
 *
 * AFFILIATE-SWAP — `merchantUrl` är butikens egen produktsida. Inget
 * `affiliateUrl` någonstans; vi har inget program i kategorin ännu. Se
 * lib/links.ts för vad LINK_MODE står på i dag.
 *
 * ## Litertalet är oljan, inte maten
 *
 * Sidans fynd, och det som avgör rankningen. Tefals egen jämförelsetabell
 * listar `Oljekapacitet` och `Livsmedelskapacitet` som två skilda rader, och
 * de följer inte varandra.
 *
 * **Tre av maskinerna här tar 3,0 liter olja och friterar 1,2 kg, 0,6 kg
 * respektive 0,4 kg mat.** Tefal Easy Pro, Princess 182727 och Severin
 * FR 2431, alla tre tal hämtade hos respektive tillverkare. Samma oljeköp, tre
 * gånger så mycket mat ur den ena som ur den andra.
 *
 * Kvoten över hela fältet spänner från 1,54 till 7,50 liter per kilo. Den är
 * räknad här ur två publicerade tal och är ingen mätning vi gjort.
 *
 * Därav ordningen. Tefal tar sex av de sju översta platserna, och skälet är
 * inte varumärket utan att deras maskiner friterar mer mat per liter olja än
 * de andra. Princess anger sina tal lika tydligt och förlorar på dem.
 *
 * ## Oljan är en förbrukningsvara med publicerad livslängd
 *
 * Test-Achats rekommenderar byte efter fem till sex omgångar. Tefals egen FAQ
 * säger fem till sju. Två oberoende led som säger samma sak, och det är därför
 * oljeåtgången är en löpande kostnad och inte en engångsuppgift. Räknaren på
 * sidan bygger på just de talen.
 *
 * ## Kallzonen bär ingen vikt
 *
 * Åtta av elva anger den. De tre som inte gör det är inte maskiner utan
 * kallzon — det är maskiner där uppgiften inte gått att belägga hos
 * tillverkaren. Severins eget produktblad räknar upp funktion efter funktion
 * utan att nämna den, medan KitchenTime säljer samma maskin under
 * webbadressen `cold-zone-fritos-3-l`. Raden står som streck där den saknas
 * och sänker inget betyg. Se check:avdrag.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte friterat en enda pommes. Test-Achats har provat 24 fritöser och
 * det testet är fritt läsbart, men ingen av de elva modeller de namnger säljs
 * i svensk handel, så inget betyg därifrån påverkar en enda poäng här.
 */

export const PRICE_CHECKED = "2026-08-07";

const SEEDS: ProductSeed[] = [
  {
    id: "tefal-versalio-fr4950",
    brand: "Tefal",
    name: "Versalio Deluxe 9-in-1 FR4950",
    shortName: "Tefal Versalio Deluxe",
    image: productImage(FRITOS.slug, "tefal-versalio-fr4950"),
    tagline: "2 liter olja räcker till 1,3 kilo mat, mest i hela jämförelsen.",
    scores: {
      /* 2,0 l olja på 1,3 kg mat = 1,54 l/kg, bäst i fältet. Tefals eget
         specfält, bekräftat i manualens `Fryer food capacity 1.3 kg`. */
      oljeatgang: 5,
      /* Permanent metallfilter i locket som sitter kvar i maskinen. Ingen
         automatfiltrering som Oleoclean-modellerna. */
      "oljans-livslangd": 4,
      /* Avtagbar skål, nonstick, avtagbara delar tål maskindisk. */
      rengoring: 4,
      /* 1 300 g, mest i jämförelsen. */
      matkapacitet: 5,
      /* 1 112 kr för det största matmåttet och den lägsta oljeåtgången. */
      prisvarde: 4,
    },
    price: 1112,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Tefal-Versalio-Deluxe-9-in1/2519596",
    award: "winner",
    superlative: "Bäst för den som friterar ofta",
    pros: [
      "1,3 kilo mat på 2 liter olja, alltså minst olja per kilo av alla här",
      "Största matmängden i jämförelsen, 1 300 gram mot 400 hos de minsta",
      "Permanent metallfilter i locket, så smulorna följer inte med tillbaka i oljan",
      "Termostaten går ned till 80 grader, vilket ingen annan här klarar",
      "Avtagbar skål och avtagbara delar som tål maskindisk",
    ],
    cons: [
      "Går bara till 180 grader, där tio av elva andra når 190",
      "1 600 watt på 2 liter, så oljan hämtar sig långsammare än hos en 2 200-wattsmaskin",
      "Nio funktioner gör den till en större apparat på bänken än en ren fritös",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 112 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "2,0 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "1 300 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "1,54 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 600 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Permanent metallfilter i locket", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "180 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Nonstick", highlight: true },
      { label: "Temperaturomfång", value: "80–180 °C" },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "Delar som tål maskindisk", value: "Ja, de avtagbara delarna" },
      { label: "GTIN", value: "3045386363704" },
    ],
    verdict:
      "Tefal Versalio Deluxe kostar 1 112 kronor och friterar 1,3 kilo mat på 2 liter olja. Det är den största matmängden och den lägsta oljeåtgången i jämförelsen på samma gång.\n\n**Två liter är vad du fyller på, och 1,3 kilo är vad som får plats.** Kvoten blir 1,54 liter per kilo, mot 2,5 för en vanlig treliters och 7,5 för den törstigaste här. Med ett oljebyte var femte till sjätte omgång, som både Test-Achats och Tefal själva anger, betalar du alltså under en tredjedel så mycket olja per middag som du gör i en Severin. Locket har ett permanent metallfilter som sitter kvar i maskinen, så smulorna silas bort i stället för att brännas i oljan nästa gång. Termostaten går dessutom ned till 80 grader, vilket gör den användbar till långsam tillagning och inte bara till fritering.\n\nDen når 180 grader och inte 190. Det är den enda maskinen här som ligger under fältets normaltemperatur, och det märks på det som ska bli hårt utanpå och saftigt inuti. Tio grader låter lite, men de tio graderna är skillnaden mellan en yta som bildas direkt och en som hinner suga åt sig olja först. Friterar du mest pommes och panerad fisk är det en verklig invändning.\n\nKöp den om du friterar mer än några gånger om året. Den är byggd för att göra mycket mat på lite olja, och det är den kostnaden som avgör vad en fritös är värd över några år. Vill du ha de sista tio graderna tar du Tefal Easy Pro för 679 kronor och betalar en halv liter olja extra per fyllning.",
  },
  {
    id: "tefal-easy-pro-fr3330",
    brand: "Tefal",
    name: "Easy Pro FR3330",
    shortName: "Tefal Easy Pro",
    image: productImage(FRITOS.slug, "tefal-easy-pro-fr3330"),
    tagline: "1,2 kilo mat för 679 kronor, billigast per kilo i jämförelsen.",
    scores: {
      /* 3,0 l på 1,2 kg = 2,5 l/kg. */
      oljeatgang: 4,
      /* Dräneringssystem för att tappa av oljan, kallzon, anti-luktfilter.
         Inget oljefilter enligt Icecat. */
      "oljans-livslangd": 3.5,
      /* Emaljerat innerskikt, avtagbar skål, borttagbart element,
         dräneringssystem, diskvattensäkra delar. */
      rengoring: 4.5,
      /* 1 200 g. */
      matkapacitet: 4.5,
      /* 679 kr för 1,2 kg är 566 kr per kilo, lägst i jämförelsen. */
      prisvarde: 5,
    },
    price: 679,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Cervera",
    merchantUrl: "https://www.cervera.se/produkt/easy-pro-fritos-3-l",
    award: "editor",
    superlative: "Bäst köp till familjen",
    pros: [
      "1,2 kilo mat för 679 kronor, alltså lägst pris per kilo mat här",
      "2 200 watt på 3 liter, så oljan är tillbaka på temperatur snabbt efter kall mat",
      "Emaljerat innerskikt som tål stålull, till skillnad från nonstick",
      "Dräneringssystem, så oljan tappas av i stället för att ösas ur",
      "Värmeelementet lyfts bort, så du kommer åt hela botten",
    ],
    cons: [
      "3 liter olja mot 2 hos Versalio för nästan lika mycket mat",
      "Inget oljefilter, så smulorna ligger kvar tills du silar för hand",
      "Termostaten börjar på 150 grader och duger därför inte till långsam tillagning",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "679 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "3,0 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "1 200 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "2,50 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 200 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Nej, dräneringssystem", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "190 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Emalj", highlight: true },
      { label: "Temperaturomfång", value: "150–190 °C" },
      { label: "Kallzon", value: "Ja" },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "Löstagbart värmeelement", value: "Ja" },
      { label: "Delar som tål maskindisk", value: "Ja" },
      { label: "GTIN", value: "3045386371723" },
    ],
    verdict:
      "Tefal Easy Pro kostar 679 kronor och friterar 1,2 kilo mat på 3 liter olja. Räknat per kilo mat är det billigaste maskinen i jämförelsen.\n\n**1,2 kilo är dubbelt så mycket som en Princess på samma oljemängd klarar, och tre gånger så mycket som en Severin.** Alla tre tar 3 liter. Det betyder att fyra personer äter samtidigt i stället för i omgångar, och att oljekostnaden per middag blir en tredjedel av den törstigaste maskinens. 2 200 watt är dessutom nästan det starkaste här, och effekt på en fritös handlar om hur snabbt oljan kommer tillbaka till 180 grader när frysta pommes går i. En fritös som sjunker till 150 grader och stannar där ger mjuk och fet mat. Innerskiktet är emalj och inte nonstick, alltså en yta som tål både stålull och metallredskap, och värmeelementet lyfts bort så att du kommer åt hela botten.\n\nDen har inget oljefilter. Smulor som lossnar från paneringen sjunker till kallzonen och slutar brännas, men de blir kvar i oljan tills du häller ur och silar för hand. Oleoclean-modellerna gör det åt dig, och skillnaden märks från tredje omgången och framåt när oljan börjar mörkna.\n\nDen här är köpet för de flesta hushåll. Du får den största maten per krona, den näst högsta effekten och en yta som tål att skuras, och du betalar under sjuhundra kronor för det. Friterar du varje vecka är Oleoclean Pro värd sina 666 kronor extra, eftersom den silar och sparar oljan åt dig.",
  },
  {
    id: "tefal-oleoclean-pro-fr8040",
    brand: "Tefal",
    name: "Oleoclean Pro Inox & Design FR8040",
    shortName: "Tefal Oleoclean Pro",
    image: productImage(FRITOS.slug, "tefal-oleoclean-pro-fr8040"),
    tagline: "Silar oljan själv och lagrar den i en sluten låda till nästa gång.",
    scores: {
      /* 3,5 l på 1,2 kg = 2,92 l/kg. */
      oljeatgang: 3.5,
      /* Automatisk filtrering ned i sluten oljeuppsamlare. Enda konstruktionen
         tillsammans med Compact där oljan varken står kvar eller hälls. */
      "oljans-livslangd": 5,
      /* Avtagbar skål, borttagbart element, dräneringssystem, anti-luktfilter,
         diskvattensäkra delar, och oljan behöver aldrig hällas. */
      rengoring: 5,
      /* 1 200 g. */
      matkapacitet: 4.5,
      /* 1 345 kr, dyrast här, men enda med automatfiltrering i full storlek. */
      prisvarde: 3.5,
    },
    price: 1345,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Tefal-Oleoclean-PRO-Inox-Design/2512502",
    award: "premium",
    superlative: "Bäst när oljan ska sparas",
    pros: [
      "Vrid på ratten, så silas oljan ned i en sluten låda under maskinen",
      "Oljan står aldrig kvar i grytan och ska aldrig hällas i en burk",
      "1,2 kilo mat, lika mycket som maskiner för halva priset",
      "2 300 watt, högst effekt bland treliterna här",
      "Avtagbar skål, borttagbart element och delar som tål maskindisk",
    ],
    cons: [
      "3,5 liter olja är den näst största fyllningen här, för 1,2 kilo mat",
      "1 345 kronor, alltså dyrast i jämförelsen och dubbelt mot Easy Pro",
      "Oljelådan tar plats under maskinen och gör den hög på bänken",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 345 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "3,5 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "1 200 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "2,92 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 300 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Automatisk, lagrar oljan", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "–", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Rostfritt stål", highlight: true },
      { label: "Kallzon", value: "Ja" },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "Löstagbart värmeelement", value: "Ja" },
      { label: "Delar som tål maskindisk", value: "Ja" },
      { label: "Vikt", value: "7,5 kg med förpackning" },
      { label: "GTIN", value: "3045386366545" },
    ],
    verdict:
      "Tefal Oleoclean Pro kostar 1 345 kronor och är den enda fritösen här i full storlek som tar hand om oljan åt dig. Den friterar 1,2 kilo mat på 3,5 liter.\n\n**Vrid ratten till automatisk filtrering, så rinner oljan genom en sil ned i en sluten låda under maskinen.** Det låter som en bekvämlighet och är i praktiken det som avgör om en fritös används. Alternativet, i varenda annan maskin här utom lillasystern Compact, är att vänta tills oljan svalnat, lyfta ur en full gryta och hälla tre liter varm olja genom en sil ned i en flaska. Här står oljan ren och stängd tills nästa gång, och grytan är tom och går att diska direkt. 2 300 watt är dessutom den högsta effekten bland treliterna, så oljan är snabbt uppe på temperatur igen efter en omgång frysta pommes.\n\nDen dricker mer olja än den behöver för maten den gör. 3,5 liter för 1,2 kilo är 2,92 liter per kilo, medan Easy Pro klarar samma matmängd på 3 liter och Versalio på 2. En halv liter extra vid varje fyllning är ungefär femton kronor, och med byte var femte omgång blir det tre gånger om året för den som friterar varannan vecka.\n\nDen här köper du för att slippa momentet som får en fritös att stå oanvänd i skåpet. Friterar du varje vecka betalar filtreringen tillbaka sig både i olja som räcker längre och i middagar som faktiskt blir av. Friterar du fyra gånger om året är Easy Pro samma matmängd för hälften av pengarna.",
  },
  {
    id: "tefal-uno-ff203130",
    brand: "Tefal",
    name: "Uno FF203130",
    shortName: "Tefal Uno",
    image: productImage(FRITOS.slug, "tefal-uno-ff203130"),
    tagline: "1,8 liter olja är det minsta oljeköpet i jämförelsen.",
    scores: {
      /* 1,8 l på 1,0 kg = 1,8 l/kg. */
      oljeatgang: 4.5,
      /* Filtrering enligt Icecat, kallzon. Inget automatsystem. */
      "oljans-livslangd": 4,
      /* Avtagbar skål, diskvattensäkra delar. */
      rengoring: 4,
      /* 1 000 g. */
      matkapacitet: 4,
      /* 767 kr för 1 kg mat på minsta oljemängden. */
      prisvarde: 4.5,
    },
    price: 767,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Tefal-Uno-Deep-Fryer-White/3056602",
    superlative: "Bäst för två personer",
    pros: [
      "1,8 liter är minsta fyllningen här, alltså billigast olja per byte",
      "1 kilo mat trots den lilla oljemängden, vilket ger 1,8 liter per kilo",
      "Kallzon och filtrering, båda angivna av tillverkaren",
      "Avtagbar skål och delar som tål maskindisk",
      "Går till 190 grader, alltså fältets normaltemperatur",
    ],
    cons: [
      "1 600 watt på 1,8 liter, så temperaturfallet blir kännbart med fryst mat",
      "1 kilo mat räcker till tre personer, inte till ett sällskap",
      "Vitt plasthölje som gör den svårare att torka ren från fettfilm än rostfritt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "767 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "1,8 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "1 000 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "1,80 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 600 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Ja", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "190 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "–", highlight: true },
      { label: "Temperaturomfång", value: "150–190 °C" },
      { label: "Kallzon", value: "Ja" },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "Delar som tål maskindisk", value: "Ja" },
      { label: "GTIN", value: "3045386381890" },
    ],
    verdict:
      "Tefal Uno kostar 767 kronor och friterar 1 kilo mat på 1,8 liter olja. Det är den minsta oljemängden i jämförelsen och ändå en hel kilos matmängd.\n\n**1,8 liter mot 3 liter är ungefär trettiofem kronor mindre vid varje byte.** Med ett byte var femte till sjätte omgång, som tillverkarna själva anger, blir det en verklig skillnad för den som friterar regelbundet, och det gör Uno till en av de billigaste maskinerna här att äga trots att den inte är billigast att köpa. Att den ändå tar ett kilo mat är det ovanliga: Princess 182727 tar 3 liter för att göra 600 gram. Kallzon och filtrering anges båda av Tefal, så smulorna varken bränns eller följer med tillbaka.\n\n1 600 watt på 1,8 liter är svagt när maten är fryst. Mindre oljemängd betyder mindre värme lagrad i grytan, och när ett halvkilo frysta pommes går i faller temperaturen snabbare än i en treliters på 2 200 watt. Låt maskinen komma tillbaka till 180 grader mellan omgångarna, annars blir maten fet.\n\nDen här passar hushållet på två som friterar ofta och aldrig lagar till gäster. Ska ni vara fyra vid bordet är Easy Pro 88 kronor billigare och tar 200 gram mer mat.",
  },
  {
    id: "tefal-oleoclean-compact-fr7016",
    brand: "Tefal",
    name: "Oleoclean Compact FR7016",
    shortName: "Tefal Oleoclean Compact",
    image: productImage(FRITOS.slug, "tefal-oleoclean-compact-fr7016"),
    tagline: "Automatisk oljefiltrering på den minsta bänkytan här.",
    scores: {
      /* 2,0 l på 800 g = 2,5 l/kg. */
      oljeatgang: 4,
      /* Samma automatfiltrering som Pro, med egen oljelåda. */
      "oljans-livslangd": 5,
      /* Avtagbar skål i rostfritt, diskvattensäkra delar, oljan hälls aldrig. */
      rengoring: 4.5,
      /* 800 g livsmedel, 600 g pommes enligt Tefals egen tabell. */
      matkapacitet: 3,
      /* 799 kr för automatfiltrering är 546 kr mindre än Pro. */
      prisvarde: 4,
    },
    price: 799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Tefal-Deep-Fryer-Oleoclean-Compact/2621118",
    superlative: "Bäst för det lilla köket",
    pros: [
      "Samma automatiska filtrering och oljelåda som den dubbelt så dyra Pro",
      "2 liter olja, alltså en liten fyllning att byta",
      "Rostfri innerskål och delar som tål maskindisk",
      "Kallzon, så smulorna sjunker undan i stället för att brännas",
      "294 millimeter bred, den smalaste maskinen i jämförelsen",
    ],
    cons: [
      "800 gram mat, och bara 600 gram om det är pommes frites",
      "1 500 watt är lägst effekt bland tvålitersmaskinerna här",
      "2,5 liter olja per kilo mat, alltså sämre kvot än Uno på lägre pris",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "799 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "2,0 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "800 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "2,50 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 500 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Automatisk, lagrar oljan", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "190 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Rostfritt stål", highlight: true },
      { label: "Temperaturomfång", value: "150–190 °C" },
      { label: "Kallzon", value: "Ja" },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "Delar som tål maskindisk", value: "Ja" },
      { label: "Sladdlängd", value: "0,9 m" },
      { label: "Yttermått", value: "294 × 425 × 373 mm" },
      { label: "Vikt", value: "3,65 kg" },
      { label: "GTIN", value: "3045386378692" },
    ],
    verdict:
      "Tefal Oleoclean Compact kostar 799 kronor och har samma automatiska oljefiltrering som den dubbelt så dyra Pro-modellen. Den friterar 800 gram mat på 2 liter olja.\n\n**Filtreringen är hela skälet att välja den.** Ratten vrids, oljan rinner genom en sil ned i en sluten låda under maskinen, och nästa gång är den ren och färdig att värma. Ingen annan fritös under tusen kronor gör det. Grytan är rostfri och går i maskin, och med 294 millimeters bredd är den smalast här, vilket spelar roll för en apparat som annars står framme mellan användningarna. Två liter är dessutom en liten och billig fyllning att byta.\n\nMatmängden är det du betalar med. Tefal anger 800 gram livsmedel, men bara 600 gram om det är pommes frites, och det räcker till två personer. Ett kilo frysta pommes ur påsen blir alltså två omgångar, och 1 500 watt är den lägsta effekten bland tvålitersmaskinerna, så maskinen behöver en stund mellan dem.\n\nDen här är för den som friterar till två i ett kök där bänkytan är slut. Får ni sällskap ofta räcker den inte, och då är Easy Pro billigare och tar 1,2 kilo, men då häller du oljan själv.",
  },
  {
    id: "tefal-maxi-fry-ff107810",
    brand: "Tefal",
    name: "Maxi-Fry FF107810",
    shortName: "Tefal Maxi-Fry",
    image: productImage(FRITOS.slug, "tefal-maxi-fry-ff107810"),
    tagline: "Ett kilo mat på 2 liter olja, utan något att ställa in.",
    scores: {
      /* 2,0 l på 1,0 kg = 2,0 l/kg. */
      oljeatgang: 4.5,
      /* Filtrering enligt Icecat. */
      "oljans-livslangd": 4,
      /* Avtagbar skål och diskbara delar, men färre lösgjorda delar än de
         emaljerade modellerna. */
      rengoring: 3.5,
      /* 1 000 g. */
      matkapacitet: 4,
      /* 760 kr för 1 kg på 2 liter. */
      prisvarde: 4,
    },
    price: 760,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Tefal-Maxi-Fry/2815301",
    superlative: "Bäst för enkel fritering",
    pros: [
      "1 kilo mat på 2 liter olja, alltså 2 liter per kilo",
      "1 900 watt, starkare än båda de andra tvålitersmaskinerna här",
      "Filtrering angiven av tillverkaren",
      "Avtagbar skål och diskbara delar",
    ],
    cons: [
      "Ingen angiven maxtemperatur, så du får ställa in efter känsla och tid",
      "Svart hölje som visar fettfilm tydligare än borstat stål",
      "Uno tar samma matmängd på 200 milliliter mindre olja",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "760 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "2,0 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "1 000 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "2,00 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "1 900 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Ja", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "–", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "–", highlight: true },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "GTIN", value: "3045386371006" },
    ],
    verdict:
      "Tefal Maxi-Fry kostar 760 kronor och friterar 1 kilo mat på 2 liter olja. Det är 2 liter per kilo, alltså tredje bäst i jämförelsen.\n\n**1 900 watt på 2 liter är den tätaste effekten här.** Det talet avgör hur snabbt oljan är tillbaka på temperatur när ett halvkilo frysta pommes går i, och det är där en svag fritös gör maten fet i stället för krispig. Maskinen har filtrering enligt Tefal, avtagbar skål och diskbara delar, och den gör ett kilo mat vilket räcker till tre personer. Ingenting av det är märkvärdigt, och det är delvis poängen: det finns inget program att välja och inget att ställa in fel.\n\nTefal anger ingen maxtemperatur för den. Du får alltså gå på tid och på hur maten ser ut i stället för på ett gradtal, vilket fungerar för den som friterar samma sak varje gång och är besvärligare för den som växlar mellan pommes, fisk och munkar.\n\nDen passar den som vill ha en fritös som bara friterar och som inte tänker läsa en manual. Vill du kunna sätta graderna exakt tar du Easy Pro för 81 kronor mindre och får både termostat och 200 gram mer mat.",
  },
  {
    id: "taurus-pro-3-plus",
    brand: "Taurus",
    name: "Pro 3 Plus",
    shortName: "Taurus Pro 3 Plus",
    image: productImage(FRITOS.slug, "taurus-pro-3-plus"),
    tagline: "900 gram potatis och ett lock du kan fritera med stängt.",
    scores: {
      /* 3,0 l på 900 g = 3,33 l/kg. */
      oljeatgang: 3,
      /* Filtreringssystem för oljan enligt tillverkaren. */
      "oljans-livslangd": 4,
      /* Går att ta isär helt, löstagbart värmeelement. */
      rengoring: 4,
      /* 900 g potatis. */
      matkapacitet: 3.5,
      /* 983 kr för 900 g är dyrt mot Easy Pro. */
      prisvarde: 3,
    },
    price: 983,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Taurus-Professional-3-Plus/3232243",
    superlative: "Bäst mot fettstänk på bänken",
    pros: [
      "Går att fritera med locket stängt, vilket håller fettstänket i maskinen",
      "Filtreringssystem för oljan, angivet av tillverkaren",
      "2 100 watt på 3 liter, alltså snabb återhämtning efter fryst mat",
      "Fönster i locket, så du ser maten utan att öppna",
      "Går att ta isär helt för rengöring",
    ],
    cons: [
      "900 gram mat på 3 liter olja, mot 1,2 kilo på samma mängd hos Easy Pro",
      "983 kronor, alltså 304 kronor mer än en maskin som friterar mer",
      "Ingen angiven maxtemperatur och ingen angiven kallzon",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "983 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "3,0 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "900 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "3,33 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 100 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Filtreringssystem", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "–", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Rostfritt stål", highlight: true },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "Löstagbart värmeelement", value: "Ja" },
      { label: "GTIN", value: "8414234739537" },
    ],
    verdict:
      "Taurus Pro 3 Plus kostar 983 kronor och friterar 900 gram potatis på 3 liter olja. Den är byggd för att köras med locket på.\n\n**Fritering med stängt lock är det den kan som ingen annan här anger.** Fettstänk är den verkliga anledningen till att många lagar sina pommes i ugnen i stället, och ett lock som får sitta kvar under tillagningen håller stänket i maskinen i stället för på kakelväggen. Fönstret gör att du ser maten utan att lyfta av. Taurus anger också ett filtreringssystem för oljan, 2 100 watt är starkt nog för fryst mat, och hela maskinen går att ta isär för rengöring, värmeelementet inräknat.\n\nMatmängden bär inte priset. 900 gram på 3 liter olja är 3,33 liter per kilo, och Tefal Easy Pro friterar 1,2 kilo på samma oljemängd för 304 kronor mindre. Du betalar alltså mer för mindre mat och mer olja per portion.\n\nKöp den om fettstänk är skälet att din nuvarande fritös står i skåpet. Är det maten per krona som avgör finns det två Tefal-modeller här som gör mer för mindre.",
  },
  {
    id: "princess-184090",
    brand: "Princess",
    name: "184090 Deep Fryer 5L",
    shortName: "Princess 184090",
    image: productImage(FRITOS.slug, "princess-184090"),
    tagline: "3 270 watt värmer 5 liter olja snabbare än något annat här.",
    scores: {
      /* 5,0 l på 1,0 kg = 5,0 l/kg. */
      oljeatgang: 2,
      /* Kallzon men Clean & safety oil filter: No. */
      "oljans-livslangd": 3,
      /* Emaljerad innergryta, löstagbar, diskbara delar. */
      rengoring: 3.5,
      /* 1 000 g. */
      matkapacitet: 4,
      /* 808 kr, men 5 liter olja per fyllning. */
      prisvarde: 3,
    },
    price: 808,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Cervera",
    merchantUrl:
      "https://www.cervera.se/produkt/princess-fritos-184090-med-emaljerad-korg-5l-3270w-rostfritt-stal",
    superlative: "Bäst för stora sällskap",
    pros: [
      "3 270 watt, högsta effekten i jämförelsen med bred marginal",
      "1 kilo mat i taget, så sällskapet äter samtidigt",
      "Emaljerad innergryta som tål skurning",
      "Kallzon, så smulor sjunker undan från värmeelementet",
      "Går till 190 grader",
    ],
    cons: [
      "5 liter olja per fyllning, mest av alla här och ungefär 150 kronor per byte",
      "5 liter olja för 1 kilo mat, alltså dubbelt så törstig som Easy Pro",
      "Inget oljefilter, så all silning sker för hand",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "808 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "5,0 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "1 000 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "5,00 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 740–3 270 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Nej", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "190 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Emalj", highlight: true },
      { label: "Kallzon", value: "Ja" },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "Delar som tål maskindisk", value: "Ja" },
      { label: "Sladdlängd", value: "1,0 m" },
    ],
    verdict:
      "Princess 184090 kostar 808 kronor, tar 5 liter olja och friterar 1 kilo mat. Den har den högsta effekten i jämförelsen.\n\n**3 270 watt är tusen watt mer än näst starkaste maskinen här.** Fem liter olja är mycket att värma, men med den effekten går det ändå fort, och en stor oljemängd tappar dessutom mindre temperatur när kall mat läggs i. Det är den kombinationen som gör den till maskinen för när ni är sex och alla ska ha pommes till hamburgarna. Innergrytan är emaljerad och tål att skuras, den lyfts ur, och kallzonen håller smulorna borta från värmeelementet.\n\nFem liter är också vad du köper och slänger. Med byte var femte till sjätte omgång kostar en fyllning ungefär 150 kronor mot 60 för en tvåliters, och du får ett kilo mat ur den, alltså lika mycket som Tefal Uno gör på 1,8 liter. Räknat per kilo mat är den alltså nästan tre gånger så dyr i drift som en välmatchad maskin, och det finns inget oljefilter som förlänger intervallet.\n\nKöp den om du friterar till många och sällan. Blir det oftare än en gång i månaden äter oljekostnaden upp mellanskillnaden, och då är Easy Pro både billigare att köpa och billigare att fylla.",
  },
  {
    id: "princess-182727",
    brand: "Princess",
    name: "182727 Black Fryer 3L",
    shortName: "Princess 182727",
    image: productImage(FRITOS.slug, "princess-182727"),
    tagline: "Kallzon och 2 000 watt för 527 kronor.",
    scores: {
      /* 3,0 l på 600 g = 5,0 l/kg. */
      oljeatgang: 2,
      /* Cool zone Yes, Clean & safety oil filter No. */
      "oljans-livslangd": 3,
      /* Löstagbar innerskål, nonstick, diskbara delar. */
      rengoring: 3.5,
      /* 600 g. */
      matkapacitet: 2.5,
      /* 527 kr, näst billigast. */
      prisvarde: 3,
    },
    price: 527,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Cervera",
    merchantUrl:
      "https://www.cervera.se/produkt/princess-fritos-182727-3l-2000w-svart-rostfritt-stal",
    superlative: "Billigast med kallzon",
    pros: [
      "527 kronor med både kallzon och 2 000 watt",
      "Kallzonen håller smulorna borta från elementet, så oljan mörknar långsammare",
      "Löstagbar innerskål och delar som tål maskindisk",
      "Termostat upp till 190 grader",
    ],
    cons: [
      "600 gram mat på 3 liter olja, alltså hälften av vad Easy Pro gör på samma fyllning",
      "Inget oljefilter, så silningen sker för hand",
      "Nonstick i stället för emalj, så metallredskap och skursvamp river ytan",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "527 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "3,0 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "600 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "5,00 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 000 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Nej", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "190 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Nonstick", highlight: true },
      { label: "Kallzon", value: "Ja" },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "Delar som tål maskindisk", value: "Ja" },
      { label: "Sladdlängd", value: "0,9 m" },
    ],
    verdict:
      "Princess 182727 kostar 527 kronor, tar 3 liter olja och friterar 600 gram mat. Den är den billigaste maskinen här som har en kallzon.\n\n**Kallzonen är det du får för pengarna, och den är värd något.** Smulor som lossnar från panering faller genom korgen och landar i ett svalare område under värmeelementet i stället för att brännas fast mot det. Princess skriver själva att det håller oljan renare längre, och det stämmer med vad Test-Achats fann när de underkände en fritös just för att kallzonen inte fungerade. 2 000 watt räcker gott till tre liter, innerskålen lyfts ur och delarna går i maskin.\n\nDen tar 3 liter olja för att göra 600 gram mat. Tefal Easy Pro tar exakt samma tre liter och gör 1,2 kilo, alltså dubbelt så mycket, för 152 kronor mer. Räknat på oljan blir Princess dyrare att äga redan efter ett halvår om du friterar varannan vecka, och det finns inget filter som förlänger intervallet.\n\nDen här är köpet om du friterar några gånger om året och vill lägga så lite som möjligt i inköp. Blir det oftare än så köper du olja för mellanskillnaden inom några månader.",
  },
  {
    id: "tristar-fr-6919",
    brand: "Tristar",
    name: "FR-6919",
    shortName: "Tristar FR-6919",
    image: productImage(FRITOS.slug, "tristar-fr-6919"),
    tagline: "Två liter olja räcker till en portion i taget.",
    scores: {
      /* 2,0 l på 400 g = 5,0 l/kg. */
      oljeatgang: 2,
      /* Cool zone Yes, oljefilter No. */
      "oljans-livslangd": 3,
      /* Löstagbar behållare, diskbara delar. */
      rengoring: 3.5,
      /* 400 g. */
      matkapacitet: 1.5,
      /* 412 kr, billigast här. */
      prisvarde: 3,
    },
    price: 412,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Tristar-FR-6919-Friture/2578504",
    award: "budget",
    superlative: "Bäst för enpersonshushållet",
    pros: [
      "412 kronor, alltså billigast i jämförelsen",
      "2 liter olja per fyllning, ungefär 60 kronor att byta",
      "Kallzon trots priset",
      "Löstagbar behållare och delar som tål maskindisk",
    ],
    cons: [
      "800 watt, alltså en fjärdedel av effekten hos den starkaste här",
      "400 gram mat, vilket räcker till en person",
      "2 liter olja för 400 gram mat är samma kvot som en femlitersmaskin",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "412 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "2,0 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "400 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "5,00 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "800 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Nej", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "–", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Nonstick", highlight: true },
      { label: "Kallzon", value: "Ja" },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "Delar som tål maskindisk", value: "Ja" },
      { label: "GTIN", value: "8713016019189" },
    ],
    verdict:
      "Tristar FR-6919 kostar 412 kronor och är den billigaste fritösen i jämförelsen. Den tar 2 liter olja och friterar 400 gram mat.\n\n**Två liter är en billig fyllning att byta, ungefär sextio kronor.** Det gör den till maskinen med lägst tröskel både att köpa och att fylla, och den har ändå en kallzon, vilket flera dyrare maskiner inte kan visa. Behållaren lyfts ur och delarna går i diskmaskinen, så efterarbetet är litet i takt med att portionen är det.\n\n800 watt är det som begränsar den. Det är en fjärdedel av effekten hos den starkaste maskinen här, och när fyra hekto frysta pommes går i två liter olja faller temperaturen och tar lång tid att komma tillbaka. Resultatet blir blekare och fetare än ur en 2 000-wattsmaskin, och det syns tydligast just på det folk köper en fritös för.\n\nDen här duger om du lagar åt dig själv och friterar sällan. Ska ni vara mer än en vid bordet är Princess 182727 för 115 kronor mer både starkare och rymligare, och Tefal Easy Pro tar tre gånger så mycket mat.",
  },
  {
    id: "severin-fr-2431",
    brand: "Severin",
    name: "FR 2431",
    shortName: "Severin FR 2431",
    image: productImage(FRITOS.slug, "severin-fr-2431"),
    tagline: "Både oljegrytan och korgen går i diskmaskinen.",
    scores: {
      /* 3,0 l på 400 g = 7,5 l/kg, sämst i fältet. */
      oljeatgang: 1,
      /* Fettfilter i locket och löstagbar behållare, men ingen oljefiltrering. */
      "oljans-livslangd": 3,
      /* Emaljerad löstagbar behållare OCH korg tål maskindisk, avtagbart
         element, avtagbart lock. Fältets bästa på just rengöring. */
      rengoring: 4.5,
      /* 400 g. */
      matkapacitet: 1.5,
      /* 571 kr för 400 g mat på 3 liter olja. */
      prisvarde: 2,
    },
    price: 571,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "KitchenTime",
    merchantUrl: "https://www.kitchentime.se/varumarken/severin/cold-zone-fritos-3-l/",
    superlative: "Bäst för den som diskar i maskin",
    pros: [
      "Både den emaljerade oljegrytan och frityrkorgen tål maskindisk",
      "Värmeelementet stänger av sig automatiskt när det lyfts av",
      "Utbytbart fettfilter i locket som tar lukten",
      "Emalj i stället för nonstick, alltså en yta som tål stålull",
      "2 000 watt och termostat upp till 190 grader",
    ],
    cons: [
      "3 liter olja för 400 gram mat, alltså den törstigaste maskinen här",
      "400 gram räcker till en person, på samma oljemängd som ger 1,2 kilo hos Easy Pro",
      "Inget oljefilter, så oljan silas för hand",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "571 kr", highlight: true },
      { label: "Oljemängd", shortLabel: "Olja", value: "3,0 l", highlight: true },
      { label: "Matmängd", shortLabel: "Mat", value: "400 g", highlight: true },
      { label: "Oljeåtgång", shortLabel: "l/kg", value: "7,50 l/kg", highlight: true },
      { label: "Effekt", shortLabel: "Effekt", value: "2 000 W", highlight: true },
      { label: "Oljefilter", shortLabel: "Filter", value: "Nej, fettfilter i locket", highlight: true },
      { label: "Maxtemperatur", shortLabel: "Max", value: "190 °C", highlight: true },
      { label: "Beläggning", shortLabel: "Yta", value: "Emalj", highlight: true },
      { label: "Löstagbar oljebehållare", value: "Ja" },
      { label: "Löstagbart värmeelement", value: "Ja" },
      { label: "Delar som tål maskindisk", value: "Gryta och korg" },
      { label: "Sladdlängd", value: "0,96 m" },
      { label: "Vikt", value: "2,7 kg" },
      { label: "GTIN", value: "4008146009662" },
    ],
    verdict:
      "Severin FR 2431 kostar 571 kronor, tar 3 liter olja och friterar 400 gram mat. Den är den enda här där både oljegrytan och korgen uttryckligen tål maskindisk.\n\n**Rengöringen är det den vinner på, och det är inte en liten sak.** Test-Achats underkände en fritös som friterade bäst i hela deras test av 24 modeller, just på rengöringen. Här lyfts den emaljerade grytan ur och går i maskinen tillsammans med korgen, värmeelementet tas av och stänger då av sig automatiskt, och locket har ett utbytbart fettfilter som tar det mesta av lukten. Emaljen tål dessutom stålull, vilket nonstick inte gör. 2 000 watt räcker väl till tre liter.\n\nTre liter olja för fyra hekto mat är jämförelsens sämsta hushållning. Samma tre liter ger 1,2 kilo mat i en Tefal Easy Pro, alltså tre gånger så mycket, och 600 gram i en Princess för 44 kronor mindre. Räknat på ett oljebyte var femte till sjätte omgång betalar du ungefär nittio kronor olja per fyra hekto pommes.\n\nKöp den om du hatar att diska fritöser och lagar åt en eller två. För alla som friterar till ett bord är Tefal Easy Pro rätt maskin, och den går att skura den också.",
  },
];

/**
 * Övervägda men inte rankade. Två skäl förekommer, och de är olika: antingen
 * saknas tillverkarens matmängd, vilket gör sidans främsta kriterium omöjligt
 * att sätta, eller så är produkten en varmluftsfritös och hör till /airfryer.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Emerio",
    name: "DF-132653 3 L",
    approxPrice: 579,
    merchant: "Cervera",
    merchantUrl: "https://www.cervera.se/produkt/emerio-fritos-df-132653-3-l-silver",
    reason:
      "En välbyggd treliters med kallzon, löstagbar tank, avtagbart värmeelement och 2 000 watt, och den enda maskinen i hela svepet som märks som PFAS-fri. Skälet att den inte rankas är att ingen anger hur mycket mat den tar. Emerios egen produktsida, Cervera, CDON och Amazon anger alla oljevolymen och ingen av dem ett gramtal, och utan matmängd går sidans tyngsta kriterium inte att sätta. Den som mest vill undvika PFAS i köket bör ändå titta på den.",
  },
  {
    brand: "Princess",
    name: "182612 Mini 1,5 L",
    approxPrice: 599,
    merchant: "Cervera",
    merchantUrl:
      "https://www.cervera.se/produkt/princess-fritos-182612-kompakt-1-5l-1000w",
    reason:
      "Den minsta fritösen i svensk handel och den enda där tillverkaren uttryckligen anger att kallzon saknas. 1,5 liter olja och 1 000 watt gör den till en maskin för en portion åt gången, och utan kallzon hamnar smulorna direkt mot värmeelementet, vilket mörknar oljan snabbare än i någon annan maskin här. Princess egen kapacitetsuppgift står dessutom som ett gram, vilket är ett fel i deras databas och inte ett tal vi kan använda.",
  },
  {
    brand: "Clatronic",
    name: "FR 3195 dubbelfritös 4 L",
    approxPrice: 861,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Clatronic-FR-3195/2598674",
    reason:
      "Den enda dubbelfritösen i svensk handel: två små korgar och en stor, med 4 liter olja, så du kan köra pommes och panerad fisk samtidigt utan att smakerna möts. Konstruktionen är genuint intressant och Clatronic bygger den runt dubbla kallzoner. Den rankas inte eftersom Clatronic inte anger hur mycket mat korgarna tar, vare sig sammanlagt eller var för sig.",
  },
  {
    brand: "Princess",
    name: "Deluxe 182060 5,5 L",
    approxPrice: 875,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Princess-Deluxe-182060/2986524",
    reason:
      "Ligger i Proshops fritöskategori men är en varmluftsfritös på 5,5 liter och 1 700 watt, alltså en maskin som lagar utan olja. Den hör hemma bland luftfritöserna och jämförs inte med oljemaskiner här, eftersom hela den här sidan handlar om vad oljan kostar. Butikens kategori stämmer inte med produkten, och det är värt att veta innan du beställer.",
  },
  {
    brand: "Esperanza",
    name: "EKG010 Deep Fryer",
    approxPrice: 339,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Esperanza-EKG010-Deep-Fryer/3069298",
    reason:
      "Billigaste fritösen i hela svepet och 73 kronor under den billigaste rankade. Esperanza publicerar varken matmängd, maxtemperatur eller om maskinen har kallzon, och deras svenska återförsäljare för inte vidare något av det. En fritös för under 350 kronor är ett rimligt köp för den som ska fritera fem gånger, men vi kan inte säga vad den gör.",
  },
  {
    brand: "Blaupunkt",
    name: "AFD501",
    approxPrice: 795,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Fritoeser/Blaupunkt-AFD501/2870891",
    reason:
      "Stod som förbeställning när priserna lästes, alltså inte i lager hos någon butik med program. Vi rankar inte en maskin som inte går att beställa hem, och Blaupunkt publicerar dessutom ingen matmängd för den.",
  },
];

/**
 * FAQ. Varje svar ska gå att läsa fristående, eftersom rutan kan visas ensam
 * i ett sökresultat.
 */
export const FRITOS_FAQ = [
  {
    question: "Hur ofta ska man byta olja i fritösen?",
    answer:
      "Efter fem till sju omgångar, och det säger två oberoende källor. Belgiska Test-Achats, som provat 24 fritöser i den provning Stiftung Warentest publicerade i december 2025, rekommenderar byte efter fem till sex friteringar. Tefals egen bruksanvisning för sina fritöser säger fem till sju gånger. Skälet är att matrester samlas i fettet och ändrar både smaken och hur oljan beter sig när den värms. Två saker förlänger intervallet. Det första är en kallzon, alltså ett svalare område i botten dit smulorna sjunker utan att brännas fast mot värmeelementet. Det andra är ett oljefilter: Tefals Oleoclean-modeller silar oljan automatiskt ned i en sluten låda när du vrider på ratten, medan flera andra maskiner inte har något filter alls. Har du friterat fisk bör du byta direkt efteråt oavsett hur många gånger oljan använts, eftersom smaken annars följer med till nästa maträtt.",
  },
  {
    question: "Hur mycket olja går det åt i en fritös?",
    answer:
      "Mellan 1,8 och 5 liter per fyllning, och det talet är inte samma sak som hur mycket mat maskinen gör. Litertalet som står på kartongen är oljemängden, alltså vad du köper och så småningom slänger. Matmängden är ett annat tal, och det anges i gram. Tefal listar dem som två skilda rader i sin egen jämförelsetabell. Skillnaden mellan maskiner är större än handeln antyder: Tefal Easy Pro, Princess 182727 och Severin FR 2431 tar alla tre exakt 3 liter olja och friterar 1,2 kilo, 600 gram respektive 400 gram mat. Samma oljeköp ger alltså tre gånger så mycket mat ur den ena som ur den andra. Räknat som liter olja per kilo mat spänner fältet från 1,54 till 7,50. Med rapsolja runt 30 kronor litern och byte var femte till sjätte omgång blir det en verklig skillnad för den som friterar regelbundet.",
  },
  {
    question: "Vad är en kallzon i en fritös?",
    answer:
      "Ett område i botten av oljegrytan som är kallare än resten, placerat under värmeelementet. Smulor som lossnar från panering eller pommes faller genom korgen och sjunker dit i stället för att fastna mot elementet och brännas. Bränd panering svartnar oljan, ger besk smak och kortar tiden innan oljan måste bytas, så en fungerande kallzon är i praktiken en billigare fritös att äga. Test-Achats fällde en av sina 24 provade fritöser bland annat för att kallzonen inte fungerade som den skulle, vilket visar att konstruktionen är en riktig skillnad och inte en marknadsföringsterm. De flesta maskiner över femhundra kronor har en, medan minifritöserna på en och en halv liter oftast saknar den. Princess anger själva att deras 182612 inte har någon. Kallzonen ersätter inte ett oljefilter: den hindrar smulorna från att brännas, men de ligger kvar i oljan tills du silar den.",
  },
  {
    question: "Vilken olja är bäst att fritera i?",
    answer:
      "Rapsolja eller solrosolja, alltså en neutral olja med hög rökpunkt. Fritering sker vid 175 till 190 grader, och oljan måste tåla den temperaturen upprepade gånger utan att brytas ned. Rapsolja har en rökpunkt runt 240 grader, är billig i femlitersdunk och har låg andel mättat fett. Olivolja går att fritera i men har lägre rökpunkt och en smak som följer med maten, och kallpressad olivolja ska inte användas alls. Fast frityrfett håller något längre men måste smältas försiktigt innan maskinen slås på fullt. Tefal påpekar i sin egen bruksanvisning en sak som är lätt att missa: blanda aldrig olika oljor, eftersom de har olika friteringstemperatur och blandningen kan emulgera och koka över. Fyll heller aldrig över maxstrecket, och torka maten torr innan den går i. Vatten i het olja är den vanligaste orsaken till att en fritös kokar över.",
  },
  {
    question: "Hur blir man av med använd frityrolja?",
    answer:
      "Häll den i en flaska eller burk med lock när den svalnat och lämna den på återvinningscentralen, eller släng den i restavfallet om mängden är liten. Stiftung Warentest är tydliga med två saker som inte fungerar. Oljan ska aldrig hällas i vasken eller toaletten, eftersom fett stelnar i rören och orsakar stopp. Det är ett av de vanligaste skälen till avloppsproppar i flerfamiljshus. Och den hör inte hemma i matavfallet, eftersom fetthinnan stör komposteringen, vilket är skälet till att flera kommuner uttryckligen inte vill ha den där. Många svenska återvinningscentraler tar emot frityrolja som farligt avfall eller i särskild behållare, och vissa livsmedelsbutiker har insamling. En fritös med automatisk filtrering minskar problemet på ett annat sätt: oljan används fler gånger innan den behöver kastas.",
  },
  {
    question: "Är en fritös bättre än en airfryer?",
    answer:
      "De gör olika saker, och Stiftung Warentest ställer upp skillnaden rakt. En oljefritös ger den krispighet och den smak som friterat faktiskt har, en jämn gyllenbrun yta, och tekniken är enkel och tålig. Priset är stora mängder fett, kraftig matos som sitter i länge, en omständlig rengöring och het olja som är en brännskaderisk. En airfryer kräver lite eller ingen olja, är snabbt igång eftersom ingen oljemängd ska värmas, är lättare att göra ren och luktar mindre, men når inte samma krispighet och smak, och portionerna är mindre. Det finns alltså inget svar som gäller alla. Ska du göra riktiga pommes frites, munkar eller friterad fisk med panering som håller ihop är oljefritösen rätt maskin. Ska du laga vardagsmat med mindre fett och slippa lukten är en airfryer det, och den jämförelsen finns på vår sida om airfryers.",
  },
  {
    question: "Hur många watt behöver en fritös?",
    answer:
      "Tillräckligt för att oljan snabbt ska komma tillbaka till 180 grader när kall mat läggs i, och det beror på hur mycket olja maskinen har. Fältet spänner från 800 till 3 270 watt. Det som händer med en svag maskin är att temperaturen faller när ett halvkilo frysta pommes går i, och maten ligger då och drar åt sig olja i stället för att få en yta direkt. Resultatet blir blekt och fett. Räkna därför watt i förhållande till oljemängden snarare än i sig: 800 watt på 2 liter är svagt, medan 2 200 watt på 3 liter är gott om marginal. Frityrar du mest fryst mat, som är det de flesta gör, är effekten viktigare än om du friterar färsk potatis i rumstemperatur. Ett enkelt sätt att kompensera för en svag maskin är att fritera i mindre omgångar och låta oljan komma tillbaka till temperatur emellan.",
  },
  {
    question: "Vilken fritös är bäst i test?",
    answer:
      "I vår jämförelse Tefal Versalio Deluxe FR4950 på 1 112 kronor, och skälet är hur den hushållar med oljan. Den friterar 1,3 kilo mat på 2 liter olja, vilket är både den största matmängden och den minsta oljemängden i jämförelsen, alltså 1,54 liter olja per kilo mat mot 7,50 för den törstigaste maskinen. Eftersom oljan ska bytas var femte till sjätte omgång är det den siffran som avgör vad en fritös kostar att äga. Den har ett permanent metallfilter i locket och en termostat som går ned till 80 grader, men den når bara 180 grader där tio av de elva andra går till 190. Vill du hellre ha de tio graderna och en yta som tål stålull är Tefal Easy Pro för 679 kronor bästa köpet, med 1,2 kilo mat på 3 liter olja. Ska oljan skötas åt dig silar Tefal Oleoclean Pro den automatiskt ned i en sluten låda. Betygen bygger på tillverkarnas publicerade specifikationer, inte på egna mätningar. Vi har inte friterat en enda pommes.",
  },
];

export const FRITOS_PRODUCTS = resolveProducts(FRITOS, SEEDS);

export const FRITOS_CONSIDERED: ConsideredProduct[] = CONSIDERED;
