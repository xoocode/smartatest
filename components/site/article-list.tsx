import Link from "next/link";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/products";

export type ArticleListItem = {
  href: string;
  title: string;
  /** ISO date string. Omitted while a page is still unpublished. */
  date?: string;
  author?: string;
  /** Small label above the title, e.g. the category. */
  kicker?: string;
  /** Shown instead of a date, e.g. "Planerad". */
  status?: string;
};

export type ArticleListProps = {
  items: ArticleListItem[];
  /** rows = hairline-separated list, cards = bordered grid. */
  variant?: "rows" | "cards";
  className?: string;
};

export function ArticleList({
  items,
  variant = "rows",
  className,
}: ArticleListProps) {
  return (
    <ul
      data-slot="article-list"
      data-variant={variant}
      className={cn(
        variant === "cards"
          ? "grid gap-4 sm:grid-cols-2"
          : "flex flex-col divide-y divide-border",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.href}
          className={cn(
            variant === "cards"
              ? "themed-border rounded-lg bg-card pad-card"
              : "py-3 first:pt-0 last:pb-0",
          )}
        >
          {item.kicker ? (
            <p className="eyebrow mb-1 text-muted-foreground">{item.kicker}</p>
          ) : null}
          <Link
            href={item.href}
            className="font-medium underline-offset-2 hover:underline"
          >
            {item.title}
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            {item.date ? (
              <time dateTime={item.date}>{formatDate(item.date)}</time>
            ) : (
              item.status
            )}
            {item.author ? ` · ${item.author}` : null}
          </p>
        </li>
      ))}
    </ul>
  );
}
