import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Standing disclaimers. The wording is electrical and fire-safety, matching
 * what we actually publish about. The medical wording the reference site uses
 * does not transfer.
 *
 * Kept in one component so the text cannot drift between pages, and so a legal
 * review changes one file.
 */
export const DISCLAIMERS = {
  general:
    "Innehållet på smartatest.se är allmän produktinformation. Det ersätter inte tillverkarens monterings- och säkerhetsanvisningar, och det är alltid anvisningarna som gäller vid en konflikt.",
  electrical:
    "Fast elinstallation ska utföras av ett registrerat elinstallationsföretag, och registret finns hos Elsäkerhetsverket. Produkter som ansluts till vägguttag omfattas inte av det kravet, men följ alltid tillverkarens anvisningar om effekt och placering.",
  fireSafety:
    "Brandskyddsutrustning är livräddande utrustning. Antal, placering och underhåll bör följa Myndigheten för samhällsskydd och beredskaps och den lokala räddningstjänstens rekommendationer, och funktionen behöver kontrolleras regelbundet oavsett vad ett test säger om modellen. Beskrivningar av hur utrustningen används ersätter varken tillverkarens anvisningar eller en brandutbildning. Slocknar branden inte omedelbart: lämna bostaden, stäng dörren efter dig och ring 112.",
  pricing:
    "Priser och specifikationer hämtas vid publicering och kan ha ändrats sedan dess. Priset hos återförsäljaren vid köptillfället är det som gäller.",
  affiliate:
    "Vi finansieras av provision från länkarna på sidan. Det påverkar varken betyg, placeringar eller vilka produkter vi väljer att testa.",
} as const;

export type DisclaimerKey = keyof typeof DISCLAIMERS;

export type LegalDisclaimerProps = {
  /** Which standing texts to render, in order. */
  items?: DisclaimerKey[];
  /** Extra category-specific text appended after the standing ones. */
  children?: ReactNode;
  /**
   * block  — bordered panel with a warning glyph, for the foot of a page
   * footer — small muted paragraphs, for the site footer
   * inline — single muted paragraph, for mid-page
   */
  variant?: "block" | "footer" | "inline";
  title?: string;
  className?: string;
};

export function LegalDisclaimer({
  items = ["general", "pricing"],
  children,
  variant = "block",
  title = "Viktigt att veta",
  className,
}: LegalDisclaimerProps) {
  const paragraphs = items.map((key) => (
    <p key={key}>{DISCLAIMERS[key]}</p>
  ));

  if (variant === "footer") {
    return (
      <div
        data-slot="legal-disclaimer"
        data-variant="footer"
        className={cn(
          "flex flex-col gap-2 text-xs text-muted-foreground",
          className,
        )}
      >
        {paragraphs}
        {children}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <p
        data-slot="legal-disclaimer"
        data-variant="inline"
        className={cn("text-sm text-muted-foreground", className)}
      >
        {items.map((key) => DISCLAIMERS[key]).join(" ")}
      </p>
    );
  }

  return (
    <aside
      data-slot="legal-disclaimer"
      data-variant="block"
      /* Se motsvarande kommentar i affiliate-disclosure.tsx: två namnlösa
         aside på samma sida blir ett landmärke för hjälpmedlen. `title` är
         redan sidans egen rubrik för rutan, så namnet blir aldrig fel. */
      aria-label={title}
      className={cn(
        "themed-border rounded-lg bg-muted pad-card",
        className,
      )}
    >
      <p className="mb-2 flex items-center gap-2 font-semibold">
        <TriangleAlert aria-hidden="true" className="size-4 text-warning" />
        {title}
      </p>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        {paragraphs}
        {children}
      </div>
    </aside>
  );
}
