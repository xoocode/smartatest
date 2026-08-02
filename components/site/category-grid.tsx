import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CategoryEntry } from "@/lib/catalog";
import { AwardBadge } from "@/components/product/award-badge";

export type CategoryGridProps = {
  entries: CategoryEntry[];
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
export function CategoryGrid({
  entries,
  variant = "cards",
  columns = 3,
  showPlanned = true,
  plannedLabel = "Planeras",
  className,
}: CategoryGridProps) {
  const rows = showPlanned
    ? entries
    : entries.filter((e) => e.status === "live");

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
            {entry.status === "live" ? (
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
        const planned = entry.status !== "live";

        const body = (
          <>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-h3">{entry.label}</h3>
              {planned ? null : (
                <ArrowRight
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                />
              )}
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

        return planned ? (
          <div
            key={entry.href}
            data-status="planned"
            className={cn(shared, "opacity-70")}
          >
            {body}
          </div>
        ) : (
          <Link
            key={entry.href}
            href={entry.href}
            data-status="live"
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
