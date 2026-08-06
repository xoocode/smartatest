import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { BRANDSTEGE } from "@/lib/test-pages";

/**
 * Brandstegar, de hängande. Underlag i .agent/research/brandstege.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, längd, angiven maxlast,
 * karmtjocklek, vikt, hopfällt mått, artikelnummer, kundbetyg och vilken
 * standard butiken eller tillverkaren anger. Allt läst 2026-08-02 på butikens
 * eller tillverkarens egen sida.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte belastat, hängt upp
 * eller klättrat i någon stege, och vi har inte sett något provningsintyg.
 *
 * ## ⚠️⚠️ Sidans fynd, omskrivet 2026-08-06 efter att manualerna lästs
 *
 * **Sex av åtta stegar får utlösas en enda gång och ska kasseras efteråt**,
 * och uppgiften står i tillverkarens bruksanvisning, inte i butiken.
 *
 * | Produkt | Engångsbruk | Står i |
 * |---|---|---|
 * | Brandvarnare.se 7 m och 4,5 m | **Ja** | SAVS-manualen butiken själv publicerar |
 * | Hard Head 4,3 m | **Ja** | manualen heter "One time use fire ladder" |
 * | Biltema 4,5 m | **Ja** | produktsidan, "Får bara användas en gång" |
 * | Skeppshultstegen 4,5 och 7,5 m | **Ja** | tillverkarens text, publicerad av Stegfabriken |
 * | **Housegard EL45A** | **Nej** | Clas Ohlson: "återanvändbar ... lämpligt efter t.ex. en brandövning" |
 * | Nexa FLB-104 | ingen uppgift | — |
 *
 * Samtliga manualer säger dessutom att du **inte ska dra i utlösningsbandet
 * när du övar**. Brandvarnare.se:s egna produktsidor skriver tvärtom att du
 * kan öva genom att fälla ut stegen hela vägen ned, alltså rakt emot den
 * manual de själva länkar i dokumentfliken. Det var tidigare en fördel på
 * båda deras stegar och ett superlativ på 4,5-metersstegen.
 *
 * ## Kilotalet går fortfarande inte att jämföra
 *
 * | Produkt | Angiven maxlast | Källa |
 * |---|---|---|
 * | Jula Hard Head | 150 kg, och "högst tre personer samtidigt" | manualen |
 * | Housegard EL45A och Biltema | 200 kg rek, testad till 450 | manualen, en person åt gången |
 * | Nexa FLB-104 | **450 kg**, inte 400 som Bauhaus anger | Nexas eget produktblad |
 * | Brandvarnare.se 4,5 och 7 m | 450 kg eller 3 personer | SAVS-manualen |
 * | Skeppshultstegen 4,5 och 7,5 m | 450 kg för hela repstegeserien | tillverkarens sida |
 *
 * Sju av åtta anger alltså 450 kilo någonstans, och den enda som håller sig
 * lägre, Jula, säger i samma manual att tre personer får använda stegen
 * samtidigt. Kontrasten som gör det skarpt: Housegards fasadmonterade EL39
 * provas mot EN 131-1 och EN 131-2 och uppger **150 kg**. Samma standarder
 * som den hängande EL45A, tre gånger talet.
 *
 * ## ⚠️ Fel i tidigare utkast, rättade
 *
 * Modellen heter **EL45A**, inte EL45S. EL45S kommer från brandinfo.se, och
 * är också det namn Housegards egen bruksanvisning bär.
 *
 * Kjells "Bredd: 30 cm" är **stegbredden**, inte karmdjupet. Ett tidigare
 * utkast förde in det som karmtjocklek, hämtat från en sökmotorsammanfattning
 * och inte från en läst sida. Samma felkälla som temperaturuppgiften på
 * /brandfilt.
 *
 * ⚠️ Karmtjockleken är **15 till 30 cm**, inte 15 till 34. Bruksanvisningen
 * som Kjell själv länkar, `897328_21053_stege_manual_se_no.pdf`, anger
 * "Maximal karmtjocklek: 30 cm" och intervallet 15–30, och Clas Ohlson svarar
 * samma sak i sin frågespalt. Housegards **egen produktsida anger 15–34** och
 * har 34 i sin sidtitel; manualen väger tyngre. Samma manual anger
 * EN 131-1:2007+A1-2011 och EN 131-2:2010, inte EN 131-6, och att stegen är
 * avsedd för **en person åt gången**. Se lib/corrections.ts.
 *
 * ⚠️ **Julas 43 cm var aldrig ett väggavstånd.** Bruksanvisningens tekniska
 * data listar `Utfälld: L 430 x B 31 x D 43 cm` under rubriken Mått, alltså
 * stegens eget djup utfälld inklusive krokbygeln, inte avståndet mellan
 * stegpinne och fasad. Vi publicerade det som "Väggavstånd utfälld", byggde
 * en fördel och ett superlativ på det och satte betyget för nedstigning
 * därefter. Samma manual anger **maximal karmtjocklek 30 cm**, inte 28 som vi
 * publicerade på fyra ställen.
 *
 * ⚠️ **Housegard och Biltema har avståndsklossar mot vägg.** Båda manualerna
 * varnar för att klossarna kan krossa fönstret på våningen under, och Clas
 * Ohlson skriver ut "Avståndsklossar mot vägg" i produkttexten. Vi skrev att
 * båda saknade distanser, gjorde nackdelar av det och drog ned betyget för
 * nedstigning på båda. Biltema låg sist på sidan i tre veckor på den grunden.
 *
 * ## ⚠️⚠️ Rättelse 2026-08-03: två stegar saknades, och ett påstående var fel
 *
 * Researchen för /utrymningsstege gick igenom Bauhaus kategori
 * "Utrymningsstegar" och hittade två **hängande** stegar bland de fasta. De
 * hörde hemma här och fanns inte med när sidan byggdes. Tre följder:
 *
 * 1. **Skeppshultstegens repstegar är inlagda**, 4,5 m för 1 327 kr och 7,5 m
 *    för 2 249 kr, lästa hos Bauhaus 2026-08-03.
 * 2. **Påståendet att Brandvarnare.se:s 7 m var enda stegen i svensk handel
 *    som når tre våningar var fel.** Skeppshultstegen säljer 7,5 m hos
 *    Bauhaus, och Stegfabriken har samma stege i 10 m för 4 513 kr. Ettan
 *    står kvar på plats ett, men på ett annat och kontrollerbart skäl: den är
 *    955 kronor billigare än närmaste stege med samma räckvidd.
 * 3. **Engångsbruket är inte en Jula-egenhet.** Skeppshultstegens egen text,
 *    som Stegfabriken publicerar, säger "konstruerad för att användas en gång
 *    enbart". Bauhaus, som säljer samma stege 42 procent billigare, skriver i
 *    stället bara "endast vid behov". Restriktionen försvinner alltså i den
 *    butik där produkten är billigast.
 *
 * ## Butiksfördelningen
 *
 * Åtta produkter, sju butiker. Brandvarnare.se, den enda butik vi kan
 * annonsera mot, tar plats ett och tre. Det är inget vi styrt fram: deras
 * sjumetersstege är den billigaste vägen ner från tre våningar med bred
 * marginal, och deras två sidor är de enda som beskriver distanserna som
 * håller ut stegen från fasaden.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

/**
 * De två Skeppshultstegen-stegarna lades till vid rättelsen dagen efter, och
 * deras priser är lästa hos Bauhaus då. Två datum i stället för ett påhittat
 * gemensamt: `priceCheckedAt` sitter per produkt just för det här fallet.
 */
const PRICE_CHECKED_SKEPPSHULT = "2026-08-03";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "brandvarnare-raddningsstege-7m",
    name: "Räddningsstege 7 m",
    shortName: "Räddningsstege 7 m",
    brand: "Brandvarnare.se",
    image: productImage(BRANDSTEGE.slug, "brandvarnare-raddningsstege-7m"),
    tagline: "Sju meter tar dig ner från tredje våningen för 955 kronor mindre än närmaste stege som gör det.",
    scores: { rackvidd: 5, nedstigning: 4.5, passform: 3.5, prisvarde: 4 },
    price: 1294,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/raddningsstege-7-m/",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst räckvidd per krona",
    pros: [
      "Sju meter täcker tre våningar, och närmaste stege med samma räckvidd kostar 955 kronor mer",
      "Distanser sticker ut från fotstegen och håller ut stegen från fasaden, så foten får plats",
      "21 fotsteg i räfflad aluminium, det tätaste steget till marken av stegarna med den längden",
      "Nylonband mellan fotstegen gör att den kan hänga rakt ned eller läggas över en takfot",
    ],
    cons: [
      "Får utlösas en enda gång och ska kasseras efteråt, så du kan bara öva på upphängningen",
      "Dyrast av stegarna, 1 294 kronor mot 699 för den billigaste",
      "6,5 kilo att bära fram och haka på i mörker, tyngst av alla",
    ],
    specs: [
      { label: "Längd", value: "7 m", highlight: true },
      { label: "Räcker till", value: "Tre våningar", highlight: true },
      { label: "Angiven maxlast", value: "450 kg eller 3 personer", highlight: true },
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      { label: "Vikt", value: "6,5 kg", highlight: true },
      /* SAVS-manualen som butiken själv länkar i dokumentfliken,
         SAVS-manual-8fold-version-FINAL-v1.1-SE.pdf: "Denna stege är endast
         avsedd för engångsbruk" och "byt ut denna stege efter 5 år". Samma
         manual täcker ESC-450 till ESC-2000 och bär specifikationstabellen med
         13/21 steg och 4,8/6,5 kg. Läst 2026-08-06. */
      { label: "Engångsbruk", value: "Ja, kasseras efter användning", highlight: true },
      { label: "Antal steg", value: "21" },
      { label: "Distanser mot vägg", value: "Ja" },
      { label: "Byt ut efter", value: "5 år" },
      { label: "Mått hopfälld", value: "37 x 24 x 28 cm" },
      { label: "Provad enligt", value: "Ingen" },
      { label: "Artikelnummer", value: "60602, SAVS ESC-700" },
    ],
    verdict:
      "Räddningsstege 7 m kostar 1 294 kronor och är den enda stegen under tvåtusen som når ner från ett fönster på tredje våningen.\n\nSju meter räcker till tre våningar. Skeppshultstegens 7,5-meters hos Bauhaus gör det också, men kostar 2 249 kronor, alltså 955 mer för en halv meter du inte behöver. Resten av jämförelsen ligger på 4 till 4,5 meter och är byggd för en andravåning. Sitter sovrummet på plan tre är det här stegen att köpa, och det är inte ens nära.\n\nDen är byggd för att klättras i. Från fotstegen sticker det ut distanser som håller stegen en bit från fasaden, och det är det som avgör om framfoten får plats: en stege av band pressas annars platt mot väggen av vikten hos den som klättrar. 21 fotsteg i räfflad aluminium ger tätare grepp ner än någon annan stege med den räckvidden, och de kraftiga nylonbanden gör att den kan hänga rakt ned eller läggas över en takfot.\n\nDen får däremot bara användas en gång. Manualen som Brandvarnare.se själva publicerar säger att stegen ska kasseras efter användning och bytas efter fem år, och att du inte ska dra i utlösningsbandet när du övar. Du kan alltså öva på att haka krokarna över karmen, som är det svåraste momentet i mörker, men aldrig på nedklättringen. Vill du ha en stege hela familjen får klättra i finns en enda på sidan, Housegard EL45A för 849 kronor, och den når bara en andravåning.\n\nHar du tre våningar: köp den här. Har du två räcker 4,5 meter, och då lägger du 495 kronor mindre på Housegard och får dessutom en stege du får öva med.",
  },
  {
    id: "housegard-el45a",
    name: "Brandstege EL45A 4,5 m",
    shortName: "EL45A",
    brand: "Housegard",
    image: productImage(BRANDSTEGE.slug, "housegard-el45a"),
    tagline: "Den enda stegen du får hänga upp, klättra i och använda igen.",
    /* nedstigning höjd 3,5 → 4,5 2026-08-06. Betyget var satt på att stegen
       saknade distanser mot fasaden. Bruksanvisningen varnar för att
       "avståndsklossarna på stegen" kan krossa fönstret på våningen under, och
       Clas Ohlson skriver ut "Avståndsklossar mot vägg och halksäkra steg i
       aluminium". Se lib/corrections.ts. */
    scores: { rackvidd: 4, nedstigning: 4.5, passform: 4.5, prisvarde: 4 },
    price: 849,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandstegar/housegard-brandstege-45-m-p21053",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 21, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för den som tänker öva",
    pros: [
      "Får återanvändas, så hela hushållet kan öva på den stege som sedan hänger kvar i garderoben",
      "Avståndsklossar mot vägg och halksäkra aluminiumsteg, så foten får plats hela vägen ner",
      "Krokarna sitter på karmar mellan 15 och 30 cm, alltså både för tunn och för tjock är utskrivet",
      "Provad mot EN 131-1 och EN 131-2 och CE-märkt, de allmänna stegstandarderna",
      "Levereras i en väska som går att förvara vid fönstret och få ut snabbt",
    ],
    cons: [
      "Avsedd för en person i taget, trots att kartongen talar om 450 kilo",
      "Utrymningshöjden är 4,7 meter från fönstrets underkant, alltså ingen tredje våning",
      "Får inte användas från ett fönster rakt ovanför ett annat, eftersom klossarna kan krossa rutan under",
    ],
    specs: [
      { label: "Längd", value: "4,5 m", highlight: true },
      { label: "Räcker till", value: "Två våningar", highlight: true },
      /* 200/450 kg står på förpackningen, men bruksanvisningen (Kjells egen
         länk, 897328_21053_stege_manual_se_no.pdf) säger "avsedd att användas
         av en person åt gången". Det talet är det som styr, och det står i
         omdömet. Läst 2026-08-06. */
      { label: "Angiven maxlast", value: "200 kg rek, testad till 450 kg", highlight: true },
      /* Bruksanvisningen anger 15–30 cm och "Maximal karmtjocklek: 30 cm".
         Housegards egen produktsida anger 15–34 och har 34 i sidtiteln; Clas
         Ohlsons frågespalt svarar 15 till 30. Manualen väger tyngst.
         Rättat 2026-08-06, se .agent/research/brandstege.md. */
      { label: "Karmtjocklek", value: "15 till 30 cm", highlight: true },
      /* Varken Kjell, Clas Ohlson, Housegard eller manualen anger stegens
         nettovikt. Clas Ohlson anger förpackningens vikt, 5,04 kg, vilket är
         ett annat mått och inte förs in i en kolumn med nettovikter. */
      { label: "Vikt", value: "Ej angiven", highlight: true },
      /* Clas Ohlson, som säljer samma artikel: "Stegen är återanvändbar och
         kan användas för fler bruk vilket kan vara lämpligt efter t.ex. en
         brandövning." Manualen saknar den kasseringsinstruktion som de sex
         andra stegarnas manualer bär, och säger i stället att stegen ska
         kontrolleras noggrant efter användning och bytas vid synliga skador.
         Läst 2026-08-06. */
      { label: "Engångsbruk", value: "Nej, får återanvändas", highlight: true },
      { label: "Max utrymningshöjd", value: "4,7 m" },
      { label: "Distanser mot vägg", value: "Ja" },
      { label: "Provad enligt", value: "EN 131-1 och EN 131-2, CE" },
      { label: "Garanti", value: "5 år" },
      { label: "Byt ut efter", value: "6 till 8 år" },
      { label: "Förvaring", value: "Medföljande väska" },
      { label: "Artikelnummer", value: "21053, modell 605012" },
    ],
    verdict:
      "Housegard EL45A kostar 849 kronor hos Kjell och är den enda stegen på sidan du får använda mer än en gång.\n\nDet är hela argumentet, och det är större än det låter. De sex andra stegarna ska kasseras efter att de fällts ut, vilket betyder att den enda gången någon i hushållet klättrar i dem är när huset brinner. Den här får du hänga upp, klättra ner för och sedan kontrollera och lägga tillbaka. Öva en gång om året med hela familjen, ungefär som ni testar brandvarnaren, så vet den som behöver stegen vad som händer när man kliver ut baklänges genom ett fönster.\n\nDen är också väl måttsatt för sitt jobb. Krokarna tar karmar mellan 15 och 30 centimeter, alltså både ett tak och ett golv, och golvet är det ingen annan som talar om: en alltför tunn karm ger krokarna inget att bita i. Avståndsklossar håller ut stegen från fasaden så att framfoten får plats, stegen är halksäkra i aluminium, och alltihop ligger i en väska du kan ställa vid fönstret och få ut i mörker. Provad mot EN 131-1 och EN 131-2 och CE-märkt.\n\nTvå gränser att räkna med. Utrymningshöjden är 4,7 meter från fönstrets underkant, så sitter fönstret högre räcker den inte. Och den får inte hängas från ett fönster som sitter rakt ovanför ett annat: avståndsklossarna kan slå sönder rutan under. Kilotalen på kartongen, 200 rekommenderat och 450 testat, ska du samtidigt bortse från, för manualen säger att stegen är avsedd för en person i taget.\n\nTill en andravåning finns ingen anledning att välja något annat på den här sidan. Bara tre stegar är billigare, och ingen av dem låter er ta reda på hur det känns innan det gäller.",
  },
  {
    id: "brandvarnare-raddningsstege-45m",
    name: "Räddningsstege 4,5 m",
    shortName: "Räddningsstege 4,5 m",
    brand: "Brandvarnare.se",
    image: productImage(BRANDSTEGE.slug, "brandvarnare-raddningsstege-45m"),
    tagline: "Distanserna på fotstegen håller ut stegen från väggen, så att foten får plats hela vägen ner.",
    scores: { rackvidd: 4, nedstigning: 4.5, passform: 4, prisvarde: 3 },
    price: 979,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/raddningsstege-4-5m/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst nedstigning till en andravåning",
    pros: [
      "Distanser på fotstegen som håller ut stegen från fasaden, så att framfoten får plats",
      "Räfflad aluminium på fotstegen, och nylonband som håller avståndet mellan stegen",
      "13 fotsteg på 4,5 meter, alltså tätare än de fyrametersstegar som har 12",
      "Ett klistermärke medföljer att sätta på dörren där stegen förvaras",
    ],
    cons: [
      "Får utlösas en enda gång, trots att produktsidan beskriver hur du övar med full utfällning",
      "979 kronor för 4,5 meter, 180 mer än Biltema och 130 mer än Kjell för samma räckvidd",
      "450 kilo eller tre personer i samma mening, och de två talen går inte ihop",
    ],
    specs: [
      { label: "Längd", value: "4,5 m", highlight: true },
      { label: "Räcker till", value: "Två våningar", highlight: true },
      { label: "Angiven maxlast", value: "450 kg eller 3 personer", highlight: true },
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      { label: "Vikt", value: "4,8 kg", highlight: true },
      /* Samma SAVS-manual som sjumetersstegen: den täcker ESC-450 till
         ESC-2000 och säger "Denna stege är endast avsedd för engångsbruk" och
         "Nu kan du dra av det svarta transportbandet (gör inte det vid
         övning)". Butikens produkttext säger tvärtom att du kan öva genom att
         fälla ut hela vägen ned. Läst 2026-08-06. */
      { label: "Engångsbruk", value: "Ja, kasseras efter användning", highlight: true },
      { label: "Antal steg", value: "13" },
      { label: "Distanser mot vägg", value: "Ja" },
      { label: "Byt ut efter", value: "5 år" },
      { label: "Mått hopfälld", value: "37 x 18,5 x 28 cm" },
      { label: "Provad enligt", value: "Ingen" },
      { label: "Artikelnummer", value: "60601, SAVS ESC-450" },
    ],
    verdict:
      "Samma stege som sjumetersvinnaren i kortare utförande, för 979 kronor, och den som är byggd bäst för själva nedklättringen av stegarna till en andravåning.\n\nDistanserna på fotstegen är skälet. De håller ut stegen från väggen så att foten får plats, för en stege av band pressas annars platt mot fasaden av vikten hos den som klättrar, och då står du med tårna på en pinne och knäna mot huset. Ovanpå det räfflad aluminium på fotstegen, kraftiga nylonband som håller avståndet mellan dem, och 13 steg på 4,5 meter mot 12 på de kortare stegarna.\n\nOch så det som inte står i butiken. Produktsidan beskriver hur du övar i två nivåer, både att bara hänga stegen och att fälla ut den hela vägen ned. Manualen som butiken publicerar i samma dokumentflik säger raka motsatsen: stegen är avsedd för engångsbruk, ska kasseras efter användning, och du ska inte dra i transportbandet när du övar. Fäll ut den och du har förbrukat en stege för 979 kronor.\n\nPriset är den andra invändningen. Biltema tar 799 och Kjell 849 för samma räckvidd, och Kjells får du dessutom öva med.\n\nKöp den om distanserna och de tätare stegen är värda 130 kronor mot Housegard och du ändå inte tänkt öva. Ska familjen träna på att ta sig ut är Housegard EL45A det enda valet här.",
  },
  {
    id: "nexa-flb-104",
    name: "Brandstege FLB-104 4 m",
    shortName: "FLB-104",
    brand: "Nexa",
    image: productImage(BRANDSTEGE.slug, "nexa-flb-104"),
    tagline: "699 kronor för fyra meter, hundra under närmaste stege.",
    scores: { rackvidd: 3.5, nedstigning: 3.5, passform: 3.5, prisvarde: 5 },
    price: 699,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/brandstege-nexa-flb-104-4m",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Billigast, om räckvidden räcker",
    pros: [
      "699 kronor, 100 kronor under näst billigaste och 1 550 under den dyraste",
      "30 centimeter breda fotsteg, brett att stå på i förhållande till priset",
      "4,5 kilo och tolv steg, den lättaste stegen på sidan att bära fram och haka på",
      "Krokarna tar karmar upp till 30 cm, samma gräns som stegar för tre gånger priset",
    ],
    cons: [
      "4,3 meters evakueringshöjd är knappt för en andravåning med hög takhöjd",
      "Inga distanser mot fasaden, till skillnad från Housegard och Biltema i samma prisklass",
      "CE-märkningen hänvisar till EN 131-6:2015, som gäller teleskopstegar och är ersatt sedan 2019",
    ],
    specs: [
      { label: "Längd", value: "4 m", highlight: true },
      { label: "Räcker till", value: "Två våningar", highlight: true },
      /* Bauhaus anger 400 kg. Nexas eget produktblad, som Bauhaus länkar under
         Dokument, anger 450 kg, och etiketten på stegen i produktbladets egen
         bild läser "MAX ... 450KG". Tillverkaren väger tyngre än butiken.
         Läst 2026-08-06, artikel 13750, EAN 7330545137507. */
      { label: "Angiven maxlast", value: "450 kg", highlight: true },
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      { label: "Vikt", value: "4,5 kg", highlight: true },
      /* Varken Bauhaus produktsida eller Nexas produktblad säger något om hur
         många gånger stegen får användas. De sex andra stegarnas manualer gör
         det. Cellen står som streck tills uppgiften är läst någonstans. */
      { label: "Engångsbruk", value: "Ej angivet", highlight: true },
      { label: "Max utrymningshöjd", value: "4,3 m" },
      { label: "Antal steg", value: "12" },
      { label: "Stegbredd", value: "30 cm" },
      { label: "Provad enligt", value: "CE (EN 131-6:2015)" },
      { label: "Artikelnummer", value: "1312824, Nexa 13750" },
    ],
    verdict:
      "Nexa FLB-104 kostar 699 kronor hos Bauhaus och är hundra kronor billigare än allt annat på sidan.\n\nFör pengarna får du en stege som gör grunderna. Fotstegen är 30 centimeter breda, vilket är lika brett som på stegar för tre gånger priset och märks när du står med bara tårna på en pinne i mörker. Krokarna tar karmar upp till 30 centimeter, samma gräns som alla andra. Och 4,5 kilo gör den till den lättaste stegen här att få fram ur en garderob och haka på med en hand.\n\nRäckvidden är gränsen. Fyra meters stege ger 4,3 meters evakueringshöjd räknat från fönstrets nederkant, och i ett hus med tre meters takhöjd sitter fönstret på andra våningen ofta precis där. Mät från marken upp till fönsterbrädan innan du beställer, för hundralappen du sparar är inte värd en stege som slutar en halvmeter ovanför gräsmattan.\n\nDen saknar också distanser mot fasaden, som Housegard och Biltema har för 150 respektive 100 kronor mer. Utan dem pressas stegen mot väggen av din egen tyngd och framfoten får mindre plats.\n\nSitter fönstret lågt nog är det här rätt köp, och mellanskillnaden räcker till en brandvarnare till. Är du osäker på höjden: lägg hundralappen på Biltemas 4,5-metersstege i stället.",
  },
  {
    id: "hardhead-brandstege-43m",
    name: "Brandstege 4,3 m",
    /* Inte "Hard Head 4,3 m": varumärket renderas separat i väljare och tabell,
       och ett shortName som upprepar det ger "Hard Head Hard Head 4,3 m". */
    shortName: "Brandstege 4,3 m",
    brand: "Hard Head",
    image: productImage(BRANDSTEGE.slug, "hardhead-brandstege-43m"),
    tagline: "18,5 × 37 × 25 centimeter hopfälld, alltså plats under sängen i barnrummet.",
    /* nedstigning sänkt 4,5 → 3,5 2026-08-06. Betyget byggde på ett publicerat
       väggavstånd på 43 cm. Bruksanvisningens tekniska data listar
       "Utfälld: L 430 x B 31 x D 43 cm" under rubriken Mått, alltså stegens
       eget djup utfälld och inte avståndet till fasaden. Ingenting skiljer den
       därmed från Nexa FLB-104, som är samma OEM-stege med samma krokbygel.
       Se lib/corrections.ts. */
    scores: { rackvidd: 3.5, nedstigning: 3.5, passform: 3.5, prisvarde: 3 },
    price: 799,
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/hem-och-hushall/brand-och-sakerhet/brand/brandstegar/brandstege-025385/",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.7, count: 19, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst när förvaringen är trång",
    pros: [
      "18,5 × 37 × 25 cm hopfälld, den minsta packen på sidan och lätt att få under en säng",
      "Räfflade steg och en nedstigningsinstruktion i fem punkter på produktsidan",
      "Engångsvillkoret står i butiken, inte bara i manualen, till skillnad från fyra av de andra",
      "4,68 kilo, alltså i den lätta halvan av stegarna",
    ],
    cons: [
      "Ska kasseras efter en utlösning, och bytas efter fem år även om den aldrig använts",
      "Inga distanser mot fasaden, så framfoten får mindre plats än på Housegard och Biltema",
      "150 kilo angivet, och tre personer samtidigt tillåtna i samma manual",
    ],
    specs: [
      { label: "Längd", value: "4,3 m utfälld", highlight: true },
      { label: "Räcker till", value: "Två våningar", highlight: true },
      { label: "Angiven maxlast", value: "150 kg", highlight: true },
      /* Bruksanvisningen: "Fönsterbrädjupet får maximalt vara 30 cm", och
         måttskissen anger MAX 300 mm. Vi publicerade 28 cm på fyra ställen
         utan att kunna belägga det i manualen. Rättat 2026-08-06. */
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      { label: "Vikt", value: "4,68 kg", highlight: true },
      /* Manualen heter "ONE TIME USE FIRE LADDER / BRANDSTEGE FÖR
         ENGÅNGSBRUK" och säger "Efter användning ska produkten kasseras".
         Samma manual: "Produkten bör bytas ut vart 5:e år" och "Dra inte i
         utlösningsbandet vid övningsmontering". Läst 2026-08-06. */
      { label: "Engångsbruk", value: "Ja, kasseras efter användning", highlight: true },
      { label: "Byt ut efter", value: "5 år" },
      { label: "Mått hopfälld", value: "18,5 × 37 × 25 cm" },
      /* Inte ett väggavstånd. Manualens tekniska data listar det under Mått
         som stegens djup i utfällt läge, tillsammans med längd och bredd. */
      { label: "Mått utfälld", value: "430 × 31 × 43 cm" },
      { label: "Provad enligt", value: "Ingen" },
      { label: "Artikelnummer", value: "025385" },
    ],
    verdict:
      "Hard Head Brandstege kostar 799 kronor hos Jula och packar ihop till 18,5 × 37 × 25 centimeter, den minsta packen på sidan.\n\nDet spelar roll för var stegen hamnar. En brandstege gör nytta i det rum vars fönster du tänkt utrymma genom, och den vanligaste anledningen till att den i stället hamnar i förrådet är att den inte får plats under sängen eller i garderoben. Den här gör det, i ett barnrum också. Fotstegen är räfflade och Jula skriver ut nedstigningen i fem punkter på produktsidan.\n\nJula är också ensam om att skriva engångsvillkoret där du handlar. \"Endast avsedd för engångsbruk\" står i produkttexten, och bruksanvisningen heter rakt av One time use fire ladder. Fyra av de andra stegarna har samma villkor men bara i en manual du läser efter köpet, så den som jämför i butiken tror att Julas är sämre än den är.\n\nDet den saknar är distanser mot fasaden. Housegard för 849 och Biltema för 799 har avståndsklossar som håller ut stegen från väggen, och utan dem pressas den mot huset av din egen tyngd och framfoten får mindre plats. Manualen anger dessutom 150 kilo och tillåter tre personer samtidigt på samma sida, vilket inte går ihop.\n\nKöp den om förvaringsplatsen avgör och stegen ska ligga i ett litet rum. Har du plats för en väska under sängen får du mer stege för pengarna hos Biltema, och en du dessutom får öva med hos Kjell.",
  },
  /* Tillagda 2026-08-03 vid rättelsen. Priserna är lästa hos Bauhaus samma
     dag och inte på filens PRICE_CHECKED, därav den egna konstanten. */
  {
    id: "skeppshult-repstege-75m",
    name: "Repstege 7,5 m",
    shortName: "Repstege 7,5 m",
    brand: "Skeppshultstegen",
    image: productImage(BRANDSTEGE.slug, "skeppshult-repstege-75m"),
    tagline: "7,5 meter räcker ned från tredje våningen, och 80 mm ut från fasaden ger foten plats.",
    scores: { rackvidd: 5, nedstigning: 4, passform: 3, prisvarde: 2 },
    price: 2249,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/brandstege-skepphultstegen-plast-7-5m",
    priceCheckedAt: PRICE_CHECKED_SKEPPSHULT,
    superlative: "Bäst för tre våningar med hög takhöjd",
    pros: [
      "80 mm ut från fasaden, vilket ger framfoten plats hela vägen ned",
      "306 mm mellan sidorna och 22 fotsteg, alltså bredare att stå på än de flesta",
      "7,5 meter räcker till tre våningar med marginal även vid hög takhöjd",
      "936 kronor billigare än exakt samma artikel hos Stegfabriken",
    ],
    cons: [
      "2 249 kronor är 955 mer än sjumetersstegen hos Brandvarnare.se",
      "Konstruerad för att användas en gång, enligt tillverkarens egen text",
      "Ingen väska eller låda ingår, så den behöver en egen plats i garderoben",
    ],
    specs: [
      { label: "Längd", value: "7,5 m", highlight: true },
      { label: "Räcker till", value: "Tre våningar", highlight: true },
      /* 450 kg står på Skeppshultstegens egen produktsida för hela
         repstegeserien, inte hos Bauhaus som säljer den. Vi skrev "Ej angivet"
         och gjorde en nackdel av det, med butiken som enda källa. Läst
         2026-08-06 på
         skeppshultstegen.se/sv/tak-fasadstegar/repstege-utrymning-standard.html */
      { label: "Angiven maxlast", value: "450 kg", highlight: true },
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      /* 6,3 kg står i tillverkarens egen varianttabell för art 62-75-1, som
         Stegfabriken publicerar tillsammans med 4,30 kg för 4,7 m och 8,50 kg
         för 10 m. Bauhaus anger 6,8 kg för samma artikel. Vi tar tillverkarens
         tabell, som är internt konsekvent över de tre längderna; avvikelsen
         står i .agent/research/brandstege.md. */
      { label: "Vikt", value: "6,3 kg", highlight: true },
      { label: "Engångsbruk", value: "Ja, enligt tillverkaren", highlight: true },
      { label: "Avstånd från fasad", value: "80 mm" },
      { label: "Stegbredd", value: "306 mm" },
      { label: "Antal steg", value: "22" },
      { label: "Mått hopfälld", value: "0,29 m" },
      { label: "Provad enligt", value: "Ingen" },
      { label: "Artikelnummer", value: "1503513, tillverkarens 62-75-1" },
    ],
    verdict:
      "Skeppshultstegens repstege är 7,5 meter lång och kostar 2 249 kronor hos Bauhaus. Den är den bredaste stegen på sidan att faktiskt klättra i.\n\nTvå mått bär det. 80 millimeter ut från fasaden avgör om framfoten får plats när stegen ligger an mot väggen, och det är mer än någon annan stege här håller ut sig själv. 306 millimeter mellan sidorna, mot 30 centimeter på de smalaste, plus 22 fotsteg gör den stadig att kliva ut baklänges på i mörker. Krokarna tar karmar upp till 300 millimeter och tillverkaren anger 450 kilo.\n\nPriset är invändningen och det är en stor sådan. 2 249 kronor mot 1 294 för sjumetersstegen hos Brandvarnare.se är 955 kronor för en halv meter du sannolikt inte behöver, och båda ska kasseras efter en utlösning. Någon väska eller låda ingår inte heller, så du får själv hitta en plats där 6,3 kilo stege ligger framme utan att vara i vägen.\n\nKöp den om du har tre våningar, hög takhöjd och vill ha den bredaste stegen som säljs. I ett vanligt trevåningshus räcker sju meter, och då sparar du nästan tusen kronor. Vill du ändå ha just den här: köp den hos Bauhaus, för Stegfabriken tar 3 185 kronor för samma artikelnummer.",
  },
  {
    id: "skeppshult-repstege-45m",
    name: "Repstege 4,5 m",
    shortName: "Repstege 4,5 m",
    brand: "Skeppshultstegen",
    image: productImage(BRANDSTEGE.slug, "skeppshult-repstege-45m"),
    tagline: "305 millimeter mellan sidorna, alltså bredare att stå på än fyrametersstegarna.",
    scores: { rackvidd: 4, nedstigning: 4, passform: 3, prisvarde: 2 },
    price: 1327,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/brandstege-skepphultstegen-plast-4-5m",
    priceCheckedAt: PRICE_CHECKED_SKEPPSHULT,
    superlative: "Bredast att stå på till en andravåning",
    pros: [
      "305 mm mellan sidorna och 13 fotsteg, alltså bredare och tätare än fyrametersstegarna",
      "80 mm ut från fasaden angivet som ett mått, så framfoten får plats",
      "4,3 kilo, alltså ett kilo lättare än sjumetersstegarna att lyfta över en karm",
      "568 kronor billigare än samma artikel hos Stegfabriken",
    ],
    cons: [
      "1 327 kronor för en räckvidd som kostar 799 hos Biltema och 849 hos Kjell",
      "Konstruerad för att användas en gång, enligt tillverkarens egen text",
      "Ingen väska eller låda ingår, till skillnad från Housegards för 478 kronor mindre",
    ],
    specs: [
      { label: "Längd", value: "4,5 m", highlight: true },
      { label: "Räcker till", value: "Två våningar", highlight: true },
      /* Vi skrev "Ej angivet" och gjorde en nackdel av det. Tillverkarens egen
         sida anger "Max belastning 450kg" för repstegen som produkt, och
         listar den i tre längder: 4780, 7500 och 10500 mm. Stegfabriken
         publicerar samma punktlista ovanför varianttabellen med art 62-45-1,
         62-75-1 och 62-105-1. Talet gäller alltså serien, inte bara sjuan.
         Läst 2026-08-06. */
      { label: "Angiven maxlast", value: "450 kg", highlight: true },
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      /* 4,30 kg, tillverkarens varianttabell för art 62-45-1 via Stegfabriken.
         Bauhaus publicerar ingen vikt för den här artikeln. */
      { label: "Vikt", value: "4,3 kg", highlight: true },
      { label: "Engångsbruk", value: "Ja, enligt tillverkaren", highlight: true },
      { label: "Avstånd från fasad", value: "80 mm" },
      { label: "Stegbredd", value: "305 mm" },
      { label: "Antal steg", value: "13" },
      { label: "Mått hopfälld", value: "0,24 m" },
      { label: "Provad enligt", value: "Ingen" },
      { label: "Artikelnummer", value: "1503512, tillverkarens 62-45-1" },
    ],
    verdict:
      "Kortversionen av sjuan är den bredaste stegen på fyra och en halv meter, med 305 millimeter mellan sidorna.\n\nBredden är det du står på. Fyrametersstegarna ger 30 centimeter och Skeppshultstegen en halv centimeter mer, vilket låter futtigt tills man har bara tårna på en pinne i mörker. Till det 13 fotsteg i stället för 12 på en halvmeter längre stege, 80 millimeter ut från fasaden så att framfoten får plats, och 4,3 kilo att lyfta över karmen mot 6,3 för sjumetersvarianten.\n\nProblemet är vad grannarna på hyllan kostar. Samma räckvidd får du för 799 kronor hos Biltema och 849 hos Kjell, och Kjells är den enda stegen här du får öva med och den enda som anger ett karmintervall i båda riktningarna. Här betalar du 1 327 kronor, alltså 478 mer, för en halv centimeters stegbredd och ett publicerat avståndsmått.\n\nDet som ändå gör den värd att känna till är butiksskillnaden. Exakt samma artikelnummer kostar 1 895 kronor hos Stegfabriken, alltså 43 procents påslag på samma stege från samma tillverkare. Det mönstret gäller hela Skeppshultstegens sortiment och är den enskilt största besparingen i den här produktfamiljen.\n\nDen halva centimetern är inte värd 478 kronor för de flesta. Ta Housegard hos Kjell och lägg mellanskillnaden på en brandvarnare till varje sovrum.",
  },
  {
    id: "biltema-brandstege-45m",
    name: "Brandstege 4,5 m",
    /* Samma skäl som hos Hard Head: brand renderas separat, så "Biltema 4,5 m"
       hade blivit "Biltema Biltema 4,5 m". */
    shortName: "Brandstege 4,5 m",
    brand: "Biltema",
    image: productImage(BRANDSTEGE.slug, "biltema-brandstege-45m"),
    tagline: "Full andravåningsräckvidd för 799 kronor, att hämta i varuhuset i dag.",
    /* nedstigning 2,5 → 4,0 och passform 2,0 → 3,0 den 2026-08-06. Båda
       betygen var satta på uppgifter vi inte läst. Bruksanvisningen som
       produktsidan länkar varnar för att "avståndsklossarna på stegen" kan
       krossa fönstret under, alltså har stegen distanser, och anger maximal
       karmtjocklek 30 cm. Vi hade skrivit att den saknade distanser och att
       karmmåttet inte gick att få fram. nedstigning stannar på 4,0 och inte
       4,5 eftersom varken stegbredd eller halkskydd är angivet någonstans.
       Se lib/corrections.ts. */
    scores: { rackvidd: 4, nedstigning: 4, passform: 3, prisvarde: 4.5 },
    price: 799,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandstegar/brandstege-45-m-2000042748",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst köp att hämta samma dag",
    pros: [
      "4,5 meter för 799 kronor, full andravåningsräckvidd till näst lägsta pris",
      "Finns i varuhus över hela landet och går att hämta samma dag",
      "Avståndsklossar mot vägg, samma lösning som stegen för 495 kronor mer",
      "Krokarna tar karmar upp till 30 cm och utrymningshöjden är angiven till 4,7 meter",
    ],
    cons: [
      "Får bara användas en gång, så en övning kostar en ny stege",
      "Avsedd för en person åt gången, trots att kartongen talar om 450 kilo",
      "Får inte användas från ett fönster rakt ovanför ett annat, eftersom klossarna kan krossa rutan under",
    ],
    specs: [
      { label: "Längd", value: "4,5 m", highlight: true },
      { label: "Räcker till", value: "Två våningar", highlight: true },
      { label: "Angiven maxlast", value: "200 kg, testad till 450 kg", highlight: true },
      /* Karmtjocklek, utrymningshöjd, garanti, avståndsklossar och standard
         står i Biltemas egen manual,
         docs.biltema.com/v2/documents/file/sv/35787d98-…, som produktsidan
         länkar. Det är samma OEM-manual som Housegard EL45S, med samma bilder.
         Produktsidan anger dessutom EN 131-6:2015 i brödtexten. Vi skrev
         "Ej angivet" och "Ingen standard anges" om båda, och att stegen
         saknade distanser. Läst 2026-08-06, se .agent/research/brandstege.md. */
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      /* Varken produktsidan eller manualen anger stegens vikt. */
      { label: "Vikt", value: "Ej angiven", highlight: true },
      { label: "Engångsbruk", value: "Ja, enligt produktsidan", highlight: true },
      { label: "Max utrymningshöjd", value: "4,7 m" },
      { label: "Distanser mot vägg", value: "Ja" },
      { label: "Material", value: "Nylon och aluminium" },
      { label: "Provad enligt", value: "EN 131-6:2015" },
      { label: "Garanti", value: "3 år" },
      { label: "Artikelnummer", value: "21-500" },
    ],
    verdict:
      "Biltemas brandstege kostar 799 kronor, når 4,5 meter och är den du kan ha hängande vid fönstret i kväll.\n\nDen finns i varuhus över hela landet och går att hämta på vägen hem. Det betyder mer än det låter för en produkt de flesta vet att de borde ha och skjuter upp i åratal, och det är den enda stegen här som inte kräver att du beställer och väntar.\n\nFör pengarna får du samma konstruktion som stegen för 495 kronor mer. Avståndsklossar håller ut stegen från fasaden så att framfoten får plats, krokarna tar karmar upp till 30 centimeter, och utrymningshöjden är angiven till 4,7 meter räknat från fönstrets underkant, alltså full räckvidd från en normal andravåning. Manualen som produktsidan länkar bär alla tre uppgifterna, plus tre års garanti.\n\nDen får bara användas en gång. En övning kostar alltså 799 kronor till, och manualen säger dessutom att stegen är avsedd för en person åt gången, oavsett de 200 och 450 kilo som står på kartongen. Den får heller inte hängas från ett fönster som sitter rakt ovanför ett annat, för då kan klossarna slå sönder rutan under.\n\nFemtio kronor skiljer den från Housegard hos Kjell, och de femtio kronorna köper en stege ni får öva med. Det är den enda anledningen att inte hämta den här på vägen hem i kväll, och den är god.",
  },
];

export const BRANDSTEGE_PRODUCTS: Product[] = resolveProducts(BRANDSTEGE, SEEDS);

/**
 * Övervägda men inte rankade.
 *
 * De fasta stegarna är det största avsteget och det är ett användarbeslut:
 * de får en egen sida i stället för att blandas in i en rankning där prisspannet
 * annars blir trettonfaldigt.
 */
export const BRANDSTEGE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Housegard",
    name: "Utfällbar utrymningsstege EL39, 3,9 m",
    reason:
      "Ingen hängande stege. Den monteras fast på fasaden och fälls ut inifrån med en låssprint, väger 11,5 kilo och kostar 3 695 kronor. Den är dessutom den enda produkten i hela kategorin som anger en standard som faktiskt gäller stegar, EN 131-1:2015 och EN 131-2:2010, och den anger då 150 kilo maxlast. Alltså lägst av alla, trots att den är den enda som provats. Den hör hemma bland de fasta utrymningsstegarna.",
    approxPrice: 3695,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandstegar/housegard-brandstege-39-m-p21279",
  },
  {
    /* ⚠️ Rättat 2026-08-03. Den här posten angav tidigare spannet "1 327 till
       9 199 kronor" för de fasta stegarna. 1 327 är priset på Skeppshultstegens
       repstege, en hängande stege som nu ligger i rankningen ovan. De
       fasta börjar på 5 599. Samma sammanblandning som gjorde att de två
       repstegarna missades helt när sidan byggdes. */
    brand: "Skeppshultstegen",
    name: "Utrymningsstege fällbar, i aluminium",
    reason:
      "Fasta fasadstegar från 5 599 till 9 199 kronor hos Bauhaus, i längder från 2,7 till 4,8 meter. De löser ett annat problem: en fast monterad stege är det enda Boverkets byggregler räknar som utrymningsväg när fönstrets underkant sitter mer än fem meter över marken. En hängande stege gör aldrig det, oavsett hur lång den är. Samma tillverkares hängande repstegar ligger däremot i rankningen ovan. Får egen sida.",
    approxPrice: 5599,
    merchant: "Bauhaus",
    merchantUrl:
      "https://www.bauhaus.se/bygg/stegar-byggstallningar/stegar/utrymningsstegar",
  },
  {
    brand: "Skeppshultstegen",
    name: "Repstege 10 m hos Stegfabriken",
    reason:
      "Samma repstege som ligger i rankningen, i en tredje längd som bara Stegfabriken säljer, 4 513 kronor. Tio meter når en fjärde våning, men där är vi utanför det den här sidan handlar om: Boverkets byggregler räknar bara en fast monterad stege som utrymningsväg när fönstrets underkant sitter över fem meter. Vi rankar den inte, men den är skälet till att vi inte längre kallar någon stege den längsta i svensk handel.",
    approxPrice: 4513,
    merchant: "Stegfabriken",
    merchantUrl:
      "https://www.stegfabriken.se/stegar/brand-utrymning/utrymningsstegar/skeppshultstegen-repstege",
  },
  {
    brand: "Clas Ohlson",
    name: "Utrymningsstege Trygg 4 meter",
    reason:
      "Butiken skriver varken ut pris eller specifikation, varumärket står som NONAME EXTERNT och produkten har noll omdömen. Vi rankar inte en säkerhetsprodukt där ingen av de uppgifter vi betygsätter går att läsa. Kontrollerat för hand 2026-08-02.",
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Utrymningsstege-Trygg-4-meter/p/34-4409",
  },
  {
    brand: "Housegard",
    name: "Brandstege 4,5 m hos Clas Ohlson",
    reason:
      "Samma stege som ligger tvåa, men Clas Ohlson tog 899 kronor mot Kjells 849. Vi länkar till den butik som har lägst pris. Betyget 4,5 av 5 på 59 omdömen hos Clas Ohlson är det största kundunderlaget i kategorin och är värt att känna till.",
    approxPrice: 899,
    merchant: "Clas Ohlson",
    merchantUrl: "https://www.clasohlson.com/se/Brandstege-Housegard-4,5-m/p/36-4777",
  },
  {
    brand: "Zarges",
    name: "Brandstege 1,8 och 2,4 m",
    reason:
      "Proffsstegar för 5 151 och 6 850 kronor som förekommer i en svensk jämförelse, rankade i samma lista som en hängande stege för 791. De är inte konsumentprodukter och de löser inte samma uppgift. Att blanda dem gör betyget obegripligt.",
    approxPrice: 5151,
  },
  {
    brand: "Diverse",
    name: "Räddningslina med sele",
    reason:
      "Ett rep med sele i stället för en stege, sålt för utrymning från högre våningar än en stege når. Det är en annan produkt med en annan färdighet bakom sig: att fira sig ned i ett rep i mörker med rök i lungorna är inte samma sak som att klättra ner för pinnar. Vi rankar den inte utan att veta mer om vad som krävs av användaren.",
  },
];

export const BRANDSTEGE_FAQ = [
  {
    question: "Vilken brandstege är bäst 2026?",
    answer:
      "Det beror på hur högt fönstret sitter. Har du två våningar är Housegard EL45A hos Kjell för 849 kronor bäst köp, och skälet är att den är den enda stegen på sidan som får återanvändas: 4,5 meter räckvidd, avståndsklossar mot väggen, karmar mellan 15 och 30 centimeter, och en produkt hela hushållet får öva med. Har du tre våningar är Brandvarnare.se sjumetersstege för 1 294 kronor den billigaste vägen ner, 955 kronor under Skeppshultstegens 7,5-meters hos Bauhaus. Sitter fönstrets underkant mer än fem meter över marken bör du i stället titta på en fast monterad stege, eftersom det är den enda typ Boverkets byggregler räknar som utrymningsväg.",
  },
  {
    question: "Hur lång brandstege behöver jag?",
    answer:
      "Mät från fönstrets underkant ner till marken, och lägg till lite marginal för att stegen ska nå ända ner. Som tumregel går det åt 2,5 till 3,5 meter per våningsplan beroende på takhöjd. En 4,5-metersstege täcker en normal andravåning. En stege på 4 till 4,3 meter blir knapp om huset har hög takhöjd. Över fem meter till marken är du utanför det byggreglerna räknar med att man klarar med en hängande stege.",
  },
  {
    question: "Är brandstegar certifierade?",
    answer:
      "Inte mot någon standard som gäller stegtypen. Nexa och Biltema hänvisar till EN 131-6, men SIS beskriver den standardens omfattning som lutande och stående teleskopstegar, och en stege som hänger fritt i nylonband är ingetdera. Båda anger dessutom utgåvan 2015, som SIS listar som tillbakadragen och ersatt av 2019. Housegard EL45A är provad mot EN 131-1 och EN 131-2, alltså de allmänna stegstandarderna, och CE-märkt. Vi betygsätter inte vem som har publicerat ett intyg, eftersom en stege bär det den bär oavsett vad som står i produktbladet.",
  },
  {
    question: "Får man öva med en brandstege?",
    answer:
      "Att hänga upp den, ja. Att fälla ut den, nästan aldrig. Sex av de åtta stegarna ska enligt sin egen bruksanvisning utlösas en enda gång och kasseras efteråt, och samtliga manualer säger uttryckligen att du inte ska dra i utlösningsbandet när du övar. Undantaget är Housegard EL45A, som är byggd för att kontrolleras efter användning och hängas tillbaka. Öva därför alltid på upphängningen, som är det svåraste momentet i mörker: att få krokarna rätt över karmen med en hand och känna efter att de sitter. Vill ni öva på hela nedklättringen behöver ni antingen Housegards stege eller en extra stege att förbruka.",
  },
  {
    question: "Måste man ha brandstege enligt lag?",
    answer:
      "Nej. Boverkets byggregler ställer krav på hur en byggnad utformas, inte på vad du äger, och en hängande stege räknas aldrig som utrymningsväg i reglernas mening. Bara en fast monterad stege gör det. Det byggreglerna däremot säger rakt ut är vad alternativet är: sitter fönstrets underkant högst fem meter över marken accepteras att man utrymmer genom att hoppa, och Boverket skriver själva att man då riskerar att skadas. Det är det bästa argumentet för att ha en stege, och det är starkare än något butikerna formulerar.",
  },
  {
    question: "Hur tjock fönsterkarm klarar en brandstege?",
    answer:
      "Högst 30 centimeter, och det gäller alla åtta. Housegard är ensam om att ange ett golv också: 15 till 30 centimeter, eftersom en alltför tunn karm ger krokarna för lite att bita i. Mät karmen vid det fönster du tänkt använda innan du beställer, det tar en minut och är det billigaste du kan göra för din säkerhet i den här kategorin. Julas stege stod länge angiven till 28 centimeter hos oss, vilket var vårt fel: bruksanvisningen anger 30.",
  },
  {
    question: "Klarar barn att använda en brandstege själva?",
    answer:
      "Sällan, och det är en av de viktigaste sakerna att ta ställning till innan du köper. En hängande repstege pendlar mot fasaden när man klättrar, och den kräver att du vågar kliva ut genom ett fönster baklänges. Ett barn som aldrig gjort det i lugn och ro kommer inte att göra det för första gången i mörker med rök i rummet. Planera därför för barnrummet som om stegen inte fanns: en vuxen går dit och hämtar. Stegen ska ligga där en vuxen kan använda den för att ta sig ner med ett barn, inte där ett barn förväntas klara sig ensamt. Och öva tillsammans, i dagsljus.",
  },
  {
    question: "Hur övar man med en brandstege utan att någon slår sig?",
    answer:
      "På låg höjd, i dagsljus, med någon som håller, och bara med en stege som tål att fällas ut. Öva från ett fönster på bottenvåningen eller från en altan, inte från sovrummet på övervåningen. Det du faktiskt tränar är momenten som är svåra: att få fast kroken på karmen med en hand, att förstå åt vilket håll stegen ska hänga, och att kliva ut baklänges med fötterna först. De två första kan du öva på med vilken stege som helst, eftersom de inte sliter på den. Det tredje kräver att stegen får utlösas mer än en gång. Gör det en gång om året med hela hushållet, ungefär som ni testar brandvarnaren. Låt inte barn öva ensamma, och häng aldrig upp stegen i något som inte är en riktig fönsterkarm. En stege som legat orörd i tio år är inget brandskydd, det är ett kvitto.",
  },
  {
    question: "Behöver jag brandstege om räddningstjänsten kan komma med stegbil?",
    answer:
      "Räkna inte med den. Insatstiden varierar från några minuter i en tätort till en halvtimme på landsbygden, och en övertändning i ett rum kan inträffa på under tio minuter. Till det kommer att en stegbil måste komma fram till rätt fasad, vilket parkerade bilar, staket, häckar och snövallar ofta hindrar. Brandstegen löser ett annat problem än stegbilen: den är till för de första minuterna, innan någon annan är på plats. Bor du så att en stegbil inte kan nå fasaden alls är den inte ett komplement utan din enda väg ut, och då ska du välja en fast monterad utrymningsstege i stället.",
  },
  {
    question: "Går brandstegen att använda från ett fönster med insektsnät eller persienn?",
    answer:
      "Bara om du får bort dem på några sekunder. En utanpåliggande myggnätsram, en fast monterad insektsdörr eller en persienn mellan glasen gör att stegen aldrig kommer till användning. Kontrollera i lugn och ro: går nätet att trycka ut inifrån eller är det skruvat? Går persiennen att dra upp helt, eller täcker den halva öppningen? Samma sak gäller barnsäkerhetsspärrar i fönsterhandtag, som är bra i vardagen och ett hinder i en utrymning. Sitter en spärr där ska alla i hushållet veta hur den öppnas utan verktyg.",
  },
  {
    question: "Var i huset gör en brandstege mest nytta?",
    answer:
      "I sovrummen på övervåningen, särskilt i de rum som saknar en andra väg ut. Gå en runda i huset och fråga för varje rum där någon sover: om det brinner i trapphuset, hur tar sig den som ligger här ut? Har rummet balkong, altantak eller ett fönster mot ett lågt tak finns redan en väg. Har det bara ett fönster fem meter över gräsmattan är det där stegen ska ligga, i rummet och inte i förrådet. Ett hus med tre sovrum på övervåningen behöver alltså ofta tre stegar, eller en plan där alla samlas i ett rum. Den planen ska familjen ha pratat igenom i förväg.",
  },
];
