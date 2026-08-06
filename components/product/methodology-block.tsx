import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { criteriaWeightTotal, type Criterion } from "@/lib/products";
import { VerdictText } from "@/components/product/verdict-text";

export type MethodologyBlockProps = {
  criteria: Criterion[];
  /** Intro paragraph above the criteria. */
  intro?: ReactNode;
  /** Closing note, e.g. the independence statement. */
  footnote?: ReactNode;
  /**
   * list  — weight, label, description per row
   * cards — the same as a grid, for wider layouts
   */
  variant?: "list" | "cards";
  /** Metodsidan. Sätt till null för att dölja länken, t.ex. i stilguiden. */
  methodHref?: string | null;
  className?: string;
};

/**
 * "Så gjorde vi testet". Reads the same `Criterion[]` the scores are computed
 * from, so a published weight can never drift from the weight actually used in
 * the maths.
 */
export function MethodologyBlock({
  criteria,
  intro,
  footnote,
  variant = "list",
  methodHref = "/sa-testar-vi",
  className,
}: MethodologyBlockProps) {
  const total = criteriaWeightTotal(criteria);

  return (
    <div data-slot="methodology-block" className={className}>
      {/* Stycken, inte en textmassa. Metodtexterna hade median 977 tecken och
          inte en enda styckebrytning den 6 augusti 2026, vilket gjorde
          "Så gjorde vi testet" till en vägg. En sträng utan tomrad renderas
          precis som förut, alltså är ändringen bakåtkompatibel. */}
      {typeof intro === "string" ? (
        <VerdictText text={intro} className="mb-block max-w-2xl" />
      ) : intro ? (
        <p className="mb-block max-w-2xl">{intro}</p>
      ) : null}

      <div
        className={cn(
          variant === "cards"
            ? "grid gap-4 sm:grid-cols-2"
            : "flex flex-col gap-stack",
        )}
      >
        {criteria.map((criterion) => (
          <div
            key={criterion.key}
            className={cn(
              variant === "cards" &&
                "themed-border rounded-lg bg-card pad-card shadow-card",
            )}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-h3 text-brand tabular-nums">
                {criterion.weight} %
              </span>
              <h3 className="font-semibold">{criterion.label}</h3>
            </div>
            {criterion.description ? (
              <VerdictText
                text={criterion.description}
                className="mt-1 text-sm text-muted-foreground"
              />
            ) : null}
          </div>
        ))}
      </div>

      {/* A category whose weights do not reach 100 is an authoring bug, and it
          is cheaper to see it on the page than to discover it in the scores. */}
      {total !== 100 ? (
        <p className="mt-4 text-sm text-destructive">
          Viktningen summerar till {total} %, inte 100 %. Kontrollera
          kategorins kriterier.
        </p>
      ) : null}

      {typeof footnote === "string" ? (
        <VerdictText
          text={footnote}
          className="mt-block max-w-2xl text-sm text-muted-foreground"
        />
      ) : footnote ? (
        <p className="mt-block max-w-2xl text-sm text-muted-foreground">
          {footnote}
        </p>
      ) : null}

      {/* Vidare till metodsidan.
       *
       * Viktningen ovan gäller den här kategorin. Läsaren som undrar hur ett
       * delbetyg blir ett totalbetyg, eller varför en kategori saknar
       * testkriterium, hade tidigare ingenstans att ta vägen: /sa-testar-vi
       * länkades bara från sidfoten. Testsidorna är de som rankar och som
       * annonstrafiken landar på, så länken hör hemma här. */}
      {methodHref ? (
        <p className="mt-4 text-sm">
          <Link
            href={methodHref}
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            Så räknas betygen fram, med räkneexempel
          </Link>
        </p>
      ) : null}
    </div>
  );
}
