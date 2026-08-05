import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { DORRKLOCKA_MED_KAMERA } from "@/lib/test-pages";

/**
 * Dörrklockor med kamera. Underlag i
 * .agent/research/dorrklocka-med-kamera.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, upplösning, synfält, strömförsörjning,
 * vad som ligger i lådan, kundbetyg och vilka funktioner butiken märker som
 * abonnemangsberoende. Läst på Kjells egen sida 2026-08-03. Uppgifterna om
 * sekretesszoner är lästa i respektive tillverkares egen dokumentation, se
 * lib/sources.ts.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte monterat, ringt på
 * eller filmat med någon dörrklocka.
 *
 * ## Sidans fynd: IMY har ett eget exempel som säger nej
 *
 * Myndigheten publicerar fyra exempel där privatundantaget inte gäller. Det
 * första är en dörrkamera på en lägenhetsdörr, eftersom förbipasserande i
 * trapphuset eller grannars lägenheter riskerar att komma med i bild. Ingen
 * svensk jämförelse nämner det, och produkten säljs till alla boendeformer.
 *
 * ## Andra fyndet: ringklockan ingår inte alltid
 *
 * | Produkt | Signalenhet i lådan |
 * |---|---|
 * | Aqara G410 | ja, plus sex AA-batterier |
 * | Tapo D235 och D230S1 | ja |
 * | Ring Battery Video Doorbell | **nej** |
 * | Arlo Essential Doorbell 2 | **nej**, Chime 2 säljs separat |
 * | Google Nest Doorbell | **nej** |
 *
 * En dörrklocka vars enda signal går till telefonen fungerar inte när mobilen
 * ligger på ljudlöst, laddar i ett annat rum eller saknar täckning. Därför
 * väger ringklockan tjugo procent.
 *
 * ## ⚠️ Inga abonnemangspriser
 *
 * Samma hinder som på /overvakningskamera: Arlos, Rings och Yales prissidor
 * går inte att läsa maskinellt. Kriteriet `kostnad` poängsätter vad som
 * slutar fungera utan abonnemang, inte kronor per månad.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-03";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "tapo-d235",
    name: "TP-Link Tapo D235",
    shortName: "Tapo D235",
    brand: "TP-Link",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "tapo-d235"),
    tagline: "Ser hela vägen ner till paketet, och ringer inne i bostaden.",
    scores: { integritet: 4, bild: 4.5, signalen: 5, kostnad: 4.5, prisvarde: 4 },
    price: 1490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/tp-link-tapo-d235-videodorrklocka-p66481",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 68, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst i test",
    pros: [
      "180 grader horisontellt och 140 vertikalt tar ansiktet och paketet på trappen i samma bild",
      "Signalenhet ingår och sätts i ett vanligt eluttag inomhus, utan kabeldragning",
      "Färgseende i mörker med inbyggd spotlight, inte bara svartvitt infrarött",
      "Batteri på 10 000 mAh eller fast anslutning till befintlig ringklockledning på 8 till 24 volt",
      "Minneskort i enheten, och Tapo Care som frivilligt tillägg snarare än krav",
      "TP-Link listar modellen bland dem som har sekretesszoner, högst fyra stycken",
    ],
    cons: [
      "TP-Link skriver att zonerna följer med vyn om dörrklockan flyttas eller vrids",
      "15 till 20 bilder per sekund, lågt om någon rör sig fort förbi",
      "USB-laddare säljs separat trots att batteriet ska laddas",
      "Sirenen på 98 dB mäts på tio centimeters avstånd, vilket är en generös mätpunkt",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, högst 4 zoner", highlight: true },
      { label: "Synfält", value: "180° × 140°", highlight: true },
      { label: "Upplösning", value: "2K 5 MP, 2560 × 1920", highlight: true },
      { label: "Signalenhet", value: "Ingår, till eluttag", highlight: true },
      { label: "Ström", value: "Batteri 10 000 mAh eller 8 till 24 V", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Mörkerseende", value: "Färg med spotlight, IR 10 m" },
      { label: "Storlek", value: "150 × 50 × 38,4 mm" },
    ],
    verdict:
      "Tapo D235 ser 140 grader vertikalt, hela vägen ner till dörrmattan, och signalenheten ligger i lådan. 1 490 kronor.\n\nDet vertikala synfältet avgör en dörrklocka, och det är det mått nästan ingen jämför. 140 grader vertikalt betyder att du ser både ansiktet på den som står framför och paketet som ställts ner vid tröskeln. En dörrklocka med 60 graders vertikalt synfält ser ansiktet och en bit himmel. När du står i ett annat land och undrar om budet verkligen lämnade paketet är det den skillnaden som betyder något.\n\nSignalenheten ingår och sätts i ett eluttag inomhus. Alternativet är en dörrklocka vars enda signal är en notis på en telefon som ligger på ljudlöst i jackfickan i hallen. Ring, Arlo och Google säljer alla sina dörrklockor utan signalenhet, och det är därför den här vinner trots att den varken har högst upplösning eller lägst pris.\n\nStrömmen går båda vägarna. Har du en gammal ringklocktransformator bakom tamburklockan kan du koppla in den på 8 till 24 volt och slippa ladda. Har du ingen räcker batteriet på 10 000 mAh länge. Det gör den till en av få produkter här som passar både i villan från 1974 och i den nybyggda radhuslängan.\n\nSekretesszonerna finns och TP-Link listar D235 uttryckligen bland modellerna som har dem. Brasklappen är att zonerna följer med vyn om enheten flyttas eller vrids, vilket för en fast skruvad dörrklocka bara gäller den dag du justerar vinkeln. Gör du det: rita om zonerna.\n\nDen är näst dyrast bland de fyra som fungerar utan abonnemang, och laddaren ligger inte i lådan.\n\nKöp den ändå om du vill se paketet på trappen och höra det ringa inne i bostaden. Det är de två sakerna de flesta dörrklockor missar.",
  },
  {
    id: "aqara-g410",
    name: "Aqara Doorbell Camera Hub G410",
    shortName: "G410",
    brand: "Aqara",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "aqara-g410"),
    tagline: "Allt som behövs ligger i lådan, inklusive batterierna.",
    scores: { integritet: 4.5, bild: 3.5, signalen: 5, kostnad: 4.5, prisvarde: 3.5 },
    price: 1619,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/aqara-doorbell-camera-hub-g410-smart-dorrklocka-med-hubb-vit-p56572",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Mest komplett i lådan",
    pros: [
      "Chime-hubb, sex AA-batterier, kilbeslag, skruvmejsel och skruvar ingår, så inget behöver köpas till",
      'Aqaras egen produktsida säger att maskerade områden blir "completely blocked while recording"',
      "Inbyggd Matter- och Thread-hubb, så dörrklockan blir också navet för annan smart hemteknik",
      "mmWave-radar utöver bildanalys, så detekteringen bygger inte på rörelse i bilden",
      "Minneskort upp till 512 GB lokalt, och HomeKit Secure Video för den som är i Apples värld",
    ],
    cons: [
      "1 619 kronor, dyrast bland dem som fungerar utan abonnemang",
      "2408 × 1536 är lägre vertikal upplösning än både Tapo och Reolink",
      "Molnbackup fungerar enligt Aqara bara i kabelansluten drift, inte på batteri",
      "Inga kundomdömen alls hos butiken än",
      /* Stod "…och det står inte hur länge de räcker" till 2026-08-05. Fel:
         Aqaras produktsida anger "up to 5 months". Specifikationsbladet anger
         bara batterityp, och den som läste specarna trodde att siffran saknades
         överallt. Två sidor hos samma tillverkare, två olika svar. */
      "Sex AA-batterier är många att byta, och fem månader gäller enligt Aqara bara vissa användningsfall",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, blockeras i inspelning", highlight: true },
      { label: "Synfält", value: "175°, bildformat 4:3", highlight: true },
      { label: "Upplösning", value: "2K, 2408 × 1536", highlight: true },
      { label: "Signalenhet", value: "Ingår, chime-hubb", highlight: true },
      { label: "Ström", value: "12 till 24 V eller 6× AA", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Lagring", value: "microSD upp till 512 GB" },
      { label: "Protokoll", value: "Zigbee, Thread, Matter, wifi, Bluetooth" },
    ],
    verdict:
      "Aqara G410 är den enda dörrklockan du kan montera färdigt samma kväll du köper den. Allt ligger i lådan, batterier och kilbeslag inräknade.\n\nI lådan ligger dörrklockan, en chime-hubb, sex AA-batterier, ett kilbeslag för att vinkla enheten, skruvar, pluggar och en skruvmejsel. Aqara har alltså tänkt igenom att den som köper en dörrklocka en tisdagskväll inte har ett kilbeslag hemma. Jämför med Ring, som skickar med ett demonteringsverktyg och räknar med att du använder telefonen som ringklocka.\n\nMaskeringen är den näst bäst dokumenterade av de åtta dörrklockorna. Aqaras egen produktsida skriver att du kan maskera delar av bilden så att de blir helt blockerade under inspelning, och eftersom G410 är fast monterad utan panorering finns ingen av de rörelserelaterade brasklapparna som drar ner Arlo och Tapo. Uppgiften står på en produktsida och inte i en supportartikel med versionsdatum, vilket gör den något svagare belagd än Reolinks.\n\nDen inbyggda Matter- och Thread-hubben är ett verkligt argument om du står inför att köpa en hubb ändå. Då är prisskillnaden mot en enklare dörrklocka inte 400 kronor utan negativ.\n\nUpplösningen är lägst bland de fyra dörrklockor som fungerar utan abonnemang, och särskilt det vertikala måttet på 1536 pixlar är märkbart mot Tapos 1920. Molnbackupen fungerar enligt Aqara bara när dörrklockan är kabelansluten, vilket är en märklig begränsning på en produkt som levereras med batterier. Och den har inga kundomdömen alls hos butiken, så ingen har gått före dig.\n\nKöp den om du ändå står inför att köpa en Matter-hubb. Då är prisskillnaden mot en enklare dörrklocka i praktiken borta.",
  },
  {
    id: "reolink-d340w",
    name: "Reolink D340W 2K",
    shortName: "D340W",
    brand: "Reolink",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "reolink-d340w"),
    tagline: "Bästa maskeringen och sex sekunder före tryckningen.",
    scores: { integritet: 5, bild: 4.5, signalen: 2, kostnad: 5,      /* 4,0 och inte 4,5: 1 199 kronor är lägst pris i jämförelsen, men
         priset är inte hela kostnaden. Utan signalenhet i lådan behöver du
         köpa Reolinks Chime 230V separat för att det ska ringa inomhus, och
         då är prisfördelen mot Aqara G410 borta. Samma resonemang som för
         Housegards Luma-system, där vi räknar systemet och inte artikeln.
         Sänkt 2026-08-03. */
 prisvarde: 4 },
    price: 1199,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/reolink-d340w-2k-video-dorrklocka-p60397",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 4, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst dokumenterad maskering",
    pros: [
      "Reolinks sekretesszon gäller enligt tillverkaren alla deras kameror och syns i inspelningen",
      "Spelar in sex sekunder före händelsen, så du ser vad som hände innan det ringde",
      "2560 × 1920 och 180 grader diagonalt ger både hög upplösning och brett synfält",
      "Minneskort i enheten plus stöd för Reolink NVR, och ingenting kräver abonnemang",
      "Ethernet-port utöver wifi på 2,4 och 5 GHz, den stabilaste anslutningen av alla åtta",
      "1 199 kronor, tredje lägsta priset av de åtta",
    ],
    cons: [
      "Kräver 12 till 24 volt växelström, från en befintlig ringklockledning eller en transformator",
      "Ingen signalenhet anges i lådan, och Reolink säljer en Chime 230V som separat artikel",
      "Bara fyra kundomdömen hos butiken",
      "IP65 och drift ner till tio minusgrader, vilket är den snålaste temperaturgränsen här",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, hela sortimentet", highlight: true },
      { label: "Synfält", value: "134° × 97°, 180° diagonalt", highlight: true },
      { label: "Upplösning", value: "2560 × 1920, 20 fps", highlight: true },
      { label: "Signalenhet", value: "Ej angiven i lådan", highlight: true },
      { label: "Ström", value: "12 till 24 VAC, Ethernet", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Förinspelning", value: "6 sekunder" },
      { label: "Lagring", value: "microSD och Reolink NVR" },
    ],
    verdict:
      "Reolink D340W har den bäst dokumenterade maskeringen av alla åtta och sparar sex sekunder före tryckningen. Den kräver också fast ström, vilket inte alla hus har.\n\nReolink är den enda tillverkaren vars dokumentation säger att sekretesszonen gäller hela sortimentet och syns både i direktbild och i inspelning, och deras artikel öppnar med precis det fall Integritetsskyddsmyndigheten beskriver: att du är orolig för att hamna i konflikt med grannen. Det finns ingen brasklapp som träffar en fast dörrklocka.\n\nSex sekunders förinspelning är den andra saken ingen annan här har. Dörrklockan buffrar bilden hela tiden och sparar sekunderna före tryckningen. Skillnaden märks när någon gått fram till dörren, provat handtaget och sedan ringt på: en vanlig dörrklocka börjar spela in vid tryckningen och missar alltihop.\n\nSedan hakarna, och de är verkliga. Den drivs på 12 till 24 volt växelström. Har du en gammal ringklocktransformator bakom tamburklockan är det gratis. Har du ingen är det ett elarbete, och då är den billigaste produkten i testet plötsligt den dyraste. Kontrollera det innan du beställer, inte efter.\n\nOch signalenheten. Kjell anger ingen i förpackningen, och Reolink säljer en Chime 230V som separat artikel för knappt 300 kronor hos Proshop. Räkna med den kostnaden, för utan den ringer det bara i telefonen.\n\nKöp den om du redan har en ringklocktransformator och bryr dig om vad kameran får se. Har du ingen kabel blir den billigaste dörrklockan här den dyraste.",
  },
  {
    id: "tapo-d230s1",
    name: "TP-Link Tapo D230S1",
    shortName: "Tapo D230S1",
    brand: "TP-Link",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "tapo-d230s1"),
    tagline: "Kategorins mest omdömda, med signalenhet i lådan.",
    scores: { integritet: 4, bild: 3, signalen: 5, kostnad: 4.5, prisvarde: 4 },
    price: 1490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/tp-link-tapo-d230s1-smart-dorrklocka-p65361",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 158, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Mest omdömd av alla",
    pros: [
      "158 kundomdömen med snittet 4,5, mer än dubbelt så många som näst mest omdömda",
      "Signalenhet ingår, med måtten angivna i butikens specifikation",
      "2K 5 MP, samma sensor som storebror D235",
      "Minneskort i enheten och Tapo Care som frivilligt tillägg",
      "TP-Link listar modellen bland dem som har sekretesszoner",
    ],
    cons: [
      "160 grader diagonalt mot D235:s 180 horisontellt, och inget vertikalt mått anges",
      "IP64 mot IP65 för Reolink: tål stänk men inte stråle",
      "15 bilder per sekund",
      "Samma pris som D235, som har bredare synfält och färgseende i mörker",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, högst 4 zoner", highlight: true },
      { label: "Synfält", value: "160° diagonalt", highlight: true },
      { label: "Upplösning", value: "2K 5 MP, 2560 × 1920", highlight: true },
      { label: "Signalenhet", value: "Ingår", highlight: true },
      { label: "Ström", value: "Batteri", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Vädertålighet", value: "IP64, -20 till 45 °C" },
      { label: "Mörkerseende", value: "850 nm IR" },
    ],
    verdict:
      "Tapo D230S1 har 158 kundomdömen på 4,5, fler än dubbelt så många som näst mest omdömda. Signalenhet i lådan, 2K-sensor, minneskort i enheten och inget abonnemang.\n\n158 omdömen med snittet 4,5 hos Kjell är den tydligaste signalen någon av dörrklockorna ger om att den fungerar i vardagen. Näst mest omdömda har 67. Omdömena påverkar inte rankningen, men de säger något om hur många som levt med produkten längre än några veckor.\n\nDen gör allt det viktiga rätt. Signalenhet i lådan, samma 2K-sensor som storebror, minneskort i enheten, ingen abonnemangstvång, och TP-Link listar den bland modellerna med sekretesszoner.\n\nProblemet är att den kostar exakt lika mycket som D235. För samma 1 490 kronor får du där 180 grader horisontellt och 140 vertikalt i stället för 160 diagonalt, färgseende i mörker i stället för svartvitt infrarött, batteri på 10 000 mAh, och möjlighet att koppla in fast ström. Det finns inget mått där D230S1 är bättre.\n\nDärför är rekommendationen enkel och lite tråkig: köp den bara om den är rejält billigare än D235 den dag du handlar. Är priset detsamma finns det ingen anledning.\n\nDet enda som talar emot D235 är just omdömena. 158 mot 67 är en verklig skillnad i hur mycket produkten är prövad, och den som hellre köper det beprövade än det bättre på papperet har ett försvarbart skäl.",
  },
  {
    id: "imou-doorbell-2s-2k",
    name: "Imou Doorbell 2S 2K",
    shortName: "Imou 2S",
    brand: "Imou",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "imou-doorbell-2s-2k"),
    tagline: "Billigast med ringklocka i lådan, och tystast om vad den maskerar.",
    /* Kom in i rankningen 2026-08-03. Den låg bland de övervägda med
       lagerstatus som skäl, och efter användarbeslut samma dag rankas
       slutsålda produkter ändå. */
    scores: { integritet: 2, bild: 3.5, signalen: 5, kostnad: 4.5, prisvarde: 4.5 },
    price: 990,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/imou-doorbell-2s-2k-tradlos-videodorrklocka-med-ringklocka-p66323",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 34, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Billigast med ringklocka",
    pros: [
      "990 kronor, lägsta priset av dörrklockorna, och ringklockan ingår",
      "Ringklockan fungerar som wifi-förstärkare och ger bättre täckning vid dörren",
      "Minneskortet sitter i ringklockan inomhus och inte i enheten på fasaden",
      "5 000 mAh batteri, och kan i stället kopplas till 8 till 24 V om du har kabel",
      "166 grader diagonalt tar hela trappan och paketet på marken",
    ],
    cons: [
      "Varken butiken eller specifikationen nämner sekretesszon, det vi väger tyngst",
      "15 bilder per sekund, lägst av de åtta, vilket märks på rörelse",
      "Mörkerseende upp till 5 meter, kortast räckvidd av alla här",
      "Ingen IP-klass anges, bara ordet vädertålig",
      "Imou ägs av Dahua, och appen är den enda vägen till bilden",
    ],
    specs: [
      { label: "Sekretesszon", value: "Anges inte", highlight: true },
      { label: "Synfält", value: "166° diagonalt, 125° horisontellt", highlight: true },
      { label: "Upplösning", value: "3 MP, 2048 × 1536", highlight: true },
      { label: "Signalenhet", value: "Ingår, med microSD och wifi-förstärkare", highlight: true },
      { label: "Ström", value: "5 000 mAh batteri eller 8 till 24 V", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Lagring", value: "microSD upp till 512 GB i ringklockan" },
      { label: "Bildfrekvens", value: "Upp till 15 fps" },
      { label: "Mörkerseende", value: "Upp till 5 m" },
      { label: "Drifttemperatur", value: "-20 till 50 °C" },
    ],
    verdict:
      "Imou 2S kostar 990 kronor och har ändå en riktig ringklocka i lådan, med minneskortet inomhus i stället för i enheten på fasaden.\n\nRingklockan är inte bara en högtalare: den håller minneskortet och fungerar som wifi-förstärkare. Att kortet sitter inomhus i stället för i enheten på fasaden är en verklig fördel, eftersom den som river ner dörrklockan då inte får med sig inspelningen. Reolink, som annars är den vi rekommenderar för integritet, saknar ringklocka helt.\n\nSynfältet är brett, 166 grader diagonalt, vilket räcker för både ansiktet framför dörren och paketet på marken. Batteriet på 5 000 mAh går att byta mot fast ström om du har kabel sedan tidigare, och den är angiven ner till 20 minusgrader.\n\nSedan kommer det som gör att den ändå hamnar långt ner. **Ingenstans i Kjells specifikation, och ingenstans i produkttexten, står ett ord om sekretesszon.** Maskering väger tyngst av allt vi bedömer, av ett skäl: en dörrklocka pekar mot grannens dörr eller mot gatan, och kamerabevakningslagen bryr sig om det. Vi vet inte om funktionen finns i appen. Vi vet att den som köper på butikens uppgifter inte kan veta det, och vi betygsätter det som går att kontrollera före köp.\n\nBilden har två svaga tal som ingen annan här har. 15 bilder per sekund är hälften av det normala och syns när någon rör sig snabbt förbi. Mörkerseendet slutar vid fem meter, mot tio eller mer hos de andra. Och där varje annan produkt anger en IP-klass står här bara ordet vädertålig.\n\nKöp den om budgeten är knapp och du vill ha ringklockan i lådan. Vill du kunna maskera grannens dörr, ta Reolink D340W för 209 kronor mer.",
  },
  {
    id: "arlo-essential-doorbell-2",
    name: "Arlo Essential Doorbell 2 2K",
    shortName: "Essential Doorbell 2",
    brand: "Arlo",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "arlo-essential-doorbell-2"),
    tagline: "180 grader och 1 090 kronor, sedan börjar månadskostnaden.",
    scores: { integritet: 3.5, bild: 3.5, signalen: 2, kostnad: 1.5, prisvarde: 3 },
    price: 1090,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/arlo-essential-doorbell-2-2k-tradlos-dorrklocka-p65824",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 13, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Näst lägst pris i hyllan",
    pros: [
      "1 090 kronor, näst lägst pris bland de åtta vi rankar",
      "180 graders synfält i 2K, och färg i mörker enligt tillverkaren",
      "Arlo listar modellnumret AVD4001 bland dem som stöder sekretesszoner",
      "Kabelfri installation på några minuter, batteritid 4 till 6 månader",
      "Inbyggt inbrottslarm som kan utlösas från appen",
    ],
    cons: [
      "Ingen signalenhet i lådan, Arlo Chime 2 säljs som separat artikel",
      "Att spara videoklipp kräver enligt Kjells egen text en Arlo Secure-prenumeration",
      "Ingen lokal lagring, så ingenting sparas om du inte betalar",
      "Sekretesszonerna raderas automatiskt vid ändrat synfält, zoom eller rotering av bilden",
      "Bara 13 kundomdömen",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, men raderas vid ändring", highlight: true },
      { label: "Synfält", value: "180°", highlight: true },
      { label: "Upplösning", value: "2K", highlight: true },
      { label: "Signalenhet", value: "Nej, säljs separat", highlight: true },
      { label: "Ström", value: "Batteri, 4 till 6 mån", highlight: true },
      { label: "Kräver abonnemang", value: "Ja, för att spara klipp" },
      { label: "Modellnummer", value: "AVD4001" },
      { label: "Siren", value: "Inbyggd, styrs från appen" },
    ],
    verdict:
      "Arlo Essential Doorbell 2 kostar 1 090 kronor och ger 180 graders synfält i 2K, färg i mörker och ett inbyggt larm. Sedan börjar månadskostnaden.\n\nDet är näst billigast bland de åtta, 100 kronor över Imou. För det får du 180 graders synfält i 2K, färg i mörker, ett inbyggt larm och en installation som tar en kvart eftersom ingen kabel behöver dras. Arlo dokumenterar dessutom sina sekretesszoner utförligast av alla åtta tillverkarna och listar den här modellen, AVD4001, bland dem som stöder funktionen.\n\nDet ligger ingen ringklocka i lådan. Arlo Chime 2 är en separat artikel hos samma butik. Utan den finns det ingen signal någonstans i bostaden, bara en notis i telefonen, och det är inte vad de flesta menar med en dörrklocka.\n\nOch att spara ett klipp kräver abonnemang. Det är inte vår tolkning utan Kjells egen produkttext: välj en Arlo Secure-prenumeration för att spara videoklipp i molnet. Det finns ingen lokal lagring. Utan abonnemang ser du besökaren i realtid och kan prata med besökaren, men i morgon finns ingenting kvar. Den som köper en dörrklocka för att kunna visa någon vad som hände har köpt fel produkt.\n\nZonerna har dessutom Arlos brasklapp: de raderas automatiskt om du ändrar synfältet, zoomar eller roterar bilden. På en fast dörrklocka är det mindre allvarligt än på en roterande kamera, men det är värt att veta att inställningen är ömtålig.\n\nSom budgetval fungerar den om du redan är i Arlos ekosystem och redan betalar. Som fristående köp är den dyrare än de dyra.",
  },
  {
    id: "ring-battery-video-doorbell",
    name: "Ring Battery Video Doorbell 2K",
    shortName: "Battery Doorbell",
    brand: "Ring",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "ring-battery-video-doorbell"),
    tagline: "Kvadratisk bild som ser hela dörren, och ingenting som sparas.",
    scores: { integritet: 4, bild: 4, signalen: 1, kostnad: 1.5, prisvarde: 2 },
    price: 1299,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/ring-battery-video-doorbell-retinal-2k-speckled-grey-p66871",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst bildformat",
    pros: [
      "1920 × 1920 pixlar ger kvadratisk bild och 140 grader i både höjd och bredd",
      "Ser ansikte och paket i samma bild utan att något beskärs bort",
      "Två sekretesszoner, och Ring är en av få vars specifikation skiljer dem från rörelsezoner",
      "Batteri som byts utan att dörrklockan skruvas ner",
      "Drift ner till tjugo minusgrader",
    ],
    cons: [
      "Ingen signalenhet i lådan: dörrklocka, kabel, monteringssats, verktyg och guide",
      "Ingen lokal lagring, och inspelning kräver abonnemang",
      "Rörelsedetektorn känner av området även inuti sekretesszonen",
      "Inga kundomdömen alls hos butiken",
      "1 299 kronor, plus ringklocka, plus abonnemang",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, 2 zoner", highlight: true },
      { label: "Synfält", value: "140° × 140°", highlight: true },
      { label: "Upplösning", value: "2K, 1920 × 1920", highlight: true },
      { label: "Signalenhet", value: "Nej, ingår ej", highlight: true },
      { label: "Ström", value: "Batteri, USB-C", highlight: true },
      { label: "Kräver abonnemang", value: "Ja, för inspelning" },
      { label: "Storlek", value: "53,6 × 35,8 × 146,8 mm" },
      { label: "Drifttemperatur", value: "-20 till 48 °C" },
    ],
    verdict:
      "Ring Battery Video Doorbell har det bästa bildformatet av de åtta: 1920 × 1920 pixlar med 140 grader i både höjd och bredd.\n\nDen kvadratiska bilden är genuint smart och underskattad. 1920 × 1920 pixlar med 140 grader i både höjd och bredd betyder att en person som står precis vid dörren syns från hjässa till skor, och att ett paket på trappen ligger inom bild utan att du behöver välja mellan de två. De flesta dörrklockor har ett brett men platt synfält och tvingar fram just det valet.\n\nRing är också en av få tillverkare vars specifikation skiljer rörelsezoner från integritetszoner, på två separata rader. Att de gör den skillnaden tydlig är mer än de flesta gör, och det är två helt olika funktioner.\n\nSedan lådan. I den ligger dörrklockan, en USB-C-kabel, en monteringssats, ett demonteringsverktyg och en snabbstartsguide. Ingen ringklocka. Du kan alltså inte höra att någon ringer på om du inte har telefonen på dig, och en dörrklocka som kräver att du bär mobilen i handen inomhus är en kamera med knapp.\n\nOch lagringen. Det finns ingen lokal. Utan abonnemang får du en notis och en direktbild, men i morgon finns ingenting kvar att visa någon. För en produkt vars främsta uppgift är att dokumentera vem som stod vid din dörr är det en märklig grundinställning.\n\n1 299 kronor är inte dyrt. Samma summa plus en ringklocka plus en månadsavgift i fem år är något helt annat, och det är den summan som ska ställas mot Tapo D235.\n\nKöp den om du redan har Ring i huset. Börjar du från noll får du mer för pengarna hos TP-Link.",
  },
  {
    id: "google-nest-doorbell",
    name: "Google Nest Doorbell, batteri",
    shortName: "Nest Doorbell",
    brand: "Google",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "google-nest-doorbell"),
    tagline: "Stående bildformat och stark igenkänning, men ingen maskering vi kan belägga.",
    scores: { integritet: 1, bild: 3.5, signalen: 1.5, kostnad: 2, prisvarde: 1.5 },
    price: 1990,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/google-nest-doorbell-batteri-dorrklocka-med-kamera-p51847",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 59, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst igenkänning på enheten",
    pros: [
      "960 × 1280 i stående format tar hela vägen från ansikte till dörrmatta",
      "Maskininlärningen körs på enheten och inte i molnet, vilket få konkurrenter gör",
      "59 kundomdömen med snittet 4,5, näst flest av de åtta",
      "Livesändning dygnet runt och HDR även i mörkerläget",
      "Inbyggd magnetometer och säker uppstart, en genomtänkt maskinvarusäkerhet",
    ],
    cons: [
      "Vi har inte hittat någon dokumentation som säger att produkten har sekretesszoner",
      "1,3 megapixel, lägst upplösning bland de åtta",
      "Ingen signalenhet i lådan och ingen lokal lagring",
      "1 990 kronor, dyrast av dörrklockorna",
      "IP54 och drift bara ner till tjugo minusgrader, sämst vädertålighet här",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ingen dokumentation hittad", highlight: true },
      { label: "Synfält", value: "145° diagonalt, stående", highlight: true },
      { label: "Upplösning", value: "960 × 1280, 1,3 MP", highlight: true },
      { label: "Signalenhet", value: "Nej, ingår ej", highlight: true },
      { label: "Ström", value: "Batteri, USB", highlight: true },
      { label: "Kräver abonnemang", value: "För längre historik" },
      { label: "Igenkänning", value: "På enheten, inte i molnet" },
      { label: "Vädertålighet", value: "IP54, -20 till 40 °C" },
    ],
    verdict:
      "Google Nest Doorbell har stående bildformat och kör igenkänningen på enheten i stället för i molnet. 59 kundomdömen på 4,5 säger att den fungerar.\n\nBildformatet är stående, 960 × 1280, vilket är rätt form för en dörr: du ser en människa från hjässa till fötter och paketet på trappen utan att något beskärs. Igenkänningen körs på själva enheten och inte i molnet, tvärtemot Arlo, där samma funktion är en abonnemangstjänst som förutsätter att bilden lämnar huset. Och 59 kundomdömen med 4,5 i snitt säger att den fungerar.\n\nSedan det vi inte kan säga. Fem av tillverkarna dokumenterar sina sekretesszoner. Google gör det inte, någonstans vi kan hitta. Det betyder inte att funktionen saknas, och vi påstår inte det. Det betyder att en köpare som vill maskera bort trottoaren eller grannens dörr inte kan ta reda på i förväg om produkten klarar det.\n\nVi bedömer vad du kan kontrollera innan du betalar, inte vad produkten kanske gör. Därför drar den luckan ner den här mer än något annat.\n\nDärutöver: 1,3 megapixel är lågt även för stående format, det ligger ingen ringklocka i lådan, det finns ingen lokal lagring, och 1 990 kronor är dyrast här. IP54 innebär dessutom att den tål stänk men inte slagregn, vilket är tunt för en produkt som sitter ute året om.\n\nKöp den om du har Google-högtalare i huset och vill ha igenkänningen lokalt. Vill du kunna maskera bort grannens dörr vet du inte om du kan det, och då är Reolink D340W det tryggare köpet.",
  },
];

export const DORRKLOCKA_PRODUCTS: Product[] = resolveProducts(
  DORRKLOCKA_MED_KAMERA,
  SEEDS,
);

/**
 * Produkter vi tittat på och valt bort. Skälet står utskrivet, eftersom en
 * bortvald produkt utan motivering ser ut som ett förbiseende.
 */
export const DORRKLOCKA_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "eufy",
    name: "Video Doorbell C30 och E340",
    reason:
      "Kjell publicerar ingen teknisk specifikation alls för någon av dem, varken upplösning, synfält, strömförsörjning eller innehåll i förpackningen. Vi rankar inte en produkt där ingen av de uppgifter vi betygsätter går att läsa. C30 kostar 699 kronor och är den billigaste Reolink gör, E340 kostar 2 290 och har dubbla kameror. Värt att veta ändå: eufys egen dokumentation ger sekretesszoner bara till en lista med äldre eufyCam-modeller, medan dörrklockorna får aktivitetszoner, den zontyp som stänger av notiser och inte den som döljer grannen.",
    approxPrice: 699,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/eufy-video-doorbell-c30-p60041",
  },
  {
    brand: "Yale",
    name: "Smart Video Doorbell",
    reason:
      "Kjells specifikation skiljer på Detekteringszon och Sekretesszon i två separata rader, och det är två helt olika funktioner, och det talar för produkten. Men vi har inte hittat Yales egen dokumentation av funktionen, och vi bedömer det tillverkaren själv skriver ut. Dessutom två praktiska hakar: den saknar batteri helt och kräver en befintlig ringklockledning på 8 till 24 volt eller Yales strömadapter som säljs separat, och fordons-, paket- och husdjursdetektering är märkta med asterisk som kräver abonnemang. 1 799 kronor för 1080p.",
    approxPrice: 1799,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/yale-smart-video-doorbell-p65942",
  },
  {
    brand: "Arlo",
    name: "Chime 2, mottagare för dörrklocka",
    reason:
      "Tillbehör och inte en egen produkt, men det är tillbehöret som gör Arlos dörrklocka till en dörrklocka. Utan den ringer det bara i telefonen. Räkna in den i priset om du överväger Arlo, och gör samma sak med Rings och Googles motsvarigheter.",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/arlo-chime-2-mottagare-for-dorrklocka-p64831",
  },
  {
    brand: "Ubiquiti",
    name: "UniFi Protect G4 Doorbell",
    reason:
      "Förutsätter en UniFi-inspelare i huset och riktar sig till den som redan byggt ett nätverk med Ubiquitis utrustning. Då blir lagringen helt lokal och oberoende av varje molntjänst, men bygget kostar långt mer än dörrklockan. Egen sida om vi täcker fasta system.",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/ubiquiti-unifi-protect-g4-doorbell-p62782",
  },
];

export const DORRKLOCKA_FAQ = [
  {
    question: "Vilken dörrklocka med kamera är bäst 2026?",
    answer:
      "TP-Link Tapo D235 för 1 490 kronor hos Kjell. Den ser 180 grader horisontellt och 140 vertikalt, både ansiktet och paketet på trappen, och den har färgseende i mörker, signalenheten ingår i lådan och den fungerar fullt ut utan abonnemang. Vill du ha den bäst dokumenterade maskeringen och har en befintlig ringklockledning är Reolink D340W för 1 199 kronor ett starkt alternativ, men då tillkommer en ringklocka.",
  },
  {
    question: "Får jag sätta upp en dörrklocka med kamera i lägenhet?",
    answer:
      "Inte inom privatundantaget. Integritetsskyddsmyndigheten har ett eget exempel för just det: sker bevakningen från en lägenhetsdörr och förbipasserande i trapphuset eller grannars lägenheter riskerar att komma med i bild, då gäller GDPR och kamerabevakningslagen i stället. Det betyder inte att produkten är förbjuden, men du måste då ha en rättslig grund, göra en intresseavvägning och informera om bevakningen, och IMY skriver att bevakning som träffar grannar sällan är tillåten. Fråga också din bostadsrättsförening eller hyresvärd, eftersom ytterdörren ofta är föreningens och inte din.",
  },
  {
    question: "Ringer det inne i bostaden eller bara i telefonen?",
    answer:
      "Det beror helt på modell, och det är den skillnad som märks mest i vardagen. Tapo D230S1, Tapo D235 och Aqara G410 har en signalenhet i lådan som sätts i ett eluttag. Ring, Arlo och Google Nest levererar ingen, utan säljer den som separat tillbehör. För Reolink D340W anger butiken ingen, och Reolink säljer en Chime 230V separat. Utan signalenhet hör du bara notisen i telefonen, vilket inte fungerar när mobilen ligger på ljudlöst eller laddar i ett annat rum.",
  },
  {
    question: "Behöver jag dra ström till dörrklockan?",
    answer:
      "Inte nödvändigtvis. De flesta av dörrklockorna är batteridrivna och skruvas upp på en kvart. Två undantag: Reolink D340W kräver 12 till 24 volt växelström, och Yale saknar batteri helt. Har du en gammal ringklocktransformator bakom tamburklockan kan du använda den, och då slipper du ladda. Tapo D235 och Aqara G410 klarar båda vägarna. Kontrollera vad du har innan du beställer, för det avgör vilka produkter som är möjliga.",
  },
  {
    question: "Vad ska jag titta på i synfältet?",
    answer:
      "Det vertikala måttet, som nästan aldrig jämförs. En dörrklocka med brett men platt synfält ser ansiktet på den som står framför och en bit himmel, men inte paketet vid tröskeln. Tapo D235 anger 140 grader vertikalt och Ring har kvadratisk bild med 140 grader i båda riktningarna, vilket i praktiken betyder från hjässa till skor. Google Nest löser det med stående bildformat. Upplösningen spelar mindre roll än formatet på det här avståndet.",
  },
  {
    question: "Krävs abonnemang för en dörrklocka med kamera?",
    answer:
      "För fem av åtta i vår jämförelse: nej. Tapo D230S1, Tapo D235, Reolink D340W och Aqara G410 sparar allt på ett minneskort i enheten, och Imou 2S gör det i ringklockan inomhus. Ring spelar inte in något alls utan abonnemang, och Arlo kräver Arlo Secure för att spara klipp enligt butikens egen text. Google Nest ger en kort gratis händelsehistorik och kräver abonnemang för mer. Vi har inte kunnat läsa vad abonnemangen kostar i kronor och publicerar därför inga priser.",
  },
  {
    question: "Vad händer om jag ändå filmar trapphuset?",
    answer:
      "Då gäller GDPR och kamerabevakningslagen i stället för privatundantaget. Du blir personuppgiftsansvarig, behöver en rättslig grund och ska informera om bevakningen. IMY skriver att bevakning som innebär ett allvarligt intrång i grannars personliga integritet sällan är tillåten, och att kamerabevakning av människor i deras hem dessutom kan vara brottsligt enligt straffrättsliga bestämmelser. Att rikta om kameran nedåt mot den egna tröskeln, eller maskera bort dörrarna mittemot, är det som gör skillnaden i praktiken.",
  },
  {
    question: "Spelar dörrklockan in det som händer innan någon ringer på?",
    answer:
      "Bara Reolink D340W av dem vi jämför anger det: sex sekunders förinspelning. Kameran buffrar bilden hela tiden och sparar sekunderna före händelsen. Skillnaden märks när någon gått fram, provat handtaget och sedan ringt på, eftersom en vanlig dörrklocka börjar spela in först vid tryckningen och missar det som ledde fram till den.",
  },
  {
    question: "Vad händer med dörrklockan när wifi ligger nere?",
    answer:
      "Ringklockan i lådan blir plötsligt det enda som fungerar, och det är hela skälet till att den väger tjugo procent i vår bedömning. Sambandet är enkelt: knappen och signalenheten pratar oftast med varandra direkt, medan notisen till telefonen går via router, internet och tillverkarens server. Faller något av de tre ringer det fortfarande inne i bostaden om du har en chime, men telefonen är tyst. Har du ingen chime har du under avbrottet ingen dörrklocka alls. Inspelningen påverkas också: kameror med minneskort fortsätter spela in lokalt, molnberoende gör det inte.",
  },
  {
    question: "Hur länge räcker batteriet i en dörrklocka med kamera?",
    answer:
      "Mellan ett par månader och ett halvår, och det avgörs nästan helt av hur mycket den väcks. Varje rörelse startar kameran, radion och ibland belysningen, så en dörrklocka mot en trafikerad gångväg kan behöva laddas var sjätte vecka medan samma modell i en återvändsgränd klarar vintern. Tillverkarnas siffror förutsätter ett fåtal händelser om dagen. Vill du slippa frågan helt: koppla in den på befintlig ringklockledning om huset har en, vilket flera av modellerna klarar på 8 till 24 volt. Annars är det detekteringszonen du ska justera, inte batteriet du ska byta.",
  },
  {
    question: "Fungerar dörrklockan i svensk vinterkyla?",
    answer:
      "Kameran gör det, batteriet gör det sämre. Dörrklockorna anger drifttemperaturer ner till 20 minusgrader, men litiumceller tappar kapacitet när det blir kallt, och en dörrklocka som räcker fyra månader i september kan behöva laddas efter sex veckor i januari. Ladda den inomhus och låt den bli rumsvarm innan du laddar, eftersom laddning av ett kallt batteri sliter på det. Räkna också med imma på linsen vid snabba temperaturväxlingar. Är dörren i ett oskyddat läge mot väder är fast ström det som gör mest skillnad i praktiken.",
  },
  {
    question: "Vad gör jag om paketbudet inte hittar dörrklockan?",
    answer:
      "Kontrollera höjden och vinkeln, för det är där de flesta besvikelserna sitter. En dörrklocka monterad på 1,60 meter ser ansiktet på en vuxen men missar paketet på marken, och en monterad på 1,20 ser paketet men filmar magen på budet. Det vertikala synfältet avgör hur mycket du slipper välja: 140 grader räcker för både ansiktet och tröskeln, 60 grader gör det inte. Sitter dörren indragen i en nisch hjälper ett kilbeslag som vinklar enheten utåt, och flera tillverkare lägger med ett. Och märk gärna knappen, eftersom en modern dörrklocka inte ser ut som en dörrklocka.",
  },
];
