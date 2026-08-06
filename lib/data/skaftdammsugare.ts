import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { SKAFTDAMMSUGARE } from "@/lib/test-pages";

/**
 * Skaftdammsugare. Underlag i .agent/research/skaftdammsugare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, GTIN, drifttider, sugkraft, vikter,
 * behållarvolymer, filtreringsgrader, ljudnivåer, laddtider och spänningar.
 * Priserna är lästa 2026-08-06 i butikernas egen JSON-LD eller på deras
 * produktsidor. Drifttidsstegen är lästa hos Bosch i deras tekniska datablad,
 * hos Philips och Electrolux på tillverkarnas egna sidor, och hos NetOnNet och
 * Kjell i butikens specifikationsruta.
 *
 * **Redaktionell bedömning:** kriteriepoängen. De är vår sammanvägning av
 * specifikationerna mot viktningen i lib/test-pages.ts, inte mätvärden. Vi har
 * inte haft en enda maskin i handen och skriver det rakt ut.
 *
 * **Bilder:** butikernas och Icecats packshots, åtta av åtta, körda genom
 * `pnpm images`.
 *
 * ## Alla åtta ingår i Råd & Röns provning
 *
 * Det är avsiktligt och det var inte gratis. Råd & Rön provade 65
 * skaftdammsugare och publicerar hela modellistan fritt, med tillverkare,
 * modell och prisspann. Varje maskin här står i den listan, och vårt pris
 * ligger inom deras spann. Betygen per modell ligger bakom betalvägg vi inte
 * betalat och återges aldrig.
 *
 * ⚠️ Fältet är därmed vitvarubranschens. Tineco, Shark, Roborock, Levoit och
 * eufy säljs i svensk näthandel men finns inte i provningen, och de ligger
 * bland de övervägda.
 *
 * ## Varför Miele Triflex HX2 inte rankas
 *
 * Den var påtänkt som premiumalternativ till Dyson. Elgiganten märker den
 * Discontinued och Whiteaway har den slutsåld, kontrollerat 2026-08-06. Att
 * ranka något som inte går att köpa är felet /elektrisk-rullgardin och
 * /smart-brandvarnare byggdes om för att rätta.
 *
 * ## Varför Bosch länkas till Power och inte till Bosch egen butik
 *
 * Bosch Home SE är sajtens första annonserbara program i en stor kategori,
 * 4 procent och 45 dygns cookie med ppcMarketing 2. Men Bosch egen butik ligger
 * omkring 20 procent över handeln: BCS1041WAC kostar 8 399 hos Bosch och 6 999
 * hos Elgiganten, BBS931PET 9 589 hos Bosch och 8 999 hos Tretti. Vi länkar den
 * butik som ger läsaren rätt pris. Kontrollera om vid nästa prisrunda.
 *
 * ## Butiksfördelningen
 *
 * Tre länkar till NetOnNet, två till Kjell, och en vardera till Power,
 * Elgiganten och Proshop. NetOnNet är oftast billigast i kategorin och står
 * inte i vår Adtraction-katalog, men driver ett program hos Adtraction som vi
 * inte läst villkoren för. Kjell ligger på 5 procent och Proshop på 3,2.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-06";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "bosch-unlimited-10",
    name: "Unlimited 10 BSS1041GHF",
    shortName: "Bosch Unlimited 10",
    brand: "Bosch",
    image: productImage(SKAFTDAMMSUGARE.slug, "bosch-unlimited-10"),
    tagline:
      "Batteriet lyfts ur och byts mot ett laddat, och det passar Boschs häcksax.",
    scores: {
      stadformaga: 4.5,
      batteri: 5,
      filtrering: 4.5,
      hantering: 3.5,
      prisvarde: 4,
    },
    price: 6498,
    merchant: "Power",
    merchantUrl:
      "https://www.power.se/hushaall-och-gaard/rengoring-och-dammsugning/skaftdammsugare/bosch-bss1041ghf-unlimited-10-skaftdammsugare/p-3568457/",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 852, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för dig som vill slippa ladda",
    pros: [
      "Batteriet lyfts ur på en sekund och sitter i Power for All 18V, samma paket som Boschs häcksax och borrmaskin",
      "65 minuter i ekoläge med borsten igång, alltså hela villan utan att byta batteri",
      "Tio års garanti på motorn, längre än någon annan här",
      "Kassettfiltret rengörs med en vridning i stället för att tvättas och torkas i ett dygn",
      "Komprimeringsspaken pressar ihop dammet, så behållaren behöver öppnas ungefär hälften så ofta",
    ],
    cons: [
      "2,9 kilo, näst tyngst här, och det märks i armen när taklisten ska dammsugas",
      "Dammbehållaren rymmer 4 deciliter mot Samsungs 8, så en villastädning kräver en tömning på vägen",
    ],
    specs: [
      { label: "Drifttid högsta läge", shortLabel: "Turbo", value: "11 min", highlight: true },
      { label: "Drifttid ekoläge", shortLabel: "Eko", value: "80 min", highlight: true },
      { label: "Sugkraft", value: "Ej angiven", highlight: true },
      {
        label: "Golvmunstycke",
        shortLabel: "Munstycke",
        value: "MicroClean med LED och antitrassel",
        highlight: true,
      },
      { label: "Filtrering", value: "HEPA, 99,99 %", highlight: true },
      { label: "Dammbehållare", shortLabel: "Behållare", value: "0,4 liter", highlight: true },
      { label: "Utbytbart batteri", shortLabel: "Byt batteri", value: "Ja, Power for All 18V", highlight: true },
      { label: "Vikt", value: "2,9 kg", highlight: true },
      { label: "Ljudnivå", value: "80 dB(A)", highlight: true },
      { label: "Laddningstid", value: "Ej angiven" },
      { label: "Batterispänning", value: "18 V, 4,0 Ah" },
      { label: "Handdammsugare", value: "Ja, skaftet lyfts av" },
      { label: "Förvaring", value: "Dockningsstation för maskin och tillbehör" },
      { label: "Höjd", value: "1 300 mm" },
      { label: "Garanti", value: "10 år på motorn" },
      { label: "Drifttid autoläge", value: "25 min" },
      { label: "Drifttid eko med golvmunstycke", value: "65 min" },
      { label: "Reparationsindex", value: "9,8" },
      { label: "Städlägen", value: "6" },
      { label: "GTIN", value: "4242005468331" },
    ],
    verdict:
      "Bosch Unlimited 10 är skaftdammsugaren för den som ska städa hela huset och inte bara ett rum. 6 498 kronor hos Power, alltså 2 500 mindre än Dyson V15, och den enda här vars batteri sitter i ett system du kanske redan äger.\n\nBatteriet är hela argumentet. Det lyfts ur handtaget och ersätts med ett laddat på en sekund, och det är samma Power for All 18V-paket som sitter i Boschs häcksax, borrmaskin och lövblås. Har du en av dem i garaget har du redan reservbatteriet. Det betyder också att maskinen går att laga om fem år, när cellerna tappat en tredjedel av sin kapacitet och alla andra här är elektronikavfall. **Med det motoriserade golvmunstycket och ekoläget håller den 65 minuter, vilket räcker till en normalvilla utan att du behöver byta något alls.** Motorn har tio års garanti, och kassettfiltret rengörs genom att du vrider en ring i stället för att tvätta och torka det i ett dygn.\n\nDen väger 2,9 kilo och det märks. Ska du dammsuga taklister och gardinstänger i ett rum med högt i tak är Philips 5000 Series nästan hälften så tung.\n\nKöp den. Det är den maskin som kostar minst per år av de åtta, eftersom den är den enda du kan sätta ett nytt batteri i i stället för en ny dammsugare.",
  },
  {
    id: "dreame-z30",
    name: "Z30",
    shortName: "Dreame Z30",
    brand: "Dreame",
    image: productImage(SKAFTDAMMSUGARE.slug, "dreame-z30"),
    tagline: "HEPA 14 i filtret, den högsta klassen som finns.",
    scores: {
      stadformaga: 4.5,
      batteri: 4,
      filtrering: 4.5,
      hantering: 4.5,
      prisvarde: 4,
    },
    price: 5490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/stadning-rengoring/dammsugare/paslosa-dammsugare/dreame-skaftdammsugare-z30-p65963",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 17, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för hem med hund eller katt",
    pros: [
      "Filtret håller klass HEPA 14, den högsta i jämförelsen, och fångar 99,99 procent ned till 0,1 mikrometer",
      "Två motoriserade munstycken i kartongen, varav ett för päls, så hundhår i mattan kräver ingen extra beställning",
      "2,2 kilo, alltså 700 gram lättare än Bosch och nästan ett kilo lättare än Dyson",
      "Tre års garanti, ett år mer än normalt i kategorin",
      "Skärmen visar hur smutsigt golvet är med färgade ringar, så du ser när du är klar med en yta",
    ],
    cons: [
      "Batteriet på 800 kronor mindre finns inte: Dreame säljer inget lösbatteri i svensk handel, så maskinen är förbrukad när cellerna är det",
      "84 decibel, alltså hörbart högre än Boschs 80 och Electrolux 500:s 79",
    ],
    specs: [
      { label: "Drifttid högsta läge", shortLabel: "Turbo", value: "Ej angiven", highlight: true },
      { label: "Drifttid ekoläge", shortLabel: "Eko", value: "90 min", highlight: true },
      { label: "Sugkraft", value: "310 AW / 28 000 Pa", highlight: true },
      {
        label: "Golvmunstycke",
        shortLabel: "Munstycke",
        value: "Motoriserat med LED, plus pälsborste",
        highlight: true,
      },
      { label: "Filtrering", value: "HEPA 14, 99,99 % vid 0,1 µm", highlight: true },
      { label: "Dammbehållare", shortLabel: "Behållare", value: "0,6 liter", highlight: true },
      { label: "Utbytbart batteri", shortLabel: "Byt batteri", value: "Ej angiven", highlight: true },
      { label: "Vikt", value: "2,2 kg", highlight: true },
      { label: "Ljudnivå", value: "84 dB(A)", highlight: true },
      { label: "Laddningstid", value: "4 h" },
      { label: "Batterispänning", value: "29,6 V, 8 celler á 3 200 mAh" },
      { label: "Handdammsugare", value: "Ja" },
      { label: "Förvaring", value: "Golvbas" },
      { label: "Höjd", value: "1 106 mm" },
      { label: "Garanti", value: "3 år" },
      { label: "Motorvarvtal", value: "150 000 v/min" },
      { label: "Skärm", value: "LCD med smutsindikering" },
      { label: "GTIN", value: "6976233677231" },
    ],
    verdict:
      "Dreame Z30 är maskinen för hemmet där det ligger päls på mattan. 5 490 kronor hos Kjell, och den enda här med filter i klass HEPA 14.\n\nDen klassen är inte marknadsföring utan en europeisk standard: HEPA 14 släpper igenom fem gånger mindre än HEPA 13 och betyder att det fina dammet stannar i behållaren i stället för att komma ut på andra sidan rummet. Har någon i hushållet pälsallergi är det den enskilt viktigaste raden i tabellen. **I kartongen ligger dessutom två motoriserade munstycken, ett universalmunstycke med LED och ett särskilt pälsmunstycke, så hundhår i en ullmatta kräver ingen extrabeställning för 600 kronor.** Med 2,2 kilo är den lättare än både Bosch och Dyson, och tre års garanti är ett år mer än kategorin brukar ge.\n\nBatteriet går inte att köpa löst i svensk handel. Sitter du om fyra år med halva drifttiden kvar är det en ny dammsugare som gäller, och det är den verkliga skillnaden mot Bosch.\n\nHar du hund eller katt och någon i huset nyser av det ska du ta den här. Bor du utan djur och vill kunna byta batteri i stället för maskin är Bosch Unlimited 10 tusen kronor dyrare och håller längre.",
  },
  {
    id: "samsung-jet-85-multi",
    name: "Jet 85 Multi VS20C852CTN",
    shortName: "Samsung Jet 85",
    brand: "Samsung",
    image: productImage(SKAFTDAMMSUGARE.slug, "samsung-jet-85-multi"),
    tagline: "8 deciliter i behållaren, och hela den går i diskhon.",
    scores: {
      stadformaga: 4,
      batteri: 4.5,
      filtrering: 4.5,
      hantering: 4,
      prisvarde: 4,
    },
    price: 4495,
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/dammsugare-rengoring/skaftdammsugare/samsung-jet-85-multi-sladdlos-skaftdammsugare-vs20c852ctnwa/641063",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för dig som hatar att tömma",
    pros: [
      "0,8 liters behållare, dubbelt mot Bosch och nästan tre gånger Electrolux, så en villastädning klaras utan tömning på vägen",
      "Hela behållaren inklusive cyklonpaketet får diskas, alltså slipper du torka ur den med hushållspapper",
      "Batteriet lyfts ur, och med ett extra i laddaren städar du två timmar i sträck",
      "3,5 timmars laddning, snabbast här, så den är klar till kvällen om du satt igång efter lunch",
      "Handenheten väger 1,44 kilo och når upp i bokhyllan utan att armen värker",
    ],
    cons: [
      "86 decibel, högst av alla åtta, så den går inte att köra medan någon sover i rummet bredvid",
      "Munstycket har LED men ingen antitrasselkonstruktion, så långt hår måste klippas loss ur borsten då och då",
    ],
    specs: [
      { label: "Drifttid högsta läge", shortLabel: "Turbo", value: "Ej angiven", highlight: true },
      { label: "Drifttid ekoläge", shortLabel: "Eko", value: "60 min", highlight: true },
      { label: "Sugkraft", value: "210 AW", highlight: true },
      {
        label: "Golvmunstycke",
        shortLabel: "Munstycke",
        value: "Motoriserat med LED",
        highlight: true,
      },
      { label: "Filtrering", value: "Fem skikt, 99,999 %", highlight: true },
      { label: "Dammbehållare", shortLabel: "Behållare", value: "0,8 liter", highlight: true },
      { label: "Utbytbart batteri", shortLabel: "Byt batteri", value: "Ja", highlight: true },
      { label: "Vikt", value: "2,43 kg", highlight: true },
      { label: "Ljudnivå", value: "86 dB(A)", highlight: true },
      { label: "Laddningstid", value: "3,5 h" },
      { label: "Batterispänning", value: "25,2 V" },
      { label: "Handdammsugare", value: "Ja, 1,44 kg" },
      { label: "Förvaring", value: "Laddstation, går att sätta på väggen" },
      { label: "Höjd", value: "930 mm" },
      { label: "Garanti", value: "2 år, längre på motorn" },
      { label: "Max ineffekt", value: "580 W" },
      { label: "Skärm", value: "LCD med lägesvisning" },
      { label: "GTIN", value: "8806095052847" },
    ],
    verdict:
      "Samsung Jet 85 Multi är maskinen för den som blir irriterad av att stanna mitt i städningen. 4 495 kronor hos Elgiganten, och den har jämförelsens största dammbehållare med 8 deciliter.\n\nDet talet gör mer skillnad i praktiken än sugkraften. En behållare på 3 deciliter, som båda Electrolux har, öppnas två eller tre gånger under en villastädning, och varje gång står du över soptunnan med ett moln av just det damm du nyss sög upp. **Här töms den en gång, och hela paketet inklusive cyklonerna får ställas i diskhon efteråt, så du slipper torka ur den med hushållspapper.** Femskiktsfiltret håller kvar 99,999 procent av mikrodammet, batteriet lyfts ur för ett extra pass, och 3,5 timmars laddning är snabbast av alla åtta.\n\nDen låter 86 decibel, mer än någon annan här. Ska du städa medan ett barn sover i rummet bredvid tar du Electrolux 500 på 79 i stället.\n\nKöp den om du bor i hus och vill bli klar i ett svep. Vill du ha samma stora behållare men lägre ljudnivå finns ingen sådan maskin i den här jämförelsen, och då är Bosch Unlimited 10 kompromissen som ligger närmast.",
  },
  {
    id: "dyson-v15-detect-absolute",
    name: "V15 Detect Absolute",
    shortName: "Dyson V15",
    brand: "Dyson",
    image: productImage(SKAFTDAMMSUGARE.slug, "dyson-v15-detect-absolute"),
    tagline: "Förseglad hela vägen, ned till 0,1 mikrometer.",
    scores: {
      stadformaga: 5,
      batteri: 4,
      filtrering: 5,
      hantering: 3,
      prisvarde: 2.5,
    },
    price: 8990,
    merchant: "NetOnNet",
    merchantUrl:
      "https://www.netonnet.se/art/hem-fritid/dammsugare-rengoring/skaftdammsugare/dyson-v15-detect-absolute/1030869.9265/",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.4, count: 1113, scale: 5, checkedAt: PRICE_CHECKED },
    award: "premium",
    superlative: "Bäst för allergiker",
    pros: [
      "Filtreringen är förseglad genom hela maskinen och håller kvar 99,99 procent ned till 0,1 mikrometer",
      "240 luftwatt i maxläge, högst av alla utom Dreame, och motorn ökar suget när den känner mer damm",
      "Lasern i det mjuka munstycket lyser snett över golvet och gör damm på mörk parkett synligt",
      "Två motoriserade munstycken ingår, varav ett med antitrasselkonstruktion för långt hår",
      "Skärmen räknar partiklarna i fyra storleksklasser medan du städar",
    ],
    cons: [
      "3,1 kilo, tyngst i jämförelsen, och den vikten sitter i handen och inte på golvet",
      "8 990 kronor, alltså 2 500 mer än Bosch Unlimited 10 för en maskin som väger mer och håller kortare",
    ],
    specs: [
      { label: "Drifttid högsta läge", shortLabel: "Turbo", value: "Ej angiven", highlight: true },
      { label: "Drifttid ekoläge", shortLabel: "Eko", value: "60 min", highlight: true },
      { label: "Sugkraft", value: "240 AW", highlight: true },
      {
        label: "Golvmunstycke",
        shortLabel: "Munstycke",
        value: "Mjukvals med laser, plus antitrasselborste",
        highlight: true,
      },
      { label: "Filtrering", value: "Förseglad helmaskin, 99,99 % vid 0,1 µm", highlight: true },
      { label: "Dammbehållare", shortLabel: "Behållare", value: "0,77 liter", highlight: true },
      { label: "Utbytbart batteri", shortLabel: "Byt batteri", value: "Ja, klickas i", highlight: true },
      { label: "Vikt", value: "3,1 kg", highlight: true },
      { label: "Ljudnivå", value: "Ej angiven", highlight: true },
      { label: "Laddningstid", value: "4,5 h" },
      { label: "Batterispänning", value: "Sju celler, litiumjon" },
      { label: "Handdammsugare", value: "Ja" },
      { label: "Förvaring", value: "Väggfäste" },
      { label: "Höjd", value: "1 260 mm" },
      { label: "Garanti", value: "2 år" },
      { label: "Motorvarvtal", value: "125 000 v/min" },
      { label: "Skärm", value: "LCD med partikelräkning" },
      { label: "GTIN", value: "5025155081754" },
    ],
    verdict:
      "Dyson V15 Detect Absolute är maskinen att köpa om någon i hushållet är allergisk. 8 990 kronor hos NetOnNet, dyrast här med två tusen kronor.\n\nSkälet är filterkedjan. Den är förseglad hela vägen från munstycket till utblåset och håller kvar 99,99 procent av partiklarna ned till 0,1 mikrometer, vilket är den storleksklass kvalsterallergen och pollen ligger i. En maskin som suger upp dammet och sedan blåser en del av det tillbaka i rummet gör allergin sämre, inte bättre, och det är den enda skillnaden mellan modellerna som märks i luften timmar efter att du städat klart. **Munstycket lyser dessutom med en grön laser snett över golvet, och på mörk parkett gör den skillnaden mellan att tro att man är klar och att se att man inte är det.** 240 luftwatt i maxläge, två motoriserade munstycken i kartongen och en motor som själv ökar suget när den känner mer smuts.\n\nDen väger 3,1 kilo, mer än någon annan här, och den vikten bärs i handen. En trappstädning i ett tvåvåningshus känns i axeln.\n\nKöp den om allergin bestämmer, eller om du har mörka golv och stör dig på damm du inte ser. Handlar det bara om att få rent är Bosch Unlimited 10 lika bra på golvet, väger 200 gram mindre och kostar 2 500 kronor mindre.",
  },
  {
    id: "philips-xc5141",
    name: "5000 Series XC5141/01",
    shortName: "Philips 5000",
    brand: "Philips",
    image: productImage(SKAFTDAMMSUGARE.slug, "philips-xc5141"),
    tagline: "1,5 kilo, alltså hälften av Dyson i samma hand.",
    scores: {
      stadformaga: 3.5,
      batteri: 4,
      filtrering: 3,
      hantering: 5,
      prisvarde: 4,
    },
    price: 3209,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Handdammsugare/Philips-Skaftdammsugare-5000-Series-XC5141-vacuum-cleaner-cordless-stickhandheld-sage/3337713",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Lättast att bära uppför trappan",
    pros: [
      "1,5 kilo, alltså hälften av Dyson V15 och 900 gram lättare än Samsung",
      "Batteriet lyfts ur, så ett extra paket förlänger passet utan att du behöver vänta fem timmar",
      "Aqua-modulen moppar hårda golv direkt efter att de dammsugits, i samma svep",
      "Golvmunstycket lyser upp golvet framför sig och en miniturboborste för möbler ingår",
      "60 minuter i ekoläge och 15 i turboläge, båda talen angivna av Philips själva",
    ],
    cons: [
      "Filtreringen håller kvar 98,5 procent av det fina dammet mot Dysons 99,99, så en och en halv procent går ut i rummet igen",
      "Moppfunktionen fuktar men skurar inte, och en riktig mopp gör det jobbet bättre",
    ],
    specs: [
      { label: "Drifttid högsta läge", shortLabel: "Turbo", value: "15 min", highlight: true },
      { label: "Drifttid ekoläge", shortLabel: "Eko", value: "60 min", highlight: true },
      { label: "Sugkraft", value: "Ej angiven", highlight: true },
      {
        label: "Golvmunstycke",
        shortLabel: "Munstycke",
        value: "Motoriserat med LED, plus miniturboborste",
        highlight: true,
      },
      { label: "Filtrering", value: "Tre steg, håller kvar 98,5 %", highlight: true },
      { label: "Dammbehållare", shortLabel: "Behållare", value: "Ej angiven", highlight: true },
      { label: "Utbytbart batteri", shortLabel: "Byt batteri", value: "Ja", highlight: true },
      { label: "Vikt", value: "1,5 kg", highlight: true },
      { label: "Ljudnivå", value: "84 dB(A)", highlight: true },
      { label: "Laddningstid", value: "4,5 h" },
      { label: "Batterispänning", value: "25,2 V" },
      { label: "Handdammsugare", value: "Ja" },
      { label: "Förvaring", value: "Laddställ" },
      { label: "Höjd", value: "1 200 mm" },
      { label: "Garanti", value: "2 år" },
      { label: "Moppfunktion", value: "Aqua-modul med fuktig duk" },
      { label: "Maximalt luftflöde", value: "840 l/min" },
      { label: "GTIN", value: "8720389035715" },
    ],
    verdict:
      "Philips 5000 Series XC5141/01 är den lätta maskinen i jämförelsen. 3 209 kronor hos Proshop, och 1,5 kilo mot Dysons 3,1.\n\nDen skillnaden bestämmer vad du orkar göra med den. En dammsugare som väger tre kilo blir en golvmaskin, för armen protesterar efter en halv trappa. En som väger halva det följer med upp på stolen och tar taklisten, ovanpå garderoben och trappräcket i samma runda. **Den går 60 minuter i ekoläge och 15 i turbo, och båda talen gäller handenheten utan golvmunstycke. Med munstycket på blir det kortare.** Batteriet lyfts ur för ett extra pass, och Aqua-modulen torkar hårda golv fuktigt direkt efter dammsugningen.\n\nFiltreringen håller kvar 98,5 procent av det fina dammet. Det låter mycket tills man ställer det bredvid Dysons 99,99, och det är den och en halv procenten som märks för en allergiker.\n\nBor du i en lägenhet med trappa till loftet, eller har du dålig rygg, är det den här du ska ha. Är allergin skälet till att du köper dammsugare räcker den inte, och då är Dreame Z30 nästa steg upp.",
  },
  {
    id: "electrolux-animal-700",
    name: "Animal 700 EP71AB14UG",
    shortName: "Electrolux 700",
    brand: "Electrolux",
    image: productImage(SKAFTDAMMSUGARE.slug, "electrolux-animal-700"),
    tagline: "95 luftwatt, alltså tre gånger den billigare Electrolux.",
    scores: {
      stadformaga: 3.5,
      batteri: 3.5,
      filtrering: 2.5,
      hantering: 4.5,
      prisvarde: 4.5,
    },
    price: 2490,
    merchant: "NetOnNet",
    merchantUrl:
      "https://www.netonnet.se/art/hem-fritid/dammsugare-rengoring/skaftdammsugare/electrolux-animal-700-cordless-ep71ab14ug/1028078.9265/",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 43, scale: 5, checkedAt: PRICE_CHECKED },
    award: "editor",
    superlative: "Bäst köp under 3 000 kronor",
    pros: [
      "Ett särskilt djurhårsmunstycke ingår, vilket annars är en tillbehörsbeställning på flera hundra kronor",
      "2,2 kilo och en meter hög, alltså den nättaste maskinen efter Philips",
      "Batteriet går att byta, så maskinen överlever sina celler",
      "Provad enligt IEC 62885-2 och 62885-4, samma standarder Råd & Rön använder",
      "95 luftwatt och 12,5 liter i sekunden, tre gånger den billigare Electrolux 500",
    ],
    cons: [
      "10 minuter på högsta effekt, kortast av alla som anger talet, så mattorna kräver planering",
      "Dubbel filtrering och 3 deciliters behållare, alltså varken den finaste filtreringen eller den största volymen",
    ],
    specs: [
      { label: "Drifttid högsta läge", shortLabel: "Turbo", value: "10 min", highlight: true },
      { label: "Drifttid ekoläge", shortLabel: "Eko", value: "40 min", highlight: true },
      { label: "Sugkraft", value: "95 AW", highlight: true },
      {
        label: "Golvmunstycke",
        shortLabel: "Munstycke",
        value: "Motoriserat med LED, plus djurhårsmunstycke",
        highlight: true,
      },
      { label: "Filtrering", value: "Två steg, tvättbart", highlight: true },
      { label: "Dammbehållare", shortLabel: "Behållare", value: "0,3 liter", highlight: true },
      { label: "Utbytbart batteri", shortLabel: "Byt batteri", value: "Ja", highlight: true },
      { label: "Vikt", value: "2,2 kg", highlight: true },
      { label: "Ljudnivå", value: "80 dB(A)", highlight: true },
      { label: "Laddningstid", value: "4,5 h" },
      { label: "Batterispänning", value: "14,4 V" },
      { label: "Handdammsugare", value: "Ja" },
      { label: "Förvaring", value: "Väggfäste" },
      { label: "Höjd", value: "1 008 mm" },
      { label: "Drifttid normalläge", value: "20 min" },
      { label: "Maximalt luftflöde", value: "12,5 l/s" },
      { label: "Provad enligt", value: "IEC 62885-2, IEC 62885-4" },
      { label: "GTIN", value: "7332543971534" },
    ],
    verdict:
      "Electrolux Animal 700 är den maskin som gör mest för minst pengar här. 2 490 kronor hos NetOnNet, och 95 luftwatt mot 29 hos Electrolux egen 500-modell för 800 kronor mindre.\n\nDe 800 kronorna är den bäst spenderade summan i hela jämförelsen. Sugeffekten tredubblas, munstycket får LED och ett särskilt djurhårsmunstycke läggs i kartongen, vilket annars kostar ett par hundra att beställa i efterhand. **Maskinen väger 2,2 kilo och mäter en meter, alltså tillräckligt nätt för att stå bakom en dörr i en tvårummare, och batteriet går att byta när det tagit slut.** Drifttiden faller i tre steg, 40 minuter på lägsta effekt, 20 på normal och 10 på högsta, så du vet vad ett pass på matta faktiskt kostar.\n\nDe tio minuterna på högsta effekt är också gränsen. Har du mycket matta och kör på max hela tiden hinner du ett rum i taget, och behållaren på 3 deciliter måste tömmas ungefär lika ofta.\n\nBor du i en tvåa eller trea och vill ha ordentligt sug utan att lägga fem tusen är det här köpet. Har du villa och vill bli klar på en laddning är Bosch Unlimited 10 fyra tusen dyrare och gör hela huset.",
  },
  {
    id: "xiaomi-g20-lite",
    name: "Vacuum Cleaner G20 Lite",
    shortName: "Xiaomi G20 Lite",
    brand: "Xiaomi",
    image: productImage(SKAFTDAMMSUGARE.slug, "xiaomi-g20-lite"),
    tagline: "5 deciliter i behållaren, mer än båda Electrolux tar.",
    scores: {
      stadformaga: 2.5,
      batteri: 3,
      filtrering: 3,
      hantering: 3.5,
      prisvarde: 4.5,
    },
    price: 1290,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/hem-fritid/stadning-rengoring/dammsugare/skaftdammsugare/xiaomi-vacuum-cleaner-g20-lite-skaftdammsugare-p24936",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 4, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst för dig som städar ett rum",
    pros: [
      "1 290 kronor, alltså en fjärdedel av vad Bosch kostar och sju gånger mindre än Dyson",
      "Fem filtreringssteg som håller kvar 99,9 procent av partiklar ned till 0,3 mikrometer, ovanligt i prisklassen",
      "0,5 liters behållare, större än båda Electrolux trots att den kostar hälften",
      "15 minuter i turboläge, alltså lika länge som Philips för en tredjedel av priset",
      "Väggfäste ingår, så den behöver ingen golvyta i en liten hall",
    ],
    cons: [
      "18 000 pascal är svagast av alla åtta, och en tjock ullmatta kommer inte att bli ren",
      "Batteriet på 2 200 mAh är inte utbytbart i handeln, så maskinen är förbrukad när det är det",
    ],
    specs: [
      { label: "Drifttid högsta läge", shortLabel: "Turbo", value: "15 min", highlight: true },
      { label: "Drifttid ekoläge", shortLabel: "Eko", value: "45 min", highlight: true },
      { label: "Sugkraft", value: "18 000 Pa", highlight: true },
      {
        label: "Golvmunstycke",
        shortLabel: "Munstycke",
        value: "Motoriserat med LED",
        highlight: true,
      },
      { label: "Filtrering", value: "Fem steg, 99,9 % vid 0,3 µm", highlight: true },
      { label: "Dammbehållare", shortLabel: "Behållare", value: "0,5 liter", highlight: true },
      { label: "Utbytbart batteri", shortLabel: "Byt batteri", value: "Ej angiven", highlight: true },
      { label: "Vikt", value: "2,4 kg", highlight: true },
      { label: "Ljudnivå", value: "Ej angiven", highlight: true },
      { label: "Laddningstid", value: "4–5 h" },
      { label: "Batterispänning", value: "22,2 V, 2 200 mAh" },
      { label: "Handdammsugare", value: "Ja, 2-i-1-munstycke ingår" },
      { label: "Förvaring", value: "Väggfäste ingår" },
      { label: "Effekt", value: "215 W" },
      { label: "GTIN", value: "6941812771921" },
    ],
    verdict:
      "Xiaomi G20 Lite är den billigaste maskinen i jämförelsen. 1 290 kronor hos Kjell, alltså en fjärdedel av Bosch och en sjundedel av Dyson.\n\nFör det priset får du mer än prislappen antyder. Femstegsfiltret håller kvar 99,9 procent av partiklarna ned till 0,3 mikrometer, vilket flera maskiner i dubbla prisklassen inte gör, och behållaren på 5 deciliter är större än båda Electrolux modellerna. **Turboläget håller 15 minuter, exakt lika länge som Philips 5000 Series för en tredjedel av priset, och väggfästet ligger i kartongen så maskinen tar ingen golvyta i en hall.**\n\n18 000 pascal är däremot svagast av alla åtta. På hårt golv och tunna mattor gör den jobbet, men en tjock ullmatta går inte att få ren med den, oavsett hur många gånger du drar munstycket fram och tillbaka.\n\nHar du en etta eller tvåa med parkett och laminat räcker den här hela vägen, och du sparar tre tusen kronor. Har du heltäckningsmatta eller en stor ullmatta ska du lägga 1 200 till och ta Electrolux Animal 700.",
  },
  {
    id: "electrolux-clean-500",
    name: "Clean 500 ES52CB18UG",
    shortName: "Electrolux 500",
    brand: "Electrolux",
    image: productImage(SKAFTDAMMSUGARE.slug, "electrolux-clean-500"),
    tagline: "79 decibel, tystast i jämförelsen.",
    scores: {
      stadformaga: 2,
      batteri: 3.5,
      filtrering: 2,
      hantering: 3,
      prisvarde: 3,
    },
    price: 1690,
    merchant: "NetOnNet",
    merchantUrl:
      "https://www.netonnet.se/art/hem-fritid/dammsugare-rengoring/skaftdammsugare/electrolux-clean-500-cordless-es52cb18ug/1028079.9265/",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.2, count: 140, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för bilen och soffan",
    pros: [
      "79 decibel, lägst av de sex som anger ljudnivån, så den går att köra på morgonen utan att väcka någon",
      "45 minuter på lägsta effekt, längst av de fyra billigaste maskinerna här",
      "Batteriet går att byta, ovanligt under två tusen kronor",
      "Filtret tvättas i vatten och sätts tillbaka, så det behöver inte köpas nytt",
      "58 procent återvunnen plast i chassit",
    ],
    cons: [
      "29 luftwatt, alltså en tredjedel av Animal 700 och en åttondel av Dyson, och det räcker inte till mattor",
      "3 deciliters behållare, minst tillsammans med Animal 700, så den öppnas flera gånger per städning",
    ],
    specs: [
      { label: "Drifttid högsta läge", shortLabel: "Turbo", value: "13 min", highlight: true },
      { label: "Drifttid ekoläge", shortLabel: "Eko", value: "45 min", highlight: true },
      { label: "Sugkraft", value: "29 AW", highlight: true },
      {
        label: "Golvmunstycke",
        shortLabel: "Munstycke",
        value: "PowerPro för flera underlag",
        highlight: true,
      },
      { label: "Filtrering", value: "Två steg, tvättbart", highlight: true },
      { label: "Dammbehållare", shortLabel: "Behållare", value: "0,3 liter", highlight: true },
      { label: "Utbytbart batteri", shortLabel: "Byt batteri", value: "Ja", highlight: true },
      { label: "Vikt", value: "2,8 kg", highlight: true },
      { label: "Ljudnivå", value: "79 dB(A)", highlight: true },
      { label: "Laddningstid", value: "4,5 h" },
      { label: "Batterispänning", value: "18 V" },
      { label: "Handdammsugare", value: "Ja" },
      { label: "Förvaring", value: "Laddställ på golvet" },
      { label: "Höjd", value: "1 105 mm" },
      { label: "Maximalt luftflöde", value: "11 l/s" },
      { label: "Återvunnen plast", value: "58 %" },
      { label: "GTIN", value: "7332543973194" },
    ],
    verdict:
      "Electrolux Clean 500 är den tysta maskinen. 1 690 kronor hos NetOnNet, och 79 decibel mot Samsungs 86.\n\nDe sju decibelen är mer än de låter: decibelskalan är logaritmisk, och sju steg är ungefär halva den upplevda ljudstyrkan. Det gör den till den enda här du kan köra klockan sju på morgonen i en lägenhet med tunna väggar utan att någon vaknar. **45 minuter på lägsta effekt är dessutom längst av de fyra billigaste maskinerna, och batteriet går att byta, vilket är ovanligt under två tusen kronor.** Filtret tvättas i vatten och sätts tillbaka, alltså inget som behöver köpas nytt.\n\n29 luftwatt är däremot mycket lågt. Den tar smulor och damm från parkett och klinker, men en matta kommer den inte igenom, och det är hela skillnaden mot Animal 700 som har 95.\n\nKöp den som andradammsugare, till bilen, soffan och trappan, eller till en etta med hårt golv. Ska den vara hushållets enda dammsugare och du har någon matta alls ligger Xiaomi G20 Lite 400 kronor under den och Animal 700 800 över, och båda tar mer.",
  },
];

export const SKAFTDAMMSUGARE_PRODUCTS = resolveProducts(SKAFTDAMMSUGARE, SEEDS);

export const SKAFTDAMMSUGARE_FILTERS: ComparisonFilter[] = [
  {
    key: "under-3000",
    label: "Under 3 000 kr",
    ids: ["philips-xc5141", "electrolux-animal-700", "xiaomi-g20-lite", "electrolux-clean-500"],
  },
  {
    key: "bytbart-batteri",
    label: "Batteriet går att byta",
    ids: [
      "bosch-unlimited-10",
      "samsung-jet-85-multi",
      "dyson-v15-detect-absolute",
      "philips-xc5141",
      "electrolux-animal-700",
      "electrolux-clean-500",
    ],
  },
  {
    key: "hepa",
    label: "HEPA eller förseglad filtrering",
    ids: ["bosch-unlimited-10", "dreame-z30", "dyson-v15-detect-absolute"],
  },
  {
    key: "under-2-5-kg",
    label: "Under 2,5 kg",
    ids: [
      "dreame-z30",
      "samsung-jet-85-multi",
      "philips-xc5141",
      "electrolux-animal-700",
      "xiaomi-g20-lite",
    ],
  },
];

export const SKAFTDAMMSUGARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Miele",
    name: "Triflex HX2 Cat & Dog",
    reason:
      "Premiumalternativet till Dyson, och den maskin flera jämförelser sätter högst. Elgiganten märker den som utgången och Whiteaway har den slutsåld, kontrollerat i augusti 2026. Vi rankar ingenting som inte går att köpa i dag.",
    approxPrice: 9695,
    merchant: "Whiteaway",
    merchantUrl:
      "https://www.whiteaway.se/hem-tradgard/dammsugare/sladdlos-dammsugare/product/miele-triflex-hx2-cat-dog-obsidian-black/",
  },
  {
    brand: "Dyson",
    name: "V16 Piston Animal",
    reason:
      "Efterföljaren till V15 och Dysons nya toppmodell. Den är för ny för att ingå i Råd & Röns provning av 65 skaftdammsugare, och alla åtta vi rankar gör det. Vi tar in den vid nästa uppdatering.",
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/dammsugare-rengoring/skaftdammsugare/dyson-v16-piston-animal-sladdlos-skaftdammsugare-492963-01/975585",
  },
  {
    brand: "Bosch",
    name: "Unlimited 9 BCS931GAC",
    reason:
      "Föregångaren till vinnaren, 500 kronor billigare och med samma utbytbara Power for All-batteri. Vi rankar en maskin per serie, och Unlimited 10 har den nyare borsten och den bättre filtreringen. Är budgeten sex tusen är den här ett rimligt köp.",
    approxPrice: 5995,
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/hem-hushall-tradgard/dammsugare-rengoring/skaftdammsugare/bosch-unlimited-9-sladdlos-skaftdammsugare-bcs931gac/923133",
  },
  {
    brand: "Bosch",
    name: "Unlimited 7 ProHygienic Aqua BCS712HYG5",
    reason:
      "Samma batterisystem som vinnaren men med moppfunktion. Moppning på en skaftdammsugare fuktar golvet utan att skura det, och för 650 kronor mer än Unlimited 10 är det en funktion vi inte kan rekommendera någon att betala för.",
    approxPrice: 7149,
    merchant: "Bosch",
    merchantUrl:
      "https://www.bosch-home.se/sv/product/dammsugare/sladdlosa-dammsugare/unlimited/unlimited-7/BCS712HYG5",
  },
  {
    brand: "Princess",
    name: "339380",
    reason:
      "Den billigaste skaftdammsugaren i Råd & Röns provning tillsammans med Xiaomi, runt 1 300 kronor. Xiaomi G20 Lite ligger i samma prisläge, har större behållare och fem filtersteg, så den fick platsen.",
    approxPrice: 1299,
  },
  {
    brand: "Nilfisk",
    name: "S1 Home Plus",
    reason:
      "Dansktillverkad och byggd för lång livslängd, men 5 299 kronor för en maskin utan motoriserat golvmunstycke i grundpaketet är fel pengar. Roterande borste är det som gör att en skaftdammsugare tar djurhår bättre än en slang.",
    approxPrice: 5299,
  },
];

export const SKAFTDAMMSUGARE_FAQ = [
  {
    question: "Vilken skaftdammsugare är bäst 2026?",
    answer:
      "Bosch Unlimited 10 BSS1041GHF, 6 498 kronor hos Power. Batteriet lyfts ur och sitter i Power for All 18V, alltså samma paket som Boschs häcksax och borrmaskin, och den håller 65 minuter i ekoläge med det motoriserade golvmunstycket igång. Motorn har tio års garanti. Är allergin skälet till köpet tar du Dyson V15 Detect Absolute för 8 990, och ska du lägga så lite som möjligt gör Xiaomi G20 Lite jobbet i en etta för 1 290.",
  },
  {
    question: "Hur länge räcker batteriet på en skaftdammsugare egentligen?",
    answer:
      "Ungefär en tiondel till en fjärdedel av talet på kartongen, om du städar med borsten igång på högsta effekt. Bosch anger 80 minuter i ekoläge med ett tillbehör utan motor, 65 i ekoläge med golvmunstycket, 25 i autoläge och 11 i turboläge, allt för samma maskin och samma batteri. Philips anger 60 mot 15 och skriver ut att båda gäller handenheten utan golvmunstycke. Electrolux Animal 700 anger 40, 20 och 10. Råd & Rön mätte sju minuter till en kvart vid maximal effekt för de skaftdammsugare som toppar deras test.",
  },
  {
    question: "Kan en skaftdammsugare ersätta en vanlig dammsugare?",
    answer:
      "Numera ja, om du köper en av de bättre. Råd & Rön skrev fram till 2025 att skaftdammsugaren inte kunde mäta sig med den traditionella, och ändrade sig i testet som publicerades 13 augusti 2025: skaftmodellerna har kommit ikapp och i vissa fall gått om i städförmåga. Det gäller bara de bästa. En svag skaftdammsugare är enligt samma test betydligt sämre än en svag golvdammsugare, och de riktigt bra skaftmodellerna kostar flera tusen mer än en golvdammsugare med samma städförmåga.",
  },
  {
    question: "Vad är skillnaden på luftwatt och pascal?",
    answer:
      "De mäter två olika saker och går inte att räkna om mellan. Luftwatt beskriver hur mycket arbete luftströmmen utför, alltså sug och flöde tillsammans, och det är måttet Dyson, Samsung, Dreame och Electrolux anger. Pascal beskriver undertrycket, alltså hur hårt maskinen suger när ingenting flödar, och det är måttet Xiaomi och de flesta kinesiska tillverkare använder. Villkoren skiljer sig också: Samsung anger att deras 210 luftwatt är uppmätta vid inloppet till ett verktyg utan motor med tom dammbehållare. Jämför tal inom samma enhet och samma tillverkare, aldrig mellan.",
  },
  {
    question: "Behöver jag HEPA-filter i en dammsugare?",
    answer:
      "Om någon i hushållet har allergi eller astma, ja. HEPA är en klassning enligt EN 1822 där bara klass 13 och 14 räknas, och skillnaden mot ett vanligt utblåsfilter är hur mycket av det uppsugna dammet som kommer ut i rummet igen. Råd & Rön mätte partikelutsläpp på upp till nio procent hos de sämsta modellerna i sitt test, och konstaterade att de sämre skaftdammsugarna saknar utblåsfilter helt. Dreame Z30 har klass HEPA 14, Bosch Unlimited 10 anger HEPA-system med 99,99 procents filtrering och Dyson V15 är förseglad genom hela maskinen ned till 0,1 mikrometer.",
  },
  {
    question: "Går det att byta batteri i en skaftdammsugare?",
    answer:
      "På de flesta här, men systemen skiljer sig. Bosch Unlimited 10 använder Power for All 18V, ett batteri som delas med Boschs trädgårds- och elverktyg, så reservbatteriet kan redan ligga i garaget. Samsung Jet 85, Dyson V15, Philips 5000 Series och båda Electrolux har egna löstagbara paket som säljs som reservdelar. Ett bytbart batteri betyder två saker: du kan städa dubbelt så länge med ett extra paket, och maskinen går att laga när cellerna tappat kapacitet efter tre till fem år i stället för att kastas.",
  },
  {
    question: "Vad är skillnaden mellan skaftdammsugare, handdammsugare och robotdammsugare?",
    answer:
      "En skaftdammsugare är sladdlös, har ett långt skaft och ett motoriserat golvmunstycke, och de flesta går att bygga om till handdammsugare genom att skaftet lyfts av. En ren handdammsugare saknar både skaft och golvmunstycke och är gjord för soffan, bilen och trappan, inte för golvytor. En robotdammsugare kör själv och löser den dagliga underhållsstädningen, men Råd & Rön ger samtliga 62 robotar i sitt test lägsta betyg för att få upp damm ur golvspringor. De flesta hushåll som köper robot behåller en skaftdammsugare för det roboten inte klarar.",
  },
  {
    question: "Fungerar moppfunktionen på en skaftdammsugare?",
    answer:
      "Nej, inte i den mening du hoppas på. Råd & Rön moppade lera och choklad med de skaftmodeller som har funktionen, på samma sätt som de testar robotdammsugarnas moppning, och kom fram till att resultatet blir ungefär lika dåligt. Funktionen fuktar golvet men ger ingen mekanisk kraft, alltså inget skurande. Philips 5000 Series har en Aqua-modul och Bosch Unlimited 7 en vattentank, och båda gör hårda golv fuktiga efter dammsugningen. Ska golvet bli rent tar du en vanlig mopp.",
  },
  {
    question: "Hur mycket låter en skaftdammsugare?",
    answer:
      "Mellan 79 och 86 decibel av de sex som anger talet. Electrolux Clean 500 ligger lägst på 79, Electrolux Animal 700 och Bosch Unlimited 10 på 80, Dreame Z30 och Philips på 84 och Samsung Jet 85 högst på 86. Skalan är logaritmisk, så de sju decibelen mellan Electrolux 500 och Samsung motsvarar ungefär halva den upplevda ljudstyrkan. Bor du i lägenhet med tunna väggar och vill kunna städa tidigt på morgonen är det raden att titta på.",
  },
  {
    question: "Vilken skaftdammsugare är bäst för djurhår?",
    answer:
      "Dreame Z30 för 5 490 kronor. Den har två motoriserade munstycken i kartongen, varav ett särskilt pälsmunstycke, och HEPA 14-filter som tar hand om allergenerna som följer med hårstråna. Vill du lägga mindre är Electrolux Animal 700 för 2 490 den maskin som ger mest djurhårsmunstycke per krona. Det som gör en skaftdammsugare bättre än en slang på päls är den roterande borsten i munstycket, och därför spelar borstens konstruktion större roll än sugkraften: Bosch och Dyson har båda antitrasselborstar som gör att långt hår inte lindar sig runt valsen.",
  },
];
