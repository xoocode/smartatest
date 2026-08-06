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
 * hygrometersidan, och `Noggrannhet fukt` ersatte det första 2026-08-06. En
 * gissad tolerans är en påhittad mätning: talen skiljer sig mellan modeller
 * från samma tillverkare, och en lånad tolerans ser ut som en uppgift läsaren
 * kan handla på.
 */
export const ALDRIG_BEDOMD = [
  "Pris",
  "Testomdöme",
  /* Tillkom 2026-08-06 med /smartwatch. Hela sidans fynd är att ordet
     batteritid bär fem olika villkor och att handeln trycker ett av dem.
     Garmin anger 12 dagar i smartwatchläge och 9 timmar med alla satelliter
     och musik för samma klocka; Samsung anger 100, 80, 60 och 48 timmar för
     Galaxy Watch Ultra i fyra rader av samma tabell. Räknar vi om mellan
     lägen, eller lånar ett tal från en systermodell, raderas exakt den
     spridning sidan finns för att visa. Den som bara anger ett läge ska synas
     bara ange ett läge. Samma skäl som `Angiven besparing` på
     /smart-termostat och de två drifttiderna på /skaftdammsugare. */
  "Batteritid vardag",
  "Batteritid med alltid på-skärm",
  "Batteritid i sparläge",
  "Batteritid med GPS",
  "Provad av Which?",
  "Angiven noggrannhet",
  "Noggrannhet fukt",
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
     `Noggrannhet fukt` på /hygrometer. */
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
  /* Tillkom 2026-08-05 med /powerbank. Kriteriet öppen redovisning mäter just
     vem som anger wattimmar, alltså den storhet Transportstyrelsen reglerar
     efter: högst 100 Wh utan flygbolagets godkännande. Uppmätt hos Kjell anger
     åtta av tio produkter ingen wattimme alls. Räknar vi om mAh åt dem som
     tiger försvinner hela den skillnad vi mätt, och talet blir dessutom osäkert
     eftersom cellspänningen varierar mellan 3,6 och 3,7 V och paketspänningen
     kan vara en annan. Samma skäl som `Angiven besparing` och `Dragkraft`. */
  "Energiinnehåll",
  /* Tillkom 2026-08-05 med /mjolkskummare. En mjölkskummare har två maxnivåer
     som skiljer ungefär på hälften, och talet i modellnamnet är genomgående
     uppvärmningsmaxet. Kvoten hos Severin ligger så nära 50 procent genom hela
     sortimentet att det frestar att räkna fram det ena ur det andra, och det
     är precis felet: kvoten gäller ett fabrikat, medan Philips CA6500 anger
     120 ml skum utan att publicera något värmemax alls. Coffee Friend lägger
     dessutom skummaxet i samma fält som en annan produkts värmemax. Ett härlett
     tal raderar den spridningen. Samma skäl som `Energiinnehåll`.

     `Skumtemperatur` av samma skäl: två tillverkare av tretton anger något, och
     Severins 45–65 °C och CHiATOs 75–80 °C går inte ihop mot Råd & Röns
     63–67. Den som tiger ska synas tiga. */
  "Skumkapacitet",
  "Uppvärmningskapacitet",
  "Skumtemperatur",
  /* Tillkom 2026-08-06 med /pizzaugn. tek.no har mätt stentemperaturen på tre
     punkter efter 30 minuters uppvärmning, och spridningen är hela sidans fynd:
     Ooni Koda 12 ger 480 °C längst bak och 220 °C längst fram, alltså 260
     graders skillnad på samma sten. Talen hör till exakt den modell som provats.
     Ooni Koda 12 och Ooni Koda 2 är olika ugnar, Karu 12G och Karu 2 likaså, och
     att låna ett tal mellan generationer vore samma fel som Nanoleaf Lines mot
     Essentials på /smart-belysning och ABUS 787C mot 787 på /nyckelskap.

     Fyra modeller säljs här under exakt det namn tek.no provat: Witt Piccolo
     Rotante 16", Sage SPZ820, Gozney Roccbox och Ooni Koda 16. Ingen annan
     modell får ett värde i de här fälten. Kriteriet `jamn-varme` betygsätter
     därför konstruktionen som orsakar spridningen, inte mätvärdet — annars hade
     provningsurvalet avgjort rankningen. */
  "Uppmätt stentemperatur bak",
  "Uppmätt stentemperatur fram",
  /* Tillkom 2026-08-05 med /iphone-skal. Sidans fynd är att militärstandarden
     på kartongen inte går att jämföra: MIL-STD-810H §1.2 b säger uttryckligen
     att det inte är giltigt att betrakta en metods provvillkor som oföränderliga,
     och tabell 516.8-IX bytte förvalt underlag från plywood till stål 2019 utan
     att ett enda skalmärke följt med. Kriteriet öppen redovisning mäter alltså
     vem som skriver ut utgåva, metod, underlag och antal exemplar. Fyller vi i
     ett värde åt den som tiger mäter vi vår egen efterforskning i stället för
     produkten, och husmärkena — som anger ingenting alls — skulle se ut som
     märkena. Samma skäl som `Angiven besparing` och `Angivet böjtal`. */
  "Angiven fallhöjd",
  "Angiven militärstandard",
  "Angivet antal fall",
  /* Tillkom 2026-08-05 med /slackspray. Effektivitetsklassen enligt SS-EN 3–7
     är sidans avgörande uppgift, och fyndet är att Housegard anger 5A 21B (E) 5F
     och Taerosol 3A 13B (E) 5F medan Biltema inte anger någonting alls för sina
     två sprayer. Klassen är säkerhetsformad: talet säger hur stort testbål
     produkten provats mot, och 43A som MSB rekommenderar för hemmet är åtta
     gånger 5A. Gissar vi en klass, eller lånar den från en systermodell,
     försvinner både skillnaden och tystnaden vi mätt. Samma skäl som
     `Noggrannhet fukt` på /hygrometer. */
  "Effektivitetsklass",
  "Angivet provunderlag",
  "Angiven kanthöjd",
  /* Av motsatt skäl, alltså samma som `USB-IF-certifiering` på /usb-c-kabel:
     Apples MFi-register går inte att söka per artikel utan konto, så att en
     produkt saknas där bevisar ingenting. Vi återger vad säljaren skriver ut
     och gissar aldrig åt någon — varken ja eller nej. */
  "MagSafe-certifiering",
  "Angiven magnetstyrka",
  /* Tillkom 2026-08-05 med /galaxy-s26-skal. Två fält, två olika skäl.

     `Qi2-certifiering` av samma skäl som `MagSafe-certifiering` ovan: WPC:s
     register går inte att söka per artikel, så en frånvaro där bevisar
     ingenting om produkten.

     `Butikens term för magneten` av ett annat och ovanligare skäl: fältet
     beskriver **säljarens ordval och inte produkten**. Samtliga magnetskal till
     Galaxy S26 säljs som *MagSafe-kompatibel*, alltså Apples varumärke på en
     Samsung-telefon, och det gäller även Samsungs egna skal. UNIQ kallar sitt
     *MagClick*. Att sätta betyg på det vore att betygsätta butikens copywriting
     i stället för produkten, precis som `Angivet RFID-skydd` nedan. Uppgiften
     står kvar därför att den är ett verkligt hinder för köparen: det finns
     ingen term att söka på som ger rätt svar. */
  "Qi2-certifiering",
  "Butikens term för magneten",
  /* Tillkom 2026-08-06 med reparationen av /galaxy-s26-skal, och ersätter där
     de fyra fälten ovan med ett. Skälet att det aldrig betygsätts är inte att
     uppgiften saknas — tre av tolv tillverkare anger en höjd — utan att talen
     inte mäter samma sak. Samsung anger 1,22 meter i fem omgångar om 26 fall
     mot stål, Spigen 1,2 meter och 26 fall, UNIQ tre meter utan underlag. Del
     ett §1.2 b i MIL-STD-810 säger att det inte är giltigt att betrakta en
     metods provvillkor som oföränderliga, och tabell 516.8-IX tillåter att de
     26 fallen delas på upp till fem exemplar. Ett betyg på de här talen hade
     rankat marknadsföringen. Talen står i tabellen, som streck där de saknas. */
  "Falltest enligt tillverkaren",
  /* Tillkom 2026-08-05 med /iphone-fodral. Uppgiften är ett rent ja utan tal:
     ingen tillverkare anger dämpning, frekvens eller standard, och den skiljer
     inte produkterna åt eftersom både Trolsks fodral på 199 kr och
     dbramante1928 Copenhagen på 499 anger RFID-skyddade kortfack. Den enda
     oberoende provning som finns, Alecci m.fl. RAID '23, uteslöt dessutom
     uttryckligen de skärmande korten, alltså just fodralens mekanism. Att
     fylla i eller betygsätta ett värde här vore att mäta butikens
     copywriting. Samma skäl som `Angiven besparing`. */
  "Angivet RFID-skydd",
  /* Tillkom 2026-08-05 med /iphone-skarmskydd. Talet 9H som står på nästan varje
     skärmskydd är **taket på en färgstandards skala**, inte ett mätvärde.

     ASTM D3363-22 §1.1 beskriver metoden som "film hardness of an organic
     coating on a metal or similarly hard substrate", och ISO 15184:2020 heter
     "Paints and varnishes — Determination of film hardness by pencil test" med
     ICS 87.040. Skalan går enligt Tekras tekniska not från 6B, mjukast, till
     **9H, hårdast**, vilket är skälet till att alla anger samma sak.

     ISO:s eget abstract säger dessutom att metoden "has not been found to be
     useful in comparing the pencil hardness of different coatings", och ASTM
     §5.2 att resultatet varierar mellan laboratorier och med pennfabrikat.
     Lasten avgör utfallet och redovisas aldrig i handeln.

     Att betygsätta talet vore alltså att mäta butikens copywriting två gånger
     om: skalan är fel skala för produkten, och taket är gemensamt. Fälten står
     kvar i schemat därför att spridningen mellan de som anger något och de som
     inte gör det är sidans fynd, precis som `Sugkraft` på /robotdammsugare.
     Samma skäl som `Angiven besparing` och `Angiven fallhöjd`.

     `Glastyp` av samma sort: ingen produktsida i kategorin anger om glaset är
     kalk-natron eller aluminosilikat, och att härleda det ur priset eller ur en
     systermodell vore en påhittad materialuppgift. */
  "Angiven hårdhet",
  "Angiven hårdhetsstandard",
  "Angiven provlast",
  "Glastyp",
  /* Tillkom 2026-08-05 med /bluetooth-hogtalare. Butiken anger speltiden på två
     ställen på samma produktsida och talen är inte överens: JBL Charge 6 står
     som "Upp till 28 tim" i säljpunkterna och 24 h i spectabellens fält
     `Drifttid för batteri`, JBL Flip 7 som 16 mot 14. De två modeller som anger
     flest timmar är också de två som inte stämmer med sig själva.

     Båda talen ska stå, var för sig, precis som `Angiven kapacitet` mot uppmätt
     på /avfuktare. Slås de ihop försvinner spridningen som är sidans fynd, och
     att välja säljpunktens tal vore att mäta butikens copywriting.

     ⚠️ Vikten bär en egen varning, men den ligger i kategorischemat och inte
     här, eftersom `Vikt` är ett fältnamn nästan varje kategori använder. Se
     BLUETOOTH_HOGTALARE. */
  "Angiven speltid",
  "Speltid i specifikationen",
  /* Tillkom 2026-08-05 med /powerstation. Kriteriet säkerhet och livslängd
     väger 25, och det mäter vem som publicerar ett cykeltal över huvud taget.
     Spannet är en faktor fyra: Anker anger 4 000 cykler till 80 procent för
     C1000X Gen 2 och 3 000 för C800x, EcoFlow 3 000 för River 3 Plus och
     4 000 för Delta 3, Jackery 1 000 för Explorer 1000 Pro. Cocraft och
     TogoPower anger inget alls.

     Att gissa ur cellkemin vore särskilt frestande här, eftersom LiFePO4
     nästan alltid ligger på 3 000, men då raderas just den spridning sidan
     mäter — och Jackerys 1 000 visar att kemin inte avgör talet ensam.
     Cocrafts bruksanvisning lästes i sin helhet på fyra språk 2026-08-05:
     batterityp, cellspänning, amperetimmar, kapacitet och laddtid står
     utskrivna, cykeltalet gör det inte. Samma skäl som `Angiven besparing`.

     `Ljudnivå` av samma sort. Sex av tio produkter anger ett dB-tal, och de
     som gör det spänner från Ankers 20 dB till Jackerys 30. Ingen av de sex
     svenska konkurrentsidorna innehåller ett enda dB-tal, kontrollerat med
     reguljärt uttryck. Att härleda ljudnivån ur fläktstorlek eller pris vore
     en påhittad mätning. */
  "Cykler till 80 %",
  "Ljudnivå",
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

/** ## Hygrometer. Kategorins avgörande fält är `Noggrannhet fukt`, alltså hur
 * många procentenheter mätaren får visa fel. `Uppmätt avvikelse` är vad en
 * oberoende provning faktiskt mätte. **De ska aldrig slås ihop till en rad.**
 * Det förra är ett löfte, det senare ett resultat, och blandar man dem ser ett
 * löfte ut som en mätning.
 *
 * ⚠️ **Fältet hette `Angiven noggrannhet` fram till 2026-08-06.** Namnet kom av
 * att sidan trodde att bara två av tretton mätare publicerade ett tal, alltså
 * att själva angivandet var det som skilde dem åt. Ett gap-pass mot manualerna
 * gav fem av sju, och rubriken beskrev därmed vår research och inte varan. Nu
 * heter raden som sin syskonrad `Noggrannhet temperatur`.
 *
 * Talet står nästan aldrig på produktsidan. Det står i bruksanvisningen, som
 * ligger som PDF på butikens eller tillverkarens egen sida. Se
 * `.agent/research/hygrometer.md`. */
const HYGROMETER = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Noggrannhet fukt", {
    alias: [
      "Angiven noggrannhet",
      "Noggrannhet",
      "Mätnoggrannhet",
      "Tolerans",
      "Precision",
      "Genauigkeit",
    ],
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
  F("Rapporttröskel", { alias: ["Rapportintervall"] }),
  F("Placering", { alias: ["Montering", "Upphängning"] }),
  F("Ström", { alias: ["Batteri", "Batterityp", "Strömförsörjning"] }),
  F("Batteritid", { enhet: "år", alias: ["Batterilivslängd"] }),
  F("Mått", { alias: ["Storlek", "Dimensioner"] }),
  F("Vikt", { enhet: "g" }),
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
 * `Ventilfattningar` är det som avgör om köpet fungerar över huvud taget.
 * Termostaten skruvas på den ventil som redan sitter där, och spannet är stort:
 * Netatmo och tado täcker tio fattningar, Danfoss Ally RA täcker två.
 *
 * ⚠️ Fältet räknar bara fattningar tillverkaren namnger och levererar adapter
 * för. Hette `Angivna ventiler` fram till 2026-08-06, och namnet lockade fram
 * fel fråga: tre produkter stod som utan uppgift därför att listan låg i en
 * bruksanvisning eller en kompatibilitetsguide ingen öppnat. Öppna dokumentet.
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
  F("Ventilfattningar", {
    alias: [
      "Angivna ventiler",
      "Ventil",
      "Ventilfattning",
      "Passar ventiler",
      "Adaptrar",
      "Gänga",
    ],
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
/**
 * ## Powerbank
 *
 * Beslutat 2026-08-05, före insamlingen. Systerschema till USB_C_LADDARE och
 * USB_C_KABEL, vars avgränsning sköt powerbanken hit.
 *
 * ### Varför `Kapacitet` och `Energiinnehåll` är två fält
 *
 * Samma skäl som `Dragkraft` mot `Vridmoment` på /garageportsoppnare: det är
 * två storheter, inte två sätt att skriva samma tal.
 *
 * `Kapacitet` är laddningsmängd i mAh och gäller cellen vid dess egen spänning,
 * typiskt 3,6 till 3,7 V. `Energiinnehåll` är energi i wattimmar och är det tal
 * Transportstyrelsen reglerar efter: högst 100 Wh utan flygbolagets
 * godkännande. Stiftung Warentest, häfte 2/2026, skriver att mAh-uppgiften är
 * "nur begrenzt aussagekräftig" och att det som betyder något är uttagbar
 * energi i Wh.
 *
 * Uppmätt hos Kjell 2026-08-05: **åtta av tio produkter anger ingen wattimme
 * alls**, och de två som gör det är de två största, alltså de som ligger
 * närmast flyggränsen. Anker Prime anger 99,75 Wh mot ett tak på 100.
 *
 * ⚠️ **Räkna aldrig om mAh till Wh åt en tillverkare som tiger.** Cellspänningen
 * varierar mellan 3,6 och 3,7 V och paketspänningen kan vara en annan, så ett
 * uträknat tal är inte ett publicerat. Hela poängen med kriteriet öppen
 * redovisning är att skilja dem som anger talet från dem som inte gör det.
 * Båda fälten ligger därför i `ALDRIG_BEDOMD`.
 */
const POWERBANK = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Kapacitet", {
    enhet: "mAh",
    alltid: true,
    alias: ["Batterikapacitet", "Nominell kapacitet", "Cellkapacitet"],
    monster: /([\d\s.,]+)\s*m[Aa]h\b/,
  }),
  /* Wattimmar. Står med för att visa vem som anger den storhet myndigheten
     reglerar efter, inte för att räknas om ur raden ovan. Se filhuvudet. */
  F("Energiinnehåll", {
    enhet: "Wh",
    alltid: true,
    alias: ["Wattimmar", "Energi", "Wh-kapacitet"],
    monster: /([\d.,]+)\s*Wh\b/,
  }),
  F("Uteffekt", {
    enhet: "W",
    alltid: true,
    alias: ["Maxeffekt ut", "Laddeffekt", "Utgående effekt", "Total uteffekt"],
    monster: /([\d.,]+)\s*W\b/,
  }),
  F("Ineffekt", {
    enhet: "W",
    alias: ["Laddeffekt in", "Ingående effekt", "Uppladdning"],
  }),
  F("Antal portar", {
    enhet: "st",
    alltid: true,
    alias: ["Portar", "Uttag", "Anslutningar"],
    monster: /(\d+)\s*(?:st\s*)?portar/i,
  }),
  F("Porttyper", {
    alias: ["Anslutningstyp", "Kontakter", "USB-portar"],
  }),
  F("Power Delivery", {
    alias: ["PD", "USB PD", "Snabbladdning", "PD 3.1"],
  }),
  F("Trådlös laddning", {
    alltid: true,
    alias: ["Qi", "Qi2", "MagSafe", "Magnetisk", "Induktiv laddning"],
  }),
  F("Vikt", {
    enhet: "g",
    alltid: true,
    alias: ["Produktvikt", "Nettovikt"],
    monster: /([\d.,]+)\s*g\b/,
  }),
  F("Mått", {
    alias: ["Storlek", "Dimensioner", "Yttermått"],
    monster: /(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*[x×]\s*(\d+[,.]?\d*)\s*(mm|cm)/i,
  }),
  F("Display", {
    alias: ["Skärm", "Statusdisplay", "Laddindikator", "Procentvisning"],
  }),
  F("Genomladdning", {
    alias: ["Pass-through", "Ladda samtidigt", "Passthrough"],
  }),
  F("Inbyggd kabel", {
    alias: ["Integrerad kabel", "Medföljande kabel", "Utdragbar kabel"],
  }),
  F("Cykeltal", {
    enhet: "cykler",
    alias: ["Laddcykler", "Livslängd", "Antal cykler"],
    monster: /([\d\s.,]+)\s*(?:ladd)?cykler/i,
  }),
  F("Garanti", {
    enhet: "år",
    alias: ["Garantitid"],
    monster: /(\d+)\s*års?\s*garanti/i,
  }),
  F("GTIN"),
];

/**
 * ## iPhone-skal
 *
 * Beslutat 2026-08-05, före insamlingen. Fjärde schemat i Elektronik, efter
 * USB_C_LADDARE, USB_C_KABEL och POWERBANK.
 *
 * ### Varför fälten är uppdelade i *angivet* och *observerat*
 *
 * Det är hela sidans konstruktion, och den kommer ur att kategorin har två
 * sorters uppgifter som ser lika ut men inte är det.
 *
 * **Angivna** uppgifter är tillverkarens påståenden om skydd: fallhöjd,
 * militärstandard, antal fall, provunderlag. De ligger alla i `ALDRIG_BEDOMD`,
 * de betygsätts aldrig som mätvärden, och de bär kriteriet *öppen redovisning* —
 * alltså vem som skriver ut något över huvud taget.
 *
 * **Observerade** uppgifter är sådant som går att se på produktbilden och i
 * konstruktionen: finns en förhöjd kant runt skärmen, finns en runt kameran, är
 * hörnen förstärkta, är knapparna täckta. De bär kriteriet *skydd du kan se*,
 * som väger 40 och alltså är sidans tyngsta. En bedömd sådan uppgift är
 * legitim och renderas som "Vår bedömning".
 *
 * Skillnaden är samma som mellan `Angiven noggrannhet` och det fysiska
 * linsskyddet på /inomhuskamera: vi betygsätter det köparen kan kontrollera,
 * inte det säljaren råkar skriva.
 *
 * ### ⚠️ Kanthöjden finns i två fält och det är avsiktligt
 *
 * `Förhöjd kant skärm` är ja eller nej och får bedömas ur produktbilden.
 * `Angiven kanthöjd` är ett tal i millimeter och får aldrig bedömas, eftersom
 * bara ett fåtal märken publicerar det. Slår man ihop dem försvinner just den
 * skillnad kriteriet finns för att visa.
 *
 * ### ⚠️ `Passar modeller` är sidans variantskydd
 *
 * Ett skal passar exakt en modellstorlek, och iPhone 17 och 17 Pro delar
 * skärmstorlek men inte skal. Fältet är `alltid` av det skälet, och priset i
 * `Pris` gäller alltid 17 Pro-varianten som referens. Se filhuvudet i
 * lib/data/iphone-skal.ts.
 */
const IPHONE_SKAL = [
  F("Pris", { enhet: "kr", alltid: true }),
  /* Variantskyddet. Skriv modellerna som Apple skriver dem: "iPhone 17",
     "iPhone 17 Pro", "iPhone 17 Pro Max", "iPhone Air". */
  F("Passar modeller", {
    alltid: true,
    alias: ["Kompatibilitet", "Passar till", "Modell", "Kompatibla modeller"],
  }),
  F("Material", {
    alltid: true,
    alias: ["Materialtyp", "Tillverkad av", "Ytmaterial", "Konstruktion"],
  }),

  /* ── Skydd du kan se, kriterium 1 på 40 ────────────────────────────────── */
  F("Förhöjd kant skärm", {
    alltid: true,
    alias: ["Upphöjd kant", "Skärmkant", "Förhöjd ram", "Kant runt skärmen"],
  }),
  F("Förhöjd kant kamera", {
    alltid: true,
    alias: ["Kameraskydd", "Kamerakant", "Upphöjd kamerakant", "Linsskydd"],
  }),
  F("Hörnkonstruktion", {
    alltid: true,
    alias: ["Förstärkta hörn", "Hörnskydd", "Luftkuddar", "Air Cushion", "Stötdämpning"],
  }),
  F("Knappar", {
    alias: ["Knapputförande", "Täckta knappar", "Knappskydd", "Sidoknappar"],
  }),
  /* Talet, till skillnad från ja-eller-nej ovan. Se ALDRIG_BEDOMD. */
  F("Angiven kanthöjd", {
    enhet: "mm",
    alias: ["Kanthöjd", "Upphöjning", "Lip"],
    monster: /(\d+[,.]?\d*)\s*mm/i,
  }),
  F("Tjocklek", {
    enhet: "mm",
    alias: ["Godstjocklek", "Skalets tjocklek", "Tjock"],
    monster: /(\d+[,.]?\d*)\s*mm/i,
  }),
  F("Vikt", {
    enhet: "g",
    alias: ["Skalets vikt", "Produktvikt"],
    monster: /(\d+[,.]?\d*)\s*g\b/i,
  }),

  /* ── Öppen redovisning av skydd, kriterium 2 på 22 ─────────────────────── */
  /* Utgåvan är fyndet. Skriv den som säljaren skriver den, alltså "MIL-STD-810G"
     även när den är ersatt sedan 2019, och skriv ut metoden när den anges:
     "516.6" hör till G, "516.8" till H. Räkna aldrig om åt någon. */
  F("Angiven militärstandard", {
    alltid: true,
    alias: ["Militärstandard", "MIL-STD", "Military Grade", "Militärklassad", "Standard"],
    monster: /MIL-?STD-?810\s*([GH])?(?:\s*[-,]?\s*(?:metod|method)?\s*(516\.\d))?/i,
  }),
  F("Angiven fallhöjd", {
    enhet: "m",
    alltid: true,
    alias: ["Fallhöjd", "Falltest", "Droptest", "Drop protection", "Fallskydd"],
    monster: /(\d+[,.]?\d*)\s*(?:m|meter|fot|feet|ft|tum|in)\b/i,
  }),
  F("Angivet antal fall", {
    enhet: "st",
    alias: ["Antal fall", "Antal drops", "Fall", "Drops"],
    monster: /(\d+)\s*(?:fall|drops?|gånger)/i,
  }),
  /* Plywood eller stål. MIL-STD-810H tabell 516.8-IX not 1 gör stål till förval
     och plywood till undantag med två villkor, och ingen anger vilket. */
  F("Angivet provunderlag", {
    alias: ["Provunderlag", "Underlag", "Testyta", "Impact surface"],
  }),
  F("Garanti", {
    enhet: "år",
    alias: ["Garantitid", "Garantivillkor"],
    monster: /(\d+)\s*års?\s*garanti/i,
  }),

  /* ── Magnet och trådlös laddning, kriterium 4 på 16 ────────────────────── */
  F("Magnetring", {
    alltid: true,
    alias: ["Magnet", "MagSafe", "Magnetisk", "Inbyggd magnet", "Magnetkrets"],
  }),
  /* "Made for MagSafe" är Apples eget program och något annat än "magnetisk".
     Se ALDRIG_BEDOMD: frånvaro i registret bevisar ingenting. */
  F("MagSafe-certifiering", {
    alias: ["Made for MagSafe", "MFi", "MFi-certifierad", "Apple-certifierad", "Qi2"],
  }),
  F("Angiven magnetstyrka", {
    enhet: "N",
    alias: ["Magnetstyrka", "Häftkraft", "Dragkraft magnet", "Magnetkraft"],
    monster: /(\d+[,.]?\d*)\s*(?:N|newton|kg)\b/i,
  }),
  F("Trådlös laddning genom skalet", {
    enhet: "W",
    alltid: true,
    alias: ["Trådlös laddning", "Qi", "Qi2", "Laddning genom skalet", "Wireless charging"],
    monster: /(\d+[,.]?\d*)\s*W\b/i,
  }),

  F("GTIN"),
];

/**
 * ## Släckspray
 *
 * Kategorin är liten, fem produkter, och den publicerade datan är tunn. Det är
 * sidans poäng och inte dess brist: LTH:s examensarbete slår fast att den
 * största bristen med produkttypen är "bristande eller annars misstolkningsbar
 * information från tillverkare och återförsäljare".
 *
 * `Effektivitetsklass` är det fält allt hänger på. Släcksprayer omfattas av
 * **SS-EN 3–7**, samma standard som handbrandsläckarna på `/brandslackare`, och
 * klassen ska stå på burken. Housegard anger 5A 21B (E) 5F och Taerosol
 * 3A 13B (E) 5F, båda bekräftade av två butiker oberoende av varandra. Biltema
 * anger ingenting alls för sina två sprayer.
 *
 * Se ALDRIG_BEDOMD: klassen får aldrig gissas eller lånas från en systermodell.
 * Att den saknas är ett utfall, inte ett tomrum att fylla.
 */
const SLACKSPRAY = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Effektivitetsklass", {
    alltid: true,
    alias: ["Brandklass", "Klass", "EN 3-klass", "Släckklass", "Effektklass"],
    monster: /(\d{1,2}\s?A(?:\s?\d{1,3}\s?B)?(?:\s?\(?E\)?)?(?:\s?\d{1,2}\s?F)?)/,
  }),
  F("Volym", {
    enhet: "ml",
    alltid: true,
    alias: ["Nettovolym", "Innehåll", "Mängd", "Storlek"],
    monster: /(\d{3,4})\s*ml\b/i,
  }),
  F("Tömningstid", {
    enhet: "s",
    alias: ["Utloppstid", "Funktionstid", "Sprutstid", "Verkningstid"],
    monster: /(\d{1,2})\s*(?:–|-|till)\s*(\d{1,2})\s*s(?:ek)?\b/i,
  }),
  F("Släckmedel", {
    alltid: true,
    alias: ["Släckmedium", "Innehåller", "Medel", "Typ av släckmedel"],
  }),
  F("Fettbrand", {
    alias: ["F-klass", "Matolja", "Frityr", "Klass F"],
  }),
  F("Litiumbatteri", {
    alias: ["Litium", "Lithium", "AVD", "Batteribrand"],
  }),
  F("Kastlängd", {
    enhet: "m",
    alias: ["Räckvidd", "Sprutlängd", "Avstånd"],
    monster: /(\d(?:[,.]\d)?)\s*(?:–|-|till)?\s*(\d(?:[,.]\d)?)?\s*m\b/i,
  }),
  F("Temperaturområde", {
    enhet: "°C",
    alias: ["Driftstemperatur", "Förvaringstemperatur", "Arbetstemperatur"],
    monster: /([+-]?\d+)\s*°?\s*C\s*(?:\/|–|-|till)\s*([+-]?\d+)\s*°?\s*C/i,
  }),
  F("Hållbarhet", {
    enhet: "år",
    alias: ["Livslängd", "Bäst före", "Utgångsdatum"],
    monster: /(\d{1,2})\s*års?\b/i,
  }),
  F("GTIN"),
];

/**
 * ## iPhone-fodral, alltså uppfällbara plånboksfodral
 *
 * Beslutat 2026-08-05, före insamlingen. Systerschema till IPHONE_SKAL, vars
 * avgränsning uttryckligen sköt plånboksfodralen hit.
 *
 * ### Avgränsningen styr fältlistan
 *
 * Sidan rankar **bara uppfällbara fodral**, alltså boken med kortfack som viks
 * över skärmen. Avtagbara 2-i-1, magnetiska korthållare och skal med kortficka
 * är andra produkter och förklaras i köpguiden. Därför finns inget fält för
 * avtagbar innerdel: det hade varit `Nej` på varje rad.
 *
 * ### `Telefonens infästning` är kategorins dolda skillnad
 *
 * Tre konstruktioner säljs under samma ord och de åldras helt olika. Ett limmat
 * plastskal släpper från lädret, en TPU-hållare gör det inte, och ett
 * magnetskal går att lyfta ur. Uppgiften står sällan i rubriken men nästan
 * alltid i produkttexten, och den avgör om fodralet håller ett år eller fem.
 *
 * ### ⚠️ `Angivet RFID-skydd` betygsätts aldrig
 *
 * Ligger i `ALDRIG_BEDOMD`. Tre skäl, och alla tre håller var för sig:
 *
 * 1. **Ingen publicerar något kontrollerbart.** Ingen tillverkare anger
 *    dämpning i decibel, frekvens eller standard. Påståendet är ett ja.
 * 2. **Uppgiften skiljer inte produkterna åt.** Uppmätt hos iPhonebutiken
 *    2026-08-05 anger både Trolsks fodral på 199 kr och dbramante1928
 *    Copenhagen på 499 RFID-skyddade kortfack.
 * 3. **Den enda oberoende provning som finns gäller en annan mekanism.**
 *    Alecci m.fl., RAID '23, kringgick 8 av 11 blockeringskort, men de tre
 *    skärmande korten, alltså samma Faraday-princip som ett fodral använder,
 *    uteslöts uttryckligen ur angreppsutvärderingen. Att låna det
 *    provresultatet hit vore samma variantfälla som ABUS 787 mot 787 Smart-BT.
 *
 * Fältet står kvar i schemat ändå, eftersom frånvaron av ett tal är den
 * uppgift köpguiden bygger på.
 */
const IPHONE_FODRAL = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Passar modeller", {
    alltid: true,
    alias: ["Kompatibilitet", "Passar till", "Modell", "Kompatibla modeller"],
  }),

  /* ── Kortkapacitet och förvaring, kriterium 1 på 25 ────────────────────── */
  F("Antal kortfack", {
    enhet: "st",
    alltid: true,
    alias: ["Kortfack", "Kortplatser", "Antal kort", "Kortförvaring", "Kortfickor"],
    monster: /(\d+)\s*(?:kortfack|kortplatser|kort)\b/i,
  }),
  F("Sedelfack", {
    alltid: true,
    alias: ["Sedelfick", "Sedlar", "Kontantfack"],
  }),
  F("Myntfack", {
    alias: ["Myntficka", "Mynt"],
  }),

  /* ── Material och konstruktion, kriterium 2 på 25 ──────────────────────── */
  F("Material", {
    alltid: true,
    alias: ["Materialtyp", "Ytmaterial", "Tillverkad av", "Yttermaterial"],
  }),
  F("Foder", {
    alias: ["Innermaterial", "Innerfoder", "Insida"],
  }),
  /* Kategorins dolda skillnad. Se filhuvudet. */
  F("Telefonens infästning", {
    alltid: true,
    alias: ["Infästning", "Hållare", "Innerskal", "Fastsättning", "Telefonhållare"],
  }),
  F("Kameraskydd", {
    alias: ["Kameralinsskydd", "Linsskydd", "Kamerautskärning"],
  }),

  /* ── Laddning och magnet, kriterium 4 på 20 ────────────────────────────── */
  F("Trådlös laddning genom fodralet", {
    alltid: true,
    alias: ["Trådlös laddning", "Qi", "Qi2", "Laddning genom fodralet"],
  }),
  F("MagSafe-magnet", {
    alltid: true,
    alias: ["MagSafe", "Magnetring", "Magnet", "MagSafe-kompatibel"],
  }),

  /* ── Vardagsfunktion, kriterium 5 på 10 ────────────────────────────────── */
  F("Stängning", {
    alltid: true,
    alias: ["Låsning", "Stängningstyp", "Magnetlås", "Knäppning", "Dragkedja"],
  }),
  F("Stativfunktion", {
    alltid: true,
    alias: ["Stativ", "Ställ", "Stödfunktion"],
  }),
  F("Rem", {
    alias: ["Handledsrem", "Axelrem", "Snodd", "Band"],
  }),
  F("Öppningsriktning", {
    alias: ["Öppning", "Vikriktning"],
  }),

  /* Se ALDRIG_BEDOMD och filhuvudet. Med i schemat för att frånvaron av ett
     kontrollerbart tal är det köpguiden bygger på. */
  F("Angivet RFID-skydd", {
    alltid: true,
    alias: ["RFID", "RFID-skydd", "RFID-blockering", "Skimmingskydd", "NFC-skydd"],
  }),

  F("Garanti", {
    enhet: "år",
    alias: ["Garantitid", "Garantivillkor"],
    monster: /(\d+)\s*års?\s*garanti/i,
  }),
  F("GTIN"),
];

/**
 * ## iPhone skärmskydd
 *
 * Beslutat 2026-08-05, före insamlingen. Tredje sidan i iPhone-familjen, efter
 * IPHONE_SKAL och IPHONE_FODRAL, och skalsidans avgränsning sköt skärmskydden
 * hit.
 *
 * ### Fälten följer de fyra kriterierna
 *
 * Skydd och täckning 35, öppen redovisning 25, montering 22, prisvärde 18.
 * Varje kriterium ska gå att avgöra ur fälten här, annars är kriteriet fel valt.
 *
 * ### `Täckning` är kategorins avgörande uppgift
 *
 * Ordet skärmskydd säljer tre olika täckningar på samma hylla. Ett heltäckande
 * glas går ända ut i kanten och har en svart ram runt, ett standardglas täcker
 * den aktiva ytan och lämnar plats åt skalet, och ett tredje slutar en bit
 * innanför kanten. Skillnaden syns inte i produktnamnet och sällan i priset.
 *
 * Celly Easy Glass är den enda artikeln i kategorin vars egen produkttext
 * skriver ut att glaset inte når hela vägen ut, och den uppgiften är värd mer
 * för en köpare än allt annat som står i samma ruta.
 *
 * ### ⚠️ `Angiven hårdhet` betygsätts aldrig som ett mätvärde
 *
 * Se `ALDRIG_BEDOMD`. 9H är taket på pennskalan i ASTM D3363 och ISO 15184,
 * alltså en standard för färg och lack, och ISO skriver själva att metoden inte
 * duger till att jämföra olika beläggningar. Fältet bär vad säljaren skriver ut
 * och `Ej angiven` när ingen skriver något. Skriv talet som det står: "9H",
 * "9H+", "Ej angiven". Räkna aldrig om och fyll aldrig i åt någon.
 *
 * `Angiven hårdhetsstandard` och `Angiven provlast` finns som egna fält därför
 * att de är de två uppgifter som skulle göra talet meningsfullt. Slås de ihop
 * med `Angiven hårdhet` försvinner just den skillnaden. Samma konstruktion som
 * `Angiven noggrannhet` mot `Uppmätt avvikelse` på /hygrometer.
 *
 * ### ⚠️ `Passar modeller` är sidans variantskydd
 *
 * Ett skärmskydd passar exakt en skärmstorlek, och priset i `Pris` gäller
 * genomgående 17 Pro-varianten. Enkays artikel bär dessutom två olika modeller
 * i butikens egen listning, titeln säger Pro Max och specifikationsraden Pro,
 * så fältet ska följa specifikationsraden och artikelnumret.
 *
 * ### `Pris per skydd` är `harledd` och det ska synas
 *
 * Fyra artiklar är 2-pack. Efter användarbeslut 2026-08-05 rankas prisvärdet
 * per skydd, eftersom det är vad köparen jämför, medan `Pris` står kvar som det
 * butiken drar. Talet är uträknat av oss och bär härkomsten `harledd`.
 */
const IPHONE_SKARMSKYDD = [
  F("Pris", { enhet: "kr", alltid: true }),
  /* Uträknat: Pris delat med antalet i förpackningen. Se filhuvudet. */
  F("Pris per skydd", {
    enhet: "kr",
    alltid: true,
    alias: ["Styckpris", "Pris styck", "Pris per styck"],
  }),
  F("Antal i förpackningen", {
    enhet: "st",
    alltid: true,
    alias: ["Antal", "Antal skydd", "Förpackning", "Innehåll antal"],
    monster: /(\d+)\s*(?:-?\s*pack|st\b)/i,
  }),
  /* Variantskyddet. Skriv modellerna som Apple skriver dem. */
  F("Passar modeller", {
    alltid: true,
    alias: ["Kompatibilitet", "Passar till", "Modell", "Kompatibla modeller"],
  }),

  /* ── Skydd och täckning, kriterium 1 på 35 ─────────────────────────────── */
  F("Material", {
    alltid: true,
    alias: ["Materialtyp", "Tillverkad av", "Typ av skärmskydd"],
  }),
  F("Täckning", {
    alltid: true,
    alias: ["Utbredning", "Full cover", "Heltäckande", "Passform", "Fit"],
  }),
  F("Kantutförande", {
    alias: ["Kanter", "Rundade kanter", "Ram", "Svart ram", "Förstärkta kanter"],
  }),
  F("Skyddar framsensorer", {
    alias: ["Sensorskydd", "Framkamera", "Sensorer", "Sensor Protection"],
  }),
  F("Skalvänlig", {
    alias: ["Fodralvänlig", "Case friendly", "Fungerar med skal", "Skalkompatibel"],
  }),
  F("Tjocklek", {
    enhet: "mm",
    alias: ["Glastjocklek", "Godstjocklek", "Tunn"],
    monster: /(\d+[,.]?\d*)\s*mm/i,
  }),

  /* ── Öppen redovisning, kriterium 2 på 25 ──────────────────────────────── */
  /* De tre fälten nedan ligger i ALDRIG_BEDOMD. Se filhuvudet. */
  F("Angiven hårdhet", {
    alltid: true,
    alias: ["Hårdhet", "Reptålighet", "9H", "Hardness", "Ythårdhet"],
    monster: /\b(\d{1,2}H\+?)\b/,
  }),
  F("Angiven hårdhetsstandard", {
    alltid: true,
    alias: ["Standard", "Provstandard", "Provmetod", "ASTM", "ISO 15184"],
    monster: /(ASTM\s?D\s?3363|ISO\s?15184|JIS\s?K\s?5600)/i,
  }),
  F("Angiven provlast", {
    enhet: "g",
    alias: ["Provlast", "Last", "Belastning", "Gram load"],
    monster: /(\d{3,4})\s*g\b/i,
  }),
  F("Glastyp", {
    alias: ["Glassort", "Aluminosilikat", "Kalk-natron", "Soda lime", "Corning"],
  }),
  F("Ytbehandling", {
    alias: ["Beläggning", "Oleofob", "Oleofobisk", "Anti-fingeravtryck", "Smutsavvisande"],
  }),

  /* ── Montering, kriterium 3 på 22 ──────────────────────────────────────── */
  F("Monteringsram", {
    alltid: true,
    alias: ["Ram", "Installationsram", "Appliceringsram", "EasyAligner", "EZ Fit", "Assist Tool", "Installationsbricka"],
  }),
  F("Ingår i förpackningen", {
    alias: ["Detta ingår", "Innehåll", "Medföljer", "Tillbehör"],
  }),

  /* ── Egenskaper som styr valet men inte betyget ────────────────────────── */
  F("Sekretessfilter", {
    alltid: true,
    alias: ["Privacy", "Insynsskydd", "Sekretess", "Privacy-filter"],
  }),
  F("Garanti", {
    alias: ["Garantitid", "Garantivillkor", "Livstidsgaranti"],
    monster: /(\d+)\s*års?\s*garanti/i,
  }),
  F("GTIN"),
];

/**
 * ## Galaxy S26-skal
 *
 * Beslutat 2026-08-05, före insamlingen. Systerschema till IPHONE_SKAL och
 * avsiktligt nästan identiskt, eftersom produkttypen är densamma. **En sak är
 * vänd upp och ned, och den bär hela sidan.**
 *
 * ### ⚠️ På den här telefonen är skalet magneten
 *
 * Galaxy S26-serien saknar inbyggda Qi2-magneter. Samsung svarade 9to5Google
 * 2026-02-28 att serien i stället "supports Qi2-compatible phone cases", alltså
 * hänvisar tillverkaren köparen till skalet för en funktion telefonen inte har,
 * samtidigt som Samsung säljer både magnetisk powerbank och magnetladdare till
 * just den serien.
 *
 * Följden för schemat: `Magnetring` är inte en bekvämlighet som på iPhone utan
 * kategorins viktigaste enskilda uppgift, och magnetblocket bär kriteriet som
 * väger 30. På /iphone-skal vägde motsvarande block 16.
 *
 * ### ⚠️ Kategorin saknar ett svenskt ord för magnetringen
 *
 * Uppmätt hos TheMobileStore 2026-08-05: samtliga magnetskal säljs som
 * *MagSafe-kompatibel*, alltså Apples varumärke, på en Samsung-telefon. Det
 * gäller även Samsungs egna skal. UNIQ kallar sitt *MagClick*.
 *
 * Fältet `Butikens term för magneten` fanns här till 2026-08-06 och är
 * **borttaget**. Det beskrev säljarens ordval och inte produkten, alltså en rad
 * i jämförelsetabellen som mätte butikens copy. Iakttagelsen är riktig och
 * viktig för köparen, men den hör hemma i köpguiden och i sidans FAQ, där den
 * nu står. En tabellrad är ett löfte om att raden skiljer produkterna åt.
 *
 * ### ⚠️ Materialattributet får inte kopieras från butiken
 *
 * Butikens attributfält är handskrivet och motsäger produktnamnet: både
 * *Silicone Magnet* och *AirSkin Aramid* står som `Hårdplast`, och `Funktion`
 * är stavat *MagSafe-komtaibel* på två produkter. Materialet kontrolleras mot
 * tillverkaren innan det blir en tabellrad.
 *
 * ### Angivet mot observerat, som på IPHONE_SKAL
 *
 * Samma uppdelning och av samma skäl. Observerad konstruktion får bedömas och
 * bär kriteriet *konstruktion*. Fallprovet ligger i ALDRIG_BEDOMD och bär inget
 * kriterium alls: sedan 2026-08-06 finns inget kriterium som betygsätter vad
 * säljaren skrivit ut. Det rankade dokumentationen och inte varan.
 *
 * ### ⚠️ Butikens tystnad är inte tillverkarens
 *
 * Sidan byggdes på att fyra formuleringar om militärstandard fanns i butikens
 * sortiment utan att någon bar en siffra. Gap-passet mot tillverkarna
 * 2026-08-06 visade att det var butikens tystnad: Spigen anger 1,2 meter och
 * 26 fall för Tough Armor, UNIQ tre meter för Combat, och Samsungs egen sida
 * 1,22 meter i fem omgångar om 26 fall mot stål, alltså mer än de "1,2 meter"
 * butiken skrev av. **Hämta alltid fallprovet hos tillverkaren, aldrig hos
 * TheMobileStore.**
 */
const GALAXY_S26_SKAL = [
  F("Pris", { enhet: "kr", alltid: true }),
  /* Variantskyddet. Serien är Galaxy S26, S26+ och S26 Ultra, och ett skal
     passar exakt en av dem. Skriv modellen som Samsung skriver den, aldrig
     "S26 Pro" eller "S26 Edge" — de namnen finns bara i ryktesrapporteringen
     och i en kvarbliven butikskategori. Se .agent/research/galaxy-s26-skal.md. */
  F("Passar modeller", {
    alltid: true,
    alias: ["Kompatibilitet", "Passar till", "Modell", "Kompatibla modeller"],
  }),
  F("Material", {
    alltid: true,
    alias: ["Materialtyp", "Tillverkad av", "Ytmaterial", "Konstruktion"],
  }),

  /* ── Magnet och trådlös laddning, kriterium 1 på 30 ─────────────────────── */
  F("Magnetring", {
    alltid: true,
    alias: ["Magnet", "MagSafe", "Magnetisk", "Inbyggd magnet", "MagClick", "Magnetmodul"],
  }),
  F("Trådlös laddning genom skalet", {
    enhet: "W",
    alltid: true,
    alias: ["Trådlös laddning", "Qi", "Laddning genom skalet", "Wireless charging"],
    monster: /(\d+[,.]?\d*)\s*W\b/i,
  }),

  /* ── Konstruktion, kriterium 2 på 28 ────────────────────────────────────── */
  F("Förhöjd kant skärm", {
    alltid: true,
    alias: ["Upphöjd kant", "Skärmkant", "Förhöjd ram", "Kant runt skärmen"],
  }),
  F("Förhöjd kant kamera", {
    alltid: true,
    alias: ["Kameraskydd", "Kamerakant", "Upphöjd kamerakant", "Linsskydd"],
  }),
  F("Hörnkonstruktion", {
    alltid: true,
    alias: ["Förstärkta hörn", "Hörnskydd", "Luftkuddar", "Air Cushion", "Stötdämpning"],
  }),
  F("Knappar", {
    alias: ["Knapputförande", "Täckta knappar", "Knappskydd", "Sidoknappar"],
  }),
  F("Tjocklek", {
    enhet: "mm",
    alias: ["Godstjocklek", "Skalets tjocklek"],
    monster: /(\d+[,.]?\d*)\s*mm/i,
  }),
  F("Vikt", {
    enhet: "g",
    alias: ["Skalets vikt", "Produktvikt"],
    monster: /(\d+[,.]?\d*)\s*g\b/i,
  }),

  /* ── Fallprovet, i tabellen men i inget betyg ───────────────────────────── */
  /* Ett fält, inte fyra. Fram till 2026-08-06 fanns Angiven militärstandard,
     Angiven fallhöjd, Angivet antal fall och Angivet provunderlag var för sig,
     och de tre sista var tomma för samtliga tolv produkter, eftersom butiken
     inte skriver ut dem. Tillverkaren gör det, och gör det i en enda mening:
     "1,22 meter i fem omgångar om 26 fall mot stål". Fyra rader som håller en
     mening är fyra tomma rader.

     Hämta värdet hos tillverkaren och skriv av det ordagrant. Räkna aldrig om,
     och lån mellan modellstorlekar är förbjudet. Se ALDRIG_BEDOMD: fältet bär
     inget kriterium, eftersom ett tal på en förpackning inte är ett provresultat
     som går att jämföra mellan tillverkare. */
  F("Falltest enligt tillverkaren", {
    alltid: true,
    alias: [
      "Falltest",
      "Fallhöjd",
      "Angiven fallhöjd",
      "Angiven militärstandard",
      "Militärstandard",
      "MIL-STD",
      "Military Grade",
      "Droptest",
      "Fallskydd",
    ],
    monster: /(\d+[,.]?\d*)\s*(?:m|meter|fot|feet|ft)\b/i,
  }),

  F("GTIN"),
];

/**
 * ## Galaxy S26-fodral
 *
 * Beslutat 2026-08-05, efter GALAXY_S26_SKAL och med delad research.
 * Systerschema till IPHONE_FODRAL, med ett fält som inte finns där.
 *
 * ### ⚠️ `Magnetens funktion` är sidans skäl att existera
 *
 * Skalsidan slog fast att Galaxy S26 saknar inbyggda Qi2-magneter och att
 * skalet därför måste bära magneten. En läsare som kommer hit med den
 * kunskapen möter en hylla där **nästan varje fodral utlovar en magnet** —
 * "magnetisk stängning", "kraftfull magnetstängning", "dubbel magnetstängning",
 * "stark magnet".
 *
 * Det är spännet som håller locket stängt. Det har ingenting med laddning att
 * göra.
 *
 * Uppmätt hos TheMobileStore 2026-08-05 över tretton konstruktioner: tolv
 * anger en magnet, **en enda** anger att laddning fungerar genom fodralet, och
 * en till nämner magneter i ett laddningssammanhang. Fältet skiljer därför
 * `Stängning` från `Laddning`, och det är den skillnaden hela sidan hänger på.
 *
 * Fältet får bedömas: det beskriver vad magneten gör, alltså produktens
 * egenskap. Jämför `Butikens term för magneten` i GALAXY_S26_SKAL, som
 * beskriver säljarens ordval och därför ligger i ALDRIG_BEDOMD.
 *
 * ### ⚠️ `Telefonens infästning` är kategorins dolda skillnad
 *
 * Ärvt från IPHONE_FODRAL och ännu viktigare här. På en iPhone kan ett fodral
 * fästa magnetiskt mot telefonen. På en S26 finns inget att fästa mot, så varje
 * fodral måste hålla telefonen mekaniskt: limmat plastskal, TPU-hållare eller
 * klämmor. Det avgör om fodralet går att ta av, och om telefonen sitter kvar.
 *
 * ### En rad per konstruktion, aldrig per mönster
 *
 * Samma regel som på /iphone-fodral. Mezzo säljs i fem mönster och Sensitive i
 * fyra; det är samma fodral. Mönstret hör till färgvalet, inte till raden.
 */
const GALAXY_S26_FODRAL = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Passar modeller", {
    alltid: true,
    alias: ["Kompatibilitet", "Passar till", "Passar", "Modell"],
  }),
  F("Material", {
    alltid: true,
    alias: ["Materialtyp", "Tillverkad av", "Ytmaterial"],
  }),

  /* ── Magnet och laddning, kriterium på 20 ───────────────────────────────── */
  /* Sidans avgörande fält. Skriv "Stängning" när magneten håller locket, och
     "Laddning" bara när säljaren uttryckligen anger att laddning fungerar
     genom fodralet. Slå aldrig ihop dem, och tolka aldrig en stängningsmagnet
     som ett laddstöd. */
  F("Magnetens funktion", {
    alltid: true,
    alias: ["Magnet", "Magnetstängning", "Magnetisk stängning", "Magnetlås"],
  }),
  F("Trådlös laddning genom fodralet", {
    alltid: true,
    alias: ["Trådlös laddning", "Qi", "Qi2", "Laddning genom fodralet"],
  }),

  /* ── Kortkapacitet, kriterium på 25 ─────────────────────────────────────── */
  F("Kortfack", {
    enhet: "st",
    alltid: true,
    alias: ["Antal kortfack", "Kortplatser", "Kortficka"],
    monster: /(\d+)\s*kortfack/i,
  }),
  F("Sedelfack", {
    alltid: true,
    alias: ["Sedelficka", "Kontantfack", "Kontantutrymme", "Sedelhållare"],
  }),
  F("Fotofack", {
    alias: ["Fotoficka", "Bildfack", "ID-ficka"],
  }),

  /* ── Konstruktion, kriterium på 25 ──────────────────────────────────────── */
  /* Kategorins dolda skillnad. Se filhuvudet ovan. */
  F("Telefonens infästning", {
    alltid: true,
    alias: ["Infästning", "Hållare", "Montering", "Insats", "TPU-hållare"],
  }),
  F("Kamerautskärning", {
    alias: ["Kameraurtag", "Utskärning kamera", "Kameraskydd"],
  }),
  F("Tjocklek", {
    enhet: "mm",
    alias: ["Godstjocklek", "Fodralets tjocklek"],
    monster: /(\d+[,.]?\d*)\s*mm/i,
  }),

  /* ── Vardagsfunktion, kriterium på 10 ───────────────────────────────────── */
  F("Ställfunktion", {
    alltid: true,
    alias: ["Stativ", "Ställ", "TV-läge", "Handsfree-stöd", "Vikbart stöd"],
  }),
  F("Handledsrem", {
    alias: ["Rem", "Handrem", "Bärrem", "Avtagbar rem"],
  }),
  F("Angivet RFID-skydd", {
    alias: ["RFID", "RFID-skydd", "NFC-skydd", "Skimningsskydd"],
  }),

  F("GTIN"),
];

/**
 * ## Powerstation
 *
 * Beslutat 2026-08-05, före insamlingen. Nionde schemat i Elektronik.
 *
 * ### ⚠️ Effekten är TRE fält och får aldrig bli ett
 *
 * Det är hela sidans konstruktion, och skälet står i
 * `.agent/research/powerstation.md` §8. Ett watt-tal på en powerstation kan
 * vara tre olika storheter, och handeln publicerar dem i samma fält utan att
 * säga vilken:
 *
 * - **Kontinuerlig effekt** — vad växelriktaren orkar hela tiden.
 * - **Toppeffekt** — vad den klarar i sekunder när en motor startar.
 * - **Boosteffekt** — EcoFlows `X-Boost` och Ankers `SurgePad`, där stationen
 *   **sänker spänningen** för att driva resistiv last över märkeffekten. Det
 *   är varken det ena eller det andra av talen ovan.
 *
 * Uppmätt hos Elgiganten 2026-08-05: fältet `Max. AC 230v effekt` bär 300 W för
 * EcoFlow River 3 (kontinuerligt), 2 400 W för Delta 3 (X-Boost mot
 * tillverkarens 1 800) och 4 000 W för Anker Solix C2000 Gen 2 (toppeffekt mot
 * tillverkarens 2 400). Samma fält, samma kategorisida, tre olika storheter.
 *
 * Slås de ihop till en rad ser 1 800 och 2 400 ut som jämförbara tal för samma
 * sak. Exakt samma skäl som `Dragkraft` mot `Vridmoment` på
 * /garageportsoppnare, och samma skäl som `Kapacitet` mot `Energiinnehåll` på
 * /powerbank.
 *
 * ### ⚠️ `Energi` är inte talet i produktnamnet
 *
 * Cocraft Advance 240 lagrar 231 wattimmar och lämnar 200 watt.
 * Cocraft Advance 500 lagrar 386 och lämnar 500. TogoPower Advance 650 lagrar
 * 634 och lämnar 500. Talet i namnet är ibland watt, ibland wattimmar och
 * ibland ingetdera. Fältet `Energi` bär alltid den publicerade kapaciteten och
 * aldrig modellnamnet.
 *
 * ### ⚠️ `Cykler till 80 %` och `Ljudnivå` ligger i ALDRIG_BEDOMD
 *
 * Kriteriet *säkerhet och livslängd* väger 25 och mäter just vem som publicerar
 * ett cykeltal. LiFePO4 anges till 3 000–4 000 cykler och Jackerys ternära
 * litium till 1 000, alltså en faktor fyra på hur länge produkten lever. Att
 * låna ett tal från en systermodell eller gissa ur cellkemin raderar
 * skillnaden sidan mäter. Cocrafts bruksanvisning lästes i sin helhet på fyra
 * språk 2026-08-05: batterityp, spänning, amperetimmar, kapacitet och laddtid
 * står utskrivna, cykeltalet gör det inte.
 *
 * Gränsen mot /powerbank är Stiftung Warentests egen: en powerstation har
 * **minst ett 230 V-uttag**. `Antal 230 V-uttag` är därför alltid ifyllt.
 */
const POWERSTATION = [
  F("Pris", { enhet: "kr", alltid: true }),
  /* Den publicerade kapaciteten, aldrig talet i modellnamnet. */
  F("Energi", {
    enhet: "Wh",
    alltid: true,
    alias: ["Kapacitet", "Batterikapacitet", "Energiinnehåll", "Wattimmar"],
    monster: /([\d\s.,]+)\s*Wh\b/,
  }),
  /* Vad växelriktaren orkar hela tiden. Det tal som avgör vad du kan driva. */
  F("Kontinuerlig effekt", {
    enhet: "W",
    alltid: true,
    alias: ["Uteffekt", "AC-effekt", "Märkeffekt", "Nominell effekt", "Max. AC"],
    monster: /([\d\s.,]+)\s*W\b/,
  }),
  /* Sekunderna när en motor startar. Egen rad, se filhuvudet. */
  F("Toppeffekt", {
    enhet: "W",
    alltid: true,
    alias: ["Starteffekt", "Surge", "Peak", "Toppbelastning"],
  }),
  /* X-Boost och SurgePad. Egen rad eftersom spänningen sänks. */
  F("Boosteffekt", {
    enhet: "W",
    alias: ["X-Boost", "SurgePad", "Boost-läge", "Power Lifting"],
  }),
  F("Cellkemi", {
    alltid: true,
    alias: ["Batterityp", "Battery Type", "Celltyp", "Batteri"],
  }),
  F("Cykler till 80 %", {
    enhet: "cykler",
    alltid: true,
    alias: ["Laddcykler", "Cykeltal", "Cycle Life", "Livslängd i cykler"],
    monster: /([\d\s.,]+)\s*(?:ladd)?cykler/i,
  }),
  F("Vikt", {
    enhet: "kg",
    alltid: true,
    alias: ["Produktvikt", "Nettovikt"],
    monster: /([\d.,]+)\s*kg\b/,
  }),
  F("Antal 230 V-uttag", {
    enhet: "st",
    alltid: true,
    alias: ["AC-uttag", "Schuko", "Vägguttag", "Antal AC 230v-uttag"],
    monster: /(\d+)\s*[x×]?\s*(?:st\s*)?AC/i,
  }),
  F("Laddtid till 100 %", {
    alltid: true,
    alias: ["Laddningstid", "Laddtid", "AC-laddning", "Uppladdningstid"],
  }),
  F("Ljudnivå", {
    enhet: "dB",
    alltid: true,
    alias: ["Ljudnivå vid drift", "Bullernivå", "Driftljud"],
    monster: /([\d.,]+)\s*dB\b/,
  }),
  F("UPS-omkoppling", {
    enhet: "ms",
    alias: ["UPS", "Omkopplingstid", "Avbrottsfri", "Switchover"],
    monster: /([\d.,]+)\s*ms\b/,
  }),
  F("IP-klass", {
    alias: ["IP-klassificering", "Kapslingsklass", "Damm och vatten"],
    monster: /\b(IP\s?[0-6][0-9X])\b/i,
  }),
  F("Vågform", {
    alias: ["Sinusvåg", "Ren sinusvåg", "Pure sine wave", "Utgångsform"],
  }),
  F("Solladdning max", {
    enhet: "W",
    alias: ["Solpanel", "Solingång", "MPPT", "Solar input"],
  }),
  F("USB-portar", {
    alias: ["USB", "USB-C", "USB-A", "Antal USB"],
  }),
  F("12 V-uttag", {
    alias: ["Biluttag", "Cigarettuttag", "DC 12 V"],
  }),
  F("Display", {
    alias: ["Skärm", "Batterimätare", "LCD"],
  }),
  F("App", {
    alias: ["Appstyrning", "Använd med app", "Bluetooth", "Wi-Fi"],
  }),
  F("Inbyggd belysning", {
    alias: ["Ficklampa", "LED-lampa", "Arbetsbelysning", "Inbyggt ljus"],
  }),
  F("Garanti", {
    enhet: "år",
    alias: ["Garantitid", "Garantivillkor"],
    monster: /(\d+)\s*års?\s*garanti/i,
  }),
  F("Artikelnummer"),
  F("GTIN"),
];

/**
 * ## Mjölkskummare
 *
 * Beslutat 2026-08-05, före insamlingen. Första schemat i den nya gruppen Kök.
 * Sidan rankar bara elektriska kannor med värmeelement; manuell pumpskummare
 * och handhållen batterivisp är andra produkter och förklaras i köpguiden.
 *
 * ### ⚠️ Kapaciteten är TVÅ fält och får aldrig bli ett
 *
 * Det är hela sidans konstruktion. En mjölkskummare har två maxnivåer och de
 * skiljer ungefär på hälften: hur mycket mjölk den kan **skumma**, och hur
 * mycket den kan **värma** utan att skumma. Talet i modellnamnet, i butikens
 * produktnamn och i marknadsföringsmeningen är genomgående det senare.
 *
 * Uppmätt på tillverkarens egen svenska butik 2026-08-05, hela Severins
 * sortiment: SM 3584 skummar 100 av 200 ml, SM 3588 "300" skummar 150,
 * SM 3579 och SM 3589 "Light 400" skummar 220, SM 3585 "Spuma 500" skummar
 * 120–260 och SM 3586 och SM 3587 "Spuma 700" skummar 120–350. Sju modeller,
 * ett fabrikat, skummaxet är halva namnet varje gång.
 *
 * Värre är att **samma butik använder samma fält för olika storheter**. Coffee
 * Friends fält `Kapacitet (vätskor)` bär 240 ml för Bialetti MK01, som skummar
 * 115, och 150 ml för Bialetti MKF02, som värmer 300. Samma fabrikat, två
 * produktsidor bredvid varandra, motsatt konvention.
 *
 * Slås de ihop till en rad ser 150 och 240 ut som jämförbara tal för samma sak.
 * Exakt samma skäl som `Kontinuerlig effekt` mot `Toppeffekt` på /powerstation
 * och `Dragkraft` mot `Vridmoment` på /garageportsoppnare.
 *
 * ### ⚠️ `Skumkapacitet`, `Uppvärmningskapacitet` och `Skumtemperatur` ligger i ALDRIG_BEDOMD
 *
 * Att räkna fram det ena talet ur det andra är frestande, eftersom kvoten är
 * påfallande nära hälften hos Severin. Den frestelsen är precis felet: kvoten
 * gäller ett fabrikat, och Philips CA6500 anger 120 ml utan att publicera något
 * värmemax alls. Ett härlett tal hade raderat den spridning sidan mäter, på
 * samma sätt som en omräknad wattimme hade gjort på /powerbank.
 *
 * `Skumtemperatur` av samma skäl. Två tillverkare av tretton publicerar ett
 * tal, och de är inte överens: Severin Spuma 700 anger justerbart 45–65 °C och
 * CHiATO milkPLAY anger 75–80 °C, mot Råd & Röns 63–67. Gissar vi åt de elva
 * som tiger försvinner både spridningen och tystnaden.
 *
 * ### Vad `Kannvolym` är till för
 *
 * Kärlets rymd, alltså det tal Coffee Friend och KitchenTime stoppar i sina
 * strukturerade fält utan att säga vilken storhet det är. Fältet finns för att
 * ha någonstans att lägga en uppgift vi inte kan tolka, i stället för att
 * gissa vilken av de två andra raderna den hör till.
 */
const MJOLKSKUMMARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  /* Sidans fynd. Aldrig härledd, aldrig lånad från en systermodell. */
  F("Skumkapacitet", {
    enhet: "ml",
    alltid: true,
    alias: ["Skummar", "Max skum", "Mjölkskum", "Skumvolym", "Kapacitet skum"],
    monster: /skumma(?:r|:)?\s*(?:upp till\s*)?([\d\s.,–-]+)\s*ml/i,
  }),
  /* Talet i modellnamnet. Nästan alltid det butiken skyltar med. */
  F("Uppvärmningskapacitet", {
    enhet: "ml",
    alltid: true,
    alias: ["Värmer", "Varm mjölk", "Max varm mjölk", "Kapacitet mjölk"],
    monster: /värmer\s*(?:upp till\s*)?([\d\s.,–-]+)\s*ml/i,
  }),
  /* Kärlets rymd, när butiken anger ett tal utan att säga vilken storhet. */
  F("Kannvolym", {
    enhet: "ml",
    alias: ["Kapacitet", "Kapacitet (vätskor)", "Volym", "Behållare"],
  }),
  F("Effekt", {
    enhet: "W",
    alltid: true,
    alias: ["Watt", "Watt, max", "Märkeffekt"],
    monster: /(\d+)\s*(?:W|watt)\b/i,
  }),
  /* Råd & Rön: skummet bör hålla 63–67 °C. Två av tretton anger något alls. */
  F("Skumtemperatur", {
    enhet: "°C",
    alltid: true,
    alias: ["Temperatur", "Måltemperatur", "Mjölktemperatur"],
    monster: /([\d\s]+(?:–|-|till)?\s*\d*)\s*°\s*C/i,
  }),
  F("Uppvärmningsteknik", {
    alltid: true,
    alias: ["Teknik", "Värmeteknik", "Induktion", "Uppvärmning"],
  }),
  F("Antal program", {
    alltid: true,
    alias: ["Program", "Inställningar", "Funktioner", "Lägen"],
    monster: /(\d+)\s*(?:olika\s*)?(?:program|inställningar|lägen)/i,
  }),
  F("Kallskum", {
    alltid: true,
    alias: ["Kallt skum", "Kall mjölkskum", "Iskaffe", "Cold foam"],
  }),
  F("Maskindisk", {
    alltid: true,
    alias: ["Diskmaskin", "Tål maskindisk", "Diskmaskinssäker"],
  }),
  F("Löstagbar kanna", {
    alias: ["Löstagbar behållare", "Avtagbar kanna", "Sladdlös bas"],
  }),
  F("Antal vispar", {
    enhet: "st",
    alias: ["Vispar", "Visptillbehör", "Tillbehör"],
    monster: /(\d+)\s*(?:st\s*)?(?:olika\s*)?vispar/i,
  }),
  F("Material kanna", {
    alias: ["Material", "Kannmaterial", "Beläggning"],
  }),
  F("Vikt", { enhet: "kg", alias: ["Nettovikt", "Bruttovikt"], monster: /(\d+[,.]?\d*)\s*kg\b/i }),
  F("Mått", { alias: ["Storlek", "Dimensioner", "Produktmått"] }),
  F("Garanti", { enhet: "år", alias: ["Garantitid"], monster: /(\d+)\s*års?\s*garanti/i }),
  F("Artikelnummer"),
  F("GTIN"),
];

/**
 * Babyvakt.
 *
 * Två fält är arbetsordern som skiljer sidan från varje konkurrent.
 *
 * `Larm vid bruten förbindelse` finns bara i manualerna. Ingen butikstext i
 * kategorin beskriver den fullständigt, och den avgör om apparaten gör sitt
 * jobb den stund den slutar fungera.
 *
 * `Räckvidd inomhus` är avsiktligt en egen rad vid sidan av `Räckvidd fri
 * sikt`, trots att bara tre av elva publicerar den. Att slå ihop dem hade varit
 * exakt det fel schemat finns för att hindra: talen skiljer sex gånger, och en
 * rad som blandar dem gör 800 och 130 meter till samma uppgift.
 *
 * `Max sändareffekt` är hämtad ur manualernas RED-deklaration där den finns,
 * eftersom butikernas egna tal för samma apparat skiljer sig åt.
 */
const BABYVAKT = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Typ", { alias: ["Ljud eller video"] }),
  F("Larm vid bruten förbindelse", { alias: ["Räckviddslarm", "Larm utanför räckvidd"] }),
  F("Räckvidd fri sikt", { enhet: "m", alias: ["Räckvidd", "Maximal räckvidd", "Räckvidd utomhus"], monster: /(\d[\d\s]*)\s*m\b/i }),
  F("Räckvidd inomhus", { enhet: "m", monster: /(\d[\d\s]*)\s*m\b/i }),
  F("Överföring", { alias: ["Teknik", "Frekvensband", "Anslutning"] }),
  F("Kräver app eller konto", { alias: ["App", "Konto"] }),
  F("Föräldraenhet", { alias: ["Mottagare"] }),
  F("Vibrationslarm", { alias: ["Vibration"] }),
  F("Tvåvägstal", { alias: ["Tvåvägskommunikation", "Talk back"] }),
  F("Justerbar mikrofonkänslighet", { alias: ["Mikrofonkänslighet", "VOX"] }),
  F("Temperaturvisning", { alias: ["Temperatursensor", "Termometer"] }),
  F("Skärm", { alias: ["Display", "Skärmstorlek"] }),
  F("Flera babyenheter", { alias: ["Utbyggbar", "Extra babyenhet"] }),
  F("Max sändareffekt", { enhet: "mW", alias: ["Sändareffekt", "Strålning", "Uteffekt"] }),
  /* De tre nedan är omärkta med flit och bor i produktens egen speclista, inte
     som jämförelserad. Standbytid och drifttid är två skilda storheter som
     tillverkarna publicerar om vartannat, så en gemensam rad hade blandat dem;
     laddning och mörkerseende gäller bara delar av fältet. */
  F("Standbytid", { enhet: "h", alias: ["Stand-by tid", "Standby"], monster: /(\d+)\s*h/i }),
  F("Laddning", { alias: ["Laddkontakt", "Laddning via"] }),
  F("Mörkerseende", { alias: ["IR", "Nattläge", "Nattseende"] }),
  F("Garanti", { enhet: "år", alias: ["Garantitid"], monster: /(\d+)\s*års?\s*garanti/i }),
  F("GTIN"),
];

/**
 * ## Smartwatch
 *
 * Kategorin har **fem batteritider** och det är hela poängen med sidan. Ordet
 * `batteritid` bär 18 timmar hos Apple och 30 dygn hos Withings, och skillnaden
 * ligger inte i cellen utan i vad klockan gjorde under mätningen.
 *
 * Därför fem skilda fält, aldrig ett, och aldrig sammanslagna:
 *
 * - `Batteritid vardag` — tillverkarens tal för normal användning. Det enda
 *   fältet som är betygsatt, eftersom alla elva anger det.
 * - `Batteritid med alltid på-skärm` — samma klocka med skärmen tänd. Samsung
 *   anger 40 mot 30 timmar för Galaxy Watch8 Classic, Huawei 12 dagar mot 7.
 * - `Batteritid i sparläge` — det tal handeln oftast trycker.
 * - `Batteritid med GPS` — det som gäller under ett träningspass. Garmin anger
 *   9 timmar där smartwatchläget anger 12 dagar, alltså faktor 32.
 * - `Batterikapacitet` — mAh, den enda storheten som går att jämföra rakt av.
 *
 * ⚠️ Samtliga fyra tidsfält ligger i ALDRIG_BEDOMD. Att låna ett tal från en
 * systermodell eller räkna om mellan lägen raderar exakt den spridning sidan
 * finns för att visa. Anger en tillverkare bara ett läge står de övriga tomma,
 * och inget betyg sänks av det — se `pnpm check:avdrag`.
 *
 * `EKG` skiljer på funktion och godkännande med flit. Garmin skriver att appen
 * är "en medicinteknisk enhet i klass IIa enligt (EU) 2017/745" och Apple att
 * syremätningen "inte är avsedd för medicinsk användning". Det är två olika
 * saker och de får inte hamna i samma cell.
 */
const SMARTWATCH = [
  F("Pris", { enhet: "kr", alltid: true }),
  /* Se ALDRIG_BEDOMD. Fyra tidsfält, ett per villkor, aldrig omräknade. */
  F("Batteritid vardag", {
    enhet: "h",
    alltid: true,
    alias: ["Batteritid", "Normal användning", "Drifttid", "Batteritid normal"],
  }),
  F("Batteritid med alltid på-skärm", {
    shortLabel: "Med AOD",
    alias: ["AOD On", "Alltid på-skärm", "Always on display"],
  }),
  F("Batteritid i sparläge", {
    alias: ["Strömsparläge", "Batterisparläge", "Energibesparing"],
  }),
  F("Batteritid med GPS", {
    alias: ["GPS-läge", "Utomhussport", "Träningsläge", "Satellitläge"],
  }),
  F("Batterikapacitet", { enhet: "mAh", alias: ["Batteri", "Kapacitet"], monster: /(\d+)\s*mAh/i }),
  F("Laddning till 80 %", { alias: ["Snabbladdning", "Laddningstid"] }),
  F("EKG", { alias: ["Elektrokardiogram", "ECG", "EKG-app"] }),
  F("Syremättnad", { alias: ["SpO2", "Blodsyre", "Pulsoximetri", "Syrenivå"] }),
  F("Blodtryck", { alias: ["Blodtrycksmätning", "BP"] }),
  F("Hudtemperatur", { alias: ["Temperatursensor", "Temperatur"] }),
  F("Satellitmottagning", {
    shortLabel: "Satellit",
    alias: ["GNSS", "GPS", "Positionering", "Satellitsystem"],
  }),
  F("Vattentålighet", { alias: ["Vattenklassning", "ATM", "Vattentäthet", "Hållbarhet"] }),
  F("Fungerar med", { alias: ["Kompatibilitet", "Systemkrav", "Smartphonekompatibilitet"] }),
  F("Vikt", { enhet: "g", alias: ["Enhetens vikt", "Produktvikt"], monster: /(\d+[,.]?\d*)\s*g\b/i }),
  F("Boettstorlek", { enhet: "mm", alias: ["Storlek", "Boett", "Diameter"] }),
  F("Glas", { alias: ["Linsmaterial", "Skärmglas", "Lins"] }),
  F("Skärm", { alias: ["Skärmtyp", "Display"] }),
  F("Ljusstyrka", { enhet: "nits", alias: ["Maximal ljusstyrka", "cd/m²"], monster: /(\d+)\s*(?:nits|cd\/m)/i }),
  F("Barometrisk höjdmätare", { alias: ["Höjdmätare", "Barometer"] }),
  F("Offlinekartor", { alias: ["Kartor", "Navigering"] }),
  F("Utbytbart batteri", { alias: ["Utbytbart", "Batteribyte"] }),
  F("GTIN"),
];

/**
 * ## Skaftdammsugare
 *
 * Kategorin har två drifttider och det är hela poängen med sidan.
 * `Drifttid ekoläge` är talet på kartongen, uppmätt i det svagaste läget och
 * i flera fall med ett munstycke utan motor. `Drifttid högsta läge` är vad
 * maskinen orkar med borsten igång, alltså den städning som får upp damm ur
 * en golvspringa. Två fält, aldrig ett, och aldrig sammanslagna till
 * `Batteritid`.
 *
 * `Sugkraft` bär både luftwatt och pascal med flit. De är olika mått och de
 * mäts under olika villkor, och att tvinga in dem i en enhet hade dolt just
 * det. Rutan i tabellen ska visa talet med sin enhet.
 *
 * `Utbytbart batteri` är fältet som avgör hur länge maskinen lever. Ett
 * batteri som går att lyfta ur gör dubbla passet möjligt i dag och maskinen
 * lagningsbar när cellerna tappat kapacitet.
 */
const SKAFTDAMMSUGARE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Drifttid högsta läge", {
    enhet: "min",
    alias: ["Drifttid turboläge", "Batteritid hög inställning", "Driftstid högsta effekt", "Turboläge"],
    monster: /(\d+)\s*(?:min|minuter)\b/i,
  }),
  F("Drifttid ekoläge", {
    enhet: "min",
    alias: ["Batteritid", "Drifttid", "Maximal drifttid", "Batteritid låg inställning", "Driftstid lägsta effekt"],
    monster: /(\d+)\s*(?:min|minuter)\b/i,
  }),
  F("Sugkraft", {
    alias: ["Sugeffekt", "Luftwatt", "Max sugkraft"],
    monster: /(\d[\d\s.,]*)\s*(?:AW|luftwatt|Pa|pascal)\b/i,
  }),
  F("Golvmunstycke", { alias: ["Munstycke", "Borsthuvud", "Borstrulle"] }),
  F("Filtrering", { alias: ["Filter", "Filtersystem", "Filterklass", "HEPA-klass"] }),
  F("Dammbehållare", { enhet: "liter", alias: ["Behållare", "Dammkapacitet", "Volym behållare"], monster: /(\d+[,.]?\d*)\s*(?:liter|l|ml)\b/i }),
  F("Utbytbart batteri", { alias: ["Löstagbart batteri", "Batteribyte"] }),
  F("Vikt", { enhet: "kg", alias: ["Vikt komplett maskin"], monster: /(\d+[,.]?\d*)\s*kg/i }),
  F("Ljudnivå", { enhet: "dB(A)", alias: ["Ljud", "Ljudtryck"], monster: /(\d+[,.]?\d*)\s*dB/i }),
  F("Laddningstid", { enhet: "h", alias: ["Laddtid"], monster: /(\d+[,.]?\d*)\s*(?:h|timmar)\b/i }),
  F("Batterispänning", { enhet: "V", monster: /(\d+[,.]?\d*)\s*V\b/i }),
  F("Handdammsugare", { alias: ["Löstagbar handdammsugare", "2-i-1"] }),
  F("Förvaring", { alias: ["Laddställ", "Väggfäste", "Dockningsstation"] }),
  F("Höjd", { enhet: "mm", monster: /(\d+[,.]?\d*)\s*(mm|cm)\b/i }),
  F("Garanti", { enhet: "år", alias: ["Garantitid"], monster: /(\d+)\s*års?\s*garanti/i }),
  F("GTIN"),
];

/**
 * ## Pizzaugn
 *
 * Fälten följer sidans fem kriterier, beslutade 2026-08-06: jämn värme 30,
 * prisvärde 25, bakyta 15, bränsleflexibilitet 15, bärbarhet 15.
 *
 * ⚠️ `Angiven maxtemperatur` är med i schemat men bär avsiktligt **ingen
 * vikt**. Femton av femton ugnar anger 500 °C, alltså en grind som varje
 * produkt passerar och inte en axel som rangordnar dem. Samma beslut som
 * `Larm när förbindelsen bryts` på /babyvakt. Talet står i tabellen eftersom
 * läsaren letar efter det, och köpguiden förklarar varför det inte betyder
 * det man tror.
 *
 * De fyra fälten som styr **jämn värme** är konstruktionsfält och inte
 * mätvärden: `Stenens rörelse`, `Dörr`, `Brännarens placering` och
 * `Stentjocklek`. Det är dessa som orsakar spridningen över stenen, och de går
 * att läsa för hela fältet. Se `ALDRIG_BEDOMD` för de uppmätta talen, som bara
 * fyra modeller har.
 */
const PIZZAUGN = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Bränsle", {
    alias: ["Bränsletyp", "Drivmedel", "Energikälla", "Fuel"],
  }),
  F("Max pizzastorlek", {
    enhet: "tum",
    alias: ["Pizzastorlek", "Max pizzadiameter", "Bakyta", "Stenens diameter", "Pizza size"],
    monster: /(\d+[,.]?\d*)\s*(?:tum|"|inch)/i,
  }),
  /* Kategorins avgörande konstruktionsfält. Fast sten ger 200 till 260 graders
     spridning mellan bakre och främre kant; roterande sten tar bort den. */
  F("Stenens rörelse", {
    alias: ["Roterande sten", "Rotation", "Rotating stone"],
  }),
  F("Dörr", { alias: ["Lucka", "Ugnslucka", "Door"] }),
  F("Brännarens placering", {
    alias: ["Brännare", "Flammans placering", "Värmekälla placering", "Burner"],
  }),
  F("Stentjocklek", {
    enhet: "mm",
    alias: ["Pizzasten tjocklek", "Stenens tjocklek", "Bakstenens tjocklek"],
    monster: /(\d+[,.]?\d*)\s*mm/i,
  }),
  /* Grind, inte axel. Se blockkommentaren ovan. */
  F("Angiven maxtemperatur", {
    enhet: "°C",
    alias: ["Maxtemperatur", "Max temperatur", "Högsta temperatur"],
    monster: /(\d+)\s*(?:°\s*C|grader)/i,
  }),
  F("Angiven uppvärmningstid", {
    enhet: "min",
    alias: ["Uppvärmningstid", "Förvärmningstid", "Tid till baktemperatur"],
    monster: /(\d+)\s*(?:min|minuter)/i,
  }),
  F("Effekt", {
    enhet: "kW",
    alias: ["Gaseffekt", "Värmeeffekt", "Uteffekt"],
    monster: /(\d+[,.]?\d*)\s*kW/i,
  }),
  F("Vikt", {
    enhet: "kg",
    alias: ["Nettovikt", "Produktvikt", "Weight"],
    monster: /(\d+[,.]?\d*)\s*kg\b/i,
  }),
  F("Inbyggd termometer", {
    alias: ["Termometer", "Temperaturmätare", "Temperaturvisning"],
  }),
  F("Yttermått", {
    alias: ["Mått", "Dimensioner", "Storlek"],
  }),
  /* Se ALDRIG_BEDOMD. Endast de modeller tek.no provat under exakt det namnet
     får ett värde här, och talen lånas aldrig till en systermodell eller till
     nästa generation. Ooni Koda 12 och Koda 2 är olika ugnar. */
  F("Uppmätt stentemperatur bak", {
    enhet: "°C",
    alias: ["Uppmätt bak", "Temperatur bak"],
  }),
  F("Uppmätt stentemperatur fram", {
    enhet: "°C",
    alias: ["Uppmätt fram", "Temperatur fram"],
  }),
  F("Garanti", { enhet: "år", alias: ["Garantitid"], monster: /(\d+)\s*års?\s*garanti/i }),
  F("GTIN"),
];

/**
 * ## Eltandborste
 *
 * Fälten följer sidans fyra kriterier, beslutade 2026-08-06: borsthuvudets pris
 * 25, batteri och laddning 35, borstkontroll 20, prisvärde 20.
 *
 * `Borsthuvudssystem` och `Pris per borsthuvud` är kategorins viktigaste rader
 * och de enda som säger vad tandborsten kostar att äga. Fyra huvuden om året är
 * tillverkarens eget intervall — Oral-B skriver "var 3:e månad" på sin svenska
 * sajt — och per styck går spannet i svensk handel från 44 kronor för Oral-B:s
 * runda fattning till 175 för Philips A3. Handtaget kostar mindre än fem års
 * huvuden på nästan varje modell i fältet.
 *
 * ⚠️ `Angiven drifttid` är **inte** ALDRIG_BEDOMD men får aldrig lånas mellan
 * modeller. Philips publicerar dagar per modell, och deras billigaste modell i
 * fältet anger 21 dagar mot flaggskeppets 14. Oral-B publicerar ingen drifttid
 * alls för iO-handtagen: sökt på oralb.se, .com, .co.uk, .de, P&G:s två
 * kunskapsbasartiklar, den officiella iO-bruksanvisningen och Icecat. De
 * cellerna står tomma och drar aldrig ner ett betyg.
 *
 * `Laddtid` bär i stället kriteriet, eftersom P&G publicerar den för varenda
 * Oral-B-modell och Philips för hela Sonicare-serien. Spridningen är åtta
 * gånger, 3 timmar mot 24, och den följer inte priset.
 */
const ELTANDBORSTE = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Borsthuvudssystem", {
    alias: ["Borsthuvud", "Huvudsystem", "Passande borsthuvuden", "Borsthuvudsfattning"],
  }),
  F("Pris per borsthuvud", {
    enhet: "kr",
    alias: ["Kostnad per borsthuvud", "Borsthuvudspris", "Pris per huvud"],
    monster: /(\d+)\s*kr/i,
  }),
  F("Borsthuvuden per år", {
    enhet: "kr",
    alias: ["Årskostnad borsthuvuden", "Kostnad per år"],
    monster: /(\d+)\s*kr/i,
  }),
  F("Angiven drifttid", {
    enhet: "dagar",
    alias: ["Batteritid", "Drifttid", "Batteritid dagar", "Speltid"],
    monster: /(\d+)\s*dagar/i,
  }),
  F("Laddtid", {
    enhet: "h",
    alias: ["Laddningstid", "Tid till full laddning", "Uppladdningstid"],
    monster: /(\d+)\s*(?:h|timmar)/i,
  }),
  F("Laddare", { alias: ["Laddning", "Laddstation", "Laddtyp"] }),
  F("Trycksensor", { alias: ["Tryckvarning", "Tryckindikator", "Pressure sensor"] }),
  F("Borstlägen", {
    enhet: "st",
    alias: ["Antal borstlägen", "Rengöringslägen", "Lägen", "Antal lägen"],
    monster: /(\d+)/,
  }),
  F("Intensitetsnivåer", {
    enhet: "st",
    alias: ["Intensiteter", "Hastigheter", "Antal intensitetsnivåer"],
    monster: /(\d+)/,
  }),
  F("Rörelsetyp", {
    alias: ["Teknik", "Borströrelse", "Borstteknik", "Rörelse"],
  }),
  F("Timer", { alias: ["Borstningstimer", "Zonindikering", "Kvadranttimer"] }),
  /* Omärkta med flit: de bor i produktens egen speclista. Display och app
     finns bara i den dyra halvan, och resefodralet följer med på de flesta. */
  F("Display", { alias: ["Skärm", "Färgskärm", "Interaktiv display"] }),
  F("App", { alias: ["Appstöd", "Bluetooth", "Uppkoppling"] }),
  F("Resefodral", { alias: ["Fodral", "Reseetui", "Travel case"] }),
  F("Garanti", { enhet: "år", alias: ["Garantitid"], monster: /(\d+)\s*års?\s*garanti/i }),
  F("GTIN"),
];

/**
 * ## Kompaktkamera
 *
 * Kategorin har två storheter som drar åt var sitt håll, och hela sidan bygger
 * på att de står bredvid varandra: `Sensorstorlek` och `Optisk zoom`. Under
 * ungefär 7 000 kronor får köparen den ena eller den andra, aldrig båda, och
 * priset avslöjar inte vilken. Därför är båda markerade och båda ifyllda för
 * varenda produkt.
 *
 * `Vikt` normaliseras till **med batteri och minneskort**. Canon, Sony,
 * Fujifilm och Ricoh anger alla det måttet; OM System anger bara `body only`
 * för TG-7, och den cellen står hellre tom än med ett tal som väger 249 gram
 * mot andras 302. Samma fel som butikens viktfält på /bluetooth-hogtalare.
 *
 * `Bildstabilisering` bär typen och inte stegtalet. Canon publicerar inget
 * stegtal för PowerShot V1 och Panasonic inget för TZ99, och ett kriterium som
 * drog av för det hade betygsatt vår research. Sensor- eller
 * objektivförskjutning är en annan sorts stabilisering än den rent
 * elektroniska i Pentax WG-8 och Sony ZV-1F, och det är skillnaden raden mäter.
 *
 * `Brännvidd` är alltid omräknad till 35 mm-format. Det är det enda talet som
 * går att jämföra mellan en 1/2,3-tums och en 1,4-tums sensor, och samtliga
 * tillverkare publicerar det vid sidan av sitt eget.
 */
const KOMPAKTKAMERA = [
  F("Pris", { enhet: "kr", alltid: true }),
  F("Sensorstorlek", {
    alias: ["Sensor", "Bildsensor", "Sensortyp", "Bildsensorstorlek"],
  }),
  F("Effektiv upplösning", {
    enhet: "MP",
    alias: ["Upplösning", "Megapixel", "Antal effektiva pixlar", "Effektiva pixlar"],
    monster: /(\d+[,.]?\d*)\s*(?:MP|megapix)/i,
  }),
  F("Brännvidd", {
    alias: ["Brännvidd 35 mm", "Motsvarande brännvidd", "Focal length", "Zoomomfång"],
  }),
  F("Optisk zoom", {
    alias: ["Zoom", "Optisk zoom (x)", "Zoomfaktor"],
    monster: /(\d+[,.]?\d*)\s*x/i,
  }),
  F("Största bländare", {
    alias: ["Bländare", "Ljusstyrka", "Maximum aperture", "F-nummer"],
  }),
  F("Bildstabilisering", {
    alias: ["Stabilisering", "IS", "SteadyShot", "O.I.S.", "Image stabilisation"],
  }),
  F("Video", {
    alias: ["Filmformat", "Videoupplösning", "Maximal videoupplösning", "Movie"],
  }),
  F("Mikrofoningång", {
    alias: ["Mikrofonuttag", "Extern mikrofon", "Mic in", "3,5 mm-ingång"],
  }),
  F("Sökare", { alias: ["Viewfinder", "EVF", "Elektronisk sökare"] }),
  F("Vikt", {
    enhet: "g",
    alias: ["Vikt med batteri", "Nettovikt", "Weight"],
    monster: /(\d+)\s*g\b/i,
  }),
  /* Omärkta med flit: de bor i produktens egen speclista. Skärmen skiljer sig
     i art och inte i grad mellan modellerna, batteritiden publiceras av fyra
     av tio, och vattentätheten gäller bara de två tåliga. Att göra rader av
     dem hade gett tre kolumner med streck. */
  F("Skärm", { alias: ["Display", "LCD", "Bildskärm", "Skärmstorlek"] }),
  F("Batteritid", {
    enhet: "bilder",
    alias: ["Antal bilder", "CIPA", "Batterikapacitet"],
    monster: /(\d+)\s*bilder/i,
  }),
  F("Vattentäthet", {
    alias: ["Vattentät", "Kapslingsklass", "Waterproof", "Vädertålighet"],
  }),
  F("Mått", { alias: ["Storlek", "Dimensions", "Mått (B x H x D)"] }),
  F("Laddning", { alias: ["Laddkontakt", "USB-laddning", "Laddning via"] }),
  F("GTIN"),
];

export const SPEC_SCHEMA = {
  eltandborste: ELTANDBORSTE,
  smartwatch: SMARTWATCH,
  pizzaugn: PIZZAUGN,
  skaftdammsugare: SKAFTDAMMSUGARE,
  babyvakt: BABYVAKT,
  mjolkskummare: MJOLKSKUMMARE,
  powerstation: POWERSTATION,
  "galaxy-s26-fodral": GALAXY_S26_FODRAL,
  "galaxy-s26-skal": GALAXY_S26_SKAL,
  "iphone-skarmskydd": IPHONE_SKARMSKYDD,
  "iphone-fodral": IPHONE_FODRAL,
  slackspray: SLACKSPRAY,
  "iphone-skal": IPHONE_SKAL,
  powerbank: POWERBANK,
  /* Reseklassen delar fältschema med vardagsklassen: samma egenskaper, andra
     storlekar. Sidorna är delade på storlek och inte på teknik. */
  "powerbank-20000": POWERBANK,
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
  kompaktkamera: KOMPAKTKAMERA,
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
