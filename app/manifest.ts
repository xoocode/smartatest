import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { OG_COLORS } from "@/lib/og";

/*
 * Webbmanifest. Blygsam nytta för en innehållssajt — ingen kommer att
 * installera oss som app — men den gör två saker som är värda filen: ger en
 * riktig ikon och ett riktigt namn när någon sparar sidan på hemskärmen, och
 * tystar Lighthouse-varningen som annars drar ned PWA-delen av revisionen.
 *
 * `display: "browser"` är avsiktligt. Ett standalone-läge skulle dölja
 * adressfältet, och på en sajt som skickar besökare vidare till externa
 * butiker är det direkt skadligt: köparen ska kunna se vilken domän hen
 * hamnat på.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name}. ${SITE.tagline}`,
    short_name: SITE.name,
    description:
      "Oberoende jämförelser av brandvarnare, vattenlarm, smart belysning och smarta uttag.",
    start_url: "/",
    display: "browser",
    lang: "sv-SE",
    background_color: OG_COLORS.background,
    theme_color: OG_COLORS.brand,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
