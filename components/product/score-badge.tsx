import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const scoreVariants = cva(
  "inline-flex items-center justify-center font-heading tabular-nums leading-none",
  {
    variants: {
      variant: {
        /** Filled block — highest emphasis, for the winner card. */
        solid: "bg-primary text-primary-foreground rounded-md",
        /**
         * Circle — compact, works in table cells.
         *
         * Sized by a fixed square in compoundVariants rather than by
         * `aspect-square` + padding. As a flex item this element inherits
         * `align-self: stretch`, so a padding-driven `aspect-square` grew to the
         * full column width and then matched its height to it — a 200px circle
         * in a table cell. A fixed size cannot be stretched into that.
         */
        circle: "bg-primary text-primary-foreground rounded-full shrink-0",
        outline: "themed-border border-primary text-primary rounded-md",
        /** Text only, for dense rows. */
        bare: "text-foreground",
      },
      size: {
        sm: "text-sm px-1.5 py-1 min-w-8",
        md: "text-lg px-2 py-1.5 min-w-11",
        lg: "text-2xl px-3 py-2 min-w-16",
      },
    },
    compoundVariants: [
      /* Fixed squares. `size-*` and `p-0` are stock utilities, so tailwind-merge
         resolves them against the size variant above and these win. */
      { variant: "circle", size: "sm", class: "size-9 p-0 min-w-0 text-xs" },
      { variant: "circle", size: "md", class: "size-12 p-0 min-w-0 text-base" },
      { variant: "circle", size: "lg", class: "size-16 p-0 min-w-0 text-xl" },
    ],
    defaultVariants: { variant: "solid", size: "md" },
  },
);

const dialSize = {
  sm: { box: 56, stroke: 5, text: "text-base" },
  md: { box: 84, stroke: 6, text: "text-2xl" },
  lg: { box: 116, stroke: 8, text: "text-4xl" },
} as const;

export type ScoreBadgeProps = Omit<
  VariantProps<typeof scoreVariants>,
  "variant"
> & {
  /** 0–max. */
  score: number;
  max?: number;
  /** Renders "/10" after the number. */
  showMax?: boolean;
  /** Caption under the badge, e.g. "Testbetyg". */
  label?: string;
  /** `dial` renders a radial ring; the rest are chips. */
  variant?: NonNullable<VariantProps<typeof scoreVariants>["variant"]> | "dial";
  className?: string;
};

/** Radial progress ring. The headline treatment for a winner card. */
function ScoreDial({
  score,
  max,
  size = "md",
  showMax,
}: {
  score: number;
  max: number;
  size?: keyof typeof dialSize;
  showMax?: boolean;
}) {
  const s = dialSize[size];
  const radius = (s.box - s.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = Math.max(0, Math.min(1, score / max));

  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: s.box, height: s.box }}
    >
      <svg
        width={s.box}
        height={s.box}
        viewBox={`0 0 ${s.box} ${s.box}`}
        aria-hidden="true"
        /* Start the arc at 12 o'clock rather than 3. */
        className="-rotate-90"
      >
        <circle
          cx={s.box / 2}
          cy={s.box / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={s.stroke}
        />
        <circle
          cx={s.box / 2}
          cy={s.box / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={s.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - filled)}
        />
      </svg>
      <span
        className={cn(
          "absolute font-heading leading-none tabular-nums",
          s.text,
        )}
      >
        {score.toLocaleString("sv-SE", { minimumFractionDigits: 1 })}
        {showMax ? (
          <span className="text-[0.5em] opacity-70">/{max}</span>
        ) : null}
      </span>
    </span>
  );
}

export function ScoreBadge({
  score,
  max = 10,
  showMax = false,
  label,
  variant,
  size,
  className,
}: ScoreBadgeProps) {
  if (variant === "dial") {
    const dial = (
      <span data-slot="score-badge" data-variant="dial" className={className}>
        <ScoreDial
          score={score}
          max={max}
          size={size ?? undefined}
          showMax={showMax}
        />
      </span>
    );

    if (!label) return dial;

    return (
      <span className="inline-flex flex-col items-center gap-1.5">
        {dial}
        <span className="eyebrow text-muted-foreground">{label}</span>
      </span>
    );
  }

  const badge = (
    <span
      data-slot="score-badge"
      className={cn(
        scoreVariants({ variant: variant ?? undefined, size }),
        className,
      )}
    >
      {score.toLocaleString("sv-SE", { minimumFractionDigits: 1 })}
      {showMax ? (
        <span className="ml-0.5 text-[0.6em] opacity-70">/{max}</span>
      ) : null}
    </span>
  );

  if (!label) return badge;

  return (
    <span className="inline-flex flex-col items-center gap-1">
      {badge}
      <span className="eyebrow text-muted-foreground">{label}</span>
    </span>
  );
}
