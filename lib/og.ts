/**
 * Färger och mått för genererade delningsbilder.
 *
 * ## Varför hexvärden här och inte tokens från globals.css
 *
 * Delningsbilderna renderas av Satori, som varken kör en webbläsares
 * CSS-motor eller förstår `oklch()`. Temafärgerna i `app/globals.css` är
 * skrivna i oklch, så de går inte att läsa in — de måste finnas som hex.
 *
 * Värdena nedan är omräknade från `[data-theme="testsieger"]`, som är
 * `DEFAULT_STYLE.theme` i `lib/theme.ts`. Delningsbilden är statisk och kan
 * inte följa med när en besökare byter tema i admin-väljaren, så den låser
 * sig medvetet vid standardtemat.
 *
 * Ändras testsieger-paletten behöver de här räknas om. Det är en dubblering,
 * men alternativet — att inte ha delningsbilder alls — är sämre.
 */
export const OG_COLORS = {
  background: "#ffffff",
  foreground: "#0a0e12",
  primary: "#0056c5",
  brand: "#ec6100",
  award: "#d29a00",
  mutedForeground: "#5d646c",
  border: "#dadee3",
  secondary: "#f0f4f7",
} as const;

/** Facebook och LinkedIn vill ha 1200×630. X klipper till samma proportion. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
