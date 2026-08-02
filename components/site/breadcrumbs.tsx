import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

export type Crumb = {
  label: string;
  /** Omit on the current page. */
  href?: string;
};

export type BreadcrumbsProps = {
  /** The trail after "Hem". The last entry is the current page. */
  items: Crumb[];
  /** Prepend the site root. */
  showHome?: boolean;
  homeLabel?: string;
  /** plain = inline text, bar = tinted strip across the page. */
  variant?: "plain" | "bar";
  /**
   * Emit BreadcrumbList JSON-LD. Off by default so the styleguide and other
   * previews do not publish structured data for pages that do not exist.
   */
  schema?: boolean;
  className?: string;
};

/**
 * URL hierarchy is flat by decision (see .agent/plan-components.md), but the
 * taxonomy is not: a category page reads Hem › Smart hem › Smart belysning
 * while still living at /smart-belysning. Build the trail with
 * `categoryTrail()` rather than assembling it per page.
 *
 * A crumb with no `href` renders as plain text and emits no `item` in the
 * JSON-LD. Google only expects that of the final entry, so an unlinked middle
 * crumb is tolerated but weaker than one pointing at a real hub page.
 */
export function Breadcrumbs({
  items,
  showHome = true,
  homeLabel = "Hem",
  variant = "plain",
  schema = false,
  className,
}: BreadcrumbsProps) {
  const trail: Crumb[] = showHome
    ? [{ label: homeLabel, href: "/" }, ...items]
    : items;

  const jsonLd = schema
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.label,
          /* The current page carries no `item`, per Google's guidance. */
          ...(crumb.href ? { item: `${SITE.url}${crumb.href}` } : {}),
        })),
      }
    : null;

  return (
    <nav
      data-slot="breadcrumbs"
      aria-label="Brödsmulor"
      className={cn(
        "text-sm",
        variant === "bar" && "border-b border-border bg-muted",
        className,
      )}
    >
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5",
          variant === "bar" && "px-4 py-2.5 sm:px-6",
        )}
      >
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              {i > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted-foreground"
                />
              ) : null}

              {crumb.href && !last ? (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={last ? "text-foreground" : "text-muted-foreground"}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </nav>
  );
}
