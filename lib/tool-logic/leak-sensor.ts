/**
 * Vilken sorts vattenlarm som räcker, utifrån plats, närvaro och befintlig hubb.
 *
 * Kraven lämnas som `needsApp`, `ownedHub`, `needsTightSpots` och
 * `needsHotSpot`. Produkturvalet görs i widgeten.
 */

export const LEAK_PLACES = [
  { key: "koket", label: "Kök eller tvättstuga" },
  { key: "trangt", label: "Bakom eller under en maskin" },
  { key: "beredare", label: "Intill varmvattenberedaren" },
] as const;

export const LEAK_PRESENCE = [
  { key: "borta", label: "Bostaden står tom om dagarna" },
  { key: "bortrest", label: "Vi är bortresta längre perioder" },
  { key: "hemma", label: "Någon är nästan alltid hemma" },
] as const;

export const LEAK_HUBS = [
  { key: "ingen", label: "Nej, ingen hubb" },
  { key: "tapo", label: "Ja, Tapo" },
  { key: "aqara", label: "Ja, Aqara" },
  { key: "zwave", label: "Ja, Z-Wave" },
] as const;

export type LeakPlaceKey = (typeof LEAK_PLACES)[number]["key"];
export type LeakPresenceKey = (typeof LEAK_PRESENCE)[number]["key"];
export type LeakHubKey = (typeof LEAK_HUBS)[number]["key"];

export type LeakVerdict = {
  headline: string;
  why: string;
  warning?: string;
  /** Larmet måste nå telefonen. */
  needsApp: boolean;
  /** Hubben användaren redan äger, eller null. */
  ownedHub: Exclude<LeakHubKey, "ingen"> | null;
  needsTightSpots: boolean;
  needsHotSpot: boolean;
};

export function decideLeakSensor(
  place: LeakPlaceKey | null,
  presence: LeakPresenceKey | null,
  hub: LeakHubKey | null,
): LeakVerdict | null {
  if (!place || !presence || !hub) return null;

  const needsApp = presence !== "hemma";
  const ownedHub = hub === "ingen" ? null : hub;
  const needsTightSpots = place === "trangt";
  const needsHotSpot = place === "beredare";

  const placeNote = needsTightSpots
    ? "Bakom en maskin kommer du inte åt med en klump på golvet, så du behöver ett larm med lös sond eller kabel."
    : needsHotSpot
      ? "Intill en varmvattenberedare blir det varmare än fyrtio grader, och de flesta larm är bara godkända dit."
      : "Under diskbänken och bakom diskmaskinen är rätt första plats. Enligt Vattenskadecentrum sker flest skador i köket och orsakas av vitvaror.";

  if (!needsApp) {
    return {
      needsApp,
      ownedHub,
      needsTightSpots,
      needsHotSpot,
      headline: "En siren räcker, och då ska du välja på batteritid",
      why: `${placeNote} Är någon nästan alltid hemma hörs sirenen av någon som kan stänga av kranen, och då betalar du för uppkoppling du inte behöver. Välj i stället det larm som håller längst utan att ses till, för det vanligaste skälet till att ett vattenlarm inte larmar är att batteriet dog i tysthet.`,
      warning:
        "Räknar du med att vara bortrest ens en vecka om året faller resonemanget. Då är det värt tvåhundra kronor att larmet når telefonen i stället.",
    };
  }

  if (ownedHub) {
    return {
      needsApp,
      ownedHub,
      needsTightSpots,
      needsHotSpot,
      headline: "Utnyttja hubben du redan har",
      why: `${placeNote} Med en hubb på plats är sensorn det enda du behöver köpa, och då blir de hubbkrävande larmen plötsligt de billigaste. En Tapo-hubb hanterar upp till 64 sensorer, så nästa larm efter det här kostar bara sensorpriset.`,
    };
  }

  return {
    needsApp,
    ownedHub,
    needsTightSpots,
    needsHotSpot,
    headline: "Ett larm som når telefonen utan hubb",
    why: `${placeNote} Står bostaden tom om dagarna är sirenen värdelös, för ingen hör den. Utan hubb betyder det ett larm som talar wifi på egen hand, eller ett paket där basstationen ingår.`,
    warning:
      "Kontrollera att wifi-nätet verkligen når fram. Larmet ska ligga längst in i ett skåp eller i en källare, alltså på de sämsta platser huset har för radiotäckning.",
  };
}
