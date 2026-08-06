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
 * | Reolink D340W | ja, plus strömadapter |
 * | Imou Doorbell 2S | ja, med minneskortet i ringklockan |
 * | Ring Battery Video Doorbell | **nej** |
 * | Arlo Essential Doorbell 2 | **nej**, Chime 2 säljs separat |
 * | Google Nest Doorbell | **nej** |
 *
 * En dörrklocka vars enda signal går till telefonen fungerar inte när mobilen
 * ligger på ljudlöst, laddar i ett annat rum eller saknar täckning. Därför
 * väger ringklockan tjugo procent.
 *
 * ⚠️ Raden om Reolink stod som "ej angiven" till 2026-08-06 och var fel.
 * Kjells egen ruta "I paketet" på den sida vi redan länkade listar
 * Reolink-ringklocka och strömadapter. Se rättelsen i lib/corrections.ts.
 *
 * ## Abonnemangspriser, lästa 2026-08-06
 *
 * Rättar noteringen från 2026-08-03 om att inget pris gick att läsa. Alla tre
 * publicerar sina svenska planer, och två av sidorna svarar mot ren curl.
 * Arlos pristabell ligger i JSON på `arlo.com/sv_se/serviceplans`; det var
 * `/se_se/pricing` som var fel adress, inte källan som var stängd.
 *
 * | Plan | Månad | År |
 * |---|---|---|
 * | Arlo Secure, 1 enhet | 99 kr | 1 089 kr |
 * | Arlo Secure, flera enheter | 149 kr | 1 639 kr |
 * | Ring Basic, 1 dörrklocka | 3,99 € | 39,99 € |
 * | Google Home Premium Standard | 100 kr | 1 000 kr |
 *
 * Ring prissätter sina svenska planer i euro, `ring.com/se/sv/plans`. Nest
 * Aware heter numera Google Home Premium, `store.google.com/se`. De fem
 * dörrklockor som sparar på minneskort kostar ingenting efter köpet.
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
    superlative: "Bäst för paketen på trappen",
    pros: [
      "180 grader horisontellt och 140 vertikalt tar ansiktet och paketet på trappen i samma bild",
      "Signalenhet ingår och sätts i ett vanligt eluttag inomhus, utan kabeldragning",
      "Färgseende i mörker med inbyggd spotlight, inte bara svartvitt infrarött",
      "Batteri på 10 000 mAh eller fast anslutning till befintlig ringklockledning på 8 till 24 volt",
      "Minneskort i enheten, och Tapo Care som frivilligt tillägg snarare än krav",
      "Sekretesszon som svartar ut delar av bilden, högst fyra zoner",
    ],
    cons: [
      "Zonerna följer med vyn om dörrklockan flyttas eller vrids, så de måste ritas om efteråt",
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
      { label: "Abonnemang", value: "Nej, allt lokalt", highlight: true },
      { label: "Mörkerseende", value: "Färg med spotlight, IR 10 m" },
      { label: "Storlek", value: "150 × 50 × 38,4 mm" },
    ],
    verdict:
      "Tapo D235 ser 140 grader vertikalt, hela vägen ner till dörrmattan, och signalenheten ligger i lådan. 1 490 kronor.\n\nDet vertikala synfältet avgör en dörrklocka, och det är det mått nästan ingen jämför. 140 grader vertikalt betyder att du ser både ansiktet på den som står framför och paketet som ställts ner vid tröskeln. En dörrklocka med 60 graders vertikalt synfält ser ansiktet och en bit himmel. När du står i ett annat land och undrar om budet verkligen lämnade paketet är det den skillnaden som betyder något. Ingen annan här är i närheten: Reolink anger 97 grader, Imou 98.\n\nStrömmen går båda vägarna. Har du en gammal ringklocktransformator bakom tamburklockan kan du koppla in den på 8 till 24 volt och slippa ladda. Har du ingen räcker batteriet på 10 000 mAh länge. Det gör den till en av få produkter här som passar både i villan från 1974 och i den nybyggda radhuslängan, och det är den avgörande skillnaden mot Reolink, som måste ha ström.\n\nSpotlighten ger färg i mörker i stället för svartvitt infrarött, vilket betyder att en jacka har en färg och en bil ett märke när du tittar på klippet dagen efter. Sekretesszonerna finns, högst fyra, med brasklappen att de följer med vyn om enheten flyttas eller vrids. För en fast skruvad dörrklocka gäller det bara den dag du justerar vinkeln. Gör du det: rita om zonerna.\n\nDen kostar 291 kronor mer än Reolink, och laddaren ligger inte i lådan trots att batteriet ska laddas.\n\nKöp den om du vill se paketet på trappen och slippa dra ström. Det är den bästa batteridrivna dörrklockan i jämförelsen, och den enda som ser hela vägen ner till tröskeln.",
  },
  {
    id: "aqara-g410",
    name: "Aqara Doorbell Camera Hub G410",
    shortName: "G410",
    brand: "Aqara",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "aqara-g410"),
    tagline: "Allt som behövs ligger i lådan, inklusive batterierna.",
    /* integritet 4,5 → 5,0 den 2026-08-06. Den halva poängen satt på att
       Aqaras uppgift står på en produktsida och inte i en supportartikel med
       versionsdatum, alltså på hur källan såg ut och inte på vad varan gör.
       Maskeringen har inget förbehåll och hör på skalans översta steg. */
    scores: { integritet: 5, bild: 3.5, signalen: 5, kostnad: 4.5, prisvarde: 3.5 },
    price: 1619,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/aqara-doorbell-camera-hub-g410-smart-dorrklocka-med-hubb-vit-p56572",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för dig som ändå ska köpa en hubb",
    pros: [
      "Chime-hubb, sex AA-batterier, kilbeslag, skruvmejsel och skruvar ingår, så inget behöver köpas till",
      "Maskerade områden blockeras helt i inspelningen, utan förbehåll för hur enheten sitter",
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
      { label: "Abonnemang", value: "Nej, allt lokalt", highlight: true },
      { label: "Lagring", value: "microSD upp till 512 GB" },
      { label: "Protokoll", value: "Zigbee, Thread, Matter, wifi, Bluetooth" },
    ],
    verdict:
      "Aqara G410 är den enda dörrklockan du kan montera färdigt samma kväll du köper den. Allt ligger i lådan, batterier och kilbeslag inräknade. 1 619 kronor.\n\nI lådan ligger dörrklockan, en chime-hubb, sex AA-batterier, ett kilbeslag för att vinkla enheten, skruvar, pluggar och en skruvmejsel. Aqara har alltså tänkt igenom att den som köper en dörrklocka en tisdagskväll inte har ett kilbeslag hemma. Jämför med Ring, som skickar med ett demonteringsverktyg och räknar med att du använder telefonen som ringklocka.\n\nMaskeringen är lika stark som Reolinks. Maskerade områden blockeras helt under inspelning, och eftersom G410 sitter fast utan panorering finns ingen av de rörelserelaterade brasklapparna som drar ner Arlo och Tapo. Den som bor så att grannens dörr ligger i bild har två produkter att välja mellan här, och det här är den ena.\n\nDen inbyggda Matter- och Thread-hubben är det egentliga skälet att välja den. Står du ändå inför att köpa en hubb är prisskillnaden mot en enklare dörrklocka inte 400 kronor utan negativ, och dörrklockan blir samtidigt navet för resten av hemmet.\n\nUpplösningen är lägst bland de fyra som fungerar utan abonnemang, och särskilt det vertikala måttet på 1536 pixlar är märkbart mot Tapos 1920. Molnbackupen fungerar bara i kabelansluten drift, vilket är en märklig begränsning på en produkt som levereras med batterier. Och den har inga kundomdömen alls hos butiken, så ingen har gått före dig.\n\nKöp den om du ändå står inför att köpa en Matter-hubb. Då är prisskillnaden mot en enklare dörrklocka i praktiken borta, och du får kategorins bästa maskering på köpet.",
  },
  {
    id: "reolink-d340w",
    name: "Reolink D340W 2K",
    shortName: "D340W",
    brand: "Reolink",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "reolink-d340w"),
    tagline: "Döljer grannens dörr och ringer inne i hallen.",
    /* signalen 2 → 5 och prisvärde 4 → 5 den 2026-08-06. Sidan skrev att
       ingen signalenhet ingår och att produkten kräver en befintlig
       ringklockledning. Båda var fel, och båda svaren stod i Kjells egen
       specifikation på den sida vi redan länkade: rutan "I paketet" listar
       Reolink-ringklocka och strömadapter med 1,5 m kabel plus
       förlängningskablar på 4,5 och 0,1 m. Reolinks egen produktsida säger
       samma sak: "Plug in the included Chime to an electrical outlet" och
       "Use the included adapter for a direct power source, or connect it to
       your existing doorbell wiring". Läst 2026-08-06.

       bild 4,5 → 4,0 samma dag. Kriteriet väger uttryckligen vertikalt
       synfält och färgseende i mörker tyngst, och Reolink har 97° vertikalt
       mot D235:s 140 och svartvitt IR mot D235:s färg. Förinspelningen och
       20 fps väger upp en del, inte allt. */
    scores: { integritet: 5, bild: 4, signalen: 5, kostnad: 5, prisvarde: 5 },
    price: 1199,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/reolink-d340w-2k-video-dorrklocka-p60397",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 4, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för dig som har grannar nära inpå",
    pros: [
      "Sekretesszonen svartar ut området i både direktbild och inspelning, och gäller hela Reolinks sortiment",
      "Spelar in sex sekunder före händelsen, så du ser vad som hände innan det ringde",
      "Ringklocka och strömadapter ligger i lådan, tillsammans med förlängningskablar på 4,5 meter",
      "2560 × 1920 med 20 bilder per sekund, den högsta bildfrekvensen i jämförelsen",
      "Minneskort i enheten plus stöd för Reolink NVR, och ingenting kräver abonnemang",
      "Ethernet-port utöver wifi på 2,4 och 5 GHz, den stabilaste anslutningen av alla åtta",
    ],
    cons: [
      "Har inget batteri: adaptern måste nå ett eluttag, eller enheten en befintlig ringklockledning",
      "97 grader vertikalt mot Tapo D235:s 140, så paketet vid tröskeln syns sämre",
      "Svartvitt infrarött mörkerseende, medan Tapo D235 och Arlo ser i färg",
      "Drift bara ner till tio minusgrader, den snålaste temperaturgränsen här",
      "Bara fyra kundomdömen hos butiken",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, svartas i inspelningen", highlight: true },
      { label: "Synfält", value: "134° × 97°, 180° diagonalt", highlight: true },
      { label: "Upplösning", value: "2560 × 1920, 20 fps", highlight: true },
      { label: "Signalenhet", value: "Ingår, 433 MHz till eluttag", highlight: true },
      { label: "Ström", value: "12 till 24 VAC, adapter ingår", highlight: true },
      { label: "Abonnemang", value: "Nej, allt lokalt", highlight: true },
      { label: "Förinspelning", value: "6 sekunder" },
      { label: "Lagring", value: "microSD och Reolink NVR" },
    ],
    verdict:
      "Reolink D340W kostar 1 199 kronor, och i lådan ligger både ringklockan och strömadaptern. Den är billigast av de åtta och den enda där ingenting behöver köpas till.\n\nMaskeringen är den starkaste här. Sekretesszonen svartar ut området i både direktbild och inspelning och gäller hela Reolinks sortiment, utan något förbehåll som träffar en fast skruvad dörrklocka. Det är den funktion som avgör om du kan sätta upp dörrklockan när gångvägen fram är gemensam eller när grannens dörr ligger mittemot din.\n\nSex sekunders förinspelning har ingen annan. Dörrklockan buffrar bilden hela tiden och sparar sekunderna före tryckningen, vilket märks när någon gått fram, provat handtaget och sedan ringt på. En vanlig dörrklocka börjar spela in vid tryckningen och missar alltihop. Lägg till 20 bilder per sekund och en Ethernet-port för den som hellre drar kabel än litar på wifi vid ytterdörren.\n\nHaken är att den inte har något batteri. Den vill ha 12 till 24 volt, antingen från adaptern i ett vanligt uttag eller från en befintlig ringklockledning. Kablarna i lådan räcker drygt sex meter, vilket tar sig genom en yttervägg till hallen, men ett uttag måste finnas. Och 97 grader vertikalt är mindre än Tapo D235:s 140, så paketet vid tröskeln syns sämre.\n\nKöp den. Den döljer det som ska döljas, den ringer inne i hallen, den sparar på minneskort utan abonnemang och den kostar minst av alla åtta.",
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
    superlative: "Bäst för dig som vill ha det beprövade",
    pros: [
      "158 kundomdömen med snittet 4,5, mer än dubbelt så många som näst mest omdömda",
      "Signalenhet ingår och sätts i ett eluttag inomhus",
      "2K 5 MP, samma upplösning som storebror D235",
      "Löstagbart batteri på 6 700 mAh, som byts utan att dörrklockan skruvas ner",
      "Minneskort i enheten och Tapo Care som frivilligt tillägg",
      "Sekretesszon som svartar ut delar av bilden",
    ],
    cons: [
      "160 grader diagonalt, alltså smalare bild än D235:s 180 horisontellt och 140 vertikalt",
      "IP64 mot IP65 för Reolink: tål stänk men inte stråle",
      "15 bilder per sekund",
      "Samma pris som D235, som har bredare synfält och färgseende i mörker",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, högst 4 zoner", highlight: true },
      { label: "Synfält", value: "160° diagonalt", highlight: true },
      { label: "Upplösning", value: "2K 5 MP, 2560 × 1920", highlight: true },
      { label: "Signalenhet", value: "Ingår, till eluttag", highlight: true },
      { label: "Ström", value: "Löstagbart batteri 6 700 mAh", highlight: true },
      { label: "Abonnemang", value: "Nej, allt lokalt", highlight: true },
      { label: "Vädertålighet", value: "IP64, -20 till 45 °C" },
      { label: "Mörkerseende", value: "850 nm IR, 10 m" },
    ],
    verdict:
      "Tapo D230S1 har 158 kundomdömen på 4,5, fler än dubbelt så många som näst mest omdömda. Signalenhet i lådan, 2K-sensor, minneskort i enheten och inget abonnemang. 1 490 kronor.\n\n158 omdömen med snittet 4,5 hos Kjell är den tydligaste signalen någon av dörrklockorna ger om att den fungerar i vardagen. Näst mest omdömda har 67. Omdömena påverkar inte rankningen, men de säger något om hur många som levt med produkten längre än några veckor.\n\nDen gör allt det viktiga rätt. Signalenhet i lådan, samma 2K-upplösning som storebror, sekretesszon, minneskort i enheten och ingen abonnemangstvång. Batteriet på 6 700 mAh är dessutom löstagbart, så det byts vid köksbordet i stället för uppe på stegen.\n\nProblemet är att den kostar exakt lika mycket som D235. För samma 1 490 kronor får du där 180 grader horisontellt och 140 vertikalt i stället för 160 diagonalt, färgseende i mörker i stället för svartvitt infrarött, batteri på 10 000 mAh och möjlighet att koppla in fast ström. Det finns inget mått där D230S1 är bättre.\n\nKöp den bara om den är rejält billigare än D235 den dag du handlar. Är priset detsamma finns det ingen anledning, med ett undantag: 158 omdömen mot 67 är en verklig skillnad i hur mycket produkten är prövad, och den som hellre köper det beprövade än det bättre på papperet har ett försvarbart skäl.",
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
    /* integritet 2,0 → 1,5 den 2026-08-06. Det gamla betyget satt på att
       varken butiken eller specifikationen nämnde sekretesszon, alltså på
       vad vi inte hittat. Det som går att belägga är vad Imou själva
       dokumenterar för modellen: databladet och tillverkarens produktsida
       räknar båda upp funktionerna och zonen som finns är en detekteringszon
       ("customizable detection setting"), som styr notiser. Samma steg som
       Google Nest, av samma skäl. Imou marknadsför "Privacy Mask" uttryckligen
       på de modeller som har det, till exempel Ranger Pro. */
    scores: { integritet: 1.5, bild: 3.5, signalen: 5, kostnad: 4.5, prisvarde: 4.5 },
    price: 990,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/imou-doorbell-2s-2k-tradlos-videodorrklocka-med-ringklocka-p66323",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 34, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst för en snäv budget",
    pros: [
      "990 kronor, lägsta priset av dörrklockorna, och ringklockan ingår",
      "Ringklockan fungerar som wifi-förstärkare och ger bättre täckning vid dörren",
      "Minneskortet sitter i ringklockan inomhus och inte i enheten på fasaden",
      "5 000 mAh batteri, och kan i stället kopplas till 8 till 24 V om du har kabel",
      "98 grader vertikalt tar både ansiktet och paketet på marken",
      "Angiven för drift ner till 20 minusgrader",
    ],
    cons: [
      "Zonen Imou dokumenterar är en detekteringszon: den styr notiser, inte vad som spelas in",
      "15 bilder per sekund, lägst av de åtta, vilket märks på rörelse",
      "Mörkerseende upp till 5 meter, kortast räckvidd av alla här",
      "Batteriet får enligt Imous eget datablad bara laddas mellan 0 och 45 grader, alltså inomhus på vintern",
      "Imou ägs av Dahua, och appen är den enda vägen till bilden",
    ],
    specs: [
      { label: "Sekretesszon", value: "Nej, bara detekteringszon", highlight: true },
      { label: "Synfält", value: "125° × 98°, 166° diagonalt", highlight: true },
      { label: "Upplösning", value: "3 MP, 2048 × 1536", highlight: true },
      { label: "Signalenhet", value: "Ingår, med microSD och wifi-förstärkare", highlight: true },
      { label: "Ström", value: "5 000 mAh batteri eller 8 till 24 V", highlight: true },
      { label: "Abonnemang", value: "Nej, allt lokalt", highlight: true },
      { label: "Lagring", value: "microSD upp till 512 GB i ringklockan" },
      { label: "Bildfrekvens", value: "Upp till 15 fps" },
      { label: "Mörkerseende", value: "Upp till 5 m" },
      { label: "Drifttemperatur", value: "-20 till 50 °C" },
    ],
    verdict:
      "Imou 2S kostar 990 kronor och har ändå en riktig ringklocka i lådan, med minneskortet inomhus i stället för i enheten på fasaden. Det är den billigaste vägen till en dörrklocka som faktiskt ringer.\n\nRingklockan är inte bara en högtalare: den håller minneskortet och fungerar som wifi-förstärkare. Att kortet sitter inomhus är en verklig fördel, eftersom den som river ner dörrklockan från fasaden inte får med sig inspelningen. Det är ett grepp ingen av de dyrare produkterna har kopierat.\n\nSynfältet räcker. 125 grader horisontellt och 98 vertikalt tar både ansiktet framför dörren och paketet på marken, vilket är mer vertikalt än Reolink klarar. Batteriet på 5 000 mAh går att byta mot fast ström om du har kabel sedan tidigare, och den är angiven ner till 20 minusgrader.\n\nDet som håller ner den är zonen. Den zon Imou dokumenterar för modellen är en detekteringszon, alltså den sort som bestämmer när dörrklockan larmar. Materialet spelas in ändå. Vill du att grannens dörr eller trottoaren ska svartas ut i bilden är det inte den här produkten, och för en dörrklocka är det den funktion som avgör var du får sätta upp den.\n\nTvå tal till är svaga. 15 bilder per sekund är lägst här och syns när någon rör sig snabbt förbi, och mörkerseendet slutar vid fem meter mot tio eller mer hos de andra. Lägg till att batteriet bara får laddas mellan noll och 45 grader, så vintern innebär en tur in i hallen med enheten.\n\nKöp den om budgeten är knapp och du vill ha ringklockan i lådan. Ska grannens dörr döljas är Reolink D340W 209 kronor dyrare och löser det.",
  },
  {
    id: "arlo-essential-doorbell-2",
    name: "Arlo Essential Doorbell 2 2K",
    shortName: "Essential Doorbell 2",
    brand: "Arlo",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "arlo-essential-doorbell-2"),
    tagline: "180 grader och 1 090 kronor, sedan börjar månadskostnaden.",
    /* integritet 3,5 → 3,0 den 2026-08-06, efter att skalan gjorts om.
       Arlos zoner raderas vid ändrat synfält, zoom och rotering, alltså vid
       åtgärder i appen och inte bara om du skruvar loss enheten. Det är
       skalans steg 3,0. TP-Link ligger kvar på 4,0, där förbehållet kräver
       att dörrklockan fysiskt flyttas. */
    scores: { integritet: 3, bild: 3.5, signalen: 2, kostnad: 1.5, prisvarde: 3 },
    price: 1090,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/arlo-essential-doorbell-2-2k-tradlos-dorrklocka-p65824",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 13, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för dig som redan har Arlo",
    pros: [
      "1 090 kronor, näst lägst pris bland de åtta vi rankar",
      "180 graders synfält i 2K, och färg i mörker",
      "Sekretesszoner som svartar ut delar av bilden",
      "Kabelfri installation på några minuter, batteritid 4 till 6 månader",
      "Inbyggt inbrottslarm som kan utlösas från appen",
    ],
    cons: [
      "Ingen signalenhet i lådan, Arlo Chime 2 säljs som separat artikel",
      "Att spara videoklipp kräver Arlo Secure, 99 kronor i månaden eller 1 089 om året",
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
      { label: "Abonnemang", value: "99 kr/mån för att spara", highlight: true },
      { label: "Modellnummer", value: "AVD4001" },
      { label: "Siren", value: "Inbyggd, styrs från appen" },
    ],
    verdict:
      "Arlo Essential Doorbell 2 kostar 1 090 kronor och ger 180 graders synfält i 2K, färg i mörker och ett inbyggt larm. Sedan börjar månadskostnaden.\n\nDet är näst billigast bland de åtta, 100 kronor över Imou. För det får du 180 graders synfält i 2K, färg i mörker, ett inbyggt larm och en installation som tar en kvart eftersom ingen kabel behöver dras. Sekretesszoner finns och svartar ut delar av bilden.\n\nDet ligger ingen ringklocka i lådan. Arlo Chime 2 är en separat artikel hos samma butik. Utan den finns det ingen signal någonstans i bostaden, bara en notis i telefonen, och det är inte vad de flesta menar med en dörrklocka.\n\nOch att spara ett klipp kräver abonnemang. Det finns ingen lokal lagring, så utan Arlo Secure ser du besökaren i realtid och kan prata med den, men i morgon finns ingenting kvar. Abonnemanget kostar 99 kronor i månaden för en enhet, eller 1 089 om året. Fem år med dörrklockan uppe blir alltså 1 090 kronor för hårdvaran och 5 445 för att få behålla det den filmar, och då är den här sidans dyraste produkt plötsligt den billigaste.\n\nZonerna har dessutom Arlos brasklapp: de raderas automatiskt om du ändrar synfältet, zoomar eller roterar bilden. På en fast dörrklocka är det mindre allvarligt än på en roterande kamera, men det är värt att veta att inställningen är ömtålig.\n\nSom budgetval fungerar den om du redan är i Arlos ekosystem och redan betalar. Som fristående köp är den dyrare än de dyra.",
  },
  {
    id: "ring-battery-video-doorbell",
    name: "Ring Battery Video Doorbell 2K",
    shortName: "Battery Doorbell",
    brand: "Ring",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "ring-battery-video-doorbell"),
    tagline: "Kvadratisk bild som ser hela dörren, och ingenting som sparas.",
    /* integritet 4,0 → 3,0 den 2026-08-06, efter att skalan gjorts om. Ring
       har två sekretesszoner, men skriver själva att rörelsedetektorn känner
       av området inuti zonen. Det är skalans steg 3,0: zonen finns, men
       tillverkaren reserverar sig för att den inte gäller fullt ut. */
    scores: { integritet: 3, bild: 4, signalen: 1, kostnad: 1.5, prisvarde: 2 },
    price: 1299,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/ring-battery-video-doorbell-retinal-2k-speckled-grey-p66871",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för dig som vill se hela dörren",
    pros: [
      "1920 × 1920 pixlar ger kvadratisk bild och 140 grader i både höjd och bredd",
      "Ser ansikte och paket i samma bild utan att något beskärs bort",
      "Två sekretesszoner, skilda från rörelsezonerna",
      "Batteri som byts utan att dörrklockan skruvas ner",
      "Drift ner till tjugo minusgrader",
    ],
    cons: [
      "Ingen signalenhet i lådan: dörrklocka, kabel, monteringssats, verktyg och guide",
      "Ingen lokal lagring, och inspelning kräver abonnemang",
      "Rörelsedetektorn känner av området även inuti sekretesszonen",
      "Inga kundomdömen alls hos butiken",
      "1 299 kronor, plus ringklocka, plus 3,99 euro i månaden för att något ska sparas",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, 2 zoner", highlight: true },
      { label: "Synfält", value: "140° × 140°", highlight: true },
      { label: "Upplösning", value: "2K, 1920 × 1920", highlight: true },
      { label: "Signalenhet", value: "Nej, ingår ej", highlight: true },
      { label: "Ström", value: "Batteri, USB-C", highlight: true },
      { label: "Abonnemang", value: "3,99 €/mån för inspelning", highlight: true },
      { label: "Storlek", value: "53,6 × 35,8 × 146,8 mm" },
      { label: "Drifttemperatur", value: "-20 till 48 °C" },
    ],
    verdict:
      "Ring Battery Video Doorbell har det bästa bildformatet av de åtta: 1920 × 1920 pixlar med 140 grader i både höjd och bredd.\n\nDen kvadratiska bilden är genuint smart och underskattad. 1920 × 1920 pixlar med 140 grader i både höjd och bredd betyder att en person som står precis vid dörren syns från hjässa till skor, och att ett paket på trappen ligger inom bild utan att du behöver välja mellan de två. De flesta dörrklockor har ett brett men platt synfält och tvingar fram just det valet.\n\nSekretesszonerna är två, och de är en annan funktion än rörelsezonerna. Brasklappen är Rings egen: rörelsedetektorn känner av området även inuti sekretesszonen, så du får notiser om det du valt att inte se.\n\nSedan lådan. I den ligger dörrklockan, en USB-C-kabel, en monteringssats, ett demonteringsverktyg och en snabbstartsguide. Ingen ringklocka. Du kan alltså inte höra att någon ringer på om du inte har telefonen på dig, och en dörrklocka som kräver att du bär mobilen i handen inomhus är en kamera med knapp.\n\nOch lagringen. Det finns ingen lokal. Utan abonnemang får du en notis och en direktbild, men i morgon finns ingenting kvar att visa någon. För en produkt vars främsta uppgift är att dokumentera vem som stod vid din dörr är det en märklig grundinställning. Ring Basic täcker en dörrklocka för 3,99 euro i månaden eller 39,99 om året.\n\n1 299 kronor är inte dyrt. Samma summa plus en ringklocka plus fem år på Ring Basic är något helt annat, och det är den summan som ska ställas mot Reolinks 1 199 kronor en gång.\n\nKöp den om du redan har Ring i huset. Börjar du från noll får du mer för pengarna hos TP-Link.",
  },
  {
    id: "google-nest-doorbell",
    name: "Google Nest Doorbell, batteri",
    shortName: "Nest Doorbell",
    brand: "Google",
    image: productImage(DORRKLOCKA_MED_KAMERA.slug, "google-nest-doorbell"),
    tagline: "Stående bildformat, och igenkänning som stannar i huset.",
    /* integritet 1,0 → 1,5 den 2026-08-06. Det gamla betyget var satt på att
       vi inte hittat någon dokumentation, alltså på vår research. Det som
       går att belägga står i Googles egen hjälptext för Activity Zones:
       "Although Activity Zones doesn't change the footage your camera streams
       and records". Zonen finns alltså, och den är av notissorten. Det är
       skalans nedersta steg, samma som Imou. Läst 2026-08-06. */
    scores: { integritet: 1.5, bild: 3.5, signalen: 1.5, kostnad: 2, prisvarde: 1.5 },
    price: 1990,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/smarta-dorrklockor/google-nest-doorbell-batteri-dorrklocka-med-kamera-p51847",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 59, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för dig som har Google i huset",
    pros: [
      "960 × 1280 i stående format tar hela vägen från ansikte till dörrmatta",
      "Maskininlärningen körs på enheten och inte i molnet, vilket få konkurrenter gör",
      "59 kundomdömen med snittet 4,5, näst flest av de åtta",
      "Livesändning dygnet runt och HDR även i mörkerläget",
      "Inbyggd magnetometer och säker uppstart, en genomtänkt maskinvarusäkerhet",
    ],
    cons: [
      "Zonerna är aktivitetszoner, som enligt Google inte ändrar vad kameran spelar in",
      "1,3 megapixel, lägst upplösning bland de åtta",
      "Ingen signalenhet i lådan, ingen lokal lagring, och 100 kr i månaden för längre historik",
      "1 990 kronor, dyrast av dörrklockorna",
      "IP54 och drift bara ner till tjugo minusgrader, sämst vädertålighet här",
    ],
    specs: [
      { label: "Sekretesszon", value: "Nej, bara aktivitetszon", highlight: true },
      { label: "Synfält", value: "145° diagonalt, stående", highlight: true },
      { label: "Upplösning", value: "960 × 1280, 1,3 MP", highlight: true },
      { label: "Signalenhet", value: "Nej, ingår ej", highlight: true },
      { label: "Ström", value: "Batteri, USB", highlight: true },
      { label: "Abonnemang", value: "100 kr/mån för historik", highlight: true },
      { label: "Igenkänning", value: "På enheten, inte i molnet" },
      { label: "Vädertålighet", value: "IP54, -20 till 40 °C" },
    ],
    verdict:
      "Google Nest Doorbell har stående bildformat och kör igenkänningen på enheten i stället för i molnet. 59 kundomdömen på 4,5 säger att den fungerar.\n\nBildformatet är stående, 960 × 1280, vilket är rätt form för en dörr: du ser en människa från hjässa till fötter och paketet på trappen utan att något beskärs. Igenkänningen körs på själva enheten och inte i molnet, tvärtemot Arlo, där samma funktion är en abonnemangstjänst som förutsätter att bilden lämnar huset. Och 59 kundomdömen med 4,5 i snitt säger att den fungerar.\n\nZonerna är sedan sakens kärna, och de är av fel sort. Google erbjuder aktivitetszoner, och skriver själva att en aktivitetszon inte ändrar vad kameran sänder och spelar in. Zonen bestämmer var du får en notis. Trottoaren, grannens dörr och den som går förbi hamnar i inspelningen ändå, och det är precis den situation IMY beskriver när gångvägen fram till dörren är gemensam.\n\nDärutöver: 1,3 megapixel är lågt även för stående format, det ligger ingen ringklocka i lådan, och 1 990 kronor är dyrast här. Lokal lagring saknas, så längre historik kräver Google Home Premium, som Nest Aware numera heter, för 100 kronor i månaden eller 1 000 om året. IP54 innebär dessutom att den tål stänk men inte slagregn, vilket är tunt för en produkt som sitter ute året om.\n\nKöp den om du har Google-högtalare i huset, vill ha igenkänningen lokalt och har en entré där ingenting utanför din egen tomt hamnar i bild. Ska något döljas är Reolink D340W både billigare och rätt verktyg.",
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
      "1 799 kronor för 1080p, alltså näst högsta priset för den lägsta upplösningen i hela urvalet. Den saknar dessutom batteri helt och kräver antingen en befintlig ringklockledning på 8 till 24 volt eller Yales strömadapter, som säljs separat, medan Reolink löser samma sak med en adapter i lådan för 600 kronor mindre. Fordons-, paket- och husdjursdetektering är märkta med asterisk och kräver abonnemang. Värt att veta ändå: Kjells specifikation skiljer på Detekteringszon och Sekretesszon i två separata rader, vilket är rätt begreppsskillnad och mer än de flesta gör.",
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
      "Reolink D340W för 1 199 kronor hos Kjell. Den är billigast av de åtta och ändå den enda där ingenting behöver köpas till: ringklockan och strömadaptern ligger i lådan. Sekretesszonen svartar ut grannens dörr i både direktbild och inspelning, den sparar sex sekunder före tryckningen och den kräver inget abonnemang. Vill du slippa dra ström är TP-Link Tapo D235 för 1 490 kronor den bästa batteridrivna, och den ser dessutom 140 grader vertikalt, hela vägen ner till paketet på trappen.",
  },
  {
    question: "Får jag sätta upp en dörrklocka med kamera i lägenhet?",
    answer:
      "Inte inom privatundantaget. Integritetsskyddsmyndigheten har ett eget exempel för just det: sker bevakningen från en lägenhetsdörr och förbipasserande i trapphuset eller grannars lägenheter riskerar att komma med i bild, då gäller GDPR och kamerabevakningslagen i stället. Det betyder inte att produkten är förbjuden, men du måste då ha en rättslig grund, göra en intresseavvägning och informera om bevakningen, och IMY skriver att bevakning som träffar grannar sällan är tillåten. Fråga också din bostadsrättsförening eller hyresvärd, eftersom ytterdörren ofta är föreningens och inte din.",
  },
  {
    question: "Ringer det inne i bostaden eller bara i telefonen?",
    answer:
      "Det beror helt på modell, och det är den skillnad som märks mest i vardagen. Fem av åtta har en signalenhet i lådan: Tapo D230S1, Tapo D235, Aqara G410, Reolink D340W och Imou 2S, där ringklockan dessutom håller minneskortet. Ring, Arlo och Google Nest levererar ingen, utan säljer den som separat tillbehör. Utan signalenhet hör du bara notisen i telefonen, vilket inte fungerar när mobilen ligger på ljudlöst eller laddar i ett annat rum.",
  },
  {
    question: "Behöver jag dra ström till dörrklockan?",
    answer:
      "Inte nödvändigtvis. De flesta av dörrklockorna är batteridrivna och skruvas upp på en kvart. Två undantag saknar batteri: Reolink D340W och Yale. Reolink löser det med en strömadapter i lådan, så det räcker med ett eluttag inom drygt sex meter; Yales adapter säljs separat. Har du en gammal ringklocktransformator bakom tamburklockan kan du använda den i stället, och då slipper du både ladda och dra sladd. Tapo D235, Aqara G410 och Imou 2S klarar båda vägarna.",
  },
  {
    question: "Vad ska jag titta på i synfältet?",
    answer:
      "Det vertikala måttet, som nästan aldrig jämförs. En dörrklocka med brett men platt synfält ser ansiktet på den som står framför och en bit himmel, men inte paketet vid tröskeln. Tapo D235 anger 140 grader vertikalt och Ring har kvadratisk bild med 140 grader i båda riktningarna, vilket i praktiken betyder från hjässa till skor. Google Nest löser det med stående bildformat. Upplösningen spelar mindre roll än formatet på det här avståndet.",
  },
  {
    question: "Krävs abonnemang för en dörrklocka med kamera?",
    answer:
      "För fem av åtta i vår jämförelse: nej. Tapo D230S1, Tapo D235, Reolink D340W och Aqara G410 sparar allt på ett minneskort i enheten, och Imou 2S gör det i ringklockan inomhus. De tre andra kostar pengar varje månad så länge du äger dem. Ring spelar inte in något alls utan abonnemang, och Ring Basic går på 3,99 euro i månaden eller 39,99 om året för en dörrklocka. Arlo kräver Arlo Secure för att spara klipp, 99 kronor i månaden eller 1 089 om året för en enhet. Google Nest ger en kort gratis händelsehistorik, och Google Home Premium, som Nest Aware numera heter, kostar 100 kronor i månaden eller 1 000 om året. Räknat över fem år lägger du alltså 5 445 kronor på Arlos abonnemang utöver de 1 090 dörrklockan kostar.",
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
