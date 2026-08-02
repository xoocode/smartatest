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

export type ProductCardProps = {
  product: Product;
  /**
   * grid  — vertical card for a 2–4 column grid
   * row   — horizontal card, image left, works in a ranked list
   * compact — minimal, for sidebars and "andra alternativ"
   */
  variant?: "grid" | "row" | "compact";
  /** Rank number shown as a chip, for "topp 5" lists. */
  rank?: number;
  showPros?: boolean;
  showSpecs?: boolean;
  showScore?: boolean;
  ctaLabel?: string;
  placement?: string;
  className?: string;
};

export function ProductCard({
  product,
  variant = "grid",
  rank,
  showPros = false,
  showSpecs = false,
  showScore = true,
  ctaLabel,
  placement = "product-card",
  className,
}: ProductCardProps) {
  const stars = starsFromScore(product);

  const header = (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="eyebrow text-muted-foreground">{product.brand}</p>
        <h3 className="text-h3 mt-0.5">{product.name}</h3>
      </div>
      {showScore ? (
        <ScoreBadge
          score={product.score}
          variant={variant === "compact" ? "outline" : "solid"}
          size={variant === "compact" ? "sm" : "md"}
        />
      ) : null}
    </div>
  );

  const meta = (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <RatingStars value={stars} size="sm" showValue />
        {product.award ? (
          <AwardBadge kind={product.award} variant="pill" />
        ) : null}
      </div>
      <UserRating product={product} />
    </div>
  );

  if (variant === "compact") {
    return (
      <article
        data-slot="product-card"
        data-variant="compact"
        className={cn(
          "themed-border flex items-center gap-3 rounded-lg bg-card pad-card",
          className,
        )}
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          fallbackLabel={product.brand}
          sizes={IMAGE_SIZES.small}
          className="size-16 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-muted-foreground">{product.brand}</p>
          <p className="font-medium">{product.name}</p>
          <RatingStars value={stars} size="sm" className="mt-1" />
        </div>
        <div className="shrink-0 text-right">
          <PriceTag price={product.price} size="sm" />
        </div>
      </article>
    );
  }

  if (variant === "row") {
    return (
      <article
        data-slot="product-card"
        data-variant="row"
        className={cn(
          "themed-border relative rounded-lg bg-card pad-card shadow-card",
          className,
        )}
      >
        <div className="flex flex-col gap-[var(--space-card)] sm:flex-row">
          <div className="flex shrink-0 items-start gap-3 sm:w-40 sm:flex-col">
            {typeof rank === "number" ? (
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm text-primary-foreground">
                {rank}
              </span>
            ) : null}
            <ProductImage
              src={product.image}
              alt={product.name}
              fallbackLabel={product.brand}
              className="size-24 sm:size-auto sm:w-full"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-row">
            {header}
            <p className="text-muted-foreground">{product.tagline}</p>
            {meta}
            {showSpecs ? (
              <SpecList specs={product.specs} highlightOnly size="sm" />
            ) : null}
            {showPros ? (
              <ProsCons
                pros={product.pros}
                cons={product.cons}
                size="sm"
                variant="side"
              />
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col items-stretch justify-between gap-row sm:w-48">
            <PriceTag
              price={product.price}
              oldPrice={product.oldPrice}
              merchant={product.merchant}
              size="lg"
              tone="brand"
            />
            <AffiliateCta
              href={product.merchantUrl}
              affiliateUrl={product.affiliateUrl}
              merchant={product.merchant}
              label={ctaLabel}
              productId={product.id}
              placement={placement}
              block
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      data-slot="product-card"
      data-variant="grid"
      className={cn(
        "themed-border flex flex-col gap-row rounded-lg bg-card pad-card shadow-card",
        className,
      )}
    >
      <ProductImage
        src={product.image}
        alt={product.name}
        fallbackLabel={product.brand}
        ratio="wide"
      />
      {header}
      <p className="text-sm text-muted-foreground">{product.tagline}</p>
      {meta}
      {showSpecs ? (
        <SpecList specs={product.specs} highlightOnly size="sm" />
      ) : null}
      {showPros ? (
        <ProsCons
          pros={product.pros}
          cons={product.cons}
          size="sm"
          variant="stacked"
        />
      ) : null}
      <div className="mt-auto flex flex-col gap-row pt-1">
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
          label={ctaLabel}
          productId={product.id}
          placement={placement}
          size="lg"
          block
        />
      </div>
    </article>
  );
}
