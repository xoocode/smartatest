import { cn } from "@/lib/utils";
import { formatPrice, type Product } from "@/lib/products";
import { AffiliateCta } from "@/components/product/affiliate-cta";
import { IMAGE_SIZES, ProductImage } from "@/components/product/product-image";
import { ScoreBadge } from "@/components/product/score-badge";

export type QuickPickPanelProps = {
  products: Product[];
  title?: string;
  /** How many rows to show. */
  limit?: number;
  /**
   * panel  — static box, sits beside the hero
   * sticky — follows the reader down the page from lg up
   * bare   — no header bar or border, for embedding in another card
   */
  variant?: "panel" | "sticky" | "bare";
  showImage?: boolean;
  showScore?: boolean;
  /** Anchor link under the list, e.g. to the full comparison table. */
  footerHref?: string;
  footerLabel?: string;
  className?: string;
};

/**
 * The above-the-fold shortlist. Highest-value real estate on a comparison
 * page: a reader who already knows what they want converts from here without
 * scrolling.
 */
export function QuickPickPanel({
  products,
  title = "Bäst i test",
  limit = 5,
  variant = "panel",
  showImage = true,
  showScore = true,
  footerHref,
  footerLabel = "Se alla testvinnare",
  className,
}: QuickPickPanelProps) {
  const rows = products.slice(0, limit);

  return (
    <aside
      data-slot="quick-pick-panel"
      data-variant={variant}
      className={cn(
        /* Container queries, not viewport breakpoints: this panel is usually a
           fixed-width sidebar, so what matters is how wide the panel is, not
           how wide the window is. With `sm:` the price column appeared on
           desktop even in a 22rem rail and squeezed product names to "Whit…". */
        "@container",
        variant !== "bare" &&
          "themed-border overflow-hidden rounded-lg bg-card shadow-card",
        variant === "sticky" && "lg:sticky lg:top-20",
        className,
      )}
    >
      {variant !== "bare" ? (
        <h2 className="bg-primary px-4 py-3 text-center font-heading text-primary-foreground">
          {title}
        </h2>
      ) : null}

      <ol className="divide-y divide-border">
        {rows.map((product, i) => (
          <li
            key={product.id}
            className="flex items-center gap-3 px-3 py-3 sm:px-4"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-award text-xs font-semibold text-award-foreground tabular-nums">
              {i + 1}
            </span>

            {showImage ? (
              <ProductImage
                src={product.image}
                alt={product.name}
                fallbackLabel={product.brand}
                sizes={IMAGE_SIZES.thumb}
                className="size-12 shrink-0"
              />
            ) : null}

            {/* Name, price and CTA stack until the panel is wide enough for a
                single row. Six columns never fit a 22rem sidebar, and the
                name is the column that loses. */}
            <div className="flex min-w-0 flex-1 flex-col gap-1.5 @sm:flex-row @sm:items-center @sm:gap-3">
              <div className="min-w-0 flex-1">
                {/* One line. Names that do not fit get a `shortName` in the
                    product data, which is an editorial decision about which
                    words matter. `truncate` stays as the guard for anything
                    that slips through, so a long name degrades to an ellipsis
                    rather than pushing the price and CTA out of the row. */}
                <p className="truncate text-sm font-medium">
                  {product.shortName ?? product.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {product.superlative ?? product.brand}
                </p>
              </div>

              {/* Score leads on the left, price and CTA close on the right, so
                  the meta line spans the row instead of bunching everything at
                  the trailing edge. `ml-auto` on the inner group does the
                  pushing: an auto inline-start margin also cancels the stretch
                  this element would otherwise inherit as a column-flex child. */}
              <div className="flex items-center gap-2.5">
                {showScore ? (
                  <ScoreBadge score={product.score} variant="bare" size="sm" />
                ) : null}

                <div className="ml-auto flex shrink-0 items-center gap-2.5">
                  <p className="font-heading text-sm text-brand">
                    {formatPrice(product.price, product.currency)}
                  </p>

                  <AffiliateCta
                    href={product.merchantUrl}
                    affiliateUrl={product.affiliateUrl}
                    merchant={product.merchant}
                    label="Till butik"
                    productId={product.id}
                    placement="quick-pick"
                    size="sm"
                    showIcon={false}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {footerHref ? (
        <a
          href={footerHref}
          className="block border-t border-border px-4 py-3 text-center text-sm font-medium text-primary hover:bg-muted"
        >
          {footerLabel}
        </a>
      ) : null}
    </aside>
  );
}
