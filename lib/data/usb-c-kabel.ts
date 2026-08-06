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
 * till 480 Mbps hade varit en härledning.
 *
 * ## ⚠️ Frånvaropasset 2026-08-06 — nio av elva påståenden var falska
 *
 * Sidan påstod på elva ställen att en uppgift inte gick att få tag på. Nio var
 * fel, och sju av dem stod hos tillverkaren själv:
 *
 * | Produkt | Vi skrev | Det stod | Var |
 * |---|---|---|---|
 * | Delock | Mantel ej angiven | TPE | delock.com, artikel 81192 |
 * | Delock | 5 A vid 48 V | 5 A vid 20 V | samma datablad |
 * | Unisynk | E-marker okänd | "Med E-Mark chip" | unisynk.se, punktlistan |
 * | Ugreen L705 | Max ström ej angiven | 5 A vid 48 V | eu.ugreen.com |
 * | SiGN | Manteln anges inte | Zinklegering + nylonfläta | Batteriexperten |
 * | Anker Nano | Videostöd ej angivet | Stöder inte skärm | anker.com/eu-en |
 * | Linocell Kevlar | Max ström ej angiven | 5 A vid 20 V | kjell.com, i löptexten |
 *
 * Två höll: Belkins mantel står inte på Belkins egen produktsida, och Blue
 * Stars datahastighet står varken hos butiken eller hos tillverkaren på
 * hemmamarknaden. Den andra är den enda på sidan som köparen själv stöter på,
 * och den enda som därför får bära ett stycke text.
 *
 * Mönstret är genomgående: **varje fel var ett påstående om tillverkaren som
 * hämtats hos en återförsäljare.** Linocell-fallet är värst, eftersom uppgiften
 * låg i löptexten på precis den Kjell-sida specraderna redan var lästa från.
 *
 * ## Öppen redovisning är borttaget som kriterium
 *
 * Vägde 15 av 100 till 2026-08-06. Ett kriterium som belönar hur lätt en
 * uppgift är att hitta rankar säljarens produktblad och inte kabeln, och flera
 * av betygen under det byggde på just de frånvaron som visade sig vara
 * påhittade. Vikten är fördelad proportionellt: 35, 30, 23 och 12. Se
 * lib/corrections.ts.
 *
 * Anker Nano är enda produkten där butiken inte gick att lita på: Amazons
 * specifikationstabell anger **480 gigabyte per sekund**, en enhet som inte
 * finns. Ankers egen europeiska produktsida anger 480 Mbps och
 * "Data Transfer Protocols: USB2.0", och det är den uppgift som används.
 *
 * ## ⚠️ Effektkriteriet drog av för uppgifter vi inte hade läst
 *
 * Rättat 2026-08-06, andra passet. `effekt` stod på 4,5 för Ugreen L705, Anker
 * Nano, Linocell Flätad, Powerline III Flow och Apple, och på 5,0 för Clas
 * Ohlson och SiGN. Samtliga sju är 240 W-kablar.
 *
 * Skillnaden var aldrig en egenskap. Clas Ohlson och SiGN hade redan 5,0 med
 * "E-marker: Ej angiven" i samma tabell, alltså mätte halvsteget inte om
 * kabeln bär chipet utan om säljaren råkat skriva ut det. Ugreen är det
 * tydligaste fallet: 48 V/5 A står på tillverkarens egen EU-sida, alltså den
 * bäst belagda effekten på hela sidan, och kabeln låg ändå ett halvsteg under
 * två kablar utan en enda publicerad strömuppgift.
 *
 * Sakskälet gör avdraget omöjligt att försvara: en kabel märkt 240 W bär ett
 * e-markerchip, eftersom USB PD 3.1 med Extended Power Range inte tillåter
 * 48 V och 5 A utan ett. Watt-talet innehåller alltså redan chipet. Samtliga
 * 240 W-kablar står nu på 5,0, 100 W på 3,0 och 60 W på 2,0.
 *
 * Kvar att veta: Ankers och Apples ström- och PD-uppgifter är eftersökta hos
 * tillverkarna och i Ankers CE-försäkran för A82E2 och står ingenstans. De
 * ligger som streck i tabellen och påverkar inget betyg.
 *
 * ## ⚠️ Belkin och Linocell Flätad står båda på 5,9
 *
 * Oavrundat 5,90 mot 5,88. Tiogradiga betyget visar 5,9 för båda, medan
 * `rating` skiljer: 3,0 mot 2,9. `resolveProducts` sorterar på `score` och
 * bryter lika läge på ordningen i SEEDS, så Linocell Flätad ligger åtta och
 * Belkin nia trots att Belkins summa är två hundradelar högre. Ordningen är
 * inte flyttad, eftersom ingendera produkten har ett sakskäl att ligga före
 * den andra och en blockflytt i den här filen är den dyraste sortens ändring.
 * Se .agent/research/usb-c-kabel.md.
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
      "E-markerchip, så en 240-wattsladdare slipper hålla igen på 60",
    ],
    cons: [
      /* Stod "Manteln anges inte" till 2026-08-05. Fel: Delocks eget datablad
         för artikel 81192 anger "Cable jacket material: TPE", plus diameter
         5 mm och 22/24 AWG. Vi hade bara läst Teknikdelars nio specrader.
         delock.com svarar 401 men renderar hela sidan ändå.

         2026-08-06: samma fel satt kvar i specraden Mantel och i omdömets
         tredje stycke, som ägnade halva utrymmet åt den frånvaro som redan
         var motbevisad i den här listan. Båda rättade. */
      "TPE-mantel utan flätat ytterhölje, alltså mindre slitstark än en flätad kabel",
      "Finns bara i 2 meter, och den som behöver 0,5 får byta märke",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "40 Gbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB4", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "8K 60 Hz, DP 1.4a och DP 2.0", highlight: true },
      { label: "Längd", value: "2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ja" },
      { label: "Tillgängliga längder", value: "2 m" },
      /* Teknikdelar skrev 48 V. Delocks eget datablad för 81192 anger
         "Maximum current 5 A, Voltage 20.0 V". Vi följer databladet. */
      { label: "Max ström", value: "5 A vid 20 V" },
      { label: "USB PD-version", value: "USB PD 3.1 med EPR" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "TPE", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "4043619811922" },
    ],
    verdict:
      "Delock 240 W gör 40 gigabit i sekunden, 240 watt och 8K-video i 60 hertz för 199 kronor. Det är hundra kronor mindre än den flätade Linocell-kabeln hos Kjell, som flyttar data 83 gånger långsammare för samma 240 watt.\n\nDet praktiska är att kabeln slutar vara en fråga. En som klarar allt behöver du inte märka upp, inte lägga på rätt sida av skrivbordet och inte byta ut den dagen du kopplar in en extern SSD eller en skärm. Den bär ett e-markerchip, så en 240-wattsladdare får ge allt den har i stället för att hålla igen på 60, och med DisplayPort 2.0 Alt Mode driver den en 8K-skärm i 60 hertz. Bakåt fungerar den mot USB 3.2, USB 2.0 och Thunderbolt 3, alltså mot allt du redan har.\n\nManteln är **TPE, alltså mjuk plast utan flätat ytterhölje**. Flätad nylon tål böjning bättre, och när PZT böjde tolv kablar åt Testfakta gick de sönder just i höljet vid dragavlastningen. Ligger kabeln still bakom en dator spelar det ingenting, men ska den rullas ihop i en väska varje dag håller Linocells kevlarkabel längre.\n\nKöp Delock. Den gör allt kategorin kan för mindre än de flesta rena laddkablar kostar, och den enda som ska välja något annat är den som behöver en kortare kabel än två meter. Då är SiGN på 1,2 meter för 116 kronor rätt produkt.",
  },
  {
    id: "unisynk-usb4-240w-2m",
    userRating: { value: 4, count: 7, checkedAt: PRICE_CHECKED },
    brand: "Unisynk",
    name: "USB4-kabel USB-C till USB-C 240 W 2 m",
    shortName: "Unisynk USB4 240 W",
    image: productImage(USB_C_KABEL.slug, "unisynk-usb4-240w-2m"),
    tagline: "Vinnarens prestanda i en förstärkt flätad kabel du kan bära hem i dag.",
    scores: {
      datahastighet: 5,
      prisvarde: 2.5,
      effekt: 5,
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
      "Förstärkt flätad kabel som står emot böjning bättre än slät plast",
      "Finns i butik över hela landet om kabeln behövs i dag",
    ],
    cons: [
      /* Stod "Om kabeln bär ett e-markerchip är okänt" till 2026-08-06. Fel:
         Unisynk skriver "Med E-Mark chip" i punktlistan på sin egen svenska
         produktsida. Vi hade bara läst Kjells specrader. Samma fel som Delocks
         mantel, och samma orsak: ett påstående om tillverkaren hämtat hos en
         återförsäljare. */
      "165 kronor per meter, alltså 65 mer än vinnaren för samma tal på papperet",
      "Finns bara i 1 och 2 meter, så den räcker inte tvärs över ett rum",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "40 Gbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB4", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "8K 60 Hz via DisplayPort Alt Mode", highlight: true },
      { label: "Längd", value: "2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "240 W", highlight: true },
      { label: "E-marker", value: "Ja" },
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
      "Unisynk USB4 gör exakt vad vinnaren gör: 40 gigabit i sekunden, 240 watt, 8K i 60 hertz. Skillnaden ligger i höljet och i priset, 329 kronor för två meter.\n\nDen förstärkta flätan är värd något. När PZT böjde tolv laddkablar åt Testfakta sprack höljet vid dragavlastningen på dem som gick sönder, och flätad nylon tål den påfrestningen bättre än slät plast. Kabeln bär e-markerchip, alltså full 240-wattsladdning i stället för de 60 en laddare vågar ge en kabel som inte kan säga vad den tål. Den stöder dessutom daisy-chain, så en skärm kan kopplas vidare till nästa i stället för att var och en ska ha en egen sladd till datorn. Att kabeln är PVC-fri hör till samma bygge.\n\nPriset per meter är det som håller den borta från förstaplatsen. **165 kronor metern mot vinnarens 100**, för samma tal i varje rad i tabellen. Två meter är också taket, så den som ska nå från ett uttag bakom en soffa får titta på Clas Ohlsons tremeterskabel.\n\nHar du kabeln i handen i butiken i dag och tycker att flätan är värd hundralappen är det ett bra köp. Ska den ligga still bakom en dator och aldrig röras gör Delock samma sak för 199.",
  },
  {
    id: "ugreen-l705-usb4-240w",
    userRating: { value: 4.7, count: 1811, checkedAt: PRICE_CHECKED },
    brand: "Ugreen",
    name: "L705 USB4 240 W 40 Gbps, 1,3 m",
    shortName: "Ugreen L705 USB4",
    image: productImage(USB_C_KABEL.slug, "ugreen-l705-usb4-240w"),
    tagline: "Full USB4-prestanda i en kabel som är precis lagom lång för skrivbordet.",
    scores: {
      datahastighet: 5,
      prisvarde: 2,
      /* 4,5 till 2026-08-06. Höjt till 5: kabeln är 240 W och Ugreens egen
         EU-sida anger 48 V/5 A, alltså den bäst belagda effekten på sidan.
         Se kommentaren om effektkriteriet ovanför SEEDS. */
      effekt: 5,
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
      { label: "E-marker", value: "Ja" },
      { label: "Tillgängliga längder", value: "1,3 m" },
      /* Ugreens europeiska produktsida: "240W laddningshastighet vid 48V/5A".
         Stod "Ej angiven" till 2026-08-06, hämtat bara ur Amazons tabell. */
      { label: "Max ström", value: "5 A vid 48 V" },
      { label: "USB PD-version", value: "USB PD 3.1" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Flätad", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Ugreen L705 är kabeln att lägga på skrivbordet. 40 gigabit i sekunden flyttar 10 gigabyte på ett par sekunder, 240 watt vid 48 volt och 5 ampere räcker till vilken laptop som helst, och 1,3 meter är precis avståndet mellan en dator och en dockningsstation utan att en halvmeter sladd ligger och skräpar bakom skärmen.\n\nDen är också den mest köpta här med marginal på antalet omdömen: **1 811 kundbetyg med 4,7 i snitt**. Det säger ingenting om laboratorieprestanda, men det säger att kabeln fungerar för många människor under lång tid, vilket är mer än vi vet om de flesta andra på den här sidan.\n\nPriset per meter är det som håller den borta från toppen. 260 kronor för 1,3 meter blir 200 kronor metern, dubbelt mot vinnaren för samma tal i tabellen, och modellen finns bara i den längden. Ska kabeln nå längre än till kanten av skrivbordet är det fel produkt.\n\nHar du redan ett Amazon-konto och vill ha en kabel som aldrig blir flaskhalsen är det här ett rakt köp. Vill du ha samma 40 gigabit och 240 watt i en längre kabel för mindre pengar ligger Delock på 199 kronor för två meter.",
  },
  {
    id: "linocell-premium-kevlar-32-2m",
    userRating: { value: 4.5, count: 130, checkedAt: PRICE_CHECKED },
    brand: "Linocell",
    name: "Premium Kevlar USB-C 3.2-kabel 2 m",
    shortName: "Linocell Kevlar 3.2",
    image: productImage(USB_C_KABEL.slug, "linocell-premium-kevlar-32-2m"),
    tagline: "10 gigabit och en kevlarkärna, för mindre än Kjells egen rena laddkabel.",
    scores: {
      datahastighet: 3.5,
      prisvarde: 4.5,
      effekt: 3,
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
      "Kevlarkärna under flera skyddande lager, det tåligaste bygget här",
      "10 Gbps räcker till extern SSD och 4K-skärm i 60 Hz",
      "Finns i 1, 2 och 3 meter, så längden kan bytas utan att märket byts",
    ],
    cons: [
      "100 W, alltså inte de 240 en 16-tumsdator vill ha",
      "Fyra gånger långsammare än USB4-kablarna i samma prisklass",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "10 Gbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB 3.2 Gen 2", highlight: true },
      { label: "Videostöd", shortLabel: "Skärm", value: "4K 60 Hz", highlight: true },
      { label: "Längd", value: "2 m", highlight: true },
      { label: "Max effekt", shortLabel: "Effekt", value: "100 W", highlight: true },
      { label: "E-marker", value: "Ej angiven" },
      { label: "Tillgängliga längder", value: "1 m, 2 m och 3 m" },
      /* Kjells egen produkttext: "klarar upp till 100 W (20 V, 5 A)". Stod
         "Ej angiven" till 2026-08-06 därför att uppgiften ligger i löptexten
         och inte i specifikationstabellen på den sida vi redan läst. */
      { label: "Max ström", value: "5 A vid 20 V" },
      { label: "USB PD-version", value: "USB PD" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Kevlarkärna med skyddslager", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Linocell Premium Kevlar är kabeln att köpa om du vill slippa frågan i fem år. Kärnan är kevlar, samma fiber som sitter i skyddsvästar, under flera skyddande lager, och 199,90 kronor för två meter är billigare än de rena laddkablarna en hylla bort.\n\nBygget är poängen. Testfaktas provning visar varför: de kablar som gick sönder gick sönder i höljet vid dragavlastningen, inte inuti, alltså precis där den här har mest material. **10 gigabit i sekunden är 20 gånger en vanlig laddkabel**, vilket räcker till en extern SSD utan att du sitter och väntar, och 4K i 60 hertz driver skärmen på de flesta skrivbord. Den finns i 1, 2 och 3 meter, så längden kan bytas utan att du börjar om med ett märke du inte vet något om.\n\nEffekten är gränsen. 100 watt vid 20 volt och 5 ampere laddar en MacBook Air och en 14-tumsdator, men en 16-tums MacBook Pro i full fart drar mer, och har du köpt en 240-wattsladdare får du inte ut den här.\n\nÄger du en telefon, en platta och en mindre laptop är det här sidans mest genomtänkta köp. Ska den ladda en 16-tumsdator i full fart räcker den inte, och då är SiGN på 116 kronor både billigare och starkare.",
  },
  {
    id: "clas-ohlson-usb-c-240w-3m",
    userRating: { value: 4, count: 79, checkedAt: PRICE_CHECKED },
    brand: "Clas Ohlson",
    name: "USB-C till USB-C-kabel 5 A 240 W, 3 m",
    shortName: "Clas Ohlson 240 W 3 m",
    image: productImage(USB_C_KABEL.slug, "clas-ohlson-usb-c-240w-3m"),
    tagline: "Tre meter når soffan, och 240 watt laddar allt du bär dit.",
    scores: {
      datahastighet: 1,
      prisvarde: 4.5,
      effekt: 5,
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
      "Ska kabeln gå från ett uttag bakom en soffa till en telefon i knät är det här den att köpa. Tre meter för 249 kronor är **83 kronor per meter**, och bara IKEA kommer lägre.\n\nLängden är hela argumentet, och den är ovanligare än den borde vara: av de tretton kablarna här är det bara den här som når tre meter. Den är USB-IF-certifierad, alltså provad mot standarden i stället för bara märkt med logotypen, och den växlar mellan PD 3.1 med 240 watt vid 48 volt och PD 3.0 med 100 watt vid 20. I praktiken betyder det att samma sladd laddar en telefon, en platta och en 16-tumsdator i full fart utan att du behöver veta vilken av dem du kopplar in.\n\nData och bild får du inte. 480 megabit i sekunden är ren laddkabelklass, och kabeln driver ingen skärm alls. **En stor filflytt tar 80 gånger så lång tid som över vinnaren.**\n\nI en soffa spelar det ingen roll, för det som händer där är att en telefon laddar, och då är tre meter värt mer än 40 gigabit. Ska samma kabel också koppla en dator till en bildskärm är det fel produkt: Linocells kevlarkabel kostar 50 kronor mindre och flyttar data 20 gånger snabbare.",
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
      "Flätad nylon och zinklegering i kontakterna, inte slät plast",
    ],
    cons: [
      /* Stod "Manteln anges inte, och märket är okänt för de flesta" till
         2026-08-06, och var det enda påstående om frånvaro på den här sidan som
         den stående inventeringen fångade. Det var ändå fel: Batteriexperten
         anger "Material: Zinklegering + nylonfläta" och "Flätad
         nylonkonstruktion". Vi hade bara läst Teknikdelar. */
      "480 Mbps, alltså ingen filflytt och ingen skärm",
      "1,2 meter räcker inte från ett uttag bakom en soffa",
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
      { label: "Mantel", value: "Flätad nylon", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "7350149972090" },
    ],
    verdict:
      "Ska du ha tre kablar till tre rum är SiGN köpet. 116 kronor ger 240 watt och USB PD 3.1 med 5 ampere vid 48 volt, alltså laddar den en 16-tums MacBook Pro precis lika fort som Apples egen kabel för 399.\n\nDen laddar i toppklass och gör inget annat. **480 megabit i sekunden** flyttar ett fotobibliotek över en kväll i stället för över en kaffepaus, och driver ingen skärm alls. Vid en säng, i en bilhållare eller i en väska märks ingetdera. Bygget är bättre än priset antyder: flätad nylon runt kabeln och zinklegering i kontakthusen, alltså de två ställen där en billig kabel brukar ge upp först.\n\n1,2 meter är gränsen. Det räcker till ett nattduksbord och till ett skrivbord, men inte från ett uttag bakom en soffa fram till någon som sitter i den.\n\nFör en ren laddkabel finns det ingen anledning att betala mer än så här. Köp tre. Ska kabeln också flytta filer eller driva en skärm är den värdelös till det, och då börjar det på 199 kronor hos Delock.",
  },
  {
    id: "anker-nano-240w-18m",
    userRating: { value: 4.8, count: 28337, checkedAt: PRICE_CHECKED },
    brand: "Anker",
    name: "Nano USB-C till USB-C-kabel 240 W, 1,8 m",
    shortName: "Anker Nano 240 W",
    image: productImage(USB_C_KABEL.slug, "anker-nano-240w-18m"),
    tagline: "Mjuk flätad kabel av återvunnen nylon som inte trasslar i en väska.",
    scores: {
      datahastighet: 1,
      prisvarde: 4.5,
      /* 4,5 till 2026-08-06, enbart för att Anker inte skriver ut ström och
         PD-version. Kabeln är 240 W. Höjt till 5. */
      effekt: 5,
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
      "Driver ingen skärm, så den ersätter inte sladden till en bildskärm",
    ],
    specs: [
      { label: "Datahastighet", shortLabel: "Data", value: "480 Mbps", highlight: true },
      { label: "USB-generation", shortLabel: "Standard", value: "USB 2.0", highlight: true },
      /* Ankers egen EU-sida: "(Note: This cable does not support screen
         mirroring.)". Stod "Ej angiven" till 2026-08-06, läst bara hos Amazon. */
      { label: "Videostöd", shortLabel: "Skärm", value: "Nej", highlight: true },
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
      "Anker Nano är den mest omtyckta kabeln här med stor marginal: **28 337 kundbetyg och 4,8 i snitt**. Den är mjuk, flätad i återvunnen nylon, trasslar inte i en ficka och drar 240 watt, allt för 179 kronor.\n\nSom laddkabel i en väska är den svår att slå. 1,8 meter för 99 kronor metern ligger på samma nivå som vinnaren, och flätan är av det mjuka slaget som lägger sig platt i stället för att minnas hur den låg hoprullad. Det låter som en detalj tills man dragit upp en styv kabel ur en ryggsäck och fått med sig allt annat på köpet.\n\nDen kostar som en snabb kabel utan att vara en. **480 megabit i sekunden och USB 2.0** är laddkabelklass, och den driver ingen skärm. En kabel för en tredjedel av priset flyttar data precis lika långsamt.\n\nDet är ändå ett bra köp, för det du betalar för är att den håller och att den aldrig ligger i knut. Ska den flytta filer från en extern disk eller driva en bildskärm är den fel produkt, och då kostar Delock 20 kronor mer och gör 83 gånger mer.",
  },
  {
    id: "belkin-thunderbolt-4-aktiv-2m",
    /* FLYTTAD 2026-08-06. Låg efter Powerline III Flow. Efter att
       effektavdraget togs bort hamnar Belkin och Linocell Flätad båda på 5,9,
       oavrundat 5,90 mot 5,88, och resolveProducts bryter lika läge på
       ordningen här. Belkin sorterades då nia trots den högre summan, alltså
       tappade en placering utan att ett enda betyg ändrats. Blocket ligger nu
       före Linocell Flätad, så tiebreaken följer underlaget. */
    userRating: { value: 4.5, count: 2, checkedAt: PRICE_CHECKED },
    brand: "Belkin",
    name: "Thunderbolt 4 Aktiv USB-C-kabel 2 m",
    shortName: "Belkin Thunderbolt 4",
    image: productImage(USB_C_KABEL.slug, "belkin-thunderbolt-4-aktiv-2m"),
    tagline: "Aktiv elektronik i kontakterna håller 40 Gbps hela vägen till dockan.",
    scores: {
      datahastighet: 5,
      prisvarde: 0.5,
      effekt: 3,
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
      /* Belkins egen produktsida för INZ002bt2MBK, läst 2026-08-06: "our Active
         Thunderbolt 4 Cable is also available in 1M / 3.3-foot length". Stod
         "2 m" därför att bara Kjells artikel var läst. */
      { label: "Tillgängliga längder", value: "1 m och 2 m" },
      { label: "Max ström", value: "Ej angiven" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "USB-IF-certifiering", value: "Ej angiven" },
      { label: "Mantel", value: "Ej angiven", highlight: true },
      { label: "Angivet böjtal", value: "Ej angivet" },
      { label: "Kontaktvinkel", value: "Rak" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Det finns ett skäl att betala 1 099 kronor för två meter kabel: en passiv kabel tappar fart när den blir lång. Belkins är aktiv, alltså har den elektronik i kontakterna som håller signalen uppe hela vägen, och det märks när en dockningsstation ska driva två skärmar och en hårddisk samtidigt två meter bort.\n\nThunderbolt-märket betyder dessutom något som USB-C-märkningen inte gör. Kabeln är Thunderbolt 4-certifierad och följer USB4, medan vem som helst får trycka USB-C på en sladd utan att ha provat den mot någonting. Betalar du för en docka på 3 000 kronor är det den skillnaden du köper bort risken med.\n\nAllt annat talar emot. **550 kronor per meter är fem gånger vinnaren**, som gör samma 40 gigabit. Effekten stannar dessutom på 100 watt, alltså mindre än en kabel för 116 kronor ger, så den laddar inte en 16-tumsdator i full fart medan den är inkopplad.\n\nHar du en Thunderbolt-docka två meter från datorn och har märkt att en billigare kabel inte orkar, då är det här produkten som löser det. Saknas någon av de tre delarna finns ingen anledning alls, och för allt annat gör Delock samma 40 gigabit för en femtedel.",
  },
  {
    id: "linocell-flatad-240w-2m",
    userRating: { value: 4.5, count: 27, checkedAt: PRICE_CHECKED },
    brand: "Linocell",
    name: "Flätad USB-C- till USB-C-kabel 240 W, 2 m",
    shortName: "Linocell Flätad 240 W",
    image: productImage(USB_C_KABEL.slug, "linocell-flatad-240w-2m"),
    tagline: "Silikonkärna under flätat ytterhölje, mjuk att rulla och tålig att böja.",
    scores: {
      datahastighet: 1,
      prisvarde: 3,
      /* 4,5 till 2026-08-06, enbart för att Kjell inte skriver ut ström och
         PD-version. Kabeln är 240 W. Höjt till 5. */
      effekt: 5,
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
      "Linocell Flätad har det bästa bygget Kjell säljer i kategorin. En flexibel silikonkärna med flätat ytterhölje ger en kabel som är mjuk att rulla ihop och samtidigt tål att böjas, och det är den kombinationen som avgör om en kabel lever i tre år eller ett.\n\nDen laddar allt. 240 watt räcker till den kraftigaste laptop som säljs, och den finns i 1 och 2 meter i både svart och vitt, så den går att matcha mot ett skrivbord utan att byta märke.\n\nPriset mot vad den flyttar är problemet. 299,90 kronor för två meter är **150 kronor per meter för 480 megabit i sekunden**. Trettio kronor högre upp i samma hylla ligger Unisynks USB4-kabel som gör 83 gånger mer data, och 100 kronor lägre ligger Kjells egen kevlarkabel som gör 20 gånger mer och tål minst lika mycket.\n\nStår du i butiken, vet att kabeln aldrig ska göra något annat än ladda, och vill ha den som känns bäst i handen, så är det här den. I alla andra lägen är kevlarkabeln en bättre affär i samma butik.",
  },
  {
    id: "anker-powerline-iii-flow-240w",
    userRating: { value: 4.8, count: 729, checkedAt: PRICE_CHECKED },
    brand: "Anker",
    name: "Powerline III Flow USB-C till USB-C 240 W, 0,9 m",
    shortName: "Anker Powerline III Flow",
    image: productImage(USB_C_KABEL.slug, "anker-powerline-iii-flow-240w"),
    tagline: "Nanos korta syskon i silikon, för nattduksbordet och 50 kronor mindre.",
    scores: {
      datahastighet: 1,
      prisvarde: 3,
      /* 4,5 till 2026-08-06, enbart för att Anker inte skriver ut ström och
         PD-version. Kabeln är 240 W. Höjt till 5. */
      effekt: 5,
      konstruktion: 4,
    },
    price: 129,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Amazon.se",
    merchantUrl: "https://www.amazon.se/dp/B0DG2WQMRD",
    superlative: "Bäst till nattduksbordet",
    pros: [
      "Silikonmantel som varken trasslar eller minns hur den legat",
      "Mjukare att rulla ihop än Nanos flätade nylon",
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
      "Powerline III Flow är i praktiken Anker Nano i kort format. Samma 240 watt, samma 480 megabit i sekunden, samma ingen skärm, och samma mjuka uppförande i en väska.\n\nSkillnaden är materialet och längden. Höljet är silikon i stället för flätad nylon, alltså ännu mjukare att rulla ihop och ännu mindre benäget att minnas hur det låg, och kabeln är 0,9 meter i stället för 1,8. Det gör den till en sängkabel: den når från ett uttag till ett nattduksbord och nästan ingenstans annars. **143 kronor per meter** är priset för den korta längden.\n\nStår sängen så att uttaget sitter en armlängd bort är det här rätt kabel och 50 kronor billigare än Nano. Behöver du mer än en meter finns exakt samma kabel som 1,8-metersversion, och då är Nano billigare per meter.",
  },
  {
    id: "ikea-lillhult-usb-c-60w",
    userRating: { value: 4.6, count: 410, checkedAt: PRICE_CHECKED },
    brand: "IKEA",
    name: "LILLHULT USB-C till USB-C 60 W, 1,5 m",
    shortName: "IKEA LILLHULT",
    image: productImage(USB_C_KABEL.slug, "ikea-lillhult-usb-c-60w"),
    tagline: "59 kronor för 1,5 meter, och laddar en telefon lika fort som alla andra.",
    scores: {
      datahastighet: 1,
      prisvarde: 5,
      effekt: 2,
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
      "För 59 kronor laddar LILLHULT din telefon exakt lika fort som en kabel för 445. Ingen telefon som säljs i dag drar mer än 60 watt, och 60 watt är vad den ger.\n\nLängden är det andra som gör den värd pengarna. 1,5 meter är en halvmeter mer än kabeln som följde med telefonen, alltså skillnaden mellan att kunna sitta upp i sängen med telefonen i handen och att inte kunna det. **39 kronor per meter** är billigast här med bred marginal, och 410 kundbetyg ligger på 4,6.\n\nTaket är tydligt. 60 watt laddar en MacBook Air men inte en större dator, och 480 megabit i sekunden flyttar data långsamt och driver ingen skärm alls.\n\nKöp två. Det här är kabeln att ha liggande i varje rum, och den enda här som är billig nog att inte sakna när den försvinner bakom en soffa. Ska du ladda en laptop över 60 watt eller flytta filer är den fel produkt, och då börjar det på 116 kronor.",
  },
  {
    id: "blue-star-usb-c-60w-2m",
    brand: "Blue Star",
    name: "USB-C till USB-C 3 A 60 W ECO, 2 m",
    shortName: "Blue Star ECO 60 W",
    image: productImage(USB_C_KABEL.slug, "blue-star-usb-c-60w-2m"),
    tagline: "Två meter för 99 kronor, det billigaste sättet att fylla varje rum.",
    scores: {
      datahastighet: 1,
      prisvarde: 5,
      effekt: 2,
      konstruktion: 2,
    },
    price: 99,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "TheMobileStore",
    merchantUrl:
      "https://www.themobilestore.se/blue-star-usb-c-usb-c-3a-60w-kabel-2m-eco-svart",
    superlative: "Billigast per meter",
    pros: [
      "49,50 kronor per meter, näst lägst i jämförelsen",
      "Två meter räcker från ett uttag till en soffa eller en säng",
      "60 W laddar varje telefon och platta i full fart",
    ],
    cons: [
      /* Datahastigheten är kontrollerad 2026-08-06 hos både butiken och Blue
         Stars hemmamarknad och står ingenstans. Den stod som nackdel och som
         ett helt stycke i omdömet fram till samma dag, och båda är borttagna:
         kabeln flyttar vad den flyttar, och den som väljer mellan tretton
         kablar hjälps av det vi vet. Var vi letat står i
         .agent/research/usb-c-kabel.md. */
      "60 W räcker inte till en stor laptop, och en MacBook Pro 16 tum laddar långsamt",
      "Ingen skärm via kabeln, så en dator med extern skärm behöver en annan",
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
      "99 kronor för två meter är **49,50 kronor per meter**, och bara IKEA kommer lägre. Ska du ha en kabel till sängen, en till soffan och en till bilen är det här det billigaste sättet att göra det med kablar som faktiskt når fram.\n\n60 watt och 3 ampere räcker till varje telefon och platta som säljs, och till en MacBook Air. Två meter räcker från ett uttag bakom en soffa till någon som sitter i den, vilket 1,2-meterskablarna en bit upp i listan inte gör.\n\nTaket är 60 watt, och där tar den slut. En MacBook Pro 16 tum vill ha 140 och laddar märkbart långsammare på den här, och skärm via kabeln är inte något den gör. Det här är kabeln till telefonen och plattan, inte den du kopplar in skrivbordet med.\n\nKöp den om du vill ha en kabel i varje rum utan att räkna på det. Ska en och samma kabel både ladda datorn och flytta filer du väntar på, ta Delock högst upp: hundra kronor mer, och den gör allting.",
  },
  {
    id: "apple-240w-usb-c-2m",
    userRating: { value: 4.5, count: 41, checkedAt: PRICE_CHECKED },
    brand: "Apple",
    name: "240 W USB-C-laddningskabel, 2 m",
    shortName: "Apple 240 W",
    image: productImage(USB_C_KABEL.slug, "apple-240w-usb-c-2m"),
    tagline: "Vävd mantel och 240 watt, med Apples garanti till en Apple-dator.",
    scores: {
      datahastighet: 1,
      prisvarde: 2,
      /* 4,5 till 2026-08-06, enbart för att Apple inte skriver ut ström och
         PD-version. Kabeln är 240 W. Höjt till 5. */
      effekt: 5,
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
      "Apples 240 W är välbyggd. Den vävda manteln är en verklig förbättring mot de vita kablarna som brukade spricka precis vid kontakten, och 240 watt laddar det tyngsta Apple säljer i full fart.\n\nDen är också den dyraste rena laddkabeln här. Dataöverföringen ligger på **USB 2-hastighet**, alltså samma klass som IKEA:s kabel för 59 kronor, och kabeln driver ingen skärm. 200 kronor per meter för det.\n\nEn sak att göra innan du köper: kontrollera var. Kabeln kostar 399 kronor hos Clas Ohlson och 445 hos Kjell, alltså 46 kronor för exakt samma artikel.\n\nVill du ha Apples egen kabel med Apples garanti till en Apple-dator är det här den, och det är ett fullt begripligt skäl att betala. Handlar det bara om att ladda fort gör SiGN samma sak för 116 kronor, och ska kabeln dessutom flytta filer och driva en skärm kostar Delock 199.",
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
