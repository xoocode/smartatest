import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { MARKET_LABELS, sourceSummary, type Source } from "@/lib/sources";

export type SourceListProps = {
  sources: Source[];
  /**
   * list    — bordered card, one row per source with note and market
   * compact — plain rows, no card, for a sidebar or a footer
   * inline  — a single sentence of linked publisher names
   * summary — the collation panel: what we read, counted from the data
   */
  variant?: "list" | "compact" | "inline" | "summary";
  /**
   * Pass `null` to suppress it. Not `undefined`: a default parameter only
   * applies to `undefined`, so `title={undefined}` silently restores the
   * default and the heading appears twice under a Section of the same name.
   */
  title?: string | null;
  intro?: string;
  /** Prefix for the inline variant, e.g. "Vi har vägt in tester från". */
  inlineLead?: string;
  className?: string;
};

/**
 * Citations are ordinary editorial links, so no `nofollow` and no `sponsored`.
 * Marking a genuine source as sponsored tells Google the opposite of what we
 * mean, and it is exactly the signal that makes a citation worth carrying.
 */
function SourceLink({
  source,
  children,
  className,
}: {
  source: Source;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("hover:underline", className)}
    >
      {children}
    </a>
  );
}

export function SourceList({
  sources,
  variant = "list",
  title = "Källor och andra tester",
  intro,
  inlineLead = "Vi har vägt in tester från",
  className,
}: SourceListProps) {
  if (!sources.length) return null;

  if (variant === "summary") {
    const { testCount, publishers, marketLabels } = sourceSummary(sources);
    const stats = [
      { value: String(testCount), label: "experttester" },
      { value: String(publishers.length), label: "publikationer" },
      { value: String(marketLabels.length), label: "marknader" },
    ];

    return (
      <div
        data-slot="source-list"
        data-variant="summary"
        className={cn(
          "themed-border flex flex-col gap-row rounded-lg bg-card pad-card",
          className,
        )}
      >
        {title ? <p className="font-heading text-lg">{title}</p> : null}
        {intro ? <p className="text-muted-foreground">{intro}</p> : null}

        <dl className="grid grid-cols-3 gap-3">
          {/* col-reverse keeps the dl valid (dt before dd in the DOM) while
              showing the number above its label. Do not add a second visible
              copy of the label — a sr-only dt plus a visible p reads the label
              twice in a screen reader. */}
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="font-heading text-h2 text-brand tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-1.5 text-sm">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Källor: </span>
            {publishers.join(", ")}.
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Marknader: </span>
            {marketLabels.join(", ")}.
          </p>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <p
        data-slot="source-list"
        data-variant="inline"
        className={cn("text-sm text-muted-foreground", className)}
      >
        {inlineLead}{" "}
        {sources.map((source, i) => (
          <span key={source.url}>
            {i > 0 ? (i === sources.length - 1 ? " och " : ", ") : null}
            <SourceLink source={source} className="text-foreground">
              {source.publisher}
            </SourceLink>
          </span>
        ))}
        .
      </p>
    );
  }

  const rows = (
    <ul className="flex flex-col gap-stack">
      {sources.map((source) => (
        <li key={source.url} className="flex flex-col gap-0.5">
          <SourceLink
            source={source}
            className="inline-flex items-baseline gap-1.5 font-medium"
          >
            <span>{source.title}</span>
            <ExternalLink
              aria-hidden="true"
              className="size-3.5 shrink-0 self-center text-muted-foreground"
            />
          </SourceLink>
          <p className="text-sm text-muted-foreground">
            {source.publisher}
            {source.market ? ` · ${MARKET_LABELS[source.market]}` : null}
            {source.date ? ` · ${source.date}` : null}
          </p>
          {source.note ? (
            <p className="text-sm text-muted-foreground">{source.note}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );

  if (variant === "compact") {
    return (
      <div
        data-slot="source-list"
        data-variant="compact"
        className={cn("flex flex-col gap-row", className)}
      >
        {title ? <p className="font-heading">{title}</p> : null}
        {intro ? (
          <p className="text-sm text-muted-foreground">{intro}</p>
        ) : null}
        {rows}
      </div>
    );
  }

  return (
    <div
      data-slot="source-list"
      data-variant="list"
      className={cn(
        "themed-border flex flex-col gap-row rounded-lg bg-card pad-card",
        className,
      )}
    >
      {title ? <p className="font-heading text-lg">{title}</p> : null}
      {intro ? <p className="text-muted-foreground">{intro}</p> : null}
      {rows}
    </div>
  );
}
