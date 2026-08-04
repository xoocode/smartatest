import dynamic from "next/dynamic";

import { isAdminEnabled } from "@/lib/admin";
import type { StyleState } from "@/lib/theme";

/**
 * Lazy, inte statisk import.
 *
 * ## Problemet, som fortfarande inte är löst
 *
 * Stilväljaren hamnar i klientbunten även när `AdminCorner` returnerar `null`.
 * Uppmätt 2026-08-03: den byggda `/brandvarnare` laddar en chunk på 59 kB som
 * innehåller "Stäng stilväljaren" och "Kriterierader", alltså kod för ett
 * verktyg som aldrig kan renderas för en besökare.
 *
 * `next/dynamic` här ändrade **inte** det. Turbopack slår ihop väljaren med
 * sökrutan och samtyckeslagret, som layouten genuint behöver, till en enda
 * delad chunk. En lat gräns hjälper inte när modulen ändå hamnar i en chunk
 * som laddas av andra skäl.
 *
 * Importen står kvar som lat eftersom det är rätt avsikt och kostar
 * ingenting, men räkna inte den som en optimering. Det som faktiskt skulle
 * lösa saken är att layouten inte importerar `AdminCorner` alls i produktion,
 * och det kräver en uppdelning som inte är värd priset i dag.
 *
 * Mät så här efter ändringar, i stället för att anta:
 * `grep -rl "Stäng stilväljaren" .next/static/chunks/`
 * och kontrollera om filen refereras i `.next/server/app/brandvarnare.html`.
 */
const StylePicker = dynamic(() =>
  import("@/components/admin/style-picker").then((m) => m.StylePicker),
);

/**
 * Internal tooling overlay, pinned to the top-right of every page.
 * Renders nothing in production unless NEXT_PUBLIC_SHOW_ADMIN=1.
 */
export function AdminCorner({ style }: { style: StyleState }) {
  if (!isAdminEnabled()) return null;

  return (
    <div
      data-slot="admin-corner"
      /* Top-left, not top-right: the header's search and menu buttons live in
         the top-right corner, and a fixed dev-only pill sitting on top of them
         made both unreachable on a phone. */
      className="fixed top-3 left-3 z-50 flex flex-col items-start gap-2 print:hidden"
    >
      <StylePicker initial={style} />
    </div>
  );
}
