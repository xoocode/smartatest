import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { UTRYMNINGSSTEGE } from "@/lib/test-pages";

/**
 * Fasta utrymningsstegar för fasadmontering. Underlag i
 * .agent/research/utrymningsstege.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, längder, mått, material, angiven maxlast,
 * vad som ingår, artikelnummer och vilken standard eller vilket godkännande
 * butiken eller tillverkaren anger. Allt läst 2026-08-02 på butikens eller
 * tillverkarens egen sida, samt i SINTEF-certifikatet TG 2536 i sin helhet.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte belastat, monterat
 * eller klättrat i någon stege.
 *
 * ## En rad per fabrikat, inte per längd
 *
 * Modum finns i sexton längder, Skeppshultstegen i sex, W.Steps i flera. Om
 * varje längd blev en produkt hade samma stege upptagit halva listan och
 * prisvärdeskriteriet blivit meningslöst. Varje rad prissätts därför på en
 * jämförbar längd runt 3,9 meter, och hela längdserien står i specen och i
 * köpguiden. Beslutat av användaren 2026-08-02.
 *
 * ## Sidans fynd: en av fem har något en köpare kan kontrollera
 *
 * | Produkt | Vad som går att kontrollera |
 * |---|---|
 * | Modum | TG 2536 hos SINTEF, med provlast, användningsområde och utgångsdatum |
 * | Housegard EL39 | EN 131-1:2015 och EN 131-2:2010, båda tillbakadragna enligt SIS |
 * | Skeppshultstegen | ingenting |
 * | W.Steps 400 | ingenting |
 * | W.Steps 320 | ingenting |
 *
 * Andra fyndet är att godkännandet slutar innan byggreglerna gör det.
 * Boverket tillåter en fast stege upp till 8,0 meter. TG 2536 tillåter 5,0
 * utan ryggbygel och 7,5 med. Ryggbygeln är alltså inte ett tillbehör för
 * känslan, den är det som flyttar gränsen.
 *
 * Tredje fyndet är prissättningen. Modum säljs av två svenska butiker med
 * identiska artikelnummer och Stegfabrikens pris ligger 49 procent över
 * Everglows på varje längd. Skeppshultstegen visar samma mönster mellan
 * Bauhaus och Stegfabriken, 41 till 45 procent.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "modum-original",
    name: "Modum Original 3,9 m",
    shortName: "Original 3,9 m",
    brand: "Modum",
    image: productImage(UTRYMNINGSSTEGE.slug, "modum-original"),
    tagline: "Den enda stegen i svensk handel med ett godkännande du kan slå upp.",
    scores: { provning: 5, rackvidd: 4, nedstigning: 5, montering: 4.5, prisvarde: 3 },
    price: 9621,
    merchant: "Everglow",
    merchantUrl: "https://www.everglow.se/product/modum-utrymningsstege",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Enda med ett godkännande",
    pros: [
      "SINTEF Teknisk Godkjenning TG 2536, med provlast 2,6 kN per steg, angivet användningsområde och giltighet till april 2028",
      "Fotsteget är 311 millimeter brett och stegavståndet 300, båda publicerade, vilket ingen annan tillverkare anger",
      "Sexton längder från 0,9 till 5,4 meter i steg om 0,3, så stegen går att beställa till fönstrets faktiska höjd",
      "Certifikatet anger skruvdimension, avstånd mellan infästningar och minsta paneltjocklek, det som faktiskt går sönder",
      "Femton års garanti, brandklass A1 enligt EN 13501-1, och kan lackas i valfri kulör",
    ],
    cons: [
      "9 621 kronor för 3,9 meter, nästan tre gånger Housegards pris för samma räckvidd",
      "Godkännandet gäller bara upp till 5,0 meter utan ryggbygel, trots att stegen säljs i 5,4",
      "Ryggbygeln som höjer gränsen till 7,5 meter saknar publicerat pris hos båda butikerna",
      "Samma artikelnummer kostar 49 procent mer hos Stegfabriken, vilket är lätt att gå på",
    ],
    specs: [
      { label: "Längd i jämförelsen", value: "3,9 m", highlight: true },
      { label: "Godkänd höjd", value: "5,0 m, med ryggbygel 7,5 m", highlight: true },
      { label: "Provlast", value: "2,6 kN per steg", highlight: true },
      { label: "Fotsteg", value: "311 mm brett, 300 mm mellan", highlight: true },
      { label: "Mått infälld", value: "72 × 47 mm", highlight: true },
      { label: "Dokumentation", value: "SINTEF TG 2536, giltig till 2028-04-01" },
      { label: "Längdserie", value: "0,9 till 5,4 m i steg om 0,3" },
      { label: "Garanti", value: "15 år" },
    ],
    verdict:
      "Den här vinner på en sak, och det är den enda saken i kategorin som går att kontrollera utan att äga produkten.\n\nSINTEF Certification har en produktgrupp som heter Redningsstiger. Där ligger fyra godkända stegar i hela registret, och Modum är den enda av dem som säljs i Sverige. Certifikatet är fyra sidor och det står vad man faktiskt vill veta: stegen belastas med 2,6 kN mitt på steget och vid yttre vangen, den är brandklassad A1, den ska sitta minst två meter från underliggande fönster, träskruven ska vara minst sex millimeter och sitta parvis med högst sex decimeter mellan infästningarna, och godkännandet går ut den 1 april 2028. Ingen annan produkt i den här jämförelsen har någon motsvarighet, och ingen svensk jämförelsesajt nämner att ordningen finns.\n\nDen andra styrkan är nedstigningen. Fotsteget är 311 millimeter brett med 300 millimeter mellan stegen, båda publicerade. Skeppshultstegen anger 400 millimeter bredd i utfällt läge men säger inget om fotsteget, och W.Steps namnger sina serier efter stegbredden utan att ange stegavstånd. Att klättra ner i mörker är en fråga om var foten hamnar, och Modum är den enda som svarar på det.\n\nSedan priset. 9 621 kronor för 3,9 meter hos Everglow, mot 3 695 för Housegards EL39 med samma räckvidd. Nästan tre gånger så mycket. Vi har vägt dokumentationen till trettio procent för att det är den enda kontrollerbara skillnaden, men det betyder inte att den skillnaden är värd 5 926 kronor för alla. Bor du i ett hus där stegen ska sitta uppe i tjugo år, monteras i en fasad du inte vill dra ut skruvarna ur två gånger, och där du vill kunna visa försäkringsbolaget ett papper, då är den det. Bor du i ett hus du säljer om fem år är den det förmodligen inte.\n\nDet du ska se upp med är två saker. Godkännandet stannar vid fem meter utan ryggbygel, medan Boverket tillåter åtta för en fast stege. Stegen finns i 5,4 meter, men den längden ligger utanför certifikatets användningsområde om du inte kompletterar med bygeln, och bygeln har inget publicerat pris hos vare sig Everglow eller Stegfabriken. Och samma artikelnummer, 21139, kostar 14 325 kronor hos Stegfabriken mot 9 621 hos Everglow. Det är 4 704 kronor för exakt samma vara.",
  },
  {
    id: "housegard-el39",
    name: "Utfällbar utrymningsstege EL39",
    shortName: "EL39",
    brand: "Housegard",
    image: productImage(UTRYMNINGSSTEGE.slug, "housegard-el39"),
    tagline: "Kostar en tredjedel av de andra, och är den enda med en maxlast.",
    scores: { provning: 1.5, rackvidd: 3.5, nedstigning: 3, montering: 4.5, prisvarde: 5 },
    price: 3695,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandstegar/housegard-brandstege-39-m-p21279",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Bäst köp, med bred marginal",
    pros: [
      "3 695 kronor mot 7 799 till 14 513 för de andra fabrikaten i samma längd",
      "Enda fasta stegen där någon anger en maxlast, 150 kilo och en person i taget",
      "Monteringsmaterial för träfasad ingår, och monteringsmåtten är publicerade i millimeter",
      "Kan förlängas med 90 centimeter i taget för 1 395 kronor per sektion",
      "Fem års garanti, aluminium och rostfritt stål, 47 millimeter bred infälld",
    ],
    cons: [
      "Standarden anges som EN 131-1:2015 och EN 131-2:2010, båda tillbakadragna enligt SIS",
      "Uppgiften finns bara hos Kjell, Housegards egen produktsida nämner ingen standard alls",
      "Ingen uppgift om fotstegets bredd eller stegavståndet, det som avgör nedstigningen",
      "11,5 kilo och bara en längd, så en högre montering kräver att du köper till sektioner",
    ],
    specs: [
      { label: "Längd i jämförelsen", value: "3,86 m", highlight: true },
      { label: "Godkänd höjd", value: "Ej angiven", highlight: true },
      { label: "Angiven maxlast", value: "150 kg, en person i taget", highlight: true },
      { label: "Fotsteg", value: "Ej angivet", highlight: true },
      { label: "Mått infälld", value: "83 × 47 mm", highlight: true },
      { label: "Dokumentation", value: "EN 131-1:2015 och EN 131-2:2010, båda indragna" },
      { label: "Förlängning", value: "90 cm för 1 395 kr per sektion" },
      { label: "Garanti", value: "5 år" },
    ],
    verdict:
      "Den billigaste med väldigt bred marginal, och den enda som svarar på frågan hur mycket stegen bär.\n\n3 695 kronor. Skeppshultstegens motsvarande längd kostar 7 799 hos Bauhaus, Modums 9 621 hos Everglow och W.Steps 400 hela 14 513 hos Stegfabriken för tre decimeter kortare. Det är inte en marginell prisskillnad utan en fråga om huruvida man köper en stege alls, och för de flesta villaägare är det den avgörande frågan.\n\nDen är också den enda fasta stegen där någon skriver ut en maxlast: 150 kilo, en person i taget. Skeppshultstegen och W.Steps anger ingenting alls. Att Housegards tal dessutom är lägre än Modums provlast är ingen svaghet utan tvärtom, det är ett tal som verkar vara satt av någon som räknat.\n\nMonteringen är förvånansvärt väl beskriven för priset. Stegen ska sitta minst sjuttio centimeter ovanför fönsterkarmen, högst trettiofem centimeter från fönstret i sidled, och femtio till hundra centimeter över marken. Housegard skriver också att den bör sitta högre om snö kan hindra utfällningen, vilket är den sortens svenska detalj som brukar saknas. Monteringsmaterial för träfasad ingår i lådan.\n\nSvagheten är dokumentationen, och den är verklig. Kjell anger EN 131-1:2015 och EN 131-2:2010. Båda utgåvorna listar SIS som tillbakadragna: del 1 har gått vidare via +A1:2019 till +A2:2025, del 2 via +A1:2012 och +A2:2017 till +A3:2025. Det är alltså två och tre ändringar efter. Housegards egen produktsida nämner ingen standard över huvud taget, så uppgiften finns hos återförsäljaren men inte hos tillverkaren, vilket är baklänges.\n\nDet som saknas praktiskt är fotstegets bredd och stegavståndet. Kjell anger stegens djup och bredd i infällt läge, 83 respektive 47 millimeter, men inget om vad du sätter foten på. Det är uppgiften du helst vill ha innan stegen sitter uppe.",
  },
  {
    id: "skeppshultstegen-fallbar",
    name: "Utrymningsstege fällbar 3,9 m",
    shortName: "Fällbar 3,9 m",
    brand: "Skeppshultstegen",
    image: productImage(UTRYMNINGSSTEGE.slug, "skeppshultstegen-fallbar"),
    tagline: "Svensktillverkad, sex längder, och inte ett enda tal om hållfasthet.",
    scores: { provning: 1, rackvidd: 4, nedstigning: 3.5, montering: 3, prisvarde: 3.5 },
    price: 7799,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/utrymningsstege-skepphultstegen-aluminium-3-9m",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Längst räckvidd som lagervara",
    pros: [
      "Sex längder från 1,2 till 5,7 meter, med den längsta enskilda stegen av alla",
      "Bygger bara 67 millimeter ut från fasaden infälld, minst av alla fyra fabrikaten",
      "Tillverkad i Sverige av anodiserad aluminium, och går att skarva till önskad längd",
      "Ståplan för 529 kronor och handtag för 708 finns som tillbehör hos samma butik",
    ],
    cons: [
      "Ingen maxlast, ingen provlast, ingen standard och inget godkännande anges av någon butik",
      "Ingen uppgift om fotstegets bredd, bara utfällt yttermått 400 millimeter",
      "Ingen monteringsanvisning i produkttexten, och inget om vilka skruvar som krävs",
      "Samma stege kostar 11 343 kronor hos Stegfabriken, 45 procent mer",
    ],
    specs: [
      { label: "Längd i jämförelsen", value: "3,9 m", highlight: true },
      { label: "Godkänd höjd", value: "Ej angiven", highlight: true },
      { label: "Angiven maxlast", value: "Ej angiven", highlight: true },
      { label: "Fotsteg", value: "Ej angivet, utfällt 400 mm", highlight: true },
      { label: "Mått infälld", value: "67 mm djup", highlight: true },
      { label: "Dokumentation", value: "Ingen" },
      { label: "Längdserie", value: "1,2 till 5,7 m" },
      { label: "Vikt", value: "13,0 kg" },
    ],
    verdict:
      "Svensktillverkad, snyggast på fasaden, och den enda produkten här som är helt tyst om vad den klarar.\n\nStegen är gjord i Skeppshult i Småland av anodiserad aluminium och bygger 67 millimeter ut från väggen i infällt läge, vilket är minst av stegarna. Den fälls ut till fyrtio centimeters bredd med en rödmarkerad sprint, går att skarva till önskad längd, och finns i sex längder upp till 5,7 meter. Det är den längsta enskilda stegen någon säljer som lagervara i Sverige.\n\nSedan tar uppgifterna slut. Bauhaus tekniska information består av fyra rader: material, längd, bredd utfälld, djup ihopfälld. Ingen maxlast. Ingen provlast. Ingen standard. Inget godkännande. Ingen monteringsanvisning i texten och inget om vilken skruv som ska hålla den i väggen. Stegfabriken, som säljer samma artiklar, anger inte heller något. Vi har alltså en fast monterad säkerhetsprodukt för nästan åttatusen kronor där den enda kontrollerbara uppgiften är hur lång den är.\n\nDet är inget påstående om att stegen är svag. Skeppshultstegen har tillverkat stegar sedan lång tid tillbaka och det finns ingenting som tyder på att den skulle vara sämre byggd än Modums. Men vår fråga är inte vad produkten klarar, det kan vi inte veta, utan vad en köpare kan kontrollera före betalningen, och där är svaret ingenting. Modum har ett fyrasidigt certifikat med ett utgångsdatum. Housegard har åtminstone en standardhänvisning, om än till indragna utgåvor. Skeppshultstegen har längden.\n\nEn praktisk sak som lyfter den ändå: tillbehören finns hos samma butik. Ståplan för 529 kronor gör att du kliver ut på något i stället för rakt ner i luften, och handtaget för 708 ger något att hålla i under fönsterkarmen. Ingen av de andra tillverkarna har lika lätt tillgängliga tillbehör i svensk handel.\n\nOch en varning: köp den hos Bauhaus. Stegfabriken tar 11 343 kronor för samma 3,9-metersstege, 3 544 mer för samma vara.",
  },
  {
    id: "wsteps-320",
    name: "Utrymningsstege 320, 3,6 m",
    shortName: "320, 3,6 m",
    brand: "W.Steps",
    image: productImage(UTRYMNINGSSTEGE.slug, "wsteps-320"),
    tagline: "Väggfästen och sprint ingår, men uppgifterna slutar där.",
    scores: { provning: 1, rackvidd: 3, nedstigning: 3.5, montering: 3.5, prisvarde: 2 },
    price: 11378,
    merchant: "Stegfabriken",
    merchantUrl:
      "https://www.stegfabriken.se/stegar/brand-utrymning/utrymningsstegar/wibe-redningsstige-320",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bredden står i produktnamnet",
    pros: [
      "Fotstegets bredd står i produktnamnet, 320 millimeter, vilket bara Modum annars anger",
      "Väggfästen och utlösningssprint ingår, och stegen går att skarva",
      "Anodiserad aluminium som inte svärtar av sig på händer eller kläder",
      "Finns i tre längder: 1,5, 2,1 och 3,6 meter",
    ],
    cons: [
      "11 378 kronor för 3,6 meter, tre gånger Housegards pris för kortare räckvidd",
      "Ingen maxlast, ingen standard och inget godkännande anges",
      "Säljs bara hos en butik, så priset går inte att jämföra någonstans",
      "Tre längder, och det längsta hoppet går från 2,1 till 3,6 meter",
    ],
    specs: [
      { label: "Längd i jämförelsen", value: "3,6 m", highlight: true },
      { label: "Godkänd höjd", value: "Ej angiven", highlight: true },
      { label: "Angiven maxlast", value: "Ej angiven", highlight: true },
      { label: "Fotsteg", value: "320 mm", highlight: true },
      { label: "Mått infälld", value: "Ej angivet", highlight: true },
      { label: "Dokumentation", value: "Ingen" },
      { label: "Längdserie", value: "1,5, 2,1 och 3,6 m" },
      { label: "Ingår", value: "Väggfästen och sprint" },
    ],
    verdict:
      "Gör en sak rätt som nästan alla andra missar, och tar mycket betalt för det.\n\nSerien heter 320 därför att fotsteget är 320 millimeter brett, och det är skälet till att den finns bredvid systerserien 400. W.Steps är alltså tillsammans med Modum de enda som anser att fotstegets bredd är en produktegenskap värd att sätta i namnet. Det är rätt tänkt, eftersom nedklättring i mörker med strumplästen fot är vad stegen finns till för.\n\nVäggfästen och utlösningssprint ingår, stegen går att skarva, och aluminiumet är anodiserat så att det inte svärtar av sig. Det är samma grundkonstruktion som Skeppshultstegen och Modum: en list på väggen där stegpinnarna ligger dolda inne i sidoprofilerna tills sprinten dras.\n\nProblemet är att uppgifterna slutar där. Ingen maxlast, ingen provlast, ingen standard, inget godkännande, inget infällt djupmått. Och priset är 11 378 kronor för 3,6 meter. Housegard tar 3 695 för 3,86, tre decimeter mer räckvidd för en tredjedel av pengarna. Modum tar 9 621 för 3,9 meter och har ett certifikat att visa upp.\n\nDen säljs dessutom bara hos Stegfabriken, som vi vet lägger fyrtio till femtio procent på Modums och Skeppshultstegens priser jämfört med Everglow och Bauhaus. Vad W.Steps kostar hos någon annan går inte att ta reda på, eftersom det inte finns någon annan.\n\nTre längder är också magert när Modum har sexton. Hoppet från 2,1 till 3,6 meter betyder att den som har ett fönster på 2,8 meter antingen köper för kort eller betalar för åtta decimeter i onödan.\n\nSist alltså, och det ska sägas rakt: den är sist för att den är tre tusen kronor billigare än sin egen systerserie utan att vara sämre byggd, men den korta längdserien och det smalare fotsteget tar mer än vad prisskillnaden ger tillbaka. Skulle 320-serien få fler längder skulle den byta plats med 400.",
  },
  {
    id: "wsteps-400",
    name: "Utrymningsstege 400, 3,6 m",
    shortName: "400, 3,6 m",
    brand: "W.Steps",
    image: productImage(UTRYMNINGSSTEGE.slug, "wsteps-400"),
    tagline: "Bredaste fotsteget av stegarna, till det högsta priset.",
    scores: { provning: 1, rackvidd: 3.5, nedstigning: 4, montering: 3.5, prisvarde: 1.5 },
    price: 14513,
    merchant: "Stegfabriken",
    merchantUrl:
      "https://www.stegfabriken.se/stegar/brand-utrymning/utrymningsstegar/wibe-utrymningsstege-400",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bredast fotsteg, dyrast av alla",
    pros: [
      "400 millimeter brett fotsteg, bredast av alla fem och 89 mer än Modum",
      "Fem längder upp till 6,0 meter, längst av alla utom Skeppshultstegens 5,7",
      '"Rejäla profiler" enligt butiken, med kraftigare sidoprofiler än systerserien 320',
      "Väggfästen och sprint ingår, och stegen går att skarva",
    ],
    cons: [
      "14 513 kronor för 3,6 meter, dyrast av stegarna och fyra gånger Housegard",
      "Ingen maxlast, ingen standard och inget godkännande anges",
      "Sexmetersvarianten kostar 20 735 kronor, vilket är utanför vad den här sidan handlar om",
      "Säljs bara hos en butik, så priset går inte att kontrollera mot någon annan",
    ],
    specs: [
      { label: "Längd i jämförelsen", value: "3,6 m", highlight: true },
      { label: "Godkänd höjd", value: "Ej angiven", highlight: true },
      { label: "Angiven maxlast", value: "Ej angiven", highlight: true },
      { label: "Fotsteg", value: "400 mm", highlight: true },
      { label: "Mått infälld", value: "Ej angivet", highlight: true },
      { label: "Dokumentation", value: "Ingen" },
      { label: "Längdserie", value: "1,5 till 6,0 m" },
      { label: "Ingår", value: "Väggfästen och sprint" },
    ],
    verdict:
      "Bredaste fotsteget av alla fem, och det priset ska ställas mot vad det köper.\n\n400 millimeter är 89 millimeter bredare än Modums 311 och 80 bredare än systerserien 320. Skillnaden känns i foten, särskilt för den som klättrar ner i strumplästen och inte har någon vana. Butiken beskriver också profilerna som kraftigare än 320-seriens. Det låter troligt, men det finns inget mått som styrker det och därför väger det ingenting hos oss.\n\nFem längder upp till sex meter är också den bredaste serien efter Modum, och den enda som når över Boverkets femmetersgräns i ett enda stycke.\n\nSedan kommer priset. 14 513 kronor för 3,6 meter. Det är 3 135 mer än systerserien 320 för exakt samma längd, närmare fyra tusenlappar för åtta centimeter fotsteg. Det är också nästan fyra gånger vad Housegards EL39 kostar för tre decimeter mer räckvidd, och 4 892 mer än Modums 3,9-metersstege som har ett godkännande att visa upp. Sexmetersvarianten går på 20 735 kronor.\n\nOch precis som systerserien: ingen maxlast, ingen provlast, ingen standard, inget godkännande. En stege för fjortontusen kronor där det enda du kan kontrollera är hur bred stegpinnen är och hur lång stegen är.\n\nDen hamnar näst sist trots att den inte är dålig: prisvärdet är det svagaste av stegarna samtidigt som dokumentationen är det. Det bredaste fotsteget är en verklig fördel, och det är den enda fördel som går att belägga. Att den ändå slår systerserien 320 beror på just det: en längdserie som når två och en halv meter längre och ett fotsteg åtta centimeter bredare väger tyngre än tre tusen kronor i lägre pris, när ingen av dem kan visa upp något papper.",
  },
];

export const UTRYMNINGSSTEGE_PRODUCTS: Product[] = resolveProducts(UTRYMNINGSSTEGE, SEEDS);

/**
 * Produkter vi tittat på och valt bort. Skälet står utskrivet, eftersom en
 * bortvald produkt utan motivering ser ut som ett förbiseende.
 */
export const UTRYMNINGSSTEGE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Hard Head",
    name: "Utfällbar brandstege 42,5 × 120 cm",
    reason:
      "Bara 1,2 meter hög med tre stegpinnar, och Julas egen text säger att den passar boende på första våningen. En stege från ett fönster på bottenvåningen är ingen utrymningsväg i byggreglernas mening, och de 1,2 meterna löser inte det problem den här sidan handlar om. Monteringsskruv säljs dessutom separat. Maxlasten anges till 150 kilo och vikten till 3,6 kilo.",
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/hem-och-hushall/brand-och-sakerhet/brand/brandstegar/utfallbar-brandstege-008413/",
  },
  {
    brand: "Skeppshultstegen",
    name: "Repstege 4,5 och 7,5 m",
    reason:
      "Hängande repstegar, inte fasta. Bauhaus säljer dem i samma kategori som de fasta stegarna, vilket är en av anledningarna till att de två produkttyperna blandas ihop i svensk handel. De hör hemma på vår sida om brandstegar. 1 327 respektive 2 249 kronor, 80 millimeters distans från fasaden och krokar för karmar upp till 300 millimeter.",
    approxPrice: 1327,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/brandstege-skepphultstegen-plast-4-5m",
  },
  {
    brand: "Modum",
    name: "Modum Original hos Stegfabriken",
    reason:
      "Samma stege och samma artikelnummer som vinnaren, men 49 procent dyrare på varje längd. 3,9 meter kostar 14 325 kronor i stället för 9 621, en skillnad på 4 704 kronor för samma vara. Vi rankar inte samma produkt två gånger, men den finns med här så att den som hittat den via en sökning ser vad den kostar någon annanstans.",
    approxPrice: 14325,
    merchant: "Stegfabriken",
    merchantUrl:
      "https://www.stegfabriken.se/stegar/brand-utrymning/utrymningsstegar/modum-raddningsstege",
  },
  {
    brand: "Housegard",
    name: "Förlängningsdel till EL39, 90 cm",
    reason:
      "Tillbehör och inte en egen stege. 1 395 kronor per sektion om 90 centimeter, fyra kilo, med väggbeslag, skarvdelar och skruv för träfasad. Värd att känna till eftersom EL39 bara finns i en längd: två sektioner tar den från 3,86 till 5,66 meter för 2 790 kronor extra, vilket fortfarande är billigare än varje konkurrent i grundutförande.",
    approxPrice: 1395,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandstegar/housegard-forlangningsdel-till-brandstege-90-cm-90-cm-p21280",
  },
  {
    brand: "Skeppshultstegen",
    name: "Ståplan och handtag",
    reason:
      "Tillbehör till den fällbara stegen. Ståplanet på 100 × 300 millimeter kostar 529 kronor och ger något att kliva ut på i stället för rakt ner i luften, handtaget 708 kronor något att hålla i under fönsterkarmen. Nämns här eftersom de påverkar hur en utrymning faktiskt går till mer än de flesta skillnader mellan själva stegarna.",
    approxPrice: 529,
    merchant: "Bauhaus",
    merchantUrl:
      "https://www.bauhaus.se/staplan-till-utrymningsstege-skepphultstegen-fallbar-100x300mm",
  },
  {
    brand: "Modum",
    name: "Skyddsbåge till Modum",
    reason:
      "Ryggbygeln är det som flyttar godkänd utrymningshöjd från 5,0 till 7,5 meter enligt TG 2536, och den består enligt certifikatet av en bygel monterad mellan två stegar. Vi rankar den inte, eftersom Everglow listar femton varianter utan publicerat pris. Den som ska utrymma från ett fönster högre än fem meter behöver den och får begära offert.",
    merchant: "Everglow",
    merchantUrl: "https://www.everglow.se/product/skyddsbage-modum",
  },
];

export const UTRYMNINGSSTEGE_FAQ = [
  {
    question: "Vilken utrymningsstege är bäst 2026?",
    answer:
      "Modum Original, om du vill kunna kontrollera vad du köper. Den är den enda stegen i svensk handel med ett tredjepartsgodkännande, SINTEF Teknisk Godkjenning TG 2536, som anger provlast 2,6 kN per steg, hur högt fönster stegen får användas till och ett utgångsdatum. 3,9 meter kostar 9 621 kronor hos Everglow. Är priset avgörande är Housegard EL39 hos Kjell för 3 695 kronor bäst köp: den är den enda andra som anger en maxlast, 150 kilo, och monteringsmaterial för träfasad ingår.",
  },
  {
    question: "Måste jag ha en fast monterad utrymningsstege?",
    answer:
      "Reglerna gäller hur byggnaden är utformad, inte vad du äger. Men Boverkets byggregler accepterar utrymning genom fönster om underkanten sitter högst 5,0 meter över marken, eller högst 8,0 meter om det finns en fast monterad stege. Under fem meter räknar reglerna med att du hoppar, och Boverket skriver själva att det innebär att man riskerar att skadas. En hängande stege höjer aldrig gränsen, hur lång den än är, eftersom den inte är fast monterad.",
  },
  {
    question: "Hur högt får en utrymningsstege användas?",
    answer:
      "Det beror på vem du frågar, och de två svaren går inte ihop. Boverket tillåter en fast monterad stege upp till 8,0 meter. Modums eget godkännande, TG 2536, anger 5,0 meter utan ryggbygel och 7,5 meter med, båda mätta från fönstrets underkant. Modum är den enda tillverkaren som alls anger en högsta användningshöjd. Skeppshultstegen säljer en stege på 5,7 meter och W.Steps en på 6,0 utan att någon av dem anger någon gräns.",
  },
  {
    question: "Vad kostar en fast utrymningsstege?",
    answer:
      "3 695 till 14 513 kronor för de fem fabrikaten i ungefär 3,9 meters längd, nästan fyra gånger mellan billigast och dyrast för produkter som gör samma sak. Housegard EL39 kostar 3 695, Skeppshultstegen 7 799, Modum 9 621, W.Steps 320 elva tusen och W.Steps 400 fjortontusen. Priset följer inte dokumentationen: den dyraste anger varken maxlast eller standard, medan den billigaste anger båda.",
  },
  {
    question: "Var på fasaden ska stegen sitta?",
    answer:
      "Under det fönster som ska användas, inte vid det praktiskaste stället att skruva. Det låter självklart och är det vanligaste felet: stegen hamnar vid gaveln där väggen är fri, och sedan visar det sig att fönstret där är ett badrumsfönster som inte går att klättra ut genom. Gå därför baklänges: bestäm först vilket rum som saknar en andra utrymningsväg, sedan vilket fönster i det rummet som går att öppna helt, och först då var stegen ska sitta. Kontrollera också marken under. En stege som slutar ovanför en stensättning, ett staket eller en buske av måbär är en stege du inte vill klättra ner för barfota.",
  },
  {
    question: "Kan en fast utrymningsstege användas för inbrott?",
    answer:
      "Det är en rimlig oro och den har ett enkelt svar: välj en modell där de nedersta stegpinnarna sitter högt eller går att låsa. Flera tillverkare gör den nedersta sektionen infällbar eller levererar en låsbar lucka just för det. En stege vars första pinne sitter 2,5 meter över marken är fullt användbar för den som klättrar ner men obekväm att klättra upp för. Väg det mot vad du faktiskt skyddar dig mot: en stege på en villafasad i ett bostadsområde är sällan det som avgör om någon tar sig in, och ett öppet fönster på övervåningen är ett större problem.",
  },
  {
    question: "Måste utrymningsstegen underhållas?",
    answer:
      "Ja, och det är mest ett par minuter om året. Titta efter rost i infästningarna och i svetsarna, kontrollera att expanderbultarna sitter fast och att träfasaden bakom inte har mjuknat, och skaka stegen ordentligt. Sitter den i en putsad fasad är det putsen och inte stegen som brukar ge vika först. Har stegen rörliga delar, som en infällbar nedre sektion, ska den provköras så att den inte kärvat fast av is eller färg. Gör det på våren när snön gått. En stege som suttit orörd i femton år kan se perfekt ut och ändå sitta i en vägg som inte längre håller.",
  },
  {
    question: "Vad är skillnaden mellan en utrymningsstege och en brandtrappa?",
    answer:
      "Skalan och regelverket. En utrymningsstege är en produkt du köper och skruvar upp på en villafasad för att kunna ta dig ner från ett fönster. En brandtrappa är en byggnadsdel, ofta projekterad av en konstruktör och besiktigad, och den krävs för vissa flerbostadshus och verksamhetslokaler enligt Boverkets byggregler. Bor du i villa är det stegen som är din fråga, och det finns inget lagkrav på den. Bor du i ett flerbostadshus är utrymningsvägarna fastighetsägarens ansvar, och en egen stege monterad i en gemensam fasad kräver dessutom föreningens eller värdens tillstånd.",
  },
];
