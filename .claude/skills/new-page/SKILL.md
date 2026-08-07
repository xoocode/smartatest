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
| 3 | `pnpm check:redovisning` and `pnpm check:avdrag` on your draft criteria, before you build on them |
| 4 | `.claude/references/spec-sourcing.md`, before the gap pass |
| any | `.claude/references/establishing-absence.md` + `node scripts/fetch.mjs`, **the moment you are about to write that a fact is not published** |
| 4 | Skill `swedish-voice`, before any reader-facing sentence |
| 5 | `.claude/context/build.md`, `.claude/references/page-anatomy.md` |
| 5 | `.claude/context/traps.md`, before writing component code |
| 6–7 | `.claude/context/ship.md`, `.claude/context/seo.md` |

---

## Phase 0: Orient and pick the subject

Read all five before you ask anything. The one question this skill asks lives at
the end of this phase.

1. **`.agent/testsidor-tackning.md`** — the coverage map. Which pages exist per
   category, which are missing, and which have already been rejected and why.
   **This is where the subject comes from.**
2. `lib/catalog.ts` for which test pages exist and their `status`
3. `lib/data/smart-belysning.ts` and `app/smart-belysning/page.tsx` as the
   reference implementation. Everything new mirrors these.
4. `.agent/adtraction-se-katalog.json` for merchant supply
5. `.agent/plans/plan.md`, and `.agent/byggda-sidor.md` for what a previous
   build of a neighbouring page ran into

### Picking the subject

**If the user named a subject, build that.** Nothing below applies.

**If they did not**, offer a choice with `AskUserQuestion`. **The tool takes at
most four options**, and it adds "Other" itself, so pick exactly four.

Order of drawing:

1. **Every `ready` row first.** Someone already did the thinking on those, and
   there are rarely more than three. Skip any that is `writing`.
2. **Fill the remaining slots from `suggested`**, choosing rows that differ from
   each other — a large category and a niche one, a commercially strong one and
   a cheap one — rather than the first four in file order. Name the category
   each comes from, since the map is sorted by category and not by priority.

Each option gets the row's own comment as its description, so the user chooses
on the reason the row exists rather than on the slug.

Three things the map is telling you, and they are easy to misread:

- **A `rejected` row is closed.** The reason is on the row. Do not re-propose it,
  and do not re-derive the reason.
- **A `ready` row beats a `suggested` one.** Someone already did the thinking.
- **Low volume is not a reason to skip a row.** The map is deliberately
  permissive: a term with 90 searches and no competitor is often worth more than
  one with 12 000 and six affiliate sites fighting over it. Volume orders the
  queue; it does not filter it.

The map is a task list, five row forms:

```
- [x] `/slug` — live          - [ ] `/slug` — suggested
- 🟢 `/slug` — ready          - ✍️ `/slug` — writing
- ❌ `/slug` — rejected
```

Change `- [ ]` to `- ✍️` when you start, and to `- [x]` when the page ships.
Then run `pnpm check:sidkarta`, which reconciles the map against the catalog in
both directions. A build that leaves the map stale makes the next agent either
redo a page that exists or skip one that does not.

## Phase 1: Research

The subject is settled and nothing else gets asked, so this phase decides the
page. Competitors, independent tests, products, also-rans, search intent. The supply
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

### Every programme the sweep turns up goes in the tracker

`.agent/plans/affiliate-ansokningar.md` is the standing list of programmes and
networks, with a status column Peter fills in. **Add any programme the sweep
surfaces that is not already there, in the same pass**, with status `–`. That
includes the ones you decide against: a programme with the wrong assortment is
worth a row saying so, because the next build otherwise re-checks it.

The rule exists because the finding used to die in the research file. Coffee
Friend at 10 percent with paid search allowed was found on `/mjolkskummare` on
2026-08-05 and found again from scratch on `/smoothiemixer` the next day, where
it was reported as news. The programme is filed under `Food` in Adtraction's
catalogue and sells blenders, so a category grep will keep missing it — which is
exactly the sort of thing a written row fixes and a research file does not.

**Never fill in Status, Datum or Kommentar.** Applying is a business relation in
Peter's name, and an agent that writes `Ansökt` invents a task nobody did.

Produce a written summary before asking anything.

## Phase 2: Set the scope

**Decide these from the research and write them down. Do not ask.**

Once the subject is chosen the run is unattended. Every question after that
point was answered with the recommended option anyway, so asking spent a round
trip to arrive where the research already pointed.

1. **Slug.** Flat URL. Take the coverage map's slug unless the research shows a
   bigger term — measure before you rename, `/elektrisk-rullgardin` beat
   `/smarta-gardiner` 1 600 to 110.
2. **Category.** Take the one the map puts the row under. Five exist:
   `Säkerhet`, `Elektronik`, `Hem & hushåll`, `Smart hem`, `Kök`. They are
   **wide buckets on purpose**, and a subject that only half fits goes in the
   closest one.
3. **Product shortlist.** Eight to twelve ranked, the rest considered. Prefer a
   payable, PPC-permitted merchant near the top where the ranking allows it —
   never by moving the ranking.
4. **The angle.** What this page knows that the competitors do not. If the
   research produced no such finding, keep researching; a page without one is
   the sixth copy of a list that already exists five times.

### Ask only when you cannot recommend

`AskUserQuestion` is not banned after the subject is chosen. The rule is
narrower: **if you can form a recommendation, act on it.** A question whose
first option is the one you would have taken is a question that should not have
been asked.

That leaves genuinely few cases, and they share a shape — the evidence is
present and still does not decide:

- **Opening a new category.** Needs a `Category` in `lib/catalog.ts` and affects
  navigation sitewide. Ask only when several rows are ready at once; do not open
  one to fit a single page.
- **Two tier-A sources disagreeing on a safety figure**, where the choice moves
  a placement. Say what each says and let the user pick.
- **A merchant question that moves money** — a shop on the blocked list in
  `.claude/context/money.md`, or dropping the only payable merchant on the page.
- **The subject turning out to be two subjects**, where splitting or merging
  changes what the page compares.

Everything else — weights, scales, which product is cut, which row is swapped,
how a criterion is worded — you settle and record. The audit trail is the trade:
the reasoning goes in `.agent/research/{slug}.md`, and anything that moves a
score goes in `lib/corrections.ts`.

Do not ask about what the codebase already decides. Flat URLs, derived scoring,
the em-dash rule and the tools pattern are settled.

## Phase 3: Criteria and weights

Five criteria, weights summing to 100, each with a one-line justification drawn
from what the sourced tests actually measure. **Set them yourself and record the
reasoning in `.agent/research/{slug}.md`.**

This used to be a gate, on the argument that a weighting invented by the
assistant is the same fabrication as an invented measurement. That was wrong,
and the distinction is worth keeping straight: **a measurement is a fact we
either have or do not. A weighting is a judgement, and it is defensible when it
follows the sourced tests and is written down.** The fabrication risk lives in
inventing what the tests found, not in deciding how much each finding counts.

So the bar is not approval — it is that a reader could reconstruct your
reasoning from the page. The criterion descriptions are reader-facing and carry
that weight; write them as though someone will argue with them, because the
whole model of this site is that they can.

Drop a criterion the sourced tests cover too thinly to score. A column of
dashes is worse than four criteria.

Run `pnpm check:redovisning` and `pnpm check:avdrag` on the draft before you
build on it. Both read `lib/test-pages.ts`, so the criteria have to be written
first — and both catch faults that are expensive to unpick once every product
carries a score.

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

*(`/fix-page` may later remove one of your criteria and redistribute its weight.
That is the same standard applied twice, not a reversal: a criterion that turns
out to rank the paperwork should not have carried weight in the first place. It
logs the change in `lib/corrections.ts` with `affectedRanking: true` when the
order moves.)*

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

Set `published` on the catalog entry to the date you built it, and flip the row
in `.agent/testsidor-tackning.md` to ✅. Then run `pnpm check:sidkarta`, which
compares the map against the catalog and says so when the two disagree.

Do not invent an extra condition. An affiliate programme we have not joined and
a page we cannot advertise are **not** blockers — they are follow-up work,
recorded once in `.agent/research/{slug}.md` and nowhere else. The full
statement, and why each one costs more unpublished than published, is in
`.claude/context/ship.md`.

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

Everything else ships. A thin spec row, a category where nobody has run an
independent test, a merchant we earn nothing from — all of those are ordinary
and none of them is a reason to sit on a finished page.

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

**These three are how this skill always works. They are not findings.** Not
deploying is not an outcome, and neither is not pushing. Do not list them at the
end of a run — see the report format below, which is the last word on what a
finished run says.

## Finish: what to report

A finished page gets a **short** report. One or two sentences of prose saying
what was built and what makes it worth reading, then the table. Nothing else.

```
Byggde /{slug}. {En mening om sidans vinkel — det fyndet som gör den värd att läsa.}

| | |
|---|---|
| Status | live |
| Produkter | 11 rankade, 4 övervägda |
| Kriterier | 5, tyngst: Räckvidd 25 % |
| Vinnare | CAPiDi Premium, 1 399 kr hos Kjell |
| Butiker | Kjell, Proshop, Apotea |
| Verktyg | /guider/rackvidd-babyvakt |
| Köpguide | 1 590 ord, 12 avsnitt |
| Provision | ~4 % hos Kjell, ca 56 kr per såld vinnare |
| Kontroller | check, typecheck, lint, build gröna |
```

Adapt the rows to the page — drop `Verktyg` when none was built, add a row when
something genuinely matters. **`Provision` is an estimate and should read like
one**: the merchant's rate applied to the winner's price. Say `okänd` when we
are not in the programme; that is a real answer and takes one word.

### What does not go in the report

- **Anything you did not do because the skill says not to.** Not deployed, not
  pushed, no `git add .`. Expected behaviour is not news.
- **Research you did not do.** A spec cell you could not fill belongs in
  `.agent/research/{slug}.md`. It is not a caveat on the work.
- **A gap you closed.** The reader wants the page, not the hunt.
- **Process narration.** Which phase you were in, how many times you re-ran a
  check, what you considered and dropped.

Three things *do* belong, and only when they actually happened: a page held back
instead of published and why, a shared file left uncommitted because another
session was mid-edit, and a decision you made in place of an `AskUserQuestion`
that a reasonable person might have made differently.

The test: **every line should be something the user would have had to ask for
if you had not written it.** "I did not deploy" fails that test. "Vinnaren
ligger 955 kronor under närmaste likvärdiga" passes.
