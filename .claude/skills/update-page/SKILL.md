---
name: update-page
description: Refresh an existing live test page on smartatest.se — prices, stock-independent facts, sources, images or a product swap — without rebuilding it. Use for a price round, a dead source URL, a discontinued product, or any edit to a page that already exists. For a brand new test page use the new-page skill instead.
---

# Update an existing page

`new-page` builds a test page from nothing. This is the far commoner job: a page
that exists and needs to stay true.

Substance lives in the departments. Read what the change touches:

| Changing | Read |
|---|---|
| Prices, specs, images, ratings | `.claude/context/data.md` |
| A merchant or a programme | `.claude/context/money.md` |
| A source URL | `.claude/context/research.md` |
| Any reader-facing sentence | Skill `swedish-voice` |
| The date, schema or sitemap | `.claude/context/seo.md` |

## The order

1. **Read the research file first.** `.agent/research/{slug}.md` records what
   was checked, what could not be, and why each product is where it is. It is
   more reliable than re-deriving, and re-derived prices are invented prices.

2. **Verify against the live merchant page, one product at a time.** Price,
   canonical URL after redirects, `aggregateRating` if we show one. `pnpm
   priskoll` finds drift; it does not fix it, and it does not know when a
   product has been discontinued.

3. **Update the data file.** Every touched product gets a fresh
   `priceCheckedAt`. A price without a date is a claim we cannot stand behind.

4. **Record what changed in the research file**, with the date. The next person
   to open the page needs to know which numbers were re-checked and which are
   older than they look.

5. **Bump the date, in both places.** `const UPDATED` in the page **and**
   `updated` in `lib/catalog.ts`. `pnpm check:refs` fails if they disagree.

   Rewording is not a change. Changed prices, scores, weights, products,
   criteria or new sections are.

6. **Run `pnpm check`.**

## What a refresh may and may not change

**May:** prices, dates, merchant links, source URLs, images, a product swapped
for its successor, a fact corrected.

**May not, without asking:** criterion weights, criterion scores, rank order.
Those were the user's decisions. A product that has genuinely got worse or
better is a case to put to them, not a score to quietly edit.

## Two traps specific to refreshing

**A discontinued product hides behind a 200.** Retailers redirect a dead
product URL to its series or category page, which returns 200 and looks alive.
Check that the page still names the product before trusting it.

**A price that fell is more interesting than a price that rose.** It usually
means a successor has landed. Look for it before updating the number.

## Done

`pnpm check` passes, every touched price is dated, both copies of the date
agree, and `.agent/research/{slug}.md` says what was verified and when.
