import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { BRANDSTEGE } from "@/lib/categories";

/**
 * Brandstegar, de hängande. Underlag i .agent/research-brandstege.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, lagerstatus, längd, angiven maxlast,
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
 *
 * Trefaldig spridning på produkter som ser likadana ut. Båda som anger en
 * standard anger EN 131-6, som enligt SIS gäller **lutande och stående
 * teleskopstegar**, och Bauhaus anger utgåvan 2015 som SIS listar som
 * tillbakadragen och ersatt av 2019.
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
 * ## Butiksfördelningen
 *
 * Sex produkter, sex butiker. Brandvarnare.se, den enda butik vi kan annonsera
 * mot, tar plats ett och tre. Det är inget vi styrt fram: sjumetersstegen är
 * den enda i svensk handel som når tre våningar, och deras två sidor är de enda
 * som beskriver distanserna som håller ut stegen från fasaden.
 */

/** Alla priser lästa på butikens egen sida detta datum. */
export const PRICE_CHECKED = "2026-08-02";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "brandvarnare-raddningsstege-7m",
    name: "Räddningsstege 7 m",
    shortName: "Räddningsstege 7 m",
    brand: "Brandvarnare.se",
    image: productImage(BRANDSTEGE.slug, "brandvarnare-raddningsstege-7m"),
    tagline: "Enda stegen i svensk handel som når ner från tre våningar.",
    scores: { rackvidd: 5, nedstigning: 4.5, provning: 1, passform: 3.5, prisvarde: 4 },
    price: 1294,
    merchant: "Brandvarnare.se",
    merchantUrl: "https://brandvarnare.se/produkt/raddningsstege-7-m/",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst räckvidd, och den enda för tre våningar",
    pros: [
      "Sju meter täcker tre våningar, och ingen annan butik vi sökt igenom säljer något längre än 4,5",
      "Distanser sticker ut från fotstegen och håller ut stegen från fasaden, så foten får plats",
      "Butiken beskriver hur du övar med stegen, både att bara hänga den och att fälla ut den helt",
      "Nylonband mellan fotstegen gör att den kan hänga rakt ned eller läggas över en takfot",
    ],
    cons: [
      "Dyrast i jämförelsen, 1 294 kronor mot 699 för den billigaste",
      "6,5 kilo att bära fram och haka på i mörker, alltså tyngst av alla",
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
    ],
    verdict:
      "Den här vinner på täckning, och det är värt att säga direkt vad det betyder och inte betyder.\n\nSju meter är det enda vi hittat i svensk handel som når ner från ett fönster på tredje våningen. Alla andra stegar i jämförelsen ligger på 4 till 4,5 meter och är byggda för en andravåning. Har du sovrum på plan tre finns det alltså inget val, och då är frågan inte vilken som är bäst utan om du vill ha en stege alls.\n\nHar du två våningar ska du inte köpa den här. Då är 4,5-metersstegen rätt produkt, den är billigare, den väger mindre och den överflödiga längden gör ingen nytta. Vår rankning väger räckvidd tyngst för att längden avgör om produkten alls fungerar från ditt fönster, och det gör att den bredaste täckningen hamnar överst. Det är inte en uppmaning att köpa dyrast.\n\nDet den gör bra utöver längden är nedstigningen. Butiken är den enda som skriver ut att det sitter distanser på fotstegen som håller ut stegen från fasaden. Utan dem trycks stegen mot väggen av din egen vikt och framfoten får ingenstans att ta vägen, och det är den vanligaste anledningen till att en repstege är svår att klättra i.\n\nDen är också den enda butiken som beskriver hur du övar. Det låter som en detalj men är det inte: Jula säljer en stege som uttryckligen är avsedd för engångsbruk, alltså en du aldrig kan pröva innan det gäller.\n\nSvagheten är dokumentationen. Ingen standard, och 450 kilo angivet utan att någon säger hur det mätts. Där är den inte sämre än fyra av de fem andra, men den är inte bättre heller, och 1 294 kronor är mycket för en produkt vars enda kontrollerbara uppgift är längden.",
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
    award: "runnerup",
    superlative: "Bäst köp för en normal andravåning",
    pros: [
      "Karmtjocklek 15 till 34 cm, alltså den enda som anger både ett tak och ett golv",
      "Tillverkaren anger EN 131-6, vilket är mer än fyra av de sex produkterna gör",
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
      "Det här är stegen de flesta ska köpa, och den är tvåa bara för att den inte når tre våningar.\n\nDen gör en sak ingen annan gör: anger karmtjockleken i båda riktningarna. Tillverkarens egen sida skriver 15 till 34 centimeter. Alla andra anger bara ett tak, vanligen 30 centimeter, och nämner inte att en alltför tunn karm också är ett problem eftersom krokarna då inte får något grepp. Det är det billigaste förköpet du kan göra i den här kategorin: mät karmen vid det fönster du tänkt använda innan du beställer.\n\nDen är också den enda som ens antyder en provning. Housegards egen sida skriver att produkten är testad enligt EN 131-6. Det är inte hela sanningen, för den standarden gäller enligt SIS lutande och stående teleskopstegar och en hängande stege av nylonband är ingetdera. Men att peka på någonting alls är mer än Biltema, Jula och Brandvarnare.se gör.\n\nHaken är att uppgiften stannar hos tillverkaren. Handlar du hos Kjell eller Clas Ohlson ser du bara kilotalet, och där står två tal bredvid varandra: rekommenderat 200 kilo, testat upp till 450. Ingen förklarar vad skillnaden består i, och den som väger 120 kilo och undrar om stegen bär både honom och ett barn får inget svar.\n\n849 kronor hos Kjell är femtio mindre än Clas Ohlson tog innan den tog slut hos dem, och femtio mer än Biltema. För de pengarna får du kategorins bästa specifikation. Det är fortfarande en låg ribba.",
  },
  {
    id: "brandvarnare-raddningsstege-45m",
    name: "Räddningsstege 4,5 m",
    shortName: "Räddningsstege 4,5 m",
    brand: "Brandvarnare.se",
    image: productImage(BRANDSTEGE.slug, "brandvarnare-raddningsstege-45m"),
    tagline: "Bäst beskrivna nedstigningen, till kategorins näst högsta pris.",
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
      "979 kronor för 4,5 meter, alltså 180 mer än Biltema och 130 mer än Kjell för samma räckvidd",
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
    ],
    verdict:
      "Samma stege som sjumetersvinnaren i kortare utförande, och den bästa beskrivningen av hur en nedstigning faktiskt går till.\n\nButiken är den enda som skriver ut varför distanserna på fotstegen finns: de håller ut stegen från väggen så att foten får plats. Det låter självklart tills man tänker på att en stege av band pressas platt mot fasaden av vikten hos den som klättrar. Utan distanser står du med tårna på en pinne och fasaden mot knäna.\n\nDe är också ensamma om att skriva hur du övar, och de delar upp det i två nivåer: bara hänga stegen över karmen, eller hänga och fälla ut hela vägen. Det andra sliter på stegen, så de säger till om att kontrollera den efteråt. Det är den sortens ärlighet som kostar butiken en försäljning ibland och som vi räknar som ett plus.\n\nProblemet är priset. 979 kronor för fyra och en halv meter, när Biltema tar 799 och Kjell 849 för samma längd och Bauhaus 699 för fyra. Du betalar cirka 150 kronor för en bättre produktbeskrivning, och en beskrivning är inte samma sak som en bättre stege. Vi kan inte belägga att distanserna saknas hos konkurrenterna, bara att ingen annan nämner dem.\n\nDokumentationen är dessutom kategorins svagaste tillsammans med Biltemas och Julas: ingen standard alls. Och de två talen i lastuppgiften motsäger varandra, för 450 kilo är mer än tre vuxna men de skriver ändå max tre personer.",
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
      "699 kronor, alltså 100 kronor under näst billigaste och 595 under den dyraste",
      "Enda produkten där butiken själv skriver ut en standardhänvisning i specifikationen",
      "Butiken anger maximal evakueringshöjd separat från stegens längd, vilket ingen annan gör",
      "4,5 kilo och tolv steg, alltså lätt att hantera",
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
      "Billigast i jämförelsen med hundra kronor, och samtidigt den enda vars standardhänvisning går att ta i. Att den inte håller är sidans hela poäng.\n\nBauhaus skriver \"Godkänd enligt: CE (EN131-6:2015)\" rakt ut i specifikationen. Ingen annan butik anger någon standard alls. Två saker gör att uppgiften ändå inte hjälper dig.\n\nDen första är årtalet. SIS listar SS-EN 131-6:2015 som tillbakadragen och ersatt av utgåvan från 2019. Det är tredje gången i vår brandfamilj som en svensk butik anger en indragen utgåva, efter EN 1869:1997 på brandfiltarna och EN 50291:2010 på kolmonoxidvarnarna.\n\nDen andra är vilken standard det är. SIS beskriver omfattningen som lutande och stående teleskopstegar. FLB-104 är varken lutande eller stående, den hänger fritt i nylonband längs fasaden. Vi kan inte granska certifikatet och påstår därför ingenting om det, men vi kan läsa vad standarden själv säger att den handlar om.\n\nRäckvidden är kategorins kortaste. Fyra meters stege och 4,3 meters evakueringshöjd räknat från fönstrets nederkant, vilket är hederligt angivet men knappt i ett hus med tre meters takhöjd. Mät innan du beställer.\n\nFör 699 kronor är den ändå rätt köp om fönstret sitter lågt nog och du hellre lägger pengarna på en brandvarnare till. Vad du inte får är någon kontrollerbar uppgift om att den bär dig.",
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
      "Den mest återhållsamma lastuppgiften i jämförelsen, 150 kg, alltså samma nivå som fasta stegar anger",
      "Räfflade steg och en nedstigningsinstruktion i fem punkter på produktsidan",
    ],
    cons: [
      "Endast avsedd för engångsbruk, alltså går inte att öva med",
      "Max karmtjocklek 28 cm, snålast i jämförelsen och tillräckligt för att utesluta en tjock nisch",
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
    ],
    verdict:
      "Den bäst måttsatta stegen i jämförelsen, sänkt av en mening mitt i säljtexten.\n\nJula skriver ut siffror ingen annan bryr sig om. Väggavståndet i utfällt läge är 43 centimeter, vilket är det mått som avgör om foten får plats mellan stegpinnen och fasaden, och de är ensamma om att ange det som ett tal i stället för att beskriva det i ord. De skriver ut hopfällt mått så du vet om den får plats under sängen. Och deras lastuppgift, 150 kilo, är den mest återhållsamma i kategorin och råkar ligga på samma nivå som fasadmonterade stegar anger efter provning mot EN 131.\n\nSedan kommer meningen: \"Endast avsedd för engångsbruk.\"\n\nDen står i löpande text i ett säljstycke, inte i specifikationen. Konsekvensen är att du aldrig kan pröva stegen. Varje räddningstjänst säger åt dig att öva utrymningsvägen, Brandvarnare.se beskriver på sina produktsidor hur man gör det, och den här stegen förbrukas av övningen. Första gången du klättrar i den står huset i brand, i mörker, med adrenalin, på en produkt du aldrig rört.\n\nVi drar inte av poäng för det i något kriterium, eftersom det inte hör hemma i något av de fem och eftersom ett dolt avdrag hade dolt själva saken. Det står som nackdel och det har ett eget avsnitt på sidan.\n\nKarmmåttet är dessutom kategorins snålaste, 28 centimeter mot 30 hos de flesta och 34 hos Housegard. I ett hus med tjock isolering eller djup fönsternisch är det skillnaden mellan en stege som hakar och en som inte gör det.",
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
      "4,5 meter för 799 kronor, alltså full andravåningsräckvidd till nästan lägsta pris",
      "Finns i varuhus över hela landet och går att hämta samma dag",
      "200 kilo är en återhållsam uppgift jämfört med de 400 och 450 andra anger",
    ],
    cons: [
      "Tekniska data består av tre rader: material, maxlast och längd",
      "Ingen uppgift om karmtjocklek, alltså går det inte att kontrollera om den passar ditt fönster",
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
      "Rätt längd, lågt pris och nästan ingen information alls.\n\nBiltemas tekniska data för den här produkten består av tre rader: material nylon och aluminium, maxlast 200 kilo, längd 4,5 meter. Det är allt. Ingen karmtjocklek, ingen vikt, ingen stegbredd, inget om distanser, ingen standard.\n\nKarmtjockleken är den som gör mest skada. Alla andra tillverkare anger ett tak på 28 till 34 centimeter, vilket betyder att det finns en gräns och att den ligger inom det spannet. Hos Biltema kan du inte veta om stegen passar ditt fönster förrän du står med den i handen. Öppet köp löser det ekonomiskt men inte praktiskt, för den som upptäcker det vid en brand upptäcker det för sent.\n\nDet den gör rätt är längden och priset. 4,5 meter är den räckvidd en normal andravåning behöver, och 799 kronor är näst lägst i jämförelsen. Räknat i kronor per meter faktisk räckvidd är den billigast av alla. Finns dessutom att hämta i varuhus samma dag, vilket är värt något för en produkt man skjuter upp att köpa.\n\nOch 200 kilo är, av alla ironier, en av de mer trovärdiga uppgifterna i kategorin, just för att den är låg. De som anger 400 och 450 gör det utan att ange hur de kommit fram till det.",
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
    brand: "Skeppshultstegen",
    name: "Utrymningsstege i aluminium och plast",
    reason:
      "Fasta fasadstegar från 1 327 till 9 199 kronor hos Bauhaus, i längder från 2,7 till 7,5 meter. De löser ett annat problem: en fast monterad stege är det enda Boverkets byggregler räknar som utrymningsväg när fönstrets underkant sitter mer än fem meter över marken. En hängande stege gör aldrig det, oavsett hur lång den är. Får egen sida.",
    approxPrice: 1327,
    merchant: "Bauhaus",
    merchantUrl:
      "https://www.bauhaus.se/bygg/stegar-byggstallningar/stegar/utrymningsstegar",
  },
  {
    brand: "Clas Ohlson",
    name: "Utrymningsstege Trygg 4 meter",
    reason:
      "Butiken publicerar varken pris eller specifikation i sin strukturerade data, varumärket står som NONAME EXTERNT och produkten har noll omdömen. Vi rankar inte en säkerhetsprodukt där ingen av de uppgifter vi betygsätter går att läsa. Kontrollerat för hand 2026-08-02.",
    merchant: "Clas Ohlson",
    merchantUrl:
      "https://www.clasohlson.com/se/Utrymningsstege-Trygg-4-meter/p/34-4409",
  },
  {
    brand: "Housegard",
    name: "Brandstege 4,5 m hos Clas Ohlson",
    reason:
      "Samma stege som ligger tvåa, men Clas Ohlson tog 899 kronor mot Kjells 849 och hade den slut i lager när vi kontrollerade. Vi länkar till den butik som har produkten och lägst pris. Betyget 4,5 av 5 på 59 omdömen hos Clas Ohlson är det största kundunderlaget i kategorin och är värt att känna till.",
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
      "Det beror på hur högt fönstret sitter. Har du två våningar är Housegard EL45A hos Kjell för 849 kronor bäst köp: 4,5 meter räckvidd, karmtjocklek angiven till 15 till 34 centimeter och den enda produkten där tillverkaren över huvud taget anger en standard. Har du tre våningar finns bara ett alternativ i svensk handel, Brandvarnare.se sjumetersstege för 1 294 kronor. Sitter fönstrets underkant mer än fem meter över marken bör du i stället titta på en fast monterad stege, eftersom det är den enda typ Boverkets byggregler räknar som utrymningsväg.",
  },
  {
    question: "Hur lång brandstege behöver jag?",
    answer:
      "Mät från fönstrets underkant ner till marken, och lägg till lite marginal för att stegen ska nå ända ner. Som tumregel går det åt 2,5 till 3,5 meter per våningsplan beroende på takhöjd. En 4,5-metersstege täcker en normal andravåning. En stege på 4 till 4,3 meter blir knapp om huset har hög takhöjd. Över fem meter till marken är du utanför det byggreglerna räknar med att man klarar med en hängande stege.",
  },
  {
    question: "Vad betyder kilotalet på en brandstege?",
    answer:
      "Mindre än det ser ut att betyda. De sex stegar vi jämför anger 150, 200, 400 och 450 kilo, och ingen butik anger hur talet mätts. Det finns ingen produktstandard som gäller hängande brandstegar, så varje tillverkare mäter på sitt eget sätt. Att en stege anger 450 kilo och en annan 150 säger därför ingenting om vilken som är starkast, bara något om vem som mätt försiktigast. Housegard anger dessutom två tal samtidigt, 200 kilo rekommenderat och 450 testat.",
  },
  {
    question: "Är brandstegar certifierade?",
    answer:
      "Inte mot någon standard som gäller stegtypen. Två av produkterna hänvisar till EN 131-6. SIS beskriver den standardens omfattning som lutande och stående teleskopstegar, och en stege som hänger fritt i nylonband är ingetdera. Bauhaus anger dessutom utgåvan 2015, som SIS listar som tillbakadragen och ersatt av 2019. De fyra övriga anger ingen standard alls. Det är därför vårt kriterium heter dokumenterad provning och inte certifiering: vi betygsätter vad du kan kontrollera före köp.",
  },
  {
    question: "Måste man ha brandstege enligt lag?",
    answer:
      "Nej. Boverkets byggregler ställer krav på hur en byggnad utformas, inte på vad du äger, och en hängande stege räknas aldrig som utrymningsväg i reglernas mening. Bara en fast monterad stege gör det. Det byggreglerna däremot säger rakt ut är vad alternativet är: sitter fönstrets underkant högst fem meter över marken accepteras att man utrymmer genom att hoppa, och Boverket skriver själva att man då riskerar att skadas. Det är det bästa argumentet för att ha en stege, och det är starkare än något butikerna formulerar.",
  },
  {
    question: "Kan man öva med en brandstege?",
    answer:
      "Med de flesta, men inte med alla. Julas Hard Head-stege är enligt butikens egen text endast avsedd för engångsbruk, alltså kan du inte pröva den utan att förbruka den. Brandvarnare.se beskriver tvärtom hur du övar i två nivåer: bara hänga stegen över karmen, eller hänga och fälla ut den hela vägen ner. Det andra sliter på stegen och kräver att du kontrollerar den efteråt. Öva minst upphängningen, för det momentet är det som är svårast att göra rätt i mörker.",
  },
  {
    question: "Hur tjock fönsterkarm klarar en brandstege?",
    answer:
      "Krokarna hakas över karmen och har en gräns. Jula anger högst 28 centimeter, Nexa och Brandvarnare.se högst 30, och Housegard anger som enda tillverkare ett intervall, 15 till 34 centimeter. Minimum spelar roll också: en alltför tunn karm ger krokarna för lite grepp. Biltema anger ingen uppgift alls. Mät karmen vid det fönster du tänkt använda innan du beställer, det tar en minut och är det billigaste du kan göra för din säkerhet i den här kategorin.",
  },
  {
    question: "Hur ofta ska en brandstege bytas?",
    answer:
      "Housegard rekommenderar att stegen byts efter sex till åtta år och kontrolleras minst två gånger om året. Banden är av nylon och försvagas av tid, värme och solljus, så förvara stegen inomhus, inte över 50 grader och inte i direkt solljus. Jula ger samma råd om kontroll två gånger om året. Ingen av butikerna vi läst för utbytesintervallet vidare, och ingen svensk jämförelse nämner att produkten har en livslängd alls.",
  },
  {
    question: "Var ska brandstegen förvaras?",
    answer:
      "I eller alldeles intill det rum vars fönster du tänkt utrymma genom, inte i förrådet eller garaget. Under sängen eller i garderoben i sovrummet är det vanligaste svaret. Housegard levererar sin i en väska och Brandvarnare.se lägger med ett klistermärke att sätta på dörren där stegen förvaras, så att någon annan hittar den. Se också till att alla i hushållet vet var den ligger och hur den hakas på, eftersom den som behöver den kanske inte är den som köpte den.",
  },
];
