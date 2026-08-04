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

/**
 * Layouter för kriterieraderna i recensionskorten.
 *
 * ## Varför axeln finns
 *
 * `CriteriaScores` lade namnet till vänster och stjärnorna till höger med
 * `justify-between`. I en smal spalt fungerar det. I recensionskortets
 * textspalt på skrivbordet, som är uppåt 600 pixlar, blev mellanrummet så stort
 * att ögat tappade vilken rad det läste. Nio förslag provkördes ett per produkt
 * på /brandvarnare 2026-08-03, och punktledaren valdes.
 *
 * De andra ligger kvar som val, `standard` inräknad, eftersom beslutet kan
 * behöva prövas om när en kategori har fler kriterier eller längre namn.
 *
 * ## Varför CSS och inte en prop
 *
 * Axeln byter utseende genom `data-criteria` på `<html>`, som de flesta andra
 * axlar. Alternativet hade varit en prop, men `CriteriaScores` renderas från
 * tjugotvå sidfiler och en av dem, stilguiden, är en klientkomponent. En prop
 * hade betytt en ändring i varje sidfil och en omhämtning vid varje byte.
 *
 * Markeringen som CSS:en hänger på ligger i `criteria-scores.tsx` som
 * `data-part`. Ändra inte dem utan att läsa reglerna i globals.css.
 */
export const CRITERIA_IDS = [
  "punktledare",
  "indragledare",
  "indragledare2",
  "indragledare3",
  "indrag",
  "indrag2",
  "indrag3",
  "standard",
  "smal",
  "halv",
  "tvaspalt",
  "randad",
  "stjarnorforst",
  "talforst",
  "under",
  "stapel",
] as const;

/**
 * Texten på köpknappen.
 *
 * ## Vad som faktiskt avgör
 *
 * Knappen leder bort från sajten, och läsaren vet det. Det som skiljer
 * varianterna åt är hur mycket de lovar. En knapp som lovar mer än vad som
 * väntar på andra sidan får klicket men tappar förtroendet, och för oss syns
 * det inte i klickstatistiken utan i att ingen kommer tillbaka.
 *
 * Butiksnamnet står i samtliga. Det är det enda i etiketten som är belagt att
 * höja klickfrekvensen på en jämförelsesajt: läsaren vet var länken landar, och
 * en namngiven mottagare läses inte som en annons på samma sätt som "Köp nu".
 *
 * `visamig` är första person med flit. Det är den enda varianten här som vilar
 * på ett publicerat test, Michael Aagaards, där förstapersonsformen slog
 * andrapersonsformen tydligt. Det testet är gammalt och engelskt, så behandla
 * det som en hypotes värd att prova, inte som ett facit.
 *
 * ## Varför axeln finns i markupen och inte bara i koden
 *
 * Etiketten är text och kan därför inte bytas med CSS på ett hederligt sätt.
 * Lösningen är att alla varianter renderas och CSS visar en, men **bara när
 * adminläget är på**. I produktion renderas exakt en etikett, den som står i
 * `DEFAULT_STYLE`. Se `AffiliateCta`.
 */
export const CTA_IDS = [
  "kop",
  "sepris",
  "kollapris",
  "handla",
  "visamig",
  "till",
] as const;

/**
 * Länkmarkering i redaktionell text.
 *
 * Axeln kom till 2026-08-03 när `prose.tsx` visade sig släcka understrykningen
 * på varje länk i ett stycke så snart musen rörde stycket, eftersom `hover:`
 * satt på behållaren i stället för på länken. Regeln skulle skrivas om ändå, och
 * då var det billigare att göra den till ett val.
 *
 * Reglerna ligger i globals.css och träffar bara `[data-slot="prose"]`, alltså
 * redaktionell löptext. Länkar med egna klasser i komponenter följer inte med.
 */
export const LINK_IDS = [
  "streckad",
  "prickad",
  "heldragen",
  "dampad",
  "vid-hovring",
] as const;

export const OPTIONAL_SECTION_IDS = ["winnerGrid"] as const;

export type ThemeId = (typeof THEME_IDS)[number];
export type DensityId = (typeof DENSITY_IDS)[number];
export type RadiusId = (typeof RADIUS_IDS)[number];
export type AwardId = (typeof AWARD_IDS)[number];
export const TOGGLE_IDS = ["on", "off"] as const;
export type OptionalSectionId = (typeof OPTIONAL_SECTION_IDS)[number];
export type TableId = (typeof TABLE_IDS)[number];
export type CriteriaId = (typeof CRITERIA_IDS)[number];
export type CtaId = (typeof CTA_IDS)[number];
export type LinkId = (typeof LINK_IDS)[number];
export type ToggleId = "on" | "off";

export type StyleState = {
  theme: ThemeId;
  density: DensityId;
  radius: RadiusId;
  award: AwardId;
  /** Layout of the comparison table. */
  table: TableId;
  /** Layout of the criteria rows inside a review card. */
  criteria: CriteriaId;
  /** Wording on the main buy button. */
  cta: CtaId;
  /** Underline treatment on links in editorial copy. */
  link: LinkId;
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
  criteria: "punktledare",
  cta: "kop",
  link: "streckad",
  winnerGrid: "off",
};

/** Single cookie, colon separated: `theme:density:radius:award:table:winnerGrid:criteria`. */
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

export const CRITERIA_OPTIONS: readonly Option<CriteriaId>[] = [
  {
    id: "punktledare",
    label: "Punktledare",
    hint: "Prickad linje från namnet fram till betyget. Vald 2026-08-03.",
  },
  {
    id: "indragledare",
    label: "Indragen med punktledare",
    hint: "Punktledare, plus marginal på båda sidor så blocket smalnar av.",
  },
  {
    id: "indragledare2",
    label: "Mer indragen med punktledare",
    hint: "Dubbel marginal, alltså 5 rem på var sida.",
  },
  {
    id: "indragledare3",
    label: "Mycket indragen med punktledare",
    hint: "Nästan 9 rem på var sida. Smalast av alla med ledare.",
  },
  {
    id: "indrag",
    label: "Indragen",
    hint: "Oförändrade rader, men marginal på båda sidor. Kortare väg att gå.",
  },
  {
    id: "indrag2",
    label: "Mer indragen",
    hint: "Dubbel marginal, alltså 5 rem på var sida.",
  },
  {
    id: "indrag3",
    label: "Mycket indragen",
    hint: "Nästan 9 rem på var sida. Smalast av alla utan ledare.",
  },
  {
    id: "standard",
    label: "Ingen ändring",
    hint: "Namn till vänster, betyg till höger. Så det såg ut innan.",
  },
  {
    id: "smal",
    label: "Begränsad radbredd",
    hint: "Raden slutar sträcka sig, kapad vid 24 rem.",
  },
  {
    id: "halv",
    label: "Halva spaltbredden",
    hint: "Som smal, men följer med när spalten växer.",
  },
  {
    id: "tvaspalt",
    label: "Två spalter",
    hint: "Kriterierna delas i två, alltså halveras varje rad.",
  },
  {
    id: "randad",
    label: "Randade rader",
    hint: "Tonat band varannan rad. Tabellens klassiska svar.",
  },
  {
    id: "stjarnorforst",
    label: "Vänsterställt",
    hint: "Stjärnorna direkt efter namnet, inget tomrum emellan.",
  },
  {
    id: "talforst",
    label: "Vänsterställt, tal först",
    hint: "Siffran närmast namnet, stjärnorna som illustration.",
  },
  {
    id: "under",
    label: "Betyget under namnet",
    hint: "Rutnät i tre spalter. Inget vågrätt avstånd alls.",
  },
  {
    id: "stapel",
    label: "Stapel",
    hint: "Stapel i stället för stjärnor. Läser som mätning, inte omdöme.",
  },
];

export const CTA_OPTIONS: readonly Option<CtaId>[] = [
  {
    id: "kop",
    label: "Köp hos {butik}",
    hint: "Tydligast avsikt. Lovar ett köp, vilket är vad som väntar.",
  },
  {
    id: "sepris",
    label: "Se pris hos {butik}",
    hint: "Lägre tröskel, lovar bara en prisuppgift. Klassisk jämförelseform.",
  },
  {
    id: "kollapris",
    label: "Kolla priset hos {butik}",
    hint: "Talspråkligare än Se pris. Samma låga löfte.",
  },
  {
    id: "handla",
    label: "Handla hos {butik}",
    hint: "Mjukare än Köp, fortfarande kommersiellt.",
  },
  {
    id: "visamig",
    label: "Visa mig priset hos {butik}",
    hint: "Första person. Enda varianten som vilar på ett publicerat test.",
  },
  {
    id: "till",
    label: "Till {butik}",
    hint: "Kortast. Ren navigering, lovar ingenting. Kräver synligt pris intill.",
  },
];

/**
 * Etiketten för ett läge, med butiksnamnet insatt.
 *
 * Reservtexten används när vi saknar butiksnamn, vilket händer i stilguiden och
 * i tabellceller där namnet redan står i kolumnrubriken.
 */
export function ctaLabel(id: CtaId, merchant?: string): string {
  if (!merchant) {
    return {
      kop: "Köp",
      sepris: "Se pris",
      kollapris: "Kolla priset",
      handla: "Handla",
      visamig: "Visa mig priset",
      till: "Till butiken",
    }[id];
  }
  return {
    kop: `Köp hos ${merchant}`,
    sepris: `Se pris hos ${merchant}`,
    kollapris: `Kolla priset hos ${merchant}`,
    handla: `Handla hos ${merchant}`,
    visamig: `Visa mig priset hos ${merchant}`,
    till: `Till ${merchant}`,
  }[id];
}

export const LINK_OPTIONS: readonly Option<LinkId>[] = [
  {
    id: "streckad",
    label: "Streckad",
    hint: "Streckad linje som blir heldragen vid hovring. Förvalet.",
  },
  {
    id: "prickad",
    label: "Prickad",
    hint: "Som streckad men lättare. Kan bli gyttrig i små grader.",
  },
  {
    id: "heldragen",
    label: "Heldragen",
    hint: "Alltid heldragen, tjockare vid hovring. Mest konventionell.",
  },
  {
    id: "dampad",
    label: "Dämpad linje",
    hint: "Blek linje som tar färg vid hovring. Lugnast i länktät text.",
  },
  {
    id: "vid-hovring",
    label: "Bara vid hovring",
    hint: "Ingen linje förrän musen är där. Snyggast, sämst att skanna.",
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
  /* Nya axlar läggs sist. En kaka skriven innan axeln fanns saknar segmentet,
     och `pick` faller då tillbaka på standardvärdet i stället för att förskjuta
     alla värden ett steg. */
  const [theme, density, radius, award, table, winnerGrid, criteria, cta, link] = (
    raw ?? ""
  ).split(":");
  return {
    theme: pick(theme, THEME_IDS, DEFAULT_STYLE.theme),
    density: pick(density, DENSITY_IDS, DEFAULT_STYLE.density),
    radius: pick(radius, RADIUS_IDS, DEFAULT_STYLE.radius),
    award: pick(award, AWARD_IDS, DEFAULT_STYLE.award),
    table: pick(table, TABLE_IDS, DEFAULT_STYLE.table),
    winnerGrid: pick(winnerGrid, TOGGLE_IDS, DEFAULT_STYLE.winnerGrid),
    criteria: pick(criteria, CRITERIA_IDS, DEFAULT_STYLE.criteria),
    cta: pick(cta, CTA_IDS, DEFAULT_STYLE.cta),
    link: pick(link, LINK_IDS, DEFAULT_STYLE.link),
  };
}

export function serializeStyleCookie(style: StyleState): string {
  return `${style.theme}:${style.density}:${style.radius}:${style.award}:${style.table}:${style.winnerGrid}:${style.criteria}:${style.cta}:${style.link}`;
}
