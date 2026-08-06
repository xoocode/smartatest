---
name: fix-page
description: Bring an existing test page on smartatest.se up to the current standard — a full repair. Rewrite verdicts that review the documentation instead of the product, research and fill every thin spec row, add rows the table is missing, and fix criteria that score publication rather than the goods. Runs unattended — it picks the page, makes the judgement calls from the sources and logs them, and only asks when evidence cannot settle the question. Use when a live page reads like an older standard, when the checks report debt on it, or when asked to fix, upgrade, repair or rework a page. For a price round use update-page; for a brand new page use new-page.
---

# Repair an existing page to the current standard

`new-page` builds from nothing. `update-page` keeps a page **true** — prices,
dead links, a discontinued product. This skill makes a page **good**, and good
now means three things at once:

1. **The prose is about the product**, not about what the seller published.
2. **The table is full**, because someone went and found the facts.
3. **The criteria rank the goods**, not the paperwork.

A page that gets only the first is half repaired. Six night runs between
2026-08-05 and 08-06 removed 12 prose claims and filled 11 table cells across
six pages, which is the wrong ratio and the reason this file was rewritten.
**The research is the job, not the preamble to it.**

## Which page

If the user named one, use it. If not, **pick the one carrying the most debt
and start.** Do not ask. Run the four checks below, add up the debt per page,
say in one line which page you chose and why, and go.

Skip pages another session has uncommitted (`git status --porcelain`) and, on a
night run, pages already in `.agent/nattpass-logg.md`. If two pages are close,
take the one with more thin rows: filling those is worth more than rewriting
another paragraph.

Do not rank candidates with `inventory-absence.mjs` alone. It reads `tagline`,
`pros` and `cons` and **does not read `verdict`**, where most of the debt sits.
It reported 3 claims on `/iphone-skarmskydd` where there were 11, and 3 on
`/avfuktare` where there were 13. Scan the long fields too before choosing.

```bash
pnpm check:omdomen      # one-block verdicts, award-repeating superlatives
pnpm check:tackning     # invisible rows, rows under 50 % filled
pnpm check:redovisning  # criteria that score publication, both signals
pnpm check:avdrag       # scale rungs that deduct for a missing figure
node scripts/inventory-absence.mjs   # useful, but an undercount
```

## Read first

| Before you | Read |
|---|---|
| Touch a single sentence | Skill `swedish-voice`, all of it, plus `references/writing-guide.md` |
| Judge the ingress or section order | `.claude/references/page-anatomy.md` |
| Fill a spec cell | `.claude/references/spec-sourcing.md` |
| Catch yourself about to write that a fact is missing | `.claude/references/establishing-absence.md`, and `node scripts/fetch.mjs <url> --find "..."` |
| Change spec fields or `highlight` | `.claude/context/data.md` |
| Finish | `.claude/context/ship.md` |

Read `.agent/research/{slug}.md` too. It records what was already checked and
what could not be found, and it will save you a dead end.

## The order

Language first, because the rewrite tells you which facts are missing. Then the
research, which is the long part. Then the table, then the checks.

### 1. Measure the page as it stands

Six numbers, and **you report all six at the end.** A run that moved only the
last one is not a repair.

```bash
pnpm check:omdomen      # 1. one-block verdicts
pnpm check:tackning     # 2. rows under 50 %      3. fragmented / duplicate labels
pnpm check:redovisning  # 4. criteria that score publication
pnpm check:avdrag       # 5. scale rungs that deduct for a missing figure
node scripts/inventory-absence.mjs   # 6. empty cells — and see the warning below
```

⚠️ **`inventory-absence.mjs` undercounts, and it will undercount here too.** It
reads `tagline`, `pros` and `cons` and **not `verdict`**, where most prose debt
sits. It reported 3 claims on `/iphone-skarmskydd` where there were 11, and 3 on
`/avfuktare` where there were 13. On `/garageportsoppnare` it reported 0 and
there was one, in a verdict. Scan the long fields yourself before you write the
number down.

⚠️ **Numbers 4 and 5 are the ones that matter most, and they are the ones a
clean page still fails.** `/garageportsoppnare` scored 0 on the first three and
0 empty prose claims, and still carried the heaviest documentation-scoring
criterion on the site at weight 25. If you only look at verdicts and cells you
will call that page finished.

### 2. The ingress and the metadata description

Both must name the winner, what it is best at and what it costs. This is the
most valuable single edit on most pages, and the one most often missing.

Fails that have shipped: an ingress about our method or our sourcing rather than
about a product; in a security category, an opening on the catastrophe rather
than the protection.

### 3. Rewrite the verdicts

Four movements, **four paragraphs**, blank line between them in the string:
what it is and what it costs → USPs each carrying its consequence → one honest
limit → a decisive close. The winner gets an unconditional recommendation.

- Vary the closes. If more than half share a construction, rewrite some.
- Write about what we know. A gap in the research is not a subject: it belongs
  in the table as a dash, and the paragraph belongs to something useful.
- Digits for anything comparable.
- **Never explain the scoring inside a verdict.** "Det är därför den får 2,5 och
  inte 1,0" is machinery, not a recommendation. It has shipped twice.
- **Never put a correction inside a verdict.** Corrections live on `/rattelser`.

### 4. Taglines, superlatives, pros and cons

- The winner's `superlative` must not be `Bäst i test`.
- No two products share a superlative.
- A tagline sells a benefit, never a mechanism or the price objection.
- Every pro and con is about the product. A con may point to the product that
  solves the problem.
- **An award may never be for documentation.** `Bäst för dig som vill veta allt
  i förväg`, `Billigaste glaset med angiven tjocklek` and `Bäst angivna mått för
  pengarna` all shipped. A label says who the product suits.

### 5. Section descriptions, captions and FAQ

Where source-state narration hides once it is out of the verdicts. `description=`
on a `Section` is reader-facing text and gets the same rule. So do the tool FAQs
in `lib/tools.ts`, which carry their own copies of page facts and go stale
silently — two were found wrong this way.

### 6. The research pass — the long part

Now you know what the prose needs. This phase is **not optional and not last**,
and it is where a repair earns its name.

#### 6a. Every claim of absence, deleted or disproved

List every claim on the page that something is missing — in a con, a spec value,
a tagline, a verdict, a FAQ answer. Take each through
`.claude/references/establishing-absence.md`.

**Start from the assumption that we have not found it yet**, not that the source
failed to publish it. Of 20 such claims checked across six pages, **11 were
false**, and four had the answer in a document our own data already linked. The
`/avfuktare` correction states the base rate in four words: *felet låg i vår
research*.

That assumption decides the outcome before you start looking. Whatever the
search returns, **the claim leaves the reader-facing text.** Either you find the
fact and write it, or you find nothing and write about something else. There is
no third branch where a well-hedged absence gets published — the old version of
this skill had one, and it was wrong.

A gap also never lowers a score, and never gets raised as a finding. It goes in
`.agent/research/{slug}.md` with the rungs you tried, and nowhere else.

Three rules of thumb, each of which caught real errors:

- **The document the retailer already links is the highest-yield source, and the
  one nobody opens.** IKEA's manual held the per-port split, PPS range,
  efficiency and no-load draw. Biltema's manual held the frame thickness we said
  was unstated. Kjell's linked Housegard manual corrected two published figures
  and added "one person at a time". SecuritasHome's binding period sat in §4.1
  of the terms page we had in `termsUrl`. **Open it before concluding anything.**
- **A claim about the manufacturer cannot be established from a retailer**, and
  a claim about a company's whole site cannot be established from its front
  page. Enumerate the sitemap and read the shop.
- **Match on GTIN, and read `BASE` before hand-building a URL.** A Kjell product
  path invented by hand returns HTTP 200 on a page without the product, which
  reads exactly like an absence.

#### 6b. Every thin row, filled or replaced

`pnpm check:tackning` lists rows under 50 %. Work every one of them:

1. Run the gap pass in `.claude/references/spec-sourcing.md`. Home market before
   the `.se` page, the linked manual, CE and FCC filings, the spec panel
   photographed on the box.
2. **Try Icecat on every GTIN you have.** It is one command and it returns a
   structured spec table when it hits:

   ```bash
   node scripts/fetch.mjs --gtin <gtin>
   ```

   Expect it to miss about four times in five. Measured on our own catalogue:
   18 % open, 53 % behind the paid tier, 18 % not in the database. A spot check
   of five live GTINs in August 2026 returned one hit.

   ⏳ **Those figures are provisional.** Full Icecat is applied for and the
   answer is pending; when it lands the hit rate goes to roughly seven in ten.
   `.claude/references/spec-sourcing.md` says how to spot it and what to update.

   **A miss is never evidence.** `You are not allowed to have Full Icecat
   access` means the data exists and we cannot see it; `not present in the
   Icecat database` means Icecat has not catalogued it. Neither says anything
   about what the manufacturer publishes, and the script prints that reminder
   itself. Go to the manufacturer next.

   A hit is **tier B**, not the manufacturer, and the script labels it so. For a
   safety-shaped number you still need tier A or a second agreeing source.
3. If the row still will not fill, **change the row.** An attribute that is
   knowable and separates the field beats a prestigious one nobody publishes.
   Weight, capacity, control method, noise and dimensions are usually well
   covered.
4. **Highlight a label on every product or on none.** Otherwise the row silently
   disappears — `/brandstege` carried six such rows, one of them added by a
   repair run that did not check.
5. **One attribute, one label.** `check:tackning` catches reordered names
   (`Mått hopfälld` vs `Hopfällt mått`) but not synonyms — that page had
   `Max utrymningshöjd` and `Max evakueringshöjd` for the same measurement, and
   three different names for wall clearance. Read the label list yourself.
6. **A fragmented table is a thin table.** The checker lists pages where several
   labels sit on two products out of eight. Those are comparison rows somebody
   started and abandoned. Fill them across the field or replace them.

#### 6c. If the table is thin, make it richer

A repair may **add** rows, not only fill them. If the sourced material yields an
attribute that is knowable across the field and would help someone choose, put
it in for every product. The manuals opened in 6a routinely surface these:
evacuation height, no-load consumption, efficiency, one-person-at-a-time,
warranty length. A table that answers more real questions is a better page.

Any value you add is tiered, and a safety-shaped number needs tier A or two
agreeing tier-B sources. Never carry a value between models — match on GTIN, and
if two sources disagree, say which one is internally consistent and record the
conflict in the research file.

### 7. The criteria — do they rank the goods?

`pnpm check:avdrag` reports the rung-level version of this fault; read it
alongside the two signals below.

`pnpm check:redovisning` reports two signals: criteria whose **label** says
redovisning, and criteria whose **description** confesses it. Trust neither
list blindly and read the description yourself. There are three right answers,
and all three have been used:

- **Remove it** when it scores publication and every input is already scored
  elsewhere. `/iphone-skarmskydd`'s `Öppen redovisning` weighed thickness,
  coverage and box contents that three other criteria already weighed.
  Redistribute the weight proportionally and log a correction.
- **Rework the scale** when the attribute is real but the rungs have smuggled
  documentation in. `/luftrenare` gave 5,0 for a filter class in the spec table
  and 3,5 for the same class in the sales text. Same filter. The fix was a scale
  that grades the filter, plus a sentence closing the door: an H13 is an H13
  wherever it is written.
- **Keep it, and write down why**, when the terms *are* the product. On
  `/hemlarm` you are buying a contract: a company that will not publish its
  price forces a sales visit before you can compare, and the buyer carries that
  cost. A charger delivers 45 W whatever the datasheet says; a contract with an
  unknown binding period **is** a worse contract.

### A missing figure may never reduce a score

The rule, and it holds on every page: **a deduction must answer to something the
product does.** A fact we failed to establish is our problem, not the product's,
and it may not cost it a point.

This is the same fault as a redovisning criterion, one level down. It hides in
the *rungs* of an otherwise sound scale, so `check:redovisning` does not see it:

> `5,0 för angiven klass · 2,0 när ingen klass anges · 1,0 när standard saknas`

The middle rung is the fault. It scores our knowledge.

`/smart-termostat` shows what it costs. SONOFF TRVZB mounts on seven valve
fittings and the scale says seven gives 5,0, but it was scored 4,0 because the
box contents could not be confirmed — while the page's own buying guide already
counted it among the three that manage seven. That single point was deciding
first place. The contents turned out to be printed in the manufacturer's own
listing text. **The deduction was for our research, and it picked the winner.**

What to do instead when a figure will not come:

1. **Score what is established** and leave the unknown out of the arithmetic.
2. If nothing on that criterion is established for a product, omit the score
   rather than assigning a low one, and decide deliberately how the engine
   handles the gap — see `redistributeMissing` in `lib/products.ts`.
3. If the gap is so large the product cannot be judged at all, it belongs in the
   considered list, not in the ranking.
4. The buyer's inability to check something is a **con or a paragraph**, never a
   deduction.

**Two shapes where absence genuinely is the property**, and they are narrow:

- **Certification.** An uncertified product really does differ from a certified
  one — insurance, legal compliance, an actual test performed. But the absence
  has to be **established positively**: the seller writing that it is not
  approved, or no applicable standard existing for the category at all. Not
  finding a certificate is not evidence that none exists, and it is the same
  research gap as any other. Score *being certified*, never *the certificate
  being easy to find*, and never let "no class stated" sit on the same rung as
  "not approved". Where no applicable standard exists the criterion should not
  exist either: on hanging fire ladders it measured only who had typed a
  number.
- **Commercial terms.** A price you cannot get without a salesman in your living
  room is a worse offer, and the term *is* the goods. `/hemlarm`.

Everything else — thickness, CRI, watts, fittings, accuracy, capacity — the
goods are what they are whether or not anyone wrote it down.

Two distinctions worth keeping straight:

- **Unknown is not absent.** A purifier that states no filter class is an
  uncertainty; one with no HEPA filter at all is a deficiency. They must not
  share a score.
- **A criterion is rarely named "redovisning".** `/brandstege` called its
  `Dokumenterad provning` and carried weight 20 for three weeks.

Anything that changes a score goes in `lib/corrections.ts` with
`affectedRanking: true` when the order moves. Ties are broken by array order, so
check the real sorted output rather than the rounded scores before writing which
product moved where.

### 8. The long fields

`methodology`, each criterion's `description` and the source `note`s render as
paragraphs. Measured 6 August 2026: 541 such strings sitewide, none with a
paragraph break. Break the ones you touch, or shorten them. Shorter usually
beats broken — a criterion description needing three paragraphs is often two
criteria, or belongs in the buying guide.

### 9. Two variants ranked twice

If two ranked products are the same thing with a small difference, move one to
the considered list and state the difference. The test: swap the names, and see
whether the two verdicts can still be told apart.

### 10. Finish

```bash
pnpm check
pnpm build
```

Bump `const UPDATED` **and** `updated` in `lib/catalog.ts`; `check:refs` fails
if they disagree, and it also fails on any **tool** that builds on the page, so
bump those too. Record in `.agent/research/{slug}.md` what you rewrote, which
cells you filled, which you failed to fill and where you looked.

Report the six before-and-after numbers from step 1.

## What this skill does not do

- **Not a price round.** Use `update-page`. Only touch a price if you happened
  to verify it.
- **Not a rebuild.** Keep the ranking unless the rewrite or the research exposes
  a scoring error. If it does, fix it and log the correction.

## What it never does, attended or not

The skill writes to the working tree and stops there. These three hold whoever
invoked it and whatever time of day it is — they are not night-run rules.

1. **Never deploys.** No `vercel`, not even after a green `pnpm check`.
   Deploying is a separate, explicit instruction from the user.
2. **Never pushes.** A local commit is the end of the job.
3. **Commits only the page's own files.** Never `git add .`, never `git commit
   -a`. Name the paths: the data file, the page, the guide, the sources, and the
   shared files you genuinely touched.

That last one has teeth in this repo. Several sessions work in it at once, and
`lib/test-pages.ts`, `lib/catalog.ts`, `lib/tools.ts` and `lib/corrections.ts`
are shared. Run `git status --porcelain` first.

### Scripted edits to shared files

`git add .` is not the likeliest way to damage this repo. A regex is.

On 2026-08-06 a repair ran a script that replaced text between a start marker
and an `indexOf` end marker in `lib/test-pages.ts`. The end marker matched far
past the intended string, and ~900 lines collapsed onto one. `tsc` still passed,
because collapsed TypeScript is valid TypeScript, so nothing failed loudly.
Another session then wrote to the file mid-repair.

So, before any scripted edit to a file you did not write in full:

1. **Prefer `Edit`.** Anything you can express as an exact old string should go
   through the tool that fails loudly when the string does not match.
2. **Copy the file to the scratchpad first** when a script is genuinely the
   right tool — a repeated substitution across many products, say.
3. **Never write a TypeScript string containing a backslash-n through any
   heredoc. Use `Edit`.** Shell and Python heredocs both consume the escape
   and emit a real newline, which terminates the literal.

   Measured, not theoretical: it broke `lib/agent-tools.ts` during `/babyvakt`,
   then broke the same file one build later during `/skaftdammsugare`, by an
   agent that had read the warning. **The warning itself carried the bug** —
   the escape in this paragraph had been a real newline since it was written.

   `tsc` catches the unterminated literal. It does **not** catch the other
   failure mode: silent transliteration of å, ä and ö, which nothing catches
   and which reaches the reader. Read the region you changed, and grep it for
   Swedish vowels.
4. **Never end a slice on a delimiter you have not anchored.** `indexOf('",')`
   inside a file full of strings containing `",` will find the wrong one.
5. **Verify content, not just `tsc`.** Compare a token or string-literal
   fingerprint of the file before and after; whitespace outside strings may
   change, nothing else may. A green typecheck proves the file parses, not that
   it still says the same thing.
6. **Then run `pnpm check`, because the fingerprint is not enough either.** In
   the 08-07 case both `tsc` and a token-identical fingerprint passed while the
   file was still broken: the repair had left eight `export const` declarations
   sharing a line with the preceding `*/`, and the check scripts anchor on
   `^export const`. Twenty-one criteria from four different pages were being
   read as one page's weighting. Whitespace outside strings is not always
   cosmetic — the project's own tools parse by line. **If a shared file carries
another session's unfinished work and your change cannot be separated from it,
do not commit at all** — leave the work in the tree, say so in your report, and
let the user land it. Six night runs in a row ended this way, which is the right
outcome: an uncommitted correct page beats a commit that sweeps five half-built
pages into history.

## Decide it yourself, then write it down

**This skill does not stop to ask.** Earlier versions put the plan to the user
with `AskUserQuestion` before the big edits. That gate is gone: it stalled every
unattended run, and six night runs showed the judgement calls are almost always
resolvable from evidence rather than taste.

So: pick the page, rewrite the verdicts, fill or swap the rows, remove or rework
the criterion, and recompute the ranking. Take the option you would have
recommended. Do not present alternatives you are not going to pursue.

**The trade is the audit trail.** Because nobody approved it in advance, every
consequential decision has to be reviewable afterwards:

| You changed | It must land in |
|---|---|
| A score or a placement | `lib/corrections.ts`, `affectedRanking: true` if the order moved |
| A criterion, a weight or a scale | The same correction, with the reasoning |
| A spec value | A code comment with source and date, plus `.agent/research/{slug}.md` |
| A row you could not fill | `.agent/research/{slug}.md`, saying where you looked |

A change nobody can trace is worse than a change nobody approved.

### When to ask anyway

The test is not "is this important" — changing the winner is important and you
should just do it, with a correction logged. The test is **whether evidence can
settle it.** Ask only when it cannot:

- **Scope.** Dropping a ranked product, adding one, splitting the page, changing
  the slug. What the page compares is the user's call.
- **Money.** Swapping the merchant a product links to, or anything that moves
  affiliate revenue.
- **An unresolvable conflict on a safety figure**, where two tier-A sources
  disagree and the choice changes a placement. Say what each source says and let
  the user pick.
- **The page turns out to be the wrong tool for the job**, e.g. half the
  products are discontinued and it needs `update-page` instead.

Everything else — wording, weights, scales, which row to swap out, whether a
criterion grades documentation — you settle from the sources and record.

Night runs under `.agent/nattpass-runbook.md` add page selection, logging and a
time budget on top of this. They do not re-enable the gate, and they do not
loosen anything — no deploy, no push and page-only commits are the skill's own
rules and apply to every invocation.
