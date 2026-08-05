/**
 * Vilken USB-C-kabel behöver du?
 *
 * Kategorins hela problem är att kontakten inte säger något om kabeln. Två
 * sladdar som ser identiska ut kan skilja 83 gånger i datahastighet och fyra
 * gånger i effekt, och priset förutsäger ingetdera. Verktyget översätter därför
 * det läsaren faktiskt ska göra till de tre tal som står på förpackningen:
 * watt, gigabit och om kabeln nämner e-marker.
 *
 * ## Regeln som formar svaren
 *
 * **Uppgiften bestämmer kraven, aldrig priset.** Ska kabeln bara ladda en
 * telefon är den billigaste i butiken tekniskt likvärdig med den dyraste, och
 * verktyget säger det rakt ut. Det är samma slags svar som luftväljarens
 * "ingen av dem": det leder bort från ett dyrare köp och inte fram till det.
 *
 * Den andra regeln är att **60 watt är gränsen där kabeln börjar spela roll**.
 * Under den behövs ingen e-marker, och en kabel utan chip håller igen på
 * 3 ampere hur stark laddaren än är.
 *
 * ## Vad modulen inte känner till
 *
 * Inga produkter, inga priser, inga butiker. Den svarar med en kravspecifikation
 * som går att bära med sig till vilken butik som helst. Se lib/agent-tools.ts
 * för varför.
 */

export const CABLE_TASKS = [
  { key: "telefon", label: "Ladda telefon eller platta" },
  { key: "laptop", label: "Ladda en laptop" },
  { key: "filer", label: "Flytta filer, extern disk eller kamera" },
  { key: "skarm", label: "Koppla in en bildskärm" },
] as const;

export const CABLE_POWER = [
  { key: "under60", label: "Telefon eller platta, upp till 60 W" },
  { key: "till100", label: "Mindre laptop, runt 100 W" },
  { key: "over100", label: "Större laptop, 140 W eller mer" },
  { key: "vetinte", label: "Vet inte" },
] as const;

export const CABLE_LENGTHS = [
  { key: "kort", label: "Under en meter" },
  { key: "mellan", label: "En till två meter" },
  { key: "lang", label: "Tre meter eller mer" },
] as const;

export type CableTaskKey = (typeof CABLE_TASKS)[number]["key"];
export type CablePowerKey = (typeof CABLE_POWER)[number]["key"];
export type CableLengthKey = (typeof CABLE_LENGTHS)[number]["key"];

export type CableAnswers = {
  task: CableTaskKey | null;
  power: CablePowerKey | null;
  length: CableLengthKey | null;
};

export const EMPTY_CABLE_ANSWERS: CableAnswers = {
  task: null,
  power: null,
  length: null,
};

export const CABLE_QUESTIONS = [
  {
    key: "task" as const,
    question: "Vad ska kabeln användas till?",
    options: CABLE_TASKS,
  },
  {
    key: "power" as const,
    question: "Vad ska den ladda?",
    options: CABLE_POWER,
  },
  {
    key: "length" as const,
    question: "Hur lång behöver den vara?",
    options: CABLE_LENGTHS,
  },
];

export type CableVerdict = {
  /** Kort svar, exempelvis "En ren laddkabel räcker". */
  headline: string;
  /** Det som ska stå på förpackningen, i den ordning man letar efter det. */
  requirements: string[];
  why: string;
  /** Fällan som gäller just den här kombinationen. */
  watch: string;
  /** Sätts när svaret är att det billigaste alternativet duger. */
  cheapestIsFine: boolean;
};

/** Effektkravet, som är samma oavsett vad kabeln annars ska göra. */
function powerRequirement(power: CablePowerKey): string {
  if (power === "over100") {
    return "240 W, alltså USB PD 3.1 med Extended Power Range och e-marker för 5 A";
  }
  if (power === "till100") {
    return "Minst 100 W, vilket kräver e-marker";
  }
  if (power === "vetinte") {
    return "240 W, som täcker allt och kostar från omkring 120 kronor";
  }
  return "60 W räcker, och då behövs ingen e-marker";
}

export function decideCable(answers: CableAnswers): CableVerdict | null {
  const { task, power, length } = answers;
  if (!task || !power || !length) return null;

  const watt = powerRequirement(power);
  const longCable = length === "lang";

  /* Bildskärm är det hårdaste kravet och det som oftast missas, eftersom en
     kabel som laddar snabbt kan sakna ledarparen video behöver helt. */
  if (task === "skarm") {
    return {
      headline: "Du behöver en kabel med DisplayPort Alt Mode",
      requirements: [
        "DisplayPort Alt Mode, eller en angiven upplösning som 4K 60 Hz eller 8K 60 Hz",
        "Minst 10 Gbps, och 40 Gbps för 8K",
        watt,
      ],
      why: "En bildsignal går genom samma ledarpar som de snabba datakanalerna. Saknas de kan kabeln ladda med 240 watt och ändå lämna skärmen svart, och det är den vanligaste felköpta kabeln i kategorin.",
      watch: longCable
        ? "Långa passiva kablar tappar bandbredd. Vid tre meter och uppåt behöver du oftast en aktiv kabel med elektronik i kontakterna, och de kostar avsevärt mer. Överväg att flytta skärmen närmare i stället."
        : "Ett wattal säger ingenting om video. Leta efter orden DisplayPort eller Alt Mode, eller efter en upplösning. Står ingetdera ska du utgå från att kabeln inte driver någon skärm.",
      cheapestIsFine: false,
    };
  }

  if (task === "filer") {
    return {
      headline: "Du behöver en datakabel, inte en laddkabel",
      requirements: [
        "Minst 10 Gbps, och 40 Gbps om det är en snabb extern SSD",
        "Ett utskrivet tal i gigabit, aldrig bara USB-C",
        watt,
      ],
      why: "Skillnaden är den största i hela kategorin. En vanlig laddkabel gör 480 megabit i sekunden, en USB4-kabel 40 gigabit, alltså 83 gånger mer. Samma filflytt tar en kvart eller en hel kväll beroende på vilken sladd som råkade ligga närmast.",
      watch: longCable
        ? "Tre meter och full datahastighet går sällan ihop i en passiv kabel. Antingen kortar du avståndet eller betalar för en aktiv kabel."
        : "Står det bara USB-C och ett wattal på förpackningen är kabeln nästan alltid USB 2.0. Hastigheten ska anges med ett tal, annars finns den inte.",
      cheapestIsFine: false,
    };
  }

  if (task === "laptop") {
    const needsEmarker = power !== "under60";
    return {
      headline: needsEmarker
        ? "Du behöver en kabel med e-marker"
        : "En vanlig laddkabel räcker",
      requirements: [
        watt,
        needsEmarker
          ? "E-marker, som är chipet som talar om för laddaren vad kabeln tål"
          : "Ingen e-marker behövs under 60 W",
        longCable ? "Tre meter, vilket finns även bland de billiga laddkablarna" : "Längd efter behov",
      ],
      why: needsEmarker
        ? "Utan e-marker håller laddaren igen på 3 ampere, alltså omkring 60 watt, hur stark den än är. Det är den vanligaste orsaken till att en dyr laddare laddar långsamt, och felet syns inte på kabeln."
        : "En laptop som nöjer sig med 60 watt ställer inga särskilda krav på kabeln. Datahastighet spelar ingen roll när kabeln bara ska ladda.",
      watch:
        "Datahastigheten spelar ingen roll för laddning. Betala inte för 40 gigabit om kabeln aldrig ska flytta en fil, och betala inte heller extra för ett wattal du inte kommer åt: kolla vad som står på datorns egen nätdel.",
      cheapestIsFine: !needsEmarker,
    };
  }

  /* task === "telefon" */
  const overspec = power === "over100" || power === "till100";
  return {
    headline: "Den billigaste kabeln i butiken räcker",
    requirements: [
      "60 W, vilket varje USB-C-kabel klarar utan e-marker",
      longCable
        ? "Tre meter, som finns för under hundra kronor per meter"
        : "En och en halv till två meter, alltså längre än den som följde med telefonen",
      "Datahastighet och video kan du strunta i",
    ],
    why: overspec
      ? "Ingen telefon och ingen platta som säljs i dag drar mer än 60 watt, så ett högre wattal på kabeln ger dig ingenting. Effekten du valde gäller en laptop, inte den här kabeln."
      : "Ingen telefon som säljs i dag drar mer än 60 watt, och varje USB-C-kabel klarar det utan e-marker. En kabel för 59 kronor laddar din telefon exakt lika snabbt som en för 445.",
    watch: longCable
      ? "Räkna per meter när du jämför. En halvmeterkabel för hundra kronor kostar dubbelt så mycket per meter som en tremeterskabel för 249."
      : "Det som kostar pengar i den här kategorin är data och bild, inte watt. Ska kabeln bara ladda finns ingen teknisk anledning att betala mer än ett par hundralappar.",
    cheapestIsFine: true,
  };
}
