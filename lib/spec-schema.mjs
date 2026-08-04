/**
 * Kanoniskt fältschema per kategori.
 *
 * ## Problemet det löser
 *
 * Jämförelsetabellerna fylldes till 49 procent när de mättes 2026-08-04, och
 * 126 rader på hela sajten fanns för en enda produkt. En stor del av det var
 * inte saknad data utan **samma egenskap under olika namn**: avfuktarsidan bar
 * `Arbetsyta`, `Max rumsstorlek` och `Max storlek rum` som tre rader med två,
 * fyra och en produkt, när det är en egenskap med sju.
 *
 * Därför bestäms fälten här i förväg, en gång per kategori, i stället för att
 * växa fram ur vad varje enskild produktsida råkar skryta om. Etiketten i
 * `lib/data/*.ts` ska vara `key`, och `alias` finns för att hitta det som redan
 * skrivits fel.
 *
 * ## Fälten är också en arbetsorder
 *
 * `scripts/specsvep.mjs` läser listan och letar efter just de här
 * egenskaperna. Ett fält som står här men saknas på en produkt är alltså en
 * uppgift att hämta, inte ett tomrum att acceptera.
 *
 * ## Härkomst
 *
 * Varje värde bär var det kommer ifrån, se `HARKOMST`. Skälet är att vi fyller
 * tabellerna bredare än förr, och en bedömd uppgift får aldrig se ut som en
 * uppmätt. Två fältslag får aldrig vara bedömda: pris och testomdöme.
 */

/**
 * Var en uppgift kommer ifrån, från starkast till svagast.
 *
 * Ordningen är också prioritet: hittar svepet samma fält hos flera källor
 * vinner den starkaste. En `bedomd` ersätts alltid av en publicerad uppgift.
 */
export const HARKOMST = {
  /** Oberoende provning har mätt det. Starkast som finns. */
  uppmatt: { rank: 5, label: "uppmätt", visa: "Uppmätt av oberoende test" },
  /** Tillverkarens egen publicerade uppgift. Normalfallet för specifikationer. */
  tillverkare: { rank: 4, label: "tillverkare", visa: null },
  /** Butikens uppgift. Vanlig, men butiker skriver av fel ibland. */
  butik: { rank: 3, label: "butik", visa: null },
  /** Uträknad ur andra publicerade tal, till exempel watt per liter. */
  harledd: { rank: 2, label: "härledd", visa: "Uträknat av oss" },
  /** Vår slutsats ur en systermodell eller produktklass. Ska synas som sådan. */
  bedomd: { rank: 1, label: "bedömd", visa: "Vår bedömning" },
};

/**
 * Fältslag som aldrig får bära `bedomd` eller `harledd`.
 *
 * `Angiven noggrannhet` och `Uppmätt avvikelse` tillkom 2026-08-04 med
 * hygrometersidan. En gissad tolerans är en påhittad mätning, och hela den
 * sidans poäng är att skilja de tillverkare som publicerar ett tal från dem som
 * låter bli. Gissar vi åt dem som tiger försvinner skillnaden vi mätte.
 */
export const ALDRIG_BEDOMD = [
  "Pris",
  "Testomdöme",
  "Provad av Which?",
  "Angiven noggrannhet",
  "Uppmätt avvikelse",
  /* Tillkom 2026-08-04 med /smart-termostat. Hela sidans fynd är att
     tillverkarna anger 23, 28, 30 och 37 procent för samma sorts produkt och
     att ingen som provat dem anger något alls. Fyller vi i ett tal åt den som
     tiger, eller lånar ett från en systermodell, försvinner spridningen vi
     mätte. Aqara anger ingenting, och det ska synas. */
  "Angiven besparing",
];

/**
 * Fälttyper, för hur svepet ska tolka en träff och hur den ska formateras.
 *
 * `enhet` används både för att känna igen ett tal i löptext och för att skriva
 * värdet likadant för alla produkter, vilket är halva poängen med en tabell.
 */
const F = (key, opts = {}) => ({ key, ...opts });

/**
 * ## Avfuktare
 *
 * Fälten under `Pris`, `Kapacitet` och `Effekt` är de tre som redan fanns på
 * alla tolv. Resten är sorterade efter hur ofta de gick att hitta 2026-08-04.
 *
 * `Rumsyta` slår ihop tre tidigare etiketter. `Drifttemperatur` slår ihop två.
 */
const AVFUKTARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Kapacitet", { enhet: "l/dygn", alltid: true, monster: /(\d+[,.]?\d*)\s*(?:liter|l)\s*(?:\/|per\s*)d(?:ygn|ag)/i }),
  F("Effekt", { enhet: "W", alltid: true, monster: /(\d+[,.]?\d*)\s*(?:W|watt)\b/i }),
  F("Drifttemperatur", { enhet: "°C", alias: ["Temperaturintervall", "Arbetstemperatur"], monster: /([+-]?\d+)\s*(?:–|-|till)\s*([+-]?\d+)\s*°?\s*C/i }),
  F("Rumsyta", { enhet: "m²", alias: ["Arbetsyta", "Max rumsstorlek", "Max storlek rum", "Rekommenderad yta"], monster: /(\d+)\s*(?:–|-|till)?\s*(\d+)?\s*(?:m²|m2|kvadratmeter|kvm)/i }),
  F("Tank", { enhet: "liter", alias: ["Tankvolym", "Vattentank", "Behållare", "Vattenbehållare", "Tank capacity"], monster: /(\d+[,.]?\d*)\s*(?:liter|l)\b/i }),
  /* "Bullernivå" är Bygghemmas ord, "Ljudeffektnivå" Clas Ohlsons. Samma sak. */
  F("Ljudnivå", { enhet: "dB(A)", alias: ["Ljud", "Ljudnivå (dB)", "Bullernivå", "Ljudeffektnivå", "Ljudtrycksnivå", "Noise level"], monster: /(\d+[,.]?\d*)\s*dB/i }),
  F("Luftflöde", { enhet: "m³/h", alias: ["Luftomsättning", "Luftcirkulation", "Air flow"], monster: /(\d+)\s*(?:m³|m3)\s*\/?\s*h/i }),
  F("Vikt", { enhet: "kg", alias: ["Nettovikt", "Vikt (kg)", "Produktvikt", "Weight"], monster: /(\d+[,.]?\d*)\s*kg\b/i }),
  F("Mått", { alias: ["Storlek", "Dimensioner", "Mått (BxDxH)", "Mått (HWD)", "Produktmått", "Dimensions"], monster: /(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*(mm|cm)/i }),
  F("Hygrostat", { alias: ["Justerbar fuktnivå", "Fuktreglering", "Fuktighetsreglering", "Humidistat"] }),
  F("Köldmedium", { alias: ["Kylmedel", "Kylmedium", "Refrigerant"], monster: /\b(R\d{3}[a-z]?)\b/i }),
  F("Filter", { alias: ["Filtertyp", "Filtrering", "Luftfilter"] }),
  F("Avfrostning", { alias: ["Automatisk avfrostning", "Defrost", "Avfrostningsfunktion"] }),
  F("Slanganslutning", { alias: ["Dränering", "Kontinuerlig dränering", "Slang", "Avlopp", "Dräneringsslang"] }),
  F("Energiklass", { alias: ["Energimärkning"], monster: /energiklass\s*([A-G][+]{0,3})/i }),
  F("Garanti", { enhet: "år", alias: ["Garantitid"], monster: /(\d+)\s*(?:års?|year)\s*garanti/i }),
  /* Fält som butikstabellerna bär men vi aldrig samlat, och som skiljer
     apparater åt i praktiken. Spänning står i nästan varje tabell. */
  F("Display", { alias: ["Skärm"] }),
  F("Timer", { alias: ["Timerfunktion"] }),
  F("App", { alias: ["Wifi", "WiFi", "Uppkoppling", "Smart styrning"] }),
];

/**
 * ## Robotdammsugare
 *
 * Beslutat 2026-08-04 efter att tabellen visat sig vara sajtens glesaste: 21
 * rader, 29 procent fyllda, och tolv rader som bara en produkt hade. Skälet
 * var att raderna plockats ur varje produkts egen marknadsföringstext i
 * stället för att bestämmas i förväg.
 *
 * `Sugkraft` står med trots att Stiftung Warentest kallar talet ett
 * reklampåstående. Läsaren letar efter det, och att visa det bredvid priset är
 * hur sidan bevisar sin egen poäng: den billigaste roboten anger mest.
 */
const ROBOTDAMMSUGARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Sugkraft", { enhet: "Pa", alias: ["Sugeffekt"], monster: /(\d[\d\s.,]*)\s*(?:Pa|pascal)\b/i }),
  F("Moppsystem", { alias: ["Mopp", "Mopptyp"] }),
  F("Mopptvätt", { alias: ["Mopprengöring", "Tvätt av mopp"], monster: /(\d+)\s*°\s*C/i }),
  F("Passerhöjd", { enhet: "mm", alias: ["Trösklar", "Hinderpassering", "Tröskelhöjd"], monster: /(\d+[,.]?\d*)\s*(mm|cm)\b/i }),
  F("Station", { alias: ["Basstation", "Dockningsstation", "Tömningsstation"] }),
  F("Tömningsintervall", { alias: ["Underhållsfritt", "Dagar mellan tömning"], monster: /(\d+)\s*(dagar|veckor|days|weeks)/i }),
  F("Dammbehållare", { enhet: "liter", alias: ["Dammpåse", "Behållare"], monster: /(\d+[,.]?\d*)\s*(?:liter|l)\b/i }),
  F("Navigering", { alias: ["Sensorer", "Kartläggning"] }),
  F("Batteritid", { enhet: "min", alias: ["Körtid", "Drifttid"], monster: /(\d+)\s*(?:min|minuter)\b/i }),
  F("Batteri", { enhet: "mAh", monster: /(\d[\d\s]*)\s*mAh/i }),
  F("Ljudnivå", { enhet: "dB(A)", alias: ["Ljud"], monster: /(\d+[,.]?\d*)\s*dB/i }),
  F("Höjd", { enhet: "mm", alias: ["Robotens höjd", "Tjocklek"], monster: /(\d+[,.]?\d*)\s*(mm|cm)\s*(?:hög|höjd|tunn)/i }),
  F("Kartor", { alias: ["Våningar", "Antal kartor"], monster: /(\d+)\s*(?:våningar|kartor|floors|maps)/i }),
  F("GTIN"),
];


/**
 * ## Vattenlarm
 *
 * Sidans ärende är om larmet når telefonen eller bara låter i ett tomt hus,
 * så `Larmväg` och `Siren` är de fält som faktiskt skiljer produkterna åt.
 * `Kapslingsklass` hör hit därför att en sensor som ska ligga under en
 * diskmaskin blir blöt på riktigt.
 */
const VATTENLARM = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Hubb krävs"),
  F("Antal sensorer"),
  F("Larmväg", { alias: ["Larmar via", "Notis"] }),
  F("Siren", { enhet: "dB", alias: ["Ljudnivå", "Larmsignal"], monster: /(\d+)\s*dB/i }),
  F("Kapslingsklass", { alias: ["IP-klass", "Skyddsklass"], monster: /(IP\s?\d{2})/i }),
  F("Batteri"),
  F("Batteritid", { enhet: "år" }),
  F("Driftstemperatur", { alias: ["Arbetstemperatur", "Drifttemperatur"] }),
  F("Protokoll", { alias: ["Radio", "Anslutning", "Frekvens"] }),
  F("Mått", { alias: ["Storlek", "Dimensioner"] }),
  F("Garanti", { enhet: "år" }),
  F("Sammankopplingsbar"),
];

/**
 * ## Smart brandvarnare
 *
 * `Certifiering` är kategorins viktigaste rad och stod för en av åtta.
 * EN 14604 är kravet för rökvarnare i svensk handel, och en varnare utan den
 * är inte en billigare variant utan en annan sorts produkt.
 */
const SMART_BRANDVARNARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Når telefonen"),
  F("Larmar utan app"),
  F("Antal varnare"),
  F("Certifiering", { alias: ["Standard", "Godkännande", "EN 14604"], monster: /(EN\s?\d{5}(?::\d{4})?)/i }),
  F("Larmsignal", { enhet: "dB", alias: ["Ljudnivå", "Signalstyrka"], monster: /(\d+)\s*dB/i }),
  F("Detekterar", { alias: ["Sensortyp", "Detektering"] }),
  F("Batteri"),
  F("Batteritid", { enhet: "år" }),
  F("Protokoll", { alias: ["Anslutning", "Radio"] }),
  F("Mått", { alias: ["Storlek", "Dimensioner", "Diameter"] }),
  F("Garanti", { enhet: "år" }),
  F("Självtest"),
];


/**
 * ## Brandvarnare
 *
 * Icke-smarta, alltså fristående och radiosammankopplade utan app. Samma
 * fältslag som smarta varnare, minus allt som rör app och hubb.
 * `Certifiering` är den rad som betyder mest: EN 14604 är kravet i svensk
 * handel, och en varnare utan den är en annan sorts produkt.
 */
const BRANDVARNARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Sammankopplas"),
  F("Max i system"),
  F("Antal i förpackning"),
  F("Certifiering", { alias: ["Standard", "Godkännande", "EN 14604"], monster: /(EN\s?\d{5}(?::\d{4})?)/i }),
  F("Larmsignal", { enhet: "dB", alias: ["Ljudnivå", "Signalstyrka", "Siren"], monster: /(\d+)\s*dB/i }),
  F("Detekterar", { alias: ["Sensortyp", "Detektering", "Typ"] }),
  F("Batteri"),
  F("Batteritid", { enhet: "år" }),
  F("Mått", { alias: ["Storlek", "Dimensioner", "Diameter"] }),
  F("Garanti", { enhet: "år" }),
  F("Självtest", { alias: ["Testknapp"] }),
  F("Tystningsknapp", { alias: ["Pausfunktion", "Tystning"] }),
];


/** ## Brandstege. Kilotalet är sidans fynd: samma sorts stege anges till 150,
 * 200, 400 och 450 kilo utan att någon anger provmetod. Raden står kvar ändå,
 * eftersom läsaren letar efter den. */
const BRANDSTEGE = [
  F("Pris", { enhet: "kr", alltid: true }), F("Längd", { enhet: "m" }),
  F("Räcker till"), F("Angiven maxlast", { enhet: "kg" }),
  F("Karmtjocklek", { alias: ["Karmdjup"] }), F("Antal steg", { alias: ["Steg"] }),
  F("Material"), F("Vikt", { enhet: "kg", alias: ["Nettovikt"] }),
  F("Standard som anges", { alias: ["Standard", "Certifiering", "Norm"] }),
  F("Avstånd från fasad", { alias: ["Distanser mot vägg", "Väggavstånd utfälld"] }),
  F("Mått hopfälld", { alias: ["Hopfällt mått", "Förvaring"] }),
];

/** ## Larm utan abonnemang. Sidans fynd är att två av fem säljer
 * reservuppkopplingen som ett abonnemang, så `Reservkanal` är kärnan. */
const LARM_UTAN_ABONNEMANG = [
  F("Pris", { enhet: "kr", alltid: true }), F("Reservkanal"), F("Reservbatteri i hubben"),
  F("Siren", { enhet: "dB", monster: /(\d+)\s*dB/i }), F("Knappsats"),
  F("Delar i paketet"), F("Sensorprotokoll", { alias: ["Sensorradio", "Anslutning", "Hubbens nätverk"] }),
  F("Trådlös räckvidd", { enhet: "m" }), F("Max antal enheter", { alias: ["Max enheter"] }),
  F("Batteritid", { alias: ["Batteritid, sensorer", "Batteritid, knappsats", "Batteritid, rörelsesensor"] }),
];

/** ## Inomhuskamera. `Avstängning` är sidans ärende: ett fysiskt linsskydd är
 * den enda integritet läsaren kan se med egna ögon. */
const INOMHUSKAMERA = [
  F("Pris", { enhet: "kr", alltid: true }), F("Avstängning"), F("Programläge"),
  F("Upplösning", { alias: ["Bildupplösning"] }), F("Täckning"),
  F("Synfält", { enhet: "grader", alias: ["Vinkel", "FOV"] }),
  F("Mörkerseende", { alias: ["IR", "Nattläge"] }), F("Lagring"),
  F("Kräver abonnemang"), F("Ström", { alias: ["Strömförsörjning", "Matning"] }),
  F("Detektering", { alias: ["Sensor", "Rörelsedetektering"] }),
  F("Siren", { enhet: "dB", monster: /(\d+)\s*dB/i }),
  F("Mått", { alias: ["Storlek", "Dimensioner"] }),
];

/** ## Luftfuktare. Systersida till avfuktare, samma fältslag vända åt andra
 * hållet. `Teknik` skiljer ultraljud från förångning och är det som avgör
 * kalkdammet. */
const LUFTFUKTARE = [
  F("Pris", { enhet: "kr", alltid: true }), F("Teknik"), F("Ställbar fukt"),
  F("Kapacitet", { alias: ["Befuktning"] }), F("Rumsyta", { enhet: "m²", alias: ["Rumsstorlek", "Arbetsyta"] }),
  F("Tank", { enhet: "liter", alias: ["Tankvolym", "Vattentank"] }),
  F("Effekt", { enhet: "W", monster: /(\d+[,.]?\d*)\s*(?:W|watt)/i }),
  F("Ljudnivå", { enhet: "dB(A)", alias: ["Ljud", "Bullernivå"], monster: /(\d+[,.]?\d*)\s*dB/i }),
  F("Drifttid", { enhet: "h", alias: ["Körtid"] }),
  F("App", { alias: ["Wifi", "WiFi", "Uppkoppling", "Smart styrning"] }),
  F("Vikt", { enhet: "kg", alias: ["Nettovikt"] }),
  F("Mått", { alias: ["Storlek", "Dimensioner"] }),
  F("Garanti", { enhet: "år" }), F("GTIN"),
];

/** ## Hygrometer. Kategorins hela avgörande ligger i två fält som nästan ingen
 * publicerar: `Angiven noggrannhet` är tillverkarens utfästelse i
 * procentenheter, `Uppmätt avvikelse` är vad en oberoende provning faktiskt
 * mätte. **De ska aldrig slås ihop till en rad.** Det förra är ett löfte, det
 * senare ett resultat, och blandar man dem ser ett löfte ut som en mätning.
 * Av tretton kartlagda produkter angav två något alls, och priset förutsade
 * det inte, se `.agent/research/hygrometer.md`. */
const HYGROMETER = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Angiven noggrannhet", {
    alias: ["Noggrannhet", "Mätnoggrannhet", "Tolerans", "Precision", "Genauigkeit"],
    enhet: "procentenheter",
    monster: /±?\s*(\d+[,.]?\d*)\s*%\s*(?:RH|RF|rH)/i,
  }),
  F("Uppmätt avvikelse", {
    alias: ["Uppmätt noggrannhet", "Avvikelse"],
    enhet: "procentenheter",
  }),
  F("Mätområde fukt", {
    alias: ["Mätområde", "Fuktmätområde", "Luftfuktighetsmätområde"],
    monster: /(\d+)\s*(?:till|-|–)\s*(\d+)\s*%/i,
  }),
  F("Mätområde temperatur", { alias: ["Temperaturmätområde"] }),
  F("Noggrannhet temperatur", { alias: ["Temperaturnoggrannhet"], enhet: "°C" }),
  F("Avläsning", { alias: ["Display", "Skärm", "Visning"] }),
  F("Uppkoppling", { alias: ["App", "Wifi", "WiFi", "Bluetooth", "Zigbee", "Anslutning"] }),
  F("Loggning", { alias: ["Historik", "Minne", "Datalagring", "Min/max"] }),
  F("Placering", { alias: ["Montering", "Upphängning"] }),
  F("Ström", { alias: ["Batteri", "Batterityp", "Strömförsörjning"] }),
  F("Batteritid", { enhet: "år", alias: ["Batterilivslängd"] }),
  F("Mått", { alias: ["Storlek", "Dimensioner"] }),
  F("GTIN"),
];

/** ## Luftkvalitetsmätare. Systersida till hygrometer, men kategorins fråga är
 * en annan: **vilka givare sitter faktiskt i lådan.** Tre av åtta kartlagda
 * saknar CO2-givare helt trots att de säljs som luftkvalitetsmätare, och en
 * anger `eCO2`, alltså ett tal uträknat ur VOC-halten. `CO2-teknik` finns
 * därför som eget fält: NDIR mäter koldioxid, eCO2 gissar den, och skillnaden
 * är inte en nyans utan skillnaden mellan en mätning och en uppskattning.
 * Se `.agent/research/luftkvalitetsmatare.md`. */
const LUFTKVALITETSMATARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Mäter", { alias: ["Givare", "Sensorer", "Mätvärden"] }),
  F("CO2-teknik", { alias: ["Koldioxidgivare", "CO2-givare", "Sensortyp"] }),
  F("Angiven noggrannhet", {
    alias: ["Noggrannhet", "Mätnoggrannhet", "Tolerans", "Precision"],
    monster: /±\s*(\d+)\s*ppm/i,
  }),
  F("Radon", { alias: ["Radonmätning", "Radongivare"] }),
  F("Partiklar", { alias: ["PM2.5", "PM2,5", "PM10", "Partikelgivare"] }),
  F("VOC", { alias: ["TVOC", "Flyktiga organiska ämnen"] }),
  F("Avläsning", { alias: ["Display", "Skärm", "Visning"] }),
  F("Uppkoppling", { alias: ["App", "Wifi", "WiFi", "Bluetooth", "Anslutning"] }),
  F("Loggning", { alias: ["Historik", "Datalagring", "Mäthistorik"] }),
  F("Ström", { alias: ["Batteri", "Batterityp", "Strömförsörjning"] }),
  F("Batteritid", { enhet: "år", alias: ["Batterilivslängd"] }),
  F("Mått", { alias: ["Storlek", "Dimensioner"] }),
  F("GTIN"),
];

/** ## Robotgräsklippare. Kategorin avgörs av tomten och inte av roboten, så
 * `Klippyta` och `Max lutning` är de två fält som styr köpet. Båda publiceras
 * för nästan varje modell, vilket är ovanligt och gör dem jämförbara.
 *
 * ⚠️ **Bygg inget fält för igelkottssäkerhet.** Rasmussen m.fl. 2024 prövade
 * knivtyp, kollisionssensorer, ultraljud, glidplåtar och hjuldrift och fann
 * inget konstruktionsdrag med säkerställd skyddande effekt. Ett fält som
 * `Knivtyp` skulle alltså se ut som ett säkerhetsmått utan att vara det. Se
 * `.agent/research/robotgrasklippare.md`. */
const ROBOTGRASKLIPPARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Klippyta", {
    enhet: "m²",
    alias: ["Yta", "Max klippyta", "Arbetsyta", "Rekommenderad yta"],
    monster: /(\d[\d\s]*)\s*m[²2]/i,
  }),
  F("Max lutning", {
    enhet: "%",
    alias: ["Lutning", "Maxlutning", "Slutning"],
    monster: /lutning:?\s*(\d+)\s*%/i,
  }),
  F("Navigering", { alias: ["Navigation", "Positionering", "Teknik"] }),
  F("Gränsmetod", { alias: ["Slinga", "Begränsningskabel", "Avgränsning"] }),
  F("Hinderhantering", { alias: ["Hinder", "Hinderigenkänning", "Kamera"] }),
  F("Klippbredd", { enhet: "cm", alias: ["Skärbredd"] }),
  F("Klipphöjd", { enhet: "mm", alias: ["Höjd", "Klipphöjdsintervall"] }),
  F("Ljudnivå", { enhet: "dB", alias: ["Ljud", "Bullernivå"], monster: /(\d+[,.]?\d*)\s*dB/i }),
  F("Batteri", { enhet: "Wh", alias: ["Batterikapacitet", "Batteri"] }),
  F("Drifttid", { enhet: "min", alias: ["Körtid", "Klipptid"] }),
  F("App", { alias: ["Appstyrning", "Uppkoppling", "Wifi", "Bluetooth"] }),
  F("Garanti", { enhet: "år" }),
  F("GTIN"),
];

/**
 * ## Fönsterputsrobot
 *
 * Roboten hänger tre våningar upp, och tre tal avgör om det är rimligt:
 * **linans hållfasthet, hålltiden vid strömavbrott och vilket glas den får
 * sitta på.** Ingen tillverkare publicerar alla tre, och de publicerar olika
 * delmängder, så en tom cell är ett fynd och inte en lucka.
 *
 * `Minsta fönster` finns med för svenska spröjsade fönster. Kärcher anger
 * 35 × 35 cm, och mindre rutor än så är vanliga i äldre svenska hus.
 *
 * Se `.agent/research/fonsterputsrobot.md`.
 */
const FONSTERPUTSROBOT = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Linans hållfasthet", {
    alias: ["Säkerhetslina", "Lina", "Hållfasthet"],
    enhet: "kg",
  }),
  F("Hålltid vid strömavbrott", {
    alias: ["Reservbatteri", "UPS", "Nödbatteri", "Hålltid"],
    enhet: "min",
    monster: /(\d+)\s*min/i,
  }),
  F("Båglöst glas", { alias: ["Frameless", "Ramlöst"] }),
  F("Minsta fönster", { alias: ["Minsta ruta", "Minsta storlek"] }),
  F("Glastjocklek", { alias: ["Tjocklek", "Glas"], enhet: "mm" }),
  F("Sugkraft", {
    enhet: "Pa",
    alias: ["Sugeffekt", "Vidhäftning"],
    monster: /(\d[\d\s.,]*)\s*Pa\b/i,
  }),
  F("Rengöring", { alias: ["Spray", "Vattenspray", "Rengöringsmetod"] }),
  F("Ljudnivå", { enhet: "dB", alias: ["Ljud"], monster: /(\d+[,.]?\d*)\s*dB/i }),
  F("Styrning", { alias: ["App", "Fjärrkontroll", "Uppkoppling"] }),
  F("Vikt", { enhet: "kg", alias: ["Nettovikt"] }),
  F("Mått", { alias: ["Storlek", "Dimensioner"] }),
  F("GTIN"),
];

/**
 * ## Smart hem-hubb
 *
 * Kategorins avgörande fält är `Sort`, och det är vårt ord och inte butikens.
 * Hyllan kallar allt "hubb" eller "controller" från 329 till 4 999 kronor, men
 * tillverkarnas egna texter beskriver tre olika produkter:
 *
 * - **Märkesbrygga** talar bara med sitt eget märke och exponerar det utåt.
 *   Plejd Gateway styr enbart Plejd, enligt Plejd själva.
 * - **Matter-controller** kan lägga till andra tillverkares Matter-enheter.
 *   Aqara M3 är den enda i sortimentet som säger det rakt ut.
 * - **Universell hubb** talar varje radio och kör lokalt.
 *
 * `Fungerar utan internet` är den andra axeln. Tre tillverkare säger
 * uttryckligen ja, resten säger ingenting, och tystnad är inte ett nej.
 *
 * ⚠️ `Sort` är en klassificering vi gör ur tillverkarens egen beskrivning.
 * Den ska aldrig fyllas i från en systermodell och aldrig gissas: en produkt
 * vars tillverkare inte beskriver räckvidden hör hemma bland de övervägda.
 *
 * Se `.agent/research/smart-hem-hubb.md`.
 */
const SMART_HEM_HUBB = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Sort", { alias: ["Typ", "Hubbtyp", "Kategori av hubb"] }),
  F("Radior", {
    alias: ["Protokoll", "Radio", "Anslutningar", "Trådlöst"],
  }),
  F("Matter", { alias: ["Matter-stöd", "Matter-certifierad"] }),
  F("Thread", { alias: ["Thread Border Router", "Thread-stöd"] }),
  F("Zigbee", { alias: ["Zigbee-stöd"] }),
  F("Z-Wave", { alias: ["Z-Wave-stöd", "ZWave"] }),
  F("Fungerar utan internet", {
    alias: ["Lokal drift", "Lokal styrning", "Offline", "Molnfri"],
  }),
  F("Abonnemang", { alias: ["Prenumeration", "Månadsavgift"] }),
  F("Styr andra märken", { alias: ["Tredjepart", "Tredjepartsprodukter"] }),
  F("Nätverk", { alias: ["Ethernet", "Wifi", "Anslutning"] }),
  F("Ström", { alias: ["Strömförsörjning", "Matning"] }),
  F("Mått", { alias: ["Storlek", "Dimensioner"] }),
  F("Artikelnummer", { alias: ["Art.nr", "SKU"] }),
];

/**
 * ## Smart termostat
 *
 * Sidan rankar bara radiatortermostater, alltså de som skruvas på ventilen på
 * ett vattenburet element. Två fält bär hela kategorin.
 *
 * `Angivna ventiler` är det som avgör om köpet fungerar över huvud taget, och
 * det publiceras extremt ojämnt. Aqara skriver ut både passformen och
 * undantagen (M30×1,5 samt Danfoss RA, RAV och RAVL, och att manuella ventiler,
 * RTL och enrörssystem inte stöds). Danfoss löser samma sak med ett eget
 * artikelnummer, 130 kronor dyrare. tado skriver "en mängd olika tillverkare"
 * och listar ingenting.
 *
 * `Krävs utöver termostaten` är kategorins dolda prislapp. En termostat för
 * 559 kronor som behöver en Matter Border Router kostar inte 559 kronor, och
 * Ljud & Bild ägnar hela sitt prisstycke åt just det.
 *
 * ⚠️ `Angiven besparing` är tillverkarens eget påstående och ingenting annat.
 * Den står i tabellen därför att spridningen är sidans fynd: Netatmo 37 %,
 * Danfoss 30 % på sin egen sida och 23 % i butikens text, tado 28 %, Aqara
 * ingen siffra alls. Fältet får aldrig vägas in i ett betyg — se
 * `.agent/research/smart-termostat.md` §0 och användarbeslutet 2026-08-04.
 * Skriv talet som tillverkaren skriver det, aldrig avrundat eller omräknat.
 */
const SMART_TERMOSTAT = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Angivna ventiler", {
    alias: ["Ventil", "Ventilfattning", "Passar ventiler", "Adaptrar", "Gänga"],
    monster: /(M\s?30\s*[x×]\s*1[,.]5|M\s?28|RAVL|RAV|RA)\b/i,
  }),
  F("Krävs utöver termostaten", {
    alias: ["Hubb krävs", "Brygga", "Gateway", "Border router", "Kräver"],
  }),
  F("Protokoll", { alias: ["Radio", "Anslutning", "Trådlöst", "Uppkoppling"] }),
  F("Matter", { alias: ["Matter-stöd", "Matter-certifierad"] }),
  F("Abonnemang", { alias: ["Prenumeration", "Månadsavgift"] }),
  F("Angiven besparing", {
    alias: ["Energibesparing", "Besparing", "Sparar"],
    monster: /(\d{1,2})\s*%/i,
  }),
  F("Frostskydd", { alias: ["Frostvakt", "Frostskyddsfunktion"] }),
  F("Öppet fönster", { alias: ["Fönsterdetektering", "Öppet fönster-läge"] }),
  F("Temperaturomfång", {
    enhet: "°C",
    alias: ["Temperaturintervall", "Inställningsområde"],
    monster: /(\d+)\s*(?:–|-|till)\s*(\d+)\s*°?\s*C/i,
  }),
  F("Steg", { enhet: "°C", alias: ["Upplösning", "Inställningssteg"] }),
  F("Batteri", { alias: ["Batterityp", "Strömförsörjning"] }),
  F("Batteritid", { enhet: "år", monster: /(\d+[,.]?\d*)\s*års?\b/i }),
  F("Ljud", { alias: ["Ljudnivå", "Buller", "Motorljud"] }),
  F("Mått", { alias: ["Storlek", "Dimensioner"] }),
  F("GTIN"),
];

/** Kategorier som ännu inte fått ett schema kör i friläge, se svepet. */
export const SPEC_SCHEMA = {
  avfuktare: AVFUKTARE,
  robotdammsugare: ROBOTDAMMSUGARE,
  vattenlarm: VATTENLARM,
  "smart-brandvarnare": SMART_BRANDVARNARE,
  brandvarnare: BRANDVARNARE,
  brandstege: BRANDSTEGE,
  "larm-utan-abonnemang": LARM_UTAN_ABONNEMANG,
  inomhuskamera: INOMHUSKAMERA,
  luftfuktare: LUFTFUKTARE,
  hygrometer: HYGROMETER,
  luftkvalitetsmatare: LUFTKVALITETSMATARE,
  robotgrasklippare: ROBOTGRASKLIPPARE,
  fonsterputsrobot: FONSTERPUTSROBOT,
  "smart-hem-hubb": SMART_HEM_HUBB,
  "smart-termostat": SMART_TERMOSTAT,
};

/** Alla etiketter ett fält kan ha hetat, för normaliseringen. */
export function aliasMap(kategori) {
  const falt = SPEC_SCHEMA[kategori];
  if (!falt) return new Map();
  const map = new Map();
  for (const f of falt) {
    map.set(f.key.toLowerCase(), f.key);
    for (const a of f.alias ?? []) map.set(a.toLowerCase(), f.key);
  }
  return map;
}

export function faltFor(kategori) {
  return SPEC_SCHEMA[kategori] ?? null;
}
