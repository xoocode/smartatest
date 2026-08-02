/**
 * Rättelselogg.
 *
 * ## Varför den finns
 *
 * `/sa-testar-vi` lovar: "Rättar vi något som påverkar en placering skriver vi
 * ut att det gjorts och när." Utan den här listan fanns det ingenstans att
 * göra det, alltså ett löfte sajten inte kunde hålla. En sajt som utlovar
 * publicerade rättelser och saknar rättelsesida gör ett påstående den inte kan
 * infria, vilket är precis den sortens sak resten av sajten går ut på att
 * undvika.
 *
 * ## Vad som hör hemma här
 *
 * Sakfel som en läsare kunde ha fattat ett beslut på. Ett pris som ändrats av
 * sig självt är ingen rättelse, det är en prisuppdatering och syns på
 * datumstämpeln. Ett felaktigt mätvärde, en produkt som fått fel betyg, en
 * källa vi återgett fel eller en placering som ändrats är rättelser.
 *
 * ## Stavfel loggas inte
 *
 * En logg full av kommatecken döljer de rättelser som betyder något. Skriv upp
 * det som ändrade innebörden.
 *
 * ## Håll ordningen
 *
 * Nyast först. `date` är ISO, `changed` beskriver vad som faktiskt ändrades i
 * sak, inte vilken fil som rörts.
 */

export type Correction = {
  /** ISO-datum för rättelsen. */
  date: string;
  /** Sidan som rättats. Intern sökväg. */
  href: string;
  /** Sidans namn, för den som läser loggen utan att klicka. */
  page: string;
  /** Vad som stod fel och vad som står nu. */
  changed: string;
  /** Om placeringar eller betyg påverkades. Styr märkningen i listan. */
  affectedRanking?: boolean;
  /** Vem som påpekade det, när någon utifrån gjorde det. */
  reportedBy?: string;
};

export const CORRECTIONS: Correction[] = [];

/** Nyast först, oavsett hur listan råkar vara skriven. */
export function sortedCorrections(): Correction[] {
  return [...CORRECTIONS].sort((a, b) => b.date.localeCompare(a.date));
}
