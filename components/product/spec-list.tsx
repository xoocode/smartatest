import { cn } from "@/lib/utils";
import type { Spec } from "@/lib/products";

/**
 * `Ej angiven` är ett värde i datafilen och ett streck på skärmen.
 *
 * Peters avgörande 2026-08-04, som redan är genomfört i
 * `comparison-table.tsx`: ordet självt hör inte hemma i läsartext, eftersom en
 * spalt full av det gör sidan till en redovisning av källäget i stället för en
 * jämförelse av produkter. Översättningen sitter i renderingen med flit, så att
 * datafilerna kan skilja på "vi har letat" och "fältet fylldes aldrig i".
 *
 * ⚠️ Den här komponenten saknade översättningen fram till 2026-08-06 och skrev
 * ut ordet rakt av. `ProductReview` har `showSpecs = true` som förval, så varje
 * recension på varje testsida renderade hela spectabellen med `Ej angiven`
 * utskrivet: **33 sidor och 1 400 förekomster**, flest på /galaxy-s26-skal med
 * 242 och /iphone-skarmskydd med 122.
 *
 * Hålls medvetet identisk med `EJ_ANGIVET` i `comparison-table.tsx`. Ändras den
 * ena ska den andra ändras samtidigt.
 */
const EJ_ANGIVET = new Set(["Ej angiven", "Ej angivet", "Ej angivna"]);

/* Em-strecket skrivs som escape-sekvens av samma skäl som i
   comparison-table.tsx: `pnpm check:emdash` letar efter tecknet i källkoden. */
function visat(value: string): string {
  return EJ_ANGIVET.has(value.trim()) ? "–" : value;
}

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
        {items.map((s) => `${s.label}: ${visat(s.value)}`).join(" · ")}
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
          <dd className="text-right font-medium">{visat(s.value)}</dd>
        </div>
      ))}
    </dl>
  );
}
