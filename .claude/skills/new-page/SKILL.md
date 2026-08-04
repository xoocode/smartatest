---
name: new-page
description: Build a complete "bäst i test" test page for smartatest.se, from competitor research through sourced products, buying guide, tools and verification. Use when creating a new test page, adding one to the catalog, or rebuilding an existing test page to the current template.
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
| 3–4 | `.claude/context/data.md` |
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

## Phase 4: Source real data

Prices, GTINs, URLs, images, ratings, specs. Nothing invented, everything
dated. Define the spec schema in `lib/spec-schema.mjs` **before** writing any
product.

## Phase 5: Build

1. `lib/catalog.ts` entry, still `status: "planned"`, `updated` matching the
   page's `const UPDATED`
2. `lib/test-pages.ts` entry with criteria and a comparison-based
   `methodology` string
3. `lib/sources.ts`, every URL verified
4. `lib/data/{slug}.ts` products, considered list, FAQ — and **spread it into
   `ALL_PRODUCTS`**
5. `content/{slug}/kopguide.mdx`, about 12 sections, roughly 1 800 words
6. Tools, if the test page needs any beyond the shared ones
7. `app/{slug}/page.tsx`, composed from existing components
8. A `/styleguide` bench for anything genuinely new

## Phase 6: Critical pass

Work the rubric in `.claude/context/ship.md`, then re-run the phase 1 comparison
with our page in it, looking for capabilities rather than volume.

The standard is the richness of `/smart-belysning`, not its length.

Two passes is normal.

## Phase 7: Verify

`pnpm check`, `pnpm build`, then a browser at 1440px and 390px. Measure, never
eyeball. Full list in `.claude/context/ship.md`.

## Flip to live

Only when genuinely publishable: `status: "live"`, images in place for every
ranked product, criterion scores reflecting the user's decisions.
