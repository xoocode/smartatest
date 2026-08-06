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
 * stegbredd, stegavstånd, vad som ingår, artikelnummer och vilken standard
 * eller vilket godkännande tillverkaren anger. Priser lästa 2026-08-02.
 * Tillverkarnas egna dokument lästa 2026-08-06, se listan nedan.
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
 * ## ⚠️ Gap-passet 2026-08-06: fem av sex "ej angivna" var fel
 *
 * Sidan byggdes på butikstexter. Fyra av fem tillverkare publicerar ett eget
 * produktblad eller en monteringsanvisning som butiken inte återger, och de
 * dokumenten kullkastade sex påståenden:
 *
 * | Stod på sidan | Vad tillverkaren anger | Källa |
 * |---|---|---|
 * | Housegard: fotsteg ej angivet | **240 mm** | EL39 bruksanvisning, ver 250320 |
 * | Housegard: stegavstånd ej angivet | **300 mm** | samma |
 * | Housegard: EN 131-1:2015, EN 131-2:2010, indragna | **+A1:2019 och +A2:2017** | samma |
 * | Skeppshultstegen: inget om stegavstånd | **300 mm centrum till centrum** | monteringsanvisning sid 1 |
 * | Skeppshultstegen: ingen monteringsanvisning, inget om skruv | **7 väggmaterial med namngivet fäste och kraft per infästning** | monteringsanvisning sid 4 |
 * | W.Steps: inget infällt mått | **väggfäste 6 mm (400) och 7 mm (320)** | wsteps.se |
 *
 * Stegavståndet är **300 mm på samtliga fem fabrikat**. Det skiljer alltså
 * ingenting och ligger därför inte i jämförelsetabellen. Det som skiljer är
 * stegbredden, och den spänner från 240 till 400 mm.
 *
 * ## Vad som faktiskt är kontrollerat om godkännandena
 *
 * Frånvaron av godkännande är belagd positivt, inte antagen:
 *
 * - **SINTEF:s produktgrupp Redningsstiger** innehåller fyra godkända stegar.
 *   Modum är den enda som säljs i Sverige. Registret är uppräknat.
 * - **W.Steps egna RISE-intyg är lästa i sin helhet.** P-märket C900764 gäller
 *   glidskydd för lösa stegar, fyra artikelnummer. Typkontrollintyg 102102
 *   listar bärbara stegar och arbetsbockar över fyra sidor. Utrymningsstegarnas
 *   artikelnummer, 727xxx, 729xxx och 741xxx, finns i ingetdera.
 * - **Skeppshultstegens sida om säkra produkter** beskriver typkontroll enligt
 *   AFS 2004:3 och SS 2091, alltså föreskriften för bärbara stegar som
 *   arbetsutrustning. Den fasta utrymningsstegen omfattas inte.
 *
 * ## Fyndet som står kvar: prissättningen
 *
 * Modum säljs av två svenska butiker med identiska artikelnummer och
 * Stegfabrikens pris ligger 49 procent över Everglows på varje längd.
 * Skeppshultstegen visar samma mönster mellan Bauhaus och Stegfabriken,
 * 41 till 45 procent.
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
    tagline: "Beställs i den längd ditt fönster faktiskt sitter på.",
    /* Poängen omräknade 2026-08-06 mot den nya skalan. Se lib/corrections.ts. */
    scores: { provning: 5, rackvidd: 4.5, nedstigning: 4, montering: 4, prisvarde: 3 },
    price: 9621,
    merchant: "Everglow",
    merchantUrl: "https://www.everglow.se/product/modum-utrymningsstege",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för exakt rätt längd",
    pros: [
      "Provad till 2,6 kN per steg, vilket enligt certifikatet motsvarar två personer samtidigt i varje stegenhet",
      "Sexton längder från 0,9 till 5,4 meter i steg om 0,3, så stegen slutar där fönstret börjar utan att kapas",
      "Godkänd för utrymning från fönster upp till 5,0 meter, och 7,5 meter med ryggbygel",
      "311 millimeter brett steg och 15 års garanti, längst garanti av stegarna",
      "Bygger 72 millimeter ut från fasaden och kan lackas i valfri kulör",
    ],
    cons: [
      "9 621 kronor för 3,9 meter, nästan tre gånger Housegards pris för samma räckvidd",
      "Godkännandet förutsätter träpanel på minst 19 millimeter, så tegel och puts kräver Skeppshultstegen i stället",
      "Ryggbygeln som tar stegen till 7,5 meter säljs mot offert, så totalpriset går inte att räkna ut i förväg",
      "Samma artikelnummer kostar 14 325 kronor hos Stegfabriken, 4 704 kronor mer för samma kartong",
    ],
    specs: [
      { label: "Längd i jämförelsen", value: "3,9 m", highlight: true },
      { label: "Stegbredd", value: "311 mm", highlight: true },
      { label: "Längdserie", value: "0,9–5,4 m, 16 längder", highlight: true },
      { label: "Djup infälld", value: "72 mm", highlight: true },
      { label: "Godkännande", value: "SINTEF TG 2536, till 2028", highlight: true },
      { label: "Stegavstånd", value: "300 mm" },
      { label: "Provlast", value: "2,6 kN per steg" },
      { label: "Godkänd höjd", value: "5,0 m, med ryggbygel 7,5 m" },
      { label: "Väggmaterial", value: "Träpanel från 19 mm" },
      { label: "Garanti", value: "15 år" },
    ],
    verdict:
      "Modum Original är den enda stegen här som någon utomstående har provat och godkänt för utrymning, och 3,9 meter kostar 9 621 kronor hos Everglow.\n\n**Provlasten är 2,6 kN per steg, vilket certifikatet översätter till två personer samtidigt i varje stegenhet.** Det är den enda siffran i kategorin som kommer från någon annan än den som säljer stegen. Godkännandet räcker till fönster 5,0 meter över marken, och med ryggbygel 7,5 meter. Sexton längder från 0,9 till 5,4 meter i steg om 3 decimeter betyder dessutom att du beställer den längd ditt fönster sitter på i stället för att kapa eller leva med tre decimeter för mycket. Steget är 311 millimeter brett, och 15 års garanti är dubbelt så lång som någon annan lämnar.\n\nBegränsningen är väggen. Godkännandet gäller infästning med träskruv på minst 6 millimeter i panel på minst 19 millimeter, alltså en träfasad. Sitter fönstret i tegel, puts eller lättbetong faller Modum bort och Skeppshultstegen är stegen som täcker de väggarna. Ryggbygeln, som är det som tar stegen förbi 5 meter, säljs mot offert, så den som har ett fönster 6 meter upp får ringa innan totalpriset går att räkna ut.\n\nHar du träfasad och ska ha stegen kvar i tjugo år är det här stegen att köpa. Ska du sätta den i tegel tar du Skeppshultstegen, och räcker 3,86 meter gör Housegard EL39 samma jobb för 5 926 kronor mindre. Beställ hos Everglow oavsett vad: Stegfabriken tar 14 325 kronor för exakt samma artikelnummer.",
  },
  {
    id: "housegard-el39",
    name: "Utfällbar utrymningsstege EL39",
    shortName: "EL39",
    brand: "Housegard",
    image: productImage(UTRYMNINGSSTEGE.slug, "housegard-el39"),
    tagline: "Klarar 150 kilo och kostar mindre än halva närmaste stege.",
    scores: { provning: 2.5, rackvidd: 3, nedstigning: 3, montering: 4.5, prisvarde: 5 },
    price: 3695,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandstegar/housegard-brandstege-39-m-p21279",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Bäst köp för en normal andravåning",
    pros: [
      "3 695 kronor mot 7 799 till 14 513 för de andra fabrikaten i samma längd",
      "Bär 150 kilo och en person i taget enligt tillverkaren, provad mot EN 131-1 och EN 131-2",
      "Hela monteringssatsen för träfasad ligger i lådan: 8 väggfästen, 6 skarvbleck och samtliga skruvar",
      "Halkskyddade steg, det enda fabrikatet som anger något om greppet",
      "Förlängs 90 centimeter i taget för 1 395 kronor per sektion, så 5,66 meter kostar 6 485 kronor totalt",
    ],
    cons: [
      "240 millimeter brett steg, 71 millimeter smalare än Modum och 160 smalare än W.Steps 400",
      "Finns bara i 3,86 meter, så allt därutöver kräver att du köper till sektioner",
      "Expanderskruv för tegel och lecaförankring säljs separat, till skillnad från träskruven",
      "11,5 kilo och tre sektioner att skruva ihop på golvet innan något kommer upp på väggen",
    ],
    specs: [
      { label: "Längd i jämförelsen", value: "3,86 m", highlight: true },
      { label: "Stegbredd", value: "240 mm", highlight: true },
      { label: "Längdserie", value: "3,86 m, förlängs 0,9 m i taget", highlight: true },
      { label: "Djup infälld", value: "83 mm", highlight: true },
      { label: "Godkännande", value: "Tillverkarens EN 131-deklaration", highlight: true },
      { label: "Stegavstånd", value: "300 mm" },
      { label: "Angiven maxlast", value: "150 kg, en person i taget" },
      { label: "Väggmaterial", value: "Trä, tegel, leca" },
      { label: "Ingår", value: "Väggfästen, skarvbleck och träskruv" },
      { label: "Garanti", value: "5 år" },
    ],
    verdict:
      "Housegard EL39 kostar 3 695 kronor och gör i allt väsentligt samma jobb som stegar för tre gånger så mycket.\n\n**Tillverkaren skriver ut att stegen bär 150 kilo och en person i taget, och att den är provad mot EN 131-1 och EN 131-2.** Det är ingen tredjepartsprövning, men det är ett åtagande med ett tal i, och det är mer än Skeppshultstegen och W.Steps lämnar. Lådan innehåller dessutom allt som behövs för en träfasad: 8 väggfästen, 6 skarvbleck och samtliga skruvar. Konkurrenterna skickar med fästen men låter dig själv skaffa bultarna. Stegen ska sitta minst 70 centimeter ovanför fönsterkarmen, högst 35 centimeter ut i sidled och 50 till 100 centimeter över marken, och Housegard lägger till att den bör sitta högre där snö kan hindra utfällningen.\n\nSteget är 240 millimeter brett. Det är smalast av alla fem och 71 millimeter smalare än Modums, vilket märks för den som klättrar ner i strumplästen med ett barn på armen. Halkskyddet på stegen väger upp något, men foten får mindre att stå på. Och 3,86 meter är allt du får i grundutförandet, så ett fönster 5 meter upp kräver två förlängningssektioner för 2 790 kronor extra.\n\nFör en normal andravåning i ett trähus är det här köpet. Mellanskillnaden mot Modum är 5 926 kronor, alltså en brandvarnare i varje rum, en sexkilos brandsläckare och en brandfilt med pengar över. Det enda som talar emot är de 240 millimetrarna under foten.",
  },
  {
    id: "skeppshultstegen-fallbar",
    name: "Utrymningsstege fällbar 3,9 m",
    shortName: "Fällbar 3,9 m",
    brand: "Skeppshultstegen",
    image: productImage(UTRYMNINGSSTEGE.slug, "skeppshultstegen-fallbar"),
    tagline: "Sitter lika säkert i tegel och lättbetong som i träpanel.",
    scores: { provning: 1, rackvidd: 4.5, nedstigning: 3.5, montering: 5, prisvarde: 3.5 },
    price: 7799,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/utrymningsstege-skepphultstegen-aluminium-3-9m",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för tegel, betong och puts",
    pros: [
      "Sju väggmaterial med namngivet fäste: trä, stål, betong, massivtegel, håltegel, lättbetong och lättklinker",
      "Konsoler på 200, 400 och 600 millimeter och distanser från 25 till 110 gör att den går upp på ojämna fasader",
      "Sex längder från 1,2 till 5,7 meter, och den längsta enskilda stegen av alla",
      "Öppningsbar skarv gör att samma stege kan utrymma från två våningar",
      "Bygger 67 millimeter ut från fasaden, minst av stegarna, och tillverkas i Skeppshult",
    ],
    cons: [
      "7 799 kronor är mer än dubbelt Housegards pris för samma längd, och 4 104 kronor räcker långt i brandskydd",
      "Skruv och bult ingår inte, utan väljs efter vägg och köps separat",
      "Ståplan för 529 kronor och handtag för 708 är det som gör utstigningen bekväm, och båda kostar extra",
      "Samma stege kostar 11 343 kronor hos Stegfabriken, 3 544 kronor mer",
    ],
    specs: [
      { label: "Längd i jämförelsen", value: "3,9 m", highlight: true },
      { label: "Stegbredd", value: "–", highlight: true },
      { label: "Längdserie", value: "1,2–5,7 m, 6 längder, skarvbar", highlight: true },
      { label: "Djup infälld", value: "67 mm", highlight: true },
      { label: "Godkännande", value: "Inget", highlight: true },
      { label: "Stegavstånd", value: "300 mm" },
      { label: "Bredd utfälld", value: "430 mm" },
      { label: "Väggmaterial", value: "Sju, från trä till lättklinker" },
      { label: "Infästningar", value: "Parvis, högst 1,5 m mellan" },
      { label: "Vikt", value: "11,8 kg" },
    ],
    verdict:
      "Skeppshultstegen fällbar är stegen för hus som inte är av trä, och 3,9 meter kostar 7 799 kronor hos Bauhaus.\n\n**Tillverkaren anger fäste och kraft för sju olika väggmaterial: trä, stål, betong, massivtegel, håltegel, lättbetong och lättklinker.** Ingen annan stege i jämförelsen täcker mer än tre. Till det finns konsoler på 200, 400 och 600 millimeter och distanser från 25 till 110, alltså det som krävs när fasaden har en list, en utstickande sockel eller en puts som inte är plan. Fästhålen sitter förborrade parvis med 1,45 meter mellan sig. Sex längder upp till 5,7 meter täcker högre fönster än någon annan enskild stege, och den öppningsbara skarven gör att en och samma stege kan användas från två våningar.\n\nInfälld syns den som en 67 millimeter smal list, smalast av alla fem, och den är tillverkad i Skeppshult av anodiserad aluminium.\n\nDen är inte provad av någon tredje part för utrymning, vilket Modum är. Skeppshultstegen har byggt stegar i Småland i generationer och det finns ingenting som tyder på att den skulle vara svagare byggd, men du köper den på tillverkarens ord och inte på ett intyg. Priset är den andra invändningen: 7 799 kronor är mer än dubbelt Housegards, och skruven ingår inte heller.\n\nHar du tegel, puts, betong eller lättbetong är valet redan gjort, för då är det här den enda stegen som tillverkaren själv anvisar ett fäste till. Har du träfasad tar du Modum för godkännandet eller Housegard för priset.",
  },
  {
    id: "wsteps-400",
    name: "Utrymningsstege 400, 3,6 m",
    shortName: "400, 3,6 m",
    brand: "W.Steps",
    image: productImage(UTRYMNINGSSTEGE.slug, "wsteps-400"),
    tagline: "Bredaste steget att sätta foten på när du klättrar ner.",
    scores: { provning: 1, rackvidd: 5, nedstigning: 5, montering: 2.5, prisvarde: 1.5 },
    price: 14513,
    merchant: "Stegfabriken",
    merchantUrl:
      "https://www.stegfabriken.se/stegar/brand-utrymning/utrymningsstegar/wibe-utrymningsstege-400",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för utrymning från flera våningar",
    pros: [
      "400 millimeter brett steg, 89 mer än Modum och 160 mer än Housegard",
      "Fem längder upp till 6,0 meter i ett stycke, och skarvbar till 18 meter",
      "Våningsskarv gör att stegen kan öppnas på flera ställen samtidigt, alltså en utrymningsväg per våning",
      "Teleskopfäste tar stegen 80 till 125 millimeter ut från väggen där fasaden inte är plan",
      "Väggfästen och utlösningssprint ingår, och fästet bygger bara 6 millimeter",
    ],
    cons: [
      "14 513 kronor för 3,6 meter, dyrast av stegarna och nästan fyra gånger Housegard",
      "Inga bultar medföljer och tillverkaren anger inget väggmaterial, utan hänvisar till fackhandeln",
      "Du kapar stegen och borrar infästningshålen själv, till skillnad från de förborrade konkurrenterna",
      "Säljs bara hos en butik, och just den butiken tar 41 till 49 procent mer än andra för de fabrikat som går att jämföra",
    ],
    specs: [
      { label: "Längd i jämförelsen", value: "3,6 m", highlight: true },
      { label: "Stegbredd", value: "400 mm", highlight: true },
      { label: "Längdserie", value: "1,5–6,0 m, 5 längder, skarvbar till 18 m", highlight: true },
      { label: "Djup infälld", value: "–", highlight: true },
      { label: "Godkännande", value: "Inget", highlight: true },
      { label: "Stegavstånd", value: "300 mm" },
      { label: "Väggfäste", value: "6 mm ut från väggen" },
      { label: "Vikt", value: "15 kg" },
      { label: "Ingår", value: "Väggfästen och sprint, ej bult" },
    ],
    verdict:
      "W.Steps 400 har det bredaste steget i jämförelsen och når högst av alla, och 3,6 meter kostar 14 513 kronor hos Stegfabriken.\n\n**400 millimeter är 89 millimeter bredare än Modums steg och 160 bredare än Housegards.** Det är hela skillnaden mellan att sätta halva foten och hela foten på pinnen, och det räknas för den som klättrar ner barfota, i mörker, med någon annan framför sig. Stegen finns i fem längder upp till 6,0 meter i ett stycke och kan skarvas till 18. Våningsskarven är det som gör den till något annat än en lång stege: den låter stegen öppnas på flera ställen samtidigt, så ett hus med tre våningar får en utrymningsväg per våning i stället för en enda uppifrån.\n\nTillverkaren beskriver 400-serien som modellen för kommersiella fastigheter, och det är precis vad längderna och våningsskarven är till för.\n\nMonteringen lämnas åt dig. Inga bultar följer med, tillverkaren anger inget väggmaterial utan hänvisar till fackhandeln, och du kapar stegen och borrar infästningshålen själv. Skeppshultstegen levererar sju väggmaterial med namngivet fäste och Housegard hela satsen för träfasad. Här får du en stege och ett väggfäste.\n\nÄr det ett flerbostadshus eller ett hus med tre våningar som ska ha en utrymningsväg per plan är den här värd pengarna. Ska en villaägare ha en stege under ett fönster är 14 513 kronor för 3,6 meter fel affär, och Housegard EL39 tar dig lika långt ner för 3 695.",
  },
  {
    id: "wsteps-320",
    name: "Utrymningsstege 320, 3,6 m",
    shortName: "320, 3,6 m",
    brand: "W.Steps",
    image: productImage(UTRYMNINGSSTEGE.slug, "wsteps-320"),
    tagline: "Smal nog att sitta där en bredare stege inte får plats.",
    scores: { provning: 1, rackvidd: 3, nedstigning: 4, montering: 2.5, prisvarde: 2 },
    price: 11378,
    merchant: "Stegfabriken",
    merchantUrl:
      "https://www.stegfabriken.se/stegar/brand-utrymning/utrymningsstegar/wibe-redningsstige-320",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för smala fasadpartier",
    pros: [
      "320 millimeter brett steg, näst bredast och 9 millimeter mer än Modum",
      "Tillverkaren kallar den villastege och pekar ut den som modellen för privata hus",
      "Skarvbar till 7,2 meter, alltså mer än dubbla den längsta enskilda längden",
      "Väggfästen och utlösningssprint ingår, och teleskopfäste finns för ojämna fasader",
      "Anodiserad aluminium som inte svärtar av sig på händer eller kläder",
    ],
    cons: [
      "11 378 kronor för 3,6 meter, tre gånger Housegards pris för tre decimeter kortare stege",
      "Tre längder, och hoppet från 2,1 till 3,6 meter lämnar ingenting däremellan",
      "Inga bultar medföljer och inget väggmaterial anges, så infästningen blir ett eget projekt",
      "Säljs bara hos Stegfabriken, så priset går inte att pressa genom att byta butik",
    ],
    specs: [
      { label: "Längd i jämförelsen", value: "3,6 m", highlight: true },
      { label: "Stegbredd", value: "320 mm", highlight: true },
      { label: "Längdserie", value: "1,5–3,6 m, 3 längder, skarvbar till 7,2 m", highlight: true },
      { label: "Djup infälld", value: "–", highlight: true },
      { label: "Godkännande", value: "Inget", highlight: true },
      { label: "Stegavstånd", value: "300 mm" },
      { label: "Väggfäste", value: "7 mm ut från väggen" },
      { label: "Vikt", value: "10 kg" },
      { label: "Ingår", value: "Väggfästen och sprint, ej bult" },
    ],
    verdict:
      "W.Steps 320 är systerserien med 8 centimeter smalare steg, och 3,6 meter kostar 11 378 kronor hos Stegfabriken.\n\n**Steget är 320 millimeter, alltså 9 millimeter bredare än Modums och 80 smalare än systerns.** Tillverkaren kallar modellen villastege och pekar ut den som den för privata hus, medan 400-serien är avsedd för kommersiella fastigheter. Det stämmer med måtten: 320 millimeter tar sig in mellan ett stuprör och ett fönsterfoder där 400 inte får plats, och den går att skarva till 7,2 meter om fönstret sitter högt.\n\nDet är samma grundkonstruktion som Skeppshultstegen och Modum, med stegpinnarna dolda inne i sidoprofilerna tills sprinten dras.\n\nProblemet är vad 11 378 kronor köper. Housegard tar 3 695 för 3,86 meter, alltså tre decimeter mer räckvidd för en tredjedel av pengarna, och Modum 9 621 för 3,9 meter med ett godkännande på köpet. Längdserien är dessutom den magraste här: 1,5, 2,1 och 3,6 meter, så den som har ett fönster på 2,8 meter köper antingen för kort eller betalar för åtta decimeter i onödan. Bultarna får du skaffa själv.\n\nDet finns en köpare för den här stegen, och det är den som har ett smalt fasadparti och behöver ett brett steg ändå. Alla andra betalar för mycket: ta Housegard EL39 om priset styr och Modum om godkännandet gör det.",
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
    brand: "W.Steps",
    name: "Utrymningsstege 120, 3,6 m",
    reason:
      "En tredje W.Steps-serie som inte säljs av någon svensk butik vi hittat, bara av tillverkaren via fackhandel. Den är intressant ändå, eftersom den har jämförelsens fylligaste mått: 3 605 millimeter lång, 11 steg, 430 millimeter bred och 320 millimeter brett steg, 9 kilo. Kan byggas till 7,2 meter och öppnas från toppen. Dyker den upp i handeln hör den hemma i rankningen.",
    merchant: "W.Steps",
    merchantUrl:
      "https://www.wsteps.se/products/wall-and-roof-products/escape-ladders/W0350",
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
      "Tillbehör till den fällbara stegen. Ståplanet mäter 150 × 300 millimeter enligt tillverkarens produktblad och kostar 529 kronor hos Bauhaus, handtaget 708 kronor. Ståplanet ger något att kliva ut på i stället för rakt ner i luften och handtaget något att hålla i under fönsterkarmen. Nämns här eftersom de påverkar hur en utrymning faktiskt går till mer än flera av skillnaderna mellan själva stegarna.",
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
      "Modum Original, om du har träfasad. Den är den enda stegen i svensk handel som en tredje part provat och godkänt för utrymning: SINTEF TG 2536 anger provlast 2,6 kN per steg, en högsta användningshöjd på 5,0 meter och giltighet till april 2028. 3,9 meter kostar 9 621 kronor hos Everglow. Styr priset är Housegard EL39 hos Kjell för 3 695 kronor rätt val, och sitter fönstret i tegel eller puts är Skeppshultstegen den enda vars tillverkare anvisar ett fäste för den väggen.",
  },
  {
    question: "Måste jag ha en fast monterad utrymningsstege?",
    answer:
      "Reglerna gäller hur byggnaden är utformad, inte vad du äger. Men Boverkets byggregler accepterar utrymning genom fönster om underkanten sitter högst 5,0 meter över marken, eller högst 8,0 meter om det finns en fast monterad stege. Under fem meter räknar reglerna med att du hoppar, och Boverket skriver själva att det innebär att man riskerar att skadas. En hängande stege höjer aldrig gränsen, hur lång den än är, eftersom den inte är fast monterad.",
  },
  {
    question: "Hur högt får en utrymningsstege användas?",
    answer:
      "Det beror på vem du frågar, och de två svaren går inte ihop. Boverket tillåter en fast monterad stege upp till 8,0 meter. Modums godkännande, TG 2536, anger 5,0 meter utan ryggbygel och 7,5 meter med, båda mätta från fönstrets underkant. Modum är den enda tillverkaren som anger en högsta användningshöjd. Skeppshultstegen säljer en stege på 5,7 meter och W.Steps en på 6,0, och W.Steps 400 får dessutom skarvas till 18 meter.",
  },
  {
    question: "Hur brett ska steget vara?",
    answer:
      "Bredare än du tror, för du kommer att klättra ner barfota eller i strumplästen. Spannet mellan de fem fabrikaten är 240 till 400 millimeter, alltså 16 centimeter mellan smalast och bredast. Housegard EL39 har 240 millimeter, Modum 311, W.Steps 320 och W.Steps 400 hela 400. Avståndet mellan stegen är däremot 300 millimeter på samtliga fem, så det är bredden och inte avståndet som skiljer stegarna åt när det gäller.",
  },
  {
    question: "Vad kostar en fast utrymningsstege?",
    answer:
      "3 695 till 14 513 kronor för de fem fabrikaten i ungefär 3,9 meters längd, nästan fyra gånger mellan billigast och dyrast för produkter som gör samma sak. Housegard EL39 kostar 3 695, Skeppshultstegen 7 799, Modum 9 621, W.Steps 320 elva tusen och W.Steps 400 fjortontusen. Priset följer inte prestandan: den dyraste har det bredaste steget men ingen provning, medan den billigaste anger både maxlast och provningsstandard.",
  },
  {
    question: "Vilken stege passar en fasad som inte är av trä?",
    answer:
      "Skeppshultstegen. Tillverkaren anger fäste och kraft för sju väggmaterial: trä, stål, betong, massivtegel, håltegel, lättbetong och lättklinker, med injekteringsmassa och expanderskruv namngivna för var och en. Housegard EL39 täcker trä, tegel och leca, men skickar bara med träskruven. Modums godkännande förutsätter träpanel på minst 19 millimeter. W.Steps hänvisar till fackhandeln och skickar inte med några bultar alls.",
  },
  {
    question: "Var på fasaden ska stegen sitta?",
    answer:
      "Under det fönster som ska användas, inte vid det praktiskaste stället att skruva. Det låter självklart och är det vanligaste felet: stegen hamnar vid gaveln där väggen är fri, och sedan visar det sig att fönstret där är ett badrumsfönster som inte går att klättra ut genom. Gå därför baklänges: bestäm först vilket rum som saknar en andra utrymningsväg, sedan vilket fönster i det rummet som går att öppna helt, och först då var stegen ska sitta. Kontrollera också marken under. En stege som slutar ovanför en stensättning, ett staket eller en buske av måbär är en stege du inte vill klättra ner för barfota.",
  },
  {
    question: "Kan en fast utrymningsstege användas för inbrott?",
    answer:
      "Det är en rimlig oro och den har ett enkelt svar: stegarna på den här sidan går bara att fälla ut uppifrån. Housegard skriver att EL39 inte kan användas för att klättra upp när den är infälld, och Modum kan monteras ända ner till 60 centimeter från marken just därför att sprinten sitter i toppen. Infälld är stegen en list på 67 till 83 millimeter utan något att sätta foten på. Väg det ändå mot vad du faktiskt skyddar dig mot: ett öppet fönster på övervåningen är ett större problem.",
  },
  {
    question: "Måste utrymningsstegen underhållas?",
    answer:
      "Ja, och det är mest ett par minuter om året. Modums godkännande kräver årlig kontroll av både stegen och skruvarnas förankring, och Housegard skriver två gånger om året. Titta efter rost i infästningarna, kontrollera att bultarna sitter fast och att träfasaden bakom inte har mjuknat, och prova att fälla ut stegen så att sprinten inte kärvat av is eller färg. Gör det på våren när snön gått. En stege som suttit orörd i femton år kan se perfekt ut och ändå sitta i en vägg som inte längre håller.",
  },
  {
    question: "Vad är skillnaden mellan en utrymningsstege och en brandtrappa?",
    answer:
      "Skalan och regelverket. En utrymningsstege är en produkt du köper och skruvar upp på en villafasad för att kunna ta dig ner från ett fönster. En brandtrappa är en byggnadsdel, ofta projekterad av en konstruktör och besiktigad, och den krävs för vissa flerbostadshus och verksamhetslokaler enligt Boverkets byggregler. Bor du i villa är det stegen som är din fråga, och det finns inget lagkrav på den. Bor du i ett flerbostadshus är utrymningsvägarna fastighetsägarens ansvar, och en egen stege monterad i en gemensam fasad kräver dessutom föreningens eller värdens tillstånd.",
  },
];
