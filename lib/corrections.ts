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

export const CORRECTIONS: Correction[] = [
  {
    date: "2026-08-05",
    href: "/luftkvalitetsmatare",
    page: "Luftkvalitetsmätare",
    changed:
      "Vi angav att Airthings View Radon och Wave Mini inte publicerar någon noggrannhet. Båda gör det. Airthings anger för View Radon en precision på omkring 5 procent efter två månader vid 200 Bq/m³, plus ±0,5 grader för temperatur och ±3 procent för fukt, och för Wave Mini ±1 grad och ±3 procent. Uppgifterna står på tillverkarens egna produktsidor. Betyget för angiven noggrannhet höjs från 3,5 till 4,5 för View Radon och från 2,5 till 3,0 för Wave Mini. Ordningen mellan produkterna påverkas inte. Samtidigt ströks påståendet att Netatmos tolerans inte står någonstans: den sidan hos Netatmo som skulle kunna innehålla den ligger bakom en botkontroll och har inte gått att läsa, vilket är något annat än att uppgiften saknas.",
    affectedRanking: false,
  },
  {
    date: "2026-08-05",
    href: "/hemlarm",
    page: "Hemlarm",
    changed:
      "Vi skrev att Gardio inte publicerar något pris någonstans på sin sajt. Det stämde inte. Gardio anger 249 kronor i månaden, ingen startavgift och 24 månaders bindningstid på produktsidan för sitt hemlarm, och samtliga elva produkter i deras butik har pris. Felet uppstod genom att vi läste bolagets förstasida och drog en slutsats om hela sajten. Uppgifterna är nu rättade, och Gardio går från 2,0 till 5,0 på öppna villkor och från 2,5 till 4,5 på prisvärde, vilket flyttar bolaget från nedre halvan till toppen av jämförelsen.",
    affectedRanking: true,
    /* Ingen `reportedBy`. Felet hittades internt, och att skriva "en läsare"
       hade varit ett litet påhitt i en logg vars enda uppgift är att inte
       innehålla några. */
  },
];

/** Nyast först, oavsett hur listan råkar vara skriven. */
export function sortedCorrections(): Correction[] {
  return [...CORRECTIONS].sort((a, b) => b.date.localeCompare(a.date));
}
