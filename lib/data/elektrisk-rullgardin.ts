import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { ELEKTRISK_RULLGARDIN } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /elektrisk-rullgardin.
 *
 * Priser, produktnamn, GTIN och butiks-URL:er är lästa ur butikernas egen
 * JSON-LD på PRICE_CHECKED, och URL:erna nedan är de kanoniska efter
 * omdirigering.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans ännu, enligt beslut: vi
 * ansöker inte till något Adtraction-program förrän minst 16 sidor finns.
 * Se lib/links.ts.
 *
 * ## Urvalet är åtta produkter, inte fem per monteringstyp
 *
 * Sidan rankar efter upphängning, eftersom det är upphängningen och inte
 * märket som avgör vad du kan köpa. Utbudet i svensk handel är ojämnt och det
 * ska synas i stället för att fyllas ut:
 *
 * - U-skena: 2 produkter
 * - Gardinstång: 2 produkter
 * - Rullgardin: 3 produkter
 * - Persienn: **1 produkt**
 *
 * Att det bara finns ett enda eftermonterat alternativ för persienner i Sverige
 * är ett resultat, inte en lucka. Att fylla ut listan med Fruugo- och
 * eBay-annonser hade gjort sidan sämre och osann.
 *
 * ## ⚠️ Priset är butikens, inte marknadens lägsta
 *
 * Inet är billigast på tre produkter: SwitchBot Curtain 3 för 890 kr mot
 * Proshops 1 049, Blind Tilt för 645 mot 819, och Aqara Curtain Driver E1 för
 * 799 mot Kjells 890. **Inet finns inte i något affiliatenätverk vi kan gå med
 * i.** Ingen träff bland Adtractions 481 svenska program, och inget spår av
 * Awin eller TradeDoubler. Efter beslut 2026-08-01 länkar vi till butiker som
 * betalar, alltså Kjell, Proshop och iPhonebutiken.
 *
 * Följden är att `prisvarde` räknas på det högre priset, alltså att butiksvalet
 * drar ner produktens eget betyg. Det är den ärliga varianten: läsaren ska
 * betala exakt det pris som står i tabellen. Alternativet, att visa Inets pris
 * och länka till Proshop, vore att ljuga om vad klicket leder till.
 *
 * Spridningen är dessutom skev åt Proshop, och det beror på utbudet snarare än
 * på val: Kjell har bara SwitchBot i andra generationen och den är slut, så
 * Proshop är enda butiken som både lagerför SwitchBot och betalar oss.
 *
 * ## Ljudnivå: tre publicerade tal, två verkliga luckor
 *
 * Omarbetat 2026-08-06 efter ett gap-pass mot tillverkarnas egna
 * specifikationssidor. Läget var inte det vi hade skrivit:
 *
 * - SwitchBot Curtain 3: 25 dB i QuietDrift. Normalläget anges till **42 dB på
 *   us.switch-bot.com och 45 dB på switch-bot.com**, alltså två tal från samma
 *   tillverkare. Vi tar 45, dels för att den internationella sidan är den som
 *   betjänar vår marknad, dels för att det är det försiktiga talet.
 * - SwitchBot Roller Shade: 30 dB i tyst läge.
 * - SwitchBot Blind Tilt: **40 dB**, publicerat på switch-bot.com. Sidan
 *   påstod fram till 2026-08-06 att ingen siffra fanns, och betyget var satt på
 *   recensenternas intryck. Det var fel, och det är därför betyget ändrats.
 * - Aqara: ingen siffra på produktsidan, på /specs/ eller i manualen för någon
 *   av de tre modellerna. Specifikationen anger 0,2 N·m och 12 cm/s och stannar
 *   där. Kontrollerat 2026-08-06.
 * - Nedis: ingen siffra i databladet, i säkerhetsmanualen eller i den utökade
 *   manualen på cdn.nedis.com. Kontrollerat 2026-08-06.
 *
 * Aqaras betyg vilar på testarnas samstämmiga omdöme, som är ett riktigt
 * underlag: Everything Smart Home hör att skenmotorn låter mer än SwitchBot,
 * SmartHomeScene och HomeKit News hör att kedjemotorn är tyst. Nedis har varken
 * tal eller test och saknar därför `ljudniva` helt. Vi hittar inte på en siffra,
 * och vi gissar inte heller ett betyg.
 *
 * ## I-skenefrågan är avgjord, och Kjell hade rätt
 *
 * Fram till 2026-08-06 stod här att Kjell och flera engelskspråkiga
 * jämförelser sa emot varandra om huruvida Aqaras skenversion passar I-skena,
 * och att vi inte kunnat avgöra vem som hade rätt.
 *
 * Svaret stod i Aqaras egen manual, sidan 3, som ingen öppnat: "The Smart
 * Curtain Driver E1 (Track Version) be used on U-rails and I-rails", med kravet
 * att I-skenans underkant ska vara slät och bredare än 10 mm. Kjell hade rätt,
 * jämförelserna fel, och `mounts` innehåller nu "i-skena". Det gör produkten
 * till den enda i rankningen som får sitta på en I-skena.
 * Manual: cdn.aqara.com/cdn/website/mainland/static/docs/
 * Curtain-Driver-E1-(Track%20Version)_User%20Manual.pdf
 */

export const PRICE_CHECKED = "2026-08-03";

const SEEDS: ProductSeed[] = [
  {
    id: "switchbot-curtain-3-u",
    brand: "SwitchBot",
    name: "Curtain 3, U-skena",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "switchbot-curtain-3-u"),
    tagline: "Går ner till 25 dB, så gardinen kan öppnas medan du sover.",
    scores: {
      /* Klämmer fast utan verktyg, och magneten som märker ut stoppläget tar
         bort den manuella kalibreringen föregående generation krävde. Drar ner:
         artikeln passar bara U-skena. */
      passform: 4,
      /* 25 dB i QuietDrift mot 45 dB i normalläge, tillverkarens egen uppgift.
         Lägsta publicerade talet i kategorin. Se filhuvudet om 42 mot 45. */
      ljudniva: 5,
      /* 16 kg, mest av alla i jämförelsen. */
      dragkraft: 5,
      /* Bluetooth 5.0. Fungerar utan hubb i rummet, men fjärrstyrning,
         obegränsade scheman och Matter kräver SwitchBot-hubb. */
      ekosystem: 3.5,
      /* TechHive testar just tredje generationen och landar i att den "gets it
         right". Trusted Reviews lyfter det tysta läget. SmartHomeScene kör den
         lokalt via Home Assistant. Bäst underlag i kategorin. */
      testomdome: 4.5,
      batteri: 4.5,
      /* 1 049 kr hos Proshop. Samma vara kostar 890 hos Inet, som inte betalar
         oss. Se filhuvudet. */
      prisvarde: 3,
    },
    price: 1049,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/SwitchBot-Curtain-U-Rail-3/3460310",
    award: "winner",
    superlative: "Bäst för U-skena",
    pros: [
      "Går ner till 25 dB i tyst läge, lägst av motorerna här",
      "Orkar 16 kg gardin, mest av alla",
      "Öppnar gardinen från telefonen utan att du köpt en hubb först",
    ],
    cons: [
      "Passar bara U-skena, till stång och I-skena är det andra artiklar som gäller",
      "Hubb krävs för att styra den hemifrån, och solpanelen kostar extra",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "U-skena", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "25 dB tyst, 45 dB normal", highlight: true },
      { label: "Batteritid", shortLabel: "Batteri", value: "Cirka 8 månader", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "16 kg", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth 5.0", highlight: true },
      { label: "Hubb", value: "Bara för fjärrstyrning", highlight: true },
      { label: "Matter", value: "Via SwitchBot-hubb", highlight: true },
      { label: "Batterikapacitet", value: "3 350 mAh" },
      { label: "Laddning", value: "USB-C, solpanel som tillbehör" },
    ],
    verdict:
      "SwitchBot Curtain 3 är gardinmotorn för U-skena, och för 1 049 kronor den dyraste av skenmotorerna här.\n\nI QuietDrift-läget går den på 25 dB mot 45 i normalläge, och eftersom en gardinmotor står i sovrummet och drar för gardinen i gryningen är det skillnaden mellan att sova vidare och att vakna av den. **16 kg dragkraft räcker till mörkläggningsgardiner i tungt tyg, mest av alla här.** Och den gör något direkt ur kartongen: står du i rummet med telefonen öppnas gardinen utan att du köpt en hubb först, vilket Aqara inte klarar.\n\nSka du styra den hemifrån jobbet eller lägga den på ett schema behöver du ändå SwitchBots hubb, och solpanelen som gör laddningen underhållsfri kostar extra.\n\nHar du U-skena är det här motorn du ska köpa. Hänger gardinen i ringar på ett runt rör är det Curtain Rod 3 som gäller, samma motor och samma pris hos samma butik.",
  },
  {
    id: "switchbot-curtain-3-rod",
    brand: "SwitchBot",
    name: "Curtain Rod 3, gardinstång",
    shortName: "Curtain Rod 3",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "switchbot-curtain-3-rod"),
    tagline: "Testvinnarens tysta motor, byggd för att klättra längs ett runt rör.",
    scores: {
      /* Samma konstruktion som U-skenevarianten, en monteringstyp. */
      passform: 4,
      ljudniva: 5,
      /* 15 kg för stångvarianten mot 16 för skenvarianten, tillverkarens
         egen uppgift. */
      dragkraft: 4.5,
      ekosystem: 3.5,
      /* Testerna gäller Curtain 3 som produkt, och TechHive testar uttryckligen
         stångvarianten. Samma underlag som U-skenevarianten. */
      testomdome: 4.5,
      batteri: 4.5,
      prisvarde: 3,
    },
    price: 1049,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/SwitchBot-Curtain-Rod-3/3460309",
    superlative: "Bäst för gardinstång",
    pros: [
      "Samma tysta läge på 25 dB som testvinnaren",
      "Klarar 15 kg, mest av stångalternativen",
      "Magneten märker ut stoppläget, så du slipper kalibrera om",
    ],
    cons: [
      "Kostar lika mycket som skenversionen trots ett kilo mindre dragkraft",
      "Bluetooth, så hubb krävs för att styra den utifrån",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Gardinstång", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "25 dB tyst, 45 dB normal", highlight: true },
      { label: "Batteritid", shortLabel: "Batteri", value: "Cirka 8 månader", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "15 kg", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth 5.0", highlight: true },
      { label: "Hubb", value: "Bara för fjärrstyrning", highlight: true },
      { label: "Matter", value: "Via SwitchBot-hubb", highlight: true },
      { label: "Batterikapacitet", value: "3 350 mAh" },
      { label: "Laddning", value: "USB-C, solpanel som tillbehör" },
    ],
    verdict:
      "Curtain Rod 3 är testvinnarens motor i ett chassi som greppar om ett runt rör, till samma 1 049 kronor.\n\nDet tysta läget på 25 dB följer med, och det är hela skälet att betala mer än Aqara begär: en gardinstång sitter oftast i sovrummet, och en gardin som öppnas halv fem i juni ska inte höras. **Magneten som märker ut stoppläget gör att den hittar rätt igen även när någon dragit gardinen för hand.** 15 kg räcker till de flesta tunga tyger.\n\nEtt kilo mindre dragkraft än skenversionen till exakt samma pris är svårt att försvara.\n\nHänger gardinen i ringar eller öglor på en stång och du vill kunna sova genom att den öppnas: köp den här. Har du redan en Aqara-hubb hemma sparar du 135 kronor på Aqaras stångvariant och betalar med ljudet.",
  },
  {
    id: "switchbot-roller-shade",
    brand: "SwitchBot",
    name: "Roller Shade, komplett rullgardin",
    shortName: "Roller Shade",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "switchbot-roller-shade"),
    tagline:
      "Motorn sitter i rullen, så du hänger upp en färdig smart rullgardin.",
    scores: {
      /* Ersätter hela rullgardinen, så ingen befintlig upphängning behöver
         passa. Fyra bredder från 58 till 185 cm täcker de flesta fönster, men
         du måste mäta rätt och tyget går att byta separat. */
      passform: 4,
      /* 30 dB i tyst läge, tillverkarens egen uppgift. Näst bästa publicerade
         värdet efter Curtain 3. */
      ljudniva: 4.5,
      /* Motorn sitter i den egna rullen och slipper friktionen från någon
         annans mekanism, vilket är hela poängen med en komplett gardin. */
      dragkraft: 4,
      ekosystem: 3.5,
      /* Rättat 2026-08-06. SmartHomeScenes test gäller "SwitchBot Adjustable
         Roller Shades", en annan produkt, och det var skälet till att betyget
         utelämnades. Men The Ambient (David Ludlow, 2025-08-01) har testat just
         Roller Shade: "versatile and smooth in operation", med invändningarna
         pillig montering och två färger. Ett test, blandat positivt, ger 3,5.
         Vi matchar på modell och inte på varumärke, se lärdomen från Nanoleaf
         Lines och TP-Link LB120 i lib/data/smart-belysning.ts. */
      testomdome: 3.5,
      /* 2 600 mAh i två 18650-celler, upp till 8 månader. SwitchBots eget
         testvillkor: 25 °C, 1,85 m höjd, 4 kg gardin, en gång om dagen. */
      batteri: 4,
      /* 2 075 kr för storlek L. Dyrast i jämförelsen med marginal, men det är
         också den enda som är en hel gardin. */
      prisvarde: 2,
    },
    price: 2075,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/SwitchBot-Roller-Shade-Grey-L/3460299",
    award: "premium",
    superlative: "Ersättaren till IKEA FYRTUR",
    pros: [
      "Hel gardin med motorn inbyggd, inget att klämma fast",
      "30 dB i tyst läge, näst lägst här",
      "Tyget går att byta separat utan att motorn slängs",
    ],
    cons: [
      "Dubbla priset mot en eftermonterad motor",
      "Du måste mäta fönstret rätt, gardinen finns i fyra bredder",
      "Vit och grå är de enda färgerna",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Ersätter rullgardinen", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "30 dB tyst läge", highlight: true },
      { label: "Batteritid", shortLabel: "Batteri", value: "Upp till 8 månader", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "Egen gardin, ej relevant", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth", highlight: true },
      { label: "Hubb", value: "Bara för fjärrstyrning", highlight: true },
      { label: "Matter", value: "Via SwitchBot Hub 2", highlight: true },
      { label: "Bredder", shortLabel: "Bredd", value: "58–185 cm i fyra storlekar" },
      { label: "Batterikapacitet", value: "2 600 mAh, två 18650-celler" },
      { label: "Laddning", value: "USB-C, solpanel som tillbehör" },
    ],
    verdict:
      "SwitchBot Roller Shade är en färdig motoriserad rullgardin med motorn inbyggd i rullen, och för 2 075 kronor den dyraste produkten här.\n\n**Den är den enda i handeln som gör det IKEA slutade göra hösten 2025:** en smart rullgardin du hänger upp själv, utan måttbeställning och montör. Motorn slipper kämpa mot någon annans mekanism, vilket ger 30 dB i tyst läge och åtta månader mellan laddningarna. Tyget går att byta separat, så en solblekt duk om några år betyder inte en ny motor. David Ludlow på The Ambient beskriver den som mjuk och pålitlig i drift.\n\nMonteringen är det pilliga. Gardinen finns i fyra bredder mellan 58 och 185 cm, du måste mäta fönstret först, och färgerna är vit och grå.\n\nSka du ändå byta ut rullgardinen är det här köpet. Är du nöjd med den du har sparar du 1 476 kronor på Aqaras kedjemotor och slipper mäta.",
  },
  {
    id: "switchbot-blind-tilt",
    brand: "SwitchBot",
    name: "Blind Tilt",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "switchbot-blind-tilt"),
    tagline:
      "Vinklar lamellerna efter dagsljuset, och solpanelen ligger i kartongen.",
    scores: {
      /* Passar bara vågräta persienner, och testerna är tydliga med att man
         måste kontrollera sin egen persienntyp först. Smal men välgjord. */
      passform: 3,
      /* Rättat 2026-08-06 från 4,0. SwitchBot publicerar 40 dB för just den
         här på switch-bot.com, vilket sidan tidigare påstod att de inte gjorde.
         Betyget var satt på recensenternas intryck och låg för högt: på samma
         skala ger 25 dB 5,0 och 30 dB 4,5, alltså hamnar 40 dB på 3,5. */
      ljudniva: 3.5,
      /* Vinklar lameller, hissar inte persiennen. Lättare arbete, men
         kriteriet mäter last och då hamnar den under gardinmotorerna. */
      dragkraft: 3,
      ekosystem: 3.5,
      /* Bäst bevakade produkten i kategorin: TechRadar, TechHive och
         SmartHomeScene har alla testat den, och de är eniga. */
      testomdome: 4.5,
      /* 2 000 mAh, omkring 10 månader, och solpanel i förpackningen snarare än
         som tillbehör. Med solpanelen behöver den i praktiken aldrig laddas. */
      batteri: 5,
      prisvarde: 4,
    },
    price: 819,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/SwitchBot-Blind-Tilt/3210072",
    award: "editor",
    superlative: "Bäst för persienner",
    pros: [
      "Solpanel ingår, så batteriet sköter sig i praktiken självt",
      "Ljussensor som kan vinkla efter dagsljuset automatiskt",
      "Ställer lamellerna med två graders precision",
    ],
    cons: [
      "Vinklar bara lamellerna, hissar inte upp persiennen",
      "Passar långt ifrån alla persienner, kontrollera din innan du köper",
      "40 dB, alltså hörbart mer än gardinmotorernas tysta läge",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Vågrät persienn", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "40 dB", highlight: true },
      { label: "Batteritid", shortLabel: "Batteri", value: "Cirka 10 månader, solpanel ingår", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "Vinklar lameller, ej relevant", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth", highlight: true },
      { label: "Hubb", value: "Bara för fjärrstyrning", highlight: true },
      { label: "Matter", value: "Via SwitchBot Hub 2", highlight: true },
      { label: "Batterikapacitet", value: "2 000 mAh" },
      { label: "Precision", value: "2 grader" },
      { label: "Vikt", value: "130 g" },
    ],
    verdict:
      "SwitchBot Blind Tilt vinklar lamellerna på persiennen du redan har och kostar 819 kronor. Den är det enda eftermonterade alternativet för persienner som säljs här.\n\n**Solpanelen ligger i kartongen och inte i tillbehörshyllan**, så till skillnad från Curtain 3 laddar du den aldrig för hand: 2 000 mAh räcker omkring tio månader även utan sol. Ljussensorn vinklar lamellerna efter dagsljuset utan att du rör telefonen, och två graders precision gör att du kan släppa in ljus utan att släppa in insyn.\n\nMotorn ligger på 40 dB, alltså hörbart mer än de 25 en gardinmotor klarar i tyst läge. Ska den vinkla lamellerna i ett sovrum vid gryningen är det ljudet du ska väga.\n\nVill du slippa vrida persiennen för hand finns det ingen konkurrent att väga den mot. Kontrollera bara din persienn mot tillverkarens lista innan du beställer, för det är den punkt varje testare återkommer till.",
  },
  {
    id: "aqara-curtain-driver-e1-track",
    brand: "Aqara",
    name: "Curtain Driver E1, U- och I-skena",
    shortName: "Curtain Driver E1, skena",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "aqara-curtain-driver-e1-track"),
    tagline: "Den enda som får sitta på en I-skena, och den håller ett år.",
    userRating: { value: 4.5, count: 11, checkedAt: PRICE_CHECKED },
    scores: {
      /* Höjt från 4,0 2026-08-06. Aqaras egen manual, sidan 3, tillåter både
         U-skena och I-skena för den här artikeln, med kravet att I-skenans
         underkant är slät och bredare än 10 mm. Det gör den till den enda i
         rankningen som täcker två upphängningar, mot SwitchBots enskena-artikel
         på 4,0. Se filhuvudet: konflikten som stod här förut är avgjord. */
      passform: 4.5,
      /* Everything Smart Home jämför direkt mot SwitchBot och ljudet är den
         enda punkt där Aqara beskrivs som klart sämre. Betyget vilar på
         testarnas samstämmiga omdöme; Aqara publicerar inget tal, vilket vi
         inte drar av för. Se filhuvudet. */
      ljudniva: 2.5,
      dragkraft: 3.5,
      /* Zigbee 3.0 ger stabilare nät än Bluetooth, men produkten kräver en
         Aqara-hubb för att fungera alls. Extra kostnad och extra beroende som
         SwitchBot inte har för lokal styrning. */
      ekosystem: 3,
      /* Android Police: "smart but expensive". Everything Smart Home positiv
         med invändning mot ljudet. Teknikveckan beskriver men betygsätter
         inte. Två riktiga tester, inget svenskt betyg. */
      testomdome: 3.5,
      /* 6 400 mAh och upp till ett år enligt Kjell. Klassens bästa. Aqaras egen
         specifikation anger 0,2 N·m, 12 cm/s och 7,5 W men ingen batteritid. */
      batteri: 5,
      prisvarde: 3.5,
    },
    price: 890,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smart-gardinkontroll/aqara-curtain-driver-e1-gardinkontroll-for-u-och-i-skena-p51986",
    superlative: "Enda för I-skena",
    pros: [
      "Får sitta på både U-skena och I-skena, ensam om det här",
      "Upp till ett år på en laddning, dubbelt så länge som SwitchBot",
      "Zigbee bygger eget nät och belastar inte wifi",
    ],
    cons: [
      "Kräver en Aqara-hubb för att fungera, den ingår inte",
      "Låter mer än SwitchBot, enligt alla som ställt dem bredvid varandra",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "U- och I-skena", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "–", highlight: true },
      { label: "Batteritid", shortLabel: "Batteri", value: "Upp till 1 år", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "12 kg", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee 3.0", highlight: true },
      { label: "Hubb", value: "Krävs", highlight: true },
      { label: "Matter", value: "Via Aqara-hubb", highlight: true },
      { label: "Batterikapacitet", value: "6 400 mAh" },
      { label: "Hastighet", value: "12 cm/s" },
      { label: "Vridmoment", value: "0,2 N·m" },
    ],
    verdict:
      "Aqara Curtain Driver E1 kostar 890 kronor och är den enda motorn här som får sitta på både U-skena och I-skena.\n\n**Har du I-skena är valet redan gjort**, så länge skenans underkant är slät och bredare än 10 mm. Batteriet på 6 400 mAh räcker upp till ett år mot SwitchBots åtta månader, alltså en laddning om året för något som ofta sitter tre meter upp. Zigbee bygger dessutom ett eget nät och tar ingen plats bland allt annat som trängs på wifi.\n\nUtan en Aqara-hubb gör den ingenting alls, och den ingår inte. Räkna in den innan du jämför priset med SwitchBot, som åtminstone öppnar gardinen när du står i rummet.\n\nTill I-skena är det den här eller ingen. Till U-skena köper du SwitchBot Curtain 3, som för 159 kronor mer låter mindre och rör gardinen utan att du köpt något annat först.",
  },
  {
    id: "aqara-curtain-driver-e1-rod",
    brand: "Aqara",
    name: "Curtain Driver E1, gardinstång",
    shortName: "Curtain Driver E1, stång",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "aqara-curtain-driver-e1-rod"),
    tagline: "Billigaste vägen till en motoriserad gardinstång, och ett år mellan laddningarna.",
    scores: {
      /* En enda monteringstyp, mot skenversionens två. Samma mekanik i övrigt:
         0,2 N·m och 12 cm/s enligt Aqaras egen specifikation. */
      passform: 3.5,
      ljudniva: 2.5,
      dragkraft: 3.5,
      ekosystem: 3,
      /* Samma produktfamilj och samma tester som skenversionen. Android Police
         och Everything Smart Home behandlar E1 som en produkt. */
      testomdome: 3.5,
      batteri: 5,
      /* 914 kr, alltså 135 kr under SwitchBots stångvariant. */
      prisvarde: 3.5,
    },
    price: 914,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Aqara-Curtain-Driver-E1-Rod-Version/3081417",
    superlative: "Billigast för Aqara-hem",
    pros: [
      "135 kr billigare än SwitchBots stångvariant",
      "Upp till ett år mellan laddningarna",
      "Zigbee, alltså ingen belastning på wifi-nätet",
    ],
    cons: [
      "Aqara-hubb krävs, och den ingår inte",
      "Låter mer än SwitchBot, vilket märks om stången sitter i ett sovrum",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Gardinstång", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "–", highlight: true },
      { label: "Batteritid", shortLabel: "Batteri", value: "Upp till 1 år", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "12 kg", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee 3.0", highlight: true },
      { label: "Hubb", value: "Krävs", highlight: true },
      { label: "Matter", value: "Via Aqara-hubb", highlight: true },
      { label: "Batterikapacitet", value: "6 400 mAh" },
      { label: "Hastighet", value: "12 cm/s" },
      { label: "Vridmoment", value: "0,2 N·m" },
    ],
    verdict:
      "Aqara Curtain Driver E1 i stångversion kostar 914 kronor och är den billigaste vägen till en motoriserad gardinstång.\n\nEtt år mellan laddningarna är dubbelt mot SwitchBot, och sitter stången högt eller bakom en soffa är det skillnaden mellan en gång om året och tre gånger på två år med stegen framme. Zigbee tar heller ingen plats på wifi-nätet, vilket märks först den dag du har tjugo saker uppkopplade.\n\n**De 135 kronorna äter en Aqara-hubb upp direkt** om du inte redan har en, och utan hubb rör sig gardinen inte alls.\n\nKöp den bara om Aqara-hubben redan står hemma. Utan den blir SwitchBots Curtain Rod 3 billigare totalt, tystare, och igång samma kväll.",
  },
  {
    id: "aqara-roller-shade-e1",
    brand: "Aqara",
    name: "Roller Shade Driver E1",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "aqara-roller-shade-e1"),
    tagline:
      "Drar i kedjan du redan har, för en fjärdedel av vad en ny motoriserad gardin kostar.",
    userRating: { value: 4.5, count: 64, checkedAt: PRICE_CHECKED },
    scores: {
      /* Fyra adaptrar och stöd för både metall- och plastkedja, vilket täcker
         det mesta som hänger i ett svenskt fönster. */
      passform: 4,
      /* Höjt från 3,0 2026-08-06. Det gamla betyget var satt på mekanismen,
         alltså en ren gissning, och gissningen var fel åt fel håll: två av
         varandra oberoende testare beskriver den som tyst. SmartHomeScene
         skriver "operates very quietly", HomeKit News "a LOT quieter" än
         föregångaren och "fairly quiet motor". Ingen dB-siffra finns, därav
         4,0 och inte högre. */
      ljudniva: 4,
      /* Aqara publicerar varken maxvikt eller maxstorlek, kontrollerat mot
         produktsidan, /specs/ och manualen 2026-08-06. Kjell skriver att den
         fungerar med de flesta rullgardiner på marknaden. */
      dragkraft: 3.5,
      ekosystem: 3,
      /* Rättat 2026-08-06. Betyget utelämnades med motiveringen att ingen
         oberoende part testat produkten. Det var fel: SmartHomeScene, HomeKit
         News, iMore, nextpit, MightyGadget och Ausdroid har alla publicerat
         test av just Roller Shade Driver E1. HomeKit News sätter 8,5 till 9,5
         av 10 på sina delbetyg och lyfter tystnaden och priset; invändningen
         som återkommer är att den är långsam. Fler test än någon Aqara-modell
         här, men inget svenskt eller nordiskt betyg, alltså 4,0. */
      testomdome: 4,
      /* Två månader för en rullgardin på 1,8 × 1,8 m som körs en gång om dagen.
         Aqaras egen uppgift på /specs/, inte bara Kjells. Sämsta värdet här med
         stor marginal: Aqaras egen gardinmotor klarar ett år. */
      batteri: 1.5,
      /* 4,0 sedan priset föll från 749 till 599 kronor vid omkontrollen
         2026-08-03. Den var billigast redan innan och drar nu ifrån: Nedis
         gör samma jobb för 979. Två månaders batteritid håller den från
         högre. */
      prisvarde: 4,
    },
    price: 599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smart-gardinkontroll/aqara-roller-shade-driver-e1-gardinkontroll-p51850",
    award: "budget",
    superlative: "Billigast i jämförelsen",
    pros: [
      "Lägsta priset av alla åtta",
      "Fyra adaptrar täcker både metall- och plastkedja",
      "Behåller rullgardinen du redan har, och följer med vid flytt",
    ],
    cons: [
      "Två månaders batteritid, alltså sex laddningar om året",
      "Kräver en Aqara-hubb, och den ingår inte",
      "Långsam, vilket är den invändning testarna återkommer till",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Rullgardin med kedja", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "–", highlight: true },
      { label: "Batteritid", shortLabel: "Batteri", value: "Cirka 2 månader", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "–", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee 3.0", highlight: true },
      { label: "Hubb", value: "Krävs", highlight: true },
      { label: "Matter", value: "Via Aqara-hubb", highlight: true },
      { label: "Adaptrar", value: "4 st, metall- och plastkedja" },
      { label: "Mått", value: "165 × 42 × 37 mm" },
    ],
    verdict:
      "Aqara Roller Shade Driver E1 hakar i kedjan på rullgardinen du redan har och kostar 599 kronor, lägsta priset här.\n\nSedan IKEA tog bort FYRTUR, TREDANSEN och PRAKTLYSING ur sortimentet är det här den billigaste vägen till en rullgardin som går upp av sig själv, och den kostar en fjärdedel av en komplett motoriserad gardin. Fyra adaptrar följer med, så både metall- och plastkedja fungerar, och gardinen följer med dig vid en flytt. **De som testat den är eniga om att den är tyst**: SmartHomeScene skriver att den arbetar mycket tyst, HomeKit News att motorn är betydligt tystare än föregångarens.\n\nBatteriet är problemet. Två månader för en rullgardin på 1,8 × 1,8 meter som körs en gång om dagen betyder sex laddningar om året, och sitter gardinen högt är det sex gånger du ska upp med stegen.\n\nHar du en rullgardin med kedja och kommer åt den lätt: köp den här och lägg mellanskillnaden på Aqara-hubben du behöver. Sitter den svåråtkomligt betalar du hellre för SwitchBot Roller Shade, som håller åtta månader.",
  },
  {
    id: "nedis-smartlife-rullgardin",
    brand: "Nedis",
    name: "SmartLife rullgardinsmotor",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "nedis-smartlife-rullgardin"),
    tagline:
      "Enda motorn här som också tar panelgardiner och romerska gardiner.",
    scores: {
      /* Bredast av rullgardinsmotorerna: klarar panelgardiner, romerska
         gardiner och rullgardiner enligt Nedis eget datablad. */
      passform: 3.5,
      /* `ljudniva` utelämnas sedan 2026-08-06. Betyget låg på 2,5 satt "på
         mekanismen", alltså en gissning. Det finns varken en dB-siffra i
         databladet, säkerhetsmanualen eller den utökade manualen, eller ett
         enda oberoende test som lyssnat på den. Vi sätter hellre ingenting än
         ett gissat betyg, och weightedRating fördelar om vikten. */
      dragkraft: 3,
      /* Bluetooth och SmartLife, alltså Tuya-plattformen, vilket kräver
         molnkonto. Inget Matter-stöd angivet. Svagast i jämförelsen. */
      ekosystem: 2.5,
      /* testomdome utelämnas: inget oberoende test hittat, på något språk. */
      /* 2 000 mAh med solpanel, alltså bättre än Aqaras kedjemotor men klart
         under gardinmotorerna. */
      batteri: 3.5,
      /* 979 kr mot Aqaras 599 för i praktiken samma jobb, alltså 63 procent
         mer. Dyrast per funktion av alla eftermonterade motorer. Att den till
         skillnad från Aqara inte kräver en hubb tar igen en del av det, och är
         skälet till 2,0 och inte 1,5. */
      prisvarde: 2,
    },
    price: 979,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/nedis-smartlife-bluetooth-motorized-roller-blinds-53792.html",
    superlative: "Klarar även panel- och romangardin",
    pros: [
      "Klarar panelgardiner och romerska gardiner, inte bara rullgardin",
      "Solpanel ingår, och den laddas också via USB-C",
      "Kräver ingen hubb, ansluter direkt via Bluetooth",
    ],
    cons: [
      "380 kr dyrare än Aqara för samma jobb på en vanlig rullgardin",
      "SmartLife bygger på Tuya och kräver molnkonto, utan Matter-stöd",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Rullgardin, panel, romangardin", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "–", highlight: true },
      { label: "Batteritid", shortLabel: "Batteri", value: "–", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "–", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth", highlight: true },
      { label: "Hubb", value: "Behövs inte", highlight: true },
      { label: "Matter", value: "Nej", highlight: true },
      { label: "Batterikapacitet", value: "2 000 mAh" },
      { label: "Laddning", value: "USB-C, solpanel ingår" },
      { label: "Vikt", value: "372 g" },
      { label: "App", value: "Nedis SmartLife, bygger på Tuya" },
    ],
    verdict:
      "Nedis SmartLife är den enda kedjemotorn här som inte kommer från Aqara, och den enda som också klarar panelgardiner och romerska gardiner. Den kostar 979 kronor.\n\n**Har du en panelgardin eller en romersk gardin är den ensam om att lösa problemet.** Den behöver dessutom ingen hubb: Bluetooth räcker hela vägen från telefonen, vilket gör den till den billigaste starten för den som inte äger något smart hem sedan tidigare. Solpanelen ligger i kartongen.\n\nPå en vanlig rullgardin är priset svårt att försvara. Aqara gör samma jobb för 599 kronor, alltså 380 kronor mindre, och SmartLife bygger på Tuya med molnkonto utan att ge dig Matter.\n\nTill en panelgardin eller en romersk gardin finns inget annat val. Till en vanlig rullgardin med kedja tar du Aqara Roller Shade Driver E1 och lägger mellanskillnaden på hubben den kräver.",
  },
];

export const ELEKTRISK_RULLGARDIN_PRODUCTS = resolveProducts(ELEKTRISK_RULLGARDIN, SEEDS);

/**
 * Vad produkten kan flytta och var den går att sätta fast.
 *
 * Eget typat fält i stället för att tolka `specs`-strängar. Att leta efter
 * "U-skena" i en fritextsträng går sönder i samma stund någon skriver
 * "U-profil", och både monteringsväljaren och filtret över jämförelsetabellen
 * läser det här. De ska aldrig gissa.
 */
export type CurtainCapability = {
  id: string;
  /** Vad som hänger i fönstret. Avgör vilken fråga produkten svarar på. */
  window: "gardin" | "rullgardin" | "persienn";
  /** Monteringar produkten faktiskt passar. */
  mounts: ("stang" | "u-skena" | "i-skena" | "kedja" | "lamell" | "ersatter")[];
  /** Tillverkarens egen dB-uppgift, utelämnad när ingen anges. */
  quietDb?: number;
};

export const ELEKTRISK_RULLGARDIN_CAPABILITIES: CurtainCapability[] = [
  { id: "switchbot-curtain-3-u", window: "gardin", mounts: ["u-skena"], quietDb: 25 },
  { id: "switchbot-curtain-3-rod", window: "gardin", mounts: ["stang"], quietDb: 25 },
  {
    /* "i-skena" tillagd 2026-08-06. Stod tidigare som enbart "u-skena" därför
       att Kjell och flera engelskspråkiga jämförelser sa emot varandra. Aqaras
       egen manual, sidan 3, tillåter båda: "The Smart Curtain Driver E1 (Track
       Version) be used on U-rails and I-rails", med kravet att I-skenan är slät
       och bredare än 10 mm. Det gör den till enda produkten i rankningen som
       svarar på I-skena, och därför fick filtret en egen grupp. */
    id: "aqara-curtain-driver-e1-track",
    window: "gardin",
    mounts: ["u-skena", "i-skena"],
  },
  { id: "aqara-curtain-driver-e1-rod", window: "gardin", mounts: ["stang"] },
  { id: "aqara-roller-shade-e1", window: "rullgardin", mounts: ["kedja"] },
  { id: "nedis-smartlife-rullgardin", window: "rullgardin", mounts: ["kedja"] },
  {
    /* "ersatter" och inte "kedja": den byter ut hela rullgardinen i stället för
       att haka i den befintliga kedjan. Filtret ska visa den för den som frågar
       efter rullgardin, men den löser problemet på ett annat sätt. */
    id: "switchbot-roller-shade",
    window: "rullgardin",
    mounts: ["ersatter"],
    quietDb: 30,
  },
  { id: "switchbot-blind-tilt", window: "persienn", mounts: ["lamell"], quietDb: 40 },
];

/**
 * Grupperna filtret över jämförelsetabellen erbjuder.
 *
 * Härledda ur capabilities i stället för handskrivna, så att en produkt aldrig
 * kan hamna i fel grupp eller falla ur alla när någon redigerar listan ovan.
 */
export const ELEKTRISK_RULLGARDIN_FILTERS = [
  {
    key: "u-skena",
    label: "U-skena",
    ids: ELEKTRISK_RULLGARDIN_CAPABILITIES.filter((c) =>
      c.mounts.includes("u-skena"),
    ).map((c) => c.id),
  },
  {
    /* Egen grupp sedan 2026-08-06, när Aqaras manual visade sig tillåta
       I-skena. En träff, precis som persienn, och det är ett svar: den som har
       I-skena har ett alternativ och ska slippa gissa vilket. */
    key: "i-skena",
    label: "I-skena",
    ids: ELEKTRISK_RULLGARDIN_CAPABILITIES.filter((c) =>
      c.mounts.includes("i-skena"),
    ).map((c) => c.id),
  },
  {
    key: "stang",
    label: "Gardinstång",
    ids: ELEKTRISK_RULLGARDIN_CAPABILITIES.filter((c) =>
      c.mounts.includes("stang"),
    ).map((c) => c.id),
  },
  {
    key: "rullgardin",
    label: "Rullgardin",
    ids: ELEKTRISK_RULLGARDIN_CAPABILITIES.filter(
      (c) => c.window === "rullgardin",
    ).map((c) => c.id),
  },
  {
    key: "persienn",
    label: "Persienn",
    ids: ELEKTRISK_RULLGARDIN_CAPABILITIES.filter(
      (c) => c.window === "persienn",
    ).map((c) => c.id),
  },
];

/**
 * Tittade på, valde bort. Varje skäl går att kontrollera mot produktsidan.
 */
export const ELEKTRISK_RULLGARDIN_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Aqara",
    name: "Smart Roller Shade Controller",
    approxPrice: 866,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Aqara-Smart-Roller-Shade-Controller/2932467",
    reason:
      "Ser ut som en billigare syskonprodukt till Roller Shade Driver E1 men är något helt annat: en motor som byggs in i rullgardinens rör och drivs av 230 volt, 121 W. Den kräver alltså fast installation och elektriker, och hör hemma i avsnittet om 230 V-moduler i stället för i en jämförelse med batteridrivna motorer.",
  },
  {
    brand: "SwitchBot",
    name: "Curtain, andra generationen",
    approxPrice: 849,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smart-gardinkontroll/switchbot-curtain-gardinkontroll-u-skena-vit-p51816",
    reason:
      "Föregående generation. Tredje generationen har mer än dubbelt så stark motor och det tysta läget, som är hela skälet att välja SwitchBot. Att spara 200 kr på den gamla är inte värt det.",
  },
  {
    brand: "Aqara",
    name: "Shutter Switch H2 EU",
    approxPrice: 659,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smart-gardinkontroll/aqara-shutter-switch-h2-eu-for-rullgardiner-och-persienner-p56577",
    reason:
      "Styr en motor du redan har i stället för att vara en motor. Kräver alltså både en befintlig 230 V-motor och elektriker, och tas upp i avsnittet om 230 V-moduler längre ner.",
  },
  {
    brand: "Plejd",
    name: "Jalusi Controller JAL-01",
    approxPrice: 399,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smart-gardinkontroll/plejd-jalusi-controller-jal-01-230-v-p52340",
    reason:
      "Billigast av allt i kategorin, och det är missvisande. Den är en 230 V-modul som styr en befintlig markis-, persienn- eller rullgardinsmotor, alltså varken en motor eller något du får installera själv. Svensk tillverkare och rätt val om du redan har motoriserat, men inte jämförbar med en klämrobot för 819 kr.",
  },
  {
    brand: "Somfy",
    name: "Motoriserade gardinskenor",
    merchant: "Somfy",
    merchantUrl: "https://www.somfy.se/produkter/gardiner",
    reason:
      "Proffssystemet i kategorin, med måttbeställd skena och montör. En annan produkt och en annan budget: här byter du hela upphängningen i stället för att sätta en motor på den du har. Rätt val om du ändå bygger om, fel jämförelseobjekt för den som vill göra befintliga gardiner smarta.",
  },
  {
    brand: "IKEA",
    name: "FYRTUR, TREDANSEN och PRAKTLYSING",
    merchant: "IKEA",
    merchantUrl: "https://www.ikea.com/se/sv/cat/elektriska-rullgardiner-44531/",
    reason:
      "Går inte att köpa. IKEA skriver själva att TREDANSEN och PRAKTLYSING utgått under hösten 2025, och FYRTUR-sidan leder numera vidare till vanliga mörkläggande rullgardiner. Kategorisidan finns kvar med säljtexten intakt men utan en enda produkt i sig. Se avsnittet högre upp på sidan.",
  },
];

/**
 * Speglar köpguiden: varje fråga guiden svarar på finns här, formulerad som
 * folk söker snarare än som vi sätter rubriker.
 *
 * Dubbleringen är avsiktlig. Guiden är för den som läser uppifrån och ner,
 * det här är för den som kom med en enda fråga, och för FAQPage-markeringen
 * som kan visa ett enskilt svar direkt i sökresultatet. Svaren är därför
 * fristående och förutsätter inte att man läst något annat.
 */
export const ELEKTRISK_RULLGARDIN_FAQ = [
  {
    question: "Kan jag fortfarande köpa IKEA FYRTUR?",
    answer:
      "Nej. IKEA skriver själva att TREDANSEN och PRAKTLYSING inom Home Smart utgick ur sortimentet under hösten 2025, och när vi kontrollerade leder både FYRTUR-sidan och TREDANSEN-sidan vidare till vanliga rullgardiner utan motor. IKEA:s kategorisida för elektriska rullgardiner finns kvar med säljtexten kvar men innehåller inte en enda produkt. Vill du ha en färdig motoriserad rullgardin är SwitchBot Roller Shade det närmaste som säljs i dag, och vill du behålla gardinen du har finns motorer som drar i kedjan i stället.",
  },
  {
    question: "Vad är skillnaden mellan U-skena, I-skena och gardinstång?",
    answer:
      "Titta uppåt. En gardinstång är ett runt rör där gardinen hänger i ringar eller öglor. En skena är en profil i tak eller vägg där gardinen löper i glidare inuti. Är profilen öppen nedåt som ett upp och nedvänt U är det U-skena, och är den formad som ett I med spår på båda sidor är det I-skena. Det spelar roll för att motorerna säljs som olika artikelnummer per typ, och köper du fel går produkten inte att montera alls. Ett undantag finns: Aqara Curtain Driver E1 i skenversion får sitta på båda skentyperna, så länge I-skenans underkant är slät och bredare än 10 millimeter.",
  },
  {
    question: "Hur mycket låter en gardinmotor?",
      answer:
      "Spannet går från 25 till 45 decibel, alltså från en viskning till ett tyst kontorsrum. SwitchBot Curtain 3 går ner till 25 decibel i sitt QuietDrift-läge och ligger på 45 i normalläge, Roller Shade på 30 i tyst läge och Blind Tilt på 40. Aqaras motorer beskrivs av alla som ställt dem bredvid SwitchBot som hörbart högre, medan deras kedjemotor för rullgardin tvärtom beskrivs som tyst av testarna. Eftersom en gardinmotor oftast sitter i ett sovrum och går på morgonen är skillnaden värd att ta på allvar: 25 decibel väcker ingen, 45 väcker en lättsövd.",
  },
  {
    question: "Behöver jag en hubb för att styra gardinerna?",
    answer:
      "För att styra dem hemifrån soffan, inte alltid. För att styra dem när du inte är hemma, ja. SwitchBot kör Bluetooth och fungerar utan hubb så länge du är inom räckhåll, men fjärrstyrning, obegränsade scheman och Matter kräver en SwitchBot-hubb. Aqara kör Zigbee och kräver en Aqara-hubb för att fungera över huvud taget, så där ska hubben räknas in i priset från början. Det är den enskilt vanligaste överraskningen i kategorin.",
  },
  {
    question: "Hur tung gardin klarar en gardinmotor?",
    answer:
      "SwitchBot uppger 16 kilo för sin U-skenevariant och 15 kilo för stångvarianten, Aqara 12 kilo för Curtain Driver E1. I praktiken är det sällan vikten som stoppar en motor utan friktionen: en skena som går trögt, glidare som kärvar eller en gardin som fastnar i fönsterbrädan tar mer kraft än tyget väger. Dra gardinen för hand först. Känns det trögt för dig blir det trögt för motorn.",
  },
  {
    question: "Hur ofta måste jag ladda en gardinmotor?",
    answer:
      "Från två månader till ett år, vilket är den största spridningen på någon punkt här. Aqara Curtain Driver E1 klarar upp till ett år, SwitchBot Blind Tilt omkring tio månader, Curtain 3 och Roller Shade omkring åtta, och Aqara Roller Shade Driver E1 bara två månader för en rullgardin på knappt två gånger två meter. Solpanel ändrar bilden helt: den ligger i kartongen till Blind Tilt och Nedis SmartLife, och säljs som tillbehör till Curtain 3 och Roller Shade.",
  },
  {
    question: "Kan jag göra min persienn smart?",
    answer:
      "Ja, men bara vinklingen, och det finns i praktiken ett alternativ i Sverige. SwitchBot Blind Tilt sätts på persiennens befintliga vridmekanism och vrider lamellerna med två graders precision, med en ljussensor som kan följa solen. Den hissar däremot inte upp persiennen, och det är den vanligaste missuppfattningen om produkten. Kontrollera din persienntyp mot tillverkarens kompatibilitetslista innan du beställer, för det är den punkt alla testare återkommer till.",
  },
  {
    question: "Lönar det sig att göra gardinerna smarta?",
    answer:
      "I sovrummet ofta, i resten av hemmet sällan. Poängen är att gardinen ska röra sig när du inte är där för att dra i den: gå upp med gryningen så att du vaknar av ljus, gå ner när solen ligger på under dagen, eller röra sig medan du är bortrest. Det finns inget att spara på det, till skillnad från smarta uttag. I ett rum där du ändå står bredvid gardinen varje gång du drar den är en motor för runt tusenlappen svår att motivera, och de flesta som är nöjda började med ett fönster och byggde ut därifrån.",
  },
  {
    question: "Fungerar gardinmotorerna med Google, Alexa och HomeKit?",
    answer:
      "Ja, men via hubb i samtliga fall i den här jämförelsen. SwitchBot når Google, Alexa och Siri via en SwitchBot-hubb, och HomeKit via Matter med Hub 2. Aqara når samma system via en Aqara-hubb. Nedis SmartLife når Google och Alexa men saknar Matter helt. Ingen av produkterna talar Matter direkt ur kartongen, vilket betyder att du binder dig till tillverkarens hubb oavsett vilken du väljer.",
  },
  {
    question: "Kan gardinmotorn väcka mig med morgonljus?",
    answer:
      "Ja, och det är den vanligaste anledningen folk faktiskt köper en. Samtliga motorer i jämförelsen kan schemaläggas, och de som når en hubb kan dessutom kopplas till soluppgången i stället för till en klockslag, vilket spelar roll i Sverige där den flyttar sig flera timmar mellan december och juni. Två saker avgör om det blir bra. Ljudnivån, eftersom en motor som låter 45 decibel väcker dig på sitt sätt och inte på ljusets. Och hur mörk gardinen är: en mörkläggningsväv som åker upp ger en skarp förändring, en tunn rullgardin ger nästan ingen alls. Vill du ha den mjuka varianten ska du köra motorn i två steg, halvvägs först, vilket alla appar i jämförelsen klarar.",
  },
  {
    question: "Vad händer med gardinmotorn vid strömavbrott?",
    answer:
      "Ingenting, eftersom samtliga i den här jämförelsen går på batteri. Det är en av kategorins verkliga fördelar mot fast installerade motorer: gardinen fungerar även när elen är borta, och du kan alltid dra den för hand. Däremot slutar automatiken fungera så fort routern eller hubben är strömlös, alltså scheman, appstyrning och röstkommandon. Har du solpanel på motorn, som Nedis SmartLife, laddar den ändå så länge det är dagsljus. Kontrollera också hur motorn beter sig när batteriet tar slut mitt i ett läge: de flesta stannar där de är, vilket kan betyda en gardin som står halvvägs tills du laddat.",
  },
];
