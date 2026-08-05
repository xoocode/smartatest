import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { USB_C_LADDARE } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /usb-c-laddare.
 *
 * Priser, produktnamn, kundbetyg och butikslänkar är lästa på butikernas egna
 * produktsidor 2026-08-05, och URL:erna nedan är de kanoniska efter
 * omdirigering. Kjells kategorisökväg heter `usb-c-laddare` men de kanoniska
 * produktsökvägarna ligger under `usb-laddare` och `snabbladdare`; länka till
 * den kanoniska, annars kostar det en hop för både läsare och crawler.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans än. Se lib/links.ts.
 *
 * ## Två fällor som gav fel värden under bygget, båda rättade
 *
 * 1. **Kjells listvy ljuger om priset för vissa artiklar.** Kategorisidans JSON
 *    angav Anker Prime 160 W till 169 kr, Apple 140 W till 139 kr och Ugreen
 *    DigiNest Cube till 79 kr. Samtliga är tillbehörs- eller variantpriser.
 *    Varje pris här är läst på produktens egen sida.
 * 2. **Slugen kräver färgsuffix.** `...-p26221` utan `-svart` omdirigerar till
 *    kategorisidan med HTTP 200, alltså utan att se ut som ett fel. Tre URL:er
 *    hämtades tomma innan det upptäcktes.
 *
 * ## Varför Xtorm inte finns här
 *
 * Xtorm XEC100 vann sin effektklass hos Testaankoop och säljs i Sverige, men
 * enda återförsäljaren är Dustin, som visar priser **exklusive moms**. 699 kr
 * där är cirka 874 kr för konsument, och artikeln är beställningsvara. Att
 * publicera 699 hade varit ett fel på 25 procent. Se övervägda nedan.
 *
 * ## Betygen
 *
 * Kriteriepoängen är redaktionell bedömning ur publicerade specifikationer,
 * inte mätningar. Ingen laddare här är provad av oss eller av någon annan: de
 * nio modeller Testaankoop namnger med poäng säljs inte av butikerna i
 * jämförelsen, och ett lånat provresultat vore en påhittad mätning. Det står
 * också i sidans metodavsnitt.
 *
 * ## Tio av tretton länkar går till Kjell
 *
 * Koncentrationen är verklig och står utskriven på sidan, samma lösning som på
 * /smart-hem-hubb. Skälet är sortimentet: Kjell för 45 väggladdare i kategorin
 * medan Teknikdelars motsvarande sida till övervägande del är kablar. IKEA,
 * Teknikdelar och Estore bär en produkt var.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "ugreen-nexode-pro-65w",
    userRating: { value: 4.5, count: 18, checkedAt: PRICE_CHECKED },
    brand: "Ugreen",
    name: "Nexode Pro 65 W GaN med 3 portar",
    shortName: "Nexode Pro 65 W",
    image: productImage(USB_C_LADDARE.slug, "ugreen-nexode-pro-65w"),
    tagline: "Laddar laptopen med full fart medan telefonen sitter i bredvid.",
    scores: {
      effektdelning: 4.5,
      prisvarde: 3.5,
      storlek: 4,
      redovisning: 5,
      protokoll: 4,
    },
    price: 599.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/ugreen-nexode-pro-65-w-gan-snabbladdare-med-3-portar-p21297",
    award: "winner",
    superlative: "Bäst i test",
    pros: [
      "65 W på första porten räcker till en MacBook Air i full fart",
      "Andra USB-C-porten håller 30 W även när den första är belastad",
      "USB-C-kabel på 100 W och 1,5 m ligger i kartongen",
    ],
    cons: [
      "9,20 kronor per watt, ungefär dubbelt mot den billigaste här",
      "22,5 W på USB-A räcker till hörlurar och klocka, inte till en padda",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "65 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "2 × USB-C + 1 × USB-A", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "65 W (USB-C1)", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "65 W + 30 W", highlight: true },
      { label: "Effekt per port angiven", value: "Ja, per port" },
      { label: "Kabel ingår", value: "Ja, 100 W 1,5 m" },
      { label: "USB PD-version", value: "USB PD" },
      { label: "PPS", value: "3,3–11 V / 4,5 A" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "53 × 40 × 33 mm" },
      { label: "Vikt", value: "117 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Ugreen Nexode Pro 65 W är laddaren för den som bär en dator och en telefon i samma väska, och kostar 599,90 kronor. Den ger 65 W på sin första USB-C-port, vilket räcker till en MacBook Air i full hastighet, och 30 W på den andra samtidigt. Det är den kombinationen som avgör: sätter du i telefonen medan datorn laddar tappar datorn ingenting den märker, och telefonen får ändå snabbladdning. En USB-C-kabel på 100 W följer med, vilket är ovanligt nog att räknas som en del av priset. Kabeln kostar annars mellan 150 och 250 kronor. Med 117 gram och 53 millimeter på bredden tar den en plats i grenuttaget och inte två. Den kostar 9,20 kronor per watt och är alltså ingen prisvinnare. Köp den ändå. Det här är den laddare som gör vad den påstår oavsett vad du hänger i den, och det finns ingen situation i jämförelsen där något annat är ett bättre förstaval.",
  },
  {
    id: "linocell-gan-35w",
    userRating: { value: 4.5, count: 168, checkedAt: PRICE_CHECKED },
    brand: "Linocell",
    name: "GaN snabbladdare 35 W PD med 2 USB-C-portar",
    shortName: "Linocell GaN 35 W",
    image: productImage(USB_C_LADDARE.slug, "linocell-gan-35w"),
    tagline: "50 gram och två portar, och den delar effekten utan att tappa fart.",
    scores: {
      effektdelning: 4,
      prisvarde: 3,
      storlek: 5,
      redovisning: 4.5,
      protokoll: 4,
    },
    price: 299.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/linocell-gan-snabbladdare-35-w-pd-med-2-usb-c-portar-vit-p29970",
    award: "editor",
    superlative: "Bäst för resväskan",
    pros: [
      "50 gram och 34 mm, minst och lättast av laddarna i jämförelsen",
      "Tappar bara 5 W när två enheter sitter i samtidigt",
      "PPS ger Samsung-telefoner deras snabbaste laddning",
    ],
    cons: [
      "35 W räcker till en ultrabook som laddar långsamt, inte till en speldator",
      "Kabeln ligger inte i kartongen",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "35 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "2 × USB-C", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "35 W", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "30 W totalt", highlight: true },
      { label: "Effekt per port angiven", value: "Total, inte per port" },
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "Ja" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "34 × 31 × 31 mm" },
      { label: "Vikt", value: "50 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Linocell GaN 35 W är den minsta laddaren i jämförelsen och kostar 299,90 kronor. Den väger 50 gram och mäter 34 millimeter på den bredaste kanten, vilket betyder att den försvinner i en byxficka och aldrig blockerar uttaget bredvid. Två USB-C-portar ger 35 W till en enhet och 30 W delat på två, alltså en förlust på 5 W när du sätter i den andra enheten, och det är den minsta nedgången bland flerportsladdarna här. Stödet för PPS gör att en Samsung-telefon får sin snabbaste laddning och inte bara ström. Begränsningen är effekten: 35 W laddar en ultrabook medan du arbetar men fyller inte en tömd 16-tums laptop under en lunch. Köp den om laddaren ska följa med i necessären och prylarna är en telefon, ett par lurar och möjligen en lätt dator. Ska den försörja en riktig arbetsdator hemma tar du Ugreen Nexode Pro 65 W.",
  },
  {
    id: "ugreen-nexode-100w-utdragbar",
    brand: "Ugreen",
    name: "Nexode 100 W GaN med utdragbar USB-C-kabel",
    shortName: "Nexode 100 W",
    image: productImage(USB_C_LADDARE.slug, "ugreen-nexode-100w-utdragbar"),
    tagline: "Kabeln sitter i laddaren och rullas in när du är klar.",
    scores: {
      effektdelning: 4.5,
      prisvarde: 4,
      storlek: 2,
      redovisning: 4.5,
      protokoll: 4,
    },
    price: 799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/snabbladdare/ugreen-nexode-100-w-gan-snabbladdare-med-utdragbar-usb-c-kabel-p21288",
    superlative: "Bäst när kabeln alltid är borta",
    pros: [
      "100 W på USB-C1 fyller en MacBook Pro 14 tum",
      "Inbyggd kabel på 0,7 m som rullas in, ingen lös kabel att tappa",
      "Fyra portar totalt, så hela skrivbordet får ström från ett uttag",
    ],
    cons: [
      "280 gram och 69 mm bred, tyngst och klumpigast av laddarna här",
      "Den inbyggda kabeln är 0,7 m, så uttaget måste sitta nära",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "100 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "3 × USB-C + 1 × USB-A", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "100 W (USB-C1)", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "100 W + 30 W", highlight: true },
      { label: "Effekt per port angiven", value: "Ja, per port" },
      { label: "Kabel ingår", value: "Ja, inbyggd 0,7 m" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "Ja" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "68,6 × 56,8 × 50,4 mm" },
      { label: "Vikt", value: "280 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Ugreen Nexode 100 W löser problemet att kabeln aldrig ligger där den ska, och kostar 799 kronor. En USB-C-kabel på 0,7 meter sitter inbyggd i höljet och rullas in igen när du är klar, vilket gör laddaren till ett självförsörjande paket att slänga i väskan. USB-C1 ger 100 W, tillräckligt för en MacBook Pro 14 tum, och 30 W finns kvar på andra porten samtidigt. Med fyra portar totalt räcker den till dator, telefon och padda från ett vägguttag. Priset är 8 kronor per watt, vilket är billigt för effekten. Nackdelen är fysisk: 280 gram och nästan 7 centimeter bred gör den till den klumpigaste laddaren i jämförelsen, och den tar två platser i ett grenuttag. Köp den om laddaren ska bo i väskan och du är trött på att leta kabel. Ska den sitta permanent bakom ett skrivbord finns det mindre klumpiga sätt att få 100 W.",
  },
  {
    id: "ugreen-multiladdare-200w",
    userRating: { value: 5, count: 69, checkedAt: PRICE_CHECKED },
    brand: "Ugreen",
    name: "Kraftfull Multiladdare 6 portar 200 W",
    shortName: "Ugreen 200 W",
    image: productImage(USB_C_LADDARE.slug, "ugreen-multiladdare-200w"),
    tagline: "Sex enheter på full fart från ett enda vägguttag.",
    scores: {
      effektdelning: 5,
      prisvarde: 3.5,
      storlek: 2,
      redovisning: 4,
      protokoll: 4.5,
    },
    price: 1699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/ugreen-kraftfull-multiladdare-6-portar-200-w-p22418",
    award: "premium",
    superlative: "Bäst för skrivbordet med sex prylar",
    pros: [
      "Två portar på 100 W var, så två laptops laddar i full fart samtidigt",
      "200 W totalt räcker till sex enheter utan att någon svälter",
      "Löstagbar nätkabel på 2 m följer med",
    ],
    cons: [
      "1 699 kronor är mer än tre av laddarna här kostar tillsammans",
      "10 × 10 cm på skrivbordet, och den sitter inte i vägguttaget utan bredvid",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "200 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "4 × USB-C + 2 × USB-A", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "100 W (C1/C2)", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "100 W + 100 W", highlight: true },
      { label: "Effekt per port angiven", value: "Ja, per portpar" },
      { label: "Kabel ingår", value: "Ja, nätkabel 2 m" },
      { label: "USB PD-version", value: "USB PD" },
      { label: "PPS", value: "3,3–21 V" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "101 × 101 × 33 mm" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Ugreen 200 W är bordsladdaren för den som har slut på uttag, och kostar 1 699 kronor. Fyra USB-C och två USB-A ger sex enheter ström samtidigt, och de två starkaste portarna håller 100 W var, så två laptops laddar i full hastighet på en gång, vilket ingen annan laddare i jämförelsen klarar. De två följande portarna ger 65 W var, så en padda och en telefon får snabbladdning ovanpå det. PPS mellan 3,3 och 21 volt täcker det mesta som säljs. Den kostar 8,50 kronor per watt, vilket är rimligt för effekten men 1 699 kronor är fortfarande mycket pengar. Den sitter dessutom inte i vägguttaget utan står på bordet med en nätkabel, och tar 10 × 10 centimeter i anspråk. Köp den om skrivbordet försörjer två datorer och en familjs telefoner. Ska en enda dator laddas räcker Ugreen Nexode Pro 65 W för en tredjedel av pengarna.",
  },
  {
    id: "logilink-pa0281-100w",
    brand: "LogiLink",
    name: "PA0281 USB-C GaN 100 W med 2 portar",
    shortName: "LogiLink PA0281",
    image: productImage(USB_C_LADDARE.slug, "logilink-pa0281-100w"),
    tagline: "100 W ur 200 gram, och databladet säger vad den drar och tål.",
    scores: {
      effektdelning: 3.5,
      prisvarde: 3.5,
      storlek: 3,
      redovisning: 5,
      protokoll: 4,
    },
    price: 779,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Estore",
    merchantUrl:
      "https://estore.nu/sv/hem-hobby/34620-usb-laddare-1-x-usb-c-pd-1-x-usb-a-100w-gan.html",
    superlative: "Bäst för den som vill veta allt i förväg",
    pros: [
      "100 W på USB-C-porten räcker till en MacBook Pro 14 tum",
      "200 gram och 30 mm tjock, lätt för sin effekt",
      "PPS mellan 3,3 och 21 volt täcker både Apple och Android",
    ],
    cons: [
      "Bara en USB-C-port, så två moderna enheter kan inte ladda snabbt samtidigt",
      "Kabeln ligger inte i kartongen, och 100 W kräver en e-märkt 5 A-kabel",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "100 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "1 × USB-C + 1 × USB-A", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "100 W (USB-C)", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "100 W totalt, delat", highlight: true },
      { label: "Effekt per port angiven", value: "Ja, full spänningstabell" },
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD, 20 V / 5 A" },
      { label: "PPS", value: "3,3–21 V / 3 A" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "66,8 × 66,8 × 30 mm" },
      { label: "Vikt", value: "200 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "LogiLink PA0281 ger 100 W ur ett hölje som väger 200 gram och kostar 779 kronor. Den effekten fyller en MacBook Pro 14 tum, och 30 millimeters tjocklek gör att den sitter i ett grenuttag utan att bygga ut från väggen som de flesta 100-wattsladdare gör. PPS mellan 3,3 och 21 volt betyder att både iPhone och Galaxy får sin snabbaste laddning. Den håller verkningsgradsklass Level VI och får köras ner till 10 minusgrader, vilket gör den till en av få laddare här som kan bo i ett ouppvärmt gästhus över vintern. Begränsningen är att det finns en enda USB-C-port. Sitter datorn i får telefonen nöja sig med USB-A och 30 W, och de två portarna delar dessutom på samma 100 watt, så full fart åt båda samtidigt går inte. Köp den om du laddar en kraftfull dator i taget och vill ha marginal i både effekt och kyla. Ska två moderna enheter ladda snabbt samtidigt tar du Ugreen Nexode 100 W för 20 kronor mer.",
  },
  {
    id: "linocell-premium-gan-140w",
    userRating: { value: 4.5, count: 254, checkedAt: PRICE_CHECKED },
    brand: "Linocell Premium",
    name: "GaN multiladdare PD 3.1 140 W",
    shortName: "Linocell 140 W",
    image: productImage(USB_C_LADDARE.slug, "linocell-premium-gan-140w"),
    tagline: "140 W på en port, nog för de datorer som vägrar ladda på 100.",
    scores: {
      effektdelning: 3.5,
      prisvarde: 4.5,
      storlek: 2,
      redovisning: 2.5,
      protokoll: 5,
    },
    price: 699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/linocell-premium-gan-multiladdare-pd-3.1-140-w-vit-p20612",
    superlative: "Bäst för en 16-tums laptop",
    pros: [
      "140 W räcker till en MacBook Pro 16 tum, som drar mer än 100 W ger",
      "5 kronor per watt, näst billigast räknat på effekten",
      "AVS mellan 15 och 28 volt, det som krävs för de högsta effekterna",
    ],
    cons: [
      /* Båda punkterna stod som okända till 2026-08-05. Båda står i manualen
         som Kjell länkar från produktsidans supportflik: hela fördelningen
         port för port, samt 100×67×36 mm och 230 g. Butikssidans
         specifikationsblock saknar dem, och det lästes som att de inte fanns. */
      "Med telefonen i port 3 sjunker datorporten från 140 till 100 W enligt manualen",
      "230 gram och 100 millimeter hög, alltså ingen laddare för väskans ytterfack",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "140 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "3 × USB-C + 1 × USB-A", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "140 W (port 1/2)", highlight: true },
      /* Fem rader stod "Ej angiven" till 2026-08-05. Samtliga står i manualen
         som produktsidan länkar till under Support. Butikssidans eget
         specifikationsblock har dem inte, och det blocket lästes som facit. */
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "70 W + 70 W", highlight: true },
      { label: "Effekt per port angiven", value: "Ja, per port" },
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD 3.1 med AVS" },
      { label: "PPS", value: "Ja, 3,3–11 V, 5 A (55 W)" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "100 × 67 × 36 mm" },
      { label: "Vikt", value: "230 g" },
      { label: "Tomgångsförbrukning", value: "≤ 0,3 W" },
    ],
    verdict:
      "Linocell Premium 140 W är laddaren för den stora laptopen och kostar 699 kronor. 140 W är den effekt en MacBook Pro 16 tum vill ha, och den nivån kräver USB PD 3.1 med AVS mellan 15 och 28 volt, vilket den här har. Räknat per watt är den näst billigast i jämförelsen på 5 kronor, alltså hälften av vad de små telefonladdarna kostar per watt. Tre USB-C och en USB-A ger fyra enheter ström, och manualen redovisar hela fördelningen mellan dem: två portar ger 70 W var, medan datorporten sjunker till 100 W så snart en tredje enhet sitter i. Räkna alltså med klart mindre än 140 W till datorn i praktiken. Med 100 millimeters höjd och 230 gram är den för stor för väskans ytterfack och tar plats i ett grenuttag. Köp den om du har en 16-tums laptop och laddar den ensam. Ska flera enheter dela laddaren är Ugreen Nexode 100 W ett säkrare köp för 100 kronor mer.",
  },
  {
    id: "baseus-gan5-pro-65w",
    brand: "Baseus",
    name: "GaN5 Pro 65 W med 100 W-kabel",
    shortName: "Baseus GaN5 Pro",
    image: productImage(USB_C_LADDARE.slug, "baseus-gan5-pro-65w"),
    tagline: "65 W och en 100 W-kabel för 449 kronor.",
    scores: {
      effektdelning: 3,
      prisvarde: 5,
      storlek: 3,
      redovisning: 2.5,
      protokoll: 3,
    },
    price: 449,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Teknikdelar",
    merchantUrl:
      "https://www.teknikdelar.se/produkt/baseus-gan5-pro-65w-snabbladdare-2x-usb-c-plus-1x-usb-a-inkl-100w-usb-c-kabel-svart",
    award: "budget",
    superlative: "Mest effekt per krona med kabeln inräknad",
    pros: [
      "Kabel på 100 W ingår, vilket är 150 till 250 kronor du slipper lägga",
      "Tre portar för 449 kronor, billigast per watt av flerportsladdarna",
      "65 W räcker till de flesta ultrabooks i full fart",
    ],
    cons: [
      "Fördelningen mellan portarna är okänd, så planera inte för två enheter på full fart",
      "Vikt och mått är okända, så den kan visa sig blockera uttaget bredvid",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "65 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "2 × USB-C + 1 × USB-A", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "65 W", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "Ej angiven", highlight: true },
      { label: "Effekt per port angiven", value: "Ej angiven" },
      { label: "Kabel ingår", value: "Ja, 100 W" },
      { label: "USB PD-version", value: "USB PD" },
      { label: "PPS", value: "Ej angiven" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "Ej angiven" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "GTIN", value: "6932172617523" },
    ],
    verdict:
      "Baseus GaN5 Pro 65 W kostar 449 kronor och en USB-C-kabel på 100 W ligger i kartongen. Det gör den till det billigaste sättet att komma i mål i hela jämförelsen: 65 W räcker till en ultrabook i full fart och till snabbladdning av allt mindre än så, och kabeln du annars hade köpt för uppemot 250 kronor är redan betald. Tre portar betyder att telefon, lurar och dator kan sitta i samtidigt. Priset för det låga priset är att du köper delvis i blindo. Hur de 65 watten fördelar sig när två portar används är okänt, liksom vad laddaren väger och hur bred den är, så du får räkna med att datorn tappar fart när telefonen sätts i och att laddaren kan bli i bredaste laget för ett trångt grenuttag. Köp den om budgeten styr och du oftast laddar en sak i taget. Ska två enheter ladda samtidigt och göra det förutsägbart är Ugreen Nexode Pro 65 W värd de 150 kronorna extra.",
  },
  {
    id: "linocell-gan-65w",
    userRating: { value: 4.5, count: 207, checkedAt: PRICE_CHECKED },
    brand: "Linocell",
    name: "GaN USB-C-laddare med PD 65 W",
    shortName: "Linocell GaN 65 W",
    image: productImage(USB_C_LADDARE.slug, "linocell-gan-65w"),
    tagline: "65 W i ett hölje som väger 79 gram.",
    scores: {
      effektdelning: 2,
      prisvarde: 4,
      storlek: 4.5,
      redovisning: 3.5,
      protokoll: 3.5,
    },
    price: 399.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/linocell-gan-usb-c-laddare-med-pd-65-w-p22580",
    superlative: "Bäst för den som bara laddar datorn",
    pros: [
      "79 gram och 36 mm, kompakt för att ge 65 W",
      "6,15 kronor per watt, billigare än de flesta här",
      "PPS ombord, så Samsung-telefoner laddar i sin högsta fart",
    ],
    cons: [
      "En enda port, så telefonen får vänta medan datorn laddar",
      "Kabeln ligger inte i kartongen",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "65 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "1 × USB-C", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "65 W", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "Endast en port" },
      { label: "Effekt per port angiven", value: "Ja" },
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD" },
      { label: "PPS", value: "Ja" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "36 × 36 × 37 mm" },
      { label: "Vikt", value: "79 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Linocell GaN 65 W ger full laptopeffekt ur ett hölje som väger 79 gram och kostar 399,90 kronor. Kuben mäter 36 millimeter på varje sida, vilket betyder att den sitter i ett grenuttag utan att stjäla platsen bredvid, och 65 W räcker till att ladda en ultrabook medan du använder den. Stödet för PPS gör att en Samsung-telefon får sin snabbaste laddning. Räknat per watt kostar den 6,15 kronor, alltså mindre än de flesta i jämförelsen. Begränsningen är att det finns en enda port. Ska telefonen laddas samtidigt som datorn behöver du en laddare till, och då är prisfördelen borta. Köp den om laddaren har ett jobb, att försörja en dator eller en padda, och du redan har en kabel. Ska den räcka till flera prylar tar du Linocell GaN 35 W för hundra kronor mindre eller Ugreen Nexode Pro 65 W för tvåhundra mer.",
  },
  {
    id: "ikea-sjoss-45w",
    userRating: { value: 4.7, count: 339, checkedAt: PRICE_CHECKED },
    brand: "IKEA",
    name: "SJÖSS 45 W USB-laddare med 2 portar",
    shortName: "IKEA SJÖSS 45 W",
    image: productImage(USB_C_LADDARE.slug, "ikea-sjoss-45w"),
    tagline: "Två USB-C-portar och 45 W för 179 kronor.",
    scores: {
      effektdelning: 3,
      prisvarde: 5,
      storlek: 2.5,
      redovisning: 2,
      protokoll: 2.5,
    },
    price: 179,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "IKEA",
    merchantUrl:
      "https://www.ikea.com/se/sv/p/sjoess-45w-usb-laddare-med-2-portar-snabbladdning-80574438/",
    award: "budget",
    superlative: "Billigast per watt",
    pros: [
      "3,98 kronor per watt, klart billigast av laddarna i jämförelsen",
      "Delar effekten jämnt mellan de två portarna",
      "45 W räcker till en lätt laptop och till snabbladdning av alla telefoner",
    ],
    cons: [
      "Vilken port som ger vad framgår inte av märkningen, så du får prova dig fram",
      "Ingen uppgift om PPS, så en Samsung-telefon kanske inte når sin högsta fart",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "45 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "2 × USB-C", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "45 W (3 A)", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "Fördelas jämnt", highlight: true },
      { label: "Effekt per port angiven", value: "Ej angiven" },
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD" },
      { label: "PPS", value: "Ej angiven" },
      { label: "Halvledarteknik", value: "Ej angiven" },
      { label: "Mått", value: "Ej angiven" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "IKEA SJÖSS 45 W kostar 179 kronor och är den billigaste vägen till två USB-C-portar. Räknat per watt landar den på 3,98 kronor, alltså under hälften av vad de flesta laddarna i jämförelsen kostar för samma effekt, och 45 W räcker till att snabbladda vilken telefon som helst och till att hålla en lätt laptop igång. Den delar dessutom effekten jämnt mellan portarna, vilket är ovanligare än det låter: de flesta flerportsladdare låter den första porten ta merparten. Det du betalar med är förutsägbarhet. Märkningen vid portarna säger inte vilken som ger vad, och om laddaren stöder PPS är okänt, så en Samsung-telefon kan hamna på en långsammare laddning än den klarar. Storleken är inte heller publicerad. Köp den om du vill ha en andraladdare till sovrummet eller sommarstugan och priset är det som avgör. Ska laddaren vara den enda du har tar du Linocell GaN 35 W eller Ugreen Nexode Pro 65 W.",
  },
  {
    id: "anker-nano-45w",
    userRating: { value: 5, count: 6, checkedAt: PRICE_CHECKED },
    brand: "Anker",
    name: "Nano Charger 45 W med smart display",
    shortName: "Anker Nano 45 W",
    image: productImage(USB_C_LADDARE.slug, "anker-nano-45w"),
    tagline: "Displayen visar hur många watt din enhet faktiskt drar.",
    scores: {
      effektdelning: 2,
      prisvarde: 2,
      storlek: 4.5,
      redovisning: 4.5,
      protokoll: 4,
    },
    price: 449,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/snabbladdare/anker-nano-charger-45-w-usb-c-laddare-med-smart-display-svart-p26221",
    superlative: "Bäst för den som vill se laddningen",
    pros: [
      "Displayen visar effekt och temperatur i realtid, så du ser om kabeln stryper farten",
      "75 gram och 34 mm, en av de minsta laddarna här",
      "Care Mode sänker laddtemperaturen vid nattladdning",
    ],
    cons: [
      "En enda port till 449 kronor, nästan 10 kronor per watt",
      "Kabeln ligger inte i kartongen",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "45 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "1 × USB-C", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "45 W", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "Endast en port" },
      { label: "Effekt per port angiven", value: "Ja, plus display" },
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "Ja" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "34 × 35,5 × 40 mm" },
      { label: "Vikt", value: "75 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Anker Nano 45 W har en display på sidan som visar hur mycket effekt som går ut just nu, och kostar 449 kronor. Det låter som en gimmick och är det inte: den vanligaste orsaken till att en telefon laddar långsamt är kabeln, och med ett wattal framför ögonen ser du på tre sekunder om problemet sitter i kabeln eller i laddaren. Displayen visar också temperaturen. Care Mode sänker laddtemperaturen när enheten ligger på laddning över natten, vilket skonar batteriet. Med 75 gram och 34 millimeters bredd är den bland de minsta här. Det som drar ned är räkningen: 449 kronor för en enda port blir nästan 10 kronor per watt, och kabeln får du köpa till. Köp den om du felsöker laddning ofta eller har ett gäng kablar av okänd kvalitet hemma. Vill du bara ha watt för pengarna ger Linocell GaN 65 W dig 20 W mer för 50 kronor mindre.",
  },
  {
    id: "samsung-60w-usb-c",
    userRating: { value: 4.5, count: 3, checkedAt: PRICE_CHECKED },
    brand: "Samsung",
    name: "60 W USB-C-laddare EP-T6010",
    shortName: "Samsung 60 W",
    image: productImage(USB_C_LADDARE.slug, "samsung-60w-usb-c"),
    tagline: "Super Fast Charging 2.0 och under 5 mW när ingenting laddas.",
    scores: {
      effektdelning: 2,
      prisvarde: 1.5,
      storlek: 3,
      redovisning: 5,
      protokoll: 5,
    },
    price: 649,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/snabbladdare/samsung-60w-usb-c-laddare-p24971",
    superlative: "Bäst för en Galaxy-telefon",
    pros: [
      "PD 3.1 och PPS mellan 5 och 20 volt, den bredaste protokollstöden här",
      "Drar under 5 mW i vila, alltså under 5 öre om året i tomgång",
      "Super Fast Charging 2.0 tar en Galaxy S26 Ultra till 75 % på cirka 30 minuter",
    ],
    cons: [
      "10,80 kronor per watt, dyrast räknat på effekten av laddarna här",
      "En enda port och ingen kabel i kartongen",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "60 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "1 × USB-C", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "60 W", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "Endast en port" },
      { label: "Effekt per port angiven", value: "Ja, PDO och PPS" },
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD 3.1" },
      { label: "PPS", value: "5–20 V / 3 A" },
      { label: "Halvledarteknik", value: "Ej angiven" },
      { label: "Mått", value: "46 × 85,3 × 28 mm" },
      { label: "Vikt", value: "114,6 g" },
      { label: "Tomgångsförbrukning", value: "Under 5 mW" },
    ],
    verdict:
      "Samsung 60 W är laddaren som är byggd för en Galaxy-telefon och kostar 649 kronor. Den talar PD 3.1 och PPS mellan 5 och 20 volt, vilket är det bredaste protokollstödet bland laddarna i jämförelsen, och Super Fast Charging 2.0 tar en Galaxy S26 Ultra till 75 procent på ungefär en halvtimme. Den drar under 5 milliwatt när ingenting sitter i, alltså några öre om året. Det är ett tal värt att lägga märke till just för att så få laddare har det. Med 114 gram och 85 millimeters längd är den varken liten eller stor. Problemet är priset. 649 kronor för 60 W och en enda port blir 10,80 kronor per watt, dyrast per watt i hela jämförelsen, och kabeln tillkommer. Köp den om du har en Galaxy-telefon och vill ha tillverkarens egen snabbladdning utan frågetecken. Har du något annat märke får du samma effekt för halva pengarna av Linocell GaN 65 W.",
  },
  {
    id: "unisynk-gan-65w",
    userRating: { value: 4.5, count: 49, checkedAt: PRICE_CHECKED },
    brand: "Unisynk",
    name: "GaN-laddare med USB-C 65 W",
    shortName: "Unisynk 65 W",
    image: productImage(USB_C_LADDARE.slug, "unisynk-gan-65w"),
    tagline: "65 W med en två meter lång kabel i kartongen.",
    scores: {
      effektdelning: 2,
      prisvarde: 3.5,
      storlek: 2,
      redovisning: 3,
      protokoll: 4,
    },
    price: 599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/dator/laptop-tillbehor/laptop-laddare/unisynk-gan-laddare-med-usb-c-65-w-p45035",
    superlative: "Bäst när uttaget sitter långt från soffan",
    pros: [
      "Kabel på 2 m följer med, dubbelt så lång som de flesta som säljs lösa",
      "65 W räcker till en ultrabook i full fart",
      "PD 3.0, Quick Charge 3.0 och PPS täcker både Apple och Android",
    ],
    cons: [
      "262 gram, mer än tre gånger den lättaste laddaren här",
      "En enda port, så bara en enhet i taget får ström",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "65 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "1 × USB-C", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "65 W", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "Endast en port" },
      { label: "Effekt per port angiven", value: "Ja" },
      { label: "Kabel ingår", value: "Ja, 2 m" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "Ja" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "80 × 60 × 25 mm" },
      { label: "Vikt", value: "262 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Unisynk 65 W kommer med en två meter lång USB-C-kabel och kostar 599 kronor. Kabellängden är hela poängen: två meter räcker från ett vägguttag bakom soffan till knät, medan de kablar som följer med andra laddare oftast stannar på en meter. Effekten på 65 W laddar en ultrabook i full fart, och stödet för PD 3.0, Quick Charge 3.0 och PPS gör att både iPhone och Android får sin snabbaste laddning. Priset är att laddaren är tung och otymplig: 262 gram är mer än tre gånger vad den lättaste här väger, och 80 millimeters bredd tar plats i ett grenuttag. Med en enda port laddar den dessutom en sak i taget. Köp den om avståndet till uttaget är problemet du löser. Är laddaren tänkt att följa med i väskan är Linocell GaN 65 W en tredjedel så tung och 200 kronor billigare.",
  },
  {
    id: "linocell-pd-20w",
    userRating: { value: 4.5, count: 6171, checkedAt: PRICE_CHECKED },
    brand: "Linocell",
    name: "USB-C-laddare med PD 20 W",
    shortName: "Linocell PD 20 W",
    image: productImage(USB_C_LADDARE.slug, "linocell-pd-20w"),
    tagline: "Laddar en iPhone till 50 procent på en halvtimme.",
    scores: {
      effektdelning: 1.5,
      prisvarde: 2,
      storlek: 4.5,
      redovisning: 3,
      protokoll: 2.5,
    },
    price: 199.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/linocell-usb-c-laddare-med-pd-20-w-vit-p89300",
    superlative: "Bäst som extraladdare vid sängen",
    pros: [
      "32 mm på bredaste kanten, försvinner bakom en nattduksbordslampa",
      "20 W tar en iPhone 13 eller senare till 50 % på 30 minuter",
      "Fungerar som strömkälla till en MagSafe- eller Qi-platta",
    ],
    cons: [
      "20 W laddar ingen laptop, och en padda laddar långsamt",
      "10 kronor per watt, dyrast per watt av de billiga laddarna",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "20 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "1 × USB-C", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "20 W", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "Endast en port" },
      { label: "Effekt per port angiven", value: "Ja, spänningstabell" },
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD" },
      { label: "PPS", value: "Ej angiven" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "32 × 29 × 29 mm" },
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Linocell PD 20 W kostar 199,90 kronor och är gjord för en telefon och ingenting annat. 20 W tar en iPhone 13 eller senare till 50 procent på en halvtimme, vilket är den laddhastighet Apple själva anger som telefonens snabbaste, så mer effekt hade inte gjort någon skillnad för just den enheten. Höljet mäter 32 millimeter och gömmer sig bakom en lampa på nattduksbordet. Den fungerar också som strömkälla till en MagSafe-platta. Gränsen är skarp: 20 W laddar ingen laptop och fyller en padda långsamt, och räknat per watt är den dyr, 10 kronor. Köp den som andra eller tredje laddare där en telefon ska ligga över natten. Ska en laddare räcka till mer än telefonen börjar Linocell GaN 35 W hundra kronor högre upp och löser tre gånger så mycket.",
  },
];

/**
 * Övervägda och bortvalda, var och en med ett skäl som går att kontrollera.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Xtorm",
    name: "100W GaN² Ultra Wall Charger XEC100",
    reason:
      "Vann sin effektklass hos Testaankoop med 105 W uppmätt på en enskild port, alltså mer än märkeffekten. Enda svenska återförsäljaren är Dustin, som handlar mot företag och visar priser exklusive moms: 699 kronor där motsvarar cirka 874 kronor med moms, och artikeln är beställningsvara utan leveransbesked. En jämförelse där elva priser är konsumentpriser och ett är ett företagspris jämför inte längre samma sak.",
    approxPrice: 874,
    merchant: "Dustin",
    merchantUrl: "https://www.dustin.se/product/5020055583/gan2-ultra-snabbladdare-100w",
  },
  {
    brand: "OtterBox",
    name: "USB-C Four Port Wall Charger 100 W",
    reason:
      "Den laddare som gav högst uppmätt effekt i hela Testaankoops fält, 113 W på en port, och fyra portar. Väger 272 gram och är den största och tyngsta de provade. Priset hos Elon ligger på 1 190 kronor, alltså nästan 12 kronor per watt, vilket är dyrare per watt än allt utom Samsung i jämförelsen. Den hade landat i nedre halvan på egna poäng.",
    approxPrice: 1190,
    merchant: "Elon",
    merchantUrl: "https://www.elon.se/otterbox-standard-eu-wall-charger-100w-gan-usb-pd-124014",
  },
  {
    brand: "Apple",
    name: "35 W USB-C-strömadapter med två portar",
    reason:
      "Testaankoop underkände Apple på användbarhet: portarna sitter för tätt för att gå att koppla in bekvämt, och höljet är stort i förhållande till effekten. Till 759 kronor för 35 W blir det 21,70 kronor per watt, alltså dubbelt så dyrt per watt som den dyraste laddaren i rankningen. Med i övervägda för att den ändå är den laddare flest iPhone-ägare får syn på i butik.",
    approxPrice: 759,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-c-laddare/apple-35-w-usb-c-stromadapter-med-tva-portar-p69599",
  },
  {
    brand: "Sudio",
    name: "Brick grenuttag med GaN-laddning 30 W",
    reason:
      "Ett grenuttag med inbyggd GaN-laddning snarare än en väggladdare, och därmed utanför avgränsningen för sidan. Sex färger till 399 kronor styck. Den som vill ha både uttag och USB från samma dosa löser ett annat problem än det den här jämförelsen handlar om.",
    approxPrice: 399,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-c-laddare/sudio-brick-grenuttag-med-gan-laddning-30-w-svart-p67699",
  },
  {
    brand: "Amazon Basics",
    name: "GaN-väggladdare 63 W med 2 portar",
    reason:
      "Testaankoops prisvinnare i 65-wattsklassen med 66 av 100 poäng, och kritiserad i samma test för att vara en av de största laddarna de provade och för att den blockerar uttagen bredvid när den sitter i. Den säljs i Sverige bara via Amazon.se, där priset rör sig från dag till dag och artikeln byter mellan olika säljare, så ett daterat pris skulle vara inaktuellt innan sidan hunnit läsas.",
    merchant: "Amazon.se",
  },
  {
    brand: "Kruidvat",
    name: "World Charger 65 W",
    reason:
      "Fick Beste koop hos Testaankoop med 64 poäng och angav 65 W med 66 W uppmätt, alltså mer än utlovat, plus reseadaptrar för USA, Storbritannien och Nya Zeeland. Kruidvat är en nederländsk och belgisk kedja utan försäljning i Sverige, så den går inte att köpa här.",
  },
];

export const USB_C_LADDARE_PRODUCTS = resolveProducts(USB_C_LADDARE, SEEDS);

export const USB_C_LADDARE_CONSIDERED = CONSIDERED;

/**
 * Frågorna är de som faktiskt ställs i kategorin, och svaren står på egna ben
 * eftersom FAQ-rutan kan visas ensam i ett sökresultat.
 */
export const USB_C_LADDARE_FAQ = [
  {
    question: "Har EU bestämt att alla laddare måste vara USB-C?",
    answer:
      "Nej, och det är tvärtom mot hur saken brukar återges. Direktiv (EU) 2022/2380 ställer krav på apparaten, inte på laddaren. Bilaga Ia listar mobiltelefoner, datorplattor, hörlurar, spelkonsoler, läsplattor, tangentbord, möss och sedan den 28 april 2026 även bärbara datorer, och kravet är att de ska ha ett uttag av USB typ C. En fristående laddare omfattas inte av något av kraven. Det betyder att laddaren är den enda delen av kedjan där inget wattal, ingen protokollmärkning och ingen effektuppgift har kontrollerats av någon myndighet.",
  },
  {
    question: "Vad betyder talet på min telefons förpackning?",
    answer:
      "Sedan direktivet trädde i kraft ska apparatens förpackning bära en etikett med ett tal och bokstaven W, till exempel 30 W. Det är den effekt en laddare minst måste ge för att apparaten ska nå sin högsta laddhastighet. Står det USB PD på etiketten stöder apparaten det protokollet. Vid distansförsäljning ska etiketten visas nära prisuppgiften. Talet är precis det du behöver när du köper laddare, och det sitter alltså på telefonens kartong och inte på laddarens.",
  },
  {
    question: "Räcker det med en 65 W-laddare till min laptop?",
    answer:
      "För en ultrabook, ja. En MacBook Air, en Dell XPS 13 eller motsvarande laddar i full fart på 65 W. En 14-tumsdator vill oftast ha 96 till 100 W, och en 16-tums MacBook Pro 140 W. En svagare laddare skadar ingenting och laddar ändå, men långsammare, och under tung belastning kan datorn tappa batteri trots att den sitter i. Kontrollera talet på datorns egen förpackning eller nätdel innan du väljer.",
  },
  {
    question: "Varför laddar min telefon långsammare när något annat sitter i?",
    answer:
      "Därför att wattalet på kartongen nästan alltid är summan över alla portar, inte vad varje port ger. Testaankoop mätte att den första porten alltid ger mer än den andra, och att den andra porten som mest gav 48 W i hela deras fält på runt fyrtio laddare. En laddare märkt 65 W kan alltså ge 45 W till datorn och 20 W till telefonen när båda sitter i. Leta efter effekten per port och efter vad som händer när två enheter används samtidigt.",
  },
  {
    question: "Spelar kabeln någon roll?",
    answer:
      "Ja, och den är den vanligaste orsaken till att laddningen går långsamt. En vanlig USB-C-kabel utan e-märkning klarar 3 A, alltså omkring 60 W, oavsett hur stark laddaren är. För 100 W och uppåt krävs en e-märkt kabel för 5 A. Kabeln följer sällan med: Testaankoop noterade att den nästan aldrig ingår och att en USB-C-kabel i deras urval kostade i genomsnitt 19,95 euro, vilket är ungefär en fjärdedel av laddarens snittpris ovanpå köpet.",
  },
  {
    question: "Är billiga laddare farliga?",
    answer:
      "Testaankoops provning ger ett tydligt svar för de laddare de undersökte: inga säkerhetsproblem hittades i något exemplar. Samtliga bar CE-märkning, alla hade skydd mot överbelastning och överspänning, och vid överhettning stängde laddarna av sig själva. Uppmätta temperaturer låg mellan 46 och 82 grader utan att säkerhetsgränsen överskreds. Deras egen slutsats var att man inte behöver välja de stora märkena för att köpa tryggt. Det gällde laddare köpta i belgisk detaljhandel, inte namnlösa köp från marknadsplatser utomlands.",
  },
  {
    question: "Vad är GaN och är det värt att betala för?",
    answer:
      "GaN står för galliumnitrid och är materialet i laddarens transistorer, där kisel användes förr. Galliumnitrid tål högre temperatur och spänning och behöver färre komponenter, vilket gör laddaren mindre och svalare vid samma effekt. Skillnaden är verklig: bland laddarna här väger den lättaste 50 gram och den tyngsta 280. Betala för det om laddaren ska följa med i en väska eller samsas i ett trångt grenuttag. Ska den sitta bakom en soffa spelar det mindre roll.",
  },
  {
    question: "Vad är PPS och behöver jag det?",
    answer:
      "PPS låter laddaren finjustera spänningen i små steg medan telefonen laddar, i stället för att hoppa mellan fasta nivåer. Samsung och en del andra Android-tillverkare använder det för sin snabbaste laddning, så en Galaxy-telefon når inte sin fulla hastighet utan det. För en iPhone spelar det ingen roll. Kontrollera vad din telefon stöder innan du betalar extra för funktionen.",
  },
];
