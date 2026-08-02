import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { icon: "size-3.5", text: "text-xs" },
  md: { icon: "size-4", text: "text-sm" },
  lg: { icon: "size-5", text: "text-base" },
} as const;

export type RatingStarsProps = {
  /** 0–max, fractional values render a partial star. */
  value: number;
  max?: number;
  size?: keyof typeof sizeMap;
  /** Show the numeric value next to the stars. */
  showValue?: boolean;
  /** Appends "(123)" after the value. */
  reviewCount?: number;
  className?: string;
};

export function RatingStars({
  value,
  max = 5,
  size = "md",
  showValue = false,
  reviewCount,
  className,
}: RatingStarsProps) {
  const s = sizeMap[size];
  const pct = Math.max(0, Math.min(1, value / max)) * 100;
  const stars = Array.from({ length: max });

  return (
    <span
      data-slot="rating-stars"
      className={cn("inline-flex items-center gap-1.5", className)}
      /* One label for assistive tech instead of `max` unlabelled icons. */
      role="img"
      aria-label={`${value.toLocaleString("sv-SE")} av ${max} i betyg`}
    >
      <span className="relative inline-flex" aria-hidden="true">
        <span className="inline-flex gap-0.5 text-muted-foreground/30">
          {stars.map((_, i) => (
            <Star key={i} className={cn(s.icon, "fill-current")} />
          ))}
        </span>
        <span
          className="absolute inset-0 inline-flex gap-0.5 overflow-hidden text-award-accent"
          style={{ width: `${pct}%` }}
        >
          {stars.map((_, i) => (
            <Star key={i} className={cn(s.icon, "shrink-0 fill-current")} />
          ))}
        </span>
      </span>
      {showValue ? (
        <span className={cn("font-medium", s.text)}>
          {value.toLocaleString("sv-SE", { minimumFractionDigits: 1 })}
          {reviewCount ? (
            <span className="ml-1 font-normal text-muted-foreground">
              ({reviewCount.toLocaleString("sv-SE")})
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
