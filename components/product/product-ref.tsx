import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";
import { findProduct } from "@/lib/data";
import { formatPrice, fullName } from "@/lib/products";
import { AffiliateCta } from "@/components/product/affiliate-cta";
import { ProductImage, IMAGE_SIZES } from "@/components/product/product-image";
import { ScoreBadge } from "@/components/product/score-badge";

export type ProductRefProps = {
  /** Product id, resolved from lib/data. What MDX uses. */
  id?: string;
  /** Pre-resolved product, for TSX call sites that already have one. */
  product?: Product;
  /**
   * inline — a linked name mid-sentence, for running prose
   * card   — a block with image, score, price and CTA
   */
  variant?: "inline" | "card";
  /** Anchor prefix for the deep review link. Same page by default. */
  reviewHref?: string;
  /** Override the visible name, e.g. to fit a sentence. */
  label?: string;
  showPrice?: boolean;
  className?: string;
};

/**
 * AFFILIATE-SWAP — how editorial prose names a product.
 *
 * MDX must never contain a price, a merchant name or a URL. All three move:
 * prices change weekly, merchants change when we join a programme, and a
 * hardcoded `<a>` in prose would be the one money link on the site that does
 * not follow `LINK_MODE`. Everything here is read from the product data, and
 * the shop link goes through `AffiliateCta` like every other outbound link.
 *
 * Two links, deliberately different in weight: a quiet anchor down to our own
 * review, and the normal CTA out to the shop.
 */
export function ProductRef({
  id,
  product: given,
  variant = "inline",
  reviewHref,
  label,
  showPrice = true,
  className,
}: ProductRefProps) {
  const product = given ?? (id ? findProduct(id) : undefined);

  /* A typo in an MDX id renders nothing rather than crashing the page. The
     build-time guard is `pnpm check:refs`, which fails on unknown ids. */
  if (!product) return null;

  const href = reviewHref ?? `#${product.id}`;
  const name = label ?? `${product.brand} ${product.shortName ?? product.name}`;

  if (variant === "inline") {
    return (
      <span
        data-slot="product-ref"
        data-variant="inline"
        /* not-prose so the dotted review link keeps its own treatment instead
           of inheriting the solid underline Prose gives ordinary links. */
        className={cn("not-prose inline", className)}
      >
        <a
          href={href}
          className="font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
        >
          {name}
        </a>
        {showPrice ? (
          <span className="text-muted-foreground">
            {" "}
            ({formatPrice(product.price, product.currency)})
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <aside
      data-slot="product-ref"
      data-variant="card"
      className={cn(
        "themed-border not-prose flex flex-col gap-row rounded-lg bg-card pad-card sm:flex-row sm:items-center",
        className,
      )}
    >
      <ProductImage
        src={product.image}
        alt={product.name}
        fallbackLabel={product.brand}
        sizes={IMAGE_SIZES.small}
        className="size-20 shrink-0"
      />

      <div className="min-w-0 flex-1">
        <p className="eyebrow text-muted-foreground">{product.brand}</p>
        <p className="font-heading text-lg">
          {product.shortName ?? product.name}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        <a
          href={href}
          className="mt-1 inline-block text-sm text-primary underline-offset-4 hover:underline"
        >
          Läs vår recension
        </a>
      </div>

      <div className="flex shrink-0 flex-col items-stretch gap-2 sm:w-44">
        <div className="flex items-center justify-between gap-3 sm:justify-start">
          <ScoreBadge score={product.score} variant="circle" size="sm" />
          {showPrice ? (
            <p className="font-heading text-brand">
              {formatPrice(product.price, product.currency)}
            </p>
          ) : null}
        </div>
        <AffiliateCta
          href={product.merchantUrl}
          affiliateUrl={product.affiliateUrl}
          merchant={product.merchant}
          productId={product.id}
          productName={fullName(product)}
          placement="kopguide"
          size="lg"
          block
        />
      </div>
    </aside>
  );
}
