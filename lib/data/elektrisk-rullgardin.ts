import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { ELEKTRISK_RULLGARDIN } from "@/lib/categories";
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
 * ## ⚠️ Ljudnivå: en tillverkare anger, de andra inte
 *
 * SwitchBot publicerar 25 dB i QuietDrift och 42 dB i normalläge för Curtain 3,
 * och 30 dB i tyst läge för Roller Shade. Aqara publicerar ingen siffra alls,
 * varken hos Kjell eller i sin egen specifikation, som bara anger 0,2 N·m och
 * 12 cm/s. Nedis anger heller ingenting. Betygen på `ljudniva` för Aqara och
 * Nedis bygger därför på recensenternas intryck respektive på mekanismen, inte
 * på mätningar. Det står i kommentaren vid varje betyg. Vi hittar inte på en
 * siffra åt en tillverkare som valt att inte ange någon.
 *
 * ## ⚠️ Motstridig uppgift om Aqara och I-skena
 *
 * Kjell säljer skenversionen som "Gardinkontroll för U- och I-skena". Flera
 * engelskspråkiga jämförelser skriver tvärtom att den inte passar I-skena. Vi
 * har inte kunnat avgöra vem som har rätt och säger det rakt ut i texten i
 * stället för att välja sida. Monteringsväljaren räknar den som U-skena, alltså
 * det försiktiga alternativet.
 *
 * ## ⚠️ FORTFARANDE INTE PUBLICERBAR
 *
 * Kriteriebetygen nedan är redaktionell bedömning utifrån källorna i
 * lib/sources.ts, inte mätningar. Priser rör sig, så
 * kontrollen ska köras om före lansering.
 */

export const PRICE_CHECKED = "2026-08-01";

const SEEDS: ProductSeed[] = [
  {
    id: "switchbot-curtain-3-u",
    brand: "SwitchBot",
    name: "Curtain 3, U-skena",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "switchbot-curtain-3-u"),
    tagline:
      "Tystast, starkast och den enda som gör något alls utan hubb. Dyrast också.",
    scores: {
      /* Klämmer fast utan verktyg, och magneten som märker ut stoppläget tar
         bort den manuella kalibreringen föregående generation krävde. Drar ner:
         artikeln passar bara U-skena. */
      passform: 4,
      /* 25 dB i QuietDrift mot 42 dB i normalläge, tillverkarens egen uppgift.
         Bara SwitchBot anger en siffra över huvud taget i kategorin. */
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
    superlative: "Bäst i test",
    pros: [
      "Går ner till 25 dB i tyst läge, tystast i jämförelsen",
      "Orkar 16 kg gardin, mest av alla",
      "Fungerar utan hubb så länge du står i rummet",
    ],
    cons: [
      "Passar bara U-skena, till stång och I-skena finns en annan modell hos samma butik",
      "Hubb krävs för att styra den hemifrån, och solpanelen kostar extra",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "U-skena", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "25 dB tyst, 42 dB normal", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "16 kg", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth 5.0" },
      { label: "Batteri", value: "3 350 mAh, cirka 8 månader" },
      { label: "Laddning", value: "USB-C, solpanel som tillbehör" },
      { label: "Matter", value: "Via SwitchBot-hubb" },
    ],
    verdict:
      "Den här vinner på det som faktiskt stör i vardagen. En gardinmotor står i ett sovrum och går i gryningen, och 25 dB mot 42 är skillnaden mellan att sova vidare och att vakna. SwitchBot är dessutom ensam i hela jämförelsen om att publicera en ljudsiffra. Lägg till 16 kg dragkraft, som räcker till mörkläggningsgardiner i tjockt tyg, och att den fungerar utan hubb om du bara vill trycka i appen hemma. En sak att veta innan du klickar: den vi rankar är U-skenemodellen, så har du gardinstång är det Curtain Rod 3 du ska ha i stället. Den finns hos samma butik och kostar lika mycket.",
  },
  {
    id: "switchbot-curtain-3-rod",
    brand: "SwitchBot",
    name: "Curtain Rod 3, gardinstång",
    shortName: "Curtain Rod 3",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "switchbot-curtain-3-rod"),
    tagline: "Samma motor och samma tysta läge, men för dig som har stång.",
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
      "Magneten märker ut stoppläget, ingen manuell kalibrering",
    ],
    cons: [
      "Kostar lika mycket som skenversionen trots ett kilo mindre dragkraft",
      "Bluetooth, så hubb krävs för att styra den utifrån",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Gardinstång", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "25 dB tyst, 42 dB normal", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "15 kg", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth 5.0" },
      { label: "Batteri", value: "3 350 mAh, cirka 8 månader" },
      { label: "Laddning", value: "USB-C, solpanel som tillbehör" },
      { label: "Matter", value: "Via SwitchBot-hubb" },
    ],
    verdict:
      "Har gardinen ringar eller öglor som löper på ett runt rör är det den här varianten som gäller, och den är i allt väsentligt samma produkt som testvinnaren. Motorn, det tysta läget och magneten som märker ut stoppläget är identiska. Skillnaden är ett kilo mindre dragkraft, 15 mot 16, vilket i praktiken inte märks förrän gardinen är riktigt tung. Att den kostar exakt lika mycket som skenversionen är svårare att försvara, men alternativen för stång är få: Aqaras stångvariant är 135 kr billigare och betydligt högljuddare.",
  },
  {
    id: "switchbot-roller-shade",
    brand: "SwitchBot",
    name: "Roller Shade, komplett rullgardin",
    shortName: "Roller Shade",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "switchbot-roller-shade"),
    tagline:
      "Hel motoriserad rullgardin, inte en motor. Det närmaste en FYRTUR-ersättare som finns.",
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
      /* testomdome utelämnas. SmartHomeScene har testat "SwitchBot Adjustable
         Roller Shades", vilket är en annan produkt än Roller Shade. Vi matchar
         på modell och inte på varumärke, se lärdomen från Nanoleaf Lines och
         TP-Link LB120 i lib/data/smart-belysning.ts. */
      batteri: 4,
      /* 2 095 kr för storlek L. Dyrast i jämförelsen med marginal, men det är
         också den enda som är en hel gardin. */
      prisvarde: 2,
    },
    price: 2095,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/SwitchBot-Roller-Shade-Grey-L/3460299",
    award: "premium",
    superlative: "Ersättaren till IKEA FYRTUR",
    pros: [
      "Hel gardin med motorn inbyggd, inget att klämma fast",
      "30 dB i tyst läge, tillverkarens egen uppgift",
      "Tyget går att byta separat utan att motorn slängs",
    ],
    cons: [
      "Dubbla priset mot en eftermonterad motor",
      "Du måste mäta fönstret rätt, gardinen finns i fyra bredder",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Ersätter rullgardinen", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "30 dB tyst läge", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "Egen gardin, ej relevant" },
      { label: "Bredder", shortLabel: "Bredd", value: "58–185 cm i fyra storlekar", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth" },
      { label: "Batteri", value: "Upp till 8 månader" },
      { label: "Matter", value: "Via SwitchBot Hub 2" },
    ],
    verdict:
      "Det här är inte en motor du sätter på din gardin, det är en hel motoriserad rullgardin. Alltså precis den produkt IKEA slutade sälja hösten 2025, och den enda i handeln som fyller det tomrummet utan att du behöver beställa måttsytt med montör. Fördelen mot en eftermonterad motor är att motorn sitter i rullen och slipper kämpa mot någon annans mekanism, vilket både låter mindre och sliter mindre. Priset är den uppenbara invändningen: 2 095 kr mot 749 för Aqaras kedjemotor. Två saker att kontrollera innan du beställer. Gardinen finns i fyra bredder mellan 58 och 185 cm, så mät fönstret. Och priset följer inte storleken som man tror, för när vi kontrollerade kostade den lilla storleken mer än den stora.",
  },
  {
    id: "switchbot-blind-tilt",
    brand: "SwitchBot",
    name: "Blind Tilt",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "switchbot-blind-tilt"),
    tagline:
      "Enda eftermonterade alternativet för persienner i Sverige, och lyckligtvis en bra produkt.",
    scores: {
      /* Passar bara vågräta persienner, och testerna är tydliga med att man
         måste kontrollera sin egen persienntyp först. Smal men välgjord. */
      passform: 3,
      /* SwitchBot anger ingen dB för just den här. Recensenterna beskriver den
         genomgående som tyst, och motorn gör ett lättare jobb än en som drar
         en hel gardin. Betyget är intryck, inte mätning. */
      ljudniva: 4,
      /* Vinklar lameller, hissar inte persiennen. Lättare arbete, men
         kriteriet mäter last och då hamnar den under gardinmotorerna. */
      dragkraft: 3,
      ekosystem: 3.5,
      /* Bäst bevakade produkten i kategorin: TechRadar, TechHive och
         SmartHomeScene har alla testat den, och de är eniga. */
      testomdome: 4.5,
      /* 2 000 mAh och solpanel i förpackningen, inte som tillbehör. */
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
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Vågrät persienn", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Anges inte av tillverkaren", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "Vinklar lameller, ej relevant" },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth", highlight: true },
      { label: "Batteri", value: "2 000 mAh, solpanel ingår" },
      { label: "Precision", value: "2 grader" },
      { label: "Matter", value: "Via SwitchBot Hub 2" },
    ],
    verdict:
      "Har du persienner i stället för gardiner är det här inte bara det bästa valet, det är i praktiken det enda eftermonterade som säljs i Sverige. Lyckligtvis är det också en bra produkt. Solpanelen ligger i kartongen i stället för att säljas separat, vilket gör att den till skillnad från Curtain 3 aldrig behöver laddas för hand, och ljussensorn kan vinkla lamellerna efter solen utan att du gör något. Missförstå inte vad den gör: den vinklar lamellerna, den hissar inte upp persiennen. Vill du ha upp persiennen helt löser den här produkten inte det. Kontrollera din persienn mot tillverkarens lista innan du beställer, för kompatibiliteten är den punkt alla testare återkommer till.",
  },
  {
    id: "aqara-curtain-driver-e1-track",
    brand: "Aqara",
    name: "Curtain Driver E1, U- och I-skena",
    shortName: "Curtain Driver E1, skena",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "aqara-curtain-driver-e1-track"),
    tagline: "Ett år på en laddning och Zigbee i stället för Bluetooth. Men den hörs.",
    userRating: { value: 4.5, count: 11, checkedAt: PRICE_CHECKED },
    scores: {
      /* Kjell säljer den som en artikel för både U- och I-skena, alltså bredare
         än SwitchBots enskena-artikel. Motstridiga uppgifter om I-skena finns,
         se filhuvudet, och betyget är satt utan att ta ställning. */
      passform: 4,
      /* Ingen publicerad siffra, varken hos Kjell eller i Aqaras egen
         specifikation. Everything Smart Home jämför direkt mot SwitchBot och
         ljudet är den enda punkt där Aqara beskrivs som klart sämre. Betyget
         är recensenternas samstämmiga intryck, inte en mätning. */
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
      /* 6 400 mAh och upp till ett år enligt Kjell. Klassens bästa. */
      batteri: 5,
      prisvarde: 3.5,
    },
    price: 890,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smart-gardinkontroll/aqara-curtain-driver-e1-gardinkontroll-for-u-och-i-skena-p51986",
    superlative: "Längst batteritid",
    pros: [
      "Upp till ett år på en laddning, dubbelt så länge som SwitchBot",
      "Zigbee bygger eget nät i stället för att belasta wifi",
      "En artikel täcker både U- och I-skena enligt Kjell",
    ],
    cons: [
      "Kräver en Aqara-hubb för att fungera, den ingår inte",
      "Tillverkaren anger ingen ljudnivå, och testarna tycker den låter",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "U- och I-skena", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Anges inte av tillverkaren", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "12 kg", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee 3.0" },
      { label: "Batteri", value: "6 400 mAh, upp till 1 år" },
      { label: "Hubb", value: "Aqara-hubb krävs" },
      { label: "Matter", value: "Via Aqara-hubb" },
    ],
    verdict:
      "Batteritiden är ingen marginell fördel. Ett år mot åtta månader betyder att du laddar den en gång om året i stället för att fundera på det varje vinter, och Zigbee gör att den inte tar plats på wifi-nätet. Har du redan en Aqara-hubb hemma är det här ett självklart köp. Har du ingen ska du räkna in den i priset, för utan hubb gör produkten ingenting alls, och det är en verklig skillnad mot SwitchBot som åtminstone fungerar i rummet på egen hand. Sedan är det ljudet. Aqara anger ingen siffra, vilket i sig säger något när konkurrenten skyltar med sina 25 dB, och de som jämfört dem sida vid sida är eniga om vilken som hörs mest.",
  },
  {
    id: "aqara-curtain-driver-e1-rod",
    brand: "Aqara",
    name: "Curtain Driver E1, gardinstång",
    shortName: "Curtain Driver E1, stång",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "aqara-curtain-driver-e1-rod"),
    tagline: "Billigaste vägen till en motoriserad gardinstång. Du hör när den går.",
    scores: {
      /* En monteringstyp, till skillnad från skenversionen som Kjell säljer
         som två i en. Samma mekanik i övrigt. */
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
    superlative: "Billigast för gardinstång",
    pros: [
      "135 kr billigare än SwitchBots stångvariant",
      "Upp till ett år mellan laddningarna",
      "Zigbee, alltså ingen belastning på wifi-nätet",
    ],
    cons: [
      "Aqara-hubb krävs, och den ingår inte",
      "Ingen ljuduppgift, och testarna tycker den låter mer än SwitchBot",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Gardinstång", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Anges inte av tillverkaren", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "12 kg", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee 3.0" },
      { label: "Batteri", value: "6 400 mAh, upp till 1 år" },
      { label: "Hubb", value: "Aqara-hubb krävs" },
      { label: "Matter", value: "Via Aqara-hubb" },
    ],
    verdict:
      "Stångversionen av samma motor, och den billigaste vägen till en motoriserad gardinstång i den här jämförelsen. Räkna dock hela kalkylen innan du väljer den framför SwitchBot: 135 kr sparade äts snabbt upp av att du måste köpa en Aqara-hubb om du inte redan har en, medan SwitchBot fungerar i rummet utan. Har du däremot redan Aqara hemma är det tvärtom, för då ansluter den direkt till det du har och håller ett år på laddningen. Ljudet är samma invändning som för skenversionen och gäller särskilt om stången sitter i ett sovrum.",
  },
  {
    id: "aqara-roller-shade-e1",
    brand: "Aqara",
    name: "Roller Shade Driver E1",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "aqara-roller-shade-e1"),
    tagline:
      "Billigast i jämförelsen och drar i kedjan du redan har. Batteriet räcker två månader.",
    userRating: { value: 4.5, count: 64, checkedAt: PRICE_CHECKED },
    scores: {
      /* Fyra adaptrar och stöd för både metall- och plastkedja, vilket täcker
         det mesta som hänger i ett svenskt fönster. */
      passform: 4,
      /* Ingen publicerad siffra och inget publicerat test. Betyget är satt på
         mekanismen, alltså en kedjedrift som hörs, och ska läsas som osäkert. */
      ljudniva: 3,
      /* Aqara publicerar varken maxvikt eller maxstorlek. Kjell skriver att den
         fungerar med de flesta rullgardiner på marknaden. */
      dragkraft: 3.5,
      ekosystem: 3,
      /* testomdome utelämnas: ingen oberoende part har publicerat ett test av
         den här produkten. weightedRating fördelar om vikten och sidan skriver
         "Ej testat". */
      /* Två månader för en rullgardin på 1,8 × 1,8 m som körs en gång om dagen,
         Kjells egen uppgift. Sämsta värdet i jämförelsen med stor marginal:
         Aqaras egen gardinmotor klarar ett år. */
      batteri: 1.5,
      prisvarde: 3.5,
    },
    price: 749,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smart-gardinkontroll/aqara-roller-shade-driver-e1-gardinkontroll-p51850",
    award: "budget",
    superlative: "Billigast i jämförelsen",
    pros: [
      "Lägsta priset av alla åtta",
      "Fyra adaptrar täcker både metall- och plastkedja",
      "Gör rullgardinen du redan har smart i stället för att byta den",
    ],
    cons: [
      "Två månaders batteritid, alltså sex laddningar om året",
      "Kräver Aqara-hubb, och ingen oberoende part har testat den",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Rullgardin med kedja", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Anges inte av tillverkaren", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "Anges inte av tillverkaren", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee 3.0" },
      { label: "Batteri", value: "Cirka 2 månader" },
      { label: "Adaptrar", value: "4 st, metall- och plastkedja" },
      { label: "Hubb", value: "Aqara-hubb krävs" },
    ],
    verdict:
      "Sedan IKEA tog bort FYRTUR, TREDANSEN och PRAKTLYSING ur sortimentet är den här den billigaste vägen till en smart rullgardin. Den drar i kedjan på gardinen du redan har, vilket är både billigare och mindre ingripande än att byta hela gardinen mot SwitchBots för nästan tre gånger priset. Sedan kommer siffran som avgör om du står ut med den: två månader på en laddning, för en rullgardin på knappt två gånger två meter som körs en gång om dagen. Det är sex laddningar om året, mot en enda för Aqaras egen gardinmotor. Sitter gardinen högt eller svåråtkomligt är det ett verkligt problem och inte en detalj. Ingen oberoende part har publicerat något test av den, vilket är skälet till att raden Omdöme i oberoende tester står tom.",
  },
  {
    id: "nedis-smartlife-rullgardin",
    brand: "Nedis",
    name: "SmartLife rullgardinsmotor",
    image: productImage(ELEKTRISK_RULLGARDIN.slug, "nedis-smartlife-rullgardin"),
    tagline:
      "Klarar även panel- och romangardin. Dyrare än Aqara för samma jobb, och otestad.",
    scores: {
      /* Bredast av rullgardinsmotorerna på papperet: tillverkaren anger
         panelgardiner, romerska gardiner och rullgardiner. */
      passform: 3.5,
      /* Ingen publicerad siffra och inget test. Samma osäkerhet som Aqaras
         kedjemotor, och betyget är satt på mekanismen. */
      ljudniva: 2.5,
      dragkraft: 3,
      /* Bluetooth och SmartLife, alltså Tuya-plattformen, vilket kräver
         molnkonto. Inget Matter-stöd angivet. Svagast i jämförelsen. */
      ekosystem: 2.5,
      /* testomdome utelämnas: inget oberoende test hittat, på något språk. */
      /* 2 000 mAh med solpanel, alltså bättre än Aqaras kedjemotor men klart
         under gardinmotorerna. */
      batteri: 3.5,
      /* 979 kr mot Aqaras 749 för i praktiken samma jobb. Dyrast per funktion
         av alla eftermonterade motorer i jämförelsen. */
      prisvarde: 2,
    },
    price: 979,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/nedis-smartlife-bluetooth-motorized-roller-blinds-53792.html",
    superlative: "Klarar även panel- och romangardin",
    pros: [
      "Anges klara panelgardiner och romerska gardiner, inte bara rullgardin",
      "Solpanel som laddningsalternativ",
      "Kräver ingen hubb, ansluter direkt via Bluetooth",
    ],
    cons: [
      "230 kr dyrare än Aqara för samma jobb",
      "SmartLife bygger på Tuya och kräver molnkonto, utan Matter-stöd",
    ],
    specs: [
      { label: "Passar", shortLabel: "Montering", value: "Rullgardin, panel, romangardin", highlight: true },
      { label: "Ljudnivå", shortLabel: "Ljud", value: "Anges inte av tillverkaren", highlight: true },
      { label: "Max gardinvikt", shortLabel: "Max vikt", value: "Anges inte av tillverkaren", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Bluetooth", highlight: true },
      { label: "Batteri", value: "2 000 mAh, solpanel" },
      { label: "App", value: "Nedis SmartLife, bygger på Tuya" },
      { label: "Matter", value: "Nej" },
    ],
    verdict:
      "Den enda i jämförelsen som inte kommer från SwitchBot eller Aqara, och den enda som uttryckligen anges klara panelgardiner och romerska gardiner. Har du något annat än en vanlig rullgardin är det därför värt att titta på den. I övrigt är det svårt att motivera: 979 kr mot Aqaras 749 för samma jobb, ingen Matter, och SmartLife-appen bygger på Tuya och kräver ett molnkonto. Ingen oberoende part har testat den, på något språk. Värt att veta om vår egen redovisning: butiken som säljer den betalar oss högst provision av alla vi samarbetar med, 15 procent mot Kjells 5. Den hamnar ändå sist, och det är hela poängen med att viktningen ligger öppet.",
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
    /* Endast "u-skena", trots att Kjell säljer artikeln som "för U- och
       I-skena". Flera engelskspråkiga jämförelser hävdar motsatsen om I-skena
       och vi har inte kunnat avgöra vilken uppgift som stämmer. Verktyget tar
       det försiktiga alternativet, texten redovisar konflikten. */
    id: "aqara-curtain-driver-e1-track",
    window: "gardin",
    mounts: ["u-skena"],
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
  { id: "switchbot-blind-tilt", window: "persienn", mounts: ["lamell"] },
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
      "Föregående generation, och slut i lager hos Kjell när vi kontrollerade. Tredje generationen har mer än dubbelt så stark motor och det tysta läget, som är hela skälet att välja SwitchBot. Att spara 200 kr på den gamla är inte värt det.",
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
      "Titta uppåt. En gardinstång är ett runt rör där gardinen hänger i ringar eller öglor. En skena är en profil i tak eller vägg där gardinen löper i glidare inuti. Är profilen öppen nedåt som ett upp och nedvänt U är det U-skena, och är den formad som ett I med spår på båda sidor är det I-skena. Det spelar roll för att motorerna säljs som olika artikelnummer per typ. Köper du fel blir produkten inte sämre, den går inte att montera alls.",
  },
  {
    question: "Hur mycket låter en gardinmotor?",
    answer:
      "Det skiljer mer än man tror, och bara en tillverkare berättar. SwitchBot anger 25 decibel i tyst läge och 42 decibel i normalläge för Curtain 3, alltså ungefär skillnaden mellan viskning och vanligt samtal. Aqara anger ingen siffra alls, varken på produktsidan eller i sin egen specifikation, och Nedis inte heller. De recensenter som jämfört SwitchBot och Aqara sida vid sida beskriver Aqara som hörbart högre. Eftersom en gardinmotor oftast sitter i ett sovrum och går på morgonen är det värt att ta på allvar.",
  },
  {
    question: "Behöver jag en hubb för att styra gardinerna?",
    answer:
      "För att styra dem hemifrån soffan, inte alltid. För att styra dem när du inte är hemma, ja. SwitchBot kör Bluetooth och fungerar utan hubb så länge du är inom räckhåll, men fjärrstyrning, obegränsade scheman och Matter kräver en SwitchBot-hubb. Aqara kör Zigbee och kräver en Aqara-hubb för att fungera över huvud taget, så där ska hubben räknas in i priset från början. Det är den enskilt vanligaste överraskningen i kategorin.",
  },
  {
    question: "Hur tung gardin klarar en gardinmotor?",
    answer:
      "SwitchBot uppger 16 kilo för sin U-skenevariant och 15 kilo för stångvarianten. Kjell uppger 12 kilo för Aqara Curtain Driver E1. I praktiken är det sällan vikten som stoppar en motor utan friktionen: en skena som går trögt, glidare som kärvar eller en gardin som fastnar i fönsterbrädan tar mer kraft än tyget väger. Dra gardinen för hand först. Känns det trögt för dig blir det trögt för motorn.",
  },
  {
    question: "Hur ofta måste jag ladda en gardinmotor?",
    answer:
      "Det varierar från två månader till ett år mellan produkterna i den här jämförelsen, vilket är en större skillnad än något annat. Aqara Curtain Driver E1 uppges klara upp till ett år, SwitchBot Curtain 3 och Roller Shade omkring åtta månader, och Aqara Roller Shade Driver E1 bara två månader för en rullgardin på knappt två gånger två meter. Solpanel ändrar bilden helt: den ingår till SwitchBot Blind Tilt och säljs som tillbehör till Curtain 3.",
  },
  {
    question: "Kan jag göra min persienn smart?",
    answer:
      "Ja, men bara vinklingen, och det finns i praktiken ett alternativ i Sverige. SwitchBot Blind Tilt sätts på persiennens befintliga vridmekanism och vrider lamellerna med två graders precision, med en ljussensor som kan följa solen. Den hissar däremot inte upp persiennen, och det är den vanligaste missuppfattningen om produkten. Kontrollera din persienntyp mot tillverkarens kompatibilitetslista innan du beställer, för det är den punkt alla testare återkommer till.",
  },
  {
    question: "Får jag installera en gardinmotor själv?",
    answer:
      "Batteridrivna gardinrobotar, ja, utan förbehåll. De klämmer eller skruvas fast och rör aldrig 230 volt, så det finns inget elarbete inblandat. Något helt annat gäller de moduler som styr en gardin- eller persiennmotor som redan är inkopplad i väggen, som Plejd JAL-01, Aqara Shutter Switch H2 och Aqara Smart Roller Shade Controller. Att koppla in en sådan är en förändring av den fasta installationen och kräver ett registrerat elinstallationsföretag.",
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
    question: "Vad kostar det att göra hela hemmet smart med gardiner?",
    answer:
      "Räkna per fönster, inte per hem. En eftermonterad motor kostar mellan 749 och 1 049 kronor i den här jämförelsen, en komplett motoriserad rullgardin drygt 2 000, och ett fönster med gardiner som möts på mitten kan behöva två enheter för att dra åt varsitt håll. Till det kommer hubben, som är nödvändig för Aqara och behövs för fjärrstyrning med SwitchBot. Ett hem med sex fönster landar alltså snabbt på över tiotusen kronor, vilket är skälet till att nästan alla börjar med sovrummet.",
  },
  {
    question: "Vad är skillnaden mellan smarta gardiner och elektriska gardiner?",
    answer:
      "Elektriska gardiner är ett äldre begrepp för gardiner med motor som styrs med fjärrkontroll eller en knapp på väggen, ofta måttbeställda och installerade av en montör, som hos Somfy och Luxaflex. Smarta gardiner betyder att motorn dessutom är uppkopplad och kan schemaläggas, styras från mobilen och ingå i automationer. De flesta produkterna i den här jämförelsen är ett tredje alternativ: motorer du sätter på gardinen du redan har.",
  },
];
