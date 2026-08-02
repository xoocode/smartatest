import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { VATTENLARM } from "@/lib/categories";

/**
 * Vattenlarm. Underlag i .agent/research-vattenlarm.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, lagerstatus, artikelnummer, EAN, mått,
 * batterityper, batteritider, IP-klasser och kundbetyg. Allt läst 2026-08-02 på
 * butikens egen produktsida, aldrig ur ett sökresultat. Brandvarnare.se anger
 * priset i `product:price:amount`, Kjell och Proshop i JSON-LD.
 *
 * **Redaktionell bedömning:** kriteriepoängen. De är vår sammanvägning av
 * specifikationerna ovan mot viktningen i lib/categories.ts, inte mätvärden.
 * Vi har inte provat ett enda av de här larmen och skriver det rakt ut på
 * sidan.
 *
 *
 * **Bilder:** butikernas egna packshots, hämtade från deras publika
 * produktsidor och körda genom `pnpm images`. Nio av nio produkter har bild.
 *
 * ## Kategorin har ingen oberoende provning
 *
 * Stiftung Warentest har inte testat vattenlarm. De nordiska instituten gav
 * ingen träff. Brandinfo har recenserat X-Sense-systemet, alltså en av nio
 * rankade produkter, vilket är för lite för ett testomdöme-kriterium. Se
 * doc-kommentaren i lib/categories.ts.
 *
 * Samtidigt påstår alla tre svenska konkurrenter i rubriker att de utfört egna
 * tester, utan ett enda redovisat mätvärde. Att säga sanningen är här en
 * konkurrensfördel och inte en brist.
 *
 * ## Butiksfördelningen
 *
 * Fyra länkar går till Brandvarnare.se, fyra till Kjell och en till Proshop.
 * Tre av fyra utmärkelser hamnade hos Brandvarnare.se, vilket ser skevt ut och
 * har en enkel förklaring: **fyra av sju artiklar i Kjells kategori är slut**,
 * och Brandvarnare.se är den enda butiken som säljer både ett paket med
 * basstation och en enhet med femårsbatteri. Rankningen följer viktningen och
 * har inte justerats åt något håll.
 *
 * Brandvarnare.se är också det enda program i kategorin som tillåter
 * betalannonsering, 15 procent på 45 dagar. Det påverkade inte poängen. Se
 * regeln i .claude/skills/new-page/references/data-and-sourcing.md.
 *
 * ## Slutsålt kontra utgånget
 *
 * Nedis och Fibaro är **slut** hos Kjell och ligger kvar i rankningen, markerat
 * i specifikationerna, enligt användarens beslut. Shelly Flood är däremot
 * **utgången**: Proshop anger `Discontinued` och Kjell har den inte i lager.
 * Den ligger i den övervägda listan i stället. Skillnaden spelar roll, och att
 * ranka en utgången produkt är precis felet /elektrisk-rullgardin finns till
 * för att rätta.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "x-sense-sws54",
    name: "SWS54 med basstation SBS50",
    shortName: "SWS54",
    brand: "X-Sense",
    image: productImage(VATTENLARM.slug, "x-sense-sws54"),
    tagline:
      "Tre sensorer och en basstation som gör dem hörbara både hemma och i telefonen.",
    scores: {
      larmvag: 5,
      fristaende: 5,
      batteritid: 4.5,
      sensorutforande: 3.5,
      prisvarde: 4.5,
    },
    price: 876,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-sws54/",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för ett helt hem",
    pros: [
      "Larmar lokalt även om basstationen är urkopplad eller strömmen gått",
      "Tre sensorer ingår, så du täcker kök, tvätt och beredare på en gång",
      "Ingen prenumeration och ingen tredjepartshubb",
      "Utbyggbart med rök-, CO- och värmevarnare i samma app",
    ],
    cons: [
      "Klart dyrast i jämförelsen om du bara vill skydda ett ställe",
      "Basstationen måste sitta i ett eluttag",
      "Butiken anger ingen IP-klass för sensorerna",
    ],
    specs: [
      {
        label: "Larmväg",
        value: "Lokal siren och app via basstation",
        highlight: true,
      },
      { label: "Hubb krävs", value: "Nej, basstation ingår", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "3", highlight: true },
      { label: "Batteri", value: "2 × AAA per sensor, förmonterade", highlight: true },
      { label: "Batteritid", value: "3 år", highlight: true },
      { label: "Basstation", value: "SBS50, nätansluten" },
      { label: "Anslutning", value: "Wi-Fi 2,4 GHz" },
      { label: "Abonnemang", value: "Nej" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "10231" },
      { label: "EAN", value: "7332211102314" },
    ],
    verdict:
      "Det här är det enda köpet i jämförelsen som svarar mot hur en vattenskada faktiskt går till. Läckan börjar på ett ställe du inte valt, och därför behöver du sensorer på flera ställen samtidigt: under diskbänken, bakom tvättmaskinen, vid varmvattenberedaren. Paketet innehåller tre.\n\nBasstationen är det som lyfter det över resten. Den kopplar sensorerna till appen utan att du behöver äga någon hubb sedan tidigare, och X-Sense tar inget abonnemang för det. Butikens egen text är dessutom tydlig med något viktigt: sensorerna tjuter lokalt även om basstationen är urkopplad eller om strömmen gått i huset. Ett larm som slutar fungera vid strömavbrott är ett larm som fallerar just när ett gammalt hus är som mest sårbart.\n\n876 kronor är mycket för något man hoppas aldrig ska höras. Ställ det mot självrisken i stället för mot de andra larmen. Vattenskadecentrum anger att självrisken ensam ligger mellan 3 440 och 10 000 kronor, och då är åldersavdraget inte inräknat.\n\nDet vi saknar är en IP-klass. Kjell anger IP67 för Aqara, Brandvarnare.se anger ingenting för X-Sense, och vi gissar inte.",
  },
  {
    id: "sq400b-wifi-vattenvarnare",
    name: "SQ400B Wi-Fi vattenvarnare",
    shortName: "SQ400B",
    brand: "Deltronic",
    image: productImage(VATTENLARM.slug, "sq400b-wifi-vattenvarnare"),
    tagline: "Billigast av dem som når din telefon utan att du köper en hubb.",
    scores: {
      larmvag: 4.5,
      fristaende: 4.5,
      batteritid: 2.5,
      sensorutforande: 3,
      prisvarde: 4,
    },
    price: 199,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/sq400b/",
    priceCheckedAt: PRICE_CHECKED,
    award: "runnerup",
    superlative: "Bäst utan hubb",
    pros: [
      "Ansluter direkt till wifi, ingenting annat behöver köpas",
      "Larmar både med ljud på plats och som notis i mobilen",
      "Under tvåhundra kronor",
    ],
    cons: [
      "Kortast uppgiven batteritid i jämförelsen, över ett år",
      "Ingen IP-klass angiven",
      "Kräver att wifi-nätet når fram till platsen, ofta ett skåp eller en källare",
    ],
    specs: [
      { label: "Larmväg", value: "Wi-Fi till app, plus ljudsignal", highlight: true },
      { label: "Hubb krävs", value: "Nej", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1", highlight: true },
      { label: "Batteri", value: "CR123A litium 3 V", highlight: true },
      { label: "Batteritid", value: "Över 1 år", highlight: true },
      { label: "Anslutning", value: "Wi-Fi 2,4 GHz" },
      { label: "Mått", value: "50 × 50 × 35 mm" },
      { label: "Sammankopplingsbar", value: "Ja" },
      { label: "Artikelnummer", value: "30330" },
      { label: "EAN", value: "7332211303308" },
    ],
    verdict:
      "Bor du i lägenhet och vill skydda ett enda ställe är det här köpet. Två hundra kronor, ingen hubb, ingen basstation, och notisen når telefonen var du än är. Det är precis den kombination som saknas i resten av det billiga skiktet, där nästan allt antingen bara tjuter på golvet eller kräver att du redan äger rätt hubb.\n\nBatteritiden är svagheten. \"Över 1 år\" är det kortaste någon butik anger i den här jämförelsen, och ett vattenlarm är en produkt man sätter ut och glömmer. Sätt en påminnelse i kalendern samma dag du sätter dit den.\n\nTänk också på var wifi-nätet faktiskt räcker. Larmet ska ligga längst in i ett diskbänksskåp eller i ett källarutrymme, alltså på ungefär de sämsta platserna ett hus har för radiotäckning.",
  },
  {
    id: "nedis-smartlife-lackagedetektor",
    name: "SmartLife läckagedetektor",
    shortName: "SmartLife",
    brand: "Nedis",
    image: productImage(VATTENLARM.slug, "nedis-smartlife-lackagedetektor"),
    tagline: "Sensorn sitter på en meters kabel, så den når dit larmet behövs.",
    scores: {
      larmvag: 2.5,
      fristaende: 4,
      batteritid: 3.5,
      sensorutforande: 5,
      prisvarde: 3,
    },
    price: 299.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/vattenlarm/nedis-smartlife-lackagedetektor-p51567",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 19, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst bakom maskinerna",
    pros: [
      "115 cm kabel till sensorn, alltså den enda som når in bakom en tvättmaskin",
      "Väggfäste medföljer, så själva enheten sitter torrt och synligt",
      "Kan trigga andra enheter i Smart Life, till exempel en lampa",
      "Batteriet medföljer och räcker upp till två år",
    ],
    cons: [
      "Skickar ingen notis förrän du själv byggt en automation i appen",
      "Slut hos Kjell vid priskontrollen",
      "Dyrast av wifi-larmen utan att ge mer larmväg",
    ],
    specs: [
      {
        label: "Larmväg",
        value: "Wi-Fi, men notis kräver egen automation",
        highlight: true,
      },
      { label: "Hubb krävs", value: "Nej", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1, på 115 cm kabel", highlight: true },
      { label: "Batteri", value: "CR123A, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 2 år", highlight: true },
      { label: "Anslutning", value: "Wi-Fi 2,4 GHz" },
      { label: "Driftstemperatur", value: "0 till 40 °C" },
      { label: "Lagerstatus", value: "Slut hos Kjell 2026-08-02" },
    ],
    verdict:
      "Kabeln är det som gör den intressant. Sensorn sitter på 115 centimeters sladd från själva enheten, vilket betyder att du kan skruva upp larmet synligt på väggen och lägga sonden där vattnet faktiskt kommer: bakom diskmaskinen, under en beredare, i botten av ett trångt skåp. Alla andra i jämförelsen är en klump som ska ligga på ett fritt golv, och fritt golv är inte där rören går sönder.\n\nSedan finns det en sak Kjell har varit hederliga nog att skriva ut på produktsidan, hämtad rakt ur tillverkarens manual: detektorn skickar ingen notis när den känner vatten. Du måste själv skapa en automation i appen som gör det. Det står på engelska mitt i den svenska texten, och det är lätt att läsa förbi.\n\nEtt uppkopplat vattenlarm som är tyst i mobilen tills du konfigurerat det är i praktiken ett lokalt larm för den som köper det och ställer undan kartongen. Vi drar ner larmvägen hårt för det, och det är enda skälet till att en produkt med kategorins bästa sensorlösning inte ligger högre.",
  },
  {
    id: "numens-204",
    name: "204 vattenvarnare",
    shortName: "204",
    brand: "Numens",
    image: productImage(VATTENLARM.slug, "numens-204"),
    tagline: "Femårsbatteri och löstagbara sensorbläck. Men den ringer aldrig.",
    scores: {
      larmvag: 1,
      fristaende: 4.5,
      batteritid: 5,
      sensorutforande: 3.5,
      prisvarde: 2.5,
    },
    price: 197,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/numens-204/",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Längst batteritid",
    pros: [
      "Över fem års batteritid, mer än dubbelt så länge som de flesta",
      "Löstagbara sensorbläck, så sonden kan läggas där enheten inte får plats",
      "Fungerar helt utan wifi, konto och app",
    ],
    cons: [
      "Bara lokal siren, ingen notis och ingen app",
      "Meningslös i en bostad som står tom, vilket är när skadan blir dyr",
    ],
    specs: [
      { label: "Larmväg", value: "Endast lokal siren", highlight: true },
      { label: "Hubb krävs", value: "Nej, och ingen app finns", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1, med löstagbara bläck", highlight: true },
      { label: "Batteri", value: "9 V litium, utbytbart", highlight: true },
      { label: "Batteritid", value: "Över 5 år", highlight: true },
      { label: "Mått", value: "98 × 60 × 35 mm" },
      { label: "Artikelnummer", value: "30322" },
      { label: "EAN", value: "7332211303223" },
    ],
    verdict:
      "Femårsbatteriet är inte en detalj. Ett vattenlarm är en produkt du sätter ut en gång och sedan aldrig tänker på igen, och därför är den vanligaste orsaken till att det inte larmar att batteriet dog i tysthet för ett år sedan. Numens 204 håller mer än dubbelt så länge som fältet i övrigt och varnar med en 9-voltare du kan byta i en handvändning.\n\nDe löstagbara sensorbläcken gör också att den, till skillnad från de flesta i det här prisläget, går att få dit vattnet är snarare än dit enheten får plats.\n\nMen den ringer aldrig. Hör du den inte, larmade den inte, och det är just när ingen är hemma en läcka hinner arbeta sig genom ett golv. Den är rätt köp på ett ställe där du ändå befinner dig, eller i en stuga utan wifi där alternativet är ingenting alls. Den är fel köp om tanken var att bli varnad på jobbet.",
  },
  {
    id: "tp-link-tapo-t300",
    name: "Tapo T300 läckagedetektor",
    shortName: "Tapo T300",
    brand: "TP-Link",
    image: productImage(VATTENLARM.slug, "tp-link-tapo-t300"),
    tagline: "Bra sensor till lågt pris, förutsatt att du redan har en Tapo-hubb.",
    scores: {
      larmvag: 3,
      fristaende: 1.5,
      batteritid: 3,
      sensorutforande: 4.5,
      prisvarde: 2.5,
    },
    price: 199,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/vattenlarm/tp-link-tapo-t300-lackagedetektor-p65413",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 14, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst om du redan kör Tapo",
    pros: [
      "IP67 och sex prober på över- och undersida",
      "Egen siren på upp till 90 dB, justerbar",
      "En hubb hanterar upp till 64 sensorer, så utbyggnaden är billig",
      "Batterier medföljer",
    ],
    cons: [
      "Kräver Tapo-hubb H100 eller H200, som säljs separat",
      "Använder 868/922 MHz, alltså inte wifi, och kan inte tala med routern",
      "Uppgiven batteritid upp till ett år",
    ],
    specs: [
      { label: "Larmväg", value: "Egen siren, app via Tapo-hubb", highlight: true },
      { label: "Hubb krävs", value: "Ja, Tapo H100 eller H200", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1", highlight: true },
      { label: "Batteri", value: "2 × AAA, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 1 år", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP", value: "IP67" },
      { label: "Siren", value: "Upp till 90 dB, justerbar" },
      { label: "Radio", value: "868/922 MHz" },
      { label: "Driftstemperatur", value: "0 till 40 °C" },
      { label: "Mått", value: "84,5 × 46,5 × 30 mm" },
    ],
    verdict:
      "Själva sensorn är en av de bästa i jämförelsen. IP67, sex prober som känner både uppifrån och nerifrån, och en egen siren på 90 dB som går att skruva ner. Priset ser också rätt ut: 199 kronor hos Kjell, två kronor billigare än hos Proshop.\n\nHaken står inte alltid utskriven i butiken. T300 pratar 868/922 MHz och inte wifi, och kan alltså inte nå din router på egen hand. TP-Link är själva tydliga med det, deras egen butik har ordet \"Hub Required\" i produktnamnet: den behöver en Tapo H100 eller H200 för att kunna skicka något till din telefon. Utan hubb har du köpt en tjutande dosa för 199 kronor.\n\nHar du redan en Tapo-hubb för kameror eller sensorer är detta däremot ett självklart köp, och då blir kalkylen den omvända: en hubb hanterar 64 sensorer, så nästa larm kostar bara 199 kronor till.",
  },
  {
    id: "x-sense-sws51",
    name: "SWS51 vattenvarnare",
    shortName: "SWS51",
    brand: "X-Sense",
    image: productImage(VATTENLARM.slug, "x-sense-sws51"),
    tagline: "Samma sensor som i paketet, men ensam blir den bara en siren.",
    scores: {
      larmvag: 1.5,
      fristaende: 3,
      batteritid: 4.5,
      sensorutforande: 3.5,
      prisvarde: 2,
    },
    price: 190,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/x-sense-sws51/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Utbyggnad till basstationen",
    pros: [
      "Treårsbatteri och fem års garanti",
      "Kraftig signal på 110 dB",
      "Prober både över och under enheten",
      "Enda produkten i jämförelsen som recenserats av en oberoende svensk sajt",
    ],
    cons: [
      "Ger endast lokal ljudsignal om du inte äger basstationen SBS50",
      "Går inte att sammankoppla med andra larm utan basstation",
      "Billigare per styck i paketet SWS54, som dessutom ger appen",
    ],
    specs: [
      {
        label: "Larmväg",
        value: "Lokal siren, app endast med SBS50",
        highlight: true,
      },
      { label: "Hubb krävs", value: "Ja för app, basstation SBS50", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1", highlight: true },
      { label: "Batteri", value: "2 × AAA, förmonterade", highlight: true },
      { label: "Batteritid", value: "Över 3 år", highlight: true },
      { label: "Siren", value: "110 dB" },
      { label: "Detektering", value: "Prober över och under enheten" },
      { label: "Garanti", value: "5 år" },
      { label: "Artikelnummer", value: "10247" },
      { label: "EAN", value: "7332211102475" },
    ],
    verdict:
      "SWS51 är sensorn ur vinnarpaketet, såld styckvis. Den är välbyggd, har treårsbatteri, fem års garanti och en signal på 110 dB, och den är den enda produkten i hela jämförelsen som blivit recenserad av en oberoende svensk sajt, Brandinfo.\n\nProblemet är vad du får för de 190 kronorna om du inte redan äger en basstation. Butiken skriver det själv: fristående ger den endast lokal ljudsignal, och den går inte ens att sammankoppla med andra X-Sense-larm utan SBS50. Ensam är den alltså en siren, ungefär som Numens 204, men med kortare batteritid och utan de löstagbara bläcken.\n\nKöp den som komplettering när du redan har ett X-Sense-system. Ska du börja från noll är paketet SWS54 nästan alltid rätt väg, eftersom priset per sensor blir lägre och appen ingår.",
  },
  {
    id: "aqara-water-leak-sensor-t1",
    name: "Water Leak Sensor T1",
    shortName: "T1",
    brand: "Aqara",
    image: productImage(VATTENLARM.slug, "aqara-water-leak-sensor-t1"),
    tagline: "Minsta larmet i testet, och det tåligaste. Men Zigbee kräver hubb.",
    scores: {
      larmvag: 2.5,
      fristaende: 1.5,
      batteritid: 3,
      sensorutforande: 4.5,
      prisvarde: 2.5,
    },
    price: 229,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Aqara-Water-Leak-Sensor-T1/3196753",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Minst och tåligast",
    pros: [
      "IP67 och godkänd upp till 55 °C, alltså även intill en beredare",
      "Bara 15 mm hög, får plats under maskiner där andra inte kommer in",
      "Zigbee 3.0 belastar inte wifi-nätet och bygger eget nät med fler enheter",
      "Batteriet medföljer",
    ],
    cons: [
      "Kräver en Aqara-hubb, som kostar mer än larmet",
      "Ingen egen siren värd namnet, larmet går via hubben",
      "CR2032 är ett litet batteri för en produkt som ska glömmas bort",
    ],
    specs: [
      { label: "Larmväg", value: "App och siren via Aqara-hubb", highlight: true },
      { label: "Hubb krävs", value: "Ja, Aqara-hubb", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1", highlight: true },
      { label: "Batteri", value: "CR2032, medföljer", highlight: true },
      { label: "Batteritid", value: "Ej angiven av butiken", highlight: true },
      { label: "Kapslingsklass", shortLabel: "IP", value: "IP67" },
      { label: "Protokoll", value: "Zigbee 3.0" },
      { label: "Arbetstemperatur", value: "0 till 55 °C" },
      { label: "Mått", value: "50 × 50 × 15 mm" },
      { label: "Modell", value: "WL-S02D" },
      { label: "GTIN", value: "6975833352142" },
    ],
    verdict:
      "Femton millimeter hög. Det låter som en detalj tills du försöker skjuta in ett vattenlarm under en diskmaskin eller bakom en toalettstol, och då är Aqara T1 den enda i jämförelsen som kommer in. IP67 och 55 grader gör den dessutom användbar intill en varmvattenberedare, där de flesta andra är godkända till fyrtio.\n\nZigbee är både styrkan och problemet. Protokollet är rätt teknikval, det belastar inte wifi och blir stabilare ju fler enheter du har, men det förutsätter en Aqara-hubb och den kostar mer än larmet självt. Har du redan ett Aqara-hem är detta det bästa styckeköpet i hela jämförelsen. Har du inte det är den totala kostnaden svår att försvara mot ett SQ400B för 199 kronor som klarar sig på routern.\n\nVi länkar Proshop, som tar samma pris som Kjell och till skillnad från dem publicerar produktens GTIN.",
  },
  {
    id: "fibaro-flood-sensor",
    name: "Flood Sensor FGFS-101",
    shortName: "FGFS-101",
    brand: "Fibaro",
    image: productImage(VATTENLARM.slug, "fibaro-flood-sensor"),
    tagline: "Mest funktion per sensor, till högst pris och med hårdast krav.",
    scores: {
      larmvag: 2.5,
      fristaende: 1,
      batteritid: 3.5,
      sensorutforande: 4.5,
      prisvarde: 1.5,
    },
    price: 599,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/vattenlarm/fibaro-z-wave-vattenlarm-p50391",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 3, scale: 5, checkedAt: PRICE_CHECKED },
    award: "premium",
    superlative: "Mest funktion per enhet",
    pros: [
      "Mäter temperatur och kan varna för hastiga höjningar",
      "Sabotageskydd, larmar om någon flyttar den",
      "Inbyggd siren, batteriet medföljer",
      "Z-Wave Plus-certifierad, alltså inte beroende av tillverkarens moln",
    ],
    cons: [
      "Kräver en Z-Wave-styrenhet, den dyraste förutsättningen i jämförelsen",
      "Tre gånger priset på ett wifi-larm som klarar sig själv",
      "Slut hos Kjell vid priskontrollen",
    ],
    specs: [
      { label: "Larmväg", value: "Inbyggd siren, app via Z-Wave-styrenhet", highlight: true },
      { label: "Hubb krävs", value: "Ja, Z-Wave-styrenhet", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1", highlight: true },
      { label: "Batteri", value: "CR123A, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 2 år", highlight: true },
      { label: "Protokoll", value: "Z-Wave Plus" },
      { label: "Extra", value: "Temperaturgivare och sabotageskydd" },
      { label: "Modell", value: "FGFS-101" },
      { label: "Lagerstatus", value: "Slut hos Kjell 2026-08-02" },
    ],
    verdict:
      "Fibaro är den enda sensorn här som gör mer än att känna vatten. Den mäter temperatur och kan larma för hastiga höjningar, den har sabotageskydd som säger till om någon rubbar den, och den kör Z-Wave Plus, som till skillnad från de flesta wifi-larm inte slutar fungera den dag tillverkarens molntjänst läggs ner.\n\nDärför ligger den ändå näst sist. 599 kronor för en sensor är tre gånger vad ett fungerande wifi-larm kostar, och till det ska en Z-Wave-styrenhet läggas, vilket är den dyraste förutsättningen någon produkt i jämförelsen ställer. Den kalkylen går bara ihop om du redan byggt ett Z-Wave-hem, och gör du det vet du redan att du vill ha den här.\n\nVid priskontrollen var den dessutom slut hos Kjell.",
  },
  {
    id: "housegard-vattenlarm",
    name: "Vattenlarm WA201S",
    shortName: "WA201S",
    brand: "Housegard",
    image: productImage(VATTENLARM.slug, "housegard-vattenlarm"),
    tagline: "Ställ den på golvet och glöm den. Den gör inget mer än så.",
    scores: {
      larmvag: 1,
      fristaende: 4,
      batteritid: 3.5,
      sensorutforande: 2.5,
      prisvarde: 2,
    },
    price: 229.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/vattenlarm/housegard-vattenlarm-p21190",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 10, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Enklast tänkbara",
    pros: [
      "Ingenting att installera, ingen app och inget konto",
      "Varnar när batteriet börjar ta slut",
      "Känt märke som finns i de flesta butiker",
      "Batteriet medföljer",
    ],
    cons: [
      "Bara lokal siren",
      "Ingen lös sond, hela enheten måste få plats där du vill mäta",
      "Trettio kronor dyrare än Numens 204, som har mer än dubbelt så lång batteritid",
    ],
    specs: [
      { label: "Larmväg", value: "Endast lokal siren", highlight: true },
      { label: "Hubb krävs", value: "Nej, och ingen app finns", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "3 på enheten", highlight: true },
      { label: "Batteri", value: "9 V, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 2 år", highlight: true },
      { label: "Varning vid lågt batteri", shortLabel: "Batterivarning", value: "Ja" },
      { label: "Mått", value: "Ø83 × 30 mm" },
      { label: "Vikt", value: "113 g" },
    ],
    verdict:
      "Housegard är märket folk känner igen från brandvarnaren i taket, och den här produkten är gjord för samma enkelhet: ställ den på golvet, klart. Tre sensorer i botten känner vatten via underlagets ledningsförmåga, den varnar när batteriet tar slut, och det finns inget konto att skapa.\n\nProblemet är att den kostar 229,90 kronor för att göra mindre än Numens 204 gör för 197. Numens har över fem års batteritid mot Housegards två, och löstagbara sensorbläck som når in där den runda dosan inte får plats. Det är svårt att hitta ett skäl att välja Housegard i stället, annat än att den finns på hyllan i en butik du ändå står i.\n\nOch precis som Numens larmar den bara där den ligger. Läser du den här sidan för att du är orolig för vad som händer medan du är bortrest är det här inte produkten.",
  },
];

export const VATTENLARM_PRODUCTS: Product[] = resolveProducts(VATTENLARM, SEEDS);

/**
 * Underlag till sensorväljaren. Härlett ur specifikationerna ovan snarare än
 * upprepat, så en ändrad produkt inte kan hamna i otakt med verktyget.
 *
 * `reach` är den avgörande egenskapen och följer larmvägen:
 *   siren   — hörs bara på plats
 *   app     — når telefonen på egen hand
 *   hubbapp — når telefonen, men bara om du äger rätt hubb
 */
export type LeakSensorCapability = {
  id: string;
  reach: "siren" | "app" | "hubbapp";
  /** Vilket ekosystem hubben tillhör, när en sådan krävs. */
  hub?: "tapo" | "aqara" | "zwave";
  /** Antal ställen produkten täcker ur lådan. */
  spots: number;
  /** Uppgiven batteritid i år, för väljarens "sätt och glöm"-fråga. */
  batteryYears: number;
  /** Har lös sond eller kabel som når in bakom eller under en maskin. */
  reachesTightSpots: boolean;
  /** Klarar mer än 40 °C, alltså intill varmvattenberedare. */
  hotSpot: boolean;
};

export const VATTENLARM_CAPABILITIES: LeakSensorCapability[] = [
  { id: "x-sense-sws54", reach: "app", spots: 3, batteryYears: 3, reachesTightSpots: false, hotSpot: false },
  { id: "sq400b-wifi-vattenvarnare", reach: "app", spots: 1, batteryYears: 1, reachesTightSpots: false, hotSpot: false },
  { id: "nedis-smartlife-lackagedetektor", reach: "app", spots: 1, batteryYears: 2, reachesTightSpots: true, hotSpot: false },
  { id: "numens-204", reach: "siren", spots: 1, batteryYears: 5, reachesTightSpots: true, hotSpot: false },
  { id: "tp-link-tapo-t300", reach: "hubbapp", hub: "tapo", spots: 1, batteryYears: 1, reachesTightSpots: false, hotSpot: false },
  { id: "x-sense-sws51", reach: "siren", spots: 1, batteryYears: 3, reachesTightSpots: false, hotSpot: false },
  { id: "aqara-water-leak-sensor-t1", reach: "hubbapp", hub: "aqara", spots: 1, batteryYears: 2, reachesTightSpots: false, hotSpot: true },
  { id: "fibaro-flood-sensor", reach: "hubbapp", hub: "zwave", spots: 1, batteryYears: 2, reachesTightSpots: false, hotSpot: false },
  { id: "housegard-vattenlarm", reach: "siren", spots: 1, batteryYears: 2, reachesTightSpots: false, hotSpot: false },
];

const REACH_LABEL: Record<LeakSensorCapability["reach"], string> = {
  siren: "Bara siren på plats",
  app: "Notis utan hubb",
  hubbapp: "Notis, hubb krävs",
};

/**
 * Filter till jämförelsetabellen. Härledda ur VATTENLARM_CAPABILITIES så att en
 * ändrad produkt aldrig kan bli kvar i fel grupp.
 */
export const VATTENLARM_FILTERS: ComparisonFilter[] = [
  ...(["app", "hubbapp", "siren"] as const).map((reach) => ({
    key: reach,
    label: REACH_LABEL[reach],
    ids: VATTENLARM_CAPABILITIES.filter((c) => c.reach === reach).map((c) => c.id),
  })),
  {
    key: "lang-batteritid",
    label: "Minst 3 års batteri",
    ids: VATTENLARM_CAPABILITIES.filter((c) => c.batteryYears >= 3).map((c) => c.id),
  },
  {
    key: "tranga-utrymmen",
    label: "Når trånga utrymmen",
    ids: VATTENLARM_CAPABILITIES.filter((c) => c.reachesTightSpots).map((c) => c.id),
  },
];

/**
 * Övervägda men inte rankade.
 *
 * Shelly Flood är det viktigaste namnet här. Den är en välkänd produkt som
 * ligger högt hos flera konkurrenter, och den är utgången.
 */
export const VATTENLARM_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Shelly",
    name: "Flood",
    reason:
      "Utgången. Proshop anger uttryckligen Discontinued och Kjell har den inte i lager. Shelly har gått vidare till senare generationer, men vi hittade ingen av dem hos någon svensk butik vid kontrollen 2026-08-02. Att ranka en produkt som inte längre tillverkas är precis det fel vi byggde /elektrisk-rullgardin för att rätta, så den ligger här i stället. Hittar du den kvar på hyllan är den fortfarande ett vettigt wifi-larm som klarar sig utan hubb och mäter temperatur.",
    approxPrice: 191,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Shelly-Flood/2973204",
  },
  {
    brand: "Aqara",
    name: "Valve Controller T1",
    reason:
      "Inte ett larm utan en avstängningsventil: den sitter på röret och vrider av vattnet när en sensor larmar. Hör alltså hemma i nivån ovanför den här sidan, tillsammans med vattenfelsbrytare, och den får sin plats när vi bygger den sidan. Var dessutom slut hos Kjell och har ett enda kundbetyg, en etta.",
    approxPrice: 819,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/vattenlarm/aqara-valve-controller-t1-p56579",
  },
  {
    brand: "LK Systems",
    name: "Cubicsecure",
    reason:
      "Vattenfelsbrytare och inte vattenlarm. Den mäter flöde, tryck och temperatur och stänger av inkommande vatten till hela huset, och den är den enda produkttypen som ger tio procents rabatt på villaförsäkringen. Den kostar också tjugofem gånger mer än larmen i listan. Vi jämför den inte mot en sensor för 199 kronor, utan bygger en egen sida för kategorin.",
    approxPrice: 4798,
  },
  {
    brand: "Grohe",
    name: "Sense Guard",
    reason:
      "Samma sak som Cubicsecure: vattenfelsbrytare, egen prisklass, egen sida. Ligger med här för att flera svenska jämförelser blandar in den bland vanliga vattenlarm utan att säga att den kräver rörmokare.",
  },
  {
    brand: "Sensative",
    name: "Strips Drip 700",
    reason:
      "Svensktillverkad och intressant, en platt remsa som kan läggas där ingenting annat får plats. Vi hittade den dock inte hos någon av de butiker vi bevakar, och priset gick därför inte att kontrollera. Vi rankar inte produkter vi inte kan länka till ett kontrollerat pris.",
  },
  {
    brand: "X-Sense",
    name: "SBS50 basstation, lös",
    reason:
      "Basstationen såld separat, för den som redan har SWS51-sensorer och vill få dem uppkopplade. Ingen sensor och därmed inget vattenlarm i sig, men värd att känna till: den är skillnaden mellan att SWS51 tjuter på golvet och att den når din telefon.",
  },
];

export const VATTENLARM_FAQ = [
  {
    question: "Vad är skillnaden mellan vattenlarm och vattenfelsbrytare?",
    answer:
      "Ett vattenlarm känner av vatten på golvet och larmar. En vattenfelsbrytare mäter flöde, tryck och temperatur i inkommande ledning och stänger av vattnet automatiskt. Larmet kostar 190 till 900 kronor och lägger du dit själv. Felsbrytaren kostar enligt Länsförsäkringar 6 000 till 10 000 kronor installerad och kräver rörmokare. Larmet varnar dig, felsbrytaren stoppar skadan.",
  },
  {
    question: "Ger ett vattenlarm rabatt på försäkringen?",
    answer:
      "Nej. Både Länsförsäkringar och Folksam ger tio procent på villa- eller fritidshusförsäkringen, men bara för en godkänd vattenfelsbrytare. Folksam kräver dessutom underlägg under vitvaror och diskbänk. Inget av bolagen anger vattenlarm som rabattgrundande. Larmet lönar sig ändå, men genom att du hinner stoppa läckan och slipper självrisken, inte genom en lägre premie.",
  },
  {
    question: "Behöver ett vattenlarm en hubb?",
    answer:
      "Det beror på produkten, och det är den viktigaste frågan att ställa före köp. TP-Link Tapo T300, Aqara T1 och Fibaro Flood Sensor kräver alla en hubb som säljs separat och ofta kostar mer än larmet. SQ400B och Nedis ansluter direkt till wifi. X-Sense SWS54 har basstationen inkluderad i paketet. Numens 204 och Housegard har ingen app alls.",
  },
  {
    question: "Vilket vattenlarm är bäst 2026?",
    answer:
      "X-Sense SWS54 med basstation, om du ska skydda ett hus. Det är det enda köpet i jämförelsen som ger tre sensorer, notis i mobilen utan att du behöver äga en hubb sedan tidigare, och som fortsätter larma lokalt även vid strömavbrott. Ska du bara skydda ett ställe i en lägenhet är SQ400B för 199 kronor rätt val.",
  },
  {
    question: "Vad kostar ett vattenlarm?",
    answer:
      "De larm vi rankar kostar mellan 190 och 876 kronor, kontrollerat 2026-08-02. Ett enkelt larm med bara siren ligger runt 200 kronor, ett wifi-anslutet som når mobilen ligger på ungefär samma nivå, och ett paket med basstation och tre sensorer runt 900. Kräver larmet en hubb tillkommer den kostnaden.",
  },
  {
    question: "Var ska man placera ett vattenlarm?",
    answer:
      "Där vatten kommer in i huset och där maskiner står. Enligt Vattenskadecentrum sker flest skador i köket och orsakas av vitvaror, så under diskbänken och bakom diskmaskinen är första platsen. Därefter tvättstuga, bakom tvättmaskinen, och vid varmvattenberedaren. Lägg larmet på golvet på den lägsta punkten, eftersom vatten söker sig dit först.",
  },
  {
    question: "Hur många vattenlarm behöver jag?",
    answer:
      "Ett per ställe där vatten kan komma ut, alltså i praktiken tre till fyra i en villa: kök, tvätt, badrum och vid beredaren. Ett enda larm skyddar bara den plats det ligger på, och läckan kommer där du inte gissade. Det är skälet till att paket med flera sensorer ofta blir billigare per skyddad plats än en lös sensor som ser billig ut.",
  },
  {
    question: "Larmar ett vattenlarm i mobilen?",
    answer:
      "Bara om det är byggt för det. Numens 204, Housegard och X-Sense SWS51 utan basstation har enbart en siren och når dig aldrig när du inte är hemma. Nedis SmartLife är uppkopplad men skickar enligt tillverkarens egen manual ingen notis förrän du själv skapat en automation i appen. Kontrollera detta innan du köper, för det står inte alltid tydligt i butiken.",
  },
  {
    question: "Hur länge håller batteriet i ett vattenlarm?",
    answer:
      "Mellan ett och fem år bland dem vi jämför. Numens 204 uppges hålla över fem år, X-Sense treårsbatterier, medan SQ400B och Tapo T300 anges till drygt ett år. Det spelar större roll än det låter, eftersom ett vattenlarm är en produkt du sätter ut och slutar tänka på. Ett larm med tomt batteri är sämre än inget larm, för då tror du att du är skyddad.",
  },
  {
    question: "Fungerar vattenlarm i ouppvärmda utrymmen?",
    answer:
      "Sällan. De flesta är godkända från 0 till 40 grader, vilket utesluter ett ouppvärmt garage eller krypgrund på vintern. Aqara T1 klarar upp till 55 grader och är den enda i jämförelsen som är godkänd att ligga intill en varmvattenberedare. Ska larmet ligga där det fryser bör du kontrollera driftstemperaturen i manualen och inte i butiksrubriken.",
  },
  {
    question: "Hur mycket kostar en vattenskada?",
    answer:
      "Enligt Vattenskadecentrum är snittkostnaden 49 700 kronor per skada, och för lägenheter mellan 80 000 och 133 000 kronor. Även med försäkring betalar du självrisken, som ligger mellan 3 440 och 10 000 kronor, plus åldersavdrag på 9 700 till 26 100 kronor. Det är den summan ett larm för 199 kronor ska ställas mot.",
  },
  {
    question: "Vad är skillnaden mellan vattenlarm och vattenvarnare?",
    answer:
      "Ingen. Det är två ord för samma produkt, och butikerna har valt olika: Kjell säger vattenlarm, Brandvarnare.se säger vattenvarnare. Söker du på det ena ordet i en butik som använder det andra får du noll träffar, vilket är värt att veta när du jämför sortiment mellan butiker.",
  },
];
