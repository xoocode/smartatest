import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { ELTANDBORSTE } from "@/lib/test-pages";

/**
 * Eltandborste. Underlag i .agent/research/eltandborste.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, GTIN, lagerstatus, laddtider, angivna
 * drifttider, borstlägen, intensitetsnivåer, trycksensorernas beteende och
 * borsthuvudspriser. Priser och GTIN lästa 2026-08-06 i butikernas egen
 * JSON-LD. Laddtiderna kommer ur P&G:s egen kunskapsbas och Philips egen
 * bruksanvisning, drifttiderna ur tillverkarnas egna produktsidor.
 *
 * **Redaktionell bedömning:** kriteriepoängen. De är vår sammanvägning av
 * uppgifterna ovan mot viktningen i lib/test-pages.ts, inte mätvärden. Vi har
 * inte haft en enda av borstarna i handen och skriver det rakt ut.
 *
 * **Bilder:** butikernas egna packshots, tio av tio, körda genom `pnpm images`.
 * Nio från Proshop i 915×900, en från Teknikdelar i 1024×1024.
 *
 * ## Butikerna, och varför det bara är två
 *
 * Sidan länkar Proshop och Teknikdelar, och det är hela urvalet av butiker vi
 * kan använda. Elgiganten, Power, NetOnNet, Clas Ohlson och MediaMarkt äger
 * kategorin i svensk handel och har inget affiliateprogram alls. Apotek och
 * hälsokostbolag är avförda som länkmål efter användarbeslut 2026-08-06, vilket
 * stryker Apotea, Apoteket, Apohem och MEDS. Kjell, Elon, Komplett, Webhallen,
 * CS Megastore, Estore och Prylstaden för inte kategorin, kontrollerat samma
 * dag. Lyko för den men hade sex av nio kontrollerade artiklar slut och priser
 * 30 till 40 procent över Proshop.
 *
 * ⚠️ Dentaworks ligger på 25 procent, sajtens högsta provision någonsin, och
 * säljer noll tandborstar. Deras egen sökfunktion svarar att inga produkter
 * matchar `tandborste`. Sortimentet är tandblekning. Samma fälla som AIVIQ och
 * Kaffepro på /mjolkskummare.
 *
 * ⚠️ Varken Proshop eller Teknikdelar tillåter PPC. Sidan går inte att
 * annonsera, samma läge som resten av gruppen Elektronik.
 *
 * ## Priset per borsthuvud, och var det kommer ifrån
 *
 * `Pris per borsthuvud` är det lägsta pris per styck vi kunnat belägga i svensk
 * handel för ett flerpack av tillverkarens eget kompatibla huvud, läst
 * PRICE_CHECKED. Det är alltså köparens verkliga kostnad och inte nödvändigtvis
 * priset i den butik vi länkar handtaget till: Proshop för till exempel inga
 * Oral-B CrossAction-huvuden alls, medan de kostar 439 kronor för tio i svensk
 * handel. Beloppet ligger i tabellen med datum, och köpguiden säger var man
 * hittar dem.
 *
 * ## Två uppgifter som avsiktligt saknas
 *
 * **Oral-B publicerar ingen drifttid i dagar för iO-handtagen.** Sökt på
 * oralb.se, oralb.com, oralb.co.uk, oralb.de, P&G:s två kunskapsbasartiklar,
 * den officiella iO-bruksanvisningen som PDF, butikernas P&G-matade
 * produkttexter och Icecat, som svarar `You are not allowed to have Full Icecat
 * access` på samtliga Oral-B-GTIN. Cellerna står tomma, sänker inget betyg och
 * nämns aldrig i läsartexten.
 *
 * **Be Lucent anger ingen laddtid.** Tillverkarens egen produkttext anger
 * 60 dagars laddning och trådlös laddning, men inte hur lång tid en laddning
 * tar. Samma behandling.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-06";

/* Fyra borsthuvuden om året är tillverkarens eget intervall: Oral-B skriver
   "var 3:e månad" på sin svenska sajt och Be Lucent "at least every three
   months" i sin egen produkttext. Femårskostnaden nedan är handtaget plus
   tjugo huvuden till priset i `Pris per borsthuvud`. */
const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "oral-b-pro-3-3000",
    name: "Pro 3 3000 CrossAction",
    shortName: "Oral-B Pro 3 3000",
    brand: "Oral-B",
    image: productImage(ELTANDBORSTE.slug, "oral-b-pro-3-3000"),
    tagline:
      "44 kronor per borsthuvud och laddad på 12 timmar, för 494 kronor.",
    scores: {
      batteri: 4.5,
      borsthuvud: 5,
      kontroll: 3.5,
      prisvarde: 5,
    },
    price: 494,
    oldPrice: 549,
    merchant: "Teknikdelar",
    merchantUrl:
      "https://www.teknikdelar.se/produkt/oral-b-elektrisk-tandborste-pro-3-3000-cross-action-svart",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst skydd per krona",
    pros: [
      "Borsthuvudena kostar 44 kronor styck i tiopack, och den runda fattningen passar även andras huvuden från 20 kronor",
      "Litiumjonbatteri som enligt tillverkaren räcker mer än två veckor, mot fem till sju dagar för nickelmodellerna bredvid på hyllan",
      "Laddad på 12 timmar, alltså över natten och inte över ett helt dygn",
      "Trycksensor och tre borstlägen, vilket är samma skydd för tandköttet som borstar för fyra gånger priset ger",
      "Borsthuvudets blå fält bleknar till gult när det är dags att byta, så du slipper hålla räkningen",
    ],
    cons: [
      "Ingen display och ingen app, så du får ingen återkoppling efter borstningen",
      "Trycksensorn varnar men griper inte in i borstningen, vilket iO-modellerna gör",
    ],
    specs: [
      {
        label: "Borsthuvudssystem",
        shortLabel: "Huvudsystem",
        value: "Oral-B rund fattning",
        highlight: true,
      },
      {
        label: "Pris per borsthuvud",
        shortLabel: "Kr/huvud",
        value: "44 kr",
        highlight: true,
      },
      { label: "Borsthuvuden per år", value: "176 kr" },
      { label: "Angiven drifttid", value: "Mer än 2 veckor", highlight: true },
      { label: "Laddtid", value: "12 h", highlight: true },
      { label: "Laddare", value: "Laddställ" },
      {
        label: "Trycksensor",
        value: "Ja, varnar",
        highlight: true,
      },
      { label: "Borstlägen", value: "3", highlight: true },
      { label: "Intensitetsnivåer", value: "–" },
      {
        label: "Rörelsetyp",
        value: "Oscillerande, roterande och pulserande",
        highlight: true,
      },
      { label: "Timer", value: "2 min med kvadrantindikering" },
      { label: "Display", value: "Nej, batterinivåindikator" },
      { label: "App", value: "Nej" },
      { label: "Resefodral", value: "Nej" },
      { label: "Batterityp", value: "Litiumjon" },
      { label: "Garanti", value: "2 år, 3 år vid registrering" },
      { label: "GTIN", value: "8006540759790" },
    ],
    verdict:
      "Oral-B Pro 3 3000 är borsten för den som räknar på vad tandborsten kostar och inte bara vad den kostar i kassan. 494 kronor hos Teknikdelar, nedsatt från 549.\n\n**Borsthuvudet är det som avgör, och den här tar det billigaste som finns.** Oral-B:s runda fattning kostar 44 kronor per huvud i tiopack, och eftersom fattningen är gammal och spridd finns det dessutom huvuden från andra tillverkare ner till 20 kronor styck. Fyra huvuden om året i fem år blir 880 kronor, mot 1 740 för ett iO-handtag som bara tar Oral-B:s egna. Batteriet är litiumjon, som tillverkaren anger till mer än två veckor mellan laddningarna, och laddningen tar 12 timmar, alltså en natt, inte ett dygn som iO 2 kräver. Trycksensorn varnar när du trycker för hårt, och tre borstlägen räcker för det de flesta använder en eltandborste till. Borsthuvudets blå fält bleknar till gult när det är utnött.\n\nDen har ingen display och ingen app. Vill du se hur länge du borstat varje kvadrant efteråt får du gå upp till iO-serien, och då byter du samtidigt till dubbelt så dyra borsthuvuden.\n\nKöp den. På fem år kostar den 1 374 kronor med huvuden inräknade, mot 4 929 för den dyraste i jämförelsen, och skillnaden i vad du får för pengarna är mindre än prislappen antyder.",
  },
  {
    id: "be-lucent-prism",
    name: "Prism Sonic",
    shortName: "Be Lucent Prism",
    brand: "Be Lucent",
    image: productImage(ELTANDBORSTE.slug, "be-lucent-prism"),
    tagline: "60 dagar på en laddning, alltså två laddningar om året.",
    scores: {
      batteri: 5,
      borsthuvud: 3.5,
      kontroll: 3.5,
      prisvarde: 4,
    },
    price: 736,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Be-Lucent-eltandborste-Prism-Mint-green/3343507",
    priceCheckedAt: PRICE_CHECKED,
    award: "editor",
    superlative: "Bäst för den som reser utan laddare",
    pros: [
      "60 dagar på en laddning enligt tillverkaren, alltså tre gånger så länge som den bästa Philips i jämförelsen",
      "Laddas trådlöst i ett ställ som följer med, så du slipper leta rätt kontakt på hotellet",
      "Trycksensor och automatisk start när borsten möter tanden",
      "Ett extra borsthuvud ingår, vilket ingen annan under tusen kronor i jämförelsen ger",
      "62 kronor per borsthuvud i fyrpack, alltså billigare än både Philips och Oral-B iO",
    ],
    cons: [
      "Egen fattning, så du kan inte byta till ett billigare huvud från någon annan tillverkare",
      "Tre borstlägen och ingen display, för samma pengar som Philips 5300 kostar",
      "Tillverkaren anger ingen laddtid, så du vet inte hur länge den står stilla de två gånger om året du laddar den",
    ],
    specs: [
      {
        label: "Borsthuvudssystem",
        shortLabel: "Huvudsystem",
        value: "Be Lucent Prism",
        highlight: true,
      },
      {
        label: "Pris per borsthuvud",
        shortLabel: "Kr/huvud",
        value: "62 kr",
        highlight: true,
      },
      { label: "Borsthuvuden per år", value: "248 kr" },
      { label: "Angiven drifttid", value: "60 dagar", highlight: true },
      { label: "Laddtid", value: "–", highlight: true },
      { label: "Laddare", value: "Trådlöst laddställ" },
      { label: "Trycksensor", value: "Ja, varnar", highlight: true },
      { label: "Borstlägen", value: "3", highlight: true },
      { label: "Intensitetsnivåer", value: "–" },
      { label: "Rörelsetyp", value: "Sonisk", highlight: true },
      { label: "Timer", value: "2 min med indikering var 30:e sekund" },
      { label: "Display", value: "Nej" },
      { label: "App", value: "Nej" },
      { label: "Resefodral", value: "Nej" },
      { label: "Borststrån", value: "Dupont, mjuka" },
      { label: "Ingår", value: "Extra borsthuvud och laddställ" },
      { label: "GTIN", value: "7350147430004" },
    ],
    verdict:
      "Be Lucent Prism är borsten för den som är trött på att packa en laddare. 736 kronor hos Proshop, och den enda här som anger 60 dagar på en laddning.\n\n**Två månader betyder att du laddar den två gånger om året.** Det är tre gånger så länge som de 21 dagar Philips anger för sina soniska borstar och fyra gånger DiamondClean 9000. En treveckorsresa går alltså att göra utan att ta med något annat än borsten. Laddstället är trådlöst och följer med, så du behöver ingen särskild kontakt när du väl laddar. Borsten startar av sig själv när den möter tanden och har en trycksensor som säger till när du trycker för hårt. Ett extra borsthuvud ligger i kartongen, och fyrpacket kostar 249 kronor, alltså 62 per huvud, vilket är under både Philips 81 och Oral-B iO:s 87.\n\nFattningen är Be Lucents egen. Det betyder att du är bunden till deras huvuden så länge du äger borsten, och att en billigare tredjepart aldrig blir ett alternativ som den är för Oral-B:s runda fattning.\n\nKöp den om du reser ofta eller om laddsladden i badrummet stör dig. Borstar du hemma varje dag gör Oral-B Pro 3 3000 samma jobb för 242 kronor mindre och med billigare huvuden.",
  },
  {
    id: "philips-sonicare-7100",
    name: "Sonicare 7100 Series HX7421/01",
    shortName: "Sonicare 7100",
    brand: "Philips",
    image: productImage(ELTANDBORSTE.slug, "philips-sonicare-7100"),
    tagline: "Fyra lägen och tre styrkor, och ett resefodral som laddar.",
    scores: {
      batteri: 4.5,
      borsthuvud: 3,
      kontroll: 4.5,
      prisvarde: 3,
    },
    price: 1413,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Philips-eltandborste-Sonicare-7100-series-HX742101-black/3318639",
    priceCheckedAt: PRICE_CHECKED,
    award: "premium",
    superlative: "Bäst för känsligt tandkött",
    pros: [
      "Fyra borstlägen och tre intensitetsnivåer, alltså tolv kombinationer att hitta rätt i om tandköttet är ömt",
      "Resefodralet har laddport, så borsten laddas i väskan i stället för att ligga och vänta",
      "21 dagar på en laddning enligt tillverkaren, sju dagar mer än Philips eget flaggskepp",
      "Synlig tryckvarning, inte bara en vibration du kan missa",
      "Alla Sonicare-huvuden passar, så du kan gå från 175 kronor per huvud ner till 81 utan att byta borste",
    ],
    cons: [
      "Laddar upp till 24 timmar, vilket gäller varje Sonicare oavsett pris",
      "1 413 kronor för en borste vars borsthuvuden kostar nästan dubbelt så mycket som Oral-B:s runda",
    ],
    specs: [
      {
        label: "Borsthuvudssystem",
        shortLabel: "Huvudsystem",
        value: "Philips Sonicare",
        highlight: true,
      },
      {
        label: "Pris per borsthuvud",
        shortLabel: "Kr/huvud",
        value: "81 kr",
        highlight: true,
      },
      { label: "Borsthuvuden per år", value: "324 kr" },
      { label: "Angiven drifttid", value: "21 dagar", highlight: true },
      { label: "Laddtid", value: "Upp till 24 h", highlight: true },
      { label: "Laddare", value: "Laddställ och laddande resefodral" },
      { label: "Trycksensor", value: "Ja, synlig varning", highlight: true },
      { label: "Borstlägen", value: "4", highlight: true },
      { label: "Intensitetsnivåer", value: "3" },
      { label: "Rörelsetyp", value: "Sonisk, 62 000 rörelser per minut", highlight: true },
      { label: "Timer", value: "2 min, zonbyte var 20:e sekund" },
      { label: "Display", value: "Nej" },
      { label: "App", value: "Ja, Bluetooth" },
      { label: "Resefodral", value: "Ja, med laddport" },
      { label: "Borsthuvud som ingår", value: "G3 Premium Gum Care" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8720689021388" },
    ],
    verdict:
      "Philips Sonicare 7100 är borsten för den som har ömt tandkött och behöver kunna dosera. 1 413 kronor hos Proshop.\n\n**Fyra borstlägen gånger tre intensitetsnivåer ger tolv inställningar**, och det är där den skiljer sig från de billigare Philips-modellerna, som har ett eller tre lägen. Har tandläkaren sagt åt dig att gå försiktigt fram i en viss del av munnen är det den här som låter dig göra det utan att ge upp rengöringen någon annanstans. Tryckvarningen är synlig och inte bara en vibration i handtaget. Resefodralet har en laddport i sig, så borsten laddar medan den ligger i väskan, vilket är värt något när en full laddning tar upp till ett dygn. Tillverkaren anger 21 dagar mellan laddningarna.\n\nBorsthuvudena kostar 81 kronor styck i det billigaste flerpacket, alltså 324 kronor om året. Det är nästan dubbelt mot Oral-B:s runda fattning, och det gäller så länge du äger borsten.\n\nKöp den om tandköttet gör ont och du behöver kunna växla mellan skonsamt och grundligt. Vill du bara ha en Philips som gör jobbet är 5300 samma sonisk teknik och samma 21 dagar för 668 kronor mindre.",
  },
  {
    id: "philips-sonicare-5300",
    name: "Sonicare 5300 Series HX7101/02",
    shortName: "Sonicare 5300",
    brand: "Philips",
    image: productImage(ELTANDBORSTE.slug, "philips-sonicare-5300"),
    tagline: "21 dagar på en laddning, sju fler än Philips dyraste.",
    scores: {
      batteri: 4.5,
      borsthuvud: 3,
      kontroll: 3,
      prisvarde: 4,
    },
    price: 745,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Philips-eltandborste-HX710102/3320715",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Bäst första soniska borste",
    pros: [
      "21 dagar på en laddning enligt Philips, alltså längre än deras egen DiamondClean 9000 för tre gånger priset",
      "Optisk trycksensor som varnar med vibration i handtaget",
      "Resefodral och USB-laddställ ingår",
      "Alla Sonicare-huvuden passar, så du väljer mellan 81 och 225 kronor per huvud utan att byta borste",
      "62 000 borströrelser i minuten, samma motor som i Philips dyra modeller",
    ],
    cons: [
      "Ett enda borstläge, så vill du växla mellan skonsamt och grundligt får du gå till 6500 eller 7100",
      "Laddar upp till 24 timmar, vilket är hela dygnet efter att den tagit slut",
    ],
    specs: [
      {
        label: "Borsthuvudssystem",
        shortLabel: "Huvudsystem",
        value: "Philips Sonicare",
        highlight: true,
      },
      {
        label: "Pris per borsthuvud",
        shortLabel: "Kr/huvud",
        value: "81 kr",
        highlight: true,
      },
      { label: "Borsthuvuden per år", value: "324 kr" },
      { label: "Angiven drifttid", value: "21 dagar", highlight: true },
      { label: "Laddtid", value: "Upp till 24 h", highlight: true },
      { label: "Laddare", value: "USB-laddställ" },
      { label: "Trycksensor", value: "Ja, vibrerar", highlight: true },
      { label: "Borstlägen", value: "1", highlight: true },
      { label: "Intensitetsnivåer", value: "2" },
      { label: "Rörelsetyp", value: "Sonisk, 62 000 rörelser per minut", highlight: true },
      { label: "Timer", value: "2 min, zonbyte var 20:e sekund" },
      { label: "Display", value: "Nej" },
      { label: "App", value: "Nej" },
      { label: "Resefodral", value: "Ja" },
      { label: "Borsthuvud som ingår", value: "W2 Optimal White" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8720689025201" },
    ],
    userRating: {
      value: 4.6,
      count: 273,
      scale: 5,
      checkedAt: PRICE_CHECKED,
    },
    verdict:
      "Philips Sonicare 5300 är den soniska borsten att börja med. 745 kronor hos Proshop, och tillverkarens eget listpris är 1 199.\n\n**Philips anger 21 dagar mellan laddningarna för den här, och 14 för sin DiamondClean 9000 som kostar tre gånger så mycket.** Motorn är densamma i båda, 62 000 borströrelser i minuten, och det är den som gör jobbet. Trycksensorn är optisk och varnar genom att handtaget vibrerar annorlunda, vilket räcker för att lära om ett för hårt grepp. Resefodral och ett USB-laddställ ligger i kartongen. Och eftersom varje Sonicare-huvud passar varje Sonicare-handtag utom Philips One och Kids kan du välja huvud efter pris i stället för efter modell: från 81 kronor styck upp till 225.\n\nDen har ett borstläge och två styrkor. Behöver du ett särskilt skonsamt läge för en del av munnen ska du inte köpa den här.\n\nÄr det din första eltandborste och du vill ha den soniska känslan är det här köpet. Vill du hellre ha den roterande borsten med den runda huvudet gör Oral-B Pro 3 3000 det för 251 kronor mindre, med borsthuvuden som kostar hälften.",
  },
  {
    id: "philips-sonicare-6500",
    name: "Sonicare 6500 Series HX7419/01",
    shortName: "Sonicare 6500",
    brand: "Philips",
    image: productImage(ELTANDBORSTE.slug, "philips-sonicare-6500"),
    tagline: "Tre lägen och tre styrkor med borsthuvud för ömt tandkött.",
    scores: {
      batteri: 4.5,
      borsthuvud: 3,
      kontroll: 4,
      prisvarde: 2.5,
    },
    price: 1979,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Philips-eltandborste-Sonicare-6500-HX741901/3309196",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst med mjukaste borsthuvudet",
    pros: [
      "Tre borstlägen och tre intensitetsnivåer, alltså nio kombinationer",
      "S2 Sensitive-huvud i kartongen, det mjukaste Philips gör",
      "21 dagar på en laddning enligt tillverkaren",
      "Appen visar var du borstat, och den fungerar med alla Sonicare-handtag med Bluetooth",
    ],
    cons: [
      "1 979 kronor, alltså 566 mer än 7100 som har ett borstläge till och ett laddande resefodral",
      "Laddar upp till 24 timmar, som varje Sonicare",
    ],
    specs: [
      {
        label: "Borsthuvudssystem",
        shortLabel: "Huvudsystem",
        value: "Philips Sonicare",
        highlight: true,
      },
      {
        label: "Pris per borsthuvud",
        shortLabel: "Kr/huvud",
        value: "81 kr",
        highlight: true,
      },
      { label: "Borsthuvuden per år", value: "324 kr" },
      { label: "Angiven drifttid", value: "21 dagar", highlight: true },
      { label: "Laddtid", value: "Upp till 24 h", highlight: true },
      { label: "Laddare", value: "Laddställ" },
      { label: "Trycksensor", value: "Ja, varnar", highlight: true },
      { label: "Borstlägen", value: "3", highlight: true },
      { label: "Intensitetsnivåer", value: "3" },
      { label: "Rörelsetyp", value: "Sonisk, 62 000 rörelser per minut", highlight: true },
      { label: "Timer", value: "2 min, zonbyte var 20:e sekund" },
      { label: "Display", value: "Nej" },
      { label: "App", value: "Ja, Bluetooth" },
      { label: "Resefodral", value: "Ja" },
      { label: "Borsthuvud som ingår", value: "S2 Sensitive" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8720689021609" },
    ],
    verdict:
      "Philips Sonicare 6500 är mellanmodellen i den soniska serien, och den kommer med det mjukaste borsthuvudet Philips gör. 1 979 kronor hos Proshop.\n\nTre borstlägen och tre intensitetsnivåer ger nio inställningar, vilket räcker för att lägga en mjuk rutin på morgonen och en grundligare på kvällen. S2 Sensitive-huvudet i kartongen är det som tandläkaren brukar rekommendera efter en tandköttsbehandling, och det ingår i stället för att kosta 298 kronor extra. Batteriet anges till 21 dagar, samma som resten av den soniska serien.\n\n**Priset är svårt att försvara mot systermodellen.** Sonicare 7100 kostar 566 kronor mindre, har ett borstläge till och ett resefodral som laddar borsten medan den ligger i väskan.\n\nHittar du den till rea under tusenlappen är det ett bra köp. Till listpriset ska du ta 7100 i stället, eller 5300 om du klarar dig med ett läge.",
  },
  {
    id: "oral-b-io10",
    name: "iO 10 Cosmic Black",
    shortName: "Oral-B iO 10",
    brand: "Oral-B",
    image: productImage(ELTANDBORSTE.slug, "oral-b-io10"),
    tagline: "Full laddning på 3 timmar, åtta gånger snabbare än de billiga.",
    scores: {
      batteri: 5,
      borsthuvud: 2,
      kontroll: 5,
      prisvarde: 1.5,
    },
    price: 3189,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Oral-B-eltandborste-iO10-Cosmic-Black/3448763",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för den som glömmer ladda",
    pros: [
      "Laddar fullt på 3 timmar, alltså medan du är på jobbet och inte över natten",
      "Sju borstlägen, fler än någon annan här, med tungrengöring som eget läge",
      "Trycksensorn lyser rött för hårt, grönt för lagom och vitt för för löst, alltså tre lägen och inte två",
      "Färgskärm på handtaget som visar läge, tid och laddning utan att du behöver telefonen",
      "Resefodral med laddning och ett eget etui för borsthuvuden ingår",
    ],
    cons: [
      "87 kronor per borsthuvud, och iO-huvudena passar inga andra Oral-B-handtag",
      "3 189 kronor, alltså 4 929 på fem år med huvuden inräknade, mot 1 374 för Pro 3 3000",
      "iO Sense-laddaren drar 1,2 watt dygnet runt med wifi påslaget, alltså 10,5 kilowattimmar om året",
    ],
    specs: [
      {
        label: "Borsthuvudssystem",
        shortLabel: "Huvudsystem",
        value: "Oral-B iO",
        highlight: true,
      },
      {
        label: "Pris per borsthuvud",
        shortLabel: "Kr/huvud",
        value: "87 kr",
        highlight: true,
      },
      { label: "Borsthuvuden per år", value: "348 kr" },
      { label: "Angiven drifttid", value: "–", highlight: true },
      { label: "Laddtid", value: "3 h", highlight: true },
      { label: "Laddare", value: "iO Sense magnetisk snabbladdare" },
      {
        label: "Trycksensor",
        value: "Ja, rött, grönt och vitt",
        highlight: true,
      },
      { label: "Borstlägen", value: "7", highlight: true },
      { label: "Intensitetsnivåer", value: "–" },
      { label: "Rörelsetyp", value: "Magnetisk mikrovibration", highlight: true },
      { label: "Timer", value: "2 min, zonbyte var 30:e sekund" },
      { label: "Display", value: "Interaktiv färgskärm" },
      { label: "App", value: "Ja, med 3D-tandspårning" },
      { label: "Resefodral", value: "Ja, laddande, plus etui för borsthuvuden" },
      { label: "Standbyeffekt", value: "1,2 W med wifi på, 0,1 W utan" },
      { label: "Garanti", value: "2 år, 3 år vid registrering" },
      { label: "GTIN", value: "8006530067690" },
    ],
    verdict:
      "Oral-B iO 10 är den dyraste borsten i jämförelsen och den enda som laddar på en förmiddag. 3 189 kronor hos Proshop.\n\n**Tre timmar till full laddning är åtta gånger snabbare än de 24 timmar iO 2 och varje Philips Sonicare behöver.** Det låter som en detalj tills borsten dör en morgon och du inser att alternativet är att borsta manuellt i ett dygn. Trycksensorn har tre lägen i stället för två: rött när du trycker för hårt, grönt när det är lagom och vitt när du trycker för löst, vilket är den enda av borstarna här som säger till åt båda hållen. Sju borstlägen inkluderar ett för tungan. Färgskärmen på handtaget gör att du ser läge och batterinivå utan att öppna telefonen.\n\n**Borsthuvudena kostar 87 kronor styck och passar bara iO-handtag.** Fem år med den här borsten kostar 4 929 kronor med huvuden inräknade. Samma fem år med Oral-B:s egen Pro 3 3000 kostar 1 374, och det är samma tillverkare och samma runda borstteknik.\n\nKöp den bara om laddtiden och färgskärmen är värda 3 555 kronor för dig. De flesta får mer för pengarna genom att ta Pro 3 3000 och lägga mellanskillnaden på tandläkarbesöken.",
  },
  {
    id: "philips-diamondclean-9000",
    name: "Sonicare DiamondClean 9000 HX9911/09",
    shortName: "DiamondClean 9000",
    brand: "Philips",
    image: productImage(ELTANDBORSTE.slug, "philips-diamondclean-9000"),
    tagline: "Laddglas på badrumshyllan och fyra lägen i handtaget.",
    scores: {
      batteri: 4,
      borsthuvud: 3,
      kontroll: 4.5,
      prisvarde: 2,
    },
    price: 2301,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Philips-eltandborste-Sonicare-DiamondClean-9000-HX991109-Black/3102452",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Snyggast på badrumshyllan",
    pros: [
      "Laddglaset står framme som ett dricksglas i stället för som en laddare",
      "Fyra borstlägen och tre intensitetsnivåer",
      "Kompakt resefodral utöver laddglaset",
      "C3-huvudet som ingår är Philips hårdaste, alltså det som tar mest missfärgning",
    ],
    cons: [
      "14 dagar på en laddning, sju färre än Philips egna 5300, 6500 och 7100 som alla kostar mindre",
      "2 301 kronor, alltså 3 921 på fem år med borsthuvuden inräknade",
    ],
    specs: [
      {
        label: "Borsthuvudssystem",
        shortLabel: "Huvudsystem",
        value: "Philips Sonicare",
        highlight: true,
      },
      {
        label: "Pris per borsthuvud",
        shortLabel: "Kr/huvud",
        value: "81 kr",
        highlight: true,
      },
      { label: "Borsthuvuden per år", value: "324 kr" },
      { label: "Angiven drifttid", value: "14 dagar", highlight: true },
      { label: "Laddtid", value: "Upp till 24 h", highlight: true },
      { label: "Laddare", value: "Laddglas och kompakt resefodral" },
      { label: "Trycksensor", value: "Ja, varnar", highlight: true },
      { label: "Borstlägen", value: "4", highlight: true },
      { label: "Intensitetsnivåer", value: "3" },
      { label: "Rörelsetyp", value: "Sonisk, 62 000 rörelser per minut", highlight: true },
      { label: "Timer", value: "2 min, zonbyte var 20:e sekund" },
      { label: "Display", value: "Nej" },
      { label: "App", value: "Ja, Bluetooth" },
      { label: "Resefodral", value: "Ja" },
      { label: "Borsthuvud som ingår", value: "C3 Premium Plaque Control" },
      { label: "Batterityp", value: "Litiumjon" },
      { label: "Garanti", value: "2 år" },
      { label: "GTIN", value: "8710103935957" },
    ],
    userRating: {
      value: 4.2,
      count: 1558,
      scale: 5,
      checkedAt: PRICE_CHECKED,
    },
    verdict:
      "Philips DiamondClean 9000 är Sonicare-serien i sin dyraste form, och den ser ut därefter. 2 301 kronor hos Proshop.\n\nLaddglaset är hela poängen med designen: borsten står i ett glas på hyllan i stället för i en plastdocka, och glaset laddar. Fyra borstlägen och tre intensitetsnivåer ger tolv inställningar, och C3-huvudet som ingår är det hårdaste Philips gör, alltså det som tar mest kaffemissfärgning. Ett kompakt resefodral ligger också i kartongen.\n\n**Batteriet är det sämsta i Philips egen serie.** Tillverkaren anger 14 dagar för den här och 21 för 5300, 6500 och 7100, som alla kostar mindre. Du laddar alltså flaggskeppet oftare än instegsmodellen, och en laddning tar upp till ett dygn.\n\nKöp den för hur den ser ut i badrummet, för det är det den ger som de andra inte gör. Är det tandborstningen du bryr dig om ger Sonicare 7100 fler lägen, en vecka längre mellan laddningarna och 888 kronor tillbaka.",
  },
  {
    id: "oral-b-vitality-pro",
    name: "Vitality Pro",
    shortName: "Oral-B Vitality Pro",
    brand: "Oral-B",
    image: productImage(ELTANDBORSTE.slug, "oral-b-vitality-pro"),
    tagline: "285 kronor, och de billigaste borsthuvudena som finns.",
    scores: {
      batteri: 2,
      borsthuvud: 5,
      kontroll: 2,
      prisvarde: 4.5,
    },
    price: 285,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Oral-B-eltandborste-Vitality-Pro-Svart/3123751",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast att äga i fem år",
    pros: [
      "285 kronor, alltså den billigaste borsten i jämförelsen",
      "1 165 kronor på fem år med tjugo borsthuvuden inräknade, mot 4 929 för den dyraste",
      "Oral-B:s runda fattning, som tar både 44-kronorshuvuden och andras från 20 kronor",
      "Sensitive Plus-läge för den som har ömt tandkött",
    ],
    cons: [
      "Ingen trycksensor, alltså inget som säger till när du sliter på tandköttet",
      "22 timmars laddtid, så en tom borste är tom nästan ett dygn",
      "2D-teknik som svänger och roterar, medan Pro 3 3000 för 209 kronor mer också pulserar",
    ],
    specs: [
      {
        label: "Borsthuvudssystem",
        shortLabel: "Huvudsystem",
        value: "Oral-B rund fattning",
        highlight: true,
      },
      {
        label: "Pris per borsthuvud",
        shortLabel: "Kr/huvud",
        value: "44 kr",
        highlight: true,
      },
      { label: "Borsthuvuden per år", value: "176 kr" },
      { label: "Angiven drifttid", value: "–", highlight: true },
      { label: "Laddtid", value: "22 h", highlight: true },
      { label: "Laddare", value: "Laddställ" },
      { label: "Trycksensor", value: "Nej", highlight: true },
      { label: "Borstlägen", value: "3", highlight: true },
      { label: "Intensitetsnivåer", value: "–" },
      { label: "Rörelsetyp", value: "Oscillerande och roterande", highlight: true },
      { label: "Timer", value: "2 min med kvadranttimer" },
      { label: "Display", value: "Nej" },
      { label: "App", value: "Nej" },
      { label: "Resefodral", value: "Nej" },
      { label: "Garanti", value: "2 år, 3 år vid registrering" },
      { label: "GTIN", value: "4210201427063" },
    ],
    verdict:
      "Oral-B Vitality Pro är den billigaste vägen in i en eltandborste. 285 kronor hos Proshop.\n\n**Fem år med den kostar 1 165 kronor**, handtag och tjugo borsthuvuden inräknat, vilket är fjärdedelen av vad iO 10 kostar över samma tid. Det beror på fattningen: den runda Oral-B-fattningen är gammal och spridd, huvudena kostar 44 kronor styck i tiopack och andra tillverkare gör huvuden som passar från 20 kronor. Tre borstlägen ingår, varav Sensitive Plus är det skonsammaste Oral-B gör i den här klassen, och en kvadranttimer säger till var trettionde sekund.\n\n**Den har ingen trycksensor.** Det är den enda i jämförelsen utan, och det betyder att ingenting säger till när du trycker så hårt att tandköttet drar sig tillbaka, och det är en skada som syns först när den är gjord. Laddningen tar dessutom 22 timmar.\n\nTa den om budgeten är strikt eller om den ska stå i sommarstugan. Har du 209 kronor till ger Oral-B Pro 3 3000 dig trycksensor, ett batteri som räcker mer än två veckor och tio timmar kortare laddtid, med exakt samma billiga borsthuvuden.",
  },
  {
    id: "oral-b-io6",
    name: "iO 6 Black Lava",
    shortName: "Oral-B iO 6",
    brand: "Oral-B",
    image: productImage(ELTANDBORSTE.slug, "oral-b-io6"),
    tagline: "Fem lägen och display för under två tusen kronor.",
    scores: {
      batteri: 3,
      borsthuvud: 2,
      kontroll: 5,
      prisvarde: 2.5,
    },
    price: 1789,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Oral-B-eltandborste-iO6-Black-Lava-1-Extra-Refill/3448729",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst display under 2 000 kronor",
    pros: [
      "Fem borstlägen och en display på handtaget, vilket är iO-seriens funktioner till halva iO 10:s pris",
      "Trycksensorn signalerar rött, grönt och vitt, alltså både för hårt och för löst",
      "Ett extra borsthuvud ingår, värt 87 kronor",
      "Appen spårar var i munnen du borstat",
    ],
    cons: [
      "16 timmars laddtid, mot 3 för iO 7 och uppåt som använder den magnetiska snabbladdaren",
      "87 kronor per borsthuvud, och de passar bara iO-handtag",
      "1 789 kronor, alltså 3 529 på fem år, mot 1 374 för Oral-B:s egen Pro 3 3000",
    ],
    specs: [
      {
        label: "Borsthuvudssystem",
        shortLabel: "Huvudsystem",
        value: "Oral-B iO",
        highlight: true,
      },
      {
        label: "Pris per borsthuvud",
        shortLabel: "Kr/huvud",
        value: "87 kr",
        highlight: true,
      },
      { label: "Borsthuvuden per år", value: "348 kr" },
      { label: "Angiven drifttid", value: "–", highlight: true },
      { label: "Laddtid", value: "16 h", highlight: true },
      { label: "Laddare", value: "Laddställ" },
      {
        label: "Trycksensor",
        value: "Ja, rött, grönt och vitt",
        highlight: true,
      },
      { label: "Borstlägen", value: "5", highlight: true },
      { label: "Intensitetsnivåer", value: "–" },
      { label: "Rörelsetyp", value: "Magnetisk mikrovibration", highlight: true },
      { label: "Timer", value: "2 min, zonbyte var 30:e sekund" },
      { label: "Display", value: "Interaktiv svartvit" },
      { label: "App", value: "Ja, Bluetooth" },
      { label: "Resefodral", value: "Ja" },
      { label: "Ingår", value: "Extra borsthuvud" },
      { label: "Garanti", value: "2 år, 3 år vid registrering" },
      { label: "GTIN", value: "8006530067850" },
    ],
    verdict:
      "Oral-B iO 6 är den billigaste iO-borsten med display. 1 789 kronor hos Proshop, med ett extra borsthuvud i kartongen.\n\nFem borstlägen och en svartvit display på handtaget ger dig samma sorts återkoppling som iO 10, för 1 400 kronor mindre. Trycksensorn signalerar i tre färger: rött när du trycker för hårt, vitt när du trycker för löst och grönt när det är lagom. Appen visar efteråt var i munnen du faktiskt borstat, vilket är det enda sättet att upptäcka att man alltid missar samma ställe.\n\n**Laddningen tar 16 timmar.** Snabbladdningen på 3 timmar börjar först vid iO 7, så här laddar du över natten och inte över lunchen. Borsthuvudena kostar 87 kronor styck och passar bara andra iO-handtag.\n\nKöp den om du vill ha appen och displayen men inte tänker betala tre tusen. Är återkopplingen mindre viktig än vad borsten kostar att äga är Pro 3 3000 hälften så dyr på fem år.",
  },
  {
    id: "oral-b-io2",
    name: "iO 2 Night Black",
    shortName: "Oral-B iO 2",
    brand: "Oral-B",
    image: productImage(ELTANDBORSTE.slug, "oral-b-io2"),
    tagline: "Trycksensorn bromsar borsten i stället för att bara varna.",
    scores: {
      batteri: 2,
      borsthuvud: 2,
      kontroll: 4,
      prisvarde: 3,
    },
    price: 459,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Oral-B-eltandborste-iO2-Night-Black/3343209",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för den som borstar för hårt",
    pros: [
      "Trycksensorn sänker hastigheten och lyser rött, alltså ett skydd som griper in och inte bara varnar",
      "Magnetisk mikrovibration, samma borstteknik som iO-modeller för sex gånger priset",
      "Tre borstlägen, och 459 kronor är iO-seriens lägsta prislapp",
    ],
    cons: [
      "24 timmars laddtid, den längsta i jämförelsen, så en tom borste är tom hela dagen",
      "87 kronor per borsthuvud trots att handtaget kostar 459, alltså 2 199 på fem år",
      "Samma handtag i färgen Calm Pink kostar 609 kronor hos samma butik samma dag",
    ],
    specs: [
      {
        label: "Borsthuvudssystem",
        shortLabel: "Huvudsystem",
        value: "Oral-B iO",
        highlight: true,
      },
      {
        label: "Pris per borsthuvud",
        shortLabel: "Kr/huvud",
        value: "87 kr",
        highlight: true,
      },
      { label: "Borsthuvuden per år", value: "348 kr" },
      { label: "Angiven drifttid", value: "–", highlight: true },
      { label: "Laddtid", value: "24 h", highlight: true },
      { label: "Laddare", value: "Laddställ" },
      {
        label: "Trycksensor",
        value: "Ja, bromsar och lyser rött",
        highlight: true,
      },
      { label: "Borstlägen", value: "3", highlight: true },
      { label: "Intensitetsnivåer", value: "–" },
      { label: "Rörelsetyp", value: "Magnetisk mikrovibration", highlight: true },
      { label: "Timer", value: "2 min, zonbyte var 30:e sekund" },
      { label: "Display", value: "Nej" },
      { label: "App", value: "Nej" },
      { label: "Resefodral", value: "Nej" },
      { label: "Garanti", value: "2 år, 3 år vid registrering" },
      { label: "GTIN", value: "8700216612272" },
    ],
    verdict:
      "Oral-B iO 2 är den billigaste vägen till iO-seriens borstteknik. 459 kronor hos Proshop.\n\nTrycksensorn är det som gör den värd att titta på. Den varnar inte bara, den **sänker hastigheten på borsten** och lyser rött samtidigt, alltså ett skydd som fungerar även för den som inte tittar i spegeln. Magnetiska mikrovibrationer är samma drivning som i iO-modellerna för sex gånger priset, och tre borstlägen räcker för de flesta.\n\n**Laddningen tar 24 timmar, den längsta i hela jämförelsen.** Glömmer du sätta tillbaka den i stället är den tom hela nästa dag, och det gäller ett handtag som ändå binder dig till 87-kronorshuvuden, alltså samma pris som iO 10 tar, på en borste som kostar en sjundedel.\n\nKöp den bara om det är trycksensorn du är ute efter och budgeten stannar under femhundra. Annars ger Oral-B Pro 3 3000 för 35 kronor mer ett batteri som räcker mer än två veckor, halva laddtiden och borsthuvuden för halva priset.",
  },
];

export const ELTANDBORSTE_PRODUCTS: Product[] = resolveProducts(
  ELTANDBORSTE,
  SEEDS,
);

export const ELTANDBORSTE_FILTERS: ComparisonFilter[] = [
  {
    key: "billiga-huvuden",
    label: "Borsthuvuden under 70 kr",
    ids: ["oral-b-pro-3-3000", "oral-b-vitality-pro", "be-lucent-prism"],
  },
  {
    key: "snabb-laddning",
    label: "Laddad på under ett dygn",
    ids: [
      "oral-b-io10",
      "oral-b-pro-3-3000",
      "oral-b-io6",
      "oral-b-vitality-pro",
    ],
  },
  {
    key: "lang-drifttid",
    label: "Minst 21 dagar mellan laddningarna",
    ids: [
      "be-lucent-prism",
      "philips-sonicare-5300",
      "philips-sonicare-6500",
      "philips-sonicare-7100",
    ],
  },
  {
    key: "flera-lagen",
    label: "Fyra borstlägen eller fler",
    ids: [
      "oral-b-io10",
      "oral-b-io6",
      "philips-sonicare-7100",
      "philips-diamondclean-9000",
    ],
  },
  {
    key: "under-tusen",
    label: "Under 1 000 kronor",
    ids: [
      "oral-b-vitality-pro",
      "oral-b-io2",
      "oral-b-pro-3-3000",
      "be-lucent-prism",
      "philips-sonicare-5300",
    ],
  },
];

export const ELTANDBORSTE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Oral-B",
    name: "iO 2 Calm Pink",
    reason:
      "Samma handtag som iO 2 Night Black, som vi rankar, med samma tillbehör och samma borsthuvuden. Den kostar 150 kronor mer, och det enda som skiljer är färgen. Vi rankar den billigare av två identiska borstar.",
    approxPrice: 609,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Oral-B-eltandborste-iO2-Calm-Pink/3343208",
  },
  {
    brand: "Philips",
    name: "Sonicare 5300 Series HX7109/01",
    reason:
      "Också en Sonicare 5300, men med två handtag i kartongen i stället för ett. 1 343 kronor mot 745 för samma borste. Är ni två i hushållet som båda ska ha en är det billigare per person; ska du ha en enda är det samma vara till nästan dubbla priset.",
    approxPrice: 1343,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Philips-eltandborste-Sonicare-5300-series-HX710901-whiteblack/3398334",
  },
  {
    brand: "Oral-B",
    name: "iO 5 Matt Black och Quite White, duopack",
    reason:
      "Tvåpack av iO 5, alltså två handtag. Butiken för samtidigt ett annat tvåpack av samma modell för 2 799 kronor, alltså 720 kronor mer för samma sak. Tvåpacken ligger utanför rankningen eftersom priset inte går att jämföra med ett enkelt handtag.",
    approxPrice: 2079,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Oral-B-eltandborste-iO5-Matt-BlackQuiteWhite-Duo/3448727",
  },
  {
    brand: "Oral-B",
    name: "iO 9 Duo Black Onyx och Rose Quartz",
    reason:
      "Ett steg under iO 10 och kategorins dyraste artikel på 4 189 kronor, men bara som tvåpack. Enkelhandtaget av iO 9 stod som slut hos båda butikerna vi kan länka till, och en rankad produkt ska gå att beställa.",
    approxPrice: 4189,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Oral-B-eltandborste-iO9-Duo-Black-OnyxRose-Quartz-1-Extra-Refill/3448765",
  },
  {
    brand: "Philips",
    name: "Sonicare For Kids",
    reason:
      "Barntandborste, alltså en annan produkt för en annan köpare. Den mäts på mjukare borsthuvuden, kortare borsttid och om barnet vill använda den, inte på laddtid och kostnad per huvud. Barnborstar förklaras i köpguiden och får en egen systersida.",
    approxPrice: 549,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Philips-eltandborste-Sonicare-For-Kids/2579946",
  },
  {
    brand: "Philips",
    name: "Sonicare Power Flosser 3000",
    reason:
      "En munsköljare som spolar mellan tänderna med vattenstråle. Den ersätter tandtråd, inte tandborsten, och säljs i samma butikskategori av det skälet. Den hör hemma i en egen jämförelse.",
    approxPrice: 1099,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Tandborste/Philips-eltandborste-Sonicare-Power-Flosser-3000-HX382633-Black/3209708",
  },
];

export const ELTANDBORSTE_FAQ = [
  {
    question: "Vilken eltandborste är bäst 2026?",
    answer:
      "Oral-B Pro 3 3000 CrossAction, 494 kronor. Den har trycksensor, tre borstlägen och ett litiumjonbatteri som tillverkaren anger till mer än två veckor, och den laddar på 12 timmar i stället för ett dygn. Framför allt tar den Oral-B:s runda borsthuvuden för 44 kronor styck, vilket gör den till den billigaste borsten att äga i fem år efter Vitality Pro. Vill du hellre ha en sonisk borste är Philips Sonicare 5300 valet för 745 kronor. Reser du mycket räcker Be Lucent Prism 60 dagar på en laddning.",
  },
  {
    question: "Vad kostar en eltandborste egentligen?",
    answer:
      "Handtaget är en gång, borsthuvudet är varje kvartal. Oral-B anger själva att huvudet ska bytas var tredje månad, alltså fyra om året. Per styck kostar Oral-B:s runda huvuden 44 kronor, Philips Sonicare 81 och Oral-B iO 87, och Philips dyraste huvud A3 Premium ligger på 175. Över fem år blir det mellan 880 och 3 500 kronor bara i huvuden. Räknar man ihop handtag och tjugo huvuden kostar den billigaste borsten i vår jämförelse 1 165 kronor på fem år och den dyraste 4 929.",
  },
  {
    question: "Passar alla borsthuvuden till alla eltandborstar?",
    answer:
      "Nej, och skillnaden mellan tillverkarna är stor. Philips skriver på varje borsthuvud att det är kompatibelt med alla Sonicare-handtag utom Philips One och Kids, så en Sonicare-ägare kan välja huvud efter pris. Oral-B har två system som inte passar varandra: den runda fattningen som sitter på Vitality och Pro, och iO-fattningen. Om iO-huvudena skriver Oral-B själva att de är designade för att passa endast iO-handtag. Köper du ett iO-handtag är du alltså bunden till 87-kronorshuvuden så länge du äger det.",
  },
  {
    question: "Är oscillerande eller sonisk eltandborste bäst?",
    answer:
      "Ingen av dem, enligt den enda svenska laboratorieprovningen. Råd & Rön provade 24 eltandborstar och publicerade resultatet den 23 januari 2026, och skriver att de inte ser i testet att någon teknik är bättre än den andra, utan att det handlar mer om vad du trivs med. Oscillerande är Oral-B:s runda huvud som svänger och roterar. Soniskt är Philips avlånga huvud som vibrerar, 62 000 rörelser i minuten. Välj efter känsla, och lägg pengarna på det som faktiskt skiljer: laddtid, trycksensor och vad huvudena kostar.",
  },
  {
    question: "Hur lång tid tar det att ladda en eltandborste?",
    answer:
      "Mellan 3 och 24 timmar, och det följer inte priset. Procter & Gamble publicerar laddtiden för hela Oral-B-sortimentet: iO 7 och uppåt laddar fullt på 3 timmar med den magnetiska laddaren, iO 3 till iO 6 på 16 timmar, Vitality Pro på 22 och iO 2 på 24. Philips skriver i sin bruksanvisning att det kan ta upp till 24 timmar innan en Sonicare är fulladdad, och det gäller varenda modell oavsett om den kostar 745 eller 2 301 kronor. Den enklaste lösningen är att låta borsten stå i laddaren mellan borstningarna.",
  },
  {
    question: "Behöver jag en eltandborste med app?",
    answer:
      "Bara om du misstänker att du missar samma ställe varje gång. Appen visar var i munnen du faktiskt borstat, och det är den enda funktionen som säger något du inte kan se själv. Timern och trycksensorn sitter i handtaget och fungerar utan telefon. Uppkopplade borstar kostar betydligt mer: i vår jämförelse ligger de från 1 413 kronor och uppåt, medan borstar med samma trycksensor och samma antal lägen börjar på 459.",
  },
  {
    question: "Vad är skillnaden på Oral-B Pro 3000 och Pro 3 3000?",
    answer:
      "Batteriet, och det är hela skillnaden trots att namnen skiljer sig på ett tecken. Procter & Gamble förklarar det själva: när de bytte från nickelmetallhydrid till litiumjon bytte de också produktnamn, och lade in seriesiffran före modellnumret. Deras egen tabell anger att nickelmodellen Pro 3000 räcker upp till 7 dagar mellan laddningarna medan litiummodellen Pro 3 3000 räcker mer än två veckor och laddar snabbare. Står de bredvid varandra i hyllan är det siffran före du ska titta på.",
  },
  {
    question: "Hur ofta ska man byta borsthuvud?",
    answer:
      "Var tredje månad. Det är tillverkarnas eget intervall: Oral-B skriver att tandläkare rekommenderar att byta var tredje månad för att maximera rengöringen, och Be Lucent skriver att huvudet ska bytas minst var tredje månad. Flera modeller hjälper till att hålla räkningen. Oral-B:s huvuden har ett blått fält som bleknar till gult när det är dags, och Philips Sonicare räknar hur ofta och hur hårt du borstar och påminner när huvudet är utnött.",
  },
  {
    question: "Skadar en eltandborste tandköttet?",
    answer:
      "Den kan göra det om du trycker för hårt, och det är därför trycksensorn är den funktion som betyder mest. Tandköttet drar sig tillbaka av upprepat för hårt tryck, och det syns först när det redan hänt. Nio av tio borstar i vår jämförelse har en sensor, men de fungerar olika: Philips varnar med en förändrad vibration eller en synlig markering, Oral-B iO lyser rött och iO 2 sänker dessutom hastigheten. Oral-B Vitality Pro är den enda i jämförelsen helt utan sensor.",
  },
  {
    question: "Finns det ett svenskt test av eltandborstar?",
    answer:
      "Ja. Råd & Rön har provat 24 eltandborstar i labb och publicerade resultatet den 23 januari 2026. De mäter hur mycket plack borstarna tar bort, hur länge batteriet räcker och hur länge det behöver laddas, hur bekväma borstarna är och hur enkla de är att rengöra. Resultaten per modell ligger bakom betalvägg och vi har inte köpt dem, så vi vet inte vilken borste de utsåg till bäst och påstår det aldrig. Därför har vår sida inget kriterium för testomdöme.",
  },
  {
    question: "Drar laddaren ström när tandborsten inte står i?",
    answer:
      "Lite, men en av dem drar mer än de andra. Oral-B deklarerar effekten enligt EU-förordning 2023/826: de vanliga laddställen drar 0,1 till 0,26 watt, medan iO Sense-laddaren med wifi påslaget drar 1,2 watt dygnet runt. Det blir 10,5 kilowattimmar om året, alltså ungefär vad en LED-lampa som lyser halva dygnet drar. Stänger du av wifi i laddaren faller den till 0,1 watt.",
  },
];
