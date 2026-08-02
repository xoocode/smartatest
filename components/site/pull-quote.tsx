import type { ReactNode } from "react";
import { Quote } from "lucide-react";

import { cn } from "@/lib/utils";

export type PullQuoteProps = {
  children: ReactNode;
  /** Eyebrow above the quote, e.g. "Så ser jag på smarta produkter". */
  label?: ReactNode;
  /** Name under the quote. */
  attribution?: ReactNode;
  /**
   * panel — tinted box with a quote glyph, for author pages
   * rule  — accent rule on the left, for breaking up long reviews
   * plain — larger italic text, no chrome
   */
  variant?: "panel" | "rule" | "plain";
  showGlyph?: boolean;
  className?: string;
};

/**
 * First-hand observation lifted out of the body copy. On a comparison page
 * this is what signals the product was actually handled, so it earns its own
 * component rather than a blockquote in the MDX.
 */
export function PullQuote({
  children,
  label,
  attribution,
  variant = "panel",
  showGlyph = true,
  className,
}: PullQuoteProps) {
  return (
    <figure
      data-slot="pull-quote"
      data-variant={variant}
      className={cn(
        variant === "panel" && "rounded-lg bg-muted pad-card",
        variant === "rule" && "border-l-2 border-brand pl-4",
        className,
      )}
    >
      {variant === "panel" && showGlyph ? (
        <Quote
          aria-hidden="true"
          className="mb-2 size-7 text-muted-foreground/40"
        />
      ) : null}

      {label ? (
        <p className="eyebrow mb-2 text-muted-foreground">{label}</p>
      ) : null}

      <blockquote
        className={cn(
          "font-heading text-h3 leading-snug",
          variant === "plain" && "italic",
        )}
      >
        {children}
      </blockquote>

      {attribution ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
