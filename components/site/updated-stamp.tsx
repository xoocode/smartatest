import { CalendarCheck, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/products";
import { publishedFor } from "@/lib/catalog";

export type UpdatedStampProps = {
  /** ISO date string or Date. */
  date: Date | string;
  author?: string;
  /** Number of products considered, e.g. "14 modeller jämförda". */
  testedCount?: number;
  /**
   * Testsidans slug. Sätts publiceringsdatumet ut vid sidan av uppdaterings-
   * datumet, hämtat ur katalogen.
   *
   * Finns eftersom ett reparationspass över hela sajten ger fyrtio sidor samma
   * `updated` samma dag, och sidan då ser ut att ha uppstått ur ingenting.
   */
  slug?: string;
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
  slug,
  variant = "inline",
  className,
}: UpdatedStampProps) {
  const iso = typeof date === "string" ? date : date.toISOString();

  /* Bara när det säger något nytt. Publicerad och uppdaterad samma dag är en
     nybyggd sida, och då är raden brus. */
  const publicerad = slug ? publishedFor(slug) : undefined;
  const visaPublicerad = publicerad && publicerad !== iso.slice(0, 10);

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
      {visaPublicerad ? (
        <span className="inline-flex items-center gap-1.5">
          Publicerad{" "}
          <time dateTime={publicerad} className="font-medium text-foreground">
            {formatDate(publicerad)}
          </time>
        </span>
      ) : null}
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
