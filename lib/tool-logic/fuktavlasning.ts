/**
 * Vad betyder talet på hygrometern?
 *
 * ## Varför verktyget finns
 *
 * Sidans fynd är att avvikelsen aldrig trycks på förpackningen. Fyndet är
 * dött om läsaren inte kan använda det, och det här är stället där det blir
 * användbart: läsaren har redan en mätare och ett tal på displayen, och
 * frågan är om talet räcker för att avgöra något.
 *
 * Verktyget räknar avläsningen plus toleransen till ett spann, och jämför
 * spannet mot de tre gränser som avgör vad man ska göra. Ligger spannet över
 * en gräns i ena änden och under i den andra kan avläsningen inte avgöra
 * saken, och då säger verktyget det i stället för att ge ett råd som talet
 * inte bär.
 *
 * ## Var gränserna kommer ifrån
 *
 * `GRANSER` är hämtade och inget vi räknat fram själva:
 *
 * - **45 %**: Folkhälsomyndighetens allmänna råd FoHMFS 2014:14 anger 7 g
 *   vatten/kg torr luft under eldningssäsongen, vilket motsvarar cirka 45 %
 *   relativ luftfuktighet vid 21 °C, som en indikation som kan få
 *   tillsynsmyndigheten att kräva undersökning av byggnaden.
 * - **50 %**: SweSIAQ anger att kvalstertillväxt kan börja i rumstemperatur
 *   redan över 45 till 50 %. Vi använder den övre änden.
 * - **60 %**: mögelrisk vid varaktigt högre fukt.
 *
 * ⚠️ Allmänna råd är rekommendationer och inte bindande regler, vilket
 * författningssamlingen själv skriver ut. 45 procent är en indikation och
 * inget gränsvärde. Verktyget säger aldrig att något är olagligt eller farligt.
 *
 * ## ⚠️ Toleranserna är utfästelser, inte mätvärden
 *
 * `TOLERANSER` speglar vad tillverkarna anger, plus ett val för den som inte
 * hittar någon uppgift. Det sista valet är det vanligaste fallet: elva av de
 * tretton produkter vi kartlagt anger ingenting. Verktyget gissar då inte åt
 * tillverkaren utan räknar på ± 5 procentenheter och skriver ut att talet är
 * ett antagande, eftersom ett spann som ser exakt ut vore värre än inget.
 */

/** Gränser där det finns skäl att göra något, med källa. */
export const GRANSER = [
  {
    varde: 45,
    namn: "Folkhälsomyndighetens indikation",
    kalla: "FoHMFS 2014:14, cirka 45 % vid 21 °C",
  },
  {
    varde: 50,
    namn: "kvalstergränsen",
    kalla: "SweSIAQ, tillväxt kan börja över 45 till 50 %",
  },
  {
    varde: 60,
    namn: "mögelrisken",
    kalla: "varaktigt över 60 % gynnar mögel",
  },
] as const;

/**
 * Toleranser läsaren kan välja mellan.
 *
 * `antagen: true` betyder att talet är vårt och inte tillverkarens, och det
 * ska synas i svaret.
 */
export const TOLERANSER = [
  { key: "pm3", label: "± 3 procentenheter", pe: 3, antagen: false },
  { key: "pm5", label: "± 5 procentenheter", pe: 5, antagen: false },
  { key: "pm8", label: "± 8 procentenheter", pe: 8, antagen: false },
  { key: "okand", label: "Står inte någonstans", pe: 5, antagen: true },
] as const;

export type ToleransKey = (typeof TOLERANSER)[number]["key"];

export type Avlasning = {
  /** Lägsta och högsta verkliga värde avläsningen tillåter. */
  lagsta: number;
  hogsta: number;
  /** Toleransen som användes, i procentenheter. */
  pe: number;
  /** Är toleransen vårt antagande i stället för tillverkarens uppgift? */
  antagen: boolean;
  rubrik: string;
  text: string;
  /** Gränser som spannet ligger över i ena änden och under i den andra. */
  oavgjorda: { varde: number; namn: string; kalla: string }[];
  /** Gränser hela spannet ligger över. */
  passerade: { varde: number; namn: string; kalla: string }[];
  varning?: string;
};

export function tolkaAvlasning(
  avlast: number | null,
  tolerans: ToleransKey | null,
): Avlasning | null {
  if (avlast === null || !tolerans) return null;
  if (!Number.isFinite(avlast) || avlast < 0 || avlast > 100) return null;

  const vald = TOLERANSER.find((t) => t.key === tolerans);
  if (!vald) return null;

  const lagsta = Math.max(0, avlast - vald.pe);
  const hogsta = Math.min(100, avlast + vald.pe);

  const oavgjorda = GRANSER.filter((g) => lagsta < g.varde && hogsta > g.varde).map((g) => ({
    ...g,
  }));
  const passerade = GRANSER.filter((g) => lagsta >= g.varde).map((g) => ({ ...g }));

  const spann = `${lagsta} till ${hogsta} procent`;

  let rubrik: string;
  let text: string;

  if (hogsta < 45) {
    rubrik = "Under samtliga gränser";
    text = `Avläsningen betyder att den verkliga fuktigheten ligger någonstans mellan ${spann}. Hela spannet ligger under 45 procent, så ingen av de tre gränserna är aktuell. Det finns inget svenskt riktvärde som säger att det här är för torrt: Folkhälsomyndighetens allmänna råd innehåller ingen nedre gräns alls.`;
  } else if (lagsta >= 60) {
    rubrik = "Över mögelrisken, oavsett mätfel";
    text = `Den verkliga fuktigheten ligger mellan ${spann}. Även i den lägsta änden är du över 60 procent, så toleransen spelar ingen roll för slutsatsen. Varaktigt över 60 procent gynnar mögel, och det här är ett värde att göra något åt.`;
  } else if (oavgjorda.length > 0) {
    const namn = oavgjorda.map((g) => `${g.varde} procent`);
    const uppraknade =
      namn.length === 1 ? namn[0] : `${namn.slice(0, -1).join(", ")} och ${namn.at(-1)}`;
    rubrik =
      oavgjorda.length === 1
        ? "Avläsningen räcker inte för att avgöra saken"
        : "Avläsningen lämnar flera frågor öppna";
    text = `Med ± ${vald.pe} procentenheter betyder talet att den verkliga fuktigheten ligger mellan ${spann}. Det spannet ligger över ${uppraknade} i ena änden och under i den andra. Mätaren kan alltså inte tala om vilken sida av gränsen du står på.`;
  } else {
    rubrik = "Över de lägre gränserna, under mögelrisken";
    text = `Den verkliga fuktigheten ligger mellan ${spann}. Hela spannet ligger över de lägre gränserna men under 60 procent, så mögelrisken är inte aktuell. Sänkt temperatur och bättre ventilation är de åtgärder som inte kostar något.`;
  }

  const varning = vald.antagen
    ? `Tillverkaren anger ingen tolerans, så spannet ovan är räknat på ± 5 procentenheter. Det talet är vårt antagande och inte en uppgift om just din mätare. Elva av de tretton mätare vi jämfört anger ingenting alls.`
    : undefined;

  return {
    lagsta,
    hogsta,
    pe: vald.pe,
    antagen: vald.antagen,
    rubrik,
    text,
    oavgjorda,
    passerade,
    varning,
  };
}
