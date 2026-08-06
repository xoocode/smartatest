import type { ComparisonFilter } from "@/components/product/filterable-comparison";
import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { VATTENLARM } from "@/lib/test-pages";

/**
 * Vattenlarm. Underlag i .agent/research/vattenlarm.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, EAN och kundbetyg lästa 2026-08-03 på
 * butikens egen produktsida, aldrig ur ett sökresultat. Brandvarnare.se anger
 * priset i `product:price:amount`, Kjell och Proshop i JSON-LD.
 *
 * Specifikationerna kommer däremot från **tillverkarna själva**, lästa
 * 2026-08-06 i gap-passet: larmstyrka, drifttemperatur, mått, garanti,
 * batteritid och vattentålighet. Tre av dem ligger i manualer som butiken
 * själv länkar till. Se .agent/research/vattenlarm.md §13 för källa per
 * uppgift. Fem påståenden om att en uppgift saknades visade sig falska.
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
 * ingen träff. Brandinfo har recenserat X-Sense-systemet, en av nio
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
export const PRICE_CHECKED = "2026-08-03";

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
      "Klart dyrast av larmen om du bara vill skydda ett ställe",
      "Basstationen måste sitta i ett eluttag",
      "Basstationen är godkänd bara till 38 °C, så den kan inte stå i pannrummet",
    ],
    specs: [
      {
        label: "Larmväg",
        value: "Lokal siren och app via basstation",
        highlight: true,
      },
      { label: "Hubb krävs", value: "Nej, basstation ingår", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "3", highlight: true },
      /* 110 dB är sensorn, 100 dB basstationen. Båda talen står i X-Sense egen
         specifikation, läst 2026-08-06. Tidigare stod bara basstationens. */
      { label: "Larmstyrka", value: "110 dB sensorn, 100 dB basstationen", highlight: true },
      { label: "Batteri", value: "2 × AAA per sensor, förmonterade", highlight: true },
      { label: "Batteritid", value: "3 år", highlight: true },
      {
        label: "Drifttemperatur",
        value: "0 till 50 °C sensorn, 4 till 38 °C basstationen",
        highlight: true,
      },
      { label: "Mått", value: "Ø77 × 30 mm (sensorn)", highlight: true },
      { label: "Garanti", value: "5 år", highlight: true },
      /* Två radio, inte en: sensorerna talar 868 MHz med basstationen, som i sin
         tur talar wifi med routern. x-sense.com 2026-08-06. */
      { label: "Anslutning", value: "868 MHz till basstationen, Wi-Fi 2,4 GHz därifrån" },
      { label: "Vattentålighet", value: "IP66" },
      { label: "Modell", value: "SWS54 med basstation SBS50" },
      { label: "EAN", value: "7332211102314" },
    ],
    verdict:
      "X-Sense SWS54 är tre sensorer och en basstation för 876 kronor, och det enda köpet här som täcker mer än ett ställe direkt ur lådan. Ett normalt hus har tre till fyra ställen där vatten kan komma ut, och läckan börjar på det du inte gissade.\n\nBasstationen är det som lyfter paketet över resten. Den kopplar sensorerna till appen utan att du behöver äga en hubb sedan tidigare, och X-Sense tar inget abonnemang för det. Sensorerna tjuter dessutom på 110 decibel även om basstationen är urkopplad eller strömmen gått i huset, alltså fungerar larmet den natt ett gammalt hus är som mest sårbart. De är byggda i IP66 och godkända till 50 grader, så de får ligga intill varmvattenberedaren.\n\nNavet är känsligare än sensorerna det styr. X-Sense anger 4 till 38 grader för basstationen, så den ska stå inne i bostaden och inte i pannrummet eller i en ouppvärmd stuga. Sensorerna klarar kylan, lådan de rapporterar till gör det inte.\n\nKöp den. 876 kronor ser dyrt ut bredvid en sensor för 199, men självrisken ensam ligger på 3 440 till 10 000 kronor enligt Vattenskadecentrum, och det här är det enda larmet som täcker kök, tvätt och beredare samtidigt. Ska du skydda ett enda ställe i en lägenhet räcker SQ400B för 199 kronor.",
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
    superlative: "Bäst utan hubb",
    pros: [
      "Ansluter direkt till wifi, ingenting annat behöver köpas",
      "Larmar både med ljud på plats och som notis i mobilen",
      "Under tvåhundra kronor",
    ],
    cons: [
      "Kortast batteritid av larmen, ett år mot tre till fem för de bästa",
      "75 decibel, alltså svagast av de larm som anger en styrka",
      "Kräver att wifi-nätet når fram till platsen, ofta ett skåp eller en källare",
    ],
    specs: [
      { label: "Larmväg", value: "Wi-Fi till app, plus ljudsignal", highlight: true },
      { label: "Hubb krävs", value: "Nej", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1", highlight: true },
      { label: "Larmstyrka", value: "Över 75 dB på 3 m", highlight: true },
      { label: "Batteri", value: "CR123A litium 3 V, medföljer", highlight: true },
      /* Deltronics eget datablad anger "1 år", inte "över 1 år". 2026-08-06. */
      { label: "Batteritid", value: "1 år", highlight: true },
      { label: "Drifttemperatur", value: "0 till 50 °C", highlight: true },
      { label: "Mått", value: "50 × 50 × 35 mm", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Anslutning", value: "Wi-Fi 2,4 GHz" },
      { label: "Modell", value: "SQ400B" },
      { label: "EAN", value: "7332211303308" },
    ],
    verdict:
      "SQ400B är billigaste vägen till en notis i telefonen: 199 kronor, ingen hubb, ingen basstation. Den kombinationen saknas i resten av det billiga skiktet, där nästan allt antingen bara tjuter på golvet eller kräver att du redan äger rätt hubb.\n\nDen talar wifi rakt till routern, så larmet når dig på jobbet eller på semestern utan att du köpt något mer. Deltronic lägger dessutom CR123A-batteriet i kartongen och skriver ut att enheten bör bytas efter tio år, vilket är ovanligt rakt för prisklassen.\n\nBatteritiden är svagheten, och den är verklig. Ett år är kortast i hela jämförelsen, mot tre år för X-Sense och över fem för Numens. Sirenen är dessutom svagast av dem som anger en siffra, drygt 75 decibel mot 110 för X-Sense, så ligger den bakom en stängd skåpsdörr är det notisen och inte ljudet du ska räkna med.\n\nBor du i lägenhet och ska skydda ett enda ställe är det här köpet, förutsatt att du sätter en påminnelse om batteribytet samma dag du packar upp. Ska du täcka ett helt hus blir SWS54 billigare per plats.",
  },
  {
    id: "nedis-smartlife-lackagedetektor",
    name: "SmartLife läckagedetektor",
    shortName: "SmartLife",
    brand: "Nedis",
    image: productImage(VATTENLARM.slug, "nedis-smartlife-lackagedetektor"),
    tagline: "Sonden når in bakom maskinen medan larmet sitter torrt på väggen.",
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
    userRating: { value: 4, count: 44, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst bakom maskinerna",
    pros: [
      "Sonden är 6 mm tunn och sitter på 115 cm kabel, så den glider in i springan bakom en inbyggd maskin",
      "Väggfäste medföljer, så själva enheten sitter torrt och synligt",
      "Kan trigga andra enheter i Smart Life, till exempel en lampa",
      "Batteriet medföljer och räcker upp till två år",
    ],
    cons: [
      "Skickar ingen notis förrän du själv byggt en automation i appen",
      "50 decibel, alltså svagast i jämförelsen och knappt hörbart genom en stängd dörr",
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
      { label: "Larmstyrka", value: "50 dB", highlight: true },
      { label: "Batteri", value: "CR123A, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 2 år", highlight: true },
      { label: "Drifttemperatur", value: "0 till 40 °C", highlight: true },
      { label: "Mått", value: "Ø67 × 33 mm", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Anslutning", value: "Wi-Fi 2,4 GHz" },
      { label: "Modell", value: "WIFIDW10WT" },
      { label: "EAN", value: "5412810272822" },
    ],
    verdict:
      "Nedis SmartLife kostar 299,90 kronor och är larmet med den genomtänkta sensorlösningen: en 6 millimeter tunn sond på 115 centimeters kabel, så enheten skruvas upp synligt på väggen medan sonden ligger i springan bakom diskmaskinen. Numens 204 når en bit längre, men med en klumpigare platta.\n\nDen ansluter till wifi utan hubb, batteriet medföljer och räcker två år, och den kan trigga andra Smart Life-enheter så att en lampa tänds när sonden blir blöt.\n\nSedan kommer haken, och den är stor. Detektorn skickar ingen notis när den känner vatten. Du måste själv bygga en automation i appen som gör det, annars händer ingenting i telefonen. Till det kommer att sirenen ligger på 50 decibel, svagast här och ungefär en normal samtalston. Ett larm som varken hörs genom en skåpsdörr eller ringer i telefonen skyddar ingenting förrän det konfigurerats.\n\nKöp den om du gillar att bygga automationer och behöver just den tunna sonden. Vill du att larmet ska fungera direkt ur kartongen tar du SQ400B för hundra kronor mindre.",
  },
  {
    id: "numens-204",
    name: "204 vattenvarnare",
    shortName: "204",
    brand: "Numens",
    image: productImage(VATTENLARM.slug, "numens-204"),
    tagline:
      "Enda larmet som är godkänt under noll, och batteriet håller över fem år.",
    scores: {
      larmvag: 1,
      fristaende: 4.5,
      batteritid: 5,
      /* 4,0 och inte 3,5 sedan tillverkarens manual lästes 2026-08-06: sonden
         får sitta 1,5 m från enheten, längst i fältet, och larmet utlöser vid
         2 mm vatten och tål 1,8 m fall mot betong. Se lib/corrections.ts. */
      sensorutforande: 4,
      prisvarde: 2.5,
    },
    price: 197,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/numens-204/",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Bäst i ouppvärmda utrymmen",
    pros: [
      "Över fem års batteritid, mer än dubbelt så länge som de flesta",
      "Godkänd ner till −10 °C, alltså det enda larmet som får ligga i ett ouppvärmt garage eller en krypgrund",
      "Sonden får sitta 1,5 m från enheten, längre än något annat larm här",
      "Tål 1,8 m fall mot betong och löser ut redan vid 2 mm vatten",
      "Fungerar helt utan wifi, konto och app",
    ],
    cons: [
      "Bara lokal siren, ingen notis och ingen app",
      "Meningslös i en bostad som står tom, vilket är när skadan blir dyr",
    ],
    specs: [
      { label: "Larmväg", value: "Endast lokal siren", highlight: true },
      { label: "Hubb krävs", value: "Nej, och ingen app finns", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1, sond på upp till 1,5 m", highlight: true },
      { label: "Larmstyrka", value: "Minst 85 dB på 3 m", highlight: true },
      { label: "Batteri", value: "9 V litium, utbytbart", highlight: true },
      { label: "Batteritid", value: "Över 5 år", highlight: true },
      /* Enda larmet i jämförelsen som är godkänt under noll. Tillverkarens
         manual, läst 2026-08-06. */
      { label: "Drifttemperatur", value: "−10 till +50 °C", highlight: true },
      { label: "Mått", value: "98 × 60 × 35 mm", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Anslutning", value: "Ingen, larmar på plats" },
      /* Numens eget datablad anger IP-42 i klartext, utöver formuleringen
         "stänksäker (ej vattentät)". Siffran hör hemma i cellen. 2026-08-06. */
      { label: "Vattentålighet", value: "IP42, stänksäker men inte nedsänkbar" },
      { label: "Modell", value: "204" },
      { label: "EAN", value: "7332211303223" },
    ],
    verdict:
      "Numens 204 kostar 197 kronor och är larmet för de utrymmen där de andra inte får vara. Tillverkaren anger −10 till +50 grader, och det är det enda larmet här som är godkänt under noll.\n\nDet gör den till svaret på en fråga sidan annars saknar: ouppvärmt garage, krypgrund, sommarstuga i november. Till det kommer ett batteri som håller över fem år, alltså mer än dubbelt så länge som fältet i övrigt, vilket spelar roll just på de platserna eftersom du inte går dit och kontrollerar. Sonden får dessutom sitta 1,5 meter från själva enheten, längre än något annat larm här, så den når in under en beredare medan lådan sitter torrt. Den tål 1,8 meters fall mot betong och löser ut vid 2 millimeter vatten.\n\nMen den ringer aldrig. Hör du den inte, larmade den inte, och det är just när ingen är hemma en läcka hinner arbeta sig genom ett golv.\n\nHar du ett kallt utrymme att skydda är valet redan gjort, för de andra åtta får inte ligga där. Ska larmet nå dig när du är borta duger den inte, och då kostar SQ400B två kronor mer.",
  },
  {
    id: "tp-link-tapo-t300",
    name: "Tapo T300 läckagedetektor",
    shortName: "Tapo T300",
    brand: "TP-Link",
    image: productImage(VATTENLARM.slug, "tp-link-tapo-t300"),
    tagline: "Sex prober, IP67 och justerbar siren för 179 kronor.",
    scores: {
      larmvag: 3,
      fristaende: 1.5,
      /* Tillbaka på 3,0 efter omkontroll 2026-08-06 mot tapo.com/se. TP-Link
         anger två tal och inget av dem är tre år: "up to 1.5 years while
         coordinating with 24/7 Tapo Hub alarms" och "more than 2 years when
         working independently". Rubriken på samma sida säger "1+Year Battery
         Life". Det tal som gäller köparen är 1,5 år, eftersom produkten kräver
         hubben för att göra något annat än att tjuta. Det placerar den mellan
         SQ400B på 1 år (2,5) och tvåårsgruppen (3,5). Se lib/corrections.ts. */
      batteritid: 3,
      sensorutforande: 4.5,
      /* 3,0 och inte 2,5 sedan priset föll från 199 till 179 kronor vid
         omkontrollen 2026-08-03. Den är nu det billigaste larmet av alla,
         men hubbkravet gör att prisvärdet per skyddad plats ändå inte kan
         bli högt för den som inte redan har hubben. */
      prisvarde: 3,
    },
    price: 179,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/vattenlarm/tp-link-tapo-t300-lackagedetektor-p65413",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 45, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst om du redan kör Tapo",
    pros: [
      "IP67 och sex prober på över- och undersida",
      "Egen siren på upp till 90 dB, justerbar",
      "En hubb hanterar upp till 64 sensorer, så utbyggnaden är billig",
      "Batterier medföljer",
    ],
    cons: [
      "Kräver Tapo-hubb H100 eller H200, som säljs separat",
      "Använder 868 MHz och inte wifi, så den kan inte tala med routern",
      "1,5 års batteritid när den arbetar mot hubben, alltså näst kortast här",
      "Godkänd bara till 40 °C, alltså inte intill en varmvattenberedare",
    ],
    specs: [
      { label: "Larmväg", value: "Egen siren, app via Tapo-hubb", highlight: true },
      { label: "Hubb krävs", value: "Ja, Tapo H100 eller H200", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1", highlight: true },
      { label: "Larmstyrka", value: "0 till 90 dB, justerbar", highlight: true },
      { label: "Batteri", value: "2 × AAA, medföljer", highlight: true },
      /* TP-Links två tal, tapo.com/se läst 2026-08-06: 1,5 år mot hubben,
         över 2 år fristående. Kjell anger 1 år. Cellen bär båda, eftersom
         skillnaden beror på hur produkten används och inte på källan. */
      { label: "Batteritid", value: "1,5 år med hubb, över 2 år utan", highlight: true },
      { label: "Drifttemperatur", value: "0 till 40 °C", highlight: true },
      { label: "Mått", value: "84,5 × 46,5 × 30 mm", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Anslutning", value: "868 MHz till Tapo-hubb" },
      { label: "Vattentålighet", value: "IP67" },
      { label: "Modell", value: "T300" },
    ],
    verdict:
      "Tapo T300 kostar 179 kronor och är billigast på hela sidan. Sensorn är samtidigt en av de bästa här: IP67, sex prober som känner både uppifrån och nerifrån, och en egen siren på upp till 90 decibel.\n\nAtt sirenen går att skruva ner låter futtigt tills larmet ligger i en hall utanför ett sovrum. Proberna på båda sidor gör dessutom att den känner vatten oavsett hur den hamnar när du skjuter in den under en maskin, och batterierna ligger i kartongen.\n\nDen talar 868 MHz och inte wifi, alltså når den inte din router på egen hand. Utan en Tapo H100 eller H200, som säljs separat och kostar mer än larmet, är det här en tjutande dosa för 179 kronor. Mot hubben håller batterierna dessutom bara 1,5 år, näst kortast i jämförelsen.\n\nHar du redan en Tapo-hubb för kameror eller sensorer är detta ett självklart köp: en hubb hanterar 64 sensorer, så nästa larm kostar 179 kronor till. Börjar du från noll blir förutsättningen dyrare än produkten, och då är SQ400B för 199 kronor rätt väg.",
  },
  {
    id: "x-sense-sws51",
    name: "SWS51 vattenvarnare",
    shortName: "SWS51",
    brand: "X-Sense",
    image: productImage(VATTENLARM.slug, "x-sense-sws51"),
    tagline: "Samma 110-decibelssensor som i vinnarpaketet, såld styckvis.",
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
      "Treårsbatteri och fem års garanti, längst garanti i jämförelsen",
      "Kraftig signal på 110 dB, starkast här",
      "IP66 och godkänd till 50 °C, alltså användbar intill beredaren",
      "Prober både över och under enheten",
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
      { label: "Larmstyrka", value: "110 dB", highlight: true },
      { label: "Batteri", value: "2 × AAA, förmonterade", highlight: true },
      { label: "Batteritid", value: "Över 3 år", highlight: true },
      { label: "Drifttemperatur", value: "0 till 50 °C", highlight: true },
      { label: "Mått", value: "Ø77 × 29 mm", highlight: true },
      { label: "Garanti", value: "5 år", highlight: true },
      { label: "Anslutning", value: "868 MHz, endast till basstation SBS50" },
      { label: "Vattentålighet", value: "IP66" },
      { label: "Modell", value: "SWS51" },
      { label: "EAN", value: "7332211102475" },
    ],
    verdict:
      "SWS51 är sensorn ur vinnarpaketet, såld styckvis för 190 kronor. Den är den mest välbyggda enskilda sensorn här: 110 decibel, alltså starkast i jämförelsen, IP66, godkänd till 50 grader och med fem års garanti, vilket ingen annan än Housegard matchar.\n\nBatteriet är förmonterat och håller över tre år, och proberna sitter både på ovan- och undersidan, så den känner vatten oavsett hur den hamnar när du skjuter in den i ett skåp.\n\nProblemet är vad de 190 kronorna ger om du inte redan äger en basstation. Fristående lämnar den bara en lokal ljudsignal, och den går inte ens att sammankoppla med andra X-Sense-larm utan SBS50. Ensam är den alltså en siren, ungefär som Numens 204, men med kortare batteritid och utan sondkabeln.\n\nKöp den som komplettering när du redan har ett X-Sense-system, för då är den billig utbyggnad. Börjar du från noll är paketet SWS54 nästan alltid rätt väg, eftersom priset per sensor blir lägre och appen ingår.",
  },
  {
    id: "aqara-water-leak-sensor-t1",
    name: "Water Leak Sensor T1",
    shortName: "T1",
    brand: "Aqara",
    image: productImage(VATTENLARM.slug, "aqara-water-leak-sensor-t1"),
    tagline: "15 millimeter hög, så den får plats under diskmaskinen.",
    scores: {
      larmvag: 2.5,
      fristaende: 1.5,
      /* 3,5 och inte 3,0 sedan batteritiden faktiskt gick att belägga
         2026-08-06: Aqara EU anger över 2 år, bekräftat av två oberoende
         återförsäljare. Det gamla betyget satt på en lucka i vår research och
         inte på produkten. Samma nivå som Nedis, Fibaro och Housegard, som alla
         har två år. Se lib/corrections.ts. */
      batteritid: 3.5,
      sensorutforande: 4.5,
      prisvarde: 2.5,
    },
    price: 229,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Aqara-Water-Leak-Sensor-T1/3196753",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Minst och tåligast",
    pros: [
      "IP67 och godkänd upp till 55 °C, även intill en beredare",
      "Bara 15 mm hög, får plats under maskiner där andra inte kommer in",
      "Zigbee 3.0 belastar inte wifi-nätet och bygger eget nät med fler enheter",
      "Batteriet medföljer",
    ],
    cons: [
      "Kräver en Aqara-hubb, som kostar mer än larmet",
      "Ljudet kommer från hubben, alltså larmar den där hubben står och inte där läckan är",
      "CR2032 är ett litet batteri för en produkt som ska glömmas bort",
    ],
    specs: [
      { label: "Larmväg", value: "App och siren via Aqara-hubb", highlight: true },
      { label: "Hubb krävs", value: "Ja, Aqara-hubb", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1", highlight: true },
      { label: "Batteri", value: "CR2032, medföljer", highlight: true },
      /* Aqara EU anger över 2 år, bekräftat av två oberoende återförsäljare mot
         modellbeteckningen WL-S02D. Läst 2026-08-06. Stod tidigare som "Ej
         angiven av butiken", vilket var vår research och inte produkten. */
      { label: "Batteritid", value: "Över 2 år", highlight: true },
      { label: "Drifttemperatur", value: "0 till 55 °C", highlight: true },
      { label: "Mått", value: "50 × 50 × 15 mm", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Anslutning", value: "Zigbee 3.0" },
      { label: "Vattentålighet", value: "IP67" },
      { label: "Modell", value: "WL-S02D" },
      { label: "EAN", value: "6975833352142" },
    ],
    verdict:
      "Femton millimeter hög, och det är hela argumentet. Ska larmet in under en diskmaskin eller bakom en toalettstol är Aqara T1 det enda som får plats, och de 229 kronorna köper dessutom IP67 och godkänt till 55 grader, alltså den högsta temperaturtåligheten bland larmen som når din telefon.\n\nBatteriet är en CR2032 som medföljer och håller över två år, och sensorn säger till i appen när det börjar ta slut. Zigbee 3.0 är rätt teknikval: det belastar inte wifi-nätet och blir stabilare ju fler enheter du har.\n\nMen ljudet sitter i hubben, inte i sensorn. Larmar den i tvättstugan hörs det i hallen där hubben står, och en Aqara-hubb kostar mer än larmet självt. Från noll landar du på närmare sex hundra kronor för att skydda ett ställe.\n\nHar du redan ett Aqara-hem är det här det bästa styckeköpet på sidan. Har du inget är SQ400B för 199 kronor samma nytta utan hubben.",
  },
  {
    id: "fibaro-flood-sensor",
    name: "Flood Sensor FGFS-101",
    shortName: "FGFS-101",
    brand: "Fibaro",
    image: productImage(VATTENLARM.slug, "fibaro-flood-sensor"),
    tagline: "Mäter temperatur, känner sabotage och klarar sig utan tillverkarens moln.",
    scores: {
      larmvag: 2.5,
      fristaende: 1,
      batteritid: 3.5,
      /* 4,0 och inte 4,5 sedan kapslingsklassen belagts 2026-08-06: IP20,
         alltså ingen tätning alls mot vatten, och märkt för inomhusbruk. Två
         oberoende källor anger samma sak. Kriteriet inleds med IP-klass, och
         den här sensorn hade näst högsta betyget på det trots fältets svagaste
         kapsling. Landar på samma nivå som Numens 204, som har IP42 och en
         längre sond. Se lib/corrections.ts. */
      sensorutforande: 4,
      prisvarde: 1.5,
    },
    price: 599,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/vattenlarm/fibaro-z-wave-vattenlarm-p50391",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 7, scale: 5, checkedAt: PRICE_CHECKED },
    award: "premium",
    superlative: "Mest funktion per enhet",
    pros: [
      "Mäter temperatur och kan varna för hastiga höjningar",
      "Sabotageskydd, larmar om någon flyttar den",
      "Inbyggd siren, batteriet medföljer",
      "Flyter, så den följer med uppåt i stället för att bli liggande under ytan",
      "Z-Wave Plus-certifierad och därmed oberoende av tillverkarens moln",
    ],
    cons: [
      "Kräver en Z-Wave-styrenhet, den dyraste förutsättningen något larm ställer",
      "IP20 och märkt för inomhusbruk, alltså svagaste kapslingen i jämförelsen",
      "Tre gånger priset på ett wifi-larm som klarar sig själv",
    ],
    specs: [
      { label: "Larmväg", value: "Inbyggd siren, app via Z-Wave-styrenhet", highlight: true },
      { label: "Hubb krävs", value: "Ja, Z-Wave-styrenhet", highlight: true },
      { label: "Antal sensorer", shortLabel: "Sensorer", value: "1", highlight: true },
      { label: "Batteri", value: "CR123A, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 2 år", highlight: true },
      { label: "Drifttemperatur", value: "0 till 40 °C", highlight: true },
      { label: "Mått", value: "Ø72 × 28 mm", highlight: true },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "Anslutning", value: "Z-Wave Plus, 868 MHz" },
      /* IP20 enligt Z-Wave Europes tekniska data och smarterhome.sk:s
         specifikation, båda lästa 2026-08-06 och överens. Att den flyter är
         Fibaros egen uppgift och motsäger inte kapslingen: höljet är otätat.
         Cellen bär båda, eftersom bara "flyter" bredvid IP66 och IP67 läses
         som mer vattentålighet än produkten har. */
      { label: "Vattentålighet", value: "IP20, men flyter på vattenytan" },
      { label: "Modell", value: "FGFS-101" },
    ],
    verdict:
      "Fibaro Flood Sensor kostar 599 kronor och är den enda sensorn här som gör mer än att känna vatten. Den mäter temperatur och kan larma för hastiga höjningar, och den har sabotageskydd som säger till om någon rubbar den.\n\nZ-Wave Plus gör den oberoende av tillverkarens moln, så den slutar inte fungera den dag en molntjänst läggs ner, vilket är den vanligaste tysta döden för billiga uppkopplade prylar. Den kan dessutom drivas på 12 till 24 volt om du vill slippa batteriet helt, och de teleskopiska proberna får kontakt även på ett ojämnt golv.\n\nKapslingen är svagheten, och den är oväntad i prisklassen. Fibaro anger IP20 och märker sensorn för inomhusbruk, alltså finns ingen tätning alls mot vatten, medan de billigaste larmen här har IP66 eller IP67. Att den flyter hjälper i en källare som svämmar över, men den ska inte ligga i ett fuktigt garage eller under en beredare som droppar.\n\nHar du redan byggt ett Z-Wave-hem och vill ha temperatur och sabotageskydd i samma enhet är den värd pengarna. Alla andra får mer skydd per krona av tre SQ400B.",
  },
  {
    id: "housegard-vattenlarm",
    name: "Vattenlarm WA201S",
    shortName: "WA201S",
    brand: "Housegard",
    image: productImage(VATTENLARM.slug, "housegard-vattenlarm"),
    tagline: "Tål 60 grader och har fem års garanti, utan konto och utan app.",
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
    userRating: { value: 4.5, count: 39, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Enklast tänkbara",
    pros: [
      "Ingenting att installera, ingen app och inget konto",
      "Godkänd till +60 °C, alltså den som tål mest värme intill en varmvattenberedare",
      "Fem års garanti, längst i jämförelsen tillsammans med X-Sense",
      "Varnar när batteriet börjar ta slut, och batteriet medföljer",
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
      { label: "Larmstyrka", value: "85 dB på 3 m", highlight: true },
      { label: "Batteri", value: "9 V, medföljer", highlight: true },
      { label: "Batteritid", value: "Upp till 2 år", highlight: true },
      /* Högsta övre gräns i jämförelsen. housegard.se, läst 2026-08-06. */
      { label: "Drifttemperatur", value: "+1 till +60 °C", highlight: true },
      { label: "Mått", value: "Ø83 × 30 mm", highlight: true },
      { label: "Garanti", value: "5 år", highlight: true },
      { label: "Anslutning", value: "Ingen, larmar på plats" },
      { label: "Modell", value: "WA201S" },
    ],
    verdict:
      "Housegard WA201S kostar 229,90 kronor och är märket folk känner igen från brandvarnaren i taket. Produkten är gjord för samma enkelhet: ställ den på golvet, klart. Tre sensorer i botten känner vatten via underlagets ledningsförmåga, och det finns inget konto att skapa.\n\nTvå saker skiljer den från de andra sirenlarmen. Den är godkänd till 60 grader, högst av alla nio, alltså den som får ligga närmast en varmvattenberedare. Och Housegard ger fem års garanti, dubbelt mot vad Deltronic, Aqara, Fibaro och TP-Link lämnar.\n\nDen kostar ändå trettio kronor mer än Numens 204 för att göra mindre. Numens håller över fem år på ett batteri mot Housegards två, tål minusgrader och har en sond som når 1,5 meter från enheten, medan den runda dosan här måste få plats där du vill mäta.\n\nVill du ha ett svenskt märke med lång garanti intill beredaren är den rätt. Ska larmet ligga i ett kallt utrymme eller nå din telefon är den fel, och då är Numens 204 respektive SQ400B billigare och bättre.",
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
  /**
   * Klarar mer än 40 °C, alltså får ligga intill en varmvattenberedare.
   *
   * Rättat 2026-08-06 mot tillverkarnas egna specifikationer. Flaggan stod
   * tidigare bara på Aqara, vilket fick väljaren att svara att ett enda larm
   * dög vid beredaren. Sex av nio klarar över 40 °C, och Housegard klarar mest
   * av alla med +60 °C.
   */
  hotSpot: boolean;
};

export const VATTENLARM_CAPABILITIES: LeakSensorCapability[] = [
  // Drifttemperaturer ur tillverkarnas egna specifikationer, lästa 2026-08-06.
  { id: "x-sense-sws54", reach: "app", spots: 3, batteryYears: 3, reachesTightSpots: false, hotSpot: true }, // 0–50 °C
  { id: "sq400b-wifi-vattenvarnare", reach: "app", spots: 1, batteryYears: 1, reachesTightSpots: false, hotSpot: true }, // 0–50 °C
  { id: "nedis-smartlife-lackagedetektor", reach: "app", spots: 1, batteryYears: 2, reachesTightSpots: true, hotSpot: false }, // 0–40 °C
  { id: "numens-204", reach: "siren", spots: 1, batteryYears: 5, reachesTightSpots: true, hotSpot: true }, // −10 till +50 °C
  { id: "tp-link-tapo-t300", reach: "hubbapp", hub: "tapo", spots: 1, batteryYears: 3, reachesTightSpots: false, hotSpot: false }, // 0–40 °C
  { id: "x-sense-sws51", reach: "siren", spots: 1, batteryYears: 3, reachesTightSpots: false, hotSpot: true }, // 0–50 °C
  { id: "aqara-water-leak-sensor-t1", reach: "hubbapp", hub: "aqara", spots: 1, batteryYears: 2, reachesTightSpots: false, hotSpot: true }, // 0–55 °C
  { id: "fibaro-flood-sensor", reach: "hubbapp", hub: "zwave", spots: 1, batteryYears: 2, reachesTightSpots: false, hotSpot: false }, // 0–40 °C
  { id: "housegard-vattenlarm", reach: "siren", spots: 1, batteryYears: 2, reachesTightSpots: false, hotSpot: true }, // +1 till +60 °C
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
      "Utgången. Proshop anger uttryckligen Discontinued och Kjell har den inte i lager. Shelly har gått vidare till senare generationer, men vi hittade ingen av dem hos någon svensk butik vid kontrollen 2026-08-03. Vi rankar inte produkter som slutat tillverkas, så den ligger här i stället. Hittar du den kvar på hyllan är den fortfarande ett vettigt wifi-larm som klarar sig utan hubb och mäter temperatur.",
    approxPrice: 191,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Shelly-Flood/2973204",
  },
  {
    brand: "Aqara",
    name: "Valve Controller T1",
    reason:
      "Inte ett larm utan en avstängningsventil: den sitter på röret och vrider av vattnet när en sensor larmar. Hör alltså hemma i nivån ovanför den här sidan, och den rankas i vårt test av vattenfelsbrytare i stället. Bra att veta redan här: den kräver både en Aqara-hubb och en separat läckagesensor, så 819 kronor blir i praktiken det dubbla. Har dessutom ett enda kundbetyg, en etta.",
    approxPrice: 819,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/vattenlarm/aqara-valve-controller-t1-p56579",
  },
  {
    brand: "LK Systems",
    name: "Cubicsecure",
    reason:
      "Vattenfelsbrytare och inte vattenlarm. Den mäter flöde, tryck och temperatur och stänger av inkommande vatten till hela huset, och den är den enda produkttypen som ger tio procents rabatt på villaförsäkringen. Den kostar också tjugofem gånger mer än larmen i listan, och den är dessutom typgodkänd med certifikat C900737 från 2024, vilket inget larm på den här sidan är. Vi jämför den inte mot en sensor för 199 kronor. Den ligger i stället först i vårt test av vattenfelsbrytare.",
    approxPrice: 5373,
  },
  {
    brand: "Grohe",
    name: "Sense Guard",
    reason:
      "Samma sak som Cubicsecure: vattenfelsbrytare, egen prisklass, eget test hos oss. Ligger med här för att flera svenska jämförelser blandar in den bland vanliga vattenlarm utan att säga att den kräver rörmokare. Grohe har sedan dess slutat sälja den, vilket de skriver ut på sin egen produktsida.",
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
      "Basstationen såld separat, för den som redan har SWS51-sensorer och vill få dem uppkopplade. Ingen sensor och därmed inget vattenlarm i sig, men värd att känna till: utan den tjuter SWS51 bara på golvet, med den når larmet din telefon.",
  },
];

export const VATTENLARM_FAQ = [
  {
    question: "Vad är skillnaden mellan vattenlarm och vattenfelsbrytare?",
    answer:
      "Ett vattenlarm känner av vatten på golvet och larmar. En vattenfelsbrytare mäter flöde, tryck och temperatur i inkommande ledning och stänger av vattnet automatiskt. Larmet kostar 179 till 876 kronor och lägger du dit själv. Felsbrytaren kostar enligt Länsförsäkringar 6 000 till 10 000 kronor installerad och kräver rörmokare. Larmet varnar dig, felsbrytaren stoppar skadan.",
  },
  {
    question: "Måste ett vattenlarm vara typgodkänt?",
    answer:
      "Inte för att du ska få lägga det under diskbänken i ditt eget kök. Men sedan 1 januari 2026 gäller Branschregler Säker Vatteninstallation 2026:1, och där ska den vattentäta insatsen eller tråget i ett kök ha en fuktsensor kopplad till en läckagebrytare, vattenfelsbrytare eller ett vattenlarm. Produkten ska då vara typgodkänd enligt certifieringsregeln CR 139. Kravet träffar arbete som projekteras eller påbörjas efter årsskiftet, alltså nybyggnation och köksrenovering, och arbete med bygglov från före årsskiftet får följa den gamla utgåvan 2021:2. Branschregler är inte lag utan en standard som försäkringsbolag och beställare hänvisar till.",
  },
  {
    question: "Vilka vattenlarm är typgodkända enligt CR 139?",
    answer:
      "Tollco anger C901472 för sina vattenlarm, och det omfattar både den batteridrivna och den nätanslutna modellen samt löpande kontroll av tillverkningen. Gäller kravet ditt bygge är certifikatnumret det du ska be om, eftersom det är numret din VVS-installatör kan kontrollera mot RISE register. Ordet godkänd på en förpackning betyder ingenting i sammanhanget.",
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
      "X-Sense SWS54 med basstation, om du ska skydda ett hus. Det är det enda köpet som ger tre sensorer, notis i mobilen utan att du behöver äga en hubb sedan tidigare, och som fortsätter larma lokalt även vid strömavbrott. Ska du bara skydda ett ställe i en lägenhet är SQ400B för 199 kronor rätt val.",
  },
  {
    question: "Vad kostar ett vattenlarm?",
    answer:
      "De larm vi rankar kostar mellan 179 och 876 kronor, kontrollerat 2026-08-03. Ett enkelt larm med bara siren ligger runt 200 kronor, ett wifi-anslutet som når mobilen ligger på ungefär samma nivå, och ett paket med basstation och tre sensorer runt 900. Kräver larmet en hubb tillkommer den kostnaden.",
  },
  {
    question: "Var ska man placera ett vattenlarm?",
    answer:
      "Där vatten kommer in i huset och där maskiner står. Enligt Vattenskadecentrum sker flest skador i köket och orsakas av vitvaror, så under diskbänken och bakom diskmaskinen är första platsen. Därefter tvättstuga, bakom tvättmaskinen, och vid varmvattenberedaren. Lägg larmet på golvet på den lägsta punkten, eftersom vatten söker sig dit först.",
  },
  {
    question: "Larmar ett vattenlarm i mobilen?",
    answer:
      "Bara om det är byggt för det. Numens 204, Housegard och X-Sense SWS51 utan basstation har enbart en siren och når dig aldrig när du inte är hemma. Nedis SmartLife är uppkopplad men skickar ingen notis förrän du själv skapat en automation i appen. Prova därför larmet med en matsked vatten samma dag du sätter dit det, med telefonen i handen.",
  },
  {
    question: "Vad gör jag när vattenlarmet larmar?",
    answer:
      "Stäng huvudkranen först, torka sedan. Ett vattenlarm är en klocka och inte en ventil: det talar om att vatten runnit ut, men det stoppar ingenting. Hela värdet ligger i de minuter du vinner, och de minuterna är bortkastade om du måste leta efter avstängningen medan golvet blir blött. Ta reda på var huvudkranen sitter innan du behöver den, och märk den. I en villa sitter den oftast där servisledningen kommer in, i en lägenhet vid schaktet i badrum eller kök. Är vattnet nära ett eluttag, en förlängningssladd eller en vitvara ska du bryta strömmen till den gruppen innan du börjar torka. Dokumentera med bilder innan du städar undan, eftersom försäkringsbolaget kommer att fråga. Och leta efter orsaken: rinner det fortfarande när huvudkranen är stängd kommer vattnet inte från tappvattnet utan från avloppet eller utifrån."
  },
  {
    question: "Hur testar jag att ett vattenlarm fungerar?",
    answer:
      "Doppa sensorn i vatten, ungefär en gång i kvartalet och alltid efter ett batteribyte. Men testa två saker och inte ett: att larmet tjuter där det ligger, och att notisen faktiskt kommer fram till telefonen. Det är två olika kedjor som går sönder på olika sätt. Sirenen sitter i sensorn och fungerar så länge batteriet gör det. Notisen går via hubb, router, internet och tillverkarens server, och den kan tystna utan att något syns. Gör därför testet med telefonen i handen och mobildata påslaget i stället för wifi, så att du provar hela vägen. Ett larm som stått orört i tre år bakom en tvättmaskin är dessutom värt att titta på: kontakterna kan oxidera, och en sensor som inte känner vatten larmar aldrig hur välladdad den än är."
  },
  {
    question: "Hur länge håller batteriet i ett vattenlarm?",
    answer:
      "Mellan ett och fem år bland dem vi jämför. Numens 204 uppges hålla över fem år, X-Sense tre, Nedis, Aqara, Fibaro och Housegard två, Tapo T300 ett och ett halvt när den arbetar mot sin hubb, och SQ400B ett. Det spelar större roll än det låter, eftersom ett vattenlarm är en produkt du sätter ut och slutar tänka på. Ett larm med tomt batteri är sämre än inget larm, för då tror du att du är skyddad.",
  },
  {
    question: "Fungerar vattenlarm i ouppvärmda utrymmen?",
    answer:
      "Ett av dem gör det. Numens 204 är godkänd från −10 grader och är den enda i jämförelsen som får ligga i ett ouppvärmt garage, en krypgrund eller en stuga på vintern. De övriga åtta börjar på 0 eller +1 grad, vilket i praktiken tar slut i oktober. Åt andra hållet tål Housegard WA201S mest värme med +60 grader, följt av Aqara T1 på +55. Kontrollera arbetstemperaturen i tillverkarens specifikation, för den står sällan i butiksrubriken.",
  },
  {
    question: "Hur mycket kostar en vattenskada?",
    answer:
      "Enligt Vattenskadecentrum är snittkostnaden 49 700 kronor per skada, och för lägenheter mellan 80 000 och 133 000 kronor. Även med försäkring betalar du självrisken, som ligger mellan 3 440 och 10 000 kronor, plus åldersavdrag på 9 700 till 26 100 kronor. Det är den summan ett larm för 199 kronor ska ställas mot.",
  },
];
