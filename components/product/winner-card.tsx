import { cn } from "@/lib/utils";
import { fullName, type Product } from "@/lib/products";
import { AffiliateCta } from "@/components/product/affiliate-cta";
import { VerdictText } from "@/components/product/verdict-text";
import { AwardBadge } from "@/components/product/award-badge";
import { PriceTag } from "@/components/product/price-tag";
import { IMAGE_SIZES, ProductImage } from "@/components/product/product-image";
import { PROS_CONS_PANEL } from "@/components/product/product-review";
import { ProsCons } from "@/components/product/pros-cons";
import { ScoreBadge } from "@/components/product/score-badge";
import { UserRating } from "@/components/product/user-rating";
import { SpecList } from "@/components/product/spec-list";

export type WinnerCardProps = {
  product: Product;
  /**
   * split   — image left, verdict right. The default above-the-fold hero.
   * banner  — wide strip with an award bar across the top.
   * stacked — single column, best in a sidebar or on mobile-first pages.
   */
  variant?: "split" | "banner" | "stacked";
  /** Overrides the award label, e.g. "Bäst i test 2026". */
  awardLabel?: string;
  /** Editorial one-paragraph justification. */
  summary?: string;
  showProsCons?: boolean;
  showSpecs?: boolean;
  ctaNote?: string;
  className?: string;
};

/**
 * The above-the-fold verdict card. Every comparison page has exactly one, and
 * it carries the highest-value affiliate click on the page.
 */
export function WinnerCard({
  product,
  variant = "split",
  awardLabel,
  summary,
  showProsCons = true,
  showSpecs = false,
  ctaNote,
  className,
}: WinnerCardProps) {
  const award = product.award ?? "winner";

  const verdict = summary ?? product.verdict ?? product.tagline;

  const cta = (
    <AffiliateCta
      href={product.merchantUrl}
      affiliateUrl={product.affiliateUrl}
      merchant={product.merchant}
      productId={product.id}
      productName={fullName(product)}
      placement="winner-card"
      position={1}
      size="2xl"
      note={ctaNote}
      block
    />
  );

  const body = (
    <div className="flex min-w-0 flex-1 flex-col gap-row">
      <div>
        <p className="eyebrow text-muted-foreground">{product.brand}</p>
        <h2 className="text-h2 mt-1">{product.name}</h2>
      </div>

      {/* Our score and the crowd's, not our score twice. The star row rendered
          the same weighted average as the badge on a 0–5 scale, so the card
          showed 4,5 and 9,0 side by side and asked the reader to work out that
          they were one number. The user rating is a genuinely second opinion. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <ScoreBadge score={product.score} showMax label="Testbetyg" size="sm" />
        <UserRating product={product} variant="inline" />
      </div>

      <VerdictText text={verdict} className="text-muted-foreground" />

      {showSpecs ? (
        <SpecList specs={product.specs} highlightOnly variant="grid" size="sm" />
      ) : null}

      {/* Samma tonade platta som i recensionskortet, från samma konstant, så
          att vinnaren och recensionerna längre ned på sidan inte ser olika ut.
          Undantaget är `stacked`, som är en enspaltsvariant för sidokolumner:
          där är kortet redan smalt, och en platta innanför en platta läser sig
          som ett fel snarare än som en avgränsning. */}
      {showProsCons ? (
        <ProsCons
          pros={product.pros}
          cons={product.cons}
          variant="side"
          size="sm"
          className={variant === "stacked" ? undefined : PROS_CONS_PANEL}
        />
      ) : null}
    </div>
  );

  const purchase = (
    <div className="flex shrink-0 flex-col gap-row sm:w-56">
      <PriceTag
        price={product.price}
        oldPrice={product.oldPrice}
        merchant={product.merchant}
        size="lg"
        tone="brand"
      />
      {cta}
    </div>
  );

  if (variant === "banner") {
    return (
      <article
        data-slot="winner-card"
        data-variant="banner"
        className={cn(
          "themed-border overflow-hidden rounded-lg bg-card shadow-raised",
          className,
        )}
      >
        <AwardBadge
          kind={award}
          label={awardLabel}
          variant="strip"
          className="rounded-none"
        />
        {/* Tre spalter på skrivbordet, alltså två mellanrum: bild mot text och
            text mot köpruta. `--space-card` räcker staplat på mobil men blir
            trångt i rad. Höjningen ligger på `lg:gap-x`, så mobilstapeln är
            orörd. Texten är `flex-1 min-w-0` och tar kostnaden. */}
        <div className="flex flex-col gap-[var(--space-card)] pad-card lg:flex-row lg:items-start lg:gap-x-block">
          <ProductImage
            src={product.image}
            alt={product.name}
            fallbackLabel={product.brand}
              sizes={IMAGE_SIZES.hero}
            className="w-full shrink-0 lg:w-52"
          />
          {body}
          {purchase}
        </div>
      </article>
    );
  }

  if (variant === "stacked") {
    return (
      <article
        data-slot="winner-card"
        data-variant="stacked"
        className={cn(
          "themed-border relative flex flex-col gap-row rounded-lg bg-card pad-card shadow-raised",
          className,
        )}
      >
        <AwardBadge
          kind={award}
          label={awardLabel}
          variant="pill"
          className="self-start"
        />
        <ProductImage
          src={product.image}
          alt={product.name}
          fallbackLabel={product.brand}
              sizes={IMAGE_SIZES.hero}
          ratio="wide"
        />
        {body}
        <PriceTag
          price={product.price}
          oldPrice={product.oldPrice}
          merchant={product.merchant}
          size="lg"
          tone="brand"
        />
        {cta}
      </article>
    );
  }

  return (
    <article
      data-slot="winner-card"
      data-variant="split"
      className={cn(
        "themed-border relative rounded-lg bg-card pad-card shadow-raised",
        className,
      )}
    >
      <AwardBadge
        kind={award}
        label={awardLabel}
        variant="ribbon"
        className="absolute -top-3 left-[var(--space-card)]"
      />
      {/* Samma tre spalter som i banner-varianten, se kommentaren där. */}
      <div className="flex flex-col gap-[var(--space-card)] pt-3 lg:flex-row lg:items-start lg:gap-x-block">
        <ProductImage
          src={product.image}
          alt={product.name}
          fallbackLabel={product.brand}
              sizes={IMAGE_SIZES.hero}
          className="w-full shrink-0 lg:w-56"
        />
        {body}
        {purchase}
      </div>
    </article>
  );
}
