# Page template

Phase 5 of `new-page`. Mirror `app/smart-belysning/page.tsx`.

## Section order and background tones

Backgrounds alternate. Nine sections, starting grey:

| # | Section | Tone | Contents |
|---|---|---|---|
| – | Breadcrumb | – | `categoryTrail(CATEGORY)`, `schema` |
| – | Hero | – | h1, 3-sentence intro, `UpdatedStamp`, byline, disclosure, TOC pills (desktop), `QuickPickPanel` (sticky) |
| 1 | `snabbt-svar` | grå | `WinnerCard` split, TOC pills (mobile) |
| – | `alla-testvinnare` | *parked* | `WinnerGrid`, hidden behind the admin toggle |
| 2 | `jamforelse` | vit | `ComparisonTable` |
| 3 | `recensioner` | grå | `ProductReview` + `CriteriaScores` per product |
| 4 | `andra-lampor` | grå + `border-t` | `ConsideredList` |
| 5 | `kopguide` | vit | MDX in `Prose` |
| 6 | `testmetod` | grå | `MethodologyBlock` |
| 7 | `darfor-litar-du-pa-oss` | vit | `TrustBlock` + both people |
| 8 | `kallor` | grå | `SourceList` |
| 9 | `vanliga-fragor` | vit | `FaqAccordion` with `schema` |
| – | Footer | – | `LegalDisclaimer` + `AffiliateDisclosure` |

**Re-check the alternation whenever you insert a section.** Two adjacent greys
merge into one block. Sections 3 and 4 are both grey by necessity, so the
boundary carries a hairline `border-t`.

## Hero

- h1 from `CATEGORY.title`
- **Three sentences**, comparison-framed. "Vi jämförde…", never "Vi köpte in… och mätte…"
- Byline: `label="Skriven av"` plus `reviewer` for "Granskad av". Every competitor in three markets labels the byline; an unlabelled name reads as decoration.
- TOC pills sit in the hero on desktop with `mt-auto` (the left column is shorter than the sticky rail, and that space was dead), and lower down on mobile so they do not push the quick-pick below the fold. Render twice with `hidden lg:flex` / `lg:hidden`; only one is ever in the accessibility tree.

## Buying guide

`content/{slug}/kopguide.mdx`, rendered inside a `Section` whose title is the
h2, so guide headings are `###`. Roughly 1 800 words in about 12 sections.

The pilot's shape, which generalises:

1. How much of the core spec you need, with a calculator
2. What it costs to own, with a running-cost calculator
3. **The thing that annoys people most** about the category
4. This product vs the adjacent product types
5. The spec we weight heaviest, explained numerically
6. The failure mode buyers do not anticipate
7. The choice that is hard to reverse, with a picker
8. The thing best shown rather than described, with a visual tool
9. The commonest mis-buy
10. Swedish legal or safety angle, if any
11. Common mistakes
12. Glossary, as a table

Include a **"Lönar det sig?"** section that says plainly when the product is
*not* worth buying. Saying no builds more trust than saying yes, and no
competitor does it.

Prose never contains a price, a merchant or a URL. Use `<ProductRef id="..." />`,
which reads all three from product data.

## Tools

Registry in `lib/tools.ts`, widgets in `components/tools/registry.tsx`. Each
renders **embedded in the guide and on its own page** at `/verktyg/{slug}`,
from one component. Embedded gets a discreet permalink; standalone omits it.

Each tool page needs roughly 600 words in three sections plus its own FAQ with
`FAQPage` markup, so it can rank on its own questions.

**Naming rule.** A slug must survive a second tool of the same kind.
"Lumenräknare" and "Watt till lumen" are inherently about light. "Protokoll­väljare"
and "Driftkostnadsräknare" are not: the day a dishwasher running-cost
calculator exists, a bare `driftkostnad` would have to change URL and lose its
rankings. Hence `protokollvaljare-smart-hem` and `elkostnad-lampor`.

Reuse before building: `RunningCostCalculator` takes a `defaultWatt`,
`ProtocolPicker` is category-agnostic within smart home.

`usedOn` drives the backlinks from tool page to test pages, so a tool page can
never claim to serve a test that no longer embeds it.

## FAQ

Mirror the guide: every question the guide answers gets an entry, phrased the
way people search rather than the way we write headings. Answers are
**self-contained**, because `FAQPage` markup can surface one answer alone in
search. The pilot has 14.

## Comparison table

Five layouts, `matrix` default: products as columns, attributes as rows. That
is what NN/g and Baymard both recommend. All five are real `<table>` elements
at every width, with a frozen label column and horizontal scroll on mobile.

The earlier version swapped to product cards below `md`, which meant a phone
got three consecutive card stacks and no comparison at all.

Matrix header cells hold image, brand and name only. Rank, award and score live
in labelled rows, because in a matrix the busiest cell should not be the one
with no label.

## Trust and people

`TrustBlock` carries four exported default points so every category page makes
the same promise in the same words. Methodology answers *how*; this answers
*why us*. Show both people's cards under it.

## Schema

- `ProductSchema` emits `ItemList` → `Product` → `Review` → `Rating` from product data, so marked-up ratings can never disagree with rendered ones.
- **No `offers`** until a live feed exists. Marking a stale price is a manual-action risk.
- `BreadcrumbList` from `Breadcrumbs schema`. The current page carries no `item`.
- `FAQPage` from `FaqAccordion schema`.

## Language

Swedish, naturlig-svenska. **No em dashes anywhere a reader can see them**;
`pnpm check:emdash` enforces it. En dashes in ranges are correct and expected.

Use product-category words, never concept words. Swedes do not shop by "smart".

**Write from inside the market.** "svensk text", "på svenska", "svensk handel"
mark the writer as an outsider surveying Sweden. No check catches this one; see
the Editorial section of `gotchas.md`.
