import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { KODLAS_YTTERDORR } from "@/lib/test-pages";

/**
 * Kodlås till ytterdörr. Underlag i .agent/research/kodlas-ytterdorr.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, upplåsningsmetoder, antal koder och
 * brickor, dörrtjocklek, batterityp, IP-klass, kundbetyg och vilken låsklass
 * butiken anger. Läst på Kjells egen sida 2026-08-03. Certifikatuppgiften för
 * Yale Doorman är läst i SBSC:s eget certifikat 21-537.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte monterat, dyrkat
 * eller provat något lås.
 *
 * ## Sidans fynd: certifikatet gäller inte när du använder koden
 *
 * SBSC-certifikat 21-537, Yale Doorman L3 + Yale Home, klass S3 enligt
 * SSF 3523, giltigt till 2027-11-27. Certifikatets eget fält Additional:
 *
 * > "Gäller bortasäkert läge med blockerade användarkoder och låsöppning med
 * > nyckelbricka eller med appen Yale Home."
 *
 * Kategorin heter kodlås. Den certifierade konfigurationen har koderna
 * blockerade.
 *
 * ## Certifieringsläget, allt läst hos butik eller certifieringsorgan
 *
 * | Produkt | Vad som anges |
 * |---|---|
 * | Yale Doorman L3S | "försäkringsgodkänd ... SSF 3522 och SSF 3523" |
 * | Nimly Code Pro | "Låsklass: Klass 3", certifiering angiven som CE |
 * | Nimly Code | "Låsklass 2A och SSF3522", alltså **inte** klass 3 |
 * | Yale Doorman Classic Home | ingenting angivet |
 * | Yale Linus L2 | ingenting angivet |
 * | Aqara U200 | **"är inte godkänt enligt SSF 3522 klass 3 eller SSF 3523 klass S3"** |
 *
 * ## ⚠️ Vad vi inte kunnat räkna upp
 *
 * SBSC:s register renderas i JavaScript och deras REST-API svarar 403. Vi kan
 * alltså inte söka registret och påstår därför aldrig att ett märke saknar
 * certifikat. Det vi betygsätter är vad butiken och tillverkaren själva
 * anger, vilket också är vad en köpare kan kontrollera före köp.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-03";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "yale-doorman-l3s-flex",
    name: "Yale Doorman L3S Flex",
    shortName: "Doorman L3S",
    brand: "Yale",
    image: productImage(KODLAS_YTTERDORR.slug, "yale-doorman-l3s-flex"),
    tagline: "Enda låset med ett certifikat du kan slå upp. Läs vad det gäller för.",
    scores: { godkand: 4.5, dorren: 5, vardagen: 4.5, drift: 4, prisvarde: 2 },
    price: 5488,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-doorman-l3s-flex-svart-p66151",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 123, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Enda med läsbart certifikat",
    pros: [
      "SBSC-certifikat 21-537, klass S3 enligt SSF 3523, giltigt till 27 november 2027",
      "Butiken anger försäkringsgodkännande för både mekanisk och digital säkerhet",
      "Passar befintliga låsuttag för skandinaviska ytterdörrar utan kabeldragning",
      "Dörrtjocklek 40 till 88 millimeter utan anpassning, vilket täcker nästan varje svensk ytterdörr",
      "30 koder och 30 nyckelbrickor utan app, och upp till 254 användare med Yale Home",
      "Brandtestad upp till 120 minuter enligt tillverkaren, IP55 på utsidan",
    ],
    cons: [
      "Certifikatet gäller enligt SBSC bortasäkert läge med blockerade användarkoder",
      "5 488 kronor, nästan tre gånger det billigaste låset i jämförelsen",
      "Wi-Fi kräver ConnectX-brygga som säljs separat",
      "Insidan tål bara 0 till 50 grader, vilket utesluter ouppvärmda förstugor",
    ],
    specs: [
      { label: "Godkännande", value: "SBSC 21-537, klass S3", highlight: true },
      { label: "Certifikatet gäller", value: "Med blockerade användarkoder", highlight: true },
      { label: "Giltigt till", value: "2027-11-27", highlight: true },
      { label: "Dörrtjocklek", value: "40 till 88 mm", highlight: true },
      { label: "Koder och brickor", value: "30 av varje utan app", highlight: true },
      { label: "Upplåsning", value: "Kod, bricka, app" },
      { label: "Batteri", value: "4 × AA alkaliska" },
      { label: "Vädertålighet", value: "IP55 utsida" },
    ],
    verdict:
      "Yale Doorman L3S Flex är det enda låset här med ett certifikat du kan slå upp: klass S3 enligt SSF 3523. 5 488 kronor.\n\nSBSC, Svensk Brand- och Säkerhetscertifiering, har utfärdat certifikat 21-537 för Yale Doorman L3 tillsammans med Yale Home. Klass S3 enligt SSF 3523, den digitala motsvarigheten till klass 3, vilket är grundkravet i samtliga skyddsklasser och den låsning Stöldskyddsföreningen rekommenderar för bostäder. Giltigt till den 27 november 2027. Det är den sortens uppgift vi letar efter: ett nummer, en klass och ett datum, utfärdat av någon annan än tillverkaren.\n\nLäs sedan certifikatets fält Additional, ordagrant: gäller bortasäkert läge med blockerade användarkoder och låsöppning med nyckelbricka eller med appen Yale Home.\n\nDen certifierade konfigurationen har alltså koderna blockerade. Produkten säljs i en kategori som heter kodlås, 5 400 svenskar i månaden söker på just koden, och den funktionen ligger utanför det provade läget.\n\nVad det betyder ska sägas försiktigt, för det är lätt att dra för långt. Certifikatet säger vad godkännandet omfattar. Det säger inte att låset blir osäkert av en kod, och det säger ingenting om vad ditt försäkringsbolag accepterar. Vad det säger är att den konfiguration som är provad inte är den de flesta använder, och Stöldskyddsföreningen skriver själva att man alltid ska kontrollera vad försäkringsbolaget kräver innan man förändrar något. Ring dem, och fråga specifikt om kodöppning.\n\nI övrigt är det ett välbyggt lås. Det passar befintliga låsuttag för skandinaviska ytterdörrar utan kabeldragning, klarar dörrtjocklekar från 40 till 88 millimeter utan anpassning, tar 30 koder och 30 brickor helt utan app, och är brandtestat upp till 120 minuter enligt tillverkaren.\n\n5 488 kronor är mycket. Aqaras lås kostar 1 990 och Nimly Code 2 890. Men de två är det bara det här låset som har ett certifikat, och för den som köper ett lås för att försäkringen ska hålla är det hela skälet att bry sig.",
  },
  {
    id: "nimly-code-pro",
    name: "Nimly Code Pro",
    shortName: "Code Pro",
    brand: "Nimly",
    image: productImage(KODLAS_YTTERDORR.slug, "nimly-code-pro"),
    tagline: "Anger låsklass 3 och tar 999 koder. Certifikatet har vi inte sett.",
    scores: { godkand: 4, dorren: 4.5, vardagen: 5, drift: 4, prisvarde: 3 },
    price: 4490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/nimly-code-pro-elektroniskt-dorrlas-svart-p52194",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 1, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst i vardagen",
    pros: [
      "Butiken anger låsklass 3, den nivå som utgör grundkravet för godkänd låsenhet",
      "Upp till 999 koder och 999 nyckelbrickor, mot 30 hos Yale Doorman",
      "Kod, RFID-bricka och fingeravtryck: alla tre vägarna in",
      "Kamouflagefunktion så att koden kan döljas mellan slumpsiffror",
      "IP65 och drift ner till 35 minusgrader, tåligast av låsen",
      "Mekanisk nödnyckel och batteritid upp till ett år på tre AA",
    ],
    cons: [
      "Vi har inte hittat något certifikat hos SBSC, och butiken anger certifiering bara som CE",
      "Passar skandinaviska ytterdörrar från 1985 eller senare, men inte äldre bestånd",
      "Batterier säljs separat trots priset",
      "Smart hem-stöd kräver både Nimly Connect module och Connect Gateway, båda separata",
      "Bara ett kundomdöme hos butiken",
    ],
    specs: [
      { label: "Godkännande", value: "Låsklass 3 enligt butiken", highlight: true },
      { label: "Certifikatet gäller", value: "Certifikat ej funnet", highlight: true },
      { label: "Giltigt till", value: "Ej tillämpligt", highlight: true },
      { label: "Dörrtjocklek", value: "50 till 90 mm, från 1985", highlight: true },
      { label: "Koder och brickor", value: "999 av varje", highlight: true },
      { label: "Upplåsning", value: "Kod, bricka, fingeravtryck" },
      { label: "Batteri", value: "3 × AA, säljs separat" },
      { label: "Vädertålighet", value: "IP65, -35 till 40 °C" },
    ],
    verdict:
      "Yale Code Pro tar 999 koder och 999 brickor mot Doormans 30, och släpper in med kod, bricka eller fingeravtryck. 4 490 kronor.\n\nKjells specifikation anger Låsklass 3. Det är rätt nivå: klass 3 enligt SSF 3522 är grundkravet i samtliga skyddsklasser och den låsning Stöldskyddsföreningen rekommenderar för bostäder. Om uppgiften stämmer är det här ett lås som kan ingå i en godkänd låsenhet.\n\nVi har däremot inte hittat något certifikat. Butiken anger certifiering som CE-godkänd, vilket är något helt annat: CE är tillverkarens egen försäkran om att produkten uppfyller EU-krav, inte ett tredjepartsintyg om inbrottsskydd. SBSC:s register går inte att söka fritt i, så vi kan inte utesluta att certifikatet finns. Vi kan bara säga att vi inte sett det, och att det är det du som köpare kan kontrollera.\n\nFråga butiken efter certifikatnumret innan du köper. Det är en rimlig fråga och den tar en minut att svara på.\n\nI vardagen är låset det bästa av de sex. 999 koder och 999 brickor mot Yale Doormans 30. Kod, bricka och fingeravtryck: alla tre vägarna in. Kamouflagefunktion som låter dig omge koden med slumpsiffror så att den inte går att läsa av över axeln. Automatisk låsning. Mekanisk nödnyckel. IP65 och drift ner till 35 minusgrader, vilket är den enda produkten här som klarar en oisolerad förstuga i norrländsk vinter.\n\nTvå hakar utöver certifikatet. Det passar skandinaviska ytterdörrar från 1985 eller senare, så bor du i ett äldre hus ska du mäta först. Och uppkopplingen kräver två separata tillbehör, Connect module och Connect Gateway, vilket gör att priset inte slutar på 4 490 kronor om du vill styra låset från mobilen.",
  },
  {
    id: "nimly-code",
    name: "Nimly Code",
    shortName: "Code",
    brand: "Nimly",
    image: productImage(KODLAS_YTTERDORR.slug, "nimly-code"),
    tagline: "Anger klass 2A, och 2A är inte en godkänd låsenhet.",
    scores: { godkand: 2.5, dorren: 4.5, vardagen: 4, drift: 4, prisvarde: 4 },
    price: 2890,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/nimly-code-elektroniskt-dorrlas-black-p52214",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 20, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Ärligast om sin klass",
    pros: [
      "Anger sin låsklass rakt ut, vilket tre av de sex låsen inte gör",
      "999 koder och 999 nyckelbrickor, samma kapacitet som storebror",
      "IP65 och drift ner till 35 minusgrader",
      "Mekanisk nödnyckel, och tre AA-batterier som räcker länge",
      "2 890 kronor, 1 600 mindre än Code Pro",
    ],
    cons: [
      "Klass 2A är enligt SSF inte en godkänd låsenhet, som kräver klass 3",
      "SSF skriver själva om 2A: kontrollera försäkringskrav",
      "Ingen fingerläsare, till skillnad från Code Pro",
      "Uppkoppling kräver separat modul",
    ],
    specs: [
      { label: "Godkännande", value: "Låsklass 2A, SSF 3522", highlight: true },
      { label: "Certifikatet gäller", value: "2A når inte godkänd låsenhet", highlight: true },
      { label: "Giltigt till", value: "Ej tillämpligt", highlight: true },
      { label: "Dörrtjocklek", value: "Ej angiven av butiken", highlight: true },
      { label: "Koder och brickor", value: "999 av varje", highlight: true },
      { label: "Upplåsning", value: "Kod, bricka" },
      { label: "Batteri", value: "3 × AA" },
      { label: "Vädertålighet", value: "IP65, -35 till 40 °C" },
    ],
    verdict:
      "Yale Code kostar 2 890 kronor, 1 600 mindre än Code Pro, och har samma kapacitet: 999 koder och 999 nyckelbrickor.\n\nKjells specifikation anger Låsklass 2A och SSF3522. Det är ovanligt rakt, och tre av sex produkter här anger ingen klass alls.\n\nProblemet är vad 2A betyder. Stöldskyddsföreningen definierar klass 2A som en låsenhet där kravet på inbrottsskydd från dörrens utsida är detsamma som för klass 3, men där behörig manövrering från insidan underordnas utgång och utrymning. Deras exempel är lägenheter utan annan entréväg, och de skriver i samma mening: kontrollera försäkringskrav.\n\nEn godkänd låsenhet kräver klass 3. 2A är alltså inte det, oavsett att inbrottsskyddet utifrån är likvärdigt. Skillnaden ligger i hur låset manövreras inifrån, och det är den skillnaden ett försäkringsbolag kan fästa avseende vid.\n\nDet ska inte läsas som att låset är dåligt. Utifrån sett har det samma krav på sig som klass 3, och för en lägenhet där utrymning väger tyngre än inbrottsskydd inifrån kan 2A vara precis rätt val. Men den som köper för att uppfylla ett försäkringskrav ska veta vad som står i specifikationen.\n\nI övrigt är det ett starkt lås för pengarna. Samma 999 koder och 999 brickor som Code Pro, samma IP65 och samma köldtålighet ner till 35 minusgrader, mekanisk nödnyckel, och 1 600 kronor billigare. Det du avstår från är fingerläsaren.",
  },
  {
    id: "yale-doorman-classic-home",
    name: "Yale Doorman Classic Home",
    shortName: "Classic Home",
    brand: "Yale",
    image: productImage(KODLAS_YTTERDORR.slug, "yale-doorman-classic-home"),
    tagline: "138 omdömen och rätt passform, men butiken anger ingen låsklass.",
    scores: { godkand: 1.5, dorren: 5, vardagen: 3.5, drift: 4, prisvarde: 3.5 },
    price: 3490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-doorman-classic-home-svart-p66169",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 138, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Mest omdömt av de sex",
    pros: [
      "138 kundomdömen med snittet 4,5, mest prövat av låsen",
      "Samma Doorman-arkitektur som vinnaren, byggd för skandinaviska låsuttag",
      "Brandtestad till EI30 enligt EN 1191 och IP55 på utsidan",
      "Tål 25 minusgrader på utsidan, och fyra AA-batterier räcker normalt ett år",
      "3 490 kronor, 2 000 mindre än L3S Flex",
    ],
    cons: [
      "Butiken anger ingen låsklass och ingen SSF-hänvisning över huvud taget",
      "Max tio användarkoder och tio nyckelbrickor, mot 999 hos Nimly",
      "En nyckelbricka kan registreras på högst sex lås",
      "Insidan tål bara 0 till 50 grader",
    ],
    specs: [
      { label: "Godkännande", value: "Ej angivet av butiken", highlight: true },
      { label: "Certifikatet gäller", value: "Ingen uppgift", highlight: true },
      { label: "Giltigt till", value: "Ej tillämpligt", highlight: true },
      { label: "Dörrtjocklek", value: "Skandinaviskt låsuttag", highlight: true },
      { label: "Koder och brickor", value: "10 av varje", highlight: true },
      { label: "Upplåsning", value: "Kod, bricka, fjärrkontroll" },
      { label: "Batteri", value: "4 × AA, cirka ett år" },
      { label: "Brandtest", value: "EI30 enligt EN 1191" },
    ],
    verdict:
      "Yale Classic Home har 138 kundomdömen på 4,5, fler än något annat lås här, och kostar 3 490 kronor.\n\n138 kundomdömen med 4,5 i snitt är mer än något annat lås här har. Det är ett Doorman, byggt för samma skandinaviska låsuttag som vinnaren, brandtestat till EI30 enligt EN 1191, IP55 på utsidan och tåligt ner till 25 minusgrader. Fyra AA-batterier räcker normalt ett år. Som produkt är det välkänt och välfungerande.\n\nMen Kjells specifikation innehåller ingen låsklass och ingen hänvisning till SSF 3522 eller 3523. Det ska sägas rakt vad det betyder och vad det inte betyder: det betyder inte att låset saknar godkännande. Yales Doorman-familj har historiskt varit försäkringsgodkänd, och för L3S skriver samma butik ut det uttryckligen. Det betyder att uppgiften inte finns där du handlar, och att du därför inte kan kontrollera saken innan du betalar.\n\nEftersom vi bedömer exakt det, och inte vad produkten kan tänkas klara, ger det ett lågt betyg. Fråga butiken eller Yale efter klass och certifikatnummer, och betrakta placeringen som en uppmaning att göra det snarare än som en dom över låset.\n\nDen praktiska begränsningen är antalet. Tio användarkoder och tio brickor räcker för en familj. Det räcker inte för en bostadsrättsförening, en uthyrning eller ett hushåll med städhjälp, hantverkare och tonåringars kompisar. Nimly tar 999 av varje för 600 kronor mindre.\n\n3 490 kronor är 2 000 mindre än L3S Flex. Skillnaden i pengar motsvarar ungefär skillnaden i vad du kan ta reda på i förväg.",
  },
  {
    id: "aqara-u200",
    name: "Aqara Smart Lock U200",
    shortName: "U200",
    brand: "Aqara",
    image: productImage(KODLAS_YTTERDORR.slug, "aqara-u200"),
    tagline: "Billigast och smartast, och butiken skriver ut att det inte är godkänt.",
    scores: { godkand: 1, dorren: 3, vardagen: 4.5, drift: 3.5, prisvarde: 4.5 },
    price: 1990,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/aqara-smart-lock-u200-svart-p57872",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 16, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Billigast, och tydligast om vad det inte är",
    pros: [
      "1 990 kronor, mindre än hälften av vinnaren",
      "Fingeravtryck, NFC, PIN-kod och mekanisk nyckel: fyra vägar in",
      "Matter-stöd ger Apple HomeKit, Google Home och Amazon Alexa på samma gång",
      "Anti-peep-skydd låter dig omge PIN-koden med slumpsiffror",
      "Uppladdningsbart batteri med upp till sex månaders drift, och adapterkit ingår",
    ],
    cons: [
      "Kjell skriver uttryckligen att låset inte är godkänt enligt SSF 3522 klass 3 eller SSF 3523 klass S3",
      "Monteras på låscylindern med adapterkit, inte i ett skandinaviskt låsuttag",
      "IPX5 och drift bara ner till 15 minusgrader",
      "Knappsatsen drivs av separata AAA-batterier utöver låsets eget",
      "Bara 16 kundomdömen",
    ],
    specs: [
      { label: "Godkännande", value: "Butiken: ej godkänt", highlight: true },
      { label: "Certifikatet gäller", value: "Inget certifikat", highlight: true },
      { label: "Giltigt till", value: "Ej tillämpligt", highlight: true },
      { label: "Dörrtjocklek", value: "Adapterkit för låscylinder", highlight: true },
      { label: "Koder och brickor", value: "Ej angivet antal", highlight: true },
      { label: "Upplåsning", value: "Finger, NFC, kod, nyckel" },
      { label: "Batteri", value: "Laddbart, upp till 6 mån" },
      { label: "Vädertålighet", value: "IPX5, -15 till 66 °C" },
    ],
    verdict:
      "Aqara U200 kostar 1 990 kronor, mindre än hälften av vinnaren, och släpper in på fyra sätt: fingeravtryck, NFC, PIN-kod och mekanisk nyckel.\n\nKjells produktsida avslutar specifikationen med en mening som förtjänar beröm: Aqara Smart Lock U200 är inte godkänt enligt SSF 3522 klass 3 eller SSF 3523 klass S3. Det är ovanligt av en butik att skriva ut det negativa, och det är upplysningen en köpare behöver för att välja med öppna ögon.\n\nDet drar ner den på det vi väger till trettio procent, och det ska det göra. Men det gör inte produkten dålig. Den gör mest av alla för minst pengar: fingeravtryck, NFC, PIN-kod och mekanisk nyckel, Matter-stöd som ger Apple HomeKit, Google Home och Alexa samtidigt, anti-peep-skydd som låter dig omge koden med slumpsiffror, och ett uppladdningsbart batteri som håller ett halvår.\n\nDen andra begränsningen är passformen. U200 monteras på låscylindern med ett adapterkit, den europeiska arkitekturen, och inte i det skandinaviska låsuttag som Doorman och Nimly är byggda för. På en svensk ytterdörr med tillhållarlåshus är det inte självklart att den passar alls. Mät och kontrollera innan du beställer.\n\nIPX5 och drift ner till bara 15 minusgrader är också svagt för utomhusbruk i Sverige, och knappsatsen kräver egna AAA-batterier utöver låsets.\n\nKöp den om du vill ha smart hem-funktioner i ett innerutrymme, ett förråd eller en dörr där försäkringens låskrav inte gäller. Köp den inte för att uppfylla ett försäkringskrav, för butiken har redan talat om att den inte gör det.",
  },
  {
    id: "yale-linus-l2",
    name: "Yale Linus Smartlås L2",
    shortName: "Linus L2",
    brand: "Yale",
    image: productImage(KODLAS_YTTERDORR.slug, "yale-linus-l2"),
    tagline: "Monteras på vredet inifrån och rör inte låset. Har heller ingen kod.",
    scores: { godkand: 1.5, dorren: 3.5, vardagen: 3.5, drift: 3, prisvarde: 3.5 },
    price: 3149,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-linus-smartlas-l2-svart-p66153",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 18, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Rör inte den befintliga låsenheten",
    pros: [
      "Monteras utanpå det befintliga vredet på insidan, så låsenheten i dörren är orörd",
      "Passar skandinaviska låshus och finska ABLOY LC100 och 4190",
      "Tvåfaktorsautentisering och 128-bitars AES-kryptering",
      "Laddbart batteripack med USB-C och upp till sex månaders drift",
      "Doorsense-magnet visar om dörren faktiskt är stängd, inte bara låst",
    ],
    cons: [
      "Ingen knappsats: låset öppnas med app eller NFC-tagg, inte med kod",
      "Butiken anger ingen låsklass och ingen SSF-hänvisning",
      "Kräver wifi och app för fjärrstyrning, mest molnberoende av låsen",
      "648 gram monterat på insidans vred syns och känns",
      "3 149 kronor för ett tillbehör till ett lås du redan har",
    ],
    specs: [
      { label: "Godkännande", value: "Ej angivet av butiken", highlight: true },
      { label: "Certifikatet gäller", value: "Ingen uppgift", highlight: true },
      { label: "Giltigt till", value: "Ej tillämpligt", highlight: true },
      { label: "Dörrtjocklek", value: "Monteras på insidans vred", highlight: true },
      { label: "Koder och brickor", value: "Ingen kod, NFC-tagg", highlight: true },
      { label: "Upplåsning", value: "App, NFC, vred" },
      { label: "Batteri", value: "Laddbart, upp till 6 mån" },
      { label: "Kryptering", value: "128-bitars AES, tvåfaktor" },
    ],
    verdict:
      "Yale Linus L2 monteras utanpå insidans vred och rör inte den befintliga låsenheten alls. 3 149 kronor.\n\nLinus monteras utanpå det befintliga vredet på insidan av dörren. Ingenting i själva låset byts ut. Det betyder att en godkänd låsenhet som redan sitter i dörren i princip står kvar orörd, vilket är ett argument ingen av de andra produkterna kan använda.\n\nVi säger i princip med flit. Vi har inte hittat något skriftligt besked från SSF om huruvida ett motoriserat vred på insidan påverkar bedömningen av låsenheten, och vi påstår därför ingenting. Det är en rimlig slutsats av hur normen definierar enheten, men en slutsats är inte ett citat. Fråga ditt försäkringsbolag.\n\nDen praktiska invändningen är enklare: det här är inget kodlås. Det finns ingen knappsats. Du öppnar med appen eller med en NFC-tagg, och den som glömt telefonen får använda nyckeln som förut. På en sida om kodlås till ytterdörr är det en avgörande begränsning, och det är därför den hamnar sist trots att den är genomtänkt byggd.\n\nDet den gör bra är säkerheten runt appen. Tvåfaktorsautentisering med verifiering via e-post eller telefonnummer, 128-bitars AES-kryptering och en Doorsense-magnet som skiljer på låst och faktiskt stängd. Passformen mot skandinaviska låshus och finska ABLOY LC100 och 4190 är också ovanligt tydligt angiven.\n\n3 149 kronor är mycket för ett tillbehör till ett lås du redan äger, särskilt när Nimly Code kostar 2 890 och byter ut hela låset mot något som anger en klass.",
  },
];

export const KODLAS_PRODUCTS: Product[] = resolveProducts(KODLAS_YTTERDORR, SEEDS);

/**
 * Produkter vi tittat på och valt bort. Skälet står utskrivet, eftersom en
 * bortvald produkt utan motivering ser ut som ett förbiseende.
 */
export const KODLAS_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Nimly",
    name: "Touch Pro med fingerläsare",
    reason:
      "113 kundomdömen med snittet 4,5, näst mest prövat av låsen, och 3 990 kronor. Rankas ändå inte: Kjell publicerar ingen specifikation alls för modellen, så vare sig låsklass, dörrtjocklek eller batterityp går att läsa, och Nimlys egen sajt säger ingenting om saken. Vi rankar inte en produkt där det vi väger tyngst inte går att belägga. Fråga butiken efter låsklass om du överväger den, eftersom systermodellerna anger klass 2A respektive klass 3.",
    approxPrice: 3990,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/nimly-touch-pro-elektroniskt-dorrlas-med-fingerlasare-ultimate-black-p52186",
  },
  {
    brand: "Danalock",
    name: "V3 Scandi",
    reason:
      "2 290 kronor och 27 kundomdömen, och namnet lovar rätt passform för skandinaviska låshus. Men Kjell publicerar ingen teknisk specifikation alls: varken låsklass, monteringssätt, batterityp eller upplåsningsmetoder. Samma skäl som Nimly Touch Pro. Danalock monteras dessutom på insidans vred, samma arkitektur som Yale Linus, vilket betyder att den inte heller har någon knappsats.",
    approxPrice: 2290,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/danalock-v3-scandi-elektroniskt-dorrlas-p51039",
  },
  {
    brand: "Yale",
    name: "Smart Code Handle för balkongdörr och fönster",
    reason:
      "En annan produkt för ett annat problem. Handtaget med kodlås sitter på balkongdörrar och fönster, inte på ytterdörren, och omfattas därför inte av resonemanget om godkänd låsenhet på entrédörren. Finns i höger-, vänster- och rakt utförande, vilket är värt att kontrollera innan beställning.",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-smart-code-handle-rakt-utforande-p52080",
  },
  {
    brand: "Yale",
    name: "ConnectX Wi-Fi-brygga",
    reason:
      "Tillbehör och inte ett lås, men räkna med det i priset om du vill styra Doorman från mobilen på avstånd. Utan brygga fungerar låset lokalt med kod och bricka, vilket för certifieringens del är det läge som gäller ändå.",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-connectx-wi-fi-bridge-p66154",
  },
  {
    brand: "Nimly",
    name: "Connect module och Connect Gateway",
    reason:
      "Två separata tillbehör som krävs för att Nimlys lås ska nå ett smart hem. Nämns här eftersom priset i hyllan inte är slutpriset för den som vill styra låset från mobilen, och eftersom det är lätt att missa att det är två saker och inte en.",
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/nimly-connect-module-p52187",
  },
];

export const KODLAS_FAQ = [
  {
    question: "Vilket kodlås till ytterdörr är bäst 2026?",
    answer:
      "Yale Doorman L3S Flex för 5 488 kronor hos Kjell, om du köper för att försäkringen ska hålla. Det är det enda låset i vår jämförelse där vi kunnat läsa ett certifikat hos SBSC: nummer 21-537, klass S3 enligt SSF 3523, giltigt till 27 november 2027. Läs dock vad certifikatet gäller för, se nästa fråga. Vill du ha mest funktion per krona är Nimly Code Pro för 4 490 kronor starkare i vardagen, med 999 koder, fingerläsare och drift ner till 35 minusgrader.",
  },
  {
    question: "Gäller certifikatet när jag använder koden?",
    answer:
      "Inte enligt certifikatet. SBSC:s certifikat 21-537 för Yale Doorman L3 anger i fältet Additional att godkännandet gäller bortasäkert läge med blockerade användarkoder och låsöppning med nyckelbricka eller med appen Yale Home. Den provade konfigurationen har alltså koderna blockerade. Det säger inte att låset blir osäkert av en kod, och det säger ingenting om vad ditt försäkringsbolag accepterar. Stöldskyddsföreningen skriver att man alltid ska kontrollera vad försäkringsbolaget kräver innan man förändrar något, så ring dem och fråga specifikt om kodöppning.",
  },
  {
    question: "Vad är en godkänd låsenhet?",
    answer:
      "Hela låsenheten, inte bara låset. Enligt Stöldskyddsföreningen består den av låshus, låscylinder, säkerhetsslutbleck och förstärkningsbehör, och för att vara godkänd ska hela enheten och varje ingående produkt var för sig nå klass 3 enligt SSF 3522 eller klass S3 enligt SSF 3523. Klass 3 är grundkravet i samtliga skyddsklasser och den låsning SSF rekommenderar även för bostäder. Byter du ut en del av enheten kan godkännandet påverkas, och det är därför SSF skriver att man ska kontrollera försäkringskraven innan man förändrar något.",
  },
  {
    question: "Vad är skillnaden mellan SSF 3522 och SSF 3523?",
    answer:
      "SSF 3522 gäller mekaniska och elektromekaniska låsenheter med klasserna 1A, 1B, 2A, 2B, 3, 4 och 5. SSF 3523 gäller digitala låsenheter och har klasserna S1, S2, S3 och S5. Den digitala normen provar tre saker samtidigt: mekaniskt inbrottsskydd enligt SSF 3522, hantering av digitala nycklar enligt SSF 1075, och motstånd mot elektroniskt angrepp enligt prEN 16867. Att ett svenskt certifikat även granskar hur appen hanterar nycklarna är det få som känner till. Notera att SSF 3523 saknar motsvarighet till SSF 3522 klass 4.",
  },
  {
    question: "Räcker låsklass 2A?",
    answer:
      "Inte för en godkänd låsenhet, som kräver klass 3. Klass 2A har samma krav på inbrottsskydd från dörrens utsida som klass 3, men behörig manövrering från insidan underordnas utgång och utrymning. SSF:s eget exempel på när 2A används är lägenheter utan annan entréväg, och de skriver i samma mening att man ska kontrollera försäkringskraven. Nimly Code anges av butiken som klass 2A, vilket är ovanligt öppet redovisat, men det är inte samma sak som klass 3.",
  },
  {
    question: "Passar internationella smarta lås på en svensk ytterdörr?",
    answer:
      "Ofta inte utan vidare. Svenska ytterdörrar har ett eget låsuttag för skandinaviska låshus, medan många internationella lås är byggda för europeisk profilcylinder eller amerikansk deadbolt. Yale Doorman och Nimly är gjorda för det svenska uttaget. Aqara U200 monteras på låscylindern med ett adapterkit, och Yale Linus och Danalock monteras utanpå det befintliga vredet på insidan. Mät dörrtjockleken och titta efter vilken låshustyp du har innan du beställer.",
  },
  {
    question: "Får jag byta lås i en bostadsrätt eller hyresrätt?",
    answer:
      "Fråga först. Ytterdörren tillhör normalt föreningen respektive hyresvärden och inte den boende, och i många fastigheter ingår låset i ett låssystem med huvudnyckel för fastighetsskötsel. Att byta ut låsenheten kan därför kräva tillstånd även när du betalar för det själv. Ett lås som monteras utanpå insidans vred, som Yale Linus eller Danalock, rör inte den befintliga enheten och är ofta enklare att få igenom, men frågan ska ändå ställas.",
  },
  {
    question: "Vad händer när batteriet tar slut?",
    answer:
      "Det beror på modell, och det är värt att kontrollera innan köp. Nimlys lås har en mekanisk nödnyckel, och Aqara U200 levereras med mekanisk nyckel som ett av fyra sätt att öppna. Yale Doorman drivs av fyra AA-batterier som normalt räcker ett år och varnar i god tid. Lås som monteras på insidans vred, som Yale Linus, påverkar inte den mekaniska nyckeln alls, eftersom det ursprungliga låset sitter kvar.",
  },
  {
    question: "Är CE-märkning samma sak som godkänd?",
    answer:
      "Nej. CE är tillverkarens egen försäkran om att produkten uppfyller tillämpliga EU-krav, och den säger ingenting om inbrottsskydd. En godkänd låsenhet enligt SSF kräver tredjepartscertifiering: ett oberoende organ som SBSC kontrollerat att provningen skett korrekt och med godkänt resultat. SSF skriver själva att man alltid ska leta efter certifikatsmärket som visar vilken klass låsenheten uppfyller.",
  },
  {
    question: "Räcker det att byta cylindern, eller måste hela låset bytas?",
    answer:
      "Det räcker nästan aldrig med cylindern, och det är den vanligaste missuppfattningen om kodlås. En godkänd låsenhet enligt SSF är fyra delar som bedöms tillsammans: låshus, slutbleck, cylinder och behör. Varje del måste nå den klass enheten ska certifieras i, så en klass 3-cylinder i ett låshus av lägre klass ger ingen klass 3-enhet. Byter du bara den elektroniska delen på en dörr med gammalt låshus har du alltså ändrat hur du låser upp, inte hur svårt det är att bryta upp. Kontrollera vilka delar tillverkaren räknar in i det certifikat de hänvisar till.",
  },
  {
    question: "Krävs ett certifierat lås för att hemförsäkringen ska gälla?",
    answer:
      "Det beror på försäkringsbolaget och på vad du har försäkrat, och det är bolagets villkor som avgör och inte vi. Det du bör veta är att villkoren när de ställer krav brukar hänvisa till SSF:s klasser, samma system som avsnittet ovan går igenom, och att kravet gäller den kompletta låsenheten och inte bara låshuset. Läs också certifikatets tilläggsvillkor. Certifikatet för marknadens ledande kodlås anger att godkännandet gäller i bortasäkert läge med blockerade användarkoder, vilket är värt att känna till innan man förlitar sig på det. Kontrollera alltid mot ditt eget villkorshäfte innan du köper.",
  },
];
