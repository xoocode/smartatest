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
 * Övriga fyra produkter bedöms på publicerad konstruktion och får aldrig ett
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
 * ## Väderskyddet är produktens egenskap, inte tillverkarens beteende
 *
 * Master Lock anger IP 55 och -40 till +50 °C i sitt produktblad. För övriga är
 * uppgiften okänd, och det kostar poäng på `vaderskydd` eftersom konsekvensen
 * bärs av köparen. Det förklaras en gång i viktningen och står aldrig i prosa,
 * i en för- och nackdel eller i ett omdöme som en anmärkning mot ett företag.
 * Se skillen `swedish-voice`, `references/who-you-are.md`.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "abus-keygarage-787",
    brand: "ABUS",
    name: "KeyGarage 787 med kombinationslås",
    shortName: "KeyGarage 787",
    image: productImage(NYCKELSKAP.slug, "abus-keygarage-787"),
    tagline: "Stod emot skruvmejsel i 3 minuter och 39 sekunder, och kostar 490 kronor.",
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
      /* Avsedd för skyddat läge utomhus. Ingen kapslingsklass går att
         fastställa och inget temperaturspann heller. */
      vaderskydd: 2.5,
      kod: 3,
      prisvarde: 4.5,
    },
    price: 490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Byggahus Shop",
    merchantUrl:
      "https://shop.byggahus.se/products/nyckelskap-keygarage-787-med-kombinationslas-abus",
    award: "winner",
    superlative: "Bäst i test",
    pros: [
      "Höll emot skruvmejsel och kniv längre än tidsramen i provningen",
      "Lucka i tryckgjuten zink, och skruvarna sitter innanför den",
      "Rymmer 20 nycklar eller 14 passerkort",
      "Fyrsiffrig kod som fungerar lika bra i februari som i juli",
    ],
    cons: [
      "Bakstycket lossnade från kroppen när skåpet bröts loss med kofot",
      "Hur mycket väder den tål är okänt, så den vill sitta under tak",
      "En enda kod för alla, så den som fått den kommer in tills du vrider om hjulen",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "490 kr", highlight: true },
      { label: "Infästning", value: "Väggmontering med skruvkoppling", highlight: true },
      { label: "Skruvar innanför luckan", value: "Ja", highlight: true },
      { label: "Material", value: "Metallhölje, lucka i tryckgjuten zink", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "4 mekaniska kodhjul", highlight: true },
      { label: "Kodlängd", value: "4 siffror" },
      { label: "Antal kombinationer", value: "10 000" },
      { label: "Nyckelbackup", value: "Nej" },
      { label: "Väderskydd", value: "Ej angiven" },
      { label: "Lock över koden", value: "Nej" },
      { label: "Nyckelkapacitet", value: "20 nycklar eller 14 kort" },
      { label: "Yttermått", value: "80 x 120 x 45 mm" },
      { label: "Vikt", value: "683 g" },
      { label: "App", value: "Nej" },
      { label: "Provad av RISE", value: "Ja, som ABUS 787 C" },
      { label: "Tid mot infästning", value: "35 s med kofot" },
      { label: "Tid mot lucka", value: "2 min 41 s vid låssidan" },
      { label: "GTIN", value: "4003318463310" },
    ],
    verdict:
      "ABUS KeyGarage 787 är det enda skåpet här som både har ett eget resultat i provningen och kostar under femhundra kronor. Mot skruvmejsel och kniv satt den kvar i 3 minuter och 39 sekunder, alltså längre än den effektiva angreppstid metoden ger, och luckan höll i 2 minuter och 41 sekunder vid låssidan. Det låter lite tills man jämför: det svagaste skåpet i provningen öppnades på 38 sekunder. Luckan är tryckgjuten zink och de fyra skruvarna sitter innanför den, så ingen skruvar loss skåpet utan att först komma in i det. Svagheten sitter i ryggen. När kofoten kom fram lossnade bakstycket från kroppen efter 35 sekunder, och då låg nycklarna framme utan att luckan behövde öppnas. Skruva därför alltid i massivt trä eller betong, aldrig i panel. Med plats för 20 nycklar och en kod som fungerar i minusgrader är det här skåpet att välja om du ska släppa in hantverkare, städare eller stuggäster och vill lägga pengarna på infästningen i stället för på appen.",
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
    superlative: "Bäst för uthyrning",
    pros: [
      "IP 55 och funktion från -40 °C till +50 °C",
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
      { label: "Infästning", value: "Väggmontering, skruvar medföljer", highlight: true },
      { label: "Skruvar innanför luckan", value: "Ja" },
      { label: "Material", value: "Zinkkropp med plastad baksida", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "Elektronisk knappsats", highlight: true },
      { label: "Kodlängd", value: "10 siffror" },
      { label: "Antal kombinationer", value: "Ej angiven" },
      { label: "Nyckelbackup", value: "Nej, huvudkod via appen" },
      { label: "Väderskydd", value: "IP 55, -40 till +50 °C", highlight: true },
      { label: "Lock över koden", value: "Nej, belyst knappsats" },
      { label: "Nyckelkapacitet", value: "Ej angiven" },
      { label: "Innermått", value: "89 x 64 x 44 mm" },
      { label: "Yttermått", value: "121 x 76 x 70 mm" },
      { label: "Vikt", value: "1,02 kg" },
      { label: "App", value: "Ja, Bluetooth" },
      { label: "Provad av RISE", value: "Ja, som Master Lock 5441" },
      { label: "Tid mot infästning", value: "16 s med kofot" },
      { label: "Tid mot lucka", value: "9 s med hammare" },
    ],
    verdict:
      "Master Lock Select Access Smart är skåpet för dig som hyr ut. Varje gäst får en egen kod som du kan låta sluta gälla när uthyrningen är slut, du ser i appen vem som öppnade och när, och du behöver aldrig träffa någon för att lämna över en nyckel. Det är också det enda skåpet här som talar om vad det tål: IP 55 och drift ner till 40 minusgrader, vilket betyder att det får sitta på en fasad i Jokkmokk och inte bara under ett skärmtak. Mot standardens verktyg är det dessutom det starkaste i provningen, och enda skåpet vars lucka inte gick att bryta upp vid låssidan alls. Sedan kommer siffran som avgör priset på hela kategorin: nio sekunder och åtta slag med en vanlig snickarhammare, och luckan stod öppen. En hammare ingår inte i provningsmetodens verktygslista, men den ligger i varje garage. Betala de 2 599 kronorna för koderna och för väderskyddet, som är verkliga fördelar du använder varje vecka. Betalar du dem för att skåpet ska stå emot ett inbrott har du köpt fel sak, och då gör ABUS KeyGarage 787 samma jobb för 490.",
  },
  {
    id: "top-safe-t7",
    brand: "Top Safe",
    name: "Nyckelgömma T7",
    image: productImage(NYCKELSKAP.slug, "top-safe-t7"),
    tagline: "Gjutgods och gummiskydd över koden, byggt för att sitta ute.",
    scores: {
      infastning: 2.5,
      luckalas: 2.5,
      /* Väderskydd i kraftigt gummi medföljer. Ett tillbehör som skyddar
         kodhjulen är inte en kapslingsklass, men det är mer än ingenting och
         mer än de två ABUS-skåpen har. */
      vaderskydd: 3,
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
      "Gummiskydd över kodhjulen följer med",
      "Mekanisk kod utan batteri, så den fungerar efter en vinter utan tillsyn",
      "Sex nycklar med magnetfäste, nog för stuga, förråd och bom",
    ],
    cons: [
      "Motståndet är oprövat, så du vet inte hur länge den håller",
      "Kapslingsklassen är okänd trots att gummiskyddet följer med",
      "125 kronor i frakt om du inte handlar mer samtidigt",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "695 kr", highlight: true },
      { label: "Infästning", value: "Väggmontage, skruvar medföljer", highlight: true },
      { label: "Skruvar innanför luckan", value: "Ej angiven" },
      { label: "Material", value: "Aluminiumgjutgods", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "4 mekaniska kodhjul", highlight: true },
      { label: "Kodlängd", value: "4 siffror" },
      { label: "Antal kombinationer", value: "10 000" },
      { label: "Nyckelbackup", value: "Nej" },
      { label: "Väderskydd", value: "Ej angiven" },
      { label: "Lock över koden", value: "Ja, gummiskydd medföljer" },
      { label: "Nyckelkapacitet", value: "6 nycklar" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "App", value: "Nej" },
      { label: "Provad av RISE", value: "Nej" },
    ],
    verdict:
      "Top Safe T7 är skåpet för sommarstugan, och det är gummiskyddet som avgör. Kodhjul som står ute ett år utan att röras kärvar av fukt och skit, och ett lock över dem är skillnaden mellan att koden går att vrida i april och att den inte gör det. Kroppen är aluminiumgjutgods, som beter sig annorlunda än tunn plåt under en kil, och sex nycklar med magnetfäste räcker till stuga, förråd, båt och vägbom på en gång. Låset är mekaniskt och behöver aldrig batteri, vilket betyder att skåpet fungerar likadant efter sex månader utan tillsyn som dagen du satte upp det. Det du inte får är ett känt motstånd: ingen har brutit upp den här modellen under kontrollerade former, så du köper konstruktionen och inte en mätning. Ska skåpet sitta framme dygnet runt vid en villa i stan är ABUS KeyGarage 787 en tryggare 490-kronorsaffär. Ska det sitta på en stugvägg i Roslagen och överleva vintern är T7 pengarna värd.",
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
      vaderskydd: 2.5,
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
      "Fyrsiffrig kod utan batteri",
      "Plats för fyra passerkort, vilket få skåp i storleken har",
    ],
    cons: [
      "Aluminiumhölje och mindre kropp än KeyGarage 787, för 141 kronor mindre",
      "Motståndet är oprövat",
      "Sju nycklar är taket, så den räcker inte till en förening eller ett företag",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "349 kr", highlight: true },
      { label: "Infästning", value: "Väggmontering, hål i bakstycket", highlight: true },
      { label: "Skruvar innanför luckan", value: "Ja" },
      { label: "Material", value: "Aluminiumhölje", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "4 mekaniska kodhjul", highlight: true },
      { label: "Kodlängd", value: "4 siffror" },
      { label: "Antal kombinationer", value: "10 000" },
      { label: "Nyckelbackup", value: "Nej" },
      { label: "Väderskydd", value: "Ej angiven" },
      { label: "Lock över koden", value: "Nej" },
      { label: "Nyckelkapacitet", value: "7 nycklar eller 4 kort" },
      { label: "Yttermått", value: "88 x 120 x 39 mm" },
      { label: "Vikt", value: "502 g" },
      { label: "App", value: "Nej" },
      { label: "Provad av RISE", value: "Nej" },
    ],
    verdict:
      "KeyGarage 707 är den billigaste vägen bort från nyckeln under dörrmattan, och för 349 kronor är det ett rimligt köp. Den är 502 gram och knappt nio centimeter bred, alltså liten nog att sitta bakom stupröret utan att annonsera var huset förvarar sin nyckel, och den tar fyra passerkort utöver nycklarna, vilket är ovanligt i storleken. Koden ställs med hjul och behöver inget batteri. Men den är mindre och byggd i aluminium där storasystern har lucka i tryckgjuten zink, och det är storasystern som har ett eget resultat i provningen. Mellanskillnaden är 141 kronor. Köp 707 om skåpet ska sitta i ett trapphus, i ett garage eller under tak och innehålla en nyckel till förrådet. Ska den ytterdörrsnyckel som går till hela huset ligga i den, lägg de 141 kronorna och ta KeyGarage 787 i stället.",
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
      vaderskydd: 2.5,
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
      "Gästen får en länk i mobilen i stället för en kod att komma ihåg",
      "Olika koder till olika personer, och de går att ta bort var för sig",
      "Sexsiffrig kod i stället för fyrsiffrig",
      "Samma nyckelkapacitet som den mekaniska 787:an",
    ],
    cons: [
      "1 899 kronor, nästan fyra gånger den mekaniska 787:an som provats",
      "Motståndet är oprövat, och den mekaniska modellens resultat gäller inte här",
      "Knappsats med batteri, som är det som slutar fungera först i kyla",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "1 899 kr", highlight: true },
      { label: "Infästning", value: "Väggmontering med skruvkoppling", highlight: true },
      { label: "Skruvar innanför luckan", value: "Ja" },
      { label: "Material", value: "Metallhölje", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "Elektronisk knappsats", highlight: true },
      { label: "Kodlängd", value: "6 siffror" },
      { label: "Antal kombinationer", value: "Ej angiven" },
      { label: "Nyckelbackup", value: "Nej" },
      { label: "Väderskydd", value: "Ej angiven" },
      { label: "Lock över koden", value: "Nej" },
      { label: "Nyckelkapacitet", value: "20 nycklar eller 14 kort" },
      { label: "App", value: "Ja, Bluetooth" },
      { label: "Provad av RISE", value: "Nej" },
    ],
    verdict:
      "Smart-BT löser ett problem som kodhjulen inte kan: gästen behöver aldrig få veta koden. Du skickar en länk i mobilen, den fungerar när du säger att den ska fungera, och när uthyrningen är slut tar du bort just den personen utan att röra någon annans access. Har du hantverkare, städfirma och gäster om vartannat är det en verklig lättnad jämfört med att vrida om fyra hjul mellan varje besök. Priset är det som är svårt att försvara. 1 899 kronor är nästan fyra gånger vad den mekaniska 787:an kostar, och det är den mekaniska som har ett eget resultat i provningen. Du betalar alltså mest för den modell vi vet minst om. Vill du ha delbara koder och kan tänka dig att lägga ytterligare 700 kronor får du IP 55 och ett känt temperaturspann på köpet med Master Lock Select Access Smart. Räcker det med en kod du byter någon gång om året är den mekaniska 787:an samma skåp för 490.",
  },
  {
    id: "top-safe-t26",
    brand: "Top Safe",
    name: "Nyckelgömma T26",
    image: productImage(NYCKELSKAP.slug, "top-safe-t26"),
    tagline: "Åtta nycklar i gjutgods, för huset där flera ska in.",
    scores: {
      infastning: 2.5,
      luckalas: 2.5,
      vaderskydd: 3,
      kod: 3,
      prisvarde: 2.5,
    },
    price: 895,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "E-safe",
    merchantUrl: "https://esafe.se/products/nyckelgomma-t26",
    superlative: "Bäst för många nycklar",
    pros: [
      "Åtta nycklar, flest av gjutgodsskåpen här",
      "Gummiskydd över kodhjulen följer med",
      "Mekanisk kod utan batteri",
    ],
    cons: [
      "200 kronor dyrare än T7 för två nycklar till",
      "Motståndet är oprövat",
      "Kapslingsklassen är okänd",
    ],
    specs: [
      { label: "Pris", shortLabel: "Pris", value: "895 kr", highlight: true },
      { label: "Infästning", value: "Väggmontage, skruvar medföljer", highlight: true },
      { label: "Skruvar innanför luckan", value: "Ej angiven" },
      { label: "Material", value: "Aluminiumgjutgods", highlight: true },
      { label: "Låstyp", shortLabel: "Lås", value: "4 mekaniska kodhjul", highlight: true },
      { label: "Kodlängd", value: "4 siffror" },
      { label: "Antal kombinationer", value: "10 000" },
      { label: "Nyckelbackup", value: "Nej" },
      { label: "Väderskydd", value: "Ej angiven" },
      { label: "Lock över koden", value: "Ja, gummiskydd medföljer" },
      { label: "Nyckelkapacitet", value: "8 nycklar" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "App", value: "Nej" },
      { label: "Provad av RISE", value: "Nej" },
    ],
    verdict:
      "T26 är samma skåp som T7 med plats för åtta nycklar i stället för sex, och det avgör om den är värd 200 kronor extra. Är du flera i en samfällighet som delar bom, sjöbod och förrådsdörr fylls sex platser fortare än man tror, och då är två till en riktig skillnad. Är det ett hus med en ytterdörr och en förrådsdörr är de tomma. Gummiskyddet över kodhjulen är samma som på T7 och gör samma nytta: mekaniken kärvar av väta och locket är det som håller den gångbar över en vinter. Motståndet är oprövat även här. Räkna nycklarna du faktiskt ska lägga i skåpet innan du väljer mellan de två, och landa du på fyra eller fem tar du T7 och sparar pengarna.",
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
      "Mekaniska kodhjul gör det så länge de inte har frusit fast, och det är väta som ställer till det snarare än kylan i sig. Ett lock eller gummiskydd över hjulen, som följer med Top Safes gömmor, är den enkla lösningen. Elektroniska lås är känsligare: batterier tappar kapacitet i kyla, och det är därför Master Lock Select Access Smart både anger drift ner till 40 minusgrader och går att brygga med ett 9-voltsbatteri utifrån om batteriet dött. För övriga skåp i jämförelsen är det okänt hur kalla de tål att bli.",
  },
];
