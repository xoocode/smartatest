import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { USB_C_KABEL } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /usb-c-kabel.
 *
 * Priser, produktnamn, kundbetyg och butikslänkar är lästa på butikernas egna
 * produktsidor 2026-08-05, och URL:erna nedan är de kanoniska efter
 * omdirigering.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans än. Se lib/links.ts.
 *
 * ## Avgränsningen, och varför den styr hela filen
 *
 * Sidan rankar **bara USB-C till USB-C**, efter användarbeslut 2026-08-05.
 * USB-A- och Lightning-formerna förklaras i köpguiden och får egna systersidor.
 * Det är också skälet till att Testfaktas provning inte ger något betyg åt
 * någon produkt här: samtliga sex USB-C-kablar de provade är USB-A-formen.
 *
 * ## En rad per modell, 2 meter som referens
 *
 * Kjells kategori `usb-c-kabel/usb-c-till-usb-c` bär 52 poster, vilket är
 * ungefär femton produkter i fyra längder och tre färger. Linocell Flätad 60 W
 * ensam står för nio av dem. Varje modell har därför en rad, prissatt vid 2 m
 * där längden finns, och `Tillgängliga längder` säger vad modellen mer finns i.
 * Prisvärdet räknas per meter, annars vinner den korta kabeln på att vara kort.
 *
 * De fyra kablar som köps från Amazon.se och Teknikdelar finns inte i 2 m, och
 * deras verkliga längd står i `Längd`. Kronor per meter gör dem jämförbara ändå.
 *
 * ## Två priser för samma artikel
 *
 * Apples 240 W-kabel kostar **399 kr hos Clas Ohlson och 445 hos Kjell**,
 * kontrollerat samma dag. Vi länkar Clas Ohlson, som varken har affiliateprogram
 * eller är billigast i jämförelsen i övrigt — den är billigast för just den
 * kabeln. Samma sorts spridning som Master Lock 5441 på /nyckelskap.
 *
 * ## Datahastigheten är läst hos säljaren, ord för ord
 *
 * Fältet skrivs som säljaren skriver det och räknas aldrig om. Kjell skriver
 * "480 Mb/s" om Linocell, Clas Ohlson "480 Mbps" om sin egen och
 * "Dataöverföring: USB 2-hastighet" om Apples. Att räkna om Apples formulering
 * till 480 Mbps hade varit en härledning, och kriteriet öppen redovisning mäter
 * just hur tydligt det står.
 *
 * Anker Nano är enda produkten där butiken inte gick att lita på: Amazons
 * specifikationstabell anger **480 gigabyte per sekund**, en enhet som inte
 * finns. Ankers egen europeiska produktsida anger 480 Mbps och
 * "Data Transfer Protocols: USB2.0", och det är den uppgift som används.
 *
 * ## Betygen
 *
 * Kriteriepoängen är redaktionell bedömning ur publicerade specifikationer,
 * inte mätningar. Ingen kabel här är provad av oss eller av någon annan. Det
 * står också i sidans metodavsnitt.
 *
 * ## ⚠️ Böjtalen betygsätts inte
 *
 * Anker anger 25 000 böjningar för Powerline III Flow och 35 000 för Nano, och
 * över sitt eget sortiment allt mellan 5 000 och 300 000, utan publicerad metod.
 * Fälten står i tabellen därför att läsaren letar efter dem och spridningen är
 * fyndet, precis som `Sugkraft` på /robotdammsugare. De ingår i inget kriterium.
 * Se ALDRIG_BEDOMD i lib/spec-schema.mjs.
 *
 * ## Butiksspridningen
 *
 * Kjell 3, Amazon 3, Teknikdelar 2, Clas Ohlson 2, IKEA 1, TheMobileStore 1.
 * Klart bredare än laddarsidans tio av tretton hos Kjell, och det beror på att
 * kabelsortimentet faktiskt skiljer sig mellan butikerna: Teknikdelar för
 * Delock och SiGN som Kjell inte har, och Clas Ohlson för både Apples kabel
 * billigare och en egen med USB-IF-certifiering utskriven.
 *
 * TheMobileStore, alltså Danira Telecom, bär kategorins bästa provision på
 * 10 procent och kom in sist av alla. Den är med på egna meriter och landar
 * ändå sist i rankningen: Blue Stars tvåmeterskabel är näst billigast per meter
 * av alla tretton, och säljs samtidigt med ordet "ja" där datahastigheten
 * borde stå. Att den bäst betalande butiken bär den sämst beskrivna produkten
 * är ett utfall värt att lägga märke till, inte att jämna ut.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "delock-usb-c-240w-40gbps-2m",
    userRating: { value: 5, count: 2, checkedAt: PRICE_CHECKED },
    brand: "Delock",
    name: "USB-C-kabel 240 W PD, 40 Gbps, 2 m",
    shortName: "Delock 240 W 40 Gbps",
    image: productImage(USB_C_KABEL.slug, "delock-usb-c-240w-40gbps-2m"),
    tagline:
      "Allt en USB-C-kabel kan göra, för mindre än den kostar när den bara laddar.",
    scores: {
      datahastighet: 5,
      prisvarde: 4.5,
      effekt: 5,
      redovisning: 5,
      konstruktion: 2.5,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Teknikdelar",
    merchantUrl:
      "https://www.teknikdelar.se/produkt/delock-usb-c-kabel-240w-pd-40-gbps-kabel-2m-gra",
    award: "winner",
    superlative: "Bäst för den som bara vill ha en kabel",
    pros: [
      "40 Gbps och 240 W i samma kabel, till priset av en som bara laddar",
      "Driver en 8K-skärm i 60 Hz via DisplayPort 2.0 Alt Mode",
      "E-markerchip, spänningssteg och bakåtkompatibilitet är fullt redovisade",
    ],
    cons: [
      "Manteln anges inte, så slitstyrkan går inte att bedöma på förhand",
      "Finns bara i 2 meter, och den som behöver 0,5 får byta märke",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "40 Gbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB4", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "8K 60 Hz, DP 1.4a och DP 2.0", highlight: true },
      { label: "Längd", value: "2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ja, utskrivet i specifikationen" },
      { label: "Tillgängliga längder", value: "2 m" },
      { label: "Max ström", value: "5 A vid 48 V" },
      { label: "USB PD-version", value: "USB PD 3.1 med EPR" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Ej angiven", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "4043619811922" },
    ],
    verdict:
      "Köp den här om du bara ska köpa en kabel. Delock gör 40 gigabit i sekunden, 240 watt och 8K-video i 60 hertz, och kostar 199 kronor. Det är hundra kronor mindre än Kjells egen kabel som gör en åttiotredjedel av datahastigheten till samma 240 watt.\n\nDet praktiska är att den slutar vara en fråga. En kabel som klarar allt behöver du inte märka upp, inte lägga på rätt sida av skrivbordet och inte byta ut när du kopplar in en extern SSD eller en skärm. Delock skriver dessutom ut det som de flesta hoppar över: chipset e-marker, bakåtkompatibilitet med USB 3.2, USB 2.0 och Thunderbolt 3, spänning och ström, och EAN-koden.\n\nTvå saker talar emot. Manteln anges inte alls, och eftersom kablar går sönder i höljet vid dragavlastningen är det den uppgift man helst vill ha. Den finns bara i två meter, så den som vill ha en kort kabel till väskan får leta hos någon annan.\n\nDe två invändningarna kostar mindre än de låter. En kabel som ligger still bakom en dator böjs sällan, och två meter är den längd de flesta letar efter.",
  },
  {
    id: "unisynk-usb4-240w-2m",
    userRating: { value: 4, count: 7, checkedAt: PRICE_CHECKED },
    brand: "Unisynk",
    name: "USB4-kabel USB-C till USB-C 240 W 2 m",
    shortName: "Unisynk USB4 240 W",
    image: productImage(USB_C_KABEL.slug, "unisynk-usb4-240w-2m"),
    tagline: "Samma prestanda som vinnaren, flätad mantel, hundratrettio kronor dyrare.",
    scores: {
      datahastighet: 5,
      prisvarde: 2.5,
      effekt: 5,
      redovisning: 4,
      konstruktion: 4,
    },
    price: 329,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/kablar-adaptrar/usb-c-kabel/usb-c-till-usb-c/unisynk-usb4-kabel-usbc-till-usbc-240w-2m-p14001",
    superlative: "Bäst för den som vill handla i butik",
    pros: [
      "40 Gbps, 240 W och 8K-video, alltså allt kategorin kan",
      "Flätad konstruktion som står emot böjning bättre än slät plast",
      "Finns i butik över hela landet om kabeln behövs i dag",
    ],
    cons: [
      "130 kronor dyrare än en kabel med samma tal på papperet",
      "Om kabeln bär ett e-markerchip är okänt, trots att 240 W förutsätter det",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "40 Gbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB4", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "8K 60 Hz via DisplayPort Alt Mode", highlight: true },
      { label: "Längd", value: "2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "1 m och 2 m" },
      { label: "Max ström", value: "Ej angiven" },
      { label: "USB PD-version", value: "USB PD 3.1" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Flätad", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Unisynk gör exakt vad vinnaren gör: 40 gigabit, 240 watt, 8K i 60 hertz. Skillnaden är 130 kronor och en flätad mantel.\n\nDen flätade konstruktionen är värd något. När PZT böjde tolv laddkablar åt Testfakta sprack höljet vid dragavlastningen på dem som gick sönder, och flätad nylon står emot den påfrestningen bättre än slät plast. Kabeln stöder också daisy-chain, alltså att koppla en skärm vidare till nästa.\n\nDet som drar ner är priset per meter och en tystnad. Kjell skriver ut hastigheten, effekten och videon men inte ett ord om e-marker, och en kabel som ska bära 240 watt måste ha ett för att laddaren ska släppa fram mer än 60. Att den anger 240 W och USB PD 3.1 gör det praktiskt taget säkert, men det står inte.\n\nKöp den om du vill ha kabeln i handen i dag, eller om den flätade manteln är värd hundralappen. Ska den ligga bakom en dator och aldrig röras är vinnaren samma kabel för mindre pengar.",
  },
  {
    id: "ugreen-l705-usb4-240w",
    userRating: { value: 4.7, count: 1811, checkedAt: PRICE_CHECKED },
    brand: "Ugreen",
    name: "L705 USB4 240 W 40 Gbps, 1,3 m",
    shortName: "Ugreen L705 USB4",
    image: productImage(USB_C_KABEL.slug, "ugreen-l705-usb4-240w"),
    tagline: "Full prestanda i en kortare kabel, och kategorins mest omdömda.",
    scores: {
      datahastighet: 5,
      prisvarde: 2,
      effekt: 4.5,
      redovisning: 4,
      konstruktion: 3.5,
    },
    price: 260,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Amazon.se",
    merchantUrl: "https://www.amazon.se/dp/B0DZP21RXY",
    superlative: "Bäst till skrivbordet",
    pros: [
      "40 Gbps och 240 W, alltså toppklass på båda axlarna",
      "1 811 kundbetyg med 4,7 i snitt, mest underlag i jämförelsen",
      "1,3 meter räcker mellan dator och dockningsstation utan slack",
    ],
    cons: [
      "200 kronor per meter, näst dyrast av alla utom premiumkabeln",
      "Kort för soffan, och finns inte i tre meter",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "40 Gbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB4", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "4K-video angiven", highlight: true },
      { label: "Längd", value: "1,3 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ja, enligt tillverkaren" },
      { label: "Tillgängliga längder", value: "1,3 m" },
      { label: "Max ström", value: "Ej angiven" },
      { label: "USB PD-version", value: "USB PD 3.1" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Flätad", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Ugreen L705 är kabeln att lägga på skrivbordet. 40 gigabit i sekunden flyttar tio gigabyte på några sekunder, 240 watt räcker till vilken laptop som helst, och 1,3 meter är precis rätt mellan en dator och en dockningsstation utan att en halvmeter kabel ligger och skräpar.\n\nDen har också mest underlag av alla här: 1 811 kundbetyg med 4,7 i snitt. Det säger ingenting om laboratorieprestanda, men det säger att kabeln fungerar för många människor under lång tid.\n\nPriset är det som håller den borta från toppen. 260 kronor för 1,3 meter blir 200 kronor per meter, alltså dubbelt så mycket som vinnaren kostar per meter för samma tal på papperet. Vill du ha samma prestanda längre bort är det fel kabel.\n\nDen som redan handlar på Amazon och vill ha en kabel som aldrig blir flaskhalsen får det här. Den som vill ha samma sak billigare får leta i Teknikdelars sortiment.",
  },
  {
    id: "linocell-premium-kevlar-32-2m",
    userRating: { value: 4.5, count: 130, checkedAt: PRICE_CHECKED },
    brand: "Linocell",
    name: "Premium Kevlar USB-C 3.2-kabel 2 m",
    shortName: "Linocell Kevlar 3.2",
    image: productImage(USB_C_KABEL.slug, "linocell-premium-kevlar-32-2m"),
    tagline: "Tio gigabit och en kevlarmantel, för mindre än Kjells egen laddkabel.",
    scores: {
      datahastighet: 3.5,
      prisvarde: 4.5,
      effekt: 3,
      redovisning: 4,
      konstruktion: 5,
    },
    price: 199.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/kablar-adaptrar/usb-c-kabel/usb-c-till-usb-c/linocell-premium-kevlar-usb-c-3.2-kabel-svart-2-m-p22995",
    award: "editor",
    superlative: "Bäst att inte tänka på igen",
    pros: [
      "Kevlarmantel, det starkaste materialvalet i jämförelsen",
      "10 Gbps räcker till extern SSD och 4K-skärm i 60 Hz",
      "Finns i 1, 2 och 3 meter, så längden kan bytas utan att märket byts",
    ],
    cons: [
      "100 W, alltså inte de 240 en 16-tumsdator vill ha",
      "Fyra gånger långsammare än USB4-kablarna i samma prisklass",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "10 Gbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB 3.2", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "4K 60 Hz", highlight: true },
      { label: "Längd", value: "2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "100 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "1 m, 2 m och 3 m" },
      { label: "Max ström", value: "Ej angiven" },
      { label: "USB PD-version", value: "USB PD" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Kevlar", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Det här är kabeln att köpa om du vill slippa frågan i fem år. Kevlar är samma fiber som sitter i skyddsvästar, och det är det starkaste manteln någon i jämförelsen anger. Testfaktas provning visar varför det spelar roll: kablarna som gick sönder gick sönder i höljet, inte i ledarna.\n\nPrestandan räcker längre än talet antyder. Tio gigabit i sekunden är tjugo gånger en vanlig laddkabel och fullt tillräckligt för en extern SSD, och 4K i 60 hertz driver de flesta skärmar på ett skrivbord. Att den finns i en, två och tre meter betyder att du kan byta längd utan att börja om med ett okänt märke.\n\nGränsen går vid effekten. 100 watt laddar en MacBook Air och en 14-tumsdator, men inte en 16-tums MacBook Pro i full fart, och den som köpt en 240-wattsladdare får inte ut den effekten här.\n\nTill 199,90 kronor för två meter kostar den mindre än Kjells egen 240-wattskabel som gör en tjugondel av datahastigheten. Av allt Kjell säljer i kategorin är det här den mest genomtänkta produkten.",
  },
  {
    id: "clas-ohlson-usb-c-240w-3m",
    userRating: { value: 4, count: 79, checkedAt: PRICE_CHECKED },
    brand: "Clas Ohlson",
    name: "USB-C till USB-C-kabel 5 A 240 W, 3 m",
    shortName: "Clas Ohlson 240 W 3 m",
    image: productImage(USB_C_KABEL.slug, "clas-ohlson-usb-c-240w-3m"),
    tagline: "Tre meter, 240 watt och den utförligaste specifikationen i kategorin.",
    scores: {
      datahastighet: 1,
      prisvarde: 4.5,
      effekt: 5,
      redovisning: 5,
      konstruktion: 4.5,
    },
    price: 249,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/USB-C-till-USB-C-kabel-5A-240-W,-svart/p/39-2720",
    award: "budget",
    superlative: "Bäst för soffan och sängen",
    pros: [
      "Tre meter når fram där en meterkabel tar slut",
      "USB-IF-certifierad, med både PD 3.1 på 240 W och PD 3.0 på 100 W",
      "83 kronor per meter, näst billigast i jämförelsen",
    ],
    cons: [
      "480 Mbps, alltså laddning och lite annat",
      "Ingen video, så den driver ingen skärm",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "480 Mbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB 2.0", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "Nej", highlight: true },
      { label: "Längd", value: "3 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "Flera, enligt butiken" },
      { label: "Max ström", value: "5 A" },
      { label: "USB PD-version", value: "PD 3.1 240 W vid 48 V och PD 3.0 100 W vid 20 V" },
      { label: "USB-IF-certifiering", value: "Ja, enligt butiken" },
      { label: "Mantel", value: "Tygklädd", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Om kabeln ska gå från ett uttag bakom en soffa till en telefon i knät är det här den att köpa. Tre meter för 249 kronor är 83 kronor per meter, och bara IKEA är billigare räknat så.\n\nDen är också jämförelsens tydligaste produkt. Clas Ohlson skriver ut att kabeln är USB 2.0 och gör 480 megabit i sekunden, att den tål 5 ampere, att den stöder både PD 3.1 med 240 watt vid 48 volt och PD 3.0 med 100 watt vid 20, och att den är certifierad av USB-IF. Det är mer information än Apple ger om en kabel som kostar mer än halva priset till.\n\nDet du inte får är data och bild. 480 megabit i sekunden är laddkabelklass, och kabeln driver ingen skärm. En stor filflytt över den här tar ungefär åttio gånger så lång tid som över vinnaren.\n\nDet är rätt köp ändå, för det som händer i en soffa är att en telefon laddar. Ska samma kabel också koppla en dator till en bildskärm är det fel produkt, och då är Linocells kevlarkabel hundra kronor billigare och tjugo gånger snabbare.",
  },
  {
    id: "sign-usb-c-240w-12m",
    userRating: { value: 5, count: 10, checkedAt: PRICE_CHECKED },
    brand: "SiGN",
    name: "USB-C snabbladdningskabel 240 W, 1,2 m",
    shortName: "SiGN 240 W",
    image: productImage(USB_C_KABEL.slug, "sign-usb-c-240w-12m"),
    tagline: "240 watt för hundra kronor, och kabeln laddar precis lika fort som de dyra.",
    scores: {
      datahastighet: 1,
      prisvarde: 4.5,
      effekt: 5,
      redovisning: 4.5,
      konstruktion: 3,
    },
    price: 116,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Teknikdelar",
    merchantUrl:
      "https://www.teknikdelar.se/produkt/sign-usb-c-till-usb-c-kabel-240w-12m-svart",
    superlative: "Bäst att köpa flera av",
    pros: [
      "240 W och PD 3.1 för 116 kronor",
      "PD 3.1 med 5 A vid 48 V, alltså hela 240-wattsladdningen",
      "1,2 meter passar både en väska och ett skrivbord",
    ],
    cons: [
      "480 Mbps, alltså ingen filflytt och ingen skärm",
      "Manteln anges inte, och märket är okänt för de flesta",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "480 Mbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB 2.0", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "Nej", highlight: true },
      { label: "Längd", value: "1,2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "1,2 m" },
      { label: "Max ström", value: "5 A vid 48 V" },
      { label: "USB PD-version", value: "USB PD 3.1" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Ej angiven", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "7350149972090" },
    ],
    verdict:
      "Ska du ha tre kablar till tre rum är det här köpet. 116 kronor ger 240 watt och USB PD 3.1, vilket betyder att den laddar en 16-tums MacBook Pro precis lika snabbt som Apples egen kabel för 399.\n\nDen laddar alltså i toppklass och gör inget annat. 480 megabit i sekunden räcker till att flytta ett fotobibliotek över en kväll snarare än över en kaffepaus, och till att inte driva någon skärm alls. För en kabel vid en säng, i en bilhållare eller i en väska spelar det ingen roll.\n\nTeknikdelar anger effekt, spänning, ström, hastighet, längd och EAN, vilket är mer än de flesta. Manteln nämns inte, och SiGN är ett märke få känner till, men tio kundbetyg ligger på fem av fem.\n\nDet finns ingen anledning att betala mer för en ren laddkabel än så här, och det är själva poängen med kategorin: det som kostar pengar är data och bild, inte watt.",
  },
  {
    id: "anker-nano-240w-18m",
    userRating: { value: 4.8, count: 28337, checkedAt: PRICE_CHECKED },
    brand: "Anker",
    name: "Nano USB-C till USB-C-kabel 240 W, 1,8 m",
    shortName: "Anker Nano 240 W",
    image: productImage(USB_C_KABEL.slug, "anker-nano-240w-18m"),
    tagline: "Mjuk, flätad och köpt av tiotusentals. Datahastigheten står i vägen.",
    scores: {
      datahastighet: 1,
      prisvarde: 4.5,
      effekt: 4.5,
      redovisning: 2,
      konstruktion: 4,
    },
    price: 179,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Amazon.se",
    merchantUrl: "https://www.amazon.se/dp/B0CZ43567W",
    superlative: "Bäst kabel att stoppa i fickan",
    pros: [
      "28 337 kundbetyg med 4,8 i snitt, mest av alla här med marginal",
      "Mjuk flätad mantel av återvunnen plast som inte trasslar",
      "240 W till 99 kronor per meter",
    ],
    cons: [
      "480 Mbps, samma som en laddkabel för en tredjedel av priset",
      "Amazons specifikation anger hastigheten i en enhet som inte finns",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "480 Mbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB 2.0", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "Ej angiven", highlight: true },
      { label: "Längd", value: "1,8 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "0,9 m och 1,8 m" },
      { label: "Max ström", value: "Ej angiven" },
      { label: "USB PD-version", value: "Ej angiven" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Flätad, återvunnen plast", highlight: true },
      { label: "Angivet böjtal", value: "35 000 böjningar enligt Anker" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Ankers Nano är den mest omtyckta kabeln i jämförelsen med stor marginal: 28 337 kundbetyg och 4,8 i snitt. Den är mjuk, flätad i återvunnen plast, trasslar inte i en ficka och drar 240 watt.\n\nSom laddkabel i en väska är den svår att slå. 179 kronor för 1,8 meter är 99 kronor per meter, alltså samma nivå som vinnaren, och Anker anger 35 000 böjningar och ungefär hundra kilos belastning.\n\nDet som sänker den är att den kostar som en snabb kabel utan att vara en. Ankers egen europeiska produktsida anger 480 megabit i sekunden och USB 2.0, vilket är laddkabelklass. Ett av jämförelsens tydligaste exempel på att priset inte säger vad kabeln gör.\n\nTill det kommer att uppgifterna är svåra att kontrollera där du köper den. Amazons specifikationstabell anger datahastigheten i gigabyte per sekund, vilket inte finns som mått för en kabel, och längden på systermodellen i fot. Köp den för hur den känns i handen och för att den håller, inte för vad den flyttar.",
  },
  {
    id: "linocell-flatad-240w-2m",
    userRating: { value: 4.5, count: 27, checkedAt: PRICE_CHECKED },
    brand: "Linocell",
    name: "Flätad USB-C- till USB-C-kabel 240 W, 2 m",
    shortName: "Linocell Flätad 240 W",
    image: productImage(USB_C_KABEL.slug, "linocell-flatad-240w-2m"),
    tagline: "Silikonkärna, flätat ytterhölje och 480 megabit för trehundra kronor.",
    scores: {
      datahastighet: 1,
      prisvarde: 3,
      effekt: 4.5,
      redovisning: 4,
      konstruktion: 4.5,
    },
    price: 299.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/kablar-adaptrar/usb-c-kabel/usb-c-till-usb-c/linocell-flatad-usb-c-till-usb-c-kabel-240-w-svart-2m-p24700",
    superlative: "Bäst mantel i Kjells sortiment",
    pros: [
      "Flexibel silikonkärna med flätat yttre, mjuk och slitstark på en gång",
      "Silikonkärnan gör den mjuk att rulla ihop trots det flätade yttret",
      "Finns i 1 och 2 meter i både svart och vitt",
    ],
    cons: [
      "150 kronor per meter för 480 Mb/s, dyrast per megabit i jämförelsen",
      "Trettio kronor från en kabel i samma butik som är 83 gånger snabbare",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "480 Mb/s", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB 2.0", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "Nej", highlight: true },
      { label: "Längd", value: "2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "1 m och 2 m" },
      { label: "Max ström", value: "Ej angiven" },
      { label: "USB PD-version", value: "Ej angiven" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Flätad med silikonkärna", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Konstruktionen är den bästa Kjell säljer i kategorin. En flexibel silikonkärna med flätat ytterhölje ger en kabel som är mjuk att rulla ihop och samtidigt tål att böjas, och det är precis den kombinationen som avgör om en kabel lever i tre år eller ett.\n\nDen laddar också allt: 240 watt räcker till den kraftigaste laptop som säljs.\n\nProblemet är priset i förhållande till vad den flyttar. 299,90 kronor för två meter är 150 kronor per meter för 480 megabit i sekunden. Trettio kronor högre upp i samma butik ligger Unisynks USB4-kabel som gör 40 gigabit, alltså 83 gånger mer, och hundra kronor lägre ligger Kjells egen kevlarkabel som gör tjugo gånger mer och håller minst lika bra.\n\nKöp den om du står i butiken, vet att kabeln bara ska ladda, och vill ha den som känns bäst i handen. Vet du det inte, ta kevlarkabeln i stället.",
  },
  {
    id: "anker-powerline-iii-flow-240w",
    userRating: { value: 4.8, count: 729, checkedAt: PRICE_CHECKED },
    brand: "Anker",
    name: "Powerline III Flow USB-C till USB-C 240 W, 0,9 m",
    shortName: "Anker Powerline III Flow",
    image: productImage(USB_C_KABEL.slug, "anker-powerline-iii-flow-240w"),
    tagline: "Silikonkabeln som aldrig trasslar, och som säger rakt ut vad den inte gör.",
    scores: {
      datahastighet: 1,
      prisvarde: 3,
      effekt: 4.5,
      redovisning: 4,
      konstruktion: 4,
    },
    price: 129,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Amazon.se",
    merchantUrl: "https://www.amazon.se/dp/B0DG2WQMRD",
    superlative: "Bäst till nattduksbordet",
    pros: [
      "Silikonmantel som varken trasslar eller minns hur den legat",
      "Anger uttryckligen att den inte hanterar bildöverföring",
      "240 W för 129 kronor",
    ],
    cons: [
      "0,9 meter räcker till ett nattduksbord och inte mycket mer",
      "143 kronor per meter för en ren laddkabel",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "480 Mbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB 2.0", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "Nej, enligt tillverkaren", highlight: true },
      { label: "Längd", value: "0,9 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "0,9 m och 1,8 m" },
      { label: "Max ström", value: "Ej angiven" },
      { label: "USB PD-version", value: "Ej angiven" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Silikon", highlight: true },
      { label: "Angivet böjtal", value: "25 000 böjningar enligt Anker" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Powerline III Flow är gjord av mjuk silikon och beter sig därefter: den trasslar inte, den minns inte hur den låg i en väska, och den rullar ihop sig utan att göra motstånd. Det låter som en detalj tills man haft en kabel som gör tvärtom.\n\nAnker gör dessutom något ovanligt i den här kategorin: de skriver ut att kabeln inte hanterar bildöverföring. Det är den enda produkten i jämförelsen där tillverkaren aktivt talar om vad kabeln inte klarar, i stället för att låta köparen upptäcka det när skärmen förblir svart.\n\nDe 0,9 metrarna är dess gräns. Det räcker mellan ett vägguttag och ett nattduksbord, och nästan ingenstans annars. Räknat per meter blir den 143 kronor, alltså dyrare än den ser ut.\n\nKöp den till sängen eller till väskan där en kort kabel är en fördel. Ska den nå tvärs över ett rum finns 1,8-metersversionen, och då är det Ankers Nano som gäller.",
  },
  {
    id: "belkin-thunderbolt-4-aktiv-2m",
    userRating: { value: 4.5, count: 2, checkedAt: PRICE_CHECKED },
    brand: "Belkin",
    name: "Thunderbolt 4 Aktiv USB-C-kabel 2 m",
    shortName: "Belkin Thunderbolt 4",
    image: productImage(USB_C_KABEL.slug, "belkin-thunderbolt-4-aktiv-2m"),
    tagline: "Aktiv elektronik som håller full fart över två meter. Betalar du för det?",
    scores: {
      datahastighet: 5,
      prisvarde: 0.5,
      effekt: 3,
      redovisning: 2.5,
      konstruktion: 3,
    },
    price: 1099,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/dator/kablar-adaptrar/thunderbolt/belkin-thunderbolt-4-aktiv-usb-c-kabel-2-m-p22930",
    award: "premium",
    superlative: "Bäst för dockning och två skärmar",
    pros: [
      "Aktiv konstruktion håller Thunderbolt 4 i full fart över hela två meter",
      "8K-videosignal och full bandbredd till en dockningsstation",
      "Thunderbolt-märkningen betyder en certifiering som USB-C inte kräver",
    ],
    cons: [
      "1 099 kronor, alltså 550 per meter och fem gånger vinnaren",
      "100 W, alltså mindre effekt än kablar för en tiondel av priset",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "Thunderbolt 4", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "Thunderbolt 4", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "8K-videosignal", highlight: true },
      { label: "Längd", value: "2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "100 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "2 m" },
      { label: "Max ström", value: "Ej angiven" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Ej angiven", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Det finns ett skäl att betala 1 099 kronor för två meter kabel, och det är att en passiv kabel tappar fart när den blir lång. En aktiv Thunderbolt-kabel har elektronik i kontakterna som håller signalen uppe hela vägen, och det märks när en dockningsstation ska driva två skärmar och en hårddisk samtidigt två meter bort.\n\nThunderbolt-märket betyder också något som USB-C-märkningen inte gör: den kräver en certifiering, medan vem som helst får trycka USB-C på en kabel.\n\nAllt annat talar emot. 550 kronor per meter är fem gånger vinnaren, som gör 40 gigabit den också. Effekten stannar på 100 watt, alltså mindre än en kabel för 116 kronor ger, så den laddar inte en 16-tumsdator i full fart. Kjell anger varken mantel eller e-marker.\n\nKöp den om du har en Thunderbolt-docka två meter från datorn och har märkt att en billigare kabel inte orkar. Är svaret nej på någon av de tre delarna finns ingen anledning.",
  },
  {
    id: "ikea-lillhult-usb-c-60w",
    userRating: { value: 4.6, count: 410, checkedAt: PRICE_CHECKED },
    brand: "IKEA",
    name: "LILLHULT USB-C till USB-C 60 W, 1,5 m",
    shortName: "IKEA LILLHULT",
    image: productImage(USB_C_KABEL.slug, "ikea-lillhult-usb-c-60w"),
    tagline: "Femtionio kronor, en och en halv meter, och laddar en telefon lika fort som alla andra.",
    scores: {
      datahastighet: 1,
      prisvarde: 5,
      effekt: 2,
      redovisning: 4,
      konstruktion: 3,
    },
    price: 59,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "IKEA",
    merchantUrl:
      "https://www.ikea.com/se/sv/p/lillhult-usb-c-till-usb-c-djupgroen-80617697/",
    superlative: "Billigast, och räcker för en telefon",
    pros: [
      "39 kronor per meter, billigast i jämförelsen med bred marginal",
      "1,5 meter är en halvmeter mer än kabeln som följde med telefonen",
      "60 W laddar varje telefon och de flesta plattor i full fart",
    ],
    cons: [
      "60 W räcker inte till en större laptop",
      "480 Mbps och ingen bild, alltså en ren laddkabel",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "480 Mbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB 2.0", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "Nej", highlight: true },
      { label: "Längd", value: "1,5 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "60 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "1,5 m och 3 m" },
      { label: "Max ström", value: "Ej angiven" },
      { label: "USB PD-version", value: "Ej angiven" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Slät", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "806.176.97" },
    ],
    verdict:
      "För 59 kronor får du en och en halv meter kabel som laddar din telefon exakt lika snabbt som en kabel för 445. Ingen telefon som säljs i dag drar mer än 60 watt, och det är vad LILLHULT ger.\n\nLängden är vald med omsorg och IKEA säger varför: en halvmeter mer än den kabel som följde med telefonen, vilket är skillnaden mellan att kunna sitta upp i sängen och att inte kunna det. 410 kundbetyg ligger på 4,6.\n\nGränserna är två och de är tydliga. 60 watt laddar en MacBook Air men inte en större dator, och 480 megabit i sekunden betyder att den flyttar data långsamt och driver ingen skärm.\n\nKöp två. Det här är kabeln man ska ha liggande i varje rum, och den enda i jämförelsen som är billig nog att inte sakna när den försvinner. Behöver du ladda en laptop eller flytta filer är det fel kabel, och då börjar det på 116 kronor.",
  },
  {
    id: "blue-star-usb-c-60w-2m",
    brand: "Blue Star",
    name: "USB-C till USB-C 3 A 60 W ECO, 2 m",
    shortName: "Blue Star ECO 60 W",
    image: productImage(USB_C_KABEL.slug, "blue-star-usb-c-60w-2m"),
    tagline: "Två meter för 99 kronor. Billigast per meter av allt utom IKEA:s.",
    scores: {
      datahastighet: 1,
      prisvarde: 5,
      effekt: 2,
      redovisning: 1.5,
      konstruktion: 2,
    },
    price: 99,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/blue-star-usb-c-usb-c-3a-60w-kabel-2m-eco-svart",
    superlative: "Billigast per meter av tvåmeterskablarna",
    pros: [
      "49,50 kronor per meter, näst lägst i jämförelsen",
      "Två meter räcker från ett uttag till en soffa eller en säng",
      "60 W laddar varje telefon och platta i full fart",
    ],
    cons: [
      "Hur snabbt den flyttar data är okänt, kabeln säljs med ett ja",
      "Varken material, e-marker eller certifiering är känd",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "Ej angiven", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "Ej angiven", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "Ej angiven", highlight: true },
      { label: "Längd", value: "2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "60 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "1 m och 2 m" },
      { label: "Max ström", value: "3 A" },
      { label: "USB PD-version", value: "Ej angiven" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Ej angiven", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "5903396364440" },
    ],
    verdict:
      "Nittionio kronor för två meter är 49,50 kronor per meter, och bara IKEA kommer lägre. Ska du ha en kabel till sängen, en till soffan och en till bilen är det här det billigaste sättet att göra det med tvåmeterskablar.\n\n60 watt och 3 ampere räcker till varje telefon och platta som säljs, och till en MacBook Air. Där tar löftena slut.\n\nDet är också där kabeln tappar mest. Under rubriken dataöverföring står ordet ja, utan ett tal. Ingen uppgift finns om material, om kabeln bär ett e-markerchip eller om den är certifierad av USB-IF. Det gör den omöjlig att planera in i något annat än laddning: du vet inte om den flyttar en fil på en minut eller en timme, och du vet inte vad den tål.\n\nKöp den om priset per meter är det enda som räknas och kabeln aldrig ska göra något utöver att ladda. Vill du veta vad du får kostar IKEA:s hälften så mycket per meter och säger 480 megabit rakt ut.",
  },
  {
    id: "apple-240w-usb-c-2m",
    userRating: { value: 4.5, count: 41, checkedAt: PRICE_CHECKED },
    brand: "Apple",
    name: "240 W USB-C-laddningskabel, 2 m",
    shortName: "Apple 240 W",
    image: productImage(USB_C_KABEL.slug, "apple-240w-usb-c-2m"),
    tagline: "Vävd, hållbar och 240 watt. Den flyttar data i samma takt som en kabel för 59 kronor.",
    scores: {
      datahastighet: 1,
      prisvarde: 2,
      effekt: 4.5,
      redovisning: 3.5,
      konstruktion: 3.5,
    },
    price: 399,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Apple-laddkabel-USB-C-till-USB-C-240-W,-2-m/p/39-3620",
    superlative: "Bäst för den som vill ha Apples egen",
    pros: [
      "Vävd mantel som håller bättre än Apples gamla vita kablar",
      "240 W laddar även en 16-tums MacBook Pro i full fart",
      "46 kronor billigare hos Clas Ohlson än hos Kjell",
    ],
    cons: [
      "USB 2-hastighet, alltså samma dataklass som kabeln för 59 kronor",
      "200 kronor per meter för en ren laddkabel",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "USB 2-hastighet", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB 2.0", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "Nej", highlight: true },
      { label: "Längd", value: "2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "2 m" },
      { label: "Max ström", value: "Ej angiven" },
      { label: "USB PD-version", value: "Ej angiven" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Vävd", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Apples kabel är välbyggd. Den vävda manteln är en verklig förbättring mot de vita kablarna som brukade spricka vid kontakten, och 240 watt laddar det tyngsta Apple säljer i full fart.\n\nDen är också den dyraste rena laddkabeln i jämförelsen. Clas Ohlson skriver i sin specifikation att dataöverföringen sker i \"USB 2-hastighet\", vilket är samma klass som IKEA:s kabel för 59 kronor. Två hundra kronor per meter för det.\n\nEtt konkret råd innan du köper: den kostar 399 kronor hos Clas Ohlson och 445 hos Kjell, alltså 46 kronor för exakt samma artikel.\n\nDet finns ett läge där den är rätt, och det är när du vill ha Apples egen kabel med Apples garanti till en Apple-dator. Vill du ha en kabel som laddar lika fort betalar du 116 kronor, och vill du ha en som också flyttar filer och driver en skärm betalar du 199.",
  },
];

/**
 * Övervägda och bortvalda, var och en med ett skäl som går att kontrollera.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Nedis",
    name: "USB-C 4.0 Gen 3x2-kabel 2 m",
    reason:
      "En kabel som anges som USB4 med 240 W och stöd för 8K i 60 Hz, alltså på papperet samma klass som vinnaren. Den ligger utanför rankningen därför att datahastigheten inte går att fastställa: Kjells produkttext anger \"USB 4.0 Gen 3x2 (20 Gb/s)\", medan Nedis egen produktsida för samma serie anger 40 Gbps som maximal överföringshastighet, och Nedis skriver dessutom i sin egen punktlista \"USB4 40 Gbit/s (Gen 2x2)\", alltså ett tredje generationsnamn. Datahastigheten väger 30 av 100 på den här sidan, och ett betyg satt på tre motstridiga uppgifter vore inget betyg.",
    approxPrice: 399.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/dator/mac-tillbehor/nedis-usb-c-4.0-gen-3x2-kabel-2-m-p18974",
  },
  {
    brand: "Nördic",
    name: "USB-IF Certified 2 m USB-C 2.0 240 W 480 Mbps",
    reason:
      "Den tydligast beskrivna kabeln i hela kategorin. Både USB-IF-certifieringen och datahastigheten står i själva produktnamnet, och produkttexten skriver ut vad kabeln inte gör: att den främst är avsedd för snabbladdning, att dataöverföringen följer USB 2.0 på 480 Mbps, och att den inte stöder USB 3.0, 4K, 8K eller Thunderbolt. Redovisningen är alltså jämförelsens bästa, men kabeln i sig är en ren 240-wattsladdkabel av samma slag som flera billigare i rankningen, och den säljs bara som Elgigantens eget märke i deras egen butik.",
    merchant: "Elgiganten",
    merchantUrl:
      "https://www.elgiganten.se/product/tjanster-tillbehor/kablar-anslutning/usb-kabel/usb-if-certified-2m-usb-c-20-240w-snabbladdning-480mbps/637830",
  },
  {
    brand: "HOCO",
    name: "X107 USB-C till USB-C 60 W, 1 m",
    reason:
      "Den bäst beskrivna av budgetkablarna: 60 W, 20 V och 3 A, 480 Mb/s, PVC-mantel, 25 gram, Power Delivery och Quick Charge 3.0, allt utskrivet, plus EAN. Den ligger utanför rankningen av en enda anledning, och det är längden. 99 kronor för en meter är 99 kronor per meter, alltså dubbelt så mycket som samma butiks tvåmeterskabel och i nivå med kablar som gör 40 gigabit. En meter räcker dessutom sällan längre än till ett nattduksbord.",
    approxPrice: 99,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/hoco-usb-c-till-usb-c-60w-1m-kabel-3a-x107-gra",
  },
  {
    brand: "Unisynk",
    name: "USB-C Data Blocker-kabel 240 W, 2 m",
    reason:
      "En kabel som laddar med 240 W och medvetet inte kopplar datalinjerna alls, avsedd för att ladda i en publik USB-port utan att telefonen kan prata med den. Det är en genomtänkt produkt för resenärer, men den kan per konstruktion inte få poäng på kriteriet som väger tyngst här. Den hör hemma bredvid en jämförelse av laddkablar, inte i den.",
    approxPrice: 299,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/dator/kablar-adaptrar/usb-adaptrar-kontakter/usb-datablockerare/unisynk-usb-c-data-blocker-kabel-240-w-2-m-p14009",
  },
  {
    brand: "Unisynk",
    name: "Magnetisk USB-C-kabel 2 m",
    reason:
      "Kontakten sitter kvar i telefonen och kabeln fäster magnetiskt, vilket är bekvämt i en bil och skonsamt mot uttaget. Magnetkopplingen är samtidigt ett extra led som inte finns i någon annan kabel här, och varken hastighet eller effekt anges på produktsidan. Till 349,90 kronor för två meter kostar den mer än vinnaren utan att det går att se vad man får.",
    approxPrice: 349.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/kablar-adaptrar/usb-c-kabel/usb-c-till-usb-c/unisynk-magnetisk-usb-c-kabel-2-m-p24376",
  },
  {
    brand: "vonMahlen",
    name: "Allroundo Eco 6-i-1-laddkabel",
    reason:
      "En hoprullbar kabel med sex kombinationer av USB-C, USB-A och Lightning i samma sladd, gjord för att ersätta fyra kablar i en väska. Den löser ett annat problem än det här: en kabel som ska vara sex saker samtidigt är kortare, långsammare och dyrare per meter än en som bara är en. Bra reseprodukt, fel produkt att rankas mot kablar.",
    approxPrice: 199.2,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/multiladdare/vonmahlen-allroundo-eco-6-i-1-laddkabel-svart-p21427",
  },
  {
    brand: "Kjell & Company",
    name: "USB-C till USB-C 0,5 m",
    reason:
      "Jämförelsens billigaste kabel per styck, 99,90 kronor i fyra färger, och en påminnelse om att korta kablar är dyra räknat per meter: 200 kronor metern, alltså samma nivå som Apples. Den saknar dessutom både märkesnamn och specifikation utöver längden på produktsidan, vilket gör den omöjlig att placera på fyra av fem kriterier.",
    approxPrice: 99.9,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/kablar-adaptrar/usb-c-kabel/usb-c-till-usb-c/usb-c-till-usb-c-05-m-gra-p20857",
  },
];

export const USB_C_KABEL_PRODUCTS = resolveProducts(USB_C_KABEL, SEEDS);

export const USB_C_KABEL_CONSIDERED = CONSIDERED;

/**
 * Frågorna är de som faktiskt ställs i kategorin, och svaren står på egna ben
 * eftersom FAQ-rutan kan visas ensam i ett sökresultat.
 */
export const USB_C_KABEL_FAQ = [
  {
    question: "Spelar det någon roll vilken USB-C-kabel jag köper?",
    answer:
      "Ja, mer än i någon annan tillbehörskategori, och det syns inte på kabeln. Två kablar med identiska kontakter kan skilja 83 gånger i datahastighet och fyra gånger i effekt. En USB-C-kontakt har 24 stift, och en tillverkare som vill spara kopplar helt enkelt inte de åtta ledarna för de snabba datakanalerna. Ska kabeln bara ladda en telefon räcker den billigaste som finns. Ska den flytta filer från en extern disk eller driva en skärm är det en helt annan produkt du behöver, och den kostar inte nödvändigtvis mer.",
  },
  {
    question: "Vad är en e-marker och behöver jag en?",
    answer:
      "En e-marker är ett litet chip i kabeln som talar om för laddaren vad kabeln tål. Utan det håller laddaren igen på 3 ampere, alltså omkring 60 watt, hur stark den än är. Det är den vanligaste orsaken till att en dyr laddare laddar långsamt. För en telefon spelar det ingen roll, eftersom ingen telefon drar mer än 60 watt. Ska du ladda en laptop över 60 watt behöver kabeln en e-marker, och för 240 watt krävs dessutom att den stöder Extended Power Range och USB PD 3.1, alltså 48 volt och 5 ampere.",
  },
  {
    question: "Har EU bestämt hur en USB-C-kabel ska vara?",
    answer:
      "Nej. Direktiv (EU) 2022/2380 nämner visserligen kabelstandarden EN IEC 62680-1-3:2021 vid namn, men kravet ligger på apparaten: en telefon eller dator ska kunna laddas med en kabel som uppfyller standarden. Ingenting kräver att kabeln som säljs fristående gör det. Kommissionen ska däremot senast den 28 december 2026 lämna en rapport om vad det skulle innebära att sälja telefoner och datorer utan laddare och utan kabel, och rapporten kan följas av ett lagförslag. Det är en skyldighet att utreda, inte ett beslut.",
  },
  {
    question: "Vad betyder USB-IF-certifierad, och hur kontrollerar jag det?",
    answer:
      "USB Implementers Forum är organisationen bakom USB-standarden, och deras certifiering betyder att produkten klarat deras provningsprogram och får bära USB-logotypen. Det är frivilligt: vem som helst får sälja en kabel märkt USB-C utan att ha certifierat något. Kontrollen är svårare än den borde vara. USB-IF har en publik produktsökning, men den visar som standard bara det som certifierats de senaste två åren, den underhålls av medlemsföretagen själva, och den fullständiga listan kräver medlemsinloggning. Att en kabel inte syns där betyder alltså inte att den saknar certifiering.",
  },
  {
    question: "Varför laddar min telefon långsamt trots att jag har en stark laddare?",
    answer:
      "Titta på kabeln först. En kabel utan e-marker begränsar till omkring 60 watt oavsett laddare, och en kabel som legat i en väska i två år kan ha en skada i höljet där den böjs mest. När det tyska laboratoriet PZT böjde tolv laddkablar åt Testfakta var det just där skadorna uppstod: sprucket eller missfärgat hölje vid dragavlastningen, inte brott inuti. Prova samma laddare med en annan kabel innan du byter laddare.",
  },
  {
    question: "Kan jag använda vilken USB-C-kabel som helst till en skärm?",
    answer:
      "Nej. För att driva en bildskärm måste kabeln stödja DisplayPort Alt Mode, och det kräver de snabba ledarpar som saknas i en ren laddkabel. En kabel som anger 480 Mbps kan alltså inte driva en skärm, hur mycket effekt den än klarar. Leta efter DisplayPort Alt Mode, en upplösning som 4K 60 Hz eller 8K 60 Hz, eller en datahastighet från 10 Gbps och uppåt. Anker är ovanligt tydliga och skriver ut för en av sina kablar att den inte hanterar bildöverföring.",
  },
  {
    question: "Är en dyr kabel hållbarare än en billig?",
    answer:
      "Inte enligt den enda oberoende provning som finns. Testfakta lät PZT böja tolv laddkablar 5 000 gånger med en vikt på 150 gram, och den dyraste kabeln i provningen gick sönder redan under de första 1 000 böjningarna medan IKEA:s för 50 kronor tog sig igenom hela cykeln utan skada. Var uppmärksam på att provningen är från februari 2020 och gällde USB-A-formen. Tillverkarnas egna böjtal går inte att jämföra: ingen publicerar en metod, och Anker anger allt mellan 5 000 och 300 000 böjningar för olika produkter i sitt eget sortiment.",
  },
  {
    question: "Hur lång kabel ska jag välja?",
    answer:
      "Längre än den som följde med telefonen, som nästan alltid är en meter. En och en halv till två meter räcker från ett vägguttag till en säng eller en soffa, och tre meter behövs när uttaget sitter bakom en möbel. Räkna per meter när du jämför priser: en halvmeterkabel för 99,90 kronor kostar 200 kronor metern, alltså samma som Apples tvåmeterskabel. Var också medveten om att långa passiva kablar tappar datahastighet, vilket är skälet till att aktiva Thunderbolt-kablar finns och kostar det de gör.",
  },
];
