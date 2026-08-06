# Build

**Decides:** what a page is made of and what may be built new.

77 of our own components exist, plus 13 shadcn primitives. A new test page
should normally add zero to two, and both should be tools specific to that
test page
rather than layout. If you find yourself building a card, a table or a badge,
it exists already.

That count is generated, not maintained: `pnpm brandbook` recounts it into
`.claude/references/brandbook.html`. It read 62 in prose here while the tree
held 90, which is what a hand-kept number does.

**Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind 4, MDX for
buying guides, Vercel. The rule about reading the version-matched Next.js docs
before writing framework code lives in `AGENTS.md`, which `CLAUDE.md` imports.

Writing component code: the traps that cost us time are in
`.claude/context/traps.md`. Page section order and the reasoning behind it:
`.claude/references/page-anatomy.md`.

---

## The contract

1. **One component per job.** If something close exists, use it.
2. **Params over forking.** Need a variation? Add a prop or a variant. Fork
   only when the job is genuinely different, and then with a new name.
3. **No hardcoded design values.** Tokens and utilities only.
4. **A new component is not done until it has a `/styleguide` bench.** The
   bench uses the same component as the real page, so iterating on it shows up
   everywhere at once.
5. **Pages compose, they never style.** A page file writing layout classes
   beyond grid and spacing means the styling belongs in a component.

Before building anything new, in order: does a component already do this? Can
an existing one do it with a new prop or variant? Is it genuinely a different
job, and can you say in the doc comment why it is not a variant? Then add the
bench in the same commit.

## Product components

| Component | Variants | Use for |
|---|---|---|
| `AffiliateCta` | `brand` `default` `outline` `secondary` `award` | **The only element allowed to link to a merchant.** Resolves href and rel through `resolveMerchantLink`. |
| `AwardBadge` | `pill` `ribbon` `strip` `bare` × tone | Award presets, or free-form `label` plus `icon` for test-page superlatives. |
| `ComparisonTable` | `matrix` `grouped` `checklist` `rows` `compact` | The comparison. A real table at every width. |
| `ConsideredList` | `list` `table` | Products rejected, with reasons and merchant links. |
| `CriteriaScores` | `rows` `compact` `bars` | Per-criterion breakdown inside a review. |
| `FaqAccordion` | `bordered` `plain` | FAQ. `schema` emits FAQPage. |
| `MethodologyBlock` | `list` `cards` | Weights and how scoring works. Warns if weights miss 100. |
| `PriceTag` | | Price with optional old price and merchant. |
| `ProductCard` | `grid` `row` `compact` | Product in a grid or list. |
| `ProductImage` | `square` `wide` `tall` | Always pass `sizes` from `IMAGE_SIZES`. |
| `ProductRef` | `inline` `card` | **How MDX names a product.** Takes an `id`. |
| `ProductReview` | `full` `compact` | The deep review. Sets the `#id` anchor. |
| `ProductSchema` | | ItemList → Product → Review → Rating. |
| `ProsCons` | `side` `stacked` `cards` | Fördelar and nackdelar. |
| `QuickPickPanel` | `panel` `sticky` `bare` | Above-the-fold shortlist. |
| `RatingStars` | | Stars. Never alongside a score badge; same number twice. |
| `ScoreBadge` | `solid` `circle` `outline` `bare` `dial` | The score. |
| `SpecList` | `rows` `grid` `inline` | Specifications. |
| `UserRating` | `inline` `compact` `block` | Merchant crowd rating. Display only. |
| `WinnerCard` | `split` `banner` `stacked` | The verdict card. |
| `WinnerGrid` | `grid` `list` | All ranked products. Parked behind the admin toggle. |

## Site components

| Component | Variants | Use for |
|---|---|---|
| `AffiliateDisclosure` | `box` `inline` `footer` | Near the top and in the footer. Twice per page, not three times. |
| `ArticleList` | `rows` `cards` | Related reading. |
| `Breadcrumbs` | `plain` `bar` | Build the trail with `testPageTrail()`. |
| `TestPageGrid` | `cards` `compact` | Test page listings. Reads `lib/catalog.ts`. |
| `Container` | `narrow` `default` `wide` `full` | Page width. |
| `LegalDisclaimer` | `block` `footer` `inline` | Pick from the `DISCLAIMERS` map. |
| `PersonAvatar` | xs to xl | Portrait or initials. |
| `PersonCard` | `byline` `box` `hero` | `label` and `reviewer` for attribution. |
| `PersonCredentials` | `sidebar` `inline` `stats` | E-E-A-T block on author pages. |
| `Prose` | | Wraps MDX. Use `not-prose` to opt a child out. |
| `PullQuote` | `panel` `rule` `plain` | Editorial emphasis. |
| `Section` | `default` `muted` `accent` | Page section. `optionalSection` parks it. |
| `SourceList` | `list` `compact` `inline` `summary` | Citations. `summary` derives the counts. |
| `TocNav` | `box` `sticky` `inline` | Jump list. |
| `TrustBlock` | `cards` `bar` | Why believe us. Four exported default points, so every test page makes the same promise in the same words. |
| `UpdatedStamp` | `inline` `bar` | Date and count. |

`components/ui/` holds the shadcn base. Use it through our components rather
than directly on a page.

The rendered version of the design system, with tokens and the style axes, is
`.claude/references/brandbook.html`. `/styleguide` is the live bench.

---

## Tools

| Component | Reusable across test pages? |
|---|---|
| `ToolFrame` | Always. Chrome plus the permalink. |
| `RunningCostCalculator` | **Yes.** Takes `defaultWatt`. |
| `ProtocolPicker` | **Yes** within smart home. |
| `LumenCalculator` | Lighting only. |
| `KelvinScale` | Lighting only. |
| `WattLumenTable` | Lighting only. Server component, no JS. |

Each tool renders **embedded in the guide and on its own page** at
`/verktyg/{slug}`, from one component. Embedded gets a discreet permalink;
standalone omits it. Each tool page needs roughly 600 words in three sections
plus its own FAQ with `FAQPage` markup, so it can rank on its own questions.

### A new tool has four registrations, and one of them fails silently

| File | What goes there |
|---|---|
| `lib/tools.ts` | The registry entry, with `updated` and `usedOn` |
| `components/tools/registry.tsx` | The widget map |
| `lib/tool-logic/{name}.ts` | The calculation as a pure function |
| `mdx-components.tsx` | `TOOL_SLUGS`: the name prose writes, mapped to the slug |
| `lib/agent-tools.ts` | The agent-callable tool, keyed by slug, where the tool gives advice worth calling |

The logic sits outside the component so the widget and the agent tool compute
on the same code. Two implementations of the same arithmetic drift, and the day
someone fixes one of them it is chance that decides which a reader gets.

`TOOL_SLUGS` is the one that fails silently: `ToolWidget` is what mounts
`AgentTools`, so a name pointed straight at its component renders a calculator
that looks perfect and exposes nothing to an agent on that page. `pnpm
check:tools` catches all of these; see `.claude/context/ship.md`.

**Reusing a tool costs nothing extra.** Embedding `<ProtocolPicker />` in a new
buying guide needs no work beyond the `usedOn` bump, and bumping `usedOn` means
bumping that tool's `updated` too, because its page lists the tests that embed
it. The agent tool follows the widget onto the new page by itself.

**A preconfigured variant is not reuse.** `ChristmasLightRunningCost` wraps
`RunningCostCalculator` with different defaults, but it is a new slug and a new
MDX name, so it needs every registration above.

### Naming a tool slug

A slug must survive a second tool of the same kind. "Lumenräknare" and "Watt
till lumen" are inherently about light. "Protokollväljare" and
"Driftkostnadsräknare" are not: the day a dishwasher running-cost calculator
exists, a bare `driftkostnad` would have to change URL and lose its rankings.
Hence `protokollvaljare-smart-hem` and `elkostnad-lampor`.

### What an agent tool may answer

Advice, criteria, placement, numbers. Never a product name, a price or a
merchant link, and always ending with a link to the test page. The site is
paid when a human clicks through to the shop; a tool that hands over the whole
answer replaces that step.

The temptation is worst on the pickers that already filter our ranking, because
the list is sitting right there. Take the criterion, leave the list.

Some tools earn no agent tool at all. Where the entire answer *is* the ranked
data, as with the two alarm-cost calculators, a product-free version would be
empty and the right call is to skip it.
