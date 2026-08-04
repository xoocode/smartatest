import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { fullName, starsFromScore, type Product } from "@/lib/products";
import { AffiliateCta } from "@/components/product/affiliate-cta";
import { AwardBadge } from "@/components/product/award-badge";
import { PriceTag } from "@/components/product/price-tag";
import { IMAGE_SIZES, ProductImage } from "@/components/product/product-image";
import { ProsCons } from "@/components/product/pros-cons";
import { RatingStars } from "@/components/product/rating-stars";
import { ScoreBadge } from "@/components/product/score-badge";
import { VerdictText } from "@/components/product/verdict-text";
import { UserRating } from "@/components/product/user-rating";
import { SpecList } from "@/components/product/spec-list";

/**
 * Fördelar och nackdelar som en egen tonad platta på skrivbordet.
 *
 * ## Varför en platta och inte bara marginal
 *
 * Blocket flöt ihop med omdömet ovanför och specifikationerna under. Marginal
 * ensam löste det inte, och skälet är att ytorna omkring har samma bakgrund:
 * ögat får ingen kant att stanna vid, hur mycket luft man än lägger till. Sex
 * varianter provkördes en per produkt på /brandvarnare 2026-08-03, och den
 * tonade plattan valdes framför hårlinjer och framför två egna kort. Kort blev
 * för tungt när tio recensioner har dem.
 *
 * Bara `lg:`. Staplat på mobil finns ingen tvåspalt att skilja blocket från,
 * och en tonad platta som går kant i kant med kortet läser sig som ett fel.
 *
 * Delas med `WinnerCard`, som har samma konstant. Ändras den ena ska den andra
 * följa med, annars ser vinnaren och recensionerna olika ut på samma sida.
 */
export const PROS_CONS_PANEL =
  "lg:my-[var(--space-row)] lg:rounded-lg lg:bg-muted lg:p-[var(--space-card)]";

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
      {/* Vågrätt luft är inte samma sak som lodrät. Staplat på mobil är
          `--space-card` rätt avstånd mellan bild och text, men i två spalter
          på skrivbordet blir samma tal trångt: bildspalten är 14 rem och
          texten börjar direkt efter den. `lg:gap-x` höjer bara kolumnavståndet
          och lämnar mobilstapeln orörd. */}
      <div className="flex flex-col gap-[var(--space-card)] lg:flex-row lg:gap-x-block">
        {/* div, inte aside. Bilden och köpknappen är en del av recensionen,
            inte ett sidoinnehåll bredvid den, och ett aside här gav fem extra
            complementary-landmärken inuti main på en sida med fem produkter.
            Landmärken ska hjälpa navigering, inte fylla listan. */}
        {variant === "full" ? (
          <div className="flex shrink-0 flex-col gap-row lg:w-56">
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
              productName={fullName(product)}
              placement="product-review"
              size="lg"
              block
            />
          </div>
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

          {children ??
            (product.verdict ? (
              <VerdictText
                text={product.verdict}
                className="text-muted-foreground"
              />
            ) : null)}

          <ProsCons
            pros={product.pros}
            cons={product.cons}
            size="sm"
            className={PROS_CONS_PANEL}
          />

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
                productName={fullName(product)}
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
