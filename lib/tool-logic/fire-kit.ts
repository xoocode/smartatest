/**
 * Vad hemmet behöver i brandskydd: antal och storlekar.
 *
 * Utgår från räddningstjänsternas rekommendation: brandvarnare på varje
 * våningsplan, en sexkilos pulversläckare och en brandfilt.
 *
 * ## Varför planen inte känner till några produkter
 *
 * Widgeten visar billigaste produkt ur våra egna jämförelser bredvid varje rad.
 * Den kopplingen görs där, mot `key`. Planen räknar bara antal och skäl, vilket
 * gör att agentverktyget kan använda samma funktion utan att få med sig priser
 * och butiker in i ett svar som ska vara produktfritt.
 */

export const FIRE_HOMES = [
  { key: "lagenhet", label: "Lägenhet" },
  { key: "villa", label: "Villa eller radhus" },
  { key: "fritidshus", label: "Fritidshus" },
] as const;

export const FIRE_FLOORS = [
  { key: "ett", label: "Ett plan" },
  { key: "tva", label: "Två plan" },
  { key: "tre", label: "Tre eller fler" },
] as const;

export const FIRE_KITCHENS = [
  { key: "samma", label: "Samma plan som entrén" },
  { key: "annat", label: "Ett annat plan" },
] as const;

export type FireHomeKey = (typeof FIRE_HOMES)[number]["key"];
export type FireFloorKey = (typeof FIRE_FLOORS)[number]["key"];
export type FireKitchenKey = (typeof FIRE_KITCHENS)[number]["key"];

export const FLOOR_COUNT: Record<FireFloorKey, number> = {
  ett: 1,
  tva: 2,
  tre: 3,
};

/** Vilken sorts sak raden gäller. Widgeten slår upp produkten på nyckeln. */
export type FireKitKey =
  | "alarm"
  | "extinguisher"
  | "blanketLarge"
  | "blanketSmall";

export type FireKitLine = {
  key: FireKitKey;
  count: number;
  why: string;
};

export function fireKitPlan(
  home: FireHomeKey | null,
  floors: FireFloorKey | null,
  kitchen: FireKitchenKey | null,
): { lines: FireKitLine[]; note: string } | null {
  if (!home || !floors || !kitchen) return null;

  const levels = home === "lagenhet" ? 1 : FLOOR_COUNT[floors];

  const lines: FireKitLine[] = [
    {
      key: "alarm",
      count: levels,
      why:
        levels === 1
          ? "En brandvarnare är minimum i varje bostad."
          : `En per våningsplan, alltså ${levels} stycken. En brandvarnare två plan bort väcker ingen.`,
    },
    {
      key: "extinguisher",
      count: levels >= 2 ? levels : 1,
      why:
        levels >= 2
          ? "En per plan. En släckare du måste springa en trappa efter är en släckare du inte hinner hämta."
          : "En sexkilos räcker till en bostad. Mindre släckare tar slut på några sekunder.",
    },
    {
      key: "blanketLarge",
      count: 1,
      why: "Den storlek räddningstjänsterna rekommenderar, och den enda som räcker till en soffa eller en människa. Hängs nära köket men inte vid spisen.",
    },
  ];

  if (kitchen === "annat" || levels >= 2) {
    lines.push({
      key: "blanketSmall",
      count: 1,
      why: "En liten filt i själva köket, där bränderna börjar. Den ersätter inte den stora utan kompletterar den.",
    });
  }

  const note =
    home === "fritidshus"
      ? "I ett fritidshus som står tomt vintertid: kontrollera batteriet varje gång du kommer dit, och räkna med att en brandvarnare med tioårsbatteri är värd mer här än i ett permanentbott hus."
      : levels >= 2
        ? "Sover någon bakom en stängd dörr behövs en brandvarnare till i eller utanför det rummet. En stängd dörr dämpar ljudet mer än de flesta tror."
        : "Har du öppen spis, vedkamin eller pannrum bör släckaren hänga där och inte i hallen.";

  return { lines, note };
}
