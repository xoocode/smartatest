import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { NYCKELSKAP } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /nyckelskap.
 *
 * Priser, produktnamn, GTIN och butiks-URL:er är lästa ur butikernas egen
 * JSON-LD på PRICE_CHECKED. Specifikationerna kommer från tillverkarnas egna
 * produktsidor och produktblad, alltså tier A, och aldrig från butikens
 * marknadsföringstext.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans ännu. Se lib/links.ts.
 *
 * ## Provresultaten, och varför bara två produkter har dem
 *
 * RISE provade fyra nyckelskåp åt Villaägarnas Riksförbund 2022-06-16, rapport
 * P115210, metod SS-EN 1630:2021 på nivåerna RC2 och RC3. Två av de fyra säljs
 * fortfarande här och rankas nedan. De två andra, Masunt 520 M och HMF
 * 2030-11, hittades inte i svensk handel och ligger bland övervägda.
 *
 * Tiderna väger in i `infastning` och `luckalas` för just de två modellerna.
 * Övriga tre produkter bedöms på publicerad konstruktion och får aldrig ett
 * lånat provresultat, se ALDRIG_BEDOMD i lib/spec-schema.mjs.
 *
 * ## ⚠️ Variantfällan, kontrollerad och avgjord 2026-08-05
 *
 * RISE:s provobjekt heter "ABUS 787C" och anges i rapportens Tabell 1 som
 * **analog kod**. Rapportens Bild 5 visar fyra mekaniska kodhjul. Det är alltså
 * den mekaniska KeyGarage 787, EAN 4003318463310, som är samma EAN som butiken
 * anger för `abus-keygarage-787` nedan.
 *
 * Kjell säljer en annan produkt med samma nummer: ABUS KeyGarage 787 **Smart-BT**
 * med elektronisk knappsats, sexsiffrig kod och app. Den har **inget**
 * provresultat och får inte ärva 787C:s tider. Det är samma fälla som Nanoleaf
 * Lines mot Essentials och TP-Link LB120 mot Tapo L530E på /smart-belysning,
 * och den här gången är den kontrollerad mot rapportens foton innan något
 * skrevs.
 *
 * ## Prisspridningen på Master Lock 5441, kontrollerad 2026-08-05
 *
 * Samma modell, 5441EURD, ligger på 2 015 kr hos Amazon.se, 2 599 hos Nordsec
 * och 2 995 hos Bauhaus, som dessutom är slut. PriceRunners egen JSON-LD anger
 * lowPrice 1 994 och highPrice 2 995 över fem erbjudanden. Vi länkar Nordsec
 * eftersom priset är verifierat, varan finns i lager och butiken ligger under
 * Bauhaus, som är den av våra etablerade butiker som för modellen. Amazon
 * valdes bort som länkmål: sajten har aldrig länkat dit i något av 216
 * produktkort, marknadsplatspriser rör sig snabbt och `scripts/priskoll.mjs`
 * har ingen regel för värden.
 *
 * Spridningen står i omdömet som ett råd till köparen, av samma skäl som
 * /utrymningsstege skriver ut att samma artikelnummer skiljer 49 procent.
 *
 * ## Väderskyddet, omgjort 2026-08-06
 *
 * ⚠️ Raden betygsatte tidigare vår research. Fyra av fem skåp stod som
 * `Ej angiven` och drog ner `vaderskydd` för det, med motiveringen att en
 * okontrollerbar egenskap är sämre för köparen. Det är ett avdrag för vad vi
 * inte hittat, och det får en uppgift aldrig kosta. Se `.claude/skills/fix-page`,
 * "En saknad uppgift får aldrig sänka ett betyg".
 *
 * Vi hade inte letat färdigt. Samtliga fem har nu ett belagt värde ur tier A:
 *
 * - ABUS 787 och 707: "För väggmontering inomhus eller i ett skyddat område
 *   utomhus", ABUS egna datablad 73481 respektive 224010, lästa 2026-08-06.
 * - ABUS KeyGarage 787 Smart-BT: **IP 54**. Databladet heter numera
 *   KEYGARAGE™ One 787 (222847), och ABUS skriver att namnbytet följde med
 *   integrationen i ABUS One-appen. Samma vara: Kjell anger 82,5 x 120 x 63 mm
 *   och 2 x AA, vilket är exakt databladets mått och batteri.
 * - Master Lock 5441EURD: IP 55, -40 till +50 °C, salt- och korrosionsprovad,
 *   produktbladet 5441EURD_Select-Access-SMART-Product-Sheet_EN.pdf.
 * - Top Safe T7: väderskydd i gummi över hela huset, tillverkarens egen sida
 *   nivextopsafe.se, som också ger vikten 0,6 kg.
 *
 * ## ⚠️ Locket över koden stod fel på båda ABUS-skåpen
 *
 * Både 787 och 707 har ett skjutbart skyddslock över kodhjulen. ABUS listar det
 * som `Skyddslock med skjutmekanism` för 707 och som en oöversatt tysk sträng,
 * `Schutzklappe mit Schiebemechanismus`, för 787. Monteringsanvisningen för
 * 787/797 beskriver momentet i steg: skjut ner skyddslocket, ställ in koden,
 * öppna, och skjut upp locket igen. Tabellen sa `Nej` för båda.
 *
 * Det rättades 2026-08-06 och flyttade betygen på `vaderskydd`. Se
 * lib/corrections.ts.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "abus-keygarage-787",
    brand: "ABUS",
    name: "KeyGarage 787 med kombinationslås",
    shortName: "KeyGarage 787",
    image: productImage(NYCKELSKAP.slug, "abus-keygarage-787"),
    tagline: "Höll längst av alla mot skruvmejsel, och kostar 490 kronor.",
    scores: {
      /* RISE §4.1: 3 min 39 s mot infästningen med två skruvmejslar och
         morakniv, ej forcerat inom RC2:s effektiva angreppstid på 3 min. §4.2:
         forcerat med kofot på 35 sekunder, och bakstycket lossnade från
         skåpskroppen så att innehållet blev åtkomligt. Det senare drar ner:
         två av fyra skåp höll ihop kroppen, det här gjorde inte det. */
      infastning: 3,
      /* RISE §4.3: låssidan forcerad på 2 min 41 s. §4.4: gångjärnssidan
         forcerad på 2 min 53 s med bågfil. Båda inom RC2:s tidsram, men båda
         långsammast eller näst långsammast av de fyra på sin punkt. */
      luckalas: 2.5,
      /* ABUS datablad 73481: skyddat läge utomhus, och skyddslock med
         skjutmekanism över kodhjulen. Mekaniskt lås utan ström. Ingen angiven
         kapslingsklass, alltså steget under gummihöljet på T7. */
      vaderskydd: 3,
      kod: 3,
      prisvarde: 4.5,
    },
    price: 490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Byggahus Shop",
    merchantUrl:
      "https://shop.byggahus.se/products/nyckelskap-keygarage-787-med-kombinationslas-abus",
    award: "winner",
    superlative: "Bäst för villan",
    pros: [
      "Satt kvar 3 min 39 s mot skruvmejsel, längst av de fyra som bröts upp",
      "Lucka i tryckgjuten zink, och skruvarna sitter innanför den",
      "Rymmer 20 nycklar eller 14 passerkort",
      "Skjutbart lock över kodhjulen, och en kod som aldrig behöver batteri",
    ],
    cons: [
      "Bakstycket lossnade från kroppen när skåpet bröts loss med kofot",
      "Byggd för skyddat läge utomhus, alltså under tak eller på en vägg i lä",
      "En enda kod för alla, så den som fått den kommer in tills du vrider om hjulen",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "490 kr", highlight: true },
      { label: "Infästning", value: "Väggmontering med skruvkoppling" },
      { label: "Skruvar innanför luckan", value: "Ja", highlight: true },
      { label: "Material", value: "Metallhölje, lucka i tryckgjuten zink", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "4 mekaniska kodhjul", highlight: true },
      { label: "Kodlängd", value: "4 siffror" },
      { label: "Antal kombinationer", value: "10 000" },
      { label: "Nyckelbackup", value: "Nej" },
      // ABUS datablad 73481, swe-SE, läst 2026-08-06.
      { label: "Väderskydd", value: "Skyddat läge utomhus", highlight: true },
      { label: "Lock över koden", value: "Ja, skjutbart skyddslock", highlight: true },
      { label: "Nyckelkapacitet", value: "20 nycklar eller 14 kort", highlight: true },
      { label: "Yttermått", value: "80 x 120 x 45 mm" },
      { label: "Vikt", value: "683 g" },
      { label: "App", value: "Nej" },
      { label: "Provad av RISE", value: "Ja, som ABUS 787 C", highlight: true },
      { label: "Tid mot infästning", value: "35 s med kofot" },
      { label: "Tid mot lucka", value: "2 min 41 s vid låssidan" },
      { label: "GTIN", value: "4003318463310" },
    ],
    verdict:
      "ABUS KeyGarage 787 är det bästa köpet i jämförelsen och kostar 490 kronor. Luckan är tryckgjuten zink, de fyra skruvarna sitter innanför den, och skåpet tar 20 nycklar eller 14 passerkort.\n\nMot skruvmejsel och kniv satt den kvar i 3 minuter och 39 sekunder, längst av de fyra skåp som bröts upp under kontrollerade former. Det svagaste av dem gick upp på 38 sekunder, så spannet i kategorin är stort och det här skåpet ligger i toppen av det. Att skruvarna sitter innanför luckan betyder dessutom att ingen får loss skåpet från väggen utan att först ta sig in i det.\n\nSvagheten sitter i ryggen. Med kofot lossnade bakstycket från kroppen efter 35 sekunder, och då ligger nycklarna framme utan att luckan behöver öppnas. Skruva därför i massivt trä, betong eller tegel och aldrig i panel. Underlaget avgör lika mycket som skåpet.\n\nSka du släppa in hantverkare, städare eller stuggäster är det här skåpet du ska köpa. Du lägger pengarna på gods och infästning i stället för på en app, och får 20 nyckelplatser på köpet.",
  },
  {
    id: "master-lock-5441",
    brand: "Master Lock",
    name: "Select Access Smart 5441EURD",
    shortName: "Select Access Smart",
    image: productImage(NYCKELSKAP.slug, "master-lock-5441"),
    tagline: "IP 55 och funktion ner till -40 grader, med en egen kod till varje gäst.",
    scores: {
      /* RISE §4.2: 16 sekunder med kofot, snabbast av alla fyra. §4.1 höll dock
         3 min 6 s mot skruvmejsel. Infästningen är dess svagaste punkt. */
      infastning: 2,
      /* RISE §4.3: enda skåpet som INTE forcerades vid låssidan, 3 min 15 s.
         §4.4: gångjärnssidan forcerad först på 3 min 57 s, alltså utanför
         RC2:s tidsram. Mot standardens verktyg är den klart bäst. Men §4.6:
         åtta slag med 700 g snickarhammare, nio sekunder, luckan öppen. Det
         väger tyngre än allt annat på den här raden. */
      luckalas: 2.5,
      /* Enda produkten med både kapslingsklass och temperaturspann angivet. */
      vaderskydd: 5,
      kod: 4.5,
      prisvarde: 1.5,
    },
    price: 2599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Nordsec",
    merchantUrl:
      "https://www.nordsec.se/nyckelskap/nyckelgomma/nyckelgomma-masterlock-5441",
    /* Etiketten var `Bäst för uthyrning` fram till 2026-08-06. Den gick inte
       att skilja från Smart-BT:ns `Bäst när gästen inte ska ha koden` sedan
       båda visat sig ha gästkoder i app, och den avvägande läsaren står mellan
       just de två. Den fria fasaden är den skillnad som avgör. */
    superlative: "Bäst för en oskyddad vägg",
    pros: [
      "IP 55, salt- och korrosionsprovad, och funktion från -40 °C till +50 °C",
      "Egen kod till varje gäst, och koden kan sluta gälla av sig själv",
      "Enda skåpet som klarade angreppet mot låssidan i provningen",
      "Belyst knappsats, och batteriet går att brygga utifrån med ett 9-voltsbatteri",
    ],
    cons: [
      "Öppnades på 9 sekunder med åtta slag av en snickarhammare",
      "Lossnade från väggen på 16 sekunder med kofot, snabbast av de provade",
      "2 599 kronor, alltså fem gånger priset på ABUS KeyGarage 787",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "2 599 kr", highlight: true },
      { label: "Infästning", value: "Väggmontering, skruvar medföljer" },
      { label: "Skruvar innanför luckan", value: "Ja", highlight: true },
      { label: "Material", value: "Zinkkropp med plastad baksida", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "Elektronisk knappsats", highlight: true },
      { label: "Kodlängd", value: "10 siffror" },
      { label: "Antal kombinationer", value: "Obegränsat antal gästkoder" },
      { label: "Nyckelbackup", value: "Nej, huvudkod via appen" },
      { label: "Batteri", value: "CR123, cirka 2 år" },
      { label: "Väderskydd", value: "IP 55, -40 till +50 °C", highlight: true },
      { label: "Lock över koden", value: "Nej, belyst knappsats", highlight: true },
      /* Master Lock anger antal nycklar ingenstans: varken produktbladet,
         masterlock.eu/5441EURD eller instruktionsbladet har talet. Kontrollerat
         om 2026-08-06. Innermåttet nedan är det som finns, och det står därför
         kvar som radens svar. Cellen renderas som ett streck. */
      { label: "Nyckelkapacitet", value: "Ej angiven", highlight: true },
      { label: "Innermått", value: "89 x 64 x 44 mm" },
      { label: "Yttermått", value: "121 x 76 x 70 mm" },
      { label: "Vikt", value: "1,02 kg" },
      { label: "App", value: "Ja, Bluetooth" },
      { label: "Provad av RISE", value: "Ja, som Master Lock 5441", highlight: true },
      { label: "Tid mot infästning", value: "16 s med kofot" },
      { label: "Tid mot lucka", value: "9 s med hammare" },
    ],
    verdict:
      "Master Lock Select Access Smart är det enda skåpet här som får sitta på en vägg utan tak över sig. IP 55, drift från 40 minusgrader till 50 plusgrader, provat mot saltdimma och korrosion, och en egen kod till varje gäst. 2 599 kronor.\n\nVäderskyddet är det du betalar för. Ett skåp som klarar 40 minusgrader och saltstänk får sitta på en fri fasad eller ute vid kusten, och tar batteriet slut mitt i februari bryggar du det utifrån med ett 9-voltsbatteri. Koderna är det andra skälet: du ger en gäst tillgång på distans, låter koden sluta gälla när uthyrningen är slut och ser i appen vem som öppnade när. Antalet gästkoder är obegränsat, så du behöver aldrig återanvända en.\n\nMot standardens verktyg är det starkast av de fyra, och det enda vars lucka inte gick att bryta upp vid låssidan. Sedan byttes verktyget: 8 slag med en 700 grams snickarhammare, 9 sekunder, luckan öppen. Hammaren ligger utanför metodens verktygslista och i varje garage.\n\n700 kronor mindre köper ABUS KeyGarage 787 Smart-BT, som ger samma gästkoder i appen men vill sitta under tak. Mellanskillnaden är vad det kostar att slippa bry sig om var på huset skåpet hamnar. Jämför dessutom priset innan du beställer: samma modell rör sig mellan ungefär 2 000 och 3 000 kronor beroende på butik.",
  },
  {
    id: "top-safe-t7",
    brand: "Top Safe",
    name: "Nyckelgömma T7",
    image: productImage(NYCKELSKAP.slug, "top-safe-t7"),
    tagline: "Gjutgods och ett gummihölje över hela boxen, byggd för att stå ute.",
    scores: {
      infastning: 2.5,
      luckalas: 2.5,
      /* Väderskyddet i gummi träs över hela huset och inte bara över hjulen,
         vilket tillverkarens egen bild visar. Låset är mekaniskt utan ström.
         Steget över ABUS skjutlock, steget under en angiven kapslingsklass. */
      vaderskydd: 3.5,
      kod: 3,
      prisvarde: 3.5,
    },
    price: 695,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "E-safe",
    merchantUrl: "https://esafe.se/products/nyckelgomma-t7",
    superlative: "Bäst för stugan",
    pros: [
      "Kropp i aluminiumgjutgods, som spricker hellre än viker sig",
      "Gummihöljet träs över hela boxen, inte bara över kodhjulen",
      "Mekanisk kod utan batteri, så den fungerar efter en vinter utan tillsyn",
      "Sex nycklar med magnetfäste, nog för stuga, förråd och bom",
    ],
    cons: [
      "Innerfacket är 70 x 38 x 22 mm, så en bilnyckel med fjärrkontroll får inte plats",
      "600 gram, alltså mindre gods än både KeyGarage 787 och Master Lock",
      "125 kronor i frakt om du inte handlar mer samtidigt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "695 kr", highlight: true },
      { label: "Infästning", value: "Väggmontage, skruvar medföljer" },
      /* Tillverkarens egen bild på den öppna gömman visar fyra
         infästningshål i bakväggen av nyckelfacket, alltså innanför luckan:
         nivextopsafe.se/wp-content/uploads/2021/07/Nyckelgomma-T7-oppen-scaled.jpg,
         läst 2026-08-06. */
      { label: "Skruvar innanför luckan", value: "Ja", highlight: true },
      { label: "Material", value: "Aluminiumgjutgods", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "4 mekaniska kodhjul", highlight: true },
      { label: "Kodlängd", value: "4 siffror" },
      { label: "Antal kombinationer", value: "10 000" },
      { label: "Nyckelbackup", value: "Nej" },
      // Tillverkaren nivextopsafe.se, läst 2026-08-06: väderskydd i gummi,
      // vikt 0,6 kg, inv. mått 70 x 38 x 22 mm.
      { label: "Väderskydd", value: "Gummihölje över hela boxen", highlight: true },
      { label: "Lock över koden", value: "Ja, gummiskydd medföljer", highlight: true },
      { label: "Nyckelkapacitet", value: "6 nycklar", highlight: true },
      { label: "Innermått", value: "70 x 38 x 22 mm" },
      { label: "Yttermått", value: "106 x 66 x 57 mm" },
      { label: "Vikt", value: "600 g" },
      { label: "App", value: "Nej" },
      { label: "Provad av RISE", value: "Nej", highlight: true },
    ],
    verdict:
      "Top Safe T7 är gömman för stugan som står tom halva året. 695 kronor, kropp i aluminiumgjutgods och sex nyckelplatser med magnetfäste.\n\nGummihöljet är det som skiljer den från de andra mekaniska skåpen. Det träs över hela boxen och inte bara över kodhjulen, så väta kommer varken åt sifferhjulen eller springan runt luckan. Låset drar ingen ström, alltså fungerar det likadant efter sex månader utan tillsyn som dagen du satte upp det. Gjutgodset beter sig dessutom annorlunda än tunn plåt under en kil: det spricker hellre än viker sig.\n\nFacket är litet. 70 x 38 x 22 millimeter räcker till ett par cylindernycklar, men en modern bilnyckel med fjärrkontroll går inte ner i det. Lägg till 125 kronor i frakt om du inte handlar mer samtidigt.\n\nSka nyckeln till huset du bor i ligga där gör ABUS KeyGarage 787 jobbet bättre och 205 kronor billigare, med ett eget resultat från provningen bakom sig. T7 köper du till stället du lämnar över vintern.",
  },
  {
    id: "abus-keygarage-707",
    brand: "ABUS",
    name: "KeyGarage 707",
    image: productImage(NYCKELSKAP.slug, "abus-keygarage-707"),
    tagline: "349 kronor, 502 gram och plats för sju nycklar.",
    scores: {
      infastning: 2.5,
      /* Aluminiumhölje och mindre kropp än 787:an, som är den enda i familjen
         med ett eget provresultat. Bedömd på konstruktion, aldrig lånad tid. */
      luckalas: 2,
      /* ABUS datablad 224010: skyddat läge utomhus, och skyddslock med
         skjutmekanism över kodhjulen. Samma konstruktion som 787:an. */
      vaderskydd: 3,
      kod: 3,
      prisvarde: 4.5,
    },
    price: 349,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 107, checkedAt: PRICE_CHECKED },
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/sakerhetsskap/abus-keygarage-707-nyckelskap-p32326",
    award: "budget",
    superlative: "Billigast",
    pros: [
      "Billigast i jämförelsen",
      "502 gram och 88 millimeter bred, så den syns knappt bredvid dörren",
      "Skjutbart lock över kodhjulen, och en kod utan batteri",
      "Plats för fyra passerkort, vilket få skåp i storleken har",
    ],
    cons: [
      "Aluminiumhölje och mindre kropp än KeyGarage 787, för 141 kronor mindre",
      "502 gram, alltså minst gods av alla här att bita i med ett verktyg",
      "Sju nycklar är taket, så den räcker inte till en förening eller ett företag",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "349 kr", highlight: true },
      { label: "Infästning", value: "Väggmontering, hål i bakstycket" },
      { label: "Skruvar innanför luckan", value: "Ja", highlight: true },
      { label: "Material", value: "Aluminiumhölje", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "4 mekaniska kodhjul", highlight: true },
      { label: "Kodlängd", value: "4 siffror" },
      { label: "Antal kombinationer", value: "10 000" },
      { label: "Nyckelbackup", value: "Nej" },
      // ABUS datablad 224010, swe-SE, läst 2026-08-06.
      { label: "Väderskydd", value: "Skyddat läge utomhus", highlight: true },
      { label: "Lock över koden", value: "Ja, skjutbart skyddslock", highlight: true },
      { label: "Nyckelkapacitet", value: "7 nycklar eller 4 kort", highlight: true },
      { label: "Yttermått", value: "88 x 120 x 39 mm" },
      { label: "Vikt", value: "502 g" },
      { label: "App", value: "Nej" },
      { label: "Provad av RISE", value: "Nej", highlight: true },
      { label: "GTIN", value: "4003318685644" },
    ],
    verdict:
      "ABUS KeyGarage 707 är billigast i jämförelsen och den enklaste vägen bort från nyckeln under dörrmattan. 349 kronor, 502 gram och 88 millimeter brett.\n\nStorleken är dess argument. Ett skåp som är knappt nio centimeter brett sitter bakom stupröret utan att annonsera var huset förvarar sin nyckel, och det väger under ett halvkilo. Det tar sju nycklar plus fyra passerkort, vilket är ovanligt mycket i den storleken, och koden ställs med hjul som aldrig behöver batteri.\n\nGodset är tunnare än på storasystern. 707 är byggd i aluminium där KeyGarage 787 har lucka i tryckgjuten zink, och det är 787:an som satt kvar i 3 minuter och 39 sekunder mot skruvmejsel. Mellanskillnaden är 141 kronor.\n\nKöp 707 till trapphuset, garaget eller förrådsdörren. Ska nyckeln som går till hela huset ligga i den lägger du de 141 kronorna och tar KeyGarage 787 i stället.",
  },
  {
    id: "abus-keygarage-787-smart-bt",
    brand: "ABUS",
    name: "KeyGarage 787 Smart-BT",
    shortName: "KeyGarage Smart-BT",
    image: productImage(NYCKELSKAP.slug, "abus-keygarage-787-smart-bt"),
    tagline: "Skicka en länk i mobilen, så öppnar gästen skåpet utan att få koden.",
    scores: {
      /* Elektronisk modell med annan lucka och annan kropp än den mekaniska
         787:an. Inget eget provresultat, och 787C:s tider får inte lånas hit.
         Bedömd enbart på publicerad konstruktion. */
      infastning: 2.5,
      luckalas: 2.5,
      /* IP 54 ur ABUS eget datablad 222847, som numera heter KEYGARAGE One 787.
         Angiven kapslingsklass utan temperaturspann, alltså steget under
         Master Locks IP 55 med -40 till +50 °C. */
      vaderskydd: 4,
      kod: 4.5,
      prisvarde: 2,
    },
    price: 1899,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 11, checkedAt: PRICE_CHECKED },
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/sakerhetsskap/abus-keygarage-787-nyckelskap-med-bluetooth-p32327",
    superlative: "Bäst när gästen inte ska ha koden",
    pros: [
      "Gästen öppnar med en länk i mobilen och behöver aldrig få koden",
      "Olika koder till olika personer, och de går att ta bort var för sig",
      "IP 54, alltså stänkskyddad, och belyst knappsats när det är mörkt",
      "20 nycklar, 3 bilnycklar eller 30 passerkort i facket",
    ],
    cons: [
      "1 899 kronor, nästan fyra gånger den mekaniska 787:an",
      "Stänkskyddad IP 54, medan Master Lock anger IP 55 och drift ner till -40 °C",
      "Knappsatsen går på två AA-batterier, och batterier ger upp först i kyla",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 899 kr", highlight: true },
      { label: "Infästning", value: "Väggmontering med skruvkoppling" },
      { label: "Skruvar innanför luckan", value: "Ja", highlight: true },
      { label: "Material", value: "Metallhölje", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "Elektronisk knappsats", highlight: true },
      { label: "Kodlängd", value: "6 siffror" },
      { label: "Antal kombinationer", value: "1 000 000" },
      { label: "Nyckelbackup", value: "Nej" },
      { label: "Batteri", value: "2 x AA, byts utifrån" },
      /* ABUS datablad 222847, swe-SE, läst 2026-08-06. Databladet heter numera
         KEYGARAGE One 787; ABUS anger att namnbytet följde integrationen i
         ABUS One-appen. Måtten och batteriet stämmer med Kjells artikel. */
      { label: "Väderskydd", value: "IP 54, skyddat läge utomhus", highlight: true },
      { label: "Lock över koden", value: "Nej, belyst knappsats", highlight: true },
      { label: "Nyckelkapacitet", value: "20 nycklar eller 30 kort", highlight: true },
      { label: "Yttermått", value: "82,5 x 120 x 63 mm" },
      { label: "Vikt", value: "894 g" },
      { label: "App", value: "Ja, Bluetooth" },
      { label: "Provad av RISE", value: "Nej", highlight: true },
      { label: "GTIN", value: "4003318638244" },
    ],
    verdict:
      "KeyGarage 787 Smart-BT löser det kodhjulen inte kan: gästen behöver aldrig få veta någon kod. Du skickar en länk i mobilen, den börjar gälla när du säger till och slutar gälla när du säger till. 1 899 kronor.\n\nHar du hantverkare, städfirma och gäster om vartannat är det en verklig lättnad. Varje person får sin egen access som du tar bort för sig, utan att röra någon annans, och du slipper gå ut och vrida om fyra hjul mellan varje besök. Facket tar 20 nycklar, 3 bilnycklar eller 30 passerkort, och stänkskyddet IP 54 räcker för en yttervägg som inte står rakt i drevet. Knappsatsen lyser, så koden går att slå in i mörker utan ficklampa.\n\nPriset är svårt att försvara. 1 899 kronor är nästan fyra gånger den mekaniska 787:an, som har samma väggmontering och plats för lika många nycklar. Knappsatsen går dessutom på två AA-batterier, och batterier är det som ger upp först i kyla. De byts utifrån utan att skåpet öppnas, vilket räddar dig den dagen det händer.\n\nHar du 700 kronor till får du IP 55, korrosions- och saltprovning och drift ner till 40 minusgrader med Master Lock Select Access Smart, som tål en fri fasad. Räcker det med en kod du byter någon gång om året är den mekaniska 787:an samma skåp för 490.",
  },
];

export const NYCKELSKAP_PRODUCTS = resolveProducts(NYCKELSKAP, SEEDS);

/**
 * Tittade på, valde bort. Två av dem är provade av RISE och hade varit
 * självklara att ranka om de gått att köpa här.
 */
export const NYCKELSKAP_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Top Safe",
    name: "Nyckelgömma T26",
    approxPrice: 895,
    merchant: "E-safe",
    merchantUrl: "https://esafe.se/products/nyckelgomma-t26",
    reason:
      "Samma skåp som T7 med åtta nyckelplatser i stället för sex, för 200 kronor mer. Delar ni bom, sjöbod och förrådsdörr i en samfällighet fylls sex platser fortare än man tror, och då är T26 rätt köp. Är det ett hus med en ytterdörr och ett förråd står två platser tomma, och T7 gör samma jobb billigare. Vi rankar T7 eftersom den täcker det vanligare fallet.",
  },
  {
    brand: "Top Safe",
    name: "Nyckelgömma T1",
    approxPrice: 595,
    merchant: "E-safe",
    merchantUrl: "https://esafe.se/products/nyckelgomma-t1",
    reason:
      "Samma gjutgods och samma gummiskydd som T7, men tre nycklar i stället för sex för hundra kronor mindre. Har du en enda nyckel att lägga in är den ett fullgott köp; ska hantverkaren också in ryms det inte.",
  },
  {
    brand: "Top Safe",
    name: "Nyckelgömma H9",
    approxPrice: 795,
    merchant: "E-safe",
    merchantUrl: "https://esafe.se/products/nyckelgomma-h9",
    reason:
      "Utförd som ett hänglås i stället för att skruvas i väggen, vilket gör den till en annan produkt. Den hänger på ett staket eller ett räcke och kan klippas loss med en bultsax, medan hela poängen med de rankade skåpen är att de sitter fast i något. Praktisk på en byggarbetsplats, fel val vid en ytterdörr.",
  },
  {
    brand: "ABUS",
    name: "KeyGarage 787 LED",
    approxPrice: 599,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Abus-KeyGarage-787-LED-nyckelskap,-upplyst-kodlas/p/41-8046",
    reason:
      "Samma skåp som testvinnaren med belysta kodhjul, för 109 kronor mer. Belysningen är verkligt användbar en mörk decemberkväll. Vi rankar den inte separat eftersom den skulle lägga sig direkt intill testvinnaren och säga samma sak två gånger, men står du och väljer mellan dem är merpriset rimligt.",
  },
  {
    brand: "Masunt",
    name: "520 M",
    reason:
      "Provad av RISE och det skåp som klarade sig sämst: luckan öppnades på 38 sekunder vid låssidan och 59 sekunder vid gångjärnen. Den gick inte att hitta hos någon återförsäljare här, vilket är tur.",
  },
  {
    brand: "HMF",
    name: "2030-11",
    reason:
      "Provad av RISE och den enda som forcerades redan med skruvmejsel mot infästningen, på 3 minuter och 8 sekunder, då bakstycket lossnade. Den är dessutom ett litet väggskåp snarare än en nyckelbox och löser ett annat problem. Säljs inte här.",
  },
  {
    brand: "Nivex",
    name: "Nyckelskåp ES1",
    approxPrice: 695,
    merchant: "E-safe",
    merchantUrl: "https://esafe.se/products/es1-2",
    reason:
      "Ser ut som ett nyckelskåp i butikslistan men är ett nödnyckelskåp med en glasruta som ska krossas när något hänt. Det är avsett för att alltid gå att öppna, inte för att hålla någon ute, och hör inte hemma i den här jämförelsen.",
  },
];

/**
 * Speglar köpguiden: varje fråga guiden svarar på finns här, formulerad som
 * folk söker i stället för som vi skriver rubriker. Svaren står för sig själva,
 * eftersom FAQ-rutan kan visas ensam i ett sökresultat.
 */
export const NYCKELSKAP_FAQ = [
  {
    question: "Är nyckelskåp säkra?",
    answer:
      "Nej, inte mot någon som bestämt sig. När RISE provade fyra av dem åt Villaägarna forcerades alla fyra. Med kofot lossnade de från väggen på mellan 16 sekunder och 1 minut och 15, och det snabbaste angreppet av alla var åtta slag med en snickarhammare som öppnade ett skåp på nio sekunder. Ett nyckelskåp stoppar tillfällighetstjuven som drar i dörrhandtaget, ungefär som ett cykellås gör, och det är bättre än en nyckel under dörrmattan eftersom den platsen är den första någon letar på. Räkna med skyddet mot impuls, inte mot planerat inbrott, och lägg aldrig i nyckeln längre än du behöver.",
  },
  {
    question: "Var ska man sätta ett nyckelskåp?",
    answer:
      "Inte bredvid dörren det går till. Ett skåp intill ytterdörren talar om både att det finns en nyckel och vilken dörr den passar, och den som brutit loss skåpet står redan framför låset. Sätt det i stället runt hörnet, på en gavel eller vid ett uthus, gärna där det syns från gatan eftersom insyn är det billigaste inbrottsskyddet. Skruva i massivt trä, betong eller tegel och aldrig i tunn panel: i provningen var infästningen det som gav vika först på varenda skåp, och underlaget avgör lika mycket som skåpet. Sitter det under tak håller dessutom kodhjulen längre.",
  },
  {
    question: "Vad är skillnaden mellan nyckelskåp, säkerhetsskåp och värdeskåp?",
    answer:
      "Tre olika produkter som butikerna ibland lägger under samma rubrik. Ett nyckelskåp är boxen på väggen för 349 till 2 599 kronor som du lägger en nyckel i. Ett säkerhetsskåp enligt SSF 3492 är ett stålskåp som polisen kräver för vapenförvaring och som börjar runt 5 500 kronor. Ett värdeskåp enligt SS-EN 1143-1 är klassat i grader och styr hur mycket kontanter försäkringen ersätter, från 50 000 kronor och uppåt. Ser du SSF 3492 eller EN 1143-1 utsatt på en box för några hundralappar stämmer det inte: de klassade skåpen väger tiotals kilo och kostar tiotusentals kronor.",
  },
  {
    question: "Finns det säkerhetsklassade nyckelskåp?",
    answer:
      "Ja, men de är en annan sorts produkt. SSF 3492-klassade nyckelskåp finns i handeln från cirka 5 495 kronor och uppåt till över 100 000, och modellerna heter efter hur många nycklar de rymmer, från 42 till 2 400. De är byggda för fastighetsförvaltare, hemtjänst och företag som hanterar nyckelknippor i mängd. För dig som ska släppa in en städare i en villa finns alltså ingen klassad motsvarighet i rimlig storlek eller prisklass, och det är därför frågan inte är vilket skåp som är säkert utan vad du lägger i det och hur länge.",
  },
  {
    question: "Betalar försäkringen om tjuven tagit nyckeln ur nyckelskåpet?",
    answer:
      "Det avgörs av villkoret hos just ditt bolag och går inte att svara på generellt, så läs ditt eget villkor innan du sätter upp skåpet. Två saker är värda att veta i förväg. Många hemförsäkringar ställer krav på hur nycklar förvaras, och ett inbrott där tjuven låst upp med en nyckel lämnar inga brytskador, vilket gör händelsen svårare att styrka än ett krossat fönster. Fråga ditt bolag rakt ut om en nyckel i ett nyckelskåp på fasaden räknas som aktsam förvaring, och be att få svaret skriftligt.",
  },
  {
    question: "Mekanisk kod eller kodlås med app?",
    answer:
      "Mekaniska kodhjul har 10 000 kombinationer, behöver aldrig batteri och fungerar i trettio minusgrader, men alla som någon gång fått koden har den kvar tills du vrider om hjulen för hand. Ett elektroniskt lås kan ge varje person en egen kod som slutar gälla av sig själv och visa vem som öppnade när, vilket är hela skillnaden om du hyr ut. Priset är ett batteri som tar slut och en knappsats som är känsligare för kyla. Hyr du ut regelbundet är det elektroniska värt pengarna. Ska en granne kunna vattna blommorna två veckor om året är kodhjulen både billigare och pålitligare.",
  },
  {
    question: "Hur många nycklar rymmer ett nyckelskåp?",
    answer:
      "Mellan tre och tjugo i den här storleksklassen. ABUS KeyGarage 707 tar sju nycklar eller fyra passerkort, KeyGarage 787 tar 20 nycklar eller 14 kort, och gjutgodsskåpen från Top Safe ligger på tre, sex respektive åtta. Räkna med att en modern bilnyckel med fjärrkontroll tar mer plats än en vanlig cylindernyckel, och att en tjock nyckelknippa fyller ett litet skåp direkt. Har du bara en ytterdörrsnyckel att lägga in räcker det minsta skåpet, men mät gärna nyckeln mot skåpets innermått om den är av den klumpigare sorten.",
  },
  {
    question: "Får man sätta upp nyckelskåp i en bostadsrättsförening?",
    answer:
      "Fasaden och trapphuset är föreningens, inte din, så det kräver normalt styrelsens tillstånd. Fråga innan du borrar. Många föreningar säger ja när det gäller hemtjänst och nej när det gäller korttidsuthyrning, och en del har redan ett gemensamt system. Sitter skåpet i ett trapphus är det dessutom värt att tänka på att alla som kommer in i porten kommer åt det, vilket flyttar hela skyddet till koden.",
  },
  {
    question: "Kan man knäcka koden på ett nyckelskåp?",
    answer:
      "Fyra sifferhjul ger 10 000 kombinationer, vilket tar för lång tid att prova igenom för hand. I praktiken är det inte koden som är den svaga punkten utan skåpet runt den: i provningen bröts alla fyra upp mekaniskt och ingen behövde gissa någon kod. Det du däremot ska undvika är att någon får se koden, så vrid tillbaka hjulen direkt efter varje användning och sätt inte skåpet där en granne kan se knappsatsen från sitt fönster. Byt koden när en hantverkare eller hyresgäst haft den.",
  },
  {
    question: "Vad kostar ett bra nyckelskåp?",
    answer:
      "Räkna med 350 till 900 kronor för ett fullgott skåp. ABUS KeyGarage 787 kostar 490 kronor och är det billigaste som har ett eget resultat i en oberoende provning, vilket gör den till den enklaste rekommendationen. Under 350 kronor blir godset tunt, och över 1 500 kronor betalar du för delbara koder och app snarare än för mer motstånd. Det dyraste skåpet i vår jämförelse kostar 2 599 kronor och var det som öppnades snabbast av alla när angreppspunkten var en hammare, vilket är värt att ha i huvudet innan man tolkar pris som säkerhet.",
  },
  {
    question: "Är nyckelskåp bättre än att gömma nyckeln?",
    answer:
      "Ja, med marginal. Dörrmattan, blomkrukan och lampan över dörren är de tre första ställen någon letar på, och de kräver ingen utrustning alls. Ett nyckelskåp tvingar fram ett verktyg och tid, och tid är det som avgör om någon ger upp eller fortsätter. Det bästa alternativet är ändå att ingen nyckel ligger ute: har du redan ett kodlås på ytterdörren behöver du inget nyckelskåp, eftersom du kan ge bort en engångskod direkt till låset.",
  },
  {
    question: "Fungerar nyckelskåp på vintern?",
    answer:
      "Mekaniska kodhjul gör det så länge de inte har frusit fast, och det är väta som ställer till det snarare än kylan i sig. Ett lock över hjulen är den enkla lösningen: båda ABUS KeyGarage har ett skjutbart skyddslock, och Top Safes gömmor har ett gummihölje som träs över hela boxen. Elektroniska lås är känsligare, eftersom batterier tappar kapacitet i kyla. Master Lock Select Access Smart är byggd för svensk vinter och klarar drift ner till 40 minusgrader, och skulle batteriet ändå dö går det att brygga med ett 9-voltsbatteri utifrån. ABUS Smart-BT är stänkskyddad enligt IP 54 och hör hemma på ett skyddat ställe utomhus, alltså under tak eller på en vägg i lä.",
  },
];
