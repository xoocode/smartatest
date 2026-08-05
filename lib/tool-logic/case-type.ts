/**
 * Vilken sorts iPhone-skal som räcker, utifrån var telefonen är, hur den laddas
 * och vad som ska synas.
 *
 * Kraven lämnas som `needsCorners`, `needsCameraCover`, `needsMagnetRing` och
 * `wantsFinish`. Produkturvalet görs i widgeten, precis som i leak-sensor.ts.
 *
 * ## Varför just de tre frågorna
 *
 * De motsvarar de tre saker som faktiskt skiljer skalen åt i jämförelsen, och
 * ingen av dem går att läsa av priset:
 *
 * 1. **Hörnen.** En telefon som faller landar nästan aldrig platt, så
 *    förstärkta hörn är det som avgör om skalet gör något vid ett fall. Ett
 *    hårt skal utan mjuk ram överför i stället stöten rakt in i ramen.
 * 2. **Kamerakanten.** Linserna repas av sand och nycklar i en ficka långt
 *    oftare än de spricker av ett fall, och ett skal utan förhöjd kant runt
 *    kameran skyddar dem inte alls.
 * 3. **Magnetringen.** Kategorins dyraste förväxling. Ett skal utan ring gör
 *    att laddare, plånbok och bilhållare slutar sitta fast, och det går inte
 *    att lägga till i efterhand.
 *
 * ⚠️ Verktyget frågar aldrig efter fallhöjd eller militärstandard, och det är
 * ett medvetet val. De talen är tillverkarnas egna, de går enligt MIL-STD-810
 * del ett §1.2 b inte att jämföra mellan tillverkare, och att låta en läsare
 * välja på dem vore att bygga in ett mått vi själva underkänt. Se
 * lib/spec-schema.mjs, ALDRIG_BEDOMD.
 */

export const CASE_USES = [
  { key: "ute", label: "I handen utomhus" },
  { key: "ficka", label: "I ficka eller väska" },
  { key: "hemma", label: "Mest hemma och på skrivbordet" },
] as const;

export const CASE_CHARGING = [
  { key: "magnet", label: "Trådlöst, med magnet" },
  { key: "sladd", label: "Med sladd" },
] as const;

export const CASE_LOOKS = [
  { key: "klar", label: "Telefonens färg ska synas" },
  { key: "matt", label: "Hellre matt eller läder" },
  { key: "egal", label: "Spelar ingen roll" },
] as const;

export type CaseUseKey = (typeof CASE_USES)[number]["key"];
export type CaseChargingKey = (typeof CASE_CHARGING)[number]["key"];
export type CaseLookKey = (typeof CASE_LOOKS)[number]["key"];

/** Ytan ett skal har. `robust` är matt men bygger mer än ett tunt mattskal. */
export type CaseFinish = "klar" | "matt" | "lader" | "robust";

export type CaseVerdict = {
  headline: string;
  why: string;
  warning?: string;
  /** Förstärkta hörn eller Air Cushion krävs. */
  needsCorners: boolean;
  /** Kanten runt kameran måste vara högre än linserna. */
  needsCameraCover: boolean;
  /** Magnetring krävs, alltså inte bara en metallplatta. */
  needsMagnetRing: boolean;
  /** Ytor som får föreslås, eller null när allt duger. */
  wantsFinish: CaseFinish[] | null;
};

export function decideCaseType(
  use: CaseUseKey | null,
  charging: CaseChargingKey | null,
  look: CaseLookKey | null,
): CaseVerdict | null {
  if (!use || !charging || !look) return null;

  const needsCorners = use === "ute";
  const needsCameraCover = use === "ute" || use === "ficka";
  const needsMagnetRing = charging === "magnet";
  const wantsFinish: CaseFinish[] | null =
    look === "klar"
      ? ["klar"]
      : look === "matt"
        ? ["matt", "lader", "robust"]
        : null;

  const useNote =
    use === "ute"
      ? "Med telefonen i handen utomhus faller den mot asfalt och sten, och den landar på ett hörn. Då är förstärkta hörn eller Air Cushion det enda som gör verklig skillnad, för det är där energin tas upp."
      : use === "ficka"
        ? "I en ficka eller väska är det inte fallet som skadar telefonen utan sanden och nycklarna. Den vanligaste och dyraste skadan blir en repa i kameraglaset, och den hindras bara av en kant som är högre än linserna."
        : "Ligger telefonen mest på ett skrivbord är risken låg och du behöver inget tjockt skal. Det som ändå är värt en kant är kameran, eftersom telefonen läggs ner med skärmen uppåt flera gånger om dagen.";

  const chargeNote = needsMagnetRing
    ? " Laddar du magnetiskt måste skalet ha en riktig magnetring. En inbyggd metallplatta sitter fast på en bilhållare men laddar ingenting, och en laddare faller av."
    : " Laddar du med sladd kan du bortse från magneterna helt, och då blir flera av de billigaste skalen fullt användbara.";

  if (use === "ute") {
    return {
      needsCorners,
      needsCameraCover,
      needsMagnetRing,
      wantsFinish,
      headline: "Ett hybridskal med förstärkta hörn",
      why: `${useNote}${chargeNote}`,
      warning:
        "Ett skal i enbart hård plast känns robust i handen och är sämre skydd än en hybrid, eftersom det inte ger efter och därför för stöten vidare in i telefonens ram.",
    };
  }

  if (use === "ficka") {
    return {
      needsCorners,
      needsCameraCover,
      needsMagnetRing,
      wantsFinish,
      headline: "Ett tunt skal med kant runt kameran",
      why: `${useNote}${chargeNote}`,
      warning:
        "Titta på produktbilden från sidan innan du köper. Sticker linserna upp över skalet gör kanten ingen nytta, och det syns inte i specifikationen.",
    };
  }

  return {
    needsCorners,
    needsCameraCover,
    needsMagnetRing,
    wantsFinish,
    headline: "Det billigaste skalet räcker",
    why: `${useNote}${chargeNote}`,
    warning:
      "Ett genomskinligt skal gulnar av solljus och handfett oavsett pris, så räkna med att byta det efter ett år eller två. Ett matt eller frostat skal slipper det.",
  };
}
