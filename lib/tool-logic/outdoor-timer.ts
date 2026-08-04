/**
 * Mekanisk timer, digital eller smart plugg för utomhusbruk.
 *
 * Kraven lämnas som `needsWatt`, `needsSun` och `needsRemote`. Produkturvalet
 * görs i widgeten.
 */

export const TIMER_LOADS = [
  { key: "ljusslinga", label: "Julbelysning eller ljusslinga", watt: 200 },
  { key: "fasad", label: "Fasad- eller trädgårdsbelysning", watt: 500 },
  { key: "motorvarmare", label: "Motorvärmare med kupévärmare", watt: 2200 },
  { key: "pump", label: "Pump, fläkt eller värmare", watt: 1500 },
] as const;

export const TIMER_SEASONS = [
  { key: "december", label: "Bara under vintersäsongen" },
  { key: "aret", label: "Året runt" },
] as const;

export const TIMER_REACH = [
  { key: "hemifran", label: "Ja, även när jag inte är hemma" },
  { key: "pa-plats", label: "Nej, jag ställer den på plats" },
] as const;

export type TimerLoadKey = (typeof TIMER_LOADS)[number]["key"];
export type TimerSeasonKey = (typeof TIMER_SEASONS)[number]["key"];
export type TimerReachKey = (typeof TIMER_REACH)[number]["key"];

/* Påslag på lastens märkeffekt. Samma tjugo procent som Effektkollen använder
   på /smart-plug, av samma skäl: en apparat som står på i timmar vill ha
   marginal, och märkeffekten är ett typvärde och inte ditt värde. */
export const TIMER_MARGIN = 1.2;

export type TimerVerdict = {
  headline: string;
  why: string;
  warning?: string;
  /** Kraven i maskinläsbar form, så förslaget filtreras på samma tal som texten visar. */
  needsWatt: number;
  needsSun: boolean;
  needsRemote: boolean;
};

export function decideTimer(
  load: TimerLoadKey | null,
  season: TimerSeasonKey | null,
  reach: TimerReachKey | null,
): TimerVerdict | null {
  if (!load || !season || !reach) return null;

  const spec = TIMER_LOADS.find((l) => l.key === load);
  if (!spec) return null;

  const needsWatt = Math.round(spec.watt * TIMER_MARGIN);
  /* Astro behövs när tändningstiden ska följa med över året. Under en
     decembersäsong rör sig solnedgången i Stockholm knappt tjugo minuter, och
     då tillför astrofunktionen ingenting som är värt att betala för. */
  const needsSun = season === "aret";
  const needsRemote = reach === "hemifran";

  const wattNote = `${spec.watt} W plus tjugo procent marginal blir ${needsWatt} W.`;

  if (needsRemote) {
    return {
      needsWatt,
      needsSun,
      needsRemote,
      headline: "En smart plugg, för du vill nå den hemifrån",
      why: `${wattNote} Att kunna ändra tiden när du inte står bredvid finns bara hos de smarta pluggarna, och där bara hos dem som talar wifi, Zigbee eller Z-Wave. Bluetooth räcker inte: då ska du stå på gården för att programmera om.`,
      warning:
        needsWatt > 2500
          ? "Lasten kräver 16 A, och det utesluter båda Shelly-pluggarna trots att de är bäst på kyla. Kontrollera märkningen 3 680 W innan du beställer."
          : undefined,
    };
  }

  if (needsSun) {
    return {
      needsWatt,
      needsSun,
      needsRemote,
      headline: "Något som följer solen, alltså astro eller ljussensor",
      why: `${wattNote} Ska belysningen gå året runt flyttar sig solnedgången omkring sju timmar mellan december och juni, och ett fast klockslag blir fel några veckor efter att du satt det. Antingen en astrofunktion som räknar ut tiden, eller ett skymningsrelä som mäter ljuset och därför aldrig behöver ställas om.`,
      warning:
        needsWatt > 1000
          ? "Skymningsreläet är det enklaste sättet att lösa det, men det klarar bara 1 000 W. Din last ligger över det, så här blir det en smart plugg med astrofunktion."
          : undefined,
    };
  }

  return {
    needsWatt,
    needsSun,
    needsRemote,
    headline: "En mekanisk timer räcker",
    why: `${wattNote} Under en vintersäsong står solnedgången nästan stilla, och du ställer tiden en gång. Då gör en app ingenting som segmenten på en skiva inte gör, och skivan kostar en åttondel.`,
    warning:
      "Den mekaniska tappar tiden vid strömavbrott och går sedan fel tills du ställer om den. Är det viktigt att den inte gör det, välj en digital med backupbatteri i stället.",
  };
}
