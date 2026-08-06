/**
 * Sensor eller räckvidd?
 *
 * Kategorins hela problem är att de två egenskaper som kostar pengar drar åt
 * var sitt håll, och att priset inte avslöjar vilken du får. Under ungefär
 * 7 000 kronor är valet binärt: en sensor av 1,0-typ utan zoom, eller en
 * 1/2,3-tums med 30 till 40 gångers zoom. Köparen som inte vet det köper efter
 * pris och får slumpen.
 *
 * ## Regeln som formar svaren
 *
 * **Motivet bestämmer sensorklassen, aldrig budgeten.** Den som fotograferar
 * inomhus på kvällen får ett sämre resultat av en dyrare superzoom än av en
 * billigare kamera med stor sensor, och verktyget säger det rakt ut.
 *
 * Den andra regeln är att **verktyget får svara "behåll telefonen"**. Fotar du
 * bara rum, mat och personer på nära håll i dagsljus är en 1/2,3-tums kamera
 * inget steg upp från en modern mobil, och att leda dit vore att sälja en
 * kategori i stället för en produkt. Samma slags svar som luftväljarens
 * "ingen av dem".
 *
 * ## Vad modulen inte känner till
 *
 * Inga produkter, inga priser, inga butiker. Svaret är en kravspecifikation
 * som går att bära med sig till vilken butik som helst. Se lib/agent-tools.ts.
 */

export const CAMERA_SUBJECTS = [
  { key: "inne", label: "Rum, middagar och personer inomhus" },
  { key: "resa", label: "Gator, byggnader och landskap på resa" },
  { key: "rorelse", label: "Barn, husdjur och sport i rörelse" },
  { key: "natur", label: "Fåglar och djur på avstånd" },
] as const;

export const CAMERA_VIDEO = [
  { key: "aldrig", label: "Nej, jag fotograferar" },
  { key: "ibland", label: "Korta klipp då och då" },
  { key: "framfor", label: "Ja, och jag pratar in i den" },
] as const;

export const CAMERA_WEATHER = [
  { key: "torrt", label: "Den ligger i väska eller ficka" },
  { key: "ute", label: "Regn, snö och stränder" },
  { key: "vatten", label: "Under vattenytan" },
] as const;

export type CameraSubjectKey = (typeof CAMERA_SUBJECTS)[number]["key"];
export type CameraVideoKey = (typeof CAMERA_VIDEO)[number]["key"];
export type CameraWeatherKey = (typeof CAMERA_WEATHER)[number]["key"];

export type CameraAnswers = {
  subject: CameraSubjectKey | null;
  video: CameraVideoKey | null;
  weather: CameraWeatherKey | null;
};

export const EMPTY_CAMERA_ANSWERS: CameraAnswers = {
  subject: null,
  video: null,
  weather: null,
};

export const CAMERA_QUESTIONS = [
  {
    key: "subject" as const,
    question: "Vad ska du fotografera mest?",
    options: CAMERA_SUBJECTS,
  },
  {
    key: "video" as const,
    question: "Ska du filma med den?",
    options: CAMERA_VIDEO,
  },
  {
    key: "weather" as const,
    question: "Var ska kameran vara?",
    options: CAMERA_WEATHER,
  },
] as const;

export type CameraVerdict = {
  /** Rubriken: vilken sorts kamera frågorna leder till. */
  headline: string;
  /** Kraven att ta med sig till butiken, i fallande viktighet. */
  requirements: string[];
  /** Varför avvägningen ser ut så här för just det här motivet. */
  why: string;
  /** Den vanligaste dyra felköpet för den här kombinationen. */
  watch: string;
  /** Sant när svaret leder bort från ett köp. Väljaren byter rubrik då. */
  keepPhone?: boolean;
};

/**
 * Vattentäthet går före allt annat, eftersom den utesluter hela fältet.
 * Bara två av tio kameror i jämförelsen tål vatten, och båda har liten sensor,
 * så ingen kombination av övriga svar kan ändra rekommendationen.
 */
function waterproofVerdict(video: CameraVideoKey): CameraVerdict {
  return {
    headline: "En tålig kamera, och du får leva med liten sensor",
    requirements: [
      "Angivet vattendjup i meter, inte bara ordet vattentät",
      "Sensor på 1/2,3 tum, eftersom ingen tålig kamera har större",
      "f/2,0 i vidvinkel om du ska under ytan, där ljuset tar slut fort",
      "Sensorförskjutande stabilisering framför elektronisk",
    ],
    why:
      "Ingen tillverkare bygger en kamera med stor sensor som tål vatten, eftersom tätningen kräver ett fast objektiv och ett litet hus. Valet står alltså inte mellan sensor och räckvidd här, utan mellan de två tåliga kamerorna som finns.",
    watch:
      video === "framfor"
        ? "Ingen tålig kamera har mikrofoningång, så ljudet blir kamerans eget. Räkna med att spela in tal separat."
        : "Ett angivet djup på 1 eller 3 meter betyder poolkanten, inte snorkling. Skillnaden mot 15 meter är verklig.",
  };
}

/**
 * Beslutet, i den ordning egenskaperna utesluter varandra: vatten först,
 * sedan motivet, och video som skärpning av kraven.
 */
export function decideCamera(answers: CameraAnswers): CameraVerdict | null {
  const { subject, video, weather } = answers;
  if (!subject || !video || !weather) return null;

  if (weather === "vatten") return waterproofVerdict(video);

  const rain = weather === "ute";

  if (subject === "natur") {
    return {
      headline: "En superzoom, och sensorn blir liten",
      requirements: [
        "700 millimeter eller mer, omräknat till 35 mm-format",
        "Optisk stabilisering, gärna med angivet stegtal",
        "Bländartal i teleänden, alltså det andra talet, helst under f/6,5",
        ...(video === "framfor" ? ["Mikrofoningång på 3,5 mm"] : []),
      ],
      why:
        "Fågeln i granen kräver brännvidd, och brännvidd i fickformat kräver en liten sensor. Ingen kamera i den här storleken har både 700 millimeter och en sensor av 1,0-typ, så räckvidden är det du köper och bildkvaliteten inomhus är det du betalar med.",
      watch:
        video === "framfor"
          ? "Superzoomarna saknar oftast mikrofoningång. Ska du prata in i kameran får du välja bort räckvidden."
          : "Digital zoom räknas inte. Talet som betyder något är den optiska zoomen och brännvidden i millimeter.",
    };
  }

  if (subject === "inne") {
    if (video === "aldrig" && !rain) {
      return {
        headline: "Behåll telefonen om du inte får en sensor av 1,0-typ",
        requirements: [
          "Sensor av 1,0-typ eller större, alltså minst 13,2 × 8,8 millimeter",
          "f/2,8 eller ljusare i vidvinkel",
          "Optisk eller sensorförskjutande stabilisering",
        ],
        why:
          "En kamera med 1/2,3-tums sensor har ungefär samma sensoryta som en bra mobiltelefon, och mobilen har bättre bildbehandling. Steget upp finns först vid 1,0-typ, som samlar ungefär fyra gånger så mycket ljus.",
        watch:
          "Priset avgör inte sensorstorleken. Flera kameror runt 6 500 kronor har den minsta sensorn, medan en av de billigare har den stora.",
        keepPhone: true,
      };
    }
    return {
      headline: "Stor sensor, och zoomen får du hoppa över",
      requirements: [
        "Sensor av 1,0-typ eller större",
        "f/2,8 eller ljusare i vidvinkel",
        ...(video === "framfor"
          ? ["Mikrofoningång på 3,5 mm", "Skärm som går att vända mot dig"]
          : ["4K om du filmar alls"]),
        ...(rain ? ["Angiven tålighet, eftersom stor sensor och tätning sällan går ihop"] : []),
      ],
      why:
        "Inomhus på kvällen är sensorytan det enda som avgör. En sensor av 1,0-typ samlar ungefär fyra gånger så mycket ljus som en 1/2,3-tums, och den skillnaden syns i varje bild efter oktober.",
      watch:
        rain
          ? "Ingen kamera med stor sensor tål vatten. Ska den ut i regn får du välja mellan sensorn och tätningen."
          : "Kameror med stor sensor i den här klassen har ofta kort eller ingen zoom. Kontrollera brännvidden innan du köper, inte efter.",
    };
  }

  if (subject === "rorelse") {
    return {
      headline: "Snabb autofokus, och räckvidd före sensor",
      requirements: [
        "200 millimeter eller mer, omräknat till 35 mm-format",
        "Serietagning med omräknad skärpa mellan bilderna",
        "Optisk stabilisering",
        ...(video === "framfor" ? ["Mikrofoningång på 3,5 mm"] : []),
      ],
      why:
        "Ett barn som springer mot dig kräver två saker: att kameran hinner räkna om skärpan mellan bilderna, och att du står tillräckligt långt bort för att få med hela rörelsen. Sensorstorleken kommer i tredje hand, eftersom sport och lek nästan alltid sker i dagsljus.",
      watch:
        "Serietagning i bilder per sekund säger ingenting om autofokusen hinner med. Leta efter att skärpan räknas om mellan bilderna, inte bara efter ett högt tal.",
    };
  }

  return {
    headline: "En resekamera med 20 till 30 gångers zoom",
    requirements: [
      "300 millimeter eller mer, omräknat till 35 mm-format",
      "Optisk stabilisering",
      "Under 330 gram, annars stannar den i hotellrummet",
      ...(video === "framfor" ? ["Mikrofoningång på 3,5 mm"] : []),
      ...(rain ? ["Angiven tålighet mot regn och damm"] : []),
    ],
    why:
      "På resa är motivavståndet det oförutsägbara: samma dag rymmer gatan framför dig och tornuret hundra meter bort. Räckvidden löser fler situationer per dag än sensorn gör, och en resekamera med 30x väger sällan mer än en med 4x.",
    watch:
      "Vikten avgör om kameran faktiskt följer med ut. Skillnaden mellan 240 och 426 gram är skillnaden mellan jackficka och axelväska.",
  };
}
