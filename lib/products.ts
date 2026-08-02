/** Domain model shared by every comparison page. */

export type AwardKind =
  | "winner"
  | "runnerup"
  | "budget"
  | "premium"
  | "editor";

export const AWARD_LABELS: Record<AwardKind, string> = {
  winner: "Bäst i test",
  runnerup: "Tvåa i test",
  budget: "Bäst budget",
  premium: "Bäst premium",
  editor: "Redaktionens val",
};

/**
 * A scoring criterion for one category. Robotdammsugare are judged on suction
 * and navigation, brandvarnare on reaction time and false alarms, so criteria
 * belong to the category rather than to the product.
 */
export type Criterion = {
  /** Stable key, referenced by Product.scores. */
  key: string;
  label: string;
  /** Percentage of the total. Must sum to 100 across a category. */
  weight: number;
  /** Shown in MethodologyBlock to justify the weight. */
  description?: string;
};

/**
 * A grouping above the category, e.g. "Smart hem" over smart belysning,
 * smarta lås and övervakningskamera.
 *
 * Deliberately a taxonomy layer only — it never becomes a URL segment. Swedes
 * search the product category, not the concept, so "smart hem" earns its place
 * in the breadcrumb and the nav but not in the path (see plan-components.md,
 * decision 2). Keeping the two separate is the whole point of this type.
 */
export type CategoryGroup = {
  key: string;
  label: string;
  /** Hub page, when one exists. Omit and the crumb renders unlinked. */
  href?: string;
};

export type Category = {
  slug: string;
  label: string;
  /** H1 of the category page. */
  title: string;
  /** Taxonomy parent, shown in the breadcrumb. Not part of the URL. */
  group?: CategoryGroup;
  criteria: Criterion[];
  /** Intro paragraph for MethodologyBlock. */
  methodology?: string;
};

/**
 * A product we looked at and left out of the ranking.
 *
 * Naming what was rejected is the cheapest credibility signal in the category
 * and one every strong competitor uses: Tom's Guide runs "Other Smart Bulbs We
 * Tested", bastaval lists all eight. A shortlist with no also-rans reads as the
 * whole market rather than as a choice.
 *
 * `reason` must be a real reason, not a hedge. "Vi hann inte" is not one.
 */
export type ConsideredProduct = {
  brand: string;
  name: string;
  reason: string;
  /** Roughly what it costs, for context. Never rendered as a live price. */
  approxPrice?: number;
  merchant?: string;
  /**
   * AFFILIATE-SWAP — retailer page for the product. The name links here when
   * set, so a reader who wants the one we rejected can still buy it and we
   * still earn on the click.
   */
  merchantUrl?: string;
  affiliateUrl?: string;
};

export type Spec = {
  label: string;
  /**
   * Shorter label for narrow columns, falling back to `label`. Set it only
   * where the full label crowds a phone column, and keep it unambiguous:
   * "Färg" for färgtemperatur would read as whether the lamp does colour.
   */
  shortLabel?: string;
  value: string;
  /** Marked specs surface in the comparison table; the rest live in the review. */
  highlight?: boolean;
};

/**
 * Crowd rating lifted from the merchant's own product page, where they publish
 * it as schema.org AggregateRating.
 *
 * Deliberately NOT part of `scores` and never folded into the weighted total.
 * Two reasons. Ratings are not comparable across shops — 3,3 from 7 ratings and
 * 5,0 from 73 are not the same evidence, and each shop has its own customer
 * base and selection bias. And Google's review-snippet guidelines forbid
 * marking up a rating aggregated from another site as our own, so this must
 * stay out of ProductSchema. It is displayed and attributed, nothing more.
 *
 * The source is always the product's own `merchant` / `merchantUrl`, so a
 * rating can never end up credited to a shop we are not linking to.
 */
export type UserRating = {
  /** As published by the merchant, on `scale`. */
  value: number;
  /** How many people rated. Prefer ratingCount over reviewCount. */
  count: number;
  /** Almost always 5. Stored so a 10-point shop cannot silently skew a table. */
  scale?: number;
  /** ISO date the merchant page was read. */
  checkedAt?: string;
};

export type Product = {
  id: string;
  /** Product name without the brand, e.g. "Hue White & Color E27". */
  name: string;
  /**
   * Shorter name for tight spots like the quick-pick rail, where the full name
   * would truncate. Falls back to `name`, so only set it where a product
   * actually overflows — an unnecessary short name is just a second name to
   * keep in sync.
   */
  shortName?: string;
  brand: string;
  image?: string;
  /** One-line editorial summary. */
  tagline: string;
  /**
   * Per-criterion scores, 0–5, keyed by Criterion.key.
   * This is the source of truth. `score` and `rating` are derived from it.
   */
  scores: Record<string, number>;
  /** Derived: weighted average on a 0–10 scale. Do not set by hand. */
  score: number;
  /** Derived: the same weighted average on a 0–5 scale, for stars. */
  rating: number;
  /** Crowd rating from the merchant. Display only — see UserRating. */
  userRating?: UserRating;
  price: number;
  /** Pre-discount price. Renders a strikethrough and a saving. */
  oldPrice?: number;
  currency?: string;
  merchant: string;
  /**
   * AFFILIATE-SWAP — the retailer's own product page. Always set, always the
   * canonical URL after redirects, and today this is what actually ships in
   * the href. Never a network link.
   */
  merchantUrl: string;
  /**
   * AFFILIATE-SWAP — network deep link. Absent until we join the program.
   * Filling it does nothing on its own; `LINK_MODE` in lib/links.ts decides.
   */
  affiliateUrl?: string;
  /**
   * ISO date the price was last checked against the merchant page. Rendered
   * next to the price, because an undated price on a comparison page is a
   * claim we cannot stand behind.
   */
  priceCheckedAt?: string;
  award?: AwardKind;
  /**
   * Category-specific superlative, e.g. "Bäst utan abonnemang". Every ranked
   * product gets one on a comparison page, so it is per-product free text
   * rather than another member on the AwardKind enum.
   */
  superlative?: string;
  pros: string[];
  cons: string[];
  specs: Spec[];
  /** Long-form review body for ProductReview. */
  verdict?: string;
};

const sekFormatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number, currency = "SEK"): string {
  if (currency === "SEK") return sekFormatter.format(value);
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Swedish long date, e.g. "1 augusti 2026". */
export function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function starsFromScore(product: Product): number {
  return product.rating;
}

/** Products as authored: criterion scores only, no totals. */
export type ProductSeed = Omit<Product, "score" | "rating">;

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Weighted average of a product's criterion scores, 0–5.
 *
 * Criteria missing from `scores` are skipped and their weight is redistributed,
 * so a partially-scored product still produces a sensible number instead of
 * being silently dragged toward zero.
 */
export function weightedRating(
  scores: Record<string, number>,
  criteria: Criterion[],
): number {
  const scored = criteria.filter((c) => typeof scores[c.key] === "number");
  const totalWeight = scored.reduce((sum, c) => sum + c.weight, 0);
  if (!totalWeight) return 0;

  const weighted = scored.reduce(
    (sum, c) => sum + scores[c.key] * c.weight,
    0,
  );
  return round1(weighted / totalWeight);
}

/**
 * Fill in the derived totals once, at the data layer, so components keep
 * taking a plain `product` and never need the category passed alongside.
 */
export function resolveProducts(
  category: Category,
  seeds: ProductSeed[],
  options: { sort?: boolean } = {},
): Product[] {
  const resolved = seeds.map((seed) => {
    const rating = weightedRating(seed.scores, category.criteria);
    return { ...seed, rating, score: round1(rating * 2) };
  });

  /* Rank must follow score. Once the total is derived, authored array order
     drifts out of sync the moment a criterion changes, and a list where rank 4
     outscores rank 3 reads as rigged. Sort by default; pass sort:false only
     when a page deliberately orders by something else. */
  if (options.sort === false) return resolved;
  return [...resolved].sort((a, b) => b.score - a.score);
}

/** Guard against a category whose weights do not add up. */
export function criteriaWeightTotal(criteria: Criterion[]): number {
  return criteria.reduce((sum, c) => sum + c.weight, 0);
}
