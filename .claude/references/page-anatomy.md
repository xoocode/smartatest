# Page anatomy

## What each kind of page is called

Settled 2026-08-04, after three words had grown for the same page and one word
had come to mean two things. The terms are **English everywhere internal** —
context files, plans, code comments, conversation — and Swedish only in text a
visitor reads.

| Term | Is | Lives at | Now |
|---|---|---|---|
| **category** | the hub, mother page of test pages | `/sakerhet`, `/smart-hem`, `/hem-hushall` | 3 |
| **test page** | one product comparison | `/brandvarnare` | 27 |
| **buying guide** | the long-form section *inside* a test page | `content/{slug}/kopguide.mdx` | 27 |
| **tool** | a widget with text around it | `/guider/{slug}` | 27 |
| **guide** | a long-form text page, no widget | `/guider/{slug}`, none built yet | 0 |

Categories and test pages share the flat root namespace; tools and guides share
`/guider/*`. Neither namespace may collide. The second one is not yet enforced
by a check, because no guide exists to collide with a tool — add that check in
the same commit as the first guide, not before.

**Retired, do not reintroduce:** `kategorisida`, `testsida`, `jämförelsesida`,
`gruppsida`, `navsida`, `verktygssida`. The first three all meant *test page*
and the next two both meant *category*, which is how the drift started.

### The one word that still carries two senses

Swedish **`kategori`** in `swedish-voice` and in reader-facing copy means the
*product subject* the reader is shopping in — `robotdammsugare`, `brandvarnare`.
It does **not** mean the hub. The hub is only ever written `category`, in
English, and only in internal text. Do not translate one into the other.

The identifiers follow the table: `Category`, `CATEGORIES`, `findCategory()`
are the hub; `TestPage`, `TestPageEntry`, `TEST_PAGE_INDEX`, `TEST_PAGES`,
`liveTestPages()`, `testPagesInCategory()`, `testPageTrail()` are the child. A
`TestPageEntry.category` field points from child to hub.

---

The structure is not described here. It is on disk, where it cannot drift:

```
Canonical page:   @app/smart-belysning/page.tsx
Canonical data:   @lib/data/smart-belysning.ts
Canonical guide:  @content/smart-belysning/kopguide.mdx
```

Read those for **what** a page contains. This file carries only **why** it is
in that order, which the code cannot say.

---

## Why the sections run in that order

The order serves four readers in the order they arrive, not the order that
would be logical to write.

**The verdict comes before the method** because the reader who searched
`bäst i test X` has already decided to buy and wants the answer. Making her
scroll past 600 words of methodology to reach it is how a page loses the click
it is paid for. The method is section 6, where the reader who doubts the
verdict will go looking for it.

**The comparison table comes before the deep reviews** because the reader
choosing between two products decides in the table. The reviews are for the one
who has narrowed to a favourite and wants to be talked out of it.

**Rejected products come after the reviews, not before**, because the section
only makes sense once you know what won. Placed early it reads as padding.

**The buying guide is second to last** because it belongs to the reader who is
not buying today. Putting it high would serve the smallest audience with the
most space.

**Self-disclosure sits below the buying guide, next to the weighting**, not
above the reviews. `/fonsterputsrobot` had "Vem har kontrollerat det här?"
between the table and the reviews, which put five paragraphs about what we had
and had not established directly in the path of the reader who came to buy.
Moved 2026-08-04.

It belongs beside `testmetod` because they answer the same question: the reader
who doubts the verdict wants the weighting and the caveats together, and nobody
else wants either. Everything about source state lives in those two sections and
nowhere else on the page — see the `swedish-voice` skill,
`references/who-you-are.md`.

**Backgrounds alternate, and two adjacent greys merge into one block.**
Re-check the alternation whenever you insert a section. Reviews and rejected
products are both grey by necessity, so that boundary carries a hairline
`border-t`.

## Why the hero is shaped as it is

Three sentences, comparison-framed. "Vi jämförde", never "Vi köpte in och
mätte", because the second is false and the first is the whole business model.

**The ingress must name the winner, what it is best at, and what it costs.** It
is the only paragraph the reader who searched `bäst i test X` is guaranteed to
read, and that reader is the one who pays for the site.

Two pages in a row failed this in different costumes. `/fonsterputsrobot` opened
on *ingen tillverkare publicerar alla tre*; `/nyckelskap` opened on *alla fyra
gick upp… Vi har vägt infästningen tyngst av allt*. Neither named a product, a
price or a recommendation. Both read as an introduction to our method, which is
the single most expensive misordering on this kind of page and the one that
feels most reasonable to write, because the method is what we are proud of.

The same applies to `metadata.description`, which is the ingress a searcher sees
before deciding whether to click at all.

**In a security category, do not open on the catastrophe.** Half the portfolio
is fear-motivated, and `who-reads.md` is explicit for den oroliga: describe the
protection, not the disaster. A finding like *all four were broken open* is
honest and belongs on the page — below the recommendation, not in front of it.
Lead with what to buy, then say what it does and does not protect against.

## The page needs a finding between the verdict and the table

Everything strong a page knows should not end up only in the buying guide, which
is second to last and belongs to the reader who is not buying today.

`/nyckelskap` sent the reader straight from the winner card into a spec grid,
and the most compelling fact it had — nine seconds and eight hammer blows on the
most expensive box in the comparison — sat near the bottom in the guide. One or
two prose sections between the verdict and the table are where a finding like
that earns its keep.

The byline is labelled. Every competitor in three markets labels theirs, and an
unlabelled name reads as decoration rather than accountability.

TOC pills sit in the hero on desktop with `mt-auto` — the left column is
shorter than the sticky rail and that space was dead — and lower down on mobile
so they do not push the quick-pick below the fold. Rendered twice with
`hidden lg:flex` / `lg:hidden`; only one is ever in the accessibility tree.

## Why the comparison table is a matrix

Products as columns, attributes as rows, at every width. NN/g and Baymard both
recommend it, and the alternative we shipped first was worse in a specific way:
swapping to product cards below `md` meant a phone got three consecutive card
stacks and no comparison at all.

Matrix header cells hold image, brand and name only. Rank, award and score live
in labelled rows, because in a matrix the busiest cell should not be the one
with no label.

## Why the buying guide is shaped as it is

`content/{slug}/kopguide.mdx`, rendered inside a `Section` whose title is the
h2, so guide headings start at `###`. Roughly 1 800 words in about 12 sections.

The pilot's shape generalises because it follows a purchase decision rather
than a product taxonomy:

1. How much of the core spec you actually need, with a calculator
2. What it costs to own, with a running-cost calculator
3. The thing that annoys people most about the products
4. This product type versus the adjacent one
5. The spec we weight heaviest, explained numerically
6. The failure mode buyers do not anticipate
7. The choice that is hard to reverse, with a picker
8. The thing better shown than described, with a visual tool
9. The commonest mis-buy
10. The Swedish legal or safety angle, if any
11. Common mistakes
12. Glossary, as a table

**Include a "Lönar det sig?" section that says plainly when the product is not
worth buying.** Saying no builds more trust than saying yes, and no competitor
in this market does it.

Prose never contains a price, a merchant or a URL. `<ProductRef id="..." />`
reads all three from product data, so a price can never go stale in a sentence.

## Why `TrustBlock` uses fixed wording

It carries four exported default points, so every test page makes the same
promise in the same words. Methodology answers *how*; this answers *why us*.
Both people's cards go under it.

A promise reworded per page is a promise that drifts, and the drift is what a
reader would be right to distrust.
