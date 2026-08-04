import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { LUFTKVALITETSMATARE } from "@/lib/test-pages";

/**
 * Luftkvalitetsmätare. Underlag i .agent/research/luftkvalitetsmatare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, GTIN, givaruppsättningar och
 * Airthings angivna noggrannhet. Allt läst 2026-08-04 hos Clas Ohlson via
 * webbläsare med kakorna avvisade, hos Proshop i deras strukturerade data,
 * eller hos tillverkaren.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte mätt någon luft,
 * inte provat någon mätare och inte jämfört någon avläsning mot ett
 * referensinstrument.
 *
 * ## Sidans fynd
 *
 * **Tre av åtta kartlagda mätare saknar koldioxidgivare helt**, trots att de
 * säljs som luftkvalitetsmätare, och en fjärde anger `eCO2`. Det är ett tal
 * uträknat ur halten flyktiga organiska ämnen och inte en mätning av
 * koldioxid, och det stiger av en doftspray i ett tomt rum. Ordet står i Clas
 * Ohlsons egen produkttext för Mill Sense.
 *
 * Airthings använder NDIR och publicerar ±30 ppm ±3 % mellan 15 och 35 °C.
 * Samma mönster som `/hygrometer`, fast vänt: den som har en riktig givare
 * skriver också ut vad den klarar.
 *
 * **View Radon kostar 1 899 kronor och mäter radon, fukt och temperatur.**
 *
 * ## ⚠️ Radonregeln påverkar inte betygen
 *
 * Användarbeslut 2026-08-04. Strålsäkerhetsmyndigheten skriver att en
 * korttidsmätning bara är rådgivande och inte kan användas för något
 * myndighetsbeslut, och att en giltig långtidsmätning kräver spårfilm i minst
 * två månader mellan 1 oktober och 30 april, i minst två rum, beställd genom
 * ett ackrediterat laboratorium. Det står i köpguiden och i FAQ.
 *
 * `beslutsnytta` mäter **om avläsningen går att agera på**, inte om den duger
 * till ett myndighetsbeslut. Radonmätarnas nytta är verklig: de säger om det är
 * värt att beställa den riktiga mätningen, och de visar säsongsvariation och om
 * en åtgärd hjälpte. Spårfilmen gör inte det. `eCO2` straffas däremot hårt,
 * eftersom talet inte motsvarar någon storhet som finns i rummet.
 *
 * ## ⚠️ Två saker som inte får skrivas in
 *
 * 1. **Inget pris på en ackrediterad radonmätning.** Sökresultat gav 320, 600
 *    och omkring 1 000 kronor, och laboratoriernas egna produktsidor svarar 404.
 * 2. **Netatmos noggrannhet är inte fastställd.** Deras specifikationssida
 *    svarade 404 och uppgiften står som ej angiven, inte som en nolla.
 *
 * ## Betygstalen är inte jämförbara mellan butikerna
 *
 * Clas Ohlson publicerar `reviewCount`, Proshop publicerar inget alls. Kjells
 * `ratingCount` ligger tre till fem gånger högre för samma sorts produkt, så
 * talen här ska aldrig ställas mot ett Kjell-tal på en annan sida.
 *
 * ## Sex av produkterna är Airthings
 *
 * Det beror på att märket dominerar sortimentet, inte
 * på något annat. De hamnar dessutom på fyra skilda platser i rankningen, från
 * första till näst sist, vilket är rimligt eftersom givaruppsättningarna
 * skiljer sig från sju givare till tre.
 */

export const PRICE_CHECKED = "2026-08-04";

const CLAS_OHLSON = "Clas Ohlson";
const PROSHOP = "Proshop";

const SEEDS: Omit<Product, "score" | "rating">[] = [
  {
    id: "airthings-view-plus",
    name: "View Plus",
    shortName: "View Plus",
    brand: "Airthings",
    image: productImage(LUFTKVALITETSMATARE.slug, "airthings-view-plus"),
    tagline: "Sju givare, och koldioxiden mäts på riktigt.",
    scores: {
      givare: 5,
      beslutsnytta: 4.5,
      avlasning: 5,
      noggrannhet: 4.5,
      prisvarde: 3,
    },
    price: 2856,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Airthings-View-Plus-Smart-Radon-and-Air-Quality-Monitor/2990814",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bredaste givaruppsättningen",
    pros: [
      "Sju givare: radon, partiklar, VOC, koldioxid, fukt, temperatur och lufttryck",
      "NDIR för koldioxid, med angiven noggrannhet ±30 ppm ±3 %",
      "Partikelmätning, som ingen annan av de rankade har",
      "Inbyggd display, så värdet syns utan att du öppnar appen",
      "1,2 av 5,0 för mätningarna hos Stiftung Warentest, där 1,0 är bäst",
    ],
    cons: [
      "Dyrast av de sju, 2 856 kronor",
      "443 kronor dyrare hos Clas Ohlson än hos Proshop för samma vara",
      "Radonvärdet duger inte till ett myndighetsbeslut, se köpguiden",
    ],
    specs: [
      { label: "Pris", value: "2 856 kr", highlight: true },
      {
        label: "Mäter",
        value: "Radon, PM, VOC, CO2, fukt, temp, tryck",
        highlight: true,
      },
      { label: "CO2-teknik", value: "NDIR", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "± 30 ppm ± 3 % (CO2)",
        highlight: true,
      },
      { label: "Avläsning", value: "Display och app", highlight: true },
      { label: "Radon", value: "Ja" },
      { label: "Partiklar", value: "Ja, PM2,5" },
      { label: "Uppkoppling", value: "Wifi, app" },
      { label: "Loggning", value: "Ja" },
      { label: "Testomdöme", value: "1,2 för mätning, Stiftung Warentest" },
      { label: "GTIN", value: "7090031109608" },
    ],
    verdict:
      "Sju givare, och ensam bland de rankade om att mäta partiklar. Den är också den enda någon oberoende har provat: Stiftung Warentest gav den 1,2 för mätningarna, alltså sehr gut på en skala där 1,0 är bäst, och 1,9 totalt.\n\nKoldioxiden mäts med NDIR, genom hur infrarött ljus absorberas av gasen. Airthings anger ±30 ppm ±3 % mellan 15 och 35 grader. Det är den tydligaste noggrannhetsuppgiften någon tillverkare här publicerar, och tre av de sju anger ingenting alls.\n\nSkillnaden mot en eCO2-mätare är inte en nyans. Ett eCO2-tal räknas fram ur halten flyktiga organiska ämnen och stiger av en doftspray i ett tomt rum. Ett NDIR-tal stiger när det finns mer koldioxid i luften.\n\nPartikelmätningen är det andra som skiljer. PM2,5 är det värde som säger något när gatan utanför är trafikerad eller när grannen eldar. Ingen annan av de rankade har den givaren, och bland de övervägda finns den bara hos Uni-T A25D.\n\nDisplayen gör att värdena syns i förbifarten. Flera av de billigare kräver att du öppnar appen, och en mätare man måste öppna en app för att läsa blir en mätare man läser en gång i månaden.\n\nPriset är det högsta av de sju. Notera samtidigt att samma apparat kostar 3 299 kronor hos Clas Ohlson, 443 kronor mer. Det är värt att kontrollera båda innan du köper.\n\nOch en sak som betyget inte tar hänsyn till, men som du behöver veta om du köper den för radonet: den siffran duger inte till ett myndighetsbeslut. Köpguiden förklarar vad som krävs i stället.",
  },
  {
    id: "airthings-wave-plus",
    name: "Wave Plus",
    shortName: "Wave Plus",
    brand: "Airthings",
    image: productImage(LUFTKVALITETSMATARE.slug, "airthings-wave-plus"),
    tagline: "Samma givare som toppen, utan partiklar och utan display.",
    scores: {
      givare: 4.5,
      beslutsnytta: 4.5,
      avlasning: 3.5,
      noggrannhet: 4.5,
      prisvarde: 4,
    },
    price: 1999,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Airthings-Wave-Plus,-smart-luftmatare-och-radonmatare/p/41-1802",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 317, checkedAt: PRICE_CHECKED },
    superlative: "857 kronor billigare än toppen",
    pros: [
      "Sex givare: radon, VOC, koldioxid, fukt, temperatur och lufttryck",
      "Samma NDIR-givare och samma angivna ±30 ppm ±3 % som toppen",
      "857 kronor billigare än View Plus",
      "317 omdömen hos butiken, största kundunderlaget av de sju",
    ],
    cons: [
      "Ingen partikelmätning",
      "Ingen display, utan en färgring du väcker genom att vifta framför",
      "220 kronor dyrare hos Proshop än hos Clas Ohlson",
    ],
    specs: [
      { label: "Pris", value: "1 999 kr", highlight: true },
      {
        label: "Mäter",
        value: "Radon, VOC, CO2, fukt, temp, tryck",
        highlight: true,
      },
      { label: "CO2-teknik", value: "NDIR", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "± 30 ppm ± 3 % (CO2)",
        highlight: true,
      },
      { label: "Avläsning", value: "Färgring och app", highlight: true },
      { label: "Radon", value: "Ja" },
      { label: "Partiklar", value: "Nej" },
      { label: "Uppkoppling", value: "Bluetooth och wifi via hubb, app" },
      { label: "Loggning", value: "Ja" },
      { label: "GTIN", value: "7090031109301" },
    ],
    verdict:
      "Airthings Wave Plus kostar 1 999 kronor och mäter sex storheter. Skillnaden mot View Plus är 857 kronor, partikelgivaren och displayen.\n\nGivarna är samma på nära håll: radon, VOC, koldioxid med NDIR, fukt, temperatur och lufttryck. Samma angivna ±30 ppm ±3 %. Det som saknas är partikelmätningen, och den är värd något först om du bor vid en trafikerad gata eller har vedeldning i närheten.\n\nDet andra som saknas är displayen. Wave Plus har i stället en färgring på ovansidan som tänds när du viftar framför den, grönt, gult eller rött. Du får en känsla, inte ett tal, och för talet behöver du telefonen.\n\nDet är en verklig försämring och skälet till att den ligger tvåa och inte etta. En mätare vars värde kräver att du öppnar en app blir en mätare du läser sällan.\n\n317 omdömen hos Clas Ohlson med 4,5 i snitt är det största kundunderlaget av de sju. Det säger inget om noggrannheten och en del om att apparaten håller.\n\nJämför butikerna innan du köper. Den kostar 1 999 hos Clas Ohlson och 2 219 hos Proshop, 220 kronor mer på det andra stället.",
  },
  {
    id: "airthings-wave-enhance",
    name: "Wave Enhance",
    shortName: "Wave Enhance",
    brand: "Airthings",
    image: productImage(LUFTKVALITETSMATARE.slug, "airthings-wave-enhance"),
    tagline: "Riktig koldioxidgivare till halva toppens pris.",
    scores: {
      givare: 3.5,
      beslutsnytta: 4.5,
      avlasning: 4,
      noggrannhet: 4.5,
      prisvarde: 4.5,
    },
    price: 1441,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Airthings-Wave-Enhance-kompakt-luftkvalitetsmaetare-foer-inomhusluft/3443877",
    priceCheckedAt: PRICE_CHECKED,
    award: "editor",
    superlative: "Billigaste NDIR-mätaren",
    pros: [
      "Riktig NDIR-givare för koldioxid, med angiven noggrannhet",
      "Billigaste vägen till ett koldioxidtal du kan agera på",
      "Mäter även ljudnivå, vilket är ovanligt och användbart i ett sovrum",
      "Halva priset mot View Plus",
    ],
    cons: [
      "Ingen radonmätning och ingen partikelmätning",
      "Bara 3,0 i kundbetyg hos Clas Ohlson, men på tre omdömen",
      "Fyra givare mot toppens sju",
    ],
    specs: [
      { label: "Pris", value: "1 441 kr", highlight: true },
      {
        label: "Mäter",
        value: "CO2, fukt, temp, ljudnivå",
        highlight: true,
      },
      { label: "CO2-teknik", value: "NDIR", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "± 30 ppm ± 3 % (CO2)",
        highlight: true,
      },
      { label: "Avläsning", value: "Ljusring och app", highlight: true },
      { label: "Radon", value: "Nej" },
      { label: "Partiklar", value: "Nej" },
      { label: "Uppkoppling", value: "Wifi, app" },
      { label: "GTIN", value: "7090031100216" },
    ],
    verdict:
      "Airthings Wave Enhance kostar 1 441 kronor och är den billigaste vägen till ett koldioxidtal som betyder något. Ska du bara mäta en sak inomhus är det koldioxid du ska mäta.\n\nGivaren är NDIR med samma angivna ±30 ppm ±3 % som de två dyrare. Den ligger på 1 441 kronor hos Proshop, halva View Plus. För 700 kronor mindre får du Mill Sense, som anger eCO2 i stället, och det är en helt annan sorts tal.\n\nKoldioxid är dessutom det värde som är lättast att agera på. Stiger det över ungefär tusen ppm i ett sovrum betyder det att luftväxlingen inte räcker för antalet personer i rummet, och åtgärden är att öppna ett fönster eller ställa upp dörren. Ingen annan storhet har en lika enkel koppling mellan tal och handling.\n\nDen mäter också ljudnivå, vilket låter som en gimmick tills man tänker på var mätaren står. I ett sovrum är ljudnivån om natten en sak man faktiskt vill veta.\n\nDet som saknas är radon och partiklar. Vill du ha radon behöver du en av de dyrare, och läs då köpguiden först, för det talet duger inte till ett myndighetsbeslut.\n\nKundbetyget är 3,0 hos Clas Ohlson, lägst av de sju, men det bygger på tre omdömen och säger därför nästan ingenting. Betrakta det som frånvaro av underlag snarare än som ett underkännande.",
  },
  {
    id: "netatmo-luftkvalitetsmatare",
    name: "Smart luftkvalitetsmätare inomhus",
    shortName: "Netatmo",
    brand: "Netatmo",
    image: productImage(LUFTKVALITETSMATARE.slug, "netatmo-luftkvalitetsmatare"),
    tagline: "Koldioxid och ljud, men toleransen står ingenstans.",
    scores: {
      givare: 3.5,
      beslutsnytta: 4,
      avlasning: 4,
      noggrannhet: 3,
      prisvarde: 4,
    },
    price: 1199,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Netatmo-smart-luftkvalitetsmatare-inomhus/p/36-8764",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 7, checkedAt: PRICE_CHECKED },
    superlative: "Billigast med koldioxidgivare",
    pros: [
      "Mäter koldioxid, ljudnivå, fukt och temperatur",
      "Billigast av dem som har en koldioxidgivare",
      "Färgindikator på höljet, så läget syns utan telefonen",
    ],
    cons: [
      "Ingen noggrannhet publicerad, till skillnad från Airthings",
      "Ingen radonmätning och ingen partikelmätning",
      "Sju omdömen hos butiken, för tunt för att säga något",
    ],
    specs: [
      { label: "Pris", value: "1 199 kr", highlight: true },
      { label: "Mäter", value: "CO2, ljud, fukt, temp", highlight: true },
      { label: "CO2-teknik", value: "Ej angiven", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Avläsning", value: "Färgindikator och app", highlight: true },
      { label: "Radon", value: "Nej" },
      { label: "Partiklar", value: "Nej" },
      { label: "Uppkoppling", value: "Wifi, app" },
    ],
    verdict:
      "Netatmo kostar 1 199 kronor och är billigast av mätarna med koldioxidgivare. Den tappar mot Airthings på en enda punkt: ingen tolerans står någonstans.\n\nDen mäter koldioxid, ljudnivå, fukt och temperatur, samma fyra storheter som Wave Enhance för 242 kronor mindre. Höljet lyser i olika färger efter läget, så du ser om något är fel utan att plocka upp telefonen.\n\nSkillnaden ligger i vad tillverkaren berättar. Airthings anger ±30 ppm ±3 % och beskriver givaren som NDIR. Netatmos specifikationssida gick inte att nå när vi läste, och varken butiken eller något datablad vi hittat anger vilken teknik givaren använder eller hur mycket den får visa fel. Det behöver inte betyda att den är sämre. Det betyder att du inte kan kontrollera det i förväg, och noggrannheten väger 15 av 100 här.\n\nSju omdömen hos Clas Ohlson är för tunt för att säga något om hur den håller.\n\nDen är ett rimligt köp om du vill ha koldioxid och ljud och inte bryr dig om radon eller partiklar. Vill du kunna kontrollera vad givaren utfäster är Wave Enhance det tryggare valet.",
  },
  {
    id: "airthings-view-radon",
    name: "View Radon",
    shortName: "View Radon",
    brand: "Airthings",
    image: productImage(LUFTKVALITETSMATARE.slug, "airthings-view-radon"),
    tagline: "1 899 kronor för radon, fukt och temperatur.",
    scores: {
      givare: 2,
      beslutsnytta: 3.5,
      avlasning: 4.5,
      noggrannhet: 3.5,
      prisvarde: 2,
    },
    price: 1899,
    merchant: PROSHOP,
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Airthings-View-Radon/3051742",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Störst display av de sju",
    pros: [
      "Stor display med radonvärdet direkt avläsbart",
      "Löpande mätning år efter år, vilket en spårfilmsdosa inte ger",
      "Visar om en åtgärd mot radon har hjälpt",
    ],
    cons: [
      "Tre givare för 1 899 kronor, dyrast per givare av de sju",
      "Ingen koldioxid, inga partiklar, ingen VOC",
      "Wave Plus kostar 100 kronor mer och mäter tre saker till",
    ],
    specs: [
      { label: "Pris", value: "1 899 kr", highlight: true },
      { label: "Mäter", value: "Radon, fukt, temp", highlight: true },
      { label: "CO2-teknik", value: "Ingen CO2-givare", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Avläsning", value: "Stor display och app", highlight: true },
      { label: "Radon", value: "Ja" },
      { label: "Partiklar", value: "Nej" },
      { label: "Uppkoppling", value: "Wifi, app" },
    ],
    verdict:
      "Airthings View Radon ger tre givare för 1 899 kronor, dyrast per givare av de sju.\n\nDen mäter radon, luftfuktighet och temperatur. Wave Plus kostar 100 kronor mer och lägger till koldioxid med NDIR, VOC och lufttryck. Det är svårt att hitta ett läge där den här är det bättre köpet av de två.\n\nDet den gör bra är avläsningen. Displayen är störst av de sju och visar radonvärdet direkt, utan telefon, vilket spelar roll om apparaten står i en källare du passerar.\n\nOch en sak den gör som ingen spårfilmsdosa gör: den mäter löpande, år efter år. Radon varierar kraftigt med årstid, ventilation och lufttryck, och en dosa ger dig ett medelvärde för en vinter. Den här visar kurvan, och den visar om en åtgärd har hjälpt. Det är en verklig nytta och skälet till att den inte hamnar sist.\n\nMen läs köpguiden innan du köper den för radonets skull. Ska du ha ett tal som gäller vid en husförsäljning, ett radonbidrag eller ett tillsynsärende är det inte den här apparaten du behöver, och Strålsäkerhetsmyndigheten är tydlig med varför.",
  },
  {
    id: "airthings-wave-mini",
    name: "Wave Mini",
    shortName: "Wave Mini",
    brand: "Airthings",
    image: productImage(LUFTKVALITETSMATARE.slug, "airthings-wave-mini"),
    tagline: "Ingen koldioxidgivare, trots namnet på hyllan.",
    scores: {
      givare: 2,
      beslutsnytta: 2.5,
      avlasning: 3,
      noggrannhet: 2.5,
      prisvarde: 3.5,
    },
    price: 785,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Airthings-Wave-Mini-kompakt-och-maangsidig-luftkvalitetsmaetare-med-riskindikator-foer-moegel/2797716",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Billigast av de sju",
    pros: [
      "Billigast av de sju, 785 kronor",
      "Mögelrisken räknas fram ur fukt och temperatur över tid",
      "Liten nog att ställa var som helst",
    ],
    cons: [
      "Ingen koldioxidgivare, vilket är den givare de flesta tror att de köper",
      "Ingen display, bara färgring och app",
      "Mögelrisken är ett härlett tal och ingen mätning av mögel",
    ],
    specs: [
      { label: "Pris", value: "785 kr", highlight: true },
      {
        label: "Mäter",
        value: "VOC, fukt, temp, härledd mögelrisk",
        highlight: true,
      },
      { label: "CO2-teknik", value: "Ingen CO2-givare", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Avläsning", value: "Färgring och app", highlight: true },
      { label: "Radon", value: "Nej" },
      { label: "Partiklar", value: "Nej" },
      { label: "VOC", value: "Ja" },
      { label: "GTIN", value: "7090031109202" },
    ],
    verdict:
      "Airthings Wave Mini kostar 785 kronor och saknar koldioxidgivare, den givare de flesta luftkvalitetsmätare säljs på.\n\nWave Mini mäter flyktiga organiska ämnen, fukt och temperatur. Ingen koldioxid. Det står i butikens produkttext, men det står inte i namnet, och en luftkvalitetsmätare för 785 kronor från samma märke som de dyra är lätt att ta för en billigare version av samma sak. Den mäter andra saker.\n\nMögelrisken är värd en förklaring. Den är inte en mätning av mögel utan ett tal som räknas fram ur hur fukt och temperatur legat över tid, alltså en modell av när förhållandena gynnar mögeltillväxt. Det är användbart i en källare eller ett badrum, och det ska inte förväxlas med att apparaten upptäckt något.\n\nVOC-värdet är det svåraste av alla att göra något åt. Det stiger av städmedel, nymålade väggar, möbler och matlagning, och åtgärden är nästan alltid att vädra. Det är sällan en upplysning som ändrar vad du gör.\n\nVill du mäta fukt räcker en hygrometer för en tredjedel av priset. Vill du mäta luften i den mening folk brukar avse är det koldioxiden du är ute efter, och då är Wave Enhance den billigaste vägen dit.",
  },
  {
    id: "mill-sense",
    name: "Sense luftkvalitetsmätare",
    shortName: "Mill Sense",
    brand: "Mill",
    image: productImage(LUFTKVALITETSMATARE.slug, "mill-sense"),
    tagline: "Talet den kallar koldioxid är uträknat, inte uppmätt.",
    scores: {
      givare: 2,
      beslutsnytta: 2,
      avlasning: 3.5,
      noggrannhet: 2,
      prisvarde: 3.5,
    },
    price: 729,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Luftkvalitetsmatare-Mill-Sense/p/36-8155",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 37, checkedAt: PRICE_CHECKED },
    superlative: "Finns som trepack",
    pros: [
      "Billig nog att sätta i flera rum, och säljs som trepack",
      "37 omdömen hos butiken, näst största underlaget av de sju",
      "Appstyrd med historik",
    ],
    cons: [
      "Anger eCO2, ett tal uträknat ur VOC-halten och ingen koldioxidmätning",
      "Ingen noggrannhet publicerad",
      "Ingen radon- eller partikelmätning",
    ],
    specs: [
      { label: "Pris", value: "729 kr", highlight: true },
      {
        label: "Mäter",
        value: "Fukt, VOC, temp, eCO2",
        highlight: true,
      },
      { label: "CO2-teknik", value: "eCO2, härlett ur VOC", highlight: true },
      {
        label: "Angiven noggrannhet",
        shortLabel: "Noggrannhet",
        value: "Ej angiven",
        highlight: true,
      },
      { label: "Avläsning", value: "App", highlight: true },
      { label: "Radon", value: "Nej" },
      { label: "Partiklar", value: "Nej" },
      { label: "VOC", value: "Ja" },
    ],
    verdict:
      "Mill Sense kostar 729 kronor, och butikens egen produkttext säger eCO2. Det lilla e:et är hela skillnaden.\n\nEn NDIR-givare mäter koldioxid genom hur gasen absorberar infrarött ljus. En eCO2-uppgift kommer från en VOC-givare, som mäter flyktiga organiska ämnen och sedan räknar om resultatet till ett koldioxidliknande tal. Antagandet bakom omräkningen är att det som tillför organiska ämnen till rummet är människor som andas.\n\nDet antagandet håller ibland. Det håller inte när någon sprejar deodorant, öppnar en burk lösningsmedel, lagar mat eller nyligen målat, och då stiger det uträknade koldioxidtalet i ett rum där ingen befinner sig. Åt andra hållet kan talet ligga stilla i ett fullsatt rum med god ventilation och dålig lukt.\n\nDärför får den låg beslutsnytta trots att appen visar ett tal som ser precis lika användbart ut som Airthings. Ett värde du inte kan agera på är inte ett värde.\n\nDet som talar för den är priset och att den säljs som trepack, vilket gör det möjligt att mäta i flera rum. Går du den vägen mäter du fukt och VOC i tre rum, inte koldioxid.\n\n37 omdömen med 4,0 i snitt säger att folk är nöjda med apparaten som produkt. Det säger inget om vad talet betyder.",
  },
];

export const LUFTKVALITETSMATARE_PRODUCTS: Product[] = resolveProducts(
  LUFTKVALITETSMATARE,
  SEEDS,
);

/**
 * Övervägda men inte rankade.
 *
 * De två första ligger i butikens luftmätarkategori men mäter något annat, och
 * vi har egna sidor för dem. Att butiken sorterar så är butikens indelning.
 */
export const LUFTKVALITETSMATARE_CONSIDERED: ConsideredProduct[] = [
  {
    brand: "Airthings",
    name: "Corentium Home 2",
    reason:
      "1 947 kronor för en digital radondetektor som bara mäter radon, utan app och utan uppkoppling. Den är byggd för en sak och gör den enkelt, men i den här jämförelsen konkurrerar den med Wave Plus som kostar 48 kronor mer och lägger till fem givare. Läs dessutom köpguiden om vad ett digitalt radonvärde duger till innan du väljer någon av dem.",
    approxPrice: 1947,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Airthings-Corentium-Home-2-enkel-och-smart-digital-radondetektor/3443875",
  },
  {
    brand: "Uni-T",
    name: "A25D portabel luftkvalitetsmätare",
    reason:
      "999 kronor för en bärbar mätare med belyst display som visar PM2,5, temperatur och fukt. Partikelmätning för under tusenlappen är ovanligt och gör den intressant, men den saknar app och historik, och tillverkaren marknadsför den mot skolor, kontor och lager snarare än mot hemmet. Utan loggning kan du se ett ögonblicksvärde men inte om luften blivit bättre.",
    approxPrice: 999,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Uni-T-A25D-portabel-luftkvalitetsmatare-inomhus/p/36-9476",
  },
  {
    brand: "Mill",
    name: "Sense luftkvalitetsmätare, trepack",
    reason:
      "1 699 kronor för tre enheter, 566 kronor styck mot 729 för en. Rabatten är verklig och tanken att mäta i flera rum är riktig, men produkten anger eCO2 och inte uppmätt koldioxid. Tre mätare som visar ett uträknat tal ger dig tre uträknade tal. Vill du mäta fukt i flera rum är en hygrometer billigare.",
    approxPrice: 1699,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Luftkvalitetsmatare-Mill-Sense/p/36-8156",
  },
  {
    brand: "Sensibo",
    name: "Room Sensor smart rumssensor",
    reason:
      "559 kronor, och den ligger i butikens luftmätarkategori trots att den mäter temperatur och luftfuktighet. Det gör den till en hygrometer, inte en luftkvalitetsmätare, och den hör hemma i den jämförelsen i stället. Den är dessutom byggd för att styra en luftvärmepump via Sensibos egen enhet, vilket gör den till en systemkomponent snarare än ett mätinstrument.",
    approxPrice: 559,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Sensibo-Room-Sensor-smart-rumssensor-inomhus/p/36-77",
  },
  {
    brand: "Netatmo",
    name: "Smart kolmonoxidvarnare",
    reason:
      "1 099 kronor, och den ligger nära i butikens sortiment men löser en annan uppgift. En kolmonoxidvarnare larmar vid en gas som kan döda på timmar, och den är en säkerhetsprodukt med egna krav och egen standard. Den ska inte vägas mot mätare som visar hur luften mår, och vi jämför den på vår sida om kolmonoxidvarnare i stället.",
    approxPrice: 1099,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Netatmo-smart-kolmonoxidvarnare/p/36-8763",
  },
  {
    brand: "Airthings",
    name: "Corentium Home",
    reason:
      "Föregångaren till Corentium Home 2 och fortfarande i handeln. Den mäter radon och visar värdet på en enkel display utan app. Vi rankar den inte eftersom efterföljaren finns i samma butik och gör samma sak, men den är ett rimligt köp om du hittar den billigare och bara vill ha en löpande radonavläsning.",
    merchant: PROSHOP,
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Airthings-Corentium-Home/2797713",
  },
];

/**
 * Vanliga frågor.
 *
 * ⚠️ Radonfrågorna återger Strålsäkerhetsmyndighetens vägledning och ska
 * aldrig påstå något som inte står där. Vi anger **inget pris** på en
 * ackrediterad mätning: laboratoriernas produktsidor svarade 404 och
 * sökresultaten gav tre olika tal.
 */
export const LUFTKVALITETSMATARE_FAQ = [
  {
    question: "Vilken luftkvalitetsmätare är bäst 2026?",
    answer:
      "Airthings View Plus för 2 856 kronor hos Proshop. Den har sju givare och mäter radon, partiklar, flyktiga organiska ämnen, koldioxid, luftfuktighet, temperatur och lufttryck. Koldioxiden mäts med en NDIR-givare, genom hur infrarött ljus absorberas av gasen, och Airthings anger noggrannheten till ±30 ppm ±3 procent mellan 15 och 35 grader. Den har dessutom display, så värdena syns utan att du öppnar appen. Notera att samma apparat kostar 3 299 kronor hos Clas Ohlson, 443 kronor mer. Tvåa är Airthings Wave Plus för 1 999 kronor, som har samma koldioxidgivare men saknar partikelmätning och display.",
  },
  {
    question: "Kan jag använda en digital radonmätare vid en husförsäljning?",
    answer:
      "Nej. Strålsäkerhetsmyndigheten skriver att en korttidsmätning bara är rådgivande och inte kan användas för något myndighetsbeslut. För ett värde som gäller krävs en långtidsmätning som ger ett årsmedelvärde: minst två månader, mellan 1 oktober och 30 april, i minst två rum, med mätdosor som beställs genom och skickas tillbaka till ett ackrediterat mätlaboratorium. Det gäller lika mycket vid en husförsäljning som vid en ansökan om radonbidrag eller ett tillsynsärende. En digital mätare är alltså ingen genväg förbi den mätningen, men den är ett bra sätt att ta reda på om det är värt att beställa den.",
  },
  {
    question: "Vad är skillnaden mellan CO2 och eCO2?",
    answer:
      "En NDIR-givare mäter koldioxid direkt, genom hur mycket infrarött ljus gasen absorberar. Ett eCO2-värde är i stället uträknat: apparaten mäter halten flyktiga organiska ämnen och räknar sedan om den till ett koldioxidliknande tal, med antagandet att det som tillför organiska ämnen till rummet är människor som andas. Antagandet håller ibland och ibland inte. Sprejar någon deodorant, lagar mat eller öppnar en burk lösningsmedel stiger det uträknade talet i ett rum där ingen befinner sig. Vill du veta om det behöver vädras är det ett riktigt koldioxidvärde du är ute efter.",
  },
  {
    question: "Vilket koldioxidvärde är för högt inomhus?",
    answer:
      "Utomhusluft ligger kring 400 ppm, och inomhus stiger värdet med hur många som vistas i rummet och hur mycket luft som byts ut. Runt 1 000 ppm brukar användas som den punkt där luftväxlingen inte längre räcker för antalet personer, och åtgärden är enkel: öppna ett fönster eller ställ upp dörren. Det är därför koldioxid är det mest användbara värdet en luftkvalitetsmätare kan visa, för till skillnad från de flesta andra tal har det en direkt koppling till en handling du kan utföra på tio sekunder.",
  },
  {
    question: "Behöver jag mäta partiklar hemma?",
    answer:
      "Det beror helt på var du bor. PM2,5 är små partiklar från trafik, vedeldning och matlagning, och de är intressanta att mäta om du bor vid en trafikerad gata, har grannar som eldar med ved eller själv har en braskamin. Bor du lugnt och lagar mat med fläkten på kommer värdet att ligga lågt nästan jämt, och då är det en givare du betalar för utan att lära dig något. Bland de rankade är det bara Airthings View Plus som har partikelgivare, och bland de övervägda finns den hos Uni-T A25D.",
  },
  {
    question: "Är det värt att köpa en mätare som bara visar VOC?",
    answer:
      "Sällan, och skälet är att värdet är svårt att göra något åt. Flyktiga organiska ämnen stiger av städmedel, nymålade väggar, nya möbler, matlagning och parfym, och åtgärden är nästan alltid densamma: vädra. Ett VOC-värde talar alltså sällan om något du inte redan kunde lukta dig till. Det är mer användbart som en trend över tid, exempelvis efter en renovering, än som ett ögonblicksvärde. Vill du ha ett tal du kan handla på är koldioxid det bättre valet.",
  },
  {
    question: "Vad betyder mögelrisk på en luftkvalitetsmätare?",
    answer:
      "Det är inte en mätning av mögel. Apparaten har ingen givare som kan upptäcka mögelsporer. I stället räknas ett risktal fram ur hur luftfuktigheten och temperaturen legat över tid, alltså en modell av när förhållandena gynnar mögeltillväxt. Det är användbart i en källare eller ett badrum där du vill se ett mönster snarare än ett ögonblick, men ett högt risktal betyder att förutsättningarna finns, inte att något växer. Ser du eller luktar du mögel är det en fackman som ska titta, inte en display.",
  },
  {
    question: "Var ska luftkvalitetsmätaren stå?",
    answer:
      "I det rum vars luft du vill veta något om, i ungefär den höjd där du vistas, och en bit från fönster, dörrar och ventiler. En mätare precis vid en tilluftsventil mäter uteluften och inte rummet, och en i direkt solljus får en temperatur som inte stämmer. För koldioxid är sovrummet oftast det mest upplysande stället, eftersom det är där flest personer andas i ett stängt rum under flest timmar. Ska du mäta radon gäller andra regler, och de står i Strålsäkerhetsmyndighetens vägledning.",
  },
  {
    question: "Hur ofta behöver mätaren kalibreras?",
    answer:
      "En NDIR-givare för koldioxid driver långsamt över tid, och de flesta apparater hanterar det med en automatisk nollställning som utgår från att rummet någon gång under en period är nästan tomt och därmed ligger nära utomhusnivån. Det fungerar i ett vanligt hem men sämre i ett rum som aldrig står tomt. Vill du kontrollera en mätare kan du ta ut den och låta den stå i friluft en stund, där värdet bör hamna omkring 400 ppm. Vi har inte utfört den kontrollen på någon av mätarna här och redovisar därför inga resultat från den.",
  },
  {
    question: "Ersätter en luftkvalitetsmätare en luftrenare?",
    answer:
      "Nej, de gör motsatta saker. Mätaren berättar hur luften är, luftrenaren ändrar den. De hör ändå ihop, eftersom en luftrenare utan mätning är svår att utvärdera: du vet inte om den gör nytta eller om filtret behöver bytas. Har du redan en luftrenare är en mätare med partikelgivare det som visar om den faktiskt sänker partikelhalten. Har du ingendera och vill veta var du ska börja, mät först. Det är billigare, och i en del fall visar mätningen att du inte behöver rena något alls.",
  },
  {
    question: "Varför skiljer sig priset så mycket mellan butikerna?",
    answer:
      "Det gör det i den här kategorin på ett sätt som är värt att känna till. Airthings View Plus kostar 2 856 kronor hos Proshop och 3 299 hos Clas Ohlson, 443 kronor mer. Åt andra hållet kostar Wave Plus 1 999 hos Clas Ohlson och 2 219 hos Proshop. Det finns alltså ingen butik som genomgående är billigast, och skillnaderna är stora nog att motivera en kontroll av båda innan du köper. Priserna här är lästa hos den butik vi länkar till och daterade.",
  },
  {
    question: "Behöver jag en luftkvalitetsmätare om jag redan har en hygrometer?",
    answer:
      "Det beror på vad du vill veta. En hygrometer visar luftfuktighet och temperatur, vilket räcker för frågor om mögel, kvalster och om du behöver en avfuktare. En luftkvalitetsmätare lägger till koldioxid, och i de dyrare fallen partiklar och radon, vilket är helt andra frågor: om det behöver vädras, om utomhusluften bär med sig något, och om marken under huset avger radon. Har du en hygrometer och undrar om luften känns unken i sovrummet är det koldioxid du saknar, och då räcker den billigaste mätaren med riktig NDIR-givare.",
  },
];
