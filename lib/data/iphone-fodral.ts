import {
  resolveProducts,
  type ConsideredProduct,
  type ProductSeed,
} from "@/lib/products";
import { IPHONE_FODRAL } from "@/lib/test-pages";
import { productImage } from "@/lib/images";

/**
 * Riktiga produkter för /iphone-fodral.
 *
 * Priser, artikelnummer, lagerstatus och specifikationer är lästa på
 * iPhonebutikens egna produktsidor 2026-08-05.
 *
 * AFFILIATE-SWAP — `merchantUrl` är det som ligger i href i dag: direkt,
 * ospårat, dofollow. Inget `affiliateUrl` någonstans än. Se lib/links.ts.
 *
 * ## Avgränsningen
 *
 * Sidan rankar **bara uppfällbara plånboksfodral**, efter användarbeslut
 * 2026-08-05. Avtagbara 2-i-1, magnetiska korthållare och skal med kortficka
 * förklaras i köpguiden. Vanliga skyddsskal ligger på /iphone-skal.
 *
 * ⚠️ **Gränsdragningen mot 2-i-1 är en bedömning och inte en regel.** Gear
 * Buffalo Wallet har ett avtagbart magnetskal och ligger ändå med, eftersom
 * den säljs och används som ett fodral och avtagbarheten är en
 * konstruktionsdetalj. De som uteslutits är de vars hela säljargument är att
 * delas isär: Decoded Detachable Wallet, DG Ming Detachable och dbramante1928
 * Lynge. Samma sorts gräns som mellan motor och modul på /garageportsoppnare.
 *
 * ## En rad per konstruktion, inte per mönster
 *
 * Trolsk säljer fjorton plånboksfodral till iPhone 17 Pro, men de flesta är
 * samma fodral i olika tryck: fjäril, panda, akvarellblommor, glitter. Varje
 * rad här är en **konstruktion**, alltså 3 kort med dragkedja, 9 kort, 9 kort
 * med myntfack och MagSafe-versionen. Mönstervarianterna nämns inte som egna
 * produkter. Samma grepp som /usb-c-kabel, som gav en rad per kabelmodell och
 * inte per längd och färg.
 *
 * ## FYNDET: sju av tolv stänger av den trådlösa laddningen
 *
 * Uppgiften står i specifikationen men aldrig i rubriken, och den skiljer inte
 * på pris. Trolsk säljer två fodral där det ena laddar och det andra inte, och
 * det som laddar kostar mindre än det som inte gör det.
 *
 * ## ⚠️ RadiCovers strålningspåstående återges inte
 *
 * Produktsidan anger ett strålningsdämpande membran med en procentsiffra. Den
 * uppgiften står varken i `specs`, i omdömet, i för- och nackdelarna eller i
 * FAQ. Ett hälsopåstående är safety-shaped och kräver tier A, och
 * Strålsäkerhetsmyndighetens egen hållning är inte läst i original. Vi varken
 * återger eller bemöter talet. Se .agent/research/iphone-fodral.md §8.
 *
 * ## ⚠️ RFID betygsätts inte
 *
 * Efter användarbeslut. Fältet `Angivet RFID-skydd` finns i tabellen men bär
 * inget kriterium, och det ligger i ALDRIG_BEDOMD. Se lib/spec-schema.mjs.
 *
 * ## ⚠️ Inga GTIN
 *
 * Butiken publicerar interna artikelnummer men inga EAN-koder, precis som på
 * /iphone-skal. `GTIN` är `Ej angiven` för samtliga tolv.
 *
 * ## Betygen
 *
 * Kriteriepoängen är redaktionell bedömning ur publicerade specifikationer,
 * inte mätningar. Ingen har provat plånboksfodral, och vi har inte använt ett
 * enda.
 */

export const PRICE_CHECKED = "2026-08-05";

const SEEDS: ProductSeed[] = [
  {
    id: "nomad-modern-leather-folio-17-pro",
    brand: "Nomad",
    name: "Modern Leather Folio",
    shortName: "Nomad Modern Folio",
    image: productImage(IPHONE_FODRAL.slug, "nomad-modern-leather-folio-17-pro"),
    tagline: "Lädret blir vackrare med åren, och telefonen laddas utan att tas ur.",
    scores: {
      kortkapacitet: 2.5,
      konstruktion: 5,
      laddning: 5,
      prisvarde: 2.5,
      vardagsfunktion: 3,
    },
    price: 699,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/nomad-modern-leather-folio-iphone-17-pro-57216.html",
    award: "winner",
    superlative: "Bäst för läder och trådlös laddning",
    pros: [
      "Laddar trådlöst med magnetring, så telefonen aldrig behöver ur fodralet",
      "Fullnarvigt läder från ett namngivet garveri, som mörknar i stället för att spricka",
      "Polykarbonatram med gummibuffertar i stället för ett limmat plastskal",
    ],
    cons: [
      "Tre kortfack, alltså en tredjedel av vad de billigaste fodralen tar",
      "699 kronor, och 500 kronor mer än fodralet som laddar lika bra",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "3 st", highlight: true },
      { label: "Material", value: "Fullnarvigt läder från Ecco-garveri", highlight: true },
      // Ram, buffert, foder och kantmått lästa hos Nomad 2026-08-06:
      // nomadgoods.com/products/modern-leather-folio-black-iphone-17-pro.
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "Polykarbonatram med TPU-buffert", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Ja, Qi2", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Ja", highlight: true },
      { label: "Stängning", value: "Avtagbar magnetstängning", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro", highlight: true },
      { label: "Garanti", value: "1 år", highlight: true },
      { label: "Sedelfack", value: "Ja, 1 st" },
      { label: "Myntfack", value: "Nej" },
      { label: "Foder", value: "Mikrofiber" },
      { label: "Kameraskydd", value: "Förhöjd kant, 1 mm" },
      { label: "Stativfunktion", value: "Nej" },
      { label: "Rem", value: "Nej, men internt fäste för rem" },
      { label: "Angivet RFID-skydd", value: "Ej angivet" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Nomad Modern Leather Folio är det enda fodralet här som kombinerar garvat läder med magnetring, och det kostar 699 kronor. Utsidan är fullnarvigt läder, insidan mikrofiber, och telefonen sitter i en polykarbonatram med TPU-buffert.\n\n**Magnetringen är det som gör fodralet användbart i vardagen.** Sju av de tolv fodralen i jämförelsen stänger av trådlös laddning helt, alltså måste telefonen ur fodralet varje kväll. Här läggs den i stället på laddaren som den är, och magneten drar den till rätt läge av sig själv. Ramen är dessutom en verklig konstruktion och inte ett limmat plastskal: limmet är det som släpper först i ett billigt fodral, och här finns inget lim att släppa. Lädret är garvat och angivet ända ned till garveriet, vilket betyder att det mörknar där handen håller i stället för att spricka i vecket.\n\nDet tar tre kort. Fodralen längre ner i listan tar nio och tio, och för den som vill lämna plånboken hemma är det skillnaden mellan att lyckas och att bära två saker ändå.\n\nKöp den. Det är enda fodralet i garvat läder som låter telefonen ligga kvar på laddaren, och det enda som ser bättre ut om två år än i dag. Ska fodralet i stället ersätta plånboken helt går du direkt till Trolsks nio kort med myntfack för 249 kronor.",
  },
  {
    id: "trolsk-planboksfodral-magsafe-17-pro",
    brand: "Trolsk",
    name: "Plånboksfodral med MagSafe",
    shortName: "Trolsk MagSafe",
    image: productImage(IPHONE_FODRAL.slug, "trolsk-planboksfodral-magsafe-17-pro"),
    tagline: "Magnetring och trådlös laddning för under tvåhundra kronor.",
    scores: {
      kortkapacitet: 2.5,
      konstruktion: 3,
      laddning: 5,
      prisvarde: 4.5,
      vardagsfunktion: 2,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-planboksfodral-med-magsafe-iphone-17-pro-57805.html",
    award: "budget",
    superlative: "Bäst under 250 kronor",
    pros: [
      "Magnetring och trådlös laddning, alltså det de flesta fodral för fem gånger priset saknar",
      "Kameralinsskydd i härdat glas, vilket inget annat fodral här har",
      "199 kronor, och det billigaste fodralet i jämförelsen som laddar trådlöst",
    ],
    cons: [
      "Tre kortfack, så det bär ett par kort och ersätter inte plånboken",
      "Ingen stativfunktion, så telefonen får hållas i handen när du ser på något",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "3 st", highlight: true },
      { label: "Material", value: "TPU och läderimitation", highlight: true },
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "TPU-hållare med genomskinlig baksida", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Ja", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Ja", highlight: true },
      { label: "Stängning", value: "Magnetisk", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro", highlight: true },
      { label: "Garanti", value: "1 år", highlight: true },
      { label: "Sedelfack", value: "Ej angivet" },
      { label: "Myntfack", value: "Nej" },
      { label: "Foder", value: "Ej angivet" },
      { label: "Kameraskydd", value: "Härdat glas över linserna" },
      { label: "Stativfunktion", value: "Nej" },
      { label: "Rem", value: "Nej" },
      { label: "Angivet RFID-skydd", value: "Ja" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "För 199 kronor gör Trolsk Plånboksfodral med MagSafe det ett fodral för 699 gör: laddar trådlöst med magnetring. Konstruktionen är en TPU-hållare med genomskinlig baksida och färgade kanter.\n\n**Att det finns en magnetring för 199 kronor är kategorins mest användbara fynd.** Trolsk säljer själva ett fodral för 249 kronor som inte laddar alls, alltså femtio kronor dyrare för en funktion mindre. Skillnaden syns inte på hyllan och står bara i specifikationen. Ovanpå kamerorna sitter dessutom ett skydd i härdat glas, vilket inget annat fodral i jämförelsen har, och kameraglaset är det dyraste att byta på en iPhone 17 Pro.\n\nDet är ett litet fodral. Tre kortfack och ingen stativfunktion, så det bär ett busskort och ett bankkort snarare än en plånbok.\n\nJämförelsens bästa köp, och 500 kronor billigare än vinnaren. Ska fodralet ersätta plånboken behöver du något med nio fack.",
  },
  {
    id: "dbramante1928-copenhagen-17-pro",
    brand: "dbramante1928",
    name: "Copenhagen",
    shortName: "dbramante Copenhagen",
    image: productImage(IPHONE_FODRAL.slug, "dbramante1928-copenhagen-17-pro"),
    tagline: "Fullnarvigt läder som mörknar där handen håller, för 499 kronor.",
    scores: {
      kortkapacitet: 2.5,
      konstruktion: 5,
      laddning: 3.5,
      prisvarde: 3,
      vardagsfunktion: 2.5,
    },
    price: 499,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/dbramante1928-copenhagen-iphone-17-pro-57305.html",
    award: "editor",
    superlative: "Bäst återvunnet innerskal",
    pros: [
      "Fullnarvigt läder och ett innerskal av 100 % GRS-certifierat återvunnet material",
      "Laddar trådlöst utan att telefonen tas ur fodralet",
      "Magnetisk sidostängning, som håller bättre än ett lock som viks över kanten",
    ],
    cons: [
      "Ingen magnetring, så laddaren måste läggas rätt för hand varje gång",
      "Tre kortfack för 499 kronor, mot tio för 279",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "3 st", highlight: true },
      { label: "Material", value: "Fullnarvigt läder", highlight: true },
      // Innerskalets material och den vikbara baksidan lästa hos dbramante1928
      // 2026-08-06: dbramante1928.com/products/copenhagen-iphone-17-pro-tan.
      // Det är innerskalet som är GRS-certifierat, inte fodret — sidan angav
      // tidigare uppgiften under Foder.
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "Innerskal i 100 % GRS-certifierat återvunnet material", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Ja", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Nej", highlight: true },
      { label: "Stängning", value: "Magnetisk sidostängning", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro och 18 Pro", highlight: true },
      { label: "Garanti", value: "1 år", highlight: true },
      { label: "Sedelfack", value: "Ja" },
      { label: "Myntfack", value: "Nej" },
      { label: "Foder", value: "Ej angivet" },
      { label: "Kameraskydd", value: "Ej angivet" },
      { label: "Stativfunktion", value: "Ja, liggande" },
      { label: "Rem", value: "Nej" },
      { label: "Angivet RFID-skydd", value: "Ja" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "dbramante1928 Copenhagen ger riktigt läder utan att kosta 700 kronor. Utsidan är fullnarvigt läder, innerskalet 100 % GRS-certifierat återvunnet material, och priset 499 kronor.\n\n**Fullnarvigt läder är den enda lädertypen som blir bättre av att användas.** Det mörknar där handen håller och får en yta som är fodralets egen efter ett år, medan konstläder i samma prisklass spricker just i vecket där fodralet viks flera gånger om dagen. Sidostängningen med magnet är dessutom en bättre lösning än ett lock som viks över långsidan: den håller kvar korten även när fodralet är fullt, vilket är precis då ett vanligt magnetlås glider upp i väskan. Telefonen laddas trådlöst utan att tas ur.\n\nDet saknar magnetring. Laddningen fungerar, men laddaren måste läggas rätt för hand varje gång, och en MagSafe-laddare fäster inte alls.\n\nHar du en MagSafe-laddare vid sängen är valet redan gjort, och det heter Nomad. Har du inte det får du här samma sorts läder för 200 kronor mindre.",
  },
  {
    id: "gear-buffalo-wallet-17-pro",
    brand: "Gear",
    name: "Buffalo Wallet",
    shortName: "Gear Buffalo",
    image: productImage(IPHONE_FODRAL.slug, "gear-buffalo-wallet-17-pro"),
    tagline: "Äkta läder och ett magnetskal som lyfts ur när fodralet är i vägen.",
    scores: {
      kortkapacitet: 2.5,
      konstruktion: 4.5,
      laddning: 3,
      prisvarde: 3,
      vardagsfunktion: 3,
    },
    price: 499,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/gear-buffalo-wallet-iphone-17-pro-57106.html",
    superlative: "Bäst avtagbart magnetskal",
    pros: [
      "Telefonskalet lyfts ur magnetiskt, så fodralet kan lämnas hemma när du tränar",
      "Äkta läder som får patina i stället för att blekna",
      "Högtalaröppning som gör att du kan ringa med fodralet stängt",
    ],
    cons: [
      "Magneterna kan störa induktionsladdningen, så trådlös laddning är inte garanterad",
      "Tre kortfack, alltså samma som fodral för en tredjedel av priset",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "3 st", highlight: true },
      { label: "Material", value: "Äkta läder", highlight: true },
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "Avtagbart magnetskal", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Ja, men magneterna kan störa", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Nej", highlight: true },
      { label: "Stängning", value: "Magnetisk", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro", highlight: true },
      { label: "Garanti", value: "1 år", highlight: true },
      { label: "Sedelfack", value: "Ja, 1 st" },
      { label: "Myntfack", value: "Nej" },
      { label: "Foder", value: "Ej angivet" },
      { label: "Kameraskydd", value: "Ej angivet" },
      { label: "Stativfunktion", value: "Ej angivet" },
      { label: "Rem", value: "Nej" },
      { label: "Angivet RFID-skydd", value: "Ej angivet" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Gear Buffalo Wallet löser fodralets grundproblem på ett annat sätt än de andra: telefonskalet sitter fast magnetiskt och går att lyfta ur. Materialet är äkta läder, handgjort, och priset 499 kronor.\n\n**Det avtagbara skalet gör fodralet till två produkter.** Ska du springa, laga mat eller sitta på en middag lyfter du ur telefonen och lämnar plånboksdelen, och du har då ett vanligt skal. Ett fast fodral tvingar dig i stället att bära hela plånboken överallt eller att byta skydd. Högtalaröppningen är den andra detaljen som märks dagligen: du kan svara i telefon utan att först vika upp locket, vilket låter litet tills man räknar hur ofta det händer.\n\nDe inbyggda magneterna kan i vissa fall störa induktionsladdningen. Trådlös laddning är alltså ett kanske här och inte ett ja, och det märks först när telefonen legat på laddaren en natt utan att fyllas.\n\nVill du kunna lämna plånboken hemma utan att byta skal är det här fodralet att köpa. Laddar du alltid trådlöst ska du välja Nomad eller Trolsks MagSafe-fodral, där laddningen är ett rakt ja.",
  },
  {
    id: "mujjo-full-leather-wallet-17-pro",
    brand: "Mujjo",
    name: "Full Leather Wallet Case",
    shortName: "Mujjo Full Leather",
    image: productImage(IPHONE_FODRAL.slug, "mujjo-full-leather-wallet-17-pro"),
    tagline: "Metallramen runt kamerorna slits inte rund som en läderkant gör.",
    scores: {
      kortkapacitet: 2,
      konstruktion: 4.5,
      laddning: 5,
      prisvarde: 2,
      vardagsfunktion: 2,
    },
    price: 799,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/mujjo-full-leather-wallet-case-iphone-17-pro-57357.html",
    award: "premium",
    superlative: "Bäst i äkta läder",
    pros: [
      "Läder garvat utan vatten, med mikrofiberfoder mot skärmen",
      "Fräst metallram runt kameraurtaget, alltså en kant som inte slits rund",
      "MagSafe och trådlös laddning, så telefonen stannar i fodralet",
    ],
    cons: [
      "Två till tre kort, alltså minst kortkapacitet av alla fodral här",
      "799 kronor, jämförelsens dyraste, och utan stativfunktion",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "2 till 3 st", highlight: true },
      { label: "Material", value: "Äkta läder, DriTan-garvat", highlight: true },
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "Läderskal med metallram vid kameran", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Ja", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Ja", highlight: true },
      { label: "Stängning", value: "Kortfacken håller locket", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro och 18 Pro", highlight: true },
      { label: "Garanti", value: "1 år", highlight: true },
      { label: "Sedelfack", value: "Ja" },
      { label: "Myntfack", value: "Nej" },
      // "2 till 3" är Mujjos egen formulering, kontrollerad 2026-08-06 på
      // mujjo.com/products/full-leather-wallet-case-for-iphone-17-pro. Butiken
      // anger 2. Tillverkaren väger tyngre, se .agent/research/iphone-fodral.md.
      { label: "Foder", value: "Japansk mikrofiber" },
      { label: "Kameraskydd", value: "Fräst metallram" },
      { label: "Stativfunktion", value: "Nej" },
      { label: "Rem", value: "Nej" },
      { label: "Angivet RFID-skydd", value: "Ej angivet" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Runt kamerorna på Mujjo Full Leather Wallet Case sitter en fräst metallram. Lädret är garvat utan vatten, fodret japansk mikrofiber, och 799 kronor gör det till jämförelsens dyraste.\n\n**Metallramen är skälet att betala för det här fodralet.** Nästan alla andra löser kameraurtaget med en kant i läder eller plast som slits rund efter ett halvår, och då börjar linserna ta i bordet. En fräst metallram gör inte det. Mikrofiberfodret ligger dessutom mot skärmen när fodralet är stängt, vilket är den enda ytan i ett fodral som faktiskt torkar av glaset i stället för att repa det. MagSafe och trådlös laddning finns, så telefonen behöver aldrig ur.\n\nDet tar två till tre kort. Det är minst av alla fodral i jämförelsen, och 799 kronor är mycket att betala för en plånbok som rymmer mindre än den du redan har.\n\nVill du att fodralet du håller i hundra gånger om dagen ska åldras vackert är det värt pengarna. Handlar du efter hur mycket som får plats finns nästan bara bättre köp än det här.",
  },
  {
    id: "trolsk-9-kort-myntfack-17-pro",
    brand: "Trolsk",
    name: "Plånboksfodral 9 kort med myntfack",
    shortName: "Trolsk 9 kort mynt",
    image: productImage(IPHONE_FODRAL.slug, "trolsk-9-kort-myntfack-17-pro"),
    tagline: "Nio kortfack, sedelfack, myntfack och dubbla magnetknäppen.",
    scores: {
      kortkapacitet: 5,
      konstruktion: 2,
      laddning: 1,
      prisvarde: 4,
      vardagsfunktion: 4.5,
    },
    price: 249,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-planboksfodral-9-kort-med-myntfack-iphone-17-pro18-pro-57761.html",
    superlative: "Bäst för mynt och sedlar",
    pros: [
      "Nio kortfack plus både sedelfack och myntfack, alltså en hel plånbok",
      "Dubbla magnetknäppen som håller även när fodralet är fullt",
      "Avtagbar handledsrem, vilket faktiskt hindrar att telefonen tappas",
    ],
    cons: [
      "Ingen trådlös laddning, så telefonen ska ur fodralet varje kväll",
      "Läderimitation, som spricker i vecket långt före garvat läder",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "9 st", highlight: true },
      { label: "Material", value: "Läderimitation", highlight: true },
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "Mjukt innerskal", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Nej", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Nej", highlight: true },
      { label: "Stängning", value: "Dubbla magnetknäppen", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro och 18 Pro", highlight: true },
      { label: "Garanti", value: "1 år", highlight: true },
      { label: "Sedelfack", value: "Ja" },
      { label: "Myntfack", value: "Ja" },
      { label: "Foder", value: "Ej angivet" },
      { label: "Kameraskydd", value: "Ej angivet" },
      { label: "Stativfunktion", value: "Ja" },
      { label: "Rem", value: "Ja, avtagbar handledsrem" },
      { label: "Angivet RFID-skydd", value: "Ej angivet" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Trolsk Plånboksfodral 9 kort med myntfack är det enda här som rymmer kort, sedlar och mynt på en gång. Priset är 249 kronor och materialet läderimitation med ett mjukt innerskal.\n\n**Myntfacket är det som gör att plånboken faktiskt kan lämnas hemma.** Nio kortfack räcker för de flesta, men så länge mynten ligger kvar i en annan ficka har du fortfarande två saker att hålla reda på. De dubbla magnetknäppen är den andra detaljen som märks: ett enda magnetlås glider upp i väskan när fodralet är fullt, och fullt är precis vad ett fodral med nio kort blir. Handledsremmen går att ta av och är det enda i kategorin som på riktigt hindrar att telefonen tappas.\n\nTrådlös laddning fungerar inte. Telefonen ska ur fodralet varje kväll, och med nio kort i är det ett fumligt moment att göra i mörkret.\n\n249 kronor är hela priset för att sluta bära plånbok. Telefonen ska däremot ur fodralet varje kväll, och den som inte vill leva med det tar Trolsks MagSafe-version för 199 kronor och sex kortfack färre.",
  },
  {
    id: "trolsk-laderimitation-9-kort-17-pro",
    brand: "Trolsk",
    name: "Plånboksfodral läderimitation för 9 kort",
    shortName: "Trolsk 9 kort",
    image: productImage(IPHONE_FODRAL.slug, "trolsk-laderimitation-9-kort-17-pro"),
    tagline: "Nio kortfack varav ett genomskinligt för legitimationen.",
    scores: {
      kortkapacitet: 5,
      konstruktion: 2,
      laddning: 1,
      prisvarde: 4.5,
      vardagsfunktion: 3,
    },
    price: 199,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-planboksfodral-laderimitation-for-9-kort-iphone-17-pro18-pro-57123.html",
    superlative: "Bäst för ID-kortet",
    pros: [
      "Genomskinligt fack för legitimationen, som därmed visas utan att tas ut",
      "Nio kortfack och tre separata sedelfack för 199 kronor",
      "Silikoninnerskal i stället för limmat plastskal",
    ],
    cons: [
      "Ingen trådlös laddning, så telefonen ska ur fodralet varje kväll",
      "Nio fyllda kortfack gör fodralet till en klump i fickan",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "9 st, varav 1 med ID-fönster", highlight: true },
      { label: "Material", value: "Läderimitation med silikoninsida", highlight: true },
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "Silikoninnerskal", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Nej", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Nej", highlight: true },
      { label: "Stängning", value: "Magnetisk", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro och 18 Pro", highlight: true },
      { label: "Garanti", value: "1 år", highlight: true },
      { label: "Sedelfack", value: "Ja, 3 st" },
      { label: "Myntfack", value: "Nej" },
      { label: "Foder", value: "Silikon" },
      { label: "Kameraskydd", value: "Ej angivet" },
      { label: "Stativfunktion", value: "Ja" },
      { label: "Rem", value: "Nej" },
      { label: "Angivet RFID-skydd", value: "Ej angivet" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Trolsk Plånboksfodral läderimitation för 9 kort kostar 199 kronor och ger nio kortfack, varav ett med genomskinligt fönster. Innerskalet är silikon.\n\n**ID-fönstret är det som skiljer fodralet från de andra med många fack.** Legitimation är det kort man oftast måste visa men sällan lämna ifrån sig, och ett genomskinligt fack betyder att du fäller upp fodralet i stället för att peta ut kortet med nageln varje gång. Tre separata sedelfack är dessutom ovanligt: de flesta fodral har ett, och med tre går det att hålla isär kvitton från sedlar. Silikoninnerskalet är den tysta fördelen, eftersom ett limmat plastskal är det som först släpper från materialet i den här prisklassen.\n\nTrådlös laddning fungerar inte, och nio fyllda kortfack gör fodralet tjockt. I en jeansficka märks det.\n\nBär du många kort och laddar med sladd får du mest plånbok per krona här. Vill du kunna lägga telefonen på en laddare är det fel fodral, oavsett hur många fack det har.",
  },
  {
    id: "caseme-c30-wallet-17-pro",
    brand: "CaseMe",
    name: "C30 Wallet Cover",
    shortName: "CaseMe C30",
    image: productImage(IPHONE_FODRAL.slug, "caseme-c30-wallet-17-pro"),
    tagline: "Tio kortfack och ett myntfack med dragkedja.",
    scores: {
      kortkapacitet: 5,
      konstruktion: 2,
      laddning: 1,
      prisvarde: 3.5,
      vardagsfunktion: 4.5,
    },
    price: 279,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/caseme-c30-wallet-cover-iphone-17-pro18-pro-57771.html",
    superlative: "Flest kortfack av alla",
    pros: [
      "Tio kortfack, alltså fler än något annat fodral i jämförelsen",
      "Myntfack med dragkedja, som håller mynten kvar när fodralet vänds upp och ner",
      "Avtagbar handledsrem och stativfunktion i liggande läge",
    ],
    cons: [
      "Sex månaders garanti, alltså hälften av vad de flesta ger",
      "Ingen trådlös laddning, och ingen magnet",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "10 st", highlight: true },
      { label: "Material", value: "PU-läder med TPU-insida", highlight: true },
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "Flexibel TPU-hållare", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Nej", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Nej", highlight: true },
      { label: "Stängning", value: "Magnetisk", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro och 18 Pro", highlight: true },
      { label: "Garanti", value: "6 månader", highlight: true },
      { label: "Sedelfack", value: "Ja" },
      { label: "Myntfack", value: "Ja, med dragkedja" },
      { label: "Foder", value: "TPU" },
      { label: "Kameraskydd", value: "Ej angivet" },
      { label: "Stativfunktion", value: "Ja, liggande" },
      { label: "Rem", value: "Ja, avtagbar handledsrem" },
      { label: "Angivet RFID-skydd", value: "Nej" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Tio kortfack är fler än något annat fodral i jämförelsen har, och CaseMe C30 Wallet Cover kostar 279 kronor. Utsidan är PU-läder, insidan en flexibel TPU-hållare.\n\n**Dragkedjan över myntfacket är det som skiljer det från de andra storsäljarna.** Ett öppet myntfack tömmer sig i väskan så fort fodralet vänds, och det är skälet till att de flesta slutar använda det. Här sitter mynten kvar. Tio kortfack räcker dessutom till hela plånboken plus gymkortet och biblioteksbrickan, och en avtagbar handledsrem följer med. Stativfunktionen fäller upp telefonen i liggande läge, alltså rätt håll för att se på något.\n\nGarantin är sex månader. Alla andra fodral här ger minst ett år, och på en produkt som viks flera gånger om dagen är gångjärnet det som går sönder först.\n\nMest plånbok per krona i hela jämförelsen. Priset är sex månaders garanti och en telefon som ska ur fodralet varje kväll.",
  },
  {
    id: "trolsk-dragkedja-stativ-17-pro",
    brand: "Trolsk",
    name: "Plånboksfodral med dragkedja och stativfunktion",
    shortName: "Trolsk dragkedja",
    image: productImage(IPHONE_FODRAL.slug, "trolsk-dragkedja-stativ-17-pro"),
    tagline: "Myntfack med dragkedja till lägsta pris i jämförelsen.",
    scores: {
      kortkapacitet: 3,
      konstruktion: 2,
      laddning: 1,
      prisvarde: 4.5,
      vardagsfunktion: 4,
    },
    price: 149,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-planboksfodral-med-dragkedja-och-stativfunktion-iphone-17-pro18-pro-57061.html",
    superlative: "Billigast med myntfack",
    pros: [
      "Myntfack med dragkedja för 149 kronor, vilket bara ett dubbelt så dyrt fodral också har",
      "Mjukt TPU-innerskal i stället för limmad plast",
      "Stativfunktion och magnetstängning, alltså grunderna på plats",
    ],
    cons: [
      "Tre kortfack, så plånboken följer med ändå om du bär fler kort",
      "Ingen trådlös laddning och ingen magnet",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "3 st", highlight: true },
      { label: "Material", value: "Konstläder med TPU-insida", highlight: true },
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "Mjukt TPU-innerskal", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Nej", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Nej", highlight: true },
      { label: "Stängning", value: "Magnetisk", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro och 18 Pro", highlight: true },
      { label: "Garanti", value: "1 år", highlight: true },
      { label: "Sedelfack", value: "Ja" },
      { label: "Myntfack", value: "Ja, med dragkedja" },
      { label: "Foder", value: "TPU" },
      { label: "Kameraskydd", value: "Ej angivet" },
      { label: "Stativfunktion", value: "Ja" },
      { label: "Rem", value: "Nej" },
      { label: "Angivet RFID-skydd", value: "Nej" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Trolsk Plånboksfodral med dragkedja och stativfunktion kostar 149 kronor och är jämförelsens billigaste fodral med myntfack. Konstruktionen är konstläder med ett mjukt TPU-innerskal.\n\n**Att myntfacket har dragkedja i det här prisläget är ovanligt.** Det andra fodralet med samma lösning kostar 279 kronor, alltså nästan dubbelt, och skillnaden mellan ett öppet och ett stängt myntfack är om mynten ligger kvar när fodralet vänds i en väska. TPU-innerskalet är också värt att veta om: i den här prisklassen är limmad plast normen, och limmet är det som släpper först. Stativfunktion och magnetlås finns, så inget av det grundläggande saknas.\n\nDet tar tre kort. Bär du fler följer plånboken med ändå, och då har du köpt ett tjockare skal utan att lösa något.\n\nVill du ha ett fodral som klarar kontanter och kostar under 150 kronor är det här rätt. Bär du fler än tre kort lägger du 100 kronor till på Trolsks nio fack och får en riktig plånbok.",
  },
  {
    id: "sign-wallet-17-pro",
    brand: "SiGN",
    name: "Wallet",
    shortName: "SiGN Wallet",
    image: productImage(IPHONE_FODRAL.slug, "sign-wallet-17-pro"),
    tagline: "149 kronor för tre kort, sedelfack och ett stativ.",
    scores: {
      kortkapacitet: 2.5,
      konstruktion: 1.5,
      laddning: 1,
      prisvarde: 4,
      vardagsfunktion: 3,
    },
    price: 149,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl: "https://www.iphonebutiken.se/sign-wallet-iphone-17-pro-57093.html",
    superlative: "Enklast och billigast",
    pros: [
      "149 kronor, alltså delad lägsta prislapp i jämförelsen",
      "Stativfunktion och magnetstängning trots priset",
      "Svart konstläder som inte drar till sig fingeravtryck",
    ],
    cons: [
      "Sex månaders garanti på en produkt som viks flera gånger om dagen",
      "Varken myntfack, trådlös laddning eller rem",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "3 st", highlight: true },
      { label: "Material", value: "Konstläder och TPU", highlight: true },
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "TPU-hållare", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Nej", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Nej", highlight: true },
      { label: "Stängning", value: "Magnetisk", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro och 18 Pro", highlight: true },
      { label: "Garanti", value: "6 månader", highlight: true },
      { label: "Sedelfack", value: "Ja" },
      { label: "Myntfack", value: "Nej" },
      { label: "Foder", value: "TPU" },
      { label: "Kameraskydd", value: "Ej angivet" },
      { label: "Stativfunktion", value: "Ja" },
      { label: "Rem", value: "Nej" },
      { label: "Angivet RFID-skydd", value: "Nej" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "SiGN Wallet gör precis det ett plånboksfodral ska göra, varken mer eller mindre, och kostar 149 kronor. Tre kortfack, ett sedelfack, konstläder och en TPU-hållare.\n\n**Det billigaste sättet att sluta bära två saker.** Tre kort täcker bankkort, busskort och legitimation, vilket är vad de flesta faktiskt har med sig, och stativfunktionen och magnetlåset finns trots priset. Locket täcker skärmen när telefonen ligger i en väska, alltså det ett skal aldrig gör.\n\nGarantin är sex månader, kortast i jämförelsen tillsammans med ett annat fodral. Ett plånboksfodral är en gångjärnskonstruktion som viks flera gånger om dagen, och sex månader är kort tid för den påfrestningen.\n\nTill samma 149 kronor ger Trolsks fodral både myntfack och ett år på garantin. Köp SiGN bara om du vill pröva om ett fodral alls passar dig.",
  },
  {
    id: "radicover-flip-side-17-pro",
    brand: "RadiCover",
    name: "Flip-Side Fashion Wallet",
    shortName: "RadiCover Flip-Side",
    image: productImage(IPHONE_FODRAL.slug, "radicover-flip-side-17-pro"),
    tagline: "Svart konstläder med stativ och tre kortfack.",
    scores: {
      kortkapacitet: 2.5,
      konstruktion: 2,
      laddning: 1,
      prisvarde: 2.5,
      vardagsfunktion: 3,
    },
    price: 299,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/radicover-flip-side-fashion-wallet-iphone-17-pro-58741.html",
    superlative: "Enkelt svart med stativ",
    pros: [
      "Innerskal som håller telefonen i stället för limmad plast",
      "Stativfunktion i liggande läge",
      "Sedelfack utöver de tre kortfacken",
    ],
    cons: [
      "299 kronor för tre kortfack, mot tio kort för 279",
      "Ingen trådlös laddning, ingen magnet och ingen rem",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "3 st", highlight: true },
      { label: "Material", value: "Konstläder", highlight: true },
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "Innerskal", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Nej", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Nej", highlight: true },
      { label: "Stängning", value: "Magnetlås", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro", highlight: true },
      { label: "Garanti", value: "1 år", highlight: true },
      { label: "Sedelfack", value: "Ja" },
      { label: "Myntfack", value: "Nej" },
      { label: "Foder", value: "Ej angivet" },
      { label: "Kameraskydd", value: "Ej angivet" },
      { label: "Stativfunktion", value: "Ja, liggande" },
      { label: "Rem", value: "Nej" },
      { label: "Angivet RFID-skydd", value: "Ja" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "RadiCover Flip-Side Fashion Wallet är ett svart konstläderfodral med tre kortfack, sedelfack och stativ, för 299 kronor.\n\n**Innerskalet är fodralets starkaste sida.** Telefonen sitter i ett formgjutet skal i stället för att limmas fast mot materialet, och limfogen är det som släpper först i konstläderfodral. Stativfunktionen fäller upp telefonen liggande, alltså rätt håll för film, och magnetlåset håller locket stängt i en väska.\n\nPriset är svårt att försvara mot resten av listan. För 279 kronor finns tio kortfack, myntfack med dragkedja och handledsrem, och för 199 finns ett fodral som dessutom laddar trådlöst. Här får du tre fack och ingen laddning för 299.\n\nFör 299 kronor finns bättre köp både över och under priset. Det här är fodralet för den som vill ha svart, enkelt och ingenting mer.",
  },
  {
    id: "guess-book-4g-17-pro",
    brand: "Guess",
    name: "Book 4G Metal Logo",
    shortName: "Guess Book 4G",
    image: productImage(IPHONE_FODRAL.slug, "guess-book-4g-17-pro"),
    tagline: "Det enda fodralet här som är köpt för att synas.",
    /* Betygen omräknade 2026-08-06. Stativfunktionen, mikrofiberfodret och den
       förhöjda kameraramen är belagda hos licenstagaren, och sedelfacket är
       det inte. Se lib/corrections.ts och .agent/research/iphone-fodral.md. */
    scores: {
      kortkapacitet: 2,
      konstruktion: 2.5,
      laddning: 1,
      prisvarde: 2,
      vardagsfunktion: 3,
    },
    price: 399,
    priceCheckedAt: PRICE_CHECKED,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/guess-book-4g-metal-logo-case-iphone-17-pro-57670.html",
    superlative: "Bäst för mönstret",
    pros: [
      "Guess 4G-mönster och en logotyp i metall, alltså ett fodral som syns",
      "Locket viks till ett ställ i liggande läge, rätt håll för film",
      "Locket är fodrat med mikrofiber, som torkar av skärmen snarare än repar den",
    ],
    cons: [
      "Tre fack som delas mellan kort och sedlar, alltså ingen egen plats för kontanter",
      "399 kronor utan trådlös laddning, när ett fodral för 199 har både den och magnetring",
    ],
    specs: [
      { label: "Antal kortfack", shortLabel: "Kortfack", value: "3 st", highlight: true },
      // Stativfunktion, foder, kameraram och materialsammansättning lästa
      // 2026-08-06 i licenstagarens egen produkttext, som iPhonebutiken bara
      // återger i sammandrag. Hämtad hos Empik, som publicerar den i sin
      // helhet: empik.com/etui-guess-book-4g-metal-logo-do-iphone-17-pro-
      // brazowy-guess,p1686134791,elektronika-p. Sidan angav tidigare
      // stativfunktion "Nej" och ett sedelfack som ingen källa anger.
      { label: "Material", value: "Läderimitation, TPU och polykarbonat", highlight: true },
      { label: "Telefonens infästning", shortLabel: "Infästning", value: "TPU-hållare", highlight: true },
      { label: "Trådlös laddning genom fodralet", shortLabel: "Trådlös laddn.", value: "Nej", highlight: true },
      { label: "MagSafe-magnet", shortLabel: "MagSafe", value: "Nej", highlight: true },
      { label: "Stängning", value: "Magnetisk", highlight: true },
      { label: "Passar modeller", shortLabel: "Passar", value: "iPhone 17 Pro och 18 Pro", highlight: true },
      { label: "Garanti", value: "1 år", highlight: true },
      { label: "Sedelfack", value: "Nej, de tre facken tar kort eller sedlar" },
      { label: "Myntfack", value: "Nej" },
      { label: "Foder", value: "Mikrofiber" },
      { label: "Kameraskydd", value: "Förhöjd kant runt kameran" },
      { label: "Stativfunktion", value: "Ja, liggande" },
      { label: "Rem", value: "Nej" },
      { label: "Angivet RFID-skydd", value: "Ej angivet" },
      { label: "GTIN", value: "Ej angiven" },
    ],
    verdict:
      "Guess Book 4G Metal Logo säljs på sitt utseende, och det kostar 399 kronor. Läderimitation med det genomgående fyrfärgsmönstret och en logotyp i metall på framsidan.\n\n**Mönstret är produkten.** Den som vill ha ett fodral som syns köper det för det, och det är ett legitimt skäl som ingen jämförelsetabell kan mäta. Under ytan finns mer än fodralet skyltar med: locket viks till ett ställ i liggande läge, insidan är fodrad med mikrofiber som torkar av skärmen varje gång locket stängs, och runt kameran går en förhöjd kant som håller linserna från bordsskivan.\n\nDe tre facken delas mellan kort och sedlar, och trådlös laddning fungerar inte. För 399 kronor är det den dyraste vägen till tre kortfack och en sladd i hela jämförelsen.\n\nIngen annan här har det här mönstret, och för den som vill ha det är saken avgjord. Alla andra får mer fodral för mindre pengar.",
  },
];

/**
 * Bortvalda, med skäl.
 *
 * Urvalet ur iPhonebutikens 36 artiklar i kategorin plånboksfodral. De flesta
 * som ströks är inte sämre produkter utan andra produkter, och skälen säger
 * vilken.
 */
const CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Decoded",
    name: "Detachable Wallet",
    reason:
      "Ett fodral vars hela säljargument är att delas isär: plånboksdelen lossnar och kvar blir ett vanligt skal med magnetring. Det är marknadens svar på att uppfällbara fodral stänger av trådlös laddning, och en genuint bra lösning. Den ligger utanför rankningen eftersom avgränsningen gäller uppfällbara fodral, och en avtagbar konstruktion konkurrerar egentligen med skalen på /iphone-skal. Får en egen jämförelse den dag kategorin byggs ut.",
    approxPrice: 699,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/decoded-detachable-wallet-iphone-17-pro-57199.html",
  },
  {
    brand: "dbramante1928",
    name: "Lynge MagSafe Wallet",
    reason:
      "Samma märke som fodralet på tredje plats och 250 kronor dyrare, men en annan konstruktion: plånboksdelen fäster magnetiskt utanpå och kan tas av. Utesluten av samma skäl som Decoded. Värd att veta om för den som vill ha dbramantes läder men inte vill förlora magnetladdningen.",
    approxPrice: 749,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/dbramante1928-lynge-magsafe-wallet-iphone-17-pro-57289.html",
  },
  {
    brand: "Trolsk",
    name: "Plånboksfodral vertikalt",
    reason:
      "Ett fodral som viks uppåt i stället för åt sidan, vilket passar den som håller telefonen i en hand och sällan lägger den på ett bord. Konstruktionen är intressant men den delar kortkapacitet och material med de horisontella Trolsk-fodral som redan finns i rankningen, så en rad till hade sagt samma sak en gång till.",
    approxPrice: 149,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-planboksfodral-vertikalt-iphone-17-pro18-pro-57016.html",
  },
  {
    brand: "Woolnut",
    name: "Leather Pouch",
    reason:
      "En läderficka som telefonen stoppas i och dras ur, alltså varken fodral eller skal. Den skyddar telefonen i en väska och inte i handen, och den bär inga kort. Fin produkt, fel jämförelse.",
    approxPrice: 999,
    merchant: "iPhonebutiken",
    merchantUrl: "https://www.iphonebutiken.se/woolnut-leather-pouch-52167.html",
  },
  {
    brand: "Moobio",
    name: "Mobilskal läder med kortficka",
    reason:
      "Ett vanligt skal med en kortficka på baksidan, alltså ingen uppfällbar konstruktion och inget lock över skärmen. Den sortens produkt hör hemma bland skalen, och den finns i köpguidens genomgång av vad som mer bär kort.",
    approxPrice: 499,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/moobio-mobilskal-lader-med-kortficka-iphone-17-pro-57926.html",
  },
  {
    brand: "Trolsk",
    name: "Plånboksfodral med fjäril, blommor, panda och glitter",
    reason:
      "Fyra av de fjorton Trolsk-fodralen till iPhone 17 Pro är samma konstruktion i olika tryck, mellan 169 och 199 kronor. Rankningen har en rad per konstruktion och inte per mönster, av samma skäl som kabeljämförelsen har en rad per modell och inte per färg. Vill du ha ett mönster väljer du tryck på det fodral som har rätt antal fack.",
    approxPrice: 169,
    merchant: "iPhonebutiken",
    merchantUrl:
      "https://www.iphonebutiken.se/trolsk-planboksfodral-med-fjaril-iphone-17-pro18-pro-57140.html",
  },
];

/**
 * Egenskaperna fodralväljaren filtrerar på.
 *
 * Skild från `specs` av samma skäl som `IPHONE_SKAL_CAPABILITIES`: tabellen
 * visar strängar för en läsare, väljaren behöver jämförbara värden. Härledda ur
 * samma butiksuppgifter, inget nytt påstått.
 *
 * `charging` har tre nivåer och de är rangordnade efter vad du märker:
 *
 *   magnet — magnetring, laddaren dras till rätt läge av sig själv
 *   platta — laddar genom fodralet, men laddaren måste läggas rätt för hand
 *   ingen  — telefonen måste ur fodralet
 *
 * ⚠️ Gear Buffalo ligger på `platta` trots att laddningen är angiven som ett
 * ja, eftersom magneterna enligt produktsidan kan störa induktionsladdningen.
 * Att lägga den på samma nivå som ett rakt ja hade lovat mer än uppgiften bär.
 *
 * ⚠️ `cards` för Mujjo är satt till 3, alltså det högre talet i uppgiften
 * "2 till 3". Det spelar ingen roll för filtret, som bara skiljer på 3 och 9,
 * men det ska vara medvetet och inte en avrundning som råkade bli.
 */
export type FolioCapability = {
  id: string;
  charging: "magnet" | "platta" | "ingen";
  cards: number;
  coinPocket: boolean;
  /** Garvat läder, alltså inte läderimitation eller PU. */
  realLeather: boolean;
};

export const IPHONE_FODRAL_CAPABILITIES: FolioCapability[] = [
  { id: "nomad-modern-leather-folio-17-pro", charging: "magnet", cards: 3, coinPocket: false, realLeather: true },
  { id: "trolsk-planboksfodral-magsafe-17-pro", charging: "magnet", cards: 3, coinPocket: false, realLeather: false },
  { id: "dbramante1928-copenhagen-17-pro", charging: "platta", cards: 3, coinPocket: false, realLeather: true },
  { id: "gear-buffalo-wallet-17-pro", charging: "platta", cards: 3, coinPocket: false, realLeather: true },
  { id: "mujjo-full-leather-wallet-17-pro", charging: "magnet", cards: 3, coinPocket: false, realLeather: true },
  { id: "trolsk-9-kort-myntfack-17-pro", charging: "ingen", cards: 9, coinPocket: true, realLeather: false },
  { id: "trolsk-laderimitation-9-kort-17-pro", charging: "ingen", cards: 9, coinPocket: false, realLeather: false },
  { id: "caseme-c30-wallet-17-pro", charging: "ingen", cards: 10, coinPocket: true, realLeather: false },
  { id: "trolsk-dragkedja-stativ-17-pro", charging: "ingen", cards: 3, coinPocket: true, realLeather: false },
  { id: "sign-wallet-17-pro", charging: "ingen", cards: 3, coinPocket: false, realLeather: false },
  { id: "radicover-flip-side-17-pro", charging: "ingen", cards: 3, coinPocket: false, realLeather: false },
  { id: "guess-book-4g-17-pro", charging: "ingen", cards: 3, coinPocket: false, realLeather: false },
];

export const IPHONE_FODRAL_PRODUCTS = resolveProducts(IPHONE_FODRAL, SEEDS);

export const IPHONE_FODRAL_CONSIDERED = CONSIDERED;

/**
 * Frågorna är de som faktiskt ställs i kategorin, och svaren står på egna ben
 * eftersom FAQ-rutan kan visas ensam i ett sökresultat.
 */
export const IPHONE_FODRAL_FAQ = [
  {
    question: "Går det att ladda trådlöst med ett plånboksfodral?",
    answer:
      "Ibland, och det är kategorins viktigaste fråga att kontrollera före köp. Sju av de tolv fodral vi jämför blockerar trådlös laddning helt, alltså måste telefonen ur fodralet varje gång den ska laddas. Uppgiften står i specifikationen men aldrig i produktnamnet, och den följer inte priset: ett fodral för 199 kronor laddar trådlöst medan ett för 399 inte gör det. Vill du dessutom att laddaren ska fästa av sig själv behöver fodralet en magnetring, och den är ännu ovanligare. Leta efter både trådlös laddning och MagSafe i specifikationen, inte bara det ena.",
  },
  {
    question: "Vad är skillnaden mellan ett plånboksfodral och ett skal?",
    answer:
      "Ett fodral har ett lock som viks över skärmen och kortfack på insidan. Ett skal klär bara telefonens baksida och kanter. Skillnaden i praktiken är tre saker. Fodralet skyddar skärmen när telefonen ligger i en väska med nycklar, det ersätter plånboken, och det gör telefonen ungefär dubbelt så tjock. Skalet gör inget av det men behåller telefonens form och fungerar med magnetladdare och magnetplånböcker. Söker du skydd snarare än förvaring är det ett skal du vill ha, och den jämförelsen ligger på vår sida om iPhone-skal.",
  },
  {
    question: "Skyddar RFID-blockering i ett fodral mina bankkort?",
    answer:
      "Bankkortet försvarar sig i första hand självt. Ett modernt kontaktlöst betalkort skapar en ny engångskod för varje betalning, så en avlyssnad blippning går inte att spela upp igen. Det kort en skärmning faktiskt gör skillnad för är de svagare korten: passerkortet till jobbet, resekortet och tvättstugebrickan, som ofta bygger på äldre teknik med betydligt tunnare skydd. Var också medveten om att alla som anger ett RFID-skydd anger samma sak: ett ja, utan dämpning, frekvens eller standard. Det går alltså inte att välja fodral på den uppgiften, och den väger inte in i betygen här.",
  },
  {
    question: "Hur många kortfack behöver jag?",
    answer:
      "Räkna korten du faktiskt bär, inte de du äger. De flesta klarar sig med tre: ett bankkort, ett resekort och legitimation. Vill du lämna plånboken hemma helt behöver du oftast nio eller tio, plus ett myntfack om du någon gång betalar kontant. Men varje fyllt fack gör fodralet tjockare, och ett fodral med tio kort i är en klump som inte får plats i en jeansficka. Ett tips är att välja efter om du bär väska eller inte: i en väska spelar tjockleken ingen roll, i en ficka avgör den om fodralet blir använt.",
  },
  {
    question: "Håller ett fodral i läderimitation lika länge som äkta läder?",
    answer:
      "Nej, och skillnaden syns på samma ställe varje gång. Ett fodral viks flera gånger om dagen, och konstläder spricker i vecket där det viks medan garvat läder mjuknar och mörknar. Det betyder inte att konstläder är fel val: ett fodral för 149 kronor som håller i två år kostar mindre per år än ett för 799 som håller i sex, om du ändå byter telefon under tiden. Titta i stället på hur telefonen sitter fast. Ett limmat plastskal släpper från materialet långt före materialet självt ger upp, medan en TPU- eller silikonhållare inte har någon limfog att förlora.",
  },
  {
    question: "Vad händer om jag tappar bort fodralet?",
    answer:
      "Du förlorar telefonen och korten samtidigt, och för många även legitimationen. Det är den verkliga kostnaden med att slå ihop plånbok och telefon, och den nämns sällan när fodral säljs. Två saker minskar risken. En avtagbar handledsrem, som två av fodralen i jämförelsen har, gör att fodralet hänger kvar när du tappar greppet. En avtagbar konstruktion där telefonen lyfts ur låter dig lämna korten hemma när du ändå inte behöver dem. Spärra kort via din bankapp och anmäl legitimationen om det ändå händer.",
  },
  {
    question: "Passar ett fodral till iPhone 17 även på iPhone 17 Pro?",
    answer:
      "Nej. De två har samma skärmstorlek men olika mått och olika kameraplatå, så urtaget hamnar fel. iPhone 17 Pro Max är dessutom större i alla riktningar och iPhone Air betydligt tunnare, vilket gör att telefonen sitter löst i en hållare gjord för en annan modell. Kontrollera att artikeln du lägger i korgen anger exakt din modell och inte bara serien. Priserna på den här sidan gäller genomgående 17 Pro-varianten.",
  },
  {
    question: "Stör magneterna i fodralet mina kort?",
    answer:
      "Chipkort och kontaktlösa kort påverkas inte av magneterna i ett fodral. Det som kan påverkas är kort med magnetremsa, alltså den bruna randen på baksidan, och där är hotellnycklar och äldre passerkort de vanligaste. De avmagnetiseras av starka magneter över tid. I ett av fodralen kan magneterna dessutom störa induktionsladdningen, vilket är värt att veta om du laddar trådlöst. Har du ett magnetremskort du inte kan vara utan, lägg det i det fack som sitter längst från magnetlåset.",
  },
];
