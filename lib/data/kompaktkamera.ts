import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { KOMPAKTKAMERA } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /kompaktkamera.
 *
 * Priser, produktnamn, bilder och kundbetyg är lästa i butikernas egen
 * JSON-LD på PRICE_CHECKED. **Samtliga specifikationer är hämtade hos
 * tillverkaren**, inte hos butiken: Canon, Sony, Fujifilm, Panasonic, Ricoh
 * Imaging och OM System publicerar alla fullständiga specifikationsblad, och
 * butikerna i den här kategorin gör det inte.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i länken i dag. Inget
 * `affiliateUrl` finns, eftersom vi inte har något program i kategorin. Se
 * lib/links.ts.
 *
 * ## Två butiker, och det är hela utbudet
 *
 * Nio av tio länkar går till Scandinavian Photo. Det bryter mot vanan att
 * sprida länkarna över flera butiker, och skälet är att kategorin bara har två
 * butiker med sortimentet. Kedjorna har lämnat den: Elgigantens
 * kompaktkamerakategori är Kodak PixPro plus namnlösa marknadsplatsartiklar,
 * och Komplett har ingenting alls.
 *
 * Där CyberPhoto har exakt samma pris — G7 X Mark III 10 990, X half 7 990,
 * RX100 VII 12 890 och IXUS 285 4 675 — är ett byte fritt och bör göras vid
 * nästa prisrunda. Sony ZV-1F ligger 200 kronor dyrare hos CyberPhoto och
 * flyttas inte. Se .agent/research/kompaktkamera.md §2b.
 *
 * ## Vikten är normaliserad
 *
 * `Vikt` gäller kameran med batteri och minneskort. Canon, Sony, Fujifilm och
 * Ricoh anger alla det måttet. OM System anger 249 gram utan batteri och kort
 * för TG-7, och den cellen står tom hellre än att väga mot andras 302. En
 * publicerad siffra som inte är jämförbar är värre än en tom cell, samma läxa
 * som Elons viktfält på /bluetooth-hogtalare.
 *
 * ## Kundbetyg bara där antalet är minst tre
 *
 * Sony ZV-1F har 1,0 av 5 efter ett enda omdöme, och Canon PowerShot V1,
 * Fujifilm X half, Canon SX740 och Panasonic TZ99 har ett omdöme var. Ett
 * ensamt omdöme säger ingenting om produkten och mycket om slumpen. Kvar blir
 * G7 X Mark III, TG-7 och IXUS 285. Betygen vägs aldrig in, se
 * .claude/context/data.md.
 *
 * ## Bländaren för SX740 HS Lite Edition
 *
 * Canons sida för Lite Edition anger objektivet till 4,3–172 mm med 40x men
 * utan bländartal. Canons eget specifikationsblad för PowerShot SX740 HS, med
 * identiskt objektiv och identisk zoom, anger f/3,3–6,9. Det är talet som står
 * i cellen.
 *
 * ## Modellerna är återutgivna, inte utgångna
 *
 * Ett utkast skulle ha skrivit att fältets äldre kameror inte längre
 * tillverkas. Canon säljer G7 X Mark III som aktuell produkt plus en
 * 30-årsjubileumsutgåva, 2018 års SX740 som `Lite Edition` och 2016 års
 * IXUS 285 som `285 HS A`. Vad suffixen skiljer mot originalet är inte
 * fastställt och påstås ingenstans.
 */

export const PRICE_CHECKED = "2026-08-06";

const SEEDS: ProductSeed[] = [
  {
    id: "canon-powershot-v1",
    brand: "Canon",
    name: "PowerShot V1",
    image: productImage(KOMPAKTKAMERA.slug, "canon-powershot-v1"),
    tagline: "Sensor på 1,4 tum, störst av alla tio och 1 500 kronor billigare än G7 X.",
    scores: {
      /* 5,0: 1,4-tum är den största sensorn i fältet, och f/2,8 gäller hela
         vägen från 16 till 50 mm. G7 X Mark III är ljusare i vidvinkel men har
         en mindre sensor och tappar till f/2,8 vid 100 mm. */
      sensor: 5,
      /* 1,5: 16–50 mm är fältets kortaste omfång efter de två med fast
         brännvidd. Vidvinkeln är bred, men bortom fem meter tar den slut. */
      rackvidd: 1.5,
      /* 4,5: enda kameran med både mikrofoningång och hörlursuttag, 4K i 60
         bilder per sekund med beskuren bild och vridbar skärm. */
      video: 4.5,
      /* 3,5: optisk stabilisering, men Canon publicerar inget stegtal. Skalan
         graderar typen, så den hamnar mellan de fyrastegsstabiliserade och de
         elektroniska. */
      stabilisering: 3.5,
      /* 4,5: största sensorn, mest video och 1 500 kronor under G7 X Mark III. */
      prisvarde: 4.5,
    },
    price: 9490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/powershot-v1-1102791",
    award: "winner",
    superlative: "Bäst för dig som filmar mest",
    pros: [
      "Sensorn mäter 1,4 tum, alltså större än på någon annan kamera här, och samlar mest ljus när kvällen kommer",
      "Både mikrofoningång och hörlursuttag på 3,5 mm, vilket ingen av de nio andra har",
      "f/2,8 hela vägen genom zoomen, så bilden blir inte mörkare när du zoomar in",
    ],
    cons: [
      "426 gram, alltså 122 gram tyngre än G7 X Mark III och den enda här som känns i en jackficka",
      "16 till 50 millimeter räcker till rummet och gruppen, men inte till fågeln i trädet. Vill du zooma tar du Panasonic TZ99",
      "4K i 60 bilder per sekund kräver beskuren bild, så den vida bildvinkeln försvinner när du filmar snabbt",
    ],
    specs: [
      { label: "Sensorstorlek", shortLabel: "Sensor", value: "1,4 tum", highlight: true },
      { label: "Effektiv upplösning", shortLabel: "Upplösning", value: "22,3 MP", highlight: true },
      { label: "Brännvidd", shortLabel: "Brännvidd", value: "16–50 mm", highlight: true },
      { label: "Optisk zoom", shortLabel: "Zoom", value: "3,1x", highlight: true },
      { label: "Största bländare", shortLabel: "Bländare", value: "f/2,8", highlight: true },
      { label: "Bildstabilisering", shortLabel: "Stabilisering", value: "Optisk", highlight: true },
      { label: "Video", shortLabel: "Video", value: "4K 30 b/s", highlight: true },
      { label: "Mikrofoningång", shortLabel: "Mik-in", value: "3,5 mm", highlight: true },
      { label: "Sökare", shortLabel: "Sökare", value: "Nej", highlight: true },
      /* 426 g enligt CIPA, ur Canons egen bruksanvisning. Både canon.se och
         canon.co.uk lämnar viktfältet tomt på produktsidan. */
      { label: "Vikt", shortLabel: "Vikt", value: "426 g", highlight: true },
      { label: "Mått", value: "118,3 × 68,0 × 52,5 mm" },
      { label: "Laddning", value: "USB-C" },
    ],
    verdict:
      "Canon PowerShot V1 har en sensor på 1,4 tum, den största bland de tio kamerorna här. Den kostar 9 490 kronor, alltså 1 500 mindre än Canons egen G7 X Mark III som har en mindre sensor.\n\nStorleken på sensorn är det som avgör hur bilden ser ut när ljuset tar slut, och det är i praktiken varje inomhusmiljö efter oktober. Objektivet håller dessutom f/2,8 hela vägen genom zoomen, så bilden blir inte mörkare när du zoomar in. **Den är också enda kameran här med både mikrofoningång och hörlursuttag**, vilket betyder att du kan sätta på en mygga och samtidigt höra att den fungerar. Den inbyggda mikrofonen sitter centimeter från dina egna fingrar och tar upp varje gång du rör zoomen.\n\nDen väger 426 gram och det märks. G7 X Mark III väger 304 och Canons egen IXUS 146. Objektivet går dessutom bara till 50 millimeter, så motivet på andra sidan fotbollsplanen blir en prick.\n\nSka du fota och filma familjen, resan och middagarna är det här kameran du ska ha. Vill du åt fågeln i trädet eller barnet längst bort på planen finns inget alternativ i den här klassen, då tar du Panasonic TZ99 och accepterar en fjärdedel så stor sensor.",
  },
  {
    id: "canon-powershot-g7-x-mark-iii",
    userRating: { value: 4.7, count: 3, checkedAt: PRICE_CHECKED },
    brand: "Canon",
    name: "PowerShot G7 X Mark III",
    shortName: "PowerShot G7 X III",
    image: productImage(KOMPAKTKAMERA.slug, "canon-powershot-g7-x-mark-iii"),
    tagline: "f/1,8 i vidvinkel, ljusstarkaste objektivet bland de tio.",
    scores: {
      /* 4,5: 1,0-typ staplad sensor med fältets ljusaste objektiv i vidvinkel,
         f/1,8. Under PowerShot V1 eftersom sensorn är mindre och bländaren
         faller till f/2,8 vid 100 mm. */
      sensor: 4.5,
      /* 2,0: 24–100 mm, alltså kortare räckvidd än RX100 VII och TG-7 som båda
         når 200 mm. */
      rackvidd: 2,
      /* 4,0: 4K och mikrofoningång, men skärmen fälls bara uppåt och saknar
         hörlursuttag. */
      video: 4,
      /* 5,0: objektivförskjutning med ungefär fyra stegs verkan, delad högst
         med RX100 VII. */
      stabilisering: 5,
      /* 2,0: 10 990 kronor för en konstruktion från 2019, och PowerShot V1
         ger större sensor och mer video för 1 500 mindre. */
      prisvarde: 2,
    },
    price: 10990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/powershot-g7-x-iii-svart-6",
    superlative: "Bäst för ljus inomhus",
    pros: [
      "f/1,8 i vidvinkel släpper in dubbelt så mycket ljus som f/2,8, vilket är skillnaden mellan skarpt och suddigt i ett vardagsrum på kvällen",
      "Stabiliseringen tar ungefär fyra steg, så du kan hålla kameran fyra gånger längre still än utan den",
      "304 gram och 41 millimeter tjock, alltså den ryms i en kavajficka",
    ],
    cons: [
      "10 990 kronor för en kamera som kom 2019, och Canons egen PowerShot V1 ger större sensor för 9 490",
      "Zoomen slutar på 100 millimeter, en tredjedel av vad Canons egen IXUS 285 når för under halva priset",
      "Skärmen fälls bara uppåt, så du ser dig själv bara när kameran hålls under ansiktshöjd",
    ],
    specs: [
      { label: "Sensorstorlek", shortLabel: "Sensor", value: "1,0-typ", highlight: true },
      { label: "Effektiv upplösning", shortLabel: "Upplösning", value: "20,1 MP", highlight: true },
      { label: "Brännvidd", shortLabel: "Brännvidd", value: "24–100 mm", highlight: true },
      { label: "Optisk zoom", shortLabel: "Zoom", value: "4,2x", highlight: true },
      { label: "Största bländare", shortLabel: "Bländare", value: "f/1,8–2,8", highlight: true },
      { label: "Bildstabilisering", shortLabel: "Stabilisering", value: "Optisk, 4 steg", highlight: true },
      { label: "Video", shortLabel: "Video", value: "4K 30 b/s", highlight: true },
      { label: "Mikrofoningång", shortLabel: "Mik-in", value: "3,5 mm", highlight: true },
      { label: "Sökare", shortLabel: "Sökare", value: "Nej", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "304 g", highlight: true },
      { label: "Mått", value: "105,5 × 60,9 × 41,4 mm" },
      { label: "Laddning", value: "USB" },
    ],
    verdict:
      "Canon PowerShot G7 X Mark III har det ljusstarkaste objektivet på sidan, f/1,8 i vidvinkel. Den kostar 10 990 kronor och är näst dyrast här.\n\nBländartalet är hela argumentet. f/1,8 släpper in ungefär dubbelt så mycket ljus som f/2,8, och det är skillnaden mellan en skarp bild och en suddig när du fotograferar barnen vid middagsbordet i november. Stabiliseringen tar ungefär fyra steg, alltså fyra gånger längre slutartid på fri hand än utan den, och det är delad bästa här tillsammans med Sony RX100 VII. Med 304 gram och 41 millimeters tjocklek ryms den i en kavajficka.\n\nPriset är svårt att försvara. Konstruktionen är från 2019, och Canons egen PowerShot V1 kostar 9 490 med en större sensor, mer video och ett hörlursuttag. Zoomen stannar dessutom på 100 millimeter.\n\nFotograferar du mest inomhus och på kvällen, och vill ha en kamera som får plats i innerfickan, är den ljusa optiken värd mellanskillnaden mot en billigare kamera. Ska du filma lika mycket som du fotograferar tar du PowerShot V1 och sparar 1 500 kronor.",
  },
  {
    id: "sony-cybershot-rx100-vii",
    brand: "Sony",
    name: "Cyber-shot DSC-RX100 VII",
    shortName: "Cyber-shot RX100 VII",
    image: productImage(KOMPAKTKAMERA.slug, "sony-cybershot-rx100-vii"),
    tagline: "Enda kameran med sökare att lyfta mot ögat i solsken.",
    scores: {
      /* 4,0: staplad sensor av 1,0-typ, 13,2 × 8,8 mm, men f/2,8–4,5 är
         mörkare än både G7 X Mark III och ZV-1F på samma sensorstorlek. */
      sensor: 4,
      /* 2,5: 24–200 mm är längst räckvidd bland kamerorna med stor sensor,
         delad med TG-7 som dock har en fjärdedel så stor sensor. */
      rackvidd: 2.5,
      /* 4,0: 4K, mikrofoningång och skärm som fälls 180 grader upp och 90 ned. */
      video: 4,
      /* 5,0: optisk SteadyShot motsvarande 4,0 stopp enligt Sony, delad högst
         med G7 X Mark III. */
      stabilisering: 5,
      /* 2,0: dyrast på sidan, och Ljud & Bilds riktpris 2019 var 13 000 kronor,
         alltså praktiskt taget samma pris sju år senare. */
      prisvarde: 2,
    },
    price: 12890,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/cybershot-dsc-rx100-vii-1102662",
    award: "premium",
    superlative: "Bäst för sport och barn i rörelse",
    pros: [
      "Elektronisk sökare med 2,4 miljoner punkter, alltså den enda kameran här du kan komponera med i skarpt solsken",
      "24 till 200 millimeter i ett hus som väger 302 gram, längst räckvidd bland kamerorna med stor sensor",
      "Autofokusen tar 20 bilder i sekunden med skärpan omräknad mellan varje, vilket räcker till ett barn som springer",
    ],
    cons: [
      "12 890 kronor är dyrast på sidan, och Ljud & Bilds riktpris 2019 låg på 13 000, alltså står priset stilla",
      "f/2,8 till 4,5 är mörkare än både G7 X Mark III och ZV-1F på samma sensorstorlek",
      "Knapparna är små och huset halt, vilket Ljud & Bild tar upp som en invändning",
    ],
    specs: [
      { label: "Sensorstorlek", shortLabel: "Sensor", value: "1,0-typ", highlight: true },
      { label: "Effektiv upplösning", shortLabel: "Upplösning", value: "20,1 MP", highlight: true },
      { label: "Brännvidd", shortLabel: "Brännvidd", value: "24–200 mm", highlight: true },
      { label: "Optisk zoom", shortLabel: "Zoom", value: "8,0x", highlight: true },
      { label: "Största bländare", shortLabel: "Bländare", value: "f/2,8–4,5", highlight: true },
      { label: "Bildstabilisering", shortLabel: "Stabilisering", value: "Optisk, 4 steg", highlight: true },
      { label: "Video", shortLabel: "Video", value: "4K 30 b/s", highlight: true },
      { label: "Mikrofoningång", shortLabel: "Mik-in", value: "3,5 mm", highlight: true },
      { label: "Sökare", shortLabel: "Sökare", value: "Elektronisk OLED", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "302 g", highlight: true },
      { label: "Mått", value: "101,6 × 58,1 × 42,8 mm" },
      { label: "Batteritid", value: "260 bilder" },
      { label: "Laddning", value: "USB" },
    ],
    verdict:
      "Sony Cyber-shot RX100 VII är den enda kameran här med en sökare att lyfta mot ögat. Den kostar 12 890 kronor och är dyrast på sidan.\n\nSökaren låter dig komponera bilden i skarpt solsken, alltså exakt den situation där en skärm blir en spegel och du får gissa. Den fäller upp ur huset och tar ingen plats när den är nere. Räckvidden är 24 till 200 millimeter i ett hus på 302 gram, och det är längst av kamerorna med stor sensor. **Autofokusen räknar om skärpan mellan varje bild i en serie på 20 bilder i sekunden**, vilket är det som avgör om barnet som springer mot dig blir skarpt eller inte.\n\nPriset står stilla. Ljud & Bild satte riktpriset till 13 000 kronor när de recenserade den 2019, och den kostar 12 890 i dag. Objektivet är dessutom mörkare än både G7 X Mark III och ZV-1F på samma sensorstorlek, f/2,8 till 4,5.\n\nFotograferar du sport, barn i rörelse eller djur, och vill kunna se vad du gör i motljus, finns ingen ersättare i den här storleken. För alla andra gör Canon PowerShot V1 ett bättre jobb för 3 400 kronor mindre.",
  },
  {
    id: "canon-powershot-sx740-hs-lite-edition",
    brand: "Canon",
    name: "PowerShot SX740 HS Lite Edition",
    shortName: "PowerShot SX740 HS Lite",
    image: productImage(KOMPAKTKAMERA.slug, "canon-powershot-sx740-hs-lite-edition"),
    tagline: "960 millimeter i en ficka, längst räckvidd av alla tio.",
    scores: {
      /* 1,5: 1/2,3-typ, alltså ungefär en fjärdedel av arean hos en 1,0-typ,
         och f/6,9 i teleänden. Delad lägst med IXUS 285 HS A. */
      sensor: 1.5,
      /* 5,0: 24–960 mm och 40x optisk zoom, längst räckvidd på sidan. */
      rackvidd: 5,
      /* 3,0: 4K i 30 bilder per sekund och skärm som fälls 180 grader, men
         ingen mikrofoningång. */
      video: 3,
      /* 4,0: objektivförskjutning med ungefär 3,5 stegs verkan enligt Canon. */
      stabilisering: 4,
      /* 4,0: 40x optisk zoom, optisk stabilisering och 4K för 6 549 kronor. */
      prisvarde: 4,
    },
    price: 6549,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/sx740-lite-edition-black-1102171",
    superlative: "Bäst för fågelskådning",
    pros: [
      "960 millimeter är tio gånger längre än Canons egen G7 X Mark III når, och det i ett hus som väger fem gram mindre",
      "Stabiliseringen tar ungefär 3,5 steg, vilket är det som gör 960 millimeter möjligt på fri hand",
      "299 gram och 40 millimeter tjock, så räckvidden kostar ingenting i storlek",
    ],
    cons: [
      "Sensorn på 1/2,3 tum är ungefär en fjärdedel så stor som i Sony ZV-1F, som kostar 759 kronor mindre",
      "f/6,9 i teleänden betyder att fågeln på 960 millimeter behöver soligt väder",
      "Ingen mikrofoningång, så filmljudet blir kamerans eget zoomsurr",
    ],
    specs: [
      { label: "Sensorstorlek", shortLabel: "Sensor", value: "1/2,3-typ", highlight: true },
      { label: "Effektiv upplösning", shortLabel: "Upplösning", value: "20,3 MP", highlight: true },
      { label: "Brännvidd", shortLabel: "Brännvidd", value: "24–960 mm", highlight: true },
      { label: "Optisk zoom", shortLabel: "Zoom", value: "40x", highlight: true },
      /* Canons sida för Lite Edition anger inget bländartal. Canons eget
         specifikationsblad för SX740 HS, med identiskt objektiv 4,3–172 mm och
         identisk 40x zoom, anger f/3,3–6,9. Se filhuvudet. */
      { label: "Största bländare", shortLabel: "Bländare", value: "f/3,3–6,9", highlight: true },
      { label: "Bildstabilisering", shortLabel: "Stabilisering", value: "Optisk, 3,5 steg", highlight: true },
      { label: "Video", shortLabel: "Video", value: "4K 30 b/s", highlight: true },
      { label: "Mikrofoningång", shortLabel: "Mik-in", value: "Nej", highlight: true },
      { label: "Sökare", shortLabel: "Sökare", value: "Nej", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "299 g", highlight: true },
      { label: "Mått", value: "110,1 × 63,8 × 39,9 mm" },
      { label: "Skärm", value: "3,0 tum, fälls 180 grader" },
    ],
    verdict:
      "Canon PowerShot SX740 HS Lite Edition når 960 millimeter, längst av de tio kamerorna här. Den kostar 6 549 kronor och väger 299 gram.\n\nRäckvidden är tio gånger vad Canons egen G7 X Mark III klarar, och huset är fem gram lättare. Det är den enda kameran på sidan som gör något en telefon inte kan låtsas göra: fågeln i toppen av granen blir en fågel och inte fyra suddiga pixlar. Stabiliseringen tar ungefär 3,5 steg, och utan den hade 960 millimeter på fri hand varit oanvändbart.\n\nSensorn är priset. 1/2,3 tum är ungefär en fjärdedel av arean i Sony ZV-1F, som kostar 759 kronor mindre, och objektivet stannar på f/6,9 när du zoomat ut det. I praktiken betyder det att den långa änden vill ha dagsljus.\n\nÄr räckvidden skälet du köper kamera, alltså fåglar, flygplan, älgen över åkern eller barnet längst bort på planen, finns det inget alternativ i fickformat. Fotograferar du mest inomhus köper du sämre bilder för samma pengar.",
  },
  {
    id: "panasonic-lumix-tz99",
    brand: "Panasonic",
    name: "Lumix DC-TZ99",
    image: productImage(KOMPAKTKAMERA.slug, "panasonic-lumix-tz99"),
    tagline: "30x zoom och Leica-optik för 6 490 kronor.",
    scores: {
      /* 2,0: 1/2,3-tums MOS-sensor, men F3,3–6,4 är något ljusare i teleänden
         än Canon SX740 och IXUS 285. */
      sensor: 2,
      /* 4,5: 24–720 mm och 30x, näst längst räckvidd efter SX740. */
      rackvidd: 4.5,
      /* 3,0: 4K i 30 bilder per sekund och skärm som fälls 180 grader, men
         ingen mikrofoningång. */
      video: 3,
      /* 3,5: 5-axlig hybrid O.I.S.+, alltså optisk, men Panasonic publicerar
         inget stegtal. Skalan graderar typen. */
      stabilisering: 3.5,
      /* 4,0: 30x, optisk stabilisering, 4K och Leica-optik för 6 490 kronor. */
      prisvarde: 4,
    },
    price: 6490,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/lumix-tz99-black-1102296",
    superlative: "Bäst för långa resor",
    pros: [
      "720 millimeter räcker till fasaden på andra sidan torget och katedralen från gatunivå",
      "Skärmen fälls 180 grader, så du ser dig själv i bild när du filmar",
      "F3,3 till 6,4 är ljusare i teleänden än både Canon SX740 och IXUS 285",
    ],
    cons: [
      "322 gram är tyngst av kamerorna med liten sensor, 23 mer än Canon SX740 som når 240 millimeter längre",
      "Ingen mikrofoningång, vilket gör den till en fotokamera som också filmar",
      "Sensorn på 1/2,3 tum gör inomhusbilder på kvällen till en kompromiss, oavsett vad Leica står på objektivet",
    ],
    specs: [
      { label: "Sensorstorlek", shortLabel: "Sensor", value: "1/2,3 tum", highlight: true },
      { label: "Effektiv upplösning", shortLabel: "Upplösning", value: "20,3 MP", highlight: true },
      { label: "Brännvidd", shortLabel: "Brännvidd", value: "24–720 mm", highlight: true },
      { label: "Optisk zoom", shortLabel: "Zoom", value: "30x", highlight: true },
      { label: "Största bländare", shortLabel: "Bländare", value: "F3,3–6,4", highlight: true },
      { label: "Bildstabilisering", shortLabel: "Stabilisering", value: "Optisk, 5-axlig", highlight: true },
      { label: "Video", shortLabel: "Video", value: "4K 30 b/s", highlight: true },
      { label: "Mikrofoningång", shortLabel: "Mik-in", value: "Nej", highlight: true },
      { label: "Sökare", shortLabel: "Sökare", value: "Nej", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "322 g", highlight: true },
      { label: "Mått", value: "112,0 × 67,8 × 43,1 mm" },
      { label: "Skärm", value: "3,0 tum, 1 840 000 punkter, fälls" },
    ],
    verdict:
      "Panasonic Lumix TZ99 går från 24 till 720 millimeter och kostar 6 490 kronor. Objektivet är signerat Leica och stabiliseringen arbetar i fem axlar.\n\n720 millimeter är den räckvidd som gör en resa lättare att fotografera: fasaden på andra sidan torget, katedralens tornur från gatunivå, sälen på skäret. Skärmen fälls 180 grader upp, så du ser dig själv när du filmar. I teleänden ligger bländaren på F6,4, vilket är ljusare än både Canon SX740 och IXUS 285 kommer med sina längre zoomar.\n\nDen väger 322 gram och är därmed tyngst bland kamerorna med liten sensor. Canon SX740 väger 23 gram mindre och når 240 millimeter längre. Och sensorn är fortfarande 1/2,3 tum, alltså samma lilla yta som i de andra superzoomarna, hur mycket Leica som än står på ringen.\n\nSka du packa en kamera till två veckors resa och vill kunna fotografera både gatan och tornet utan att byta något, är den här rätt. Ska du mest fota inomhus tar du Sony ZV-1F och får fyra gånger så stor sensor för 700 kronor mindre.",
  },
  {
    id: "sony-zv-1f",
    brand: "Sony",
    name: "ZV-1F",
    image: productImage(KOMPAKTKAMERA.slug, "sony-zv-1f"),
    tagline: "Sensor av 1,0-typ för 5 790 kronor, billigast med stor sensor.",
    scores: {
      /* 4,5: sensor av 1,0-typ, 13,2 × 8,8 mm, med F2,0 fast. Ljusare än
         RX100 VII på samma sensorstorlek, men under PowerShot V1 som har en
         större sensor. */
      sensor: 4.5,
      /* 1,0: fast 20 mm utan optisk zoom. Zoomen är digital, alltså en
         beskärning. Delad lägst med Fujifilm X half. */
      rackvidd: 1,
      /* 4,5: 4K, mikrofoningång och en skärm som vrids helt runt mot motivet,
         vilket ingen annan här har. */
      video: 4.5,
      /* 1,5: stabiliseringen är digital, bekräftat av både Sonys egen Help
         Guide och Ljud & Bild. Enda steget över X half, som saknar helt. */
      stabilisering: 1.5,
      /* 3,5: billigast med sensor av 1,0-typ, men utan zoom, utan optisk
         stabilisering och utan RAW. */
      prisvarde: 3.5,
    },
    price: 5790,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Scandinavian Photo",
    merchantUrl: "https://www.scandinavianphoto.se/sony/zv-1f-1057719",
    superlative: "Bäst för selfievideo",
    pros: [
      "Sensor av 1,0-typ för 5 790 kronor, alltså fyra gånger arean hos Canon SX740 som kostar 759 mer",
      "F2,0 fast över hela bilden, ljusare än Sony RX100 VII som kostar mer än dubbelt så mycket",
      "Skärmen vrids helt runt mot motivet, så du ser dig själv medan du filmar",
    ],
    cons: [
      "Ingen optisk zoom alls, bara fast 20 millimeter, så allt bortom några meter blir litet",
      "Stabiliseringen är digital och beskär bilden, och gör ingenting alls för stillbilder i skymning",
      "Sparar bara JPEG och inte RAW, så det finns lite att rädda i en bild som blev fel",
    ],
    specs: [
      { label: "Sensorstorlek", shortLabel: "Sensor", value: "1,0-typ", highlight: true },
      { label: "Effektiv upplösning", shortLabel: "Upplösning", value: "20,1 MP", highlight: true },
      { label: "Brännvidd", shortLabel: "Brännvidd", value: "20 mm (fast)", highlight: true },
      { label: "Optisk zoom", shortLabel: "Zoom", value: "Ingen", highlight: true },
      { label: "Största bländare", shortLabel: "Bländare", value: "F2,0", highlight: true },
      { label: "Bildstabilisering", shortLabel: "Stabilisering", value: "Elektronisk", highlight: true },
      { label: "Video", shortLabel: "Video", value: "4K 30 b/s", highlight: true },
      { label: "Mikrofoningång", shortLabel: "Mik-in", value: "3,5 mm", highlight: true },
      { label: "Sökare", shortLabel: "Sökare", value: "Nej", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "256 g", highlight: true },
      { label: "Mått", value: "105,5 × 60,0 × 46,4 mm" },
      { label: "Skärm", value: "Vrids 270 grader" },
      { label: "Laddning", value: "USB-C" },
    ],
    verdict:
      "Sony ZV-1F har en sensor av 1,0-typ och kostar 5 790 kronor. Det gör den till den billigaste kameran här med stor sensor, och den enda under 6 000 som har en.\n\nSensorn mäter 13,2 × 8,8 millimeter, alltså ungefär fyra gånger arean hos Canon SX740 som kostar 759 kronor mer. Objektivet ligger på F2,0 och är därmed ljusare än Sony RX100 VII, en kamera som kostar mer än det dubbla. **Skärmen vrids helt runt mot motivet**, vilket ingen annan kamera på sidan gör, och det tillsammans med mikrofoningången är hela poängen med huset.\n\nDen har ingen zoom. Brännvidden är fast på 20 millimeter, och det som marknadsförs som zoom är en beskärning av samma bild. Stabiliseringen är också digital, alltså den beskär bilden ytterligare och gör ingenting för en stillbild i skymning. Kameran sparar dessutom bara JPEG.\n\nStår du framför kameran mer än bakom den, alltså filmar dig själv, är kombinationen stor sensor och vridbar skärm ovanlig för pengarna. Ska du fotografera något som befinner sig längre bort än ett armslängds avstånd väljer du Panasonic TZ99 och byter sensor mot 30 gångers zoom.",
  },
  {
    id: "om-system-tough-tg-7",
    userRating: { value: 4.7, count: 6, checkedAt: PRICE_CHECKED },
    brand: "OM System",
    name: "Tough TG-7",
    image: productImage(KOMPAKTKAMERA.slug, "om-system-tough-tg-7"),
    tagline: "Vattentät till 15 meter och f/2,0 i vidvinkel.",
    scores: {
      /* 2,5: 1/2,3-tums sensor, men f/2,0 i vidvinkel är fältets ljusaste
         objektiv bland de små sensorerna, och 12 MP på samma yta ger större
         enskilda pixlar än 20 MP. */
      sensor: 2.5,
      /* 2,5: 25–200 mm, alltså samma räckvidd som RX100 VII. */
      rackvidd: 2.5,
      /* 2,5: 4K, men ingen mikrofoningång och en fast skärm. */
      video: 2.5,
      /* 3,0: sensorförskjutning med 2,5 EV enligt OM System. */
      stabilisering: 3,
      /* 4,0: vattentät till 15 meter, f/2,0 och 4K för 5 630 kronor. */
      prisvarde: 4,
    },
    price: 5630,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/tg-7-black-1060630",
    superlative: "Bäst för dyk och närbilder",
    pros: [
      "Vattentät till 15 meter utan hus, så den följer med ner till revet och inte bara ner i poolen",
      "f/2,0 i vidvinkel är ljusaste objektivet bland kamerorna med liten sensor här",
      "12 megapixel på samma sensoryta som andras 20 ger större enskilda pixlar, vilket syns när ljuset är dåligt",
    ],
    cons: [
      "Sensorn är 1/2,3 tum, alltså en fjärdedel av Sony ZV-1F som kostar 160 kronor mindre",
      "Skärmen sitter fast, så du ser dig själv aldrig i bild",
      "Ingen mikrofoningång, vilket är en förlust på en kamera som filmar under vatten",
    ],
    specs: [
      { label: "Sensorstorlek", shortLabel: "Sensor", value: "1/2,3 tum", highlight: true },
      { label: "Effektiv upplösning", shortLabel: "Upplösning", value: "12 MP", highlight: true },
      { label: "Brännvidd", shortLabel: "Brännvidd", value: "25–200 mm", highlight: true },
      { label: "Optisk zoom", shortLabel: "Zoom", value: "4x", highlight: true },
      { label: "Största bländare", shortLabel: "Bländare", value: "f/2,0–4,9", highlight: true },
      { label: "Bildstabilisering", shortLabel: "Stabilisering", value: "Sensorförskjutning, 2,5 EV", highlight: true },
      { label: "Video", shortLabel: "Video", value: "4K", highlight: true },
      { label: "Mikrofoningång", shortLabel: "Mik-in", value: "Nej", highlight: true },
      { label: "Sökare", shortLabel: "Sökare", value: "Nej", highlight: true },
      /* OM System publicerar bara vikten utan batteri och minneskort, 249 g.
         Övriga nio anger vikten med. Ett tal som inte är jämförbart är värre
         än en tom cell. Se filhuvudet. */
      { label: "Vikt", shortLabel: "Vikt", value: "Ej angiven", highlight: true },
      { label: "Mått", value: "113,9 × 65,8 × 32,7 mm" },
      { label: "Vattentäthet", value: "15 m" },
      { label: "Skärm", value: "3,0 tum, 1 040 000 punkter" },
    ],
    verdict:
      "OM System Tough TG-7 tål 15 meters vattendjup utan hus och kostar 5 630 kronor. Den är dessutom damm-, köld- och stöttålig.\n\nFemton meter är skillnaden mot resten av marknaden. Det räcker till snorkling över ett rev och till en riktig dykning på grunt vatten, inte bara till att den överlever poolkanten. Objektivet ligger på f/2,0 i vidvinkel, vilket är det ljusaste bland kamerorna med liten sensor på sidan, och det behövs eftersom det blir mörkt fort under ytan. **Sensorn har 12 megapixel där de andra har 20 på samma yta**, alltså större enskilda pixlar, och det syns i skymning och under vatten.\n\nSensorytan är ändå bara 1/2,3 tum. Sony ZV-1F kostar 160 kronor mindre och har ungefär fyra gånger så stor. Skärmen sitter dessutom fast i huset, så du ser aldrig dig själv i bild, och det finns ingen mikrofoningång.\n\nSka kameran med i vattnet, i skidbacken eller i ryggsäcken på fjället är valet redan gjort, för ingen annan här överlever det. Ska den mest ligga i en väska köper du bildkvalitet för pengarna någon annanstans.",
  },
  {
    id: "pentax-wg-8",
    brand: "Pentax",
    name: "WG-8",
    image: productImage(KOMPAKTKAMERA.slug, "pentax-wg-8"),
    tagline: "Vattentät och dammtät för 4 849 kronor.",
    scores: {
      /* 2,0: 1/2,3-tums CMOS med F3,5–5,5. Mörkare i vidvinkel än TG-7:s
         f/2,0, men ljusare i teleänden än Canons båda superzoomar. */
      sensor: 2,
      /* 2,0: 28–140 mm, alltså kortast räckvidd bland kamerorna med zoom. */
      rackvidd: 2,
      /* 2,5: 4K, men ingen mikrofoningång och fast skärm. */
      video: 2.5,
      /* 1,5: Pixel Track SR är elektronisk. Enda kameran med zoom som saknar
         optisk stabilisering. */
      stabilisering: 1.5,
      /* 3,5: billigaste vattentäta, och 340 bilder på en laddning. */
      prisvarde: 3.5,
    },
    price: 4849,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Kompaktkamera/Ricoh-Pentax-WG-8-Green/3456215",
    superlative: "Bäst för dammiga miljöer",
    pros: [
      "Dammtät enligt JIS klass 6, alltså tät mot allt damm, vilket ingen annan kamera här anger",
      "340 bilder på en laddning enligt tillverkarens mätning, näst mest på sidan",
      "4 849 kronor är billigast av de två som tål vatten, 781 mindre än OM System TG-7",
    ],
    cons: [
      "Stabiliseringen heter Pixel Track SR och är elektronisk, alltså den beskär bilden och hjälper inte en stillbild i skymning",
      "28 till 140 millimeter är kortast räckvidd bland kamerorna med zoom, en femtedel av vad Canon SX740 når",
      "F3,5 i vidvinkel mot OM System TG-7:s f/2,0, vilket är hälften så mycket ljus under vattnet",
    ],
    specs: [
      { label: "Sensorstorlek", shortLabel: "Sensor", value: "1/2,3 tum", highlight: true },
      { label: "Effektiv upplösning", shortLabel: "Upplösning", value: "20 MP", highlight: true },
      { label: "Brännvidd", shortLabel: "Brännvidd", value: "28–140 mm", highlight: true },
      { label: "Optisk zoom", shortLabel: "Zoom", value: "5x", highlight: true },
      { label: "Största bländare", shortLabel: "Bländare", value: "F3,5–5,5", highlight: true },
      { label: "Bildstabilisering", shortLabel: "Stabilisering", value: "Elektronisk", highlight: true },
      { label: "Video", shortLabel: "Video", value: "4K", highlight: true },
      { label: "Mikrofoningång", shortLabel: "Mik-in", value: "Nej", highlight: true },
      { label: "Sökare", shortLabel: "Sökare", value: "Nej", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "242 g", highlight: true },
      { label: "Mått", value: "118,2 × 65,5 × 33,1 mm" },
      { label: "Vattentäthet", value: "JIS klass 8, dammtät JIS klass 6" },
      { label: "Batteritid", value: "340 bilder" },
      { label: "Laddning", value: "USB-C" },
      { label: "GTIN", value: "027075311145" },
    ],
    verdict:
      "Pentax WG-8 är vattentät enligt JIS klass 8 och dammtät enligt JIS klass 6, och kostar 4 849 kronor. Den är billigast av de två kamerorna här som tål vatten.\n\nDammtätheten är den ovanliga delen. JIS klass 6 betyder att inget damm alls kommer in, och ingen annan kamera på sidan anger något motsvarande. Det gör den till kameran för byggarbetsplatsen, verkstaden och sandstranden lika mycket som för vattnet. Batteriet räcker 340 bilder enligt Ricohs egen mätning, näst mest av de tio, och den laddas över USB-C.\n\nStabiliseringen är svagheten och den är principiell. Pixel Track SR arbetar elektroniskt, alltså genom att beskära bilden och flytta utsnittet, och det gör ingenting för en stillbild i dåligt ljus. OM System TG-7 flyttar sensorn fysiskt och tar 2,5 EV. WG-8 är dessutom mörkare i vidvinkel, F3,5 mot f/2,0.\n\nSka kameran med dit där det dammar och skvätter, och ska den kosta så lite som möjligt, är det här rätt köp. Ska den under vattenytan på riktigt betalar du 781 kronor extra för OM System TG-7 och får både ljusare optik och 15 meters djup.",
  },
  {
    id: "canon-ixus-285-hs-a",
    userRating: { value: 4.8, count: 4, checkedAt: PRICE_CHECKED },
    brand: "Canon",
    name: "IXUS 285 HS A",
    image: productImage(KOMPAKTKAMERA.slug, "canon-ixus-285-hs-a"),
    tagline: "146 gram och 23 millimeter tjock, minst av alla tio.",
    scores: {
      /* 1,5: 1/2,3-tums BSI CMOS med f/3,6–7,0, mörkast objektiv på sidan.
         Delad lägst med Canon SX740. */
      sensor: 1.5,
      /* 3,0: 25–300 mm och 12x, tredje längst räckvidd. */
      rackvidd: 3,
      /* 1,0: stannar på Full HD i 30 bilder per sekund, ingen 4K och ingen
         mikrofoningång. Lägst på sidan. */
      video: 1,
      /* 3,0: objektivförskjutning med ungefär 2,5 stegs verkan. */
      stabilisering: 3,
      /* 2,5: billigast på sidan, men Full HD och det mörkaste objektivet gör
         att 174 kronor mer köper en vattentät kamera med 4K. */
      prisvarde: 2.5,
    },
    price: 4675,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/ixus-285-hs-black-6",
    award: "budget",
    superlative: "Bäst för byxfickan",
    pros: [
      "146 gram och 23 millimeter tjock, alltså mindre än hälften av vad PowerShot V1 väger och den enda som ryms i en byxficka",
      "300 millimeter räckvidd i ett hus som är tunnare än de flesta mobiler",
      "4 675 kronor är lägsta priset på sidan",
    ],
    cons: [
      "Stannar på Full HD, så den filmar sämre än en fem år gammal telefon",
      "f/3,6 till 7,0 är det mörkaste objektivet här, vilket gör inomhusbilder till en blixtfråga",
      "174 kronor mer köper Pentax WG-8, som är vattentät och filmar i 4K",
    ],
    specs: [
      { label: "Sensorstorlek", shortLabel: "Sensor", value: "1/2,3 tum", highlight: true },
      { label: "Effektiv upplösning", shortLabel: "Upplösning", value: "20 MP", highlight: true },
      { label: "Brännvidd", shortLabel: "Brännvidd", value: "25–300 mm", highlight: true },
      { label: "Optisk zoom", shortLabel: "Zoom", value: "12x", highlight: true },
      { label: "Största bländare", shortLabel: "Bländare", value: "f/3,6–7,0", highlight: true },
      { label: "Bildstabilisering", shortLabel: "Stabilisering", value: "Optisk, 2,5 steg", highlight: true },
      { label: "Video", shortLabel: "Video", value: "Full HD 30 b/s", highlight: true },
      { label: "Mikrofoningång", shortLabel: "Mik-in", value: "Nej", highlight: true },
      { label: "Sökare", shortLabel: "Sökare", value: "Nej", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "146 g", highlight: true },
      { label: "Mått", value: "99,6 × 58,0 × 22,8 mm" },
    ],
    verdict:
      "Canon IXUS 285 HS A väger 146 gram och är 23 millimeter tjock. Den kostar 4 675 kronor och är både minst och billigast av de tio kamerorna här.\n\nStorleken är hela argumentet, och den är verklig. PowerShot V1 väger nästan tre gånger så mycket, och skillnaden mellan 23 och 52 millimeter är skillnaden mellan en kamera som ligger i byxfickan och en som kräver väska. Ändå når objektivet 300 millimeter, alltså tre gånger så långt som Canons egen G7 X Mark III för dubbla priset.\n\nVideon är där den tar slut. Kameran stannar på Full HD, vilket är sämre än telefonen i fickan bredvid, och objektivet på f/3,6 till 7,0 är det mörkaste på sidan. Inomhus blir det blixt eller suddigt.\n\nÄr det avgörande att kameran alltid är med, alltså att den ryms där en telefon ryms, gör den ett jobb ingen annan här gör. Ska du filma något alls lägger du 174 kronor till och tar Pentax WG-8, som både klarar 4K och tål regn.",
  },
  {
    id: "fujifilm-x-half",
    brand: "Fujifilm",
    name: "X half",
    image: productImage(KOMPAKTKAMERA.slug, "fujifilm-x-half"),
    tagline: "880 bilder på en laddning, mer än dubbelt så många som någon annan.",
    scores: {
      /* 3,5: sensorn är 13,3 × 8,8 mm, men används stående i 3:4 och ger
         17,74 MP. Mindre använd yta än ZV-1F och RX100 VII, F2,8, och bara
         JPEG. */
      sensor: 3.5,
      /* 1,0: fast 32 mm utan zoom. Delad lägst med ZV-1F. */
      rackvidd: 1,
      /* 1,5: stannar på Full HD i 24 bilder per sekund, i stående format. */
      video: 1.5,
      /* 1,0: ingen bildstabilisering alls, bekräftat av både Fujifilms
         specifikation och Ljud & Bild. Lägst på sidan. */
      stabilisering: 1,
      /* 2,0: 7 990 kronor utan zoom, utan stabilisering och utan RAW. */
      prisvarde: 2,
    },
    price: 7990,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Scandinavian Photo",
    merchantUrl: "https://www.scandinavianphoto.se/fujifilm/x-hf1-black-1103236",
    superlative: "Bäst för den som vill fota analogt",
    pros: [
      "880 bilder på en laddning enligt CIPA, mer än dubbelt så många som Sony RX100 VII klarar",
      "240 gram och 30 millimeter på det smalaste stället, alltså lättare än varje kamera här utom IXUS 285",
      "Optisk sökare att titta genom, vilket ingen annan kamera under 12 000 kronor på sidan har",
    ],
    cons: [
      "Ingen bildstabilisering alls, så bilder inomhus blir suddiga om du inte håller stilla",
      "Ingen zoom och ingen RAW, så både bildutsnittet och färgerna bestäms när du trycker av",
      "Videon stannar på Full HD i 24 bilder per sekund och spelas in stående",
    ],
    specs: [
      { label: "Sensorstorlek", shortLabel: "Sensor", value: "1 tum", highlight: true },
      { label: "Effektiv upplösning", shortLabel: "Upplösning", value: "17,74 MP", highlight: true },
      { label: "Brännvidd", shortLabel: "Brännvidd", value: "32 mm (fast)", highlight: true },
      { label: "Optisk zoom", shortLabel: "Zoom", value: "Ingen", highlight: true },
      { label: "Största bländare", shortLabel: "Bländare", value: "F2,8", highlight: true },
      { label: "Bildstabilisering", shortLabel: "Stabilisering", value: "Ingen", highlight: true },
      { label: "Video", shortLabel: "Video", value: "Full HD 24 b/s", highlight: true },
      { label: "Mikrofoningång", shortLabel: "Mik-in", value: "Nej", highlight: true },
      { label: "Sökare", shortLabel: "Sökare", value: "Optisk", highlight: true },
      { label: "Vikt", shortLabel: "Vikt", value: "240 g", highlight: true },
      { label: "Mått", value: "105,8 × 64,3 × 45,8 mm" },
      { label: "Batteritid", value: "880 bilder" },
      { label: "Laddning", value: "USB-C" },
    ],
    verdict:
      "Fujifilm X half fotograferar stående i formatet 3:4 och klarar 880 bilder på en laddning. Den kostar 7 990 kronor.\n\nBatteritiden är inte en detalj här. 880 bilder enligt CIPA är mer än dubbelt så många som Sony RX100 VII klarar och nästan tre gånger vad de flesta kompaktkameror ger, vilket betyder en hel semestervecka utan laddare. Kameran har en optisk sökare att titta genom, alltså ett fönster och ingen skärm, och det är den enda under 12 000 kronor på sidan som har något att lyfta mot ögat. **Med 13 filmsimuleringar och 26 filter bestäms bildens utseende när du trycker av**, och det finns inget att efterbehandla eftersom den bara sparar JPEG.\n\nDen saknar bildstabilisering helt. Inomhus på kvällen betyder det suddiga bilder om du inte har stadig hand eller något att luta armbågen mot. Det finns heller ingen zoom, och videon stannar på Full HD i 24 bilder per sekund.\n\nDen här kameran ska köpas av den som vill att fotograferandet ska kännas som film, alltså begränsat, bestämt vid avtryckningen och roligt. Ska kameran vara ett verktyg som löser flest situationer per krona är PowerShot V1 rätt köp för 1 500 kronor mer.",
  },
];

export const KOMPAKTKAMERA_PRODUCTS = resolveProducts(KOMPAKTKAMERA, SEEDS);

/**
 * Tittade på, valde bort. Varje skäl är kontrollerbart mot butikens egen sida.
 */
export const KOMPAKTKAMERA_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Fujifilm",
    name: "X100VI",
    approxPrice: 19990,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/x100vi-silver-1100055",
    reason:
      "Sensorn är APS-C, alltså ungefär sju gånger arean hos en 1,0-typ, och den har inbyggd stabilisering i fem axlar. Priset ligger på 19 990 kronor, mer än dubbla den dyraste kameran vi rankar, och den köps av någon som redan vet vad hen vill ha. Fyra av åtta svenska jämförelsesajter rankar den mot kameror för 1 500 kronor.",
  },
  {
    brand: "Ricoh",
    name: "GR IV",
    approxPrice: 16930,
    merchant: "Scandinavian Photo",
    merchantUrl: "https://www.scandinavianphoto.se/kamera/kompaktkamera/gr-iv-1103740",
    reason:
      "APS-C-sensor i ett hus som väger under 260 gram, med 53 gigabyte inbyggt minne och stabilisering i fem axlar. Den är gatufotografens kamera och kostar 16 930 kronor, alltså utanför spannet den här sidan jämför.",
  },
  {
    brand: "Nikon",
    name: "Coolpix P1100",
    approxPrice: 11740,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/coolpix-p1100-1102511",
    reason:
      "125 gångers optisk zoom slår varje kamera vi rankar med bred marginal. Huset är i systemkamerastorlek med fast objektiv och väger över ett kilo, så den ryms varken i en ficka eller i den här jämförelsen. Butikerna listar den ändå under kompaktkameror.",
  },
  {
    brand: "Panasonic",
    name: "Lumix DC-FZ82D",
    approxPrice: 4849,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/lumix-fz82d-1101450",
    reason:
      "60 gångers zoom och elektronisk sökare för 4 849 kronor, alltså samma pris som Pentax WG-8. Det är en bridgekamera med grepp och systemkamerahus, och samma avgränsning som Nikon Coolpix P1100 faller på: den går inte i en jackficka.",
  },
  {
    brand: "AgfaPhoto",
    name: "Realishot C130",
    approxPrice: 2990,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Kompaktkamera/Agfa-Photo-Realishot-C130-Black/3370073",
    reason:
      "24 megapixel, 10 gångers optisk zoom och 4K för 2 990 kronor, alltså under halva priset för den billigaste kameran vi rankar. AgfaPhoto publicerar varken sensorstorlek, bländartal eller vikt, och utan sensorstorleken går den inte att placera på det kriterium som väger 30 av 100 här.",
  },
  {
    brand: "Yashica",
    name: "City 200",
    approxPrice: 2990,
    merchant: "Scandinavian Photo",
    merchantUrl:
      "https://www.scandinavianphoto.se/kamera/kompaktkamera/city-200-black-1104686",
    reason:
      "16 megapixel och USB-C för 2 990 kronor, i ett hus byggt för att se ut som en kamera från 2005. Zoomen är enbart digital, alltså en beskärning av samma bild, och sensorstorleken anges inte. Den hör till samma våg av retrokameror som Kodak Charmera för 439 kronor.",
  },
];

/**
 * Speglar köpguiden: varje fråga guiden svarar på finns här, formulerad som
 * folk söker snarare än som vi sätter rubriker.
 *
 * Dubbleringen är avsiktlig. Guiden är för den som läser uppifrån och ned;
 * det här är för den som kom med en enda fråga, och för FAQPage-uppmärkningen
 * som kan visa ett enskilt svar direkt i sökresultatet.
 */
export const KOMPAKTKAMERA_FAQ = [
  {
    question: "Är en kompaktkamera bättre än en mobilkamera?",
    answer:
      "Det beror helt på vilken kompaktkamera. En kamera med sensor av 1,0-typ, alltså 13,2 × 8,8 millimeter, har ungefär fyra till fem gånger så stor sensoryta som en typisk mobiltelefon, och det syns i dåligt ljus och när du vill ha oskarp bakgrund. En kamera med 1/2,3-tums sensor har en yta i samma härad som en bra mobil, och där vinner mobilen ofta på bildbehandling. Det som en liten sensor däremot ger dig är zoom: 300, 720 eller 960 millimeter finns inte i någon telefon utan att bilden bara beskärs.",
  },
  {
    question: "Vad betyder 1 tum och 1/2,3 tum på en kamerasensor?",
    answer:
      "Det är gamla mått från tv-kamerarörens tid och de anger inte sensorns diagonal. En sensor av 1,0-typ mäter i verkligheten 13,2 × 8,8 millimeter, alltså en diagonal på knappt 16 millimeter. En 1/2,3-tums mäter ungefär 6,2 × 4,6 millimeter. Skillnaden i yta är alltså ungefär fyra gånger, inte drygt två som talen antyder. Det är sensorytan som avgör hur mycket ljus kameran samlar, och därmed hur bilden ser ut inomhus och i skymning.",
  },
  {
    question: "Hur mycket zoom behöver jag?",
    answer:
      "Räkna i brännvidd omräknad till 35 millimeter, för zoomfaktorn säger ingenting i sig: 4x från 24 millimeter slutar på 100, medan 4x från 25 slutar på 200. Vill du fota rum, grupper och gator räcker 24 till 70 millimeter. Ska du fota barn på en fotbollsplan eller djur behöver du 300 och uppåt. Fåglar och månen kräver 700 till 960. Digital zoom räknas inte, eftersom den beskär bilden precis som du själv kan göra efteråt.",
  },
  {
    question: "Vad är skillnaden mellan optisk och elektronisk bildstabilisering?",
    answer:
      "Optisk stabilisering flyttar en lins i objektivet eller hela sensorn fysiskt för att motverka att handen skakar. Elektronisk stabilisering beskär bilden och flyttar utsnittet mellan bildrutorna. Den optiska fungerar för både stillbilder och film och kostar ingen bildvinkel. Den elektroniska fungerar bara för film, tar bort en del av bilden i kanterna och gör ingenting alls för en stillbild i skymning. Bland kamerorna här har Sony ZV-1F och Pentax WG-8 elektronisk stabilisering, Fujifilm X half ingen alls, och resten optisk.",
  },
  {
    question: "Vad betyder f/1,8 och f/6,9 på ett objektiv?",
    answer:
      "Bländartalet beskriver hur stor öppningen är i förhållande till brännvidden, och lägre tal betyder större öppning och mer ljus. Varje steg på skalan 1,4, 2,0, 2,8, 4,0, 5,6, 8,0 halverar ljuset. f/1,8 släpper alltså in ungefär dubbelt så mycket ljus som f/2,8 och åtta gånger så mycket som f/5,6. På en zoomkamera anges två tal, ett för vidvinkel och ett för teleänden, och det är det andra talet som avgör om den långa zoomen är användbar när solen gått ner.",
  },
  {
    question: "Behöver jag RAW-format?",
    answer:
      "Bara om du tänker redigera bilderna efteråt. RAW sparar sensorns rådata och låter dig rädda en bild som blev för mörk eller fick fel färgton, medan JPEG är en färdig bild där kameran redan bestämt allt. Fujifilm X half och Sony ZV-1F sparar bara JPEG, och det är ett medvetet val från tillverkarna för att göra kamerorna enklare. Fotograferar du och lägger upp bilden direkt spelar det ingen roll. Sitter du med bilderna i efterhand är det en verklig begränsning.",
  },
  {
    question: "Vilken kompaktkamera är bäst för vlogg?",
    answer:
      "Leta efter tre saker: en skärm som går att vända mot dig, en 3,5-millimeters mikrofoningång och 4K. Den inbyggda mikrofonen sitter centimeter från dina fingrar på kamerahuset och tar upp varje gång du rör zoomen, så ingången är den viktigaste av de tre. Canon PowerShot V1 har både mikrofoningång och hörlursuttag, vilket ingen annan kamera i den här jämförelsen har. Sony ZV-1F har mikrofoningång och en skärm som vrids helt runt, men saknar optisk stabilisering.",
  },
  {
    question: "Tål en kompaktkamera att bada?",
    answer:
      "Bara de som är byggda för det. Två av kamerorna här är det: OM System Tough TG-7 tål 15 meters djup utan hus, och Pentax WG-8 är vattentät enligt JIS klass 8 och dessutom dammtät enligt JIS klass 6. De övriga åtta tål inte ens kraftigt regn. En vanlig kompaktkamera som får vatten i sig är i praktiken förbrukad, eftersom reparationen kostar mer än kameran.",
  },
  {
    question: "Varför kostar gamla kompaktkameror mer än nya?",
    answer:
      "Efterfrågan på små kameror har ökat kraftigt de senaste åren samtidigt som tillverkarna har lagt ner de flesta modellerna, och de som finns kvar produceras i mindre serier. Canon PowerShot G7 X Mark III kom 2019 och kostar 10 990 kronor, medan Canon PowerShot V1 från 2025 kostar 9 490 med en större sensor. Sony Cyber-shot RX100 VII kostade 13 000 kronor när Ljud & Bild recenserade den 2019 och kostar 12 890 i dag. Kontrollera alltid vilket år konstruktionen är från innan du betalar över tio tusen.",
  },
  {
    question: "Vad betyder Lite Edition och A i kameranamnet?",
    answer:
      "Det är Canons beteckningar på modeller som säljs på nytt. PowerShot SX740 HS kom 2018 och säljs i dag som SX740 HS Lite Edition, och IXUS 285 HS från 2016 säljs som IXUS 285 HS A. Båda har egna produktsidor och egna artikelnummer hos Canon. Vad som skiljer dem från originalen framgår inte av Canons specifikationer, så utgå från att kameratekniken är densamma som när modellen kom.",
  },
  {
    question: "Hur många megapixel behöver en kompaktkamera?",
    answer:
      "Färre än du tror, och fler är inte alltid bättre. 12 megapixel räcker till en utskrift i A3 och till varje skärm som finns. På en liten sensor betyder fler megapixel att varje pixel blir mindre och samlar mindre ljus, vilket ger mer brus i skymning. OM System Tough TG-7 har 12 megapixel där de andra kamerorna med samma sensorstorlek har 20, och det är ett medvetet val från tillverkaren som gynnar bilden i dåligt ljus.",
  },
  {
    question: "Kan jag ladda en kompaktkamera med en vanlig USB-C-laddare?",
    answer:
      "De flesta nyare kameror laddas över USB-C, och Canon PowerShot V1, Sony ZV-1F, Fujifilm X half och Pentax WG-8 gör alla det. Äldre modeller som Canon PowerShot G7 X Mark III och SX740 levereras med separat batteriladdare i kartongen. Kolla vilken kontakt kameran har innan du packar bara telefonladdaren till en resa, för ett tomt kamerabatteri är svårt att låna sig till.",
  },
];
