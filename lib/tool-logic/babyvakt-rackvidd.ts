/**
 * Räckvidden på kartongen omräknad till räckvidd i en bostad.
 *
 * ## Varför verktyget finns
 *
 * Varje babyvakt anger sin räckvidd i fri sikt, alltså utomhus utan hinder, och
 * det är därför en apparat avsedd för en trerumslägenhet står angiven till
 * 800 meter. Talet är riktigt och obrukbart: ingen använder en babyvakt över en
 * åker.
 *
 * ## Var kvoten kommer ifrån
 *
 * Fyra tillverkare publicerar båda talen, och de är påfallande överens:
 *
 * | Produkt | Inomhus | Fri sikt | Kvot | Källa |
 * |---|---|---|---|---|
 * | Motorola PIP10 | 160 ft = 49 m | 1 000 ft = 305 m | 6,2 | tillverkarens manual |
 * | Philips Avent SCD892 | 50 m | 300 m | 6,0 | tillverkarens manual |
 * | VTech DM1212 | 75 m | 460 m | 6,1 | butikens produktsida |
 * | Alecto videobabyvakt | 50 m | 300 m | 6,0 | Kjells produktlista |
 *
 * Snittet är 6,08 och spannet 6,0 till 6,2, hos fyra fabrikat som inte har
 * något med varandra att göra. Vi räknar med 6 jämnt, eftersom det är ett tal
 * läsaren kan göra i huvudet framför hyllan och eftersom en tredje decimal
 * skulle låtsas om en precision de fyra uppgifterna inte bär.
 *
 * ## ⚠️ Talen är tillverkarnas uppgifter, inte mätvärden
 *
 * Ingen oberoende provning har mätt räckvidd i svenska bostäder. Ingen av de
 * fyra tillverkarna anger heller vilken sorts vägg de mätt genom. Verktyget
 * säger därför aldrig att en apparat *når* en viss sträcka, bara vad
 * tillverkarens eget frisiktstal motsvarar med den kvot tillverkarna själva
 * publicerar.
 *
 * Byggmaterialet spär på osäkerheten åt ett håll vi kan namnge men inte mäta:
 * betongbjälklag och plåtreglar dämpar mer än gips och trä. Därför är
 * `BUILD_FACTORS` en grov nedskrivning och redovisas som en marginal, aldrig
 * som ett andra mätvärde.
 */

/** Kvoten mellan frisiktstalet och inomhustalet, hos de fyra som anger båda. */
export const LINE_OF_SIGHT_DIVISOR = 6;

/** De fyra publicerade paren som kvoten vilar på. */
export const PUBLISHED_PAIRS = [
  { product: "Motorola PIP10", indoor: 49, lineOfSight: 305 },
  { product: "Philips Avent SCD892", indoor: 50, lineOfSight: 300 },
  { product: "VTech DM1212", indoor: 75, lineOfSight: 460 },
  { product: "Alecto videobabyvakt", indoor: 50, lineOfSight: 300 },
] as const;

/**
 * Grov nedskrivning för vad väggarna är gjorda av.
 *
 * Faktorerna är en marginal och inte en mätning. `latt` är utgångsläget, alltså
 * kvoten rakt av, eftersom tillverkarnas egna prov rimligen gjorts i kontor
 * eller normalbostad snarare än i en betongkällare.
 */
export const BUILD_FACTORS = [
  {
    key: "latt",
    label: "Gips och trä",
    hint: "Nybyggd villa, radhus, lätta innerväggar",
    factor: 1,
  },
  {
    key: "blandat",
    label: "Blandat",
    hint: "Lägenhet med betongbjälklag mellan våningarna",
    factor: 0.7,
  },
  {
    key: "tungt",
    label: "Betong och plåt",
    hint: "Källare, souterräng, tegel, plåtreglar",
    factor: 0.45,
  },
] as const;

export type BuildKey = (typeof BUILD_FACTORS)[number]["key"];

export type RangeEstimate = {
  /** Talet användaren skrev in, sanerat. */
  lineOfSight: number;
  /** Frisiktstalet delat med kvoten, före byggnadsavdrag. */
  indoorBase: number;
  /** Efter byggnadsavdrag. Det tal verktyget visar. */
  indoor: number;
  build: (typeof BUILD_FACTORS)[number];
};

export function buildFactor(key: string) {
  return BUILD_FACTORS.find((b) => b.key === key) ?? BUILD_FACTORS[0];
}

/**
 * Räkna om ett frisiktstal till en inomhusräckvidd.
 *
 * Avrundar till närmaste fem meter. Ett svar på "132,4 meter" påstår en
 * noggrannhet fyra publicerade uppgifter inte kan bära.
 */
export function indoorRange(
  lineOfSightMetres: number,
  buildKey: string = "latt",
): RangeEstimate {
  const build = buildFactor(buildKey);
  const los =
    Number.isFinite(lineOfSightMetres) && lineOfSightMetres > 0
      ? Math.min(lineOfSightMetres, 5000)
      : 0;

  const base = los / LINE_OF_SIGHT_DIVISOR;
  const adjusted = base * build.factor;

  return {
    lineOfSight: los,
    indoorBase: Math.round(base / 5) * 5,
    indoor: Math.round(adjusted / 5) * 5,
    build,
  };
}

/**
 * Vad sträckan räcker till, i något läsaren kan känna igen.
 *
 * Avstånden är grova hushållsavstånd och inte normerade mått. De finns för att
 * ett metertal säger lite för den som inte gått och mätt i sin egen bostad.
 */
export function reachVerdict(indoorMetres: number): string {
  if (indoorMetres <= 0) return "Skriv in tillverkarens metertal.";
  if (indoorMetres < 15)
    return "Räcker inom samma våning i en mindre lägenhet, men knappast längre.";
  if (indoorMetres < 40)
    return "Räcker genom en normal trea eller fyra, och en våning upp.";
  if (indoorMetres < 90)
    return "Räcker genom ett hus i två plan och ut på altanen.";
  if (indoorMetres < 160)
    return "Räcker genom huset och ut i garaget eller tvättstugan.";
  return "Räcker genom huset och över hela tomten på en villagata.";
}
