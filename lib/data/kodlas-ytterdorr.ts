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
 * brickor, dörrtjocklek, batterityp, IP-klass och kundbetyg, lästa på Kjells
 * egen sida 2026-08-03. Certifikatuppgifterna är lästa i SBSC:s egna
 * certifikat, ett i taget, 2026-08-06. Dörrtjockleken för Doorman Classic är
 * läst i Yales egen installationsguide, och klasserna för Nimly och L3S är
 * bekräftade en andra gång på tillverkarens egen sida.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte monterat, dyrkat
 * eller provat något lås.
 *
 * ## Sidans fynd: varje certifikat har villkor, och de står i ett fält
 *
 * Alla fem certifierade lås här bär ett `Övrigt`- eller `Additional`-fält som
 * stänger av eller kräver något. Två av dem tar bort den funktion produkten
 * säljs på:
 *
 * | Lås | Vad certifikatet kräver |
 * |---|---|
 * | Yale Doorman L3 + Yale Home (21-537, S3) | bortasäkert läge, **blockerade användarkoder** |
 * | Nimly Code Pro (22-316/317/318, klass 3) | **kamouflagefunktionen avstängd**, tvåfaktor på |
 * | Nimly Code (22-520/521/522, klass 2A) | samma villkor |
 * | Yale Doorman Classic (20-19, klass 2A) | integritetsswitch hög, automatisk låsning på |
 * | Yale Linus L2 (24-365, klass 2A) | gäller tillsammans med Yale Dot |
 *
 * Det är SSF:s allmänna regel gjord konkret på hela fältet: en låsenhet är
 * "certifierad med vissa, men inte alla, inställningar aktiverade".
 *
 * ## Certifieringsläget, allt läst i certifikatet hos SBSC
 *
 * | Produkt | Certifikat | Klass | Giltigt till |
 * |---|---|---|---|
 * | Yale Doorman L3S | 20-172 låshus, 21-537 digital låsenhet | Klass 3 + S3 | 2030-10-22, 2027-11-27 |
 * | Nimly Code Pro | 22-316 cylinder, 22-317 låshus, 22-318 slutbleck | Klass 3 ×3 | 2027-09-07 |
 * | Nimly Code | 22-520 slutbleck, 22-521 låshus (klass 3), 22-522 cylinder | **Klass 2A** | 2027-10-30 |
 * | Yale Doorman Classic | 20-19 låshus | Klass 2A | 2031-09-13, förnyat |
 * | Yale Linus L2 | 24-365 mekatronikcylinder | Klass 2A | 2030-02-11 |
 * | Aqara U200 | inget | ej godkänt enligt SSF | — |
 *
 * ⚠️ **Nimly Code kapas av sin cylinder.** Låshus och slutbleck är klass 3,
 * mekatronikcylindern klass 2A, och eftersom varje ingående del ska nå klass 3
 * var för sig blir enheten 2A. Det är förklaringen till Kjells uppgift, och den
 * är mer användbar än uppgiften.
 *
 * ⚠️ **Doorman Classic är fysiskt oförändrad men omklassad.** Yale skriver
 * själva att lås tillverkade till och med 2020-06-26 är klass 3 och lås efter
 * det klass 2A, och att klassen på förpackningen gäller oavsett inköpsdatum.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-03";

/** Alla certifikat lästa ett i taget hos SBSC detta datum. */
export const CERTS_CHECKED = "2026-08-06";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "yale-doorman-l3s-flex",
    name: "Yale Doorman L3S Flex",
    shortName: "Doorman L3S",
    brand: "Yale",
    image: productImage(KODLAS_YTTERDORR.slug, "yale-doorman-l3s-flex"),
    tagline: "Provat både som lås och som app, av någon annan än tillverkaren.",
    scores: { godkand: 5, dorren: 5, vardagen: 4.5, drift: 4, prisvarde: 2 },
    price: 5488,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-doorman-l3s-flex-svart-p66151",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 123, scale: 5, checkedAt: PRICE_CHECKED },
    award: "winner",
    superlative: "Bäst för försäkringskravet",
    pros: [
      "Klass 3 enligt SSF 3522 och klass S3 enligt SSF 3523, alltså den nivå en godkänd låsenhet kräver",
      "Enda låset här som också är prövat digitalt: nyckelhantering enligt SSF 1075 och elektroniskt angrepp enligt prEN 16867",
      "Sitter i befintligt skandinaviskt låsuttag utan kabeldragning, och klarar 40 till 88 millimeters dörrtjocklek",
      "30 koder och 30 nyckelbrickor fungerar helt utan app, och upp till 254 användare med Yale Home",
      "Brandtestad upp till 120 minuter enligt tillverkaren, IP55 på utsidan",
    ],
    cons: [
      "Det digitala godkännandet gäller bortasäkert läge med användarkoderna blockerade",
      "5 488 kronor, nästan tre gånger så mycket som Aqara U200",
      "30 koder räcker inte för en uthyrning, och Nimly Code Pro tar 999 för 1 000 kronor mindre",
      "Wi-Fi kräver ConnectX-brygga som säljs separat",
      "Insidan tål bara 0 till 50 grader, vilket utesluter ouppvärmda förstugor",
    ],
    specs: [
      { label: "Godkännande", value: "Klass 3 och S3", highlight: true },
      { label: "Certifikat", value: "SBSC 20-172 och 21-537", highlight: true },
      { label: "Villkor i certifikatet", value: "S3 gäller med blockerade koder", highlight: true },
      { label: "Giltigt till", value: "2030-10-22 och 2027-11-27", highlight: true },
      { label: "Dörrtjocklek", value: "40 till 88 mm", highlight: true },
      { label: "Koder och brickor", value: "30 av varje utan app", highlight: true },
      { label: "Upplåsning", value: "Kod, bricka, app" },
      { label: "Batteri", value: "4 × AA alkaliska" },
      { label: "Vädertålighet", value: "IP55 utsida" },
    ],
    verdict:
      "Yale Doorman L3S Flex är det enda låset här som är prövat i två normer: klass 3 för metallen enligt SSF 3522, och klass S3 för den digitala delen enligt SSF 3523. 5 488 kronor.\n\nSkillnaden mot ett rent mekaniskt certifikat är större än den låter. S3 kräver att någon annan än tillverkaren granskat hur appen distribuerar och lagrar dina nycklar enligt SSF 1075, och hur låset står emot elektroniskt angrepp enligt prEN 16867. De andra låsen här är prövade som lås. Det här är prövat som lås och som mjukvara. I dörren sitter det i befintligt skandinaviskt låsuttag utan kabeldragning, klarar 40 till 88 millimeter, tar 30 koder och 30 nyckelbrickor helt utan app och är brandtestat upp till 120 minuter enligt Yale.\n\nHaken står i certifikatet självt. SBSC 21-537 gäller bortasäkert läge med blockerade användarkoder och upplåsning med nyckelbricka eller Yale Home-appen. Det mekaniska godkännandet, certifikat 20-172, bär inga sådana villkor och gäller i klass 3 oavsett hur du öppnar. Men den digitala prövningen, alltså den som skiljer låset från fältet, är gjord med knappsatsen avstängd. Ring försäkringsbolaget och fråga specifikt om kodöppning innan du betalar.\n\n**Köp det här låset om skälet till köpet är att försäkringen ska hålla.** Inget annat lås i jämförelsen bär två certifikat, och inget annat är prövat på nyckelhanteringen. Ska du dela ut koder till städhjälp, hantverkare och en uthyrning är 30 för få, och då är Nimly Code Pro rätt lås för 1 000 kronor mindre.",
  },
  {
    id: "nimly-code-pro",
    name: "Nimly Code Pro",
    shortName: "Code Pro",
    brand: "Nimly",
    image: productImage(KODLAS_YTTERDORR.slug, "nimly-code-pro"),
    tagline: "999 koder att dela ut, och ett certifikat som räknar koden.",
    scores: { godkand: 4.5, dorren: 4.5, vardagen: 5, drift: 4, prisvarde: 3 },
    price: 4490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/nimly-code-pro-elektroniskt-dorrlas-svart-p52194",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 5, count: 1, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för många användare",
    pros: [
      "Klass 3 enligt SSF 3522 på alla tre certifierade delarna: cylinder, låshus och slutbleck",
      "Certifikatet gäller med koden påslagen, med kravet att koderna har minst fyra siffror",
      "999 koder och 999 nyckelbrickor, mot 30 hos Yale Doorman L3S",
      "Kod, RFID-bricka och fingeravtryck: tre vägar in",
      "IP65 och drift ner till 35 minusgrader, tåligast av låsen här",
      "Mekanisk nödnyckel och batteritid upp till ett år på tre AA",
    ],
    cons: [
      "Kamouflagefunktionen, som döljer koden mellan slumpsiffror, ska vara avstängd för att certifikatet ska gälla",
      "Prövat bara mekaniskt, alltså ingen granskning av app och nyckelhantering som Yale Doorman L3S har",
      "Passar dörrar från 45 till 90 millimeter, men bara skandinaviska ytterdörrar från 1985 eller senare",
      "Batterier säljs separat trots priset",
      "Smart hem-stöd kräver både Nimly Connect module och Connect Gateway, båda separata",
    ],
    specs: [
      { label: "Godkännande", value: "Klass 3, SSF 3522", highlight: true },
      { label: "Certifikat", value: "SBSC 22-316, 22-317, 22-318", highlight: true },
      { label: "Villkor i certifikatet", value: "Kamouflage av, tvåfaktor på", highlight: true },
      { label: "Giltigt till", value: "2027-09-07", highlight: true },
      { label: "Dörrtjocklek", value: "45 till 90 mm, från 1985", highlight: true },
      { label: "Koder och brickor", value: "999 av varje", highlight: true },
      { label: "Upplåsning", value: "Kod, bricka, fingeravtryck" },
      { label: "Batteri", value: "3 × AA, säljs separat" },
      { label: "Vädertålighet", value: "IP65, -35 till 40 °C" },
    ],
    verdict:
      "Nimly Code Pro är låset för hushållet som behöver dela ut koder: 999 av dem, och 999 nyckelbrickor. 4 490 kronor.\n\nTre SBSC-certifikat i klass 3 enligt SSF 3522 täcker cylindern, låshuset och slutblecket, alltså tre av de fyra delar en godkänd låsenhet består av, var för sig på den nivå normen kräver. Och till skillnad från Yales digitala godkännande gäller de med koden påslagen, med kravet att koderna har minst fyra siffror. **Det är skillnaden som räknas för den som faktiskt tänker öppna med en kod: här omfattas den.** I övrigt släpper låset in med kod, bricka eller fingeravtryck, tål IP65 och 35 minusgrader, och har en mekanisk nödnyckel för dagen batterierna tar slut.\n\nVillkoren kostar dig en funktion. Kamouflagefunktionen, som låter dig omge koden med slumpsiffror så att den inte går att läsa av över axeln, ska vara avstängd för att godkännandet ska gälla, samtidigt som anti-inbrottsfunktionen, bortasäkert läge och tvåfaktorsinloggning ska vara påslagna. Låset är dessutom bara prövat mekaniskt. Ingen har granskat hur appen hanterar nycklarna, vilket Yale Doorman L3S är prövat på.\n\nHar du städhjälp, hantverkare, en uthyrning eller tonåringar med kompisar är det här rätt lås, och 1 000 kronor billigare än vinnaren. Bor du i ett hus byggt före 1985 ska du mäta först. Och räknar du med att styra låset från mobilen slutar priset inte på 4 490 kronor, eftersom Connect module och Connect Gateway är två separata tillbehör.",
  },
  {
    id: "nimly-code",
    name: "Nimly Code",
    shortName: "Code",
    brand: "Nimly",
    image: productImage(KODLAS_YTTERDORR.slug, "nimly-code"),
    tagline: "Samma 999 koder som storebror, för 1 600 kronor mindre.",
    scores: { godkand: 2.5, dorren: 4.5, vardagen: 4, drift: 4, prisvarde: 4 },
    price: 2890,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/nimly-code-elektroniskt-dorrlas-black-p52214",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 20, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för lägenheten",
    pros: [
      "999 koder och 999 nyckelbrickor, samma kapacitet som Code Pro",
      "Låshus och slutbleck är certifierade i klass 3, samma nivå som Code Pro",
      "IP65 och drift ner till 35 minusgrader",
      "Mekanisk nödnyckel, och tre AA-batterier som räcker länge",
      "2 890 kronor, 1 600 mindre än Code Pro",
    ],
    cons: [
      "Cylindern är certifierad i klass 2A och drar ner hela enheten dit, eftersom varje del måste nå klass 3 var för sig",
      "Klass 2A räcker inte till en godkänd låsenhet, och behöver du det är Code Pro samma lås med en klass 3-cylinder",
      "Ingen fingerläsare, till skillnad från Code Pro",
      "Kamouflagefunktionen ska vara avstängd för att certifikatet ska gälla",
      "Uppkoppling kräver separat modul",
    ],
    specs: [
      { label: "Godkännande", value: "Klass 2A, SSF 3522", highlight: true },
      { label: "Certifikat", value: "SBSC 22-520, 22-521, 22-522", highlight: true },
      { label: "Villkor i certifikatet", value: "Kamouflage av, tvåfaktor på", highlight: true },
      { label: "Giltigt till", value: "2027-10-30", highlight: true },
      { label: "Dörrtjocklek", value: "45 till 90 mm", highlight: true },
      { label: "Koder och brickor", value: "999 av varje", highlight: true },
      { label: "Upplåsning", value: "Kod, bricka" },
      { label: "Batteri", value: "3 × AA" },
      { label: "Vädertålighet", value: "IP65, -35 till 40 °C" },
    ],
    verdict:
      "Nimly Code är samma lås som Code Pro på nästan varje punkt som märks i vardagen, för 1 600 kronor mindre. 2 890 kronor.\n\n999 koder och 999 nyckelbrickor, kod och bricka som vägar in, IP65 och drift ner till 35 minusgrader, mekanisk nödnyckel och tre AA-batterier. Låshuset och slutblecket bär SBSC-certifikat i klass 3 enligt SSF 3522, alltså exakt samma nivå som storebrodern på de två delarna.\n\n**Skillnaden sitter i cylindern.** Nimly Codes mekatronikcylinder är certifierad i klass 2A och inte klass 3, och eftersom en godkänd låsenhet kräver att varje ingående del når klass 3 var för sig är det cylindern som avgör vad hela enheten blir. Klass 2A har samma krav på inbrottsskydd från dörrens utsida som klass 3. Det som skiljer är att manövreringen från insidan underordnas utgång och utrymning, och Stöldskyddsföreningens eget exempel på när det används är lägenheter utan annan entréväg.\n\nBor du i en lägenhet där utrymning väger tyngre än inbrottsskydd inifrån är låset rätt byggt för uppgiften, och det billigaste sättet att få 999 koder. Ska försäkringen hålla mot ett krav på godkänd låsenhet räcker det inte, och då är Code Pro samma lås med en klass 3-cylinder för 1 600 kronor till.",
  },
  {
    id: "yale-doorman-classic-home",
    name: "Yale Doorman Classic Home",
    shortName: "Classic Home",
    brand: "Yale",
    image: productImage(KODLAS_YTTERDORR.slug, "yale-doorman-classic-home"),
    tagline: "Passar dörrar från 32 till 100 millimeter, bredast av allihop.",
    scores: { godkand: 2.5, dorren: 5, vardagen: 3.5, drift: 4, prisvarde: 3.5 },
    price: 3490,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-doorman-classic-home-svart-p66169",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 138, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för ovanliga dörrtjocklekar",
    pros: [
      "Dörrtjocklek 32 till 100 millimeter enligt Yales egen installationsguide, bredaste spannet av låsen här",
      "SBSC-certifikat 20-19 i klass 2A enligt SSF 3522, förnyat med giltighet till 13 september 2031",
      "Låshus och slutbleck ligger i lådan, alltså två av de fyra delarna i en låsenhet",
      "Brandtestad till EI30 enligt EN 1191, IP55 och -25 grader på utsidan",
      "3 490 kronor, 2 000 mindre än L3S Flex",
    ],
    cons: [
      "Klass 2A och inte klass 3, sedan produkten flyttades till den lägre klassen den 26 juni 2020",
      "Max tio användarkoder och tio nyckelbrickor, mot 999 hos Nimly",
      "En nyckelbricka kan registreras på högst sex lås",
      "Insidan tål bara 0 till 50 grader",
    ],
    specs: [
      { label: "Godkännande", value: "Klass 2A, SSF 3522", highlight: true },
      { label: "Certifikat", value: "SBSC 20-19", highlight: true },
      { label: "Villkor i certifikatet", value: "Bricka, eller bricka och kod", highlight: true },
      { label: "Giltigt till", value: "2031-09-13, förnyat", highlight: true },
      { label: "Dörrtjocklek", value: "32 till 100 mm", highlight: true },
      { label: "Koder och brickor", value: "10 av varje", highlight: true },
      { label: "Upplåsning", value: "Kod, bricka, fjärrkontroll" },
      { label: "Batteri", value: "4 × AA, cirka ett år" },
      { label: "Vädertålighet", value: "IP55, -25 till 70 °C" },
    ],
    verdict:
      "Yale Doorman Classic Home passar dörrar från 32 till 100 millimeter, ett bredare spann än något annat lås här klarar. 3 490 kronor.\n\nDet är samma Doorman-arkitektur som vinnaren, byggd för det skandinaviska låsuttaget, och i lådan ligger både låshus och slutbleck, alltså två av de fyra delar en godkänd låsenhet består av. Brandtestad till EI30 enligt EN 1191, IP55 och -25 grader på utsidan, och fyra AA-batterier som normalt räcker ett år.\n\nLåset är certifierat, men i klass 2A. SBSC-certifikat 20-19 enligt SSF 3522, förnyat med giltighet till den 13 september 2031, och godkännandet gäller med integritetsswitchen i läge hög, automatisk låsning påslagen och upplåsning med nyckelbricka eller nyckelbricka plus kod. **Produkten är fysiskt oförändrad.** Yale skriver själva att lås tillverkade till och med den 26 juni 2020 är klass 3 och lås tillverkade efter det klass 2A, och att klassen på förpackningen gäller oavsett när du köpte låset. Titta alltså på kartongen.\n\nHar du en ovanligt tjock eller ovanligt tunn ytterdörr är det här låset som passar, och 2 000 kronor billigare än L3S Flex. Tio koder och tio brickor räcker för en familj men inte för en förening, en uthyrning eller ett hushåll med städhjälp och hantverkare. Behöver du klass 3 ska du välja L3S Flex eller Nimly Code Pro.",
  },
  {
    id: "yale-linus-l2",
    name: "Yale Linus Smartlås L2",
    shortName: "Linus L2",
    brand: "Yale",
    image: productImage(KODLAS_YTTERDORR.slug, "yale-linus-l2"),
    tagline: "Låset i dörren sitter kvar, och nyckeln fungerar som förut.",
    scores: { godkand: 2.5, dorren: 3.5, vardagen: 3.5, drift: 3, prisvarde: 3.5 },
    price: 3149,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/yale-linus-smartlas-l2-svart-p66153",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 18, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för hyresrätten",
    pros: [
      "Monteras utanpå det befintliga vredet på insidan, så låsenheten i dörren är orörd och nyckeln fungerar som förut",
      "SBSC-certifikat 24-365, klass 2A enligt SSF 3522, giltigt till 11 februari 2030",
      "Certifikatet gäller tillsammans med Yale Dot, och NFC-taggen ligger i lådan",
      "Passar skandinaviska låshus och finska ABLOY LC100 och 4190",
      "Doorsense-magnet visar om dörren faktiskt är stängd, inte bara låst",
      "Laddbart batteripack med USB-C och upp till sex månaders drift",
    ],
    cons: [
      "Ingen knappsats, så det öppnas med app eller NFC-tagg och inte med kod",
      "Klass 2A, alltså inte den nivå en godkänd låsenhet kräver",
      "Kräver wifi och app för fjärrstyrning, mest molnberoende av låsen här",
      "648 gram monterat på insidans vred syns och känns",
      "3 149 kronor för ett tillägg till ett lås du redan har",
    ],
    specs: [
      { label: "Godkännande", value: "Klass 2A, SSF 3522", highlight: true },
      { label: "Certifikat", value: "SBSC 24-365", highlight: true },
      { label: "Villkor i certifikatet", value: "Gäller med Yale Dot, som ingår", highlight: true },
      { label: "Giltigt till", value: "2030-02-11", highlight: true },
      { label: "Dörrtjocklek", value: "Monteras på insidans vred", highlight: true },
      { label: "Koder och brickor", value: "Ingen kod, NFC-tagg", highlight: true },
      { label: "Upplåsning", value: "App, NFC, vred" },
      { label: "Batteri", value: "Laddbart, upp till 6 mån" },
      { label: "Vädertålighet", value: "Monteras inomhus" },
    ],
    verdict:
      "Yale Linus L2 monteras utanpå insidans vred och låter låset i dörren sitta kvar. Nyckeln fungerar som förut. 3 149 kronor.\n\nDet är värt mest i en bostadsrätt eller hyresrätt, där dörren tillhör någon annan och ofta ingår i ett låssystem med huvudnyckel. Låset har ett eget SBSC-certifikat, 24-365, klass 2A enligt SSF 3522 med giltighet till den 11 februari 2030, och godkännandet gäller tillsammans med Yale Dot. NFC-taggen ligger i lådan. Doorsense-magneten skiljer dessutom på låst och faktiskt stängd, vilket ingen av de andra gör, och batteripacket laddas med USB-C och håller ett halvår.\n\n**Den avgörande begränsningen är att det inte är ett kodlås.** Det finns ingen knappsats. Du öppnar med appen eller med taggen, och den som glömt telefonen får ta nyckeln. Fjärrstyrningen kräver dessutom wifi och Yales moln, vilket gör låset mest beroende av någon annans server av alla här.\n\nBor du i en lägenhet där du inte får eller vill röra låsenheten är Linus L2 det enda låset i jämförelsen som löser problemet. Vill du komma in med en kod ska du inte köpa det, och för 259 kronor mindre byter Nimly Code ut hela låset mot något med knappsats och 999 koder.",
  },
  {
    id: "aqara-u200",
    name: "Aqara Smart Lock U200",
    shortName: "U200",
    brand: "Aqara",
    image: productImage(KODLAS_YTTERDORR.slug, "aqara-u200"),
    tagline: "Fyra vägar in, och Apple, Google och Alexa på samma gång.",
    scores: { godkand: 1, dorren: 3, vardagen: 4.5, drift: 3.5, prisvarde: 4.5 },
    price: 1990,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/aqara-smart-lock-u200-svart-p57872",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 16, scale: 5, checkedAt: PRICE_CHECKED },
    award: "budget",
    superlative: "Bäst för dörren försäkringen inte räknar",
    pros: [
      "1 990 kronor, mindre än hälften av vinnaren",
      "Fingeravtryck, NFC, PIN-kod och mekanisk nyckel: fyra vägar in",
      "Matter-stöd ger Apple HomeKit, Google Home och Amazon Alexa på samma gång",
      "Anti-peep-skydd låter dig omge PIN-koden med slumpsiffror",
      "Uppladdningsbart batteri med upp till sex månaders drift, och adapterkit ingår",
    ],
    cons: [
      "Inte godkänt enligt SSF 3522 klass 3 eller SSF 3523 klass S3",
      "Monteras på låscylindern med adapterkit, inte i ett skandinaviskt låsuttag",
      "IPX5 och drift bara ner till 15 minusgrader",
      "Knappsatsen drivs av separata AAA-batterier utöver låsets eget",
    ],
    specs: [
      { label: "Godkännande", value: "Ej godkänt enligt SSF", highlight: true },
      { label: "Certifikat", value: "Inget", highlight: true },
      { label: "Villkor i certifikatet", value: "Ej tillämpligt", highlight: true },
      { label: "Giltigt till", value: "Ej tillämpligt", highlight: true },
      { label: "Dörrtjocklek", value: "Adapterkit för låscylinder", highlight: true },
      /* Antalet koder och brickor står inte i Aqaras egen specifikation, i den
         globala spec-sidan eller hos butiken. Kontrollerat 2026-08-06, se
         .agent/research/kodlas-ytterdorr.md §7. Cellen renderas som streck. */
      { label: "Koder och brickor", value: "Ej angiven", highlight: true },
      { label: "Upplåsning", value: "Finger, NFC, kod, nyckel" },
      { label: "Batteri", value: "Laddbart, upp till 6 mån" },
      { label: "Vädertålighet", value: "IPX5, -15 till 66 °C" },
    ],
    verdict:
      "Aqara U200 kostar 1 990 kronor och släpper in på fyra sätt: fingeravtryck, NFC, PIN-kod och mekanisk nyckel. Mindre än hälften av vinnaren.\n\nDet är det mest utrustade låset här per krona. Matter-stödet ger Apple HomeKit, Google Home och Amazon Alexa samtidigt, vilket inget annat lås i jämförelsen gör. Anti-peep-skyddet låter dig omge koden med slumpsiffror, batteriet är uppladdningsbart och håller ett halvår, och adapterkitet ligger i lådan.\n\n**Låset är inte godkänt enligt SSF 3522 klass 3 eller SSF 3523 klass S3.** Passformen är den andra invändningen: U200 sitter på låscylindern, den europeiska vägen, och inte i det skandinaviska låsuttag svenska ytterdörrar är urtagna för. På en dörr med tillhållarlåshus går den inte att montera alls. IPX5 och drift ner till bara 15 minusgrader är dessutom tunt för en svensk ytterdörr.\n\nKöp U200 till en dörr där försäkringens låskrav inte gäller: ett förråd, en innerdörr, ett gästhus eller kontoret. Ska låset sitta i ytterdörren och försäkringen ställa krav är det fel lås, och det billigaste certifierade alternativet är Nimly Code för 900 kronor till.",
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
      "Samma lås som Code Pro med fingerläsare i stället för knappsats, och det delar dess tre SBSC-certifikat i klass 3: cylinder 22-316, låshus 22-317 och slutbleck 22-318. Rankas inte ändå, av en enkel anledning: det öppnas inte med kod. På en sida om kodlås är det den funktion allt annat hänger på. Kostar 3 990 kronor och har 113 kundomdömen med snittet 4,5.",
    approxPrice: 3990,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/las/smarta-las/nimly-touch-pro-elektroniskt-dorrlas-med-fingerlasare-ultimate-black-p52186",
  },
  {
    brand: "Danalock",
    name: "V3 Scandi",
    reason:
      "2 290 kronor och 27 kundomdömen, och namnet lovar rätt passform för skandinaviska låshus. Monteras på insidans vred, samma arkitektur som Yale Linus, vilket betyder att den inte har någon knappsats och alltså inte öppnas med kod. Den som vill ha den arkitekturen får mer för pengarna i Linus L2, som bär ett eget certifikat och levererar Doorsense på köpet.",
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
      "Tillbehör och inte ett lås, men räkna med det i priset om du vill styra Doorman från mobilen på avstånd. Utan brygga fungerar låset lokalt med kod och bricka, vilket för det digitala certifikatets del är det läge som gäller ändå.",
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
      "Yale Doorman L3S Flex för 5 488 kronor hos Kjell, om du köper för att försäkringen ska hålla. Det är det enda låset i jämförelsen som är certifierat i två normer: klass 3 enligt SSF 3522 för mekaniken och klass S3 enligt SSF 3523 för den digitala delen, alltså också för hur appen hanterar nycklarna. Läs dock vad det digitala certifikatet omfattar, se nästa fråga. Ska du dela ut många koder är Nimly Code Pro för 4 490 kronor det bättre köpet, med 999 koder, fingerläsare, drift ner till 35 minusgrader och klass 3 på cylinder, låshus och slutbleck.",
  },
  {
    question: "Gäller certifikatet när jag använder koden?",
    answer:
      "Det beror på vilket certifikat och vilket lås. Yale Doorman L3S bär två. Det mekaniska, SBSC 20-172 i klass 3, har inga villkor om öppningssätt. Det digitala, SBSC 21-537 i klass S3, anger i fältet Additional att godkännandet gäller bortasäkert läge med blockerade användarkoder och låsöppning med nyckelbricka eller appen Yale Home. Nimly Code Pro går åt andra hållet: dess klass 3-certifikat gäller med koden påslagen, förutsatt att koderna har minst fyra siffror, men kräver att kamouflagefunktionen är avstängd. Stöldskyddsföreningen skriver att man alltid ska kontrollera vad försäkringsbolaget kräver innan man förändrar något, så ring och fråga specifikt om kodöppning.",
  },
  {
    question: "Har alla certifikat sådana villkor?",
    answer:
      "Alla fem certifierade lås i jämförelsen har det. Yale Doorman L3S kräver blockerade användarkoder för sitt S3-godkännande. Nimlys båda lås kräver att kamouflagefunktionen är avstängd och att anti-inbrottsfunktion, bortasäkert läge och tvåfaktorsinloggning är påslagna. Yale Doorman Classic kräver integritetsswitchen i läge hög, automatisk låsning påslagen och upplåsning med nyckelbricka eller nyckelbricka plus kod. Yale Linus L2 är godkänt tillsammans med Yale Dot. Stöldskyddsföreningen beskriver mönstret i allmän form: en låsenhet är certifierad med vissa, men inte alla, inställningar aktiverade.",
  },
  {
    question: "Vad är en godkänd låsenhet?",
    answer:
      "Hela låsenheten, inte bara låset. Enligt Stöldskyddsföreningen består den av låshus, låscylinder, säkerhetsslutbleck och förstärkningsbehör, och för att vara godkänd ska hela enheten och varje ingående produkt var för sig nå klass 3 enligt SSF 3522 eller klass S3 enligt SSF 3523. Klass 3 är grundkravet i samtliga skyddsklasser och den låsning SSF rekommenderar även för bostäder. Nimly Code visar varför det spelar roll: låshuset och slutblecket är klass 3, men mekatronikcylindern är klass 2A, och därmed blir hela enheten 2A.",
  },
  {
    question: "Vad är skillnaden mellan SSF 3522 och SSF 3523?",
    answer:
      "SSF 3522 gäller mekaniska och elektromekaniska låsenheter med klasserna 1A, 1B, 2A, 2B, 3, 4 och 5. SSF 3523 gäller digitala låsenheter och har klasserna S1, S2, S3 och S5. Den digitala normen provar tre saker samtidigt: mekaniskt inbrottsskydd enligt SSF 3522, hantering av digitala nycklar enligt SSF 1075, och motstånd mot elektroniskt angrepp enligt prEN 16867. Att ett svenskt certifikat även granskar hur appen hanterar nycklarna är det få som känner till. Yale Doorman L3S är det enda låset i jämförelsen med ett certifikat enligt den digitala normen. Notera också att SSF 3523 saknar motsvarighet till SSF 3522 klass 4.",
  },
  {
    question: "Räcker låsklass 2A?",
    answer:
      "Inte för en godkänd låsenhet, som kräver klass 3. Klass 2A har samma krav på inbrottsskydd från dörrens utsida som klass 3, men behörig manövrering från insidan underordnas utgång och utrymning. SSF:s eget exempel på när 2A används är lägenheter utan annan entréväg, och de skriver i samma mening att man ska kontrollera försäkringskraven. Tre av låsen i jämförelsen är certifierade i 2A: Nimly Code, Yale Doorman Classic Home och Yale Linus L2.",
  },
  {
    question: "Varför är Yale Doorman Classic klass 2A när den varit klass 3?",
    answer:
      "Produkten är oförändrad. Yale skriver själva att Doorman Classic under en övergångsperiod fanns i handeln med två certifikat mot SSF 3522: det äldre 10-583 mot utgåva 1, och det nyare 20-19 mot utgåva 2. Vid övergången flyttades låset till klass 2A. Lås tillverkade till och med den 26 juni 2020 är klass 3 och lås tillverkade efter det klass 2A, och den klass som står på förpackningen gäller oavsett när du köpte låset. Titta alltså på kartongen och inte på inköpsdatumet.",
  },
  {
    question: "Passar internationella smarta lås på en svensk ytterdörr?",
    answer:
      "Ofta inte utan vidare. Svenska ytterdörrar har ett eget låsuttag för skandinaviska låshus, medan många internationella lås är byggda för europeisk profilcylinder eller amerikansk deadbolt. Yale Doorman och Nimly är gjorda för det svenska uttaget. Aqara U200 monteras på låscylindern med ett adapterkit, och Yale Linus och Danalock monteras utanpå det befintliga vredet på insidan. Mät dörrtjockleken och titta efter vilken låshustyp du har innan du beställer: Doorman Classic klarar 32 till 100 millimeter, L3S Flex 40 till 88 och Nimlys lås 45 till 90.",
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
      "Nej. CE är tillverkarens egen försäkran om att produkten uppfyller tillämpliga EU-krav, och den säger ingenting om inbrottsskydd. En godkänd låsenhet enligt SSF kräver tredjepartscertifiering: ett oberoende organ som SBSC kontrollerat att provningen skett korrekt och med godkänt resultat. SSF skriver själva att man alltid ska leta efter certifikatsmärket som visar vilken klass låsenheten uppfyller. Nimly anger både CE och SBSC-certifiering för sina lås, vilket är två skilda saker i samma mening.",
  },
  {
    question: "Räcker det att byta cylindern, eller måste hela låset bytas?",
    answer:
      "Det räcker nästan aldrig med cylindern, och det är den vanligaste missuppfattningen om kodlås. En godkänd låsenhet enligt SSF är fyra delar som bedöms tillsammans: låshus, slutbleck, cylinder och behör. Varje del måste nå den klass enheten ska certifieras i, så en klass 3-cylinder i ett låshus av lägre klass ger ingen klass 3-enhet. Nimly Code visar det omvända fallet: klass 3-låshus och klass 3-slutbleck, men en cylinder i klass 2A, vilket kapar hela enheten till 2A. Kontrollera vilka delar tillverkaren räknar in i det certifikat de hänvisar till.",
  },
  {
    question: "Krävs ett certifierat lås för att hemförsäkringen ska gälla?",
    answer:
      "Det beror på försäkringsbolaget och på vad du har försäkrat, och det är bolagets villkor som avgör och inte vi. Det du bör veta är att villkoren när de ställer krav brukar hänvisa till SSF:s klasser, samma system som avsnittet ovan går igenom, och att kravet gäller den kompletta låsenheten och inte bara låshuset. Läs också certifikatets villkorsfält. Samtliga fem certifierade lås i jämförelsen har ett, och två av dem stänger av en funktion produkten säljs på. Kontrollera alltid mot ditt eget villkorshäfte innan du köper.",
  },
];
