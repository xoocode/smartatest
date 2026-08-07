import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { WIFI_REPEATER } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Real products for /wifi-repeater.
 *
 * Tionde sidan i gruppen Elektronik, byggd 2026-08-07. Sidan rankar enheter
 * som förlänger den router du redan har, 301 till 1 590 kronor. Mesh-set på
 * flera enheter ersätter routern och ligger bland övervägda efter
 * användarbeslut, tillsammans med powerline.
 *
 * Priser, artikelnummer, GTIN, lagerstatus och kundbetyg är lästa i
 * produktsidans egen JSON-LD hos butiken på PRICE_CHECKED. Specifikationerna
 * är lästa hos **tillverkaren**: TP-Links tolv egna specifikationstabeller på
 * tp-link.com, Mercusys datablad för ME80X, D-Links datablad för DAP-X1860 och
 * bruksanvisning för DAP-1620, samt Asus egen tekniska specifikation för
 * RP-BE58. Garantitiderna är lästa i TP-Link Nordics, Mercusys Nordics och
 * D-Links egna villkor.
 *
 * AFFILIATE-SWAP — `merchantUrl` är butikens egen produktsida. Inget
 * `affiliateUrl` någonstans; vi har inget program i kategorin ännu. Se
 * lib/links.ts för vad LINK_MODE står på i dag.
 *
 * ## Talet i modellnamnet är två band ihopräknade
 *
 * AC1750 på RE450 är 1 300 Mbit/s på 5 GHz plus 450 på 2,4 GHz. AX3000 på
 * ME80X är 2 402 plus 574. En klient sitter på ett band i taget, så ingen
 * apparat i huset ser någonsin det sammanräknade talet. F.A.Z. Kaufkompass
 * mätte RE450 till 340 Mbit/s netto över den trådlösa vägen.
 *
 * Därför står banden som två specrader och betygsätts av två kriterier.
 * `AC/AX/BE-klass` finns kvar som omarkerad rad, eftersom det är ordet
 * kartongen och butiken använder och läsaren söker på.
 *
 * ## Nätverksuttaget är sidans fynd
 *
 * F.A.Z. mäter varje repeater två gånger per sträcka: en klient i sladd,
 * alltså ett trådlöst hopp, och en klient trådlöst, alltså två. Med
 * gigabituttag ligger sladden ungefär dubbelt så högt — 690 mot 340 Mbit/s på
 * RE450, 775 mot 360 på RE505X. Men på de sex av deras trettiotvå som har ett
 * 100-megabitsuttag mätte de **95 Mbit/s i sladden mot 245 i luften**.
 *
 * Fältet här delar sig i fyra klasser: 2,5 gigabit på två, gigabit på åtta,
 * 10/100 på en och inget uttag alls på två.
 *
 * ## Fyra av tretton har ett uppmätt värde
 *
 * RE450, RE505X, RE650 och RE300 finns i F.A.Z:s tabell under exakt det namn
 * de säljs under här. `Uppmätt förbrukning` och genomströmningstalen i
 * omdömena kommer därifrån och är **omarkerade** i specarna, eftersom fyra av
 * tretton är för få för en jämförelserad. Se varningen i check:tackning.
 *
 * ⚠️ **RE305 och RE330 är inte samma produkt, och DAP-1620 är inte DAP-1610.**
 * Båda paren är AC1200-klassade och båda de provade syskonen finns i F.A.Z:s
 * tabell. Talen får inte flyttas. Samma fälla som Nanoleaf Lines mot
 * Essentials på /smart-belysning.
 *
 * ## Två produkter landar på samma betyg med flit
 *
 * RE605X och RE505X får båda 6,8, och de viktade summorna är exakt lika. Det
 * är ingen avrundningsartefakt av det slag lib/products.ts varnar för: RE605X
 * har dubbla hastigheten på 2,4 GHz och kostar 34 kronor mindre, RE505X har
 * EasyMesh mot RE605X:s märkesbundna OneMesh. Kriterierna tar ut varandra.
 *
 * ## Vad ingen har gjort
 *
 * Vi har inte kopplat in en enda repeater. F.A.Z. Kaufkompass har mätt 39 med
 * öppen metod och fritt läsbar tabell, och deras tal påverkar inte en enda
 * poäng här.
 */

export const PRICE_CHECKED = "2026-08-07";

const SEEDS: ProductSeed[] = [
  {
    id: "tp-link-re235be",
    brand: "TP-Link",
    name: "RE235BE Wi-Fi 7-repeater",
    shortName: "TP-Link RE235BE",
    image: productImage(WIFI_REPEATER.slug, "tp-link-re235be"),
    tagline: "Nätverksuttaget tar 2,5 gigabit, mer än fibern hem till huset bär.",
    scores: {
      /* 2 882 Mbit/s på 5 GHz enligt TP-Links egen tabell, Wi-Fi 7 med två
         strömmar på 160 MHz. Bara RE405BE ligger högre. */
      hastighet: 4.5,
      /* 1× 2,5 Gbps enligt tillverkarens tabell. Högsta klassen här. */
      natverksuttag: 5,
      /* EasyMesh-Compatible, alltså Wi-Fi Alliances standard och inte ett
         märkesbundet system. */
      mesh: 4.5,
      /* 688 Mbit/s, Wi-Fi 7 även på 2,4 GHz. */
      band24: 4.5,
      /* 899 kr för fältets snabbaste uttag och näst snabbaste radio. */
      prisvarde: 4.5,
    },
    price: 899,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 24, scale: 5, checkedAt: PRICE_CHECKED },
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/natverk/wifi-forstarkare/repeater-for-tradlost-natverk/tp-link-re235be-wifi-7-repeater-be3600-p66394",
    award: "winner",
    superlative: "Bäst för fiber över 500 Mbit/s",
    pros: [
      "Nätverksuttaget tar 2,5 gigabit, så en tv eller stationär dator i sladd aldrig bromsas av repeatern",
      "2 882 Mbit/s på 5 GHz, vilket räcker till en fiberuppkoppling på 1 000",
      "688 Mbit/s på 2,4 GHz, mer än dubbelt mot vad de fyra billigaste här når på samma band",
      "EasyMesh håller ihop nätverket till ett namn även med en router av annat märke",
      "Tre års garanti",
    ],
    cons: [
      "158 millimeter hög, så den lägger sig över det andra uttaget i en dubbeldosa",
      "15 watt som mest, det högsta talet här på en apparat som sitter i året om",
      "Wi-Fi 7 mot din dator kräver att datorn också talar det, annars faller farten till vad den klarar",
    ],
    specs: [
      { label: "Pris", value: "899 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 7", highlight: true },
      { label: "AC/AX/BE-klass", value: "BE3600" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "2 882 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "688 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "2,5 Gbit", highlight: true },
      { label: "Mesh", value: "EasyMesh", highlight: true },
      { label: "Antenner", value: "2 externa" },
      { label: "Driftlägen", value: "Repeater, accesspunkt" },
      { label: "Effekt", value: "15 W max" },
      { label: "Yttermått", value: "97 × 46 × 158 mm" },
      { label: "Garanti", value: "3 år", highlight: true },
    ],
    verdict:
      "TP-Link RE235BE kostar 899 kronor och har det snabbaste nätverksuttaget här. Den talar Wi-Fi 7 på båda banden och tar 2,5 gigabit i sladden, där åtta av de andra stannar på en.\n\nUttaget avgör mer än folk tror. Sitter tv:n eller den stationära datorn i kabel behöver signalen bara ta ett trådlöst hopp från routern, och F.A.Z. Kaufkompass har mätt att den vägen ger ungefär dubbla hastigheten mot en trådlöst ansluten apparat. Med 2,5 gigabit i uttaget når repeatern aldrig taket, vad du än har för abonnemang.\n\n**Trådlöst går den 2 882 Mbit/s på 5 GHz och 688 på 2,4.** Det andra talet är det som orkar genom en betongvägg och ner i källaren, och det är mer än dubbelt mot de fyra billigaste här. EasyMesh gör dessutom att telefonen byter över av sig själv när du går genom huset, också om routern kommer från en annan tillverkare.\n\nDen är 158 millimeter hög och lägger sig över det andra uttaget i en dubbeldosa, så mät bakom soffan innan du beställer. Köp den om du har fiber och vill att både luften och sladden ska hänga med. Det är den bästa repeatern du kan sätta i väggen för under tusenlappen.",
  },
  {
    id: "tp-link-re405be",
    brand: "TP-Link",
    name: "RE405BE Wi-Fi 7-repeater",
    shortName: "TP-Link RE405BE",
    image: productImage(WIFI_REPEATER.slug, "tp-link-re405be"),
    tagline: "5 764 Mbit/s på 5 GHz, dubbelt mot vad någon annan här klarar.",
    scores: {
      /* 5 764 Mbit/s, Wi-Fi 7 med fyra strömmar på 320 MHz kanalbredd.
         Nästan dubbelt mot RE235BE och RP-BE58 på 2 882. */
      hastighet: 5,
      /* 1× 2,5 Gbps. */
      natverksuttag: 5,
      /* EasyMesh-Compatible. */
      mesh: 4.5,
      /* 688 Mbit/s, samma som RE235BE. */
      band24: 4.5,
      /* 1 590 kr, dyrast här. Radion är också snabbast, men 5 764 Mbit/s
         kräver en Wi-Fi 7-router med 320 MHz för att komma till användning. */
      prisvarde: 3,
    },
    price: 1590,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/natverk/wifi-forstarkare/repeater-for-tradlost-natverk/tp-link-re405be-wi-fi-7-repeater-be6500-be6500-p60998",
    award: "premium",
    superlative: "Bäst när hela våningen streamar",
    pros: [
      "5 764 Mbit/s på 5 GHz, den snabbaste radion här och nästan dubbelt mot tvåan",
      "Fyra externa antenner, som ger fyra strömmar mot en router som också kör fyra",
      "2,5-gigabitsuttag, så en dator i sladd får hela farten",
      "EasyMesh, alltså ett enda nätverksnamn också mot en router av annat märke",
      "Tre års garanti",
    ],
    cons: [
      "1 590 kronor, dyrast här och 691 kronor över vinnaren som har samma uttag",
      "De fyra strömmarna gör ingenting mot en telefon eller dator som kör två, vilket de flesta gör",
      "Toppfarten kräver en router som klarar 320 megahertz kanalbredd, alltså Wi-Fi 7 i båda ändar",
    ],
    specs: [
      { label: "Pris", value: "1 590 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 7", highlight: true },
      { label: "AC/AX/BE-klass", value: "BE6500" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "5 764 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "688 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "2,5 Gbit", highlight: true },
      { label: "Mesh", value: "EasyMesh", highlight: true },
      { label: "Antenner", value: "4 externa" },
      { label: "Driftlägen", value: "Repeater, accesspunkt" },
      { label: "Effekt", value: "15 W max" },
      { label: "Garanti", value: "3 år", highlight: true },
    ],
    verdict:
      "TP-Link RE405BE är den snabbaste repeatern här och kostar 1 590 kronor. Radion går 5 764 Mbit/s på 5 GHz, nästan dubbelt mot de två som kommer närmast.\n\nTalet kommer från fyra strömmar och 320 megahertz kanalbredd, vilket är det bredaste Wi-Fi 7 tillåter. **Det förutsätter en router i andra änden som klarar samma sak.** Har du en Wi-Fi 6-router kopplar RE405BE upp sig mot den på Wi-Fi 6-villkor, och då gör de fyra antennerna och den breda kanalen ingen skillnad du kan mäta.\n\nUttaget tar 2,5 gigabit och EasyMesh gör att huset får ett enda nätverksnamn, så telefonen byter över av sig själv på väg upp för trappan. Det gäller också om routern är av annat märke, vilket den brukar vara när operatören levererat den.\n\nKöp den om du redan bytt till en Wi-Fi 7-router och vill att repeatern ska hålla samma takt hela vägen. Sitter det en Wi-Fi 5- eller Wi-Fi 6-router i hallen gör RE235BE samma jobb för 691 kronor mindre.",
  },
  {
    id: "mercusys-me80x",
    brand: "Mercusys",
    name: "ME80X AX3000",
    shortName: "Mercusys ME80X",
    image: productImage(WIFI_REPEATER.slug, "mercusys-me80x"),
    tagline: "2 402 Mbit/s och gigabituttag för 599 kronor.",
    scores: {
      /* 2 402 Mbit/s på 5 GHz, Wi-Fi 6 med två strömmar på 160 MHz enligt
         Mercusys eget datablad. Snabbare än allt annat under tusenlappen. */
      hastighet: 4,
      /* 1 Gigabit Ethernet Port. */
      natverksuttag: 4,
      /* EasyMesh, men Mercusys skriver själva i databladet att produkten inte
         är certifierad av Wi-Fi Alliance. Därav 4,0 och inte 4,5. */
      mesh: 4,
      /* 574 Mbit/s, Wi-Fi 6 på 2,4 GHz. */
      band24: 4,
      /* 599 kr för 2 402 Mbit/s och gigabituttag. Bästa krona per Mbit/s här
         med god marginal. */
      prisvarde: 5,
    },
    price: 599,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 30, scale: 5, checkedAt: PRICE_CHECKED },
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/natverk/wifi-forstarkare/repeater-for-tradlost-natverk/mercusys-me80x-wifi-6-repeater-ax3000-p66181",
    award: "budget",
    superlative: "Bäst wifi 6 för under 600 kronor",
    pros: [
      "2 402 Mbit/s på 5 GHz för 599 kronor, snabbare än repeatrar som kostar dubbelt",
      "Gigabituttag, så en tv i sladd får ungefär dubbla farten mot trådlöst",
      "574 Mbit/s på 2,4 GHz, vilket bär både strömmad film och husets sensorer",
      "Två externa antenner som går att vinkla mot rummet du vill nå",
      "Tre års garanti, samma som TP-Link ger",
    ],
    cons: [
      "Mercusys anger själva att EasyMesh-stödet saknar certifiering, så en router av annat märke kan strula",
      "13 watt som mest, högre än de flesta här",
      "138 millimeter bred, så den tar plats i en dubbeldosa",
    ],
    specs: [
      { label: "Pris", value: "599 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 6", highlight: true },
      { label: "AC/AX/BE-klass", value: "AX3000" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "2 402 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "574 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "Gigabit", highlight: true },
      { label: "Mesh", value: "EasyMesh, ocertifierad", highlight: true },
      { label: "Antenner", value: "2 externa" },
      { label: "Driftlägen", value: "Repeater, accesspunkt" },
      { label: "Effekt", value: "13 W" },
      { label: "Yttermått", value: "138,6 × 100,3 × 68,4 mm" },
      { label: "Garanti", value: "3 år", highlight: true },
    ],
    verdict:
      "Mercusys ME80X kostar 599 kronor och går 2 402 Mbit/s på 5 GHz. Det är samma radioklass som repeatrar för det dubbla, och Mercusys är TP-Links budgetmärke.\n\n**För pengarna får du fältets bästa förhållande mellan fart och pris.** 2 402 Mbit/s kommer från två strömmar på 160 megahertz kanalbredd, alltså den breda kanalen Wi-Fi 6 tillåter, och 574 Mbit/s på 2,4 GHz räcker till både strömmad film och de termostater och vattenlarm som bara talar det bandet. Gigabituttaget gör att en tv i sladd får ungefär dubbla hastigheten mot en trådlös apparat i samma rum.\n\nMercusys skriver själva att EasyMesh-stödet inte är certifierat av Wi-Fi Alliance. Praktiskt betyder det att sammanslagningen till ett nätverksnamn kan haka upp sig mot en router av annat märke, och att du då får ett andra nätverk att välja mellan.\n\nKöp den om du vill ha Wi-Fi 6 utan att lägga tusenlappen. Har du en operatörsrouter och vill vara säker på att huset får ett enda nätverksnamn är RE450 en tryggare väg för två kronor mer.",
  },
  {
    id: "tp-link-re450",
    brand: "TP-Link",
    name: "RE450 AC1750",
    shortName: "TP-Link RE450",
    image: productImage(WIFI_REPEATER.slug, "tp-link-re450"),
    tagline: "Tre antenner och gigabituttag för 601 kronor.",
    scores: {
      /* 1 300 Mbit/s på 5 GHz, Wi-Fi 5 med tre strömmar. F.A.Z. Kaufkompass
         mätte 340 Mbit/s netto trådlöst och 690 med klienten i sladd. */
      hastighet: 3,
      /* 1 Gigabit Ethernet Port. */
      natverksuttag: 4,
      /* EasyMesh-Compatible enligt TP-Links egen tabell. */
      mesh: 4.5,
      /* 450 Mbit/s, Wi-Fi 4 på 2,4 GHz. */
      band24: 3,
      /* 601 kr hos Proshop för tre strömmar, gigabituttag och EasyMesh. */
      prisvarde: 4,
    },
    price: 601,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Naetverk/TP-Link-RE450-AC1750-Wi-Fi-Range-Extender/2516299",
    award: "editor",
    superlative: "Bäst för en router utan wifi 6",
    pros: [
      "Tre externa antenner, som ger tre strömmar mot en router som kör tre",
      "Gigabituttag, och F.A.Z. Kaufkompass mätte 690 Mbit/s till en klient i sladd mot 340 trådlöst",
      "EasyMesh, alltså ett nätverksnamn också mot en router av annat märke",
      "3,2 watt uppmätt i drift, näst lägst av de fyra som mätts här",
      "Tre års garanti",
    ],
    cons: [
      "Wi-Fi 5, så en ny telefon kopplar upp sig på en äldre standard än den klarar",
      "450 Mbit/s på 2,4 GHz, mot 688 hos de tre snabbaste här",
      "163 millimeter bred med antennerna infällda, alltså bredast här",
    ],
    specs: [
      { label: "Pris", value: "601 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 5", highlight: true },
      { label: "AC/AX/BE-klass", value: "AC1750" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "1 300 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "450 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "Gigabit", highlight: true },
      { label: "Mesh", value: "EasyMesh", highlight: true },
      { label: "Antenner", value: "3 externa" },
      { label: "Driftlägen", value: "Repeater, accesspunkt" },
      { label: "Uppmätt förbrukning", value: "3,2 W" },
      { label: "Effekt", value: "10 W max" },
      { label: "Sändareffekt 2,4 GHz", value: "<20 dBm" },
      { label: "Yttermått", value: "163 × 76,4 × 66,5 mm" },
      { label: "Garanti", value: "3 år", highlight: true },
      { label: "GTIN", value: "6935364092382" },
    ],
    verdict:
      "TP-Link RE450 kostar 601 kronor hos Proshop och är den billigaste här med tre antenner och gigabituttag. Den talar Wi-Fi 5, alltså generationen före den som sitter i nya telefoner.\n\n**F.A.Z. Kaufkompass har mätt den, och talen visar vad uttaget är värt.** En klient i sladd fick 690 Mbit/s, en trådlös klient i samma läge 340. Skillnaden är att signalen bara behöver ta ett trådlöst hopp när sladden gör det andra, och den som sätter tv:n eller spelkonsolen i kabel får alltså ungefär dubbelt.\n\nTre externa antenner ger tre strömmar mot en router som också kör tre, och EasyMesh gör att huset behåller ett enda nätverksnamn också med en operatörsrouter i hallen. I drift mätte F.A.Z. 3,2 watt, vilket är lågt för en apparat som står i dygnet runt.\n\nBaksidan är standarden. Wi-Fi 5 innebär att 2,4 GHz stannar på 450 Mbit/s och att en ny telefon får koppla ner sig. Har du fiber över 500 Mbit/s och vill nyttja den tar du ME80X för två kronor mindre.",
  },
  {
    id: "asus-rp-be58",
    brand: "ASUS",
    name: "RP-BE58 BE3600",
    shortName: "ASUS RP-BE58",
    image: productImage(WIFI_REPEATER.slug, "asus-rp-be58"),
    tagline: "AiMesh gör den till en nod i ett Asus-nät, inte en gäst.",
    scores: {
      /* 2 882 Mbit/s på 5 GHz, Wi-Fi 7 med två strömmar. Samma radio som
         RE235BE. */
      hastighet: 4.5,
      /* RJ45 Gigabit BaseT × 1 enligt Asus egen tabell. */
      natverksuttag: 4,
      /* AiMesh och AiMesh node, alltså Asus eget system och bara mot Asus
         routrar. */
      mesh: 3,
      /* 688 Mbit/s. */
      band24: 4.5,
      /* 1 149 kr hos Proshop. 250 kr över RE235BE, med långsammare uttag och
         ett mesh-system som kräver en router av samma märke. */
      prisvarde: 2,
    },
    price: 1149,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Naetverk/ASUS-RP-BE58-BE3600-Dual-Band-WiFi-7-80211be-Range-ExtenderAiMesh-Extender-for-seamless-mesh-WiFi/3380109",
    superlative: "Bäst till en Asus-router",
    pros: [
      "2 882 Mbit/s på 5 GHz och 688 på 2,4, alltså Wi-Fi 7 på båda banden",
      "AiMesh gör den till en riktig nod i ett Asus-nät, med gemensamt namn och styrd överlämning",
      "Tre lägen: repeater, accesspunkt och mediabrygga för en apparat som saknar wifi",
      "Två inbyggda antenner, så inget sticker ut ur vägguttaget",
      "224 gram och 150 millimeter, alltså behändig för sin klass",
    ],
    cons: [
      "1 149 kronor, 250 mer än en repeater med samma radio och snabbare uttag",
      "AiMesh kräver en Asus-router, så med operatörens router blir det ett andra nätverksnamn",
      "Gigabituttag där de två Wi-Fi 7-modellerna från TP-Link tar 2,5",
    ],
    specs: [
      { label: "Pris", value: "1 149 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 7", highlight: true },
      { label: "AC/AX/BE-klass", value: "BE3600" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "2 882 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "688 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "Gigabit", highlight: true },
      { label: "Mesh", value: "AiMesh", highlight: true },
      { label: "Antenner", value: "2 inbyggda" },
      { label: "Driftlägen", value: "Repeater, accesspunkt, mediabrygga" },
      { label: "Yttermått", value: "150 × 72 × 87 mm" },
      { label: "GTIN", value: "4711387709351" },
    ],
    verdict:
      "ASUS RP-BE58 kostar 1 149 kronor hos Proshop och talar Wi-Fi 7 på båda banden, 2 882 Mbit/s på 5 GHz och 688 på 2,4. Det är samma radioklass som vinnaren, för 250 kronor mer.\n\n**Det du betalar för är AiMesh.** Har du redan en Asus-router blir RP-BE58 en nod i det nätet och inte en gäst på det: samma nätverksnamn, samma inställningar, och routern bestämmer när telefonen ska lämnas över till repeatern. Den överlämningen är skillnaden mellan att gå upp för trappan med bibehållen film och att stå still medan telefonen hänger kvar på routerns svaga signal.\n\nMediabryggläget är den andra nyttan. En äldre tv eller en skrivare utan wifi kan sitta i nätverksuttaget och komma ut på nätet trådlöst, och det klarar inte alla här.\n\nUtan en Asus-router faller argumentet. Då sänder den ett eget nätverksnamn du får byta till för hand, uttaget stannar på gigabit där TP-Links Wi-Fi 7-modeller tar 2,5, och 250 kronor har gått till en funktion som ligger avstängd. Har du en router från operatören är RE235BE det rakare köpet.",
  },
  {
    id: "tp-link-re605x",
    brand: "TP-Link",
    name: "RE605X AX1800",
    shortName: "TP-Link RE605X",
    image: productImage(WIFI_REPEATER.slug, "tp-link-re605x"),
    tagline: "574 Mbit/s på 2,4 GHz, bandet husets sensorer faktiskt använder.",
    scores: {
      /* 1 201 Mbit/s på 5 GHz, Wi-Fi 6 med två strömmar på 80 MHz. */
      hastighet: 3,
      /* 1 Gigabit Ethernet Port. */
      natverksuttag: 4,
      /* OneMesh, alltså TP-Links eget system och bara mot TP-Links egna
         OneMesh-routrar. */
      mesh: 3,
      /* 574 Mbit/s med Wi-Fi 6 även på 2,4 GHz, mot 300 hos RE505X i samma
         kabinett. */
      band24: 4,
      /* 765 kr hos Proshop, alltså 34 kr under RE505X med dubbla farten på
         2,4 GHz. */
      prisvarde: 3.5,
    },
    price: 765,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Naetverk/TP-Link-RE605X-AX1800-Wi-Fi-6-Range-Extender/2986071",
    superlative: "Bäst för många prylar på 2,4 GHz",
    pros: [
      "574 Mbit/s på 2,4 GHz med Wi-Fi 6, nästan dubbelt mot RE505X i samma kabinett",
      "Wi-Fi 6 på båda banden, vilket håller ordning när tjugo apparater talar samtidigt",
      "Gigabituttag för tv:n eller den stationära datorn",
      "765 kronor hos Proshop, mindre än RE505X trots snabbare 2,4 GHz",
      "Tre års garanti",
    ],
    cons: [
      "OneMesh kräver en TP-Link-router, så med operatörens router får du ett andra nätverksnamn",
      "1 201 Mbit/s på 5 GHz, alltså 80 megahertz kanalbredd där ME80X kör 160 för 166 kronor mindre",
      "Slut hos Kjell, som annars är den billigaste vägen till TP-Links sortiment",
    ],
    specs: [
      { label: "Pris", value: "765 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 6", highlight: true },
      { label: "AC/AX/BE-klass", value: "AX1800" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "1 201 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "574 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "Gigabit", highlight: true },
      { label: "Mesh", value: "OneMesh", highlight: true },
      { label: "Antenner", value: "2 externa" },
      { label: "Driftlägen", value: "Repeater, accesspunkt" },
      { label: "Effekt", value: "10 W max" },
      { label: "Sändareffekt 2,4 GHz", value: "≤20 dBm" },
      { label: "Yttermått", value: "74 × 46 × 124,8 mm" },
      { label: "Garanti", value: "3 år", highlight: true },
      { label: "GTIN", value: "6935364030582" },
    ],
    verdict:
      "TP-Link RE605X kostar 765 kronor hos Proshop och kör Wi-Fi 6 på båda banden. Den sitter i exakt samma kabinett som RE505X och skiljer sig på det band folk glömmer bort.\n\n**574 Mbit/s på 2,4 GHz är nästan dubbelt mot vad RE505X ger.** Det bandet är det som orkar genom en betongvägg, och det är också det enda språk termostater, vattenlarm, smarta lampor och de flesta övervakningskameror talar. Har du femton sådana i huset är Wi-Fi 6 på 2,4 GHz det som gör att de får plats utan att bromsa varandra.\n\nGigabituttaget tar hand om tv:n eller den stationära datorn, och där får du ungefär dubbla hastigheten mot en trådlös apparat i samma rum.\n\nMesh-funktionen är det svaga. OneMesh fungerar bara mot TP-Links egna routrar, så har du den router operatören skickade sänder RE605X ett eget nätverksnamn du får byta till för hand. Vill du slippa det tar du RE450, som talar den öppna EasyMesh-standarden och kostar 164 kronor mindre.",
  },
  {
    id: "tp-link-re505x",
    brand: "TP-Link",
    name: "RE505X AX1500",
    shortName: "TP-Link RE505X",
    image: productImage(WIFI_REPEATER.slug, "tp-link-re505x"),
    tagline: "EasyMesh på en Wi-Fi 6-repeater, oavsett vems router du har.",
    scores: {
      /* 1 200 Mbit/s på 5 GHz, Wi-Fi 6 med två strömmar på 80 MHz. F.A.Z.
         mätte 360 Mbit/s trådlöst och 775 med klienten i sladd. */
      hastighet: 3,
      /* 1 Gigabit Ethernet Port. */
      natverksuttag: 4,
      /* EasyMesh-Compatible enligt TP-Links egen tabell. */
      mesh: 4.5,
      /* 300 Mbit/s, Wi-Fi 4 på 2,4 GHz. Lägsta klassen som finns här. */
      band24: 2,
      /* 799 kr, alltså 34 kr över RE605X i samma kabinett med sämre 2,4 GHz. */
      prisvarde: 3,
    },
    price: 799,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 396, scale: 5, checkedAt: PRICE_CHECKED },
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/natverk/wifi-forstarkare/repeater-for-tradlost-natverk/tp-link-re505x-wifi-repeater-ax1500-p62694",
    superlative: "Bäst för wifi 6 med öppen mesh",
    pros: [
      "EasyMesh, som ger ett enda nätverksnamn också med operatörens router",
      "F.A.Z. Kaufkompass mätte 775 Mbit/s till en klient i sladd mot 360 trådlöst",
      "Wi-Fi 6 på 5 GHz, vilket håller farten uppe när flera strömmar film samtidigt",
      "3,7 watt uppmätt i drift",
      "396 kundbetyg hos Kjell med snittet 4,5",
    ],
    cons: [
      "300 Mbit/s på 2,4 GHz, alltså Wi-Fi 4 på det band som når längst",
      "34 kronor dyrare än RE605X, som har nästan dubbla farten på 2,4 GHz",
      "80 megahertz kanalbredd på 5 GHz, mot 160 hos ME80X för 200 kronor mindre",
    ],
    specs: [
      { label: "Pris", value: "799 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 6", highlight: true },
      { label: "AC/AX/BE-klass", value: "AX1500" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "1 200 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "300 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "Gigabit", highlight: true },
      { label: "Mesh", value: "EasyMesh", highlight: true },
      { label: "Antenner", value: "2 externa" },
      { label: "Driftlägen", value: "Repeater, accesspunkt" },
      { label: "Uppmätt förbrukning", value: "3,7 W" },
      { label: "Effekt", value: "10 W max" },
      { label: "Sändareffekt 2,4 GHz", value: "<20 dBm" },
      { label: "Yttermått", value: "74 × 46 × 124,8 mm" },
      { label: "Garanti", value: "3 år", highlight: true },
    ],
    verdict:
      "TP-Link RE505X kostar 799 kronor och är den billigaste Wi-Fi 6-repeatern här med EasyMesh. Det är den öppna mesh-standarden, till skillnad från OneMesh och AiMesh som kräver en router av rätt märke.\n\n**Det avgör om huset får ett eller två nätverksnamn.** De flesta svenskar har den router operatören skickade, och mot den blir en OneMesh-repeater bara ett andra nät du får välja för hand. EasyMesh ökar chansen att telefonen byter över av sig själv när du går ut i altandörren.\n\nF.A.Z. Kaufkompass har mätt den till 360 Mbit/s trådlöst och 775 med klienten i sladd. Den som sätter tv:n i gigabituttaget får alltså mer än dubbelt, och 3,7 watt i drift är blygsamt för en apparat som sitter i året om.\n\nSvagheten är 2,4 GHz. 300 Mbit/s är Wi-Fi 4-takt på det band som når längst genom huset, och RE605X ger 574 för 34 kronor mindre. Ska repeatern nå ner i källaren väger det tyngre än 5 GHz-talet.",
  },
  {
    id: "dlink-dap-x1860",
    brand: "D-Link",
    name: "DAP-X1860 AX1800",
    shortName: "D-Link DAP-X1860",
    image: productImage(WIFI_REPEATER.slug, "dlink-dap-x1860"),
    tagline: "Två inbyggda antenner, så ingenting sticker ut ur vägguttaget.",
    scores: {
      /* 1 200 Mbit/s på 5 GHz, Wi-Fi 6 med två strömmar. */
      hastighet: 3,
      /* 10/100/1000 Mbps Ethernet port enligt D-Links eget datablad. */
      natverksuttag: 4,
      /* D-Link Wi-Fi Mesh plus 802.11k/v, men bara mot D-Links egna routrar ur
         en uppräknad lista i databladet. */
      mesh: 3,
      /* 574 Mbit/s, Wi-Fi 6 på 2,4 GHz. */
      band24: 4,
      /* 916 kr för samma radioklass som ME80X ger för 599. */
      prisvarde: 2,
    },
    price: 916,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Naetverk/D-Link-DAP-X1860-AX1800-Mesh-Wi-Fi-6-Range-Extender/2888944",
    superlative: "Bäst utan utstickande antenner",
    pros: [
      "Två inbyggda antenner, så den bygger inte ut från väggen som modellerna med spröt",
      "574 Mbit/s på 2,4 GHz med Wi-Fi 6, vilket bär husets sensorer",
      "Gigabituttag för en apparat i sladd",
      "WPA3-kryptering och stöd för 802.11k/v, som hjälper telefonen att byta accesspunkt",
      "Signalstyrkan visas med tre lägen på fronten, så placeringen går att pröva ut",
    ],
    cons: [
      "916 kronor för samma radioklass som Mercusys ME80X ger för 599",
      "Mesh-funktionen kräver en D-Link-router ur en uppräknad lista",
      "Två års garanti, ett år kortare än TP-Link och Mercusys ger",
    ],
    specs: [
      { label: "Pris", value: "916 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 6", highlight: true },
      { label: "AC/AX/BE-klass", value: "AX1800" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "1 200 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "574 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "Gigabit", highlight: true },
      { label: "Mesh", value: "D-Link Wi-Fi Mesh", highlight: true },
      { label: "Antenner", value: "2 inbyggda" },
      { label: "Driftlägen", value: "Repeater, accesspunkt" },
      { label: "Effekt", value: "9,7 W ±5 %" },
      { label: "Yttermått", value: "165 × 75 × 60 mm" },
      { label: "Garanti", value: "2 år", highlight: true },
    ],
    verdict:
      "D-Link DAP-X1860 kostar 916 kronor hos Proshop och kör Wi-Fi 6 med 1 200 Mbit/s på 5 GHz och 574 på 2,4. Antennerna sitter inuti, så den bygger inte ut från väggen.\n\nDet är den konkreta fördelen. En repeater med utfällbara spröt kräver tio centimeter fri luft framför uttaget, och bakom en soffa eller i en trång hall finns sällan det. **DAP-X1860 är 60 millimeter djup med allt inräknat.** Tre lägen på fronten visar hur stark signalen från routern är där du satt den, så du kan flytta den några meter och se skillnaden direkt.\n\n574 Mbit/s på 2,4 GHz betyder att husets termostater, lampor och vattenlarm får plats utan att slåss om utrymmet, och stödet för 802.11k/v hjälper telefonen att lämna repeatern när du går tillbaka mot routern.\n\nPriset är problemet. Mercusys ME80X ger snabbare radio och samma gigabituttag för 599 kronor, och D-Link lämnar två års garanti där TP-Link och Mercusys ger tre. Köp den om antennerna faktiskt är i vägen där repeatern ska sitta. Annars är det 317 kronor för ett formspråk.",
  },
  {
    id: "tp-link-re650",
    brand: "TP-Link",
    name: "RE650 AC2600",
    shortName: "TP-Link RE650",
    image: productImage(WIFI_REPEATER.slug, "tp-link-re650"),
    tagline: "800 Mbit/s på 2,4 GHz, det högsta talet i hela fältet.",
    scores: {
      /* 1 733 Mbit/s på 5 GHz, Wi-Fi 5 med fyra strömmar. F.A.Z. mätte 170
         Mbit/s trådlöst mot en tvåströmsklient och 370 med klienten i sladd. */
      hastighet: 3.5,
      /* 1 Gigabit Ethernet Port. */
      natverksuttag: 4,
      /* TP-Links egen tabell anger ingen mesh-teknik för RE650, till skillnad
         från RE450, RE505X, RE605X och RE300. Repeatern sänder ett eget
         nätverksnamn. */
      mesh: 1,
      /* 800 Mbit/s, högst i fältet, från fyra strömmar på 2,4 GHz. */
      band24: 5,
      /* 1 290 kr för en Wi-Fi 5-radio utan mesh. */
      prisvarde: 1.5,
    },
    price: 1290,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 215, scale: 5, checkedAt: PRICE_CHECKED },
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/natverk/wifi-forstarkare/repeater-for-tradlost-natverk/tp-link-re650-wifi-repeater-ac2600-p61491",
    superlative: "Bäst för öppna ytor utan väggar",
    pros: [
      "800 Mbit/s på 2,4 GHz, det högsta talet här och 116 mer än de tre Wi-Fi 7-modellerna",
      "Fyra externa antenner som går att rikta mot rummet du vill täcka",
      "1 733 Mbit/s på 5 GHz från fyra strömmar",
      "Gigabituttag",
      "Tre års garanti",
    ],
    cons: [
      "Ingen mesh-teknik, så repeatern sänder alltid ett eget nätverksnamn du får byta till för hand",
      "1 290 kronor för Wi-Fi 5, alltså generationen före den nya telefoner talar",
      "De fyra strömmarna kräver en router och en klient som också kör fyra, och nästan alla kör två",
    ],
    specs: [
      { label: "Pris", value: "1 290 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 5", highlight: true },
      { label: "AC/AX/BE-klass", value: "AC2600" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "1 733 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "800 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "Gigabit", highlight: true },
      { label: "Mesh", value: "Saknas", highlight: true },
      { label: "Antenner", value: "4 externa" },
      { label: "Driftlägen", value: "Repeater, accesspunkt" },
      { label: "Uppmätt förbrukning", value: "4,6 W" },
      { label: "Effekt", value: "12 W max" },
      { label: "Sändareffekt 2,4 GHz", value: "<20 dBm" },
      { label: "Yttermått", value: "163 × 86 × 40 mm" },
      { label: "Garanti", value: "3 år", highlight: true },
    ],
    verdict:
      "TP-Link RE650 kostar 1 290 kronor och har fältets högsta tal på 2,4 GHz, 800 Mbit/s. Fyra externa antenner ger fyra strömmar på båda banden.\n\n**Det talet betyder något i ett hus utan innerväggar.** 2,4 GHz är bandet som orkar längst, och 800 Mbit/s är 116 mer än vad de tre Wi-Fi 7-modellerna här ger på samma band. Står repeatern i ett öppet plan och ska nå ut på altanen eller in i ett uthus är det den kombination som räcker längst.\n\nAntennerna kan riktas, vilket de inbyggda på DAP-X1860 och RP-BE58 inte kan, och gigabituttaget tar hand om en tv eller dator i sladd.\n\n**Men den saknar mesh helt**, och det märks varje dag. TP-Links egen specifikation anger ingen mesh-teknik för RE650, så repeatern sänder ett eget nätverksnamn som du får välja för hand medan telefonen envist hänger kvar på routerns svaga signal. Vill du ha fyra riktbara antenner och slippa det tar du RE450 för 689 kronor mindre.",
  },
  {
    id: "tp-link-re305",
    brand: "TP-Link",
    name: "RE305 AC1200",
    shortName: "TP-Link RE305",
    image: productImage(WIFI_REPEATER.slug, "tp-link-re305"),
    tagline: "329 kronor, och 2 551 kunder har satt betyg på den.",
    scores: {
      /* 867 Mbit/s på 5 GHz, Wi-Fi 5 med två strömmar på 80 MHz. */
      hastighet: 2,
      /* 1 × 10/100 Mbps Ethernet Port enligt TP-Links egen tabell. Takets tal
         för Fast Ethernet är 95 Mbit/s netto, mätt av F.A.Z. på tre andra
         modeller med samma uttagsklass. */
      natverksuttag: 2,
      /* OneMesh, alltså bara mot TP-Links egna routrar. */
      mesh: 3,
      /* 300 Mbit/s, Wi-Fi 4. */
      band24: 2,
      /* 329 kr för OneMesh och 867 Mbit/s. Billigast med mesh över huvud
         taget, och 110 kr under RE300 som har mindre. */
      prisvarde: 4.5,
    },
    price: 329,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 2551, scale: 5, checkedAt: PRICE_CHECKED },
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/natverk/wifi-forstarkare/repeater-for-tradlost-natverk/tp-link-re305-wifi-repeater-ac1200-p61644",
    superlative: "Bäst för en enda extra hörna",
    pros: [
      "329 kronor, billigast här med både nätverksuttag och mesh",
      "OneMesh, som ger ett nätverksnamn i huset om routern också är en TP-Link",
      "867 Mbit/s på 5 GHz räcker till strömmad film i 4K i rummet bredvid",
      "Två externa antenner som går att vinkla",
      "2 551 kundbetyg hos Kjell med snittet 4,0, den mest omdömda här",
    ],
    cons: [
      "Nätverksuttaget tar bara 100 megabit, så en tv i sladd får mindre än trådlöst",
      "Sänder på högst 17 dBm på båda banden, där RE315 och RE505X går till 20 på 2,4 GHz",
      "300 Mbit/s på 2,4 GHz, alltså Wi-Fi 4 på bandet som ska nå längst",
    ],
    specs: [
      { label: "Pris", value: "329 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 5", highlight: true },
      { label: "AC/AX/BE-klass", value: "AC1200" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "867 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "300 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "10/100 Mbit", highlight: true },
      { label: "Mesh", value: "OneMesh", highlight: true },
      { label: "Antenner", value: "2 externa" },
      { label: "Driftlägen", value: "Repeater, accesspunkt" },
      { label: "Effekt", value: "7,3 W max" },
      { label: "Sändareffekt 2,4 GHz", value: "<17 dBm" },
      { label: "Yttermått", value: "80 × 78 × 77 mm" },
      { label: "Garanti", value: "3 år", highlight: true },
    ],
    verdict:
      "TP-Link RE305 kostar 329 kronor och är den billigaste här som både har ett nätverksuttag och kan slås ihop med routern till ett nätverk. 2 551 personer har satt betyg på den hos Kjell, snitt 4,0.\n\n867 Mbit/s på 5 GHz räcker till strömmad film i 4K i rummet bredvid, och OneMesh ger huset ett enda nätverksnamn om routern också kommer från TP-Link. Två vinklingsbara antenner gör att du kan rikta signalen mot rummet som saknar täckning.\n\n**Uttaget är fällan.** Det tar 100 megabit, och F.A.Z. Kaufkompass har mätt tre repeatrar med samma uttagsklass till 95 Mbit/s i sladden mot 210 till 245 trådlöst. Kopplar du in tv:n med kabel för att det ska bli stabilare får du alltså mindre än hälften av vad luften ger.\n\nSändareffekten är också låg, högst 17 dBm mot 20 hos flera dyrare modeller, vilket kortar räckvidden i ett hus med tjocka väggar. Köp den till ett sovrum eller ett kontor en vägg bort, där den gör precis vad den ska för under en trehundralapp. Ska den nå genom två bjälklag räcker den inte.",
  },
  {
    id: "dlink-dap-1620",
    brand: "D-Link",
    name: "DAP-1620 AC1300",
    shortName: "D-Link DAP-1620",
    image: productImage(WIFI_REPEATER.slug, "dlink-dap-1620"),
    tagline: "105 millimeter hög med hopfällda antenner, och gigabit i uttaget.",
    scores: {
      /* 867 Mbit/s på 5 GHz, Wi-Fi 5 med två strömmar. */
      hastighet: 2,
      /* 10/100/1000 Gigabit Ethernet Port enligt D-Links egen bruksanvisning.
         Enda modellen under 700 kr med gigabit. */
      natverksuttag: 4,
      /* Ingen mesh-teknik, men IEEE 802.11v enligt bruksanvisningen, alltså
         stöd för att routern kan styra överlämningen. */
      mesh: 2,
      /* 400 Mbit/s på 2,4 GHz. */
      band24: 2.5,
      /* 629 kr för en Wi-Fi 5-radio på 867 Mbit/s. */
      prisvarde: 2,
    },
    price: 629,
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 3.5, count: 74, scale: 5, checkedAt: PRICE_CHECKED },
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/natverk/wifi-forstarkare/repeater-for-tradlost-natverk/d-link-dap-1620-repeater-ac1300-p62114",
    superlative: "Bäst för trånga vägguttag",
    pros: [
      "Gigabituttag på en repeater under 700 kronor, vilket är ovanligt i den prisklassen",
      "105 millimeter hög och 165 gram, med antenner som fälls in mot huset",
      "400 Mbit/s på 2,4 GHz, mer än de fyra som stannar på 300",
      "4,3 watt i drift enligt tillverkaren, och 3,7 i nätverksviloläge",
      "Signalstyrkan visas i tre lägen, så placeringen går att pröva ut",
    ],
    cons: [
      "Ingen mesh-teknik, så du får ett andra nätverksnamn att byta till för hand",
      "Två års garanti, ett år kortare än TP-Link och Mercusys ger",
      "867 Mbit/s på 5 GHz, samma som RE305 ger för 300 kronor mindre",
    ],
    specs: [
      { label: "Pris", value: "629 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 5", highlight: true },
      { label: "AC/AX/BE-klass", value: "AC1300" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "867 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "400 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "Gigabit", highlight: true },
      { label: "Mesh", value: "Saknas, 802.11v", highlight: true },
      { label: "Antenner", value: "2 externa, infällbara" },
      { label: "Driftlägen", value: "Repeater, accesspunkt" },
      { label: "Effekt", value: "4,3 W" },
      { label: "Yttermått", value: "105 × 63,5 × 50 mm" },
      { label: "Garanti", value: "2 år", highlight: true },
      { label: "GTIN", value: "0790069419379" },
    ],
    verdict:
      "D-Link DAP-1620 kostar 629 kronor och är den billigaste här med ett riktigt gigabituttag. Den är 105 millimeter hög med antennerna infällda och väger 165 gram.\n\nStorleken är poängen. En repeater ska sitta ungefär halvvägs mellan routern och rummet som saknar täckning, och den platsen är ofta ett uttag i en hall eller bakom en byrå. DAP-1620 fälls ihop till en kloss som inte tar det andra uttaget i dosan, och antennerna vinklas ut igen när det finns luft.\n\n**Gigabituttaget är det som skiljer den från RE305.** Där en tv i sladd bakom RE305 landar runt 95 Mbit/s får den samma tv bakom DAP-1620 ungefär dubbla den trådlösa hastigheten, eftersom signalen bara behöver ta ett trådlöst hopp.\n\nD-Link anger ingen mesh-teknik för den, bara stöd enligt 802.11v, så huset får ett andra nätverksnamn. Garantin är dessutom två år mot tre hos TP-Link och Mercusys. Är formatet det avgörande är den värd pengarna. Passar en större dosa tar du RE450 för 28 kronor mindre och får både EasyMesh och en tredje antenn.",
  },
  {
    id: "tp-link-re300",
    brand: "TP-Link",
    name: "RE300 AC1200",
    shortName: "TP-Link RE300",
    image: productImage(WIFI_REPEATER.slug, "tp-link-re300"),
    tagline: "Helt slät front utan antenner, 124 millimeter i vägguttaget.",
    scores: {
      /* 867 Mbit/s på 5 GHz, Wi-Fi 5 med två strömmar. F.A.Z. mätte 240
         Mbit/s trådlöst. */
      hastighet: 2,
      /* TP-Links egen tabell anger Interface: -, alltså inget nätverksuttag
         alls. F.A.Z. skriver "kein LAN-Port" om samma modell. */
      natverksuttag: 1,
      /* OneMesh. */
      mesh: 3,
      /* 300 Mbit/s, Wi-Fi 4. */
      band24: 2,
      /* 439 kr, alltså 110 kr över RE305 som har både uttag och samma radio. */
      prisvarde: 2.5,
    },
    price: 439,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Naetverk/TP-Link-RE300-AC1200-Mesh-Wi-Fi-Range-Extender/2827551",
    superlative: "Bäst för sovrummet utan sladdar",
    pros: [
      "Helt slät front, så ingenting sticker ut bakom en säng eller en soffa",
      "OneMesh, som ger ett nätverksnamn i huset om routern också är en TP-Link",
      "867 Mbit/s på 5 GHz, tillräckligt för strömmad film i 4K",
      "F.A.Z. Kaufkompass mätte 240 Mbit/s netto trådlöst",
      "Tre års garanti",
    ],
    cons: [
      "Inget nätverksuttag alls, så en tv eller skrivare utan wifi kommer inte ut på nätet genom den",
      "Sänder på högst 17 dBm på båda banden, vilket kortar räckvidden i ett hus med tjocka väggar",
      "439 kronor, alltså 110 mer än RE305 som har samma radio och dessutom ett uttag",
    ],
    specs: [
      { label: "Pris", value: "439 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 5", highlight: true },
      { label: "AC/AX/BE-klass", value: "AC1200" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "867 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "300 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "Saknas", highlight: true },
      { label: "Mesh", value: "OneMesh", highlight: true },
      { label: "Antenner", value: "2 inbyggda" },
      { label: "Driftlägen", value: "Repeater" },
      { label: "Uppmätt förbrukning", value: "3,4 W" },
      { label: "Effekt", value: "7,3 W max" },
      { label: "Sändareffekt 2,4 GHz", value: "<17 dBm" },
      { label: "Yttermått", value: "124 × 69 × 52 mm" },
      { label: "Garanti", value: "3 år", highlight: true },
      { label: "GTIN", value: "6935364085520" },
    ],
    verdict:
      "TP-Link RE300 kostar 439 kronor hos Proshop och har antennerna inuti och en helt slät front. Radion är densamma som i RE305: 867 Mbit/s på 5 GHz och 300 på 2,4.\n\nFormen är hela argumentet för den. Bakom en säng, en soffa eller ett skåp finns sällan tio centimeter fri luft framför uttaget, och RE300 sticker ut 52 millimeter och ingenting mer. OneMesh gör att den går ihop med en TP-Link-router till ett enda nätverksnamn, så telefonen byter över utan att du gör något.\n\nF.A.Z. Kaufkompass mätte 240 Mbit/s netto trådlöst och 3,4 watt i drift, vilket är rimligt för klassen och ungefär vad 867 Mbit/s brutto brukar ge i praktiken.\n\n**Den saknar nätverksuttag helt.** Det betyder att en tv, spelkonsol eller skrivare utan wifi inte kan komma ut på nätet genom den, och att du aldrig får den fördubbling en sladd ger. Vill du ha samma radio, samma mesh och ett uttag på köpet kostar RE305 110 kronor mindre. Välj RE300 bara när utrymmet framför uttaget faktiskt avgör.",
  },
  {
    id: "tp-link-re190",
    brand: "TP-Link",
    name: "RE190 AC750",
    shortName: "TP-Link RE190",
    image: productImage(WIFI_REPEATER.slug, "tp-link-re190"),
    tagline: "301 kronor och tre antenner, för ett rum som ligger nästan i skugga.",
    scores: {
      /* 433 Mbit/s på 5 GHz, Wi-Fi 5 med en enda ström. Lägst i fältet. */
      hastighet: 1,
      /* TP-Links egen tabell anger Interface: -, alltså inget nätverksuttag. */
      natverksuttag: 1,
      /* Ingen mesh-teknik i TP-Links tabell, och Working Modes anger bara
         Range Extender. */
      mesh: 1,
      /* 300 Mbit/s, Wi-Fi 4. */
      band24: 2,
      /* 301 kr, billigast här, men utan uttag, utan mesh och med en enda
         ström på 5 GHz. */
      prisvarde: 2.5,
    },
    price: 301,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Naetverk/TP-Link-RE190-AC750-Wi-Fi-Range-Extender/3053210",
    superlative: "Bäst för att nå ut på altanen",
    pros: [
      "301 kronor, billigast här",
      "Tre rundstrålande antenner, vilket är fler än de flesta i prisklassen har",
      "Sänder på upp till 20 dBm på 2,4 GHz, alltså lagens tak och mer än RE305 och RE300",
      "110 millimeter bred och 39 djup, så den ryms i de flesta dosor",
      "Tre års garanti",
    ],
    cons: [
      "433 Mbit/s på 5 GHz från en enda ström, mindre än hälften mot RE305",
      "Inget nätverksuttag, så ingen apparat kan kopplas in med kabel",
      "Ingen mesh-teknik, så repeatern sänder alltid ett eget nätverksnamn",
    ],
    specs: [
      { label: "Pris", value: "301 kr", highlight: true },
      { label: "Wi-Fi-standard", shortLabel: "Wi-Fi", value: "Wi-Fi 5", highlight: true },
      { label: "AC/AX/BE-klass", value: "AC750" },
      { label: "Hastighet 5 GHz", shortLabel: "5 GHz", value: "433 Mbit/s", highlight: true },
      { label: "Hastighet 2,4 GHz", shortLabel: "2,4 GHz", value: "300 Mbit/s", highlight: true },
      { label: "Nätverksuttag", shortLabel: "Uttag", value: "Saknas", highlight: true },
      { label: "Mesh", value: "Saknas", highlight: true },
      { label: "Antenner", value: "3 rundstrålande" },
      { label: "Driftlägen", value: "Repeater" },
      { label: "Effekt", value: "7,0 W max" },
      { label: "Sändareffekt 2,4 GHz", value: "<20 dBm" },
      { label: "Yttermått", value: "110 × 65,8 × 38,8 mm" },
      { label: "Garanti", value: "3 år", highlight: true },
      { label: "GTIN", value: "6935364089665" },
    ],
    verdict:
      "TP-Link RE190 kostar 301 kronor och är billigast här. Tre rundstrålande antenner och 433 Mbit/s på 5 GHz, vilket kommer från en enda ström.\n\nEn ström betyder att 5 GHz-bandet ger mindre än hälften av vad RE305 ger för 28 kronor mer. Till gengäld sänder RE190 på upp till 20 dBm på 2,4 GHz, alltså det tak Post- och telestyrelsen sätter, där RE305 och RE300 stannar på 17. **Signalen orkar därför längre än farten antyder**, och för ett uterum eller en altan där du mest ska läsa nyheter och strömma musik räcker den.\n\nDen är 39 millimeter djup och ryms i en dosa där bredare modeller tar det andra uttaget.\n\nSaknas gör både nätverksuttag och mesh. Ingen apparat kan kopplas in med kabel, och repeatern sänder alltid ett eget nätverksnamn som du får byta till för hand. Ska den bära film till en tv, eller ska huset kännas som ett enda nätverk, är det RE305 för 329 kronor som är minsta vettiga köp.",
  },
];

export const WIFI_REPEATER_PRODUCTS = resolveProducts(WIFI_REPEATER, SEEDS);

export const WIFI_REPEATER_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "TP-Link",
    name: "RE315 AC1200",
    reason:
      "Nästan en dubblett till RE305: samma radio, samma OneMesh, samma uttag på 100 megabit. Den sänder starkare, upp till 20 dBm mot 17, men kostar 277 kronor mer och den skillnaden syns bara i ett hus med tjocka väggar.",
    approxPrice: 606,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Naetverk/TP-Link-RE315-AC1200-OneMesh-Wi-Fi-Range-Extender/3183386",
  },
  {
    brand: "TP-Link",
    name: "RE365 AC1200",
    reason:
      "Samma radio som RE305 med ett genomgångsuttag på fronten, så vägguttaget inte går förlorat. Bra idé, men uttaget tar 100 megabit och priset ligger 177 kronor över RE305.",
    approxPrice: 506,
    merchant: "Proshop",
    merchantUrl:
      "https://www.proshop.se/Naetverk/TP-Link-RE365-AC1200-Wi-Fi-Range-Extender-with-AC-Passthrough/2827552",
  },
  {
    brand: "TP-Link",
    name: "Archer Air E5 AX3000",
    reason:
      "Wi-Fi 6 på 2 402 Mbit/s i ett platt utförande som hängs på väggen med magnet och drivs över USB-C. Ett annat formfaktorval än de instickbara här, och 291 kronor över Mercusys ME80X som ger samma radioklass.",
    approxPrice: 890,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/natverk/wifi-forstarkare/repeater-for-tradlost-natverk/tp-link-archer-air-e5-wifi-6-repeater-ax3000-p65311",
  },
  {
    brand: "Mercusys",
    name: "ME25BE BE3600",
    reason:
      "Wi-Fi 7 för 799 kronor är det lägsta priset för den generationen här, men den säljs bara av Kjell och är slut där.",
    approxPrice: 799,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/natverk/wifi-forstarkare/repeater-for-tradlost-natverk/mercusys-me25be-wifi-7-repeater-be3600-p66180",
  },
  {
    brand: "D-Link",
    name: "E15 AX1500",
    reason:
      "F.A.Z. Kaufkompass mätte den till 320 Mbit/s trådlöst och 820 med en klient i sladd, alltså goda tal för klassen. Den säljs bara av Kjell och är slut där.",
    approxPrice: 699,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/natverk/wifi-forstarkare/repeater-for-tradlost-natverk/d-link-e15-mesh-repeater-ax1500-p65472",
  },
  {
    brand: "Prylstaden",
    name: "Aktiv WiFi-förstärkare 4 W",
    reason:
      "Säljs som signalförstärkare och inte som repeater: den tar emot och skickar vidare samma nätverk utan att skapa en egen accesspunkt. Butiken anger 4 watt, alltså 4 000 milliwatt, medan Post- och telestyrelsens föreskrift PTSFS 2022:19 §173 sätter taket för dataöverföring på 2,4 GHz till 100 milliwatt. Vi jämför den inte med repeatrarna här.",
    approxPrice: 799,
    merchant: "Prylstaden",
    merchantUrl:
      "https://www.prylstaden.se/aktiv-wifi-forstarkare-stark-ert-tradlosa-wifi-natverk",
  },
];

export const WIFI_REPEATER_FAQ = [
  {
    question: "Vad betyder AC1200 och AX3000 på kartongen?",
    answer:
      "Det är summan av bruttohastigheten på alla band tillsammans. AC1750 på TP-Link RE450 är 1 300 Mbit/s på 5 GHz plus 450 på 2,4 GHz, och AX3000 på Mercusys ME80X är 2 402 plus 574. Din telefon sitter på ett band i taget, så den ser aldrig det sammanräknade talet. Titta på hastigheten per band, som står i tabellen ovan.",
  },
  {
    question: "Halveras hastigheten av en repeater?",
    answer:
      "På en repeater med två band gör den ungefär det, eftersom samma radio både tar emot från routern och skickar vidare till dig. F.A.Z. Kaufkompass mätte TP-Link RE450 till 690 Mbit/s när klienten satt i sladd och 340 när den var trådlös. Med kabel behöver signalen bara ta ett trådlöst hopp, och du får därför ungefär dubbelt.",
  },
  {
    question: "Ska jag koppla in tv:n med nätverkskabel i repeatern?",
    answer:
      "Ja, om repeatern har ett gigabituttag. Då får tv:n ungefär dubbla hastigheten mot en trådlös apparat i samma rum. Har repeatern ett uttag på 100 megabit blir det tvärtom: F.A.Z. Kaufkompass mätte 95 Mbit/s i sladden mot 210 till 245 i luften på tre sådana modeller. Uttagets klass står i tabellen ovan.",
  },
  {
    question: "Varför får jag ett nytt nätverksnamn i telefonen?",
    answer:
      "En repeater utan mesh-teknik sänder ett eget nätverk, ofta med EXT efter namnet, och du måste välja det för hand. Med mesh slås de ihop till ett enda namn och routern lämnar över telefonen automatiskt. EasyMesh är Wi-Fi Alliances standard och fungerar mot andra tillverkares routrar, medan OneMesh, AiMesh och D-Link Wi-Fi Mesh kräver en router av samma märke.",
  },
  {
    question: "Sänder en repeater starkare än routern?",
    answer:
      "Nej. Post- och telestyrelsens föreskrift PTSFS 2022:19 §173 sätter taket till 100 milliwatt e.i.r.p. på 2,4 GHz för all dataöverföring, och §181 och §182 anger 200 milliwatt för inomhusbruk på 5,15 till 5,35 GHz. Samma tak gäller routern och repeatern. Det repeatern ändrar är avståndet: den står närmare dig och behöver därför inte skrika lika långt.",
  },
  {
    question: "Var ska repeatern sitta?",
    answer:
      "Ungefär halvvägs mellan routern och rummet som saknar täckning, i ett uttag där den fortfarande får god signal från routern. Sätter du den där täckningen redan är dålig skickar den vidare en dålig signal. Flera av modellerna här visar signalstyrkan med en lampa eller tre lägen på fronten, så du kan pröva två eller tre uttag och se skillnaden direkt.",
  },
  {
    question: "Repeater eller mesh-system?",
    answer:
      "En repeater förlänger den router du redan har och kostar 300 till 1 600 kronor. Ett mesh-system ersätter routern med två eller tre enheter som pratar med varandra och kostar från ungefär 2 000. Räcker det med ett rum eller en våning till är repeatern det billigare och enklare valet. Ska hela huset fungera lika bra överallt är mesh byggt för det.",
  },
  {
    question: "Fungerar en repeater med routern operatören skickade?",
    answer:
      "Ja, alla här fungerar mot vilken router som helst. Det som kan skilja är om huset får ett eller två nätverksnamn. OneMesh, AiMesh och D-Link Wi-Fi Mesh kräver en router av samma märke, vilket en operatörsrouter sällan är, medan EasyMesh är en öppen standard med bättre chans att fungera. Går det inte ihop kan du sätta samma nätverksnamn och lösenord på repeatern manuellt, men överlämningen blir då trögare.",
  },
];
