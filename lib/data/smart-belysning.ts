import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { SMART_BELYSNING } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /smart-belysning.
 *
 * Prices, product names, GTINs and merchant URLs were read from the retailers'
 * own product pages on PRICE_CHECKED, and the URLs below are the canonical
 * ones after redirects. Kjell in particular 302s from its campaign paths, and
 * linking to a redirect wastes a hop for both the reader and the crawler.
 *
 * AFFILIATE-SWAP — `merchantUrl` is what ships in the href today: direct,
 * untracked, dofollow. No `affiliateUrl` anywhere yet, by decision: we do not
 * apply to any Adtraction program until at least 16 pages exist. See
 * lib/links.ts.
 *
 * ## testomdome, infört retroaktivt 2026-08-01, omräknat 2026-08-06
 *
 * Tre av fem lampor saknar ett publicerat omdöme om just den modell vi rankar,
 * och fältet utelämnas då i stället för att gissas. Sidan skriver "Ej testat"
 * på raden.
 *
 * ⚠️ **Sidan skickar `redistributeMissing: false`.** Förvalet fördelar om det
 * saknade kriteriets vikt på de övriga, och det vände rankningen: kriteriet
 * väger 15, tre av fem lampor saknade det, och de billigaste passerade Råd &
 * Röns testvinnare på 85 viktpoäng mot Hues 100. KAJPLATS landade på 4,48 mot
 * Hues 4,09 utan att ha vunnit ett enda kriterium den mätts på. Summan räknas
 * därför mot full vikt här. Se lib/products.ts.
 *
 * Två av utelämnandena beror på att testet gäller en **annan produkt** än den
 * som namnet antyder, vilket är lätt att missa:
 *
 * - Ljud & Bild testar "Nanoleaf **Lines**", en ljusstav, inte Essentials E27.
 * - Tek.no testar "TP-Link **LB120**", inte Tapo L530E.
 *
 * Det tredje är KAJPLATS, som är för ny för att någon ska ha hunnit prova den.
 *
 * ## KAJPLATS ersatte TRÅDFRI 2026-08-06
 *
 * Sidan rankade fram till dess `TRÅDFRI E27 806 lm vitt spektrum` och skrev på
 * fyra ställen att IKEA inte längre säljer en färgad E27. Det stämde inte:
 * IKEA har bytt serie. `KAJPLATS LED ljuskälla E27 1055 lumen, smart färgat
 * och vitt spektrum` kostar 99 kronor, har färgåtergivning 90, 0,2 W i
 * viloläge och Matter över Thread. TRÅDFRI-drivaren är märkt "Utgår inom
 * kort". Se lib/corrections.ts.
 *
 * ## Färgåtergivning och R9, hämtade ur EPREL 2026-08-06
 *
 * Kriteriet väger tyngst på sidan och saknade rad i tabellen.
 *
 * ⚠️ **Butikens PIM räcker inte.** Nanoleafs tal togs först ur Proshop, som
 * angav 1 100 lm, CRI 90, 0,5 W vila och 8,5 W. Tillverkarens egen
 * EU-registrering säger 806 lm, CRI 91, 0,3 W och 9 W. Fyra fel i en post.
 * Gå till EPREL, inte till butiken.
 *
 *   Lampa      CRI   R9    ɸuse     Vila     EPREL
 *   Nanoleaf    91    52    806 lm   0,3 W    1343226  (modell NL67E200)
 *   KAJPLATS    90    40  1 055 lm   0,2 W    2320819  (modell LED2405G8)
 *   Hue         80     0  1 055 lm   0,50 W   1522883
 *   WiZ         80     0    806 lm   0,50 W   1421108
 *   Tapo        80     —    806 lm   0,37 W   1438602
 *
 * Ljusflödet är användbart ljusflöde (ɸuse) enligt EU 2019/2015 för alla fem,
 * alltså ett mått. Kjell anger marknadsföringstalet 1 100 lm vid 4 000 K för
 * Hue; registreringen säger 1 055.
 *
 * R9 är det röda indexet och avgör om kött, tegel och hudton ser rätt ut. Ett
 * högt CRI kan dölja ett uselt R9, vilket är precis vad Signify deklarerar för
 * både Hue och WiZ. IKEA publicerar inget R9. TP-Link deklarerar **två olika**
 * för samma modell, 0 i EPREL 1438602 och 2303207 mot 8 i 2567631 och 1579394,
 * så den cellen är ett streck.
 *
 * Icecat gick inte att använda: vår nyckel ger bara Open Icecat, och Nanoleaf
 * är inte sponsrat varumärke där. EPREL:s API svarar 403 på curl men fungerar
 * inifrån en webbläsarsession, med
 * `?genericField=MODEL_IDENTIFIER&modelIdentifier=…`.
 *
 * ⚠️ Utmärkelserna bakom Hues och WiZ betyg är matchade på **modellnamn, inte
 * GTIN**. Råd & Rön skriver "Hue White and color ambiance" och "Wiz E27 A60
 * 922-65 RGB". Att 922-65 betyder 2200-6500 K RGB och alltså är vår
 * `wiz-color-a60-e27` är en tolkning. Innan en synlig utmärkelsebadge byggs
 * enligt IDÉ-001 måste matchningen bekräftas, eftersom fel produkt bakom en
 * utmärkelse är värre än ingen utmärkelse alls.
 *
 * Kriteriepoängen är redaktionell bedömning ur de testade källorna i
 * lib/sources.ts, inte mätningar. Det står också i sidans metodavsnitt.
 *
 * ## Priserna kontrolleras om, de rör sig
 *
 * WiZ Color A60 låg på 103 kronor vid bygget 2026-08-01 och på 129 två dagar
 * senare, alltså 25 procent upp på en sida som redan var live. Sedan
 * 2026-08-03 körs `pnpm priskoll` mot butikernas egna sidor, se
 * .agent/plans/priskoll-automatisk.md.
 */

export const PRICE_CHECKED = "2026-08-03";

const SEEDS: ProductSeed[] = [
  {
    id: "philips-hue-color-ambiance-e27",
    userRating: { value: 5, count: 73, checkedAt: PRICE_CHECKED },
    brand: "Philips Hue",
    name: "Color Ambiance E27 1100 lm",
    image: productImage(SMART_BELYSNING.slug, "philips-hue-color-ambiance-e27"),
    tagline: "Går ner till 2 000 kelvin, varmare kvällsljus än någon annan lampa.",
    scores: {
      /* 3,0 sedan EPREL 1522883 hämtades 2026-08-06: CRI 80 och R9 0, alltså
         inget rött alls i det deklarerade värdet. Kriteriet väger också in
         färgtemperaturomfånget, och 2 000–6 500 K är bredast av de fem, vilket
         är skälet att den ändå ligger över WiZ på samma CRI. */
      fargatergivning: 3,
      dimring: 5,
      anslutning: 5,
      /* Råd & Rön: "får också högst samlat betyg i testet och vi utser den
         till Bäst i test". Tek.no gav den best-i-test i sitt samletest, och
         både TechRadar och Expert Reviews är positiva. Det tyngsta underlaget
         för någon enskild produkt i hela projektet. */
      testomdome: 5,
      /* 5,0: 1 055 lm användbart ljusflöde enligt EPREL 1522883, delad högst
         med KAJPLATS. Kriteriet räknar på samma mått för alla fem. */
      ljusstyrka: 5,
      prisvarde: 2,
      /* PstLM 1,0 enligt EPREL 1522883. Gränsen är 1,0.
         Exakt på gränsvärdet, se kriteriets beskrivning. */
      flimmer: 2.5,
    },
    price: 599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/smarta-hem/philips-hue/philips-hue-ljuskallor/philips-hue-color-ambiance-smart-led-lampa-e27-1100-lm-p51501",
    award: "winner",
    superlative: "Bäst för många lampor",
    pros: [
      "Går ner till 2 000 K, alltså levande ljus, och ingen av de andra kommer under 2 200",
      "Zigbee-nätet blir stabilare ju fler lampor du sätter upp, tvärtemot wifi",
      "Fungerar med Google, Alexa, HomeKit och Matter via bryggan",
    ],
    cons: [
      "Färgåtergivning 80, tio steg under IKEA KAJPLATS som kostar en sjättedel",
      "Rött index 0 i Philips egen deklaration, mot Nanoleafs 52. Rött och hudton faller platt",
      "Bryggan krävs för scheman och fjärrstyrning, och kostar utöver lampan",
    ],
    specs: [
      /* Samtliga fem tal är användbart ljusflöde (ɸuse) enligt EU 2019/2015,
         alltså mätt likadant. EPREL 1522883, hämtad 2026-08-06. Kjell anger
         marknadsföringstalet 1 100 lm vid 4 000 K och 800 lm vid 2 700 K. */
      { label: "Ljusflöde", shortLabel: "Lumen", value: "1 055 lm", highlight: true },
      /* EPREL 1522883: colourRenderingIndex 80, r9ColourRenderingIndex 0. */
      { label: "Färgåtergivning", shortLabel: "CRI", value: "80", highlight: true },
      { label: "Flimmer", shortLabel: "PstLM", value: "1,0", highlight: true },
      { label: "Rött index", shortLabel: "R9", value: "0", highlight: true },
      { label: "Färgtemperatur", shortLabel: "Kelvin", value: "2 000–6 500 K", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Zigbee + Bluetooth", highlight: true },
      /* powerStandbyNetworked, EPREL 1522883. */
      { label: "Viloförbrukning", shortLabel: "Vila", value: "0,50 W", highlight: true },
      { label: "Märklivslängd", shortLabel: "Livslängd", value: "25 000 h", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "11 W" },
      { label: "Matter", value: "Via Hue Bridge" },
    ],
    verdict:
      "Philips Hue Color Ambiance går ner till 2 000 kelvin, alltså levande ljus, och ingen av de andra lamporna kommer under 2 200. Den kostar 599 kronor och är dyrast av de fem.\n\nZigbee är det som bär den. Lamporna bildar ett eget nät där var och en reläar åt de andra, så uppkopplingen blir stabilare ju fler du sätter upp, medan Wi-Fi-lamporna börjar tappa runt tio enheter på samma router. Dimringen går hela vägen ner utan att blinka, vilket är precis där de billigare lamporna börjar synas på kvällen. **Råd & Rön utser den till Bäst i test och Tek.no gav den samma placering i sitt samlingstest.**\n\nFärgåtergivningen står däremot inte i proportion till priset. Philips deklarerar CRI 80, samma tal som WiZ för 129 kronor och tio steg under IKEA KAJPLATS. Värre är det röda indexet: **Philips anger R9 till 0, medan Nanoleaf anger 52 för en lampa som kostar en tredjedel.** R9 är just det som avgör om kött, tegel och hudton ser rätt ut, och ett högt CRI kan dölja ett uselt R9.\n\nSka ljuset i hela hemmet vara smart är det ändå den här du ska ha. Trettio lampor på Zigbee fungerar den dag trettio lampor på wifi har slutat göra det, och det är den skillnaden pengarna köper.",
  },
  {
    id: "nanoleaf-essentials-e27",
    brand: "Nanoleaf",
    name: "Essentials Smart E27 (Matter)",
    shortName: "Essentials E27 Matter",
    image: productImage(SMART_BELYSNING.slug, "nanoleaf-essentials-e27"),
    tagline: "Ligger i Apple, Google, Alexa och SmartThings samtidigt.",
    scores: {
      /* CRI 91 och R9 52 enligt EPREL 1343226 för modell NL67E200, hämtad
         2026-08-06. Bäst rött index av de tre som deklarerar ett. Stannar på
         4,5 eftersom kriteriet även väger färgtemperaturomfånget, och 2 700 K
         är den varmaste punkt lampan når. KAJPLATS går ner till 2 200. */
      fargatergivning: 4.5,
      dimring: 4,
      anslutning: 5,
      /* testomdome utelämnas: Ljud & Bild testar Nanoleaf Lines, en ljusstav,
         inte Essentials E27. Ingen oberoende part har testat vår modell. */
      /* 3,5 sedan 2026-08-06. Låg på 4,5 med 1 100 lm ur Proshops PIM. EPREL
         1343226 anger 806 lm användbart ljusflöde, alltså samma som WiZ och
         Tapo och 250 under KAJPLATS. Butikens PIM hade fel. */
      ljusstyrka: 3.5,
      /* 3,5 av samma skäl: 232 kronor för samma 806 lm som WiZ ger för 129. */
      prisvarde: 3.5,
      /* PstLM 0,1 enligt EPREL 1343226. Gränsen är 1,0.
         En tiondel av det tillåtna. */
      flimmer: 5,
    },
    price: 232,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Nanoleaf-Essentials-Smart-E27-Bulb-Matter/3170357",
    superlative: "Bäst för blandade ekosystem",
    pros: [
      "Rött index 52, bäst av de tre lampor som deklarerar ett. Hue och WiZ anger 0",
      "Färgåtergivning 91, högst av alla fem",
      "Ligger i Apple Home, Google Home, Alexa och SmartThings samtidigt",
    ],
    cons: [
      "806 lumen för 232 kronor, alltså samma ljus som WiZ ger för 129",
      "Går inte varmare än 2 700 K, så kvällsljuset blir aldrig levande-ljusvarmt",
      "Utan en Thread border router faller den till Bluetooth och tappar sin fördel",
    ],
    specs: [
      /* EPREL 1343226 för modell NL67E200, hämtad 2026-08-06. Proshops PIM
         angav 1 100 lm, 90 i CRI, 0,5 W vila och 8,5 W effekt. Fyra av de
         talen stämde inte mot tillverkarens egen registrering. */
      { label: "Ljusflöde", shortLabel: "Lumen", value: "806 lm", highlight: true },
      { label: "Färgåtergivning", shortLabel: "CRI", value: "91", highlight: true },
      { label: "Flimmer", shortLabel: "PstLM", value: "0,1", highlight: true },
      { label: "Rött index", shortLabel: "R9", value: "52", highlight: true },
      { label: "Färgtemperatur", shortLabel: "Kelvin", value: "2 700–6 500 K", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Thread + Matter", highlight: true },
      { label: "Viloförbrukning", shortLabel: "Vila", value: "0,3 W", highlight: true },
      { label: "Märklivslängd", shortLabel: "Livslängd", value: "25 000 h", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "9 W" },
      { label: "Matter", value: "Inbyggt" },
    ],
    verdict:
      "Nanoleaf Essentials kör Matter över Thread utan mellanled och kostar 232 kronor. Den är lampan med bäst färgkvalitet på sidan, mätt på det tal som faktiskt skiljer.\n\nCRI ligger på 91, högst av alla fem. **Viktigare är rött index: Nanoleaf deklarerar 52, medan Philips och WiZ anger 0.** R9 avgör om kött, tegel och hudton ser levande ut eller gråa, och det är den enda siffran som skiljer en dyr vit lampa från en billig. Har du en HomePod, Apple TV, nyare Nest Hub eller Dirigera hemma har du redan den border router som krävs, och lampan ligger då i Apple Home, Google Home, Alexa och SmartThings samtidigt.\n\nLjuset räcker däremot inte till priset. 806 lumen är samma som WiZ ger för 129 kronor och 250 mindre än IKEA ger för 99, och lampan går inte varmare än 2 700 K, så levande-ljusvarmt på kvällen får du inte.\n\nBor du i ett kök eller ett matrum där färgerna på tallriken spelar roll är den värd mellanskillnaden. Ska den bara lysa upp ett rum betalar du 133 kronor extra mot IKEA för mindre ljus.",
  },
  {
    id: "tp-link-tapo-l530e",
    brand: "TP-Link",
    name: "Tapo L530E RGBW E27",
    image: productImage(SMART_BELYSNING.slug, "tp-link-tapo-l530e"),
    tagline: "I gång på två minuter, och den mäter själv vad den drar.",
    scores: {
      /* 3,0 sedan CRI hämtades 2026-08-06: TP-Link anger ≥80 på sin
         specifikationsflik, alltså samma golv som Hue och WiZ, och omfånget
         stannar vid 2 500 K i den varma änden. */
      fargatergivning: 3,
      dimring: 3.5,
      anslutning: 3.5,
      /* testomdome utelämnas: Tek.no testar TP-Link LB120, inte Tapo L530E.
         Det omdömet ("Svakt") gäller en annan lampa och får inte smittas hit. */
      /* 3,5 och inte 4,0 sedan ljusstyrkan räknas på varmvitt ljus: 806 lm
         mot KAJPLATS 1 055 vid samma färgtemperatur. */
      ljusstyrka: 3.5,
      /* 3,5 och inte 4,0: 299 kronor är tre gånger KAJPLATS pris för färre
         lumen, lägre CRI och utan Matter. */
      prisvarde: 3.5,
      /* PstLM 0,1 enligt EPREL 1438602. Gränsen är 1,0.
         En tiondel av det tillåtna. */
      flimmer: 5,
    },
    price: 299,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Power",
    merchantUrl:
      "https://www.power.se/smart-home/smart-belysning/smarta-glodlampor/tp-link-tapo-l530e-rgbw-smart-ljuskalla-e27/p-1173881/",
    superlative: "Enklast att komma igång med",
    pros: [
      "Skruva i, öppna appen, klart. Varken brygga eller border router",
      "Mäter själv vad lampan drar, vilket ingen av de andra gör",
      "Schemaläggningen går att ställa in utan att gissa sig fram",
    ],
    cons: [
      "Inget Matter, så den fungerar så länge TP-Link driver sin molntjänst. Vill du ha Matter från TP-Link heter lampan L535E",
      "806 lumen och färgåtergivning 80 för 299 kronor, mot IKEA:s 1 055 och 90 för 99 kronor",
      "Varje lampa tar en plats på wifi-nätet, och runt tio enheter börjar en vanlig router klaga",
    ],
    specs: [
      { label: "Ljusflöde", shortLabel: "Lumen", value: "806 lm", highlight: true },
      /* tapo.com och EPREL 1438602 för Tapo L530E 3.0 anger båda 80. */
      { label: "Färgåtergivning", shortLabel: "CRI", value: "80", highlight: true },
      { label: "Flimmer", shortLabel: "PstLM", value: "0,1", highlight: true },
      /* TP-Links fyra EU-registreringar av samma modell säger emot varandra:
         1438602 och 2303207 anger R9 0, medan 2567631 och 1579394 anger 8. En
         tillverkare som deklarerar två värden för en produkt har inte gett oss
         ett. Cellen är ett streck. Se .agent/research/smart-belysning.md. */
      { label: "Rött index", shortLabel: "R9", value: "Ej angiven", highlight: true },
      { label: "Färgtemperatur", shortLabel: "Kelvin", value: "2 500–6 500 K", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Wi-Fi 2,4 GHz", highlight: true },
      /* powerStandbyNetworked 0,37 W i samtliga fyra EPREL-poster. TP-Links
         eget datablad avrundar till 0,4 W. */
      { label: "Viloförbrukning", shortLabel: "Vila", value: "0,37 W", highlight: true },
      { label: "Märklivslängd", shortLabel: "Livslängd", value: "25 000 h", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "8,7 W" },
      { label: "Matter", value: "Nej" },
    ],
    verdict:
      "TP-Link Tapo L530E ansluter direkt till wifi och är i gång på två minuter. Den kostar 299 kronor och ger 806 lumen.\n\nAppen är den mest genomarbetade av Wi-Fi-lamporna, och schemaläggningen går att ställa in utan att gissa vad reglagen gör. Lampan mäter dessutom vad den själv drar, vilket ingen av de andra fyra gör. Undrar du vad belysningen kostar dig i kronor är det här lampan som svarar.\n\nDen saknar Matter, och det är den dyra bristen. Lampan fungerar så länge TP-Link driver sin molntjänst, och den dagen du vill flytta den till Apple Home eller SmartThings går det inte. För 299 kronor får du dessutom 806 lumen och färgåtergivning 80, mot 1 055 lumen och 90 hos IKEA för 99 kronor. TP-Link deklarerar dessutom två olika röda index för samma lampa i sina fyra EU-registreringar, 0 i två och 8 i två, så det talet går inte att luta sig mot.\n\nVill du ha en TP-Link-lampa med Matter heter den L535E och ger 1 055 lumen. Den här är svår att motivera i dag om du inte redan har halva hemmet i Tapo-appen.",
  },
  {
    id: "ikea-kajplats-e27-farg",
    /* ikea.se, läst 2026-08-06. Sidans lägsta kundbetyg, och lågt nog att stå
       i omdömet. Vad de 148 klagar på går inte att läsa: IKEA laddar
       recensionstexterna med JavaScript och de kom inte med i någon rung. */
    userRating: { value: 3.1, count: 148, checkedAt: "2026-08-06" },
    brand: "IKEA",
    name: "KAJPLATS E27 1055 lm, färgat och vitt spektrum",
    shortName: "KAJPLATS E27 1055 lm",
    image: productImage(SMART_BELYSNING.slug, "ikea-kajplats-e27-farg"),
    tagline: "Samma 1 055 lumen som Hue ger, för en sjättedel av pengarna.",
    scores: {
      /* Färgåtergivning 90 enligt ikea.se, näst högst av de fem: Nanoleaf
         deklarerar 91 i EPREL. KAJPLATS får ändå 5,0 och Nanoleaf 4,5, och
         skälet är omfånget, inte CRI. 2 200–6 500 K når både levande ljus och
         dagsljus, medan Nanoleaf stannar på 2 700 K i den varma änden. */
      fargatergivning: 5,
      /* 3,0: lampan är trådlöst dimbar, men färgtemperaturen växlar i fyra
         fasta steg med fjärrkontrollen i stället för glidande, och inget
         dimringsgolv finns publicerat. Den får inte betyg den inte visat. */
      dimring: 3,
      /* 4,5 och inte 5,0 som Nanoleaf: Matter över Thread är inbyggt, men
         IKEA:s Thread-stack är nyare och kundbetyget på 3,1 talar emot att ge
         full pott på stabilitet. */
      anslutning: 4.5,
      /* testomdome utelämnas: modellen är för ny för att någon oberoende part
         ska ha hunnit prova den. Sidan räknar utan omfördelning, se
         filhuvudet, så kriteriet ger noll poäng i stället för gratispoäng. */
      ljusstyrka: 5,
      prisvarde: 5,
      /* PstLM 1,0 enligt EPREL 2320819. Gränsen är 1,0.
         Exakt på gränsvärdet, se kriteriets beskrivning. */
      flimmer: 2.5,
    },
    price: 99,
    priceCheckedAt: "2026-08-06",
    merchant: "IKEA",
    merchantUrl:
      "https://www.ikea.com/se/sv/p/kajplats-led-ljuskaella-e27-1055-lumen-smart-faergat-och-vitt-spektrum-globformad-opalvit-70608575/",
    award: "budget",
    superlative: "Billigast med färg",
    pros: [
      "1 055 lumen för 99 kronor, samma ljusflöde som Philips Hue ger för 599",
      "Färgåtergivning 90, tio steg över Hue och WiZ",
      "0,2 W i viloläge, mindre än hälften av vad Hue och WiZ drar dygnet runt",
    ],
    cons: [
      "Kundbetyget hos IKEA ligger på 3,1 av 5 efter 148 omdömen",
      "Färgtemperaturen växlar i fyra fasta steg med fjärrkontrollen: 2 200, 2 700, 4 000 och 6 500 K",
      "Kräver en Thread border router, till exempel DIRIGERA, HomePod eller Apple TV",
    ],
    specs: [
      /* ikea.se anger 1 055 lm som förinställt ljusflöde vid förinställda
         2 700 K, alltså mätt i varmt ljus. Läst 2026-08-06. */
      { label: "Ljusflöde", shortLabel: "Lumen", value: "1 055 lm", highlight: true },
      { label: "Färgåtergivning", shortLabel: "CRI", value: "90", highlight: true },
      { label: "Flimmer", shortLabel: "PstLM", value: "1,0", highlight: true },
      /* R9 40 enligt EPREL 2320819, modell LED2405G8. Näst högst av de fem,
         och fyrtio steg över Hue och WiZ som båda deklarerar 0.

         ⚠️ Cellen stod som "Ej angiven" fram till 2026-08-06 med motiveringen
         att IKEA registrerar under artikelnummer och inte under KAJPLATS. Det
         stämmer för en namnsökning i EPREL, men produktsidan länkar fichen
         direkt: `Produktinformationsblad` går till eprel.ec.europa.eu/qr/2320819.
         Samma läxa som i filhuvudet ovan, en gång till: öppna dokumentet
         butiken länkar innan du skriver att uppgiften saknas. */
      { label: "Rött index", shortLabel: "R9", value: "40", highlight: true },
      { label: "Färgtemperatur", shortLabel: "Kelvin", value: "2 200–6 500 K", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Thread + Matter", highlight: true },
      { label: "Viloförbrukning", shortLabel: "Vila", value: "0,2 W", highlight: true },
      { label: "Märklivslängd", shortLabel: "Livslängd", value: "25 000 h", highlight: true },
      { label: "Sockel", value: "E27" },
      { label: "Effekt", value: "7,8 W" },
      { label: "Matter", value: "Inbyggt" },
    ],
    verdict:
      "IKEA KAJPLATS kostar 99 kronor och ger 1 055 lumen, delad högsta ljusflöde med Philips Hue som kostar sex gånger så mycket.\n\nIKEA anger färgåtergivning 90, tio steg över Hue och näst högst av de fem. **Det är skillnaden mellan att maten på bordet ser aptitlig ut och att den ser grå ut**, och den syns tydligast i kök och badrum. Lampan talar Matter över Thread direkt utan brygga, så den går in i Apple Home, Google Home, Alexa och SmartThings samtidigt. I viloläge drar den 0,2 watt, mindre än hälften av vad Hue och WiZ drar dygnet runt.\n\nSvagheten står i kundbetyget. Hos IKEA ligger den på 3,1 av 5 efter 148 omdömen, klart lägst av de fem lamporna. Färgtemperaturen växlar dessutom i fyra fasta steg med fjärrkontrollen, 2 200, 2 700, 4 000 och 6 500 K, i stället för glidande som hos Hue, så det mellanläge du vill ha en viss kväll finns kanske inte.\n\nSka du sätta färgat ljus i ett par rum och vill ha bästa möjliga ljus för pengarna köper du den här och lägger mellanskillnaden på en border router. Har du redan trettio lampor på Zigbee är Hue fortfarande rätt lampa.",
  },
  {
    id: "wiz-color-a60-e27",
    userRating: { value: 4.5, count: 31, checkedAt: PRICE_CHECKED },
    brand: "WiZ",
    name: "Color A60 E27 806 lm",
    image: productImage(SMART_BELYSNING.slug, "wiz-color-a60-e27"),
    tagline: "Tänds och släcks från den vanliga väggbrytaren.",
    scores: {
      /* 2,5 sedan 2026-08-06: CRI 80 och R9 0 enligt EPREL 1421108, alltså
         samma tal som Hue men utan Hues omfång ner till 2 000 K. */
      fargatergivning: 2.5,
      dimring: 2.5,
      /* 4,0 och inte 3,5 sedan 2026-08-06: WiZ har Matter, vilket sidan
         tidigare skrev nej på. Se filhuvudet och lib/corrections.ts. */
      anslutning: 4,
      /* Råd & Rön: "vi ger den utmärkelsen Bra köp". Inte högre än 3,5, för
         samma test skriver att betyget "dras ner av att den är krånglig att
         installera och att det saknas såväl länk till som namn på den
         tillhörande appen". En utmärkelse med uttalat förbehåll. */
      testomdome: 3.5,
      /* 3,5 sedan ljusstyrkan räknas på varmvitt: 806 lm mot KAJPLATS 1 055
         vid samma färgtemperatur. */
      ljusstyrka: 3.5,
      /* 4,0 sedan 2026-08-06. Låg tidigare på 4,5 med motiveringen "enda
         färglampan under tvåhundra". Det stämmer inte längre: IKEA KAJPLATS
         är en färglampa för 99 kronor med högre CRI och fler lumen. */
      prisvarde: 4,
      /* PstLM 1,0 enligt EPREL 1421108. Gränsen är 1,0.
         Exakt på gränsvärdet, se kriteriets beskrivning. */
      flimmer: 2.5,
    },
    price: 129,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/belysning-lampor/smart-belysning/smarta-e27-lampor/wiz-color-a60-smart-led-lampa-e27-806-lm-p52140",
    superlative: "Bäst för en enstaka lampa",
    pros: [
      "Går ner till 2 200 K, varmare kvällsljus än både Nanoleaf och Tapo",
      "Tål att någon slår av väggbrytaren och tänder igen",
      "Matter över wifi, så den går in i Apple Home, Google Home och Alexa",
    ],
    cons: [
      "Flimret syns i nedre delen av dimringen, alltså där kvällsljuset ligger",
      "Färgåtergivning 80 och rött index 0, samma tal som Hue trots en femtedel av priset",
      "0,50 W i viloläge, mest av lamporna tillsammans med Hue",
    ],
    specs: [
      { label: "Ljusflöde", shortLabel: "Lumen", value: "806 lm", highlight: true },
      /* wizconnected.com för GTIN 8720169072176, Kjells specifikationslista och
         EPREL 1421108 anger samma tal. Läst 2026-08-06. R9 0 i samma post. */
      { label: "Färgåtergivning", shortLabel: "CRI", value: "80", highlight: true },
      { label: "Flimmer", shortLabel: "PstLM", value: "1,0", highlight: true },
      { label: "Rött index", shortLabel: "R9", value: "0", highlight: true },
      { label: "Färgtemperatur", shortLabel: "Kelvin", value: "2 200–6 500 K", highlight: true },
      { label: "Protokoll", shortLabel: "Nätverk", value: "Wi-Fi + Bluetooth", highlight: true },
      /* Effekt i nätverksanslutet standbyläge (Pnet), EPREL 1421108. */
      { label: "Viloförbrukning", shortLabel: "Vila", value: "0,50 W", highlight: true },
      { label: "Märklivslängd", shortLabel: "Livslängd", value: "25 000 h", highlight: true },
      { label: "Sockel", value: "E27" },
      /* Effekt i påläge (Pon), EPREL 1421108. Sidan angav tidigare 8,8 W. */
      { label: "Effekt", value: "8,5 W" },
      /* wizconnected.com listar Matter under kompatibilitet med
         tredjepartssystem, "Via tredjepartshubbar (Wi-Fi)", och Kjell skriver
         "Stöd för Matter" högst upp. Sidan angav tidigare Nej. */
      { label: "Matter", value: "Ja, över wifi" },
    ],
    verdict:
      "WiZ Color A60 kostar 129 kronor, ger 806 lumen och går ner till 2 200 K, alltså varmare kvällsljus än både Nanoleaf och Tapo klarar.\n\nDen ansluter över wifi utan brygga och talar Matter, så den går att lägga in i Apple Home, Google Home och Alexa. Den tål dessutom att någon slår av väggbrytaren och tänder igen, vilket är den vanligaste besvikelsen med smarta lampor. **Råd & Rön ger den utmärkelsen Bra köp, med förbehållet att installationen är krånglig.**\n\nFlimret är skälet att den inte hamnar högre. I nedre delen av dimringen syns det, och det är just där ljuset ska ligga på kvällen. Färgåtergivningen är dessutom 80 med rött index 0, samma tal som Signify deklarerar för Philips Hue, medan IKEA KAJPLATS ligger på 90 för 30 kronor mindre och ger 250 lumen mer.\n\nTill 30 kronor mer än KAJPLATS får du färre lumen och blekare färger, men slipper skaffa en border router. Det är hela affären, och den går ihop för en enstaka lampa bakom teven, inte för ett vardagsrum du sitter i varje kväll.",
  },
];

export const SMART_BELYSNING_PRODUCTS = resolveProducts(SMART_BELYSNING, SEEDS, {
  /* Se filhuvudet. Utan det här får en oprövad lampa 15 viktpoäng gratis, och
     sidan rankade då två lampor ingen mätt över Råd & Röns testvinnare. */
  redistributeMissing: false,
});

/**
 * Looked at, left out. Every reason here is a real one that a reader can check
 * against the product page, not a hedge.
 */
export const SMART_BELYSNING_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "LIFX",
    name: "Colour 1200 lm E27",
    approxPrice: 738,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/LIFX-Colour-1200-Lumens-E27/2940657",
    reason:
      "Starkast färger av allt vi tittat på och ljusast av alla, men priset ligger över Hue utan att ge vare sig brygga eller mesh-nät. Wi-Fi i den prisklassen är svårt att motivera.",
  },
  {
    brand: "Philips Hue",
    name: "White Ambiance 9,5 W E27",
    approxPrice: 349,
    merchant: "NetOnNet",
    merchantUrl:
      "https://www.netonnet.se/art/smarta-hem/system-varumarke/philipshue/philips-hue-white-ambiance-95w-e27/231554.14004/",
    reason:
      "Samma system som testvinnaren men utan färg. Är du helt säker på att du aldrig vill ha färgat ljus är den ett rimligt köp, annars är prisskillnaden för liten för att spara på.",
  },
  {
    brand: "Yeelight",
    name: "Smart LED E27 1S",
    approxPrice: 213,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Yeelight-Smart-LED-E27-1S-Dimmbar/2829321",
    reason:
      "Bra app och stabil anslutning, men sortimentet i svenska butiker är ojämnt och priset hoppar kraftigt. Svårt att rekommendera något du kanske inte hittar om ett halvår.",
  },
  {
    brand: "Nedis",
    name: "SmartLife LED E27",
    approxPrice: 153,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Nedis-SmartLife-LED-Lampor/3067255",
    reason:
      "Billig och fungerande, men dimringen är den svagaste av allt vi tittat på och Tuya-molnet står mellan lampan och telefonen. WiZ gör samma sak bättre för ungefär samma pengar.",
  },
  {
    brand: "Govee",
    name: "Smart Wi-Fi och Bluetooth E27",
    approxPrice: 149,
    merchant: "Webhallen",
    merchantUrl:
      "https://www.webhallen.com/se/product/358018-Govee-Smart-Wifi-Bluetooth-Light-Bulb-E27",
    reason:
      "Prisvärd och ljusstark, men appen kräver ett Govee-konto och lampan går inte att styra lokalt utan det. IKEA KAJPLATS kostar mindre och lyder under Matter i stället för under en molntjänst.",
  },
  {
    brand: "IKEA",
    name: "TRÅDFRI E27 806 lm, vitt spektrum",
    approxPrice: 99,
    merchant: "IKEA",
    merchantUrl:
      "https://www.ikea.com/se/sv/p/tradfri-led-ljuskaella-e27-806-lumen-smart-tradloes-dimbar-vitt-spektrum-klar-globformad-30486788/",
    reason:
      "Föregångaren till KAJPLATS, och fortfarande i sortimentet för 99 kronor. Samma pris, men 806 lumen mot 1 055, inget färgat ljus och Zigbee i stället för Matter över Thread, alltså en hubb i vägen. Har du redan en DIRIGERA och bara vill ha vitt ljus fungerar den, men den nyare lampan kostar lika mycket.",
  },
];

/**
 * Mirrors the buying guide: every question the guide answers has an entry
 * here, phrased the way people search rather than the way we write headings.
 *
 * The duplication is deliberate. The guide is for someone reading top to
 * bottom; this is for someone who arrived with one question, and for the
 * FAQPage markup that can surface a single answer directly in search. Answers
 * are self-contained so neither context depends on the other.
 */
export const SMART_BELYSNING_FAQ = [
  {
    question: "Behöver jag en brygga för att styra smarta lampor?",
    answer:
      "Inte alltid. Wi-Fi-lampor som Tapo och WiZ ansluter direkt till routern. Nanoleaf Essentials och IKEA KAJPLATS kör Matter över Thread och behöver ingen brygga, men däremot en Thread border router, vilket ofta är något du redan har: en HomePod, en Apple TV, en nyare Nest Hub eller en DIRIGERA. Philips Hue kör Zigbee och behöver Hue Bridge för scheman och fjärrstyrning, även om lampan går att styra via Bluetooth på kort håll.",
  },
  {
    question: "Hur många smarta lampor klarar ett vanligt hemnätverk?",
    answer:
      "Räkna med runt tio Wi-Fi-lampor innan en normal router börjar tappa i prestanda. Ska du ha fler är Zigbee eller Thread ett bättre val, eftersom lamporna då bildar ett eget nät i stället för att var och en ta en plats på wifi-nätet.",
  },
  {
    question: "Fungerar smarta lampor med vanliga strömbrytare?",
    answer:
      "Ja, men bara när strömbrytaren står på. Slår du av strömmen försvinner lampan ur appen tills den slås på igen. Många ersätter därför den vanliga brytaren med en trådlös scenbrytare ovanpå.",
  },
  {
    question: "Vad är skillnaden mellan IKEA KAJPLATS och TRÅDFRI?",
    answer:
      "KAJPLATS är den nya serien och TRÅDFRI den utgående. Båda kostar 99 kronor för en E27, men KAJPLATS ger 1 055 lumen mot 806, finns med färgat ljus och talar Matter över Thread direkt, medan TRÅDFRI kör Zigbee och kräver en DIRIGERA eller annan hubb. Har du redan ett TRÅDFRI-system fungerar lamporna ihop via DIRIGERA. Bygger du nytt finns det ingen anledning att välja den äldre serien.",
  },
  {
    question: "Lönar det sig att köpa smarta lampor?",
    answer:
      "Det beror helt på var du sätter dem. Det lönar sig när du styr ljus du annars inte styr, som utomhusbelysning som ska följa årstiden eller en hall som tänds när någon kommer hem, och när ljuset ska ändra karaktär under dygnet med varmt på kvällen och kallare på morgonen. Det lönar sig sällan i ett rum med en enda lampa och en strömbrytare inom räckhåll, eftersom det går fortare att sträcka sig efter brytaren än att lyfta telefonen. I utrymmen du knappt använder lönar det sig inte alls: en smart lampa i en garderob drar ström dygnet runt för att kunna tändas i tio minuter. Rådet är att köpa två lampor till det rum där du faktiskt vill att ljuset ska förändras, leva med dem i en månad och köpa resten sedan.",
  },
  {
    question: "Hur många lumen behöver jag i vardagsrummet?",
    answer:
      "Räkna med 100 till 150 lumen per kvadratmeter i allmänbelysning. Ett vardagsrum på 20 kvadratmeter landar alltså på 2 000 till 3 000 lumen totalt, vilket motsvarar ungefär tre lampor på 806 lumen. Ett kök behöver det dubbla per kvadratmeter. Fördela ljuset på flera ljuspunkter i stället för en stark lampa i taket, för samma antal lumen upplevs helt olika beroende på hur många ställen det kommer från.",
  },
  {
    question: "Vad motsvarar en 60-wattslampa i lumen?",
    answer:
      "Ungefär 806 lumen. Watt mäter hur mycket ström lampan drar och säger ingenting om hur mycket den lyser, vilket bara fungerade som jämförelse så länge alla lampor var glödlampor. En LED på runt 9 W ger lika mycket ljus som den gamla 60-wattaren. Andra vanliga motsvarigheter: 40 W blir 470 lumen, 75 W blir 1 055 lumen och 100 W blir 1 521 lumen.",
  },
  {
    question: "Drar smarta lampor ström när de är släckta?",
    answer:
      "Ja. Radion måste vara vaken för att kunna ta emot kommandot att tända, och det kostar mellan 0,2 och 0,5 watt per lampa dygnet runt. Skillnaden är alltså mer än dubbel: IKEA KAJPLATS drar 0,2 W, Nanoleaf 0,3 W, Tapo 0,37 W och Hue och WiZ 0,5 W. I kronor är det sällan mycket. Det intressanta är andelen: en lampa som lyser tio minuter om dagen kan förbruka mer i viloläge än i drift, medan samma lampa i ett vardagsrum inte gör det. Låt det avgöra var lamporna sitter, inte om du köper dem: undvik utrymmen du knappt använder.",
  },
  {
    question: "Vad är CRI och vilket värde ska jag välja?",
    answer:
      "CRI är färgåtergivning på en skala till 100 och beskriver hur naturligt lampan återger färger jämfört med dagsljus. Åttio är golvet för en anständig lampa. Nittio och uppåt är där det märks i praktiken: mat ser aptitlig ut, träslag får rätt ton och hudfärg ser levande ut i stället för grå. Skillnaden syns tydligast i kök och badrum, där du tittar på mat och på dig själv, och spelar mindre roll i en hall. Talet följer inte priset: IKEA KAJPLATS för 99 kronor och Nanoleaf Essentials för 232 anger båda 90, medan Philips Hue för 599 anger 80.",
  },
  {
    question: "Varför flimrar min LED-lampa när jag dimrar ner?",
    answer:
      "LED dimras nästan alltid genom att lampan slås av och på snabbare än ögat hinner uppfatta. Ju lägre du dimrar desto längre blir pauserna, och vid någon punkt börjar det synas. På en billig lampa ligger den punkten runt tjugo procent, vilket är precis där man vill ha ljuset på kvällen. De flesta ser inte flimret direkt utan känner det som att de blir trötta i ögonen. Ett enkelt test: filma lampan med mobilkameran och dimra ner, för blir det ränder i bilden flimrar den.",
  },
  {
    question: "Vilken färgtemperatur ska jag välja?",
    answer:
      "Ska du bara ha en inställning är 2 700 K det tryggaste valet i ett hem, eftersom det motsvarar en gammal glödlampa. Lägre tal ger varmare ljus: 2 200 K är levandeljusvarmt, medan 6 500 K är kallt dagsljus som väcker på morgonen men blir obehagligt på kvällen. De flesta vill ha varmt på kvällen och kallare på morgonen, vilket är skälet att köpa en lampa som klarar båda.",
  },
  {
    question: "Vad är skillnaden mellan smart lampa, smart strömbrytare och smart uttag?",
    answer:
      "Välj smart lampa när du bryr dig om ljuset självt, eftersom färg, färgtemperatur och dimring bara finns där. Välj smart strömbrytare när du har många lampor i samma tak och bara vill kunna tända och släcka dem, för då styr en brytare hela armaturen oavsett hur många sockar den rymmer. Välj smart uttag när det du vill styra står på golvet, som en golvlampa eller julbelysning. De flesta hem slutar med en blandning av alla tre.",
  },
  {
    question: "Vilken sockel har min lampa?",
    answer:
      "Sockeln står nästan alltid tryckt på sidan av den gamla lampan. E27 är den stora skruvsockeln och den vanligaste i svenska taklampor. E14 är den lilla skruven, vanlig i kronor och vägglampor. GU10 är en tvåpinnars vridsockel för spotlights i tak, och G9 är en liten tvåpinnars som ersätter halogen. Alla lampor i den här jämförelsen är E27. Fel sockel är det vanligaste felköpet och det enda som gör lampan helt oanvändbar.",
  },
  {
    question: "Får jag installera smarta strömbrytare själv?",
    answer:
      "Nej. I Sverige får du byta ljuskälla, sätta stickpropp på en sladd och byta en trasig lamphållare i en lampa med sladd. Att dra ny fast installation, byta väggströmbrytare eller koppla in en dimmer i väggen ska utföras av ett registrerat elinstallationsföretag. Det är därför smarta lampor och smarta uttag är så populära: de kräver ingen installation alls. Reglerna finns hos Elsäkerhetsverket och gäller oavsett hur enkelt en engelskspråkig guide får det att låta.",
  },
];
