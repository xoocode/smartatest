/**
 * Glödlampans watt mot det ljusflöde en LED behöver för att ersätta den.
 *
 * Watt mäter hur mycket ström lampan drar, inte hur mycket den lyser. Hela
 * poängen med tabellen är att det sambandet försvann när glödlampan gjorde det.
 */

export const WATT_LUMEN_ROWS = [
  { watt: 25, lumen: 220, use: "Dekorationslampa, nattlampa" },
  { watt: 40, lumen: 470, use: "Sänglampa, mindre bordslampa" },
  { watt: 60, lumen: 806, use: "Vanligast av alla. Taklampa i sovrum" },
  { watt: 75, lumen: 1055, use: "Vardagsrum, större bordslampa" },
  { watt: 100, lumen: 1521, use: "Kök, arbetsrum, mörka rum" },
  { watt: 150, lumen: 2452, use: "Garage, tvättstuga, verkstad" },
] as const;

export type WattLumenRow = (typeof WATT_LUMEN_ROWS)[number];

/**
 * Närmaste rad för ett antal watt.
 *
 * Tabellen är en uppslagning och inte en formel, eftersom värdena är de
 * etablerade motsvarigheterna och inte en linjär omräkning. En fråga om 65 W
 * ska landa på 60-raden, inte på ett interpolerat tal ingen förpackning anger.
 */
export function nearestWattRow(watt: number): WattLumenRow {
  if (!Number.isFinite(watt)) return WATT_LUMEN_ROWS[2];

  return WATT_LUMEN_ROWS.reduce((best, row) =>
    Math.abs(row.watt - watt) < Math.abs(best.watt - watt) ? row : best,
  );
}
