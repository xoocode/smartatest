import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/products";

const priceVariants = cva("font-heading leading-none tabular-nums", {
  variants: {
    size: {
      sm: "text-base",
      md: "text-xl",
      lg: "text-3xl",
    },
    tone: {
      default: "text-foreground",
      brand: "text-brand",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: { size: "md", tone: "default" },
});

export type PriceTagProps = VariantProps<typeof priceVariants> & {
  price: number;
  /** Pre-discount price — renders struck through plus the saving. */
  oldPrice?: number;
  currency?: string;
  /** Prefix such as "från" when the price varies by retailer. */
  prefix?: string;
  /** Retailer name, rendered small underneath. */
  merchant?: string;
  showSavings?: boolean;
  className?: string;
};

export function PriceTag({
  price,
  oldPrice,
  currency = "SEK",
  prefix,
  merchant,
  showSavings = true,
  size,
  tone,
  className,
}: PriceTagProps) {
  const discounted = typeof oldPrice === "number" && oldPrice > price;
  const saving = discounted ? oldPrice - price : 0;

  return (
    <span
      data-slot="price-tag"
      className={cn("inline-flex flex-col gap-0.5", className)}
    >
      <span className="inline-flex items-baseline gap-2">
        {prefix ? (
          <span className="text-xs text-muted-foreground">{prefix}</span>
        ) : null}
        <span className={cn(priceVariants({ size, tone }))}>
          {formatPrice(price, currency)}
        </span>
        {discounted ? (
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(oldPrice, currency)}
          </span>
        ) : null}
      </span>
      {discounted && showSavings ? (
        <span className="text-xs font-medium text-success">
          Spara {formatPrice(saving, currency)}
        </span>
      ) : null}
      {merchant ? (
        <span className="text-xs text-muted-foreground">hos {merchant}</span>
      ) : null}
    </span>
  );
}
