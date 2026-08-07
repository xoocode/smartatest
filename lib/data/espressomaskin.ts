import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { ESPRESSOMASKIN } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /espressomaskin.
 *
 * Sjunde sidan i gruppen Kök, byggd 2026-08-07. Sidan rankar tolv
 * **helautomater**, alltså bönmaskiner med inbyggd kvarn, mellan 2 700 och
 * 14 888 kronor. Portafiltermaskinen ligger bland övervägda efter
 * användarbeslut.
 *
 * Priser, artikelnummer och EAN är lästa i produktsidornas egen JSON-LD hos
 * Coffee Friend på PRICE_CHECKED, och samtliga tolv låg i lager den dagen.
 * Specifikationerna är kontrollerade mot **tillverkaren** där de bär vikt:
 * Melittas svenska produktsidor, Siemens egna produkt- och supportsidor,
 * Philips, DeLonghis, Krups och Gaggias registreringar via Icecat.
 *
 * AFFILIATE-SWAP — `merchantUrl` är butikens egen produktsida. Inget
 * `affiliateUrl` någonstans; vi har inget program i kategorin ännu. Se
 * lib/links.ts för vad LINK_MODE står på i dag.
 *
 * ## Priset köper mjölken, inte kaffet
 *
 * Sidans fynd, och det som ordnar hela rankningen. Tre oberoende led pekar åt
 * samma håll:
 *
 * - **Råd & Rön** mätte kaffet ur 57 helautomater till mellan 53 och 71 grader
 *   och skriver att sambandet mellan låg temperatur och sämre kaffe inte går
 *   att se. Deras tre Bäst i test kostade 8 000 till 13 000; deras Bra köp
 *   kostade under 4 000.
 * - **Ljud & Bild** provade de fyra dyraste maskinerna på marknaden 2023 och
 *   skrev om Siemens EQ900 att den "slår konkurrenterna på utrustning och
 *   pris, men förlorar på den viktigaste egenskapen: smaken".
 * - **Samma publikation** provade mellanklassen 2024 och gav en DeLonghi för
 *   10 500 kronor omdömet "den överlägset mest välsmakande espresson i testet,
 *   och det är långt ner till den näst bästa".
 *
 * Det som faktiskt växer med priset är mjölkautomatiken, antalet drycker i
 * menyn och storleken på behållarna. Därför väger mjölksystemet 25 och
 * prisvärde 20, och därför hamnar den dyraste maskinen på fjärde plats.
 *
 * ## Kvarnen går åt andra hållet än priset
 *
 * DeLonghi Magnifica S kostar 3 159 kronor och har **tretton** malningssteg.
 * Siemens EQ900 kostar 14 888 och har sex. Nivona CafeRomatica NICR 550 kostar
 * 6 440 och har fyra, alltså den grövsta upplösningen i hela jämförelsen till
 * näst högsta priset i den nedre halvan. Malningsgraden är den inställning som
 * gör mest för smaken, och den följer inte prislappen alls.
 *
 * ## ⚠️ Butikens strukturerade attribut hade fel om vinnaren
 *
 * Coffee Friends PIM anger `Antal behållare med bönor: 1` för Melitta Barista T
 * Smart. Melittas egen produktsida anger `Bean Select (bönbehållare med två
 * kammare): Ja` och beskriver funktionen i prosa. Tillverkaren gäller, och
 * uppgiften är en del av skälet till att maskinen vinner. Samma PIM anger
 * `Intensitet: 230 W` för Philips EP5547/90, alltså nätspänningen i ett
 * effektfält, vilket är skälet att effekten inte är hämtad därifrån.
 *
 * ## ⚠️ Ett testomdöme som INTE flyttades
 *
 * Ljud & Bilds hårda omdöme om Siemens EQ900 gäller en maskin de beskriver som
 * havande "två bönbehållare, var och en med sin egen kvarn". Siemens egen
 * produktsida för TQ903R09 anger **en** bönbehållare på 375 gram. Det är en
 * annan variant, och omdömet står därför inte i produktens verdict. Samma
 * disciplin som Wilfa Xplode Vital på /blender.
 *
 * ## Elva av tolv länkar går till Coffee Friend
 *
 * Fler än vanan att sprida länkarna medger, och det är kontrollerat snarare än
 * bekvämt. Coffee Friend är enda flermärkesspecialisten med affiliateprogram i
 * kategorin, bär 10 procent med trettio dagars cookie och tillåter betald
 * sökning. De var dessutom billigast på varje modell som kontrollerades mot
 * ett alternativ: Siemens EQ900 kostar 15 499 hos både Proshop och Siemens
 * egen butik mot 14 888 här, och Melitta Barista T Smart 8 990 hos Melitta
 * själva mot 8 550. Byt där en annan butik går om priset vid nästa prisrunda.
 */

export const PRICE_CHECKED = "2026-08-07";

const SEEDS: ProductSeed[] = [
  {
    id: "melitta-barista-t-smart",
    brand: "Melitta",
    name: "Barista T Smart F83/0-102",
    shortName: "Melitta Barista T Smart",
    image: productImage(ESPRESSOMASKIN.slug, "melitta-barista-t-smart"),
    tagline:
      "Två bönkammare, så koffeinfritt på kvällen kostar ett knapptryck i stället för en tömning.",
    scores: {
      /* Slang ner i mjölkpaketet, två mjölkdrycker med ett tryck, justerbar
         skumstorlek och eget rengöringsprogram för mjölksystemet. Ingen kanna
         att diska. */
      mjolksystem: 4.5,
      /* 18 kaffedrycker, 4 sparade profiler under My Coffee, fem styrkelägen
         och Melitta Connect. Flest drycker och flest profiler i fältet
         tillsammans med Gaggia. */
      installningar: 5,
      /* Bara fem malningssteg, mot tretton hos DeLonghi. Väger upp med två
         bönkammare, vilket ingen annan rankad maskin har. */
      kvarn: 4,
      /* Avtagbar bryggenhet enligt Melitta, automatiskt rengörings- och
         avkalkningssystem, eget mjölkrengöringsprogram. */
      rengoring: 4.5,
      /* 8 550 kr är fjärde dyrast här. Utrustningen motiverar det, men
         Philips 3300 ger merparten för 3 551 kronor mindre. */
      prisvarde: 3.5,
    },
    price: 8550,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/kahvikone-melitta-f83-0-102-barista-t-smart/",
    award: "winner",
    superlative: "Bäst för två sorters bönor",
    pros: [
      "Två bönkammare, så du växlar mellan vanligt och koffeinfritt utan att tömma behållaren",
      "Arton kaffedrycker i menyn, flest tillsammans med Gaggia Cadorna Prestige",
      "Fyra sparade profiler, så två personer slipper ställa om maskinen efter varandra",
      "Slangen går ner i mjölkpaketet, alltså ingen mjölkkanna att diska",
      "Bryggenheten lyfts ur och sköljs under kranen",
    ],
    cons: [
      "Fem malningssteg, mot tretton hos DeLonghi Magnifica S som kostar 5 391 kronor mindre",
      "10,3 kilo och 46,7 centimeter djup, så den vill ha en fast plats på bänken",
      "8 550 kronor är 3 551 mer än Philips 3300 LatteGo, som gör cappuccino lika automatiskt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "8 550 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "Slang till mjölkpaket", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "2", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "5 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Stål", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Avtagbar", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "18", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "4", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "1,8 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "270 g", highlight: true },
      { label: "Antal bönbehållare", value: "2 kammare (Bean Select)" },
      { label: "Kaffestyrka, steg", value: "5" },
      { label: "Kaffetemperatur, steg", value: "3" },
      { label: "Rengöringsprogram mjölksystem", value: "Ja" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Färgskärm" },
      { label: "App", value: "Melitta Connect" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Effekt", value: "1 450 W" },
      { label: "Yttermått", value: "25,9 × 46,7 × 37,2 cm" },
      { label: "Vikt", value: "10,3 kg" },
      { label: "GTIN", value: "4006508217809" },
    ],
    verdict:
      "Melitta Barista T Smart kostar 8 550 kronor och är den enda maskinen här med två bönkammare. Du fyller den ena med vanliga bönor och den andra med koffeinfria, och växlar med en spak ovanpå.\n\n**Det är den funktion som gör mest skillnad i ett hushåll där alla inte dricker likadant.** På varenda annan maskin i jämförelsen betyder koffeinfritt på kvällen att du häller ur behållaren, fyller på nytt, och häller tillbaka på morgonen. Här är det ett handgrepp. Därtill arton drycker i menyn och fyra sparade profiler, så din cappuccino och någon annans latte macchiato ligger kvar var för sig i stället för att ställas om varje gång. Mjölken suger maskinen upp genom en slang som går rakt ner i paketet, alltså finns ingen mjölkkanna att diska, och ett eget program sköljer slangen efteråt. Bryggenheten lyfts ur och sköljs under kranen.\n\nKvarnen är maskinens svaga punkt. Fem malningssteg är hälften av vad Gaggia Cadorna Prestige ger och knappt en tredjedel av DeLonghi Magnifica S tretton, och det är den inställning som gör mest för smaken när du byter böna. Har du köpt en ljusrostad böna som kräver finare malning än den mörka du hade innan, kan det hända att du hamnar mellan två steg.\n\nKöp den om ni är fler än en om maskinen, eller om koffeinfritt hör till kvällen hemma hos er. Dricker du samma böna varje dag och alltid ensam betalar du för två funktioner du inte använder, och då gör Philips 3300 LatteGo samma cappuccino för 4 999 kronor.",
  },
  {
    id: "philips-ep5547",
    brand: "Philips",
    name: "5500 LatteGo EP5547/90",
    shortName: "Philips 5500 LatteGo",
    image: productImage(ESPRESSOMASKIN.slug, "philips-ep5547"),
    tagline:
      "Mjölkkannan är två delar utan slangar, och båda går i diskmaskinen efter cappuccinon.",
    scores: {
      /* LatteGo: 0,26 l kanna i två delar, inga slangar, diskmaskinssäker.
         En mjölkdryck med ett tryck. Kannan är liten och räcker till ett par
         koppar. */
      mjolksystem: 4,
      /* Fyra sparade profiler, fem styrkelägen, app. Antalet drycker i menyn
         är inte belagt hos tillverkaren och står som streck. */
      installningar: 4,
      /* Tolv malningssteg och keramisk kvarn, 275 g bönbehållare. */
      kvarn: 4.5,
      /* Avtagbar bryggenhet, rengöringsprogram, och ett mjölksystem på två
         delar utan slangar är det minsta som finns att diska i hela fältet. */
      rengoring: 5,
      /* 6 526 kr för tolvstegskvarn, profiler och app är starkt mot Melittas
         8 550 och Siemens 14 888. */
      prisvarde: 4,
    },
    price: 6526,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/philips-5500-lattego-ep5547-90-helautomatisk-kaffemaskin-svart-krom/",
    superlative: "Bäst för dig som vill diska snabbt",
    pros: [
      "Mjölkkannan är två delar utan slangar och tål maskindisk",
      "Tolv malningssteg med keramisk kvarn, dubbelt mot Melitta Barista T Smart",
      "Fyra sparade profiler och appstyrning för 2 024 kronor mindre än Melitta",
      "Bryggenheten lyfts ur och sköljs under kranen",
      "24,6 centimeter bred, alltså bland de smalaste här",
    ],
    cons: [
      "Ljud & Bild, som provat exakt den här modellen, skriver att espresson smakar lite vattnig",
      "Mjölkkannan rymmer 0,26 liter, vilket räcker till ett par koppar innan påfyllning",
      "En mjölkdryck med ett tryck, mot två hos Melitta Barista T Smart och Siemens EQ900",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "6 526 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "LatteGo, kanna på maskinen", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "1", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "12 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Keramisk", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Avtagbar", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "Ej angiven", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "4", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "1,8 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "275 g", highlight: true },
      { label: "Antal bönbehållare", value: "1" },
      { label: "Kaffestyrka, steg", value: "5" },
      { label: "Kaffetemperatur, steg", value: "3" },
      { label: "Mjölkbehållare", value: "0,26 l" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Färgskärm" },
      { label: "App", value: "Ja" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Yttermått", value: "24,6 × 43,3 × 37,1 cm" },
      { label: "Vikt", value: "8 kg" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8710103952268" },
    ],
    verdict:
      "Philips 5500 LatteGo kostar 6 526 kronor och har kategorins enklaste mjölklösning. Kannan består av två delar som klickas isär, den har inga slangar alls, och båda delarna går i diskmaskinen.\n\n**Det låter som en detalj och är det inte.** Ett mjölksystem med slangar måste sköljas medan mjölken är färsk, annars sätter det igen sig, och det är den syssla som får folk att sluta använda mjölkfunktionen efter ett halvår. Här lyfter du av två plastdelar och ställer in dem. Därtill tolv malningssteg med keramisk kvarn, alltså mer än dubbelt så fin upplösning som Melitta Barista T Smart ger för 2 024 kronor mer, plus fyra sparade profiler och appstyrning. Bryggenheten lyfts ur och sköljs den också.\n\nLjud & Bild har provat just EP5547/90 med två olika bönor och skriver att espresson smakar lite vattnig, och att mjölkkannan kopplas in på ett irriterande sätt. Det är det enda hands on-omdömet som finns om den här modellen, och det pekar åt motsatt håll mot specifikationerna. Kannan rymmer dessutom 0,26 liter, så tre latte i rad betyder påfyllning.\n\nVälj den om det som avgör är hur lång tid maskinen tar av din morgon efter att koppen är drucken. Är det själva espresson som ska bära köpet läser du Ljud & Bilds omdöme först, och tar Melitta Barista T Smart i stället.",
  },
  {
    id: "philips-ep3341",
    brand: "Philips",
    name: "3300 LatteGo EP3341/50",
    shortName: "Philips 3300 LatteGo",
    image: productImage(ESPRESSOMASKIN.slug, "philips-ep3341"),
    tagline: "Cappuccino med ett tryck och tolv malningssteg för 4 999 kronor.",
    scores: {
      /* Samma LatteGo-kanna som 5500: två delar, inga slangar,
         diskmaskinssäker. En mjölkdryck med ett tryck. */
      mjolksystem: 4,
      /* Fem drycker i menyn, noll sparade profiler enligt tillverkaren, tre
         styrkelägen. Klart tunnare än 5500 och det är hela skillnaden. */
      installningar: 2.5,
      /* Tolv malningssteg, keramisk kvarn, 275 g. Samma kvarn som 5500. */
      kvarn: 4.5,
      /* Avtagbar bryggenhet, rengöringsprogram, LatteGo på två delar. */
      rengoring: 5,
      /* 4 999 kr för samma kvarn och samma mjölksystem som 6 526-kronorsmodellen. */
      prisvarde: 4.5,
    },
    price: 4999,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/philips-3300-series-ep3341-50-automatisk-kaffemaskin-svart/",
    award: "editor",
    superlative: "Mest maskin för under 5 000",
    pros: [
      "Samma tolvstegs keramiska kvarn som modellen för 1 527 kronor mer",
      "Samma LatteGo-kanna på två delar, utan slangar och tålig mot maskindisk",
      "Cappuccino med ett tryck för 4 999 kronor",
      "Bryggenheten lyfts ur och sköljs under kranen",
      "Färgskärm, till skillnad från båda DeLonghi-maskinerna",
    ],
    cons: [
      "Inga sparade profiler, så två personer med olika smak får ställa om varje gång",
      "Fem drycker i menyn, mot arton hos Melitta Barista T Smart",
      "Tre styrkelägen, mot fem hos DeLonghi Magnifica S som kostar 1 840 kronor mindre",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "4 999 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "LatteGo, kanna på maskinen", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "1", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "12 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Keramisk", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Avtagbar", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "5", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "0", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "1,8 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "275 g", highlight: true },
      { label: "Antal bönbehållare", value: "1" },
      { label: "Kaffestyrka, steg", value: "3" },
      { label: "Kaffetemperatur, steg", value: "3" },
      { label: "Mjölkbehållare", value: "0,26 l" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Färgskärm" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Effekt", value: "1 500 W" },
      { label: "Yttermått", value: "24,6 × 37,1 × 43,3 cm" },
      { label: "Vikt", value: "8 kg" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8720389027659" },
    ],
    verdict:
      "Philips 3300 LatteGo kostar 4 999 kronor och delar kvarn och mjölksystem med Philips egen modell för 6 526. Tolv malningssteg, keramiska skivor och samma tvådelade mjölkkanna utan slangar.\n\n**Det gör den till den billigaste vägen till en riktig enknappscappuccino i hela jämförelsen.** Under den här prislappen får du manuell ångstav, alltså en kanna du håller själv i ungefär en minut per kopp. Här trycker du en gång. Kvarnen är samma som i maskiner för det dubbla, och tolv steg räcker gott för att följa en böna från mörk till ljus rostning. Bryggenheten lyfts ur och sköljs under kranen, och mjölkkannan går i diskmaskinen.\n\nDet du betalar mindre för är menyn. Fem drycker mot arton hos Melitta, och noll sparade profiler, vilket märks först när ni är två som vill ha olika starkt kaffe ur samma maskin. Tre styrkelägen är också färre än de fem DeLonghi Magnifica S ger för 1 840 kronor mindre.\n\nFör de allra flesta är det här maskinen att ta. Den gör kaffet och mjölken automatiskt, kvarnen är kategorins näst finaste, och pengarna som blir över räcker till bönor i ett år. Vill ni ha varsin profil får ni gå upp till 5500 LatteGo.",
  },
  {
    id: "siemens-tq903r09",
    brand: "Siemens",
    name: "EQ900 TQ903R09",
    shortName: "Siemens EQ900",
    image: productImage(ESPRESSOMASKIN.slug, "siemens-tq903r09"),
    tagline: "375 gram bönor och 2,3 liter vatten, alltså tre dagar mellan påfyllningarna.",
    scores: {
      /* Integrerad mjölkbehållare på 0,7 l, två mjölkdrycker med ett tryck,
         justerbar skumstorlek, varm mjölk och autoMilk Clean. Kategorins mest
         kompletta mjölklösning. */
      mjolksystem: 5,
      /* Tio drycker i menyn, tre profiler, fyra styrkelägen, Home Connect och
         eGrinder som styr malningen elektroniskt per dryck. */
      installningar: 5,
      /* Sex malningssteg, keramisk kvarn, störst bönbehållare i fältet på
         375 g. Stegantalet är hälften av Philips tolv. */
      kvarn: 3.5,
      /* Avtagbar bryggenhet enligt Siemens egen serviceanvisning, autoMilk
         Clean efter varje dryck, rengörings- och avkalkningsprogram. */
      rengoring: 4.5,
      /* 14 888 kr är 74 procent dyrare än näst dyraste rankade maskinen, och
         kvarnen är grövre än den i en maskin för 2 700. */
      prisvarde: 2,
    },
    price: 14888,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/kaffemaskin-siemens-eq900-tq903r09/",
    award: "premium",
    superlative: "Bäst för storhushållet",
    pros: [
      "375 gram bönor och 2,3 liter vatten, störst av båda i jämförelsen",
      "Två mjölkdrycker med ett tryck, och mjölkbehållaren sitter på maskinen",
      "Mjölksystemet sköljs automatiskt efter varje dryck",
      "Malningsgraden styrs elektroniskt per dryck i stället för med ett vred",
      "Enda maskinen här med 19 bars pump och Home Connect",
    ],
    cons: [
      "Sex malningssteg, alltså grövre upplösning än Philips 800 Series för 2 700 kronor",
      "31,5 centimeter bred och 11,8 kilo, den största maskinen i jämförelsen",
      "14 888 kronor är 74 procent mer än näst dyraste maskinen här",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "14 888 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "Integrerad mjölkbehållare", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "2", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "6 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Keramisk", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Avtagbar", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "10", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "3", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "2,3 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "375 g", highlight: true },
      { label: "Antal bönbehållare", value: "1" },
      { label: "Kaffestyrka, steg", value: "4" },
      { label: "Kaffetemperatur, steg", value: "3" },
      { label: "Mjölkbehållare", value: "0,7 l" },
      { label: "Rengöringsprogram mjölksystem", value: "autoMilk Clean, efter varje dryck" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Färgskärm" },
      { label: "App", value: "Home Connect" },
      { label: "Pumptryck", value: "19 bar" },
      { label: "Effekt", value: "1 500 W" },
      { label: "Yttermått", value: "39,2 × 31,5 × 47 cm" },
      { label: "Vikt", value: "11,8 kg" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "4242003904961" },
    ],
    verdict:
      "Siemens EQ900 kostar 14 888 kronor och är byggd för volym. 375 gram bönor och 2,3 liter vatten är mest av båda här, och för två kaffedrickare betyder det ungefär tre dagar mellan påfyllningarna i stället för en.\n\n**Mjölklösningen är den mest kompletta i jämförelsen.** En behållare på 0,7 liter sitter på maskinen, två mjölkdrycker kommer med ett tryck utan att koppen flyttas, skummets mängd går att ställa, och systemet sköljer sig självt efter varje dryck. Malningsgraden styrs elektroniskt och sätts individuellt för varje dryck i menyn, alltså kan din espresso och din americano mala olika utan att du rör ett vred. Tio drycker, tre profiler och styrning via Home Connect.\n\nKvarnen har ändå bara sex steg. Philips 800 Series, som kostar 2 700 kronor, har tolv. Sex steg är gott om du kör samma böna året runt och snålt om du byter rostgrad ofta, och det är den enda punkten där prislappen inte syns i utrustningen. Maskinen är dessutom 31,5 centimeter bred och väger 11,8 kilo, alltså den enda här som kräver riktig planering av bänken.\n\nKöp den om det står tre eller fler personer i kön på morgonen, eller om ni dricker mjölkdrycker varje dag och vill att maskinen sköter mjölken helt själv. Vill du bara ha bättre kaffe än din nuvarande maskin ger lägger du 4 999 på Philips 3300 LatteGo och tio tusen på bönor.",
  },
  {
    id: "gaggia-cadorna-prestige",
    brand: "Gaggia",
    name: "Cadorna Prestige RI9604-01",
    shortName: "Gaggia Cadorna Prestige",
    image: productImage(ESPRESSOMASKIN.slug, "gaggia-cadorna-prestige"),
    tagline: "Fjorton drycker i menyn och tio malningssteg för 7 493 kronor.",
    scores: {
      /* Automatisk skummare med 0,6 l kanna, en mjölkdryck med ett tryck,
         eget mjölkrengöringsprogram. Mindre komplett än slangsystemen. */
      mjolksystem: 3.5,
      /* Fjorton drycker, fyra sparade profiler, tre temperaturlägen. Näst
         flest drycker efter Melitta. */
      installningar: 4.5,
      /* Tio malningssteg med keramisk kvarn och 300 g bönbehållare. Näst
         finaste kvarnen efter DeLonghi och Philips. */
      kvarn: 4,
      /* Avtagbar bryggenhet, mjölkrengöringsprogram, rengöringsprogram. */
      rengoring: 4,
      /* 7 493 kr placerar den mitt emellan Philips 5500 och Melitta, med
         fler drycker men klenare mjölklösning. */
      prisvarde: 3.5,
    },
    price: 7493,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/kaffemaskin-gaggia-ri9604-01/",
    superlative: "Bäst för många sorters drycker",
    pros: [
      "Fjorton drycker i menyn, näst flest efter Melitta Barista T Smart",
      "Tio malningssteg med keramisk kvarn",
      "Fyra sparade profiler, lika många som Melitta och Philips 5500",
      "300 gram bönbehållare och 1 900 watt, mest effekt i jämförelsen",
      "Kaffepipen går att ställa mellan 70 och 155 millimeter, alltså rymmer den en hög lattekopp",
    ],
    cons: [
      "En mjölkdryck med ett tryck, mot två hos Melitta Barista T Smart och Siemens EQ900",
      "Mjölkkannan på 0,6 liter är en extra del att diska, till skillnad från slangsystemen",
      "1,5 liters vattentank är den näst minsta här, så påfyllning oftare",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "7 493 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "Automatisk skummare med kanna", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "1", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "10 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Keramisk", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Avtagbar", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "14", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "4", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "1,5 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "300 g", highlight: true },
      { label: "Kaffetemperatur, steg", value: "3" },
      { label: "Mjölkbehållare", value: "0,6 l" },
      { label: "Rengöringsprogram mjölksystem", value: "Ja" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Färgskärm" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Effekt", value: "1 900 W" },
      { label: "Kaffepipens höjd", value: "70–155 mm" },
      { label: "Vikt", value: "9,6 kg" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8710103903789" },
    ],
    verdict:
      "Gaggia Cadorna Prestige kostar 7 493 kronor och har fjorton drycker i menyn, bara fyra färre än vinnaren. Tio malningssteg med keramisk kvarn sätter den i kategorins övre skikt på just den punkt där de dyra maskinerna är svagast.\n\n**Kaffepipen är den mest anpassningsbara här:** den går att ställa mellan 70 och 155 millimeter, alltså rymmer den både en espressokopp och ett högt latteglas utan att du behöver flytta något. Fyra sparade profiler räcker till ett hushåll, bönbehållaren tar 300 gram, och 1 900 watt är mest effekt i jämförelsen. Bryggenheten lyfts ur, och mjölksystemet har ett eget rengöringsprogram.\n\nMjölken är där den tappar mot vinnaren. Kannan på 0,6 liter är en fysisk del som ska av, tömmas och diskas, och du får en mjölkdryck med ett tryck där Melitta Barista T Smart och Siemens EQ900 ger två. Vattentanken rymmer 1,5 liter, bara Melitta Passione OT har mindre, så påfyllningen kommer oftare än maskinens pris antyder.\n\nDen här är för dig som vill ha bredden i menyn och tycker att en mjölkkanna att diska är ett rimligt pris för den. Är det tvärtom, alltså mjölken som ska vara osynlig, kostar Philips 5500 LatteGo 967 kronor mindre och lämnar två diskmaskinssäkra plastdelar efter sig.",
  },
  {
    id: "siemens-te651209rw",
    brand: "Siemens",
    name: "EQ.6 plus s100 TE651209RW",
    shortName: "Siemens EQ.6 plus s100",
    image: productImage(ESPRESSOMASKIN.slug, "siemens-te651209rw"),
    tagline: "Mjölksystemet sköljer sig självt efter varje kopp, utan att du rör en knapp.",
    scores: {
      /* Slang till mjölkpaket eller extern behållare, en mjölkdryck med ett
         tryck, justerbar skumstorlek, varm mjölk och autoMilk Clean. */
      mjolksystem: 4,
      /* Färgskärm och aromaDouble Shot, men antalet drycker och profiler är
         inte belagt hos tillverkaren. Betyget sätts på det som är känt. */
      installningar: 3,
      /* Sex malningssteg, keramisk kvarn, 300 g bönbehållare. */
      kvarn: 3.5,
      /* Avtagbar bryggenhet, autoMilk Clean efter varje dryck, inget att
         diska eftersom slangen går i mjölkpaketet. */
      rengoring: 4.5,
      /* 6 145 kr mot Philips 5500 på 6 526 med tolvstegskvarn och profiler. */
      prisvarde: 3.5,
    },
    price: 6145,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/siemens-eq-6-plus-s100-te651209rw-helautomatisk-kaffemaskin-bonor-svart-silver/",
    superlative: "Bäst för dig som köper mjölkpaket",
    pros: [
      "Slangen går ner i mjölkpaketet, alltså ingen kanna att diska",
      "Mjölksystemet sköljs automatiskt efter varje dryck",
      "Bönbehållaren tar 300 gram, tredje mest i jämförelsen",
      "Maskinen mal och brygger i två omgångar för samma kopp",
      "Bryggenheten lyfts ur och sköljs under kranen",
    ],
    cons: [
      "Sex malningssteg, alltså hälften av vad Philips 3300 LatteGo ger för 1 146 kronor mindre",
      "En mjölkdryck med ett tryck, mot två hos Krups Evidence ECO som kostar 1 355 kronor mindre",
      "46,8 centimeter djup, den näst djupaste här",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "6 145 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "Slang till mjölkpaket", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "1", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "6 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Keramisk", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Avtagbar", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "Ej angiven", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "Ej angiven", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "1,7 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "300 g", highlight: true },
      { label: "Antal bönbehållare", value: "1" },
      { label: "Mjölkbehållare", value: "0,7 l" },
      { label: "Rengöringsprogram mjölksystem", value: "autoMilk Clean, efter varje dryck" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Färgskärm" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Effekt", value: "1 500 W" },
      { label: "Yttermått", value: "28,1 × 46,8 × 38,5 cm" },
      { label: "Vikt", value: "9,6 kg" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "4242003806425" },
    ],
    verdict:
      "Siemens EQ.6 plus s100 kostar 6 145 kronor och tar mjölken direkt ur paketet. En slang går ner i förpackningen du redan har i kylen, och det finns ingenting att diska efteråt.\n\n**Sköljningen sker dessutom av sig själv efter varje dryck.** Det är den funktion som avgör om mjölkdelen fortfarande används om ett år, för ett system som kräver ett manuellt moment efter varje cappuccino är ett system folk slutar använda. Maskinen mal och brygger i två omgångar för samma kopp, vilket Siemens kallar aromaDouble Shot, och bönbehållaren tar 300 gram. Bryggenheten lyfts ur och sköljs under kranen.\n\nKvarnen har sex steg. Philips 3300 LatteGo, som kostar 1 146 kronor mindre, har tolv, och för den som byter böna ofta är det den enda skillnaden som märks i koppen. Maskinen är också 46,8 centimeter djup, vilket är mer än en standardbänk gärna ger under ett överskåp.\n\nDen passar dig som köper mjölk i literpaket och vill att maskinen ska hämta den själv. Handlar du mjölk i mindre förpackningar, eller vill ha kannan stående på maskinen, är Gaggia Cadorna Prestige den rakare lösningen för 1 348 kronor mer.",
  },
  {
    id: "philips-ep0820",
    brand: "Philips",
    name: "800 Series EP0820/00",
    shortName: "Philips 800 Series",
    image: productImage(ESPRESSOMASKIN.slug, "philips-ep0820"),
    tagline: "Tolv malningssteg och färskmalda bönor för 2 700 kronor.",
    scores: {
      /* Manuell ångstav. Du håller kannan själv, ungefär en minut per kopp. */
      mjolksystem: 2,
      /* Tre drycker i menyn, svartvit skärm, tre temperaturlägen. */
      installningar: 2,
      /* Tolv malningssteg med keramisk kvarn och 275 g bönbehållare, alltså
         samma kvarn som Philips maskiner för det dubbla. */
      kvarn: 4.5,
      /* Avtagbar bryggenhet, rengöringsprogram, och en ångstav är det enda
         som ska sköljas. */
      rengoring: 4,
      /* 2 700 kr är billigast här, och kvarnen är kategorins näst finaste. */
      prisvarde: 4.5,
    },
    price: 2700,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/kaffemaskin-philips-series-800-ep0820-00/",
    award: "budget",
    superlative: "Billigaste vägen till färsk kvarn",
    pros: [
      "2 700 kronor, billigast i jämförelsen",
      "Tolv malningssteg med keramisk kvarn, samma som i Philips maskiner för det dubbla",
      "Bryggenheten lyfts ur och sköljs under kranen",
      "7,5 kilo, lättast här, så den går att flytta undan",
      "Kaffepipen ställs mellan 85 och 145 millimeter",
    ],
    cons: [
      "Manuell ångstav, alltså ungefär en minut per cappuccino med kannan i handen",
      "Tre drycker i menyn och svartvit skärm",
      "43,3 centimeter djup trots att den är billigast och lättast",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 700 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "Manuell ångstav", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "0", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "12 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Keramisk", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Avtagbar", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "3", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "Ej angiven", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "1,8 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "275 g", highlight: true },
      { label: "Antal bönbehållare", value: "1" },
      { label: "Kaffetemperatur, steg", value: "3" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Svartvit" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Effekt", value: "1 500 W" },
      { label: "Kaffepipens höjd", value: "85–145 mm" },
      { label: "Yttermått", value: "24,6 × 43,3 × 37,1 cm" },
      { label: "Vikt", value: "7,5 kg" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8720389016448" },
    ],
    verdict:
      "Philips 800 Series kostar 2 700 kronor och är billigast i jämförelsen. För det får du en keramisk kvarn med tolv malningssteg, alltså samma upplösning som Philips egna maskiner för det dubbla priset.\n\n**Kvarnen är hela argumentet.** Skillnaden mellan en bönmaskin och en kapselmaskin sitter i att kaffet mals när du trycker på knappen, och tolv steg räcker för att följa en böna oavsett hur den är rostad. Bryggenheten lyfts ur och sköljs under kranen, maskinen väger 7,5 kilo och är därmed den enda här som är lätt nog att ställa undan mellan helgerna, och kaffepipen ställs mellan 85 och 145 millimeter.\n\nMjölken sköter du själv. En ångstav betyder att du håller kannan under röret i ungefär en minut per kopp och lär dig hur den låter när skummet är klart. Det är inte svårt, men det är ett moment varje gång, och det är skälet till att maskinen ligger sist i jämförelsens tyngsta kriterium. Menyn är också tunn med tre drycker och en svartvit skärm.\n\nTa den om du dricker svart kaffe eller om du tycker att skumma mjölk är en del av nöjet. Ska maskinen göra cappuccinon åt dig får du gå till Philips 3300 LatteGo, som kostar 2 299 kronor mer och har samma kvarn.",
  },
  {
    id: "delonghi-ecam21117",
    brand: "De'Longhi",
    name: "Magnifica S ECAM 21.117.B",
    shortName: "DeLonghi Magnifica S 21.117",
    image: productImage(ESPRESSOMASKIN.slug, "delonghi-ecam21117"),
    tagline: "Tretton malningssteg, den finaste upplösningen i jämförelsen, för 3 159 kronor.",
    scores: {
      /* Manuell ångstav, noll mjölkdrycker med ett tryck. */
      mjolksystem: 2,
      /* Två drycker i menyn, ingen skärm, noll profiler. Fem styrkelägen och
         fyra temperaturlägen är ändå fler än flera dyrare maskiner ger. */
      installningar: 1.5,
      /* Tretton malningssteg, alltså kategorins finaste, med stålkvarn och
         250 g bönbehållare. */
      kvarn: 5,
      /* Avtagbar bryggenhet enligt Icecat, självrengörande, och bara en
         ångstav att skölja. */
      rengoring: 3.5,
      /* 3 159 kr för kategorins finaste kvarn. */
      prisvarde: 4.5,
    },
    price: 3159,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/kahvikone-delonghi-ecam-21-117-b-magnifica-s/",
    superlative: "Billigaste med 13 malningssteg",
    pros: [
      "Tretton malningssteg, finaste upplösningen i hela jämförelsen",
      "3 159 kronor, näst billigast här",
      "Fem styrkelägen och fyra temperaturlägen, fler än Siemens EQ900 ger",
      "Bryggenheten lyfts ur och sköljs under kranen",
      "34 centimeter hög, lägst här, så den går under de flesta överskåp",
    ],
    cons: [
      "Manuell ångstav, alltså ingen cappuccino med ett tryck",
      "Ingen skärm alls, bara vred och knappar",
      "10 kilo trots att den är en av de minsta, så den står där du ställer den",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "3 159 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "Manuell ångstav", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "0", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "13 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Stål", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Avtagbar", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "2", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "0", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "1,8 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "250 g", highlight: true },
      { label: "Antal bönbehållare", value: "1" },
      { label: "Kaffestyrka, steg", value: "5" },
      { label: "Kaffetemperatur, steg", value: "4" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Ingen, vred och knappar" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Effekt", value: "1 450 W" },
      { label: "Yttermått", value: "23,8 × 43 × 34 cm" },
      { label: "Vikt", value: "10 kg" },
      { label: "GTIN", value: "8004399326163" },
    ],
    verdict:
      "De'Longhi Magnifica S ECAM 21.117.B kostar 3 159 kronor och har tretton malningssteg. Det är den finaste upplösningen i hela jämförelsen, och den sitter i den näst billigaste maskinen.\n\n**Malningsgraden är den inställning som gör mest för hur kaffet smakar**, eftersom den styr hur länge vattnet är i kontakt med kaffet. För grovt och espresson blir tunn och sur, för fint och den blir besk. Tretton steg betyder att du kan finjustera efter varje ny påse i stället för att välja mellan två lägen som båda är fel. Därtill fem styrkelägen och fyra temperaturlägen, alltså fler av båda än Siemens EQ900 för 14 888 kronor erbjuder, och en bryggenhet som lyfts ur och sköljs under kranen. Med 34 centimeters höjd går den under de flesta överskåp.\n\nDet finns ingen skärm. Du styr med två vred och några knappar, menyn har två drycker, och mjölken skummar du själv under ångstaven. Maskinen sparar inga inställningar per person, så bor ni två som vill ha olika starkt kaffe vrider ni på ratten varje gång.\n\nDen här är för dig som bryr dig om vad som händer i koppen och inte om vad som händer på skärmen. Vill du ha cappuccino utan att hålla i en mjölkkanna är det Philips 3300 LatteGo som gäller, för 1 840 kronor mer.",
  },
  {
    id: "delonghi-ecam22110",
    brand: "De'Longhi",
    name: "Magnifica S ECAM 22.110.SB",
    shortName: "DeLonghi Magnifica S 22.110",
    image: productImage(ESPRESSOMASKIN.slug, "delonghi-ecam22110"),
    tagline: "Samma trettonstegskvarn som systermodellen, i silver med cappuccinomunstycke.",
    scores: {
      /* Manuell ångstav med cappuccinomunstycke. Fortfarande du som håller
         kannan; noll mjölkdrycker med ett tryck. */
      mjolksystem: 2,
      /* Två drycker, ingen skärm, noll profiler, men fem styrkelägen och fyra
         temperaturlägen. Marginellt bredare än 21.117 enligt tillverkaren. */
      installningar: 2,
      /* Tretton malningssteg, stålkvarn, 250 g. Identisk med systermodellen. */
      kvarn: 5,
      /* Avtagbar bryggenhet, självrengörande, en ångstav att skölja. */
      rengoring: 3.5,
      /* 3 599 kr, alltså 440 kr mer än 21.117 för i praktiken samma maskin. */
      prisvarde: 3.5,
    },
    price: 3599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/kahvikone-delonghi-ecam-22-110-sb/",
    superlative: "Finaste malningen med ångstav",
    pros: [
      "Tretton malningssteg, delad finaste upplösning i jämförelsen",
      "Fem styrkelägen och fyra temperaturlägen",
      "Cappuccinomunstycke på ångstaven, som blandar in luft åt dig",
      "Bryggenheten lyfts ur och sköljs under kranen",
      "23 centimeter bred, smalast i jämförelsen",
    ],
    cons: [
      "440 kronor dyrare än ECAM 21.117.B, som har samma kvarn och samma tank",
      "Ingen skärm och inga sparade profiler",
      "Manuell ångstav, alltså ingen mjölkdryck med ett tryck",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "3 599 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "Manuell ångstav", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "0", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "13 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Stål", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Avtagbar", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "2", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "0", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "1,8 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "250 g", highlight: true },
      { label: "Antal bönbehållare", value: "1" },
      { label: "Kaffestyrka, steg", value: "5" },
      { label: "Kaffetemperatur, steg", value: "4" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Ingen, vred och knappar" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Effekt", value: "1 450 W" },
      { label: "Yttermått", value: "23 × 43 × 34 cm" },
      { label: "Vikt", value: "10 kg" },
      { label: "GTIN", value: "8004399325067" },
    ],
    verdict:
      "De'Longhi Magnifica S ECAM 22.110.SB kostar 3 599 kronor och är silverversionen av samma grundmaskin som 21.117. Samma trettonstegskvarn, samma 1,8-literstank, samma 250 gram bönor.\n\n**Skillnaden mot systermodellen är cappuccinomunstycket på ångstaven.** Det blandar in luft i mjölken automatiskt medan du håller kannan, vilket gör skummet jämnare för den som inte har tränat handleden. Du står fortfarande där i ungefär en minut. Med 23 centimeters bredd är den smalast i hela jämförelsen, alltså den som lättast får plats mellan en brödrost och en vattenkokare, och bryggenheten lyfts ur och sköljs under kranen.\n\nDe 440 kronorna är svåra att motivera. Kvarnen, tanken, bönbehållaren och pumpen är identiska med den billigare systermodellen, och menyn är lika kort: två drycker, ingen skärm, inga sparade profiler.\n\nVälj den framför 21.117 bara om du vill ha silver på bänken eller vet med dig att du kommer skumma mjölk ofta och vill ha hjälp med luften. Ska du spara pengarna tar du 21.117, och ska mjölken skötas av maskinen är det Philips 3300 LatteGo som är svaret.",
  },
  {
    id: "melitta-passione-ot",
    brand: "Melitta",
    name: "Passione OT F53/1-101",
    shortName: "Melitta Passione OT",
    image: productImage(ESPRESSOMASKIN.slug, "melitta-passione-ot"),
    tagline: "38 centimeter djup och 25 breda, alltså maskinen för den korta bänken.",
    scores: {
      /* Slang till mjölkpaket, en mjölkdryck med ett tryck, justerbar
         skumstorlek och eget mjölkrengöringsprogram. */
      mjolksystem: 3.5,
      /* Tio drycker i menyn och fem styrkelägen, men inga belagda profiler. */
      installningar: 3.5,
      /* Fem malningssteg med stålkvarn, och bara 125 g bönbehållare, alltså
         minst i hela jämförelsen. */
      kvarn: 2,
      /* Mjölkrengöringsprogram och rengöringsprogram. Bryggenheten är inte
         belagd hos tillverkaren och drar inte ner betyget. */
      rengoring: 3.5,
      /* 5 259 kr med minsta bönbehållaren och minsta tanken i fältet. */
      prisvarde: 2.5,
    },
    price: 5259,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/kahvikone-melitta-f53-1-passione-ot-2/",
    superlative: "Bäst för det lilla köket",
    pros: [
      "38 centimeter djup och 25,3 bred, alltså den nätta maskinen i jämförelsen",
      "Tio drycker i menyn, fler än både Philips-modellerna",
      "Slangen går ner i mjölkpaketet, så det finns ingen kanna att diska",
      "Eget rengöringsprogram för mjölksystemet",
      "Fem styrkelägen och färgskärm",
    ],
    cons: [
      "125 gram bönbehållare, mindre än hälften av vad de flesta här tar",
      "1,2 liter vattentank, minst i jämförelsen, alltså påfyllning varannan dag",
      "Fem malningssteg, mot tretton hos DeLonghi Magnifica S för 2 100 kronor mindre",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "5 259 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "Slang till mjölkpaket", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "1", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "5 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Stål", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Ej angiven", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "10", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "Ej angiven", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "1,2 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "125 g", highlight: true },
      { label: "Antal bönbehållare", value: "1" },
      { label: "Kaffestyrka, steg", value: "5" },
      { label: "Kaffetemperatur, steg", value: "3" },
      { label: "Rengöringsprogram mjölksystem", value: "Ja" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Färgskärm" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Effekt", value: "1 450 W" },
      { label: "Yttermått", value: "25,3 × 38 × 39 cm" },
      { label: "Vikt", value: "8,3 kg" },
      { label: "GTIN", value: "4006508215478" },
    ],
    verdict:
      "Melitta Passione OT kostar 5 259 kronor och är byggd smal och grund. 25,3 centimeter bred och 38 djup gör den till den enda maskinen här med automatisk mjölk som får plats på en bänk under ett överskåp utan att sticka ut.\n\n**Måtten är hela poängen, och Melitta har betalat för dem med behållarna.** Bönfacket tar 125 gram, alltså mindre än hälften av vad de flesta i jämförelsen rymmer och en tredjedel av Siemens EQ900. Vattentanken på 1,2 liter är också minst här. För två kaffedrickare betyder det påfyllning av bönor ungefär varje vecka och av vatten varannan dag. Mjölken tar den däremot från paketet via en slang, så där finns inget att diska, och ett eget program sköljer systemet.\n\nKvarnen har fem steg. DeLonghi Magnifica S ger tretton för 2 100 kronor mindre, och det är den skillnad som märks först när du byter till en böna med annan rostgrad. Tio drycker i menyn är samtidigt fler än båda Philips-maskinerna erbjuder.\n\nKöp den om bänkytan är det som avgör och du ändå vill ha cappuccino med ett tryck. Har du plats står Siemens EQ.6 plus s100 med samma slanglösning, dubbelt så stort bönfack och automatisk sköljning för 886 kronor mer.",
  },
  {
    id: "krups-ea897a",
    brand: "Krups",
    name: "Evidence ECO EA897A10",
    shortName: "Krups Evidence ECO",
    image: productImage(ESPRESSOMASKIN.slug, "krups-ea897a"),
    tagline: "2,3 liter vatten, lika mycket som maskinen för 14 888 kronor.",
    scores: {
      /* Slangsystem med två mjölkdrycker med ett tryck och eget
         rengöringsprogram. Näst bäst i fältet på antalet mjölkdrycker. */
      mjolksystem: 4,
      /* Åtta drycker i menyn, tre styrkelägen, tre temperaturlägen,
         favoritprogram. Ingen färgskärm. */
      installningar: 3,
      /* Fem malningssteg med stålkvarn, 260 g bönbehållare. */
      kvarn: 2.5,
      /* ⚠️ Enda maskinen i jämförelsen med fast bryggenhet. Den går inte att
         lyfta ur och sköljas, bara rengöras med tabletter via maskinens eget
         program. Det är en egenskap hos varan och inte en lucka i researchen. */
      rengoring: 2,
      /* 4 790 kr med fem malningssteg och fast bryggenhet, mot Philips 3300
         LatteGo på 4 999 med tolv steg och avtagbar bryggenhet. */
      prisvarde: 2.5,
    },
    price: 4790,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/krups-evidence-eco-ea897a10-helautomatisk-kaffemaskin-med-bonor-elfenben/",
    superlative: "Bäst för dig som fyller på sällan",
    pros: [
      "2,3 liter vattentank, lika stor som i maskinen för 14 888 kronor",
      "Två mjölkdrycker med ett tryck, lika många som vinnaren ger",
      "Åtta drycker i menyn och ett eget rengöringsprogram för mjölksystemet",
      "38 centimeter djup, alltså grundare än de flesta här",
      "7,78 kilo, näst lättast i jämförelsen",
    ],
    cons: [
      "Bryggenheten sitter fast och kan bara rengöras med tabletter genom maskinens program",
      "Fem malningssteg, mot tolv hos Philips 3300 LatteGo som kostar 209 kronor mer",
      "Ingen färgskärm, till skillnad från alla andra maskiner över 4 900 kronor här",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "4 790 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "Slang till mjölkpaket", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "2", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "5 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Stål", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Fast, rengörs med tabletter", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "8", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "Ej angiven", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "2,3 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "260 g", highlight: true },
      { label: "Antal bönbehållare", value: "1" },
      { label: "Kaffestyrka, steg", value: "3" },
      { label: "Kaffetemperatur, steg", value: "3" },
      { label: "Rengöringsprogram mjölksystem", value: "Ja" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Svartvit" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Effekt", value: "1 450 W" },
      { label: "Yttermått", value: "24 × 38 × 36,7 cm" },
      { label: "Vikt", value: "7,78 kg" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "3016661172625" },
    ],
    verdict:
      "Krups Evidence ECO kostar 4 790 kronor och har en vattentank på 2,3 liter, alltså exakt lika stor som den i jämförelsens dyraste maskin. Två mjölkdrycker kommer med ett tryck, lika många som vinnaren ger.\n\n**Tanken och mjölken är där den är stark.** 2,3 liter räcker en familj ett par dagar, slangen går ner i mjölkpaketet så det finns ingen kanna att diska, och ett eget program sköljer mjölksystemet. Åtta drycker i menyn är fler än Philips båda LatteGo-maskiner erbjuder, och med 38 centimeters djup och 7,78 kilo är den både grundare och lättare än de flesta.\n\nBryggenheten sitter fast. Det är den enda maskinen i jämförelsen som är byggd så, och det betyder att kaffefettet bara kan angripas med rengöringstabletter genom maskinens eget program. Elva av tolv maskiner här löser det med varmt vatten och en kran. Kvarnen har dessutom fem steg mot tolv hos Philips 3300 LatteGo, som kostar 209 kronor mer.\n\nDen passar dig som fyller på sällan och hellre köper tabletter än plockar isär maskinen. Vill du kunna skölja bryggenheten själv, vilket är det som håller en helautomat vid liv längst, lägger du 209 kronor till och tar Philips 3300 LatteGo.",
  },
  {
    id: "nivona-nicr550",
    brand: "Nivona",
    name: "CafeRomatica NICR 550",
    shortName: "Nivona CafeRomatica 550",
    image: productImage(ESPRESSOMASKIN.slug, "nivona-nicr550"),
    tagline: "2,2 liter vatten och stålkvarn i en maskin som är 34 centimeter hög.",
    scores: {
      /* Automatisk skummare men noll mjölkdrycker med ett tryck. Du får skum
         utan att hålla kannan, men flyttar fortfarande koppen. */
      mjolksystem: 2.5,
      /* Fyra drycker i menyn, noll sparade profiler, tre styrkelägen. */
      installningar: 2.5,
      /* Fyra malningssteg, grövsta upplösningen i hela jämförelsen, med
         stålkvarn och 250 g bönbehållare. */
      kvarn: 2,
      /* Avtagbar bryggenhet och eget rengöringsprogram för mjölksystemet. */
      rengoring: 4,
      /* 6 440 kr för fyra malningssteg och noll mjölkdrycker med ett tryck,
         mot Philips 3300 LatteGo på 4 999 med tolv steg och en. */
      prisvarde: 2,
    },
    price: 6440,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/kaffemaskin-nivona-caferomatica-nicr-550-2/",
    superlative: "Bäst för dig som dricker svart",
    pros: [
      "2,2 liter vattentank, näst störst i jämförelsen",
      "Bryggenheten lyfts ur och sköljs under kranen",
      "Eget rengöringsprogram för mjölksystemet",
      "34 centimeter hög, alltså lika låg som DeLonghi-maskinerna",
      "Färgskärm trots att menyn är kort",
    ],
    cons: [
      "Fyra malningssteg, grövsta upplösningen i hela jämförelsen",
      "Ingen mjölkdryck med ett tryck, trots automatisk skummare",
      "6 440 kronor är 1 441 mer än Philips 3300 LatteGo, som har tolv malningssteg",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "6 440 kr", highlight: true },
      { label: "Mjölksystem", shortLabel: "Mjölk", value: "Automatisk skummare", highlight: true },
      { label: "Mjölkdrycker med ett tryck", shortLabel: "Mjölkdrycker", value: "0", highlight: true },
      { label: "Malningsgrader", shortLabel: "Malning", value: "4 steg", highlight: true },
      { label: "Kvarntyp", shortLabel: "Kvarn", value: "Stål", highlight: true },
      { label: "Bryggenhet", shortLabel: "Bryggenhet", value: "Avtagbar", highlight: true },
      { label: "Kaffedrycker i menyn", shortLabel: "Drycker", value: "4", highlight: true },
      { label: "Sparade profiler", shortLabel: "Profiler", value: "0", highlight: true },
      { label: "Vattentank", shortLabel: "Tank", value: "2,2 l", highlight: true },
      { label: "Bönbehållare", shortLabel: "Bönor", value: "250 g", highlight: true },
      { label: "Antal bönbehållare", value: "1" },
      { label: "Kaffestyrka, steg", value: "3" },
      { label: "Kaffetemperatur, steg", value: "3" },
      { label: "Rengöringsprogram mjölksystem", value: "Ja" },
      { label: "Automatisk sköljning", value: "Ja" },
      { label: "Skärm", value: "Färgskärm" },
      { label: "Pumptryck", value: "15 bar" },
      { label: "Effekt", value: "1 455 W" },
      { label: "Yttermått", value: "24 × 46 × 34 cm" },
      { label: "Vikt", value: "8,2 kg" },
      { label: "GTIN", value: "4260083465509" },
    ],
    verdict:
      "Nivona CafeRomatica NICR 550 kostar 6 440 kronor och har en vattentank på 2,2 liter i ett hus som bara är 34 centimeter högt. Det är ovanligt: nästan alla maskiner som rymmer så mycket vatten är också höga.\n\n**Bryggenheten lyfts ur och sköljs under kranen**, mjölksystemet har ett eget rengöringsprogram, och 24 centimeters bredd gör den till en av de smalare i jämförelsen. Färgskärmen är tydlig och menyn enkel att hitta i.\n\nKvarnen har fyra malningssteg, alltså den grövsta upplösningen bland de tolv, och det är svårt att komma runt vid det här priset. Philips 800 Series kostar 3 740 kronor mindre och ger tolv steg. Skummaren är dessutom automatisk utan att ge en färdig mjölkdryck med ett tryck, så du får skum men flyttar fortfarande koppen mellan pipen och skummaren.\n\nDen här maskinen är rimlig om du dricker mest svart kaffe, vill fylla vatten sällan och har ett lågt överskåp. Ska den göra cappuccino åt dig, eller ska kvarnen kunna följa bönor du byter mellan, får du mer maskin för mindre pengar i Philips 3300 LatteGo.",
  },
];

/**
 * Övervägda och bortvalda.
 *
 * Portafiltermaskinerna är den största gruppen här, och de ligger utanför
 * rankningen på ett användarbeslut och inte på ett omdöme om produkterna.
 * Coffee Friend för 366 av dem mot 170 helautomater, så det är en större
 * kategori än den vi rankar. Den bygger bara en annan sorts kaffe.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "AIVIQ",
    name: "AEM-101S",
    reason:
      "Ljud & Bild har provat exakt den här modellen och skriver att man får \"otroligt många funktioner för pengarna\", men också att menyn \"ser ut som om den gjordes i Windows 95\" och att maskinen är svår att stänga av. Det som avgör att den inte rankas är enklare än så: mjölkkannan ingår inte. AIVIQ säljer den separat för 463 kronor, och en maskin som saknar mjölklösning går inte att jämföra med elva som har en.",
    approxPrice: 9999,
    merchant: "Kaffepro",
    merchantUrl: "https://www.kaffepro.se/products/aiviq-aem-101s",
  },
  {
    brand: "Melitta",
    name: "Barista TS Smart F85/0-101",
    reason:
      "Storasyster till vinnaren, med samma två bönkammare och samma mjölklösning plus varmvattenpip och fler recept. 1 000 kronor mer för tillägg som inte ändrar hur kaffet bryggs, så Barista T Smart är den bättre affären av de två.",
    approxPrice: 9550,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/kahvikone-melitta-f85-0-101-barista-ts-smart/",
  },
  {
    brand: "Philips",
    name: "2200 Series EP2224/10",
    reason:
      "Samma keramiska tolvstegskvarn och samma manuella ångstav som Philips 800 Series, för 590 kronor mer. Den billigare modellen gör samma kaffe.",
    approxPrice: 3290,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/p/kaffemaskin-philips-ep2224-10/",
  },
  {
    brand: "Sage",
    name: "the Barista Express SES875",
    reason:
      "Portafiltermaskin med inbyggd kvarn, alltså den klass där du doserar, packar och skummar själv. Det ger mer kontroll över extraktionen och tar ungefär fyra minuter per kopp i stället för fyrtio sekunder. En annan produkt för en annan morgon.",
    approxPrice: 6999,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/c/kaffemaskiner/espressomaskiner/lsage-espressomaskiner/",
  },
  {
    brand: "De'Longhi",
    name: "Dedica Style EC 685",
    reason:
      "Billigaste vägen till espresso med portafilter, 1 405 kronor, men utan kvarn. Räkna in en kvarn för minst 1 500 kronor till, annars mal du kaffet i butiken och tappar det som gör färska bönor bättre.",
    approxPrice: 1405,
    merchant: "Coffee Friend",
    merchantUrl: "https://www.coffeefriend.se/c/kaffemaskiner/espressomaskiner/",
  },
  {
    brand: "Siemens",
    name: "EQ700 TP715R07 Classic",
    reason:
      "Ligger mellan EQ.6 plus s100 och EQ900, som båda är med i jämförelsen, och delar mjölksystem och sexstegskvarn med dem. 10 999 kronor köper i praktiken en större vattentank än s100 har.",
    approxPrice: 10999,
    merchant: "Coffee Friend",
    merchantUrl:
      "https://www.coffeefriend.se/p/siemens-eq-700-tp715r07-helautomatisk-kaffemaskin/",
  },
];

/**
 * Frågorna är hämtade ur det köparen faktiskt står och undrar över vid hyllan,
 * och svaren håller sig till vad maskinerna gör. Talen kommer från Råd & Röns
 * provning av 57 helautomater och från tillverkarnas egna uppgifter.
 */
const FAQ = [
  {
    question: "Vad är skillnaden mellan en helautomat och en espressomaskin med portafilter?",
    answer:
      "En helautomat mal bönan, doserar, packar och brygger när du trycker på en knapp, och lämnar sumpen i en låda du tömmer ett par gånger i veckan. Koppen tar under en minut. En portafiltermaskin lämnar dosering, packning och mjölkskumning till dig, vilket ger mer kontroll över hur espresson smakar och tar ungefär fyra minuter från böna till kopp. Maskinerna på den här sidan är helautomater.",
  },
  {
    question: "Hur ofta måste jag rengöra en espressomaskin?",
    answer:
      "Sumplådan och droppbrickan töms ett par gånger i veckan, och mjölksystemet ska sköljas samma dag det använts. Bryggenheten sköljs under kranen ungefär en gång i månaden på de maskiner där den går att lyfta ur, och avkalkning behövs var tredje till sjätte månad beroende på hur hårt vattnet är. Råd & Rön lät fyra tillverkares maskiner brygga 2 500 koppar var, varav hälften bara fick sumplådan tömd, och kaffet ur de ovårdade smakade lika bra. Skötseln handlar alltså om maskinens livslängd snarare än om koppen.",
  },
  {
    question: "Hur varmt ska kaffet vara ur en espressomaskin?",
    answer:
      "Den temperatur som brukar anges som ideal för espresso är 67 grader i koppen. Råd & Rön mätte kaffet ur 57 helautomater till mellan 53 och 71 grader, alltså en spridning på 18 grader, och kom samtidigt fram till att det inte gick att se något samband mellan låg temperatur och sämre kaffe. Tycker du att kaffet är för svalt hjälper det mer att skölja koppen i varmt vatten först än att byta maskin.",
  },
  {
    question: "Hur många malningssteg behöver jag?",
    answer:
      "Fyra till sex steg räcker om du köper samma sorts böna år efter år. Byter du mellan mörkrostat och ljusrostat vill du ha tio eller fler, eftersom en ljusare böna behöver finare malning för att inte ge sur och tunn espresso. Spannet bland maskinerna här går från fyra steg till tretton, och det följer inte priset: den maskin som har flest steg kostar 3 159 kronor och den som har näst minst kostar 14 888.",
  },
  {
    question: "Kan jag använda malet kaffe i en helautomat?",
    answer:
      "Ja, samtliga maskiner här har ett extra fack där du häller i en dos malet kaffe i stället för att låta kvarnen gå. Det är främst till för koffeinfritt när du inte vill tömma bönbehållaren. Undantaget är Melitta Barista T Smart, som har två bönkammare och därför låter dig växla mellan två sorters hela bönor med en spak.",
  },
  {
    question: "Vad kostar en kopp kaffe ur en helautomat?",
    answer:
      "En espresso drar ungefär 7 till 9 gram bönor. Med kaffe för 150 kronor kilot landar det på drygt en krona per kopp, och med specialrostat för 400 kronor kilot på ungefär tre kronor. Två koppar om dagen betyder samtidigt att en bönbehållare på 125 gram töms på en vecka medan en på 375 gram räcker i tre.",
  },
  {
    question: "Behöver jag en maskin som skummar mjölken automatiskt?",
    answer:
      "Bara om du dricker mjölkdrycker ofta. En manuell ångstav gör lika bra skum, men kräver att du står med kannan i handen ungefär en minut per kopp och lär dig när ljudet ändras. Skillnaden i pris är påtaglig: den billigaste maskinen med ångstav kostar 2 700 kronor och den billigaste som gör cappuccino med ett tryck kostar 4 999. Ingen av maskinerna kyler mjölken, så den ska ur kylen när du ska ha den oavsett vilken lösning du väljer.",
  },
  {
    question: "Är en dyr espressomaskin bättre på kaffe än en billig?",
    answer:
      "Det som säkert växer med priset är mjölkautomatiken, antalet drycker i menyn och storleken på vatten- och bönbehållarna. Om kaffet blir godare är mer osäkert. Ljud & Bild provade de fyra dyraste maskinerna på marknaden och skrev om den dyraste att den slår konkurrenterna på utrustning men förlorar på smaken, och Råd & Rön gav utmärkelsen Bra köp till maskiner under 4 000 kronor i samma test där de dyraste kostade över 20 000.",
  },
];

export const ESPRESSOMASKIN_PRODUCTS = resolveProducts(ESPRESSOMASKIN, SEEDS);
export const ESPRESSOMASKIN_CONSIDERED = CONSIDERED;
export const ESPRESSOMASKIN_FAQ = FAQ;
