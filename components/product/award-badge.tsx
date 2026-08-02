import type { ElementType } from "react";
import { Award, Crown, Medal, Sparkles, Wallet } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { AWARD_LABELS, type AwardKind } from "@/lib/products";

/*
  `variant` owns the shape, `tone` owns the fill.

  Border and clip-path live in compoundVariants rather than on the tone,
  because they only make sense on the chip shapes:

  - `bare` is text-only. It gets no border at all, and the tone colours the
    text instead of filling a chip.
  - `ribbon` gets its flag from a clip-path, which slices straight through a
    border. A notch only reads when a fill carries it, so the clip is applied
    only to the filled tones.

  Everything a compound needs to override is a stock Tailwind class, so
  tailwind-merge resolves it and the later compound wins. Never override a
  custom `@utility` (`themed-border`, `shadow-card`) from a compound: merge
  cannot see it, so the winner falls to stylesheet order.
*/
/* `whitespace-nowrap` låg tidigare i basen och gällde alla varianter. Det var
   fel plats: i en jämförelsetabell där kolumnerna är ungefär 112 px bred går
   "Redaktionens val" 20 px in i grannkolumnen, eftersom cellen har
   `overflow: visible` och etiketten alltså inte klipps utan ritas ovanpå
   nästa produkt. Sågs först på /utomhustimer, IDÉ-008, och igen på
   /brandvarnare.

   Nowrap hör till de varianter som faktiskt behöver en obruten rad: bandet,
   vars klippbana förutsätter en rad, och remsan, som spänner över hela kortet.
   Pillret och den nakna varianten får bryta. */
const awardVariants = cva(
  "inline-flex items-center gap-1.5 font-semibold",
  {
    variants: {
      variant: {
        /** Rounded pill — default, sits inline with text. Får bryta rad. */
        pill: "rounded-full px-3 py-1 text-xs",
        /** Flag with a notched edge — sits on the top-left of a card. */
        ribbon: "whitespace-nowrap rounded-md px-3 py-1.5 text-xs",
        /** Full-width strip across the top of a card. */
        strip: "w-full justify-center whitespace-nowrap rounded-t-lg px-3 py-2 text-sm",
        /** Text with icon only, no chip. */
        bare: "text-xs",
      },
      tone: {
        award: "bg-award text-award-foreground",
        brand: "bg-brand text-brand-foreground",
        primary: "bg-primary text-primary-foreground",
        outline: "bg-transparent text-foreground",
      },
    },
    compoundVariants: [
      /* Borders belong to the chip shapes. The award axis decides the colour:
         transparent on filled treatments, a real stroke on `chip`. */
      {
        variant: ["pill", "ribbon", "strip"],
        tone: "award",
        class: "themed-border border-award-border",
      },
      {
        variant: ["pill", "ribbon", "strip"],
        tone: "outline",
        class: "themed-border border-award-accent",
      },
      /* The notch and its shadow need a fill behind them. */
      {
        variant: "ribbon",
        tone: ["award", "brand", "primary"],
        class:
          "pr-5 shadow-card [clip-path:polygon(0_0,100%_0,calc(100%-0.5rem)_50%,100%_100%,0_100%)]",
      },
      /* Bare drops the fill and lets the tone tint the text. */
      { variant: "bare", tone: "award", class: "bg-transparent text-award-accent" },
      { variant: "bare", tone: "brand", class: "bg-transparent text-brand" },
      { variant: "bare", tone: "primary", class: "bg-transparent text-primary" },
    ],
    defaultVariants: { variant: "pill", tone: "award" },
  },
);

const awardIcons: Record<AwardKind, ElementType> = {
  winner: Crown,
  runnerup: Medal,
  budget: Wallet,
  premium: Sparkles,
  editor: Award,
};

export type AwardBadgeProps = VariantProps<typeof awardVariants> & {
  /**
   * One of the five presets. Optional: a category often needs its own
   * superlative ("Bäst utan abonnemang", "Bäst för lägenhet") that no fixed
   * enum should have to grow a member for. Pass `label` alone for those.
   */
  kind?: AwardKind;
  /** Free-form text. Required when `kind` is omitted. */
  label?: string;
  /** Override the preset glyph, or `false` to drop it. */
  icon?: ElementType | false;
  showIcon?: boolean;
  className?: string;
};

export function AwardBadge({
  kind,
  label,
  icon,
  showIcon = true,
  variant,
  tone,
  className,
}: AwardBadgeProps) {
  const Icon =
    icon === false ? null : (icon ?? (kind ? awardIcons[kind] : Award));
  const text = label ?? (kind ? AWARD_LABELS[kind] : null);

  return (
    <span
      data-slot="award-badge"
      data-award={kind ?? "custom"}
      className={cn(awardVariants({ variant, tone }), className)}
    >
      {showIcon && Icon ? <Icon className="size-3.5 shrink-0" /> : null}
      {text}
    </span>
  );
}
