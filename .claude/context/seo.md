# SEO and schema

**Decides:** what structured data a page emits, how it enters the sitemap, and
what the date on it means.

The whole model rests on Google. Nothing here is worth a shortcut that risks a
manual action.

---

## Schema a test page emits

Emitted from data by components, so marked-up values can never disagree with
rendered ones:

| Schema | Emitted by |
|---|---|
| `CollectionPage` → `ItemList` → `Product` → `Review` → `Rating` | `ProductSchema`, from the props the page already passes |
| `BreadcrumbList` | `Breadcrumbs schema`. The current page carries no `item` |
| `FAQPage` | `FaqAccordion schema` |

`CollectionPage` carries `author`, `reviewedBy` and `lastReviewed`. Pass the
page's `TOC` as `sections` to make each heading its own deep-linkable node.

**No `offers`** until a live price feed exists. Marking up a stale price is a
manual-action risk, and our prices are dated by hand.

**No aggregated `userRating` in schema.** Google's review-snippet guidelines
forbid marking up a rating aggregated from another site as your own. It renders
on the page, attributed to the shop, and stays out of the markup. See
`.claude/context/data.md`.

## The date chain

Every page carries a date, and every substantive edit bumps it. The date drives
three things: the visible `UpdatedStamp`, the schema's `lastReviewed`, and
`<lastmod>` in the sitemap. A stale date tells Google the page is unchanged, so
a rewritten page does not get re-crawled.

| Page | Date lives in |
|---|---|
| Test page | `const UPDATED` in the page **and** `updated` in `lib/catalog.ts` |
| Tool | `updated` on the tool in `lib/tools.ts` |
| Support page | `PAGE_UPDATED` in `lib/updated.ts` |
| `/` and `/verktyg` | derived, nothing to maintain |

Test pages need both copies because `sitemap.ts` cannot read a constant
inside a page component without pulling in the whole component tree.
`pnpm check:refs` fails when the two disagree, when a built test page has no
`updated`, and when a tool is older than the newest test page in its `usedOn`.

**Rewording is not a change.** Changed scores, weights, prices, products,
criteria or new sections are. Never invent a date to fill a gap: Google
discounts `lastmod` sitewide once the values stop matching reality.

## The sitemap

`lib/catalog.ts` drives it. `status: "live"` is what adds a test page, and it is
the last thing to flip, never the first. A planned test page listed live feeds
Google 404s.

Before flipping: images in place for every ranked product, criterion scores
reflecting the user's decisions, and the page genuinely publishable.

## FAQ answers stand alone

`FAQPage` markup can surface a single answer in search with no page around it.
Every answer has to make sense read cold, which means no "as we saw above" and
no pronoun whose referent is three sections up.

Phrase the questions the way people search rather than the way we write
headings. The FAQ is what wins featured snippets, and it mirrors the buying
guide: every question the guide answers gets an entry.

## AI crawlers and citation

`app/llms.txt/route.ts` exists and is served. The same properties that make a
passage citable by an AI crawler make it useful to a human skimming: a claim
with a number in it, attributed, in one sentence, not spread across a
paragraph.

The one thing we have that the AI-generated competition cannot fake is naming
the independent tests and reconciling where they disagree. That is also the
most quotable thing on the page. Write those passages so they survive being
lifted whole.
