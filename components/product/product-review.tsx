import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { starsFromScore, type Product } from "@/lib/products";
import { AffiliateCta } from "@/components/product/affiliate-cta";
import { AwardBadge } from "@/components/product/award-badge";
import { PriceTag } from "@/components/product/price-tag";
import { IMAGE_SIZES, ProductImage } from "@/components/product/product-image";
import { ProsCons } from "@/components/product/pros-cons";
import { RatingStars } from "@/components/product/rating-stars";
import { ScoreBadge } from "@/components/product/score-badge";
import { UserRating } from "@/components/product/user-rating";
import { SpecList } from "@/components/product/spec-list";

export type ProductReviewProps = {
  product: Product;
  /** Position in the ranked list, rendered in the heading: "2. Roborock …". */
  rank?: number;
  /**
   * full    — image sidebar plus body, the default deep review
   * compact — no sidebar, for the tail of the ranking
   */
  variant?: "full" | "compact";
  /** Long-form copy. Falls back to product.verdict. */
  children?: ReactNode;
  showSpecs?: boolean;
  className?: string;
};

/** One of the 200–400 word deep reviews below the comparison table. */
export function ProductReview({
  product,
  rank,
  variant = "full",
  children,
  showSpecs = true,
  className,
}: ProductReviewProps) {
  const stars = starsFromScore(product);
  const heading = rank ? `${rank}. ${product.brand} ${product.name}` : `${product.brand} ${product.name}`;

  return (
    <article
      data-slot="product-review"
      data-variant={variant}
      id={product.id}
      style={{ scrollMarginTop: "5rem" }}
      className={cn(
        "themed-border rounded-lg bg-card pad-card",
        variant === "full" && "shadow-card",
        className,
      )}
    >
      <div className="flex flex-col gap-[var(--space-card)] lg:flex-row">
        {variant === "full" ? (
          <aside className="flex shrink-0 flex-col gap-row lg:w-56">
            <ProductImage
              src={product.image}
              alt={product.name}
              fallbackLabel={product.brand}
              sizes={IMAGE_SIZES.hero}
            />
            <ScoreBadge
              score={product.score}
              showMax
              size="lg"
              label="Testbetyg"
              className="self-center"
            />
            <PriceTag
              price={product.price}
              oldPrice={product.oldPrice}
              merchant={product.merchant}
              tone="brand"
            />
            <AffiliateCta
              href={product.merchantUrl}
              affiliateUrl={product.affiliateUrl}
              merchant={product.merchant}
              productId={product.id}
              placement="product-review"
              size="lg"
              block
            />
          </aside>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-row">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-h3">{heading}</h3>
              <p className="mt-1 text-muted-foreground">{product.tagline}</p>
            </div>
            {product.award ? <AwardBadge kind={product.award} /> : null}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <RatingStars value={stars} showValue />
            {variant === "compact" ? (
              <ScoreBadge score={product.score} size="sm" variant="outline" />
            ) : null}
            <UserRating product={product} />
          </div>

          {children ?? (
            <p className="text-muted-foreground">{product.verdict}</p>
          )}

          <ProsCons pros={product.pros} cons={product.cons} size="sm" />

          {showSpecs ? <SpecList specs={product.specs} variant="grid" size="sm" /> : null}

          {variant === "compact" ? (
            <div className="flex flex-wrap items-center justify-between gap-row pt-1">
              <PriceTag
                price={product.price}
                oldPrice={product.oldPrice}
                merchant={product.merchant}
                tone="brand"
              />
              <AffiliateCta
                href={product.merchantUrl}
                affiliateUrl={product.affiliateUrl}
                merchant={product.merchant}
                productId={product.id}
                placement="product-review-compact"
                size="lg"
              />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
