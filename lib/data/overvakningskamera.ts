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
 * | eufy | "may not be avoided completely to be recorded" |
 *
 * ## Abonnemangspriser, lästa 2026-08-06
 *
 * Rättar noteringen från 2026-08-03 om att inget pris gick att läsa. Arlos
 * svenska plansida svarar 200 mot curl och bär hela pristabellen i sin JSON;
 * det var `playwright`-steget som fick 403, inte källan som var stängd.
 *
 * | Plan | Månad | År |
 * |---|---|---|
 * | Arlo Secure, 1 kamera | 99 kr | 1 089 kr |
 * | Arlo Secure, upp till 4 kameror | 149 kr | 1 639 kr |
 * | Arlo Secure Plus | 239 kr | 2 629 kr |
 * | Ring Basic, 1 kamera | 3,99 € | 39,99 € |
 *
 * Ring prissätter sina svenska planer i euro, `ring.com/se/sv/plans`.
 * Tapo Care anger TP-Link bara i appen och webbportalen, och eftersom Tapo
 * fungerar fullt ut på minneskort utan abonnemang saknar priset betydelse
 * för köpbeslutet.
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
    superlative: "Bäst där det finns ström",
    pros: [
      "Maskeringen svartar ut området både i direktbilden och i det som spelas in",
      "Fast monterad utan rörliga delar, så masken ligger kvar där du ritade den",
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
      { label: "Abonnemang", value: "Inget, allt ingår", highlight: true },
      { label: "Ström", value: "Fast, med Ethernet" },
      { label: "Mörkerseende", value: "IR 30 m, färg med spotlight" },
    ],
    verdict:
      "Reolink W330 4K kostar 999 kronor, spelar in i 4K dygnet runt på ett minneskort i kameran och är billigast av kamerorna med god marginal.\n\nMaskeringen svartar ut området både i direktbilden och i inspelningen, och eftersom kameran är fast monterad utan rörliga delar ligger masken kvar där du ritade den. Det är hela skillnaden mot de roterande kamerorna, där masken följer med vyn och slutar täcka grannens tomt precis när det behövs. **4K på ett kort upp till 256 GB gör att du kan zooma in ett ansikte i efterhand i stället för att bara konstatera att någon var där**, och inspelningen går dygnet runt och inte bara när något rör sig. Ethernet-porten finns om wifi krånglar, och ingenting slutar fungera för att du låter bli att betala en månadsavgift.\n\nDen kräver ström framdragen till kameran, alltså en kabelgenomföring eller ett elarbete, medan de batteridrivna sitter uppe på 20 minuter. Synfältet på 88,8 grader är dessutom smalast här: en uppfart med både garageport och entré ryms inte i den vinkeln, så en bred yta kräver två kameror eller en Argus 4 Pro.\n\nHar du ström vid kameraplatsen är det här köpet. 999 kronor, materialet ligger hemma hos dig, och du betalar aldrig något mer.",
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
      "Masken ligger kvar trots det vida synfältet, eftersom kameran är fast monterad",
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
      { label: "Abonnemang", value: "Inget, allt ingår", highlight: true },
      { label: "Ström", value: "Batteri 5 000 mAh, upp till 2 mån" },
      { label: "Vädertålighet", value: "IP66, -10 till 55 °C" },
    ],
    verdict:
      "Reolink Argus 4 Pro tar 180 grader horisontellt utan att en enda kabel dras, och kostar 1 571 kronor hos Proshop.\n\n**180 grader är dubbelt så brett som vinnarens 88,8, och det är skillnaden mellan en kamera och två.** En villauppfart med både garageport och entré ryms inte i W330:s vinkel men gör det här, och räknar du två W330 mot en Argus är prisskillnaden borta. Kameran är fast monterad trots det vida synfältet, så masken ligger kvar där du ritade den. Tre spotlights ger färgbild i mörker i stället för gråskala i infrarött, och materialet sparas lokalt utan en månadsavgift som håller det gisslan. Köp den hos Proshop och inte hos Kjell: 1 571 mot 1 799 kronor för samma artikel.\n\nBatteriet är haken. Upp till två månader per laddning blir fyra till sex nedmonteringar om året, och laddaren säljs separat. Sitter kameran fem meter upp under takfoten ska det tänkas igenom innan borrmaskinen kommer fram. En solpanel finns som tillbehör och löser det, mot en kortare kabel.\n\nSka du täcka en bred yta och slippa dra fram ström är det här kameran. Har du ett eluttag i närheten tar du W330 och lägger de 572 kronorna på ett minneskort i stället.",
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
    superlative: "Bäst för beprövad teknik",
    pros: [
      "268 kundomdömen med snittet 4,5, tio gånger fler än någon annan här",
      "Fyra sekretesszoner, och kameran är fast så zonerna följer inte med någon rotation",
      "150 graders synfält, näst bredast efter Argus 4 Pro",
      "Minneskort i kameran och Tapo Care som frivilligt tillval, inte som krav",
      "1 290 kronor, under snittet för kamerorna",
    ],
    cons: [
      "2K och inte 4K, vilket märks när du zoomar in ett ansikte eller en registreringsskylt",
      "Zonerna följer med vyn om du flyttar eller vrider kameran, och måste då ritas om",
      "150 grader är brett men smalare än Argus 4 Pros 180, så en riktigt bred uppfart kräver ändå två",
      "Batteridriven, med samma nedmonteringar som Argus 4 Pro",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, högst 4 zoner", highlight: true },
      { label: "Zonen påverkas av rörelse", value: "Bara om du flyttar kameran", highlight: true },
      { label: "Upplösning", value: "2K QHD, 2560 × 1440", highlight: true },
      { label: "Synfält", value: "150°", highlight: true },
      { label: "Lagring", value: "microSD, Tapo Care frivilligt", highlight: true },
      { label: "Abonnemang", value: "Frivilligt tillval", highlight: true },
      { label: "Ström", value: "Batteri" },
      { label: "Vädertålighet", value: "IP66, -20 till 45 °C" },
    ],
    verdict:
      "TP-Link Tapo C425 kostar 1 290 kronor, är trådlös och har 268 kundomdömen på 4,5 hos Kjell, tio gånger fler än någon annan kamera här.\n\n**268 personer som redan har kameran uppe och ger den 4,5 är den tryggaste utgångspunkten på sidan.** Reolink W330 har sex omdömen, Arlo Essential 3 har fyra. Sekretesszonen tar upp till fyra områden och kameran är fast monterad, så masken ligger kvar; justerar du vinkeln i efterhand följer zonerna med den nya vyn och behöver ritas om, vilket tar en minut i appen. Minneskortet sitter i kameran och Tapo Care är ett tillval och inte en förutsättning, så kameran gör sitt jobb även om du aldrig betalar något.\n\nSvagheten är upplösningen. 2K räcker för att se att någon är där, 4K räcker oftare för att se vem, och skillnaden dyker upp precis när du zoomar in ett ansikte eller en registreringsskylt i efterhand.\n\nVill du ha den kamera flest redan lever med, och behöver inte läsa skyltar i efterhand, är C425 rätt val. Ska bilden hålla som underlag ger Reolink W330 4K för 999 kronor.",
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
      { label: "Abonnemang", value: "Frivilligt tillval", highlight: true },
      { label: "Ström", value: "Solcell, 10 000 mAh" },
      { label: "Vädertålighet", value: "IP65" },
    ],
    verdict:
      "Tapo C660 ger 4K, 18 gångers zoom och rörelsespårning för 1 490 kronor, mest teknik per krona av kamerorna här.\n\nDet är också den billigaste 4K-kameran på sidan. Solcellen gör att du varken drar kabel eller monterar ner den för att ladda, minneskortet tar 512 GB och räcker därmed dubbelt så länge som någon annans innan det skriver över sig självt, och sirenen på 93 decibel hörs över hela tomten. 18 gångers zoom betyder att en registreringsskylt vid tomtgränsen går att läsa i efterhand.\n\n**Haken är att panoreringen och maskeringen inte går ihop.** Sekretesszonerna läggs på den kameravy som gäller för stunden, och vid rotation följer de med vyn i stället för att täcka de ursprungliga områdena. En kamera som svänger 326 grader gör alltså precis det som får masken att glida av, och rörelsespårningen svänger den åt dig utan att du ber om det. Vill du använda den där grannens tomt syns måste du låta den stå still och stänga av spårningen, och då har du betalat 200 kronor extra mot Tapo C425 för funktioner du inte kan slå på.\n\nSitter kameran mitt på en stor tomt där hela rotationsområdet är ditt eget faller invändningen bort, och då är det här den bästa kameran i testet. Syns grannens tomt eller trottoaren från kameraplatsen tar du Reolink W330 i stället.",
  },
  {
    id: "eufy-solocam-s220",
    name: "eufy SoloCam S220",
    shortName: "SoloCam S220",
    brand: "eufy",
    image: productImage(OVERVAKNINGSKAMERA.slug, "eufy-solocam-s220"),
    tagline: "Solcellen håller den laddad, så du monterar den en gång och rör den aldrig igen.",
    /* integritet 1,5 sedan 2026-08-06, tidigare 1,0. Det gamla betyget satte
       lägsta steget för att modellen inte fanns i eufys modellista. Listan
       motsäger sig själv (rubriken räknar upp S230, C210 och E330, tabellen
       gör det inte) och eufys nuvarande artikel anger funktionen för "one
       camera or doorbell" utan modellbegränsning. Kvar som belagt: eufys egen
       reservation att inspelning i zonen kanske inte helt kan undvikas, vilket
       är skalans 1,5-steg. Se lib/corrections.ts. */
    scores: { integritet: 1.5, bild: 3, kostnad: 4.5, lagring: 4, prisvarde: 3 },
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
      "eufy anger själva att inspelning i en sekretesszon kanske inte helt kan undvikas, alltså att masken inte är att lita på",
      "2K, och kameran spelar bara in vid rörelse, inte kontinuerligt",
      "135 graders synfält, smalare än både Tapo C425 och Argus 4 Pro",
      "Ansiktsigenkänning kräver anslutning till HomeBase, som inte ingår",
      "Laddare säljs separat trots att en sådan behövs vid installationen",
    ],
    specs: [
      { label: "Sekretesszon", value: "Ja, 2 zoner", highlight: true },
      { label: "Zonen påverkas av rörelse", value: "Nej, kameran är fast", highlight: true },
      { label: "Upplösning", value: "2K, vid rörelse", highlight: true },
      { label: "Synfält", value: "135°", highlight: true },
      { label: "Lagring", value: "Lokal", highlight: true },
      { label: "Abonnemang", value: "Inget, allt ingår", highlight: true },
      { label: "Ström", value: "Solcell 0,9 W, 6 500 mAh" },
      { label: "Vädertålighet", value: "IP67, -20 till 50 °C" },
    ],
    verdict:
      "eufy SoloCam S220 kostar 1 490 kronor och har solcellspanel, IP67 och drift ner till 20 minusgrader. Du monterar den en gång och rör den sedan aldrig.\n\n**Solcellen är hela poängen.** En kamera som håller sig laddad själv slipper de fyra till sex nedmonteringar om året som Argus 4 Pro och Tapo C425 kräver, och det är skillnaden mellan en kamera du sätter upp och en kamera du sköter om. IP67 och 20 minusgrader är tåligast av kamerorna, alltså den enda som kan sitta på en utsatt nordvägg utan att du behöver fundera på saken. Materialet sparas lokalt och ingenting kräver abonnemang.\n\nMaskeringen är svagheten. eufy anger själva att aktivitet i en sekretesszon kanske inte helt kan undvikas från att spelas in, och ingen annan tillverkare här reserverar sig på den punkten. Sitter kameran så att grannens tomt eller trottoaren hamnar i bild är det ett verkligt problem, och då är Reolink W330 för 999 kronor det säkra valet.\n\nStår kameran mitt på en stor tomt där allt den ser är ditt eget är invändningen betydelselös. Då är det här den bekvämaste kameran på sidan: sätt upp den och glöm bort den.",
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
    superlative: "Bäst för mörka uppfarter",
    pros: [
      "Sekretesszonen är skild från rörelsezonen, så du kan svarta ut ett område utan att sluta larma på det",
      "2K Retinal med 550 lumen i dubbla spotlights, starkast belysning av kamerorna",
      "Quick Release-batteripaket, så du byter batteri utan att montera ner kameran",
      "140 graders synfält och fjärraktiverad siren",
    ],
    cons: [
      "Inspelning kräver abonnemang från 3,99 euro i månaden, utan det får du notiser och direktbild men inget sparat",
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
      { label: "Abonnemang", value: "Krävs, 3,99 €/mån", highlight: true },
      { label: "Ström", value: "Quick Release-batteripaket" },
      { label: "Spotlights", value: "550 lumen" },
    ],
    verdict:
      "Ring Spotlight Cam Battery har 550 lumen i dubbla spotlights, den starkaste belysningen av kamerorna här. Den kostar också mest, 2 099 kronor, och sedan börjar månadsavgiften.\n\n550 lumen lyser upp en hel uppfart i färg i stället för att ge dig gråskala i infrarött, och för den som sätter upp kameran mot inbrott är färgen på en jacka eller en bil värd mer än ett par extra megapixlar. Quick Release-batteriet lyfts ur på framsidan, så du byter det utan att skruva ner kameran från väggen, vilket ingen annan kamera här löser. Sekretesszonerna är två och kameran är fast monterad, så masken ligger kvar, och sirenen går att lösa ut från telefonen när du ser något du inte tycker om.\n\n**Lagringen är problemet: det finns ingen lokal alls.** Allt går till molnet, och utan abonnemang sparas ingenting, så du får notiser och direktbild men inget att visa polisen dagen efter. Ring Basic täcker en kamera för 3,99 euro i månaden eller 39,99 euro om året, alltså runt 120 euro på tre år ovanpå de 2 099 kronorna. Rörelsedetektorn känner dessutom av det maskerade området ändå, så larmen från grannens uppfart kommer även när du har svartat ut den.\n\nKöp den om du vill ha kraftig belysning och inte har något emot en månadsavgift. Vill du äga materialet gör Reolink W330 samma jobb för 999 kronor och sparar det på ett kort hemma hos dig.",
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
    superlative: "Lägst pris, dyrast att äga",
    pros: [
      "Två kameror för 1 490 kronor, 745 per styck och lägst pris per kamera",
      "Täcker både uppfart och baksida på en gång, vilket ingen enskild kamera här gör",
      "Inbyggd spotlight för färgbild i mörker och siren på 80 dB",
      "Fyra till sex månaders batteritid, längst av de batteridrivna här",
      "Ansluter direkt till wifi utan att du behöver köpa en SmartHub",
    ],
    cons: [
      "Arlo Secure kostar 1 639 kronor om året för två kameror, alltså 4 917 kronor på tre år ovanpå köpet",
      "Ingen lokal lagring, och utan abonnemang spelas ingenting in vare sig i molnet eller i kameran",
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
      { label: "Abonnemang", value: "Krävs, 149 kr/mån", highlight: true },
      { label: "Ström", value: "Batteri, 4 till 6 mån" },
      { label: "Antal", value: "2 kameror" },
    ],
    verdict:
      "Arlo Essential 3 HD ger två kameror för 1 490 kronor, alltså 745 per styck och lägst pris per kamera på sidan.\n\nTvå kameror för det priset täcker både uppfarten och baksidan på en gång, och det gör ingen av de enskilda kamerorna här för pengarna. Batteritiden på fyra till sex månader är längst av de batteridrivna, alltså två till tre nedmonteringar om året i stället för sex. Kamerorna kopplas direkt till wifi utan att du behöver köpa till en SmartHub, och spotlighten ger färgbild i mörker.\n\n**Sedan kommer räkningen.** Arlo Secure kostar 149 kronor i månaden eller 1 639 kronor om året för ett hem med upp till fyra kameror, alltså 4 917 kronor över tre år ovanpå de 1 490 du betalade i butiken. Utan abonnemanget spelas ingenting in, varken i molnet eller i kameran, och igenkänningen av personer, fordon och paket slutar fungera, så kvar blir två rörelsevakter som larmar för varje katt. Zonerna raderas dessutom automatiskt om du slår på autospårning, ändrar synfältet eller roterar bilden 180 grader, och radering är något annat än den förskjutning Tapo och Reolink beskriver.\n\n1 080p är lägst upplösning på sidan, och totalen landar på 6 407 kronor över tre år. Reolink W330 ger 4K för 999 kronor och sedan ingenting mer, så två av dem kostar mindre än en tredjedel av det Arlo landar på.",
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
      "Sekretesszon och detekteringszon är två skilda funktioner här, vilket talar för kameran. Det som fäller den är lagringen: 1 080p på ett internminne som räcker två till fyra dygn, alltså material som skrivit över sig självt innan du kommit hem från en semestervecka. För 1 190 kronor är det för lite när Reolink W330 ger 4K på ett kort som tar 256 GB för 999.",
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
      "2 490 kronor för två kameror i 1 080p, alltså 1 245 per kamera för den lägsta upplösningen i jämförelsen. Arlo Essential 3 ger samma upplösning och samma antal för 1 000 kronor mindre, och eufys reservation om att inspelning i en sekretesszon inte helt kan undvikas gäller de här kamerorna lika mycket som SoloCam S220.",
    approxPrice: 2490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/kameraovervakning/overvakningskameror/natverkskameror/eufy-eufycam-c35-overvakningssystem-2-pack-p66977",
  },
  {
    brand: "Arlo",
    name: "Pro 6",
    reason:
      "Samma abonnemangsberoende som Essential 3 men dyrare, 1 890 kronor för en enda kamera mot 1 490 för två. Den säljs dessutom med autospårning som huvudnummer, och autospårning är precis det som raderar sekretesszonerna hos Arlo. Du får välja: kameran som följer efter rörelse, eller masken som döljer grannens tomt.",
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
      "Reolink W330 för 999 kronor hos Kjell. Den är billigast i jämförelsen, spelar in i 4K dygnet runt på ett minneskort i kameran, kräver inget abonnemang, och maskeringen ligger kvar där du ritade den eftersom kameran är fast monterad. Haken är att den behöver ström framdragen och har jämförelsens smalaste synfält, 88,8 grader. Vill du slippa kabeldragning och täcka en bred uppfart är Reolink Argus 4 Pro för 1 571 kronor hos Proshop rätt val, med 180 grader och en mask som ligger lika stilla.",
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
      "Alla fem fabrikat har funktionen, men masken beter sig olika när kameran används. Hos Arlo raderas zonerna automatiskt vid autospårning, ändrat synfält eller rotering. Hos TP-Link följer de med vyn om kameran vrids och täcker då inte längre originalområdet. Reolinks statiska mask förskjuts vid panorering, medan den dynamiska varianten sitter på tre modeller som inte säljs här. Ring har två zoner, men rörelsedetektorn känner av området ändå. eufy anger att aktivitet i zonerna kanske inte helt kan undvikas från att spelas in. Det är därför en fast monterad kamera är ett säkrare köp än en roterande om grannens tomt syns från kameraplatsen.",
  },
  {
    question: "Behöver jag abonnemang till en övervakningskamera?",
    answer:
      "Det beror helt på fabrikat. Reolink, TP-Link Tapo och eufy sparar materialet på ett minneskort i kameran och fungerar fullt ut utan abonnemang. Ring spelar inte in något alls utan: du får notiser och direktbild men ingenting sparat, och Ring Basic kostar 3,99 euro i månaden eller 39,99 euro om året för en kamera. Arlo kräver Arlo Secure både för molninspelning och för igenkänningen av personer, fordon och paket, och det kostar 99 kronor i månaden för en kamera eller 149 kronor för upp till fyra. Räknat över tre år är det 4 917 kronor för ett tvåkamerahem, alltså mer än tre gånger vad kamerorna kostade.",
  },
  {
    question: "Måste jag stänga av mikrofonen?",
    answer:
      "Om kameran tar upp ljud utanför din tomt, ja. IMY:s villkor för privatundantaget innehåller meningen att ljud inte heller tas upp utanför tomten, i samma punkt som villkoret om bilden. Varenda kamera i kategorin har mikrofon och den är påslagen från start för tvåvägsljudets skull, så det här är en inställning du ska leta upp under ljudinställningarna i appen innan kameran sitter uppe, inte efteråt. Sitter kameran mot en trottoar eller en gångväg är det den första ändring du gör.",
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
      "Var försiktig, för ljud bedöms hårdare än bild. Att spela in ett samtal som du själv deltar i är tillåtet i Sverige, men att placera en mikrofon som fångar samtal du inte deltar i kan vara olovlig avlyssning enligt brottsbalken, och det gäller oavsett vad kameran heter. En kamera vid en ytterdörr som spelar in vad grannarna säger till varandra i trapphuset är alltså ett större problem än att de syns i bild. Står kameran mot en gångväg eller en trottoar är rådet enkelt: stäng av ljudupptagningen i appen och behåll bilden.",
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
