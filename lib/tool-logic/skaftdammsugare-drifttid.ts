/**
 * Drifttiden på kartongen omräknad till drifttid i det läge du städar i.
 *
 * ## Varför verktyget finns
 *
 * Varje skaftdammsugare marknadsförs på ett minuttal, och talet är uppmätt i
 * det svagaste läget. Hos flera tillverkare dessutom med ett tillbehör som
 * saknar motor, alltså utan den roterande borste som är hela skälet att köpa en
 * skaftdammsugare i stället för en slang.
 *
 * ## Var kvoten kommer ifrån
 *
 * Fem av åtta tillverkare publicerar både ekotalet och turbotalet för samma
 * maskin och samma batteri:
 *
 * | Produkt | Ekoläge | Turboläge | Kvot | Källa |
 * |---|---|---|---|---|
 * | Bosch Unlimited 10 | 80 min | 11 min | 0,14 | tillverkarens datablad |
 * | Philips 5000 Series | 60 min | 15 min | 0,25 | tillverkarens produktsida |
 * | Electrolux Animal 700 | 40 min | 10 min | 0,25 | butikens specifikation |
 * | Electrolux Clean 500 | 45 min | 13 min | 0,29 | butikens specifikation |
 * | Xiaomi G20 Lite | 45 min | 15 min | 0,33 | butikens specifikation |
 *
 * Medianen är 0,25, alltså en fjärdedel, och det är talet verktyget räknar
 * med. Boschs 0,14 drar nedåt och Xiaomis 0,33 uppåt, vilket är väntat: en
 * kraftigare motor tömmer ett batteri fortare i turboläge än en svagare gör.
 *
 * Autoläget vilar på två uppgifter, Bosch 25 av 80 och Electrolux Animal 700
 * 20 av 40, alltså 0,31 och 0,50. Vi räknar med 0,4 och redovisar att
 * underlaget är två maskiner.
 *
 * ## Var ytan per minut kommer ifrån
 *
 * Två tillverkare publicerar hur stor yta en laddning räcker till, och de är
 * överens: Dreame anger 300 kvadratmeter på 90 minuter i ekoläge, alltså 3,3
 * kvadratmeter i minuten, och Philips anger mer än 195 kvadratmeter på 60
 * minuter, alltså 3,25.
 *
 * ## ⚠️ Talen är tillverkarnas uppgifter, inte mätvärden
 *
 * Vi har inte kört någon av maskinerna. Kvoten är hämtad ur de fem tillverkare
 * som publicerar båda talen, och ytan per minut ur de två som publicerar den.
 * Råd & Rön mätte sju minuter till en kvart vid maximal effekt för de
 * skaftdammsugare som toppar deras test av 65 modeller, vilket ligger i samma
 * härad som kvoten ger.
 */

/** Andel av ekotalet som återstår i varje läge, ur de publicerade paren. */
export const MODES = [
  {
    key: "eko",
    label: "Ekoläge",
    hint: "Hårt golv, lite damm, borsten på lägsta varv",
    factor: 1,
  },
  {
    key: "auto",
    label: "Autoläge",
    hint: "Blandat golv, maskinen väljer själv",
    factor: 0.4,
  },
  {
    key: "turbo",
    label: "Turboläge",
    hint: "Matta, djurhår, damm i golvspringor",
    factor: 0.25,
  },
] as const;

export type ModeKey = (typeof MODES)[number]["key"];

/** De fem publicerade paren som kvoten vilar på. */
export const PUBLISHED_PAIRS = [
  { product: "Bosch Unlimited 10", eco: 80, turbo: 11 },
  { product: "Philips 5000 Series", eco: 60, turbo: 15 },
  { product: "Electrolux Animal 700", eco: 40, turbo: 10 },
  { product: "Electrolux Clean 500", eco: 45, turbo: 13 },
  { product: "Xiaomi G20 Lite", eco: 45, turbo: 15 },
] as const;

/** Kvadratmeter per minut i ekoläge, ur Dreames och Philips egna tal. */
export const SQM_PER_MINUTE = 3.3;

export function mode(key: string) {
  return MODES.find((m) => m.key === key) ?? MODES[0];
}

export type RuntimeEstimate = {
  /** Talet användaren skrev in, sanerat. */
  stated: number;
  /** Minuter kvar i det valda läget. */
  minutes: number;
  /** Ungefärlig yta den tiden räcker till. */
  area: number;
  mode: (typeof MODES)[number];
};

/**
 * Räkna om ett ekotal till drifttid och yta i ett valt läge.
 *
 * Avrundar minuterna till hela och ytan till närmaste fem kvadratmeter. Ett
 * svar på "17,4 kvadratmeter" påstår en noggrannhet fem publicerade uppgifter
 * inte kan bära.
 */
export function runtimeInMode(
  statedMinutes: number,
  modeKey: string = "turbo",
): RuntimeEstimate {
  const m = mode(modeKey);
  const stated =
    Number.isFinite(statedMinutes) && statedMinutes > 0
      ? Math.min(statedMinutes, 240)
      : 0;

  const minutes = stated * m.factor;
  const area = minutes * SQM_PER_MINUTE;

  return {
    stated,
    minutes: Math.round(minutes),
    area: Math.round(area / 5) * 5,
    mode: m,
  };
}

/**
 * Vad ytan räcker till, i något läsaren kan känna igen.
 *
 * Bostadsstorlekarna är grova och inte normerade mått. De finns för att ett
 * kvadratmetertal säger lite för den som inte gått och mätt hemma.
 */
export function areaVerdict(area: number): string {
  if (area <= 0) return "Skriv in minuttalet tillverkaren anger.";
  if (area < 25)
    return "Räcker till ett rum, alltså köket eller vardagsrummet. Resten får vänta till nästa laddning.";
  if (area < 55)
    return "Räcker till en etta eller en liten tvåa på en laddning.";
  if (area < 90)
    return "Räcker till en normal trea. En fyra kräver att du laddar mellan.";
  if (area < 140)
    return "Räcker till en stor lägenhet eller ett radhus i ett plan.";
  return "Räcker till en villa i två plan på en laddning.";
}
