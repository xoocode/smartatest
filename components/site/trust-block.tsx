import type { ElementType } from "react";
import Link from "next/link";
import { BookOpen, Coins, Scale, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

export type TrustPoint = {
  icon: ElementType;
  title: string;
  body: string;
};

/**
 * The standing "why believe us" points.
 *
 * Every serious competitor runs a version of this: Tom's Guide has three
 * separate blocks for it. We had the methodology, which is stronger in
 * substance, but nothing that says out loud why a stranger should trust the
 * verdict. Methodology answers "how"; this answers "why you".
 *
 * Kept as an exported default so every category page states the same four
 * things in the same words. A promise that varies by page is not a promise.
 */
export const DEFAULT_TRUST_POINTS: TrustPoint[] = [
  {
    icon: BookOpen,
    title: "Vi läser experttesterna",
    body: "Ingen redaktion i Sverige testar allt. Vi går igenom de oberoende tester som finns, ställer dem mot varandra och länkar till varenda en så du kan kontrollera oss.",
  },
  {
    icon: Scale,
    title: "Samma viktning för alla",
    body: "Varje produkt bedöms mot samma kriterier med samma vikter, och viktningen står öppet på sidan. Betyget räknas fram ur delbetygen, inte tvärtom.",
  },
  {
    icon: Coins,
    title: "Provision påverkar ingenting",
    body: "Vi tjänar pengar när du handlar via våra länkar. Ingen butik och ingen tillverkare kan betala för en placering, ett betyg eller en utmärkelse.",
  },
  {
    icon: ShieldCheck,
    title: "Två personer, inte en",
    body: "Den som skriver testet är inte den som granskar det. Priser, mätvärden och påståenden kontrolleras mot källan innan publicering.",
  },
];

export type TrustBlockProps = {
  points?: TrustPoint[];
  /**
   * cards — bordered grid, for a dedicated section
   * bar   — single row of compact points, for above a comparison table
   */
  variant?: "cards" | "bar";
  columns?: 2 | 4;
  /** Vidarelänkarna under korten. Av på sidor som själva är målet. */
  showLinks?: boolean;
  className?: string;
};

export function TrustBlock({
  points = DEFAULT_TRUST_POINTS,
  variant = "cards",
  columns = 4,
  showLinks = true,
  className,
}: TrustBlockProps) {
  if (!points.length) return null;

  if (variant === "bar") {
    return (
      <ul
        data-slot="trust-block"
        data-variant="bar"
        className={cn(
          "themed-border flex flex-col gap-3 rounded-lg bg-muted pad-card sm:flex-row sm:flex-wrap",
          className,
        )}
      >
        {points.map((point) => (
          <li
            key={point.title}
            className="flex min-w-0 flex-1 items-start gap-2.5"
          >
            <point.icon
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-brand"
            />
            <span className="text-sm font-medium">{point.title}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={className}>
      <ul
        data-slot="trust-block"
        data-variant="cards"
        className={cn(
          "grid gap-4",
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {points.map((point) => (
          <li
            key={point.title}
            className="themed-border flex flex-col gap-2 rounded-lg bg-card pad-card"
          >
            <point.icon aria-hidden="true" className="size-5 text-brand" />
            <p className="font-heading">{point.title}</p>
            <p className="text-sm text-muted-foreground">{point.body}</p>
          </li>
        ))}
      </ul>

      {/* Punkterna ovan är påståenden. De två länkarna är där påståendena går
       *  att kontrollera, och utan dem stod avsnittet "Därför kan du lita på
       *  oss" på varje testsida utan en enda väg vidare. Bara i kortläget:
       *  bar-varianten sitter ovanför en tabell där en länk konkurrerar med
       *  köpknapparna. */}
      {showLinks ? (
        <p className="mt-4 text-sm text-muted-foreground">
          <Link
            href="/sa-testar-vi"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            Hela metoden
          </Link>{" "}
          och{" "}
          <Link
            href="/om-oss"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            vilka vi är
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
