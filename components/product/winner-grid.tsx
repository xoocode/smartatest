import { cn } from "@/lib/utils";
import { AWARD_LABELS, type Product } from "@/lib/products";
import { ProductImage } from "@/components/product/product-image";
import { RatingStars } from "@/components/product/rating-stars";

export type WinnerGridProps = {
  products: Product[];
  /**
   * grid — cards, 2–4 per row. The visual table of contents.
   * list — one per row, denser, better for long rankings.
   */
  variant?: "grid" | "list";
  columns?: 2 | 3 | 4;
  showImage?: boolean;
  showRating?: boolean;
  /** Anchor prefix for the deep reviews further down the page. */
  hrefPrefix?: string;
  className?: string;
};

const columnClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Every ranked product as a numbered card, each linking to its own deep
 * review. Sits between the winner card and the comparison table and doubles as
 * a visual table of contents.
 *
 * Distinct from ComparisonTable (no specs, no prices, no CTA) and from
 * ProductCard grid (carries the rank and the category superlative).
 */
export function WinnerGrid({
  products,
  variant = "grid",
  columns = 3,
  showImage = true,
  showRating = true,
  hrefPrefix = "#",
  className,
}: WinnerGridProps) {
  return (
    <ol
      data-slot="winner-grid"
      data-variant={variant}
      className={cn(
        variant === "grid"
          ? cn("grid gap-4", columnClass[columns])
          : "flex flex-col divide-y divide-border",
        className,
      )}
    >
      {products.map((product, i) => {
        const label =
          product.superlative ??
          (product.award ? AWARD_LABELS[product.award] : null);

        if (variant === "list") {
          return (
            <li key={product.id} className="flex items-center gap-3 py-3">
              <span className="font-heading text-h3 w-7 shrink-0 text-muted-foreground tabular-nums">
                {i + 1}
              </span>
              {showImage ? (
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  fallbackLabel={product.brand}
                  className="size-12 shrink-0"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                {label ? (
                  <p className="eyebrow text-brand">{label}</p>
                ) : null}
                <a
                  href={`${hrefPrefix}${product.id}`}
                  className="font-medium underline-offset-2 hover:underline"
                >
                  {product.brand} {product.name}
                </a>
              </div>
              {showRating ? (
                <RatingStars
                  value={product.rating}
                  size="sm"
                  showValue
                  className="shrink-0"
                />
              ) : null}
            </li>
          );
        }

        return (
          <li
            key={product.id}
            className="themed-border relative flex flex-col items-center gap-2 rounded-lg bg-card pad-card text-center"
          >
            <span className="absolute top-2 left-2 flex size-7 items-center justify-center rounded-full bg-award font-heading text-sm text-award-foreground tabular-nums">
              {i + 1}
            </span>

            {showImage ? (
              <ProductImage
                src={product.image}
                alt={product.name}
                fallbackLabel={product.brand}
                className="size-24"
              />
            ) : null}

            {label ? <p className="eyebrow text-brand">{label}</p> : null}

            <a
              href={`${hrefPrefix}${product.id}`}
              className="font-medium underline-offset-2 hover:underline"
            >
              {product.brand} {product.name}
            </a>

            {showRating ? (
              <RatingStars value={product.rating} size="sm" showValue />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
