import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { isBrowsable, type TestPageEntry } from "@/lib/catalog";
import { AwardBadge } from "@/components/product/award-badge";

export type CategoryGridProps = {
  entries: TestPageEntry[];
  /**
   * cards   — bordered cards with blurb, for the homepage and the group hub
   * compact — tight rows, for a sidebar or the foot of an article
   */
  variant?: "cards" | "compact";
  columns?: 2 | 3 | 4;
  /** Label planned categories instead of hiding them. */
  showPlanned?: boolean;
  plannedLabel?: string;
  className?: string;
};

const COLUMN_CLASSES: Record<NonNullable<CategoryGridProps["columns"]>, string> =
  {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

/**
 * A planned category renders as a non-interactive card. It is deliberately not
 * a link: a dead nav entry costs a reader a click and Google a crawl, and the
 * status lives in lib/catalog.ts so there is no second list to keep in sync.
 */
export function TestPageGrid({
  entries,
  variant = "cards",
  columns = 3,
  showPlanned = true,
  plannedLabel = "Planeras",
  className,
}: CategoryGridProps) {
  const rows = showPlanned
    ? entries
    : entries.filter(isBrowsable);

  if (!rows.length) return null;

  if (variant === "compact") {
    return (
      <ul
        data-slot="category-grid"
        data-variant="compact"
        className={cn("flex flex-col gap-stack", className)}
      >
        {rows.map((entry) => (
          <li key={entry.href} className="flex items-center gap-2">
            {isBrowsable(entry) ? (
              <Link
                href={entry.href}
                className="font-medium underline-offset-2 hover:underline"
              >
                {entry.label}
              </Link>
            ) : (
              <>
                <span className="text-muted-foreground">{entry.label}</span>
                <AwardBadge
                  label={plannedLabel}
                  variant="pill"
                  tone="outline"
                  icon={false}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      data-slot="category-grid"
      data-variant="cards"
      className={cn("grid gap-4", COLUMN_CLASSES[columns], className)}
    >
      {rows.map((entry) => {
        /* Två frågor, inte en. `planned` styr vad kortet *säger* om sig
           självt, `linkable` styr om det går att klicka på. I förhandsläge
           blir en planerad kategori klickbar men behåller sin etikett, så man
           kan surfa igenom sajten utan att texten börjar ljuga om vad som är
           publicerat. Se PREVIEW_PLANNED i lib/catalog.ts. */
        const planned = entry.status !== "live";
        const linkable = isBrowsable(entry);

        const body = (
          <>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-h3">{entry.label}</h3>
              {linkable ? (
                <ArrowRight
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                />
              ) : null}
            </div>
            <p className="text-sm text-muted-foreground">{entry.blurb}</p>
            <div className="mt-auto pt-2">
              {planned ? (
                <AwardBadge
                  label={plannedLabel}
                  variant="pill"
                  tone="outline"
                  icon={false}
                />
              ) : (
                <p className="eyebrow text-muted-foreground">
                  {entry.count
                    ? `${entry.count} modeller jämförda`
                    : "Läs testet"}
                </p>
              )}
            </div>
          </>
        );

        const shared =
          "themed-border flex flex-col gap-2 rounded-lg bg-card pad-card shadow-card";

        return !linkable ? (
          <div
            key={entry.href}
            data-status="planned"
            /* opacity-70 dämpade även texten, till 3,12:1 mot vitt. Kortets
               dämpade intryck ligger nu i bakgrunden och kantfärgen i stället,
               så en planerad kategori fortfarande syns som planerad utan att
               brödtexten blir oläslig. */
            className={cn(shared, "bg-muted/60")}
          >
            {body}
          </div>
        ) : (
          <Link
            key={entry.href}
            href={entry.href}
            data-status={planned ? "planned" : "live"}
            className={cn(
              shared,
              "group transition-shadow hover:shadow-raised",
            )}
          >
            {body}
          </Link>
        );
      })}
    </div>
  );
}
