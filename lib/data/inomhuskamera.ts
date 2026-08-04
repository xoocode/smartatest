import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { INOMHUSKAMERA } from "@/lib/test-pages";

/**
 * Inomhuskameror. Underlag i .agent/research/inomhuskamera.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, upplösning, synfält, panorering, lagring,
 * kundbetyg, vad som ligger i lådan och vilka funktioner butiken märker som
 * abonnemangsberoende. Läst på Kjells egen sida 2026-08-03. Uppgifterna om
 * avstängning och linsskydd är lästa i tillverkarens egen dokumentation, se
 * lib/sources.ts.
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
 * ## Produktfyndet: ett linsskydd är den enda integritet du kan se
 *
 * | Nivå | Produkt |
 * |---|---|
 * | Automatiskt skydd som stängs när larmet slås av | Arlo Essential 3 PTZ Indoor |
 * | Fysisk knapp som fäller ner skydd eller vrider bort linsen | Tapo C225 och C125 |
 * | Fysiskt linsskydd i lådan | Ring Indoor Cam Plus och Pan-Tilt |
 * | Bara programläge | Tapo C220, Tapo C100, Aqara G3 |
 *
 * Arlos automatiska skydd har en brasklapp i tillverkarens egna ord: med
 * kontinuerlig inspelning påslagen står skyddet kvar öppet.
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
    tagline: "Fysisk knapp som vrider bort linsen, för 599 kronor.",
    scores: { avstangning: 4, bild: 4.5, kostnad: 5, hemtjanst: 4, prisvarde: 5 },
    price: 599,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/tp-link-tapo-c225-ai-overvakningskamera-p65170",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 168, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst i test",
    pros: [
      "Fysisk integritetsknapp som enligt TP-Link fäller ner ett skydd eller vrider bort linsen helt",
      "Programläget stänger av både bild och ljud, inte bara inspelningen",
      "360 grader horisontellt och 149 vertikalt tar hela rummet, golv och tak inräknat",
      "2K QHD på minneskort upp till 512 GB, och ingenting kräver abonnemang",
      "168 kundomdömen med snittet 4,5",
      "599 kronor, under en tredjedel av vad de abonnemangsberoende kostar",
    ],
    cons: [
      "15 bilder per sekund, lägst av kamerorna",
      "Bara 2,4 GHz wifi, vilket kan vara trångt i ett hem med många enheter",
      "Skyddet måste tryckas ner för hand, till skillnad från Arlos som stängs av sig självt",
      "Kjell anger inget horisontellt synfält för objektivet, bara rörelseomfånget",
    ],
    specs: [
      { label: "Avstängning", value: "Fysisk knapp, vrider bort linsen", highlight: true },
      { label: "Programläge", value: "Stänger av bild och ljud", highlight: true },
      { label: "Upplösning", value: "2K QHD, 2560 × 1440", highlight: true },
      { label: "Täckning", value: "360° × 149°", highlight: true },
      { label: "Lagring", value: "microSD upp till 512 GB", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Ström", value: "Nätadapter 12 V, ingår" },
      { label: "Bildfrekvens", value: "15 fps" },
    ],
    verdict:
      "Tapo C225 kostar 599 kronor och har ett fysiskt linsskydd du ser från andra sidan rummet. 360 grader horisontellt och 149 vertikalt tar hela rummet, golv och tak inräknat.\n\nTP-Links egen supportsida listar C225 bland de modeller som har en fysisk integritetsknapp, och beskriver vad den gör: fäller ner ett skydd över linsen eller vrider bort linsen helt. Då litar du inte på ett företags programvara, utan ser med egna ögon att objektivet pekar in i höljet. För en kamera som står i ett vardagsrum eller ett sovrum är det inte en detalj, det är hela frågan.\n\nProgramläget är dessutom mer ärligt än de flestas. TP-Link skriver att det stoppar streaming och inspelning av både video och ljud. Flera konkurrenter pausar bara inspelningen och låter mikrofonen vara.\n\nTäckningen är den bästa av kamerorna. 360 grader horisontellt och 149 vertikalt betyder att en enda kamera ser hela rummet inklusive golvet framför den, vilket är det som spelar roll om du har den för att se om katten kommit in eller om någon ramlat.\n\nAllt sparas på ett minneskort i kameran. Ingenting kräver abonnemang, ingenting lämnar huset om du inte ber om det. För inomhusbilder, som är det känsligaste material ett hem producerar, är det en principiell skillnad och inte bara en ekonomisk.\n\n599 kronor. Ring tar 699 för en fast kamera i 1080p vars inspelning kräver abonnemang. Arlo tar 1 290 för två kameror i 1080p som inte sparar något alls utan att du betalar.\n\nDet enda som saknas mot toppen är automatiken. Arlos skydd stängs av sig självt när larmet slås av. Här måste du trycka på knappen, och en säkerhetsfunktion man ska komma ihåg blir sällan använd.",
  },
  {
    id: "tapo-c220",
    name: "TP-Link Tapo C220",
    shortName: "Tapo C220",
    brand: "TP-Link",
    image: productImage(INOMHUSKAMERA.slug, "tapo-c220"),
    tagline: "461 omdömen, 449 kronor och hela rummet, men bara mjukvaruläge.",
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
      "Kjells specifikation anger både Aktivitetszoner och Privata zoner, på varsin rad",
      "Detekterar barnskrik, hundskall och glaskross utöver rörelse och personer",
      "Siren på 99 dB och wifi 6-stöd",
    ],
    cons: [
      "Inget fysiskt linsskydd, bara programläget i appen",
      "Drifttemperatur 0 till 40 grader, så inte för ouppvärmda utrymmen",
      "Standardinställningen är 15 bilder per sekund",
      "Nätadaptern har 3 meter kabel, vilket styr var kameran kan stå",
    ],
    specs: [
      { label: "Avstängning", value: "Programläge, bild och ljud", highlight: true },
      { label: "Programläge", value: "Stänger av bild och ljud", highlight: true },
      { label: "Upplösning", value: "2K 4 MP, 2560 × 1440", highlight: true },
      { label: "Täckning", value: "360° × 114°", highlight: true },
      { label: "Lagring", value: "microSD upp till 512 GB", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Detektering", value: "Person, husdjur, barnskrik, glaskross" },
      { label: "Siren", value: "99 dB" },
      { label: "Mörkerseende", value: "Upp till 10 m" },
    ],
    verdict:
      "Tapo C220 kostar 449 kronor och har 461 kundomdömen på 4,5. Butiksspecifikationen skiljer dessutom detekteringszon från sekretesszon, vilket ingen annan här gör.\n\n461 kundomdömen med 4,5 i snitt är ett underlag ingen jämförelsesida kan skapa själv. Bara systermodellen C100 har fler. För 449 kronor får du 2K, 360 graders panorering, minneskort upp till ett halvt terabyte och en detektering som skiljer på barnskrik, hundskall och glaskross. Det är orimligt mycket kamera för pengarna.\n\nEn detalj som förtjänar beröm: Kjells specifikation för C220 anger Aktivitetszoner och Privata zoner på två separata rader. Det är tredje gången i hela vår kartläggning av kameror som en butik gör den skillnaden tydlig, och det är den skillnaden som avgör om du kan dölja ett område eller bara sluta få notiser om det.\n\nSkälet till att den inte vinner är enkelt och kostar 150 kronor att åtgärda. C220 har inget fysiskt linsskydd. Avstängningen sker i appen, och programläget stänger visserligen av både bild och ljud enligt TP-Link, men du kan inte se från soffan att det är på. Systermodellen C225 kostar 599 och har en fysisk knapp som vrider bort linsen.\n\nStår kameran i ett förråd, en hall eller ett rum ingen vistas i är den skillnaden betydelselös och C220 är det klart bästa köpet här. Står den i ett vardagsrum där familjen faktiskt lever är den avgörande.\n\nEn praktisk sak till: drifttemperaturen börjar vid noll grader. Den ska inte stå i ett ouppvärmt garage eller en oisolerad förstuga på vintern.",
  },
  {
    id: "aqara-g3",
    name: "Aqara Camera Hub G3",
    shortName: "Camera Hub G3",
    brand: "Aqara",
    image: productImage(INOMHUSKAMERA.slug, "aqara-g3"),
    tagline: "Kamera och smart hem-hubb i ett, med lagring i iCloud som alternativ.",
    scores: { avstangning: 2.5, bild: 4, kostnad: 4.5, hemtjanst: 4, prisvarde: 3 },
    price: 1299,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/aqara-camera-hub-g3-overvakningskamera-p51976",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 27, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som redan har Apple",
    pros: [
      "HomeKit Secure Video lagrar i iCloud med Apples kryptering i stället för hos kameratillverkaren",
      "Inbyggd Zigbee 3.0-hubb, så kameran blir också navet för sensorer och lampor",
      "2K och 340 graders panorering, plus minneskort som alternativ till molnet",
      "Wifi på både 2,4 och 5 GHz, till skillnad från flera konkurrenter",
      "Nätadapter ingår, och 27 kundomdömen med snittet 4,5",
    ],
    cons: [
      "Inget fysiskt linsskydd dokumenterat, samma svaghet som Tapo C220",
      "Minneskort bara upp till 128 GB, mot 512 hos Tapo",
      "1 299 kronor, nästan tre gånger C220 för jämförbar bild",
      "110 graders synfält är smalast bland de panorerande kamerorna här",
    ],
    specs: [
      { label: "Avstängning", value: "Programläge", highlight: true },
      { label: "Programläge", value: "Ej dokumenterat i detalj", highlight: true },
      { label: "Upplösning", value: "2K, 2304 × 1296", highlight: true },
      { label: "Täckning", value: "340° panorering", highlight: true },
      { label: "Lagring", value: "microSD 128 GB, HomeKit Secure Video", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Hubb", value: "Zigbee 3.0 inbyggd" },
      { label: "Synfält", value: "110°" },
    ],
    verdict:
      "Aqara Camera Hub G3 lagrar via HomeKit Secure Video, alltså krypterat i iCloud i stället för hos tillverkaren. Den är också en Matter-hubb.\n\nDe flesta kameror väljer mellan minneskort i enheten och molnlagring hos tillverkaren. G3 stöder HomeKit Secure Video, vilket betyder att materialet krypteras och lagras i din egen iCloud i stället för på Aqaras servrar. För den som redan betalar Apple för lagring tillkommer ingen kostnad, och för den som är obekväm med att inomhusbilder ligger hos en kameratillverkare är det ett verkligt alternativ. Minneskort finns dessutom som väg.\n\nDen inbyggda Zigbee-hubben är det andra argumentet. Står du i begrepp att köpa en hubb ändå, för sensorer eller lampor, är prisskillnaden mot en enklare kamera i praktiken borta.\n\nMen den saknar det sidan väger tyngst. Vi har inte hittat någon uppgift om ett fysiskt linsskydd, och betygsätter därför på det programläge som finns dokumenterat. Det placerar den i samma fack som Tapo C220, som kostar 850 kronor mindre.\n\nMinneskortstaket på 128 GB är också snålt när Tapo klarar 512, och 110 graders synfält är det smalaste bland de panorerande. Att den vrider sig 340 grader hjälper när du tittar live, men mindre när du letar i inspelningar efteråt.\n\nKöp den om du är i Apples ekosystem eller vill ha hubben. Köp annars C225 och lägg mellanskillnaden på något annat.",
  },
  {
    id: "arlo-essential-3-ptz-indoor",
    name: "Arlo Essential 3 HD PTZ Indoor, 2-pack",
    shortName: "Essential 3 PTZ",
    brand: "Arlo",
    image: productImage(INOMHUSKAMERA.slug, "arlo-essential-3-ptz-indoor"),
    tagline: "Skyddet stängs av sig självt, och står öppet om du betalar mest.",
    scores: { avstangning: 5, bild: 2.5, kostnad: 1, hemtjanst: 5, prisvarde: 2.5 },
    price: 1290,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/arlo-essential-3-hd-ptz-overvakningskamera-inomhus-2-pack-p66622",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Enda automatiska linsskyddet",
    pros: [
      "Linsskyddet täcker linsen automatiskt när kameran avlarmas och öppnas när den larmas på",
      "Trettio dagars Arlo Secure ingår vid köp, så du kan pröva vad abonnemanget faktiskt ger",
      "Rörelsedetektering, ljuddetektering och mikrofonen stängs av när skyddet är stängt",
      "Att live-titta när kameran inte är inställd på inspelning kräver lösenord, ansikte eller fingeravtryck",
      "360 graders panorering och 180 graders lutning täcker hela rummet",
      "Två kameror för 1 290 kronor, 645 per styck",
    ],
    cons: [
      "Med kontinuerlig inspelning påslagen står skyddet kvar öppet, enligt Arlos egen dokumentation",
      "AI-detektering och molnlagring kräver Arlo Secure enligt Kjells specifikation",
      "Ingen lokal lagring alls",
      "1080p, lägst upplösning av kamerorna",
      "Bara svartvitt infrarött mörkerseende, inget färgläge",
      "Skyddet får enligt Arlo inte stängas för hand, utan bara genom att avlarma i appen",
    ],
    specs: [
      { label: "Avstängning", value: "Automatiskt skydd vid avlarmning", highlight: true },
      { label: "Programläge", value: "Skydd, mikrofon och detektering av", highlight: true },
      { label: "Upplösning", value: "1080p, 2 MP", highlight: true },
      { label: "Täckning", value: "360° × 180°", highlight: true },
      { label: "Lagring", value: "Moln, kräver Arlo Secure", highlight: true },
      { label: "Kräver abonnemang", value: "Ja, för AI och lagring" },
      { label: "Antal", value: "2 kameror" },
      { label: "Mörkerseende", value: "IR, svartvitt" },
      { label: "Siren", value: "80 dB inbyggd" },
    ],
    verdict:
      "Arlo Essential 3 PTZ har det bäst dokumenterade sekretesskyddet av kamerorna här: 360 graders panorering, 180 graders lutning och zoner som Arlo beskriver utförligt.\n\nBörja med det som är verkligt bra, för det är genuint bäst i test på sin punkt. Linsskyddet är motoriserat och kopplat till larmläget: när du avlarmar kameran täcks linsen automatiskt, och när du larmar på öppnas den. Rörelsedetektering, ljuddetektering och mikrofonen stängs av samtidigt. Du behöver alltså inte komma ihåg någonting, till skillnad från ett skydd du trycker ner för hand.\n\nArlo lägger dessutom till ett skydd ingen annan här har: försöker någon titta live på en kamera som inte är inställd på att spela in krävs kontolösenord, ansiktsigenkänning eller fingeravtryck. Det skyddar mot fel person i din egen app, inte bara mot fel person i rummet.\n\nFör hemtjänstfallet är det här den bästa kameran av de sju. Ställ in att inspelning bara sker i läget Arm Away, så är linsen fysiskt täckt varje gång någon är hemma, och det syns. Arlo skriver samtidigt att skyddet inte får stängas för hand, utan bara genom att avlarma kameran i appen.\n\nSedan brasklappen, i Arlos egna ord: är kontinuerlig inspelning påslagen står skyddet kvar öppet och kameran fortsätter spela in. Kontinuerlig inspelning är en abonnemangsfunktion. Det bäst dokumenterade sekretesskyddet slutar alltså fungera precis när du köper den dyraste nivån.\n\nEn anmärkning om källan, eftersom bedömningen vilar på den: Arlos dokumentation av skyddet gäller Essential Indoor Camera i tredje generationen, alltså den familj Kjells modell tillhör. Vi har inte hittat något dokument som beskriver panoreringsvarianten separat.\n\nOch resten av kalkylen är svag. 1080p är lägst här. Det finns ingen lokal lagring, så utan abonnemang sparas ingenting. AI-detekteringen kräver Arlo Secure enligt butikens egen text. 1 290 kronor för två kameror låter billigt tills man inser att de inte spelar in något förrän man betalar.",
  },
  {
    id: "tapo-c100",
    name: "TP-Link Tapo C100",
    shortName: "Tapo C100",
    brand: "TP-Link",
    image: productImage(INOMHUSKAMERA.slug, "tapo-c100"),
    tagline: "279 kronor och 578 omdömen. Kategorins mest sålda, och den enklaste.",
    scores: { avstangning: 2.5, bild: 2.5, kostnad: 5, hemtjanst: 2.5, prisvarde: 5 },
    price: 279,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/tp-link-tapo-c100-overvakningskamera-p62680",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 578, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Mest omdömd produkt på hela sajten",
    pros: [
      "279 kronor, billigast av kamerorna med bred marginal",
      "578 kundomdömen med snittet 4,5, fler än någon annan produkt vi rankat i någon kategori",
      "Samma programläge som övriga Tapo stänger av både bild och ljud",
      "Minneskort i kameran och inget abonnemangskrav",
    ],
    cons: [
      "Inget fysiskt linsskydd",
      "Fast kamera utan panorering, så den ser en del av rummet",
      "Kjell publicerar ingen specifikation alls för modellen, varken upplösning eller synfält",
      "Ingen av de funktioner som gör C220 och C225 intressanta finns här",
    ],
    specs: [
      { label: "Avstängning", value: "Programläge, bild och ljud", highlight: true },
      { label: "Programläge", value: "Stänger av bild och ljud", highlight: true },
      { label: "Upplösning", value: "Ej angiven av butiken", highlight: true },
      { label: "Täckning", value: "Fast, ingen panorering", highlight: true },
      { label: "Lagring", value: "microSD", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Kundomdömen", value: "578 hos butiken" },
      { label: "Pris per kamera", value: "279 kr" },
      { label: "Mörkerseende", value: "Upp till 10 m" },
    ],
    verdict:
      "Tapo C100 kostar 279 kronor och är den enklaste kameran här. Den är också den mest omdömda produkt vi sett någonstans.\n\n578 kundomdömen med snittet 4,5. Ingen annan produkt vi rankat, i någon kategori, kommer i närheten. Det säger inte att den är bäst, men det säger att väldigt många har köpt den, satt upp den och blivit nöjda, och den sortens underlag är värt att ta på allvar.\n\nFör 279 kronor får du en fast kamera med minneskort och samma programläge för avstängning som resten av Tapo-familjen: ett läge som stänger av både bild och ljud. Ingenting kräver abonnemang.\n\nSedan gränserna. Det finns inget fysiskt linsskydd. Kameran panorerar inte, så den ser den fjärdedel av rummet den råkar peka mot. Och Kjell publicerar ingen teknisk specifikation alls för modellen, vilket är anmärkningsvärt för den mest sålda kameran här: varken upplösning, synfält eller kortstorlek går att läsa i butiken.\n\nDet är därför den inte kan komma högre på bild. Vi bedömer inte en produkt högt på uppgifter som inte går att läsa, oavsett hur många som gillar den.\n\nKöp den till förrådet, garaget om det är uppvärmt, eller som en första kamera för att se om man alls vill ha en. Ska den stå i ett rum där folk lever är 170 kronor extra för C220 eller 320 för C225 den bästa uppgraderingen i hela kategorin.",
  },
  {
    id: "ring-indoor-cam-plus",
    name: "Ring Indoor Camera Plus",
    shortName: "Indoor Cam Plus",
    brand: "Ring",
    image: productImage(INOMHUSKAMERA.slug, "ring-indoor-cam-plus"),
    tagline: "Linsskydd i lådan, 2K i bilden, och ingenting sparat utan abonnemang.",
    scores: { avstangning: 4, bild: 3.5, kostnad: 1.5, hemtjanst: 2.5, prisvarde: 3.5 },
    price: 699,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/ring-indoor-camera-plus-retinal-2k-overvakningskamera-svart-p66702",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Fysiskt linsskydd i lådan",
    pros: [
      "Ett linsskydd ligger i förpackningen enligt butikens egen innehållslista",
      "2K, 2560 × 1440, högre upplösning än både Arlo och Ring Pan-Tilt",
      "Liten, 5 × 5 × 9,7 cm, och drivs via USB-C med nätadapter som ingår",
      "699 kronor, billigast av de tre abonnemangsberoende",
    ],
    cons: [
      "Ingen lokal lagring, så inget sparas utan Ring-abonnemang",
      "Fast kamera med 115 graders horisontellt och bara 60 graders vertikalt synfält",
      "Linsskyddet är löstagbart och manuellt, inte inbyggt eller automatiskt",
      "Inga kundomdömen alls hos butiken",
    ],
    specs: [
      { label: "Avstängning", value: "Fysiskt linsskydd i lådan", highlight: true },
      { label: "Programläge", value: "Ej dokumenterat i detalj", highlight: true },
      { label: "Upplösning", value: "2K, 2560 × 1440", highlight: true },
      { label: "Täckning", value: "Fast, 115° × 60°", highlight: true },
      { label: "Lagring", value: "Endast moln", highlight: true },
      { label: "Kräver abonnemang", value: "Ja, för inspelning" },
      { label: "Ström", value: "USB-C, adapter ingår" },
      { label: "Storlek", value: "5 × 5 × 9,7 cm" },
    ],
    verdict:
      "Eufy Indoor Cam Plus ger 2K för 699 kronor, högre upplösning än både Arlo och Ring, och sekretesskyddet sitter fast på kameran.\n\nDet Ring gör rätt är att lägga ett linsskydd i lådan. Kjells innehållsförteckning listar det som en egen post: ett linsskydd. Det är ett mekaniskt löfte, och det är den sortens integritetskontroll den här sidan väger tyngst. Att det dessutom är den billigaste kameran med 2K-upplösning gör den till en rimlig kandidat på papperet.\n\nSedan lagringen. Det finns ingen lokal. Utan Ring-abonnemang får du en notis och en direktbild, men ingenting sparas. För en kamera vars uppgift ofta är att du ska kunna gå tillbaka och se vad som hände är det en grundinställning som ändrar produktens karaktär.\n\nDet är dessutom inomhusbilder det handlar om. Materialet från en kamera i ett vardagsrum är det känsligaste ett hem producerar, och att det bara existerar på Amazons servrar och inte på ett kort i kameran är en avvägning man ska göra medvetet.\n\nSynfältet är också snålt. 115 grader horisontellt och 60 vertikalt från en fast kamera betyder att du ser ett utsnitt, inte ett rum. Tapo C225 kostar hundra kronor mindre och vrider sig 360 grader.\n\nOch linsskyddet är löstagbart snarare än inbyggt. Det ligger i lådan, vilket också betyder att det kan ligga kvar i lådan.",
  },
  {
    id: "ring-pan-tilt-indoor",
    name: "Ring Pan-Tilt Indoor Camera",
    shortName: "Pan-Tilt Indoor",
    brand: "Ring",
    image: productImage(INOMHUSKAMERA.slug, "ring-pan-tilt-indoor"),
    tagline: "Sekretesskyddet sitter fast på kameran, men bilden hamnar hos Amazon.",
    scores: { avstangning: 4, bild: 3, kostnad: 1.5, hemtjanst: 2.5, prisvarde: 3 },
    price: 799,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/ring-pan-tilt-indoor-camera-svart-p65887",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Skyddet sitter kvar på kameran",
    pros: [
      "Sekretesskyddet är fäst på kameran enligt butiken, så inget löst tillbehör att tappa bort",
      "360 graders panorering och 169 graders lutning täcker hela rummet",
      "Färgseende i mörker, vilket Arlo saknar i samma prisklass",
      "Nätadapter, väggfäste, monteringsplatta och installationskit ingår",
    ],
    cons: [
      "Kjells specifikation bär fotnoten att funktioner kräver Ring Home-abonnemang",
      "Ingen lokal lagring",
      "1080p, lägre upplösning än systermodellen Indoor Cam Plus som kostar hundra mindre",
      "Inga kundomdömen alls hos butiken",
      "799 kronor plus abonnemang, mot 599 för Tapo C225 utan",
    ],
    specs: [
      { label: "Avstängning", value: "Sekretesskydd fäst på kameran", highlight: true },
      { label: "Programläge", value: "Ej dokumenterat i detalj", highlight: true },
      { label: "Upplösning", value: "1080p HD", highlight: true },
      { label: "Täckning", value: "360° × 169°", highlight: true },
      { label: "Lagring", value: "Endast moln", highlight: true },
      { label: "Kräver abonnemang", value: "Ja, Ring Home" },
      { label: "Mörkerseende", value: "Färg" },
      { label: "Synfält", value: "115° × 59°" },
      { label: "Ström", value: "Micro-USB" },
    ],
    verdict:
      "Ring Pan-Tilt Indoor panorerar 360 grader och lutar 169, alltså hela rummet. 799 kronor.\n\nSekretesskyddet sitter fäst på kameran, inte löst i lådan. Det är en bättre lösning än Ring Indoor Cam Plus har, eftersom ett skydd som sitter kvar också används. Kombinationen med 360 graders panorering och färgseende i mörker gör den till en genomtänkt produkt för ett vardagsrum.\n\nMen tre saker drar ner den.\n\nAbonnemanget. Kjells specifikation bär en fotnot: kräver Ring Home-abonnemang. Det finns ingen lokal lagring, så utan att betala sparas ingenting. Det väger tungt i en kategori där materialet är inomhusbilder från ditt eget hem.\n\nUpplösningen. 1080p, medan systermodellen Indoor Cam Plus ger 2K för hundra kronor mindre. Du betalar alltså mer för att få mindre bild och mer rörlighet.\n\nOch priset i sammanhang. 799 kronor plus en månadskostnad, mot 599 kronor och ingenting för Tapo C225, som har en fysisk knapp som vrider bort linsen, samma 360-graders täckning, 2K och minneskort i kameran.\n\nDen hamnar sist inte för att den är dålig utan för att varje enskild sak den gör bra finns billigare någon annanstans, utan månadsavgift.",
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
      "Har samma fysiska integritetsknapp som vinnaren C225 och kostar 549 kronor i stället för 599, 50 kronor billigare. Rankas ändå inte, eftersom den är fast och inte panorerar: 140 graders synfält mot C225:s 360 graders rörelseomfång. För femtio kronor är det ingen besparing värd namnet. Köp den bara om kameran ska sitta i ett hörn och peka åt ett bestämt håll för alltid.",
    approxPrice: 549,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/tp-link-tapo-c125-overvakningskamera-p65453",
  },
  {
    brand: "eufy",
    name: "Indoor Cam C220 och S350",
    reason:
      "Kjell publicerar ingen teknisk specifikation alls för någon av dem, varken upplösning, synfält eller lagring. Vi rankar inte en produkt där ingen av de uppgifter vi betygsätter går att läsa. Synd, för C220 kostar 499 kronor och har 77 kundomdömen, ett verkligt underlag. Kontrollera specifikationen direkt hos eufy om du överväger dem.",
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
      "1 090 kronor för 1080p och 135 graders fast synfält är dyrt i den här kategorin, och vi har inte hittat någon dokumentation om vare sig fysiskt linsskydd eller sekretesszoner. Det som talar för den är att maskininlärningen körs på enheten i stället för i molnet, vilket är ovanligt, plus 25 kundomdömen med snittet 4,5. Rankas inte eftersom det vi väger tyngst inte går att belägga.",
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
      "TP-Link Tapo C225 för 599 kronor hos Kjell. Den har en fysisk knapp som enligt TP-Link fäller ner ett skydd över linsen eller vrider bort den helt, den täcker hela rummet med 360 graders panorering, den spelar in i 2K på ett minneskort i kameran och ingenting kräver abonnemang. Vill du ha billigast möjliga är Tapo C220 för 449 kronor nästan lika bra, men utan det fysiska skyddet.",
  },
  {
    question: "Får jag ha kamera hemma om jag har hemtjänst?",
    answer:
      "Inte inom privatundantaget. IMY har ett eget exempel för det: får en privatperson regelbundet besök av hemtjänsten omfattas kamerabevakningen inte av undantaget, eftersom personalen besöker hemmet i sin yrkesroll och därmed bevakas under sin arbetstid. Då gäller GDPR, vilket innebär att du behöver en rättslig grund, ska göra en intresseavvägning och ska informera om bevakningen. Det praktiska svaret är att kameran ska vara avstängd när personalen är där, och att ett fysiskt linsskydd är det enda sättet att visa dem att den faktiskt är det.",
  },
  {
    question: "Vad är skillnaden mellan ett linsskydd och privatläge i appen?",
    answer:
      "Ett linsskydd är en mekanism. Det täcker eller vrider bort objektivet, det syns tvärs över rummet och det kräver ingen tillit till programvaran. Ett privatläge i appen är ett löfte om att programvaran gör som den säger, och det löftet kan du inte kontrollera. Arlos Essential Indoor har ett skydd som stängs automatiskt när kameran avlarmas. Tapo C225 och C125 har en fysisk knapp. Ring lägger ett linsskydd i lådan. Övriga har bara programläget.",
  },
  {
    question: "Krävs abonnemang för en inomhuskamera?",
    answer:
      "Det beror på fabrikat, och skillnaden är stor. TP-Link Tapo, Aqara och Imou sparar allt på ett minneskort i kameran och fungerar fullt ut utan abonnemang. Ring spelar inte in något alls utan Ring Home, och Arlo kräver Arlo Secure för både molnlagring och AI-detektering enligt Kjells egen specifikation. Eftersom inomhusbilder är det känsligaste material ett hem producerar är frågan var de lagras inte bara ekonomisk.",
  },
  {
    question: "Ska kameran kunna vrida sig?",
    answer:
      "Inomhus, oftast ja. Avstånden är korta och en fast kamera i ett hörn ser en fjärdedel av rummet. En kamera med 360 graders panorering ser hela. Skillnaden är större här än utomhus, där en fast kamera med brett synfält täcker en uppfart bra. Tapo C220 och C225, Ring Pan-Tilt, Arlo Essential 3 PTZ och Aqara G3 vrider sig. Tapo C100, Tapo C125 och Ring Indoor Cam Plus gör det inte.",
  },
  {
    question: "Kan jag ha kamera i ett barnrum?",
    answer:
      "Juridiskt är det ditt hem och ditt barn, så privatundantaget gäller normalt. Men det är värt att skilja på en babyvakt och en övervakningskamera: en babyvakt ska ge ljud och en larmgräns, medan en övervakningskamera spelar in historik och gör personigenkänning. Ju äldre barnet blir desto rimligare är det att fråga om samtycke, och en kamera med fysiskt linsskydd gör den frågan konkret i stället för teoretisk.",
  },
  {
    question: "Var ska kameran stå?",
    answer:
      "Högt nog att se över möbler, men inte så högt att du bara ser hjässor. Ungefär i ögonhöjd eller strax över, riktad mot dörren in i rummet snarare än mot rummets mitt, eftersom alla som kommer in passerar dörren. Undvik att rikta den mot ett fönster, eftersom motljus gör ansikten till silhuetter. Och tänk igenom var den inte ska stå: sovrum och badrum är rum där även den egna familjen har rimliga förväntningar på att inte bli filmad.",
  },
  {
    question: "Vad händer med bilderna om tillverkaren lägger ner tjänsten?",
    answer:
      "Med minneskort i kameran händer ingenting. Med molnlagring försvinner både materialet och funktionen. Google lade ner Nest Protect i mars 2025, vilket är vinkeln på vår sida om smarta brandvarnare, och det gällde en produkt som fungerat i åratal. Tapo, Aqara och Imou sparar lokalt. Ring och Arlo gör det inte.",
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
