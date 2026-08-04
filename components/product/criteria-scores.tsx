import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { weightedRating, type Criterion } from "@/lib/products";
import { RatingStars } from "@/components/product/rating-stars";

export type CriteriaScoresProps = {
  criteria: Criterion[];
  /** Criterion key → score, 0–5. */
  scores: Record<string, number>;
  /**
   * rows    — label, stars, numeral per line. The full breakdown.
   * compact — label and numeral only, no stars. For dense cards.
   * bars    — thin unfilled progress bars instead of stars.
   */
  variant?: "rows" | "compact" | "bars";
  size?: "sm" | "md";
  /** Append the weighted total as a final emphasised row. */
  showTotal?: boolean;
  totalLabel?: string;
  /** Render each criterion's weight, e.g. "25 %". */
  showWeights?: boolean;
  className?: string;
};

/**
 * The per-criterion breakdown behind a product's total score.
 *
 * Presentational only: it takes criteria and scores rather than a product, so
 * it can render a category's scoring model with no product attached (as the
 * methodology section does).
 */
export function CriteriaScores({
  criteria,
  scores,
  variant = "rows",
  size = "md",
  showTotal = true,
  totalLabel = "Vårt betyg",
  showWeights = false,
  className,
}: CriteriaScoresProps) {
  /* weightedRating är oavrundad sedan 2026-08-03, så den avrundas här. */
  const total = Math.round(weightedRating(scores, criteria) * 10) / 10;
  const textSize = size === "sm" ? "text-sm" : "";

  const value = (score: number) => (
    <span className="tabular-nums">
      {score.toLocaleString("sv-SE", { minimumFractionDigits: 1 })}
      <span className="text-muted-foreground">/5</span>
    </span>
  );

  const gauge = (score: number) => {
    if (variant === "compact") return null;
    if (variant === "bars") {
      return (
        /* No filled track behind the bar: a full-width grey rail reads as
           dashboard chrome and exaggerates small differences. */
        <span className="flex h-1 w-24 items-center">
          <span
            className="h-full rounded-full bg-award-accent"
            style={{ width: `${(score / 5) * 100}%` }}
          />
        </span>
      );
    }
    return (
      <>
        <span data-part="stars">
          <RatingStars value={score} size={size === "sm" ? "sm" : "md"} />
        </span>
        {/* Stapeln renderas alltid och göms av CSS. Bredden kan bara sättas
            här, eftersom den beror på betyget, och en variant som byter
            stjärnor mot stapel måste därför ha elementet på plats. Se
            `data-criteria` i globals.css. */}
        <span
          data-part="bar"
          aria-hidden="true"
          className="rounded-full bg-award-accent"
          style={{ "--criteria-fill": `${(score / 5) * 100}%` } as CSSProperties}
        />
      </>
    );
  };

  return (
    <dl
      data-slot="criteria-scores"
      data-variant={variant}
      className={cn("flex flex-col", textSize, className)}
    >
      {/* Egen behållare runt kriterieraderna, så att en variant kan göra dem
          till ett rutnät eller smalna av dem utan att totalraden följer med.
          Totalraden ska spänna hela bredden i samtliga varianter. */}
      <div data-part="rows" className="flex flex-col">
        {criteria.map((criterion) => {
        const score = scores[criterion.key];
        return (
          <div
            key={criterion.key}
            data-part="row"
            className="flex items-center justify-between gap-4 py-1.5"
          >
            <dt data-part="label" className="min-w-0">
              {criterion.label}
              {showWeights ? (
                <span className="ml-1.5 text-muted-foreground tabular-nums">
                  {criterion.weight} %
                </span>
              ) : null}
            </dt>

            {/* Punktledaren renderas alltid och göms av CSS, av samma skäl som
                stapeln: en variant kan inte lägga till ett element. */}
            <span data-part="leader" aria-hidden="true" />

            <dd data-part="value" className="flex shrink-0 items-center gap-3">
              {typeof score === "number" ? (
                <>
                  {gauge(score)}
                  {value(score)}
                </>
              ) : (
                <span className="text-muted-foreground">Ej testat</span>
              )}
            </dd>
          </div>
        );
        })}
      </div>

      {showTotal ? (
        <div className="mt-1 flex items-center justify-between gap-4 border-t border-border pt-2.5 font-semibold">
          <dt>{totalLabel}</dt>
          <dd className="flex shrink-0 items-center gap-3">
            {gauge(total)}
            {value(total)}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
