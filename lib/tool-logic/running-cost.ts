/**
 * Elkostnad per år för något som är på en del av dygnet och i viloläge resten.
 *
 * Samma räkning bär tre tool pages: lampor, smarta uttag och julbelysning.
 * Skillnaden dem emellan är utgångsvärden och etiketter, inte matematik.
 */

/**
 * Viloförbrukning för en smart lampa, i watt.
 *
 * 0,3 W är mitten av det spann oberoende mätningar rapporterar för wifi- och
 * zigbee-lampor, ungefär 0,2 till 0,5 W. Avsiktligt försiktigt: det finns ett
 * svenskt påstående om att viloläget står för 20 till 70 procent av en lampas
 * årsförbrukning, men källan svarar inte och vi bygger ingen rubriksiffra på
 * något vi inte kan kontrollera.
 */
export const STANDBY_W = 0.3;

/** Totalpris per kWh inklusive nätavgift, skatt och moms. */
export const DEFAULT_PRICE = 2;

export type RunningCostInput = {
  /** Antal enheter. */
  count: number;
  /** Timmar per dygn enheten drar `watt`. */
  hours: number;
  /** Effekt per enhet när den är på. */
  watt: number;
  /** Viloförbrukning per enhet. */
  standby: number;
  /** Elpris i kronor per kWh. */
  price: number;
};

export type RunningCost = {
  onKwh: number;
  standbyKwh: number;
  totalKwh: number;
  /** Viloläget som andel av förbrukningen, i procent. */
  standbyShare: number;
  onCost: number;
  standbyCost: number;
  totalCost: number;
};

export function runningCost(input: RunningCostInput): RunningCost {
  const n = (v: number, fallback = 0) => (Number.isFinite(v) ? v : fallback);

  const units = Math.max(0, n(input.count));
  const onHours = Math.min(24, Math.max(0, n(input.hours)));
  const w = Math.max(0, n(input.watt));
  const standbyW = Math.max(0, n(input.standby));
  const kwhPrice = Math.max(0, n(input.price));

  const onKwh = (units * w * onHours * 365) / 1000;
  /* Viloläget löper de timmar enheten *inte* är på. */
  const standbyKwh = (units * standbyW * (24 - onHours) * 365) / 1000;
  const totalKwh = onKwh + standbyKwh;

  return {
    onKwh,
    standbyKwh,
    totalKwh,
    standbyShare: totalKwh > 0 ? (standbyKwh / totalKwh) * 100 : 0,
    onCost: onKwh * kwhPrice,
    standbyCost: standbyKwh * kwhPrice,
    totalCost: totalKwh * kwhPrice,
  };
}
