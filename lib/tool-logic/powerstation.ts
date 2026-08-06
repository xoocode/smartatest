/**
 * Hur stor powerstation behöver du?
 *
 * Kategorins hela problem är att köparen får ett tal och behöver två. Talet i
 * produktnamnet är ibland watt och ibland wattimmar, och de två svarar på helt
 * olika frågor: **watt avgör vad som går att koppla in, wattimmar avgör hur
 * länge det kan gå**. En station med stort batteri bakom en svag växelriktare
 * startar inte ens vattenkokaren.
 *
 * Modulen översätter därför det läsaren faktiskt ska driva till just de två
 * talen, plus toppeffekten som avgör om en motor kommer igång.
 *
 * ## Reglerna som formar svaren
 *
 * **Effektkravet sätts av den apparat som drar mest, inte av summan**, om de
 * inte ska gå samtidigt. Läsaren får därför välja det själv, eftersom det är
 * den vanligaste missuppfattningen: att fem apparater på 60 watt kräver en
 * station på 300.
 *
 * **Energikravet räknas med 15 procents omvandlingsförlust.** Växelriktaren
 * som gör 230 volt av batteriets likspänning kostar energi, och tillverkarnas
 * wattimmar gäller cellen och inte uttaget. Femton procent är den försiktiga
 * änden av det spann som är vanligt i kategorin, och verktyget säger rakt ut
 * att talet är påslaget.
 *
 * **Startrycket är ett eget krav.** En kompressor eller motor drar två till
 * tre gånger sin märkeffekt under första sekunden. Kylskåp, kylbox, pump och
 * elverktyg bär därför ett toppeffektkrav som resten inte har.
 *
 * ## Vad modulen inte känner till
 *
 * Inga produkter, inga priser, inga butiker. Den svarar med en kravspecifikation
 * som går att bära med sig till vilken butik som helst. Se lib/agent-tools.ts
 * för varför.
 */

/**
 * Effekt, startryck och hur stor del av tiden apparaten faktiskt drar ström.
 *
 * Talen i watt är typiska för hushållsapparater och avsiktligt satta i den övre
 * änden av vad som är vanligt, eftersom ett för lågt krav ger ett köp som inte
 * fungerar medan ett för högt bara ger marginal.
 *
 * ⚠️ **Drifttiden är obligatorisk och den är hela skillnaden mellan ett
 * användbart och ett obrukbart svar.** Ett första utkast räknade varje apparat
 * som om den gick oavbrutet hela perioden, vilket lät en vattenkokare koka i två
 * timmar och gav 4 750 wattimmar för en dator och en kopp te. Varje kombination
 * hamnade då över klassens tak och verktyget svarade i praktiken alltid samma
 * sak.
 *
 * Två sorters last, och de räknas olika:
 *
 * - `andel` — apparaten drar ström under en del av tiden. En kompressor i ett
 *   kylskåp går ungefär en tredjedel av tiden, belysning brinner en fjärdedel
 *   av ett dygn, en router går alltid.
 * - `minPerDygn` — apparaten går i korta pass. En vattenkokare kokar tio
 *   minuter om dagen oavsett om resan är två timmar eller två dygn, och en
 *   period kortare än ett dygn räknas ändå som ett helt tillfälle.
 */
export const PS_APPLIANCES = [
  { key: "mobil", label: "Mobil och surfplatta", watt: 20, startWatt: 20, minPerDygn: 90 },
  { key: "router", label: "Router och wifi", watt: 15, startWatt: 15, andel: 1 },
  { key: "belysning", label: "LED-belysning", watt: 25, startWatt: 25, andel: 0.25 },
  { key: "laptop", label: "Bärbar dator", watt: 65, startWatt: 65, andel: 0.5 },
  { key: "kylbox", label: "Kylbox med kompressor", watt: 50, startWatt: 150, andel: 0.33 },
  { key: "kylskap", label: "Kylskåp", watt: 100, startWatt: 400, andel: 0.33 },
  { key: "projektor", label: "Projektor eller TV", watt: 200, startWatt: 200, andel: 0.2 },
  { key: "pump", label: "Dränkbar pump", watt: 400, startWatt: 1000, minPerDygn: 20 },
  { key: "verktyg", label: "Elverktyg", watt: 900, startWatt: 2000, minPerDygn: 30 },
  { key: "kaffe", label: "Kaffebryggare", watt: 1000, startWatt: 1000, minPerDygn: 15 },
  { key: "mikro", label: "Mikrovågsugn", watt: 1200, startWatt: 1600, minPerDygn: 10 },
  {
    key: "vattenkokare",
    label: "Vattenkokare eller hårtork",
    watt: 2000,
    startWatt: 2000,
    minPerDygn: 10,
  },
] as const;

export const PS_DURATIONS = [
  { key: "timmar2", label: "Ett par timmar", hours: 2 },
  { key: "kvall", label: "En kväll, cirka 5 timmar", hours: 5 },
  { key: "dygn", label: "Ett dygn", hours: 24 },
  { key: "helg", label: "En helg, cirka 48 timmar", hours: 48 },
] as const;

export const PS_SIMULTANEOUS = [
  { key: "en", label: "En i taget" },
  { key: "alla", label: "Flera samtidigt" },
] as const;

export type PsApplianceKey = (typeof PS_APPLIANCES)[number]["key"];
export type PsDurationKey = (typeof PS_DURATIONS)[number]["key"];
export type PsSimultaneousKey = (typeof PS_SIMULTANEOUS)[number]["key"];

export type PsAnswers = {
  appliances: PsApplianceKey[];
  duration: PsDurationKey | null;
  simultaneous: PsSimultaneousKey | null;
};

export const EMPTY_PS_ANSWERS: PsAnswers = {
  appliances: [],
  duration: null,
  simultaneous: null,
};

export type PsVerdict = {
  /** Kontinuerlig effekt som växelriktaren måste orka, i watt. */
  watt: number;
  /** Toppeffekt som krävs för att motorer och kompressorer ska starta. */
  toppWatt: number;
  /** Energi som behövs, inklusive omvandlingsförlust, i wattimmar. */
  wattimmar: number;
  /** Kort mening som säger vad kravet betyder. */
  headline: string;
  /** Punktlista med de tal som ska stå på förpackningen. */
  requirements: string[];
  /** Varför kravet ser ut som det gör. */
  why: string;
  /** Den vanligaste fällan för just det här svaret. */
  watch: string;
  /**
   * `true` när energibehovet överstiger vad kategorin klarar, alltså när svaret
   * är att en powerstation är fel produkt.
   */
  overKategorin: boolean;
};

/**
 * Övre gränsen för vad den här sidans klass rymmer. Över den finns
 * hemreservklassen, och över den ett elverk.
 */
const KLASSENS_TAK_WH = 1024;

/** Omvandlingsförlust i växelriktaren, försiktigt räknat. */
const FORLUST = 1.15;

/** Runda uppåt till närmaste jämna tiotal watt eller wattimme. */
const rundaUpp = (n: number, steg: number) => Math.ceil(n / steg) * steg;

export function decidePowerstation(answers: PsAnswers): PsVerdict | null {
  const { appliances, duration, simultaneous } = answers;
  if (appliances.length === 0 || !duration || !simultaneous) return null;

  const valda = PS_APPLIANCES.filter((a) =>
    appliances.includes(a.key as PsApplianceKey),
  );
  const timmar =
    PS_DURATIONS.find((d) => d.key === duration)?.hours ?? 5;
  const samtidigt = simultaneous === "alla";

  /* Effektkravet: summan om allt ska gå samtidigt, annars den som drar mest.
     Det är hela skillnaden mellan att köpa 300 watt och 1 800. */
  const watt = samtidigt
    ? valda.reduce((sum, a) => sum + a.watt, 0)
    : Math.max(...valda.map((a) => a.watt));

  /* Toppeffekten sätts alltid av den enskilt tyngsta starten, eftersom två
     motorer sällan drar sitt startryck i exakt samma ögonblick. */
  const toppWatt = Math.max(...valda.map((a) => a.startWatt), watt);

  /* Energin räknas alltid på allt som ska drivas, oavsett om de går samtidigt
     eller efter varandra: samma arbete kostar lika mycket energi. Det som
     skiljer är hur länge varje apparat faktiskt drar ström, se PS_APPLIANCES. */
  const dygn = Math.max(1, timmar / 24);
  const rentWh = valda.reduce((sum, a) => {
    const drifttimmar =
      "minPerDygn" in a
        ? (a.minPerDygn / 60) * dygn
        : timmar * (a.andel as number);
    return sum + a.watt * drifttimmar;
  }, 0);
  const wattimmar = rundaUpp(rentWh * FORLUST, 10);

  const overKategorin = wattimmar > KLASSENS_TAK_WH;
  const kraverTopp = toppWatt > watt;

  const headline = overKategorin
    ? `Du behöver mer än ${KLASSENS_TAK_WH} wattimmar`
    : `${rundaUpp(watt, 10)} watt och ${wattimmar} wattimmar`;

  const requirements: string[] = [
    `Kontinuerlig effekt: minst ${rundaUpp(watt, 10)} W`,
    kraverTopp
      ? `Toppeffekt: minst ${rundaUpp(toppWatt, 100)} W`
      : "Toppeffekt: ingen särskild marginal krävs",
    `Kapacitet: minst ${wattimmar} Wh`,
  ];
  if (valda.some((a) => a.watt >= 1000)) {
    requirements.push("Ren sinusvåg, eftersom värmande last kräver full spänning");
  }

  const energiForklaring = `Energikravet räknas på hur länge varje sak faktiskt drar ström under ${timmar} timmar, inte på att allt går oavbrutet: en kompressor arbetar ungefär en tredjedel av tiden och en vattenkokare i tio minuter. På det ligger 15 procents påslag för omvandlingen till 230 volt.`;
  const why = samtidigt
    ? `Effektkravet är summan av allt du valt, eftersom de ska gå samtidigt. ${energiForklaring}`
    : `Effektkravet sätts av den apparat som drar mest, inte av summan, eftersom de ska gå en i taget. ${energiForklaring}`;

  const watch = overKategorin
    ? "Bärbara powerstationer i den här klassen slutar runt tusen wattimmar. Behöver du mer är det ett fast hembatteri eller ett elverk som gäller, och ett elverk kräver bränsle och kan aldrig stå inomhus."
    : kraverTopp
      ? "Titta på toppeffekten och inte bara på den kontinuerliga. En kompressor drar två till tre gånger sin märkeffekt under första sekunden, och en station som klarar driften kan ändå vägra starta apparaten."
      : "Läs aldrig kapaciteten ur modellnamnet. Talet där är ibland watt, ibland wattimmar och ibland ingetdera, så leta upp båda talen i specifikationen.";

  return {
    watt: rundaUpp(watt, 10),
    toppWatt: rundaUpp(toppWatt, 100),
    wattimmar,
    headline,
    requirements,
    why,
    watch,
    overKategorin,
  };
}
