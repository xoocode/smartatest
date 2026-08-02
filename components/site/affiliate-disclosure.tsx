import Link from "next/link";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { isMonetised } from "@/lib/links";

/** Den förklarande texten balken ska peka på. */
export const DISCLOSURE_HREF = "/annonsmarkning";

/** Ordalydelsen branschrekommendationen anger. Ändra inte utan skäl. */
export const BALK_TEXT = "Artikeln innehåller annonslänkar";

export type AffiliateDisclosureProps = {
  /**
   * balk   — strip högst upp i artikeln, enligt branschrekommendationen
   * box    — bordered callout
   * inline — one muted line
   * footer — smallest
   */
  variant?: "balk" | "box" | "inline" | "footer";
  text?: string;
  /**
   * Visa balken även när inga länkar är monetiserade. Bara för styleguiden —
   * på en riktig sida vore det ett falskt påstående.
   */
  force?: boolean;
  className?: string;
};

/**
 * Required on every page that carries affiliate links — both by Google Ads
 * policy and by several Adtraction program terms (see .agent/research.md).
 * Centralised so the wording can never drift between pages.
 *
 * ## Balken
 *
 * TU, Sveriges Tidskrifter och IAB Sverige fastställde 18 juni 2024 att en
 * redaktionell artikel med affiliatelänkar ska märkas "tydligt och
 * inledningsvis" med en balk, och att balken bör länka vidare till en
 * förklarande text. Balken hör alltså hemma före ingressen, inte vid första
 * köpknappen och absolut inte i sidfoten.
 *
 * Den renderar ingenting i `direct`-läge. Se `isMonetised` i lib/links.ts.
 */
export function AffiliateDisclosure({
  variant = "box",
  text = SITE.disclosure,
  force = false,
  className,
}: AffiliateDisclosureProps) {
  if (variant === "balk") {
    if (!force && !isMonetised()) return null;

    return (
      <aside
        data-slot="affiliate-disclosure"
        data-variant="balk"
        className={cn(
          "themed-border flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-secondary px-4 py-2.5",
          className,
        )}
      >
        <span className="eyebrow text-secondary-foreground">{BALK_TEXT}</span>
        <Link
          href={DISCLOSURE_HREF}
          className="text-sm text-primary underline underline-offset-2 hover:no-underline"
        >
          Mer info
        </Link>
      </aside>
    );
  }

  if (variant === "footer") {
    return (
      <p
        data-slot="affiliate-disclosure"
        className={cn("text-xs text-muted-foreground", className)}
      >
        {text}
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <p
        data-slot="affiliate-disclosure"
        className={cn(
          /* items-start, not items-center: this wraps to three lines on a
             phone, and centring parked the icon beside the middle line so the
             first line looked indented. Align it to the first line, as the
             block variant already does. */
          "flex items-start gap-1.5 text-sm text-muted-foreground",
          className,
        )}
      >
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {text}
      </p>
    );
  }

  return (
    <aside
      data-slot="affiliate-disclosure"
      className={cn(
        "themed-border flex items-start gap-2.5 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <p>{text}</p>
    </aside>
  );
}
