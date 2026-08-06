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
    tagline: "65 W, tre portar och en 100 W-kabel i ett paket på 117 gram.",
    scores: {
      /* effektdelning sänkt 4,5 → 3,0 den 2026-08-06. Betyget var satt på
         "65 W + 30 W samtidigt", vilket är omöjligt: både Kjell och Ugreens
         eget produktblad anger total uteffekt 65 W. De 65 och 30 watten är
         portarnas var för sig-maxima. Fördelningen vid två enheter publiceras
         inte, så laddaren betygsätts som Baseus GaN5 Pro, som är samma klass
         med publicerad fördelning. Se lib/corrections.ts. */
      effektdelning: 3,
      prisvarde: 3.5,
      storlek: 4,
      protokoll: 4,
    },
    price: 599.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/ugreen-nexode-pro-65-w-gan-snabbladdare-med-3-portar-p21297",
    award: "editor",
    superlative: "Bäst treportsladdare för väskan",
    pros: [
      "65 W på USB-C1 räcker till en MacBook Air i full fart",
      "USB-C-kabel på 100 W och 1,5 m ligger i kartongen, värd 150 till 250 kronor",
      "117 gram och 53 mm brett, tar en plats i grenuttaget",
    ],
    cons: [
      "De 65 watten delas mellan portarna, så datorn tappar fart när telefonen sätts i",
      "9,20 kronor per watt, ungefär dubbelt mot den billigaste här",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "65 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "2 × USB-C + 1 × USB-A", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "65 W (USB-C1)", highlight: true },
      /* ⚠️ Stod som "65 W + 30 W" till 2026-08-06 och var fel. Både Kjell och
         Ugreens eget produktblad för SKU X753-25356 anger total uteffekt 65 W,
         alltså kan portarna inte ge 65 och 30 samtidigt. Talen är portarnas
         var för sig-maxima: USB-C1 65 W, USB-C2 30 W, USB-A 22,5 W. Ugreen
         publicerar ingen fördelningstabell för artikeln. Se lib/corrections.ts. */
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "65 W totalt, delat", highlight: true },
      { label: "Kabel ingår", value: "Ja, 100 W 1,5 m" },
      { label: "USB PD-version", value: "USB PD" },
      { label: "PPS", value: "3,3–11 V / 4,5 A" },
      { label: "Halvledarteknik", value: "GaN" },
      /* Mått, vikt och hela effektfördelningen bekräftade mot Ugreens eget
         produktblad för Nexode Pro-serien, SKU X753-25356: 53×40×33 mm, 117 g,
         USB-C1 65 W, USB-C2 30 W, USB-A 22,5 W. Läst 2026-08-06. */
      { label: "Mått", value: "53 × 40 × 33 mm" },
      { label: "Vikt", value: "117 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Ugreen Nexode Pro 65 W är en treportsladdare på 117 gram med en 100 W-kabel i kartongen, och kostar 599,90 kronor. Den är den lättaste laddaren här som både når 65 W och tar tre enheter.\n\n65 W på USB-C1 är precis vad en MacBook Air drar i full fart, och kabeln som följer med hade annars kostat mellan 150 och 250 kronor. Med 53 millimeter på bredden tar den en plats i grenuttaget och lämnar uttaget bredvid ledigt, vilket 100-wattsladdarna i jämförelsen inte gör. PPS mellan 3,3 och 11 volt vid 4,5 ampere ger dessutom en Samsung-telefon dess snabbaste laddning.\n\nDe 65 watten är ett tak för hela laddaren och inte per port. Sätter du i telefonen medan datorn laddar delas de 65 watten mellan portarna, så datorn tappar fart i samma stund. Priset stannar samtidigt på 9,20 kronor per watt, ungefär dubbelt mot den billigaste laddaren här.\n\nSka en laddare täcka dator, telefon och lurar på en resa och du vill slippa packa en kabel till är det här den smidigaste lösningen i jämförelsen. Vet du redan att två enheter ska ladda snabbt samtidigt tar du Ugreen 200 W, som håller 100 W på två portar på en gång.",
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
      /* effektdelning sänkt 4,0 → 2,5 den 2026-08-06. Betyget var satt på att
         totaltappet bara är 5 W. Bruksanvisningen för art. 29970 anger
         fördelningen: 20 W på USB-C1 och 10 W på USB-C2 när båda används,
         alltså tappar huvudporten nästan hälften. IKEA SJÖSS har både högre
         toppeffekt och jämnare delning och står på 3,0, så den här hör under.
         Se lib/corrections.ts. */
      effektdelning: 2.5,
      prisvarde: 3,
      storlek: 5,
      protokoll: 4,
    },
    price: 299.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/linocell-gan-snabbladdare-35-w-pd-med-2-usb-c-portar-vit-p29970",
    superlative: "Bäst för dig som packar lätt",
    pros: [
      "50 gram och 34 mm, minst och lättast av laddarna i jämförelsen",
      "Två USB-C-portar i ett hölje som ryms i en byxficka",
      "PPS upp till 16 volt ger Samsung-telefoner deras snabbaste laddning",
    ],
    cons: [
      "Med två enheter i får den första porten 20 W och den andra 10, så datorn tappar nästan hälften",
      "35 W räcker till en ultrabook som laddar långsamt, inte till en speldator",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "35 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "2 × USB-C", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "35 W", highlight: true },
      /* Fördelningen, PPS-intervallen och tomgången står i bruksanvisningen för
         art. 29970, som Kjells produktsida länkar under Support: USB-C1 20 W och
         USB-C2 10 W när båda används, PPS1 5,0–11,0 V/3 A och PPS2 5,0–16,0 V/2 A,
         tomgång ≤ 0,300 W, verkningsgrad 81,71 % vid låg last. Butikssidans eget
         specifikationsblock har inget av det. Läst 2026-08-06. */
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "20 W + 10 W", highlight: true },
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "5–16 V / 2 A" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "34 × 31 × 31 mm" },
      { label: "Vikt", value: "50 g" },
      { label: "Tomgångsförbrukning", value: "≤ 0,3 W" },
    ],
    verdict:
      "Linocell GaN 35 W väger 50 gram och är den minsta laddaren i jämförelsen. Den kostar 299,90 kronor.\n\nHöljet mäter 34 millimeter på den bredaste kanten, så laddaren försvinner i en byxficka och lämnar alltid uttaget bredvid ledigt. De 35 watten räcker till att snabbladda vilken telefon som helst, och PPS mellan 5 och 16 volt gör att en Samsung-telefon når sin högsta fart. Att två USB-C-portar får plats i ett hölje på 50 gram är det som skiljer den från de enportsladdare som väger lika lite.\n\nDelningen mellan portarna är däremot brant. Med båda i bruk ger första porten 20 W och den andra 10, så telefonen som redan satt i tappar nästan hälften när nästa enhet kopplas in. Räkna med en enhet i taget när du vill ha full fart.\n\nSka laddaren följa med i necessären och prylarna är en telefon, ett par lurar och möjligen en lätt dator är det här rätt köp. Ska den försörja en arbetsdator hemma är Ugreen Nexode Pro 65 W värd de 300 kronorna extra.",
  },
  {
    id: "ugreen-nexode-100w-utdragbar",
    brand: "Ugreen",
    name: "Nexode 100 W GaN med utdragbar USB-C-kabel",
    shortName: "Nexode 100 W",
    image: productImage(USB_C_LADDARE.slug, "ugreen-nexode-100w-utdragbar"),
    tagline: "Kabeln sitter i laddaren och rullas in när du är klar.",
    scores: {
      /* effektdelning sänkt 4,5 → 3,5 den 2026-08-06, samma fel som på Nexode
         Pro 65 W: "100 W + 30 W samtidigt" är omöjligt när Kjell anger total
         uteffekt 100 W. Betygsätts nu som LogiLink PA0281, som också delar
         100 W mellan portarna. Se lib/corrections.ts. */
      effektdelning: 3.5,
      prisvarde: 4,
      storlek: 2,
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
      /* ⚠️ Stod som "100 W + 30 W" till 2026-08-06 och var fel. Kjell anger
         total uteffekt 100 W, så 100 och 30 samtidigt går inte. Talen är
         portarnas var för sig-maxima. Se lib/corrections.ts. */
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "100 W totalt, delat", highlight: true },
      { label: "Kabel ingår", value: "Ja, inbyggd 0,7 m" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "Ja" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "68,6 × 56,8 × 50,4 mm" },
      { label: "Vikt", value: "280 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Ugreen Nexode 100 W har sin USB-C-kabel inbyggd i höljet och kostar 799 kronor. Kabeln dras ut till 0,7 meter och rullas in igen när du är klar.\n\nDet gör laddaren till ett paket du slänger i väskan utan att kontrollera att sladden ligger kvar, och det är hela poängen med den. USB-C1 ger 100 W, alltså nog för en MacBook Pro 14 tum, och med fyra portar totalt försörjer den dator, telefon och padda från ett enda vägguttag. 8 kronor per watt är billigt för den effekten.\n\nStorleken är priset. 280 gram och nästan 7 centimeters bredd gör den till den klumpigaste laddaren i jämförelsen, och den tar två platser i ett grenuttag. Den inbyggda kabeln är dessutom bara 0,7 meter, så uttaget måste sitta nära det du laddar, och de 100 watten är ett tak för hela laddaren: fyller du portarna delas de.\n\nÄr du trött på att leta kabel är valet redan gjort. Ska laddaren sitta permanent bakom ett skrivbord ger LogiLink PA0281 samma 100 W i ett hölje som är 30 millimeter tjockt och 20 kronor billigare.",
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
      protokoll: 4.5,
    },
    price: 1699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/ugreen-kraftfull-multiladdare-6-portar-200-w-p22418",
    award: "winner",
    superlative: "Bäst för skrivbordet med sex prylar",
    pros: [
      "Två portar på 100 W var, så två laptops laddar i full fart samtidigt",
      "200 W totalt räcker till sex enheter utan att någon svälter",
      "Löstagbar nätkabel på 2 m följer med, och går att byta mot en längre",
    ],
    cons: [
      "1 699 kronor är mer än tre av laddarna här kostar tillsammans",
      "517 gram och 10 × 10 cm, alltså en apparat för skrivbordet och inte för väskan",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "200 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "4 × USB-C + 2 × USB-A", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "100 W (C1/C2)", highlight: true },
      /* Till skillnad från de två Ugreen-väggladdarna håller det här talet mot
         märkeffekten: Kjell anger USB-C1 och USB-C2 till 100 W var och total
         uteffekt 200 W, alltså räcker budgeten till båda samtidigt. C3/C4 ger
         65 W var och USB-A 10 W var. Kontrollerat 2026-08-06. */
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "100 W + 100 W", highlight: true },
      { label: "Kabel ingår", value: "Ja, nätkabel 2 m" },
      { label: "USB PD-version", value: "USB PD" },
      { label: "PPS", value: "3,3–21 V" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "101 × 101 × 33 mm" },
      /* Vikten står i Ugreens egen jämförelsetabell för modell 40914 på
         ca.ugreen.com, angiven i pund: 1,14 lb, alltså 517 g. Samma rad anger
         3,97 × 3,97 × 1,27 tum, vilket är 101 × 101 × 32 mm och stämmer med
         Kjells mått för artikeln. Kjell anger ingen vikt. Läst 2026-08-06. */
      { label: "Vikt", value: "517 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Ugreen 200 W är den enda laddaren i jämförelsen som ger två datorer full fart samtidigt, och kostar 1 699 kronor. Den märkeffekten är tre gånger den näst starkaste här.\n\nDe två starkaste portarna håller 100 W var och märkeffekten på 200 W räcker till båda på en gång, alltså två 14-tumsdatorer utan att någon stryps. De två följande USB-C-portarna ger 65 W var, så en padda och en telefon får snabbladdning ovanpå det, och med sex portar totalt ersätter den fyra laddare och ett grenuttag. PPS mellan 3,3 och 21 volt täcker det mesta som säljs, och nätkabeln är löstagbar, så en trasig eller för kort sladd är en 100-kronorsfråga och inte ett nytt köp.\n\nDen väger 517 gram och tar 10 × 10 centimeter på skrivbordet. Det här är en apparat som ställs på en yta och blir kvar där, aldrig något du packar ner.\n\nKöp den om två personer ska kunna ladda varsin dator hemma utan att förhandla om uttagen. Det är det enda den här jämförelsen har som löser det, och 8,50 kronor per watt gör den dessutom billigare räknat på effekt än nio av de tolv andra.",
  },
  {
    id: "logilink-pa0281-100w",
    brand: "LogiLink",
    name: "PA0281 USB-C GaN 100 W med 2 portar",
    shortName: "LogiLink PA0281",
    image: productImage(USB_C_LADDARE.slug, "logilink-pa0281-100w"),
    tagline: "100 W ur 200 gram, nog för en MacBook Pro som laddar medan du jobbar.",
    scores: {
      effektdelning: 3.5,
      prisvarde: 3.5,
      storlek: 3,
      protokoll: 4,
    },
    price: 779,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Estore",
    merchantUrl:
      "https://estore.nu/sv/hem-hobby/34620-usb-laddare-1-x-usb-c-pd-1-x-usb-a-100w-gan.html",
    superlative: "Bäst för en 14-tumsdator",
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
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD, 20 V / 5 A" },
      { label: "PPS", value: "3,3–21 V / 3 A" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "66,8 × 66,8 × 30 mm" },
      { label: "Vikt", value: "200 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "LogiLink PA0281 ger 100 W ur ett hölje som väger 200 gram och kostar 779 kronor. Det är den effekt en MacBook Pro 14 tum vill ha.\n\nHöljet är 30 millimeter tjockt, så laddaren sitter i ett grenuttag utan att bygga ut från väggen på det sätt de flesta 100-wattsladdare gör. PPS mellan 3,3 och 21 volt betyder att både iPhone och Galaxy laddar i sin högsta fart. Den är byggd för drift ner till 10 minusgrader och håller verkningsgradsklass Level VI, alltså en laddare som kan bo i ett ouppvärmt gästhus eller garage över vintern.\n\nDen har en enda USB-C-port, och de två portarna delar dessutom på samma 100 watt. Sitter datorn i får telefonen nöja sig med USB-A och 30 W, och full fart åt båda samtidigt finns inte som alternativ.\n\nLaddar du en kraftfull dator i taget och vill ha marginal i både effekt och kyla räcker den här hela vägen. Ska två moderna enheter ladda snabbt samtidigt tar du Ugreen Nexode 100 W för 20 kronor mer.",
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
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD 3.1 med AVS" },
      { label: "PPS", value: "Ja, 3,3–11 V, 5 A (55 W)" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "100 × 67 × 36 mm" },
      { label: "Vikt", value: "230 g" },
      { label: "Tomgångsförbrukning", value: "≤ 0,3 W" },
    ],
    verdict:
      "Linocell Premium 140 W är den enda laddaren i jämförelsen som når 140 W på en port, alltså effekten en MacBook Pro 16 tum vill ha. Den kostar 699 kronor.\n\nDen nivån kräver USB PD 3.1 med AVS mellan 15 och 28 volt, och det har den. Räknat per watt landar den på 5 kronor, näst billigast här och ungefär hälften av vad de små telefonladdarna kostar per watt. Tre USB-C och en USB-A ger fyra enheter ström samtidigt, och två av portarna håller 70 W var när de används parvis.\n\nDe 140 watten gäller bara när datorn laddar ensam. Så snart en tredje enhet sätts i sjunker datorporten till 100 W, så räkna med klart mindre än märkeffekten i praktiken. Med 100 millimeters höjd och 230 gram är den dessutom för stor för väskans ytterfack och tar plats i ett grenuttag.\n\nHar du en 16-tums laptop och laddar den ensam är det här det billigaste sättet att ge den full fart. Ska flera enheter dela på laddaren är Ugreen Nexode 100 W ett jämnare köp för 100 kronor mer.",
  },
  {
    id: "baseus-gan5-pro-65w",
    brand: "Baseus",
    name: "GaN5 Pro 65 W med 100 W-kabel",
    shortName: "Baseus GaN5 Pro",
    image: productImage(USB_C_LADDARE.slug, "baseus-gan5-pro-65w"),
    tagline: "Laddare och 100 W-kabel i samma kartong, färdigt att använda direkt.",
    scores: {
      effektdelning: 3,
      prisvarde: 5,
      storlek: 3,
      protokoll: 4.5,
    },
    price: 449,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Teknikdelar",
    merchantUrl:
      "https://www.teknikdelar.se/produkt/baseus-gan5-pro-65w-snabbladdare-2x-usb-c-plus-1x-usb-a-inkl-100w-usb-c-kabel-svart",
    award: "budget",
    superlative: "Mest effekt per krona, kabel med",
    pros: [
      "Kabel på 100 W ingår, vilket är 150 till 250 kronor du slipper lägga",
      "Tre portar för 449 kronor, billigast per watt av flerportsladdarna",
      "65 W räcker till de flesta ultrabooks i full fart",
    ],
    cons: [
      "Andra USB-C-porten och USB-A tillsammans ger 15 W att dela på, så portvalet avgör farten",
      "98 millimeter lång och 121 gram, alltså tung nog att hänga snett i ett slitet vägguttag",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "65 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "2 × USB-C + 1 × USB-A", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "65 W", highlight: true },
      /* Fördelningen står i Baseus tekniska data hos två återförsäljare.
         Baltrade (CCGP120202) anger 45 W + 20 W och Megadron, som matchar vår
         GTIN 6932172617523, anger 45 W + 30 W. Det senare summerar till 75 W på
         en laddare märkt 65 W, så 45 + 20 är det tal som håller ihop. Läst
         2026-08-06, se .agent/research/usb-c-laddare.md. */
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "45 W + 20 W", highlight: true },
      { label: "Kabel ingår", value: "Ja, 100 W" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "Ja" },
      { label: "Halvledarteknik", value: "GaN" },
      /* Mått och vikt: Megadron på vår GTIN, 98 × 36,3 × 32 mm och 120,8 g,
         bekräftat av Baltrade. Baseus egen EU-sida anger 107 × 36 × 32 mm för
         syskonartikeln CCGP120201. Läst 2026-08-06. */
      { label: "Mått", value: "98 × 36 × 32 mm" },
      { label: "Vikt", value: "121 g" },
      { label: "GTIN", value: "6932172617523" },
    ],
    verdict:
      "Baseus GaN5 Pro 65 W kostar 449 kronor, och en USB-C-kabel på 100 watt ligger i kartongen. Kabeln du annars hade köpt separat för uppemot 250 kronor är alltså redan betald, och det gör den här till det billigaste sättet att komma i mål i hela jämförelsen.\n\nDe 65 watten räcker till en ultrabook i full fart, och de håller när du fyller portarna: datorn behåller 45 W när telefonen sätts i den andra USB-C-porten, som får 20 W. Tre portar betyder att dator, telefon och lurar kan sitta i samtidigt, och laddaren talar både PPS och Quick Charge, så en Samsung-telefon når sin högsta fart i stället för att nöja sig med ström.\n\nPortvalet är däremot inte likgiltigt. Andra USB-C-porten tillsammans med USB-A ger 15 watt att dela på, alltså långsammare än telefonladdaren du redan har, medan samma två enheter i första USB-C och USB-A får 45 respektive 18. Med 98 millimeter och 121 gram är den dessutom bland de längre att hänga i ett vägguttag.\n\nKöp den om budgeten styr och du vill ha laddare och kabel i samma köp. Ska du kunna sätta i vad som helst var som helst utan att tänka efter är Ugreen Nexode Pro 65 W värd de 150 kronorna extra.",
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
      /* protokoll höjt 3,5 → 4,5 den 2026-08-06. Betyget var satt när PPS bara
         stod som "Ja". Bruksanvisningen för art. 22580 anger PPS2 till
         5,0–21,0 V/3 A, och Kjells produktsida anger PD 3.2, QC 3.0 och AVS.
         Se lib/corrections.ts. */
      protokoll: 4.5,
    },
    price: 399.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/linocell-gan-usb-c-laddare-med-pd-65-w-p22580",
    superlative: "Bäst enportsladdare för pengarna",
    pros: [
      "79 gram och 36 mm, kompakt för att ge 65 W",
      "6,15 kronor per watt, billigare än de flesta här",
      "PPS mellan 5 och 21 volt, det bredaste spannet bland enportsladdarna här",
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
      { label: "Kabel ingår", value: "Nej" },
      /* PD-versionen och AVS står i Kjells egen punktlista på produktsidan;
         bruksanvisningen för art. 22580 anger ingen version alls. PPS-spannen,
         verkningsgraden och tomgången står i manualen, som är inskannad och
         måste läsas som bild: PPS1 5,0–11,0 V/3 A, PPS2 5,0–21,0 V/3 A,
         verkningsgrad ≥ 88,0 %, tomgång ≤ 0,21 W. Måttet 36 × 36 × 37 mm är
         Kjells, utan stickpropp; manualen anger 73 mm med. Läst 2026-08-06. */
      { label: "USB PD-version", value: "USB PD 3.2 med AVS" },
      { label: "PPS", value: "5–21 V / 3 A" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "36 × 36 × 37 mm" },
      { label: "Vikt", value: "79 g" },
      { label: "Tomgångsförbrukning", value: "≤ 0,21 W" },
    ],
    verdict:
      "Linocell GaN 65 W ger full laptopeffekt ur ett hölje som väger 79 gram, och kostar 399,90 kronor. Räknat per watt är det 6,15 kronor, alltså mindre än de flesta laddarna här.\n\nKuben mäter 36 millimeter på varje sida, så den sitter i ett grenuttag utan att stjäla platsen bredvid, och 65 W räcker till att ladda en ultrabook medan du använder den. PPS mellan 5 och 21 volt är det bredaste spannet bland enportsladdarna i jämförelsen, vilket betyder att en Galaxy eller en annan Android-telefon når sin högsta fart och inte bara får ström.\n\nDen har en enda port. Ska telefonen laddas samtidigt som datorn behöver du en laddare till, och då är prisfördelen borta. Någon kabel ligger inte i kartongen heller.\n\nHar du redan en kabel och en enda pryl att ladda är det här den billigaste vägen till 65 W. Ska laddaren räcka till flera prylar samtidigt börjar Ugreen Nexode Pro 65 W 200 kronor högre upp och löser det utan kompromiss.",
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
      protokoll: 4,
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
      "Två enheter i samtidigt ger 22 W var, vilket räcker till telefoner men inte till en laptop under arbete",
      "Ingen kabel i kartongen, så lägg till en hundralapp om du inte har en USB-C-kabel över",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "45 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "2 × USB-C", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "45 W (3 A)", highlight: true },
      /* Hela tabellen står i IKEA:s egen bruksanvisning, AA-2416216-7-2, som
         produktsidan länkar: en port i bruk 45,0 W, två portar 22,0 W per port.
         Samma dokument ger PPS-intervallen, verkningsgraden och tomgången.
         Läst 2026-08-06, se .agent/research/usb-c-laddare.md. */
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "22 W + 22 W", highlight: true },
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "Ja, 5–16 V" },
      { label: "Halvledarteknik", value: "Ej angiven" },
      { label: "Mått", value: "90 × 55 × 32 mm" },
      /* Vikten står kvar som streck med flit. IKEA anger 0,13 kg under
         rubriken Förpackning, alltså laddaren i kartong, och bruksanvisningens
         tekniska data tar inte upp vikt alls. Att skriva 130 g som produktvikt
         vore att publicera ett emballagetal som produktens. */
      { label: "Vikt", value: "Ej angiven" },
      { label: "Tomgångsförbrukning", value: "< 0,075 W" },
    ],
    verdict:
      "IKEA SJÖSS 45 W kostar 179 kronor och är den billigaste vägen till två USB-C-portar i hela jämförelsen. Räknat per watt landar den på 3,98 kronor, alltså under hälften av vad de flesta laddarna här kostar för samma effekt.\n\n45 W räcker till att snabbladda vilken telefon som helst och till att hålla en lätt laptop igång, och PPS mellan 5 och 16 volt gör att en Samsung-telefon når sin högsta fart i stället för att nöja sig med ström. Den delar dessutom effekten jämnt: 22 watt till vardera porten när båda används, medan de flesta flerportsladdare låter den första porten ta merparten och svälter den andra. Vilken av de två portarna du väljer spelar alltså ingen roll.\n\nTaket är samtidigt golvet. 22 watt per port räcker till telefoner och plattor, men inte till att ladda en laptop medan du använder den, så den här hör hemma på nattduksbordet snarare än på skrivbordet. Någon kabel ligger inte i kartongen heller, vilket lägger en hundralapp till priset om du inte har en USB-C-kabel över.\n\nKöp den om du vill ha en andraladdare till sovrummet eller sommarstugan och priset är det som avgör. Ska den vara den enda laddaren du har, och ska datorn ladda medan du arbetar, tar du Linocell GaN 35 W eller Ugreen Nexode Pro 65 W.",
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
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "Ja" },
      { label: "Halvledarteknik", value: "GaN" },
      /* Mått, vikt och GaN bekräftade mot Ankers egen produktsida för A121D,
         34 × 35,5 × 40 mm och 75 g. Samma sida publicerar ingen tomgång.
         Läst 2026-08-06. */
      { label: "Mått", value: "34 × 35,5 × 40 mm" },
      { label: "Vikt", value: "75 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Anker Nano 45 W har en display på sidan som visar hur många watt som går ut just nu. Den kostar 449 kronor.\n\nDen vanligaste orsaken till att en telefon laddar långsamt sitter i kabeln, och med ett wattal framför ögonen ser du på tre sekunder om problemet är sladden eller laddaren. Displayen visar temperaturen också. Care Mode sänker laddtemperaturen när enheten ligger på laddning över natten, vilket skonar batteriet i telefonen du sover bredvid. Med 75 gram och 34 millimeters bredd är den samtidigt bland de minsta laddarna här.\n\nRäkningen är det som drar ned. 449 kronor för en enda port blir nästan 10 kronor per watt, och kabeln får du köpa till.\n\nFelsöker du laddning ofta, eller har du ett gäng kablar av okänd kvalitet hemma, betalar displayen igen sig första kvällen. Vill du bara ha watt för pengarna ger Linocell GaN 65 W dig 20 W mer för 50 kronor mindre.",
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
      { label: "Kabel ingår", value: "Nej" },
      { label: "USB PD-version", value: "USB PD 3.1" },
      { label: "PPS", value: "5–20 V / 3 A" },
      { label: "Halvledarteknik", value: "Ej angiven" },
      { label: "Mått", value: "46 × 85,3 × 28 mm" },
      { label: "Vikt", value: "114,6 g" },
      { label: "Tomgångsförbrukning", value: "Under 5 mW" },
    ],
    verdict:
      "Samsung 60 W är byggd för en Galaxy-telefon och kostar 649 kronor. Super Fast Charging 2.0 tar en Galaxy S26 Ultra till 75 procent på ungefär en halvtimme.\n\nDen talar PD 3.1 och PPS mellan 5 och 20 volt, det bredaste protokollstödet bland laddarna i jämförelsen, så den ger full fart även åt telefoner och plattor av andra märken. Den drar under 5 milliwatt när ingenting sitter i, alltså 60 gånger mindre i vila än de laddare här som ligger högst, och det märks på en laddare som sitter kvar i uttaget året om. Med 114 gram och 85 millimeters längd är den varken liten eller stor.\n\nPriset är problemet. 649 kronor för 60 W och en enda port blir 10,80 kronor per watt, dyrast per watt i hela jämförelsen, och kabeln tillkommer.\n\nHar du en Galaxy och vill ha tillverkarens egen snabbladdning utan frågetecken är det den kostnaden du betalar för säkerheten. Har du något annat märke ger Linocell GaN 65 W dig mer effekt för 250 kronor mindre.",
  },
  {
    id: "unisynk-gan-65w",
    userRating: { value: 4.5, count: 49, checkedAt: PRICE_CHECKED },
    brand: "Unisynk",
    name: "GaN-laddare med USB-C 65 W",
    shortName: "Unisynk 65 W",
    image: productImage(USB_C_LADDARE.slug, "unisynk-gan-65w"),
    tagline: "Tre meter från vägguttaget till datorn, utan förlängningssladd.",
    scores: {
      effektdelning: 2,
      prisvarde: 3.5,
      /* storlek höjt 2,0 → 2,5 den 2026-08-06. Betyget var satt på att 80 mm
         bredd tar plats i ett grenuttag. Laddaren sitter inte i uttaget: den är
         ett nätaggregat med 1 m nätkabel, så den blockerar aldrig grannuttaget.
         Vikten på 262 g står kvar som skäl att inte gå högre. Se
         lib/corrections.ts. */
      storlek: 2.5,
      protokoll: 4,
    },
    price: 599,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/dator/laptop-tillbehor/laptop-laddare/unisynk-gan-laddare-med-usb-c-65-w-p45035",
    superlative: "Bäst när uttaget sitter långt bort",
    pros: [
      "1 m nätkabel plus 2 m fast USB-C-kabel ger 3 meters räckvidd från uttaget",
      "Sitter inte i vägguttaget, så den blockerar aldrig uttaget bredvid",
      "5 års garanti från Unisynk, alltså längre än konsumentköplagens reklamationsrätt",
    ],
    cons: [
      "262 gram, mer än tre gånger den lättaste laddaren här",
      "USB-C-kabeln är fast monterad, så en trasig kabel är en trasig laddare",
    ],
    specs: [
      { label: "Total märkeffekt", shortLabel: "Effekt", value: "65 W", highlight: true },
      { label: "Portuppsättning", shortLabel: "Portar", value: "1 × USB-C", highlight: true },
      { label: "Max effekt en port", shortLabel: "Max/port", value: "65 W", highlight: true },
      { label: "Effekt vid två portar", shortLabel: "Delat", value: "Endast en port" },
      /* Kartongens innehåll står ordagrant på Unisynks egen produktsida för
         art. 10420: "1x USB-C laptopladdare 65W med 2m integrerad USB-C-kabel,
         1x 1m AC kabel". Kjell anger bara "Kabellängd: 2 meter", och Icecat
         anger 3 m, alltså summan av båda. Samma sida ger 5 års garanti och
         MTBF 100 000 h. Läst 2026-08-06. */
      { label: "Kabel ingår", value: "Ja, 2 m USB-C + 1 m nätkabel" },
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "Ja" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "80 × 60 × 25 mm" },
      { label: "Vikt", value: "262 g" },
      { label: "Tomgångsförbrukning", value: "Ej angiven" },
    ],
    verdict:
      "Unisynk 65 W är ett nätaggregat med sladd i båda ändar och kostar 599 kronor. Nätkabeln är 1 meter och USB-C-kabeln 2, alltså 3 meter mellan vägguttaget och datorn.\n\nDet löser problemet som uppstår när närmaste uttag sitter bakom en soffa eller under ett skrivbord, och det gör den utan förlängningssladd. Eftersom laddaren hänger på en sladd i stället för att sitta i uttaget blockerar den heller aldrig platsen bredvid i ett grenuttag. De 65 watten laddar en ultrabook i full fart, och stödet för PD 3.0, Quick Charge 3.0 och PPS täcker både iPhone och Android. Unisynk lämnar dessutom 5 års garanti, alltså två år längre än reklamationsrätten.\n\nDen väger 262 gram, mer än tre gånger den lättaste här, och USB-C-kabeln sitter fast i höljet. Slits kontakten ut är hela laddaren förbrukad, och med en enda port laddar den dessutom en sak i taget.\n\nÄr avståndet till uttaget problemet du löser finns det ingen annan laddare här som gör det ur kartongen. Ska laddaren följa med i väskan väger Linocell GaN 65 W en tredjedel så mycket och kostar 200 kronor mindre.",
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
      /* protokoll höjt 2,5 → 3,5 den 2026-08-06. Betyget var satt när PPS stod
         som ej angiven. Bruksanvisningen för art. 89300 anger PPS1
         3,3–5,9 V/3 A och PPS2 3,3–11,0 V/1,8 A. Se lib/corrections.ts. */
      protokoll: 3.5,
    },
    price: 199.9,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/mobilt/mobilladdare/usb-laddare/linocell-usb-c-laddare-med-pd-20-w-vit-p89300",
    superlative: "Bäst som extraladdare vid sängen",
    pros: [
      "32 mm och 55 gram, försvinner bakom en nattduksbordslampa",
      "20 W tar en iPhone 13 eller senare till 50 % på 30 minuter",
      "Högst 0,10 W i vila, alltså under en kilowattimme om året i uttaget",
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
      { label: "Kabel ingår", value: "Nej" },
      /* Fyra rader stod tomma till 2026-08-06. Samtliga står i bruksanvisningen
         för art. 89300 och 89303, som Kjells produktsida länkar under Support:
         PD 3.0, PPS1 3,3–5,9 V/3 A, PPS2 3,3–11,0 V/1,8 A, vikt 55 g,
         verkningsgrad ≥ 85,48 % och tomgång ≤ 0,10 W. Måttet 32 × 29 × 29 mm är
         Kjells, utan stickpropp; manualen anger 69 mm med. */
      { label: "USB PD-version", value: "USB PD 3.0" },
      { label: "PPS", value: "3,3–11 V" },
      { label: "Halvledarteknik", value: "GaN" },
      { label: "Mått", value: "32 × 29 × 29 mm" },
      { label: "Vikt", value: "55 g" },
      { label: "Tomgångsförbrukning", value: "≤ 0,10 W" },
    ],
    verdict:
      "Linocell PD 20 W är gjord för en telefon och ingenting annat, och kostar 199,90 kronor. 20 W tar en iPhone 13 eller senare till 50 procent på en halvtimme.\n\nDet är den laddhastighet Apple själva anger som telefonens snabbaste, så mer effekt hade inte gjort någon skillnad för just den enheten. Höljet mäter 32 millimeter och väger 55 gram, alltså tillräckligt litet för att gömma sig bakom en lampa på nattduksbordet, och den fungerar lika bra som strömkälla till en MagSafe-platta. I vila drar den högst 0,10 watt, vilket blir under en kilowattimme på ett år för en laddare som får sitta kvar dygnet runt.\n\nGränsen är skarp. 20 W laddar ingen laptop och fyller en padda långsamt, och räknat per watt är den dyr, 10 kronor.\n\nSom andra eller tredje laddare, där en telefon ska ligga över natten, gör den precis vad den ska. Ska en laddare räcka till mer än telefonen börjar Linocell GaN 35 W hundra kronor högre upp och löser tre gånger så mycket.",
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
