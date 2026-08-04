/**
 * Klarar en smart plugg lasten, och vilken kapsling krävs på platsen?
 *
 * Kraven lämnas som `needsAmp` och `needsOutdoor`. Produkturvalet görs i
 * widgeten, som har produkterna. Den här modulen har dem inte.
 */

/** Vanliga svenska laster med typisk märkeffekt i watt. */
export const PLUG_LOADS = [
  { key: "belysning", label: "Lampa eller julbelysning", watt: 50, inductive: false },
  { key: "media", label: "TV eller router", watt: 150, inductive: false },
  { key: "kaffe", label: "Kaffebryggare", watt: 1000, inductive: false },
  { key: "motorvarmare", label: "Motorvärmare", watt: 600, inductive: false },
  { key: "element", label: "Element eller värmefläkt", watt: 2000, inductive: false },
  { key: "vattenkokare", label: "Vattenkokare eller torkskåp", watt: 2200, inductive: false },
  { key: "motor", label: "Pump, fläkt eller kyl", watt: 400, inductive: true },
  { key: "eget", label: "Annat, jag vet effekten", watt: 0, inductive: false },
] as const;

export const PLUG_PLACES = [
  { key: "inne", label: "Inomhus, uppvärmt" },
  { key: "garage", label: "Garage eller krypgrund" },
  { key: "ute", label: "Utomhus" },
] as const;

export type PlugLoadKey = (typeof PLUG_LOADS)[number]["key"];
export type PlugPlaceKey = (typeof PLUG_PLACES)[number]["key"];

/** 16 A-pluggar är märkta 3 680 W, 10 A-pluggar 2 300 W. */
export const AMP_16_W = 3680;
export const AMP_10_W = 2300;
/** Påslag på märkeffekten. En apparat som står på i timmar vill ha marginal. */
export const MARGIN = 1.2;

export type PlugLoadVerdict = {
  amp: string;
  ip: string;
  temp: string;
  why: string;
  warning?: string;
  /**
   * Kraven i maskinläsbar form, så att produktförslaget filtreras på exakt
   * samma tal som texten visar. Null betyder att inget förslag ska visas,
   * antingen för att effekten saknas eller för att ingen plugg räcker.
   */
  needsAmp: number | null;
  needsOutdoor: boolean;
};

export function decidePlugLoad(
  load: PlugLoadKey | null,
  place: PlugPlaceKey | null,
  ownWatt: number,
): PlugLoadVerdict | null {
  if (!load || !place) return null;

  const spec = PLUG_LOADS.find((l) => l.key === load);
  if (!spec) return null;

  const watt = load === "eget" ? Math.max(0, ownWatt) : spec.watt;
  const needed = Math.round(watt * MARGIN);

  /* Induktiv last kräver 16 A oavsett märkeffekt: startströmmen ligger långt
     över den siffra som står på apparaten och syns inte i märkningen. */
  const needsSixteen = spec.inductive || needed > AMP_10_W;

  const outdoors = place === "ute";
  const cold = place !== "inne";

  const verdict: PlugLoadVerdict = {
    needsAmp: needsSixteen ? 16 : Math.max(10, Math.ceil(needed / 230)),
    needsOutdoor: cold,
    amp: needsSixteen
      ? `16 A (3 680 W)`
      : `10 A (2 300 W) räcker, 16 A ger marginal`,
    ip: cold ? "Minst IP44" : "Inomhusklassad räcker (IP20)",
    temp: outdoors
      ? "Kontrollera drifttemperaturen, helst ner till −25 °C"
      : cold
        ? "Kontrollera drifttemperaturen, minst −20 °C"
        : "Ingen särskild drifttemperatur behövs",
    why: spec.inductive
      ? `${spec.label} innehåller en motor eller kompressor. Märkeffekten på runt ${watt} W säger inte hela sanningen, för startströmmen ligger under någon sekund flera gånger högre. Ta därför 16 A även om siffran ser låg ut.`
      : `${watt} W plus tjugo procent marginal blir ${needed} W. ${
          needsSixteen
            ? "Det passerar gränsen för en 10 A-plugg, så du behöver en märkt för 16 A."
            : "Det ryms med god marginal i en plugg märkt för 10 A."
        }`,
  };

  if (watt <= 0) {
    return {
      ...verdict,
      needsAmp: null,
      amp: "Ange effekten först",
      why: "Skriv in apparatens effekt i watt. Den står oftast på en dekal på baksidan eller undersidan, ibland som ampere i stället, och då är effekten ampere gånger 230.",
    };
  }

  if (watt > AMP_16_W) {
    return {
      ...verdict,
      needsAmp: null,
      amp: "Ingen smart plug räcker",
      warning: `${watt} W ligger över vad ett vanligt vägguttag är säkrat för. Det här ska inte lösas med en adapter i uttaget utan med fast installation, utförd av ett registrerat elinstallationsföretag.`,
    };
  }

  if (outdoors) {
    verdict.warning =
      "Ett uttag utomhus ska sitta i en jordfelsbrytarskyddad krets. En inomhusplugg i en ytterdosa är inte samma sak som en plugg byggd för utomhusbruk.";
  }

  return verdict;
}
