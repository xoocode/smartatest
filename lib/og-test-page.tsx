import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";
import { TEST_PAGE_INDEX } from "@/lib/catalog";
import { OG_COLORS, OG_SIZE } from "@/lib/og";

/**
 * Delningsbild per kategori.
 *
 * ## Varför vinnaren inte står på bilden
 *
 * Frestande, och fel. Facebook och LinkedIn cachar delningsbilder hårt och
 * länge, så ett kort som namnger en testvinnare fortsätter påstå det långt
 * efter att rankningen ändrats. En delad länk skulle alltså ljuga om precis
 * det den ska sälja. Kortet bygger därför bara på kategorins egna uppgifter,
 * som ändras när kategorin ändras och inte när en produkt byter plats.
 *
 * ## Varför `TEST_PAGE_INDEX` och inte produktdatan
 *
 * Samma källa som menyn, sitemapen och sökindexet läser. En kategori kan inte
 * få ett kort som säger något annat än katalogen säger, och en ny kategori får
 * sitt kort genom att lägga till `opengraph-image.tsx` i sin mapp. Ingen
 * andra lista att hålla i takt.
 */

const geist = readFileSync(join(process.cwd(), "assets/fonts/Geist-Regular.ttf"));

/** Året i rubriken. Samma som sidornas titlar använder. */
const YEAR = 2026;

export function testPageOgAlt(href: string): string {
  const entry = TEST_PAGE_INDEX.find((c) => c.href === href);
  return entry
    ? `Bäst i test ${entry.label.toLowerCase()} ${YEAR} hos ${SITE.name}`
    : `${SITE.name}. ${SITE.tagline}`;
}

export function testPageOgImage(href: string) {
  const entry = TEST_PAGE_INDEX.find((c) => c.href === href);

  /* Faller tillbaka på sajtens namn hellre än att krascha bygget. En saknad
     post är ett fel i katalogen, inte något delningsbilden ska avgöra. */
  const label = entry?.label ?? SITE.name;
  const blurb = entry?.blurb ?? SITE.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: OG_COLORS.background,
          padding: 72,
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 14,
            background: OG_COLORS.brand,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: OG_COLORS.brand,
            }}
          >
            Bäst i test {YEAR}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 88,
              letterSpacing: -3,
              lineHeight: 1.05,
              color: OG_COLORS.foreground,
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 30,
              lineHeight: 1.4,
              color: OG_COLORS.mutedForeground,
              maxWidth: 900,
            }}
          >
            {blurb}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${OG_COLORS.border}`,
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 40,
              letterSpacing: -1,
              color: OG_COLORS.foreground,
            }}
          >
            <span>{SITE.name}</span>
            <span style={{ color: OG_COLORS.brand }}>.se</span>
          </div>
          <div
            style={{ display: "flex", fontSize: 26, color: OG_COLORS.mutedForeground }}
          >
            Samma viktning för alla
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Geist", data: geist, weight: 400, style: "normal" }] },
  );
}

export { OG_SIZE };
