---
name: new-page
description: Build a complete "bäst i test" test page for smartatest.se, from competitor research through sourced products, buying guide, tools and verification. Finishes by setting the page live in the catalog without asking — it holds only when told to, or when something on the page could mislead a buyer. Never deploys and never pushes. Use when creating a new test page, adding one to the catalog, or rebuilding an existing test page to the current template.
---

# New "bäst i test" page

Builds a test page to the template proven on `/smart-belysning`: the only
page in the Swedish, German or American markets with interactive tools, and the
only one that cites the tests it collates.

This skill is the **order of work**. The substance lives in the department
files, which are also reachable without it. Read each as you reach its phase,
not up front.

| Phase | Read |
|---|---|
| 1 | `.claude/context/research.md`, `.claude/context/money.md` |
| 1 | `scripts/fetch.mjs` and `scripts/sok.mjs` — the research toolkit, see below |
| 3–4 | `.claude/context/data.md` |
| 3 | `pnpm check:redovisning` and `pnpm check:avdrag` on your draft criteria, before you propose them |
| 4 | `.claude/references/spec-sourcing.md`, before the gap pass |
| any | `.claude/references/establishing-absence.md` + `node scripts/fetch.mjs`, **the moment you are about to write that a fact is not published** |
| 4 | Skill `swedish-voice`, before any reader-facing sentence |
| 5 | `.claude/context/build.md`, `.claude/references/page-anatomy.md` |
| 5 | `.claude/context/traps.md`, before writing component code |
| 6–7 | `.claude/context/ship.md`, `.claude/context/seo.md` |

---

## Phase 0: Orient

Do not ask anything yet.

1. `.agent/plans/plan.md`, `.agent/planerade-sidor.md`, `.agent/ideas-testsidor.md`
2. `lib/catalog.ts` for which test pages exist and their `status`
3. `lib/data/smart-belysning.ts` and `app/smart-belysning/page.tsx` as the
   reference implementation. Everything new mirrors these.
4. `.agent/adtraction-se-katalog.json` for merchant supply

## Phase 1: Research, before any questions

Competitors, independent tests, products, also-rans, search intent. The supply
sweep runs here too, because it decides which merchant every product links to.

### The tools

```bash
node scripts/sok.mjs "<fråga>"                    # Brave först
node scripts/fetch.mjs <url> --find "vikt,mått"   # curl → r.jina.ai → Playwright
node scripts/fetch.mjs <url> --raw                # hela texten
node scripts/fetch.mjs --gtin <gtin>              # strukturerade specar ur Icecat
```

**Run `--gtin` on every GTIN you collect, once the manuals are done.** One
command each, and a hit returns a structured spec table. A hit is **tier B**,
not the manufacturer, and the script labels it so.

**A hit also carries `HighPic`**, a 1200×1200-ish packshot, and that is worth
as much as the specs. `/skaftdammsugare` got three product images this way on
products where the retailers served 98×208 and 355×289 thumbnails. Check the
XML for it on every hit, not only when the spec table is thin.

Hit rate is **less settled than it looks**: 18 % open across the catalogue,
but `/babyvakt` got 1 of 9 and `/skaftdammsugare` 4 of 8. Big-brand appliances
are catalogued far better than Nordic niche products, so budget by category
rather than by the sitewide number.

⏳ Those figures are provisional — Full Icecat is applied for, answer pending.
See `.claude/references/spec-sourcing.md`.

A miss is never evidence about the manufacturer. `You are not allowed to have
Full Icecat access` means the data exists and we cannot see it. Go to the
manufacturer next; the script says so itself.

Order matters: **manuals first, then sweep the GTINs for whatever is still
empty.** Icecat rarely overturns a decision the manual has already settled, and
a miss costs a round-trip.

`fetch.mjs` climbs a ladder and **prints bytes and term hits for every rung**,
so a silent tool can never pass for a silent source. Read the rung table before
concluding anything: `curl` with a proper user-agent walks through Cloudflare
checks that stop Playwright, and the browser rung finds PDFs that manual
attempts miss. It handles manual PDFs directly.

Search quotas, because they are small: Brave 2 000/month, Serper 2 500 credits,
**SearchAPI only 100/month**. Do not run `sok.mjs --alla` routinely.

Two habits that decide whether the research is real:

- **Enumerate the sitemap** rather than reading a front page. A claim about a
  company's whole site cannot be established from its home page — that error put
  a wrong price claim about an alarm company live for months, and repeating the
  check properly on a second company confirmed the opposite.
- **Open the document the retailer links.** Manuals, terms and datasheets carry
  the fields the product page omits, and they are one click away. This is the
  single highest-yield source in the whole toolkit; see phase 4.

Write findings to `.agent/research/{slug}.md` **as you gather**. A full run is
long enough to be compacted, and anything re-derived from memory is invented.

Produce a written summary before asking anything.

## Phase 2: Confirm scope (AskUserQuestion)

One batch, each option carrying what the research found:

1. **Test page and slug.** Existing `planned` entry or new? URLs stay flat; the
   category is taxonomy only.
2. **Category.** `Smart hem` today. If the subject is security-shaped,
   ask whether to open a `Säkerhet` category.
3. **Product shortlist**, with prices and merchants. Say which candidates a
   high-commission, PPC-permitted shop carries.
4. **Anything the research surfaced as genuinely ambiguous.** A discontinued
   product, a subject that splits by socket or size, a market where one brand
   owns 80 % of results.

Do not ask about what the codebase already decides. Flat URLs, derived scoring,
the em-dash rule and the tools pattern are settled.

## Phase 3: Criteria and weights (AskUserQuestion)

Propose 5 criteria with weights summing to 100 and a one-line justification
each, drawn from what the sourced tests actually measure.

**The weights are the user's call.** They decide the ranking, and a weighting
invented by the assistant is the same fabrication as an invented measurement.
Recommend, then let the user adjust.

Drop a criterion the sourced tests cover too thinly to score. A column of
dashes is worse than four criteria.

### Never build a criterion that scores publication

This is the fault this skill has shipped most often, and the one `/fix-page`
has spent six runs removing. Between 2026-08-05 and 08-06, criteria worth 15,
20, 25 and 15 points were torn out of four pages and one scale was rebuilt, and
`pnpm check:redovisning` still lists five more waiting.

A criterion must rank **what the product does**, never how thoroughly the seller
wrote about it. Two protectors with the same H13 filter, one stated in a table
and one in the sales text, are the same protector. A charger delivers 45 W
whether or not the datasheet says so.

Test the proposal before you offer it:

- Would two physically identical products score differently? Then it grades the
  page, not the goods.
- Is every input already scored under another criterion? `Öppen redovisning` on
  `/iphone-skarmskydd` weighed thickness, coverage and box contents that three
  other criteria already weighed. It was a second vote on the same facts.
- Does the description have to explain *where* a fact appears, or what the buyer
  "can check in advance"? Both are confessions.

**It is rarely called redovisning.** The versions that shipped were named
`Dokumenterad provning`, `Öppen redovisning`, `Filterklass enligt EN 1822` and
`Bäst angivna mått`. Run `pnpm check:redovisning` on your draft — it reads both
the label and the description.

Three legitimate shapes, all of which survive:

- **A real attribute with a scale that grades the attribute.** Filter class is
  fine; 5,0 for a stated H13 and 3,5 for the same H13 in a different paragraph
  is not.
- **Certification, where being tested is the property.** A fire blanket
  certified to EN 1869 differs from one that is not. But check an applicable
  standard exists — on hanging fire ladders none did, so the score only measured
  who had typed a number.
- **Terms, when the terms are the product.** On a subscription you are buying a
  contract; a company that will not publish its price forces a sales visit
  before you can compare, and the buyer carries that cost.

**Unknown is not absent.** A purifier that states no filter class is an
uncertainty; one with no HEPA filter at all is a deficiency. Never give them the
same score.

### A criterion that does not separate the field is a gate, not a criterion

The tests above catch criteria that grade the wrong thing. This one catches a
criterion that grades the right thing and still earns its weight for nothing.

`/babyvakt` drafted *Larm när förbindelsen bryts* at weight 30, on the strength
of a competitor's "no warning" facet. Then the manuals showed that essentially
every current monitor warns somehow, and nine of eleven scored 4,0–5,0. Thirty
weight points were being spent to say almost nothing.

**Score the draft against the field before you fix the weight.** If most
products land on the same rung, you have found a gate — a thing every product
must pass — rather than an axis that ranks them. Two ways out, both fine:

- **Find the rung that separates them.** *Does it warn at all* is a gate;
  *does it warn on the parent unit, the baby unit, or only with a silent LED*
  might be an axis.
- **Drop the weight** to what the remaining spread justifies, and say in the
  criterion description that the field is tight. A gate everyone passes is
  worth stating in prose and worth very little in a ranking.

### The scale needs the same rule as the criterion

A criterion can pass the tests above and still smuggle the fault into its
**rungs**. This is the version that survives, because `check:redovisning` reads
the description and sees nothing wrong with:

> `5,0 för angiven klass · 2,0 när ingen klass anges · 1,0 när standard saknas`

The middle rung scores our knowledge, not the goods. **A deduction must answer
to something the product does.** A figure we failed to establish is our problem.

`/smart-termostat` is the worked example. The scale said seven valve fittings
gives 5,0; SONOFF TRVZB has seven and was scored 4,0 because the box contents
could not be confirmed. That one point was deciding first place, and the
contents were printed in the manufacturer's own listing text all along.

When you write a scale, every rung must name something the product is or does.
If a product cannot be placed on the scale, leave the score out rather than
putting it at the bottom, and decide deliberately what the engine does with the
gap — see `redistributeMissing` in `lib/products.ts`. If it cannot be judged at
all, it belongs in the considered list.

**Two shapes where absence genuinely is the property**, and both require the
absence to be **established positively** rather than merely unfound:

- **Certification**, where an uncertified product really differs. The seller has
  to say it is not approved, or no applicable standard exists for the category.
  Failing to find a certificate proves nothing. Score being certified, never the
  certificate being findable, and drop the criterion entirely where no
  applicable standard exists.
- **Commercial terms**, where a price you cannot get without a sales visit is
  itself a worse offer. You tried to buy and were stopped — that is evidence.

*(`/fix-page` may later remove a criterion and redistribute its weight without
asking. That is not a contradiction of the rule above: the user sets the
weighting for a page that ranks the goods, and a criterion that turns out to
rank the paperwork was never part of that decision. The change is logged in
`lib/corrections.ts`.)*

## Phase 4: Source real data

Prices, GTINs, URLs, images, ratings, specs. Nothing invented, everything dated.
Define the spec schema in `lib/spec-schema.mjs` **before** writing any product.

> **Read "The eight faults every new page has reinvented" in phase 5 now, not
> when you reach it.** Four of them — the ingress rule, the four-paragraph
> verdict, the tagline rule and the superlative ceiling — govern text you write
> in *this* phase. The `/skaftdammsugare` build reached the list with eight
> verdicts, eight taglines and the metadata description already written, and
> had to go back and redo three taglines.

### Never praise a source for publishing something

The criterion rules below stop a *weight* from grading documentation. They do
not stop the **prose** from doing it, and on the last two new pages the prose
did it anyway while `check:redovisning` stayed green:

> ~~"Philips anger dessutom båda drifttiderna … och skriver ut i en fotnot"~~
> ~~"…vilket är den ärligaste sortens siffra en tillverkare kan publicera"~~
> ~~"75 meter inomhus, angivet av tillverkaren i stället för gissat"~~
> ~~"Det gör den ovanlig i sällskapet, där åtta av elva bara publicerar…"~~

**The trap is structural, and it springs hardest on your best pages.** When the
page's own finding is about how a figure is published — a runtime measured in
eco mode, a range measured in free air — every honest manufacturer starts to
look like a virtuous one, and the verdicts drift into grading press material.
The finding is real and belongs to the page. It belongs in the buying guide and
the findings section, which compare the *category*. A verdict compares one
product against the others a reader might buy instead.

The fix is never to delete the number. Keep the figure, drop the praise:

> "Den går 60 minuter i ekoläge och 15 i turbo, och båda talen gäller
> handenheten utan golvmunstycke. Med munstycket på blir det kortare."

Same fact, more useful, and it survives the seller changing their datasheet.

Then fill it. The schema is a **work order**, not a header row: N products times
M fields is a grid, and an empty cell is an open task with a name.

1. **Sweep** — the source ladder in `.claude/context/data.md` §Specifications.
2. **Gap pass** — list the cells still empty and hit each with a *different
   modality than the one that already failed*. The playbook is
   `.claude/references/spec-sourcing.md`: the manufacturer's home market rather
   than the `.se` page, Icecat by GTIN, CE and FCC filings, the spec panel
   photographed on the box, retailer Q&A, spare-part listings, teardowns.
3. `pnpm check:tackning` — any highlighted row under 50 % filled is either
   unfinished research or the wrong row. Both are fixable; decide which. The
   same check reports two schema faults that are cheap to avoid now and tedious
   to repair later:
   - **One attribute, one label.** `Mått hopfälld` and `Hopfällt mått` are two
     half-filled rows instead of one whole one, and the reader sees neither. The
     check catches reordered names but not synonyms, so read your own label list:
     one page shipped `Max utrymningshöjd` and `Max evakueringshöjd` for the
     same measurement, and three different names for wall clearance.
   - **A fragmented table is a thin table** — but only for rows that are
     *marked*. `check:tackning` flags labels that are `highlight: true`
     somewhere and present on half the field or fewer: those are comparison
     rows somebody started and abandoned. Fill them across the field or drop
     the row.

     ⚠️ **An unmarked label on a few products is not fragmentation, and you
     must not delete it.** It lives in that product's own spec list, where a
     gap costs nothing, and it is often the most specific thing you found. The
     check counted unmarked labels until 2026-08-06, and the `/babyvakt` build
     deleted four rows of sourced tier-A data — standby time, warranty,
     charging, night vision — to make it green. **The check made the page
     worse.** If a check ever pushes you to delete a fact you have sourced,
     stop and fix the check.

A richer table is a better page. When a manual hands you an attribute that is
knowable across the whole field and would help someone choose — evacuation
height, no-load consumption, efficiency, warranty length, one-person-at-a-time —
add it for every product rather than letting it sit in one product's prose.

Source tiers apply. A safety-shaped value needs tier A or two agreeing tier-B
sources, and other "bäst i test" sites are a lead and never a source.

**A gap in the specifications is our research, not the source's silence.** That
is the default assumption, and it decides three things before you look:

- **It never reaches the reader.** `Ej angiven` in the data file, a dash in the
  table, and nothing at all in prose, a heading, a verdict, a pro/con or a FAQ
  answer. We have nothing to say, so we say nothing.
- **It never lowers a score.** A deduction must answer to something the product
  does. Leave the score out of the arithmetic instead of putting it at the
  bottom; see `pnpm check:avdrag`.
- **It is not a finding.** It goes in `.agent/research/{slug}.md` with the rungs
  you tried and the date. Do not raise it as a blocker or headline it in a
  summary. An incomplete search is a routine outcome, not news.

Before you write `Ej angiven` — or any of *anges inte*, *publiceras inte*,
*saknas*, *är okänd*, *ingen tillverkare anger* — work
`.claude/references/establishing-absence.md`.

**Twenty such claims were checked across six pages in August 2026. Eleven were
false.** Not one of them was hard to find. The pattern is unmistakable:

| Page | Where the answer was | What it gave |
|---|---|---|
| /usb-c-laddare | IKEA's own manual, linked from the product page | per-port split, PPS range, efficiency, no-load draw |
| /brandstege | Biltema's manual, linked from the product page | frame thickness we called unstated, EN 131-6, 4,7 m |
| /brandstege | Housegard's manual, linked by Kjell | corrected two published figures, plus one-person-at-a-time |
| /hemlarm | SecuritasHome's terms, §4.1, the URL already in our data | binding and notice period — **it changed the winner** |

**Open the document the retailer links before declaring anything unstated.** It
is the highest-yield source in the toolkit and the one nobody opens. In four of
those cases we were already linking to the document that contained the answer.

Three more mechanical habits:

- **Render the product page and take the article number.** Kjell ships specs as
  JavaScript-rendered prose, so `curl` and table scrapers both return an empty
  result that is indistinguishable from an empty page.
- **Match on GTIN, and read the file's own `BASE` before hand-building a URL.**
  A Kjell product path assembled by hand returns HTTP 200 on a page without the
  product — which reads exactly like an absence and nearly produced a false
  claim that a filter class was unpublished when it was stated plainly.
- **When two tier-B sources disagree, take the one that is internally
  consistent** and record the conflict in the research file. A charger listed at
  "45 W + 30 W" on a 65 W unit is arithmetic, not a spec.

## Phase 5: Build

1. `lib/catalog.ts` entry, still `status: "planned"`, `updated` matching the
   page's `const UPDATED`
2. `lib/test-pages.ts` entry with criteria and a comparison-based
   `methodology` string. **Write it in paragraphs**, separated by a blank line
   in the string, and the same for each criterion's `description`. These render
   through the same splitter as verdicts.

   On length: **the paragraph break is the rule, the sentence count is not.**
   Aim for 3–5 sentences per paragraph and 2–4 per criterion, but shipped pages
   run far longer where the category earns it, and that is not a defect to
   copy or to correct. When the guidance and the codebase disagree about
   *length*, the codebase wins; when they disagree about *whether it is
   broken into paragraphs*, the guidance wins. See `swedish-voice`,
   `references/writing-guide.md`.
3. `lib/sources.ts`, every URL verified. A `note` is 1–3 sentences on what the
   source contributes; break it in paragraphs if it must run longer.
4. `lib/data/{slug}.ts` products, considered list, FAQ — and **spread it into
   `ALL_PRODUCTS`**
5. `content/{slug}/kopguide.mdx`, about 12 sections, roughly 1 800 words
6. Tools, if the test page needs any beyond the shared ones
7. `app/{slug}/page.tsx`, composed from existing components
8. `app/{slug}/opengraph-image.tsx`, about fifteen lines, copied from a
   neighbouring page. It is on most but not all live pages, which makes its
   absence read as deliberate when it is not. Build it.
9. A `/styleguide` bench for anything genuinely new

### The eight faults every new page has reinvented

Check these before phase 6, because none of them is visible in `tsc`, `lint` or
the browser, and each has shipped on a brand new page after being removed from
the previous one:

1. **The ingress names no product.** It must name the winner, what it is best
   at and what it costs — same for `metadata.description`. See
   `.claude/references/page-anatomy.md`.
2. **Verdicts written as one block.** Four movements, four paragraphs,
   separated by a blank line in the string. `pnpm check:omdomen`.
3. **Source state in reader-facing strings**, including `description=` on a
   `Section` and the FAQ answers in `lib/tools.ts`. Write about the product, not
   about what a document contains.
4. **`highlight` set inconsistently**, which silently deletes a table row.
   `pnpm check:tackning`.
5. **A superlative longer than 35 characters.** One number, and it is 35. The
   badge starts clipping at around 39, so 35 is the limit with the margin
   already in it — do not treat 39 as the budget. This has bitten **five**
   pages, and the figure sat only in a code comment on `/mjolkskummare` in
   `lib/catalog.ts` ("fjärde gången felet uppstår"), nowhere an agent building
   the next page would look. Count characters, not bytes: å, ä and ö are two
   bytes each, so `awk`, `wc -c` and most shell one-liners overstate a Swedish
   superlative by three or four and will send you rewriting good text.
6. **An award given for documentation.** `Bäst för dig som vill veta allt i
   förväg`, `Billigaste glaset med angiven tjocklek` and `Bäst angivna mått för
   pengarna` all shipped on pages built by this skill. A superlative says who
   the product suits, never how good its product sheet is. The winner's
   superlative is also never `Bäst i test`.
7. **Scoring machinery inside a verdict.** "Det är därför den får 2,5 och inte
   1,0" explains our spreadsheet to someone who wants to buy a fan. It has
   shipped twice.
8. **A tagline selling a mechanism or a gap.** `Publicerar kapaciteten vid två
   olika villkor` and `721 kundomdömen, och klassen står i fel stycke` were both
   live. Lead with the number and what it means: `7,5 liter per dygn vid 20
   grader, alltså talet som gäller i ett svenskt hus`.

## Phase 6: Critical pass

Work the rubric in `.claude/context/ship.md`, then re-run the phase 1 comparison
with our page in it, looking for capabilities rather than volume.

The standard is the richness of `/smart-belysning`, not its length.

Two passes is normal.

## Phase 7: Verify

`pnpm check`, `pnpm build`, then a browser at 1440px and 390px. Measure, never
eyeball. Full list in `.claude/context/ship.md`.

`check:omdomen`, `check:tackning`, `check:redovisning` and `check:avdrag` report site-wide debt
rather than failing. Read the lines that name **your** slug and clear them; the
rest belongs to `/fix-page`. A new page should add **nothing** to any of the
four — if your slug appears, it shipped with a fault the last six repair runs
were spent removing.

## Flip to live

**Publish it. Do not ask.** A page that passes phase 7 is done, done means
live, and setting `status: "live"` in `lib/catalog.ts` is part of finishing the
job rather than a separate decision someone else makes. Do it in the same pass:
images in place for every ranked product, criterion scores set, `pnpm check`
and `pnpm build` green, both widths measured.

Do not invent a fourth condition. Unmeasured search volume, an affiliate
programme we have not joined, and a page we cannot advertise are **not**
blockers — they are follow-up work, recorded once in
`.agent/research/{slug}.md` and nowhere else. The full statement, and why each
one costs more unpublished than published, is in `.claude/context/ship.md`.

An unpublished finished page earns nothing, ages nowhere, and answers nobody.

### Two things that stop it, and nothing else

**1. You were told not to.** If whoever invoked this skill said to hold the
page, it stays `planned`. Say once that it is ready and then let it go. Do not
weigh the argument above against an explicit instruction, and do not raise it
again — an operator's override ends the argument, it does not open one.

**2. Something on the page could mislead a buyer.** Not "could be better" —
*could mislead*. The list is short and concrete, because a vague standard here
becomes either an excuse to hedge or a line nobody reads:

- **A price, a safety figure or a ranking-deciding number you could not source
  to the tier it needs.** A safety-shaped value wants tier A or two agreeing
  tier-B sources. If the winner's placement rests on a figure you are not sure
  of, that is the case, not a scruple.
- **A product you cannot confirm is still sold.** Ranking a discontinued
  product is the error `/elektrisk-rullgardin` and `/smart-brandvarnare` were
  built to correct, and it is worse than publishing late.
- **A legal or regulatory claim you have not read in the original.** The IMY
  angles on `/overvakningskamera` and `/dorrklocka-med-kamera` and the
  standards work on `/brandfilt` all turn on documents that were read in full.
  Paraphrasing a paraphrase is how a page ends up asserting law that does not
  exist.
- **A red check you did not cause and do not understand.** Green means green.

When one of these applies: leave `status: "planned"`, write in
`.agent/research/{slug}.md` exactly which item and why, and say so plainly in
your report. **Fix it and publish if you can** — the hold is for the case where
you genuinely cannot, not the case where it would take another hour.

Everything else ships. A thin spec row, an unmeasured search volume, a category
where nobody has run an independent test, a merchant we earn nothing from — all
of those are ordinary and none of them is a reason to sit on a finished page.

## Scripted edits to shared files

A new page necessarily writes to `lib/catalog.ts`, `lib/test-pages.ts`,
`lib/sources.ts`, `lib/data/index.ts` and `lib/tools.ts` — all shared, all
long, all carrying other sessions' work.

### When another session's file is red, you are not blocked

`pnpm check` runs `tsc` first and `&&`s the rest, so **one broken line anywhere
in the repo hides every check you actually care about**, and `pnpm build` fails
too. `/skaftdammsugare` lost forty minutes to `lib/sources.ts` being mid-edit by
the session building `/dorrklocka-med-kamera`.

It is not your error and you must not fix it — that file is someone else's
uncommitted work. Do this instead:

1. Confirm the failing line is one you did not write (`git diff` on that file).
2. Verify your own page by running the individual scripts directly, which do
   not depend on `tsc`: `node scripts/check-tackning.mjs`, `check-omdomen.mjs`,
   `check-redovisning.mjs`, `check-avdrag.mjs`, `check-refs.mjs`.
3. Say so in your report, naming the file and the other page.
4. **Re-run the full `pnpm check` before you finish.** These windows are
   usually minutes, and a green run is the only thing that clears you.

`git add .` is not the likeliest way to damage this repo. A regex is. On
2026-08-06 a script collapsed ~900 lines of `lib/test-pages.ts` onto one line
because an `indexOf` end marker matched far past the intended string, and `tsc`
passed anyway, because collapsed TypeScript is valid TypeScript.

1. **Prefer `Edit`** for anything expressible as an exact old string. It fails
   loudly when the string does not match; a regex fails silently.
2. **Copy the file to the scratchpad first** when a script really is the right
   tool, such as one substitution repeated across a dozen products.
3. **Never write a TypeScript string containing a backslash-n through any
   heredoc. Use `Edit`.** Not "be careful with" — do not do it. Shell and
   Python heredocs both consume the escape and emit a real newline, which
   terminates the literal.

   This is not a caution, it is a measured repeat. It broke
   `lib/agent-tools.ts` during the `/babyvakt` build; it broke the *same file*
   one build later during `/skaftdammsugare`, from a Python heredoc, by an
   agent that had read this warning. **And the warning itself was corrupted by
   the bug it describes** — the escape in this very paragraph had been a real
   newline since the day it was written, which is why it read as a story about
   the past rather than an instruction.

   Two failure modes, and only one is loud:
   - **Unterminated literals.** `tsc` catches these instantly.
   - **Silent transliteration of å, ä and ö.** Nothing catches this. Not
     `tsc`, not `lint`, not the browser. It reaches the reader.

   **Read the region you changed**, and grep it for Swedish vowels.
4. **Never end a slice on an unanchored delimiter.** `indexOf('",')` in a file
   full of strings containing `",` finds the wrong one.
5. **Verify content, not just `tsc`.** Fingerprint the string literals before
   and after; whitespace outside strings may change, nothing else may.

## What this skill never does

**"Live" means `status: "live"` in `lib/catalog.ts`. It does not mean
deployed.** The section above tells you to publish without asking; that is the
catalog flag and nothing more. The page reaches actual readers when someone
deploys, and that someone is not you.

1. **Never deploys.** No `vercel`, not even with everything green. Deploying is
   a separate, explicit instruction from the user.
2. **Never pushes.** A local commit is the end of the job.
3. **Commits only this page's own files.** Never `git add .`, never
   `git commit -a`. Name the paths.

The third one has teeth here. Several sessions work in this repo at once, and a
new page necessarily touches the shared files — `lib/catalog.ts`,
`lib/test-pages.ts`, `lib/sources.ts`, `lib/data/index.ts`, `lib/tools.ts`.
Run `git status --porcelain` first. **If a shared file carries another session's
unfinished work and your entry cannot be separated from it, do not commit at
all** — leave the work in the tree and say so in your report. An uncommitted
finished page beats a commit that drags half-built pages into history.
