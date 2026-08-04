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
 * ## Sidans fynd: kilotalet går inte att jämföra
 *
 * | Produkt | Angiven maxlast | Provad enligt |
 * |---|---|---|
 * | Jula Hard Head | 150 kg | ingenting angivet |
 * | Biltema | 200 kg | ingenting angivet |
 * | Housegard EL45A | 200 kg rek, 450 kg "testad upp till" | EN 131-6, utan årtal, endast hos tillverkaren |
 * | Nexa FLB-104 | 400 kg | EN 131-6:2015 |
 * | Brandvarnare.se 4,5 och 7 m | 450 kg eller 3 personer | ingenting angivet |
 * | Skeppshultstegen 4,5 och 7,5 m | **ingen uppgift alls** | ingenting angivet |
 *
 * Trefaldig spridning på produkter som ser likadana ut, plus två som inte
 * svarar. Båda som anger en standard anger EN 131-6, som enligt SIS gäller
 * **lutande och stående teleskopstegar**, och Bauhaus anger utgåvan 2015 som
 * SIS listar som tillbakadragen och ersatt av 2019.
 *
 * Kontrasten som gör fyndet skarpt: Housegards fasadmonterade EL39 anger
 * EN 131-1:2015 och EN 131-2:2010, alltså de allmänna stegstandarderna, och
 * uppger **150 kg**. Den produkt som provats mot en tillämplig standard anger
 * den lägsta lasten av alla.
 *
 * ## ⚠️ Två fel i ett tidigare utkast, rättade
 *
 * Modellen heter **EL45A**, inte EL45S. EL45S kommer från brandinfo.se.
 *
 * Kjells "Bredd: 30 cm" är **stegbredden**, inte karmdjupet. Ett tidigare
 * utkast förde in det som karmtjocklek, hämtat från en sökmotorsammanfattning
 * och inte från en läst sida. Tillverkarens egen sida anger 15 till 34 cm.
 * Samma felkälla som temperaturuppgiften på /brandfilt.
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
    tagline: "Billigaste vägen ner från tre våningar, med 955 kronor.",
    scores: { rackvidd: 5, nedstigning: 4.5, provning: 1, passform: 3.5, prisvarde: 4 },
    price: 1294,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/raddningsstege-7-m/",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst räckvidd per krona för tre våningar",
    pros: [
      "Sju meter täcker tre våningar, och närmaste stege med samma räckvidd kostar 955 kronor mer",
      "Distanser sticker ut från fotstegen och håller ut stegen från fasaden, så foten får plats",
      "Butiken beskriver hur du övar med stegen, både att bara hänga den och att fälla ut den helt",
      "Nylonband mellan fotstegen gör att den kan hänga rakt ned eller läggas över en takfot",
    ],
    cons: [
      "Dyrast av stegarna, 1 294 kronor mot 699 för den billigaste",
      "6,5 kilo att bära fram och haka på i mörker, tyngst av alla",
      "Ingen standard anges, och maxlasten 450 kilo saknar redovisad provmetod precis som hos de flesta",
    ],
    specs: [
      { label: "Längd", value: "7 m", highlight: true },
      { label: "Räcker till", value: "Tre våningar", highlight: true },
      { label: "Angiven maxlast", value: "450 kg eller 3 personer", highlight: true },
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      { label: "Vikt", value: "6,5 kg", highlight: true },
      { label: "Standard som anges", value: "Ingen" },
      { label: "Distanser mot vägg", value: "Ja, uttalat" },
      { label: "Mått hopfälld", value: "37 x 24 x 28 cm" },
    ],
    verdict:
      "Den här vinner på täckning. Vad det betyder, och inte betyder:\n\nSju meter når ner från ett fönster på tredje våningen. Det gör Skeppshultstegens 7,5-metersstege hos Bauhaus också, men den kostar 2 249 kronor, 955 mer, och Bauhaus publicerar varken maxlast eller standard för den. Resten av jämförelsen ligger på 4 till 4,5 meter och är byggd för en andravåning. Har du sovrum på plan tre är det här alltså inte det enda alternativet, men det är det billigaste med god marginal.\n\nHar du två våningar ska du inte köpa den här. Då är 4,5-metersstegen rätt produkt, den är billigare, den väger mindre och den överflödiga längden gör ingen nytta. Vår rankning väger räckvidd tyngst för att längden avgör om produkten alls fungerar från ditt fönster, och det gör att den bredaste täckningen hamnar överst. Det är inte en uppmaning att köpa dyrast.\n\nDet den gör bra utöver längden är nedstigningen. Butiken är den enda som skriver ut att det sitter distanser på fotstegen som håller ut stegen från fasaden. Utan dem trycks stegen mot väggen av din egen vikt och framfoten får ingenstans att ta vägen, och det är den vanligaste anledningen till att en repstege är svår att klättra i.\n\nDen är också den enda butiken som beskriver hur du övar. Jämför med Jula, som säljer en stege uttryckligen avsedd för engångsbruk: den kan du aldrig pröva innan det gäller.\n\nSvagheten är dokumentationen. Ingen standard, och 450 kilo angivet utan att någon säger hur det mätts. Där är den inte sämre än fyra av de fem andra, men den är inte bättre heller, och 1 294 kronor är mycket för en produkt vars enda kontrollerbara uppgift är längden.",
  },
  {
    id: "housegard-el45a",
    name: "Brandstege EL45A 4,5 m",
    shortName: "EL45A",
    brand: "Housegard",
    image: productImage(BRANDSTEGE.slug, "housegard-el45a"),
    tagline: "Den enda vars karmmått är publicerat i båda riktningarna.",
    scores: { rackvidd: 4, nedstigning: 3.5, provning: 2.5, passform: 4.5, prisvarde: 4 },
    price: 849,
    merchant: "Kjell & Company",
    merchantUrl:
      "https://www.kjell.com/se/produkter/sakerhet-overvakning/brandskydd/brandstegar/housegard-brandstege-45-m-p21053",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 21, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst köp för en normal andravåning",
    pros: [
      "Karmtjocklek 15 till 34 cm, ensam om att ange både ett tak och ett golv",
      "Tillverkaren anger EN 131-6, vilket är mer än sex av de åtta produkterna gör",
      "4,5 meter räcker till en andravåning med marginal, även med hög takhöjd",
      "Levereras i en väska som går att förvara vid fönstret och få ut snabbt",
    ],
    cons: [
      "Varken Kjell eller Clas Ohlson för standarduppgiften vidare, den finns bara hos tillverkaren",
      "Två maxlaster anges, 200 kilo rekommenderat och 450 testat, utan att någon förklarar skillnaden",
      "Ingen uppgift om distanser mot väggen, till skillnad från Brandvarnare.se och Jula",
    ],
    specs: [
      { label: "Längd", value: "4,5 m", highlight: true },
      { label: "Räcker till", value: "Två våningar", highlight: true },
      { label: "Angiven maxlast", value: "200 kg rek, testad till 450 kg", highlight: true },
      { label: "Karmtjocklek", value: "15 till 34 cm", highlight: true },
      { label: "Standard som anges", value: "EN 131-6, utan årtal", highlight: true },
      { label: "Förvaring", value: "Medföljande väska" },
      { label: "Artikelnummer", value: "21053, modell 605012" },
    ],
    verdict:
      "Det här är stegen de flesta ska köpa, och den är tvåa bara för att den inte når tre våningar.\n\nDen gör en sak ingen annan gör: anger karmtjockleken i båda riktningarna. Tillverkarens egen sida skriver 15 till 34 centimeter. Alla andra anger bara ett tak, vanligen 30 centimeter, och nämner inte att en alltför tunn karm också är ett problem eftersom krokarna då inte får något grepp. Det är det billigaste förköpet du kan göra i den här kategorin: mät karmen vid det fönster du tänkt använda innan du beställer.\n\nDen är också den enda som ens antyder en provning. Housegards egen sida skriver att produkten är testad enligt EN 131-6. Det är inte hela sanningen, för den standarden gäller enligt SIS lutande och stående teleskopstegar och en hängande stege av nylonband är ingetdera. Men att peka på någonting alls är mer än Biltema, Jula och Brandvarnare.se gör.\n\nHaken är att uppgiften stannar hos tillverkaren. Handlar du hos Kjell eller Clas Ohlson ser du bara kilotalet, och där står två tal bredvid varandra: rekommenderat 200 kilo, testat upp till 450. Ingen förklarar vad skillnaden består i, och den som väger 120 kilo och undrar om stegen bär både honom och ett barn får inget svar.\n\n849 kronor hos Kjell är femtio mindre än Clas Ohlson tog innan den tog slut hos dem, och femtio mer än Biltema. För de pengarna får du den bäst dokumenterade stegen. Det är fortfarande en låg ribba.",
  },
  {
    id: "brandvarnare-raddningsstege-45m",
    name: "Räddningsstege 4,5 m",
    shortName: "Räddningsstege 4,5 m",
    brand: "Brandvarnare.se",
    image: productImage(BRANDSTEGE.slug, "brandvarnare-raddningsstege-45m"),
    tagline: "Bäst beskrivna nedstigningen, till det näst högsta priset av stegarna.",
    scores: { rackvidd: 4, nedstigning: 4.5, provning: 1, passform: 4, prisvarde: 3 },
    price: 979,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/raddningsstege-4-5m/",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst om du tänker öva",
    pros: [
      "Distanser på fotstegen som håller ut stegen från fasaden, uttalat i produkttexten",
      "Räfflad aluminium på fotstegen, och nylonband som håller avståndet mellan stegen",
      "Butiken beskriver övning i två steg, både bara upphängning och full utfällning",
      "Ett klistermärke medföljer att sätta på dörren där stegen förvaras",
    ],
    cons: [
      "979 kronor för 4,5 meter, 180 mer än Biltema och 130 mer än Kjell för samma räckvidd",
      "Ingen standard anges över huvud taget",
      "450 kilo eller tre personer anges utan provmetod, och de två talen går inte ihop",
    ],
    specs: [
      { label: "Längd", value: "4,5 m", highlight: true },
      { label: "Räcker till", value: "Två våningar", highlight: true },
      { label: "Angiven maxlast", value: "450 kg eller 3 personer", highlight: true },
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      { label: "Vikt", value: "4,8 kg", highlight: true },
      { label: "Standard som anges", value: "Ingen" },
      { label: "Distanser mot vägg", value: "Ja, uttalat" },
      { label: "Mått hopfälld", value: "37 x 18,5 x 28 cm" },
    ],
    verdict:
      "Samma stege som sjumetersvinnaren i kortare utförande, och den bästa beskrivningen av hur en nedstigning faktiskt går till.\n\nButiken är den enda som skriver ut varför distanserna på fotstegen finns: de håller ut stegen från väggen så att foten får plats. En stege av band pressas nämligen platt mot fasaden av vikten hos den som klättrar. Utan distanser står du med tårna på en pinne och fasaden mot knäna.\n\nDe är också ensamma om att skriva hur du övar, och de delar upp det i två nivåer: bara hänga stegen över karmen, eller hänga och fälla ut hela vägen. Det andra sliter på stegen, så de säger till om att kontrollera den efteråt. Det är den sortens ärlighet som kostar butiken en försäljning ibland och som vi räknar som ett plus.\n\nProblemet är priset. 979 kronor för fyra och en halv meter, när Biltema tar 799 och Kjell 849 för samma längd och Bauhaus 699 för fyra. Du betalar cirka 150 kronor för en bättre produktbeskrivning, och en beskrivning är inte samma sak som en bättre stege. Vi kan inte belägga att distanserna saknas hos konkurrenterna, bara att ingen annan nämner dem.\n\nDokumentationen är dessutom den svagaste av stegarna, tillsammans med Biltemas och Julas: ingen standard alls. Och de två talen i lastuppgiften motsäger varandra, för 450 kilo är mer än tre vuxna men de skriver ändå max tre personer.",
  },
  {
    id: "nexa-flb-104",
    name: "Brandstege FLB-104 4 m",
    shortName: "FLB-104",
    brand: "Nexa",
    image: productImage(BRANDSTEGE.slug, "nexa-flb-104"),
    tagline: "Billigast, och den enda som anger en standard i butiken.",
    scores: { rackvidd: 3.5, nedstigning: 3.5, provning: 1.5, passform: 3.5, prisvarde: 5 },
    price: 699,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/brandstege-nexa-flb-104-4m",
    priceCheckedAt: PRICE_CHECKED,
    award: "budget",
    superlative: "Billigast, om räckvidden räcker",
    pros: [
      "699 kronor, 100 kronor under näst billigaste och 595 under den dyraste",
      "Enda produkten där butiken själv skriver ut en standardhänvisning i specifikationen",
      "Butiken anger maximal evakueringshöjd separat från stegens längd, vilket ingen annan gör",
      "4,5 kilo och tolv steg, lätt att hantera",
    ],
    cons: [
      "Standarden anges som EN 131-6:2015, en utgåva SIS listar som tillbakadragen och ersatt 2019",
      "EN 131-6 gäller lutande och stående teleskopstegar, inte en stege som hänger fritt",
      "4,3 meters evakueringshöjd är knappt för en andravåning med hög takhöjd",
    ],
    specs: [
      { label: "Längd", value: "4 m", highlight: true },
      { label: "Max evakueringshöjd", value: "4,3 m från fönstrets nederkant", highlight: true },
      { label: "Angiven maxlast", value: "400 kg", highlight: true },
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      { label: "Standard som anges", value: "CE (EN 131-6:2015)", highlight: true },
      { label: "Vikt", value: "4,5 kg" },
      { label: "Antal steg", value: "12" },
    ],
    verdict:
      "Billigast av stegarna med 100 kronor, och samtidigt den enda vars standardhänvisning går att ta i. Att den inte håller är hela poängen.\n\nBauhaus skriver \"Godkänd enligt: CE (EN131-6:2015)\" rakt ut i specifikationen. Ingen annan butik anger någon standard alls. Uppgiften hjälper dig ändå inte, av två skäl.\n\nDen första är årtalet. SIS listar SS-EN 131-6:2015 som tillbakadragen och ersatt av utgåvan från 2019. Det är tredje gången i vår brandfamilj som en svensk butik anger en indragen utgåva, efter EN 1869:1997 på brandfiltarna och EN 50291:2010 på kolmonoxidvarnarna.\n\nDen andra är vilken standard det är. SIS beskriver omfattningen som lutande och stående teleskopstegar. FLB-104 är varken lutande eller stående, den hänger fritt i nylonband längs fasaden. Vi kan inte granska certifikatet och påstår därför ingenting om det, men vi kan läsa vad standarden själv säger att den handlar om.\n\nRäckvidden är den kortaste av stegarna. Fyra meters stege och 4,3 meters evakueringshöjd räknat från fönstrets nederkant, vilket är hederligt angivet men knappt i ett hus med tre meters takhöjd. Mät innan du beställer.\n\nFör 699 kronor är den ändå rätt köp om fönstret sitter lågt nog och du hellre lägger pengarna på en brandvarnare till. Vad du inte får är någon kontrollerbar uppgift om att den bär dig.",
  },
  {
    id: "hardhead-brandstege-43m",
    name: "Brandstege 4,3 m",
    /* Inte "Hard Head 4,3 m": varumärket renderas separat i väljare och tabell,
       och ett shortName som upprepar det ger "Hard Head Hard Head 4,3 m". */
    shortName: "Brandstege 4,3 m",
    brand: "Hard Head",
    image: productImage(BRANDSTEGE.slug, "hardhead-brandstege-43m"),
    tagline: "Enda med publicerat väggavstånd, och enda du inte får öva med.",
    scores: { rackvidd: 3.5, nedstigning: 4.5, provning: 1, passform: 3.5, prisvarde: 3 },
    price: 799,
    merchant: "Jula",
    merchantUrl:
      "https://www.jula.se/catalog/hem-och-hushall/brand-och-sakerhet/brand/brandstegar/brandstege-025385/",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.7, count: 19, scale: 5, checkedAt: PRICE_CHECKED },
    superlative: "Bäst mått, sämst villkor",
    pros: [
      "Väggavståndet är publicerat som ett mått, 43 cm utfällt, vilket ingen annan anger",
      "Hopfällt mått utskrivet, 18,5 × 37 × 25 cm, så du vet vad som ska få plats i garderoben",
      "Den mest återhållsamma lastuppgiften av stegarna, 150 kg, samma nivå som fasta stegar anger",
      "Räfflade steg och en nedstigningsinstruktion i fem punkter på produktsidan",
    ],
    cons: [
      "Endast avsedd för engångsbruk, så du kan inte öva med den",
      "Max karmtjocklek 28 cm, snålast av stegarna och tillräckligt för att utesluta en tjock nisch",
      "Ingen standard anges",
    ],
    specs: [
      { label: "Längd", value: "4,3 m utfälld", highlight: true },
      { label: "Engångsbruk", value: "Ja, enligt butikens egen text", highlight: true },
      { label: "Angiven maxlast", value: "150 kg", highlight: true },
      { label: "Karmtjocklek", value: "Högst 28 cm", highlight: true },
      { label: "Väggavstånd utfälld", value: "43 cm", highlight: true },
      { label: "Vikt", value: "4,68 kg" },
      { label: "Hopfällt mått", value: "18,5 × 37 × 25 cm" },
      { label: "Artikelnummer", value: "025385" },
      { label: "Mått hopfälld", value: "18,5 x 37 x 25 cm (BxHxD)" },
    ],
    verdict:
      "Den bäst måttsatta stegen av alla, sänkt av en mening mitt i säljtexten.\n\nJula skriver ut siffror ingen annan bryr sig om. Väggavståndet i utfällt läge är 43 centimeter, vilket är det mått som avgör om foten får plats mellan stegpinnen och fasaden, och de är ensamma om att ange det som ett tal i stället för att beskriva det i ord. De skriver ut hopfällt mått så du vet om den får plats under sängen. Och deras lastuppgift, 150 kilo, är den mest återhållsamma i kategorin och råkar ligga på samma nivå som fasadmonterade stegar anger efter provning mot EN 131.\n\nSedan kommer meningen: \"Endast avsedd för engångsbruk.\"\n\nDen står i löpande text i ett säljstycke, inte i specifikationen. Konsekvensen är att du aldrig kan pröva stegen. Varje räddningstjänst säger åt dig att öva utrymningsvägen, Brandvarnare.se beskriver på sina produktsidor hur man gör det, och den här stegen förbrukas av övningen. Första gången du klättrar i den står huset i brand, i mörker, med adrenalin, på en produkt du aldrig rört.\n\nJula är däremot inte ensam om villkoret, bara ensam om att skriva det i butiken. Skeppshultstegens egen text säger samma sak, men den syns bara hos Stegfabriken och inte hos Bauhaus. Se avsnittet om engångsbruk.\n\nVi drar inte av poäng för det i något kriterium, eftersom det inte hör hemma i något av de fem och eftersom ett dolt avdrag hade dolt själva saken. Det står som nackdel och har ett eget avsnitt ovanför.\n\nKarmmåttet är dessutom stegarnas snålaste, 28 centimeter mot 30 hos de flesta och 34 hos Housegard. I ett hus med tjock isolering eller djup fönsternisch är det skillnaden mellan en stege som hakar och en som inte gör det.",
  },
  /* Tillagda 2026-08-03 vid rättelsen. Priserna är lästa hos Bauhaus samma
     dag och inte på filens PRICE_CHECKED, därav den egna konstanten. */
  {
    id: "skeppshult-repstege-75m",
    name: "Repstege 7,5 m",
    shortName: "Repstege 7,5 m",
    brand: "Skeppshultstegen",
    image: productImage(BRANDSTEGE.slug, "skeppshult-repstege-75m"),
    tagline: "Längst räckvidd i handeln, utan en enda uppgift om last.",
    scores: { rackvidd: 5, nedstigning: 4, provning: 1, passform: 3, prisvarde: 2 },
    price: 2249,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/brandstege-skepphultstegen-plast-7-5m",
    priceCheckedAt: PRICE_CHECKED_SKEPPSHULT,
    superlative: "Längst av alla, dyrast av alla",
    pros: [
      "7,5 meter är den längsta hängande stegen vi hittat i svensk handel",
      "Avståndet ut från fasaden anges som ett mått, 80 mm, vilket bara två andra gör",
      "22 fotsteg och 306 mm stegbredd står utskrivet, två uppgifter de flesta butiker hoppar över",
      "1 000 kronor billigare än exakt samma artikel hos Stegfabriken",
    ],
    cons: [
      "Ingen maxlast alls i specifikationen, samtidigt som säkerhetstexten säger åt dig att aldrig överskrida den",
      "2 249 kronor är 955 mer än sjumetersstegen hos Brandvarnare.se",
      "Ingen standard anges, ingen vikt anges, och ingen uppgift om hur den förvaras",
    ],
    specs: [
      { label: "Längd", value: "7,5 m", highlight: true },
      { label: "Räcker till", value: "Tre våningar", highlight: true },
      { label: "Angiven maxlast", value: "Ej angivet", highlight: true },
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      { label: "Avstånd från fasad", value: "80 mm", highlight: true },
      { label: "Standard som anges", value: "Ingen" },
      { label: "Antal steg", value: "22" },
      { label: "Artikelnummer", value: "1503513" },
    ],
    verdict:
      "Den längsta hängande stegen i svensk handel, och den enda där butiken inte anger vad den bär.\n\nBörja med det den gör rätt. 7,5 meter räcker till tre våningar med marginal. Avståndet ut från fasaden står som ett tal, 80 millimeter, och det är den uppgift som avgör om foten får plats när stegen ligger an mot väggen. Antal steg och stegbredd står också utskrivet. Det är mer specifikation än Biltema publicerar på någon av sina produkter.\n\nSedan luckan. Under rubriken Teknisk information står material, längd, bredd, antal steg, avstånd från fasad och max väggtjocklek. Ingen maxlast. I samma produkttext står samtidigt: överskrid aldrig den maximala belastningsvikten som anges av tillverkaren. Butiken hänvisar alltså till ett tal den inte publicerar.\n\nTalet finns. På Bauhaus egen produktbild syns en etikett på stegen med 450 kilo och en CE-märkning, delvis skymd av spännbandet. Du kan alltså läsa maxlasten först när kartongen är öppnad, och det är exakt tvärtemot vad kriteriet dokumenterad provning mäter. Det ger lägsta betyget, samma som de fyra andra som inte anger någon standard.\n\nPriset är den andra invändningen. 2 249 kronor mot 1 294 för sjumetersstegen hos Brandvarnare.se, 955 kronor för en halv meter extra och sämre publicerade uppgifter. Vill du ändå ha just den här: köp den hos Bauhaus. Stegfabriken tar 3 185 kronor för samma artikel.",
  },
  {
    id: "skeppshult-repstege-45m",
    name: "Repstege 4,5 m",
    shortName: "Repstege 4,5 m",
    brand: "Skeppshultstegen",
    image: productImage(BRANDSTEGE.slug, "skeppshult-repstege-45m"),
    tagline: "Samma uppgifter som sjuan, till ett pris som inte försvarar sig.",
    scores: { rackvidd: 4, nedstigning: 4, provning: 1, passform: 3, prisvarde: 2 },
    price: 1327,
    merchant: "Bauhaus",
    merchantUrl: "https://www.bauhaus.se/brandstege-skepphultstegen-plast-4-5m",
    priceCheckedAt: PRICE_CHECKED_SKEPPSHULT,
    pros: [
      "Avståndet ut från fasaden anges som ett mått, 80 mm",
      "13 fotsteg och 305 mm stegbredd står utskrivet",
      "4,5 meter räcker till en normal andravåning med marginal",
      "568 kronor billigare än samma artikel hos Stegfabriken",
    ],
    cons: [
      "1 327 kronor för en räckvidd som kostar 799 hos Biltema och 849 hos Kjell",
      "Ingen maxlast alls i specifikationen",
      "Ingen standard anges och ingen vikt anges",
    ],
    specs: [
      { label: "Längd", value: "4,5 m", highlight: true },
      { label: "Räcker till", value: "Två våningar", highlight: true },
      { label: "Angiven maxlast", value: "Ej angivet", highlight: true },
      { label: "Karmtjocklek", value: "Högst 30 cm", highlight: true },
      { label: "Avstånd från fasad", value: "80 mm", highlight: true },
      { label: "Standard som anges", value: "Ingen" },
      { label: "Antal steg", value: "13" },
      { label: "Artikelnummer", value: "1503512" },
    ],
    verdict:
      "Kortversionen av sjuan, och den som har svårast att försvara sitt pris.\n\nUppgifterna är desamma och de är hyggliga: 80 millimeter ut från fasaden angivet som ett tal, 13 fotsteg, 305 millimeters stegbredd, högst 300 millimeters karm. Ingen maxlast, ingen standard, ingen vikt.\n\nProblemet är vad grannarna på hyllan kostar. 4,5 meter räckvidd får du för 799 kronor hos Biltema och 849 hos Kjell, och Kjells är dessutom den enda produkten i kategorin där tillverkaren anger ett karmintervall i båda riktningarna. Här betalar du 1 327 kronor och får ett publicerat avståndsmått i stället. Det är en verklig uppgift, men den är inte värd 478 kronor.\n\nDet som gör den värd att känna till är butiksskillnaden. Exakt samma artikel kostar 1 895 kronor hos Stegfabriken. Samma stege, samma tillverkare, 43 procents påslag. Det mönstret gäller hela Skeppshultstegens sortiment och är den enskilt största besparingen i den här produktfamiljen.\n\nEn sak till följer med köpstället. Stegfabriken publicerar tillverkarens egen text, som säger att stegen är konstruerad för att användas en gång enbart. Bauhaus skriver bara att den är tillverkad för att användas endast vid behov. Samma produkt, samma tillverkare, och den restriktion som avgör om du får öva syns bara i den dyrare butiken.",
  },
  {
    id: "biltema-brandstege-45m",
    name: "Brandstege 4,5 m",
    /* Samma skäl som hos Hard Head: brand renderas separat, så "Biltema 4,5 m"
       hade blivit "Biltema Biltema 4,5 m". */
    shortName: "Brandstege 4,5 m",
    brand: "Biltema",
    image: productImage(BRANDSTEGE.slug, "biltema-brandstege-45m"),
    tagline: "Rätt längd till lågt pris, med tre rader specifikation totalt.",
    scores: { rackvidd: 4, nedstigning: 2.5, provning: 1, passform: 2, prisvarde: 4.5 },
    price: 799,
    merchant: "Biltema",
    merchantUrl:
      "https://www.biltema.se/hem/sakerhet/brandstegar/brandstege-45-m-2000042748",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast per meter räckvidd",
    pros: [
      "4,5 meter för 799 kronor, full andravåningsräckvidd till nästan lägsta pris",
      "Finns i varuhus över hela landet och går att hämta samma dag",
      "200 kilo är en återhållsam uppgift jämfört med de 400 och 450 andra anger",
    ],
    cons: [
      "Tekniska data består av tre rader: material, maxlast och längd",
      "Ingen uppgift om karmtjocklek, så det går inte att kontrollera om den passar ditt fönster",
      "Ingen uppgift om distanser mot väggen, stegbredd eller vikt",
      "Ingen standard anges",
    ],
    specs: [
      { label: "Längd", value: "4,5 m", highlight: true },
      { label: "Räcker till", value: "Två våningar", highlight: true },
      { label: "Angiven maxlast", value: "200 kg", highlight: true },
      { label: "Karmtjocklek", value: "Ej angivet", highlight: true },
      { label: "Material", value: "Nylon och aluminium" },
      { label: "Standard som anges", value: "Ingen" },
      { label: "Artikelnummer", value: "21-500" },
    ],
    verdict:
      "Rätt längd, lågt pris och nästan ingen information alls.\n\nBiltemas tekniska data för den här produkten består av tre rader: material nylon och aluminium, maxlast 200 kilo, längd 4,5 meter. Det är allt. Ingen karmtjocklek, ingen vikt, ingen stegbredd, inget om distanser, ingen standard.\n\nKarmtjockleken är den som gör mest skada. Alla andra tillverkare anger ett tak på 28 till 34 centimeter, vilket betyder att det finns en gräns och att den ligger inom det spannet. Hos Biltema kan du inte veta om stegen passar ditt fönster förrän du står med den i handen. Öppet köp löser det ekonomiskt men inte praktiskt, för den som upptäcker det vid en brand upptäcker det för sent.\n\nDet den gör rätt är längden och priset. 4,5 meter är den räckvidd en normal andravåning behöver, och 799 kronor är näst lägsta priset av stegarna. Räknat i kronor per meter faktisk räckvidd är den billigast av alla. Finns dessutom att hämta i varuhus samma dag, vilket är värt något för en produkt man skjuter upp att köpa.\n\nOch 200 kilo är, av alla ironier, en av de mer trovärdiga uppgifterna i kategorin, just för att den är låg. De som anger 400 och 450 gör det utan att ange hur de kommit fram till det.",
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
      "Det beror på hur högt fönstret sitter. Har du två våningar är Housegard EL45A hos Kjell för 849 kronor bäst köp: 4,5 meter räckvidd, karmtjocklek angiven till 15 till 34 centimeter och den enda produkten där tillverkaren över huvud taget anger en standard. Har du tre våningar finns två alternativ, och de skiljer 955 kronor: Brandvarnare.se sjumetersstege för 1 294 kronor och Skeppshultstegens 7,5-meters hos Bauhaus för 2 249. Den dyrare publicerar varken maxlast eller standard, så vi rekommenderar den billigare. Sitter fönstrets underkant mer än fem meter över marken bör du i stället titta på en fast monterad stege, eftersom det är den enda typ Boverkets byggregler räknar som utrymningsväg.",
  },
  {
    question: "Hur lång brandstege behöver jag?",
    answer:
      "Mät från fönstrets underkant ner till marken, och lägg till lite marginal för att stegen ska nå ända ner. Som tumregel går det åt 2,5 till 3,5 meter per våningsplan beroende på takhöjd. En 4,5-metersstege täcker en normal andravåning. En stege på 4 till 4,3 meter blir knapp om huset har hög takhöjd. Över fem meter till marken är du utanför det byggreglerna räknar med att man klarar med en hängande stege.",
  },
  {
    question: "Är brandstegar certifierade?",
    answer:
      "Inte mot någon standard som gäller stegtypen. Två av produkterna hänvisar till EN 131-6. SIS beskriver den standardens omfattning som lutande och stående teleskopstegar, och en stege som hänger fritt i nylonband är ingetdera. Bauhaus anger dessutom utgåvan 2015, som SIS listar som tillbakadragen och ersatt av 2019. De sex övriga anger ingen standard alls. Det är därför vårt kriterium heter dokumenterad provning och inte certifiering: vi betygsätter vad du kan kontrollera före köp.",
  },
  {
    question: "Måste man ha brandstege enligt lag?",
    answer:
      "Nej. Boverkets byggregler ställer krav på hur en byggnad utformas, inte på vad du äger, och en hängande stege räknas aldrig som utrymningsväg i reglernas mening. Bara en fast monterad stege gör det. Det byggreglerna däremot säger rakt ut är vad alternativet är: sitter fönstrets underkant högst fem meter över marken accepteras att man utrymmer genom att hoppa, och Boverket skriver själva att man då riskerar att skadas. Det är det bästa argumentet för att ha en stege, och det är starkare än något butikerna formulerar.",
  },
  {
    question: "Hur tjock fönsterkarm klarar en brandstege?",
    answer:
      "Krokarna hakas över karmen och har en gräns. Jula anger högst 28 centimeter, Nexa, Brandvarnare.se och Skeppshultstegen högst 30, och Housegard anger som enda tillverkare ett intervall, 15 till 34 centimeter. Minimum spelar roll också: en alltför tunn karm ger krokarna för lite grepp. Biltema anger ingen uppgift alls. Mät karmen vid det fönster du tänkt använda innan du beställer, det tar en minut och är det billigaste du kan göra för din säkerhet i den här kategorin.",
  },
  {
    question: "Klarar barn att använda en brandstege själva?",
    answer:
      "Sällan, och det är en av de viktigaste sakerna att ta ställning till innan du köper. En hängande repstege pendlar mot fasaden när man klättrar, och den kräver att du vågar kliva ut genom ett fönster baklänges. Ett barn som aldrig gjort det i lugn och ro kommer inte att göra det för första gången i mörker med rök i rummet. Planera därför för barnrummet som om stegen inte fanns: en vuxen går dit och hämtar. Stegen ska ligga där en vuxen kan använda den för att ta sig ner med ett barn, inte där ett barn förväntas klara sig ensamt. Och öva tillsammans, i dagsljus.",
  },
  {
    question: "Hur övar man med en brandstege utan att någon slår sig?",
    answer:
      "På låg höjd, i dagsljus, med någon som håller. Öva från ett fönster på bottenvåningen eller från en altan, inte från sovrummet på övervåningen. Det du faktiskt tränar är momenten som är svåra: att få fast kroken på karmen med en hand, att förstå åt vilket håll stegen ska hänga, och att kliva ut baklänges med fötterna först. Gör det en gång om året med hela hushållet, ungefär som ni testar brandvarnaren. Låt inte barn öva ensamma, och häng aldrig upp stegen i något som inte är en riktig fönsterkarm. En stege som legat orörd i tio år är inget brandskydd, det är ett kvitto.",
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
