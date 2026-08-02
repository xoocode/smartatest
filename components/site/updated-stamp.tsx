import { CalendarCheck, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/products";

export type UpdatedStampProps = {
  /** ISO date string or Date. */
  date: Date | string;
  author?: string;
  /** Number of products considered, e.g. "14 modeller jämförda". */
  testedCount?: number;
  variant?: "inline" | "bar";
  className?: string;
};

/**
 * Freshness signal. Both reference competitors put this above the fold — it
 * lifts CTR on "bäst i test" queries where recency is the buying criterion.
 */
export function UpdatedStamp({
  date,
  author,
  testedCount,
  variant = "inline",
  className,
}: UpdatedStampProps) {
  const iso = typeof date === "string" ? date : date.toISOString();

  return (
    <div
      data-slot="updated-stamp"
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground",
        variant === "bar" && "themed-border rounded-lg bg-muted px-3 py-2",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <CalendarCheck aria-hidden="true" className="size-4" />
        Senast uppdaterad{" "}
        <time dateTime={iso} className="font-medium text-foreground">
          {formatDate(date)}
        </time>
      </span>
      {author ? (
        <span className="inline-flex items-center gap-1.5">
          <UserRound aria-hidden="true" className="size-4" />
          {author}
        </span>
      ) : null}
      {typeof testedCount === "number" ? (
        <span>{testedCount} modeller jämförda</span>
      ) : null}
    </div>
  );
}
