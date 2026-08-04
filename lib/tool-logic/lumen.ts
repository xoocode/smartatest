/**
 * Ljusbehov per rum.
 *
 * Ligger utanför komponenten så att widgeten och agentverktyget räknar på samma
 * kod. Två implementationer av samma räkning glider isär, och det är den sortens
 * fel som ingen upptäcker: båda svarar, bara den ena har rätt.
 */

/**
 * Rekommenderad belysningsstyrka per rum, i lumen per kvadratmeter.
 *
 * Siffrorna gäller allmänbelysning, inte arbetsbelysning. En köksbänk eller ett
 * skrivbord vill ha en egen lampa ovanpå det här, vilket är skälet till att
 * spannen slutar där de gör i stället för att försöka täcka båda i ett tal.
 */
export const LUMEN_ROOMS = [
  { key: "vardagsrum", label: "Vardagsrum", min: 100, max: 150 },
  { key: "kok", label: "Kök", min: 250, max: 300 },
  { key: "sovrum", label: "Sovrum", min: 100, max: 150 },
  { key: "arbetsrum", label: "Arbetsrum", min: 250, max: 300 },
  { key: "badrum", label: "Badrum", min: 200, max: 250 },
  { key: "hall", label: "Hall", min: 100, max: 150 },
] as const;

/** Vanliga ljusflöden, för att översätta en total till ett antal lampor. */
export const BULB_OUTPUTS = [470, 806, 1055, 1100, 1521];

export type LumenRoom = (typeof LUMEN_ROOMS)[number];

export type LumenNeed = {
  room: LumenRoom;
  /** Ytan som faktiskt räknades på. Noll när indata var tom eller ogiltig. */
  area: number;
  min: number;
  max: number;
};

export function findLumenRoom(key: string): LumenRoom {
  return LUMEN_ROOMS.find((r) => r.key === key) ?? LUMEN_ROOMS[0];
}

export function lumenNeed(roomKey: string, areaSqm: number): LumenNeed {
  const room = findLumenRoom(roomKey);
  /* NaN när fältet är tomt mitt i en inmatning. Noll i stället, annars skriver
     resultatet "NaN lm" medan användaren håller på att skriva. */
  const area = Number.isFinite(areaSqm) && areaSqm > 0 ? areaSqm : 0;

  return {
    room,
    area,
    min: Math.round(room.min * area),
    max: Math.round(room.max * area),
  };
}

/**
 * Antal lampor av en given storlek som täcker behovet.
 *
 * Avrundas uppåt. Ett rum som hamnar mellan två lampor är underbelyst, inte
 * överbelyst.
 */
export function lampCount(need: LumenNeed, output: number): number {
  return need.area ? Math.ceil(need.min / output) : 0;
}
