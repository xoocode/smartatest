import type { ConsideredProduct, Product } from "@/lib/products";
import { productImage } from "@/lib/images";
import { resolveProducts } from "@/lib/products";
import { LUFTKVALITETSMATARE } from "@/lib/test-pages";

/**
 * Luftkvalitetsmätare. Underlag i .agent/research/luftkvalitetsmatare.md.
 *
 * ## Vad som är verkligt i den här filen
 *
 * **Verkligt och daterat:** priser, kundbetyg, GTIN, givaruppsättningar, mått,
 * strömförsörjning och samtliga noggrannhetsuppgifter. Priser och kundbetyg är
 * lästa 2026-08-04 hos Clas Ohlson och Proshop. Givare, noggrannhet, mått och
 * batteritider är lästa hos tillverkaren 2026-08-06.
 *
 * **Redaktionell bedömning:** kriteriepoängen. Vi har inte mätt någon luft,
 * inte provat någon mätare och inte jämfört någon avläsning mot ett
 * referensinstrument.
 *
 * ## Sidans fynd
 *
 * **Tre av åtta kartlagda mätare saknar koldioxidgivare helt**, trots att de
 * säljs som luftkvalitetsmätare, och en fjärde anger `eCO2`. Det är ett tal
 * uträknat ur halten flyktiga organiska ämnen och inte en mätning av koldioxid.
 * Mill skriver det själv i sin egen bruksanvisning: "eCO2 beräknas från
 * VOC-mätningen ... Om det finns betydande koncentrationer av andra flyktiga
 * organiska ämnen kommer eCO2-avläsningen att vara högre än den faktiska
 * CO2-nivån."
 *
 * ## ⚠️ Rättat 2026-08-06: ±30 ppm gäller EN modell, inte tre
 *
 * Sidan skrev att View Plus, Wave Plus och Wave Enhance delar samma angivna
 * ±30 ppm ±3 %. De har tre olika tal, alla på Airthings egna produktsidor:
 *
 * - **View Plus: ±50 ppm ±3 %** mellan 10 och 35 °C
 * - **Wave Plus: ±30 ppm ±3 %** mellan 15 och 35 °C
 * - **Wave Enhance: ±50 ppm ±5 %** inom 500 till 2 000 ppm
 *
 * Wave Plus har alltså kategorins noggrannaste koldioxidgivare, vilket sidan
 * tidigare gav bort genom att skriva att den var likvärdig. Talet ±30 ppm hade
 * burits över från en modell till två andra, vilket är precis det fel
 * spec-sourcing.md varnar för.
 *
 * ## ⚠️ Samma fälla en gång till: Netatmos två noggrannhetstal
 *
 * Netatmo anger **±100 ppm** för koldioxid och ±0,3 °C för temperatur i
 * hjälpcentrets artikel 360025217051, som handlar om Smart Indoor Air Quality
 * Monitor. Det är den uppgift som gäller vår vara, läst 2026-08-06.
 *
 * Artikel 360020908892 anger ±100 ppm upp till 1 000 ppm och ±10 % däröver,
 * och samma artikel beskriver givaren som en lampa med infraröd mottagare,
 * alltså NDIR i allt utom namnet. **Den gäller Smart Home Weather Station.**
 * Bär inte över någotdera: det är exakt det fel som gav ±30 ppm åt tre
 * Airthings-modeller och vände en av sidans slutsatser.
 *
 * Netatmos koldioxidtolerans är alltså den vidaste av de fyra mätare som
 * verkligen mäter koldioxid, och det står nu i tabellen, en nackdel och
 * omdömet.
 *
 * ## ⚠️ Rättat 2026-08-06: Wave Enhance mäter sju saker, inte fyra
 *
 * Clas Ohlsons produkttext listar fyra storheter. Airthings eget produktblad
 * (`Wave Enhance - Product Sheet - EN.pdf`, V3 07/2024) listar sju: koldioxid,
 * VOC, fukt, temperatur, lufttryck, ljudnivå och ljus. Betyget för `givare`
 * höjs från 3,5 till 4,0. Butikens lista var kortare än varan.
 *
 * ## ⚠️ Kriteriet `Angiven noggrannhet` är borttaget, raden heter `Noggrannhet`
 *
 * Det vägde 15 och belönade att uppgiften publicerades. Fyra av de sju betygen
 * var i praktiken satta på hur lätt vi hade att hitta ett datablad, vilket är
 * vår research och inte varans egenskap. Se `lib/corrections.ts` 2026-08-06.
 * Noggrannheten står kvar i tabellen, där den upplyser utan att döma.
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
 * ## GTIN, som inte längre är en spec-rad
 *
 * Raden syntes ingenstans: jämförelsetabellen tar sina rader ur den första
 * produktens markerade specar, och produktkorten renderar bara de markerade.
 * Koderna står därför här, där de gör nytta vid prisjämförelse.
 *
 * | Produkt | GTIN | Källa |
 * |---|---|---|
 * | View Plus | 7090031109608 | Proshop |
 * | Wave Plus | 7090031109301 | Airthings egen produktsida |
 * | Wave Enhance | 7090031100216 | Airthings produktblad, EU-koden |
 * | Wave Mini | 7090031109202 | Proshop |
 * | View Radon | 7090031109899 | Proshop |
 * | Netatmo | 3700730501767 | Proshops strukturerade data 2026-08-06 |
 *
 * Mill Sense saknar publicerad GTIN hos både Clas Ohlson och Mill.
 *
 * ## ⚠️ Två saker som inte får skrivas in
 *
 * 1. **Inget pris på en ackrediterad radonmätning.** Sökresultat gav 320, 600
 *    och omkring 1 000 kronor, och laboratoriernas egna produktsidor svarar 404.
 * 2. **Ingen garantirad.** Uppgifterna motsäger varandra: Mills egen
 *    bruksanvisning skriver två år, Clas Ohlsons produkttext fem. Airthings ger
 *    en standardgaranti utan angiven längd plus fem år vid registrering inom 30
 *    dagar. En rad av det går inte att jämföra rakt av.
 *
 * ## Betygstalen är inte jämförbara mellan butikerna
 *
 * Clas Ohlson publicerar `reviewCount`, Proshop publicerar inget alls. Kjells
 * `ratingCount` ligger tre till fem gånger högre för samma sorts produkt, så
 * talen här ska aldrig ställas mot ett Kjell-tal på en annan sida.
 *
 * ## Fem av de sju rankade är Airthings
 *
 * Det beror på att märket dominerar sortimentet, inte på något annat. De hamnar
 * dessutom på fem skilda platser i rankningen, plats 1, 2, 3, 5 och 6, vilket
 * är rimligt eftersom givaruppsättningarna skiljer sig från sju givare till
 * tre.
 *
 * ⚠️ Stod som "sex produkter på fyra skilda platser" till 2026-08-06. Sexan
 * kom från researchfilens "sex av elva är Airthings", som räknar Clas Ohlsons
 * hela kategori och inte vår rankning. Räkna i SEEDS, inte i underlaget.
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
    tagline: "Radon, partiklar och koldioxid på samma display.",
    scores: {
      givare: 5,
      beslutsnytta: 4.5,
      avlasning: 5,
      prisvarde: 3,
    },
    price: 2856,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Airthings-View-Plus-Smart-Radon-and-Air-Quality-Monitor/2990814",
    priceCheckedAt: PRICE_CHECKED,
    award: "winner",
    superlative: "Bäst för trafikerad gata och vedeldning",
    pros: [
      "Sju storheter i en apparat: radon, partiklar, VOC, koldioxid, fukt, temperatur och lufttryck",
      "Enda mätaren i rankningen som mäter PM2,5",
      "Inbyggd display, så värdet syns utan att du öppnar appen",
      "1,2 av 5,0 för mätningarna hos Stiftung Warentest, där 1,0 är bäst",
      "Går på 6 AA-batterier eller USB-C, så den kan stå där det saknas uttag",
    ],
    cons: [
      "Dyrast av mätarna här, 2 856 kronor",
      "Wave Plus mäter koldioxid noggrannare, ±30 ppm mot ±50, för 857 kronor mindre",
      "443 kronor dyrare hos Clas Ohlson än hos Proshop för samma vara",
    ],
    specs: [
      { label: "Pris", value: "2 856 kr", highlight: true },
      {
        label: "Mäter",
        value: "Radon, PM2,5, VOC, CO2, fukt, temp, tryck",
        highlight: true,
      },
      { label: "CO2-teknik", value: "NDIR", highlight: true },
      {
        label: "Noggrannhet",
        value: "CO2 ±50 ppm ±3 %, radon ~5 % efter 2 mån",
        highlight: true,
      },
      { label: "Radon", value: "Ja", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "6 AA eller USB-C", highlight: true },
      { label: "Avläsning", value: "Display och app", highlight: true },
      { label: "Mått", value: "17 × 9 × 3,3 cm", highlight: true },
    ],
    verdict:
      "Airthings View Plus mäter sju storheter och är den enda mätaren i rankningen som mäter partiklar. Den kostar 2 856 kronor hos Proshop.\n\n**Partikelmätningen är det som skiljer den från allt annat här.** PM2,5 är värdet som säger något när gatan utanför är trafikerad eller när grannen eldar med ved, och ingen annan av de rankade har den givaren. Koldioxiden mäts med NDIR, alltså genom hur infrarött ljus absorberas av gasen, och Airthings anger ±50 ppm ±3 procent mellan 10 och 35 grader. Displayen gör att värdena syns i förbifarten: flera av de billigare kräver att du plockar upp telefonen, och en mätare du måste öppna en app för att läsa blir en mätare du läser en gång i månaden. Sex AA-batterier eller en USB-C-kabel driver den, så den kan stå i en källare utan uttag.\n\nDen är också den enda här som någon oberoende har provat. Stiftung Warentest gav den 1,2 för mätningarna, sehr gut på en tysk skala där 1,0 är bäst, och 1,9 totalt.\n\n**Wave Plus mäter däremot koldioxid noggrannare, ±30 ppm mot ±50, och kostar 857 kronor mindre.** Är koldioxid det enda du bryr dig om betalar du alltså mer för ett trubbigare tal. Men ska du täcka radon, partiklar och koldioxid i en enda apparat och kunna läsa av dem utan telefon gör ingen av de andra sex det. Köp den. Kontrollera bara båda butikerna först, för hos Clas Ohlson kostar samma apparat 3 299 kronor.",
  },
  {
    id: "airthings-wave-plus",
    name: "Wave Plus",
    shortName: "Wave Plus",
    brand: "Airthings",
    image: productImage(LUFTKVALITETSMATARE.slug, "airthings-wave-plus"),
    tagline: "Mäter koldioxid snävare än någon annan mätare här.",
    scores: {
      givare: 4.5,
      beslutsnytta: 4.5,
      avlasning: 3.5,
      prisvarde: 4,
    },
    price: 1999,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Airthings-Wave-Plus,-smart-luftmatare-och-radonmatare/p/41-1802",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4.5, count: 317, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för radon och koldioxid",
    pros: [
      "±30 ppm ±3 % för koldioxid, den snävaste toleransen någon tillverkare här anger",
      "Sex storheter: radon, VOC, koldioxid, fukt, temperatur och lufttryck",
      "Två AA-batterier räcker 16 till 18 månader, alltså ett byte vartannat år",
      "317 omdömen hos butiken, största kundunderlaget av alla sju",
    ],
    cons: [
      "Ingen display, utan en färgring du väcker genom att vifta framför",
      "Ingen partikelmätning, så trafik och vedrök syns inte",
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
        label: "Noggrannhet",
        value: "CO2 ±30 ppm ±3 %, radon ~5 % efter 2 mån",
        highlight: true,
      },
      { label: "Radon", value: "Ja", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "2 AA, 16–18 månader", highlight: true },
      { label: "Avläsning", value: "Färgring och app", highlight: true },
      { label: "Mått", value: "12 cm i diameter, 3,6 cm tjock", highlight: true },
    ],
    verdict:
      "Airthings Wave Plus kostar 1 999 kronor och mäter sex storheter, radon och koldioxid bland dem.\n\n**Koldioxidgivaren är den noggrannaste någon tillverkare här anger.** Airthings anger ±30 ppm ±3 procent mellan 15 och 35 grader, mot ±50 ppm för både View Plus och Wave Enhance. På ett värde kring 1 000 ppm är det skillnaden mellan att veta att sovrummet ligger över gränsen och att gissa det. Radongivaren är densamma som i View Plus, med omkring 5 procents precision efter två månader vid 200 becquerel per kubikmeter. Två AA-batterier räcker 16 månader över Bluetooth och 18 med hubb, så den kan stå i ett krypgrund eller en källare i två år utan att du rör den.\n\n**Det den inte har är en display.** I stället sitter en färgring på ovansidan som tänds när du viftar framför den, grönt, gult eller rött. Du får en känsla, inte ett tal, och för talet behöver du telefonen.\n\nSka du mäta radon och koldioxid i samma apparat och kan leva med att hämta siffran i appen är det här köpet. Vill du se den på en display får du gå upp till View Plus för 857 kronor mer. Och köp den hos Clas Ohlson: hos Proshop kostar den 2 219 kronor.",
  },
  {
    id: "airthings-wave-enhance",
    name: "Wave Enhance",
    shortName: "Wave Enhance",
    brand: "Airthings",
    image: productImage(LUFTKVALITETSMATARE.slug, "airthings-wave-enhance"),
    tagline: "Talar om när sovrummet behöver vädras.",
    scores: {
      givare: 4,
      beslutsnytta: 4.5,
      avlasning: 4,
      prisvarde: 4.5,
    },
    price: 1441,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Airthings-Wave-Enhance-kompakt-luftkvalitetsmaetare-foer-inomhusluft/3443877",
    priceCheckedAt: PRICE_CHECKED,
    award: "editor",
    superlative: "Bäst för sovrummet",
    pros: [
      "Sju storheter för 1 441 kronor: koldioxid, VOC, fukt, temperatur, lufttryck, ljudnivå och ljus",
      "Billigaste vägen till ett koldioxidtal mätt med NDIR",
      "Mäter ljudnivå och ljus, alltså det som väcker dig utöver luften",
      "98 gram och 8 centimeter i diameter, så den kan sitta på väggen var som helst",
    ],
    cons: [
      "Ingen radonmätning, vilket är skälet att välja Wave Plus för 558 kronor mer",
      "Inga partiklar, så trafik och vedrök syns inte",
      "±50 ppm ±5 % för koldioxid, den vidaste toleransen av de tre NDIR-mätarna",
    ],
    specs: [
      { label: "Pris", value: "1 441 kr", highlight: true },
      {
        label: "Mäter",
        value: "CO2, VOC, fukt, temp, tryck, ljud, ljus",
        highlight: true,
      },
      { label: "CO2-teknik", value: "NDIR", highlight: true },
      {
        label: "Noggrannhet",
        value: "CO2 ±50 ppm ±5 %, temp ±0,5 °C",
        highlight: true,
      },
      { label: "Radon", value: "Nej", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "2 AA, upp till 14 månader", highlight: true },
      { label: "Avläsning", value: "Ljusring och app", highlight: true },
      { label: "Mått", value: "8 cm i diameter, 2,7 cm tjock", highlight: true },
    ],
    verdict:
      "Airthings Wave Enhance kostar 1 441 kronor och är den billigaste vägen till ett koldioxidtal som betyder något.\n\n**Koldioxid är det värde som är lättast att göra något åt.** Stiger det över ungefär 1 000 ppm i ett sovrum räcker luftväxlingen inte för antalet personer i rummet, och åtgärden är att öppna ett fönster eller ställa upp dörren. Ingen annan storhet har en lika kort väg från tal till handling. Givaren är NDIR med ±50 ppm ±5 procent inom 500 till 2 000 ppm, alltså just det spann ett sovrum rör sig i. Den mäter dessutom ljudnivå och ljus, vilket låter som utfyllnad tills man tänker på var apparaten står: i ett sovrum är buller och ljus om natten två av tre skäl till att man vaknar. Två AA-batterier ingår och räcker upp till 14 månader.\n\n**Radon mäter den inte, och inte partiklar heller.** Bor du i ett hus där radon är en öppen fråga är det Wave Plus du ska ha, för 558 kronor mer.\n\n1 441 kronor är golvet för ett uppmätt koldioxidtal. Under den summan räknar apparaterna fram sitt ur VOC-halten, precis som Mill Sense för 712 kronor mindre gör, och mellanskillnaden är hela avståndet mellan en siffra och en gissning. Ska luften i ett sovrum bli begriplig för under 1 500 kronor är det den här du ska ha.",
  },
  {
    id: "netatmo-luftkvalitetsmatare",
    name: "Smart luftkvalitetsmätare inomhus",
    shortName: "Netatmo",
    brand: "Netatmo",
    image: productImage(LUFTKVALITETSMATARE.slug, "netatmo-luftkvalitetsmatare"),
    tagline: "Larmar om luften i rummet innan du märker det själv.",
    scores: {
      givare: 3.5,
      beslutsnytta: 4,
      avlasning: 4,
      prisvarde: 4,
    },
    price: 1199,
    merchant: CLAS_OHLSON,
    merchantUrl:
      "https://www.clasohlson.com/se/Netatmo-smart-luftkvalitetsmatare-inomhus/p/36-8764",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 7, checkedAt: PRICE_CHECKED },
    superlative: "Bäst utan batteribyten",
    pros: [
      "Mäter koldioxid, ljudnivå, fukt och temperatur",
      "Nätdriven, så den mäter vidare i åratal utan batteribyte",
      "Färgindikator på höljet, så läget syns utan telefonen",
      "±0,3 °C för temperatur, snävast av mätarna med koldioxidgivare",
    ],
    cons: [
      "Måste stå vid ett uttag, till skillnad från de batteridrivna",
      "±100 ppm för koldioxid, vidast av de fyra som mäter den. Wave Plus håller ±30 ppm",
      "Ingen radonmätning och ingen partikelmätning",
    ],
    specs: [
      { label: "Pris", value: "1 199 kr", highlight: true },
      { label: "Mäter", value: "CO2, ljud, fukt, temp", highlight: true },
      /* Netatmo anger ingen givarteknik för den här modellen. Hjälpcentrets
         beskrivning av den optiska mätningen (lampa och infraröd mottagare)
         gäller Smart Home Weather Station och får inte bäras hit — det är
         precis det fel som gav ±30 ppm åt tre modeller. Cellen säger därför
         vad talet är: uppmätt koldioxid och inte ett eCO2-tal, vilket är den
         skillnad raden finns för. */
      { label: "CO2-teknik", value: "Egen CO2-givare, 0–5 000 ppm", highlight: true },
      {
        label: "Noggrannhet",
        /* CO2 ±100 ppm och temp ±0,3 °C ur Netatmos eget hjälpcenter, artikel
           360025217051, som gäller just Smart Indoor Air Quality Monitor.
           Läst 2026-08-06. ⚠️ Artikel 360020908892 anger ±100 ppm till
           1 000 ppm och ±10 % däröver, men den gäller Smart Home Weather
           Station. Icecat anger 5 % för samma GTIN, alltså tier B mot
           tillverkarens tier A. Konflikten står i researchfilen. */
        value: "CO2 ±100 ppm, temp ±0,3 °C",
        highlight: true,
      },
      { label: "Radon", value: "Nej", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "USB-nätadapter", highlight: true },
      { label: "Avläsning", value: "Färgindikator och app", highlight: true },
      { label: "Mått", value: "4,5 × 4,5 × 15,5 cm", highlight: true },
    ],
    verdict:
      "Netatmo Smart luftkvalitetsmätare kostar 1 199 kronor och mäter koldioxid, ljudnivå, luftfuktighet och temperatur.\n\n**Den är den enda här som går på nätström.** Ett USB-nätaggregat sitter i, och därmed slutar den aldrig mäta och du byter aldrig batteri. Höljet i borstad aluminium lyser i olika färger efter läget, så du ser att något är fel utan att plocka upp telefonen. Ljudnivåmätaren går från 35 till 120 dB, ovanligt i prisklassen, och för temperatur anger Netatmo ±0,3 grader, snävast av de mätare som också mäter koldioxid.\n\n**Koldioxidtalet är däremot det trubbigaste av de fyra som mäter koldioxid på riktigt.** Netatmo anger ±100 ppm mot Wave Plus ±30, och kring gränsen 1 000 ppm betyder det att sovrummet kan ligga på 900 eller 1 100 utan att apparaten skiljer talen åt. För frågan om det behöver vädras räcker det gott. Ska du följa hur mycket en ändrad ventilation faktiskt sänkte nivån är marginalen för bred.\n\nTill ett arbetsrum med ett ledigt uttag är det här rätt apparat: koldioxid och ljudnivå i samma låda, en färg du ser i ögonvrån och aldrig ett batteribyte. 15,5 centimeter aluminium som måste nå en sladd hör däremot inte hemma i ett krypgrund eller en garderob, och det är ofta just där man vill veta hur luften står.",
  },
  {
    id: "airthings-view-radon",
    name: "View Radon",
    shortName: "View Radon",
    brand: "Airthings",
    image: productImage(LUFTKVALITETSMATARE.slug, "airthings-view-radon"),
    tagline: "Radonvärdet syns på displayen utan att du tar upp telefonen.",
    scores: {
      givare: 2,
      beslutsnytta: 3.5,
      avlasning: 4.5,
      prisvarde: 2,
    },
    price: 1899,
    merchant: PROSHOP,
    merchantUrl: "https://www.proshop.se/Smarta-Hem/Airthings-View-Radon/3051742",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för källaren du passerar",
    pros: [
      "Störst display av alla mätarna här, med radonvärdet direkt avläsbart",
      "Sex AA-batterier räcker upp till 3 år, så den klarar sig utan uttag",
      "Löpande mätning år efter år, vilket en spårfilmsdosa inte ger",
      "Visar om en åtgärd mot radon har hjälpt",
    ],
    cons: [
      "Tre storheter för 1 899 kronor, dyrast per givare av alla sju",
      "Ingen koldioxid, inga partiklar, ingen VOC",
      "Wave Plus kostar 100 kronor mer och mäter tre saker till",
    ],
    specs: [
      { label: "Pris", value: "1 899 kr", highlight: true },
      { label: "Mäter", value: "Radon, fukt, temp", highlight: true },
      { label: "CO2-teknik", value: "Ingen CO2-givare", highlight: true },
      {
        label: "Noggrannhet",
        value: "Radon ~5 % efter 2 mån, temp ±0,5 °C",
        highlight: true,
      },
      { label: "Radon", value: "Ja", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "6 AA eller USB, upp till 3 år", highlight: true },
      { label: "Avläsning", value: "Stor display och app", highlight: true },
      { label: "Mått", value: "17 × 9 × 3,3 cm", highlight: true },
    ],
    verdict:
      "Airthings View Radon kostar 1 899 kronor och mäter radon, luftfuktighet och temperatur.\n\n**Avläsningen är det den gör bättre än alla andra.** Displayen är störst av alla mätarna här och visar radonvärdet direkt, utan telefon, vilket spelar roll när apparaten står i en källare du passerar ett par gånger i veckan. Sex AA-batterier räcker upp till 3 år, så den kan stå just där utan ett uttag i närheten. Och den mäter löpande, år efter år: radon varierar kraftigt med årstid, ventilation och lufttryck, och en spårfilmsdosa ger dig ett medelvärde för en vinter. Den här visar kurvan, och den visar om en åtgärd har hjälpt.\n\n**Tre storheter för 1 899 kronor är ändå tunt.** Wave Plus kostar 100 kronor mer och lägger till koldioxid med NDIR, VOC och lufttryck, och det är svårt att hitta ett läge där den här är det bättre köpet av de två.\n\nHar du redan ett bekräftat radonvärde och vill se om åtgärden mot det hjälpte är den stora displayen värd sina pengar. Har du det inte är valet gjort åt dig: Wave Plus kostar 100 kronor mer och besvarar samma fråga plus fem till. Läs köpguiden innan du köper någondera för radonets skull, för ett värde som gäller vid en husförsäljning eller en ansökan om radonbidrag kommer bara ur spårfilmsdosor från ett ackrediterat laboratorium.",
  },
  {
    id: "airthings-wave-mini",
    name: "Wave Mini",
    shortName: "Wave Mini",
    brand: "Airthings",
    image: productImage(LUFTKVALITETSMATARE.slug, "airthings-wave-mini"),
    tagline: "Följer mögelrisken i badrum och källare i tre år på batterier.",
    scores: {
      givare: 2,
      beslutsnytta: 2.5,
      avlasning: 3,
      prisvarde: 3.5,
    },
    price: 785,
    merchant: PROSHOP,
    merchantUrl:
      "https://www.proshop.se/Smarta-Hem/Airthings-Wave-Mini-kompakt-och-maangsidig-luftkvalitetsmaetare-med-riskindikator-foer-moegel/2797716",
    priceCheckedAt: PRICE_CHECKED,
    superlative: "Bäst för mögelrisk i badrummet",
    pros: [
      "Billigast av alla mätarna här, 785 kronor",
      "Tre AA-batterier räcker upp till 3 år, så den kan glömmas bort i en källare",
      "Mögelrisken räknas fram ur fukt och temperatur över tid",
      "135 gram och 8 centimeter bred, liten nog att ställa var som helst",
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
        label: "Noggrannhet",
        value: "Temp ±1 °C, fukt ±3 %",
        highlight: true,
      },
      { label: "Radon", value: "Nej", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "3 AA, upp till 3 år", highlight: true },
      { label: "Avläsning", value: "Färgring och app", highlight: true },
      { label: "Mått", value: "8 cm i diameter, 2,6 cm tjock", highlight: true },
    ],
    verdict:
      "Airthings Wave Mini kostar 785 kronor och mäter flyktiga organiska ämnen, fukt och temperatur. Ingen koldioxid.\n\n**Det den är byggd för är fuktproblem över tid.** Ur hur fukten och temperaturen legat räknar den fram ett mögelrisktal, alltså en modell av när förhållandena gynnar mögeltillväxt, och tre AA-batterier räcker upp till 3 år. Det gör den till en apparat du sätter i ett badrum eller en källare och sedan glömmer bort, och som ändå har en kurva att visa när du kommer tillbaka. 135 gram och 8 centimeter i diameter får plats bakom en tvättmaskin.\n\n**VOC-värdet är däremot det svåraste av alla att göra något åt.** Det stiger av städmedel, nymålade väggar, möbler och matlagning, och åtgärden är nästan alltid att vädra. Att apparaten heter luftkvalitetsmätare och kommer från samma märke som de dyra gör den dessutom lätt att ta för en billigare version av samma sak, och den mäter andra saker.\n\nDe flesta som lägger 785 kronor på något som heter luftkvalitetsmätare räknar med att få ett koldioxidtal, och här får de inget. Vet du redan att det är fukten i badrummet eller källaren du vill följa är priset lågt för tre år utan batteribyte. För alla andra: lägg 656 kronor till och ta Wave Enhance.",
  },
  {
    id: "mill-sense",
    name: "Sense luftkvalitetsmätare",
    shortName: "Mill Sense",
    brand: "Mill",
    image: productImage(LUFTKVALITETSMATARE.slug, "mill-sense"),
    tagline: "Liten nog att sätta i flera rum samtidigt.",
    scores: {
      givare: 2,
      beslutsnytta: 2,
      avlasning: 3.5,
      prisvarde: 3.5,
    },
    price: 729,
    merchant: CLAS_OHLSON,
    merchantUrl: "https://www.clasohlson.com/se/Luftkvalitetsmatare-Mill-Sense/p/36-8155",
    priceCheckedAt: PRICE_CHECKED,
    userRating: { value: 4, count: 37, checkedAt: PRICE_CHECKED },
    superlative: "Bäst för flera rum till låg peng",
    pros: [
      "Billig nog att sätta i flera rum, och säljs som trepack",
      "±0,15 °C för temperatur och ±2 % för fukt, snävast av alla sju",
      "Inbyggt batteri och USB-C, så den kan flyttas mellan rum utan sladd",
      "Magnetiskt väggfäste medföljer, och en knapp på ovansidan visar läget i färg",
    ],
    cons: [
      "Anger eCO2, ett tal uträknat ur VOC-halten och ingen koldioxidmätning",
      "Ingen radon- eller partikelmätning",
      "Sensorerna behöver 72 timmar innan avläsningen är att lita på",
    ],
    specs: [
      { label: "Pris", value: "729 kr", highlight: true },
      {
        label: "Mäter",
        value: "VOC, fukt, temp, eCO2",
        highlight: true,
      },
      { label: "CO2-teknik", value: "eCO2, härlett ur VOC", highlight: true },
      {
        label: "Noggrannhet",
        /* Ur Mills egen bruksanvisning, den Clas Ohlson länkar från
           produktsidan. Läst 2026-08-06. Stod som "Ej angiven" till dess,
           efter en kontroll som stannat vid millheat.com och butikssidan. */
        value: "Temp ±0,15 °C, fukt ±2 %",
        highlight: true,
      },
      { label: "Radon", value: "Nej", highlight: true },
      { label: "Strömförsörjning", shortLabel: "Ström", value: "Inbyggt batteri, USB-C", highlight: true },
      /* Stod som "App". Manualen visar en knapp på ovansidan som tänder en
         färg i fyra lägen: blått under 18 °C, grönt, gult och rött. Läst
         2026-08-06 i den svenska användarmanualen Clas Ohlson länkar. */
      { label: "Avläsning", value: "Färgindikator och app", highlight: true },
      { label: "Mått", value: "7 × 7 × 3 cm", highlight: true },
    ],
    verdict:
      "Mill Sense kostar 729 kronor, väger lite och går på ett inbyggt batteri med USB-C. Talet den kallar koldioxid är uträknat.\n\n**Som fukt- och temperaturmätare är den skarpast här.** Mill anger ±0,15 grader och ±2 procent relativ fuktighet, snävare än vad någon annan tillverkare här anger, och tre enheter i ett trepack kostar 566 kronor styck. Det gör den till ett rimligt sätt att följa fukten i tre rum samtidigt, exempelvis i ett hus där en källare och ett badrum båda är misstänkta.\n\n**Men eCO2-talet är inte en koldioxidmätning, och Mill skriver det själv.** I bruksanvisningen står att eCO2 beräknas från VOC-mätningen, och att avläsningen blir högre än den faktiska koldioxidnivån när det finns betydande halter av andra flyktiga organiska ämnen. I klartext: sprejar någon deodorant, lagar mat eller öppnar en burk lösningsmedel stiger det uträknade koldioxidtalet i ett rum där ingen befinner sig. Åt andra hållet kan talet ligga stilla i ett fullsatt rum med god ventilation.\n\nKöp den om du vill följa fukt och temperatur i flera rum och kan bortse från koldioxidsiffran helt. Ska du veta när det behöver vädras är det en riktig NDIR-givare du behöver, och Wave Enhance är den billigaste som har en.",
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
      "Airthings View Plus för 2 856 kronor hos Proshop. Den mäter sju storheter: radon, partiklar, flyktiga organiska ämnen, koldioxid, luftfuktighet, temperatur och lufttryck, och den är ensam i rankningen om partikelmätning. Koldioxiden mäts med en NDIR-givare, genom hur infrarött ljus absorberas av gasen, och Airthings anger ±50 ppm ±3 procent mellan 10 och 35 grader. Den har dessutom display, så värdena syns utan att du öppnar appen. Notera att samma apparat kostar 3 299 kronor hos Clas Ohlson, 443 kronor mer. Tvåa är Airthings Wave Plus för 1 999 kronor, som saknar partiklar och display men faktiskt mäter koldioxid noggrannare, ±30 ppm ±3 procent.",
  },
  {
    question: "Kan jag använda en digital radonmätare vid en husförsäljning?",
    answer:
      "Nej. Strålsäkerhetsmyndigheten skriver att en korttidsmätning bara är rådgivande och inte kan användas för något myndighetsbeslut. För ett värde som gäller krävs en långtidsmätning som ger ett årsmedelvärde: minst två månader, mellan 1 oktober och 30 april, i minst två rum, med mätdosor som beställs genom och skickas tillbaka till ett ackrediterat mätlaboratorium. Det gäller lika mycket vid en husförsäljning som vid en ansökan om radonbidrag eller ett tillsynsärende. En digital mätare är alltså ingen genväg förbi den mätningen, men den är ett bra sätt att ta reda på om det är värt att beställa den.",
  },
  {
    question: "Vad är skillnaden mellan CO2 och eCO2?",
    answer:
      "En NDIR-givare mäter koldioxid direkt, genom hur mycket infrarött ljus gasen absorberar. Ett eCO2-värde är i stället uträknat: apparaten mäter halten flyktiga organiska ämnen och räknar sedan om den till ett koldioxidliknande tal, med antagandet att det som tillför organiska ämnen till rummet är människor som andas. Mill skriver själv i bruksanvisningen till Sense att avläsningen blir högre än den faktiska koldioxidnivån när det finns betydande halter av andra flyktiga ämnen. Sprejar någon deodorant, lagar mat eller öppnar en burk lösningsmedel stiger alltså det uträknade talet i ett rum där ingen befinner sig. Vill du veta om det behöver vädras är det ett riktigt koldioxidvärde du är ute efter.",
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
      "I det rum vars luft du vill veta något om, i ungefär den höjd där du vistas, och en bit från fönster, dörrar och ventiler. En mätare precis vid en tilluftsventil mäter uteluften och inte rummet, och en i direkt solljus får en temperatur som inte stämmer. För koldioxid är sovrummet oftast det mest upplysande stället, eftersom det är där flest personer andas i ett stängt rum under flest timmar. Airthings anger andningshöjd, 110 till 170 centimeter över golvet, som optimal placering för Wave Enhance. Ska du mäta radon gäller andra regler, och de står i Strålsäkerhetsmyndighetens vägledning.",
  },
  {
    question: "Hur ofta behöver mätaren kalibreras?",
    answer:
      "En NDIR-givare för koldioxid driver långsamt över tid, och de flesta apparater hanterar det med en automatisk nollställning som utgår från att rummet någon gång under en period är nästan tomt och därmed ligger nära utomhusnivån. Airthings anger att Wave Enhance gör om den beräkningen en gång i veckan för koldioxid och löpande för VOC. Det fungerar i ett vanligt hem men sämre i ett rum som aldrig står tomt. Nya mätare behöver dessutom tid att sätta sig: Mill anger 72 timmar för Sense, och Airthings ungefär 7 dagar innan VOC-värdet betyder något. Vi har inte utfört någon egen kalibreringskontroll och redovisar därför inga resultat från en sådan.",
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
