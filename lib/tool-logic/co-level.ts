/**
 * Vad en CO-halt betyder, och när varnaren enligt EN 50291 får larma.
 *
 * ## Fyndet tabellen gör synligt
 *
 * EN 50291 förbjuder varnaren att larma tidigt vid låga halter, för att undvika
 * falsklarm. Vid 30 ppm får den inte larma alls före två timmar. Vid 50 ppm ska
 * den vara tyst den första timmen.
 *
 * Kravet är rimligt och har en konsekvens som ingen svensk jämförelse skriver
 * ut: en långsam läcka kan pågå i timmar innan något ljud hörs. Det är precis
 * det förlopp som ger huvudvärk som går över när man går ut, alltså det som
 * misstas för influensa.
 *
 * ## Vad vi inte räknar
 *
 * Hur länge en källa måste läcka för att nå en viss halt. Det kräver två tal
 * ingen har: hur mycket kolmonoxid källan avger, som varierar med
 * storleksordningar, och rummets luftomsättning. Ett exakt svar byggt på två
 * gissningar, om en dödlig risk, är farligare än inget svar alls.
 *
 * ## Källor
 *
 * Larmtiderna från EN 50291. Hälsoeffekterna från OSHA, samstämmiga med Kidde
 * och med räddningstjänsters publicerade tabeller.
 */

export type CoLevel = {
  ppm: number;
  /** Vad standarden kräver av varnaren vid den här halten. */
  alarm: string;
  /** Minuter varnaren enligt standarden inte får larma före, om något. */
  silentFor?: number;
  /** Vad som händer med en människa. */
  effect: string;
  tone: "low" | "mid" | "high";
};

export const CO_LEVELS: CoLevel[] = [
  {
    ppm: 30,
    alarm: "Får inte larma före 120 minuter",
    silentFor: 120,
    effect:
      "Ingen akut effekt hos friska vuxna. Vid exponering dag efter dag kan huvudvärk och trötthet komma, och foster och personer med hjärtsjukdom påverkas tidigare.",
    tone: "low",
  },
  {
    ppm: 50,
    alarm: "Tidigast efter 60 minuter, senast efter 90",
    silentFor: 60,
    effect:
      "Det amerikanska gränsvärdet för yrkesexponering under en åttatimmarsdag. Alltså inte akut farligt, men inte heller något som ska finnas i ett sovrum.",
    tone: "low",
  },
  {
    ppm: 100,
    alarm: "Tidigast efter 10 minuter, senast efter 40",
    silentFor: 10,
    effect:
      "Lätt huvudvärk efter ett par timmar. Många beskriver det i efterhand som att de kände sig hängiga utan att förstå varför.",
    tone: "mid",
  },
  {
    ppm: 200,
    alarm: "Mellan 10 och 40 minuter, som vid 100 ppm",
    effect: "Lätt huvudvärk efter två till tre timmar.",
    tone: "mid",
  },
  {
    ppm: 300,
    alarm: "Senast efter 3 minuter",
    effect:
      "Huvudvärk och illamående inom ett par timmar. Här kräver standarden att varnaren larmar nästan omedelbart.",
    tone: "high",
  },
  {
    ppm: 400,
    alarm: "Senast efter 3 minuter",
    effect:
      "Huvudvärk och illamående inom en till två timmar. Livshotande efter omkring tre timmar.",
    tone: "high",
  },
  {
    ppm: 800,
    alarm: "Senast efter 3 minuter",
    effect:
      "Huvudvärk, illamående och yrsel inom 45 minuter. Medvetslöshet efter omkring en timme. Dödsfall inom två till tre timmar.",
    tone: "high",
  },
  {
    ppm: 1600,
    alarm: "Senast efter 3 minuter",
    effect:
      "Svår huvudvärk, illamående och yrsel inom 20 minuter. Dödsfall kan inträffa inom en timme.",
    tone: "high",
  },
];

/**
 * Närmaste tabellerade halt.
 *
 * Widgeten låter bara välja tabellvärden, men en agent kan fråga om 75 ppm.
 * Att svara med närmaste rad är rätt: tabellen är publicerade riktvärden vid
 * angivna halter, inte en kurva att interpolera i.
 *
 * **Lika avstånd avgörs uppåt.** 75 ppm ligger exakt mellan 50 och 100, och då
 * ska svaret bli 100. Det här är en tabell om en dödlig gas, och den enda
 * försvarbara avrundningen är den mot den allvarligare avläsningen.
 */
export function nearestCoLevel(ppm: number): CoLevel {
  if (!Number.isFinite(ppm)) return CO_LEVELS[1];

  return CO_LEVELS.reduce((best, level) =>
    Math.abs(level.ppm - ppm) <= Math.abs(best.ppm - ppm) ? level : best,
  );
}

/** "60 minuter" blir "en timme", "120" blir "två timmar". Böjs, inte suffixas. */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} minuter`;
  const hours = Math.round(minutes / 60);
  return hours === 1 ? "en timme" : `${hours} timmar`;
}
