import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { INOMHUSKAMERA } from "@/lib/test-pages";

/**
 * Inomhuskameror. Underlag i .agent/research/inomhuskamera.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser och kundbetyg lästa på Kjells egen sida
 * 2026-08-03. Upplösning, synfält, rörelseomfång, lagring och avstängning är
 * hämtade ur tillverkarens egen specifikation, manual eller produktblad
 * 2026-08-06, se lib/sources.ts. Abonnemangspriserna står på Arlos och Rings
 * egna planssidor.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte monterat eller
 * filmat med någon kamera.
 *
 * ## Sidans fynd: hemtjänsten gör undantaget ogiltigt
 *
 * IMY skriver att kamerabevakning inne i bostaden oftast omfattas av
 * privatundantaget, även kopplad till larmcentral. Men ett av myndighetens
 * fyra exempel säger nej till just den vanligaste anledningen att köpa
 * produkten: får du regelbundet besök av hemtjänst bevakas personalen under
 * sin arbetstid, och då gäller GDPR.
 *
 * ## Produktfyndet: fyra sätt att stänga av en kamera så att det syns
 *
 * | Mekanism | Produkt |
 * |---|---|
 * | Linsen lutar ner i foten av sig själv när kameran avlarmas | Arlo Essential 3 PTZ Indoor |
 * | Linsen vänds bort, går att automatisera med en egen regel | Aqara Camera Hub G3 |
 * | Knapp på kameran som vrider bort linsen | Tapo C225 och C125 |
 * | Linsskydd, inbyggt hos Ring Pan-Tilt och löst hos Indoor Cam Plus | Ring |
 * | Bara programläge | Tapo C220, Tapo C100 |
 *
 * ⚠️ **Rättat 2026-08-06.** Sidan gav tidigare Arlo ett motoriserat linsskydd
 * och Aqara ingen fysisk avstängning alls. Båda uppgifterna var fel, se
 * lib/corrections.ts. Arlos Privacy Shield sitter på den fasta Essential
 * Indoor, inte på panoreringsmodellen vi rankar, och Aqara skriver själva att
 * G3 har ett hårdvaruläge som går att slå på för hand eller automatiskt.
 *
 * ## ⚠️ Sökvolymen är inte mätt
 *
 * `inomhuskamera` finns inte i någon av våra Keyword Planner-körningar. Sidan
 * bygger på ett antagande om intention inom `övervakningskamera`. Se
 * research-filen §1. Det är sidans största osäkerhet och ska mätas.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-03";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "tapo-c225",
    name: "TP-Link Tapo C225",
    shortName: "Tapo C225",
    brand: "TP-Link",
    image: productImage(INOMHUSKAMERA.slug, "tapo-c225"),
    tagline: "Hela rummet i 2K, och du ser från soffan när den är avstängd.",
    scores: { avstangning: 4, bild: 4.5, kostnad: 5, hemtjanst: 4, prisvarde: 5 },
    price: 599,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/tp-link-tapo-c225-ai-overvakningskamera-p65170",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 168, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för rummet familjen lever i",
    pros: [
      "Knapp på kamerans hölje som fäller ner ett skydd över linsen eller vrider bort den helt",
      "Programläget stänger av både bild och ljud, inte bara inspelningen",
      "360 grader horisontellt och 149 vertikalt tar hela rummet, golv och tak inräknat",
      "2K QHD på minneskort upp till 512 GB, och ingenting kräver abonnemang",
      "168 kundomdömen med snittet 4,5",
      "599 kronor, under hälften av vad de abonnemangsberoende kostar",
    ],
    cons: [
      "15 bilder per sekund, lägst av kamerorna",
      "Bara 2,4 GHz wifi, vilket kan vara trångt i ett hem med många enheter",
      "Knappen måste tryckas in för hand, till skillnad från Arlos och Aqaras som går att automatisera",
      "83 graders synfält är smalast här, så mycket av täckningen kommer från att kameran vrider sig i stället för att se brett",
    ],
    specs: [
      { label: "Avstängning", value: "Knapp på kameran, vrider bort linsen", highlight: true },
      { label: "Rörelseomfång", value: "360° × 149°", highlight: true },
      { label: "Synfält", value: "83° horisontellt, 100° diagonalt", highlight: true },
      { label: "Upplösning", value: "2K QHD, 2560 × 1440", highlight: true },
      { label: "Lagring", value: "microSD upp till 512 GB", highlight: true },
      { label: "Abonnemang", value: "Behövs inte, allt sparas på kortet", highlight: true },
      { label: "Programläge", value: "Stänger av bild och ljud" },
      { label: "Ström", value: "Nätadapter 12 V, ingår" },
      { label: "Bildfrekvens", value: "15 fps" },
    ],
    verdict:
      "Tapo C225 kostar 599 kronor, filmar i 2K och har en knapp på höljet som vrider bort objektivet. Den vrider sig 360 grader horisontellt och 149 vertikalt, alltså hela rummet med golvet framför sig inräknat.\n\nKnappen är hela skälet till att den vinner. Ett tryck fäller ner ett skydd över linsen eller vrider bort den helt, och då litar du inte på ett företags programvara utan ser med egna ögon att objektivet pekar in i höljet. Ska du dessutom bara stänga av i appen gör programläget mer än de flestas: det stoppar bild och ljud, inte bara inspelningen. Och allt hamnar på ett minneskort i kameran, upp till 512 GB, så inomhusbilderna lämnar aldrig bostaden om du inte ber om det.\n\nObjektivet är samtidigt det smalaste här, 83 grader horisontellt. Täckningen kommer av att kameran vrider sig, inte av att den ser brett, och står den stilla i ett hörn ser den mindre än en Ring för samma pengar. Bildfrekvensen stannar på 15 bilder i sekunden.\n\nKöp den ändå. Ingen annan kamera i kategorin kombinerar ett skydd du kan peka på, hela rummet, 2K och noll kronor i månaden, och den gör det för 599 kronor. Ska kameran stå där familjen faktiskt lever är det här kameran.",
  },
  {
    id: "aqara-g3",
    name: "Aqara Camera Hub G3",
    shortName: "Camera Hub G3",
    brand: "Aqara",
    image: productImage(INOMHUSKAMERA.slug, "aqara-g3"),
    tagline: "Vänder bort linsen när du kommer hem, och styr resten av hemmet.",
    scores: { avstangning: 4.5, bild: 4, kostnad: 4.5, hemtjanst: 4, prisvarde: 3 },
    price: 1299,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/aqara-camera-hub-g3-overvakningskamera-p51976",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 27, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som redan har Apple",
    pros: [
      "Hårdvaruläge som vänder bort linsen och visar ett sovande ansikte i stället, för hand eller via en egen regel",
      "HomeKit Secure Video lagrar krypterat i din iCloud i stället för hos kameratillverkaren",
      "Inbyggd Zigbee 3.0-hubb, så kameran blir också navet för sensorer och lampor",
      "110 graders objektiv, näst bredast av kamerorna, plus 340 graders panorering",
      "Wifi på både 2,4 och 5 GHz, till skillnad från flera konkurrenter",
    ],
    cons: [
      "Lutar bara 45 grader, mot 149 hos Tapo C225, så den ser sämre nedåt mot golvet",
      "Minneskort bara upp till 128 GB, mot 512 hos Tapo",
      "1 299 kronor, nästan tre gånger C220 för jämförbar bild",
      "Automatiken är en regel du själv får bygga i appen, inte ett läge som följer med ur lådan",
    ],
    specs: [
      { label: "Avstängning", value: "Linsen vänds bort, går att automatisera", highlight: true },
      { label: "Rörelseomfång", value: "340° × 45°", highlight: true },
      { label: "Synfält", value: "110°", highlight: true },
      { label: "Upplösning", value: "2K, 2304 × 1296", highlight: true },
      { label: "Lagring", value: "microSD 128 GB eller iCloud", highlight: true },
      { label: "Abonnemang", value: "Behövs inte, kort eller iCloud", highlight: true },
      { label: "Hubb", value: "Zigbee 3.0 inbyggd" },
      { label: "Ström", value: "USB-C, 5 V 2 A" },
    ],
    verdict:
      "Aqara Camera Hub G3 kostar 1 299 kronor och gör två saker på en gång: den filmar i 2K och den är navet för resten av det smarta hemmet. Avstängningen är mekanisk och syns på håll.\n\nAqara kallar den hårdvarumaskering. Linsenheten vrids bort så att objektivet inte längre pekar in i rummet, och framsidan visar ett sovande ansikte i stället. Det går att göra för hand och det går att lägga i en regel, till exempel att kameran somnar när ytterdörren öppnas. Därmed är det den enda kameran utom Arlo där avstängningen kan ske utan att någon kommer ihåg den. Ovanpå det kommer lagringen: HomeKit Secure Video krypterar materialet och lägger det i din egen iCloud i stället för hos kameratillverkaren, och minneskort finns som väg för den som står utanför Apple. Den inbyggda Zigbee-hubben är det tredje argumentet, för ska du köpa en hubb ändå försvinner prisskillnaden mot en enklare kamera.\n\nDen lutar bara 45 grader. Tapo C225 klarar 149 och ser därmed golvet framför sig, vilket är precis det man vill ha om kameran finns där för att upptäcka att någon ramlat. Minneskortstaket på 128 GB är också snålt när Tapo tar 512.\n\nKöp den om du är i Apples ekosystem eller ändå ska ha en hubb. Då får du tre produkter för priset av en och en avstängning som sköter sig själv. Ska den bara vara kamera kostar den 850 kronor för mycket, och Tapo C225 gör det viktigaste bättre.",
  },
  {
    id: "tapo-c220",
    name: "TP-Link Tapo C220",
    shortName: "Tapo C220",
    brand: "TP-Link",
    image: productImage(INOMHUSKAMERA.slug, "tapo-c220"),
    tagline: "449 kronor för hela rummet i 2K, om ingen behöver se att den är av.",
    scores: { avstangning: 2.5, bild: 4, kostnad: 5, hemtjanst: 3.5, prisvarde: 5 },
    price: 449,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/tp-link-tapo-c220-pantilt-ai-overvakningskamera-p65839",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 461, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Mest kamera per krona",
    pros: [
      "449 kronor för 2K, 360 graders panorering och minneskort upp till 512 GB",
      "461 kundomdömen med snittet 4,5, näst mest prövad av kamerorna",
      "Detekterar barnskrik, hundskall och glaskross utöver rörelse och personer",
      "Sekretesszoner som svartar ut ett område, utöver vanliga detekteringszoner",
      "Siren på 99 dB och wifi 6-stöd",
    ],
    cons: [
      "Ingen fysisk avstängning, bara programläget i appen",
      "Drifttemperatur 0 till 40 grader, så inte för ouppvärmda utrymmen",
      "Standardinställningen är 15 bilder per sekund",
      "76 graders objektiv, smalast tillsammans med C225",
    ],
    specs: [
      { label: "Avstängning", value: "Programläge, bild och ljud", highlight: true },
      { label: "Rörelseomfång", value: "360° × 114°", highlight: true },
      { label: "Synfält", value: "76° horisontellt, 90° diagonalt", highlight: true },
      { label: "Upplösning", value: "2K QHD, 2560 × 1440", highlight: true },
      { label: "Lagring", value: "microSD upp till 512 GB", highlight: true },
      { label: "Abonnemang", value: "Behövs inte, allt sparas på kortet", highlight: true },
      { label: "Detektering", value: "Person, husdjur, barnskrik, glaskross" },
      { label: "Siren", value: "99 dB" },
      { label: "Drifttemperatur", value: "0 till 40 °C" },
    ],
    verdict:
      "Tapo C220 kostar 449 kronor och ger 2K, 360 graders panorering och minneskort upp till ett halvt terabyte. 461 köpare har satt snittet 4,5.\n\nFör pengarna är det orimligt mycket kamera. Den vrider sig 360 grader horisontellt och 114 vertikalt, den skiljer på barnskrik, hundskall och glaskross i stället för att bara larma på rörelse, och den har både detekteringszoner och sekretesszoner, alltså områden den slutar titta på snarare än bara slutar notisa om. Sirenen går på 99 dB. Ingenting av det kräver abonnemang, eftersom allt hamnar på kortet i kameran.\n\nDen saknar det sidan väger tyngst, och bristen kostar 150 kronor att åtgärda. C220 har ingen fysisk avstängning. Programläget stänger visserligen av både bild och ljud, men du kan inte se från soffan att det är på, och den som står framför kameran kan inte se det alls. Systermodellen C225 har knappen och kostar 599.\n\nKöp den till förrådet, hallen, tvättstugan eller vilket rum som helst där ingen annan ska behöva känna sig trygg framför objektivet. Där är den kategorins självklara köp. Ska den stå i vardagsrummet är de 150 kronorna den bästa uppgraderingen på hela sidan. Och ställ den inte i ett ouppvärmt garage: drifttemperaturen börjar vid noll grader.",
  },
  {
    id: "arlo-essential-3-ptz-indoor",
    name: "Arlo Essential 3 HD PTZ Indoor, 2-pack",
    shortName: "Essential 3 PTZ",
    brand: "Arlo",
    image: productImage(INOMHUSKAMERA.slug, "arlo-essential-3-ptz-indoor"),
    tagline: "Lutar ner linsen i foten så fort du kommer hem, utan att du gör något.",
    scores: { avstangning: 5, bild: 3, kostnad: 1, hemtjanst: 5, prisvarde: 2.5 },
    price: 1290,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/arlo-essential-3-hd-ptz-overvakningskamera-inomhus-2-pack-p66622",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst när ingen ska behöva komma ihåg det",
    pros: [
      "Kameran lutar ner tills linsen ligger mot foten så fort systemet står i standby eller hemmaläge",
      "Rörelsedetekteringen och mikrofonen stängs av samtidigt som linsen vänds bort",
      "Går också att aktivera direkt med ett tryck i appen, eller läggas i en egen rutin",
      "130 graders objektiv och 360 × 180 graders rörelse, bäst täckning av alla sju",
      "Trettio dagars Arlo Secure ingår vid köp",
      "Två kameror för 1 290 kronor, 645 per styck",
    ],
    cons: [
      "Ingen lokal lagring alls, så utan abonnemang sparas ingenting",
      "Arlo Secure kostar 149 kronor i månaden för att täcka båda kamerorna, alltså 1 788 kronor om året",
      "1080p, lägst upplösning av kamerorna",
      "Bara svartvitt infrarött mörkerseende, inget färgläge",
      "AI-detekteringen ligger bakom abonnemanget",
    ],
    specs: [
      { label: "Avstängning", value: "Linsen lutar ner i foten, automatiskt", highlight: true },
      { label: "Rörelseomfång", value: "360° × 180°", highlight: true },
      { label: "Synfält", value: "130°", highlight: true },
      { label: "Upplösning", value: "1080p", highlight: true },
      { label: "Lagring", value: "Endast moln", highlight: true },
      { label: "Abonnemang", value: "Arlo Secure, 149 kr/mån för båda", highlight: true },
      { label: "Antal", value: "2 kameror" },
      { label: "Mörkerseende", value: "IR, svartvitt" },
      { label: "Drifttemperatur", value: "0 till 45 °C" },
    ],
    verdict:
      "Arlo Essential 3 PTZ Indoor är två kameror för 1 290 kronor med kategorins bästa avstängning och kategorins sämsta kalkyl efter köpet.\n\nAvstängningen är det bästa som finns här. Ställs systemet i standby eller hemmaläge lutar kameran ner tills objektivet ligger an mot foten, och rörelsedetekteringen och mikrofonen slås av i samma rörelse. Du behöver inte komma ihåg någonting, vilket är skillnaden mot varje knapp och varje skydd i lådan, och det syns tvärs över rummet att linsen pekar i golvet. Vill du styra det för hand räcker ett tryck i appen. För hemtjänstfallet är det här den bästa kameran av de sju: ställ in att inspelning bara sker i bortaläget, så är linsen fysiskt bortvänd varje gång någon arbetar i hemmet, och personalen kan se det själv. Täckningen är dessutom bäst i test, 130 graders objektiv och 360 × 180 graders rörelse.\n\nSedan kostnaden. Det finns ingen lokal lagring, så utan abonnemang sparas ingenting alls. Arlo Secure går på 149 kronor i månaden för att täcka båda kamerorna, alltså 1 788 kronor om året ovanpå de 1 290 du redan betalat. Bilden stannar på 1080p och mörkerseendet är svartvitt.\n\nKöp den om det viktigaste är att kameran är bevisligt avstängd när någon annan är i rummet, och om du accepterar en månadskostnad för att över huvud taget spara något. Är svaret på det andra nej gör Tapo C225 det viktigaste nästan lika bra, i 2K, för 599 kronor och noll i månaden.",
  },
  {
    id: "tapo-c100",
    name: "TP-Link Tapo C100",
    shortName: "Tapo C100",
    brand: "TP-Link",
    image: productImage(INOMHUSKAMERA.slug, "tapo-c100"),
    tagline: "279 kronor för ett rum du bara vill kunna titta in i.",
    scores: { avstangning: 2.5, bild: 2.5, kostnad: 5, hemtjanst: 2.5, prisvarde: 5 },
    price: 279,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/tp-link-tapo-c100-overvakningskamera-p62680",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 578, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för förrådet och garaget",
    pros: [
      "279 kronor, billigast av kamerorna med bred marginal",
      "578 kundomdömen med snittet 4,5, fler än någon annan produkt vi rankat i någon kategori",
      "99 graders objektiv, bredare än både C220 och C225",
      "Minneskort upp till 512 GB i kameran och inget abonnemangskrav",
      "Samma programläge som övriga Tapo stänger av både bild och ljud",
    ],
    cons: [
      "Ingen fysisk avstängning",
      "Fast kamera utan panorering, så den ser den del av rummet den råkar peka mot",
      "1080p, halva upplösningen mot systermodellerna",
      "Drifttemperatur 0 till 40 grader",
    ],
    specs: [
      { label: "Avstängning", value: "Programläge, bild och ljud", highlight: true },
      { label: "Rörelseomfång", value: "Fast, vrider sig inte", highlight: true },
      { label: "Synfält", value: "99° horisontellt, 117° diagonalt", highlight: true },
      { label: "Upplösning", value: "1080p, 1920 × 1080", highlight: true },
      { label: "Lagring", value: "microSD upp till 512 GB", highlight: true },
      { label: "Abonnemang", value: "Behövs inte, allt sparas på kortet", highlight: true },
      { label: "Mörkerseende", value: "850 nm IR, upp till 12 m" },
      { label: "Drifttemperatur", value: "0 till 40 °C" },
      { label: "Pris per kamera", value: "279 kr" },
    ],
    verdict:
      "Tapo C100 kostar 279 kronor, filmar i 1080p och står stilla. Den är också den mest omdömda produkten vi stött på i någon kategori: 578 köpare, snittet 4,5.\n\nDet underlaget är värt något i sig. Ingen jämförelsesida kan skapa 578 omdömen, och att så många satt upp den och blivit nöjda säger att den gör det den lovar. För 279 kronor får du ett 99 graders objektiv, alltså faktiskt bredare än de dyrare systermodellernas, minneskort upp till 512 GB och samma programläge som resten av familjen, det som stänger av bild och ljud och inte bara inspelningen. Ingenting kräver abonnemang.\n\nDen står däremot still, och 1080p är halva upplösningen mot C220. En fast kamera i ett hörn ser den fjärdedel av rummet den pekar mot, och det finns ingen fysisk avstängning, bara läget i appen.\n\nKöp den till förrådet, till garaget om det är uppvärmt, eller som första kamera för att ta reda på om man alls vill ha en. Där gör den precis sitt jobb för under trehundra kronor. Ska den stå i ett rum där folk lever är 170 kronor extra för C220 eller 320 för C225 den bästa uppgraderingen i hela kategorin.",
  },
  {
    id: "ring-pan-tilt-indoor",
    name: "Ring Pan-Tilt Indoor Camera",
    shortName: "Pan-Tilt Indoor",
    brand: "Ring",
    image: productImage(INOMHUSKAMERA.slug, "ring-pan-tilt-indoor"),
    tagline: "Linsskyddet sitter fast på kameran, så det kan inte hamna i en låda.",
    scores: { avstangning: 4, bild: 3, kostnad: 1.5, hemtjanst: 2.5, prisvarde: 3 },
    price: 799,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/ring-pan-tilt-indoor-camera-svart-p65887",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för den som redan har Ring",
    pros: [
      "Linsskyddet är inbyggt i kameran, inte ett löst tillbehör som kan tappas bort",
      "360 graders panorering och 169 graders lutning täcker hela rummet",
      "143 graders objektiv, näst bredast av alla sju",
      "Färgseende i mörker, vilket Arlo saknar i samma prisklass",
      "Ring garanterar säkerhetsuppdateringar i minst fyra år efter att modellen slutat säljas",
      "Nätadapter, väggfäste, monteringsplatta och installationskit ingår",
    ],
    cons: [
      "Ingen lokal lagring, så utan abonnemang sparas ingenting",
      "Ring Basic kostar 3,99 euro i månaden, alltså cirka 45 kronor, för en enda kamera",
      "1080p, lägre upplösning än systermodellen Indoor Cam Plus som kostar hundra mindre",
      "Skyddet måste fällas för hand, och kan inte läggas i en rutin",
      "799 kronor plus abonnemang, mot 599 för Tapo C225 utan",
    ],
    specs: [
      { label: "Avstängning", value: "Linsskydd inbyggt på kameran", highlight: true },
      { label: "Rörelseomfång", value: "360° × 169°", highlight: true },
      { label: "Synfält", value: "143° diagonalt", highlight: true },
      { label: "Upplösning", value: "1080p", highlight: true },
      { label: "Lagring", value: "Endast moln", highlight: true },
      { label: "Abonnemang", value: "Ring Basic, 3,99 €/mån", highlight: true },
      { label: "Mörkerseende", value: "Färg" },
      { label: "Siren", value: "72 dB" },
      { label: "Drifttemperatur", value: "-20 till 45 °C" },
    ],
    verdict:
      "Ring Pan-Tilt Indoor kostar 799 kronor, panorerar 360 grader och lutar 169. Linsskyddet sitter inbyggt i kameran i stället för löst i förpackningen.\n\nDet är den bättre lösningen av Rings två, eftersom ett skydd som sitter fast också används. Kombinationen med 143 graders objektiv, hela rummets rörelseomfång och färgseende i mörker gör den till en genomtänkt kamera för ett vardagsrum, och Ring lovar säkerhetsuppdateringar i minst fyra år efter att modellen slutat säljas, vilket ingen annan tillverkare här sätter på pränt.\n\nSedan de tre sakerna som drar ner den. Det finns ingen lokal lagring, så utan Ring Basic för 3,99 euro i månaden sparas ingenting alls, och det väger tungt när materialet är inomhusbilder från ditt eget hem. Upplösningen stannar på 1080p, medan systermodellen ger 2K för hundra kronor mindre. Och skyddet måste fällas för hand varje gång.\n\nKöp den om du redan har Ring i huset och vill hålla allt i en app. Då är den kategorins bästa Ring-kamera och skyddet sitter där det ska. Har du inget Ring sedan tidigare får du hos Tapo C225 samma 360 graders täckning, 2K i stället för 1080p, ett skydd du också kan se, och ingen månadskostnad, för tvåhundra kronor mindre.",
  },
  {
    id: "ring-indoor-cam-plus",
    name: "Ring Indoor Camera Plus",
    shortName: "Indoor Cam Plus",
    brand: "Ring",
    image: productImage(INOMHUSKAMERA.slug, "ring-indoor-cam-plus"),
    tagline: "Skarpast bild av de fasta kamerorna, om molnet inte stör dig.",
    scores: { avstangning: 3.5, bild: 3.5, kostnad: 1.5, hemtjanst: 2, prisvarde: 3.5 },
    price: 699,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/ring-indoor-camera-plus-retinal-2k-overvakningskamera-svart-p66702",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för ett hörn du vill se skarpt",
    pros: [
      "2K, 2560 × 1440, högre upplösning än både Arlo och systermodellen Pan-Tilt",
      "115 graders objektiv, bredast av de fasta kamerorna",
      "Ett linsskydd ligger i förpackningen",
      "Liten, 5 × 5 × 9,7 cm, och drivs via USB-C med nätadapter som ingår",
      "Ring garanterar säkerhetsuppdateringar i minst fyra år efter att modellen slutat säljas",
      "699 kronor, billigast av de tre abonnemangsberoende",
    ],
    cons: [
      "Ingen lokal lagring, så utan abonnemang sparas ingenting",
      "Ring Basic kostar 3,99 euro i månaden, alltså cirka 45 kronor, för en enda kamera",
      "Fast kamera, så den ser bara den del av rummet den pekar mot",
      "Linsskyddet är löstagbart, vilket också betyder att det kan bli liggande i lådan",
      "60 grader vertikalt är smalt, så den ser lite av golvet framför sig",
    ],
    specs: [
      { label: "Avstängning", value: "Löst linsskydd i lådan", highlight: true },
      { label: "Rörelseomfång", value: "Fast, vrider sig inte", highlight: true },
      { label: "Synfält", value: "115° horisontellt, 138° diagonalt", highlight: true },
      { label: "Upplösning", value: "2K, 2560 × 1440", highlight: true },
      { label: "Lagring", value: "Endast moln", highlight: true },
      { label: "Abonnemang", value: "Ring Basic, 3,99 €/mån", highlight: true },
      { label: "Ström", value: "USB-C, adapter ingår" },
      { label: "Siren", value: "75 dB" },
      { label: "Storlek", value: "5 × 5 × 9,7 cm" },
    ],
    verdict:
      "Ring Indoor Camera Plus kostar 699 kronor och ger 2K från ett 115 graders objektiv. Det är den skarpaste av de fasta kamerorna, och ett linsskydd ligger i lådan.\n\nDen gör två saker bättre än sina konkurrenter i prisklassen. Upplösningen är högre än både Arlos och systermodellen Pan-Tilts, trots att den kostar mindre än båda, och objektivet är bredast av de fasta kamerorna, vilket är det som avgör hur mycket av rummet en kamera som inte vrider sig faktiskt ser. Den är dessutom liten nog att stå på en hylla utan att dominera den, och Ring lovar säkerhetsuppdateringar i minst fyra år efter att modellen slutat säljas.\n\nMen den sparar ingenting själv. Utan Ring Basic för 3,99 euro i månaden får du en notis och en direktbild, och sedan är det borta. Materialet från en kamera i ett vardagsrum är det känsligaste ett hem producerar, och att det bara finns på Amazons servrar och inte på ett kort i kameran är en avvägning man ska göra medvetet snarare än få på köpet. Linsskyddet är dessutom löst, och det som ligger i lådan har en tendens att stanna där.\n\nKöp den om du har en bestämd punkt du vill se skarpt, ett hörn, en ytterdörr inifrån, en hall, och om molnet inte stör dig. Vill du i stället se hela rummet och slippa månadskostnaden kostar Tapo C225 hundra kronor mindre och gör båda delarna.",
  },
];

export const INOMHUSKAMERA_PRODUCTS: Product[] = resolveProducts(
  INOMHUSKAMERA,
  SEEDS,
);

/**
 * Produkter vi tittat på och valt bort. Skälet står utskrivet, eftersom en
 * bortvald produkt utan motivering ser ut som ett förbiseende.
 */
export const INOMHUSKAMERA_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "TP-Link",
    name: "Tapo C125",
    reason:
      "Har samma knapp på höljet som vinnaren C225 och kostar 549 kronor i stället för 599, 50 kronor billigare. Rankas ändå inte, eftersom den är fast och inte panorerar: 140 graders synfält mot C225:s 360 graders rörelseomfång. För femtio kronor är det ingen besparing värd namnet. Köp den bara om kameran ska sitta i ett hörn och peka åt ett bestämt håll för alltid.",
    approxPrice: 549,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/tp-link-tapo-c125-overvakningskamera-p65453",
  },
  {
    brand: "eufy",
    name: "Indoor Cam C220 och S350",
    reason:
      "eufy anger 2K, 360 graders panorering, lokal lagring och ett privatläge för Indoor Cam C220, alltså samma uppsättning som Tapo C220 men för 499 kronor i stället för 449. Avstängningen sker i appen hos båda. S350 kostar 1 390 kronor, mer än Aqara G3 som dessutom är hubb för resten av hemmet. Ingen av dem gör något kategorin inte redan gör billigare, och det är hela skälet. C220 har 77 kundomdömen och är en rimlig kandidat till rankningen nästa gång sidan görs om.",
    approxPrice: 499,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/eufy-indoor-cam-c220-overvakningskamera-inomhus-p65738",
  },
  {
    brand: "Imou",
    name: "Ranger RC 2K+",
    reason:
      "399 kronor för 4 megapixel, 355 graders panorering och minneskort upp till 256 GB är ett bra pris. Men synfältet är 74 grader horisontellt, klart smalast av alla kameror, och det märks mer inomhus än ute eftersom avstånden är korta. Elva kundomdömen är dessutom tunt underlag. Fungerar i ett litet rum eller riktad mot en bestämd punkt.",
    approxPrice: 399,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/imou-ranger-rc-2k-4-mp-inomhuskamera-p66314",
  },
  {
    brand: "Google",
    name: "Nest Cam Indoor",
    reason:
      "1 090 kronor för 1080p och 135 graders fast synfält är dyrt i den här kategorin, och den har varken linsskydd eller panorering. Det som talar för den är att maskininlärningen körs på enheten i stället för i molnet, vilket är ovanligt, plus 25 kundomdömen med snittet 4,5. Rankas inte eftersom du betalar dubbla priset mot Tapo C225 för sämre bild, sämre täckning och en avstängning som bara finns i appen.",
    approxPrice: 1090,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/google-nest-cam-indoor-p51916",
  },
  {
    brand: "Ubiquiti",
    name: "UniFi G6-serien",
    reason:
      "PoE-kameror som förutsätter en UniFi-inspelare och nätverkskabel dragen till varje kamera. Ger den bästa tänkbara lagringen, helt lokal och oberoende av varje molntjänst, men bygget kostar långt mer än kamerorna och riktar sig till den som redan har utrustningen. Egen sida om vi täcker fasta system.",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/ubiquiti-g6-instant-4k-wifi-overvakningskamera-p60165",
  },
  {
    brand: "Nedis",
    name: "SmartLife BabyCam",
    reason:
      "Marknadsförs som babyvakt snarare än övervakningskamera, och den skillnaden är verklig: en babyvakt ska ge ljud och en larmgräns, inte inspelningshistorik och personigenkänning. Hör hemma i en egen jämförelse. Nämns här eftersom barnrummet är ett av de vanligaste skälen att köpa en inomhuskamera, och eftersom en kamera i ett barnrum ställer alla frågorna på sin spets.",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/nedis-smartlife-babycam-full-hd-med-morkerseende-p58041",
  },
];

export const INOMHUSKAMERA_FAQ = [
  {
    question: "Vilken inomhuskamera är bäst 2026?",
    answer:
      "TP-Link Tapo C225 för 599 kronor hos Kjell. Den har en knapp på höljet som fäller ner ett skydd över linsen eller vrider bort den helt, den täcker hela rummet med 360 graders panorering och 149 graders lutning, den spelar in i 2K på ett minneskort i kameran och ingenting kräver abonnemang. Vill du att avstängningen ska ske av sig själv är Aqara Camera Hub G3 eller Arlo Essential 3 PTZ svaret, och vill du ha billigast möjliga är Tapo C220 för 449 kronor nästan lika bra, men utan den fysiska avstängningen.",
  },
  {
    question: "Får jag ha kamera hemma om jag har hemtjänst?",
    answer:
      "Inte inom privatundantaget. IMY har ett eget exempel för det: får en privatperson regelbundet besök av hemtjänsten omfattas kamerabevakningen inte av undantaget, eftersom personalen besöker hemmet i sin yrkesroll och därmed bevakas under sin arbetstid. Då gäller GDPR, vilket innebär att du behöver en rättslig grund, ska göra en intresseavvägning och ska informera om bevakningen. Det praktiska svaret är att kameran ska vara avstängd när personalen är där, och att en fysisk avstängning är det enda sättet att visa dem att den faktiskt är det.",
  },
  {
    question: "Vad är skillnaden mellan ett linsskydd och privatläge i appen?",
    answer:
      "Ett linsskydd är en mekanism. Det täcker eller vrider bort objektivet, det syns tvärs över rummet och det kräver ingen tillit till programvaran. Ett privatläge i appen är ett löfte om att programvaran gör som den säger, och det löftet kan du inte kontrollera. Arlo Essential 3 PTZ lutar ner linsen i foten när kameran avlarmas. Aqara G3 vänder bort linsen och visar ett sovande ansikte, för hand eller via en regel du bygger. Tapo C225 och C125 har en knapp på höljet. Ring har ett linsskydd, inbyggt på Pan-Tilt och löst hos Indoor Cam Plus. Tapo C220 och C100 har bara programläget.",
  },
  {
    question: "Krävs abonnemang för en inomhuskamera?",
    answer:
      "Det beror på fabrikat, och skillnaden är stor i kronor. TP-Link Tapo, Aqara och Imou sparar allt på ett minneskort i kameran och fungerar fullt ut för noll kronor i månaden. Ring spelar inte in något alls utan Ring Basic, som kostar 3,99 euro i månaden för en kamera, och Arlo kräver Arlo Secure för både molnlagring och AI-detektering, 99 kronor i månaden för en kamera och 149 för flera. Ett Arlo-tvåpack som körs i tre år kostar alltså mer i abonnemang än fyra Tapo C225 kostar att köpa.",
  },
  {
    question: "Ska kameran kunna vrida sig?",
    answer:
      "Inomhus, oftast ja. Avstånden är korta och en fast kamera i ett hörn ser den del av rummet den pekar mot. En kamera med 360 graders panorering ser hela. Skillnaden är större här än utomhus, där en fast kamera med brett synfält täcker en uppfart bra. Tapo C220 och C225, Ring Pan-Tilt, Arlo Essential 3 PTZ och Aqara G3 vrider sig. Tapo C100, Tapo C125 och Ring Indoor Cam Plus gör det inte. Titta samtidigt på lutningen och inte bara på panoreringen: Aqara vrider sig 340 grader i sidled men bara 45 i höjdled, medan Tapo C225 klarar 149 och därför ser golvet framför sig.",
  },
  {
    question: "Kan jag ha kamera i ett barnrum?",
    answer:
      "Juridiskt är det ditt hem och ditt barn, så privatundantaget gäller normalt. Men det är värt att skilja på en babyvakt och en övervakningskamera: en babyvakt ska ge ljud och en larmgräns, medan en övervakningskamera spelar in historik och gör personigenkänning. Ju äldre barnet blir desto rimligare är det att fråga om samtycke, och en kamera med fysisk avstängning gör den frågan konkret i stället för teoretisk.",
  },
  {
    question: "Var ska kameran stå?",
    answer:
      "Högt nog att se över möbler, men inte så högt att du bara ser hjässor. Ungefär i ögonhöjd eller strax över, riktad mot dörren in i rummet snarare än mot rummets mitt, eftersom alla som kommer in passerar dörren. Undvik att rikta den mot ett fönster, eftersom motljus gör ansikten till silhuetter. Och tänk igenom var den inte ska stå: sovrum och badrum är rum där även den egna familjen har rimliga förväntningar på att inte bli filmad.",
  },
  {
    question: "Vad händer med bilderna om tillverkaren lägger ner tjänsten?",
    answer:
      "Med minneskort i kameran händer ingenting. Med molnlagring försvinner både materialet och funktionen. Google lade ner Nest Protect i mars 2025, vilket är vinkeln på vår sida om smarta brandvarnare, och det gällde en produkt som fungerat i åratal. Tapo, Aqara och Imou sparar lokalt. Ring och Arlo gör det inte. Ring anger däremot att modellerna får säkerhetsuppdateringar i minst fyra år efter att de slutat säljas, vilket är ett besked de andra tillverkarna inte ger.",
  },
  {
    question: "Kan jag använda en inomhuskamera som babyvakt?",
    answer:
      "Tekniskt ja, men den är byggd för något annat. En babymonitor larmar aktivt: den har en ljudtröskel som väcker dig, ofta en temperaturmätare, och den fungerar utan internet över egen radio. En inomhuskamera skickar en notis via tillverkarens server, vilket betyder att ett wifi-avbrott eller ett serverfel tystar den utan att du märker det. Vill du ändå göra det: välj en kamera med lokal lagring, sätt ljuddetektering på hög känslighet, och testa hela vägen med telefonen på mobildata. Och rikta den så att den ser sängen men inte skötbordet.",
  },
  {
    question: "Hur ofta byter man minneskort i en kamera?",
    answer:
      "Ett microSD-kort i en kamera skrivs över dygnet runt, och det är den hårdaste belastning ett minneskort kan få. Vanliga kort avsedda för foto tar slut på ett till två år i den användningen och slutar då oftast tyst, vilket betyder att kameran ser ut att spela in men inte gör det. Köp ett kort märkt för övervakning eller med uthållighetsklassning, och gör det till en vana att var tredje månad spola tillbaka och kontrollera att gårdagens inspelning faktiskt finns. Det är samma sorts kontroll som testknappen på en brandvarnare, och den glöms lika ofta.",
  },
];
