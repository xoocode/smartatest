import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

export type UserRatingProps = {
  product: Product;
  /**
   * inline  — one line, for cards and reviews
   * compact — stacked, for a narrow table cell
   * block   — labelled row, for a spec-style list
   */
  variant?: "inline" | "compact" | "block";
  /** Link the figure to the merchant page it came from. */
  link?: boolean;
  /**
   * Rubrik före talet.
   *
   * Tom som standard. `block`-varianten är en märkt rad i en specifikationslista
   * och sätter därför sin egen om ingen anges, men `inline` skriver ingenting:
   * "62 omdömen hos Kjell & Company" säger redan vems omdömen det är, och
   * "Användare" framför blev ett ord som bara upprepade nästa mening.
   */
  label?: string;
  className?: string;
};

const ratingFormat = new Intl.NumberFormat("sv-SE", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/**
 * The merchant's own crowd rating, attributed to the shop we link to anyway.
 *
 * The source link is deliberately quiet: no underline until hover, and then a
 * dashed one. It has to be visible enough to be verifiable and dull enough not
 * to compete with the CTA, which goes to the same shop.
 *
 * Never rendered inside ProductSchema. See the UserRating type for why.
 */
export function UserRating({
  product,
  variant = "inline",
  link = true,
  label,
  className,
}: UserRatingProps) {
  const rating = product.userRating;
  if (!rating) return null;

  const scale = rating.scale ?? 5;
  const value = `${ratingFormat.format(rating.value)} av ${scale}`;
  const source = `${rating.count} omdömen hos ${product.merchant}`;

  const sourceNode = link ? (
    <a
      href={product.merchantUrl}
      target="_blank"
      rel="noopener"
      /* Quiet by default, dashed on hover. Verifiable without pulling
         attention off the buy button pointing at the same shop. */
      className="decoration-dashed underline-offset-4 hover:underline"
    >
      {source}
    </a>
  ) : (
    source
  );

  if (variant === "compact") {
    return (
      <span
        data-slot="user-rating"
        data-variant="compact"
        className={cn("flex flex-col text-xs text-muted-foreground", className)}
      >
        {/* Set in the heading face at the same size and weight as the score
            badge in the neighbouring column, so the two figures read as
            comparable measures rather than one headline and one footnote.
            Only the colour separates them: the scale stays muted. */}
        <span className="font-heading text-xs tabular-nums">
          <span className="text-foreground">
            {ratingFormat.format(rating.value)}
          </span>
          <span>/{scale}</span>
        </span>
        <span>{sourceNode}</span>
      </span>
    );
  }

  if (variant === "block") {
    return (
      <span
        data-slot="user-rating"
        data-variant="block"
        className={cn("flex items-baseline justify-between gap-3", className)}
      >
        <span className="text-sm text-muted-foreground">
          {label ?? "Användare"}
        </span>
        <span className="text-sm">
          <span className="font-medium tabular-nums">{value}</span>{" "}
          <span className="text-muted-foreground">({sourceNode})</span>
        </span>
      </span>
    );
  }

  return (
    <span
      data-slot="user-rating"
      data-variant="inline"
      className={cn("text-sm text-muted-foreground", className)}
    >
      {label ? <>{label} </> : null}
      <span className="tabular-nums">
        <span className="font-medium text-foreground">
          {ratingFormat.format(rating.value)}
        </span>
        /{scale}
      </span>
      {/* Separator, not a space. "5,0/5 73 omdömen" ran the scale straight
          into the count and read as one number. */}
      {" · "}
      {sourceNode}
    </span>
  );
}
