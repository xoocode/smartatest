/**
 * Färgtemperatur i kelvin, och vad talet betyder i ett rum.
 *
 * Bara benämningen och användningen ligger här. Färgomvandlingen stannar i
 * widgeten: den är en illustration av hur talet upplevs och har ingenting att
 * göra med det en agent frågar efter.
 */

export type KelvinNote = {
  /** Övre gräns för intervallet, i kelvin. */
  max: number;
  name: string;
  use: string;
};

export const KELVIN_NOTES: KelvinNote[] = [
  { max: 2300, name: "Levandeljus", use: "Stämning på kvällen. Nästan orange." },
  {
    max: 2900,
    name: "Varmvitt",
    use: "Motsvarar en gammal glödlampa. Vardagsrum och sovrum.",
  },
  {
    max: 3500,
    name: "Varmt neutralt",
    use: "Kök och hall. Vaket utan att bli kyligt.",
  },
  {
    max: 4600,
    name: "Neutralvitt",
    use: "Arbetsrum och badrum. Här börjar det kännas som kontor.",
  },
  {
    max: 5600,
    name: "Kallvitt",
    use: "Garage och tvättstuga. Sällan trivsamt i vardagsrummet.",
  },
  {
    max: 6500,
    name: "Dagsljus",
    use: "Morgonljus som väcker. Obehagligt på kvällen.",
  },
];

export const KELVIN_MIN = 2000;
export const KELVIN_MAX = 6500;

export function kelvinNote(kelvin: number): KelvinNote {
  return (
    KELVIN_NOTES.find((n) => kelvin <= n.max) ??
    KELVIN_NOTES[KELVIN_NOTES.length - 1]
  );
}

/**
 * Rummets rimliga färgtemperatur, för den som frågar åt andra hållet.
 *
 * Rummen är desamma som lumenräknarens, så att de två verktygen svarar om samma
 * hem. Talen är mitten av det intervall som noteringen ovan beskriver, inte ett
 * spann: den som frågar "vilken kelvin ska jag ha i sovrummet" vill ha ett tal
 * att skriva in i appen.
 */
export const KELVIN_BY_ROOM: Record<string, number> = {
  vardagsrum: 2700,
  kok: 3000,
  sovrum: 2700,
  arbetsrum: 4000,
  badrum: 4000,
  hall: 3000,
};
