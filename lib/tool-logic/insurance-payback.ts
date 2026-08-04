/**
 * Återbetalningstid på en vattenfelsbrytare genom försäkringsrabatten.
 *
 * Räkningen svarar oftast **nej**, och det är hela poängen. Tio procent av en
 * normal villapremie är några hundralappar om året mot en installation på
 * 6 000 till 10 000 kronor, alltså tjugo år eller mer. En jämförelsesajt som
 * bara säger ja säljer inget förtroende.
 */

/** Rabatten hos både Länsförsäkringar och Folksam, kontrollerat 2026-08-02. */
export const DEFAULT_DISCOUNT = 10;
/** Mitten av Länsförsäkringars eget spann 6 000–10 000 kr installerad. */
export const DEFAULT_COST = 8000;
/** Vattenskadecentrums spann för självrisk per skada. */
export const EXCESS_LOW = 3440;
export const EXCESS_HIGH = 10000;

export type Payback = {
  /** Rabatt i kronor per år. */
  yearly: number;
  /** Antal år, eller `Infinity` när rabatten är noll. */
  years: number;
  verdict: string;
};

export function insurancePayback(
  premium: number,
  discountPercent: number,
  cost: number,
): Payback {
  /* NaN när fältet är tomt mitt i en inmatning. Noll i stället för NaN, annars
     skriver resultatet "NaN kr" medan användaren håller på att skriva. */
  const safe = (n: number) => (Number.isFinite(n) ? n : 0);

  const yearly = (safe(premium) * safe(discountPercent)) / 100;
  const years = yearly > 0 ? safe(cost) / yearly : Infinity;

  const verdict =
    years === Infinity
      ? "Fyll i din premie för att se återbetalningstiden."
      : years <= 10
        ? "Rabatten ensam betalar installationen inom tio år, vilket är ovanligt bra i den här kategorin."
        : years <= 25
          ? "Rabatten ensam räcker inte som skäl. Den betalar installationen först på lång sikt, så köpet ska motiveras av skyddet och inte av premien."
          : "Rabatten betalar aldrig installationen inom rimlig tid. Räkna på skyddet i stället, alltså på vad en undviken skada är värd.";

  return { yearly, years, verdict };
}
