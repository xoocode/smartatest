---
name: fix-page
description: Bring an existing test page on smartatest.se up to the current writing and research standard — rewrite verdicts that sell, strip source-state narration, fill thin spec rows, fix the ingress. Use when a live page reads like an older standard, when the checks report debt on it, or when asked to fix, upgrade or rework a page. For a price round use update-page; for a brand new page use new-page.
---

# Fix an existing page to the current standard

`new-page` builds from nothing. `update-page` keeps a page **true** — prices,
dead links, a discontinued product. This skill makes a page **good**: it rewrites
what an older standard left behind.

The standard moved on 2026-08-04 and 08-05. Pages built before that read as
reports on our research rather than as recommendations, and their tables are
thinner than they need to be. Nothing here is about facts going stale.

## Which page

If the user named one, use it. If not, **ask before doing anything else** —
run the checks below with no filter, show which pages carry the most debt, and
let the user pick. Do not guess.

```bash
pnpm check:kallprat     # källprat per page, worst first
pnpm check:omdomen      # one-block verdicts, award-repeating superlatives
pnpm check:tackning     # invisible rows, rows under 50 % filled
```

## Read first

| Before you | Read |
|---|---|
| Touch a single sentence | Skill `swedish-voice` — all of it, plus `references/writing-guide.md` |
| Judge the ingress or section order | `.claude/references/page-anatomy.md` |
| Fill a spec cell | `.claude/references/spec-sourcing.md` |
| Write that a fact is not published | `.claude/references/establishing-absence.md` — six of ten such claims were false |
| Change spec fields or `highlight` | `.claude/context/data.md` |
| Finish | `.claude/context/ship.md` |

Also read `.agent/research/{slug}.md` if it exists. It records what was already
checked and what could not be found, and it will save you a dead end.

## The order

Language before research. The rewrite tells you which facts are missing.

### 1. Measure the page as it stands

```bash
pnpm check:kallprat --sida {slug} --strict
pnpm check:omdomen
pnpm check:tackning
```

Write the counts down. They are the before-figure, and the page is not done
until the first command exits 0.

### 2. The ingress and the metadata description

Both must name the winner, what it is best at and what it costs. This is the
most valuable single edit on most pages, and the one most often missing.

Fails to look for, both of which have shipped:

- an ingress about our method or our sourcing rather than about a product
- in a security category, an opening on the catastrophe rather than the
  protection — see `who-reads.md` on den oroliga

### 3. Rewrite the verdicts

Four movements, **four paragraphs**, blank line between them in the string:
what it is and what it costs → USPs each carrying its consequence → one honest
limit → a decisive close. The winner gets an unconditional recommendation.

While you are in there:

- Vary the closes. If more than half share a construction, rewrite some.
- Any unknown is the product's property, never a source's conduct.
  "Motståndet är oprövat" → "hur länge den håller mot en kofot är okänt".
- Digits for anything comparable.

### 4. Taglines, superlatives, pros and cons

- The winner's `superlative` must not be `Bäst i test`.
- No two products on the page share a superlative.
- A tagline sells a benefit, never a mechanism or the price objection, and a
  number in one needs its yardstick.
- Every pro and con is about the product. A con may point to the product that
  solves the problem.

### 5. Section descriptions, captions and FAQ

The place source-state narration hides once it has been chased out of the
verdicts. `description=` on a `Section` is reader-facing text and gets the same
rule as everything else.

`check:kallprat --sida {slug} --strict` must now exit 0.

### 6. Then the table

Now that the prose is right, you know which facts it needs.

1. `pnpm check:tackning` — fix any spec highlighted inconsistently. Highlight a
   label on every product or on none; otherwise the row silently disappears.
2. For rows under 50 % filled, run a gap pass:
   `.claude/references/spec-sourcing.md`. Home market before the `.se` page,
   Icecat by GTIN, CE and FCC filings, the spec panel photographed on the box.
3. If a row still will not fill, **change the row.** An attribute that is
   knowable and separates the field beats a prestigious one nobody publishes.
   Weight, capacity, control method and noise are usually well covered.
4. Any value you add is tiered, and a safety-shaped number needs tier A or two
   agreeing tier-B sources. Never carry a value between models — match on GTIN.

### 7. The absence pass — verify every claim that something is missing

The pass that did not exist until 2026-08-05, and the one that found the
worst errors on the site.

List every claim on the page that an absence exists — in a con, a spec value, a
tagline, a verdict, a FAQ answer. `.agent/pastaenden-om-franvaro.md` holds the
standing inventory for every page, with file, product and field; regenerate it
if it is stale. Then take each claim through
`.claude/references/establishing-absence.md`.

**Expect to be wrong.** Ten claims were checked on 2026-08-05 and seven were
false. `/hemlarm` told readers for months that Gardio publishes no price; Gardio
publishes 249 kr/månad, no start fee and a 24-month binding period on its own
product page, and the correction moved the company from sixth place to third.

Three rules of thumb from that round:

- A claim about **the manufacturer** cannot be established from a retailer.
  Take the article number off the shop page and go to the manufacturer with it.
- A claim about **a company's whole site** cannot be established from its front
  page. Enumerate the sitemap and read the shop.
- The **manual the retailer itself links to** answered two of the seven, and
  held five spec rows on one charger alone. Open it first, not last.

Where the claim survives, rewrite it to name what you checked. "Inget pris
publicerat på den sida vi läst" was the only one of ten that could not be
falsified, and the only one that said where we had looked.

Anything that changes a score goes in `lib/corrections.ts` with
`affectedRanking: true`. A correction that moves a ranking and is not logged
breaks the promise on `/sa-testar-vi`.

**A note on step 3.** "Any unknown is the product's property, never a source's
conduct" is a rule about *phrasing*, and it must never be used to convert a
fact you did not look for into a fact about the product. "Vikten är okänd" reads
as a property of the powerbank. It was a property of our research: Kjell
publishes 625,1 g on the page we were already on. Establish the absence first,
then phrase it.

### 8. Two variants ranked twice

If two ranked products are the same thing with a small difference, move one to
the considered list and state the difference. The test: swap the names, and see
whether the two verdicts can still be told apart.

### 9. Finish

```bash
pnpm check
pnpm build
```

Bump `const UPDATED` **and** `updated` in `lib/catalog.ts`; `check:refs` fails
if they disagree. Record in `.agent/research/{slug}.md` what you rewrote and
which cells you filled or failed to fill, with the date.

Report the before and after counts from step 1.

## What this skill does not do

- **Not a price round.** Prices have their own dating and their own skill; use
  `update-page`. Only touch a price if you happened to verify it.
- **Not a rebuild.** Keep the ranking unless the rewrite exposes a scoring
  error. If it does, say so and ask — weights and order are the user's call.
- **Not a deploy.** Never deploy unless explicitly asked.

## Align before the big edits

The rewrite is judgement, not mechanics. Once you have read the page and the
check output, put the plan to the user with `AskUserQuestion`: which verdicts
you intend to rewrite, whether any product should move to the considered list,
and which table rows you propose to swap out. Then write.
