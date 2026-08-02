/**
 * Site-wide style axes.
 *
 * Everything visual is driven by three data attributes on <html>:
 *   data-theme    — colour palette, font pairing, shadow character
 *   data-density  — spacing scale (comfortable / compact)
 *   data-radius   — corner rounding
 *
 * The token values themselves live in app/globals.css. This file is only the
 * registry: it gives the admin style picker something to render and the root
 * layout something to validate the cookie against.
 */

/** Order here drives the order in the admin style picker. */
export const THEME_IDS = [
  "testsieger",
  "redaktionell",
  "nordisk",
  "kvallspress",
] as const;

export const DENSITY_IDS = ["comfortable", "compact"] as const;

export const RADIUS_IDS = ["sharp", "soft", "round"] as const;

/** Colour treatment for award badges and star ratings. Order drives the picker. */
export const AWARD_IDS = ["guld", "kontrast", "chip", "ink", "smaragd"] as const;

/**
 * Optional page sections, toggled for internal reference only.
 *
 * These are hidden in the shipped design. The switch exists so we can look at
 * a section we have parked without deleting it from the page template, and
 * turning one on knowingly breaks the alternating section backgrounds. That is
 * accepted: the toggle is a viewer, not a supported layout.
 */
/**
 * Layouts for the comparison table. Products-as-columns is the layout NN/g and
 * Baymard both recommend, so it is the default; the rest exist because dense
 * spec tables and feature checklists genuinely read better in other shapes.
 */
export const TABLE_IDS = [
  "matrix",
  "grouped",
  "checklist",
  "rows",
  "compact",
] as const;

export const OPTIONAL_SECTION_IDS = ["winnerGrid"] as const;

export type ThemeId = (typeof THEME_IDS)[number];
export type DensityId = (typeof DENSITY_IDS)[number];
export type RadiusId = (typeof RADIUS_IDS)[number];
export type AwardId = (typeof AWARD_IDS)[number];
export const TOGGLE_IDS = ["on", "off"] as const;
export type OptionalSectionId = (typeof OPTIONAL_SECTION_IDS)[number];
export type TableId = (typeof TABLE_IDS)[number];
export type ToggleId = "on" | "off";

export type StyleState = {
  theme: ThemeId;
  density: DensityId;
  radius: RadiusId;
  award: AwardId;
  /** Layout of the comparison table. */
  table: TableId;
  /** Off by default. See OPTIONAL_SECTION_IDS. */
  winnerGrid: ToggleId;
};

/** The working style for the build. Everything renders in this unless the
    admin picker overrides it via the cookie. */
export const DEFAULT_STYLE: StyleState = {
  theme: "testsieger",
  density: "comfortable",
  radius: "soft",
  award: "guld",
  table: "matrix",
  winnerGrid: "off",
};

/** Single cookie, colon separated: `theme:density:radius:award:table:winnerGrid`. */
export const STYLE_COOKIE = "st_style";

type Option<T extends string> = {
  id: T;
  label: string;
  hint: string;
};

export const THEME_OPTIONS: readonly Option<ThemeId>[] = [
  {
    id: "testsieger",
    label: "Testsieger",
    hint: "Kliniskt vitt, blå trovärdighet, orange CTA. Byggd för konvertering.",
  },
  {
    id: "redaktionell",
    label: "Redaktionell",
    hint: "Varmt papper, serifrubriker, dämpad teal. Läser som en tidning.",
  },
  {
    id: "nordisk",
    label: "Nordisk",
    hint: "Sval gråskala, luftigt, lätta vikter. Minimalt och lugnt.",
  },
  {
    id: "kvallspress",
    label: "Kvällspress",
    hint: "Rött, tätt och högljutt. Kvällstidningens testbilaga.",
  },
];

export const DENSITY_OPTIONS: readonly Option<DensityId>[] = [
  { id: "comfortable", label: "Luftig", hint: "Generösa mellanrum, längre sidor." },
  { id: "compact", label: "Tät", hint: "Mer innehåll ovanför viklinjen." },
];

export const RADIUS_OPTIONS: readonly Option<RadiusId>[] = [
  { id: "sharp", label: "Skarp", hint: "Nästan raka hörn." },
  { id: "soft", label: "Mjuk", hint: "Standard." },
  { id: "round", label: "Rundad", hint: "Kraftigt rundade kort och knappar." },
];

export const TABLE_OPTIONS: readonly Option<TableId>[] = [
  {
    id: "matrix",
    label: "Matris",
    hint: "Produkter som kolumner, egenskaper som rader. NN/g:s rekommendation.",
  },
  {
    id: "grouped",
    label: "Grupperad",
    hint: "Matris med egenskaperna indelade i namngivna block.",
  },
  {
    id: "checklist",
    label: "Checklista",
    hint: "Matris med bock eller streck för vad produkten har.",
  },
  {
    id: "rows",
    label: "Rader",
    hint: "Produkter som rader. Den klassiska testsieger-formen.",
  },
  {
    id: "compact",
    label: "Kompakt",
    hint: "Rader utan bilder, tät text, alla specifikationer.",
  },
];

export const AWARD_OPTIONS: readonly Option<AwardId>[] = [
  {
    id: "guld",
    label: "Guld",
    hint: "Ljust guld med neutralt svart. Klassiskt utan grumlighet.",
  },
  {
    id: "kontrast",
    label: "Kontrast",
    hint: "Djup bärnsten med vit text. Högst kontrast, läser skarpt.",
  },
  {
    id: "chip",
    label: "Chip",
    hint: "Mycket ljus botten, mörkare ram och text. Lågmält.",
  },
  {
    id: "ink",
    label: "Ink",
    hint: "Nästan svart botten med guldtext. Skarpast av alla.",
  },
  {
    id: "smaragd",
    label: "Smaragd",
    hint: "Grönt istället för guld. Bryter av mot orange CTA.",
  },
];

function pick<T extends string>(
  candidate: string | undefined,
  allowed: readonly T[],
  fallback: T,
): T {
  return allowed.includes(candidate as T) ? (candidate as T) : fallback;
}

/**
 * Parse the raw cookie value. Never throws, and unknown or missing segments
 * fall back, so cookies written before a new axis existed stay valid.
 */
export function parseStyleCookie(raw: string | undefined): StyleState {
  const [theme, density, radius, award, table, winnerGrid] = (raw ?? "").split(
    ":",
  );
  return {
    theme: pick(theme, THEME_IDS, DEFAULT_STYLE.theme),
    density: pick(density, DENSITY_IDS, DEFAULT_STYLE.density),
    radius: pick(radius, RADIUS_IDS, DEFAULT_STYLE.radius),
    award: pick(award, AWARD_IDS, DEFAULT_STYLE.award),
    table: pick(table, TABLE_IDS, DEFAULT_STYLE.table),
    winnerGrid: pick(winnerGrid, TOGGLE_IDS, DEFAULT_STYLE.winnerGrid),
  };
}

export function serializeStyleCookie(style: StyleState): string {
  return `${style.theme}:${style.density}:${style.radius}:${style.award}:${style.table}:${style.winnerGrid}`;
}
