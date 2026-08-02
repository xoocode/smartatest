import { cn } from "@/lib/utils";
import type { Spec } from "@/lib/products";

export type SpecListProps = {
  specs: Spec[];
  /** rows = label/value lines, grid = two columns, inline = comma separated. */
  variant?: "rows" | "grid" | "inline";
  /** Only render specs flagged with highlight. */
  highlightOnly?: boolean;
  size?: "sm" | "md";
  className?: string;
};

export function SpecList({
  specs,
  variant = "rows",
  highlightOnly = false,
  size = "md",
  className,
}: SpecListProps) {
  const items = highlightOnly ? specs.filter((s) => s.highlight) : specs;
  const textSize = size === "sm" ? "text-sm" : "";

  if (variant === "inline") {
    return (
      <p
        data-slot="spec-list"
        className={cn("text-muted-foreground", textSize, className)}
      >
        {items.map((s) => `${s.label}: ${s.value}`).join(" · ")}
      </p>
    );
  }

  return (
    <dl
      data-slot="spec-list"
      className={cn(
        variant === "grid"
          ? "grid grid-cols-1 gap-x-[var(--space-card)] sm:grid-cols-2"
          : "flex flex-col",
        textSize,
        className,
      )}
    >
      {items.map((s) => (
        <div
          key={s.label}
          className="flex items-baseline justify-between gap-4 border-b border-border/70 py-2 last:border-0"
        >
          <dt className="text-muted-foreground">{s.label}</dt>
          <dd className="text-right font-medium">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
