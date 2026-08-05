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
  /* Tillkom 2026-08-05 med /nyckelskap. RISE provade fyra namngivna modeller
     åt Villaägarna, rapport P115210. Tiderna hör till just de modellerna och
     får aldrig lånas till en systermodell: ABUS provades som 787C med analog
     kod, och Kjell säljer 787 med Bluetooth. Samma fälla som Nanoleaf Lines
     mot Essentials på /smart-belysning. Ingen modell utan eget resultat i
     rapporten får ett tal i de här fälten. */
  "Provad av RISE",
  "Tid mot infästning",
  "Tid mot lucka",
  /* Tillkom 2026-08-05 med /usb-c-laddare. Kriteriet öppen redovisning mäter
     just vad tillverkaren skriver ut, och Testaankoop fann stora skillnader:
     Belkins portmärkning var testets bästa, Apple angav ingenting alls och
     IKEA SJÖSS märkte sina portar fel. Gissar vi ett värde åt den som tiger
     mäter vi vår egen efterforskning i stället för produkten. Samma skäl som
     `Angiven noggrannhet` på /hygrometer. */
  "Effekt per port angiven",
  "Tomgångsförbrukning",
  /* Tillkom 2026-08-05 med /garageportsoppnare. Hela sidans fynd är att tre
     olika storheter säljs som samma rubriktal: Bauhaus 1000 N, Jula 700 Nm och
     8 Nm för två öppnare av samma märke, Clas Ohlson ingenting alls. Att räkna
     om vridmoment till dragkraft kräver utväxling och kuggdiameter som ingen
     publicerar, och att låna en systermodells tal raderar spridningen vi mätt.
     Den som tiger ska synas tiga. Samma skäl som `Angiven besparing`. */
  "Dragkraft",
  "Vridmoment",
  /* Tillkom 2026-08-05 med /usb-c-kabel. Anker anger 25 000 böjningar för en
     kabel och 35 000 för en annan utan att publicera någon metod, medan den
     enda oberoende provningen som finns, Testfakta/PZT, körde 5 000 böjningar
     med publicerad metod och såg en kabel gå sönder före 1 000. Talen är alltså
     varken jämförbara med varandra eller med provningen, och att låna ett tal
     från en systermodell raderar just den spridningen. Den som tiger ska synas
     tiga. Samma skäl som `Angiven besparing`.

     `USB-IF-certifiering` av motsatt skäl: USB-IF:s publika lista visar bara de
     senaste två åren och integratörslistan kräver medlemsinloggning, så en
     frånvaro där bevisar ingenting. Vi återger vad säljaren skriver ut och
     gissar aldrig åt någon. */
  "Angivet böjtal",
  "USB-IF-certifiering",
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
 * ## Vattenfelsbrytare
 *
 * `Typgodkännande` är kategorins hela ärende och står först med flit. Raden ska
 * bära certifikatnumret när ett sådant publiceras och `Ej angivet` när det inte
 * gör det, aldrig ett streck: skillnaden mellan att vi inte hittat något och
 * att tillverkaren inte publicerar något är precis vad sidan mäter.
 *
 * `Vad den mäter` skiljer de två produkttyperna åt bättre än något annat fält.
 * En central vattenfelsbrytare mäter flöde och tryck och behöver inga sensorer,
 * en läckagebrytare stänger på signal från en sensor. Det avgör vilken läcka
 * produkten hittar och därmed vad den är värd.
 *
 * `Vid strömavbrott` finns här och inte på vattenlarmssidan därför att en ventil
 * har ett läge när strömmen går, och tillverkarna anger det sällan i butiken.
 * Uponors manöverpanel har till och med en nödöppning via 9 V-batteri, vilket
 * bara framgår av produkttexten.
 */
const VATTENFELSBRYTARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Typgodkännande", { alias: ["Certifikat", "Certifiering", "Godkännande"], monster: /\b((?:SC|C|TG)\s?\d{4,7}(?:-\d{1,3})?)\b/ }),
  F("Typ", { alias: ["Produkttyp"] }),
  F("Vad den mäter", { alias: ["Detektering", "Mätprincip"] }),
  F("Stänger av", { alias: ["Avstängning", "Omfattning"] }),
  F("Sensorer krävs", { alias: ["Sensor", "Vattendetektor"] }),
  F("Installation", { alias: ["Montering", "Monteringssätt"] }),
  F("Anslutning", { alias: ["Gänga", "Dimension", "Rördimension"] }),
  F("Fungerar utan internet", { alias: ["Utan uppkoppling", "Molnfri"] }),
  F("App", { alias: ["Mobilapp", "Wifi", "WiFi", "Uppkoppling"] }),
  F("Vid strömavbrott", { alias: ["Strömavbrott", "Strömbortfall"] }),
  F("Max driftstryck", { enhet: "MPa", alias: ["Tryck", "Driftstryck"], monster: /(\d+[,.]?\d*)\s*(?:MPa|bar)\b/i }),
  F("Max vattentemperatur", { enhet: "°C", alias: ["Maxtemperatur", "Vattentemperatur"], monster: /(\d+)\s*°?\s*C/i }),
  F("Spänning", { enhet: "V", alias: ["Matning", "Strömförsörjning"], monster: /(\d+)\s*V\b/ }),
  F("Mått", { alias: ["Storlek", "Dimensioner", "Byggmått"] }),
  F("Garanti", { enhet: "år" }),
  F("RSK-nummer", { alias: ["RSK", "RSK-nr"], monster: /\b(\d{7})\b/ }),
  F("GTIN", { alias: ["EAN", "EAN-nr"] }),
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

/**
 * ## Nyckelskåp
 *
 * Beslutat 2026-08-05, före insamlingen. Fälten är valda ur viktningen och
 * inte ur butikstexterna: infästning 30, lucka och lås 25, väderskydd 15, kod
 * och handhavande 15, prisvärde 15.
 *
 * Ordningen speglar vikten. De fyra första raderna bär 55 av 100 viktpoäng och
 * är de som ska vara ifyllda för varje produkt innan sidan får gå live.
 *
 * ## Varför just de här fälten
 *
 * RISE forcerade samtliga fyra provade skåp genom infästningen på 16 till 75
 * sekunder med kofot. Det gör `Infästning`, `Antal infästningspunkter` och
 * framför allt `Skruvar innanför luckan` till kategorins avgörande uppgifter.
 * Sitter skruvarna åtkomliga utifrån behövs ingen kofot alls, och det är en
 * egenskap som går att se på tillverkarens egna bilder när ingen skriver ut
 * den.
 *
 * `Nyckelbackup` är med som en **svaghet och inte som en funktion**. HMF
 * 2030-11 angreps via låsvredet, och ett cylinderlås på en box i den här
 * prisklassen är en andra väg in snarare än en bekvämlighet.
 *
 * `Antal kombinationer` skiljer mekaniska hjul från knappsats på ett sätt som
 * marknadsföringen döljer: fyra hjul med tio lägen ger 10 000, medan en
 * knappsats där ordningen saknar betydelse ger långt färre än vad sifferantalet
 * antyder. Räkna aldrig fram talet åt en tillverkare som inte anger det — det
 * kräver att man vet om ordningen spelar roll, och det står nästan aldrig.
 */
const NYCKELSKAP = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Infästning", {
    alltid: true,
    alias: ["Montering", "Monteringssätt", "Uppsättning", "Fastsättning"],
  }),
  F("Antal infästningspunkter", {
    alias: ["Skruvhål", "Monteringshål", "Antal skruvhål"],
    monster: /(\d+)\s*(?:st\s*)?(?:skruvhål|monteringshål|infästningspunkter)/i,
  }),
  F("Skruvar innanför luckan", {
    alias: ["Dolda skruvar", "Skyddad infästning", "Skruvar bakom lucka"],
  }),
  F("Material", {
    alltid: true,
    alias: ["Materialval", "Hölje", "Kropp", "Tillverkad av"],
  }),
  F("Godstjocklek", {
    enhet: "mm",
    alias: ["Plåttjocklek", "Materialtjocklek", "Väggtjocklek"],
    monster: /(\d+[,.]?\d*)\s*mm\s*(?:tjock|gods|plåt)/i,
  }),
  F("Låstyp", {
    alltid: true,
    alias: ["Lås", "Låsning", "Kodlås", "Typ av lås"],
  }),
  F("Kodlängd", {
    enhet: "siffror",
    alias: ["Antal siffror", "Sifferkombination", "Kod"],
    monster: /(\d+)[\s-]*(?:siffrig|siffror)/i,
  }),
  F("Antal kombinationer", {
    alias: ["Kombinationer", "Antal koder", "Kodkombinationer"],
    monster: /([\d\s.,]+)\s*(?:olika\s*)?kombinationer/i,
  }),
  F("Nyckelbackup", {
    alias: ["Nyckelöppning", "Nödöppning", "Cylinderlås", "Nyckellås"],
  }),
  F("Väderskydd", {
    alltid: true,
    alias: ["IP-klass", "IP", "Väderbeständig", "Utomhus", "Kapslingsklass"],
    monster: /\bIP\s?(\d{2})\b/i,
  }),
  F("Lock över koden", {
    alias: ["Skyddslock", "Väderlucka", "Kodskydd", "Insynsskydd"],
  }),
  F("Nyckelkapacitet", {
    alias: ["Antal nycklar", "Rymmer", "Kapacitet", "Nyckelkrokar"],
    monster: /(\d+)\s*(?:st\s*)?nycklar/i,
  }),
  F("Innermått", {
    alias: ["Invändiga mått", "Innerutrymme", "Invändigt"],
    monster: /(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*(mm|cm)/i,
  }),
  F("Yttermått", {
    alias: ["Mått", "Storlek", "Dimensioner", "Utvändiga mått"],
    monster: /(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*(mm|cm)/i,
  }),
  F("Vikt", {
    enhet: "kg",
    alias: ["Nettovikt", "Produktvikt"],
    monster: /(\d+[,.]?\d*)\s*kg\b/i,
  }),
  F("App", { alias: ["Bluetooth", "Uppkoppling", "Smart", "Appstyrning"] }),
  /* Se ALDRIG_BEDOMD. Endast de fyra modellerna i RISE P115210 får ett värde,
     och bara om modellbeteckningen stämmer exakt. */
  F("Provad av RISE", { alias: ["RISE", "Oberoende provning", "Provad"] }),
  F("Tid mot infästning", { alias: ["Kofot", "Tid kofot"] }),
  F("Tid mot lucka", { alias: ["Tid låssida", "Tid gångjärn"] }),
  F("GTIN"),
];

/**
 * ## USB-C-laddare
 *
 * Fälten följer sidans fem kriterier, som de beslutades 2026-08-05:
 * effektdelning 30, prisvärde per watt 25, storlek i uttaget 20, öppen
 * redovisning 15, protokoll 10. Varje kriterium ska kunna avgöras ur fälten
 * här, annars är kriteriet fel valt.
 *
 * **Sidan har inget testomdömekriterium.** Testaankoop provade runt 40 laddare
 * och namnger nio i den öppna artikeln, men noll av dem finns i Kjells eller
 * Teknikdelars sortiment. Deras mätvärden bär köpguiden i stället. Se
 * `.agent/research/usb-c-laddare.md` §7.1.
 *
 * `Max effekt en port` och `Effekt vid två portar` är de två fält hela
 * rankningen hänger på, eftersom Testaankoop mätte att första porten alltid ger
 * mer än den andra och att den andra som mest gav 48 W. En laddare som anger
 * 65 W totalt kan alltså ge 45 + 20, och det talet är det som avgör om den
 * laddar din laptop medan telefonen sitter i.
 */
const USB_C_LADDARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Total märkeffekt", {
    enhet: "W",
    alltid: true,
    alias: ["Effekt", "Maxeffekt", "Uteffekt", "Total effekt", "Watt"],
    monster: /(\d+[,.]?\d*)\s*(?:W|watt)\b/i,
  }),
  F("Portuppsättning", {
    alltid: true,
    alias: ["Portar", "Anslutningar", "Antal portar", "Uttag"],
    monster: /(\d+)\s*[x×]\s*USB-?[CA]/i,
  }),
  /* Kriterium 1. Tillverkarna publicerar det i effektfördelningstabeller, men
     sällan i butikstexten. Gap-passet ska leta i produktbladet. */
  F("Max effekt en port", {
    enhet: "W",
    alias: ["Maxeffekt per port", "Effekt enskild port", "Single port", "Max per port"],
    monster: /(\d+[,.]?\d*)\s*W\s*(?:på|vid|per)\s*(?:en|enskild|single)/i,
  }),
  F("Effekt vid två portar", {
    enhet: "W",
    alias: ["Effektfördelning", "Fördelad effekt", "Vid flera portar", "Dual port"],
  }),
  /* Kriterium 4. Se ALDRIG_BEDOMD. Hela poängen är att skilja de tillverkare
     som skriver ut effekten vid porten från dem som inte gör det. Testaankoop
     underkände Apple just för detta och utsåg Belkins märkning till testets
     bästa. Fyller vi i åt den som tiger försvinner skillnaden. */
  F("Effekt per port angiven", {
    alias: ["Portmärkning", "Märkning vid port", "Angiven per port"],
  }),
  F("Kabel ingår", {
    alltid: true,
    alias: ["Medföljande kabel", "Kabel medföljer", "Innehåll", "I förpackningen"],
  }),
  /* Kriterium 5. */
  F("USB PD-version", {
    alltid: true,
    alias: ["Power Delivery", "PD", "PD-version", "Laddprotokoll"],
    monster: /PD\s*(\d\.\d)/i,
  }),
  F("PPS", {
    alias: ["Programmable Power Supply", "PPS-stöd", "Variabel spänning"],
  }),
  F("Spänningssteg", {
    enhet: "V",
    alias: ["Spänningar", "Utspänning", "Volt", "Spänningsprofiler"],
    monster: /(\d+(?:[,.]\d+)?)\s*V\b/i,
  }),
  /* Kriterium 3. GaN är hela kategorins säljargument och avgör storleken. */
  F("Halvledarteknik", {
    alltid: true,
    alias: ["GaN", "Galliumnitrid", "Teknik", "Kiseltyp"],
  }),
  F("Mått", {
    alias: ["Storlek", "Dimensioner", "Yttermått", "Bredd x höjd x djup"],
    monster: /(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*(mm|cm)/i,
  }),
  F("Vikt", {
    enhet: "g",
    alias: ["Nettovikt", "Produktvikt"],
    monster: /(\d+[,.]?\d*)\s*g\b/i,
  }),
  /* Testaankoop underkände flera modeller för just detta, och det är samma
     iakttagelse som den breda smarta pluggen på /smart-plug. */
  F("Blockerar grannuttag", {
    alias: ["Uttagsvänlig", "Plats i grenuttag", "Bredd i uttag"],
  }),
  F("Stickpropp", {
    alias: ["Fällbar stift", "Utbytbar stickpropp", "Resestift", "Kontakt"],
  }),
  /* Ekodesignförordning 2019/1782 kräver att tomgångsförbrukningen deklareras
     i den tekniska dokumentationen. Att den ändå sällan publiceras i handeln
     är i sig ett utfall på kriteriet öppen redovisning. Se ALDRIG_BEDOMD. */
  F("Tomgångsförbrukning", {
    enhet: "W",
    alias: ["Standby", "Tomgång", "Viloförbrukning", "No-load"],
    monster: /(\d+[,.]?\d*)\s*(?:W|mW)\s*(?:i\s*)?(?:tomgång|standby|viloläge)/i,
  }),
  F("Garanti", {
    enhet: "år",
    alias: ["Garantitid", "Års garanti"],
    monster: /(\d+)\s*års?\s*garanti/i,
  }),
  F("GTIN"),
];

/**
 * ## USB-C-kabel
 *
 * Systersida till `/usb-c-laddare`, byggd 2026-08-05. Rankar **bara USB-C till
 * USB-C** efter användarbeslut; USB-A- och Lightning-formerna förklaras i
 * köpguiden och får egna sidor.
 *
 * Fälten följer sidans fem kriterier: datahastighet och skärmstöd 30, prisvärde
 * per meter 25, effekt och e-marker 20, öppen redovisning 15, konstruktion och
 * längdutbud 10.
 *
 * ### `Datahastighet` är hela sidan
 *
 * Kontakten ser likadan ut i båda ändar av spannet, och priset förutsäger inte
 * vilken kabel man håller i. Läst i handeln 2026-08-05: Kjells Linocell Flätad
 * 240 W kostar 299,90 kr och anger "Överföringshastighet: 480 Mb/s", medan
 * Unisynks USB4-kabel i samma butik kostar 329 kr och anger 40 Gbps. Trettio
 * kronor isär, 83 gånger i skillnad, och den dyrare är den långsamma. Apples
 * 240 W-kabel för 445 kr hos Kjell anges av Clas Ohlson som
 * "Dataöverföring: USB 2-hastighet".
 *
 * `Videostöd` ligger som eget fält men **inte som eget kriterium**: en kabel som
 * bara når 480 Mb/s saknar de ledarpar DisplayPort Alt Mode kräver, så en egen
 * kolumn hade blivit halva tabellen streck. Kriteriet väger de två ihop.
 *
 * ### `Referenslängd` och varför tabellen jämför 2 meter
 *
 * Kjell säljer samma kabel i 0,5, 1, 2 och 3 meter i tre färger: 52 poster i
 * kategorin är kanske femton produkter. Efter användarbeslut rankas **en rad per
 * modell vid 2 m** där längden finns, och `Tillgängliga längder` berättar vad
 * modellen mer finns i. Prisvärdet räknas per meter, annars vinner den korta
 * kabeln på att vara kort.
 *
 * ### ⚠️ `Angivet böjtal` får aldrig fyllas i åt någon
 *
 * Se `ALDRIG_BEDOMD`. Anker anger 25 000 böjningar för Powerline III Flow och
 * 35 000 för Nano, utan att publicera en metod. Testfakta lät PZT böja tolv
 * kablar med en publicerad metod — 150 grams vikt, 90 grader åt vardera hållet,
 * funktionstest efter 1 000, 2 500, 3 500 och 5 000 — och en kabel för 240 kr
 * gick sönder före 1 000. Talen är alltså inte jämförbara med varandra och inte
 * med provningen. Efter användarbeslut 2026-08-05 är hållbarhet **inget
 * kriterium**: den bär köpguiden. Fältet står i tabellen av samma skäl som
 * `Sugkraft` på /robotdammsugare — läsaren letar efter det, och spridningen är
 * fyndet.
 *
 * ### ⚠️ `USB-IF-certifiering` får aldrig gissas
 *
 * USB-IF:s publika produktlista visar som standard bara de senaste två åren,
 * underhålls av medlemsföretagen själva och integratörslistan kräver
 * medlemsinloggning. Att en kabel saknas där betyder alltså ingenting. Fältet
 * bär vad säljaren skriver ut, och `Ej angiven` när ingen skriver något. Samma
 * regel som SBSC-registret på /kodlas-ytterdorr.
 *
 * Se `.agent/research/usb-c-kabel.md`.
 */
const USB_C_KABEL = [
  F("Pris", { enhet: "kr", alltid: true }),
  /* Kriterium 1, och sidans fynd. Skriv talet som säljaren skriver det:
     "480 Mb/s" hos Kjell, "480 Mbps" hos Clas Ohlson, "USB 2-hastighet" för
     Apple. Räkna aldrig om och avrunda aldrig. */
  F("Datahastighet", {
    enhet: "Gbps",
    alltid: true,
    alias: [
      "Överföringshastighet",
      "Dataöverföring",
      "Dataöverföringshastighet",
      "Hastighet",
      "Datahastighet",
      "Transfer speed",
    ],
    monster: /(\d+[,.]?\d*)\s*(?:Gbps|Gbit\/s|Mbps|Mb\/s|Mbit\/s)/i,
  }),
  F("USB-generation", {
    alltid: true,
    alias: ["USB-version", "Standard", "Generation", "USB-standard"],
    monster: /USB\s?(2\.0|3\.[12]|4|4\.0)\b/i,
  }),
  F("Videostöd", {
    alias: [
      "DisplayPort Alt Mode",
      "Alt Mode",
      "Video",
      "Skärmstöd",
      "Bildöverföring",
      "Medievisning",
    ],
    monster: /(\d+K)\s*(?:@|vid)?\s*(\d+)?\s*Hz/i,
  }),
  /* Kriterium 2. Referenslängden är 2 m, se filhuvudet. */
  F("Längd", {
    enhet: "m",
    alltid: true,
    alias: ["Kabellängd", "Sladdlängd", "Längd i meter"],
    monster: /(\d+[,.]?\d*)\s*(?:m|meter|cm)\b/i,
  }),
  F("Tillgängliga längder", {
    alias: ["Finns i längder", "Längdvarianter", "Andra längder"],
  }),
  /* Kriterium 3. 60 W är gränsen där e-markern blir nödvändig: över 3 A måste
     kabeln kunna säga vad den tål, annars håller laddaren igen. */
  F("Max effekt", {
    enhet: "W",
    alltid: true,
    alias: ["Effekt", "Laddeffekt", "Maxeffekt", "Uteffekt", "Watt", "Laddström"],
    monster: /(\d+[,.]?\d*)\s*(?:W|watt)\b/i,
  }),
  F("Max ström", {
    enhet: "A",
    alias: ["Ström", "Strömstyrka", "Amp", "Ampere"],
    monster: /(\d+[,.]?\d*)\s*A\b/i,
  }),
  F("E-marker", {
    alltid: true,
    alias: ["E-markerchip", "E-Marker", "Emarker", "Chipset", "Märkchip", "E-märkning"],
  }),
  F("USB PD-version", {
    alias: ["Power Delivery", "PD", "PD-version", "Laddprotokoll", "EPR"],
    monster: /PD\s*(\d\.\d)/i,
  }),
  /* Kriterium 4. Se ALDRIG_BEDOMD. */
  F("USB-IF-certifiering", {
    alias: ["USB-IF", "Certifiering", "Certifierad", "USB-IF Certified", "TID"],
  }),
  /* Kriterium 5. Testfaktas provning gick sönder i manteln vid dragavlastningen,
     inte i ledarna, så materialet är den konstruktionsuppgift som betyder något
     och den syns dessutom på butikens egen bild. */
  F("Mantel", {
    alltid: true,
    alias: ["Material", "Kabelmantel", "Hölje", "Ytmaterial", "Yttermantel"],
  }),
  /* Se ALDRIG_BEDOMD. Tillverkarens eget tal, utan publicerad metod. */
  F("Angivet böjtal", {
    enhet: "böjningar",
    alias: ["Böjtal", "Böjningar", "Böjtest", "Livslängd böjningar", "Bend"],
    monster: /(\d[\d\s.,]*)\s*(?:böjningar|bends|böjar)/i,
  }),
  F("Kontaktvinkel", {
    alias: ["Vinklad", "90 grader", "Kontaktform", "Vinkel"],
  }),
  F("Garanti", {
    enhet: "år",
    alias: ["Garantitid", "Års garanti"],
    monster: /(\d+)\s*års?\s*garanti/i,
  }),
  F("GTIN", { alias: ["EAN", "EAN-nr", "EAN / GTIN"] }),
];

/**
 * ## Garageportsöppnare
 *
 * Beslutat 2026-08-05, före insamlingen, se `.agent/research/garageportsoppnare.md`.
 *
 * ### Varför `Dragkraft` och `Vridmoment` är två fält och inte ett
 *
 * Det vore bekvämt att slå ihop dem till ett fält som hette "Kraft" och låta
 * varje butiks tal hamna där. Det är precis vad som inte får hända. Newton är
 * kraft, newtonmeter är vridmoment, och de beskriver olika saker: en skenöppnare
 * drar rakt, och ett vridmoment beskriver motoraxelns vridning före utväxling.
 * Slås de ihop ser 700 och 1000 ut som jämförbara tal på samma rad.
 *
 * Uppmätt i handeln 2026-08-05: Bauhaus anger 1000 N under etiketten
 * "Lyftkraft", Jula anger 700 Nm respektive 8 Nm under etiketten "Vridmoment"
 * för två öppnare av samma märke, och Clas Ohlson anger ingen teknisk uppgift
 * alls. Två separata rader gör att tabellen visar vem som anger vad, i stället
 * för att prosan får förklara det.
 *
 * `alias` för `Dragkraft` bär Lyftkraft, eftersom Bauhaus kallar det så, men
 * INTE Vridmoment. Aliaskedjan är det enda som håller isär storheterna i
 * svepet.
 *
 * ### Kraften får aldrig härledas
 *
 * Se `ALDRIG_BEDOMD`. Att räkna om Nm till N kräver utväxling och kuggdiameter
 * som ingen tillverkare publicerar, och att gissa åt den som tiger raderar
 * skillnaden sidan finns för att visa. Samma resonemang som `Angiven besparing`
 * på /smart-termostat.
 *
 * ### Skyddsfälten
 *
 * `Fotocell`, `Hinderdetektering` och `Nödöppning` bär kriteriet Skydd vid
 * stängning på 20. Ingen av de fyra butikssidorna nämner något av dem, så de
 * hämtas ur tillverkarnas manualer, alltså tier A. Går de inte att fylla per
 * modell stryks kriteriet och ämnet bärs av köpguiden, enligt användarbeslut
 * 2026-08-05.
 */
const GARAGEPORTSOPPNARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  /* Newton. Den enda storhet som beskriver vad öppnaren orkar dra. */
  F("Dragkraft", {
    enhet: "N",
    alltid: true,
    /* Medvetet utan det generiska "Kraft": en butik som skriver Kraft: 700
       kan mena vridmoment, och då hamnar Julas tal på dragkraftsraden. Hellre
       en tom cell än ett tal på fel rad. */
    alias: ["Lyftkraft", "Dragförmåga", "Lyftförmåga"],
    monster: /(\d[\d\s]*)\s*(?:N|newton)\b(?!m)/i,
  }),
  /* Newtonmeter. Står med för att visa vem som anger fel storhet, inte för att
     jämföras med raden ovan. Se filhuvudet. */
  F("Vridmoment", {
    enhet: "Nm",
    alltid: true,
    alias: ["Moment", "Torque"],
    monster: /(\d[\d\s]*)\s*(?:Nm|newtonmeter)\b/i,
  }),
  F("Max portvikt", {
    enhet: "kg",
    alltid: true,
    alias: ["Portvikt", "Max. portvikt", "Maxvikt port", "Max vikt"],
    monster: /(\d+)\s*kg/i,
  }),
  F("Max portyta", {
    enhet: "m²",
    alias: ["Portyta", "Max yta", "Portstorlek", "Upp till"],
    monster: /(\d+[,.]?\d*)\s*(?:m²|m2|M2|kvadratmeter)/i,
  }),
  F("Max porthöjd", {
    enhet: "m",
    alias: ["Porthöjd", "Max. porthöjd", "Lyfthöjd"],
    monster: /(\d+[,.]?\d*)\s*m\s*(?:porth|höjd)/i,
  }),
  F("Skentyp", {
    alltid: true,
    alias: ["Drivning", "Drivtyp", "Skena", "Överföring", "Remtyp"],
  }),
  F("Skenlängd", {
    enhet: "m",
    alias: ["Dragskena", "Skenlängd totalt", "Längd skena"],
    monster: /(?:dragskena|skena)[^\d]{0,12}(\d+[,.]?\d*)\s*m\b/i,
  }),
  /* Kriteriet Skydd vid stängning. Hämtas ur manualerna, se filhuvudet. */
  F("Fotocell", {
    alltid: true,
    alias: ["Fotoceller", "Ljusbom", "Ljusridå", "Säkerhetssensor", "IR-sensor"],
  }),
  F("Hinderdetektering", {
    alltid: true,
    alias: ["Klämskydd", "Kraftbegränsning", "Hinderavkänning", "Automatisk backning", "Klämskyddsfunktion"],
  }),
  F("Nödöppning", {
    alltid: true,
    alias: ["Nödutlösare", "Nödlossning", "Frikoppling", "Manuell frikoppling", "Nödöppnare"],
  }),
  F("Effekt", {
    enhet: "W",
    alias: ["Motoreffekt", "Märkeffekt"],
    monster: /(\d+)\s*(?:W|watt)\b/i,
  }),
  F("Standbyförbrukning", {
    enhet: "W",
    alias: ["Standby", "Viloförbrukning", "Tomgångsförbrukning", "Standby strömförbrukning"],
    monster: /(\d+[,.]?\d*)\s*(?:W|watt)[^.]{0,20}(?:standby|vilo|tomgång)/i,
  }),
  F("Öppningshastighet", {
    enhet: "m/s",
    alias: ["Hastighet", "Portöppningshastighet", "Lyfthastighet"],
    monster: /(\d+[,.]?\d*)\s*m\/s/i,
  }),
  F("Antal fjärrkontroller", {
    enhet: "st",
    alias: ["Fjärrkontroller", "Handsändare", "Medföljande fjärrkontroller"],
    monster: /(\d+)\s*(?:st\s*)?(?:fjärrkontroll|handsändare)/i,
  }),
  F("Räckvidd fjärrkontroll", {
    enhet: "m",
    alias: ["Räckvidd", "Sändarräckvidd"],
    monster: /räckvidd[^\d]{0,20}(\d+)\s*m\b/i,
  }),
  F("Rullande kod", {
    alias: ["Hoppande kod", "Rolling code", "Kodhopp", "Krypterad kod"],
  }),
  F("App", {
    alias: ["Wifi", "WiFi", "Smart styrning", "Uppkoppling", "Appstyrning"],
  }),
  F("Spänning", {
    enhet: "V",
    alias: ["Nätspänning", "Driftspänning"],
    monster: /(\d+)\s*V\b/i,
  }),
  F("Garanti", {
    enhet: "år",
    alias: ["Garantitid", "Års garanti"],
    monster: /(\d+)\s*års?\s*garanti/i,
  }),
  F("GTIN"),
];

/**
 * ## Smart garageportsöppnare
 *
 * Systerschema till GARAGEPORTSOPPNARE. Den här kategorin rankar modulerna som
 * kopplas till en öppnare du redan har, inte motorerna.
 *
 * ⚠️ `Positionssensor` står med trots att den visade sig finnas på alla
 * produkter från 374 kronor och uppåt. Hypotesen att den skulle skilja billiga
 * från dyra prövades och föll, se .agent/research/smart-garageportsoppnare.md
 * §3. Raden är ändå värd att bära, eftersom en köpare som jämför med en äldre
 * produkt behöver se att den finns — och eftersom en tom cell här skulle vara
 * ett verkligt fynd om en ny produkt saknar den.
 *
 * `Strömförsörjning` är kategorins viktigaste fält och skälet till att
 * schemat finns. En modul som matas med 230 V och ska sitta i en kopplingsdosa
 * är en förändring av den fasta installationen och kräver registrerat
 * elinstallationsföretag, medan en USB-matad är ett skruvmejseljobb. Se
 * /smart-strombrytare, där gränsen redan är utredd mot Elsäkerhetsverket.
 */
const SMART_GARAGEPORTSOPPNARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Strömförsörjning", {
    alltid: true,
    alias: ["Matning", "Ström", "Strömkälla", "Spänningsmatning", "Power"],
    monster: /(USB|230\s?V|5\s?V|batteri)/i,
  }),
  F("Kräver elinstallatör", {
    alltid: true,
    alias: ["Behörighet", "Fast installation", "Elinstallation"],
  }),
  F("Positionssensor", {
    alltid: true,
    alias: ["Dörrsensor", "Portsensor", "Öppningssensor", "Reedbrytare", "Tungkontakt", "Lägesgivare"],
  }),
  F("Statusbesked i app", {
    alltid: true,
    alias: ["Status", "Visar status", "Öppen eller stängd", "Lägesindikering"],
  }),
  F("Aviseringar", {
    alias: ["Notiser", "Push", "Händelsemeddelanden", "Larm vid öppning"],
  }),
  F("Ekosystem", {
    alltid: true,
    alias: ["Röststyrning", "Kompatibilitet app", "Fungerar med", "Assistent"],
  }),
  F("Matter", { alias: ["Matter-stöd", "Matter over Wi-Fi"] }),
  F("HomeKit", { alias: ["Apple Home", "Apple HomeKit", "Siri"] }),
  F("Kräver hubb", {
    alltid: true,
    alias: ["Hubb", "Gateway", "Brygga", "Bridge", "Nav"],
  }),
  F("Tvåfaktorsautentisering", {
    alltid: true,
    alias: ["2FA", "Tvåfaktor", "Tvåstegsverifiering", "Kontosäkerhet"],
  }),
  F("Kryptering", {
    alias: ["Krypterad", "AES", "TLS", "Säkerhet dataöverföring"],
  }),
  F("Anslutning", {
    alias: ["Trådlöst", "Radio", "Wifi", "Bluetooth", "Frekvens"],
    monster: /(2[,.]4\s?GHz|Bluetooth|BLE|Wi-?Fi)/i,
  }),
  F("Passar porttyp", {
    alias: ["Porttyp", "Kompatibla portar", "Fungerar med port"],
  }),
  F("Antal portar", {
    enhet: "st",
    alias: ["Portar", "Kanaler", "Antal kanaler"],
    monster: /(\d+)\s*(?:portar?|kanaler?)/i,
  }),
  F("Mått", {
    alias: ["Storlek", "Dimensioner", "Yttermått"],
    monster: /(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*(mm|cm)/i,
  }),
  F("GTIN"),
];

/** Kategorier som ännu inte fått ett schema kör i friläge, se svepet. */
export const SPEC_SCHEMA = {
  "smart-garageportsoppnare": SMART_GARAGEPORTSOPPNARE,
  "garageportsoppnare": GARAGEPORTSOPPNARE,
  "usb-c-laddare": USB_C_LADDARE,
  "usb-c-kabel": USB_C_KABEL,
  nyckelskap: NYCKELSKAP,
  avfuktare: AVFUKTARE,
  robotdammsugare: ROBOTDAMMSUGARE,
  vattenlarm: VATTENLARM,
  vattenfelsbrytare: VATTENFELSBRYTARE,
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
