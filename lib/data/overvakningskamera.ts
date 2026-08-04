import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { OVERVAKNINGSKAMERA } from "@/lib/test-pages";

/**
 * Övervakningskameror för utomhusbruk vid villa. Underlag i
 * .agent/research/overvakningskamera.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, upplösning, synfält, lagring, batteritid,
 * kundbetyg och vilka funktioner butiken märker som abonnemangsberoende. Läst
 * på butikens egen sida 2026-08-03. Uppgifterna om sekretesszoner är lästa i
 * respektive tillverkares egen supportdokumentation, se lib/sources.ts.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte monterat, filmat
 * med eller mätt bildkvaliteten på någon kamera.
 *
 * ## Avgränsning
 *
 * Bara utomhuskameror. Kjell listar 67 kameror i kategorin och utbudet delar
 * sig på tre axlar samtidigt. Inomhus är enligt IMY "oftast" tillåtet och är
 * dessutom ett annat köp, barnvakt och husdjur, så det får egen sida senare.
 * Beslutat av användaren 2026-08-03.
 *
 * ## Sidans fynd: alla har maskering, alla har en brasklapp
 *
 * IMY pekar ut digital maskering som åtgärden när kameran råkar få med
 * grannens tomt. Funktionen finns hos alla fem fabrikat. Varje enskild
 * tillverkare publicerar också något som urholkar den, alltid åt samma håll.
 *
 * | Fabrikat | Tillverkarens egen brasklapp |
 * |---|---|
 * | Arlo | Zonerna raderas av autospårning, av ändrat synfält och av rotering |
 * | Tapo | Zonerna följer med vyn och täcker inte längre originalområdet |
 * | Reolink | Statisk mask förskjuts vid PTZ; dynamisk mask bara på tre RLC-modeller |
 * | Ring | Rörelsedetektorn känner av området ändå |
 * | eufy | "may not be avoided completely to be recorded", och modellerna som säljs här står inte i listan |
 *
 * ## ⚠️ Ingen abonnemangskostnad i kronor
 *
 * Arlos plansidor svarar 403 och 404 mot curl på både svensk och brittisk
 * sökväg, och TP-Link renderar sin pristabell i JavaScript. Vi har alltså inte
 * läst något abonnemangspris och publicerar därför inget. Kriteriet `kostnad`
 * poängsätter i stället **vad som slutar fungera utan abonnemang**, vilket är
 * belagt i Kjells specifikationer och i Arlos egen dokumentation.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-03";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "reolink-w330",
    name: "Reolink W330 4K",
    shortName: "W330 4K",
    brand: "Reolink",
    image: productImage(OVERVAKNINGSKAMERA.slug, "reolink-w330"),
    tagline: "Billigast, spelar in dygnet runt lokalt, och maskerar utan brasklapp.",
    scores: { integritet: 5, bild: 4, kostnad: 5, lagring: 5, prisvarde: 5 },
    price: 999,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-utomhus/reolink-w330-4k-wifi-6-overvakningskamera-p60342",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 6, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst i test och billigast",
    pros: [
      "Sekretesszonen gäller enligt Reolink alla deras kameror och syns både i direktbild och i inspelningen",
      "Fast monterad utan rörliga delar, så det finns ingen rörelse som kan förskjuta masken",
      "4K på minneskort upp till 256 GB, och inspelning dygnet runt och inte bara vid rörelse",
      "Ingenting slutar fungera utan abonnemang, och Ethernet-port finns om wifi krånglar",
      "999 kronor, billigast av kamerorna med god marginal",
    ],
    cons: [
      "Kräver ström framdragen till kameran, till skillnad från de batteridrivna",
      "88,8 graders synfält är smalast av kamerorna, så en bred uppfart kräver två",
      "Bara sex kundomdömen hos butiken, mot 268 för Tapo C425",
      "Alexa-stöd anges som planerat och inte som klart",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, hela sortimentet", highlight: true },
      { label: "Zonen påverkas av rörelse", value: "Nej, kameran är fast", highlight: true },
      { label: "Upplösning", value: "4K, 3840 × 2160", highlight: true },
      { label: "Synfält", value: "88,8°", highlight: true },
      { label: "Lagring", value: "microSD 256 GB, 24/7", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Ström", value: "Fast, med Ethernet" },
      { label: "Mörkerseende", value: "IR 30 m, färg med spotlight" },
    ],
    verdict:
      "Reolink W330 4K kostar 999 kronor och är den enda kameran vars maskering saknar förbehåll. Den fungerar även när kameran panorerar.\n\nReolinks dokumentation säger tre saker ingen annan tillverkare säger samtidigt: att sekretesszonen gäller alla deras kameror, att den syns både i direktbilden och i inspelningen, och att artikeln över huvud taget är skriven för det fall IMY beskriver. Reolink inleder med att du kanske är orolig för att hamna i konflikt med grannen. Det är ovanligt rakt för en produktsupportsida.\n\nBegränsningen finns hos Reolink också, men den träffar inte den här modellen. Deras statiska mask förskjuts vid PTZ-rörelser, och den dynamiska masken som följer med finns bara på tre RLC-modeller. W330 är fast monterad utan rörliga delar. Det finns ingen rörelse som kan förskjuta masken, och därmed ingen brasklapp som gäller.\n\nResten är också ovanligt rent. 4K på ett minneskort i kameran, inspelning dygnet runt och inte bara vid rörelse, Ethernet-port om wifi krånglar, och ingenting som slutar fungera för att du låter bli att betala en månadsavgift. Materialet ligger hemma hos dig.\n\nTvå verkliga nackdelar. Den kräver ström framdragen till kameran, vilket är ett elarbete eller åtminstone en kabelgenomföring, och de batteridrivna kamerorna sätts upp på 20 minuter. Och synfältet på 88,8 grader är smalast här. Argus 4 Pro tar 180. Ska du täcka en bred uppfart behöver du två W330 eller en annan kamera.\n\n999 kronor. Det är hälften av vad Ring tar för en kamera som spelar in i molnet mot abonnemang.",
  },
  {
    id: "reolink-argus-4-pro",
    name: "Reolink Argus 4 Pro",
    shortName: "Argus 4 Pro",
    brand: "Reolink",
    image: productImage(OVERVAKNINGSKAMERA.slug, "reolink-argus-4-pro"),
    tagline: "180 grader utan kabel, och samma maskering utan hake.",
    scores: { integritet: 5, bild: 4.5, kostnad: 5, lagring: 4, prisvarde: 4 },
    price: 1571,
    merchant: "Proshop",
    merchantUrl: "https://www.proshop.se/Naetverkskamera/REOLINK-Argus-4-Pro/3356008",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 25, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst täckning utan kabeldragning",
    pros: [
      "180 graders synfält horisontellt, dubbelt så brett som W330 och bredast i jämförelsen",
      "Samma sekretesszon som hela Reolinks sortiment, och kameran är fast så masken sitter kvar",
      "Batteridriven, så ingen kabel behöver dras och monteringen tar en kvart",
      "1 571 kronor hos Proshop mot 1 799 hos Kjell, 228 kronor billigare för samma vara",
      "Tre spotlights för färgbild i mörker, och lokal lagring utan abonnemang",
    ],
    cons: [
      "Batteriet räcker upp till två månader, så det är fyra till sex laddningar om året",
      "Laddare säljs separat, bara USB-kabeln ingår",
      "15 bilder per sekund, halva bildfrekvensen mot de flesta i jämförelsen",
      "Ingen inspelning dygnet runt, kameran vaknar på rörelse",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, hela sortimentet", highlight: true },
      { label: "Zonen påverkas av rörelse", value: "Nej, kameran är fast", highlight: true },
      { label: "Upplösning", value: "8 MP, 5120 × 1440", highlight: true },
      { label: "Synfält", value: "180° horisontellt", highlight: true },
      { label: "Lagring", value: "Lokal, ingen molntvång", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Ström", value: "Batteri 5 000 mAh, upp till 2 mån" },
      { label: "Vädertålighet", value: "IP66, -10 till 55 °C" },
    ],
    verdict:
      "Samma dokumentation som vinnaren och dubbelt så brett synfält, till 572 kronor mer och utan kabel.\n\n180 grader horisontellt är den avgörande skillnaden. W330 tar 88,8, mindre än hälften, och en normal villauppfart med garageport och entré ryms inte i den vinkeln. Argus 4 Pro löser med en kamera det W330 behöver två för, och då är prisskillnaden borta.\n\nSekretesszonen är identisk, eftersom Reolinks dokumentation gäller hela sortimentet, och kameran är fast monterad utan panorering. Alltså ingen rörelse som förskjuter masken, precis som hos vinnaren. Det är den kombinationen som gör maskeringen pålitlig hos båda Reolink-kamerorna.\n\nDen ska köpas hos Proshop och inte hos Kjell. 1 571 mot 1 799 kronor för samma artikel, och Proshop har den i sortimentet tillsammans med resten av Reolinks utbud.\n\nHaken är batteriet. Upp till två månader per laddning betyder i praktiken fyra till sex nedmonteringar om året, och laddaren säljs separat. De som monterar en kamera fem meter upp under takfoten ska tänka igenom det innan de borrar. En solpanel finns som tillbehör och löser det, men då är du tillbaka i kabeldragning, om än en kortare.\n\nOch 15 bilder per sekund är lågt. Det räcker för att se vad som hände men märks om något rör sig fort förbi.",
  },
  {
    id: "tapo-c425",
    name: "TP-Link Tapo C425",
    shortName: "Tapo C425",
    brand: "TP-Link",
    image: productImage(OVERVAKNINGSKAMERA.slug, "tapo-c425"),
    tagline: "Kategorins mest omdömda kamera, med en maskering som sitter still.",
    scores: { integritet: 4, bild: 3.5, kostnad: 4.5, lagring: 4, prisvarde: 4 },
    price: 1290,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/tp-link-tapo-c425-tradlos-overvakningskamera-p65454",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 268, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Mest omdömd av alla",
    pros: [
      "268 kundomdömen med snittet 4,5, tio gånger fler än någon annan här",
      "Fyra sekretesszoner, och kameran är fast så zonerna följer inte med någon rotation",
      "150 graders synfält, näst bredast efter Argus 4 Pro",
      "Minneskort i kameran och Tapo Care som frivilligt tillval, inte som krav",
      "1 290 kronor, under snittet för kamerorna",
    ],
    cons: [
      "2K och inte 4K, vilket märks när du zoomar in ett ansikte eller en registreringsskylt",
      "TP-Link skriver att zonerna följer med vyn om kameran flyttas eller vrids",
      "Kjells specifikation anger varken kortstorlek eller batteritid",
      "Batteridriven, med samma nedmonteringar som Argus 4 Pro",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, högst 4 zoner", highlight: true },
      { label: "Zonen påverkas av rörelse", value: "Bara om du flyttar kameran", highlight: true },
      { label: "Upplösning", value: "2K QHD, 2560 × 1440", highlight: true },
      { label: "Synfält", value: "150°", highlight: true },
      { label: "Lagring", value: "microSD, Tapo Care frivilligt", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Ström", value: "Batteri" },
      { label: "Vädertålighet", value: "IP66, -20 till 45 °C" },
    ],
    verdict:
      "Tapo C425 har 268 kundomdömen på 4,5, tio gånger fler än någon annan kamera här. 1 290 kronor, batteridriven och trådlös.\n\n268 omdömen med snittet 4,5 hos Kjell är i en annan storleksordning än hos någon annan kamera. Reolink W330 har sex, Arlo Essential 3 har fyra. Omdömena påverkar inte rankningen, men de säger något om hur många som faktiskt lever med produkten, och det är ett underlag ingen jämförelsesida kan skapa själv.\n\nSekretesszonen finns, den tar upp till fyra områden, och TP-Link listar C425 uttryckligen bland modellerna som har den. Kameran är fast, så den brasklapp TP-Link publicerar slår inte in vid normal användning: zonerna följer med vyn om kameran vrids eller flyttas, men en fast monterad kamera vrids inte av sig själv. Den enda gången det gäller är om du senare justerar vinkeln, och då ska du rita om zonerna. Det är värt att veta och det står ingenstans i butiken.\n\nSvagheten är upplösningen. 2K räcker för att se att någon är där. 4K räcker oftare för att se vem. Skillnaden märks när du zoomar in på ett ansikte eller en skylt i efterhand, och för 1 290 kronor är det ett rimligt men verkligt avkall.\n\nLagringen är fri: kort i kameran, och Tapo Care som tillval snarare än som förutsättning. Det placerar den i den halva av kategorin där produkten fortsätter fungera oavsett vad tillverkaren gör med sina tjänster.",
  },
  {
    id: "tapo-c660",
    name: "TP-Link Tapo C660",
    shortName: "Tapo C660",
    brand: "TP-Link",
    image: productImage(OVERVAKNINGSKAMERA.slug, "tapo-c660"),
    tagline: "4K och 326 graders rotation, och rotationen spolierar maskeringen.",
    /* prisvarde 4,0 sedan priset föll från 1 990 till 1 490 kronor vid
       omkontrollen 2026-08-03. Den ger mest hårdvara per krona av alla sju och
       ligger nu i nivå med Tapo C425. Betyget hålls ändå nere av att
       integritet väger 30 och maskeringen inte överlever panoreringen. */
    scores: { integritet: 2.5, bild: 4, kostnad: 4.5, lagring: 4.5, prisvarde: 4 },
    price: 1490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/tp-link-tapo-c660-solcellsdriven-4k-overvakningskamera-p66406",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 31, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Mest teknik, om den får stå still",
    pros: [
      "4K med 18 gångers zoom och rörelsespårning, mest teknik av kamerorna",
      "Solcellsdriven med 10 000 mAh, så varken kabel eller regelbunden laddning",
      "Minneskort upp till 512 GB, dubbelt så mycket som någon annan här",
      "Siren på 93,3 dB och färgseende i mörker med starlight-sensor",
    ],
    cons: [
      "326 graders panorering, och TP-Link skriver själva att zonerna följer med vyn och slutar täcka originalområdet",
      "Rörelsespårningen flyttar kameran automatiskt, och det är just det som gör maskeringen opålitlig",
      "1 490 kronor, samma pris som Reolink W330 med sämre integritet",
      "IP65 mot IP66 för de flesta andra",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, men följer med vyn", highlight: true },
      { label: "Zonen påverkas av rörelse", value: "Ja, 326° panorering", highlight: true },
      { label: "Upplösning", value: "4K, 3840 × 2160", highlight: true },
      { label: "Synfält", value: "105°, panorering 326°", highlight: true },
      { label: "Lagring", value: "microSD 512 GB", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Ström", value: "Solcell, 10 000 mAh" },
      { label: "Vädertålighet", value: "IP65" },
    ],
    verdict:
      "Tapo C660 ger 4K, 18 gångers zoom och rörelsespårning för 1 490 kronor. Mest teknik per krona av alla sju, och samma rörelse gör maskeringen opålitlig.\n\nPå papperet vinner den. 4K, 18 gångers zoom, 326 graders panorering, rörelsespårning, solcell så att du varken drar kabel eller laddar, minneskort på 512 gigabyte och en siren på 93 decibel. För 1 490 kronor är det mycket teknik per krona, och det är också den billigaste 4K-kameran här.\n\nProblemet är att panoreringen och maskeringen inte går ihop. TP-Links egen supportsida skriver att sekretesszonerna läggs på den aktuella kameravyn, och att de vid rotation förblir aktiva men följer med vyn och inte längre täcker de ursprungliga områdena. En kamera som roterar 326 grader gör alltså det som får zonen att sluta fungera, och rörelsespårningen ser till att den roterar av sig själv utan att du ber om det.\n\nDet betyder inte att kameran är olaglig. Det betyder att den funktion IMY pekar ut som lösningen, när kameran råkar få med grannens tomt, inte är tillförlitlig på just den här modellen. Ska du använda den inom privatundantaget behöver du i praktiken låta den stå still och stänga av spårningen, och då har du betalat 700 kronor extra mot Tapo C425 för funktioner du inte får använda.\n\nSitter kameran så att hela dess rotationsområde ligger på din egen tomt är resonemanget överspelat och det här är den bästa kameran i testet. Det är den situationen den ska köpas för, och den är inte ovanlig på en stor tomt.\n\nAllt annat är starkt. Lagringen är lokal, ingenting kräver abonnemang, och solcellen tar bort den enda praktiska nackdelen med batteridrift.",
  },
  {
    id: "eufy-solocam-s220",
    name: "eufy SoloCam S220",
    shortName: "SoloCam S220",
    brand: "eufy",
    image: productImage(OVERVAKNINGSKAMERA.slug, "eufy-solocam-s220"),
    tagline: "Solcell och lokal lagring, men modellen står inte i eufys egen zonlista.",
    scores: { integritet: 1, bild: 3, kostnad: 4.5, lagring: 4, prisvarde: 3 },
    price: 1490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/eufy-solocam-s220-tradlos-overvakningskamera-1-pack-p60033",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 29, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst drift utan underhåll",
    pros: [
      "Solcellspanel som håller batteriet laddat, så ingen nedmontering alls",
      "Lokal lagring och inget abonnemangskrav för att kameran ska fungera",
      "IP67 och drift ner till 20 minusgrader, tåligast av kamerorna",
      "Wifi-räckvidd som butiken anger till 200 meter",
    ],
    cons: [
      "eufys egen artikel om sekretesszoner listar inte SoloCam S220 bland modellerna som har funktionen",
      'eufy skriver dessutom att aktivitet i zonerna "may not be avoided completely to be recorded"',
      "2K, och kameran spelar bara in vid rörelse, inte kontinuerligt",
      "Ansiktsigenkänning kräver anslutning till HomeBase, som inte ingår",
      "Laddare säljs separat trots att en sådan behövs vid installationen",
    ],
    specs: [
      { label: "Sekretesszon", value: "Modellen saknas i tillverkarens lista", highlight: true },
      { label: "Zonen påverkas av rörelse", value: "Ej tillämpligt", highlight: true },
      { label: "Upplösning", value: "2K, vid rörelse", highlight: true },
      { label: "Synfält", value: "135°", highlight: true },
      { label: "Lagring", value: "Lokal", highlight: true },
      { label: "Kräver abonnemang", value: "Nej" },
      { label: "Ström", value: "Solcell 0,9 W, 6 500 mAh" },
      { label: "Vädertålighet", value: "IP67, -20 till 50 °C" },
    ],
    verdict:
      "Eufy SoloCam S220 har solcellspanel, IP67 och drift ner till 20 minusgrader. Du monterar den en gång och rör den sedan aldrig.\n\nSolcellen gör det den ska. En kamera som håller sig laddad själv, tål 20 minusgrader och har IP67 är den enda du monterar en gång och sedan glömmer. Lagringen är lokal och ingenting kräver abonnemang. Som produkt betraktad är det ett bra köp för 1 490 kronor.\n\nSedan kommer problemet. eufys egen supportartikel om sekretesszoner listar de modeller funktionen gäller: S100 Wall Light Cam, eufyCam 2 Pro, 2C Pro, 2 och 2C. SoloCam S220 står inte där, och inte heller eufyCam C35 som säljs i samma butik. Vi vet alltså inte om kameran har funktionen, och eufy skriver det inte.\n\nOch där funktionen finns skriver eufy en mening ingen annan tillverkare skriver: att aktivitet i sekretesszonerna kanske inte helt kan undvikas från att spelas in. Alltså att maskeringen inte säkert hindrar inspelning. Det är tillverkarens egen formulering, inte vår slutsats.\n\nDet drar ner den på det vi väger till trettio procent, och det gör att kameran hamnar näst sist trots att den i övrigt är välbyggd. Det ska sägas rakt: vi påstår inte att funktionen saknas. Vi påstår att den som köper kameran för att den ska sitta där grannens tomt syns över staketet inte kan kontrollera saken i förväg, och det är just det vi bedömer.\n\nSitter kameran mitt på en stor tomt utan insyn mot någon annans mark är invändningen betydelselös och kameran är ett av de bättre köpen här.",
  },
  {
    id: "ring-spotlight-cam-battery",
    name: "Ring Spotlight Cam Battery",
    shortName: "Spotlight Cam",
    brand: "Ring",
    image: productImage(OVERVAKNINGSKAMERA.slug, "ring-spotlight-cam-battery"),
    tagline: "Skiljer själv på detekteringszon och integritetszon, men spelar in i molnet.",
    scores: { integritet: 4, bild: 3.5, kostnad: 1.5, lagring: 1.5, prisvarde: 1.5 },
    price: 2099,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/batteridrivna-overvakningskameror/ring-spotlight-cam-battery-2nd-gen-tradlos-overvakningskamera-svart-p66831",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Tydligast om vad zonerna gör",
    pros: [
      "En av två produkter där butikens specifikation skiljer rörelsezoner från integritetszoner",
      "2K Retinal med 550 lumen i dubbla spotlights, starkast belysning av kamerorna",
      "Quick Release-batteripaket, så du byter batteri utan att montera ner kameran",
      "140 graders synfält och fjärraktiverad siren",
    ],
    cons: [
      "Inspelning kräver abonnemang, utan det får du notiser och direktbild men inget sparat",
      "Ingen lokal lagring alls, allt material ligger hos Amazon",
      "2 099 kronor, dyrast av kamerorna, och sedan en månadskostnad ovanpå",
      "Bara två sekretesszoner, och rörelsedetektorn känner av området ändå",
      "Inga kundomdömen alls hos butiken",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, 2 zoner", highlight: true },
      { label: "Zonen påverkas av rörelse", value: "Nej, kameran är fast", highlight: true },
      { label: "Upplösning", value: "2K Retinal", highlight: true },
      { label: "Synfält", value: "140° horisontellt", highlight: true },
      { label: "Lagring", value: "Endast moln", highlight: true },
      { label: "Kräver abonnemang", value: "Ja, för inspelning" },
      { label: "Ström", value: "Quick Release-batteripaket" },
      { label: "Spotlights", value: "550 lumen" },
    ],
    verdict:
      "Ring Spotlight Cam har 550 lumen i dubbla spotlights, den starkaste belysningen av kamerorna här. Den kostar också mest, 2 099 kronor, och sedan börjar månadsavgiften.\n\nDet den gör bra är begreppen. Ring är tillsammans med Yale den enda tillverkaren vars specifikation hos Kjell skiljer rörelsezoner från integritetszoner, på två separata rader. Två rader som betyder helt olika saker: en detekteringszon styr vad kameran larmar om, en integritetszon svartar ut pixlarna. De flesta tillverkare låter läsaren tro att det är samma sak, och Ring gör inte det. Zonerna är två till antalet och rörelsedetektorn känner av området ändå, vilket också står utskrivet.\n\nHårdvaran är stark. 550 lumen är den starkaste belysningen här, Quick Release-batteriet gör att du byter batteri utan att skruva ner kameran, och 2K Retinal är gott om upplösning för ändamålet.\n\nSedan lagringen. Det finns ingen lokal. Allt material går till molnet, och utan abonnemang får du notiser och direktbild men ingenting sparat. Det betyder att den enda funktion man faktiskt köper en övervakningskamera för, att kunna visa någon vad som hände, är en abonnemangsfunktion.\n\nDet är samma sak som fällde Google Nest Protect på vår sida om smarta brandvarnare: en produkt vars kärnfunktion bor på någon annans server är utlånad och inte köpt. Skillnaden är att Ring säljs av Amazon och inte lär läggas ner i morgon. Men villkoren och priset bestämmer de, inte du.\n\n2 099 kronor är dessutom dyrast här, och Reolink W330 kostar 999 och sparar materialet hemma hos dig utan att någon behöver fakturera dig varje månad.",
  },
  {
    id: "arlo-essential-3-hd",
    name: "Arlo Essential 3 HD, 2-pack",
    shortName: "Essential 3 HD",
    brand: "Arlo",
    image: productImage(OVERVAKNINGSKAMERA.slug, "arlo-essential-3-hd"),
    tagline: "Två kameror för 1 490 kronor, och sedan börjar kostnaderna.",
    scores: { integritet: 3.5, bild: 2, kostnad: 1, lagring: 1, prisvarde: 2.5 },
    price: 1490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/arlo-essential-3-hd-tradlos-overvakningskamera-2-pack-p66615",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 4, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Lägst pris per kamera, högst kostnad efter köp",
    pros: [
      "Två kameror för 1 490 kronor, 745 per styck och lägst pris per kamera",
      "Arlo dokumenterar sekretesszonerna utförligast av alla, med sju frågor och raka svar",
      "Inbyggd spotlight för färgbild i mörker och siren på 80 dB",
      "Fyra till sex månaders batteritid, längst av de batteridrivna här",
      "Ansluter direkt till wifi utan att du behöver köpa en SmartHub",
    ],
    cons: [
      "AI-detektering av personer, fordon och paket kräver enligt Kjells egen specifikation Arlo Secure",
      "Ingen lokal lagring, och molninspelning ingår inte utan abonnemang",
      "Zonerna raderas automatiskt vid autospårning, ändrat synfält eller rotering 180 grader",
      "1080p, lägst upplösning av alla sju",
      "Bara fyra kundomdömen hos butiken",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, högst 3 zoner", highlight: true },
      { label: "Zonen påverkas av rörelse", value: "Raderas vid zoom och rotering", highlight: true },
      { label: "Upplösning", value: "1080p Full HD", highlight: true },
      { label: "Synfält", value: "130° diagonalt", highlight: true },
      { label: "Lagring", value: "Moln, kräver Arlo Secure", highlight: true },
      { label: "Kräver abonnemang", value: "Ja, för AI och inspelning" },
      { label: "Ström", value: "Batteri, 4 till 6 mån" },
      { label: "Antal", value: "2 kameror" },
    ],
    verdict:
      "Arlo Essential 3 HD ger två kameror för 1 490 kronor, 745 per styck och lägst pris per kamera av alla sju.\n\nBörja med det Arlo gör bäst, för det är verkligt: de dokumenterar sina sekretesszoner utförligast av alla fem tillverkarna. Sju numrerade frågor med raka svar, en lista över exakt vilka modellnummer som stöder funktionen, och en fråga som förklarar skillnaden mellan aktivitetszon och sekretesszon tydligare än vi hade gjort själva. Den öppenheten ska de ha kredit för, och den är också anledningen till att vi kan skriva resten av det här stycket.\n\nFör svaren är obekväma. Zonerna raderas automatiskt när autospårning slås på. De raderas när du ändrar kamerans synfält. De raderas när du roterar bilden 180 grader. Och på pan/tilt-modellerna försvinner zonen så fort kameran rör sig. Det är inte förskjutning som hos Tapo och Reolink, det är radering.\n\nSedan abonnemanget. Kjells egen specifikation skriver att AI-detekteringen av personer, fordon och paket sker via Arlo Secure. Alltså är igenkänningen, som är det som skiljer en användbar kamera från en rörelsedetektor som larmar för varje katt, en abonnemangsfunktion. Molninspelning ingår inte heller, och lokal lagring finns inte. Utan abonnemang är två Arlo-kameror i praktiken två dyra rörelsevakter med direktbild.\n\nVi kan inte säga vad Arlo Secure kostar i kronor. Arlo skriver inte ut det svenska priset någonstans vi hittat, och vi publicerar inga priser vi inte läst. Att abonnemanget krävs står däremot både hos Kjell och hos Arlo.\n\n1 490 kronor för två kameror är lägst pris per kamera av alla sju. Det är också den enda siffran i kalkylen som är färdig när du lämnar butiken.",
  },
];

export const OVERVAKNINGSKAMERA_PRODUCTS: Product[] = resolveProducts(
  OVERVAKNINGSKAMERA,
  SEEDS,
);

/**
 * Produkter vi tittat på och valt bort. Skälet står utskrivet, eftersom en
 * bortvald produkt utan motivering ser ut som ett förbiseende.
 */
export const OVERVAKNINGSKAMERA_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Yale",
    name: "Smart Outdoor Camera",
    reason:
      "Kjells specifikation skiljer på Detekteringszon och Sekretesszon i två separata rader, och det är två helt olika funktioner. det talar för produkten. Men vi har inte hittat Yales egen dokumentation av funktionen, och kriteriet som väger trettio procent bygger på tillverkarens egna ord. Vi rankar inte en produkt på ett betyg vi inte kan belägga vid källan. 1 190 kronor, 1080p, och intern lagring för bara två till fyra dygn.",
    approxPrice: 1190,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-utomhus/yale-smart-outdoor-camera-p65941",
  },
  {
    brand: "Ubiquiti",
    name: "G6 Bullet 4K PoE",
    reason:
      "En annan sorts produkt. PoE-kamera som förutsätter en UniFi-inspelare i huset och nätverkskabel dragen till varje kamera, alltså ett system och inte en kamera. Den som bygger så får bäst lagring och fullt oberoende av alla molntjänster, men bygget kostar långt mer än de 2 398 kronorna kameran kostar. Egen sida om vi täcker fasta system.",
    approxPrice: 2398,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-inomhus/ubiquiti-g6-bullet-4k-poe-overvakningskamera-p60168",
  },
  {
    brand: "eufy",
    name: "eufyCam C35, 2-pack",
    reason:
      "Samma invändning som mot SoloCam S220 och en till: modellen saknas i eufys egen lista över kameror med sekretesszon, och Kjells specifikation anger bara Aktivitetszoner, två stycken i hexagonform. Alltså den zontyp som styr vad kameran larmar om och inte den som döljer grannens tomt. 2 490 kronor för två kameror i 1080p.",
    approxPrice: 2490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/eufy-eufycam-c35-overvakningssystem-2-pack-p66977",
  },
  {
    brand: "Arlo",
    name: "Pro 6",
    reason:
      "Rankas inte eftersom den är samma abonnemangsberoende som Essential 3 men dyrare, 1 890 kronor för en kamera. Den är däremot värd att nämna för en sak: Kjell säljer den med autospårning som huvudfunktion, och autospårning är enligt Arlos egen FAQ precis det som raderar sekretesszonerna. De två funktionerna går inte att ha samtidigt, och ingen butik nämner det.",
    approxPrice: 1890,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/arlo-pro-6-tradlos-overvakningskamera-1-pack-p66627",
  },
  {
    brand: "Reolink",
    name: "W840 4K med 5× optisk zoom",
    reason:
      "Optisk zoom och 60 meters mörkerseende är i en klass för sig i kategorin, men 2 999 kronor är tre gånger W330 och kameran är fast ansluten. Den löser ett annat problem: att läsa en registreringsskylt på avstånd snarare än att se vem som står vid dörren. Betyget hos butiken är dessutom 3,5 av 5 på tre omdömen, lägst av alla Reolink-modeller vi tittat på.",
    approxPrice: 2999,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/overvakningskameror-utomhus/reolink-w840-4k-wifi-overvakningskamera-p60340",
  },
  {
    brand: "Inomhuskameror",
    name: "Hela segmentet",
    reason:
      "Utanför den här sidan. IMY skriver att kamerabevakning inne i bostaden oftast omfattas av privatundantaget, även när kamerorna är kopplade till en larmcentral, så den juridiska frågan ser helt annorlunda ut. Undantaget är hemtjänst: får du regelbundna besök gäller inte privatundantaget, eftersom personalen bevakas under sin arbetstid. Det blev vinkeln på vår separata sida om inomhuskameror, där produktfrågan är en annan: inte maskering utan om kameran har ett fysiskt linsskydd som går att se.",
  },
];

export const OVERVAKNINGSKAMERA_FAQ = [
  {
    question: "Vilken övervakningskamera är bäst 2026?",
    answer:
      "Reolink W330 för 999 kronor hos Kjell. Den är billigast i jämförelsen, spelar in i 4K dygnet runt på ett minneskort i kameran, kräver inget abonnemang, och den är den enda där tillverkarens dokumentation av sekretesszoner inte innehåller någon brasklapp som gäller modellen. Haken är att den behöver ström framdragen och har jämförelsens smalaste synfält, 88,8 grader. Vill du slippa kabeldragning och täcka en bred uppfart är Reolink Argus 4 Pro för 1 571 kronor hos Proshop rätt val, med 180 grader och samma dokumentation.",
  },
  {
    question: "Får jag filma grannens tomt?",
    answer:
      "Nej. Integritetsskyddsmyndigheten skriver att kamerabevakningen ska vara begränsad till ditt hem eller din tomt och inte får filma en grannes tomt eller en plats dit allmänheten har tillträde. Gör den det gäller GDPR och kamerabevakningslagen i stället, och IMY skriver att sådan bevakning sällan är tillåten eftersom det är ett allvarligt intrång. De tillägger att kamerabevakning av människor i deras hem dessutom kan vara brottsligt enligt straffrättsliga bestämmelser.",
  },
  {
    question: "Vad är skillnaden mellan detekteringszon och sekretesszon?",
    answer:
      "En detekteringszon, ibland kallad aktivitetszon eller rörelsezon, styr vad kameran larmar om. Den stoppar notiser, inte inspelning. En sekretesszon, ibland kallad integritetszon eller privacy zone, svartar ut ett område i själva bilden så att det varken syns i direktbild eller i inspelningen. Bara den senare är den digitala maskering IMY pekar ut som åtgärd när kameran råkar få med grannens tomt. Arlo förklarar själva skillnaden i sin FAQ, medan de flesta butiker låter läsaren tro att det är samma sak.",
  },
  {
    question: "Har alla kameror sekretesszoner?",
    answer:
      "Alla fem fabrikat vi jämför har funktionen, men var och en publicerar en begränsning. Arlo raderar zonerna automatiskt vid autospårning, ändrat synfält eller rotering. TP-Link skriver att zonerna följer med vyn om kameran vrids och då inte längre täcker originalområdet. Reolinks statiska mask förskjuts vid panorering, och den dynamiska varianten finns bara på tre modeller som inte säljs här. Ring har två zoner men rörelsedetektorn känner av området ändå. eufy skriver att aktivitet i zonerna kanske inte helt kan undvikas från att spelas in, och deras modellista omfattar inte de kameror som säljs i svensk handel.",
  },
  {
    question: "Behöver jag abonnemang till en övervakningskamera?",
    answer:
      "Det beror helt på fabrikat. Reolink, TP-Link Tapo och eufy sparar materialet på ett minneskort i kameran och fungerar fullt ut utan abonnemang. Ring spelar inte in något alls utan abonnemang, du får notiser och direktbild men ingenting sparat. Arlo kräver Arlo Secure både för molninspelning och för igenkänningen av personer, fordon och paket, vilket står i Kjells egen specifikation. Vi har inte kunnat läsa vad abonnemangen kostar i kronor och publicerar därför inga priser, men beroendet går att belägga.",
  },
  {
    question: "Måste jag stänga av mikrofonen?",
    answer:
      "Om kameran tar upp ljud utanför din tomt, ja. IMY:s villkor för privatundantaget innehåller meningen att ljud inte heller tas upp utanför tomten, i samma punkt som villkoret om bilden. Nästan varje kamera i kategorin har mikrofon påslagen från start för tvåvägsljud. Vi har inte kunnat verifiera för varje modell om mikrofonen går att stänga av permanent eller bara tystas i appen, och det är den uppgift vi helst hade velat ha.",
  },
  {
    question: "Får jag sätta upp en dörrkamera i ett lägenhetshus?",
    answer:
      "Inte inom privatundantaget. IMY har ett eget exempel för det: sker bevakningen från en lägenhetsdörr och förbipasserande i trapphuset eller grannars lägenheter riskerar att komma med i bild, då gäller GDPR och kamerabevakningslagen. Det är värt att veta innan man köper, eftersom dörrklockor med kamera säljs som en trygghetsprodukt för alla boendeformer.",
  },
  {
    question: "Räcker 2K eller behöver jag 4K?",
    answer:
      "2K räcker för att se att någon är där. 4K räcker oftare för att se vem. Skillnaden märks precis när du behöver den, alltså när du zoomar in ett ansikte eller en registreringsskylt i efterhand, eftersom digital zoom bara förstorar de pixlar som redan finns. Prisskillnaden är liten i den här kategorin: Reolink W330 ger 4K för 999 kronor medan Arlo Essential 3 ger 1080p för 745 per kamera.",
  },
  {
    question: "Vad händer med mitt material om tillverkaren lägger ner tjänsten?",
    answer:
      "Med lokal lagring händer ingenting, kortet sitter i kameran. Med molnlagring försvinner både materialet och funktionen. Det är inte en teoretisk risk: Google lade ner Nest Protect i mars 2025, vilket är vinkeln på vår sida om smarta brandvarnare. Kameror med minneskort, alltså Reolink, Tapo och eufy i den här jämförelsen, fortsätter fungera oavsett vad som händer med tillverkarens tjänster. Ring och Arlo gör det inte.",
  },
  {
    question: "Hur länge får jag spara inspelningarna?",
    answer:
      "Så länge du behöver dem för sitt syfte, inte längre. Faller din kamerabevakning under privatundantaget gäller inte dataskyddsförordningen och då finns ingen fast gräns, men gör den inte det ska materialet gallras när ändamålet är uppfyllt. En praktisk tumregel är att låta kameran skriva över sig själv efter ett par veckor, vilket är precis vad ett minneskort gör av sig självt när det är fullt. Sparar du något längre ska du kunna säga varför: en anmäld stöld är ett skäl, ett arkiv över alla som passerat din uppfart är det inte. Får du en fråga från någon som filmats är det lättare att svara på om materialet inte finns kvar.",
  },
  {
    question: "Får jag filma med ljud?",
    answer:
      "Var försiktig, för ljud bedöms hårdare än bild. Att spela in ett samtal som du själv deltar i är tillåtet i Sverige, men att placera en mikrofon som fångar samtal du inte deltar i kan vara olovlig avlyssning enligt brottsbalken, och det gäller oavsett vad kameran heter. En kamera vid en ytterdörr som spelar in vad grannarna säger till varandra i trapphuset är alltså ett större problem än att de syns i bild. Samtliga kameror i vår jämförelse går att stänga av mikrofonen på, och för en utomhuskamera som står mot en gångväg är det den inställning vi rekommenderar.",
  },
  {
    question: "Måste jag skylta att jag har kamera?",
    answer:
      "Inte om bevakningen är rent privat, men gör det ändå. Skyltningskravet följer av dataskyddsförordningen, och den gäller inte den som filmar sin egen tomt för eget bruk. Faller din bevakning utanför undantaget, till exempel för att den täcker en gata eller en gemensam yta, ska de som filmas informeras och då är en skylt det enklaste sättet. Oavsett juridiken är skylten det som gör att grannen frågar dig i stället för att anmäla dig, och den har dessutom en avskräckande effekt, vilket är halva nyttan med kameran. En A5-skylt vid infarten räcker.",
  },
  {
    question: "Vad gör jag med materialet om det faktiskt händer något?",
    answer:
      "Spara undan klippet direkt och rör inte originalet. Det första en kamera gör när kortet är fullt är att skriva över det äldsta, så ett inbrott som upptäcks efter en semestervecka kan redan vara borta. Ladda ner filen till telefonen eller datorn, notera datum och klockslag, och skicka den till polisen i samband med anmälan i stället för att lägga ut den i ett grannskapsforum. Att publicera bilder på en identifierbar person kan i sig vara en behandling av personuppgifter som du ansvarar för, och det försvårar dessutom en förundersökning.",
  },
];
