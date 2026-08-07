---
name: update-pages
description: Refresh existing live test pages on smartatest.se — prices, stock-independent facts, sources, images or a product swap — without rebuilding them. Takes no argument to walk every live test page, a slug for one page, a category key for a group, or `auto` to run the whole sweep without stopping. Verifies a page first, then asks whether to apply the changes it found, one page at a time. Use for a price round, a dead source URL, a discontinued product, or any edit to a page that already exists. For a brand new test page use new-page; to lift a page to the current standard use fix-page.
---

# Keep existing pages true

`new-page` builds a test page from nothing. `fix-page` makes a page **good** —
verdicts, thin table rows, criteria that grade paperwork. This skill makes a
page **true**, which is the far commoner job and the one with a shelf life
measured in weeks.

```
   ┌──────────────────────────────────────────────────────────────┐
   │  PER PAGE, in order. The question sits in the middle.        │
   └──────────────────────────────────────────────────────────────┘

  1  READ THE RESEARCH FILE FIRST        .agent/research/{slug}.md
     ────────────────────────────        what was checked, what could not be,
     ⚠ a re-derived price is an          and why each product sits where it does
       invented price
                    │
                    ▼
  2  VERIFY AGAINST THE MERCHANT         one product at a time
     ────────────────────────────        price · canonical after redirects ·
     `pnpm priskoll` finds drift.        aggregateRating if we show one
     It does not fix it, and it          ⚠ 200 OK ≠ the product still exists
     cannot see a discontinuation        ⚠ a price that FELL means a successor
                    │
                    ▼
  3  GREP FOR EVERY OLD FIGURE           before you change anything
     ────────────────────────────        a price also lives in the ingress, a
     metadata.description is the         verdict, a tagline, a FAQ answer, the
     one that gets missed                buying guide, and the description
                    │
                    ▼
  ╔═══════════════════════════════════════════════════════════════╗
  ║  4  SHOW THE TABLE, THEN ASK                                  ║
  ║     ────────────────────────                                  ║
  ║     Everything found on this page, one row per change.        ║
  ║     Then AskUserQuestion: two options, Fixa or Skippa.        ║
  ║     Skipped in `auto`. Never skipped otherwise.               ║
  ╚═══════════════════════════════════════════════════════════════╝
                    │
              ┌─────┴─────┐
           Skippa       Fixa
              │           │
              │           ▼
              │  5  APPLY               data file + every place the figure lives
              │     ─────               fresh `priceCheckedAt` on each product
              │           │
              │           ▼
              │  6  RECORD              .agent/research/{slug}.md, with the date
              │           │
              │           ▼
              │  7  BUMP THE DATE       `const UPDATED` **and** lib/catalog.ts
              │     ────────────        `pnpm check:refs` fails if they disagree
              │           │             rewording is not a change
              └─────┬─────┘
                    ▼
              next page ──► … ──► 8  pnpm check, once, at the end
```

## The argument

**The grammar is shared across the four page-run skills and lives in
`.claude/references/page-runs.md`.** Read it. It covers how a bare word
resolves, why a near match is never guessed, and what `auto` does and does not
loosen.

```
/update-pages                 every live test page, oldest `updated` first
/update-pages robotdammsugare one page
/update-pages sakerhet        one category
/update-pages auto            every live page, no questions
/update-pages sakerhet auto   a group, no questions
```

**Scope: test pages only.** A category hub and a tool carry no prices to
re-verify.

Ordering, whenever the run covers more than one page: **oldest `updated` first.**
That is where the stale prices are.

**`auto` fits this skill better than the other three**, and that is worth
knowing when choosing between them: the per-page decision here is usually "the
price moved, apply it", which the merchant page settles on its own. The three
improvement passes are asking the user for taste; this one is asking permission
to write down what it just read.

Substance lives in the departments. Read what the change touches:

| Changing | Read |
|---|---|
| Prices, specs, images, ratings | `.claude/context/data.md` |
| A merchant or a programme | `.claude/context/money.md` |
| A source URL | `.claude/context/research.md` |
| Any reader-facing sentence | Skill `swedish-voice` |
| The date, schema or sitemap | `.claude/context/seo.md` |

## The question

**Verify first, ask second, apply third.** The question is worthless before the
verification, because it would be asking whether to go and look — and the
looking is the job. So steps 1 to 3 run in full on a page, and only then does
the page get its question.

### First the table, above the question

One row per change found. This is the long form, and it is where the detail
goes, because an `AskUserQuestion` option description is one line.

```
/robotdammsugare — senast uppdaterad 2026-06-14

| Vad | Nu | Blir | Källa |
|---|---|---|---|
| Dreame Aqua10 Ultra Roller | 14 890 kr | 13 490 kr | Proshop, läst i dag |
| Roborock Saros 20 Sonic | 8 990 kr | 8 990 kr | oförändrat, nytt datum |
| Dreame L10s Ultra Gen 3 | 4 990 kr | — | utgått, 301 till serien |
| metadata.description | "…14 890 kronor…" | "…13 490 kronor…" | följdändring |
| Källa 4, Stiftung Warentest | 404 | ny URL | omflyttad |
```

Three things the table must always show, because they are the ones that decide
the answer and they are easy to leave out:

- **A price that fell**, marked as such. It usually means a successor landed,
  and that is a bigger decision than a number.
- **A discontinued product**, and what you propose doing about it.
- **Every knock-on edit**, especially `metadata.description`. A price round that
  updates the data file and not the snippet leaves the stale number in the
  version most people actually see.

If a page needs nothing, say so in one line and move on. **Do not ask a question
whose only honest answer is "nothing to do".**

### Then the question, two options

```
question: "/robotdammsugare — tre priser rörda, en produkt utgången. Kör?"
header:   "Sida 3 av 21"          (≤ 12 characters)
options:
  1. label: "Fixa"    description: one line: what changes and the one thing to
                                   know. "Tre priser, varav ett fall på 1 400 kr
                                   som kan betyda efterträdare."
  2. label: "Skippa"  description: one line: what stays wrong if skipped.
                                   "Sidan behåller 14 890 kr och den utgångna
                                   Dreame L10s."
```

Exactly two options. `AskUserQuestion` adds "Other" itself, which is where a
"do only the prices, leave the product" answer arrives — take it as written.

**The description sells the decision, not the mechanics.** "Uppdaterar
lib/data/robotdammsugare.ts" tells the user nothing they cannot see in the table.

### `auto`

`auto` removes the per-page question and nothing else.

**It does not remove the editorial gate.** A change under "May not, without
asking" below still stops — in `auto` it is not applied, it is collected, and
the run ends with a list of the decisions waiting. A sweep that silently
reordered a ranking because nobody was watching is the failure this mode exists
one step away from.

Report at the end of an `auto` run: pages touched, pages that needed nothing,
pages skipped for another session's uncommitted work, and the decisions parked.

## What a refresh may and may not change

**May:** prices, dates, merchant links, source URLs, images, a product swapped
for its successor, a fact corrected.

**May not, without asking:** criterion weights, criterion scores, rank order.
Those were the user's decisions. A product that has genuinely got worse or
better is a case to put to them, not a score to quietly edit.

**Not this skill's job at all:** rewriting a sentence because it reads badly.
A verdict that reviews the documentation is `fix-page`. A description that needs
its search phrase and call to action is `fix-meta-descriptions`. An ingress that
orders rather than recommends is `fix-ingress`. Here you change the figure and
leave the sentence standing.

## Two traps specific to refreshing

**A discontinued product hides behind a 200.** Retailers redirect a dead product
URL to its series or category page, which returns 200 and looks alive. Check
that the page still names the product before trusting it.

**A price that fell is more interesting than a price that rose.** It usually
means a successor has landed. Look for it before updating the number.

## Where the old figure hides

Run this before applying, not after. The data file is the least of it.

```bash
grep -rn "14 890\|2 290" app/{slug}/page.tsx lib/data/{slug}.ts content/{slug}/
```

`metadata.description` is the one that gets forgotten, because it is not on the
rendered page you are looking at — and it is what Google shows. It also carries
the *count* and the *price range*, and both move when a product is swapped.

## Gates

1. **Never deploys.**
2. **Never pushes.**
3. **Commits only the pages it touched**, named by path. Never `git add .`.
   `lib/catalog.ts` is shared across sessions; check `git status --porcelain`
   first, and if another session has it open, leave the work in the tree and say
   so rather than sweeping their half-built page into history.

## Done

`pnpm check` passes, every touched price is dated, both copies of the date
agree, and `.agent/research/{slug}.md` says what was verified and when — on
every page the run said yes to, and on none of the ones it skipped.
