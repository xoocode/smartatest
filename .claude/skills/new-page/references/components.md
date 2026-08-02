# Component inventory

**Read this before writing any component.** Almost everything a category page
needs already exists. The design system's value is that one edit restyles every
page, and that only holds if new pages compose rather than build.

## The contract

1. **One component per job.** If something close exists, use it.
2. **Params over forking.** Need a variation? Add a prop or a variant. Fork only when the job is genuinely different, and then with a new name.
3. **No hardcoded design values.** Tokens and utilities only. No raw hex, no arbitrary spacing where a token exists.
4. **A new component is not done until it has a `/styleguide` bench.** The bench uses the same component as the real page, so iterating on it shows up everywhere at once.
5. **Pages compose, they never style.** If a page file is writing layout classes beyond grid and spacing, the styling belongs in a component.

## Product components

| Component | Variants | Use for |
|---|---|---|
| `AffiliateCta` | `brand` `default` `outline` `secondary` `award` | **The only element allowed to link to a merchant.** Resolves href and rel through `resolveMerchantLink`. |
| `AwardBadge` | `pill` `ribbon` `strip` `bare` × tone | Award presets, or free-form `label` plus `icon` for category superlatives. |
| `ComparisonTable` | layout `matrix` `grouped` `checklist` `rows` `compact` | The comparison. Real table at every width. |
| `ConsideredList` | `list` `table` | Products rejected, with reasons and merchant links. |
| `CriteriaScores` | `rows` `compact` `bars` | Per-criterion breakdown inside a review. |
| `FaqAccordion` | `bordered` `plain` | FAQ. `schema` emits FAQPage. |
| `MethodologyBlock` | `list` `cards` | Weights and how scoring works. Warns if weights miss 100. |
| `PriceTag` | | Price with optional old price and merchant. |
| `ProductCard` | `grid` `row` `compact` | Product in a grid or list. |
| `ProductImage` | ratio `square` `wide` `tall` | Always pass `sizes` from `IMAGE_SIZES`. |
| `ProductRef` | `inline` `card` | **How MDX names a product.** Takes an `id`. |
| `ProductReview` | `full` `compact` | The deep review. Sets the `#id` anchor. |
| `ProductSchema` | | ItemList → Product → Review → Rating. |
| `ProsCons` | `side` `stacked` `cards` | Fördelar and nackdelar. |
| `QuickPickPanel` | `panel` `sticky` `bare` | Above-the-fold shortlist. |
| `RatingStars` | | Stars. Do not pair with a score badge; same number twice. |
| `ScoreBadge` | `solid` `circle` `outline` `bare` `dial` | The score. |
| `SpecList` | `rows` `grid` `inline` | Specifications. |
| `UserRating` | `inline` `compact` `block` | Merchant crowd rating. Display only. |
| `WinnerCard` | `split` `banner` `stacked` | The verdict card. |
| `WinnerGrid` | `grid` `list` | All ranked products. Currently parked behind the admin toggle. |

## Site components

| Component | Variants | Use for |
|---|---|---|
| `AffiliateDisclosure` | `box` `inline` `footer` | Required near the top and in the footer. |
| `ArticleList` | `rows` `cards` | Related reading. |
| `Breadcrumbs` | `plain` `bar` | Build the trail with `categoryTrail()`. |
| `CategoryGrid` | `cards` `compact` | Category listings. Reads `lib/catalog.ts`. |
| `Container` | size `narrow` `default` `wide` `full` | Page width. |
| `LegalDisclaimer` | `block` `footer` `inline` | Pick from the `DISCLAIMERS` map. |
| `PersonAvatar` | sizes xs to xl | Portrait or initials. |
| `PersonCard` | `byline` `box` `hero` | `label` and `reviewer` for attribution. |
| `PersonCredentials` | `sidebar` `inline` `stats` | E-E-A-T block on author pages. |
| `Prose` | | Wraps MDX. Use `not-prose` to opt a child out. |
| `PullQuote` | `panel` `rule` `plain` | Editorial emphasis. |
| `Section` | tone `default` `muted` `accent` | Page section. `optionalSection` parks it. |
| `SourceList` | `list` `compact` `inline` `summary` | Citations. `summary` derives the counts. |
| `TocNav` | `box` `sticky` `inline` | Jump list. |
| `TrustBlock` | `cards` `bar` | Why believe us. Uses exported default points. |
| `UpdatedStamp` | `inline` `bar` | Date and count. |

## Tools

| Component | Reusable across categories? |
|---|---|
| `ToolFrame` | Always. Chrome plus the permalink. |
| `RunningCostCalculator` | **Yes.** Takes `defaultWatt`. |
| `ProtocolPicker` | **Yes** within smart home. |
| `LumenCalculator` | Lighting only. |
| `KelvinScale` | Lighting only. |
| `WattLumenTable` | Lighting only. Server component, no JS. |

Registry in `lib/tools.ts`, widget map in `components/tools/registry.tsx`.

## shadcn primitives

`components/ui/` holds the shadcn base (button, card, accordion, and so on).
Use them through our components rather than directly on a page.

## Before you build anything new

Ask, in order:

1. Does a component already do this? Check the tables above.
2. Can an existing one do it with a new **prop or variant**?
3. Is this genuinely a different job? Then fork with a new name, and say in the doc comment why it is not a variant of the original.
4. Whatever you build, add a `/styleguide` bench in the same commit.

The pilot has 62 components. A new category page should normally add **zero to
two**, and both should be category-specific tools rather than layout.
